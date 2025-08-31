import mongoose,{Schema} from "mongoose";
import Jwt from "jsonwebtoken"


const userSchema = new Schema({
    fullName: {
        type: String,
        required: true,
        trim: true,
        index: true
    },
    dob: {
        type: Date,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        index: true
    },
    otp: {
        type: Number,
        required: true
    },
    otpExpiresAt: {
        type: Date
    },
    refreshToken: {
        type: String,

    }
},{timestamps: true});



userSchema.methods.generateAccessToken = function() {
    try {
        return Jwt.sign(
            {
                _id: this._id,
                email: this.email,
                fullName: this.fullName
            },
            process.env.ACCESS_TOKEN_SECRET,
            {
                expiresIn: process.env.ACCESS_TOKEN_EXPIRY || "15m"
            }
        );
    } catch (err) {
        console.error("Error generating access token:", err);
    }
};


userSchema.methods.isOtpExpired = function() {
    return this.otpExpiresAt && new Date() > this.otpExpiresAt;
};

userSchema.methods.generateRefreshToken = function () {
     return Jwt.sign(
        {
            _id: this._id,

        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY || "7d"
        }
    );
};


export const User = mongoose.model("User", userSchema);