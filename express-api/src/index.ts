import express from "express";
import cors from "cors";

import userRoutes from "./routes/userRoutes";
import eventRoutes from "./routes/eventRoutes";
import registrationRoutes from "./routes/registrationRoutes";
import collegeRoutes from "./routes/collegeroute";

const app = express();

const PORT = 3000;

app.use(cors());
app.use(express.json());

app.get("/", (_req, res) => {
  res.json({
    message: "Campus Event Organizer API is running"
  });
});

// User routes
// Login rate limiting is handled inside userRoutes.ts
app.use("/api/users", userRoutes);

// Event routes
app.use("/api/events", eventRoutes);

//Registration routes
app.use("/api/registrations", registrationRoutes);

// College routes
app.use("/api/colleges", collegeRoutes);

app.use((req, res) => {
  res.status(404).json({
    message: "Route not found"
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});