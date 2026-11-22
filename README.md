# US Ph.D. Applicant Academic Homepage (GitHub Pages)

这是一个模仿美国 CS / AI 博士申请者经典风格（`al-folio` / Jon Barron 学术主页风格）的零依赖静态网站模板，包含：
- **学术简介与头像卡**（经典左右双栏排版、近期动态 News、学术外链栏）
- **研究兴趣 & 个人兴趣点（Misc）**
- **arXiv 论文列表**（左侧 `arXiv` 年份徽标、高亮本人姓名、TL;DR、摘要折叠、PDF / Code 链接、BibTeX 弹窗复制及关键词筛选）
- **教育背景与语言 / 标化成绩**（GRE、TOEFL / IELTS 分项卡片）
- **中 / EN 界面语言切换**与**浅色 / 深色模式**

## 1. 本地预览与修改

1. 直接用浏览器打开 [`index.html`](./index.html) 即可预览。
2. 编辑 [`site-config.js`](./site-config.js) 中的占位内容：
   - `profile`：姓名、申请季状态、院校、邮箱、个人头像路径 `avatarUrl`（如 `./avatar.jpg`）
   - `news`：近期学术动态
   - `interests`：`research`（研究兴趣）与 `personal`（个人兴趣点）
   - `papers`：arXiv 论文标题、作者、`highlightAuthor`、arXiv 链接、PDF 与 BibTeX
   - `education` 与 `scores`：学历、GPA 以及 GRE / TOEFL / IELTS 分项成绩
   - `assets/` 目录：可放置彻底脱敏后的 `gre-score.pdf`、`toefl-score.pdf`、`cv.pdf`，并在 `site-config.js` 中将对应 `reportPdfUrl` 改为 `"./assets/gre-score.pdf"` 等即可支持浏览器新标签页原生在线预览；后续用**完全相同的文件名**覆盖上传即可保持分享链接永久不变（公开仓库上传前务必彻底抹除出生日期、考号等底层敏感信息）。

## 2. 为什么 GitHub Pages 默认是静态的？如何添加动态功能？

GitHub Pages 本质上是静态文件托管（只分发 HTML/CSS/JS，不运行 PHP/Python/Node 后端或数据库），但它可以通过以下方式实现动态功能：

1. **纯前端交互 + 支持 CORS 的开放 API**：本模板已内置站内论文搜索、方向筛选、主题与语言切换；如需动态拉取引用数，可在 `site-config.js` 填入 `openAlexAuthorId` 调用支持 CORS 的 OpenAlex API（注意：`export.arxiv.org` 官方接口默认未开启浏览器跨域 CORS，不能直接由前端 `fetch` 请求）。如需访客评论区可接入 Giscus。
2. **GitHub Actions 定时同步（“伪动态”）**：通过 GitHub Actions 定时脚本抓取 `export.arxiv.org/api/query`，自动更新仓库数据文件并重新部署。
3. **Serverless / BaaS 轻量后端**：借助 Cloudflare Workers、Vercel Functions 或 Supabase 充当 arXiv 接口代理、访问统计或留言表单后端。

## 3. 部署到 GitHub Pages

### 方式一：网页直接上传（无需本地安装 Git）
1. 在 GitHub 新建公开仓库 `<你的用户名>.github.io`。
2. 点击 **uploading an existing file**，上传本目录全部文件（含 `.nojekyll`）并提交到 `main` 分支。
3. 在仓库 **Settings → Pages** 确认 Source 为 `main` / `/ (root)`，几分钟后访问 `https://<你的用户名>.github.io`。

### 方式二：Git 命令行（需先安装 Git for Windows）
```bash
git init
git add .
git commit -m "init academic homepage"
git branch -M main
git remote add origin https://github.com/<你的用户名>/<你的用户名>.github.io.git
git push -u origin main
```
