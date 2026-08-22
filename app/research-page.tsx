import SiteNav from "./SiteNav";

type Priority = { rank: string; title: string; score: string; role: string; verdict: string };

const priorities: Priority[] = [
  { rank: "01", title: "AI 医疗健康与养老科技", score: "4.5 / 5", role: "长期主线首选", verdict: "日本验证复杂服务与支付，中国提供规模，专业壁垒来自监管、采购、支付、临床与客户采用。" },
  { rank: "02", title: "实体 AI 与机器人", score: "4.2 / 5", role: "产品护城河最强", verdict: "软件、硬件与现场工作流结合，全球迁移性强；优先产品、部署和伙伴经营，不做纯销售。" },
  { rank: "03", title: "AI 原生跨境 B2B", score: "4.1 / 5", role: "高质量桥梁", verdict: "进入阻力最低，但只有增加产品采用、合同、伙伴或 P&L 的岗位才算升级。" },
  { rank: "04", title: "企业学习与 AI 教育基础设施", score: "3.5 / 5", role: "稳健备选", verdict: "可与内容和顾问副业结合；避开传统培训、低价课程和纯内容生产。" },
  { rank: "05", title: "游戏与全球 IP 工具", score: "3.3 / 5", role: "有限期权", verdict: "只看平台、工具、发行策略和国际化；不以高频社区运营或项目爆款作为职业底座。" },
  { rank: "06", title: "微短剧", score: "2.9 / 5", role: "创意实验", verdict: "增长真实但平台、买量、监管和项目波动过高；先做 IP 跨境研究或本地化，不做制作主业。" },
  { rank: "—", title: "垂直自媒体", score: "不单列", role: "副业分发层", verdict: "服务于行业声誉、客户来源与数据/IP 沉淀，不把粉丝量等同于商业模式。" },
];

const industryUniverse = [
  { sector: "医疗服务、养老、主动健康", status: "终局 A", entry: "商业化、采用、支付/准入、机构解决方案", verdict: "需求、责任和支付壁垒强；避开低毛利劳动密集服务与无明确支付方的产品。" },
  { sector: "MedTech、诊断、生物医药、生命科学工具", status: "候选 B", entry: "APAC BD、市场准入、商业战略、生态合作", verdict: "器械、诊断与工具比从零进入药物研发现实；第一跳先取得行业事实与客户采用。" },
  { sector: "AI、数据、云、网络安全、数字信任", status: "候选 A/B", entry: "伙伴激活、行业解决方案、产品商业化、治理", verdict: "AI 是横向能力层；只保留能部署、签约、采用或承担责任的岗位，纯套壳与泛战略降权。" },
  { sector: "金融、保险、支付、财富管理、RegTech", status: "强桥梁 A", entry: "跨境支付生态、Treasury 产品、合作、区域经营", verdict: "现有资本最强、转职成功率高；只有增加 P&L、产品或伙伴所有权时接受，防止路径依赖。" },
  { sector: "工业自动化、机器人、半导体、先进制造", status: "终局 A/B", entry: "产品、部署、解决方案、生态、战略客户", verdict: "实体工作流和技术壁垒强；机器人优先，半导体/算力生态放在取得产品或产业证据后的第二跳。" },
  { sector: "能源、电网、储能、气候", status: "观察 B", entry: "能源软件商业化、PPA/储能合作、气候风险", verdict: "结构性资本投入成立，但当前行业门槛、固定地点和全流程销售使其被健康与机器人路径支配。" },
  { sector: "物流、供应链、贸易、移动出行", status: "强桥梁 A", entry: "贸易科技、合规、平台合作、区域 GTM", verdict: "与 APAC 金融和企业客户经历高度相邻，也能连接机器人；不自动成为十年职业身份。" },
  { sector: "零售、电商、消费品牌、旅游、本地生活", status: "桥梁 C", entry: "产品伙伴、平台生态、跨境品牌、区域经营", verdict: "进入容易但平台依赖、竞争和强度较高；只有 AI Commerce 首批团队或产品伙伴关系构成升级。" },
  { sector: "游戏、媒体、短剧、创作者、内容 IP", status: "期权 C", entry: "平台新业务、全球发行、工具、IP 商业化", verdict: "保留内容/IP 平台的新业务、全球发行与工具入口；制作、买量、社区运营与爆款依赖不作长期底座。" },
  { sector: "教育、企业学习、人才基础设施", status: "副业 C", entry: "企业学习产品、行业教育、知识产品", verdict: "通用课程易被 AI 商品化；必须绑定主业中的原创数据、案例、客户预算和可验证学习结果。" },
  { sector: "企业服务、专业服务、PE-backed 整合", status: "结构 B/C", entry: "垂直软件 GTM、经营改善、并购整合、P&L", verdict: "未来收购创业/roll-up 可重估；当前纯咨询与 PE Value Creation 被长期强度和代理人角色支配。" },
  { sector: "房地产、建筑、城市基础设施、PropTech", status: "邻接 C", entry: "城市科技、设施/养老地产运营、解决方案", verdict: "仅在养老设施、机器人或能源交叉场景保留；传统地产周期和现场性降低灵活度。" },
  { sector: "农业、食品、食品科技、水资源", status: "低优先 D", entry: "农业机器人、供应链科技、平台商业化", verdict: "长期需求真实但当前进入资本弱；只有与机器人、气候或跨境供应链交叉时保留。" },
  { sector: "航空航天、国防、公共安全、双用途科技", status: "低优先 D", entry: "国际合作、市场开发、战略客户", verdict: "技术和资本上行强，但国籍、出口管制、现场与基地限制破坏中日全球迁移性。" },
  { sector: "GovTech、政府数字化、社会服务、非营利", status: "生态 C", entry: "数字政府、AI 治理、公共服务创新、合作", verdict: "政策背景可用、社会影响强；现金和股权上行通常较弱，更适合作为健康/AI 的客户生态。" },
];

