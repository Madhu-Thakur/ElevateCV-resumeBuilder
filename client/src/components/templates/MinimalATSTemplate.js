"use client";

import { sectionStyle } from "@/utils/customization";

export default function MinimalATSTemplate({ resumeData }) {
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

  return (
    <div
      className="bg-white shadow-sm mx-auto"
      style={{
        width: "100%",
        maxWidth: "794px",
        minHeight: "1123px",
        padding: "50px",
        display: "flex",
        flexDirection: "column",
        fontFamily: `${resumeData?.typography?.fontFamily || "Arial"}, sans-serif`,
        color: "#222",
      }}
    >
      {/* Header */}
      <header className="mb-4">
        <h1 className="fw-bold mb-2">
          {personalInfo?.name || "Your Name"}
        </h1>

        <div className="small text-secondary d-flex flex-wrap gap-3">
          {personalInfo?.email && <span>{personalInfo.email}</span>}
          {personalInfo?.phone && <span>{personalInfo.phone}</span>}
          {personalInfo?.location && <span>{personalInfo.location}</span>}
        </div>

        <div className="small d-flex flex-wrap gap-3 mt-1">
          {personalInfo?.linkedin && <span>{personalInfo.linkedin}</span>}
          {personalInfo?.github && <span>{personalInfo.github}</span>}
          {personalInfo?.portfolio && <span>{personalInfo.portfolio}</span>}
        </div>
      </header>

      {/* Summary */}
      {summary && (
        <section style={sectionStyle(sectionOrder, "summary")} className="mb-4">
          <h2 className="h6 fw-bold text-uppercase border-bottom pb-2">
            Summary
          </h2>
          <p className="small mb-0">{summary}</p>
        </section>
      )}

      {/* Experience */}
      {experience?.length > 0 && (
        <section style={sectionStyle(sectionOrder, "experience")} className="mb-4">
          <h2 className="h6 fw-bold text-uppercase border-bottom pb-2">
            Experience
          </h2>

          {experience.map((item, index) => (
            <div key={index} className="mb-3">
              <div className="d-flex justify-content-between">
                <strong>{item.role}</strong>

                <small className="text-secondary">
                  {item.startDate}
                  {item.startDate && item.endDate && " â€“ "}
                  {item.endDate ||
                    (item.currentlyWorking ? "Present" : "")}
                </small>
              </div>

              <div className="small fw-semibold">
                {item.company}
              </div>

              {item.responsibilities && (
                <p className="small mb-0 mt-1">
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
          <h2 className="h6 fw-bold text-uppercase border-bottom pb-2">
            Education
          </h2>

          {education.map((item, index) => (
            <div key={index} className="mb-3">
              <div className="d-flex justify-content-between">
                <strong>{item.degree}</strong>

                <small className="text-secondary">
                  {item.startDate}
                  {item.startDate && item.endDate && " â€“ "}
                  {item.endDate}
                </small>
              </div>

              <div className="small">
                {item.institution}
              </div>

              {item.description && (
                <p className="small text-secondary mb-0">
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
          <h2 className="h6 fw-bold text-uppercase border-bottom pb-2">
            Skills
          </h2>

          <p className="small mb-0">
            {skills.join(", ")}
          </p>
        </section>
      )}

      {/* Projects */}
      {projects?.length > 0 && (
        <section style={sectionStyle(sectionOrder, "projects")} className="mb-4">
          <h2 className="h6 fw-bold text-uppercase border-bottom pb-2">
            Projects
          </h2>

          {projects.map((project, index) => (
            <div key={index} className="mb-3">
              <strong>{project.title}</strong>

              {project.description && (
                <p className="small mb-1">
                  {project.description}
                </p>
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
        <section style={sectionStyle(sectionOrder, "certifications")} className="mb-4">
          <h2 className="h6 fw-bold text-uppercase border-bottom pb-2">
            Certifications
          </h2>

          {certifications.map((item, index) => (
            <div key={index} className="small mb-2">
              <strong>{item.name}</strong>
              {item.provider && ` â€” ${item.provider}`}
            </div>
          ))}
        </section>
      )}

      {/* Achievements */}
      {achievements?.length > 0 && (
        <section style={sectionStyle(sectionOrder, "achievements")} className="mb-4">
          <h2 className="h6 fw-bold text-uppercase border-bottom pb-2">
            Achievements
          </h2>

          <ul className="small">
            {achievements.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </section>
      )}

      {/* Languages */}
      {languages?.length > 0 && (
        <section style={sectionStyle(sectionOrder, "languages")} className="mb-4">
          <h2 className="h6 fw-bold text-uppercase border-bottom pb-2">
            Languages
          </h2>

          <div className="small">
            {languages.map((item, index) => (
              <div key={index}>
                <strong>{item.name}</strong>
                {item.level && ` â€” ${item.level}`}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Interests */}
      {interests?.length > 0 && (
        <section style={sectionStyle(sectionOrder, "interests")}>
          <h2 className="h6 fw-bold text-uppercase border-bottom pb-2">
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

