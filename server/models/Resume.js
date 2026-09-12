const mongoose = require("mongoose");

const resumeSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    title: {
      type: String,
      required: true,
      trim: true,
    },

    personalInfo: {
      fullName: {
        type: String,
        trim: true,
      },
      email: {
        type: String,
        trim: true,
      },
      phone: {
        type: String,
        trim: true,
      },
      location: {
        type: String,
        trim: true,
      },
      linkedin: {
        type: String,
        trim: true,
      },
      github: {
        type: String,
        trim: true,
      },
      portfolio: {
        type: String,
        trim: true,
      },
      profileImage: {
        type: String,
      },
    },

    summary: {
      type: String,
      trim: true,
    },

    education: [
      {
        degree: String,
        institution: String,
        startDate: String,
        endDate: String,
        description: String,
      },
    ],

    experience: [
      {
        jobTitle: String,
        company: String,
        startDate: String,
        endDate: String,
        currentlyWorking: {
          type: Boolean,
          default: false,
        },
        description: String,
      },
    ],

    skills: [
      {
        type: String,
        trim: true,
      },
    ],

    projects: [
      {
        name: String,
        description: String,
        technologies: [String],
        github: String,
        link: String,
      },
    ],

    certifications: [
      {
        name: String,
        provider: String,
        completionId: String,
        url: String,
        validity: String,
      },
    ],

    achievements: [String],

    languages: [
      {
        name: String,
        level: String,
      },
    ],

    interests: [String],

    sectionOrder: {
      type: [String],
      default: [
        "personal",
        "summary",
        "education",
        "experience",
        "skills",
        "projects",
        "certifications",
        "achievements",
        "languages",
        "interests",
      ],
    },

    typography: {
      fontFamily: {
        type: String,
        default: "Arial",
      },
      fontSize: {
        type: String,
        default: "medium",
      },
    },

    customColors: {
      primary: {
        type: String,
        default: "#144667",
      },
      secondary: {
        type: String,
        default: "#eb5141",
      },
    },

    template: {
      type: String,
      default: "classic",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Resume", resumeSchema);