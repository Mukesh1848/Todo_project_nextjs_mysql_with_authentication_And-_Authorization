// This is used to get the todo when we click to edit button
// import pool from "../../../databse/db";

// export default async function handler(req, res) {
//   console.log(req.query.id);
//   console.log(req.params.id);
//   try {
//     const [rows] = await pool.query(
//       "SELECT todo.title,todo.description FROM Todo where id =?",
//       [req.query.id]
//     );
//     res.status(200).json(rows);
//   } catch (error) {
//     console.log(error);
//     throw error;
//   }
// }

// import pool from "../../../databse/db";
// import { authenticateToken } from "../../../utils/auth";

// export default async function handler(req, res) {
//   // authenticateToken(req, res, async () => {

//   const { id } = req.query();
//   try {
//     const [rows] = await pool.query(
//       "SELECT todo.title,todo.description FROM Todo where id =?",
//       [id]
//     );
//     console.log(rows);
//     // res.status(200).json(rows);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
//   // });
// }

import pool from "../../../databse/db";
import { authenticateToken } from "../../../utils/auth";

export default async function handler(req, res) {
  authenticateToken(req, res, async () => {
    const { id } = req.query;
    try {
      const [rows] = await pool.query(
        "SELECT todo.title, todo.description FROM Todo WHERE id = ?",
        [id]
      );
      console.log(rows);
      res.status(200).json(rows);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
}
