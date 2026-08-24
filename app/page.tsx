"use client";

import { useState } from "react";
import SiteNav from "./SiteNav";
import { candidates } from "./scanner-data";

type Fit = "高" | "中" | "低";
type Status = "待确认" | "待研究" | "进行中" | "已联系" | "面谈待排期" | "面谈已排期" | "面谈已确定" | "已投递" | "暂停";
type Reaction = "赞" | "踩";
type Role = {
  id: string; company: string; title: string; source: string; date: string; work: string;
  href?: string;
  salary: string; onsite: string; commute: string; distance: "近" | "中" | "远" | "远程" | "待确认";
  management: string; reports: string; fit: Fit; reason: string; status: Status; tags: string[];
};

const roles: Role[] = [
  {id:"flatiron",company:"Flatiron Health",title:"Strategic Partnerships Senior Manager",href:"https://flatiron.com/careers/open-positions/job?gh_jid=8070086",source:"Apex · 岡本由依",date:"8/18",work:"连接癌症医院、政府和医疗机构，拓展肿瘤 RWD 数据合作；推进伦理、合同、市场洞察和项目落地。",salary:"未公开",onsite:"每周 2 天出社",commute:"品川约 35–40 分钟",distance:"中",management:"高级个人贡献者；跨团队协作",reports:"未公开",fit:"高",reason:"战略项目、跨国协作与医疗数据合作高度相关；需补足医院/肿瘤生态知识。",status:"待研究",tags:["RWD","合作战略","全球"]},
  {id:"jmdc",company:"JMDC",title:"制药业务战略・解决方案 Business Produce",href:"https://hrmos.co/pages/jmdc/jobs/bp-00034",source:"Apex · 工藤悟",date:"7/31",work:"用医疗大数据为药企做战略与解决方案，负责客户开拓、提案、交付和新业务化；目标承担约 1 亿日元级业务。",salary:"1,000–2,000 万日元（邮件沟通）",onsite:"弹性制；天数未公开",commute:"芝大门约 35–40 分钟",distance:"中",management:"业务经营与团队建设职责",reports:"未公开",fit:"高",reason:"McKinsey 战略、商业策略和数据治理经验直接匹配；薪酬也覆盖当前基线。",status:"面谈已确定",tags:["医疗数据","新业务","药企","8/27 10:00 面谈"]},
  {id:"syneos",company:"Syneos Health",title:"Sr. Strategic Project Manager",href:"https://commercialcareers.syneoshealth.com/search/jobs/in/tokyo",source:"Apex · 吉野すみれ",date:"7/29",work:"领导药企新品上市与 Commercial Solutions 项目，连接 BD、方案设计和交付团队。",salary:"未公开",onsite:"每周约 2 天出社",commute:"丸之内约 20–25 分钟",distance:"近",management:"跨职能项目领导",reports:"未公开",fit:"高",reason:"咨询、GTM、跨团队转型经验高度贴合；日英双语符合要求。",status:"待确认",tags:["咨询","上市","药企"]},
  {id:"syneos-consultant",company:"Syneos Health",title:"Consultant / Associate Consultant",href:"https://japan.commercialcareers.syneoshealth.com/jobs/17863053-consultant-slash-associate-consultant",source:"Syneos Health 官网",date:"8/24",work:"作为咨询项目 IC，完成医药/生物医药调研、分析、客户材料与项目交付；路径为 Sr. Consultant / Engagement Manager。",salary:"固定 ¥9.6–13M + 15% 奖金；总包约 ¥11–15M",onsite:"东京办公室；平均 19–20 点下班（本人核验）",commute:"丸之内约 20–25 分钟",distance:"近",management:"高级个人贡献者 / 项目交付",reports:"无",fit:"高",reason:"医疗行业切换的成功率高，且本人已确认工时可接受；以 18–30 个月为期限积累上市、商业战略与客户事实后，跳 in-house 药企、数字健康或 MedTech 商业化。主要风险是利用率、多项目和提案工作，不能长期停在泛调研/材料生产。",status:"进行中",tags:["主线 A","医药商业策略","咨询","进行中"]},
  {id:"sierra-gtm-operations",company:"Sierra",title:"GTM Operations",href:"https://www.linkedin.com/jobs/view/4446733630/",source:"LinkedIn · Sierra HR",date:"8/24",work:"负责新市场商业案例与执行计划、产品表现的财务/数据分析、年度规划框架，以及 Sales、Marketing、Product、Engineering 间的跨职能经营推进。",salary:"未公开；面谈核对现金、股权数量与行权条款",onsite:"东京现场办公；公司以线下协作为主",commute:"东京办公室（具体区域待 HR 确认）",distance:"待确认",management:"高级个人贡献者；跨职能战略、经营与执行",reports:"无",fit:"高",reason:"咨询 + ByteDance 商业化策略/运营的连续性最强，是进入企业级 AI Agent 的 GTM/经营中枢的一跳。职位明确要求 5–10 年经验，需用两年以上咨询、跨职能规划和商业化成果弥补总年限差距。主要取舍是 Sierra 将 Intensity 列为核心价值，且客户交付与现场协作可能带来持续高工时；明天面谈应先核实日本团队工时、客户 on-call、汇报线及股权。",status:"面谈已排期",tags:["主线 AI","GTM / BizOps","AI Agent","面谈已排期"]},
  {id:"hokuto",company:"HOKUTO",title:"Solution Strategist",href:"https://herp.careers/v1/hokuto/pzQBjDQrhbNs",source:"Apex · 吉野すみれ",date:"7/29",work:"为药企设计营销/销售策略，负责数据分析、交付、KPI 改善和新服务 PoC。",salary:"未公开",onsite:"全远程 / 全弹性",commute:"无需通勤",distance:"远程",management:"项目与客户领导",reports:"未公开",fit:"高",reason:"商业策略、市场洞察和运营体系经验可直接迁移。",status:"待确认",tags:["HealthTech","商业策略","远程"]},
  {id:"prevent",company:"PREVENT",title:"CSO / Corporate Planning Director",href:"https://prevent.co.jp/recruit/",source:"Apex · Andrew Areiter",date:"7/29",work:"作为 CEO 的战略伙伴，主导中长期计划、资源配置、M&A、新业务与高层决策支持。",salary:"上限约 1,500 万日元",onsite:"全远程可",commute:"无需固定通勤",distance:"远程",management:"董事会级战略领导",reports:"未公开",fit:"中",reason:"战略规划匹配，但 CSO 级别及直接 P&L/管理履历要求高。",status:"待确认",tags:["CSO","数字健康","高管"]},
  {id:"contrea",company:"Contrea",title:"制药业务负责人",href:"https://recruit.contrea.jp/open-positions",source:"Apex · 白井美穗",date:"7/29",work:"将 MediOS 药企业务规模化，建立药企–医疗机构模式，推动客户、使用量、PMF 与团队搭建。",salary:"未公开",onsite:"混合办公；天数未公开",commute:"西新宿约 45–50 分钟",distance:"远",management:"业务负责人，向 CEO 汇报",reports:"未公开；含招聘与组织搭建",fit:"中",reason:"业务构建和商业策略相符，但需更强的制药 P&L 与 0→1 经营证明。",status:"待确认",tags:["业务负责人","HealthTech","P&L"]},
  {id:"bi-human",company:"Boehringer Ingelheim（人药）",title:"Healthcare Affairs Planning",href:"https://jobs.boehringer-ingelheim.com/job/Shinagawa-%E3%83%98%E3%83%AB%E3%82%B9%E3%82%B1%E3%82%A2%E3%82%A2%E3%83%95%E3%82%A7%E3%82%A2%E3%83%BC%E3%82%BA%E3%83%97%E3%83%A9%E3%83%B3%E3%83%8B%E3%83%B3%E3%82%B0%E6%8B%85%E5%BD%93%E8%80%85%E3%83%8E%E3%83%B3%E3%83%A9%E3%82%A4%E3%83%B3%E3%83%9E%E3%83%8D%E3%83%BC%E3%82%B8%E3%83%A3%E3%83%BCor/1275522901/",source:"Apex · 岡本由依",date:"7/29",work:"围绕医疗政策、制度与外部环境制定 Healthcare Affairs Plan，覆盖中央政策和 Regional Access。",salary:"未公开",onsite:"可远程；天数未公开",commute:"品川约 35–40 分钟",distance:"中",management:"战略项目推进",reports:"未公开",fit:"低",reason:"政策、市场准入与医疗制度是核心专长，现有经历的直接重叠较少。",status:"待确认",tags:["政策","市场准入","制药"]},
  {id:"cooper",company:"CooperVision",title:"Commercial Operations Specialist",href:"https://www.coopercos.com/careers/",source:"Apex · 白井美穗",date:"7/29",work:"管理 CRM/电商系统、主数据和销售报表，支持流程优化、培训、新品上市和审计。",salary:"未公开",onsite:"弹性制；天数未公开",commute:"六本木一丁目约 40–45 分钟",distance:"远",management:"个人贡献者",reports:"无",fit:"低",reason:"有运营和数据治理共通点，但岗位重心偏 CRM/ERP 日常运营。",status:"待确认",tags:["CRM","销售运营","医疗器械"]},
  {id:"alcon",company:"Alcon",title:"Commercial Excellence Solutions Analyst",href:"https://alcon.wd5.myworkdayjobs.com/ja-JP/careers_alcon/job/Sr-Associate-or-Manager--Commercial-Excellence-Sales-Effectiveness_R-2026-45625",source:"Apex · 白井美穗",date:"7/29",work:"通过商业数据洞察、CRM、自动化及激励流程，提升销售效能与数据应用能力。",salary:"未公开",onsite:"未公开",commute:"虎之门约 40–45 分钟",distance:"远",management:"个人贡献者 / 经理级",reports:"未公开",fit:"中",reason:"商业分析、指标体系和数据治理有重叠；需确认工具栈与级别。",status:"待确认",tags:["商业分析","自动化","CRM"]},
  {id:"bi-animal",company:"Boehringer Ingelheim Animal Health",title:"Commercial Technology & Analytics Manager",href:"https://jobs.boehringer-ingelheim.com/search/?locale=ja_JP",source:"Apex · 岡本由依",date:"7/29",work:"制定 CRM、数据、仪表盘和 AI/RPA 商业技术战略，推动采用与组织变革。",salary:"未公开",onsite:"未公开",commute:"大崎约 45–50 分钟",distance:"远",management:"跨职能技术与数据领导",reports:"未公开",fit:"中",reason:"数据治理和跨区域协作匹配，但 JD 要求 5 年+ 制药/动保及 SFE/CRM 经验。",status:"待确认",tags:["数据战略","AI/RPA","CRM"]},
  {id:"jnj",company:"Johnson & Johnson MedTech",title:"Business Analytics & Market Intelligence Specialist",href:"https://www.careers.jnj.com/en/jobs/r-078120/medtech-business-analytics-market-intelligence-specialist-strategy-commercial-excellence-orthopedics/",source:"Apex · Viona Angely",date:"7/29",work:"支持骨科业务的市场洞察、深度数据分析、AI 用例/PoC、KPI 管理与项目推进。",salary:"未公开",onsite:"未公开",commute:"水道桥约 30–35 分钟",distance:"中",management:"个人贡献者 / 项目领导",reports:"无",fit:"高",reason:"TAM、Share of Wallet、市场洞察、AI 用例和商业绩效经验直接匹配。",status:"待确认",tags:["市场洞察","AI","医疗器械"]},
  {id:"stryker",company:"Stryker",title:"Senior Manager, Commercial Solutions",href:"https://www.careercross.com/en/job/pdf-1591776",source:"Apex · Anthea Ong",date:"7/29",work:"设计销售策略和区域规划，建设 Salesforce，并用 Power BI/SQL 监测销售队伍表现。",salary:"未公开",onsite:"灵活办公；天数未公开",commute:"办公地点未确认",distance:"待确认",management:"管理职责明确",reports:"4 人",fit:"中",reason:"商业策略、销售绩效和带人机会有吸引力；需确认 Salesforce/BI/SQL 深度。",status:"待确认",tags:["带人","商业卓越","Salesforce"]},
  {id:"anker-gtm",company:"Anker Japan",title:"GTM（市场投入战略＆产品营销）",href:"https://hrmos.co/pages/ankerjapan/jobs/40163838476781405180",source:"Anker Japan 官网",date:"8/23",work:"主导便携储能新品在日本的市场进入：产品策略、本地化、EC/量贩渠道、物流库存与 CS 的上市协同，并与中国总部共同推进。",salary:"600–900 万日元（年俸制；奖金每年 4 次）",onsite:"可远程；原则每周出社 3 天；弹性制",commute:"赤坂约 45–55 分钟",distance:"远",management:"高级个人贡献者；GTM / 产品营销跨职能主导",reports:"无公开",fit:"高",reason:"罕见地同时覆盖市场进入战略、总部–日本本地化、渠道/电商和 launch 运营，与你的 J&J GTM 组织战略与市场推出经验高度重合，并能积累中日可迁移的硬件商业化资本。主要取舍是 ¥6–9M 区间低于理想现金目标，且它是实体 AI/机器人之外的邻接赛道。",status:"待研究",tags:["GTM","产品上市","中日协作","消费硬件","便携储能"]},
];

