import Link from '../components/SiteLink'
import {Shell} from '../components/Shell'
import {AuditSection} from '../components/AuditSection'
import {WorkCard} from '../components/WorkCard'
import {team,work} from '../content/collections'
import {copy,media,text} from '../content/data'
import type {ReferencePage} from '../content/types'
import type {SiteTemplatePageProps} from '../../../types'
export function Member({page,locale='zh',basePath}:SiteTemplatePageProps&{page:ReferencePage}){
 const member=team.find(item=>`team/${item.slug}`===page.slug)
 if(!member)throw new Error(`Team member not registered: ${page.slug}`)
 const section=page.sections?.[0],items=section?.items??page.items,description=items.find(item=>item.tag==='p'&&item.text.length>100&&item.text!==member.f3),bulletStart=items.findIndex(item=>item.tag==='h2'&&item.text==='What I work on'),bullets=bulletStart<0?[]:items.slice(bulletStart+1,bulletStart+4).filter(item=>item.tag==='li'),related=work.filter(item=>section?.links.some(link=>new URL(link.resolvedHref??link.href,page.url).pathname===`/work/${item.slug}`))
 return <Shell locale={locale} basePath={basePath}><section className="section member-detail"><figure><img src={media(member.img)} alt={member.f1}/><span className="outcome-chip">{text(member.f4,locale)}</span></figure><div><p className="eyebrow">{copy(locale,'团队','Team')} · {text(member.f2,locale)}</p><h1>{text(member.f1,locale)}</h1><p className="member-role">{text(member.f2,locale)}</p><p className="lead">{text(member.f3,locale)}</p>{description&&<p>{text(description.text,locale)}</p>}{bullets.length>0&&<><h2>{copy(locale,'我的工作','What I work on')}</h2><ul>{bullets.map(item=><li key={item.text}>{text(item.text,locale)}</li>)}</ul></>}<div className="hero-actions"><Link className="primary" href={`${basePath}/contact`}>{copy(locale,'与我们合作','Work with us')}</Link><a className="secondary" href={member.f5}>LinkedIn</a></div></div></section>{related.length>0&&<section className="section"><h2>{copy(locale,'参与的案例','Selected cases')}</h2><div className="proof-grid">{related.map(item=><WorkCard item={item} locale={locale} basePath={basePath} key={item.slug}/>)}</div></section>}<section className="section"><h2>{copy(locale,'更多团队成员','The rest of the team')}</h2><div className="other-team">{team.filter(item=>item.slug!==member.slug).map(item=><Link href={`${basePath}/team/${item.slug}`} key={item.slug}><figure><img src={media(item.img)} alt={item.f1} loading="lazy"/></figure><h3>{text(item.f1,locale)}</h3><p>{text(item.f2,locale)}</p></Link>)}</div></section><AuditSection locale={locale}/></Shell>
}
