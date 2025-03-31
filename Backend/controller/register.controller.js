import Team from "../models/register.model.js";
import { google } from "googleapis";
import fs from "fs";
import dotenv from "dotenv";
dotenv.config();

const serviceAccountJson = Buffer.from(process.env.GOOGLE_SERVICE_ACCOUNT_BASE64, "base64").toString("utf8");
fs.writeFileSync("/tmp/service-account.json", serviceAccountJson);
// loading google sheets api credentials
const auth = new google.auth.GoogleAuth({
    keyFile : "/tmp/service-account.json",
    scopes :[ "https://www.googleapis.com/auth/spreadsheets"],
})
// const keyFilePath = "./config/service-account.json";
// console.log("Checking key file:", fs.existsSync(keyFilePath) ? "File exists" : "File NOT found");
// google sheets setup
const sheets = google.sheets({version : "v4", auth});
const SPREADSHEET_ID = "1mGkCSqEcItgWWsBNItEikOgkHJJbb_U4swJPSFxHVn4"
const SHEET_NAME = "Sheet1";

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
          
          const maxTeamSize = 5;
          //   ADDING TO GOOGLE SHEETS
          const values = [
            [
                teamName,
                teamLeader,
                teamLeaderEmail,
                teamSize,
                collegeName,
                stateName,
                parsedEvents.join(", "), // Store events as comma-separated values
                domain,
                utrNumber,
                screenshotUrl || "No Screenshot",
                ...parsedTeamMembers.flatMap((member, index) => [
                    member.name || `N/A`,
                    member.year || `N/A`,
                    member.phone || `N/A`,
                    member.email || `N/A`
                ])
            ]
        ];
            
            await sheets.spreadsheets.values.append({
                spreadsheetId: SPREADSHEET_ID,
                range: `${SHEET_NAME}!A1`, // Start from first available row
                valueInputOption: "RAW",
                resource: { values },
            })
            // finally return the response
            res.status(201).json({ message: "Team registered successfully", team: newTeam });
          
    }catch (error) {
        console.error("Error in team registration:", error);
        res.status(500).json({ message: "Internal Server Error" });
      }
}