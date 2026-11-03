'use client'
import {useRef} from 'react'
import {motion,useScroll,useSpring,useReducedMotion} from 'framer-motion'
import Link from '../components/SiteLink'
import {Shell} from '../components/Shell'
import {CaseComparison} from '../components/CaseComparison'
import {Content} from '../components/Content'
import {AuditSection} from '../components/AuditSection'
import {WorkCard} from '../components/WorkCard'
import {work} from '../content/collections'
import {copy,text} from '../content/data'
import type {ContentItem,ReferencePage} from '../content/types'
import type {SiteTemplatePageProps} from '../../../types'

export function Case({page,locale='zh',basePath}:SiteTemplatePageProps&{page:ReferencePage}){
 const index=work.findIndex(item=>`work/${item.slug}`===page.slug),item=work[index],root=useRef<HTMLDivElement>(null),{scrollYProgress}=useScroll({target:root,offset:['start start','end end']}),smooth=useSpring(scrollYProgress,{stiffness:100,damping:30}),reduced=useReducedMotion()
 if(!item)throw new Error(`Case not registered: ${page.slug}`)
 const source=page.sections?.[0]?.items??page.items,chapters:{name:string;items:ContentItem[]}[]=[]
 for(const content of source){if(content.tag==='h2')chapters.push({name:content.text,items:[]});else if(chapters.length&&['p','span','li'].includes(content.tag)&&!/^\(\d{2}\)$/.test(content.text))chapters.at(-1)!.items.push(content)}
 const quote=source.find(content=>content.tag==='blockquote'),caption=source.find(content=>content.tag==='figcaption'),before=Number(item.f6.replace(/[^\d.]/g,'')),after=Number(item.f7.replace(/[^\d.]/g,'')),next=work[(index+1)%work.length]
 return <Shell locale={locale} basePath={basePath}><section className="section dark-section case-page-hero"><div className="case-title-grid"><div><p className="eyebrow">{item.f1} · {text(item.f3,locale)}</p><h1>{text(item.f2,locale)}</h1></div><dl>{[[copy(locale,'客户','Client'),item.f1],[copy(locale,'行业','Industry'),text(item.f3,locale)],[copy(locale,'年份','Year'),item.f9],[copy(locale,'服务','Services'),item.f4.split(';').map(channel=>text(channel,locale)).join(' · ')]].map(([label,value])=><div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}</dl></div><CaseComparison items={[item]} autoplay={false} details={false} locale={locale} basePath={basePath}/><div className="case-kpi-strip"><div><p>{text(item.f5,locale)}</p><strong><span>{item.f6}{item.f8}</span> / {item.f7}{item.f8}</strong></div><div><p>{copy(locale,'十二个月的成果','Results over 12 months')}</p><span>{text(item.f10,locale)}</span></div><div><p>{copy(locale,'增长倍数','Growth')}</p><strong>{(after/before).toFixed(1)}×</strong></div></div></section><div className="section case-story" ref={root}><aside><p className="eyebrow">{copy(locale,'案例目录','IN THIS CASE')}</p><nav>{chapters.map((chapter,i)=><a href={`#case-chapter-${i}`} key={chapter.name}><span>0{i+1}</span>{text(chapter.name,locale)}</a>)}</nav><div className="case-reading-track"><motion.i style={{scaleY:reduced?scrollYProgress:smooth}}/></div></aside><article>{chapters.length?chapters.map((chapter,i)=><section key={chapter.name} id={`case-chapter-${i}`}><p className="eyebrow">(0{i+1})</p><h2>{text(chapter.name,locale)}</h2><Content items={chapter.items} locale={locale} basePath={basePath}/></section>):<p>{text(item.f10,locale)}</p>}{quote&&<blockquote className="case-client-quote"><p>{text(quote.text,locale)}</p>{caption&&<footer>{text(caption.text,locale)}</footer>}</blockquote>}</article></div><div className="case-mobile-progress"><motion.i style={{scaleX:reduced?scrollYProgress:smooth}}/></div><section className="section case-next"><div><p className="eyebrow">{copy(locale,'下一个成果属于你','YOUR RESULTS NEXT')}</p><h2>{copy(locale,'为你的品牌　找对下一步','Find the next step for your brand.')}</h2><Link className="primary" href={`${basePath}/contact`}>{copy(locale,'聊聊你的项目','Discuss your project')}</Link></div><div><p className="eyebrow">{copy(locale,'下一个案例','NEXT CASE')}</p><WorkCard item={next} locale={locale} basePath={basePath}/></div></section><AuditSection locale={locale}/></Shell>
}
