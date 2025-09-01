import multer from 'multer';
import { TEMP_FILES_DIR_PATH } from '../constants/path.js';

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, TEMP_FILES_DIR_PATH);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now();
    cb(null, `${uniqueSuffix}-${file.originalname}`);
  },
});

export const upload = multer({
  storage,
});
