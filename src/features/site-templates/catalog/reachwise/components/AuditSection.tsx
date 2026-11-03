import {AuditForm,Availability} from './AuditForm'
import {copy} from '../content/data'
import type {Locale} from '../content/types'
export function AuditSection({locale}:{locale:Locale}){return <section className="section audit-section"><p className="eyebrow">{copy(locale,'(11) 免费诊断','(11) FREE AUDIT')}</p><div className="audit-layout"><div><h2>{copy(locale,'准备好　被看见了吗','Ready to be seen?')}</h2><p>{copy(locale,'免费用 30 分钟诊断网站、社交账号与广告。无论是否合作，方案都属于你。','Get a free 30-minute audit of your site, socials and ads. You keep the plan, whether we work together or not.')}</p><AuditForm locale={locale}/></div><Availability locale={locale}/></div></section>}
