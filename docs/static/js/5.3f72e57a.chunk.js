(this["webpackJsonpweb-toolbox"]=this["webpackJsonpweb-toolbox"]||[]).push([[5],{294:function(e,r,t){"use strict";var o=t(301),a={"text/plain":"Text","text/html":"Url",default:"Text"};e.exports=function(e,r){var t,n,i,p,l,c,s=!1;r||(r={}),t=r.debug||!1;try{if(i=o(),p=document.createRange(),l=document.getSelection(),(c=document.createElement("span")).textContent=e,c.ariaHidden="true",c.style.all="unset",c.style.position="fixed",c.style.top=0,c.style.clip="rect(0, 0, 0, 0)",c.style.whiteSpace="pre",c.style.webkitUserSelect="text",c.style.MozUserSelect="text",c.style.msUserSelect="text",c.style.userSelect="text",c.addEventListener("copy",(function(o){if(o.stopPropagation(),r.format)if(o.preventDefault(),"undefined"===typeof o.clipboardData){t&&console.warn("unable to use e.clipboardData"),t&&console.warn("trying IE specific stuff"),window.clipboardData.clearData();var n=a[r.format]||a.default;window.clipboardData.setData(n,e)}else o.clipboardData.clearData(),o.clipboardData.setData(r.format,e);r.onCopy&&(o.preventDefault(),r.onCopy(o.clipboardData))})),document.body.appendChild(c),p.selectNodeContents(c),l.addRange(p),!document.execCommand("copy"))throw new Error("copy command was unsuccessful");s=!0}catch(d){t&&console.error("unable to copy using execCommand: ",d),t&&console.warn("trying IE specific stuff");try{window.clipboardData.setData(r.format||"text",e),r.onCopy&&r.onCopy(window.clipboardData),s=!0}catch(d){t&&console.error("unable to copy using clipboardData: ",d),t&&console.error("falling back to prompt"),n=function(e){var r=(/mac os x/i.test(navigator.userAgent)?"\u2318":"Ctrl")+"+C";return e.replace(/#{\s*key\s*}/g,r)}("message"in r?r.message:"Copy to clipboard: #{key}, Enter"),window.prompt(n,e)}}finally{l&&("function"==typeof l.removeRange?l.removeRange(p):l.removeAllRanges()),c&&document.body.removeChild(c),i()}return s}},299:function(e,r,t){"use strict";var o=t(18),a=t(20);Object.defineProperty(r,"__esModule",{value:!0}),r.default=void 0;var n=a(t(0)),i=(0,o(t(21)).default)(n.createElement("path",{d:"M19 3h-4.18C14.4 1.84 13.3 1 12 1c-1.3 0-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm-2 14l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z"}),"AssignmentTurnedIn");r.default=i},301:function(e,r){e.exports=function(){var e=document.getSelection();if(!e.rangeCount)return function(){};for(var r=document.activeElement,t=[],o=0;o<e.rangeCount;o++)t.push(e.getRangeAt(o));switch(r.tagName.toUpperCase()){case"INPUT":case"TEXTAREA":r.blur();break;default:r=null}return e.removeAllRanges(),function(){"Caret"===e.type&&e.removeAllRanges(),e.rangeCount||t.forEach((function(r){e.addRange(r)})),r&&r.focus()}}},335:function(e,r,t){"use strict";var o=t(32),a=t(1),n=t(62);function i(e,r){var t={};return Object.keys(e).forEach((function(o){-1===r.indexOf(o)&&(t[o]=e[o])})),t}function p(e){var r=function(r){var t=e(r);return r.css?Object(a.a)({},Object(n.a)(t,e(Object(a.a)({theme:r.theme},r.css))),i(r.css,[e.filterProps])):r.sx?Object(a.a)({},Object(n.a)(t,e(Object(a.a)({theme:r.theme},r.sx))),i(r.sx,[e.filterProps])):t};return r.propTypes={},r.filterProps=["css","sx"].concat(Object(o.a)(e.filterProps)),r}var l=p;var c=function(){for(var e=arguments.length,r=new Array(e),t=0;t<e;t++)r[t]=arguments[t];var o=function(e){return r.reduce((function(r,t){var o=t(e);return o?Object(n.a)(r,o):r}),{})};return o.propTypes={},o.filterProps=r.reduce((function(e,r){return e.concat(r.filterProps)}),[]),o},s=t(12),d=t(95);function u(e,r){return r&&"string"===typeof r?r.split(".").reduce((function(e,r){return e&&e[r]?e[r]:null}),e):null}var f=function(e){var r=e.prop,t=e.cssProperty,o=void 0===t?e.prop:t,a=e.themeKey,n=e.transform,i=function(e){if(null==e[r])return null;var t=e[r],i=u(e.theme,a)||{};return Object(d.a)(e,t,(function(e){var r;return"function"===typeof i?r=i(e):Array.isArray(i)?r=i[e]||e:(r=u(i,e)||e,n&&(r=n(r))),!1===o?r:Object(s.a)({},o,r)}))};return i.propTypes={},i.filterProps=[r],i};function m(e){return"number"!==typeof e?e:"".concat(e,"px solid")}var b=c(f({prop:"border",themeKey:"borders",transform:m}),f({prop:"borderTop",themeKey:"borders",transform:m}),f({prop:"borderRight",themeKey:"borders",transform:m}),f({prop:"borderBottom",themeKey:"borders",transform:m}),f({prop:"borderLeft",themeKey:"borders",transform:m}),f({prop:"borderColor",themeKey:"palette"}),f({prop:"borderRadius",themeKey:"shape"})),h=c(f({prop:"displayPrint",cssProperty:!1,transform:function(e){return{"@media print":{display:e}}}}),f({prop:"display"}),f({prop:"overflow"}),f({prop:"textOverflow"}),f({prop:"visibility"}),f({prop:"whiteSpace"})),y=c(f({prop:"flexBasis"}),f({prop:"flexDirection"}),f({prop:"flexWrap"}),f({prop:"justifyContent"}),f({prop:"alignItems"}),f({prop:"alignContent"}),f({prop:"order"}),f({prop:"flex"}),f({prop:"flexGrow"}),f({prop:"flexShrink"}),f({prop:"alignSelf"}),f({prop:"justifyItems"}),f({prop:"justifySelf"})),v=c(f({prop:"gridGap"}),f({prop:"gridColumnGap"}),f({prop:"gridRowGap"}),f({prop:"gridColumn"}),f({prop:"gridRow"}),f({prop:"gridAutoFlow"}),f({prop:"gridAutoColumns"}),f({prop:"gridAutoRows"}),f({prop:"gridTemplateColumns"}),f({prop:"gridTemplateRows"}),f({prop:"gridTemplateAreas"}),f({prop:"gridArea"})),g=c(f({prop:"position"}),f({prop:"zIndex",themeKey:"zIndex"}),f({prop:"top"}),f({prop:"right"}),f({prop:"bottom"}),f({prop:"left"})),x=c(f({prop:"color",themeKey:"palette"}),f({prop:"bgcolor",cssProperty:"backgroundColor",themeKey:"palette"})),w=f({prop:"boxShadow",themeKey:"shadows"});function O(e){return e<=1?"".concat(100*e,"%"):e}var j=f({prop:"width",transform:O}),C=f({prop:"maxWidth",transform:O}),P=f({prop:"minWidth",transform:O}),R=f({prop:"height",transform:O}),E=f({prop:"maxHeight",transform:O}),T=f({prop:"minHeight",transform:O}),D=(f({prop:"size",cssProperty:"width",transform:O}),f({prop:"size",cssProperty:"height",transform:O}),c(j,C,P,R,E,T,f({prop:"boxSizing"}))),S=t(275),A=c(f({prop:"fontFamily",themeKey:"typography"}),f({prop:"fontSize",themeKey:"typography"}),f({prop:"fontStyle",themeKey:"typography"}),f({prop:"fontWeight",themeKey:"typography"}),f({prop:"letterSpacing"}),f({prop:"lineHeight"}),f({prop:"textAlign"})),L=t(4),N=t(0),K=t.n(N),z=t(6),F=t(33),I=t.n(F),M=t(216);function k(e,r){var t={};return Object.keys(e).forEach((function(o){-1===r.indexOf(o)&&(t[o]=e[o])})),t}var H=t(50),q=function(e){var r=function(e){return function(r){var t,o=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},n=o.name,i=Object(L.a)(o,["name"]),p=n,l="function"===typeof r?function(e){return{root:function(t){return r(Object(a.a)({theme:e},t))}}}:{root:r},c=Object(M.a)(l,Object(a.a)({Component:e,name:n||e.displayName,classNamePrefix:p},i));r.filterProps&&(t=r.filterProps,delete r.filterProps),r.propTypes&&(r.propTypes,delete r.propTypes);var s=K.a.forwardRef((function(r,o){var n=r.children,i=r.className,p=r.clone,l=r.component,s=Object(L.a)(r,["children","className","clone","component"]),d=c(r),u=Object(z.a)(d.root,i),f=s;if(t&&(f=k(f,t)),p)return K.a.cloneElement(n,Object(a.a)({className:Object(z.a)(n.props.className,u)},f));if("function"===typeof n)return n(Object(a.a)({className:u},f));var m=l||e;return K.a.createElement(m,Object(a.a)({ref:o,className:u},f),n)}));return I()(s,e),s}}(e);return function(e,t){return r(e,Object(a.a)({defaultTheme:H.a},t))}},V=l(c(b,h,y,v,g,x,w,D,S.b,A)),W=q("div")(V,{name:"MuiBox"});r.a=W},338:function(e,r,t){"use strict";var o=t(1),a=t(4),n=t(0),i=t(6),p=t(1040),l=t(1041),c=t(1074),s=t(1075),d=t(1042),u=t(339),f=t(1052),m=t(8),b={standard:p.a,filled:l.a,outlined:c.a},h=n.forwardRef((function(e,r){var t=e.autoComplete,p=e.autoFocus,l=void 0!==p&&p,c=e.children,m=e.classes,h=e.className,y=e.color,v=void 0===y?"primary":y,g=e.defaultValue,x=e.disabled,w=void 0!==x&&x,O=e.error,j=void 0!==O&&O,C=e.FormHelperTextProps,P=e.fullWidth,R=void 0!==P&&P,E=e.helperText,T=e.hiddenLabel,D=e.id,S=e.InputLabelProps,A=e.inputProps,L=e.InputProps,N=e.inputRef,K=e.label,z=e.multiline,F=void 0!==z&&z,I=e.name,M=e.onBlur,k=e.onChange,H=e.onFocus,q=e.placeholder,V=e.required,W=void 0!==V&&V,_=e.rows,B=e.rowsMax,U=e.maxRows,G=e.minRows,J=e.select,$=void 0!==J&&J,X=e.SelectProps,Q=e.type,Y=e.value,Z=e.variant,ee=void 0===Z?"standard":Z,re=Object(a.a)(e,["autoComplete","autoFocus","children","classes","className","color","defaultValue","disabled","error","FormHelperTextProps","fullWidth","helperText","hiddenLabel","id","InputLabelProps","inputProps","InputProps","inputRef","label","multiline","name","onBlur","onChange","onFocus","placeholder","required","rows","rowsMax","maxRows","minRows","select","SelectProps","type","value","variant"]);var te={};if("outlined"===ee&&(S&&"undefined"!==typeof S.shrink&&(te.notched=S.shrink),K)){var oe,ae=null!==(oe=null===S||void 0===S?void 0:S.required)&&void 0!==oe?oe:W;te.label=n.createElement(n.Fragment,null,K,ae&&"\xa0*")}$&&(X&&X.native||(te.id=void 0),te["aria-describedby"]=void 0);var ne=E&&D?"".concat(D,"-helper-text"):void 0,ie=K&&D?"".concat(D,"-label"):void 0,pe=b[ee],le=n.createElement(pe,Object(o.a)({"aria-describedby":ne,autoComplete:t,autoFocus:l,defaultValue:g,fullWidth:R,multiline:F,name:I,rows:_,rowsMax:B,maxRows:U,minRows:G,type:Q,value:Y,id:D,inputRef:N,onBlur:M,onChange:k,onFocus:H,placeholder:q,inputProps:A},te,L));return n.createElement(d.a,Object(o.a)({className:Object(i.a)(m.root,h),disabled:w,error:j,fullWidth:R,hiddenLabel:T,ref:r,required:W,color:v,variant:ee},re),K&&n.createElement(s.a,Object(o.a)({htmlFor:D,id:ie},S),K),$?n.createElement(f.a,Object(o.a)({"aria-describedby":ne,id:D,labelId:ie,value:Y,input:le},X),c):le,E&&n.createElement(u.a,Object(o.a)({id:ne},C),E))}));r.a=Object(m.a)({root:{}},{name:"MuiTextField"})(h)},339:function(e,r,t){"use strict";var o=t(4),a=t(1),n=t(0),i=t(6),p=t(307),l=t(305),c=t(8),s=n.forwardRef((function(e,r){var t=e.children,c=e.classes,s=e.className,d=e.component,u=void 0===d?"p":d,f=(e.disabled,e.error,e.filled,e.focused,e.margin,e.required,e.variant,Object(o.a)(e,["children","classes","className","component","disabled","error","filled","focused","margin","required","variant"])),m=Object(l.a)(),b=Object(p.a)({props:e,muiFormControl:m,states:["variant","margin","disabled","error","filled","focused","required"]});return n.createElement(u,Object(a.a)({className:Object(i.a)(c.root,("filled"===b.variant||"outlined"===b.variant)&&c.contained,s,b.disabled&&c.disabled,b.error&&c.error,b.filled&&c.filled,b.focused&&c.focused,b.required&&c.required,"dense"===b.margin&&c.marginDense),ref:r},f)," "===t?n.createElement("span",{dangerouslySetInnerHTML:{__html:"&#8203;"}}):t)}));r.a=Object(c.a)((function(e){return{root:Object(a.a)({color:e.palette.text.secondary},e.typography.caption,{textAlign:"left",marginTop:3,margin:0,"&$disabled":{color:e.palette.text.disabled},"&$error":{color:e.palette.error.main}}),error:{},disabled:{},marginDense:{marginTop:4},contained:{marginLeft:14,marginRight:14},focused:{},filled:{},required:{}}}),{name:"MuiFormHelperText"})(s)},522:function(e,r,t){"use strict";var o=t(18),a=t(20);Object.defineProperty(r,"__esModule",{value:!0}),r.default=void 0;var n=a(t(0)),i=(0,o(t(21)).default)(n.createElement("path",{d:"M17 7h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1 0 1.43-.98 2.63-2.31 2.98l1.46 1.46C20.88 15.61 22 13.95 22 12c0-2.76-2.24-5-5-5zm-1 4h-2.19l2 2H16zM2 4.27l3.11 3.11C3.29 8.12 2 9.91 2 12c0 2.76 2.24 5 5 5h4v-1.9H7c-1.71 0-3.1-1.39-3.1-3.1 0-1.59 1.21-2.9 2.76-3.07L8.73 11H8v2h2.73L13 15.27V17h1.73l4.01 4L20 19.74 3.27 3 2 4.27z"}),"LinkOff");r.default=i},523:function(e,r,t){"use strict";var o=t(18),a=t(20);Object.defineProperty(r,"__esModule",{value:!0}),r.default=void 0;var n=a(t(0)),i=(0,o(t(21)).default)(n.createElement("path",{d:"M9 3L5 6.99h3V14h2V6.99h3L9 3zm7 14.01V10h-2v7.01h-3L15 21l4-3.99h-3z"}),"ImportExport");r.default=i}}]);
//# sourceMappingURL=5.3f72e57a.chunk.js.map