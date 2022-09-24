(this["webpackJsonpweb-toolbox"]=this["webpackJsonpweb-toolbox"]||[]).push([[27],{1062:function(e,n,i){"use strict";i.r(n),i.d(n,"mapStateToProps",(function(){return Q})),i.d(n,"mapDispatchToProps",(function(){return X}));var t=i(9),a=i(25),s=i(12),o=i(276),c=i(254),l=i(340),r=i(1044),d=i(1079),u=i(1056),b=i(371),p=i(333),m=i(348),f=i(332),j=i(393),g=i(67),h=i(256),x=i(904),w=i.n(x),O=i(903),v=i.n(O),y=i(351),S=i.n(y),k=i(126),C=i.n(k),I=i(397),_=i.n(I),R=i(0),T=i.n(R),E=i(93),N=i(95),F=i(1058),L=i(96),V=i(292),J=i(289),P=i(316),B=[{encodings:[{labels:["unicode-1-1-utf-8","unicode11utf8","unicode20utf8","utf-8","utf8","x-unicode20utf8"],name:"UTF-8"}],heading:"The Encoding"},{encodings:[{labels:["866","cp866","csibm866","ibm866"],name:"IBM866"},{labels:["csisolatin2","iso-8859-2","iso-ir-101","iso8859-2","iso88592","iso_8859-2","iso_8859-2:1987","l2","latin2"],name:"ISO-8859-2"},{labels:["csisolatin3","iso-8859-3","iso-ir-109","iso8859-3","iso88593","iso_8859-3","iso_8859-3:1988","l3","latin3"],name:"ISO-8859-3"},{labels:["csisolatin4","iso-8859-4","iso-ir-110","iso8859-4","iso88594","iso_8859-4","iso_8859-4:1988","l4","latin4"],name:"ISO-8859-4"},{labels:["csisolatincyrillic","cyrillic","iso-8859-5","iso-ir-144","iso8859-5","iso88595","iso_8859-5","iso_8859-5:1988"],name:"ISO-8859-5"},{labels:["arabic","asmo-708","csiso88596e","csiso88596i","csisolatinarabic","ecma-114","iso-8859-6","iso-8859-6-e","iso-8859-6-i","iso-ir-127","iso8859-6","iso88596","iso_8859-6","iso_8859-6:1987"],name:"ISO-8859-6"},{labels:["csisolatingreek","ecma-118","elot_928","greek","greek8","iso-8859-7","iso-ir-126","iso8859-7","iso88597","iso_8859-7","iso_8859-7:1987","sun_eu_greek"],name:"ISO-8859-7"},{labels:["csiso88598e","csisolatinhebrew","hebrew","iso-8859-8","iso-8859-8-e","iso-ir-138","iso8859-8","iso88598","iso_8859-8","iso_8859-8:1988","visual"],name:"ISO-8859-8"},{labels:["csiso88598i","iso-8859-8-i","logical"],name:"ISO-8859-8-I"},{labels:["csisolatin6","iso-8859-10","iso-ir-157","iso8859-10","iso885910","l6","latin6"],name:"ISO-8859-10"},{labels:["iso-8859-13","iso8859-13","iso885913"],name:"ISO-8859-13"},{labels:["iso-8859-14","iso8859-14","iso885914"],name:"ISO-8859-14"},{labels:["csisolatin9","iso-8859-15","iso8859-15","iso885915","iso_8859-15","l9"],name:"ISO-8859-15"},{labels:["iso-8859-16"],name:"ISO-8859-16"},{labels:["cskoi8r","koi","koi8","koi8-r","koi8_r"],name:"KOI8-R"},{labels:["koi8-ru","koi8-u"],name:"KOI8-U"},{labels:["csmacintosh","mac","macintosh","x-mac-roman"],name:"macintosh"},{labels:["dos-874","iso-8859-11","iso8859-11","iso885911","tis-620","windows-874"],name:"windows-874"},{labels:["cp1250","windows-1250","x-cp1250"],name:"windows-1250"},{labels:["cp1251","windows-1251","x-cp1251"],name:"windows-1251"},{labels:["ansi_x3.4-1968","ascii","cp1252","cp819","csisolatin1","ibm819","iso-8859-1","iso-ir-100","iso8859-1","iso88591","iso_8859-1","iso_8859-1:1987","l1","latin1","us-ascii","windows-1252","x-cp1252"],name:"windows-1252"},{labels:["cp1253","windows-1253","x-cp1253"],name:"windows-1253"},{labels:["cp1254","csisolatin5","iso-8859-9","iso-ir-148","iso8859-9","iso88599","iso_8859-9","iso_8859-9:1989","l5","latin5","windows-1254","x-cp1254"],name:"windows-1254"},{labels:["cp1255","windows-1255","x-cp1255"],name:"windows-1255"},{labels:["cp1256","windows-1256","x-cp1256"],name:"windows-1256"},{labels:["cp1257","windows-1257","x-cp1257"],name:"windows-1257"},{labels:["cp1258","windows-1258","x-cp1258"],name:"windows-1258"},{labels:["x-mac-cyrillic","x-mac-ukrainian"],name:"x-mac-cyrillic"}],heading:"Legacy single-byte encodings"},{encodings:[{labels:["chinese","csgb2312","csiso58gb231280","gb2312","gb_2312","gb_2312-80","gbk","iso-ir-58","x-gbk"],name:"GBK"},{labels:["gb18030"],name:"gb18030"}],heading:"Legacy multi-byte Chinese (simplified) encodings"},{encodings:[{labels:["big5","big5-hkscs","cn-big5","csbig5","x-x-big5"],name:"Big5"}],heading:"Legacy multi-byte Chinese (traditional) encodings"},{encodings:[{labels:["cseucpkdfmtjapanese","euc-jp","x-euc-jp"],name:"EUC-JP"},{labels:["csiso2022jp","iso-2022-jp"],name:"ISO-2022-JP"},{labels:["csshiftjis","ms932","ms_kanji","shift-jis","shift_jis","sjis","windows-31j","x-sjis"],name:"Shift_JIS"}],heading:"Legacy multi-byte Japanese encodings"},{encodings:[{labels:["cseuckr","csksc56011987","euc-kr","iso-ir-149","korean","ks_c_5601-1987","ks_c_5601-1989","ksc5601","ksc_5601","windows-949"],name:"EUC-KR"}],heading:"Legacy multi-byte Korean encodings"},{encodings:[{labels:["csiso2022kr","hz-gb-2312","iso-2022-cn","iso-2022-cn-ext","iso-2022-kr","replacement"],name:"replacement"},{labels:["unicodefffe","utf-16be"],name:"UTF-16BE"},{labels:["csunicode","iso-10646-ucs-2","ucs-2","unicode","unicodefeff","utf-16","utf-16le"],name:"UTF-16LE"},{labels:["x-user-defined"],name:"x-user-defined"}],heading:"Legacy miscellaneous encodings"}].flatMap((function(e){return e.encodings.flatMap((function(e){return e.labels.map((function(n){return{label:n,name:e.name}}))}))})).sort((function(e,n){return e.label<n.label?-1:1})),U=i(394),W=i(24),z=i(902),D=i.n(z),M={delimiter:"",newline:void 0,quoteChar:'"',escapeChar:'"',header:!0,transformHeader:function(e,n){return null===e||void 0===e?void 0:e.trim()},dynamicTyping:!0,preview:0,encoding:void 0,worker:!1,comments:!1,step:void 0,complete:void 0,error:void 0,download:!1,downloadRequestHeaders:void 0,downloadRequestBody:void 0,skipEmptyLines:!0,chunk:void 0,chunkSize:void 0,fastMode:void 0,beforeFirstChunk:void 0,withCredentials:void 0,transform:void 0,delimitersToGuess:[",","\t","|",";",D.a.RECORD_SEP,D.a.UNIT_SEP]};function q(e){return A.apply(this,arguments)}function A(){return A=Object(a.a)(Object(t.a)().mark((function e(n){var i,a,s=arguments;return Object(t.a)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return i=s.length>1&&void 0!==s[1]?s[1]:M,a=Object(W.a)(Object(W.a)({},i),{},{transformHeader:function(e,n){return null===e||void 0===e?void 0:e.trim()}}),e.abrupt("return",D.a.parse(n,a));case 3:case"end":return e.stop()}}),e)}))),A.apply(this,arguments)}var K=i(250),G=Object(K.a)((function(e){return{root:{margin:e.spacing(1)},fileSelector:{margin:e.spacing(2),textAlign:"center"},formControl:{marginLeft:e.spacing(1),marginRight:e.spacing(1),minWidth:120},inputField:{fontFamily:"monospace",fontSize:"0.8em",whiteSpace:"nowrap",overflowY:"scroll"},toolbar:{margin:0,padding:0,"& > *":{marginLeft:e.spacing(1)}},encodedResult:{padding:e.spacing(1),borderColor:e.palette.text.disabled,borderStyle:"solid",borderWidth:1,borderRadius:e.shape.borderRadius,whiteSpace:"normal",wordBreak:"break-word"}}})),H=i(379),Y=i(2);function Q(e){return{inputText:e.textInputs.lastCSVInputContent,inputEncoding:e.textInputs.lastCSVInputContentEncoding,inputOptions:e.textInputs.lastCSVInputOptions}}function X(e){return{storeInputText:function(n,i){return e(Object(L.b)(n,i))}}}n.default=Object(N.b)(Q,X)(Object(o.a)()((function(e){var n="CSV parser",i=G(),x=Object(P.a)(),O=e.inputText,y=e.inputEncoding,k=e.inputOptions,I=e.storeInputText,R=T.a.useState(""),N=Object(s.a)(R,2),L=N[0],W=N[1],z=T.a.useState(""),D=Object(s.a)(z,2),A=D[0],K=D[1],Q=T.a.useState(""),X=Object(s.a)(Q,2),Z=X[0],$=X[1],ee=T.a.useState(!1),ne=Object(s.a)(ee,2),ie=ne[0],te=ne[1],ae=Object(o.c)("md",e.width),se=ae?10:4;return T.a.useEffect((function(){function e(){return(e=Object(a.a)(Object(t.a)().mark((function e(){var n,i;return Object(t.a)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,n=k?JSON.parse(k):M,e.next=4,q(O,n);case 4:i=e.sent,W(JSON.stringify(i.data,null,2)),K(JSON.stringify(i,null,2)),I("lastCSVInputOptions",JSON.stringify(n,null,2)),te(!1),e.next=14;break;case 11:e.prev=11,e.t0=e.catch(0),te(!1);case 14:case"end":return e.stop()}}),e,null,[[0,11]])})))).apply(this,arguments)}ie&&O&&function(){e.apply(this,arguments)}()}),[ie,O]),Object(Y.jsxs)(Y.Fragment,{children:[Object(Y.jsx)(E.a,{title:n}),Object(Y.jsxs)("div",{className:i.root,children:[Object(Y.jsx)(J.a,{iconType:C.a,title:n}),Object(Y.jsxs)(c.a,{className:i.toolbar,children:[Object(Y.jsx)(l.a,{display:"flex",flexGrow:1}),Object(Y.jsxs)("div",{children:[Object(Y.jsx)("input",{type:"file",color:"primary",accept:"text/csv",onChange:function(e){return function(e){var n,i;if(null!==e&&void 0!==e&&null!==(n=e.target)&&void 0!==n&&n.files&&0!==e.target.files.length){var t=e.target.files[0],a=new FileReader;a.onload=function(n){I("lastCSVInputContent",n.target.result),$("".concat(t.name," (").concat(Object(H.a)(t.size),")")),e.target.value=""};var s=B.find((function(e){return e.label===y}));a.readAsText(t,null!==(i=null===s||void 0===s?void 0:s.name)&&void 0!==i?i:"utf-8")}}(e)},id:"icon-button-file",style:{display:"none"}}),Object(Y.jsx)("label",{htmlFor:"icon-button-file",children:Object(Y.jsxs)(h.a,{variant:"contained",component:"span",color:"primary",children:["File \xa0 ",Object(Y.jsx)(v.a,{})]})})]}),Object(Y.jsxs)(r.a,{className:i.formControl,children:[Object(Y.jsx)(d.a,{shrink:!0,id:"encodingLabel",children:"Encoding"}),Object(Y.jsx)(u.a,{labelId:"encodingLabel",id:"encoding",value:y,autoFocus:ae,onChange:function(e){return I("lastCSVInputContentEncoding",e.target.value)},children:B.map((function(e,n){return Object(Y.jsxs)(b.a,{value:e.label,children:[e.label," (",e.name,")"]},"".concat(n,"-").concat(e.label))}))}),Object(Y.jsx)(p.a,{children:"Specify the file encoding"})]})]}),Object(Y.jsx)("form",{noValidate:!0,autoComplete:"off",children:Object(Y.jsxs)(m.a,{container:!0,spacing:1,children:[Object(Y.jsx)(m.a,{item:!0,md:8,sm:12,xs:12,children:Object(Y.jsx)(f.a,{name:"inputText",label:"CSV Source data",helperText:Z,multiline:!0,minRows:se,maxRows:se,variant:"outlined",margin:"normal",inputProps:{style:{fontFamily:"monospace",fontSize:"0.8em",whiteSpace:"nowrap",overflowY:"scroll"}},fullWidth:!0,value:O,onChange:function(e){return I("lastCSVInputContent",e.target.value)}})}),Object(Y.jsx)(m.a,{item:!0,md:4,sm:12,xs:12,children:Object(Y.jsx)(f.a,{name:"inputOptions",label:"Parser options",helperText:Object(Y.jsx)(j.a,{target:"_blank",rel:"noreferrer",href:"https://www.papaparse.com/docs#config",children:"Options documentation available here!"}),multiline:!0,minRows:se,maxRows:se,variant:"outlined",margin:"normal",inputProps:{style:{fontFamily:"monospace",fontSize:"0.8em",whiteSpace:"nowrap",overflowY:"scroll"}},fullWidth:!0,value:k,onChange:function(e){return I("lastCSVInputOptions",e.target.value)}})})]})}),Object(Y.jsxs)(c.a,{className:i.toolbar,children:[Object(Y.jsx)(l.a,{display:"flex",flexGrow:1}),Object(Y.jsx)(h.a,{variant:"contained",color:"primary",endIcon:Object(Y.jsx)(w.a,{children:"Run"}),disabled:!O||ie,onClick:function(){return te(!0)},children:ie?"Wait\u2026":"Run"}),Object(Y.jsx)(h.a,{variant:"contained",color:"primary",disabled:!O,onClick:function(e){e.preventDefault(),W(""),K(""),$(""),I("lastCSVInputContent","")},children:Object(Y.jsx)(S.a,{})}),Object(Y.jsx)(V.a,{data:L}),Object(Y.jsx)(h.a,{endIcon:Object(Y.jsx)(_.a,{children:"Save As..."}),disabled:!L,variant:"contained",color:"primary",onClick:function(e){e.preventDefault(),U.a(L)},children:"Save\u2026"})]}),L&&Object(Y.jsxs)(Y.Fragment,{children:[Object(Y.jsx)(g.a,{children:"Parsed rows:"}),Object(Y.jsx)(F.a,{style:x,language:"json",className:i.encodedResult,children:L}),Object(Y.jsx)(g.a,{children:"Parsed result with metadata:"}),Object(Y.jsx)(F.a,{style:x,language:"json",className:i.encodedResult,children:A})]})]})]})})))},289:function(e,n,i){"use strict";var t=i(67),a=i(250),s=(i(0),i(2)),o=Object(a.a)((function(e){return{title:{wordBreak:"break-word"},titleWithIcon:{display:"flex",alignItems:"center"},titleContainer:{display:"flex",justifyContent:"center"},icon:{height:"40px",width:"40px",marginRight:e.spacing(1)}}}));n.a=function(e){var n=o(),i=e.iconType;return Object(s.jsx)("div",{className:n.titleContainer,children:Object(s.jsxs)("div",{className:n.titleWithIcon,children:[Object(s.jsx)(i,{className:n.icon}),Object(s.jsx)(t.a,{variant:"h5",className:n.title,children:e.title})]})})}},292:function(e,n,i){"use strict";var t=i(256),a=i(299),s=i.n(a),o=i(295),c=i.n(o),l=(i(0),i(94)),r=i(2);n.a=function(e){var n=e.data,i=e.hoverMessage,a=e.feedbackMessage,o=e.Icon,d=void 0===o?s.a:o,u=Object(l.c)().setToasterState;return Object(r.jsx)(t.a,{onClick:function(){if(n){var e=null!==a&&void 0!==a?a:"Content copied into clipboard: ".concat(n.substring(0,25)," \u2026");c.a(n,{format:"text/plain"}),u({open:!0,message:e,type:"success",autoHideDuration:2e3})}},disabled:!n,title:null!==i&&void 0!==i?i:"Copy to clipboard",variant:"contained",color:"primary",children:Object(r.jsx)(d,{})})}},316:function(e,n,i){"use strict";i.d(n,"a",(function(){return o}));var t=i(85),a=i(1040),s=i(1041),o=function(){return Object(t.c)().isDark?a.a:s.a}},394:function(e,n,i){"use strict";i.d(n,"a",(function(){return a}));var t=i(395);function a(e){if(window.require){window.require("electron").ipcRenderer.send("saveJsonAs",e)}else{var n=new Blob([e],{type:"application/json"});Object(t.saveAs)(n,"data.json")}}}}]);
//# sourceMappingURL=27.561d3fee.chunk.js.map