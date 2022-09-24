(this["webpackJsonpweb-toolbox"]=this["webpackJsonpweb-toolbox"]||[]).push([[37],{1074:function(e,t,a){"use strict";a.r(t);var n=a(1),c=a(4),o=a(0),i=a(7),r=a(315),l=a(9),d=a(64),s=a(14),p=o.forwardRef((function(e,t){e.checked;var a=e.classes,l=e.className,p=e.control,u=e.disabled,b=(e.inputRef,e.label),h=e.labelPlacement,m=void 0===h?"end":h,g=(e.name,e.onChange,e.value,Object(c.a)(e,["checked","classes","className","control","disabled","inputRef","label","labelPlacement","name","onChange","value"])),f=Object(r.a)(),k=u;"undefined"===typeof k&&"undefined"!==typeof p.props.disabled&&(k=p.props.disabled),"undefined"===typeof k&&f&&(k=f.disabled);var y={disabled:k};return["checked","name","onChange","value","inputRef"].forEach((function(t){"undefined"===typeof p.props[t]&&"undefined"!==typeof e[t]&&(y[t]=e[t])})),o.createElement("label",Object(n.a)({className:Object(i.a)(a.root,l,"end"!==m&&a["labelPlacement".concat(Object(s.a)(m))],k&&a.disabled),ref:t},g),o.cloneElement(p,y),o.createElement(d.a,{component:"span",className:Object(i.a)(a.label,k&&a.disabled)},b))})),u=Object(l.a)((function(e){return{root:{display:"inline-flex",alignItems:"center",cursor:"pointer",verticalAlign:"middle",WebkitTapHighlightColor:"transparent",marginLeft:-11,marginRight:16,"&$disabled":{cursor:"default"}},labelPlacementStart:{flexDirection:"row-reverse",marginLeft:16,marginRight:-11},labelPlacementTop:{flexDirection:"column-reverse",marginLeft:16},labelPlacementBottom:{flexDirection:"column",marginLeft:16},disabled:{},label:{"&$disabled":{color:e.palette.text.disabled}}}}),{name:"MuiFormControlLabel"})(p),b=a(17),h=a(13),m=a(105),g=a(263),f=o.forwardRef((function(e,t){var a=e.autoFocus,l=e.checked,d=e.checkedIcon,s=e.classes,p=e.className,u=e.defaultChecked,b=e.disabled,f=e.icon,k=e.id,y=e.inputProps,j=e.inputRef,x=e.name,v=e.onBlur,O=e.onChange,w=e.onFocus,C=e.readOnly,$=e.required,N=e.tabIndex,I=e.type,B=e.value,R=Object(c.a)(e,["autoFocus","checked","checkedIcon","classes","className","defaultChecked","disabled","icon","id","inputProps","inputRef","name","onBlur","onChange","onFocus","readOnly","required","tabIndex","type","value"]),E=Object(m.a)({controlled:l,default:Boolean(u),name:"SwitchBase",state:"checked"}),P=Object(h.a)(E,2),S=P[0],F=P[1],z=Object(r.a)(),D=b;z&&"undefined"===typeof D&&(D=z.disabled);var L="checkbox"===I||"radio"===I;return o.createElement(g.a,Object(n.a)({component:"span",className:Object(i.a)(s.root,p,S&&s.checked,D&&s.disabled),disabled:D,tabIndex:null,role:void 0,onFocus:function(e){w&&w(e),z&&z.onFocus&&z.onFocus(e)},onBlur:function(e){v&&v(e),z&&z.onBlur&&z.onBlur(e)},ref:t},R),o.createElement("input",Object(n.a)({autoFocus:a,checked:l,defaultChecked:u,className:s.input,disabled:D,id:L&&k,name:x,onChange:function(e){var t=e.target.checked;F(t),O&&O(e,t)},readOnly:C,ref:j,required:$,tabIndex:N,type:I,value:B},y)),S?d:f)})),k=Object(l.a)({root:{padding:9},checked:{},disabled:{},input:{cursor:"inherit",position:"absolute",opacity:0,width:"100%",height:"100%",top:0,left:0,margin:0,padding:0,zIndex:1}},{name:"PrivateSwitchBase"})(f),y=o.forwardRef((function(e,t){var a=e.classes,r=e.className,l=e.color,d=void 0===l?"secondary":l,p=e.edge,u=void 0!==p&&p,b=e.size,h=void 0===b?"medium":b,m=Object(c.a)(e,["classes","className","color","edge","size"]),g=o.createElement("span",{className:a.thumb});return o.createElement("span",{className:Object(i.a)(a.root,r,{start:a.edgeStart,end:a.edgeEnd}[u],"small"===h&&a["size".concat(Object(s.a)(h))])},o.createElement(k,Object(n.a)({type:"checkbox",icon:g,checkedIcon:g,classes:{root:Object(i.a)(a.switchBase,a["color".concat(Object(s.a)(d))]),input:a.input,checked:a.checked,disabled:a.disabled},ref:t},m)),o.createElement("span",{className:a.track}))})),j=Object(l.a)((function(e){return{root:{display:"inline-flex",width:58,height:38,overflow:"hidden",padding:12,boxSizing:"border-box",position:"relative",flexShrink:0,zIndex:0,verticalAlign:"middle","@media print":{colorAdjust:"exact"}},edgeStart:{marginLeft:-8},edgeEnd:{marginRight:-8},switchBase:{position:"absolute",top:0,left:0,zIndex:1,color:"light"===e.palette.type?e.palette.grey[50]:e.palette.grey[400],transition:e.transitions.create(["left","transform"],{duration:e.transitions.duration.shortest}),"&$checked":{transform:"translateX(20px)"},"&$disabled":{color:"light"===e.palette.type?e.palette.grey[400]:e.palette.grey[800]},"&$checked + $track":{opacity:.5},"&$disabled + $track":{opacity:"light"===e.palette.type?.12:.1}},colorPrimary:{"&$checked":{color:e.palette.primary.main,"&:hover":{backgroundColor:Object(b.a)(e.palette.primary.main,e.palette.action.hoverOpacity),"@media (hover: none)":{backgroundColor:"transparent"}}},"&$disabled":{color:"light"===e.palette.type?e.palette.grey[400]:e.palette.grey[800]},"&$checked + $track":{backgroundColor:e.palette.primary.main},"&$disabled + $track":{backgroundColor:"light"===e.palette.type?e.palette.common.black:e.palette.common.white}},colorSecondary:{"&$checked":{color:e.palette.secondary.main,"&:hover":{backgroundColor:Object(b.a)(e.palette.secondary.main,e.palette.action.hoverOpacity),"@media (hover: none)":{backgroundColor:"transparent"}}},"&$disabled":{color:"light"===e.palette.type?e.palette.grey[400]:e.palette.grey[800]},"&$checked + $track":{backgroundColor:e.palette.secondary.main},"&$disabled + $track":{backgroundColor:"light"===e.palette.type?e.palette.common.black:e.palette.common.white}},sizeSmall:{width:40,height:24,padding:7,"& $thumb":{width:16,height:16},"& $switchBase":{padding:4,"&$checked":{transform:"translateX(16px)"}}},checked:{},disabled:{},input:{left:"-100%",width:"300%"},thumb:{boxShadow:e.shadows[1],backgroundColor:"currentColor",width:20,height:20,borderRadius:"50%"},track:{height:"100%",width:"100%",borderRadius:7,zIndex:-1,transition:e.transitions.create(["opacity","background-color"],{duration:e.transitions.duration.shortest}),backgroundColor:"light"===e.palette.type?e.palette.common.black:e.palette.common.white,opacity:"light"===e.palette.type?.38:.3}}}),{name:"MuiSwitch"})(y),x=a(166),v=a(258),O=a(113),w=a.n(O),C=a(94),$=a(299),N=a(85),I=a(2),B=Object(v.a)((function(e){return{root:{margin:e.spacing(2),padding:e.spacing(2)},topDivider:{marginBottom:e.spacing(8)},switch:{display:"flex",flex:1,justifyContent:"center"}}}));t.default=function(){var e=B(),t=Object(N.c)(),a=t.isDark,n=t.toggleTheme,c="Application preferences";return Object(I.jsxs)(I.Fragment,{children:[Object(I.jsx)(C.a,{title:c}),Object(I.jsxs)(x.a,{className:e.root,children:[Object(I.jsx)($.a,{iconType:w.a,title:c}),Object(I.jsx)("div",{className:e.topDivider}),Object(I.jsx)("div",{className:e.switch,children:Object(I.jsx)(u,{control:Object(I.jsx)(j,{checked:a,onChange:function(){return n()}}),label:"Activate the Dark theme mode",labelPlacement:"end"})})]})]})}},299:function(e,t,a){"use strict";var n=a(64),c=a(258),o=(a(0),a(2)),i=Object(c.a)((function(e){return{title:{wordBreak:"break-word"},titleWithIcon:{display:"flex",alignItems:"center"},titleContainer:{display:"flex",justifyContent:"center"},icon:{height:"40px",width:"40px",marginRight:e.spacing(1)}}}));t.a=function(e){var t=i(),a=e.iconType;return Object(o.jsx)("div",{className:t.titleContainer,children:Object(o.jsxs)("div",{className:t.titleWithIcon,children:[Object(o.jsx)(a,{className:t.icon}),Object(o.jsx)(n.a,{variant:"h5",className:t.title,children:e.title})]})})}},315:function(e,t,a){"use strict";a.d(t,"a",(function(){return o}));var n=a(0),c=a(336);function o(){return n.useContext(c.a)}},336:function(e,t,a){"use strict";a.d(t,"b",(function(){return o}));var n=a(0),c=n.createContext();function o(){return n.useContext(c)}t.a=c}}]);
//# sourceMappingURL=37.20573287.chunk.js.map