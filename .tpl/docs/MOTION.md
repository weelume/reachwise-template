# Reachwise 动效合同与验收清单

参考站：<https://joyful-studies-761814.framer.app/>。主要源码证据：公开首页模块、`toplevel-deps.DTSpelEt.mjs`、`RwFunnel.CPnTXwmE.mjs`、`RwNumbers.DIeCf4Ky.mjs`、`RwPricing.BEYesQPN.mjs` 及 RwTeam/RwFaq/RwCta 等组件。Hero包含公开GLSL与时间、尺寸、指针和点击uniform；单独保留照片或圆环不能证明等效。
## 证据与验收状态

本文件整理参考站公开 HTML 及其直接引用的 JavaScript/CSS 模块中的动效参数。研究只读取文本，没有执行下载的脚本。标注“源码”的内容是实现参考，不等同于参考站或本模板的浏览器运行结果；没有明确参数的项目保持“待确认”，不按经验补写为原站事实。

**本文件是参数合同，不把源码研究当作浏览器通过证据。** 实际执行的浏览器子项见 `.tpl/reports/browser.json`；未列入该记录的三端、双语、初始/运行/终态项目仍待验证，不据此宣称逐帧精确一致。减弱动态列区分“源码已确认”与“模板验收要求”；后者不能反推为原站行为。

### 通用执行方法

1. 按 `.tpl/project.json` 的运行合同启动本模板；所有安装、构建和构建验收在本地 Linux 文件系统完成，远端只接收已构建产物。
2. 在内置浏览器分别使用 PC 1440×900、iPad 1024×1366、H5 390×844，逐项执行本文件清单；再在断点前后各取 1px 复查。中文 `/` 与英文 `/en` 都执行，子页保持对应语言前缀。
3. 对每项保存初始态、运行中、终态，以及循环跨周期、离屏返回、hover/focus结束、路由返回的证据。截图不能证明循环速度；计时或录屏须覆盖指定时间。
4. 开启浏览器 `prefers-reduced-motion: reduce` 后重新载入，复查内容可见、按钮/键盘/触摸可用、背景无持续非必要运动。恢复正常设置再载入，确认没有残留锁、重复定时器或重复监听器。
5. 每次执行记录日期、源码提交、视口、语言、操作、结果和证据位置。只有实际执行后才把对应项从“待验证”改为通过或失败；构建、类型检查和源码存在都不能替代交互实测。

| 验收维度 | PC | iPad | H5 |
| --- | --- | --- | --- |
| 中文初始/运行/终态 | 待验证 | 待验证 | 待验证 |
| 英文初始/运行/终态 | 待验证 | 待验证 | 待验证 |
| 循环/离屏/返回 | 待验证 | 待验证 | 待验证 |
| 键盘/触控/菜单 | 待验证 | 待验证 | 待验证 |
| 减弱动态 | 待验证 | 待验证 | 待验证 |


## 全局交互与页面切换

| 区块 | 触发与参数（源码） | 断点/暂停恢复 | 减弱动态/状态 |
| --- | --- | --- | --- |
| 首次预加载 | 2.4s；People reached 1,284,300；Reaching the right crowd；支持点击/Esc/触屏跳过；会话`rw-loaded` | 完成或跳过清理背景锁与class；会话内不重播 | 源码跳过；待验证 |
| 路由幕布 | 离开/进入遮罩，duration .56s | 应覆盖内部页面导航而非整页刷新；前进后退需实测 | 源码跳过；待验证 |
| 页脚揭示 | 仅实际用于Footer：sticky与负margin叠放，CTA离开露出页脚；由`--rv`驱动；不是opacity替代 | 基本进度clamp((vh-top)/(vh+height))；长节`--pp`；共用raf lerp .18 | 模板要求正常文流直接可见；待验证 |
| 标题/大图 | 标题按词揭示、局部高亮展开；About三联照片及文章Hero大图clip揭开1.35s cubic(.7,0,.2,1)，scale1.28→1为1.9s cubic(.16,.84,.24,1)；视差Y=(progress−.5)*−7% | 按各页实际区块；返回不能重复隐藏已完成内容 | 模板要求无裁切/缩放/视差；待验证 |
| Magnetic按钮 | fine pointer+hover，半径150px，最大偏移8px；active scale.97/.12s | 指针离开归位；触屏不要求hover；不仅按钮内部命中区域 | 模板要求不磁吸；待验证 |
| 按钮填色/字滚动 | circle(0% at100%50%)→circle150%，.7s cubic(.7,0,.2,1)；文字向上滚动.5s同ease | hover/focus后离开恢复；不因装饰变化损失可读标签 | 模板要求即时颜色/静态文字；待验证 |
| Live点/按钮ping | live1.4s opacity blink；ping延迟.25s后1.2s scale1→3.2、两次 | 非必要持续运动应离屏暂停，实际源站策略待实测 | 模板要求停止循环；待验证 |
| 导航/手机菜单 | 滚动glass、隐藏、背景深浅色切换；手机菜单遮罩/焦点/背景锁 | 深浅章节边界、上滚/下滚均测试；断点具体布局以当前模板合同为准 | 模板要求保持菜单即时可用、焦点可见；待验证 |

