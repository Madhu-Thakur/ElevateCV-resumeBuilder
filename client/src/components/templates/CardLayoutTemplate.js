"use client";

import { sectionStyle } from "@/utils/customization";

export default function CardLayoutTemplate({ resumeData }) {
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
      className="bg-light mx-auto"
      style={{
        width: "100%",
        maxWidth: "794px",
        minHeight: "1123px",
        padding: "28px",
        fontFamily,
        color: "#222",
      }}
    >
      {/* Header Card */}
      <header
        className="bg-white shadow-sm rounded-3 p-4 mb-3"
        style={{
          borderTop: `5px solid ${primaryColor}`,
        }}
      >
        <div className="row align-items-center">
          <div className="col-md-8">
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
          </div>

          <div className="col-md-4 text-md-end mt-3 mt-md-0">
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

      <div className="row g-3">
        {/* Main Column */}
        <div className="col-md-8">

          {/* Summary */}
          {summary && (
            <ResumeCard
              orderStyle={sectionStyle(sectionOrder, "summary")}
              title="Professional Summary"
              color={primaryColor}
            >
              <p className="small lh-lg mb-0">
                {summary}
              </p>
            </ResumeCard>
          )}

          {/* Experience */}
          {experience?.length > 0 && (
            <ResumeCard
              orderStyle={sectionStyle(sectionOrder, "experience")}
              title="Experience"
              color={primaryColor}
            >
              {experience.map((item, index) => (
                <div
                  key={index}
                  className="border rounded-3 p-3 mb-3"
                >
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
                    <p className="small text-secondary mt-2 mb-0">
                      {item.responsibilities}
                    </p>
                  )}
                </div>
              ))}
            </ResumeCard>
          )}

          {/* Education */}
          {education?.length > 0 && (
            <ResumeCard
              orderStyle={sectionStyle(sectionOrder, "education")}
              title="Education"
              color={primaryColor}
            >
              {education.map((item, index) => (
                <div
                  key={index}
                  className="border rounded-3 p-3 mb-3"
                >
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
                    <p className="small text-secondary mt-2 mb-0">
                      {item.description}
                    </p>
                  )}
                </div>
              ))}
            </ResumeCard>
          )}

          {/* Projects */}
          {projects?.length > 0 && (
            <ResumeCard
              orderStyle={sectionStyle(sectionOrder, "projects")}
              title="Projects"
              color={primaryColor}
            >
              {projects.map((project, index) => (
                <div
                  key={index}
                  className="border rounded-3 p-3 mb-3"
                >
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
                      style={{ color: secondaryColor }}
                    >
                      {project.live}
                    </div>
                  )}
                </div>
              ))}
            </ResumeCard>
          )}

          {/* Certifications */}
          {certifications?.length > 0 && (
            <ResumeCard
              orderStyle={sectionStyle(sectionOrder, "certifications")}
              title="Certifications"
              color={primaryColor}
            >
              {certifications.map((item, index) => (
                <div
                  key={index}
                  className="border rounded-3 p-3 mb-2"
                >
                  <strong className="small">
                    {item.name}
                  </strong>

                  {item.provider && (
                    <div className="small text-secondary">
                      {item.provider}
                    </div>
                  )}

                  {item.validity && (
                    <div className="small text-secondary">
                      Validity: {item.validity}
                    </div>
                  )}
                </div>
              ))}
            </ResumeCard>
          )}

          {/* Achievements */}
          {achievements?.length > 0 && (
            <ResumeCard
              orderStyle={sectionStyle(sectionOrder, "achievements")}
              title="Achievements"
              color={primaryColor}
            >
              <ul className="small mb-0">
                {achievements.map((item, index) => (
                  <li key={index} className="mb-1">
                    {item}
                  </li>
                ))}
              </ul>
            </ResumeCard>
          )}
        </div>

        {/* Sidebar */}
        <div className="col-md-4">

          {/* Skills */}
          {skills?.length > 0 && (
            <ResumeCard
              orderStyle={sectionStyle(sectionOrder, "skills")}
              title="Skills"
              color={primaryColor}
            >
              <div className="d-flex flex-wrap gap-2">
                {skills.map((skill, index) => (
                  <span
                    key={index}
                    className="badge rounded-pill px-3 py-2"
                    style={{
                      backgroundColor: `${primaryColor}15`,
                      color: primaryColor,
                      border: `1px solid ${primaryColor}30`,
                    }}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </ResumeCard>
          )}

          {/* Languages */}
          {languages?.length > 0 && (
            <ResumeCard
              orderStyle={sectionStyle(sectionOrder, "languages")}
              title="Languages"
              color={primaryColor}
            >
              {languages.map((item, index) => (
                <div
                  key={index}
                  className="border-bottom pb-2 mb-2"
                >
                  <div className="small fw-semibold">
                    {item.name}
                  </div>

                  {item.level && (
                    <div className="small text-secondary">
                      {item.level}
                    </div>
                  )}
                </div>
              ))}
            </ResumeCard>
          )}

          {/* Interests */}
          {interests?.length > 0 && (
            <ResumeCard
              orderStyle={sectionStyle(sectionOrder, "interests")}
              title="Interests"
              color={primaryColor}
            >
              <div className="d-flex flex-wrap gap-2">
                {interests.map((item, index) => (
                  <span
                    key={index}
                    className="badge bg-light text-dark border"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </ResumeCard>
          )}
        </div>
      </div>
    </div>
  );
}

/* Reusable Card */

function ResumeCard({ title, color, children, orderStyle }) {
  return (
    <section className="bg-white shadow-sm rounded-3 p-3 mb-3" style={orderStyle}>
      <h2
        className="h6 fw-bold text-uppercase pb-2 mb-3"
        style={{
          color,
          borderBottom: `2px solid ${color}`,
        }}
      >
        {title}
      </h2>

      {children}
    </section>
  );
}


