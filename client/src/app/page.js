"use client";
import Navbar from "@/components/common/Navbar";

import Link from "next/link";

export default function Home() {
  return (
    <main className="min-vh-100 bg-light">
      {/* Header */}
      <Navbar />

      {/* Hero Section */}
      <section className="py-5">
        <div className="container py-lg-5">
          <div className="row justify-content-center text-center">
            <div className="col-lg-9">
              <div className="mb-4">
                <span className="badge rounded-pill bg-primary-subtle text-primary px-3 py-2">
                  Professional Resume Builder
                </span>
              </div>

              <h1 className="display-3 fw-bold text-dark mb-4">
                Create a Resume That{" "}
                <span className="text-primary">Gets Noticed</span>
              </h1>

              <p className="lead text-secondary mx-auto mb-5">
                Build a professional, ATS-friendly resume in minutes with
                customizable templates, live preview, and intelligent
                suggestions.
              </p>

              <div className="d-flex justify-content-center gap-3 flex-wrap">
                <Link
                  href="/mode"
                  className="btn btn-primary btn-lg px-4 py-3 fw-semibold"
                >
                  Get Started
                  <span className="ms-2">→</span>
                </Link>

                <Link
                  href="/templates"
                  className="btn btn-outline-secondary btn-lg px-4 py-3 fw-semibold"
                >
                  View Templates
                </Link>
              </div>

              {/* Stats */}
              <div className="row mt-5 pt-4 justify-content-center">
                <div className="col-12 col-md-4 mb-4 mb-md-0">
                  <div className="fs-2 fw-bold text-primary">6+</div>
                  <div className="text-secondary">
                    Professional Templates
                  </div>
                </div>

                <div className="col-12 col-md-4 mb-4 mb-md-0">
                  <div className="fs-2 fw-bold text-primary">100%</div>
                  <div className="text-secondary">
                    ATS Compatible
                  </div>
                </div>

                <div className="col-12 col-md-4">
                  <div className="fs-2 fw-bold text-primary">5 Min</div>
                  <div className="text-secondary">
                    Resume Creation
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Product Preview */}
          <div className="row justify-content-center mt-5 pt-lg-4">
            <div className="col-lg-9">
              <div className="card border-0 shadow-lg overflow-hidden">
                <div className="card-header bg-white border-bottom py-3">
                  <div className="d-flex gap-2">
                    <span className="rounded-circle bg-danger" style={{ width: 10, height: 10 }} />
                    <span className="rounded-circle bg-warning" style={{ width: 10, height: 10 }} />
                    <span className="rounded-circle bg-success" style={{ width: 10, height: 10 }} />
                  </div>
                </div>

                <div className="card-body p-4 p-md-5 bg-body-tertiary">
                  <div className="row g-4">
                    <div className="col-md-4">
                      <div className="card h-100 border-0 shadow-sm">
                        <div className="card-body">
                          <div className="placeholder-glow">
                            <span className="placeholder col-8 mb-3" />
                            <span className="placeholder col-12 mb-2" />
                            <span className="placeholder col-10 mb-4" />

                            <span className="placeholder col-6 mb-2" />
                            <span className="placeholder col-12 mb-2" />
                            <span className="placeholder col-9 mb-2" />
                            <span className="placeholder col-11" />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="col-md-8">
                      <div className="bg-white shadow-sm p-4 h-100">
                        <div className="border-bottom pb-3 mb-3">
                          <div className="placeholder-glow">
                            <span className="placeholder col-5" />
                            <span className="placeholder col-8 mt-2" />
                          </div>
                        </div>

                        <div className="placeholder-glow">
                          <span className="placeholder col-3 mb-3" />
                          <span className="placeholder col-12 mb-2" />
                          <span className="placeholder col-10 mb-2" />
                          <span className="placeholder col-11 mb-4" />

                          <span className="placeholder col-3 mb-3" />
                          <span className="placeholder col-12 mb-2" />
                          <span className="placeholder col-9 mb-2" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="py-5 bg-white border-top">
        <div className="container py-4 text-center">
          <h2 className="fw-bold mb-3">
            Ready to Elevate Your Career?
          </h2>

          <p className="text-secondary mb-4">
            Create your professional resume and take the next step
            in your career.
          </p>

          <Link
            href="/mode"
            className="btn btn-primary btn-lg px-4 fw-semibold"
          >
            Start Building Your Resume
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-dark text-white py-4">
        <div className="container text-center">
          <small className="text-white-50">
            © {new Date().getFullYear()} Resume Builder. All rights reserved.
          </small>
        </div>
      </footer>
    </main>
  );
}