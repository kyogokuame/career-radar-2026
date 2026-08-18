"use client";

import { useEffect, useMemo, useState } from "react";

type Fit = "高" | "中" | "低";
type Status = "待确认" | "待研究" | "已联系" | "面谈待排期" | "已投递" | "暂停";
type Role = {
  id: string; company: string; title: string; source: string; date: string; work: string;
  salary: string; onsite: string; commute: string; distance: "近" | "中" | "远" | "远程" | "待确认";
  management: string; reports: string; fit: Fit; reason: string; status: Status; tags: string[];
};

const roles: Role[] = [
  {id:"flatiron",company:"Flatiron Health",title:"Strategic Partnerships Senior Manager",source:"Apex · 岡本由依",date:"8/18",work:"连接癌症医院、政府和医疗机构，拓展肿瘤 RWD 数据合作；推进伦理、合同、市场洞察和项目落地。",salary:"未公开",onsite:"每周 2 天出社",commute:"品川约 35–40 分钟",distance:"中",management:"高级个人贡献者；跨团队协作",reports:"未公开",fit:"高",reason:"战略项目、跨国协作与医疗数据合作高度相关；需补足医院/肿瘤生态知识。",status:"待研究",tags:["RWD","合作战略","全球"]},
  {id:"jmdc",company:"JMDC",title:"制药业务战略・解决方案 Business Produce",source:"Apex · 工藤悟",date:"7/31",work:"用医疗大数据为药企做战略与解决方案，负责客户开拓、提案、交付和新业务化；目标承担约 1 亿日元级业务。",salary:"1,000–2,000 万日元（邮件沟通）",onsite:"弹性制；天数未公开",commute:"芝大门约 35–40 分钟",distance:"中",management:"业务经营与团队建设职责",reports:"未公开",fit:"高",reason:"McKinsey 战略、商业策略和数据治理经验直接匹配；薪酬也覆盖当前基线。",status:"面谈待排期",tags:["医疗数据","新业务","药企"]},
  {id:"syneos",company:"Syneos Health",title:"Sr. Strategic Project Manager",source:"Apex · 吉野すみれ",date:"7/29",work:"领导药企新品上市与 Commercial Solutions 项目，连接 BD、方案设计和交付团队。",salary:"未公开",onsite:"每周约 2 天出社",commute:"丸之内约 20–25 分钟",distance:"近",management:"跨职能项目领导",reports:"未公开",fit:"高",reason:"咨询、GTM、跨团队转型经验高度贴合；日英双语符合要求。",status:"待确认",tags:["咨询","上市","药企"]},
  {id:"hokuto",company:"HOKUTO",title:"Solution Strategist",source:"Apex · 吉野すみれ",date:"7/29",work:"为药企设计营销/销售策略，负责数据分析、交付、KPI 改善和新服务 PoC。",salary:"未公开",onsite:"全远程 / 全弹性",commute:"无需通勤",distance:"远程",management:"项目与客户领导",reports:"未公开",fit:"高",reason:"商业策略、市场洞察和运营体系经验可直接迁移。",status:"待确认",tags:["HealthTech","商业策略","远程"]},
  {id:"prevent",company:"PREVENT",title:"CSO / Corporate Planning Director",source:"Apex · Andrew Areiter",date:"7/29",work:"作为 CEO 的战略伙伴，主导中长期计划、资源配置、M&A、新业务与高层决策支持。",salary:"上限约 1,500 万日元",onsite:"全远程可",commute:"无需固定通勤",distance:"远程",management:"董事会级战略领导",reports:"未公开",fit:"中",reason:"战略规划匹配，但 CSO 级别及直接 P&L/管理履历要求高。",status:"待确认",tags:["CSO","数字健康","高管"]},
  {id:"contrea",company:"Contrea",title:"制药业务负责人",source:"Apex · 白井美穗",date:"7/29",work:"将 MediOS 药企业务规模化，建立药企–医疗机构模式，推动客户、使用量、PMF 与团队搭建。",salary:"未公开",onsite:"混合办公；天数未公开",commute:"西新宿约 45–50 分钟",distance:"远",management:"业务负责人，向 CEO 汇报",reports:"未公开；含招聘与组织搭建",fit:"中",reason:"业务构建和商业策略相符，但需更强的制药 P&L 与 0→1 经营证明。",status:"待确认",tags:["业务负责人","HealthTech","P&L"]},
  {id:"bi-human",company:"Boehringer Ingelheim（人药）",title:"Healthcare Affairs Planning",source:"Apex · 岡本由依",date:"7/29",work:"围绕医疗政策、制度与外部环境制定 Healthcare Affairs Plan，覆盖中央政策和 Regional Access。",salary:"未公开",onsite:"可远程；天数未公开",commute:"品川约 35–40 分钟",distance:"中",management:"战略项目推进",reports:"未公开",fit:"低",reason:"政策、市场准入与医疗制度是核心专长，现有经历的直接重叠较少。",status:"待确认",tags:["政策","市场准入","制药"]},
  {id:"cooper",company:"CooperVision",title:"Commercial Operations Specialist",source:"Apex · 白井美穗",date:"7/29",work:"管理 CRM/电商系统、主数据和销售报表，支持流程优化、培训、新品上市和审计。",salary:"未公开",onsite:"弹性制；天数未公开",commute:"六本木一丁目约 40–45 分钟",distance:"远",management:"个人贡献者",reports:"无",fit:"低",reason:"有运营和数据治理共通点，但岗位重心偏 CRM/ERP 日常运营。",status:"待确认",tags:["CRM","销售运营","医疗器械"]},
  {id:"alcon",company:"Alcon",title:"Commercial Excellence Solutions Analyst",source:"Apex · 白井美穗",date:"7/29",work:"通过商业数据洞察、CRM、自动化及激励流程，提升销售效能与数据应用能力。",salary:"未公开",onsite:"未公开",commute:"虎之门约 40–45 分钟",distance:"远",management:"个人贡献者 / 经理级",reports:"未公开",fit:"中",reason:"商业分析、指标体系和数据治理有重叠；需确认工具栈与级别。",status:"待确认",tags:["商业分析","自动化","CRM"]},
  {id:"bi-animal",company:"Boehringer Ingelheim Animal Health",title:"Commercial Technology & Analytics Manager",source:"Apex · 岡本由依",date:"7/29",work:"制定 CRM、数据、仪表盘和 AI/RPA 商业技术战略，推动采用与组织变革。",salary:"未公开",onsite:"未公开",commute:"大崎约 45–50 分钟",distance:"远",management:"跨职能技术与数据领导",reports:"未公开",fit:"中",reason:"数据治理和跨区域协作匹配，但 JD 要求 5 年+ 制药/动保及 SFE/CRM 经验。",status:"待确认",tags:["数据战略","AI/RPA","CRM"]},
  {id:"jnj",company:"Johnson & Johnson MedTech",title:"Business Analytics & Market Intelligence Specialist",source:"Apex · Viona Angely",date:"7/29",work:"支持骨科业务的市场洞察、深度数据分析、AI 用例/PoC、KPI 管理与项目推进。",salary:"未公开",onsite:"未公开",commute:"水道桥约 30–35 分钟",distance:"中",management:"个人贡献者 / 项目领导",reports:"无",fit:"高",reason:"TAM、Share of Wallet、市场洞察、AI 用例和商业绩效经验直接匹配。",status:"待确认",tags:["市场洞察","AI","医疗器械"]},
  {id:"stryker",company:"Stryker",title:"Senior Manager, Commercial Solutions",source:"Apex · Anthea Ong",date:"7/29",work:"设计销售策略和区域规划，建设 Salesforce，并用 Power BI/SQL 监测销售队伍表现。",salary:"未公开",onsite:"灵活办公；天数未公开",commute:"办公地点未确认",distance:"待确认",management:"管理职责明确",reports:"4 人",fit:"中",reason:"商业策略、销售绩效和带人机会有吸引力；需确认 Salesforce/BI/SQL 深度。",status:"待确认",tags:["带人","商业卓越","Salesforce"]},
];

