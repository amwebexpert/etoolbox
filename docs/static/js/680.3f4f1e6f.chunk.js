"use strict";(self.webpackChunkweb_toolbox=self.webpackChunkweb_toolbox||[]).push([[680],{32376:(e,t,n)=>{n.d(t,{A:()=>i});var r=n(9950),a=n(81143),l=n(10226),o=n(67243),c=n.n(o),s=n(77671);const i=e=>{let{data:t,isDisabled:n,hoverMessage:o,feedbackMessage:i,Icon:m=a.A,...u}=e;const{setToasterState:d}=(0,s.dq)();return r.createElement(l.A,Object.assign({disabled:!t||n,title:null!==o&&void 0!==o?o:"Copy to clipboard",variant:"contained","data-testid":"copy-to-clipboard",color:"primary"},u,{onClick:()=>{if(!t)return;const e=null!==i&&void 0!==i?i:"Content copied into clipboard: ".concat(t.substring(0,25)," \u2026");c()(t,{format:"text/plain"}),d({open:!0,message:e,type:"success",autoHideDuration:2e3})}}),r.createElement(m,null))}},50057:(e,t,n)=>{n.d(t,{n:()=>s});var r=n(9950),a=n(25131),l=n(72772),o=n(73931);const c=(0,a.A)((e=>({root:{margin:e.spacing(1)}}))),s=e=>{let{title:t,iconType:n,children:a}=e;const s=c();return r.createElement(r.Fragment,null,r.createElement(l.m,{titleTemplate:"Web Toolbox - %s",defaultTitle:"Web Toolbox",title:t}),r.createElement("div",{className:s.root},r.createElement(o.A,{iconType:n,title:t}),a))}},73931:(e,t,n)=>{n.d(t,{A:()=>o});var r=n(9950),a=n(82053);const l=(0,n(25131).A)((e=>({title:{wordBreak:"break-word"},titleWithIcon:{display:"flex",justifyContent:"center",alignItems:"center",marginBottom:e.spacing(1)},icon:{height:"40px",width:"40px",marginRight:e.spacing(1)}}))),o=e=>{let{title:t,iconType:n}=e;const o=l();return r.createElement("div",{className:o.titleWithIcon},r.createElement(n,{className:o.icon}),r.createElement(a.A,{variant:"h5",className:o.title},t))}},11029:(e,t,n)=>{n.d(t,{A:()=>o});var r=n(9950),a=n(8145);const l=(0,n(25131).A)((()=>({result:{fontFamily:"monospace",height:"auto"}}))),o=e=>{let{label:t,testID:n,result:o,rows:c=10,maxRows:s=15}=e;const i=l();return r.createElement(a.A,{multiline:!0,"data-testid":n,minRows:c,maxRows:s,label:t,variant:"outlined",margin:"normal",fullWidth:!0,value:o,InputProps:{classes:{input:i.result}}})}},42680:(e,t,n)=>{n.r(t),n.d(t,{default:()=>k});var r=n(9950),a=n(17406),l=n(60899),o=n(25979),c=n(8145),s=n(23266),i=n(24516),m=n(10226),u=n(25131),d=n(9449),p=n(32376),f=n(50057),v=n(11029),g=n(1810),A=n(53017),y=n(16425);let b,E,h=0,x=0;const w=function(e,t,n){let r=t&&n||0;const a=t||new Array(16);let l=(e=e||{}).node||b,o=void 0!==e.clockseq?e.clockseq:E;if(null==l||null==o){const t=e.random||(e.rng||A.A)();null==l&&(l=b=[1|t[0],t[1],t[2],t[3],t[4],t[5]]),null==o&&(o=E=16383&(t[6]<<8|t[7]))}let c=void 0!==e.msecs?e.msecs:Date.now(),s=void 0!==e.nsecs?e.nsecs:x+1;const i=c-h+(s-x)/1e4;if(i<0&&void 0===e.clockseq&&(o=o+1&16383),(i<0||c>h)&&void 0===e.nsecs&&(s=0),s>=1e4)throw new Error("uuid.v1(): Can't create more than 10M uuids/sec");h=c,x=s,E=o,c+=122192928e5;const m=(1e4*(268435455&c)+s)%4294967296;a[r++]=m>>>24&255,a[r++]=m>>>16&255,a[r++]=m>>>8&255,a[r++]=255&m;const u=c/4294967296*1e4&268435455;a[r++]=u>>>8&255,a[r++]=255&u,a[r++]=u>>>24&15|16,a[r++]=u>>>16&255,a[r++]=o>>>8|128,a[r++]=255&o;for(let d=0;d<6;++d)a[r+d]=l[d];return t||(0,y.k)(a)};var C=n(99946);function I(e,t){const n=1===e?w:C.A;let r="";for(let a=0;a<t;a++)r+="".concat(n(),"\n");return r.slice(0,-1)}const U=(0,u.A)((e=>({form:{marginTop:e.spacing(2)},formControl:{margin:e.spacing(1)},toolbar:{}}))),k=()=>{const e=U(),t=(0,g.Pb)("md"),{handleSubmit:n,control:u}=(0,d.mN)({defaultValues:{version:4,quantity:5}}),[A,y]=r.useState(I(4,1));return r.createElement(f.n,{iconType:a.A,title:"UUID Generator"},r.createElement("div",{className:e.form},r.createElement(l.Ay,{container:!0,spacing:1},r.createElement(l.Ay,{item:!0,md:2,sm:3,xs:6},r.createElement(o.A,{className:e.formControl,fullWidth:!0},r.createElement(d.xI,{control:u,name:"version",defaultValue:4,render:e=>{let{field:{value:n,name:a,onChange:l}}=e;return r.createElement(c.A,{select:!0,name:a,value:n,label:"Version",autoFocus:t,onChange:e=>l(e.target.value)},r.createElement(s.A,{value:1},"1"),r.createElement(s.A,{value:4},"4"))},rules:{required:!0,min:1,max:5}}),r.createElement(i.A,null,"RFC4122 version"))),r.createElement(l.Ay,{item:!0,md:2,sm:3,xs:6},r.createElement(o.A,{className:e.formControl,fullWidth:!0},r.createElement(d.xI,{name:"quantity",render:e=>{let{field:{value:t,name:n,onChange:a},fieldState:l}=e;return r.createElement(c.A,{name:n,value:t,label:"Quantity",error:!!l.error,type:"number",onChange:e=>a(e.target.value),helperText:l.error?"valid range: [1..9999]":null})},control:u,defaultValue:5,rules:{required:!0,min:1,max:9999}}),r.createElement(i.A,null,"Number of UUIDs"))),r.createElement(l.Ay,{item:!0,md:8,sm:6,xs:12},r.createElement(l.Ay,{container:!0,justifyContent:"flex-end",className:e.toolbar},r.createElement(p.A,{data:A,sx:{mr:1}}),r.createElement(m.A,{variant:"contained",color:"primary",title:"Generate the UUID elements",onClick:n((e=>{y(I(e.version,e.quantity))})),endIcon:r.createElement(a.A,null)},"Generate"))))),r.createElement(v.A,{label:"Result",result:A}))}},53017:(e,t,n)=>{let r;n.d(t,{A:()=>l});const a=new Uint8Array(16);function l(){if(!r&&(r="undefined"!==typeof crypto&&crypto.getRandomValues&&crypto.getRandomValues.bind(crypto),!r))throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");return r(a)}},16425:(e,t,n)=>{n.d(t,{k:()=>a});const r=[];for(let l=0;l<256;++l)r.push((l+256).toString(16).slice(1));function a(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0;return r[e[t+0]]+r[e[t+1]]+r[e[t+2]]+r[e[t+3]]+"-"+r[e[t+4]]+r[e[t+5]]+"-"+r[e[t+6]]+r[e[t+7]]+"-"+r[e[t+8]]+r[e[t+9]]+"-"+r[e[t+10]]+r[e[t+11]]+r[e[t+12]]+r[e[t+13]]+r[e[t+14]]+r[e[t+15]]}},99946:(e,t,n)=>{n.d(t,{A:()=>o});const r={randomUUID:"undefined"!==typeof crypto&&crypto.randomUUID&&crypto.randomUUID.bind(crypto)};var a=n(53017),l=n(16425);const o=function(e,t,n){if(r.randomUUID&&!t&&!e)return r.randomUUID();const o=(e=e||{}).random||(e.rng||a.A)();if(o[6]=15&o[6]|64,o[8]=63&o[8]|128,t){n=n||0;for(let e=0;e<16;++e)t[n+e]=o[e];return t}return(0,l.k)(o)}}}]);