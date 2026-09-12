"use client";

import { useResume } from "@/context/ResumeContext";

import PersonalSection from "@/components/sections/PersonalSection";
import SummarySection from "@/components/sections/SummarySection";
import EducationSection from "@/components/sections/EducationSection";
import ExperienceSection from "@/components/sections/ExperienceSection";
import SkillsSection from "@/components/sections/SkillsSection";
import ProjectsSection from "@/components/sections/ProjectsSection";
import AdditionalSection from "@/components/sections/AdditionalSection";
import CertificationsSection from "@/components/sections/CertificationsSection";
import AchievementsSection from "@/components/sections/AchievementsSection";
import LanguagesSection from "@/components/sections/LanguagesSection";
import InterestsSection from "@/components/sections/InterestsSection";

const steps = [
  {
    title: "Personal Information",
    shortTitle: "Personal",
    component: <PersonalSection />,
  },
  {
    title: "Professional Summary",
    shortTitle: "Summary",
    component: <SummarySection />,
  },
  {
    title: "Education",
    shortTitle: "Education",
    component: <EducationSection />,
  },
  {
    title: "Experience",
    shortTitle: "Experience",
    component: <ExperienceSection />,
  },
  {
    title: "Skills",
    shortTitle: "Skills",
    component: <SkillsSection />,
  },
  {
    title: "Projects",
    shortTitle: "Projects",
    component: <ProjectsSection />,
  },
  {
    title: "Additional Information",
    shortTitle: "Additional",
    component: (
      <>
        <AdditionalSection />
        <CertificationsSection />
        <AchievementsSection />
        <LanguagesSection />
        <InterestsSection />
      </>
    ),
  },
];

export default function WizardContainer() {
  const {
    currentStep,
    setCurrentStep,
    nextStep,
    prevStep,
  } = useResume();

  const current = steps[currentStep];
  const isFirstStep = currentStep === 0;
  const isLastStep = currentStep === steps.length - 1;

  return (
    <div>
      {/* Progress */}
      <div className="mb-4">
        <div className="d-flex justify-content-between align-items-center mb-2">
          <span className="fw-semibold">
            Step {currentStep + 1} of {steps.length}
          </span>

          <span className="text-muted small">
            {current.title}
          </span>
        </div>

        <div
          className="progress"
          role="progressbar"
          aria-valuenow={((currentStep + 1) / steps.length) * 100}
          aria-valuemin="0"
          aria-valuemax="100"
          style={{ height: "8px" }}
        >
          <div
            className="progress-bar"
            style={{
              width: `${((currentStep + 1) / steps.length) * 100}%`,
            }}
          />
        </div>
      </div>

      {/* Step Navigation */}
      <div className="d-flex flex-wrap gap-2 mb-4">
        {steps.map((step, index) => (
          <button
            key={step.shortTitle}
            type="button"
            className={`btn btn-sm ${
              index === currentStep
                ? "btn-primary"
                : index < currentStep
                ? "btn-outline-success"
                : "btn-outline-secondary"
            }`}
            onClick={() => setCurrentStep(index)}
          >
            {index + 1}. {step.shortTitle}
          </button>
        ))}
      </div>

      {/* Current Section */}
      <div>{current.component}</div>

      {/* Previous / Next */}
      <div className="d-flex justify-content-between mt-4">
        <button
          type="button"
          className="btn btn-outline-secondary"
          onClick={prevStep}
          disabled={isFirstStep}
        >
          ← Previous
        </button>

        {!isLastStep ? (
          <button
            type="button"
            className="btn btn-primary"
            onClick={nextStep}
          >
            Next →
          </button>
        ) : (
          <button
            type="button"
            className="btn btn-success"
          >
            Review Resume →
          </button>
        )}
      </div>
    </div>
  );
}