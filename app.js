import express from "express"
import cors from "cors"
import queryRoute from "./routes/queryRoute.js";

const app = express();

// Middleware
app.use(express.json()); // For parsing JSON requests
app.use(cors()); // Enable CORS

// Basic route
app.get("/", (req, res) => {
  res.send("AI Query Simulator API is running...");
});

app.use("/", queryRoute)

export default app