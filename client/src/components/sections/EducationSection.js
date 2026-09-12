"use client";

import { useResume } from "@/context/ResumeContext";

export default function EducationSection() {
  const {
    resumeData,
    addItem,
    removeItem,
    updateItem,
  } = useResume();

  const education = resumeData.education || [];

  const handleAddEducation = () => {
    addItem("education", {
      degree: "",
      institution: "",
      startDate: "",
      endDate: "",
      description: "",
    });
  };

  return (
    <div className="card border-0 shadow-sm">
      <div className="card-body p-4">

        {/* Heading */}
        <div className="d-flex justify-content-between align-items-start mb-4">
          <div>
            <h2 className="h5 fw-bold mb-1">
              Education
            </h2>

            <p className="small text-secondary mb-0">
              Add your educational qualifications.
            </p>
          </div>

          <button
            type="button"
            className="btn btn-primary btn-sm"
            onClick={handleAddEducation}
          >
            + Add Education
          </button>
        </div>

        {/* Empty State */}
        {education.length === 0 && (
          <div className="text-center border rounded p-4">
            <p className="text-secondary mb-3">
              No education added yet.
            </p>

            <button
              type="button"
              className="btn btn-outline-primary"
              onClick={handleAddEducation}
            >
              Add Your Education
            </button>
          </div>
        )}

        {/* Education Items */}
        {education.map((item, index) => (
          <div
            key={index}
            className="border rounded p-4 mb-3"
          >
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h3 className="h6 fw-semibold mb-0">
                Education #{index + 1}
              </h3>

              <button
                type="button"
                className="btn btn-outline-danger btn-sm"
                onClick={() =>
                  removeItem("education", index)
                }
              >
                Remove
              </button>
            </div>

            <div className="row g-3">

              {/* Degree */}
              <div className="col-md-6">
                <label className="form-label fw-semibold">
                  Degree
                </label>

                <input
                  type="text"
                  className="form-control"
                  value={item.degree || ""}
                  onChange={(e) =>
                    updateItem(
                      "education",
                      index,
                      "degree",
                      e.target.value
                    )
                  }
                  placeholder="e.g. B.Tech in Computer Science"
                />
              </div>

              {/* Institution */}
              <div className="col-md-6">
                <label className="form-label fw-semibold">
                  Institution
                </label>

                <input
                  type="text"
                  className="form-control"
                  value={item.institution || ""}
                  onChange={(e) =>
                    updateItem(
                      "education",
                      index,
                      "institution",
                      e.target.value
                    )
                  }
                  placeholder="e.g. ABC University"
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
                      "education",
                      index,
                      "startDate",
                      e.target.value
                    )
                  }
                  placeholder="e.g. 2022"
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
                      "education",
                      index,
                      "endDate",
                      e.target.value
                    )
                  }
                  placeholder="e.g. 2026"
                />
              </div>

              {/* Description */}
              <div className="col-12">
                <label className="form-label fw-semibold">
                  Description
                </label>

                <textarea
                  className="form-control"
                  rows="3"
                  value={item.description || ""}
                  onChange={(e) =>
                    updateItem(
                      "education",
                      index,
                      "description",
                      e.target.value
                    )
                  }
                  placeholder="Add relevant coursework, achievements, or details..."
                />
              </div>

            </div>
          </div>
        ))}

        {/* Bottom Add Button */}
        {education.length > 0 && (
          <button
            type="button"
            className="btn btn-outline-primary w-100"
            onClick={handleAddEducation}
          >
            + Add Another Education
          </button>
        )}

      </div>
    </div>
  );
}