## 首页 Hero：照片扫描、投放与数字

- WebGL照片cover，DPR<=1.6，入场zoom1.12→1；指针移动调整扫描中心。点击背景发起campaign波纹，最多8组；点击a/button/input/nav不发起背景投放。
- campaign chips：scale.4/opacity0→1，.5s cubic(.34,1.56,.64,1)；2600ms后收起，3200ms移除。扫描命中出现chip，不能仅所有点击点固定冒同一个提示。
- 初值1,284,300；投放增量在1400ms批次加入；各位0–9滚动，.7s cubic(.2,.8,.2,1)。示意数值，不是历史业务数据。
- fine pointer自定义指针reach/dot/btn随区域变化、点击ping；非hover设备不显示自定义指针，触屏点击仍可投放。
- 源码明确离屏暂停raf、返回恢复；减少动态park静态状态。验收需观察返回是否跳过波纹寿命，不可把“只不绘制”自动当作“暂停时间”。WebGL不可用必须明确报错，不能静默当动态通过。全项待验证。

## 首页 Clients / Crowd / Services / Case studies

| 区块 | 触发/参数（源码） | 响应与暂停/恢复 | 减弱动态/状态 |
| --- | --- | --- | --- |
| Clients雷达 | viewBox200²，环半径23/46/69/92，72个5°刻度、每30°大刻度；目标角=scrollProgress*540+elapsedSeconds*9−120，lerp .2；命中高亮1500ms，Last ping同步客户/badge | 只可见累积时间、dt<=.05s；H5隐藏四方向角标，copy上/radar下 | 静止40°且最近3节点亮；待验证 |
| Crowd人群筛选 | PC1200/iPad900/H5600；buyer1/12；三组权重.34/.4/.26；簇状初态+微游移；买家随滚动聚合Search/Feeds/Audiences，非买家变淡并避让 | PC中心(.42,.52)/(.63,.38)/(.84,.58)；iPad(.36,.52)/(.6,.4)/(.84,.56)；H5(.22,.2)/(.22,.5)/(.22,.8)；DPR<=2；fine pointer排斥/回弹；离屏暂停 | 直接最终分组；人数标签与真实数量一致；待验证 |
| 六服务通道 | floor(progress*actualCount)推进；PC横spine展开/H5纵stack；面板宽高按实际内容计算 | 手选锁4s；hover精指针140ms切换；键盘锁到pointer移动；方向循环/Home/End；隐藏面板inert，aria-expanded同步 | 模板要求即时选项切换、保留键盘；待验证 |
| 服务动态图形 | SEO排名上升、Social帖子、Paid Ads投放、Content内容、Web Design界面、Branding色彩与字形各自序列 | 不能六项共享同一图或仅换标题；离屏和隐藏面板不应持续循环 | 模板要求显示可识别静态终态；各序列精确计时待补实测 |
| 六案例tabs | CSS progress animationend每7s下一项；viewer ratio>.35且揭示接近完成或手动模式才计时 | hover/focus/离屏暂停、恢复续余量；H5当前tab滚入nearest；方向/Home/End选择并聚焦 | 停止自动切，手动仍可用；待验证 |
| 前后对比 | 首次滚动分隔85%→15%/lerp .2；手动切案例1.7s cubic-out重播；数字同步插值；旧出/新入各.8s，900ms清旧层 | 拖动clamp3%–97%；touch水平>8px且大于纵向才捕获，pan-y保留纵滚；Drag提示精指针lerp .22 | 初始50%，手动slider仍可改；待验证 |
| 对比键盘 | Left/Down−5%、Right/Up+5%、Home3%、End97%、PageDown−20%、PageUp+20%；aria值同步 | 不能以鼠标拖动替代键盘验收；切tab不丢焦点 | 手动能力保留；待验证 |

## 首页 Funnel：滚动区间与计数曲线

桌面>=1100且可运行动态时使用320svh pin，内部sticky100svh；iPad/H5及减少动态改普通rows。`pp=clamp(-pinTop/(pinHeight-vh))`，共享raf lerp .18；`n=clamp((pp-.04)/.86)*4`；阶段填充`f_i=clamp((n-i)*1.25)`，以左为原点scaleX。active为n<=.02时−1，否则min(3,floor(n))。