const paths = [
  { code: "H0", title: "健康结果部署 → 平台业务负责人", route: "自治体 / 保险方项目与客户成功 → 利用、持续、就诊和医疗费结果 → 标准化跨地区复制 → 健康平台 Japan / APAC Business Lead", gate: "必须拥有采用KPI和改善动作；固定现金达标，正式日语有组织支持，不退化成会议与进度管理。" },
  { code: "H1", title: "成熟医疗行业学徒 → 战略账户", route: "Commercial Excellence 执行岗 → 12–18 个月取得 BU / 产品落地结果 → 医疗战略账户或解决方案 → Japan / APAC Commercial Lead", gate: "桥梁岗 18 个月到期；若仍只有治理、会议和报告，立即转出。" },
  { code: "H2", title: "健康科技新业务 → 区域经营", route: "企业客户 PoC、定价和采用 → Japan Business Lead / APAC Partnerships → 早期高管或中日健康基础设施创业", gate: "现金、经理、付费客户和销售结构必须全部通过尽调。" },
  { code: "R1", title: "机器人产品 → 产品商业化负责人", route: "Product Manager → 标准化模块发布与 ROI / 采用证据 → Lead PM / Product Commercialization → 早期公司产品商业化负责人", gate: "必须拥有路线图、backlog、发布与采用，不做纯需求收集。" },
  { code: "R2", title: "部署 → 解决方案 / 事业经营", route: "多站点部署、UAT 和上线 → 可复用 ROI 与运营方法 → Solutions / Deployment Lead → Vertical Business / RaaS P&L", gate: "东京基地；现场每周不超过 2–3 天，出差每月不超过一周。" },
  { code: "R3", title: "伙伴 → GM", route: "战略账户 / 伙伴组合 → 收入、部署和采用 → 场景或地区负责人 → Japan / APAC GM 或商业联合创始人", gate: "陌生开发不是核心；拥有产品输入、商业条款和资源配置权。" },
];

const functionRoles = [
  { name: "客户成功 / 部署 / 实施经营", reach: "A−/B+", ownership: "采用、留存、上线、ROI、扩张", decision: "第一跳首选；必须负责上线后的采用和价值，不做长期救火驻场。" },
  { name: "产品商业化 / 新业务经营", reach: "A−/B", ownership: "定价、商业模型、PoC、采用、收入", decision: "第一跳首选；最符合 30% 策略 / 70% 执行。" },
  { name: "非技术产品经理 / Product Owner", reach: "B", ownership: "路线图、backlog、发布、采用", decision: "机器人主投；用需求到落地的等效经历争取面试。" },
  { name: "既有伙伴激活 / Alliances", reach: "B+", ownership: "联合方案、合同义务、伙伴采用、共同收入", decision: "拉伸主投；只有关系维护、活动和会议则淘汰。" },
  { name: "战略账户 / 解决方案经营", reach: "B−/C+", ownership: "账户收入、采用、续约、组合方案", decision: "第一跳后半段或第二跳；不接受个人陌生开发为核心。" },
  { name: "Commercial Excellence", reach: "A", ownership: "取决于是否亲自落地 BU / 产品结果", decision: "12–18 个月医疗桥梁；至少一半时间用于执行和量化结果。" },
  { name: "市场准入 / 支付 / Health Economics", reach: "C", ownership: "支付、证据、采用壁垒", decision: "第二跳复合能力；不从零冒充准入专家。" },
  { name: "商业运营 / RevOps / 数据分析", reach: "A", ownership: "通常只有建议权", decision: "只作短桥梁；必须转向客户、产品或账户结果。" },
  { name: "企业战略 / BizOps", reach: "A", ownership: "通常弱", decision: "没有预算、产品或业务指标，即使品牌好也否决。" },
  { name: "Program Manager / PMO", reach: "A", ownership: "通常弱", decision: "默认淘汰；拥有 go-live、采用、成本或收入时才重分类。" },
  { name: "运营卓越 / 供应链转型", reach: "A−/B+", ownership: "服务、成本、质量、生产率", decision: "医疗/机器人邻接桥梁；不优于直接产品与部署入口。" },
  { name: "Corporate Venture / Venture Studio", reach: "B", ownership: "客户验证、发布、规模化", decision: "条件式拉伸；只投亲自从发现做到商业化的 builder。" },
  { name: "Chief of Staff / CEO Office", reach: "B", ownership: "高度不确定", decision: "只接受 18 个月内明确转任业务负责人的机制。" },
  { name: "CVC / VC / Impact Investing", reach: "B−/C+", ownership: "影响投资组合，不直接经营", decision: "当前被经营岗位支配；五年后作为网络与融资能力重估。" },
  { name: "公共政策 / 政府事务 / AI 治理政策", reach: "B", ownership: "影响权强，经营权弱", decision: "复合能力而非主线；服务医疗、机器人和 AI 部署。" },
  { name: "产品营销 / Launch Excellence", reach: "B+", ownership: "定位、上市、采用", decision: "医疗相邻入口；只投能追踪上市后采用与业务影响的岗位。" },
  { name: "内容平台新业务 / IP 商业化", reach: "B", ownership: "合作、产品和 IP 收入", decision: "有限期权；优先平台、工具和全球发行。" },
  { name: "技术解决方案 / Forward Deployment", reach: "C", ownership: "生产部署和客户价值", decision: "第二跳；先以作品验证技术深度，不用短课伪装生产经验。" },
  { name: "医疗事务 / 临床 / 注册 / 核心研发", reach: "D", ownership: "强但有牌照与多年经验门槛", decision: "当前不可达，不为此重读全日制学位。" },
  { name: "个人猎手销售 / 传统咨询 / PE Value Creation", reach: "A", ownership: "与销售偏好或长期强度冲突", decision: "已被硬约束支配并淘汰。" },
];

