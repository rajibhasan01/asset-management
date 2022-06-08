import multer from 'multer';

const fileStorage = multer.memoryStorage();

export const fileUpload = multer({
  storage: fileStorage,
  limits: {
    fileSize: 15000000, // 1000000 Bytes = 1 MB
  },
});
