(this["webpackJsonpweb-toolbox"]=this["webpackJsonpweb-toolbox"]||[]).push([[16],{1055:function(e,t,r){"use strict";r.r(t),r.d(t,"mapStateToProps",(function(){return J})),r.d(t,"mapDispatchToProps",(function(){return N}));var n=r(16),a=r(493),o=r(516),c=r(441),i=r(177),d=r(442),s=r(522),l=r(224),u=r.n(l),b=r(0),p=r.n(b),f=r(32),h=r(61),j=r(1051),g=r(63),w=r(60),O=r(40),x=r(561);function m(e){this.message=e}m.prototype=new Error,m.prototype.name="InvalidCharacterError";var v="undefined"!=typeof window&&window.atob&&window.atob.bind(window)||function(e){var t=String(e).replace(/=+$/,"");if(t.length%4==1)throw new m("'atob' failed: The string to be decoded is not correctly encoded.");for(var r,n,a=0,o=0,c="";n=t.charAt(o++);~n&&(r=a%4?64*r+n:n,a++%4)?c+=String.fromCharCode(255&r>>(-2*a&6)):0)n="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".indexOf(n);return c};function y(e){var t=e.replace(/-/g,"+").replace(/_/g,"/");switch(t.length%4){case 0:break;case 2:t+="==";break;case 3:t+="=";break;default:throw"Illegal base64url string!"}try{return function(e){return decodeURIComponent(v(e).replace(/(.)/g,(function(e,t){var r=t.charCodeAt(0).toString(16).toUpperCase();return r.length<2&&(r="0"+r),"%"+r})))}(t)}catch(e){return v(t)}}function T(e){this.message=e}T.prototype=new Error,T.prototype.name="InvalidTokenError";var k=function(e,t){if("string"!=typeof e)throw new T("Invalid token specified");var r=!0===(t=t||{}).header?0:1;try{return JSON.parse(y(e.split(".")[r]))}catch(e){throw new T("Invalid token specified: "+e.message)}};function S(e,t){if(!e)return"";try{var r=k(e,{header:t});return JSON.stringify(r,null,4)}catch(m){return m.toString()}}var C=r(1),I=Object(i.a)((function(e){return{root:{margin:e.spacing(1)},decoded:{padding:e.spacing(1),borderColor:e.palette.text.disabled,borderStyle:"solid",borderWidth:1,borderRadius:e.shape.borderRadius,width:"100%",overflow:"auto"},toolbar:{margin:0,padding:0,"& > *":{marginLeft:e.spacing(1)}}}}));function J(e){return{inputText:e.textInputs.lastJWT}}function N(e){return{storeInputText:function(t,r){return e(Object(g.b)(t,r))}}}t.default=Object(h.b)(J,N)(Object(s.a)()((function(e){var t="JWT decoder\u2026",r=I(),i=Object(x.a)(),l=e.inputText,b=e.storeInputText,h=p.a.useState(S(l,!0)),g=Object(n.a)(h,2),m=g[0],v=g[1],y=p.a.useState(S(l,!1)),T=Object(n.a)(y,2),k=T[0],J=T[1];return Object(C.jsxs)(C.Fragment,{children:[Object(C.jsx)(f.a,{title:t}),Object(C.jsxs)("div",{className:r.root,children:[Object(C.jsx)(O.a,{iconType:u.a,title:t}),Object(C.jsx)("form",{noValidate:!0,autoComplete:"off",children:Object(C.jsx)(d.a,{autoFocus:Object(s.c)("md",e.width),id:"jwt",label:"JSON web token to decode",placeholder:"Paste or type the content here",multiline:!0,rows:10,maxRows:Object(s.c)("md",e.width)?20:10,variant:"outlined",margin:"normal",fullWidth:!0,value:l,onChange:function(e){return b("lastJWT",e.target.value)}})}),Object(C.jsxs)(a.a,{className:r.toolbar,children:[Object(C.jsx)(o.a,{display:"flex",flexGrow:1}),Object(C.jsx)(w.a,{data:k}),Object(C.jsx)(c.a,{variant:"contained",color:"primary",endIcon:Object(C.jsx)(u.a,{children:"Decode"}),disabled:!l,onClick:function(){v(S(l,!0)),J(S(l,!1))},children:"Decode"})]}),Object(C.jsx)("div",{className:r.decoded,children:Object(C.jsxs)("div",{children:[Object(C.jsx)(j.a,{language:"json",style:i,children:m}),Object(C.jsx)(j.a,{language:"json",style:i,children:k})]})})]})]})})))},561:function(e,t,r){"use strict";r.d(t,"a",(function(){return c}));var n=r(146),a=r(1045),o=r(1046),c=function(){return Object(n.c)().isDark?a.a:o.a}}}]);
//# sourceMappingURL=16.c5b58a2b.chunk.js.map