type CompanyProfile = { hq: string; listing: string; size: string; sourceHref: string; sourceLabel: string; workplacePlatform: string; workplaceScore: string; workplaceRisk: string };
const companyProfiles: Record<string, CompanyProfile> = {
  flatiron: {hq:"美国纽约",listing:"非上市 · Roche 旗下独立运营",size:"约 2,500+ 人（全球）",sourceHref:"https://www.roche.com/innovation/structure/flatiron",sourceLabel:"Roche · Flatiron 公司资料",workplacePlatform:"Glassdoor",workplaceScore:"3.2 / 5（382 条全球评价快照）",workplaceRisk:"组织仍带有 startup 的高要求；晋升空间、资源与日本团队自主性需核验。"},
  jmdc: {hq:"日本东京 · 港区芝大门",listing:"东证 Prime · 4483",size:"499 人（单体，2026/3）",sourceHref:"https://www.jmdc.co.jp/en/profile/",sourceLabel:"JMDC 官方公司资料",workplacePlatform:"OpenWork",workplaceScore:"4.55 / 5（公开搜索快照；样本/日期待核验）",workplaceRisk:"药企客户交付压力、集团整合后的优先级与业务经营目标需面谈确认。"},
  syneos: {hq:"美国 Morrisville, North Carolina",listing:"非上市 · 2023 年被私有化",size:"约 29,000 人（全球）",sourceHref:"https://www.syneoshealth.com/clinical-corporate-careers",sourceLabel:"Syneos 官方招聘资料",workplacePlatform:"Glassdoor",workplaceScore:"3.7 / 5（3,959 条全球评价）；Commercial Solutions 3.9 / 5（318 条）",workplaceRisk:"项目/客户依赖与利用率是常见波动源；以东京团队实际 19–20 点下班的验证为准。"},
  "syneos-consultant": {hq:"美国 Morrisville, North Carolina",listing:"非上市 · 2023 年被私有化",size:"约 29,000 人（全球）",sourceHref:"https://japan.commercialcareers.syneoshealth.com/jobs/17863053-consultant-slash-associate-consultant",sourceLabel:"Syneos 岗位资料",workplacePlatform:"Glassdoor",workplaceScore:"3.7 / 5（3,959 条全球评价）；Commercial Solutions 3.9 / 5（318 条）",workplaceRisk:"项目/客户依赖与利用率是常见波动源；以东京团队实际 19–20 点下班的验证为准。"},
  "sierra-gtm-operations": {hq:"美国旧金山",listing:"非上市 · Series E；最近一轮 2026/5 融资 $950M，估值超 $15B",size:"201–500 人（LinkedIn 公司页；平台显示约 1,000 名员工档案）",sourceHref:"https://techcrunch.com/2026/05/04/sierra-raises-950m-as-the-race-to-own-enterprise-ai-gets-serious/",sourceLabel:"TechCrunch · 2026/5 融资报道",workplacePlatform:"Glassdoor",workplaceScore:"未检索到可核验的 Sierra AI 同名评分/样本不足",workplaceRisk:"公司将 Intensity 定为核心价值且以现场协作为主；日本团队处于扩张期，需面谈核验长期工时、客户紧急响应、东京办公室地点与股权归属。"},
  hokuto: {hq:"日本东京 · 涩谷区涩谷",listing:"非上市 · 医疗科技创业公司",size:"85 人（含兼职，2026/5）",sourceHref:"https://corp.hokuto.app/about",sourceLabel:"HOKUTO 官方公司资料",workplacePlatform:"OpenWork",workplaceScore:"未检索到可核验同名评分/样本不足",workplaceRisk:"小团队、药企客户集中度和岗位边界；核验远程制度是否适用于目标团队。"},
  prevent: {hq:"日本名古屋 · 东区葵",listing:"非上市 · 住友生命 100% 持有",size:"约 111 人（公开职场资料）",sourceHref:"https://prevent.co.jp/company/",sourceLabel:"PREVENT 官方公司资料",workplacePlatform:"OpenWork",workplaceScore:"未检索到可核验同名评分/样本不足",workplaceRisk:"高管直辖角色的授权边界、名古屋/远程实际安排和母公司治理。"},
  contrea: {hq:"日本东京 · 新宿区西新宿",listing:"非上市 · 医疗 SaaS 创业公司",size:"未公开（2023 年约 10 名正式员工）",sourceHref:"https://www.contrea.jp/",sourceLabel:"Contrea 官方公司资料",workplacePlatform:"OpenWork",workplaceScore:"未检索到可核验同名评分/样本不足",workplaceRisk:"极早期规模、药企业务 P&L 压力与招聘/经营职责可能超出当前职级。"},
  "bi-human": {hq:"德国 Ingelheim am Rhein",listing:"非上市 · 家族所有",size:"约 52,000+ 人（全球集团）",sourceHref:"https://animalhealth.boehringer-ingelheim.com/articles/nexgard-combo-feline-parasite-protection-fda-approval",sourceLabel:"Boehringer Ingelheim 官方资料",workplacePlatform:"Glassdoor",workplaceScore:"未在本轮核验日本岗位可比样本",workplaceRisk:"政策/市场准入专业门槛高，矩阵组织下日本岗位的决策权需确认。"},
  cooper: {hq:"美国 San Ramon, California",listing:"NASDAQ: COO（母公司 CooperCompanies）",size:"15,000+ 人（全球集团）",sourceHref:"https://www.coopercos.com/our-company/",sourceLabel:"CooperCompanies 官方公司资料",workplacePlatform:"Glassdoor",workplaceScore:"未在本轮核验日本岗位可比样本",workplaceRisk:"CRM/商业运营容易变成支持职能；确认是否拥有上市或客户结果。"},
  alcon: {hq:"瑞士日内瓦（运营总部）",listing:"SIX / NYSE: ALC",size:"25,942 FTE（2025 年末）",sourceHref:"https://www.sec.gov/Archives/edgar/data/1167379/000116737926000014/alc-20251231.htm",sourceLabel:"Alcon 2025 年报",workplacePlatform:"Glassdoor",workplaceScore:"未在本轮核验日本岗位可比样本",workplaceRisk:"眼科商业组织高度矩阵化；分析岗位的自动化/支持化风险需控制。"},
  "bi-animal": {hq:"德国 Ingelheim am Rhein（集团）",listing:"非上市 · 家族所有",size:"约 52,000+ 人（全球集团；日本动保约 130 人）",sourceHref:"https://animalhealth.boehringer-ingelheim.com/articles/nexgard-combo-feline-parasite-protection-fda-approval",sourceLabel:"Boehringer Ingelheim 官方资料",workplacePlatform:"Glassdoor",workplaceScore:"未在本轮核验日本岗位可比样本",workplaceRisk:"动保垂直行业经验门槛、CRM/分析支持化和团队规模。"},
  jnj: {hq:"美国 New Brunswick, New Jersey",listing:"NYSE: JNJ",size:"约 140,800 人（2025 年末）",sourceHref:"https://www.sec.gov/Archives/edgar/data/200406/000020040626000016/jnj-20251228.htm",sourceLabel:"Johnson & Johnson 2025 年报",workplacePlatform:"Glassdoor",workplaceScore:"未在本轮核验日本岗位可比样本",workplaceRisk:"全球矩阵、骨科业务优先级与市场洞察岗位的执行授权。"},
  stryker: {hq:"美国 Portage, Michigan",listing:"NYSE: SYK",size:"约 56,000 人（全球，2025 年末）",sourceHref:"https://www.stryker.com/ir/en/about.html",sourceLabel:"Stryker 官方公司资料",workplacePlatform:"Glassdoor",workplaceScore:"未在本轮核验日本岗位可比样本",workplaceRisk:"带人和销售效能 KPI，确认是否是持续高压 quota 管理而非商业建设。"},
  "anker-gtm": {hq:"日本东京 · 港区赤坂",listing:"日本法人非独立上市；母公司 Anker Innovations 为上交所科创板 688410",size:"202 人（Anker Japan，2026/4）",sourceHref:"https://hrmos.co/pages/ankerjapan/jobs/40163838476781405180",sourceLabel:"Anker Japan 官方岗位资料",workplacePlatform:"OpenWork",workplaceScore:"3.47 / 5（119 条评价快照；月均残业 43.6 小时快照）",workplaceRisk:"中国总部协同、消费硬件发布节点与月度工时；薪资低于既定现金目标。"},
};

