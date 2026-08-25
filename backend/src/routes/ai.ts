import { Router } from "express";

const router = Router();

router.post("/chat", (_req, res) => {
  res.json({
    success: true,
    data: null,
    message: "AI chat — implementation pending. AI service will be connected in a future phase.",
  });
});

router.get("/suggestions", (_req, res) => {
  res.json({
    success: true,
    data: [
      "How is Patan connected to Patola weaving?",
      "Why is Rani ki Vav historically important?",
      "How did trade influence Gujarat's textile traditions?",
    ],
    message: "AI suggestions — placeholder data",
  });
});

export { router as aiRouter };
