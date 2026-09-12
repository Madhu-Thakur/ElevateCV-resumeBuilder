"use client";
import Navbar from "@/components/common/Navbar";
import ProtectedRoute from "@/components/auth/ProtectedRoute";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { useResume } from "@/context/ResumeContext";
import { getResumes, getResumeById, deleteResume } from "@/services/api";
import { mapBackendToResume } from "@/utils/dataMapper";

const TEMPLATE_NAMES = {
  classic: "Classic",
  "modern-sidebar": "Modern Sidebar",
  "minimal-ats": "Minimal ATS",
  compact: "Compact",
  creative: "Creative",
  executive: "Executive",
  grid: "Grid Layout",
  card: "Card Layout",
};

const formatDate = (value) => {
  if (!value) return "â€”";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "â€”";
  return date.toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

export default function MyResumes() {
  const router = useRouter();
  const { isAuthenticated, loading: authLoading } = useAuth();
  const { setResumeData, setCurrentResumeId, currentResumeId, resetResume } =
    useResume();

  const [resumes, setResumes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [listLoaded, setListLoaded] = useState(false);
  const [openingId, setOpeningId] = useState(null);
  const [deletingId, setDeletingId] = useState(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);
  const [actionMessage, setActionMessage] = useState(null);

  useEffect(() => {
    const loadResumes = async () => {
      if (!isAuthenticated) {
        setListLoaded(true);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const data = await getResumes();
        setResumes(Array.isArray(data?.resumes) ? data.resumes : []);
      } catch (err) {
        setError(err?.message || "Failed to load your resumes.");
      } finally {
        setLoading(false);
        setListLoaded(true);
      }
    };

    loadResumes();
  }, [isAuthenticated]);

  const handleOpenResume = async (resumeId) => {
    if (openingId) return;

    setOpeningId(resumeId);
    setError(null);

    try {
      const data = await getResumeById(resumeId);

      if (!data?.resume) {
        throw new Error("Resume not found.");
      }

      const mapped = mapBackendToResume(data.resume);

      setResumeData(mapped);
      setCurrentResumeId(resumeId);
      router.push("/builder");
    } catch (err) {
      setError(err?.message || "Failed to open this resume.");
      setOpeningId(null);
    }
  };

  const handleRequestDelete = (resumeId) => {
    if (deletingId) return;
    setConfirmDeleteId(resumeId);
  };

  const handleCancelDelete = () => {
    if (deletingId) return;
    setConfirmDeleteId(null);
  };

  const handleDeleteResume = async (resumeId) => {
    if (deletingId) return;

    setDeletingId(resumeId);
    setError(null);
    setActionMessage(null);

    try {
      await deleteResume(resumeId);
 
      setResumes((prev) => prev.filter((r) => (r?._id || r?.id) !== resumeId));
 
      if (resumeId === currentResumeId) {
        resetResume();
      }

      setActionMessage({
        type: "success",
        text: "Resume deleted successfully.",
      });
    } catch (err) {
      setActionMessage({
        type: "danger",
        text: err?.message || "Failed to delete this resume.",
      });
    } finally {
      setDeletingId(null);
      setConfirmDeleteId(null);
    }
  };

  return (
    <ProtectedRoute>
    <main className="min-vh-100 bg-body-tertiary">
      {/* Header */}
      <Navbar />

      <section className="py-5">
        <div className="container">
          {/* Page Title */}
          <div className="text-center mb-5">
            <h1 className="display-5 fw-bold text-dark mb-2">My Resumes</h1>
            <p className="lead text-secondary mb-0">
              Open a saved resume to continue editing it in the builder.
            </p>
          </div>

          {/* Unauthenticated state */}
          {!authLoading && !isAuthenticated && (
            <div className="row justify-content-center">
              <div className="col-lg-7">
                <div className="alert alert-info text-center" role="status">
                  <h2 className="h5 fw-semibold mb-2">Login Required</h2>
                  <p className="mb-3">
                    Please login to view and load your saved resumes.
                  </p>
                  <Link href="/mode" className="btn btn-primary fw-semibold px-4">
                    Go to Resume Builder
                  </Link>
                </div>
              </div>
            </div>
          )}

          {/* Error state */}
          {error && (
            <div className="row justify-content-center mb-4">
              <div className="col-lg-7">
                <div
                  className="alert alert-danger d-flex justify-content-between align-items-center mb-0"
                  role="alert"
                >
                  <span>{error}</span>
                  <button
                    type="button"
                    className="btn btn-sm btn-outline-danger"
                    onClick={() => setError(null)}
                  >
                    Dismiss
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Action feedback (delete success/error) */}
          {actionMessage && (
            <div className="row justify-content-center mb-4">
              <div className="col-lg-7">
                <div
                  className={`alert alert-${actionMessage.type} d-flex justify-content-between align-items-center mb-0`}
                  role="status"
                >
                  <span>{actionMessage.text}</span>
                  <button
                    type="button"
                    className="btn-close"
                    aria-label="Close"
                    onClick={() => setActionMessage(null)}
                  />
                </div>
              </div>
            </div>
          )}

          {/* Loading state */}
          {(loading || (!listLoaded && !error)) && (
            <div className="text-center py-5">
              <div
                className="spinner-border text-primary mb-3"
                role="status"
                aria-hidden="true"
              >
                <span className="visually-hidden">Loading...</span>
              </div>
              <p className="text-secondary">Loading your resumes...</p>
            </div>
          )}

          {/* Empty state */}
          {listLoaded && isAuthenticated && !loading && !error && resumes.length === 0 && (
            <div className="row justify-content-center">
              <div className="col-lg-7">
                <div className="card border-0 shadow-sm text-center p-5">
                  <div className="card-body">
                    <div className="display-4 mb-3" aria-hidden="true">📄</div>
                    <h2 className="h4 fw-bold mb-2">No Resumes Yet</h2>
                    <p className="text-secondary mb-4">
                      You have not saved any resumes. Start building one and
                      it will appear here.
                    </p>
                    <Link
                      href="/mode"
                      className="btn btn-primary btn-lg px-4 fw-semibold"
                    >
                      Start Building
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Resume list */}
          {listLoaded && isAuthenticated && !loading && resumes.length > 0 && (
            <div className="row g-4">
              {resumes.map((resume) => {
                const id = resume?._id || resume?.id;
                const isOpening = openingId === id;

                return (
                  <div className="col-12 col-md-6 col-lg-4" key={id}>
                    <div className="card h-100 border-0 shadow-sm">
                      <div className="card-body p-4 d-flex flex-column">
                        <h2 className="h5 fw-bold text-dark mb-2 text-truncate">
                          {resume?.title || "Untitled Resume"}
                        </h2>

                        <div className="mb-2">
                          <span className="badge rounded-pill bg-primary-subtle text-primary">
                            {TEMPLATE_NAMES[resume?.template] || "Classic"}
                          </span>
                        </div>

                        <small className="text-secondary mb-4">
                          Updated: {formatDate(resume?.updatedAt)}
                        </small>

                        <div className="mt-auto">
                          {confirmDeleteId === id ? (
                            <div className="alert alert-warning py-2 px-3 small mb-2">
                              <p className="mb-2 fw-semibold">
                                Delete this resume permanently?
                              </p>
                              <div className="d-flex gap-2">
                                <button
                                  type="button"
                                  className="btn btn-danger btn-sm flex-fill"
                                  onClick={() => handleDeleteResume(id)}
                                  disabled={deletingId !== null}
                                >
                                  {deletingId === id ? (
                                    <>
                                      <span
                                        className="spinner-border spinner-border-sm me-2"
                                        role="status"
                                        aria-hidden="true"
                                      />
                                      Deleting...
                                    </>
                                  ) : (
                                    "Yes, Delete"
                                  )}
                                </button>

                                <button
                                  type="button"
                                  className="btn btn-outline-secondary btn-sm flex-fill"
                                  onClick={handleCancelDelete}
                                  disabled={deletingId !== null}
                                >
                                  Cancel
                                </button>
                              </div>
                            </div>
                          ) : (
                            <div className="d-flex flex-column gap-2">
                              <button
                                type="button"
                                className="btn btn-primary fw-semibold"
                                onClick={() => handleOpenResume(id)}
                                disabled={openingId !== null || deletingId !== null}
                              >
                                {isOpening ? (
                                  <>
                                    <span
                                      className="spinner-border spinner-border-sm me-2"
                                      role="status"
                                      aria-hidden="true"
                                    />
                                    Opening...
                                  </>
                                ) : (
                                  "Open Resume"
                                )}
                              </button>

                              <button
                                type="button"
                                className="btn btn-outline-danger btn-sm"
                                onClick={() => handleRequestDelete(id)}
                                disabled={deletingId !== null || openingId !== null}
                              >
                                Delete
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </main>
    </ProtectedRoute>
  );
}

