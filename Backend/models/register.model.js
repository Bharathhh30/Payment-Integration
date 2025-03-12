import mongoose from "mongoose";


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
    teamMembers : 
        [{name : String , 
            year : Number,
            phone : Number,
            email : String
        }],
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