import SiteNav from "./SiteNav";

type Priority = { rank: string; title: string; score: string; role: string; verdict: string };
type VerifiedRole = { tier: string; company: string; title: string; href: string; structure: string; access: string; action: string };

const priorities: Priority[] = [
  { rank: "01", title: "AI 医疗健康与养老科技", score: "4.5 / 5", role: "长期主线首选", verdict: "日本验证复杂服务与支付，中国提供规模，专业壁垒来自监管、采购、支付、临床与客户采用。" },
  { rank: "02", title: "实体 AI 与机器人", score: "4.2 / 5", role: "产品护城河最强", verdict: "软件、硬件与现场工作流结合，全球迁移性强；优先产品、部署和伙伴经营，不做纯销售。" },
  { rank: "03", title: "AI 原生跨境 B2B", score: "4.1 / 5", role: "高质量桥梁", verdict: "进入阻力最低，但只有增加产品采用、合同、伙伴或 P&L 的岗位才算升级。" },
  { rank: "04", title: "企业学习与 AI 教育基础设施", score: "3.5 / 5", role: "稳健备选", verdict: "可与内容和顾问副业结合；避开传统培训、低价课程和纯内容生产。" },
  { rank: "05", title: "游戏与全球 IP 工具", score: "3.3 / 5", role: "有限期权", verdict: "只看平台、工具、发行策略和国际化；不以高频社区运营或项目爆款作为职业底座。" },
  { rank: "06", title: "微短剧", score: "2.9 / 5", role: "创意实验", verdict: "增长真实但平台、买量、监管和项目波动过高；先做 IP 跨境研究或本地化，不做制作主业。" },
  { rank: "—", title: "垂直自媒体", score: "不单列", role: "副业分发层", verdict: "服务于行业声誉、客户来源与数据/IP 沉淀，不把粉丝量等同于商业模式。" },
];

const verifiedRoles: VerifiedRole[] = [
  { tier: "第一波", company: "SoftBank", title: "Healthcare Project Manager & Customer Success", href: "https://www.softbank.jp/recruit/career/positions/detail/005038/", structure: "A", access: "A−/B+", action: "医疗采用型主投；先确认固定现金、自治体正式日语支持、出差工时和本人对采用KPI的决策权。" },
  { tier: "第一波", company: "Johnson & Johnson", title: "Strategic Program Lead, Commercial Excellence", href: "https://www.careers.jnj.com/en/jobs/r-081443/innovative-medicine-strategic-program-lead-strategy-operations-dept-commercial-excellence/", structure: "B+", access: "A", action: "医疗主投；确认至少一半时间用于跨 BU 落地并拥有可量化结果。" },
  { tier: "第一波", company: "Rapyuta Robotics", title: "Product Manager, WMS / ASRS", href: "https://www.careercross.com/en/job/detail-1560218", structure: "A", access: "B", action: "机器人产品主投；用需求、路线图、发布和采用率建立产品资本。" },
  { tier: "条件式", company: "TELEXISTENCE", title: "Retail Partnership Development Expert", href: "https://jobs.lever.co/tx-inc.com/82ca69ae-72b1-4008-ac9c-ae0c22441bdc", structure: "A−", access: "B+", action: "先确认陌生开发、个人 quota、现金、现场比例和团队环境。" },
  { tier: "条件式", company: "イチロウ", title: "介護・医療法人向け新規事業 BizDev", href: "https://herp.careers/v1/link/oGB9VGFVqXNW", structure: "A−", access: "A−", action: "现金需达到下限；关键人开拓不能成为工作核心。" },
  { tier: "条件式", company: "Medtronic", title: "Principal Commercial Analyst, EA&S", href: "https://medtronic.wd1.myworkdayjobs.com/en-US/MedtronicCareers/job/Principal-Commercial-Analyst--EA---Tokyo-_R61234-8", structure: "B−", access: "B+", action: "只作 12–18 个月医疗桥梁；必须写明转向战略账户/执行的路径。" },
  { tier: "预筛", company: "Woven by Toyota", title: "Project Manager, Robot PF Business Development", href: "https://jobs.lever.co/woven-by-toyota/356811fb-b4e9-4d77-92be-9be288b278ca", structure: "A", access: "B−/C+", action: "只有永久东京基地得到书面确认才继续；迁往裾野即否决。" },
  { tier: "拉伸", company: "Singtel", title: "Partnership Manager, Robotics", href: "https://groupcareers.singtel.com/job/Partnership-Manager-%28Robotics%29-Sing/1362465766/", structure: "A+", access: "B", action: "新加坡高质量拉伸；补一页 5G + Edge + Robotics 商业化案例。" },
  { tier: "拉伸", company: "Flatiron Health Japan", title: "Strategic Partnerships Manager", href: "https://flatiron.com/careers/open-positions/job?gh_jid=8070086", structure: "A", access: "B−/C+", action: "只通过推荐推进；医院、政府、肿瘤数据关系与正式日语仍是缺口。" },
  { tier: "拉伸", company: "Gaussy", title: "Roboware Business Owner / Business Development", href: "https://www.jac-recruitment.jp/search/NJB2394803/", structure: "A−", access: "B−/C+", action: "RaaS 与薪酬结构好，但实体 B2B 销售和母语日语是硬门槛。" },
  { tier: "备选", company: "Johnson & Johnson MedTech", title: "Business Analytics & Market Intelligence Specialist", href: "https://www.careers.jnj.com/en/jobs/r-078120/medtech-business-analytics-market-intelligence-specialist-strategy-commercial-excellence-orthopedics/", structure: "C+", access: "A−", action: "只有外部客户接触、职级现金与内部转岗机制同时成立才保留。" },
  { tier: "第二跳", company: "Medtronic", title: "Strategic Program Manager, EA&S", href: "https://medtronic.wd1.myworkdayjobs.com/ja-JP/MedtronicCareers/job/Strategic-Program-Manager--3_R35798", structure: "A+", access: "C", action: "用作 2–4 年后的终局基准，不消耗当前常规申请时间。" },
  { tier: "部署拉伸", company: "TELEXISTENCE", title: "Business Development Expert, Logistics", href: "https://jobs.lever.co/tx-inc.com/56bfd248-a0ce-4031-8bcd-a2949512a7d1", structure: "A", access: "B−/C+", action: "多站点部署资本有价值；母语日语、高现场和早期团队风险需先筛。" },
];

