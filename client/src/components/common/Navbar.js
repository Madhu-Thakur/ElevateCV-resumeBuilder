"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
 
export default function Navbar({
  showCustomizeButton = false,
  onCustomizeClick,
}) {
  const router = useRouter();
  const { isAuthenticated, user, logout } = useAuth();

  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const handleLogout = () => {
    setShowMobileMenu(false);
    logout();
    router.push("/");
  };

  const closeMobileMenu = () => {
    setShowMobileMenu(false);
  };

  return (
    <header className="bg-white border-bottom shadow-sm position-relative">
      <nav className="container py-3">
        <div className="d-flex justify-content-between align-items-center">
          {/* Left side */}
          <div className="d-flex align-items-center gap-2">
            {/* Mobile Hamburger */}
            <button
              type="button"
              className="navbar-mobile-menu-btn"
              onClick={() =>
                setShowMobileMenu((previous) => !previous)
              }
              aria-label="Toggle navigation menu"
              aria-expanded={showMobileMenu}
            >
              <span />
              <span />
              <span />
            </button>

            {/* Logo */}
            <Link
              href="/"
              className="text-decoration-none fw-bold fs-4 text-dark"
              onClick={closeMobileMenu}
            >
              ElevateCV
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="navbar-desktop-nav d-flex align-items-center gap-3 flex-wrap">
            <Link href="/features" className="navbar-link">
              Features
            </Link>

            <Link href="/templates" className="navbar-link">
              Templates
            </Link>

            <Link href="/help" className="navbar-link">
              Help
            </Link>

            {isAuthenticated ? (
              <>
                <Link href="/resumes" className="navbar-link">
                  My Resumes
                </Link>

                {user?.name && (
                  <span className="text-secondary small">
                    Hi, {user.name}
                  </span>
                )}

                <button
                  type="button"
                  className="btn btn-outline-secondary btn-sm"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link href="/login" className="navbar-link">
                  Login
                </Link>

                <Link
                  href="/register"
                  className="btn btn-primary btn-sm"
                >
                  Register
                </Link>
              </>
            )}
          </div>

          {/* Mobile Customize */}
          {showCustomizeButton && (
            <button
              type="button"
              className="navbar-customize-btn"
              onClick={onCustomizeClick}
              aria-label="Open customization"
              title="Customize"
            >
              ⚙
            </button>
          )}
        </div>
      </nav>

      {/* ================= MOBILE MENU ================= */}
      {showMobileMenu && (
        <div className="navbar-mobile-menu">
          <div className="container py-3">
            <div className="d-flex flex-column gap-2">
              <Link
                href="/features"
                className="navbar-mobile-link"
                onClick={closeMobileMenu}
              >
                Features
              </Link>

              <Link
                href="/templates"
                className="navbar-mobile-link"
                onClick={closeMobileMenu}
              >
                Templates
              </Link>

              <Link
                href="/help"
                className="navbar-mobile-link"
                onClick={closeMobileMenu}
              >
                Help
              </Link>

              {isAuthenticated ? (
                <>
                  <Link
                    href="/resumes"
                    className="navbar-mobile-link"
                    onClick={closeMobileMenu}
                  >
                    My Resumes
                  </Link>

                  {user?.name && (
                    <div className="navbar-mobile-user">
                      Hi, {user.name}
                    </div>
                  )}

                  <button
                    type="button"
                    className="btn btn-outline-secondary btn-sm align-self-start"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href="/login"
                    className="navbar-mobile-link"
                    onClick={closeMobileMenu}
                  >
                    Login
                  </Link>

                  <Link
                    href="/register"
                    className="btn btn-primary btn-sm align-self-start"
                    onClick={closeMobileMenu}
                  >
                    Register
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}