const aiRisks = [
  { role: "医疗结果型客户成功", exposure: "中", compression: "低—中", replacement: "低", verdict: "首选；AI增强分层与分析，人仍负责公共资金、信任、采用和实施结果。" },
  { role: "机器人部署 / 产品商业化", exposure: "低—中", compression: "低", replacement: "低", verdict: "长期护城河最强；避免永久定制实施和无产品输入的现场救火。" },
  { role: "市场准入 / 支付 / 证据", exposure: "中", compression: "低—中", replacement: "低", verdict: "第二跳高价值能力；检索可自动化，证据取舍、支付策略和责任不会快速消失。" },
  { role: "伙伴激活 / 复杂合同", exposure: "中", compression: "中", replacement: "低—中", verdict: "保留；AI压缩准备工作，关系、条款、承诺与资源调动仍需人负责。" },
  { role: "非技术产品经理", exposure: "中—高", compression: "中", replacement: "低—中", verdict: "只有写PRD和整理backlog会被压缩；拥有取舍、发布和采用才安全。" },
  { role: "BU / Japan / APAC P&L", exposure: "中", compression: "低", replacement: "低", verdict: "五至十年终局；AI增强决策，不替代问责、组织领导和资源配置。" },
  { role: "Commercial / Launch Excellence", exposure: "高", compression: "中—高", replacement: "中", verdict: "只作落地型桥梁；分群、材料和KPI设计将自动化，必须拥有执行结果。" },
  { role: "Corporate Venture / Chief of Staff / 政策", exposure: "高", compression: "中—高", replacement: "中", verdict: "条件式；只有能调动资本、签约、塑造制度或建设业务时保留。" },
  { role: "BizOps / 分析 / 市场情报 / 通用战略", exposure: "很高", compression: "高", replacement: "中—高", verdict: "不作为终局；与现有能力重叠且最容易被AI压缩团队规模。" },
  { role: "PMO / 会议治理 / 进度报告", exposure: "很高", compression: "高", replacement: "高", verdict: "默认否决；除非同时拥有go-live、采用、成本或收入。" },
  { role: "泛内容 / 通用课程 / 翻译 / 基础研究", exposure: "很高", compression: "高", replacement: "高", verdict: "不作为商业模式；内容只做原创数据、行业关系和产品化服务的分发层。" },
];

const employerModels = [
  { model: "成熟跨国医疗 / 器械", stability: "高", upside: "行业资本、复杂客户和跨市场流程", decision: "稳健入口；只投有落地、采用或账户结果的岗位。" },
  { model: "日本大企业新事业 / 平台", stability: "高—中高", upside: "品牌、数据、客户、预算", decision: "第一跳优先；防止决策慢、内部政治和 PMO 化。" },
  { model: "产业股东支持的独立平台", stability: "中高", upside: "创业职责与产业资源", decision: "条件式优选；核实预算、P&L、员工激励和治理速度。" },
  { model: "增长型初创", stability: "差异很大", upside: "职责、股权与早期负责人机会最大", decision: "定向评估；完整验证跑道、商业质量、经理和完全稀释持股。" },
  { model: "海外 scale-up 日本首发", stability: "中高", upside: "全球迁移与 Japan ownership", decision: "推荐制拉伸；本地必须有产品输入、资源和成功指标。" },
  { model: "中国科技公司日本扩张", stability: "中 / 不透明", upside: "中日稀缺性与迁移最强", decision: "只投解决方案、产品或 Japan Lead，不做普通销售、翻译和现场救火。" },
  { model: "全球上市科技平台", stability: "高", upside: "高现金、RSU 与全球网络", decision: "高质量桥梁；必须升级为采用、合同或行业解决方案。" },
  { model: "PE-backed / 专业服务", stability: "高", upside: "现金较高，个人经营权弱", decision: "被长期强度和路径依赖支配。" },
  { model: "VC / CVC / 公共或非营利", stability: "中", upside: "网络与政策强，P&L 弱", decision: "五年后生态节点或合作方，不作下一份主业。" },
];

