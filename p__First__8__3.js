(self.webpackChunkant_design_pro=self.webpackChunkant_design_pro||[]).push([[431],{2451:function(f,c,t){"use strict";t.d(c,{A:function(){return i},y:function(){return V}});var M=t(9280);function i(o){try{return o()}catch(v){}}function V(o){return o==null?void 0:o.map(function(v){return v.map(function(E){return E%1==0?E:i(function(){return M.m.format(M.m.fraction(E))})})})}},2048:function(f,c,t){"use strict";t.r(c),t.d(c,{default:function(){return Z}});var M=t(7883),i=t(507),V=t(8736),o=t(7049),v=t(7673),E=t(5886),l=t(2824),C=t(9624),s=t(9280),r=t(7294),u=t(2451),D=t(4322),P=t.n(D),b=t(6137),T=t.n(b),n=t(5893);function Z(){var x=(0,r.useState)(s.m.parse("cos(x) - 4 * x + 2")),p=(0,l.Z)(x,2),a=p[0],J=p[1],j=(0,r.useState)(null),W=(0,l.Z)(j,2),d=W[0],S=W[1],B=(0,r.useState)(null),I=(0,l.Z)(B,2),U=I[0],G=I[1],K=(0,r.useState)(.692425),h=(0,l.Z)(K,2),e=h[0],z=h[1],g=(0,r.useState)(null),O=(0,l.Z)(g,2),y=O[0],N=O[1],Q=(0,r.useState)(null),L=(0,l.Z)(Q,2),R=L[0],w=L[1];return(0,r.useEffect)(function(){var A=(0,u.A)(function(){return s.m.derivative(a,"x")});S(A),G((0,u.A)(function(){return s.m.derivative(A,"x")}))},[a]),(0,r.useEffect)(function(){N((0,u.A)(function(){return s.m.resolve(a,{x:Math.floor(e)})})),w((0,u.A)(function(){return s.m.resolve(a,{x:Math.ceil(e)})}))},[e]),(0,n.jsx)(C.ZP,{breadcrumbRender:!1,children:(0,n.jsxs)("div",{style:{display:"flex",flexDirection:"column",gap:"12px"},children:[(0,n.jsx)(E.Z,{placeholder:"".concat(a),onChange:function(m){return J((0,u.A)(function(){return s.m.parse(m.target.value)}))}}),"\u7528 NewtonRaphson \u6CD5\u6C42f(x) = ","".concat(a)," \u7684\u6839, x0 \u4E3A\u591A\u5C11\u65F6\u51FD\u6570\u6536\u655B\uFF1F",(0,n.jsx)(o.Z,{style:{margin:"unset"}}),(0,n.jsxs)("section",{children:[(0,n.jsxs)("p",{children:["1, \u6C42\u5BFC ",(0,n.jsx)("br",{}),"f'(x) = ",s.m.format(d)," ",(0,n.jsx)("br",{}),(0,n.jsx)("img",{src:P()})," ",(0,n.jsx)("br",{}),"(".concat(a,")")," / ","(".concat(d,")")]}),(0,n.jsxs)("p",{children:["2, \u4E3A\u4E86\u627E\u5230\u5408\u9002\u7684\u8D77\u59CB\u5143\u7D20x0, \u4F7F\u7528\u5355\u8C03\u6536\u655B\u5B9A\u7406\u3002",(0,n.jsx)("br",{})]}),(0,n.jsxs)("p",{children:["1) \u5B58\u5728 x^* \u2208 [a, b] ",(0,n.jsx)("br",{}),(0,n.jsx)("a",{href:"https://www.wolframalpha.com/input?i="+encodeURIComponent("roots ".concat(a)),target:"_blank",children:"\u5148\u6C42 ".concat(a," \u7684\u6839")})," ",(0,n.jsx)("br",{}),(0,n.jsx)(i.Z,{value:"".concat(e),onChange:function(m){return z(Number(m))}})," ",(0,n.jsx)("br",{}),"f(",Math.floor(e),") = ",(0,u.A)(function(){return"".concat(y)})," = ",(0,u.A)(function(){return y.evaluate()})," ",(0,n.jsx)("br",{}),"f(",Math.ceil(e),") = ",(0,u.A)(function(){return"".concat(R)})," = ",(0,u.A)(function(){return R.evaluate()})," ",(0,n.jsx)("br",{}),"=>"," x^* \u2208 [",Math.floor(e),", ",Math.ceil(e),"] ",(0,n.jsx)("br",{})]}),(0,n.jsxs)("p",{children:["2, \u5224\u65AD\u4E00\u4E8C\u9636\u5BFC\u7B26\u53F7 ",(0,n.jsx)("br",{}),"f'(x) = ",(0,n.jsx)("a",{href:"https://www.wolframalpha.com/input?i="+encodeURIComponent("maximize ".concat(s.m.format(d))),target:"_blank",children:s.m.format(d)})," ",(0,n.jsx)("br",{}),"f''(x) = ",(0,n.jsx)("a",{href:"https://www.wolframalpha.com/input?i="+encodeURIComponent("maximize ".concat(s.m.format(U)," ","x \u2208 [".concat(Math.floor(e),", ").concat(Math.ceil(e),"] "))),target:"_blank",children:s.m.format(U)})," \u5728 x \u2208 [",Math.floor(e),", ",Math.ceil(e),"] \u4E2D ",(0,n.jsx)("br",{})]}),(0,n.jsx)("img",{src:T(),style:{width:"100%"}})," ",(0,n.jsx)("br",{})]})]})})}},6137:function(f,c,t){f.exports=t.p+"static/3.7a20afc0.png"},4322:function(f){f.exports="data:image/png;base64,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"}}]);