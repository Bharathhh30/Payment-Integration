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
            stateName,
            teamMembers,
            utrNumber,
            
        } = req.body;

        const parsedEvents = JSON.parse(events);
        const parsedTeamMembers = teamMembers ? JSON.parse(teamMembers) : [];

        // screenshot
        const screenshotUrl = req.file ? req.file.path : null;
         // Debugging checks
         console.log("Received Team Name:", teamName);
        //  console.log("Received File:", req.file);
         console.log("Cloudinary Screenshot URL:", screenshotUrl);

        //  console.log("Screenshot Path:", screenShot); // Should log a valid path if uploaded
        // endukaina manchidi ani checking
        if (!teamName || !teamLeader || !teamLeaderEmail || !teamSize || !parsedEvents.length || !domain || !collegeName) {
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
            events: parsedEvents,
            domain,
            collegeName,
            stateName,
            teamMembers: parsedTeamMembers,
            utrNumber,
            screenshot : screenshotUrl // Store file path in database
        });

          await newTeam.save();
          res.status(201).json({ message: "Team registered successfully", team: newTeam });
          
    }catch (error) {
        console.error("Error in team registration:", error);
        res.status(500).json({ message: "Internal Server Error" });
      }
}