const paths = [
  { code: "H0", title: "健康结果部署 → 平台业务负责人", route: "自治体 / 保险方项目与客户成功 → 利用、持续、就诊和医疗费结果 → 标准化跨地区复制 → 健康平台 Japan / APAC Business Lead", gate: "必须拥有采用KPI和改善动作；固定现金达标，正式日语有组织支持，不退化成会议与进度管理。" },
  { code: "H1", title: "成熟医疗行业学徒 → 战略账户", route: "Commercial Excellence 执行岗 → 12–18 个月取得 BU / 产品落地结果 → 医疗战略账户或解决方案 → Japan / APAC Commercial Lead", gate: "桥梁岗 18 个月到期；若仍只有治理、会议和报告，立即转出。" },
  { code: "H2", title: "健康科技新业务 → 区域经营", route: "企业客户 PoC、定价和采用 → Japan Business Lead / APAC Partnerships → 早期高管或中日健康基础设施创业", gate: "现金、经理、付费客户和销售结构必须全部通过尽调。" },
  { code: "R1", title: "机器人产品 → 产品商业化负责人", route: "Product Manager → 标准化模块发布与 ROI / 采用证据 → Lead PM / Product Commercialization → 早期公司产品商业化负责人", gate: "必须拥有路线图、backlog、发布与采用，不做纯需求收集。" },
  { code: "R2", title: "部署 → 解决方案 / 事业经营", route: "多站点部署、UAT 和上线 → 可复用 ROI 与运营方法 → Solutions / Deployment Lead → Vertical Business / RaaS P&L", gate: "东京基地；现场每周不超过 2–3 天，出差每月不超过一周。" },
  { code: "R3", title: "伙伴 → GM", route: "战略账户 / 伙伴组合 → 收入、部署和采用 → 场景或地区负责人 → Japan / APAC GM 或商业联合创始人", gate: "陌生开发不是核心；拥有产品输入、商业条款和资源配置权。" },
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

const toc = [
  ["结论", "#verdict"], ["行业", "#priority"], ["岗位", "#roles"], ["路径", "#paths"],
  ["地区", "#regions"], ["副业", "#portfolio"], ["收入", "#income"], ["90 天", "#plan"], ["门槛", "#gates"], ["来源", "#sources"],
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
            <p>基于个人履历、42 项约束问答、中国“十五五”与日本产业政策、全球地区筛选，以及当前或历史真实招聘岗位形成的 2026–2035 职业路线图。</p>
          </div>
          <aside className="research-verdict"><span>首四周市场测试</span><strong>医疗 60% · 机器人 30% · 跨境桥梁 10%</strong><p>不是永久押注。每两周以面试转化、岗位质量、经理和结果所有权重新分配。</p></aside>
        </section>

        <div className="research-layout">
          <aside className="research-toc" aria-label="研究目录"><span>研究目录</span>{toc.map(([label, href]) => <a key={href} href={href}>{label}</a>)}<small>版本 2026-08-22<br/>持续迭代</small></aside>
          <div className="research-content">
            <section className="research-section opening" id="verdict">
              <div className="section-kicker">00 · 核心结论</div><h2>下一份工作必须从“给建议”转向“拥有结果”</h2>
              <div className="verdict-grid"><article className="thesis-card"><span>职业终局</span><strong>专家型高管 → 创业者</strong><p>先成为商业化、产品或区域经营的 Senior IC / 无下属 Manager，再用行业事实换早期高管、股权与创业选择权。</p></article><article className="thesis-card"><span>最强资本</span><strong>中日英 × GTM × 复杂执行</strong><p>TikTok 日本商业规划、麦肯锡 GTM / 转型和交易银行经历形成跨市场商业底座。</p></article><article className="thesis-card warning"><span>最大缺口</span><strong>没有最终业务结果所有权</strong><p>尚未正式拥有收入、产品采用、成本、合同或 P&L；下一份工作必须补上其中至少一项。</p></article></div>
              <div className="constraint-strip"><b>不可妥协</b><span>日本固定现金 ≥ ¥8M</span><span>中国固定现金 ≥ ¥400k</span><span>东京 / 大阪</span><span>长期低—中强度</span><span>尊重、公平、心理安全</span><span>清晰决策权</span></div>
              <div className="evidence-note"><b>医疗证据已升级：</b>麦肯锡期间参与罕见病药品上市，以及 J&amp;J GTM 组织架构战略。这让 Pharma / MedTech Commercial Excellence 成为当前最可达的行业入口；但在项目时长、落地和客户采纳证据明确前，不夸大为医疗 P&amp;L 经历。</div>
            </section>

            <section className="research-section" id="priority">
              <div className="section-kicker">01 · 行业优先级</div><h2>七个兴趣方向，按长期结构而不是热度排序</h2><p className="section-lead">评分是职业匹配判断，不是投资收益预测。AI 是能力层：只有与行业数据、监管、产品采用和客户工作流结合时才形成护城河。</p>
              <div className="priority-list">{priorities.map((item) => <article key={item.rank + item.title} className="priority-row"><span className="priority-rank">{item.rank}</span><div><h3>{item.title}</h3><p>{item.verdict}</p></div><div className="priority-score"><b>{item.score}</b><small>{item.role}</small></div></article>)}</div>
            </section>

            <section className="research-section" id="roles">
              <div className="section-kicker">02 · 真实岗位验证</div><h2>结构适配与当前可达性分开评分</h2><p className="section-lead">岗位均来自当前或历史真实招聘页面。点击公司职位可直接查看来源；页面失效不改变它作为岗位结构样本的价值。</p>
              <div className="role-table-wrap"><table className="research-table role-table"><thead><tr><th>层级</th><th>公司与岗位</th><th>结构</th><th>可达</th><th>动作</th></tr></thead><tbody>{verifiedRoles.map((role) => <tr key={role.company + role.title}><td><span className="tier-pill">{role.tier}</span></td><td><a href={role.href} target="_blank" rel="noreferrer"><b>{role.company}</b><span>{role.title} ↗</span></a></td><td>{role.structure}</td><td>{role.access}</td><td>{role.action}</td></tr>)}</tbody></table></div>
              <div className="role-legend"><span><b>A</b> 高度成立</span><span><b>B</b> 有一项可补缺口</span><span><b>C</b> 目前硬门槛明显</span></div>
            </section>

            <section className="research-section" id="paths">
              <div className="section-kicker">03 · 一至两跳路径</div><h2>职位名称不重要，24 个月后新增的证据才重要</h2>
              <div className="path-grid">{paths.map((path) => <article className="path-card" key={path.code}><span>{path.code}</span><h3>{path.title}</h3><p>{path.route}</p><div><b>接受门槛</b>{path.gate}</div></article>)}</div>
              <div className="bridge-rule"><b>桥梁岗的 12 个月检查：</b><ol><li>是否拥有产品发布、伙伴合同、客户采用或商业结果？</li><li>是否获得采购、支付、部署、监管或技术工作流知识？</li><li>是否建立至少 5 位能为下一跳背书的行业关系？</li><li>成果能否写成“我改变了什么结果”？</li></ol><p>四项少于三项，12–18 个月内启动下一跳。</p></div>
            </section>

            <section className="research-section" id="regions">
              <div className="section-kicker">04 · 全球地区策略</div><h2>全球不平均撒网：把迁移成本作为真实变量</h2>
              <div className="region-list">{regions.map((region) => <article key={region.place}><div><h3>{region.place}</h3><span>{region.level}</span></div><b>{region.share}</b><p>{region.why}</p></article>)}</div><p className="small-note">中国迁居只有在“完整区域经营权 + 优秀团队 + 显著现金/股权回报”同时成立时考虑。新加坡与香港是定向拉伸，不是为了国际化标签牺牲职位质量。</p>
            </section>

            <section className="research-section" id="portfolio">
              <div className="section-kicker">05 · 主业 + 副业</div><h2>副业不是第二份工作，而是个人所有权实验</h2>
              <div className="portfolio-table">{sidePortfolio.map(([rank, title, timing, why]) => <article key={rank}><b>{rank}</b><h3>{title}</h3><span>{timing}</span><p>{why}</p></article>)}</div>
              <div className="topic-choice"><div><span>母题 A</span><h3>机器人真实落地</h3><p>日本物流、零售和养老场景的 ROI、采购、部署与运营，对中国公司出海及全球 RaaS 的启示。</p></div><div><span>母题 B</span><h3>老龄化商业基础设施</h3><p>日本养老健康的使用者—决策者—支付方—服务者结构，以及对中国、新加坡和全球老龄化市场的迁移。</p></div></div>
            </section>

            <section className="research-section" id="income">
              <div className="section-kicker">06 · 收入与股权</div><h2>工资是阶梯；非线性来自所有权</h2>
              <div className="ownership-grid"><article><b>公司所有权</b><p>期权、限制性股票、RSU</p></article><article><b>经营所有权</b><p>P&amp;L、毛利、分红与结果奖金</p></article><article><b>产品所有权</b><p>数据库、工具、课程、顾问产品</p></article><article><b>分发与 IP</b><p>邮件名单、原创数据、版权和客户关系</p></article></div>
              <div className="income-stages"><article><span>0–2 年</span><h3>转入并取得结果</h3><b>优先 ¥9M–12M + 奖金</b><p>不跌破 ¥8M。副业允许 ¥0–1M，先验证问题、关系和第一个资产。</p></article><article><span>2–5 年</span><h3>产品 / 商业负责人</h3><b>情景 ¥12M–20M 总现金</b><p>变量与账户、团队或 P&amp;L 挂钩；工资外收入目标约 10%–20%。</p></article><article><span>5–10 年</span><h3>区域 GM / 早期高管</h3><b>高现金或主动换所有权</b><p>离开雇主后仍保留股权、客户、声誉、产品或 IP。</p></article></div>
              <div className="formula-box"><span>统一公式</span><strong>退出时普通股价值 × 入职完全稀释持股 × 归属 × 后续稀释 × 普通股分配系数</strong><p>再单独扣除失败概率、时间、行权成本、税费和机会成本。只给期权张数、不提供完全稀释比例时，比较 offer 按零计。</p></div>
              <div className="role-table-wrap"><table className="research-table equity-table"><thead><tr><th>入职持股</th><th>退出 ¥30B</th><th>退出 ¥100B</th><th>退出 ¥300B</th></tr></thead><tbody><tr><td>0.02%</td><td>¥3M</td><td>¥10M</td><td>¥30M</td></tr><tr><td>0.05%</td><td>¥7.5M</td><td>¥25M</td><td>¥75M</td></tr><tr><td>0.10%</td><td>¥15M</td><td>¥50M</td><td>¥150M</td></tr><tr><td>0.25%</td><td>¥37.5M</td><td>¥125M</td><td>¥375M</td></tr></tbody></table></div><p className="small-note">仅展示量级：假设后续稀释 50%、全部归属、普通股按退出价值分配；实际结果可能为零，不构成投资、税务或法律建议。</p>
              <div className="cash-rules"><h3>现金折价上限</h3><ul><li>盈利或 Series C–D：原则上不为普通员工期权牺牲超过市场现金的 10%–15%。</li><li>Series B：最多讨论约 10%–20%，前提是跑道、客户、经理、决策权和完全稀释持股均通过尽调。</li><li>Seed–A：只在成为不可替代的中日商业化早期负责人、现金仍达下限且股权真正有意义时进入。</li></ul></div>
            </section>

            <section className="research-section" id="plan">
              <div className="section-kicker">07 · 三个月执行</div><h2>把求职变成可证伪的市场实验</h2>
              <div className="timeline"><article><span>第 0–1 周</span><h3>建立两套叙事</h3><p>医疗版突出罕见病上市、J&amp;J GTM 和商业执行；机器人版突出复杂运营、客户需求和跨职能落地。各做一页行业作品。</p></article><article><span>第 1–4 周</span><h3>集中启动漏斗</h3><p>医疗 60%、机器人 30%、跨境桥梁 10%；优先推荐与招聘人预筛，记录回复、面试、硬门槛和拒绝原因。</p></article><article><span>第 3–8 周</span><h3>用反向尽调筛团队</h3><p>验证经理、公平、决策权、真实工时、结果指标、现场比例、现金与股权，不因公司品牌降低门槛。</p></article><article><span>第 8–12 周</span><h3>竞争 offer 后签约</h3><p>只有书面 offer、薪酬股权核验、汇报线确认和团队反向尽调全部完成后离职；通知期一个月。</p></article></div>
            </section>

            <section className="research-section" id="gates">
              <div className="section-kicker">08 · Offer 一票否决</div><h2>高薪、品牌或行业标签不能抵消坏结构</h2>
              <div className="gate-grid"><article><span>01</span><h3>经理与团队</h3><p>不尊重、微观管理、评价不公、政治和缺乏心理安全，直接退出。</p></article><article><span>02</span><h3>结果所有权</h3><p>职责只有协调、报告和治理，没有产品、客户、合同、收入或成本结果，退出。</p></article><article><span>03</span><h3>生活方式</h3><p>长期 always-on、无法解释的高强度，或要求迁往东京/大阪以外，退出。</p></article><article><span>04</span><h3>销售结构</h3><p>个人陌生开发、全流程猎手和硬 quota 是核心，退出；团队/账户采用目标可以接受。</p></article><article><span>05</span><h3>现金与股权</h3><p>现金低于下限，或只报期权张数、拒绝完全稀释比例，退出。</p></article><article><span>06</span><h3>桥梁保质期</h3><p>无法在 12–18 个月转向产品、客户、采用或 P&amp;L，退出。</p></article></div>
              <div className="diligence"><h3>股权签约前必须书面确认</h3><p>授予工具与实体 · 完全稀释比例 · 普通股公允价值与行权价 · 归属与 cliff · refresh grant · 离职行权窗口 · 控制权变更加速 · 期权池与融资稀释 · 优先清算和债务 · 二级流动性 · 日本税务处理 · 董事会批准。</p></div>
            </section>

            <section className="research-section" id="sources">
              <div className="section-kicker">09 · 公开资料</div><h2>政策、产业与股权数据来源</h2>
              <div className="source-grid"><a href="https://www.moe.gov.cn/jyb_xwfb/xw_zt/moe_357/2026/2026_zt03/yw/202603/t20260314_1430877.html" target="_blank" rel="noreferrer"><b>中国“十五五”规划纲要</b><span>AI、机器人、生物医药与未来产业 ↗</span></a><a href="https://policy.mofcom.gov.cn/claw/clawContent.shtml?id=106306" target="_blank" rel="noreferrer"><b>国民健康“十五五”规划</b><span>健康与养老结构性信号 ↗</span></a><a href="https://www8.cao.go.jp/kourei/measure/taikou/r06/hon-index.html" target="_blank" rel="noreferrer"><b>日本高龄社会对策大纲</b><span>老龄化政策与照护需求 ↗</span></a><a href="https://www.meti.go.jp/policy/mono_info_service/mono/robot/index.html" target="_blank" rel="noreferrer"><b>日本 METI 机器人政策</b><span>实体 AI 与机器人产业 ↗</span></a><a href="https://www.meti.go.jp/policy/mono_info_service/contents/index.html?theme=6" target="_blank" rel="noreferrer"><b>日本内容产业政策</b><span>游戏、IP 与内容国际化 ↗</span></a><a href="https://www.who.int/news-room/fact-sheets/detail/ageing-and-health" target="_blank" rel="noreferrer"><b>WHO · Ageing and health</b><span>全球老龄化长期趋势 ↗</span></a><a href="https://carta.com/data/apac-me-equity-report/" target="_blank" rel="noreferrer"><b>Carta · APAC Equity Report</b><span>期权池、归属与行权数据 ↗</span></a><a href="https://carta.com/data/startup-compensation-h2-2025/" target="_blank" rel="noreferrer"><b>Carta · Startup Compensation</b><span>硬件、healthtech 与游戏就业信号 ↗</span></a></div>
              <div className="research-footer"><b>仍待补齐</b><p>两个医疗项目的时长、地域、个人 workstream、客户采纳和可公开结果；以及是否存在从需求定义走到 go-live、UAT 或客户采用的 IT / DX / 物流项目。</p></div>
            </section>
          </div>
        </div>
      </main>
    </>
  );
}
