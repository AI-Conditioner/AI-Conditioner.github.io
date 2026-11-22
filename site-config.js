/**
 * Academic Personal Homepage Config (US PhD Applicant Style)
 * 只需修改本文件即可更新全部学术主页内容；默认采用美国高校教授习惯阅读的学术英文排版。
 */
window.SITE_CONFIG = {
  site: {
    uiLang: "en",
    title: "Kunjian Wang | Prospective Ph.D. Applicant",
    description: "Academic homepage of Kunjian Wang featuring education background, research interests, graduate transcript, GRE General, GRE Mathematics Subject, and TOEFL iBT scores.",
    brand: "AI-Conditioner.github.io",
    footerOwner: "Kunjian Wang",
    lastUpdated: "Nov 2026",
    // 可选动态扩展：填入 OpenAlex Author ID 即可从支持 CORS 的 OpenAlex API 实时拉取论文与引用统计；留空则纯静态展示
    openAlexAuthorId: ""
  },

  profile: {
    name: "Kunjian Wang",
    nativeName: "汪坤健",
    monogram: "KW",
    avatarUrl: "avatar.jpg", // 可放本地相对路径如 "./avatar.jpg"
    headline: "Prospective US Ph.D. Applicant · Applied Mathematics & Computational Science",
    affiliation: "Beijing Computational Science Research Center (CSRC), GSCAEP",
    location: "Beijing, China",
    email: "", // 如需公开展示邮箱，在此填入后页面会自动显示联系邮箱
    statusBadge: "Prospective US Ph.D. Applicant",
    bioParagraphs: [
      "I am an M.S. student in Applied Mathematics at the Beijing Computational Science Research Center (CSRC), Graduate School of the China Academy of Engineering Physics (2024–2027), following my B.S. in Mathematics and Applied Mathematics from Xi'an Jiaotong University (2020–2024).",
      "My background bridges numerical analysis, scientific computing, and machine learning. I am preparing applications for Ph.D. programs in the United States, and my arXiv preprints and full CV will be posted here soon."
    ],
    heroLinks: [
      { label: "GitHub", url: "https://github.com/AI-Conditioner" },
      { label: "CV", url: "#cv" },
      { label: "Scores", url: "#scores" }
    ]
  },

  news: [
    { date: "2026.05", text: "Updated graduate transcript at CSRC / GSCAEP (32.0 credits, GPA 3.18 / 4.00)." },
    { date: "2026.04", text: "Completed TOEFL iBT — Overall 5.0 / 6 (100 / 120, CEFR C1)." },
    { date: "2025.11", text: "Completed GRE General Test — 323 + 3.5 (Verbal 155 / Quant 168 / AW 3.5)." },
    { date: "2025.10", text: "Completed GRE Mathematics Subject Test — Scaled Score 900 (90th Percentile)." }
  ],

  education: [
    {
      degree: "M.S. in Applied Mathematics",
      institution: "Beijing Computational Science Research Center (CSRC), Graduate School of CAEP",
      period: "2024 – 2027 (Expected)",
      detail: "GPA: 3.18 / 4.00 (32.0 Credits) · Numerical Analysis (95.0), Applied Modern Algebra (A-)"
    },
    {
      degree: "B.S. in Mathematics and Applied Mathematics",
      institution: "Xi'an Jiaotong University (XJTU)",
      period: "2020 – 2024",
      detail: "Xi'an, China"
    }
  ],

  interests: {
    research: [
      {
        title: "Numerical Analysis & Scientific Computing",
        description: "Finite element methods, variational principles, large-scale scientific computing, and computational fluid dynamics.",
        tags: ["Numerical Analysis", "FEM", "Scientific Computing"]
      },
      {
        title: "Applied Mathematics & Algebra",
        description: "Mathematical foundations of modeling, applied modern algebra, and mathematical logic for rigorous computation.",
        tags: ["Applied Math", "Modern Algebra", "PDEs"]
      },
      {
        title: "LLM Reasoning & AI for Science",
        description: "Exploring mathematical reasoning in foundation models, multi-agent workflows, and quantitative modeling.",
        tags: ["AI4Science", "LLM Reasoning", "AI Agents"]
      }
    ],
    personal: [
      { name: "Algorithmic Problem Solving", detail: "Data structures, competitive algorithms, and mathematical puzzles." },
      { name: "AI Coding Workflows", detail: "Exploring agentic developer tools and reproducible research pipelines." },
      { name: "Mathematical Reading", detail: "Collecting classic applied math and deep learning study notes." },
      { name: "Everyday Cooking & Life", detail: "Enjoying structured recipes and recharging away from the desk." }
    ]
  },

  // 论文模块暂保留板块常驻并留空；后续发表 arXiv 后直接在此数组添加条目即可
  papers: [],

  // CV 模块暂保留板块常驻并留空；后续放入 assets/cv.pdf 后将 pdfUrl 改为 "./assets/cv.pdf"
  cv: {
    pdfUrl: ""
  },

  // 官方成绩与成绩单（覆盖 assets/ 下的全部 3 份 PDF 文件）
  scores: [
    {
      visible: true,
      name: "GRE General Test",
      overall: "323 + 3.5",
      overallLabel: "Total Score",
      date: "Nov 16, 2025",
      note: "Official ETS Test Taker Score Report",
      reportPdfUrl: "./assets/gre-score.pdf",
      breakdown: [
        { label: "Verbal Reasoning", value: "155 (64th %ile)" },
        { label: "Quantitative Reasoning", value: "168 (80th %ile)" },
        { label: "Analytical Writing", value: "3.5 (40th %ile)" }
      ]
    },
    {
      visible: true,
      name: "GRE Mathematics Subject Test",
      overall: "900",
      overallLabel: "90th Percentile",
      date: "Oct 26, 2025",
      note: "Official ETS Subject Test Score Report",
      reportPdfUrl: "./assets/gre-score.pdf",
      breakdown: [
        { label: "Test Subject", value: "Mathematics" },
        { label: "Scaled Score", value: "900" },
        { label: "Percentile", value: "90th" }
      ]
    },
    {
      visible: true,
      name: "TOEFL iBT",
      overall: "5.0 / 6",
      overallLabel: "100 / 120 · CEFR C1",
      date: "Apr 11, 2026",
      note: "MyBest Scores match Apr 11, 2026 sitting",
      reportPdfUrl: "./assets/toefl-score.pdf",
      breakdown: [
        { label: "Reading", value: "6.0 / 6" },
        { label: "Listening", value: "5.5 / 6" },
        { label: "Writing", value: "4.5 / 6" },
        { label: "Speaking", value: "3.0 / 6" }
      ]
    },
    {
      visible: true,
      name: "M.S. Graduate Transcript (GSCAEP · CSRC)",
      overall: "3.18 / 4.00",
      overallLabel: "GPA · 32.0 Credits",
      date: "May 15, 2026",
      note: "Applied Mathematics · Official Graduate Transcript",
      reportPdfUrl: "./assets/transcript.pdf",
      breakdown: [
        { label: "Numerical Analysis", value: "95.0" },
        { label: "Applied Modern Algebra", value: "A-" },
        { label: "Large-Scale Scientific Computing", value: "B" },
        { label: "Proposal Defense (开题报告)", value: "Pass (Dec 2025)" }
      ]
    }
  ]
};
