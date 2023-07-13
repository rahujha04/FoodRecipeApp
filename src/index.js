import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import { userRouter } from "./routes/user.js";
import { recipesRouter } from "./routes/recipes.js";
import dotenv from "dotenv";



const app = express();

app.use(express.json());
app.use(cors());

dotenv.config();


app.use("/auth", userRouter);
app.use("/recipes", recipesRouter);


const DB_URL = process.env.MONGODB_URL;

mongoose
  .connect(
    DB_URL,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`server is listening on port ${PORT}`);
});
