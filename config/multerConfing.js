import path from "path";
import multer from "multer";
import { v4 as uuidv4 } from "uuid";

const tmp = path.join(process.cwd(), "tmp");
const storeImage = path.join(process.cwd(), "public/avatars");

const extensionWhiteList = [".jpg", ".jpeg", ".png", ".gif"];
const mimetypeWhiteList = ["image/png", "image/jpg", "image/jpeg", "image/gif"];

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, tmp);
  },
  filename: (req, file, cb) => {
    cb(null, `${uuidv4()}${file.originalname}`);
  },
});

const uploadMiddleware = multer({
  storage,
  fileFilter: async (req, file, cb) => {
    const extension = path.extname(file.originalname).toLowerCase();
    const mimetype = file.mimetype;
    if (
      !extensionWhiteList.includes(extension) ||
      !mimetypeWhiteList.includes(mimetype)
    ) {
      return cb(
        new Error(
          "Sorry, but the file is not an image. Possible file extensions are: jpg, png, and gif. Please try again."
        ),
        false
      );
    }
    return cb(null, true);
  },
  limits: { fileSize: 2097152 },
});

export { tmp, storeImage, uploadMiddleware };