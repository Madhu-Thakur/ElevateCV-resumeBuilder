"use client";

import { useResume } from "@/context/ResumeContext";

export default function ExperienceSection() {
  const {
    resumeData,
    addItem,
    removeItem,
    updateItem,
  } = useResume();

  const experience = resumeData.experience || [];

  const handleAddExperience = () => {
    addItem("experience", {
      company: "",
      role: "",
      startDate: "",
      endDate: "",
      currentlyWorking: false,
      responsibilities: "",
    });
  };

  const handleCurrentlyWorking = (index, checked) => {
    updateItem(
      "experience",
      index,
      "currentlyWorking",
      checked
    );

    if (checked) {
      updateItem(
        "experience",
        index,
        "endDate",
        ""
      );
    }
  };

  return (
    <div className="card border-0 shadow-sm">
      <div className="card-body p-4">

        {/* Heading */}
        <div className="d-flex justify-content-between align-items-start mb-4">
          <div>
            <h2 className="h5 fw-bold mb-1">
              Work Experience
            </h2>

            <p className="small text-secondary mb-0">
              Add your professional work experience and responsibilities.
            </p>
          </div>

          <button
            type="button"
            className="btn btn-primary btn-sm"
            onClick={handleAddExperience}
          >
            + Add Experience
          </button>
        </div>

        {/* Empty State */}
        {experience.length === 0 && (
          <div className="text-center border rounded p-4">
            <p className="text-secondary mb-3">
              No work experience added yet.
            </p>

            <button
              type="button"
              className="btn btn-outline-primary"
              onClick={handleAddExperience}
            >
              Add Your Experience
            </button>
          </div>
        )}

        {/* Experience Items */}
        {experience.map((item, index) => (
          <div
            key={index}
            className="border rounded p-4 mb-3"
          >
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h3 className="h6 fw-semibold mb-0">
                Experience #{index + 1}
              </h3>

              <button
                type="button"
                className="btn btn-outline-danger btn-sm"
                onClick={() =>
                  removeItem("experience", index)
                }
              >
                Remove
              </button>
            </div>

            <div className="row g-3">

              {/* Company */}
              <div className="col-md-6">
                <label className="form-label fw-semibold">
                  Company
                </label>

                <input
                  type="text"
                  className="form-control"
                  value={item.company || ""}
                  onChange={(e) =>
                    updateItem(
                      "experience",
                      index,
                      "company",
                      e.target.value
                    )
                  }
                  placeholder="e.g. ABC Technologies"
                />
              </div>

              {/* Role */}
              <div className="col-md-6">
                <label className="form-label fw-semibold">
                  Job Role
                </label>

                <input
                  type="text"
                  className="form-control"
                  value={item.role || ""}
                  onChange={(e) =>
                    updateItem(
                      "experience",
                      index,
                      "role",
                      e.target.value
                    )
                  }
                  placeholder="e.g. Full Stack Developer"
                />
              </div>

              {/* Start Date */}
              <div className="col-md-6">
                <label className="form-label fw-semibold">
                  Start Date
                </label>

                <input
                  type="text"
                  className="form-control"
                  value={item.startDate || ""}
                  onChange={(e) =>
                    updateItem(
                      "experience",
                      index,
                      "startDate",
                      e.target.value
                    )
                  }
                  placeholder="e.g. Jan 2024"
                />
              </div>

              {/* End Date */}
              <div className="col-md-6">
                <label className="form-label fw-semibold">
                  End Date
                </label>

                <input
                  type="text"
                  className="form-control"
                  value={item.endDate || ""}
                  onChange={(e) =>
                    updateItem(
                      "experience",
                      index,
                      "endDate",
                      e.target.value
                    )
                  }
                  placeholder="e.g. Dec 2025"
                  disabled={item.currentlyWorking}
                />
              </div>

              {/* Currently Working */}
              <div className="col-12">
                <div className="form-check">
                  <input
                    id={`currently-working-${index}`}
                    type="checkbox"
                    className="form-check-input"
                    checked={item.currentlyWorking || false}
                    onChange={(e) =>
                      handleCurrentlyWorking(
                        index,
                        e.target.checked
                      )
                    }
                  />

                  <label
                    htmlFor={`currently-working-${index}`}
                    className="form-check-label"
                  >
                    I currently work here
                  </label>
                </div>
              </div>

              {/* Responsibilities */}
              <div className="col-12">
                <label className="form-label fw-semibold">
                  Responsibilities
                </label>

                <textarea
                  className="form-control"
                  rows="5"
                  value={item.responsibilities || ""}
                  onChange={(e) =>
                    updateItem(
                      "experience",
                      index,
                      "responsibilities",
                      e.target.value
                    )
                  }
                  placeholder="Describe your responsibilities, achievements, and impact..."
                />

                <small className="text-secondary">
                  Focus on achievements and measurable results.
                </small>
              </div>

            </div>
          </div>
        ))}

        {/* Bottom Add */}
        {experience.length > 0 && (
          <button
            type="button"
            className="btn btn-outline-primary w-100"
            onClick={handleAddExperience}
          >
            + Add Another Experience
          </button>
        )}

      </div>
    </div>
  );
}