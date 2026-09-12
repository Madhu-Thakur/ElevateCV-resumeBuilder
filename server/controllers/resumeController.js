const Resume = require("../models/Resume");

const createResume = async (req, res) => {
  try {
    const {
      title,
      personalInfo,
      summary,
      education,
      experience,
      skills,
      projects,
      certifications,
      achievements,
      languages,
      interests,
      sectionOrder,
      typography,
      customColors,
      template,
    } = req.body;

    // Validate title
    if (!title) {
      return res.status(400).json({
        success: false,
        message: "Resume title is required",
      });
    }

    // Create resume for logged-in user
    const resume = new Resume({
      userId: req.user.userId,
      title,
      personalInfo,
      summary,
      education,
      experience,
      skills,
      projects,
      certifications,
      achievements,
      languages,
      interests,
      sectionOrder,
      typography,
      customColors,
      template,
    });

    // Save to MongoDB
    await resume.save();

    return res.status(201).json({
      success: true,
      message: "Resume created successfully",
      resume,
    });
  } catch (error) {
    console.error("Create resume error:", error);

    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};


const getResumes = async (req, res) => {
  try {
    const resumes = await Resume.find({
      userId: req.user.userId,
    }).sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: resumes.length,
      resumes,
    });
  } catch (error) {
    console.error("Get resumes error:", error);

    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};


const getResumeById = async (req, res) => {
  try {
    const resume = await Resume.findOne({
      _id: req.params.id,
      userId: req.user.userId,
    });

    if (!resume) {
      return res.status(404).json({
        success: false,
        message: "Resume not found",
      });
    }

    return res.status(200).json({
      success: true,
      resume,
    });
  } catch (error) {
    console.error("Get resume error:", error);

    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};


const ALLOWED_UPDATE_FIELDS = [
  "title",
  "personalInfo",
  "summary",
  "education",
  "experience",
  "skills",
  "projects",
  "certifications",
  "achievements",
  "languages",
  "interests",
  "sectionOrder",
  "typography",
  "customColors",
  "template",
];

const updateResume = async (req, res) => {
  try {
    const updates = {};

    for (const field of ALLOWED_UPDATE_FIELDS) {
      if (Object.prototype.hasOwnProperty.call(req.body, field)) {
        updates[field] = req.body[field];
      }
    }

    const resume = await Resume.findOneAndUpdate(
      {
        _id: req.params.id,
        userId: req.user.userId,
      },
      { $set: updates },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!resume) {
      return res.status(404).json({
        success: false,
        message: "Resume not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Resume updated successfully",
      resume,
    });
  } catch (error) {
    console.error("Update resume error:", error);

    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};


const deleteResume = async (req, res) => {
  try {
    const resume = await Resume.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.userId,
    });

    if (!resume) {
      return res.status(404).json({
        success: false,
        message: "Resume not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Resume deleted successfully",
    });
  } catch (error) {
    console.error("Delete resume error:", error);

    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

module.exports = {
  createResume,
  getResumes,
  getResumeById,
  updateResume,
  deleteResume,
};