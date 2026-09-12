const express = require("express");

const {
  generateSummary,
} = require("../controllers/aiController");

const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

/**
 * @swagger
 * /api/ai/summary:
 *   post:
 *     summary: Generate an AI-powered resume summary
 *     tags:
 *       - AI
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               fullName:
 *                 type: string
 *                 example: Madhu Thakur
 *               skills:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example:
 *                   - React.js
 *                   - Node.js
 *                   - MongoDB
 *               experience:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     jobTitle:
 *                       type: string
 *                       example: Full Stack Developer Intern
 *                     company:
 *                       type: string
 *                       example: ASWEBWORKS
 *                     description:
 *                       type: string
 *                       example: Developed REST APIs and React applications
 *               education:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     degree:
 *                       type: string
 *                       example: MCA
 *                     institution:
 *                       type: string
 *                       example: ABC University
 *               projects:
 *                 type: array
 *                 items:
 *                   type: object
 *                 example:
 *                   - name: Resume Builder
 *                     description: Full stack resume building application
 *     responses:
 *       200:
 *         description: AI summary generated successfully
 *       400:
 *         description: Resume information is required
 *       401:
 *         description: Invalid or missing token
 *       500:
 *         description: Failed to generate resume summary
 */
router.post(
  "/summary",
  authMiddleware,
  generateSummary
);

module.exports = router;