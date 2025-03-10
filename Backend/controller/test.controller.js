
import Team from "../models/register.model.js";

export const testController = async(req,res)=>{
    const {teamName} = req.query;
    // console.log(teamName)
    

    try{
        if(!teamName){
            return res.status(400).json({message:"Team Name is required"})
        }
        const team = await Team.findOne({ teamName });
        // console.log("normal")
        // console.log(team,"team")
        if (!team) {
            return res.status(404).json({ message: "Team not found" });
        }
        res.status(200).json({ teamMembers: team.teamMembers });


    }catch{

    }

}