import Team from "../models/register.model.js";


export const userDetails = async(req,res) => {
    try{
        const {teamName} = req.query;

        if(!teamName){
            return res.status(400).json({message:"Team Name is required"})
        }
        const team = await Team.findOne({ teamName });

        if (!team) {
            return res.status(404).json({ message: "Team not found" });
        }

        res.status(200).json({ teamMembers: team.teamMembers });
    }catch(error){
        res.status(500).json({ message: "Error fetching team details", error: error.message });
    }
}