const options: Status[] = ["待确认","待研究","进行中","已联系","面谈待排期","面谈已排期","面谈已确定","已投递","暂停"];
const activeStatuses: Status[] = ["待研究","进行中","已联系","面谈待排期","面谈已排期","面谈已确定","已投递"];
const classFor = (fit: Fit) => fit === "高" ? "high" : fit === "中" ? "mid" : "low";
const commuteFor = (value: Role["distance"]) => ({近:"near",中:"medium",远:"far",远程:"remote",待确认:"unknown"})[value];
const loadLocal = <T,>(key: string, fallback: T): T => {
  if (typeof window === "undefined") return fallback;
  try { const raw = localStorage.getItem(key); return raw ? JSON.parse(raw) as T : fallback; }
  catch { return fallback; }
};

export default function Home() {
  const [query, setQuery] = useState("");
  const [fit, setFit] = useState<Fit | "全部">("全部");
  const [status, setStatus] = useState<Status | "全部">("全部");
  const [remoteOnly, setRemoteOnly] = useState(false);
  const [selectedId, setSelectedId] = useState("jmdc");
  const [saved, setSaved] = useState<Record<string, Status>>(() => loadLocal("career-radar-status", {}));
  const [reactions, setReactions] = useState<Record<string, Reaction>>(() => loadLocal("career-radar-reactions", {}));
  const [adoptedIds] = useState<string[]>(() => loadLocal("career-radar-adopted", []));
  const [reactionFilter, setReactionFilter] = useState<"全部" | "已点赞" | "已点踩">("全部");
  const [activeOnly, setActiveOnly] = useState(false);
  const setRoleStatus = (id: string, value: Status) => { const next = {...saved,[id]:value}; setSaved(next); localStorage.setItem("career-radar-status",JSON.stringify(next)); };
  const setReaction = (id: string, value: Reaction) => {
    const next = {...reactions};
    if (next[id] === value) delete next[id]; else next[id] = value;
    setReactions(next); localStorage.setItem("career-radar-reactions",JSON.stringify(next));
  };
  const fitFor = (role: Role): Fit => reactions[role.id] === "赞" ? "高" : reactions[role.id] === "踩" ? "低" : role.fit;
  const statusFor = (role: Role): Status => saved[role.id] ?? role.status;
  const isActive = (role: Role) => activeStatuses.includes(statusFor(role));
  const adoptedRoles: Role[] = candidates.filter((candidate) => adoptedIds.includes(candidate.id)).map((candidate) => ({
    id: candidate.id, company: candidate.company, title: candidate.title, href: candidate.href,
    source: candidate.source, date: "本轮扫描", work: candidate.why, salary: "待确认", onsite: "待确认", commute: "待确认",
    distance: "待确认", management: candidate.roleType, reports: "待确认", fit: candidate.verdict === "优先审阅" ? "高" : "中",
    reason: `${candidate.why} 下一步：${candidate.gate}`, status: "待研究", tags: [candidate.track === "A" ? "主线 A" : candidate.track === "B" ? "主线 B" : "战略转向", candidate.roleType, "扫描采用"],
  }));
  const allRoles = [...roles, ...adoptedRoles];
  const visible = allRoles.filter((r) => {
    const text = [r.company,r.title,r.work,r.source,...r.tags].join(" ").toLowerCase();
    const reaction = reactions[r.id];
    return (!query || text.includes(query.toLowerCase())) && (fit === "全部" || fitFor(r) === fit) && (status === "全部" || statusFor(r) === status) && (!remoteOnly || r.distance === "远程") && (!activeOnly || isActive(r)) && (reactionFilter === "全部" || (reactionFilter === "已点赞" && reaction === "赞") || (reactionFilter === "已点踩" && reaction === "踩"));
  }).sort((a,b) => {
    const priority = (role: Role) => reactions[role.id] === "赞" ? 0 : reactions[role.id] === "踩" ? 3 : isActive(role) ? 1 : 2;
    return priority(a) - priority(b);
  });
  const selected = allRoles.find((r) => r.id === selectedId) ?? allRoles[0];
  const company = companyProfiles[selected.id] ?? {hq:"待面谈确认", listing:"待确认", size:"待确认", sourceHref:selected.href ?? "#", sourceLabel:"岗位来源", workplacePlatform:"待按公司注册地核验", workplaceScore:"未检索", workplaceRisk:"在面试中核验经理、工时、决策权、现金跑道与组织变动。"};
  const high = allRoles.filter((r) => fitFor(r) === "高").length;
  const active = allRoles.filter(isActive).length;

  return <><SiteNav active="dashboard"/><main>
    <section className="hero">
      <div className="eyebrow">CAREER RADAR · 2026</div>
      <div className="hero-grid"><div><h1>下一份工作，<br/><em>用同一把尺来比较。</em></h1><p>基于近三个月收到的 JD、你的简历，以及“保证现金不低于 800 万日元、理想区间 900–1,200 万日元”的目标，整理出的职位追踪面板。</p></div><div className="hero-note"><span>当前重点</span><strong>Sierra GTM Operations 面谈已排期</strong><p>明日与 HR 沟通 · 核验工时、股权与日本团队边界</p></div></div>
      <div className="metrics"><div><b>{allRoles.length}</b><span>个职位</span></div><div><b>{active}</b><span>进行中</span></div><div><b>{high}</b><span>高适配</span></div><div><b>¥8M+</b><span>保证现金下限</span></div></div>
    </section>
    <section className="controls">
      <label className="search"><span>⌕</span><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="搜索公司、职位、关键词"/></label>
      <div className="buttons">{(["全部","高","中","低"] as const).map((x) => <button className={fit===x?"active":""} onClick={() => setFit(x)} key={x}>{x==="全部"?"全部适配度":x+"适配"}</button>)}</div>
      <button className={"active-filter "+(activeOnly ? "active" : "")} onClick={() => setActiveOnly((value) => !value)} aria-pressed={activeOnly}>⚡ 仅进行中</button>
      <button className={"remote-filter "+(remoteOnly ? "active" : "")} onClick={() => setRemoteOnly((value) => !value)} aria-pressed={remoteOnly}>⌂ 无需通勤</button>
      <select value={status} onChange={(e) => setStatus(e.target.value as Status | "全部")}><option>全部</option>{options.map((x) => <option key={x}>{x}</option>)}</select>
      <select aria-label="按我的判断筛选" value={reactionFilter} onChange={(e) => setReactionFilter(e.target.value as "全部" | "已点赞" | "已点踩")}><option>我的判断：全部</option><option value="已点赞">已点赞</option><option value="已点踩">已点踩</option></select>
    </section>
    <section className="workspace">
      <div className="list"><div className="list-title"><span>职位池 <small>（点赞 → 进行中 → 其他 → 点踩）</small></span><b>{visible.length} / {allRoles.length}</b></div>{visible.map((r) => <button type="button" key={r.id} onClick={() => setSelectedId(r.id)} className={"card "+(selected.id===r.id?"selected ":"")+(isActive(r)?"active-card":"")}><div className="card-top"><span>{r.company}</span><i className={classFor(fitFor(r))}>{fitFor(r)}适配</i></div><h2>{r.title}</h2><p>{r.work}</p><div className="source"><span>{r.source}</span><span>{r.date}</span></div><div className="card-foot"><i className={"commute "+commuteFor(r.distance)}>{r.distance} · {r.commute}</i><span className="card-state">{isActive(r) && <i className="active-status">进行中</i>} {reactions[r.id] ? reactions[r.id] === "赞" ? "👍 已赞" : "👎 已踩" : <i className="status">{statusFor(r)}</i>}</span></div></button>)}{visible.length===0 && <div className="empty">没有符合当前筛选条件的职位。</div>}</div>
      <aside className="detail"><div className="eyebrow">职位详情</div><div className="detail-head"><div><small>{selected.company}</small><h2>{selected.href ? <a className="job-title-link" href={selected.href} target="_blank" rel="noreferrer">{selected.title} ↗</a> : selected.title}</h2></div><i className={classFor(fitFor(selected))}>{fitFor(selected)}适配</i></div><p className="summary">{selected.work}</p><div className="tags">{selected.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
        <div className="facts"><Fact label="来源" value={selected.source+" · "+selected.date}/><Fact label="总部 HQ" value={company.hq}/><Fact label="上市状态" value={company.listing}/><Fact label="公司规模" value={company.size}/><Fact label="职场评价" value={`${company.workplacePlatform} · ${company.workplaceScore}`}/><Fact label="主要风险" value={company.workplaceRisk}/><Fact label="想定年收入" value={selected.salary}/><Fact label="出社要求" value={selected.onsite}/><Fact label="新小岩通勤" value={selected.commute} cls={commuteFor(selected.distance)}/><Fact label="管理职能" value={selected.management}/><Fact label="直属部下" value={selected.reports}/></div>
        <a className="company-source" href={company.sourceHref} target="_blank" rel="noreferrer">↗ {company.sourceLabel}</a>
        <div className="fit-note"><b>适配判断</b><p>{selected.reason}</p></div><div className="reaction-box"><div><b>我的判断</b><small>点赞置顶并归为高适配；点踩置底并归为低适配</small></div><div className="reaction-buttons"><button className={reactions[selected.id] === "赞" ? "chosen" : ""} onClick={() => setReaction(selected.id,"赞")} aria-pressed={reactions[selected.id] === "赞"}>👍 点赞</button><button className={reactions[selected.id] === "踩" ? "chosen" : ""} onClick={() => setReaction(selected.id,"踩")} aria-pressed={reactions[selected.id] === "踩"}>👎 点踩</button></div></div><div className="editor"><div><b>目前投递情况</b><small>更新会保存在此浏览器</small></div><select value={saved[selected.id] ?? selected.status} onChange={(e) => setRoleStatus(selected.id,e.target.value as Status)}>{options.map((x) => <option key={x}>{x}</option>)}</select></div><div className="note">通勤为从 JR 新小岩站出发的单程估算；未计实时延误、步行及精确办公地址差异。</div>
      </aside>
    </section>
  </main></>;
}

function Fact({label,value,cls=""}:{label:string;value:string;cls?:string}) { return <div className="fact"><span>{label}</span><strong className={cls}>{value}</strong></div>; }
