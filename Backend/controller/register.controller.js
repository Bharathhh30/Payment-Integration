import Team from "../models/register.model.js";
import { google } from "googleapis";
import dotenv from "dotenv";
import sheets from "../utils/sheets.js";

dotenv.config();


export const registerTeam = async(req,res) => {
    try{
        const {
            teamName,
            teamLeader,
            teamLeaderEmail,
            teamLeaderPhoneNumber,
            accommodation,
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
        if (!teamName || !teamLeader || !teamLeaderEmail || !teamLeaderPhoneNumber || !teamSize || !parsedEvents.length || !domain || !collegeName) {
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
            teamLeaderPhoneNumber,
            accommodation,
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
          
        // Prepare values for Google Sheets
      const values = [
          [
            teamName,
            teamLeader,
            teamLeaderEmail,
            teamLeaderPhoneNumber,
            accommodation,
            teamSize,
            collegeName,
            stateName,
            parsedEvents.join(", "),
            domain,
            utrNumber,
            screenshotUrl || "No Screenshot",
            ...parsedTeamMembers.flatMap((member) => [
              member.name || "N/A",
              member.year || "N/A",
              member.phone || "N/A",
              member.email || "N/A",
            ]),
          ],
        ];
  
      // Push to Google Sheets
      await sheets.spreadsheets.values.append({
        spreadsheetId: process.env.GOOGLE_SPREADSHEET_ID,
        range: "Sheet1!A1",
        valueInputOption: "USER_ENTERED",
        requestBody: { values },
      });
  
            // finally return the response
            res.status(201).json({ message: "Team registered successfully", team: newTeam });
          
    }catch (error) {
        console.error("Error in team registration:", error);
        res.status(500).json({ message: "Internal Server Error" });
      }
}