'use client'
import { useEffect, useRef, useState } from 'react'
import { useReducedMotion } from 'framer-motion'
import { copy } from '../content/data'
import type { Locale } from '../content/types'

interface Particle { u:number; y:number; speed:number; stage:number; dying:number; radius:number; phase:number }
const insets=[0,7,14,21,27]
const pass=[.34,.3,.36]

/** 粒子按真实梯形边界收拢；视觉采样概率不代表业务转化率。 */
export function FunnelParticles({progress,locale}:{progress:number;locale:Locale}) {
  const canvas=useRef<HTMLCanvasElement>(null), latest=useRef(progress), reduced=useReducedMotion(), [error,setError]=useState(false)
  useEffect(()=>{latest.current=progress},[progress])
  useEffect(()=>{
    const surface=canvas.current, host=surface?.parentElement
    if(!surface||!host||reduced)return
    const context=surface.getContext('2d')
    if(!context){console.error('[reachwise:funnel] Canvas 2D unavailable');queueMicrotask(()=>setError(true));return}
    let width=1,height=1,dpr=1,frame=0,last=0,birth=0,visible=false,desktop=false
    let bands:number[][]=[], particles:Particle[]=[]
    function resize(){
      width=host!.clientWidth;height=host!.clientHeight;dpr=Math.min(devicePixelRatio,2);desktop=innerWidth>=1100
      surface!.width=Math.round(width*dpr);surface!.height=Math.round(height*dpr)
      const box=host!.getBoundingClientRect()
      bands=[...host!.querySelectorAll('.funnel-row')].map(row=>{const rect=row.getBoundingClientRect();return[rect.top-box.top,rect.bottom-box.top]})
      particles=[]
    }
    const size=new ResizeObserver(resize);size.observe(host);resize()
    const observer=new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;last=0},{rootMargin:'10% 0px'});observer.observe(host)
    function edge(y:number){for(let i=0;i<bands.length;i++){const[top,bottom]=bands[i];if(y<=bottom)return y<top?insets[i]/100:(insets[i]+(insets[i+1]-insets[i])*(y-top)/Math.max(1,bottom-top))/100}return insets[bands.length]/100}
    function tick(now:number){
      const delta=last?Math.min(.05,(now-last)/1000):0;last=now
      if(visible&&desktop&&bands.length){
        const n=latest.current,active=Math.min(bands.length-1,Math.floor(Math.max(0,n))),complete=n>=bands.length-.02
        birth+=delta*(26+30*Math.max(0,Math.min(1,n)))
        while(birth>1){birth--;particles.push({u:.04+Math.random()*.92,y:bands[0][0]-6,speed:70+Math.random()*60,stage:0,dying:0,radius:1.6+Math.random()*1.2,phase:Math.random()*6.28})}
        context!.setTransform(dpr,0,0,dpr,0,0);context!.clearRect(0,0,width,height)
        for(let i=particles.length-1;i>=0;i--){
          const p=particles[i];p.y+=p.speed*delta*(1+p.stage*.25);p.u+=Math.sin(now/500+p.phase)*.0009+(.5-p.u)*delta*.08*p.stage
          const band=bands[Math.min(p.stage,bands.length-1)]
          if(!p.dying&&p.y>band[1]){const lastStage=complete?bands.length-1:active;if(p.stage>=lastStage){p.dying=.001;if(p.stage===bands.length-1&&complete)p.stage=9}else if(Math.random()<pass[p.stage])p.stage++;else p.dying=.001}
          if(p.dying)p.dying+=delta*2.2
          if(p.dying>1||p.y>height+10){particles.splice(i,1);continue}
          const inset=edge(p.y),x=width*(inset+p.u*(1-2*inset)),alpha=(1-p.dying)*(.35+.15*Math.min(3,p.stage))
          context!.beginPath();context!.arc(x,p.y,p.radius+(p.stage>=3?1.4:p.stage*.3),0,Math.PI*2)
          context!.fillStyle=p.stage>=3?`rgba(255,62,136,${Math.min(1,alpha+.4)})`:`rgba(13,14,16,${alpha})`;context!.fill()
        }
        if(particles.length>420)particles.splice(0,particles.length-420)
      }
      frame=requestAnimationFrame(tick)
    }
    frame=requestAnimationFrame(tick)
    return()=>{cancelAnimationFrame(frame);size.disconnect();observer.disconnect()}
  },[reduced])
  return <><canvas className="funnel-particle-canvas" ref={canvas} aria-hidden="true"/>{error&&<p role="alert">{copy(locale,'漏斗粒子画布不可用。','The funnel particle canvas is unavailable.')}</p>}</>
}
