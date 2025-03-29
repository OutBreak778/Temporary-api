import dotenv from "dotenv";
import http from "http";
import app from "./app.js";
import db from "./config/database.js";

dotenv.config();
const PORT = 5000;

const server = http.createServer(app);

// Handle server errors
server.on("error", (error) => {
  if (error.code === "EADDRINUSE") {
    console.warn(`Port ${PORT} is in use, trying port ${++PORT}...`);
    server.listen(PORT);
  } else {
    console.error(`Server error: ${error.message}`);
    process.exit(1);
  }
});

const StartServer = async () => {
  try {

    await db
    server.listen(PORT, () => {
      console.log(`Server started running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error(`Error in server startup: ${error.message}`);
    process.exit(1); // Exit the process on failure
  }
};

StartServer()