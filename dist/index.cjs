"use strict";var p=Object.create;var n=Object.defineProperty;var c=Object.getOwnPropertyDescriptor;var f=Object.getOwnPropertyNames;var m=Object.getPrototypeOf,w=Object.prototype.hasOwnProperty;var g=(t,o)=>{for(var e in o)n(t,e,{get:o[e],enumerable:!0})},a=(t,o,e,r)=>{if(o&&typeof o=="object"||typeof o=="function")for(let i of f(o))!w.call(t,i)&&i!==e&&n(t,i,{get:()=>o[i],enumerable:!(r=c(o,i))||r.enumerable});return t};var b=(t,o,e)=>(e=t!=null?p(m(t)):{},a(o||!t||!t.__esModule?n(e,"default",{value:t,enumerable:!0}):e,t)),h=t=>a(n({},"__esModule",{value:!0}),t);var E={};g(E,{esbuildTsToJson:()=>y});module.exports=h(E);var u=require("fs/promises"),s=b(require("path"),1);function y(){return{name:"esbuild-plugin-ts-to-json",setup(t){t.onEnd(async o=>{if(O(t.initialOptions),!o?.outputFiles?.length)throw new Error("No output files found. Ensure your esbuild config is properly set.");await Promise.all(o.outputFiles.map(F))})}}}async function F(t){let{dir:o,name:e}=s.default.parse(t.path),r=s.default.resolve(o,`${e}.json`);try{let i=`data:text/javascript,${encodeURIComponent(t.text)}`,{default:l={}}=await import(i),d=JSON.stringify(l,null,2);await(0,u.mkdir)(s.default.dirname(r),{recursive:!0}),await(0,u.writeFile)(r,d)}catch(i){console.error(`Failed to process ${t.path}:`,i)}}function O({write:t,bundle:o,format:e}){if(t)throw new Error('esbuild config: "write" must be set to false. Add "write: false" to your config.');if(!o)throw new Error('esbuild config: "bundle" must be set to true. Add "bundle: true" to your config.');if(e!=="esm")throw new Error(`esbuild config: "format" must be set to "esm". Add "format: 'esm'" to your config.`)}0&&(module.exports={esbuildTsToJson});
//# sourceMappingURL=index.cjs.map