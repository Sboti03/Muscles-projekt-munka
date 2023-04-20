"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.saveImageToStorage = void 0;
const multer_1 = require("multer");
const uuid_1 = require("uuid");
const path = require("path");
const validFileExtensions = ['png', 'jpg', 'jpeg'];
const validMimeTypes = ['image/png', 'image/jpg', 'image/jpeg'];
exports.saveImageToStorage = {
    storage: (0, multer_1.diskStorage)({
        destination: './images',
        filename: (req, file, callback) => {
            const fileExtension = path.extname(file.originalname);
            const fileName = (0, uuid_1.v4)() + fileExtension;
            callback(null, fileName);
        }
    }),
    fileFilter: (req, file, callback) => {
        validMimeTypes.includes(file.mimetype) ? callback(null, true) : callback(null, false);
    }
};
//# sourceMappingURL=image-store.js.map