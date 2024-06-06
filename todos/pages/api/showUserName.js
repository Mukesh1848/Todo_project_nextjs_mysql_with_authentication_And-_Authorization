import pool from "../../databse/db";

export default async function handler(req, res) {
  console.log(req.query);
  const [rows] = await pool.query("SELECT * FROM users");
  res.status(200).json(rows);
}
