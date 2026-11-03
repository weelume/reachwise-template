import research from './pages.json'
import dictionary from './translations.json'
import assetMap from '../../../../../../assets-map.json'
import type{Locale,ReferencePage}from'./types'
export const pages=research.pages as ReferencePage[]
const translations:Record<string,string>=dictionary
const byUrl:Record<string,string>=assetMap.byUrl,byBasename:Record<string,string>=assetMap.byBasename
export const copy=(locale:Locale,zh:string,en:string)=>locale==='zh'?zh:en
export function text(value:string,locale:Locale){if(locale==='en')return value.replace(/[↗]/g,'').replace(/\s*→$/,'').trim();const translated=translations[value];if(translated===undefined)throw new Error(`缺少中文译文：${value}`);return translated.replace(/[↗]/g,'').replace(/\s*→$/,'').trim()}
/** 素材映射缺失即报错，不向外站静默回源。 */
export function media(value:string){if(!value)return '';if(value.startsWith('/templates/reachwise/')||value.startsWith('data:'))return value;const name=value.split('?')[0].split('/').pop()??value;const result=byUrl[value]??byBasename[name];if(!result)throw new Error(`未本地化的素材：${name}`);return result}
export function pageBySlug(slug:string){const result=pages.find(page=>page.slug===slug);if(!result)throw new Error(`未登记页面：${slug}`);return result}
export function title(page:ReferencePage){return page.title||page.items.find(item=>/^h[1-4]$/.test(item.tag))?.text||page.slug}
export function pageImage(page:ReferencePage){return(page.bodyImages??page.images).find(image=>image.src&&!/logo|icon|location/i.test(image.alt??''))?.src}

/** 参考站的内部链接映射到消费方当前语言根路径，保留查询与锚点。 */
export function routeHref(value:string,basePath:string){const origin=new URL(pages[0].url).origin,url=new URL(value,origin);return url.origin===origin?basePath+url.pathname+url.search+url.hash:value}
