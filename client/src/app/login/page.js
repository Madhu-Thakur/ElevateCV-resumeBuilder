"use client";

import { Suspense, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import Navbar from "@/components/common/Navbar";

/* Only allow internal redirect paths starting with a single slash. */
const getSafeRedirect = (value) => {
  if (typeof value === "string" && value.startsWith("/") && !value.startsWith("//")) {
    return value;
  }

  return "/resumes";
};

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
    const { login, isAuthenticated, loading: authLoading } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

    const registered = searchParams.get("registered") === "1";
  const redirectTo = getSafeRedirect(searchParams.get("redirect"));
 
  useEffect(() => {
    if (authLoading || submitting) return;
    if (!isAuthenticated) return;
    router.replace(redirectTo);
  }, [isAuthenticated, authLoading, submitting, redirectTo, router]);

  if (authLoading) {
    return (
      <div className="text-center py-5">
        <div className="spinner-border text-primary mb-3" role="status">
          <span className="visually-hidden">Loading…</span>
        </div>
        <p className="text-secondary mb-0">Checking your session…</p>
      </div>
    );
  }

  if (isAuthenticated) {
   
    return (
      <div className="text-center py-5">
        <div className="spinner-border text-primary mb-3" role="status">
          <span className="visually-hidden">Redirecting…</span>
        </div>
        <p className="text-secondary mb-0">Redirecting to your resumes…</p>
      </div>
    );
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (submitting) return;

    setError(null);

    if (!email.trim() || !password) {
      setError("Please enter your email and password.");
      return;
    }

    setSubmitting(true);

    try {
      await login({ email: email.trim(), password });
      router.push(redirectTo);
    } catch (err) {
      setError(err?.message || "Login failed. Please try again.");
      setSubmitting(false);
    }
  };


  return (
    <div className="row justify-content-center">
      <div className="col-12 col-md-8 col-lg-5">
        <div className="card border-0 shadow-sm">
          <div className="card-body p-4 p-md-5">
            <h1 className="h3 fw-bold text-dark mb-1">Welcome back</h1>
            <p className="text-secondary mb-4">
              Login to continue building your resume.
            </p>

            {registered && (
              <div className="alert alert-success py-2 small" role="status">
                Registration successful. Please login to continue.
              </div>
            )}

            {error && (
              <div className="alert alert-danger py-2 small" role="alert">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} noValidate>
              <div className="mb-3">
                <label htmlFor="login-email" className="form-label fw-semibold">
                  Email
                </label>
                <input
                  id="login-email"
                  type="email"
                  className="form-control"
                  autoComplete="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  disabled={submitting}
                  required
                />
              </div>

              <div className="mb-4">
                <label htmlFor="login-password" className="form-label fw-semibold">
                  Password
                </label>
                <input
                  id="login-password"
                  type="password"
                  className="form-control"
                  autoComplete="current-password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  disabled={submitting}
                  required
                />
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
                    Logging in...
                  </>
                ) : (
                  "Login"
                )}
              </button>
            </form>

            <p className="text-secondary small mt-4 mb-0 text-center">
              Don&apos;t have an account?{" "}
              <Link href="/register" className="text-decoration-none fw-semibold">
                Register
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
  );
}

export default function LoginPage() {
  return (
    <main className="min-vh-100 bg-body-tertiary d-flex flex-column">
      <Navbar />

      <section className="flex-grow-1 d-flex align-items-center py-5">
        <div className="container">
          <Suspense
            fallback={
              <div className="text-center py-5">
                <div className="spinner-border text-primary" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </div>
            }
          >
            <LoginForm />
          </Suspense>
        </div>
      </section>
    </main>
  );
}