const options: Status[] = ["待确认","待研究","已联系","面谈待排期","已投递","暂停"];
const classFor = (fit: Fit) => fit === "高" ? "high" : fit === "中" ? "mid" : "low";
const commuteFor = (value: Role["distance"]) => ({近:"near",中:"medium",远:"far",远程:"remote",待确认:"unknown"})[value];

export default function Home() {
  const [query, setQuery] = useState("");
  const [fit, setFit] = useState<Fit | "全部">("全部");
  const [status, setStatus] = useState<Status | "全部">("全部");
  const [remoteOnly, setRemoteOnly] = useState(false);
  const [selectedId, setSelectedId] = useState("jmdc");
  const [saved, setSaved] = useState<Record<string, Status>>({});
  useEffect(() => { const raw = localStorage.getItem("career-radar-status"); if (raw) setSaved(JSON.parse(raw)); }, []);
  const setRoleStatus = (id: string, value: Status) => { const next = {...saved,[id]:value}; setSaved(next); localStorage.setItem("career-radar-status",JSON.stringify(next)); };
  const visible = useMemo(() => roles.filter((r) => {
    const text = [r.company,r.title,r.work,r.source,...r.tags].join(" ").toLowerCase();
    return (!query || text.includes(query.toLowerCase())) && (fit === "全部" || r.fit === fit) && (status === "全部" || (saved[r.id] ?? r.status) === status) && (!remoteOnly || r.distance === "远程");
  }), [query,fit,status,saved,remoteOnly]);
  const selected = roles.find((r) => r.id === selectedId) ?? roles[0];
  const high = roles.filter((r) => r.fit === "高").length;

  return <main>
    <section className="hero">
      <div className="eyebrow">CAREER RADAR · 2026</div>
      <div className="hero-grid"><div><h1>下一份工作，<br/><em>用同一把尺来比较。</em></h1><p>基于近三个月收到的 JD、你的简历，以及“管理职 / 年收不低于 1,300 万日元”的目标，整理出的职位追踪面板。</p></div><div className="hero-note"><span>当前重点</span><strong>JMDC casual 面谈</strong><p>已回复并请求本周四、周五或下周的可选时间。</p></div></div>
      <div className="metrics"><div><b>12</b><span>个职位</span></div><div><b>{high}</b><span>高适配</span></div><div><b>3</b><span>可远程</span></div><div><b>¥13M+</b><span>年收基线</span></div></div>
    </section>
    <section className="controls">
      <label className="search"><span>⌕</span><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="搜索公司、职位、关键词"/></label>
      <div className="buttons">{(["全部","高","中","低"] as const).map((x) => <button className={fit===x?"active":""} onClick={() => setFit(x)} key={x}>{x==="全部"?"全部适配度":x+"适配"}</button>)}</div>
      <button className={"remote-filter "+(remoteOnly ? "active" : "")} onClick={() => setRemoteOnly((value) => !value)} aria-pressed={remoteOnly}>⌂ 无需通勤</button>
      <select value={status} onChange={(e) => setStatus(e.target.value as Status | "全部")}><option>全部</option>{options.map((x) => <option key={x}>{x}</option>)}</select>
    </section>
    <section className="workspace">
      <div className="list"><div className="list-title"><span>职位池</span><b>{visible.length} / 12</b></div>{visible.map((r) => <article key={r.id} tabIndex={0} onClick={() => setSelectedId(r.id)} onKeyDown={(e) => e.key==="Enter" && setSelectedId(r.id)} className={"card "+(selected.id===r.id?"selected":"")}><div className="card-top"><span>{r.company}</span><i className={classFor(r.fit)}>{r.fit}适配</i></div><h2>{r.title}</h2><p>{r.work}</p><div className="source"><span>{r.source}</span><span>{r.date}</span></div><div className="card-foot"><i className={"commute "+commuteFor(r.distance)}>{r.distance} · {r.commute}</i><i className="status">{saved[r.id] ?? r.status}</i></div></article>)}{visible.length===0 && <div className="empty">没有符合当前筛选条件的职位。</div>}</div>
      <aside className="detail"><div className="eyebrow">职位详情</div><div className="detail-head"><div><small>{selected.company}</small><h2>{selected.title}</h2></div><i className={classFor(selected.fit)}>{selected.fit}适配</i></div><p className="summary">{selected.work}</p><div className="tags">{selected.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
        <div className="facts"><Fact label="来源" value={selected.source+" · "+selected.date}/><Fact label="想定年收入" value={selected.salary}/><Fact label="出社要求" value={selected.onsite}/><Fact label="新小岩通勤" value={selected.commute} cls={commuteFor(selected.distance)}/><Fact label="管理职能" value={selected.management}/><Fact label="直属部下" value={selected.reports}/></div>
        <div className="fit-note"><b>适配判断</b><p>{selected.reason}</p></div><div className="editor"><div><b>目前投递情况</b><small>更新会保存在此浏览器</small></div><select value={saved[selected.id] ?? selected.status} onChange={(e) => setRoleStatus(selected.id,e.target.value as Status)}>{options.map((x) => <option key={x}>{x}</option>)}</select></div><div className="note">通勤为从 JR 新小岩站出发的单程估算；未计实时延误、步行及精确办公地址差异。</div>
      </aside>
    </section>
  </main>;
}

function Fact({label,value,cls=""}:{label:string;value:string;cls?:string}) { return <div className="fact"><span>{label}</span><strong className={cls}>{value}</strong></div>; }
