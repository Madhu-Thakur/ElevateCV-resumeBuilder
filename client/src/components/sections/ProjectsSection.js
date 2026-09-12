"use client";

import { useResume } from "@/context/ResumeContext";

export default function ProjectsSection() {
  const {
    resumeData,
    addItem,
    removeItem,
    updateItem,
  } = useResume();

  const projects = resumeData.projects || [];

  const handleAddProject = () => {
    addItem("projects", {
      title: "",
      techStack: [],
      description: "",
      github: "",
      live: "",
    });
  };

  const handleTechnologiesChange = (index, value) => {
    const technologies = value
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);

    updateItem(
      "projects",
      index,
      "techStack",
      technologies
    );
  };

  return (
    <div className="card border-0 shadow-sm">
      <div className="card-body p-4">

        {/* Heading */}
        <div className="d-flex justify-content-between align-items-start mb-4">
          <div>
            <h2 className="h5 fw-bold mb-1">
              Projects
            </h2>

            <p className="small text-secondary mb-0">
              Showcase projects that demonstrate your skills and experience.
            </p>
          </div>

          <button
            type="button"
            className="btn btn-primary btn-sm"
            onClick={handleAddProject}
          >
            + Add Project
          </button>
        </div>

        {/* Empty State */}
        {projects.length === 0 && (
          <div className="text-center border rounded p-4">
            <p className="text-secondary mb-3">
              No projects added yet.
            </p>

            <button
              type="button"
              className="btn btn-outline-primary"
              onClick={handleAddProject}
            >
              Add Your First Project
            </button>
          </div>
        )}

        {/* Projects */}
        {projects.map((project, index) => (
          <div
            key={index}
            className="border rounded p-4 mb-3"
          >
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h3 className="h6 fw-semibold mb-0">
                Project #{index + 1}
              </h3>

              <button
                type="button"
                className="btn btn-outline-danger btn-sm"
                onClick={() =>
                  removeItem("projects", index)
                }
              >
                Remove
              </button>
            </div>

            <div className="row g-3">

              {/* Title */}
              <div className="col-md-6">
                <label className="form-label fw-semibold">
                  Project Title
                </label>

                <input
                  type="text"
                  className="form-control"
                  value={project.title || ""}
                  onChange={(e) =>
                    updateItem(
                      "projects",
                      index,
                      "title",
                      e.target.value
                    )
                  }
                  placeholder="e.g. Resume Builder"
                />
              </div>

              {/* Technologies */}
              <div className="col-md-6">
                <label className="form-label fw-semibold">
                  Technologies
                </label>

                <input
                  type="text"
                  className="form-control"
                  value={
                    Array.isArray(project.techStack)
                      ? project.techStack.join(", ")
                      : project.techStack || ""
                  }
                  onChange={(e) =>
                    handleTechnologiesChange(
                      index,
                      e.target.value
                    )
                  }
                  placeholder="React, Node.js, MongoDB"
                />

                <small className="text-secondary">
                  Separate technologies with commas.
                </small>
              </div>

              {/* Description */}
              <div className="col-12">
                <label className="form-label fw-semibold">
                  Description
                </label>

                <textarea
                  className="form-control"
                  rows="5"
                  value={project.description || ""}
                  onChange={(e) =>
                    updateItem(
                      "projects",
                      index,
                      "description",
                      e.target.value
                    )
                  }
                  placeholder="Describe the project, your contribution, and key features..."
                />
              </div>

              {/* GitHub */}
              <div className="col-md-6">
                <label className="form-label fw-semibold">
                  GitHub URL
                </label>

                <input
                  type="url"
                  className="form-control"
                  value={project.github || ""}
                  onChange={(e) =>
                    updateItem(
                      "projects",
                      index,
                      "github",
                      e.target.value
                    )
                  }
                  placeholder="https://github.com/username/project"
                />
              </div>

              {/* Live */}
              <div className="col-md-6">
                <label className="form-label fw-semibold">
                  Live Demo URL
                </label>

                <input
                  type="url"
                  className="form-control"
                  value={project.live || ""}
                  onChange={(e) =>
                    updateItem(
                      "projects",
                      index,
                      "live",
                      e.target.value
                    )
                  }
                  placeholder="https://yourproject.com"
                />
              </div>

            </div>
          </div>
        ))}

        {/* Bottom Add */}
        {projects.length > 0 && (
          <button
            type="button"
            className="btn btn-outline-primary w-100"
            onClick={handleAddProject}
          >
            + Add Another Project
          </button>
        )}

      </div>
    </div>
  );
}