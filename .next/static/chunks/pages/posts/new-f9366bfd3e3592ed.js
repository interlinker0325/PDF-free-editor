(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[566],{4409:function(e,n,t){(window.__NEXT_P=window.__NEXT_P||[]).push(["/posts/new",function(){return t(7092)}])},2765:function(e,n,t){"use strict";t.d(n,{Z:function(){return s}});var r=t(5893);function a(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function l(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{},r=Object.keys(t);"function"===typeof Object.getOwnPropertySymbols&&(r=r.concat(Object.getOwnPropertySymbols(t).filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable})))),r.forEach((function(n){a(e,n,t[n])}))}return e}function o(e,n){if(null==e)return{};var t,r,a=function(e,n){if(null==e)return{};var t,r,a={},l=Object.keys(e);for(r=0;r<l.length;r++)t=l[r],n.indexOf(t)>=0||(a[t]=e[t]);return a}(e,n);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(r=0;r<l.length;r++)t=l[r],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(a[t]=e[t])}return a}function s(e){var n=e.title,t=e.actionItems,a=e.children,s=o(e,["title","actionItems","children"]);return(0,r.jsxs)("main",l({className:i.main},s,{children:[n&&(0,r.jsxs)("div",{className:i.titleSection,children:[(0,r.jsx)("h1",{className:i.title,children:n}),t&&(0,r.jsx)("div",{className:i.btnGroup,children:t.length&&t.map((function(e,n){return(0,r.jsx)("button",l({},e.onClick?e.onClick:null,{className:"".concat(i.btn," ").concat(0===n?"btn-primary text-white":""),children:e.href?(0,r.jsx)("a",{href:e.href,children:e.text}):e.text}),"actionItem_".concat(e.text,"_").concat(n))}))})]}),a]}))}var i={main:"flex flex-col p-4",titleSection:"flex flex-row justify-between py-4",title:"text-4xl font-bold lowercase",btnGroup:"btn-group shadow-xl",btn:"btn hover:bg-primary hover:text-black"}},7092:function(e,n,t){"use strict";t.r(n),t.d(n,{__N_SSP:function(){return b},default:function(){return p}});var r=t(5893),a=t(7294),l=t(2765),o=t(2814),s=t(9398),i={titleInput:"input text-2xl input-ghost border-transparent rounded-none w-full border-b-black",label:"cursor-pointer label justify-start gap-4",icon:"label-text w-8 h-8 text-sm",select:"select text-sm h-8 min-h-8 w-full max-w-xs pl-0 border-2 border-transparent rounded-none border-b-black",fileInput:"input hidden input-ghost w-full",fileLabel:"label-text border-2 border-transparent py-2 rounded-none border-b-black",textarea:"textarea rounded-none resize-none bg-secondary w-full h-1/2",checkbox:"checkbox checkbox-secondary",button:function(e){return"btn btn-".concat(e," rounded-full")}},c=function(e){var n=e.form,t=e.courses,a=e.students,c=e.doSubmit,u=e.clearForm,f=e.onChange,d=e.refs;return console.log("OVER HEre!!",t,a),(0,r.jsx)(l.Z,{children:(0,r.jsxs)("form",{className:"grid auto-rows-auto gap-6",onSubmit:c,children:[(0,r.jsx)("section",{className:"row-auto",children:(0,r.jsx)("div",{className:"form-control",children:(0,r.jsx)("input",{className:i.titleInput,type:"text",name:"title",placeholder:"T\xedtulo",value:n.title,onChange:function(e){return f(e,"title")}})})}),(0,r.jsxs)("section",{className:"row-span-3 grid lg:grid-cols-2 auto-rows-auto gap-2",children:[(0,r.jsx)("div",{className:"flex flex-col gap-2",children:(0,r.jsxs)("div",{className:"form-control gap-2",children:[(0,r.jsxs)("label",{className:i.label,children:[(0,r.jsx)(o.G,{className:i.icon,icon:s.tho}),(0,r.jsxs)("select",{className:i.select,value:n.course,onChange:function(e){return f(e,"course")},children:[(0,r.jsx)("option",{value:"default",children:"Cursos"}),t.map((function(e){return(0,r.jsx)("option",{value:e.id,children:e.title},"select_course_".concat(e.id))}))]})]}),(0,r.jsxs)("label",{className:i.label,children:[(0,r.jsx)(o.G,{className:i.icon,icon:s.w49}),(0,r.jsxs)("div",{children:[(0,r.jsx)("input",{className:i.fileInput,type:"file",name:"monograph",id:"monografia",ref:d.monografia,onChange:function(e){return f(e,"monografia")}}),(0,r.jsx)("span",{htmlFor:"monografia",className:i.fileLabel,children:"Agregar Monograf\xeda >"})]})]}),(0,r.jsxs)("label",{className:i.label,children:[(0,r.jsx)(o.G,{className:i.icon,icon:s.l9f}),(0,r.jsxs)("div",{children:[(0,r.jsx)("input",{className:i.fileInput,type:"file",name:"coverimage",id:"coverimage",ref:d.coverimage,onChange:function(e){return f(e,"coverimage")}}),(0,r.jsx)("span",{htmlFor:"coverimage",className:i.fileLabel,children:"Agregar imagen de Encabezado >"})]})]}),(0,r.jsxs)("label",{className:i.label,children:[(0,r.jsx)(o.G,{className:i.icon,icon:s.tho}),(0,r.jsxs)("div",{children:[(0,r.jsx)("input",{className:i.fileInput,type:"file",name:"files",id:"files",multiple:!0,ref:d.files,onChange:function(e){return f(e,"files")}}),(0,r.jsx)("span",{className:i.fileLabel,children:"Agregar contenido Adjunto >"})]})]}),(0,r.jsxs)("label",{className:i.label,children:[(0,r.jsx)(o.G,{className:i.icon,icon:s.iOm}),(0,r.jsxs)("select",{className:i.select,value:n.coAutores,onChange:function(e){return f(e,"coAutores")},children:[(0,r.jsx)("option",{value:"default",children:"Co-Autores"}),a.map((function(e){return(0,r.jsxs)("option",{value:e.id,children:[e.name," ",e.lastname]},"select_student_".concat(e.id))}))]})]})]})}),(0,r.jsxs)("div",{className:"form-control gap-4",children:[(0,r.jsx)("textarea",{className:i.textarea,placeholder:"Agregar descripci\xf3n de la publicaci\xf3n",value:n.description,onChange:function(e){return f(e,"description")}}),(0,r.jsx)("textarea",{className:i.textarea,placeholder:"Palabras claves (separado por espacio)",value:n.tags,onChange:function(e){return f(e,"tags")}})]})]}),(0,r.jsx)("section",{className:"row-auto",children:(0,r.jsx)("div",{className:"form-control",children:(0,r.jsxs)("label",{className:i.label,children:[(0,r.jsx)("input",{type:"checkbox",className:i.checkbox,ref:d.acceptedTerms,checked:n.acceptedTerms,onChange:function(e){return f(e,"acceptedTerms")}}),(0,r.jsx)("span",{className:"label-text",children:"He leido y aceptado Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin id dolor ut leo vehicula maximus. Sed tristique eleifend fermentum. Aenean sodales ligula at risus fringilla, et consequat nisl tristique. Cras id risus auctor, facilisis neque vitae, tempor ante. Ut fringilla augue a laoreet fermentum. Aliquam consectetur venenatis est non convallis. Nullam in massa odio.Vestibulum sit amet ligula a eros lobortis efficitur. In elementum iaculis ipsum ut pretium. Nunc vitae ultrices nisl, fringilla accumsan lectus. Vestibulum at eleifend dolor. Sed fermentum enim enim, in commodo ligula semper in. Ut eget est lacinia, convallis sapien vel, gravida diam."})]})})}),(0,r.jsxs)("section",{className:"row-auto items-center flex flex-row w-full justify-between",children:[(0,r.jsxs)("div",{className:"form-control flex flex-row gap-2",children:[(0,r.jsx)("button",{type:"submit",className:i.button("secondary"),children:"Guardar"}),(0,r.jsx)("button",{type:"button",onClick:u,className:i.button("secondary"),children:"Cancelar"}),(0,r.jsx)("button",{type:"button",className:i.button("warning"),children:"Solicitar Aprobaci\xf3n"})]}),(0,r.jsx)("button",{type:"button",className:i.button("primary"),children:"Vista Previa"})]})]})})};function u(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function f(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{},r=Object.keys(t);"function"===typeof Object.getOwnPropertySymbols&&(r=r.concat(Object.getOwnPropertySymbols(t).filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable})))),r.forEach((function(n){u(e,n,t[n])}))}return e}var d={isGeneralFilled:!1,title:"",description:"",coverimage:"",course:"Curso",files:[],monografia:null,error:!1,tags:"",coAutores:"Co-Autores",acceptedTerms:!1},m={hasErrors:!1,errorKey:null,errorMessage:null},b=!0,p=function(e){var n=(0,a.useState)(d),t=n[0],l=n[1],o=(0,a.useState)(m),s=o[0],i=(o[1],{files:(0,a.useRef)(),coverimage:(0,a.useRef)(),monografia:(0,a.useRef)(),acceptedTerms:(0,a.useRef)()});console.log("OVER HERE",e);return(0,r.jsx)(c,f({refs:i,form:t,error:s,doSubmit:function(e){e.preventDefault(),console.log("over here form",t),Object.keys(t).forEach((function(e){return console.log("over here form",e,"undefined"===typeof e?"undefined":(n=e)&&"undefined"!==typeof Symbol&&n.constructor===Symbol?"symbol":typeof n);var n}))},clearForm:function(){return(0,a.useState)(d)},onChange:function(e,n){delete t[n],l(f(u({},n,i[n]?i[n].current.files||i[n].current.checked:e.target.value),t))}},e))}}},function(e){e.O(0,[523,814,774,888,179],(function(){return n=4409,e(e.s=n);var n}));var n=e.O();_N_E=n}]);