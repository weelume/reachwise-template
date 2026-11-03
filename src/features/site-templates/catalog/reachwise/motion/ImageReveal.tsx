'use client'
import {useRef} from 'react'
import {motion,useInView,useReducedMotion,useScroll,useTransform} from 'framer-motion'

export function ImageReveal({src,alt,shape='up',delay=0,parallax=1,className=''}:{src:string;alt:string;shape?:'up'|'arch'|'iris';delay?:number;parallax?:number;className?:string}) {
  const root=useRef<HTMLDivElement>(null),visible=useInView(root,{once:true,amount:.12}),reduced=useReducedMotion(),{scrollYProgress}=useScroll({target:root,offset:['start end','end start']}),y=useTransform(scrollYProgress,[0,1],[`${3.5*parallax}%`,`${-3.5*parallax}%`])
  const hidden=shape==='iris'?'circle(0% at 50% 50%)':'inset(100% 0 0 0)'
  return <motion.div className={`reach-image-reveal ${className} shape-${shape}`} ref={root} initial={reduced?false:{clipPath:hidden}} animate={{clipPath:visible||reduced?shape==='iris'?'circle(75% at 50% 50%)':'inset(0% 0 0 0)':hidden}} transition={{duration:1.35,delay,ease:[.7,0,.2,1]}}><motion.img src={src} alt={alt} loading="lazy" initial={reduced?false:{scale:1.28}} animate={{scale:visible||reduced?1:1.28}} transition={{duration:1.9,delay,ease:[.16,.84,.24,1]}} style={{y:reduced?0:y}}/></motion.div>
}
