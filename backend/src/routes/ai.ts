/* ========================================
   Dharohar AI — AI / Chat Routes
   ======================================== */

import { Router } from "express";
import { requireDevelopmentApiKey } from "../middleware/apiKey";
import { requireDatabase } from "../database/helpers";
import { handleChat } from "../services/chatbot";
import { SUPPORTED_STATE_CODES, getWelcomeMessage } from "../config/languages";
import { isValidLanguage, SUPPORTED_LANGUAGES, getSuggestionsForContext } from "../config/languages";
import { query } from "../database";

const router = Router();

const MAX_MESSAGE_LENGTH = 1000;

/**
 * POST /api/ai/chat
 *
 * Chat endpoint — accepts a message and language,
 * returns a grounded heritage response with suggestions.
 * Requires: X-API-Key header
 */
router.post("/chat", requireDevelopmentApiKey, async (req, res) => {
  if (!requireDatabase(res)) return;

  try {
    const { message, language = "en", session_id, state } = req.body;

    // Validate message
    if (!message || typeof message !== "string" || !message.trim()) {
      res.status(400).json({
        success: false,
        error: {
          code: "INVALID_REQUEST",
          message: "Message is required and must be a non-empty string",
        },
      });
      return;
    }

    if (message.trim().length > MAX_MESSAGE_LENGTH) {
      res.status(400).json({
        success: false,
        error: {
          code: "MESSAGE_TOO_LONG",
          message: `Message must be ${MAX_MESSAGE_LENGTH} characters or fewer`,
        },
      });
      return;
    }

    // Validate language
    if (!isValidLanguage(language)) {
      res.status(400).json({
        success: false,
        error: {
          code: "UNSUPPORTED_LANGUAGE",
          message: `Unsupported language code: ${language}. Supported: ${Object.keys(SUPPORTED_LANGUAGES).join(", ")}`,
        },
      });
      return;
    }

    // Validate optional state
    if (state && !SUPPORTED_STATE_CODES.includes(state as typeof SUPPORTED_STATE_CODES[number])) {
      res.status(400).json({
        success: false,
        error: {
          code: "UNSUPPORTED_STATE",
          message: `Unsupported state code: ${state}. Supported: ${SUPPORTED_STATE_CODES.join(", ")}`,
        },
      });
      return;
    }

    const response = await handleChat({
      message: message.trim(),
      language,
      sessionId: session_id,
    });

    // Save conversation to database
    try {
      const convResult = await query(
        "INSERT INTO conversations (session_id, language) VALUES ($1, $2) RETURNING id",
        [session_id || null, language]
      );
      const convId = convResult.rows[0].id;

      await query(
        "INSERT INTO conversation_messages (conversation_id, role, content, intent, state_code, knowledge_ids) VALUES ($1, 'user', $2, $3, $4, $5)",
        [convId, message.trim(), response.intent, response.stateCode, response.knowledgeIds]
      );

      await query(
        "INSERT INTO conversation_messages (conversation_id, role, content, intent) VALUES ($1, 'assistant', $2, $3)",
        [convId, response.reply, response.intent]
      );
    } catch {
      // Conversation logging is non-critical
    }

    res.json({
      success: true,
      data: {
        reply: response.reply,
        intent: response.intent,
        state: response.stateCode,
        knowledge_ids: response.knowledgeIds,
        language,
        suggestions: response.suggestions || [],
      },
    });
  } catch (err) {
    console.error("[Chat] Error:", (err as Error).message);
    res.status(500).json({
      success: false,
      error: {
        code: "CHAT_ERROR",
        message: "An error occurred while processing your message",
      },
    });
  }
});

/**
 * GET /api/ai/welcome
 *
 * Returns the welcome message for the specified language.
 * Requires: X-API-Key header
 */
router.get("/welcome", requireDevelopmentApiKey, (req, res) => {
  const language = (req.query.language as string) || "en";
  const lang = isValidLanguage(language) ? language : "en";
  const msg = getWelcomeMessage(lang);

  // Get initial suggestions
  const suggestions = getSuggestionsForContext(null, null, lang);

  res.json({
    success: true,
    data: { message: msg, language: lang, suggestions },
  });
});

/**
 * GET /api/ai/suggestions
 *
 * Returns context-aware suggested questions.
 * Query params: language, intent, state
 * Requires: X-API-Key header
 */
router.get("/suggestions", requireDevelopmentApiKey, async (req, res) => {
  if (!requireDatabase(res)) return;

  try {
    const language = (req.query.language as string) || "en";
    const intent = (req.query.intent as string) || null;
    const state = (req.query.state as string) || null;

    const suggestions = getSuggestionsForContext(
      intent,
      state as typeof SUPPORTED_STATE_CODES[number] | null,
      isValidLanguage(language) ? language : "en"
    );

    res.json({
      success: true,
      data: suggestions,
    });
  } catch (err) {
    console.error("[Suggestions] Error:", (err as Error).message);
    // Fallback suggestions
    res.json({
      success: true,
      data: [
        { text: "Explore Gujarat heritage", category: "explore" },
        { text: "Tell me about Rajasthan forts", category: "explore" },
        { text: "gujarat na heritage places vishe janavo", category: "explore" },
        { text: "What is the Golden Temple?", category: "heritage" },
      ],
    });
  }
});

/**
 * GET /api/ai/languages
 *
 * Returns supported languages.
 * Requires: X-API-Key header
 */
router.get("/languages", requireDevelopmentApiKey, (_req, res) => {
  res.json({
    success: true,
    data: Object.values(SUPPORTED_LANGUAGES).map((l) => ({
      code: l.code,
      name: l.name,
      nativeName: l.nativeName,
    })),
  });
});

export { router as aiRouter };
