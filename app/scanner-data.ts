export type Track = "A" | "B" | "C";
export type CandidateStage = "现在值得推进" | "有条件探索" | "长期目标";
export type LanguageMarketFit = "跨境明确" | "需核验" | "日本本地降权";
export type Candidate = {
  id: string;
  track: Track;
  company: string;
  title: string;
  href: string;
  source: "LinkedIn MCP" | "公司官网" | "公开招聘平台";
  location: string;
  workplace?: string;
  commute?: string;
  roleType: string;
  why: string;
  gate: string;
  verdict: "优先审阅" | "条件式" | "暂不建议";
  scannedOn?: string;
  stage?: CandidateStage;
};

const languageMarketOverrides: Record<string, LanguageMarketFit> = {
  "a-ubie-cs": "日本本地降权",
  "a-ubie-alliance": "日本本地降权",
  "a-ubie-newbiz": "日本本地降权",
  "a-ubie-account": "日本本地降权",
  "a-jmdc-newbiz": "日本本地降权",
  "a-jmdc-pdm": "日本本地降权",
  "a-jmdc-bizlead": "日本本地降权",
  "a-hokuto-am": "日本本地降权",
  "a-intuitive-pmm": "日本本地降权",
  "a-medtronic-surgical": "日本本地降权",
  "a-lincwell-pjm": "日本本地降权",
  "a-medimo-bizdev": "日本本地降权",
  "a-drjoy-newbiz": "日本本地降权",
  "a-bd-applied-medical": "日本本地降权",
  "a-bd-product-manager": "日本本地降权",
  "a-relx-health-pm": "日本本地降权",
  "b-woven-delivery": "日本本地降权",
  "b-woven-cs": "日本本地降权",
  "b-prox-pm": "日本本地降权",
  "b-ascent-cs": "日本本地降权",
  "b-sensyn-bd": "日本本地降权",
  "b-sensyn-pm": "日本本地降权",
  "b-omron-pmm": "日本本地降权",
  "c-playstation-omnichannel": "日本本地降权",
  "a-intuitive-ion-access": "跨境明确",
  "a-microport-overseas": "跨境明确",
  "a-zimmer-commercial": "跨境明确",
  "a-cmr-commercial": "跨境明确",
  "b-linkedin-entegris": "跨境明确",
  "b-ecovacs-apj": "跨境明确",
  "b-ecovacs-emea": "跨境明确",
  "b-bangbang-gtm": "跨境明确",
  "b-unitree-global-market": "跨境明确",
  "b-unitree-application": "跨境明确",
  "b-terra-bd": "跨境明确",
  "b-terra-pm": "跨境明确",
  "b-denso-market": "跨境明确",
  "b-yaskawa-global": "跨境明确",
  "b-fanuc-market": "跨境明确",
  "b-dobot-overseas": "跨境明确",
  "b-dobot-pmm": "跨境明确",
  "c-tencent-ugc-investment": "跨境明确",
  "c-tencent-investment": "跨境明确",
  "c-google-play-partnerships": "跨境明确",
  // 虽向 APJC 管理层汇报，但 JD 明示服务 AWS Japan business，未披露 APAC 客户组合或语言占比。
  "b-aws-apjc-strategic-gtm": "需核验",
};

export const languageMarketFitFor = (candidate: Candidate): LanguageMarketFit => {
  const explicit = languageMarketOverrides[candidate.id];
  if (explicit) return explicit;
  const text = `${candidate.title} ${candidate.roleType}`;
  if (/APAC|APJ|EMEA|regional|global|overseas|全球|海外|跨境|国际化|中国总部|North APAC|English/i.test(text)) return "跨境明确";
  return "需核验";
};

export const stageFor = (candidate: Candidate): CandidateStage => {
  const languageFit = languageMarketFitFor(candidate);
  if (candidate.stage) return languageFit === "日本本地降权" && candidate.stage === "现在值得推进" ? "有条件探索" : candidate.stage;
  if (candidate.verdict === "暂不建议") return "长期目标";
  const firstHopIds = new Set(["a-hokuto-am", "a-linkedin-pathology-pm", "b-mujin-hwpm", "b-woven-cs", "b-mi6-pdm", "b-preferred-pm", "b-ascent-cs", "b-terra-pm"]);
  if (firstHopIds.has(candidate.id)) return languageFit === "日本本地降权" ? "有条件探索" : "现在值得推进";
  const text = `${candidate.title} ${candidate.roleType} ${candidate.why} ${candidate.gate}`;
  const hardFirstHopGate = /要求.{0,12}(行业经验|实务经验|临床|医疗器械|游戏|机器人|工程|技术背景)|需要.{0,12}(深度|丰富|多年|强).{0,8}(经验|人脉|履历)|10\s*年|10年以上|Director|Head|负责人|Senior Manager|战略投资|投后|发行负责人/i;
  if (hardFirstHopGate.test(text)) return "长期目标";
  if (candidate.verdict === "优先审阅") return languageFit === "日本本地降权" ? "有条件探索" : "现在值得推进";
  return "有条件探索";
};

