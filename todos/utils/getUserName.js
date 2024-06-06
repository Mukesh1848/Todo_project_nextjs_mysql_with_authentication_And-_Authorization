import pool from "../databse/db";
// import axios from "axios";

export default getUserName = async () => {
  const token = localStorage.getItem("token");
  console.log(token);
  const [rows] = await pool.query(
    "SELECT userName FROM users WHERE token = ?",
    [token]
  );
  console.log(rows);
};
