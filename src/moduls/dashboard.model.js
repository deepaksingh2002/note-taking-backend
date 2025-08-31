import mongoose,{Schema} from "mongoose";

const dashboardSchema = new Schema({
    notes: [{
        type: String,
        required: true
    }],
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User"
    }
},{timestamps: true});


export const Note = mongoose.model("Note", dashboardSchema)

