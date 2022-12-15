import multer from "multer";
const storage = multer.diskStorage({});

const imageFileFilter = (req,file,cb) => {
  if(!file.mimetype.startsWith("image")){
    cb("Only image files are supported!",false)
  }
  cb(null,true)
}

const videoFileFilter = (req, file, cb) => {
 if (!file.mimetype.startsWith("video")) {
    cb("Only video files are supported!", false)
  }
  cb(null, true)
}

const uploadImage = multer({ storage, fileFilter: imageFileFilter });
const uploadTrailer = multer({ storage, fileFilter: videoFileFilter });

export { uploadImage, uploadTrailer } ;
