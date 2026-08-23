"use client";

import { useState } from "react";
import SiteNav from "./SiteNav";
import { candidates, type Candidate, type Track } from "./scanner-data";
import "./scanner.css";

const adoptedKey = "career-radar-adopted";
const declinedKey = "career-radar-declined";
const load = (key: string) => {
  if (typeof window === "undefined") return [] as string[];
  try { return JSON.parse(localStorage.getItem(key) ?? "[]") as string[]; } catch { return []; }
};

export default function ScannerPage() {
  const [track, setTrack] = useState<Track | "全部">("全部");
  const [adopted, setAdopted] = useState<string[]>(() => load(adoptedKey));
  const [declined, setDeclined] = useState<string[]>(() => load(declinedKey));
  const visible = candidates.filter((candidate) => track === "全部" || candidate.track === track);
  const update = (key: string, ids: string[], setIds: (value: string[]) => void) => { setIds(ids); localStorage.setItem(key, JSON.stringify(ids)); };
  const adopt = (candidate: Candidate) => update(adoptedKey, [...new Set([...adopted, candidate.id])], setAdopted);
  const decline = (candidate: Candidate) => update(declinedKey, [...new Set([...declined, candidate.id])], setDeclined);
  const restore = (candidate: Candidate) => {
    const nextAdopted = adopted.filter((id) => id !== candidate.id); const nextDeclined = declined.filter((id) => id !== candidate.id);
    update(adoptedKey, nextAdopted, setAdopted); update(declinedKey, nextDeclined, setDeclined);
  };

  return <><SiteNav active="scanner"/><main className="scanner-page">
    <section className="scanner-hero"><div><span>JOB SCAN · FIRST-JUMP ONLY</span><h1>先筛岗位结构，<br/><em>再决定是否进入雷达。</em></h1><p>这是主线 A 与 B 的第一跳候选池。每张卡都保留来源链接、岗位性质、匹配理由与必须核验的红线；“采用”后会直接加入首页职位雷达。</p></div><aside><b>{adopted.length}</b><span>已采用</span><b>{declined.length}</b><span>暂不采用</span><p>采用与否仅保存在当前浏览器。</p></aside></section>
    <section className="scanner-controls"><button className={track === "全部" ? "selected" : ""} onClick={() => setTrack("全部")}>全部 {candidates.length}</button><button className={track === "A" ? "selected" : ""} onClick={() => setTrack("A")}>主线 A · 医疗健康 {candidates.filter((item) => item.track === "A").length}</button><button className={track === "B" ? "selected" : ""} onClick={() => setTrack("B")}>主线 B · 实体 AI / 机器人 {candidates.filter((item) => item.track === "B").length}</button></section>
    <section className="candidate-grid">{visible.map((candidate) => {
      const state = adopted.includes(candidate.id) ? "adopted" : declined.includes(candidate.id) ? "declined" : "new";
      return <article className={`candidate-card ${state}`} key={candidate.id}><div className="candidate-top"><span>主线 {candidate.track} · {candidate.source}</span><i>{candidate.verdict}</i></div><h2>{candidate.company}</h2><a href={candidate.href} target="_blank" rel="noreferrer">{candidate.title} ↗</a><p className="candidate-type">{candidate.location} · {candidate.roleType}</p><div><b>为什么入池</b><p>{candidate.why}</p></div><div className="candidate-gate"><b>采用前必须确认</b><p>{candidate.gate}</p></div><footer>{state === "new" ? <><button className="adopt" onClick={() => adopt(candidate)}>采用 → 加入职位雷达</button><button className="decline" onClick={() => decline(candidate)}>暂不采用</button></> : <><strong>{state === "adopted" ? "已加入职位雷达" : "已标记暂不采用"}</strong><button className="restore" onClick={() => restore(candidate)}>恢复待定</button></>}</footer></article>;
    })}</section>
  </main></>;
}
