import { configDotenv } from "dotenv";
import { app } from "./src/app.js";
import connectDb from "./src/db/index.js";

configDotenv({
    path:'./.env'
});

connectDb()
.then(() => {
    app.listen(process.env.PORT || 8000, () => {
        console.log(`Server is running on Port :${process.env.PORT}`)
    })
})
.catch((err) => {
    console.log('Mongo db connectio failed !!! ', err)
})