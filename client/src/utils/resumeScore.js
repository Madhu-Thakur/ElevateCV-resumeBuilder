 
const clamp = (value, min, max) => Math.min(max, Math.max(min, value));

const isFilled = (value) =>
  typeof value === "string" ? value.trim().length > 0 : Boolean(value);

function scorePersonal(personalInfo = {}) {
  const max = 15;
  const missing = [];
  const coreFields = ["name", "email", "phone", "location"];
  const corePoints = [3, 3, 3, 2]; // name, email, phone, location = 11
  let score = 0;

  coreFields.forEach((field, i) => {
    if (isFilled(personalInfo[field])) {
      score += corePoints[i];
    } else {
      missing.push(field);
    }
  });

  // Online profiles: 4 points partial credit (LinkedIn / GitHub / Portfolio)
  const profiles = ["linkedin", "github", "portfolio"].filter((f) =>
    isFilled(personalInfo[f])
  );
  if (profiles.length === 0) missing.push("online profiles");
  score += Math.min(profiles.length, 2) * 2;

  return { score: clamp(score, 0, max), max, missing };
}

function scoreSummary(summary) {
  const max = 15;
  const missing = [];
  const text = (summary || "").trim();

  if (!text) {
    missing.push("professional summary");
    return { score: 0, max, missing };
  }

  const words = text.split(/\s+/).length;
  let score;
  if (words < 20) {
    score = 8; // exists but too short
    missing.push("longer summary (aim for 30+ words)");
  } else if (words < 30) {
    score = 12;
  } else {
    score = 15; // reasonable length
  }

  return { score: clamp(score, 0, max), max, missing };
}

function scoreExperience(experience = []) {
  const max = 20;
  const missing = [];
  const entries = (experience || []).filter(
    (e) => e && (isFilled(e.company) || isFilled(e.role))
  );

  if (entries.length === 0) {
    return { score: 0, max, missing: ["work experience"] };
  }

  // First entry: existence 4 + company 3 + role 3 + dates 2 + resp. 4 = 16
  const e0 = entries[0];
  let score = 4;
  if (isFilled(e0.company)) score += 3;
  else missing.push("company name");
  if (isFilled(e0.role)) score += 3;
  else missing.push("job title");
  if (isFilled(e0.startDate) || isFilled(e0.endDate)) score += 2;
  else missing.push("dates");
  if (isFilled(e0.responsibilities)) score += 4;
  else missing.push("responsibilities");

  // A second entry can earn up to 4 bonus points (more complete = higher)
  if (entries.length > 1) {
    const e1 = entries[1];
    score +=
      (isFilled(e1.company) ? 1 : 0) +
      (isFilled(e1.role) ? 1 : 0) +
      (isFilled(e1.startDate) || isFilled(e1.endDate) ? 1 : 0) +
      (isFilled(e1.responsibilities) ? 1 : 0);
  }

  return { score: clamp(score, 0, max), max, missing };
}

function scoreEducation(education = []) {
  const max = 15;
  const missing = [];
  const entries = (education || []).filter(
    (e) => e && (isFilled(e.degree) || isFilled(e.institution))
  );

  if (entries.length === 0) {
    return { score: 0, max, missing: ["education"] };
  }

  const e = entries[0];
  let score = 3; // existence
  if (isFilled(e.degree)) score += 4;
  else missing.push("degree");
  if (isFilled(e.institution)) score += 4;
  else missing.push("institution");
  if (isFilled(e.startDate) || isFilled(e.endDate)) score += 4;
  else missing.push("education dates");

  return { score: clamp(score, 0, max), max, missing };
}

function scoreSkills(skills = []) {
  const max = 15;
  const missing = [];
  const valid = (skills || []).filter((s) => isFilled(s));

  if (valid.length === 0) {
    return { score: 0, max, missing: ["skills"] };
  }

  // 2 points per skill up to 12, plus 3 bonus at a healthy count (6+)
  let score = Math.min(valid.length, 6) * 2;
  if (valid.length >= 6) {
    score += 3;
  } else {
    missing.push("more skills (aim for 6+)");
  }

  return { score: clamp(score, 0, max), max, missing };
}

