"use client";

import { useRouter } from "next/navigation";
import { useResume } from "@/context/ResumeContext";
import Navbar from "@/components/common/Navbar";

export default function ModeSelection() {
  const router = useRouter();
  const { setMode } = useResume();

  const handleModeSelect = (mode) => {
    setMode(mode);
    router.push("/builder");
  };

  return (
    <main className="min-vh-100 bg-body-tertiary">
      <Navbar />

      {/* Main Content */}
      <section className="d-flex align-items-center py-5">
        <div className="container">
          <div className="text-center mx-auto" style={{ maxWidth: "1000px" }}>
            <h1 className="display-5 fw-bold text-dark mb-3">
              Choose Your Resume Type
            </h1>

            <p className="lead text-secondary mx-auto mb-5" style={{ maxWidth: "700px" }}>
              Select the resume style that best fits your experience level
              and career goals. Both options include all the features you
              need to create a professional resume.
            </p>

            {/* Mode Cards */}
            <div className="row g-4 justify-content-center">
              {/* Fresher */}
              <div className="col-md-6">
                <div
                  role="button"
                  tabIndex={0}
                  onClick={() => handleModeSelect("fresher")}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleModeSelect("fresher");
                    }
                  }}
                  className="card h-100 border-0 shadow-sm p-4 p-lg-5"
                >
                  <div className="card-body text-center">
                    <div className="mx-auto mb-4 rounded-circle bg-primary d-flex align-items-center justify-content-center"
                      style={{ width: "72px", height: "72px" }}
                    >
                      <span className="fs-2 text-white">🎓</span>
                    </div>

                    <h2 className="h3 fw-bold mb-3">
                      Fresher
                    </h2>

                    <p className="text-secondary mb-4">
                      Perfect for students, recent graduates, and
                      candidates starting their professional career.
                    </p>

                    <div className="text-start">
                      <Feature text="Education-focused layout" />
                      <Feature text="Projects and skills emphasis" />
                      <Feature text="Simple professional structure" />
                    </div>

                    <button
                      type="button"
                      className="btn btn-primary mt-4 px-4"
                      onClick={() => handleModeSelect("fresher")}
                    >
                      Create Fresher Resume
                    </button>
                  </div>
                </div>
              </div>

              {/* Experienced */}
              <div className="col-md-6">
                <div
                  role="button"
                  tabIndex={0}
                  onClick={() => handleModeSelect("experienced")}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleModeSelect("experienced");
                    }
                  }}
                  className="card h-100 border-0 shadow-sm p-4 p-lg-5"
                >
                  <div className="card-body text-center">
                    <div
                      className="mx-auto mb-4 rounded-circle bg-dark d-flex align-items-center justify-content-center"
                      style={{ width: "72px", height: "72px" }}
                    >
                      <span className="fs-2 text-white">💼</span>
                    </div>

                    <h2 className="h3 fw-bold mb-3">
                      Experienced
                    </h2>

                    <p className="text-secondary mb-4">
                      Designed for professionals with work experience
                      who want to highlight their career achievements.
                    </p>

                    <div className="text-start">
                      <Feature text="Experience-focused layout" />
                      <Feature text="Career achievements emphasis" />
                      <Feature text="Professional experience sections" />
                    </div>

                    <button
                      type="button"
                      className="btn btn-dark mt-4 px-4"
                      onClick={() => handleModeSelect("experienced")}
                    >
                      Create Experienced Resume
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Benefits */}
            <div className="row g-4 mt-5 pt-3">
              <Benefit
                icon="⚡"
                title="Quick Setup"
                description="Create your resume in under 5 minutes"
              />

              <Benefit
                icon="❤️"
                title="Professional Design"
                description="Beautiful, modern templates that impress"
              />
            </div>

            {/* CTA */}
            <div className="mt-5">
              <button
                type="button"
                onClick={() => handleModeSelect("fresher")}
                className="btn btn-primary btn-lg px-5 py-3 fw-semibold"
              >
                Get Started - It&apos;s Free
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

function Feature({ text }) {
  return (
    <div className="d-flex align-items-center gap-2 mb-2">
      <span className="text-success fw-bold">✓</span>
      <span className="text-secondary">{text}</span>
    </div>
  );
}

function Benefit({ icon, title, description }) {
  return (
    <div className="col-md-6">
      <div className="bg-white rounded-4 border p-4 h-100">
        <div
          className="mx-auto mb-3 rounded-3 bg-light d-flex align-items-center justify-content-center"
          style={{ width: "48px", height: "48px" }}
        >
          <span className="fs-4">{icon}</span>
        </div>

        <h3 className="h5 fw-semibold mb-2">{title}</h3>

        <p className="small text-secondary mb-0">
          {description}
        </p>
      </div>
    </div>
  );
}