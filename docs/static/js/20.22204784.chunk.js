(this["webpackJsonpweb-toolbox"]=this["webpackJsonpweb-toolbox"]||[]).push([[20],{1165:function(e,t,n){"use strict";n.r(t),n.d(t,"mapStateToProps",(function(){return F})),n.d(t,"mapDispatchToProps",(function(){return L}));var a=n(16),c=n(522),r=n(445),o=n(512),i=n(178),s=n(513),l=n(514),j=n(515),b=n(516),u=n(446),d=n(526),p=n(228),h=n.n(p),O=n(1138),m=n.n(O),x=n(0),f=n.n(x),g=n(32),v=n(60),w=n(62),y=n(40),T=n(7),S=n(511),C=n(177),k=Object(T.a)((function(e){return{body:{fontSize:e.spacing(1.75),whiteSpace:"normal",wordBreak:"break-word"}}}))(S.a),D=Object(T.a)((function(e){return{root:{"&:nth-of-type(even)":{backgroundColor:e.palette.action.hover}}}}))(j.a),N=Object(C.a)((function(e){return{root:{margin:e.spacing(1)},panel:{marginBottom:e.spacing(3)},form:{display:"flex",flexWrap:"wrap"},value:{fontFamily:"monospace"},tableHeader:{backgroundColor:e.palette.primary.main},timePickerField:{marginLeft:e.spacing(1),marginRight:e.spacing(1),width:260}}})),E=n(509),I=n(1086),P=n(565),V=n(1153),z=n(1167),B=n(1);function F(e){return{inputText:e.textInputs.lastEpochValue}}function L(e){return{storeInputText:function(t,n){return e(Object(w.b)(t,n))}}}t.default=Object(v.b)(F,L)(Object(d.a)()((function(e){var t="Date & Epoch",n=N(),p=e.inputText,O=e.storeInputText,v=Object(x.useState)(new Date),w=Object(a.a)(v,2),T=w[0],S=w[1],C=f.a.useState(null),F=Object(a.a)(C,2),L=F[0],J=F[1],U=function(e){J(e),O("lastEpochValue","".concat(null===e||void 0===e?void 0:e.getTime()))};return Object(x.useEffect)((function(){p&&S(new Date(+p))}),[p]),Object(B.jsxs)(B.Fragment,{children:[Object(B.jsx)(g.a,{title:t}),Object(B.jsxs)("div",{className:n.root,children:[Object(B.jsx)(y.a,{iconType:h.a,title:t}),Object(B.jsx)("form",{className:n.form,noValidate:!0,children:Object(B.jsx)(P.a,{utils:I.a,children:Object(B.jsxs)(E.a,{container:!0,justifyContent:"space-between",children:[Object(B.jsxs)(c.a,{display:"flex",alignItems:"center",children:[Object(B.jsx)(u.a,{autoFocus:Object(d.c)("md",e.width),label:"Epoch value",placeholder:"Epoch value",type:"number",variant:"outlined",margin:"normal",value:p,onChange:function(e){return O("lastEpochValue",e.target.value)}}),Object(B.jsx)(r.a,{variant:"contained",title:"Update value with 'Now' value",color:"primary",onClick:function(){return U(new Date)},children:Object(B.jsx)(m.a,{})})]}),Object(B.jsxs)("div",{children:[Object(B.jsx)(V.a,{margin:"normal",label:"Date",format:"yyyy-MM-dd",value:L,onChange:U,KeyboardButtonProps:{"aria-label":"change date"}}),Object(B.jsx)(z.a,{margin:"normal",label:"Time",value:L,onChange:U,KeyboardButtonProps:{"aria-label":"change time"}})]})]})})}),Object(B.jsx)(o.a,{component:i.a,className:n.panel,children:Object(B.jsxs)(s.a,{children:[Object(B.jsx)(l.a,{className:n.tableHeader,children:Object(B.jsxs)(j.a,{children:[Object(B.jsx)(k,{children:"Description"}),Object(B.jsx)(k,{children:"Value"})]})}),Object(B.jsxs)(b.a,{children:[Object(B.jsxs)(D,{children:[Object(B.jsx)(k,{component:"th",scope:"row",children:"ISO string / JSON"}),Object(B.jsx)(k,{children:Object(B.jsx)("span",{className:n.value,children:T.toISOString()})})]}),Object(B.jsxs)(D,{children:[Object(B.jsx)(k,{component:"th",scope:"row",children:"Locale date string"}),Object(B.jsx)(k,{children:Object(B.jsxs)("span",{className:n.value,children:[T.toLocaleDateString()," ",T.toLocaleTimeString()]})})]}),Object(B.jsxs)(D,{children:[Object(B.jsx)(k,{component:"th",scope:"row",children:"Timezone offset"}),Object(B.jsxs)(k,{children:[T.getTimezoneOffset()," minutes (",T.getTimezoneOffset()/60," hours)"]})]}),Object(B.jsxs)(D,{children:[Object(B.jsx)(k,{component:"th",scope:"row",children:"UTC string"}),Object(B.jsx)(k,{children:T.toUTCString()})]})]})]})})]})]})})))}}]);
//# sourceMappingURL=20.22204784.chunk.js.map