function scoreProjects(projects = []) {
  const max = 10;
  const missing = [];
  const entries = (projects || []).filter((p) => p && isFilled(p.title));

  if (entries.length === 0) {
    return { score: 0, max, missing: ["projects"] };
  }

  const p = entries[0];
  let score = 2; // existence
  if (isFilled(p.description)) score += 4;
  else missing.push("project description");

  const hasTech = Array.isArray(p.techStack) && p.techStack.length > 0;
  const hasLink = isFilled(p.github) || isFilled(p.live);
  if (hasTech || hasLink) score += 4;
  else missing.push("project technologies or link");

  return { score: clamp(score, 0, max), max, missing };
}

function scoreAdditional(resumeData = {}) {
  const max = 10;
  const missing = [];
  const defs = [
    { key: "certifications", weight: 3 },
    { key: "achievements", weight: 3 },
    { key: "languages", weight: 2 },
    { key: "interests", weight: 2 },
  ];

  let score = 0;

  defs.forEach(({ key, weight }) => {
    const items = resumeData[key] || [];
    const hasData = items.some((item) =>
      typeof item === "string" ? isFilled(item) : isFilled(item?.name)
    );
    if (hasData) {
      score += weight;
    } else {
      missing.push(key);
    }
  });

  return { score: clamp(score, 0, max), max, missing };
}

/* ---------- Public API ---------- */

export const SCORE_CATEGORIES = [
  { key: "personal", label: "Personal Information", weight: 15 },
  { key: "summary", label: "Professional Summary", weight: 15 },
  { key: "experience", label: "Experience", weight: 20 },
  { key: "education", label: "Education", weight: 15 },
  { key: "skills", label: "Skills", weight: 15 },
  { key: "projects", label: "Projects", weight: 10 },
  { key: "additional", label: "Additional Sections", weight: 10 },
];

export const getScoreStatus = (score) => {
  if (score >= 80) return { label: "Excellent", tone: "success" };
  if (score >= 60) return { label: "Good", tone: "primary" };
  if (score >= 40) return { label: "Needs Improvement", tone: "warning" };
  return { label: "Needs Work", tone: "danger" };
};

const SUGGESTION_TEXT = {
  name: "Add your full name.",
  email: "Add a professional email address.",
  phone: "Add a phone number.",
  location: "Add your location.",
  "online profiles": "Add LinkedIn, GitHub or a portfolio link.",
  "professional summary": "Add a professional summary.",
  "longer summary (aim for 30+ words)":
    "Expand your professional summary (aim for 30+ words).",
  "work experience": "Add at least one work experience.",
  "company name": "Add the company name for your experience.",
  "job title": "Add your job title for your experience.",
  dates: "Add start and end dates.",
  "education dates": "Add dates for your education.",
  responsibilities:
    "Describe your responsibilities and achievements in your experience.",
  education: "Add at least one education entry.",
  degree: "Complete your education details (degree).",
  institution: "Complete your education details (institution).",
  skills: "Add relevant skills.",
  "more skills (aim for 6+)": "Add more skills (aim for 6 or more).",
  projects: "Add at least one project.",
  "project description": "Describe what your project does.",
  "project technologies or link":
    "Add technologies or a link for your project.",
  certifications: "Add a certification.",
  achievements: "Add an achievement or award.",
  languages: "Add languages you speak.",
  interests: "Add a few interests.",
};

export const getResumeScore = (resumeData = {}) => {
  const scorers = {
    personal: () => scorePersonal(resumeData.personalInfo),
    summary: () => scoreSummary(resumeData.summary),
    experience: () => scoreExperience(resumeData.experience),
    education: () => scoreEducation(resumeData.education),
    skills: () => scoreSkills(resumeData.skills),
    projects: () => scoreProjects(resumeData.projects),
    additional: () => scoreAdditional(resumeData),
  };

  const breakdown = SCORE_CATEGORIES.map(({ key, label, weight }) => {
    const { score, max, missing } = scorers[key]();
    // Normalize each section to its configured weight (defensive; they match)
    const normalized = Math.round((clamp(score, 0, max) / max) * weight);
    return {
      key,
      label,
      score: normalized,
      max: weight,
      missing: missing || [],
    };
  });

  const score = clamp(
    breakdown.reduce((sum, section) => sum + section.score, 0),
    0,
    100
  );

  // Top actionable suggestions ordered by section impact
  const suggestions = breakdown
    .flatMap((section) =>
      section.missing.map((m) => ({
        text: SUGGESTION_TEXT[m] || `Improve: ${m}.`,
        weight: section.max - section.score,
      }))
    )
    .sort((a, b) => b.weight - a.weight)
    .slice(0, 5)
    .map((s) => s.text);

  return { score, breakdown, suggestions };
};
