(self.webpackChunkant_design_pro=self.webpackChunkant_design_pro||[]).push([[98],{6582:function(x,o,t){"use strict";t.d(o,{Z:function(){return a}});var f=t(2560);function E(s){if(Array.isArray(s))return(0,f.Z)(s)}function m(s){if(typeof Symbol!="undefined"&&Symbol.iterator in Object(s))return Array.from(s)}var _=t(4254);function d(){throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}function a(s){return E(s)||m(s)||(0,_.Z)(s)||d()}},6813:function(x,o,t){"use strict";t.d(o,{Z:function(){return _}});var f=t(7294),E=t(2451),m=t(5893);function _(d){var a=d.matrix,s=d.squ,b=d.raw,M=(0,f.useRef)(null);(0,f.useEffect)(function(){var y;(y=M.current)===null||y===void 0||y.setAttribute("border","1")},[M]);for(var C=[],h=0;h<s;h++){for(var I=[],D=0;D<s;D++){var j,n,A;I.push((0,m.jsx)("td",{children:b?a==null||(j=a.at(h))===null||j===void 0?void 0:j.at(D):(n=(0,E.y)(a))===null||n===void 0||(A=n.at(h))===null||A===void 0?void 0:A.at(D)},"".concat(h,"-").concat(D)))}C.push((0,m.jsx)("tr",{children:I},h))}return(0,m.jsx)("table",{ref:M,children:C})}},2451:function(x,o,t){"use strict";t.d(o,{A:function(){return E},y:function(){return m}});var f=t(9280);function E(_){try{return _()}catch(d){}}function m(_){return _==null?void 0:_.map(function(d){return d.map(function(a){return a%1==0?a:E(function(){return f.m.format(f.m.fraction(a))})})})}},8626:function(x,o,t){"use strict";t.r(o),t.d(o,{default:function(){return A}});var f=t(8736),E=t(7049),m=t(7883),_=t(507),d=t(6582),a=t(2824),s=t(6813),b=t(9624),M=t(7294),C=t(4954),h=t.n(C),I=t(9281),D=t.n(I),j=t(9280),n=t(5893);function A(){var y=(0,M.useState)(6),W=(0,a.Z)(y,2),l=W[0],S=W[1],Z=(0,M.useState)([[0,1],[0,1,0],[0,1,0,-2],[1,0],[1,0,0],[-2,9]]),g=(0,a.Z)(Z,2),P=g[0],B=g[1],N=(0,M.useState)([]),K=(0,a.Z)(N,2),H=K[0],Q=K[1];(0,M.useEffect)(function(){for(var r=j.m.matrix().resize([l,l]).toArray(),v=0;v<l;v++)for(var i=0;i<l;i++){var c;r[v][i]=P==null||(c=P.at(v))===null||c===void 0?void 0:c.at(i)}for(var e=1;e<l;e++)for(var u=2;u<e+2;u++){var T=e-1-(u-2),O=e,R=r[T][0]-r[O][0],p=r[e][u];if(p!==void 0){r[e][u]=p;continue}u!==2?r[e][u]=(r[e-1][u-1]-r[e][u-1])/R:r[e][u]=(r[T][1]-r[O][1])/R}Q(r)},[P]);function z(){for(var r=[],v=function(e){for(var u=[],T=function(p){var L;u.push((0,n.jsx)("td",{children:(0,n.jsx)(_.Z,{value:(L=P.at(e))===null||L===void 0?void 0:L.at(p),onChange:function(F){var U=(0,d.Z)(P);U[e][p]=Number(F),B(U)}})},"".concat(e,"-").concat(p)))},O=0;O<l;O++)T(O);r.push((0,n.jsx)("tr",{children:u},e))},i=0;i<l;i++)v(i);return(0,n.jsx)("table",{style:{width:"fit-content"},children:r})}return(0,n.jsx)(b.ZP,{breadcrumbRender:!1,children:(0,n.jsxs)("div",{style:{display:"flex",flexDirection:"column",gap:"12px"},children:[(0,n.jsx)(_.Z,{value:l,onChange:function(v){for(var i=[],c=0;c<v;c++)i.push(P[c]);return B(i),S(Number(v))}}),(0,n.jsx)("table",{children:(0,n.jsxs)("tr",{children:[(0,n.jsx)("td",{children:" xi "}),(0,n.jsx)("td",{children:" yi "}),(0,n.jsx)("td",{children:" f' "}),(0,n.jsx)("td",{children:" f'' "}),(0,n.jsx)("td",{children:" f''' "}),(0,n.jsx)("td",{children:" f'''' "})]})}),(0,n.jsx)(z,{}),(0,n.jsx)("img",{src:h(),style:{width:"100%"}}),(0,n.jsx)(E.Z,{style:{margin:"unset"}}),(0,n.jsxs)("section",{children:[(0,n.jsxs)("p",{children:["\u5DEE\u5546\u8868 ",(0,n.jsx)("br",{}),(0,n.jsx)(s.Z,{matrix:H,squ:l+1})]}),(0,n.jsx)("img",{src:D(),style:{width:"100%"}})]})]})})}},4954:function(x,o,t){x.exports=t.p+"static/formula.75d64a82.png"},9281:function(x,o,t){x.exports=t.p+"static/h.e382959f.png"}}]);
