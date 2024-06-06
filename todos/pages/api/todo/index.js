// This file is used to view the logged in user all todos
import pool from "../../../databse/db";
import { authenticateToken } from "../../../utils/auth";

export default async (req, res) => {
  if (req.method === "GET") {
    await authenticateToken(req, res, async () => {
      const userId = req.user.id;
      // t.id, t.title, t.description
      try {
        const [todos] = await pool.query(
          `
            SELECT distinct t.id,t.title,t.description
            FROM todo t
            LEFT JOIN shared_todos st ON t.id = st.todo_id
            WHERE t.user_id = ? OR st.user_id = ?;
          `,
          [userId, userId]
        );
        res.status(200).json(todos);
        console.log(todos);
      } catch (error) {
        res.status(500).json({ message: "Error fetching todos", error });
      }
    });
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
};
