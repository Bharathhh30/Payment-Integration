import { Router } from "express";
import { registerTeam } from "../controller/register.controller.js";
import upload from "../middlewares/upload.js";

const registerRouter = Router();

registerRouter.post("/register",upload.single('screenshot'),registerTeam)

registerRouter.get("/register",(req,res)=>{
    res.send(req.body)
})

export default registerRouter;