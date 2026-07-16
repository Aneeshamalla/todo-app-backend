import multer from "multer";  
import path from "path";  

const storage = multer.diskStorage({

    destination: (req, file, cb) => {
         cb(null, "src/uploads");
    },
    
    filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname);
    },
    
});   
    const upload = multer({                                              // multer middleware 
        storage,
        limits : {
                fileSize: 2 * 1024 * 1024     //2MB
        },
        fileFilter : function (req, file, cb) {
            const filetypes = /jpg|jpeg|png/;
            const mimetype = filetypes.test(file.mimetype);
            const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    
            if (mimetype && extname) {
                return cb(null, true);
            }
    
            cb(new Error("Only JPEG, JPG, and PNG files are allowed."));
        }

})




export default upload;