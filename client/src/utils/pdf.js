 
export const getPdfFileName = (title) => {
  const cleaned = (title || "")
    .trim()
    .replace(/[\\/:*?"<>|]/g, "") // strip invalid filename chars
    .replace(/\s+/g, "-") // spaces -> dashes
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");

  return `${cleaned || "Resume"}.pdf`;
};
