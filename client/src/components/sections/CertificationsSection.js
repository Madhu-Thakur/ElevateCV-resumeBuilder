"use client";

import { useResume } from "@/context/ResumeContext";

export default function CertificationsSection() {
  const {
    resumeData,
    addItem,
    removeItem,
    updateItem,
  } = useResume();

  const certifications = resumeData.certifications || [];

  const handleAddCertification = () => {
    addItem("certifications", {
      name: "",
      provider: "",
      completionId: "",
      url: "",
      validity: "",
    });
  };

  const handleRemoveCertification = (index) => {
    removeItem("certifications", index);
  };

  return (
    <div className="card border-0 shadow-sm">
      <div className="card-body p-4">

        {/* Header */}
        <div className="d-flex justify-content-between align-items-start mb-4">
          <div>
            <h2 className="h5 fw-bold mb-1">
              Certifications
            </h2>

            <p className="small text-secondary mb-0">
              Add certifications that strengthen your professional profile.
            </p>
          </div>

          <button
            type="button"
            className="btn btn-primary btn-sm"
            onClick={handleAddCertification}
          >
            + Add Certification
          </button>
        </div>

        {/* Empty State */}
        {certifications.length === 0 && (
          <div className="text-center border rounded p-4">
            <p className="text-secondary mb-3">
              No certifications added yet.
            </p>

            <button
              type="button"
              className="btn btn-outline-primary"
              onClick={handleAddCertification}
            >
              Add Your Certification
            </button>
          </div>
        )}

        {/* Certification Items */}
        {certifications.map((item, index) => (
          <div
            key={index}
            className="border rounded p-4 mb-3"
          >
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h3 className="h6 fw-semibold mb-0">
                Certification #{index + 1}
              </h3>

              <button
                type="button"
                className="btn btn-outline-danger btn-sm"
                onClick={() =>
                  handleRemoveCertification(index)
                }
              >
                Remove
              </button>
            </div>

            <div className="row g-3">

              {/* Name */}
              <div className="col-md-6">
                <label className="form-label fw-semibold">
                  Certification Name
                </label>

                <input
                  type="text"
                  className="form-control"
                  value={item.name || ""}
                  onChange={(e) =>
                    updateItem(
                      "certifications",
                      index,
                      "name",
                      e.target.value
                    )
                  }
                  placeholder="e.g. AWS Certified Cloud Practitioner"
                />
              </div>

              {/* Provider */}
              <div className="col-md-6">
                <label className="form-label fw-semibold">
                  Provider / Issuer
                </label>

                <input
                  type="text"
                  className="form-control"
                  value={item.provider || ""}
                  onChange={(e) =>
                    updateItem(
                      "certifications",
                      index,
                      "provider",
                      e.target.value
                    )
                  }
                  placeholder="e.g. Amazon Web Services"
                />
              </div>

              {/* Completion ID */}
              <div className="col-md-6">
                <label className="form-label fw-semibold">
                  Completion ID
                </label>

                <input
                  type="text"
                  className="form-control"
                  value={item.completionId || ""}
                  onChange={(e) =>
                    updateItem(
                      "certifications",
                      index,
                      "completionId",
                      e.target.value
                    )
                  }
                  placeholder="Certificate ID"
                />
              </div>

              {/* Validity */}
              <div className="col-md-6">
                <label className="form-label fw-semibold">
                  Validity
                </label>

                <input
                  type="text"
                  className="form-control"
                  value={item.validity || ""}
                  onChange={(e) =>
                    updateItem(
                      "certifications",
                      index,
                      "validity",
                      e.target.value
                    )
                  }
                  placeholder="e.g. 2026 - 2029"
                />
              </div>

              {/* URL */}
              <div className="col-12">
                <label className="form-label fw-semibold">
                  Certification URL
                </label>

                <input
                  type="url"
                  className="form-control"
                  value={item.url || ""}
                  onChange={(e) =>
                    updateItem(
                      "certifications",
                      index,
                      "url",
                      e.target.value
                    )
                  }
                  placeholder="https://example.com/certificate"
                />

                <small className="text-secondary">
                  Add a verification or certificate link if available.
                </small>
              </div>

            </div>
          </div>
        ))}

        {/* Add Another */}
        {certifications.length > 0 && (
          <button
            type="button"
            className="btn btn-outline-primary w-100"
            onClick={handleAddCertification}
          >
            + Add Another Certification
          </button>
        )}

      </div>
    </div>
  );
}