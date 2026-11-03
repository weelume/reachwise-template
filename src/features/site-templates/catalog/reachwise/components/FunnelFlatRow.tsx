'use client'
import {useEffect,useRef,useState} from 'react'
import {animate,motion,useReducedMotion} from 'framer-motion'
import {copy} from '../content/data'
import {stages} from '../content/funnel'
import type {Locale} from '../content/types'

/** 小屏使用独立可见性门槛，不能由桌面pin进度批量激活四行。 */
export function FunnelFlatRow({stage,index,locale}:{stage:(typeof stages)[number];index:number;locale:Locale}){
 const root=useRef<HTMLElement>(null),[active,setActive]=useState(false),[count,setCount]=useState(0),reduced=useReducedMotion()
 useEffect(()=>{
  const row=root.current;if(!row)return
  if(reduced){queueMicrotask(()=>setActive(true));return}
  let observer:IntersectionObserver|undefined,done=false
  const configure=()=>{if(done)return;observer?.disconnect();observer=new IntersectionObserver(entries=>{if(entries[0].isIntersecting){done=true;setActive(true);observer?.disconnect()}},{threshold:Math.min(.5,Math.max(.005,80/Math.max(1,row.clientHeight)))});observer.observe(row)}
  const resize=new ResizeObserver(configure);resize.observe(row);configure()
  return()=>{observer?.disconnect();resize.disconnect()}
 },[reduced])
 useEffect(()=>{if(!active)return;const controls=animate(0,stage.value,{duration:reduced?0:1.4,ease:t=>1-(1-t)**4,onUpdate:value=>setCount(Math.round(value))});return()=>controls.stop()},[active,reduced,stage.value])
 return <article className={`funnel-flat-row ${active?'is-active':''}`} ref={root} tabIndex={0} onFocus={()=>setActive(true)} aria-label={`${copy(locale,stage.zh,stage.en)}: ${stage.value.toLocaleString('en-US')}`}><header><span>0{index+1}</span><h3>{copy(locale,stage.nameZh,stage.name)}</h3><small>{copy(locale,stage.timeZh,stage.time)}</small></header><div className="funnel-flat-bar" style={{width:`${100-index*12}%`}}><motion.i initial={reduced?false:{scaleX:0}} animate={{scaleX:active?1:0}} transition={{duration:reduced?0:1.3,delay:reduced?0:.15,ease:[.7,0,.2,1]}}/><span>{copy(locale,stage.zh,stage.en)}</span><strong>{count.toLocaleString(locale==='zh'?'zh-CN':'en-US')}</strong></div><p className="funnel-flat-conversion">{copy(locale,stage.detailZh,stage.detail)}</p><p>{copy(locale,stage.bodyZh,stage.body)}</p></article>
}
