(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[705],{2424:function(n,t,e){(window.__NEXT_P=window.__NEXT_P||[]).push(["/admin/groups",function(){return e(2535)}])},2765:function(n,t,e){"use strict";e.d(t,{Z:function(){return i}});var c=e(5893);function r(n,t,e){return t in n?Object.defineProperty(n,t,{value:e,enumerable:!0,configurable:!0,writable:!0}):n[t]=e,n}function a(n){for(var t=1;t<arguments.length;t++){var e=null!=arguments[t]?arguments[t]:{},c=Object.keys(e);"function"===typeof Object.getOwnPropertySymbols&&(c=c.concat(Object.getOwnPropertySymbols(e).filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable})))),c.forEach((function(t){r(n,t,e[t])}))}return n}function o(n,t){if(null==n)return{};var e,c,r=function(n,t){if(null==n)return{};var e,c,r={},a=Object.keys(n);for(c=0;c<a.length;c++)e=a[c],t.indexOf(e)>=0||(r[e]=n[e]);return r}(n,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(n);for(c=0;c<a.length;c++)e=a[c],t.indexOf(e)>=0||Object.prototype.propertyIsEnumerable.call(n,e)&&(r[e]=n[e])}return r}function i(n){var t=n.title,e=n.actionItems,r=n.children,i=o(n,["title","actionItems","children"]);return(0,c.jsxs)("main",a({className:l.main},i,{children:[t&&(0,c.jsxs)("div",{className:l.titleSection,children:[(0,c.jsx)("h1",{className:l.title,children:t}),e&&(0,c.jsx)("div",{className:l.btnGroup,children:e.length&&e.map((function(n,t){return(0,c.jsx)("button",a({},n.onClick?n.onClick:null,{className:"".concat(l.btn," ").concat(0===t?"btn-primary text-white":""),children:n.href?(0,c.jsx)("a",{href:n.href,children:n.text}):n.text}),"actionItem_".concat(n.text,"_").concat(t))}))})]}),r]}))}var l={main:"flex flex-col p-4",titleSection:"flex flex-row justify-between py-4",title:"text-4xl font-bold lowercase",btnGroup:"btn-group shadow-xl",btn:"btn hover:bg-primary hover:text-black"}},9245:function(n,t,e){"use strict";e.d(t,{Z:function(){return r}});var c=e(5893);function r(n){var t=n.items,r=n.columns;return(0,c.jsx)("div",{className:a.tableWrapper,children:(0,c.jsxs)("table",{className:a.table,children:[(0,c.jsx)("thead",{children:(0,c.jsxs)("tr",{children:[(0,c.jsx)("th",{children:(0,c.jsx)("label",{children:(0,c.jsx)("input",{type:"checkbox",className:a.checkbox})})}),r&&r.map((function(n,t){return(0,c.jsx)("th",{children:n},"".concat(n,"_").concat(t,"_header"))}))]})}),(0,c.jsx)("tbody",{children:t&&t.map((function(n,t){var o,i=e.g.window?"".concat(null===window||void 0===window||null===(o=window.location)||void 0===o?void 0:o.pathname,"/").concat(n.id):null;return(0,c.jsxs)("tr",{children:[(0,c.jsx)("td",{children:(0,c.jsx)("label",{children:(0,c.jsx)("input",{type:"checkbox",className:a.checkbox})})}),r&&r.map((function(t,e){return n[t]?"thumbnail"===t?(0,c.jsx)("td",{children:(0,c.jsx)("a",{href:i,children:(0,c.jsx)("div",{className:"avatar",children:(0,c.jsx)("div",{className:"mask mask-squircle w-12 h-12",children:(0,c.jsx)("img",{src:n.thumbnail.url,alt:"Avatar user"})})})})},"".concat(n,"_").concat(t,"_").concat(e)):(0,c.jsx)("td",{children:(0,c.jsx)("a",{href:i,children:n[t].toString()})},"".concat(n,"_").concat(t,"_").concat(e)):null}))]},"".concat(n,"_").concat(t))}))}),(0,c.jsx)("tfoot",{children:(0,c.jsxs)("tr",{children:[(0,c.jsx)("th",{}),r&&r.map((function(n,t){return(0,c.jsx)("th",{children:n},"".concat(n,"_").concat(t,"_footer"))}))]})})]})})}var a={tableWrapper:"overflow-x-auto w-full card shadow-xl",table:"table w-full",checkbox:"checkbox",avatar:""}},3842:function(n,t,e){"use strict";e.d(t,{T$:function(){return b},IO:function(){return o},nZ:function(){return r}});var c={};e.r(c),e.d(c,{m:function(){return h},FG:function(){return f}});var r={};e.r(r),e.d(r,{EA:function(){return c}});var a={};e.r(a),e.d(a,{ce:function(){return v}});var o={};e.r(o),e.d(o,{E:function(){return a}});var i="email\n    password",l="avatar {\n        url\n        title\n        filename\n    }",u="createdAt\n    updatedAt\n    id\n    tipo {\n        nombre\n        id\n    }",s="lastname\n    name",d="experiencia\n    genero\n    nivel\n    phone\n    residencia\n    username",f="\n    ".concat(i,"\n    ").concat(l,"\n    ").concat(u,"\n    ").concat(s,"\n"),h="\n    ".concat(i,"\n    ").concat(l,"\n    ").concat(u,"\n    ").concat(s,"\n    ").concat(d,"\n"),m=("\n    ".concat(i,"\n    ").concat(l,"\n    ").concat(u,"\n    ").concat(s,"\n    ").concat(d,"\n    ").concat("birthdate","\n"),"\n    ".concat("id\n    title\n    updatedAt\n    description\n    createdAt\n    aprobacion","\n    ").concat("author {\n        id\n        name\n        lastname\n        email\n    }","\n    ").concat("coAutores {\n        email\n        name\n        lastname\n        id\n    }","\n    ").concat("tags {\n        id\n        tag\n    }","\n    ").concat("coverimage {\n        url\n        title\n        filename\n    }","\n    ").concat("monografia {\n        url\n        title\n        filename\n    }","\n    ").concat("curso {\n        id\n        title\n    }","\n    ").concat("files {\n        filename\n        url\n    }","\n"),"createdAt\n    description\n    enabled\n    id\n    title\n    updatedAt"),p="estudiantes {\n        id\n        lastname\n        name\n    }",x="profesor {\n        name\n        lastname\n        id\n    }",v=("\n    ".concat(m,"\n    ").concat(p,"\n    ").concat(x,"\n"),"\n    ".concat(m,"\n    ").concat(p,"\n    ").concat(x,"\n"),function(n){return'\n    user(filter: { email: { eq: "'.concat(n,'" } }) {\n        ').concat(f,"\n    }\n")}),b={API_URL:"https://api-us-east-1.graphcms.com/v2/ckx6o9nnz5r2p01xp07jv85yk/master"}},2535:function(n,t,e){"use strict";e.r(t),e.d(t,{default:function(){return f}});var c=e(4051),r=e.n(c),a=e(5893),o=e(7294),i=e(8687),l=e(3842),u=e(2765),s=e(9245);function d(n,t,e,c,r,a,o){try{var i=n[a](o),l=i.value}catch(u){return void e(u)}i.done?t(l):Promise.resolve(l).then(c,r)}function f(){var n=(0,o.useState)(null),t=n[0],e=n[1];(0,o.useEffect)((function(){var n=function(){var n,t=(n=r().mark((function n(){var t;return r().wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,(0,i.request)(l.T$.API_URL,l.queries.GET_GROUPS);case 2:(t=n.sent).groups&&t.groups.length>0&&t.groups.forEach((function(n){var t;n.org=n.org.name,n.monkeys=(null===(t=n.monkeys)||void 0===t?void 0:t.length)+1})),e(t);case 5:case"end":return n.stop()}}),n)})),function(){var t=this,e=arguments;return new Promise((function(c,r){var a=n.apply(t,e);function o(n){d(a,c,r,o,i,"next",n)}function i(n){d(a,c,r,o,i,"throw",n)}o(void 0)}))});return function(){return t.apply(this,arguments)}}();n()}),[]),console.log("OVER HERE!!",t);return t?(0,a.jsx)(u.Z,{title:"Groups",actionItems:[{text:"New",href:"/admin/groups/new"},{text:"Delete",onClick:function(){return alert("Delete Items")}}],children:(0,a.jsx)(s.Z,{items:t.groups,columns:["name","isActive","org","monkeys"]})}):null}}},function(n){n.O(0,[687,774,888,179],(function(){return t=2424,n(n.s=t);var t}));var t=n.O();_N_E=t}]);