"use client";

type SiteNavProps = {
  active: "dashboard" | "research" | "scanner";
};

export default function SiteNav({ active }: SiteNavProps) {
  const dashboardHref = active === "dashboard" ? "./" : "../";
  const researchHref = active === "research" ? "./" : active === "dashboard" ? "./research/" : "../research/";
  const scannerHref = active === "scanner" ? "./" : active === "dashboard" ? "./scan/" : "../scan/";

  return (
    <nav className="site-nav" aria-label="页面导航">
      <a className="site-brand" href={dashboardHref}>
        <span className="brand-mark">CR</span>
        <span><b>Career Radar</b><small>2026–2035</small></span>
      </a>
      <div className="site-tabs" aria-label="页面切换">
        <a className={active === "dashboard" ? "current" : ""} href={dashboardHref}>职位雷达</a>
        <a className={active === "research" ? "current" : ""} href={researchHref}>职业研究</a>
        <a className={active === "scanner" ? "current" : ""} href={scannerHref}>职位扫描</a>
      </div>
    </nav>
  );
}
