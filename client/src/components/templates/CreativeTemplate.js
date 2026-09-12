"use client";

import { sectionStyle } from "@/utils/customization";

export default function CreativeTemplate({ resumeData }) {
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

  const primaryColor =
    customColors?.primary || "#144667";

  const secondaryColor =
    customColors?.secondary || "#eb5141";

  return (
    <div
      className="bg-white shadow-sm mx-auto overflow-hidden"
      style={{
        width: "100%",
        maxWidth: "794px",
        minHeight: "1123px",
        fontFamily:
          resumeData.typography?.fontFamily || "Arial, sans-serif",
      }}
    >
      {/* Creative Header */}
      <header
        className="p-5 text-white"
        style={{
          background: `linear-gradient(135deg, ${primaryColor}, ${secondaryColor})`,
        }}
      >
        <h1 className="display-6 fw-bold mb-2">
          {personalInfo?.name || "Your Name"}
        </h1>

        <div className="small d-flex flex-wrap gap-3">
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

      <div className="p-5" style={{ display: "flex", flexDirection: "column" }}>
        {/* Summary */}
        {summary && (
          <section style={sectionStyle(sectionOrder, "summary")} className="mb-4">
            <h2
              className="h6 fw-bold text-uppercase mb-3"
              style={{ color: primaryColor }}
            >
              About Me
            </h2>

            <p className="small mb-0">
              {summary}
            </p>
          </section>
        )}

        {/* Experience */}
        {experience?.length > 0 && (
          <section style={sectionStyle(sectionOrder, "experience")} className="mb-4">
            <h2
              className="h6 fw-bold text-uppercase mb-3"
              style={{ color: primaryColor }}
            >
              Experience
            </h2>

            {experience.map((item, index) => (
              <div
                key={index}
                className="border-start ps-3 mb-3"
                style={{
                  borderColor: `${primaryColor} !important`,
                }}
              >
                <div className="d-flex justify-content-between">
                  <strong>{item.role}</strong>

                  <small className="text-secondary">
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

                <div
                  className="small fw-semibold"
                  style={{ color: secondaryColor }}
                >
                  {item.company}
                </div>

                {item.responsibilities && (
                  <p className="small text-secondary mt-1 mb-0">
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
              className="h6 fw-bold text-uppercase mb-3"
              style={{ color: primaryColor }}
            >
              Education
            </h2>

            {education.map((item, index) => (
              <div key={index} className="mb-3">
                <div className="d-flex justify-content-between">
                  <strong>{item.degree}</strong>

                  <small className="text-secondary">
                    {item.startDate}
                    {item.startDate &&
                      item.endDate &&
                      " â€“ "}
                    {item.endDate}
                  </small>
                </div>

                <div className="small">
                  {item.institution}
                </div>

                {item.description && (
                  <p className="small text-secondary mb-0 mt-1">
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
              className="h6 fw-bold text-uppercase mb-3"
              style={{ color: primaryColor }}
            >
              Skills
            </h2>

            <div className="d-flex flex-wrap gap-2">
              {skills.map((skill, index) => (
                <span
                  key={index}
                  className="badge rounded-pill px-3 py-2"
                  style={{
                    backgroundColor: `${primaryColor}15`,
                    color: primaryColor,
                    border: `1px solid ${primaryColor}40`,
                  }}
                >
                  {skill}
                </span>
              ))}
            </div>
          </section>
        )}

        {/* Projects */}
        {projects?.length > 0 && (
          <section style={sectionStyle(sectionOrder, "projects")} className="mb-4">
            <h2
              className="h6 fw-bold text-uppercase mb-3"
              style={{ color: primaryColor }}
            >
              Projects
            </h2>

            {projects.map((project, index) => (
              <div key={index} className="mb-3">
                <strong>{project.title}</strong>

                {project.description && (
                  <p className="small mb-1 mt-1">
                    {project.description}
                  </p>
                )}

                {project.techStack?.length > 0 && (
                  <div className="small text-secondary">
                    {project.techStack.join(" â€¢ ")}
                  </div>
                )}

                {project.live && (
                  <div
                    className="small mt-1"
                    style={{ color: secondaryColor }}
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
              className="h6 fw-bold text-uppercase mb-3"
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
              </div>
            ))}
          </section>
        )}

        {/* Achievements */}
        {achievements?.length > 0 && (
          <section style={sectionStyle(sectionOrder, "achievements")} className="mb-4">
            <h2
              className="h6 fw-bold text-uppercase mb-3"
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
              className="h6 fw-bold text-uppercase mb-3"
              style={{ color: primaryColor }}
            >
              Languages
            </h2>

            <div className="d-flex flex-wrap gap-3">
              {languages.map((item, index) => (
                <span key={index} className="small">
                  <strong>{item.name}</strong>
                  {item.level && ` â€” ${item.level}`}
                </span>
              ))}
            </div>
          </section>
        )}

        {/* Interests */}
        {interests?.length > 0 && (
          <section style={sectionStyle(sectionOrder, "interests")}>
            <h2
              className="h6 fw-bold text-uppercase mb-3"
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
    </div>
  );
}

