
export const FONT_FAMILIES = [
  "Arial",
  "Georgia",
  "Times New Roman",
  "Verdana",
  "Trebuchet MS",
];

export const FONT_SIZES = [
  { value: "small", label: "Small" },
  { value: "medium", label: "Medium" },
  { value: "large", label: "Large" },
];
 
export const getFontScale = (fontSize) => {
  if (fontSize === "small") return 0.9;
  if (fontSize === "large") return 1.1;
  return 1;
};

export const DEFAULT_SECTION_ORDER = [
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
];

export const SECTION_LABELS = {
  personal: "Personal Information",
  summary: "Professional Summary",
  education: "Education",
  experience: "Experience",
  skills: "Skills",
  projects: "Projects",
  certifications: "Certifications",
  achievements: "Achievements",
  languages: "Languages",
  interests: "Interests",
};
 
export const sectionStyle = (sectionOrder, key) => {
  const index = (sectionOrder || []).indexOf(key);
  return index >= 0 ? { order: index + 1 } : undefined;
};
