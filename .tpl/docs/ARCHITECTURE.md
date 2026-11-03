# 架构

`src/app/[[...slug]]/page.tsx` 是独立路由入口，按登记页面静态生成中文和英文，未知 slug 返回 404。`src/app/layout.tsx` 仅提供根布局。

通用功能位于 `src/features/site-templates/catalog/reachwise/`：

- `meta.ts`：页面登记、延迟载入、展示资料。导出 `template` 供消费方引用。
- `host.tsx`：可选宿主插槽与默认品牌。只依赖 React，不引用消费方实现。
- `config/`：品牌、导航及通用选项。
- `content/`：原页面语义数据、中文映射和分类集合；`data.ts` 统一查询、站内 URL 映射与素材解析。缺译或缺素材会明确报错，禁止静默回源。
- `components/`：导航、页脚、卡片、表单、折叠与跨页区块。
- `motion/`：动态视觉、生命周期、暂停与交互状态；动效细节见 MOTION.md。
- `pages/`：首页及各类业务页面组合。无后端或持久化业务层。
- `theme.css` 及专属主题文件：模板作用域内的主题令牌、布局、滚动条与交互状态。根滚动条状态在模板卸载后恢复。

运行素材位于 `public/templates/reachwise/`，`assets-map.json` 将来源映射为本地地址；`.tpl/assets/` 只保存真实展示截图。`docs/ASSETS.json`、IMAGE-USAGE.md、FONT-USAGE.md 记录来源与权利状态。

页面内部使用客户端导航，语言切换保留对应路径、query 和 hash。动画优先复用已有 framer-motion，Canvas/WebGL 只用于参考站所需的图形。事件、观察器、定时器和绘制循环在卸载时清理。演示交互与真实业务请求分开，表单不发送网络请求。
