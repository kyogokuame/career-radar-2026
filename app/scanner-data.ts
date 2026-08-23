export type Track = "A" | "B";
export type Candidate = {
  id: string;
  track: Track;
  company: string;
  title: string;
  href: string;
  source: "LinkedIn MCP" | "公司官网";
  location: string;
  roleType: string;
  why: string;
  gate: string;
  verdict: "优先审阅" | "条件式" | "暂不建议";
};

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
];
