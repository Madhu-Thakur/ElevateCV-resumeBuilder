"use client";

import { useEffect, useRef } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
 
export default function ProtectedRoute({ children }) {
  const router = useRouter();
  const pathname = usePathname();
  const { isAuthenticated, loading } = useAuth();
  const redirectedRef = useRef(false);

  useEffect(() => {
    
    if (loading) return;
 
    if (isAuthenticated || redirectedRef.current) return;
 
    redirectedRef.current = true;
    const redirect = encodeURIComponent(pathname || "/");
    router.replace(`/login?redirect=${redirect}`);
  }, [loading, isAuthenticated, pathname, router]);

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center min-vh-100 bg-body-tertiary">
        <div className="text-center">
          <div
            className="spinner-border text-primary mb-3"
            role="status"
            aria-hidden="true"
          >
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="text-secondary mb-0">Loading your workspace...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return children;
}