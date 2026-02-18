import mongoose from "mongoose"


const meetingSchema = new mongoose.Schema({
    user_id:{
        type: String,
    },
    meetingCode:{
        type: String,
        required: true,
        unique: true
    },
    date:{
        type: Date,
        default :  Date.now,
        required: true
    }
})


const Meet = mongoose.model("Meet", meetingSchema);

export{Meet};
