"use client";

export default function ClassicTemplate({ resumeData }) {
  const {
    personalInfo = {},
    summary = "",
    education = [],
    experience = [],
    skills = [],
    projects = [],
    certifications = [],
    achievements = [],
    languages = [],
    interests = [],
    sectionOrder = [],
  } = resumeData || {};

  const renderSection = (section) => {
    switch (section) {
      case "summary":
        return summary?.trim() ? (
          <section key="summary" className="mb-4">
            <h2 className="h6 fw-bold border-bottom pb-2 mb-3">
              PROFESSIONAL SUMMARY
            </h2>
            <p className="mb-0 text-secondary">{summary}</p>
          </section>
        ) : null;

      case "education":
        return education.length > 0 ? (
          <section key="education" className="mb-4">
            <h2 className="h6 fw-bold border-bottom pb-2 mb-3">
              EDUCATION
            </h2>

            {education.map((edu, index) => (
              <div key={index} className="mb-3">
                <h3 className="h6 fw-semibold mb-1">
                  {edu.degree}
                </h3>

                <div className="text-secondary small">
                  {edu.institution}
                </div>

                {(edu.startDate || edu.endDate) && (
                  <div className="text-muted small">
                    {edu.startDate} - {edu.endDate}
                  </div>
                )}

                {edu.description && (
                  <p className="small mt-1 mb-0">
                    {edu.description}
                  </p>
                )}
              </div>
            ))}
          </section>
        ) : null;

      case "experience":
        return experience.length > 0 ? (
          <section key="experience" className="mb-4">
            <h2 className="h6 fw-bold border-bottom pb-2 mb-3">
              EXPERIENCE
            </h2>

            {experience.map((exp, index) => (
              <div key={index} className="mb-3">
                <div className="d-flex justify-content-between align-items-start">
                  <div>
                    <h3 className="h6 fw-semibold mb-1">
                      {exp.role}
                    </h3>

                    <div className="text-secondary small">
                      {exp.company}
                    </div>
                  </div>

                  {(exp.startDate || exp.endDate) && (
                    <div className="text-muted small text-end">
                      {exp.startDate} -{" "}
                      {exp.currentlyWorking
                        ? "Present"
                        : exp.endDate}
                    </div>
                  )}
                </div>

                {exp.responsibilities && (
                  <p className="small mt-2 mb-0">
                    {exp.responsibilities}
                  </p>
                )}
              </div>
            ))}
          </section>
        ) : null;

      case "skills":
        return skills.length > 0 ? (
          <section key="skills" className="mb-4">
            <h2 className="h6 fw-bold border-bottom pb-2 mb-3">
              SKILLS
            </h2>

            <div className="d-flex flex-wrap gap-2">
              {skills.map((skill, index) => (
                <span
                  key={index}
                  className="badge text-bg-light border px-3 py-2"
                >
                  {skill}
                </span>
              ))}
            </div>
          </section>
        ) : null;

      case "projects":
        return projects.length > 0 ? (
          <section key="projects" className="mb-4">
            <h2 className="h6 fw-bold border-bottom pb-2 mb-3">
              PROJECTS
            </h2>

            {projects.map((project, index) => (
              <div key={index} className="mb-3">
                <div className="d-flex justify-content-between align-items-start">
                  <h3 className="h6 fw-semibold mb-1">
                    {project.title}
                  </h3>

                  {project.live && (
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="small text-decoration-none"
                    >
                      Live Demo
                    </a>
                  )}
                </div>

                {project.techStack?.length > 0 && (
                  <div className="small text-secondary mb-1">
                    {Array.isArray(project.techStack)
                      ? project.techStack.join(", ")
                      : project.techStack}
                  </div>
                )}

                {project.description && (
                  <p className="small mb-0">
                    {project.description}
                  </p>
                )}
              </div>
            ))}
          </section>
        ) : null;

      case "certifications":
        return certifications.length > 0 ? (
          <section key="certifications" className="mb-4">
            <h2 className="h6 fw-bold border-bottom pb-2 mb-3">
              CERTIFICATIONS
            </h2>

            {certifications.map((item, index) => (
              <div key={index} className="mb-2">
                {typeof item === "string"
                  ? item
                  : item.name || item.title}
              </div>
            ))}
          </section>
        ) : null;

      case "achievements":
        return achievements.length > 0 ? (
          <section key="achievements" className="mb-4">
            <h2 className="h6 fw-bold border-bottom pb-2 mb-3">
              ACHIEVEMENTS
            </h2>

            <ul className="mb-0">
              {achievements.map((item, index) => (
                <li key={index} className="mb-1">
                  {typeof item === "string"
                    ? item
                    : item.name || item.title}
                </li>
              ))}
            </ul>
          </section>
        ) : null;

      case "languages":
        return languages.length > 0 ? (
          <section key="languages" className="mb-4">
            <h2 className="h6 fw-bold border-bottom pb-2 mb-3">
              LANGUAGES
            </h2>

            <ul className="mb-0">
              {languages.map((lang, index) => (
                <li key={index} className="mb-1">
                  {typeof lang === "string"
                    ? lang
                    : `${lang.name || ""}${
                        lang.level ? ` - ${lang.level}` : ""
                      }`}
                </li>
              ))}
            </ul>
          </section>
        ) : null;

      case "interests":
        return interests.length > 0 ? (
          <section key="interests" className="mb-4">
            <h2 className="h6 fw-bold border-bottom pb-2 mb-3">
              INTERESTS
            </h2>

            <p className="mb-0">
              {interests
                .map((item) =>
                  typeof item === "string"
                    ? item
                    : item.name || ""
                )
                .filter(Boolean)
                .join(", ")}
            </p>
          </section>
        ) : null;

      case "personal":
        return null;

      default:
        return null;
    }
  };

  return (
    <div
      className="bg-white mx-auto shadow-sm"
      style={{
        width: "100%",
        maxWidth: "794px",
        minHeight: "1123px",
        padding: "48px",
        fontFamily:
          resumeData?.typography?.fontFamily || "Arial",
      }}
    >
      {/* Header */}
      <header className="text-center border-bottom pb-4 mb-4">
        <h1 className="fw-bold mb-2">
          {personalInfo.name || "Your Name"}
        </h1>

        <div className="small text-secondary d-flex flex-wrap justify-content-center gap-2">
          {personalInfo.email && (
            <span>{personalInfo.email}</span>
          )}

          {personalInfo.phone && (
            <span>• {personalInfo.phone}</span>
          )}

          {personalInfo.location && (
            <span>• {personalInfo.location}</span>
          )}
        </div>

        <div className="small mt-2 d-flex flex-wrap justify-content-center gap-3">
          {personalInfo.linkedin && (
            <a
              href={personalInfo.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-decoration-none"
            >
              LinkedIn
            </a>
          )}

          {personalInfo.github && (
            <a
              href={personalInfo.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-decoration-none"
            >
              GitHub
            </a>
          )}

          {personalInfo.portfolio && (
            <a
              href={personalInfo.portfolio}
              target="_blank"
              rel="noopener noreferrer"
              className="text-decoration-none"
            >
              Portfolio
            </a>
          )}
        </div>
      </header>

      {/* Dynamic Sections */}
      {sectionOrder.map((section) =>
        renderSection(section)
      )}
    </div>
  );
}