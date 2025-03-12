import mongoose from "mongoose";

const TeamMemberSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    year: {
        type: Number,
        required: true
    },
    phone: {
        type: String,  // Phone numbers should be strings to avoid issues with leading zeros
        required: true
    },
    email: {
        type: String,
        required: true,
        trim: true
    }
});

const TeamSchema = new mongoose.Schema({
    teamName : {
        type : String,
        required : true,
        trim : true
    },
    teamLeader : {
        type : String,
        required : true

    },
    teamLeaderEmail : {
        type : String,
        required : true,
        unique : true
    },
    teamSize : {
        type : Number,
        required : true
    },
    events : {
        type : [String],
        required : true
    },
    domain : {
        type : String,
        required : true
    },
    collegeName : {
        type : String,
        required : true
    },
    teamMembers : {
        type: [TeamMemberSchema], // Explicitly define it as an array of subdocuments
        required: true
    },
    utrNumber: { 
        type: String,
        required: true 
    },
    screenshot: {
         type: String
    }, // Store Cloudinary URL instead of file
},{timestamps : true})


const Team = mongoose.model('Team',TeamSchema);
export default Team;