type CompanyDetail = {
  listing: string;
  funding: string;
  size: string;
  workplace: string;
  commute: string;
  salary: string;
};
type WorkplaceSignal = {
  platform: string;
  score: string;
  risk: string;
};
const companyDetails: Record<string, CompanyDetail> = {
  "Ubie": { listing:"未上市", funding:"Series C extension：US$19M（2022）；累计 US$74M", size:"约 254 人", workplace:"东京·中央区日本桥本町（Nihonbashi Life Science Building）", commute:"约 15 分钟（Google Maps 公交；抓取于 2026-08-23）", salary:"约 ¥8–15M" },
  "JMDC": { listing:"东证 Prime（4483）", funding:"上市公司（不适用）", size:"约 500 人（单体）", workplace:"东京·港区芝大门（岗位实际楼层待确认）", commute:"约 35–45 分钟（办公楼待确认）", salary:"约 ¥8–16M" },
  "HOKUTO": { listing:"未上市", funding:"轮次未披露：¥9 亿（2024-03）", size:"85 人（含兼职）", workplace:"东京·涩谷区涩谷（Cross Office Shibuya）", commute:"约 44 分钟（Google Maps 公交；抓取于 2026-08-23）", salary:"约 ¥8–15M" },
  "Mujin": { listing:"未上市", funding:"Series D 首次关闭：¥364 亿（股权 ¥209 亿 + 债务 ¥155 亿，2025-12）", size:"约 350 人（全球）", workplace:"东京·江东区辰巳（MJHQ）", commute:"约 57 分钟（Google Maps 公交；抓取于 2026-08-23）", salary:"约 ¥7–15M" },
  "Woven by Toyota": { listing:"未上市（Toyota 旗下）", funding:"母公司资本支持；无独立融资轮次披露", size:"约 1,000+ 人", workplace:"东京·中央区日本桥（具体团队/裾野出勤待确认）", commute:"约 20–35 分钟（东京办公地估算；裾野不适用）", salary:"约 ¥8–16M" },
  "Rapyuta Robotics": { listing:"未上市", funding:"Series C Extension（金额未公开；公开估值 ¥240 亿，2024）", size:"约 100–200 人", workplace:"东京·江东区（具体地址待确认）", commute:"约 40–60 分钟（区内办公地待确认）", salary:"约 ¥7–15M" },
  "Prox Industries": { listing:"未上市", funding:"Seed（金额未公开）", size:"早期团队", workplace:"东京·文京区本乡（本乡K&K大厦）", commute:"Google Maps 路线见链接（随出发时间变化）", salary:"约 ¥7–13M" },
  "inaho": { listing:"未上市", funding:"资本业务提携（2026-03，金额未公开）", size:"早期团队", workplace:"神奈川·藤泽市鹄沼海岸", commute:"约 1 小时 40 分+（跨城；以 Maps 实时路线为准）", salary:"约 ¥6–10M" },
  "MI-6": { listing:"未上市", funding:"Series A：¥6.5 亿（含融资等，2023-05）", size:"约 100–200 人", workplace:"东京·中央区日本桥小舟町", commute:"约 22 分钟（Google Maps 公交；抓取于 2026-08-23）", salary:"约 ¥7–12M" },
  "Entegris": { listing:"NASDAQ: ENTG", funding:"上市公司（不适用）", size:"约 7,000+ 人", workplace:"东京（具体区待确认）", commute:"具体办公地待确认后再计算", salary:"约 ¥9–15M" },
  "Intuitive Surgical": { listing:"NASDAQ: ISRG", funding:"上市公司（不适用）", size:"日本约 355 人", workplace:"东京·港区赤坂（ARK Mori Building）", commute:"约 37 分钟（Google Maps 公交；抓取于 2026-08-23）", salary:"约 ¥10–18M（估算）" },
  "Medtronic": { listing:"NYSE: MDT", funding:"上市公司（不适用）", size:"约 95,000+ 人（全球）", workplace:"东京（岗位页仅披露 Tokyo；区待确认）", commute:"办公区待确认后再计算", salary:"约 ¥10–17M（估算）" },
  "MicroPort MedBot": { listing:"HKEX: 2252", funding:"上市公司（不适用）", size:"待确认", workplace:"上海（岗位页未披露区）", commute:"海外岗位；不适用新小岩日常通勤", salary:"约 RMB 96–144k（当前专员岗位）" },
  "Zimmer Biomet": { listing:"NYSE: ZBH", funding:"上市公司（不适用）", size:"约 18,000+ 人（全球）", workplace:"美国（具体城市待确认）", commute:"海外岗位；不适用新小岩日常通勤", salary:"约 ¥10–17M（估算）" },
  "CMR Surgical": { listing:"未上市", funding:"Series F：超过 US$200M（2025-04）", size:"待确认", workplace:"英国·剑桥（岗位具体地点待确认）", commute:"海外岗位；不适用新小岩日常通勤", salary:"待确认" },
  "ECOVACS": { listing:"上交所 603486", funding:"上市公司（不适用）", size:"约 5,000+ 人（全球）", workplace:"苏州·吴中区（公司总部；具体岗位另列）", commute:"海外岗位；不适用新小岩日常通勤", salary:"待确认" },
  "BangBang Robotics": { listing:"未上市", funding:"Series B：约 ¥1 亿（2022-06）", size:"待确认", workplace:"上海·松江区中辰路188号", commute:"海外岗位；不适用新小岩日常通勤", salary:"约 RMB 300–500k（估算）" },
  "万拿机器人": { listing:"未上市（天使期）", funding:"天使期；最近一轮与金额未公开", size:"约 20–99 人", workplace:"北京·大兴区天和西路28号（以 offer 为准）", commute:"海外岗位；不适用新小岩日常通勤", salary:"约 RMB 180–300k" },
  "OMRON": { listing:"东证 Prime 6645", funding:"上市公司（不适用）", size:"约 28,000+ 人（全球）", workplace:"京都·下京区塩小路通堀川东入（京都事業所/总部）", commute:"跨城；以 Google Maps 出发时刻为准", salary:"约 ¥8–13M（估算）" },
  "Unitree Robotics": { listing:"上交所科创板（688836）", funding:"上市公司（不适用）", size:"待确认", workplace:"杭州·滨江区（具体园区待确认）", commute:"海外岗位；不适用新小岩日常通勤", salary:"待确认" },
  "SoftBank Robotics": { listing:"未上市（SoftBank Group 体系）", funding:"集团资本配置；无独立融资轮次披露", size:"待确认", workplace:"东京·港区（具体办公室/团队待确认）", commute:"办公区待确认后再计算", salary:"待确认" },
  "Telexistence": { listing:"未上市", funding:"最近资本合作：Ricoh（2026-07，金额未公开）；此前 Series B US$170M（2023）", size:"待确认", workplace:"东京（具体区待确认）", commute:"办公区待确认后再计算", salary:"待确认" },
  "Preferred Robotics": { listing:"未上市（Preferred Networks 子公司）", funding:"战略投资 ¥6 亿（2022）；最新独立轮次未公开", size:"待确认", workplace:"东京·千代田区大手町（大手町大厦）", commute:"约 24 分钟（Google Maps 公交；抓取于 2026-08-23）", salary:"待确认" },
  "Ascent Robotics": { listing:"未上市", funding:"Series B（2022；金额未公开）", size:"约 28 人（2025-03）", workplace:"东京·涩谷区广尾（Tech Hiroo）", commute:"Google Maps 路线见链接（随出发时间变化）", salary:"待确认" },
  "Terra Drone": { listing:"东证 Growth（278A）", funding:"上市公司（不适用）", size:"待确认", workplace:"东京·涩谷区南平台町（A-PLACE Shibuya Nanpeidai）", commute:"约 35–50 分钟（办公地路线待实时确认）", salary:"待确认" },
  "SENSYN ROBOTICS": { listing:"未上市", funding:"最新公开大额融资：约 ¥22.5 亿（2023-11）；其后为战略资本合作", size:"108 人（2026-03）", workplace:"东京·品川区大井（住友不动产大井町站前大厦）", commute:"Google Maps 路线见链接（随出发时间变化）", salary:"待确认" },
  "DENSO": { listing:"东证 Prime（6902）", funding:"上市公司（不适用）", size:"约 160,000+ 人（全球）", workplace:"爱知·刈谷市（岗位实际办公地待确认）", commute:"跨城；不适用新小岩日常通勤", salary:"待确认" },
  "Yaskawa Electric": { listing:"东证 Prime（6506）", funding:"上市公司（不适用）", size:"约 13,000+ 人（全球）", workplace:"福冈·北九州市八幡西区（总部；岗位实际地点待确认）", commute:"跨城；不适用新小岩日常通勤", salary:"待确认" },
  "Kawasaki Heavy Industries": { listing:"东证 Prime（7012）", funding:"上市公司（不适用）", size:"约 40,000+ 人（全球）", workplace:"兵库·神户市中央区（机器人团队地点待确认）", commute:"跨城；不适用新小岩日常通勤", salary:"待确认" },
  "FANUC": { listing:"东证 Prime（6954）", funding:"上市公司（不适用）", size:"约 10,000+ 人（全球）", workplace:"山梨·忍野村（总部；岗位实际地点待确认）", commute:"跨城；不适用新小岩日常通勤", salary:"待确认" },
  "DOBOT": { listing:"未上市", funding:"最近公开轮次与金额未核验", size:"待确认", workplace:"深圳·南山区（具体园区待确认）", commute:"海外岗位；不适用新小岩日常通勤", salary:"待确认" },
  "Tencent Games / Level Infinite": { listing:"港交所（0700；Tencent 集团）", funding:"上市公司（不适用）", size:"大型全球游戏事业群（团队人数未单列）", workplace:"深圳·南山区（岗位页披露 China-Shenzhen）", commute:"跨国岗位；不适用新小岩日常通勤", salary:"待确认" },
  "Garena Japan": { listing:"NYSE: SE（Sea 集团；日本法人未独立上市）", funding:"上市公司集团（不适用）", size:"日本法人约 2 人（2026-02 公开招聘资料）", workplace:"东京（岗位页未披露区）", commute:"办公区待确认后再计算", salary:"约 ¥7–12M（公开招聘区间）" },
  "Xsolla": { listing:"未上市", funding:"最近公开融资轮次与金额未披露", size:"全球游戏商业化平台（日本团队规模待确认）", workplace:"东京（岗位页未披露区）", commute:"办公区待确认后再计算", salary:"待确认" },
  "Sony Interactive Entertainment": { listing:"未上市（Sony Group 旗下；母公司东证 Prime 6758）", funding:"母公司资本支持；无独立融资轮次披露", size:"全球游戏平台主管（岗位团队规模待确认）", workplace:"东京（岗位页未披露区）", commute:"办公区待确认后再计算", salary:"待确认" },
  "PSP": { listing:"未上市（TechMatrix 东证 Prime 3762 子公司）", funding:"母公司资本支持；无独立融资轮次披露", size:"498 人（2026-04-01）", workplace:"东京·港区港南（品川シーズンテラス）", commute:"约 35–45 分钟（Google Maps 公交；随出发时间变化）", salary:"¥10–12M（职位公开区间）" },
  "BD": { listing:"NYSE: BDX", funding:"上市公司（不适用）", size:"约 70,000+ 人（全球；日本法人规模未单列）", workplace:"东京·港区赤坂（赤坂ガーデンシティ）", commute:"约 40–55 分钟（Google Maps 公交；随出发时间变化）", salary:"未公开" },
  "Google": { listing:"NASDAQ: GOOGL / GOOG（Alphabet）", funding:"上市公司（不适用）", size:"约 180,000+ 人（全球；日本团队未单列）", workplace:"东京·涩谷区涩谷（Shibuya Stream）", commute:"约 35–50 分钟（Google Maps 公交；随出发时间变化）", salary:"未公开" },
  "Amazon Web Services (AWS)": { listing:"NASDAQ: AMZN（Amazon 旗下）", funding:"母公司资本支持；无独立融资轮次披露", size:"约 1,500,000+ 人（Amazon 全球；AWS Japan 团队未单列）", workplace:"东京·区待确认（官方职位页仅披露 Tokyo）", commute:"办公区待确认；Google Maps 公交时间随实际办公地与出发时间变化", salary:"未公开" },
};
export const detailsFor = (candidate: Candidate): CompanyDetail => companyDetails[candidate.company] ?? { listing:"待确认", funding:"待确认", size:"待确认", workplace:`${candidate.location}（实际办公地待确认）`, commute:"实际办公地待确认后再计算", salary:"约 ¥8–14M（估算）" };
const japanCompanies = new Set([
  "Ubie", "JMDC", "HOKUTO", "Mujin", "Woven by Toyota", "Rapyuta Robotics", "Prox Industries", "inaho", "MI-6", "OMRON", "SoftBank Robotics", "Telexistence", "Preferred Robotics", "Ascent Robotics", "Terra Drone", "SENSYN ROBOTICS", "DENSO", "Yaskawa Electric", "Kawasaki Heavy Industries", "FANUC", "Sony Interactive Entertainment", "Linc'well", "DeNA / DeSC Healthcare", "medimo", "Dr.JOY", "PSP",
]);
const mainlandChinaCompanies = new Set([
  "MicroPort MedBot", "ECOVACS", "BangBang Robotics", "万拿机器人", "Unitree Robotics", "DOBOT", "Tencent Games / Level Infinite",
]);
const workplaceRisks: Record<string, string> = {
  "Ubie":"医疗机构导入周期、数据/合规与初创阶段的职能宽度。", "JMDC":"药企项目/客户交付压力与集团整合后的优先级变化。", "HOKUTO":"小团队商业化节奏、药企客户集中度与岗位边界。", "Mujin":"硬件资本开支、现场部署峰值与全球供应链。", "Woven by Toyota":"大企业治理、产品重组与决策速度。", "Rapyuta Robotics":"融资依赖、仓储现场交付与客户项目集中。", "Prox Industries":"早期跑道、岗位定义与薪酬/股权透明度。", "inaho":"农业季节性、远距离现场与早期商业化。", "MI-6":"材料研发客户的长销售周期与项目制交付。", "Entegris":"半导体周期、全球组织矩阵与客户现场要求。", "Intuitive Surgical":"临床/医院准入、现场培训与合规责任。", "Medtronic":"大矩阵组织、业务单元差异与临床现场负荷。", "MicroPort MedBot":"中国医疗器械审批、海外扩张执行与薪酬职级错配。", "Zimmer Biomet":"骨科周期、渠道/临床依赖与跨区协同。", "CMR Surgical":"未上市融资与手术机器人商业化、跨国签证。", "ECOVACS":"消费硬件竞争、海外渠道 KPI 与发布节奏。", "BangBang Robotics":"早期融资、GTM 与项目交付并行的强度。", "万拿机器人":"天使期跑道、股权兑现与高强度客户拓展。", "OMRON":"大型制造业决策层级、自动化周期和京都出勤。", "Unitree Robotics":"高速扩张、产品成熟度、出口/合规与岗位具体性。", "SoftBank Robotics":"产品线稳定性、集团战略与部署支持负荷。", "Telexistence":"资本跑道、零售部署可靠性与客户集中。", "Preferred Robotics":"研究到商业化转换、母公司协同与岗位实际授权。", "Ascent Robotics":"小团队跑道、自动驾驶商业化周期与现场比例。", "Terra Drone":"无人机监管、出差与项目交付波动。", "SENSYN ROBOTICS":"公共部门采购周期、融资与项目型现金流。", "DENSO":"汽车/制造周期、组织层级和爱知/海外驻在要求。", "Yaskawa Electric":"工业资本开支周期、福冈基地与大组织晋升速度。", "Kawasaki Heavy Industries":"重工业周期、兵库基地和部门间决策速度。", "FANUC":"制造业/出口周期、山梨基地与岗位地点限制。", "DOBOT":"协作机器人同质化、海外渠道 quota 与深圳强度。", "Tencent Games / Level Infinite":"深圳高强度、游戏项目/投资组合波动与岗位门槛。", "Garena Japan":"日本实体极小、个人依赖、IP 交易节奏与薪资上限。", "Xsolla":"未上市平台的区域资源优先级与角色是否偏 sales enablement。", "Sony Interactive Entertainment":"内容组合/平台周期、大组织跨区域决策和营销绩效压力。",
  "PSP":"医疗 AI 的技术/法规门槛、可能出向至 Medmain，以及管理监督者岗位的长期责任。",
  "BD":"医疗器械产品营销履历门槛、线下办公，以及销售/KOL/学会协同带来的上市周期压力。",
  "Google":"游戏行业与伙伴网络门槛、跨时区协作，以及大型平台的高标准谈判和绩效压力。",
  "Amazon Web Services (AWS)":"需要日本企业科技网络与云/半导体/机器人领域实绩；高价值商机推进、C-suite 沟通和跨时区协作强度待核验。",
};
export const workplaceSignalFor = (candidate: Candidate): WorkplaceSignal => {
  const platform = japanCompanies.has(candidate.company) ? "OpenWork" : mainlandChinaCompanies.has(candidate.company) ? "脉脉 / 天眼查 / 企查查" : "Glassdoor";
  const verifiedScores: Record<string, string> = {
    "JMDC":"4.55 / 5（公开搜索快照；样本/日期待面谈复核）", "OMRON":"3.17 / 5（OpenWork 公开页快照）", "Medtronic":"3.7 / 5（Glassdoor，10,031 条全球评价）", "Garena Japan":"日本实体样本不足", "Anker Japan":"3.47 / 5（OpenWork；119 条快照）", "BD":"3.9 / 5（Glassdoor，5,361 条全球评价；日本样本未单列）",
  };
  return { platform, score: verifiedScores[candidate.company] ?? "未检索到可核验的同名评分/样本不足", risk: workplaceRisks[candidate.company] ?? "公开职场样本不足；在面试中核验经理、工时、决策权、现金跑道与组织变动。" };
};
export const mapsDirectionsUrl = (workplace: string) => `https://www.google.com/maps/dir/?api=1&origin=${encodeURIComponent("新小岩駅")}&destination=${encodeURIComponent(workplace)}&travelmode=transit`;

