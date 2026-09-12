"use client";

import { createContext, useContext, useState } from "react";

const ResumeContext = createContext(null);

const defaultResumeData = {
  title: "My Resume",

  personalInfo: {
    name: "",
    email: "",
    phone: "",
    location: "",
    linkedin: "",
    github: "",
    portfolio: "",
    profileImage: "",
  },

  summary: "",

  education: [],

  experience: [],

  skills: [],

  projects: [],

  certifications: [],

  achievements: [],

  languages: [],

  interests: [],

  template: "classic",

  sectionOrder: [
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
    fontFamily: "Arial",
    fontSize: "medium",
  },

  customColors: {
    primary: "#144667",
    secondary: "#eb5141",
  },
};

export const ResumeProvider = ({ children }) => {
  const [mode, setMode] = useState("fresher");
  const [currentStep, setCurrentStep] = useState(0);
  const [currentResumeId, setCurrentResumeId] = useState(null);

  const [resumeData, setResumeData] = useState(defaultResumeData);

  const updateField = (field, value) => {
    setResumeData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const updatePersonalInfo = (field, value) => {
    setResumeData((prev) => ({
      ...prev,
      personalInfo: {
        ...prev.personalInfo,
        [field]: value,
      },
    }));
  };

  const addItem = (section, item) => {
    setResumeData((prev) => ({
      ...prev,
      [section]: [...prev[section], item],
    }));
  };

  const removeItem = (section, index) => {
    setResumeData((prev) => ({
      ...prev,
      [section]: prev[section].filter((_, i) => i !== index),
    }));
  };

  const updateItem = (section, index, field, value) => {
  setResumeData((prev) => ({
    ...prev,
    [section]: prev[section].map((item, i) => {
      if (i !== index) {
        return item;
      }
 
      if (field === null) {
        return value;
      }
 
      return {
        ...item,
        [field]: value,
      };
    }),
  }));
};

  const setTemplate = (template) => {
    setResumeData((prev) => ({
      ...prev,
      template,
    }));
  };

  const setSectionOrder = (sectionOrder) => {
    setResumeData((prev) => ({
      ...prev,
      sectionOrder,
    }));
  };

  const updateTypography = (field, value) => {
    setResumeData((prev) => ({
      ...prev,
      typography: {
        ...defaultResumeData.typography,
        ...prev.typography,
        [field]: value,
      },
    }));
  };

  const updateCustomColors = (field, value) => {
    setResumeData((prev) => ({
      ...prev,
      customColors: {
        ...defaultResumeData.customColors,
        ...prev.customColors,
        [field]: value,
      },
    }));
  };

  const moveSection = (key, direction) => {
    setResumeData((prev) => {
      const order = [...(prev.sectionOrder || [])];
      const index = order.indexOf(key);
      const target = direction === "up" ? index - 1 : index + 1;

      if (index === -1 || target < 0 || target >= order.length) {
        return prev;
      }

      [order[index], order[target]] = [order[target], order[index]];
      return { ...prev, sectionOrder: order };
    });
  };

  const resetCustomization = () => {
    setResumeData((prev) => ({
      ...prev,
      typography: { ...defaultResumeData.typography },
      customColors: { ...defaultResumeData.customColors },
      sectionOrder: [...defaultResumeData.sectionOrder],
    }));
  };

  const resetResume = () => {
    setResumeData(defaultResumeData);
    setCurrentResumeId(null);
    setCurrentStep(0);
  };

  const nextStep = () => {
    setCurrentStep((prev) => prev + 1);
  };

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  };

  const value = {
    mode,
    setMode,

    currentStep,
    setCurrentStep,

    resumeData,
    setResumeData,

    currentResumeId,
    setCurrentResumeId,

    updateField,
    updatePersonalInfo,

    addItem,
    removeItem,
    updateItem,

    setTemplate,
    setSectionOrder,
    resetResume,

    updateTypography,
    updateCustomColors,
    moveSection,
    resetCustomization,

    nextStep,
    prevStep,
  };

  return (
    <ResumeContext.Provider value={value}>
      {children}
    </ResumeContext.Provider>
  );
};

export const useResume = () => {
  const context = useContext(ResumeContext);

  if (!context) {
    throw new Error("useResume must be used inside ResumeProvider");
  }

  return context;
};