import type{Metadata}from'next'
import'./globals.css'
export const metadata:Metadata={title:'Reachwise · 数字营销与增长',description:'Responsive bilingual Reachwise website'}
export default function Layout({children}:{children:React.ReactNode}){return <html lang="zh-CN"><body>{children}</body></html>}
