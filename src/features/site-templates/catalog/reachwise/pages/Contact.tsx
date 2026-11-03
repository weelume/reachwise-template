import type{SiteTemplatePageProps}from'../../../types'
import type{ReferencePage}from'../content/types'
import{Shell}from'../components/Shell'
import{AuditForm,Availability}from'../components/AuditForm'
import{copy,text,title}from'../content/data'
export function Contact({page,locale='zh',basePath}:SiteTemplatePageProps&{page:ReferencePage}){const name=title(page),description=page.items.find(item=>item.tag==='p'&&item.text.length>80);return <Shell locale={locale} basePath={basePath}><section className="section contact-page"><div><p className="eyebrow">{copy(locale,'免费诊断','FREE AUDIT')}</p><h1>{text(name,locale)}</h1>{description&&<p className="lead">{text(description.text,locale)}</p>}<Availability locale={locale}/></div><AuditForm locale={locale} full/></section></Shell>}
