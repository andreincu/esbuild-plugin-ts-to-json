"use strict";var y=Object.create;var u=Object.defineProperty;var F=Object.getOwnPropertyDescriptor;var P=Object.getOwnPropertyNames;var T=Object.getPrototypeOf,h=Object.prototype.hasOwnProperty;var v=(t,o)=>{for(var n in o)u(t,n,{get:o[n],enumerable:!0})},p=(t,o,n,s)=>{if(o&&typeof o=="object"||typeof o=="function")for(let r of P(o))!h.call(t,r)&&r!==n&&u(t,r,{get:()=>o[r],enumerable:!(s=F(o,r))||s.enumerable});return t};var x=(t,o,n)=>(n=t!=null?y(T(t)):{},p(o||!t||!t.__esModule?u(n,"default",{value:t,enumerable:!0}):n,t)),E=t=>p(u({},"__esModule",{value:!0}),t);var S={};v(S,{esbuildTsToJson:()=>j});module.exports=E(S);var i=require("fs/promises"),a=x(require("path"),1),e=require("typescript"),O={compilerOptions:{module:e.ModuleKind.ESNext,moduleResolution:e.ModuleResolutionKind.Bundler,target:e.ScriptTarget.ES2017}};function j(){return{name:"esbuild-plugin-ts-to-json",setup(t){t.onEnd(async()=>{let{outdir:o="./build",entryPoints:n}=t.initialOptions;if(!Array.isArray(n))throw new Error("entryPoints must be an array of strings.");for(let s of n){if(typeof s!="string")throw new Error(`Invalid entry point format: ${s}`);let r=a.default.resolve(s),c=a.default.parse(s).name+".json",d=a.default.resolve(o,c);try{await(0,i.stat)(r);let l=await(0,i.readFile)(r,"utf8"),{outputText:m}=(0,e.transpileModule)(l,O),f=`data:text/javascript,${encodeURIComponent(m)}`,{default:g={}}=await import(f),w=JSON.stringify(g,null,2);await R(d,w)}catch(l){console.error(`Failed to process ${r}:`,l)}}})}}}async function R(t,o){let n=a.default.dirname(t);await(0,i.mkdir)(n,{recursive:!0}),await(0,i.writeFile)(t,o)}0&&(module.exports={esbuildTsToJson});
//# sourceMappingURL=index.cjs.map