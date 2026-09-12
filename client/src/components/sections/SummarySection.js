"use client";

import { useState } from "react";
import { useResume } from "@/context/ResumeContext";
import { generateSummary } from "@/services/api";

export default function SummarySection() {
  const { resumeData, updateField } = useResume();

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const summary = resumeData.summary || "";
  const characterCount = summary.length;

  const handleChange = (value) => {
    updateField("summary", value);
    setMessage("");
  };

  const handleEnhance = async () => {
    if (!summary.trim()) {
      setMessage("Please write a summary first.");
      return;
    }

    try {
      setLoading(true);
      setMessage("");

      // Build the payload expected by the existing backend AI Summary API.
      const payload = {
        fullName: resumeData?.personalInfo?.name || "",
        skills: resumeData?.skills || [],
        experience: (resumeData?.experience || []).map((e) => ({
          jobTitle: e.role || "",
          company: e.company || "",
          description: e.responsibilities || "",
        })),
        education: (resumeData?.education || []).map((e) => ({
          degree: e.degree || "",
          institution: e.institution || "",
        })),
        projects: (resumeData?.projects || []).map((p) => ({
          name: p.title || "",
          description: p.description || "",
          technologies: p.techStack || [],
        })),
      };

      const data = await generateSummary(payload);

      const enhancedSummary =
        data.summary ||
        data.result ||
        data.enhancedSummary ||
        data.output;

      if (enhancedSummary) {
        updateField("summary", enhancedSummary);
        setMessage("Summary enhanced successfully.");
      } else {
        setMessage("AI did not return an enhanced summary.");
      }
    } catch (error) {
      console.error("AI Summary Error:", error);
      setMessage(error.message || "Failed to enhance summary.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card border-0 shadow-sm">
      <div className="card-body p-4">

        {/* Heading */}
        <div className="mb-4">
          <h2 className="h5 fw-bold mb-1">
            Professional Summary
          </h2>

          <p className="small text-secondary mb-0">
            Write a short summary that highlights your professional
            strengths and career goals.
          </p>
        </div>

        {/* Textarea */}
        <div className="mb-2">
          <textarea
            className="form-control"
            rows="7"
            value={summary}
            onChange={(e) => handleChange(e.target.value)}
            placeholder="Example: Motivated Full Stack Developer with experience in React, Node.js and MongoDB..."
          />
        </div>

        {/* Character information */}
        <div className="d-flex justify-content-between align-items-center">
          <small className="text-secondary">
            {characterCount} characters
          </small>

          <small
            className={
              characterCount >= 100 && characterCount <= 300
                ? "text-success"
                : "text-secondary"
            }
          >
            {characterCount >= 100 && characterCount <= 300
              ? "Good length"
              : "Recommended: 100–300 characters"}
          </small>
        </div>

        {/* AI Button */}
        <div className="mt-4">
          <button
            type="button"
            className="btn btn-outline-primary"
            onClick={handleEnhance}
            disabled={loading || !summary.trim()}
          >
            {loading ? (
              <>
                <span
                  className="spinner-border spinner-border-sm me-2"
                  role="status"
                />
                Enhancing...
              </>
            ) : (
              <>✨ Enhance with AI</>
            )}
          </button>
        </div>

        {/* Message */}
        {message && (
          <div className="mt-3">
            <div className="alert alert-light border mb-0">
              {message}
            </div>
          </div>
        )}

        {/* Tips */}
        <div className="mt-4 p-3 bg-body-tertiary rounded">
          <h3 className="h6 fw-semibold mb-2">
            Tips for a strong summary
          </h3>

          <ul className="small text-secondary mb-0 ps-3">
            <li>Keep it concise and professional.</li>
            <li>Mention your strongest skills.</li>
            <li>Highlight relevant experience or projects.</li>
            <li>Focus on what you can offer an employer.</li>
          </ul>
        </div>

      </div>
    </div>
  );
}