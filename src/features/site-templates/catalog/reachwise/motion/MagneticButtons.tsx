'use client'
import {useEffect} from 'react'
import {useReducedMotion} from 'framer-motion'

export function MagneticButtons(){const reduced=useReducedMotion();useEffect(()=>{
 if(reduced)return
 const root=document.querySelector('.site-reachwise')
 if(!root)return
 const fine=matchMedia('(hover:hover) and (pointer:fine)')
 function reset(){root!.querySelectorAll<HTMLElement>('.primary').forEach(button=>{button.style.setProperty('--mx','0px');button.style.setProperty('--my','0px')})}
 function move(event:PointerEvent){if(!fine.matches)return;root!.querySelectorAll<HTMLElement>('.primary').forEach(button=>{const rect=button.getBoundingClientRect(),dx=event.clientX-rect.left-rect.width/2,dy=event.clientY-rect.top-rect.height/2,distance=Math.hypot(dx,dy),strength=distance<150?(1-distance/150)*.12:0;button.style.setProperty('--mx',`${Math.max(-8,Math.min(8,dx*strength))}px`);button.style.setProperty('--my',`${Math.max(-8,Math.min(8,dy*strength))}px`)})}
 window.addEventListener('pointermove',move,{passive:true});document.addEventListener('pointerleave',reset)
 return()=>{window.removeEventListener('pointermove',move);document.removeEventListener('pointerleave',reset);reset()}
 },[reduced]);return null}
