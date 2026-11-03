'use client'
import {useEffect,useRef,useState,type RefObject} from 'react'
import {useReducedMotion} from 'framer-motion'
import type {Locale} from '../content/types'
import {copy} from '../content/data'

export function HeroCursor({host,locale}:{host:RefObject<HTMLElement|null>;locale:Locale}) {
 const root=useRef<HTMLDivElement>(null),reduced=useReducedMotion(),[mode,setMode]=useState('out'),[ping,setPing]=useState(0)
 useEffect(()=>{
  const surface=host.current,cursor=root.current
  if(!surface||!cursor||reduced)return
  const media=matchMedia('(min-width:810px) and (hover:hover) and (pointer:fine)')
  let targetX=0,targetY=0,x=0,y=0,frame=0,enabled=media.matches
  const configure=()=>{enabled=media.matches;surface.classList.toggle('has-reach-cursor',enabled);if(!enabled)setMode('out')};configure();media.addEventListener('change',configure)
  const move=(event:PointerEvent)=>{if(!enabled)return;targetX=event.clientX;targetY=event.clientY;const target=event.target as Element;setMode(target.closest('a,button,.hero-channel-list')?'btn':target.closest('h1,p')?'dot':'reach')}
  const leave=()=>setMode('out'),down=(event:PointerEvent)=>{if(enabled&&event.button===0&&!(event.target as Element).closest('a,button'))setPing(value=>value+1)}
  function tick(){x+=(targetX-x)*.28;y+=(targetY-y)*.28;cursor!.style.transform=`translate3d(${x}px,${y}px,0)`;frame=requestAnimationFrame(tick)}frame=requestAnimationFrame(tick)
  surface.addEventListener('pointermove',move);surface.addEventListener('pointerleave',leave);surface.addEventListener('pointerdown',down)
  return()=>{cancelAnimationFrame(frame);media.removeEventListener('change',configure);surface.classList.remove('has-reach-cursor');surface.removeEventListener('pointermove',move);surface.removeEventListener('pointerleave',leave);surface.removeEventListener('pointerdown',down)}
 },[host,reduced])
 return <div className={`reach-cursor mode-${mode}`} ref={root} aria-hidden="true"><div className="reach-cursor-ring"><b/>{mode==='reach'&&<span>{copy(locale,'触达','Reach')}</span>}</div>{ping>0&&<i className="reach-cursor-ping" key={ping}/>}</div>
}
