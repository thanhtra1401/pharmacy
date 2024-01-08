const multer = require("multer");
const mkdirp = require("mkdirp");
const uploadImage = (type) => {
  mkdirp.sync(`./public/images/${type}`);
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, `./public/images/${type}`); //set up cho luu file
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + "_" + file.originalname); // dat lai ten file
    },
  });
  const upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
      const extensionImageList = [".png", ".jpg"];
      const extension = file.originalname.slice(-4);
      const check = extensionImageList.includes(extension);
      if (check) {
        cb(null, true);
      } else {
        cb(new Error("Extension không hợp lệ"));
      }
    },
  });
  return upload.single(type);
};
export { uploadImage };
