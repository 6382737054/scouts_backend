import mysql from "mysql2";
import app from "./app.js";
import "dotenv/config";

const PORT = process.env.PORT;

const db = mysql.createConnection({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
});

db.connect((err) => {
  if (err) {
    console.error("Error connecting to MySQL:", err);
    return;
  }
  console.log("Connected to MySQL database.");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default db;
