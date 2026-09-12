"use client";

import { useResume } from "@/context/ResumeContext";

const levels = [
  "Beginner",
  "Intermediate",
  "Advanced",
  "Fluent",
];

export default function LanguagesSection() {
  const {
    resumeData,
    addItem,
    removeItem,
    updateItem,
  } = useResume();

  const languages = resumeData.languages || [];

  const handleAddLanguage = () => {
    addItem("languages", {
      name: "",
      level: "Intermediate",
    });
  };

  return (
    <div className="card border-0 shadow-sm">
      <div className="card-body p-4">

        {/* Header */}
        <div className="d-flex justify-content-between align-items-start mb-4">
          <div>
            <h2 className="h5 fw-bold mb-1">
              Languages
            </h2>

            <p className="small text-secondary mb-0">
              Add languages and your proficiency level.
            </p>
          </div>

          <button
            type="button"
            className="btn btn-primary btn-sm"
            onClick={handleAddLanguage}
          >
            + Add Language
          </button>
        </div>

        {/* Empty State */}
        {languages.length === 0 && (
          <div className="text-center border rounded p-4">
            <p className="text-secondary mb-3">
              No languages added yet.
            </p>

            <button
              type="button"
              className="btn btn-outline-primary"
              onClick={handleAddLanguage}
            >
              Add Your Language
            </button>
          </div>
        )}

        {/* Languages */}
        {languages.map((language, index) => (
          <div
            key={index}
            className="border rounded p-4 mb-3"
          >
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h3 className="h6 fw-semibold mb-0">
                Language #{index + 1}
              </h3>

              <button
                type="button"
                className="btn btn-outline-danger btn-sm"
                onClick={() =>
                  removeItem("languages", index)
                }
              >
                Remove
              </button>
            </div>

            <div className="row g-3">

              {/* Language Name */}
              <div className="col-md-6">
                <label className="form-label fw-semibold">
                  Language
                </label>

                <input
                  type="text"
                  className="form-control"
                  value={language.name || ""}
                  onChange={(e) =>
                    updateItem(
                      "languages",
                      index,
                      "name",
                      e.target.value
                    )
                  }
                  placeholder="e.g. English"
                />
              </div>

              {/* Level */}
              <div className="col-md-6">
                <label className="form-label fw-semibold">
                  Proficiency Level
                </label>

                <select
                  className="form-select"
                  value={language.level || "Intermediate"}
                  onChange={(e) =>
                    updateItem(
                      "languages",
                      index,
                      "level",
                      e.target.value
                    )
                  }
                >
                  {levels.map((level) => (
                    <option key={level} value={level}>
                      {level}
                    </option>
                  ))}
                </select>
              </div>

            </div>
          </div>
        ))}

        {/* Add Another */}
        {languages.length > 0 && (
          <button
            type="button"
            className="btn btn-outline-primary w-100"
            onClick={handleAddLanguage}
          >
            + Add Another Language
          </button>
        )}

      </div>
    </div>
  );
}