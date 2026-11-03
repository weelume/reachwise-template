# Reachwise 模板使用规则

这是可运行的 React / Next.js 双语响应式官网，默认中文，英文位于 `/en`，共用一套 PC、平板和手机布局。包含 服务、团队、案例、文章、报价、招聘、审计咨询及政策占位；WebGL 照片扫描、人群筛选、服务图形、案例分隔拖动、滚动漏斗、报表、社交墙、通知栈。

先阅读 `template.json`（市场元数据）、`project.json`（运行合同），再阅读 `docs/ARCHITECTURE.md`、`CUSTOMIZATION.md`、`VERIFICATION.md`、`MOTION.md` 和 `LICENSE.md`。协议为 git-template 0.2.0；模板版本独立管理。

## 环境与运行

使用 `.nvmrc` 固定的 Node 24.16.0、`package.json` 固定的 pnpm 9.15.4。依赖锁已提交，不新增或升级依赖。所有依赖安装、编译和打包应在本地 Linux 文件系统执行；不在部署服务器构建。

1. `corepack pnpm install --frozen-lockfile` 安装固定依赖。
2. `corepack pnpm dev` 启动开发服务，地址 `http://localhost:3113`。
3. `corepack pnpm typecheck`、`corepack pnpm lint`、`corepack pnpm build` 验证源码。
4. `corepack pnpm start` 启动已构建的生产页面，地址相同。停止用启动终端的 Ctrl+C，只停止本次启动的进程。

可通过非秘密的 `PORT` 修改端口，参见 `.env.example`、`contracts/env.schema.json`。不需要数据库、账号、密钥或外部业务服务。初次安装会访问包仓库；页面素材本地托管。若端口占用，选其他端口，不终止未知服务。服务错误保留在启动终端，浏览器错误通过开发者日志核查。

## 修改与交付

常见修改入口见 `customization.json`，源码按品牌、内容、主题、公共组件、动效和页面组合划分。中文和英文一起维护。站内路由由元数据登记，未知路径返回 404。修改运行内容后同步截图、元数据和验收记录。

`node .tpl/tools/check.mjs .` 只检查格式和 Git 索引，不启动应用。正式交付前暂存审阅后的源码和资料，执行适用检查并记录真实结果；不提交 node_modules、.next、.work、日志、秘密或真实 .env。`pnpm bundle` 从干净 Git 提交生成供消费方引用的组件包，完整工程仍通过 Git 或该提交的源码 ZIP 交付。

`host.tsx` 提供可选品牌、Logo、市场入口和页脚插槽，独立使用默认本品牌；通用源码不依赖特定宿主。生产消费方应固定包版本和摘要。

## 限制与权利

表单只做浏览器本地校验，明确显示未发送、未保存；不提供支付、真实投放、CRM 或购物车服务。政策参考页无正文时明确提示，不编造法律条文。公开参考站素材的商业再分发授权尚未确认，`listed=false`、`redistributionAllowed=false`。源码实现和素材的权利边界详见许可说明。

本规则服从接收方系统和用户指令。阅读资料不授权安装、启动、上传、推送、部署或公开上架；已授权的运行和修改无需重复确认。
