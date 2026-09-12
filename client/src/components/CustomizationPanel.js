"use client";

import { useState } from "react";
import { useResume } from "@/context/ResumeContext";
import {
  FONT_FAMILIES,
  FONT_SIZES,
  DEFAULT_SECTION_ORDER,
  SECTION_LABELS,
} from "@/utils/customization";

const COLOR_OPTIONS = [
  {
    value: "#144667",
    label: "DEEM Blue (#144667)",
  },
  {
    value: "#eb5141",
    label: "DEEM Red (#eb5141)",
  },
  {
    value: "#1f2937",
    label: "Charcoal (#1f2937)",
  },
  {
    value: "#374151",
    label: "Slate (#374151)",
  },
  {
    value: "#2563eb",
    label: "Blue (#2563eb)",
  },
  {
    value: "#16a34a",
    label: "Green (#16a34a)",
  },
  {
    value: "#7c3aed",
    label: "Purple (#7c3aed)",
  },
];

export default function CustomizationPanel() {
  const {
    resumeData,
    setTemplate,
    updateTypography,
    updateCustomColors,
    moveSection,
    resetCustomization,
  } = useResume();

  const [showSectionOrder, setShowSectionOrder] = useState(false);

  const typography = resumeData?.typography || {
    fontFamily: "Arial",
    fontSize: "medium",
  };

  const customColors = resumeData?.customColors || {
    primary: "#144667",
    secondary: "#eb5141",
  };

  const sectionOrder =
    resumeData?.sectionOrder || DEFAULT_SECTION_ORDER;

  return (
    <div>
      <div className="mb-3">
        <label
          htmlFor="template-select"
          className="form-label fw-semibold mb-1"
        >
          Template
        </label>

        <select
          id="template-select"
          className="form-select"
          value={resumeData?.template || "classic"}
          onChange={(e) => setTemplate(e.target.value)}
        >
          <option value="classic">Classic</option>
          <option value="modern-sidebar">Modern Sidebar</option>
          <option value="minimal-ats">Minimal ATS</option>
          <option value="compact">Compact</option>
          <option value="creative">Creative</option>
          <option value="executive">Executive</option>
          <option value="grid">Grid Layout</option>
          <option value="card">Card Layout</option>
        </select>
      </div>
 
      <div className="border-top pt-3 mb-3">
        <h6 className="fw-semibold mb-3">Appearance</h6>

        <div className="row g-2">
          {/* Font Family */}
          <div className="col-7">
            <label
              htmlFor="font-family"
              className="form-label mb-1"
            >
              Font Family
            </label>

            <select
              id="font-family"
              className="form-select"
              value={typography.fontFamily}
              onChange={(e) =>
                updateTypography("fontFamily", e.target.value)
              }
            >
              {FONT_FAMILIES.map((font) => (
                <option key={font} value={font}>
                  {font}
                </option>
              ))}
            </select>
          </div>

          {/* Font Size */}
          <div className="col-5">
            <label
              htmlFor="font-size"
              className="form-label mb-1"
            >
              Font Size
            </label>

            <select
              id="font-size"
              className="form-select"
              value={typography.fontSize}
              onChange={(e) =>
                updateTypography("fontSize", e.target.value)
              }
            >
              {FONT_SIZES.map(({ value, label }) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Primary Color */}
        <div className="mt-3 mb-3">
          <label
            htmlFor="primary-color"
            className="form-label mb-1"
          >
            Primary Color
          </label>

          <select
            id="primary-color"
            className="form-select"
            value={customColors.primary}
            onChange={(e) =>
              updateCustomColors("primary", e.target.value)
            }
          >
            {COLOR_OPTIONS.map((color) => (
              <option key={color.value} value={color.value}>
                {color.label}
              </option>
            ))}
          </select>
        </div>

        {/* Secondary Color */}
        <div className="mb-0">
          <label
            htmlFor="secondary-color"
            className="form-label mb-1"
          >
            Secondary Color
          </label>

          <select
            id="secondary-color"
            className="form-select"
            value={customColors.secondary}
            onChange={(e) =>
              updateCustomColors("secondary", e.target.value)
            }
          >
            {COLOR_OPTIONS.map((color) => (
              <option key={color.value} value={color.value}>
                {color.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="section-order-wrapper mt-4">
        {/* Section Order Header */}
        <button
          type="button"
          className="section-order-toggle btn w-100 d-flex justify-content-between align-items-center"
          onClick={() =>
            setShowSectionOrder((previous) => !previous)
          }
          aria-expanded={showSectionOrder}
        >
          <span>Section Order</span>

          <span className="section-order-arrow">
            {showSectionOrder ? "⌃" : "⌄"}
          </span>
        </button>

        {/* Upward Dropdown */}
        {showSectionOrder && (
          <div className="section-order-dropdown">
            <p className="small text-secondary mb-2">
              Use the arrows to reorder the resume sections.
            </p>

            <div className="section-order-list">
              {sectionOrder.map((sectionKey, index) => (
                <div
                  key={sectionKey}
                  className="section-order-item"
                >
                  <span className="section-order-label">
                    {SECTION_LABELS[sectionKey] || sectionKey}
                  </span>

                  <div className="d-flex">
                    {/* Move Up */}
                    <button
                      type="button"
                      className="btn btn-sm btn-outline-secondary section-order-btn"
                      onClick={() =>
                        moveSection(sectionKey, "up")
                      }
                      disabled={index === 0}
                      aria-label={`Move ${
                        SECTION_LABELS[sectionKey] || sectionKey
                      } up`}
                    >
                      ↑
                    </button>

                    {/* Move Down */}
                    <button
                      type="button"
                      className="btn btn-sm btn-outline-secondary section-order-btn"
                      onClick={() =>
                        moveSection(sectionKey, "down")
                      }
                      disabled={index === sectionOrder.length - 1}
                      aria-label={`Move ${
                        SECTION_LABELS[sectionKey] || sectionKey
                      } down`}
                    >
                      ↓
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
     <button
  type="button"
  className="btn btn-outline-danger w-100  reset-customization-btn"
        onClick={resetCustomization}
      >
        Reset Customization
      </button>
    </div>
  );
}