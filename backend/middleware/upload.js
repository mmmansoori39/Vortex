import multer from 'multer';
import path from 'path';

// Set Storage Engine
const storage = multer.diskStorage({
  destination: './uploads',
  filename: function(req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

// Initialize Upload
const upload = multer({
  storage: storage,
  limits: { fileSize: 1000000 }, // Limit to 1MB
  fileFilter: function(req, file, cb) {
    checkFileType(file, cb);
  }
}).single('codeFile');  // Handling single file upload

// Check File Type
function checkFileType(file, cb) {
  const filetypes = /js|java|py|html|css|ts/;  // Allowed extensions
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);
  
  if (extname && mimetype) {
    return cb(null, true);
  } else {
    cb('Error: Code Files Only!');
  }
}

export default upload;
