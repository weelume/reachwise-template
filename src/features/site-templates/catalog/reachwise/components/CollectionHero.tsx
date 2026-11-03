'use client'
import {motion,useReducedMotion} from 'framer-motion'
import Link from './SiteLink'
import {ServiceDemo} from './ServiceChannels'
import {Radar} from '../motion/Radar'
import {services} from '../content/collections'
import {copy,text} from '../content/data'
import type {Locale,ReferencePage} from '../content/types'
export function CollectionHero({page,locale,basePath}:{page:ReferencePage;locale:Locale;basePath:string}){
 const reduced=useReducedMotion(),items=page.sections?.[0]?.items??page.items,heading=items.find(item=>item.tag==='h1')!,description=items.find(item=>item.tag==='p'&&item.text.length>80)!,dark=page.slug==='work'
 return <section className={`section collection-hero ${dark?'dark-section':''}`}><div className="collection-hero-grid"><div><p className="eyebrow">{text(items[0].text,locale)}</p><h1>{text(heading.text,locale)}</h1><p className="lead">{text(description.text,locale)}</p><div className="hero-actions"><Link className="primary" href={`${basePath}/contact`}>{copy(locale,'预约沟通','Book a call')}</Link><Link className="secondary" href={`${basePath}/pricing`}>{copy(locale,'查看报价','See pricing')}</Link></div></div><div className="collection-hero-visual">{page.slug==='services'?<ServiceDemo mode={0} locale={locale}/>:page.slug==='careers'?<Radar locale={locale}/>:<div className="hero-growth-report"><p>{copy(locale,'自然流量 · 过去十二个月','Organic traffic · last 12 months')}<span className="live-indicator">Live</span></p><strong>+212%</strong><small>{copy(locale,'相比上一年','vs. the year before')}</small><svg viewBox="0 0 520 140" aria-label={copy(locale,'自然流量增长示意','Illustrative organic traffic growth')}><motion.path d="M0 132L30 127L60 130L90 115L120 120L150 102L180 107L210 84L240 91L270 66L300 70L330 44L360 47L390 31L420 35L450 18L480 22L520 4" fill="none" stroke="currentColor" strokeWidth="3" initial={reduced?false:{pathLength:0}} whileInView={{pathLength:1}} viewport={{once:true}} transition={{duration:2}}/></svg><div>{[[copy(locale,'线索','Leads'),'2,940'],['CTR','4.8%'],['ROAS','6.2×']].map(([label,value])=><span key={label}>{label}<b>{value}</b></span>)}</div></div>}</div></div><ul className="collection-channel-strip">{services.map((service,i)=><li key={service.slug}><span>0{i+1}</span>{text(service.f1,locale)}</li>)}</ul></section>
}
