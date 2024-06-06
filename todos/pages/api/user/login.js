import { comparePassword, generateToken } from "@/utils/auth";
import pool from "../../../databse/db";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { email, password } = req.body;

    try {
      const [rows] = await pool.query("SELECT * FROM users WHERE email = ?", [
        email,
      ]);
      console.log("rows", rows);
      if (rows.length === 0)
        return res.status(401).json({ message: "Invalid credentials" });

      const user = rows[0];
      console.log("user", user);
      const isMatch = await comparePassword(password, user.password);
      if (!isMatch)
        return res.status(401).json({ message: "Invalid credentials" });
      console.log("password matched", isMatch);
      const token = generateToken(user);
      console.log("token", token);
      await pool.query("UPDATE users SET token = ? WHERE id = ?", [
        token,
        user.id,
      ]);

      res.status(200).json({ message: "User Login Successfully...!", token });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: error });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
