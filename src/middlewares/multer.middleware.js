import multer from "multer"
import { fileURLToPath } from 'url';
import { dirname,resolve } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, resolve(__dirname,"../../public/temp"))
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname)
    }
  })
  
export const upload = multer({ 
    storage,
})