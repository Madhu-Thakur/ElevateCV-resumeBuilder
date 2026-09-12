"use client";
import Navbar from "@/components/common/Navbar";

import Link from "next/link";

const features = [
  {
    title: "AI-Powered Resume Enhancement",
    description:
      "Leverage advanced AI to optimize your resume content, suggest improvements, and ensure ATS compatibility.",
    icon: "🤖",
    tone: "primary",
    highlights: [
      "Smart content suggestions",
      "ATS optimization",
      "Professional language enhancement",
      "Keyword optimization",
    ],
  },
  {
    title: "Live Preview & Synchronization",
    description:
      "See your resume updates in real-time as you make changes, ensuring perfect formatting and layout.",
    icon: "👁️",
    tone: "info",
    highlights: [
      "Real-time preview updates",
      "Instant formatting feedback",
      "Live section reordering",
      "Typography preview",
    ],
  },
  {
    title: "Professional Templates",
    description:
      "Choose from 8 professionally designed templates that are modern, clean, and industry-standard.",
    icon: "🎨",
    tone: "success",
    highlights: [
      "8 premium templates",
      "Industry-specific designs",
      "Responsive layouts",
      "Print-ready formats",
    ],
  },
  {
    title: "Smart Section Management",
    description:
      "Easily add, remove, and reorder resume sections with intuitive controls.",
    icon: "🔧",
    tone: "warning",
    highlights: [
      "Drag-and-drop reordering",
      "Customizable sections",
      "Smart section suggestions",
      "Flexible layout options",
    ],
  },
  {
    title: "Color & Typography Control",
    description:
      "Personalize your resume with extensive color palette options and typography settings.",
    icon: "🌈",
    tone: "secondary",
    highlights: [
      "10+ color palettes",
      "Multiple font options",
      "Customizable spacing",
      "Professional styling",
    ],
  },
  {
    title: "Resume Scoring System",
    description:
      "Get instant feedback on your resume quality with our comprehensive scoring algorithm.",
    icon: "📊",
    tone: "danger",
    highlights: [
      "Content quality scoring",
      "Formatting analysis",
      "ATS compatibility check",
      "Professional recommendations",
    ],
  },
  {
    title: "Export & Sharing",
    description:
      "Download your resume in multiple formats and share it easily with employers and recruiters.",
    icon: "📤",
    tone: "dark",
    highlights: [
      "PDF export",
      "High-quality formatting",
      "Print-ready output",
      "Easy sharing options",
    ],
  },
  {
    title: "Progress Tracking",
    description:
      "Monitor your resume completion progress with visual indicators and helpful guidance.",
    icon: "📈",
    tone: "primary",
    highlights: [
      "Completion percentage",
      "Section progress tracking",
      "Guided completion flow",
      "Motivational feedback",
    ],
  },
];

const benefits = [
  {
    title: "Save Time",
    description: "Create a professional resume in minutes, not hours.",
    icon: "⏱️",
  },
  {
    title: "Increase Chances",
    description: "ATS-optimized resumes that pass automated screening.",
    icon: "🎯",
  },
  {
    title: "Professional Quality",
    description: "Templates designed by professional resume experts.",
    icon: "⭐",
  },
  {
    title: "Easy to Use",
    description: "Intuitive interface that anyone can master quickly.",
    icon: "😊",
  },
];

export default function Features() {
  return (
    <main className="min-vh-100 bg-light">
      {/* Header */}
      <Navbar />

      {/* Hero Section */}
      <section className="py-5">
        <div className="container py-lg-4 text-center">
          <div className="row justify-content-center">
            <div className="col-lg-9">
              <h1 className="display-4 fw-bold text-dark mb-4">
                Powerful Features for{" "}
                <span className="text-primary">Your Perfect Resume</span>
              </h1>
              <p className="lead text-secondary mx-auto mb-5">
                Everything you need to create a standout resume that gets noticed
                by employers and passes automated screening systems.
              </p>

              <div className="d-flex justify-content-center gap-3 flex-wrap">
                <Link href="/mode" className="btn btn-primary btn-lg px-4 py-3 fw-semibold">
                  Get Started Now
                </Link>
                <Link
                  href="/templates"
                  className="btn btn-outline-secondary btn-lg px-4 py-3 fw-semibold"
                >
                  View Templates
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-5 bg-white border-top">
        <div className="container py-4">
          <div className="row g-4">
            {features.map((feature, index) => (
              <div className="col-12 col-lg-6" key={index}>
                <div className="card h-100 border-0 shadow-sm rounded-4 feature-card">
                  <div className="card-body p-4 p-lg-5 d-flex gap-4">
                    <div
                      className={`d-flex align-items-center justify-content-center flex-shrink-0 rounded-4 shadow-sm bg-${feature.tone}-subtle`}
                      style={{ width: 64, height: 64, fontSize: "1.75rem" }}
                    >
                      {feature.icon}
                    </div>

                    <div>
                      <h3 className="h5 fw-bold text-dark mb-3">{feature.title}</h3>
                      <p className="text-secondary mb-4">{feature.description}</p>

                      <div className="row g-2">
                        {feature.highlights.map((highlight, hIndex) => (
                          <div className="col-12 col-md-6" key={hIndex}>
                            <div className="d-flex align-items-center gap-2 small text-dark">
                              <span
                                className="rounded-circle bg-primary flex-shrink-0"
                                style={{ width: 8, height: 8 }}
                              />
                              <span>{highlight}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-5">
        <div className="container py-4">
          <div className="text-center mb-5">
            <h2 className="fw-bold text-dark mb-3">Why Choose Resume Builder?</h2>
            <p className="text-secondary">
              Experience the difference with our comprehensive resume building
              platform.
            </p>
          </div>

          <div className="row g-4">
            {benefits.map((benefit, index) => (
              <div className="col-12 col-md-3 text-center" key={index}>
                <div
                  className="d-flex align-items-center justify-content-center rounded-circle bg-primary-subtle mx-auto mb-3"
                  style={{ width: 64, height: 64, fontSize: "1.75rem" }}
                >
                  {benefit.icon}
                </div>
                <h4 className="h6 fw-semibold text-dark mb-2">{benefit.title}</h4>
                <p className="text-secondary small mb-0">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-5 bg-primary">
        <div className="container py-4 text-center">
          <h2 className="fw-bold text-white mb-3">Ready to Elevate Your Resume?</h2>
          <p className="text-white-50 mb-4 mx-auto" style={{ maxWidth: 640 }}>
            Join thousands of professionals who have already created their perfect
            resume with our powerful tools and templates.
          </p>

          <div className="d-flex justify-content-center gap-3 flex-wrap">
            <Link
              href="/mode"
              className="btn btn-light btn-lg px-4 py-3 fw-semibold text-primary"
            >
              Start Building Now
            </Link>
            <Link
              href="/templates"
              className="btn btn-outline-light btn-lg px-4 py-3 fw-semibold"
            >
              Browse Templates
            </Link>
          </div>
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

