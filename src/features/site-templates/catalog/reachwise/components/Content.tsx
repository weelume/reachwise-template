"use client"
import Link from'./SiteLink'
import{Fragment}from'react'
import{motion}from'framer-motion'
import{Reveal}from'./Motion'
import{text,routeHref}from'../content/data'
import type{ContentItem,Locale}from'../content/types'
/** 保留语义层级与可用链接；仅去除同一份正文里的替代分支重复。 */
export function Content({items,locale,basePath='',timeline=false}:{items:ContentItem[];locale:Locale;basePath?:string;timeline?:boolean}){const seen=new Set<string>(),links=new Set(items.filter(item=>item.tag==='a').map(item=>item.text));return <div className="content-flow">{items.map((item,i)=>{if(seen.has(item.text)||!item.text.trim()||item.tag==='button'||item.tag==='p'&&links.has(item.text))return null;seen.add(item.text);const value=text(item.text,locale);if(item.tag==='h1')return null;if(item.tag==='a'&&(item.resolvedHref||item.href))return <p key={i}><Link className="text-link" href={routeHref(item.resolvedHref??item.href!,basePath)}>{value}</Link></p>;if(item.tag==='h2')return <Reveal key={i}><h2>{value}</h2></Reveal>;if(item.tag==='h3')return <h3 key={i}>{value}</h3>;if(item.tag==='h4')return <h4 key={i}>{value}</h4>;if(item.tag==='li')return <ul key={i}><li>{value}</li></ul>;if(timeline&&/^(19|20)\d{2}$/.test(item.text))return <motion.p key={i} className="timeline-year" initial={{opacity:.3}} whileInView={{opacity:1}} viewport={{once:true,amount:.15}} transition={{duration:.6}}>{value}</motion.p>;return <Fragment key={i}><p className={value.length<30?'content-label':''}>{value}</p></Fragment>})}</div>}
