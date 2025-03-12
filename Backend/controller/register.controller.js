import Team from "../models/register.model.js";

export const registerTeam = async(req,res) => {
    try{
        const {
            teamName,
            teamLeader,
            teamLeaderEmail,
            teamSize,
            events,
            domain,
            collegeName,
            teamMembers,
            utrNumber,
            
        } = req.body;
        // taking screenshot alaag see
        const screenshot = req.file ? req.file.path : null;
        if (!screenshot) {
            return res.status(400).json({ error: "Screenshot is required" });
        }
        // checking for screenshot
        console.log(screenshot)
        
        // checking if it is working
        console.log(teamName)
        // endukaina manchidi ani checking
        if (!teamName || !teamLeader || !teamLeaderEmail || !teamSize || !events.length || !domain || !collegeName) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // unte undi ani cheppu
        const existingTeam = await Team.findOne({ teamLeaderEmail });
            if (existingTeam) {
            return res.status(400).json({ message: "A team with this email already exists" });
        }

        const newTeam = new Team({
            teamName,
            teamLeader,
            teamLeaderEmail,
            teamSize,
            events,
            domain,
            collegeName,
            teamMembers,
            utrNumber,
            screenshot
          });

          await newTeam.save();
          res.status(201).json({ message: "Team registered successfully", team: newTeam });
          
    }catch (error) {
        console.error("Error in team registration:", error);
        res.status(500).json({ message: "Internal Server Error" });
      }
}