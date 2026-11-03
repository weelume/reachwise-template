'use client'
import { useEffect,useRef,type ReactNode } from 'react'
import { useReducedMotion } from 'framer-motion'

/** 页脚在前一区块下方揭出；尺寸变化时重新计算遮挡高度。 */
export function FooterReveal({children}:{children:ReactNode}) {
  const root=useRef<HTMLDivElement>(null), inner=useRef<HTMLDivElement>(null), reduced=useReducedMotion()
  useEffect(()=>{
    const host=root.current,content=inner.current
    if(!host||!content)return
    let frame=0,reveal=0,height=1,visible=false
    const resize=()=>{height=Math.min(content.scrollHeight,innerHeight);host.style.setProperty('--reveal-height',`${height}px`)}
    const observer=new ResizeObserver(resize);observer.observe(content);window.addEventListener('resize',resize);resize()
    const intersection=new IntersectionObserver(entries=>{visible=entries[0].isIntersecting},{rootMargin:'100% 0px'});intersection.observe(host)
    function tick(){if(visible){const top=host!.getBoundingClientRect().top,target=reduced?1:Math.max(0,Math.min(1,(innerHeight-height-top)/Math.max(1,height)));reveal+= (target-reveal)*.18;host!.style.setProperty('--footer-reveal',String(reveal));host!.style.setProperty('--footer-shadow',String(Math.min(1,reveal*(1-reveal)*9)))}frame=requestAnimationFrame(tick)}
    frame=requestAnimationFrame(tick)
    return()=>{cancelAnimationFrame(frame);observer.disconnect();intersection.disconnect();window.removeEventListener('resize',resize)}
  },[reduced])
  return <div className="footer-reveal" ref={root}><div className="footer-reveal-inner" ref={inner}>{children}</div><div className="footer-reveal-spacer" aria-hidden="true"/></div>
}
