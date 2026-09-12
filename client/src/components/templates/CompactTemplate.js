"use client";

import { sectionStyle } from "@/utils/customization";

export default function CompactTemplate({ resumeData }) {
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

  const sectionTitle = {
    color: primaryColor,
    fontSize: "12px",
    fontWeight: "700",
    letterSpacing: "0.8px",
    textTransform: "uppercase",
    borderBottom: `1px solid ${secondaryColor}`,
    paddingBottom: "4px",
    marginBottom: "8px",
  };

  return (
    <div
      className="bg-white shadow-sm mx-auto"
      style={{
        width: "100%",
        maxWidth: "794px",
        minHeight: "800px",
        padding: "28px 32px",
        display: "flex",
        flexDirection: "column",
        fontFamily,
        color: "#222",
        fontSize: "13px",
      }}
    >
      {/* Header */}
      <header
        className="d-flex justify-content-between align-items-start border-bottom pb-2 mb-3"
        style={{ borderColor: `${primaryColor} !important` }}
      >
        <div>
          <h1
            className="fw-bold mb-1"
            style={{ color: primaryColor, fontSize: "22px" }}
          >
            {personalInfo?.name || "Your Name"}
          </h1>

          <div className="d-flex flex-wrap gap-2 text-secondary">
            {personalInfo?.email && <span>{personalInfo.email}</span>}
            {personalInfo?.phone && <span>| {personalInfo.phone}</span>}
            {personalInfo?.location && (
              <span>| {personalInfo.location}</span>
            )}
          </div>
        </div>

        <div className="text-end text-secondary">
          {personalInfo?.linkedin && (
            <div>{personalInfo.linkedin}</div>
          )}
          {personalInfo?.github && <div>{personalInfo.github}</div>}
          {personalInfo?.portfolio && <div>{personalInfo.portfolio}</div>}
        </div>
      </header>

      {/* Summary */}
      {summary && (
        <section style={sectionStyle(sectionOrder, "summary")} className="mb-3">
          <h2 style={sectionTitle}>Summary</h2>
          <p className="mb-0">{summary}</p>
        </section>
      )}

      {/* Experience */}
      {experience?.length > 0 && (
        <section style={sectionStyle(sectionOrder, "experience")} className="mb-3">
          <h2 style={sectionTitle}>Experience</h2>

          {experience.map((item, index) => (
            <div key={index} className="mb-2">
              <div className="d-flex justify-content-between">
                <strong>
                  {item.role}
                  {item.company ? `, ${item.company}` : ""}
                </strong>

                <span className="text-secondary">
                  {item.startDate}
                  {item.startDate &&
                    (item.endDate || item.currentlyWorking) &&
                    " - "}
                  {item.endDate ||
                    (item.currentlyWorking ? "Present" : "")}
                </span>
              </div>

              {item.responsibilities && (
                <p className="mb-0">{item.responsibilities}</p>
              )}
            </div>
          ))}
        </section>
      )}

      {/* Education */}
      {education?.length > 0 && (
        <section style={sectionStyle(sectionOrder, "education")} className="mb-3">
          <h2 style={sectionTitle}>Education</h2>

          {education.map((item, index) => (
            <div key={index} className="mb-2">
              <div className="d-flex justify-content-between">
                <strong>{item.degree}</strong>

                <span className="text-secondary">
                  {item.startDate}
                  {item.startDate && item.endDate && " - "}
                  {item.endDate}
                </span>
              </div>

              <div className="text-secondary">{item.institution}</div>

              {item.description && <p className="mb-0">{item.description}</p>}
            </div>
          ))}
        </section>
      )}

      {/* Skills */}
      {skills?.length > 0 && (
        <section style={sectionStyle(sectionOrder, "skills")} className="mb-3">
          <h2 style={sectionTitle}>Skills</h2>
          <p className="mb-0">{skills.join(" | ")}</p>
        </section>
      )}

      {/* Projects */}
      {projects?.length > 0 && (
        <section style={sectionStyle(sectionOrder, "projects")} className="mb-3">
          <h2 style={sectionTitle}>Projects</h2>

          {projects.map((project, index) => (
            <div key={index} className="mb-2">
              <div className="d-flex justify-content-between">
                <strong>{project.title}</strong>

                {project.live && (
                  <span className="text-secondary">{project.live}</span>
                )}
              </div>

              {project.description && (
                <p className="mb-0">{project.description}</p>
              )}

              {project.techStack?.length > 0 && (
                <div className="text-secondary">
                  Technologies: {project.techStack.join(", ")}
                </div>
              )}
            </div>
          ))}
        </section>
      )}

      {/* Certifications */}
      {certifications?.length > 0 && (
        <section style={sectionStyle(sectionOrder, "certifications")} className="mb-3">
          <h2 style={sectionTitle}>Certifications</h2>

          {certifications.map((item, index) => (
            <div key={index} className="mb-1">
              <strong>{item.name}</strong>
              {item.provider && ` - ${item.provider}`}
              {item.validity && ` (${item.validity})`}
            </div>
          ))}
        </section>
      )}

      {/* Achievements */}
      {achievements?.length > 0 && (
        <section style={sectionStyle(sectionOrder, "achievements")} className="mb-3">
          <h2 style={sectionTitle}>Achievements</h2>

          <ul className="mb-0 ps-3">
            {achievements.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </section>
      )}

      {/* Languages and Interests */}
      {(languages?.length > 0 || interests?.length > 0) && (
        <div className="row g-3">
          {languages?.length > 0 && (
            <div className="col-6">
              <section style={sectionStyle(sectionOrder, "languages")}>
                <h2 style={sectionTitle}>Languages</h2>

                {languages.map((item, index) => (
                  <div key={index}>
                    <strong>{item.name}</strong>
                    {item.level && ` - ${item.level}`}
                  </div>
                ))}
              </section>
            </div>
          )}

          {interests?.length > 0 && (
            <div className="col-6">
              <section style={sectionStyle(sectionOrder, "interests")}>
                <h2 style={sectionTitle}>Interests</h2>
                <p className="mb-0">{interests.join(", ")}</p>
              </section>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

