"use strict";(self.webpackChunkweb_toolbox=self.webpackChunkweb_toolbox||[]).push([[896],{31896:(e,t,o)=>{o.r(t),o.d(t,{default:()=>se});var r=o(9950),n=o(48089),a=o(58168),c=o(98587),i=o(72004),l=o(74061),s=o(48283),d=o(59254),m=o(80863),u=o(68483);function p(e){return(0,u.Ay)("MuiCardActionArea",e)}const h=(0,m.A)("MuiCardActionArea",["root","focusVisible","focusHighlight"]);var b=o(24184),f=o(44414);const g=["children","className","focusVisibleClassName"],A=(0,d.Ay)(b.A,{name:"MuiCardActionArea",slot:"Root",overridesResolver:(e,t)=>t.root})((e=>{let{theme:t}=e;return{display:"block",textAlign:"inherit",borderRadius:"inherit",width:"100%",["&:hover .".concat(h.focusHighlight)]:{opacity:(t.vars||t).palette.action.hoverOpacity,"@media (hover: none)":{opacity:0}},["&.".concat(h.focusVisible," .").concat(h.focusHighlight)]:{opacity:(t.vars||t).palette.action.focusOpacity}}})),v=(0,d.Ay)("span",{name:"MuiCardActionArea",slot:"FocusHighlight",overridesResolver:(e,t)=>t.focusHighlight})((e=>{let{theme:t}=e;return{overflow:"hidden",pointerEvents:"none",position:"absolute",top:0,right:0,bottom:0,left:0,borderRadius:"inherit",opacity:0,backgroundColor:"currentcolor",transition:t.transitions.create("opacity",{duration:t.transitions.duration.short})}})),w=r.forwardRef((function(e,t){const o=(0,s.A)({props:e,name:"MuiCardActionArea"}),{children:r,className:n,focusVisibleClassName:d}=o,m=(0,c.A)(o,g),u=o,h=(e=>{const{classes:t}=e;return(0,l.A)({root:["root"],focusHighlight:["focusHighlight"]},p,t)})(u);return(0,f.jsxs)(A,(0,a.A)({className:(0,i.A)(h.root,n),focusVisibleClassName:(0,i.A)(d,h.focusVisible),ref:t,ownerState:u},m,{children:[r,(0,f.jsx)(v,{className:h.focusHighlight,ownerState:u})]}))}));var y=o(50704);function C(e){return(0,u.Ay)("MuiCardMedia",e)}(0,m.A)("MuiCardMedia",["root","media","img"]);const x=["children","className","component","image","src","style"],k=(0,d.Ay)("div",{name:"MuiCardMedia",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:o}=e,{isMediaComponent:r,isImageComponent:n}=o;return[t.root,r&&t.media,n&&t.img]}})((e=>{let{ownerState:t}=e;return(0,a.A)({display:"block",backgroundSize:"cover",backgroundRepeat:"no-repeat",backgroundPosition:"center"},t.isMediaComponent&&{width:"100%"},t.isImageComponent&&{objectFit:"cover"})})),E=["video","audio","picture","iframe","img"],M=["picture","img"],j=r.forwardRef((function(e,t){const o=(0,s.A)({props:e,name:"MuiCardMedia"}),{children:r,className:n,component:d="div",image:m,src:u,style:p}=o,h=(0,c.A)(o,x),b=-1!==E.indexOf(d),g=!b&&m?(0,a.A)({backgroundImage:'url("'.concat(m,'")')},p):p,A=(0,a.A)({},o,{component:d,isMediaComponent:b,isImageComponent:-1!==M.indexOf(d)}),v=(e=>{const{classes:t,isMediaComponent:o,isImageComponent:r}=e,n={root:["root",o&&"media",r&&"img"]};return(0,l.A)(n,C,t)})(A);return(0,f.jsx)(k,(0,a.A)({className:(0,i.A)(v.root,n),as:d,role:!b&&m?"img":void 0,ref:t,style:g,ownerState:A,src:b?m||u:void 0},h,{children:r}))}));var N=o(60899),V=o(82053),z=o(25131),R=o(72772),S=o(86328),T=o(53316),H=o(17119);function F(e){let{children:t,onClose:o}=e;return(0,f.jsx)("div",{onClick:e=>{e.target===e.currentTarget&&o(e)},className:"rws-backdrop web-share-fade",children:t})}!function(e){let{insertAt:t}=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};if(!e||typeof document>"u")return;let o=document.head||document.getElementsByTagName("head")[0],r=document.createElement("style");r.type="text/css","top"===t&&o.firstChild?o.insertBefore(r,o.firstChild):o.appendChild(r),r.styleSheet?r.styleSheet.cssText=e:r.appendChild(document.createTextNode(e))}(".web-share-fade{animation:rwsFade .5s;animation-fill-mode:both}@keyframes rwsFade{0%{opacity:0}to{opacity:1}}.web-share-fade-in-up{animation:rwsfadeInUp .5s;animation-fill-mode:both}@keyframes rwsfadeInUp{0%{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}.rws-icons{padding:1.25rem;display:grid;grid-template-columns:repeat(4,1fr);grid-gap:1.25rem}.rws-icon{width:100%;height:auto;cursor:pointer;border:0;background:#1a78f6;padding:.75rem;border-radius:.5rem;font-size:0}.rws-container{max-width:24rem;width:90%;background-color:#fff;border-radius:.5rem;border-bottom-left-radius:0;border-bottom-right-radius:0}.rws-backdrop{position:fixed;left:0;top:0;width:100%;height:100%;background:rgba(0,0,0,.4);display:flex;flex-direction:column;align-items:center;justify-content:flex-end;z-index:1400}.rws-header{padding:1rem 1.25rem;font-size:1.25rem;font-weight:600;padding-bottom:0}.rws-close{background:#edf2f7;cursor:pointer;padding:.75rem;display:block;width:100%;border:0;font-size:1rem}\n");var B=e=>window.open(e,"_blank","noopener"),L={facebook:{path:(0,f.jsx)("path",{d:"M24 12a12 12 0 10-13.9 11.9v-8.4h-3V12h3V9.4c0-3 1.8-4.7 4.6-4.7l2.6.2v3h-1.5c-1.5 0-2 .9-2 1.8V12h3.4l-.5 3.5h-2.8v8.4A12 12 0 0024 12z"}),color:"#0076FB",e:e=>B("https://www.facebook.com/sharer/sharer.php?u=".concat(e))},twitter:{path:(0,f.jsx)("path",{d:"M24 4.6a10 10 0 01-2.9.7 5 5 0 002.2-2.7c-1 .6-2 1-3.1 1.2a5 5 0 00-8.4 4.5A14 14 0 011.6 3.2 4.8 4.8 0 001 5.6a5 5 0 002.2 4.1 4.9 4.9 0 01-2.3-.6A5 5 0 005 14a5 5 0 01-2.2 0 5 5 0 004.6 3.5 9.9 9.9 0 01-6.1 2.1H0a14 14 0 007.6 2.2c9 0 14-7.5 14-14V7A10 10 0 0024 4.6z"}),color:"#1DA1F2",e:(e,t)=>B("https://twitter.com/intent/tweet?text=".concat(t,"&url=").concat(e))},whatsapp:{path:(0,f.jsx)("path",{d:"M17.5 14.4l-2-1c-.3 0-.5-.1-.7.2l-1 1.1c-.1.2-.3.3-.6.1s-1.3-.5-2.4-1.5a9 9 0 01-1.7-2c-.1-.3 0-.5.2-.6l.4-.6c.2-.1.2-.3.3-.5v-.5L9 7c-.2-.6-.4-.5-.6-.5h-.6c-.2 0-.5 0-.8.4-.2.3-1 1-1 2.5s1 2.8 1.2 3c.2.2 2.1 3.2 5.1 4.5l1.7.6a4 4 0 001.9.2c.5-.1 1.7-.8 2-1.5.2-.6.2-1.2.1-1.4l-.5-.3M12 21.8a9.9 9.9 0 01-5-1.4l-.4-.2-3.7 1 1-3.7-.2-.3a9.9 9.9 0 01-1.5-5.3 9.9 9.9 0 0116.8-7 9.8 9.8 0 013 7 9.9 9.9 0 01-10 9.9m8.4-18.3A11.8 11.8 0 0012.1 0 12 12 0 001.8 17.8L0 24l6.4-1.6a11.9 11.9 0 005.6 1.4 12 12 0 0012-11.9 11.8 11.8 0 00-3.5-8.4z"}),color:"#25D366",e:(e,t)=>B("https://api.whatsapp.com/send?text=".concat(t," ").concat(e))},reddit:{path:(0,f.jsx)("path",{d:"M12 0A12 12 0 000 12a12 12 0 0012 12 12 12 0 0012-12A12 12 0 0012 0zm5.01 4.74c.69 0 1.25.56 1.25 1.25a1.25 1.25 0 01-2.5.06l-2.6-.55-.8 3.75c1.83.07 3.48.63 4.68 1.49.3-.31.73-.5 1.2-.5.97 0 1.76.8 1.76 1.76 0 .72-.43 1.33-1.01 1.61a3.11 3.11 0 01.04.52c0 2.7-3.13 4.87-7 4.87-3.88 0-7-2.17-7-4.87 0-.18 0-.36.04-.53A1.75 1.75 0 014.03 12a1.75 1.75 0 012.96-1.26 8.52 8.52 0 014.74-1.5l.89-4.17a.34.34 0 01.14-.2.35.35 0 01.24-.04l2.9.62a1.21 1.21 0 011.11-.7zM9.25 12a1.25 1.25 0 101.25 1.25c0-.69-.56-1.25-1.25-1.25zm5.5 0a1.25 1.25 0 000 2.5 1.25 1.25 0 000-2.5zm-5.47 3.99a.33.33 0 00-.23.1.33.33 0 000 .46c.84.84 2.49.91 2.96.91.48 0 2.1-.06 2.96-.91a.36.36 0 00.03-.47.33.33 0 00-.46 0c-.55.54-1.68.73-2.51.73-.83 0-1.98-.2-2.51-.73a.33.33 0 00-.24-.1z"}),color:"#FF4500",e:(e,t)=>B("https://www.reddit.com/submit?url=".concat(e,"&title=").concat(t))},telegram:{path:(0,f.jsx)("path",{d:"M23.91 3.79L20.3 20.84c-.25 1.21-.98 1.5-2 .94l-5.5-4.07-2.66 2.57c-.3.3-.55.56-1.1.56-.72 0-.6-.27-.84-.95L6.3 13.7.85 12c-1.18-.35-1.19-1.16.26-1.75l21.26-8.2c.97-.43 1.9.24 1.53 1.73z"}),color:"#0088CC",e:(e,t)=>B("https://telegram.me/share/msg?url=".concat(e,"&text=").concat(t))},linkedin:{path:(0,f.jsx)("path",{d:"M6.5 21.5h-5v-13h5v13zM4 6.5C2.5 6.5 1.5 5.3 1.5 4s1-2.4 2.5-2.4c1.6 0 2.5 1 2.6 2.5 0 1.4-1 2.5-2.6 2.5zm11.5 6c-1 0-2 1-2 2v7h-5v-13h5V10s1.6-1.5 4-1.5c3 0 5 2.2 5 6.3v6.7h-5v-7c0-1-1-2-2-2z"}),color:"#0073b1",e:(e,t,o)=>B("https://www.linkedin.com/shareArticle?mini=true&url=".concat(e,"&title=").concat(o,"&summary=").concat(t))},mail:{path:(0,f.jsx)("path",{d:"M20 4H4a2 2 0 00-2 2v12c0 1.1.9 2 2 2h16a2 2 0 002-2V6a2 2 0 00-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"}),color:"#E53E3E",e:(e,t)=>B("mailto:?body=".concat(e,"&subject=").concat(t))},copy:{path:(0,f.jsx)("path",{d:"M16 1H4a2 2 0 00-2 2v14h2V3h12V1zm3 4H8a2 2 0 00-2 2v14c0 1.1.9 2 2 2h11a2 2 0 002-2V7a2 2 0 00-2-2zm0 16H8V7h11v14z"}),color:"#718096",e:e=>navigator.clipboard.writeText(decodeURIComponent(e))},vk:{path:(0,f.jsx)("path",{d:"M22.7 6.24c.16-.52 0-.9-.73-.9H19.5c-.62 0-.91.32-1.06.69 0 0-1.25 3.04-3.02 5.02-.57.57-.83.75-1.15.75-.15 0-.39-.18-.39-.7V6.24c0-.63-.17-.9-.69-.9H9.34c-.39 0-.62.29-.62.56 0 .59.88.72.97 2.4v3.6c0 .8-.14.95-.45.95-.84 0-2.86-3.06-4.06-6.56-.24-.68-.48-.96-1.1-.96H1.61c-.7 0-.85.33-.85.7 0 .65.84 3.88 3.88 8.14 2.03 2.92 4.9 4.5 7.5 4.5 1.55 0 1.75-.35 1.75-.96 0-2.78-.15-3.04.64-3.04.36 0 .99.18 2.44 1.58 1.67 1.67 1.95 2.42 2.88 2.42h2.45c.7 0 1.06-.35.85-1.05-.46-1.45-3.62-4.44-3.76-4.64-.36-.47-.26-.68 0-1.1 0 0 3-4.21 3.3-5.64Z"}),color:"#07f",e:(e,t,o)=>B("http://vk.com/share.php?url=".concat(e,"&title=").concat(o,"&comment=").concat(t))},okru:{path:(0,f.jsx)("path",{d:"M13.6 16.4c1-.3 2-.7 2.8-1.2a1.5 1.5 0 0 0-1.5-2.5 6.3 6.3 0 0 1-6.7 0 1.5 1.5 0 1 0-1.5 2.5c.9.5 1.8 1 2.9 1.2L6.8 19a1.4 1.4 0 1 0 2 2l2.8-2.6 2.7 2.7a1.5 1.5 0 1 0 2-2l-2.7-2.8Zm-2-11.1a2 2 0 1 1 0 4.1 2 2 0 0 1 0-4.1Zm0 7a5 5 0 1 0 0-10 5 5 0 0 0 0 10Z"}),color:"#e27e35",e:e=>B("https://connect.ok.ru/dk?st.cmd=WidgetSharePreview&st.shareUrl=".concat(e))}},O=e=>{let{children:t}=e,o=document.createElement("div");return r.useEffect((()=>(document.body.appendChild(o),()=>{document.body.removeChild(o)})),[o]),(0,H.createPortal)(t,o)};function D(e){let{onClose:t,closeText:o}=e;return(0,f.jsx)("button",{className:"rws-close","aria-label":"Close",type:"button",onClick:t,children:o||"Close"})}function I(e){let{title:t}=e;return(0,f.jsx)("header",{className:"rws-header",children:t})}function P(e){let{name:t,data:o,onClose:r,onClick:n}=e,{path:a,viewBox:c="0 0 24 24",color:i,e:l}=L[t];return(0,f.jsx)("button",{onClick:()=>{n&&n(t),l(encodeURIComponent(o.url),o.text,o.title),r()},"aria-label":t,className:"rws-icon",style:{background:i},children:(0,f.jsx)("svg",{fill:"white",viewBox:c,children:a})})}var U=e=>{let{onClose:t,sites:o,data:r,closeText:n,onClick:a}=e;return(0,f.jsxs)("section",{role:"dialog","aria-modal":"true",className:"rws-container web-share-fade-in-up",children:[(0,f.jsx)(I,{title:r.title}),(0,f.jsx)("div",{className:"rws-icons",children:o.map((e=>(0,f.jsx)(P,{name:e,data:r,onClose:t,onClick:a},e)))}),(0,f.jsx)(D,{onClose:t,closeText:n})]})};var W=Object.keys(L).slice(0,8),Z=(0,r.memo)((e=>{var t;let{onOpen:o,onClose:n,isOpen:a}=function(){let[e,t]=(0,r.useState)(!1);return{isOpen:e,onOpen:(0,r.useCallback)((()=>t(!0)),[]),onClose:(0,r.useCallback)((()=>t(!1)),[]),onToggle:(0,r.useCallback)((()=>t((e=>!e))),[])}}(),c=(0,r.useMemo)((()=>({...e.data,title:e.data.title||"share",text:e.data.text||"",url:e.data.url||typeof window<"u"&&window.location.href||""})),[e.data]),i=(0,r.useCallback)((async()=>{if(window.navigator.share&&!e.disableNative)try{await window.navigator.share(c),e.onClick()}catch(t){console.warn(t)}else o()}),[c]);return(0,f.jsxs)(f.Fragment,{children:[(0,r.cloneElement)(e.children,{...null==(t=e.children)?void 0:t.props,onClick:i}),a&&(0,f.jsx)(O,{children:(0,f.jsx)(F,{onClose:n,children:(0,f.jsx)(U,{onClose:n,sites:e.sites||W,data:c,closeText:e.closeText,onClick:e.onClick})})})]})}));function Y(){return r.createElement(Z,{data:{title:"Web Toolbox",text:"Collection of web developer utilities packaged as a desktop app",url:"https://amwebexpert.github.io/etoolbox"}},r.createElement(T.A,null))}var _=o(71616),q=o(33893),G=o(36080),J=o(2235),X=o(15769),K=o(34075),Q=o(21671),$=o(1320),ee=o(9213),te=o(39287),oe=o(32193),re=o(1810),ne=o(77671);const ae=(0,te.A)((e=>({head:{backgroundColor:e.palette.common.black,color:e.palette.common.white},body:{fontSize:14}})))(Q.A),ce=(0,te.A)((e=>({root:{"&:nth-of-type(odd)":{backgroundColor:e.palette.action.hover}}})))(ee.A),ie=e=>{let{...t}=e;const{setToasterState:o}=(0,ne.dq)(),n=(0,re.Pb)("md");return r.createElement($.A,Object.assign({component:J.A},t),r.createElement(X.A,{size:n?"medium":"small","aria-label":"about this application"},r.createElement(K.A,null,r.createElement(ce,{key:"github"},r.createElement(ae,{component:"th",scope:"row"},r.createElement(_.A,null)),r.createElement(ae,{align:"right"},r.createElement(G.A,{href:"https://github.com/amwebexpert/etoolbox"},"GitHub project"))),r.createElement(ce,{key:"privacy"},r.createElement(ae,{component:"th",scope:"row"},r.createElement(q.A,null)),r.createElement(ae,{align:"right"},r.createElement(G.A,{target:"_blank",rel:"noopener noreferrer",href:"https://amwebexpert.github.io/etoolbox/privacy-policy.html"},"Privacy Policy"))),r.createElement(ce,{key:"versionNumber"},r.createElement(ae,{component:"th",scope:"row"},"Version"),r.createElement(ae,{align:"right"},"2.2.0")),r.createElement(ce,{key:"versionDate"},r.createElement(ae,{component:"th",scope:"row"},"Updated"),r.createElement(ae,{align:"right",title:(0,oe.Zb)(),onClick:function(){const e="Build UTC timestamp: [".concat((0,oe.Zb)(),"]");o({open:!0,message:e,type:"info"})}},(0,oe.rN)())),r.createElement(ce,{key:"author"},r.createElement(ae,{component:"th",scope:"row"},"Author"),r.createElement(ae,{align:"right"},r.createElement(G.A,{href:"mailto:amwebexpert@gmail.com"},"Andr\xe9 Masson"))),r.createElement(ce,{key:"iconMadeBy"},r.createElement(ae,{component:"th",scope:"row"},"Icon credits"),r.createElement(ae,{align:"right"},r.createElement(G.A,{href:"https://therealjerrylow.com/"},"Jerry Low"))),r.createElement(ce,{key:"reactVersiion"},r.createElement(ae,{component:"th",scope:"row"},"React Version"),r.createElement(ae,{align:"right"},r.version)),r.createElement(ce,{key:"poweredByCRA"},r.createElement(ae,{component:"th",scope:"row"},"Open source powered by"),r.createElement(ae,{align:"right"},r.createElement(G.A,{href:"https://reactjs.org/docs/create-a-new-react-app.html"},"Create React App"))))))},le=(0,z.A)((e=>({root:{marginTop:10},rootCard:{textAlign:"center"},media:{height:240,margin:e.spacing(4)},appDetail:{marginTop:e.spacing(4)}})));function se(){const e=le();return r.createElement(r.Fragment,null,r.createElement(R.m,{title:"About\u2026"}),r.createElement(N.Ay,{container:!0,justifyContent:"center",className:e.root},r.createElement(n.A,{className:e.rootCard},r.createElement(w,null,r.createElement(j,{className:e.media,image:S,title:"Web Toolbox"}),r.createElement(y.A,null,r.createElement(V.A,{variant:"h5"},"Web Toolbox"),r.createElement(V.A,{variant:"subtitle2"},"Collection of web developer utilities"),r.createElement(Y,null),r.createElement(ie,{className:e.appDetail}))))))}},33893:(e,t,o)=>{var r=o(24994);t.A=void 0;var n=r(o(79526)),a=o(44414);t.A=(0,n.default)((0,a.jsx)("path",{d:"M12 1 3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11z"}),"Security")},53316:(e,t,o)=>{var r=o(24994);t.A=void 0;var n=r(o(79526)),a=o(44414);t.A=(0,n.default)((0,a.jsx)("path",{d:"M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92 1.61 0 2.92-1.31 2.92-2.92s-1.31-2.92-2.92-2.92"}),"Share")},48089:(e,t,o)=>{o.d(t,{A:()=>g});var r=o(58168),n=o(98587),a=o(9950),c=o(72004),i=o(74061),l=o(59254),s=o(48283),d=o(2235),m=o(80863),u=o(68483);function p(e){return(0,u.Ay)("MuiCard",e)}(0,m.A)("MuiCard",["root"]);var h=o(44414);const b=["className","raised"],f=(0,l.Ay)(d.A,{name:"MuiCard",slot:"Root",overridesResolver:(e,t)=>t.root})((()=>({overflow:"hidden"}))),g=a.forwardRef((function(e,t){const o=(0,s.A)({props:e,name:"MuiCard"}),{className:a,raised:l=!1}=o,d=(0,n.A)(o,b),m=(0,r.A)({},o,{raised:l}),u=(e=>{const{classes:t}=e;return(0,i.A)({root:["root"]},p,t)})(m);return(0,h.jsx)(f,(0,r.A)({className:(0,c.A)(u.root,a),elevation:l?8:void 0,ref:t,ownerState:m},d))}))},50704:(e,t,o)=>{o.d(t,{A:()=>f});var r=o(58168),n=o(98587),a=o(9950),c=o(72004),i=o(74061),l=o(59254),s=o(48283),d=o(80863),m=o(68483);function u(e){return(0,m.Ay)("MuiCardContent",e)}(0,d.A)("MuiCardContent",["root"]);var p=o(44414);const h=["className","component"],b=(0,l.Ay)("div",{name:"MuiCardContent",slot:"Root",overridesResolver:(e,t)=>t.root})((()=>({padding:16,"&:last-child":{paddingBottom:24}}))),f=a.forwardRef((function(e,t){const o=(0,s.A)({props:e,name:"MuiCardContent"}),{className:a,component:l="div"}=o,d=(0,n.A)(o,h),m=(0,r.A)({},o,{component:l}),f=(e=>{const{classes:t}=e;return(0,i.A)({root:["root"]},u,t)})(m);return(0,p.jsx)(b,(0,r.A)({as:l,className:(0,c.A)(f.root,a),ownerState:m,ref:t},d))}))},36080:(e,t,o)=>{o.d(t,{A:()=>E});var r=o(98587),n=o(58168),a=o(9950),c=o(72004),i=o(74061),l=o(61676),s=o(59254),d=o(48283),m=o(94106),u=o(31506),p=o(82053),h=o(80863),b=o(68483);function f(e){return(0,b.Ay)("MuiLink",e)}const g=(0,h.A)("MuiLink",["root","underlineNone","underlineHover","underlineAlways","button","focusVisible"]);var A=o(12703),v=o(99269);const w={primary:"primary.main",textPrimary:"text.primary",secondary:"secondary.main",textSecondary:"text.secondary",error:"error.main"},y=e=>{let{theme:t,ownerState:o}=e;const r=(e=>w[e]||e)(o.color),n=(0,A.Yn)(t,"palette.".concat(r),!1)||o.color,a=(0,A.Yn)(t,"palette.".concat(r,"Channel"));return"vars"in t&&a?"rgba(".concat(a," / 0.4)"):(0,v.X4)(n,.4)};var C=o(44414);const x=["className","color","component","onBlur","onFocus","TypographyClasses","underline","variant","sx"],k=(0,s.Ay)(p.A,{name:"MuiLink",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:o}=e;return[t.root,t["underline".concat((0,l.A)(o.underline))],"button"===o.component&&t.button]}})((e=>{let{theme:t,ownerState:o}=e;return(0,n.A)({},"none"===o.underline&&{textDecoration:"none"},"hover"===o.underline&&{textDecoration:"none","&:hover":{textDecoration:"underline"}},"always"===o.underline&&(0,n.A)({textDecoration:"underline"},"inherit"!==o.color&&{textDecorationColor:y({theme:t,ownerState:o})},{"&:hover":{textDecorationColor:"inherit"}}),"button"===o.component&&{position:"relative",WebkitTapHighlightColor:"transparent",backgroundColor:"transparent",outline:0,border:0,margin:0,borderRadius:0,padding:0,cursor:"pointer",userSelect:"none",verticalAlign:"middle",MozAppearance:"none",WebkitAppearance:"none","&::-moz-focus-inner":{borderStyle:"none"},["&.".concat(g.focusVisible)]:{outline:"auto"}})})),E=a.forwardRef((function(e,t){const o=(0,d.A)({props:e,name:"MuiLink"}),{className:s,color:p="primary",component:h="a",onBlur:b,onFocus:g,TypographyClasses:A,underline:v="always",variant:y="inherit",sx:E}=o,M=(0,r.A)(o,x),{isFocusVisibleRef:j,onBlur:N,onFocus:V,ref:z}=(0,m.A)(),[R,S]=a.useState(!1),T=(0,u.A)(t,z),H=(0,n.A)({},o,{color:p,component:h,focusVisible:R,underline:v,variant:y}),F=(e=>{const{classes:t,component:o,focusVisible:r,underline:n}=e,a={root:["root","underline".concat((0,l.A)(n)),"button"===o&&"button",r&&"focusVisible"]};return(0,i.A)(a,f,t)})(H);return(0,C.jsx)(k,(0,n.A)({color:p,className:(0,c.A)(F.root,s),classes:A,component:h,onBlur:e=>{N(e),!1===j.current&&S(!1),b&&b(e)},onFocus:e=>{V(e),!0===j.current&&S(!0),g&&g(e)},ref:T,ownerState:H,variant:y,sx:[...Object.keys(w).includes(p)?[]:[{color:p}],...Array.isArray(E)?E:[E]]},M))}))}}]);