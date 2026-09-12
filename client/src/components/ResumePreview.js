"use client";

import { useResume } from "@/context/ResumeContext";
import { getFontScale } from "@/utils/customization";

import ClassicTemplate from "@/components/templates/ClassicTemplate";
import ModernSidebarTemplate from "@/components/templates/ModernSidebarTemplate";
import MinimalATSTemplate from "@/components/templates/MinimalATSTemplate";
import CompactTemplate from "@/components/templates/CompactTemplate";
import CreativeTemplate from "@/components/templates/CreativeTemplate";
import ExecutiveTemplate from "@/components/templates/ExecutiveTemplate";
import GridLayoutTemplate from "@/components/templates/GridLayoutTemplate";
import CardLayoutTemplate from "@/components/templates/CardLayoutTemplate";

const templates = {
  classic: ClassicTemplate,
  "modern-sidebar": ModernSidebarTemplate,
  "minimal-ats": MinimalATSTemplate,
  compact: CompactTemplate,
  creative: CreativeTemplate,
  executive: ExecutiveTemplate,
  grid: GridLayoutTemplate,
  card: CardLayoutTemplate,
};

export default function ResumePreview() {
  const { resumeData } = useResume();

  const selectedTemplate = resumeData?.template || "classic";

  const TemplateComponent =
    templates[selectedTemplate] || ClassicTemplate;
 
  const fontScale = getFontScale(resumeData?.typography?.fontSize);

  return (
    <div className="w-100" style={fontScale !== 1 ? { zoom: fontScale } : undefined}>
      <TemplateComponent resumeData={resumeData} />
    </div>
  );
}