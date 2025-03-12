import CloudinaryModule from 'cloudinary';
import multer from 'multer';
import {CloudinaryStorage} from 'multer-storage-cloudinary';
import dotenv from 'dotenv'

dotenv.config();

const cloudinary = CloudinaryModule.v2;


// clodinary configurations , use env to not expose
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret : process.env.CLOUDINARY_API_SECRET
})

// Multer - cloudinary storage

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params : {
        folder : "team_payment_screenshot",
        allowed_formats : ["jpg","png","jpeg"],

    }
})

const upload = multer({storage: storage});

export default upload;