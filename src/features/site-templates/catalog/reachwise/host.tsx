'use client'
import{createContext,useContext,type ReactNode}from'react'
import{brand}from'./config/brand'
export interface HostOptions{brandName?:{zh:string;en:string};logo?:string;lightLogo?:string;marketplaceHref?:string;marketplaceLabel?:{zh:string;en:string};marketplaceAriaLabel?:{zh:string;en:string};filing?:ReactNode}
const Context=createContext<HostOptions>({})
/** 通用品牌与消费方的入口隔离，独立运行时不依赖任何宿主。 */
export function HostProvider({children,...options}:HostOptions&{children:ReactNode}){return <Context.Provider value={options}>{children}</Context.Provider>}
export const useHost=()=>useContext(Context)
export function useBrand(){return useContext(Context).brandName??brand.name}
