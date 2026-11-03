'use client'
import {motion,useReducedMotion} from 'framer-motion'
import Link from './SiteLink'
import {team} from '../content/collections'
import {copy,media,text} from '../content/data'
import type {Locale} from '../content/types'
export function TeamGrid({locale,basePath}:{locale:Locale;basePath:string}){const reduced=useReducedMotion();return <div className="specialist-grid">{team.map((person,i)=><motion.article className="specialist-card" key={person.slug} initial={reduced?false:{y:50,opacity:0}} whileInView={{y:0,opacity:1}} viewport={{once:true,amount:.2}} transition={{duration:.9,delay:(i%3)*.08,ease:[.16,.84,.24,1]}}><Link href={`${basePath}/team/${person.slug}`}><figure><img src={media(person.img)} alt={copy(locale,`${person.f1}，${text(person.f2,locale)}`,`${person.f1}, ${person.f2}`)} loading="lazy"/><span>{text(person.f4,locale)}</span><small>0{i+1}</small></figure><h3>{text(person.f1,locale)}</h3></Link><p>{text(person.f2,locale)}</p><a href={person.f5} target="_blank" rel="noreferrer" aria-label={`${person.f1} LinkedIn`}>LinkedIn</a></motion.article>)}</div>}