export const existingRadarKeys = new Set([
  "flatiron health|strategic partnerships senior manager", "jmdc|制药业务战略・解决方案 business produce", "syneos health|sr. strategic project manager", "hokuto|solution strategist", "prevent|cso / corporate planning director", "contrea|制药业务负责人", "boehringer ingelheim（人药）|healthcare affairs planning", "coopervision|commercial operations specialist", "alcon|commercial excellence solutions analyst", "boehringer ingelheim animal health|commercial technology & analytics manager", "johnson & johnson medtech|business analytics & market intelligence specialist", "stryker|senior manager, commercial solutions",
]);

export const candidates: Candidate[] = [
  { id:"a-ubie-cs", track:"A", company:"Ubie", title:"カスタマーサクセスマネージャー（病院DX）", href:"https://herp.careers/v1/ubiehr/QLFY7hOWBA1b", source:"公司官网", location:"日本", roleType:"客户采用 / 部署经营", why:"直接连接医疗现场的活用定着与自律运营，符合主线 A 的 HealthTech 采用入口。", gate:"确认是否拥有采用 KPI、产品反馈与合理的现场/工时边界。", verdict:"优先审阅" },
  { id:"a-ubie-alliance", track:"A", company:"Ubie", title:"事業開発（アライアンス）", href:"https://herp.careers/v1/ubiehr/3gAfQex6qWc1", source:"公司官网", location:"日本", roleType:"既有伙伴激活 / 新业务", why:"产品、方案、合作与项目推进兼具，是医疗行业事实和商业化资本的入口。", gate:"核验新伙伴陌生开发占比；需有合同、采用或产品输入，而非关系维护。", verdict:"优先审阅" },
  { id:"a-ubie-newbiz", track:"A", company:"Ubie", title:"事業開発（新規事業責任者候補）", href:"https://herp.careers/v1/ubiehr", source:"公司官网", location:"日本", roleType:"产品商业化 / 新业务经营", why:"面向医疗机构、药企与自治体的产品化和协作，贴近路线图的第二跳能力。", gate:"职级可能偏高；只在职责可拆分、现金与团队质量通过时推进。", verdict:"条件式" },
  { id:"a-ubie-pm", track:"A", company:"Ubie", title:"シニアプロダクトマネージャー（ファーマ）", href:"https://herp.careers/v1/ubiehr", source:"公司官网", location:"日本", roleType:"医疗产品管理", why:"能积累药企、数据产品与产品路线图事实。", gate:"确认不要求成熟 PdM 技术履历；需拥有发布与采用，而不是内部协调。", verdict:"条件式" },
  { id:"a-ubie-account", track:"A", company:"Ubie", title:"Account Sales（病院事業）", href:"https://herp.careers/v1/ubiehr/YqzT_AkpVhBs", source:"公司官网", location:"日本", roleType:"医疗机构解决方案", why:"可直接建立医院工作流和采购证据。", gate:"岗位含销售成分；若个人陌生开发与 quota 是核心则不采用。", verdict:"暂不建议" },
  { id:"a-jmdc-newbiz", track:"A", company:"JMDC", title:"新規事業開発（臨床開発領域DX）", href:"https://herp.careers/careers/companies/jmdc/jobs/h4-cmnvyg74l030p2a0ft7p82p27", source:"公司官网", location:"东京", roleType:"医疗数据新业务", why:"数据、产品、药企/支付方与集团协同，能形成路线图所需行业事实。", gate:"确认有明确产品/客户结果，而不是纯集团战略或 PMI。", verdict:"优先审阅" },
  { id:"a-jmdc-pdm", track:"A", company:"JMDC", title:"プロダクトマネージャー（医药数据工具）", href:"https://herp.careers/careers/companies/jmdc/jobs/h4-cmpla6kwk005d370gbo015edp", source:"公司官网", location:"东京", roleType:"产品 Owner / 客户采用", why:"开发、销售与既有客户之间的产品优先级和活用扩张，符合主线 A 的跳 1。", gate:"确认技术要求可由业务型 Product Owner 覆盖，且拥有 roadmap/发布。", verdict:"优先审阅" },
  { id:"a-jmdc-pm", track:"A", company:"JMDC", title:"シニアプロジェクトマネージャー（新規AIプロダクト）", href:"https://herp.careers/careers/companies/jmdc/jobs/h4-cmn93eqhs031h2o0f1as4tgcj", source:"公司官网", location:"东京", roleType:"AI 产品开发 / 跨职能交付", why:"进入医疗大数据与 AI 产品创造，具备高价值行业门槛。", gate:"避免退化为纯项目管理；要求具备产品发布、采用或业务指标。", verdict:"条件式" },
  { id:"a-jmdc-bizlead", track:"A", company:"JMDC", title:"事業責任者候補（ポストコンサル）", href:"https://herp.careers/careers/companies/jmdc/jobs/h4-cmhdlnro9031ys607s4t59odt", source:"公司官网", location:"东京", roleType:"新业务经营", why:"从策略到 PoC、产品和经营的完整范围，与终局方向相符。", gate:"很可能超出第一跳可达性；只作为拉伸申请或推荐制机会。", verdict:"条件式" },
  { id:"a-hokuto-am", track:"A", company:"HOKUTO", title:"アカウントマネージャー", href:"https://herp.careers/careers/companies/hokuto/jobs/1otFciqrvxVX", source:"公司官网", location:"东京 / 远程", roleType:"药企解决方案 / 客户经营", why:"医疗平台与药企方案能够补充客户、合同和商业化事实。", gate:"公开描述含新客户开拓；仅在既有账户/方案经营为主时采用。", verdict:"条件式" },
  { id:"a-psp-aipdm", track:"A", company:"PSP", title:"AI Product Manager / Director（病理 AI 产品战略）", href:"https://doda.jp/DodaFront/View/JobSearchDetail/j_jid__3015773821/", source:"公开招聘平台", location:"东京·港区港南", workplace:"东京·港区港南（品川シーズンテラス）", commute:"约 35–45 分钟（Google Maps 公交；随出发时间变化）", roleType:"病理 AI 产品战略 / 路线图 / 法规", why:"公司官网与公开职位均可核验：该角色将病理 AI 的路线图、客户需求、验证/质量与医疗器械法规连接到事業化，且职位公开年收 ¥10–12M；对医疗 AI 的长期产品组合价值极高。", gate:"岗位明确要求 AI/ML PdM、医疗 AI BD 或 AI 事業责任者经历，以及可与 ML 工程师讨论的技术理解和路线图经验；且可能出向 Medmain，因此不是当前第一跳。", verdict:"条件式", stage:"长期目标", scannedOn:"2026-08-25" },
  { id:"b-mujin-srpm", track:"B", company:"Mujin", title:"Senior Product Manager", href:"https://jobs.lever.co/mujininc?location=Tokyo%2C+Japan+%28MJHQ%29", source:"公司官网", location:"东京（现场）", roleType:"工业机器人产品管理", why:"全球化工业机器人平台，产品路线图和客户工作流资本强。", gate:"现场办公明显；确认职责覆盖发布与采用，不只是硬件供应链。", verdict:"条件式" },
  { id:"b-mujin-hwpm", track:"B", company:"Mujin", title:"Product Manager, Hardware Lifecycle & Supply Chain", href:"https://jobs.lever.co/mujininc/d1f8be48-c090-4c3f-ab4a-f3efc0c3e701", source:"公司官网", location:"东京（现场）", roleType:"硬件产品管理", why:"能获得机器人硬件、供应链与合规事实，是物理 AI 的可迁移资本。", gate:"岗位偏供应链；若没有客户价值、产品决策或发布所有权则降权。", verdict:"条件式" },
  { id:"b-woven-pm", track:"B", company:"Woven by Toyota", title:"Project Manager, Robot PF Biz & Strategy", href:"https://jobs.lever.co/woven-by-toyota/356811fb-b4e9-4d77-92be-9be288b278ca", source:"公司官网", location:"东京 / 静冈裾野", roleType:"机器人平台商业化", why:"产品、GTM、伙伴、商业模型与 P&L 可同时积累。", gate:"可能转往裾野且现场频繁；不满足东京基地红线时不采用。", verdict:"暂不建议" },
  { id:"b-woven-tpm", track:"B", company:"Woven by Toyota", title:"Technical Product Manager, Robot Platform", href:"https://jobs.lever.co/woven-by-toyota/9d2001ad-7fef-4bd5-8628-40faa6fa31d1", source:"公司官网", location:"东京（混合）", roleType:"机器人产品管理", why:"客户问题到产品化的接口，符合 B 路径 P。", gate:"需要技术深度；先核验是否接受业务型产品/商业化背景。", verdict:"条件式" },
  { id:"b-woven-delivery", track:"B", company:"Woven by Toyota", title:"Project Manager, Robot Delivery Service", href:"https://jobs.lever.co/woven-by-toyota?location=Tokyo", source:"公司官网", location:"东京 / 静冈裾野", roleType:"机器人部署经营", why:"机器人服务上线和采用可形成路线图中路径 D 的证据。", gate:"地点与出差风险同样存在；只在东京长期基地书面确认时考虑。", verdict:"暂不建议" },
  { id:"b-woven-cs", track:"B", company:"Woven by Toyota", title:"Customer Success and Deployment Strategist", href:"https://jobs.lever.co/woven-by-toyota?location=Tokyo", source:"公司官网", location:"东京（混合）", roleType:"实体系统部署 / 客户采用", why:"虽非纯机器人，但属于物理系统部署与客户价值的可迁移入口。", gate:"确认产品化与客户采用占比，避免长期项目协调。", verdict:"条件式" },
  { id:"b-rapyuta-pm", track:"B", company:"Rapyuta Robotics", title:"Product Manager, WMS / ASRS", href:"https://www.rapyuta-robotics.com/careers/", source:"公司官网", location:"东京", roleType:"仓储机器人产品管理", why:"直接对应路径 P：产品、仓储场景、上线与客户 ROI。", gate:"官网职位状态需再次核验；只考虑拥有 roadmap、发布和采用的范围。", verdict:"优先审阅" },
  { id:"b-prox-pm", track:"B", company:"Prox Industries", title:"Physical AI 项目经理", href:"https://herp.careers/v1/prox/1CSDkQXCL-AY", source:"公司官网", location:"日本", roleType:"Physical AI 社会实施", why:"客户现场与技术团队之间的社会实施能力，与实体 AI 主线高度一致。", gate:"JD 对技术背景要求较高且项目制风险大；缺少产品所有权则不采用。", verdict:"条件式" },
  { id:"b-inaho-pm", track:"B", company:"inaho", title:"项目经理（AI机器人共同开发）", href:"https://herp.careers/v1/inaho/QKd05pIorFz_", source:"公司官网", location:"日本", roleType:"AI 机器人共同开发", why:"从现场问题到验证的跨域工作，具备农业机器人和全球化期权。", gate:"高度技术型共同开发；不适合作为无工程履历的第一优先。", verdict:"暂不建议" },
  { id:"b-mi6-pdm", track:"B", company:"MI-6", title:"产品经理（材料 AI / 机器人）", href:"https://herp.careers/careers/companies/misix/jobs/MlxZn4DKlf9d", source:"公司官网", location:"日本", roleType:"研发基础设施产品", why:"将 AI、自动化与实体研发流程连接，具备全球可迁移性。", gate:"与机器人客户部署的距离较远；仅在产品 Owner 范围明确时审阅。", verdict:"条件式" },
  { id:"b-linkedin-entegris", track:"B", company:"Entegris", title:"Regional Product Manager", href:"https://www.linkedin.com/jobs/view/4401545917/", source:"LinkedIn MCP", location:"东京（现场）", roleType:"实体制造产品 / 区域经营", why:"LinkedIn 搜索发现的实体制造产品岗位，包含关键客户、产品改进、跨职能执行与工厂 P&L 议题，是机器人主线的邻接性桥梁。", gate:"非直接机器人；现场办公与制造业经验要求较强，只作条件式桥梁。", verdict:"条件式" },
  {id:"a-intuitive-pmm",track:"A",company:"Intuitive Surgical",title:"Product Marketing Manager（da Vinci）",href:"https://careers.intuitive.com/jp/jobs/744000138823961/JOB216930/product-marketing-manager/",source:"公司官网",location:"东京（现场）",roleType:"手术机器人产品上市 / 本地化",why:"当前职位负责 da Vinci 的日本新品上市、定价、销售预测、本地价值主张与发布后优化，是主线 A 最直接的产品商业化入口。",gate:"要求医疗器械产品营销经验；核验现金、团队层级与是否可将既有 GTM 经验证明为等价能力。",verdict:"优先审阅",scannedOn:"2026-08-23"},
  {id:"a-intuitive-ion-access",track:"A",company:"Intuitive Surgical",title:"Senior Manager, Japan Evidence & Access Strategy – Ion",href:"https://careers.intuitive.com/jp/jobs/744000138825309/JOB215547/senior-manager-japan-evidence-access-strategy-ion/",source:"公司官网",location:"东京（现场）",roleType:"医疗机器人市场准入 / 证据战略",why:"连接临床证据、支付方、市场准入和采用扩张，且覆盖 APAC；与罕见病市场推出经验有高价值的相邻性。",gate:"10 年+ HEOR/医疗器械市场准入及带人要求很高，作为拉伸申请。",verdict:"条件式",scannedOn:"2026-08-23"},
  {id:"a-medtronic-surgical",track:"A",company:"Medtronic",title:"Senior Product Specialist, Surgical",href:"https://medtronic.wd1.myworkdayjobs.com/medtroniccareers/job/Tokyo-Tokyo-Japan/Senior-Product-Specialist--Surgical---Tokyo-_R70366",source:"公司官网",location:"东京",roleType:"手术平台日本商业化",why:"把全球 Surgical 商业化计划转为日本上市与增长计划，业务组合含机器人辅助手术平台。",gate:"确认该岗位仍开放、是否偏临床器械背景，以及薪资能否达标。",verdict:"优先审阅",scannedOn:"2026-08-23"},
  {id:"a-microport-overseas",track:"A",company:"MicroPort MedBot",title:"海外市场专员",href:"https://www.linkedin.com/jobs/view/4439642517/",source:"LinkedIn MCP",location:"上海",roleType:"手术机器人海外市场 / KOL",why:"海外市场、KOL、学术活动、销售支持与竞争情报，是中国手术机器人国际化的低门槛商业入口。",gate:"公开区间明显低于当前基线且职级偏初级；仅作进入行业或谈更高职级的参考。",verdict:"条件式",scannedOn:"2026-08-23"},
  {id:"a-zimmer-commercial",track:"A",company:"Zimmer Biomet",title:"Commercial Enablement & Marketing Technology",href:"https://careers.zimmerbiomet.com/us/en/job/10226/Business-Systems-Associate-Director-Commercial-Enablement-Marketing-Technology",source:"公司官网",location:"全球 / 远程视岗位",roleType:"骨科机器人商业卓越",why:"ROSA 机器人平台所在公司已有商业赋能与营销技术职能，是从商业分析切入医疗机器人生态的可迁移路径。",gate:"该具体链接为近期职位证据；先确认当前开放地区及是否接受日本/中国候选人。",verdict:"条件式",scannedOn:"2026-08-23"},
  {id:"a-cmr-commercial",track:"A",company:"CMR Surgical",title:"Commercial / Customer Success / Medical Affairs",href:"https://us.cmrsurgical.com/job-search",source:"公司官网",location:"英国 / 全球",roleType:"手术机器人商业化与客户采用",why:"Versius 的招聘体系明确覆盖 Commercial、Customer Success 与 Medical Affairs，可建立手术机器人部署和采用资本。",gate:"当前公开岗位的地域以英国和其他市场为主；只在非纯猎手、地点和签证可行时审阅。",verdict:"条件式",scannedOn:"2026-08-23"},
  {id:"b-ecovacs-apj",track:"B",company:"ECOVACS",title:"Marketing Supervisor, APJ",href:"https://www.ecovacs.com/sg/careers/job-detail?id=4",source:"公司官网",location:"新加坡",workplace:"新加坡·Kent Ridge（岗位页披露）",commute:"海外岗位；不适用新小岩日常通勤",roleType:"服务机器人区域产品上市",why:"当前岗位覆盖产品发布、GTM 协同、市场定位、渠道与线上/线下营销，是家用服务机器人全球化的直接入口。",gate:"确认新加坡工作许可、实际薪资及工作强度；职责偏品牌执行时降权。",verdict:"优先审阅",scannedOn:"2026-08-23"},
  {id:"b-ecovacs-emea",track:"B",company:"ECOVACS",title:"Brand Manager, EMEA",href:"https://www.ecovacs.com/de/careers/job-detail?id=91",source:"公司官网",location:"德国杜塞尔多夫",workplace:"德国·杜塞尔多夫（岗位页披露）",commute:"海外岗位；不适用新小岩日常通勤",roleType:"机器人品牌本地化 / 区域上市",why:"跨国本地化、产品发布、零售和电商协同，是从日本/中国走向全球的高迁移性商业化路径。",gate:"需要欧洲工作资格和多国营销经历；作为全球路线的第二跳候选。",verdict:"条件式",scannedOn:"2026-08-23"},
  {id:"b-bangbang-gtm",track:"B",company:"BangBang Robotics",title:"GTM（智能辅助出行）",href:"https://www.bangbangrobotics.com/job/236.html",source:"公司官网",location:"上海",roleType:"康复机器人产品 GTM",why:"负责产品全生命周期、上市策略、渠道、量价预测和海外市场，连接医疗/养老与实体智能。",gate:"确认团队节奏、出差频率及可获得的产品商业化所有权；中国现金需满足底线。",verdict:"优先审阅",scannedOn:"2026-08-23"},
  {id:"b-wana-gtm",track:"B",company:"万拿机器人",title:"GTM 经理（具身智能）",href:"https://www.zhaopin.com/jobdetail/CCL1502557420J40894259713.htm",source:"公开招聘平台",location:"北京",roleType:"工业具身智能 GTM",why:"岗位覆盖定位、定价、渠道、销售赋能、上市 readiness 与产品反馈，是最完整的具身智能商业化职能之一。",gate:"天使期团队、高强度与个人结果压力都较高；须核验股权、工时和现金补偿。",verdict:"条件式",scannedOn:"2026-08-23"},
  {id:"b-omron-pmm",track:"B",company:"OMRON",title:"AMR / Cobot 产品营销（日本市场）",href:"https://job.axol.jp/qd/c/omron/public/job/detail/0zr5YAPeRlJGnF-hg",source:"公司官网",location:"京都",roleType:"工业机器人产品市场展开",why:"当前岗位将 AMR/Cobot 的客户场景、销售策略、伙伴协同和产品改进闭环，是主线 B 的优质非工程入口。",gate:"需补足机器人/FA 技术理解；京都现已在可接受地点范围内。",verdict:"优先审阅",scannedOn:"2026-08-23"},
  {id:"b-unitree-global-market",track:"B",company:"Unitree Robotics",title:"海外市场 / 全球渠道",href:"https://www.unitree.com/about/",source:"公司官网",location:"杭州 / 全球",roleType:"人形与足式机器人全球商业化",why:"消费级与行业级足式/人形机器人兼具，全球销售与渠道业务是中日能力的高迁移入口。",gate:"官网需确认具体开放职位；避免纯代理销售或要求深度技术售前的范围。",verdict:"条件式",scannedOn:"2026-08-23"},
  {id:"b-unitree-application",track:"B",company:"Unitree Robotics",title:"产品应用 / 行业解决方案",href:"https://www.unitree.com/about/",source:"公司官网",location:"杭州 / 全球",roleType:"机器人场景产品化",why:"连接客户场景、产品能力与全球落地，是从 GTM 转入具身智能真实部署的桥梁。",gate:"仅在岗位有产品/客户成功所有权而非纯技术支持时采用。",verdict:"条件式",scannedOn:"2026-08-23"},
  {id:"b-softbank-pm",track:"B",company:"SoftBank Robotics",title:"Product Marketing / Product Manager",href:"https://www.softbankrobotics.com/careers/",source:"公司官网",location:"东京 / 全球",roleType:"服务机器人产品商业化",why:"服务机器人公司通常需要产品定位、合作伙伴、行业方案与上线采用，商业化背景可直接迁移。",gate:"先核验当前开放职位、产品线稳定性与个人 quota 占比。",verdict:"条件式",scannedOn:"2026-08-23"},
  {id:"b-softbank-cs",track:"B",company:"SoftBank Robotics",title:"Customer Success / Deployment",href:"https://www.softbankrobotics.com/careers/",source:"公司官网",location:"东京 / 全球",roleType:"服务机器人部署采用",why:"机器人上线、客户价值证明和产品反馈是实体 AI 的核心护城河。",gate:"确认不是高频现场救火或纯项目协调，且具备合理的远程/现场边界。",verdict:"条件式",scannedOn:"2026-08-23"},
  {id:"b-telexistence-bd",track:"B",company:"Telexistence",title:"Business Development / Partnerships",href:"https://www.telexistence.com/careers",source:"公司官网",location:"东京",roleType:"远程操作机器人商业化",why:"零售机器人从方案、伙伴到部署的商业化路径，适合补足实体系统 GTM 资本。",gate:"核验商业模式、公司资金跑道、出差和个人销售目标。",verdict:"条件式",scannedOn:"2026-08-23"},
  {id:"b-telexistence-pm",track:"B",company:"Telexistence",title:"Product Manager / Deployment Strategy",href:"https://www.telexistence.com/careers",source:"公司官网",location:"东京",roleType:"机器人产品与规模部署",why:"在客户工作流和产品路线图之间建立闭环，是主线 B 的直接产品化入口。",gate:"官网需核验开放性；需确认岗位不要求工程背景或全天候现场支持。",verdict:"条件式",scannedOn:"2026-08-23"},
  {id:"b-preferred-bd",track:"B",company:"Preferred Robotics",title:"Business Development / 事業開発",href:"https://www.preferred-robotics.jp/recruit/",source:"公司官网",location:"东京",roleType:"机器人产品事業开发",why:"以研究型机器人技术走向客户和产业合作的路径，能补足 AI 到实体产品的商业化经验。",gate:"确认是否为真实产品商业化范围，而非研究合作募资或纯销售。",verdict:"条件式",scannedOn:"2026-08-23"},
  {id:"b-preferred-pm",track:"B",company:"Preferred Robotics",title:"Product Manager / Product Planning",href:"https://www.preferred-robotics.jp/recruit/",source:"公司官网",location:"东京",roleType:"机器人产品规划",why:"将客户需求、产品定义和 AI/机器人技术团队连接，是长期进入 physical AI 的好跳板。",gate:"须确认开放岗位与经验要求，避免只面向深度机器人研发履历。",verdict:"条件式",scannedOn:"2026-08-23"},
  {id:"b-ascent-bd",track:"B",company:"Ascent Robotics",title:"Business Development / Strategic Partnerships",href:"https://www.ascent.ai/careers",source:"公司官网",location:"东京",roleType:"自主移动系统伙伴商业化",why:"自主系统的伙伴、客户场景和市场进入可形成具身 AI 商业化证据。",gate:"先确认日本实体岗位与业务成熟度；不接受以陌生开发 quota 为核心的版本。",verdict:"条件式",scannedOn:"2026-08-23"},
  {id:"b-ascent-cs",track:"B",company:"Ascent Robotics",title:"Customer Success / Program Manager",href:"https://www.ascent.ai/careers",source:"公司官网",location:"东京",roleType:"自主系统部署采用",why:"部署、采用和客户反馈闭环是低技术门槛但高壁垒的物理 AI 入口。",gate:"核验在招状态、现场比例以及是否有明确客户成果指标。",verdict:"条件式",scannedOn:"2026-08-23"},
  {id:"b-terra-bd",track:"B",company:"Terra Drone",title:"Business Development（无人机 / 机器人）",href:"https://terra-drone.net/recruit/",source:"公司官网",location:"东京 / 全球",roleType:"空中机器人业务开发",why:"无人机是具身智能的可迁移分支；全球项目、监管和场景商业化都能建立稀缺资本。",gate:"确认不是重 sales quota 或高频长期出差，及岗位对海外驻在的要求。",verdict:"条件式",scannedOn:"2026-08-23"},
  {id:"b-terra-pm",track:"B",company:"Terra Drone",title:"Product Manager / 新规事業",href:"https://terra-drone.net/recruit/",source:"公司官网",location:"东京 / 全球",roleType:"无人机产品商业化",why:"将飞行数据、监管、客户工作流和产品路线图结合，是 B 主线的相邻产品岗位。",gate:"官网需核验职位开放性；优先具备产品发布而非纯项目交付的范围。",verdict:"条件式",scannedOn:"2026-08-23"},
  {id:"b-sensyn-bd",track:"B",company:"SENSYN ROBOTICS",title:"Business Development / 事業開発",href:"https://www.sensyn-robotics.com/recruit/",source:"公司官网",location:"东京",roleType:"自治体与基础设施机器人商业化",why:"无人机、机器人和社会基础设施的客户场景可形成高壁垒的部署/GTM经验。",gate:"公共部门周期和出差可能较重；确认销售结构不是纯 hunter。",verdict:"条件式",scannedOn:"2026-08-23"},
  {id:"b-sensyn-pm",track:"B",company:"SENSYN ROBOTICS",title:"Product Manager / Solution Marketing",href:"https://www.sensyn-robotics.com/recruit/",source:"公司官网",location:"东京",roleType:"机器人解决方案产品化",why:"用客户任务定义产品和服务、再回传数据与需求，是实体 AI 的优质产品入口。",gate:"优先能拥有产品采用/收入 KPI 的岗位，回避纯投标文档角色。",verdict:"条件式",scannedOn:"2026-08-23"},
  {id:"b-denso-planning",track:"B",company:"DENSO",title:"Robotics Business Planning / Product Planning",href:"https://careers.denso.com/",source:"公司官网",location:"爱知 / 东京 / 全球",roleType:"工业机器人业务战略",why:"大型制造平台可提供机器人产品、全球供应链和客户场景的长期行业资本。",gate:"日本地点仅限东京/京都/大阪才作为当前候选；确认职能不退化为内部报告。",verdict:"条件式",scannedOn:"2026-08-23"},
  {id:"b-denso-market",track:"B",company:"DENSO",title:"Global Product Marketing / Market Development",href:"https://careers.denso.com/",source:"公司官网",location:"全球",roleType:"自动化产品全球市场进入",why:"全球制造与产品市场进入经验可迁移到机器人平台和智能硬件。",gate:"优先日本/中国/可行海外地点，且需避开长期驻厂或纯汽车 OEM 销售。",verdict:"条件式",scannedOn:"2026-08-23"},
  {id:"b-yaskawa-global",track:"B",company:"Yaskawa Electric",title:"Robotics Global Marketing / Overseas Business",href:"https://www.yaskawa-global.com/recruit",source:"公司官网",location:"福冈 / 东京 / 全球",roleType:"工业机器人全球市场",why:"全球工业机器人龙头的海外市场、产品与渠道岗位有强产业迁移性。",gate:"福冈非当前居住优先；仅在东京/京都/大阪或明确海外机会时进入深审。",verdict:"条件式",scannedOn:"2026-08-23"},
  {id:"b-yaskawa-pm",track:"B",company:"Yaskawa Electric",title:"Robotics Product Planning",href:"https://www.yaskawa-global.com/recruit",source:"公司官网",location:"福冈 / 东京 / 全球",roleType:"工业机器人产品规划",why:"产品定义、伙伴生态和客户应用有助于获得物理 AI 产业事实。",gate:"技术门槛可能高；验证能否以 GTM/产品经营而非控制工程背景切入。",verdict:"条件式",scannedOn:"2026-08-23"},
  {id:"b-kawasaki-biz",track:"B",company:"Kawasaki Heavy Industries",title:"Robotics Business Planning / Market Development",href:"https://www.khi.co.jp/recruit/",source:"公司官网",location:"东京 / 兵库 / 全球",roleType:"机器人业务经营",why:"工业/医疗相关机器人业务中的市场进入、伙伴与产品经营是可迁移的商业化资本。",gate:"兵库不在当前日本地点范围；确认东京/海外配置、职级及工时。",verdict:"条件式",scannedOn:"2026-08-23"},
  {id:"b-kawasaki-pm",track:"B",company:"Kawasaki Heavy Industries",title:"Robotics Product Marketing",href:"https://www.khi.co.jp/recruit/",source:"公司官网",location:"东京 / 兵库 / 全球",roleType:"机器人产品市场展开",why:"机器人产品上市与客户应用扩展能建立 B 主线所需的行业和采用资本。",gate:"只审阅拥有市场/产品结果的岗位，排除纯工程或长期驻厂版本。",verdict:"条件式",scannedOn:"2026-08-23"},
  {id:"b-fanuc-market",track:"B",company:"FANUC",title:"Global Marketing / Business Development",href:"https://www.fanuc.co.jp/en/recruit/",source:"公司官网",location:"山梨 / 东京 / 全球",roleType:"工业机器人全球商业化",why:"全球机器人龙头的海外客户、渠道与产品市场经验具有极强的行业护城河。",gate:"山梨不是常规可接受地点；仅审阅东京、海外或可远程的配置。",verdict:"条件式",scannedOn:"2026-08-23"},
  {id:"b-fanuc-pm",track:"B",company:"FANUC",title:"Robot Product Planning / Solution Business",href:"https://www.fanuc.co.jp/en/recruit/",source:"公司官网",location:"山梨 / 东京 / 全球",roleType:"工业机器人产品经营",why:"从客户自动化场景反推产品和解决方案，有利于建立产品化与 P&L 资本。",gate:"先确认职位开放、办公地与技术背景要求；不为品牌接受地点或工时失配。",verdict:"条件式",scannedOn:"2026-08-23"},
  {id:"b-dobot-overseas",track:"B",company:"DOBOT",title:"Overseas Market / Channel Development",href:"https://www.dobot-robots.com/career.html",source:"公司官网",location:"深圳 / 全球",roleType:"协作机器人海外市场",why:"协作机器人出海需要本地化、渠道、产品定位和客户应用，是中日/全球迁移性很强的入口。",gate:"确认现金、海外出差与个人销售目标；优先区域 GTM 而非纯经销商开拓。",verdict:"条件式",scannedOn:"2026-08-23"},
  {id:"b-dobot-pmm",track:"B",company:"DOBOT",title:"Product Marketing Manager（协作机器人）",href:"https://www.dobot-robots.com/career.html",source:"公司官网",location:"深圳 / 全球",roleType:"协作机器人产品上市",why:"机器人产品定位、场景化卖点和全球发布是与 Anker GTM 类似、但更贴近 B 主线的路径。",gate:"官网需核验实际岗位；确认不要求深度控制/自动化工程履历。",verdict:"条件式",scannedOn:"2026-08-23"},
  {id:"c-tencent-ugc-investment",track:"C",company:"Tencent Games / Level Infinite",title:"Strategic Investment Manager – UGC/KA",href:"https://tencent.wd1.myworkdayjobs.com/Tencent_Careers/job/China-Shenzhen/Strategic-Investment-Manager_R107748-2",source:"公司官网",location:"深圳",roleType:"游戏战略投资 / BD / 业务孵化",why:"约 2 年以上经验即可切入，直接参与全球游戏投资与 BD 机会评估、独立推进项目、业务孵化和 GTM；相比原 Senior Manager，更适合作为从战略/商业分析进入游戏生态的第一跳。",gate:"确认是否接受咨询/投行/PE/VC而非游戏背景；核验 UGC/内容型游戏理解、直属决策权、深圳现场强度、现金与长期激励。",verdict:"优先审阅",scannedOn:"2026-08-24"},
  {id:"c-tencent-investment",track:"C",company:"Tencent Games / Level Infinite",title:"Strategic Investment Manager",href:"https://tencent.wd1.myworkdayjobs.com/en-US/Tencent_Careers/job/--_R106186-2",source:"公司官网",location:"深圳",roleType:"全球游戏战略投资 / 投后 / 伙伴孵化",why:"连接全球工作室、战略投资、商务合作与产品孵化；对中日游戏市场判断、谈判和跨境生态建设的复利极高，适合作为游戏/IP 主线的高上限转向。",gate:"岗位通常要求游戏投资/BD生态与行业网络；确认是否存在日本市场覆盖、交易执行权、项目来源 ownership 与匹配的现金/长期激励。",verdict:"条件式",scannedOn:"2026-08-24"},
  {id:"c-garena-licensing",track:"C",company:"Garena Japan",title:"Business Development / 版権商务",href:"https://www.linkedin.com/jobs/view/4451138310/",source:"LinkedIn MCP",location:"东京",roleType:"游戏发行 / IP licensing / 合作谈判",why:"负责 license-in/out、IP 与发行标的发掘、合作评估与合同谈判，能形成稀缺的日本游戏 IP 商务资本；适合作为游戏/内容商业化的高自主入口。",gate:"日本团队约 2 人，个人依赖和不确定性很高；需满足 5 年游戏/数字娱乐同类经验或由雇主明确接受相邻背景，并确认奖金、资源支持和两年扩张路径。",verdict:"条件式",scannedOn:"2026-08-24"},
  {id:"c-xsolla-product-expert",track:"C",company:"Xsolla",title:"Regional Product Expert, Japan",href:"https://jobs.lever.co/xsolla/d1aae708-8d2a-4bfa-bb86-7e20d49e296a",source:"公司官网",location:"东京",roleType:"游戏变现产品 / GTM / 区域产品战略",why:"作为日本市场的产品声音，连接销售、产品、产品营销与合作方，覆盖复杂交易、产品采用、上市 readiness、定价与产品路线图输入；是把现有商业化能力迁移至游戏科技的优质版本。",gate:"要求 5 年+ 游戏产品/平台经验及游戏变现知识；需确认能以商业策略与广告/增长经验替代部分门槛，且不是以 sales enablement 为主的支持岗。",verdict:"条件式",scannedOn:"2026-08-24"},
  {id:"c-playstation-hardware-pm",track:"C",company:"Sony Interactive Entertainment",title:"商品企画／プロダクトマネージャー（PlayStation ハードウェア領域）",href:"https://careers.playstation.com/ja/%E5%95%86%E5%93%81%E4%BC%81%E7%94%BB-%E3%83%97%E3%83%AD%E3%83%80%E3%82%AF%E3%83%88%E3%83%9E%E3%83%8D%E3%83%BC%E3%82%B8%E3%83%A3%E3%83%BC-playstation%E3%83%8F%E3%83%BC%E3%83%89%E3%82%A6%E3%82%A7%E3%82%A2%E9%A0%98%E5%9F%9F/job/5978438004",source:"公司官网",location:"东京·港区港南",roleType:"产品企划 / 产品管理 / 全球协作",why:"连接 PlayStation 硬件产品企划、玩家体验与全球团队协作；比游戏发行或区域营销 Lead 更少依赖既有游戏行业人脉，能承接现有产品战略与跨职能推进经验。",gate:"确认产品路线图、发布或商业指标 ownership；核验是否必须有消费电子/游戏硬件经历，以及日语、出勤和职级要求。",verdict:"条件式",stage:"有条件探索",scannedOn:"2026-08-24"},
  {id:"c-playstation-omnichannel",track:"C",company:"Sony Interactive Entertainment",title:"Japan Omnichannel Marketing Lead",href:"https://careers.playstation.com/japan-omnichannel-marketing-lead/job/6098493004",source:"公司官网",location:"东京",roleType:"游戏玩家增长 / 区域 GTM / 全渠道商业化",why:"拥有日本市场的玩家体验、CRM、应用、主机与 LINE 的端到端增长 owner 范围；可将 ByteDance 的商业规划和数据驱动增长转成全球游戏产品的本地市场资本。",gate:"要求日本数字营销 3 年+ 和游戏玩家理解；核验实际决策权、是否可负责商业指标而非活动执行，以及薪资能否覆盖当前基线。",verdict:"优先审阅",stage:"长期目标",scannedOn:"2026-08-24"},
  {id:"a-relx-health-pm",track:"A",company:"RELX / Elsevier Health",title:"Product Manager（Japan Health Products）",href:"https://relx.wd3.myworkdayjobs.com/en-US/relx/job/Product-Manager_R105081-1",source:"公司官网",location:"东京·港区三田",roleType:"医疗信息产品 / 产品路线图 / 客户价值",why:"负责临床决策支持、医学教育与医疗分析产品的日本本地产品组合，直接连接用户洞察、业务 case、优先级和发布后改进；是从咨询/商业策略进入 HealthTech 产品的清晰入口。",gate:"确认是否要求既有医疗内容或 SaaS 产品经验，以及产品指标和发布 ownership 的实际范围。",verdict:"优先审阅",stage:"现在值得推进",scannedOn:"2026-08-24"},
  {id:"a-lincwell-pjm",track:"A",company:"Linc'well",title:"プロジェクトマネージャー（医療サービス・業務DX）",href:"https://herp.careers/careers/companies/lincwell/jobs/dy5iTqVrUw-W?parent-job-role-ids=product_management",source:"公司官网",location:"东京·港区",roleType:"医疗服务 / 诊所 DX / 患者体验",why:"横跨医疗现场、患者体验、业务与产品系统，推动在线诊疗和诊所 DX 的复杂主题落地；能累积 HealthTech 的客户采用和运营变革事实。",gate:"确认是否是业务变革与产品结果导向，而不是纯进度管理；核验出勤、项目并行数和决策权。",verdict:"优先审阅",stage:"现在值得推进",scannedOn:"2026-08-24"},
  {id:"a-medimo-bizdev",track:"A",company:"medimo",title:"事業開発（AI 医療 SaaS）",href:"https://hrmos.co/pages/medimo/jobs/0000006",source:"公司官网",location:"东京·区待确认",roleType:"AI 医疗 SaaS / 新业务 / 联盟",why:"岗位同时覆盖新业务企划、市场分析、伙伴谈判、产品市场渗透和变现设计，且只要求 1 年以上业务开发经验；是较低行业门槛的 HealthTech 商业化入口。",gate:"确认陌生开发与 quota 占比、创始团队授权、现金/股权和实际产品采用指标。",verdict:"优先审阅",stage:"现在值得推进",scannedOn:"2026-08-24"},
  {id:"a-drjoy-newbiz",track:"A",company:"Dr.JOY",title:"新規事業開発（AI × SaaS）",href:"https://recruit.drjoy.jp/position/ai-bd",source:"公司官网",location:"东京·区待确认",roleType:"医疗机构 SaaS / AI 新业务",why:"面向 3,700+ 医疗机构推进 AI×SaaS 新产品和业务机会；要求 IT/SaaS/互联网工作经验，较少依赖临床资历，能承接现有商业策略和跨团队推进能力。",gate:"确认岗位是产品化/伙伴增长还是纯销售；核验业务负责人、KPI、出勤和公司阶段。",verdict:"优先审阅",stage:"现在值得推进",scannedOn:"2026-08-24"},
  {id:"a-dsc-health-pm",track:"A",company:"DeNA / DeSC Healthcare",title:"テクニカルプロダクトマネージャー（ヘルスケア事業）",href:"https://herp.careers/v1/denacareer/wSyX98BqmUVl",source:"公司官网",location:"东京·涩谷区 / 横滨·中区",roleType:"医疗大数据 / BI 产品 / 数据平台",why:"负责医疗大数据加工、数据平台、BI 可视化和联盟产品；可累积行业数据、产品决策与客户价值事实，并支持远程/无核心时间工作制。",gate:"技术产品管理要求较高；确认业务型产品背景能否覆盖数据架构与匿名加工理解，避免纯技术 backlog 角色。",verdict:"条件式",stage:"有条件探索",scannedOn:"2026-08-24"},
  {id:"a-bd-applied-medical",track:"A",company:"Applied Medical",title:"Associate Specialist, Market Implementation",href:"https://careers.appliedmedical.com/japan/jobs/14146?lang=ja-jp",source:"公司官网",location:"东京·区待确认",roleType:"医疗器械市场导入 / 产品采用",why:"支持医疗器械市场教育、数字营销、内容和 adoption initiatives；职级低于典型 Product Marketing Manager，可作为进入医疗产品商业化的现实入口。",gate:"确认岗位是否含高频医院现场、临床内容合规和销售支持；薪资可能低于当前基线。",verdict:"条件式",stage:"有条件探索",scannedOn:"2026-08-24"},
  {id:"a-bd-product-manager",track:"A",company:"BD",title:"Product Manager（医疗器械产品上市）",href:"https://jobs.bd.com/en/job/tokyo/product-manager/159/99653242112",source:"公司官网",location:"东京·港区赤坂",workplace:"东京·港区赤坂（赤坂ガーデンシティ）",commute:"约 40–55 分钟（Google Maps 公交；随出发时间变化）",roleType:"医疗器械产品上市 / 市场战略 / KOL",why:"公司官网与 LinkedIn 交叉显示仍在招；岗位直接拥有新产品上市、定价/库存、客户与竞品分析、定位、销售培训、KOL/学会协同及销量/份额监测，是清晰的医疗产品商业化 ownership。",gate:"明确要求 5 年+ 医疗/制药营销及 3–5 年产品管理经验，必须在电话中确认能否以相邻 GTM、上市和商业策略成果弥补行业年限；同时核验具体产品线、薪资与现场节奏。",verdict:"条件式",stage:"有条件探索",scannedOn:"2026-08-25"},
  {id:"c-google-play-partnerships",track:"C",company:"Google",title:"Strategic Partner Manager, Play Games Partnerships",href:"https://www.google.com/about/careers/applications/jobs/results/87303219385901766-strategic-partner-manager-play-games-partnerships-english-japanese",source:"公司官网",location:"东京·涩谷区涩谷",workplace:"东京·涩谷区涩谷（Shibuya Stream）",commute:"约 35–50 分钟（Google Maps 公交；随出发时间变化）",roleType:"游戏 IP / 开发商合作 / 平台 GTM",why:"公司官网与 LinkedIn 均显示开放；该角色直接获取开发商合作机会、争取关键 title/IP、与产品团队对齐平台目标，并向游戏领导层提供市场判断，是游戏/IP 主线少见的高杠杆战略岗位。",gate:"最低要求 7 年 BD/合作/咨询/投行经验，偏好 6 年新业务 BD 与 PC/主机游戏伙伴经验；行业网络和高层谈判要求明显，定位为长期目标而非当前第一跳。",verdict:"条件式",stage:"长期目标",scannedOn:"2026-08-25"},
  {id:"b-aws-apjc-strategic-gtm",track:"B",company:"Amazon Web Services (AWS)",title:"Strategic GTM Specialist, APJC Strategic GTM",href:"https://amazon.jobs/en/jobs/10506005/strategic-gtm-specialist-apjc-strategic-gtm",source:"LinkedIn MCP",location:"东京·区待确认",workplace:"东京·区待确认（官方职位页仅披露 Tokyo）",commute:"办公区待确认；Google Maps 公交时间随实际办公地与出发时间变化",roleType:"Physical AI / 半导体 / 主权云 GTM / APJC 战略执行",why:"LinkedIn 与 Amazon.jobs 均显示开放。该岗位在日本推进 Physical AI、半导体和 Sovereign Cloud & AI 的高价值客户机会，主导商业 case、跨 Sales/BD/伙伴/产品协同，并向 APJC 高层汇报；具备清晰的客户采用、GTM 与商业化 ownership，也直接利用跨市场经验。",gate:"硬门槛为全球科技公司的 BD/战略合作/GTM 6 年+、日本企业科技市场理解，以及云、半导体、HPC、机器人或自主系统经验；电话中核验能否用相邻 GTM/商业策略成果补足、客户地域与日英中使用比例、办公室/出勤/出差与强度、薪资，并确认 18–24 个月转为 APAC/全球职责的实际路径。",verdict:"条件式",stage:"有条件探索",scannedOn:"2026-08-27"},
];
