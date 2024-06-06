// const mysql = require("mysql2/promise");

// const db = async () => {
//   try {
//     const connection = await mysql.createConnection({
//       host: "localhost",
//       user: "root",
//       password: "Mukesh@1848",
//       port: 3306,
//       database: "Todos",
//     });
//     console.log("Database connected successfully");
//     return connection;
//   } catch (error) {
//     console.error("Database connection failed:", error);
//     throw error;
//   }
// };

// module.exports = db;

const mysql = require("mysql2/promise");

const pool = mysql.createPool({
  host: "localhost",
  debug: true,
  user: "root",
  password: "Mukesh@1848",
  port: 3306,
  database: "Todos",
});

module.exports = pool;
