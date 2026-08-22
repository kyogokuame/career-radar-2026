import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://kyogokuame.github.io/career-radar-2026/"),
  title: "Career Radar | 2026 Job Dashboard",
  description: "Compare job opportunities, fit, commute, and application progress.",
  openGraph: {
    title: "Career Radar 2026–2035",
    description: "职位追踪、行业研究与跨境职业路线图",
    images: ["/career-radar-2026/og.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Career Radar 2026–2035",
    description: "职位追踪、行业研究与跨境职业路线图",
    images: ["/career-radar-2026/og.png"],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="zh-CN"><body>{children}</body></html>;
}