| i / 阶段 | 最终数值 | 开始pp | 填满pp | 转化说明 |
| --- | --- | --- | --- | --- |
| 0 Reach | 1,284,300 | .04 | .212 | 3.7% become clicks |
| 1 Clicks | 48,120 | .255 | .427 | 6.1% become leads |
| 2 Leads | 2,940 | .47 | .642 | 11% become clients |
| 3 Clients | 312 | .685 | .857 | 1 in 4,116 people reached |

- 阶段激活后计数为独立1400ms quartic-out `1-(1-t)^4`，并非直接用滚动比例计算数值；反滚未激活阶段归零。
- 四段形状是CSS polygon，边界inset `[0,7,14,21,27]%`；第i段top左右inset=q[i]，bottom=q[i+1]，不是四个独立梯形卡片。
- Canvas粒子沿真实band top/bottom插值边界流动，DPR<=2、最多420；出生26+30*clamp(n)个/s，x=.04+.92random，速度70+60random，半径1.6+1.2random；晋级视觉概率[.34,.3,.36]不等于业务转化率。离屏暂停，非单段内装饰浮点循环。
- 普通row的observer传入.5，但实际threshold=`min(.5,max(.005,80/rowHeight))`，一次激活；若在`.rw-rev.is-act`内还需`--rv>.1`。键盘focus-visible也可激活。row条宽`100%-i*12%`，scaleX0→1用1.3s cubic(.7,0,.2,1)、delay .15s。
- 减弱动态直接最终值/完整bar、取消pin与粒子运动。所有三端与往返状态待验证。

## 首页 Numbers：月度折线与事件ticker

四KPI月度曲线由最终KPI与英文label+index哈希确定性生成，不是真实历史月度数组。中文翻译不能改变同一示意数据。

| KPI | Jan→Dec显示值 |
| --- | --- |
| 212% average organic growth | 65%, 75%, 91%, 102%, 114%, 120%, 120%, 131%, 155%, 186%, 200%, 212% |
| 6.2× return on ad spend | 1.5×, 2.3×, 2.2×, 2.2×, 2.8×, 3.6×, 3.9×, 4.6×, 4.4×, 5.2×, 5.6×, 6.2× |
| 38M people reached in 2025 | 13M, 12M, 14M, 14M, 19M, 20M, 22M, 24M, 30M, 33M, 34M, 38M |
| 140+ brands grown since 2016 | 34+, 37+, 58+, 58+, 63+, 67+, 86+, 104+, 105+, 113+, 125+, 140+ |

生成规则：hash初值11，遍历label+index：`hash=(hash*33+charCode)>>>0`；t=monthIndex/11；上升factor=.3+.7*t^1.35；jitter在末月为0，其余`(((hash>>(monthIndex*2))&7)-3.5)/3.5*.06`；value=numericPart*max(.05,factor+jitter)。38M按数值38+后缀M，不能先乘百万。精确浮点由公式生成，显示保留原KPI小数位与后缀。

图viewBox `0 -4 300 88`，x=i/11*300，y=74−(value−min*.9)/(max−min*.9)*66。tooltip月索引=clamp(round((pointerX−left)/width*11),0,11)，位置按x/300与(y+4)/88。数字逐位计数/曲线描线的精确时长需与实际组件进一步核对，浏览器待验证。

事件带两份ul无缝循环，translateX0→−50%、48s linear infinite；不是固定px/s（速度=单组宽/48）。hover保留当前位置暂停；减少动态停止。离屏暂停策略源码未确认，模板需显式记录实际策略。原8条事件：

- New lead · Haven Realty · 2 min ago
- Call booked · Northside Dental · 6 min ago
- Reel passed 48k views · Kettlebrook Coffee · 11 min ago
- ROAS 6.4× today · Fitloop · 18 min ago
- #1 for “skin clinic near me” · Lumen Skin · 26 min ago
- 5-star review · Orbit Legal · 34 min ago
- New lead · Northside Dental · 41 min ago
- 212 new followers · Lumen Skin · 1 h ago

## Social wall、Team与Reviews

| 区块 | 参数（源码） | 暂停/断点/减弱动态 | 状态 |
| --- | --- | --- | --- |
| Social wall | PC5/iPad3/H52列；列间不同视差速度；整体skew由滚速驱动clamp±4deg，速度lerp.25、角度lerp.14，停滚回0 | hover like+1/心形scale1→1.45→1和波纹，离开恢复；媒体保留来源；模板要求减弱动态无视差/倾斜 | 待验证 |
| Team | 六成员随滚动计Specialists reached00/06并入场，真实个人详情链接 | 不得静态照片替代进度；减弱动态直接最终数量/可见卡片 | 待验证 |
| Reviews | 通知栈progress=clamp((.9vh−top)/(.62vh))；visibleCount=clamp(floor(progress*count+.35),0,count)；非定时新增 | focus进入锁自动变化，focusout恢复；高度PC168/H5204；减弱动态静态可读 | 待验证 |

