"use client"
import{useRef,useState}from'react'
import{motion,useScroll,useSpring,useReducedMotion}from'framer-motion'
import type{SiteTemplatePageProps}from'../../../types'
import type{ReferencePage}from'../content/types'
import{Shell}from'../components/Shell'
import{Content}from'../components/Content'
import{ImageReveal}from'../motion/ImageReveal'
import{copy,media,pageImage,text,title}from'../content/data'
export function Article({page,locale='zh',basePath}:SiteTemplatePageProps&{page:ReferencePage}){const root=useRef<HTMLElement>(null),{scrollYProgress}=useScroll({target:root,offset:['start start','end end']}),spring=useSpring(scrollYProgress,{stiffness:100,damping:30}),reduced=useReducedMotion(),[copied,setCopied]=useState(false),[error,setError]=useState(''),name=title(page),image=pageImage(page),items=(page.bodyItems??page.items).filter(item=>item.text!==name);async function copyLink(){try{await navigator.clipboard.writeText(location.href);setCopied(true);setError('')}catch(reason){console.error('[reachwise:copy-link]',reason);setError(copy(locale,'无法复制，请从地址栏复制链接。','Unable to copy. Please copy the link from the address bar.'))}}return <Shell locale={locale} basePath={basePath}><motion.div className="reading-progress" style={{scaleX:reduced?scrollYProgress:spring}}/><article className="article-page section" ref={root}><p className="eyebrow">{copy(locale,'文章与资料','ARTICLE & RESOURCES')}</p><h1>{text(name,locale)}</h1>{image&&<ImageReveal className="article-cover-reveal" src={media(image)} alt={text(name,locale)} shape="iris" delay={.25} parallax={2.2}/>}<button className="secondary" onClick={copyLink}>{copied?copy(locale,'链接已复制','Link copied'):copy(locale,'复制链接','Copy link')}</button>{error&&<p role="alert">{error}</p>}{page.placeholder?<p className="source-unavailable">{copy(locale,'参考站此地址没有提供可读取的正文，暂不编造内容。','The reference does not provide readable content at this address.')}</p>:<Content items={items} locale={locale} basePath={basePath}/>}</article></Shell>}
