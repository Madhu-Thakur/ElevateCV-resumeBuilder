"use client";

import { useMemo, useState } from "react";
import { useResume } from "@/context/ResumeContext";
import { getResumeScore, getScoreStatus } from "@/utils/resumeScore";

export default function ResumeScore() {
  const { resumeData } = useResume();
  const [showModal, setShowModal] = useState(false);

  const { score, breakdown, suggestions } = useMemo(
    () => getResumeScore(resumeData),
    [resumeData]
  );

  const status = getScoreStatus(score);

  const getStatusClass = () => {
    if (score >= 80) return "text-bg-success";
    if (score >= 60) return "text-bg-warning";
    if (score >= 40) return "text-bg-info";
    return "text-bg-danger";
  };

  const getProgressClass = (value, max) => {
    if (value === max) return "bg-success";
    if (value > 0) return "bg-warning";
    return "bg-secondary";
  };

  return (
    <>
      {/* Score Badge */}
      <button
        type="button"
        className="resume-score-header-btn"
        onClick={() => setShowModal(true)}
        aria-label={`Resume score ${score} out of 100, ${status.label}`}
      >
        <span className="resume-score-header-number">
          {score}/100
        </span>

        <span className={`badge ${getStatusClass()}`}>
          {status.label}
        </span>
      </button>

      {/* Score Modal */}
      {showModal && (
        <div
          className="resume-score-overlay"
          onClick={() => setShowModal(false)}
        >
          <div
            className="resume-score-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="resume-score-title"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="d-flex justify-content-between align-items-start mb-3">
              <div>
                <h2
                  id="resume-score-title"
                  className="h5 fw-bold mb-1"
                >
                  Resume Score
                </h2>

                <p className="small text-secondary mb-0">
                  Based on your current resume entries
                </p>
              </div>

              <button
                type="button"
                className="btn-close"
                aria-label="Close"
                onClick={() => setShowModal(false)}
              />
            </div>

            {/* Overall Score */}
            <div className="resume-score-overall rounded-3 p-3 mb-3">
              <div className="d-flex align-items-center justify-content-center gap-2">
                <span className="display-6 fw-bold text-primary">
                  {score}/100
                </span>

                <span className={`badge ${getStatusClass()}`}>
                  {status.label}
                </span>
              </div>

              <div
                className="progress mt-2"
                style={{ height: "6px" }}
                role="progressbar"
                aria-label="Overall resume score"
                aria-valuenow={score}
                aria-valuemin="0"
                aria-valuemax="100"
              >
                <div
                  className="progress-bar"
                  style={{ width: `${score}%` }}
                />
              </div>
            </div>

            {/* Category Breakdown */}
            <div className="mb-3">
              <h3 className="h6 fw-semibold mb-2">
                Score Breakdown
              </h3>

              <div className="row g-2">
                {breakdown.map((section) => (
                  <div
                    key={section.key}
                    className="col-12 col-md-6"
                  >
                    <div className="resume-score-category">
                      <div className="d-flex justify-content-between small mb-1">
                        <span>{section.label}</span>

                        <span className="text-secondary">
                          {section.score}/{section.max}
                        </span>
                      </div>

                      <div
                        className="progress"
                        style={{ height: "4px" }}
                        role="progressbar"
                        aria-label={section.label}
                        aria-valuenow={section.score}
                        aria-valuemin="0"
                        aria-valuemax={section.max}
                      >
                        <div
                          className={`progress-bar ${getProgressClass(
                            section.score,
                            section.max
                          )}`}
                          style={{
                            width: `${
                              (section.score / section.max) * 100
                            }%`,
                          }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Suggestions */}
            {suggestions.length > 0 && (
              <div className="mb-2">
                <h3 className="h6 fw-semibold mb-2">
                  Top Suggestions
                </h3>

                <ul className="small text-secondary mb-0 ps-3">
                  {suggestions.map((text) => (
                    <li key={text} className="mb-1">
                      {text}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Disclaimer */}
            <div className="border-top pt-2 mt-2">
              <p className="small text-secondary mb-0">
                This is a completeness score based on your entries. It
                does not guarantee ATS results.
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}