## Pricing、FAQ、CTA与内页

- 价格：月度1900/3900/7500，季度每月1700/3500/6750；不统一乘.9。数字滚动.8s cubic(.2,.8,.2,1)，逐位delay.05/.1等，billing说明同步。
- 三卡扇形：sp=clamp((vh−sectionTop)/(vh+sectionHeight))，raf lerp .18；f=easeInOutCubic(clamp((sp−.08)/.3))，其中ease=t<.5?4*t³:1−(−2*t+2)³/2。d=index−(count−1)/2，三卡为[-1,0,1]，gx=卡宽+20px（iPad+14px）；X=d*gx*(f−1)，Y=(1−f)*90px，rotate=d*(1−f)*−7deg，origin50%120%，perspective1600px。初态中心叠放/左+7°右−7°，终态并排归零。
- hover上提10px，.55s cubic(.2,.8,.2,1)，阴影.5s。featured z5，其余3−abs(round(d))。featured conic边框4.2s linear无限，pulse2.8s cubic(.2,.6,.3,1)，scale1→(1.07,1.045)、opacity.9→0。
- checklist：k=clamp((sp−.22)/.26)，第j项t=clamp((k−j*.12)*3.2)；圆fill=t*100%，pathLength1、dashoffset1−t。
- 手机扇形transform:none、featured重排首位，Y30入场、delay120+i*90ms；减少动态无扇形/ring/pulse，check直接完成。离屏ring/pulse源行为需实测，模板要求不持续后台运动。
- FAQ默认第一项开，grid rows与符号同步；aria-controls和键盘可用。CTA本地时间按America/New_York每秒更新；email/budget只作本地校验及联系页上下文，不冒充已发送/保存。手机budget保留原生select触控。
- 服务/案例/人物详情、Pricing、Contact、文章和政策内页复用全局标题/图像/幕布；逐页导航及返回需执行，不因首页通过自动标记内页通过。全项待验证。

## 可执行验收步骤

1. 新会话计时预加载并分别用点击/Esc/触屏跳过；检查滚动恢复、同会话不重播。内部路由连续跳转和前进后退，确认幕布.56s、无整页刷新闪白。
2. Hero先移鼠标，再点击3个背景位置，记录环形扫描、chip、人数1400ms增量与逐位滚动；点击CTA不能额外触发背景。离屏10s后返回，记录时间是否连续；触屏点按重复；减弱动态应静态。
3. 雷达观察20s并滚动，记录节点命中/Last ping与角度；离屏15s返回确认不跳时。人群筛选在三端记录1200/900/600与1/12比例，移动鼠标检查排斥和回弹。
4. 六服务逐项hover、click、方向键/Home/End，等待4s复查滚动接管；键盘锁后不移指针滚动不应抢选。检查隐藏面板不会Tab进入。
5. 案例等待7s、hover/focus/离屏各停5s后恢复，确认剩余计时连续。拖到3/97边界；触屏先纵滚再横拖；完整执行slider键盘键并核对aria值和数字。
6. 在桌面漏斗pp=.04/.212/.255/.427/.47/.642/.685/.857附近停留，记录stage、bar与独立1.4s计数；反滚复查归零/再激活。小屏确认普通rows与80px观察阈值，粒子不以孤立浮点冒充跨段流动。
7. Numbers逐图从左到右移动，核对表内12个月值；记录48s事件循环和hover冻结。停止移动后tooltip移除；双语数据保持相同。
8. Social wall快速/慢速滚动，记录±4°内倾斜与停滚回0、各列差速；hover/移出检查like恢复。Team数到06并访问详情；Reviews滚动显隐、focus锁与focusout恢复。
9. Pricing观察叠放→展开中间态，双向切周期核价；手机featured最前；hover上提10px；计时ring4.2s/pulse2.8s/check错峰。FAQ长正文、CTA校验与预算选择各测一次。
10. 全流程开启减少动态重测，确认没有裁切隐藏内容、pin长空白、持续shader/radar/粒子/ticker/ring/pulse，所有手动控制仍可用。以上全部待验证。

## 1.0.1 小屏漏斗修正

上一版把桌面梯形复用到了小屏，未正确执行原组件的pin/flat分支。现仅在宽度不小于1100px使用固定梯形与跨层粒子；平板和手机改为独立可见性激活的平铺步骤，80px可见门槛、1.3秒横向填充与1.4秒四次缓出计数，键盘聚焦也可激活。内容与桌面共享同一数据集合，不重复维护步骤文案。实际复测见browser.json。
