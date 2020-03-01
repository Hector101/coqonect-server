import { Response, Request } from 'express';
import dotenv from 'dotenv';
import multer, { FileFilterCallback, MulterError } from 'multer';
import path from 'path';
import { getConnection } from 'typeorm';
import Jimp from 'jimp';
import uuid from 'uuid';

// database models
import { Account, Profile } from '../../../db';

// libs
import { respondWithSuccess, respondWithWarning } from '../../../lib/httpResponse';

// interface
import IRequestWithAuthStatus from '../../../interfaces/IRequestWithAuthStatus';

dotenv.config();

const isDevEnv = process.env.NODE_ENV === 'development'
  ? 'http://api.coqonect.com:5000'
  : 'https://coqonect.com';

const MAX_IMAGE_SIZE = 1048576;

const storage = multer.diskStorage({
  destination: './public/profile',
  filename: (_req, file, cb) => {
    cb(null, `${file.fieldname}-${uuid.v4()}${path.extname(file.originalname)}`);
  },
});

const checkFileType = (_req: Request, file: Express.Multer.File, cb: FileFilterCallback) => {
  const fileTypes = /jpeg|jpg|png/;
  const extName = fileTypes.test(path.extname(file.originalname.toLowerCase()));
  const mimeType = fileTypes.test(file.mimetype);

  if (mimeType && extName) {
    return cb(null, true);
  }
  return cb({ message: 'Images Only', name: 'unknown file type' });
};

const upload = multer({
  storage,
  limits: {
    fileSize: MAX_IMAGE_SIZE,
  },
  fileFilter: (req, file, cb) => {
    checkFileType(req, file, cb);
  },
}).single('image');

export const imageUpload = async (req: IRequestWithAuthStatus, res: Response) => {
  const id = req.decoded!.id;

  upload(req, res, async (err: MulterError) => {
    if (err instanceof MulterError) {
      return respondWithWarning(res, 400, err.message);
    }
    if (!req.file) {
      return respondWithWarning(res, 400, 'No image selected');
    }
    if (req.file.size > MAX_IMAGE_SIZE) {
      return respondWithWarning(res, 400, 'Image size greater than 1MB');
    }

    // let modified = false;

    try {
      const image = await Jimp.read(req.file.path);

      image.resize(128, 128)
      .quality(100)
      .write(req.file.path);
    } catch (err) {
      return respondWithWarning(res, 400, 'Error occurred resizing image, try again.');
    }
    const account = await Account.findOne({
      where: {id},
      relations: ['profile'],
    });
    if (!account) {
      return respondWithWarning(res, 403, 'Upload not allowed');
    }
    await getConnection()
      .createQueryBuilder()
      .update(Profile)
      .set({
        imageUrl: `${isDevEnv}${req.file.path.toLowerCase().substring(6)}`,
      })
      .where('id = :id', { id: account.profile.id })
      .execute();
    return respondWithSuccess(res, 200, 'Profile image uploaded');
  });
};
