import pool from "../../databse/db";
import { authenticateToken } from "../../utils/auth";

export default async function helper(req, res) {
  authenticateToken(req, res, async () => {
    const userId = req.user.id;

    if (!userId) {
      res.json({ error: "userId not Found" });
    }

    try {
      const [rows] = await pool.query(
        "SELECT userName FROM users WHERE id = ?",
        [userId]
      );

      res.json({ userName: rows[0].userName });
    } catch (error) {
      res.status(404).json({ error: "User not found" });
    }
  });
}
