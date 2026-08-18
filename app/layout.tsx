import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Career Radar | 2026 Job Dashboard",
  description: "Compare job opportunities, fit, commute, and application progress.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="zh-CN"><body>{children}</body></html>;
}