const coreBusinessModels = [
  { track: "健康", model: "保险 / 雇主健康数据平台", revenue: "保险方或企业按合同、模块、人数或结果付费", scale: "高：数据、规则和产品模块可跨客户复用；支付与临床语境形成壁垒", work: "中：企业周期长，仍需本地实施与结果证明", decision: "优先 1" },
  { track: "健康", model: "养老机构工作流 SaaS", revenue: "按机构、床位、门店或模块订阅，加增值服务", scale: "中高：留存、集成深度和跨机构复制决定质量", work: "低—中：混合办公，需定期进入机构", decision: "优先 2" },
  { track: "健康", model: "远程监测 / 数字诊断", revenue: "设备 + 软件、医院采购、保险报销或按患者收费", scale: "高潜力：临床证据、监管、数据和渠道形成护城河", work: "中：医院/渠道访问，上市和准入周期较长", decision: "优先 3 / 拉伸" },
  { track: "健康", model: "医疗器械 / 医疗机器人", revenue: "设备、耗材、维护、软件和按次服务", scale: "中高：装机量带来耗材与服务，但资本和培训较重", work: "中—高：现场、临床培训和渠道管理", decision: "条件优先" },
  { track: "健康", model: "居家照护协调平台", revenue: "家庭自费、保险/政府支付、服务抽成或订阅", scale: "中：匹配和数据可扩张，实际照护仍随人力增长", work: "高风险：24/7 履约、排班、质量和地区运营", decision: "条件优先" },
  { track: "健康", model: "消费健康 / 长寿品牌", revenue: "电商、会员、检测、服务与订阅", scale: "中：需专有数据、服务闭环或强品牌；否则获客依赖平台", work: "中—高：增长与营销节奏快", decision: "观察" },
  { track: "健康", model: "生物医药 / 药物研发", revenue: "药品销售、许可与里程碑付款", scale: "高波动：科学、临床与专利壁垒强，失败概率也高", work: "中：周期长，当前科学可信度不足", decision: "降权" },
  { track: "健康", model: "传统前线养老服务", revenue: "按小时、床位或政府/保险支付", scale: "低—中：扩张常与人员和设施近线性增长", work: "高：现场、排班与人力管理长期存在", decision: "不作第一主业" },
  { track: "机器人", model: "机器人软件 / 云平台 / 编排", revenue: "软件订阅、许可、设备管理和数据服务", scale: "高：跨硬件复用、切换成本与部署数据形成壁垒", work: "低—中：地点较灵活，仍需客户部署理解", decision: "优先 1" },
  { track: "机器人", model: "AMR / 仓储 RaaS", revenue: "订阅、租赁、按使用量、软件和维护", scale: "中高：经常性收入成立，但硬件资本、维护和利用率重要", work: "中—高：扩张期多站点上线与异常处理", decision: "优先 2" },
  { track: "机器人", model: "医疗 / 康复 / 照护机器人", revenue: "设备、租赁、按次服务和机构采购", scale: "高潜力：安全、临床、支付和工作流形成复合壁垒", work: "中—高：现场培训，市场形成较慢", decision: "优先 3 / 终局交叉" },
  { track: "机器人", model: "通用人形机器人平台", revenue: "硬件、RaaS、开发平台和战略合作", scale: "极高期权：标准平台一旦成立可扩张，当前可靠性与付费场景不确定", work: "很高：早期部署、融资和产品迭代密集", decision: "高风险期权" },
  { track: "机器人", model: "机器视觉 / 抓取 / 控制组件", revenue: "许可、硬件组件、渠道和集成项目", scale: "中高：技术壁垒强，但易受单一 OEM 与周期影响", work: "中：工业客户与现场较多", decision: "候选 B" },
  { track: "机器人", model: "大型工业机器人厂商", revenue: "设备、服务、软件、渠道与维护", scale: "中：现金与客户基础稳，员工股权上行有限", work: "中：大组织较稳定，现场不可消失", decision: "训练桥梁" },
  { track: "机器人", model: "定制系统集成商", revenue: "一次性项目、实施、集成和维护", scale: "低：人员和项目近线性增长，定制越多估值与迁移性越弱", work: "高：驻场、验收和项目峰值", decision: "降权" },
];

const regions = [
  { place: "日本", share: "70%", level: "主战场", why: "永驻、履历与网络最强；东京为默认基地，大阪是唯一可接受迁居城市。" },
  { place: "中国", share: "20%", level: "总部国际化", why: "只投医疗 AI、机器人或 AI 产品的日本/全球经营岗位；普通国内销售与平台招商不投。" },
  { place: "新加坡", share: "其他地区的 60%", level: "第三基地", why: "APAC 医疗商业化和机器人伙伴岗位密度最高；第一次沟通即确认 EP 担保与工资门槛。" },
  { place: "香港", share: "其他地区的 30%", level: "定向补充", why: "中英粤组合稀缺，适合医疗机器人商业化；优质岗位少且现金、合约期限需核实。" },
  { place: "欧美 / 中东 / 澳洲 / 韩国", share: "其他地区的 10%", level: "机会触发", why: "不做常规海投；只在明确担保、公司主动接触或岗位不可替代时推进。" },
];

const sidePortfolio = [
  ["1", "中英日垂直行业情报", "先做", "访谈、判断与跨市场关系难被 AI 复制"],
  ["2", "产品化顾问", "取得行业事实后", "固定范围的市场进入、客户发现和 GTM 诊断"],
  ["3", "数据库 / ROI 工具 / micro-SaaS", "第 6–18 个月", "形成订阅与可重复销售资产"],
  ["4", "行业教育 / 企业 workshop", "实践后", "只教亲自做过并有结果的内容"],
  ["5", "Newsletter / 播客 / 视频", "作为渠道", "积累邮件名单、声誉和客户来源"],
  ["6", "游戏 / 互动叙事", "季度实验", "预算封顶的创意期权"],
  ["7", "短剧制作", "暂不做", "买量、平台、合规与爆款风险过高"],
];

const compensationPaths = [
  { path: "健康结果平台", now: "第一跳获得采用、支付方合作或账户组合的可验证结果", mid: "产品商业化 / 业务负责人，变量与可控结果挂钩", long: "Japan / APAC P&L + 股权、利润分成或个人 IP", verdict: "主线，优先现金与可控结果" },
  { path: "增长型 HealthTech", now: "优先明确产品、客户、定价或经营责任", mid: "产品商业化 / 事业负责人；现金与股权同时升级", long: "早期高管、联合创始人或行业产品化顾问", verdict: "高上行，强度与股权必须匹配" },
  { path: "机器人产品 / RaaS", now: "优先产品、部署与复用 ROI 证据", mid: "Lead PM / Solutions Lead / Vertical P&L", long: "Japan / APAC GM、CBO 或利润分成", verdict: "主线候选，防止长期定制实施" },
  { path: "全球科技 / 支付桥梁", now: "只接受能带来产品、伙伴或区域经营所有权的岗位", mid: "转成产品、伙伴组合或区域经营才继续", long: "不能沉淀健康 / 机器人事实则主动退出", verdict: "桥梁，不为现金牺牲红线" },
  { path: "内容 / IP 平台", now: "先用副业验证付费、复购、数据或 IP", mid: "平台新业务、全球发行或工具化商业模式", long: "只有收入与所有权连续验证后再转为主业", verdict: "先作为副业期权" },
];

const toc = [
  ["结论", "#verdict"], ["优先级", "#priority"], ["全行业", "#universe"], ["路径", "#paths"],
  ["职能", "#functions"], ["AI韧性", "#ai-resilience"], ["雇主", "#employers"], ["模式", "#business-models"], ["地区", "#regions"], ["副业", "#portfolio"], ["薪酬", "#compensation"], ["收入", "#income"], ["90 天", "#plan"], ["门槛", "#gates"], ["来源", "#sources"],
];

