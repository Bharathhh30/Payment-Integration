import { Router } from "express";
import { userDetails } from "../controller/userDetails.controller.js";

const userDetailsRouter = Router();

userDetailsRouter.get("/userDetails",userDetails)


export default userDetailsRouter;