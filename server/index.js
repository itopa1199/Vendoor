import express from "express";
import connectDB from "./config/db.js";
import cors from "cors";
import cookieParser from "cookie-parser";
const app = express();
const port = 3000;
import authRoute from "./routers/UserRoutes.js";

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoute);

app.listen(3000, async () => {
  console.log(`Server is running on http://localhost:${port}`);
  await connectDB();
});
