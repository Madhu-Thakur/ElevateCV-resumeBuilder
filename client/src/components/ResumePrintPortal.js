"use client";

import { useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import ResumePreview from "@/components/ResumePreview";
 
export default function ResumePrintPortal() {
 
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );

  if (!mounted) return null;

  return createPortal(
    <div className="resume-print-portal" aria-hidden="true">
      <ResumePreview />
    </div>,
    document.body
  );
}
