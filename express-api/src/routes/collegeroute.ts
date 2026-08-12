import { Router, Request, Response } from "express";
import pool from "../db";

const router = Router();

/* 
   GET ALL COLLEGES
   Returns every college in the database.
 */
router.get("/", async (_req: Request, res: Response) => {
  const [rows] = await pool.query("SELECT * FROM colleges");
  res.json(rows);
});

/* 
   GET ONE COLLEGE BY ID
   Returns one college using its ID.
*/
router.get("/:id", async (req: Request, res: Response) => {
  const [rows]: any = await pool.query(
    "SELECT * FROM colleges WHERE college_id = ?",
    [req.params.id]
  );

  // If no college is found
  if (rows.length === 0) {
    return res.status(404).json({ message: "College not found" });
  }

  // Return the college
  res.json(rows[0]);
});

/* 
   ADD A NEW COLLEGE
   Inserts a new college into the database.
 */
router.post("/", async (req: Request, res: Response) => {

  console.log(req.body);   

  const { name } = req.body || {};   

  // Check if the name was entered
  if (!name) {
    return res.status(400).json({
      message: "College name is required"
    });
  }

  // Insert the new college
  const [result]: any = await pool.query(
    "INSERT INTO colleges (name) VALUES (?)",
    [name]
  );

  res.status(201).json({
    message: "College added successfully",
    id: result.insertId
  });
});

/* 
   UPDATE A COLLEGE
   Changes the college name using its ID.
*/
router.put("/:id", async (req: Request, res: Response) => {
 const { name } = req.body || {};

  // Update the college
  const [result]: any = await pool.query(
    "UPDATE colleges SET name = ? WHERE college_id = ?",
    [name, req.params.id]
  );

  // If no rows were updated
  if (result.affectedRows === 0) {
    return res.status(404).json({
      message: "College not found"
    });
  }

  res.json({
    message: "College updated successfully"
  });
});

/*
   DELETE A COLLEGE
   Deletes a college using its ID.
 */
router.delete("/:id", async (req: Request, res: Response) => {

  const [result]: any = await pool.query(
    "DELETE FROM colleges WHERE college_id = ?",
    [req.params.id]
  );

  // If no college exists
  if (result.affectedRows === 0) {
    return res.status(404).json({
      message: "College not found"
    });
  }

  res.json({
    message: "College deleted successfully"
  });
});

export default router;
