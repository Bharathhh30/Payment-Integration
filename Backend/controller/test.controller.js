
import Team from "../models/register.model.js";

export const testController = async(req,res)=>{
    const {teamLeaderEmail} = req.query;
    // console.log(teamName)
    

    try{
        if(!teamLeaderEmail){
            return res.status(400).json({message:"Team Name is required"})
        }
        const team = await Team.findOne({ teamLeaderEmail });
        // console.log("normal")
        // console.log(team,"team")
        if (!team) {
            return res.status(404).json({ message: "Team not found" });
        }
        res.status(200).json({ 
            teamName : team.teamName,
            teamLeader: team.teamLeader,
            teamMembers: team.teamMembers,
            utrNumber : team.utrNumber,
            screenshot: team.screenshot
         });


    }catch{

    }

}