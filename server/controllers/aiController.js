const openai = require("../config/openai");
 
const SUMMARY_MODEL = process.env.OPENAI_MODEL || "gpt-4o-mini";

const hasMeaningfulValue = (value) => {
  if (value === undefined || value === null) return false;

  if (typeof value === "string") return value.trim() !== "";

  if (Array.isArray(value)) return value.some(hasMeaningfulValue);

  if (typeof value === "object") return Object.values(value).some(hasMeaningfulValue);

  return true;
};

const generateSummary = async (req, res) => {
  try {
    const {
      fullName,
      skills,
      experience,
      education,
      projects,
    } = req.body;

    if (
      !hasMeaningfulValue(skills) &&
      !hasMeaningfulValue(experience) &&
      !hasMeaningfulValue(projects)
    ) {
      return res.status(400).json({
        success: false,
        message: "Resume information is required",
      });
    }

    const prompt = `
Create a professional resume summary for ${fullName || "the candidate"}.

Skills:
${JSON.stringify(skills || [])}

Experience:
${JSON.stringify(experience || [])}

Education:
${JSON.stringify(education || [])}

Projects:
${JSON.stringify(projects || [])}

Write a concise, professional resume summary in 3-4 sentences.
Do not use first person.
Do not add information that is not provided.
`;

    const response = await openai.responses.create({
      model: SUMMARY_MODEL,
      input: prompt,
    });

    return res.status(200).json({
      success: true,
      summary: response.output_text,
    });
  } catch (error) {
    console.error("AI summary error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to generate resume summary",
    });
  }
};

module.exports = {
  generateSummary,
};