import multer from 'multer';
import path from 'path';
import { getConnection } from 'typeorm';

// database models
import { Account, Profile } from '../../../db';

// libs
import { respondWithSuccess, respondWithWarning } from '../../../lib/httpResponse';

const storage = multer.diskStorage({
  destination: './public/profile',
  filename: (req, file, cb) => {
    cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
  },
});

const checkFileType = (req, file, cb) => {
  const fileTypes = /jpeg|jpg|png/;
  const extName = fileTypes.test(path.extname(file.originalname));
  const mimeType = fileTypes.test(file.mimetype);

  if (mimeType && extName) {
    return cb(null, true);
  }
  return cb('Images Only');
};

export const upload = multer({
  storage,
  limits: {
    fileSize: 5242880,
  },
  fileFilter: (req, file, cb) => {
    checkFileType(req, file, cb);
  },
}).single('image');

export const imageUpload = async (req, res) => {
  const { id } = req.decoded;
  if (req.file === undefined) {
    return respondWithWarning(res, 400, 'No image selected');
  }
  const account = await Account.findOne({
    where: {id},
    relations: ['profile'],
  })
  const { profile } = account;
  if (profile) {
    await getConnection()
      .createQueryBuilder()
      .update(Profile)
      .set({
        imageUrl: req.file.path,
      })
      .where('id = :id', { id: account.profile.id })
      .execute();
  }
  return respondWithSuccess(res, 200, 'Profile image uploaded');
};
