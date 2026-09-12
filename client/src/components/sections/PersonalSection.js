"use client";

import { useState } from "react";
import { useResume } from "@/context/ResumeContext";

export default function PersonalSection() {
  const { resumeData, updatePersonalInfo } = useResume();

  const [errors, setErrors] = useState({});
  const [validationResult, setValidationResult] = useState(null);

  const personalInfo = resumeData.personalInfo;

  const handleChange = (field, value) => {
    updatePersonalInfo(field, value);

    if (errors[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: "",
      }));
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!personalInfo.name?.trim()) {
      newErrors.name = "Full name is required";
    }

    if (!personalInfo.email?.trim()) {
      newErrors.email = "Email is required";
    } else if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(personalInfo.email)
    ) {
      newErrors.email = "Enter a valid email address";
    }

    setErrors(newErrors);
    setValidationResult(Object.keys(newErrors).length === 0 ? "success" : "error");

    return Object.keys(newErrors).length === 0;
  };

  const handleImageUpload = (event) => {
    const file = event.target.files?.[0];

    if (!file) return;

    if (!["image/jpeg", "image/png"].includes(file.type)) {
      setErrors((prev) => ({
        ...prev,
        profileImage: "Only JPG and PNG images are allowed",
      }));
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setErrors((prev) => ({
        ...prev,
        profileImage: "Image size must be less than 5MB",
      }));
      return;
    }

    try {
      const FileReaderImpl =
        typeof window !== "undefined" && window.FileReader
          ? window.FileReader
          : typeof FileReader !== "undefined"
            ? FileReader
            : null;

      if (!FileReaderImpl) {
        setErrors((prev) => ({
          ...prev,
          profileImage: "Image upload is not supported in this browser",
        }));
        return;
      }

      const reader = new FileReaderImpl();

      reader.onerror = () => {
        setErrors((prev) => ({
          ...prev,
          profileImage: "Could not read the selected image. Please try again.",
        }));
      };

      reader.onload = () => {
        if (typeof reader.result !== "string" || reader.result === "") {
          setErrors((prev) => ({
            ...prev,
            profileImage: "Could not read the selected image. Please try again.",
          }));
          return;
        }

        updatePersonalInfo("profileImage", reader.result);

        setErrors((prev) => ({
          ...prev,
          profileImage: "",
        }));
      };

      reader.readAsDataURL(file);
    } catch (error) {
      setErrors((prev) => ({
        ...prev,
        profileImage: "Could not read the selected image. Please try again.",
      }));
    }
  };

  return (
    <div className="card border-0 shadow-sm">
      <div className="card-body p-4">
        <div className="mb-4">
          <h2 className="h5 fw-bold mb-1">
            Personal Information
          </h2>

          <p className="text-secondary small mb-0">
            Add your contact information so recruiters can reach you.
          </p>
        </div>

        {/* Profile Image */}
        <div className="mb-4">
          <label className="form-label fw-semibold">
            Profile Photo
          </label>

          <div className="d-flex align-items-center gap-3">
            {personalInfo.profileImage ? (
              <img
                src={personalInfo.profileImage}
                alt="Profile"
                className="rounded-circle border"
                style={{
                  width: "72px",
                  height: "72px",
                  objectFit: "cover",
                }}
              />
            ) : (
              <div
                className="rounded-circle bg-body-secondary d-flex align-items-center justify-content-center"
                style={{
                  width: "72px",
                  height: "72px",
                }}
              >
                <span className="text-secondary">
                  Photo
                </span>
              </div>
            )}

            <div>
              <input
                type="file"
                className="form-control"
                accept="image/jpeg,image/png"
                onChange={handleImageUpload}
              />

              <small className="text-secondary">
                JPG or PNG, maximum 5MB
              </small>
            </div>
          </div>

          {errors.profileImage && (
            <div className="text-danger small mt-2">
              {errors.profileImage}
            </div>
          )}
        </div>

        {/* Name + Email */}
        <div className="row g-3">
          <div className="col-md-6">
            <label className="form-label fw-semibold">
              Full Name <span className="text-danger">*</span>
            </label>

            <input
              type="text"
              className={`form-control ${
                errors.name ? "is-invalid" : ""
              }`}
              value={personalInfo.name || ""}
              onChange={(e) =>
                handleChange("name", e.target.value)
              }
              placeholder="Enter your full name"
            />

            {errors.name && (
              <div className="invalid-feedback">
                {errors.name}
              </div>
            )}
          </div>

          <div className="col-md-6">
            <label className="form-label fw-semibold">
              Email <span className="text-danger">*</span>
            </label>

            <input
              type="email"
              className={`form-control ${
                errors.email ? "is-invalid" : ""
              }`}
              value={personalInfo.email || ""}
              onChange={(e) =>
                handleChange("email", e.target.value)
              }
              placeholder="you@example.com"
            />

            {errors.email && (
              <div className="invalid-feedback">
                {errors.email}
              </div>
            )}
          </div>

          {/* Phone */}
          <div className="col-md-6">
            <label className="form-label fw-semibold">
              Phone
            </label>

            <input
              type="tel"
              className="form-control"
              value={personalInfo.phone || ""}
              onChange={(e) =>
                handleChange("phone", e.target.value)
              }
              placeholder="+91 98765 43210"
            />
          </div>

          {/* Location */}
          <div className="col-md-6">
            <label className="form-label fw-semibold">
              Location
            </label>

            <input
              type="text"
              className="form-control"
              value={personalInfo.location || ""}
              onChange={(e) =>
                handleChange("location", e.target.value)
              }
              placeholder="City, Country"
            />
          </div>

          {/* LinkedIn */}
          <div className="col-md-4">
            <label className="form-label fw-semibold">
              LinkedIn
            </label>

            <input
              type="url"
              className="form-control"
              value={personalInfo.linkedin || ""}
              onChange={(e) =>
                handleChange("linkedin", e.target.value)
              }
              placeholder="https://linkedin.com/in/username"
            />
          </div>

          {/* GitHub */}
          <div className="col-md-4">
            <label className="form-label fw-semibold">
              GitHub
            </label>

            <input
              type="url"
              className="form-control"
              value={personalInfo.github || ""}
              onChange={(e) =>
                handleChange("github", e.target.value)
              }
              placeholder="https://github.com/username"
            />
          </div>

          {/* Portfolio */}
          <div className="col-md-4">
            <label className="form-label fw-semibold">
              Portfolio
            </label>

            <input
              type="url"
              className="form-control"
              value={personalInfo.portfolio || ""}
              onChange={(e) =>
                handleChange("portfolio", e.target.value)
              }
              placeholder="https://yourwebsite.com"
            />
          </div>
        </div>

        {/* Validation Button */}
        <div className="d-flex justify-content-end mt-4">
          <button
            type="button"
            className="btn btn-primary"
            onClick={validate}
          >
            Validate Information
          </button>
        </div>

        {validationResult === "success" && (
          <div className="alert alert-success mt-3 mb-0">
            ✓ Information is valid.
          </div>
        )}

        {validationResult === "error" && (
          <div className="alert alert-danger mt-3 mb-0">
            Please fill in: {Object.keys(errors).map(k => k.charAt(0).toUpperCase() + k.slice(1)).join(", ")}
          </div>
        )}
      </div>
    </div>
  );
}
