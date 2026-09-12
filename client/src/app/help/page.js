"use client";
import Navbar from "@/components/common/Navbar";

import { useState } from "react";
import Link from "next/link";

const faqs = [
  {
    question: "How do I create a resume?",
    answer:
      "Start by clicking 'Get Started' on the homepage, then choose between 'Wizard Mode' for guided creation or 'Manual Mode' for full control. Fill in your information section by section, and your resume will update in real-time.",
    category: "Getting Started",
  },
  {
    question: "What is ATS compatibility?",
    answer:
      "ATS (Applicant Tracking System) compatibility means your resume is formatted to pass through automated screening software used by employers. Our templates and AI suggestions ensure your resume gets seen by human eyes.",
    category: "Technical",
  },
  {
    question: "How do I change templates?",
    answer:
      "Click 'Templates' from any page to browse our template gallery. Select a template to apply it to your current resume, or start fresh with a new template from the homepage.",
    category: "Customization",
  },
  {
    question: "Can I reorder sections in my resume?",
    answer:
      "Yes! In the Builder view, click 'Customize Layout' in the left sidebar, then drag and drop sections to reorder them. Your changes will be reflected immediately in the preview.",
    category: "Customization",
  },
  {
    question: "How do I download my resume?",
    answer:
      "Once your resume is complete, click the 'Download PDF' button in the left sidebar. Your resume will be generated as a high-quality PDF file ready for printing or sharing.",
    category: "Export",
  },
  {
    question: "What makes a good resume summary?",
    answer:
      "A strong summary should be 2-3 sentences highlighting your key skills, years of experience, and career goals. Focus on what you can offer employers rather than what you want from a job.",
    category: "Content Tips",
  },
  {
    question: "How many skills should I include?",
    answer:
      "Aim for 6-10 relevant skills that match the job description. Include a mix of technical skills (software, tools) and soft skills (communication, leadership). Prioritize quality over quantity.",
    category: "Content Tips",
  },
  {
    question: "Can I add custom sections?",
    answer:
      "Yes! In the Builder view, you can add additional sections like Certifications, Languages, Interests, and Achievements. These help showcase your unique qualifications and personality.",
    category: "Customization",
  },
];

const tips = [
  {
    title: "Resume Length",
    description:
      "Keep your resume to 1-2 pages maximum. Focus on the most relevant experience and skills for the position you're applying for.",
    icon: "📄",
  },
  {
    title: "Keywords",
    description:
      "Use keywords from the job description throughout your resume. This helps both ATS systems and hiring managers see your qualifications.",
    icon: "🔑",
  },
  {
    title: "Action Verbs",
    description:
      "Start bullet points with strong action verbs like 'Managed', 'Created', 'Improved', or 'Led' to make your accomplishments stand out.",
    icon: "💪",
  },
  {
    title: "Quantify Achievements",
    description:
      "Use numbers and metrics whenever possible. Instead of 'Improved sales', say 'Increased sales by 25% in 6 months'.",
    icon: "📊",
  },
  {
    title: "Proofread Carefully",
    description:
      "Always review your resume for spelling and grammar errors. Consider asking a friend to review it as well.",
    icon: "👀",
  },
  {
    title: "Tailor for Each Job",
    description:
      "Customize your resume for each position by emphasizing the most relevant skills and experiences.",
    icon: "🎯",
  },
];

const supportLinks = [
  {
    title: "Video Tutorials",
    description: "Watch step-by-step video guides on creating the perfect resume.",
    icon: "🎥",
    action: "Watch Videos",
  },
  {
    title: "Template Gallery",
    description: "Explore all available resume templates and see examples.",
    icon: "🖼️",
    action: "Browse Templates",
    href: "/templates",
  },
  {
    title: "Contact Support",
    description: "Get help from our support team for any questions or issues.",
    icon: "📧",
    action: "Contact Us",
  },
];

