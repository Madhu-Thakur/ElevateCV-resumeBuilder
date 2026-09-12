"use client";

import { useState } from "react";
import { useResume } from "@/context/ResumeContext";

export default function InterestsSection() {
  const { resumeData, addItem, removeItem } = useResume();

  const [interest, setInterest] = useState("");

  const interests = resumeData.interests || [];

  const handleAdd = () => {
    const value = interest.trim();

    if (!value) return;

    addItem("interests", value);
    setInterest("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAdd();
    }
  };

  return (
    <div className="card border-0 shadow-sm mb-4">
      <div className="card-body p-4">
        <div className="mb-4">
          <h4 className="fw-bold mb-1">Interests</h4>
          <p className="text-muted mb-0">
            Add hobbies or interests that you would like to include in your
            resume.
          </p>
        </div>

        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="e.g. Photography"
            value={interest}
            onChange={(e) => setInterest(e.target.value)}
            onKeyDown={handleKeyDown}
          />

          <button
            type="button"
            className="btn btn-primary"
            onClick={handleAdd}
          >
            Add
          </button>
        </div>

        {interests.length > 0 && (
          <div className="d-flex flex-wrap gap-2">
            {interests.map((item, index) => (
              <div
                key={index}
                className="badge bg-light text-dark border d-flex align-items-center gap-2 px-3 py-2"
              >
                <span>{item}</span>

                <button
                  type="button"
                  className="btn-close"
                  style={{ fontSize: "8px" }}
                  aria-label="Remove interest"
                  onClick={() => removeItem("interests", index)}
                />
              </div>
            ))}
          </div>
        )}

        {interests.length === 0 && (
          <div className="text-muted small">
            No interests added yet.
          </div>
        )}
      </div>
    </div>
  );
}