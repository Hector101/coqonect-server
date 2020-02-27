import dotenv from 'dotenv';
import multer from 'multer';
import path from 'path';
import { getConnection } from 'typeorm';

// database models
import { Account, Profile } from '../../../db';

// libs
import { respondWithSuccess, respondWithWarning } from '../../../lib/httpResponse';

dotenv.config();

const isDevEnv = process.env.NODE_ENV === 'development'
  ? 'http://api.coqonect.com:5000'
  : 'https://coqonect.com';

const MAX_IMAGE_SIZE = 5242880;

const storage = multer.diskStorage({
  destination: './public/profile',
  filename: (req, file, cb) => {
    cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
  },
});

const checkFileType = (req, file, cb) => {
  const fileTypes = /jpeg|jpg|png/;
  const extName = fileTypes.test(path.extname(file.originalname.toLowerCase()));
  const mimeType = fileTypes.test(file.mimetype);

  if (mimeType && extName) {
    return cb(null, true);
  }
  return cb('Images Only');
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

export const imageUpload = async (req, res) => {
  const { id } = req.decoded;
  upload(req, res, async err => {
    if (err) {
      return respondWithWarning(res, 400, err);
    }
    if (!req.file) {
      return respondWithWarning(res, 400, 'No image selected');
    }
    if (req.file.size > MAX_IMAGE_SIZE) {
      return respondWithWarning(res, 400, 'File too large');
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
        imageUrl: `${isDevEnv}/${req.file.path.toLowerCase()}`,
      })
      .where('id = :id', { id: account.profile.id })
      .execute();
    return respondWithSuccess(res, 200, 'Profile image uploaded');
  });
};
