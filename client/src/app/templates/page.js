"use client";
import Navbar from "@/components/common/Navbar";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useResume } from "@/context/ResumeContext";
import ClassicTemplate from "@/components/templates/ClassicTemplate";
import ModernSidebarTemplate from "@/components/templates/ModernSidebarTemplate";
import MinimalATSTemplate from "@/components/templates/MinimalATSTemplate";
import CompactTemplate from "@/components/templates/CompactTemplate";
import CreativeTemplate from "@/components/templates/CreativeTemplate";
import ExecutiveTemplate from "@/components/templates/ExecutiveTemplate";
import GridLayoutTemplate from "@/components/templates/GridLayoutTemplate";
import CardLayoutTemplate from "@/components/templates/CardLayoutTemplate";

const sampleResumeData = {
  personalInfo: {
    name: "Alex Johnson",
    email: "alex.johnson@email.com",
    phone: "+1 (555) 123-4567",
    location: "New York, NY",
    linkedin: "linkedin.com/in/alexjohnson",
    github: "github.com/alexjohnson",
    portfolio: "",
    profileImage: "",
  },
  summary:
    "Results-driven software engineer with 5+ years of experience building scalable web applications and leading cross-functional teams.",
  education: [
    {
      degree: "B.Tech in Computer Science",
      institution: "State University",
      startDate: "2015",
      endDate: "2019",
      description: "GPA: 3.8/4.0",
    },
  ],
  experience: [
    {
      role: "Senior Software Engineer",
      company: "TechCorp Inc.",
      startDate: "2021",
      endDate: "Present",
      currentlyWorking: true,
      responsibilities:
        "Led development of a microservices platform serving 2M+ users. Improved deployment time by 40% and mentored a team of 5 engineers.",
    },
  ],
  skills: [
    "JavaScript",
    "React",
    "Node.js",
    "Python",
    "SQL",
    "AWS",
    "Docker",
    "Team Leadership",
  ],
  projects: [
    {
      title: "CloudDash",
      description:
        "Cloud monitoring dashboard with real-time metrics and alerting used by 50+ teams.",
      techStack: ["React", "Node.js", "MongoDB"],
      github: "github.com/alexjohnson/clouddash",
      live: "clouddash.app",
    },
  ],
  certifications: [
    { name: "AWS Certified Solutions Architect", provider: "Amazon" },
  ],
  achievements: ["Employee of the Year 2023", "Hackathon Winner 2022"],
  languages: [
    { name: "English", level: "Native" },
    { name: "Spanish", level: "Intermediate" },
  ],
  interests: ["Photography", "Chess", "Open Source"],
  template: "classic",
  typography: { fontFamily: "Arial", fontSize: "medium" },
  customColors: { primary: "#144667", secondary: "#eb5141" },
};

const templates = [
  {
    key: "classic",
    name: "Classic Professional",
    description: "Timeless design perfect for corporate roles",
    Component: ClassicTemplate,
  },
  {
    key: "modern-sidebar",
    name: "Modern Sidebar",
    description: "Contemporary layout with sidebar emphasis",
    Component: ModernSidebarTemplate,
  },
  {
    key: "minimal-ats",
    name: "Minimal ATS",
    description: "ATS-friendly format for automated screening",
    Component: MinimalATSTemplate,
  },
  {
    key: "compact",
    name: "Compact",
    description: "Space-efficient design for dense content",
    Component: CompactTemplate,
  },
  {
    key: "creative",
    name: "Creative",
    description: "Bold design for creative industries",
    Component: CreativeTemplate,
  },
  {
    key: "executive",
    name: "Executive",
    description: "Premium layout for senior professionals",
    Component: ExecutiveTemplate,
  },
  {
    key: "grid",
    name: "Grid Layout",
    description: "Modern 4-column layout with organized sections",
    Component: GridLayoutTemplate,
  },
  {
    key: "card",
    name: "Card Layout",
    description: "3-row card-based design with modern aesthetics",
    Component: CardLayoutTemplate,
  },
];

