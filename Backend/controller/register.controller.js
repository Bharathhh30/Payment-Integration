import Team from "../models/register.model.js";

export const registerTeam = async (req, res) => {
    try {
      let {
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
  
      // ✅ Convert `teamMembers` string to JSON array (for multipart requests)
      if (typeof teamMembers === "string") {
        teamMembers = JSON.parse(teamMembers);
      }
  
      // ✅ Make sure the file is uploaded successfully
      const screenshot = req.file ? req.file.path : null;
      if (!screenshot) {
        return res.status(400).json({ error: "Screenshot is required" });
      }
  
      console.log("Screenshot URL:", screenshot); // Debugging
  
      // ✅ Validate required fields
      if (!teamName || !teamLeader || !teamLeaderEmail || !teamSize || !events.length || !domain || !collegeName) {
        return res.status(400).json({ message: "All fields are required" });
      }
  
      // ✅ Check if the team already exists
      const existingTeam = await Team.findOne({ teamLeaderEmail });
      if (existingTeam) {
        return res.status(400).json({ message: "A team with this email already exists" });
      }
  
      // ✅ Save to MongoDB
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
        screenshot,
      });
  
      await newTeam.save();
      res.status(201).json({ message: "Team registered successfully", team: newTeam });
    } catch (error) {
      console.error("Error in team registration:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  };
  