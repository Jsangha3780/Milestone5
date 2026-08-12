import { Router, Request, Response } from "express";
import pool from "../db";

const router = Router();

// GET all registrations
router.get("/", async (_req: Request, res: Response) => {
  const [rows] = await pool.query("SELECT * FROM event_registrations");
  res.json(rows);
});

// GET one registration
router.get("/:id", async (req: Request, res: Response) => {
  const [rows]: any = await pool.query("SELECT * FROM event_registrations WHERE registration_id = ? = ?", [req.params.id]);
  if (!rows || rows.length === 0) {
    return res.status(404).json({ message: `Registration ${req.params.id} not found` });
  }
  res.json(rows[0]);
});

// POST new registration
router.post("/", async (req: Request, res: Response) => {
  const { user_id, event_id } = req.body;

  if (!user_id || !event_id) {
    res.status(400).json({
      error: "user_id and event_id are required"
    });
    return;
  }

  const [result]: any = await pool.query(
    "INSERT INTO event_registrations (user_id, event_id) VALUES (?, ?)",
    [user_id, event_id]
  );

  res.status(201).json({
    id: result.insertId,
    user_id,
    event_id
  });
});

// PUT update registration
router.put("/:id", async (req: Request, res: Response) => {
  const { user_id, event_id } = req.body;

  const [result]: any = await pool.query(
    "UPDATE event_registrations SET user_id = ?, event_id = ? WHERE registration_id = ?",
    [user_id, event_id, req.params.id]
  );

  if (result.affectedRows === 0) {
    return res.status(404).json({ message: `Registration ${req.params.id} not found` });
  }

  res.json({
    message: `Registration ${req.params.id} updated`,
    user_id,
    event_id
  });
});

// DELETE registration
router.delete("/:id", async (req: Request, res: Response) => {
  const [result]: any = await pool.query("DELETE FROM event_registrations WHERE registration_id = ?", [req.params.id]);
  if (result.affectedRows === 0) {
    return res.status(404).json({ message: `Registration ${req.params.id} not found` });
  }
  res.json({ message: `Registration ${req.params.id} deleted` });
});

export default router;

