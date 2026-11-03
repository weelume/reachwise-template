'use client'
import{motion,useReducedMotion}from'framer-motion'
import type{ReactNode}from'react'
/** 区块入场按内容位置触发；各业务画面维护各自循环与模式切换。 */
export function Reveal({children,delay=0,className=''}:{children:ReactNode;delay?:number;className?:string}){const reduced=useReducedMotion();return <motion.div className={className} initial={reduced?false:{opacity:0,y:28}} whileInView={{opacity:1,y:0}} viewport={{once:true,amount:.12}} transition={{duration:.7,delay,ease:[.19,.8,.22,1]}}>{children}</motion.div>}
