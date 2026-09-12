"use client";

import { sectionStyle } from "@/utils/customization";

export default function GridLayoutTemplate({ resumeData }) {
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
  } = resumeData;

  const primaryColor = customColors?.primary || "#144667";
  const secondaryColor = customColors?.secondary || "#eb5141";

  const fontFamily = typography?.fontFamily || "Arial, sans-serif";

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
      {/* Header */}
      <header
        className="px-5 py-4"
        style={{
          borderBottom: `5px solid ${secondaryColor}`,
        }}
      >
        <div className="row align-items-center">
          <div className="col-8">
            <h1
              className="fw-bold mb-2"
              style={{
                color: primaryColor,
                fontSize: "30px",
              }}
            >
              {personalInfo?.name || "Your Name"}
            </h1>

            <div className="small text-secondary d-flex flex-wrap gap-3">
              {personalInfo?.email && (
                <span>{personalInfo.email}</span>
              )}

              {personalInfo?.phone && (
                <span>{personalInfo.phone}</span>
              )}

              {personalInfo?.location && (
                <span>{personalInfo.location}</span>
              )}
            </div>
          </div>

          <div className="col-4 text-end">
            {personalInfo?.linkedin && (
              <div className="small mb-1">
                {personalInfo.linkedin}
              </div>
            )}

            {personalInfo?.github && (
              <div className="small mb-1">
                {personalInfo.github}
              </div>
            )}

            {personalInfo?.portfolio && (
              <div className="small">
                {personalInfo.portfolio}
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Main Grid */}
      <div className="row g-0">
        {/* Main Content */}
        <main className="col-8 px-5 py-4" style={{ display: "flex", flexDirection: "column" }}>

          {/* Summary */}
          {summary && (
            <section style={sectionStyle(sectionOrder, "summary")} className="mb-4">
              <SectionTitle color={primaryColor}>
                Professional Summary
              </SectionTitle>

              <p className="small lh-lg mb-0">
                {summary}
              </p>
            </section>
          )}

          {/* Experience */}
          {experience?.length > 0 && (
            <section style={sectionStyle(sectionOrder, "experience")} className="mb-4">
              <SectionTitle color={primaryColor}>
                Experience
              </SectionTitle>

              {experience.map((item, index) => (
                <div key={index} className="mb-3">
                  <div className="d-flex justify-content-between align-items-start">
                    <div>
                      <h3 className="h6 fw-bold mb-1">
                        {item.role || "Job Title"}
                      </h3>

                      <div
                        className="small fw-semibold"
                        style={{ color: secondaryColor }}
                      >
                        {item.company || "Company"}
                      </div>
                    </div>

                    <small className="text-secondary text-nowrap ms-2">
                      {item.startDate}

                      {item.startDate &&
                        (item.endDate || item.currentlyWorking) &&
                        " â€“ "}

                      {item.endDate ||
                        (item.currentlyWorking
                          ? "Present"
                          : "")}
                    </small>
                  </div>

                  {item.responsibilities && (
                    <p className="small text-secondary lh-lg mt-2 mb-0">
                      {item.responsibilities}
                    </p>
                  )}
                </div>
              ))}
            </section>
          )}

          {/* Education */}
          {education?.length > 0 && (
            <section style={sectionStyle(sectionOrder, "education")} className="mb-4">
              <SectionTitle color={primaryColor}>
                Education
              </SectionTitle>

              {education.map((item, index) => (
                <div key={index} className="mb-3">
                  <div className="d-flex justify-content-between">
                    <div>
                      <strong className="small">
                        {item.degree}
                      </strong>

                      <div className="small text-secondary">
                        {item.institution}
                      </div>
                    </div>

                    <small className="text-secondary text-nowrap ms-2">
                      {item.startDate}

                      {item.startDate &&
                        item.endDate &&
                        " â€“ "}

                      {item.endDate}
                    </small>
                  </div>

                  {item.description && (
                    <p className="small text-secondary mt-1 mb-0">
                      {item.description}
                    </p>
                  )}
                </div>
              ))}
            </section>
          )}

          {/* Projects */}
          {projects?.length > 0 && (
            <section style={sectionStyle(sectionOrder, "projects")} className="mb-4">
              <SectionTitle color={primaryColor}>
                Projects
              </SectionTitle>

              {projects.map((project, index) => (
                <div key={index} className="mb-3">
                  <h3 className="h6 fw-bold mb-1">
                    {project.title}
                  </h3>

                  {project.description && (
                    <p className="small text-secondary mb-1">
                      {project.description}
                    </p>
                  )}

                  {project.techStack?.length > 0 && (
                    <div className="small">
                      <strong>Technologies:</strong>{" "}
                      {project.techStack.join(", ")}
                    </div>
                  )}

                  {project.live && (
                    <div
                      className="small mt-1"
                      style={{ color: primaryColor }}
                    >
                      {project.live}
                    </div>
                  )}
                </div>
              ))}
            </section>
          )}

          {/* Certifications */}
          {certifications?.length > 0 && (
            <section style={sectionStyle(sectionOrder, "certifications")} className="mb-4">
              <SectionTitle color={primaryColor}>
                Certifications
              </SectionTitle>

              {certifications.map((item, index) => (
                <div key={index} className="small mb-2">
                  <strong>{item.name}</strong>

                  {item.provider && (
                    <span className="text-secondary">
                      {" "}â€” {item.provider}
                    </span>
                  )}

                  {item.validity && (
                    <span className="text-secondary">
                      {" "}({item.validity})
                    </span>
                  )}
                </div>
              ))}
            </section>
          )}

          {/* Achievements */}
          {achievements?.length > 0 && (
            <section style={sectionStyle(sectionOrder, "achievements")} className="mb-4">
              <SectionTitle color={primaryColor}>
                Achievements
              </SectionTitle>

              <ul className="small mb-0 ps-3">
                {achievements.map((item, index) => (
                  <li key={index} className="mb-1">
                    {item}
                  </li>
                ))}
              </ul>
            </section>
          )}
        </main>

        {/* Sidebar */}
        <aside
          className="col-4 px-4 py-4"
          style={{
            backgroundColor: "#f8f9fa",
            borderLeft: `1px solid ${primaryColor}20`,
          }}
        >
          {/* Skills */}
          {skills?.length > 0 && (
            <section className="mb-4">
              <SidebarTitle color={primaryColor}>
                Skills
              </SidebarTitle>

              <div className="d-flex flex-column gap-2">
                {skills.map((skill, index) => (
                  <div
                    key={index}
                    className="small d-flex align-items-center"
                  >
                    <span
                      className="me-2"
                      style={{
                        width: "7px",
                        height: "7px",
                        borderRadius: "50%",
                        backgroundColor: secondaryColor,
                        display: "inline-block",
                        flexShrink: 0,
                      }}
                    />

                    {skill}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Languages */}
          {languages?.length > 0 && (
            <section className="mb-4">
              <SidebarTitle color={primaryColor}>
                Languages
              </SidebarTitle>

              {languages.map((item, index) => (
                <div key={index} className="small mb-2">
                  <div className="fw-semibold">
                    {item.name}
                  </div>

                  {item.level && (
                    <div className="text-secondary">
                      {item.level}
                    </div>
                  )}
                </div>
              ))}
            </section>
          )}

          {/* Interests */}
          {interests?.length > 0 && (
            <section className="mb-4">
              <SidebarTitle color={primaryColor}>
                Interests
              </SidebarTitle>

              <div className="d-flex flex-wrap gap-2">
                {interests.map((item, index) => (
                  <span
                    key={index}
                    className="badge rounded-pill"
                    style={{
                      backgroundColor: `${primaryColor}15`,
                      color: primaryColor,
                      border: `1px solid ${primaryColor}30`,
                    }}
                  >
                    {item}
                  </span>
                ))}
              </div>
            </section>
          )}

          {/* Quick Contact */}
          {(personalInfo?.email ||
            personalInfo?.phone ||
            personalInfo?.location) && (
            <section>
              <SidebarTitle color={primaryColor}>
                Contact
              </SidebarTitle>

              {personalInfo?.email && (
                <div className="small mb-2">
                  {personalInfo.email}
                </div>
              )}

              {personalInfo?.phone && (
                <div className="small mb-2">
                  {personalInfo.phone}
                </div>
              )}

              {personalInfo?.location && (
                <div className="small">
                  {personalInfo.location}
                </div>
              )}
            </section>
          )}
        </aside>
      </div>
    </div>
  );
}

/* Section Heading */

function SectionTitle({ children, color }) {
  return (
    <h2
      className="h6 fw-bold text-uppercase mb-3 pb-2"
      style={{
        color,
        borderBottom: `2px solid ${color}`,
      }}
    >
      {children}
    </h2>
  );
}

/* Sidebar Heading */

function SidebarTitle({ children, color }) {
  return (
    <h2
      className="h6 fw-bold text-uppercase mb-3 pb-2"
      style={{
        color,
        borderBottom: `2px solid ${color}`,
      }}
    >
      {children}
    </h2>
  );
}

