import Link from'./SiteLink'
import{Reveal}from'./Motion'
export function Card({title,description,image,href,tag,index=0}:{title:string;description?:string;image?:string;href:string;tag?:string;index?:number}){return <Reveal delay={Math.min(index*.06,.24)} className="card"><Link href={href}>{image&&<div className="card-image"><img src={image} alt={title} loading="lazy"/></div>}<div className="card-content">{tag&&<p className="eyebrow">{tag}</p>}<h3>{title}</h3>{description&&<p>{description}</p>}</div></Link></Reveal>}
