import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { ResumeProvider } from "@/context/ResumeContext";
import { AuthProvider } from "@/context/AuthContext";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Resume Builder",
  description: "Build your professional resume.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body>
  <AuthProvider>
  <ResumeProvider>
    {children}
  </ResumeProvider>
</AuthProvider>
</body>
    </html>
  );
}
