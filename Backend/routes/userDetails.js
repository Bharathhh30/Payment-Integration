import { Router } from "express";
import { userDetails } from "../controller/userDetails.controller.js";

const userDetailsRouter = Router();

userDetailsRouter.get("/userDetails",(req,res)=>{
    res.send("Hello")
})

userDetailsRouter.get("/u",(req,res)=>{
    res.send("Hello")
})

export default userDetailsRouter;