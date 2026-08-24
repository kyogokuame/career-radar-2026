"use client";

import { useState } from "react";
import SiteNav from "./SiteNav";
import { candidates, detailsFor, existingRadarKeys, mapsDirectionsUrl, stageFor, workplaceSignalFor, type Candidate, type CandidateStage, type Track } from "./scanner-data";
import "./scanner.css";
import "./scanner-enhancements.css";

const adoptedKey = "career-radar-adopted";
const declinedKey = "career-radar-declined";
const load = (key: string) => {
  if (typeof window === "undefined") return [] as string[];
  try { return JSON.parse(localStorage.getItem(key) ?? "[]") as string[]; } catch { return []; }
};
const candidateKey = (candidate: Candidate) => `${candidate.company}|${candidate.title}`.toLowerCase();
const priority = (candidate: Candidate) => ({ "现在值得推进": 0, "有条件探索": 1, "长期目标": 2 })[stageFor(candidate)];
const scannedOn = (candidate: Candidate) => candidate.scannedOn ?? "2026-08-23";
const isNew = (candidate: Candidate) => Boolean(candidate.scannedOn) && Date.now() - new Date(`${candidate.scannedOn}T00:00:00`).getTime() < 48 * 60 * 60 * 1000;
const trackLabel: Record<Track, string> = {
  A: "主线 A · 医疗健康",
  B: "主线 B · 实体 AI / 机器人",
  C: "战略转向 · 游戏/IP",
};

export default function ScannerPage() {
  const [track, setTrack] = useState<Track | "全部">("全部");
  const [stage, setStage] = useState<CandidateStage | "全部">("全部");
  const [adopted, setAdopted] = useState<string[]>(() => load(adoptedKey));
  const [declined, setDeclined] = useState<string[]>(() => load(declinedKey));
  const ranked = candidates
    .filter((candidate) => !adopted.includes(candidate.id) && !existingRadarKeys.has(candidateKey(candidate)))
    .sort((left, right) => priority(left) - priority(right) || scannedOn(right).localeCompare(scannedOn(left)));
  const companyCounts = new Map<string, number>();
  const selected = ranked.filter((candidate) => {
    const count = companyCounts.get(candidate.company) ?? 0;
    if (count >= 3) return false;
    companyCounts.set(candidate.company, count + 1);
    return true;
  });
  const visible = selected.filter((candidate) => (track === "全部" || candidate.track === track) && (stage === "全部" || stageFor(candidate) === stage));
  const stageCount = (value: CandidateStage) => selected.filter((candidate) => stageFor(candidate) === value).length;
  const update = (key: string, ids: string[], setIds: (value: string[]) => void) => { setIds(ids); localStorage.setItem(key, JSON.stringify(ids)); };
  const adopt = (candidate: Candidate) => update(adoptedKey, [...new Set([...adopted, candidate.id])], setAdopted);
  const decline = (candidate: Candidate) => update(declinedKey, [...new Set([...declined, candidate.id])], setDeclined);
  const restore = (candidate: Candidate) => {
    const nextAdopted = adopted.filter((id) => id !== candidate.id); const nextDeclined = declined.filter((id) => id !== candidate.id);
    update(adoptedKey, nextAdopted, setAdopted); update(declinedKey, nextDeclined, setDeclined);
  };

  return <><SiteNav active="scanner"/><main className="scanner-page">
    <section className="scanner-hero"><div><span>JOB SCAN · CURATED OPPORTUNITIES</span><h1>先筛岗位结构，<br/><em>再决定是否进入雷达。</em></h1><p>职位池按“现在值得推进 / 有条件探索 / 长期目标”三层排序：第一层强调第一跳可行性，第二层保留一个待验证门槛，第三层只保留长期组合价值。每日扫描目标池建议 30–40 条（约 12–18 / 12–18 / ≤8）。</p></div><aside><b>{adopted.length}</b><span>已采用</span><b>{declined.length}</b><span>暂不采用</span><p>采用与否仅保存在当前浏览器。</p></aside></section>
    <section className="scanner-controls"><button className={stage === "全部" ? "selected" : ""} onClick={() => setStage("全部")}>全部 {selected.length}</button><button className={stage === "现在值得推进" ? "selected" : ""} onClick={() => setStage("现在值得推进")}>现在值得推进 {stageCount("现在值得推进")}</button><button className={stage === "有条件探索" ? "selected" : ""} onClick={() => setStage("有条件探索")}>有条件探索 {stageCount("有条件探索")}</button><button className={stage === "长期目标" ? "selected" : ""} onClick={() => setStage("长期目标")}>长期目标 {stageCount("长期目标")}</button></section>
    <section className="scanner-controls"><button className={track === "全部" ? "selected" : ""} onClick={() => setTrack("全部")}>全部赛道</button><button className={track === "A" ? "selected" : ""} onClick={() => setTrack("A")}>主线 A · 医疗健康 {selected.filter((item) => item.track === "A").length}</button><button className={track === "B" ? "selected" : ""} onClick={() => setTrack("B")}>主线 B · 实体 AI / 机器人 {selected.filter((item) => item.track === "B").length}</button><button className={track === "C" ? "selected" : ""} onClick={() => setTrack("C")}>战略转向 · 游戏/IP {selected.filter((item) => item.track === "C").length}</button></section>
    <section className="candidate-grid">{visible.map((candidate) => {
      const state = adopted.includes(candidate.id) ? "adopted" : declined.includes(candidate.id) ? "declined" : "new";
      const details = detailsFor(candidate);
      const workplaceSignal = workplaceSignalFor(candidate);
      const workplace = candidate.workplace ?? details.workplace;
      const commute = candidate.commute ?? details.commute;
      return <article className={`candidate-card ${state}`} key={candidate.id}><div className="candidate-top"><span>{trackLabel[candidate.track]} · {candidate.source}{isNew(candidate) && <mark>新</mark>}</span><i>{stageFor(candidate)}</i></div><h2>{candidate.company}</h2><a href={candidate.href} target="_blank" rel="noreferrer">{candidate.title} ↗</a><p className="candidate-type">办公地：{workplace} · {candidate.roleType}</p><div className="candidate-facts"><span>上市：{details.listing}</span><span>融资：{details.funding}</span><span>规模：{details.size}</span><span>新小岩：{commute}</span><span>薪资：{details.salary}</span><a href={mapsDirectionsUrl(workplace)} target="_blank" rel="noreferrer">Google Maps 公交通勤 ↗</a></div><div className="candidate-review"><b>职场评价 · {workplaceSignal.platform}</b><p>{workplaceSignal.score}</p><p><strong>主要风险：</strong>{workplaceSignal.risk}</p></div><div><b>为什么入池</b><p>{candidate.why}</p></div><div className="candidate-gate"><b>采用前必须确认</b><p>{candidate.gate}</p></div><footer>{state === "new" ? <><button className="adopt" onClick={() => adopt(candidate)}>采用 → 加入职位雷达</button><button className="decline" onClick={() => decline(candidate)}>暂不采用</button></> : <><strong>{state === "adopted" ? "已加入职位雷达" : "已标记暂不采用"}</strong><button className="restore" onClick={() => restore(candidate)}>恢复待定</button></>}</footer></article>;
    })}</section>
  </main></>;
}
