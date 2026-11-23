const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./Ros2ArchitectureInteractive-7BjQah9b.js","./vendor-BKmQzALh.js","./vendor-ZgkIHsf0.css","./Lesson03-Ba1aJpQv.js","./curriculum-data-Df1a_Az0.js"])))=>i.map(i=>d[i]);
var oa=Object.defineProperty;var ra=(s,t,a)=>t in s?oa(s,t,{enumerable:!0,configurable:!0,writable:!0,value:a}):s[t]=a;var nt=(s,t,a)=>ra(s,typeof t!="symbol"?t+"":t,a);import{r,j as e,M as la,S as da,X as Ge,P as fs,a as bs,T as xe,C as Lt,b as Te,c as ct,d as At,e as Pt,R as Z,B as Mt,f as ns,g as Be,h as Fe,i as xs,k as _s,l as ca,A as ge,m as js,E as pa,N as ws,n as ue,L as _e,o as V,p as pe,q as Ft,s as os,t as Oe,u as ce,v as he,w as ve,x as $e,y as qe,z as pt,D as Ue,F as ma,G as Ss,H as Re,I as Ns,J as ga,K as ua,O as rs,Q as dt,U as We,Z as Ve,V as Cs,W as ze,Y as Ot,_ as Dt,$ as ha,a0 as ot,a1 as va,a2 as ya,a3 as fa,a4 as ba,a5 as ls,a6 as xa,a7 as _a,a8 as ja,a9 as wa,aa as Sa,ab as Na,ac as Ca,ad as ka,ae as _t,af as za,ag as Ra,ah as Ce,ai as W,aj as X,ak as rt,al as me,am as fe,an as ds,ao as Ta,ap as Aa,aq as Pa,ar as ke,as as Da,at as Ea,au as be,av as ks,aw as se,ax as jt,ay as zs,az as Ia,aA as La,aB as Et,aC as lt,aD as wt,aE as Ma,aF as Fa,aG as Oa,aH as Ga,aI as Ba}from"./vendor-BKmQzALh.js";import{l as ie}from"./curriculum-data-Df1a_Az0.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const c of document.querySelectorAll('link[rel="modulepreload"]'))p(c);new MutationObserver(c=>{for(const A of c)if(A.type==="childList")for(const S of A.addedNodes)S.tagName==="LINK"&&S.rel==="modulepreload"&&p(S)}).observe(document,{childList:!0,subtree:!0});function a(c){const A={};return c.integrity&&(A.integrity=c.integrity),c.referrerPolicy&&(A.referrerPolicy=c.referrerPolicy),c.crossOrigin==="use-credentials"?A.credentials="include":c.crossOrigin==="anonymous"?A.credentials="omit":A.credentials="same-origin",A}function p(c){if(c.ep)return;c.ep=!0;const A=a(c);fetch(c.href,A)}})();const St="nexus_amr_l1_completed_lessons",Nt="nexus_amr_l1_quiz_scores",Ct="nexus_amr_l1_current_lesson",cs="navpro_l1_completed_lessons",ps="navpro_l1_quiz_scores";function $a(s=26){const[t,a]=r.useState(()=>{try{const d=localStorage.getItem(St)||localStorage.getItem(cs);return d?JSON.parse(d):[]}catch{return[]}}),[p,c]=r.useState(()=>{try{const d=localStorage.getItem(Nt)||localStorage.getItem(ps);return d?JSON.parse(d):{}}catch{return{}}}),[A,S]=r.useState(()=>{try{const o=window.location.hash.match(/#\/(?:lesson|presentation|slides)\/(\d+)/);return o?`lesson_${o[1].padStart(2,"0")}`:localStorage.getItem(Ct)||null}catch{return null}});r.useEffect(()=>{try{localStorage.setItem(St,JSON.stringify(t))}catch(d){console.error("Failed to save completed lessons",d)}},[t]),r.useEffect(()=>{try{localStorage.setItem(Nt,JSON.stringify(p))}catch(d){console.error("Failed to save quiz scores",d)}},[p]),r.useEffect(()=>{try{const d=window.location.hash;if(d.startsWith("#/presentation")||d.startsWith("#/slides"))return;A?(localStorage.setItem(Ct,A),window.location.hash=`#/lesson/${A.replace("lesson_","")}`):(localStorage.removeItem(Ct),window.location.hash="#/")}catch(d){console.error("Failed to save current lesson",d)}},[A]),r.useEffect(()=>{const d=()=>{const o=window.location.hash;if(o.startsWith("#/presentation")||o.startsWith("#/slides")){const l=o.match(/#\/(?:presentation|slides)\/(\d+)/);l&&S(`lesson_${l[1].padStart(2,"0")}`);return}if(!o||o==="#/"||o==="#")S(null);else{const l=o.match(/#\/lesson\/(\d+)/);l&&S(`lesson_${l[1].padStart(2,"0")}`)}};return window.addEventListener("hashchange",d),()=>window.removeEventListener("hashchange",d)},[]);const E=r.useCallback(d=>{a(o=>o.includes(d)?o.filter(l=>l!==d):[...o,d])},[]),k=r.useCallback(d=>{a(o=>o.includes(d)?o:[...o,d])},[]),x=r.useCallback((d,o,l)=>{const y=o===l;c(b=>({...b,[d]:{score:o,total:l,passed:y,timestamp:Date.now()}})),y&&k(d)},[k]),f=r.useCallback(()=>{window.confirm("Are you sure you want to reset all curriculum progress and quiz scores?")&&(a([]),c({}),localStorage.removeItem(St),localStorage.removeItem(Nt),localStorage.removeItem(cs),localStorage.removeItem(ps),localStorage.removeItem("nexus_amr_l1_quiz_answers"),localStorage.removeItem("navpro_l1_quiz_answers"))},[]),T=Math.round(t.length/s*100);return{completedLessons:t,quizScores:p,currentLessonId:A,setCurrentLessonId:S,toggleLessonComplete:E,markLessonComplete:k,recordQuizScore:x,resetProgress:f,progressPercent:T,completedCount:t.length,totalLessons:s}}function Wa({onNavigateHub:s,onSelectLesson:t,lessons:a,onOpenHelpModal:p,theme:c,onToggleTheme:A,onToggleSidebarMobile:S,currentLessonId:E}){const[k,x]=r.useState(""),[f,T]=r.useState(!1),d=r.useRef(null),o=r.useRef(null),[l,y]=r.useState(()=>{try{const C=new URLSearchParams(window.location.search);if(C.has("ppt")){const m=C.get("ppt")==="true"||C.get("ppt")==="1";return localStorage.setItem("navpro_show_ppt",m?"true":"false"),m}const z=localStorage.getItem("navpro_show_ppt");return z!==null?z==="true":(localStorage.setItem("navpro_show_ppt","true"),!0)}catch{return!0}});r.useEffect(()=>{const C=z=>{z.key==="navpro_show_ppt"&&y(z.newValue==="true")};return window.addEventListener("storage",C),()=>window.removeEventListener("storage",C)},[]),r.useEffect(()=>{const C=z=>{var m,h;z.key==="/"&&document.activeElement!==d.current?(z.preventDefault(),(m=d.current)==null||m.focus(),T(!0)):z.key==="Escape"&&(T(!1),(h=d.current)==null||h.blur())};return window.addEventListener("keydown",C),()=>window.removeEventListener("keydown",C)},[]),r.useEffect(()=>{const C=z=>{o.current&&!o.current.contains(z.target)&&T(!1)};return document.addEventListener("mousedown",C),()=>document.removeEventListener("mousedown",C)},[]);const b=k.trim()?a.filter(C=>C.title.toLowerCase().includes(k.toLowerCase())||C.num_str.includes(k)||C.focus&&C.focus.toLowerCase().includes(k.toLowerCase())).slice(0,8):[];return e.jsxs("header",{className:"app-navbar",children:[e.jsxs("div",{className:"navbar-left",children:[e.jsx("button",{className:"mobile-menu-btn",onClick:S,"aria-label":"Toggle Navigation Sidebar",children:e.jsx(la,{size:20})}),e.jsx("a",{href:"https://botforge.in",target:"_blank",rel:"noopener noreferrer",className:"company-logo-link",title:"Botforge Robotics - botforge.in",children:e.jsx("img",{src:"assets/images/botforge_black.png",alt:"Botforge Robotics",className:"company-logo"})}),e.jsx("div",{className:"navbar-divider"}),e.jsxs("button",{onClick:s,className:"brand-link-btn",title:"Return to Level 1 Course Hub",children:[e.jsx("img",{src:"assets/images/ros2_logo.svg",alt:"ROS 2",className:"ros2-logo"}),e.jsx("div",{className:"brand-text",children:e.jsx("span",{className:"brand-badge",children:"Level 1 • ROS 2 Jazzy"})})]})]}),e.jsxs("div",{className:"navbar-center",ref:o,children:[e.jsxs("div",{className:"search-box",children:[e.jsx(da,{size:16,className:"search-icon"}),e.jsx("input",{ref:d,type:"text",placeholder:"Search lessons, nodes, topics... (Press /)",value:k,onChange:C=>{x(C.target.value),T(!0)},onFocus:()=>T(!0),className:"search-input-field"}),k&&e.jsx("button",{className:"search-clear-btn",onClick:()=>{x(""),T(!1)},children:e.jsx(Ge,{size:14})})]}),f&&k.trim()&&e.jsx("div",{className:"search-results-dropdown fade-in",children:b.length>0?b.map(C=>e.jsxs("button",{className:"search-result-item",onClick:()=>{t(C.id),T(!1),x("")},children:[e.jsx("span",{className:"search-res-num",children:C.num_str}),e.jsxs("div",{className:"search-res-info",children:[e.jsx("span",{className:"search-res-title",children:C.title}),e.jsx("span",{className:"search-res-module",children:C.module})]})]},C.id)):e.jsxs("div",{className:"search-no-results",children:['No lessons matched "',k,'"']})})]}),e.jsxs("div",{className:"navbar-right",children:[l&&e.jsxs("a",{href:`#/presentation${E?`/${E.replace("lesson_","")}`:""}`,target:"_blank",rel:"noopener noreferrer",className:"nav-action-btn ppt-btn",title:"Open Fullscreen Instructor Presentation Deck (PPT) in New Window",children:[e.jsx(fs,{size:16}),e.jsx("span",{children:"Instructor PPT"})]}),e.jsxs("a",{href:`http://${typeof window<"u"?window.location.hostname:"localhost"}:6080/vnc.html?autoconnect=true&resize=remote`,target:"_blank",rel:"noopener noreferrer",className:"nav-action-btn desktop-btn",title:"Open Ubuntu Desktop GUI via noVNC (Gazebo / RViz2 on port 6080)",children:[e.jsx(bs,{size:16}),e.jsx("span",{children:"Desktop GUI"})]}),e.jsxs("a",{href:`http://${typeof window<"u"?window.location.hostname:"localhost"}:7681`,target:"_blank",rel:"noopener noreferrer",className:"nav-action-btn terminal-btn",title:"Open Dedicated Web Terminal in New Window (Port 7681)",children:[e.jsx(xe,{size:16}),e.jsx("span",{children:"Terminal"})]}),e.jsxs("a",{href:`http://${typeof window<"u"?window.location.hostname:"localhost"}:8443/?folder=/home/student`,target:"_blank",rel:"noopener noreferrer",className:"nav-action-btn vscode-btn",title:"Open in-browser VS Code Editor on port 8443",children:[e.jsx(Lt,{size:16}),e.jsx("span",{children:"VS Code"})]}),e.jsxs("button",{onClick:s,className:"nav-action-btn hub-btn",title:"Course Hub Overview",children:[e.jsx(Te,{size:16}),e.jsx("span",{children:"Hub"})]}),e.jsxs("button",{onClick:p,className:"nav-action-btn help-btn",title:"Curriculum Help, Docker Reset & Storage FAQ",children:[e.jsx(ct,{size:16}),e.jsx("span",{children:"Help"})]}),e.jsx("button",{onClick:A,className:"theme-toggle-btn",title:`Switch to ${c==="dark"?"Light":"Dark"} mode`,"aria-label":"Toggle Theme",children:c==="dark"?e.jsx(At,{size:17}):e.jsx(Pt,{size:17})})]})]})}function qa({modules:s,lessons:t,currentLessonId:a,onSelectLesson:p,onNavigateHub:c,completedLessons:A,onToggleComplete:S,quizScores:E,progressPercent:k,completedCount:x,totalLessons:f,onResetProgress:T,isOpenMobile:d,onCloseMobile:o}){const l=t.find(v=>v.id===a);l&&l.module_id;const[y,b]=r.useState({1:!0,2:!0,3:!0,4:!0,5:!0}),[C,z]=r.useState(a);r.useEffect(()=>{a&&z(a)},[a]);const m=v=>{b(g=>({...g,[v]:!g[v]}))},h=(v,g)=>{v.stopPropagation(),z(u=>u===g?null:g)},_=(v,g,u)=>{if(v.preventDefault(),v.stopPropagation(),g!==a)p(g),setTimeout(()=>{const i=document.getElementById(u);i&&i.scrollIntoView({behavior:"smooth",block:"start"})},250);else{const i=document.getElementById(u);i&&i.scrollIntoView({behavior:"smooth",block:"start"})}d&&o()};return e.jsxs(e.Fragment,{children:[d&&e.jsx("div",{className:"sidebar-backdrop",onClick:o,"aria-hidden":"true"}),e.jsxs("aside",{className:`app-sidebar ${d?"open-mobile":""}`,children:[e.jsxs("div",{className:"sidebar-progress-card",children:[e.jsxs("div",{className:"progress-card-top",children:[e.jsxs("div",{className:"progress-title-row",children:[e.jsx("span",{className:"progress-label",children:"Curriculum Progress"}),e.jsxs("span",{className:"progress-badge",children:[k,"%"]})]}),e.jsxs("span",{className:"progress-count",children:[x," of ",f," completed"]})]}),e.jsx("div",{className:"progress-bar-track",children:e.jsx("div",{className:"progress-bar-fill",style:{width:`${k}%`}})}),e.jsxs("button",{onClick:T,className:"reset-progress-btn",title:"Reset curriculum checklist",children:[e.jsx(Z,{size:12}),e.jsx("span",{children:"Reset Checklist"})]})]}),e.jsxs("button",{onClick:()=>{c(),d&&o()},className:`sidebar-hub-nav-btn ${a?"":"active"}`,children:[e.jsx(Mt,{size:16}),e.jsx("span",{children:"Curriculum Hub Overview"})]}),e.jsx("div",{className:"sidebar-modules-list",children:s.map(v=>{const g=y[v.id],u=t.filter(w=>w.module_id===v.id||Number(String(w.module_id).replace(/\D/g,""))===v.id),i=u.filter(w=>A.includes(w.id)).length,n=i===u.length&&u.length>0;return e.jsxs("div",{className:"sidebar-module-section",children:[e.jsxs("button",{className:`module-header-btn ${n?"completed-module":""}`,onClick:()=>m(v.id),children:[e.jsxs("div",{className:"module-header-left",children:[g?e.jsx(ns,{size:14}):e.jsx(Be,{size:14}),e.jsx("span",{className:"module-name",children:v.name})]}),e.jsxs("span",{className:"module-count-badge",children:[i,"/",u.length]})]}),g&&e.jsx("ul",{className:"sidebar-lesson-items",children:u.map(w=>{const R=w.id===a,N=A.includes(w.id),D=E[w.id];return e.jsxs("li",{children:[e.jsxs("div",{className:`sidebar-lesson-row ${R?"active":""} ${N?"completed":""}`,onClick:()=>{p(w.id),d&&o()},children:[e.jsx("button",{type:"button",className:"lesson-checkbox-btn",onClick:I=>{I.stopPropagation(),S(w.id)},title:N?"Mark incomplete":"Mark completed","aria-label":`Toggle completed for ${w.title}`,children:N?e.jsx(Fe,{size:16,className:"checked-icon"}):e.jsx(xs,{size:16,className:"unchecked-icon"})}),e.jsx("span",{className:"lesson-row-num",children:w.num_str}),e.jsx("span",{className:"lesson-row-title",title:w.title,children:w.title}),D&&D.passed&&e.jsx("span",{className:"quiz-passed-star",title:`Quiz Passed: ${D.score}/${D.total}`,children:"⭐"}),w.subtopics&&w.subtopics.length>0&&e.jsx("button",{type:"button",className:"subtopic-toggle-btn",onClick:I=>h(I,w.id),title:C===w.id?"Collapse subtopics":"Expand subtopics","aria-label":"Toggle subtopics",children:C===w.id?e.jsx(ns,{size:13}):e.jsx(Be,{size:13})})]}),C===w.id&&w.subtopics&&w.subtopics.length>0&&e.jsx("ul",{className:"sidebar-subtopics-list",children:w.subtopics.map(I=>e.jsx("li",{className:"sidebar-subtopic-item",children:e.jsxs("a",{href:`#${I.id}`,className:"sidebar-subtopic-link",onClick:M=>_(M,w.id,I.id),title:I.title,children:[e.jsx("span",{className:"subtopic-bullet"}),e.jsx("span",{className:"subtopic-text",children:I.title})]})},I.id))})]},w.id)})})]},v.id)})}),e.jsx("div",{className:"sidebar-feedback-nav-section",style:{marginTop:"1.25rem",paddingBottom:"1.5rem"},children:e.jsxs("button",{onClick:()=>{p("feedback"),d&&o()},className:`sidebar-feedback-nav-btn ${a==="feedback"?"active":""}`,title:"Course Feedback & Survey",children:[e.jsx(_s,{size:16,className:"feedback-nav-icon"}),e.jsxs("div",{style:{display:"flex",flexDirection:"column",overflow:"hidden"},children:[e.jsx("span",{className:"feedback-nav-title",children:"Course Feedback & Survey"}),e.jsx("span",{className:"feedback-nav-sub",style:{fontSize:"0.72rem",color:"var(--text-muted)"},children:"Share your learning experience"})]})]})})]})]})}const Ua={1:ue,2:ws,3:pa,4:js,5:Te};function Va({modules:s,lessons:t,onSelectLesson:a,completedLessons:p,progressPercent:c,completedCount:A,totalLessons:S,studentInfo:E,onSubmitFeedback:k}){return e.jsxs("div",{className:"hub-overview-container fade-in",children:[e.jsxs("section",{className:"hub-hero-banner",children:[e.jsxs("div",{className:"hero-content",children:[e.jsxs("div",{className:"hero-badge-row",children:[e.jsx("span",{className:"badge-pill",children:"Industrial AMR Systems Engineering"}),e.jsx("span",{className:"badge-pill jazzy",children:"ROS 2 Jazzy LTS"}),e.jsx("span",{className:"badge-pill success",children:"Ubuntu 24.04"})]}),e.jsx("h1",{className:"hero-title",children:"Level 1: Zero-to-Autonomous AMR Engineer"}),e.jsx("p",{className:"hero-description",children:"Complete mastery over core ROS 2 Jazzy robotics mechanics. Learn Linux command-line engineering, peer-to-peer DDS bus architectures, differential drive kinematics, URDF digital twins, and autonomous 2D SLAM & Nav2 navigation in Gazebo Harmonic simulation."}),e.jsxs("div",{className:"hero-actions-row",children:[e.jsxs("button",{onClick:()=>a("lesson_01"),className:"hero-primary-btn",children:[e.jsx(ca,{size:17}),e.jsx("span",{children:"Start Lesson 01: Linux Basics"}),e.jsx(ge,{size:16})]}),e.jsxs("a",{href:`http://${typeof window<"u"?window.location.hostname:"localhost"}:6080/vnc.html?autoconnect=true&resize=remote`,target:"_blank",rel:"noopener noreferrer",className:"hero-secondary-btn",children:[e.jsx(bs,{size:17}),e.jsx("span",{children:"Launch Desktop GUI (:6080)"})]}),e.jsxs("a",{href:`http://${typeof window<"u"?window.location.hostname:"localhost"}:7681`,target:"_blank",rel:"noopener noreferrer",className:"hero-secondary-btn",children:[e.jsx(xe,{size:17}),e.jsx("span",{children:"Web Terminal (:7681)"})]}),e.jsxs("a",{href:`http://${typeof window<"u"?window.location.hostname:"localhost"}:8443/?folder=/home/student`,target:"_blank",rel:"noopener noreferrer",className:"hero-secondary-btn",children:[e.jsx(Lt,{size:17}),e.jsx("span",{children:"Open VS Code (:8443)"})]})]})]}),e.jsx("div",{className:"hero-graphic",children:e.jsx("img",{src:"assets/images/ros2_logo.svg",alt:"ROS 2 Architecture",className:"hero-ros2-logo"})})]}),e.jsxs("section",{className:"hub-stats-ribbon",children:[e.jsxs("div",{className:"stat-card",children:[e.jsx("div",{className:"stat-number",children:"26"}),e.jsx("div",{className:"stat-label",children:"Hands-On Lessons"}),e.jsx("div",{className:"stat-sub",children:"Step-by-step guides"})]}),e.jsxs("div",{className:"stat-card",children:[e.jsx("div",{className:"stat-number",children:s.length}),e.jsx("div",{className:"stat-label",children:"Core Modules"}),e.jsx("div",{className:"stat-sub",children:"Middleware to Nav2"})]}),e.jsxs("div",{className:"stat-card",children:[e.jsx("div",{className:"stat-number",children:"2"}),e.jsx("div",{className:"stat-label",children:"Capstone Projects"}),e.jsx("div",{className:"stat-sub",children:"Physical & Sim AMRs"})]}),e.jsxs("div",{className:"stat-card highlight",children:[e.jsxs("div",{className:"stat-number",children:[c,"%"]}),e.jsx("div",{className:"stat-label",children:"Your Progress"}),e.jsxs("div",{className:"stat-sub",children:[A," of ",S," Completed"]})]})]}),e.jsxs("section",{className:"hub-modules-section",children:[e.jsx("div",{className:"section-header-row",children:e.jsxs("div",{children:[e.jsx("h2",{className:"section-title",children:"Curriculum Modules & Learning Track"}),e.jsx("p",{className:"section-subtitle",children:"Follow the pedagogical sequence or jump directly into specialized robotics domains:"})]})}),e.jsx("div",{className:"modules-grid",children:s.map(x=>{const f=t.filter(l=>l.module_id===x.id||Number(String(l.module_id).replace(/\D/g,""))===x.id),T=f.filter(l=>p.includes(l.id)).length,d=T===f.length&&f.length>0,o=Ua[x.id]||_e;return e.jsxs("div",{className:`module-card ${d?"completed":""}`,children:[e.jsxs("div",{className:"module-card-header",children:[e.jsx("div",{className:"module-icon-wrap",children:e.jsx(o,{size:20})}),e.jsxs("div",{className:"module-title-wrap",children:[e.jsxs("span",{className:"module-meta",children:["Module ",x.id," • Lessons"," ",String(x.range[0]).padStart(2,"0"),"-",String(x.range[1]).padStart(2,"0")]}),e.jsx("h3",{className:"module-heading",children:x.name})]}),e.jsxs("span",{className:`module-status-tag ${d?"done":""}`,children:[T,"/",f.length]})]}),e.jsx("ul",{className:"module-lessons-list",children:f.map(l=>{const y=p.includes(l.id);return e.jsx("li",{children:e.jsxs("button",{className:`module-lesson-link ${y?"done":""}`,onClick:()=>a(l.id),children:[e.jsx("span",{className:"lesson-num-pill",children:l.num_str}),e.jsx("span",{className:"lesson-title-text",children:l.title}),y&&e.jsx(V,{size:14,className:"lesson-done-check"})]})},l.id)})})]},x.id)})})]}),e.jsxs("section",{className:"hub-assignments-section",children:[e.jsx("div",{className:"section-header-row",children:e.jsxs("div",{children:[e.jsx("h2",{className:"section-title",children:"💻 Hands-On Projects & Reference Solutions"}),e.jsxs("p",{className:"section-subtitle",children:["Starter templates with ",e.jsx("code",{children:"# TODO"})," exercises are mounted in your VS Code workspace (",e.jsx("code",{children:"~/ros2_ws/src/"}),"):"]})]})}),e.jsx("div",{className:"table-wrapper",children:e.jsxs("table",{className:"assignments-table",children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"Project / Milestone"}),e.jsx("th",{children:"Focus Domain"}),e.jsx("th",{children:"Student Task Template (To Fill In)"}),e.jsx("th",{children:"Reference Solution"})]})}),e.jsxs("tbody",{children:[e.jsxs("tr",{children:[e.jsxs("td",{children:[e.jsx("span",{className:"badge badge-success",style:{marginRight:"6px",fontSize:"0.7rem"},children:"Beginner"}),e.jsx("strong",{children:"Pub/Sub Chatter Task"})]}),e.jsx("td",{children:"Core String Pub/Sub (Lesson 05)"}),e.jsx("td",{children:e.jsx("code",{children:"nexus_amr_basics/m01_l05_task_custom_pubsub.py"})}),e.jsx("td",{children:e.jsx("code",{children:"nexus_amr_basics/m01_l05_solution_custom_pubsub.py"})})]}),e.jsxs("tr",{children:[e.jsxs("td",{children:[e.jsx("span",{className:"badge badge-success",style:{marginRight:"6px",fontSize:"0.7rem"},children:"Core Service"}),e.jsx("strong",{children:"AMR Speed Mode & Zone Governor"})]}),e.jsx("td",{children:"Services & RPC (Lesson 07)"}),e.jsx("td",{children:e.jsx("code",{children:"nexus_amr_basics/m02_l07_task_speed_mode_server.py"})}),e.jsx("td",{children:e.jsx("code",{children:"nexus_amr_basics/m02_l07_solution_speed_mode_server.py"})})]}),e.jsxs("tr",{children:[e.jsxs("td",{children:[e.jsx("span",{className:"badge badge-info",style:{marginRight:"6px",fontSize:"0.7rem"},children:"Capstone 1"}),e.jsx("strong",{children:"Teleop Velocity Scaler"})]}),e.jsx("td",{children:"Publishers, Subscribers & QoS"}),e.jsx("td",{children:e.jsx("code",{children:"nexus_amr_basics/m01_l05_task_teleop_speed_limiter.py"})}),e.jsx("td",{children:e.jsx("code",{children:"nexus_amr_basics/m01_l05_solution_teleop_speed_limiter.py"})})]}),e.jsxs("tr",{children:[e.jsxs("td",{children:[e.jsx("span",{className:"badge badge-info",style:{marginRight:"6px",fontSize:"0.7rem"},children:"Capstone 2"}),e.jsx("strong",{children:"Nav2 Autonomous Patrol Mission"})]}),e.jsx("td",{children:"Autonomous Navigation & Simple Commander"}),e.jsx("td",{children:e.jsx("code",{children:"nexus_amr_navigation/m04_l22_02_task_multi_waypoint_patrol.py"})}),e.jsx("td",{children:e.jsx("code",{children:"nexus_amr_navigation/m04_l22_03_solution_multi_waypoint_patrol.py"})})]})]})]})}),e.jsxs("div",{className:"mock-callout-card",children:[e.jsxs("div",{className:"mock-callout-header",children:[e.jsx(pe,{size:20,className:"mock-icon"}),e.jsx("h4",{children:"Companion Mock Data Simulator Node"})]}),e.jsx("p",{children:"When completing assignments, test your node logic immediately without waiting for heavy Gazebo simulations. Run the companion mock telemetry publisher in any terminal:"}),e.jsxs("div",{className:"code-container",style:{margin:"0.75rem 0"},children:[e.jsx("div",{className:"code-header",children:e.jsx("span",{className:"code-lang-tag",children:"BASH"})}),e.jsx("pre",{children:e.jsx("code",{children:"ros2 run nexus_amr_basics mock_telemetry_provider"})})]}),e.jsxs("span",{className:"mock-detail",children:["Simulates ",e.jsx("code",{children:"/battery_voltage"}),","," ",e.jsx("code",{children:"/battery_status"}),", ",e.jsx("code",{children:"/obstacle_distance"}),", and"," ",e.jsx("code",{children:"/wheel_speeds"}),"."]})]})]})]})}const It="nexus_amr_l1_quiz_answers",Ha="navpro_l1_quiz_answers",kt=s=>{try{const t=localStorage.getItem(It)||localStorage.getItem(Ha);return(t?JSON.parse(t):{})[s]||{}}catch{return{}}},ms=(s,t)=>{try{const a=localStorage.getItem(It),p=a?JSON.parse(a):{};t&&Object.keys(t).length>0?p[s]=t:delete p[s],localStorage.setItem(It,JSON.stringify(p))}catch(a){console.error("Failed to save quiz answers",a)}};function Ka({lessonId:s,quizzes:t,savedScore:a,onRecordScore:p}){const[c,A]=r.useState(()=>kt(s)),[S,E]=r.useState(()=>{const o=kt(s);return!!(a&&Object.keys(o).length>0)}),[k,x]=r.useState(a||null);if(r.useEffect(()=>{const o=kt(s);A(o);const l=Object.keys(o).length>0;E(!!(a&&l)),x(a||null)},[s]),r.useEffect(()=>{a&&x(a)},[a]),!t||t.length===0)return null;const f=(o,l)=>{S||A(y=>{const b={...y,[o]:l};return ms(s,b),b})},T=o=>{if(o.preventDefault(),S)return;let l=0;t.forEach((b,C)=>{c[C]===b.correct&&(l+=1)});const y={score:l,total:t.length,passed:l===t.length,timestamp:Date.now()};E(!0),x(y),ms(s,c),p(s,l,t.length)},d=t.length>0&&Object.keys(c).length===t.length;return e.jsxs("div",{className:"quiz-container-card",children:[e.jsxs("div",{className:"quiz-header",children:[e.jsxs("div",{className:"quiz-header-title",children:[e.jsx(ct,{size:22,className:"quiz-badge-icon"}),e.jsxs("div",{children:[e.jsx("h3",{children:"Knowledge Check • Quick Quiz"}),e.jsxs("span",{className:"quiz-subtitle",children:["Verify your understanding of this lesson's core concepts (",t.length," questions)"]})]})]}),k&&e.jsxs("div",{className:`quiz-score-badge ${k.passed?"passed":"review"}`,children:[e.jsx(Ft,{size:16}),e.jsxs("span",{children:[k.score," / ",k.total," (",Math.round(k.score/k.total*100),"%)"]})]})]}),e.jsxs("form",{onSubmit:T,className:"quiz-form",children:[t.map((o,l)=>{const y=c[l],b=S&&y===o.correct;return e.jsxs("div",{className:`quiz-question-block ${S?b?"correct-block":"incorrect-block":""}`,children:[e.jsxs("div",{className:"question-prompt",children:[e.jsxs("span",{className:"q-number",children:["Q",l+1,"."]}),e.jsx("span",{className:"q-text",children:o.prompt})]}),e.jsx("div",{className:"question-options",children:o.options.map((C,z)=>{const m=y===z,h=z===o.correct;let _="quiz-option-label";return S?(_+=" submitted",h?(_+=" correct-option",m&&(_+=" user-selected")):m?_+=" wrong-option user-selected":_+=" unselected-dimmed"):m&&(_+=" selected-option"),e.jsxs("label",{className:_,children:[e.jsx("input",{type:"radio",name:`question_${l}`,checked:m,onChange:()=>f(l,z),disabled:S}),e.jsx("span",{className:"option-text",children:C}),S&&e.jsxs(e.Fragment,{children:[h&&m&&e.jsxs("span",{className:"quiz-choice-badge correct",children:[e.jsx(os,{size:14})," Your Answer • Correct"]}),h&&!m&&e.jsxs("span",{className:"quiz-choice-badge correct-answer",children:[e.jsx(os,{size:14})," Correct Answer"]}),!h&&m&&e.jsxs("span",{className:"quiz-choice-badge wrong",children:[e.jsx(Oe,{size:14})," Your Answer • Incorrect"]})]})]},z)})}),S&&e.jsxs("div",{className:`quiz-explanation-box ${b?"exp-correct":"exp-wrong"}`,children:[e.jsx("strong",{children:b?"✅ Correct Explanation:":"💡 Key Concept:"}),e.jsx("p",{children:o.explanation})]})]},o.id||l)}),e.jsx("div",{className:"quiz-actions-footer",children:S?e.jsx("div",{className:"quiz-result-row",children:e.jsx("span",{className:"result-text",children:k!=null&&k.passed?"🎉 Outstanding! You passed this lesson check.":"Review the key concepts and explanations above."})}):e.jsxs("button",{type:"submit",disabled:!d,className:`quiz-submit-btn ${d?"":"disabled"}`,children:[e.jsx(ce,{size:15}),e.jsx("span",{children:d?"Submit Quiz Answers":`Answer All Questions (${Object.keys(c).length}/${t.length})`})]})})]})]})}function Rs(){const[s,t]=r.useState("-"),[a,p]=r.useState({r:!0,w:!0,x:!0}),[c,A]=r.useState({r:!0,w:!1,x:!0}),[S,E]=r.useState({r:!0,w:!1,x:!0}),[k,x]=r.useState(!1),[f,T]=r.useState(null),d=(a.r?4:0)+(a.w?2:0)+(a.x?1:0),o=(c.r?4:0)+(c.w?2:0)+(c.x?1:0),l=(S.r?4:0)+(S.w?2:0)+(S.x?1:0),y=`${d}${o}${l}`,b=[{label:"Type",val:s,desc:s==="d"?"Directory":"Regular File",color:"#64748b"},{label:"u:r",val:a.r?"r":"-",desc:"User Read (4)",color:"#10b981",active:a.r},{label:"u:w",val:a.w?"w":"-",desc:"User Write (2)",color:"#10b981",active:a.w},{label:"u:x",val:a.x?"x":"-",desc:"User Execute (1)",color:"#10b981",active:a.x},{label:"g:r",val:c.r?"r":"-",desc:"Group Read (4)",color:"#0284c7",active:c.r},{label:"g:w",val:c.w?"w":"-",desc:"Group Write (2)",color:"#0284c7",active:c.w},{label:"g:x",val:c.x?"x":"-",desc:"Group Execute (1)",color:"#0284c7",active:c.x},{label:"o:r",val:S.r?"r":"-",desc:"Others Read (4)",color:"#8b5cf6",active:S.r},{label:"o:w",val:S.w?"w":"-",desc:"Others Write (2)",color:"#8b5cf6",active:S.w},{label:"o:x",val:S.x?"x":"-",desc:"Others Execute (1)",color:"#8b5cf6",active:S.x}],C=b.map(v=>v.val).join(""),z=`chmod ${y} sensor_diagnostics.sh`,m=(v,g,u)=>{T(u),setTimeout(()=>T(null),400),v==="user"?p(i=>({...i,[g]:!i[g]})):v==="group"?A(i=>({...i,[g]:!i[g]})):v==="others"&&E(i=>({...i,[g]:!i[g]}))},h=(v,g,u,i=!1)=>{p(v),A(g),E(u),t(i?"d":"-")},_=()=>{navigator.clipboard.writeText(z).then(()=>{x(!0),setTimeout(()=>x(!1),2e3)})};return e.jsxs("div",{className:"perm-calc-card",children:[e.jsxs("div",{className:"perm-calc-header",children:[e.jsxs("div",{className:"perm-calc-title-row",children:[e.jsxs("div",{className:"perm-calc-badge",children:[e.jsx(he,{size:16}),e.jsx("span",{children:"Interactive Simulator"})]}),e.jsx("h3",{className:"perm-calc-title",children:"Linux Permission String & Octal Visualizer"})]}),e.jsx("p",{className:"perm-calc-subtitle",children:"Toggle the checkboxes below to see in real time how Linux parses read, write, and execute bits into the 10-character permission string and octal numbers."})]}),e.jsxs("div",{className:"perm-display-container",children:[e.jsx("div",{className:"perm-display-label",children:"Active Linux Permission String:"}),e.jsx("div",{className:"perm-string-row",children:b.map((v,g)=>e.jsxs("div",{className:`perm-char-pill ${f===g?"pulse-anim":""} ${v.active!==!1?"active-bit":"inactive-bit"}`,style:{borderColor:v.active!==!1?v.color:"var(--border-color)",color:v.active!==!1?v.color:"var(--text-muted)"},title:v.desc,children:[e.jsx("span",{className:"char-val",children:v.val}),e.jsx("span",{className:"char-sub",children:v.label})]},g))}),e.jsxs("div",{className:"perm-legend-row",children:[e.jsxs("div",{className:"legend-chip file-chip",children:[e.jsx("span",{className:"dot",style:{background:"#64748b"}}),e.jsxs("span",{children:["Type: ",e.jsx("code",{children:s==="d"?"Directory (d)":"File (-)"})]})]}),e.jsxs("div",{className:"legend-chip user-chip",children:[e.jsx("span",{className:"dot",style:{background:"#10b981"}}),e.jsxs("span",{children:["User/Owner: ",e.jsxs("code",{children:[d," (",b.slice(1,4).map(v=>v.val).join(""),")"]})]})]}),e.jsxs("div",{className:"legend-chip group-chip",children:[e.jsx("span",{className:"dot",style:{background:"#0284c7"}}),e.jsxs("span",{children:["Group: ",e.jsxs("code",{children:[o," (",b.slice(4,7).map(v=>v.val).join(""),")"]})]})]}),e.jsxs("div",{className:"legend-chip others-chip",children:[e.jsx("span",{className:"dot",style:{background:"#8b5cf6"}}),e.jsxs("span",{children:["Others: ",e.jsxs("code",{children:[l," (",b.slice(7,10).map(v=>v.val).join(""),")"]})]})]})]})]}),e.jsxs("div",{className:"perm-command-bar",children:[e.jsxs("div",{className:"octal-score-box",children:[e.jsx("span",{className:"octal-score-label",children:"Octal Mode:"}),e.jsx("span",{className:"octal-score-number",children:y})]}),e.jsxs("div",{className:"command-display-box",children:[e.jsx("span",{className:"command-prompt",children:"$"}),e.jsx("code",{className:"command-text",children:z})]}),e.jsxs("button",{onClick:_,className:`copy-cmd-btn ${k?"copied":""}`,title:"Copy command to clipboard",children:[k?e.jsx(ve,{size:16}):e.jsx($e,{size:16}),e.jsx("span",{children:k?"Copied!":"Copy"})]})]}),e.jsxs("div",{className:"perm-columns-grid",children:[e.jsxs("div",{className:"perm-col user-col",children:[e.jsxs("div",{className:"perm-col-header",style:{borderLeftColor:"#10b981"},children:[e.jsxs("div",{className:"col-header-top",children:[e.jsx("span",{className:"col-badge",style:{background:"#ecfdf5",color:"#059669"},children:"u (User / Owner)"}),e.jsxs("span",{className:"col-sum",style:{color:"#059669"},children:["= ",d]})]}),e.jsx("p",{className:"col-desc",children:"The student or process who created the file"})]}),e.jsxs("div",{className:"checkbox-list",children:[e.jsxs("label",{className:`perm-check-item ${a.r?"checked":""}`,children:[e.jsx("input",{type:"checkbox",checked:a.r,onChange:()=>m("user","r",1)}),e.jsxs("span",{className:"check-text",children:[e.jsx("strong",{children:"Read (r)"}),e.jsx("span",{className:"math-badge",children:"+4"})]}),e.jsx("span",{className:"hint-text",children:"View & cat file"})]}),e.jsxs("label",{className:`perm-check-item ${a.w?"checked":""}`,children:[e.jsx("input",{type:"checkbox",checked:a.w,onChange:()=>m("user","w",2)}),e.jsxs("span",{className:"check-text",children:[e.jsx("strong",{children:"Write (w)"}),e.jsx("span",{className:"math-badge",children:"+2"})]}),e.jsx("span",{className:"hint-text",children:"Edit, modify, delete"})]}),e.jsxs("label",{className:`perm-check-item ${a.x?"checked":""}`,children:[e.jsx("input",{type:"checkbox",checked:a.x,onChange:()=>m("user","x",3)}),e.jsxs("span",{className:"check-text",children:[e.jsx("strong",{children:"Execute (x)"}),e.jsx("span",{className:"math-badge",children:"+1"})]}),e.jsx("span",{className:"hint-text",children:"Run as executable"})]})]})]}),e.jsxs("div",{className:"perm-col group-col",children:[e.jsxs("div",{className:"perm-col-header",style:{borderLeftColor:"#0284c7"},children:[e.jsxs("div",{className:"col-header-top",children:[e.jsx("span",{className:"col-badge",style:{background:"#f0f9ff",color:"#0284c7"},children:"g (Group)"}),e.jsxs("span",{className:"col-sum",style:{color:"#0284c7"},children:["= ",o]})]}),e.jsx("p",{className:"col-desc",children:"Members of the student's assigned Linux usergroup"})]}),e.jsxs("div",{className:"checkbox-list",children:[e.jsxs("label",{className:`perm-check-item ${c.r?"checked":""}`,children:[e.jsx("input",{type:"checkbox",checked:c.r,onChange:()=>m("group","r",4)}),e.jsxs("span",{className:"check-text",children:[e.jsx("strong",{children:"Read (r)"}),e.jsx("span",{className:"math-badge",children:"+4"})]}),e.jsx("span",{className:"hint-text",children:"View contents"})]}),e.jsxs("label",{className:`perm-check-item ${c.w?"checked":""}`,children:[e.jsx("input",{type:"checkbox",checked:c.w,onChange:()=>m("group","w",5)}),e.jsxs("span",{className:"check-text",children:[e.jsx("strong",{children:"Write (w)"}),e.jsx("span",{className:"math-badge",children:"+2"})]}),e.jsx("span",{className:"hint-text",children:"Modify file"})]}),e.jsxs("label",{className:`perm-check-item ${c.x?"checked":""}`,children:[e.jsx("input",{type:"checkbox",checked:c.x,onChange:()=>m("group","x",6)}),e.jsxs("span",{className:"check-text",children:[e.jsx("strong",{children:"Execute (x)"}),e.jsx("span",{className:"math-badge",children:"+1"})]}),e.jsx("span",{className:"hint-text",children:"Run program"})]})]})]}),e.jsxs("div",{className:"perm-col others-col",children:[e.jsxs("div",{className:"perm-col-header",style:{borderLeftColor:"#8b5cf6"},children:[e.jsxs("div",{className:"col-header-top",children:[e.jsx("span",{className:"col-badge",style:{background:"#f5f3ff",color:"#7c3aed"},children:"o (Others / World)"}),e.jsxs("span",{className:"col-sum",style:{color:"#7c3aed"},children:["= ",l]})]}),e.jsx("p",{className:"col-desc",children:"Any other user account or service on the robot"})]}),e.jsxs("div",{className:"checkbox-list",children:[e.jsxs("label",{className:`perm-check-item ${S.r?"checked":""}`,children:[e.jsx("input",{type:"checkbox",checked:S.r,onChange:()=>m("others","r",7)}),e.jsxs("span",{className:"check-text",children:[e.jsx("strong",{children:"Read (r)"}),e.jsx("span",{className:"math-badge",children:"+4"})]}),e.jsx("span",{className:"hint-text",children:"View contents"})]}),e.jsxs("label",{className:`perm-check-item ${S.w?"checked":""}`,children:[e.jsx("input",{type:"checkbox",checked:S.w,onChange:()=>m("others","w",8)}),e.jsxs("span",{className:"check-text",children:[e.jsx("strong",{children:"Write (w)"}),e.jsx("span",{className:"math-badge",children:"+2"})]}),e.jsx("span",{className:"hint-text",children:"Modify file"})]}),e.jsxs("label",{className:`perm-check-item ${S.x?"checked":""}`,children:[e.jsx("input",{type:"checkbox",checked:S.x,onChange:()=>m("others","x",9)}),e.jsxs("span",{className:"check-text",children:[e.jsx("strong",{children:"Execute (x)"}),e.jsx("span",{className:"math-badge",children:"+1"})]}),e.jsx("span",{className:"hint-text",children:"Run program"})]})]})]})]}),e.jsxs("div",{className:"perm-presets-row",children:[e.jsx("span",{className:"presets-label",children:"⚡ Common Robotics Presets:"}),e.jsxs("div",{className:"preset-buttons",children:[e.jsxs("button",{type:"button",className:`preset-btn ${y==="755"?"active":""}`,onClick:()=>h({r:!0,w:!0,x:!0},{r:!0,w:!1,x:!0},{r:!0,w:!1,x:!0}),children:[e.jsx("strong",{children:"755"})," (ROS Node / Script)"]}),e.jsxs("button",{type:"button",className:`preset-btn ${y==="644"?"active":""}`,onClick:()=>h({r:!0,w:!0,x:!1},{r:!0,w:!1,x:!1},{r:!0,w:!1,x:!1}),children:[e.jsx("strong",{children:"644"})," (Config / YAML / Read)"]}),e.jsxs("button",{type:"button",className:`preset-btn ${y==="700"?"active":""}`,onClick:()=>h({r:!0,w:!0,x:!0},{r:!1,w:!1,x:!1},{r:!1,w:!1,x:!1}),children:[e.jsx("strong",{children:"700"})," (Private Script / SSH)"]}),e.jsxs("button",{type:"button",className:`preset-btn ${y==="600"?"active":""}`,onClick:()=>h({r:!0,w:!0,x:!1},{r:!1,w:!1,x:!1},{r:!1,w:!1,x:!1}),children:[e.jsx("strong",{children:"600"})," (Private Secret / Key)"]}),e.jsxs("button",{type:"button",className:`preset-btn danger ${y==="777"?"active":""}`,onClick:()=>h({r:!0,w:!0,x:!0},{r:!0,w:!0,x:!0},{r:!0,w:!0,x:!0}),children:[e.jsx("strong",{children:"777"})," (Full Access - Insecure!)"]})]})]}),e.jsxs("div",{className:"perm-terminal-simulator",children:[e.jsxs("div",{className:"terminal-header",children:[e.jsxs("div",{className:"terminal-dots",children:[e.jsx("span",{className:"dot red"}),e.jsx("span",{className:"dot yellow"}),e.jsx("span",{className:"dot green"})]}),e.jsx("span",{className:"terminal-title",children:"Terminal Execution Test: ~/robotics_lab/scripts/sensor_diagnostics.sh"})]}),e.jsxs("div",{className:"terminal-body",children:[e.jsxs("div",{className:"terminal-line",children:[e.jsx("span",{className:"term-prompt",children:"student@nexus-amr:~/robotics_lab/scripts$"}),e.jsx("span",{className:"term-cmd",children:"ls -l sensor_diagnostics.sh"})]}),e.jsxs("div",{className:"terminal-output ls-output",children:[e.jsx("span",{style:{color:"#38bdf8"},children:C})," 1 student student 1420 Oct 14 10:00 sensor_diagnostics.sh"]}),e.jsxs("div",{className:"terminal-line",style:{marginTop:"8px"},children:[e.jsx("span",{className:"term-prompt",children:"student@nexus-amr:~/robotics_lab/scripts$"}),e.jsx("span",{className:"term-cmd",children:"./sensor_diagnostics.sh"})]}),a.x?e.jsxs("div",{className:"terminal-output exec-success",children:[e.jsxs("div",{className:"status-badge-row",children:[e.jsx(V,{size:16,className:"text-success"}),e.jsx("strong",{className:"text-success",children:"[EXECUTION GRANTED - Exit Code 0]"})]}),e.jsxs("p",{className:"output-msg",children:["==========================================",e.jsx("br",{}),"      ROBOT SENSOR PRE-FLIGHT CHECK",e.jsx("br",{}),"==========================================",e.jsx("br",{}),"All host AMR motor controllers and LiDAR sensors operating normally!"]})]}):e.jsxs("div",{className:"terminal-output exec-denied",children:[e.jsxs("div",{className:"status-badge-row",children:[e.jsx(Oe,{size:16,className:"text-danger"}),e.jsx("strong",{className:"text-danger",children:"bash: ./sensor_diagnostics.sh: Permission denied (Exit Code 126)"})]}),e.jsxs("p",{className:"output-tip",children:["💡 ",e.jsx("strong",{children:"Why this happens:"})," The Owner Execute bit (",e.jsx("code",{children:"x"}),") is unchecked! Linux blocks script execution to protect the system. Run ",e.jsx("code",{children:"chmod +x sensor_diagnostics.sh"})," (or toggle Execute above) to fix this."]})]})]})]})]})}function Ts(){const s=r.useRef(null),[t,a]=r.useState("auto"),[p,c]=r.useState(!0),[A,S]=r.useState(2),[E,k]=r.useState(1.8),[x,f]=r.useState(null),[T,d]=r.useState(42),[o,l]=r.useState("CIRCULAR_DRIVE"),y=r.useRef({x:180,y:120,theta:0,trail:[]}),b=()=>{y.current={x:180,y:120,theta:0,trail:[]},S(0),k(0),l("POSE_RESET")},C=()=>{y.current.trail=[],l("INK_CLEARED")};r.useEffect(()=>{const m=_=>{let v=null,g=0,u=0;if(_.key==="ArrowUp"?(v="UP",g=2,u=0):_.key==="ArrowDown"?(v="DOWN",g=-2,u=0):_.key==="ArrowLeft"?(v="LEFT",g=0,u=2.2):_.key==="ArrowRight"&&(v="RIGHT",g=0,u=-2.2),v){_.preventDefault(),a("manual"),f(v),S(g),k(u),d(w=>w+1),l(`KEY_${v}`);const i=y.current,n=.18;i.theta+=u*n,i.x+=g*Math.cos(i.theta)*12,i.y+=g*Math.sin(i.theta)*12,i.x=Math.max(20,Math.min(340,i.x)),i.y=Math.max(20,Math.min(220,i.y)),i.trail.push({x:i.x,y:i.y}),i.trail.length>300&&i.trail.shift()}},h=_=>{["ArrowUp","ArrowDown","ArrowLeft","ArrowRight"].includes(_.key)&&f(null)};return window.addEventListener("keydown",m),window.addEventListener("keyup",h),()=>{window.removeEventListener("keydown",m),window.removeEventListener("keyup",h)}},[]);const z=m=>{a("manual");let h=0,_=0;m==="UP"?(h=2,_=0):m==="DOWN"?(h=-2,_=0):m==="LEFT"?(h=0,_=2.2):m==="RIGHT"&&(h=0,_=-2.2),f(m),S(h),k(_),d(u=>u+1),l(`BUTTON_${m}`);const v=y.current,g=.22;v.theta+=_*g,v.x+=h*Math.cos(v.theta)*14,v.y+=h*Math.sin(v.theta)*14,v.x=Math.max(20,Math.min(340,v.x)),v.y=Math.max(20,Math.min(220,v.y)),v.trail.push({x:v.x,y:v.y}),v.trail.length>300&&v.trail.shift(),setTimeout(()=>f(null),250)};return r.useEffect(()=>{let m,h=performance.now();const _=v=>{const g=(v-h)/1e3;if(h=v,t==="auto"&&p){const i=y.current,n=1.6,w=Math.sin(v*.0018)*2.2;S(n),k(Number(w.toFixed(2))),l("AUTO_PATROL"),i.theta+=w*g,i.x+=n*Math.cos(i.theta)*35*g,i.y+=n*Math.sin(i.theta)*35*g,i.x<15&&(i.x=345),i.x>345&&(i.x=15),i.y<15&&(i.y=225),i.y>225&&(i.y=15),i.trail.push({x:i.x,y:i.y}),i.trail.length>250&&i.trail.shift(),Math.random()<.2&&d(R=>R+1)}const u=s.current;if(u){const i=u.getContext("2d"),n=u.width,w=u.height;i.fillStyle="#0f172a",i.fillRect(0,0,n,w),i.strokeStyle="rgba(255, 255, 255, 0.04)",i.lineWidth=1;for(let N=0;N<n;N+=30)i.beginPath(),i.moveTo(N,0),i.lineTo(N,w),i.stroke();for(let N=0;N<w;N+=30)i.beginPath(),i.moveTo(0,N),i.lineTo(n,N),i.stroke();const R=y.current;if(R.trail.length>1){i.beginPath(),i.moveTo(R.trail[0].x,R.trail[0].y);for(let N=1;N<R.trail.length;N++)i.lineTo(R.trail[N].x,R.trail[N].y);i.strokeStyle="#38bdf8",i.lineWidth=3.5,i.lineCap="round",i.lineJoin="round",i.shadowColor="rgba(56, 189, 248, 0.6)",i.shadowBlur=8,i.stroke(),i.shadowBlur=0}i.save(),i.translate(R.x,R.y),i.rotate(R.theta),i.beginPath(),i.arc(0,0,14,0,Math.PI*2),i.fillStyle="rgba(16, 185, 129, 0.2)",i.fill(),i.beginPath(),i.ellipse(0,0,12,10,0,0,Math.PI*2),i.fillStyle="#10b981",i.fill(),i.strokeStyle="#34d399",i.lineWidth=2,i.stroke(),i.beginPath(),i.arc(0,0,5,0,Math.PI*2),i.strokeStyle="rgba(255, 255, 255, 0.4)",i.stroke(),i.beginPath(),i.arc(12,0,5,0,Math.PI*2),i.fillStyle="#34d399",i.fill(),i.beginPath(),i.moveTo(14,0),i.lineTo(24,0),i.strokeStyle="#f59e0b",i.lineWidth=2,i.stroke(),i.fillStyle="#059669",i.fillRect(4,-13,6,4),i.fillRect(4,9,6,4),i.fillRect(-10,-12,5,3),i.fillRect(-10,9,5,3),i.restore()}m=requestAnimationFrame(_)};return m=requestAnimationFrame(_),()=>cancelAnimationFrame(m)},[t,p]),e.jsxs("div",{className:"turtlesim-flow-container",children:[e.jsxs("div",{className:"turtlesim-flow-header",children:[e.jsxs("div",{className:"flow-header-left",children:[e.jsxs("div",{className:"flow-status-pill",children:[e.jsx("span",{className:"flow-pulse-dot"}),e.jsx("strong",{children:"LIVE COMPUTATIONAL GRAPH"})]}),e.jsx("h3",{className:"flow-title",children:"ROS 2 Peer-to-Peer DDS Runtime Pipeline"}),e.jsxs("p",{className:"flow-subtitle",children:["Observe velocity packets emitted from ",e.jsx("code",{className:"inline-code",children:"turtle_teleop_key"})," to ",e.jsx("code",{className:"inline-code",children:"turtlesim_node"})," over ",e.jsx("code",{className:"inline-code",children:"/turtle1/cmd_vel"}),"."]})]}),e.jsxs("div",{className:"flow-header-controls",children:[e.jsxs("button",{onClick:()=>a(t==="auto"?"manual":"auto"),className:`flow-ctrl-btn ${t==="auto"?"active-auto":""}`,title:"Toggle between Auto-Pilot Demo and Interactive Keyboard Mode",children:[e.jsx(qe,{size:14}),e.jsx("span",{children:t==="auto"?"Auto Demo Active":"Manual Mode"})]}),t==="auto"&&e.jsx("button",{onClick:()=>c(!p),className:"flow-ctrl-btn",title:p?"Pause auto demo":"Resume auto demo",children:p?e.jsx(pt,{size:14}):e.jsx(Ue,{size:14})}),e.jsxs("button",{onClick:C,className:"flow-ctrl-btn",title:"Clear canvas ink trail (ros2 service call /clear)",children:[e.jsx(ma,{size:14}),e.jsx("span",{children:"Clear Ink"})]}),e.jsxs("button",{onClick:b,className:"flow-ctrl-btn",title:"Reset turtle pose (ros2 service call /reset)",children:[e.jsx(Z,{size:14}),e.jsx("span",{children:"Reset"})]})]})]}),e.jsxs("div",{className:"turtlesim-diagram-grid",children:[e.jsxs("div",{className:"flow-node-card publisher-card",children:[e.jsxs("div",{className:"node-card-badge publisher-badge",children:[e.jsx(xe,{size:14}),e.jsx("span",{children:"PUBLISHER NODE"})]}),e.jsx("h4",{className:"node-name",children:"/teleop_turtle"}),e.jsx("span",{className:"node-exec-label",children:"ros2 run turtlesim turtle_teleop_key"}),e.jsxs("div",{className:"teleop-arrow-pad-container",children:[e.jsx("div",{className:"teleop-pad-label",children:"Arrow Keys Input Teleoperation:"}),e.jsxs("div",{className:"teleop-pad-grid",children:[e.jsx("div",{}),e.jsx("button",{className:`pad-btn ${x==="UP"?"active":""}`,onClick:()=>z("UP"),title:"Forward (+Linear X)",children:e.jsx(Ss,{size:16})}),e.jsx("div",{}),e.jsx("button",{className:`pad-btn ${x==="LEFT"?"active":""}`,onClick:()=>z("LEFT"),title:"Turn Left (+Angular Z)",children:e.jsx(Re,{size:16})}),e.jsx("button",{className:`pad-btn ${x==="DOWN"?"active":""}`,onClick:()=>z("DOWN"),title:"Backward (-Linear X)",children:e.jsx(Ns,{size:16})}),e.jsx("button",{className:`pad-btn ${x==="RIGHT"?"active":""}`,onClick:()=>z("RIGHT"),title:"Turn Right (-Angular Z)",children:e.jsx(ge,{size:16})})]}),e.jsx("div",{className:"key-hint",children:"💡 Use onscreen buttons or your physical arrow keys"})]}),e.jsxs("div",{className:"node-status-row",children:[e.jsx("span",{className:"status-indicator publishing"}),e.jsxs("span",{children:["Publishing ",e.jsx("strong",{style:{color:"#c084fc"},children:"geometry_msgs/msg/Twist"})]})]})]}),e.jsxs("div",{className:"flow-topic-connector",children:[e.jsxs("div",{className:"topic-header-pill",children:[e.jsx(pe,{size:13,className:"radio-pulse-icon"}),e.jsx("span",{children:"ROS 2 TOPIC"})]}),e.jsx("div",{className:"topic-pipe-container",children:e.jsxs("div",{className:"topic-pipe-track",children:[e.jsx("div",{className:"pipe-packet packet-1",children:e.jsx("span",{children:"Twist"})}),e.jsx("div",{className:"pipe-packet packet-2",children:e.jsx("span",{children:"Twist"})}),e.jsx("div",{className:"pipe-packet packet-3",children:e.jsx("span",{children:"Twist"})})]})}),e.jsxs("div",{className:"topic-metadata-card",children:[e.jsxs("div",{className:"topic-name-row",children:[e.jsx("strong",{className:"topic-name",children:"/turtle1/cmd_vel"}),e.jsx("span",{className:"topic-type-tag",children:"Twist"})]}),e.jsxs("div",{className:"topic-telemetry-box",children:[e.jsxs("div",{className:"telemetry-line",children:[e.jsx("span",{className:"telemetry-label",children:"linear.x:"}),e.jsxs("span",{className:"telemetry-val linear",children:[A>0?`+${A.toFixed(1)}`:A.toFixed(1)," m/s"]})]}),e.jsxs("div",{className:"telemetry-line",children:[e.jsx("span",{className:"telemetry-label",children:"angular.z:"}),e.jsxs("span",{className:"telemetry-val angular",children:[E>0?`+${E.toFixed(1)}`:E.toFixed(1)," rad/s"]})]}),e.jsxs("div",{className:"telemetry-line sub-line",children:[e.jsx("span",{className:"telemetry-label",children:"rate:"}),e.jsx("span",{className:"telemetry-rate",children:"~10.0 Hz"})]})]}),e.jsxs("div",{className:"topic-packet-counter",children:[e.jsxs("span",{children:["Transmitted: ",e.jsx("strong",{children:T})," msgs"]}),e.jsx("span",{className:"status-live",children:"DDS OK"})]})]})]}),e.jsxs("div",{className:"flow-node-card subscriber-card",children:[e.jsxs("div",{className:"node-card-badge subscriber-badge",children:[e.jsx(V,{size:14}),e.jsx("span",{children:"SUBSCRIBER & SIMULATOR"})]}),e.jsx("h4",{className:"node-name",children:"/turtlesim"}),e.jsx("span",{className:"node-exec-label",children:"ros2 run turtlesim turtlesim_node"}),e.jsxs("div",{className:"turtlesim-canvas-wrapper",children:[e.jsx("canvas",{ref:s,width:360,height:220,className:"turtlesim-canvas"}),e.jsx("div",{className:"canvas-watermark",children:"Qt5 Canvas • /turtle1/pose"})]}),e.jsxs("div",{className:"canvas-pose-telemetry",children:[e.jsxs("span",{children:["x: ",e.jsx("strong",{children:(y.current.x/32).toFixed(2)})]}),e.jsxs("span",{children:["y: ",e.jsx("strong",{children:(y.current.y/32).toFixed(2)})]}),e.jsxs("span",{children:["theta: ",e.jsxs("strong",{children:[y.current.theta.toFixed(2)," rad"]})]})]})]})]}),e.jsxs("div",{className:"flow-cli-introspection-bar",children:[e.jsx("span",{className:"cli-badge",children:"CLI VERIFICATION:"}),e.jsx("code",{className:"cli-command",children:"ros2 node info /turtlesim"}),e.jsx("span",{className:"cli-sep",children:"→"}),e.jsxs("span",{className:"cli-result",children:["Subscribers: ",e.jsx("strong",{style:{color:"#38bdf8"},children:"/turtle1/cmd_vel [geometry_msgs/msg/Twist]"})]})]})]})}function As(){const[s,t]=r.useState("setup_py"),[a,p]=r.useState(0),[c,A]=r.useState(null),S=(T,d)=>{navigator.clipboard.writeText(T),A(d),setTimeout(()=>A(null),2e3)},E=()=>{p(T=>T>=4?0:T+1)},k=[{id:"package_xml",name:"package.xml",path:"nexus_amr_controller/package.xml",title:"Package Manifest & Dependency Declarations",badge:"Format 3 XML",badgeColor:"#f59e0b",badgeBg:"rgba(245, 158, 11, 0.12)",borderAccent:"#f59e0b",icon:ga,summary:"Declares package name, version, licensing, and all runtime & build dependencies.",purpose:"Parsed by colcon, rosdep, and package indexing tools to resolve dependency graphs.",commonPitfall:'Forgetting to add an <exec_depend> (e.g. geometry_msgs) will cause your node to crash at runtime with "ModuleNotFoundError" on other machines.',code:`<?xml version="1.0"?>
<?xml-model href="http://download.ros.org/schema/package_format3.xsd" schematypens="http://www.w3.org/2001/XMLSchema"?>
<package format="3">
  <name>nexus_amr_controller</name>
  <version>0.1.0</version>
  <description>Autonomous Mobile Robot Motor Controller</description>
  <maintainer email="student@botforge.io">Nexus AMR Engineer</maintainer>
  <license>Apache-2.0</license>

  <!-- Build Tool Dependency: Required for Python packages -->
  <buildtool_depend>ament_python</buildtool_depend>

  <!-- Runtime Execution Dependencies -->
  <exec_depend>rclpy</exec_depend>
  <exec_depend>geometry_msgs</exec_depend>

  <!-- Test Dependencies -->
  <test_depend>ament_copyright</test_depend>
  <test_depend>ament_flake8</test_depend>
  <test_depend>ament_pep257</test_depend>
  <test_depend>python3-pytest</test_depend>

  <export>
    <build_type>ament_python</build_type>
  </export>
</package>`,codeLang:"xml"},{id:"setup_py",name:"setup.py",path:"nexus_amr_controller/setup.py",title:"Python Build Script & Console Scripts",badge:"Build Engine",badgeColor:"#38bdf8",badgeBg:"rgba(56, 189, 248, 0.12)",borderAccent:"#38bdf8",icon:ue,summary:"Configures setuptools distribution and maps CLI command names to Python entry points.",purpose:"The entry_points dictionary generates the executable binary placed in install/lib/nexus_amr_controller/.",commonPitfall:`Typo in entry_points ("node_name = pkg.module:main") produces "Package doesn't have the executable" error when running ros2 run.`,code:`from setuptools import find_packages, setup

package_name = 'nexus_amr_controller'

setup(
    name=package_name,
    version='0.1.0',
    packages=find_packages(exclude=['test']),
    data_files=[
        # Registers package with the Ament Index
        ('share/ament_index/resource_index/packages',
            ['resource/' + package_name]),
        # Installs package.xml to share/nexus_amr_controller/
        ('share/' + package_name, ['package.xml']),
    ],
    install_requires=['setuptools'],
    zip_safe=True,
    maintainer='Nexus AMR Engineer',
    maintainer_email='student@botforge.io',
    description='Autonomous Mobile Robot Motor Controller',
    license='Apache-2.0',
    tests_require=['pytest'],
    entry_points={
        'console_scripts': [
            # CLI Command Name = Python Module Path : Function
            'motor_driver = nexus_amr_controller.motor_driver:main',
        ],
    },
)`,codeLang:"python"},{id:"setup_cfg",name:"setup.cfg",path:"nexus_amr_controller/setup.cfg",title:"Script Destination Configuration",badge:"Executable Routing",badgeColor:"#10b981",badgeBg:"rgba(16, 185, 129, 0.12)",borderAccent:"#10b981",icon:_e,summary:"Forces setuptools to install executables into lib/nexus_amr_controller/ rather than global bin/.",purpose:"Enforces ROS 2 package isolation, preventing script name collisions between different packages.",commonPitfall:"Removing or corrupting setup.cfg causes colcon to install binaries into standard bin/, which breaks ros2 run resolution.",code:`[develop]
script_dir=$base/lib/nexus_amr_controller
[install]
install_scripts=$base/lib/nexus_amr_controller`,codeLang:"ini"},{id:"resource",name:"resource/nexus_amr_controller",path:"nexus_amr_controller/resource/nexus_amr_controller",title:"Ament Index Discovery Marker",badge:"Discovery Marker",badgeColor:"#c084fc",badgeBg:"rgba(192, 132, 252, 0.12)",borderAccent:"#c084fc",icon:he,summary:"An empty marker file matching the exact package name.",purpose:"Provides the token required by the Ament Index. Without it, ros2 pkg list and ros2 run will fail to discover the package.",commonPitfall:"Deleting the resource/ folder makes the package invisible to the ROS 2 ecosystem even after a successful colcon build!",code:`# An empty marker file placed inside the resource/ directory.
# Filename MUST match the package name exactly:
# resource/nexus_amr_controller

# When built, colcon installs this file into:
# install/share/ament_index/resource_index/packages/nexus_amr_controller
# This allows ROS 2 CLI commands to discover the package instantly!`,codeLang:"bash"},{id:"module_dir",name:"nexus_amr_controller/",path:"nexus_amr_controller/nexus_amr_controller/",title:"Python Package Module & Node Scripts",badge:"Node Code",badgeColor:"#0ea5e9",badgeBg:"rgba(14, 165, 233, 0.12)",borderAccent:"#0ea5e9",icon:ua,summary:"The importable Python module containing __init__.py and your custom ROS 2 Node classes.",purpose:"Where the actual robotics behavior, publisher callbacks, and subscriber logic are implemented.",commonPitfall:"Forgetting __init__.py prevents Python from recognizing this folder as a module, breaking module imports.",code:`import rclpy
from rclpy.node import Node
from geometry_msgs.msg import Twist

class MotorDriverNode(Node):
    def __init__(self):
        super().__init__('motor_driver_node')
        self.subscription = self.create_subscription(
            Twist,
            '/cmd_vel',
            self.cmd_vel_callback,
            10
        )
        self.get_logger().info('Nexus AMR Motor Driver node initialized!')

    def cmd_vel_callback(self, msg):
        self.get_logger().info(f'Linear: {msg.linear.x}, Angular: {msg.angular.z}')

def main(args=None):
    rclpy.init(args=args)
    node = MotorDriverNode()
    rclpy.spin(node)
    node.destroy_node()
    rclpy.shutdown()

if __name__ == '__main__':
    main()`,codeLang:"python"}],x=k.find(T=>T.id===s)||k[0],f=[{num:1,targetFile:"resource",title:"1. Ament Index Query",desc:"ros2 run queries resource_index/packages to verify nexus_amr_controller is installed."},{num:2,targetFile:"setup_cfg",title:"2. Path Resolution via setup.cfg",desc:"Checks setup.cfg to locate the package executable prefix in install/lib/nexus_amr_controller/."},{num:3,targetFile:"setup_py",title:"3. Entry Point Mapping in setup.py",desc:'Matches "motor_driver" to nexus_amr_controller.motor_driver:main in console_scripts.'},{num:4,targetFile:"module_dir",title:"4. Module Execution in Python",desc:"Imports MotorDriverNode, initializes rclpy, spins the node, and connects to the ROS graph!"}];return e.jsxs("div",{className:"package-structure-infographic",style:{background:"var(--bg-surface)",border:"1px solid var(--border-color)",borderRadius:"16px",padding:"0.85rem 1.15rem",margin:"0",boxShadow:"0 8px 30px rgba(0, 0, 0, 0.15)",position:"relative",overflow:"hidden"},children:[e.jsxs("div",{style:{display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:"12px",marginBottom:"0.75rem",paddingBottom:"0.65rem",borderBottom:"1px solid var(--border-color)"},children:[e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"12px"},children:[e.jsx("div",{style:{width:36,height:36,borderRadius:"10px",background:"linear-gradient(135deg, rgba(245, 158, 11, 0.2) 0%, rgba(56, 189, 248, 0.15) 100%)",border:"1px solid rgba(245, 158, 11, 0.35)",display:"flex",alignItems:"center",justifyContent:"center",color:"#f59e0b"},children:e.jsx(rs,{size:18})}),e.jsxs("div",{children:[e.jsxs("h3",{style:{margin:0,fontSize:"1.1rem",fontWeight:800,color:"var(--text-primary)"},children:["Anatomy of an ",e.jsx("code",{style:{color:"#38bdf8"},children:"ament_python"})," Package"]}),e.jsx("span",{style:{fontSize:"0.8rem",color:"var(--text-secondary)"},children:"The 5 essential components that transform a directory into a functional ROS 2 package"})]})]}),e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"8px"},children:[e.jsxs("button",{onClick:E,style:{display:"flex",alignItems:"center",gap:"6px",background:a>0?"linear-gradient(135deg, #0284c7 0%, #0369a1 100%)":"var(--bg-card, #0f172a)",color:a>0?"#ffffff":"var(--text-primary)",border:a>0?"1px solid #38bdf8":"1px solid var(--border-color)",borderRadius:"8px",padding:"5px 11px",fontSize:"0.78rem",fontWeight:700,cursor:"pointer",boxShadow:a>0?"0 2px 8px rgba(2, 132, 199, 0.35)":"none",transition:"all 0.2s"},children:[e.jsx(Ue,{size:12,fill:a>0?"currentColor":"none"}),e.jsx("span",{children:a===0?"Trace ros2 run Execution":`Execution Step ${a}/4 (Next &rarr;)`})]}),a>0&&e.jsx("button",{onClick:()=>p(0),title:"Reset Trace",style:{display:"flex",alignItems:"center",justifyContent:"center",width:30,height:30,background:"var(--bg-primary)",color:"var(--text-secondary)",border:"1px solid var(--border-color)",borderRadius:"8px",cursor:"pointer"},children:e.jsx(Z,{size:12})})]})]}),a>0&&e.jsxs("div",{style:{background:"rgba(2, 132, 199, 0.1)",border:"1px solid rgba(56, 189, 248, 0.4)",borderRadius:"10px",padding:"0.85rem 1.25rem",marginBottom:"1.5rem",display:"flex",alignItems:"center",gap:"12px"},children:[e.jsx(he,{size:20,color:"#38bdf8",style:{flexShrink:0}}),e.jsxs("div",{children:[e.jsxs("div",{style:{fontSize:"0.85rem",fontWeight:800,color:"#38bdf8",marginBottom:"2px"},children:[f[a-1].title,": ",e.jsx("code",{style:{color:"#ffffff"},children:"ros2 run nexus_amr_controller motor_driver"})]}),e.jsx("div",{style:{fontSize:"0.8rem",color:"var(--text-secondary)"},children:f[a-1].desc})]})]}),e.jsxs("div",{style:{display:"grid",gridTemplateColumns:"minmax(280px, 1fr) minmax(360px, 1.4fr)",gap:"1.5rem",alignItems:"start"},children:[e.jsxs("div",{style:{background:"var(--bg-primary)",border:"1px solid var(--border-color)",borderRadius:"12px",padding:"1.25rem"},children:[e.jsxs("div",{style:{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:"1rem",paddingBottom:"0.5rem",borderBottom:"1px solid var(--border-color)"},children:[e.jsx("span",{style:{fontSize:"0.74rem",fontWeight:800,textTransform:"uppercase",letterSpacing:"0.05em",color:"#64748b"},children:"Package Hierarchy"}),e.jsx("span",{style:{fontSize:"0.72rem",color:"var(--text-muted)"},children:"Click to inspect"})]}),e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"8px",marginBottom:"0.75rem",paddingLeft:"4px"},children:[e.jsx(rs,{size:16,color:"#38bdf8"}),e.jsx("strong",{style:{fontSize:"0.95rem",color:"var(--text-primary)",fontFamily:"monospace"},children:"nexus_amr_controller/"})]}),e.jsx("div",{style:{display:"flex",flexDirection:"column",gap:"4px"},children:k.map(T=>{const d=s===T.id,o=a>0&&f[a-1].targetFile===T.id,l=T.icon;return e.jsxs("div",{onClick:()=>t(T.id),style:{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"6px 10px",borderRadius:"8px",background:d?"rgba(56, 189, 248, 0.1)":o?"rgba(245, 158, 11, 0.15)":"transparent",border:d?"1px solid #38bdf8":o?"1px solid #f59e0b":"1px solid transparent",cursor:"pointer",transition:"all 0.2s",position:"relative"},children:[e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"8px"},children:[e.jsx(l,{size:14,color:d?T.borderAccent:"var(--text-muted)"}),e.jsx("span",{style:{fontFamily:"monospace",fontSize:"0.82rem",fontWeight:d?700:500,color:d?T.borderAccent:"var(--text-primary)"},children:T.name})]}),e.jsx("span",{style:{fontSize:"0.64rem",fontWeight:700,padding:"2px 5px",borderRadius:"4px",background:T.badgeBg,color:T.badgeColor},children:T.badge})]},T.id)})}),e.jsxs("div",{style:{marginTop:"0.65rem",padding:"7px 10px",borderRadius:"8px",background:"var(--bg-canvas, rgba(16, 185, 129, 0.08))",border:"1px solid var(--border-color)",fontSize:"0.76rem",color:"var(--text-primary)",lineHeight:1.4},children:[e.jsx("strong",{style:{color:"#10b981"},children:"The Minimum Package Requirement:"}),e.jsx("br",{}),e.jsxs("span",{style:{color:"var(--text-secondary)"},children:["A ROS 2 Python package requires at least a ",e.jsx("code",{style:{color:"#f59e0b",fontWeight:600},children:"package.xml"})," and a ",e.jsx("code",{style:{color:"#38bdf8",fontWeight:600},children:"setup.py"})," file to be buildable by colcon."]})]})]}),e.jsxs("div",{style:{background:"#090d16",border:"1px solid var(--border-color)",borderRadius:"12px",overflow:"hidden"},children:[e.jsxs("div",{style:{padding:"0.65rem 1rem",background:"rgba(15, 23, 42, 0.8)",borderBottom:"1px solid var(--border-color)",display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:"8px"},children:[e.jsx("div",{style:{display:"flex",alignItems:"center",gap:"8px"},children:e.jsx("span",{style:{fontFamily:"monospace",fontSize:"0.84rem",fontWeight:800,color:x.borderAccent},children:x.path})}),e.jsxs("button",{onClick:()=>S(x.code,x.id),style:{display:"flex",alignItems:"center",gap:"4px",background:"rgba(255, 255, 255, 0.08)",border:"1px solid rgba(255, 255, 255, 0.15)",borderRadius:"6px",padding:"3px 7px",fontSize:"0.7rem",color:c===x.id?"#10b981":"#cbd5e1",cursor:"pointer"},children:[c===x.id?e.jsx(ve,{size:12}):e.jsx($e,{size:12}),e.jsx("span",{children:c===x.id?"Copied":"Copy Code"})]})]}),e.jsxs("div",{style:{padding:"0.65rem 1rem",borderBottom:"1px solid rgba(255, 255, 255, 0.08)",background:"rgba(15, 23, 42, 0.6)"},children:[e.jsx("div",{style:{fontSize:"0.88rem",fontWeight:700,color:"#f8fafc",marginBottom:"3px"},children:x.title}),e.jsx("div",{style:{fontSize:"0.78rem",color:"#cbd5e1",marginBottom:"6px",lineHeight:1.45},children:x.purpose}),e.jsxs("div",{style:{display:"flex",alignItems:"start",gap:"6px",padding:"6px 8px",borderRadius:"6px",background:"rgba(239, 68, 68, 0.12)",border:"1px solid rgba(239, 68, 68, 0.35)",fontSize:"0.74rem",color:"#fecaca",lineHeight:1.4},children:[e.jsx(dt,{size:14,color:"#ef4444",style:{flexShrink:0,marginTop:"2px"}}),e.jsxs("div",{children:[e.jsx("strong",{style:{color:"#f87171"},children:"Common Pitfall:"})," ",x.commonPitfall]})]})]}),e.jsx("div",{style:{padding:"0.75rem 1rem",overflowX:"auto",maxHeight:"185px"},children:e.jsx("pre",{style:{margin:0,fontFamily:'"JetBrains Mono", "Fira Code", monospace',fontSize:"0.78rem",lineHeight:1.6,color:"#e2e8f0"},children:e.jsx("code",{children:x.code})})})]})]})]})}const Ya="modulepreload",Qa=function(s,t){return new URL(s,t).href},gs={},us=function(t,a,p){let c=Promise.resolve();if(a&&a.length>0){let S=function(f){return Promise.all(f.map(T=>Promise.resolve(T).then(d=>({status:"fulfilled",value:d}),d=>({status:"rejected",reason:d}))))};const E=document.getElementsByTagName("link"),k=document.querySelector("meta[property=csp-nonce]"),x=(k==null?void 0:k.nonce)||(k==null?void 0:k.getAttribute("nonce"));c=S(a.map(f=>{if(f=Qa(f,p),f in gs)return;gs[f]=!0;const T=f.endsWith(".css"),d=T?'[rel="stylesheet"]':"";if(!!p)for(let y=E.length-1;y>=0;y--){const b=E[y];if(b.href===f&&(!T||b.rel==="stylesheet"))return}else if(document.querySelector(`link[href="${f}"]${d}`))return;const l=document.createElement("link");if(l.rel=T?"stylesheet":Ya,T||(l.as="script"),l.crossOrigin="",l.href=f,x&&l.setAttribute("nonce",x),document.head.appendChild(l),T)return new Promise((y,b)=>{l.addEventListener("load",y),l.addEventListener("error",()=>b(new Error(`Unable to preload CSS for ${f}`)))})}))}function A(S){const E=new Event("vite:preloadError",{cancelable:!0});if(E.payload=S,window.dispatchEvent(E),!E.defaultPrevented)throw S}return c.then(S=>{for(const E of S||[])E.status==="rejected"&&A(E.reason);return t().catch(A)})},zt={lesson_02:We.lazy(()=>us(()=>import("./Ros2ArchitectureInteractive-7BjQah9b.js"),__vite__mapDeps([0,1,2]),import.meta.url).then(s=>({default:s.Ros2ArchitectureInteractive}))),lesson_03:We.lazy(()=>us(()=>import("./Lesson03-Ba1aJpQv.js"),__vite__mapDeps([3,1,2,4]),import.meta.url))};function Ps(){const[s,t]=r.useState(!0),[a,p]=r.useState(2),[c,A]=r.useState(1),[S,E]=r.useState(1),[k,x]=r.useState(1.82),[f,T]=r.useState(null),[d,o]=r.useState(!1),[l,y]=r.useState(!1),[b,C]=r.useState(!1),[z,m]=r.useState(null),[h,_]=r.useState(null),[v,g]=r.useState("default"),[u,i]=r.useState([{id:1,val:1.81,text:"1.81 m",isHazard:!1,speedSec:1.3}]),n=r.useRef(2),w=r.useRef(new Set([1])),R=r.useRef([]),N=r.useRef(.5),D=r.useRef(null),I=.5,M=r.useCallback(B=>{if(f!==null)return f;const Q=2*Math.PI/10,H=1.45+1.15*Math.sin(Q*B);return Math.max(.2,parseFloat(H.toFixed(2)))},[f]),$=r.useCallback(B=>{w.current.has(B.id)||(w.current.add(B.id),x(B.val),E(Q=>Q+1),y(!0),C(!0),setTimeout(()=>y(!1),280),setTimeout(()=>C(!1),380),i(Q=>Q.filter(H=>H.id!==B.id)))},[]),L=r.useCallback((B=null)=>{const Q=n.current++,H=performance.now();if(D.current!==null&&s){const ee=Math.max(0,Math.min((H-D.current)/1e3,3));N.current+=ee,D.current=H}else N.current+=1/a,s&&(D.current=H);const Ae=B!==null?B:M(N.current),mt=Ae<I,Pe=`${Ae.toFixed(2)} m`,He=1.3;A(Q),o(!0),setTimeout(()=>o(!1),180);const Ke={id:Q,val:Ae,text:Pe,isHazard:mt,speedSec:He};i(ee=>[...ee,Ke]);const De=setTimeout(()=>{$(Ke)},He*1e3);R.current.push(De)},[s,a,M,$]),j=()=>{L()},P=()=>{T(.35),L(.35)},G=()=>{T(2.1),L(2.1)},O=()=>{R.current.forEach(clearTimeout),R.current=[],w.current=new Set([1]),n.current=2,N.current=.5,D.current=null,A(1),E(1),x(1.81),T(null),i([{id:1,val:1.81,text:"1.81 m",isHazard:!1,speedSec:1.3}]),t(!1),m(null),_(null)};r.useEffect(()=>{s?D.current=performance.now():D.current=null},[s]),r.useEffect(()=>{if(!s||z!==null)return;D.current=performance.now();const B=Math.max(100,Math.round(1e3/a)),Q=setInterval(()=>{L()},B);return()=>clearInterval(Q)},[s,a,z,L]),r.useEffect(()=>()=>{R.current.forEach(clearTimeout)},[]);const F=k<I,U=Math.min(100,Math.max(5,k/3*100)),J=[{num:1,title:"1. Ultrasonic Sensor Publisher Node",desc:"Node inherits from rclpy.node.Node and calls self.create_publisher(Float32, '/sensor/ultrasonic_front', 10). A non-blocking wall timer periodically reads hardware and broadcasts distance telemetry.",target:"pub"},{num:2,title:"2. The Sensor Topic Bus & DDS Layer",desc:"Topic '/sensor/ultrasonic_front' acts as an anonymous, strongly-typed range bus. Underneath, DDS middleware handles peer discovery and transport contracts without hardcoding IP addresses.",target:"topic"},{num:3,title:"3. Collision Safety Supervisor & Callback",desc:"Node creates a subscription with self.create_subscription(Float32, '/sensor/ultrasonic_front', callback, 10). The executor immediately runs the callback to evaluate obstacle distance against the 0.50m threshold.",target:"sub"},{num:4,title:"4. Live Telemetry & Active Collision Avoidance",desc:"Distance telemetry streams continuously across nodes. If an obstacle breaches the 0.50m buffer, the safety monitor immediately detects the hazard and triggers simulated emergency braking.",target:"all"}];return e.jsxs("div",{className:"pubsub-flow-container",children:[e.jsxs("div",{className:"pubsub-flow-header",children:[e.jsxs("div",{className:"header-title-row",children:[e.jsxs("div",{className:"badge-pill",children:[e.jsx(pe,{size:14,className:"text-cyan animate-pulse"}),e.jsx("span",{children:"Interactive Architecture & Data Flow"})]}),e.jsx("span",{className:"ros-version-tag",children:"ROS 2 Jazzy · DDS Architecture"})]}),e.jsxs("p",{className:"pubsub-flow-subtitle",children:["Observe how the Ultrasonic Rangefinder and Collision Safety Supervisor exchange real-time distance telemetry across the ",e.jsx("code",{className:"inline-code",children:"/sensor/ultrasonic_front"})," topic."]})]}),e.jsxs("div",{className:"walkthrough-bar",children:[e.jsxs("span",{className:"walkthrough-label",children:[e.jsx(_e,{size:14})," Guided Reveal:"]}),e.jsxs("div",{className:"walkthrough-buttons",children:[e.jsx("button",{className:`walkthrough-step-btn ${z===null?"active":""}`,onClick:()=>{m(null),_(null),t(!0)},children:"All Live"}),J.map(B=>e.jsxs("button",{className:`walkthrough-step-btn ${z===B.num?"active":""}`,onClick:()=>{m(B.num),_(B.target==="all"?null:B.target),t(B.num===4)},children:["Step ",B.num]},B.num))]})]}),z!==null&&e.jsxs("div",{className:"active-step-banner animate-fade-in",children:[e.jsxs("div",{className:"banner-badge",children:["Step ",z," of 4"]}),e.jsxs("div",{className:"banner-content",children:[e.jsx("h4",{children:J[z-1].title}),e.jsx("p",{children:J[z-1].desc})]})]}),e.jsxs("div",{className:"diagram-stage",children:[e.jsxs("div",{className:`diagram-card publisher-card ${d?"pulse-border":""} ${h==="pub"||z===1||z===4||z===null?"focused":"dimmed"}`,onClick:()=>_("pub"),children:[e.jsxs("div",{className:"card-top",children:[e.jsx("div",{className:"node-icon-wrapper pub-icon",children:e.jsx(ue,{size:18})}),e.jsxs("div",{className:"node-title-group",children:[e.jsx("div",{className:"node-role-tag",children:"PUBLISHER NODE"}),e.jsx("h3",{className:"node-name",title:"ultrasonic_sensor_node",children:"ultrasonic_sensor_node"}),e.jsx("div",{className:"node-class",children:"UltrasonicSensorPublisher"})]}),e.jsx("div",{className:`status-dot ${s?"online":"paused"}`,title:s?"Publishing Active":"Paused"})]}),e.jsxs("div",{className:"card-code-snip",children:[e.jsx("span",{className:"code-fn",children:"create_publisher"}),e.jsx("span",{className:"code-args",children:"(Float32, '/sensor/ultrasonic_front', 10)"})]}),e.jsxs("div",{className:"card-telemetry pub-telemetry",children:[e.jsxs("div",{className:"telemetry-item",children:[e.jsx("span",{className:"telemetry-label",children:"Rate"}),e.jsxs("span",{className:"telemetry-val text-cyan",children:[a," Hz"]})]}),e.jsxs("div",{className:"telemetry-item",children:[e.jsx("span",{className:"telemetry-label",children:"Sent"}),e.jsxs("span",{className:"telemetry-val text-amber",children:["#",c]})]}),e.jsxs("div",{className:"telemetry-item cb-telemetry-item",children:[e.jsx("span",{className:"telemetry-label",children:"Callback"}),e.jsx("span",{className:"telemetry-val text-green cb-name",title:"timer_callback",children:"timer_cb"})]})]}),e.jsxs("button",{className:"card-action-btn",onClick:B=>{B.stopPropagation(),j()},title:"Publish one distance measurement immediately",children:[e.jsx(ce,{size:13}),e.jsx("span",{children:"Publish 1 Measurement"})]})]}),e.jsxs("div",{className:`diagram-pipeline ${h==="topic"||h==="dds"||z===2||z===4||z===null?"focused":"dimmed"}`,onClick:()=>_("topic"),children:[e.jsxs("div",{className:"topic-badge",children:[e.jsx(pe,{size:14,className:"text-cyan animate-pulse"}),e.jsxs("span",{className:"topic-name",children:["Topic: ",e.jsx("strong",{children:"/sensor/ultrasonic_front"})]}),e.jsx("span",{className:"topic-type",children:"Float32"})]}),e.jsxs("div",{className:"pipe-svg-wrapper",children:[e.jsxs("svg",{viewBox:"0 0 360 48",className:"pipe-svg",preserveAspectRatio:"none",children:[e.jsxs("defs",{children:[e.jsxs("linearGradient",{id:"pipeGrad",x1:"0%",y1:"0%",x2:"100%",y2:"0%",children:[e.jsx("stop",{offset:"0%",stopColor:"#38bdf8",stopOpacity:"0.8"}),e.jsx("stop",{offset:"50%",stopColor:"#a855f7",stopOpacity:"0.9"}),e.jsx("stop",{offset:"100%",stopColor:"#22c55e",stopOpacity:"0.8"})]}),e.jsxs("filter",{id:"glow",x:"-20%",y:"-20%",width:"140%",height:"140%",children:[e.jsx("feGaussianBlur",{stdDeviation:"3",result:"blur"}),e.jsx("feComposite",{in:"SourceGraphic",in2:"blur",operator:"over"})]})]}),e.jsx("line",{x1:"10",y1:"24",x2:"350",y2:"24",stroke:"#1e293b",strokeWidth:"6",strokeLinecap:"round"}),e.jsx("line",{x1:"10",y1:"24",x2:"350",y2:"24",stroke:"url(#pipeGrad)",strokeWidth:"3.5",strokeDasharray:"8 8",strokeLinecap:"round",className:`pipeline-dash ${s?"flowing":""}`}),e.jsx("polygon",{points:"346,18 358,24 346,30",fill:"#22c55e"})]}),e.jsx("div",{className:`packet-track ${s?"":"paused"}`,children:u.map(B=>e.jsx("div",{className:`sliding-packet ${s?"":"paused"}`,style:{animationDuration:`${B.speedSec||1.3}s`},onAnimationEnd:()=>$(B),children:e.jsxs("span",{className:`packet-pill ${B.isHazard?"hazard-packet":""}`,children:[e.jsx(Ve,{size:11,className:"packet-spark"}),e.jsx("span",{children:B.text})]})},B.id))})]}),e.jsxs("div",{className:"dds-layer-box",onClick:B=>{B.stopPropagation(),_("dds")},children:[e.jsxs("div",{className:"dds-title-row",children:[e.jsx("span",{className:"dds-title",children:"DDS Layer"}),e.jsxs("span",{className:"qos-badge",children:[e.jsx(Cs,{size:12})," QoS: ",v==="default"?"RELIABLE":"BEST_EFFORT"]})]}),e.jsxs("div",{className:"dds-metrics",children:[e.jsx("span",{children:"Depth: 10"}),e.jsx("span",{children:"·"}),e.jsx("span",{children:"RTPS Multicast"}),e.jsx("span",{children:"·"}),e.jsx("span",{children:"CycloneDDS"})]})]})]}),e.jsxs("div",{className:`diagram-card subscriber-card ${F?"hazard-active-card":""} ${l?F?"pulse-border-hazard":"pulse-border-green":""} ${h==="sub"||z===3||z===4||z===null?"focused":"dimmed"}`,onClick:()=>_("sub"),children:[e.jsxs("div",{className:"card-top",children:[e.jsx("div",{className:`node-icon-wrapper ${F?"hazard-icon":"sub-icon"}`,children:F?e.jsx(dt,{size:18,className:"text-red animate-bounce"}):e.jsx(xe,{size:18})}),e.jsxs("div",{className:"node-title-group",children:[e.jsx("div",{className:"node-role-tag",children:"SUBSCRIBER NODE"}),e.jsx("h3",{className:"node-name",title:"collision_monitor_node",children:"collision_monitor_node"}),e.jsx("div",{className:"node-class",children:"CollisionSafetySubscriber"})]}),e.jsx("div",{className:`status-dot ${F?"alert":s?"online":"paused"}`,title:F?"EMERGENCY BRAKE ACTIVE":"Monitoring Active"})]}),e.jsxs("div",{className:"card-code-snip sub-snip",children:[e.jsx("span",{className:"code-fn",children:"create_subscription"}),e.jsx("span",{className:"code-args",children:"(Float32, '/sensor/ultrasonic_front', cb, 10)"})]}),e.jsxs("div",{className:"card-telemetry sub-telemetry",children:[e.jsxs("div",{className:"telemetry-item",children:[e.jsx("span",{className:"telemetry-label",children:"Recv"}),e.jsxs("span",{className:"telemetry-val text-amber",children:["#",S]})]}),e.jsxs("div",{className:"telemetry-item",children:[e.jsx("span",{className:"telemetry-label",children:"Range"}),e.jsxs("span",{className:`telemetry-val ${F?"text-red font-bold":"text-cyan"}`,children:[k.toFixed(2)," m"]})]}),e.jsxs("div",{className:"telemetry-item cb-telemetry-item",children:[e.jsx("span",{className:"telemetry-label",children:"Action"}),e.jsx("span",{className:`telemetry-val cb-name ${F?"text-red font-bold animate-pulse":"text-green"}`,children:F?"🛑 BRAKE":"🟢 CLEAR"})]})]}),e.jsxs("div",{className:"proximity-gauge-wrap",children:[e.jsxs("div",{className:"gauge-labels",children:[e.jsxs("span",{children:["Proximity: ",e.jsxs("strong",{children:[k.toFixed(2),"m"]})]}),e.jsxs("span",{className:"threshold-tag",children:["Threshold: ",I.toFixed(2),"m"]})]}),e.jsxs("div",{className:"gauge-track",children:[e.jsx("div",{className:"gauge-threshold-line",title:"0.50m Safety Threshold"}),e.jsx("div",{className:`gauge-fill ${F?"hazard":"safe"}`,style:{width:`${U}%`}})]})]}),e.jsxs("div",{className:"card-terminal-log",children:[e.jsxs("div",{className:"log-header",children:[e.jsx(ze,{size:12,className:F?"text-red animate-pulse":"text-green"}),e.jsx("span",{children:"Safety Supervisory Telemetry"})]}),e.jsxs("div",{className:`log-content-wrap ${F?"hazard-alert":""} ${b?"pulse-log":""}`,children:[e.jsx("span",{className:`log-level-pill ${F?"log-level-error":""}`,children:F?"[WARN]":"[INFO]"}),e.jsx("span",{className:`log-text ${F?"hazard-text":""}`,children:F?`[distance_callback] Obstacle at ${k.toFixed(2)}m < 0.50m! Commanded EMERGENCY STOP (/cmd_vel -> 0.0)`:`[distance_callback] Clearance: ${k.toFixed(2)}m (> 0.50m threshold). Path clear, cruising.`})]})]})]})]}),e.jsxs("div",{className:"pubsub-controls-bar",children:[e.jsxs("div",{className:"controls-left",children:[e.jsxs("button",{className:`control-btn play-btn ${s?"active-playing":""}`,onClick:()=>t(!s),title:s?"Pause stream":"Start stream",children:[s?e.jsx(pt,{size:15}):e.jsx(Ue,{size:15}),e.jsx("span",{children:s?"Pause Stream":"Play Stream"})]}),e.jsxs("button",{className:"control-btn",onClick:j,title:"Step one message",children:[e.jsx(ce,{size:15}),e.jsx("span",{children:"Step (1 Msg)"})]}),e.jsxs("button",{className:"control-btn",onClick:O,title:"Reset simulation counter",children:[e.jsx(Z,{size:15}),e.jsx("span",{children:"Reset"})]}),e.jsxs("button",{className:"sensor-quick-btn hazard",onClick:P,title:"Inject an obstacle below the 0.50m safety threshold to trigger emergency stop",children:[e.jsx(dt,{size:13}),e.jsx("span",{children:"Simulate Obstacle (0.35m)"})]}),e.jsxs("button",{className:"sensor-quick-btn safe",onClick:G,title:"Simulate a clear pathway at 2.10m",children:[e.jsx(ve,{size:13}),e.jsx("span",{children:"Clear Path (2.10m)"})]}),f!==null&&e.jsxs("button",{className:"sensor-quick-btn auto",onClick:()=>{T(null),D.current=performance.now()},title:"Resume automatic sinusoidal obstacle oscillation at constant physical speed",children:[e.jsx(Z,{size:13}),e.jsx("span",{children:"Resume Auto Wave"})]})]}),e.jsxs("div",{className:"controls-right",children:[e.jsxs("div",{className:"rate-slider-group",children:[e.jsx(qe,{size:14,className:"text-muted"}),e.jsxs("label",{className:"slider-label",title:"Publisher timer frequency: controls how many messages are published per second across DDS. The physical obstacle oscillates at a constant real-time speed.",children:["Timer Rate: ",e.jsxs("strong",{children:[a," Hz"]})," ",e.jsxs("span",{className:"rate-subtext",children:["(",a," msg/s)"]})]}),e.jsx("input",{type:"range",min:"0.5",max:"4",step:"0.5",value:a,onChange:B=>p(parseFloat(B.target.value)),className:"pubsub-slider"})]}),e.jsxs("div",{className:"qos-toggle-group",children:[e.jsx("span",{className:"qos-label",children:"QoS Policy:"}),e.jsx("button",{className:`qos-choice-btn ${v==="default"?"active":""}`,onClick:()=>g("default"),children:"Reliable"}),e.jsx("button",{className:`qos-choice-btn ${v==="sensor_data"?"active":""}`,onClick:()=>g("sensor_data"),children:"Best Effort"})]})]})]}),h&&e.jsxs("div",{className:"pubsub-inspector animate-fade-in",children:[e.jsxs("div",{className:"inspector-header",children:[e.jsxs("div",{className:"inspector-title",children:[e.jsx(Ot,{size:16,className:"text-cyan"}),e.jsxs("span",{children:[h==="pub"&&"Inspecting: Publisher Node (ultrasonic_sensor_node)",h==="topic"&&"Inspecting: Topic Bus (/sensor/ultrasonic_front)",h==="dds"&&"Inspecting: DDS Middleware & QoS Transport",h==="sub"&&"Inspecting: Subscriber Node (collision_monitor_node)"]})]}),e.jsx("button",{className:"inspector-close",onClick:()=>_(null),children:"✕"})]}),e.jsxs("div",{className:"inspector-body",children:[h==="pub"&&e.jsxs("div",{className:"inspector-grid",children:[e.jsxs("div",{children:[e.jsx("strong",{children:"Role:"})," Data Originator / Sensor Publisher.",e.jsxs("p",{children:["Calls ",e.jsx("code",{className:"inline-code",children:"self.create_publisher(Float32, '/sensor/ultrasonic_front', 10)"}),". The node publishes sensor telemetry anonymously without needing to know which subscriber nodes are listening."]})]}),e.jsxs("div",{className:"cli-hint",children:[e.jsx("strong",{children:"CLI Inspection Command:"}),e.jsx("code",{children:"ros2 node info /ultrasonic_sensor_node"})]})]}),h==="topic"&&e.jsxs("div",{className:"inspector-grid",children:[e.jsxs("div",{children:[e.jsx("strong",{children:"Role:"})," Decoupled Named Message Bus.",e.jsxs("p",{children:["In ROS 2, topics are strictly typed (",e.jsx("code",{className:"inline-code",children:"example_interfaces/msg/Float32"}),"). Any publisher sending mismatched types is rejected by DDS compile-time and runtime checks."]})]}),e.jsxs("div",{className:"cli-hint",children:[e.jsx("strong",{children:"CLI Inspection Commands:"}),e.jsx("code",{children:"ros2 topic list"}),e.jsx("code",{children:"ros2 topic info /sensor/ultrasonic_front"}),e.jsx("code",{children:"ros2 topic echo /sensor/ultrasonic_front"}),e.jsx("code",{children:"ros2 topic hz /sensor/ultrasonic_front"})]})]}),h==="dds"&&e.jsxs("div",{className:"inspector-grid",children:[e.jsxs("div",{children:[e.jsx("strong",{children:"Role:"})," Data Distribution Service (DDS / RTPS).",e.jsx("p",{children:"ROS 2 replaces ROS 1's custom master with industry-standard DDS (Object Management Group). Nodes automatically discover each other via multicast peer-to-peer handshakes without a central broker."})]}),e.jsxs("div",{className:"cli-hint",children:[e.jsx("strong",{children:"Active Profile:"}),e.jsx("code",{children:v==="default"?"Reliability: RELIABLE, Durability: VOLATILE, Depth: 10":"Reliability: BEST_EFFORT, Durability: VOLATILE, Depth: 5 (Sensor Data)"})]})]}),h==="sub"&&e.jsxs("div",{className:"inspector-grid",children:[e.jsxs("div",{children:[e.jsx("strong",{children:"Role:"})," Event-Driven Consumer & Safety Supervisor.",e.jsxs("p",{children:["Registers a callback method with ",e.jsx("code",{className:"inline-code",children:"self.create_subscription(Float32, '/sensor/ultrasonic_front', self.distance_callback, 10)"}),". The ROS 2 Executor sits in an event loop (",e.jsx("code",{className:"inline-code",children:"rclpy.spin()"}),") and calls the callback whenever new distance data lands in the queue."]}),e.jsxs("p",{style:{marginTop:"6px",color:"#94a3b8"},children:["Current Reaction: ",e.jsx("strong",{children:F?"🚨 COLLISION HAZARD (< 0.50m) -> EMERGENCY STOP ACTIVE":"✅ SAFE CLEARANCE (>= 0.50m) -> NORMAL MOTION"})]})]}),e.jsxs("div",{className:"cli-hint",children:[e.jsx("strong",{children:"CLI Verification:"}),e.jsx("code",{children:"ros2 node info /collision_monitor_node"}),e.jsx("code",{children:"ros2 topic echo /sensor/ultrasonic_front"})]})]})]})]})]})}function Ds(){const[s,t]=r.useState(!1),[a,p]=r.useState(1),[c,A]=r.useState("IDLE"),[S,E]=r.useState("LISTENING"),[k,x]=r.useState(!0),[f,T]=r.useState(null),[d,o]=r.useState("idle"),l=r.useRef(null),y=r.useRef([]),b=()=>{y.current.forEach(h=>clearTimeout(h)),y.current=[]},C=()=>{if(d!=="idle"&&d!=="completed")return;b(),p(_=>_+1),A("SENDING"),o("req_in_flight");const h=setTimeout(()=>{A("WAITING"),E("PROCESSING"),o("server_computing");const _=setTimeout(()=>{E("REPLYING"),x(g=>!g),o("res_in_flight");const v=setTimeout(()=>{A("RESOLVED"),E("LISTENING"),o("completed");const g=setTimeout(()=>{A("IDLE"),o("idle")},1500);y.current.push(g)},2400);y.current.push(v)},1600);y.current.push(_)},2400);y.current.push(h)},z=()=>{b(),l.current&&clearInterval(l.current),t(!1),T(null),p(1),A("IDLE"),E("LISTENING"),x(!0),o("idle")};r.useEffect(()=>(s&&f===null?l.current=setInterval(()=>{C()},8500):l.current&&clearInterval(l.current),()=>{l.current&&clearInterval(l.current)}),[s,f,d]),r.useEffect(()=>()=>b(),[]);const m=[{num:1,title:"1. Client Initiates Request (Client ➔ Server)",desc:"The Client node invokes client.call_async(SetBool.Request(data=True)). A blue request packet departs the Client and travels across the DDS bus. The Client creates a non-blocking Future object and waits.",target:"client"},{num:2,title:"2. DDS Direct 1-to-1 Point-to-Point Transport",desc:"Unlike Topics which broadcast anonymously to any number of subscribers, Services use point-to-point unicast addressing directly to the single server registered for '/amr/emergency_stop'.",target:"pipeline"},{num:3,title:"3. Server Executes Callback (cb_emergency_stop)",desc:"The Server receives (request, response). It executes hardware actuation (toggling physical motor brake relays) and assigns the response payload: response.success = True and response.message = 'Brakes Engaged'.",target:"server"},{num:4,title:"4. Response Returned & Future Resolved (Server ➔ Client)",desc:"The Server dispatches the green response packet back to the Client. When the Client receives the response, its Future is marked resolved and triggers the done_callback.",target:"all"}];return e.jsxs("div",{className:"pubsub-flow-container",children:[e.jsxs("div",{className:"pubsub-flow-header",children:[e.jsxs("div",{className:"header-title-row",children:[e.jsxs("div",{className:"badge-pill",children:[e.jsx(pe,{size:14,className:"text-cyan animate-pulse"}),e.jsx("span",{children:"Interactive Service Architecture: 2-Way Request ➔ Response (RPC)"})]}),e.jsx("span",{className:"ros-version-tag",children:"std_srvs/srv/SetBool · 1-to-1 Unicast"})]}),e.jsxs("p",{className:"pubsub-flow-subtitle",children:["Watch the slow-motion bidirectional packet flight: ",e.jsx("strong",{children:"Request"})," glides from Client to Server, the Server processes the callback, and the ",e.jsx("strong",{children:"Response"})," glides from Server back to Client."]})]}),e.jsxs("div",{className:"walkthrough-bar",children:[e.jsxs("span",{className:"walkthrough-label",children:[e.jsx(_e,{size:14})," Guided Reveal:"]}),e.jsxs("div",{className:"walkthrough-buttons",children:[e.jsx("button",{className:`walkthrough-step-btn ${f===null?"active":""}`,onClick:()=>{T(null),t(!1),o("idle")},children:"All Live"}),m.map(h=>e.jsxs("button",{className:`walkthrough-step-btn ${f===h.num?"active":""}`,onClick:()=>{T(h.num),t(!1)},children:["Step ",h.num]},h.num))]})]}),f!==null&&e.jsxs("div",{className:"active-step-banner animate-fade-in",children:[e.jsxs("div",{className:"banner-badge",children:["Step ",f," of 4"]}),e.jsxs("div",{className:"banner-content",children:[e.jsx("h4",{children:m[f-1].title}),e.jsx("p",{children:m[f-1].desc})]})]}),e.jsxs("div",{className:"diagram-stage",children:[e.jsxs("div",{className:`diagram-card client-card ${c==="SENDING"||c==="WAITING"?"pulse-border":""} ${f===1||f===4||f===null?"focused":"dimmed"}`,children:[e.jsxs("div",{className:"card-top",children:[e.jsx("div",{className:"node-icon-wrapper pub-icon",children:e.jsx(xe,{size:18})}),e.jsxs("div",{className:"node-title-group",children:[e.jsx("div",{className:"node-role-tag",children:"SERVICE CLIENT (Caller)"}),e.jsx("h3",{className:"node-name",title:"/teleop_safety_client",children:"teleop_safety_client"}),e.jsx("div",{className:"node-class",children:"EmergencyStopClient"})]}),e.jsx("div",{className:`status-dot ${c!=="IDLE"?"online":"paused"}`,title:c})]}),e.jsxs("div",{className:"card-code-snip",children:[e.jsx("span",{className:"code-fn",children:"future = client.call_async"}),e.jsx("span",{className:"code-args",children:"(SetBool.Request(data=True))"})]}),e.jsxs("div",{className:"card-telemetry pub-telemetry",children:[e.jsxs("div",{className:"telemetry-item",children:[e.jsx("span",{className:"telemetry-label",children:"Calls"}),e.jsxs("span",{className:"telemetry-val text-cyan",children:["#",a]})]}),e.jsxs("div",{className:"telemetry-item",children:[e.jsx("span",{className:"telemetry-label",children:"Client Future"}),e.jsx("span",{className:`telemetry-val ${c==="WAITING"?"text-amber animate-pulse":c==="RESOLVED"?"text-green":"text-muted"}`,children:c==="WAITING"?"⏳ PENDING":c==="RESOLVED"?"✅ RESOLVED":"IDLE"})]}),e.jsxs("div",{className:"telemetry-item cb-telemetry-item",children:[e.jsx("span",{className:"telemetry-label",children:"Callback"}),e.jsx("span",{className:"telemetry-val text-purple cb-name",children:"done_cb"})]})]}),e.jsxs("button",{className:"card-action-btn",onClick:C,disabled:d!=="idle"&&d!=="completed",title:"Dispatch 1 Service Request to Server",children:[e.jsx(ce,{size:13}),e.jsxs("span",{children:["Send Request (data=",k?"False":"True",")"]})]})]}),e.jsxs("div",{className:`diagram-pipeline ${f===2||f===4||f===null?"focused":"dimmed"}`,children:[e.jsxs("div",{className:"topic-badge",children:[e.jsx(pe,{size:14,className:"text-cyan animate-pulse"}),e.jsxs("span",{className:"topic-name",children:["Service Bus: ",e.jsx("strong",{children:"/amr/emergency_stop"})]}),e.jsx("span",{className:"topic-type",children:"SetBool.srv"})]}),e.jsxs("div",{className:"service-lane request-lane",children:[e.jsxs("div",{className:"lane-header-row",children:[e.jsxs("span",{className:"lane-dir-badge req-badge",children:[e.jsx(ge,{size:12})," 1. REQUEST (Client ➔ Server)"]}),e.jsxs("span",{className:"lane-payload-preview",children:["data: ",k?"False":"True"]})]}),e.jsxs("div",{className:"service-flight-track",children:[e.jsx("div",{className:"track-rail",children:e.jsx("div",{className:"flow-chevrons flow-right",children:"› › › › › › › › › › › › › › › › › › › ›"})}),d==="req_in_flight"&&e.jsx("div",{className:"sliding-service-packet slide-c2s",children:e.jsxs("span",{className:"service-packet-pill req-pill",children:[e.jsx(Ve,{size:11,className:"text-amber"}),e.jsxs("span",{children:["SetBool_Request(data=",k?"False":"True",")"]})]})})]})]}),e.jsx("div",{className:`service-execution-box ${d==="server_computing"?"active-processing":""}`,children:e.jsx("div",{className:"exec-box-content",children:d==="server_computing"?e.jsxs(e.Fragment,{children:[e.jsx(ue,{size:16,className:"text-cyan animate-spin"}),e.jsxs("span",{className:"exec-text text-cyan",children:["Server Executing: ",e.jsx("code",{children:"cb_emergency_stop()"})," ➔ Toggling Motor Relays & Populating Response..."]})]}):d==="completed"?e.jsxs(e.Fragment,{children:[e.jsx(V,{size:16,className:"text-green"}),e.jsx("span",{className:"exec-text text-green",children:"RPC Completed Successfully · Response Delivered & Future Resolved"})]}):e.jsxs(e.Fragment,{children:[e.jsx(Cs,{size:16,className:"text-muted"}),e.jsx("span",{className:"exec-text text-muted",children:"1-to-1 Bidirectional RPC Channel Ready · Awaiting Request"})]})})}),e.jsxs("div",{className:"service-lane response-lane",children:[e.jsxs("div",{className:"lane-header-row",children:[e.jsxs("span",{className:"lane-dir-badge res-badge",children:[e.jsx(Re,{size:12})," 2. RESPONSE (Server ➔ Client)"]}),e.jsx("span",{className:"lane-payload-preview",children:"success: True"})]}),e.jsxs("div",{className:"service-flight-track",children:[e.jsx("div",{className:"track-rail",children:e.jsx("div",{className:"flow-chevrons flow-left",children:"‹ ‹ ‹ ‹ ‹ ‹ ‹ ‹ ‹ ‹ ‹ ‹ ‹ ‹ ‹ ‹ ‹ ‹ ‹ ‹"})}),d==="res_in_flight"&&e.jsx("div",{className:"sliding-service-packet slide-s2c",children:e.jsxs("span",{className:"service-packet-pill res-pill",children:[e.jsx(V,{size:11,className:"text-green"}),e.jsxs("span",{children:['SetBool_Response(success=True, msg="',k?"Brakes Engaged":"Motors Ready",'")']})]})})]})]}),e.jsxs("div",{className:"qos-badge-strip",children:[e.jsx("span",{className:"qos-chip",children:"Interface: std_srvs/srv/SetBool"}),e.jsx("span",{className:"qos-chip",children:"Type: 1-to-1 Unicast RPC"}),e.jsx("span",{className:"qos-chip",children:"Flight Speed: 2.4s (Readable Mode)"})]})]}),e.jsxs("div",{className:`diagram-card server-card ${S==="PROCESSING"?"pulse-border":""} ${f===3||f===4||f===null?"focused":"dimmed"}`,children:[e.jsxs("div",{className:"card-top",children:[e.jsx("div",{className:"node-icon-wrapper sub-icon",children:e.jsx(ue,{size:18})}),e.jsxs("div",{className:"node-title-group",children:[e.jsx("div",{className:"node-role-tag",children:"SERVICE SERVER (Provider)"}),e.jsx("h3",{className:"node-name",title:"/emergency_stop_server",children:"emergency_stop_server"}),e.jsx("div",{className:"node-class",children:"EmergencyStopServer"})]}),e.jsx("div",{className:`status-dot ${S!=="LISTENING"?"online":"active"}`,title:S})]}),e.jsxs("div",{className:"card-code-snip",children:[e.jsx("span",{className:"code-fn",children:"def cb_emergency_stop"}),e.jsx("span",{className:"code-args",children:"(self, request, response):"})]}),e.jsxs("div",{className:"card-telemetry sub-telemetry",children:[e.jsxs("div",{className:"telemetry-item",children:[e.jsx("span",{className:"telemetry-label",children:"Hardware State"}),e.jsx("span",{className:"telemetry-val",style:{color:k?"#ef4444":"#10b981"},children:k?"🛑 ENGAGED":"⚡ ARMED"})]}),e.jsxs("div",{className:"telemetry-item",children:[e.jsx("span",{className:"telemetry-label",children:"Server State"}),e.jsx("span",{className:`telemetry-val ${S==="PROCESSING"?"text-amber animate-pulse":"text-green"}`,children:S})]}),e.jsxs("div",{className:"telemetry-item cb-telemetry-item",children:[e.jsx("span",{className:"telemetry-label",children:"Handler"}),e.jsx("span",{className:"telemetry-val text-cyan cb-name",children:"cb_e_stop"})]})]}),e.jsxs("div",{className:"card-terminal-log",children:[e.jsxs("div",{className:"log-header",children:[e.jsx(ze,{size:12,className:"text-green"}),e.jsx("span",{children:"Actuator Hardware Relay Status"})]}),e.jsxs("div",{className:"log-content-wrap",children:[e.jsx("span",{className:`log-level-pill ${k?"log-level-error":""}`,children:k?"[LOCKED]":"[ARMED]"}),e.jsx("span",{className:"log-text",children:k?"Brakes Locked (PWM 0%). AMR Stopped.":"Differential Drive Motors Enabled (PWM Active)."})]})]})]})]}),e.jsx("div",{className:"pubsub-controls-bar",style:{marginTop:"1.25rem"},children:e.jsxs("div",{className:"controls-left",children:[e.jsxs("button",{className:`control-btn play-btn ${s?"active-playing":""}`,onClick:()=>t(!s),title:s?"Pause auto RPC demonstration":"Start auto RPC demonstration",children:[s?e.jsx(pt,{size:15}):e.jsx(Ue,{size:15}),e.jsx("span",{children:s?"Pause Auto Demo":"Auto Demo (Every 8s)"})]}),e.jsxs("button",{className:"control-btn",onClick:C,disabled:d!=="idle"&&d!=="completed",title:"Execute one isolated Request-Response transaction",children:[e.jsx(ce,{size:15}),e.jsx("span",{children:"Call Service (1 RPC)"})]}),e.jsxs("button",{className:"control-btn",onClick:z,title:"Reset simulation state",children:[e.jsx(Z,{size:15}),e.jsx("span",{children:"Reset"})]})]})}),e.jsxs("div",{className:"service-concept-summary",children:[e.jsxs("div",{className:"concept-card",children:[e.jsx("div",{className:"concept-icon req-icon",children:e.jsx(ce,{size:16})}),e.jsxs("div",{className:"concept-text",children:[e.jsx("strong",{children:"1. Request & Client Future (Client ➔ Server)"}),e.jsxs("p",{children:["The client creates a Request and calls ",e.jsx("code",{className:"inline-code",children:"call_async()"}),". The packet dispatches to the server. The client holds a Future object and never freezes its main event loop."]})]})]}),e.jsxs("div",{className:"concept-card",children:[e.jsx("div",{className:"concept-icon srv-icon",children:e.jsx(ue,{size:16})}),e.jsxs("div",{className:"concept-text",children:[e.jsx("strong",{children:"2. Server Callback Execution (Provider)"}),e.jsxs("p",{children:["The server receives ",e.jsx("code",{className:"inline-code",children:"(request, response)"}),", toggles hardware relays, and fills in ",e.jsx("code",{className:"inline-code",children:"response.success = True"})," before sending the response back."]})]})]}),e.jsxs("div",{className:"concept-card",children:[e.jsx("div",{className:"concept-icon res-icon",children:e.jsx(V,{size:16})}),e.jsxs("div",{className:"concept-text",children:[e.jsx("strong",{children:"3. Response Delivery (Server ➔ Client)"}),e.jsx("p",{children:"The response returns back to the calling client. The client's Future resolves, unlocking any dependent robot state machines or logging."})]})]})]})]})}function Es(){const[s,t]=r.useState("IDLE"),[a,p]=r.useState(0),[c,A]=r.useState(10),[S,E]=r.useState(10),[k,x]=r.useState(0),[f,T]=r.useState(null),[d,o]=r.useState([]),[l,y]=r.useState({distance_remaining:10,current_velocity:0,count:0}),[b,C]=r.useState(!1),z=r.useRef(null),m=r.useRef(null),h=r.useRef([]),_=r.useRef(1),v=r.useRef(10),g=()=>{z.current&&clearInterval(z.current),m.current&&clearInterval(m.current),h.current.forEach(N=>clearTimeout(N)),h.current=[]},u=()=>{if(s==="EXECUTING"||s==="SENDING_GOAL"||s==="SENDING_RESULT")return;g(),p(0),E(c),v.current=c,x(0),o([]),y({distance_remaining:c,current_velocity:0,count:0}),t("SENDING_GOAL");const N=setTimeout(()=>{t("GOAL_ACCEPTED");const D=setTimeout(()=>{t("EXECUTING")},700);h.current.push(D)},2e3);h.current.push(N)},i=()=>{if(s!=="EXECUTING")return;g(),o([]),t("SENDING_CANCEL");const N=setTimeout(()=>{t("CANCELED"),y(D=>({...D,current_velocity:0}))},1500);h.current.push(N)},n=()=>{g(),t("IDLE"),p(0),E(c),v.current=c,x(0),o([]),y({distance_remaining:c,current_velocity:0,count:0}),T(null)};r.useEffect(()=>{if(s!=="EXECUTING"){z.current&&clearInterval(z.current),m.current&&clearInterval(m.current);return}const N=c/1.4,D=60,M=100/(N*1e3/D);return z.current=setInterval(()=>{p($=>{const L=$+M;if(L>=100){clearInterval(z.current),clearInterval(m.current),E(0),v.current=0,o([]),t("SENDING_RESULT");const P=setTimeout(()=>{t("SUCCEEDED"),y(G=>({distance_remaining:0,current_velocity:0,count:G.count}))},2200);return h.current.push(P),100}const j=parseFloat((c*(1-L/100)).toFixed(1));return E(j),v.current=j,L})},D),m.current=setInterval(()=>{x(j=>j+1);const $=_.current++,L=v.current;o(j=>[...j.slice(-2),{id:$,dist:L.toFixed(1)}])},900),()=>{z.current&&clearInterval(z.current),m.current&&clearInterval(m.current)}},[s,c]),r.useEffect(()=>()=>g(),[]);const w=N=>{y({distance_remaining:parseFloat(N.dist),current_velocity:1.4,count:N.id}),C(!0),setTimeout(()=>C(!1),220),o(D=>D.filter(I=>I.id!==N.id))},R=[{num:1,title:"1. Goal Dispatch (Client ➔ Server)",desc:"The Action Client calls send_goal_async(NavigateDistance.Goal(target=10.0m)). The Goal request dispatches across the DDS network. The Server accepts the goal handle and returns UUID #0x82f1.",target:"goal"},{num:2,title:"2. Periodic Feedback Stream (Server ➔ Client)",desc:"While the AMR drives along the corridor, the Action Server streams feedback packets at 4 Hz. The Client's feedback_callback receives distance remaining and velocity asynchronously without blocking.",target:"feedback"},{num:3,title:"3. Preemption & Cancellation Request (Client ➔ Server)",desc:"If an emergency obstacle appears, the Client calls cancel_goal_async(). The Server immediately halts motor PWM, updates the goal state machine to STATUS_CANCELED, and stops navigation.",target:"cancel"},{num:4,title:"4. Final Result Resolution (Server ➔ Client)",desc:"Upon reaching 0.0m or completing cancellation, the Server sends the Result packet back. The Client's get_result_async() resolves with the terminal status (STATUS_SUCCEEDED or STATUS_CANCELED).",target:"result"}];return e.jsxs("div",{className:"pubsub-flow-container action-flow-root-container",children:[e.jsxs("div",{className:"pubsub-flow-header",children:[e.jsxs("div",{className:"header-title-row",children:[e.jsxs("div",{className:"badge-pill",children:[e.jsx(pe,{size:14,className:"text-cyan animate-pulse"}),e.jsx("span",{children:"Interactive 3-Tier Action Architecture: Goal ➔ Feedback ➔ Result"})]}),e.jsx("span",{className:"ros-version-tag",children:"nexus_amr_interfaces/action/NavigateDistance · Preemptible"})]}),e.jsx("p",{className:"pubsub-flow-subtitle",children:"ROS 2 Actions provide asynchronous, preemptible, long-running goal execution: The Action Client dispatches a Goal request, the Action Server publishes a continuous stream of real-time Feedback during execution, and returns the final Result when complete."})]}),e.jsxs("div",{className:"walkthrough-bar",children:[e.jsxs("span",{className:"walkthrough-label",children:[e.jsx(_e,{size:14})," Guided Reveal:"]}),e.jsxs("div",{className:"walkthrough-buttons",children:[e.jsx("button",{className:`walkthrough-step-btn ${f===null?"active":""}`,onClick:()=>{T(null)},children:"All Live"}),R.map(N=>e.jsxs("button",{className:`walkthrough-step-btn ${f===N.num?"active":""}`,onClick:()=>{T(N.num)},children:["Step ",N.num]},N.num))]})]}),f!==null&&e.jsxs("div",{className:"active-step-banner animate-fade-in",children:[e.jsxs("div",{className:"banner-badge",children:["Step ",f," of 4"]}),e.jsxs("div",{className:"banner-content",children:[e.jsx("h4",{children:R[f-1].title}),e.jsx("p",{children:R[f-1].desc})]})]}),e.jsxs("div",{className:"action-physical-runway-card",children:[e.jsxs("div",{className:"runway-header-row",children:[e.jsxs("div",{className:"runway-header-left",children:[e.jsxs("span",{className:"runway-badge",children:[e.jsx(Dt,{size:12}),e.jsx("span",{children:"Physical AMR Trajectory Corridor"})]}),e.jsx("span",{className:"runway-live-status font-mono",children:s==="EXECUTING"?`Driving at 1.40 m/s · ${(c*(a/100)).toFixed(1)}m of ${c}.0m traversed`:s==="GOAL_ACCEPTED"?"Goal Accepted · Initializing Motor Drive...":s==="SENDING_GOAL"?"Goal Dispatch In-Flight...":s==="SENDING_CANCEL"?"Preemption In-Flight · Decelerating Motors...":s==="SUCCEEDED"?`Goal Reached! Target Waypoint Reached: ${c}.0m`:s==="CANCELED"?"Preemption Accepted · Motors Safely Cut":`Standby at 0.0m · Awaiting Action Goal (${c}m)`})]}),e.jsx("div",{className:"runway-header-right font-mono",children:e.jsxs("span",{className:"runway-speed-tag",children:["Speed: ",e.jsx("strong",{children:s==="EXECUTING"?"1.40 m/s":"0.00 m/s"})]})})]}),e.jsxs("div",{className:"amr-full-runway-track",children:[e.jsx("div",{className:"runway-track-rail"}),e.jsx("div",{className:"runway-track-fill",style:{width:`${a}%`,background:s==="CANCELED"?"#ef4444":"linear-gradient(90deg, #0284c7, #10b981)"}}),e.jsxs("div",{className:"runway-destination-flag",title:`Target Waypoint: ${c}.0m`,children:[e.jsx(ha,{size:14,className:s==="SUCCEEDED"?"text-emerald":"text-cyan"}),e.jsxs("span",{className:"flag-label",children:[c,"m"]})]}),e.jsx("div",{className:`runway-amr-marker ${s==="EXECUTING"?"driving":""}`,style:{left:`calc(${a}% - 14px)`},title:`AMR Position: ${(c*(a/100)).toFixed(1)}m`,children:e.jsx("div",{className:"amr-icon-box",children:e.jsx(Dt,{size:13,className:"amr-compass-icon"})})}),e.jsxs("div",{className:"runway-distance-ticks",children:[e.jsx("span",{children:"0m (Origin)"}),e.jsxs("span",{children:[(c*.25).toFixed(1),"m"]}),e.jsxs("span",{children:[(c*.5).toFixed(1),"m"]}),e.jsxs("span",{children:[(c*.75).toFixed(1),"m"]}),e.jsxs("span",{children:[c,".0m (Waypoint)"]})]})]})]}),e.jsxs("div",{className:"diagram-stage action-balanced-stage",children:[e.jsxs("div",{className:`diagram-card client-card action-node-card ${s==="EXECUTING"||s==="SENDING_GOAL"?"pulse-border":""} ${f===1||f===3||f===null?"focused":"dimmed"}`,children:[e.jsxs("div",{className:"card-top",children:[e.jsx("div",{className:"node-icon-wrapper pub-icon",children:e.jsx(Te,{size:18})}),e.jsxs("div",{className:"node-title-group",children:[e.jsx("div",{className:"node-role-tag",children:"ACTION CLIENT (Caller)"}),e.jsx("h3",{className:"node-name action-node-title",title:"/patrol_action_client",children:"patrol_action_client"}),e.jsx("div",{className:"node-class",children:"NavigateDistanceClient"})]}),e.jsx("div",{className:`status-dot ${s==="EXECUTING"?"online":s==="CANCELED"?"error":"paused"}`,title:s})]}),e.jsxs("div",{className:"card-code-snip",children:[e.jsx("span",{className:"code-fn",children:"client.send_goal_async"}),e.jsxs("span",{className:"code-args",children:["(NavigateDistance.Goal(target=",c,"m))"]})]}),e.jsxs("div",{className:"card-telemetry pub-telemetry",children:[e.jsxs("div",{className:"telemetry-item",children:[e.jsx("span",{className:"telemetry-label",children:"Target"}),e.jsxs("span",{className:"telemetry-val text-cyan",children:[c,".0 m"]})]}),e.jsxs("div",{className:"telemetry-item",children:[e.jsx("span",{className:"telemetry-label",children:"Received"}),e.jsxs("span",{className:"telemetry-val text-amber",children:["#",l.count]})]}),e.jsxs("div",{className:"telemetry-item",children:[e.jsx("span",{className:"telemetry-label",children:"Goal Status"}),e.jsx("span",{className:"telemetry-val font-mono",style:{color:s==="SUCCEEDED"?"#10b981":s==="CANCELED"?"#ef4444":s==="EXECUTING"?"#38bdf8":s==="GOAL_ACCEPTED"?"#a855f7":s==="SENDING_GOAL"?"#38bdf8":s==="SENDING_CANCEL"?"#f59e0b":"var(--text-muted)",fontSize:"0.68rem"},children:s==="EXECUTING"?"STATUS_EXECUTING":s==="GOAL_ACCEPTED"||s==="SENDING_GOAL"?"STATUS_ACCEPTED":s==="SENDING_CANCEL"?"STATUS_CANCELING":s==="SUCCEEDED"?"STATUS_SUCCEEDED":s==="CANCELED"?"STATUS_CANCELED":"STATUS_UNKNOWN"})]})]}),e.jsxs("div",{className:`client-feedback-terminal ${b?"cb-flash":""}`,children:[e.jsxs("div",{className:"client-fb-header",children:[e.jsx(ze,{size:12,className:"text-emerald"}),e.jsx("span",{className:"font-mono",children:"def feedback_callback(self, msg):"}),b&&e.jsx("span",{className:"cb-live-tag",children:"LIVE MSG"})]}),e.jsxs("div",{className:"client-fb-grid",children:[e.jsxs("div",{className:"client-fb-stat",children:[e.jsx("span",{className:"fb-key",children:"dist_rem:"}),e.jsx("span",{className:"fb-val text-emerald font-mono",children:s==="EXECUTING"||s==="SUCCEEDED"||s==="CANCELED"?`${l.distance_remaining.toFixed(1)} m`:"--"})]}),e.jsxs("div",{className:"client-fb-stat",children:[e.jsx("span",{className:"fb-key",children:"velocity:"}),e.jsx("span",{className:"fb-val text-cyan font-mono",children:s==="EXECUTING"?"1.40 m/s":"0.00 m/s"})]}),e.jsxs("div",{className:"client-fb-stat",children:[e.jsx("span",{className:"fb-key",children:"traversed:"}),e.jsx("span",{className:"fb-val text-purple font-mono",children:s==="EXECUTING"||s==="SUCCEEDED"||s==="CANCELED"?`${Math.max(0,c-l.distance_remaining).toFixed(1)} m`:"0.0 m"})]})]})]}),e.jsx("div",{className:"client-card-action-wrap",children:s==="EXECUTING"?e.jsxs("button",{className:"card-action-btn cancel-action-btn",onClick:i,title:"Preempt and cancel ongoing goal immediately",children:[e.jsx(ot,{size:14}),e.jsx("span",{children:"Preempt Goal (Emergency Cancel)"})]}):e.jsxs("button",{className:"card-action-btn",onClick:u,disabled:s==="SENDING_GOAL"||s==="SENDING_RESULT",title:"Dispatch Action Goal to drive target distance",children:[e.jsx(ce,{size:14}),e.jsxs("span",{children:["Send Goal (",c,"m)"]})]})})]}),e.jsxs("div",{className:`diagram-pipeline action-pipeline-card ${f===2||f===4||f===null?"focused":"dimmed"}`,children:[e.jsxs("div",{className:"topic-badge",children:[e.jsx(pe,{size:14,className:"text-cyan animate-pulse"}),e.jsxs("span",{className:"topic-name",children:["Action Bus: ",e.jsx("strong",{children:"/navigate_distance"})]}),e.jsx("span",{className:"topic-type",children:"NavigateDistance.action"})]}),e.jsxs("div",{className:"action-channel-strip goal-channel",children:[e.jsxs("div",{className:"channel-header-row",children:[e.jsxs("span",{className:"channel-tag goal-tag",children:[e.jsx(ge,{size:11})," 1. GOAL SERVICE (Client ➔ Server)"]}),e.jsxs("span",{className:"channel-desc font-mono",children:["target: ",c,".0m"]})]}),e.jsxs("div",{className:"channel-wire",children:[e.jsx("div",{className:"wire-track",children:e.jsx("div",{className:"flow-chevrons flow-right",children:"› › › › › › › › › › › › › › › › › › › ›"})}),s==="SENDING_GOAL"&&e.jsx("div",{className:"sliding-action-packet slide-c2s",children:e.jsxs("span",{className:"action-packet-pill goal-pill",children:[e.jsx(Ve,{size:10}),e.jsxs("span",{children:["Goal: NavigateDistance(target=",c,"m)"]})]})}),s==="SENDING_CANCEL"&&e.jsx("div",{className:"sliding-action-packet slide-c2s",style:{animationDuration:"1.5s"},children:e.jsxs("span",{className:"action-packet-pill cancel-pill",children:[e.jsx(ot,{size:10}),e.jsx("span",{children:"CancelRequest(goal_id=0x82f1)"})]})}),s==="GOAL_ACCEPTED"&&e.jsxs("div",{className:"channel-accepted-badge animate-fade-in",children:[e.jsx(ve,{size:11})," Goal Accepted (UUID: #0x82f1)"]})]})]}),e.jsxs("div",{className:"action-channel-strip feedback-channel",children:[e.jsxs("div",{className:"channel-header-row",children:[e.jsxs("span",{className:"channel-tag feedback-tag",children:[e.jsx(Re,{size:11})," 2. FEEDBACK STREAM (Server ➔ Client · 4 Hz)"]}),e.jsxs("span",{className:"channel-desc font-mono",children:["rem: ",S.toFixed(1),"m"]})]}),e.jsxs("div",{className:"channel-wire",children:[e.jsx("div",{className:"wire-track",children:e.jsx("div",{className:"flow-chevrons flow-left",children:"‹ ‹ ‹ ‹ ‹ ‹ ‹ ‹ ‹ ‹ ‹ ‹ ‹ ‹ ‹ ‹ ‹ ‹ ‹ ‹"})}),d.map(N=>e.jsx("div",{className:"sliding-action-packet slide-feedback-stream",onAnimationEnd:()=>w(N),children:e.jsxs("span",{className:"action-packet-pill feedback-pill",children:[e.jsx(ze,{size:10}),e.jsxs("span",{children:["rem: ",N.dist,"m | 1.4m/s"]})]})},N.id))]})]}),e.jsxs("div",{className:"action-channel-strip result-channel",children:[e.jsxs("div",{className:"channel-header-row",children:[e.jsxs("span",{className:"channel-tag result-tag",children:[e.jsx(Re,{size:11})," 3. RESULT SERVICE (Server ➔ Client)"]}),e.jsx("span",{className:"channel-desc font-mono",children:s==="SUCCEEDED"?"STATUS_SUCCEEDED":s==="CANCELED"?"STATUS_CANCELED":"Awaiting Completion"})]}),e.jsxs("div",{className:"channel-wire",children:[e.jsx("div",{className:"wire-track",children:e.jsx("div",{className:"flow-chevrons flow-left",children:"‹ ‹ ‹ ‹ ‹ ‹ ‹ ‹ ‹ ‹ ‹ ‹ ‹ ‹ ‹ ‹ ‹ ‹ ‹ ‹"})}),s==="SENDING_RESULT"&&e.jsx("div",{className:"sliding-action-packet slide-s2c",children:e.jsxs("span",{className:"action-packet-pill result-pill",children:[e.jsx(V,{size:10}),e.jsxs("span",{children:["Result: STATUS_SUCCEEDED (dist=",c,"m)"]})]})}),s==="SUCCEEDED"&&e.jsxs("div",{className:"channel-result-pill result-success animate-fade-in",children:[e.jsx(V,{size:11,className:"text-emerald"})," Result Delivered: STATUS_SUCCEEDED"]}),s==="CANCELED"&&e.jsxs("div",{className:"channel-result-pill result-canceled animate-fade-in",children:[e.jsx(ot,{size:11})," Goal Preempted: STATUS_CANCELED"]})]})]}),e.jsxs("div",{className:"qos-badge-strip",children:[e.jsx("span",{className:"qos-chip",children:"1. Goal (RPC)"}),e.jsx("span",{className:"qos-chip",children:"2. Feedback (Stream)"}),e.jsx("span",{className:"qos-chip",children:"3. Result (RPC)"})]})]}),e.jsxs("div",{className:`diagram-card server-card action-node-card ${s==="EXECUTING"||s==="GOAL_ACCEPTED"?"pulse-border-green":""} ${f===1||f===2||f===null?"focused":"dimmed"}`,children:[e.jsxs("div",{className:"card-top",children:[e.jsx("div",{className:"node-icon-wrapper sub-icon",children:e.jsx(ue,{size:18})}),e.jsxs("div",{className:"node-title-group",children:[e.jsx("div",{className:"node-role-tag",children:"ACTION SERVER (Executor)"}),e.jsx("h3",{className:"node-name action-node-title",title:"/nav_action_server",children:"nav_action_server"}),e.jsx("div",{className:"node-class",children:"NavigateDistanceServer"})]}),e.jsx("div",{className:`status-dot ${s==="EXECUTING"?"online":s==="CANCELED"?"error":"active"}`,title:s})]}),e.jsxs("div",{className:"card-code-snip",children:[e.jsx("span",{className:"code-fn",children:"execute_callback"}),e.jsx("span",{className:"code-args",children:"(goal_handle) ➔ publish_feedback()"})]}),e.jsxs("div",{className:"card-telemetry sub-telemetry",children:[e.jsxs("div",{className:"telemetry-item",children:[e.jsx("span",{className:"telemetry-label",children:"Motor Drive"}),e.jsx("span",{className:"telemetry-val font-mono",style:{color:s==="EXECUTING"?"#10b981":"var(--text-muted)"},children:s==="EXECUTING"?"1.40 m/s":"0.00 m/s"})]}),e.jsxs("div",{className:"telemetry-item",children:[e.jsx("span",{className:"telemetry-label",children:"Preemption"}),e.jsx("span",{className:"telemetry-val font-mono",style:{color:s==="CANCELED"?"#ef4444":"#10b981"},children:s==="CANCELED"?"PREEMPTED":"CLEAR"})]}),e.jsxs("div",{className:"telemetry-item cb-telemetry-item",children:[e.jsx("span",{className:"telemetry-label",children:"Goal Status"}),e.jsx("span",{className:"telemetry-val font-mono",style:{color:s==="EXECUTING"||s==="SUCCEEDED"?"#10b981":s==="CANCELED"?"#ef4444":"var(--text-muted)",fontSize:"0.68rem"},children:s==="EXECUTING"?"STATUS_EXECUTING":s==="SUCCEEDED"?"STATUS_SUCCEEDED":s==="CANCELED"?"STATUS_CANCELED":"STATUS_UNKNOWN"})]})]}),e.jsxs("div",{className:"card-terminal-log action-server-log",children:[e.jsxs("div",{className:"log-header",children:[e.jsx(ze,{size:12,className:"text-green"}),e.jsx("span",{children:"Execution Loop Telemetry (10 Hz)"})]}),e.jsxs("div",{className:"log-content-wrap",children:[e.jsx("span",{className:`log-level-pill ${s==="CANCELED"?"log-level-error":""}`,children:s==="EXECUTING"?"[EXECUTING]":s==="CANCELED"?"[CANCELED]":s==="SUCCEEDED"?"[SUCCEEDED]":"[STANDBY]"}),e.jsx("span",{className:"log-text",children:s==="EXECUTING"?`Corridor trajectory active... Dist remaining: ${S.toFixed(1)}m`:s==="CANCELED"?"Preempt request accepted. Velocity cut to 0.0 m/s.":s==="SUCCEEDED"?`Target reached! Dispatched ${k} feedbacks.`:"Server listening on /navigate_distance. Ready for goal."})]})]}),e.jsx("div",{className:"server-status-footer-pill",children:e.jsx("span",{className:"status-indicator-tag",children:s==="EXECUTING"?"🟢 Control Loop Active · Ticking at 10 Hz":s==="GOAL_ACCEPTED"?"🟣 Goal Validated · Accepting Handle":s==="CANCELED"?"🔴 Goal Aborted · Preempt Callback Resolved":s==="SUCCEEDED"?"🟢 Goal Finalized · Result Published":"⚪ Standby · Ready for Action Goal"})})]})]}),e.jsxs("div",{className:"pubsub-controls-bar action-controls-bar",children:[e.jsx("div",{className:"controls-left",children:e.jsxs("button",{className:"control-btn",onClick:n,title:"Reset action simulation",children:[e.jsx(Z,{size:15}),e.jsx("span",{children:"Reset Simulation"})]})}),e.jsx("div",{className:"controls-right",children:e.jsxs("div",{className:"rate-slider-group",children:[e.jsx(qe,{size:14,className:"text-muted"}),e.jsxs("label",{className:"slider-label",children:["Target Distance: ",e.jsxs("strong",{children:[c," m"]})]}),e.jsx("input",{type:"range",min:"5",max:"20",step:"1",value:c,disabled:s==="EXECUTING"||s==="SENDING_GOAL",onChange:N=>{const D=parseInt(N.target.value);A(D),E(D),v.current=D,y(I=>({...I,distance_remaining:D}))},className:"pubsub-slider"})]})})]}),e.jsxs("div",{className:"service-concept-summary",children:[e.jsxs("div",{className:"concept-card",children:[e.jsx("div",{className:"concept-icon goal-concept-icon",children:e.jsx(ce,{size:16})}),e.jsxs("div",{className:"concept-text",children:[e.jsx("strong",{children:"1. Goal Service (Client ➔ Server)"}),e.jsxs("p",{children:["The client requests a long-running goal (drive ",c,"m). The server validates the goal parameters and returns an accepted handle."]})]})]}),e.jsxs("div",{className:"concept-card",children:[e.jsx("div",{className:"concept-icon feedback-concept-icon",children:e.jsx(ze,{size:16})}),e.jsxs("div",{className:"concept-text",children:[e.jsx("strong",{children:"2. Feedback Stream (Server ➔ Client)"}),e.jsx("p",{children:"While the robot drives, the server continuously publishes real-time telemetry (distance remaining, velocity) at 4 Hz."})]})]}),e.jsxs("div",{className:"concept-card",children:[e.jsx("div",{className:"concept-icon cancel-concept-icon",children:e.jsx(ot,{size:16})}),e.jsxs("div",{className:"concept-text",children:[e.jsx("strong",{children:"3. Mid-Flight Preemption (Client ➔ Server)"}),e.jsx("p",{children:"Unlike standard Services, an Action allows the client to abort a goal mid-flight if an emergency stop or obstacle occurs."})]})]}),e.jsxs("div",{className:"concept-card",children:[e.jsx("div",{className:"concept-icon result-concept-icon",children:e.jsx(V,{size:16})}),e.jsxs("div",{className:"concept-text",children:[e.jsx("strong",{children:"4. Result Service (Server ➔ Client)"}),e.jsx("p",{children:"When the robot reaches the target waypoint or aborts, the server returns the final status code and outcome packet."})]})]})]})]})}const Ie=[{id:"debug",name:"DEBUG",num:10,color:"#06b6d4",bg:"rgba(6, 182, 212, 0.08)",border:"#22d3ee",radius:175,icon:va,desc:"Fine-grained internal diagnostics (raw encoder counts, loop timings, math matrices).",purpose:"Development & Bench Testing only. Never enabled in production fleets due to network/CPU flood."},{id:"info",name:"INFO",num:20,color:"#3b82f6",bg:"rgba(59, 130, 246, 0.10)",border:"#60a5fa",radius:140,icon:Ot,desc:"Standard operational milestones (node initialized, goal reached, state transitions).",purpose:"ROS 2 Default Level. Recommended for day-to-day robot operations."},{id:"warn",name:"WARN",num:30,color:"#f59e0b",bg:"rgba(245, 158, 11, 0.12)",border:"#fbbf24",radius:105,icon:dt,desc:"Unexpected anomalies or degraded states that do not stop the robot from operating.",purpose:"Recoverable conditions: Low battery alert (<20%), transient LiDAR packet drop, high CPU load."},{id:"error",name:"ERROR",num:40,color:"#f97316",bg:"rgba(249, 115, 22, 0.15)",border:"#fb923c",radius:70,icon:ya,desc:"Component failure or abort. The affected subsystem cannot continue its function.",purpose:"Actionable failures: Sensor serial disconnected, path planner aborted, TF lookup failure."},{id:"fatal",name:"FATAL",num:50,color:"#ef4444",bg:"rgba(239, 68, 68, 0.22)",border:"#f87171",radius:35,icon:fa,desc:"Critical catastrophic failure. The node or physical hardware must shut down immediately.",purpose:"Safety hazards: Hardware E-Stop depressed, motor driver overcurrent, watch-dog bite."}],Rt=[{level:"debug",levelNum:10,badgeColor:"#06b6d4",tag:"[DEBUG]",source:"[nexus_amr_base]",msg:"Encoder ticks L: 14209, R: 14212 | loop_dt: 19.8ms | wheel_slip: 0.01"},{level:"info",levelNum:20,badgeColor:"#3b82f6",tag:"[INFO] ",source:"[nexus_amr_base]",msg:"State changed: IDLE -> NAVIGATING_TO_WAYPOINT (Goal: Waypoint_Station_2)"},{level:"warn",levelNum:30,badgeColor:"#f59e0b",tag:"[WARN] ",source:"[battery_monitor]",msg:"Battery voltage at 19.8V (<20.0V threshold). Return-to-base timer initiated."},{level:"error",levelNum:40,badgeColor:"#f97316",tag:"[ERROR]",source:"[lidar_driver]",msg:"Packet header checksum failed on /dev/ttyUSB0! Skipping 1 scan frame."},{level:"fatal",levelNum:50,badgeColor:"#ef4444",tag:"[FATAL]",source:"[safety_controller]",msg:"HARDWARE E-STOP BUMPER TRIGGERED: EMERGENCY BRAKES ENGAGED! Node halting."}];function Is(){const[s,t]=r.useState("info"),[a,p]=r.useState(!1),[c,A]=r.useState(null),S=Ie.find(d=>d.id===s)||Ie[1],E=c?Ie.find(d=>d.id===c):S,k=Rt.filter(d=>d.levelNum>=S.num).length,x=Rt.length-k,f=`ros2 run nexus_amr_basics logger_levels --ros-args --log-level ${s}`,T=()=>{navigator.clipboard.writeText(f).catch(()=>{}),p(!0),setTimeout(()=>p(!1),2e3)};return e.jsxs("div",{className:"log-circle-widget",children:[e.jsxs("div",{className:"log-widget-header",children:[e.jsxs("div",{className:"header-badge-row",children:[e.jsxs("div",{className:"badge-pill-cyan",children:[e.jsx(pe,{size:14,className:"animate-pulse"}),e.jsx("span",{children:"Interactive Severity Hierarchy & Filtering"})]}),e.jsx("span",{className:"ros-standard-badge",children:"ROS 2 Logging Standard (rclpy)"})]}),e.jsx("h3",{className:"log-widget-title",children:"The Nested Severity Hierarchy: What Level Logs What?"}),e.jsxs("p",{className:"log-widget-subtitle",children:["ROS 2 loggers use a ",e.jsx("strong",{children:"hierarchical threshold filter"}),": when you set the logger to level ",e.jsx("em",{children:"L"}),", all messages with severity ",e.jsx("strong",{children:"≥ L"})," are emitted, while all messages below ",e.jsx("em",{children:"L"})," are automatically suppressed without CPU overhead."]})]}),e.jsxs("div",{className:"level-selector-bar",children:[e.jsxs("span",{className:"selector-label",children:[e.jsx(qe,{size:14})," Active Logger Threshold:"]}),e.jsx("div",{className:"selector-buttons",children:Ie.map(d=>{const o=s===d.id;return e.jsxs("button",{className:`level-choice-btn ${o?"active":""}`,style:{"--btn-accent":d.color,borderColor:o?d.color:void 0,boxShadow:o?`0 0 12px ${d.color}40`:void 0},onClick:()=>t(d.id),children:[e.jsx("span",{className:"btn-dot",style:{background:d.color}}),e.jsx("span",{className:"btn-name",children:d.name}),d.id==="info"&&e.jsx("span",{className:"default-pill",children:"Default"})]},d.id)})})]}),e.jsxs("div",{className:"log-widget-body",children:[e.jsxs("div",{className:"nested-circle-stage",children:[e.jsxs("div",{className:"circle-stage-header",children:[e.jsx("span",{className:"stage-title",children:"Concentric Severity Inclusions"}),e.jsx("span",{className:"stage-hint",children:"Hover or click any ring"})]}),e.jsxs("div",{className:"concentric-container",children:[e.jsxs("svg",{viewBox:"-200 -200 400 400",className:"concentric-svg",children:[e.jsxs("defs",{children:[e.jsx("pattern",{id:"suppressedHatch",width:"8",height:"8",patternTransform:"rotate(45 0 0)",patternUnits:"userSpaceOnUse",children:e.jsx("line",{x1:"0",y1:"0",x2:"0",y2:"8",stroke:"rgba(255,255,255,0.06)",strokeWidth:"1.5"})}),e.jsxs("filter",{id:"activeGlow",x:"-20%",y:"-20%",width:"140%",height:"140%",children:[e.jsx("feGaussianBlur",{stdDeviation:"4",result:"blur"}),e.jsx("feComposite",{in:"SourceGraphic",in2:"blur",operator:"over"})]})]}),Ie.map(d=>{const o=d.num>=S.num,l=c===d.id,y=S.id===d.id;return e.jsxs("g",{className:`circle-layer ${o?"layer-active":"layer-dimmed"}`,onMouseEnter:()=>A(d.id),onMouseLeave:()=>A(null),onClick:()=>t(d.id),style:{cursor:"pointer"},children:[e.jsx("circle",{cx:"0",cy:"0",r:d.radius,fill:o?d.bg:"rgba(15, 23, 42, 0.4)",stroke:d.color,strokeWidth:y?3:l?2.5:1.5,strokeDasharray:o?"none":"4 4",opacity:o?1:.25,filter:y?"url(#activeGlow)":void 0,className:"transition-all duration-300"}),!o&&e.jsx("circle",{cx:"0",cy:"0",r:d.radius,fill:"url(#suppressedHatch)",opacity:"0.8"}),e.jsx("text",{x:"0",y:-d.radius+16,textAnchor:"middle",fill:o?d.color:"#64748b",fontSize:d.id==="fatal"?11:12,fontWeight:"700",fontFamily:"var(--font-mono, monospace)",letterSpacing:"0.5px",opacity:o?1:.4,children:d.name})]},d.id)}),e.jsx("circle",{cx:"0",cy:"0",r:"14",fill:"#ef4444",opacity:S.num<=50?.9:.3}),e.jsx("text",{x:"0",y:"4",textAnchor:"middle",fill:"#ffffff",fontSize:"10",fontWeight:"900",children:"⚡"})]}),e.jsxs("div",{className:"diagram-status-legend",children:[e.jsxs("div",{className:"legend-tag active-legend",children:[e.jsx(V,{size:12,className:"text-green"}),e.jsxs("span",{children:["Active: ",e.jsxs("strong",{children:[k," Levels"]})]})]}),x>0&&e.jsxs("div",{className:"legend-tag suppressed-legend",children:[e.jsx(Oe,{size:12,className:"text-red"}),e.jsxs("span",{children:["Suppressed: ",e.jsxs("strong",{children:[x," Levels"]})]})]})]})]}),e.jsxs("div",{className:"active-level-inspector",style:{borderColor:E.color},children:[e.jsxs("div",{className:"inspector-head",children:[e.jsxs("span",{className:"inspector-badge",style:{background:E.color},children:[E.name," (Severity ",E.num,")"]}),e.jsx("span",{className:"inspector-status",children:E.num>=S.num?e.jsxs("span",{className:"text-green flex items-center gap-1",children:[e.jsx(V,{size:12})," Logged & Visible"]}):e.jsxs("span",{className:"text-muted flex items-center gap-1",children:[e.jsx(Oe,{size:12})," Filtered Out (Silent)"]})})]}),e.jsx("p",{className:"inspector-desc",children:E.desc}),e.jsxs("div",{className:"inspector-meta",children:[e.jsx("span",{className:"meta-label",children:"Guideline:"})," ",E.purpose]})]})]}),e.jsxs("div",{className:"terminal-simulator-stage",children:[e.jsxs("div",{className:"simulator-header",children:[e.jsxs("div",{className:"simulator-title-group",children:[e.jsx(xe,{size:15,className:"text-cyan"}),e.jsx("span",{className:"simulator-title",children:"Live Terminal Output Stream"})]}),e.jsxs("span",{className:"filter-mode-tag",children:["Threshold: ",e.jsx("strong",{style:{color:S.color},children:S.name})]})]}),e.jsxs("div",{className:"terminal-log-window",children:[e.jsxs("div",{className:"terminal-titlebar",children:[e.jsxs("div",{className:"term-dots",children:[e.jsx("span",{className:"dot dot-r"}),e.jsx("span",{className:"dot dot-y"}),e.jsx("span",{className:"dot dot-g"})]}),e.jsx("span",{className:"term-filename",children:"student@amr-cart: ~/ros2_ws (stdout)"})]}),e.jsx("div",{className:"terminal-logs-list",children:Rt.map(d=>{const o=d.levelNum>=S.num;return e.jsxs("div",{className:`terminal-log-line ${o?"log-visible":"log-filtered"}`,children:[e.jsxs("div",{className:"log-line-meta",children:[e.jsx("span",{className:"log-level-badge",style:{color:o?d.badgeColor:"#475569",borderColor:o?`${d.badgeColor}60`:"#334155"},children:d.tag}),e.jsx("span",{className:"log-source",children:d.source})]}),e.jsx("div",{className:"log-body",children:e.jsx("span",{className:"log-message",children:d.msg})}),e.jsx("div",{className:"log-filter-state",children:o?e.jsxs("span",{className:"state-badge-passed",title:"Emitted to console & /rosout",children:[e.jsx(ve,{size:11})," Printed"]}):e.jsxs("span",{className:"state-badge-filtered",title:"Suppressed by logger severity threshold",children:[e.jsx(Oe,{size:11})," Filtered"]})})]},d.level)})})]}),e.jsxs("div",{className:"cli-run-card",children:[e.jsx("div",{className:"cli-card-label",children:"Run Node with this Log Level:"}),e.jsxs("div",{className:"cli-code-row",children:[e.jsx("code",{className:"cli-code-text",children:f}),e.jsxs("button",{className:"cli-copy-btn",onClick:T,title:"Copy launch command to clipboard",children:[a?e.jsx(ve,{size:13,className:"text-green"}):e.jsx($e,{size:13}),e.jsx("span",{children:a?"Copied!":"Copy"})]})]})]}),e.jsxs("div",{className:"log-takeaway-box",children:[e.jsx("div",{className:"takeaway-icon",children:e.jsx(Ot,{size:16,className:"text-cyan"})}),e.jsxs("div",{className:"takeaway-text",children:[e.jsx("strong",{children:"Key Rule:"})," Setting ",e.jsxs("code",{className:"inline-code",children:["--log-level ",S.id]})," emits all messages with severity ",e.jsxs("strong",{children:["≥ ",S.num]}),". To silence spammy debug logs in production, keep the default at ",e.jsx("code",{className:"inline-code",children:"info"})," or raise it to ",e.jsx("code",{className:"inline-code",children:"warn"}),"."]})]})]})]})]})}function Ls(){const[s,t]=r.useState("box"),[a,p]=r.useState(8),[c,A]=r.useState(.3),[S,E]=r.useState(.14),[k,x]=r.useState(.4),[f,T]=r.useState(.06),[d,o]=r.useState(.035),[l,y]=r.useState(.03),[b,C]=r.useState(.04),[z,m]=r.useState(.06),[h,_]=r.useState(!1),v=r.useMemo(()=>{const n=Math.max(.001,parseFloat(a)||.1);if(s==="box"){const w=Math.max(.001,parseFloat(c)||.1),R=Math.max(.001,parseFloat(S)||.1),N=Math.max(.001,parseFloat(k)||.1),D=n/12*(R*R+N*N),I=n/12*(w*w+N*N),M=n/12*(w*w+R*R);return{ixx:D,iyy:I,izz:M,ixy:0,ixz:0,iyz:0}}else if(s==="cylinder"){const w=Math.max(.001,parseFloat(f)||.05),R=Math.max(.001,parseFloat(d)||.05),N=n/12*(3*w*w+R*R),D=N,I=n/2*(w*w);return{ixx:N,iyy:D,izz:I,ixy:0,ixz:0,iyz:0}}else if(s==="sphere"){const w=Math.max(.001,parseFloat(l)||.03),R=2/5*n*w*w;return{ixx:R,iyy:R,izz:R,ixy:0,ixz:0,iyz:0}}else{const w=Math.max(.001,parseFloat(b)||.02),R=Math.max(w+.001,parseFloat(z)||.05),N=Math.max(.001,parseFloat(d)||.05),D=n/12*(3*(w*w+R*R)+N*N),I=D,M=n/2*(w*w+R*R);return{ixx:D,iyy:I,izz:M,ixy:0,ixz:0,iyz:0}}},[s,a,c,S,k,f,d,l,b,z]),g=r.useMemo(()=>`<inertial>
  <origin xyz="0 0 0" rpy="0 0 0"/>
  <mass value="${parseFloat(a).toFixed(3)}"/>
  <inertia ixx="${v.ixx.toFixed(6)}" ixy="0.0" ixz="0.0"
           iyy="${v.iyy.toFixed(6)}" iyz="0.0"
           izz="${v.izz.toFixed(6)}"/>
</inertial>`,[a,v]),u=()=>{navigator.clipboard.writeText(g).then(()=>{_(!0),setTimeout(()=>_(!1),2200)})},i=n=>{n==="chassis"?(t("box"),p(8),x(.4),A(.3),E(.14)):n==="wheel"?(t("cylinder"),p(.8),T(.06),o(.035)):n==="lidar"?(t("cylinder"),p(.15),T(.04),o(.04)):n==="camera"?(t("box"),p(.08),x(.025),A(.09),E(.025)):n==="caster"&&(t("sphere"),p(.3),y(.03))};return e.jsxs("div",{className:"inertia-calculator-card",style:{background:"linear-gradient(145deg, #0d1527 0%, #080d1a 100%)",borderRadius:"16px",border:"1px solid #1e293b",boxShadow:"0 8px 32px rgba(0,0,0,0.4)",padding:"24px",margin:"28px 0",color:"#e2e8f0",fontFamily:"system-ui, -apple-system, sans-serif"},children:[e.jsxs("div",{style:{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:"20px",borderBottom:"1px solid #1e293b",paddingBottom:"14px"},children:[e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"12px"},children:[e.jsx("div",{style:{width:"36px",height:"36px",borderRadius:"10px",background:"linear-gradient(135deg, #00e5ff 0%, #0284c7 100%)",display:"flex",alignItems:"center",justifyContent:"center",boxShadow:"0 0 16px rgba(0, 229, 255, 0.4)"},children:e.jsx("span",{style:{fontSize:"18px",fontWeight:"bold",color:"#090d16"},children:"I"})}),e.jsxs("div",{children:[e.jsx("h3",{style:{margin:0,fontSize:"18px",fontWeight:"700",color:"#f8fafc"},children:"Interactive URDF Inertia Tensor Calculator"}),e.jsx("span",{style:{fontSize:"12px",color:"#94a3b8"},children:"Physics-accurate principal moments of inertia for primitive link geometries"})]})]}),e.jsx("span",{style:{fontSize:"11px",fontWeight:"700",textTransform:"uppercase",padding:"4px 10px",borderRadius:"20px",background:"rgba(0, 229, 255, 0.1)",color:"#00e5ff",border:"1px solid rgba(0, 229, 255, 0.3)"},children:"ROS 2 / Gazebo Ready"})]}),e.jsxs("div",{style:{marginBottom:"20px"},children:[e.jsx("label",{style:{fontSize:"11px",fontWeight:"700",color:"#94a3b8",textTransform:"uppercase",letterSpacing:"0.5px",display:"block",marginBottom:"8px"},children:"Quick Robot Presets:"}),e.jsxs("div",{style:{display:"flex",gap:"8px",flexWrap:"wrap"},children:[e.jsx("button",{onClick:()=>i("chassis"),style:Le,children:"📦 AMR Chassis (8kg Box)"}),e.jsx("button",{onClick:()=>i("wheel"),style:Le,children:"⚙️ Drive Wheel (0.8kg Cyl)"}),e.jsx("button",{onClick:()=>i("lidar"),style:Le,children:"📡 2D LiDAR Puck (0.15kg)"}),e.jsx("button",{onClick:()=>i("camera"),style:Le,children:"📷 RGB Camera (0.08kg)"}),e.jsx("button",{onClick:()=>i("caster"),style:Le,children:"⚪ Caster Ball (0.3kg)"})]})]}),e.jsx("div",{style:{display:"flex",gap:"8px",marginBottom:"22px",borderBottom:"1px solid #1e293b",paddingBottom:"12px"},children:[{id:"box",label:"Solid Box (Cuboid)",icon:"📦"},{id:"cylinder",label:"Solid Cylinder",icon:"🥫"},{id:"sphere",label:"Solid Sphere",icon:"⚽"},{id:"hollow_cylinder",label:"Hollow Cylinder",icon:"⭕"}].map(n=>e.jsxs("button",{onClick:()=>t(n.id),style:{padding:"8px 16px",borderRadius:"8px",border:"none",cursor:"pointer",fontWeight:"600",fontSize:"13px",background:s===n.id?"#0284c7":"#1e293b",color:s===n.id?"#ffffff":"#94a3b8",transition:"all 0.2s ease",display:"flex",alignItems:"center",gap:"6px"},children:[e.jsx("span",{children:n.icon}),e.jsx("span",{children:n.label})]},n.id))}),e.jsxs("div",{style:{display:"grid",gridTemplateColumns:"repeat(auto-fit, minmax(200px, 1fr))",gap:"16px",marginBottom:"24px"},children:[e.jsxs("div",{style:ne,children:[e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",marginBottom:"6px"},children:[e.jsx("span",{style:oe,children:"Mass (m)"}),e.jsxs("span",{style:re,children:[a," kg"]})]}),e.jsx("input",{type:"range",min:"0.01",max:"25",step:"0.01",value:a,onChange:n=>p(parseFloat(n.target.value)),style:{width:"100%",accentColor:"#00e5ff"}})]}),s==="box"&&e.jsxs(e.Fragment,{children:[e.jsxs("div",{style:ne,children:[e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",marginBottom:"6px"},children:[e.jsx("span",{style:oe,children:"Length / X Depth (d)"}),e.jsxs("span",{style:re,children:[k," m"]})]}),e.jsx("input",{type:"range",min:"0.01",max:"1.5",step:"0.005",value:k,onChange:n=>x(parseFloat(n.target.value)),style:{width:"100%",accentColor:"#ef4444"}})]}),e.jsxs("div",{style:ne,children:[e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",marginBottom:"6px"},children:[e.jsx("span",{style:oe,children:"Width / Y Lateral (w)"}),e.jsxs("span",{style:re,children:[c," m"]})]}),e.jsx("input",{type:"range",min:"0.01",max:"1.5",step:"0.005",value:c,onChange:n=>A(parseFloat(n.target.value)),style:{width:"100%",accentColor:"#10b981"}})]}),e.jsxs("div",{style:ne,children:[e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",marginBottom:"6px"},children:[e.jsx("span",{style:oe,children:"Height / Z Vertical (h)"}),e.jsxs("span",{style:re,children:[S," m"]})]}),e.jsx("input",{type:"range",min:"0.01",max:"1.0",step:"0.005",value:S,onChange:n=>E(parseFloat(n.target.value)),style:{width:"100%",accentColor:"#3b82f6"}})]})]}),(s==="cylinder"||s==="hollow_cylinder")&&e.jsxs(e.Fragment,{children:[s==="cylinder"?e.jsxs("div",{style:ne,children:[e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",marginBottom:"6px"},children:[e.jsx("span",{style:oe,children:"Radius (r)"}),e.jsxs("span",{style:re,children:[f," m"]})]}),e.jsx("input",{type:"range",min:"0.005",max:"0.5",step:"0.005",value:f,onChange:n=>T(parseFloat(n.target.value)),style:{width:"100%",accentColor:"#00e5ff"}})]}):e.jsxs(e.Fragment,{children:[e.jsxs("div",{style:ne,children:[e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",marginBottom:"6px"},children:[e.jsx("span",{style:oe,children:"Inner Radius (r1)"}),e.jsxs("span",{style:re,children:[b," m"]})]}),e.jsx("input",{type:"range",min:"0.005",max:"0.3",step:"0.005",value:b,onChange:n=>C(parseFloat(n.target.value)),style:{width:"100%",accentColor:"#00e5ff"}})]}),e.jsxs("div",{style:ne,children:[e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",marginBottom:"6px"},children:[e.jsx("span",{style:oe,children:"Outer Radius (r2)"}),e.jsxs("span",{style:re,children:[z," m"]})]}),e.jsx("input",{type:"range",min:"0.01",max:"0.5",step:"0.005",value:z,onChange:n=>m(parseFloat(n.target.value)),style:{width:"100%",accentColor:"#00e5ff"}})]})]}),e.jsxs("div",{style:ne,children:[e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",marginBottom:"6px"},children:[e.jsx("span",{style:oe,children:"Length / Height (l)"}),e.jsxs("span",{style:re,children:[d," m"]})]}),e.jsx("input",{type:"range",min:"0.005",max:"0.5",step:"0.005",value:d,onChange:n=>o(parseFloat(n.target.value)),style:{width:"100%",accentColor:"#3b82f6"}})]})]}),s==="sphere"&&e.jsxs("div",{style:ne,children:[e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",marginBottom:"6px"},children:[e.jsx("span",{style:oe,children:"Radius (r)"}),e.jsxs("span",{style:re,children:[l," m"]})]}),e.jsx("input",{type:"range",min:"0.005",max:"0.5",step:"0.005",value:l,onChange:n=>y(parseFloat(n.target.value)),style:{width:"100%",accentColor:"#00e5ff"}})]})]}),e.jsxs("div",{style:{display:"grid",gridTemplateColumns:"repeat(auto-fit, minmax(300px, 1fr))",gap:"20px"},children:[e.jsxs("div",{style:{background:"#090d16",padding:"16px",borderRadius:"12px",border:"1px solid #1e293b"},children:[e.jsx("div",{style:{fontSize:"11px",fontWeight:"700",color:"#94a3b8",textTransform:"uppercase",marginBottom:"10px"},children:"Computed Inertia Tensor Elements (kg·m²):"}),e.jsxs("div",{style:{display:"grid",gridTemplateColumns:"repeat(3, 1fr)",gap:"8px",textAlign:"center"},children:[e.jsxs("div",{style:le,children:[e.jsx("div",{style:{fontSize:"11px",color:"#ef4444"},children:"Ixx (Roll)"}),e.jsx("div",{style:{fontSize:"14px",fontWeight:"bold",color:"#f8fafc"},children:v.ixx.toFixed(5)})]}),e.jsxs("div",{style:le,children:[e.jsx("div",{style:{fontSize:"11px",color:"#94a3b8"},children:"Ixy"}),e.jsx("div",{style:{fontSize:"14px",fontWeight:"bold",color:"#64748b"},children:"0.00000"})]}),e.jsxs("div",{style:le,children:[e.jsx("div",{style:{fontSize:"11px",color:"#94a3b8"},children:"Ixz"}),e.jsx("div",{style:{fontSize:"14px",fontWeight:"bold",color:"#64748b"},children:"0.00000"})]}),e.jsxs("div",{style:le,children:[e.jsx("div",{style:{fontSize:"11px",color:"#94a3b8"},children:"Iyx"}),e.jsx("div",{style:{fontSize:"14px",fontWeight:"bold",color:"#64748b"},children:"0.00000"})]}),e.jsxs("div",{style:le,children:[e.jsx("div",{style:{fontSize:"11px",color:"#10b981"},children:"Iyy (Pitch)"}),e.jsx("div",{style:{fontSize:"14px",fontWeight:"bold",color:"#f8fafc"},children:v.iyy.toFixed(5)})]}),e.jsxs("div",{style:le,children:[e.jsx("div",{style:{fontSize:"11px",color:"#94a3b8"},children:"Iyz"}),e.jsx("div",{style:{fontSize:"14px",fontWeight:"bold",color:"#64748b"},children:"0.00000"})]}),e.jsxs("div",{style:le,children:[e.jsx("div",{style:{fontSize:"11px",color:"#94a3b8"},children:"Izx"}),e.jsx("div",{style:{fontSize:"14px",fontWeight:"bold",color:"#64748b"},children:"0.00000"})]}),e.jsxs("div",{style:le,children:[e.jsx("div",{style:{fontSize:"11px",color:"#94a3b8"},children:"Izy"}),e.jsx("div",{style:{fontSize:"14px",fontWeight:"bold",color:"#64748b"},children:"0.00000"})]}),e.jsxs("div",{style:le,children:[e.jsx("div",{style:{fontSize:"11px",color:"#3b82f6"},children:"Izz (Yaw)"}),e.jsx("div",{style:{fontSize:"14px",fontWeight:"bold",color:"#f8fafc"},children:v.izz.toFixed(5)})]})]})]}),e.jsxs("div",{style:{background:"#090d16",padding:"16px",borderRadius:"12px",border:"1px solid #1e293b",position:"relative"},children:[e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"8px"},children:[e.jsx("span",{style:{fontSize:"11px",fontWeight:"700",color:"#00e5ff",textTransform:"uppercase"},children:"Generated URDF <inertial> Snippet"}),e.jsx("button",{onClick:u,style:{background:h?"#10b981":"#1e293b",color:h?"#ffffff":"#38bdf8",border:"1px solid "+(h?"#10b981":"#38bdf8"),borderRadius:"6px",padding:"4px 10px",fontSize:"11px",fontWeight:"600",cursor:"pointer",transition:"all 0.2s ease"},children:h?"✓ Copied to Clipboard!":"📋 Copy XML"})]}),e.jsx("pre",{style:{margin:0,padding:"12px",background:"#040711",borderRadius:"8px",color:"#a5f3fc",fontFamily:"monospace",fontSize:"12px",lineHeight:"1.5",overflowX:"auto",border:"1px solid #162032"},children:g})]})]})]})}const ne={background:"#131c31",padding:"12px 14px",borderRadius:"8px",border:"1px solid #1e293b"},oe={fontSize:"12px",fontWeight:"600",color:"#94a3b8"},re={fontSize:"12px",fontWeight:"700",color:"#f8fafc"},Le={background:"#1e293b",color:"#cbd5e1",border:"1px solid #334155",borderRadius:"6px",padding:"5px 10px",fontSize:"11px",fontWeight:"600",cursor:"pointer",transition:"background 0.2s"},le={background:"#131b2e",padding:"8px 4px",borderRadius:"6px",border:"1px solid #1e293b"},Me={base_footprint:{name:"base_footprint",parentJoint:"None (Root Datum)",jointType:"root",rosPos:[0,0,0],rosRpy:[0,0,0],mass:"0.0 kg (Virtual)",inertia:"Ixx=0, Iyy=0, Izz=0",description:"Ground contact reference projection on floor (Z=0.0m). Used by Nav2 costmaps and footprint inflation.",color:"#06b6d4",category:"Kinematic Datum"},base_link:{name:"base_link",parentJoint:"base_footprint_joint (fixed)",jointType:"fixed",rosPos:[0,0,.06],rosRpy:[0,0,0],dimensions:"0.40m (L) x 0.30m (W) x 0.14m (H)",mass:"8.0 kg",inertia:"Ixx=0.073, Iyy=0.120, Izz=0.167",description:"Main structural chassis body. Origin is at the drive axle center line, elevated 0.06m above ground.",color:"#00c0e6",category:"Chassis"},left_wheel_link:{name:"left_wheel_link",parentJoint:"left_wheel_joint (continuous)",jointType:"continuous",axis:"Y-Axis [0 1 0]",rosPos:[0,.16,.06],rosRpy:[0,0,0],dimensions:"Radius=0.06m, Width=0.035m",mass:"0.8 kg",inertia:"Ixx=0.0008, Iyy=0.0008, Izz=0.0014",description:"Port-side actuated differential drive wheel. Continuous 360° rotation driven by motor velocity commands.",color:"#10b981",category:"Actuation"},right_wheel_link:{name:"right_wheel_link",parentJoint:"right_wheel_joint (continuous)",jointType:"continuous",axis:"Y-Axis [0 1 0]",rosPos:[0,-.16,.06],rosRpy:[0,0,0],dimensions:"Radius=0.06m, Width=0.035m",mass:"0.8 kg",inertia:"Ixx=0.0008, Iyy=0.0008, Izz=0.0014",description:"Starboard-side actuated differential drive wheel. Powered independently to provide differential steering.",color:"#10b981",category:"Actuation"},front_caster_link:{name:"front_caster_link",parentJoint:"front_caster_joint (fixed)",jointType:"fixed",rosPos:[.14,0,.03],rosRpy:[0,0,0],dimensions:"Sphere Radius=0.03m",mass:"0.3 kg",inertia:"Ixx=Iyy=Izz=0.0001",description:"Passive low-friction front support caster ball (mu1=0.001) preventing pitching while allowing multi-axis slip.",color:"#94a3b8",category:"Support"},rear_caster_link:{name:"rear_caster_link",parentJoint:"rear_caster_joint (fixed)",jointType:"fixed",rosPos:[-.14,0,.03],rosRpy:[0,0,0],dimensions:"Sphere Radius=0.03m",mass:"0.3 kg",inertia:"Ixx=Iyy=Izz=0.0001",description:"Passive low-friction rear support caster ball maintaining 3-point static equilibrium on flat facility floors.",color:"#94a3b8",category:"Support"},laser_frame:{name:"laser_frame",parentJoint:"laser_joint (fixed)",jointType:"fixed",rosPos:[.08,0,.22],rosRpy:[0,0,0],dimensions:"Cylinder Radius=0.04m, Height=0.04m",mass:"0.15 kg",inertia:"Ixx=Iyy=0.00008, Izz=0.00012",description:"2D Planar LiDAR sensor scanning 360° at 10Hz. Publishes sensor_msgs/LaserScan on topic /scan for SLAM & Nav2.",color:"#f59e0b",category:"Perception"},camera_link:{name:"camera_link",parentJoint:"camera_joint (fixed)",jointType:"fixed",rosPos:[.2,0,.08],rosRpy:[0,0,0],dimensions:"Box 0.025m x 0.09m x 0.025m",mass:"0.08 kg",inertia:"Ixx=0.00005, Iyy=0.00001, Izz=0.00005",description:"Student Challenge Asset: Modular RGB camera sensor macro (camera.xacro). Mounted on front chassis bumper to stream image frames and depth perception.",color:"#8b5cf6",category:"Student Challenge Asset"}};function Ms(){const s=r.useRef(null),[t,a]=r.useState("base_link"),[p,c]=r.useState(()=>{if(typeof window<"u"){const m=window.location.search||"",h=window.location.hash||"";if(m.includes("solids=false")||h.includes("solids=false"))return!1}return!0}),[A,S]=r.useState(!0),[E,k]=r.useState(!0),[x,f]=r.useState(!0),[T,d]=r.useState(0),[o,l]=r.useState({}),y=r.useRef({scene:null,camera:null,renderer:null,controls:null,animFrameId:null,tfGroups:{},visualMeshes:[],leftWheelGroup:null,rightWheelGroup:null,lidarPuckGroup:null,treeLineMesh:null,raycaster:new ls,mouse:new ba}),b=(m,h,_)=>new ke(-h,_,-m);r.useEffect(()=>{const m=s.current;if(!m)return;const h=m.clientWidth||800,_=520,v=new xa;v.background=new _a(659229);const g=new ja(40,h/_,.05,50);g.position.set(1.1,.9,1.2);const u=new wa({antialias:!0,alpha:!0,powerPreference:"high-performance"});u.setSize(h,_),u.setPixelRatio(Math.min(window.devicePixelRatio,2)),u.shadowMap.enabled=!0,u.shadowMap.type=Sa,u.toneMapping=Na,u.toneMappingExposure=1.15,m.appendChild(u.domElement);const i=new Ca(g,u.domElement);i.enableDamping=!0,i.dampingFactor=.08,i.target.set(0,.12,0),i.minDistance=.4,i.maxDistance=4,i.maxPolarAngle=Math.PI/2+.05;const n=new ka(16777215,.85);v.add(n);const w=new _t(16777215,1.6);w.position.set(2,4,2),w.castShadow=!0,w.shadow.mapSize.width=1024,w.shadow.mapSize.height=1024,v.add(w);const R=new _t(440020,.6);R.position.set(-3,2,-3),v.add(R);const N=new _t(1976635,.4);N.position.set(0,-2,0),v.add(N);const D=new za(4,16,440020,1976635);D.position.y=0,v.add(D);const I=new Ra(.55,.45),M=new Ce({color:0,transparent:!0,opacity:.45,depthWrite:!1}),$=new W(I,M);$.rotation.x=-Math.PI/2,$.position.set(0,.001,0),v.add($);const L=new X;v.add(L);const j=[],P={},G=(q=.1)=>{const K=new X,Ne=q,ae=q*.28,te=Ne-ae,ye=q*.035,Y=q*.08,xt=(ea,ta)=>{const it=new X,sa=new fe(ye,ye,te,12),ss=new Ce({color:ta}),as=new W(sa,ss);as.position.y=te/2,it.add(as);const aa=new Da(Y,ae,16),is=new W(aa,ss);is.position.y=te+ae/2,it.add(is);const ia=new ke(0,1,0),na=new Ea().setFromUnitVectors(ia,ea.clone().normalize());return it.quaternion.copy(na),it},Ys=xt(new ke(0,0,-1),15680580),Qs=xt(new ke(-1,0,0),1096065),Xs=xt(new ke(0,1,0),3900150);K.add(Ys),K.add(Qs),K.add(Xs);const Js=new ds(q*.07,12,12),Zs=new Ce({color:16777215});return K.add(new W(Js,Zs)),K},O=new X;O.position.set(0,0,0),L.add(O);const F=G(.12);O.add(F),P.base_footprint=F;const U=new X;U.position.copy(b(0,0,.06)),L.add(U);const J=G(.14);U.add(J),P.base_link=J;const B=new rt(.3,.14,.4),Q=new me({color:49382,metalness:.65,roughness:.25,envMapIntensity:1}),H=new W(B,Q);H.position.set(0,.07,0),H.castShadow=!0,H.receiveShadow=!0,H.userData={linkName:"base_link"},U.add(H),j.push(H);const Ae=new rt(.28,.005,.38),mt=new me({color:1120295,roughness:.8}),Pe=new W(Ae,mt);Pe.position.set(0,.141,0),U.add(Pe),j.push(Pe);const He=new rt(.22,.015,.005),Ke=new Ce({color:58879}),De=new W(He,Ke);De.position.set(0,.04,-.201),U.add(De),j.push(De);const ee=new X;ee.position.copy(b(0,.16,.06)),L.add(ee);const Gt=G(.09);ee.add(Gt),P.left_wheel_link=Gt;const gt=new fe(.06,.06,.035,32);gt.rotateZ(Math.PI/2);const Bt=new me({color:1579035,roughness:.9,metalness:.1}),Ye=new W(gt,Bt);Ye.castShadow=!0,Ye.userData={linkName:"left_wheel_link"},ee.add(Ye),j.push(Ye);const ut=new fe(.038,.038,.036,16);ut.rotateZ(Math.PI/2);const $t=new me({color:3718648,metalness:.8,roughness:.3}),Wt=new W(ut,$t);ee.add(Wt),j.push(Wt);const je=new X;je.position.copy(b(0,-.16,.06)),L.add(je);const qt=G(.09);je.add(qt),P.right_wheel_link=qt;const Qe=new W(gt,Bt);Qe.castShadow=!0,Qe.userData={linkName:"right_wheel_link"},je.add(Qe),j.push(Qe);const Ut=new W(ut,$t);je.add(Ut),j.push(Ut);const Xe=new X;Xe.position.copy(b(.14,0,.03)),L.add(Xe);const Vt=G(.08);Xe.add(Vt),P.front_caster_link=Vt;const Ht=new ds(.03,24,24),Kt=new me({color:14870768,metalness:.95,roughness:.15}),Je=new W(Ht,Kt);Je.castShadow=!0,Je.userData={linkName:"front_caster_link"},Xe.add(Je),j.push(Je);const Ze=new X;Ze.position.copy(b(-.14,0,.03)),L.add(Ze);const Yt=G(.08);Ze.add(Yt),P.rear_caster_link=Yt;const et=new W(Ht,Kt);et.castShadow=!0,et.userData={linkName:"rear_caster_link"},Ze.add(et),j.push(et);const Ee=new X;Ee.position.copy(b(.08,0,.22)),L.add(Ee);const Qt=G(.11);Ee.add(Qt),P.laser_frame=Qt;const Fs=new fe(.045,.045,.02,28),Os=new me({color:16347926,roughness:.4}),tt=new W(Fs,Os);tt.position.y=-.01,tt.userData={linkName:"laser_frame"},Ee.add(tt),j.push(tt);const we=new X;Ee.add(we);const Gs=new fe(.04,.04,.025,28),Bs=new me({color:1120295,roughness:.3,metalness:.5}),st=new W(Gs,Bs);st.position.y=.0125,st.userData={linkName:"laser_frame"},we.add(st),j.push(st);const $s=new fe(.041,.041,.008,28),Ws=new Ce({color:15680580}),ht=new W($s,Ws);ht.position.y=.0125,we.add(ht),j.push(ht);const Se=new X;Se.position.copy(b(.2,0,.08)),L.add(Se);const Xt=G(.09);Se.add(Xt),P.camera_link=Xt;const qs=new rt(.09,.025,.025),Us=new me({color:3223169,roughness:.4,metalness:.7}),at=new W(qs,Us);at.castShadow=!0,at.userData={linkName:"camera_link"},Se.add(at),j.push(at);const vt=new fe(.007,.007,.005,16);vt.rotateX(Math.PI/2);const Jt=new Ce({color:3718648}),yt=new W(vt,Jt);yt.position.set(-.025,0,-.013),Se.add(yt);const ft=new W(vt,Jt);ft.position.set(.025,0,-.013),Se.add(ft),j.push(yt,ft);const Vs=[b(0,0,0),b(0,0,.06),b(0,0,.06),b(0,.16,.06),b(0,0,.06),b(0,-.16,.06),b(0,0,.06),b(.14,0,.03),b(0,0,.06),b(-.14,0,.03),b(0,0,.06),b(.08,0,.22),b(0,0,.06),b(.2,0,.08)],Hs=new Ta().setFromPoints(Vs),Ks=new Aa({color:440020,dashSize:.025,gapSize:.015,linewidth:1.5,transparent:!0,opacity:.75}),bt=new Pa(Hs,Ks);bt.computeLineDistances(),v.add(bt),y.current={scene:v,camera:g,renderer:u,controls:i,animFrameId:null,tfGroups:P,visualMeshes:j,leftWheelGroup:ee,rightWheelGroup:je,lidarPuckGroup:we,treeLineMesh:bt,raycaster:new ls},j.forEach(q=>{q.visible=p});const Zt=()=>{y.current.animFrameId=requestAnimationFrame(Zt),i.update(),we&&(we.rotation.y+=.04);const q={};Object.keys(Me).forEach(K=>{const Ne=P[K];if(Ne){const ae=new ke;Ne.getWorldPosition(ae),ae.y+=.025;const te=ae.project(g);if(te.z<1){const ye=(te.x*.5+.5)*h,Y=(-(te.y*.5)+.5)*_;q[K]={x:ye,y:Y,visible:!0}}else q[K]={visible:!1}}}),l(q),u.render(v,g)};Zt();const es=q=>{const K=u.domElement.getBoundingClientRect(),Ne=(q.clientX-K.left)/K.width*2-1,ae=-((q.clientY-K.top)/K.height)*2+1,te=y.current.raycaster;te.setFromCamera({x:Ne,y:ae},g);const ye=te.intersectObjects(j.filter(Y=>Y.visible),!0);if(ye.length>0){let Y=ye[0].object;for(;Y&&!Y.userData.linkName&&Y.parent;)Y=Y.parent;Y&&Y.userData.linkName&&a(Y.userData.linkName)}};u.domElement.addEventListener("click",es);const ts=()=>{if(!m)return;const q=m.clientWidth;g.aspect=q/_,g.updateProjectionMatrix(),u.setSize(q,_)};return window.addEventListener("resize",ts),()=>{window.removeEventListener("resize",ts),y.current.animFrameId&&cancelAnimationFrame(y.current.animFrameId),u.domElement&&(u.domElement.removeEventListener("click",es),m.removeChild(u.domElement)),u.dispose()}},[]),r.useEffect(()=>{const{visualMeshes:m}=y.current;m&&m.forEach(h=>{h.visible=p})},[p]),r.useEffect(()=>{const{tfGroups:m}=y.current;m&&Object.values(m).forEach(h=>{h.visible=A})},[A]),r.useEffect(()=>{const{treeLineMesh:m}=y.current;m&&(m.visible=x)},[x]),r.useEffect(()=>{const{leftWheelGroup:m,rightWheelGroup:h}=y.current;!m||!h||(m.rotation.x=T,h.rotation.x=T)},[T]);const C=m=>{const{camera:h,controls:_}=y.current;!h||!_||(m==="iso"?(h.position.set(1.1,.9,1.2),_.target.set(0,.12,0)):m==="top"?(h.position.set(0,2,.001),_.target.set(0,0,0)):m==="front"?(h.position.set(0,.25,-1.5),_.target.set(0,.12,0)):m==="side"&&(h.position.set(-1.6,.25,0),_.target.set(0,.12,0)),_.update())},z=Me[t]||Me.base_link;return e.jsxs("div",{className:"interactive-urdf-viewer-container",style:{margin:"2rem 0",borderRadius:"14px",border:"1px solid var(--border-color)",overflow:"hidden",background:"#0a0f1d",boxShadow:"0 20px 40px rgba(0, 0, 0, 0.45)",fontFamily:"var(--font-sans, system-ui, sans-serif)"},children:[e.jsxs("div",{style:{background:"linear-gradient(135deg, rgba(6, 182, 212, 0.15) 0%, rgba(14, 165, 233, 0.08) 100%)",padding:"0.9rem 1.4rem",borderBottom:"1px solid rgba(255, 255, 255, 0.08)",display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:"0.75rem"},children:[e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"0.65rem"},children:[e.jsx("div",{style:{width:"32px",height:"32px",borderRadius:"8px",background:"rgba(6, 182, 212, 0.2)",border:"1px solid rgba(6, 182, 212, 0.4)",display:"flex",alignItems:"center",justifyContent:"center",color:"#06b6d4"},children:e.jsx(Te,{size:18})}),e.jsxs("div",{children:[e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"0.5rem"},children:[e.jsx("span",{style:{fontSize:"0.72rem",fontWeight:700,textTransform:"uppercase",letterSpacing:"0.05em",color:"#06b6d4"},children:"Interactive 3D WebGL Digital Twin"}),e.jsx("span",{style:{fontSize:"0.68rem",padding:"1px 6px",borderRadius:"4px",background:"rgba(16, 185, 129, 0.15)",color:"#10b981",border:"1px solid rgba(16, 185, 129, 0.3)",fontWeight:600},children:"REP 103 TF ACTIVE"})]}),e.jsx("h3",{style:{margin:0,fontSize:"1.15rem",fontWeight:700,color:"#f8fafc"},children:"Nexus AMR — Live URDF & TF Kinematics Visualizer"})]})]}),e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"0.4rem"},children:[e.jsx("span",{style:{fontSize:"0.75rem",color:"#94a3b8",marginRight:"0.2rem"},children:"Views:"}),["iso","front","side","top"].map(m=>e.jsx("button",{onClick:()=>C(m),style:{background:"rgba(255, 255, 255, 0.05)",border:"1px solid rgba(255, 255, 255, 0.12)",color:"#cbd5e1",padding:"0.3rem 0.65rem",borderRadius:"6px",fontSize:"0.75rem",cursor:"pointer",fontWeight:600,textTransform:"capitalize",transition:"all 0.15s ease"},onMouseEnter:h=>h.currentTarget.style.background="rgba(6, 182, 212, 0.25)",onMouseLeave:h=>h.currentTarget.style.background="rgba(255, 255, 255, 0.05)",children:m==="iso"?"Isometric":m},m)),e.jsx("button",{onClick:()=>C("iso"),title:"Reset Camera View",style:{background:"rgba(255, 255, 255, 0.05)",border:"1px solid rgba(255, 255, 255, 0.12)",color:"#94a3b8",padding:"0.3rem 0.5rem",borderRadius:"6px",cursor:"pointer"},children:e.jsx(Z,{size:14})})]})]}),e.jsxs("div",{style:{background:"rgba(15, 23, 42, 0.85)",padding:"0.6rem 1.2rem",borderBottom:"1px solid rgba(255, 255, 255, 0.06)",display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:"0.75rem",fontSize:"0.8rem"},children:[e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"0.85rem",flexWrap:"wrap"},children:[e.jsx("span",{style:{color:"#06b6d4",fontWeight:700,fontSize:"0.76rem",textTransform:"uppercase",letterSpacing:"0.04em"},children:"Display Toggles:"}),e.jsxs("label",{style:{display:"flex",alignItems:"center",gap:"0.35rem",color:"#cbd5e1",cursor:"pointer"},children:[e.jsx("input",{type:"checkbox",checked:p,onChange:m=>c(m.target.checked),style:{accentColor:"#06b6d4"}}),e.jsx("span",{style:{fontWeight:600},children:"Solid Bodies"})]}),e.jsxs("label",{style:{display:"flex",alignItems:"center",gap:"0.35rem",color:"#cbd5e1",cursor:"pointer"},children:[e.jsx("input",{type:"checkbox",checked:A,onChange:m=>S(m.target.checked),style:{accentColor:"#06b6d4"}}),e.jsx("span",{style:{fontWeight:600},children:"TF Trihedrons (REP 103)"})]}),e.jsxs("label",{style:{display:"flex",alignItems:"center",gap:"0.35rem",color:"#cbd5e1",cursor:"pointer"},children:[e.jsx("input",{type:"checkbox",checked:E,onChange:m=>k(m.target.checked),style:{accentColor:"#06b6d4"}}),e.jsx("span",{children:"Frame Badges"})]}),e.jsxs("label",{style:{display:"flex",alignItems:"center",gap:"0.35rem",color:"#cbd5e1",cursor:"pointer"},children:[e.jsx("input",{type:"checkbox",checked:x,onChange:m=>f(m.target.checked),style:{accentColor:"#06b6d4"}}),e.jsx("span",{children:"Kinematic Parent Lines"})]})]}),e.jsxs("div",{style:{fontSize:"0.74rem",color:"#94a3b8"},children:[e.jsx("span",{children:"Active Model: "}),e.jsx("span",{style:{color:"#38bdf8",fontFamily:"var(--font-mono)"},children:"nexus_amr.urdf.xacro"})]})]}),e.jsxs("div",{style:{position:"relative",width:"100%",height:"520px",overflow:"hidden"},children:[e.jsx("div",{ref:s,style:{width:"100%",height:"100%",cursor:"grab"}}),E&&A&&Object.keys(o).map(m=>{const h=o[m];if(!h||!h.visible)return null;const _=t===m;return e.jsx("div",{onClick:()=>a(m),style:{position:"absolute",left:`${h.x}px`,top:`${h.y}px`,transform:"translate(-50%, -100%)",background:_?"#06b6d4":"rgba(15, 23, 42, 0.85)",color:_?"#0a0f1d":"#f1f5f9",border:`1px solid ${_?"#22d3ee":"rgba(255, 255, 255, 0.2)"}`,backdropFilter:"blur(4px)",padding:"2px 7px",borderRadius:"4px",fontSize:"0.72rem",fontFamily:"var(--font-mono, monospace)",fontWeight:700,pointerEvents:"auto",cursor:"pointer",zIndex:_?20:10,boxShadow:_?"0 0 12px rgba(6, 182, 212, 0.6)":"0 2px 4px rgba(0,0,0,0.5)",transition:"background 0.15s ease, transform 0.15s ease",userSelect:"none"},children:m},m)}),e.jsxs("div",{style:{position:"absolute",top:"12px",left:"14px",width:"320px",background:"rgba(10, 15, 29, 0.88)",backdropFilter:"blur(10px)",border:"1px solid rgba(255, 255, 255, 0.12)",borderRadius:"10px",padding:"0.9rem 1.1rem",color:"#e2e8f0",fontSize:"0.8rem",pointerEvents:"auto",boxShadow:"0 8px 24px rgba(0, 0, 0, 0.6)",zIndex:15},children:[e.jsxs("div",{style:{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:"0.4rem"},children:[e.jsxs("span",{style:{fontSize:"0.7rem",textTransform:"uppercase",letterSpacing:"0.04em",fontWeight:700,color:z.color},children:["Link Inspector: ",z.category]}),e.jsx("span",{style:{fontFamily:"var(--font-mono, monospace)",fontSize:"0.72rem",color:"#94a3b8",background:"rgba(255,255,255,0.06)",padding:"1px 6px",borderRadius:"4px"},children:z.jointType})]}),e.jsxs("h4",{style:{margin:"0 0 0.5rem 0",fontSize:"1.05rem",fontWeight:700,color:"#38bdf8",fontFamily:"var(--font-mono, monospace)",display:"flex",alignItems:"center",gap:"0.4rem"},children:[e.jsx("span",{children:"🔗"})," ",z.name]}),e.jsxs("div",{style:{display:"grid",gridTemplateColumns:"85px 1fr",gap:"0.3rem",fontSize:"0.76rem",marginBottom:"0.55rem"},children:[e.jsx("span",{style:{color:"#94a3b8"},children:"Parent Joint:"}),e.jsx("span",{style:{fontFamily:"var(--font-mono)",color:"#cbd5e1"},children:z.parentJoint}),e.jsx("span",{style:{color:"#94a3b8"},children:"ROS Position:"}),e.jsxs("span",{style:{fontFamily:"var(--font-mono)",color:"#f59e0b"},children:["[",z.rosPos.map(m=>m.toFixed(2)).join(", "),"] m"]}),z.axis&&e.jsxs(e.Fragment,{children:[e.jsx("span",{style:{color:"#94a3b8"},children:"Revolute Axis:"}),e.jsx("span",{style:{fontFamily:"var(--font-mono)",color:"#10b981"},children:z.axis})]}),e.jsx("span",{style:{color:"#94a3b8"},children:"Mass (kg):"}),e.jsx("span",{style:{fontFamily:"var(--font-mono)",color:"#cbd5e1"},children:z.mass}),e.jsx("span",{style:{color:"#94a3b8"},children:"Inertia Tensor:"}),e.jsx("span",{style:{fontFamily:"var(--font-mono)",color:"#94a3b8"},children:z.inertia})]}),e.jsx("p",{style:{margin:0,fontSize:"0.74rem",color:"#94a3b8",lineHeight:1.45,borderTop:"1px solid rgba(255,255,255,0.08)",paddingTop:"0.45rem"},children:z.description})]}),e.jsxs("div",{style:{position:"absolute",bottom:"12px",left:"14px",background:"rgba(10, 15, 29, 0.85)",backdropFilter:"blur(8px)",border:"1px solid rgba(255, 255, 255, 0.12)",borderRadius:"8px",padding:"0.55rem 0.9rem",display:"flex",alignItems:"center",gap:"0.85rem",fontSize:"0.75rem",fontFamily:"var(--font-mono, monospace)",zIndex:15},children:[e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"0.35rem"},children:[e.jsx("span",{style:{width:"9px",height:"9px",borderRadius:"50%",background:"#ef4444"}}),e.jsx("strong",{style:{color:"#ef4444"},children:"+X: Forward"})]}),e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"0.35rem"},children:[e.jsx("span",{style:{width:"9px",height:"9px",borderRadius:"50%",background:"#10b981"}}),e.jsx("strong",{style:{color:"#10b981"},children:"+Y: Port Left"})]}),e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"0.35rem"},children:[e.jsx("span",{style:{width:"9px",height:"9px",borderRadius:"50%",background:"#3b82f6"}}),e.jsx("strong",{style:{color:"#3b82f6"},children:"+Z: Upward"})]})]}),e.jsxs("div",{style:{position:"absolute",bottom:"12px",right:"14px",background:"rgba(10, 15, 29, 0.88)",backdropFilter:"blur(8px)",border:"1px solid rgba(255, 255, 255, 0.12)",borderRadius:"8px",padding:"0.65rem 1rem",display:"flex",alignItems:"center",gap:"0.8rem",zIndex:15},children:[e.jsx(qe,{size:16,color:"#06b6d4"}),e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"0.2rem"},children:[e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",fontSize:"0.72rem",color:"#cbd5e1"},children:[e.jsx("span",{children:"Drive Joint Angle:"}),e.jsxs("span",{style:{fontFamily:"var(--font-mono)",color:"#06b6d4",fontWeight:700},children:[(T*180/Math.PI).toFixed(0),"°"]})]}),e.jsx("input",{type:"range",min:-Math.PI*2,max:Math.PI*2,step:.05,value:T,onChange:m=>d(parseFloat(m.target.value)),style:{width:"130px",accentColor:"#06b6d4"}})]}),e.jsx("button",{onClick:()=>d(0),title:"Reset Wheel Angle",style:{background:"rgba(255, 255, 255, 0.08)",border:"1px solid rgba(255,255,255,0.15)",color:"#94a3b8",padding:"0.25rem 0.5rem",borderRadius:"4px",cursor:"pointer",fontSize:"0.7rem"},children:"Reset"})]}),e.jsx("div",{style:{position:"absolute",top:"12px",right:"14px",background:"rgba(10, 15, 29, 0.7)",border:"1px solid rgba(255, 255, 255, 0.08)",borderRadius:"6px",padding:"3px 8px",fontSize:"0.7rem",color:"#64748b",pointerEvents:"none",zIndex:10},children:"🖱️ Left Click: Rotate • Right Click: Pan • Scroll: Zoom"})]}),e.jsxs("div",{style:{background:"rgba(15, 23, 42, 0.95)",padding:"0.65rem 1.2rem",borderTop:"1px solid rgba(255, 255, 255, 0.08)",display:"flex",alignItems:"center",gap:"0.45rem",overflowX:"auto",scrollbarWidth:"thin"},children:[e.jsx("span",{style:{fontSize:"0.74rem",color:"#94a3b8",flexShrink:0,marginRight:"0.3rem"},children:"Kinematic Links:"}),Object.keys(Me).map(m=>{const h=t===m,_=Me[m];return e.jsxs("button",{onClick:()=>a(m),style:{background:h?"rgba(6, 182, 212, 0.2)":"rgba(255, 255, 255, 0.04)",border:`1px solid ${h?"#06b6d4":"rgba(255, 255, 255, 0.1)"}`,color:h?"#38bdf8":"#94a3b8",borderRadius:"6px",padding:"0.25rem 0.6rem",fontSize:"0.74rem",fontFamily:"var(--font-mono, monospace)",fontWeight:h?700:500,cursor:"pointer",flexShrink:0,display:"flex",alignItems:"center",gap:"0.35rem",transition:"all 0.15s ease"},children:[e.jsx("span",{style:{width:"6px",height:"6px",borderRadius:"50%",background:_.color}}),m]},m)})]})]})}function Xa({lesson:s,onSelectLesson:t,onNavigateHub:a,isCompleted:p,onToggleComplete:c,savedScore:A,onRecordScore:S}){const E=r.useRef(null),[k,x]=r.useState(null),[f,T]=r.useState(null),[d,o]=r.useState(null),[l,y]=r.useState(null),[b,C]=r.useState(null),[z,m]=r.useState(null),[h,_]=r.useState(null),[v,g]=r.useState(null),[u,i]=r.useState(null),[n,w]=r.useState(null);return r.useEffect(()=>{const R=D=>{const I=D.target.closest("img");if(I){if(I.closest(".image-lightbox-overlay")||I.closest(".nav-logo")||I.closest(".status-icon")||I.closest(".user-avatar"))return;D.preventDefault(),D.stopPropagation(),w({src:I.currentSrc||I.src,alt:I.alt||"High-Resolution Diagram View",caption:I.getAttribute("title")||I.alt||""})}},N=D=>{D.key==="Escape"&&w(null)};return document.addEventListener("click",R),window.addEventListener("keydown",N),()=>{document.removeEventListener("click",R),window.removeEventListener("keydown",N)}},[]),r.useEffect(()=>(n?document.body.style.overflow="hidden":document.body.style.overflow="",()=>{document.body.style.overflow=""}),[n]),r.useEffect(()=>{x(null),T(null),o(null),y(null),C(null),m(null),_(null),g(null),i(null),x(document.getElementById("interactive-permission-calculator-root")),T(document.getElementById("turtlesim-teleop-flow-root")),o(document.getElementById("package-structure-flow-root")),y(document.getElementById("pubsub-flow-root")),C(document.getElementById("service-flow-root")),m(document.getElementById("action-flow-root")),_(document.getElementById("log-levels-circle-root")),g(document.getElementById("interactive-inertia-calculator-root")),i(document.getElementById("interactive-urdf-viewer-root"))},[s.id,s.html_content]),r.useEffect(()=>{window.scrollTo({top:0,behavior:"smooth"})},[s.id]),r.useEffect(()=>{if(!E.current)return;E.current.querySelectorAll("img").forEach(D=>{D.classList.add("lesson-image");const I=D.parentElement;I&&I.tagName.toLowerCase()==="p"&&I.classList.add("lesson-image-wrapper")}),E.current.querySelectorAll("pre").forEach(D=>{let I=D.querySelector("code");if(!I){const O=document.createElement("code");O.innerHTML=D.innerHTML,D.innerHTML="",D.appendChild(O),I=O}let M=D.closest(".ide-code-window");const $=D.closest(".code-container");let L="code";if(I.classList.forEach(O=>{O.startsWith("language-")&&(L=O.replace("language-","").toLowerCase())}),L==="code"&&$&&$.getAttribute("data-language")&&(L=$.getAttribute("data-language").toLowerCase()),!I.classList.contains("hljs")&&L!=="filepath"&&L!=="text"){const O=I.textContent||"";if(L&&be.getLanguage(L))try{const F=be.highlight(O,{language:L,ignoreIllegals:!0});I.innerHTML=F.value,I.classList.add("hljs")}catch{be.highlightElement(I)}else be.highlightElement(I)}if(!M)if($)$.classList.add("ide-code-window"),M=$;else{const O=document.createElement("div");O.className="ide-code-window",D.parentNode.insertBefore(O,D),O.appendChild(D),M=O}let j=M.querySelector(".ide-header, .code-header");j?j.className="ide-header":(j=document.createElement("div"),j.className="ide-header",M.insertBefore(j,D));const P=L==="bash"?"bash — terminal":L==="filepath"?"filepath — workspace":L==="python"?"python — script":L==="json"?"json — config":L==="xml"?"xml / urdf":L==="yaml"?"yaml — config":L==="text"?"output / log":L,G=L==="bash"?"❯_":L==="filepath"?"📁":L==="python"?"🐍":L==="json"?"{ }":L==="xml"?"</>":L==="yaml"?"⚙️":L==="text"?"📋":"📄";j.innerHTML=`
        <div class="ide-controls">
          <span class="ide-dot ide-dot-red"></span>
          <span class="ide-dot ide-dot-yellow"></span>
          <span class="ide-dot ide-dot-green"></span>
        </div>
        <div class="ide-tab">
          <span class="ide-tab-icon">${G}</span>
          <span class="ide-tab-name">${P}</span>
        </div>
        <button class="copy-code-btn" title="Copy code snippet">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
          </svg>
          <span>Copy</span>
        </button>
      `})},[s.id,s.html_content]),r.useEffect(()=>{if(!E.current)return;const R=I=>{const M=I.target.closest(".copy-code-btn, .copy-btn");if(!M)return;const $=M.closest(".ide-code-window")||M.closest(".code-container")||M.closest("pre"),L=$?$.querySelector("code"):null;if(!L)return;const j=L.textContent||L.innerText;navigator.clipboard.writeText(j).catch(()=>{}),fetch("/api/clipboard",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({text:j})}).catch(()=>{});const P=M.innerHTML;M.innerHTML="✅ Copied!",M.classList.add("copied"),setTimeout(()=>{M.innerHTML=P,M.classList.remove("copied")},2e3)},N=I=>{const M=I.target.closest(".internal-lesson-link");if(!M)return;I.preventDefault();const $=M.getAttribute("data-lesson");$&&t(`lesson_${$}`)},D=E.current;return D.addEventListener("click",R),D.addEventListener("click",N),()=>{D.removeEventListener("click",R),D.removeEventListener("click",N)}},[s.id,t]),e.jsxs("div",{className:"lesson-view-container fade-in",children:[e.jsxs("nav",{className:"lesson-breadcrumbs",children:[e.jsx("button",{onClick:a,className:"breadcrumb-btn",children:"Curriculum Hub"}),e.jsx("span",{className:"breadcrumb-sep",children:"/"}),e.jsx("span",{className:"breadcrumb-module",children:s.module}),e.jsx("span",{className:"breadcrumb-sep",children:"/"}),e.jsxs("span",{className:"breadcrumb-active",children:["Lesson ",s.num_str]})]}),e.jsxs("header",{className:"lesson-main-header",children:[e.jsxs("div",{className:"lesson-header-meta",children:[e.jsx("span",{className:"module-badge",children:s.module}),e.jsxs("span",{className:"duration-badge",children:[e.jsx(ks,{size:13}),e.jsx("span",{children:s.duration})]}),e.jsx("span",{className:"level-badge",children:"ROS 2 Jazzy"})]}),e.jsxs("div",{className:"lesson-title-action-row",children:[e.jsxs("h1",{className:"lesson-main-title",children:[e.jsxs("span",{className:"title-num",children:["Lesson ",s.num_str,":"]})," ",s.title]}),e.jsxs("button",{onClick:()=>c(s.id),className:`lesson-complete-toggle-btn ${p?"completed":""}`,title:p?"Lesson marked complete. Click to uncheck.":"Click to mark lesson complete",children:[p?e.jsx(Fe,{size:18}):e.jsx(xs,{size:18}),e.jsx("span",{children:p?"Completed":"Mark as Complete"})]})]}),s.focus&&e.jsxs("div",{className:"lesson-focus-card",children:[e.jsx("strong",{children:"Focus:"})," ",s.focus]})]}),s.snapshot&&s.snapshot.length>0&&e.jsxs("div",{className:"concept-snapshot-card",children:[e.jsxs("div",{className:"snapshot-header",children:[e.jsx(Ve,{size:18,className:"zap-icon"}),e.jsx("h3",{children:"Quick Concept Snapshot"})]}),e.jsx("ul",{className:"snapshot-list",children:s.snapshot.map((R,N)=>Array.isArray(R)?e.jsxs("li",{children:[e.jsxs("strong",{children:[R[0],":"]})," ",R[1]]},N):e.jsx("li",{children:R},N))})]}),(()=>{const R=zt[s.id];return R?e.jsx(We.Suspense,{fallback:e.jsx("div",{className:"lesson-loading-spinner",style:{padding:"3rem",textAlign:"center",color:"var(--text-muted)"},children:e.jsx("p",{children:"Loading interactive lesson..."})}),children:e.jsx(R,{})}):e.jsx("article",{ref:E,className:"markdown-body lesson-body-content",dangerouslySetInnerHTML:{__html:s.html_content}})})(),k&&!zt[s.id]&&se.createPortal(e.jsx(Rs,{}),k),f&&!zt[s.id]&&se.createPortal(e.jsx(Ts,{}),f),d&&se.createPortal(e.jsx(As,{}),d),l&&se.createPortal(e.jsx(Ps,{}),l),b&&se.createPortal(e.jsx(Ds,{}),b),z&&se.createPortal(e.jsx(Es,{}),z),u&&se.createPortal(e.jsx(Ms,{}),u),v&&se.createPortal(e.jsx(Ls,{}),v),h&&se.createPortal(e.jsx(Is,{}),h),s.has_quiz&&e.jsx("section",{className:"lesson-quiz-section",children:e.jsx(Ka,{lessonId:s.id,quizzes:s.quizzes,savedScore:A,onRecordScore:S})}),e.jsxs("section",{className:"lesson-bottom-completion-card",style:{margin:"2.5rem 0 1rem",padding:"1.5rem 1.75rem",borderRadius:"14px",background:p?"rgba(16, 185, 129, 0.08)":"var(--bg-surface)",border:p?"1px solid rgba(16, 185, 129, 0.3)":"1px solid var(--border-color)",display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:"1.25rem",boxShadow:"var(--shadow-sm)"},children:[e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"1rem"},children:[e.jsx("div",{style:{width:44,height:44,borderRadius:"10px",background:p?"var(--success)":"var(--bg-sidebar)",color:p?"#fff":"var(--accent-primary)",display:"flex",alignItems:"center",justifyContent:"center"},children:p?e.jsx(Fe,{size:22}):e.jsx(Mt,{size:22})}),e.jsxs("div",{children:[e.jsx("h4",{style:{margin:"0 0 3px",fontSize:"1.05rem",fontWeight:800,color:"var(--text-primary)"},children:p?"✓ Lesson Completed":"Completed this Lesson?"}),e.jsx("p",{style:{margin:0,fontSize:"0.86rem",color:"var(--text-secondary)"},children:p?"Your completion is marked and saved in your local progress tracker.":"Click below to mark complete and automatically advance to the next module."})]})]}),e.jsx("div",{style:{display:"flex",alignItems:"center",gap:"0.75rem"},children:p?e.jsxs(e.Fragment,{children:[e.jsxs("button",{onClick:()=>c(s.id),className:"lesson-complete-toggle-btn completed",title:"Click to unmark as complete",style:{padding:"0.65rem 1.1rem",borderRadius:"8px"},children:[e.jsx(Fe,{size:17}),e.jsx("span",{children:"Marked Complete (Click to Undo)"})]}),s.next_id&&e.jsxs("button",{onClick:()=>t(s.next_id),className:"lesson-nav-btn next",style:{padding:"0.65rem 1.25rem"},children:[e.jsx("span",{children:s.next_id==="feedback"?"Course Feedback & Survey":"Next Lesson"}),e.jsx(ge,{size:16})]})]}):e.jsxs("button",{onClick:()=>{c(s.id),s.next_id?t(s.next_id):a()},style:{display:"inline-flex",alignItems:"center",gap:"8px",background:"var(--success)",color:"#ffffff",border:"none",padding:"0.75rem 1.5rem",borderRadius:"8px",fontWeight:800,fontSize:"0.92rem",cursor:"pointer",boxShadow:"0 2px 8px rgba(16, 185, 129, 0.35)",transition:"all 0.15s ease"},className:"btn-complete-and-advance",children:[e.jsx(Fe,{size:18}),e.jsx("span",{children:s.next_id==="feedback"?"Mark Complete & Course Feedback":s.next_id?"Mark as Complete & Next Module":"Mark as Complete & Finish"}),e.jsx(ge,{size:18})]})})]}),e.jsxs("footer",{className:"lesson-navigation-footer",children:[s.prev_id?e.jsxs("button",{onClick:()=>t(s.prev_id),className:"lesson-nav-btn prev",children:[e.jsx(Re,{size:16}),e.jsx("span",{children:"Previous Lesson"})]}):e.jsx("div",{style:{width:"130px"}}),e.jsxs("button",{onClick:a,className:"lesson-nav-btn hub",children:[e.jsx(Te,{size:16}),e.jsx("span",{children:"Course Hub"})]}),s.next_id?e.jsxs("button",{onClick:()=>t(s.next_id),className:"lesson-nav-btn next",children:[e.jsx("span",{children:s.next_id==="feedback"?"Course Feedback":"Next Lesson"}),e.jsx(ge,{size:16})]}):e.jsx("div",{style:{width:"130px"}})]}),n&&typeof document<"u"&&se.createPortal(e.jsxs("div",{className:"image-lightbox-overlay",onClick:()=>w(null),role:"dialog","aria-modal":"true",children:[e.jsx("div",{className:"image-lightbox-backdrop"}),e.jsxs("div",{className:"image-lightbox-container",onClick:R=>R.stopPropagation(),children:[e.jsxs("div",{className:"image-lightbox-header",children:[e.jsx("span",{className:"image-lightbox-title",children:n.alt||"High-Resolution Diagram Preview"}),e.jsx("button",{type:"button",className:"image-lightbox-close-btn",onClick:()=>w(null),title:"Close full-screen image preview (ESC)",children:e.jsx(Ge,{size:20})})]}),e.jsx("div",{className:"image-lightbox-body",children:e.jsx("img",{src:n.src,alt:n.alt,className:"image-lightbox-img"})}),n.caption&&e.jsx("div",{className:"image-lightbox-caption",children:n.caption})]})]}),document.body)]})}const hs="nexus_amr_l1_submitted_feedback",Ja="navpro_l1_submitted_feedback";function Za({studentInfo:s,onSubmitFeedback:t}){const[a,p]=r.useState(5),[c,A]=r.useState(0),[S,E]=r.useState("Module 4: Autonomous Navigation with Nav2"),[k,x]=r.useState(""),[f,T]=r.useState(!1),[d,o]=r.useState(!1),[l,y]=r.useState(null);r.useEffect(()=>{try{const h=localStorage.getItem(hs)||localStorage.getItem(Ja);if(h){const _=JSON.parse(h);y(_),o(!0),_.rating&&p(_.rating),_.favorite_module&&E(_.favorite_module),_.feedback_text&&x(_.feedback_text)}}catch{}},[]);const b={1:"Needs Improvement",2:"Fair",3:"Good",4:"Very Good",5:"Outstanding / Excellent! 🚀"},C=["Module 1: Foundations & Core Middleware (Linux, ROS 2, Workspace & Packages)","Module 2: Core ROS 2 Mechanics & Communication (Pub/Sub, Services, Params, Actions, Bags, CLI)","Module 3: 3D Robot Modeling & Physics Simulation (URDF, Xacro, RViz2, Gazebo, Worlds)","Module 4: Autonomous Navigation with Nav2 (SLAM Toolbox, Costmaps, Planners, Behavior Trees, Nav2 Simple Commander, Physical Deployment)"],z=async h=>{if(h.preventDefault(),!k.trim())return;if(T(!0),t)try{await t(a,S,k)}catch(v){console.warn("Feedback sync error:",v)}T(!1);const _={student_id:(s==null?void 0:s.student_id)||(s==null?void 0:s.email_roll)||"student_guest",student_name:(s==null?void 0:s.name)||"Student",rating:a,favorite_module:S,feedback_text:k,timestamp:Date.now()};localStorage.setItem(hs,JSON.stringify(_)),y(_),o(!0)},m=()=>{o(!1)};return e.jsxs("div",{className:"feedback-form-card",children:[e.jsxs("div",{className:"feedback-form-header",children:[e.jsx("div",{className:"header-icon-wrap",children:e.jsx(Ft,{size:26,className:"award-icon"})}),e.jsxs("div",{className:"header-text-wrap",children:[e.jsxs("div",{className:"header-badge-row",children:[e.jsx("span",{className:"badge-capstone",children:"Capstone Survey"}),e.jsx("span",{className:"badge-live",children:"Synced to Instructor"})]}),e.jsx("h3",{className:"feedback-main-title",children:"Workshop Experience & Student Feedback"}),e.jsx("p",{className:"feedback-main-subtitle",children:"Congratulations on reaching the final stage of Level 1! Your feedback helps us fine-tune hands-on robotics exercises and improve future workshop tracks."})]})]}),d?e.jsx("div",{className:"feedback-success-banner fade-in",children:e.jsxs("div",{className:"success-banner-content",children:[e.jsx("div",{className:"success-icon-badge",children:e.jsx(V,{size:36,color:"#10b981"})}),e.jsxs("div",{className:"success-copy",children:[e.jsxs("h4",{children:["Thank you, ",(l==null?void 0:l.student_name)||"Robotics Engineer","!"]}),e.jsx("p",{children:"Your feedback and ratings have been saved and transmitted to the instructor central server."}),e.jsxs("div",{className:"submitted-summary-box",children:[e.jsxs("div",{className:"summary-rating",children:[e.jsx("span",{className:"summary-label",children:"Your Rating:"}),e.jsxs("div",{className:"star-row",children:[[1,2,3,4,5].map(h=>e.jsx(jt,{size:18,fill:h<=((l==null?void 0:l.rating)||a)?"#f59e0b":"none",color:"#f59e0b"},h)),e.jsxs("span",{className:"rating-tag",children:["(",(l==null?void 0:l.rating)||a," / 5)"]})]})]}),e.jsxs("div",{className:"summary-module",children:[e.jsx("span",{className:"summary-label",children:"Favorite Module:"}),e.jsx("span",{className:"summary-val",children:(l==null?void 0:l.favorite_module)||S})]}),(l==null?void 0:l.feedback_text)&&e.jsxs("div",{className:"summary-quote",children:['"',l.feedback_text,'"']})]}),e.jsxs("button",{type:"button",onClick:m,className:"btn-edit-feedback",children:[e.jsx(zs,{size:14}),e.jsx("span",{children:"Update or Edit Response"})]})]})]})}):e.jsxs("form",{onSubmit:z,className:"feedback-form-body",children:[e.jsxs("div",{className:"feedback-section-row",children:[e.jsxs("label",{className:"section-label",children:[e.jsx(jt,{size:16,className:"label-icon"}),e.jsx("span",{children:"Overall Workshop Rating"})]}),e.jsxs("div",{className:"star-picker-container",children:[e.jsx("div",{className:"star-picker-row",children:[1,2,3,4,5].map(h=>e.jsx("button",{type:"button",className:`star-choice-btn ${h<=(c||a)?"active":""}`,onMouseEnter:()=>A(h),onMouseLeave:()=>A(0),onClick:()=>p(h),"aria-label":`Rate ${h} stars`,children:e.jsx(jt,{size:32,fill:h<=(c||a)?"#f59e0b":"none",color:"#f59e0b",className:"star-svg"})},h))}),e.jsx("span",{className:"star-score-indicator",children:b[c||a]})]})]}),e.jsxs("div",{className:"feedback-section-row",children:[e.jsxs("label",{className:"section-label",children:[e.jsx(he,{size:16,className:"label-icon"}),e.jsx("span",{children:"Which module was your favorite or most valuable?"})]}),e.jsx("select",{value:S,onChange:h=>E(h.target.value),className:"feedback-select-input",children:C.map((h,_)=>e.jsx("option",{value:h,children:h},_))})]}),e.jsxs("div",{className:"feedback-section-row",children:[e.jsxs("label",{className:"section-label",children:[e.jsx(_s,{size:16,className:"label-icon"}),e.jsx("span",{children:"What did you enjoy most? Any suggestions for the instructor?"})]}),e.jsx("textarea",{required:!0,rows:4,value:k,onChange:h=>x(h.target.value),placeholder:"e.g., The hands-on autonomous navigation patrol with Nav2 Simple Commander was awesome! The line-by-line code breakdowns really helped me understand how ROS 2 lifecycle states work under the hood...",className:"feedback-textarea-input"})]}),e.jsxs("div",{className:"feedback-submit-row",children:[e.jsx("div",{className:"feedback-privacy-note",children:e.jsx("span",{children:"🔒 Submissions are delivered to the instructor dashboard with your student ID."})}),e.jsxs("button",{type:"submit",disabled:f||!k.trim(),className:"btn-submit-feedback",children:[e.jsx(ce,{size:16}),e.jsx("span",{children:f?"Submitting Feedback...":"Submit Feedback to Instructor"})]})]})]})]})}function ei({onNavigateHub:s,onSelectLesson:t,studentInfo:a,onSubmitFeedback:p,completedCount:c=23,totalLessons:A=23}){return r.useEffect(()=>{window.scrollTo({top:0,behavior:"smooth"})},[]),e.jsxs("div",{className:"lesson-view-container feedback-view-container fade-in",children:[e.jsxs("nav",{className:"lesson-breadcrumbs",children:[e.jsx("button",{onClick:s,className:"breadcrumb-btn",children:"Curriculum Hub"}),e.jsx("span",{className:"breadcrumb-sep",children:"/"}),e.jsx("span",{className:"breadcrumb-module",children:"Capstone Milestones"}),e.jsx("span",{className:"breadcrumb-sep",children:"/"}),e.jsx("span",{className:"breadcrumb-active",children:"Course Feedback & Survey"})]}),e.jsxs("section",{className:"feedback-milestone-hero",style:{margin:"1.5rem 0 2rem",padding:"2rem 2.25rem",borderRadius:"18px",background:"linear-gradient(135deg, rgba(37, 99, 235, 0.08) 0%, rgba(16, 185, 129, 0.08) 100%)",border:"1px solid var(--border-color)",boxShadow:"var(--shadow-sm)"},children:[e.jsxs("div",{style:{display:"flex",alignItems:"flex-start",gap:"1.25rem",flexWrap:"wrap"},children:[e.jsx("div",{style:{width:56,height:56,borderRadius:"16px",background:"linear-gradient(135deg, #2563eb 0%, #10b981 100%)",color:"#ffffff",display:"flex",alignItems:"center",justifyContent:"center",boxShadow:"0 4px 16px rgba(37, 99, 235, 0.35)",flexShrink:0},children:e.jsx(Ft,{size:32})}),e.jsxs("div",{style:{flex:1,minWidth:"260px"},children:[e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"8px",marginBottom:"6px"},children:[e.jsx("span",{style:{background:"#dbeafe",color:"#1d4ed8",fontSize:"0.75rem",fontWeight:800,padding:"3px 10px",borderRadius:"6px",textTransform:"uppercase",letterSpacing:"0.05em"},children:"Curriculum Capstone"}),e.jsxs("span",{style:{background:"#dcfce7",color:"#15803d",fontSize:"0.75rem",fontWeight:700,padding:"3px 10px",borderRadius:"6px"},children:[c," / ",A," Lessons Completed"]})]}),e.jsx("h1",{style:{margin:"0 0 8px",fontSize:"1.65rem",fontWeight:850,color:"var(--text-primary)",letterSpacing:"-0.02em"},children:"Level 1: Zero-to-Autonomous AMR Engineer"}),e.jsx("p",{style:{margin:0,fontSize:"0.94rem",color:"var(--text-secondary)",lineHeight:1.6},children:"Congratulations on completing the curriculum! You have developed real engineering competency across Linux systems, ROS 2 Jazzy DDS communication, custom interfaces, URDF 3D simulation, SLAM Toolbox, Nav2 autonomous navigation, and physical AMR deployment. Your feedback helps shape upcoming robotics courses."})]})]}),e.jsxs("div",{style:{display:"grid",gridTemplateColumns:"repeat(auto-fit, minmax(200px, 1fr))",gap:"1rem",marginTop:"1.75rem",paddingTop:"1.5rem",borderTop:"1px solid var(--border-color)"},children:[e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"10px"},children:[e.jsx(ue,{size:18,style:{color:"#2563eb"}}),e.jsxs("div",{children:[e.jsx("div",{style:{fontWeight:700,fontSize:"0.86rem",color:"var(--text-primary)"},children:"Module 1"}),e.jsx("div",{style:{fontSize:"0.76rem",color:"var(--text-muted)"},children:"Linux & ROS 2 Middleware"})]})]}),e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"10px"},children:[e.jsx(_e,{size:18,style:{color:"#0ea5e9"}}),e.jsxs("div",{children:[e.jsx("div",{style:{fontWeight:700,fontSize:"0.86rem",color:"var(--text-primary)"},children:"Module 2"}),e.jsx("div",{style:{fontSize:"0.76rem",color:"var(--text-muted)"},children:"Actions, Services & Bags"})]})]}),e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"10px"},children:[e.jsx(js,{size:18,style:{color:"#8b5cf6"}}),e.jsxs("div",{children:[e.jsx("div",{style:{fontWeight:700,fontSize:"0.86rem",color:"var(--text-primary)"},children:"Module 3"}),e.jsx("div",{style:{fontSize:"0.76rem",color:"var(--text-muted)"},children:"URDF & Gazebo Simulation"})]})]}),e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"10px"},children:[e.jsx(Dt,{size:18,style:{color:"#10b981"}}),e.jsxs("div",{children:[e.jsx("div",{style:{fontWeight:700,fontSize:"0.86rem",color:"var(--text-primary)"},children:"Module 4"}),e.jsx("div",{style:{fontSize:"0.76rem",color:"var(--text-muted)"},children:"Nav2 & Physical Deployment"})]})]})]})]}),e.jsx("section",{className:"feedback-form-section",children:e.jsx(Za,{studentInfo:a||{},onSubmitFeedback:p})}),e.jsxs("footer",{className:"lesson-navigation-footer",style:{marginTop:"3rem"},children:[e.jsxs("button",{onClick:()=>t("lesson_23"),className:"lesson-nav-btn prev",children:[e.jsx(Re,{size:16}),e.jsx("span",{children:"← Lesson 23: Physical Robot Hardware Deployment"})]}),e.jsxs("button",{onClick:s,className:"lesson-nav-btn hub",children:[e.jsx(Te,{size:16}),e.jsx("span",{children:"Curriculum Hub Overview"})]})]})]})}function ti({isOpen:s,onClose:t}){const[a,p]=r.useState(()=>{try{return localStorage.getItem("navpro_show_ppt")!=="false"}catch{return!0}}),c=()=>{const A=!a;p(A);try{localStorage.setItem("navpro_show_ppt",A?"true":"false"),window.dispatchEvent(new StorageEvent("storage",{key:"navpro_show_ppt",newValue:A?"true":"false"}))}catch{}};return s?e.jsx("div",{className:"modal-overlay fade-in",onClick:t,children:e.jsxs("div",{className:"modal-card help-modal-card",onClick:A=>A.stopPropagation(),children:[e.jsxs("div",{className:"modal-header",children:[e.jsxs("div",{className:"modal-title-wrap",children:[e.jsx(ct,{size:22,className:"modal-title-icon"}),e.jsxs("div",{children:[e.jsx("h3",{children:"Help • Persistence, Resets & Troubleshooting"}),e.jsx("span",{className:"modal-subtitle",children:"Guide to local workspace storage, progress resets, and Docker lifecycle"})]})]}),e.jsx("button",{className:"modal-close-btn",onClick:t,"aria-label":"Close help",children:e.jsx(Ge,{size:18})})]}),e.jsxs("div",{className:"modal-body help-modal-body",children:[e.jsxs("div",{className:"help-section",children:[e.jsxs("div",{className:"help-section-title",children:[e.jsx(Ia,{size:18,className:"help-section-icon"}),e.jsx("h4",{children:"1. How Data & Workspace Storage Persist"})]}),e.jsxs("p",{children:["Your progress and code are engineered to ",e.jsx("strong",{children:"survive PC reboots, browser restarts, and container restarts"})," without cloud reliance:"]}),e.jsxs("ul",{className:"help-bullets",children:[e.jsxs("li",{children:[e.jsx("strong",{children:"Student Attendance & Profile:"})," Stored permanently in your browser's ",e.jsx("code",{children:"localStorage"}),". Opening the LMS tomorrow will remember your name and organization."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Curriculum Checklist & Quizzes:"})," Every lesson checkbox and quiz score is saved in ",e.jsx("code",{children:"localStorage"}),"."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Robotics Code in VS Code:"})," The ",e.jsx("code",{children:"ros2_ws/"})," folder is mounted directly from your host filesystem. Your custom Python nodes and launch files persist on your physical hard drive."]})]})]}),e.jsxs("div",{className:"help-section",children:[e.jsxs("div",{className:"help-section-title",children:[e.jsx(Z,{size:18,className:"help-section-icon"}),e.jsx("h4",{children:"2. How to Reset Curriculum Progress"})]}),e.jsx("p",{children:"If you want to practice again from a fresh slate:"}),e.jsxs("div",{className:"help-step-box",children:[e.jsx("strong",{children:"Option A: One-Click UI Reset"}),e.jsxs("p",{children:["Click the ",e.jsx("code",{children:"↺ Reset Checklist"})," button at the top of the left sidebar. It will clear all completed lesson marks and quiz scores after confirmation."]})]}),e.jsxs("div",{className:"help-step-box",children:[e.jsx("strong",{children:"Option B: Hard Browser Reset"}),e.jsxs("p",{children:["Open Browser DevTools (",e.jsx("code",{children:"F12"}),") → Console → run ",e.jsx("code",{children:"localStorage.clear()"})," → refresh the page."]})]})]}),e.jsxs("div",{className:"help-section",children:[e.jsxs("div",{className:"help-section-title",children:[e.jsx(La,{size:18,className:"help-section-icon"}),e.jsx("h4",{children:"3. How to Restart & Reset Docker"})]}),e.jsx("p",{children:"If a simulation crashes, a port locks, or you need a clean container environment:"}),e.jsxs("div",{className:"help-code-group",children:[e.jsx("span",{className:"help-code-label",children:"Quick Restart (Fast):"}),e.jsx("pre",{className:"help-pre",children:e.jsx("code",{children:"cd level1/docker && docker compose restart"})})]}),e.jsxs("div",{className:"help-code-group",children:[e.jsx("span",{className:"help-code-label",children:"Full Container Recreate (Clean Runtime State):"}),e.jsx("pre",{className:"help-pre",children:e.jsx("code",{children:"cd level1/docker && docker compose down && docker compose up -d"})}),e.jsxs("span",{className:"help-note",children:["(Note: Your code files in ",e.jsx("code",{children:"ros2_ws/"})," will NOT be deleted; they remain safe on your host disk)."]})]}),e.jsxs("div",{className:"help-code-group",children:[e.jsx("span",{className:"help-code-label",children:"Clean Build Artifacts in ROS 2:"}),e.jsx("pre",{className:"help-pre",children:e.jsx("code",{children:"rm -rf level1/ros2_ws/build level1/ros2_ws/install level1/ros2_ws/log"})})]})]}),e.jsxs("div",{className:"help-section",children:[e.jsxs("div",{className:"help-section-title",children:[e.jsx(ws,{size:18,className:"help-section-icon"}),e.jsx("h4",{children:"4. Environment Access & Port Directory"})]}),e.jsxs("div",{className:"help-ports-grid",children:[e.jsxs("div",{className:"help-port-card",children:[e.jsx("span",{className:"port-badge",children:"Port 8000"}),e.jsx("strong",{children:"LMS Learning Web Platform"}),e.jsx("a",{href:"http://localhost:8000",target:"_blank",rel:"noopener noreferrer",children:"http://localhost:8000"})]}),e.jsxs("div",{className:"help-port-card",children:[e.jsx("span",{className:"port-badge",children:"Port 6080"}),e.jsx("strong",{children:"Desktop GUI (noVNC)"}),e.jsx("a",{href:"http://localhost:6080/vnc.html?autoconnect=true&resize=remote",target:"_blank",rel:"noopener noreferrer",children:"http://localhost:6080/vnc.html"}),e.jsxs("span",{className:"port-pass",children:["Password: ",e.jsx("strong",{children:"None (Passwordless Instant Connect)"})]})]}),e.jsxs("div",{className:"help-port-card",children:[e.jsx("span",{className:"port-badge",children:"Port 8443"}),e.jsx("strong",{children:"In-Browser VS Code"}),e.jsx("a",{href:"http://localhost:8443/?folder=/home/student",target:"_blank",rel:"noopener noreferrer",children:"http://localhost:8443"})]})]})]}),e.jsxs("div",{className:"help-section",children:[e.jsxs("div",{className:"help-section-title",children:[e.jsx(fs,{size:18,className:"help-section-icon"}),e.jsx("h4",{children:"5. Instructor Fullscreen Presentation Mode (PPT)"})]}),e.jsxs("p",{children:["The LMS includes an instructor presentation slide deck mode with step-by-step concept cards (e.g. ",e.jsx("code",{children:"mkdir"}),", ",e.jsx("code",{children:"cd"}),", code walkthroughs, live architecture flows, and assessments)."]}),e.jsxs("div",{style:{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"0.85rem 1.15rem",background:"var(--bg-sidebar)",borderRadius:"10px",border:"1px solid var(--border-color)",margin:"0.75rem 0"},children:[e.jsxs("div",{children:[e.jsx("strong",{children:"Navbar PPT Launch Button"}),e.jsxs("div",{style:{fontSize:"0.82rem",color:"var(--text-muted)"},children:["Controlled by cache variable ",e.jsx("code",{children:"navpro_show_ppt"})," in localStorage"]})]}),e.jsx("button",{type:"button",onClick:c,className:`btn-toggle-ppt ${a?"active":""}`,style:{padding:"0.45rem 0.95rem",borderRadius:"8px",fontWeight:700,fontSize:"0.86rem",cursor:"pointer",border:a?"1px solid rgba(16, 185, 129, 0.4)":"1px solid var(--border-color)",background:a?"rgba(16, 185, 129, 0.15)":"var(--bg-surface)",color:a?"var(--success)":"var(--text-secondary)"},children:a?"✓ Button Visible":"Hidden (Click to Enable)"})]}),e.jsxs("span",{className:"help-note",children:["Shortcut: Open URL with ",e.jsx("code",{children:"?ppt=true"})," to enable or ",e.jsx("code",{children:"?ppt=false"})," to disable."]})]})]}),e.jsx("div",{className:"modal-footer",style:{padding:"1rem 1.5rem",borderTop:"1px solid var(--border-color)"},children:e.jsx("button",{type:"button",className:"btn-submit",onClick:t,style:{marginLeft:"auto"},children:e.jsx("span",{children:"Got It"})})})]})}):null}function si(){const[s,t]=r.useState({isTop:!0,isBottom:!1,percent:0,hasScrolled:!1});r.useEffect(()=>{const c=()=>{const A=window.scrollY||document.documentElement.scrollTop,S=(document.documentElement.scrollHeight||document.body.scrollHeight)-window.innerHeight,E=A<80,k=S<=0||A>=S-80,x=S>0?Math.min(100,Math.max(0,Math.round(A/S*100))):0;t({isTop:E,isBottom:k,percent:x,hasScrolled:A>100})};return window.addEventListener("scroll",c,{passive:!0}),c(),()=>window.removeEventListener("scroll",c)},[]);const a=()=>{window.scrollTo({top:0,behavior:"smooth"})},p=()=>{window.scrollTo({top:document.documentElement.scrollHeight||document.body.scrollHeight,behavior:"smooth"})};return e.jsxs("div",{className:"page-scroll-nav-cluster",style:{position:"fixed",bottom:"2rem",right:"2rem",zIndex:980,display:"flex",flexDirection:"column",alignItems:"center",background:"var(--bg-surface)",border:"1px solid var(--border-color)",borderRadius:"24px",padding:"3px",boxShadow:"0 4px 16px rgba(0, 0, 0, 0.14)",backdropFilter:"blur(10px)",transition:"bottom 0.25s cubic-bezier(0.16, 1, 0.3, 1), transform 0.2s ease, opacity 0.2s ease"},"aria-label":"Page scroll shortcuts",children:[e.jsx("button",{type:"button",onClick:a,className:"page-scroll-btn scroll-to-top-btn",title:"Scroll directly to top (Page Top)","aria-label":"Scroll to top",style:{width:"38px",height:"38px",borderRadius:"50%",border:"none",background:"transparent",color:s.isTop?"var(--text-muted)":"var(--text-primary)",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",transition:"all 0.15s ease",opacity:s.isTop?.6:1},children:e.jsx(Ss,{size:18,strokeWidth:2.4})}),e.jsx("div",{style:{width:"20px",height:"1px",background:"var(--border-color)",margin:"2px 0"}}),e.jsx("button",{type:"button",onClick:p,className:"page-scroll-btn scroll-to-end-btn",title:"Scroll directly to end (Page End)","aria-label":"Scroll to end",style:{width:"38px",height:"38px",borderRadius:"50%",border:"none",background:"transparent",color:s.isBottom?"var(--text-muted)":"var(--text-primary)",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",transition:"all 0.15s ease",opacity:s.isBottom?.6:1},children:e.jsx(Ns,{size:18,strokeWidth:2.4})})]})}function vs(s){if(!s)return[];const t=[];if(typeof window>"u")return t;const p=new DOMParser().parseFromString(s.html_content||"","text/html"),A=Array.from(p.querySelectorAll(".learning-objective-item")).map(o=>{var b,C,z,m,h;const l=((C=(b=o.querySelector(".objective-num-badge"))==null?void 0:b.textContent)==null?void 0:C.trim())||"•",y=((m=(z=o.querySelector(".objective-text"))==null?void 0:z.innerHTML)==null?void 0:m.trim())||((h=o.textContent)==null?void 0:h.trim());return{num:l,text:y}});t.push({id:`${s.id}_launchpad`,type:"title",lessonNum:s.num_str,lessonId:s.id,title:s.title,module:s.module,duration:s.duration,focus:s.focus,outcomes:A.length>0?A:null,snapshot:s.snapshot||[]});const S=[{id:"interactive-permission-calculator-root",key:"permission",title:"Interactive Permission Calculator"},{id:"turtlesim-teleop-flow-root",key:"turtlesim",title:"Turtlesim Teleop & Graph Flow"},{id:"package-structure-flow-root",key:"package",title:"ROS 2 Package Structure & Filesystem"},{id:"pubsub-flow-root",key:"pubsub",title:"Publisher / Subscriber Message Flow"},{id:"service-flow-root",key:"service",title:"Service Server & Client Synchronous RPC"},{id:"action-flow-root",key:"action",title:"Action 3-Tier Execution Flow"},{id:"interactive-urdf-viewer-root",key:"urdf",title:"3D URDF & Kinematics Visualizer"},{id:"interactive-inertia-calculator-root",key:"inertia",title:"URDF Inertia Tensor Calculator"},{id:"log-levels-circle-root",key:"loglevels",title:"ROS 2 Logging Severity Hierarchy"},{id:"interactive-astar-search-root",key:"astar",title:"A* Graph Search Algorithm"}],E=o=>{if(!o)return"";const l=o.trim().split(`
`);if(l.length<=14)return o.trim();const y=[];let b=!1,C=!1;for(let m=0;m<l.length;m++){const h=l[m],_=h.trim();if(_.includes("cat <<")&&_.includes("EOF")){C=!0,y.push("# [Populate script with diagnostic logic]"),y.push("cat << 'EOF' > sensor_diagnostics.sh ... EOF");continue}if(C){_==="EOF"&&(C=!1);continue}if(/^#\s*(?:Expected\s+)?Output/i.test(_)||/^#\s*Notice/i.test(_)||/^#\s*Displays complete/i.test(_)){b=!0;continue}if(b){if(_.startsWith("#")&&!/^#\s*(?:\d+\.|\bStep|\bPhase)/i.test(_))continue;if(_.startsWith("#"))b=!1;else if(_)b=!1;else{b=!1;continue}}_.startsWith("# (Notice:")||_.startsWith("# Without -p")||_.startsWith("# With -p")||_.startsWith("# Notice your prompt")||_.startsWith("# Clean up temporary practice folders:")||_.startsWith("rm -rf")&&_.includes("practice")||_.startsWith("# Verify it was created:")||_.startsWith("# Verify all directories now exist:")||_.startsWith("# Verify the structured")||(_==="ls"||_.startsWith("ls ~/robotics_lab")||_.startsWith("rm -rf my_robot_test"))&&l.length>15||y.push(h)}let z=y.join(`
`).trim();return z=z.replace(/\n{3,}/g,`

`),z},k=o=>{if(!o)return"";const l=o.split(`
`);if(l.length<=16)return o;const y=l.slice(0,14);return y.push("# ... [Full complete implementation available in Web LMS] ..."),y.join(`
`)},x=o=>{if(!o)return!1;const l=!!o.querySelector("pre, code, .code-container"),y=!!o.querySelector("img, .lesson-image, svg"),b=!!o.querySelector("table"),C=!!o.querySelector(".alert-callout, .callout-card"),z=!!o.querySelector("ul, ol"),m=o.textContent.trim().length;return l||y||b||C||z||m>=160},f=(o,l,y,b)=>{o.forEach((C,z)=>{if(C.textContent.trim().length>30){const m=Array.from(C.querySelectorAll(".code-breakdown-item"));if(m.length>3){const h=Math.ceil(m.length/2);[m.slice(0,h),m.slice(h)].forEach((v,g)=>{const u=C.cloneNode(!0),i=u.querySelector(".code-breakdown-list");i&&(i.innerHTML="",v.forEach(n=>i.appendChild(n.cloneNode(!0)))),t.push({id:`${l}_breakdown_${z}_p${g+1}`,type:"step_breakdown",lessonNum:s.num_str,lessonId:s.id,module:s.module,sectionTitle:b,badge:"Architecture Breakdown",title:`${y} — Mechanics (Part ${g+1})`,htmlContent:u.outerHTML})});return}t.push({id:`${l}_breakdown_${z}`,type:"step_breakdown",lessonNum:s.num_str,lessonId:s.id,module:s.module,sectionTitle:b,badge:"Architecture Breakdown",title:`${y} — Core Mechanics Breakdown`,htmlContent:C.outerHTML})}})},T=(o,l,y,b,C=0)=>{if(!o||!x(o))return;o.querySelectorAll("hr, .divider").forEach(g=>g.remove()),o.querySelectorAll(".alert-callout, .alert").forEach(g=>{if(g.querySelectorAll(".code-container, pre").length>1||g.textContent.trim().length>600){const i=g.querySelector(".alert-body")||g,n=p.createDocumentFragment();for(;i.firstChild;)n.appendChild(i.firstChild);g.replaceWith(n)}}),o.querySelectorAll('div[style*="grid"]').forEach(g=>{const u=Array.from(g.children).filter(i=>i.nodeType===1);if(u.length>=5||u.length>=4&&g.querySelector("pre, code")){const i=Math.ceil(u.length/2),n=g.cloneNode(!1),w=g.cloneNode(!1);u.slice(0,i).forEach(R=>n.appendChild(R.cloneNode(!0))),u.slice(i).forEach(R=>w.appendChild(R.cloneNode(!0))),g.parentNode&&(g.parentNode.insertBefore(n,g),g.parentNode.insertBefore(w,g),g.remove())}}),o.querySelectorAll(".table-responsive, table").forEach(g=>{g.style.marginTop="0.2rem",g.style.marginBottom="0.2rem"});const z=Array.from(o.querySelectorAll(".code-breakdown-card"));if(z.forEach(g=>g.remove()),o.querySelectorAll("pre").forEach(g=>{const u=g.querySelector("code")||g,n=u.textContent.split(`
`);n.length>10&&(u.textContent=n.slice(0,9).join(`
`)+`

# ... [Full implementation available in Web LMS] ...`)}),C>=2){t.push({id:l,type:"subtopic",lessonNum:s.num_str,lessonId:s.id,module:s.module,sectionTitle:b,title:y,htmlContent:o.innerHTML}),f(z,l,y,b);return}if((s.id==="01"||s.id==="lesson_01"||s.num_str==="01")&&(o.querySelector('.terminator-image, img[src*="terminator"]')||y.toLowerCase().includes("terminator"))&&o.querySelector("table")){let g="",u="",i="";Array.from(o.children).forEach(n=>{n.querySelector("table")||n.tagName.toLowerCase()==="table"||n.classList.contains("table-responsive")?i+=n.outerHTML:n.querySelector("img, svg")||["img","svg"].includes(n.tagName.toLowerCase())||n.classList.contains("lesson-image-wrapper")?u+=n.outerHTML:g+=n.outerHTML}),t.push({id:l,type:"concept",lessonNum:s.num_str,lessonId:s.id,module:s.module,sectionTitle:b,badge:"📟 Multi-Terminal Grid",title:y,htmlContent:`
          <div class="terminator-slide-wrapper">
            ${g?`<div class="terminator-intro-briefing">${g}</div>`:""}
            <div class="terminator-cols-container">
              <div class="term-left-col">
                <div class="term-graphic-frame">
                  ${u}
                </div>
                <div class="term-pro-tip-banner">
                  <span class="tip-badge">💡 PRO-TIP</span>
                  <span class="tip-text">Tiling 4 panes allows concurrent monitoring of Gazebo, teleop, RViz2, and topic echo on one screen.</span>
                </div>
              </div>
              <div class="term-right-col">
                <div class="term-shortcuts-header">
                  <span class="shortcuts-badge">⌨️ Essential Shortcuts</span>
                  <span class="shortcuts-sub">Default Keybindings</span>
                </div>
                ${i}
              </div>
            </div>
          </div>
        `}),f(z,l,y,b);return}const m=Array.from(o.querySelectorAll("img, svg:not(.lucide)"));if(m.length>1){const g=Array.from(o.children),u=[];let i=[];if(g.forEach(n=>{(!!n.querySelector("img, svg:not(.lucide)")||["img","svg"].includes(n.tagName.toLowerCase())||n.classList.contains("lesson-image-wrapper"))&&i.some(R=>!!R.querySelector("img, svg:not(.lucide)")||["img","svg"].includes(R.tagName.toLowerCase())||R.classList.contains("lesson-image-wrapper"))?(u.push(i),i=[n]):i.push(n)}),i.length>0&&u.push(i),u.length>1){u.forEach((n,w)=>{const R=p.createElement("div");if(n.forEach(M=>R.appendChild(M.cloneNode(!0))),!x(R))return;const N=R.querySelector("strong, h4, h5"),D=N?N.textContent.trim():w===0?"Simulation View":"Architecture Diagram",I=`${y} (Part ${w+1}: ${D})`;T(R,`${l}_part${w+1}`,I,b,C+1)}),f(z,l,y,b);return}}if(m.length===1&&(o.textContent.trim().length>180||o.querySelector("table, pre, .code-container, .alert"))){const g=o.querySelector("table, .table-responsive"),u=g?g.querySelectorAll("tr").length:0,i=!!o.querySelector("pre, .code-container"),n=o.textContent.trim().length;if(g&&u>4||i&&n>550){const w=p.createElement("div"),R=p.createElement("div");if(Array.from(o.children).forEach(N=>{const D=!!N.querySelector("img, svg:not(.lucide)")||["img","svg"].includes(N.tagName.toLowerCase())||N.classList.contains("lesson-image-wrapper"),I=!!N.querySelector("pre, .code-container, table")||["pre","table"].includes(N.tagName.toLowerCase())||N.classList.contains("code-container")||N.classList.contains("table-responsive");D?w.appendChild(N.cloneNode(!0)):I?R.appendChild(N.cloneNode(!0)):w.children.length===0?w.appendChild(N.cloneNode(!0)):R.appendChild(N.cloneNode(!0))}),x(w)&&x(R)&&w.children.length<o.children.length&&R.children.length<o.children.length){T(w,`${l}_visual`,`${y}: Architectural Model`,b,C+1),T(R,`${l}_code`,`${y}: Implementation`,b,C+1),f(z,l,y,b);return}}else{const w=p.createElement("div");w.className="col-visual";const R=p.createElement("div");R.className="col-content",Array.from(o.children).forEach(N=>{!!N.querySelector("img, svg:not(.lucide)")||["img","svg"].includes(N.tagName.toLowerCase())||N.classList.contains("lesson-image-wrapper")?w.appendChild(N.cloneNode(!0)):R.appendChild(N.cloneNode(!0))}),t.push({id:l,type:"subtopic",lessonNum:s.num_str,lessonId:s.id,module:s.module,sectionTitle:b,title:y,htmlContent:`
            <div class="deck-two-col-layout">
              ${w.outerHTML}
              ${R.outerHTML}
            </div>
          `})}f(z,l,y,b);return}const h=Array.from(o.children),_=o.querySelectorAll("pre, .code-container");if(C<1&&m.length===0&&h.length>1&&(o.textContent.trim().length>680||_.length>1&&o.textContent.trim().length>350||o.querySelector("table")&&o.textContent.trim().length>380)){const g=[];let u=[],i=0;if(h.forEach(n=>{const w=n.textContent.trim().length,R=!!n.querySelector("pre, .code-container")||n.tagName.toLowerCase()==="pre",N=!!n.querySelector("table")||n.tagName.toLowerCase()==="table",D=w>400||R&&w>200||N,I=u.some(M=>M.querySelector("pre, .code-container")||M.tagName.toLowerCase()==="pre");u.length>0&&(D||i+w>650||R&&I)?(g.push(u),u=[n],i=w):(u.push(n),i+=w)}),u.length>0&&g.push(u),g.length>1){g.forEach((n,w)=>{const R=p.createElement("div");if(n.forEach(M=>R.appendChild(M.cloneNode(!0))),!x(R))return;const N=R.querySelector("strong, h3, h4, h5"),D=R.querySelector("pre, .code-container");let I=N?N.textContent.trim():D?"Implementation":`Part ${w+1}`;I.length>35&&(I=`Part ${w+1}`),T(R,`${l}_chk${w+1}`,`${y} (${I})`,b,C+1)}),f(z,l,y,b);return}}t.push({id:l,type:"subtopic",lessonNum:s.num_str,lessonId:s.id,module:s.module,sectionTitle:b,title:y,htmlContent:o.innerHTML}),f(z,l,y,b)};let d=Array.from(p.querySelectorAll("section"));return(d.length<2||d.length<p.querySelectorAll("h2").length)&&(d=Array.from(p.querySelectorAll("h2")).map(l=>{const y=p.createElement("section");y.id=l.id||"",y.appendChild(l.cloneNode(!0));let b=l.nextElementSibling;for(;b&&b.tagName.toLowerCase()!=="h2";){const C=b.nextElementSibling;y.appendChild(b.cloneNode(!0)),b=C}return y})),s.id==="02"||s.num_str==="02"||s.id==="lesson_02"?ai(p,s,t):s.id==="03"||s.num_str==="03"||s.id==="lesson_03"?ii(p,s,t):s.id==="04"||s.num_str==="04"||s.id==="lesson_04"?ni(p,s,t):s.id==="05"||s.num_str==="05"||s.id==="lesson_05"?oi(p,s,t):s.id==="06"||s.num_str==="06"||s.id==="lesson_06"?ri(p,s,t):s.id==="07"||s.num_str==="07"||s.id==="lesson_07"?li(p,s,t):s.id==="08"||s.num_str==="08"||s.id==="lesson_08"?di(p,s,t):s.id==="09"||s.num_str==="09"||s.id==="lesson_09"?ci(p,s,t):s.id==="10"||s.num_str==="10"||s.id==="lesson_10"?pi(p,s,t):s.id==="11"||s.num_str==="11"||s.id==="lesson_11"?mi(p,s,t):s.id==="12"||s.num_str==="12"||s.id==="lesson_12"?gi(p,s,t):s.id==="13"||s.num_str==="13"||s.id==="lesson_13"?ui(p,s,t):s.id==="14"||s.num_str==="14"||s.id==="lesson_14"?hi(p,s,t):s.id==="15"||s.num_str==="15"||s.id==="lesson_15"?vi(p,s,t):s.id==="16"||s.num_str==="16"||s.id==="lesson_16"?yi(p,s,t):s.id==="17"||s.num_str==="17"||s.id==="lesson_17"?fi(p,s,t):s.id==="18"||s.num_str==="18"||s.id==="lesson_18"?bi(p,s,t):s.id==="19"||s.num_str==="19"||s.id==="lesson_19"?xi(p,s,t):s.id==="20"||s.num_str==="20"||s.id==="lesson_20"?_i(p,s,t):s.id==="21"||s.num_str==="21"||s.id==="lesson_21"?ji(p,s,t):s.id==="22"||s.num_str==="22"||s.id==="lesson_22"?wi(p,s,t):d.forEach((o,l)=>{const y=o.querySelector("h2"),b=y?y.textContent.trim():`Section ${l+1}`,C=b.toLowerCase();if(C.includes("learning objectives")||C.includes("road map")||C.includes("roadmap")||C.includes("overview")&&l<=1||C.includes("challenge")||C.includes("practical lab")||C.includes("student lab")||C.includes("mission")||C.includes("hands-on student")||C.includes("summary")||C.includes("next steps"))return;S.forEach(g=>{o.querySelector(`#${g.id}`)&&t.push({id:`${s.id}_interactive_${g.key}`,type:"interactive",interactiveKey:g.key,lessonNum:s.num_str,lessonId:s.id,module:s.module,sectionTitle:b,title:g.title})});const z=Array.from(o.querySelectorAll(".cmd-card"));if(z.length>0){z.forEach((g,u)=>{var M,$,L,j,P,G,O,F,U,J;const i=(($=(M=g.querySelector(".cmd-badge"))==null?void 0:M.textContent)==null?void 0:$.trim())||"",n=((j=(L=g.querySelector(".cmd-title"))==null?void 0:L.textContent)==null?void 0:j.trim())||`Command ${u+1}`,w=((G=(P=g.querySelector(".cmd-syntax"))==null?void 0:P.textContent)==null?void 0:G.replace(/^Syntax:\s*/i,"").trim())||"",R=((F=(O=g.querySelector(".cmd-desc"))==null?void 0:O.innerHTML)==null?void 0:F.trim())||"",N=g.querySelector("pre code"),D=N?N.textContent.trim():"",I=((J=(U=g.querySelector(".code-lang-tag"))==null?void 0:U.textContent)==null?void 0:J.trim())||"bash";t.push({id:`${s.id}_cmd_${u}_${i.replace(/[^a-zA-Z0-9]/g,"_")}`,type:"command",lessonNum:s.num_str,lessonId:s.id,module:s.module,sectionTitle:b,badge:i,baseBadge:i,title:n,baseTitle:n,syntax:w,desc:R,code:E(D),lang:I,htmlContent:g.outerHTML})});return}const m=Array.from(o.querySelectorAll(".file-edit-step"));if(m.length>0){const g=[];let u=null;m.forEach(i=>{var $,L,j,P,G;const n=((L=($=i.querySelector(".file-edit-step-title"))==null?void 0:$.textContent)==null?void 0:L.trim())||"",w=i.querySelector(".step-description"),R=i.querySelector("pre code"),N=R?R.textContent.trim():"",D=((P=(j=i.querySelector(".code-lang-tag"))==null?void 0:j.textContent)==null?void 0:P.trim())||"python",I=(G=w==null?void 0:w.textContent)==null?void 0:G.match(/([~./\w_-]+\.[a-zA-Z0-9]+)/),M=n.toLowerCase().includes("open")||N.length===0;if(M||!u){u&&u.codes.length>0&&g.push(u);const O=I?I[1]:"",F=O?O.split("/").pop():"Configuration File";u={targetPath:O,fileName:F,descriptions:[],codes:[],lang:D},w&&!M&&u.descriptions.push(w.textContent.trim())}else n.toLowerCase().includes("verify")||n.toLowerCase().includes("full file")?u.codes.length===0&&N.length>0&&u.codes.push(N):(w&&u.descriptions.push(w.textContent.trim()),N.length>0&&(u.codes.push(N),u.lang=D))}),u&&(u.codes.length>0||u.descriptions.length>0)&&g.push(u),g.forEach((i,n)=>{const w=i.codes.join(`

`),R=i.descriptions.slice(0,2).join(" ")||`Update ${i.fileName} configuration.`,N=i.targetPath?`<code>${i.targetPath}</code>`:`<code>${i.fileName}</code>`;t.push({id:`${s.id}_file_${l}_${n}_${i.fileName.replace(/[^a-zA-Z0-9]/g,"_")}`,type:"code_step",lessonNum:s.num_str,lessonId:s.id,module:s.module,sectionTitle:b,badge:i.fileName,title:`${b.replace(/^\d+\.\s*/,"")}: ${i.fileName}`,desc:`<div class="file-path-strip"><span class="file-path-label">📁 Target:</span> ${N}</div><p class="file-edit-summary">${R}</p>`,code:k(w),lang:i.lang,breakdown:null,htmlContent:""})});return}const h=Array.from(o.querySelectorAll("h3"));if(h.length>0){const g=p.createElement("div");let u=o.firstElementChild;for(;u&&u.tagName.toLowerCase()!=="h3"&&u.tagName.toLowerCase()!=="h2";)S.some(i=>u.id===i.id||u.querySelector(`#${i.id}`))||g.appendChild(u.cloneNode(!0)),u=u.nextElementSibling;x(g)&&T(g,`${s.id}_sec_${l}_intro`,`${b}: Overview`,b),h.forEach((i,n)=>{const w=i.textContent.trim(),R=w.toLowerCase();if(R.includes("challenge")||R.includes("starter template")||R.includes("student lab")||R.includes("solution breakdown")||R.includes("task_spawn"))return;const N=[];let D=i.nextElementSibling;for(;D&&D.tagName.toLowerCase()!=="h3"&&D.tagName.toLowerCase()!=="h2";)S.some(M=>D.id===M.id||D.querySelector(`#${M.id}`))||N.push(D.cloneNode(!0)),D=D.nextElementSibling;const I=p.createElement("div");N.forEach(M=>I.appendChild(M)),T(I,`${s.id}_sub_${l}_${n}`,w,b)});return}const _=o.cloneNode(!0),v=_.querySelector("h2");v&&v.remove(),S.forEach(g=>{const u=_.querySelector(`#${g.id}`);u&&u.remove()}),T(_,`${s.id}_sec_${l}`,b,b)}),s.id!=="03"&&s.num_str!=="03"&&s.id!=="lesson_03"&&Array.isArray(s.quizzes)&&s.quizzes.length>0&&s.quizzes.forEach((o,l)=>{const y=o.correct!==void 0?o.correct:o.answer!==void 0?o.answer:o.correct_index!==void 0?o.correct_index:0,b=o.prompt||o.question||`Assessment Question ${l+1}`;t.push({id:`${s.id}_quiz_${l}`,type:"quiz",lessonNum:s.num_str,lessonId:s.id,module:s.module,sectionTitle:"Knowledge Check & Interactive Assessment",title:`Question ${l+1} of ${s.quizzes.length}`,quizIndex:l+1,totalQuizzes:s.quizzes.length,question:b,options:o.options||[],answer:y,explanation:o.explanation||""})}),t.push({id:`${s.id}_summary`,type:"summary",lessonNum:s.num_str,lessonId:s.id,module:s.module,sectionTitle:"Summary & Next Steps",title:`Lesson ${s.num_str} Summary & Key Takeaways`,nextId:s.next_id,focus:s.focus}),t}function ai(s,t,a){a.push({id:`${t.id}_prerequisites`,type:"concept",lessonNum:t.num_str,lessonId:t.id,module:t.module,sectionTitle:"2. Hardware and Software Prerequisites",badge:"📋 Prerequisites",title:"2. Hardware & Software Prerequisites",htmlContent:`
      <div class="deck-prereq-container">
        <p>Before launching our robotics software stack, verify that your host system meets the required baseline for containerized simulation and real-time middleware:</p>
        <div class="prereq-grid-cards">
          <div class="prereq-card">
            <div class="prereq-card-header"><span class="prereq-icon">🐧</span><strong>Operating System</strong></div>
            <p><strong>Ubuntu 24.04 LTS (Noble Numbat)</strong>. Clean environment running natively or within containerized Docker / Podman runtime.</p>
          </div>
          <div class="prereq-card">
            <div class="prereq-card-header"><span class="prereq-icon">🤖</span><strong>Robotics Stack</strong></div>
            <p><strong>ROS 2 Jazzy Jalisco</strong> (Long-Term Support through 2029) with complete Desktop suite and build tooling (<code>colcon</code>).</p>
          </div>
          <div class="prereq-card">
            <div class="prereq-card-header"><span class="prereq-icon">⚡</span><strong>Compute & Memory</strong></div>
            <p><strong>Minimum 8 GB RAM</strong> (16 GB recommended for Gazebo physics simulation) and 4+ CPU cores with hardware virtualization.</p>
          </div>
          <div class="prereq-card">
            <div class="prereq-card-header"><span class="prereq-icon">🌐</span><strong>Networking & Ports</strong></div>
            <p>Dedicated port exposure for interactive services: <strong>Port 6080</strong> (noVNC Desktop GUI) and <strong>Port 8443</strong> (In-Browser VS Code IDE).</p>
          </div>
        </div>
      </div>
    `}),a.push({id:`${t.id}_sec3_1_robot_ingredients`,type:"concept",lessonNum:t.num_str,lessonId:t.id,module:t.module,sectionTitle:"3. Robotics Fundamentals & ROS 2 Architecture",badge:"🤖 Core Concept",title:"3.1 What is a Robot? & The Three Core Ingredients",htmlContent:`
      <div class="robot-ingredients-slide-layout">
        <div class="ingredients-visual-col">
          <div class="anatomy-image-wrap">
            <img src="assets/images/robot_anatomy_ingredients.png" alt="AMR Anatomy Cutaway" class="ingredients-hero-img" />
          </div>
          <div class="ingredients-def-badge">
            <strong>Robot Definition:</strong> A programmable machine capable of sensing its physical environment, making cognitive decisions, and executing autonomous actions.
          </div>
        </div>
        <div class="ingredients-cards-col">
          <div class="ingredient-card ingredient-perception">
            <div class="ingredient-header">
              <span class="ingredient-icon">👁️</span>
              <div class="ingredient-title-group">
                <span class="ingredient-name">1. Perception</span>
                <span class="ingredient-role">The Robot's Eyes & Ears</span>
              </div>
            </div>
            <p class="ingredient-desc">Senses physical reality. Captures environmental telemetry via 2D/3D LiDAR, stereo cameras, depth sensors, IMU, and wheel odometry.</p>
          </div>
          <div class="ingredient-card ingredient-decision">
            <div class="ingredient-header">
              <span class="ingredient-icon">🧠</span>
              <div class="ingredient-title-group">
                <span class="ingredient-name">2. Decision Making</span>
                <span class="ingredient-role">The Robot's Brain</span>
              </div>
            </div>
            <p class="ingredient-desc">Computes state & trajectory. Fuses sensor telemetry (SLAM), constructs obstacle costmaps, computes collision-free paths (Nav2), and coordinates behaviors.</p>
          </div>
          <div class="ingredient-card ingredient-action">
            <div class="ingredient-header">
              <span class="ingredient-icon">⚡</span>
              <div class="ingredient-title-group">
                <span class="ingredient-name">3. Action</span>
                <span class="ingredient-role">The Robot's Muscles</span>
              </div>
            </div>
            <p class="ingredient-desc">Executes physical movement. Converts computed velocity commands (<code>/cmd_vel</code>) into motor torques, differential steering, and physical actuators.</p>
          </div>
        </div>
      </div>
    `}),a.push({id:`${t.id}_sec3_2_step1`,type:"concept",lessonNum:t.num_str,lessonId:t.id,module:t.module,sectionTitle:"3. Robotics Fundamentals & ROS 2 Architecture",badge:"🎬 Story Step 1",title:"3.2 Story: Step 1 — The Dream: Autonomous Medicine Delivery Robot",htmlContent:`
      <div class="story-step-slide-layout">
        <div class="story-visual-col">
          <img src="assets/images/story_step1_dream.jpg" alt="Step 1: The Dream" class="story-step-hero-img" />
          <span class="story-step-caption">The Goal: Autonomous Hospital Medicine Delivery</span>
        </div>
        <div class="story-narrative-col">
          <div class="story-quote-card">
            <div class="story-quote-tag">✨ The Ambition</div>
            <p class="story-quote-lead">"Someday, a student/engineer starts an ambitious robotics project: She wants to build an Autonomous Medicine Delivery Robot to safely transport hospital supplies directly to patient beds."</p>
          </div>
          <div class="story-insight-box">
            <h4 class="story-insight-title">The Initial Discovery</h4>
            <p>Soon, she discovers that robotics is immensely multifaceted. Building robust autonomy requires mastering hardware electronics, real-time control, sensor fusion, and inter-process communication.</p>
            <div class="story-pill-row">
              <span class="story-pill">🏥 Medicine Delivery</span>
              <span class="story-pill">⚡ Autonomous Nav</span>
              <span class="story-pill">⏳ Multi-Year Journey</span>
            </div>
          </div>
        </div>
      </div>
    `}),a.push({id:`${t.id}_sec3_2_step2`,type:"concept",lessonNum:t.num_str,lessonId:t.id,module:t.module,sectionTitle:"3. Robotics Fundamentals & ROS 2 Architecture",badge:"🎬 Story Step 2",title:"3.2 Story: Step 2 — The Plumbing Trap: LiDAR, Cameras, Motors & Sockets",htmlContent:`
      <div class="story-step-slide-layout">
        <div class="story-visual-col">
          <img src="assets/images/story_step2_plumbing.jpg" alt="Step 2: The Plumbing Trap" class="story-step-hero-img" />
          <span class="story-step-caption">The Reality: Drowning in Low-Level Drivers & Sockets</span>
        </div>
        <div class="story-narrative-col">
          <div class="story-quote-card">
            <div class="story-quote-tag warning-tag">⚠️ The Plumbing Trap</div>
            <p class="story-quote-lead">"All her engineering time is consumed by low-level plumbing instead of autonomous navigation logic."</p>
          </div>
          <div class="story-insight-box">
            <h4 class="story-insight-title">Four Vicious Technical Bottlenecks</h4>
            <ul class="story-trap-list">
              <li><strong>Sensor Drivers:</strong> Writing custom C parsers to extract distances from LiDAR.</li>
              <li><strong>Vision Buffers:</strong> Decoding raw USB/MIPI video frames into memory.</li>
              <li><strong>Motor PWM:</strong> Hacking microcontroller serial protocols to spin wheels.</li>
              <li><strong>IPC Glue:</strong> Writing raw POSIX sockets to sync independent processes.</li>
            </ul>
            <p class="story-footer-note"><em>Result: Months pass without writing a single line of hospital delivery navigation code.</em></p>
          </div>
        </div>
      </div>
    `}),a.push({id:`${t.id}_sec3_2_step3`,type:"concept",lessonNum:t.num_str,lessonId:t.id,module:t.module,sectionTitle:"3. Robotics Fundamentals & ROS 2 Architecture",badge:"🎬 Story Step 3",title:"3.2 Story: Step 3 — Goal Abandoned: Just an RC Car",htmlContent:`
      <div class="story-step-slide-layout">
        <div class="story-visual-col">
          <img src="assets/images/story_step3_burnout.jpg" alt="Step 3: Goal Abandoned" class="story-step-hero-img" />
          <span class="story-step-caption">Project Deadline: Glorified RC Car & Abandoned Prototype</span>
        </div>
        <div class="story-narrative-col">
          <div class="story-quote-card">
            <div class="story-quote-tag danger-tag">🛑 The Outcome</div>
            <p class="story-quote-lead">"The project deadline arrives (a 2–3 year PhD timeframe). No real progress was ever made on autonomous navigation."</p>
          </div>
          <div class="story-insight-box">
            <h4 class="story-insight-title">The Engineering Burnout</h4>
            <p>So much energy was exhausted building communication plumbing from scratch that the core project ambition—an autonomous medicine delivery AMR—was abandoned.</p>
            <div class="story-burnout-result">
              <strong>Final Deliverable:</strong> All she managed to build was getting motors to spin using a hacked handheld remote control—a glorified RC car. The robot sits dormant in the lab.
            </div>
          </div>
        </div>
      </div>
    `}),a.push({id:`${t.id}_sec3_2_step4`,type:"concept",lessonNum:t.num_str,lessonId:t.id,module:t.module,sectionTitle:"3. Robotics Fundamentals & ROS 2 Architecture",badge:"🎬 Story Step 4",title:"3.2 Story: Step 4 — The Vicious Cycle: Starting From Scratch Again",htmlContent:`
      <div class="story-step-slide-layout">
        <div class="story-visual-col">
          <img src="assets/images/story_step4_cycle.jpg" alt="Step 4: Another Guy Starts" class="story-step-hero-img" />
          <span class="story-step-caption">The Cycle Repeats: Incompatible Code & Wasted Years</span>
        </div>
        <div class="story-narrative-col">
          <div class="story-quote-card">
            <div class="story-quote-tag cycle-tag">🔄 The Vicious Cycle</div>
            <p class="story-quote-lead">"Weeks later, another developer wants to build a Food Delivery Robot. He finds her old code online, hoping to reuse it."</p>
          </div>
          <div class="story-insight-box">
            <h4 class="story-insight-title">The Non-Standardization Wall</h4>
            <p>Because her software was built without any standard middleware architecture, it is completely hardcoded, undocumented, and incompatible with his sensors.</p>
            <div class="story-cycle-footer">
              <strong>The Tragic Consequence:</strong> He cannot reuse anything. He has to start writing low-level drivers and custom IPC from absolute zero all over again!
            </div>
          </div>
        </div>
      </div>
    `}),a.push({id:`${t.id}_sec3_3_why_ros`,type:"concept",lessonNum:t.num_str,lessonId:t.id,module:t.module,sectionTitle:"3. Robotics Fundamentals & ROS 2 Architecture",badge:"⚡ Core Solution: Why ROS",title:"3.3 Why We Need ROS: Stop Reinventing the Wheel & Standardize",htmlContent:`
      <div class="deck-imperatives-layout">
        <div class="imperatives-visual-col">
          <div class="wheel-img-wrap">
            <img src="assets/images/reinvent_the_wheel.jpg" alt="Stop Reinventing the Wheel" class="wheel-hero-img" />
          </div>
          <div class="wheel-quote-box">
            <p class="wheel-quote-text"><em>“If you are busy making everything from scratch and rebuilding parts that someone has already worked on, you cannot make every part of your robot perfect.”</em></p>
            <div class="wheel-shift-tag">⚠️ The Core Trap: Rebuilding Low-Level Plumbing That Gets Forgotten</div>
          </div>
        </div>
        <div class="imperatives-cards-col">
          <div class="imperative-card">
            <div class="imperative-header"><span class="imperative-icon">🛑</span><h4 class="imperative-title">1. Stop Reinventing the Wheel</h4></div>
            <p>Never write custom motor drivers, coordinate transform math (TF2), or laser scan filters. ROS provides battle-tested packages conforming to universal coordinate conventions (REP-103 &amp; REP-105).</p>
          </div>
          <div class="imperative-card">
            <div class="imperative-header"><span class="imperative-icon">🔌</span><h4 class="imperative-title">2. Standardized Middleware</h4></div>
            <p>Pre-built, rock-solid communication channels (topics, services, actions) connect C++ drivers and Python AI controllers seamlessly over a high-speed DDS data bus.</p>
          </div>
          <div class="imperative-card">
            <div class="imperative-header"><span class="imperative-icon">🚀</span><h4 class="imperative-title">3. Focus on Applications</h4></div>
            <p>Never write socket plumbing again. Start on Day 1 by writing autonomous navigation (Nav2), mapping (SLAM Toolbox), and hospital delivery behaviors!</p>
          </div>
        </div>
      </div>
    `}),a.push({id:`${t.id}_sec3_4_metaphor_and_stack`,type:"concept",lessonNum:t.num_str,lessonId:t.id,module:t.module,sectionTitle:"3. Robotics Fundamentals & ROS 2 Architecture",badge:"💻 Architectural Metaphor",title:"3.4 What is ROS? The PC OS Metaphor & The 4-Tier Software Stack",htmlContent:`
      <div class="l02-metaphor-stack-layout">
        <!-- Col 1: Metaphor Visual (Enlarged) -->
        <div class="metaphor-col">
          <div class="metaphor-visual-card">
            <img src="assets/images/ros_metaphor_pc_vs_robot.jpg" alt="PC OS vs Robot OS Metaphor" />
          </div>
        </div>

        <!-- Col 2: Metaphor Comparisons & Meta-OS Reality (Replaced 1-4 points) -->
        <div class="stack-col">
          <div class="stack-alert-box">
            <strong>Core Reality: Middleware Framework, Not a Bare-Metal Kernel</strong><br/>
            ROS 2 does <em>not</em> manage CPU scheduling or raw memory. It is a <strong>meta-operating system</strong> installing in user space on top of Ubuntu Linux.
          </div>
          <div class="metaphor-comparisons">
            <div class="metaphor-compare-card pc-compare">
              <div class="card-tag"><span>🖥️</span><strong>Personal Computers (Windows / macOS)</strong></div>
              <p>Standardizes hardware abstraction (GPUs, audio, USB, Wi-Fi) and graphics APIs (DirectX). Devs focus on gameplay, not writing graphics card microcode.</p>
            </div>
            <div class="metaphor-compare-card amr-compare">
              <div class="card-tag"><span>🤖</span><strong>Autonomous Mobile Robots (ROS 2)</strong></div>
              <p>Standardizes hardware abstraction (LiDAR, cameras, IMUs, motor drives) and DDS IPC. Autonomy engineers focus on navigation, not low-level byte parsing.</p>
            </div>
          </div>
          <div class="stack-takeaway">
            <strong>💡 Unified Engineering Takeaway:</strong> The PC OS metaphor explains <em>why</em> we standardize (hardware independence); ROS 2 sits as a user-space meta-OS over Linux to achieve this.
          </div>
        </div>
      </div>
    `}),a.push({id:`${t.id}_sec3_5_pillars`,type:"concept",lessonNum:t.num_str,lessonId:t.id,module:t.module,sectionTitle:"3. Robotics Fundamentals & ROS 2 Architecture",badge:"🏛️ Architectural Pillars",title:"3.5 The 4 Foundational Pillars of ROS",htmlContent:`
      <div class="deck-pillars-grid">
        <div class="pillar-card">
          <div class="pillar-header"><span class="pillar-icon">🔌</span><span class="pillar-title">1. Plumbing</span></div>
          <p class="pillar-sub">Data Distribution &amp; IPC</p>
          <p class="pillar-desc">Peer-to-peer publish-subscribe messaging, request-reply services, and preemptible goal actions connecting nodes across processes and networks.</p>
        </div>
        <div class="pillar-card">
          <div class="pillar-header"><span class="pillar-icon">🛠️</span><span class="pillar-title">2. Tools</span></div>
          <p class="pillar-sub">Inspection &amp; Diagnostics</p>
          <p class="pillar-desc">Universal tooling: <code>ros2 cli</code> for command introspection, <strong>RViz2</strong> for 3D sensor rendering, and <strong>rqt_graph</strong> for live node topology.</p>
        </div>
        <div class="pillar-card">
          <div class="pillar-header"><span class="pillar-icon">🧠</span><span class="pillar-title">3. Capabilities</span></div>
          <p class="pillar-sub">Advanced Autonomy Stacks</p>
          <p class="pillar-desc">State-of-the-art out-of-the-box navigation (Nav2), simultaneous localization and mapping (SLAM Toolbox), and 3D kinematics calculation (TF2).</p>
        </div>
        <div class="pillar-card">
          <div class="pillar-header"><span class="pillar-icon">🌍</span><span class="pillar-title">4. Ecosystem</span></div>
          <p class="pillar-sub">Global Open Community</p>
          <p class="pillar-desc">Maintained by Open Robotics and the ROS 2 Technical Steering Committee (TSC). Over 3,000+ open-source robotics packages available on ROS Index.</p>
        </div>
      </div>
    `}),a.push({id:`${t.id}_sec3_6_motion_flow`,type:"concept",lessonNum:t.num_str,lessonId:t.id,module:t.module,sectionTitle:"3. Robotics Fundamentals & ROS 2 Architecture",badge:"🧬 Full Motion Pipeline",title:"3.6 The Robot as a Living Organism: End-to-End Motion Flow",htmlContent:`
      <div class="motion-flow-slide-layout">
        <div class="motion-flow-image-wrap">
          <img src="assets/images/ros2_motion_architecture.svg" alt="ROS 2 Motion Architecture & Data Flow" class="motion-flow-hero-img" />
        </div>
        <div class="motion-stages-row">
          <div class="motion-stage-card stage-senses">
            <div class="stage-card-head"><span class="stage-num-badge">Stage 1</span><span class="stage-title">👁️ Senses</span></div>
            <p class="stage-desc">LiDAR, IMU & Cameras (10–50 Hz)</p>
          </div>
          <div class="motion-stage-card stage-nerves">
            <div class="stage-card-head"><span class="stage-num-badge">Stage 2</span><span class="stage-title">⚡ Nerves</span></div>
            <p class="stage-desc">DDS Bus Serialization (µs Latency)</p>
          </div>
          <div class="motion-stage-card stage-brain">
            <div class="stage-card-head"><span class="stage-num-badge">Stage 3</span><span class="stage-title">🧠 Brain</span></div>
            <p class="stage-desc">SLAM & Nav2 Path Planning</p>
          </div>
          <div class="motion-stage-card stage-muscles">
            <div class="stage-card-head"><span class="stage-num-badge">Stage 4</span><span class="stage-title">💪 Muscles</span></div>
            <p class="stage-desc">Motor Actuators (<code>/cmd_vel</code>)</p>
          </div>
        </div>
      </div>
    `}),a.push({id:`${t.id}_sec3_7_ros1_vs_ros2`,type:"concept",lessonNum:t.num_str,lessonId:t.id,module:t.module,sectionTitle:"3. Robotics Fundamentals & ROS 2 Architecture",badge:"⚖️ Architecture Comparison",title:"3.7 ROS 1 vs. ROS 2: The Architectural Paradigm Shift",htmlContent:`
      <div class="deck-ros-arch-slide-layout">
        <div class="arch-visual-wrap">
          <img src="assets/images/ros1_vs_ros2_dds.svg" alt="ROS 1 Master vs ROS 2 DDS Architecture" class="ros-arch-hero-img" />
        </div>
        <div class="arch-key-points-grid">
          <div class="arch-point-card ros1-point">
            <div class="point-badge-wrap"><span class="point-badge ros1">ROS 1 Legacy</span><strong>Centralized Master (roscore)</strong></div>
            <p><strong>Single Point of Failure:</strong> If <code>roscore</code> master crashes, the entire robot network fails. Custom TCPROS transports with fragmented C++ (<code>roscpp</code>) and Python (<code>rospy</code>) codebases.</p>
          </div>
          <div class="arch-point-card ros2-point">
            <div class="point-badge-wrap"><span class="point-badge ros2">ROS 2 Modern</span><strong>Decentralized Peer-to-Peer (DDS)</strong></div>
            <p><strong>Industrial Grade & Fault-Tolerant:</strong> Zero single points of failure. Tunable Quality of Service (QoS). Unified C core (<code>rcl</code>) guarantees 100% feature parity across Python and C++.</p>
          </div>
        </div>
      </div>
    `}),a.push({id:`${t.id}_sec4_timeline`,type:"concept",lessonNum:t.num_str,lessonId:t.id,module:t.module,sectionTitle:"4. ROS 2 Release Timeline",badge:"📅 Release Cadence",title:"4. ROS 2 Release Timeline: Jazzy Jalisco (LTS)",htmlContent:`
      <div class="deck-timeline-layout">
        <p>ROS 2 distributions follow a predictable release cadence synchronized with Ubuntu LTS releases:</p>
        <div class="timeline-cards-row">
          <div class="timeline-distro-card past">
            <span class="distro-year">May 2022</span>
            <strong class="distro-name">Humble Hawksbill</strong>
            <span class="distro-os">Ubuntu 22.04 LTS</span>
            <span class="distro-status eol-soon">LTS • Supported to May 2027</span>
          </div>
          <div class="timeline-distro-card active">
            <span class="distro-badge-current">ACTIVE COURSE TARGET</span>
            <span class="distro-year">May 2024</span>
            <strong class="distro-name">Jazzy Jalisco</strong>
            <span class="distro-os">Ubuntu 24.04 LTS (Noble)</span>
            <span class="distro-status active-lts">LTS • Supported to May 2029</span>
          </div>
          <div class="timeline-distro-card future">
            <span class="distro-year">May 2026</span>
            <strong class="distro-name">K-Turtle Distribution</strong>
            <span class="distro-os">Ubuntu 26.04 LTS</span>
            <span class="distro-status planned">Next LTS Generation</span>
          </div>
        </div>
        <div class="timeline-note-card">
          <strong>Why Jazzy Jalisco?</strong> Jazzy provides Linux 6.8 kernel compatibility, Python 3.12 support, updated DDS vendors (FastDDS 2.14, CycloneDDS 0.10), and enhanced Nav2 dynamic obstacle avoidance.
        </div>
      </div>
    `}),a.push({id:`${t.id}_sec5_install_pipeline`,type:"concept",lessonNum:t.num_str,lessonId:t.id,module:t.module,sectionTitle:"5. Step-by-Step Installation on Ubuntu 24.04 LTS",badge:"📦 Installation Pipeline",title:"5. Complete Installation Pipeline: APT Repositories to ROS 2 Desktop Suite",htmlContent:`
      <div class="l02-install-pipeline-layout">
        <!-- Col 1: Repositories & Security GPG -->
        <div class="l02-install-col">
          <div class="l03-subcol-header">
            <span class="l03-subcol-badge">5.1–5.3 Repositories &amp; GPG Keys</span>
            <span class="l03-subcol-sub">APT Sources Configuration</span>
          </div>
          <div class="l03-cmd-card">
            <div class="l03-cmd-header"><span class="l03-term-badge">bash</span><strong>Configure Repositories &amp; Keys</strong></div>
            <pre><code class="language-bash"># 1. Enable Universe & Import GPG Key
sudo add-apt-repository universe -y
sudo curl -sSL https://raw.githubusercontent.com/ros/rosdistro/master/ros.key -o /usr/share/keyrings/ros-archive-keyring.gpg

# 2. Add Official APT Repository
echo "deb [signed-by=.../ros.gpg] http://packages.ros.org/ros2/ubuntu noble main" | sudo tee /etc/apt/sources.list.d/ros2.list</code></pre>
          </div>
        </div>

        <!-- Col 2: Desktop Suite & Rosdep Init -->
        <div class="l02-install-col">
          <div class="l03-subcol-header">
            <span class="l03-subcol-badge">5.4–5.5 Desktop Suite &amp; Rosdep</span>
            <span class="l03-subcol-sub">Package Installation</span>
          </div>
          <div class="l03-cmd-card">
            <div class="l03-cmd-header"><span class="l03-term-badge">bash</span><strong>Install Desktop &amp; Initialize Rosdep</strong></div>
            <pre><code class="language-bash"># 1. Update Indexes & Install Desktop Suite
sudo apt update && sudo apt install -y ros-jazzy-desktop python3-colcon-common-extensions

# 2. Initialize Dependency Resolver (rosdep)
sudo apt install -y python3-rosdep && sudo rosdep init && rosdep update</code></pre>
          </div>
        </div>

        <!-- Row 2: Verification & Lab Outcome -->
        <div class="l02-install-bottom-bar">
          <div class="l03-concept-card">
            <div class="l03-concept-header"><span class="l03-card-icon">🔐</span><strong>Cryptographic Verification</strong></div>
            <p>GPG keyring guarantees package authenticity from <code>packages.ros.org</code>, preventing untrusted package tampering.</p>
          </div>
          <div class="l03-concept-card" style="background: rgba(16, 185, 129, 0.08); border-color: rgba(16, 185, 129, 0.25);">
            <div class="l03-concept-header"><span class="l03-card-icon">📦</span><strong>Installed Outcome (Lab Pre-Configured)</strong></div>
            <p>Deploys RViz2, DDS libraries, and <code>colcon</code> to <code>/opt/ros/jazzy</code>. Pre-installed &amp; cached in your lab container!</p>
          </div>
        </div>
      </div>
    `}),a.push({id:`${t.id}_sec6_desktop_gui`,type:"concept",lessonNum:t.num_str,lessonId:t.id,module:t.module,sectionTitle:"6. Developer Environment & Lab Access",badge:"🖥️ Lab Tooling Suite",title:"6. Developer Environment: Desktop GUI, In-Browser VS Code & Terminals",htmlContent:`
      <div class="deck-unified-env-layout">
        <p class="env-intro-bar">The AMR Learning Hub provides three synchronized access methods into the containerized ROS 2 Jazzy environment:</p>
        <div class="env-cards-grid">
          <div class="env-tool-card">
            <div class="env-tool-header">
              <span class="env-tool-icon">🖥️</span>
              <strong class="env-tool-title">noVNC Desktop GUI</strong>
            </div>
            <span class="env-tool-port-badge">Port 6080 • /vnc.html</span>
            <p class="env-tool-desc">Full XFCE graphical desktop running inside your browser without installing local VNC clients.</p>
            <ul class="env-tool-highlights">
              <li>Launch <strong>RViz2</strong> for 3D LiDAR & TF trees</li>
              <li>Open <strong>Gazebo</strong> for physical AMR simulation</li>
              <li>Set <em>Remote Resizing</em> mode for crisp display</li>
            </ul>
          </div>
          <div class="env-tool-card">
            <div class="env-tool-header">
              <span class="env-tool-icon">💻</span>
              <strong class="env-tool-title">In-Browser VS Code IDE</strong>
            </div>
            <span class="env-tool-port-badge">Port 8443 • Web IDE</span>
            <p class="env-tool-desc">Professional code editor mounted directly to the student robotics workspace.</p>
            <ul class="env-tool-highlights">
              <li>Python IntelliSense for <code>rclpy</code> & nodes</li>
              <li>URDF, Xacro & launch XML syntax coloring</li>
              <li>Integrated shell with <code>Ctrl + \`</code></li>
            </ul>
          </div>
          <div class="env-tool-card">
            <div class="env-tool-header">
              <span class="env-tool-icon">⌨️</span>
              <strong class="env-tool-title">Interactive Terminals</strong>
            </div>
            <span class="env-tool-port-badge">Terminator & CLI</span>
            <p class="env-tool-desc">High-efficiency shell access to build and orchestrate distributed ROS 2 nodes.</p>
            <ul class="env-tool-highlights">
              <li><strong>Terminator:</strong> 4-pane grid (<code>Ctrl+Shift+O/E</code>)</li>
              <li><strong>Desktop Hotkey:</strong> <code>Ctrl + Alt + T</code> in noVNC</li>
              <li><strong>Host Shell:</strong> <code>docker exec -it ...</code></li>
            </ul>
          </div>
        </div>
      </div>
    `}),a.push({id:`${t.id}_sec8_9_sourcing_verification`,type:"concept",lessonNum:t.num_str,lessonId:t.id,module:t.module,sectionTitle:"8 & 9. Sourcing Environment & Multi-Terminal Verification",badge:"🧪 Activation & Smoke Test",title:"8 & 9. Environment Activation & Multi-Terminal Smoke Test Verification",htmlContent:`
      <div class="l02-sourcing-smoke-layout">
        <!-- Col 1: Sourcing & Automation -->
        <div class="l02-install-col">
          <div class="l03-subcol-header">
            <span class="l03-subcol-badge">8. Shell Activation</span>
            <span class="l03-subcol-sub">Underlay Sourcing</span>
          </div>
          <div class="l03-cmd-card">
            <div class="l03-cmd-header"><span class="l03-term-badge">bash</span><strong>Source &amp; Automate with ~/.bashrc</strong></div>
            <pre><code class="language-bash"># 1. Source ROS 2 underlay
source /opt/ros/jazzy/setup.bash

# 2. Automate in ~/.bashrc
echo "source /opt/ros/jazzy/setup.bash" >> ~/.bashrc

# 3. Confirm active distribution variable
echo $ROS_DISTRO  # Expected Output: jazzy</code></pre>
          </div>
          <div class="l03-concept-card">
            <div class="l03-concept-header"><span class="l03-card-icon">⚙️</span><strong>Underlay Mechanics &amp; Automation</strong></div>
            <p>Injects <code>ros2</code> CLI into <code>$PATH</code> and sets <code>$AMENT_PREFIX_PATH</code>. Appending to <code>~/.bashrc</code> ensures all new terminal panes auto-load the environment.</p>
          </div>
        </div>

        <!-- Col 2: Verification Smoke Test -->
        <div class="l02-install-col">
          <div class="l03-subcol-header">
            <span class="l03-subcol-badge">9. Distributed Smoke Test</span>
            <span class="l03-subcol-sub">Multi-Terminal Verification</span>
          </div>
          <div class="l03-cmd-card">
            <div class="l03-cmd-header"><span class="l03-term-badge" style="background:#3b82f6;color:#fff;">Terminal 1: C++ Talker</span><strong>Publisher Node</strong></div>
            <pre><code class="language-bash">ros2 run demo_nodes_cpp talker
# Telemetry: [INFO] [talker]: Publishing: 'Hello World: 1'</code></pre>
          </div>
          <div class="l03-cmd-card">
            <div class="l03-cmd-header"><span class="l03-term-badge" style="background:#10b981;color:#fff;">Terminal 2: Python Listener</span><strong>Subscriber Node</strong></div>
            <pre><code class="language-bash">ros2 run demo_nodes_py listener
# Telemetry: [INFO] [listener]: I heard: [Hello World: 1]</code></pre>
          </div>
          <div class="l03-concept-card" style="background: rgba(59, 130, 246, 0.08); border-color: rgba(59, 130, 246, 0.25);">
            <div class="l03-concept-header"><span class="l03-card-icon">🚀</span><strong>Specific Outcome: DDS Bus Integrity Verified</strong></div>
            <p>Demonstrates cross-language peer-to-peer DDS telemetry exchange between independent C++ and Python OS processes with zero central master failure points.</p>
          </div>
        </div>
      </div>
    `})}function ii(s,t,a){a.push({id:`${t.id}_interactive_turtlesim`,type:"interactive",interactiveKey:"turtlesim",lessonNum:t.num_str,lessonId:t.id,module:t.module,sectionTitle:"Interactive Simulation & Computational Graph Flow",title:"Turtlesim Teleop & Computational Graph Architecture"}),a.push({id:`${t.id}_sec2_1_canvas`,type:"concept",lessonNum:t.num_str,lessonId:t.id,module:t.module,sectionTitle:"2. Launching Turtlesim: The Simulation Playground",badge:"🐢 Simulation Canvas",title:"2.1 Launching Turtlesim Simulation Canvas Node",htmlContent:`
      <div class="l03-two-col-layout">
        <div class="l03-visual-col">
          <div class="l03-visual-frame">
            <img src="assets/images/turtlesim_simulation_canvas.png" alt="Turtlesim Simulation Canvas" class="l03-hero-img" />
            <span class="l03-visual-caption">Turtlesim 2D Canvas (Origin at center: x = 5.54, y = 5.54, &theta; = 0.0 rad)</span>
          </div>
        </div>
        <div class="l03-content-col">
          <div class="l03-cmd-card">
            <div class="l03-cmd-header"><span class="l03-term-badge">Terminal 1</span><strong>Launch Canvas Node</strong></div>
            <pre><code class="language-bash">ros2 run turtlesim turtlesim_node</code></pre>
          </div>
          <div class="l03-concept-card">
            <div class="l03-concept-header"><span class="l03-card-icon">🗺️</span><strong>2D Coordinate Arena</strong></div>
            <p>Spawns an 11.08 &times; 11.08 unit coordinate grid following ROS <strong>REP-103</strong> conventions (+X forward, +Y left, +&theta; counter-clockwise).</p>
          </div>
          <div class="l03-concept-card">
            <div class="l03-concept-header"><span class="l03-card-icon">🤖</span><strong>Kinematic Representation</strong></div>
            <p>Emulates an autonomous differential-drive robot (<code>/turtle1</code>) ready to receive velocity inputs and stream live pose odometry.</p>
          </div>
        </div>
      </div>
    `}),a.push({id:`${t.id}_sec2_2_teleop`,type:"concept",lessonNum:t.num_str,lessonId:t.id,module:t.module,sectionTitle:"2. Launching Turtlesim: The Simulation Playground",badge:"⌨️ Teleoperation Control",title:"2.2 Keyboard Teleoperation Control (turtle_teleop_key)",htmlContent:`
      <div class="l03-two-col-layout">
        <div class="l03-visual-col">
          <div class="l03-visual-frame">
            <img src="assets/images/turtle_teleop_key_running.png" alt="Keyboard Teleop Running" class="l03-hero-img" />
            <span class="l03-visual-caption">turtle_teleop_key: Real-Time Arrow Key Capture &amp; Velocity Publishing</span>
          </div>
        </div>
        <div class="l03-content-col">
          <div class="l03-cmd-card">
            <div class="l03-cmd-header"><span class="l03-term-badge">Terminal 2</span><strong>Launch Teleoperation Node</strong></div>
            <pre><code class="language-bash">ros2 run turtlesim turtle_teleop_key</code></pre>
          </div>
          <div class="l03-concept-card">
            <div class="l03-concept-header"><span class="l03-card-icon">🎮</span><strong>Arrow Key Teleop Mapping</strong></div>
            <p><strong>Up / Down:</strong> Linear velocity (&plusmn;2.0 m/s).<br/><strong>Left / Right:</strong> Angular yaw velocity (&plusmn;2.0 rad/s).</p>
          </div>
          <div class="l03-concept-card">
            <div class="l03-concept-header"><span class="l03-card-icon">⚠️</span><strong>OS Window Focus Requirement</strong></div>
            <p>The terminal executing <code>turtle_teleop_key</code> must retain active desktop window focus to capture keystrokes and broadcast commands.</p>
          </div>
          <div class="l03-concept-card" style="border-left: 3px solid #10b981; background: rgba(16, 185, 129, 0.05);">
            <div class="l03-concept-header"><span class="l03-card-icon">🐚</span><strong>Permanent Sourcing in ~/.bashrc</strong></div>
            <p>Ensure newly opened terminal panes auto-load ROS 2 without typing source each time:<br/>
            <code>echo "source /opt/ros/jazzy/setup.bash" &gt;&gt; ~/.bashrc</code></p>
          </div>
        </div>
      </div>
    `}),a.push({id:`${t.id}_sec3_rqt_graph`,type:"concept",lessonNum:t.num_str,lessonId:t.id,module:t.module,sectionTitle:"3. Visualizing the Computational Graph (rqt_graph)",badge:"🌐 Computational Graph",title:"3. Visualizing the Computational Graph (rqt_graph)",htmlContent:`
      <div class="l03-two-col-layout l03-graph-layout">
        <div class="l03-visual-col">
          <div class="l03-visual-frame">
            <img src="assets/images/turtlesim_rqt_graph.png" alt="Turtlesim rqt_graph Computational Graph" class="l03-hero-img" />
            <span class="l03-visual-caption">rqt_graph: Active Nodes &amp; Inter-Process Topic Wiring</span>
          </div>
        </div>
        <div class="l03-content-col">
          <div class="l03-cmd-card">
            <div class="l03-cmd-header"><span class="l03-term-badge">Terminal 3</span><strong>Launch Graph Visualizer</strong></div>
            <pre><code class="language-bash">rqt_graph  # Or: ros2 run rqt_graph rqt_graph</code></pre>
          </div>
          <div class="l03-concept-card">
            <div class="l03-concept-header"><span class="l03-card-icon">🟢</span><strong>Nodes (Ovals)</strong></div>
            <p>Distinct executable processes (<code>/teleop_turtle</code> publisher and <code>/turtlesim</code> subscriber) running independently in OS user space.</p>
          </div>
          <div class="l03-concept-card">
            <div class="l03-concept-header"><span class="l03-card-icon">🟦</span><strong>Topics (Rectangles / Arrows)</strong></div>
            <p>Uni-directional message channel (<code>/turtle1/cmd_vel</code>) routing velocity data packets over the peer-to-peer DDS bus without a central master.</p>
          </div>
        </div>
      </div>
    `}),a.push({id:`${t.id}_sec4_node_introspection`,type:"concept",lessonNum:t.num_str,lessonId:t.id,module:t.module,sectionTitle:"4. Core Concept 1: Node Introspection (ros2 node)",badge:"🔍 Node Introspection",title:"4. Node Introspection: Discovery (ros2 node list) & Deep Interface Audit (ros2 node info)",htmlContent:`
      <div class="l03-two-col-layout l03-combined-node-layout">
        <div class="l03-subcol">
          <div class="l03-subcol-header">
            <span class="l03-subcol-badge">4.1 Active Node Discovery</span>
            <span class="l03-subcol-sub">Heartbeat Audit</span>
          </div>
          <div class="l03-cmd-card">
            <div class="l03-cmd-header"><span class="l03-term-badge">bash</span><strong>List Active Processes</strong></div>
            <pre><code class="language-bash">ros2 node list</code></pre>
          </div>
          <div class="l03-output-card">
            <div class="l03-output-header"><span class="l03-term-badge">output</span><strong>Discovered Nodes</strong></div>
            <pre><code class="language-text">/teleop_turtle
/turtlesim</code></pre>
          </div>
          <div class="l03-concept-card">
            <div class="l03-concept-header"><span class="l03-card-icon">⚙️</span><strong>Process Modularization</strong></div>
            <p>Every distinct robotics capability runs as an isolated OS process. If an AMR stops responding, run <code>ros2 node list</code> first to confirm all nodes are alive.</p>
          </div>
        </div>
        <div class="l03-subcol">
          <div class="l03-subcol-header">
            <span class="l03-subcol-badge">4.2 Deep Node Interface Audit</span>
            <span class="l03-subcol-sub">Endpoint Topology</span>
          </div>
          <div class="l03-cmd-card">
            <div class="l03-cmd-header"><span class="l03-term-badge">bash</span><strong>Inspect Node Endpoints</strong></div>
            <pre><code class="language-bash">ros2 node info /turtlesim</code></pre>
          </div>
          <div class="l03-output-card">
            <div class="l03-output-header"><span class="l03-term-badge">yaml</span><strong>Interface Topology</strong></div>
            <pre><code class="language-yaml">/turtlesim
  Subscribers: /turtle1/cmd_vel [geometry_msgs/msg/Twist]
  Publishers:  /turtle1/pose, /turtle1/color_sensor
  Services:    /clear, /reset, /spawn, /turtle1/set_pen</code></pre>
          </div>
          <div class="l03-concept-card">
            <div class="l03-concept-header"><span class="l03-card-icon">🔌</span><strong>4 Endpoint Families</strong></div>
            <p>Audits <strong>Subscribers</strong> (inputs), <strong>Publishers</strong> (telemetry), <strong>Services</strong> (synchronous RPC), and <strong>Actions</strong> (goals).</p>
          </div>
        </div>
      </div>
    `}),a.push({id:`${t.id}_sec5_topic_introspection`,type:"concept",lessonNum:t.num_str,lessonId:t.id,module:t.module,sectionTitle:"5. Core Concept 2: Topic Introspection (ros2 topic)",badge:"🚌 Topic Introspection",title:"5. Topic Introspection: Discovery (list -t), Telemetry (echo) & Frequency (hz)",htmlContent:`
      <div class="l03-three-col-layout">
        <!-- Col 1: 5.1 Discovery -->
        <div class="l03-topic-col">
          <div class="l03-subcol-header">
            <span class="l03-subcol-badge">5.1 Discovery</span>
            <span class="l03-subcol-sub">Contracts (-t)</span>
          </div>
          <div class="l03-cmd-card">
            <div class="l03-cmd-header"><span class="l03-term-badge">bash</span><strong>List Topics &amp; Types</strong></div>
            <pre><code class="language-bash">ros2 topic list -t</code></pre>
          </div>
          <div class="l03-output-card">
            <div class="l03-output-header"><span class="l03-term-badge">output</span><strong>Active Buses</strong></div>
            <pre><code class="language-text">/turtle1/cmd_vel [Twist]
/turtle1/color_sensor [Color]
/turtle1/pose [Pose]</code></pre>
          </div>
          <div class="l03-concept-card">
            <div class="l03-concept-header"><span class="l03-card-icon">🏷️</span><strong>Interface Contract</strong></div>
            <p>The <code>-t</code> flag exposes the exact IDL message type. Mismatched types trigger serialization failure.</p>
          </div>
        </div>

        <!-- Col 2: 5.2 Echo -->
        <div class="l03-topic-col">
          <div class="l03-subcol-header">
            <span class="l03-subcol-badge">5.2 Live Echo</span>
            <span class="l03-subcol-sub">Pose Telemetry</span>
          </div>
          <div class="l03-cmd-card">
            <div class="l03-cmd-header"><span class="l03-term-badge">bash</span><strong>Stream Topic Data</strong></div>
            <pre><code class="language-bash">ros2 topic echo /turtle1/pose</code></pre>
          </div>
          <div class="l03-output-card">
            <div class="l03-output-header"><span class="l03-term-badge">yaml</span><strong>Live Stream</strong></div>
            <pre><code class="language-yaml">x: 5.820  y: 5.544  theta: 0.0 rad
linear_velocity: 0.0 m/s
angular_velocity: 0.0 rad/s</code></pre>
          </div>
          <div class="l03-concept-card">
            <div class="l03-concept-header"><span class="l03-card-icon">📍</span><strong>Live Telemetry</strong></div>
            <p>Drive with teleop keys to view coordinates stream in real time. Validates encoders, IMU, and odometry.</p>
          </div>
        </div>

        <!-- Col 3: 5.3 Frequency -->
        <div class="l03-topic-col">
          <div class="l03-subcol-header">
            <span class="l03-subcol-badge">5.3 Frequency Audit</span>
            <span class="l03-subcol-sub">Deterministic Rate</span>
          </div>
          <div class="l03-cmd-card">
            <div class="l03-cmd-header"><span class="l03-term-badge">bash</span><strong>Measure Publish Rate</strong></div>
            <pre><code class="language-bash">ros2 topic hz /turtle1/pose</code></pre>
          </div>
          <div class="l03-output-card">
            <div class="l03-output-header"><span class="l03-term-badge">output</span><strong>Frequency Metrics</strong></div>
            <pre><code class="language-text">average rate: 62.503 Hz
min: 0.015s  max: 0.017s
std dev: 0.00049s  window: 64</code></pre>
          </div>
          <div class="l03-concept-card">
            <div class="l03-concept-header"><span class="l03-card-icon">⏱️</span><strong>Sensor Benchmarks</strong></div>
            <p>Turtlesim emits at <strong>62.5 Hz</strong>. In production: LiDAR (10–20 Hz), Cameras (30 Hz), IMU (100+ Hz).</p>
          </div>
        </div>
      </div>
    `}),a.push({id:`${t.id}_sec6_interface_twist`,type:"concept",lessonNum:t.num_str,lessonId:t.id,module:t.module,sectionTitle:"6. Core Concept 3: Topic Interface Types (ros2 interface)",badge:"📐 Message IDL",title:"6. Topic Interface Types & Ground Kinematics (ros2 interface)",htmlContent:`
      <div class="l03-two-col-layout">
        <div class="l03-left-code-col">
          <div class="l03-cmd-card">
            <div class="l03-cmd-header"><span class="l03-term-badge">bash</span><strong>Inspect Interface Definition</strong></div>
            <pre><code class="language-bash">ros2 interface show geometry_msgs/msg/Twist</code></pre>
          </div>
          <div class="l03-output-card">
            <div class="l03-output-header"><span class="l03-term-badge">idl</span><strong>Twist Message Structure</strong></div>
            <pre><code class="language-text">Vector3  linear
    float64 x
    float64 y
    float64 z
Vector3  angular
    float64 x
    float64 y
    float64 z</code></pre>
          </div>
        </div>
        <div class="l03-content-col">
          <div class="l03-concept-card">
            <div class="l03-concept-header"><span class="l03-card-icon">🏎️</span><strong>Planar Ground Kinematics</strong></div>
            <p>For differential-drive AMRs and Turtlesim, only <strong>2 degrees of freedom</strong> are controllable:</p>
            <ul class="l03-kinematics-list">
              <li><code>linear.x</code>: Forward (+) and Reverse (&minus;) velocity in m/s</li>
              <li><code>angular.z</code>: Yaw rotation steering speed in rad/s</li>
            </ul>
          </div>
          <div class="l03-concept-card">
            <div class="l03-concept-header"><span class="l03-card-icon">🔒</span><strong>Constrained Degrees of Freedom</strong></div>
            <p><code>linear.y</code>, <code>linear.z</code>, <code>angular.x</code>, and <code>angular.y</code> are strictly zero because ground robots cannot strafe laterally or fly.</p>
          </div>
        </div>
      </div>
    `}),a.push({id:`${t.id}_sec7_topic_pub`,type:"concept",lessonNum:t.num_str,lessonId:t.id,module:t.module,sectionTitle:"7. Moving the Robot Hands-On via CLI (ros2 topic pub)",badge:"⚡ Actuator Injection",title:"7. Moving the Robot via CLI: Single Step (--once) & Continuous Circle (-r 10)",htmlContent:`
      <div class="l03-two-col-layout l03-combined-pub-layout">
        <!-- Col 1: 7.1 pub --once -->
        <div class="l03-subcol">
          <div class="l03-subcol-header">
            <span class="l03-subcol-badge">7.1 Single Timestep Injection</span>
            <span class="l03-subcol-sub">--once</span>
          </div>
          <div class="l03-cmd-card">
            <div class="l03-cmd-header"><span class="l03-term-badge">bash</span><strong>Surge Forward at 2.0 m/s Once</strong></div>
            <pre><code class="language-bash">ros2 topic pub --once /turtle1/cmd_vel geometry_msgs/msg/Twist "{linear: {x: 2.0, y: 0.0, z: 0.0}, angular: {x: 0.0, y: 0.0, z: 0.0}}"</code></pre>
          </div>
          <div class="l03-concept-card">
            <div class="l03-concept-header"><span class="l03-card-icon">⚡</span><strong>Single Message Injection (--once)</strong></div>
            <p>Injects exactly one velocity message packet across DDS and immediately exits the publisher process.</p>
          </div>
          <div class="l03-concept-card">
            <div class="l03-concept-header"><span class="l03-card-icon">🛑</span><strong>Kinematic Deceleration</strong></div>
            <p>The robot surges forward at 2.0 m/s for one velocity timestep, then safely coasts to a complete halt.</p>
          </div>
          <div class="l03-concept-card">
            <div class="l03-concept-header"><span class="l03-card-icon">🛠️</span><strong>Hardware Commissioning</strong></div>
            <p>Used by engineers to test wheel polarity and emergency stop watchdogs on bare hardware.</p>
          </div>
        </div>

        <!-- Col 2: 7.2 pub -r 10 -->
        <div class="l03-subcol">
          <div class="l03-subcol-header">
            <span class="l03-subcol-badge">7.2 Continuous Motion in a Circle</span>
            <span class="l03-subcol-sub">-r 10 (10 Hz)</span>
          </div>
          <div class="l03-cmd-card">
            <div class="l03-cmd-header"><span class="l03-term-badge">bash</span><strong>Publish Periodic Stream at 10 Hz</strong></div>
            <pre><code class="language-bash">ros2 topic pub -r 10 /turtle1/cmd_vel geometry_msgs/msg/Twist "{linear: {x: 2.0, y: 0.0, z: 0.0}, angular: {x: 0.0, y: 0.0, z: 1.8}}"</code></pre>
          </div>
          <div class="l03-concept-card">
            <div class="l03-concept-header"><span class="l03-card-icon">🔄</span><strong>Continuous Rate Streaming (-r 10)</strong></div>
            <p>Publishes a message every 100 ms (10 Hz). The turtle drives continuously, drawing an ink circle.</p>
          </div>
          <div class="l03-concept-card">
            <div class="l03-concept-header"><span class="l03-card-icon">📐</span><strong>Arc Curvature Formula</strong></div>
            <p>Differential-drive radius: <code>R = v / &omega; = 2.0 / 1.8 &approx; 1.11 m</code>.</p>
          </div>
          <div class="l03-concept-card">
            <div class="l03-concept-header"><span class="l03-card-icon">🛑</span><strong>Interrupt Execution</strong></div>
            <p>Press <code>Ctrl + C</code> in the terminal to stop publishing; the robot smoothly coasts to a stop.</p>
          </div>
        </div>
      </div>
    `}),a.push({id:`${t.id}_sec8_cli_table`,type:"concept",lessonNum:t.num_str,lessonId:t.id,module:t.module,sectionTitle:"8. Summary Comparison Table of Essential CLI Tools",badge:"📊 Master Reference",title:"8. Essential ROS 2 CLI Tools & Production Use Cases",htmlContent:`
      <div class="l03-cli-table-layout">
        <div class="l03-cli-table-wrap">
          <table class="l03-summary-table">
            <thead>
              <tr>
                <th style="width: 28%;">Command</th>
                <th style="width: 36%;">Purpose</th>
                <th style="width: 36%;">Production Use Case</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><code>rqt_graph</code></td>
                <td>Visualizes computational graph nodes &amp; topic wiring</td>
                <td>Auditing communication topology &amp; detecting disconnected nodes</td>
              </tr>
              <tr>
                <td><code>ros2 run &lt;pkg&gt; &lt;exec&gt;</code></td>
                <td>Launches a specific executable node from a package</td>
                <td>Starting drivers, simulators, or single test scripts</td>
              </tr>
              <tr>
                <td><code>ros2 node list</code></td>
                <td>Lists all active nodes across the network</td>
                <td>Auditing if all expected subsystem nodes are alive</td>
              </tr>
              <tr>
                <td><code>ros2 node info &lt;node&gt;</code></td>
                <td>Details subscribers, publishers, services, actions</td>
                <td>Verifying interface names and endpoint wiring</td>
              </tr>
              <tr>
                <td><code>ros2 topic list -t</code></td>
                <td>Lists all active topics with their message types</td>
                <td>Discovering sensor and telemetry buses</td>
              </tr>
              <tr>
                <td><code>ros2 topic echo &lt;topic&gt;</code></td>
                <td>Prints incoming message payloads to the console</td>
                <td>Live debugging of sensor values or trajectory points</td>
              </tr>
              <tr>
                <td><code>ros2 topic hz &lt;topic&gt;</code></td>
                <td>Measures publish rate in Hertz</td>
                <td>Verifying camera / LiDAR sensor update rates</td>
              </tr>
              <tr>
                <td><code>ros2 interface show &lt;type&gt;</code></td>
                <td>Shows message fields and structural types</td>
                <td>Inspecting data format before writing Python code</td>
              </tr>
              <tr>
                <td><code>ros2 topic pub &lt;topic&gt; &lt;type&gt; &lt;yaml&gt;</code></td>
                <td>Injects messages onto a topic from the CLI</td>
                <td>Testing actuators or emergency stop commands</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    `})}function ni(s,t,a){a.push({id:`${t.id}_sec2_workspace_hierarchy`,type:"concept",lessonNum:t.num_str,lessonId:t.id,module:t.module,sectionTitle:"2. The ROS 2 Workspace Architecture",badge:"📁 Workspace Quartet",title:"2. The ROS 2 Workspace Architecture (~/ros2_ws)",htmlContent:`
      <div class="l04-two-col-layout">
        <div class="l04-visual-col">
          <div class="l04-visual-frame">
            <img src="assets/images/ros2_workspace_tree.svg" alt="ROS 2 Workspace Hierarchy" class="l04-hero-svg" />
            <span class="l04-visual-caption">Standard 4-directory hierarchy managed by the colcon meta-build tool.</span>
          </div>
          <div class="l04-golden-card warning" style="margin-top: 0.35rem;">
            <div class="l04-golden-header"><span>⚠️</span><strong>Workspace Golden Rule</strong></div>
            <p>Never commit <code>build/</code>, <code>install/</code>, or <code>log/</code> to Git! Add them to <code>.gitignore</code>. Only <code>src/</code> is version-controlled.</p>
          </div>
        </div>
        <div class="l04-content-col">
          <div class="l03-concept-card">
            <div class="l03-concept-header"><span class="l03-card-icon">📂</span><strong>src/ (Source Code)</strong></div>
            <p>The <strong>only directory you write code in</strong>. Houses cloned Git repositories, scaffolded packages, Python modules, and C++ source files.</p>
          </div>
          <div class="l03-concept-card">
            <div class="l03-concept-header"><span class="l03-card-icon">⚙️</span><strong>build/ (Build Artifacts)</strong></div>
            <p>Created by <code>colcon</code>. Stores intermediate build caches, CMake files, and object binaries. Never edit files in this folder manually.</p>
          </div>
          <div class="l03-concept-card">
            <div class="l03-concept-header"><span class="l03-card-icon">🚀</span><strong>install/ (Installed Runtime)</strong></div>
            <p>Where <code>colcon</code> stages executable scripts, shared libraries, and <code>setup.bash</code> files. Sourced into your active terminal.</p>
          </div>
          <div class="l03-concept-card">
            <div class="l03-concept-header"><span class="l03-card-icon">📋</span><strong>log/ (Diagnostic Records)</strong></div>
            <p>Sequential execution logs per package. Contains detailed stdout/stderr dumps to pinpoint compilation or test failures.</p>
          </div>
        </div>
      </div>
    `}),a.push({id:`${t.id}_sec3_overlay_underlay`,type:"concept",lessonNum:t.num_str,lessonId:t.id,module:t.module,sectionTitle:"3. Underlays vs. Overlays: The Environment Chaining Model",badge:"⛓️ Environment Chaining",title:"3. Underlays vs. Overlays: Environment Chaining",htmlContent:`
      <div class="l04-two-col-layout">
        <div class="l04-visual-col">
          <div class="l04-visual-frame">
            <img src="assets/images/ros2_overlay_underlay.svg" alt="Overlay vs Underlay Chaining" class="l04-hero-svg" />
            <span class="l04-visual-caption">Environment Chaining: Sourced overlays shadow base underlays via AMENT_PREFIX_PATH.</span>
          </div>
        </div>
        <div class="l04-content-col">
          <div class="l03-concept-card">
            <div class="l03-concept-header"><span class="l03-card-icon">🏛️</span><strong>The Underlay (/opt/ros/jazzy)</strong></div>
            <p>The system-wide immutable ROS 2 distribution installed via Ubuntu <code>apt</code>. Houses core middleware (DDS), standard CLI tools, and official hardware drivers.</p>
          </div>
          <div class="l03-concept-card">
            <div class="l03-concept-header"><span class="l03-card-icon">📦</span><strong>The Overlay (~/ros2_ws)</strong></div>
            <p>Your local user development workspace. When you source <code>~/ros2_ws/install/setup.bash</code>, your packages layer on top of the underlay.</p>
          </div>
          <div class="l03-concept-card">
            <div class="l03-concept-header"><span class="l03-card-icon">🔄</span><strong>Priority Shadowing &amp; Safety</strong></div>
            <p>If an overlay package shares the exact same name as an underlay package, ROS 2 selects the overlay version first. You can patch upstream packages without root permissions!</p>
          </div>
        </div>
      </div>
    `}),a.push({id:`${t.id}_sec4_init_and_build`,type:"concept",lessonNum:t.num_str,lessonId:t.id,module:t.module,sectionTitle:"4. Initializing & Building a Workspace",badge:"⚙️ Workspace Setup",title:"4. Initializing, Building & Sourcing Workspace",htmlContent:`
      <div class="l04-two-col-layout">
        <div class="l04-content-col">
          <div class="l03-cmd-card">
            <div class="l03-cmd-header"><span class="l03-term-badge">Step 1</span><strong>Create Source Tree</strong></div>
            <pre><code class="language-bash">mkdir -p ~/ros2_ws/src</code></pre>
          </div>
          <div class="l03-cmd-card">
            <div class="l03-cmd-header"><span class="l03-term-badge">Step 2</span><strong>Meta-Build from Root</strong></div>
            <pre><code class="language-bash">cd ~/ros2_ws && colcon build</code></pre>
          </div>
          <div class="l03-cmd-card">
            <div class="l03-cmd-header"><span class="l03-term-badge">Step 3</span><strong>Source Local Overlay</strong></div>
            <pre><code class="language-bash">source ~/ros2_ws/install/setup.bash</code></pre>
          </div>
          <div class="l03-cmd-card">
            <div class="l03-cmd-header"><span class="l03-term-badge">Step 4</span><strong>Permanent ~/.bashrc Sourcing</strong></div>
            <pre><code class="language-bash">echo "source ~/ros2_ws/install/setup.bash" >> ~/.bashrc</code></pre>
          </div>
        </div>
        <div class="l04-content-col">
          <div class="l03-output-card">
            <div class="l03-output-header"><span class="l03-card-icon">🖥️</span><strong>Specific Observable Outcome</strong></div>
            <pre><code class="language-text">Summary: 0 packages finished [0.25s]

$ ls ~/ros2_ws
build  install  log  src</code></pre>
          </div>
          <div class="l03-concept-card">
            <div class="l03-concept-header"><span class="l03-card-icon">⚙️</span><strong>colcon 5-Phase Lifecycle</strong></div>
            <p><strong>1. Discovery:</strong> Scans <code>src/</code> for <code>package.xml</code>.<br/>
            <strong>2. Dependency Graph:</strong> Resolves topological ordering.<br/>
            <strong>3. Parallel Execution:</strong> Invokes build tool (setuptools/CMake).<br/>
            <strong>4. Isolation:</strong> Stages binaries cleanly into <code>install/</code>.</p>
          </div>
        </div>
      </div>
    `}),a.push({id:`${t.id}_sec5_package_definition`,type:"concept",lessonNum:t.num_str,lessonId:t.id,module:t.module,sectionTitle:"5. What Makes a Folder a ROS 2 Package?",badge:"📦 Package Concepts",title:"5.1 Package Definition & Build Types",htmlContent:`
      <div class="l04-two-col-layout">
        <div class="l04-content-col">
          <div class="l03-concept-card">
            <div class="l03-concept-header"><span class="l03-card-icon">📦</span><strong>What is a ROS 2 Package?</strong></div>
            <p>The atomic unit of software distribution, compilation, and dependency tracking in ROS 2. Nodes cannot exist as loose files—they must belong to a package.</p>
          </div>
          <div class="l03-concept-card">
            <div class="l03-concept-header"><span class="l03-card-icon">🐍</span><strong>ament_python Build Type</strong></div>
            <p>Designed for pure Python nodes, launch scripts, and CLI utilities. Uses Python standard <code>setup.py</code> and setuptools. Provides instant hot-reloading with <code>--symlink-install</code>.</p>
          </div>
          <div class="l03-concept-card">
            <div class="l03-concept-header"><span class="l03-card-icon">⚡</span><strong>ament_cmake Build Type</strong></div>
            <p>Designed for C++ performance nodes, real-time motor controllers, and <strong>custom message/service definitions</strong> (<code>.msg</code>, <code>.srv</code>, <code>.action</code>). Uses <code>CMakeLists.txt</code>.</p>
          </div>
        </div>
        <div class="l04-content-col">
          <div class="l04-golden-card">
            <div class="l04-golden-header"><span>📋</span><strong>3 Inviolable Package Requirements</strong></div>
            <p>To be recognized as a valid ROS 2 package by <code>colcon</code>, a folder must fulfill:</p>
            <ul style="margin: 0.4rem 0 0 1rem; padding: 0; font-size: 0.76rem; line-height: 1.4; color: var(--text-secondary);">
              <li><strong>1. package.xml Manifest:</strong> Must declare schema Format 3 (<code>&lt;package format="3"&gt;</code>) and package dependencies.</li>
              <li><strong>2. Build Configuration:</strong> Must contain either <code>setup.py</code> (Python) or <code>CMakeLists.txt</code> (C++).</li>
              <li><strong>3. Filesystem Location:</strong> Must reside inside the workspace's <code>src/</code> directory tree.</li>
            </ul>
          </div>
          <div class="l03-concept-card" style="margin-top: 0.35rem;">
            <div class="l03-concept-header"><span class="l03-card-icon">💡</span><strong>AMR Architecture Pattern</strong></div>
            <p>Autonomous robots typically pair high-level Python packages (behavior trees, mission dispatch) with low-level C++ packages (kinematics, LiDAR drivers).</p>
          </div>
        </div>
      </div>
    `}),a.push({id:`${t.id}_sec5_package_anatomy`,type:"concept",lessonNum:t.num_str,lessonId:t.id,module:t.module,sectionTitle:"5. What Makes a Folder a ROS 2 Package?",badge:"🔍 Package Anatomy",title:"5.2 Python Package Anatomy & Essential Files",htmlContent:`
      <div class="l04-two-col-layout">
        <div class="l04-visual-col">
          <div class="l04-visual-frame">
            <img src="assets/images/ros2_package_tree.svg" alt="ROS 2 Python Package Anatomy" class="l04-hero-svg" />
            <span class="l04-visual-caption">Essential anatomy of an ament_python package: Manifest, entry points, and marker files.</span>
          </div>
        </div>
        <div class="l04-content-col">
          <div class="l03-concept-card">
            <div class="l03-concept-header"><span class="l03-card-icon">📋</span><strong>package.xml (The Manifest)</strong></div>
            <p>Declares package name, version, license, and build/runtime dependencies (<code>&lt;depend&gt;</code>) parsed by <code>colcon</code> and <code>rosdep</code>.</p>
          </div>
          <div class="l03-concept-card">
            <div class="l03-concept-header"><span class="l03-card-icon">⚙️</span><strong>setup.py &amp; setup.cfg (Build Rules)</strong></div>
            <p>Configures setuptools and maps executable CLI names to Python functions via <code>entry_points={'console_scripts': ['node = pkg.mod:main']}</code>.</p>
          </div>
          <div class="l03-concept-card">
            <div class="l03-concept-header"><span class="l03-card-icon">🏷️</span><strong>resource/&lt;pkg&gt; (Ament Index Marker)</strong></div>
            <p>An empty marker file placed inside <code>resource/</code> that registers the package with the Ament Index so <code>ros2 pkg</code> can locate it.</p>
          </div>
        </div>
      </div>
    `}),a.push({id:`${t.id}_sec6_7_introspection_rosdep`,type:"concept",lessonNum:t.num_str,lessonId:t.id,module:t.module,sectionTitle:"6 & 7. Package Introspection & rosdep",badge:"🛠️ CLI & Dependencies",title:"6 & 7. Package Introspection CLI & rosdep",htmlContent:`
      <div class="l04-two-col-layout">
        <div class="l04-content-col">
          <div class="l03-cmd-card">
            <div class="l03-cmd-header"><span class="l03-term-badge">CLI</span><strong>Package Query Commands</strong></div>
            <pre><code class="language-bash"># 1. List all discovered packages in environment
ros2 pkg list

# 2. Query exact install prefix directory
ros2 pkg prefix turtlesim
# Output: /opt/ros/jazzy

# 3. Query declared package.xml metadata
ros2 pkg xml turtlesim</code></pre>
          </div>
          <div class="l03-concept-card">
            <div class="l03-concept-header"><span class="l03-card-icon">🔎</span><strong>Runtime Package Discovery</strong></div>
            <p><code>ros2 pkg</code> inspects the directories listed in <code>$AMENT_PREFIX_PATH</code> to immediately report installed packages and their paths.</p>
          </div>
        </div>
        <div class="l04-content-col">
          <div class="l03-cmd-card">
            <div class="l03-cmd-header"><span class="l03-term-badge">rosdep</span><strong>Automated Dependency Resolution</strong></div>
            <pre><code class="language-bash">cd ~/ros2_ws
rosdep update
rosdep install --from-paths src --ignore-src -y</code></pre>
          </div>
          <div class="l03-concept-card">
            <div class="l03-concept-header"><span class="l03-card-icon">📌</span><strong>Flag-by-Flag Breakdown</strong></div>
            <p><strong>--from-paths src:</strong> Recursively parses <code>&lt;depend&gt;</code> in all packages inside <code>src/</code>.<br/>
            <strong>--ignore-src:</strong> Skips packages already present in local source.<br/>
            <strong>-y:</strong> Automatically confirms all Ubuntu <code>apt</code> installations.</p>
          </div>
        </div>
      </div>
    `}),a.push({id:`${t.id}_sec8_scaffold_package`,type:"concept",lessonNum:t.num_str,lessonId:t.id,module:t.module,sectionTitle:"8. Create ROS 2 Package (Python)",badge:"🔨 Package Creation",title:"8.1 Scaffolding the nexus_amr_basics Package",htmlContent:`
      <div class="l04-two-col-layout">
        <div class="l04-content-col">
          <div class="l03-cmd-card">
            <div class="l03-cmd-header"><span class="l03-term-badge">Terminal</span><strong>Scaffold Python Package</strong></div>
            <pre><code class="language-bash">cd ~/ros2_ws/src
ros2 pkg create --build-type ament_python nexus_amr_basics \\
  --dependencies rclpy geometry_msgs std_msgs \\
  --description "Nexus AMR Robotics Core Basics Package"</code></pre>
          </div>
          <div class="l03-concept-card">
            <div class="l03-concept-header"><span class="l03-card-icon">⚡</span><strong>Command Anatomy</strong></div>
            <p><strong>--build-type ament_python:</strong> Generates Python skeleton.<br/>
            <strong>--dependencies:</strong> Auto-populates <code>&lt;depend&gt;</code> in <code>package.xml</code> with <code>rclpy</code>, <code>geometry_msgs</code>, and <code>std_msgs</code>.</p>
          </div>
        </div>
        <div class="l04-content-col">
          <div class="l03-output-card">
            <div class="l03-output-header"><span class="l03-card-icon">🖥️</span><strong>Scaffold Verification Outcome</strong></div>
            <pre><code class="language-text">going to create a new package
package name: nexus_amr_basics
destination directory: /home/student/ros2_ws/src

$ ls nexus_amr_basics/
nexus_amr_basics  package.xml  resource  setup.cfg  setup.py  test</code></pre>
          </div>
          <div class="l04-golden-card success">
            <div class="l04-golden-header"><span>✅</span><strong>Scaffold Ready</strong></div>
            <p>The package manifest and setuptools build files are initialized. You are ready to build the package into the workspace overlay.</p>
          </div>
        </div>
      </div>
    `}),a.push({id:`${t.id}_sec8_colcon_build`,type:"concept",lessonNum:t.num_str,lessonId:t.id,module:t.module,sectionTitle:"8. Create ROS 2 Package (Python)",badge:"⚡ Meta-Build Execution",title:"8.2 Compiling with colcon & Build Telemetry",htmlContent:`
      <div class="l04-two-col-layout">
        <div class="l04-content-col">
          <div class="l03-cmd-card">
            <div class="l03-cmd-header"><span class="l03-term-badge">Workspace Root</span><strong>Selective Meta-Build</strong></div>
            <pre><code class="language-bash">cd ~/ros2_ws
colcon build --symlink-install --packages-select nexus_amr_basics</code></pre>
          </div>
          <div class="l03-concept-card">
            <div class="l03-concept-header"><span class="l03-card-icon">🔗</span><strong>--symlink-install (Developer Superpower)</strong></div>
            <p>Symlinks Python files from <code>src/</code> into <code>install/</code>. Changes you make to Python code take effect immediately without re-running colcon build!</p>
          </div>
          <div class="l03-concept-card">
            <div class="l03-concept-header"><span class="l03-card-icon">🎯</span><strong>--packages-select (Targeted Build)</strong></div>
            <p>Builds only <code>nexus_amr_basics</code>. In large robot workspaces with 50+ packages, this reduces build time from minutes to 1.2 seconds.</p>
          </div>
        </div>
        <div class="l04-content-col">
          <div class="l03-output-card">
            <div class="l03-output-header"><span class="l03-card-icon">📊</span><strong>Specific Build Telemetry</strong></div>
            <pre><code class="language-text">Starting >>> nexus_amr_basics
Finished <<< nexus_amr_basics [1.15s]
Summary: 1 package finished [1.32s]</code></pre>
          </div>
          <div class="l03-concept-card">
            <div class="l03-concept-header"><span class="l03-card-icon">🚀</span><strong>Lifecycle Output Stages</strong></div>
            <p><strong>Starting &gt;&gt;&gt;:</strong> Worker thread initialized, package verified.<br/>
            <strong>Finished &lt;&lt;&lt; [time]:</strong> Bytecode compiled, entry points registered.<br/>
            <strong>Summary:</strong> Total elapsed time and error status (code 0).</p>
          </div>
        </div>
      </div>
    `}),a.push({id:`${t.id}_sec8_9_sourcing_verification`,type:"concept",lessonNum:t.num_str,lessonId:t.id,module:t.module,sectionTitle:"8 & 9. Sourcing & Verification",badge:"🔍 Sourcing & Verification",title:"8.3 Sourcing Contrast Drill & Health Audit",htmlContent:`
      <div class="l04-two-col-layout">
        <div class="l04-content-col">
          <div class="l03-cmd-card">
            <div class="l03-cmd-header"><span class="l03-term-badge">Drill</span><strong>The Overlay Sourcing Contrast Test</strong></div>
            <pre><code class="language-bash"># Test 1: BEFORE sourcing install/setup.bash:
ros2 pkg prefix nexus_amr_basics
# -> Package 'nexus_amr_basics' not found

# Test 2: Source local workspace overlay:
source ~/ros2_ws/install/setup.bash

# Test 3: Re-query package prefix:
ros2 pkg prefix nexus_amr_basics
# -> /home/student/ros2_ws/install/nexus_amr_basics</code></pre>
          </div>
        </div>
        <div class="l04-content-col">
          <div class="l03-cmd-card">
            <div class="l03-cmd-header"><span class="l03-term-badge">Audit</span><strong>Query Declared Dependencies</strong></div>
            <pre><code class="language-bash">ros2 pkg xml nexus_amr_basics --tag depend</code></pre>
          </div>
          <div class="l03-output-card">
            <div class="l03-output-header"><span class="l03-card-icon">🖥️</span><strong>Expected Verification Output</strong></div>
            <pre><code class="language-xml">&lt;depend&gt;rclpy&lt;/depend&gt;
&lt;depend&gt;geometry_msgs&lt;/depend&gt;
&lt;depend&gt;std_msgs&lt;/depend&gt;</code></pre>
          </div>
          <div class="l04-golden-card success">
            <div class="l04-golden-header"><span>✅</span><strong>Overlay Active</strong></div>
            <p><code>nexus_amr_basics</code> is now indexed in the ROS 2 computational graph and ready for Python node development in Lesson 05!</p>
          </div>
        </div>
      </div>
    `}),a.push({id:`${t.id}_sec10_golden_rules`,type:"concept",lessonNum:t.num_str,lessonId:t.id,module:t.module,sectionTitle:"Production Best Practices",badge:"🛡️ Production Rules",title:"ROS 2 Workspace & Build Golden Rules",htmlContent:`
      <div class="l04-card-grid-2x2">
        <div class="l04-golden-card">
          <div class="l04-golden-header"><span>📍</span><strong>1. Always Build from Root</strong></div>
          <p>Always execute <code>colcon build</code> from <code>~/ros2_ws</code>, never inside <code>src/</code>. Running build inside <code>src/</code> creates nested orphan build folders.</p>
        </div>
        <div class="l04-golden-card">
          <div class="l04-golden-header"><span>🔄</span><strong>2. Always Source the Overlay</strong></div>
          <p>Every newly opened terminal session must source <code>~/ros2_ws/install/setup.bash</code> to discover newly built packages and executables.</p>
        </div>
        <div class="l04-golden-card">
          <div class="l04-golden-header"><span>🔗</span><strong>3. Use --symlink-install</strong></div>
          <p>Always pass <code>--symlink-install</code> during Python development so edits to Python scripts run immediately without rebuilding.</p>
        </div>
        <div class="l04-golden-card">
          <div class="l04-golden-header"><span>🚫</span><strong>4. Never Commit Build Folders</strong></div>
          <p>Always include <code>build/</code>, <code>install/</code>, and <code>log/</code> in your <code>.gitignore</code>. Only human-written source files in <code>src/</code> belong in version control.</p>
        </div>
      </div>
    `})}function oi(s,t,a){a.push({id:`${t.id}_interactive_pubsub`,type:"interactive",interactiveKey:"pubsub",lessonNum:t.num_str,lessonId:t.id,module:t.module,sectionTitle:"1. Topic Architecture & Pub/Sub Message Flow",badge:"🔄 Interactive Simulator",title:"Interactive Pub/Sub Architecture & DDS Message Flow Simulator"}),a.push({id:`${t.id}_sec3_interface_inspection`,type:"concept",lessonNum:t.num_str,lessonId:t.id,module:t.module,sectionTitle:"3. Message Interface Discovery",badge:"🔍 Interface Inspection",title:"3.1 Interface Discovery: sensor_msgs/msg/Range",htmlContent:`
      <div class="l05-two-col-layout">
        <div class="l05-content-col">
          <div class="l03-concept-card">
            <div class="l03-concept-header"><span class="l03-card-icon">💡</span><strong>Robotics Best Practice: Inspect Before Coding</strong></div>
            <p>Never guess message schemas. Always inspect standard ROS 2 message fields and data types using CLI introspection before writing publisher or subscriber logic.</p>
          </div>
          <div class="l03-cmd-card">
            <div class="l03-cmd-header"><span class="l03-term-badge">CLI Discovery</span><strong>Query Interface Schema</strong></div>
            <pre><code class="language-bash"># Search across interfaces for range types:
ros2 interface list | grep -i range

# Inspect sensor_msgs/msg/Range schema:
ros2 interface show sensor_msgs/msg/Range</code></pre>
          </div>
          <div class="l05-golden-card success" style="margin-top: 0.15rem;">
            <div class="l05-golden-header"><span>🎯</span><strong>Key Insight: msg.range</strong></div>
            <p>The obstacle distance in meters is stored in <code>msg.range</code> (float32). Do not confuse it with generic <code>msg.data</code>!</p>
          </div>
        </div>
        <div class="l05-content-col">
          <div class="l03-output-header"><span class="l03-card-icon">📋</span><strong>Field Definitions &amp; Robotics Semantics</strong></div>
          <div class="l05-table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Field</th>
                  <th>Type</th>
                  <th>Robotics Semantic Meaning</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><code>header.frame_id</code></td>
                  <td>string</td>
                  <td>Mounting coordinate frame (e.g. <code>'ultrasound_front_link'</code>)</td>
                </tr>
                <tr>
                  <td><code>radiation_type</code></td>
                  <td>uint8</td>
                  <td>Transducer type: <code>0 = ULTRASOUND</code>, <code>1 = INFRARED</code></td>
                </tr>
                <tr>
                  <td><code>field_of_view</code></td>
                  <td>float32</td>
                  <td>Detection cone spread in radians (<code>0.5236 rad ≈ 30°</code>)</td>
                </tr>
                <tr>
                  <td><code>min_range / max_range</code></td>
                  <td>float32</td>
                  <td>Operating envelope limits (<code>0.02m</code> to <code>3.0m</code>)</td>
                </tr>
                <tr>
                  <td><code>range</code></td>
                  <td>float32</td>
                  <td><strong>Current measured obstacle distance in meters</strong></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    `}),a.push({id:`${t.id}_sec3_publisher_node`,type:"concept",lessonNum:t.num_str,lessonId:t.id,module:t.module,sectionTitle:"3. Writing the Publisher Node",badge:"📡 Publisher Node",title:"3.2 Authoring the Ultrasonic Sensor Publisher Node",htmlContent:`
      <div class="l05-two-col-layout">
        <div class="l05-content-col">
          <div class="l03-cmd-card">
            <div class="l03-cmd-header"><span class="l03-term-badge">Python Node</span><strong>ultrasonic_sensor_node.py</strong></div>
            <pre><code class="language-python">import math, rclpy
from rclpy.node import Node
from sensor_msgs.msg import Range

class UltrasonicSensorPublisher(Node):
    def __init__(self):
        super().__init__('ultrasonic_sensor_node')
        self.pub = self.create_publisher(Range, '/sensor/ultrasonic_front', 10)
        self.timer = self.create_timer(0.1, self.timer_cb)
        self.step = 0

    def timer_cb(self):
        dist = 1.5 + 1.2 * math.sin(0.5 * self.step * 0.1)
        msg = Range()
        msg.header.stamp = self.get_clock().now().to_msg()
        msg.header.frame_id = 'ultrasound_front_link'
        msg.radiation_type = Range.ULTRASOUND
        msg.range = round(dist, 2)
        self.pub.publish(msg)
        self.step += 1</code></pre>
          </div>
        </div>
        <div class="l05-content-col">
          <div class="l03-concept-card">
            <div class="l03-concept-header"><span class="l03-card-icon">🏷️</span><strong>1. Node Heritage &amp; Registration</strong></div>
            <p>Subclasses <code>rclpy.node.Node</code>. <code>super().__init__('ultrasonic_sensor_node')</code> registers node ID into the ROS 2 graph.</p>
          </div>
          <div class="l03-concept-card">
            <div class="l03-concept-header"><span class="l03-card-icon">⏱️</span><strong>2. Non-Blocking 10 Hz Timer</strong></div>
            <p><code>create_timer(0.1, self.timer_cb)</code> fires every 100ms. Never blocks the executor thread with <code>time.sleep()</code>.</p>
          </div>
          <div class="l03-concept-card">
            <div class="l03-concept-header"><span class="l03-card-icon">📡</span><strong>3. DDS Publisher &amp; Default QoS</strong></div>
            <p>Depth <code>10</code> applies default QoS: <code>RELIABLE</code> delivery, <code>VOLATILE</code> durability, and <code>KEEP_LAST(10)</code> ring buffer.</p>
          </div>
          <div class="l03-concept-card">
            <div class="l03-concept-header"><span class="l03-card-icon">🌊</span><strong>4. Synthetic AMR Telemetry</strong></div>
            <p>Sinusoidal distance oscillates 0.3m–2.7m. Proximity under 0.50m triggers vehicle safety alerts.</p>
          </div>
        </div>
      </div>
    `}),a.push({id:`${t.id}_sec4_setup_build_test`,type:"concept",lessonNum:t.num_str,lessonId:t.id,module:t.module,sectionTitle:"4. Build & CLI Introspection",badge:"🛠️ Build & Test",title:"4. setup.py Entry Point, Build & Topic Introspection",htmlContent:`
      <div class="l05-two-col-layout">
        <div class="l05-content-col">
          <div class="l03-cmd-card">
            <div class="l03-cmd-header"><span class="l03-term-badge">setup.py</span><strong>Step 1: Register Console Script</strong></div>
            <pre><code class="language-python">entry_points={
    'console_scripts': [
        'ultrasonic_publisher = nexus_amr_basics.ultrasonic_sensor_node:main',
    ],
},</code></pre>
          </div>
          <div class="l03-cmd-card">
            <div class="l03-cmd-header"><span class="l03-term-badge">Terminal 1</span><strong>Step 2: Build &amp; Launch (--symlink-install)</strong></div>
            <pre><code class="language-bash">cd ~/ros2_ws
colcon build --symlink-install --packages-select nexus_amr_basics
source install/setup.bash
ros2 run nexus_amr_basics ultrasonic_publisher</code></pre>
          </div>
        </div>
        <div class="l05-content-col">
          <div class="l03-output-card">
            <div class="l03-output-header"><span class="l03-card-icon">🔍</span><strong>CLI Steps 1 &amp; 2: Discover &amp; Echo Topic</strong></div>
            <pre><code class="language-bash">$ ros2 topic list
/sensor/ultrasonic_front

$ ros2 topic echo /sensor/ultrasonic_front
range: 1.50 -> [PATH CLEAR]
range: 1.62 -> [PATH CLEAR]</code></pre>
          </div>
          <div class="l03-output-card">
            <div class="l03-output-header"><span class="l03-card-icon">⚡</span><strong>CLI Step 3: Stream Rate Introspection</strong></div>
            <pre><code class="language-bash">$ ros2 topic hz /sensor/ultrasonic_front
average rate: 10.012 Hz (period: 0.100s, window: 10)</code></pre>
          </div>
        </div>
      </div>
    `}),a.push({id:`${t.id}_sec5_subscriber_node`,type:"concept",lessonNum:t.num_str,lessonId:t.id,module:t.module,sectionTitle:"5. Writing the Subscriber Node",badge:"🛡️ Subscriber Node",title:"5. Authoring the Collision Safety Monitor Subscriber",htmlContent:`
      <div class="l05-two-col-layout">
        <div class="l05-content-col">
          <div class="l03-cmd-card">
            <div class="l03-cmd-header"><span class="l03-term-badge">Python Node</span><strong>collision_monitor_node.py</strong></div>
            <pre><code class="language-python">import rclpy
from rclpy.node import Node
from sensor_msgs.msg import Range

class CollisionSafetySubscriber(Node):
    def __init__(self):
        super().__init__('collision_monitor_node')
        self.safety_threshold_m = 0.50
        self.sub = self.create_subscription(
            Range, '/sensor/ultrasonic_front',
            self.distance_callback, 10
        )

    def distance_callback(self, msg: Range):
        dist = msg.range
        if dist < self.safety_threshold_m:
            self.get_logger().error(f'ALERT: {dist:.2f}m! EMERGENCY BRAKE!')
        else:
            self.get_logger().info(f'Distance: {dist:.2f}m -> Nominal clear')</code></pre>
          </div>
        </div>
        <div class="l05-content-col">
          <div class="l03-concept-card">
            <div class="l03-concept-header"><span class="l03-card-icon">⚡</span><strong>1. Event-Driven Push Callback</strong></div>
            <p><code>distance_callback</code> runs immediately when a DDS packet arrives. 0% CPU wasted on busy-waiting.</p>
          </div>
          <div class="l03-concept-card">
            <div class="l03-concept-header"><span class="l03-card-icon">🛡️</span><strong>2. Physical Safety Invariant</strong></div>
            <p>Distance &lt; 0.50m triggers emergency brake alert, overriding motor controllers in complete AMR stacks.</p>
          </div>
          <div class="l03-concept-card">
            <div class="l03-concept-header"><span class="l03-card-icon">🔗</span><strong>3. QoS Compatibility Match</strong></div>
            <p>Depth <code>10</code> matches publisher default QoS (<code>RELIABLE</code> + <code>VOLATILE</code>), guaranteeing packet delivery.</p>
          </div>
          <div class="l03-concept-card">
            <div class="l03-concept-header"><span class="l03-card-icon">🛑</span><strong>4. Clean Lifecycle Teardown</strong></div>
            <p><code>destroy_node()</code> and <code>rclpy.shutdown()</code> cleanly deregister subscriber from DDS on <code>Ctrl+C</code>.</p>
          </div>
        </div>
      </div>
    `}),a.push({id:`${t.id}_sec6_dual_node_drill`,type:"concept",lessonNum:t.num_str,lessonId:t.id,module:t.module,sectionTitle:"6. Dual-Node Verification Drill",badge:"🚀 End-to-End Test",title:"6. Dual-Node Telemetry & Verification Drill",htmlContent:`
      <div class="l05-two-col-layout">
        <div class="l05-content-col">
          <div class="l03-cmd-card">
            <div class="l03-cmd-header"><span class="l03-term-badge">setup.py</span><strong>Step 1: Register Entry Point</strong></div>
            <pre><code class="language-python">'collision_monitor = nexus_amr_basics.collision_monitor_node:main',</code></pre>
          </div>
          <div class="l03-cmd-card">
            <div class="l03-cmd-header"><span class="l03-term-badge">Execution</span><strong>Step 2: Launch Dual Nodes</strong></div>
            <pre><code class="language-bash"># Terminal 1: Sensor Publisher
ros2 run nexus_amr_basics ultrasonic_publisher

# Terminal 2: Safety Supervisor
ros2 run nexus_amr_basics collision_monitor</code></pre>
          </div>
          <div class="l03-cmd-card">
            <div class="l03-cmd-header"><span class="l03-term-badge">Terminal 3</span><strong>Step 3: Graph Topic Topology Check</strong></div>
            <pre><code class="language-bash">ros2 topic info /sensor/ultrasonic_front</code></pre>
          </div>
        </div>
        <div class="l05-content-col">
          <div class="l03-output-card">
            <div class="l03-output-header"><span class="l03-card-icon">🖥️</span><strong>Terminal 2 Live Telemetry: Safety Monitor</strong></div>
            <pre><code class="language-text">[INFO] [collision_monitor]: Initialized (Threshold: 0.50 m)
[INFO] [collision_monitor]: Distance: 1.52 m -> PATH CLEAR
[WARN] [collision_monitor]: ⚠️ EMERGENCY BRAKE! Distance: 0.38 m &lt; 0.50 m!</code></pre>
          </div>
          <div class="l03-output-card">
            <div class="l03-output-header"><span class="l03-card-icon">📊</span><strong>Terminal 3 Output: Active DDS Endpoints</strong></div>
            <pre><code class="language-text">Type: sensor_msgs/msg/Range
Publisher count: 1    (/ultrasonic_sensor_node)
Subscription count: 1 (/collision_monitor_node)</code></pre>
          </div>
        </div>
      </div>
    `}),a.push({id:`${t.id}_sec7_qos_deep_dive`,type:"concept",lessonNum:t.num_str,lessonId:t.id,module:t.module,sectionTitle:"7. Quality of Service (QoS)",badge:"⚖️ QoS Policies",title:"7.1 Quality of Service (QoS): Policies & AMR Profiles",htmlContent:`
      <div class="l05-two-col-layout">
        <div class="l05-content-col">
          <div class="l03-concept-card">
            <div class="l03-concept-header"><span class="l03-card-icon">🎯</span><strong>1. Reliability Policy</strong></div>
            <p><strong>RELIABLE:</strong> Guarantees delivery via packet ACKs and retransmissions. Used for state machines, e-stops, and goals.<br/>
            <strong>BEST_EFFORT:</strong> Drops delayed packets, minimum latency. Essential for 20-30 Hz sensor streams (LiDAR, camera).</p>
          </div>
          <div class="l03-concept-card">
            <div class="l03-concept-header"><span class="l03-card-icon">💾</span><strong>2. Durability Policy</strong></div>
            <p><strong>VOLATILE:</strong> No samples saved for late joiners.<br/>
            <strong>TRANSIENT_LOCAL:</strong> "Latched" topic; publisher keeps last N samples in memory for late joiners (e.g. <code>/map</code>).</p>
          </div>
          <div class="l03-concept-card">
            <div class="l03-concept-header"><span class="l03-card-icon">🗄️</span><strong>3. History &amp; Depth Policy</strong></div>
            <p><strong>KEEP_LAST (N):</strong> Ring buffer of depth N.<br/>
            <strong>KEEP_ALL:</strong> Unbounded buffer (RAM hazard if subscriber lags).</p>
          </div>
        </div>
        <div class="l05-content-col">
          <div class="l03-output-header"><span class="l03-card-icon">🤖</span><strong>Production AMR QoS Selection Matrix</strong></div>
          <div class="l05-table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Topic &amp; Stream</th>
                  <th>Reliability</th>
                  <th>Durability</th>
                  <th>Rationale</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><code>/scan</code> (LiDAR)</td>
                  <td>BEST_EFFORT</td>
                  <td>VOLATILE</td>
                  <td>Latest scan is crucial; never stall for dropped packet.</td>
                </tr>
                <tr>
                  <td><code>/map</code> (Occupancy)</td>
                  <td>RELIABLE</td>
                  <td>TRANSIENT_LOCAL</td>
                  <td>Latched: Late-joining AMRs need map immediately.</td>
                </tr>
                <tr>
                  <td><code>/cmd_vel</code> (Motors)</td>
                  <td>RELIABLE</td>
                  <td>VOLATILE</td>
                  <td>Velocity setpoints must be delivered deterministically.</td>
                </tr>
                <tr>
                  <td><code>/emergency_stop</code></td>
                  <td>RELIABLE</td>
                  <td>VOLATILE</td>
                  <td>Safety invariant; zero packet drop tolerated.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    `}),a.push({id:`${t.id}_sec7_qos_compatibility`,type:"concept",lessonNum:t.num_str,lessonId:t.id,module:t.module,sectionTitle:"7. QoS Compatibility & Python Setup",badge:"⚠️ Compatibility Rule",title:"7.2 The QoS Compatibility Rule (Rx <= Tx) & The Silence Trap",htmlContent:`
      <div class="l05-two-col-layout">
        <div class="l05-content-col">
          <div class="l05-table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Publisher (Tx)</th>
                  <th>Subscriber (Rx)</th>
                  <th>Compatible?</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><span class="badge badge-success">RELIABLE</span></td>
                  <td><span class="badge badge-success">RELIABLE</span></td>
                  <td><strong>Compatible ✅</strong> (Guaranteed delivery)</td>
                </tr>
                <tr>
                  <td><span class="badge badge-success">RELIABLE</span></td>
                  <td><span class="badge badge-warning">BEST_EFFORT</span></td>
                  <td><strong>Compatible ✅</strong> (Accepts best effort)</td>
                </tr>
                <tr>
                  <td><span class="badge badge-warning">BEST_EFFORT</span></td>
                  <td><span class="badge badge-warning">BEST_EFFORT</span></td>
                  <td><strong>Compatible ✅</strong> (Low-latency stream)</td>
                </tr>
                <tr>
                  <td><span class="badge badge-warning">BEST_EFFORT</span></td>
                  <td><span class="badge badge-danger">RELIABLE</span></td>
                  <td><strong>INCOMPATIBLE ❌ (Silent Failure!)</strong></td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="l05-golden-card warning" style="margin-top: 0.25rem;">
            <div class="l05-golden-header"><span>⚠️</span><strong>The QoS "Silence" Trap</strong></div>
            <p>If a subscriber requests <code>RELIABLE</code> from a <code>BEST_EFFORT</code> publisher, both nodes run without crashing, but <strong>ZERO messages are ever received</strong>!</p>
          </div>
        </div>
        <div class="l05-content-col">
          <div class="l03-cmd-card">
            <div class="l03-cmd-header"><span class="l03-term-badge">Python QoS</span><strong>Authoring Profiles with rclpy.qos</strong></div>
            <pre><code class="language-python">from rclpy.qos import QoSProfile, ReliabilityPolicy, DurabilityPolicy, qos_profile_sensor_data

# Option A: Pre-built Sensor Profile (Best-Effort, Volatile, Depth 5)
self.sub = self.create_subscription(LaserScan, '/scan', self.cb, qos_profile=qos_profile_sensor_data)

# Option B: Custom Latched Profile (Reliable, Latched, Depth 1)
latched_qos = QoSProfile(
    reliability=ReliabilityPolicy.RELIABLE,
    durability=DurabilityPolicy.TRANSIENT_LOCAL,
    depth=1
)
self.map_sub = self.create_subscription(OccupancyGrid, '/map', self.cb, qos_profile=latched_qos)</code></pre>
          </div>
        </div>
      </div>
    `}),a.push({id:`${t.id}_sec7_multi_pubsub`,type:"concept",lessonNum:t.num_str,lessonId:t.id,module:t.module,sectionTitle:"7. Multi-Topic Architecture",badge:"🔀 Multi-Topic Hub",title:"7.3 Multi-Topic Architecture: Single Node Multi Pub/Sub",htmlContent:`
      <div class="l05-two-col-layout">
        <div class="l05-visual-col">
          <div class="l05-visual-frame">
            <img src="assets/images/ros2_multi_topic_hub.svg" alt="Multi-Topic Architecture Diagram" class="l05-hero-svg" />
            <span class="l05-visual-caption">Decoupled Multi-Topic Topology: 3 Inbound Subscriptions &amp; 2 Outbound Publishers on 1 Node.</span>
          </div>
          <div class="l05-golden-card success" style="margin-top: 0.25rem;">
            <div class="l05-golden-header"><span>🔀</span><strong>Single Node Multi-Channel Hub</strong></div>
            <p>1 Python class binds multiple <code>create_subscription</code> &amp; <code>create_publisher</code> instances, arbitrating multi-rate sensor and command streams safely.</p>
          </div>
        </div>
        <div class="l05-content-col">
          <div class="l03-cmd-card">
            <div class="l03-cmd-header"><span class="l03-term-badge">Python Hub</span><strong>amr_safety_supervisor_node.py</strong></div>
            <pre><code class="language-python">class MultiTopicSupervisor(Node):
    def __init__(self):
        super().__init__('amr_safety_supervisor_node')
        # 3 Subscriptions (Inbound Telemetry)
        self.sub_range = self.create_subscription(Range, '/sensor/ultrasonic_front', self.range_cb, 10)
        self.sub_odom  = self.create_subscription(Odometry, '/odom', self.odom_cb, 10)
        self.sub_cmd   = self.create_subscription(Twist, '/teleop_cmd', self.teleop_cb, 10)

        # 2 Publishers (Outbound Actuation &amp; Health)
        self.pub_vel    = self.create_publisher(Twist, '/cmd_vel', 10)
        self.pub_status = self.create_publisher(String, '/diagnostics/safety_status', 10)

        # 20 Hz Arbitrated Safety Control Loop
        self.timer = self.create_timer(0.05, self.control_loop)</code></pre>
          </div>
          <div class="l03-output-card">
            <div class="l03-output-header"><span class="l03-card-icon">💡</span><strong>CLI Node Introspection</strong></div>
            <pre><code class="language-bash">ros2 node info /amr_safety_supervisor_node
# Verified: 3 Subscriptions and 2 Publishers active</code></pre>
          </div>
        </div>
      </div>
    `}),a.push({id:`${t.id}_sec9_golden_rules`,type:"concept",lessonNum:t.num_str,lessonId:t.id,module:t.module,sectionTitle:"Production Best Practices",badge:"🛡️ Production Rules",title:"Publishers, Subscribers & QoS Golden Rules",htmlContent:`
      <div class="l05-card-grid-2x2">
        <div class="l05-golden-card">
          <div class="l05-golden-header"><span>⏱️</span><strong>1. Non-Blocking Callbacks</strong></div>
          <p>Never call <code>time.sleep()</code> inside a callback or timer! It halts the ROS 2 executor thread, freezing all other callbacks and starving incoming topic queues.</p>
        </div>
        <div class="l05-golden-card">
          <div class="l05-golden-header"><span>📡</span><strong>2. Match QoS to Data Semantics</strong></div>
          <p>Use <code>BEST_EFFORT</code> for loss-tolerant high-rate sensor streams (LiDAR, cameras). Use <code>RELIABLE</code> for safety alerts, state transitions, and navigation goals.</p>
        </div>
        <div class="l05-golden-card">
          <div class="l05-golden-header"><span>🔗</span><strong>3. Build with --symlink-install</strong></div>
          <p>Always compile with <code>--symlink-install</code> during Python development. Python script edits in <code>src/</code> execute immediately without re-compiling.</p>
        </div>
        <div class="l05-golden-card">
          <div class="l05-golden-header"><span>🛑</span><strong>4. Fail-Safe Zero-Velocity Shutdown</strong></div>
          <p>Always catch <code>KeyboardInterrupt</code> and publish a zero-velocity <code>Twist()</code> in the <code>finally:</code> block to ensure AMRs halt safely when control processes exit.</p>
        </div>
      </div>
    `})}function ri(s,t,a){a.push({id:`${t.id}_interactive_service`,type:"interactive",interactiveKey:"service",lessonNum:t.num_str,lessonId:t.id,module:t.module,sectionTitle:"2. Service Architecture & Communication Flow",badge:"🔄 Interactive Simulator",title:"Interactive Service Architecture: 2-Way Request ➔ Response (RPC)"}),a.push({id:`${t.id}_sec2_decision_matrix`,type:"concept",lessonNum:t.num_str,lessonId:t.id,module:t.module,sectionTitle:"2. Communication Pattern Selection",badge:"🧭 Architecture Selection",title:"2. Decision Matrix: Topics vs Services vs Actions",htmlContent:`
      <div class="l06-two-col-layout">
        <div class="l06-visual-col">
          <div class="l06-visual-frame">
            <img src="assets/images/ros2_comm_patterns_decision.svg" alt="ROS 2 Communication Patterns Decision Architecture" class="l06-hero-svg" />
            <div class="l06-visual-caption">Figure 6.1: Deterministic Decision Flow for ROS 2 Communication Primitives</div>
          </div>
          <div class="l06-golden-card success" style="margin-top: 0.15rem;">
            <div class="l06-golden-header"><span>🎯</span><strong>Primary Decision Rule: Synchronous Confirmation</strong></div>
            <p>Use <strong>Services</strong> for short (&lt;50ms) bidirectional Request-Response transactions where explicit execution confirmation is required before proceeding.</p>
          </div>
        </div>
        <div class="l06-content-col">
          <div class="l06-table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Pattern</th>
                  <th>Data Flow</th>
                  <th>Feedback?</th>
                  <th>Robotics Production Use Case</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><code>Topics</code></td>
                  <td>Many-to-Many Stream (Unidirectional)</td>
                  <td>None</td>
                  <td>Continuous sensor feeds (<code>/scan</code>, <code>/odom</code>), velocity setpoints (<code>/cmd_vel</code>)</td>
                </tr>
                <tr>
                  <td><code>Services</code></td>
                  <td><strong>1-to-1 Unicast (Request ➔ Response)</strong></td>
                  <td><strong>Receipt Only</strong></td>
                  <td><strong>Atomic safety interlocks (<code>/robot/emergency_stop</code>), mode changes, zeroing IMU</strong></td>
                </tr>
                <tr>
                  <td><code>Actions</code></td>
                  <td>1-to-1 Client-Server (Goal / Feedback / Result)</td>
                  <td>Continuous Progress</td>
                  <td>Long-duration tasks: Nav2 waypoint navigation (<code>/navigate_to_pose</code>), arm manipulation</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="l06-golden-card warning" style="margin-top: 0.2rem;">
            <div class="l06-golden-header"><span>⚠️</span><strong>Anti-Pattern: Never Stream over Services</strong></div>
            <p>Never stream continuous 50Hz sensor data over Services. Services block until round-trip completes, introducing catastrophic latency and queue starving.</p>
          </div>
        </div>
      </div>
    `}),a.push({id:`${t.id}_sec3_interface_contract`,type:"concept",lessonNum:t.num_str,lessonId:t.id,module:t.module,sectionTitle:"3. Interface Discovery & Contract",badge:"📋 Interface Contract",title:"3.1 Service Interface Discovery: TriggerEmergencyStop",htmlContent:`
      <div class="l06-two-col-layout">
        <div class="l06-content-col">
          <div class="l03-concept-card">
            <div class="l03-concept-header"><span class="l03-card-icon">💡</span><strong>Robotics Best Practice: Inspect Before Coding</strong></div>
            <p>Always query interfaces via CLI to inspect field names, data types, and the <code>---</code> request/response separator.</p>
          </div>
          <div class="l03-cmd-card">
            <div class="l03-cmd-header"><span class="l03-term-badge">CLI Discovery</span><strong>Query Service Interfaces</strong></div>
            <pre><code class="language-bash"># Search service types and inspect schema:
ros2 interface list | grep srv | grep -i emergency
ros2 interface show nexus_amr_interfaces/srv/TriggerEmergencyStop</code></pre>
          </div>
          <div class="l03-output-card">
            <div class="l03-output-header"><span class="l03-card-icon">📄</span><strong>Interface Definition (.srv Schema)</strong></div>
            <pre><code class="language-plaintext"># Request (Input payload sent by Client)
bool emergency_stop_requested
string reason
---
# Response (Output payload returned by Server)
bool success
string status_message
float32 stop_timestamp</code></pre>
          </div>
        </div>
        <div class="l06-content-col">
          <div class="l06-table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Field</th>
                  <th>Type</th>
                  <th>Robotics Semantic Meaning</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><code>emergency_stop_requested</code></td>
                  <td>bool</td>
                  <td><code>True</code> engages motor brakes; <code>False</code> clears halt</td>
                </tr>
                <tr>
                  <td><code>reason</code></td>
                  <td>string</td>
                  <td>Diagnostic rationale for safety compliance (ISO 3691-4)</td>
                </tr>
                <tr>
                  <td><code>---</code></td>
                  <td>separator</td>
                  <td><strong>Mandatory boundary:</strong> Top = Request; Bottom = Response</td>
                </tr>
                <tr>
                  <td><code>success</code></td>
                  <td>bool</td>
                  <td>Acknowledgment flag verifying physical relay engagement</td>
                </tr>
                <tr>
                  <td><code>status_message</code></td>
                  <td>string</td>
                  <td>Human-readable receipt (e.g. <code>'EMERGENCY BRAKE ENGAGED'</code>)</td>
                </tr>
                <tr>
                  <td><code>stop_timestamp</code></td>
                  <td>float32</td>
                  <td>Epoch timestamp in seconds for audit trails</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="l06-golden-card success" style="margin-top: 0.16rem;">
            <div class="l06-golden-header"><span>🎯</span><strong>Deterministic Safety Contract</strong></div>
            <p>Every service call produces exactly one strongly-typed response receipt, ensuring deterministic safety verification.</p>
          </div>
        </div>
      </div>
    `}),a.push({id:`${t.id}_sec3_server_implementation`,type:"concept",lessonNum:t.num_str,lessonId:t.id,module:t.module,sectionTitle:"3. Service Server Implementation",badge:"🛡️ Safety Server Node",title:"3.2 Authoring the Emergency Stop Server (emergency_stop_server.py)",htmlContent:`
      <div class="l06-two-col-layout">
        <div class="l06-content-col">
          <div class="l03-cmd-card">
            <div class="l03-cmd-header"><span class="l03-term-badge">Python Node</span><strong>emergency_stop_server.py</strong></div>
            <pre><code class="language-python">import rclpy
from rclpy.node import Node
from nexus_amr_interfaces.srv import TriggerEmergencyStop

class EmergencyStopServer(Node):
    def __init__(self):
        super().__init__('emergency_stop_server')
        self.emergency_stop_active = False
        self.srv = self.create_service(
            TriggerEmergencyStop, '/robot/emergency_stop', self.handle_emergency_stop
        )
        self.get_logger().info('EmergencyStopServer ready on /robot/emergency_stop')

    def handle_emergency_stop(self, request, response):
        now_sec = self.get_clock().now().nanoseconds * 1e-9
        response.success = True
        response.stop_timestamp = float(round(now_sec, 3))
        if request.emergency_stop_requested:
            self.emergency_stop_active = True
            response.status_message = f'EMERGENCY BRAKE ENGAGED: "{request.reason}"'
            self.get_logger().error(f'[SAFETY] E-STOP ACTIVATED! Reason: {request.reason}')
        else:
            self.emergency_stop_active = False
            response.status_message = 'SAFETY RESET: Power restored. Drive authorized.'
            self.get_logger().info('[SAFETY] E-STOP CLEARED. Drive systems ready.')
        return response  # MANDATORY: Always return populated response</code></pre>
          </div>
        </div>
        <div class="l06-content-col">
          <div class="l05-card-grid-2x2" style="margin-top: 0; gap: 0.45rem;">
            <div class="l05-pillar-card">
              <div class="l05-pillar-header"><span>🔒</span><strong>1. Latching Safety State</strong></div>
              <p><code>self.emergency_stop_active</code> maintains node state. Once triggered, it latches until an explicit reset arrives.</p>
            </div>
            <div class="l05-pillar-card">
              <div class="l05-pillar-header"><span>⚙️</span><strong>2. create_service()</strong></div>
              <p>Registers endpoint on <code>/robot/emergency_stop</code> with interface type and binds the synchronous callback.</p>
            </div>
            <div class="l05-pillar-card">
              <div class="l05-pillar-header"><span>⚡</span><strong>3. Executor Callback</strong></div>
              <p>Callback receives <code>(request, response)</code> automatically. Executes fast motor brake cutoff without blocking other threads.</p>
            </div>
            <div class="l05-pillar-card">
              <div class="l05-pillar-header"><span>📬</span><strong>4. Mandatory Return & Spin</strong></div>
              <p>Must <code>return response</code> over DDS. <code>rclpy.spin(node)</code> handles incoming service calls until SIGINT teardown.</p>
            </div>
          </div>
        </div>
      </div>
    `}),a.push({id:`${t.id}_sec4_server_build_cli`,type:"concept",lessonNum:t.num_str,lessonId:t.id,module:t.module,sectionTitle:"4. Build & CLI Introspection",badge:"🛠️ Build & CLI Testing",title:"4. setup.py Entry Point, colcon Build & Service CLI Testing",htmlContent:`
      <div class="l06-two-col-layout">
        <div class="l06-content-col">
          <div class="l03-cmd-card">
            <div class="l03-cmd-header"><span class="l03-term-badge">setup.py</span><strong>Register Console Script Entry Point</strong></div>
            <pre><code class="language-python">entry_points={
    'console_scripts': [
        'ultrasonic_publisher = nexus_amr_basics.ultrasonic_publisher:main',
        'emergency_stop_server = nexus_amr_basics.emergency_stop_server:main',
    ],
},</code></pre>
          </div>
          <div class="l03-cmd-card">
            <div class="l03-cmd-header"><span class="l03-term-badge">Terminal 1</span><strong>Build & Launch Server</strong></div>
            <pre><code class="language-bash">cd ~/ros2_ws
colcon build --symlink-install --packages-select nexus_amr_basics
source install/setup.bash
ros2 run nexus_amr_basics emergency_stop_server</code></pre>
          </div>
        </div>
        <div class="l06-content-col">
          <div class="l03-cmd-card">
            <div class="l03-cmd-header"><span class="l03-term-badge">Terminal 2</span><strong>CLI Introspection & Live Test</strong></div>
            <pre><code class="language-bash">source /opt/ros/jazzy/setup.bash

# 1. Verify service appears in registry and check type:
ros2 service list | grep emergency_stop
ros2 service type /robot/emergency_stop

# 2. Call service endpoint with YAML payload:
ros2 service call /robot/emergency_stop nexus_amr_interfaces/srv/TriggerEmergencyStop \\
  "{emergency_stop_requested: true, reason: 'CLI Manual Safety Test'}"</code></pre>
          </div>
          <div class="l03-output-card">
            <div class="l03-output-header"><span class="l03-card-icon">📥</span><strong>Received Response Receipt</strong></div>
            <pre><code class="language-plaintext">response: nexus_amr_interfaces.srv.TriggerEmergencyStop_Response(
  success=True,
  status_message='EMERGENCY BRAKE ENGAGED: Actuators halted...',
  stop_timestamp=1730000000.123
)</code></pre>
          </div>
        </div>
      </div>
    `}),a.push({id:`${t.id}_sec5_client_implementation`,type:"concept",lessonNum:t.num_str,lessonId:t.id,module:t.module,sectionTitle:"5. Asynchronous Client Implementation",badge:"⚡ Non-Blocking Client",title:"5. Authoring the Asynchronous Emergency Stop Client (emergency_stop_client.py)",htmlContent:`
      <div class="l06-two-col-layout">
        <div class="l06-content-col">
          <div class="l03-cmd-card">
            <div class="l03-cmd-header"><span class="l03-term-badge">Python Node</span><strong>emergency_stop_client.py</strong></div>
            <pre><code class="language-python">import sys, rclpy
from rclpy.node import Node
from nexus_amr_interfaces.srv import TriggerEmergencyStop

class EmergencyStopClient(Node):
    def __init__(self):
        super().__init__('emergency_stop_client')
        self.client = self.create_client(
            TriggerEmergencyStop, '/robot/emergency_stop'
        )
        while not self.client.wait_for_service(timeout_sec=1.0):
            self.get_logger().info('Waiting for /robot/emergency_stop...')
        self.get_logger().info('EmergencyStopClient connected to server.')

    def send_emergency_stop_request(self, stop_requested: bool, reason: str):
        req = TriggerEmergencyStop.Request()
        req.emergency_stop_requested = stop_requested
        req.reason = reason
        self.future = self.client.call_async(req)
        return self.future

def main(args=None):
    rclpy.init(args=args)
    node = EmergencyStopClient()
    future = node.send_emergency_stop_request(True, "Obstacle in safety envelope")
    rclpy.spin_until_future_complete(node, future)
    if future.result() is not None:
        node.get_logger().info(f'Receipt: {future.result().status_message}')
    node.destroy_node()
    rclpy.shutdown()</code></pre>
          </div>
        </div>
        <div class="l06-content-col">
          <div class="l05-card-grid-2x2" style="margin-top: 0; gap: 0.45rem;">
            <div class="l05-pillar-card">
              <div class="l05-pillar-header"><span>⏳</span><strong>1. wait_for_service()</strong></div>
              <p>Polls DDS discovery with a timeout before transmitting requests, avoiding premature call failures.</p>
            </div>
            <div class="l05-pillar-card">
              <div class="l05-pillar-header"><span>🚫</span><strong>2. Anti-Deadlock Rule</strong></div>
              <p><strong>Never use synchronous <code>call()</code> in a callback!</strong> It freezes the thread, permanently deadlocking the node.</p>
            </div>
            <div class="l05-pillar-card">
              <div class="l05-pillar-header"><span>⚡</span><strong>3. call_async()</strong></div>
              <p>Queues request onto DDS and immediately returns a non-blocking <code>Future</code> object without halting execution.</p>
            </div>
            <div class="l05-pillar-card">
              <div class="l05-pillar-header"><span>🔄</span><strong>4. spin_until_future_complete</strong></div>
              <p>Pumps the node executor event loop specifically until the response packet arrives and resolves <code>future.result()</code>.</p>
            </div>
          </div>
        </div>
      </div>
    `}),a.push({id:`${t.id}_sec6_dual_node_verification`,type:"concept",lessonNum:t.num_str,lessonId:t.id,module:t.module,sectionTitle:"6. End-to-End Verification",badge:"🚀 Dual-Node Drill",title:"6. setup.py Registration & Dual-Node Safety Verification Drill",htmlContent:`
      <div class="l06-two-col-layout">
        <div class="l06-content-col">
          <div class="l03-cmd-card">
            <div class="l03-cmd-header"><span class="l03-term-badge">setup.py</span><strong>Register Client Executable</strong></div>
            <pre><code class="language-python">entry_points={
    'console_scripts': [
        'ultrasonic_publisher = nexus_amr_basics.ultrasonic_publisher:main',
        'emergency_stop_server = nexus_amr_basics.emergency_stop_server:main',
        'emergency_stop_client = nexus_amr_basics.emergency_stop_client:main',
    ],
},</code></pre>
          </div>
          <div class="l03-cmd-card">
            <div class="l03-cmd-header"><span class="l03-term-badge">Deployment Commands</span><strong>2-Terminal Execution Run Sheet</strong></div>
            <pre><code class="language-bash"># Terminal 1: Run Server
colcon build --symlink-install --packages-select nexus_amr_basics
source install/setup.bash && ros2 run nexus_amr_basics emergency_stop_server

# Terminal 2: Run Client with Custom Reason
source install/setup.bash
ros2 run nexus_amr_basics emergency_stop_client "Obstacle within 0.35m"</code></pre>
          </div>
        </div>
        <div class="l06-content-col">
          <div class="l03-output-card">
            <div class="l03-output-header"><span class="l03-term-badge">Terminal 1: Server Log</span></div>
            <pre><code class="language-plaintext">[INFO] [emergency_stop_server]: EmergencyStopServer initialized. Ready...
[ERROR] [emergency_stop_server]: [CRITICAL SAFETY EVENT] Emergency Stop ACTIVATED! Reason: Obstacle within 0.35m</code></pre>
          </div>
          <div class="l03-output-card">
            <div class="l03-output-header"><span class="l03-term-badge">Terminal 2: Client Log</span></div>
            <pre><code class="language-plaintext">[INFO] [emergency_stop_client]: Connected to safety service. Dispatching request...
[INFO] [emergency_stop_client]: SAFETY RESPONSE RECEIVED: Success: True | Status: EMERGENCY BRAKE ENGAGED</code></pre>
          </div>
          <div class="l06-golden-card success">
            <div class="l06-golden-header"><span>✅</span><strong>Verification Complete</strong></div>
            <p>Confirmed full bidirectional round-trip RPC over DDS with zero executor thread deadlocking.</p>
          </div>
        </div>
      </div>
    `}),a.push({id:`${t.id}_sec8_golden_rules`,type:"concept",lessonNum:t.num_str,lessonId:t.id,module:t.module,sectionTitle:"Production Best Practices",badge:"🏆 Production Rules",title:"Production Golden Rules for ROS 2 Services",htmlContent:`
      <div class="l05-card-grid-2x2">
        <div class="l05-golden-card">
          <div class="l05-golden-header"><span>⚡</span><strong>1. Asynchronous Client Mandate</strong></div>
          <p>Always use <code>call_async()</code> and Python <code>Future</code> callbacks in production. Never invoke synchronous <code>call()</code> inside a node's event loop, which causes permanent thread deadlock.</p>
        </div>
        <div class="l05-golden-card">
          <div class="l05-golden-header"><span>⏱️</span><strong>2. Sub-50ms Execution Budget</strong></div>
          <p>Service callbacks must execute rapidly (&lt;50ms). If a procedure requires prolonged computation, trajectory execution, or physical movement, migrate to a <strong>ROS 2 Action</strong>.</p>
        </div>
        <div class="l05-golden-card">
          <div class="l05-golden-header"><span>🔒</span><strong>3. Latching Safety State Machines</strong></div>
          <p>Safety-critical services (like emergency halt) must alter persistent node states that latch and require explicit clearance commands before normal motion resumes.</p>
        </div>
        <div class="l05-golden-card">
          <div class="l05-golden-header"><span>📬</span><strong>4. Mandatory Response Return</strong></div>
          <p>In Python service callbacks, omitting <code>return response</code> causes DDS transport failure, leaving calling clients permanently hanging in an unfulfilled Future state.</p>
        </div>
      </div>
    `})}function li(s,t,a){a.push({id:`${t.id}_sec2_architecture`,type:"concept",lessonNum:t.num_str,lessonId:t.id,module:t.module,sectionTitle:"2. The Python Launch Architecture",badge:"🚀 Launch Architecture",title:"2. ROS 2 Python Launch System Architecture",htmlContent:`
      <div class="l03-two-col-layout l03-graph-layout">
        <div class="l03-visual-col">
          <div class="l03-visual-frame" style="background: var(--bg-surface); padding: 0.6rem; border-radius: 10px; border: 1px solid var(--border-color); display: flex; flex-direction: column; align-items: center; justify-content: center;">
            <img src="assets/images/ros2_launch_architecture.svg" alt="ROS 2 Python Launch Execution Architecture" style="width: 100%; max-height: 275px; object-fit: contain;" />
            <span class="l03-visual-caption">Declarative Directed Acyclic Graph (DAG) Built &amp; Executed by ROS 2 Runtime</span>
          </div>
        </div>
        <div class="l03-content-col">
          <div class="l03-concept-card">
            <div class="l03-concept-header"><span class="l03-card-icon">🐍</span><strong>Pure Python Declarative Graph</strong></div>
            <p>Unlike static XML in ROS 1, ROS 2 uses pure Python scripts (<code>.launch.py</code>) to build an execution pipeline. You gain full programmatic power: conditionals, loops, dynamic path resolution, and environment checks.</p>
          </div>
          <div class="l03-concept-card">
            <div class="l03-concept-header"><span class="l03-card-icon">🎯</span><strong>generate_launch_description() Entrypoint</strong></div>
            <p>The mandatory root function that returns a <code>LaunchDescription</code> holding an ordered list of actions: node spawners, CLI argument declarations, logging commands, and nested launch inclusions.</p>
          </div>
          <div class="l03-concept-card">
            <div class="l03-concept-header"><span class="l03-card-icon">⚡</span><strong>Dynamic Substitutions (LaunchConfiguration)</strong></div>
            <p>Parameters like <code>robot_namespace</code> or <code>use_sim_time</code> are evaluated lazily at runtime, allowing operators to reconfigure entire robot subsystems from the CLI without changing code.</p>
          </div>
        </div>
      </div>
    `}),a.push({id:`${t.id}_sec3_subsystem_launch`,type:"concept",lessonNum:t.num_str,lessonId:t.id,module:t.module,sectionTitle:"3. AMR Subsystem Launch File Implementation",badge:"📝 Subsystem Launch Script",title:"3. Writing an AMR Launch File: The 4 Core Architectural Phases",htmlContent:`
      <div class="l03-two-col-layout">
        <div class="l03-left-code-col">
          <div class="l03-cmd-card" style="margin-bottom: 0;">
            <div class="l03-cmd-header"><span class="l03-term-badge">amr_subsystem.launch.py</span><strong>Pure Python Script</strong></div>
            <pre><code class="language-python">import os
from ament_index_python.packages import get_package_share_directory
from launch import LaunchDescription
from launch.actions import DeclareLaunchArgument
from launch.substitutions import LaunchConfiguration
from launch_ros.actions import Node

def generate_launch_description():
    # Phase 1: Dynamic Path Resolution
    pkg_share = get_package_share_directory('nexus_amr_basics')
    config_file = os.path.join(pkg_share, 'config', 'teleop_params.yaml')

    # Phase 2: Declare CLI Arguments
    ns_arg = DeclareLaunchArgument(
        'robot_namespace', default_value='nexus_amr',
        description='Top-level isolation namespace'
    )

    # Phase 3: Define Subsystem Node Spawners
    estop_node = Node(
        package='nexus_amr_basics',
        executable='emergency_stop_server',
        namespace=LaunchConfiguration('robot_namespace'),
        output='screen'
    )
    param_node = Node(
        package='nexus_amr_basics',
        executable='param_node_explained',
        namespace=LaunchConfiguration('robot_namespace'),
        parameters=[config_file],
        remappings=[('/cmd_vel', 'cmd_vel_filtered')],
        output='screen'
    )

    # Phase 4: Assemble & Return Pipeline
    return LaunchDescription([ns_arg, estop_node, param_node])</code></pre>
          </div>
        </div>
        <div class="l03-content-col">
          <div class="l05-golden-card" style="margin-bottom: 0.35rem; padding: 0.4rem 0.65rem;">
            <div class="l05-golden-header" style="font-size: 0.78rem;"><span>📂</span><strong>Phase 1: Dynamic Path Resolution</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.3;"><code>get_package_share_directory()</code> portably locates installed assets across source builds and debian installs without hardcoding absolute paths.</p>
          </div>
          <div class="l05-golden-card" style="margin-bottom: 0.35rem; padding: 0.4rem 0.65rem;">
            <div class="l05-golden-header" style="font-size: 0.78rem;"><span>🎛️</span><strong>Phase 2: Declare Runtime Arguments</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.3;"><code>DeclareLaunchArgument</code> exposes CLI switches with safe defaults, enabling runtime overrides like <code>robot_namespace:=amr_alpha</code>.</p>
          </div>
          <div class="l05-golden-card" style="margin-bottom: 0.35rem; padding: 0.4rem 0.65rem;">
            <div class="l05-golden-header" style="font-size: 0.78rem;"><span>🤖</span><strong>Phase 3: Managed Subsystem Nodes</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.3;"><code>Node(...)</code> actions declare process boundaries, YAML parameter paths, topic remappings, and terminal output streaming.</p>
          </div>
          <div class="l05-golden-card" style="margin-bottom: 0; padding: 0.4rem 0.65rem;">
            <div class="l05-golden-header" style="font-size: 0.78rem;"><span>🚀</span><strong>Phase 4: Return LaunchDescription</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.3;">Hands the assembled execution list to the launch daemon to spawn and supervise the processes concurrently.</p>
          </div>
        </div>
      </div>
    `}),a.push({id:`${t.id}_sec4_actions_matrix`,type:"concept",lessonNum:t.num_str,lessonId:t.id,module:t.module,sectionTitle:"4. Key Launch Actions & Syntax Breakdown",badge:"⚙️ Action API Reference",title:"4. Essential ROS 2 Launch Actions & Syntax Reference Matrix",htmlContent:`
      <div class="l06-table-wrap">
        <table>
          <thead>
            <tr>
              <th style="width: 26%;">Launch Action / Class</th>
              <th style="width: 24%;">Module Import</th>
              <th style="width: 50%;">Core Role &amp; Production Usage</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><code>Node(...)</code></td>
              <td><code>launch_ros.actions</code></td>
              <td>Spawns a managed ROS 2 node process. Configures <code>package</code>, <code>executable</code>, <code>name</code>, <code>namespace</code>, <code>parameters</code>, <code>remappings</code>, and <code>output='screen'</code>.</td>
            </tr>
            <tr>
              <td><code>DeclareLaunchArgument</code></td>
              <td><code>launch.actions</code></td>
              <td>Registers a configurable CLI argument flag (e.g. <code>robot_namespace</code>, <code>use_sim_time</code>) with default values and validation rules.</td>
            </tr>
            <tr>
              <td><code>LaunchConfiguration</code></td>
              <td><code>launch.substitutions</code></td>
              <td>Dynamically evaluates and injects the runtime value of a declared launch argument into node parameters or names.</td>
            </tr>
            <tr>
              <td><code>IncludeLaunchDescription</code></td>
              <td><code>launch.actions</code></td>
              <td>Nests external launch files (e.g. Nav2 navigation stack or Gazebo world simulator) for hierarchical modular stack composition.</td>
            </tr>
            <tr>
              <td><code>remappings=[('/old', '/new')]</code></td>
              <td><code>launch_ros.actions.Node</code></td>
              <td>Redirects topic or service names dynamically at the DDS transport boundary without modifying node source code.</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="l05-banner-intro" style="margin-top: 0.5rem; padding: 0.4rem 0.7rem; font-size: 0.76rem;">
        <strong>💡 Production Golden Rule:</strong> Always keep launch files declarative. Avoid blocking loops, network I/O, or heavy computation inside <code>generate_launch_description()</code>; delegate logic to node lifecycles.
      </div>
    `}),a.push({id:`${t.id}_sec5_setup_build`,type:"concept",lessonNum:t.num_str,lessonId:t.id,module:t.module,sectionTitle:"5. Package Integration: Directory Structure & setup.py",badge:"📦 Package Integration",title:"5. Registering Launch Files in setup.py & The Symlink Build Workflow",htmlContent:`
      <div class="l03-two-col-layout">
        <div class="l03-content-col">
          <div class="l03-cmd-card">
            <div class="l03-cmd-header"><span class="l03-term-badge">setup.py</span><strong>data_files Installation Tuple</strong></div>
            <pre><code class="language-python">import os
from glob import glob

# Inside setup(...) data_files:
data_files=[
    ('share/ament_index/resource_index/packages', ['resource/' + package_name]),
    ('share/' + package_name, ['package.xml']),
    # 1. Install all launch files into share/nexus_amr_basics/launch:
    (os.path.join('share', package_name, 'launch'),
     glob(os.path.join('launch', '*.launch.py'))),
    # 2. Install YAML configuration files:
    (os.path.join('share', package_name, 'config'),
     glob(os.path.join('config', '*.yaml'))),
]</code></pre>
          </div>
          <div class="l03-concept-card">
            <div class="l03-concept-header"><span class="l03-card-icon">📁</span><strong>Package Directory Convention</strong></div>
            <p>Store launch files in a top-level <code>launch/</code> directory beside <code>package.xml</code>. The glob pattern automatically bundles all <code>*.launch.py</code> scripts.</p>
          </div>
        </div>
        <div class="l03-content-col">
          <div class="l03-cmd-card">
            <div class="l03-cmd-header"><span class="l03-term-badge">bash</span><strong>Build &amp; Source Workspace</strong></div>
            <pre><code class="language-bash">cd ~/ros2_ws
colcon build --symlink-install --packages-select nexus_amr_basics
source install/setup.bash</code></pre>
          </div>
          <div class="l05-golden-card warning" style="margin-bottom: 0.45rem; padding: 0.4rem 0.65rem;">
            <div class="l05-golden-header" style="font-size: 0.78rem;"><span>⚡</span><strong>Crucial: Always Use --symlink-install</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.3;">Without symlinks, Python launch edits require a full <code>colcon build</code> every time! With <code>--symlink-install</code>, ROS 2 links directly to your source files, enabling <strong>instant iteration</strong> without rebuilding.</p>
          </div>
          <div class="l05-golden-card" style="padding: 0.4rem 0.65rem;">
            <div class="l05-golden-header" style="font-size: 0.78rem;"><span>🔍</span><strong>Install Target Verification</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.3;">Verify files were installed properly: <code>ls ~/ros2_ws/install/nexus_amr_basics/share/nexus_amr_basics/launch</code></p>
          </div>
        </div>
      </div>
    `}),a.push({id:`${t.id}_sec6_cli_verification`,type:"concept",lessonNum:t.num_str,lessonId:t.id,module:t.module,sectionTitle:"6. CLI Execution & Multi-Robot Verification",badge:"⚡ Runtime Verification",title:"6. Executing Launch Files & Multi-Robot Namespace Verification",htmlContent:`
      <div class="l03-two-col-layout">
        <div class="l03-content-col">
          <div class="l03-cmd-card">
            <div class="l03-cmd-header"><span class="l03-term-badge">bash</span><strong>Launch with CLI Namespace Override</strong></div>
            <pre><code class="language-bash">ros2 launch nexus_amr_basics amr_subsystem.launch.py \\
  robot_namespace:=amr_alpha</code></pre>
          </div>
          <div class="l03-output-card">
            <div class="l03-output-header"><span class="l03-term-badge">Console Output</span><strong>Multi-Node Supervisor Logs</strong></div>
            <pre><code class="language-plaintext">[INFO] [launch]: Starting AMR Subsystem under namespace: amr_alpha
[INFO] [emergency_stop_server-1]: process started with pid [42110]
[INFO] [param_node_explained-2]: process started with pid [42111]
[emergency_stop_server-1] [INFO]: Ready on /amr_alpha/robot/emergency_stop
[param_node_explained-2] [INFO]: Param Node Initialized | ID: 'nexus-wh-01'</code></pre>
          </div>
        </div>
        <div class="l03-content-col">
          <div class="l05-golden-card" style="margin-bottom: 0.35rem; padding: 0.4rem 0.65rem;">
            <div class="l05-golden-header" style="font-size: 0.78rem;"><span>1️⃣</span><strong>Node Discovery Audit</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.3;"><code>ros2 node list</code><br/>&rarr; Confirms <code>/amr_alpha/emergency_stop_server</code> and <code>/amr_alpha/parameterized_controller</code> run concurrently under isolated namespaces.</p>
          </div>
          <div class="l05-golden-card" style="margin-bottom: 0.35rem; padding: 0.4rem 0.65rem;">
            <div class="l05-golden-header" style="font-size: 0.78rem;"><span>2️⃣</span><strong>Interface &amp; Topic Wire Audit</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.3;"><code>ros2 service list | grep amr_alpha</code><br/>&rarr; Confirms safety services are mapped to <code>/amr_alpha/robot/emergency_stop</code> with no cross-talk with other robots.</p>
          </div>
          <div class="l05-golden-card" style="margin-bottom: 0; padding: 0.4rem 0.65rem;">
            <div class="l05-golden-header" style="font-size: 0.78rem;"><span>🏭</span><strong>Industrial Multi-AMR Fleet Scaling</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.3;">Running <code>robot_namespace:=amr_beta</code> in a second terminal deploys a complete second robot on the exact same DDS physical network with zero topic collision.</p>
          </div>
        </div>
      </div>
    `})}function di(s,t,a){a.push({id:`${t.id}_sec2_architecture`,type:"concept",lessonNum:t.num_str,lessonId:t.id,module:t.module,sectionTitle:"2. Action Communication Architecture",badge:"⚡ Action Protocol",title:"2. The ROS 2 Action Protocol: Goal, Feedback & Result Lifecycle",htmlContent:`
      <div class="l03-two-col-layout l03-graph-layout">
        <div class="l03-visual-col">
          <div class="l03-visual-frame" style="background: var(--bg-surface); padding: 0.5rem; border-radius: 10px; border: 1px solid var(--border-color); display: flex; flex-direction: column; align-items: center; justify-content: center;">
            <img src="assets/images/ros2_action_lifecycle.svg" alt="ROS 2 Action Lifecycle Architecture" style="width: 100%; max-height: 270px; object-fit: contain;" />
            <span class="l03-visual-caption">Goal Service + Feedback Topic + Result Service + Preemption Cancel</span>
          </div>
        </div>
        <div class="l03-content-col">
          <div class="l03-concept-card">
            <div class="l03-concept-header"><span class="l03-card-icon">⏱️</span><strong>Why Topics &amp; Services Fall Short</strong></div>
            <p>Topics are fire-and-forget streams with no completion signals. Services are synchronous RPCs that freeze execution threads during prolonged robot motions and cannot be aborted mid-flight.</p>
          </div>
          <div class="l03-concept-card">
            <div class="l03-concept-header"><span class="l03-card-icon">🔀</span><strong>The 3 Coordinated DDS Channels</strong></div>
            <p>Under the hood, every ROS 2 Action coordinates three primitives: a <strong>Goal Service</strong> (accept/reject), a <strong>Feedback Topic</strong> (continuous telemetry streaming), and a <strong>Result Service</strong> (terminal outcome).</p>
          </div>
          <div class="l03-concept-card">
            <div class="l03-concept-header"><span class="l03-card-icon">🛑</span><strong>Native Preemption &amp; Cancellation</strong></div>
            <p>Unlike services, actions allow clients to abort or cancel goals at any time (e.g. unexpected obstacle blocks the path). The server safely halts actuators and transitions to the <code>CANCELED</code> state.</p>
          </div>
        </div>
      </div>
    `}),a.push({id:`${t.id}_interactive_action`,type:"interactive",interactiveKey:"action",lessonNum:t.num_str,lessonId:t.id,module:t.module,sectionTitle:"Interactive Simulation & Execution Flow",title:"Interactive Action Flow: Goal Dispatch, Feedback & Cancellation"}),a.push({id:`${t.id}_sec3_action_idl`,type:"concept",lessonNum:t.num_str,lessonId:t.id,module:t.module,sectionTitle:"3. Action Interface Definition",badge:"📐 Action IDL",title:"3. Anatomy of an Action Definition (NavigateDistance.action)",htmlContent:`
      <div class="l03-two-col-layout">
        <div class="l03-left-code-col">
          <div class="l03-cmd-card" style="margin-bottom: 0;">
            <div class="l03-cmd-header"><span class="l03-term-badge">NavigateDistance.action</span><strong>Action IDL Contract</strong></div>
            <pre><code class="language-plaintext"># 1. GOAL: Dispatched by Client
float32 target_distance_m
float32 speed_mps
---
# 2. RESULT: Returned Upon Completion
bool success
float32 final_distance_traveled
string message
---
# 3. FEEDBACK: Periodic Telemetry Stream
float32 distance_remaining
int32 percent_complete</code></pre>
          </div>
        </div>
        <div class="l03-content-col">
          <div class="l05-golden-card" style="margin-bottom: 0.35rem; padding: 0.4rem 0.65rem;">
            <div class="l05-golden-header" style="font-size: 0.78rem;"><span>➖</span><strong>The 3-Section Triple-Dash Format (---)</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.3;">Action definitions use exactly two sets of <code>---</code> dividers to separate <strong>Goal</strong>, <strong>Result</strong>, and <strong>Feedback</strong> fields into one strict IDL schema.</p>
          </div>
          <div class="l05-golden-card" style="margin-bottom: 0.35rem; padding: 0.4rem 0.65rem;">
            <div class="l05-golden-header" style="font-size: 0.78rem;"><span>⚙️</span><strong>4 Auto-Generated Classes</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.3;">ROS 2 code generators build four Python structures: <code>Goal</code>, <code>Result</code>, <code>Feedback</code>, and <code>Impl</code> for type-safe client-server contracts.</p>
          </div>
          <div class="l05-golden-card" style="margin-bottom: 0; padding: 0.4rem 0.65rem;">
            <div class="l05-golden-header" style="font-size: 0.78rem;"><span>📦</span><strong>Dedicated Interface Package Rule</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.3;">Never declare <code>.action</code> files inside an <code>ament_python</code> package. Place them in a standalone CMake package (e.g. <code>nexus_amr_interfaces</code>).</p>
          </div>
        </div>
      </div>
    `}),a.push({id:`${t.id}_sec4_action_server`,type:"concept",lessonNum:t.num_str,lessonId:t.id,module:t.module,sectionTitle:"4. Action Server Implementation",badge:"🛠️ Server Node",title:"4. Authoring the Action Server: Callbacks & Preemption Handling",htmlContent:`
      <div class="l03-two-col-layout">
        <div class="l03-left-code-col">
          <div class="l03-cmd-card" style="margin-bottom: 0;">
            <div class="l03-cmd-header"><span class="l03-term-badge">navigate_distance_server.py</span><strong>ActionServer Implementation</strong></div>
            <pre><code class="language-python">from rclpy.action import ActionServer, CancelResponse, GoalResponse
from nexus_amr_interfaces.action import NavigateDistance

class NavigateDistanceServer(Node):
    def __init__(self):
        super().__init__('navigate_distance_server')
        self._action_server = ActionServer(
            self, NavigateDistance, '/navigate_distance',
            execute_callback=self.execute_callback,
            goal_callback=self.goal_callback,
            cancel_callback=self.cancel_callback
        )

    def goal_callback(self, goal_request):
        if goal_request.target_distance_m &lt;= 0:
            return GoalResponse.REJECT
        return GoalResponse.ACCEPT

    def cancel_callback(self, goal_handle):
        return CancelResponse.ACCEPT

    async def execute_callback(self, goal_handle):
        # Publish feedback in loop, monitor is_cancel_requested
        # On completion: goal_handle.succeed(); return result</code></pre>
          </div>
        </div>
        <div class="l03-content-col">
          <div class="l05-golden-card" style="margin-bottom: 0.35rem; padding: 0.4rem 0.65rem;">
            <div class="l05-golden-header" style="font-size: 0.78rem;"><span>🎯</span><strong>1. goal_callback (Goal Validation)</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.3;">Validates parameters before starting motion (rejecting negative distances or out-of-boundary coordinates) via <code>GoalResponse</code>.</p>
          </div>
          <div class="l05-golden-card" style="margin-bottom: 0.35rem; padding: 0.4rem 0.65rem;">
            <div class="l05-golden-header" style="font-size: 0.78rem;"><span>🛑</span><strong>2. cancel_callback (Preemption Trap)</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.3;">Intercepts cancellation requests mid-flight. The execution loop checks <code>goal_handle.is_cancel_requested</code> and halts wheels safely.</p>
          </div>
          <div class="l05-golden-card" style="margin-bottom: 0.35rem; padding: 0.4rem 0.65rem;">
            <div class="l05-golden-header" style="font-size: 0.78rem;"><span>📊</span><strong>3. execute_callback (Feedback Streaming)</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.3;">Publishes periodic progress via <code>goal_handle.publish_feedback(fb)</code> at a fixed rate (e.g. 10 Hz) while advancing trajectory.</p>
          </div>
          <div class="l05-golden-card" style="margin-bottom: 0; padding: 0.4rem 0.65rem;">
            <div class="l05-golden-header" style="font-size: 0.78rem;"><span>🏁</span><strong>4. Succeeded Outcome Invariant</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.3;">Always invoke <code>goal_handle.succeed()</code> before returning the result. Omitting it leaves the client stuck in <code>EXECUTING</code> forever.</p>
          </div>
        </div>
      </div>
    `}),a.push({id:`${t.id}_sec5_cli_server_test`,type:"concept",lessonNum:t.num_str,lessonId:t.id,module:t.module,sectionTitle:"5. Testing Action Server via CLI",badge:"🔍 CLI Server Test",title:"5. Testing the Action Server via ROS 2 CLI & Streaming Feedback",htmlContent:`
      <div class="l08-cli-test-layout">
        <div class="l08-cli-code-col">
          <div class="l03-cmd-card">
            <div class="l03-cmd-header"><span class="l03-term-badge">bash</span><strong>CLI Action Discovery &amp; Goal Dispatch</strong></div>
            <pre><code class="language-bash"># Terminal 1: Launch Action Server
ros2 run nexus_amr_basics navigate_distance_server

# Terminal 2: Verify Action Server registration
ros2 action list
# Discovered: /navigate_distance

ros2 action info /navigate_distance
# Action: nexus_amr_interfaces/action/NavigateDistance
# Action clients: 0 | Action servers: 1

# Dispatch goal from CLI with live streaming feedback:
ros2 action send_goal /navigate_distance   nexus_amr_interfaces/action/NavigateDistance   "{target_distance_m: 5.0, speed_mps: 0.5}" --feedback</code></pre>
          </div>
          <div class="l03-output-card">
            <div class="l03-output-header"><span class="l03-term-badge">Terminal Output</span><strong>Live Telemetry &amp; Completion</strong></div>
            <pre><code class="language-plaintext">Feedback: distance_remaining: 3.5m, percent_complete: 30%
Feedback: distance_remaining: 1.0m, percent_complete: 80%
Result: success: True, final_distance_traveled: 5.0m
Goal finished with status: SUCCEEDED</code></pre>
          </div>
        </div>
        <div class="l08-cli-notes-col">
          <div class="l05-golden-card">
            <div class="l05-golden-header"><span>🧪</span><strong>Verify Server Before Writing Client</strong></div>
            <p>Just like testing Services with <code>ros2 service call</code>, always test your Action Server using the CLI first to verify lifecycle callbacks, goals, and feedback before writing client code.</p>
          </div>
          <div class="l05-golden-card warning">
            <div class="l05-golden-header"><span>📡</span><strong>The --feedback Switch</strong></div>
            <p>Without <code>--feedback</code>, <code>send_goal</code> only waits for the final result. Adding the flag subscribes to the asynchronous feedback topic to print progress in real time.</p>
          </div>
          <div class="l05-golden-card success">
            <div class="l05-golden-header"><span>🔍</span><strong>Endpoint Introspection (action info)</strong></div>
            <p>Validates the action interface definition, verifies active server instances (must be &ge; 1), and audits connected client node count.</p>
          </div>
        </div>
      </div>
    `}),a.push({id:`${t.id}_sec6_action_client`,type:"concept",lessonNum:t.num_str,lessonId:t.id,module:t.module,sectionTitle:"6. Action Client Implementation",badge:"💻 Client Node",title:"6. Authoring the Asynchronous Action Client in Python",htmlContent:`
      <div class="l03-two-col-layout">
        <div class="l03-left-code-col">
          <div class="l03-cmd-card" style="margin-bottom: 0;">
            <div class="l03-cmd-header"><span class="l03-term-badge">navigate_distance_client.py</span><strong>ActionClient Implementation</strong></div>
            <pre><code class="language-python">from rclpy.action import ActionClient
from nexus_amr_interfaces.action import NavigateDistance

class NavigateDistanceClient(Node):
    def __init__(self):
        super().__init__('navigate_distance_client')
        self._action_client = ActionClient(
            self, NavigateDistance, '/navigate_distance'
        )

    def send_goal(self, distance, speed):
        self._action_client.wait_for_server()
        goal_msg = NavigateDistance.Goal()
        goal_msg.target_distance_m = float(distance)
        goal_msg.speed_mps = float(speed)

        self._send_goal_future = self._action_client.send_goal_async(
            goal_msg, feedback_callback=self.feedback_callback
        )
        self._send_goal_future.add_done_callback(self.goal_response_callback)

    def feedback_callback(self, feedback_msg):
        fb = feedback_msg.feedback
        self.get_logger().info(f'Feedback: {fb.percent_complete}% ({fb.distance_remaining}m left)')</code></pre>
          </div>
        </div>
        <div class="l03-content-col">
          <div class="l05-golden-card" style="margin-bottom: 0.35rem; padding: 0.4rem 0.65rem;">
            <div class="l05-golden-header" style="font-size: 0.78rem;"><span>⏳</span><strong>1. Server Discovery (wait_for_server)</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.3;">Ensures the action server is active on DDS before sending commands, preventing unhandled connection drops.</p>
          </div>
          <div class="l05-golden-card" style="margin-bottom: 0.35rem; padding: 0.4rem 0.65rem;">
            <div class="l05-golden-header" style="font-size: 0.78rem;"><span>⚡</span><strong>2. Non-Blocking Async Dispatch</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.3;"><code>send_goal_async()</code> delegates execution to a background Future without freezing the node's main event loop.</p>
          </div>
          <div class="l05-golden-card" style="margin-bottom: 0.35rem; padding: 0.4rem 0.65rem;">
            <div class="l05-golden-header" style="font-size: 0.78rem;"><span>📊</span><strong>3. Live Telemetry Feedback Handler</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.3;">Receives real-time progress updates (percentage, distance remaining) streamed from the server at fixed frequencies.</p>
          </div>
          <div class="l05-golden-card" style="margin-bottom: 0; padding: 0.4rem 0.65rem;">
            <div class="l05-golden-header" style="font-size: 0.78rem;"><span>🏁</span><strong>4. Terminal Result Future Resolution</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.3;">Invokes <code>get_result_async()</code> to extract final outcome and performance metrics when the trajectory completes.</p>
          </div>
        </div>
      </div>
    `}),a.push({id:`${t.id}_sec7_dual_node_nav2`,type:"concept",lessonNum:t.num_str,lessonId:t.id,module:t.module,sectionTitle:"7. Dual-Node Verification & Nav2 Integration",badge:"🚀 Dual-Node Drill & Nav2",title:"7. Dual-Node Verification & The Nav2 Navigation Stack Connection",htmlContent:`
      <div class="l03-two-col-layout">
        <div class="l03-left-code-col">
          <div class="l03-cmd-card" style="margin-bottom: 0.4rem;">
            <div class="l03-cmd-header"><span class="l03-term-badge">bash</span><strong>2-Terminal Execution Run Sheet</strong></div>
            <pre><code class="language-bash"># Terminal 1: Run Action Server
source install/setup.bash
ros2 run nexus_amr_basics navigate_distance_server

# Terminal 2: Run Action Client Node
source install/setup.bash
ros2 run nexus_amr_basics navigate_distance_client 5.0 0.5</code></pre>
          </div>
          <div class="l03-output-card" style="margin-bottom: 0;">
            <div class="l03-output-header"><span class="l03-term-badge">Terminal Logs</span><strong>Synchronized Client-Server Execution</strong></div>
            <pre><code class="language-plaintext">[Server] Goal accepted! Moving 5.0m at 0.5 m/s...
[Client] Feedback: 3.5m left (30% done)
[Client] Feedback: 1.0m left (80% done)
[Server] Goal SUCCEEDED! Final distance: 5.0m
[Client] Final Result: Success=True | Traveled: 5.0m</code></pre>
          </div>
        </div>
        <div class="l03-content-col">
          <div class="l05-golden-card" style="margin-bottom: 0.35rem; padding: 0.4rem 0.65rem;">
            <div class="l05-golden-header" style="font-size: 0.78rem;"><span>🔄</span><strong>End-to-End Coordinated Lifecycle</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.3;">Validates the full 3-tier DDS protocol: Goal Service ➔ Feedback Topic ➔ Result Service operating seamlessly between Python processes.</p>
          </div>
          <div class="l05-golden-card" style="margin-bottom: 0.35rem; padding: 0.4rem 0.65rem;">
            <div class="l05-golden-header" style="font-size: 0.78rem;"><span>🧭</span><strong>How Production Nav2 Uses Actions</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.3;">In production robotics, the entire autonomous navigation stack (Nav2) is driven by the <code>nav2_msgs/action/NavigateToPose</code> and <code>NavigateThroughPoses</code> actions.</p>
          </div>
          <div class="l05-golden-card" style="margin-bottom: 0; padding: 0.4rem 0.65rem;">
            <div class="l05-golden-header" style="font-size: 0.78rem;"><span>🌳</span><strong>Behavior Tree Preemption &amp; Recovery</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.3;">Nav2 Behavior Trees continuously evaluate feedback to detect path blockages, cancel actions mid-flight, and execute recovery behaviors (spin, backup).</p>
          </div>
        </div>
      </div>
    `})}function ci(s,t,a){a.push({id:`${t.id}_sec1_anatomy`,type:"concept",lessonNum:t.num_str,lessonId:t.id,module:t.module,sectionTitle:"2. URDF Anatomy: Links vs. Joints",badge:"🤖 Kinematic Foundations",title:"1. URDF Kinematic Hierarchy: Links, Joints & REP-103 Conventions",htmlContent:`
      <div class="l03-two-col-layout">
        <div class="l03-content-col">
          <div class="l05-golden-card" style="margin-bottom: 0.35rem; padding: 0.4rem 0.65rem;">
            <div class="l05-golden-header" style="font-size: 0.78rem;"><span>🔗</span><strong>Links: Rigid Physical Bodies</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.3;">A Link represents an unyielding physical mass. It contains three decoupled structural tags: <code>&lt;visual&gt;</code> (render meshes for RViz), <code>&lt;collision&gt;</code> (simplified bounding boxes for physics engines), and <code>&lt;inertial&gt;</code> (mass and 3D moment of inertia tensor).</p>
          </div>
          <div class="l05-golden-card" style="margin-bottom: 0.35rem; padding: 0.4rem 0.65rem;">
            <div class="l05-golden-header" style="font-size: 0.78rem;"><span>⚙️</span><strong>Joints: Kinematic Constraints</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.3;">Joints establish relative motion constraints between a parent link and a child link. Every joint explicitly defines its reference origin <code>xyz/rpy</code>, axis of rotation/translation <code>&lt;axis xyz="..."/&gt;</code>, and physical joint limits.</p>
          </div>
          <div class="l05-golden-card" style="padding: 0.4rem 0.65rem;">
            <div class="l05-golden-header" style="font-size: 0.78rem;"><span>📐</span><strong>REP-103 Spatial Coordinate Standard</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.3;">ROS 2 strictly enforces <strong>+X Forward</strong> (Red), <strong>+Y Port / Left</strong> (Green), and <strong>+Z Upward</strong> (Blue). Origin is grounded at <code>base_footprint</code> (ground plane, z=0) with <code>base_link</code> directly above it at the structural axle center.</p>
          </div>
        </div>
        <div class="l03-content-col">
          <div class="l09-img-card" style="margin-bottom: 0.35rem;">
            <img src="assets/images/urdf_kinematic_hierarchy_rep103.jpg" alt="URDF Kinematic Tree & REP-103 Conventions" />
            <span class="l09-img-caption"><strong>REP-103 Kinematic DAG:</strong> +X Forward (Red), +Y Left (Green), +Z Up (Blue) anchored at <code>base_footprint</code> (z=0)</span>
          </div>
          <div class="l06-table-wrap">
            <table>
              <thead>
                <tr><th>Link Identifier</th><th>Type / Role</th><th>Parent Joint</th></tr>
              </thead>
              <tbody>
                <tr><td><code>base_footprint</code></td><td>Ground projection datum (z=0)</td><td>World / Odom</td></tr>
                <tr><td><code>base_link</code></td><td>Structural chassis center</td><td><code>base_footprint_joint</code> (fixed)</td></tr>
                <tr><td><code>right_wheel_1</code> / <code>left_wheel_1</code></td><td>Differential drive traction</td><td>Continuous joints</td></tr>
                <tr><td><code>lidar_1</code> / <code>camera_1</code></td><td>Perception sensors</td><td>Fixed joints</td></tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    `}),a.push({id:`${t.id}_sec2_link_anatomy`,type:"concept",lessonNum:t.num_str,lessonId:t.id,module:t.module,sectionTitle:"2. URDF Anatomy: Links vs. Joints",badge:"📦 Link Structure & Tripartite Tags",title:"2. URDF Link Anatomy: The Complete Link Excerpt (<visual>, <collision>, <inertial>)",htmlContent:`
      <div class="l03-two-col-layout l09-xml-layout">
        <div class="l03-left-code-col">
          <div class="l03-cmd-card l09-xml-card">
            <div class="l03-cmd-header"><span class="l03-term-badge">URDF Link Excerpt</span><strong>nexus_amr.urdf / base_link</strong></div>
            <pre class="l09-xml-pre"><code class="language-xml">&lt;link name="base_link"&gt;
  &lt;!-- 1. Inertial: Mass &amp; Dynamics for Gazebo Physics Solver --&gt;
  &lt;inertial&gt;
    &lt;origin xyz="0.0015 0.0004 0.0351" rpy="0 0 0"/&gt;
    &lt;mass value="0.6558"/&gt;
    &lt;inertia ixx="0.000584" iyy="0.002255" izz="0.002722"
             ixy="0.0"      iyz="0.0"      ixz="-3.3e-05"/&gt;
  &lt;/inertial&gt;

  &lt;!-- 2. Visual: 3D CAD Render Mesh &amp; Color Appearance --&gt;
  &lt;visual&gt;
    &lt;origin xyz="0 0 0" rpy="0 0 0"/&gt;
    &lt;geometry&gt;
      &lt;mesh filename="package://nexus_amr_description/meshes/base_link.stl" scale="0.001 0.001 0.001"/&gt;
    &lt;/geometry&gt;
    &lt;material name="silver"&gt;
      &lt;color rgba="0.70 0.70 0.70 1.0"/&gt;
    &lt;/material&gt;
  &lt;/visual&gt;

  &lt;!-- 3. Collision: Simplified Fast Bounding Box Hull --&gt;
  &lt;collision&gt;
    &lt;origin xyz="0 0 0" rpy="0 0 0"/&gt;
    &lt;geometry&gt;
      &lt;box size="0.25 0.20 0.08"/&gt;
    &lt;/geometry&gt;
  &lt;/collision&gt;
&lt;/link&gt;</code></pre>
          </div>
        </div>
        <div class="l03-content-col">
          <div class="l09-img-card" style="margin-bottom: 0.35rem;">
            <img src="assets/images/urdf_link_visual_collision_inertial.jpg" alt="URDF Link Tripartite Architecture: Visual, Collision, Inertial" />
            <span class="l09-img-caption"><strong>Tripartite Structure:</strong> 1. Visual Mesh &bull; 2. Collision Bounding Hull &bull; 3. Center of Mass &amp; 3x3 Inertia Tensor</span>
          </div>
          <div class="l09-tripartite-pills">
            <div class="l09-tag-pill tag-visual">
              <span class="tag-badge">🔵 &lt;visual&gt;</span>
              <p>High-poly CAD mesh (.stl/.dae) &amp; RGBA color rendered in RViz2</p>
            </div>
            <div class="l09-tag-pill tag-collision">
              <span class="tag-badge">🟠 &lt;collision&gt;</span>
              <p>Simplified low-poly box/cylinder bounding hull for fast physics contact detection</p>
            </div>
            <div class="l09-tag-pill tag-inertial">
              <span class="tag-badge">🟢 &lt;inertial&gt;</span>
              <p>Mass in kg, CoM centroid offset, and 3x3 rotational inertia tensor matrix</p>
            </div>
          </div>
        </div>
      </div>
    `}),a.push({id:`${t.id}_sec3_joint_anatomy`,type:"concept",lessonNum:t.num_str,lessonId:t.id,module:t.module,sectionTitle:"2. URDF Anatomy: Links vs. Joints",badge:"🔩 Kinematic Constraint Excerpt",title:"3. URDF Joint Anatomy: Parent-Child Binding, Relative Poses & Limits",htmlContent:`
      <div class="l03-two-col-layout l09-xml-layout">
        <div class="l03-left-code-col">
          <div class="l03-cmd-card l09-xml-card">
            <div class="l03-cmd-header"><span class="l03-term-badge">URDF Joint Excerpt</span><strong>nexus_amr.urdf / right_motor &amp; steer</strong></div>
            <pre class="l09-xml-pre"><code class="language-xml">&lt;!-- 1. Continuous Joint: Wheel Traction Drive --&gt;
&lt;joint name="right_motor" type="continuous"&gt;
  &lt;parent link="base_link"/&gt;
  &lt;child link="right_wheel_1"/&gt;
  &lt;origin xyz="0.0561 -0.0516 0.0350" rpy="0 0 0"/&gt;
  &lt;axis xyz="0 1 0"/&gt;
  &lt;limit effort="10.0" velocity="12.5"/&gt;
  &lt;dynamics damping="0.05" friction="0.01"/&gt;
&lt;/joint&gt;

&lt;!-- 2. Revolute Joint Example with Angular Limits --&gt;
&lt;joint name="steer_joint" type="revolute"&gt;
  &lt;parent link="base_link"/&gt;
  &lt;child link="caster_swivel_link"/&gt;
  &lt;origin xyz="-0.1200 0.0000 0.0200" rpy="0 0 0"/&gt;
  &lt;axis xyz="0 0 1"/&gt;
  &lt;limit lower="-1.5708" upper="1.5708" effort="20.0" velocity="3.14"/&gt;
  &lt;dynamics damping="0.02" friction="0.01"/&gt;
&lt;/joint&gt;</code></pre>
          </div>
        </div>
        <div class="l03-content-col">
          <div class="l09-img-card" style="margin-bottom: 0.35rem;">
            <img src="assets/images/urdf_joint_anatomy_animation.svg" alt="URDF Joint Anatomy Animated Mechanical Simulation" />
            <span class="l09-img-caption"><strong>Joint Kinematics:</strong> Origin <code>xyz/rpy</code> offset &bull; Mechanical pivot &bull; Motion <code>axis</code> &bull; Travel <code>limit</code></span>
          </div>
          <div class="l09-tripartite-pills">
            <div class="l09-tag-pill">
              <span class="tag-badge" style="background: #8b5cf6;">🔗 &lt;parent&gt; &rarr; &lt;child&gt;</span>
              <p>Rigid kinematic DAG binding between parent link and child link</p>
            </div>
            <div class="l09-tag-pill">
              <span class="tag-badge" style="background: #0284c7;">📐 &lt;origin&gt;</span>
              <p>6-DoF spatial translation (xyz) &amp; orientation (rpy) offset vector</p>
            </div>
            <div class="l09-tag-pill">
              <span class="tag-badge" style="background: #dc2626;">🎯 &lt;axis&gt; &amp; &lt;limit&gt;</span>
              <p>Unit motion vector with lower/upper mechanical travel limits &amp; effort</p>
            </div>
            <div class="l09-tag-pill">
              <span class="tag-badge" style="background: #10b981;">⚙️ &lt;dynamics&gt;</span>
              <p>Simulates physical joint damping and Coulomb friction in Gazebo</p>
            </div>
          </div>
        </div>
      </div>
    `}),a.push({id:`${t.id}_sec4_joint_animation`,type:"concept",lessonNum:t.num_str,lessonId:t.id,module:t.module,sectionTitle:"2. URDF Anatomy: Links vs. Joints",badge:"🔩 Joint Kinematics & DOF",title:"4. URDF Joint Mechanics: The 4 Primary Motion Types with Live Animation",htmlContent:`
      <div class="l09-joint-layout">
        <div class="l09-joint-anim-stage">
          <img src="assets/images/urdf_joint_types_animation.svg" alt="URDF Joint Types Animated Mechanical Motion" />
        </div>
        <div class="l05-banner-intro" style="margin-top: 0.1rem; font-size: 0.72rem; padding: 0.35rem 0.75rem; text-align: center;">
          <strong>💡 Kinematic Summary:</strong> Differential-drive AMRs combine <code>continuous</code> joints for active drive wheels and <code>fixed</code> joints for sensor mounts (LiDAR, camera). Multi-DOF joints include <code>planar</code> (3-DOF, omnidirectional bases) and <code>floating</code> (6-DOF, aerial drones).
        </div>
      </div>
    `}),a.push({id:`${t.id}_sec5_xacro_macros`,type:"concept",lessonNum:t.num_str,lessonId:t.id,module:t.module,sectionTitle:"3. Authoring nexus_amr.urdf.xacro",badge:"📦 Modular Xacro Engine",title:"5. Parameterizing Robot Models: Xacro Properties, Math & Reusable Macros",htmlContent:`
      <div class="l03-two-col-layout l09-xml-layout">
        <div class="l03-left-code-col">
          <div class="l03-cmd-card l09-xml-card">
            <div class="l03-cmd-header"><span class="l03-term-badge">nexus_amr.urdf.xacro</span><strong>Parametric Wheel Macro</strong></div>
            <pre class="l09-xml-pre"><code class="language-xml">&lt;robot xmlns:xacro="http://www.ros.org/wiki/xacro" name="nexus_amr"&gt;
  &lt;!-- 1. Global Parameter Constants --&gt;
  &lt;xacro:property name="wheel_r" value="0.035"/&gt;
  &lt;xacro:property name="wheel_w" value="0.020"/&gt;
  &lt;xacro:property name="track_w" value="0.103"/&gt;

  &lt;!-- 2. Reusable Parametric Wheel Macro --&gt;
  &lt;xacro:macro name="drive_wheel" params="prefix parent reflect"&gt;
    &lt;link name="\${prefix}_wheel_1"&gt;
      &lt;visual&gt;
        &lt;geometry&gt;&lt;cylinder radius="\${wheel_r}" length="\${wheel_w}"/&gt;&lt;/geometry&gt;
        &lt;material name="black"/&gt;
      &lt;/visual&gt;
      &lt;collision&gt;
        &lt;geometry&gt;&lt;cylinder radius="\${wheel_r}" length="\${wheel_w}"/&gt;&lt;/geometry&gt;
      &lt;/collision&gt;
      &lt;xacro:cylinder_inertia m="0.036" r="\${wheel_r}" h="\${wheel_w}"/&gt;
    &lt;/link&gt;
    &lt;joint name="\${prefix}_motor" type="continuous"&gt;
      &lt;parent link="\${parent}"/&gt;
      &lt;child link="\${prefix}_wheel_1"/&gt;
      &lt;origin xyz="0.056 \${reflect * track_w / 2} 0.035" rpy="0 0 0"/&gt;
      &lt;axis xyz="0 1 0"/&gt;
    &lt;/joint&gt;
  &lt;/xacro:macro&gt;

  &lt;!-- 3. Symmetrical Macro Instantiations --&gt;
  &lt;xacro:drive_wheel prefix="right" parent="base_link" reflect="-1"/&gt;
  &lt;xacro:drive_wheel prefix="left"  parent="base_link" reflect="1"/&gt;
&lt;/robot&gt;</code></pre>
          </div>
        </div>
        <div class="l03-content-col">
          <div class="l05-golden-card" style="margin-bottom: 0.35rem; padding: 0.4rem 0.65rem;">
            <div class="l05-golden-header" style="font-size: 0.78rem;"><span>🎯</span><strong>Why Xacro Over Raw URDF?</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.3;">Raw URDF requires copying identical XML blocks for left and right wheels. Xacro macros eliminate copy-paste errors and enforce mathematical symmetry across both sides of the chassis.</p>
          </div>
          <div class="l05-golden-card" style="margin-bottom: 0.35rem; padding: 0.4rem 0.65rem;">
            <div class="l05-golden-header" style="font-size: 0.78rem;"><span>📐</span><strong>Global Properties &amp; Built-in Math</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.3;"><code>&lt;xacro:property&gt;</code> constants define dimensions (wheel radius, track width) in a single place. Built-in math syntax <code>\${reflect * track_w / 2}</code> calculates symmetrical joint offsets automatically.</p>
          </div>
          <div class="l05-golden-card" style="padding: 0.4rem 0.65rem;">
            <div class="l05-golden-header" style="font-size: 0.78rem;"><span>🧩</span><strong>Modular Subsystem Architecture</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.3;">Split monolithic robot files into clean modules via <code>&lt;xacro:include filename="$(find ...)/urdf/lidar.xacro"/&gt;</code>. Compile to pure URDF via <code>xacro nexus_amr.urdf.xacro &gt; /tmp/robot.urdf</code>.</p>
          </div>
        </div>
      </div>
    `}),a.push({id:`${t.id}_sec6_cad_fusion360`,type:"concept",lessonNum:t.num_str,lessonId:t.id,module:t.module,sectionTitle:"5. Industrial CAD Workflow: From CAD to ROS 2 URDF",badge:"🏭 CAD to ROS 2 Pipeline",title:"6. Industrial CAD Pipeline: Designing in Autodesk Fusion 360 & Exporting to ROS 2 URDF",htmlContent:`
      <div class="l03-two-col-layout">
        <div class="l03-content-col">
          <div class="l05-golden-card" style="margin-bottom: 0.3rem; padding: 0.35rem 0.6rem;">
            <div class="l05-golden-header" style="font-size: 0.76rem;"><span>1️⃣</span><strong>Parametric CAD Modeling in Fusion 360</strong></div>
            <p style="font-size: 0.72rem; line-height: 1.28;">Model chassis, drive wheels, casters, and sensor mounts as individual components (<code>urr_bot v8.f3d</code>). Align joint pivot origins with component coordinate origins.</p>
          </div>
          <div class="l05-golden-card" style="margin-bottom: 0.3rem; padding: 0.35rem 0.6rem;">
            <div class="l05-golden-header" style="font-size: 0.76rem;"><span>2️⃣</span><strong>Automated Export via fusion2urdf</strong></div>
            <p style="font-size: 0.72rem; line-height: 1.28;">Run the <code>fusion2urdf-ros2</code> add-in. It automatically computes Center of Mass (CoM), 3D inertia tensors (<code>ixx, iyy, izz</code>), and exports triangular surface meshes (<code>base_link.stl</code>, <code>right_wheel_1.stl</code>, etc.).</p>
          </div>
          <div class="l05-golden-card" style="margin-bottom: 0.3rem; padding: 0.35rem 0.6rem;">
            <div class="l05-golden-header" style="font-size: 0.76rem;"><span>3️⃣</span><strong>Millimeter-to-Meter Scaling Rule</strong></div>
            <p style="font-size: 0.72rem; line-height: 1.28;"><strong>Golden Rule:</strong> CAD suites export STL in millimeters (mm). ROS 2 URDF strictly requires meters (m). Always apply <code>scale="0.001 0.001 0.001"</code> inside the <code>&lt;mesh&gt;</code> tag.</p>
          </div>
          <div class="l05-golden-card" style="padding: 0.35rem 0.6rem;">
            <div class="l05-golden-header" style="font-size: 0.76rem;"><span>4️⃣</span><strong>Package Integration &amp; Verification</strong></div>
            <p style="font-size: 0.72rem; line-height: 1.28;">Store meshes in <code>nexus_amr_description/meshes/</code> and install via <code>setup.py</code>. Inspect the kinematic tree using <code>check_urdf</code> and preview in RViz2 with joint sliders.</p>
          </div>
        </div>
        <div class="l03-content-col">
          <div class="l09-cad-image-card">
            <img src="assets/images/nexus_amr_real_urdf_robot_design.jpg" alt="Real Nexus AMR URDF Robot Design" />
            <div class="cad-caption">
              <strong style="color: #0284c7;">Nexus AMR 3D URDF Digital Twin:</strong> Dual drive wheels, front caster, 360&deg; RPLiDAR puck, front camera, and active REP-103 TF coordinate frames.
            </div>
            <div class="l03-cmd-header" style="width: 100%; padding: 0.25rem 0.5rem; font-size: 0.7rem; box-sizing: border-box; background: rgba(0,0,0,0.3); border-radius: 4px;">
              <span class="l03-term-badge" style="font-size: 0.65rem;">Mesh Reference</span>
              <code>&lt;mesh filename="package://...base_link.stl" scale="0.001 0.001 0.001"/&gt;</code>
            </div>
          </div>
        </div>
      </div>
    `})}function pi(s,t,a){a.push({id:`${t.id}_sec1_rviz_workspace`,type:"concept",lessonNum:t.num_str,lessonId:t.id,module:t.module,sectionTitle:"1. RViz2 3D Sensor Perception Suite",badge:"👁️ 3D Perception Dashboard",title:"1. RViz2 Architecture: Visualizing Robot State & Active Sensor Streams",htmlContent:`
      <div class="l03-two-col-layout">
        <div class="l03-content-col">
          <div class="l05-golden-card" style="margin-bottom: 0.35rem; padding: 0.4rem 0.65rem;">
            <div class="l05-golden-header" style="font-size: 0.78rem;"><span>👁️</span><strong>Perception Visualizer vs Physics Simulator</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.3;">RViz2 visualizes what the robot <em>believes and perceives</em> via DDS topics (LiDAR, Camera, TF, Costmaps). Unlike Gazebo, RViz2 contains no physics engine—it runs directly on physical robots in factories as the primary engineering cockpit.</p>
          </div>
          <div class="l05-golden-card" style="margin-bottom: 0.35rem; padding: 0.4rem 0.65rem;">
            <div class="l05-golden-header" style="font-size: 0.78rem;"><span>🖥️</span><strong>The RViz2 Workspace Anatomy</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.3;">The interface unites the <strong>Displays Panel</strong> (topic bindings &amp; render properties), the <strong>3D Central Viewport</strong> (interactive OGRE rendering canvas), the <strong>Views Panel</strong> (Orbit/FPS cameras), and the <strong>Time Sync Status</strong>.</p>
          </div>
          <div class="l05-golden-card" style="padding: 0.4rem 0.65rem;">
            <div class="l05-golden-header" style="font-size: 0.78rem;"><span>📡</span><strong>Real-Time DDS Topic Ingestion</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.3;">RViz2 dynamically subscribes to <code>/robot_description</code>, <code>/scan</code>, <code>/tf</code>, <code>/tf_static</code>, and <code>/odom</code>, transforming raw binary sensor messages into millimeter-accurate 3D spatial geometry.</p>
          </div>
        </div>
        <div class="l03-content-col">
          <div class="l09-img-card" style="margin-bottom: 0.35rem;">
            <img src="assets/images/rviz2_robot_sensor_visualization.jpg" alt="RViz2 3D Robot Model and Sensor Visualization Dashboard" />
            <span class="l09-img-caption"><strong>Live RViz2 Inspection:</strong> Nexus AMR 3D Model &bull; 360&deg; LiDAR rays (<code>/scan</code>) &bull; Camera frustum &bull; TF frames &bull; Odometry path</span>
          </div>
          <div class="l05-banner-intro" style="font-size: 0.72rem; padding: 0.35rem 0.65rem;">
            <strong>💡 Golden Rule:</strong> RViz2 renders visual representations of real message payloads. If a sensor node stops publishing, the corresponding display freezes or dims immediately.
          </div>
        </div>
      </div>
    `}),a.push({id:`${t.id}_sec2_sensor_displays`,type:"concept",lessonNum:t.num_str,lessonId:t.id,module:t.module,sectionTitle:"2. Multi-Sensor Displays in RViz2",badge:"📡 Multi-Sensor Telemetry",title:"2. RViz2 Sensor Displays: Decoding LaserScan, Depth Clouds, TF & Odometry",htmlContent:`
      <div class="l03-two-col-layout">
        <div class="l03-content-col">
          <div class="l06-table-wrap">
            <table>
              <thead>
                <tr><th style="width: 25%;">Display Plugin</th><th style="width: 28%;">Topic / Source</th><th>Visual Representation</th></tr>
              </thead>
              <tbody>
                <tr><td><code>RobotModel</code></td><td><code>/robot_description</code></td><td>Renders 3D URDF visual meshes, joints &amp; collision hulls.</td></tr>
                <tr><td><code>TF</code></td><td><code>/tf</code> &amp; <code>/tf_static</code></td><td>Visualizes 3D coordinate frame axes (RGB = XYZ).</td></tr>
                <tr><td><code>LaserScan</code></td><td><code>/scan</code></td><td>Projects 2D LiDAR range beams with rainbow distance gradient.</td></tr>
                <tr><td><code>Camera</code></td><td><code>/camera/image_raw</code></td><td>Renders 2D image feed + 3D translucent viewing frustum.</td></tr>
                <tr><td><code>Odometry</code></td><td><code>/odom</code></td><td>Renders robot position arrow, trail history &amp; covariance.</td></tr>
              </tbody>
            </table>
          </div>
        </div>
        <div class="l03-content-col">
          <div class="l05-golden-card" style="margin-bottom: 0.35rem; padding: 0.4rem 0.65rem;">
            <div class="l05-golden-header" style="font-size: 0.78rem;"><span>🎯</span><strong>LaserScan Point Cloud Projection</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.3;">Converts polar range-bearing pairs <code>(r, &theta;)</code> into Cartesian 3D spatial points relative to <code>laser_frame</code>, colored by proximity to obstacles.</p>
          </div>
          <div class="l05-golden-card" style="margin-bottom: 0.35rem; padding: 0.4rem 0.65rem;">
            <div class="l05-golden-header" style="font-size: 0.78rem;"><span>📷</span><strong>Camera Frustum &amp; Image Fusion</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.3;">Draws an interactive 3D vision cone projecting forward from <code>camera_link</code>, enabling engineers to verify field-of-view (FoV) coverage against physical blindspots.</p>
          </div>
          <div class="l05-golden-card" style="padding: 0.4rem 0.65rem;">
            <div class="l05-golden-header" style="font-size: 0.78rem;"><span>📈</span><strong>Odometry Trails &amp; Covariance Ellipses</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.3;">Visualizes dead-reckoning trajectory history and positional uncertainty ellipsoids derived from wheel encoders and IMU integration.</p>
          </div>
        </div>
      </div>
    `}),a.push({id:`${t.id}_sec3_diff_drive_kinematics`,type:"concept",lessonNum:t.num_str,lessonId:t.id,module:t.module,sectionTitle:"3. Differential Drive Kinematics & ICC",badge:"⚙️ AMR Kinematics & Motion Geometry",title:"3. Differential Drive Kinematics: Mathematical Modeling & ICC Motion Geometry",htmlContent:`
      <div class="l09-joint-layout">
        <div class="l09-joint-anim-stage">
          <img src="assets/images/diff_drive_kinematics_animation.svg" alt="Differential Drive AMR Kinematics and ICC Geometry Live Animation" />
        </div>
        <div class="l05-banner-intro" style="margin-top: 0.1rem; font-size: 0.72rem; padding: 0.35rem 0.75rem; text-align: center;">
          <strong>💡 Kinematic Principle:</strong> Two-wheel differential drive robots adhere to a <strong>non-holonomic constraint</strong> prohibiting lateral side-slip (<code>v_y = 0</code>). All curved motion traces instantaneous circular arcs around the <strong>ICC</strong> with turning radius <code>R = v / &omega;</code>.
        </div>
      </div>
    `}),a.push({id:`${t.id}_sec4_tf_tree_hierarchy`,type:"concept",lessonNum:t.num_str,lessonId:t.id,module:t.module,sectionTitle:"4. Coordinate Frames & TF2 DAG Hierarchy",badge:"📐 Kinematic TF2 Architecture",title:"4. Coordinate Frames & The Differential Drive TF2 DAG Hierarchy",htmlContent:`
      <div class="l09-joint-layout">
        <div class="l09-joint-anim-stage">
          <img src="assets/images/diff_drive_tf_tree_animation.svg" alt="Differential Drive Robot TF2 Kinematic Transform Tree Animation" />
        </div>
        <div class="l05-banner-intro" style="margin-top: 0.1rem; font-size: 0.72rem; padding: 0.35rem 0.75rem; text-align: center;">
          <strong>💡 Single-Parent Topology:</strong> TF2 strictly enforces a Directed Acyclic Graph (DAG) with zero kinematic loops. The authoritative path flows from <code>map</code> (global SLAM datum) &rarr; <code>odom</code> (continuous 50Hz odometry) &rarr; <code>base_footprint</code> &rarr; <code>base_link</code> &rarr; sensors and wheels.
        </div>
      </div>
    `}),a.push({id:`${t.id}_sec5_fixed_frame_rule`,type:"concept",lessonNum:t.num_str,lessonId:t.id,module:t.module,sectionTitle:"5. The Authoritative Fixed Frame Rule",badge:"🎯 Reference Datum Alignment",title:"5. The Authoritative Fixed Frame Rule & Spatial Sensor Alignment",htmlContent:`
      <div class="l03-two-col-layout">
        <div class="l03-content-col">
          <div class="l06-table-wrap">
            <table>
              <thead>
                <tr><th style="width: 28%;">Fixed Frame Selection</th><th style="width: 32%;">Primary Purpose</th><th>Observation Behavior</th></tr>
              </thead>
              <tbody>
                <tr><td><code>base_link</code></td><td>URDF &amp; Joint Inspection</td><td>Robot remains stationary at origin; environment moves.</td></tr>
                <tr><td><code>odom</code></td><td>Wheel Odometry Testing</td><td>Continuous smooth path; robot drives across room datum.</td></tr>
                <tr><td><code>map</code></td><td>SLAM &amp; Autonomous Nav</td><td>Drift-free global warehouse grid; corrected by loop closures.</td></tr>
              </tbody>
            </table>
          </div>
          <div class="l05-golden-card warning" style="margin-top: 0.35rem; padding: 0.4rem 0.65rem;">
            <div class="l05-golden-header" style="font-size: 0.78rem;"><span>⚠️</span><strong>The "Frame Does Not Exist" Error</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.3;">If an active transform connecting a sensor's <code>header.frame_id</code> to the selected Fixed Frame is missing or times out, RViz2 displays immediately error out in red.</p>
          </div>
        </div>
        <div class="l03-content-col">
          <div class="l05-golden-card" style="margin-bottom: 0.35rem; padding: 0.4rem 0.65rem;">
            <div class="l05-golden-header" style="font-size: 0.78rem;"><span>🔴🟢🔵</span><strong>The Universal "RGB = XYZ" Rule (REP-103)</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.3;"><strong>Red Axis = +X</strong> (Forward Longitudinal)<br/><strong>Green Axis = +Y</strong> (Port / Left Lateral)<br/><strong>Blue Axis = +Z</strong> (Upward Vertical normal to ground)</p>
          </div>
          <div class="l05-golden-card" style="padding: 0.4rem 0.65rem;">
            <div class="l05-golden-header" style="font-size: 0.78rem;"><span>📷</span><strong>Camera Optical Frame Exception</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.3;">Computer vision libraries (OpenCV) expect <strong>Z Forward</strong>, <strong>X Right</strong>, <strong>Y Down</strong>. A static transform bridges <code>camera_link</code> to <code>camera_optical_frame</code> via roll: -90&deg;, yaw: -90&deg; rotation.</p>
          </div>
        </div>
      </div>
    `}),a.push({id:`${t.id}_sec6_launch_pipeline`,type:"concept",lessonNum:t.num_str,lessonId:t.id,module:t.module,sectionTitle:"6. Building the Launch Pipeline: rsp & display",badge:"🚀 Launch Architecture",title:"6. The Robot State Publisher & RViz2 Launch Pipeline Architecture",htmlContent:`
      <div class="l03-two-col-layout l09-xml-layout">
        <div class="l03-left-code-col">
          <div class="l03-cmd-card l09-xml-card" style="margin-bottom: 0;">
            <div class="l03-cmd-header"><span class="l03-term-badge">display.launch.py</span><strong>RViz2 Bringup Nodes</strong></div>
            <pre class="l09-xml-pre"><code class="language-python"># 1. State Publisher (Broadcasting robot URDF & TF)
rsp_launch = IncludeLaunchDescription(
    PythonLaunchDescriptionSource([rsp_path]),
    launch_arguments={'use_sim_time': 'false'}.items()
)

# 2. Joint State Publisher GUI (Interactive joint sliders)
jsp_gui_node = Node(
    package='joint_state_publisher_gui',
    executable='joint_state_publisher_gui'
)

# 3. RViz2 Visualizer Node (Pre-configured config)
rviz_node = Node(
    package='rviz2',
    executable='rviz2',
    arguments=['-d', rviz_config_path]
)</code></pre>
          </div>
        </div>
        <div class="l03-content-col">
          <div class="l05-golden-card" style="margin-bottom: 0.35rem; padding: 0.4rem 0.65rem;">
            <div class="l05-golden-header" style="font-size: 0.78rem;"><span>📡</span><strong>robot_state_publisher Role</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.3;">Parses the URDF XML, listens to <code>/joint_states</code>, calculates 3D forward kinematics, and broadcasts all coordinate frame transforms to <code>/tf</code> and <code>/tf_static</code>.</p>
          </div>
          <div class="l05-golden-card" style="margin-bottom: 0.35rem; padding: 0.4rem 0.65rem;">
            <div class="l05-golden-header" style="font-size: 0.78rem;"><span>🎚️</span><strong>joint_state_publisher_gui Role</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.3;">Opens an interactive GUI slider for non-fixed joints, publishing real-time mock joint angles to <code>/joint_states</code> before physical motor encoders exist.</p>
          </div>
          <div class="l05-golden-card" style="padding: 0.4rem 0.65rem;">
            <div class="l05-golden-header" style="font-size: 0.78rem;"><span>💾</span><strong>Config File Persistence (-d)</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.3;">Always supply <code>arguments=['-d', rviz_config]</code> so your curated displays, topic bindings, and camera views load automatically without manual setup.</p>
          </div>
        </div>
      </div>
    `}),a.push({id:`${t.id}_sec7_tf_cli`,type:"concept",lessonNum:t.num_str,lessonId:t.id,module:t.module,sectionTitle:"7. Kinematic TF Diagnostics & CLI Tools",badge:"🔍 TF2 CLI Diagnostics",title:"7. Kinematic TF Diagnostics: view_frames, tf2_echo & tf2_monitor",htmlContent:`
      <div class="l03-two-col-layout">
        <div class="l03-content-col">
          <div class="l03-cmd-card">
            <div class="l03-cmd-header"><span class="l03-term-badge">TF2 CLI Tools</span><strong>Essential Diagnostic Commands</strong></div>
            <pre><code class="language-bash"># 1. Generate full TF kinematic tree PDF report
ros2 run tf2_tools view_frames

# 2. Inspect real-time 3D offset between two frames
ros2 run tf2_ros tf2_echo base_link laser_frame

# 3. Monitor broadcast frequency & latency across all frames
ros2 run tf2_ros tf2_monitor</code></pre>
          </div>
          <div class="l05-banner-intro" style="margin-top: 0.35rem; font-size: 0.72rem; padding: 0.35rem 0.65rem;">
            <strong>💡 Pro-Tip:</strong> Run <code>tf2_echo</code> to dynamically verify your URDF sensor offsets against real measured physical calipers on the hardware chassis.
          </div>
        </div>
        <div class="l03-content-col">
          <div class="l05-golden-card" style="margin-bottom: 0.35rem; padding: 0.4rem 0.65rem;">
            <div class="l05-golden-header" style="font-size: 0.78rem;"><span>📄</span><strong>view_frames Kinematic Tree Audit</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.3;">Generates <code>frames.pdf</code> showing the complete hierarchy from root <code>map</code> down to sensor frames, confirming no disjointed sub-trees or missing broadcasters.</p>
          </div>
          <div class="l05-golden-card" style="margin-bottom: 0.35rem; padding: 0.4rem 0.65rem;">
            <div class="l05-golden-header" style="font-size: 0.78rem;"><span>📡</span><strong>tf2_echo Real-Time Vector Check</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.3;">Streams the exact translation (x, y, z) and rotation (quaternion / RPY) between two frames at 1Hz, verifying hardware sensor placement against CAD design.</p>
          </div>
          <div class="l05-golden-card" style="padding: 0.4rem 0.65rem;">
            <div class="l05-golden-header" style="font-size: 0.78rem;"><span>⏱️</span><strong>tf2_monitor Latency &amp; Jitter</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.3;">Measures publication rate (Hz) and age of transforms. Helps diagnose dropped frames, CPU starvation, or network buffering issues.</p>
          </div>
        </div>
      </div>
    `})}function mi(s,t,a){a.push({id:`${t.id}_sec1_gazebo_gui_arch`,type:"concept",lessonNum:t.num_str,lessonId:t.id,module:t.module,sectionTitle:"1. Gazebo 3D Simulation Architecture",badge:"🌍 Physics Simulator & GUI Cockpit",title:"1. Gazebo Architecture: 3D Physics Engine Mechanics & Workspace Anatomy",htmlContent:`
      <div class="l03-two-col-layout">
        <div class="l03-content-col" style="display: flex; flex-direction: column; justify-content: space-between; gap: 0.35rem;">
          <div class="l05-golden-card" style="padding: 0.4rem 0.65rem;">
            <div class="l05-golden-header" style="font-size: 0.78rem;"><span>⚙️</span><strong>Physics Simulator vs Perception Visualizer</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.3;">Unlike RViz2 (which only displays incoming messages), Gazebo solves Newtonian rigid-body dynamics (<code>F = m · a</code>). It models gravity (<code>-9.81 m/s²</code>), ground friction, motor torques, collision impulses, and ray-traced sensor physics.</p>
          </div>
          <div class="l05-golden-card" style="padding: 0.4rem 0.65rem;">
            <div class="l05-golden-header" style="font-size: 0.78rem;"><span>🖥️</span><strong>The Gazebo GUI Workspace Anatomy</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.3;">The interface unites the <strong>Entity Tree</strong> (world models &amp; links), <strong>3D Central Viewport</strong> (ODE physics with collision wireframes &amp; CoM), <strong>Top Toolbar</strong> (Translate, Rotate, Scale, Spawners), and <strong>Component Inspector</strong>.</p>
          </div>
          <div class="l05-golden-card" style="padding: 0.4rem 0.65rem;">
            <div class="l05-golden-header" style="font-size: 0.78rem;"><span>⏱️</span><strong>Discrete Step (1ms) &amp; Real-Time Factor (RTF)</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.3;">ODE advances physics in discrete 1000 Hz steps (<code>dt = 0.001s</code>). <code>RTF = Sim Time / Real Time</code>. RTF = 1.00x means 100% real-world speed; RTF &lt; 1.0 signals CPU physics solver bottleneck.</p>
          </div>
        </div>
        <div class="l03-content-col" style="display: flex; flex-direction: column; justify-content: center;">
          <div style="background: rgba(15, 23, 42, 0.65); border: 1px solid rgba(249, 115, 22, 0.35); border-radius: 8px; padding: 0.35rem; box-shadow: 0 4px 14px rgba(0,0,0,0.3);">
            <img src="assets/images/gazebo_sim_robot_visualization.jpg" alt="Gazebo Sim 3D Robot Simulation Workspace" style="width: 100%; max-height: 270px; object-fit: contain; border-radius: 6px; display: block;" />
            <div style="margin-top: 0.3rem; font-size: 0.68rem; color: #94a3b8; text-align: center; font-family: monospace;">
              Live Gazebo Sim: Nexus AMR in Warehouse World • ODE Solver (1000 Hz) • Collision Wireframes • Center of Mass (CoM) • Playback Stepper
            </div>
          </div>
          <div class="l05-banner-intro" style="margin-top: 0.35rem; font-size: 0.72rem; padding: 0.35rem 0.65rem; border-left: 3px solid #f97316;">
            <strong>💡 The Simulated Clock Rule (/clock):</strong> Gazebo publishes simulated time to <code>/clock</code>. All ROS 2 nodes must run with <code>use_sim_time:=True</code> to prevent TF lookup failures.
          </div>
        </div>
      </div>
    `}),a.push({id:`${t.id}_sec2_diff_drive_plugin`,type:"concept",lessonNum:t.num_str,lessonId:t.id,module:t.module,sectionTitle:"2. The Differential Drive Controller Plugin",badge:"🚜 Motion Controller Plugin",title:"2. Closed-Loop Kinematics: libgazebo_ros_diff_drive.so",htmlContent:`
      <div class="l03-two-col-layout l09-xml-layout">
        <div class="l03-left-code-col">
          <div class="l03-cmd-card l09-xml-card" style="margin-bottom: 0;">
            <div class="l03-cmd-header"><span class="l03-term-badge">gazebo.xacro</span><strong>Diff-Drive Plugin Config</strong></div>
            <pre class="l09-xml-pre"><code class="language-xml">&lt;gazebo&gt;
  &lt;plugin name="diff_drive" filename="libgazebo_ros_diff_drive.so"&gt;
    &lt;left_joint&gt;left_wheel_joint&lt;/left_joint&gt;
    &lt;right_joint&gt;right_wheel_joint&lt;/right_joint&gt;
    &lt;wheel_separation&gt;0.44&lt;/wheel_separation&gt;
    &lt;wheel_diameter&gt;0.16&lt;/wheel_diameter&gt;
    &lt;max_wheel_torque&gt;20&lt;/max_wheel_torque&gt;
    &lt;max_wheel_acceleration&gt;1.5&lt;/max_wheel_acceleration&gt;
    &lt;command_topic&gt;cmd_vel&lt;/command_topic&gt;
    &lt;publish_odom&gt;true&lt;/publish_odom&gt;
    &lt;publish_odom_tf&gt;true&lt;/publish_odom_tf&gt;
    &lt;odometry_frame&gt;odom&lt;/odometry_frame&gt;
    &lt;robot_base_frame&gt;base_footprint&lt;/robot_base_frame&gt;
  &lt;/plugin&gt;
&lt;/gazebo&gt;</code></pre>
          </div>
        </div>
        <div class="l03-content-col" style="display: flex; flex-direction: column; justify-content: space-between; gap: 0.3rem;">
          <div class="l05-golden-card" style="padding: 0.35rem 0.6rem;">
            <div class="l05-golden-header" style="font-size: 0.76rem;"><span>🎯</span><strong>Direct cmd_vel Ingestion</strong></div>
            <p style="font-size: 0.72rem; line-height: 1.28;">Subscribes to <code>geometry_msgs/msg/Twist</code> on <code>/cmd_vel</code>. Calculates individual wheel velocities using track separation: <code>v_L = v - (w &middot; L / 2)</code>, <code>v_R = v + (w &middot; L / 2)</code>.</p>
          </div>
          <div class="l05-golden-card" style="padding: 0.35rem 0.6rem;">
            <div class="l05-golden-header" style="font-size: 0.76rem;"><span>🔄</span><strong>Odometry &amp; TF Broadcasting</strong></div>
            <p style="font-size: 0.72rem; line-height: 1.28;">Integrates wheel encoder revolutions to compute dead-reckoning pose. Automatically publishes <code>nav_msgs/msg/Odometry</code> on <code>/odom</code> and broadcasts <code>odom &rarr; base_footprint</code> TF.</p>
          </div>
          <div class="l05-golden-card" style="padding: 0.35rem 0.6rem;">
            <div class="l05-golden-header" style="font-size: 0.76rem;"><span>⚙️</span><strong>Motor Limits &amp; Torque Modeling</strong></div>
            <p style="font-size: 0.72rem; line-height: 1.28;">Enforces maximum torque (20 N&middot;m) and acceleration limits to simulate physical motor saturation and wheel slip under heavy payload.</p>
          </div>
        </div>
      </div>
    `}),a.push({id:`${t.id}_sec3_lidar_plugin`,type:"concept",lessonNum:t.num_str,lessonId:t.id,module:t.module,sectionTitle:"3. The 2D LiDAR Ray Sensor Plugin",badge:"📡 LiDAR Ray Sensor",title:"3. Simulating Perception: 2D LiDAR Ray Sensor Plugin Configuration",htmlContent:`
      <div class="l03-two-col-layout l09-xml-layout">
        <div class="l03-left-code-col">
          <div class="l03-cmd-card l09-xml-card" style="margin-bottom: 0;">
            <div class="l03-cmd-header"><span class="l03-term-badge">gazebo.xacro</span><strong>LiDAR Plugin Config</strong></div>
            <pre class="l09-xml-pre"><code class="language-xml">&lt;gazebo reference="laser_frame"&gt;
  &lt;sensor name="lidar" type="ray"&gt;
    &lt;always_on&gt;true&lt;/always_on&gt;
    &lt;visualize&gt;false&lt;/visualize&gt;
    &lt;update_rate&gt;10&lt;/update_rate&gt;
    &lt;ray&gt;
      &lt;scan&gt;
        &lt;horizontal&gt;
          &lt;samples&gt;360&lt;/samples&gt;
          &lt;min_angle&gt;-3.14159&lt;/min_angle&gt;
          &lt;max_angle&gt;3.14159&lt;/max_angle&gt;
        &lt;/horizontal&gt;
      &lt;/scan&gt;
      &lt;range&gt;&lt;min&gt;0.12&lt;/min&gt;&lt;max&gt;12.0&lt;/max&gt;&lt;/range&gt;
      &lt;noise&gt;&lt;type&gt;gaussian&lt;/type&gt;&lt;stddev&gt;0.01&lt;/stddev&gt;&lt;/noise&gt;
    &lt;/ray&gt;
    &lt;plugin name="lidar_controller" filename="libgazebo_ros_ray_sensor.so"&gt;
      &lt;ros&gt;&lt;remapping&gt;~/out:=scan&lt;/remapping&gt;&lt;/ros&gt;
      &lt;output_type&gt;sensor_msgs/LaserScan&lt;/output_type&gt;
      &lt;frame_name&gt;laser_frame&lt;/frame_name&gt;
    &lt;/plugin&gt;
  &lt;/sensor&gt;
&lt;/gazebo&gt;</code></pre>
          </div>
        </div>
        <div class="l03-content-col" style="display: flex; flex-direction: column; justify-content: space-between; gap: 0.3rem;">
          <div class="l05-golden-card" style="padding: 0.35rem 0.6rem;">
            <div class="l05-golden-header" style="font-size: 0.76rem;"><span>📐</span><strong>360&deg; Spatial Scanning Geometry</strong></div>
            <p style="font-size: 0.72rem; line-height: 1.28;">Casts 360 discrete rays across 2&pi; radians (-180&deg; to +180&deg;). Measures distance to the closest intersecting collision bounding box.</p>
          </div>
          <div class="l05-golden-card" style="padding: 0.35rem 0.6rem;">
            <div class="l05-golden-header" style="font-size: 0.76rem;"><span>🎲</span><strong>Gaussian Noise Injection</strong></div>
            <p style="font-size: 0.72rem; line-height: 1.28;">Real laser sensors suffer measurement jitter. Setting Gaussian noise (&sigma; = 0.01m) trains SLAM algorithms to handle noisy industrial data robustly.</p>
          </div>
          <div class="l05-golden-card" style="padding: 0.35rem 0.6rem;">
            <div class="l05-golden-header" style="font-size: 0.76rem;"><span>📡</span><strong>Downstream SLAM Compatibility</strong></div>
            <p style="font-size: 0.72rem; line-height: 1.28;">Outputs standard <code>sensor_msgs/msg/LaserScan</code> directly on <code>/scan</code> with <code>frame_id: laser_frame</code>, fully ready for SLAM Toolbox and Nav2.</p>
          </div>
        </div>
      </div>
    `}),a.push({id:`${t.id}_sec4_camera_plugin`,type:"concept",lessonNum:t.num_str,lessonId:t.id,module:t.module,sectionTitle:"4. The RGB Camera Sensor Plugin",badge:"📷 Optical Sensor Plugin",title:"4. Vision Pipeline: RGB Camera Sensor Plugin (libgazebo_ros_camera.so)",htmlContent:`
      <div class="l03-two-col-layout l09-xml-layout">
        <div class="l03-left-code-col">
          <div class="l03-cmd-card l09-xml-card" style="margin-bottom: 0;">
            <div class="l03-cmd-header"><span class="l03-term-badge">gazebo.xacro</span><strong>Camera Plugin Config</strong></div>
            <pre class="l09-xml-pre"><code class="language-xml">&lt;gazebo reference="camera_link"&gt;
  &lt;sensor name="camera_sensor" type="camera"&gt;
    &lt;update_rate&gt;30.0&lt;/update_rate&gt;
    &lt;camera name="head"&gt;
      &lt;horizontal_fov&gt;1.3962634&lt;/horizontal_fov&gt;
      &lt;image&gt;
        &lt;width&gt;640&lt;/width&gt;&lt;height&gt;480&lt;/height&gt;
        &lt;format&gt;R8G8B8&lt;/format&gt;
      &lt;/image&gt;
      &lt;clip&gt;&lt;near&gt;0.05&lt;/near&gt;&lt;far&gt;15&lt;/far&gt;&lt;/clip&gt;
    &lt;/camera&gt;
    &lt;plugin name="camera_controller" filename="libgazebo_ros_camera.so"&gt;
      &lt;frame_name&gt;camera_optical_frame&lt;/frame_name&gt;
      &lt;min_depth&gt;0.1&lt;/min_depth&gt;
      &lt;max_depth&gt;10.0&lt;/max_depth&gt;
    &lt;/plugin&gt;
  &lt;/sensor&gt;
&lt;/gazebo&gt;</code></pre>
          </div>
        </div>
        <div class="l03-content-col" style="display: flex; flex-direction: column; justify-content: space-between; gap: 0.3rem;">
          <div class="l05-golden-card" style="padding: 0.35rem 0.6rem;">
            <div class="l05-golden-header" style="font-size: 0.76rem;"><span>🖼️</span><strong>Synchronized Dual-Stream Output</strong></div>
            <p style="font-size: 0.72rem; line-height: 1.28;">Publishes synchronized raw pixels on <code>/camera/image_raw</code> and calibration intrinsics (focal length, principal point) on <code>/camera/camera_info</code> at 30 Hz.</p>
          </div>
          <div class="l05-golden-card" style="padding: 0.35rem 0.6rem;">
            <div class="l05-golden-header" style="font-size: 0.76rem;"><span>👁️</span><strong>Optical Coordinate Frame Binding</strong></div>
            <p style="font-size: 0.72rem; line-height: 1.28;">Binds <code>frame_name: camera_optical_frame</code> to align with OpenCV image coordinate conventions (Z forward, X right, Y down), preventing inverted image renders.</p>
          </div>
          <div class="l05-golden-card" style="padding: 0.35rem 0.6rem;">
            <div class="l05-golden-header" style="font-size: 0.76rem;"><span>🤖</span><strong>Downstream AI &amp; Perception</strong></div>
            <p style="font-size: 0.72rem; line-height: 1.28;">Feed camera streams into visual fiducial tag detectors (AprilTag / ArUco), YOLO object detectors, or visual SLAM packages.</p>
          </div>
        </div>
      </div>
    `}),a.push({id:`${t.id}_sec5_sim_bringup`,type:"concept",lessonNum:t.num_str,lessonId:t.id,module:t.module,sectionTitle:"5. Simulation Bringup Launch Pipeline & Entity Spawner",badge:"🚀 Simulation Bringup",title:"5. Simulation Bringup Launch Pipeline & Entity Spawner Execution",htmlContent:`
      <div class="l03-two-col-layout l09-xml-layout">
        <div class="l03-left-code-col">
          <div class="l03-cmd-card l09-xml-card" style="margin-bottom: 0;">
            <div class="l03-cmd-header"><span class="l03-term-badge">sim_world.launch.py</span><strong>Gazebo + Spawner Pipeline</strong></div>
            <pre class="l09-xml-pre"><code class="language-python"># 1. Launch Gazebo Server & Client with World
gazebo = IncludeLaunchDescription(
    PythonLaunchDescriptionSource([gazebo_ros_path, '/gazebo.launch.py']),
    launch_arguments={'world': world_path}.items()
)

# 2. Robot State Publisher (use_sim_time:=True)
rsp = IncludeLaunchDescription(
    PythonLaunchDescriptionSource([rsp_path]),
    launch_arguments={'use_sim_time': 'true'}.items()
)

# 3. Spawn Nexus AMR Entity in Gazebo Physics
spawn_entity = Node(
    package='gazebo_ros',
    executable='spawn_entity.py',
    arguments=['-topic', 'robot_description', '-entity', 'nexus_amr', '-z', '0.1']
)</code></pre>
          </div>
        </div>
        <div class="l03-content-col" style="display: flex; flex-direction: column; justify-content: space-between; gap: 0.3rem;">
          <div class="l05-golden-card" style="padding: 0.35rem 0.6rem;">
            <div class="l05-golden-header" style="font-size: 0.76rem;"><span>📦</span><strong>Dynamic Entity Spawning via CLI</strong></div>
            <p style="font-size: 0.72rem; line-height: 1.28;"><code>spawn_entity.py</code> queries the <code>/robot_description</code> topic published by RSP and injects the robot into Gazebo's physics space at runtime without hardcoding paths.</p>
          </div>
          <div class="l05-golden-card" style="padding: 0.35rem 0.6rem;">
            <div class="l05-golden-header" style="font-size: 0.76rem;"><span>🚀</span><strong>Single Command Bringup</strong></div>
            <p style="font-size: 0.72rem; line-height: 1.28;">Execute: <code>ros2 launch nexus_amr_gazebo sim_world.launch.py</code>. Launches physics simulation, loads warehouse world, spawns AMR, and starts sensors simultaneously.</p>
          </div>
          <div class="l05-golden-card" style="padding: 0.35rem 0.6rem;">
            <div class="l05-golden-header" style="font-size: 0.76rem;"><span>🎮</span><strong>Drive Verification</strong></div>
            <p style="font-size: 0.72rem; line-height: 1.28;">Open a new terminal and run <code>ros2 run teleop_twist_keyboard teleop_twist_keyboard</code> to verify closed-loop wheel motion and odometry tracking.</p>
          </div>
        </div>
      </div>
    `})}function gi(s,t,a){a.push({id:`${t.id}_sec1_sourcing_worlds`,type:"concept",lessonNum:t.num_str,lessonId:t.id,module:t.module,sectionTitle:"1. Sourcing Simulation Worlds: Gazebo Fuel & Open Repositories",badge:"🌐 Simulation World Ecosystem",title:"1. Sourcing Simulation Worlds: Gazebo Fuel Cloud Hub & Open Repositories",htmlContent:`
      <div class="l03-two-col-layout">
        <div class="l03-content-col" style="display: flex; flex-direction: column; justify-content: space-between; gap: 0.35rem;">
          <div class="l05-golden-card" style="padding: 0.4rem 0.65rem;">
            <div class="l05-golden-header" style="font-size: 0.78rem;"><span>🌐</span><strong>Gazebo Fuel Cloud Hub (app.gazebosim.org/fuel)</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.3;">The official cloud repository maintained by Open Robotics. Hosts thousands of ready-to-simulate 3D models (industrial racks, safety barriers, wooden pallets, forklifts) and turnkey factory worlds.</p>
          </div>
          <div class="l05-golden-card" style="padding: 0.4rem 0.65rem;">
            <div class="l05-golden-header" style="font-size: 0.78rem;"><span>🏭</span><strong>AWS RoboMaker &amp; Open-Source World Libraries</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.3;">Industry-standard repositories on GitHub such as <code>aws-robomaker-small-warehouse-world</code>, <code>aws-robomaker-bookstore-world</code>, and Clearpath worlds provide production-grade lighting, textures, and Nav2 navigation corridors.</p>
          </div>
          <div class="l05-golden-card" style="padding: 0.4rem 0.65rem;">
            <div class="l05-golden-header" style="font-size: 0.78rem;"><span>⚡</span><strong>Direct Cloud URI vs Local Caching (~/.gz/fuel)</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.3;">Reference cloud models directly in SDF via <code>&lt;uri&gt;https://fuel.gazebosim.org/1.0/OpenRobotics/models/Warehouse&lt;/uri&gt;</code>. Gazebo auto-caches assets to <code>~/.gz/fuel</code> (or <code>~/.ignition/fuel</code>) for zero-latency offline loading.</p>
          </div>
        </div>
        <div class="l03-content-col" style="display: flex; flex-direction: column; justify-content: center;">
          <div style="background: rgba(15, 23, 42, 0.65); border: 1px solid rgba(56, 189, 248, 0.35); border-radius: 8px; padding: 0.35rem; box-shadow: 0 4px 14px rgba(0,0,0,0.3);">
            <img src="assets/images/gazebo_fuel_world_ecosystem.jpg" alt="Gazebo Fuel Simulation World Ecosystem" style="width: 100%; max-height: 270px; object-fit: contain; border-radius: 6px; display: block;" />
            <div style="margin-top: 0.3rem; font-size: 0.68rem; color: #94a3b8; text-align: center; font-family: monospace;">
              Gazebo Fuel Cloud Hub (app.gazebosim.org/fuel) • AWS RoboMaker Warehouse World • Local Model Cache (~/.gz/fuel) • model:// Resolution
            </div>
          </div>
          <div class="l05-banner-intro" style="margin-top: 0.35rem; font-size: 0.72rem; padding: 0.35rem 0.65rem; border-left: 3px solid #38bdf8;">
            <strong>💡 The Fuel CLI Shortcut:</strong> Run <code>ign fuel download -u "&lt;Fuel_URI&gt;" -v 4</code> (or <code>gz fuel download -u ...</code>) to pre-cache complete environments offline before disconnected field testing.
          </div>
        </div>
      </div>
    `}),a.push({id:`${t.id}_sec2_local_model_pkg`,type:"concept",lessonNum:t.num_str,lessonId:t.id,module:t.module,sectionTitle:"2. Local Model Package Setup & model.config",badge:"📦 Package Architecture",title:"2. Local Model Package Architecture: Directory Structure & model.config Manifest",htmlContent:`
      <div class="l03-two-col-layout l09-xml-layout">
        <div class="l03-left-code-col">
          <div class="l03-cmd-card l09-xml-card" style="margin-bottom: 0;">
            <div class="l03-cmd-header"><span class="l03-term-badge">nexus_amr_gazebo</span><strong>Package Tree &amp; model.config</strong></div>
            <pre class="l09-xml-pre"><code class="language-xml">nexus_amr_gazebo/
├── CMakeLists.txt
├── package.xml
├── worlds/
│   └── warehouse.world       &lt;-- SDF environment
└── models/                   &lt;-- Local model database
    └── warehouse_shelf/
        ├── model.config      &lt;-- Gazebo metadata manifest
        └── model.sdf         &lt;-- Rigid body geometry

&lt;!-- models/warehouse_shelf/model.config --&gt;
&lt;?xml version="1.0"?&gt;
&lt;model&gt;
  &lt;name&gt;warehouse_shelf&lt;/name&gt;
  &lt;version&gt;1.0&lt;/version&gt;
  &lt;sdf version="1.6"&gt;model.sdf&lt;/sdf&gt;
  &lt;author&gt;&lt;name&gt;NavPro AMR Team&lt;/name&gt;&lt;email&gt;dev@navpro.io&lt;/email&gt;&lt;/author&gt;
  &lt;description&gt;Industrial warehouse storage pallet rack&lt;/description&gt;
&lt;/model&gt;</code></pre>
          </div>
        </div>
        <div class="l03-content-col" style="display: flex; flex-direction: column; justify-content: space-between; gap: 0.3rem;">
          <div class="l05-golden-card" style="padding: 0.35rem 0.6rem;">
            <div class="l05-golden-header" style="font-size: 0.76rem;"><span>📁</span><strong>Standardized Simulation Package Layout</strong></div>
            <p style="font-size: 0.72rem; line-height: 1.28;">Colocate proprietary worlds and custom models inside a dedicated <code>&lt;robot_name&gt;_gazebo</code> package with separate <code>worlds/</code> and <code>models/</code> subdirectories.</p>
          </div>
          <div class="l05-golden-card" style="padding: 0.35rem 0.6rem;">
            <div class="l05-golden-header" style="font-size: 0.76rem;"><span>📄</span><strong>The model.config Requirement</strong></div>
            <p style="font-size: 0.72rem; line-height: 1.28;">Gazebo discovers models by reading <code>model.config</code>. Without this XML manifest, Gazebo ignores the directory, causing <code>model://warehouse_shelf</code> resolution to fail.</p>
          </div>
          <div class="l05-golden-card" style="padding: 0.35rem 0.6rem;">
            <div class="l05-golden-header" style="font-size: 0.76rem;"><span>⚙️</span><strong>CMakeLists.txt Directory Installation</strong></div>
            <p style="font-size: 0.72rem; line-height: 1.28;">Install both directories via <code>install(DIRECTORY worlds models DESTINATION share/\${PROJECT_NAME})</code> so <code>colcon build</code> exports assets to the global workspace share path.</p>
          </div>
        </div>
      </div>
    `}),a.push({id:`${t.id}_sec3_model_path_resolution`,type:"concept",lessonNum:t.num_str,lessonId:t.id,module:t.module,sectionTitle:"3. Gazebo Model Path Resolution & Launch Hooks",badge:"🔗 Path Resolution",title:"3. Gazebo Model Path Resolution: package.xml Exports & Launch Environment Hooks",htmlContent:`
      <div class="l03-two-col-layout l09-xml-layout">
        <div class="l03-left-code-col">
          <div class="l03-cmd-card l09-xml-card" style="margin-bottom: 0;">
            <div class="l03-cmd-header"><span class="l03-term-badge">package.xml &amp; launch</span><strong>Path Export &amp; Environment Injection</strong></div>
            <pre class="l09-xml-pre"><code class="language-python">&lt;!-- 1. In package.xml: Register model search path --&gt;
&lt;export&gt;
  &lt;gazebo_ros gazebo_model_path="\${prefix}/models"/&gt;
  &lt;gazebo_ros gazebo_media_path="\${prefix}/worlds"/&gt;
&lt;/export&gt;

# 2. In launch/sim_world.launch.py:
from launch.actions import AppendEnvironmentVariable
from ament_index_python.packages import get_package_share_directory

pkg_share = get_package_share_directory('nexus_amr_gazebo')
models_path = os.path.join(pkg_share, 'models')

# Injects local models into Gazebo search path:
append_model_path = AppendEnvironmentVariable(
    name='GAZEBO_MODEL_PATH', # or GZ_SIM_RESOURCE_PATH
    value=':' + models_path
)</code></pre>
          </div>
        </div>
        <div class="l03-content-col" style="display: flex; flex-direction: column; justify-content: space-between; gap: 0.3rem;">
          <div class="l05-golden-card" style="padding: 0.35rem 0.6rem;">
            <div class="l05-golden-header" style="font-size: 0.76rem;"><span>🔍</span><strong>How Gazebo Resolves model:// URIs</strong></div>
            <p style="font-size: 0.72rem; line-height: 1.28;">When an SDF world specifies <code>&lt;uri&gt;model://warehouse_shelf&lt;/uri&gt;</code>, Gazebo iterates through paths listed in <code>GAZEBO_MODEL_PATH</code> (Classic) or <code>GZ_SIM_RESOURCE_PATH</code> (Harmonic) to locate the asset.</p>
          </div>
          <div class="l05-golden-card" style="padding: 0.35rem 0.6rem;">
            <div class="l05-golden-header" style="font-size: 0.76rem;"><span>🔄</span><strong>Dual Registration Strategy</strong></div>
            <p style="font-size: 0.72rem; line-height: 1.28;">Using <code>package.xml &lt;export&gt;</code> registers paths for <code>gazebo_ros</code> CLI, while <code>AppendEnvironmentVariable</code> in launch files ensures runtime resolution in isolated subshells and daemon processes.</p>
          </div>
          <div class="l05-golden-card" style="padding: 0.35rem 0.6rem;">
            <div class="l05-golden-header" style="font-size: 0.76rem;"><span>🚀</span><strong>Zero-Hardcoding Portability Rule</strong></div>
            <p style="font-size: 0.72rem; line-height: 1.28;">Eliminates fragile user-specific paths like <code>/home/user/...</code>. The simulation workspace runs identically across developer laptops, CI/CD runners, and Docker containers.</p>
          </div>
        </div>
      </div>
    `}),a.push({id:`${t.id}_sec4_sdf_anatomy`,type:"concept",lessonNum:t.num_str,lessonId:t.id,module:t.module,sectionTitle:"4. Anatomy of an SDF World File",badge:"🌐 SDF World Architecture",title:"4. Anatomy of an SDF World: Environment Hierarchy & Static Elements",htmlContent:`
      <div class="l03-two-col-layout l09-xml-layout">
        <div class="l03-left-code-col">
          <div class="l03-cmd-card l09-xml-card" style="margin-bottom: 0;">
            <div class="l03-cmd-header"><span class="l03-term-badge">warehouse.world</span><strong>SDF Root Hierarchy</strong></div>
            <pre class="l09-xml-pre"><code class="language-xml">&lt;sdf version="1.6"&gt;
  &lt;world name="warehouse_world"&gt;
    &lt;!-- Global Directional Lighting --&gt;
    &lt;include&gt;&lt;uri&gt;model://sun&lt;/uri&gt;&lt;/include&gt;

    &lt;!-- Infinite Ground Plane with Friction --&gt;
    &lt;include&gt;&lt;uri&gt;model://ground_plane&lt;/uri&gt;&lt;/include&gt;

    &lt;!-- Physics Solver Parameters --&gt;
    &lt;physics type="ode"&gt;
      &lt;max_step_size&gt;0.001&lt;/max_step_size&gt;
      &lt;real_time_update_rate&gt;1000&lt;/real_time_update_rate&gt;
    &lt;/physics&gt;

    &lt;!-- Custom Local Warehouse Shelving Rack --&gt;
    &lt;include&gt;
      &lt;uri&gt;model://warehouse_shelf&lt;/uri&gt;
      &lt;pose&gt;2.5 1.0 0 0 0 0&lt;/pose&gt;
    &lt;/include&gt;
  &lt;/world&gt;
&lt;/sdf&gt;</code></pre>
          </div>
        </div>
        <div class="l03-content-col" style="display: flex; flex-direction: column; justify-content: space-between; gap: 0.3rem;">
          <div class="l05-golden-card" style="padding: 0.35rem 0.6rem;">
            <div class="l05-golden-header" style="font-size: 0.76rem;"><span>🌐</span><strong>URDF vs. SDF: Fundamental Difference</strong></div>
            <p style="font-size: 0.72rem; line-height: 1.28;">URDF describes a single robot kinematic tree. SDF (Simulation Description Format) describes entire environments: gravity, sky, lighting, multiple robots, and static infrastructure.</p>
          </div>
          <div class="l05-golden-card" style="padding: 0.35rem 0.6rem;">
            <div class="l05-golden-header" style="font-size: 0.76rem;"><span>☀️</span><strong>Directional Sun &amp; Shadows</strong></div>
            <p style="font-size: 0.72rem; line-height: 1.28;">The <code>sun</code> model provides raycasting light and shadows essential for optical camera testing and vision-based obstacle avoidance.</p>
          </div>
          <div class="l05-golden-card" style="padding: 0.35rem 0.6rem;">
            <div class="l05-golden-header" style="font-size: 0.76rem;"><span>🧱</span><strong>Ground Plane Contact Friction</strong></div>
            <p style="font-size: 0.72rem; line-height: 1.28;">Defines contact friction coefficients (<code>mu1</code>, <code>mu2</code>). Tuning ground friction ensures simulated rubber drive wheels don't spin out during acceleration.</p>
          </div>
        </div>
      </div>
    `}),a.push({id:`${t.id}_sec5_solver_tuning`,type:"concept",lessonNum:t.num_str,lessonId:t.id,module:t.module,sectionTitle:"5. Physics Solver Tuning for Robotics",badge:"⚙️ Physics Engine Tuning",title:"5. Physics Solver Tuning: Balancing Simulation Fidelity & Real-Time Performance",htmlContent:`
      <div class="l03-two-col-layout l09-xml-layout">
        <div class="l03-left-code-col">
          <div class="l03-cmd-card l09-xml-card" style="margin-bottom: 0;">
            <div class="l03-cmd-header"><span class="l03-term-badge">warehouse.world</span><strong>Tuned ODE Physics Parameters</strong></div>
            <pre class="l09-xml-pre"><code class="language-xml">&lt;physics type="ode"&gt;
  &lt;max_step_size&gt;0.001&lt;/max_step_size&gt;
  &lt;real_time_update_rate&gt;1000&lt;/real_time_update_rate&gt;
  &lt;ode&gt;
    &lt;solver&gt;
      &lt;type&gt;quick&lt;/type&gt;
      &lt;iters&gt;50&lt;/iters&gt;
      &lt;sor&gt;1.3&lt;/sor&gt;
    &lt;/solver&gt;
    &lt;constraints&gt;
      &lt;cfm&gt;0.00001&lt;/cfm&gt;
      &lt;erp&gt;0.2&lt;/erp&gt;
      &lt;contact_max_correcting_vel&gt;100.0&lt;/contact_max_correcting_vel&gt;
      &lt;contact_surface_layer&gt;0.001&lt;/contact_surface_layer&gt;
    &lt;/constraints&gt;
  &lt;/ode&gt;
&lt;/physics&gt;</code></pre>
          </div>
        </div>
        <div class="l03-content-col" style="display: flex; flex-direction: column; justify-content: space-between; gap: 0.3rem;">
          <div class="l05-golden-card" style="padding: 0.35rem 0.6rem;">
            <div class="l05-golden-header" style="font-size: 0.76rem;"><span>⚡</span><strong>iters: 50 Solver Iterations</strong></div>
            <p style="font-size: 0.72rem; line-height: 1.28;">Higher iterations (50 vs default 20) resolve constraint equations accurately, completely preventing AMR wheels from jittering or penetrating through floor meshes.</p>
          </div>
          <div class="l05-golden-card" style="padding: 0.35rem 0.6rem;">
            <div class="l05-golden-header" style="font-size: 0.76rem;"><span>📈</span><strong>sor: 1.3 (Successive Over-Relaxation)</strong></div>
            <p style="font-size: 0.72rem; line-height: 1.28;">Accelerates convergence of the iterative LCP solver, reducing CPU overhead while preserving numerical stability under heavy dynamic loads.</p>
          </div>
          <div class="l05-golden-card" style="padding: 0.35rem 0.6rem;">
            <div class="l05-golden-header" style="font-size: 0.76rem;"><span>🎯</span><strong>Target RTF = 1.0 (Real-Time Factor)</strong></div>
            <p style="font-size: 0.72rem; line-height: 1.28;">Guarantees that 1.0 second of simulation time equals 1.0 second of real world time, preserving accurate ROS 2 timer frequencies and sensor rates.</p>
          </div>
        </div>
      </div>
    `}),a.push({id:`${t.id}_sec6_warehouse_elements`,type:"concept",lessonNum:t.num_str,lessonId:t.id,module:t.module,sectionTitle:"6. Constructing Warehouse Elements",badge:"🏭 Factory Assets",title:"6. Constructing Warehouse Geometry: Corridors, Shelving Racks & Collision Hulls",htmlContent:`
      <div class="l03-two-col-layout l09-xml-layout">
        <div class="l03-left-code-col">
          <div class="l03-cmd-card l09-xml-card" style="margin-bottom: 0;">
            <div class="l03-cmd-header"><span class="l03-term-badge">warehouse_shelf.sdf</span><strong>Static Warehouse Asset Model</strong></div>
            <pre class="l09-xml-pre"><code class="language-xml">&lt;model name="warehouse_shelf"&gt;
  &lt;static&gt;true&lt;/static&gt;
  &lt;link name="shelf_link"&gt;
    &lt;visual name="visual"&gt;
      &lt;geometry&gt;
        &lt;box&gt;&lt;size&gt;2.0 0.8 2.2&lt;/size&gt;&lt;/box&gt;
      &lt;/geometry&gt;
      &lt;material&gt;&lt;ambient&gt;0.2 0.2 0.7 1&lt;/ambient&gt;&lt;/material&gt;
    &lt;/visual&gt;
    &lt;collision name="collision"&gt;
      &lt;geometry&gt;
        &lt;box&gt;&lt;size&gt;2.0 0.8 2.2&lt;/size&gt;&lt;/box&gt;
      &lt;/geometry&gt;
    &lt;/collision&gt;
  &lt;/link&gt;
&lt;/model&gt;</code></pre>
          </div>
        </div>
        <div class="l03-content-col" style="display: flex; flex-direction: column; justify-content: space-between; gap: 0.3rem;">
          <div class="l05-golden-card" style="padding: 0.35rem 0.6rem;">
            <div class="l05-golden-header" style="font-size: 0.76rem;"><span>🔒</span><strong>The static=true Performance Rule</strong></div>
            <p style="font-size: 0.72rem; line-height: 1.28;">Always mark permanent walls, storage racks, and structural pillars as <code>&lt;static&gt;true&lt;/static&gt;</code>. This removes them from ODE dynamic force calculations, saving massive CPU cycles.</p>
          </div>
          <div class="l05-golden-card" style="padding: 0.35rem 0.6rem;">
            <div class="l05-golden-header" style="font-size: 0.76rem;"><span>📦</span><strong>Modular Storage Rack Dimensions</strong></div>
            <p style="font-size: 0.72rem; line-height: 1.28;">Standardize aisles to 2.5m width and rack depths to 1.0m to reflect industrial automated logistics facilities, providing realistic clearance for 0.4m AMRs.</p>
          </div>
          <div class="l05-golden-card" style="padding: 0.35rem 0.6rem;">
            <div class="l05-golden-header" style="font-size: 0.76rem;"><span>📡</span><strong>LiDAR Ray Reflection Realism</strong></div>
            <p style="font-size: 0.72rem; line-height: 1.28;">Ensure collision bounding boxes match visual boundaries exactly so simulated 2D LiDAR raycasts match physical wall contours precisely.</p>
          </div>
        </div>
      </div>
    `}),a.push({id:`${t.id}_sec7_viewport_camera`,type:"concept",lessonNum:t.num_str,lessonId:t.id,module:t.module,sectionTitle:"7. Viewport Camera Positioning & Spawning",badge:"🎥 Developer Viewport",title:"7. Developer Experience: Viewport Camera Presets & Dynamic Asset Spawning",htmlContent:`
      <div class="l03-two-col-layout l09-xml-layout">
        <div class="l03-left-code-col">
          <div class="l03-cmd-card l09-xml-card" style="margin-bottom: 0;">
            <div class="l03-cmd-header"><span class="l03-term-badge">warehouse.world</span><strong>GUI Camera Preset</strong></div>
            <pre class="l09-xml-pre"><code class="language-xml">&lt;gui fullscreen="0"&gt;
  &lt;camera name="user_camera"&gt;
    &lt;!-- X Y Z Roll Pitch Yaw --&gt;
    &lt;pose&gt;-6.0 -6.0 8.0 0.0 0.85 0.785&lt;/pose&gt;
    &lt;view_controller&gt;orbit&lt;/view_controller&gt;
  &lt;/camera&gt;
&lt;/gui&gt;</code></pre>
          </div>
        </div>
        <div class="l03-content-col" style="display: flex; flex-direction: column; justify-content: space-between; gap: 0.3rem;">
          <div class="l05-golden-card" style="padding: 0.35rem 0.6rem;">
            <div class="l05-golden-header" style="font-size: 0.76rem;"><span>🎥</span><strong>Isometric Overhead Camera View</strong></div>
            <p style="font-size: 0.72rem; line-height: 1.28;">Setting a default camera pose (Z=8m, pitch=0.85 rad) positions the Gazebo viewport in an isometric perspective over the whole facility immediately upon launch.</p>
          </div>
          <div class="l05-golden-card" style="padding: 0.35rem 0.6rem;">
            <div class="l05-golden-header" style="font-size: 0.76rem;"><span>🔄</span><strong>Spawning Dynamic Obstacles</strong></div>
            <p style="font-size: 0.72rem; line-height: 1.28;">Spawn dynamic pallets and temporary barriers on the fly using the CLI:<br/><code>ros2 run gazebo_ros spawn_entity.py -entity pallet_1 -file pallet.sdf -x 2.5 -y 1.0</code></p>
          </div>
          <div class="l05-golden-card" style="padding: 0.35rem 0.6rem;">
            <div class="l05-golden-header" style="font-size: 0.76rem;"><span>🏭</span><strong>Production Verification Ready</strong></div>
            <p style="font-size: 0.72rem; line-height: 1.28;">A complete custom world provides the realistic spatial corridors needed for mapping with SLAM Toolbox and autonomous navigation with Nav2.</p>
          </div>
        </div>
      </div>
    `})}function ui(s,t,a){a.push({id:`${t.id}_sec_title_localization`,type:"section_title",lessonNum:t.num_str,lessonId:t.id,module:t.module,sectionTitle:"Part I: Localization",badge:"📍 Part I",title:"Localization",titleClass:"text-localization",description:"Estimating the robot pose relative to a known environmental map using sensor observations and wheel odometry."}),a.push({id:`${t.id}_sec_localization_definition`,type:"concept",lessonNum:t.num_str,lessonId:t.id,module:t.module,sectionTitle:"Localization Definition",badge:"📍 Core Definition",title:"Mobile Robot Localization: Problem Statement",htmlContent:`
      <div class="l03-two-col-layout">
        <div class="l03-content-col" style="display: flex; flex-direction: column; justify-content: center; gap: 0.45rem;">
          <div class="l05-golden-card" style="padding: 0.45rem 0.7rem;">
            <div class="l05-golden-header" style="font-size: 0.8rem;"><span>❓</span><strong>The Fundamental Question</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.32;"><em>"Where is the robot relative to the world coordinate frame?"</em> Given a static environment map <code>m</code> and sensor readings <code>z_{1:t}</code>, compute pose <code>(x, y, &theta;) &isin; SE(2)</code>.</p>
          </div>
          <div class="l05-golden-card" style="padding: 0.45rem 0.7rem;">
            <div class="l05-golden-header" style="font-size: 0.8rem;"><span>🔄</span><strong>Odometry vs. Perception Fusion</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.32;">Wheel encoders measure motion rapidly at 50 Hz but suffer from cumulative integration drift. Exteroceptive sensors (2D LiDAR) correct this drift against pre-mapped walls.</p>
          </div>
          <div class="l05-golden-card" style="padding: 0.45rem 0.7rem;">
            <div class="l05-golden-header" style="font-size: 0.8rem;"><span>🎯</span><strong>Belief Probability Distribution</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.32;">Because sensors and actuators contain physical noise, the robot maintains a belief distribution <code>bel(x_t) = p(x_t | z_{1:t}, u_{1:t})</code> rather than a single deterministic coordinate.</p>
          </div>
        </div>
        <div class="l03-content-col" style="display: flex; flex-direction: column; justify-content: center; gap: 0.45rem;">
          <div style="background: var(--bg-surface); border: 1px solid var(--border-color); border-radius: 10px; padding: 0.45rem; box-shadow: 0 4px 14px rgba(0,0,0,0.12); display: flex; flex-direction: column; align-items: center; justify-content: center;">
            <img src="assets/images/localization_concept_pose_estimation.png" alt="Robot Localization in Given Map" style="width: 100%; max-height: 240px; object-fit: contain; border-radius: 6px; display: block; margin: 0 auto;" />
            <div style="margin-top: 0.35rem; font-size: 0.68rem; color: var(--text-muted); text-align: center; font-family: var(--font-sans);">
              Localization: Estimate robot pose (x, y, &theta;) in the pre-mapped environment
            </div>
          </div>
          <div class="l05-banner-intro" style="margin: 0; font-size: 0.72rem; padding: 0.38rem 0.65rem; border-left: 3px solid #eab308;">
            <strong>💡 Ground Truth:</strong> Without accurate localization, all downstream Nav2 costmap alignment and trajectory rollouts immediately fail.
          </div>
        </div>
      </div>
    `}),a.push({id:`${t.id}_sec_localization_algorithms`,type:"concept",lessonNum:t.num_str,lessonId:t.id,module:t.module,sectionTitle:"Localization Algorithms",badge:"🤖 Localization Paradigms",title:"Different Types of Localization Algorithms",htmlContent:`
      <div class="l03-two-col-layout">
        <div class="l03-content-col" style="display: flex; flex-direction: column; justify-content: center; gap: 0.45rem;">
          <div class="l05-golden-card" style="padding: 0.45rem 0.7rem;">
            <div class="l05-golden-header" style="font-size: 0.8rem;"><span>1️⃣</span><strong>Extended Kalman Filter (EKF Localization)</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.32;">Represents pose as a unimodal Gaussian belief <code>N(&mu;, &Sigma;)</code>. Linearizes non-linear motion models using Taylor Jacobians. Fast &amp; efficient, but fails under multimodal ambiguity.</p>
          </div>
          <div class="l05-golden-card" style="padding: 0.45rem 0.7rem;">
            <div class="l05-golden-header" style="font-size: 0.8rem;"><span>2️⃣</span><strong>Markov Localization</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.32;">Discretizes continuous state space into a 3D probabilistic lattice grid <code>(x, y, &theta;)</code>. Evaluates recursive Bayesian updates across all grid cells. Capable of global localization.</p>
          </div>
        </div>
        <div class="l03-content-col" style="display: flex; flex-direction: column; justify-content: center; gap: 0.45rem;">
          <div class="l05-golden-card" style="padding: 0.45rem 0.7rem;">
            <div class="l05-golden-header" style="font-size: 0.8rem;"><span>3️⃣</span><strong>Grid Localization</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.32;">A variant of Markov localization storing probabilities in spatial histogram cells. High resolution demands extreme memory; coarse resolution introduces significant discretization errors.</p>
          </div>
          <div class="l05-golden-card" style="padding: 0.45rem 0.7rem; border-left: 3px solid #10b981;">
            <div class="l05-golden-header" style="font-size: 0.8rem; color: #10b981;"><span>4️⃣</span><strong>Monte Carlo Localization (MCL / Particle Filter)</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.32;">Represents arbitrary multimodal probability distributions using a cloud of discrete particles. <strong>AMCL</strong> dynamically adapts particle count (KLD sampling) to balance accuracy and CPU load.</p>
          </div>
        </div>
      </div>
      <div class="l05-banner-intro" style="margin-top: 0.45rem; font-size: 0.72rem; padding: 0.35rem 0.65rem; border-left: 3px solid #10b981;">
        <strong>🏆 Industry Standard:</strong> ROS 2 Nav2 standardizes on <strong>AMCL</strong> (Adaptive Monte Carlo Localization) for robust 2D LiDAR warehouse localization.
      </div>
    `}),a.push({id:`${t.id}_sec_amcl_measurement_rep`,type:"concept",lessonNum:t.num_str,lessonId:t.id,module:t.module,sectionTitle:"AMCL Measurement Model",badge:"📡 Measurement Model",title:"Measurement Representation: LiDAR Beam Model & Raycasting",htmlContent:`
      <div class="l03-two-col-layout">
        <div class="l03-content-col" style="display: flex; flex-direction: column; justify-content: center; gap: 0.45rem;">
          <div class="l05-golden-card" style="padding: 0.45rem 0.7rem;">
            <div class="l05-golden-header" style="font-size: 0.8rem;"><span>📡</span><strong>LiDAR Raycast Simulation</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.32;">For each candidate particle pose, AMCL simulates laser range returns <code>z_t^{k*}</code> by casting virtual rays through the occupancy grid map until hitting occupied cells.</p>
          </div>
          <div class="l05-golden-card" style="padding: 0.45rem 0.7rem;">
            <div class="l05-golden-header" style="font-size: 0.8rem;"><span>⚖️</span><strong>Likelihood Weighting p(z_t | x_t, m)</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.32;">AMCL compares the actual physical range <code>z_t^k</code> against expected range <code>z_t^{k*}</code> using a Gaussian likelihood function. Particles aligning with real walls get high weights.</p>
          </div>
          <div class="l05-golden-card" style="padding: 0.45rem 0.7rem;">
            <div class="l05-golden-header" style="font-size: 0.8rem;"><span>🛡️</span><strong>Sensor Noise Robustness</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.32;">The measurement model accounts for four noise phenomena: Gaussian beam error, unexpected dynamic obstacles (humans), max-range specular dropouts, and random sensor noise.</p>
          </div>
        </div>
        <div class="l03-content-col" style="display: flex; flex-direction: column; justify-content: center; gap: 0.45rem;">
          <div style="background: var(--bg-surface); border: 1px solid var(--border-color); border-radius: 10px; padding: 0.45rem; box-shadow: 0 4px 14px rgba(0,0,0,0.12); display: flex; flex-direction: column; align-items: center; justify-content: center;">
            <img src="assets/images/amcl_measurement_representation.png" alt="AMCL Measurement Representation" style="width: 100%; max-height: 240px; object-fit: contain; border-radius: 6px; display: block; margin: 0 auto;" />
            <div style="margin-top: 0.35rem; font-size: 0.68rem; color: var(--text-muted); text-align: center; font-family: var(--font-sans);">
              AMCL Measurement Representation: Virtual beam raycast matching map walls to evaluate likelihood
            </div>
          </div>
          <div class="l05-banner-intro" style="margin: 0; font-size: 0.72rem; padding: 0.38rem 0.65rem; border-left: 3px solid #eab308;">
            <strong>💡 Likelihood Match:</strong> When physical laser ranges match simulated raycasts across all 360 degrees, particle importance weight reaches its maximum value!
          </div>
        </div>
      </div>
    `}),a.push({id:`${t.id}_sec1_amcl_step1_uniform`,type:"concept",lessonNum:t.num_str,lessonId:t.id,module:t.module,sectionTitle:"AMCL Step 1",badge:"🎲 AMCL Step 1 / 4",title:"AMCL Step 1: Global Uniform Particle Distribution (Zero Prior Pose)",htmlContent:`
      <div class="l03-two-col-layout">
        <div class="l03-content-col" style="display: flex; flex-direction: column; justify-content: center; gap: 0.45rem;">
          <div class="l05-golden-card" style="padding: 0.45rem 0.7rem;">
            <div class="l05-golden-header" style="font-size: 0.8rem;"><span>🌐</span><strong>Global Pose Uncertainty</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.32;">When the robot starts with zero prior pose knowledge, AMCL initializes particles uniformly across all reachable free space in the map.</p>
          </div>
          <div class="l05-golden-card" style="padding: 0.45rem 0.7rem;">
            <div class="l05-golden-header" style="font-size: 0.8rem;"><span>🧭</span><strong>Random Heading Hypotheses</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.32;">Each particle is assigned random coordinates <code>(x, y)</code> and a random heading <code>&theta; &isin; [-&pi;, +&pi;]</code>, modeling equal initial likelihood everywhere.</p>
          </div>
          <div class="l05-golden-card" style="padding: 0.45rem 0.7rem;">
            <div class="l05-golden-header" style="font-size: 0.8rem;"><span>🎲</span><strong>Monte Carlo Sampling</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.32;">Instead of tracking complex non-linear probability equations analytically, AMCL uses discrete particle samples to approximate arbitrary multimodal distributions.</p>
          </div>
        </div>
        <div class="l03-content-col" style="display: flex; flex-direction: column; justify-content: center; gap: 0.45rem;">
          <div style="background: var(--bg-surface); border: 1px solid var(--border-color); border-radius: 10px; padding: 0.45rem; box-shadow: 0 4px 14px rgba(0,0,0,0.12); display: flex; flex-direction: column; align-items: center; justify-content: center;">
            <img src="assets/images/amcl_step1_uniform_particles.png" alt="AMCL Step 1: Uniform Particle Distribution" style="width: 100%; max-height: 240px; object-fit: contain; border-radius: 6px; display: block; margin: 0 auto;" />
            <div style="margin-top: 0.35rem; font-size: 0.68rem; color: var(--text-muted); text-align: center; font-family: var(--font-sans);">
              AMCL Initial State: Red particles with orientation arrows uniformly scattered across the apartment
            </div>
          </div>
          <div class="l05-banner-intro" style="margin: 0; font-size: 0.72rem; padding: 0.38rem 0.65rem; border-left: 3px solid #eab308;">
            <strong>💡 Initial State:</strong> Every particle carries an equal initial weight: <code>w_0 = 1 / N_particles</code>.
          </div>
        </div>
      </div>
    `}),a.push({id:`${t.id}_sec1_amcl_step2_state_vector`,type:"concept",lessonNum:t.num_str,lessonId:t.id,module:t.module,sectionTitle:"AMCL Step 2",badge:"📐 AMCL Step 2 / 4",title:"AMCL Step 2: Anatomy of the Particle State Vector",htmlContent:`
      <div class="l03-two-col-layout">
        <div class="l03-content-col" style="display: flex; flex-direction: column; justify-content: center; gap: 0.45rem;">
          <div class="l05-golden-card" style="padding: 0.45rem 0.7rem;">
            <div class="l05-golden-header" style="font-size: 0.8rem;"><span>📐</span><strong>Mathematical Formulation</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.32;">Each particle <code>i</code> represents a discrete hypothesis of robot pose: <code>S_t^{[i]} = &lang; x^{[i]}, y^{[i]}, &theta;^{[i]}, w^{[i]} &rang;</code>.</p>
          </div>
          <div class="l05-golden-card" style="padding: 0.45rem 0.7rem;">
            <div class="l05-golden-header" style="font-size: 0.8rem;"><span>⚖️</span><strong>Importance Weight (w)</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.32;">Weight <code>w^{[i]}</code> is proportional to likelihood that the actual sensor scan matches what would be observed if robot were at that pose: <code>w^{[i]} &prop; p(z_t | x_t^{[i]}, m)</code>.</p>
          </div>
          <div class="l05-golden-card" style="padding: 0.45rem 0.7rem;">
            <div class="l05-golden-header" style="font-size: 0.8rem;"><span>⚡</span><strong>Normalizing Property</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.32;">Across all particles in the filter cloud, total weight sums to unity: <code>&sum;_{i=1}^{N} w^{[i]} = 1</code>.</p>
          </div>
        </div>
        <div class="l03-content-col" style="display: flex; flex-direction: column; justify-content: center; gap: 0.45rem;">
          <div style="background: var(--bg-surface); border: 1px solid var(--border-color); border-radius: 10px; padding: 0.45rem; box-shadow: 0 4px 14px rgba(0,0,0,0.12); display: flex; flex-direction: column; align-items: center; justify-content: center;">
            <img src="assets/images/amcl_step2_particle_anatomy.png" alt="AMCL Step 2: Particle Anatomy" style="width: 100%; max-height: 240px; object-fit: contain; border-radius: 6px; display: block; margin: 0 auto;" />
            <div style="margin-top: 0.35rem; font-size: 0.68rem; color: var(--text-muted); text-align: center; font-family: var(--font-sans);">
              Particle State Vector: Hypothesized (x, y) coordinate, heading &theta;, and importance weight w
            </div>
          </div>
          <div class="l05-banner-intro" style="margin: 0; font-size: 0.72rem; padding: 0.38rem 0.65rem; border-left: 3px solid #eab308;">
            <strong>💡 Odometry Frame:</strong> Particle coordinates reside in the global <code>map</code> frame, eliminating dead-reckoning drift.
          </div>
        </div>
      </div>
    `}),a.push({id:`${t.id}_sec1_amcl_step3_motion_sensor`,type:"concept",lessonNum:t.num_str,lessonId:t.id,module:t.module,sectionTitle:"AMCL Step 3",badge:"⚖️ AMCL Step 3 / 4",title:"AMCL Step 3: Motion Prediction & Measurement Weight Filtering",htmlContent:`
      <div class="l03-two-col-layout">
        <div class="l03-content-col" style="display: flex; flex-direction: column; justify-content: center; gap: 0.45rem;">
          <div class="l05-golden-card" style="padding: 0.45rem 0.7rem;">
            <div class="l05-golden-header" style="font-size: 0.8rem;"><span>🚀</span><strong>Phase A: Motion Model Prediction</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.32;">When the robot drives forward, each particle is moved according to the odometry displacement plus calibrated Gaussian noise: <code>x_t^{[i]} ~ p(x_t | u_t, x_{t-1}^{[i]})</code>.</p>
          </div>
          <div class="l05-golden-card" style="padding: 0.45rem 0.7rem;">
            <div class="l05-golden-header" style="font-size: 0.8rem;"><span>🔍</span><strong>Phase B: Sensor Model Correction</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.32;">For each particle, a simulated LiDAR scan is compared against the actual physical laser scan. Particles that match real wall contours receive high weights.</p>
          </div>
          <div class="l05-golden-card" style="padding: 0.45rem 0.7rem;">
            <div class="l05-golden-header" style="font-size: 0.8rem;"><span>🗑️</span><strong>Eliminating Infeasible Poses</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.32;">Particles predicting walls inside open corridors receive weights near zero (faded/eliminated).</p>
          </div>
        </div>
        <div class="l03-content-col" style="display: flex; flex-direction: column; justify-content: center; gap: 0.45rem;">
          <div style="background: var(--bg-surface); border: 1px solid var(--border-color); border-radius: 10px; padding: 0.45rem; box-shadow: 0 4px 14px rgba(0,0,0,0.12); display: flex; flex-direction: column; align-items: center; justify-content: center;">
            <img src="assets/images/amcl_step3_motion_and_sensor_update.png" alt="AMCL Step 3: Motion and Sensor Update" style="width: 100%; max-height: 240px; object-fit: contain; border-radius: 6px; display: block; margin: 0 auto;" />
            <div style="margin-top: 0.35rem; font-size: 0.68rem; color: var(--text-muted); text-align: center; font-family: var(--font-sans);">
              Measurement Update: Particles aligned with walls turn green (high weight); mismatched particles fade away
            </div>
          </div>
          <div class="l05-banner-intro" style="margin: 0; font-size: 0.72rem; padding: 0.38rem 0.65rem; border-left: 3px solid #eab308;">
            <strong>💡 Convergence Indicator:</strong> As the robot travels through corridors, particle cloud spread shrinks rapidly!
          </div>
        </div>
      </div>
    `}),a.push({id:`${t.id}_sec1_amcl_step4_resampling`,type:"concept",lessonNum:t.num_str,lessonId:t.id,module:t.module,sectionTitle:"AMCL Step 4",badge:"🎯 AMCL Step 4 / 4",title:"AMCL Step 4: Resampling & Pose Convergence",htmlContent:`
      <div class="l03-two-col-layout">
        <div class="l03-content-col" style="display: flex; flex-direction: column; justify-content: center; gap: 0.45rem;">
          <div class="l05-golden-card" style="padding: 0.45rem 0.7rem;">
            <div class="l05-golden-header" style="font-size: 0.8rem;"><span>🎡</span><strong>Roulette Wheel Resampling</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.32;">Particles are drawn with replacement proportional to their weights. High-weight particles multiply into identical copies; low-weight particles die off.</p>
          </div>
          <div class="l05-golden-card" style="padding: 0.45rem 0.7rem;">
            <div class="l05-golden-header" style="font-size: 0.8rem;"><span>🎯</span><strong>Tight Particle Cluster</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.32;">After 2-3 motion cycles, the entire particle population collapses into a tight, dense cluster centered on true robot position.</p>
          </div>
          <div class="l05-golden-card" style="padding: 0.45rem 0.7rem;">
            <div class="l05-golden-header" style="font-size: 0.8rem;"><span>📉</span><strong>KLD-Sampling Efficiency</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.32;">AMCL reduces active particle count from 2,000 down to 200 once converged, slashing CPU overhead to &lt; 5% on typical embedded ARM processors.</p>
          </div>
        </div>
        <div class="l03-content-col" style="display: flex; flex-direction: column; justify-content: center; gap: 0.45rem;">
          <div style="background: var(--bg-surface); border: 1px solid var(--border-color); border-radius: 10px; padding: 0.45rem; box-shadow: 0 4px 14px rgba(0,0,0,0.12); display: flex; flex-direction: column; align-items: center; justify-content: center;">
            <img src="assets/images/amcl_step4_resampling_convergence.png" alt="AMCL Step 4: Resampling and Convergence" style="width: 100%; max-height: 240px; object-fit: contain; border-radius: 6px; display: block; margin: 0 auto;" />
            <div style="margin-top: 0.35rem; font-size: 0.68rem; color: var(--text-muted); text-align: center; font-family: var(--font-sans);">
              Pose Convergence: Particles tightly grouped at actual robot location with orientation aligned
            </div>
          </div>
          <div class="l05-banner-intro" style="margin: 0; font-size: 0.72rem; padding: 0.38rem 0.65rem; border-left: 3px solid #10b981;">
            <strong>💡 Estimated Pose Output:</strong> The published <code>/amcl_pose</code> is the weighted spatial mean of this tight particle cluster.
          </div>
        </div>
      </div>
    `}),a.push({id:`${t.id}_sec2_challenge_tracking`,type:"concept",lessonNum:t.num_str,lessonId:t.id,module:t.module,sectionTitle:"Challenge: Position Tracking",badge:"⚠️ Localization Challenge 1",title:"Localization Challenges: Position Tracking in Cluttered Warehouses",htmlContent:`
      <div class="l03-two-col-layout">
        <div class="l03-content-col" style="display: flex; flex-direction: column; justify-content: center; gap: 0.45rem;">
          <div class="l05-golden-card" style="padding: 0.45rem 0.7rem;">
            <div class="l05-golden-header" style="font-size: 0.8rem;"><span>📍</span><strong>Local Tracking Condition</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.32;">The initial robot pose is known with reasonable certainty (e.g., undocked from charging station). Uncertainty remains local and bounded.</p>
          </div>
          <div class="l05-golden-card" style="padding: 0.45rem 0.7rem;">
            <div class="l05-golden-header" style="font-size: 0.8rem;"><span>🌀</span><strong>Wheel Slip & Inertial Drift</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.32;">Sudden acceleration on dusty warehouse floors causes wheel slippage. Odometry drifts quickly unless LiDAR range updates correct pose continuously.</p>
          </div>
          <div class="l05-golden-card" style="padding: 0.45rem 0.7rem;">
            <div class="l05-golden-header" style="font-size: 0.8rem;"><span>🎯</span><strong>Compact Particle Maintenance</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.32;">Particles only need to cover a small Gaussian region around current pose estimate, allowing high frequency (20 Hz) execution.</p>
          </div>
        </div>
        <div class="l03-content-col" style="display: flex; flex-direction: column; justify-content: center; gap: 0.45rem;">
          <div style="background: var(--bg-surface); border: 1px solid var(--border-color); border-radius: 10px; padding: 0.45rem; box-shadow: 0 4px 14px rgba(0,0,0,0.12); display: flex; flex-direction: column; align-items: center; justify-content: center;">
            <img src="assets/images/localization_position_tracking.png" alt="Position Tracking Challenge" style="width: 100%; max-height: 240px; object-fit: contain; border-radius: 6px; display: block; margin: 0 auto;" />
            <div style="margin-top: 0.35rem; font-size: 0.68rem; color: var(--text-muted); text-align: center; font-family: var(--font-sans);">
              Position Tracking: Bounded uncertainty ellipse tracking robot trajectory through corridors
            </div>
          </div>
          <div class="l05-banner-intro" style="margin: 0; font-size: 0.72rem; padding: 0.38rem 0.65rem; border-left: 3px solid #eab308;">
            <strong>💡 Tuning Key:</strong> Set <code>update_min_d: 0.1</code> and <code>update_min_a: 0.1</code> in <code>amcl.yaml</code> to trigger filter updates during movement.
          </div>
        </div>
      </div>
    `}),a.push({id:`${t.id}_sec2_challenge_kidnapped`,type:"concept",lessonNum:t.num_str,lessonId:t.id,module:t.module,sectionTitle:"Challenge: Kidnapped Robot",badge:"🚨 Localization Challenge 2",title:"Localization Challenges: The Kidnapped Robot Problem & Global Recovery",htmlContent:`
      <div class="l03-two-col-layout">
        <div class="l03-content-col" style="display: flex; flex-direction: column; justify-content: center; gap: 0.45rem;">
          <div class="l05-golden-card" style="padding: 0.45rem 0.7rem;">
            <div class="l05-golden-header" style="font-size: 0.8rem;"><span>🚨</span><strong>Disastrous State Divergence</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.32;">The robot is manually lifted, shoved, or teleported to an arbitrary location without odometry registering movement.</p>
          </div>
          <div class="l05-golden-card" style="padding: 0.45rem 0.7rem;">
            <div class="l05-golden-header" style="font-size: 0.8rem;"><span>📉</span><strong>Measurement Likelihood Collapse</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.32;">Real laser scans completely contradict map expectations at old believed pose. Average particle weight plunges below threshold.</p>
          </div>
          <div class="l05-golden-card" style="padding: 0.45rem 0.7rem;">
            <div class="l05-golden-header" style="font-size: 0.8rem;"><span>🔄</span><strong>Augmented MCL Recovery</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.32;">AMCL automatically injects random particles across all free map space. As robot moves, particles at the true new location gain weight, reconverging rapidly.</p>
          </div>
        </div>
        <div class="l03-content-col" style="display: flex; flex-direction: column; justify-content: center; gap: 0.45rem;">
          <div style="background: var(--bg-surface); border: 1px solid var(--border-color); border-radius: 10px; padding: 0.45rem; box-shadow: 0 4px 14px rgba(0,0,0,0.12); display: flex; flex-direction: column; align-items: center; justify-content: center;">
            <img src="assets/images/localization_kidnapped_robot.png" alt="Kidnapped Robot Problem" style="width: 100%; max-height: 240px; object-fit: contain; border-radius: 6px; display: block; margin: 0 auto;" />
            <div style="margin-top: 0.35rem; font-size: 0.68rem; color: var(--text-muted); text-align: center; font-family: var(--font-sans);">
              Kidnapped Robot: Robot transported to an unknown pose requiring global particle relocalization
            </div>
          </div>
          <div class="l05-banner-intro" style="margin: 0; font-size: 0.72rem; padding: 0.38rem 0.65rem; border-left: 3px solid #ef4444;">
            <strong>💡 Recovery Parameters:</strong> Governed by <code>recovery_alpha_slow: 0.001</code> and <code>recovery_alpha_fast: 0.1</code> in <code>amcl.yaml</code>.
          </div>
        </div>
      </div>
    `}),a.push({id:`${t.id}_sec_title_mapping`,type:"section_title",lessonNum:t.num_str,lessonId:t.id,module:t.module,sectionTitle:"Part II: Mapping",badge:"🗺️ Part II",title:"Mapping",titleClass:"text-mapping",description:"Constructing an accurate 2D metric occupancy grid map of an unknown environment from laser scan observations."}),a.push({id:`${t.id}_sec3_mapping_step1_lattice`,type:"concept",lessonNum:t.num_str,lessonId:t.id,module:t.module,sectionTitle:"Mapping Step 1",badge:"🗺️ Mapping Step 1 / 4",title:"Mapping Step 1: Discretizing Continuous Space into a 2D Grid Lattice",htmlContent:`
      <div class="l03-two-col-layout">
        <div class="l03-content-col" style="display: flex; flex-direction: column; justify-content: center; gap: 0.45rem;">
          <div class="l05-golden-card" style="padding: 0.45rem 0.7rem;">
            <div class="l05-golden-header" style="font-size: 0.8rem;"><span>🌐</span><strong>Infinite Continuous Reality</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.32;">The physical world has continuous real-valued coordinates <code>(x, y) &isin; R^2</code>. Computers cannot store infinite precision boundaries directly.</p>
          </div>
          <div class="l05-golden-card" style="padding: 0.45rem 0.7rem;">
            <div class="l05-golden-header" style="font-size: 0.8rem;"><span>📐</span><strong>Lattice Grid Discretization</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.32;">We superimpose a uniform matrix of square cells over the floorplan. Each cell spans width <code>&Delta;x</code> and height <code>&Delta;y</code> (resolution).</p>
          </div>
          <div class="l05-golden-card" style="padding: 0.45rem 0.7rem;">
            <div class="l05-golden-header" style="font-size: 0.8rem;"><span>⚙️</span><strong>Coordinate Discretization Math</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.32;">Continuous coordinate <code>(x, y)</code> maps to discrete cell indices via: <code>i = floor((x - origin_x) / resolution)</code>, <code>j = floor((y - origin_y) / resolution)</code>.</p>
          </div>
        </div>
        <div class="l03-content-col" style="display: flex; flex-direction: column; justify-content: center; gap: 0.45rem;">
          <div style="background: var(--bg-surface); border: 1px solid var(--border-color); border-radius: 10px; padding: 0.45rem; box-shadow: 0 4px 14px rgba(0,0,0,0.12); display: flex; flex-direction: column; align-items: center; justify-content: center;">
            <img src="assets/images/occupancy_grid_step1_discretization.png" alt="Mapping Step 1: Discretization" style="width: 100%; max-height: 240px; object-fit: contain; border-radius: 6px; display: block; margin: 0 auto;" />
            <div style="margin-top: 0.35rem; font-size: 0.68rem; color: var(--text-muted); text-align: center; font-family: var(--font-sans);">
              Spatial Discretization: Overlaying a uniform 2D grid matrix across continuous floorplan geometry
            </div>
          </div>
          <div class="l05-banner-intro" style="margin: 0; font-size: 0.72rem; padding: 0.38rem 0.65rem; border-left: 3px solid #0284c7;">
            <strong>💡 Standard AMR Resolution:</strong> Warehouse AMRs typically use <strong>0.05m (5 cm)</strong> grid resolution to resolve pallet edges.
          </div>
        </div>
      </div>
    `}),a.push({id:`${t.id}_sec3_mapping_step2_binary_states`,type:"concept",lessonNum:t.num_str,lessonId:t.id,module:t.module,sectionTitle:"Mapping Step 2",badge:"🗺️ Mapping Step 2 / 4",title:"Mapping Step 2: Binary States & Metric Quantization",htmlContent:`
      <div class="l03-two-col-layout">
        <div class="l03-content-col" style="display: flex; flex-direction: column; justify-content: center; gap: 0.45rem;">
          <div class="l05-golden-card" style="padding: 0.45rem 0.7rem;">
            <div class="l05-golden-header" style="font-size: 0.8rem;"><span>⬜</span><strong>Free Space State (Cell = 0)</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.32;">Traversable open floor cleared by laser beams without detecting obstacles. AMRs can safely plan paths through these cells.</p>
          </div>
          <div class="l05-golden-card" style="padding: 0.45rem 0.7rem;">
            <div class="l05-golden-header" style="font-size: 0.8rem;"><span>⬛</span><strong>Occupied Obstacle State (Cell = 100)</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.32;">Impassable structures (walls, pillars, racks). Laser pulses bounce back from surfaces inside these cell boundaries.</p>
          </div>
          <div class="l05-golden-card" style="padding: 0.45rem 0.7rem;">
            <div class="l05-golden-header" style="font-size: 0.8rem;"><span>🔘</span><strong>Unknown State (Cell = -1)</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.32;">Unexplored areas beyond walls or shadowed by obstacles. Nav2 planners treat unknown areas as potentially lethal.</p>
          </div>
        </div>
        <div class="l03-content-col" style="display: flex; flex-direction: column; justify-content: center; gap: 0.45rem;">
          <div style="background: var(--bg-surface); border: 1px solid var(--border-color); border-radius: 10px; padding: 0.45rem; box-shadow: 0 4px 14px rgba(0,0,0,0.12); display: flex; flex-direction: column; align-items: center; justify-content: center;">
            <img src="assets/images/occupancy_grid_step2_binary_cells.png" alt="Mapping Step 2: Binary Cells" style="width: 100%; max-height: 240px; object-fit: contain; border-radius: 6px; display: block; margin: 0 auto;" />
            <div style="margin-top: 0.35rem; font-size: 0.68rem; color: var(--text-muted); text-align: center; font-family: var(--font-sans);">
              Binary Grid Classification: White = Free (0), Black = Obstacle (100), Gray = Unknown (-1)
            </div>
          </div>
          <div class="l05-banner-intro" style="margin: 0; font-size: 0.72rem; padding: 0.38rem 0.65rem; border-left: 3px solid #0284c7;">
            <strong>💡 ROS 2 Message Standard:</strong> Published on <code>/map</code> topic as <code>nav_msgs/msg/OccupancyGrid</code> with <code>int8[] data</code>.
          </div>
        </div>
      </div>
    `}),a.push({id:`${t.id}_sec3_mapping_step3_full_matrix`,type:"concept",lessonNum:t.num_str,lessonId:t.id,module:t.module,sectionTitle:"Mapping Step 3",badge:"🗺️ Mapping Step 3 / 4",title:"Mapping Step 3: The Full Warehouse Discretized Binary Matrix",htmlContent:`
      <div class="l03-two-col-layout">
        <div class="l03-content-col" style="display: flex; flex-direction: column; justify-content: center; gap: 0.45rem;">
          <div class="l05-golden-card" style="padding: 0.45rem 0.7rem;">
            <div class="l05-golden-header" style="font-size: 0.8rem;"><span>🏢</span><strong>Facility-Wide Grid Matrix</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.32;">The entire warehouse floorplan is represented as a contiguous 2D binary matrix: <code>M = {m_1, m_2, ..., m_N}</code> spanning width &times; height.</p>
          </div>
          <div class="l05-golden-card" style="padding: 0.45rem 0.7rem;">
            <div class="l05-golden-header" style="font-size: 0.8rem;"><span>💾</span><strong>Memory Allocation & Sizing</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.32;">A 100m &times; 100m warehouse at 5cm resolution requires <code>2,000 &times; 2,000 = 4,000,000</code> cells (~4 MB uncompressed), easily cacheable in RAM.</p>
          </div>
          <div class="l05-golden-card" style="padding: 0.45rem 0.7rem;">
            <div class="l05-golden-header" style="font-size: 0.8rem;"><span>🎯</span><strong>Origin & Transformation Alignment</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.32;">The grid matrix is anchored to the global world frame via origin coordinates <code>(origin_x, origin_y, origin_theta)</code>.</p>
          </div>
        </div>
        <div class="l03-content-col" style="display: flex; flex-direction: column; justify-content: center; gap: 0.45rem;">
          <div style="background: var(--bg-surface); border: 1px solid var(--border-color); border-radius: 10px; padding: 0.45rem; box-shadow: 0 4px 14px rgba(0,0,0,0.12); display: flex; flex-direction: column; align-items: center; justify-content: center;">
            <img src="assets/images/occupancy_grid_step3_full_matrix.png" alt="Mapping Step 3: Full Matrix" style="width: 100%; max-height: 240px; object-fit: contain; border-radius: 6px; display: block; margin: 0 auto;" />
            <div style="margin-top: 0.35rem; font-size: 0.68rem; color: var(--text-muted); text-align: center; font-family: var(--font-sans);">
              Global Matrix: Full apartment floorplan mapped into discrete binary cells
            </div>
          </div>
          <div class="l05-banner-intro" style="margin: 0; font-size: 0.72rem; padding: 0.38rem 0.65rem; border-left: 3px solid #10b981;">
            <strong>💡 Serialization:</strong> When saved via <code>nav2_map_server</code>, this binary matrix is exported directly to an image (.pgm).
          </div>
        </div>
      </div>
    `}),a.push({id:`${t.id}_sec3_mapping_step4_raycast_cone`,type:"concept",lessonNum:t.num_str,lessonId:t.id,module:t.module,sectionTitle:"Mapping Step 4",badge:"🗺️ Mapping Step 4 / 4",title:"Mapping Step 4: The LiDAR Measurement Cone & Log-Odds Bayesian Updates",htmlContent:`
      <div class="l03-two-col-layout">
        <div class="l03-content-col" style="display: flex; flex-direction: column; justify-content: center; gap: 0.45rem;">
          <div class="l05-golden-card" style="padding: 0.45rem 0.7rem;">
            <div class="l05-golden-header" style="font-size: 0.8rem;"><span>🔦</span><strong>Bresenham Raycasting</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.32;">Each LiDAR beam traverses a straight line from robot origin to range return. Cells along the ray are cleared as free space.</p>
          </div>
          <div class="l05-golden-card" style="padding: 0.45rem 0.7rem;">
            <div class="l05-golden-header" style="font-size: 0.8rem;"><span>💥</span><strong>Obstacle Hit Cell</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.32;">The endpoint cell where the laser beam reflects is incremented as an occupied obstacle barrier.</p>
          </div>
          <div class="l05-golden-card" style="padding: 0.45rem 0.7rem;">
            <div class="l05-golden-header" style="font-size: 0.8rem;"><span>➕</span><strong>Log-Odds Numerical Stability</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.32;">Instead of multiplying probabilities (underflow risk), occupancy uses log-odds addition: <code>l_{t,i} = l_{t-1,i} + log_odds(z_t)</code>.</p>
          </div>
        </div>
        <div class="l03-content-col" style="display: flex; flex-direction: column; justify-content: center; gap: 0.45rem;">
          <div style="background: var(--bg-surface); border: 1px solid var(--border-color); border-radius: 10px; padding: 0.45rem; box-shadow: 0 4px 14px rgba(0,0,0,0.12); display: flex; flex-direction: column; align-items: center; justify-content: center;">
            <img src="assets/images/occupancy_grid_step4_raycast_cone.png" alt="Mapping Step 4: Raycast Cone" style="width: 100%; max-height: 240px; object-fit: contain; border-radius: 6px; display: block; margin: 0 auto;" />
            <div style="margin-top: 0.35rem; font-size: 0.68rem; color: var(--text-muted); text-align: center; font-family: var(--font-sans);">
              LiDAR Raycast Cone: Sweeping laser beams updating log-odds occupancy across cells
            </div>
          </div>
          <div class="l05-banner-intro" style="margin: 0; font-size: 0.72rem; padding: 0.38rem 0.65rem; border-left: 3px solid #10b981;">
            <strong>💡 Update Logic:</strong> <code>l_free = log(0.35/0.65) = -0.62</code> | <code>l_occ = log(0.85/0.15) = +1.73</code>.
          </div>
        </div>
      </div>
    `}),a.push({id:`${t.id}_sec_title_slam`,type:"section_title",lessonNum:t.num_str,lessonId:t.id,module:t.module,sectionTitle:"Part III: SLAM",badge:"🔄 Part III",title:"SLAM Architecture",titleColor:"#8b5cf6",description:"Simultaneously estimating the robot pose and constructing the environmental map from sensor observations."}),a.push({id:`${t.id}_sec4_slam_dilemma`,type:"concept",lessonNum:t.num_str,lessonId:t.id,module:t.module,sectionTitle:"SLAM Dilemma",badge:"🔄 SLAM Dilemma",title:"The Fundamental SLAM Dilemma & Classical Processing Pipeline",htmlContent:`
      <div class="l03-two-col-layout">
        <div class="l03-content-col" style="display: flex; flex-direction: column; justify-content: center; gap: 0.45rem;">
          <div class="l05-golden-card" style="padding: 0.45rem 0.7rem;">
            <div class="l05-golden-header" style="font-size: 0.8rem;"><span>🗺️</span><strong>To Build a Map, We Need Robot Pose</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.32;">Accurately placing laser scan points into global coordinates requires knowing the exact robot pose <code>(x, y, &theta;)</code> where the scan was taken.</p>
          </div>
          <div class="l05-golden-card" style="padding: 0.45rem 0.7rem;">
            <div class="l05-golden-header" style="font-size: 0.8rem;"><span>📍</span><strong>To Localize, We Need a Map</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.32;">To determine robot pose from laser range scans, we need an existing reference map to match observations against.</p>
          </div>
          <div class="l05-golden-card" style="padding: 0.45rem 0.7rem;">
            <div class="l05-golden-header" style="font-size: 0.8rem;"><span>🔄</span><strong>Joint Estimation Solution</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.32;">SLAM solves both problems simultaneously: estimating trajectory <code>x_{0:t}</code> and map <code>m</code> concurrently from sensor history.</p>
          </div>
        </div>
        <div class="l03-content-col" style="display: flex; flex-direction: column; justify-content: center; gap: 0.45rem;">
          <div style="background: var(--bg-surface); border: 1px solid var(--border-color); border-radius: 10px; padding: 0.45rem; box-shadow: 0 4px 14px rgba(0,0,0,0.12); display: flex; flex-direction: column; align-items: center; justify-content: center;">
            <img src="assets/images/slam_dilemma_classical_architecture.png" alt="SLAM Dilemma Architecture" style="width: 100%; max-height: 240px; object-fit: contain; border-radius: 6px; display: block; margin: 0 auto;" />
            <div style="margin-top: 0.35rem; font-size: 0.68rem; color: var(--text-muted); text-align: center; font-family: var(--font-sans);">
              SLAM Dilemma: Continuous interdependency between unknown pose estimation and unknown map building
            </div>
          </div>
          <div class="l05-banner-intro" style="margin: 0; font-size: 0.72rem; padding: 0.38rem 0.65rem; border-left: 3px solid #8b5cf6;">
            <strong>💡 Modern Solution:</strong> Pose Graph SLAM (SLAM Toolbox) decouples scan matching front-end from Ceres graph back-end.
          </div>
        </div>
      </div>
    `}),a.push({id:`${t.id}_sec_title_practical`,type:"section_title",lessonNum:t.num_str,lessonId:t.id,module:t.module,sectionTitle:"Part IV: Practical",badge:"🛠️ Part IV",title:"ROS 2 SLAM Mapping",titleColor:"#10b981",description:"Hands-on practical engineering: package architecture, launch files, parameter tuning, live teleoperation, and map serialization."}),a.push({id:`${t.id}_sec5_step1_install_packages`,type:"concept",lessonNum:t.num_str,lessonId:t.id,module:t.module,sectionTitle:"Step 1: Install Packages",badge:"📦 Practical Step 1 / 6",title:"Practical Step 1: Install Required ROS 2 Packages",htmlContent:`
      <div class="l03-two-col-layout">
        <div class="l03-content-col" style="display: flex; flex-direction: column; justify-content: center; gap: 0.45rem;">
          <div class="l05-golden-card" style="padding: 0.45rem 0.7rem;">
            <div class="l05-golden-header" style="font-size: 0.8rem;"><span>📦</span><strong>slam_toolbox</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.32;">The industry-standard 2D Graph SLAM package for ROS 2. Includes Karto SLAM scan matching front-end and Ceres non-linear least-squares optimization back-end.</p>
          </div>
          <div class="l05-golden-card" style="padding: 0.45rem 0.7rem;">
            <div class="l05-golden-header" style="font-size: 0.8rem;"><span>🧭</span><strong>navigation2 &amp; nav2_bringup</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.32;">Provides map server utilities (<code>nav2_map_server</code>), map saver command line tools, and launch orchestration actions needed for life-cycle management.</p>
          </div>
        </div>
        <div class="l03-content-col" style="display: flex; flex-direction: column; justify-content: center; gap: 0.45rem;">
          <div class="l03-cmd-card">
            <div class="l03-cmd-header"><span class="l03-term-badge">bash terminal</span><strong>APT Installation Command</strong></div>
            <pre><code class="language-bash">sudo apt update && sudo apt install -y   ros-humble-slam-toolbox   ros-humble-navigation2   ros-humble-nav2-bringup</code></pre>
          </div>
          <div class="l05-banner-intro" style="margin: 0; font-size: 0.72rem; padding: 0.38rem 0.65rem; border-left: 3px solid #10b981;">
            <strong>✅ Verification:</strong> Test installation with <code>ros2 pkg list | grep slam_toolbox</code>. Both <code>slam_toolbox</code> and <code>nav2_map_server</code> must be visible.
          </div>
        </div>
      </div>
    `}),a.push({id:`${t.id}_sec5_step2_create_package`,type:"concept",lessonNum:t.num_str,lessonId:t.id,module:t.module,sectionTitle:"Step 2: Create Package",badge:"📁 Practical Step 2 / 6",title:"Practical Step 2: Create Mapping Package in Workspace",htmlContent:`
      <div class="l03-two-col-layout">
        <div class="l03-content-col" style="display: flex; flex-direction: column; justify-content: center; gap: 0.45rem;">
          <div class="l05-golden-card" style="padding: 0.45rem 0.7rem;">
            <div class="l05-golden-header" style="font-size: 0.8rem;"><span>🏗️</span><strong>nexus_amr_mapping Package</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.32;">Create a dedicated Python ROS 2 package housing configuration files, launch scripts, and output map directories for the warehouse AMR.</p>
          </div>
          <div class="l05-golden-card" style="padding: 0.45rem 0.7rem;">
            <div class="l05-golden-header" style="font-size: 0.8rem;"><span>📁</span><strong>Subdirectory Architecture</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.32;"><code>config/</code> for YAML tuning, <code>launch/</code> for Python launch orchestrations, and <code>maps/</code> for storing serialized occupancy grids.</p>
          </div>
          <div class="l05-golden-card" style="padding: 0.45rem 0.7rem;">
            <div class="l05-golden-header" style="font-size: 0.8rem;"><span>📦</span><strong>setup.py Data Files Export</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.32;">Register <code>config/*.yaml</code> and <code>launch/*.launch.py</code> in <code>setup.py</code> so <code>colcon build</code> installs them to <code>install/nexus_amr_mapping/share/</code>.</p>
          </div>
        </div>
        <div class="l03-content-col" style="display: flex; flex-direction: column; justify-content: center; gap: 0.45rem;">
          <div class="l03-cmd-card">
            <div class="l03-cmd-header"><span class="l03-term-badge">bash terminal</span><strong>Package Creation & Directory Setup</strong></div>
            <pre><code class="language-bash">cd ~/ros2_ws/src
ros2 pkg create --build-type ament_python nexus_amr_mapping   --dependencies rclpy slam_toolbox nav2_map_server

cd nexus_amr_mapping
mkdir -p config launch maps rviz</code></pre>
          </div>
          <div class="l05-banner-intro" style="margin: 0; font-size: 0.72rem; padding: 0.38rem 0.65rem; border-left: 3px solid #3b82f6;">
            <strong>💡 Clean Workspace Rule:</strong> Keeping mapping decoupled from simulation packages guarantees modular deployment on physical AMR hardware.
          </div>
        </div>
      </div>
    `}),a.push({id:`${t.id}_sec5_step3_config_launch`,type:"concept",lessonNum:t.num_str,lessonId:t.id,module:t.module,sectionTitle:"Step 3: Config & Launch",badge:"⚙️ Practical Step 3 / 6",title:"Practical Step 3: Add SLAM Configuration & Launch Files",htmlContent:`
      <div class="l03-two-col-layout">
        <div class="l03-content-col" style="display: flex; flex-direction: column; justify-content: center; gap: 0.45rem;">
          <div class="l05-golden-card" style="padding: 0.45rem 0.7rem;">
            <div class="l05-golden-header" style="font-size: 0.8rem;"><span>📄</span><strong>config/slam_toolbox.yaml</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.32;">Specifies <code>async_slam_toolbox_node</code> parameters: tracking frames (<code>map</code>, <code>odom</code>, <code>base_footprint</code>), <code>/scan</code> topic, and Ceres solver settings.</p>
          </div>
          <div class="l05-golden-card" style="padding: 0.45rem 0.7rem;">
            <div class="l05-golden-header" style="font-size: 0.8rem;"><span>🚀</span><strong>launch/online_async_slam.launch.py</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.32;">Defines launch arguments (<code>use_sim_time</code>), declares the SLAM Toolbox node, and launches RViz2 with pre-configured laser visualization.</p>
          </div>
          <div class="l05-golden-card" style="padding: 0.45rem 0.7rem;">
            <div class="l05-golden-header" style="font-size: 0.8rem;"><span>⏱️</span><strong>Async Execution Mode</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.32;">The asynchronous mode processes sensor scans in a dedicated worker thread, preventing robot velocity pauses if Ceres optimization takes &gt; 50ms.</p>
          </div>
        </div>
        <div class="l03-content-col" style="display: flex; flex-direction: column; justify-content: center; gap: 0.45rem;">
          <div class="l03-cmd-card">
            <div class="l03-cmd-header"><span class="l03-term-badge">online_async_slam.launch.py</span><strong>Launch File Snippet</strong></div>
            <pre><code class="language-python">from launch import LaunchDescription
from launch_ros.actions import Node
from ament_index_python.packages import get_package_share_directory
import os

def generate_launch_description():
    pkg_share = get_package_share_directory('nexus_amr_mapping')
    config = os.path.join(pkg_share, 'config', 'slam_toolbox.yaml')
    return LaunchDescription([
        Node(package='slam_toolbox', executable='async_slam_toolbox_node',
             name='slam_toolbox', output='screen',
             parameters=[config, {'use_sim_time': True}])
    ])</code></pre>
          </div>
        </div>
      </div>
    `}),a.push({id:`${t.id}_sec5_step4_tuning_config`,type:"concept",lessonNum:t.num_str,lessonId:t.id,module:t.module,sectionTitle:"Step 4: Parameter Tuning",badge:"🎛️ Practical Step 4 / 6",title:"Practical Step 4: SLAM Configuration Parameter Tuning Matrix",htmlContent:`
      <div style="background: var(--bg-surface); border: 1px solid var(--border-color); border-radius: 10px; padding: 0.5rem; box-shadow: 0 4px 14px rgba(0,0,0,0.12);">
        <table class="l03-table" style="width: 100%; border-collapse: collapse; font-size: 0.72rem;">
          <thead>
            <tr style="background: var(--bg-card); color: var(--text-primary); border-bottom: 2px solid var(--accent-primary);">
              <th style="padding: 0.35rem 0.55rem; text-align: left; width: 22%;">YAML Parameter</th>
              <th style="padding: 0.35rem 0.55rem; text-align: left; width: 14%;">Value</th>
              <th style="padding: 0.35rem 0.55rem; text-align: left; width: 38%;">Engineering Purpose</th>
              <th style="padding: 0.35rem 0.55rem; text-align: left; width: 26%;">Tuning Guidance</th>
            </tr>
          </thead>
          <tbody>
            <tr style="border-bottom: 1px solid var(--border-color);">
              <td style="padding: 0.3rem 0.55rem;"><code>resolution</code></td>
              <td style="padding: 0.3rem 0.55rem;"><code>0.05</code></td>
              <td style="padding: 0.3rem 0.55rem;">Grid cell size (5 cm). Captures rack legs crisply.</td>
              <td style="padding: 0.3rem 0.55rem;">Lower to <code>0.03</code> for tight spaces; <code>0.05</code> for large hubs.</td>
            </tr>
            <tr style="border-bottom: 1px solid var(--border-color);">
              <td style="padding: 0.3rem 0.55rem;"><code>max_laser_range</code></td>
              <td style="padding: 0.3rem 0.55rem;"><code>20.0</code></td>
              <td style="padding: 0.3rem 0.55rem;">Discards returns beyond 20 meters.</td>
              <td style="padding: 0.3rem 0.55rem;">Set to match physical LiDAR reliable range.</td>
            </tr>
            <tr style="border-bottom: 1px solid var(--border-color);">
              <td style="padding: 0.3rem 0.55rem;"><code>minimum_travel_distance</code></td>
              <td style="padding: 0.3rem 0.55rem;"><code>0.20</code></td>
              <td style="padding: 0.3rem 0.55rem;">Requires 20 cm linear travel before new node.</td>
              <td style="padding: 0.3rem 0.55rem;">Prevents redundant pose nodes when stopped.</td>
            </tr>
            <tr style="border-bottom: 1px solid var(--border-color);">
              <td style="padding: 0.3rem 0.55rem;"><code>minimum_travel_heading</code></td>
              <td style="padding: 0.3rem 0.55rem;"><code>0.20</code></td>
              <td style="padding: 0.3rem 0.55rem;">Requires ~11.5&deg; rotation before new node.</td>
              <td style="padding: 0.3rem 0.55rem;">Ensures angular scans during in-place turns.</td>
            </tr>
            <tr>
              <td style="padding: 0.3rem 0.55rem;"><code>loop_search_maximum_distance</code></td>
              <td style="padding: 0.3rem 0.55rem;"><code>3.0</code></td>
              <td style="padding: 0.3rem 0.55rem;">Radius for finding loop closure candidates.</td>
              <td style="padding: 0.3rem 0.55rem;">Keep &le; 3m to prevent false loop matches.</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="l05-banner-intro" style="margin-top: 0.45rem; font-size: 0.72rem; padding: 0.38rem 0.65rem; border-left: 3px solid #eab308;">
        <strong>⚖️ Tuning Golden Rule:</strong> Never set <code>minimum_travel_distance: 0.0</code>! It causes rapid pose graph bloat and exhausts RAM within minutes.
      </div>
    `}),a.push({id:`${t.id}_sec5_step5_running_teleop`,type:"concept",lessonNum:t.num_str,lessonId:t.id,module:t.module,sectionTitle:"Step 5: Run Launch & Teleop",badge:"🎮 Practical Step 5 / 6",title:"Practical Step 5: Running Launch File & Teleop (Live Mapping in RViz2)",htmlContent:`
      <div class="l03-two-col-layout">
        <div class="l03-content-col" style="display: flex; flex-direction: column; justify-content: center; gap: 0.45rem;">
          <div class="l05-golden-card" style="padding: 0.45rem 0.7rem;">
            <div class="l05-golden-header" style="font-size: 0.8rem;"><span>🚀</span><strong>Terminal 1: Execute SLAM Launch</strong></div>
            <pre style="margin: 0.2rem 0; font-size: 0.7rem;"><code class="language-bash">ros2 launch nexus_amr_mapping online_async_slam.launch.py</code></pre>
          </div>
          <div class="l05-golden-card" style="padding: 0.45rem 0.7rem;">
            <div class="l05-golden-header" style="font-size: 0.8rem;"><span>🕹️</span><strong>Terminal 2: Launch Teleop Controller</strong></div>
            <pre style="margin: 0.2rem 0; font-size: 0.7rem;"><code class="language-bash">ros2 run teleop_twist_keyboard teleop_twist_keyboard</code></pre>
          </div>
          <div class="l05-golden-card" style="padding: 0.45rem 0.7rem;">
            <div class="l05-golden-header" style="font-size: 0.8rem;"><span>🐢</span><strong>Driving Discipline (&le; 0.3 m/s)</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.32;">Drive slowly. Drive perimeter walls first to close loops; then fill aisles. Avoid rapid in-place spins to ensure clean scan overlap.</p>
          </div>
        </div>
        <div class="l03-content-col" style="display: flex; flex-direction: column; justify-content: center; gap: 0.45rem;">
          <div style="background: var(--bg-surface); border: 1px solid var(--border-color); border-radius: 10px; padding: 0.45rem; box-shadow: 0 4px 14px rgba(0,0,0,0.12); display: flex; flex-direction: column; align-items: center; justify-content: center;">
            <img src="assets/images/rviz2_live_slam_mapping.png" alt="RViz2 Live SLAM Mapping Interface" style="width: 100%; max-height: 240px; object-fit: contain; border-radius: 6px; display: block; margin: 0 auto;" />
            <div style="margin-top: 0.35rem; font-size: 0.68rem; color: var(--text-muted); text-align: center; font-family: var(--font-sans);">
              Live RViz2 SLAM Mapping: Real-time OccupancyGrid growth, LaserScan, and TF tree links
            </div>
          </div>
          <div class="l05-banner-intro" style="margin: 0; font-size: 0.72rem; padding: 0.38rem 0.65rem; border-left: 3px solid #10b981;">
            <strong>💡 Visual Verification:</strong> Ensure walls are crisp and continuous. Double lines indicate scan matching slip or odometry wheel spin!
          </div>
        </div>
      </div>
    `}),a.push({id:`${t.id}_sec5_step6_saving_maps`,type:"concept",lessonNum:t.num_str,lessonId:t.id,module:t.module,sectionTitle:"Step 6: Save Maps",badge:"💾 Practical Step 6 / 6",title:"Practical Step 6: Map Serialization & Saving Map Files (.yaml & .pgm)",htmlContent:`
      <div class="l03-two-col-layout">
        <div class="l03-content-col" style="display: flex; flex-direction: column; justify-content: center; gap: 0.45rem;">
          <div class="l05-golden-card" style="padding: 0.45rem 0.7rem;">
            <div class="l05-golden-header" style="font-size: 0.8rem;"><span>💾</span><strong>Map Saver CLI Command</strong></div>
            <pre style="margin: 0.2rem 0; font-size: 0.7rem;"><code class="language-bash">ros2 run nav2_map_server map_saver_cli   -f ~/ros2_ws/src/nexus_amr_mapping/maps/warehouse_map</code></pre>
          </div>
          <div class="l05-golden-card" style="padding: 0.45rem 0.7rem;">
            <div class="l05-golden-header" style="font-size: 0.8rem;"><span>🖼️</span><strong>warehouse_map.pgm (Image)</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.32;">2D grayscale portable graymap image where each pixel matches a grid cell (254 = free space, 0 = occupied obstacle, 205 = unknown).</p>
          </div>
          <div class="l05-golden-card" style="padding: 0.45rem 0.7rem;">
            <div class="l05-golden-header" style="font-size: 0.8rem;"><span>📋</span><strong>warehouse_map.yaml (Metadata)</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.32;">Contains crucial spatial anchors: <code>resolution: 0.05</code>, <code>origin: [-10.0, -10.0, 0.0]</code>, and occupancy evaluation mode.</p>
          </div>
        </div>
        <div class="l03-content-col" style="display: flex; flex-direction: column; justify-content: center; gap: 0.45rem;">
          <div class="l03-cmd-card">
            <div class="l03-cmd-header"><span class="l03-term-badge">warehouse_map.yaml</span><strong>Generated Map Metadata</strong></div>
            <pre><code class="language-yaml">image: warehouse_map.pgm
mode: trinary
resolution: 0.05
origin: [-10.0, -10.0, 0.0]
negate: 0
occupied_thresh: 0.65
free_thresh: 0.25</code></pre>
          </div>
          <div class="l05-banner-intro" style="margin: 0; font-size: 0.72rem; padding: 0.38rem 0.65rem; border-left: 3px solid #10b981;">
            <strong>🚀 Milestone Achieved:</strong> This saved map directly feeds into Nav2 AMCL localization and costmap generation in Lessons 14 & 15!
          </div>
        </div>
      </div>
    `}),a.push({id:`${t.id}_quiz_amcl_resampling`,type:"quiz",lessonNum:t.num_str,lessonId:t.id,module:t.module,sectionTitle:"Knowledge Check: AMCL & Mapping",badge:"🧠 Interactive Quiz",title:"Knowledge Check: AMCL Particle Filter Weighting",question:"In AMCL, when a simulated LiDAR raycast from a candidate particle pose perfectly matches the distance measured by the physical robot laser scanner, what happens to that particle during measurement correction?",options:["The particle importance weight w increases, making it much more likely to survive and duplicate during resampling","The particle is deleted immediately because deterministic certainty is not allowed in stochastic filters","The particle heading angle theta is forcefully inverted by 180 degrees to search for alternative solutions","The particle is frozen in memory and excluded from all future motion model prediction updates"],answer:0,explanation:"Correct! AMCL evaluates candidate poses by comparing actual laser measurements against expected raycasts through the map. Particles whose predictions closely match real-world observations receive high importance weights and multiply into clusters during the roulette wheel resampling phase."})}function hi(s,t,a){a.push({id:`${t.id}_sec_title_continuous`,type:"section_title",lessonNum:t.num_str,lessonId:t.id,module:t.module,sectionTitle:"Part I: Continuous Space & C-Space",badge:"📐 Part I",title:"Continuous Representation & C-Space",titleClass:"text-navigation",titleColor:"#0284c7",description:"Modeling real-world warehouse environments, robot geometry, clearance checks, and obstacle inflation into Configuration Space."}),a.push({id:`${t.id}_sec1_nav_problem`,type:"concept",lessonNum:t.num_str,lessonId:t.id,module:t.module,sectionTitle:"1. Navigation Problem Formulation",badge:"🧭 Problem Statement",title:"Mobile Robot Navigation: Problem Formulation & Constraints",htmlContent:`
      <div class="l03-two-col-layout" style="display: grid; grid-template-columns: 1.15fr 0.85fr; gap: 0.65rem; align-items: center;">
        <div class="l03-content-col" style="display: flex; flex-direction: column; justify-content: center; gap: 0.4rem;">
          <div class="l05-golden-card" style="padding: 0.45rem 0.65rem;">
            <div class="l05-golden-header" style="font-size: 0.78rem;"><span>🏢</span><strong>Environment Geometry (&Wscr;)</strong></div>
            <p style="font-size: 0.73rem; line-height: 1.32;">Physical warehouse racking columns, perimeter walls, and static obstacles define the 2D workspace boundaries &Wscr; &sub; &reals;<sup>2</sup>.</p>
          </div>
          <div class="l05-golden-card" style="padding: 0.45rem 0.65rem;">
            <div class="l05-golden-header" style="font-size: 0.78rem;"><span>🚜</span><strong>Robot Geometry & Footprint (&Ascr;)</strong></div>
            <p style="font-size: 0.73rem; line-height: 1.32;">Physical chassis dimensions (length, width, wheel baseline, and payload overhang) determine whether the AMR can physically traverse narrow warehouse aisles.</p>
          </div>
          <div class="l05-golden-card" style="padding: 0.45rem 0.65rem;">
            <div class="l05-golden-header" style="font-size: 0.78rem;"><span>🎯</span><strong>Poses & Trajectory Feasibility</strong></div>
            <p style="font-size: 0.73rem; line-height: 1.32;">Given Start Pose <code>q_s = (x_s, y_s, &theta;_s)</code> and Goal Pose <code>q_g = (x_g, y_g, &theta;_g)</code>, find a collision-free path that satisfies differential-drive kinematic limits.</p>
          </div>
        </div>
        <div class="l03-content-col" style="display: flex; flex-direction: column; justify-content: center; gap: 0.45rem;">
          <div style="background: var(--bg-surface); border: 1px solid var(--border-color); border-radius: 8px; padding: 0.55rem; box-shadow: 0 4px 14px rgba(0,0,0,0.12);">
            <div style="font-size: 0.76rem; font-weight: bold; color: #0284c7; margin-bottom: 0.35rem; display: flex; align-items: center; gap: 0.35rem;">
              <span>📌</span> Core Navigation Objectives
            </div>
            <ul style="font-size: 0.72rem; line-height: 1.45; margin: 0; padding-left: 1.1rem; color: var(--text-secondary);">
              <li><strong>Collision Avoidance:</strong> Distance to all obstacles strictly greater than 0 mm at all times.</li>
              <li><strong>Kinematic Feasibility:</strong> Path curvature must not exceed AMR turning radius capabilities.</li>
              <li><strong>Optimality:</strong> Minimize path length, travel duration, and sharp rotational heading reversals.</li>
            </ul>
          </div>
          <div class="l05-banner-intro" style="margin: 0; font-size: 0.71rem; padding: 0.35rem 0.6rem; border-left: 3px solid #0284c7;">
            <strong>💡 Fundamental Rule:</strong> Navigation cannot be solved by simply treating the robot as a zero-radius point without collision checking.
          </div>
        </div>
      </div>
    `}),a.push({id:`${t.id}_sec2_continuous_step1`,type:"concept",lessonNum:t.num_str,lessonId:t.id,module:t.module,sectionTitle:"2. Continuous Space: 2D Plane",badge:"📐 Step 1",title:"Continuous Space: 2D Plane & Target Waypoint",htmlContent:`
      <div class="l03-two-col-layout" style="display: grid; grid-template-columns: 1fr 1.05fr; gap: 0.65rem; align-items: center;">
        <div class="l03-content-col" style="display: flex; flex-direction: column; justify-content: center; gap: 0.45rem;">
          <div class="l05-golden-card" style="padding: 0.45rem 0.7rem;">
            <div class="l05-golden-header" style="font-size: 0.8rem;"><span>🌐</span><strong>The Continuous Workspace (&Wscr;)</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.35;">The real world is continuous. Space is defined as &reals;<sup>2</sup> with infinite resolution, where coordinates <code>(x, y) &isin; &reals;<sup>2</sup></code> are represented by 64-bit floating point numbers.</p>
          </div>
          <div class="l05-golden-card" style="padding: 0.45rem 0.7rem;">
            <div class="l05-golden-header" style="font-size: 0.8rem;"><span>🎯</span><strong>Target Goal Poses</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.35;">A mission goal specifies position and orientation <code>(x_g, y_g, &theta;_g)</code>. The robot must plan a continuous parametric curve <code>q(t): [0, 1] &rarr; &Wscr;</code> reaching this target.</p>
          </div>
        </div>
        <div class="l03-content-col" style="display: flex; flex-direction: column; justify-content: center;">
          <div style="background: var(--bg-surface); border: 1px solid var(--border-color); border-radius: 10px; padding: 0.45rem; box-shadow: 0 4px 14px rgba(0,0,0,0.12); text-align: center;">
            <img src="assets/images/nav_continuous_rep_step1.png" alt="Continuous Space 2D Plane" style="width: 100%; max-height: 235px; object-fit: contain; border-radius: 6px; display: block; margin: 0 auto;" />
            <div style="margin-top: 0.35rem; font-size: 0.68rem; color: var(--text-muted); font-family: var(--font-sans);">
              Continuous 2D plane: Robot Start pose and Goal waypoint in empty free space
            </div>
          </div>
        </div>
      </div>
    `}),a.push({id:`${t.id}_sec3_continuous_merged_obstacles_swept`,type:"concept",lessonNum:t.num_str,lessonId:t.id,module:t.module,sectionTitle:"3. Obstacles & Swept Trajectory",badge:"📦 Merged Step 2 & 3",title:"Continuous Space: Obstacle Boundaries & Swept Trajectory",htmlContent:`
      <div class="l03-two-col-layout" style="display: grid; grid-template-columns: 1fr 1.05fr; gap: 0.65rem; align-items: center;">
        <div class="l03-content-col" style="display: flex; flex-direction: column; justify-content: center; gap: 0.4rem;">
          <div class="l05-golden-card" style="padding: 0.45rem 0.65rem;">
            <div class="l05-golden-header" style="font-size: 0.78rem;"><span>🧱</span><strong>Obstacle Boundaries (&Wscr;<sub>obs</sub>)</strong></div>
            <p style="font-size: 0.73rem; line-height: 1.32;">Physical warehouse racking columns, conveyor legs, and walls partition free space &Wscr;<sub>free</sub> from forbidden obstacle regions &Wscr;<sub>obs</sub>.</p>
          </div>
          <div class="l05-golden-card" style="padding: 0.45rem 0.65rem;">
            <div class="l05-golden-header" style="font-size: 0.78rem;"><span>🚜</span><strong>The Swept Footprint Volume</strong></div>
            <p style="font-size: 0.73rem; line-height: 1.32;">As the AMR moves along trajectory <code>q(t)</code>, it occupies a physical 2D area <code>&Ascr;(q(t))</code>. The swept volume is the union: <code>Swept(&tau;) = &cup;<sub>t</sub> &Ascr;(q(t))</code>.</p>
          </div>
          <div class="l05-golden-card" style="padding: 0.45rem 0.65rem;">
            <div class="l05-golden-header" style="font-size: 0.78rem;"><span>⚠️</span><strong>Collision Condition</strong></div>
            <p style="font-size: 0.73rem; line-height: 1.32;">A trajectory is collision-free if and only if <code>Swept(&tau;) &cap; &Wscr;<sub>obs</sub> = &empty;</code> across the entire duration.</p>
          </div>
        </div>
        <div class="l03-content-col" style="display: flex; flex-direction: column; justify-content: center;">
          <div style="background: var(--bg-surface); border: 1px solid var(--border-color); border-radius: 10px; padding: 0.45rem; box-shadow: 0 4px 14px rgba(0,0,0,0.12); text-align: center;">
            <img src="assets/images/nav_continuous_rep_step3.png" alt="Obstacle Boundaries and Swept Footprint Trajectory" style="width: 100%; max-height: 235px; object-fit: contain; border-radius: 6px; display: block; margin: 0 auto;" />
            <div style="margin-top: 0.35rem; font-size: 0.68rem; color: var(--text-muted); font-family: var(--font-sans);">
              Swept AMR footprint volume passing between continuous obstacle boundaries
            </div>
          </div>
        </div>
      </div>
    `}),a.push({id:`${t.id}_sec4_clearance_collision`,type:"concept",lessonNum:t.num_str,lessonId:t.id,module:t.module,sectionTitle:"4. Clearance Failure & Collision",badge:"💥 Step 4",title:"Continuous Space: Clearance Failure & Chassis Collision",htmlContent:`
      <div class="l03-two-col-layout" style="display: grid; grid-template-columns: 1fr 1.05fr; gap: 0.65rem; align-items: center;">
        <div class="l03-content-col" style="display: flex; flex-direction: column; justify-content: center; gap: 0.45rem;">
          <div class="l05-golden-card" style="padding: 0.45rem 0.7rem;">
            <div class="l05-golden-header" style="font-size: 0.8rem;"><span>💥</span><strong>The Collision Boundary Failure</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.35;">As the AMR advances along a candidate line, its physical chassis perimeter intersects obstacle boundaries because there is insufficient lateral clearance.</p>
          </div>
          <div class="l05-golden-card" style="padding: 0.45rem 0.7rem;">
            <div class="l05-golden-header" style="font-size: 0.8rem;"><span>🚫</span><strong>Point Trajectory vs. Robot Body</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.35;">Even though the robot center point <code>(x, y)</code> does not touch the obstacle, the chassis corners collide, causing real-world bumper trips and emergency stops.</p>
          </div>
        </div>
        <div class="l03-content-col" style="display: flex; flex-direction: column; justify-content: center;">
          <div style="background: var(--bg-surface); border: 1px solid var(--border-color); border-radius: 10px; padding: 0.45rem; box-shadow: 0 4px 14px rgba(0,0,0,0.12); text-align: center;">
            <img src="assets/images/nav_continuous_rep_collision.png" alt="Clearance Failure and Chassis Collision" style="width: 100%; max-height: 235px; object-fit: contain; border-radius: 6px; display: block; margin: 0 auto;" />
            <div style="margin-top: 0.35rem; font-size: 0.68rem; color: #ef4444; font-family: var(--font-sans); font-weight: bold;">
              Collision: Swept footprint intersects obstacle boundary (Clearance = 0 mm)
            </div>
          </div>
        </div>
      </div>
    `}),a.push({id:`${t.id}_sec5_clearance_condition`,type:"concept",lessonNum:t.num_str,lessonId:t.id,module:t.module,sectionTitle:"5. Clearance Condition",badge:"📏 Step 5",title:"Continuous Space: Distance Clearance Condition (d > R)",htmlContent:`
      <div class="l03-two-col-layout" style="display: grid; grid-template-columns: 1fr 1.05fr; gap: 0.65rem; align-items: center;">
        <div class="l03-content-col" style="display: flex; flex-direction: column; justify-content: center; gap: 0.45rem;">
          <div class="l05-golden-card" style="padding: 0.45rem 0.7rem;">
            <div class="l05-golden-header" style="font-size: 0.8rem;"><span>📏</span><strong>Distance to Obstacle Boundary</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.35;">To guarantee safety, we enforce: <code>dist(p, &part;&Wscr;<sub>obs</sub>) &gt; R<sub>robot</sub></code> at every point <code>p</code> along the path, where <code>R<sub>robot</sub></code> is the circumscribed radius.</p>
          </div>
          <div class="l05-golden-card" style="padding: 0.45rem 0.7rem;">
            <div class="l05-golden-header" style="font-size: 0.8rem;"><span>✅</span><strong>Allowable Corridor Verification</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.35;">Paths passing through corridors narrower than <code>2 &times; R<sub>robot</sub></code> are strictly pruned by the planning engine before motion execution begins.</p>
          </div>
        </div>
        <div class="l03-content-col" style="display: flex; flex-direction: column; justify-content: center;">
          <div style="background: var(--bg-surface); border: 1px solid var(--border-color); border-radius: 10px; padding: 0.45rem; box-shadow: 0 4px 14px rgba(0,0,0,0.12); text-align: center;">
            <img src="assets/images/nav_continuous_rep_allowable_path.png" alt="Distance Clearance Condition d > R" style="width: 100%; max-height: 235px; object-fit: contain; border-radius: 6px; display: block; margin: 0 auto;" />
            <div style="margin-top: 0.35rem; font-size: 0.68rem; color: #10b981; font-family: var(--font-sans); font-weight: bold;">
              Allowable Path: Safety clearance corridor dist > R_robot verified
            </div>
          </div>
        </div>
      </div>
    `}),a.push({id:`${t.id}_sec6_cspace_inflation`,type:"concept",lessonNum:t.num_str,lessonId:t.id,module:t.module,sectionTitle:"6. Obstacle Inflation",badge:"🎈 Step 6",title:"Configuration Space: Obstacle Inflation by Robot Radius",htmlContent:`
      <div class="l03-two-col-layout" style="display: grid; grid-template-columns: 1fr 1.05fr; gap: 0.65rem; align-items: center;">
        <div class="l03-content-col" style="display: flex; flex-direction: column; justify-content: center; gap: 0.45rem;">
          <div class="l05-golden-card" style="padding: 0.45rem 0.7rem;">
            <div class="l05-golden-header" style="font-size: 0.8rem;"><span>🎈</span><strong>Minkowski Sum Expansion</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.35;">Instead of calculating complex polygon collisions at every timestep, we inflate every obstacle outward by the robot radius: <code>&Wscr;<sub>obs</sub> &oplus; &Ascr;</code>.</p>
          </div>
          <div class="l05-golden-card" style="padding: 0.45rem 0.7rem;">
            <div class="l05-golden-header" style="font-size: 0.8rem;"><span>🎯</span><strong>AMR Becomes an Infinitesimal Point</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.35;">In Configuration Space, the robot collapses into a dimensionless 0-radius point particle! Path planning is reduced to finding a 1D curve that never crosses inflated boundaries.</p>
          </div>
        </div>
        <div class="l03-content-col" style="display: flex; flex-direction: column; justify-content: center;">
          <div style="background: var(--bg-surface); border: 1px solid var(--border-color); border-radius: 10px; padding: 0.45rem; box-shadow: 0 4px 14px rgba(0,0,0,0.12); text-align: center;">
            <img src="assets/images/nav_cspace_obstacle_inflation.png" alt="Obstacle Inflation by Robot Radius" style="width: 100%; max-height: 235px; object-fit: contain; border-radius: 6px; display: block; margin: 0 auto;" />
            <div style="margin-top: 0.35rem; font-size: 0.68rem; color: var(--text-muted); font-family: var(--font-sans);">
              Obstacle boundaries inflated outward by AMR circumscribed radius R
            </div>
          </div>
        </div>
      </div>
    `}),a.push({id:`${t.id}_sec7_cspace_free_obs`,type:"concept",lessonNum:t.num_str,lessonId:t.id,module:t.module,sectionTitle:"7. C_free vs C_obs",badge:"✨ Step 7",title:"Configuration Space: Point AMR in C_free vs. C_obs",htmlContent:`
      <div class="l03-two-col-layout" style="display: grid; grid-template-columns: 1fr 1.05fr; gap: 0.65rem; align-items: center;">
        <div class="l03-content-col" style="display: flex; flex-direction: column; justify-content: center; gap: 0.45rem;">
          <div class="l05-golden-card" style="padding: 0.45rem 0.7rem;">
            <div class="l05-golden-header" style="font-size: 0.8rem;"><span>🟢</span><strong>C_free Manifold</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.35;">The set of all configurations <code>q</code> where the robot does not collide: <code>C_free = {q &isin; C | &Ascr;(q) &cap; &Wscr;<sub>obs</sub> = &empty;}</code>.</p>
          </div>
          <div class="l05-golden-card" style="padding: 0.45rem 0.7rem;">
            <div class="l05-golden-header" style="font-size: 0.8rem;"><span>🔴</span><strong>C_obs (Forbidden Manifold)</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.35;">The set of forbidden configurations: <code>C_obs = C  C_free</code>. The robot point particle is strictly disallowed from entering <code>C_obs</code>.</p>
          </div>
        </div>
        <div class="l03-content-col" style="display: flex; flex-direction: column; justify-content: center;">
          <div style="background: var(--bg-surface); border: 1px solid var(--border-color); border-radius: 10px; padding: 0.45rem; box-shadow: 0 4px 14px rgba(0,0,0,0.12); text-align: center;">
            <img src="assets/images/nav_cspace_cfree_cobs.png" alt="Point AMR in C_free vs C_obs" style="width: 100%; max-height: 235px; object-fit: contain; border-radius: 6px; display: block; margin: 0 auto;" />
            <div style="margin-top: 0.35rem; font-size: 0.68rem; color: var(--text-muted); font-family: var(--font-sans);">
              Point AMR navigating safely through C_free between C_obs regions
            </div>
          </div>
        </div>
      </div>
    `}),a.push({id:`${t.id}_sec8_costmap_layers`,type:"concept",lessonNum:t.num_str,lessonId:t.id,module:t.module,sectionTitle:"8. Costmap 2D Layers",badge:"🗺️ Architecture",title:"Costmap 2D Architecture: The 3-Tier Layered Representation",htmlContent:`
      <div class="l03-two-col-layout" style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.65rem; align-items: center;">
        <div class="l03-content-col" style="display: flex; flex-direction: column; justify-content: center; gap: 0.4rem;">
          <div class="l05-golden-card" style="padding: 0.45rem 0.65rem;">
            <div class="l05-golden-header" style="font-size: 0.78rem;"><span>🗺️</span><strong>Layer 1: Static Layer</strong></div>
            <p style="font-size: 0.73rem; line-height: 1.32;">Loaded from pre-built SLAM map via <code>map_server</code>. Represents permanent structural walls, fixed warehouse columns, and keep-out zones.</p>
          </div>
          <div class="l05-golden-card" style="padding: 0.45rem 0.65rem;">
            <div class="l05-golden-header" style="font-size: 0.78rem;"><span>📡</span><strong>Layer 2: Obstacle / Voxel Layer</strong></div>
            <p style="font-size: 0.73rem; line-height: 1.32;">Subscribes to live 2D LiDAR <code>/scan</code> and 3D pointclouds. Dynamically inserts pallets, pedestrians, and moving forklifts with automatic ray-tracing clearing.</p>
          </div>
          <div class="l05-golden-card" style="padding: 0.45rem 0.65rem;">
            <div class="l05-golden-header" style="font-size: 0.78rem;"><span>🛡️</span><strong>Layer 3: Inflation Layer</strong></div>
            <p style="font-size: 0.73rem; line-height: 1.32;">Propagates obstacle costs outward using exponential decay curves, creating a smooth cost gradient that pushes global paths away from walls.</p>
          </div>
        </div>
        <div class="l03-content-col" style="display: flex; flex-direction: column; justify-content: center; gap: 0.4rem;">
          <div style="background: var(--bg-surface); border: 1px solid var(--border-color); border-radius: 8px; padding: 0.5rem; box-shadow: 0 4px 14px rgba(0,0,0,0.12);">
            <div style="font-size: 0.76rem; font-weight: bold; color: #0284c7; margin-bottom: 0.35rem;">
              Costmap Values (0 to 255)
            </div>
            <div style="display: flex; flex-direction: column; gap: 0.3rem; font-size: 0.71rem;">
              <div style="display: flex; justify-content: space-between; padding: 0.2rem 0.4rem; background: rgba(239, 68, 68, 0.15); border-left: 3px solid #ef4444; border-radius: 4px;">
                <strong>254 (Lethal Obstacle):</strong> Physical collision point
              </div>
              <div style="display: flex; justify-content: space-between; padding: 0.2rem 0.4rem; background: rgba(245, 158, 11, 0.15); border-left: 3px solid #f59e0b; border-radius: 4px;">
                <strong>253 (Inscribed Obstacle):</strong> Center within robot radius
              </div>
              <div style="display: flex; justify-content: space-between; padding: 0.2rem 0.4rem; background: rgba(59, 130, 246, 0.15); border-left: 3px solid #3b82f6; border-radius: 4px;">
                <strong>1 to 252 (Decay Gradient):</strong> Exponential inflation buffer
              </div>
              <div style="display: flex; justify-content: space-between; padding: 0.2rem 0.4rem; background: rgba(16, 185, 129, 0.15); border-left: 3px solid #10b981; border-radius: 4px;">
                <strong>0 (Free Space):</strong> Safe, unimpeded traversal
              </div>
            </div>
          </div>
        </div>
      </div>
    `}),a.push({id:`${t.id}_sec9_inflation_math`,type:"concept",lessonNum:t.num_str,lessonId:t.id,module:t.module,sectionTitle:"9. Inflation Mathematics",badge:"🧮 Formulation",title:"Inflation Layer Mathematics: Exponential Cost Decay & Safety Radii",htmlContent:`
      <div class="l03-two-col-layout" style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.65rem; align-items: center;">
        <div class="l03-content-col" style="display: flex; flex-direction: column; justify-content: center; gap: 0.4rem;">
          <div class="l05-golden-card" style="padding: 0.45rem 0.65rem;">
            <div class="l05-golden-header" style="font-size: 0.78rem;"><span>📐</span><strong>Decay Equation</strong></div>
            <p style="font-size: 0.73rem; line-height: 1.32;">For distance <code>d</code> from obstacle: <code>Cost(d) = 253 &times; exp(-&alpha; &times; (d - r<sub>inscribed</sub>))</code>. Ensures smooth gradient descent for local trajectory generation.</p>
          </div>
          <div class="l05-golden-card" style="padding: 0.45rem 0.65rem;">
            <div class="l05-golden-header" style="font-size: 0.78rem;"><span>🎯</span><strong>cost_scaling_factor (&alpha;)</strong></div>
            <p style="font-size: 0.73rem; line-height: 1.32;">Higher &alpha; causes steeper cost dropoff (robot hugs obstacles closer in narrow aisles); lower &alpha; creates wider safety margins in open spaces.</p>
          </div>
        </div>
        <div class="l03-content-col" style="display: flex; flex-direction: column; justify-content: center; gap: 0.4rem;">
          <div style="background: var(--bg-surface); border: 1px solid var(--border-color); border-radius: 8px; padding: 0.5rem; box-shadow: 0 4px 14px rgba(0,0,0,0.12);">
            <div style="font-size: 0.76rem; font-weight: bold; color: #0284c7; margin-bottom: 0.35rem;">
              Geometric Radius Hierarchy
            </div>
            <div style="display: flex; flex-direction: column; gap: 0.35rem; font-size: 0.71rem;">
              <div style="padding: 0.3rem 0.5rem; background: rgba(15, 23, 42, 0.6); border-radius: 4px;">
                <strong>Inscribed Radius (r<sub>inscribed</sub>):</strong> Radius of largest circle completely inside chassis (0.22 m for Nexus AMR).
              </div>
              <div style="padding: 0.3rem 0.5rem; background: rgba(15, 23, 42, 0.6); border-radius: 4px;">
                <strong>Circumscribed Radius (r<sub>circum</sub>):</strong> Radius of smallest circle enclosing all corners (0.32 m for Nexus AMR).
              </div>
              <div style="padding: 0.3rem 0.5rem; background: rgba(15, 23, 42, 0.6); border-radius: 4px;">
                <strong>Inflation Radius (r<sub>inflation</sub>):</strong> Maximum distance (e.g. 0.55 m) up to which cost values are propagated.
              </div>
            </div>
          </div>
        </div>
      </div>
    `}),a.push({id:`${t.id}_sec_title_discretization`,type:"section_title",lessonNum:t.num_str,lessonId:t.id,module:t.module,sectionTitle:"Part II: Discretization & Roadmaps",badge:"🗺️ Part II",title:"Discretization & Roadmaps",titleClass:"text-mapping",titleColor:"#d97706",description:"Transforming continuous Configuration Space into searchable topological graphs and discrete cell lattices."}),a.push({id:`${t.id}_sec10_roadmap_taxonomy`,type:"concept",lessonNum:t.num_str,lessonId:t.id,module:t.module,sectionTitle:"10. Path Planning Taxonomy",badge:"🗂️ Taxonomy",title:"Path Planning Taxonomy: Continuous vs. Discretized Roadmaps",htmlContent:`
      <div class="l03-two-col-layout" style="display: grid; grid-template-columns: 1fr 1.05fr; gap: 0.65rem; align-items: center;">
        <div class="l03-content-col" style="display: flex; flex-direction: column; justify-content: center; gap: 0.4rem;">
          <div class="l05-golden-card" style="padding: 0.45rem 0.65rem;">
            <div class="l05-golden-header" style="font-size: 0.78rem;"><span>📍</span><strong>RoadMap Methods</strong></div>
            <p style="font-size: 0.73rem; line-height: 1.32;">Construct a 1D network of navigable curves in C_free: Visibility Graphs (shortest path) and Voronoi Diagrams (maximum obstacle clearance).</p>
          </div>
          <div class="l05-golden-card" style="padding: 0.45rem 0.65rem;">
            <div class="l05-golden-header" style="font-size: 0.78rem;"><span>🧩</span><strong>Cell Decomposition</strong></div>
            <p style="font-size: 0.73rem; line-height: 1.32;">Partition C_free into contiguous non-overlapping regions: Exact Cell Decomposition (trapezoidal slicing) and Approximate Cell Decomposition (quadtrees).</p>
          </div>
          <div class="l05-golden-card" style="padding: 0.45rem 0.65rem;">
            <div class="l05-golden-header" style="font-size: 0.78rem;"><span>🔍</span><strong>Graph Search Algorithms</strong></div>
            <p style="font-size: 0.73rem; line-height: 1.32;">Once roadmaps or cells are formed, optimal pathfinding engines (A*, Dijkstra) evaluate node heuristics to produce the final trajectory.</p>
          </div>
        </div>
        <div class="l03-content-col" style="display: flex; flex-direction: column; justify-content: center;">
          <div style="background: var(--bg-surface); border: 1px solid var(--border-color); border-radius: 10px; padding: 0.45rem; box-shadow: 0 4px 14px rgba(0,0,0,0.12); text-align: center;">
            <img src="assets/images/nav_roadmap_taxonomy.png" alt="Path Planning Roadmap Taxonomy" style="width: 100%; max-height: 235px; object-fit: contain; border-radius: 6px; display: block; margin: 0 auto;" />
            <div style="margin-top: 0.35rem; font-size: 0.68rem; color: var(--text-muted); font-family: var(--font-sans);">
              Algorithmic taxonomy from RSE.pptx: Roadmap vs. Cell Decomposition vs. A* Search
            </div>
          </div>
        </div>
      </div>
    `}),a.push({id:`${t.id}_sec11_visibility_step1`,type:"concept",lessonNum:t.num_str,lessonId:t.id,module:t.module,sectionTitle:"11. Visibility Graph Step 1",badge:"👁️ Visibility Graph",title:"Visibility Graph: Interconnecting Visible Obstacle Vertices",htmlContent:`
      <div class="l03-two-col-layout" style="display: grid; grid-template-columns: 1fr 1.05fr; gap: 0.65rem; align-items: center;">
        <div class="l03-content-col" style="display: flex; flex-direction: column; justify-content: center; gap: 0.45rem;">
          <div class="l05-golden-card" style="padding: 0.45rem 0.7rem;">
            <div class="l05-golden-header" style="font-size: 0.8rem;"><span>👁️</span><strong>Line-of-Sight Interconnection</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.35;">The Visibility Graph connects the Start node, all polygon obstacle vertices, and the Goal node to each other wherever a direct straight line segment does not intersect obstacles.</p>
          </div>
          <div class="l05-golden-card" style="padding: 0.45rem 0.7rem;">
            <div class="l05-golden-header" style="font-size: 0.8rem;"><span>🕸️</span><strong>Roadmap Graph Structure</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.35;">Because every vertex is connected to all 'visible' peers, searching this graph guarantees finding the globally shortest Euclidean distance path.</p>
          </div>
        </div>
        <div class="l03-content-col" style="display: flex; flex-direction: column; justify-content: center;">
          <div style="background: var(--bg-surface); border: 1px solid var(--border-color); border-radius: 10px; padding: 0.45rem; box-shadow: 0 4px 14px rgba(0,0,0,0.12); text-align: center;">
            <img src="assets/images/nav_visibility_graph_step1.png" alt="Visibility Graph Interconnection" style="width: 100%; max-height: 235px; object-fit: contain; border-radius: 6px; display: block; margin: 0 auto;" />
            <div style="margin-top: 0.35rem; font-size: 0.68rem; color: var(--text-muted); font-family: var(--font-sans);">
              Connecting all obstacle vertices visible from each other in C_free
            </div>
          </div>
        </div>
      </div>
    `}),a.push({id:`${t.id}_sec12_visibility_step2`,type:"concept",lessonNum:t.num_str,lessonId:t.id,module:t.module,sectionTitle:"12. Visibility Graph Step 2",badge:"⚡ Shortest Path",title:"Visibility Graph: Shortest Euclidean Path & Corner Grazing",htmlContent:`
      <div class="l03-two-col-layout" style="display: grid; grid-template-columns: 1fr 1.05fr; gap: 0.65rem; align-items: center;">
        <div class="l03-content-col" style="display: flex; flex-direction: column; justify-content: center; gap: 0.45rem;">
          <div class="l05-golden-card" style="padding: 0.45rem 0.7rem;">
            <div class="l05-golden-header" style="font-size: 0.8rem;"><span>📏</span><strong>Optimal Euclidean Distance</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.35;">Running graph search on the visibility network computes the shortest possible trajectory from Start to Goal across 2D polygonal space.</p>
          </div>
          <div class="l05-golden-card" style="padding: 0.45rem 0.7rem;">
            <div class="l05-golden-header" style="font-size: 0.8rem;"><span>⚠️</span><strong>The Corner-Grazing Tradeoff</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.35;">Because paths pass directly through obstacle vertices, clearance is minimal (0 mm without inflation). Industrial AMRs require obstacle inflation to prevent chassis clipping.</p>
          </div>
        </div>
        <div class="l03-content-col" style="display: flex; flex-direction: column; justify-content: center;">
          <div style="background: var(--bg-surface); border: 1px solid var(--border-color); border-radius: 10px; padding: 0.45rem; box-shadow: 0 4px 14px rgba(0,0,0,0.12); text-align: center;">
            <img src="assets/images/nav_visibility_graph_step2.png" alt="Visibility Graph Shortest Path" style="width: 100%; max-height: 235px; object-fit: contain; border-radius: 6px; display: block; margin: 0 auto;" />
            <div style="margin-top: 0.35rem; font-size: 0.68rem; color: #10b981; font-family: var(--font-sans); font-weight: bold;">
              Optimal shortest path computed through the visibility roadmap
            </div>
          </div>
        </div>
      </div>
    `}),a.push({id:`${t.id}_sec13_voronoi`,type:"concept",lessonNum:t.num_str,lessonId:t.id,module:t.module,sectionTitle:"13. Voronoi Diagram",badge:"🛡️ Maximum Clearance",title:"Voronoi Diagram: Free-Space Bisectors & Maximum Clearance",htmlContent:`
      <div class="l03-two-col-layout" style="display: grid; grid-template-columns: 1fr 1.05fr; gap: 0.65rem; align-items: center;">
        <div class="l03-content-col" style="display: flex; flex-direction: column; justify-content: center; gap: 0.45rem;">
          <div class="l05-golden-card" style="padding: 0.45rem 0.7rem;">
            <div class="l05-golden-header" style="font-size: 0.8rem;"><span>⚖️</span><strong>Equidistant Bisectors</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.35;">A Voronoi Diagram consists of edges that bisect free space between obstacles. Every point on an edge is strictly equidistant from the two nearest obstacle boundaries.</p>
          </div>
          <div class="l05-golden-card" style="padding: 0.45rem 0.7rem;">
            <div class="l05-golden-header" style="font-size: 0.8rem;"><span>🛡️</span><strong>Maximized Safety Clearance</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.35;">Unlike visibility graphs which produce tight corner-grazing paths, Voronoi trajectories maximize distance from obstacles, providing maximum safety in busy industrial environments.</p>
          </div>
        </div>
        <div class="l03-content-col" style="display: flex; flex-direction: column; justify-content: center;">
          <div style="background: var(--bg-surface); border: 1px solid var(--border-color); border-radius: 10px; padding: 0.45rem; box-shadow: 0 4px 14px rgba(0,0,0,0.12); text-align: center;">
            <img src="assets/images/nav_voronoi_diagram.png" alt="Voronoi Diagram Bisectors" style="width: 100%; max-height: 235px; object-fit: contain; border-radius: 6px; display: block; margin: 0 auto;" />
            <div style="margin-top: 0.35rem; font-size: 0.68rem; color: var(--text-muted); font-family: var(--font-sans);">
              Voronoi graph: edges bisect free space equidistant from obstacles
            </div>
          </div>
        </div>
      </div>
    `}),a.push({id:`${t.id}_sec14_exact_cell_decomp`,type:"concept",lessonNum:t.num_str,lessonId:t.id,module:t.module,sectionTitle:"14. Exact Cell Decomposition",badge:"📐 Cell Slicing",title:"Exact Cell Decomposition: Trapezoidal & Triangular Slicing",htmlContent:`
      <div class="l03-two-col-layout" style="display: grid; grid-template-columns: 1fr 1.05fr; gap: 0.65rem; align-items: center;">
        <div class="l03-content-col" style="display: flex; flex-direction: column; justify-content: center; gap: 0.45rem;">
          <div class="l05-golden-card" style="padding: 0.45rem 0.7rem;">
            <div class="l05-golden-header" style="font-size: 0.8rem;"><span>✂️</span><strong>Vertical Vertex Slicing</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.35;">Exact cell decomposition divides free space into contiguous, non-overlapping convex trapezoids and triangles by extending vertical line segments from each obstacle vertex.</p>
          </div>
          <div class="l05-golden-card" style="padding: 0.45rem 0.7rem;">
            <div class="l05-golden-header" style="font-size: 0.8rem;"><span>🕸️</span><strong>Adjacency Dual Graph</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.35;">Nodes are placed at cell centroids and boundary midpoints. Connecting adjacent cells creates a topological graph searched from start cell to goal cell.</p>
          </div>
        </div>
        <div class="l03-content-col" style="display: flex; flex-direction: column; justify-content: center;">
          <div style="background: var(--bg-surface); border: 1px solid var(--border-color); border-radius: 10px; padding: 0.45rem; box-shadow: 0 4px 14px rgba(0,0,0,0.12); text-align: center;">
            <img src="assets/images/nav_exact_cell_decomp_step1.png" alt="Exact Cell Decomposition" style="width: 100%; max-height: 235px; object-fit: contain; border-radius: 6px; display: block; margin: 0 auto;" />
            <div style="margin-top: 0.35rem; font-size: 0.68rem; color: var(--text-muted); font-family: var(--font-sans);">
              Non-overlapping trapezoidal cells and resultant shortest path traversal
            </div>
          </div>
        </div>
      </div>
    `}),a.push({id:`${t.id}_sec15_approx_cell_decomp`,type:"concept",lessonNum:t.num_str,lessonId:t.id,module:t.module,sectionTitle:"15. Approx Cell Decomposition",badge:"🌳 Quadtrees",title:"Approximate Cell Decomposition: Recursive Quadtree Subdivision",htmlContent:`
      <div class="l03-two-col-layout" style="display: grid; grid-template-columns: 1fr 1.05fr; gap: 0.65rem; align-items: center;">
        <div class="l03-content-col" style="display: flex; flex-direction: column; justify-content: center; gap: 0.4rem;">
          <div class="l05-golden-card" style="padding: 0.45rem 0.65rem;">
            <div class="l05-golden-header" style="font-size: 0.78rem;"><span>🔲</span><strong>Three-State Cell Classification</strong></div>
            <p style="font-size: 0.73rem; line-height: 1.32;">The workspace is recursively divided into 4 quadrants. Each cell is labeled: <code>Empty</code> (entirely free), <code>Full</code> (completely occupied), or <code>Mixed</code> (partially occupied).</p>
          </div>
          <div class="l05-golden-card" style="padding: 0.45rem 0.65rem;">
            <div class="l05-golden-header" style="font-size: 0.78rem;"><span>🔄</span><strong>Hierarchical Refinement</strong></div>
            <p style="font-size: 0.73rem; line-height: 1.32;">If no contiguous chain of Empty cells connects Start to Goal, Mixed cells are subdivided into 4 sub-quadrants. As resolution increases, narrow passages emerge!</p>
          </div>
        </div>
        <div class="l03-content-col" style="display: flex; flex-direction: column; justify-content: center;">
          <div style="background: var(--bg-surface); border: 1px solid var(--border-color); border-radius: 10px; padding: 0.45rem; box-shadow: 0 4px 14px rgba(0,0,0,0.12); text-align: center;">
            <img src="assets/images/nav_approx_cell_decomp_step2.png" alt="Approximate Cell Decomposition Quadtree" style="width: 100%; max-height: 235px; object-fit: contain; border-radius: 6px; display: block; margin: 0 auto;" />
            <div style="margin-top: 0.35rem; font-size: 0.68rem; color: var(--text-muted); font-family: var(--font-sans);">
              Recursive quadtree subdivision revealing free corridor through mixed cells
            </div>
          </div>
        </div>
      </div>
    `}),a.push({id:`${t.id}_sec_title_graph_search`,type:"section_title",lessonNum:t.num_str,lessonId:t.id,module:t.module,sectionTitle:"Part III: Graph Search & Planning",badge:"🔍 Part III",title:"Graph Search & A* Algorithm",titleClass:"text-slam",titleColor:"#7c3aed",description:"Evaluating node frontiers with admissible heuristics to compute mathematically optimal global paths."}),a.push({id:`${t.id}_sec16_astar_formulation`,type:"concept",lessonNum:t.num_str,lessonId:t.id,module:t.module,sectionTitle:"16. A* Search Formulation",badge:"⭐ Formulation",title:"Graph Search: The A* Search Engine & Heuristic Function",htmlContent:`
      <div class="l03-two-col-layout" style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.65rem; align-items: center;">
        <div class="l03-content-col" style="display: flex; flex-direction: column; justify-content: center; gap: 0.4rem;">
          <div class="l05-golden-card" style="padding: 0.45rem 0.65rem;">
            <div class="l05-golden-header" style="font-size: 0.78rem;"><span>⭐</span><strong>Evaluation Function f(n) = g(n) + h(n)</strong></div>
            <p style="font-size: 0.73rem; line-height: 1.32;"><code>g(n)</code> = exact cumulative cost from start to node <code>n</code>.<br/><code>h(n)</code> = estimated cheapest cost from node <code>n</code> to goal (heuristic).<br/><code>f(n)</code> = total estimated path cost through node <code>n</code>.</p>
          </div>
          <div class="l05-golden-card" style="padding: 0.45rem 0.65rem;">
            <div class="l05-golden-header" style="font-size: 0.78rem;"><span>📋</span><strong>Priority Queue Frontier</strong></div>
            <p style="font-size: 0.73rem; line-height: 1.32;">A* orders candidate nodes in a min-heap priority queue by <code>f(n)</code>. At each iteration, the node with lowest <code>f(n)</code> is expanded, keeping paths short while driving toward the goal.</p>
          </div>
        </div>
        <div class="l03-content-col" style="display: flex; flex-direction: column; justify-content: center; gap: 0.4rem;">
          <div style="background: var(--bg-surface); border: 1px solid var(--border-color); border-radius: 8px; padding: 0.5rem; box-shadow: 0 4px 14px rgba(0,0,0,0.12);">
            <div style="font-size: 0.76rem; font-weight: bold; color: #7c3aed; margin-bottom: 0.35rem;">
              Heuristic Admissibility & Consistency
            </div>
            <div style="display: flex; flex-direction: column; gap: 0.35rem; font-size: 0.71rem;">
              <div style="padding: 0.3rem 0.45rem; background: rgba(124, 58, 237, 0.1); border-left: 3px solid #7c3aed; border-radius: 4px;">
                <strong>Admissible (h(n) &le; h*(n)):</strong> The heuristic never overestimates the true remaining distance (e.g. Euclidean straight-line distance). Guarantees optimal path!
              </div>
              <div style="padding: 0.3rem 0.45rem; background: rgba(59, 130, 246, 0.1); border-left: 3px solid #3b82f6; border-radius: 4px;">
                <strong>Dijkstra Equivalence:</strong> When <code>h(n) = 0</code> everywhere, A* degenerates into uniform-cost Dijkstra search.
              </div>
            </div>
          </div>
          <div class="l05-banner-intro" style="margin: 0; font-size: 0.71rem; padding: 0.35rem 0.6rem; border-left: 3px solid #7c3aed;">
            <strong>👉 Interactive Next:</strong> Click through the interactive state machine on the next slide to trace A* execution step-by-step!
          </div>
        </div>
      </div>
    `}),a.push({id:`${t.id}_interactive_astar`,type:"interactive",interactiveKey:"astar",lessonNum:t.num_str,lessonId:t.id,module:t.module,sectionTitle:"17. Interactive A* Search Engine",badge:"⚡ Interactive Simulation",title:"A* Graph Search: Step-by-Step On-Click State Machine"}),a.push({id:`${t.id}_sec_title_local_planning`,type:"section_title",lessonNum:t.num_str,lessonId:t.id,module:t.module,sectionTitle:"Part IV: Local Trajectory Planning",badge:"🏎️ Part IV",title:"Local Planning: Dynamic Window Approach",titleClass:"text-navigation",titleColor:"#e11d48",description:"Real-time velocity generation, acceleration feasibility windows, and forward trajectory rollout scoring."}),a.push({id:`${t.id}_sec17_dwa_rollout`,type:"concept",lessonNum:t.num_str,lessonId:t.id,module:t.module,sectionTitle:"18. DWA Velocity Sampling",badge:"🏎️ DWA Rollout",title:"Dynamic Window Approach (DWA): Velocity Sampling & Forward Rollout",htmlContent:`
      <div class="l03-two-col-layout" style="display: grid; grid-template-columns: 1fr 1.05fr; gap: 0.65rem; align-items: center;">
        <div class="l03-content-col" style="display: flex; flex-direction: column; justify-content: center; gap: 0.4rem;">
          <div class="l05-golden-card" style="padding: 0.45rem 0.65rem;">
            <div class="l05-golden-header" style="font-size: 0.78rem;"><span>1️⃣</span><strong>Dynamic Window Velocity Sampling</strong></div>
            <p style="font-size: 0.73rem; line-height: 1.32;">Sample candidate velocity pairs <code>(v, &omega;)</code> reachable within one simulation timestep <code>dt</code> based on actuator limits and acceleration limits: <code>v &isin; [v - a<sub>max</sub>dt, v + a<sub>max</sub>dt]</code>.</p>
          </div>
          <div class="l05-golden-card" style="padding: 0.45rem 0.65rem;">
            <div class="l05-golden-header" style="font-size: 0.78rem;"><span>2️⃣</span><strong>Forward Trajectory Simulation</strong></div>
            <p style="font-size: 0.73rem; line-height: 1.32;">For each sampled velocity pair, simulate the robot forward trajectory for <code>sim_time</code> (typically 1.5 to 2.5 seconds) using unicycle kinematics.</p>
          </div>
          <div class="l05-golden-card" style="padding: 0.45rem 0.65rem;">
            <div class="l05-golden-header" style="font-size: 0.78rem;"><span>3️⃣</span><strong>Collision Pruning & Best Pick</strong></div>
            <p style="font-size: 0.73rem; line-height: 1.32;">Discard trajectories intersecting lethal obstacles. Evaluate remaining trajectories with scoring critics, pick the highest score, and stream <code>/cmd_vel</code> at 20 Hz!</p>
          </div>
        </div>
        <div class="l03-content-col" style="display: flex; flex-direction: column; justify-content: center;">
          <div style="background: var(--bg-surface); border: 1px solid var(--border-color); border-radius: 10px; padding: 0.45rem; box-shadow: 0 4px 14px rgba(0,0,0,0.12); text-align: center;">
            <img src="assets/images/nav_dwa_local_planner.png" alt="DWA Local Planner Rollout" style="width: 100%; max-height: 235px; object-fit: contain; border-radius: 6px; display: block; margin: 0 auto;" />
            <div style="margin-top: 0.35rem; font-size: 0.68rem; color: var(--text-muted); font-family: var(--font-sans);">
              Velocity space sampling, forward rollout curves, and collision pruning
            </div>
          </div>
        </div>
      </div>
    `}),a.push({id:`${t.id}_sec18_dwb_critics`,type:"concept",lessonNum:t.num_str,lessonId:t.id,module:t.module,sectionTitle:"19. DWB Critic Scoring",badge:"⚖️ Scoring Matrix",title:"Nav2 DWB Controller: Multi-Objective Critic Scoring Matrix",htmlContent:`
      <div class="l03-two-col-layout" style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.65rem; align-items: center;">
        <div class="l03-content-col" style="display: flex; flex-direction: column; justify-content: center; gap: 0.4rem;">
          <div class="l05-golden-card" style="padding: 0.45rem 0.65rem;">
            <div class="l05-golden-header" style="font-size: 0.78rem;"><span>🎯</span><strong>Objective Function G(v, &omega;)</strong></div>
            <p style="font-size: 0.73rem; line-height: 1.32;"><code>G(v, &omega;) = &sum;<sub>i</sub> w<sub>i</sub> &times; Critic<sub>i</sub>(trajectory)</code>. Each critic inspects candidate rollouts on the local costmap and outputs a normalized scalar score.</p>
          </div>
          <div class="l05-golden-card" style="padding: 0.45rem 0.65rem;">
            <div class="l05-golden-header" style="font-size: 0.78rem;"><span>🛡️</span><strong>BaseObstacle Critic</strong></div>
            <p style="font-size: 0.73rem; line-height: 1.32;">Evaluates robot footprint along the simulated curve against the local costmap. Any footprint crossing lethal cells (254) is instantly rejected with negative infinity.</p>
          </div>
        </div>
        <div class="l03-content-col" style="display: flex; flex-direction: column; justify-content: center; gap: 0.35rem;">
          <div style="background: var(--bg-surface); border: 1px solid var(--border-color); border-radius: 8px; padding: 0.45rem; box-shadow: 0 4px 14px rgba(0,0,0,0.12);">
            <div style="font-size: 0.76rem; font-weight: bold; color: #e11d48; margin-bottom: 0.3rem;">
              DWB Critic Weighting Hierarchy
            </div>
            <div style="display: flex; flex-direction: column; gap: 0.25rem; font-size: 0.7rem;">
              <div style="padding: 0.25rem 0.45rem; background: rgba(15, 23, 42, 0.6); border-radius: 4px;">
                <strong>PathAlign (scale: 32.0):</strong> Penalizes heading deviation from global plan.
              </div>
              <div style="padding: 0.25rem 0.45rem; background: rgba(15, 23, 42, 0.6); border-radius: 4px;">
                <strong>GoalAlign (scale: 24.0):</strong> Penalizes robot heading pointing away from goal.
              </div>
              <div style="padding: 0.25rem 0.45rem; background: rgba(15, 23, 42, 0.6); border-radius: 4px;">
                <strong>PathDist (scale: 32.0):</strong> Penalizes perpendicular distance from global line.
              </div>
              <div style="padding: 0.25rem 0.45rem; background: rgba(15, 23, 42, 0.6); border-radius: 4px;">
                <strong>GoalDist (scale: 24.0):</strong> Incentivizes forward progress toward target.
              </div>
            </div>
          </div>
        </div>
      </div>
    `}),a.push({id:`${t.id}_sec_title_nav2_arch`,type:"section_title",lessonNum:t.num_str,lessonId:t.id,module:t.module,sectionTitle:"Part V: Nav2 Stack Architecture",badge:"🏗️ Part V",title:"Nav2 Stack & Path Planning Architecture",titleClass:"text-localization",titleColor:"#4f46e5",description:"Modular ROS 2 navigation framework integrating behavior trees, planners, controllers, costmaps, and recovery behaviors."}),a.push({id:`${t.id}_sec19_stack_block_diagram`,type:"concept",lessonNum:t.num_str,lessonId:t.id,module:t.module,sectionTitle:"20. Nav2 Stack Block Diagram",badge:"🏗️ Architecture Block Diagram",title:"Path Planning Stack Architecture: Complete System Block Diagram",htmlContent:`
      <div style="display: flex; flex-direction: column; gap: 0.45rem; width: 100%; height: 100%; justify-content: center;">
        {/* Responsive High-Contrast Architecture Block Diagram */}
        <div style="background: rgba(15, 23, 42, 0.85); border: 1px solid rgba(79, 70, 229, 0.35); border-radius: 10px; padding: 0.5rem 0.8rem; box-shadow: 0 4px 20px rgba(0,0,0,0.25);">
          <div style="display: grid; grid-template-columns: 0.85fr 2fr 0.85fr; gap: 0.6rem; align-items: center;">
            
            {/* Left Inputs Column */}
            <div style="display: flex; flex-direction: column; gap: 0.4rem;">
              <div style="font-size: 0.7rem; font-weight: bold; color: #06b6d4; text-transform: uppercase; letter-spacing: 0.5px;">
                Sensor & State Inputs
              </div>
              <div style="background: rgba(6, 182, 212, 0.12); border: 1px solid #06b6d4; border-radius: 6px; padding: 0.35rem 0.5rem; font-size: 0.7rem;">
                <div style="font-weight: bold; color: #22d3ee;">2D LiDAR</div>
                <code style="font-size: 0.65rem;">/scan (50 Hz)</code>
              </div>
              <div style="background: rgba(6, 182, 212, 0.12); border: 1px solid #06b6d4; border-radius: 6px; padding: 0.35rem 0.5rem; font-size: 0.7rem;">
                <div style="font-weight: bold; color: #22d3ee;">Wheel Odometry</div>
                <code style="font-size: 0.65rem;">/odom &amp; /tf</code>
              </div>
              <div style="background: rgba(6, 182, 212, 0.12); border: 1px solid #06b6d4; border-radius: 6px; padding: 0.35rem 0.5rem; font-size: 0.7rem;">
                <div style="font-weight: bold; color: #22d3ee;">Map Server</div>
                <code style="font-size: 0.65rem;">/map (.yaml &amp; .pgm)</code>
              </div>
            </div>

            {/* Center Core Stack Column */}
            <div style="display: flex; flex-direction: column; gap: 0.45rem;">
              {/* BT Navigator */}
              <div style="background: rgba(139, 92, 246, 0.15); border: 1.5px solid #8b5cf6; border-radius: 6px; padding: 0.4rem 0.6rem; text-align: center;">
                <div style="font-weight: bold; font-size: 0.76rem; color: #c084fc;">
                  BT Navigator (<code>bt_navigator</code>)
                </div>
                <div style="font-size: 0.66rem; color: #e2e8f0;">
                  XML Behavior Tree Orchestrator: Dispatches goals, handles recovery &amp; replanning logic
                </div>
              </div>

              {/* Planners & Controllers Dual Block */}
              <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.45rem;">
                {/* Global Planner */}
                <div style="background: rgba(59, 130, 246, 0.15); border: 1px solid #3b82f6; border-radius: 6px; padding: 0.35rem 0.5rem;">
                  <div style="font-weight: bold; font-size: 0.72rem; color: #60a5fa;">Global Planner</div>
                  <div style="font-size: 0.64rem; color: #cbd5e1;"><code>planner_server</code> (A* / Smac)</div>
                  <div style="font-size: 0.62rem; color: #94a3b8; margin-top: 0.2rem;">Over Global Costmap 2D</div>
                </div>
                {/* Local Controller */}
                <div style="background: rgba(16, 185, 129, 0.15); border: 1px solid #10b981; border-radius: 6px; padding: 0.35rem 0.5rem;">
                  <div style="font-weight: bold; font-size: 0.72rem; color: #34d399;">Local Controller</div>
                  <div style="font-size: 0.64rem; color: #cbd5e1;"><code>controller_server</code> (DWB / RPP)</div>
                  <div style="font-size: 0.62rem; color: #94a3b8; margin-top: 0.2rem;">Over Local Costmap (20 Hz)</div>
                </div>
              </div>

              {/* Recovery Behaviors Server */}
              <div style="background: rgba(245, 158, 11, 0.15); border: 1px solid #f59e0b; border-radius: 6px; padding: 0.3rem 0.6rem; display: flex; justify-content: space-between; align-items: center;">
                <span style="font-weight: bold; font-size: 0.7rem; color: #fbbf24;">Recovery Server (<code>behavior_server</code>)</span>
                <span style="font-size: 0.64rem; color: #fde68a;">Spin (360&deg;) &bull; BackUp (0.3m) &bull; Wait (2s)</span>
              </div>
            </div>

            {/* Right Actuators Output Column */}
            <div style="display: flex; flex-direction: column; gap: 0.4rem;">
              <div style="font-size: 0.7rem; font-weight: bold; color: #10b981; text-transform: uppercase; letter-spacing: 0.5px;">
                Motion Actuation
              </div>
              <div style="background: rgba(16, 185, 129, 0.18); border: 1.5px solid #10b981; border-radius: 6px; padding: 0.55rem 0.5rem; text-align: center;">
                <div style="font-weight: bold; font-size: 0.74rem; color: #34d399;">Velocity Command</div>
                <code style="font-size: 0.68rem; font-weight: bold;">/cmd_vel</code>
                <div style="font-size: 0.62rem; color: #a7f3d0; margin-top: 0.2rem;">geometry_msgs/Twist</div>
              </div>
              <div style="background: rgba(15, 23, 42, 0.6); border: 1px solid #475569; border-radius: 6px; padding: 0.35rem 0.5rem; font-size: 0.66rem; text-align: center; color: #94a3b8;">
                Diff-Drive Motor Base
              </div>
            </div>

          </div>
        </div>
        <div class="l05-banner-intro" style="margin: 0; font-size: 0.71rem; padding: 0.35rem 0.65rem; border-left: 3px solid #4f46e5;">
          <strong>💡 Architecture Separation:</strong> High-level mission decisions (Behavior Trees) are decoupled from global routing (Planner) and reactive obstacle avoidance (Controller).
        </div>
      </div>
    `}),a.push({id:`${t.id}_sec_title_practical_nav`,type:"section_title",lessonNum:t.num_str,lessonId:t.id,module:t.module,sectionTitle:"Part VI: ROS 2 Navigation Practical",badge:"🛠️ Part VI",title:"ROS 2 Navigation Practical",titleClass:"text-slam",titleColor:"#059669",description:"Hands-on workflow: package installation, workspace creation, launch & config files setup, and AMCL/Nav2 parameter tuning."}),a.push({id:`${t.id}_sec20_step1_install_packages`,type:"concept",lessonNum:t.num_str,lessonId:t.id,module:t.module,sectionTitle:"21. Practical Step 1: Install Packages",badge:"📦 Practical Step 1",title:"Practical Step 1: Install Required Nav2 & Localization Packages",htmlContent:`
      <div class="l03-two-col-layout" style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.65rem; align-items: center;">
        <div class="l03-content-col" style="display: flex; flex-direction: column; justify-content: center; gap: 0.4rem;">
          <div class="l05-golden-card" style="padding: 0.45rem 0.65rem;">
            <div class="l05-golden-header" style="font-size: 0.78rem;"><span>📦</span><strong>navigation2 &amp; nav2_bringup</strong></div>
            <p style="font-size: 0.73rem; line-height: 1.32;">Installs complete Nav2 metapackage: BT Navigator, Planner Server, Controller Server, Costmap 2D, and Map Server.</p>
          </div>
          <div class="l05-golden-card" style="padding: 0.45rem 0.65rem;">
            <div class="l05-golden-header" style="font-size: 0.78rem;"><span>📍</span><strong>nav2_amcl &amp; robot_localization</strong></div>
            <p style="font-size: 0.73rem; line-height: 1.32;">Provides Monte Carlo Localization (AMCL) against static map and EKF state estimation fusing wheel encoders and IMU.</p>
          </div>
        </div>
        <div class="l03-content-col" style="display: flex; flex-direction: column; justify-content: center;">
          <div class="ppt-terminal-window">
            <div class="ppt-term-header">
              <div class="term-dots"><span class="dot red"></span><span class="dot yellow"></span><span class="dot green"></span></div>
              <span class="term-title">student@amr-dev: ~ (bash)</span>
            </div>
            <pre class="ppt-term-body" style="font-size: 0.71rem; line-height: 1.4; padding: 0.5rem;"><code class="language-bash"># Update APT index
sudo apt update

# Install Nav2 and bringup metapackages
sudo apt install -y   ros-humble-navigation2   ros-humble-nav2-bringup   ros-humble-robot-localization

# Verify Nav2 packages are registered
ros2 pkg list | grep nav2</code></pre>
          </div>
        </div>
      </div>
    `}),a.push({id:`${t.id}_sec21_step2_create_package`,type:"concept",lessonNum:t.num_str,lessonId:t.id,module:t.module,sectionTitle:"22. Practical Step 2: Create Package",badge:"📁 Practical Step 2",title:"Practical Step 2: Create Navigation Package in Workspace",htmlContent:`
      <div class="l03-two-col-layout" style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.65rem; align-items: center;">
        <div class="l03-content-col" style="display: flex; flex-direction: column; justify-content: center; gap: 0.4rem;">
          <div class="l05-golden-card" style="padding: 0.45rem 0.65rem;">
            <div class="l05-golden-header" style="font-size: 0.78rem;"><span>📁</span><strong>nexus_amr_navigation Package</strong></div>
            <p style="font-size: 0.73rem; line-height: 1.32;">Dedicated deployment package holding robot-specific launch scripts, tuned costmap configurations, and warehouse maps.</p>
          </div>
          <div class="l05-golden-card" style="padding: 0.45rem 0.65rem;">
            <div class="l05-golden-header" style="font-size: 0.78rem;"><span>🗂️</span><strong>Clean Subdirectory Architecture</strong></div>
            <p style="font-size: 0.73rem; line-height: 1.32;">Follows ROS 2 standard directory layout: <code>config/</code> for YAML parameters, <code>launch/</code> for Python launch scripts, and <code>maps/</code> for serialized grids.</p>
          </div>
        </div>
        <div class="l03-content-col" style="display: flex; flex-direction: column; justify-content: center;">
          <div class="ppt-terminal-window">
            <div class="ppt-term-header">
              <div class="term-dots"><span class="dot red"></span><span class="dot yellow"></span><span class="dot green"></span></div>
              <span class="term-title">student@amr-dev: ~/ros2_ws/src (bash)</span>
            </div>
            <pre class="ppt-term-body" style="font-size: 0.71rem; line-height: 1.4; padding: 0.5rem;"><code class="language-bash">cd ~/ros2_ws/src

# Create Python navigation package
ros2 pkg create --build-type ament_python nexus_amr_navigation   --dependencies rclpy nav2_bringup geometry_msgs sensor_msgs

# Create structured asset subdirectories
cd nexus_amr_navigation
mkdir -p config launch maps rviz</code></pre>
          </div>
        </div>
      </div>
    `}),a.push({id:`${t.id}_sec22_step3_setup_config`,type:"concept",lessonNum:t.num_str,lessonId:t.id,module:t.module,sectionTitle:"23. Practical Step 3: Setup Config",badge:"⚙️ Practical Step 3",title:"Practical Step 3: Setup Configuration Files (nav2_params.yaml)",htmlContent:`
      <div class="l03-two-col-layout" style="display: grid; grid-template-columns: 1fr 1.05fr; gap: 0.65rem; align-items: center;">
        <div class="l03-content-col" style="display: flex; flex-direction: column; justify-content: center; gap: 0.4rem;">
          <div class="l05-golden-card" style="padding: 0.45rem 0.65rem;">
            <div class="l05-golden-header" style="font-size: 0.78rem;"><span>⚙️</span><strong>Centralized nav2_params.yaml</strong></div>
            <p style="font-size: 0.73rem; line-height: 1.32;">Contains node namespaces for <code>amcl</code>, <code>bt_navigator</code>, <code>controller_server</code>, <code>planner_server</code>, and <code>global/local_costmap</code>.</p>
          </div>
          <div class="l05-golden-card" style="padding: 0.45rem 0.65rem;">
            <div class="l05-golden-header" style="font-size: 0.78rem;"><span>🎯</span><strong>AMCL &amp; Costmap Alignment</strong></div>
            <p style="font-size: 0.73rem; line-height: 1.32;">Enforces robot footprint <code>[[-0.22, -0.16], [0.22, -0.16], [0.22, 0.16], [-0.22, 0.16]]</code> and laser scan topic matching.</p>
          </div>
        </div>
        <div class="l03-content-col" style="display: flex; flex-direction: column; justify-content: center;">
          <div class="ppt-ide-window">
            <div class="ppt-ide-header">
              <div class="ide-dots"><span class="dot red"></span><span class="dot yellow"></span><span class="dot green"></span></div>
              <span class="ide-file-tab">config/nav2_params.yaml</span>
            </div>
            <pre class="ppt-ide-body" style="font-size: 0.68rem; line-height: 1.35; padding: 0.5rem;"><code class="language-yaml">amcl:
  ros__parameters:
    min_particles: 500
    max_particles: 2000
    laser_model_type: "likelihood_field"

planner_server:
  ros__parameters:
    planner_plugins: ["GridBased"]
    GridBased:
      plugin: "nav2_navfn_planner/NavfnPlanner"
      use_astar: true

controller_server:
  ros__parameters:
    controller_frequency: 20.0
    controller_plugins: ["FollowPath"]
    FollowPath:
      plugin: "dwb_core::DWBLocalPlanner"
      max_vel_x: 0.6
      acc_lim_x: 1.5</code></pre>
          </div>
        </div>
      </div>
    `}),a.push({id:`${t.id}_sec23_step4_setup_launch`,type:"concept",lessonNum:t.num_str,lessonId:t.id,module:t.module,sectionTitle:"24. Practical Step 4: Setup Launch",badge:"🚀 Practical Step 4",title:"Practical Step 4: Setup Navigation Launch File (navigation.launch.py)",htmlContent:`
      <div class="l03-two-col-layout" style="display: grid; grid-template-columns: 1fr 1.05fr; gap: 0.65rem; align-items: center;">
        <div class="l03-content-col" style="display: flex; flex-direction: column; justify-content: center; gap: 0.4rem;">
          <div class="l05-golden-card" style="padding: 0.45rem 0.65rem;">
            <div class="l05-golden-header" style="font-size: 0.78rem;"><span>🚀</span><strong>nav2_bringup Integration</strong></div>
            <p style="font-size: 0.73rem; line-height: 1.32;">Rather than writing 10 individual node launchers, our launch file includes <code>bringup_launch.py</code> from <code>nav2_bringup</code>, passing customized map and parameter paths.</p>
          </div>
          <div class="l05-golden-card" style="padding: 0.45rem 0.65rem;">
            <div class="l05-golden-header" style="font-size: 0.78rem;"><span>🔄</span><strong>Lifecycle Autostart</strong></div>
            <p style="font-size: 0.73rem; line-height: 1.32;">Setting <code>autostart: True</code> automatically transitions all Nav2 managed lifecycle nodes from <em>Unconfigured</em> to <em>Active</em>.</p>
          </div>
        </div>
        <div class="l03-content-col" style="display: flex; flex-direction: column; justify-content: center;">
          <div class="ppt-ide-window">
            <div class="ppt-ide-header">
              <div class="ide-dots"><span class="dot red"></span><span class="dot yellow"></span><span class="dot green"></span></div>
              <span class="ide-file-tab">launch/navigation.launch.py</span>
            </div>
            <pre class="ppt-ide-body" style="font-size: 0.68rem; line-height: 1.35; padding: 0.5rem;"><code class="language-python">from launch import LaunchDescription
from launch.actions import IncludeLaunchDescription
from launch.launch_description_sources import PythonLaunchDescriptionSource
from launch_ros.substitutions import FindPackageShare
from launch.substitutions import PathJoinSubstitution

def generate_launch_description():
    pkg_share = FindPackageShare('nexus_amr_navigation')
    nav2_bringup = FindPackageShare('nav2_bringup')
    
    return LaunchDescription([
        IncludeLaunchDescription(
            PythonLaunchDescriptionSource(
                PathJoinSubstitution([nav2_bringup, 'launch', 'bringup_launch.py'])
            ),
            launch_arguments={
                'map': PathJoinSubstitution([pkg_share, 'maps', 'warehouse_map.yaml']),
                'params_file': PathJoinSubstitution([pkg_share, 'config', 'nav2_params.yaml']),
                'use_sim_time': 'True',
                'autostart': 'True'
            }.items()
        )
    ])</code></pre>
          </div>
        </div>
      </div>
    `}),a.push({id:`${t.id}_sec24_step5_launching_execution`,type:"concept",lessonNum:t.num_str,lessonId:t.id,module:t.module,sectionTitle:"25. Practical Step 5: Launch & RViz2",badge:"🎯 Practical Step 5",title:"Practical Step 5: Launching Navigation & Live RViz2 Mission Execution",htmlContent:`
      <div class="l03-two-col-layout" style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.65rem; align-items: center;">
        <div class="l03-content-col" style="display: flex; flex-direction: column; justify-content: center; gap: 0.4rem;">
          <div class="l05-golden-card" style="padding: 0.45rem 0.65rem;">
            <div class="l05-golden-header" style="font-size: 0.78rem;"><span>📍</span><strong>1. Set 2D Pose Estimate</strong></div>
            <p style="font-size: 0.73rem; line-height: 1.32;">Click '2D Pose Estimate' in RViz2 and drag an arrow matching the robot physical start location to initialize AMCL particle cloud.</p>
          </div>
          <div class="l05-golden-card" style="padding: 0.45rem 0.65rem;">
            <div class="l05-golden-header" style="font-size: 0.78rem;"><span>🎯</span><strong>2. Set 2D Goal Pose</strong></div>
            <p style="font-size: 0.73rem; line-height: 1.32;">Click 'Nav2 Goal' in RViz2 toolbar. Watch global planner produce green line and local DWB controller execute motion commands!</p>
          </div>
        </div>
        <div class="l03-content-col" style="display: flex; flex-direction: column; justify-content: center;">
          <div class="ppt-terminal-window">
            <div class="ppt-term-header">
              <div class="term-dots"><span class="dot red"></span><span class="dot yellow"></span><span class="dot green"></span></div>
              <span class="term-title">student@amr-dev: ~ (bash)</span>
            </div>
            <pre class="ppt-term-body" style="font-size: 0.71rem; line-height: 1.4; padding: 0.5rem;"><code class="language-bash"># Build workspace
cd ~/ros2_ws && colcon build --symlink-install
source install/setup.bash

# Terminal 1: Launch simulation & robot state
ros2 launch nexus_amr_description gazebo.launch.py

# Terminal 2: Launch Nav2 autonomous navigation
ros2 launch nexus_amr_navigation navigation.launch.py

# Observe RViz2: Nav2 Goal trajectory active!</code></pre>
          </div>
        </div>
      </div>
    `}),a.push({id:`${t.id}_sec25_step6_tuning_guide`,type:"concept",lessonNum:t.num_str,lessonId:t.id,module:t.module,sectionTitle:"26. Practical Step 6: Tuning Matrix",badge:"🎛️ Practical Step 6",title:"Practical Step 6: AMCL & Nav2 Production Parameter Tuning Guide",htmlContent:`
      <div style="display: flex; flex-direction: column; gap: 0.4rem; justify-content: center; height: 100%;">
        <div style="background: var(--bg-surface); border: 1px solid var(--border-color); border-radius: 8px; padding: 0.45rem; box-shadow: 0 4px 14px rgba(0,0,0,0.12);">
          <table style="width: 100%; border-collapse: collapse; font-size: 0.71rem; line-height: 1.35;">
            <thead>
              <tr style="background: rgba(15, 23, 42, 0.8); color: #60a5fa; text-align: left; border-bottom: 2px solid #3b82f6;">
                <th style="padding: 0.35rem 0.5rem;">Subsystem</th>
                <th style="padding: 0.35rem 0.5rem;">Parameter Name</th>
                <th style="padding: 0.35rem 0.5rem;">Nexus AMR Setting</th>
                <th style="padding: 0.35rem 0.5rem;">Production Impact</th>
              </tr>
            </thead>
            <tbody>
              <tr style="border-bottom: 1px solid var(--border-color);">
                <td style="padding: 0.35rem 0.5rem; font-weight: bold; color: #a78bfa;">AMCL</td>
                <td style="padding: 0.35rem 0.5rem;"><code>min_particles / max_particles</code></td>
                <td style="padding: 0.35rem 0.5rem;"><code>500 / 2000</code></td>
                <td style="padding: 0.35rem 0.5rem;">Prevents particle deprivation during rapid turns while bounding CPU usage.</td>
              </tr>
              <tr style="border-bottom: 1px solid var(--border-color);">
                <td style="padding: 0.35rem 0.5rem; font-weight: bold; color: #38bdf8;">Costmap 2D</td>
                <td style="padding: 0.35rem 0.5rem;"><code>inflation_radius / cost_scaling_factor</code></td>
                <td style="padding: 0.35rem 0.5rem;"><code>0.55 m / 3.0</code></td>
                <td style="padding: 0.35rem 0.5rem;">Maintains smooth safety gradient without blocking narrow warehouse door passages.</td>
              </tr>
              <tr style="border-bottom: 1px solid var(--border-color);">
                <td style="padding: 0.35rem 0.5rem; font-weight: bold; color: #34d399;">DWB Controller</td>
                <td style="padding: 0.35rem 0.5rem;"><code>max_vel_x / acc_lim_x</code></td>
                <td style="padding: 0.35rem 0.5rem;"><code>0.6 m/s / 1.5 m/s&sup2;</code></td>
                <td style="padding: 0.35rem 0.5rem;">Limits linear acceleration to eliminate wheel slip and motor stall.</td>
              </tr>
              <tr>
                <td style="padding: 0.35rem 0.5rem; font-weight: bold; color: #fbbf24;">Critics</td>
                <td style="padding: 0.35rem 0.5rem;"><code>PathAlign.scale / PathDist.scale</code></td>
                <td style="padding: 0.35rem 0.5rem;"><code>32.0 / 32.0</code></td>
                <td style="padding: 0.35rem 0.5rem;">Prevents AMR from drifting away from global path or cutting blind corners.</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="l05-banner-intro" style="margin: 0; font-size: 0.71rem; padding: 0.35rem 0.65rem; border-left: 3px solid #10b981;">
          <strong>🎯 Tuning Pro-Tip:</strong> Always tune AMCL localization first! If localization covariance is high, costmaps misalign and controllers produce erratic jerky motions.
        </div>
      </div>
    `}),a.push({id:`${t.id}_quiz_cspace_inflation`,type:"quiz",lessonNum:t.num_str,lessonId:t.id,module:t.module,sectionTitle:"Assessment: C-Space",title:"Configuration Space & Costmap Inflation",question:"Why do path planning algorithms inflate obstacle boundaries by the robot radius R to form Configuration Space (C-Space)?",options:["To increase 2D LiDAR detection range and improve laser scan reflectivity.","To allow the physical robot to be treated as an infinitesimal 0-radius point particle.","To speed up wheel encoder odometry integration rates from 50 Hz to 200 Hz.","To convert differential-drive kinematic models into omnidirectional holonomic models."],answer:1,explanation:"Inflating obstacles by the robot radius R (Minkowski sum W_obs &oplus; A) transforms the robot into a single point particle in C-Space, vastly simplifying collision checking during graph search."}),a.push({id:`${t.id}_quiz_astar_heuristics`,type:"quiz",lessonNum:t.num_str,lessonId:t.id,module:t.module,sectionTitle:"Assessment: A* & DWA",title:"A* Heuristic Admissibility & Local Control",question:"In the A* graph search evaluation function f(n) = g(n) + h(n), what mathematical property must heuristic h(n) satisfy to guarantee finding the shortest path?",options:["h(n) must equal zero for all non-terminal nodes in the search tree.","h(n) must be strictly greater than the actual remaining cost to force greedy expansion.","h(n) must be admissible (it must never overestimate the true remaining cost to the goal).","h(n) must be computed using Manhattan distance rather than Euclidean distance."],answer:2,explanation:"An admissible heuristic h(n) &le; h*(n) never overestimates the true cost to reach the goal. Admissibility mathematically guarantees that the first path popped to the goal is optimal."}),a.push({id:`${t.id}_sec26_summary`,type:"concept",lessonNum:t.num_str,lessonId:t.id,module:t.module,sectionTitle:"Summary & Key Takeaways",badge:"🎓 Lesson Summary",title:"Lesson 14 Summary & Key Takeaways",htmlContent:`
      <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 0.5rem; height: 100%; align-items: stretch;">
        <div style="background: var(--bg-surface); border: 1px solid var(--border-color); border-radius: 8px; padding: 0.5rem; display: flex; flex-direction: column; justify-content: space-between;">
          <div>
            <div style="font-size: 0.78rem; font-weight: bold; color: #0284c7; margin-bottom: 0.35rem; display: flex; align-items: center; gap: 0.3rem;">
              <span>📐</span> Continuous &amp; C-Space
            </div>
            <p style="font-size: 0.72rem; line-height: 1.35; color: var(--text-secondary);">Obstacle inflation by robot radius converts complex polygon collisions into simple 0-radius point pathfinding in C_free.</p>
          </div>
          <div style="font-size: 0.68rem; color: #0284c7; font-weight: bold;">
            Key: Swept volume clearance
          </div>
        </div>

        <div style="background: var(--bg-surface); border: 1px solid var(--border-color); border-radius: 8px; padding: 0.5rem; display: flex; flex-direction: column; justify-content: space-between;">
          <div>
            <div style="font-size: 0.78rem; font-weight: bold; color: #7c3aed; margin-bottom: 0.35rem; display: flex; align-items: center; gap: 0.3rem;">
              <span>⭐</span> Discretization &amp; A*
            </div>
            <p style="font-size: 0.72rem; line-height: 1.35; color: var(--text-secondary);">Roadmaps (Visibility, Voronoi, Cell Decomposition) discretize space. A* min-heap priority queue evaluates f(n) = g + h to guarantee optimal paths.</p>
          </div>
          <div style="font-size: 0.68rem; color: #7c3aed; font-weight: bold;">
            Key: Admissible heuristics
          </div>
        </div>

        <div style="background: var(--bg-surface); border: 1px solid var(--border-color); border-radius: 8px; padding: 0.5rem; display: flex; flex-direction: column; justify-content: space-between;">
          <div>
            <div style="font-size: 0.78rem; font-weight: bold; color: #10b981; margin-bottom: 0.35rem; display: flex; align-items: center; gap: 0.3rem;">
              <span>🏎️</span> DWA &amp; Nav2 Stack
            </div>
            <p style="font-size: 0.72rem; line-height: 1.35; color: var(--text-secondary);">DWA samples velocity space within acceleration limits. Nav2 stack decouples BT mission logic, global routing, and 20 Hz /cmd_vel execution.</p>
          </div>
          <div style="font-size: 0.68rem; color: #10b981; font-weight: bold;">
            Key: 20 Hz critic scoring
          </div>
        </div>
      </div>
    `})}function vi(s,t,a){a.push({id:`${t.id}_sec1_roadmap_taxonomy`,type:"concept",lessonNum:t.num_str,lessonId:t.id,module:t.module,sectionTitle:"1. Path Planning Roadmap Taxonomy",badge:"🗺️ Algorithm Hierarchy",title:"1. Path Planning Roadmap: Algorithmic Taxonomy & Hierarchy",htmlContent:`
      <div class="l03-two-col-layout">
        <div class="l03-content-col" style="display: flex; flex-direction: column; justify-content: space-between; gap: 0.35rem;">
          <div class="l05-golden-card" style="padding: 0.4rem 0.65rem;">
            <div class="l05-golden-header" style="font-size: 0.78rem;"><span>🌐</span><strong>Continuous Roadmaps</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.3;">Construct connected line networks in continuous space. Key approaches: <strong>Visibility Graphs</strong> (shortest path) and <strong>Voronoi Diagrams</strong> (maximum clearance).</p>
          </div>
          <div class="l05-golden-card" style="padding: 0.4rem 0.65rem;">
            <div class="l05-golden-header" style="font-size: 0.78rem;"><span>🔲</span><strong>Cell Decomposition</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.3;">Discretize space into polygons: <strong>Exact Cell Decomposition</strong> (trapezoids/triangles) and <strong>Approximate Cell Decomposition</strong> (Quadtree recursive subdivision).</p>
          </div>
          <div class="l05-golden-card" style="padding: 0.4rem 0.65rem;">
            <div class="l05-golden-header" style="font-size: 0.78rem;"><span>⭐</span><strong>Discrete Graph Search</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.3;">Once roadmaps or grids are formed, <strong>A* Search</strong> and Dijkstra traverse connectivity graphs to find optimal routes.</p>
          </div>
        </div>
        <div class="l03-content-col" style="display: flex; flex-direction: column; justify-content: center;">
          <div style="background: rgba(15, 23, 42, 0.65); border: 1px solid rgba(234, 179, 8, 0.35); border-radius: 8px; padding: 0.35rem; box-shadow: 0 4px 14px rgba(0,0,0,0.3);">
            <img src="assets/images/nav_roadmap_algorithms.png" alt="Path Planning Roadmap Taxonomy" style="width: 100%; max-height: 250px; object-fit: contain; border-radius: 6px; display: block;" />
            <div style="margin-top: 0.3rem; font-size: 0.68rem; color: #94a3b8; text-align: center; font-family: monospace;">
              Path Planning Algorithms: Roadmaps (Visibility/Voronoi), Cell Decomposition & A* Search
            </div>
          </div>
          <div class="l05-banner-intro" style="margin-top: 0.35rem; font-size: 0.72rem; padding: 0.35rem 0.65rem; border-left: 3px solid #eab308;">
            <strong>💡 Pedagogical Progression:</strong> We study each algorithm's geometric construction, trade-offs, and industrial application.
          </div>
        </div>
      </div>
    `}),a.push({id:`${t.id}_sec2_visibility_step1`,type:"concept",lessonNum:t.num_str,lessonId:t.id,module:t.module,sectionTitle:"2. Visibility Graph Step 1: Vertex Connection",badge:"👁️ Visibility Step 1 / 2",title:"2. Visibility Graph Step 1: Interconnecting Visible Obstacle Vertices",htmlContent:`
      <div class="l03-two-col-layout">
        <div class="l03-content-col" style="display: flex; flex-direction: column; justify-content: space-between; gap: 0.35rem;">
          <div class="l05-golden-card" style="padding: 0.4rem 0.65rem;">
            <div class="l05-golden-header" style="font-size: 0.78rem;"><span>👁️</span><strong>Line-of-Sight Visibility</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.3;">The Visibility Graph links the Start node, all obstacle polygon vertices, and the Goal node to each other wherever a straight unobstructed line exists.</p>
          </div>
          <div class="l05-golden-card" style="padding: 0.4rem 0.65rem;">
            <div class="l05-golden-header" style="font-size: 0.78rem;"><span>🚫</span><strong>Collision Occlusion Pruning</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.3;">Any connection that passes through an obstacle interior or intersects an obstacle edge is discarded as an invalid connection.</p>
          </div>
          <div class="l05-golden-card" style="padding: 0.4rem 0.65rem;">
            <div class="l05-golden-header" style="font-size: 0.78rem;"><span>🕸️</span><strong>Roadmap Graph Formation</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.3;">The resulting network connects every node to all other nodes visible from its physical coordinates, forming an undirected roadmap graph.</p>
          </div>
        </div>
        <div class="l03-content-col" style="display: flex; flex-direction: column; justify-content: center;">
          <div style="background: rgba(15, 23, 42, 0.65); border: 1px solid rgba(59, 130, 246, 0.35); border-radius: 8px; padding: 0.35rem; box-shadow: 0 4px 14px rgba(0,0,0,0.3);">
            <img src="assets/images/nav_visibility_graph_construction.png" alt="Visibility Graph Construction" style="width: 100%; max-height: 250px; object-fit: contain; border-radius: 6px; display: block;" />
            <div style="margin-top: 0.3rem; font-size: 0.68rem; color: #94a3b8; text-align: center; font-family: monospace;">
              Visibility Graph: Connecting start, goal, and all mutually visible obstacle vertices
            </div>
          </div>
          <div class="l05-banner-intro" style="margin-top: 0.35rem; font-size: 0.72rem; padding: 0.35rem 0.65rem; border-left: 3px solid #3b82f6;">
            <strong>💡 Construction Rule:</strong> An edge exists between vertex A and vertex B if and only if segment AB lies entirely within free space.
          </div>
        </div>
      </div>
    `}),a.push({id:`${t.id}_sec3_visibility_step2`,type:"concept",lessonNum:t.num_str,lessonId:t.id,module:t.module,sectionTitle:"3. Visibility Graph Step 2: Shortest Path",badge:"👁️ Visibility Step 2 / 2",title:"3. Visibility Graph Step 2: Shortest Path Graph Search",htmlContent:`
      <div class="l03-two-col-layout">
        <div class="l03-content-col" style="display: flex; flex-direction: column; justify-content: space-between; gap: 0.35rem;">
          <div class="l05-golden-card" style="padding: 0.4rem 0.65rem; border-left: 3px solid #10b981;">
            <div class="l05-golden-header" style="font-size: 0.78rem; color: #34d399;"><span>🏆</span><strong>Mathematically Shortest Path</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.3;">Running A* or Dijkstra search on the visibility graph finds the <strong>shortest possible route</strong> in continuous 2D Euclidean space from start to goal.</p>
          </div>
          <div class="l05-golden-card" style="padding: 0.4rem 0.65rem; border-left: 3px solid #f59e0b;">
            <div class="l05-golden-header" style="font-size: 0.78rem; color: #fbbf24;"><span>⚠️</span><strong>The Corner-Grazing Trade-off</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.3;">Because the shortest path connects obstacle vertices directly, it grazes dangerously close to obstacle corners with zero clearance margin.</p>
          </div>
          <div class="l05-golden-card" style="padding: 0.4rem 0.65rem;">
            <div class="l05-golden-header" style="font-size: 0.78rem;"><span>🏭</span><strong>Industrial Implication</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.3;">Requires significant obstacle inflation buffers before running search to prevent high-speed AMR wheels from scraping warehouse pallet corners.</p>
          </div>
        </div>
        <div class="l03-content-col" style="display: flex; flex-direction: column; justify-content: center;">
          <div style="background: rgba(15, 23, 42, 0.65); border: 1px solid rgba(16, 185, 129, 0.35); border-radius: 8px; padding: 0.35rem; box-shadow: 0 4px 14px rgba(0,0,0,0.3);">
            <img src="assets/images/nav_visibility_graph_shortest_path.png" alt="Shortest Path in Visibility Graph" style="width: 100%; max-height: 250px; object-fit: contain; border-radius: 6px; display: block;" />
            <div style="margin-top: 0.3rem; font-size: 0.68rem; color: #86efac; text-align: center; font-family: monospace;">
              Shortest Path: Graph search identifies the shortest Euclidean path hugging obstacle corners
            </div>
          </div>
          <div class="l05-banner-intro" style="margin-top: 0.35rem; font-size: 0.72rem; padding: 0.35rem 0.65rem; border-left: 3px solid #10b981;">
            <strong>💡 Alternative Philosophy:</strong> What if we want maximum clearance instead of minimum distance? We use Voronoi Diagrams!
          </div>
        </div>
      </div>
    `}),a.push({id:`${t.id}_sec4_voronoi`,type:"concept",lessonNum:t.num_str,lessonId:t.id,module:t.module,sectionTitle:"4. Voronoi Diagram: Maximum Clearance",badge:"🛡️ Maximum Clearance",title:"4. Voronoi Diagram: Free-Space Bisectors & Maximum Obstacle Clearance",htmlContent:`
      <div class="l03-two-col-layout">
        <div class="l03-content-col" style="display: flex; flex-direction: column; justify-content: space-between; gap: 0.35rem;">
          <div class="l05-golden-card" style="padding: 0.4rem 0.65rem;">
            <div class="l05-golden-header" style="font-size: 0.78rem;"><span>⚖️</span><strong>Equidistant Free-Space Bisectors</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.3;">A Voronoi Diagram is a graph whose edges bisect the free space midway between obstacles. Every edge lies strictly equidistant from surrounding hazards.</p>
          </div>
          <div class="l05-golden-card" style="padding: 0.4rem 0.65rem; border-left: 3px solid #10b981;">
            <div class="l05-golden-header" style="font-size: 0.78rem; color: #34d399;"><span>🛡️</span><strong>Maximum Clearance Guarantee</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.3;">Unlike visibility graphs that hug walls, Voronoi diagrams <strong>maximize clearance</strong>, guiding the robot down the safest center aisle of warehouse corridors.</p>
          </div>
          <div class="l05-golden-card" style="padding: 0.4rem 0.65rem;">
            <div class="l05-golden-header" style="font-size: 0.78rem;"><span>📈</span><strong>Sub-optimal Path Length</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.3;">The path is longer than the visibility graph route, but it provides the largest margin of safety against sensor noise and dynamic obstacles.</p>
          </div>
        </div>
        <div class="l03-content-col" style="display: flex; flex-direction: column; justify-content: center;">
          <div style="background: rgba(15, 23, 42, 0.65); border: 1px solid rgba(16, 185, 129, 0.35); border-radius: 8px; padding: 0.35rem; box-shadow: 0 4px 14px rgba(0,0,0,0.3);">
            <img src="assets/images/nav_voronoi_diagram_clearance.png" alt="Voronoi Diagram Clearance" style="width: 100%; max-height: 250px; object-fit: contain; border-radius: 6px; display: block;" />
            <div style="margin-top: 0.3rem; font-size: 0.68rem; color: #86efac; text-align: center; font-family: monospace;">
              Voronoi Diagram: Edges lie equidistant from obstacles with greatest possible clearance
            </div>
          </div>
          <div class="l05-banner-intro" style="margin-top: 0.35rem; font-size: 0.72rem; padding: 0.35rem 0.65rem; border-left: 3px solid #10b981;">
            <strong>💡 Modern Use:</strong> Nav2's Smac Planner uses Voronoi fields in its heuristic to pull paths naturally toward corridor centerlines!
          </div>
        </div>
      </div>
    `}),a.push({id:`${t.id}_sec5_exact_cell_decomp`,type:"concept",lessonNum:t.num_str,lessonId:t.id,module:t.module,sectionTitle:"5. Exact Cell Decomposition",badge:"📐 Exact Decomposition",title:"5. Exact Cell Decomposition: Trapezoidal & Triangular Slicing",htmlContent:`
      <div class="l03-two-col-layout">
        <div class="l03-content-col" style="display: flex; flex-direction: column; justify-content: space-between; gap: 0.35rem;">
          <div class="l05-golden-card" style="padding: 0.4rem 0.65rem;">
            <div class="l05-golden-header" style="font-size: 0.78rem;"><span>✂️</span><strong>Vertical Line Segment Projection</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.3;">Exact cell decomposition divides free space into non-overlapping cells by projecting vertical line segments up and down from every obstacle vertex.</p>
          </div>
          <div class="l05-golden-card" style="padding: 0.4rem 0.65rem;">
            <div class="l05-golden-header" style="font-size: 0.78rem;"><span>📐</span><strong>Convex Polygon Partitioning</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.3;">Slices free space into simple trapezoids and triangles. Because each cell is convex, moving between any two points inside a cell is guaranteed collision-free!</p>
          </div>
          <div class="l05-golden-card" style="padding: 0.4rem 0.65rem;">
            <div class="l05-golden-header" style="font-size: 0.78rem;"><span>🔗</span><strong>Adjacency Channel Graph</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.3;">Nodes are placed at cell centroids and boundary midpoints. Searching this graph yields an ordered sequence of channel portals from start to goal.</p>
          </div>
        </div>
        <div class="l03-content-col" style="display: flex; flex-direction: column; justify-content: center;">
          <div style="background: rgba(15, 23, 42, 0.65); border: 1px solid rgba(168, 85, 247, 0.35); border-radius: 8px; padding: 0.35rem; box-shadow: 0 4px 14px rgba(0,0,0,0.3);">
            <img src="assets/images/nav_exact_cell_decomposition.png" alt="Exact Cell Decomposition" style="width: 100%; max-height: 250px; object-fit: contain; border-radius: 6px; display: block;" />
            <div style="margin-top: 0.3rem; font-size: 0.68rem; color: #d8b4fe; text-align: center; font-family: monospace;">
              Exact Cell Decomposition: Vertical lines at obstacle vertices partition space into trapezoids
            </div>
          </div>
          <div class="l05-banner-intro" style="margin-top: 0.35rem; font-size: 0.72rem; padding: 0.35rem 0.65rem; border-left: 3px solid #a855f7;">
            <strong>💡 Completeness:</strong> Exact cell decomposition is mathematically complete—if a valid path exists in free space, it is guaranteed to be found.
          </div>
        </div>
      </div>
    `}),a.push({id:`${t.id}_sec6_approx_cell_decomp`,type:"concept",lessonNum:t.num_str,lessonId:t.id,module:t.module,sectionTitle:"6. Approximate Cell Decomposition",badge:"🔲 Quadtree Decomposition",title:"6. Approximate Cell Decomposition: Recursive Quadtree Subdivision",htmlContent:`
      <div class="l03-two-col-layout">
        <div class="l03-content-col" style="display: flex; flex-direction: column; justify-content: space-between; gap: 0.35rem;">
          <div class="l05-golden-card" style="padding: 0.4rem 0.65rem;">
            <div class="l05-golden-header" style="font-size: 0.78rem;"><span>4️⃣</span><strong>Four Quadrant Decomposition</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.3;">Decomposes space recursively into four quadrants. Each quadrant is classified into one of three states: <strong>Empty</strong>, <strong>Full</strong>, or <strong>Mixed</strong>.</p>
          </div>
          <div class="l05-golden-card" style="padding: 0.4rem 0.65rem;">
            <div class="l05-golden-header" style="font-size: 0.78rem;"><span>🔀</span><strong>The "Mixed" Cell Label</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.3;">Represents cells that contain both obstacle portions and free space. If an all-empty path cannot be found, mixed cells are quartered again.</p>
          </div>
          <div class="l05-golden-card" style="padding: 0.4rem 0.65rem;">
            <div class="l05-golden-header" style="font-size: 0.78rem;"><span>🌲</span><strong>Hierarchical Quadtree Storage</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.3;">Large open warehouse areas remain as single large cells, while fine detail is allocated only around tight rack corners—saving massive memory.</p>
          </div>
        </div>
        <div class="l03-content-col" style="display: flex; flex-direction: column; justify-content: center;">
          <div style="background: rgba(15, 23, 42, 0.65); border: 1px solid rgba(234, 179, 8, 0.35); border-radius: 8px; padding: 0.35rem; box-shadow: 0 4px 14px rgba(0,0,0,0.3);">
            <img src="assets/images/nav_approx_cell_decomposition_iterations.png" alt="Approx Cell Decomposition Quadtree" style="width: 100%; max-height: 250px; object-fit: contain; border-radius: 6px; display: block;" />
            <div style="margin-top: 0.3rem; font-size: 0.68rem; color: #94a3b8; text-align: center; font-family: monospace;">
              Approximate Cell Decomposition: Iterative recursive quadtree refinement revealing free channels
            </div>
          </div>
          <div class="l05-banner-intro" style="margin-top: 0.35rem; font-size: 0.72rem; padding: 0.35rem 0.65rem; border-left: 3px solid #eab308;">
            <strong>💡 Convergence:</strong> Through successive iterations, more free cells emerge until a connected sequence links Start to Goal.
          </div>
        </div>
      </div>
    `}),a.push({id:`${t.id}_sec7_astar_search`,type:"concept",lessonNum:t.num_str,lessonId:t.id,module:t.module,sectionTitle:"7. Graph Search: A* Algorithm",badge:"⭐ A* Search Engine",title:"7. Graph Search: The A* Search Engine & Heuristic Function",htmlContent:`
      <div class="l03-two-col-layout">
        <div class="l03-content-col" style="display: flex; flex-direction: column; justify-content: space-between; gap: 0.35rem;">
          <div class="l05-golden-card" style="padding: 0.4rem 0.65rem;">
            <div class="l05-golden-header" style="font-size: 0.78rem;"><span>📐</span><strong>The Evaluation Function f(n)</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.3;"><code>f(n) = g(n) + h(n)</code> balances the known past cost against estimated future progress toward the goal destination.</p>
          </div>
          <div class="l05-golden-card" style="padding: 0.4rem 0.65rem;">
            <div class="l05-golden-header" style="font-size: 0.78rem;"><span>📏</span><strong>g(n): Exact Path Cost</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.3;">The exact accumulated travel cost from Start to the current node <code>n</code>, factoring in traversal distance and costmap obstacle inflation penalties.</p>
          </div>
          <div class="l05-golden-card" style="padding: 0.4rem 0.65rem;">
            <div class="l05-golden-header" style="font-size: 0.78rem;"><span>🎯</span><strong>h(n): Admissible Heuristic</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.3;">Estimated distance from node <code>n</code> to Goal. If <code>h(n) &le; true cost</code> (e.g. straight Euclidean distance), A* is mathematically guaranteed optimal.</p>
          </div>
        </div>
        <div class="l03-content-col" style="display: flex; flex-direction: column; justify-content: center;">
          <div style="background: rgba(15, 23, 42, 0.65); border: 1px solid rgba(234, 179, 8, 0.35); border-radius: 8px; padding: 0.4rem; box-shadow: 0 4px 14px rgba(0,0,0,0.3);">
            <div style="font-family: monospace; font-size: 0.82rem; color: #fbbf24; text-align: center; margin-bottom: 0.3rem;">
              f(n) = g(n) + h(n)
            </div>
            <div style="font-size: 0.71rem; line-height: 1.45; color: #cbd5e1;">
              <strong>1. Open Priority Queue:</strong> Nodes sorted by lowest <code>f(n)</code>.<br>
              <strong>2. Directed Expansion:</strong> Heuristic pulls search directly toward target, avoiding blind radial flood fill.<br>
              <strong>3. Nav2 Implementations:</strong> <code>NavFn</code> (Dijkstra / A*) and <code>SmacPlanner2D</code> (highly optimized modern A*).
            </div>
          </div>
          <div class="l05-banner-intro" style="margin-top: 0.35rem; font-size: 0.72rem; padding: 0.35rem 0.65rem; border-left: 3px solid #eab308;">
            <strong>💡 Global vs Local:</strong> A* solves the global path at 1 Hz. But to follow it at 20 Hz without hitting dynamic obstacles, we need local planners!
          </div>
        </div>
      </div>
    `}),a.push({id:`${t.id}_sec8_dwa_rollout`,type:"concept",lessonNum:t.num_str,lessonId:t.id,module:t.module,sectionTitle:"8. DWA Local Planner Mechanics",badge:"⏱️ 20 Hz Local Controller",title:"8. Dynamic Window Approach (DWA): Velocity Sampling & Forward Rollout",htmlContent:`
      <div class="l03-two-col-layout">
        <div class="l03-content-col" style="display: flex; flex-direction: column; justify-content: space-between; gap: 0.35rem;">
          <div class="l05-golden-card" style="padding: 0.4rem 0.65rem;">
            <div class="l05-golden-header" style="font-size: 0.78rem;"><span>1️⃣</span><strong>Sample Velocities (v, &omega;)</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.3;">Discretely samples candidate linear velocities <code>v</code> and angular velocities <code>&omega;</code> reachable within the dynamic acceleration window.</p>
          </div>
          <div class="l05-golden-card" style="padding: 0.4rem 0.65rem;">
            <div class="l05-golden-header" style="font-size: 0.78rem;"><span>2️⃣</span><strong>Forward Simulation Rollout</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.3;">Numerically rolls out candidate trajectories forward over a short time horizon (e.g. 1.5s) to predict future poses assuming velocity is held constant.</p>
          </div>
          <div class="l05-golden-card" style="padding: 0.4rem 0.65rem;">
            <div class="l05-golden-header" style="font-size: 0.78rem;"><span>3️⃣</span><strong>Score Trajectories & Execute</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.3;">Discards colliding trajectories. Evaluates remaining arcs with critics, picks the highest-scoring <code>(v, &omega;)</code>, sends to motors, and repeats at 20 Hz.</p>
          </div>
        </div>
        <div class="l03-content-col" style="display: flex; flex-direction: column; justify-content: center;">
          <div style="background: rgba(15, 23, 42, 0.65); border: 1px solid rgba(59, 130, 246, 0.35); border-radius: 8px; padding: 0.35rem; box-shadow: 0 4px 14px rgba(0,0,0,0.3);">
            <img src="assets/images/nav_dwa_local_planner_rollout.png" alt="DWA Local Planner Rollout" style="width: 100%; max-height: 250px; object-fit: contain; border-radius: 6px; display: block;" />
            <div style="margin-top: 0.3rem; font-size: 0.68rem; color: #94a3b8; text-align: center; font-family: monospace;">
              DWA Rollout: Forward simulation trajectories evaluated against dynamic obstacles
            </div>
          </div>
          <div class="l05-banner-intro" style="margin-top: 0.35rem; font-size: 0.72rem; padding: 0.35rem 0.65rem; border-left: 3px solid #3b82f6;">
            <strong>💡 The DWA Loop:</strong> Sample &rarr; Forward Rollout &rarr; Evaluate Critics &rarr; Send Highest Score Velocity &rarr; Repeat at 20 Hz.
          </div>
        </div>
      </div>
    `}),a.push({id:`${t.id}_sec9_dwb_critics`,type:"concept",lessonNum:t.num_str,lessonId:t.id,module:t.module,sectionTitle:"9. Nav2 DWB Controller",badge:"🎯 DWB Trajectory Scoring",title:"9. Nav2 DWB Controller: Forward Simulation & Critic Scoring Matrix",htmlContent:`
      <div class="l03-two-col-layout">
        <div class="l03-content-col" style="display: flex; flex-direction: column; justify-content: space-between; gap: 0.35rem;">
          <div class="l05-golden-card" style="padding: 0.4rem 0.65rem;">
            <div class="l05-golden-header" style="font-size: 0.78rem;"><span>🚜</span><strong>Modular Critic Plugins</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.3;">DWB modernizes ROS 1 DWA by breaking trajectory evaluation into modular, independently weighted critic plugins in <code>nav2_params.yaml</code>.</p>
          </div>
          <div class="l05-golden-card" style="padding: 0.4rem 0.65rem;">
            <div class="l05-golden-header" style="font-size: 0.78rem;"><span>📊</span><strong>Linear Weighted Sum</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.3;"><code>Total Score = &Sigma; (Weight_i &times; Score_i)</code>. Any trajectory that touches an obstacle cell in the local costmap receives an immediate score of &infin; (illegal).</p>
          </div>
          <div class="l05-golden-card" style="padding: 0.4rem 0.65rem;">
            <div class="l05-golden-header" style="font-size: 0.78rem;"><span>🔄</span><strong>Non-Holonomic Feasibility</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.3;">Rollout trajectories obey differential drive kinematic limits: <code>v_y = 0</code> (no sideways crab crawl) and respect maximum wheel acceleration limits.</p>
          </div>
        </div>
        <div class="l03-content-col" style="display: flex; flex-direction: column; justify-content: center;">
          <div style="background: rgba(15, 23, 42, 0.65); border: 1px solid rgba(234, 179, 8, 0.35); border-radius: 8px; padding: 0.4rem; box-shadow: 0 4px 14px rgba(0,0,0,0.3);">
            <div style="font-size: 0.76rem; font-weight: bold; color: #fbbf24; margin-bottom: 0.3rem;">
              Critical DWB Critic Components
            </div>
            <ul style="font-size: 0.71rem; line-height: 1.4; color: #cbd5e1; margin: 0; padding-left: 1.1rem;">
              <li><code>BaseObstacle</code>: Penalizes proximity to obstacles (clearance).</li>
              <li><code>PathAlign</code>: Heading alignment with global path tangent.</li>
              <li><code>GoalAlign</code>: Heading alignment directly toward goal.</li>
              <li><code>PathDist</code>: Cross-track distance away from global path.</li>
              <li><code>RotateToGoal</code>: Enforces in-place rotation at destination.</li>
            </ul>
          </div>
          <div class="l05-banner-intro" style="margin-top: 0.35rem; font-size: 0.72rem; padding: 0.35rem 0.65rem; border-left: 3px solid #eab308;">
            <strong>💡 Tuning Balance:</strong> If <code>PathDist</code> is too high, the robot refuses to steer around dynamic obstacles. If too low, it wanders off path!
          </div>
        </div>
      </div>
    `}),a.push({id:`${t.id}_sec10_dwb_tuning_matrix`,type:"concept",lessonNum:t.num_str,lessonId:t.id,module:t.module,sectionTitle:"10. DWB Critic Matrix",badge:"⚖️ DWB Critic Matrix",title:"10. DWB Critic Scoring Matrix: Balancing Clearance, Speed & Goal Accuracy",htmlContent:`
      <div style="background: rgba(15, 23, 42, 0.65); border: 1px solid rgba(234, 179, 8, 0.3); border-radius: 8px; padding: 0.4rem; box-shadow: 0 4px 14px rgba(0,0,0,0.3);">
        <table class="l03-table" style="width: 100%; border-collapse: collapse; font-size: 0.71rem;">
          <thead>
            <tr style="background: rgba(30, 41, 59, 0.8); color: #fbbf24; border-bottom: 2px solid #eab308;">
              <th style="padding: 0.3rem 0.4rem; text-align: left; width: 18%;">Critic Plugin</th>
              <th style="padding: 0.3rem 0.4rem; text-align: left; width: 12%;">Default</th>
              <th style="padding: 0.3rem 0.4rem; text-align: left; width: 40%;">Behavioral Metric</th>
              <th style="padding: 0.3rem 0.4rem; text-align: left; width: 30%;">Tuning Recommendation</th>
            </tr>
          </thead>
          <tbody>
            <tr style="border-bottom: 1px solid rgba(255, 255, 255, 0.08);">
              <td style="padding: 0.25rem 0.4rem;"><code>BaseObstacle</code></td>
              <td style="padding: 0.25rem 0.4rem;"><code>0.02</code></td>
              <td style="padding: 0.25rem 0.4rem;">Penalizes trajectories grazing close to costmap obstacles.</td>
              <td style="padding: 0.25rem 0.4rem;">Increase if robot clips rack corners in turns.</td>
            </tr>
            <tr style="border-bottom: 1px solid rgba(255, 255, 255, 0.08);">
              <td style="padding: 0.25rem 0.4rem;"><code>PathAlign</code></td>
              <td style="padding: 0.25rem 0.4rem;"><code>32.0</code></td>
              <td style="padding: 0.25rem 0.4rem;">Keeps robot heading aligned with global path direction.</td>
              <td style="padding: 0.25rem 0.4rem;">High weight ensures straight aisle travel.</td>
            </tr>
            <tr style="border-bottom: 1px solid rgba(255, 255, 255, 0.08);">
              <td style="padding: 0.25rem 0.4rem;"><code>GoalAlign</code></td>
              <td style="padding: 0.25rem 0.4rem;"><code>24.0</code></td>
              <td style="padding: 0.25rem 0.4rem;">Orients robot heading directly towards goal destination.</td>
              <td style="padding: 0.25rem 0.4rem;">Prevents overshooting the target waypoint.</td>
            </tr>
            <tr style="border-bottom: 1px solid rgba(255, 255, 255, 0.08);">
              <td style="padding: 0.25rem 0.4rem;"><code>PathDist</code></td>
              <td style="padding: 0.25rem 0.4rem;"><code>32.0</code></td>
              <td style="padding: 0.25rem 0.4rem;">Penalizes cross-track distance away from global path.</td>
              <td style="padding: 0.25rem 0.4rem;">Keeps robot glued to corridor centerlines.</td>
            </tr>
            <tr>
              <td style="padding: 0.25rem 0.4rem;"><code>RotateToGoal</code></td>
              <td style="padding: 0.25rem 0.4rem;"><code>32.0</code></td>
              <td style="padding: 0.25rem 0.4rem;">Enforces final in-place rotation when within XY tolerance.</td>
              <td style="padding: 0.25rem 0.4rem;">Crucial for docking into pallet stands.</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="l05-banner-intro" style="margin-top: 0.35rem; font-size: 0.72rem; padding: 0.35rem 0.65rem; border-left: 3px solid #eab308;">
        <strong>⚖️ Golden Rule:</strong> Never change multiple critic weights simultaneously! Adjust one weight by 2x, test trajectory smoothness, and verify oscillation stability.
      </div>
    `}),a.push({id:`${t.id}_sec11_rpp_controller`,type:"concept",lessonNum:t.num_str,lessonId:t.id,module:t.module,sectionTitle:"11. Regulated Pure Pursuit (RPP)",badge:"📐 Pure Pursuit",title:"11. Regulated Pure Pursuit (RPP): Deterministic Industrial Path Tracking",htmlContent:`
      <div class="l03-two-col-layout">
        <div class="l03-content-col" style="display: flex; flex-direction: column; justify-content: space-between; gap: 0.35rem;">
          <div class="l05-golden-card" style="padding: 0.4rem 0.65rem;">
            <div class="l05-golden-header" style="font-size: 0.78rem;"><span>🎯</span><strong>Geometric Lookahead Arc</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.3;">RPP projects an imaginary anchor point along the global path at distance <code>L_lookahead</code>. It calculates the exact geometric curvature arc required to steer toward it.</p>
          </div>
          <div class="l05-golden-card" style="padding: 0.4rem 0.65rem;">
            <div class="l05-golden-header" style="font-size: 0.78rem;"><span>📉</span><strong>Automatic Curvature Deceleration</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.3;">Slows down automatically in sharp corners proportional to path curvature radius, preventing AMR chassis tipping or wheel skid under load.</p>
          </div>
          <div class="l05-golden-card" style="padding: 0.4rem 0.65rem;">
            <div class="l05-golden-header" style="font-size: 0.78rem;"><span>🏭</span><strong>Industrial Predictability</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.3;">DWB can exhibit exploratory swerves. RPP produces perfectly predictable, repeatable train-track paths preferred in commercial logistics.</p>
          </div>
        </div>
        <div class="l03-content-col">
          <div class="l03-cmd-card">
            <div class="l03-cmd-header"><span class="l03-term-badge">nav2_params.yaml</span><strong>RPP Configuration Snippet</strong></div>
            <pre><code class="language-yaml">controller_server:
  ros__parameters:
    FollowPath:
      plugin: "nav2_regulated_pure_pursuit_controller::RegulatedPurePursuitController"
      desired_linear_vel: 0.5
      lookahead_dist: 0.6
      min_lookahead_dist: 0.3
      max_lookahead_dist: 0.9
      lookahead_time: 1.5
      use_velocity_scaled_lookahead_dist: true
      use_regulated_linear_velocity_scaling: true
      regulated_linear_scaling_min_radius: 0.9
      use_cost_regulated_linear_velocity_scaling: true</code></pre>
          </div>
        </div>
      </div>
    `}),a.push({id:`${t.id}_sec12_controller_params`,type:"concept",lessonNum:t.num_str,lessonId:t.id,module:t.module,sectionTitle:"12. Controller Server Matrix",badge:"⚙️ Controller Tuning",title:"12. Production Tuning: Controller Server nav2_params.yaml Matrix",htmlContent:`
      <div class="l03-two-col-layout">
        <div class="l03-content-col" style="display: flex; flex-direction: column; justify-content: space-between; gap: 0.35rem;">
          <div class="l05-golden-card" style="padding: 0.4rem 0.65rem;">
            <div class="l05-golden-header" style="font-size: 0.78rem;"><span>⏱️</span><strong>controller_frequency: 20.0 Hz</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.3;">Controls the frequency of the velocity loop. 20 Hz provides rapid reactive collision avoidance while maintaining low CPU load.</p>
          </div>
          <div class="l05-golden-card" style="padding: 0.4rem 0.65rem;">
            <div class="l05-golden-header" style="font-size: 0.78rem;"><span>🎯</span><strong>Goal Checker Tolerances</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.3;"><code>xy_goal_tolerance: 0.15</code> (15cm) and <code>yaw_goal_tolerance: 0.10</code> (~5.7&deg;) define acceptable destination completion bounds.</p>
          </div>
          <div class="l05-golden-card" style="padding: 0.4rem 0.65rem;">
            <div class="l05-golden-header" style="font-size: 0.78rem;"><span>🛡️</span><strong>Progress Checker Timeouts</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.3;"><code>required_movement_radius: 0.2m</code> within <code>movement_time_allowance: 10.0s</code> triggers recovery behaviors if the robot gets trapped.</p>
          </div>
        </div>
        <div class="l03-content-col">
          <div class="l03-cmd-card">
            <div class="l03-cmd-header"><span class="l03-term-badge">nav2_params.yaml</span><strong>Controller Server Core Parameters</strong></div>
            <pre><code class="language-yaml">controller_server:
  ros__parameters:
    controller_frequency: 20.0
    min_x_velocity_threshold: 0.001
    min_theta_velocity_threshold: 0.001
    progress_checker_plugin: "progress_checker"
    goal_checker_plugins: ["general_goal_checker"]
    controller_plugins: ["FollowPath"]
    progress_checker:
      plugin: "nav2_controller::SimpleProgressChecker"
      required_movement_radius: 0.2
      movement_time_allowance: 10.0
    general_goal_checker:
      plugin: "nav2_controller::SimpleGoalChecker"
      xy_goal_tolerance: 0.15
      yaw_goal_tolerance: 0.10</code></pre>
          </div>
        </div>
      </div>
    `})}function yi(s,t,a){a.push({id:`${t.id}_sec2_simple_commander_arch`,type:"concept",lessonNum:t.num_str,lessonId:t.id,module:t.module,sectionTitle:"2. The Simple Commander Python API Architecture",badge:"🐍 Python Automation",title:"2. Nav2 Simple Commander: High-Level Python API for Autonomous Missions",htmlContent:`
      <div class="l03-two-col-layout">
        <div class="l03-content-col">
          <div class="l05-golden-card" style="margin-bottom: 0.35rem; padding: 0.4rem 0.65rem;">
            <div class="l05-golden-header" style="font-size: 0.78rem;"><span>🧱</span><strong>Encapsulating Low-Level DDS Plumbing</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.3;">Writing raw ROS 2 action clients requires hundreds of lines of future callbacks, feedback handles, and cancel services. <code>BasicNavigator</code> wraps these into intuitive Python methods.</p>
          </div>
          <div class="l05-golden-card" style="margin-bottom: 0.35rem; padding: 0.4rem 0.65rem;">
            <div class="l05-golden-header" style="font-size: 0.78rem;"><span>🔄</span><strong>Automated Lifecycle Synchronization</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.3;">Calling <code>navigator.waitUntilNav2Active()</code> verifies that BT Navigator, Costmap 2D, and Controller servers have all transitioned to the <code>ACTIVE</code> state before dispatching goals.</p>
          </div>
          <div class="l05-golden-card" style="padding: 0.4rem 0.65rem;">
            <div class="l05-golden-header" style="font-size: 0.78rem;"><span>🏭</span><strong>Fleet &amp; Business Logic Bridge</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.3;">Allows roboticists to script high-level warehouse missions (pick &amp; place, multi-checkpoint patrols, charging dock runs) cleanly in pure Python.</p>
          </div>
        </div>
        <div class="l03-content-col">
          <div class="l03-cmd-card">
            <div class="l03-cmd-header"><span class="l03-term-badge">Python Boilerplate Reduction</span><strong>Simple Commander Abstraction</strong></div>
            <pre><code class="language-python">from nav2_simple_commander.robot_navigator import BasicNavigator
import rclpy

rclpy.init()
navigator = BasicNavigator()

# Wait for Nav2 stack to be fully active
navigator.waitUntilNav2Active()

# Set initial pose & navigate in 2 lines!
navigator.setInitialPose(initial_pose)
navigator.goToPose(goal_pose)</code></pre>
          </div>
        </div>
      </div>
    `}),a.push({id:`${t.id}_sec3_basic_navigator_methods`,type:"concept",lessonNum:t.num_str,lessonId:t.id,module:t.module,sectionTitle:"3. Core BasicNavigator Methods Reference",badge:"📚 API Reference",title:"3. Core BasicNavigator API Methods: Mission Control & Telemetry Matrix",htmlContent:`
      <div class="l06-table-wrap">
        <table>
          <thead>
            <tr>
              <th style="width: 26%;">Method Signature</th>
              <th style="width: 20%;">Return Type</th>
              <th style="width: 34%;">Operational Role</th>
              <th style="width: 20%;">Blocking Behavior</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><code>setInitialPose(pose)</code></td>
              <td><code>None</code></td>
              <td>Seeds AMCL localization with initial world coordinates.</td>
              <td>Synchronous</td>
            </tr>
            <tr>
              <td><code>goToPose(pose)</code></td>
              <td><code>None</code></td>
              <td>Dispatches a single waypoint navigation goal to Nav2.</td>
              <td>Asynchronous (Non-blocking)</td>
            </tr>
            <tr>
              <td><code>followWaypoints(poses)</code></td>
              <td><code>None</code></td>
              <td>Dispatches an ordered list of waypoints for sequential patrol.</td>
              <td>Asynchronous (Non-blocking)</td>
            </tr>
            <tr>
              <td><code>isTaskComplete()</code></td>
              <td><code>bool</code></td>
              <td>Queries whether the active mission has finished.</td>
              <td>Instantaneous</td>
            </tr>
            <tr>
              <td><code>getFeedback()</code></td>
              <td><code>NavigationFeedback</code></td>
              <td>Returns real-time <code>distance_remaining</code> and <code>navigation_time</code>.</td>
              <td>Instantaneous</td>
            </tr>
            <tr>
              <td><code>cancelTask()</code></td>
              <td><code>None</code></td>
              <td>Immediately preempts and safely aborts the active goal.</td>
              <td>Synchronous</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="l05-banner-intro" style="margin-top: 0.4rem; font-size: 0.74rem; padding: 0.35rem 0.6rem;">
        <strong>💡 Key Pattern:</strong> <code>goToPose</code> is non-blocking! You monitor progress inside a <code>while not navigator.isTaskComplete():</code> loop to stream telemetry and detect stalls.
      </div>
    `}),a.push({id:`${t.id}_sec4_patrol_script`,type:"concept",lessonNum:t.num_str,lessonId:t.id,module:t.module,sectionTitle:"4. Complete Autonomous Patrol Script Walkthrough",badge:"💻 Production Script",title:"4. Autonomous Navigation Scripting: Goal Dispatch, Feedback & Watchdog Loop",htmlContent:`
      <div class="l03-two-col-layout">
        <div class="l03-left-code-col">
          <div class="l03-cmd-card" style="margin-bottom: 0;">
            <div class="l03-cmd-header"><span class="l03-term-badge">autonomous_patrol.py</span><strong>Production Navigation Loop</strong></div>
            <pre><code class="language-python">goal_pose = PoseStamped()
goal_pose.header.frame_id = 'map'
goal_pose.header.stamp = navigator.get_clock().now().to_msg()
goal_pose.pose.position.x = 3.5
goal_pose.pose.position.y = 1.2
goal_pose.pose.orientation.w = 1.0

navigator.goToPose(goal_pose)

# Non-blocking feedback & timeout watchdog
while not navigator.isTaskComplete():
    feedback = navigator.getFeedback()
    if feedback:
        print(f"Dist remaining: {feedback.distance_remaining:.2f}m")
    time.sleep(0.5)

result = navigator.getResult()
if result == TaskResult.SUCCEEDED:
    print("Checkpoint reached successfully!")</code></pre>
          </div>
        </div>
        <div class="l03-content-col">
          <div class="l05-golden-card" style="margin-bottom: 0.35rem; padding: 0.4rem 0.65rem;">
            <div class="l05-golden-header" style="font-size: 0.78rem;"><span>📍</span><strong>header.frame_id = 'map' Rule</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.3;">Goals must always be expressed in the global <code>map</code> frame with updated timestamps from <code>navigator.get_clock().now().to_msg()</code>.</p>
          </div>
          <div class="l05-golden-card" style="margin-bottom: 0.35rem; padding: 0.4rem 0.65rem;">
            <div class="l05-golden-header" style="font-size: 0.78rem;"><span>⏱️</span><strong>Non-Blocking Feedback Streaming</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.3;">Access <code>feedback.distance_remaining</code>, <code>feedback.navigation_time</code>, and <code>feedback.number_of_recoveries</code> without blocking other robot threads.</p>
          </div>
          <div class="l05-golden-card" style="padding: 0.4rem 0.65rem;">
            <div class="l05-golden-header" style="font-size: 0.78rem;"><span>🛡️</span><strong>TaskResult Terminal States</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.3;">Handles all three terminal outcomes: <code>TaskResult.SUCCEEDED</code>, <code>TaskResult.CANCELED</code>, and <code>TaskResult.FAILED</code> cleanly.</p>
          </div>
        </div>
      </div>
    `}),a.push({id:`${t.id}_sec5_waypoints_patrol`,type:"concept",lessonNum:t.num_str,lessonId:t.id,module:t.module,sectionTitle:"5. Multi-Checkpoint Waypoint Queuing",badge:"🏭 Industrial Fleet Automation",title:"5. Multi-Checkpoint Waypoint Queuing & Mission Recovery Watchdogs",htmlContent:`
      <div class="l03-two-col-layout">
        <div class="l03-left-code-col">
          <div class="l03-cmd-card" style="margin-bottom: 0.35rem;">
            <div class="l03-cmd-header"><span class="l03-term-badge">followWaypoints</span><strong>Queued Patrol Checkpoints</strong></div>
            <pre><code class="language-python"># Define patrol route waypoints
checkpoints = [pose_dock, pose_aisle_3, pose_aisle_7, pose_dock]

# Dispatch full multi-stop mission
navigator.followWaypoints(checkpoints)

while not navigator.isTaskComplete():
    feedback = navigator.getFeedback()
    if feedback:
        print(f"Executing waypoint: {feedback.current_waypoint + 1}/{len(checkpoints)}")
    time.sleep(1.0)</code></pre>
          </div>
        </div>
        <div class="l03-content-col">
          <div class="l05-golden-card" style="margin-bottom: 0.35rem; padding: 0.4rem 0.65rem;">
            <div class="l05-golden-header" style="font-size: 0.78rem;"><span>🔄</span><strong>Automated Waypoint Transitions</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.3;">Nav2 switches to the next waypoint automatically upon reaching the current checkpoint tolerance, maintaining continuous patrol flow.</p>
          </div>
          <div class="l05-golden-card" style="margin-bottom: 0.35rem; padding: 0.4rem 0.65rem;">
            <div class="l05-golden-header" style="font-size: 0.78rem;"><span>🐕</span><strong>Stall Watchdog Architecture</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.3;">Track distance remaining over time. If distance does not decrease over 30 seconds (due to persistent corridor blockages), invoke <code>navigator.cancelTask()</code>.</p>
          </div>
          <div class="l05-golden-card" style="padding: 0.4rem 0.65rem;">
            <div class="l05-golden-header" style="font-size: 0.78rem;"><span>🏭</span><strong>WMS / Fleet Manager Integration</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.3;">Expose this script via REST API or MQTT to connect warehouse inventory management systems directly with autonomous AMR tasking.</p>
          </div>
        </div>
      </div>
    `})}function fi(s,t,a){a.push({id:`${t.id}_sec2_param_arch`,type:"concept",lessonNum:t.num_str,lessonId:t.id,module:t.module,sectionTitle:"2. ROS 1 vs. ROS 2 Parameter Architecture",badge:"⚙️ Parameter Architecture",title:"2. Parameter Architecture: Centralized ROS 1 vs. Distributed Typed ROS 2",htmlContent:`
      <div class="l06-table-wrap">
        <table>
          <thead>
            <tr>
              <th style="width: 22%;">Architectural Metric</th>
              <th style="width: 39%;">ROS 1 Parameter Server</th>
              <th style="width: 39%;">ROS 2 Distributed Parameters</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>Storage Topology</strong></td>
              <td>Centralized key-value dictionary residing inside <code>roscore</code>.</td>
              <td>Fully distributed; owned directly by each individual node over DDS.</td>
            </tr>
            <tr>
              <td><strong>Type Safety</strong></td>
              <td>Weakly typed; dynamic XML-RPC type coercion without compile-time safety.</td>
              <td>Strongly typed (Integer, Double, String, Boolean, Byte Arrays).</td>
            </tr>
            <tr>
              <td><strong>Fault Tolerance</strong></td>
              <td>Single point of failure: if <code>roscore</code> crashes, all parameters vanish.</td>
              <td>Zero single point of failure; node failure affects only its own parameters.</td>
            </tr>
            <tr>
              <td><strong>Runtime Validation</strong></td>
              <td>No native constraints; nodes must manually sanitize incoming values.</td>
              <td>Built-in <code>ParameterDescriptor</code> range constraints &amp; atomic callbacks.</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="l05-banner-intro" style="margin-top: 0.4rem; font-size: 0.74rem; padding: 0.35rem 0.6rem;">
        <strong>💡 Key Concept:</strong> In ROS 2, parameters are first-class citizen services and events hosted directly by each node's executor.
      </div>
    `}),a.push({id:`${t.id}_sec3_declaring_params`,type:"concept",lessonNum:t.num_str,lessonId:t.id,module:t.module,sectionTitle:"3. Building a Parameterized Node (Python)",badge:"🐍 Python Parameters",title:"3. Declaring & Reading Parameters in Python: The Mandatory Declaration Rule",htmlContent:`
      <div class="l03-two-col-layout">
        <div class="l03-left-code-col">
          <div class="l03-cmd-card" style="margin-bottom: 0;">
            <div class="l03-cmd-header"><span class="l03-term-badge">amr_speed_controller.py</span><strong>Declaration &amp; Access</strong></div>
            <pre><code class="language-python">class SpeedController(Node):
    def __init__(self):
        super().__init__('speed_controller')

        # 1. Declare parameters with default fallback values
        self.declare_parameter('max_linear_speed', 1.5)
        self.declare_parameter('enable_safety_reverse', True)

        # 2. Access parameter values directly
        self.max_speed = self.get_parameter('max_linear_speed').value
        self.safety_rev = self.get_parameter('enable_safety_reverse').value

        self.get_logger().info(f"Initialized with max speed: {self.max_speed} m/s")</code></pre>
          </div>
        </div>
        <div class="l03-content-col">
          <div class="l05-golden-card" style="margin-bottom: 0.35rem; padding: 0.4rem 0.65rem;">
            <div class="l05-golden-header" style="font-size: 0.78rem;"><span>🔒</span><strong>The Mandatory Declaration Rule</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.3;">In ROS 2, a node cannot access or be assigned a parameter from CLI or YAML unless it is explicitly declared with <code>self.declare_parameter()</code>.</p>
          </div>
          <div class="l05-golden-card" style="margin-bottom: 0.35rem; padding: 0.4rem 0.65rem;">
            <div class="l05-golden-header" style="font-size: 0.78rem;"><span>🎯</span><strong>Automatic Type Inference</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.3;">The type of the default value (e.g. <code>1.5</code> double, <code>True</code> bool) automatically locks the parameter type. Attempting to pass a string causes type rejection.</p>
          </div>
          <div class="l05-golden-card" style="padding: 0.4rem 0.65rem;">
            <div class="l05-golden-header" style="font-size: 0.78rem;"><span>🛡️</span><strong>Safe Fallback Defaults</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.3;">Always supply sensible, safe production defaults so the robot operates safely even if launch arguments or configuration YAML files are omitted.</p>
          </div>
        </div>
      </div>
    `}),a.push({id:`${t.id}_sec4_param_descriptors`,type:"concept",lessonNum:t.num_str,lessonId:t.id,module:t.module,sectionTitle:"4. Parameter Descriptors & Dynamic Validation",badge:"🛡️ Safety Validation",title:"4. Parameter Descriptors & Dynamic Validation Callbacks for Hardware Safety",htmlContent:`
      <div class="l03-two-col-layout">
        <div class="l03-left-code-col">
          <div class="l03-cmd-card" style="margin-bottom: 0;">
            <div class="l03-cmd-header"><span class="l03-term-badge">Validation Callback</span><strong>Enforcing Physical Constraints</strong></div>
            <pre><code class="language-python"># Register dynamic change callback
self.add_on_set_parameters_callback(self.validate_parameters)

def validate_parameters(self, params):
    result = SetParametersResult(successful=True)
    for p in params:
        if p.name == 'max_linear_speed':
            if p.value &lt; 0.0 or p.value &gt; 2.2:
                result.successful = False
                result.reason = "Speed must be between 0.0 and 2.2 m/s"
            else:
                self.max_speed = p.value
    return result</code></pre>
          </div>
        </div>
        <div class="l03-content-col">
          <div class="l05-golden-card" style="margin-bottom: 0.35rem; padding: 0.4rem 0.65rem;">
            <div class="l05-golden-header" style="font-size: 0.78rem;"><span>🛑</span><strong>Atomic Rejection of Unsafe Values</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.3;">If an operator attempts to set <code>max_linear_speed</code> to <code>10.0 m/s</code>, the callback returns <code>successful=False</code>, rejecting the change before hardware damage occurs.</p>
          </div>
          <div class="l05-golden-card" style="margin-bottom: 0.35rem; padding: 0.4rem 0.65rem;">
            <div class="l05-golden-header" style="font-size: 0.78rem;"><span>📋</span><strong>ParameterDescriptor Metadata</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.3;">Attach <code>FloatingPointRange(from_value=0.0, to_value=2.2, step=0.1)</code> and description text so GUI tools display formatted sliders and tooltips.</p>
          </div>
          <div class="l05-golden-card" style="padding: 0.4rem 0.65rem;">
            <div class="l05-golden-header" style="font-size: 0.78rem;"><span>🔄</span><strong>Real-Time Parameter Updates</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.3;">Updating <code>self.max_speed</code> inside the callback applies the new tuning immediately in real time without restarting the node.</p>
          </div>
        </div>
      </div>
    `}),a.push({id:`${t.id}_sec5_yaml_config`,type:"concept",lessonNum:t.num_str,lessonId:t.id,module:t.module,sectionTitle:"5. Organizing Configuration with YAML Files",badge:"📄 Production YAML",title:"5. Production YAML Configuration: The ros__parameters Nesting Rule",htmlContent:`
      <div class="l03-two-col-layout">
        <div class="l03-left-code-col">
          <div class="l03-cmd-card" style="margin-bottom: 0.35rem;">
            <div class="l03-cmd-header"><span class="l03-term-badge">amr_params.yaml</span><strong>Production YAML Hierarchy</strong></div>
            <pre><code class="language-yaml">/speed_controller:
  ros__parameters:
    max_linear_speed: 1.8
    enable_safety_reverse: true
    wheel_radius: 0.08
    pid_gains:
      kp: 2.5
      ki: 0.1
      kd: 0.05</code></pre>
          </div>
          <div class="l03-cmd-card">
            <div class="l03-cmd-header"><span class="l03-term-badge">CLI &amp; Launch Ingestion</span><strong>Loading Parameters</strong></div>
            <pre><code class="language-bash"># Run node directly with YAML file:
ros2 run nexus_amr_control speed_controller   --ros-args --params-file config/amr_params.yaml</code></pre>
          </div>
        </div>
        <div class="l03-content-col">
          <div class="l05-golden-card" style="margin-bottom: 0.35rem; padding: 0.4rem 0.65rem;">
            <div class="l05-golden-header" style="font-size: 0.78rem;"><span>⚠️</span><strong>The ros__parameters Indentation Rule</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.3;">Every parameter in ROS 2 MUST be nested under its target node name, followed by the exact key <code>ros__parameters:</code> (with double underscores). Omission causes silent parsing failure.</p>
          </div>
          <div class="l05-golden-card" style="margin-bottom: 0.35rem; padding: 0.4rem 0.65rem;">
            <div class="l05-golden-header" style="font-size: 0.78rem;"><span>📦</span><strong>Nested Sub-Namespaces</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.3;">Organize related parameters cleanly into dot-separated namespaces (e.g. <code>pid_gains.kp</code>), improving readability for complex robot tuning.</p>
          </div>
          <div class="l05-golden-card" style="padding: 0.4rem 0.65rem;">
            <div class="l05-golden-header" style="font-size: 0.78rem;"><span>🚀</span><strong>Launch File Integration</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.3;">Pass YAML configuration paths cleanly in launch files: <code>Node(..., parameters=[config_yaml_path])</code>.</p>
          </div>
        </div>
      </div>
    `}),a.push({id:`${t.id}_sec6_cli_params`,type:"concept",lessonNum:t.num_str,lessonId:t.id,module:t.module,sectionTitle:"6. Parameter Inspection with CLI & rqt_reconfigure",badge:"🔍 Parameter Diagnostics",title:"6. Parameter CLI Commands & Real-Time Tuning with rqt_reconfigure",htmlContent:`
      <div class="l03-two-col-layout">
        <div class="l03-content-col">
          <div class="l03-cmd-card">
            <div class="l03-cmd-header"><span class="l03-term-badge">ros2 param Verbs</span><strong>Essential CLI Commands</strong></div>
            <pre><code class="language-bash"># 1. List all parameters declared on a node
ros2 param list /speed_controller

# 2. Query current value & type of a parameter
ros2 param get /speed_controller max_linear_speed

# 3. Modify parameter dynamically at runtime
ros2 param set /speed_controller max_linear_speed 1.2

# 4. Dump all active parameters to YAML file
ros2 param dump /speed_controller &gt; tuned_params.yaml</code></pre>
          </div>
        </div>
        <div class="l03-content-col">
          <div class="l05-golden-card" style="margin-bottom: 0.35rem; padding: 0.4rem 0.65rem;">
            <div class="l05-golden-header" style="font-size: 0.78rem;"><span>🎛️</span><strong>rqt_reconfigure Interactive Tuning</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.3;">Run <code>ros2 run rqt_reconfigure rqt_reconfigure</code> to open a real-time GUI with sliders for every parameter declared with numerical descriptors.</p>
          </div>
          <div class="l05-golden-card" style="margin-bottom: 0.35rem; padding: 0.4rem 0.65rem;">
            <div class="l05-golden-header" style="font-size: 0.78rem;"><span>💾</span><strong>Snapshot Tuning to Disk</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.3;">After tuning PID gains or speed limits in the warehouse, run <code>ros2 param dump</code> to persist the optimized parameters directly into production YAML.</p>
          </div>
          <div class="l05-golden-card" style="padding: 0.4rem 0.65rem;">
            <div class="l05-golden-header" style="font-size: 0.78rem;"><span>🔍</span><strong>Zero Recompile Iteration</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.3;">Change operational behaviors instantly across live robots without touching source code or re-running <code>colcon build</code>.</p>
          </div>
        </div>
      </div>
    `})}function bi(s,t,a){a.push({id:`${t.id}_sec2_vscode_ide`,type:"concept",lessonNum:t.num_str,lessonId:t.id,module:t.module,sectionTitle:"2. VS Code IDE Configuration for ROS 2 Python",badge:"💻 IDE Configuration",title:"2. Professional VS Code IDE Tooling: Autocompletion & Path Resolution",htmlContent:`
      <div class="l03-two-col-layout">
        <div class="l03-left-code-col">
          <div class="l03-cmd-card" style="margin-bottom: 0;">
            <div class="l03-cmd-header"><span class="l03-term-badge">.vscode/settings.json</span><strong>Python Path Configuration</strong></div>
            <pre><code class="language-json">{
  "python.autoComplete.extraPaths": [
    "/opt/ros/humble/lib/python3.10/site-packages",
    "&#36;{workspaceFolder}/install/nexus_amr_control/lib/python3.10/site-packages"
  ],
  "python.analysis.extraPaths": [
    "/opt/ros/humble/lib/python3.10/site-packages",
    "&#36;{workspaceFolder}/install/nexus_amr_control/lib/python3.10/site-packages"
  ],
  "terminal.integrated.env.linux": {
    "PYTHONPATH": "/opt/ros/humble/lib/python3.10/site-packages:&#36;{workspaceFolder}/install/nexus_amr_control/lib/python3.10/site-packages"
  }
}</code></pre>
          </div>
        </div>
        <div class="l03-content-col">
          <div class="l05-golden-card" style="margin-bottom: 0.35rem; padding: 0.4rem 0.65rem;">
            <div class="l05-golden-header" style="font-size: 0.78rem;"><span>🐛</span><strong>Eliminating "Import rclpy Could Not Be Resolved"</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.3;">Pylance looks only in standard virtualenvs by default. Adding ROS 2 underlay site-packages to <code>extraPaths</code> resolves all red squiggly lines instantly.</p>
          </div>
          <div class="l05-golden-card" style="margin-bottom: 0.35rem; padding: 0.4rem 0.65rem;">
            <div class="l05-golden-header" style="font-size: 0.78rem;"><span>✨</span><strong>Full IntelliSense &amp; Type Hovering</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.3;">Gain instant parameter tooltips, docstring inspection, and method autocompletion for <code>Node</code>, <code>Publisher</code>, and message dataclasses.</p>
          </div>
          <div class="l05-golden-card" style="padding: 0.4rem 0.65rem;">
            <div class="l05-golden-header" style="font-size: 0.78rem;"><span>🔨</span><strong>Integrated Colcon Tasks</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.3;">Bind <code>tasks.json</code> to trigger <code>colcon build --symlink-install</code> with a single <code>Ctrl+Shift+B</code> shortcut directly within VS Code.</p>
          </div>
        </div>
      </div>
    `}),a.push({id:`${t.id}_sec3_log_levels`,type:"concept",lessonNum:t.num_str,lessonId:t.id,module:t.module,sectionTitle:"3. The Five Logging Severity Levels",badge:"🚦 Severity Hierarchy",title:"3. The ROS 2 Logging Framework: The 5-Tier Severity Hierarchy",htmlContent:`
      <div class="l06-table-wrap">
        <table>
          <thead>
            <tr>
              <th style="width: 14%;">Level</th>
              <th style="width: 12%;">Color</th>
              <th style="width: 38%;">Architectural Intent</th>
              <th style="width: 36%;">AMR Production Example</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><code>DEBUG</code></td>
              <td>Cyan</td>
              <td>High-frequency diagnostic traces; silenced in production.</td>
              <td>Raw encoder ticks, math intermediate vectors.</td>
            </tr>
            <tr>
              <td><code>INFO</code></td>
              <td>White</td>
              <td>Normal operational milestones; standard production default.</td>
              <td>Node started, mission waypoint reached, client connected.</td>
            </tr>
            <tr>
              <td><code>WARN</code></td>
              <td>Yellow</td>
              <td>Unexpected but recoverable event; degraded performance.</td>
              <td>LiDAR packet drop, battery &lt; 20%, retry attempt.</td>
            </tr>
            <tr>
              <td><code>ERROR</code></td>
              <td>Red</td>
              <td>Component failed; functionality lost, but node survives.</td>
              <td>Sensor disconnected, goal rejected, plan aborted.</td>
            </tr>
            <tr>
              <td><code>FATAL</code></td>
              <td>Magenta</td>
              <td>Critical unrecoverable failure; immediate shutdown required.</td>
              <td>Emergency stop triggered, motor over-current thermal trip.</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="l05-banner-intro" style="margin-top: 0.4rem; font-size: 0.74rem; padding: 0.35rem 0.6rem;">
        <strong>💡 Production Standard:</strong> Default threshold is <code>INFO</code>. Messages below the active threshold are dropped with zero CPU string formatting penalty.
      </div>
    `}),a.push({id:`${t.id}_sec4_throttled_logging`,type:"concept",lessonNum:t.num_str,lessonId:t.id,module:t.module,sectionTitle:"4. Throttled & One-Shot Logging",badge:"⏱️ Rate-Limited Logs",title:"4. Clean Production Logs: Throttled, One-Shot & Skip-First Patterns",htmlContent:`
      <div class="l03-two-col-layout">
        <div class="l03-left-code-col">
          <div class="l03-cmd-card" style="margin-bottom: 0;">
            <div class="l03-cmd-header"><span class="l03-term-badge">telemetry_logger.py</span><strong>Rate-Limited Logging</strong></div>
            <pre><code class="language-python"># 1. Standard log (Dangerous in 50Hz control loop!)
# self.get_logger().info("Control loop tick") # FLOODS TERMINAL!

# 2. Throttled: Log at most once every 2.0 seconds
self.get_logger().info(
    f"Battery: {self.battery_pct}%", 
    throttle_duration_sec=2.0
)

# 3. Once: Log exactly one time across node lifespan
self.get_logger().info(
    "Motor drivers calibrated", 
    once=True
)

# 4. Skip-First: Log after warm-up stabilization
self.get_logger().warn(
    "Sensor latency high", 
    skip_first=True
)</code></pre>
          </div>
        </div>
        <div class="l03-content-col">
          <div class="l05-golden-card" style="margin-bottom: 0.35rem; padding: 0.4rem 0.65rem;">
            <div class="l05-golden-header" style="font-size: 0.78rem;"><span>🚫</span><strong>Preventing Terminal Flooding</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.3;">Calling <code>info()</code> unthrottled in a 50Hz motor loop generates 3,000 log lines per minute, exhausting terminal buffers and inflating log files to gigabytes.</p>
          </div>
          <div class="l05-golden-card" style="margin-bottom: 0.35rem; padding: 0.4rem 0.65rem;">
            <div class="l05-golden-header" style="font-size: 0.78rem;"><span>⏱️</span><strong>throttle_duration_sec=2.0</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.3;">Provides steady operational telemetry at human-readable rates while the underlying high-frequency feedback loop runs uninterrupted.</p>
          </div>
          <div class="l05-golden-card" style="padding: 0.4rem 0.65rem;">
            <div class="l05-golden-header" style="font-size: 0.78rem;"><span>📢</span><strong>once=True for Boot Announcements</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.3;">Ideal for hardware handshake confirmation, firmware version prints, and static configuration summaries on startup.</p>
          </div>
        </div>
      </div>
    `}),a.push({id:`${t.id}_sec5_runtime_log_config`,type:"concept",lessonNum:t.num_str,lessonId:t.id,module:t.module,sectionTitle:"5. Runtime Log Level Configuration",badge:"🎛️ Dynamic Log Control",title:"5. Dynamic Log Level Configuration: CLI Overrides & Live Service Reconfiguration",htmlContent:`
      <div class="l03-two-col-layout">
        <div class="l03-content-col">
          <div class="l03-cmd-card">
            <div class="l03-cmd-header"><span class="l03-term-badge">Dynamic Logging CLI</span><strong>Launch &amp; Live Service Commands</strong></div>
            <pre><code class="language-bash"># 1. Override log level at launch time for all nodes:
ros2 run nexus_amr_control speed_controller   --ros-args --log-level DEBUG

# 2. Target a specific node's logger:
ros2 run nexus_amr_control speed_controller   --ros-args --log-level speed_controller:=DEBUG

# 3. Change log level dynamically on running robot via service:
ros2 service call /speed_controller/set_logger_levels   rcl_interfaces/srv/SetLoggerLevels   "{levels: [{name: 'speed_controller', level_name: 'DEBUG'}]}"</code></pre>
          </div>
        </div>
        <div class="l03-content-col">
          <div class="l05-golden-card" style="margin-bottom: 0.35rem; padding: 0.4rem 0.65rem;">
            <div class="l05-golden-header" style="font-size: 0.78rem;"><span>🚀</span><strong>Targeted Launch Diagnostics</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.3;">Pass <code>--log-level DEBUG</code> during integration testing to expose raw calculations without altering your production code.</p>
          </div>
          <div class="l05-golden-card" style="margin-bottom: 0.35rem; padding: 0.4rem 0.65rem;">
            <div class="l05-golden-header" style="font-size: 0.78rem;"><span>🔌</span><strong>Live Service Introspection</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.3;">Elevate log severity from <code>INFO</code> to <code>DEBUG</code> on a physical robot deployed in a factory aisle without stopping its navigation mission.</p>
          </div>
          <div class="l05-golden-card" style="padding: 0.4rem 0.65rem;">
            <div class="l05-golden-header" style="font-size: 0.78rem;"><span>📁</span><strong>Persistent Disk Logging (~/.ros/log/)</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.3;">All logs are automatically timestamped and mirrored to disk in <code>~/.ros/log/</code> for post-mortem flight recorder analysis.</p>
          </div>
        </div>
      </div>
    `})}function xi(s,t,a){a.push({id:`${t.id}_sec2_standard_vs_custom`,type:"concept",lessonNum:t.num_str,lessonId:t.id,module:t.module,sectionTitle:"2. Standard ROS 2 Interface Libraries",badge:"📦 Interface Ecosystem",title:"2. Standard ROS 2 Interfaces vs. Custom Definitions: The Ecosystem Rule",htmlContent:`
      <div class="l06-table-wrap">
        <table>
          <thead>
            <tr>
              <th style="width: 22%;">Package Name</th>
              <th style="width: 28%;">Standard Types</th>
              <th style="width: 50%;">Production Robotics Role</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><code>std_msgs</code></td>
              <td><code>String</code>, <code>Float32</code>, <code>Bool</code>, <code>Header</code></td>
              <td>Primitive datatypes and timestamped metadata structures.</td>
            </tr>
            <tr>
              <td><code>geometry_msgs</code></td>
              <td><code>Twist</code>, <code>PoseStamped</code>, <code>TransformStamped</code></td>
              <td>Spatial kinematics, Cartesian velocities, coordinate transforms.</td>
            </tr>
            <tr>
              <td><code>sensor_msgs</code></td>
              <td><code>LaserScan</code>, <code>Image</code>, <code>Imu</code>, <code>PointCloud2</code></td>
              <td>High-throughput raw perception data from physical sensors.</td>
            </tr>
            <tr>
              <td><code>nav_msgs</code></td>
              <td><code>Odometry</code>, <code>Path</code>, <code>OccupancyGrid</code></td>
              <td>Navigation trajectories, dead-reckoning, and SLAM map grids.</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="l05-banner-intro" style="margin-top: 0.4rem; font-size: 0.74rem; padding: 0.35rem 0.6rem;">
        <strong>💡 The Reusability Principle:</strong> ALWAYS prefer standard interfaces when possible! Creating custom messages unnecessarily breaks interoperability with RViz2, Nav2, and community tools.
      </div>
    `}),a.push({id:`${t.id}_sec3_standalone_pkg_rule`,type:"concept",lessonNum:t.num_str,lessonId:t.id,module:t.module,sectionTitle:"3. The Custom Interface Architecture Rule",badge:"🏛️ Architecture Rule",title:"3. The Golden Architectural Rule: Dedicated Standalone Interface Packages",htmlContent:`
      <div class="l03-two-col-layout">
        <div class="l03-content-col">
          <div class="l05-golden-card" style="margin-bottom: 0.35rem; padding: 0.4rem 0.65rem;">
            <div class="l05-golden-header" style="font-size: 0.78rem;"><span>🚫</span><strong>The Python Package Limitation</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.3;">In ROS 2, custom interface generators (<code>rosidl_default_generators</code>) rely on CMake build tooling. Pure Python packages (<code>ament_python</code>) CANNOT generate custom message bindings.</p>
          </div>
          <div class="l05-golden-card" style="margin-bottom: 0.35rem; padding: 0.4rem 0.65rem;">
            <div class="l05-golden-header" style="font-size: 0.78rem;"><span>📦</span><strong>The Dedicated CMake Package Rule</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.3;">Always create a standalone CMake package named <code>&lt;robot&gt;_interfaces</code> (e.g. <code>nexus_amr_interfaces</code>) containing solely <code>msg/</code>, <code>srv/</code>, and <code>action/</code> IDL files.</p>
          </div>
          <div class="l05-golden-card" style="padding: 0.4rem 0.65rem;">
            <div class="l05-golden-header" style="font-size: 0.78rem;"><span>🔄</span><strong>Circular Dependency Immunity</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.3;">Separating interfaces decouples perception, control, and fleet nodes, allowing any Python or C++ node to import messages without circular dependency locks.</p>
          </div>
        </div>
        <div class="l03-content-col">
          <div class="l03-cmd-card">
            <div class="l03-cmd-header"><span class="l03-term-badge">Filesystem Layout</span><strong>nexus_amr_interfaces /</strong></div>
            <pre><code class="language-plaintext">nexus_amr_interfaces/
├── CMakeLists.txt        # Calls rosidl_generate_interfaces
├── package.xml           # Declares buildtool_depend rosidl
├── msg/
│   └── UltrasonicRange.msg
├── srv/
│   └── ResetOdometry.srv
└── action/
    └── DockRobot.action</code></pre>
          </div>
        </div>
      </div>
    `}),a.push({id:`${t.id}_sec4_idl_anatomy`,type:"concept",lessonNum:t.num_str,lessonId:t.id,module:t.module,sectionTitle:"4. IDL Anatomy: .msg, .srv & .action Syntax",badge:"📐 IDL Grammar",title:"4. Interface Definition Language (IDL): Anatomy of .msg, .srv & .action Files",htmlContent:`
      <div class="l03-two-col-layout">
        <div class="l03-left-code-col">
          <div class="l03-cmd-card" style="margin-bottom: 0.35rem;">
            <div class="l03-cmd-header"><span class="l03-term-badge">UltrasonicRange.msg</span><strong>Topic Message</strong></div>
            <pre><code class="language-protobuf">std_msgs/Header header
float32 distance        # Measured range in meters
float32 min_range       # Hardware minimum
float32 max_range       # Hardware maximum
bool obstacle_detected  # Binary threshold alert</code></pre>
          </div>
          <div class="l03-cmd-card">
            <div class="l03-cmd-header"><span class="l03-term-badge">ResetOdometry.srv</span><strong>Service Contract</strong></div>
            <pre><code class="language-protobuf"># Request (Single dash separator: ---)
float64 x
float64 y
float64 theta
---
# Response
bool success
string message</code></pre>
          </div>
        </div>
        <div class="l03-content-col">
          <div class="l03-cmd-card" style="margin-bottom: 0.35rem;">
            <div class="l03-cmd-header"><span class="l03-term-badge">DockRobot.action</span><strong>Action Contract</strong></div>
            <pre><code class="language-protobuf"># 1. Goal (First ---)
string docking_station_id
---
# 2. Result (Second ---)
bool docked
duration time_elapsed
---
# 3. Feedback
float32 distance_to_dock
float32 alignment_error</code></pre>
          </div>
          <div class="l05-golden-card" style="padding: 0.4rem 0.65rem;">
            <div class="l05-golden-header" style="font-size: 0.78rem;"><span>🎯</span><strong>The Separator Syntax Rule</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.3;">Messages have no dividers. Services require <strong>one <code>---</code> line</strong>. Actions require <strong>two <code>---</code> lines</strong>. Extra spaces or characters on divider lines cause compiler errors.</p>
          </div>
        </div>
      </div>
    `}),a.push({id:`${t.id}_sec5_build_wiring`,type:"concept",lessonNum:t.num_str,lessonId:t.id,module:t.module,sectionTitle:"5. Configuring package.xml & CMakeLists.txt",badge:"⚙️ Build Wiring",title:"5. Build Configuration: Generator Wiring in CMakeLists.txt & package.xml",htmlContent:`
      <div class="l03-two-col-layout">
        <div class="l03-left-code-col">
          <div class="l03-cmd-card" style="margin-bottom: 0;">
            <div class="l03-cmd-header"><span class="l03-term-badge">CMakeLists.txt</span><strong>rosidl Interface Generation</strong></div>
            <pre><code class="language-cmake">cmake_minimum_required(VERSION 3.8)
project(nexus_amr_interfaces)

find_package(ament_cmake REQUIRED)
find_package(rosidl_default_generators REQUIRED)
find_package(std_msgs REQUIRED)
find_package(builtin_interfaces REQUIRED)

rosidl_generate_interfaces(&#36;{PROJECT_NAME}
  "msg/UltrasonicRange.msg"
  "srv/ResetOdometry.srv"
  "action/DockRobot.action"
  DEPENDENCIES std_msgs builtin_interfaces
)

ament_package()</code></pre>
          </div>
        </div>
        <div class="l03-content-col">
          <div class="l05-golden-card" style="margin-bottom: 0.35rem; padding: 0.4rem 0.65rem;">
            <div class="l05-golden-header" style="font-size: 0.78rem;"><span>🔨</span><strong>The Generator / Runtime Dependency Pair</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.3;">In <code>package.xml</code>, declare <code>&lt;buildtool_depend&gt;rosidl_default_generators&lt;/buildtool_depend&gt;</code> for build-time generation and <code>&lt;exec_depend&gt;rosidl_default_runtime&lt;/exec_depend&gt;</code> for runtime execution.</p>
          </div>
          <div class="l05-golden-card" style="margin-bottom: 0.35rem; padding: 0.4rem 0.65rem;">
            <div class="l05-golden-header" style="font-size: 0.78rem;"><span>📦</span><strong>Nested DEPENDENCIES Tag</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.3;">If your custom messages use <code>std_msgs/Header</code> or <code>builtin_interfaces/Time</code>, list them explicitly under <code>DEPENDENCIES</code> in <code>rosidl_generate_interfaces</code>.</p>
          </div>
          <div class="l05-golden-card" style="padding: 0.4rem 0.65rem;">
            <div class="l05-golden-header" style="font-size: 0.78rem;"><span>🚀</span><strong>Selective Build Command</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.3;">Compile standalone: <code>colcon build --packages-select nexus_amr_interfaces</code> followed by <code>source install/setup.bash</code>.</p>
          </div>
        </div>
      </div>
    `}),a.push({id:`${t.id}_sec6_cli_python_usage`,type:"concept",lessonNum:t.num_str,lessonId:t.id,module:t.module,sectionTitle:"6. CLI Verification & Python Node Ingestion",badge:"💻 Python Ingestion",title:"6. CLI Verification & Ingesting Custom Interfaces in Python Nodes",htmlContent:`
      <div class="l03-two-col-layout">
        <div class="l03-left-code-col">
          <div class="l03-cmd-card" style="margin-bottom: 0.35rem;">
            <div class="l03-cmd-header"><span class="l03-term-badge">CLI Verification</span><strong>Inspecting Compiled Schemas</strong></div>
            <pre><code class="language-bash"># Verify interface is registered & inspect definition:
ros2 interface show nexus_amr_interfaces/msg/UltrasonicRange</code></pre>
          </div>
          <div class="l03-cmd-card">
            <div class="l03-cmd-header"><span class="l03-term-badge">range_sensor_node.py</span><strong>Python Import &amp; Population</strong></div>
            <pre><code class="language-python">from nexus_amr_interfaces.msg import UltrasonicRange

msg = UltrasonicRange()
msg.header.stamp = self.get_clock().now().to_msg()
msg.header.frame_id = 'sonar_front_link'
msg.distance = 0.42
msg.obstacle_detected = True

self.publisher_.publish(msg)</code></pre>
          </div>
        </div>
        <div class="l03-content-col">
          <div class="l05-golden-card" style="margin-bottom: 0.35rem; padding: 0.4rem 0.65rem;">
            <div class="l05-golden-header" style="font-size: 0.78rem;"><span>🔍</span><strong>ros2 interface show Validation</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.3;">Outputs the full compiled field hierarchy and comments. If this command prints the schema, the interface is correctly registered across the ROS 2 middleware.</p>
          </div>
          <div class="l05-golden-card" style="margin-bottom: 0.35rem; padding: 0.4rem 0.65rem;">
            <div class="l05-golden-header" style="font-size: 0.78rem;"><span>🐍</span><strong>Strong Python Field Typing</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.3;">Attempting to assign a string to <code>msg.distance</code> raises an immediate <code>TypeError</code> or <code>AssertionError</code> at runtime, protecting the robot from type corruption.</p>
          </div>
          <div class="l05-golden-card" style="padding: 0.4rem 0.65rem;">
            <div class="l05-golden-header" style="font-size: 0.78rem;"><span>🏭</span><strong>Fleet Interoperability</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.3;">Distribute the compiled <code>nexus_amr_interfaces</code> debian package across fleet AMRs, edge servers, and cloud telemetry backends.</p>
          </div>
        </div>
      </div>
    `})}function _i(s,t,a){a.push({id:`${t.id}_sec2_sqlite_vs_mcap`,type:"concept",lessonNum:t.num_str,lessonId:t.id,module:t.module,sectionTitle:"2. Storage Plugins: SQLite3 vs. MCAP",badge:"💾 Storage Engine",title:"2. ROS 2 Bag Storage Formats: Legacy SQLite3 vs. Modern MCAP",htmlContent:`
      <div class="l06-table-wrap">
        <table>
          <thead>
            <tr>
              <th style="width: 20%;">Architectural Metric</th>
              <th style="width: 40%;">SQLite3 (Default Legacy Plugin)</th>
              <th style="width: 40%;">MCAP (Modern Industrial Standard)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>Write Throughput</strong></td>
              <td>Relational SQL engine; suffers write locks during high-rate camera/LiDAR streams.</td>
              <td>Append-only binary chunk streaming; zero write locks; 10x higher throughput.</td>
            </tr>
            <tr>
              <td><strong>Schema Portability</strong></td>
              <td>Requires original ROS 2 workspace message definitions installed to deserialize.</td>
              <td><strong>Self-describing</strong>: Embeds message IDL schemas directly inside file header.</td>
            </tr>
            <tr>
              <td><strong>Tooling Ecosystem</strong></td>
              <td>CLI playback and generic SQLite browsers.</td>
              <td>Native direct streaming in Foxglove Studio, PlotJuggler, and web browsers.</td>
            </tr>
            <tr>
              <td><strong>Crash Recovery</strong></td>
              <td>Unclosed SQLite transactions can corrupt index on unexpected power loss.</td>
              <td>Append-only chunk headers ensure data up to the last millisecond is recoverable.</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="l05-banner-intro" style="margin-top: 0.4rem; font-size: 0.74rem; padding: 0.35rem 0.6rem;">
        <strong>💡 Industrial Standard:</strong> Always record with <code>--storage mcap</code> for field testing. Your telemetry can be inspected on any laptop without compiling custom robot interface packages.
      </div>
    `}),a.push({id:`${t.id}_sec3_recording_cli`,type:"concept",lessonNum:t.num_str,lessonId:t.id,module:t.module,sectionTitle:"3. Step-by-Step: Recording Data via CLI",badge:"📹 CLI Recording",title:"3. Production CLI Recording Strategies: Selective Topics & Compression",htmlContent:`
      <div class="l03-two-col-layout">
        <div class="l03-content-col">
          <div class="l03-cmd-card">
            <div class="l03-cmd-header"><span class="l03-term-badge">ros2 bag record</span><strong>Essential Recording Recipes</strong></div>
            <pre><code class="language-bash"># 1. Selective Topic Recording (Recommended):
ros2 bag record -s mcap -o amr_patrol_01   /cmd_vel /odom /scan /tf /tf_static

# 2. Regex Wildcard Topic Recording:
ros2 bag record -s mcap -e "/amr/.*"

# 3. Production Zstandard Compression:
ros2 bag record -s mcap -o mission_compressed   --compression-mode file   --compression-format zstd   /scan /camera/image_raw</code></pre>
          </div>
        </div>
        <div class="l03-content-col">
          <div class="l05-golden-card" style="margin-bottom: 0.35rem; padding: 0.4rem 0.65rem;">
            <div class="l05-golden-header" style="font-size: 0.78rem;"><span>🎯</span><strong>The Golden Selective Rule</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.3;">Never run <code>ros2 bag record -a</code> (record all) blindly on a production robot! Unthrottled raw camera images (60 MB/s) will exhaust SSD storage within minutes.</p>
          </div>
          <div class="l05-golden-card" style="margin-bottom: 0.35rem; padding: 0.4rem 0.65rem;">
            <div class="l05-golden-header" style="font-size: 0.78rem;"><span>🗜️</span><strong>Zstandard (zstd) Compression</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.3;">Enabling <code>zstd</code> compression shrinks 2D laser scans and pointclouds by up to 70% with negligible CPU overhead on modern AMR embedded processors.</p>
          </div>
          <div class="l05-golden-card" style="padding: 0.4rem 0.65rem;">
            <div class="l05-golden-header" style="font-size: 0.78rem;"><span>🏷️</span><strong>Explicit Directory Naming (-o)</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.3;">Always supply <code>-o &lt;name&gt;</code> with mission timestamps (e.g. <code>amr_patrol_2026_11_12</code>) to prevent cryptic auto-generated timestamp folder names.</p>
          </div>
        </div>
      </div>
    `}),a.push({id:`${t.id}_sec4_playback_simulation`,type:"concept",lessonNum:t.num_str,lessonId:t.id,module:t.module,sectionTitle:"4. Inspecting Bag Metadata & Offline Simulation Playback",badge:"▶️ Simulation Playback",title:"4. Offline Simulation Playback: The Authoritative --clock Time Rule",htmlContent:`
      <div class="l03-two-col-layout">
        <div class="l03-left-code-col">
          <div class="l03-cmd-card" style="margin-bottom: 0.35rem;">
            <div class="l03-cmd-header"><span class="l03-term-badge">Metadata Inspection</span><strong>ros2 bag info</strong></div>
            <pre><code class="language-bash">ros2 bag info amr_patrol_01/
# Reports: Duration, Storage format (mcap), 
# Message count, and exact Topic schemas.</code></pre>
          </div>
          <div class="l03-cmd-card">
            <div class="l03-cmd-header"><span class="l03-term-badge">ros2 bag play</span><strong>Offline Simulation</strong></div>
            <pre><code class="language-bash"># Playback driving simulated time:
ros2 bag play --clock 10 -r 1.0 amr_patrol_01/

# Fast-forward 2x speed:
ros2 bag play -r 2.0 amr_patrol_01/

# Remap topic for algorithm comparison:
ros2 bag play amr_patrol_01/ --remap /scan:=/recorded_scan</code></pre>
          </div>
        </div>
        <div class="l03-content-col">
          <div class="l05-golden-card" style="margin-bottom: 0.35rem; padding: 0.4rem 0.65rem;">
            <div class="l05-golden-header" style="font-size: 0.78rem;"><span>⏱️</span><strong>The --clock 10 Parameter Rule</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.3;">Publishes historical timestamps to <code>/clock</code> at 10 Hz. Launch SLAM or RViz2 with <code>use_sim_time:=True</code> to reconstruct missions seamlessly as if running live.</p>
          </div>
          <div class="l05-golden-card" style="margin-bottom: 0.35rem; padding: 0.4rem 0.65rem;">
            <div class="l05-golden-header" style="font-size: 0.78rem;"><span>⏩</span><strong>Rate Scaling (-r) &amp; Looping (-l)</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.3;">Accelerate testing at <code>-r 2.0</code> (double speed) or slow down to <code>-r 0.25</code> to inspect high-speed collision close calls frame-by-frame.</p>
          </div>
          <div class="l05-golden-card" style="padding: 0.4rem 0.65rem;">
            <div class="l05-golden-header" style="font-size: 0.78rem;"><span>🔀</span><strong>Dynamic Topic Remapping</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.3;">Remap <code>/scan:=/recorded_scan</code> to feed historical sensor data into a newly tuned SLAM Toolbox node without topic collision.</p>
          </div>
        </div>
      </div>
    `}),a.push({id:`${t.id}_sec5_rosbag2_py`,type:"concept",lessonNum:t.num_str,lessonId:t.id,module:t.module,sectionTitle:"5. Offline Python Analysis using rosbag2_py",badge:"🐍 Python Analytics",title:"5. Programmatic Bag Analysis: Automated CI/CD Regression & Telemetry Extraction",htmlContent:`
      <div class="l03-two-col-layout">
        <div class="l03-left-code-col">
          <div class="l03-cmd-card" style="margin-bottom: 0;">
            <div class="l03-cmd-header"><span class="l03-term-badge">analyze_bag.py</span><strong>SequentialReader API</strong></div>
            <pre><code class="language-python">import rosbag2_py
from rclpy.serialization import deserialize_message
from sensor_msgs.msg import LaserScan

reader = rosbag2_py.SequentialReader()
storage_options = rosbag2_py.StorageOptions(
    uri='amr_patrol_01', storage_id='mcap'
)
converter_options = rosbag2_py.ConverterOptions(
    input_serialization_format='cdr',
    output_serialization_format='cdr'
)
reader.open(storage_options, converter_options)

while reader.has_next():
    (topic, data, stamp) = reader.read_next()
    if topic == '/scan':
        scan = deserialize_message(data, LaserScan)
        # Audit minimum obstacle clearance
        min_dist = min(scan.ranges)</code></pre>
          </div>
        </div>
        <div class="l03-content-col">
          <div class="l05-golden-card" style="margin-bottom: 0.35rem; padding: 0.4rem 0.65rem;">
            <div class="l05-golden-header" style="font-size: 0.78rem;"><span>📊</span><strong>Automated CI/CD Regression Testing</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.3;">Run automated Python test suites that ingest field bags, verify that minimum obstacle clearance never fell below 0.20m, and fail builds on safety violations.</p>
          </div>
          <div class="l05-golden-card" style="margin-bottom: 0.35rem; padding: 0.4rem 0.65rem;">
            <div class="l05-golden-header" style="font-size: 0.78rem;"><span>📈</span><strong>Pandas &amp; NumPy Pipeline</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.3;">Extract odometry and battery telemetry directly into Pandas DataFrames for fleet MTBF (Mean Time Between Failures) analytics.</p>
          </div>
          <div class="l05-golden-card" style="padding: 0.4rem 0.65rem;">
            <div class="l05-golden-header" style="font-size: 0.78rem;"><span>⚡</span><strong>Zero ROS 2 Daemon Overhead</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.3;">Processes gigabytes of recorded robotics telemetry in seconds without launching ROS 2 middleware daemons or DDS network discovery.</p>
          </div>
        </div>
      </div>
    `})}function ji(s,t,a){a.push({id:`${t.id}_sec2_master_cli_matrix`,type:"concept",lessonNum:t.num_str,lessonId:t.id,module:t.module,sectionTitle:"2. Master CLI Reference Matrix",badge:"⌨️ Master CLI Matrix",title:"2. The ROS 2 CLI Architectural Framework: Unified Verb-Noun Grammar",htmlContent:`
      <div class="l06-table-wrap">
        <table>
          <thead>
            <tr>
              <th style="width: 18%;">Verb Group</th>
              <th style="width: 38%;">Primary Introspection Commands</th>
              <th style="width: 44%;">Operational Purpose</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><code>ros2 node</code></td>
              <td><code>list</code>, <code>info &lt;node&gt;</code></td>
              <td>Inspect active computation graph, publishers, subscribers, services.</td>
            </tr>
            <tr>
              <td><code>ros2 topic</code></td>
              <td><code>list</code>, <code>echo</code>, <code>hz</code>, <code>bw</code>, <code>info -v</code></td>
              <td>Monitor telemetry streams, data bandwidth, publication frequency, QoS.</td>
            </tr>
            <tr>
              <td><code>ros2 service</code></td>
              <td><code>list</code>, <code>type</code>, <code>call &lt;srv&gt; &lt;type&gt; &lt;data&gt;</code></td>
              <td>Execute synchronous RPC requests and test server transactions.</td>
            </tr>
            <tr>
              <td><code>ros2 action</code></td>
              <td><code>list</code>, <code>send_goal &lt;act&gt; &lt;type&gt; --feedback</code></td>
              <td>Dispatch long-duration navigation goals and monitor progress.</td>
            </tr>
            <tr>
              <td><code>ros2 param</code></td>
              <td><code>list</code>, <code>get</code>, <code>set</code>, <code>dump</code></td>
              <td>Tune PID gains, velocity limits, and node configurations in real time.</td>
            </tr>
            <tr>
              <td><code>ros2 doctor</code></td>
              <td><code>--report</code>, <code>multicast receive / send</code></td>
              <td>Audit DDS participant discovery, network interfaces, platform health.</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="l05-banner-intro" style="margin-top: 0.4rem; font-size: 0.74rem; padding: 0.35rem 0.6rem;">
        <strong>💡 Grammar Uniformity:</strong> ROS 2 adheres to strict <code>ros2 &lt;verb&gt; &lt;noun&gt; [arguments]</code> syntax across all sub-systems, making terminal navigation intuitive and scriptable.
      </div>
    `}),a.push({id:`${t.id}_sec3_deep_introspection`,type:"concept",lessonNum:t.num_str,lessonId:t.id,module:t.module,sectionTitle:"3. Deep Graph Introspection: Nodes, Topics & QoS",badge:"🔍 Graph Introspection",title:"3. Deep Graph Introspection: Uncovering Hidden DDS Graph Topologies & QoS",htmlContent:`
      <div class="l03-two-col-layout">
        <div class="l03-content-col">
          <div class="l03-cmd-card">
            <div class="l03-cmd-header"><span class="l03-term-badge">Introspection Verbs</span><strong>Deep Node &amp; Topic Analysis</strong></div>
            <pre><code class="language-bash"># 1. Uncover all publishers, subscribers, &amp; services of a node:
ros2 node info /amr_controller

# 2. Inspect verbose topic metadata &amp; QoS profiles:
ros2 topic info /scan --verbose

# 3. Measure publication frequency with microsecond precision:
ros2 topic hz /scan

# 4. Measure network bandwidth consumption:
ros2 topic bw /camera/image_raw</code></pre>
          </div>
        </div>
        <div class="l03-content-col">
          <div class="l05-golden-card" style="margin-bottom: 0.35rem; padding: 0.4rem 0.65rem;">
            <div class="l05-golden-header" style="font-size: 0.78rem;"><span>🔎</span><strong>ros2 node info: The X-Ray Diagnostic</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.3;">Shows every communication port hosted by the node. Instantly reveals if a subscriber topic name was misspelled or remapped incorrectly.</p>
          </div>
          <div class="l05-golden-card" style="margin-bottom: 0.35rem; padding: 0.4rem 0.65rem;">
            <div class="l05-golden-header" style="font-size: 0.78rem;"><span>🛡️</span><strong>QoS Compatibility Detective (topic info -v)</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.3;">Identifies fatal DDS mismatches (e.g. Reliable subscriber listening to Best Effort publisher), which silently prevents messages from being delivered.</p>
          </div>
          <div class="l05-golden-card" style="padding: 0.4rem 0.65rem;">
            <div class="l05-golden-header" style="font-size: 0.78rem;"><span>📊</span><strong>Bandwidth Auditing (topic bw)</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.3;">Detects Wi-Fi congestion caused by uncompressed camera images before deploying multi-robot fleets on shared wireless access points.</p>
          </div>
        </div>
      </div>
    `}),a.push({id:`${t.id}_sec4_transactional_verbs`,type:"concept",lessonNum:t.num_str,lessonId:t.id,module:t.module,sectionTitle:"4. Transactional Verbs: Services, Actions & Parameters",badge:"⚡ Transactional CLI",title:"4. Transactional Verbs: Direct RPC Service Calls & Live Action Dispatch",htmlContent:`
      <div class="l03-two-col-layout">
        <div class="l03-left-code-col">
          <div class="l03-cmd-card" style="margin-bottom: 0.35rem;">
            <div class="l03-cmd-header"><span class="l03-term-badge">Service Call</span><strong>Testing RPC Directly</strong></div>
            <pre><code class="language-bash"># Call service with inline YAML dictionary payload:
ros2 service call /reset_odom   nexus_amr_interfaces/srv/ResetOdometry   "{x: 0.0, y: 0.0, theta: 0.0}"</code></pre>
          </div>
          <div class="l03-cmd-card">
            <div class="l03-cmd-header"><span class="l03-term-badge">Action Dispatch</span><strong>Streaming Live Feedback</strong></div>
            <pre><code class="language-bash"># Send action goal with live feedback enabled:
ros2 action send_goal /dock_robot   nexus_amr_interfaces/action/DockRobot   "{docking_station_id: 'bay_04'}"   --feedback</code></pre>
          </div>
        </div>
        <div class="l03-content-col">
          <div class="l05-golden-card" style="margin-bottom: 0.35rem; padding: 0.4rem 0.65rem;">
            <div class="l05-golden-header" style="font-size: 0.78rem;"><span>🧪</span><strong>Headless Unit Testing Without GUIs</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.3;">Verify service server logic and response schemas directly in terminal before building complex client GUI widgets or web frontends.</p>
          </div>
          <div class="l05-golden-card" style="margin-bottom: 0.35rem; padding: 0.4rem 0.65rem;">
            <div class="l05-golden-header" style="font-size: 0.78rem;"><span>📡</span><strong>The --feedback Action Flag</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.3;">Streams ongoing intermediate feedback ticks (distance remaining, alignment angle) in real time until the terminal goal result returns.</p>
          </div>
          <div class="l05-golden-card" style="padding: 0.4rem 0.65rem;">
            <div class="l05-golden-header" style="font-size: 0.78rem;"><span>🤖</span><strong>Automated Test Scripting</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.3;">Integrate CLI service calls into bash validation scripts to test physical hardware bringup in manufacturing assembly lines.</p>
          </div>
        </div>
      </div>
    `}),a.push({id:`${t.id}_sec5_doctor_diagnostics`,type:"concept",lessonNum:t.num_str,lessonId:t.id,module:t.module,sectionTitle:"5. Advanced Network Diagnostics & ROS 2 Doctor",badge:"🩺 Network Diagnostics",title:"5. Fleet Diagnostics: ROS 2 Doctor & DDS Multicast Health Audits",htmlContent:`
      <div class="l03-two-col-layout">
        <div class="l03-content-col">
          <div class="l03-cmd-card">
            <div class="l03-cmd-header"><span class="l03-term-badge">Diagnostic Commands</span><strong>Network &amp; Health Auditing</strong></div>
            <pre><code class="language-bash"># 1. Complete automated environment &amp; network health audit:
ros2 doctor --report

# 2. Test DDS multicast reception on Robot A:
ros2 multicast receive

# 3. Transmit test multicast ping from Developer PC:
ros2 multicast send

# 4. Enforce strict fleet domain isolation:
export ROS_DOMAIN_ID=42</code></pre>
          </div>
        </div>
        <div class="l03-content-col">
          <div class="l05-golden-card" style="margin-bottom: 0.35rem; padding: 0.4rem 0.65rem;">
            <div class="l05-golden-header" style="font-size: 0.78rem;"><span>🩺</span><strong>ros2 doctor --report Automated Health Check</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.3;">Scans your Linux kernel, network MTUs, environment variables, and package versions. Pinpoints configuration conflicts instantly.</p>
          </div>
          <div class="l05-golden-card" style="margin-bottom: 0.35rem; padding: 0.4rem 0.65rem;">
            <div class="l05-golden-header" style="font-size: 0.78rem;"><span>🌐</span><strong>DDS Multicast Discovery Verification</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.3;">Industrial switches frequently block UDP multicast. <code>ros2 multicast receive/send</code> validates whether discovery packets can pass through the facility network.</p>
          </div>
          <div class="l05-golden-card" style="padding: 0.4rem 0.65rem;">
            <div class="l05-golden-header" style="font-size: 0.78rem;"><span>🔒</span><strong>ROS_DOMAIN_ID Fleet Isolation</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.3;">Assign distinct domain IDs (0&ndash;101) to each physical AMR on a shared warehouse Wi-Fi network to eliminate topic crosstalk and command collision.</p>
          </div>
        </div>
      </div>
    `})}function wi(s,t,a){a.push({id:`${t.id}_sec2_why_behavior_trees`,type:"concept",lessonNum:t.num_str,lessonId:t.id,module:t.module,sectionTitle:"2. Why Behavior Trees Over State Machines?",badge:"🌳 Behavior Trees",title:"2. Why Behavior Trees? Overcoming Finite State Machine (FSM) Complexity",htmlContent:`
      <div class="l06-table-wrap">
        <table>
          <thead>
            <tr>
              <th style="width: 20%;">Dimension</th>
              <th style="width: 40%;">Finite State Machines (FSMs)</th>
              <th style="width: 40%;">Behavior Trees (BTs)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>Scalability &amp; Transitions</strong></td>
              <td>State explosion ($O(N^2)$ transitions). Adding 1 state requires updating every existing transition.</td>
              <td>Modular tree hierarchy ($O(N)$). Nodes can be added, pruned, or reordered independently.</td>
            </tr>
            <tr>
              <td><strong>Reactive Preemption</strong></td>
              <td>Rigid polling states; interrupting an action requires complex conditional escape transitions.</td>
              <td>Ticked at high frequency (10Hz). Parent Fallback nodes can preempt children immediately.</td>
            </tr>
            <tr>
              <td><strong>Node Return Contract</strong></td>
              <td>Arbitrary internal state identifiers and variable transitions.</td>
              <td>Every node returns strictly: <code>SUCCESS</code>, <code>FAILURE</code>, or <code>RUNNING</code>.</td>
            </tr>
            <tr>
              <td><strong>Visual Reusability</strong></td>
              <td>Monolithic code structures; difficult to reuse state fragments across robots.</td>
              <td>Modular XML sub-trees reusable across arm manipulators, drones, and AMRs.</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="l05-banner-intro" style="margin-top: 0.4rem; font-size: 0.74rem; padding: 0.35rem 0.6rem;">
        <strong>💡 Key BT Paradigm:</strong> <code>Sequence</code> acts as AND (ticks children until one fails); <code>Fallback</code> acts as OR (ticks children until one succeeds).
      </div>
    `}),a.push({id:`${t.id}_sec3_recovery_pipeline`,type:"concept",lessonNum:t.num_str,lessonId:t.id,module:t.module,sectionTitle:"3. The Recovery Sub-Tree Pipeline & Behavior Tree Execution",badge:"🔄 Cascading Recoveries",title:"3. Nav2 Recovery Pipeline: The Cascading NavigateRecovery Sub-Tree",htmlContent:`
      <div class="l03-two-col-layout">
        <div class="l03-left-code-col">
          <div class="l03-cmd-card" style="margin-bottom: 0;">
            <div class="l03-cmd-header"><span class="l03-term-badge">navigate_w_replanning_and_recovery.xml</span><strong>BT Sub-Tree</strong></div>
            <pre><code class="language-xml">&lt;root main_tree_to_execute="MainTree"&gt;
  &lt;BehaviorTree ID="MainTree"&gt;
    &lt;RecoveryNode number_of_retries="6" name="NavigateRecovery"&gt;
      &lt;!-- Primary Mission Branch --&gt;
      &lt;PipelineSequence name="NavigateWithReplanning"&gt;
        &lt;ComputePathToPose goal="{goal}" path="{path}"/&gt;
        &lt;FollowPath path="{path}"/&gt;
      &lt;/PipelineSequence&gt;

      &lt;!-- Cascading Recovery Fallback Branch --&gt;
      &lt;ReactiveFallback name="RecoveryFallback"&gt;
        &lt;ClearEntireCostmap service_name="local_costmap/clear_entirely_local_costmap"/&gt;
        &lt;Spin spin_dist="1.57"/&gt;
        &lt;BackUp backup_dist="0.30" backup_speed="0.10"/&gt;
        &lt;Wait wait_duration="2.0"/&gt;
      &lt;/ReactiveFallback&gt;
    &lt;/RecoveryNode&gt;
  &lt;/BehaviorTree&gt;
&lt;/root&gt;</code></pre>
          </div>
        </div>
        <div class="l03-content-col">
          <div class="l05-golden-card" style="margin-bottom: 0.35rem; padding: 0.4rem 0.65rem;">
            <div class="l05-golden-header" style="font-size: 0.78rem;"><span>1️⃣</span><strong>Step 1: Costmap Clearing</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.3;">Purges dynamic LiDAR sensor artifacts and transient ghost obstacles from the costmap before taking physical action.</p>
          </div>
          <div class="l05-golden-card" style="margin-bottom: 0.35rem; padding: 0.4rem 0.65rem;">
            <div class="l05-golden-header" style="font-size: 0.78rem;"><span>2️⃣</span><strong>Step 2: In-Place Spin (90&deg;&ndash;180&deg;)</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.3;">Rotates the AMR in place to sweep blind spots with 2D LiDAR and re-localize in AMCL against distinctive features.</p>
          </div>
          <div class="l05-golden-card" style="margin-bottom: 0.35rem; padding: 0.4rem 0.65rem;">
            <div class="l05-golden-header" style="font-size: 0.78rem;"><span>3️⃣</span><strong>Step 3: Safe BackUp (0.30m) &amp; Wait</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.3;">Reverses into verified clear space, pausing 2 seconds to allow pedestrian traffic to pass before attempting to re-plan.</p>
          </div>
        </div>
      </div>
    `}),a.push({id:`${t.id}_sec4_lifecycle_state_machine`,type:"concept",lessonNum:t.num_str,lessonId:t.id,module:t.module,sectionTitle:"4. The ROS 2 Lifecycle State Machine",badge:"🚦 Lifecycle Nodes",title:"4. Managed Lifecycle State Machine (REP-2007): Deterministic Node States",htmlContent:`
      <div class="l03-two-col-layout">
        <div class="l03-content-col">
          <div class="l05-golden-card" style="margin-bottom: 0.35rem; padding: 0.4rem 0.65rem;">
            <div class="l05-golden-header" style="font-size: 0.78rem;"><span>⚪</span><strong>1. Unconfigured State</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.3;">Node instantiated in memory, but no hardware handles or network resources allocated. Invoking <code>configure</code> triggers <code>on_configure()</code>.</p>
          </div>
          <div class="l05-golden-card" style="margin-bottom: 0.35rem; padding: 0.4rem 0.65rem;">
            <div class="l05-golden-header" style="font-size: 0.78rem;"><span>🟡</span><strong>2. Inactive Holding State</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.3;">All configuration loaded, publishers and subscribers created, but <strong>actuators are paused</strong>. No velocity messages are emitted. Node is completely safe.</p>
          </div>
          <div class="l05-golden-card" style="padding: 0.4rem 0.65rem;">
            <div class="l05-golden-header" style="font-size: 0.78rem;"><span>🟢</span><strong>3. Active Execution State</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.3;">Invoking <code>activate</code> transitions node to <code>Active</code> via <code>on_activate()</code>. Actuator loops start and wheel velocity commands stream to hardware.</p>
          </div>
        </div>
        <div class="l03-content-col">
          <div class="l05-golden-card" style="margin-bottom: 0.35rem; padding: 0.4rem 0.65rem;">
            <div class="l05-golden-header" style="font-size: 0.78rem;"><span>🔴</span><strong>4. Finalized (Shutdown) State</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.3;">Hardware drivers safely parked and connections closed. Memory ready for immediate clean deallocation by the operating system.</p>
          </div>
          <div class="l05-golden-card" style="padding: 0.4rem 0.65rem;">
            <div class="l05-golden-header" style="font-size: 0.78rem;"><span>🛡️</span><strong>Why Industry Demands Lifecycle Nodes</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.3;">Prevents race conditions where motor controllers attempt to drive wheels before LiDAR drivers finish booting, eliminating startup safety accidents.</p>
          </div>
        </div>
      </div>
    `}),a.push({id:`${t.id}_sec5_lifecycle_management_cli`,type:"concept",lessonNum:t.num_str,lessonId:t.id,module:t.module,sectionTitle:"5. Inspecting Lifecycle States with the CLI",badge:"🎛️ Lifecycle Orchestration",title:"5. Lifecycle Orchestration: CLI State Transitions & Nav2 Lifecycle Manager",htmlContent:`
      <div class="l03-two-col-layout">
        <div class="l03-content-col">
          <div class="l03-cmd-card">
            <div class="l03-cmd-header"><span class="l03-term-badge">Lifecycle CLI Verbs</span><strong>Manual Transition Commands</strong></div>
            <pre><code class="language-bash"># 1. Query active state of a node:
ros2 lifecycle get /amr_controller

# 2. Transition from Unconfigured to Inactive:
ros2 lifecycle set /amr_controller configure

# 3. Transition from Inactive to Active:
ros2 lifecycle set /amr_controller activate

# 4. Emergency pause (Active -> Inactive):
ros2 lifecycle set /amr_controller deactivate</code></pre>
          </div>
        </div>
        <div class="l03-content-col">
          <div class="l05-golden-card" style="margin-bottom: 0.35rem; padding: 0.4rem 0.65rem;">
            <div class="l05-golden-header" style="font-size: 0.78rem;"><span>🎼</span><strong>Nav2 lifecycle_manager Orchestration</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.3;">In production, human operators do not manage lifecycle transitions manually. Nav2's <code>lifecycle_manager</code> brings all 8 navigation servers into <code>Active</code> in strict lockstep.</p>
          </div>
          <div class="l05-golden-card" style="margin-bottom: 0.35rem; padding: 0.4rem 0.65rem;">
            <div class="l05-golden-header" style="font-size: 0.78rem;"><span>🔄</span><strong>Dynamic Fault Reset Pipeline</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.3;">If a hardware driver faults, execute: <code>deactivate &rarr; cleanup &rarr; configure &rarr; activate</code> to reload configuration and reset communication without rebooting the robot PC.</p>
          </div>
          <div class="l05-golden-card" style="padding: 0.4rem 0.65rem;">
            <div class="l05-golden-header" style="font-size: 0.78rem;"><span>🏆</span><strong>Curriculum Mastery Achieved</strong></div>
            <p style="font-size: 0.74rem; line-height: 1.3;">You now command the complete industrial ROS 2 stack: from Linux foundations and URDF to Nav2 autonomous navigation and behavior tree recovery.</p>
          </div>
        </div>
      </div>
    `})}const Tt={S:{x:70,y:145,h:11.5,label:"S (Start)"},A:{x:175,y:70,h:10.1,label:"A"},D:{x:185,y:220,h:9.2,label:"D"},B:{x:315,y:70,h:5.8,label:"B"},E:{x:315,y:220,h:7.1,label:"E"},C:{x:445,y:70,h:3.4,label:"C"},F:{x:435,y:220,h:3.5,label:"F"},G:{x:535,y:145,h:0,label:"G (Goal)"}},Si=[{from:"S",to:"A",cost:3,midX:120,midY:95},{from:"S",to:"D",cost:4,midX:125,midY:195},{from:"A",to:"B",cost:4,midX:245,midY:55},{from:"A",to:"D",cost:5,midX:195,midY:145},{from:"D",to:"E",cost:2,midX:250,midY:235},{from:"B",to:"C",cost:4,midX:380,midY:55},{from:"B",to:"E",cost:5,midX:300,midY:145},{from:"E",to:"F",cost:4,midX:375,midY:235},{from:"F",to:"G",cost:3.5,midX:495,midY:195}],de=[{step:0,title:"Initialize Search at Start Node S",current:"S",closed:[],frontier:[{path:"S",g:0,h:11.5,f:11.5,status:"Selected Next"}],activeEdges:[],optimalPath:[],explanation:"Begin search at start node S. Compute heuristic h(S) = 11.5. Priority queue initializes with f(S) = g(0) + h(11.5) = 11.5."},{step:1,title:"Expand Start Node S: Evaluate Neighbors A & D",current:"S",closed:["S"],frontier:[{path:"S → A",g:3,h:10.1,f:13.1,status:"Lowest f(n) • Selected"},{path:"S → D",g:4,h:9.2,f:13.2,status:"Queued in Frontier"}],activeEdges:["S-A","S-D"],optimalPath:[],explanation:"Pop S. Expand neighbors: S→A has f = 3 + 10.1 = 13.1; S→D has f = 4 + 9.2 = 13.2. S→A is selected because 13.1 < 13.2."},{step:2,title:"Pop S → A (f=13.1): Expand Node A to B & D",current:"A",closed:["S","A"],frontier:[{path:"S → A → B",g:7,h:5.8,f:12.8,status:"Lowest f(n) • Selected"},{path:"S → D",g:4,h:9.2,f:13.2,status:"Queued in Frontier"},{path:"S → A → D",g:8,h:9.2,f:17.2,status:"Sub-optimal Branch"}],activeEdges:["S-A","A-B","A-D","S-D"],optimalPath:[],explanation:"Pop S→A (f=13.1). Expand A: generated S→A→B (g=7, h=5.8, f=12.8) and S→A→D (g=8, h=9.2, f=17.2). S→A→B has lowest f=12.8!"},{step:3,title:"Pop S → A → B (f=12.8): Expand Node B to C & E",current:"B",closed:["S","A","B"],frontier:[{path:"S → D",g:4,h:9.2,f:13.2,status:"Lowest f(n) • Backtrack"},{path:"S → A → B → C",g:11,h:3.4,f:14.4,status:"Queued in Frontier"},{path:"S → A → D",g:8,h:9.2,f:17.2,status:"Sub-optimal"},{path:"S → A → B → E",g:12,h:7.1,f:19.1,status:"Sub-optimal"}],activeEdges:["S-A","A-B","B-C","B-E","S-D"],optimalPath:[],explanation:"Pop S→A→B (f=12.8). Generated S→A→B→C (f=14.4) and S→A→B→E (f=19.1). The lowest f-score in the queue is now S→D (13.2)! Algorithm backtracks to branch D."},{step:4,title:"Pop S → D (f=13.2): Expand Node D to E",current:"D",closed:["S","A","B","D"],frontier:[{path:"S → D → E",g:6,h:7.1,f:13.1,status:"Lowest f(n) • Selected"},{path:"S → A → B → C",g:11,h:3.4,f:14.4,status:"Queued in Frontier"},{path:"S → D → A",g:9,h:10.1,f:19.1,status:"Sub-optimal"},{path:"S → A → B → E",g:12,h:7.1,f:19.1,status:"Pruned (Costlier)"}],activeEdges:["S-D","D-E","S-A","A-B","B-C"],optimalPath:[],explanation:"Pop S→D (f=13.2). Expand D to E: path S→D→E has g=6, h=7.1, f=13.1. This is much cheaper than reaching E via B (f=19.1)! S→D→E becomes top candidate."},{step:5,title:"Pop S → D → E (f=13.1): Expand Node E to F",current:"E",closed:["S","A","B","D","E"],frontier:[{path:"S → D → E → F",g:10,h:3.5,f:13.5,status:"Lowest f(n) • Selected"},{path:"S → A → B → C",g:11,h:3.4,f:14.4,status:"Queued in Frontier"},{path:"S → D → E → B",g:11,h:5.8,f:16.8,status:"Sub-optimal"}],activeEdges:["S-D","D-E","E-F"],optimalPath:[],explanation:"Pop S→D→E (f=13.1). Expand E to F: generated S→D→E→F (g=10, h=3.5, f=13.5). S→D→E→F holds lowest f-score and advances toward Goal."},{step:6,title:"Pop S → D → E → F (f=13.5): Reach Goal G!",current:"F",closed:["S","A","B","D","E","F"],frontier:[{path:"S → D → E → F → G",g:13.5,h:0,f:13.5,status:"Goal Found • Ready to Pop"},{path:"S → A → B → C",g:11,h:3.4,f:14.4,status:"Queued in Frontier"}],activeEdges:["S-D","D-E","E-F","F-G"],optimalPath:["S-D","D-E","E-F","F-G"],explanation:"Pop S→D→E→F (f=13.5). Expand F to Goal G: total path cost g = 13.5, h = 0, f = 13.5! Target path is queued with lowest cost."},{step:7,title:"Goal G Popped: Optimal Path Guaranteed (Cost = 13.5)",current:"G",closed:["S","A","B","D","E","F","G"],frontier:[{path:"S → D → E → F → G",g:13.5,h:0,f:13.5,status:"✓ OPTIMAL PATH FOUND"}],activeEdges:["S-D","D-E","E-F","F-G"],optimalPath:["S-D","D-E","E-F","F-G"],explanation:"Goal node G popped from frontier! Because the heuristic h(n) is admissible (never overestimates true cost), S → D → E → F → G is provably optimal!"}];function Ni(){const[s,t]=r.useState(0),[a,p]=r.useState(!1),c=de[s];r.useEffect(()=>{let x=null;return a&&(x=setInterval(()=>{t(f=>f<de.length-1?f+1:(p(!1),f))},1800)),()=>clearInterval(x)},[a]);const A=x=>{x&&x.stopPropagation(),s<de.length-1&&t(f=>f+1)},S=x=>{x&&x.stopPropagation(),s>0&&t(f=>f-1)},E=x=>{x&&x.stopPropagation(),p(!1),t(0)},k=x=>{x&&x.stopPropagation(),p(f=>!f)};return e.jsxs("div",{className:"astar-interactive-container",style:{display:"flex",flexDirection:"column",height:"100%",width:"100%",padding:"0.4rem 0.6rem",boxSizing:"border-box",gap:"0.4rem",background:"var(--bg-card, #0f172a)",borderRadius:"10px",border:"1px solid var(--border-color, #334155)",color:"var(--text-primary, #f8fafc)"},children:[e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:"0.4rem",borderBottom:"1px solid var(--border-color, #334155)",paddingBottom:"0.35rem"},children:[e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"0.5rem"},children:[e.jsxs("span",{style:{background:"#8b5cf6",color:"#fff",padding:"0.2rem 0.55rem",borderRadius:"999px",fontSize:"0.72rem",fontWeight:700,display:"flex",alignItems:"center",gap:"0.3rem"},children:[e.jsx(he,{size:13}),"Step ",s," of ",de.length-1]}),e.jsx("strong",{style:{fontSize:"0.82rem",color:"#e2e8f0"},children:c.title})]}),e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"0.35rem"},children:[e.jsxs("button",{onClick:S,disabled:s===0,style:{display:"flex",alignItems:"center",gap:"0.2rem",padding:"0.25rem 0.55rem",fontSize:"0.72rem",fontWeight:600,borderRadius:"6px",border:"1px solid #475569",background:s===0?"#1e293b":"#334155",color:s===0?"#64748b":"#f8fafc",cursor:s===0?"not-allowed":"pointer"},children:[e.jsx(Et,{size:14})," Prev"]}),e.jsxs("button",{onClick:k,style:{display:"flex",alignItems:"center",gap:"0.25rem",padding:"0.25rem 0.65rem",fontSize:"0.72rem",fontWeight:600,borderRadius:"6px",border:"1px solid #8b5cf6",background:a?"#7c3aed":"rgba(139, 92, 246, 0.2)",color:"#f8fafc",cursor:"pointer"},children:[a?e.jsx(pt,{size:13}):e.jsx(Ue,{size:13}),a?"Pause":"Auto Play"]}),e.jsxs("button",{onClick:A,disabled:s===de.length-1,style:{display:"flex",alignItems:"center",gap:"0.2rem",padding:"0.25rem 0.65rem",fontSize:"0.72rem",fontWeight:600,borderRadius:"6px",border:"1px solid #10b981",background:s===de.length-1?"#1e293b":"#059669",color:s===de.length-1?"#64748b":"#f8fafc",cursor:s===de.length-1?"not-allowed":"pointer"},children:["Next Step ",e.jsx(Be,{size:14})]}),e.jsx("button",{onClick:E,title:"Reset to Step 0",style:{display:"flex",alignItems:"center",padding:"0.25rem 0.4rem",fontSize:"0.72rem",borderRadius:"6px",border:"1px solid #475569",background:"#1e293b",color:"#94a3b8",cursor:"pointer"},children:e.jsx(Z,{size:13})})]})]}),e.jsxs("div",{style:{display:"grid",gridTemplateColumns:"1.25fr 1fr",gap:"0.5rem",flex:1,minHeight:0},children:[e.jsxs("div",{onClick:A,title:"Click to advance to next step",style:{position:"relative",background:"rgba(2, 6, 23, 0.75)",border:"1px solid rgba(139, 92, 246, 0.3)",borderRadius:"8px",overflow:"hidden",display:"flex",flexDirection:"column",justifyContent:"center",cursor:s<de.length-1?"pointer":"default"},children:[e.jsxs("div",{style:{position:"absolute",top:"6px",left:"8px",fontSize:"0.66rem",color:"#94a3b8",display:"flex",gap:"0.7rem"},children:[e.jsxs("span",{children:[e.jsx("strong",{style:{color:"#eab308"},children:"●"})," Active / Current"]}),e.jsxs("span",{children:[e.jsx("strong",{style:{color:"#38bdf8"},children:"●"})," In Frontier"]}),e.jsxs("span",{children:[e.jsx("strong",{style:{color:"#10b981"},children:"●"})," Optimal Path"]})]}),e.jsxs("svg",{viewBox:"0 0 600 290",style:{width:"100%",height:"100%",maxHeight:"250px"},children:[Si.map(x=>{const f=Tt[x.from],T=Tt[x.to],d=`${x.from}-${x.to}`,o=c.optimalPath.includes(d),l=c.activeEdges.includes(d);let y="#334155",b=2,C="none";return o?(y="#10b981",b=4):l&&(y="#f59e0b",b=2.5,C="4,3"),e.jsxs("g",{children:[e.jsx("line",{x1:f.x,y1:f.y,x2:T.x,y2:T.y,stroke:y,strokeWidth:b,strokeDasharray:C}),e.jsx("rect",{x:x.midX-11,y:x.midY-8,width:22,height:16,rx:3,fill:"#0f172a",stroke:o?"#10b981":l?"#f59e0b":"#334155",strokeWidth:1}),e.jsx("text",{x:x.midX,y:x.midY+4,fill:o?"#34d399":l?"#fbbf24":"#94a3b8",fontSize:"10",fontWeight:"bold",textAnchor:"middle",children:x.cost})]},d)}),Object.entries(Tt).map(([x,f])=>{const T=c.current===x,d=c.closed.includes(x),o=c.frontier.some(z=>z.next===x),l=s>=6&&["S","D","E","F","G"].includes(x);let y="#1e293b",b="#475569",C="#f8fafc";return l&&s===7?(y="#065f46",b="#10b981",C="#6ee7b7"):T?(y="#78350f",b="#f59e0b",C="#fef08a"):o?(y="#0c4a6e",b="#0284c7",C="#7dd3fc"):d&&(y="#312e81",b="#6366f1",C="#c7d2fe"),e.jsxs("g",{children:[e.jsx("circle",{cx:f.x,y:f.y,r:18,fill:y,stroke:b,strokeWidth:T||l?3:2}),e.jsx("text",{x:f.x,y:f.y+4,fill:C,fontSize:"12",fontWeight:"bold",textAnchor:"middle",children:x}),e.jsx("rect",{x:f.x-17,y:f.y-30,width:34,height:14,rx:3,fill:"rgba(15, 23, 42, 0.9)",stroke:"#475569",strokeWidth:.8}),e.jsxs("text",{x:f.x,y:f.y-19,fill:"#cbd5e1",fontSize:"8.5",fontWeight:"bold",textAnchor:"middle",children:["h=",f.h]})]},x)})]})]}),e.jsxs("div",{style:{background:"rgba(2, 6, 23, 0.75)",border:"1px solid rgba(139, 92, 246, 0.3)",borderRadius:"8px",padding:"0.45rem",display:"flex",flexDirection:"column",justifyContent:"space-between",overflow:"hidden"},children:[e.jsxs("div",{children:[e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"0.35rem",borderBottom:"1px solid #334155",paddingBottom:"0.25rem"},children:[e.jsx("span",{style:{fontSize:"0.72rem",fontWeight:700,color:"#a78bfa"},children:"Priority Queue Frontier (Ordered by f(n) = g + h)"}),e.jsxs("span",{style:{fontSize:"0.64rem",color:"#94a3b8"},children:["Queue Size: ",c.frontier.length]})]}),e.jsx("div",{style:{overflowX:"auto"},children:e.jsxs("table",{style:{width:"100%",borderCollapse:"collapse",fontSize:"0.68rem"},children:[e.jsx("thead",{children:e.jsxs("tr",{style:{background:"#1e293b",color:"#94a3b8",textAlign:"left"},children:[e.jsx("th",{style:{padding:"0.2rem 0.35rem"},children:"Candidate Path"}),e.jsx("th",{style:{padding:"0.2rem 0.35rem"},children:"g(n)"}),e.jsx("th",{style:{padding:"0.2rem 0.35rem"},children:"h(n)"}),e.jsx("th",{style:{padding:"0.2rem 0.35rem",color:"#eab308"},children:"f(n)"}),e.jsx("th",{style:{padding:"0.2rem 0.35rem"},children:"Status"})]})}),e.jsx("tbody",{children:c.frontier.map((x,f)=>e.jsxs("tr",{style:{background:f===0?"rgba(234, 179, 8, 0.12)":"transparent",borderBottom:"1px solid #1e293b",color:f===0?"#fef08a":"#cbd5e1"},children:[e.jsx("td",{style:{padding:"0.22rem 0.35rem",fontFamily:"monospace",fontWeight:600},children:x.path}),e.jsx("td",{style:{padding:"0.22rem 0.35rem"},children:x.g.toFixed(1)}),e.jsx("td",{style:{padding:"0.22rem 0.35rem"},children:x.h.toFixed(1)}),e.jsx("td",{style:{padding:"0.22rem 0.35rem",fontWeight:700,color:f===0?"#fbbf24":"#f8fafc"},children:x.f.toFixed(1)}),e.jsx("td",{style:{padding:"0.22rem 0.35rem",fontSize:"0.62rem"},children:e.jsx("span",{style:{padding:"0.1rem 0.35rem",borderRadius:"4px",background:f===0?"#854d0e":"#334155",color:f===0?"#fef08a":"#94a3b8"},children:x.status})})]},f))})]})})]}),e.jsxs("div",{style:{background:"rgba(30, 41, 59, 0.6)",border:"1px solid #334155",borderRadius:"6px",padding:"0.3rem 0.45rem",fontSize:"0.66rem",color:"#94a3b8",marginTop:"0.35rem"},children:[e.jsx("strong",{style:{color:"#38bdf8"},children:"f(n) = g(n) + h(n):"})," g(n) is exact cost from Start; h(n) is admissible heuristic distance to Goal."]})]})]}),e.jsxs("div",{style:{background:"rgba(15, 23, 42, 0.85)",borderLeft:"3px solid #8b5cf6",padding:"0.35rem 0.6rem",borderRadius:"4px",fontSize:"0.72rem",lineHeight:1.35,color:"#e2e8f0"},children:[e.jsx("span",{style:{color:"#a78bfa",fontWeight:700,marginRight:"0.35rem"},children:"💡 Step Mechanics:"}),c.explanation]})]})}function ys(s,t="bash"){if(!s)return"";let a="";try{a=be.highlight(s,{language:t||"bash",ignoreIllegals:!0}).value}catch{try{a=be.highlightAuto(s).value}catch{a=s.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}}if(t==="bash"||t==="sh"||t==="shell"){const p=[];a=a.replace(/<span class="hljs-comment">[\s\S]*?<\/span>/g,c=>(p.push(c),`___COMMENT_${p.length-1}___`)),a=a.replace(new RegExp("(?<=\\s|^)(--?[a-zA-Z0-9_\\-]+|\\+[xrwst]+)(?=\\s|$)","g"),(c,A)=>`<span class="hljs-flag">${A}</span>`),a=a.replace(new RegExp("(?<=\\s|^)(~?\\/[a-zA-Z0-9_.\\-\\/]+|\\b[a-zA-Z0-9_\\-]+\\.(?:py|yaml|yml|sh|bash|xml|launch\\.py|txt|log|urdf|xacro|srv|msg|action)\\b)","g"),(c,A)=>`<span class="hljs-path">${A}</span>`),a=a.replace(new RegExp("(?<=\\s|^)(\\|{1,2}|&&|>>|>|;)(?=\\s|$)","g"),(c,A)=>`<span class="hljs-operator">${A}</span>`),a=a.replace(/___COMMENT_(\d+)___/g,(c,A)=>p[A])}return a}function Ci({lessons:s=[],modules:t=[],initialLessonId:a=null,theme:p="light",onToggleTheme:c,onExitPresentation:A}){const[S,E]=r.useState(()=>{var j;if(a&&s.some(P=>P.id===a))return a;if(typeof window<"u"){const P=window.location.hash.match(/#\/(?:presentation|slides)\/(\d+)/);if(P){const G=s.find(O=>O.num_str===P[1].padStart(2,"0"));if(G)return G.id}}return((j=s[0])==null?void 0:j.id)||"lesson_01"}),[k,x]=r.useState(()=>{if(typeof window<"u"){const j=new URLSearchParams(window.location.hash.split("?")[1]||""),P=parseInt(j.get("slide"),10);return!isNaN(P)&&P>=0?P:0}return 0}),[f,T]=r.useState(!1),[d,o]=r.useState(!1),[l,y]=r.useState(!0),b=r.useRef(null),[C,z]=r.useState(!1),[m,h]=r.useState(!1),[_,v]=r.useState(null),g=r.useRef(null),u=r.useMemo(()=>s.find(j=>j.id===S)||s[0],[s,S]),i=r.useMemo(()=>u?vs(u):[],[u]),n=i[k]||i[0]||null;r.useEffect(()=>{z(!1),v(null),h(!1)},[k,S]),r.useEffect(()=>{if(u&&typeof window<"u"){const P=`#/presentation/${u.num_str}?slide=${k}`;window.location.hash!==P&&window.history.replaceState(null,"",P)}},[u,k]),r.useEffect(()=>{const j=()=>{const P=window.location.hash,G=P.match(/#\/(?:presentation|slides)\/(\d+)/);if(G){const U=s.find(J=>J.num_str===G[1].padStart(2,"0"));U&&U.id!==S&&E(U.id)}const O=new URLSearchParams(P.split("?")[1]||""),F=parseInt(O.get("slide"),10);!isNaN(F)&&F>=0&&x(F)};return window.addEventListener("hashchange",j),()=>window.removeEventListener("hashchange",j)},[s,S]);const w=r.useCallback(()=>{if(k<i.length-1)x(j=>j+1);else{const j=s.findIndex(P=>P.id===S);j!==-1&&j<s.length-1&&(E(s[j+1].id),x(0))}},[k,i.length,s,S]),R=r.useCallback(()=>{if(k>0)x(j=>j-1);else{const j=s.findIndex(P=>P.id===S);if(j>0){const P=s[j-1],G=vs(P);E(P.id),x(Math.max(0,G.length-1))}}},[k,s,S]),N=r.useCallback(j=>{j>=0&&j<i.length&&(x(j),T(!1))},[i.length]),D=j=>{E(j.target.value),x(0),T(!1)},I=()=>{!document.fullscreenElement&&!d?document.documentElement.requestFullscreen?document.documentElement.requestFullscreen().then(()=>{o(!0)}).catch(()=>{o(!0)}):o(!0):document.fullscreenElement&&document.exitFullscreen?document.exitFullscreen().then(()=>{o(!1)}).catch(()=>{o(!1)}):o(!1)};r.useEffect(()=>{const j=()=>{o(!!document.fullscreenElement)};return document.addEventListener("fullscreenchange",j),()=>document.removeEventListener("fullscreenchange",j)},[]),r.useEffect(()=>{if(!d){y(!0);return}y(!0);const j=()=>{y(!0),b.current&&clearTimeout(b.current),b.current=setTimeout(()=>{y(!1)},2500)};return window.addEventListener("mousemove",j),()=>{window.removeEventListener("mousemove",j),b.current&&clearTimeout(b.current)}},[d]),r.useEffect(()=>{const j=P=>{var G;["INPUT","SELECT","TEXTAREA"].includes((G=document.activeElement)==null?void 0:G.tagName)||(P.key==="ArrowRight"||P.key===" "||P.key==="PageDown"?(P.preventDefault(),w()):P.key==="ArrowLeft"||P.key==="PageUp"?(P.preventDefault(),R()):P.key==="Home"?(P.preventDefault(),x(0)):P.key==="End"?(P.preventDefault(),x(i.length-1)):P.key==="f"||P.key==="F"?(P.preventDefault(),I()):P.key==="g"||P.key==="G"?(P.preventDefault(),T(O=>!O)):P.key==="t"||P.key==="T"?(P.preventDefault(),c&&c()):P.key==="Escape"&&(f?T(!1):d?I():A&&A()))};return window.addEventListener("keydown",j),()=>window.removeEventListener("keydown",j)},[w,R,f,A,c,i.length]),r.useEffect(()=>{if(!g.current)return;g.current.querySelectorAll(".concept-html-body pre code, .challenge-body pre code").forEach(P=>{be.highlightElement(P)})},[k,n==null?void 0:n.id]);const M=j=>{j&&navigator.clipboard.writeText(j).then(()=>{h(!0),setTimeout(()=>h(!1),2e3)}).catch(()=>{})},$=j=>{switch(j){case"permission":return e.jsx(Rs,{});case"turtlesim":return e.jsx(Ts,{});case"package":return e.jsx(As,{});case"pubsub":return e.jsx(Ps,{});case"service":return e.jsx(Ds,{});case"action":return e.jsx(Es,{});case"urdf":return e.jsx(Ms,{});case"inertia":return e.jsx(Ls,{});case"loglevels":return e.jsx(Is,{});case"astar":return e.jsx(Ni,{});default:return null}};if(!u||!n)return e.jsx("div",{className:"presentation-loading",children:e.jsx("p",{children:"Loading workshop presentation..."})});const L=i.length>0?(k+1)/i.length*100:0;return e.jsxs("div",{className:`presentation-viewport ${p==="dark"?"dark-theme":"light-theme"} ${d?"is-fullscreen":""}`,children:[!d&&e.jsxs("header",{className:"ppt-header",children:[e.jsxs("div",{className:"ppt-header-left",children:[e.jsxs("button",{className:"ppt-brand-btn",onClick:A,title:"Exit Presentation & Return to Web LMS",children:[e.jsx("img",{src:"assets/images/ros2_logo.svg",alt:"ROS 2",className:"ppt-logo"}),e.jsx("span",{className:"ppt-brand-label",children:"Level 1 • AMR Instructor PPT"})]}),e.jsx("div",{className:"ppt-header-divider"}),e.jsx("div",{className:"ppt-lesson-selector-wrap",children:e.jsx("select",{value:S,onChange:D,className:"ppt-lesson-select",title:"Switch Lesson Deck",children:s.map(j=>e.jsxs("option",{value:j.id,children:["Lesson ",j.num_str,": ",j.title]},j.id))})})]}),e.jsx("div",{className:"ppt-header-center",children:e.jsxs("button",{className:"ppt-slide-counter-btn",onClick:()=>T(j=>!j),title:"Open Slide Grid (Press G)",children:[e.jsxs("span",{className:"slide-curr-num",children:["Slide ",k+1]}),e.jsx("span",{className:"slide-sep",children:"/"}),e.jsx("span",{className:"slide-total-num",children:i.length}),e.jsx(lt,{size:14,className:"counter-icon"})]})}),e.jsxs("div",{className:"ppt-header-right",children:[e.jsxs("button",{onClick:()=>T(!0),className:"ppt-tool-btn",title:"Slide Grid Overview (Press G)",children:[e.jsx(lt,{size:17}),e.jsx("span",{className:"btn-hotkey",children:"G"})]}),e.jsxs("button",{onClick:I,className:"ppt-tool-btn",title:d?"Exit Fullscreen (Press F)":"Fullscreen Mode (Press F)",children:[d?e.jsx(wt,{size:17}):e.jsx(Ma,{size:17}),e.jsx("span",{className:"btn-hotkey",children:"F"})]}),e.jsxs("button",{onClick:c,className:"ppt-tool-btn",title:`Switch to ${p==="dark"?"Light":"Dark"} Mode (Press T)`,children:[p==="dark"?e.jsx(At,{size:17}):e.jsx(Pt,{size:17}),e.jsx("span",{className:"btn-hotkey",children:"T"})]}),e.jsxs("button",{onClick:A,className:"ppt-tool-btn ppt-exit-btn",title:"Exit Presentation Mode (Press Esc)",children:[e.jsx(Ge,{size:18}),e.jsx("span",{className:"exit-label",children:"Exit"})]})]})]}),!d&&e.jsx("div",{className:"ppt-progress-track",children:e.jsx("div",{className:"ppt-progress-bar",style:{width:`${L}%`}})}),e.jsx("main",{className:"ppt-main-stage",children:e.jsxs("div",{className:`ppt-card-container ppt-type-${n.type}`,ref:g,children:[!d&&e.jsxs("div",{className:"ppt-card-top-bar",children:[e.jsxs("div",{className:"ppt-card-meta",children:[e.jsx("span",{className:"ppt-module-tag",children:u.module}),e.jsxs("span",{className:"ppt-lesson-tag",children:["Lesson ",u.num_str]}),n.badge&&e.jsx("span",{className:"ppt-concept-badge",children:n.badge})]}),n.sectionTitle&&e.jsx("span",{className:"ppt-section-path",children:n.sectionTitle})]}),n.type==="title"&&e.jsxs("div",{className:"ppt-slide-content ppt-slide-title-view",children:[e.jsxs("div",{className:"title-view-hero",children:[e.jsx("span",{className:"hero-day-pill",children:u.module}),e.jsxs("h1",{className:"hero-lesson-title",children:[e.jsxs("span",{className:"title-accent",children:["Lesson ",u.num_str,":"]})," ",u.title]}),e.jsxs("div",{className:"hero-meta-row",children:[e.jsxs("span",{className:"hero-meta-badge",children:[e.jsx(ks,{size:15}),e.jsx("span",{children:u.duration||"90 Mins"})]}),e.jsxs("span",{className:"hero-meta-badge",children:[e.jsx(he,{size:15}),e.jsx("span",{children:"ROS 2 Jazzy • Level 1"})]}),e.jsxs("span",{className:"hero-meta-badge",children:[e.jsx(_e,{size:15}),e.jsxs("span",{children:[i.length," Concept Slides"]})]})]}),u.focus&&e.jsxs("div",{className:"hero-focus-box",children:[e.jsx("strong",{children:"Core Focus:"})," ",u.focus]})]}),e.jsxs("div",{className:"launchpad-lower-deck",children:[n.outcomes&&n.outcomes.length>0&&e.jsxs("div",{className:"launchpad-panel outcomes-panel",children:[e.jsxs("div",{className:"panel-header",children:[e.jsx(Mt,{size:17,className:"panel-header-icon"}),e.jsx("h3",{children:"Core Learning Objectives"})]}),e.jsxs("div",{className:"launchpad-outcomes-list",children:[n.outcomes.slice(0,4).map((j,P)=>e.jsxs("div",{className:"launchpad-outcome-item",children:[e.jsx("span",{className:"outcome-check",children:"✓"}),e.jsx("span",{className:"outcome-item-text",dangerouslySetInnerHTML:{__html:j.text}})]},P)),n.outcomes.length>4&&e.jsx("div",{className:"launchpad-outcomes-more",children:e.jsxs("span",{children:["+",n.outcomes.length-4," additional objectives detailed in web LMS"]})})]})]}),u.snapshot&&u.snapshot.length>0&&e.jsxs("div",{className:"launchpad-panel snapshot-panel",children:[e.jsxs("div",{className:"panel-header",children:[e.jsx(Ve,{size:17,className:"panel-header-icon zap"}),e.jsx("h3",{children:"Key Technical Concepts"})]}),e.jsx("div",{className:"launchpad-snapshot-list",children:u.snapshot.map((j,P)=>e.jsxs("div",{className:"launchpad-snap-item",children:[e.jsx("span",{className:"snap-bullet",children:P+1}),e.jsx("div",{className:"snap-item-text",children:Array.isArray(j)?e.jsxs(e.Fragment,{children:[e.jsxs("strong",{children:[j[0],":"]})," ",j[1]]}):j})]},P))})]})]})]}),n.type==="command"&&e.jsxs("div",{className:"ppt-slide-content ppt-slide-command-view",children:[e.jsxs("div",{className:"cmd-slide-header",children:[e.jsx("div",{className:"cmd-badge-large",children:n.baseBadge||n.badge}),e.jsxs("div",{className:"cmd-title-group",children:[e.jsxs("div",{className:"cmd-title-row",children:[e.jsx("h2",{className:"cmd-slide-title",children:n.title}),n.totalUsageSteps>1&&e.jsxs("span",{className:"cmd-usage-pill",children:["Usage ",n.usageStep," of ",n.totalUsageSteps]})]}),n.syntax&&e.jsxs("div",{className:"cmd-syntax-strip",children:[e.jsx("span",{className:"syntax-label",children:"Syntax:"}),e.jsx("code",{className:"syntax-code",children:n.syntax})]})]})]}),n.desc&&e.jsx("div",{className:"cmd-slide-desc",dangerouslySetInnerHTML:{__html:n.desc}}),n.code&&e.jsxs("div",{className:"ppt-terminal-window",children:[e.jsxs("div",{className:"ppt-term-header",children:[e.jsxs("div",{className:"term-dots",children:[e.jsx("span",{className:"dot red"}),e.jsx("span",{className:"dot yellow"}),e.jsx("span",{className:"dot green"})]}),e.jsxs("div",{className:"term-title-wrapper",children:[e.jsx(xe,{size:14,className:"term-title-icon"}),e.jsx("span",{className:"term-title",children:"student@amr-dev-container:~ (bash)"})]}),e.jsxs("button",{onClick:()=>M(n.code),className:"term-copy-btn",title:"Copy Terminal Command",children:[m?e.jsx(ve,{size:14}):e.jsx($e,{size:14}),e.jsx("span",{children:m?"Copied!":"Copy"})]})]}),e.jsx("pre",{className:"ppt-term-body",children:e.jsx("code",{className:`hljs language-${n.lang||"bash"}`,dangerouslySetInnerHTML:{__html:ys(n.code,n.lang||"bash")}})})]},n.id)]}),n.type==="code_step"&&e.jsxs("div",{className:"ppt-slide-content ppt-slide-code-step-view",children:[e.jsxs("div",{className:"step-slide-header",children:[e.jsx("span",{className:"step-badge-pill",children:n.badge}),e.jsx("h2",{className:"step-slide-title",children:n.title})]}),n.desc&&e.jsx("div",{className:"step-slide-desc",dangerouslySetInnerHTML:{__html:n.desc}}),n.code&&e.jsxs("div",{className:"ppt-ide-window",children:[e.jsxs("div",{className:"ppt-ide-header",children:[e.jsxs("div",{className:"ide-dots",children:[e.jsx("span",{className:"dot red"}),e.jsx("span",{className:"dot yellow"}),e.jsx("span",{className:"dot green"})]}),e.jsxs("span",{className:"ide-file-tab",children:[e.jsx(Lt,{size:14}),e.jsx("span",{children:n.title})]}),e.jsxs("button",{onClick:()=>M(n.code),className:"ide-copy-btn",title:"Copy Source Code",children:[m?e.jsx(ve,{size:14}):e.jsx($e,{size:14}),e.jsx("span",{children:m?"Copied":"Copy"})]})]}),e.jsx("pre",{className:"ppt-ide-body",children:e.jsx("code",{className:`hljs language-${n.lang||"python"}`,dangerouslySetInnerHTML:{__html:ys(n.code,n.lang||"python")}})})]},n.id),n.breakdown&&e.jsx("div",{className:"step-breakdown-wrapper",dangerouslySetInnerHTML:{__html:n.breakdown}})]}),n.type==="step_breakdown"&&e.jsxs("div",{className:"ppt-slide-content ppt-slide-breakdown-view",children:[e.jsxs("div",{className:"step-slide-header",children:[e.jsx("span",{className:"step-badge-pill breakdown-pill",children:n.badge}),e.jsx("h2",{className:"step-slide-title",children:n.title})]}),e.jsx("div",{className:"step-breakdown-wrapper ppt-breakdown-deck",dangerouslySetInnerHTML:{__html:n.htmlContent}})]}),n.type==="interactive"&&e.jsx("div",{className:"ppt-slide-content ppt-slide-interactive-view",children:e.jsx("div",{className:"interactive-stage-container",children:$(n.interactiveKey)})}),n.type==="section_title"&&e.jsx("div",{className:"ppt-slide-content ppt-slide-section-title-view",children:e.jsxs("div",{className:"section-title-hero",children:[e.jsx("h1",{className:`section-title-text ${n.titleClass||""}`,style:n.titleColor?{color:n.titleColor}:{},children:n.title}),n.description&&e.jsx("p",{className:"section-title-desc",children:n.description}),n.htmlContent&&e.jsx("div",{dangerouslySetInnerHTML:{__html:n.htmlContent}})]})}),(n.type==="concept"||n.type==="subtopic")&&e.jsxs("div",{className:"ppt-slide-content ppt-slide-concept-view",children:[n.title&&e.jsxs("div",{className:"concept-slide-header",children:[e.jsxs("div",{className:"concept-title-row",children:[n.badge&&e.jsx("span",{className:"concept-badge-tag",children:n.badge}),e.jsx("h2",{className:"concept-main-title",children:n.title})]}),e.jsx("div",{className:"concept-header-divider"})]}),e.jsx("div",{className:"concept-html-body markdown-body",dangerouslySetInnerHTML:{__html:n.htmlContent}})]}),n.type==="challenge"&&e.jsxs("div",{className:"ppt-slide-content ppt-slide-challenge-view",children:[e.jsxs("div",{className:"challenge-banner",children:[e.jsx(he,{size:24,className:"banner-icon"}),e.jsxs("div",{children:[e.jsx("span",{className:"banner-sub",children:"Hands-On Practical Lab"}),e.jsx("h2",{className:"banner-title",children:n.title})]})]}),e.jsx("div",{className:"challenge-content-body ppt-challenge-briefing",dangerouslySetInnerHTML:{__html:n.htmlContent}})]}),n.type==="quiz"&&e.jsxs("div",{className:"ppt-slide-content ppt-slide-quiz-view",children:[e.jsxs("div",{className:"quiz-slide-header",children:[e.jsxs("span",{className:"quiz-badge-pill",children:[e.jsx(ct,{size:15}),e.jsxs("span",{children:["Concept Assessment • ",n.title]})]}),e.jsx("h2",{className:"quiz-question-text",children:n.question})]}),e.jsx("div",{className:"quiz-options-deck",children:n.options.map((j,P)=>{const G=P===n.answer,O=_===P;let F="quiz-option-card";return C?G?F+=" answer-correct":O&&(F+=" answer-wrong"):O&&(F+=" option-selected"),e.jsxs("button",{className:F,onClick:()=>v(P),children:[e.jsx("span",{className:"opt-letter",children:String.fromCharCode(65+P)}),e.jsx("span",{className:"opt-label",children:j}),C&&G&&e.jsx(V,{size:20,className:"status-mark correct"}),C&&O&&!G&&e.jsx(Fa,{size:20,className:"status-mark wrong"})]},P)})}),e.jsxs("div",{className:"quiz-instructor-bar",children:[e.jsxs("button",{className:`reveal-answer-btn ${C?"revealed":""}`,onClick:()=>z(j=>!j),children:[e.jsx(he,{size:16}),e.jsx("span",{children:C?"Hide Explanation":"Reveal Answer & Pedagogical Breakdown"})]}),C&&e.jsxs("div",{className:"quiz-explanation-box fade-in",children:[e.jsxs("div",{className:"exp-header",children:[e.jsx(V,{size:18,className:"exp-icon"}),e.jsxs("strong",{children:["Correct Answer: Option ",String.fromCharCode(65+n.answer)]})]}),e.jsx("p",{className:"exp-text",children:n.explanation})]})]})]}),n.type==="summary"&&e.jsxs("div",{className:"ppt-slide-content ppt-slide-summary-view",children:[e.jsxs("div",{className:"summary-hero",children:[e.jsx(V,{size:48,className:"summary-success-icon"}),e.jsx("h2",{className:"summary-title",children:n.title}),e.jsxs("p",{className:"summary-desc",children:["Congratulations! You have completed all lecture topics, code walkthroughs, and hands-on exercises for Lesson ",u.num_str,"."]})]}),e.jsxs("div",{className:"summary-action-card",children:[e.jsx("h3",{children:"What's Next in the 3-Day Autonomous AMR Workshop?"}),u.next_id?e.jsxs("button",{onClick:w,className:"summary-next-btn",children:[e.jsx("span",{children:"Advance to Next Lesson"}),e.jsx(ge,{size:18})]}):e.jsx("p",{className:"workshop-complete-note",children:"🎉 You have reached the end of the foundational robotics curriculum!"})]})]})]})}),!d&&e.jsxs("footer",{className:"ppt-footer",children:[e.jsx("div",{className:"ppt-footer-left",children:e.jsxs("button",{onClick:R,className:"ppt-nav-btn prev-btn",disabled:k===0&&s.findIndex(j=>j.id===S)===0,title:"Previous Slide (Press Left Arrow)",children:[e.jsx(Et,{size:20}),e.jsx("span",{children:"Previous"}),e.jsx("span",{className:"key-hint",children:"←"})]})}),e.jsx("div",{className:"ppt-footer-center",children:e.jsx("div",{className:"ppt-dots-container",children:i.map((j,P)=>e.jsx("button",{onClick:()=>N(P),className:`ppt-dot ${P===k?"active":""} type-${j.type}`,title:`Jump to Slide ${P+1}: ${j.title}`},j.id||P))})}),e.jsx("div",{className:"ppt-footer-right",children:e.jsxs("button",{onClick:w,className:"ppt-nav-btn next-btn",title:"Next Slide (Press Right Arrow or Space)",children:[e.jsx("span",{children:"Next"}),e.jsx("span",{className:"key-hint",children:"→"}),e.jsx(Be,{size:20})]})})]}),d&&e.jsxs(e.Fragment,{children:[e.jsx("div",{className:"ppt-fs-company-brand",title:"Botforge Robotics",children:e.jsx("img",{src:p==="dark"?"assets/images/botforge_white.png":"assets/images/botforge_black.png",alt:"Botforge Robotics",className:"ppt-fs-company-logo"})}),e.jsx("button",{className:`ppt-fs-top-exit-btn ${l?"visible":""}`,onClick:I,title:"Exit Fullscreen (Press Esc or F)",children:e.jsx(wt,{size:18})}),e.jsxs("div",{className:`ppt-fs-hud-dock ${l?"visible":""}`,children:[e.jsx("button",{onClick:R,className:"fs-hud-btn",disabled:k===0&&s.findIndex(j=>j.id===S)===0,title:"Previous Slide (←)",children:e.jsx(Et,{size:18})}),e.jsxs("button",{onClick:()=>T(!0),className:"fs-hud-counter-btn",title:"Slide Overview (Press G)",children:[e.jsx("span",{className:"fs-curr-num",children:k+1}),e.jsx("span",{className:"fs-sep",children:"/"}),e.jsx("span",{className:"fs-total-num",children:i.length}),e.jsx(lt,{size:13,className:"fs-grid-icon"})]}),e.jsx("button",{onClick:w,className:"fs-hud-btn",title:"Next Slide (→ or Space)",children:e.jsx(Be,{size:18})}),e.jsx("div",{className:"fs-hud-divider"}),e.jsx("button",{onClick:c,className:"fs-hud-btn",title:"Switch Theme (T)",children:p==="dark"?e.jsx(At,{size:16}):e.jsx(Pt,{size:16})}),e.jsxs("button",{onClick:I,className:"fs-hud-btn fs-hud-exit-btn",title:"Exit Fullscreen (Esc or F)",children:[e.jsx(wt,{size:16}),e.jsx("span",{className:"fs-exit-text",children:"Exit"})]})]})]}),f&&e.jsx("div",{className:"ppt-grid-modal-overlay fade-in",onClick:()=>T(!1),children:e.jsxs("div",{className:"ppt-grid-modal-card",onClick:j=>j.stopPropagation(),children:[e.jsxs("div",{className:"grid-modal-header",children:[e.jsxs("div",{className:"grid-modal-title",children:[e.jsx(lt,{size:20}),e.jsxs("h3",{children:["Slide Deck Overview • Lesson ",u.num_str," (",i.length," Slides)"]})]}),e.jsx("button",{className:"grid-modal-close-btn",onClick:()=>T(!1),title:"Close Overview (Press Esc)",children:e.jsx(Ge,{size:20})})]}),e.jsx("div",{className:"grid-cards-scroller",children:i.map((j,P)=>e.jsxs("div",{className:`grid-slide-thumb ${P===k?"current-active":""}`,onClick:()=>N(P),children:[e.jsxs("div",{className:"thumb-top",children:[e.jsxs("span",{className:"thumb-index",children:["#",P+1]}),e.jsx("span",{className:`thumb-type-tag type-${j.type}`,children:j.type})]}),e.jsx("h4",{className:"thumb-title",children:j.title}),j.badge&&e.jsx("span",{className:"thumb-badge",children:j.badge})]},j.id||P))})]})})]})}function ki(){const{completedLessons:s,quizScores:t,currentLessonId:a,setCurrentLessonId:p,toggleLessonComplete:c,recordQuizScore:A,resetProgress:S,progressPercent:E,completedCount:k,totalLessons:x}=$a(ie.total_lessons),f=r.useCallback(v=>{c(v)},[c]),T=r.useCallback((v,g,u)=>{A(v,g,u)},[A]),[d,o]=r.useState(!1),[l,y]=r.useState(()=>{try{return localStorage.getItem("navpro_l1_theme")||"light"}catch{return"light"}}),[b,C]=r.useState(!1),[z,m]=r.useState(()=>typeof window>"u"?!1:window.location.hash.startsWith("#/presentation")||window.location.hash.startsWith("#/slides"));r.useEffect(()=>{const v=()=>{m(window.location.hash.startsWith("#/presentation")||window.location.hash.startsWith("#/slides"))};return window.addEventListener("hashchange",v),()=>window.removeEventListener("hashchange",v)},[]),r.useEffect(()=>{document.documentElement.setAttribute("data-theme",l),localStorage.setItem("navpro_l1_theme",l)},[l]);const h=r.useCallback(()=>{y(v=>v==="light"?"dark":"light")},[]);r.useEffect(()=>{const v=()=>{setTimeout(async()=>{var g;try{const u=(g=window.getSelection())==null?void 0:g.toString();u&&u.trim()&&fetch("/api/clipboard",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({text:u.trim()})}).catch(()=>{})}catch{}},50)};return window.addEventListener("copy",v),()=>window.removeEventListener("copy",v)},[]);const _=ie.lessons.find(v=>v.id===a)||null;return r.useEffect(()=>{const v=g=>{var u;["INPUT","TEXTAREA"].includes((u=document.activeElement)==null?void 0:u.tagName)||(g.key==="["||g.key==="p"?a==="feedback"?p("lesson_22"):_&&_.prev_id&&p(_.prev_id):g.key==="]"||g.key==="n"?_&&_.next_id&&p(_.next_id):g.key==="h"?p(null):g.key==="m"&&C(i=>!i))};return window.addEventListener("keydown",v),()=>window.removeEventListener("keydown",v)},[_,a,p]),z?e.jsx(Ci,{lessons:ie.lessons,modules:ie.modules,initialLessonId:a,theme:l,onToggleTheme:h,onExitPresentation:()=>{m(!1),window.location.hash=a?`#/lesson/${a.replace("lesson_","")}`:"#/"}}):e.jsxs("div",{className:"app-root",children:[e.jsx(Wa,{onNavigateHub:()=>p(null),onSelectLesson:v=>p(v),lessons:ie.lessons,currentLessonId:a,onOpenHelpModal:()=>o(!0),theme:l,onToggleTheme:h,onToggleSidebarMobile:()=>C(v=>!v)}),e.jsxs("div",{className:"app-main-layout",children:[e.jsx(qa,{modules:ie.modules,lessons:ie.lessons,currentLessonId:a,onSelectLesson:v=>p(v),onNavigateHub:()=>p(null),completedLessons:s,onToggleComplete:f,quizScores:t,progressPercent:E,completedCount:k,totalLessons:x,onResetProgress:S,isOpenMobile:b,onCloseMobile:()=>C(!1)}),e.jsx("main",{className:"app-content-container",children:_?e.jsx(Xa,{lesson:_,onSelectLesson:v=>p(v),onNavigateHub:()=>p(null),isCompleted:s.includes(_.id),onToggleComplete:f,savedScore:t[_.id],onRecordScore:T}):a==="feedback"?e.jsx(ei,{onNavigateHub:()=>p(null),onSelectLesson:v=>p(v),completedCount:k,totalLessons:x}):e.jsx(Va,{modules:ie.modules,lessons:ie.lessons,onSelectLesson:v=>p(v),completedLessons:s,progressPercent:E,completedCount:k,totalLessons:x})})]}),e.jsx(si,{}),e.jsx(ti,{isOpen:d,onClose:()=>o(!1)})]})}class zi extends We.Component{constructor(a){super(a);nt(this,"handleResetCache",()=>{try{localStorage.removeItem("nexus_amr_l1_current_lesson"),localStorage.removeItem("nexus_amr_l1_completed_lessons"),localStorage.removeItem("nexus_amr_l1_quiz_scores"),localStorage.removeItem("navpro_l1_current_lesson"),localStorage.removeItem("navpro_l1_completed_lessons"),localStorage.removeItem("navpro_l1_quiz_scores"),localStorage.removeItem("navpro_current_lesson"),localStorage.removeItem("navpro_completed_lessons"),localStorage.removeItem("navpro_quiz_scores")}catch(a){console.warn("Could not clear localStorage:",a)}window.location.reload()});nt(this,"handleReload",()=>{window.location.reload()});nt(this,"handleResetState",()=>{this.setState({hasError:!1,error:null,errorInfo:null}),this.props.onReset&&this.props.onReset()});this.state={hasError:!1,error:null,errorInfo:null}}static getDerivedStateFromError(a){return{hasError:!0,error:a}}componentDidCatch(a,p){console.error("[Nexus AMR Level 1 ErrorBoundary caught an exception]:",a,p),this.setState({errorInfo:p})}render(){var a;return this.state.hasError?e.jsx("div",{style:{minHeight:"100vh",display:"flex",alignItems:"center",justifyContent:"center",background:"var(--bg-main, #0b0f19)",color:"var(--text-main, #f8fafc)",padding:"2rem",boxSizing:"border-box"},children:e.jsxs("div",{style:{maxWidth:"600px",width:"100%",background:"var(--card-bg, #111827)",border:"1px solid var(--border-color, #1f2937)",borderRadius:"16px",padding:"2.5rem",boxShadow:"0 20px 40px rgba(0,0,0,0.5)",textAlign:"center"},children:[e.jsx("div",{style:{display:"inline-flex",padding:"1rem",borderRadius:"50%",background:"rgba(239, 68, 68, 0.15)",color:"#ef4444",marginBottom:"1.5rem"},children:e.jsx(Oa,{size:42})}),e.jsx("h2",{style:{fontSize:"1.6rem",fontWeight:700,margin:"0 0 0.5rem 0"},children:"Something went wrong"}),e.jsxs("p",{style:{color:"var(--text-muted, #94a3b8)",fontSize:"0.95rem",lineHeight:1.6,margin:"0 0 2rem 0"},children:["The Learning Hub encountered an unexpected runtime error. Your robotics code in ",e.jsx("code",{children:"ros2_ws/"})," is completely safe on your disk."]}),e.jsxs("div",{style:{display:"flex",gap:"0.75rem",justifyContent:"center",flexWrap:"wrap",marginBottom:"1.5rem"},children:[e.jsxs("button",{onClick:this.handleReload,style:{display:"inline-flex",alignItems:"center",gap:"0.5rem",padding:"0.75rem 1.25rem",background:"var(--primary, #0ea5e9)",color:"#fff",border:"none",borderRadius:"8px",fontWeight:600,cursor:"pointer"},children:[e.jsx(zs,{size:16}),e.jsx("span",{children:"Reload Page"})]}),e.jsxs("button",{onClick:this.handleResetState,style:{display:"inline-flex",alignItems:"center",gap:"0.5rem",padding:"0.75rem 1.25rem",background:"var(--surface-color, #1e293b)",color:"var(--text-main, #f8fafc)",border:"1px solid var(--border-color, #334155)",borderRadius:"8px",fontWeight:600,cursor:"pointer"},children:[e.jsx(Ga,{size:16}),e.jsx("span",{children:"Return to Hub"})]}),e.jsxs("button",{onClick:this.handleResetCache,style:{display:"inline-flex",alignItems:"center",gap:"0.5rem",padding:"0.75rem 1.25rem",background:"rgba(239, 68, 68, 0.1)",color:"#ef4444",border:"1px solid rgba(239, 68, 68, 0.25)",borderRadius:"8px",fontWeight:600,cursor:"pointer"},children:[e.jsx(Z,{size:16}),e.jsx("span",{children:"Clear Local Cache"})]})]}),this.state.error&&e.jsxs("details",{style:{textAlign:"left",marginTop:"1.5rem",background:"rgba(0,0,0,0.3)",padding:"1rem",borderRadius:"8px",fontSize:"0.85rem",color:"#ef4444",fontFamily:"monospace"},children:[e.jsx("summary",{style:{cursor:"pointer",fontWeight:600,color:"var(--text-muted, #94a3b8)"},children:"Technical Error Diagnostics"}),e.jsxs("pre",{style:{marginTop:"0.75rem",overflowX:"auto",whiteSpace:"pre-wrap"},children:[this.state.error.toString(),(a=this.state.errorInfo)==null?void 0:a.componentStack]})]})]})}):this.props.children}}Ba.createRoot(document.getElementById("root")).render(e.jsx(We.StrictMode,{children:e.jsx(zi,{children:e.jsx(ki,{})})}));export{Ts as T};
