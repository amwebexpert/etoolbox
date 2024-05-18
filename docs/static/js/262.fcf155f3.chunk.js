"use strict";(self.webpackChunkweb_toolbox=self.webpackChunkweb_toolbox||[]).push([[262],{50057:(e,t,n)=>{n.d(t,{n:()=>s});var r=n(9950),o=n(25131),a=n(72772),l=n(73931);const c=(0,o.A)((e=>({root:{margin:e.spacing(1)}}))),s=e=>{let{title:t,iconType:n,children:o}=e;const s=c();return r.createElement(r.Fragment,null,r.createElement(a.m,{titleTemplate:"Web Toolbox - %s",defaultTitle:"Web Toolbox",title:t}),r.createElement("div",{className:s.root},r.createElement(l.A,{iconType:n,title:t}),o))}},73931:(e,t,n)=>{n.d(t,{A:()=>l});var r=n(9950),o=n(82053);const a=(0,n(25131).A)((e=>({title:{wordBreak:"break-word"},titleWithIcon:{display:"flex",justifyContent:"center",alignItems:"center",marginBottom:e.spacing(1)},icon:{height:"40px",width:"40px",marginRight:e.spacing(1)}}))),l=e=>{let{title:t,iconType:n}=e;const l=a();return r.createElement("div",{className:l.titleWithIcon},r.createElement(n,{className:l.icon}),r.createElement(o.A,{variant:"h5",className:l.title},t))}},70778:(e,t,n)=>{n.d(t,{A:()=>d});var r=n(9950),o=n(19223),a=n(25979),l=n(3788),c=n(19890),s=n(2046),i=n(25333),u=n(52097);const m=(0,n(25131).A)((e=>({root:{margin:e.spacing(1)}}))),d=e=>{let{label:t="Search",autofocus:n=!1,fullWidth:d=!1,initialFilter:p="",onFilterChange:h}=e;const[A,g]=r.useState(p),b=m(),f=(0,u.YQ)((e=>h(e)),300);return r.useEffect((()=>f(A)),[A,f]),r.createElement(a.A,{fullWidth:d,className:b.root},r.createElement(l.A,{htmlFor:"searchField"},t),r.createElement(c.A,{id:"searchField",autoFocus:n,type:"text",value:A,onChange:e=>g(e.target.value),endAdornment:r.createElement(s.A,{position:"end"},r.createElement(i.A,null,r.createElement(o.A,null)))}))}},99083:(e,t,n)=>{n.d(t,{A:()=>c});var r=n(9950),o=n(82053),a=n(67270);const l=(0,n(25131).A)((e=>({root:{margin:e.spacing(1)}}))),c=e=>{let{count:t,searching:n}=e;const c=l(),[s,i]=r.useState(a.t);return r.useEffect((()=>{n?i("filtering\u2026"):setTimeout((()=>i(a.t)),800)}),[n]),r.createElement("div",{className:c.root},r.createElement(o.A,{align:"right"},s),r.createElement(o.A,{align:"right"},t))}},56262:(e,t,n)=>{n.r(t),n.d(t,{default:()=>W,mapDispatchToProps:()=>R,mapStateToProps:()=>j});var r=n(9950),o=n(71616),a=n(62375),l=n(83239),c=n(16491),s=n(6258),i=n(1320),u=n(2235),m=n(15769),d=n(69780),p=n(9213),h=n(34075),A=n(36080),g=n(10300),b=n(71822),f=n(33602),v=n(50057),E=n(70778),w=n(99083),x=n(27839),y=n(65579),C=n(1810),P=n(21671),N=n(39287),S=n(25131);const T=(0,N.A)((()=>({body:{fontSize:14,whiteSpace:"normal",wordBreak:"break-word"}})))(P.A),k=(0,N.A)((e=>({root:{"&:nth-of-type(even)":{backgroundColor:e.palette.action.hover}}})))(p.A),F=(0,S.A)((e=>({toolbar:{margin:0,padding:0,"& > *":{marginLeft:e.spacing(1)}},tableHeader:{backgroundColor:e.palette.primary.main},dateColumn:{textAlign:"center",minWidth:120},watchColumn:{textAlign:"center"}})));function j(e){return{inputText:e.textInputs.lastGithubUsernameValue,projects:e.githubUserProjects.projects,searching:e.githubUserProjects.searching}}function R(e){return{listGithubUserProjectsRequested:t=>e((0,b.bP)(t)),storeInputText:(t,n)=>e((0,f.s)(t,n))}}const W=(0,g.Ng)(j,R)((e=>{let{inputText:t,searching:n,projects:g,listGithubUserProjectsRequested:b,storeInputText:f}=e;const P=F(),N=(0,C.Pb)("md"),[S,j]=r.useState(t),{setGlobalSpinnerState:R}=(0,x.Z0)(),{page:W,setPage:D,rowsPerPage:B,handleChangeRowsPerPage:M}=(0,y.W)(),V=W*B;return r.useEffect((()=>{n&&t?R({open:!0}):setTimeout((()=>R({open:!1})),500)}),[n,t,R]),r.createElement(v.n,{iconType:o.A,title:"Github user projects"},r.createElement(l.A,{className:P.toolbar},r.createElement(E.A,{autofocus:N,label:"Username",initialFilter:S,onFilterChange:function(e){j(e),b(e),f("lastGithubUsernameValue",e)}}),r.createElement(c.A,{component:"div",flexGrow:1}),r.createElement(w.A,{count:g.length,searching:n})),r.createElement(s.A,{rowsPerPageOptions:[5,10,25,50,100],component:"div",count:g.length,rowsPerPage:B,page:W,onPageChange:(e,t)=>D(t),onRowsPerPageChange:M}),r.createElement(i.A,{component:u.A},r.createElement(m.A,{size:N?"medium":"small"},r.createElement(d.A,{className:P.tableHeader},r.createElement(p.A,null,r.createElement(T,{component:"th",scope:"row"},"Project"),r.createElement(T,{component:"th",scope:"row"},"Description"),r.createElement(T,{component:"th",scope:"row",className:P.dateColumn},"Updated"),r.createElement(T,{component:"th",scope:"row"},r.createElement(a.A,null)))),r.createElement(h.A,null,g.slice(V,V+B).map((e=>r.createElement(k,{key:e.id},r.createElement(T,null,r.createElement(A.A,{href:e.html_url,target:"_blank",rel:"noreferrer"},e.name)),r.createElement(T,null,e.description),r.createElement(T,{className:P.dateColumn},new Date(e.updated_at).toLocaleDateString()),r.createElement(T,{className:P.watchColumn},e.watchers_count))))))))}))},65579:(e,t,n)=>{n.d(t,{W:()=>o});var r=n(9950);const o=()=>{const[e,t]=(0,r.useState)(0),[n,o]=(0,r.useState)(10);return{page:e,setPage:t,rowsPerPage:n,handleChangeRowsPerPage:e=>{o(+e.target.value),t(0)}}}},62375:(e,t,n)=>{var r=n(24994);t.A=void 0;var o=r(n(79526)),a=n(44414);t.A=(0,o.default)((0,a.jsx)("path",{d:"M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5M12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5m0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3"}),"Visibility")},16491:(e,t,n)=>{n.d(t,{A:()=>v});var r=n(58168),o=n(98587),a=n(9950),l=n(72004),c=n(10116),s=n(70505),i=n(80237),u=n(7148),m=n(44414);const d=["className","component"];var p=n(41681),h=n(58258),A=n(67550);const g=(0,n(80863).A)("MuiBox",["root"]),b=(0,h.A)(),f=function(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};const{themeId:t,defaultTheme:n,defaultClassName:p="MuiBox-root",generateClassName:h}=e,A=(0,c.default)("div",{shouldForwardProp:e=>"theme"!==e&&"sx"!==e&&"as"!==e})(s.A);return a.forwardRef((function(e,a){const c=(0,u.A)(n),s=(0,i.A)(e),{className:g,component:b="div"}=s,f=(0,o.A)(s,d);return(0,m.jsx)(A,(0,r.A)({as:b,ref:a,className:(0,l.A)(g,h?h(p):p),theme:t&&c[t]||c},f))}))}({themeId:A.A,defaultTheme:b,defaultClassName:g.root,generateClassName:p.A.generate}),v=f},36080:(e,t,n)=>{n.d(t,{A:()=>P});var r=n(98587),o=n(58168),a=n(9950),l=n(72004),c=n(74061),s=n(61676),i=n(59254),u=n(48283),m=n(94106),d=n(31506),p=n(82053),h=n(80863),A=n(68483);function g(e){return(0,A.Ay)("MuiLink",e)}const b=(0,h.A)("MuiLink",["root","underlineNone","underlineHover","underlineAlways","button","focusVisible"]);var f=n(12703),v=n(99269);const E={primary:"primary.main",textPrimary:"text.primary",secondary:"secondary.main",textSecondary:"text.secondary",error:"error.main"},w=e=>{let{theme:t,ownerState:n}=e;const r=(e=>E[e]||e)(n.color),o=(0,f.Yn)(t,"palette.".concat(r),!1)||n.color,a=(0,f.Yn)(t,"palette.".concat(r,"Channel"));return"vars"in t&&a?"rgba(".concat(a," / 0.4)"):(0,v.X4)(o,.4)};var x=n(44414);const y=["className","color","component","onBlur","onFocus","TypographyClasses","underline","variant","sx"],C=(0,i.Ay)(p.A,{name:"MuiLink",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:n}=e;return[t.root,t["underline".concat((0,s.A)(n.underline))],"button"===n.component&&t.button]}})((e=>{let{theme:t,ownerState:n}=e;return(0,o.A)({},"none"===n.underline&&{textDecoration:"none"},"hover"===n.underline&&{textDecoration:"none","&:hover":{textDecoration:"underline"}},"always"===n.underline&&(0,o.A)({textDecoration:"underline"},"inherit"!==n.color&&{textDecorationColor:w({theme:t,ownerState:n})},{"&:hover":{textDecorationColor:"inherit"}}),"button"===n.component&&{position:"relative",WebkitTapHighlightColor:"transparent",backgroundColor:"transparent",outline:0,border:0,margin:0,borderRadius:0,padding:0,cursor:"pointer",userSelect:"none",verticalAlign:"middle",MozAppearance:"none",WebkitAppearance:"none","&::-moz-focus-inner":{borderStyle:"none"},["&.".concat(b.focusVisible)]:{outline:"auto"}})})),P=a.forwardRef((function(e,t){const n=(0,u.A)({props:e,name:"MuiLink"}),{className:i,color:p="primary",component:h="a",onBlur:A,onFocus:b,TypographyClasses:f,underline:v="always",variant:w="inherit",sx:P}=n,N=(0,r.A)(n,y),{isFocusVisibleRef:S,onBlur:T,onFocus:k,ref:F}=(0,m.A)(),[j,R]=a.useState(!1),W=(0,d.A)(t,F),D=(0,o.A)({},n,{color:p,component:h,focusVisible:j,underline:v,variant:w}),B=(e=>{const{classes:t,component:n,focusVisible:r,underline:o}=e,a={root:["root","underline".concat((0,s.A)(o)),"button"===n&&"button",r&&"focusVisible"]};return(0,c.A)(a,g,t)})(D);return(0,x.jsx)(C,(0,o.A)({color:p,className:(0,l.A)(B.root,i),classes:f,component:h,onBlur:e=>{T(e),!1===S.current&&R(!1),A&&A(e)},onFocus:e=>{k(e),!0===S.current&&R(!0),b&&b(e)},ref:W,ownerState:D,variant:w,sx:[...Object.keys(E).includes(p)?[]:[{color:p}],...Array.isArray(P)?P:[P]]},N))}))}}]);