export default function Help() {
  const [query, setQuery] = useState("");

  const visibleFaqs = faqs.filter(
    (faq) =>
      !query.trim() ||
      faq.question.toLowerCase().includes(query.toLowerCase()) ||
      faq.answer.toLowerCase().includes(query.toLowerCase()) ||
      faq.category.toLowerCase().includes(query.toLowerCase())
  );

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
                Need Help?{" "}
                <span className="text-primary">We&apos;ve Got You Covered</span>
              </h1>
              <p className="lead text-secondary mx-auto mb-5">
                Find answers to common questions, get resume writing tips, and
                learn how to make the most of Resume Builder.
              </p>

              <div className="d-flex justify-content-center gap-3 flex-wrap">
                <Link href="/mode" className="btn btn-primary btn-lg px-4 py-3 fw-semibold">
                  Start Building Resume
                </Link>
                <Link
                  href="/templates"
                  className="btn btn-outline-secondary btn-lg px-4 py-3 fw-semibold"
                >
                  Browse Templates
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Search Bar */}
      <section className="pb-4">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-7">
              <div className="card border-0 shadow-sm rounded-4">
                <div className="card-body p-4">
                  <h3 className="h6 fw-semibold text-dark mb-3">
                    Search Help Articles
                  </h3>
                  <form className="d-flex gap-2" onSubmit={(e) => e.preventDefault()}>
                    <input
                      type="text"
                      className="form-control py-2"
                      placeholder="Type your question here..."
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                    />
                    <button type="submit" className="btn btn-primary px-4 fw-medium">
                      Search
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-5">
        <div className="container py-4">
          <div className="text-center mb-5">
            <h2 className="fw-bold text-dark mb-3">Frequently Asked Questions</h2>
            <p className="text-secondary">
              Find answers to the most common questions about using Resume
              Builder.
            </p>
          </div>

          <div className="row justify-content-center g-4">
            {visibleFaqs.length === 0 ? (
              <div className="col-lg-8">
                <div className="alert alert-info mb-0 text-center">
                  No matching questions found. Try a different search term.
                </div>
              </div>
            ) : (
              visibleFaqs.map((faq, index) => (
                <div className="col-lg-8" key={index}>
                  <div className="card h-100 border-0 shadow-sm rounded-4 help-card">
                    <div className="card-body p-4">
                      <span className="badge rounded-pill bg-primary-subtle text-primary px-3 py-2 mb-3">
                        {faq.category}
                      </span>
                      <h3 className="h6 fw-semibold text-dark mb-2">{faq.question}</h3>
                      <p className="text-secondary mb-0">{faq.answer}</p>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </section>

      {/* Resume Tips Section */}
      <section className="py-5 bg-white border-top">
        <div className="container py-4">
          <div className="text-center mb-5">
            <h2 className="fw-bold text-dark mb-3">Resume Writing Tips</h2>
            <p className="text-secondary">
              Expert advice to help you create a standout resume.
            </p>
          </div>

          <div className="row g-4">
            {tips.map((tip, index) => (
              <div className="col-12 col-md-6 col-lg-4" key={index}>
                <div className="card h-100 border-0 shadow-sm rounded-4 help-card">
                  <div className="card-body p-4">
                    <div className="fs-2 mb-3">{tip.icon}</div>
                    <h3 className="h6 fw-semibold text-dark mb-2">{tip.title}</h3>
                    <p className="text-secondary mb-0">{tip.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Support Links */}
      <section className="py-5">
        <div className="container py-4">
          <div className="text-center mb-5">
            <h2 className="fw-bold text-dark mb-3">Additional Support</h2>
            <p className="text-secondary">
              Explore more resources to help you succeed.
            </p>
          </div>

          <div className="row justify-content-center g-4">
            {supportLinks.map((link, index) => {
              const cardInner = (
                <div className="card h-100 border-0 shadow-sm rounded-4 text-center help-card">
                  <div className="card-body p-4 p-lg-5 d-flex flex-column">
                    <div className="fs-2 mb-3">{link.icon}</div>
                    <h3 className="h6 fw-semibold text-dark mb-2">{link.title}</h3>
                    <p className="text-secondary mb-4">{link.description}</p>
                    <span className="btn btn-primary mt-auto fw-medium">
                      {link.action}
                    </span>
                  </div>
                </div>
              );

              return (
                <div className="col-12 col-md-4" key={index}>
                  {link.href ? (
                    <Link href={link.href} className="text-decoration-none h-100 d-block">
                      {cardInner}
                    </Link>
                  ) : (
                    cardInner
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-5 bg-primary">
        <div className="container py-4 text-center">
          <h2 className="fw-bold text-white mb-3">Still Need Help?</h2>
          <p className="text-white-50 mb-4 mx-auto" style={{ maxWidth: 640 }}>
            Our team is here to help you create the perfect resume. Whether you
            have questions about features, need template recommendations, or want
            resume writing advice, we&apos;re just a message away.
          </p>

          <div className="d-flex justify-content-center gap-3 flex-wrap">
            <Link
              href="/mode"
              className="btn btn-light btn-lg px-4 py-3 fw-semibold text-primary"
            >
              Start Building Now
            </Link>
            <button type="button" className="btn btn-outline-light btn-lg px-4 py-3 fw-semibold">
              Contact Support
            </button>
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

