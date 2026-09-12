export const mapResumeToBackend = (resumeData) => {
  return {
    title: resumeData.title || "My Resume",

    personalInfo: {
      fullName: resumeData.personalInfo?.name || "",
      email: resumeData.personalInfo?.email || "",
      phone: resumeData.personalInfo?.phone || "",
      location: resumeData.personalInfo?.location || "",
      linkedin: resumeData.personalInfo?.linkedin || "",
      github: resumeData.personalInfo?.github || "",
      portfolio: resumeData.personalInfo?.portfolio || "",
      profileImage: resumeData.personalInfo?.profileImage || "",
    },

    summary: resumeData.summary || "",

    education: (resumeData.education || []).map((item) => ({
      degree: item.degree || "",
      institution: item.institution || "",
      startDate: item.startDate || "",
      endDate: item.endDate || "",
      description: item.description || "",
    })),

    experience: (resumeData.experience || []).map((item) => ({
      jobTitle: item.role || "",
      company: item.company || "",
      startDate: item.startDate || "",
      endDate: item.currentlyWorking ? "" : item.endDate || "",
      currentlyWorking: Boolean(item.currentlyWorking),
      description: item.responsibilities || "",
    })),

    skills: resumeData.skills || [],

    projects: (resumeData.projects || []).map((item) => ({
      name: item.title || "",
      description: item.description || "",
      technologies: item.techStack || [],
      github: item.github || "",
      link: item.live || "",
    })),

    certifications: (resumeData.certifications || []).map((item) => ({
      name: item.name || "",
      provider: item.provider || "",
      completionId: item.completionId || "",
      url: item.url || "",
      validity: item.validity || "",
    })),

    achievements: (resumeData.achievements || []).filter(
      (item) => typeof item === "string" && item.trim() !== ""
    ),

    languages: (resumeData.languages || []).map((item) => ({
      name: item.name || "",
      level: item.level || "Intermediate",
    })),

    interests: (resumeData.interests || []).filter(
      (item) => typeof item === "string" && item.trim() !== ""
    ),

    sectionOrder: resumeData.sectionOrder || [
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

    typography: {
      fontFamily: resumeData.typography?.fontFamily || "Arial",
      fontSize: resumeData.typography?.fontSize || "medium",
    },

    customColors: {
      primary: resumeData.customColors?.primary || "#144667",
      secondary: resumeData.customColors?.secondary || "#eb5141",
    },

    template: resumeData.template || "classic",
  };
};


// Convert backend resume data into frontend format

export const mapBackendToResume = (resume) => {
  return {
    title: resume.title || "My Resume",

    personalInfo: {
      name: resume.personalInfo?.fullName || "",
      email: resume.personalInfo?.email || "",
      phone: resume.personalInfo?.phone || "",
      location: resume.personalInfo?.location || "",
      linkedin: resume.personalInfo?.linkedin || "",
      github: resume.personalInfo?.github || "",
      portfolio: resume.personalInfo?.portfolio || "",
      profileImage: resume.personalInfo?.profileImage || "",
    },

    summary: resume.summary || "",

    education: resume.education || [],

    experience: (resume.experience || []).map((item) => ({
      role: item.jobTitle || "",
      company: item.company || "",
      startDate: item.startDate || "",
      endDate: item.currentlyWorking ? "" : item.endDate || "",
      responsibilities: item.description || "",
      currentlyWorking: Boolean(item.currentlyWorking),
    })),

    skills: resume.skills || [],

    projects: (resume.projects || []).map((item) => ({
      title: item.name || "",
      description: item.description || "",
      techStack: item.technologies || [],
      github: item.github || "",
      live: item.link || "",
    })),

    certifications: resume.certifications || [],
    achievements: resume.achievements || [],
    languages: resume.languages || [],
    interests: resume.interests || [],

    template: resume.template || "classic",

    sectionOrder: resume.sectionOrder || [
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

    typography: {
      fontFamily: resume.typography?.fontFamily || "Arial",
      fontSize: resume.typography?.fontSize || "medium",
    },

    customColors: {
      primary: resume.customColors?.primary || "#144667",
      secondary: resume.customColors?.secondary || "#eb5141",
    },
  };
};