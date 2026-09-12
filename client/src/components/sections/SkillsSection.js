"use client";

import { useState } from "react";
import { useResume } from "@/context/ResumeContext";

const skillSuggestions = [
  "JavaScript",
  "React",
  "Next.js",
  "Node.js",
  "Express.js",
  "MongoDB",
  "SQL",
  "Git",
  "HTML",
  "CSS",
];

export default function SkillsSection() {
  const { resumeData, addItem, removeItem } = useResume();

  const skills = resumeData.skills || [];

  const [skill, setSkill] = useState("");
  const [message, setMessage] = useState("");

  const addSkill = (value = skill) => {
    const newSkill = value.trim();

    if (!newSkill) return;

    const alreadyExists = skills.some(
      (item) => item.toLowerCase() === newSkill.toLowerCase()
    );

    if (alreadyExists) {
      setMessage("This skill has already been added.");
      return;
    }

    addItem("skills", newSkill);
    setSkill("");
    setMessage("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addSkill();
    }

    if (
      e.key === "Backspace" &&
      !skill &&
      skills.length > 0
    ) {
      removeItem("skills", skills.length - 1);
    }
  };

  return (
    <div className="card border-0 shadow-sm">
      <div className="card-body p-4">

        {/* Heading */}
        <div className="mb-4">
          <h2 className="h5 fw-bold mb-1">
            Skills
          </h2>

          <p className="small text-secondary mb-0">
            Add technical and professional skills relevant to your career.
          </p>
        </div>

        {/* Input */}
        <div className="mb-3">
          <label className="form-label fw-semibold">
            Add a Skill
          </label>

          <input
            type="text"
            className="form-control"
            value={skill}
            onChange={(e) => {
              setSkill(e.target.value);
              setMessage("");
            }}
            onKeyDown={handleKeyDown}
            placeholder="Type a skill and press Enter"
          />

          <small className="text-secondary">
            Press Enter to add a skill.
          </small>
        </div>

        {/* Message */}
        {message && (
          <div className="alert alert-warning py-2 small">
            {message}
          </div>
        )}

        {/* Skills */}
        {skills.length > 0 && (
          <div className="mb-4">
            <label className="form-label fw-semibold">
              Added Skills
            </label>

            <div className="d-flex flex-wrap gap-2">
              {skills.map((item, index) => (
                <span
                  key={`${item}-${index}`}
                  className="badge rounded-pill bg-primary-subtle text-primary px-3 py-2 d-flex align-items-center gap-2"
                >
                  {item}

                  <button
                    type="button"
                    className="btn-close"
                    style={{
                      fontSize: "0.55rem",
                    }}
                    aria-label={`Remove ${item}`}
                    onClick={() =>
                      removeItem("skills", index)
                    }
                  />
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Suggestions */}
        <div>
          <label className="form-label fw-semibold">
            Suggestions
          </label>

          <div className="d-flex flex-wrap gap-2">
            {skillSuggestions
              .filter(
                (suggestion) =>
                  !skills.some(
                    (item) =>
                      item.toLowerCase() ===
                      suggestion.toLowerCase()
                  )
              )
              .map((suggestion) => (
                <button
                  key={suggestion}
                  type="button"
                  className="btn btn-sm btn-outline-secondary"
                  onClick={() => addSkill(suggestion)}
                >
                  + {suggestion}
                </button>
              ))}
          </div>
        </div>

      </div>
    </div>
  );
}