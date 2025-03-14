import mongoose from "mongoose";

const TeamSchema = new mongoose.Schema({
    teamName: {
        type: String,
        required: true,
        trim: true
    },
    teamLeader: {
        type: String,
        required: true
    },
    teamLeaderEmail: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true, // Ensures consistency
        match: [/^\S+@\S+\.\S+$/, "Invalid email format"] // Email validation
    },
    teamSize: {
        type: Number,
        required: true,
        min: 2 // Ensuring at least 2 member
    },
    events: {
        type: [String],
        required: true
    },
    domain: {
        type: String,
        required: true
    },
    collegeName: {
        type: String,
        required: true
    },
    stateName : {
        type: String,
        required: true
    },
    teamMembers: {
        type: [{
            name: { type: String, required: true },
            year: { type: String,
                 required: true,
                   },
            phone: { 
                type: String, 
                required: true, 
                match: [/^\d{10,15}$/, "Invalid phone number"] // Ensures valid phone number format
            },
            email: { 
                type: String, 
                required: true, 
                match: [/^\S+@\S+\.\S+$/, "Invalid email format"] 
            },
            membershipID: { 
                type: String, 
                default : "No Membership ID"
            }
        }],
        required: true,
        validate: [arr => arr.length > 0, "At least one team member is required"]
    },
    utrNumber: { 
        type: String,
        required: true
    },
    screenshot: {
        type: String // Stores the Cloudinary URL or file path
    }
}, { timestamps: true });

const Team = mongoose.model("Team", TeamSchema);
export default Team;
