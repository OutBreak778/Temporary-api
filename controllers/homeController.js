import db from "../config/database.js";

export const homeController = (req, res) => {
    const { question } = req.body;

    if (!question) {
      return res.status(400).json({ error: "Query is required" });
    }
  
    let sqlQuery = "";
    if (question.toLowerCase().includes("users")) {
      sqlQuery = "SELECT * FROM users";
    } else if (question.toLowerCase().includes("nikhil")) {
      sqlQuery = "SELECT * FROM nikhil";
    } else {
      sqlQuery = "SELECT 'No valid query found'";
    }
  
    db.run("INSERT INTO queries (question, sql_query) VALUES (?, ?)", 
      [question, sqlQuery], (err) => {
      if (err) {
        return res.status(500).json({ error: "Failed to store query" });
      }
      res.json({ question, sqlQuery });
    });
}

export const getQueryController = (req, res) => {
  db.all("SELECT * FROM queries", [], (err, rows) => {
      if (err) {
          return res.status(500).json({ error: "Failed to fetch queries" });
      }
      res.json({ queries: rows });
  });
};

export const explainController = (req, res) => {
  const { question } = req.body;

  if (!question) {
      return res.status(400).json({ error: "Query is required" });
  }

  // Simulated query breakdown (mock AI logic)
  let breakdown = [];
  if (question.toLowerCase().includes("users")) {
      breakdown = [
          "Identify the main subject: 'users'",
          "Determine required action: 'retrieve all users'",
          "Map to SQL: 'SELECT * FROM users'"
      ];
  } else if (question.toLowerCase().includes("orders")) {
      breakdown = [
          "Identify the main subject: 'orders'",
          "Determine required action: 'retrieve all orders'",
          "Map to SQL: 'SELECT * FROM orders'"
      ];
  } else if(question.toLowerCase().includes("nikhil")) {
    breakdown = [
      "Identify the main subject: 'nikhil'",
      "Determine required action: 'retrieve all orders'",
      "Map to SQL: 'SELETCT * FROM nikhil'"
    ]
  } 
  else {
      breakdown = ["Unable to determine a valid SQL query."];
  }

  res.json({ question, breakdown });
};

export const validateController = (req, res) => {
  const { sqlQuery } = req.body;

  if (!sqlQuery) {
      return res.status(400).json({ error: "SQL query is required" });
  }

  // Mock validation (checking for SELECT and FROM keywords)
  const isValid = sqlQuery.trim().toLowerCase().startsWith("select") &&
                  sqlQuery.toLowerCase().includes("from");

  if (isValid) {
      return res.json({ sqlQuery, valid: true, message: "Query is valid." });
  } else {
      return res.status(400).json({ sqlQuery, valid: false, message: "Invalid SQL syntax." });
  }
};


