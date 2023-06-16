import{a as u,T as g}from"./jwt.f0e0aa9c.js";import{h as l,a as f}from"./http.12b0c277.js";async function w(s){const{topicId:e,resourceType:r,resourceId:a}=s,{done:o=[]}=await p(r,a)||{};return o?.includes(e)}async function y(s){const{topicId:e,resourceType:r,resourceId:a}=s,o=await p(r,a);return o?.done?.includes(e)?"done":o?.learning?.includes(e)?"learning":o?.skipped?.includes(e)?"skipped":"pending"}async function $(s,e){const{topicId:r,resourceType:a,resourceId:o}=s,{response:n,error:t}=await l("https://api.roadmap.sh/v1-update-resource-progress",{topicId:r,resourceType:a,resourceId:o,progress:e});if(t||!n?.done||!n?.learning)throw new Error(t?.message||"Something went wrong");return d(a,o,n.done,n.learning,n.skipped),n}async function p(s,e){if(!u.get(g))return{done:[],learning:[],skipped:[]};const r=`${s}-${e}-progress`,a=localStorage.getItem(r),o=JSON.parse(a||"null"),n=o?.timestamp,i=new Date().getTime()-parseInt(n||"0",10)>15*60*1e3;return!o||i?h(s,e):o}async function h(s,e){const{response:r,error:a}=await f("https://api.roadmap.sh/v1-get-user-resource-progress",{resourceType:s,resourceId:e});return a||!r?(console.error(a),{done:[],learning:[],skipped:[]}):(d(s,e,r?.done||[],r?.learning||[],r?.skipped||[]),r)}function d(s,e,r,a,o){localStorage.setItem(`${s}-${e}-progress`,JSON.stringify({done:r,learning:a,skipped:o,timestamp:new Date().getTime()}))}function c(s,e){const r=e==="learning",a=e==="skipped",o=e==="done",n=[];document.querySelectorAll(`[data-group-id$="-${s}"]`).forEach(t=>{const i=t?.dataset?.groupId||"";new RegExp(`^\\d+-${s}$`).test(i)&&n.push(t)}),document.querySelectorAll(`[data-group-id="${s}"]`).forEach(t=>{n.push(t)}),document.querySelectorAll(`[data-group-id="check:${s}"]`).forEach(t=>{n.push(t)}),n.forEach(t=>{o?(t.classList.add("done"),t.classList.remove("learning","skipped")):r?(t.classList.add("learning"),t.classList.remove("done","skipped")):a?(t.classList.add("skipped"),t.classList.remove("done","learning")):t.classList.remove("done","skipped","learning")})}async function S(s,e){const{done:r=[],learning:a=[],skipped:o=[]}=await p(s,e)||{};r.forEach(n=>{c(n,"done")}),a.forEach(n=>{c(n,"learning")}),o.forEach(n=>{c(n,"skipped")})}export{S as a,y as g,w as i,c as r,$ as u};
