import multer from 'multer';
import path from 'path';

const storage = multer.diskStorage({
  destination: './uploads', // Ensure this folder exists
  filename: function (req, file, cb) {
    cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 1000000 }, // Limit file size to 1MB
}).single('codeFile'); // Single file upload with 'codeFile' field

export default upload;
