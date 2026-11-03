import type{SiteTemplatePageProps}from'../../../types'
import{Shell}from'../components/Shell'
import{Section}from'../components/Section'
import{Pricing}from'../components/Pricing'
import{Accordion}from'../components/Accordion'
import{copy,text}from'../content/data'
import{faqs}from'../content/collections'
export function PricingPage({locale='zh',basePath}:SiteTemplatePageProps){return <Shell locale={locale} basePath={basePath}><div className="pricing-page-top section"><h1>{copy(locale,'简单清楚的月度合作','Simple monthly retainers.')}</h1><Section eyebrow={copy(locale,'价格','PRICING')} description={copy(locale,'选择适合你的渠道，每月清晰衡量每一项成果。','Pick the channels you need. Every plan comes with a strategist, a live dashboard and plain-number reports.')}><Pricing locale={locale} basePath={basePath}/></Section></div><Section title={copy(locale,'常见问题','Questions, answered.')}><Accordion items={faqs.map(item=>({title:text(item.f1,locale),content:<p>{text(item.f2,locale)}</p>}))}/></Section></Shell>}
