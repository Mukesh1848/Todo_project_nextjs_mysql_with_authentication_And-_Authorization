// import pool from "../../databse/db";

// export default async function handler(req, res) {
//   const { method } = req;
//   if (method === "GET") {
//     try {
//       const [rows] = await pool.query("SELECT * FROM Todo");
//       res.status(200).json(rows);
//     } catch (error) {
//       res.status(500).json({ error: error.message });
//     }
//   } else if (method === "POST") {
//     const { title, description } = req.body;
//     try {
//       const [result] = await pool.query(
//         "INSERT INTO Todo (title, description) VALUES (?, ?)",
//         [title, description]
//       );
//       res.status(201).json({ id: result.insertId, title, description });
//     } catch (error) {
//       res.status(500).json({ error: error.message });
//     }
//   } else if (method === "PUT") {
//     const { id, title, description } = req.body;
//     try {
//       const [result] = await pool.query(
//         "UPDATE Todo SET title = ?, description = ? WHERE id = ?",
//         [title, description, id]
//       );
//       res.status(200).json({ id, title, description });
//     } catch (error) {
//       res.status(500).json({ error: error.message });
//     }
//   } else if (method === "DELETE") {
//     const { id } = req.body;
//     try {
//       const [result] = await pool.query("DELETE FROM Todo WHERE id = ?", [id]);
//       res.status(202).json({ message: "Todo deleted successfully" });
//     } catch (error) {
//       res.status(500).json({ error: error.message });
//     }
//   } else {
//     res.setHeader("Allow", ["GET", "POST", "PUT", "DELETE"]);
//     res.status(405).end(`Method ${method} Not Allowed`);
//   }
// }
