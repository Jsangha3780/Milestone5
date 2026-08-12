import { Router, Request, Response } from "express";
import pool from "../db";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { checkToken } from "../middleware/authMiddleware";
import loginLimiter from "../middleware/rateLimiter";

const router = Router();

/*
GET ALL USERS

Returns users without their passwords.
*/
router.get("/", async (_req: Request, res: Response) => {
  try {
    const [rows] = await pool.query(
      "SELECT user_id, email, college_id, last_name, created_at FROM users"
    );

    res.json(rows);

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Could not get users"
    });
  }
});


/*
GET ONE USER

Returns one user by ID.
Password is not returned.
*/
router.get("/:id", async (req: Request, res: Response) => {
  try {
    const [rows]: any = await pool.query(
      "SELECT user_id, email, college_id, last_name, created_at FROM users WHERE user_id = ?",
      [req.params.id]
    );

    if (!rows || rows.length === 0) {
      return res.status(404).json({
        message: `User ${req.params.id} not found`
      });
    }

    res.json(rows[0]);

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Could not get user"
    });
  }
});


/*
CREATE USER

Security features:
- Checks required fields
- Checks email
- Checks password length
- Checks duplicate email
- Hashes password with bcrypt
- Does not return password
*/
router.post("/", async (req: Request, res: Response) => {
  try {
    const {
      name,
      email,
      password,
      last_name,
      college_id
    } = req.body || {};

    // Check required fields
    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required"
      });
    }

    // Simple email validation
    if (!email.includes("@")) {
      return res.status(400).json({
        message: "Please enter a valid email"
      });
    }

    // Check password length
    if (password.length < 6) {
      return res.status(400).json({
        message: "Password must be at least 6 characters"
      });
    }

    // Check if email already exists
    const [existingUsers]: any = await pool.query(
      "SELECT user_id FROM users WHERE email = ?",
      [email]
    );

    if (existingUsers.length > 0) {
      return res.status(400).json({
        message: "Email already exists"
      });
    }

    // Hash the password before storing it
    const hashedPassword = await bcrypt.hash(password, 10);

    // Store the hashed password in MySQL
    const [result]: any = await pool.query(
      "INSERT INTO users (email, password, college_id, last_name) VALUES (?, ?, ?, ?)",
      [
        email,
        hashedPassword,
        college_id ?? null,
        last_name ?? name ?? null
      ]
    );

    // Never send the password back
    res.status(201).json({
      message: "User created successfully",
      id: result.insertId,
      email
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Could not create user"
    });
  }
});


/*
LOGIN

Security features:
- Rate limiting
- bcrypt password checking
- JWT authentication
*/
router.post(
  "/login",
  loginLimiter,
  async (req: Request, res: Response) => {

    try {
      const { email, password } = req.body || {};

      // Check required fields
      if (!email || !password) {
        return res.status(400).json({
          message: "Email and password are required"
        });
      }

      // Find the user by email
      const [users]: any = await pool.query(
        "SELECT * FROM users WHERE email = ?",
        [email]
      );

      // Do not reveal whether the email exists
      if (users.length === 0) {
        return res.status(401).json({
          message: "Invalid email or password"
        });
      }

      const user = users[0];

      // Compare entered password with bcrypt hash
      const passwordCorrect = await bcrypt.compare(
        password,
        user.password
      );

      // Password does not match
      if (!passwordCorrect) {
        return res.status(401).json({
          message: "Invalid email or password"
        });
      }

      // Make sure JWT secret exists
      if (!process.env.JWT_SECRET) {
        return res.status(500).json({
          message: "JWT secret is not configured"
        });
      }

      // Create JWT token
      const token = jwt.sign(
        {
          user_id: user.user_id,
          email: user.email
        },
        process.env.JWT_SECRET,
        {
          expiresIn: "1h"
        }
      );

      // Send token to the client
      res.json({
        message: "Login successful",
        token
      });

    } catch (error) {
      console.error(error);

      res.status(500).json({
        message: "Login failed"
      });
    }
  }
);


/*
UPDATE USER

Protected with JWT.
A valid token is required.
*/
router.patch(
  "/:id",
  checkToken,
  async (req: Request, res: Response) => {

    try {
      const {
        name,
        email,
        last_name,
        college_id
      } = req.body || {};

      const userId = req.params.id;

      // Only allow the logged-in user to update their own profile
      if (!req.user || req.user.user_id.toString() !== userId) {
        return res.status(403).json({
          message: "Forbidden: you can only update your own user account"
        });
      }

      // Find existing user
      const [existingRows]: any = await pool.query(
        "SELECT * FROM users WHERE user_id = ?",
        [userId]
      );

      if (!existingRows || existingRows.length === 0) {
        return res.status(404).json({
          message: `User ${userId} not found`
        });
      }

      const existing = existingRows[0];

      // Keep old values if they were not provided
      const updatedEmail = email ?? existing.email;

      const updatedCollegeId =
        college_id ?? existing.college_id ?? null;

      const updatedLastName =
        last_name ?? name ?? existing.last_name ?? null;

      // Update user
      await pool.query(
        "UPDATE users SET email = ?, college_id = ?, last_name = ? WHERE user_id = ?",
        [
          updatedEmail,
          updatedCollegeId,
          updatedLastName,
          userId
        ]
      );

      res.json({
        message: `User ${userId} updated`
      });

    } catch (error) {
      console.error(error);

      res.status(500).json({
        message: "Could not update user"
      });
    }
  }
);


/*
DELETE USER

Protected with JWT.
A valid token is required.
*/
router.delete(
  "/:id",
  checkToken,
  async (req: Request, res: Response) => {

    try {
      const userId = req.params.id;

      // Only allow the logged-in user to delete their own profile
      if (!req.user || req.user.user_id.toString() !== userId) {
        return res.status(403).json({
          message: "Forbidden: you can only delete your own user account"
        });
      }

      const [result]: any = await pool.query(
        "DELETE FROM users WHERE user_id = ?",
        [userId]
      );

      if (result.affectedRows === 0) {
        return res.status(404).json({
          message: `User ${userId} not found`
        });
      }

      res.json({
        message: `User ${userId} deleted`
      });

    } catch (error) {
      console.error(error);

      res.status(500).json({
        message: "Could not delete user"
      });
    }
  }
);


export default router;