import mongoose from "mongoose";
import {DB_NAME} from "../constants.js";

const connectDb = async () => {
    try {
        const connectInstance = await mongoose.connect(`${process.env.MONGO_URL}/${DB_NAME}`);
        console.log(`MongoDb connected !! DB HOST: ${connectInstance.connection.host}`);
    } catch (err) {
        console.log(`Mongoose connection error: ${err}`);
        process.exit(1);
    }
}

export default connectDb;