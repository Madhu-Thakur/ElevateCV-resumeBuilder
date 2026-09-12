"use client";

import { sectionStyle } from "@/utils/customization";

export default function ModernSidebarTemplate({ resumeData }) {
  const {
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
    customColors,
    typography,
    sectionOrder,
  } = resumeData || {};

  const primaryColor = customColors?.primary || "#144667";
  const secondaryColor = customColors?.secondary || "#eb5141";
  const fontFamily = typography?.fontFamily || "Arial, sans-serif";

  const sidebarTitle = {
    padding: "6px 10px",
    borderRadius: "4px",
    backgroundColor: "rgba(255,255,255,0.15)",
    fontSize: "12px",
    letterSpacing: "1px",
    textTransform: "uppercase",
    fontWeight: "700",
    marginBottom: "10px",
    color: "#fff",
  };

  const mainTitle = {
    color: primaryColor,
    fontSize: "14px",
    fontWeight: "700",
    letterSpacing: "1px",
    textTransform: "uppercase",
    borderBottom: `2px solid ${secondaryColor}`,
    paddingBottom: "6px",
    marginBottom: "12px",
  };

  return (
    <div
      className="bg-white shadow-sm mx-auto overflow-hidden"
      style={{
        width: "100%",
        maxWidth: "794px",
        minHeight: "1123px",
        fontFamily,
        color: "#222",
      }}
    >
      <div className="row g-0">
        {/* Sidebar */}
        <aside
          className="col-4 text-white"
          style={{ backgroundColor: primaryColor }}
        >
          <div className="p-4 text-break">
            <h1
              className="fw-bold mb-1"
              style={{ fontSize: "22px", lineHeight: 1.2 }}
            >
              {personalInfo?.name || "Your Name"}
            </h1>

            {(personalInfo?.email ||
              personalInfo?.phone ||
              personalInfo?.location) && (
              <div className="small opacity-75 mb-1">
                {personalInfo.email}
                {personalInfo.email && personalInfo.phone && " • "}
                {personalInfo.phone}
                {personalInfo.phone && personalInfo.location && " • "}
                {personalInfo.location}
              </div>
            )}

            {personalInfo?.linkedin && (
              <div className="small mb-1">{personalInfo.linkedin}</div>
            )}

            {personalInfo?.github && (
              <div className="small mb-1">{personalInfo.github}</div>
            )}

            {personalInfo?.portfolio && (
              <div className="small mb-1">{personalInfo.portfolio}</div>
            )}

            {/* Skills */}
            {skills?.length > 0 && (
              <div className="mt-4">
                <h2 style={sidebarTitle}>Skills</h2>

                <div className="d-flex flex-wrap gap-2">
                  {skills.map((skill, index) => (
                    <span
                      key={index}
                      className="small"
                      style={{
                        backgroundColor: secondaryColor,
                        color: "#fff",
                        padding: "2px 8px",
                        borderRadius: "12px",
                      }}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Languages */}
            {languages?.length > 0 && (
              <div className="mt-4">
                <h2 style={sidebarTitle}>Languages</h2>

                {languages.map((item, index) => (
                  <div key={index} className="small mb-1">
                    <strong>{item.name}</strong>

                    {item.level && (
                      <div className="opacity-75">{item.level}</div>
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* Achievements */}
            {achievements?.length > 0 && (
              <div className="mt-4">
                <h2 style={sidebarTitle}>Achievements</h2>

                {achievements.map((item, index) => (
                  <div key={index} className="small mb-1">
                    ✦ {item}
                  </div>
                ))}
              </div>
            )}

            {/* Interests */}
            {interests?.length > 0 && (
              <div className="mt-4">
                <h2 style={sidebarTitle}>Interests</h2>

                {interests.map((item, index) => (
                  <div key={index} className="small mb-1">
                    {item}
                  </div>
                ))}
              </div>
            )}
          </div>
        </aside>

        {/* Main Content */}
        <main className="col-8">
          <div className="p-4" style={{ display: "flex", flexDirection: "column" }}>
            {/* Summary */}
            {summary && (
              <section style={sectionStyle(sectionOrder, "summary")} className="mb-3">
                <h2 style={mainTitle}>Professional Summary</h2>

                <p className="small mb-0 lh-lg">{summary}</p>
              </section>
            )}

            {/* Experience */}
            {experience?.length > 0 && (
              <section style={sectionStyle(sectionOrder, "experience")} className="mb-3">
                <h2 style={mainTitle}>Experience</h2>

                {experience.map((item, index) => (
                  <div key={index} className="mb-3">
                    <div className="d-flex justify-content-between align-items-start">
                      <div>
                        <h3 className="h6 fw-bold mb-0">{item.role}</h3>

                        <div className="small text-secondary">
                          {item.company}
                        </div>
                      </div>

                      <small className="text-secondary text-nowrap ms-3">
                        {item.startDate}
                        {item.startDate &&
                          (item.endDate || item.currentlyWorking) &&
                          " – "}
                        {item.endDate ||
                          (item.currentlyWorking ? "Present" : "")}
                      </small>
                    </div>

                    {item.responsibilities && (
                      <p className="small mt-1 mb-0">{item.responsibilities}</p>
                    )}
                  </div>
                ))}
              </section>
            )}

            {/* Education */}
            {education?.length > 0 && (
              <section style={sectionStyle(sectionOrder, "education")} className="mb-3">
                <h2 style={mainTitle}>Education</h2>

                {education.map((item, index) => (
                  <div key={index} className="mb-3">
                    <div className="d-flex justify-content-between">
                      <h3 className="h6 fw-bold mb-0">{item.degree}</h3>

                      <small className="text-secondary text-nowrap">
                        {item.startDate}
                        {item.startDate && item.endDate && " – "}
                        {item.endDate}
                      </small>
                    </div>

                    <div className="small text-secondary">
                      {item.institution}
                    </div>

                    {item.description && (
                      <p className="small mt-1 mb-0">{item.description}</p>
                    )}
                  </div>
                ))}
              </section>
            )}

            {/* Projects */}
            {projects?.length > 0 && (
              <section style={sectionStyle(sectionOrder, "projects")} className="mb-3">
                <h2 style={mainTitle}>Projects</h2>

                {projects.map((project, index) => (
                  <div key={index} className="mb-3">
                    <div className="d-flex justify-content-between align-items-start">
                      <h3 className="h6 fw-bold mb-0">{project.title}</h3>

                      {project.live && (
                        <small className="text-secondary text-nowrap ms-3">
                          {project.live}
                        </small>
                      )}
                    </div>

                    {project.description && (
                      <p className="small mt-1 mb-1">{project.description}</p>
                    )}

                    {project.techStack?.length > 0 && (
                      <div className="small text-secondary">
                        {project.techStack.join(", ")}
                      </div>
                    )}
                  </div>
                ))}
              </section>
            )}

            {/* Certifications */}
            {certifications?.length > 0 && (
              <section style={sectionStyle(sectionOrder, "certifications")} className="mb-3">
                <h2 style={mainTitle}>Certifications</h2>

                {certifications.map((item, index) => (
                  <div key={index} className="small mb-2">
                    <strong>{item.name}</strong>

                    {item.provider && (
                      <span className="text-secondary">
                        {" "}— {item.provider}
                      </span>
                    )}
                  </div>
                ))}
              </section>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}

