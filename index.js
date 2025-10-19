// server/index.ts
import express from "express";
import { createServer } from "http";
import path from "path";
import { fileURLToPath } from "url";
import cors from "cors";
var __filename = fileURLToPath(import.meta.url);
var __dirname = path.dirname(__filename);
var currentSession = {
  pin: "",
  active: false,
  participants: [],
  startTime: null,
  leaderboard: [],
  studentProgress: /* @__PURE__ */ new Map()
};
async function startServer() {
  const app = express();
  const server = createServer(app);
  app.use(cors());
  app.use(express.json());
  app.post("/api/session/generate-pin", (req, res) => {
    const pin = Math.random().toString(36).substring(2, 8).toUpperCase();
    currentSession.pin = pin;
    currentSession.active = false;
    currentSession.participants = [];
    currentSession.startTime = null;
    res.json({ pin });
  });
  app.post("/api/session/validate-pin", (req, res) => {
    const { pin } = req.body;
    const isValid = pin.toUpperCase() === currentSession.pin.toUpperCase();
    res.json({ valid: isValid });
  });
  app.post("/api/session/join", (req, res) => {
    const { name, pin } = req.body;
    if (pin.toUpperCase() !== currentSession.pin.toUpperCase()) {
      return res.status(400).json({ error: "Invalid PIN" });
    }
    if (!currentSession.participants.includes(name)) {
      currentSession.participants.push(name);
    }
    res.json({ success: true, participants: currentSession.participants });
  });
  app.get("/api/session/status", (req, res) => {
    res.json({
      pin: currentSession.pin,
      active: currentSession.active,
      participants: currentSession.participants,
      startTime: currentSession.startTime
    });
  });
  app.post("/api/session/start", (req, res) => {
    currentSession.active = true;
    currentSession.startTime = Date.now();
    res.json({ success: true });
  });
  app.get("/api/session/participants", (req, res) => {
    res.json({ participants: currentSession.participants });
  });
  app.post("/api/leaderboard/submit", (req, res) => {
    const result = req.body;
    currentSession.leaderboard = currentSession.leaderboard.filter(
      (entry) => entry.studentName !== result.studentName
    );
    currentSession.leaderboard.push(result);
    currentSession.leaderboard.sort((a, b) => b.score - a.score);
    res.json({ success: true });
  });
  app.get("/api/leaderboard", (req, res) => {
    res.json({ leaderboard: currentSession.leaderboard });
  });
  app.post("/api/session/progress", (req, res) => {
    const { studentName, currentQuestion, answeredCount } = req.body;
    currentSession.studentProgress.set(studentName, {
      name: studentName,
      currentQuestion,
      answeredCount,
      lastUpdate: Date.now()
    });
    res.json({ success: true });
  });
  app.get("/api/session/progress", (req, res) => {
    const progress = Array.from(currentSession.studentProgress.values());
    res.json({ progress });
  });
  app.post("/api/session/reset", (req, res) => {
    currentSession = {
      pin: "",
      active: false,
      participants: [],
      startTime: null,
      leaderboard: [],
      studentProgress: /* @__PURE__ */ new Map()
    };
    res.json({ success: true });
  });
  const staticPath = process.env.NODE_ENV === "production" ? path.resolve(__dirname, "public") : path.resolve(__dirname, "..", "dist", "public");
  app.use(express.static(staticPath));
  app.get("*", (_req, res) => {
    res.sendFile(path.join(staticPath, "index.html"));
  });
  const port = process.env.PORT || 3e3;
  server.listen(port, () => {
    console.log(`Server running on http://localhost:${port}/`);
    console.log(`API endpoints available at http://localhost:${port}/api/`);
  });
}
startServer().catch(console.error);
