"use client";

import { useResume } from "@/context/ResumeContext";

export default function AchievementsSection() {
  const {
    resumeData,
    addItem,
    removeItem,
    updateItem,
  } = useResume();

  const achievements = resumeData.achievements || [];

  const handleAddAchievement = () => {
    addItem("achievements", "");
  };

  return (
    <div className="card border-0 shadow-sm">
      <div className="card-body p-4">

        <div className="d-flex justify-content-between align-items-start mb-4">
          <div>
            <h2 className="h5 fw-bold mb-1">
              Achievements
            </h2>

            <p className="small text-secondary mb-0">
              Highlight awards, accomplishments, and important achievements.
            </p>
          </div>

          <button
            type="button"
            className="btn btn-primary btn-sm"
            onClick={handleAddAchievement}
          >
            + Add Achievement
          </button>
        </div>

        {achievements.length === 0 && (
          <div className="text-center border rounded p-4">
            <p className="text-secondary mb-3">
              No achievements added yet.
            </p>

            <button
              type="button"
              className="btn btn-outline-primary"
              onClick={handleAddAchievement}
            >
              Add Your Achievement
            </button>
          </div>
        )}

        {achievements.map((achievement, index) => (
          <div
            key={index}
            className="border rounded p-3 mb-3"
          >
            <div className="d-flex gap-3 align-items-start">

              <div className="flex-grow-1">
                <label
                  htmlFor={`achievement-${index}`}
                  className="form-label fw-semibold"
                >
                  Achievement #{index + 1}
                </label>

                <textarea
                  id={`achievement-${index}`}
                  className="form-control"
                  rows="3"
                  value={achievement || ""}
                  onChange={(e) =>
                    updateItem(
                      "achievements",
                      index,
                      null,
                      e.target.value
                    )
                  }
                  placeholder="e.g. Secured 1st position in a national-level coding competition..."
                />
              </div>

              <button
                type="button"
                className="btn btn-outline-danger btn-sm mt-4"
                onClick={() =>
                  removeItem("achievements", index)
                }
              >
                Remove
              </button>

            </div>
          </div>
        ))}

        {achievements.length > 0 && (
          <button
            type="button"
            className="btn btn-outline-primary w-100"
            onClick={handleAddAchievement}
          >
            + Add Another Achievement
          </button>
        )}

      </div>
    </div>
  );
}