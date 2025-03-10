import { Router } from "express";
import { registerTeam } from "../controller/register.controller.js";

const registerRouter = Router();

registerRouter.post("/register",registerTeam)

registerRouter.get("/register",(req,res)=>{
    res.send(req.body)
})

export default registerRouter;