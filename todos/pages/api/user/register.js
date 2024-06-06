import bcrypt from "bcryptjs";
import pool from "../../../databse/db";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { userName, email, password } = req.body;

  if (!userName || !email || !password) {
    return res.status(400).json({ error: "All The Fields are Mandatory...!" });
  }

  try {
    // Check if the Email already exists
    const [existingUser] = await pool.query(
      "SELECT * FROM users WHERE email = ?",
      [email]
    );
    console.log(existingUser);

    if (existingUser.length > 0) {
      return res.status(409).json({ error: "Email already Exits...!" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log(hashedPassword);

    // Inserting the new user into the database
    const [result] = await pool.query(
      "INSERT INTO users (userName,email, password) VALUES (?, ?,?)",
      [userName, email, hashedPassword]
    );
    console.log(result);
    res
      .status(201)
      .json({ id: result.insertId, userName, email, hashedPassword });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error when registering user...!" });
  }
}