export default function TemplatesPage() {
  const { setTemplate } = useResume();
  const router = useRouter();
  const [selected, setSelected] = useState("classic");

  const selectedTemplate = templates.find((t) => t.key === selected);

  const handleApply = () => {
    setTemplate(selected);
    router.push("/builder");
  };

  return (
    <main className="min-vh-100 bg-light">
      {/* Header */}
      <Navbar />

      {/* Header Section */}
      <section className="py-5">
        <div className="container text-center">
          <div className="row justify-content-center">
            <div className="col-lg-9">
              <span className="badge rounded-pill bg-success-subtle text-success px-3 py-2 mb-4">
                8 Professional Templates
              </span>
              <h1 className="display-4 fw-bold text-dark mb-4">
                Choose Your Template
              </h1>
              <p className="lead text-secondary mx-auto mb-0">
                Select a template that matches your industry and style
                preferences. Each template is optimized for different career
                paths and hiring systems.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Templates Grid */}
      <section className="pb-5">
        <div className="container">
          <div className="row g-4 justify-content-center">
            {templates.map((template) => {
              const { Component } = template;
              const isSelected = selected === template.key;

              return (
                <div className="col-12 col-md-6 col-lg-4" key={template.key}>
                  <div
                    role="button"
                    tabIndex={0}
                    onClick={() => setSelected(template.key)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        setSelected(template.key);
                      }
                    }}
                    className={`card h-100 rounded-4 template-card ${
                      isSelected
                        ? "border-primary border-2 shadow-lg"
                        : "border-0 shadow-sm"
                    }`}
                    style={{ cursor: "pointer" }}
                  >
                    <div className="card-body p-4">
                      <div className="d-flex justify-content-between align-items-start mb-3">
                        <div>
                          <h3 className="h5 fw-bold text-dark mb-1">
                            {template.name}
                          </h3>
                          <p className="text-secondary small mb-0">
                            {template.description}
                          </p>
                        </div>

                        {/* Selection Indicator */}
                        <span
                          className={`d-inline-flex align-items-center justify-content-center rounded-circle flex-shrink-0 ${
                            isSelected
                              ? "bg-primary"
                              : "border border-secondary-subtle"
                          }`}
                          style={{ width: 24, height: 24 }}
                        >
                          {isSelected && (
                            <svg
                              width="14"
                              height="14"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="white"
                              strokeWidth="3"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <path d="M5 13l4 4L19 7" />
                            </svg>
                          )}
                        </span>
                      </div>
 
                      <div
                        className="position-relative overflow-hidden border rounded-3 bg-secondary-subtle"
                        style={{ height: 224 }}
                      >
                        <div
                          className="position-absolute top-0 start-0 bg-white"
                          style={{
                            transform: "scale(0.25)",
                            transformOrigin: "top left",
                            width: "794px",
                            height: "1123px",
                          }}
                        >
                          <Component resumeData={sampleResumeData} />
                        </div>
                      </div>

                      {/* Features Badge */}
                      <div className="d-flex align-items-center justify-content-between mt-3">
                        <div className="d-flex gap-2">
                          <span className="badge rounded-pill bg-secondary-subtle text-secondary small">
                            Professional
                          </span>
                          <span className="badge rounded-pill bg-secondary-subtle text-secondary small">
                            Printable
                          </span>
                        </div>
                        <span className="text-secondary small">
                          Click to select
                        </span>
                      </div>


                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Apply Section */}
      <section className="pb-5">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <div className="card border-0 shadow-sm rounded-4">
                <div className="card-body p-4 p-lg-5 text-center">
                  <h2 className="fw-bold text-dark mb-2">
                    Ready to Apply Your Template?
                  </h2>
                  <p className="text-secondary mb-4">
                    Selected:{" "}
                    <span className="fw-semibold text-primary">
                      {selectedTemplate?.name}
                    </span>
                  </p>

                  <button
                    type="button"
                    onClick={handleApply}
                    className="btn btn-primary btn-lg px-5 py-3 fw-bold"
                  >
                    Apply Template <span className="ms-2">⚡</span>
                  </button>

                  <p className="text-secondary small mt-4 mb-0">
                    Your resume content will be preserved and reformatted to
                    match the selected template style.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-dark text-white py-4">
        <div className="container text-center">
          <small className="text-white-50">
            © {new Date().getFullYear()} Resume Builder. All rights reserved.
          </small>
        </div>
      </footer>
    </main>
  );
}

