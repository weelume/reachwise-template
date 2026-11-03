# 修改指南

工作目录均相对工程根。先理解现有实现，再按 `customization.json` 定位。

- 换品牌：修改 `src/features/site-templates/catalog/reachwise/config/brand.ts`，同时更新市场名称和实际截图；Logo 通过现有 host 插槽或本地素材提供。
- 改文案和内容：修改同目录 `content/`；原文、中文映射、分类集合一起维护，禁止把缺译默默显示成英文。首页特定组合内容在 `pages/Home.tsx`，修改时保持双语对应。
- 改颜色、字号、圆角：调整 `theme.css` 及专属主题文件中的语义变量，保留作用域、滚动条、focus 和对比度。中文 MiSans 400/700，英文数字 Poppins 400/600/700。
- 换图片或视频：素材放 `public/templates/reachwise/`，同步 `assets-map.json` 与来源记录。真实解码检查图片尺寸和视频播放，不以文件扩展名作为通过证据。
- 改动效：在 `motion/` 与对应组件调整，先阅读 MOTION.md；保留触发条件、循环停止恢复、触控和键盘操作、减少动态效果偏好。
- 增删页面：同步 `content/pages.json`、`meta.ts`、页面组合、导航及 `.tpl/template.json`。路径必须在两种语言均可访问，未知路径保持 404。
- 改表单：沿用本地演示语义，不增加未经授权的外部发送、持久化或隐式兜底。

简单内容修改检查受影响页面；路由或结构修改执行 typecheck、lint、build。正式交付更新展示截图和实际验收报告，再执行格式检查。不要覆盖用户已有变更，不增加未经批准的依赖。
