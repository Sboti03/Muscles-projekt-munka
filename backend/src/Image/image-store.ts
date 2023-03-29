import {diskStorage} from "multer";
import {v4 as uuid} from 'uuid'
import * as fs from "fs";
import {FileTypeResult} from 'file-type';
import * as path from "path";
import { request } from "express";
import { filter, from, Observable } from "rxjs";
import { MulterOptions } from "@nestjs/platform-express/multer/interfaces/multer-options.interface";
import { FileTypeValidator, Logger } from "@nestjs/common";

type validFileExtension = 'png' | 'jpg' | 'jpeg'
type validMimeType = 'image/png' | 'image/jpg' | 'image/jpeg'


const validFileExtensions = ['png', 'jpg', 'jpeg']
const validMimeTypes = ['image/png', 'image/jpg', 'image/jpeg']

export const saveImageToStorage: MulterOptions = {
    storage: diskStorage({
        destination: './images',
        filename: (req, file, callback) => {
            const fileExtension: string = path.extname(file.originalname)
            const fileName: string = uuid() + fileExtension;
            callback(null, fileName)
        }
    }),
    fileFilter: (req, file, callback) => {
        validMimeTypes.includes(file.mimetype) ? callback(null, true) : callback(null, false)
    }
}
