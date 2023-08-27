const multer = require('multer');
const fs = require('fs');
const path = require('path');


module.exports = async (req, res, next) => {
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads/images');
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + '-' + file.originalname);
    }
  });
  const upload = multer({ storage: storage });
  try {
    upload.array('files', 5)(req, res, (err) => {
      if (err) {  
        return res.status(400).json({ error: err.message });
      }

      // Retrieve uploaded files
      const files = req.files;
      const errors = [];
      // Validate file types and sizes
      files.forEach((file) => {
        const allowedTypes = ['image/jpeg', 'image/png'];
        const maxSize = 5 * 1024 * 1024; // 5MB

        if (!allowedTypes.includes(file.mimetype)) {
          // errors.push(`Invalid file type: ${file.originalname}`);
          console.log("errrrrrrrrrr");
        }

        if (file.size > maxSize) {
          // errors.push(`File too large: ${file.originalname}`);
          console.log("errrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr");
        }
      });

      // Handle validation errors
      // if (errors.length > 0) {
      //   // Remove uploaded files
      //   files.forEach((file) => {
      //     fs.unlinkSync(file.path);
      //   });

      //   return res.status(400).json({ errors });
      // }

      req.files = files;
      next();
    });

  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err)
  }
  // Use multer upload instance
};



// app.post('/upload', uploadMiddleware, (req, res) => );





// module.exports = uploadMiddleware;