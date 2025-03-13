import { Router } from "express";
import { registerTeam } from "../controller/register.controller.js";
import {upload} from "../middlewares/upload.middleware.js";

const registerRouter = Router();

registerRouter.post("/register",upload.single('screenShot'),registerTeam)

registerRouter.get("/register",(req,res)=>{
    res.send(req.body)
})

export default registerRouter;