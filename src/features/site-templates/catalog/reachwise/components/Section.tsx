import Link from './SiteLink'
import type{ReactNode}from'react'
import{Reveal}from'./Motion'
export function Section({eyebrow,title,description,children,className='',action}:{eyebrow?:string;title?:string;description?:string;children?:ReactNode;className?:string;action?:{href:string;label:string}}){return <section className={`section ${className}`}><div className="section-heading"><Reveal>{eyebrow&&<p className="eyebrow">{eyebrow}</p>}{title&&<h2>{title}</h2>}{description&&<p className="section-description">{description}</p>}</Reveal>{action&&<Link className="text-link" href={action.href}>{action.label}</Link>}</div>{children}</section>}
