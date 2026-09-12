const express = require("express");
const {
  createResume,
  getResumes,
  getResumeById,
   updateResume,
   deleteResume,
} = require("../controllers/resumeController");
const {
  createResumeValidation,
  updateResumeValidation,
} = require("../validators/resumeValidator");

const validateRequest = require("../middleware/validationMiddleware");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

/**
 * @swagger
 * /api/resumes:
 *   post:
 *     summary: Create a new resume
 *     tags: [Resumes]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *             properties:
 *               title:
 *                 type: string
 *                 example: My Software Developer Resume
 *               personalInfo:
 *                 type: object
 *                 properties:
 *                   fullName:
 *                     type: string
 *                     example: Madhu Thakur
 *                   email:
 *                     type: string
 *                     example: madhu@test.com
 *                   phone:
 *                     type: string
 *                     example: "9876543210"
 *                   location:
 *                     type: string
 *                     example: Delhi
 *                   linkedin:
 *                     type: string
 *                     example: https://linkedin.com/in/madhu
 *                   github:
 *                     type: string
 *                     example: https://github.com/madhu
 *                   portfolio:
 *                     type: string
 *                     example: https://madhu.dev
 *               summary:
 *                 type: string
 *                 example: Full Stack Developer with experience in React and Node.js
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
 *                     startDate:
 *                       type: string
 *                       example: 2024
 *                     endDate:
 *                       type: string
 *                       example: 2026
 *                     description:
 *                       type: string
 *                       example: Computer Applications
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
 *                     startDate:
 *                       type: string
 *                       example: July 2026
 *                     endDate:
 *                       type: string
 *                       example: October 2026
 *                     description:
 *                       type: string
 *                       example: Developed REST APIs and React applications
 *               skills:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example:
 *                   - React.js
 *                   - Node.js
 *                   - MongoDB
 *               projects:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     name:
 *                       type: string
 *                       example: Resume Builder
 *                     description:
 *                       type: string
 *                       example: Full stack resume building application
 *                     technologies:
 *                       type: array
 *                       items:
 *                         type: string
 *                       example:
 *                         - React
 *                         - Node.js
 *                         - MongoDB
 *                     link:
 *                       type: string
 *                       example: https://github.com/madhu/resume-builder
 *               template:
 *                 type: string
 *                 example: modern
 *     responses:
 *       201:
 *         description: Resume created successfully
 *       400:
 *         description: Resume title is required
 *       401:
 *         description: Invalid or missing token
 *       500:
 *         description: Server error
 */
router.post(
  "/",
  authMiddleware,
  createResumeValidation,
  validateRequest,
  createResume
);

/**
 * @swagger
 * /api/resumes:
 *   get:
 *     summary: Get all resumes
 *     tags:
 *       - Resumes
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Resumes fetched successfully
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */
router.get("/", authMiddleware, getResumes);


/**
 * @swagger
 * /api/resumes/{id}:
 *   get:
 *     summary: Get resume by ID
 *     tags:
 *       - Resumes
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: Resume ID
 *     responses:
 *       200:
 *         description: Resume fetched successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Resume not found
 *       500:
 *         description: Server error
 */
router.get("/:id", authMiddleware, getResumeById);
 
/**
 * @swagger
 * /api/resumes/{id}:
 *   put:
 *     summary: Update a resume
 *     tags:
 *       - Resumes
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: Resume ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: Updated Software Developer Resume
 *               summary:
 *                 type: string
 *                 example: Full Stack Developer skilled in React and Node.js
 *               skills:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example:
 *                   - React.js
 *                   - Node.js
 *                   - MongoDB
 *                   - Express.js
 *               template:
 *                 type: string
 *                 example: modern
 *     responses:
 *       200:
 *         description: Resume updated successfully
 *       401:
 *         description: Invalid or missing token
 *       404:
 *         description: Resume not found
 *       500:
 *         description: Server error
 */
router.put(
  "/:id",
  authMiddleware,
  updateResumeValidation,
  validateRequest,
  updateResume
);
router.delete("/:id", authMiddleware, deleteResume);

module.exports = router;
