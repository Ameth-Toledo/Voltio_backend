import multer from 'multer';

const storage = multer.memoryStorage();

export const uploadChat = multer({
  storage: storage,
  limits: {
    fileSize: 100 * 1024 * 1024, 
  },
  fileFilter: (req, file, cb) => {
    const allowedMimes = [
      // Images
      'image/jpeg',
      'image/png',
      'image/webp',
      'image/gif',
      // Videos
      'video/mp4',
      'video/quicktime',
      'video/x-msvideo',
      'video/webm',
      // Documents / files
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'application/vnd.ms-excel',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    ];
    if (allowedMimes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Tipo de archivo no permitido.'));
    }
  },
});
