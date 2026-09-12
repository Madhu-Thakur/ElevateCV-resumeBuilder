"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import Navbar from "@/components/common/Navbar";

export default function RegisterPage() {
  const router = useRouter();
  const { register } = useAuth();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [fieldErrors, setFieldErrors] = useState({});

  const validate = () => {
    const errors = {};

    if (!name.trim()) {
      errors.name = "Name is required";
    }

    if (!email.trim() || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email.trim())) {
      errors.email = "Valid email is required";
    }

    if (password.length < 6) {
      errors.password = "Password must be at least 6 characters";
    }

    if (confirmPassword !== password) {
      errors.confirmPassword = "Passwords do not match";
    }

    return errors;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (submitting) return;

    setError(null);

    const errors = validate();
    setFieldErrors(errors);

    if (Object.keys(errors).length > 0) {
      return;
    }

    setSubmitting(true);

    try {
    
      await register({ name: name.trim(), email: email.trim(), password });
      router.push("/login?registered=1");
    } catch (err) {
      setError(err?.message || "Registration failed. Please try again.");
      setSubmitting(false);
    }
  };

  return (
    <main className="min-vh-100 bg-body-tertiary d-flex flex-column">
      <Navbar />

      <section className="flex-grow-1 d-flex align-items-center py-5">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-12 col-md-8 col-lg-5">
              <div className="card border-0 shadow-sm">
                <div className="card-body p-4 p-md-5">
                  <h1 className="h3 fw-bold text-dark mb-1">Create account</h1>
                  <p className="text-secondary mb-4">
                    Register to save and manage your resumes.
                  </p>

                  {error && (
                    <div className="alert alert-danger py-2 small" role="alert">
                      {error}
                    </div>
                  )}

                  <form onSubmit={handleSubmit} noValidate>
                    <div className="mb-3">
                      <label htmlFor="register-name" className="form-label fw-semibold">
                        Name
                      </label>
                      <input
                        id="register-name"
                        type="text"
                        className={`form-control ${fieldErrors.name ? "is-invalid" : ""}`}
                        autoComplete="name"
                        value={name}
                        onChange={(event) => setName(event.target.value)}
                        disabled={submitting}
                        required
                      />
                      {fieldErrors.name && (
                        <div className="invalid-feedback">{fieldErrors.name}</div>
                      )}
                    </div>

                    <div className="mb-3">
                      <label htmlFor="register-email" className="form-label fw-semibold">
                        Email
                      </label>
                      <input
                        id="register-email"
                        type="email"
                        className={`form-control ${fieldErrors.email ? "is-invalid" : ""}`}
                        autoComplete="email"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                        disabled={submitting}
                        required
                      />
                      {fieldErrors.email && (
                        <div className="invalid-feedback">{fieldErrors.email}</div>
                      )}
                    </div>

                    <div className="mb-3">
                      <label htmlFor="register-password" className="form-label fw-semibold">
                        Password
                      </label>
                      <input
                        id="register-password"
                        type="password"
                        className={`form-control ${fieldErrors.password ? "is-invalid" : ""}`}
                        autoComplete="new-password"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                        disabled={submitting}
                        required
                      />
                      {fieldErrors.password && (
                        <div className="invalid-feedback">{fieldErrors.password}</div>
                      )}
                    </div>

                    <div className="mb-4">
                      <label htmlFor="register-confirm" className="form-label fw-semibold">
                        Confirm Password
                      </label>
                      <input
                        id="register-confirm"
                        type="password"
                        className={`form-control ${fieldErrors.confirmPassword ? "is-invalid" : ""}`}
                        autoComplete="new-password"
                        value={confirmPassword}
                        onChange={(event) => setConfirmPassword(event.target.value)}
                        disabled={submitting}
                        required
                      />
                      {fieldErrors.confirmPassword && (
                        <div className="invalid-feedback">
                          {fieldErrors.confirmPassword}
                        </div>
                      )}
                    </div>

                    <button
                      type="submit"
                      className="btn btn-primary w-100 fw-semibold"
                      disabled={submitting}
                    >
                      {submitting ? (
                        <>
                          <span
                            className="spinner-border spinner-border-sm me-2"
                            role="status"
                            aria-hidden="true"
                          />
                          Registering...
                        </>
                      ) : (
                        "Register"
                      )}
                    </button>
                  </form>

                  <p className="text-secondary small mt-4 mb-0 text-center">
                    Already have an account?{" "}
                    <Link href="/login" className="text-decoration-none fw-semibold">
                      Login
                    </Link>
                  </p>
                </div>
              </div>

              <p className="text-center mt-4 mb-0">
                <Link href="/" className="text-decoration-none text-secondary small">
                  &larr; Back to Home
                </Link>
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
