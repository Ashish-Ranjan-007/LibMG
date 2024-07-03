import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import { userRouter } from "./routes/user.js";
import { libsRouter } from "./routes/libs.js";

const app = express();

app.use(express.json());
app.use(cors());

app.use("/libs", libsRouter);
app.use("/user", userRouter);

mongoose.connect(
  "mongodb+srv://sussranjan007:saboaceluffy0710@reddits.pqltuwa.mongodb.net/Reddits?retryWrites=true&w=majority",
{
    useNewUrlParser: true,
    useUnifiedTopology: true,
}
);
app.listen(3001, ()=>{console.log("server started at 3001")})
