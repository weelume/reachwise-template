"use client"
import Link from './SiteLink'
import{usePathname,useRouter}from'next/navigation'
import{useEffect,useRef,useState,type ReactNode,type MouseEvent}from'react'
import{AnimatePresence,motion,useReducedMotion}from'framer-motion'
import{useBrand,useHost}from'../host'
import{brand}from'../config/brand'
import{acquireScrollLock}from'../motion/scrollLock'
import{navigation}from'../config/navigation'
import type{SiteTemplatePageProps}from'../../../types'
import'../theme.css'
import'../reach-theme.css'
import{HeaderBehavior,InteractiveWordmark}from'./ChromeBehavior'
import{TransitionProvider}from'./SiteLink'
import{FooterReveal}from'../motion/FooterReveal'
import{MagneticButtons}from'../motion/MagneticButtons'
const site={id:'reachwise'}
export function Shell({children,locale='zh',basePath}:{children:ReactNode}&SiteTemplatePageProps){
 const host=useHost(),name=useBrand(),pathname=usePathname(),router=useRouter(),reduced=useReducedMotion(),[menu,setMenu]=useState(false),trigger=useRef<HTMLButtonElement>(null),dialog=useRef<HTMLDivElement>(null)
 const root=basePath.replace(/\/en$/,''),alternate=locale==='en'?root:root+'/en',switchPath=alternate+pathname.slice(basePath.length)
 const href=(slug='')=>`${basePath}/${slug}`
 useEffect(()=>{const element=document.documentElement,previous=element.dataset.activeTemplate,previousLanguage=element.lang;element.dataset.activeTemplate='reachwise';element.lang=locale==='en'?'en':'zh-CN';return()=>{if(previous)element.dataset.activeTemplate=previous;else delete element.dataset.activeTemplate;element.lang=previousLanguage}},[locale])
 useEffect(()=>{if(!menu)return;const releaseScroll=acquireScrollLock();const first=dialog.current?.querySelector<HTMLAnchorElement>('a');first?.focus();function key(event:KeyboardEvent){if(event.key==='Escape'){setMenu(false);trigger.current?.focus()}if(event.key==='Tab'){const elements=dialog.current?.querySelectorAll<HTMLElement>('a,button');if(!elements?.length)return;const first=elements[0],last=elements[elements.length-1];if(event.shiftKey&&document.activeElement===first){event.preventDefault();last.focus()}else if(!event.shiftKey&&document.activeElement===last){event.preventDefault();first.focus()}}}document.addEventListener('keydown',key);return()=>{releaseScroll();document.removeEventListener('keydown',key)}},[menu])
 function switchLocale(event:MouseEvent<HTMLAnchorElement>){event.preventDefault();router.push(switchPath+window.location.search+window.location.hash)}
 const logo=host.logo,lightLogo=host.lightLogo??logo
 return <TransitionProvider><div className="site-reachwise" data-locale={locale}>
 {site.id==='caldoro'&&<div className="announcement" aria-label={locale==='zh'?'品牌标语':'Brand messages'}><div className="marquee-track">{[0,1].map(n=><span aria-hidden={n===1} key={n}>{locale==='zh'?'慢慢萃取 · 明亮出品　　你的日常阳光　　找到你的新宠　　':'SLOW BREWED. BRIGHTLY MADE.　　YOUR DAILY CUP OF SUNSHINE　　FIND YOUR NEW FAVORITE　　'}</span>)}</div></div>}
 <header className="site-header"><Link className="site-brand" href={href()} aria-label={locale==='zh'?`${name[locale]}首页`:`${name[locale]} home`}>{logo?<><img className="brand-logo-on-light" src={logo} alt="" width={24} height={24}/><img className="brand-logo-on-dark" src={lightLogo} alt="" width={24} height={24}/></>:<span className="brand-mark" aria-hidden="true"/>}<span>{name[locale]}</span></Link>
 <nav className="desktop-navigation" aria-label={locale==='zh'?'主导航':'Main navigation'}>{navigation.map(item=><Link key={item.slug} href={href(item.slug)}>{item[locale]}</Link>)}</nav>
 <div className="header-actions"><Link className="language-toggle" href={switchPath||'/'} onClick={switchLocale} hrefLang={locale==='zh'?'en':'zh-CN'} aria-label={locale==='zh'?'切换至英文':'Switch to Chinese'}>{locale==='zh'?'EN':'中'}</Link><Link className="primary header-contact" href={href(site.id==='waytech'?'#contact':'contact')}>{locale==='zh'?(site.id==='caldoro'?'找到我们':'聊聊项目'):(site.id==='caldoro'?'Find Caldoro':'Book a call')}</Link><button className="menu-toggle" type="button" ref={trigger} aria-expanded={menu} aria-controls="template-menu" aria-label={locale==='zh'?'打开菜单':'Open menu'} onClick={()=>setMenu(true)}><span/><span/></button></div></header>
 <AnimatePresence>{menu&&<motion.div className="menu-overlay" initial={reduced?false:{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} transition={{duration:.3}} id="template-menu" role="dialog" aria-modal="true" aria-label={locale==='zh'?'导航菜单':'Navigation menu'} ref={dialog}><button className="menu-close" onClick={()=>{setMenu(false);trigger.current?.focus()}} aria-label={locale==='zh'?'关闭菜单':'Close menu'}>×</button><nav>{navigation.map((item,index)=><motion.div key={item.slug} initial={reduced?false:{y:30,opacity:0}} animate={{y:0,opacity:1}} transition={{delay:index*.06,duration:.5}}><Link href={href(item.slug)} onClick={()=>setMenu(false)}><small>0{index+1}</small>{item[locale]}</Link></motion.div>)}<Link href={href(site.id==='waytech'?'#contact':'contact')} onClick={()=>setMenu(false)}>{locale==='zh'?'联系我们':'Contact'}</Link></nav></motion.div>}</AnimatePresence>
 <HeaderBehavior/><MagneticButtons/><main id="template-main">{children}</main>
 <FooterReveal><footer className="site-footer"><div className="footer-top"><div><Link href={href()} className="site-brand">{logo&&<img src={lightLogo} alt="" width={24} height={24}/>}<span>{name[locale]}</span></Link><p>{brand.tagline[locale]}</p></div><nav aria-label={locale==='zh'?'页脚导航':'Footer navigation'}>{navigation.map(item=><Link key={item.slug} href={href(item.slug)}>{item[locale]}</Link>)}<Link href={href(site.id==='waytech'?'#contact':'contact')}>{locale==='zh'?'联系我们':'Contact'}</Link></nav><div><p>{locale==='zh'?'保持联系':'Say hello'}</p><a href={`mailto:${brand.email}`}>{brand.email}</a>{host.marketplaceHref&&<Link href={host.marketplaceHref}>{host.marketplaceLabel?.[locale]}</Link>}</div></div><InteractiveWordmark locale={locale}/><div className="footer-bottom"><span>© {brand.year} {name[locale]}</span><div>{site.id!=='waytech'&&<Link href={href(site.id==='caldoro'?'':'privacy')}>{locale==='zh'?'隐私政策':'Privacy Policy'}</Link>}{site.id==='reachwise'&&<><Link href={href('terms')}>{locale==='zh'?'服务条款':'Terms'}</Link><Link href={href('cookies')}>{locale==='zh'?'Cookie 政策':'Cookies'}</Link></>}</div>{host.filing}</div></footer></FooterReveal>
 {host.marketplaceHref&&<Link className="marketplace-badge" href={host.marketplaceHref} aria-label={host.marketplaceAriaLabel?.[locale]}>{lightLogo&&<img src={lightLogo} width={24} height={24} alt=""/>}<span>{name[locale]}</span></Link>}
 </div></TransitionProvider>
}
