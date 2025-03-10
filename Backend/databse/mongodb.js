import mongoose from "mongoose";

import dotenv from "dotenv";
import e from "cors";

dotenv.config();



const connetToDataBase = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log(" Database Connected Successfully");
    } catch (error) {
        console.log(error);
    }
}

export default connetToDataBase;