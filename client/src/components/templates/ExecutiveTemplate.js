"use client";

import { sectionStyle } from "@/utils/customization";

export default function ExecutiveTemplate({ resumeData }) {
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
    sectionOrder,
  } = resumeData;

  const primaryColor = customColors?.primary || "#144667";

  return (
    <div
      className="bg-white shadow-sm mx-auto"
      style={{
        width: "100%",
        maxWidth: "794px",
        minHeight: "1123px",
        padding: "48px 55px",
        display: "flex",
        flexDirection: "column",
        fontFamily:
          resumeData.typography?.fontFamily || "Arial, sans-serif",
        color: "#222",
      }}
    >
      {/* Header */}
      <header
        className="pb-4 mb-4 border-bottom"
        style={{ borderColor: `${primaryColor} !important` }}
      >
        <h1
          className="fw-bold mb-2"
          style={{ color: primaryColor }}
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

        <div className="small d-flex flex-wrap gap-3 mt-2">
          {personalInfo?.linkedin && (
            <span>{personalInfo.linkedin}</span>
          )}

          {personalInfo?.github && (
            <span>{personalInfo.github}</span>
          )}

          {personalInfo?.portfolio && (
            <span>{personalInfo.portfolio}</span>
          )}
        </div>
      </header>

      {/* Summary */}
      {summary && (
        <section style={sectionStyle(sectionOrder, "summary")} className="mb-4">
          <h2
            className="h6 fw-bold text-uppercase mb-2"
            style={{ color: primaryColor }}
          >
            Executive Summary
          </h2>

          <p className="small mb-0 lh-lg">
            {summary}
          </p>
        </section>
      )}

      {/* Experience */}
      {experience?.length > 0 && (
        <section style={sectionStyle(sectionOrder, "experience")} className="mb-4">
          <h2
            className="h6 fw-bold text-uppercase border-bottom pb-2 mb-3"
            style={{ color: primaryColor }}
          >
            Professional Experience
          </h2>

          {experience.map((item, index) => (
            <div key={index} className="mb-4">
              <div className="d-flex justify-content-between align-items-start">
                <div>
                  <h3 className="h6 fw-bold mb-1">
                    {item.role || "Job Title"}
                  </h3>

                  <div
                    className="small fw-semibold"
                    style={{ color: primaryColor }}
                  >
                    {item.company || "Company"}
                  </div>
                </div>

                <small className="text-secondary text-nowrap ms-3">
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
                <p className="small text-secondary mt-2 mb-0 lh-lg">
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
          <h2
            className="h6 fw-bold text-uppercase border-bottom pb-2 mb-3"
            style={{ color: primaryColor }}
          >
            Education
          </h2>

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

                <small className="text-secondary text-nowrap ms-3">
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

      {/* Skills */}
      {skills?.length > 0 && (
        <section style={sectionStyle(sectionOrder, "skills")} className="mb-4">
          <h2
            className="h6 fw-bold text-uppercase border-bottom pb-2 mb-3"
            style={{ color: primaryColor }}
          >
            Core Skills
          </h2>

          <div className="row g-2">
            {skills.map((skill, index) => (
              <div key={index} className="col-6">
                <div className="small">
                  <span
                    className="me-2"
                    style={{ color: primaryColor }}
                  >
                    â—
                  </span>
                  {skill}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Projects */}
      {projects?.length > 0 && (
        <section style={sectionStyle(sectionOrder, "projects")} className="mb-4">
          <h2
            className="h6 fw-bold text-uppercase border-bottom pb-2 mb-3"
            style={{ color: primaryColor }}
          >
            Selected Projects
          </h2>

          {projects.map((project, index) => (
            <div key={index} className="mb-3">
              <strong className="small">
                {project.title}
              </strong>

              {project.description && (
                <p className="small text-secondary mt-1 mb-1">
                  {project.description}
                </p>
              )}

              {project.techStack?.length > 0 && (
                <div className="small text-secondary">
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
          <h2
            className="h6 fw-bold text-uppercase border-bottom pb-2 mb-3"
            style={{ color: primaryColor }}
          >
            Certifications
          </h2>

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
          <h2
            className="h6 fw-bold text-uppercase border-bottom pb-2 mb-3"
            style={{ color: primaryColor }}
          >
            Achievements
          </h2>

          <ul className="small mb-0">
            {achievements.map((item, index) => (
              <li key={index} className="mb-1">
                {item}
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Languages */}
      {languages?.length > 0 && (
        <section style={sectionStyle(sectionOrder, "languages")} className="mb-4">
          <h2
            className="h6 fw-bold text-uppercase border-bottom pb-2 mb-3"
            style={{ color: primaryColor }}
          >
            Languages
          </h2>

          <div className="d-flex flex-wrap gap-4">
            {languages.map((item, index) => (
              <div key={index} className="small">
                <strong>{item.name}</strong>

                {item.level && (
                  <span className="text-secondary">
                    {" "}â€” {item.level}
                  </span>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Interests */}
      {interests?.length > 0 && (
        <section style={sectionStyle(sectionOrder, "interests")}>
          <h2
            className="h6 fw-bold text-uppercase border-bottom pb-2 mb-3"
            style={{ color: primaryColor }}
          >
            Interests
          </h2>

          <p className="small mb-0">
            {interests.join(" â€¢ ")}
          </p>
        </section>
      )}
    </div>
  );
}

