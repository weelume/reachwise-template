export type Locale='zh'|'en'
export interface ContentItem{tag:string;text:string;sourceAttrs?:Record<string,string>;section?:string;href?:string;resolvedHref?:string}
export interface ContentImage{tag?:string;src?:string;srcset?:string;alt?:string|null;section?:string}
export interface ReferencePage{slug:string;url:string;title:string;category:string;items:ContentItem[];bodyItems?:ContentItem[];images:ContentImage[];bodyImages?:ContentImage[];links:string[];placeholder?:boolean;sections?:ReferenceSection[]}

export interface ReferenceSection{name:string;items:ContentItem[];images:ContentImage[];links:{text:string;href:string;resolvedHref?:string}[]}
