import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDb } from "./utils/Db.js";
import { userroute } from "./routes/User.route.js";

dotenv.config();

const app = express();
// Consistent naming: use PORT (uppercase) to match the standard convention
const PORT = process.env.PORT || 10000;

app.use(cors());
app.use(express.json());

// Main routes should generally be defined outside the .then() block 
// so they are registered as soon as the app starts
app.use("/api/auth", userroute);

app.get("/", (req, res) => {
  res.send("Server running");
});

connectDb()
  .then(() => {
    console.log("db connected successfully");
    
    // Using the variable name defined above
    app.listen(PORT, "0.0.0.0", () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    // This was catching the ReferenceError: PORT is not defined 
    // and labeling it as a DB error.
    console.error("Initialization error:", err.message);
  });

export default app;
