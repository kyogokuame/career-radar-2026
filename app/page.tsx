"use client";

import { useState } from "react";
import SiteNav from "./SiteNav";
import { candidates } from "./scanner-data";

type Fit = "高" | "中" | "低";
type Status = "待确认" | "待研究" | "进行中" | "已联系" | "面谈待排期" | "面谈已排期" | "面谈已确定" | "业务面待进行" | "已投递" | "暂停";
type Reaction = "赞" | "踩";
type Role = {
  id: string; company: string; title: string; source: string; date: string; work: string;
  href?: string;
  salary: string; onsite: string; commute: string; distance: "近" | "中" | "远" | "远程" | "待确认";
  management: string; reports: string; contact?: string; memo?: { title: string; items: string[] }; fit: Fit; reason: string; status: Status; tags: string[];
};

const roles: Role[] = [
  {id:"flatiron",company:"Flatiron Health",title:"Strategic Partnerships Senior Manager",href:"https://flatiron.com/careers/open-positions/job?gh_jid=8070086",source:"Apex · 岡本由依",date:"8/18",work:"连接癌症医院、政府和医疗机构，拓展肿瘤 RWD 数据合作；推进伦理、合同、市场洞察和项目落地。",salary:"未公开",onsite:"每周 2 天出社",commute:"品川约 35–40 分钟",distance:"中",management:"高级个人贡献者；跨团队协作",reports:"未公开",fit:"高",reason:"战略项目、跨国协作与医疗数据合作高度相关；需补足医院/肿瘤生态知识。",status:"待研究",tags:["RWD","合作战略","全球"]},
  {id:"jmdc",company:"JMDC",title:"制药业务战略・解决方案 Business Produce",href:"https://hrmos.co/pages/jmdc/jobs/bp-00034",source:"Apex · 工藤悟",date:"7/31",work:"用医疗大数据为药企做战略与解决方案，负责客户开拓、提案、交付和新业务化；目标承担约 1 亿日元级业务。",salary:"1,000–2,000 万日元（邮件沟通）",onsite:"弹性制；天数未公开",commute:"芝大门约 35–40 分钟",distance:"中",management:"业务经营与团队建设职责",reports:"未公开",fit:"高",reason:"McKinsey 战略、商业策略和数据治理经验直接匹配；薪酬也覆盖当前基线。",status:"面谈已确定",tags:["医疗数据","新业务","药企","8/27 10:00 面谈"]},
  {id:"syneos",company:"Syneos Health",title:"Sr. Strategic Project Manager",href:"https://commercialcareers.syneoshealth.com/search/jobs/in/tokyo",source:"Apex · 吉野すみれ",date:"7/29",work:"领导药企新品上市与 Commercial Solutions 项目，连接 BD、方案设计和交付团队。",salary:"未公开",onsite:"每周约 2 天出社",commute:"丸之内约 20–25 分钟",distance:"近",management:"跨职能项目领导",reports:"未公开",fit:"高",reason:"咨询、GTM、跨团队转型经验高度贴合；日英双语符合要求。",status:"待确认",tags:["咨询","上市","药企"]},
  {id:"syneos-consultant",company:"Syneos Health",title:"Consultant / Associate Consultant",href:"https://japan.commercialcareers.syneoshealth.com/jobs/17863053-consultant-slash-associate-consultant",source:"Syneos Health 官网",date:"8/24",work:"作为咨询项目 IC，完成医药/生物医药调研、分析、客户材料与项目交付；路径为 Sr. Consultant / Engagement Manager。",salary:"固定 ¥9.6–13M + 15% 奖金；总包约 ¥11–15M",onsite:"东京办公室；平均 19–20 点下班（本人核验）",commute:"丸之内约 20–25 分钟",distance:"近",management:"高级个人贡献者 / 项目交付",reports:"无",memo:{title:"与 Yunke 面谈备忘 · Japan Consulting",items:["业务定位 · Syneos 不只是 CRO；其整合 Clinical Development、Medical Affairs、Commercial Delivery 与 Consulting。Japan Consulting 的核心是研发/资产策略、Market Access & HEOR、医学事务、商业化和上市，而非泛管理咨询。","团队判断 · Yunke 自 2023 年起从零搭建 Japan Consulting，并覆盖 North APAC；应确认该岗位是否属于高成长咨询团队，而非传统 MR/外包交付组织。OpenWork 的公开评价主要来自 MR、PV 等交付岗位，提示项目/客户依赖、培养与路径风险，但不能直接代表新咨询团队。","日本进入 · 日本 Market Access 的实际问题包括 NHI 药价和报销、价值主张、HEOR/RWE 证据、MAH/合作伙伴模式，以及把 PMDA/药事、定价、医学和商业准备连接为上市路线图。","客户结构 · 大型跨国药企更可能购买项目型服务；首次进入日本的美国 emerging biotech、罕见病、细胞/基因治疗和单产品公司，才有更强的端到端 Japan entry 需求。","中国机会 · 未找到可公开验证、点名的 Syneos 中国大陆药企进入日本客户案例；但 Syneos 有中国运营网络，团队正公开讨论中国创新管线进入日本。中国方向仍早期、增速高，常见难点是 China-only 数据、证据桥接、报销定价、MAH/伙伴和本地组织。美国是近期收入池，中国是中期增长期权。","Healthtech 边界 · Syneos 明确覆盖 MedTech、IVD、诊断和药企数字化/RWE/DCT；但公开叙事仍以 biopharma 为中心，未见 Yunke 团队聚焦医院 IT、消费健康 App 或医疗 SaaS 的标志性项目。对下一跳，建议以 Biopharma 为主线，同时积累 digital / AI / MedTech 项目作为第二专长。","团队未来 · Japan Consulting 未来 2–3 年最想以什么客户问题和项目类型被市场认知？目前最优先的增长领域是什么？","整合模型 · 在真实项目中，Consulting 如何调动 Clinical、Medical Affairs 与 Commercial 团队？哪些场景能形成 Syneos 相较纯咨询公司的差异化？","岗位成功 · Consultant 前 12–18 个月的项目组合和成功标准是什么？是 Japan entry/launch、Market Access & HEOR、商业化、医学事务还是组织转型？","人才标准 · 哪类 Consultant 会在团队里持续成长，而不是只做 research/deck？团队扩张时，Yunke 想刻意建立怎样的 working style、coaching、晋升与人才培养机制？","项目负荷 · 利用率、proposal/BD、项目 staffing 和常态工时如何安排？与传统 Commercial outsourced roles 相比，客户/项目对绩效、工作节奏和职业路径的影响有何不同？","跨区域协作 · 与 North APAC 和全球团队怎样分工？美国时区会议、跨国客户和出差的实际频率如何？","中国→日本 · 是否已成为团队有意义的增长垂直领域，还是近期仍以美国和欧洲 biotech 为主？中国客户最常卡在证据、药价报销、MAH/伙伴模式还是本地组织搭建？","Healthtech 客群 · 除 biopharma 外，MedTech、diagnostics、digital therapeutics 或 broader healthtech 对日本团队今天有多重要？是现有活跃项目，还是未来 2–3 年要建设的能力？"]},fit:"高",reason:"医疗行业切换的成功率高，且本人已确认工时可接受；以 18–30 个月为期限积累上市、商业战略与客户事实后，跳 in-house 药企、数字健康或 MedTech 商业化。主要风险是利用率、多项目和提案工作，不能长期停在泛调研/材料生产。",status:"进行中",tags:["主线 A","医药商业策略","咨询","进行中"]},
  {id:"sierra-gtm-operations",company:"Sierra",title:"GTM Operations",href:"https://www.linkedin.com/jobs/view/4446733630/",source:"LinkedIn · Sierra HR",date:"8/24",work:"负责新市场商业案例与执行计划、产品表现的财务/数据分析、年度规划框架，以及 Sales、Marketing、Product、Engineering 间的跨职能经营推进。",salary:"未公开；面谈核对现金、股权数量与行权条款",onsite:"东京现场办公；公司以线下协作为主",commute:"东京办公室（具体区域待 HR 确认）",distance:"待确认",management:"高级个人贡献者；跨职能战略、经营与执行",reports:"无",memo:{title:"HR 面谈备忘 · Sierra GTM Operations",items:["背景速记 · 创始人：Bret Taylor（前 Salesforce 联席 CEO、Quip 创始人、前 Facebook CTO、OpenAI 董事会成员）与 Clay Bavor（前 Google Labs 负责人，曾领导 Google Lens、AR/VR 与 Workspace 产品）。","背景速记 · 融资：公开披露至少四笔、合计约 $1.585B；2024/02 $110M（Sequoia、Benchmark）、2024/10 $175M（Greenoaks）、2025/09 $350M（Greenoaks）、2026/05 $950M（Tiger Global、GV 领投，Benchmark、Sequoia、Greenoaks 参与），最新 post-money 约 $15.8B；另有 SoftBank Vision Fund 2 的未披露金额投资。","背景判断 · 公司已属晚期私募，但尚无公开 IPO 申报或时间表；不能将 headline valuation 当作短期流动性。","为什么现在招聘此岗位？未来 6–12 个月日本团队最优先解决的新市场、客户或经营问题是什么？","该岗位在前 90 天和第一年分别以什么结果衡量成功？是市场进入、pipeline、客户采用、营收、续约，还是内部经营效率？","职责在商业规划、数据/财务分析、客户项目交付和商业 ownership 之间如何分配？上线后的客户成果由谁负责？","直属汇报对象是谁？东京团队目前的规模和职能构成如何？哪些决策可由日本团队独立做，哪些须经由 SF / 全球团队？","公司如何在东京团队落实 Intensity 与 Family？常态工时、客户紧急响应、美国时区会议、出差及周末工作的实际频率如何？","东京办公室的准确地点、现场出勤节奏和客户现场比例分别是多少？","近期国际扩张的优先级如何排序：日本、东南亚与其他市场分别由谁覆盖？是否存在面向中文客户或大中华区的长期探索，还是当前明确聚焦日本与东南亚？","薪酬的固定、奖金/变量和股权构成是什么？在 offer 阶段能否提供完全稀释后持股比例、vesting、行权窗口、行权价与日本税务处理？公司通常在什么情况下提供员工流动性机会？","后续面试轮次、case 或客户场景考核是什么？HR 对我的背景是否已有顾虑，尤其是 5–10 年经验要求，可否尽早说明？"]},fit:"高",reason:"咨询 + ByteDance 商业化策略/运营的连续性最强，是进入企业级 AI Agent 的 GTM/经营中枢的一跳。职位明确要求 5–10 年经验，需用两年以上咨询、跨职能规划和商业化成果弥补总年限差距。主要取舍是 Sierra 将 Intensity 列为核心价值，且客户交付与现场协作可能带来持续高工时；HR 面谈需先验证岗位 ownership、日本团队的决策边界、实际工作方式、国际扩张范围与股权条款。",status:"面谈已排期",tags:["主线 AI","GTM / BizOps","AI Agent","面谈已排期"]},
  {id:"xiaohongshu-community-strategy",company:"小红书",title:"社区战略BP",href:"https://jobs.niuqizp.com/job-vkr5LLnz5.html",source:"公开职位页（小红书官网转引）",date:"8/24",work:"以战略行研和数据分析识别用户需求、竞争格局和社区业务机会，协同生态、产品、增长、BI、用研推动项目；跟踪目标与策略的关联和复盘，沉淀方法论。",salary:"未公开；业务面核对职级、现金与激励",onsite:"上海或北京；具体办公区和出勤制度待确认",commute:"涉及上海/北京迁居；具体办公区待业务面确认",distance:"待确认",management:"个人贡献者；社区战略规划、经营分析与跨职能项目推进",reports:"无",contact:"CLIO（微信）",memo:{title:"业务面备忘 · 六项必须确认",items:["这个 BP 对应哪个社区业务单元，核心 KPI 是留存、内容供给、创作者、生态健康还是商业化？","过去一年该团队实际推动过哪些决策，而非做过哪些研究？","入职后 90 天需要独立负责的议题是什么，能否自行定义问题并推动实验？","是否能直接使用 SQL、实验和用户/内容数据，还是主要依赖 BI 输出？","直属负责人、团队规模、上海/北京选择权，以及常态和大促/热点期工时如何？","职级、固定薪资、奖金和长期激励分别是什么；若持续高强度，回报是否足够？"]},fit:"高",reason:"已通过 HR 面，下一轮为业务面。岗位对“互联网商业/经营分析 + 战略咨询”复合背景、SQL、社区/内容产品兴趣及 PMO 项目推进有明确偏好，与你的咨询和商业化策略经验高度连续；同时可把 AI 工具/agent 实践作为差异化能力。主要风险是中国内容平台业务节奏、监管变化和长期现场强度，业务面应重点确认直属团队、核心议题、日常工时与跨城安排。",status:"业务面待进行",tags:["内容 / 社区","战略 BP","SQL / AI Agent","HR 面已通过","业务面待进行"]},
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

const sierraHrInterviewUpdate: Partial<Role> = {
  work:"AI Deployment Consulting：面向日本客户设计、部署与优化 AI Agent，连接客户业务诊断、方案/交付和商业化；同时要求独立完成日语销售。",
  salary:"以固定薪资与现金奖金为主；RSU 不按确定性现金或期权上行计入（HR 面确认）",
  onsite:"东京日比谷办公室；现场办公",
  commute:"日比谷约 35–40 分钟（新小岩；精确楼宇待确认）",
  distance:"中",
  management:"个人贡献者；AI Deployment Consulting、客户交付与日语销售",
  memo:{title:"HR 面谈纪要 · Sierra",items:[
    "岗位实质已确认：除 GTM/运营外，工作包含 AI Deployment Consulting——帮助客户设计、部署与优化 AI Agent，而非纯内部 BizOps。",
    "岗位要求较强的单独日语销售能力；下一轮须确认个人 quota、现有线索/客户分配，以及销售、方案与交付的实际占比。",
    "工作强度已确认偏大；须以常态与峰值工时、客户紧急响应、美国时区会议和周末工作频率判断是否只作为 18–24 个月转换期。",
    "薪酬仅为 RSU，没有期权；RSU 仍属股权型报酬，但私有公司流动性未确定，应按不保证的上行处理，以固定薪资和现金奖金为主作决策。",
    "确认客户成功与续约由谁负责：这是顾问/部署 owner，还是带明确营收和销售目标的前线岗位？",
    "确认成功标准：首年是 AI Agent 上线/采用、客户业务结果、销售 pipeline、营收还是续约？",
    "确认固定薪资、现金奖金、RSU vesting、流动性机制与日本税务；没有足够现金补偿时，不以 headline valuation 承担高强度。",
    "确认离开时可带走的职业资本：能否在两年内形成可证明的日本企业 AI 部署、客户采用与商业化案例。",
    "新增语言/市场门槛：当前已知职责以日本客户、独立日语销售和日语交付为主，正面命中新的降权条件；除非能转为 APAC/全球客户、英文主协作或中日市场职责，否则不再作为优先机会。"
  ]},
  fit:"低",
  reason:"新限制下进一步下调。它能提供 AI Agent 部署资本，但岗位实质同时包含纯日本客户、独立日语销售、高强度交付和缺少确定性股权四项风险，无法利用中英与跨境优势。只有客户范围扩至 APAC/全球、英文成为主要协作语言，且固定现金显著补偿强度时才重新考虑。",
  status:"进行中",
  tags:["主线 AI","AI Deployment Consulting","日语销售","高强度","RSU","进行中"],
};

const languageMarketRoleAdjustments: Record<string, Partial<Role>> = {
  jmdc: {fit:"中", reason:"医疗数据与业务经营仍有价值，但该岗位的客户开拓、提案和交付主要面向日本药企，日语客户能力很可能成为核心竞争维度。只有存在跨国药企/APAC 项目、产品 ownership 或中日业务职责时保留。"},
  syneos: {fit:"中", reason:"行业切换和上市项目资本成立，但必须确认项目组合是否以跨国 biotech、Japan entry、North APAC 与英文协作为主；若主要服务日本药企并纯日语交付则降为低。"},
  "syneos-consultant": {fit:"中", reason:"工时可接受且医疗切换路径清晰，但优先级取决于客户组合。美国/中国/全球 biotech 进入日本、North APAC 项目和英文协作需构成主要工作；若以日本药企纯日语交付为主，不应为行业标签接受。"},
  hokuto: {fit:"低", reason:"岗位以日本药企的营销/销售策略、分析和项目交付为核心，纯日本客户与纯日语顾问式交付风险高，难以发挥中英跨境优势；除非存在 APAC/中国项目或区域产品 ownership，否则退出优先池。"},
};

type CompanyProfile = { hq: string; listing: string; size: string; sourceHref: string; sourceLabel: string; workplacePlatform: string; workplaceScore: string; workplaceRisk: string };
const companyProfiles: Record<string, CompanyProfile> = {
  flatiron: {hq:"美国纽约",listing:"非上市 · Roche 旗下独立运营",size:"约 2,500+ 人（全球）",sourceHref:"https://www.roche.com/innovation/structure/flatiron",sourceLabel:"Roche · Flatiron 公司资料",workplacePlatform:"Glassdoor",workplaceScore:"3.2 / 5（382 条全球评价快照）",workplaceRisk:"组织仍带有 startup 的高要求；晋升空间、资源与日本团队自主性需核验。"},
  jmdc: {hq:"日本东京 · 港区芝大门",listing:"东证 Prime · 4483",size:"499 人（单体，2026/3）",sourceHref:"https://www.jmdc.co.jp/en/profile/",sourceLabel:"JMDC 官方公司资料",workplacePlatform:"OpenWork",workplaceScore:"4.55 / 5（公开搜索快照；样本/日期待核验）",workplaceRisk:"药企客户交付压力、集团整合后的优先级与业务经营目标需面谈确认。"},
  syneos: {hq:"美国 Morrisville, North Carolina",listing:"非上市 · 2023 年被私有化",size:"约 29,000 人（全球）",sourceHref:"https://www.syneoshealth.com/clinical-corporate-careers",sourceLabel:"Syneos 官方招聘资料",workplacePlatform:"Glassdoor",workplaceScore:"3.7 / 5（3,959 条全球评价）；Commercial Solutions 3.9 / 5（318 条）",workplaceRisk:"项目/客户依赖与利用率是常见波动源；以东京团队实际 19–20 点下班的验证为准。"},
  "syneos-consultant": {hq:"美国 Morrisville, North Carolina",listing:"非上市 · 2023 年被私有化",size:"约 29,000 人（全球）",sourceHref:"https://japan.commercialcareers.syneoshealth.com/jobs/17863053-consultant-slash-associate-consultant",sourceLabel:"Syneos 岗位资料",workplacePlatform:"Glassdoor",workplaceScore:"3.7 / 5（3,959 条全球评价）；Commercial Solutions 3.9 / 5（318 条）",workplaceRisk:"项目/客户依赖与利用率是常见波动源；以东京团队实际 19–20 点下班的验证为准。"},
  "sierra-gtm-operations": {hq:"美国旧金山",listing:"非上市 · Series E；最近一轮 2026/5 融资 $950M，估值超 $15B",size:"201–500 人（LinkedIn 公司页；平台显示约 1,000 名员工档案）",sourceHref:"https://techcrunch.com/2026/05/04/sierra-raises-950m-as-the-race-to-own-enterprise-ai-gets-serious/",sourceLabel:"TechCrunch · 2026/5 融资报道",workplacePlatform:"Glassdoor",workplaceScore:"未检索到可核验的 Sierra AI 同名评分/样本不足",workplaceRisk:"HR 面确认：日比谷现场办公、独立日语销售与 AI 部署交付并存，且工作强度偏大；RSU 不视作确定性回报，须以固定现金补偿判断。"},
  "xiaohongshu-community-strategy": {hq:"中国上海",listing:"非上市 · 最近公开融资为 2021 年约 $500M（公开报道估值约 $20B；融资轮次口径不一）",size:"1,001–5,000 人（公开聚合口径；以业务团队实际规模为准）",sourceHref:"https://www.euronews.com/next/2021/11/08/china-xiaohongshu",sourceLabel:"公开融资报道",workplacePlatform:"脉脉 / 天眼查 / 企查查",workplaceScore:"未检索到可核验的同口径评分/样本不足",workplaceRisk:"内容平台的高迭代节奏、社区生态/内容治理的监管变化及团队业务优先级；业务面核验实际工时、核心 KPI 与上海/北京配置。"},
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

const options: Status[] = ["待确认","待研究","进行中","已联系","面谈待排期","面谈已排期","面谈已确定","业务面待进行","已投递","暂停"];
const activeStatuses: Status[] = ["待研究","进行中","已联系","面谈待排期","面谈已排期","面谈已确定","业务面待进行","已投递"];
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
  const allRoles = [...roles.map((role) => {
    const withInterview = role.id === "sierra-gtm-operations" ? {...role,...sierraHrInterviewUpdate} : role;
    return {...withInterview, ...(languageMarketRoleAdjustments[role.id] ?? {})};
  }), ...adoptedRoles];
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
        <div className="facts"><Fact label="来源" value={selected.source+" · "+selected.date}/><Fact label="联系人" value={selected.contact ?? "未公开"}/><Fact label="总部 HQ" value={company.hq}/><Fact label="上市状态" value={company.listing}/><Fact label="公司规模" value={company.size}/><Fact label="职场评价" value={`${company.workplacePlatform} · ${company.workplaceScore}`}/><Fact label="主要风险" value={company.workplaceRisk}/><Fact label="想定年收入" value={selected.salary}/><Fact label="出社要求" value={selected.onsite}/><Fact label="新小岩通勤" value={selected.commute} cls={commuteFor(selected.distance)}/><Fact label="管理职能" value={selected.management}/><Fact label="直属部下" value={selected.reports}/></div>
        <a className="company-source" href={company.sourceHref} target="_blank" rel="noreferrer">↗ {company.sourceLabel}</a>
        <div className="fit-note"><b>适配判断</b><p>{selected.reason}</p></div>{selected.memo && <section className="fit-note deep-dive-memo"><b>{selected.memo.title}</b><ol>{selected.memo.items.map((item) => <li key={item}>{item}</li>)}</ol></section>}<div className="reaction-box"><div><b>我的判断</b><small>点赞置顶并归为高适配；点踩置底并归为低适配</small></div><div className="reaction-buttons"><button className={reactions[selected.id] === "赞" ? "chosen" : ""} onClick={() => setReaction(selected.id,"赞")} aria-pressed={reactions[selected.id] === "赞"}>👍 点赞</button><button className={reactions[selected.id] === "踩" ? "chosen" : ""} onClick={() => setReaction(selected.id,"踩")} aria-pressed={reactions[selected.id] === "踩"}>👎 点踩</button></div></div><div className="editor"><div><b>目前投递情况</b><small>更新会保存在此浏览器</small></div><select value={saved[selected.id] ?? selected.status} onChange={(e) => setRoleStatus(selected.id,e.target.value as Status)}>{options.map((x) => <option key={x}>{x}</option>)}</select></div><div className="note">通勤为从 JR 新小岩站出发的单程估算；未计实时延误、步行及精确办公地址差异。</div>
      </aside>
    </section>
  </main></>;
}

function Fact({label,value,cls=""}:{label:string;value:string;cls?:string}) { return <div className="fact"><span>{label}</span><strong className={cls}>{value}</strong></div>; }
