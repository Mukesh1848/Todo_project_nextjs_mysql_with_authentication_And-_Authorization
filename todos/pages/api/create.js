import pool from "../../databse/db";
import { authenticateToken } from "../../utils/auth";

export default async function handler(req, res) {
  authenticateToken(req, res, async () => {
    const { title, description } = req.body;
    const userId = req.user.id;

    try {
      const [result] = await pool.query(
        "INSERT INTO Todo (user_Id, title, description) VALUES (?, ?,?)",
        [userId, title, description]
      );
      res.status(201).json({ id: result.insertId, title, description });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
}