export default function ResearchPage() {
  return (
    <>
      <SiteNav active="research" />
      <main className="research-page">
        <section className="research-hero">
          <div>
            <div className="eyebrow">CAREER RESEARCH · AUGUST 2026</div>
            <h1>不是押注热门行业，<br/><em>而是构建可迁移的所有权。</em></h1>
            <p>基于个人履历、约束问答、中国“十五五”与日本产业政策及全球地区筛选形成的 2026–2035 职业路线图。</p>
          </div>
          <aside className="research-verdict"><span>首四周市场测试</span><strong>医疗 60% · 机器人 30% · 跨境桥梁 10%</strong><p>不是永久押注。每两周以面试转化、岗位质量、经理和结果所有权重新分配。</p></aside>
        </section>

        <div className="research-layout">
          <aside className="research-toc" aria-label="研究目录"><span>研究目录</span>{toc.map(([label, href]) => <a key={href} href={href}>{label}</a>)}<small>版本 2026-08-22<br/>持续迭代</small></aside>
          <div className="research-content">
            <section className="research-section opening" id="verdict">
              <div className="section-kicker">00 · 核心结论</div><h2>下一份工作必须从“给建议”转向“拥有结果”</h2>
              <div className="verdict-grid"><article className="thesis-card"><span>职业终局</span><strong>专家型高管 → 创业者</strong><p>先成为商业化、产品或区域经营的 Senior IC / 无下属 Manager，再用行业事实换早期高管、股权与创业选择权。</p></article><article className="thesis-card"><span>最强资本</span><strong>中日英 × GTM × 复杂执行</strong><p>中日英沟通、GTM 与复杂跨职能执行经历形成跨市场商业底座。</p></article><article className="thesis-card warning"><span>最大缺口</span><strong>没有最终业务结果所有权</strong><p>尚未正式拥有收入、产品采用、成本、合同或 P&L；下一份工作必须补上其中至少一项。</p></article></div>
              <div className="constraint-strip"><b>不可妥协</b><span>日本固定现金 ≥ ¥8M</span><span>中国固定现金 ≥ ¥400k</span><span>东京 / 大阪</span><span>长期低—中强度</span><span>尊重、公平、心理安全</span><span>清晰决策权</span></div>
              <div className="evidence-note"><b>医疗证据已升级：</b>既有医疗相关项目涉及罕见病药品上市与全球医疗公司 GTM 组织架构战略。这让 Pharma / MedTech Commercial Excellence 成为当前可达的行业入口；但在项目时长、落地和客户采纳证据明确前，不夸大为医疗 P&amp;L 经历。</div>
            </section>

            <section className="research-section" id="priority">
              <div className="section-kicker">01 · 行业优先级</div><h2>七个兴趣方向，按长期结构而不是热度排序</h2><p className="section-lead">评分是职业匹配判断，不是投资收益预测。AI 是能力层：只有与行业数据、监管、产品采用和客户工作流结合时才形成护城河。</p>
              <div className="priority-list">{priorities.map((item) => <article key={item.rank + item.title} className="priority-row"><span className="priority-rank">{item.rank}</span><div><h3>{item.title}</h3><p>{item.verdict}</p></div><div className="priority-score"><b>{item.score}</b><small>{item.role}</small></div></article>)}</div>
            </section>

            <section className="research-section" id="universe">
              <div className="section-kicker">01B · 全行业穷尽审计</div><h2>没有只研究喜欢的赛道：十五类宏观行业全部进入同一套筛选</h2><p className="section-lead">先覆盖 15 类宏观行业，再与 20 类非技术职能、9 类雇主结构及全球地区迁移性组合。任何新增赛道都必须映射到下表，或证明它构成第 16 类独立经济系统。</p>
              <div className="ownership-grid"><article><b>硬门槛先行</b><p>经理团队、结果权、现金、销售结构、地域与长期工时</p></article><article><b>进入距离</b><p>最多一至两跳；不靠全日制学位重启职业</p></article><article><b>支配检验</b><p>同等护城河下，选择更可达、更灵活、强度更低的路径</p></article><article><b>上行检验</b><p>能否积累 P&amp;L、产品、股权、客户或可重复 IP</p></article></div>
              <div className="role-table-wrap"><table className="research-table role-table universe-table"><thead><tr><th>宏观行业原型</th><th>当前状态</th><th>最适合的非技术入口</th><th>保留 / 降权原因</th></tr></thead><tbody>{industryUniverse.map((item) => <tr key={item.sector}><td><b>{item.sector}</b></td><td>{item.status}</td><td>{item.entry}</td><td>{item.verdict}</td></tr>)}</tbody></table></div>
              <div className="evidence-note"><b>本轮新增但不改主线：</b>AI 伙伴激活与内容平台新业务进入独立拉伸池；AI Commerce 进入条件式桥梁；能源与半导体/算力生态保留为观察或第二跳。它们不是遗漏，只是当前被健康、机器人或更低摩擦的产品伙伴路径支配。</div>
            </section>

            <section className="research-section" id="paths">
              <div className="section-kicker">03 · 一至两跳路径</div><h2>职位名称不重要，24 个月后新增的证据才重要</h2>
              <div className="path-grid">{paths.map((path) => <article className="path-card" key={path.code}><span>{path.code}</span><h3>{path.title}</h3><p>{path.route}</p><div><b>接受门槛</b>{path.gate}</div></article>)}</div>
              <div className="bridge-rule"><b>桥梁岗的 12 个月检查：</b><ol><li>是否拥有产品发布、伙伴合同、客户采用或商业结果？</li><li>是否获得采购、支付、部署、监管或技术工作流知识？</li><li>是否建立至少 5 位能为下一跳背书的行业关系？</li><li>成果能否写成“我改变了什么结果”？</li></ol><p>四项少于三项，12–18 个月内启动下一跳。</p></div>
            </section>

            <section className="research-section" id="functions">
              <div className="section-kicker">04 · 职能穷尽审计</div><h2>行业正确，还必须选对获得所有权的入口</h2><p className="section-lead">二十类非技术职能逐一审计。主要动词是 launch、deploy、adopt、retain、price、contract、scale 和 own 才加分；只有 coordinate、govern、report、support 和 advise 的岗位降权。</p>
              <div className="role-table-wrap"><table className="research-table role-table"><thead><tr><th>职能原型</th><th>可达</th><th>可积累的所有权</th><th>当前决策</th></tr></thead><tbody>{functionRoles.map((role) => <tr key={role.name}><td><b>{role.name}</b></td><td>{role.reach}</td><td>{role.ownership}</td><td>{role.decision}</td></tr>)}</tbody></table></div>
              <div className="evidence-note"><b>排序修正：</b>客户成功 / 部署经营 ≈ 产品商业化 / 新业务 &gt; 非技术产品经理 &gt; 既有伙伴激活 &gt; 有落地的 Commercial Excellence &gt; 纯分析、战略与 PMO。企业创投和 VC 没有被遗漏，但当前仍把你放在“评价或支持别人经营”的位置。</div>
            </section>

            <section className="research-section" id="ai-resilience">
              <div className="section-kicker">05 · AI 韧性</div><h2>不是寻找 AI 碰不到的职位，而是拥有 AI 不能独立承担的结果</h2>
              <div className="evidence-note"><b>公开证据：</b>ILO 2025 估计全球约四分之一就业有某种生成式 AI 暴露，但最高暴露层约占 3.3%；岗位转型比完整替代更可能。高收入经济体暴露更高，所以“高学历、战略、分析”本身不是护城河。</div>
              <div className="ownership-grid"><article><b>现实执行</b><p>现场、系统集成、异常与组织行为</p></article><article><b>受监管责任</b><p>医疗、支付、隐私、安全与公共资金</p></article><article><b>高信任协商</b><p>合同、联盟、医院、自治体与高层变革</p></article><article><b>最终结果</b><p>采用、收入、成本、预算与 P&amp;L</p></article></div>
              <div className="role-table-wrap"><table className="research-table role-table"><thead><tr><th>职能 / 任务组合</th><th>任务暴露</th><th>人数压缩</th><th>完整替代</th><th>个人结论</th></tr></thead><tbody>{aiRisks.map((risk) => <tr key={risk.role}><td><b>{risk.role}</b></td><td>{risk.exposure}</td><td>{risk.compression}</td><td>{risk.replacement}</td><td>{risk.verdict}</td></tr>)}</tbody></table></div>
              <div className="bridge-rule"><b>面试时用六个问题测试：</b><ol><li>若分析和初稿速度提高 70%，岗位还解决什么问题？</li><li>是否亲自进入客户、用户或现场？</li><li>本人能改变采用、合同、预算、成本或收入的哪些杠杆？</li><li>AI 输出错误或实施失败时，谁最终判断并承担责任？</li><li>团队会因 AI 减员，还是扩大客户与产品范围？</li><li>24 个月后能带走行业网络、部署数据与可披露业绩，还是只会更快做报告？</li></ol></div>
            </section>

            <section className="research-section" id="employers">
              <div className="section-kicker">06 · 雇主类型审计</div><h2>公司类型不是安全性，品牌也不是所有权</h2><p className="section-lead">同一职能在成熟跨国公司、大企业新事业、产业平台和增长初创中会产生不同职业资本。判断增长公司时，拆开看现金跑道、商业质量、资本结构和个人所有权。</p>
              <div className="role-table-wrap"><table className="research-table role-table"><thead><tr><th>雇主原型</th><th>稳定性</th><th>主要上行</th><th>当前决策</th></tr></thead><tbody>{employerModels.map((item) => <tr key={item.model}><td><b>{item.model}</b></td><td>{item.stability}</td><td>{item.upside}</td><td>{item.decision}</td></tr>)}</tbody></table></div>
              <div className="constraint-strip"><b>第一跳雇主池</b><span>成熟医疗 / 大企业结果型新事业</span><span>具明确产品化的增长公司</span><span>产业股东平台</span><span>海外 / 中国公司 Japan expansion</span></div>
              <div className="bridge-rule"><b>两层 Offer 决策：</b><p>先过经理团队、结果决策权、现金、销售结构、地域工时、真实跑道六项硬门槛；再按结果所有权 30%、24 个月可迁移资本 25%、行业/AI 护城河 15%、生活方式 15%、现金 10%、风险调整后股权 5% 排序。</p></div>
            </section>

            <section className="research-section" id="business-models">
              <div className="section-kicker">06B · 核心商业模式审计</div><h2>行业增长不等于公司质量：经常性收入也不等于低强度</h2><p className="section-lead">对健康和机器人主线逐一拆解买方、支付方式、标准化程度、服务人力和现场强度。这里评估的是职业与公司结构，不是对单一公司的投资建议。</p>
              <div className="verdict-grid"><article className="thesis-card"><span>健康支付平台</span><strong>结果导向的数据与服务</strong><p>统一健康数据、模块化产品和结果导向合作可以形成可复用平台；价值落地仍需要深行业执行。</p><small>推论：优先产品采用、支付方合作与账户 P&amp;L，不做纯分析。</small></article><article className="thesis-card"><span>照护协调平台</span><strong>数据平台不等于无现场</strong><p>线上匹配与协作网络能够提高效率，但 24/7 线下服务意味着质量、排班与地区运营不会像纯 SaaS 一样消失。</p><small>推论：必须核验平台毛利与总部岗位是否承担运营救火。</small></article><article className="thesis-card"><span>机器人服务</span><strong>RaaS 的上限由标准化决定</strong><p>订阅、按使用量和标准系统集成降低客户初始投入；设计、导入、培训、维护和 KPI 改善仍构成真实成本。</p><small>推论：只有标准化、利用率与续约同时成立才有软件式上行。</small></article></div>
              <div className="role-table-wrap"><table className="research-table role-table business-model-table"><thead><tr><th>主线</th><th>商业模式</th><th>收入 / 支付</th><th>可扩展性与护城河</th><th>工作方式风险</th><th>个人决策</th></tr></thead><tbody>{coreBusinessModels.map((item) => <tr key={item.track + item.model}><td><b>{item.track}</b></td><td><b>{item.model}</b></td><td>{item.revenue}</td><td>{item.scale}</td><td>{item.work}</td><td>{item.decision}</td></tr>)}</tbody></table></div>
              <div className="bridge-rule"><b>加入增长公司前必须取得七个答案：</b><ol><li>谁拥有预算，谁真正付款？</li><li>收入是订阅、用量、设备、项目还是人时？</li><li>新增一个客户需要增加多少实施与运营人员？</li><li>付费试点、续约、扩张与流失分别如何？</li><li>硬件利用率、维护、临床支持或服务履约由谁承担？</li><li>日本形成的数据、流程与产品能否复制到中国或其他市场？</li><li>本人的奖金和股权是否与可控结果一致？</li></ol><p>公司拒绝说明续约、毛利、客户集中度、实施人力或完全稀释股权时，不因“AI、养老、机器人”标签降低标准。</p></div>
            </section>

            <section className="research-section" id="regions">
              <div className="section-kicker">07 · 全球地区策略</div><h2>全球不平均撒网：把迁移成本作为真实变量</h2>
              <div className="region-list">{regions.map((region) => <article key={region.place}><div><h3>{region.place}</h3><span>{region.level}</span></div><b>{region.share}</b><p>{region.why}</p></article>)}</div><p className="small-note">中国迁居只有在“完整区域经营权 + 优秀团队 + 显著现金/股权回报”同时成立时考虑。新加坡与香港是定向拉伸，不是为了国际化标签牺牲职位质量。</p>
            </section>

            <section className="research-section" id="portfolio">
              <div className="section-kicker">08 · 主业 + 副业</div><h2>副业不是第二份工作，而是个人所有权实验</h2>
              <div className="portfolio-table">{sidePortfolio.map(([rank, title, timing, why]) => <article key={rank}><b>{rank}</b><h3>{title}</h3><span>{timing}</span><p>{why}</p></article>)}</div>
              <div className="topic-choice"><div><span>母题 A</span><h3>机器人真实落地</h3><p>日本物流、零售和养老场景的 ROI、采购、部署与运营，对中国公司出海及全球 RaaS 的启示。</p></div><div><span>母题 B</span><h3>老龄化商业基础设施</h3><p>日本养老健康的使用者—决策者—支付方—服务者结构，以及对中国、新加坡和全球老龄化市场的迁移。</p></div></div>
            </section>

            <section className="research-section" id="compensation">
              <div className="section-kicker">08B · 薪酬与所有权原则</div><h2>先确认保证现金，再比较奖金和股权</h2><p className="section-lead">薪酬不是行业选择本身，而是衡量风险、工作强度和结果所有权是否匹配的工具。公开岗位报价波动很大，不作为路线判断依据。</p>
              <div className="verdict-grid"><article className="thesis-card"><span>现金</span><strong>保证部分独立判断</strong><p>基本给、固定加班、奖金、补贴和股权分别核验；不以不确定奖金或期权填补生活基线。</p></article><article className="thesis-card"><span>上行</span><strong>与可控结果挂钩</strong><p>优先账户、采用、产品、团队或 P&amp;L 结果对应的奖金、利润分成或可核验股权。</p></article><article className="thesis-card warning"><span>强度</span><strong>风险必须有定价</strong><p>早期高强度只在明确职责、现金跑道和有意义的所有权同时成立时接受。</p></article></div>
              <div className="role-table-wrap comp-path-wrap"><table className="research-table comp-table"><thead><tr><th>路径</th><th>0–2 年证据与目标</th><th>2–5 年情景</th><th>5–10 年非线性机制</th><th>决策</th></tr></thead><tbody>{compensationPaths.map((item) => <tr key={item.path}><td><b>{item.path}</b></td><td>{item.now}</td><td>{item.mid}</td><td>{item.long}</td><td>{item.verdict}</td></tr>)}</tbody></table></div>
              <p className="small-note">中长期内容是路线情景，不是市场预测。若 18 个月后仍未获得产品、采用、合同、成本或 P&amp;L 之一的结果所有权，即使现金上涨也视为路径失败。</p>
            </section>

            <section className="research-section" id="income">
              <div className="section-kicker">09 · 收入与股权</div><h2>工资是阶梯；非线性来自所有权</h2>
              <div className="ownership-grid"><article><b>公司所有权</b><p>期权、限制性股票、RSU</p></article><article><b>经营所有权</b><p>P&amp;L、毛利、分红与结果奖金</p></article><article><b>产品所有权</b><p>数据库、工具、课程、顾问产品</p></article><article><b>分发与 IP</b><p>邮件名单、原创数据、版权和客户关系</p></article></div>
              <div className="income-stages"><article><span>0–2 年</span><h3>转入并取得结果</h3><b>保证现金 + 可验证责任</b><p>现金满足现实基线；副业先验证问题、关系和第一个资产。</p></article><article><span>2–5 年</span><h3>产品 / 商业负责人</h3><b>结果与回报挂钩</b><p>变量与账户、团队或 P&amp;L 挂钩；开始形成可重复的工资外资产。</p></article><article><span>5–10 年</span><h3>区域 GM / 早期高管</h3><b>高现金或主动换所有权</b><p>离开雇主后仍保留股权、客户、声誉、产品或 IP。</p></article></div>
              <div className="formula-box"><span>统一公式</span><strong>退出时普通股价值 × 入职完全稀释持股 × 归属 × 后续稀释 × 普通股分配系数</strong><p>再单独扣除失败概率、时间、行权成本、税费和机会成本。只给期权张数、不提供完全稀释比例时，比较 offer 按零计。</p></div>
              <div className="cash-rules"><h3>所有权判断</h3><ul><li>只报期权张数、不提供完全稀释比例时，比较 offer 按零计。</li><li>增长公司应同时核验跑道、客户、经理、决策权、归属、行权窗口和完全稀释持股。</li><li>高强度岗位需要显著现金、股权或利润分成；三者都没有时不接受。</li></ul></div>
            </section>

            <section className="research-section" id="plan">
              <div className="section-kicker">10 · 三个月执行</div><h2>把求职变成可证伪的市场实验</h2>
              <div className="timeline"><article><span>第 0–1 周</span><h3>建立两套叙事</h3><p>医疗版突出罕见病上市、全球医疗公司 GTM 和商业执行；机器人版突出复杂运营、客户需求和跨职能落地。各做一页行业作品。</p></article><article><span>第 1–4 周</span><h3>集中启动漏斗</h3><p>医疗 60%、机器人 30%、跨境桥梁 10%；优先推荐与招聘人预筛，记录回复、面试、硬门槛和拒绝原因。</p></article><article><span>第 3–8 周</span><h3>用反向尽调筛团队</h3><p>验证经理、公平、决策权、真实工时、结果指标、现场比例、现金与股权，不因公司品牌降低门槛。</p></article><article><span>第 8–12 周</span><h3>竞争 offer 后签约</h3><p>只有书面 offer、薪酬股权核验、汇报线确认和团队反向尽调全部完成后离职；通知期一个月。</p></article></div>
            </section>

            <section className="research-section" id="gates">
              <div className="section-kicker">11 · Offer 一票否决</div><h2>高薪、品牌或行业标签不能抵消坏结构</h2>
              <div className="gate-grid"><article><span>01</span><h3>经理与团队</h3><p>不尊重、微观管理、评价不公、政治和缺乏心理安全，直接退出。</p></article><article><span>02</span><h3>结果所有权</h3><p>职责只有协调、报告和治理，没有产品、客户、合同、收入或成本结果，退出。</p></article><article><span>03</span><h3>生活方式</h3><p>长期 always-on、无法解释的高强度，或要求迁往东京/大阪以外，退出。</p></article><article><span>04</span><h3>销售结构</h3><p>个人陌生开发、全流程猎手和硬 quota 是核心，退出；团队/账户采用目标可以接受。</p></article><article><span>05</span><h3>现金与股权</h3><p>现金低于下限，或只报期权张数、拒绝完全稀释比例，退出。</p></article><article><span>06</span><h3>桥梁保质期</h3><p>无法在 12–18 个月转向产品、客户、采用或 P&amp;L，退出。</p></article></div>
              <div className="diligence"><h3>股权签约前必须书面确认</h3><p>授予工具与实体 · 完全稀释比例 · 普通股公允价值与行权价 · 归属与 cliff · refresh grant · 离职行权窗口 · 控制权变更加速 · 期权池与融资稀释 · 优先清算和债务 · 二级流动性 · 日本税务处理 · 董事会批准。</p></div>
            </section>

            <section className="research-section" id="sources">
              <div className="section-kicker">12 · 研究基础</div><h2>政策、产业与劳动市场资料</h2>
              <div className="source-grid"><a href="https://www.moe.gov.cn/jyb_xwfb/xw_zt/moe_357/2026/2026_zt03/yw/202603/t20260314_1430877.html" target="_blank" rel="noreferrer"><b>中国“十五五”规划纲要</b><span>AI、机器人、生物医药与未来产业 ↗</span></a><a href="https://policy.mofcom.gov.cn/claw/clawContent.shtml?id=106306" target="_blank" rel="noreferrer"><b>国民健康“十五五”规划</b><span>健康与养老结构性信号 ↗</span></a><a href="https://www8.cao.go.jp/kourei/measure/taikou/r06/hon-index.html" target="_blank" rel="noreferrer"><b>日本高龄社会对策大纲</b><span>老龄化政策与照护需求 ↗</span></a><a href="https://www.meti.go.jp/policy/mono_info_service/mono/robot/index.html" target="_blank" rel="noreferrer"><b>日本 METI 机器人政策</b><span>实体 AI 与机器人产业 ↗</span></a><a href="https://www.meti.go.jp/policy/mono_info_service/contents/index.html?theme=6" target="_blank" rel="noreferrer"><b>日本内容产业政策</b><span>游戏、IP 与内容国际化 ↗</span></a><a href="https://www.who.int/news-room/fact-sheets/detail/ageing-and-health" target="_blank" rel="noreferrer"><b>WHO · Ageing and health</b><span>全球老龄化长期趋势 ↗</span></a><a href="https://www.ilo.org/publications/generative-ai-and-jobs-refined-global-index-occupational-exposure" target="_blank" rel="noreferrer"><b>ILO · GenAI and Jobs 2025</b><span>任务暴露、转型与替代边界 ↗</span></a><a href="https://www.weforum.org/publications/the-future-of-jobs-report-2025/in-full/2-jobs-outlook/" target="_blank" rel="noreferrer"><b>WEF · Future of Jobs 2025</b><span>2030 岗位与技能结构信号 ↗</span></a></div>
              <p className="small-note">本页刻意不展示具体公司、招聘职位或历史报价；它们只用于内部方法验证，页面保留可迁移的行业与岗位性质结论。</p>
              <div className="research-footer"><b>Q43–47 的保守假设</b><p>未确认项目时长、地域、个人 workstream、采纳与量化结果，因此申请材料只陈述已确认职责，不推断实施成效或个人归因；既往医疗客户默认匿名；复杂日语谈判、高难度书面沟通及传统机构高层沟通默认需要母语支持。</p></div>
            </section>
          </div>
        </div>
      </main>
    </>
  );
}
