"use client";

import Navbar from "@/components/common/Navbar";
import ProtectedRoute from "@/components/auth/ProtectedRoute";

import { useCallback, useEffect, useRef, useState } from "react";
import { useResume } from "@/context/ResumeContext";
import { useAuth } from "@/context/AuthContext";
import { createResume, updateResume } from "@/services/api";
import { mapResumeToBackend } from "@/utils/dataMapper";
import { getPdfFileName } from "@/utils/pdf";
import WizardContainer from "@/components/builder/WizardContainer";
import ResumePreview from "@/components/ResumePreview";
import ResumePrintPortal from "@/components/ResumePrintPortal";
import ResumeScore from "@/components/ResumeScore";
import CustomizationPanel from "@/components/CustomizationPanel";

export default function BuilderPage() {
  const {
    resumeData,
    currentResumeId,
    setCurrentResumeId,
  } = useResume();

  const { isAuthenticated } = useAuth();

  const [saving, setSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState(null);
  const [exporting, setExporting] = useState(false);
  const [exportError, setExportError] = useState(null);

  const [showMobileCustomize, setShowMobileCustomize] =
    useState(false);

  const exportCleanupRef = useRef(false);

  const restoreAfterPrint = useCallback(() => {
    if (exportCleanupRef.current) return;

    exportCleanupRef.current = true;
    document.body.classList.remove("printing-resume");
    setExporting(false);
  }, []);

  useEffect(() => {
    return () => {
      document.body.classList.remove("printing-resume");
    };
  }, []);

  const handleDownloadPdf = () => {
    if (exporting) return;

    setExportError(null);
    exportCleanupRef.current = false;

    try {
      if (
        typeof window === "undefined" ||
        typeof document === "undefined"
      ) {
        return;
      }

      const fileName = getPdfFileName(resumeData?.title);
      const originalTitle = document.title;

      document.title = fileName.replace(/\.pdf$/, "");
      document.body.classList.add("printing-resume");
      setExporting(true);

      window.addEventListener("afterprint", restoreAfterPrint, {
        once: true,
      });

      setTimeout(restoreAfterPrint, 60000);

      window.print();

      setTimeout(() => {
        document.title = originalTitle;
        restoreAfterPrint();
      }, 500);
    } catch (err) {
      setExportError(
        err?.message ||
          "Failed to open the print dialog. Please try again.",
      );

      document.body.classList.remove("printing-resume");
      setExporting(false);
    }
  };

  const handleSaveResume = async () => {
    if (saving) return;

    setSaveStatus(null);

    if (!isAuthenticated) {
      setSaveStatus({
        type: "warning",
        message: "Please login to save your resume.",
      });
      return;
    }

    setSaving(true);

    const isUpdate = Boolean(currentResumeId);

    try {
      const payload = mapResumeToBackend(resumeData);

      const result = isUpdate
        ? await updateResume(currentResumeId, payload)
        : await createResume(payload);

      const saved = result?.resume;

      if (!isUpdate && saved?._id) {
        setCurrentResumeId(saved._id);
      }

      setSaveStatus({
        type: "success",
        message: isUpdate
          ? "Resume updated successfully."
          : "Resume created successfully.",
      });
    } catch (error) {
      const status = error?.status;

      let message =
        error?.message || "Failed to save your resume.";

      if (status === 401 || status === 403) {
        message =
          "Your session has expired. Please login again to save your resume.";
      }

      setSaveStatus({
        type: "danger",
        message,
      });
    } finally {
      setSaving(false);
    }
  };

  return (
    <ProtectedRoute>
      <main className="min-vh-100 bg-body-tertiary">
        {/* Header */}
        <Navbar
          showCustomizeButton={true}
          onCustomizeClick={() =>
            setShowMobileCustomize(true)
          }
        />

        {/* ================= BUILDER ================= */}
        <div className="container-fluid">
          <div className="row g-0">

            {/* ================= LEFT - FORM ================= */}
            <aside className="col-lg-4 col-xl-3 bg-white border-end">
              <div className="p-4 builder-pane">
                <div className="mb-4">
                  <h2 className="h5 fw-bold mb-1">
                    Build Your Resume
                  </h2>

                  <p className="small text-secondary mb-0">
                    Complete each section to create your resume.
                  </p>
                </div>

                <WizardContainer />
              </div>
            </aside>

            {/* ================= CENTER - PREVIEW ================= */}
            <section className="col-lg-5 col-xl-6">
              <div className="p-4 builder-pane">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <div>
                    <h2 className="h5 fw-bold mb-1">
                      Live Preview
                    </h2>

                    <small className="text-secondary">
                      Your resume updates as you edit.
                    </small>
                  </div>

                  <div className="d-flex align-items-center flex-wrap gap-2">
                    <ResumeScore />

                    {saveStatus && (
                      <div
                        className={`alert alert-${saveStatus.type} py-2 px-3 mb-0 small shadow-sm rounded-3`}
                        role="status"
                      >
                        {saveStatus.message}
                      </div>
                    )}

                    {exportError && (
                      <div
                        className="alert alert-danger py-2 px-3 mb-0 small shadow-sm rounded-3"
                        role="alert"
                      >
                        {exportError}
                      </div>
                    )}

                    <button
                      type="button"
                      className="btn btn-success"
                      onClick={handleDownloadPdf}
                      disabled={exporting}
                      title="Download your resume as a PDF"
                    >
                      {exporting ? (
                        <>
                          <span
                            className="spinner-border spinner-border-sm me-2"
                            role="status"
                            aria-hidden="true"
                          />
                          Preparing...
                        </>
                      ) : (
                        "Download PDF"
                      )}
                    </button>

                    <button
                      type="button"
                      className="btn btn-primary"
                      onClick={handleSaveResume}
                      disabled={saving}
                    >
                      {saving ? (
                        <>
                          <span
                            className="spinner-border spinner-border-sm me-2"
                            role="status"
                            aria-hidden="true"
                          />
                          Saving...
                        </>
                      ) : (
                        "Save Resume"
                      )}
                    </button>
                  </div>
                </div>

                <ResumePreview />
              </div>
            </section>

            {/* ================= RIGHT - DESKTOP CUSTOMIZE ================= */}
            <aside className="col-lg-3 bg-white border-start builder-desktop-customize">
              <div className="p-4 builder-pane builder-customize-pane">
                <h2 className="h5 fw-bold mb-4">
                  Customize
                </h2>

                <div className="mb-4">
                  <CustomizationPanel />
                </div>
              </div>
            </aside>
          </div>
        </div>

        {/* ================= MOBILE CUSTOMIZE DRAWER ================= */}
        {showMobileCustomize && (
          <div
            className="mobile-customize-overlay"
            onClick={() => setShowMobileCustomize(false)}
          >
            <aside
              className="mobile-customize-drawer"
              onClick={(event) => event.stopPropagation()}
            >
              <div className="mobile-customize-header">
                <h2 className="h5 fw-bold mb-0">
                  Customize
                </h2>

                <button
                  type="button"
                  className="btn-close"
                  aria-label="Close customization"
                  onClick={() =>
                    setShowMobileCustomize(false)
                  }
                />
              </div>

              <div className="mobile-customize-body">
                <CustomizationPanel />
              </div>
            </aside>
          </div>
        )}

        {/* Off-screen A4 resume copy used for PDF export */}
        <ResumePrintPortal />
      </main>
    </ProtectedRoute>
  );
}
