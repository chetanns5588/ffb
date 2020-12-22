const multer = require('multer');
const fs = require('fs');
// var storage = multer.memoryStorage()
var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const prodId  = req.params.prodId;
        const directory = `./public/product-uploads/${prodId}/`;
        fs.mkdirSync(directory, {recursive: true})
        cb(null,directory)
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    }
})
var upload = multer({storage: storage});

module.exports = upload;