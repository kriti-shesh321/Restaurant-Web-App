import multer from 'multer';
import path from 'path';

const storage = multer.memoryStorage();

const upload = multer({
    storage,
    limits: { fileSize: 2 * 1024 * 1024 }, // note: fileSize (camelCase)
    fileFilter: (req, file, cb) => {
        const allowed = [".png", ".jpg", ".jpeg"];
        const ext = path.extname(file.originalname).toLowerCase();
        if (!allowed.includes(ext)) {
            return cb(new Error("Only .png, .jpg and .jpeg files are allowed"));
        }
        cb(null, true);
    },
});

export default upload;