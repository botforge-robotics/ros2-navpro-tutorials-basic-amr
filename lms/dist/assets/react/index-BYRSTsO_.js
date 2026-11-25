const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./Ros2ArchitectureInteractive-DRDijra3.js","./vendor-BLsBi4s-.js","./vendor-ZgkIHsf0.css","./Lesson03-DG6mHp74.js","./curriculum-data-Bsrz0J8L.js"])))=>i.map(i=>d[i]);
var ha=Object.defineProperty;var va=(a,s,i)=>s in a?ha(a,s,{enumerable:!0,configurable:!0,writable:!0,value:i}):a[s]=i;var gt=(a,s,i)=>va(a,typeof s!="symbol"?s+"":s,i);import{r as c,j as e,M as fa,S as ya,X as Ye,P as Cs,a as Ns,T as ze,C as Bt,b as Oe,c as ft,d as Ft,e as Ot,R as K,B as $t,f as ps,g as fe,h as Ve,i as Rs,k as zs,l as ba,A as _e,m as Ts,E as As,N as Ps,n as je,L as Te,o as H,p as ye,q as qt,s as ms,t as Qe,u as ve,v as te,w as Se,x as Xe,y as Ze,z as we,D as be,F as xa,G as Ds,H as Fe,I as Is,J as _a,K as ja,O as gs,Q as vt,U as Je,Z as et,V as Es,W as Me,Y as Ut,_ as Gt,$ as Sa,a0 as ut,a1 as wa,a2 as ka,a3 as Ca,a4 as Na,a5 as us,a6 as Ra,a7 as za,a8 as Ta,a9 as Aa,aa as Pa,ab as Da,ac as Ia,ad as Ea,ae as Nt,af as La,ag as Ma,ah as Ee,ai as q,aj as Z,ak as ht,al as xe,am as Ce,an as hs,ao as Fa,ap as Oa,aq as Ga,ar as Le,as as Wa,at as Ba,au as Ne,av as Ls,aw as ne,ax as Rt,ay as Ms,az as $a,aA as qa,aB as Re,aC as vs,aD as Ua,aE as Ha,aF as Ke,aG as zt,aH as Va,aI as Ka,aJ as Qa,aK as Ya,aL as Xa}from"./vendor-BLsBi4s-.js";import{l as pe}from"./curriculum-data-Bsrz0J8L.js";(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const g of document.querySelectorAll('link[rel="modulepreload"]'))u(g);new MutationObserver(g=>{for(const T of g)if(T.type==="childList")for(const w of T.addedNodes)w.tagName==="LINK"&&w.rel==="modulepreload"&&u(w)}).observe(document,{childList:!0,subtree:!0});function i(g){const T={};return g.integrity&&(T.integrity=g.integrity),g.referrerPolicy&&(T.referrerPolicy=g.referrerPolicy),g.crossOrigin==="use-credentials"?T.credentials="include":g.crossOrigin==="anonymous"?T.credentials="omit":T.credentials="same-origin",T}function u(g){if(g.ep)return;g.ep=!0;const T=i(g);fetch(g.href,T)}})();const Tt="nexus_amr_l1_completed_lessons",At="nexus_amr_l1_quiz_scores",Pt="nexus_amr_l1_current_lesson",fs="navpro_l1_completed_lessons",ys="navpro_l1_quiz_scores";function Ja(a=26){const[s,i]=c.useState(()=>{try{const n=localStorage.getItem(Tt)||localStorage.getItem(fs);return n?JSON.parse(n):[]}catch{return[]}}),[u,g]=c.useState(()=>{try{const n=localStorage.getItem(At)||localStorage.getItem(ys);return n?JSON.parse(n):{}}catch{return{}}}),[T,w]=c.useState(()=>{try{const o=window.location.hash.match(/#\/(?:lesson|presentation|slides)\/(\d+)/);return o?`lesson_${o[1].padStart(2,"0")}`:localStorage.getItem(Pt)||null}catch{return null}});c.useEffect(()=>{try{localStorage.setItem(Tt,JSON.stringify(s))}catch(n){console.error("Failed to save completed lessons",n)}},[s]),c.useEffect(()=>{try{localStorage.setItem(At,JSON.stringify(u))}catch(n){console.error("Failed to save quiz scores",n)}},[u]),c.useEffect(()=>{try{const n=window.location.hash;if(n.startsWith("#/presentation")||n.startsWith("#/slides"))return;T?(localStorage.setItem(Pt,T),window.location.hash=`#/lesson/${T.replace("lesson_","")}`):(localStorage.removeItem(Pt),window.location.hash="#/")}catch(n){console.error("Failed to save current lesson",n)}},[T]),c.useEffect(()=>{const n=()=>{const o=window.location.hash;if(o.startsWith("#/presentation")||o.startsWith("#/slides")){const m=o.match(/#\/(?:presentation|slides)\/(\d+)/);m&&w(`lesson_${m[1].padStart(2,"0")}`);return}if(!o||o==="#/"||o==="#")w(null);else{const m=o.match(/#\/lesson\/(\d+)/);m&&w(`lesson_${m[1].padStart(2,"0")}`)}};return window.addEventListener("hashchange",n),()=>window.removeEventListener("hashchange",n)},[]);const I=c.useCallback(n=>{i(o=>o.includes(n)?o.filter(m=>m!==n):[...o,n])},[]),N=c.useCallback(n=>{i(o=>o.includes(n)?o:[...o,n])},[]),j=c.useCallback((n,o,m)=>{const x=o===m;g(S=>({...S,[n]:{score:o,total:m,passed:x,timestamp:Date.now()}})),x&&N(n)},[N]),l=c.useCallback(()=>{window.confirm("Are you sure you want to reset all curriculum progress and quiz scores?")&&(i([]),g({}),localStorage.removeItem(Tt),localStorage.removeItem(At),localStorage.removeItem(fs),localStorage.removeItem(ys),localStorage.removeItem("nexus_amr_l1_quiz_answers"),localStorage.removeItem("navpro_l1_quiz_answers"))},[]),p=Math.round(s.length/a*100);return{completedLessons:s,quizScores:u,currentLessonId:T,setCurrentLessonId:w,toggleLessonComplete:I,markLessonComplete:N,recordQuizScore:j,resetProgress:l,progressPercent:p,completedCount:s.length,totalLessons:a}}function Za({onNavigateHub:a,onSelectLesson:s,lessons:i,onOpenHelpModal:u,theme:g,onToggleTheme:T,onToggleSidebarMobile:w,currentLessonId:I}){const[N,j]=c.useState(""),[l,p]=c.useState(!1),n=c.useRef(null),o=c.useRef(null),[m,x]=c.useState(()=>{try{const z=new URLSearchParams(window.location.search);if(z.has("ppt")){const h=z.get("ppt")==="true"||z.get("ppt")==="1";return localStorage.setItem("navpro_show_ppt",h?"true":"false"),h}const R=localStorage.getItem("navpro_show_ppt");return R!==null?R==="true":(localStorage.setItem("navpro_show_ppt","true"),!0)}catch{return!0}});c.useEffect(()=>{const z=R=>{R.key==="navpro_show_ppt"&&x(R.newValue==="true")};return window.addEventListener("storage",z),()=>window.removeEventListener("storage",z)},[]),c.useEffect(()=>{const z=R=>{var h,f;R.key==="/"&&document.activeElement!==n.current?(R.preventDefault(),(h=n.current)==null||h.focus(),p(!0)):R.key==="Escape"&&(p(!1),(f=n.current)==null||f.blur())};return window.addEventListener("keydown",z),()=>window.removeEventListener("keydown",z)},[]),c.useEffect(()=>{const z=R=>{o.current&&!o.current.contains(R.target)&&p(!1)};return document.addEventListener("mousedown",z),()=>document.removeEventListener("mousedown",z)},[]);const S=N.trim()?i.filter(z=>z.title.toLowerCase().includes(N.toLowerCase())||z.num_str.includes(N)||z.focus&&z.focus.toLowerCase().includes(N.toLowerCase())).slice(0,8):[];return e.jsxs("header",{className:"app-navbar",children:[e.jsxs("div",{className:"navbar-left",children:[e.jsx("button",{className:"mobile-menu-btn",onClick:w,"aria-label":"Toggle Navigation Sidebar",children:e.jsx(fa,{size:20})}),e.jsx("a",{href:"https://botforge.in",target:"_blank",rel:"noopener noreferrer",className:"company-logo-link",title:"Botforge Robotics - botforge.in",children:e.jsx("img",{src:"assets/images/botforge_black.png",alt:"Botforge Robotics",className:"company-logo"})}),e.jsx("div",{className:"navbar-divider"}),e.jsxs("button",{onClick:a,className:"brand-link-btn",title:"Return to Level 1 Course Hub",children:[e.jsx("img",{src:"assets/images/ros2_logo.svg",alt:"ROS 2",className:"ros2-logo"}),e.jsx("div",{className:"brand-text",children:e.jsx("span",{className:"brand-badge",children:"Level 1 • ROS 2 Jazzy"})})]})]}),e.jsxs("div",{className:"navbar-center",ref:o,children:[e.jsxs("div",{className:"search-box",children:[e.jsx(ya,{size:16,className:"search-icon"}),e.jsx("input",{ref:n,type:"text",placeholder:"Search lessons, nodes, topics... (Press /)",value:N,onChange:z=>{j(z.target.value),p(!0)},onFocus:()=>p(!0),className:"search-input-field"}),N&&e.jsx("button",{className:"search-clear-btn",onClick:()=>{j(""),p(!1)},children:e.jsx(Ye,{size:14})})]}),l&&N.trim()&&e.jsx("div",{className:"search-results-dropdown fade-in",children:S.length>0?S.map(z=>e.jsxs("button",{className:"search-result-item",onClick:()=>{s(z.id),p(!1),j("")},children:[e.jsx("span",{className:"search-res-num",children:z.num_str}),e.jsxs("div",{className:"search-res-info",children:[e.jsx("span",{className:"search-res-title",children:z.title}),e.jsx("span",{className:"search-res-module",children:z.module})]})]},z.id)):e.jsxs("div",{className:"search-no-results",children:['No lessons matched "',N,'"']})})]}),e.jsxs("div",{className:"navbar-right",children:[m&&e.jsxs("a",{href:`#/presentation${I?`/${I.replace("lesson_","")}`:""}`,target:"_blank",rel:"noopener noreferrer",className:"nav-action-btn ppt-btn",title:"Open Fullscreen Instructor Presentation Deck (PPT) in New Window",children:[e.jsx(Cs,{size:16}),e.jsx("span",{children:"Instructor PPT"})]}),e.jsxs("a",{href:`http://${typeof window<"u"?window.location.hostname:"localhost"}:6080/vnc.html?autoconnect=true&resize=remote`,target:"_blank",rel:"noopener noreferrer",className:"nav-action-btn desktop-btn",title:"Open Ubuntu Desktop GUI via noVNC (Gazebo / RViz2 on port 6080)",children:[e.jsx(Ns,{size:16}),e.jsx("span",{children:"Desktop GUI"})]}),e.jsxs("a",{href:`http://${typeof window<"u"?window.location.hostname:"localhost"}:7681`,target:"_blank",rel:"noopener noreferrer",className:"nav-action-btn terminal-btn",title:"Open Dedicated Web Terminal in New Window (Port 7681)",children:[e.jsx(ze,{size:16}),e.jsx("span",{children:"Terminal"})]}),e.jsxs("a",{href:`http://${typeof window<"u"?window.location.hostname:"localhost"}:8443/?folder=/home/student`,target:"_blank",rel:"noopener noreferrer",className:"nav-action-btn vscode-btn",title:"Open in-browser VS Code Editor on port 8443",children:[e.jsx(Bt,{size:16}),e.jsx("span",{children:"VS Code"})]}),e.jsxs("button",{onClick:a,className:"nav-action-btn hub-btn",title:"Course Hub Overview",children:[e.jsx(Oe,{size:16}),e.jsx("span",{children:"Hub"})]}),e.jsxs("button",{onClick:u,className:"nav-action-btn help-btn",title:"Curriculum Help, Docker Reset & Storage FAQ",children:[e.jsx(ft,{size:16}),e.jsx("span",{children:"Help"})]}),e.jsx("button",{onClick:T,className:"theme-toggle-btn",title:`Switch to ${g==="dark"?"Light":"Dark"} mode`,"aria-label":"Toggle Theme",children:g==="dark"?e.jsx(Ft,{size:17}):e.jsx(Ot,{size:17})})]})]})}function ei({modules:a,lessons:s,currentLessonId:i,onSelectLesson:u,onNavigateHub:g,completedLessons:T,onToggleComplete:w,quizScores:I,progressPercent:N,completedCount:j,totalLessons:l,onResetProgress:p,isOpenMobile:n,onCloseMobile:o}){const m=s.find(y=>y.id===i);m&&m.module_id;const[x,S]=c.useState({1:!0,2:!0,3:!0,4:!0,5:!0}),[z,R]=c.useState(i);c.useEffect(()=>{i&&R(i)},[i]);const h=y=>{S(v=>({...v,[y]:!v[y]}))},f=(y,v)=>{y.stopPropagation(),R(b=>b===v?null:v)},_=(y,v,b)=>{if(y.preventDefault(),y.stopPropagation(),v!==i)u(v),setTimeout(()=>{const r=document.getElementById(b);r&&r.scrollIntoView({behavior:"smooth",block:"start"})},250);else{const r=document.getElementById(b);r&&r.scrollIntoView({behavior:"smooth",block:"start"})}n&&o()};return e.jsxs(e.Fragment,{children:[n&&e.jsx("div",{className:"sidebar-backdrop",onClick:o,"aria-hidden":"true"}),e.jsxs("aside",{className:`app-sidebar ${n?"open-mobile":""}`,children:[e.jsxs("div",{className:"sidebar-progress-card",children:[e.jsxs("div",{className:"progress-card-top",children:[e.jsxs("div",{className:"progress-title-row",children:[e.jsx("span",{className:"progress-label",children:"Curriculum Progress"}),e.jsxs("span",{className:"progress-badge",children:[N,"%"]})]}),e.jsxs("span",{className:"progress-count",children:[j," of ",l," completed"]})]}),e.jsx("div",{className:"progress-bar-track",children:e.jsx("div",{className:"progress-bar-fill",style:{width:`${N}%`}})}),e.jsxs("button",{onClick:p,className:"reset-progress-btn",title:"Reset curriculum checklist",children:[e.jsx(K,{size:12}),e.jsx("span",{children:"Reset Checklist"})]})]}),e.jsxs("button",{onClick:()=>{g(),n&&o()},className:`sidebar-hub-nav-btn ${i?"":"active"}`,children:[e.jsx($t,{size:16}),e.jsx("span",{children:"Curriculum Hub Overview"})]}),e.jsx("div",{className:"sidebar-modules-list",children:a.map(y=>{const v=x[y.id],b=s.filter(C=>C.module_id===y.id||Number(String(C.module_id).replace(/\D/g,""))===y.id),r=b.filter(C=>T.includes(C.id)).length,d=r===b.length&&b.length>0;return e.jsxs("div",{className:"sidebar-module-section",children:[e.jsxs("button",{className:`module-header-btn ${d?"completed-module":""}`,onClick:()=>h(y.id),children:[e.jsxs("div",{className:"module-header-left",children:[v?e.jsx(ps,{size:14}):e.jsx(fe,{size:14}),e.jsx("span",{className:"module-name",children:y.name})]}),e.jsxs("span",{className:"module-count-badge",children:[r,"/",b.length]})]}),v&&e.jsx("ul",{className:"sidebar-lesson-items",children:b.map(C=>{const P=C.id===i,A=T.includes(C.id),E=I[C.id];return e.jsxs("li",{children:[e.jsxs("div",{className:`sidebar-lesson-row ${P?"active":""} ${A?"completed":""}`,onClick:()=>{u(C.id),n&&o()},children:[e.jsx("button",{type:"button",className:"lesson-checkbox-btn",onClick:L=>{L.stopPropagation(),w(C.id)},title:A?"Mark incomplete":"Mark completed","aria-label":`Toggle completed for ${C.title}`,children:A?e.jsx(Ve,{size:16,className:"checked-icon"}):e.jsx(Rs,{size:16,className:"unchecked-icon"})}),e.jsx("span",{className:"lesson-row-num",children:C.num_str}),e.jsx("span",{className:"lesson-row-title",title:C.title,children:C.title}),E&&E.passed&&e.jsx("span",{className:"quiz-passed-star",title:`Quiz Passed: ${E.score}/${E.total}`,children:"⭐"}),C.subtopics&&C.subtopics.length>0&&e.jsx("button",{type:"button",className:"subtopic-toggle-btn",onClick:L=>f(L,C.id),title:z===C.id?"Collapse subtopics":"Expand subtopics","aria-label":"Toggle subtopics",children:z===C.id?e.jsx(ps,{size:13}):e.jsx(fe,{size:13})})]}),z===C.id&&C.subtopics&&C.subtopics.length>0&&e.jsx("ul",{className:"sidebar-subtopics-list",children:C.subtopics.map(L=>e.jsx("li",{className:"sidebar-subtopic-item",children:e.jsxs("a",{href:`#${L.id}`,className:"sidebar-subtopic-link",onClick:F=>_(F,C.id,L.id),title:L.title,children:[e.jsx("span",{className:"subtopic-bullet"}),e.jsx("span",{className:"subtopic-text",children:L.title})]})},L.id))})]},C.id)})})]},y.id)})}),e.jsx("div",{className:"sidebar-feedback-nav-section",style:{marginTop:"1.25rem",paddingBottom:"1.5rem"},children:e.jsxs("button",{onClick:()=>{u("feedback"),n&&o()},className:`sidebar-feedback-nav-btn ${i==="feedback"?"active":""}`,title:"Course Feedback & Survey",children:[e.jsx(zs,{size:16,className:"feedback-nav-icon"}),e.jsxs("div",{style:{display:"flex",flexDirection:"column",overflow:"hidden"},children:[e.jsx("span",{className:"feedback-nav-title",children:"Course Feedback & Survey"}),e.jsx("span",{className:"feedback-nav-sub",style:{fontSize:"0.72rem",color:"var(--text-muted)"},children:"Share your learning experience"})]})]})})]})]})}const ti={1:je,2:Ps,3:As,4:Ts,5:Oe};function si({modules:a,lessons:s,onSelectLesson:i,completedLessons:u,progressPercent:g,completedCount:T,totalLessons:w,studentInfo:I,onSubmitFeedback:N}){return e.jsxs("div",{className:"hub-overview-container fade-in",children:[e.jsxs("section",{className:"hub-hero-banner",children:[e.jsxs("div",{className:"hero-content",children:[e.jsxs("div",{className:"hero-badge-row",children:[e.jsx("span",{className:"badge-pill",children:"Industrial AMR Systems Engineering"}),e.jsx("span",{className:"badge-pill jazzy",children:"ROS 2 Jazzy LTS"}),e.jsx("span",{className:"badge-pill success",children:"Ubuntu 24.04"})]}),e.jsx("h1",{className:"hero-title",children:"Level 1: Zero-to-Autonomous AMR Engineer"}),e.jsx("p",{className:"hero-description",children:"Complete mastery over core ROS 2 Jazzy robotics mechanics. Learn Linux command-line engineering, peer-to-peer DDS bus architectures, differential drive kinematics, URDF digital twins, and autonomous 2D SLAM & Nav2 navigation in Gazebo Harmonic simulation."}),e.jsxs("div",{className:"hero-actions-row",children:[e.jsxs("button",{onClick:()=>i("lesson_01"),className:"hero-primary-btn",children:[e.jsx(ba,{size:17}),e.jsx("span",{children:"Start Lesson 01: Linux Basics"}),e.jsx(_e,{size:16})]}),e.jsxs("a",{href:`http://${typeof window<"u"?window.location.hostname:"localhost"}:6080/vnc.html?autoconnect=true&resize=remote`,target:"_blank",rel:"noopener noreferrer",className:"hero-secondary-btn",children:[e.jsx(Ns,{size:17}),e.jsx("span",{children:"Launch Desktop GUI (:6080)"})]}),e.jsxs("a",{href:`http://${typeof window<"u"?window.location.hostname:"localhost"}:7681`,target:"_blank",rel:"noopener noreferrer",className:"hero-secondary-btn",children:[e.jsx(ze,{size:17}),e.jsx("span",{children:"Web Terminal (:7681)"})]}),e.jsxs("a",{href:`http://${typeof window<"u"?window.location.hostname:"localhost"}:8443/?folder=/home/student`,target:"_blank",rel:"noopener noreferrer",className:"hero-secondary-btn",children:[e.jsx(Bt,{size:17}),e.jsx("span",{children:"Open VS Code (:8443)"})]})]})]}),e.jsx("div",{className:"hero-graphic",children:e.jsx("img",{src:"assets/images/ros2_logo.svg",alt:"ROS 2 Architecture",className:"hero-ros2-logo"})})]}),e.jsxs("section",{className:"hub-stats-ribbon",children:[e.jsxs("div",{className:"stat-card",children:[e.jsx("div",{className:"stat-number",children:"26"}),e.jsx("div",{className:"stat-label",children:"Hands-On Lessons"}),e.jsx("div",{className:"stat-sub",children:"Step-by-step guides"})]}),e.jsxs("div",{className:"stat-card",children:[e.jsx("div",{className:"stat-number",children:a.length}),e.jsx("div",{className:"stat-label",children:"Core Modules"}),e.jsx("div",{className:"stat-sub",children:"Middleware to Nav2"})]}),e.jsxs("div",{className:"stat-card",children:[e.jsx("div",{className:"stat-number",children:"2"}),e.jsx("div",{className:"stat-label",children:"Capstone Projects"}),e.jsx("div",{className:"stat-sub",children:"Physical & Sim AMRs"})]}),e.jsxs("div",{className:"stat-card highlight",children:[e.jsxs("div",{className:"stat-number",children:[g,"%"]}),e.jsx("div",{className:"stat-label",children:"Your Progress"}),e.jsxs("div",{className:"stat-sub",children:[T," of ",w," Completed"]})]})]}),e.jsxs("section",{className:"hub-modules-section",children:[e.jsx("div",{className:"section-header-row",children:e.jsxs("div",{children:[e.jsx("h2",{className:"section-title",children:"Curriculum Modules & Learning Track"}),e.jsx("p",{className:"section-subtitle",children:"Follow the pedagogical sequence or jump directly into specialized robotics domains:"})]})}),e.jsx("div",{className:"modules-grid",children:a.map(j=>{const l=s.filter(m=>m.module_id===j.id||Number(String(m.module_id).replace(/\D/g,""))===j.id),p=l.filter(m=>u.includes(m.id)).length,n=p===l.length&&l.length>0,o=ti[j.id]||Te;return e.jsxs("div",{className:`module-card ${n?"completed":""}`,children:[e.jsxs("div",{className:"module-card-header",children:[e.jsx("div",{className:"module-icon-wrap",children:e.jsx(o,{size:20})}),e.jsxs("div",{className:"module-title-wrap",children:[e.jsxs("span",{className:"module-meta",children:["Module ",j.id," • Lessons"," ",String(j.range[0]).padStart(2,"0"),"-",String(j.range[1]).padStart(2,"0")]}),e.jsx("h3",{className:"module-heading",children:j.name})]}),e.jsxs("span",{className:`module-status-tag ${n?"done":""}`,children:[p,"/",l.length]})]}),e.jsx("ul",{className:"module-lessons-list",children:l.map(m=>{const x=u.includes(m.id);return e.jsx("li",{children:e.jsxs("button",{className:`module-lesson-link ${x?"done":""}`,onClick:()=>i(m.id),children:[e.jsx("span",{className:"lesson-num-pill",children:m.num_str}),e.jsx("span",{className:"lesson-title-text",children:m.title}),x&&e.jsx(H,{size:14,className:"lesson-done-check"})]})},m.id)})})]},j.id)})})]}),e.jsxs("section",{className:"hub-assignments-section",children:[e.jsx("div",{className:"section-header-row",children:e.jsxs("div",{children:[e.jsx("h2",{className:"section-title",children:"💻 Hands-On Projects & Reference Solutions"}),e.jsxs("p",{className:"section-subtitle",children:["Starter templates with ",e.jsx("code",{children:"# TODO"})," exercises are mounted in your VS Code workspace (",e.jsx("code",{children:"~/ros2_ws/src/"}),"):"]})]})}),e.jsx("div",{className:"table-wrapper",children:e.jsxs("table",{className:"assignments-table",children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"Project / Milestone"}),e.jsx("th",{children:"Focus Domain"}),e.jsx("th",{children:"Student Task Template (To Fill In)"}),e.jsx("th",{children:"Reference Solution"})]})}),e.jsxs("tbody",{children:[e.jsxs("tr",{children:[e.jsxs("td",{children:[e.jsx("span",{className:"badge badge-success",style:{marginRight:"6px",fontSize:"0.7rem"},children:"Beginner"}),e.jsx("strong",{children:"Pub/Sub Chatter Task"})]}),e.jsx("td",{children:"Core String Pub/Sub (Lesson 05)"}),e.jsx("td",{children:e.jsx("code",{children:"nexus_amr_basics/m01_l05_task_custom_pubsub.py"})}),e.jsx("td",{children:e.jsx("code",{children:"nexus_amr_basics/m01_l05_solution_custom_pubsub.py"})})]}),e.jsxs("tr",{children:[e.jsxs("td",{children:[e.jsx("span",{className:"badge badge-success",style:{marginRight:"6px",fontSize:"0.7rem"},children:"Core Service"}),e.jsx("strong",{children:"AMR Speed Mode & Zone Governor"})]}),e.jsx("td",{children:"Services & RPC (Lesson 07)"}),e.jsx("td",{children:e.jsx("code",{children:"nexus_amr_basics/m02_l07_task_speed_mode_server.py"})}),e.jsx("td",{children:e.jsx("code",{children:"nexus_amr_basics/m02_l07_solution_speed_mode_server.py"})})]}),e.jsxs("tr",{children:[e.jsxs("td",{children:[e.jsx("span",{className:"badge badge-info",style:{marginRight:"6px",fontSize:"0.7rem"},children:"Capstone 1"}),e.jsx("strong",{children:"Teleop Velocity Scaler"})]}),e.jsx("td",{children:"Publishers, Subscribers & QoS"}),e.jsx("td",{children:e.jsx("code",{children:"nexus_amr_basics/m01_l05_task_teleop_speed_limiter.py"})}),e.jsx("td",{children:e.jsx("code",{children:"nexus_amr_basics/m01_l05_solution_teleop_speed_limiter.py"})})]}),e.jsxs("tr",{children:[e.jsxs("td",{children:[e.jsx("span",{className:"badge badge-info",style:{marginRight:"6px",fontSize:"0.7rem"},children:"Capstone 2"}),e.jsx("strong",{children:"Nav2 Autonomous Patrol Mission"})]}),e.jsx("td",{children:"Autonomous Navigation & Simple Commander"}),e.jsx("td",{children:e.jsx("code",{children:"nexus_amr_navigation/m04_l22_02_task_multi_waypoint_patrol.py"})}),e.jsx("td",{children:e.jsx("code",{children:"nexus_amr_navigation/m04_l22_03_solution_multi_waypoint_patrol.py"})})]})]})]})}),e.jsxs("div",{className:"mock-callout-card",children:[e.jsxs("div",{className:"mock-callout-header",children:[e.jsx(ye,{size:20,className:"mock-icon"}),e.jsx("h4",{children:"Companion Mock Data Simulator Node"})]}),e.jsx("p",{children:"When completing assignments, test your node logic immediately without waiting for heavy Gazebo simulations. Run the companion mock telemetry publisher in any terminal:"}),e.jsxs("div",{className:"code-container",style:{margin:"0.75rem 0"},children:[e.jsx("div",{className:"code-header",children:e.jsx("span",{className:"code-lang-tag",children:"BASH"})}),e.jsx("pre",{children:e.jsx("code",{children:"ros2 run nexus_amr_basics mock_telemetry_provider"})})]}),e.jsxs("span",{className:"mock-detail",children:["Simulates ",e.jsx("code",{children:"/battery_voltage"}),","," ",e.jsx("code",{children:"/battery_status"}),", ",e.jsx("code",{children:"/obstacle_distance"}),", and"," ",e.jsx("code",{children:"/wheel_speeds"}),"."]})]})]})]})}const Wt="nexus_amr_l1_quiz_answers",ai="navpro_l1_quiz_answers",Dt=a=>{try{const s=localStorage.getItem(Wt)||localStorage.getItem(ai);return(s?JSON.parse(s):{})[a]||{}}catch{return{}}},bs=(a,s)=>{try{const i=localStorage.getItem(Wt),u=i?JSON.parse(i):{};s&&Object.keys(s).length>0?u[a]=s:delete u[a],localStorage.setItem(Wt,JSON.stringify(u))}catch(i){console.error("Failed to save quiz answers",i)}};function ii({lessonId:a,quizzes:s,savedScore:i,onRecordScore:u}){const[g,T]=c.useState(()=>Dt(a)),[w,I]=c.useState(()=>{const o=Dt(a);return!!(i&&Object.keys(o).length>0)}),[N,j]=c.useState(i||null);if(c.useEffect(()=>{const o=Dt(a);T(o);const m=Object.keys(o).length>0;I(!!(i&&m)),j(i||null)},[a]),c.useEffect(()=>{i&&j(i)},[i]),!s||s.length===0)return null;const l=(o,m)=>{w||T(x=>{const S={...x,[o]:m};return bs(a,S),S})},p=o=>{if(o.preventDefault(),w)return;let m=0;s.forEach((S,z)=>{g[z]===S.correct&&(m+=1)});const x={score:m,total:s.length,passed:m===s.length,timestamp:Date.now()};I(!0),j(x),bs(a,g),u(a,m,s.length)},n=s.length>0&&Object.keys(g).length===s.length;return e.jsxs("div",{className:"quiz-container-card",children:[e.jsxs("div",{className:"quiz-header",children:[e.jsxs("div",{className:"quiz-header-title",children:[e.jsx(ft,{size:22,className:"quiz-badge-icon"}),e.jsxs("div",{children:[e.jsx("h3",{children:"Knowledge Check • Quick Quiz"}),e.jsxs("span",{className:"quiz-subtitle",children:["Verify your understanding of this lesson's core concepts (",s.length," questions)"]})]})]}),N&&e.jsxs("div",{className:`quiz-score-badge ${N.passed?"passed":"review"}`,children:[e.jsx(qt,{size:16}),e.jsxs("span",{children:[N.score," / ",N.total," (",Math.round(N.score/N.total*100),"%)"]})]})]}),e.jsxs("form",{onSubmit:p,className:"quiz-form",children:[s.map((o,m)=>{const x=g[m],S=w&&x===o.correct;return e.jsxs("div",{className:`quiz-question-block ${w?S?"correct-block":"incorrect-block":""}`,children:[e.jsxs("div",{className:"question-prompt",children:[e.jsxs("span",{className:"q-number",children:["Q",m+1,"."]}),e.jsx("span",{className:"q-text",children:o.prompt})]}),e.jsx("div",{className:"question-options",children:o.options.map((z,R)=>{const h=x===R,f=R===o.correct;let _="quiz-option-label";return w?(_+=" submitted",f?(_+=" correct-option",h&&(_+=" user-selected")):h?_+=" wrong-option user-selected":_+=" unselected-dimmed"):h&&(_+=" selected-option"),e.jsxs("label",{className:_,children:[e.jsx("input",{type:"radio",name:`question_${m}`,checked:h,onChange:()=>l(m,R),disabled:w}),e.jsx("span",{className:"option-text",children:z}),w&&e.jsxs(e.Fragment,{children:[f&&h&&e.jsxs("span",{className:"quiz-choice-badge correct",children:[e.jsx(ms,{size:14})," Your Answer • Correct"]}),f&&!h&&e.jsxs("span",{className:"quiz-choice-badge correct-answer",children:[e.jsx(ms,{size:14})," Correct Answer"]}),!f&&h&&e.jsxs("span",{className:"quiz-choice-badge wrong",children:[e.jsx(Qe,{size:14})," Your Answer • Incorrect"]})]})]},R)})}),w&&e.jsxs("div",{className:`quiz-explanation-box ${S?"exp-correct":"exp-wrong"}`,children:[e.jsx("strong",{children:S?"✅ Correct Explanation:":"💡 Key Concept:"}),e.jsx("p",{children:o.explanation})]})]},o.id||m)}),e.jsx("div",{className:"quiz-actions-footer",children:w?e.jsx("div",{className:"quiz-result-row",children:e.jsx("span",{className:"result-text",children:N!=null&&N.passed?"🎉 Outstanding! You passed this lesson check.":"Review the key concepts and explanations above."})}):e.jsxs("button",{type:"submit",disabled:!n,className:`quiz-submit-btn ${n?"":"disabled"}`,children:[e.jsx(ve,{size:15}),e.jsx("span",{children:n?"Submit Quiz Answers":`Answer All Questions (${Object.keys(g).length}/${s.length})`})]})})]})]})}function Fs(){const[a,s]=c.useState("-"),[i,u]=c.useState({r:!0,w:!0,x:!0}),[g,T]=c.useState({r:!0,w:!1,x:!0}),[w,I]=c.useState({r:!0,w:!1,x:!0}),[N,j]=c.useState(!1),[l,p]=c.useState(null),n=(i.r?4:0)+(i.w?2:0)+(i.x?1:0),o=(g.r?4:0)+(g.w?2:0)+(g.x?1:0),m=(w.r?4:0)+(w.w?2:0)+(w.x?1:0),x=`${n}${o}${m}`,S=[{label:"Type",val:a,desc:a==="d"?"Directory":"Regular File",color:"#64748b"},{label:"u:r",val:i.r?"r":"-",desc:"User Read (4)",color:"#10b981",active:i.r},{label:"u:w",val:i.w?"w":"-",desc:"User Write (2)",color:"#10b981",active:i.w},{label:"u:x",val:i.x?"x":"-",desc:"User Execute (1)",color:"#10b981",active:i.x},{label:"g:r",val:g.r?"r":"-",desc:"Group Read (4)",color:"#0284c7",active:g.r},{label:"g:w",val:g.w?"w":"-",desc:"Group Write (2)",color:"#0284c7",active:g.w},{label:"g:x",val:g.x?"x":"-",desc:"Group Execute (1)",color:"#0284c7",active:g.x},{label:"o:r",val:w.r?"r":"-",desc:"Others Read (4)",color:"#8b5cf6",active:w.r},{label:"o:w",val:w.w?"w":"-",desc:"Others Write (2)",color:"#8b5cf6",active:w.w},{label:"o:x",val:w.x?"x":"-",desc:"Others Execute (1)",color:"#8b5cf6",active:w.x}],z=S.map(y=>y.val).join(""),R=`chmod ${x} sensor_diagnostics.sh`,h=(y,v,b)=>{p(b),setTimeout(()=>p(null),400),y==="user"?u(r=>({...r,[v]:!r[v]})):y==="group"?T(r=>({...r,[v]:!r[v]})):y==="others"&&I(r=>({...r,[v]:!r[v]}))},f=(y,v,b,r=!1)=>{u(y),T(v),I(b),s(r?"d":"-")},_=()=>{navigator.clipboard.writeText(R).then(()=>{j(!0),setTimeout(()=>j(!1),2e3)})};return e.jsxs("div",{className:"perm-calc-card",children:[e.jsxs("div",{className:"perm-calc-header",children:[e.jsxs("div",{className:"perm-calc-title-row",children:[e.jsxs("div",{className:"perm-calc-badge",children:[e.jsx(te,{size:16}),e.jsx("span",{children:"Interactive Simulator"})]}),e.jsx("h3",{className:"perm-calc-title",children:"Linux Permission String & Octal Visualizer"})]}),e.jsx("p",{className:"perm-calc-subtitle",children:"Toggle the checkboxes below to see in real time how Linux parses read, write, and execute bits into the 10-character permission string and octal numbers."})]}),e.jsxs("div",{className:"perm-display-container",children:[e.jsx("div",{className:"perm-display-label",children:"Active Linux Permission String:"}),e.jsx("div",{className:"perm-string-row",children:S.map((y,v)=>e.jsxs("div",{className:`perm-char-pill ${l===v?"pulse-anim":""} ${y.active!==!1?"active-bit":"inactive-bit"}`,style:{borderColor:y.active!==!1?y.color:"var(--border-color)",color:y.active!==!1?y.color:"var(--text-muted)"},title:y.desc,children:[e.jsx("span",{className:"char-val",children:y.val}),e.jsx("span",{className:"char-sub",children:y.label})]},v))}),e.jsxs("div",{className:"perm-legend-row",children:[e.jsxs("div",{className:"legend-chip file-chip",children:[e.jsx("span",{className:"dot",style:{background:"#64748b"}}),e.jsxs("span",{children:["Type: ",e.jsx("code",{children:a==="d"?"Directory (d)":"File (-)"})]})]}),e.jsxs("div",{className:"legend-chip user-chip",children:[e.jsx("span",{className:"dot",style:{background:"#10b981"}}),e.jsxs("span",{children:["User/Owner: ",e.jsxs("code",{children:[n," (",S.slice(1,4).map(y=>y.val).join(""),")"]})]})]}),e.jsxs("div",{className:"legend-chip group-chip",children:[e.jsx("span",{className:"dot",style:{background:"#0284c7"}}),e.jsxs("span",{children:["Group: ",e.jsxs("code",{children:[o," (",S.slice(4,7).map(y=>y.val).join(""),")"]})]})]}),e.jsxs("div",{className:"legend-chip others-chip",children:[e.jsx("span",{className:"dot",style:{background:"#8b5cf6"}}),e.jsxs("span",{children:["Others: ",e.jsxs("code",{children:[m," (",S.slice(7,10).map(y=>y.val).join(""),")"]})]})]})]})]}),e.jsxs("div",{className:"perm-command-bar",children:[e.jsxs("div",{className:"octal-score-box",children:[e.jsx("span",{className:"octal-score-label",children:"Octal Mode:"}),e.jsx("span",{className:"octal-score-number",children:x})]}),e.jsxs("div",{className:"command-display-box",children:[e.jsx("span",{className:"command-prompt",children:"$"}),e.jsx("code",{className:"command-text",children:R})]}),e.jsxs("button",{onClick:_,className:`copy-cmd-btn ${N?"copied":""}`,title:"Copy command to clipboard",children:[N?e.jsx(Se,{size:16}):e.jsx(Xe,{size:16}),e.jsx("span",{children:N?"Copied!":"Copy"})]})]}),e.jsxs("div",{className:"perm-columns-grid",children:[e.jsxs("div",{className:"perm-col user-col",children:[e.jsxs("div",{className:"perm-col-header",style:{borderLeftColor:"#10b981"},children:[e.jsxs("div",{className:"col-header-top",children:[e.jsx("span",{className:"col-badge",style:{background:"#ecfdf5",color:"#059669"},children:"u (User / Owner)"}),e.jsxs("span",{className:"col-sum",style:{color:"#059669"},children:["= ",n]})]}),e.jsx("p",{className:"col-desc",children:"The student or process who created the file"})]}),e.jsxs("div",{className:"checkbox-list",children:[e.jsxs("label",{className:`perm-check-item ${i.r?"checked":""}`,children:[e.jsx("input",{type:"checkbox",checked:i.r,onChange:()=>h("user","r",1)}),e.jsxs("span",{className:"check-text",children:[e.jsx("strong",{children:"Read (r)"}),e.jsx("span",{className:"math-badge",children:"+4"})]}),e.jsx("span",{className:"hint-text",children:"View & cat file"})]}),e.jsxs("label",{className:`perm-check-item ${i.w?"checked":""}`,children:[e.jsx("input",{type:"checkbox",checked:i.w,onChange:()=>h("user","w",2)}),e.jsxs("span",{className:"check-text",children:[e.jsx("strong",{children:"Write (w)"}),e.jsx("span",{className:"math-badge",children:"+2"})]}),e.jsx("span",{className:"hint-text",children:"Edit, modify, delete"})]}),e.jsxs("label",{className:`perm-check-item ${i.x?"checked":""}`,children:[e.jsx("input",{type:"checkbox",checked:i.x,onChange:()=>h("user","x",3)}),e.jsxs("span",{className:"check-text",children:[e.jsx("strong",{children:"Execute (x)"}),e.jsx("span",{className:"math-badge",children:"+1"})]}),e.jsx("span",{className:"hint-text",children:"Run as executable"})]})]})]}),e.jsxs("div",{className:"perm-col group-col",children:[e.jsxs("div",{className:"perm-col-header",style:{borderLeftColor:"#0284c7"},children:[e.jsxs("div",{className:"col-header-top",children:[e.jsx("span",{className:"col-badge",style:{background:"#f0f9ff",color:"#0284c7"},children:"g (Group)"}),e.jsxs("span",{className:"col-sum",style:{color:"#0284c7"},children:["= ",o]})]}),e.jsx("p",{className:"col-desc",children:"Members of the student's assigned Linux usergroup"})]}),e.jsxs("div",{className:"checkbox-list",children:[e.jsxs("label",{className:`perm-check-item ${g.r?"checked":""}`,children:[e.jsx("input",{type:"checkbox",checked:g.r,onChange:()=>h("group","r",4)}),e.jsxs("span",{className:"check-text",children:[e.jsx("strong",{children:"Read (r)"}),e.jsx("span",{className:"math-badge",children:"+4"})]}),e.jsx("span",{className:"hint-text",children:"View contents"})]}),e.jsxs("label",{className:`perm-check-item ${g.w?"checked":""}`,children:[e.jsx("input",{type:"checkbox",checked:g.w,onChange:()=>h("group","w",5)}),e.jsxs("span",{className:"check-text",children:[e.jsx("strong",{children:"Write (w)"}),e.jsx("span",{className:"math-badge",children:"+2"})]}),e.jsx("span",{className:"hint-text",children:"Modify file"})]}),e.jsxs("label",{className:`perm-check-item ${g.x?"checked":""}`,children:[e.jsx("input",{type:"checkbox",checked:g.x,onChange:()=>h("group","x",6)}),e.jsxs("span",{className:"check-text",children:[e.jsx("strong",{children:"Execute (x)"}),e.jsx("span",{className:"math-badge",children:"+1"})]}),e.jsx("span",{className:"hint-text",children:"Run program"})]})]})]}),e.jsxs("div",{className:"perm-col others-col",children:[e.jsxs("div",{className:"perm-col-header",style:{borderLeftColor:"#8b5cf6"},children:[e.jsxs("div",{className:"col-header-top",children:[e.jsx("span",{className:"col-badge",style:{background:"#f5f3ff",color:"#7c3aed"},children:"o (Others / World)"}),e.jsxs("span",{className:"col-sum",style:{color:"#7c3aed"},children:["= ",m]})]}),e.jsx("p",{className:"col-desc",children:"Any other user account or service on the robot"})]}),e.jsxs("div",{className:"checkbox-list",children:[e.jsxs("label",{className:`perm-check-item ${w.r?"checked":""}`,children:[e.jsx("input",{type:"checkbox",checked:w.r,onChange:()=>h("others","r",7)}),e.jsxs("span",{className:"check-text",children:[e.jsx("strong",{children:"Read (r)"}),e.jsx("span",{className:"math-badge",children:"+4"})]}),e.jsx("span",{className:"hint-text",children:"View contents"})]}),e.jsxs("label",{className:`perm-check-item ${w.w?"checked":""}`,children:[e.jsx("input",{type:"checkbox",checked:w.w,onChange:()=>h("others","w",8)}),e.jsxs("span",{className:"check-text",children:[e.jsx("strong",{children:"Write (w)"}),e.jsx("span",{className:"math-badge",children:"+2"})]}),e.jsx("span",{className:"hint-text",children:"Modify file"})]}),e.jsxs("label",{className:`perm-check-item ${w.x?"checked":""}`,children:[e.jsx("input",{type:"checkbox",checked:w.x,onChange:()=>h("others","x",9)}),e.jsxs("span",{className:"check-text",children:[e.jsx("strong",{children:"Execute (x)"}),e.jsx("span",{className:"math-badge",children:"+1"})]}),e.jsx("span",{className:"hint-text",children:"Run program"})]})]})]})]}),e.jsxs("div",{className:"perm-presets-row",children:[e.jsx("span",{className:"presets-label",children:"⚡ Common Robotics Presets:"}),e.jsxs("div",{className:"preset-buttons",children:[e.jsxs("button",{type:"button",className:`preset-btn ${x==="755"?"active":""}`,onClick:()=>f({r:!0,w:!0,x:!0},{r:!0,w:!1,x:!0},{r:!0,w:!1,x:!0}),children:[e.jsx("strong",{children:"755"})," (ROS Node / Script)"]}),e.jsxs("button",{type:"button",className:`preset-btn ${x==="644"?"active":""}`,onClick:()=>f({r:!0,w:!0,x:!1},{r:!0,w:!1,x:!1},{r:!0,w:!1,x:!1}),children:[e.jsx("strong",{children:"644"})," (Config / YAML / Read)"]}),e.jsxs("button",{type:"button",className:`preset-btn ${x==="700"?"active":""}`,onClick:()=>f({r:!0,w:!0,x:!0},{r:!1,w:!1,x:!1},{r:!1,w:!1,x:!1}),children:[e.jsx("strong",{children:"700"})," (Private Script / SSH)"]}),e.jsxs("button",{type:"button",className:`preset-btn ${x==="600"?"active":""}`,onClick:()=>f({r:!0,w:!0,x:!1},{r:!1,w:!1,x:!1},{r:!1,w:!1,x:!1}),children:[e.jsx("strong",{children:"600"})," (Private Secret / Key)"]}),e.jsxs("button",{type:"button",className:`preset-btn danger ${x==="777"?"active":""}`,onClick:()=>f({r:!0,w:!0,x:!0},{r:!0,w:!0,x:!0},{r:!0,w:!0,x:!0}),children:[e.jsx("strong",{children:"777"})," (Full Access - Insecure!)"]})]})]}),e.jsxs("div",{className:"perm-terminal-simulator",children:[e.jsxs("div",{className:"terminal-header",children:[e.jsxs("div",{className:"terminal-dots",children:[e.jsx("span",{className:"dot red"}),e.jsx("span",{className:"dot yellow"}),e.jsx("span",{className:"dot green"})]}),e.jsx("span",{className:"terminal-title",children:"Terminal Execution Test: ~/robotics_lab/scripts/sensor_diagnostics.sh"})]}),e.jsxs("div",{className:"terminal-body",children:[e.jsxs("div",{className:"terminal-line",children:[e.jsx("span",{className:"term-prompt",children:"student@nexus-amr:~/robotics_lab/scripts$"}),e.jsx("span",{className:"term-cmd",children:"ls -l sensor_diagnostics.sh"})]}),e.jsxs("div",{className:"terminal-output ls-output",children:[e.jsx("span",{style:{color:"#38bdf8"},children:z})," 1 student student 1420 Oct 14 10:00 sensor_diagnostics.sh"]}),e.jsxs("div",{className:"terminal-line",style:{marginTop:"8px"},children:[e.jsx("span",{className:"term-prompt",children:"student@nexus-amr:~/robotics_lab/scripts$"}),e.jsx("span",{className:"term-cmd",children:"./sensor_diagnostics.sh"})]}),i.x?e.jsxs("div",{className:"terminal-output exec-success",children:[e.jsxs("div",{className:"status-badge-row",children:[e.jsx(H,{size:16,className:"text-success"}),e.jsx("strong",{className:"text-success",children:"[EXECUTION GRANTED - Exit Code 0]"})]}),e.jsxs("p",{className:"output-msg",children:["==========================================",e.jsx("br",{}),"      ROBOT SENSOR PRE-FLIGHT CHECK",e.jsx("br",{}),"==========================================",e.jsx("br",{}),"All host AMR motor controllers and LiDAR sensors operating normally!"]})]}):e.jsxs("div",{className:"terminal-output exec-denied",children:[e.jsxs("div",{className:"status-badge-row",children:[e.jsx(Qe,{size:16,className:"text-danger"}),e.jsx("strong",{className:"text-danger",children:"bash: ./sensor_diagnostics.sh: Permission denied (Exit Code 126)"})]}),e.jsxs("p",{className:"output-tip",children:["💡 ",e.jsx("strong",{children:"Why this happens:"})," The Owner Execute bit (",e.jsx("code",{children:"x"}),") is unchecked! Linux blocks script execution to protect the system. Run ",e.jsx("code",{children:"chmod +x sensor_diagnostics.sh"})," (or toggle Execute above) to fix this."]})]})]})]})]})}function Os(){const a=c.useRef(null),[s,i]=c.useState("auto"),[u,g]=c.useState(!0),[T,w]=c.useState(2),[I,N]=c.useState(1.8),[j,l]=c.useState(null),[p,n]=c.useState(42),[o,m]=c.useState("CIRCULAR_DRIVE"),x=c.useRef({x:180,y:120,theta:0,trail:[]}),S=()=>{x.current={x:180,y:120,theta:0,trail:[]},w(0),N(0),m("POSE_RESET")},z=()=>{x.current.trail=[],m("INK_CLEARED")};c.useEffect(()=>{const h=_=>{let y=null,v=0,b=0;if(_.key==="ArrowUp"?(y="UP",v=2,b=0):_.key==="ArrowDown"?(y="DOWN",v=-2,b=0):_.key==="ArrowLeft"?(y="LEFT",v=0,b=2.2):_.key==="ArrowRight"&&(y="RIGHT",v=0,b=-2.2),y){_.preventDefault(),i("manual"),l(y),w(v),N(b),n(C=>C+1),m(`KEY_${y}`);const r=x.current,d=.18;r.theta+=b*d,r.x+=v*Math.cos(r.theta)*12,r.y+=v*Math.sin(r.theta)*12,r.x=Math.max(20,Math.min(340,r.x)),r.y=Math.max(20,Math.min(220,r.y)),r.trail.push({x:r.x,y:r.y}),r.trail.length>300&&r.trail.shift()}},f=_=>{["ArrowUp","ArrowDown","ArrowLeft","ArrowRight"].includes(_.key)&&l(null)};return window.addEventListener("keydown",h),window.addEventListener("keyup",f),()=>{window.removeEventListener("keydown",h),window.removeEventListener("keyup",f)}},[]);const R=h=>{i("manual");let f=0,_=0;h==="UP"?(f=2,_=0):h==="DOWN"?(f=-2,_=0):h==="LEFT"?(f=0,_=2.2):h==="RIGHT"&&(f=0,_=-2.2),l(h),w(f),N(_),n(b=>b+1),m(`BUTTON_${h}`);const y=x.current,v=.22;y.theta+=_*v,y.x+=f*Math.cos(y.theta)*14,y.y+=f*Math.sin(y.theta)*14,y.x=Math.max(20,Math.min(340,y.x)),y.y=Math.max(20,Math.min(220,y.y)),y.trail.push({x:y.x,y:y.y}),y.trail.length>300&&y.trail.shift(),setTimeout(()=>l(null),250)};return c.useEffect(()=>{let h,f=performance.now();const _=y=>{const v=(y-f)/1e3;if(f=y,s==="auto"&&u){const r=x.current,d=1.6,C=Math.sin(y*.0018)*2.2;w(d),N(Number(C.toFixed(2))),m("AUTO_PATROL"),r.theta+=C*v,r.x+=d*Math.cos(r.theta)*35*v,r.y+=d*Math.sin(r.theta)*35*v,r.x<15&&(r.x=345),r.x>345&&(r.x=15),r.y<15&&(r.y=225),r.y>225&&(r.y=15),r.trail.push({x:r.x,y:r.y}),r.trail.length>250&&r.trail.shift(),Math.random()<.2&&n(P=>P+1)}const b=a.current;if(b){const r=b.getContext("2d"),d=b.width,C=b.height;r.fillStyle="#0f172a",r.fillRect(0,0,d,C),r.strokeStyle="rgba(255, 255, 255, 0.04)",r.lineWidth=1;for(let A=0;A<d;A+=30)r.beginPath(),r.moveTo(A,0),r.lineTo(A,C),r.stroke();for(let A=0;A<C;A+=30)r.beginPath(),r.moveTo(0,A),r.lineTo(d,A),r.stroke();const P=x.current;if(P.trail.length>1){r.beginPath(),r.moveTo(P.trail[0].x,P.trail[0].y);for(let A=1;A<P.trail.length;A++)r.lineTo(P.trail[A].x,P.trail[A].y);r.strokeStyle="#38bdf8",r.lineWidth=3.5,r.lineCap="round",r.lineJoin="round",r.shadowColor="rgba(56, 189, 248, 0.6)",r.shadowBlur=8,r.stroke(),r.shadowBlur=0}r.save(),r.translate(P.x,P.y),r.rotate(P.theta),r.beginPath(),r.arc(0,0,14,0,Math.PI*2),r.fillStyle="rgba(16, 185, 129, 0.2)",r.fill(),r.beginPath(),r.ellipse(0,0,12,10,0,0,Math.PI*2),r.fillStyle="#10b981",r.fill(),r.strokeStyle="#34d399",r.lineWidth=2,r.stroke(),r.beginPath(),r.arc(0,0,5,0,Math.PI*2),r.strokeStyle="rgba(255, 255, 255, 0.4)",r.stroke(),r.beginPath(),r.arc(12,0,5,0,Math.PI*2),r.fillStyle="#34d399",r.fill(),r.beginPath(),r.moveTo(14,0),r.lineTo(24,0),r.strokeStyle="#f59e0b",r.lineWidth=2,r.stroke(),r.fillStyle="#059669",r.fillRect(4,-13,6,4),r.fillRect(4,9,6,4),r.fillRect(-10,-12,5,3),r.fillRect(-10,9,5,3),r.restore()}h=requestAnimationFrame(_)};return h=requestAnimationFrame(_),()=>cancelAnimationFrame(h)},[s,u]),e.jsxs("div",{className:"turtlesim-flow-container",children:[e.jsxs("div",{className:"turtlesim-flow-header",children:[e.jsxs("div",{className:"flow-header-left",children:[e.jsxs("div",{className:"flow-status-pill",children:[e.jsx("span",{className:"flow-pulse-dot"}),e.jsx("strong",{children:"LIVE COMPUTATIONAL GRAPH"})]}),e.jsx("h3",{className:"flow-title",children:"ROS 2 Peer-to-Peer DDS Runtime Pipeline"}),e.jsxs("p",{className:"flow-subtitle",children:["Observe velocity packets emitted from ",e.jsx("code",{className:"inline-code",children:"turtle_teleop_key"})," to ",e.jsx("code",{className:"inline-code",children:"turtlesim_node"})," over ",e.jsx("code",{className:"inline-code",children:"/turtle1/cmd_vel"}),"."]})]}),e.jsxs("div",{className:"flow-header-controls",children:[e.jsxs("button",{onClick:()=>i(s==="auto"?"manual":"auto"),className:`flow-ctrl-btn ${s==="auto"?"active-auto":""}`,title:"Toggle between Auto-Pilot Demo and Interactive Keyboard Mode",children:[e.jsx(Ze,{size:14}),e.jsx("span",{children:s==="auto"?"Auto Demo Active":"Manual Mode"})]}),s==="auto"&&e.jsx("button",{onClick:()=>g(!u),className:"flow-ctrl-btn",title:u?"Pause auto demo":"Resume auto demo",children:u?e.jsx(we,{size:14}):e.jsx(be,{size:14})}),e.jsxs("button",{onClick:z,className:"flow-ctrl-btn",title:"Clear canvas ink trail (ros2 service call /clear)",children:[e.jsx(xa,{size:14}),e.jsx("span",{children:"Clear Ink"})]}),e.jsxs("button",{onClick:S,className:"flow-ctrl-btn",title:"Reset turtle pose (ros2 service call /reset)",children:[e.jsx(K,{size:14}),e.jsx("span",{children:"Reset"})]})]})]}),e.jsxs("div",{className:"turtlesim-diagram-grid",children:[e.jsxs("div",{className:"flow-node-card publisher-card",children:[e.jsxs("div",{className:"node-card-badge publisher-badge",children:[e.jsx(ze,{size:14}),e.jsx("span",{children:"PUBLISHER NODE"})]}),e.jsx("h4",{className:"node-name",children:"/teleop_turtle"}),e.jsx("span",{className:"node-exec-label",children:"ros2 run turtlesim turtle_teleop_key"}),e.jsxs("div",{className:"teleop-arrow-pad-container",children:[e.jsx("div",{className:"teleop-pad-label",children:"Arrow Keys Input Teleoperation:"}),e.jsxs("div",{className:"teleop-pad-grid",children:[e.jsx("div",{}),e.jsx("button",{className:`pad-btn ${j==="UP"?"active":""}`,onClick:()=>R("UP"),title:"Forward (+Linear X)",children:e.jsx(Ds,{size:16})}),e.jsx("div",{}),e.jsx("button",{className:`pad-btn ${j==="LEFT"?"active":""}`,onClick:()=>R("LEFT"),title:"Turn Left (+Angular Z)",children:e.jsx(Fe,{size:16})}),e.jsx("button",{className:`pad-btn ${j==="DOWN"?"active":""}`,onClick:()=>R("DOWN"),title:"Backward (-Linear X)",children:e.jsx(Is,{size:16})}),e.jsx("button",{className:`pad-btn ${j==="RIGHT"?"active":""}`,onClick:()=>R("RIGHT"),title:"Turn Right (-Angular Z)",children:e.jsx(_e,{size:16})})]}),e.jsx("div",{className:"key-hint",children:"💡 Use onscreen buttons or your physical arrow keys"})]}),e.jsxs("div",{className:"node-status-row",children:[e.jsx("span",{className:"status-indicator publishing"}),e.jsxs("span",{children:["Publishing ",e.jsx("strong",{style:{color:"#c084fc"},children:"geometry_msgs/msg/Twist"})]})]})]}),e.jsxs("div",{className:"flow-topic-connector",children:[e.jsxs("div",{className:"topic-header-pill",children:[e.jsx(ye,{size:13,className:"radio-pulse-icon"}),e.jsx("span",{children:"ROS 2 TOPIC"})]}),e.jsx("div",{className:"topic-pipe-container",children:e.jsxs("div",{className:"topic-pipe-track",children:[e.jsx("div",{className:"pipe-packet packet-1",children:e.jsx("span",{children:"Twist"})}),e.jsx("div",{className:"pipe-packet packet-2",children:e.jsx("span",{children:"Twist"})}),e.jsx("div",{className:"pipe-packet packet-3",children:e.jsx("span",{children:"Twist"})})]})}),e.jsxs("div",{className:"topic-metadata-card",children:[e.jsxs("div",{className:"topic-name-row",children:[e.jsx("strong",{className:"topic-name",children:"/turtle1/cmd_vel"}),e.jsx("span",{className:"topic-type-tag",children:"Twist"})]}),e.jsxs("div",{className:"topic-telemetry-box",children:[e.jsxs("div",{className:"telemetry-line",children:[e.jsx("span",{className:"telemetry-label",children:"linear.x:"}),e.jsxs("span",{className:"telemetry-val linear",children:[T>0?`+${T.toFixed(1)}`:T.toFixed(1)," m/s"]})]}),e.jsxs("div",{className:"telemetry-line",children:[e.jsx("span",{className:"telemetry-label",children:"angular.z:"}),e.jsxs("span",{className:"telemetry-val angular",children:[I>0?`+${I.toFixed(1)}`:I.toFixed(1)," rad/s"]})]}),e.jsxs("div",{className:"telemetry-line sub-line",children:[e.jsx("span",{className:"telemetry-label",children:"rate:"}),e.jsx("span",{className:"telemetry-rate",children:"~10.0 Hz"})]})]}),e.jsxs("div",{className:"topic-packet-counter",children:[e.jsxs("span",{children:["Transmitted: ",e.jsx("strong",{children:p})," msgs"]}),e.jsx("span",{className:"status-live",children:"DDS OK"})]})]})]}),e.jsxs("div",{className:"flow-node-card subscriber-card",children:[e.jsxs("div",{className:"node-card-badge subscriber-badge",children:[e.jsx(H,{size:14}),e.jsx("span",{children:"SUBSCRIBER & SIMULATOR"})]}),e.jsx("h4",{className:"node-name",children:"/turtlesim"}),e.jsx("span",{className:"node-exec-label",children:"ros2 run turtlesim turtlesim_node"}),e.jsxs("div",{className:"turtlesim-canvas-wrapper",children:[e.jsx("canvas",{ref:a,width:360,height:220,className:"turtlesim-canvas"}),e.jsx("div",{className:"canvas-watermark",children:"Qt5 Canvas • /turtle1/pose"})]}),e.jsxs("div",{className:"canvas-pose-telemetry",children:[e.jsxs("span",{children:["x: ",e.jsx("strong",{children:(x.current.x/32).toFixed(2)})]}),e.jsxs("span",{children:["y: ",e.jsx("strong",{children:(x.current.y/32).toFixed(2)})]}),e.jsxs("span",{children:["theta: ",e.jsxs("strong",{children:[x.current.theta.toFixed(2)," rad"]})]})]})]})]}),e.jsxs("div",{className:"flow-cli-introspection-bar",children:[e.jsx("span",{className:"cli-badge",children:"CLI VERIFICATION:"}),e.jsx("code",{className:"cli-command",children:"ros2 node info /turtlesim"}),e.jsx("span",{className:"cli-sep",children:"→"}),e.jsxs("span",{className:"cli-result",children:["Subscribers: ",e.jsx("strong",{style:{color:"#38bdf8"},children:"/turtle1/cmd_vel [geometry_msgs/msg/Twist]"})]})]})]})}function Gs(){const[a,s]=c.useState("setup_py"),[i,u]=c.useState(0),[g,T]=c.useState(null),w=(p,n)=>{navigator.clipboard.writeText(p),T(n),setTimeout(()=>T(null),2e3)},I=()=>{u(p=>p>=4?0:p+1)},N=[{id:"package_xml",name:"package.xml",path:"nexus_amr_controller/package.xml",title:"Package Manifest & Dependency Declarations",badge:"Format 3 XML",badgeColor:"#f59e0b",badgeBg:"rgba(245, 158, 11, 0.12)",borderAccent:"#f59e0b",icon:_a,summary:"Declares package name, version, licensing, and all runtime & build dependencies.",purpose:"Parsed by colcon, rosdep, and package indexing tools to resolve dependency graphs.",commonPitfall:'Forgetting to add an <exec_depend> (e.g. geometry_msgs) will cause your node to crash at runtime with "ModuleNotFoundError" on other machines.',code:`<?xml version="1.0"?>
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
</package>`,codeLang:"xml"},{id:"setup_py",name:"setup.py",path:"nexus_amr_controller/setup.py",title:"Python Build Script & Console Scripts",badge:"Build Engine",badgeColor:"#38bdf8",badgeBg:"rgba(56, 189, 248, 0.12)",borderAccent:"#38bdf8",icon:je,summary:"Configures setuptools distribution and maps CLI command names to Python entry points.",purpose:"The entry_points dictionary generates the executable binary placed in install/lib/nexus_amr_controller/.",commonPitfall:`Typo in entry_points ("node_name = pkg.module:main") produces "Package doesn't have the executable" error when running ros2 run.`,code:`from setuptools import find_packages, setup

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
)`,codeLang:"python"},{id:"setup_cfg",name:"setup.cfg",path:"nexus_amr_controller/setup.cfg",title:"Script Destination Configuration",badge:"Executable Routing",badgeColor:"#10b981",badgeBg:"rgba(16, 185, 129, 0.12)",borderAccent:"#10b981",icon:Te,summary:"Forces setuptools to install executables into lib/nexus_amr_controller/ rather than global bin/.",purpose:"Enforces ROS 2 package isolation, preventing script name collisions between different packages.",commonPitfall:"Removing or corrupting setup.cfg causes colcon to install binaries into standard bin/, which breaks ros2 run resolution.",code:`[develop]
script_dir=$base/lib/nexus_amr_controller
[install]
install_scripts=$base/lib/nexus_amr_controller`,codeLang:"ini"},{id:"resource",name:"resource/nexus_amr_controller",path:"nexus_amr_controller/resource/nexus_amr_controller",title:"Ament Index Discovery Marker",badge:"Discovery Marker",badgeColor:"#c084fc",badgeBg:"rgba(192, 132, 252, 0.12)",borderAccent:"#c084fc",icon:te,summary:"An empty marker file matching the exact package name.",purpose:"Provides the token required by the Ament Index. Without it, ros2 pkg list and ros2 run will fail to discover the package.",commonPitfall:"Deleting the resource/ folder makes the package invisible to the ROS 2 ecosystem even after a successful colcon build!",code:`# An empty marker file placed inside the resource/ directory.
# Filename MUST match the package name exactly:
# resource/nexus_amr_controller

# When built, colcon installs this file into:
# install/share/ament_index/resource_index/packages/nexus_amr_controller
# This allows ROS 2 CLI commands to discover the package instantly!`,codeLang:"bash"},{id:"module_dir",name:"nexus_amr_controller/",path:"nexus_amr_controller/nexus_amr_controller/",title:"Python Package Module & Node Scripts",badge:"Node Code",badgeColor:"#0ea5e9",badgeBg:"rgba(14, 165, 233, 0.12)",borderAccent:"#0ea5e9",icon:ja,summary:"The importable Python module containing __init__.py and your custom ROS 2 Node classes.",purpose:"Where the actual robotics behavior, publisher callbacks, and subscriber logic are implemented.",commonPitfall:"Forgetting __init__.py prevents Python from recognizing this folder as a module, breaking module imports.",code:`import rclpy
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
    main()`,codeLang:"python"}],j=N.find(p=>p.id===a)||N[0],l=[{num:1,targetFile:"resource",title:"1. Ament Index Query",desc:"ros2 run queries resource_index/packages to verify nexus_amr_controller is installed."},{num:2,targetFile:"setup_cfg",title:"2. Path Resolution via setup.cfg",desc:"Checks setup.cfg to locate the package executable prefix in install/lib/nexus_amr_controller/."},{num:3,targetFile:"setup_py",title:"3. Entry Point Mapping in setup.py",desc:'Matches "motor_driver" to nexus_amr_controller.motor_driver:main in console_scripts.'},{num:4,targetFile:"module_dir",title:"4. Module Execution in Python",desc:"Imports MotorDriverNode, initializes rclpy, spins the node, and connects to the ROS graph!"}];return e.jsxs("div",{className:"package-structure-infographic",style:{background:"var(--bg-surface)",border:"1px solid var(--border-color)",borderRadius:"16px",padding:"0.85rem 1.15rem",margin:"0",boxShadow:"0 8px 30px rgba(0, 0, 0, 0.15)",position:"relative",overflow:"hidden"},children:[e.jsxs("div",{style:{display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:"12px",marginBottom:"0.75rem",paddingBottom:"0.65rem",borderBottom:"1px solid var(--border-color)"},children:[e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"12px"},children:[e.jsx("div",{style:{width:36,height:36,borderRadius:"10px",background:"linear-gradient(135deg, rgba(245, 158, 11, 0.2) 0%, rgba(56, 189, 248, 0.15) 100%)",border:"1px solid rgba(245, 158, 11, 0.35)",display:"flex",alignItems:"center",justifyContent:"center",color:"#f59e0b"},children:e.jsx(gs,{size:18})}),e.jsxs("div",{children:[e.jsxs("h3",{style:{margin:0,fontSize:"1.1rem",fontWeight:800,color:"var(--text-primary)"},children:["Anatomy of an ",e.jsx("code",{style:{color:"#38bdf8"},children:"ament_python"})," Package"]}),e.jsx("span",{style:{fontSize:"0.8rem",color:"var(--text-secondary)"},children:"The 5 essential components that transform a directory into a functional ROS 2 package"})]})]}),e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"8px"},children:[e.jsxs("button",{onClick:I,style:{display:"flex",alignItems:"center",gap:"6px",background:i>0?"linear-gradient(135deg, #0284c7 0%, #0369a1 100%)":"var(--bg-card, #0f172a)",color:i>0?"#ffffff":"var(--text-primary)",border:i>0?"1px solid #38bdf8":"1px solid var(--border-color)",borderRadius:"8px",padding:"5px 11px",fontSize:"0.78rem",fontWeight:700,cursor:"pointer",boxShadow:i>0?"0 2px 8px rgba(2, 132, 199, 0.35)":"none",transition:"all 0.2s"},children:[e.jsx(be,{size:12,fill:i>0?"currentColor":"none"}),e.jsx("span",{children:i===0?"Trace ros2 run Execution":`Execution Step ${i}/4 (Next &rarr;)`})]}),i>0&&e.jsx("button",{onClick:()=>u(0),title:"Reset Trace",style:{display:"flex",alignItems:"center",justifyContent:"center",width:30,height:30,background:"var(--bg-primary)",color:"var(--text-secondary)",border:"1px solid var(--border-color)",borderRadius:"8px",cursor:"pointer"},children:e.jsx(K,{size:12})})]})]}),i>0&&e.jsxs("div",{style:{background:"rgba(2, 132, 199, 0.1)",border:"1px solid rgba(56, 189, 248, 0.4)",borderRadius:"10px",padding:"0.85rem 1.25rem",marginBottom:"1.5rem",display:"flex",alignItems:"center",gap:"12px"},children:[e.jsx(te,{size:20,color:"#38bdf8",style:{flexShrink:0}}),e.jsxs("div",{children:[e.jsxs("div",{style:{fontSize:"0.85rem",fontWeight:800,color:"#38bdf8",marginBottom:"2px"},children:[l[i-1].title,": ",e.jsx("code",{style:{color:"#ffffff"},children:"ros2 run nexus_amr_controller motor_driver"})]}),e.jsx("div",{style:{fontSize:"0.8rem",color:"var(--text-secondary)"},children:l[i-1].desc})]})]}),e.jsxs("div",{style:{display:"grid",gridTemplateColumns:"minmax(280px, 1fr) minmax(360px, 1.4fr)",gap:"1.5rem",alignItems:"start"},children:[e.jsxs("div",{style:{background:"var(--bg-primary)",border:"1px solid var(--border-color)",borderRadius:"12px",padding:"1.25rem"},children:[e.jsxs("div",{style:{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:"1rem",paddingBottom:"0.5rem",borderBottom:"1px solid var(--border-color)"},children:[e.jsx("span",{style:{fontSize:"0.74rem",fontWeight:800,textTransform:"uppercase",letterSpacing:"0.05em",color:"#64748b"},children:"Package Hierarchy"}),e.jsx("span",{style:{fontSize:"0.72rem",color:"var(--text-muted)"},children:"Click to inspect"})]}),e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"8px",marginBottom:"0.75rem",paddingLeft:"4px"},children:[e.jsx(gs,{size:16,color:"#38bdf8"}),e.jsx("strong",{style:{fontSize:"0.95rem",color:"var(--text-primary)",fontFamily:"monospace"},children:"nexus_amr_controller/"})]}),e.jsx("div",{style:{display:"flex",flexDirection:"column",gap:"4px"},children:N.map(p=>{const n=a===p.id,o=i>0&&l[i-1].targetFile===p.id,m=p.icon;return e.jsxs("div",{onClick:()=>s(p.id),style:{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"6px 10px",borderRadius:"8px",background:n?"rgba(56, 189, 248, 0.1)":o?"rgba(245, 158, 11, 0.15)":"transparent",border:n?"1px solid #38bdf8":o?"1px solid #f59e0b":"1px solid transparent",cursor:"pointer",transition:"all 0.2s",position:"relative"},children:[e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"8px"},children:[e.jsx(m,{size:14,color:n?p.borderAccent:"var(--text-muted)"}),e.jsx("span",{style:{fontFamily:"monospace",fontSize:"0.82rem",fontWeight:n?700:500,color:n?p.borderAccent:"var(--text-primary)"},children:p.name})]}),e.jsx("span",{style:{fontSize:"0.64rem",fontWeight:700,padding:"2px 5px",borderRadius:"4px",background:p.badgeBg,color:p.badgeColor},children:p.badge})]},p.id)})}),e.jsxs("div",{style:{marginTop:"0.65rem",padding:"7px 10px",borderRadius:"8px",background:"var(--bg-canvas, rgba(16, 185, 129, 0.08))",border:"1px solid var(--border-color)",fontSize:"0.76rem",color:"var(--text-primary)",lineHeight:1.4},children:[e.jsx("strong",{style:{color:"#10b981"},children:"The Minimum Package Requirement:"}),e.jsx("br",{}),e.jsxs("span",{style:{color:"var(--text-secondary)"},children:["A ROS 2 Python package requires at least a ",e.jsx("code",{style:{color:"#f59e0b",fontWeight:600},children:"package.xml"})," and a ",e.jsx("code",{style:{color:"#38bdf8",fontWeight:600},children:"setup.py"})," file to be buildable by colcon."]})]})]}),e.jsxs("div",{style:{background:"#090d16",border:"1px solid var(--border-color)",borderRadius:"12px",overflow:"hidden"},children:[e.jsxs("div",{style:{padding:"0.65rem 1rem",background:"rgba(15, 23, 42, 0.8)",borderBottom:"1px solid var(--border-color)",display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:"8px"},children:[e.jsx("div",{style:{display:"flex",alignItems:"center",gap:"8px"},children:e.jsx("span",{style:{fontFamily:"monospace",fontSize:"0.84rem",fontWeight:800,color:j.borderAccent},children:j.path})}),e.jsxs("button",{onClick:()=>w(j.code,j.id),style:{display:"flex",alignItems:"center",gap:"4px",background:"rgba(255, 255, 255, 0.08)",border:"1px solid rgba(255, 255, 255, 0.15)",borderRadius:"6px",padding:"3px 7px",fontSize:"0.7rem",color:g===j.id?"#10b981":"#cbd5e1",cursor:"pointer"},children:[g===j.id?e.jsx(Se,{size:12}):e.jsx(Xe,{size:12}),e.jsx("span",{children:g===j.id?"Copied":"Copy Code"})]})]}),e.jsxs("div",{style:{padding:"0.65rem 1rem",borderBottom:"1px solid rgba(255, 255, 255, 0.08)",background:"rgba(15, 23, 42, 0.6)"},children:[e.jsx("div",{style:{fontSize:"0.88rem",fontWeight:700,color:"#f8fafc",marginBottom:"3px"},children:j.title}),e.jsx("div",{style:{fontSize:"0.78rem",color:"#cbd5e1",marginBottom:"6px",lineHeight:1.45},children:j.purpose}),e.jsxs("div",{style:{display:"flex",alignItems:"start",gap:"6px",padding:"6px 8px",borderRadius:"6px",background:"rgba(239, 68, 68, 0.12)",border:"1px solid rgba(239, 68, 68, 0.35)",fontSize:"0.74rem",color:"#fecaca",lineHeight:1.4},children:[e.jsx(vt,{size:14,color:"#ef4444",style:{flexShrink:0,marginTop:"2px"}}),e.jsxs("div",{children:[e.jsx("strong",{style:{color:"#f87171"},children:"Common Pitfall:"})," ",j.commonPitfall]})]})]}),e.jsx("div",{style:{padding:"0.75rem 1rem",overflowX:"auto",maxHeight:"185px"},children:e.jsx("pre",{style:{margin:0,fontFamily:'"JetBrains Mono", "Fira Code", monospace',fontSize:"0.78rem",lineHeight:1.6,color:"#e2e8f0"},children:e.jsx("code",{children:j.code})})})]})]})]})}const ni="modulepreload",oi=function(a,s){return new URL(a,s).href},xs={},_s=function(s,i,u){let g=Promise.resolve();if(i&&i.length>0){let w=function(l){return Promise.all(l.map(p=>Promise.resolve(p).then(n=>({status:"fulfilled",value:n}),n=>({status:"rejected",reason:n}))))};const I=document.getElementsByTagName("link"),N=document.querySelector("meta[property=csp-nonce]"),j=(N==null?void 0:N.nonce)||(N==null?void 0:N.getAttribute("nonce"));g=w(i.map(l=>{if(l=oi(l,u),l in xs)return;xs[l]=!0;const p=l.endsWith(".css"),n=p?'[rel="stylesheet"]':"";if(!!u)for(let x=I.length-1;x>=0;x--){const S=I[x];if(S.href===l&&(!p||S.rel==="stylesheet"))return}else if(document.querySelector(`link[href="${l}"]${n}`))return;const m=document.createElement("link");if(m.rel=p?"stylesheet":ni,p||(m.as="script"),m.crossOrigin="",m.href=l,j&&m.setAttribute("nonce",j),document.head.appendChild(m),p)return new Promise((x,S)=>{m.addEventListener("load",x),m.addEventListener("error",()=>S(new Error(`Unable to preload CSS for ${l}`)))})}))}function T(w){const I=new Event("vite:preloadError",{cancelable:!0});if(I.payload=w,window.dispatchEvent(I),!I.defaultPrevented)throw w}return g.then(w=>{for(const I of w||[])I.status==="rejected"&&T(I.reason);return s().catch(T)})},It={lesson_02:Je.lazy(()=>_s(()=>import("./Ros2ArchitectureInteractive-DRDijra3.js"),__vite__mapDeps([0,1,2]),import.meta.url).then(a=>({default:a.Ros2ArchitectureInteractive}))),lesson_03:Je.lazy(()=>_s(()=>import("./Lesson03-DG6mHp74.js"),__vite__mapDeps([3,1,2,4]),import.meta.url))};function Ws(){const[a,s]=c.useState(!0),[i,u]=c.useState(2),[g,T]=c.useState(1),[w,I]=c.useState(1),[N,j]=c.useState(1.82),[l,p]=c.useState(null),[n,o]=c.useState(!1),[m,x]=c.useState(!1),[S,z]=c.useState(!1),[R,h]=c.useState(null),[f,_]=c.useState(null),[y,v]=c.useState("default"),[b,r]=c.useState([{id:1,val:1.81,text:"1.81 m",isHazard:!1,speedSec:1.3}]),d=c.useRef(2),C=c.useRef(new Set([1])),P=c.useRef([]),A=c.useRef(.5),E=c.useRef(null),L=.5,F=c.useCallback(B=>{if(l!==null)return l;const J=2*Math.PI/10,Q=1.45+1.15*Math.sin(J*B);return Math.max(.2,parseFloat(Q.toFixed(2)))},[l]),$=c.useCallback(B=>{C.current.has(B.id)||(C.current.add(B.id),j(B.val),I(J=>J+1),x(!0),z(!0),setTimeout(()=>x(!1),280),setTimeout(()=>z(!1),380),r(J=>J.filter(Q=>Q.id!==B.id)))},[]),M=c.useCallback((B=null)=>{const J=d.current++,Q=performance.now();if(E.current!==null&&a){const ae=Math.max(0,Math.min((Q-E.current)/1e3,3));A.current+=ae,E.current=Q}else A.current+=1/i,a&&(E.current=Q);const Ge=B!==null?B:F(A.current),yt=Ge<L,We=`${Ge.toFixed(2)} m`,tt=1.3;T(J),o(!0),setTimeout(()=>o(!1),180);const st={id:J,val:Ge,text:We,isHazard:yt,speedSec:tt};r(ae=>[...ae,st]);const Be=setTimeout(()=>{$(st)},tt*1e3);P.current.push(Be)},[a,i,F,$]),k=()=>{M()},D=()=>{p(.35),M(.35)},W=()=>{p(2.1),M(2.1)},G=()=>{P.current.forEach(clearTimeout),P.current=[],C.current=new Set([1]),d.current=2,A.current=.5,E.current=null,T(1),I(1),j(1.81),p(null),r([{id:1,val:1.81,text:"1.81 m",isHazard:!1,speedSec:1.3}]),s(!1),h(null),_(null)};c.useEffect(()=>{a?E.current=performance.now():E.current=null},[a]),c.useEffect(()=>{if(!a||R!==null)return;E.current=performance.now();const B=Math.max(100,Math.round(1e3/i)),J=setInterval(()=>{M()},B);return()=>clearInterval(J)},[a,i,R,M]),c.useEffect(()=>()=>{P.current.forEach(clearTimeout)},[]);const O=N<L,V=Math.min(100,Math.max(5,N/3*100)),se=[{num:1,title:"1. Ultrasonic Sensor Publisher Node",desc:"Node inherits from rclpy.node.Node and calls self.create_publisher(Float32, '/sensor/ultrasonic_front', 10). A non-blocking wall timer periodically reads hardware and broadcasts distance telemetry.",target:"pub"},{num:2,title:"2. The Sensor Topic Bus & DDS Layer",desc:"Topic '/sensor/ultrasonic_front' acts as an anonymous, strongly-typed range bus. Underneath, DDS middleware handles peer discovery and transport contracts without hardcoding IP addresses.",target:"topic"},{num:3,title:"3. Collision Safety Supervisor & Callback",desc:"Node creates a subscription with self.create_subscription(Float32, '/sensor/ultrasonic_front', callback, 10). The executor immediately runs the callback to evaluate obstacle distance against the 0.50m threshold.",target:"sub"},{num:4,title:"4. Live Telemetry & Active Collision Avoidance",desc:"Distance telemetry streams continuously across nodes. If an obstacle breaches the 0.50m buffer, the safety monitor immediately detects the hazard and triggers simulated emergency braking.",target:"all"}];return e.jsxs("div",{className:"pubsub-flow-container",children:[e.jsxs("div",{className:"pubsub-flow-header",children:[e.jsxs("div",{className:"header-title-row",children:[e.jsxs("div",{className:"badge-pill",children:[e.jsx(ye,{size:14,className:"text-cyan animate-pulse"}),e.jsx("span",{children:"Interactive Architecture & Data Flow"})]}),e.jsx("span",{className:"ros-version-tag",children:"ROS 2 Jazzy · DDS Architecture"})]}),e.jsxs("p",{className:"pubsub-flow-subtitle",children:["Observe how the Ultrasonic Rangefinder and Collision Safety Supervisor exchange real-time distance telemetry across the ",e.jsx("code",{className:"inline-code",children:"/sensor/ultrasonic_front"})," topic."]})]}),e.jsxs("div",{className:"walkthrough-bar",children:[e.jsxs("span",{className:"walkthrough-label",children:[e.jsx(Te,{size:14})," Guided Reveal:"]}),e.jsxs("div",{className:"walkthrough-buttons",children:[e.jsx("button",{className:`walkthrough-step-btn ${R===null?"active":""}`,onClick:()=>{h(null),_(null),s(!0)},children:"All Live"}),se.map(B=>e.jsxs("button",{className:`walkthrough-step-btn ${R===B.num?"active":""}`,onClick:()=>{h(B.num),_(B.target==="all"?null:B.target),s(B.num===4)},children:["Step ",B.num]},B.num))]})]}),R!==null&&e.jsxs("div",{className:"active-step-banner animate-fade-in",children:[e.jsxs("div",{className:"banner-badge",children:["Step ",R," of 4"]}),e.jsxs("div",{className:"banner-content",children:[e.jsx("h4",{children:se[R-1].title}),e.jsx("p",{children:se[R-1].desc})]})]}),e.jsxs("div",{className:"diagram-stage",children:[e.jsxs("div",{className:`diagram-card publisher-card ${n?"pulse-border":""} ${f==="pub"||R===1||R===4||R===null?"focused":"dimmed"}`,onClick:()=>_("pub"),children:[e.jsxs("div",{className:"card-top",children:[e.jsx("div",{className:"node-icon-wrapper pub-icon",children:e.jsx(je,{size:18})}),e.jsxs("div",{className:"node-title-group",children:[e.jsx("div",{className:"node-role-tag",children:"PUBLISHER NODE"}),e.jsx("h3",{className:"node-name",title:"ultrasonic_sensor_node",children:"ultrasonic_sensor_node"}),e.jsx("div",{className:"node-class",children:"UltrasonicSensorPublisher"})]}),e.jsx("div",{className:`status-dot ${a?"online":"paused"}`,title:a?"Publishing Active":"Paused"})]}),e.jsxs("div",{className:"card-code-snip",children:[e.jsx("span",{className:"code-fn",children:"create_publisher"}),e.jsx("span",{className:"code-args",children:"(Float32, '/sensor/ultrasonic_front', 10)"})]}),e.jsxs("div",{className:"card-telemetry pub-telemetry",children:[e.jsxs("div",{className:"telemetry-item",children:[e.jsx("span",{className:"telemetry-label",children:"Rate"}),e.jsxs("span",{className:"telemetry-val text-cyan",children:[i," Hz"]})]}),e.jsxs("div",{className:"telemetry-item",children:[e.jsx("span",{className:"telemetry-label",children:"Sent"}),e.jsxs("span",{className:"telemetry-val text-amber",children:["#",g]})]}),e.jsxs("div",{className:"telemetry-item cb-telemetry-item",children:[e.jsx("span",{className:"telemetry-label",children:"Callback"}),e.jsx("span",{className:"telemetry-val text-green cb-name",title:"timer_callback",children:"timer_cb"})]})]}),e.jsxs("button",{className:"card-action-btn",onClick:B=>{B.stopPropagation(),k()},title:"Publish one distance measurement immediately",children:[e.jsx(ve,{size:13}),e.jsx("span",{children:"Publish 1 Measurement"})]})]}),e.jsxs("div",{className:`diagram-pipeline ${f==="topic"||f==="dds"||R===2||R===4||R===null?"focused":"dimmed"}`,onClick:()=>_("topic"),children:[e.jsxs("div",{className:"topic-badge",children:[e.jsx(ye,{size:14,className:"text-cyan animate-pulse"}),e.jsxs("span",{className:"topic-name",children:["Topic: ",e.jsx("strong",{children:"/sensor/ultrasonic_front"})]}),e.jsx("span",{className:"topic-type",children:"Float32"})]}),e.jsxs("div",{className:"pipe-svg-wrapper",children:[e.jsxs("svg",{viewBox:"0 0 360 48",className:"pipe-svg",preserveAspectRatio:"none",children:[e.jsxs("defs",{children:[e.jsxs("linearGradient",{id:"pipeGrad",x1:"0%",y1:"0%",x2:"100%",y2:"0%",children:[e.jsx("stop",{offset:"0%",stopColor:"#38bdf8",stopOpacity:"0.8"}),e.jsx("stop",{offset:"50%",stopColor:"#a855f7",stopOpacity:"0.9"}),e.jsx("stop",{offset:"100%",stopColor:"#22c55e",stopOpacity:"0.8"})]}),e.jsxs("filter",{id:"glow",x:"-20%",y:"-20%",width:"140%",height:"140%",children:[e.jsx("feGaussianBlur",{stdDeviation:"3",result:"blur"}),e.jsx("feComposite",{in:"SourceGraphic",in2:"blur",operator:"over"})]})]}),e.jsx("line",{x1:"10",y1:"24",x2:"350",y2:"24",stroke:"#1e293b",strokeWidth:"6",strokeLinecap:"round"}),e.jsx("line",{x1:"10",y1:"24",x2:"350",y2:"24",stroke:"url(#pipeGrad)",strokeWidth:"3.5",strokeDasharray:"8 8",strokeLinecap:"round",className:`pipeline-dash ${a?"flowing":""}`}),e.jsx("polygon",{points:"346,18 358,24 346,30",fill:"#22c55e"})]}),e.jsx("div",{className:`packet-track ${a?"":"paused"}`,children:b.map(B=>e.jsx("div",{className:`sliding-packet ${a?"":"paused"}`,style:{animationDuration:`${B.speedSec||1.3}s`},onAnimationEnd:()=>$(B),children:e.jsxs("span",{className:`packet-pill ${B.isHazard?"hazard-packet":""}`,children:[e.jsx(et,{size:11,className:"packet-spark"}),e.jsx("span",{children:B.text})]})},B.id))})]}),e.jsxs("div",{className:"dds-layer-box",onClick:B=>{B.stopPropagation(),_("dds")},children:[e.jsxs("div",{className:"dds-title-row",children:[e.jsx("span",{className:"dds-title",children:"DDS Layer"}),e.jsxs("span",{className:"qos-badge",children:[e.jsx(Es,{size:12})," QoS: ",y==="default"?"RELIABLE":"BEST_EFFORT"]})]}),e.jsxs("div",{className:"dds-metrics",children:[e.jsx("span",{children:"Depth: 10"}),e.jsx("span",{children:"·"}),e.jsx("span",{children:"RTPS Multicast"}),e.jsx("span",{children:"·"}),e.jsx("span",{children:"CycloneDDS"})]})]})]}),e.jsxs("div",{className:`diagram-card subscriber-card ${O?"hazard-active-card":""} ${m?O?"pulse-border-hazard":"pulse-border-green":""} ${f==="sub"||R===3||R===4||R===null?"focused":"dimmed"}`,onClick:()=>_("sub"),children:[e.jsxs("div",{className:"card-top",children:[e.jsx("div",{className:`node-icon-wrapper ${O?"hazard-icon":"sub-icon"}`,children:O?e.jsx(vt,{size:18,className:"text-red animate-bounce"}):e.jsx(ze,{size:18})}),e.jsxs("div",{className:"node-title-group",children:[e.jsx("div",{className:"node-role-tag",children:"SUBSCRIBER NODE"}),e.jsx("h3",{className:"node-name",title:"collision_monitor_node",children:"collision_monitor_node"}),e.jsx("div",{className:"node-class",children:"CollisionSafetySubscriber"})]}),e.jsx("div",{className:`status-dot ${O?"alert":a?"online":"paused"}`,title:O?"EMERGENCY BRAKE ACTIVE":"Monitoring Active"})]}),e.jsxs("div",{className:"card-code-snip sub-snip",children:[e.jsx("span",{className:"code-fn",children:"create_subscription"}),e.jsx("span",{className:"code-args",children:"(Float32, '/sensor/ultrasonic_front', cb, 10)"})]}),e.jsxs("div",{className:"card-telemetry sub-telemetry",children:[e.jsxs("div",{className:"telemetry-item",children:[e.jsx("span",{className:"telemetry-label",children:"Recv"}),e.jsxs("span",{className:"telemetry-val text-amber",children:["#",w]})]}),e.jsxs("div",{className:"telemetry-item",children:[e.jsx("span",{className:"telemetry-label",children:"Range"}),e.jsxs("span",{className:`telemetry-val ${O?"text-red font-bold":"text-cyan"}`,children:[N.toFixed(2)," m"]})]}),e.jsxs("div",{className:"telemetry-item cb-telemetry-item",children:[e.jsx("span",{className:"telemetry-label",children:"Action"}),e.jsx("span",{className:`telemetry-val cb-name ${O?"text-red font-bold animate-pulse":"text-green"}`,children:O?"🛑 BRAKE":"🟢 CLEAR"})]})]}),e.jsxs("div",{className:"proximity-gauge-wrap",children:[e.jsxs("div",{className:"gauge-labels",children:[e.jsxs("span",{children:["Proximity: ",e.jsxs("strong",{children:[N.toFixed(2),"m"]})]}),e.jsxs("span",{className:"threshold-tag",children:["Threshold: ",L.toFixed(2),"m"]})]}),e.jsxs("div",{className:"gauge-track",children:[e.jsx("div",{className:"gauge-threshold-line",title:"0.50m Safety Threshold"}),e.jsx("div",{className:`gauge-fill ${O?"hazard":"safe"}`,style:{width:`${V}%`}})]})]}),e.jsxs("div",{className:"card-terminal-log",children:[e.jsxs("div",{className:"log-header",children:[e.jsx(Me,{size:12,className:O?"text-red animate-pulse":"text-green"}),e.jsx("span",{children:"Safety Supervisory Telemetry"})]}),e.jsxs("div",{className:`log-content-wrap ${O?"hazard-alert":""} ${S?"pulse-log":""}`,children:[e.jsx("span",{className:`log-level-pill ${O?"log-level-error":""}`,children:O?"[WARN]":"[INFO]"}),e.jsx("span",{className:`log-text ${O?"hazard-text":""}`,children:O?`[distance_callback] Obstacle at ${N.toFixed(2)}m < 0.50m! Commanded EMERGENCY STOP (/cmd_vel -> 0.0)`:`[distance_callback] Clearance: ${N.toFixed(2)}m (> 0.50m threshold). Path clear, cruising.`})]})]})]})]}),e.jsxs("div",{className:"pubsub-controls-bar",children:[e.jsxs("div",{className:"controls-left",children:[e.jsxs("button",{className:`control-btn play-btn ${a?"active-playing":""}`,onClick:()=>s(!a),title:a?"Pause stream":"Start stream",children:[a?e.jsx(we,{size:15}):e.jsx(be,{size:15}),e.jsx("span",{children:a?"Pause Stream":"Play Stream"})]}),e.jsxs("button",{className:"control-btn",onClick:k,title:"Step one message",children:[e.jsx(ve,{size:15}),e.jsx("span",{children:"Step (1 Msg)"})]}),e.jsxs("button",{className:"control-btn",onClick:G,title:"Reset simulation counter",children:[e.jsx(K,{size:15}),e.jsx("span",{children:"Reset"})]}),e.jsxs("button",{className:"sensor-quick-btn hazard",onClick:D,title:"Inject an obstacle below the 0.50m safety threshold to trigger emergency stop",children:[e.jsx(vt,{size:13}),e.jsx("span",{children:"Simulate Obstacle (0.35m)"})]}),e.jsxs("button",{className:"sensor-quick-btn safe",onClick:W,title:"Simulate a clear pathway at 2.10m",children:[e.jsx(Se,{size:13}),e.jsx("span",{children:"Clear Path (2.10m)"})]}),l!==null&&e.jsxs("button",{className:"sensor-quick-btn auto",onClick:()=>{p(null),E.current=performance.now()},title:"Resume automatic sinusoidal obstacle oscillation at constant physical speed",children:[e.jsx(K,{size:13}),e.jsx("span",{children:"Resume Auto Wave"})]})]}),e.jsxs("div",{className:"controls-right",children:[e.jsxs("div",{className:"rate-slider-group",children:[e.jsx(Ze,{size:14,className:"text-muted"}),e.jsxs("label",{className:"slider-label",title:"Publisher timer frequency: controls how many messages are published per second across DDS. The physical obstacle oscillates at a constant real-time speed.",children:["Timer Rate: ",e.jsxs("strong",{children:[i," Hz"]})," ",e.jsxs("span",{className:"rate-subtext",children:["(",i," msg/s)"]})]}),e.jsx("input",{type:"range",min:"0.5",max:"4",step:"0.5",value:i,onChange:B=>u(parseFloat(B.target.value)),className:"pubsub-slider"})]}),e.jsxs("div",{className:"qos-toggle-group",children:[e.jsx("span",{className:"qos-label",children:"QoS Policy:"}),e.jsx("button",{className:`qos-choice-btn ${y==="default"?"active":""}`,onClick:()=>v("default"),children:"Reliable"}),e.jsx("button",{className:`qos-choice-btn ${y==="sensor_data"?"active":""}`,onClick:()=>v("sensor_data"),children:"Best Effort"})]})]})]}),f&&e.jsxs("div",{className:"pubsub-inspector animate-fade-in",children:[e.jsxs("div",{className:"inspector-header",children:[e.jsxs("div",{className:"inspector-title",children:[e.jsx(Ut,{size:16,className:"text-cyan"}),e.jsxs("span",{children:[f==="pub"&&"Inspecting: Publisher Node (ultrasonic_sensor_node)",f==="topic"&&"Inspecting: Topic Bus (/sensor/ultrasonic_front)",f==="dds"&&"Inspecting: DDS Middleware & QoS Transport",f==="sub"&&"Inspecting: Subscriber Node (collision_monitor_node)"]})]}),e.jsx("button",{className:"inspector-close",onClick:()=>_(null),children:"✕"})]}),e.jsxs("div",{className:"inspector-body",children:[f==="pub"&&e.jsxs("div",{className:"inspector-grid",children:[e.jsxs("div",{children:[e.jsx("strong",{children:"Role:"})," Data Originator / Sensor Publisher.",e.jsxs("p",{children:["Calls ",e.jsx("code",{className:"inline-code",children:"self.create_publisher(Float32, '/sensor/ultrasonic_front', 10)"}),". The node publishes sensor telemetry anonymously without needing to know which subscriber nodes are listening."]})]}),e.jsxs("div",{className:"cli-hint",children:[e.jsx("strong",{children:"CLI Inspection Command:"}),e.jsx("code",{children:"ros2 node info /ultrasonic_sensor_node"})]})]}),f==="topic"&&e.jsxs("div",{className:"inspector-grid",children:[e.jsxs("div",{children:[e.jsx("strong",{children:"Role:"})," Decoupled Named Message Bus.",e.jsxs("p",{children:["In ROS 2, topics are strictly typed (",e.jsx("code",{className:"inline-code",children:"example_interfaces/msg/Float32"}),"). Any publisher sending mismatched types is rejected by DDS compile-time and runtime checks."]})]}),e.jsxs("div",{className:"cli-hint",children:[e.jsx("strong",{children:"CLI Inspection Commands:"}),e.jsx("code",{children:"ros2 topic list"}),e.jsx("code",{children:"ros2 topic info /sensor/ultrasonic_front"}),e.jsx("code",{children:"ros2 topic echo /sensor/ultrasonic_front"}),e.jsx("code",{children:"ros2 topic hz /sensor/ultrasonic_front"})]})]}),f==="dds"&&e.jsxs("div",{className:"inspector-grid",children:[e.jsxs("div",{children:[e.jsx("strong",{children:"Role:"})," Data Distribution Service (DDS / RTPS).",e.jsx("p",{children:"ROS 2 replaces ROS 1's custom master with industry-standard DDS (Object Management Group). Nodes automatically discover each other via multicast peer-to-peer handshakes without a central broker."})]}),e.jsxs("div",{className:"cli-hint",children:[e.jsx("strong",{children:"Active Profile:"}),e.jsx("code",{children:y==="default"?"Reliability: RELIABLE, Durability: VOLATILE, Depth: 10":"Reliability: BEST_EFFORT, Durability: VOLATILE, Depth: 5 (Sensor Data)"})]})]}),f==="sub"&&e.jsxs("div",{className:"inspector-grid",children:[e.jsxs("div",{children:[e.jsx("strong",{children:"Role:"})," Event-Driven Consumer & Safety Supervisor.",e.jsxs("p",{children:["Registers a callback method with ",e.jsx("code",{className:"inline-code",children:"self.create_subscription(Float32, '/sensor/ultrasonic_front', self.distance_callback, 10)"}),". The ROS 2 Executor sits in an event loop (",e.jsx("code",{className:"inline-code",children:"rclpy.spin()"}),") and calls the callback whenever new distance data lands in the queue."]}),e.jsxs("p",{style:{marginTop:"6px",color:"#94a3b8"},children:["Current Reaction: ",e.jsx("strong",{children:O?"🚨 COLLISION HAZARD (< 0.50m) -> EMERGENCY STOP ACTIVE":"✅ SAFE CLEARANCE (>= 0.50m) -> NORMAL MOTION"})]})]}),e.jsxs("div",{className:"cli-hint",children:[e.jsx("strong",{children:"CLI Verification:"}),e.jsx("code",{children:"ros2 node info /collision_monitor_node"}),e.jsx("code",{children:"ros2 topic echo /sensor/ultrasonic_front"})]})]})]})]})]})}function Bs(){const[a,s]=c.useState(!1),[i,u]=c.useState(1),[g,T]=c.useState("IDLE"),[w,I]=c.useState("LISTENING"),[N,j]=c.useState(!0),[l,p]=c.useState(null),[n,o]=c.useState("idle"),m=c.useRef(null),x=c.useRef([]),S=()=>{x.current.forEach(f=>clearTimeout(f)),x.current=[]},z=()=>{if(n!=="idle"&&n!=="completed")return;S(),u(_=>_+1),T("SENDING"),o("req_in_flight");const f=setTimeout(()=>{T("WAITING"),I("PROCESSING"),o("server_computing");const _=setTimeout(()=>{I("REPLYING"),j(v=>!v),o("res_in_flight");const y=setTimeout(()=>{T("RESOLVED"),I("LISTENING"),o("completed");const v=setTimeout(()=>{T("IDLE"),o("idle")},1500);x.current.push(v)},2400);x.current.push(y)},1600);x.current.push(_)},2400);x.current.push(f)},R=()=>{S(),m.current&&clearInterval(m.current),s(!1),p(null),u(1),T("IDLE"),I("LISTENING"),j(!0),o("idle")};c.useEffect(()=>(a&&l===null?m.current=setInterval(()=>{z()},8500):m.current&&clearInterval(m.current),()=>{m.current&&clearInterval(m.current)}),[a,l,n]),c.useEffect(()=>()=>S(),[]);const h=[{num:1,title:"1. Client Initiates Request (Client ➔ Server)",desc:"The Client node invokes client.call_async(SetBool.Request(data=True)). A blue request packet departs the Client and travels across the DDS bus. The Client creates a non-blocking Future object and waits.",target:"client"},{num:2,title:"2. DDS Direct 1-to-1 Point-to-Point Transport",desc:"Unlike Topics which broadcast anonymously to any number of subscribers, Services use point-to-point unicast addressing directly to the single server registered for '/amr/emergency_stop'.",target:"pipeline"},{num:3,title:"3. Server Executes Callback (cb_emergency_stop)",desc:"The Server receives (request, response). It executes hardware actuation (toggling physical motor brake relays) and assigns the response payload: response.success = True and response.message = 'Brakes Engaged'.",target:"server"},{num:4,title:"4. Response Returned & Future Resolved (Server ➔ Client)",desc:"The Server dispatches the green response packet back to the Client. When the Client receives the response, its Future is marked resolved and triggers the done_callback.",target:"all"}];return e.jsxs("div",{className:"pubsub-flow-container",children:[e.jsxs("div",{className:"pubsub-flow-header",children:[e.jsxs("div",{className:"header-title-row",children:[e.jsxs("div",{className:"badge-pill",children:[e.jsx(ye,{size:14,className:"text-cyan animate-pulse"}),e.jsx("span",{children:"Interactive Service Architecture: 2-Way Request ➔ Response (RPC)"})]}),e.jsx("span",{className:"ros-version-tag",children:"std_srvs/srv/SetBool · 1-to-1 Unicast"})]}),e.jsxs("p",{className:"pubsub-flow-subtitle",children:["Watch the slow-motion bidirectional packet flight: ",e.jsx("strong",{children:"Request"})," glides from Client to Server, the Server processes the callback, and the ",e.jsx("strong",{children:"Response"})," glides from Server back to Client."]})]}),e.jsxs("div",{className:"walkthrough-bar",children:[e.jsxs("span",{className:"walkthrough-label",children:[e.jsx(Te,{size:14})," Guided Reveal:"]}),e.jsxs("div",{className:"walkthrough-buttons",children:[e.jsx("button",{className:`walkthrough-step-btn ${l===null?"active":""}`,onClick:()=>{p(null),s(!1),o("idle")},children:"All Live"}),h.map(f=>e.jsxs("button",{className:`walkthrough-step-btn ${l===f.num?"active":""}`,onClick:()=>{p(f.num),s(!1)},children:["Step ",f.num]},f.num))]})]}),l!==null&&e.jsxs("div",{className:"active-step-banner animate-fade-in",children:[e.jsxs("div",{className:"banner-badge",children:["Step ",l," of 4"]}),e.jsxs("div",{className:"banner-content",children:[e.jsx("h4",{children:h[l-1].title}),e.jsx("p",{children:h[l-1].desc})]})]}),e.jsxs("div",{className:"diagram-stage",children:[e.jsxs("div",{className:`diagram-card client-card ${g==="SENDING"||g==="WAITING"?"pulse-border":""} ${l===1||l===4||l===null?"focused":"dimmed"}`,children:[e.jsxs("div",{className:"card-top",children:[e.jsx("div",{className:"node-icon-wrapper pub-icon",children:e.jsx(ze,{size:18})}),e.jsxs("div",{className:"node-title-group",children:[e.jsx("div",{className:"node-role-tag",children:"SERVICE CLIENT (Caller)"}),e.jsx("h3",{className:"node-name",title:"/teleop_safety_client",children:"teleop_safety_client"}),e.jsx("div",{className:"node-class",children:"EmergencyStopClient"})]}),e.jsx("div",{className:`status-dot ${g!=="IDLE"?"online":"paused"}`,title:g})]}),e.jsxs("div",{className:"card-code-snip",children:[e.jsx("span",{className:"code-fn",children:"future = client.call_async"}),e.jsx("span",{className:"code-args",children:"(SetBool.Request(data=True))"})]}),e.jsxs("div",{className:"card-telemetry pub-telemetry",children:[e.jsxs("div",{className:"telemetry-item",children:[e.jsx("span",{className:"telemetry-label",children:"Calls"}),e.jsxs("span",{className:"telemetry-val text-cyan",children:["#",i]})]}),e.jsxs("div",{className:"telemetry-item",children:[e.jsx("span",{className:"telemetry-label",children:"Client Future"}),e.jsx("span",{className:`telemetry-val ${g==="WAITING"?"text-amber animate-pulse":g==="RESOLVED"?"text-green":"text-muted"}`,children:g==="WAITING"?"⏳ PENDING":g==="RESOLVED"?"✅ RESOLVED":"IDLE"})]}),e.jsxs("div",{className:"telemetry-item cb-telemetry-item",children:[e.jsx("span",{className:"telemetry-label",children:"Callback"}),e.jsx("span",{className:"telemetry-val text-purple cb-name",children:"done_cb"})]})]}),e.jsxs("button",{className:"card-action-btn",onClick:z,disabled:n!=="idle"&&n!=="completed",title:"Dispatch 1 Service Request to Server",children:[e.jsx(ve,{size:13}),e.jsxs("span",{children:["Send Request (data=",N?"False":"True",")"]})]})]}),e.jsxs("div",{className:`diagram-pipeline ${l===2||l===4||l===null?"focused":"dimmed"}`,children:[e.jsxs("div",{className:"topic-badge",children:[e.jsx(ye,{size:14,className:"text-cyan animate-pulse"}),e.jsxs("span",{className:"topic-name",children:["Service Bus: ",e.jsx("strong",{children:"/amr/emergency_stop"})]}),e.jsx("span",{className:"topic-type",children:"SetBool.srv"})]}),e.jsxs("div",{className:"service-lane request-lane",children:[e.jsxs("div",{className:"lane-header-row",children:[e.jsxs("span",{className:"lane-dir-badge req-badge",children:[e.jsx(_e,{size:12})," 1. REQUEST (Client ➔ Server)"]}),e.jsxs("span",{className:"lane-payload-preview",children:["data: ",N?"False":"True"]})]}),e.jsxs("div",{className:"service-flight-track",children:[e.jsx("div",{className:"track-rail",children:e.jsx("div",{className:"flow-chevrons flow-right",children:"› › › › › › › › › › › › › › › › › › › ›"})}),n==="req_in_flight"&&e.jsx("div",{className:"sliding-service-packet slide-c2s",children:e.jsxs("span",{className:"service-packet-pill req-pill",children:[e.jsx(et,{size:11,className:"text-amber"}),e.jsxs("span",{children:["SetBool_Request(data=",N?"False":"True",")"]})]})})]})]}),e.jsx("div",{className:`service-execution-box ${n==="server_computing"?"active-processing":""}`,children:e.jsx("div",{className:"exec-box-content",children:n==="server_computing"?e.jsxs(e.Fragment,{children:[e.jsx(je,{size:16,className:"text-cyan animate-spin"}),e.jsxs("span",{className:"exec-text text-cyan",children:["Server Executing: ",e.jsx("code",{children:"cb_emergency_stop()"})," ➔ Toggling Motor Relays & Populating Response..."]})]}):n==="completed"?e.jsxs(e.Fragment,{children:[e.jsx(H,{size:16,className:"text-green"}),e.jsx("span",{className:"exec-text text-green",children:"RPC Completed Successfully · Response Delivered & Future Resolved"})]}):e.jsxs(e.Fragment,{children:[e.jsx(Es,{size:16,className:"text-muted"}),e.jsx("span",{className:"exec-text text-muted",children:"1-to-1 Bidirectional RPC Channel Ready · Awaiting Request"})]})})}),e.jsxs("div",{className:"service-lane response-lane",children:[e.jsxs("div",{className:"lane-header-row",children:[e.jsxs("span",{className:"lane-dir-badge res-badge",children:[e.jsx(Fe,{size:12})," 2. RESPONSE (Server ➔ Client)"]}),e.jsx("span",{className:"lane-payload-preview",children:"success: True"})]}),e.jsxs("div",{className:"service-flight-track",children:[e.jsx("div",{className:"track-rail",children:e.jsx("div",{className:"flow-chevrons flow-left",children:"‹ ‹ ‹ ‹ ‹ ‹ ‹ ‹ ‹ ‹ ‹ ‹ ‹ ‹ ‹ ‹ ‹ ‹ ‹ ‹"})}),n==="res_in_flight"&&e.jsx("div",{className:"sliding-service-packet slide-s2c",children:e.jsxs("span",{className:"service-packet-pill res-pill",children:[e.jsx(H,{size:11,className:"text-green"}),e.jsxs("span",{children:['SetBool_Response(success=True, msg="',N?"Brakes Engaged":"Motors Ready",'")']})]})})]})]}),e.jsxs("div",{className:"qos-badge-strip",children:[e.jsx("span",{className:"qos-chip",children:"Interface: std_srvs/srv/SetBool"}),e.jsx("span",{className:"qos-chip",children:"Type: 1-to-1 Unicast RPC"}),e.jsx("span",{className:"qos-chip",children:"Flight Speed: 2.4s (Readable Mode)"})]})]}),e.jsxs("div",{className:`diagram-card server-card ${w==="PROCESSING"?"pulse-border":""} ${l===3||l===4||l===null?"focused":"dimmed"}`,children:[e.jsxs("div",{className:"card-top",children:[e.jsx("div",{className:"node-icon-wrapper sub-icon",children:e.jsx(je,{size:18})}),e.jsxs("div",{className:"node-title-group",children:[e.jsx("div",{className:"node-role-tag",children:"SERVICE SERVER (Provider)"}),e.jsx("h3",{className:"node-name",title:"/emergency_stop_server",children:"emergency_stop_server"}),e.jsx("div",{className:"node-class",children:"EmergencyStopServer"})]}),e.jsx("div",{className:`status-dot ${w!=="LISTENING"?"online":"active"}`,title:w})]}),e.jsxs("div",{className:"card-code-snip",children:[e.jsx("span",{className:"code-fn",children:"def cb_emergency_stop"}),e.jsx("span",{className:"code-args",children:"(self, request, response):"})]}),e.jsxs("div",{className:"card-telemetry sub-telemetry",children:[e.jsxs("div",{className:"telemetry-item",children:[e.jsx("span",{className:"telemetry-label",children:"Hardware State"}),e.jsx("span",{className:"telemetry-val",style:{color:N?"#ef4444":"#10b981"},children:N?"🛑 ENGAGED":"⚡ ARMED"})]}),e.jsxs("div",{className:"telemetry-item",children:[e.jsx("span",{className:"telemetry-label",children:"Server State"}),e.jsx("span",{className:`telemetry-val ${w==="PROCESSING"?"text-amber animate-pulse":"text-green"}`,children:w})]}),e.jsxs("div",{className:"telemetry-item cb-telemetry-item",children:[e.jsx("span",{className:"telemetry-label",children:"Handler"}),e.jsx("span",{className:"telemetry-val text-cyan cb-name",children:"cb_e_stop"})]})]}),e.jsxs("div",{className:"card-terminal-log",children:[e.jsxs("div",{className:"log-header",children:[e.jsx(Me,{size:12,className:"text-green"}),e.jsx("span",{children:"Actuator Hardware Relay Status"})]}),e.jsxs("div",{className:"log-content-wrap",children:[e.jsx("span",{className:`log-level-pill ${N?"log-level-error":""}`,children:N?"[LOCKED]":"[ARMED]"}),e.jsx("span",{className:"log-text",children:N?"Brakes Locked (PWM 0%). AMR Stopped.":"Differential Drive Motors Enabled (PWM Active)."})]})]})]})]}),e.jsx("div",{className:"pubsub-controls-bar",style:{marginTop:"1.25rem"},children:e.jsxs("div",{className:"controls-left",children:[e.jsxs("button",{className:`control-btn play-btn ${a?"active-playing":""}`,onClick:()=>s(!a),title:a?"Pause auto RPC demonstration":"Start auto RPC demonstration",children:[a?e.jsx(we,{size:15}):e.jsx(be,{size:15}),e.jsx("span",{children:a?"Pause Auto Demo":"Auto Demo (Every 8s)"})]}),e.jsxs("button",{className:"control-btn",onClick:z,disabled:n!=="idle"&&n!=="completed",title:"Execute one isolated Request-Response transaction",children:[e.jsx(ve,{size:15}),e.jsx("span",{children:"Call Service (1 RPC)"})]}),e.jsxs("button",{className:"control-btn",onClick:R,title:"Reset simulation state",children:[e.jsx(K,{size:15}),e.jsx("span",{children:"Reset"})]})]})}),e.jsxs("div",{className:"service-concept-summary",children:[e.jsxs("div",{className:"concept-card",children:[e.jsx("div",{className:"concept-icon req-icon",children:e.jsx(ve,{size:16})}),e.jsxs("div",{className:"concept-text",children:[e.jsx("strong",{children:"1. Request & Client Future (Client ➔ Server)"}),e.jsxs("p",{children:["The client creates a Request and calls ",e.jsx("code",{className:"inline-code",children:"call_async()"}),". The packet dispatches to the server. The client holds a Future object and never freezes its main event loop."]})]})]}),e.jsxs("div",{className:"concept-card",children:[e.jsx("div",{className:"concept-icon srv-icon",children:e.jsx(je,{size:16})}),e.jsxs("div",{className:"concept-text",children:[e.jsx("strong",{children:"2. Server Callback Execution (Provider)"}),e.jsxs("p",{children:["The server receives ",e.jsx("code",{className:"inline-code",children:"(request, response)"}),", toggles hardware relays, and fills in ",e.jsx("code",{className:"inline-code",children:"response.success = True"})," before sending the response back."]})]})]}),e.jsxs("div",{className:"concept-card",children:[e.jsx("div",{className:"concept-icon res-icon",children:e.jsx(H,{size:16})}),e.jsxs("div",{className:"concept-text",children:[e.jsx("strong",{children:"3. Response Delivery (Server ➔ Client)"}),e.jsx("p",{children:"The response returns back to the calling client. The client's Future resolves, unlocking any dependent robot state machines or logging."})]})]})]})]})}function $s(){const[a,s]=c.useState("IDLE"),[i,u]=c.useState(0),[g,T]=c.useState(10),[w,I]=c.useState(10),[N,j]=c.useState(0),[l,p]=c.useState(null),[n,o]=c.useState([]),[m,x]=c.useState({distance_remaining:10,current_velocity:0,count:0}),[S,z]=c.useState(!1),R=c.useRef(null),h=c.useRef(null),f=c.useRef([]),_=c.useRef(1),y=c.useRef(10),v=()=>{R.current&&clearInterval(R.current),h.current&&clearInterval(h.current),f.current.forEach(A=>clearTimeout(A)),f.current=[]},b=()=>{if(a==="EXECUTING"||a==="SENDING_GOAL"||a==="SENDING_RESULT")return;v(),u(0),I(g),y.current=g,j(0),o([]),x({distance_remaining:g,current_velocity:0,count:0}),s("SENDING_GOAL");const A=setTimeout(()=>{s("GOAL_ACCEPTED");const E=setTimeout(()=>{s("EXECUTING")},700);f.current.push(E)},2e3);f.current.push(A)},r=()=>{if(a!=="EXECUTING")return;v(),o([]),s("SENDING_CANCEL");const A=setTimeout(()=>{s("CANCELED"),x(E=>({...E,current_velocity:0}))},1500);f.current.push(A)},d=()=>{v(),s("IDLE"),u(0),I(g),y.current=g,j(0),o([]),x({distance_remaining:g,current_velocity:0,count:0}),p(null)};c.useEffect(()=>{if(a!=="EXECUTING"){R.current&&clearInterval(R.current),h.current&&clearInterval(h.current);return}const A=g/1.4,E=60,F=100/(A*1e3/E);return R.current=setInterval(()=>{u($=>{const M=$+F;if(M>=100){clearInterval(R.current),clearInterval(h.current),I(0),y.current=0,o([]),s("SENDING_RESULT");const D=setTimeout(()=>{s("SUCCEEDED"),x(W=>({distance_remaining:0,current_velocity:0,count:W.count}))},2200);return f.current.push(D),100}const k=parseFloat((g*(1-M/100)).toFixed(1));return I(k),y.current=k,M})},E),h.current=setInterval(()=>{j(k=>k+1);const $=_.current++,M=y.current;o(k=>[...k.slice(-2),{id:$,dist:M.toFixed(1)}])},900),()=>{R.current&&clearInterval(R.current),h.current&&clearInterval(h.current)}},[a,g]),c.useEffect(()=>()=>v(),[]);const C=A=>{x({distance_remaining:parseFloat(A.dist),current_velocity:1.4,count:A.id}),z(!0),setTimeout(()=>z(!1),220),o(E=>E.filter(L=>L.id!==A.id))},P=[{num:1,title:"1. Goal Dispatch (Client ➔ Server)",desc:"The Action Client calls send_goal_async(NavigateDistance.Goal(target=10.0m)). The Goal request dispatches across the DDS network. The Server accepts the goal handle and returns UUID #0x82f1.",target:"goal"},{num:2,title:"2. Periodic Feedback Stream (Server ➔ Client)",desc:"While the AMR drives along the corridor, the Action Server streams feedback packets at 4 Hz. The Client's feedback_callback receives distance remaining and velocity asynchronously without blocking.",target:"feedback"},{num:3,title:"3. Preemption & Cancellation Request (Client ➔ Server)",desc:"If an emergency obstacle appears, the Client calls cancel_goal_async(). The Server immediately halts motor PWM, updates the goal state machine to STATUS_CANCELED, and stops navigation.",target:"cancel"},{num:4,title:"4. Final Result Resolution (Server ➔ Client)",desc:"Upon reaching 0.0m or completing cancellation, the Server sends the Result packet back. The Client's get_result_async() resolves with the terminal status (STATUS_SUCCEEDED or STATUS_CANCELED).",target:"result"}];return e.jsxs("div",{className:"pubsub-flow-container action-flow-root-container",children:[e.jsxs("div",{className:"pubsub-flow-header",children:[e.jsxs("div",{className:"header-title-row",children:[e.jsxs("div",{className:"badge-pill",children:[e.jsx(ye,{size:14,className:"text-cyan animate-pulse"}),e.jsx("span",{children:"Interactive 3-Tier Action Architecture: Goal ➔ Feedback ➔ Result"})]}),e.jsx("span",{className:"ros-version-tag",children:"nexus_amr_interfaces/action/NavigateDistance · Preemptible"})]}),e.jsx("p",{className:"pubsub-flow-subtitle",children:"ROS 2 Actions provide asynchronous, preemptible, long-running goal execution: The Action Client dispatches a Goal request, the Action Server publishes a continuous stream of real-time Feedback during execution, and returns the final Result when complete."})]}),e.jsxs("div",{className:"walkthrough-bar",children:[e.jsxs("span",{className:"walkthrough-label",children:[e.jsx(Te,{size:14})," Guided Reveal:"]}),e.jsxs("div",{className:"walkthrough-buttons",children:[e.jsx("button",{className:`walkthrough-step-btn ${l===null?"active":""}`,onClick:()=>{p(null)},children:"All Live"}),P.map(A=>e.jsxs("button",{className:`walkthrough-step-btn ${l===A.num?"active":""}`,onClick:()=>{p(A.num)},children:["Step ",A.num]},A.num))]})]}),l!==null&&e.jsxs("div",{className:"active-step-banner animate-fade-in",children:[e.jsxs("div",{className:"banner-badge",children:["Step ",l," of 4"]}),e.jsxs("div",{className:"banner-content",children:[e.jsx("h4",{children:P[l-1].title}),e.jsx("p",{children:P[l-1].desc})]})]}),e.jsxs("div",{className:"action-physical-runway-card",children:[e.jsxs("div",{className:"runway-header-row",children:[e.jsxs("div",{className:"runway-header-left",children:[e.jsxs("span",{className:"runway-badge",children:[e.jsx(Gt,{size:12}),e.jsx("span",{children:"Physical AMR Trajectory Corridor"})]}),e.jsx("span",{className:"runway-live-status font-mono",children:a==="EXECUTING"?`Driving at 1.40 m/s · ${(g*(i/100)).toFixed(1)}m of ${g}.0m traversed`:a==="GOAL_ACCEPTED"?"Goal Accepted · Initializing Motor Drive...":a==="SENDING_GOAL"?"Goal Dispatch In-Flight...":a==="SENDING_CANCEL"?"Preemption In-Flight · Decelerating Motors...":a==="SUCCEEDED"?`Goal Reached! Target Waypoint Reached: ${g}.0m`:a==="CANCELED"?"Preemption Accepted · Motors Safely Cut":`Standby at 0.0m · Awaiting Action Goal (${g}m)`})]}),e.jsx("div",{className:"runway-header-right font-mono",children:e.jsxs("span",{className:"runway-speed-tag",children:["Speed: ",e.jsx("strong",{children:a==="EXECUTING"?"1.40 m/s":"0.00 m/s"})]})})]}),e.jsxs("div",{className:"amr-full-runway-track",children:[e.jsx("div",{className:"runway-track-rail"}),e.jsx("div",{className:"runway-track-fill",style:{width:`${i}%`,background:a==="CANCELED"?"#ef4444":"linear-gradient(90deg, #0284c7, #10b981)"}}),e.jsxs("div",{className:"runway-destination-flag",title:`Target Waypoint: ${g}.0m`,children:[e.jsx(Sa,{size:14,className:a==="SUCCEEDED"?"text-emerald":"text-cyan"}),e.jsxs("span",{className:"flag-label",children:[g,"m"]})]}),e.jsx("div",{className:`runway-amr-marker ${a==="EXECUTING"?"driving":""}`,style:{left:`calc(${i}% - 14px)`},title:`AMR Position: ${(g*(i/100)).toFixed(1)}m`,children:e.jsx("div",{className:"amr-icon-box",children:e.jsx(Gt,{size:13,className:"amr-compass-icon"})})}),e.jsxs("div",{className:"runway-distance-ticks",children:[e.jsx("span",{children:"0m (Origin)"}),e.jsxs("span",{children:[(g*.25).toFixed(1),"m"]}),e.jsxs("span",{children:[(g*.5).toFixed(1),"m"]}),e.jsxs("span",{children:[(g*.75).toFixed(1),"m"]}),e.jsxs("span",{children:[g,".0m (Waypoint)"]})]})]})]}),e.jsxs("div",{className:"diagram-stage action-balanced-stage",children:[e.jsxs("div",{className:`diagram-card client-card action-node-card ${a==="EXECUTING"||a==="SENDING_GOAL"?"pulse-border":""} ${l===1||l===3||l===null?"focused":"dimmed"}`,children:[e.jsxs("div",{className:"card-top",children:[e.jsx("div",{className:"node-icon-wrapper pub-icon",children:e.jsx(Oe,{size:18})}),e.jsxs("div",{className:"node-title-group",children:[e.jsx("div",{className:"node-role-tag",children:"ACTION CLIENT (Caller)"}),e.jsx("h3",{className:"node-name action-node-title",title:"/patrol_action_client",children:"patrol_action_client"}),e.jsx("div",{className:"node-class",children:"NavigateDistanceClient"})]}),e.jsx("div",{className:`status-dot ${a==="EXECUTING"?"online":a==="CANCELED"?"error":"paused"}`,title:a})]}),e.jsxs("div",{className:"card-code-snip",children:[e.jsx("span",{className:"code-fn",children:"client.send_goal_async"}),e.jsxs("span",{className:"code-args",children:["(NavigateDistance.Goal(target=",g,"m))"]})]}),e.jsxs("div",{className:"card-telemetry pub-telemetry",children:[e.jsxs("div",{className:"telemetry-item",children:[e.jsx("span",{className:"telemetry-label",children:"Target"}),e.jsxs("span",{className:"telemetry-val text-cyan",children:[g,".0 m"]})]}),e.jsxs("div",{className:"telemetry-item",children:[e.jsx("span",{className:"telemetry-label",children:"Received"}),e.jsxs("span",{className:"telemetry-val text-amber",children:["#",m.count]})]}),e.jsxs("div",{className:"telemetry-item",children:[e.jsx("span",{className:"telemetry-label",children:"Goal Status"}),e.jsx("span",{className:"telemetry-val font-mono",style:{color:a==="SUCCEEDED"?"#10b981":a==="CANCELED"?"#ef4444":a==="EXECUTING"?"#38bdf8":a==="GOAL_ACCEPTED"?"#a855f7":a==="SENDING_GOAL"?"#38bdf8":a==="SENDING_CANCEL"?"#f59e0b":"var(--text-muted)",fontSize:"0.68rem"},children:a==="EXECUTING"?"STATUS_EXECUTING":a==="GOAL_ACCEPTED"||a==="SENDING_GOAL"?"STATUS_ACCEPTED":a==="SENDING_CANCEL"?"STATUS_CANCELING":a==="SUCCEEDED"?"STATUS_SUCCEEDED":a==="CANCELED"?"STATUS_CANCELED":"STATUS_UNKNOWN"})]})]}),e.jsxs("div",{className:`client-feedback-terminal ${S?"cb-flash":""}`,children:[e.jsxs("div",{className:"client-fb-header",children:[e.jsx(Me,{size:12,className:"text-emerald"}),e.jsx("span",{className:"font-mono",children:"def feedback_callback(self, msg):"}),S&&e.jsx("span",{className:"cb-live-tag",children:"LIVE MSG"})]}),e.jsxs("div",{className:"client-fb-grid",children:[e.jsxs("div",{className:"client-fb-stat",children:[e.jsx("span",{className:"fb-key",children:"dist_rem:"}),e.jsx("span",{className:"fb-val text-emerald font-mono",children:a==="EXECUTING"||a==="SUCCEEDED"||a==="CANCELED"?`${m.distance_remaining.toFixed(1)} m`:"--"})]}),e.jsxs("div",{className:"client-fb-stat",children:[e.jsx("span",{className:"fb-key",children:"velocity:"}),e.jsx("span",{className:"fb-val text-cyan font-mono",children:a==="EXECUTING"?"1.40 m/s":"0.00 m/s"})]}),e.jsxs("div",{className:"client-fb-stat",children:[e.jsx("span",{className:"fb-key",children:"traversed:"}),e.jsx("span",{className:"fb-val text-purple font-mono",children:a==="EXECUTING"||a==="SUCCEEDED"||a==="CANCELED"?`${Math.max(0,g-m.distance_remaining).toFixed(1)} m`:"0.0 m"})]})]})]}),e.jsx("div",{className:"client-card-action-wrap",children:a==="EXECUTING"?e.jsxs("button",{className:"card-action-btn cancel-action-btn",onClick:r,title:"Preempt and cancel ongoing goal immediately",children:[e.jsx(ut,{size:14}),e.jsx("span",{children:"Preempt Goal (Emergency Cancel)"})]}):e.jsxs("button",{className:"card-action-btn",onClick:b,disabled:a==="SENDING_GOAL"||a==="SENDING_RESULT",title:"Dispatch Action Goal to drive target distance",children:[e.jsx(ve,{size:14}),e.jsxs("span",{children:["Send Goal (",g,"m)"]})]})})]}),e.jsxs("div",{className:`diagram-pipeline action-pipeline-card ${l===2||l===4||l===null?"focused":"dimmed"}`,children:[e.jsxs("div",{className:"topic-badge",children:[e.jsx(ye,{size:14,className:"text-cyan animate-pulse"}),e.jsxs("span",{className:"topic-name",children:["Action Bus: ",e.jsx("strong",{children:"/navigate_distance"})]}),e.jsx("span",{className:"topic-type",children:"NavigateDistance.action"})]}),e.jsxs("div",{className:"action-channel-strip goal-channel",children:[e.jsxs("div",{className:"channel-header-row",children:[e.jsxs("span",{className:"channel-tag goal-tag",children:[e.jsx(_e,{size:11})," 1. GOAL SERVICE (Client ➔ Server)"]}),e.jsxs("span",{className:"channel-desc font-mono",children:["target: ",g,".0m"]})]}),e.jsxs("div",{className:"channel-wire",children:[e.jsx("div",{className:"wire-track",children:e.jsx("div",{className:"flow-chevrons flow-right",children:"› › › › › › › › › › › › › › › › › › › ›"})}),a==="SENDING_GOAL"&&e.jsx("div",{className:"sliding-action-packet slide-c2s",children:e.jsxs("span",{className:"action-packet-pill goal-pill",children:[e.jsx(et,{size:10}),e.jsxs("span",{children:["Goal: NavigateDistance(target=",g,"m)"]})]})}),a==="SENDING_CANCEL"&&e.jsx("div",{className:"sliding-action-packet slide-c2s",style:{animationDuration:"1.5s"},children:e.jsxs("span",{className:"action-packet-pill cancel-pill",children:[e.jsx(ut,{size:10}),e.jsx("span",{children:"CancelRequest(goal_id=0x82f1)"})]})}),a==="GOAL_ACCEPTED"&&e.jsxs("div",{className:"channel-accepted-badge animate-fade-in",children:[e.jsx(Se,{size:11})," Goal Accepted (UUID: #0x82f1)"]})]})]}),e.jsxs("div",{className:"action-channel-strip feedback-channel",children:[e.jsxs("div",{className:"channel-header-row",children:[e.jsxs("span",{className:"channel-tag feedback-tag",children:[e.jsx(Fe,{size:11})," 2. FEEDBACK STREAM (Server ➔ Client · 4 Hz)"]}),e.jsxs("span",{className:"channel-desc font-mono",children:["rem: ",w.toFixed(1),"m"]})]}),e.jsxs("div",{className:"channel-wire",children:[e.jsx("div",{className:"wire-track",children:e.jsx("div",{className:"flow-chevrons flow-left",children:"‹ ‹ ‹ ‹ ‹ ‹ ‹ ‹ ‹ ‹ ‹ ‹ ‹ ‹ ‹ ‹ ‹ ‹ ‹ ‹"})}),n.map(A=>e.jsx("div",{className:"sliding-action-packet slide-feedback-stream",onAnimationEnd:()=>C(A),children:e.jsxs("span",{className:"action-packet-pill feedback-pill",children:[e.jsx(Me,{size:10}),e.jsxs("span",{children:["rem: ",A.dist,"m | 1.4m/s"]})]})},A.id))]})]}),e.jsxs("div",{className:"action-channel-strip result-channel",children:[e.jsxs("div",{className:"channel-header-row",children:[e.jsxs("span",{className:"channel-tag result-tag",children:[e.jsx(Fe,{size:11})," 3. RESULT SERVICE (Server ➔ Client)"]}),e.jsx("span",{className:"channel-desc font-mono",children:a==="SUCCEEDED"?"STATUS_SUCCEEDED":a==="CANCELED"?"STATUS_CANCELED":"Awaiting Completion"})]}),e.jsxs("div",{className:"channel-wire",children:[e.jsx("div",{className:"wire-track",children:e.jsx("div",{className:"flow-chevrons flow-left",children:"‹ ‹ ‹ ‹ ‹ ‹ ‹ ‹ ‹ ‹ ‹ ‹ ‹ ‹ ‹ ‹ ‹ ‹ ‹ ‹"})}),a==="SENDING_RESULT"&&e.jsx("div",{className:"sliding-action-packet slide-s2c",children:e.jsxs("span",{className:"action-packet-pill result-pill",children:[e.jsx(H,{size:10}),e.jsxs("span",{children:["Result: STATUS_SUCCEEDED (dist=",g,"m)"]})]})}),a==="SUCCEEDED"&&e.jsxs("div",{className:"channel-result-pill result-success animate-fade-in",children:[e.jsx(H,{size:11,className:"text-emerald"})," Result Delivered: STATUS_SUCCEEDED"]}),a==="CANCELED"&&e.jsxs("div",{className:"channel-result-pill result-canceled animate-fade-in",children:[e.jsx(ut,{size:11})," Goal Preempted: STATUS_CANCELED"]})]})]}),e.jsxs("div",{className:"qos-badge-strip",children:[e.jsx("span",{className:"qos-chip",children:"1. Goal (RPC)"}),e.jsx("span",{className:"qos-chip",children:"2. Feedback (Stream)"}),e.jsx("span",{className:"qos-chip",children:"3. Result (RPC)"})]})]}),e.jsxs("div",{className:`diagram-card server-card action-node-card ${a==="EXECUTING"||a==="GOAL_ACCEPTED"?"pulse-border-green":""} ${l===1||l===2||l===null?"focused":"dimmed"}`,children:[e.jsxs("div",{className:"card-top",children:[e.jsx("div",{className:"node-icon-wrapper sub-icon",children:e.jsx(je,{size:18})}),e.jsxs("div",{className:"node-title-group",children:[e.jsx("div",{className:"node-role-tag",children:"ACTION SERVER (Executor)"}),e.jsx("h3",{className:"node-name action-node-title",title:"/nav_action_server",children:"nav_action_server"}),e.jsx("div",{className:"node-class",children:"NavigateDistanceServer"})]}),e.jsx("div",{className:`status-dot ${a==="EXECUTING"?"online":a==="CANCELED"?"error":"active"}`,title:a})]}),e.jsxs("div",{className:"card-code-snip",children:[e.jsx("span",{className:"code-fn",children:"execute_callback"}),e.jsx("span",{className:"code-args",children:"(goal_handle) ➔ publish_feedback()"})]}),e.jsxs("div",{className:"card-telemetry sub-telemetry",children:[e.jsxs("div",{className:"telemetry-item",children:[e.jsx("span",{className:"telemetry-label",children:"Motor Drive"}),e.jsx("span",{className:"telemetry-val font-mono",style:{color:a==="EXECUTING"?"#10b981":"var(--text-muted)"},children:a==="EXECUTING"?"1.40 m/s":"0.00 m/s"})]}),e.jsxs("div",{className:"telemetry-item",children:[e.jsx("span",{className:"telemetry-label",children:"Preemption"}),e.jsx("span",{className:"telemetry-val font-mono",style:{color:a==="CANCELED"?"#ef4444":"#10b981"},children:a==="CANCELED"?"PREEMPTED":"CLEAR"})]}),e.jsxs("div",{className:"telemetry-item cb-telemetry-item",children:[e.jsx("span",{className:"telemetry-label",children:"Goal Status"}),e.jsx("span",{className:"telemetry-val font-mono",style:{color:a==="EXECUTING"||a==="SUCCEEDED"?"#10b981":a==="CANCELED"?"#ef4444":"var(--text-muted)",fontSize:"0.68rem"},children:a==="EXECUTING"?"STATUS_EXECUTING":a==="SUCCEEDED"?"STATUS_SUCCEEDED":a==="CANCELED"?"STATUS_CANCELED":"STATUS_UNKNOWN"})]})]}),e.jsxs("div",{className:"card-terminal-log action-server-log",children:[e.jsxs("div",{className:"log-header",children:[e.jsx(Me,{size:12,className:"text-green"}),e.jsx("span",{children:"Execution Loop Telemetry (10 Hz)"})]}),e.jsxs("div",{className:"log-content-wrap",children:[e.jsx("span",{className:`log-level-pill ${a==="CANCELED"?"log-level-error":""}`,children:a==="EXECUTING"?"[EXECUTING]":a==="CANCELED"?"[CANCELED]":a==="SUCCEEDED"?"[SUCCEEDED]":"[STANDBY]"}),e.jsx("span",{className:"log-text",children:a==="EXECUTING"?`Corridor trajectory active... Dist remaining: ${w.toFixed(1)}m`:a==="CANCELED"?"Preempt request accepted. Velocity cut to 0.0 m/s.":a==="SUCCEEDED"?`Target reached! Dispatched ${N} feedbacks.`:"Server listening on /navigate_distance. Ready for goal."})]})]}),e.jsx("div",{className:"server-status-footer-pill",children:e.jsx("span",{className:"status-indicator-tag",children:a==="EXECUTING"?"🟢 Control Loop Active · Ticking at 10 Hz":a==="GOAL_ACCEPTED"?"🟣 Goal Validated · Accepting Handle":a==="CANCELED"?"🔴 Goal Aborted · Preempt Callback Resolved":a==="SUCCEEDED"?"🟢 Goal Finalized · Result Published":"⚪ Standby · Ready for Action Goal"})})]})]}),e.jsxs("div",{className:"pubsub-controls-bar action-controls-bar",children:[e.jsx("div",{className:"controls-left",children:e.jsxs("button",{className:"control-btn",onClick:d,title:"Reset action simulation",children:[e.jsx(K,{size:15}),e.jsx("span",{children:"Reset Simulation"})]})}),e.jsx("div",{className:"controls-right",children:e.jsxs("div",{className:"rate-slider-group",children:[e.jsx(Ze,{size:14,className:"text-muted"}),e.jsxs("label",{className:"slider-label",children:["Target Distance: ",e.jsxs("strong",{children:[g," m"]})]}),e.jsx("input",{type:"range",min:"5",max:"20",step:"1",value:g,disabled:a==="EXECUTING"||a==="SENDING_GOAL",onChange:A=>{const E=parseInt(A.target.value);T(E),I(E),y.current=E,x(L=>({...L,distance_remaining:E}))},className:"pubsub-slider"})]})})]}),e.jsxs("div",{className:"service-concept-summary",children:[e.jsxs("div",{className:"concept-card",children:[e.jsx("div",{className:"concept-icon goal-concept-icon",children:e.jsx(ve,{size:16})}),e.jsxs("div",{className:"concept-text",children:[e.jsx("strong",{children:"1. Goal Service (Client ➔ Server)"}),e.jsxs("p",{children:["The client requests a long-running goal (drive ",g,"m). The server validates the goal parameters and returns an accepted handle."]})]})]}),e.jsxs("div",{className:"concept-card",children:[e.jsx("div",{className:"concept-icon feedback-concept-icon",children:e.jsx(Me,{size:16})}),e.jsxs("div",{className:"concept-text",children:[e.jsx("strong",{children:"2. Feedback Stream (Server ➔ Client)"}),e.jsx("p",{children:"While the robot drives, the server continuously publishes real-time telemetry (distance remaining, velocity) at 4 Hz."})]})]}),e.jsxs("div",{className:"concept-card",children:[e.jsx("div",{className:"concept-icon cancel-concept-icon",children:e.jsx(ut,{size:16})}),e.jsxs("div",{className:"concept-text",children:[e.jsx("strong",{children:"3. Mid-Flight Preemption (Client ➔ Server)"}),e.jsx("p",{children:"Unlike standard Services, an Action allows the client to abort a goal mid-flight if an emergency stop or obstacle occurs."})]})]}),e.jsxs("div",{className:"concept-card",children:[e.jsx("div",{className:"concept-icon result-concept-icon",children:e.jsx(H,{size:16})}),e.jsxs("div",{className:"concept-text",children:[e.jsx("strong",{children:"4. Result Service (Server ➔ Client)"}),e.jsx("p",{children:"When the robot reaches the target waypoint or aborts, the server returns the final status code and outcome packet."})]})]})]})]})}const qe=[{id:"debug",name:"DEBUG",num:10,color:"#06b6d4",bg:"rgba(6, 182, 212, 0.08)",border:"#22d3ee",radius:175,icon:wa,desc:"Fine-grained internal diagnostics (raw encoder counts, loop timings, math matrices).",purpose:"Development & Bench Testing only. Never enabled in production fleets due to network/CPU flood."},{id:"info",name:"INFO",num:20,color:"#3b82f6",bg:"rgba(59, 130, 246, 0.10)",border:"#60a5fa",radius:140,icon:Ut,desc:"Standard operational milestones (node initialized, goal reached, state transitions).",purpose:"ROS 2 Default Level. Recommended for day-to-day robot operations."},{id:"warn",name:"WARN",num:30,color:"#f59e0b",bg:"rgba(245, 158, 11, 0.12)",border:"#fbbf24",radius:105,icon:vt,desc:"Unexpected anomalies or degraded states that do not stop the robot from operating.",purpose:"Recoverable conditions: Low battery alert (<20%), transient LiDAR packet drop, high CPU load."},{id:"error",name:"ERROR",num:40,color:"#f97316",bg:"rgba(249, 115, 22, 0.15)",border:"#fb923c",radius:70,icon:ka,desc:"Component failure or abort. The affected subsystem cannot continue its function.",purpose:"Actionable failures: Sensor serial disconnected, path planner aborted, TF lookup failure."},{id:"fatal",name:"FATAL",num:50,color:"#ef4444",bg:"rgba(239, 68, 68, 0.22)",border:"#f87171",radius:35,icon:Ca,desc:"Critical catastrophic failure. The node or physical hardware must shut down immediately.",purpose:"Safety hazards: Hardware E-Stop depressed, motor driver overcurrent, watch-dog bite."}],Et=[{level:"debug",levelNum:10,badgeColor:"#06b6d4",tag:"[DEBUG]",source:"[nexus_amr_base]",msg:"Encoder ticks L: 14209, R: 14212 | loop_dt: 19.8ms | wheel_slip: 0.01"},{level:"info",levelNum:20,badgeColor:"#3b82f6",tag:"[INFO] ",source:"[nexus_amr_base]",msg:"State changed: IDLE -> NAVIGATING_TO_WAYPOINT (Goal: Waypoint_Station_2)"},{level:"warn",levelNum:30,badgeColor:"#f59e0b",tag:"[WARN] ",source:"[battery_monitor]",msg:"Battery voltage at 19.8V (<20.0V threshold). Return-to-base timer initiated."},{level:"error",levelNum:40,badgeColor:"#f97316",tag:"[ERROR]",source:"[lidar_driver]",msg:"Packet header checksum failed on /dev/ttyUSB0! Skipping 1 scan frame."},{level:"fatal",levelNum:50,badgeColor:"#ef4444",tag:"[FATAL]",source:"[safety_controller]",msg:"HARDWARE E-STOP BUMPER TRIGGERED: EMERGENCY BRAKES ENGAGED! Node halting."}];function qs(){const[a,s]=c.useState("info"),[i,u]=c.useState(!1),[g,T]=c.useState(null),w=qe.find(n=>n.id===a)||qe[1],I=g?qe.find(n=>n.id===g):w,N=Et.filter(n=>n.levelNum>=w.num).length,j=Et.length-N,l=`ros2 run nexus_amr_basics logger_levels --ros-args --log-level ${a}`,p=()=>{navigator.clipboard.writeText(l).catch(()=>{}),u(!0),setTimeout(()=>u(!1),2e3)};return e.jsxs("div",{className:"log-circle-widget",children:[e.jsxs("div",{className:"log-widget-header",children:[e.jsxs("div",{className:"header-badge-row",children:[e.jsxs("div",{className:"badge-pill-cyan",children:[e.jsx(ye,{size:14,className:"animate-pulse"}),e.jsx("span",{children:"Interactive Severity Hierarchy & Filtering"})]}),e.jsx("span",{className:"ros-standard-badge",children:"ROS 2 Logging Standard (rclpy)"})]}),e.jsx("h3",{className:"log-widget-title",children:"The Nested Severity Hierarchy: What Level Logs What?"}),e.jsxs("p",{className:"log-widget-subtitle",children:["ROS 2 loggers use a ",e.jsx("strong",{children:"hierarchical threshold filter"}),": when you set the logger to level ",e.jsx("em",{children:"L"}),", all messages with severity ",e.jsx("strong",{children:"≥ L"})," are emitted, while all messages below ",e.jsx("em",{children:"L"})," are automatically suppressed without CPU overhead."]})]}),e.jsxs("div",{className:"level-selector-bar",children:[e.jsxs("span",{className:"selector-label",children:[e.jsx(Ze,{size:14})," Active Logger Threshold:"]}),e.jsx("div",{className:"selector-buttons",children:qe.map(n=>{const o=a===n.id;return e.jsxs("button",{className:`level-choice-btn ${o?"active":""}`,style:{"--btn-accent":n.color,borderColor:o?n.color:void 0,boxShadow:o?`0 0 12px ${n.color}40`:void 0},onClick:()=>s(n.id),children:[e.jsx("span",{className:"btn-dot",style:{background:n.color}}),e.jsx("span",{className:"btn-name",children:n.name}),n.id==="info"&&e.jsx("span",{className:"default-pill",children:"Default"})]},n.id)})})]}),e.jsxs("div",{className:"log-widget-body",children:[e.jsxs("div",{className:"nested-circle-stage",children:[e.jsxs("div",{className:"circle-stage-header",children:[e.jsx("span",{className:"stage-title",children:"Concentric Severity Inclusions"}),e.jsx("span",{className:"stage-hint",children:"Hover or click any ring"})]}),e.jsxs("div",{className:"concentric-container",children:[e.jsxs("svg",{viewBox:"-200 -200 400 400",className:"concentric-svg",children:[e.jsxs("defs",{children:[e.jsx("pattern",{id:"suppressedHatch",width:"8",height:"8",patternTransform:"rotate(45 0 0)",patternUnits:"userSpaceOnUse",children:e.jsx("line",{x1:"0",y1:"0",x2:"0",y2:"8",stroke:"rgba(255,255,255,0.06)",strokeWidth:"1.5"})}),e.jsxs("filter",{id:"activeGlow",x:"-20%",y:"-20%",width:"140%",height:"140%",children:[e.jsx("feGaussianBlur",{stdDeviation:"4",result:"blur"}),e.jsx("feComposite",{in:"SourceGraphic",in2:"blur",operator:"over"})]})]}),qe.map(n=>{const o=n.num>=w.num,m=g===n.id,x=w.id===n.id;return e.jsxs("g",{className:`circle-layer ${o?"layer-active":"layer-dimmed"}`,onMouseEnter:()=>T(n.id),onMouseLeave:()=>T(null),onClick:()=>s(n.id),style:{cursor:"pointer"},children:[e.jsx("circle",{cx:"0",cy:"0",r:n.radius,fill:o?n.bg:"rgba(15, 23, 42, 0.4)",stroke:n.color,strokeWidth:x?3:m?2.5:1.5,strokeDasharray:o?"none":"4 4",opacity:o?1:.25,filter:x?"url(#activeGlow)":void 0,className:"transition-all duration-300"}),!o&&e.jsx("circle",{cx:"0",cy:"0",r:n.radius,fill:"url(#suppressedHatch)",opacity:"0.8"}),e.jsx("text",{x:"0",y:-n.radius+16,textAnchor:"middle",fill:o?n.color:"#64748b",fontSize:n.id==="fatal"?11:12,fontWeight:"700",fontFamily:"var(--font-mono, monospace)",letterSpacing:"0.5px",opacity:o?1:.4,children:n.name})]},n.id)}),e.jsx("circle",{cx:"0",cy:"0",r:"14",fill:"#ef4444",opacity:w.num<=50?.9:.3}),e.jsx("text",{x:"0",y:"4",textAnchor:"middle",fill:"#ffffff",fontSize:"10",fontWeight:"900",children:"⚡"})]}),e.jsxs("div",{className:"diagram-status-legend",children:[e.jsxs("div",{className:"legend-tag active-legend",children:[e.jsx(H,{size:12,className:"text-green"}),e.jsxs("span",{children:["Active: ",e.jsxs("strong",{children:[N," Levels"]})]})]}),j>0&&e.jsxs("div",{className:"legend-tag suppressed-legend",children:[e.jsx(Qe,{size:12,className:"text-red"}),e.jsxs("span",{children:["Suppressed: ",e.jsxs("strong",{children:[j," Levels"]})]})]})]})]}),e.jsxs("div",{className:"active-level-inspector",style:{borderColor:I.color},children:[e.jsxs("div",{className:"inspector-head",children:[e.jsxs("span",{className:"inspector-badge",style:{background:I.color},children:[I.name," (Severity ",I.num,")"]}),e.jsx("span",{className:"inspector-status",children:I.num>=w.num?e.jsxs("span",{className:"text-green flex items-center gap-1",children:[e.jsx(H,{size:12})," Logged & Visible"]}):e.jsxs("span",{className:"text-muted flex items-center gap-1",children:[e.jsx(Qe,{size:12})," Filtered Out (Silent)"]})})]}),e.jsx("p",{className:"inspector-desc",children:I.desc}),e.jsxs("div",{className:"inspector-meta",children:[e.jsx("span",{className:"meta-label",children:"Guideline:"})," ",I.purpose]})]})]}),e.jsxs("div",{className:"terminal-simulator-stage",children:[e.jsxs("div",{className:"simulator-header",children:[e.jsxs("div",{className:"simulator-title-group",children:[e.jsx(ze,{size:15,className:"text-cyan"}),e.jsx("span",{className:"simulator-title",children:"Live Terminal Output Stream"})]}),e.jsxs("span",{className:"filter-mode-tag",children:["Threshold: ",e.jsx("strong",{style:{color:w.color},children:w.name})]})]}),e.jsxs("div",{className:"terminal-log-window",children:[e.jsxs("div",{className:"terminal-titlebar",children:[e.jsxs("div",{className:"term-dots",children:[e.jsx("span",{className:"dot dot-r"}),e.jsx("span",{className:"dot dot-y"}),e.jsx("span",{className:"dot dot-g"})]}),e.jsx("span",{className:"term-filename",children:"student@amr-cart: ~/ros2_ws (stdout)"})]}),e.jsx("div",{className:"terminal-logs-list",children:Et.map(n=>{const o=n.levelNum>=w.num;return e.jsxs("div",{className:`terminal-log-line ${o?"log-visible":"log-filtered"}`,children:[e.jsxs("div",{className:"log-line-meta",children:[e.jsx("span",{className:"log-level-badge",style:{color:o?n.badgeColor:"#475569",borderColor:o?`${n.badgeColor}60`:"#334155"},children:n.tag}),e.jsx("span",{className:"log-source",children:n.source})]}),e.jsx("div",{className:"log-body",children:e.jsx("span",{className:"log-message",children:n.msg})}),e.jsx("div",{className:"log-filter-state",children:o?e.jsxs("span",{className:"state-badge-passed",title:"Emitted to console & /rosout",children:[e.jsx(Se,{size:11})," Printed"]}):e.jsxs("span",{className:"state-badge-filtered",title:"Suppressed by logger severity threshold",children:[e.jsx(Qe,{size:11})," Filtered"]})})]},n.level)})})]}),e.jsxs("div",{className:"cli-run-card",children:[e.jsx("div",{className:"cli-card-label",children:"Run Node with this Log Level:"}),e.jsxs("div",{className:"cli-code-row",children:[e.jsx("code",{className:"cli-code-text",children:l}),e.jsxs("button",{className:"cli-copy-btn",onClick:p,title:"Copy launch command to clipboard",children:[i?e.jsx(Se,{size:13,className:"text-green"}):e.jsx(Xe,{size:13}),e.jsx("span",{children:i?"Copied!":"Copy"})]})]})]}),e.jsxs("div",{className:"log-takeaway-box",children:[e.jsx("div",{className:"takeaway-icon",children:e.jsx(Ut,{size:16,className:"text-cyan"})}),e.jsxs("div",{className:"takeaway-text",children:[e.jsx("strong",{children:"Key Rule:"})," Setting ",e.jsxs("code",{className:"inline-code",children:["--log-level ",w.id]})," emits all messages with severity ",e.jsxs("strong",{children:["≥ ",w.num]}),". To silence spammy debug logs in production, keep the default at ",e.jsx("code",{className:"inline-code",children:"info"})," or raise it to ",e.jsx("code",{className:"inline-code",children:"warn"}),"."]})]})]})]})]})}function Us(){const[a,s]=c.useState("box"),[i,u]=c.useState(8),[g,T]=c.useState(.3),[w,I]=c.useState(.14),[N,j]=c.useState(.4),[l,p]=c.useState(.06),[n,o]=c.useState(.035),[m,x]=c.useState(.03),[S,z]=c.useState(.04),[R,h]=c.useState(.06),[f,_]=c.useState(!1),y=c.useMemo(()=>{const d=Math.max(.001,parseFloat(i)||.1);if(a==="box"){const C=Math.max(.001,parseFloat(g)||.1),P=Math.max(.001,parseFloat(w)||.1),A=Math.max(.001,parseFloat(N)||.1),E=d/12*(P*P+A*A),L=d/12*(C*C+A*A),F=d/12*(C*C+P*P);return{ixx:E,iyy:L,izz:F,ixy:0,ixz:0,iyz:0}}else if(a==="cylinder"){const C=Math.max(.001,parseFloat(l)||.05),P=Math.max(.001,parseFloat(n)||.05),A=d/12*(3*C*C+P*P),E=A,L=d/2*(C*C);return{ixx:A,iyy:E,izz:L,ixy:0,ixz:0,iyz:0}}else if(a==="sphere"){const C=Math.max(.001,parseFloat(m)||.03),P=2/5*d*C*C;return{ixx:P,iyy:P,izz:P,ixy:0,ixz:0,iyz:0}}else{const C=Math.max(.001,parseFloat(S)||.02),P=Math.max(C+.001,parseFloat(R)||.05),A=Math.max(.001,parseFloat(n)||.05),E=d/12*(3*(C*C+P*P)+A*A),L=E,F=d/2*(C*C+P*P);return{ixx:E,iyy:L,izz:F,ixy:0,ixz:0,iyz:0}}},[a,i,g,w,N,l,n,m,S,R]),v=c.useMemo(()=>`<inertial>
  <origin xyz="0 0 0" rpy="0 0 0"/>
  <mass value="${parseFloat(i).toFixed(3)}"/>
  <inertia ixx="${y.ixx.toFixed(6)}" ixy="0.0" ixz="0.0"
           iyy="${y.iyy.toFixed(6)}" iyz="0.0"
           izz="${y.izz.toFixed(6)}"/>
</inertial>`,[i,y]),b=()=>{navigator.clipboard.writeText(v).then(()=>{_(!0),setTimeout(()=>_(!1),2200)})},r=d=>{d==="chassis"?(s("box"),u(8),j(.4),T(.3),I(.14)):d==="wheel"?(s("cylinder"),u(.8),p(.06),o(.035)):d==="lidar"?(s("cylinder"),u(.15),p(.04),o(.04)):d==="camera"?(s("box"),u(.08),j(.025),T(.09),I(.025)):d==="caster"&&(s("sphere"),u(.3),x(.03))};return e.jsxs("div",{className:"inertia-calculator-card",style:{background:"linear-gradient(145deg, #0d1527 0%, #080d1a 100%)",borderRadius:"16px",border:"1px solid #1e293b",boxShadow:"0 8px 32px rgba(0,0,0,0.4)",padding:"24px",margin:"28px 0",color:"#e2e8f0",fontFamily:"system-ui, -apple-system, sans-serif"},children:[e.jsxs("div",{style:{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:"20px",borderBottom:"1px solid #1e293b",paddingBottom:"14px"},children:[e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"12px"},children:[e.jsx("div",{style:{width:"36px",height:"36px",borderRadius:"10px",background:"linear-gradient(135deg, #00e5ff 0%, #0284c7 100%)",display:"flex",alignItems:"center",justifyContent:"center",boxShadow:"0 0 16px rgba(0, 229, 255, 0.4)"},children:e.jsx("span",{style:{fontSize:"18px",fontWeight:"bold",color:"#090d16"},children:"I"})}),e.jsxs("div",{children:[e.jsx("h3",{style:{margin:0,fontSize:"18px",fontWeight:"700",color:"#f8fafc"},children:"Interactive URDF Inertia Tensor Calculator"}),e.jsx("span",{style:{fontSize:"12px",color:"#94a3b8"},children:"Physics-accurate principal moments of inertia for primitive link geometries"})]})]}),e.jsx("span",{style:{fontSize:"11px",fontWeight:"700",textTransform:"uppercase",padding:"4px 10px",borderRadius:"20px",background:"rgba(0, 229, 255, 0.1)",color:"#00e5ff",border:"1px solid rgba(0, 229, 255, 0.3)"},children:"ROS 2 / Gazebo Ready"})]}),e.jsxs("div",{style:{marginBottom:"20px"},children:[e.jsx("label",{style:{fontSize:"11px",fontWeight:"700",color:"#94a3b8",textTransform:"uppercase",letterSpacing:"0.5px",display:"block",marginBottom:"8px"},children:"Quick Robot Presets:"}),e.jsxs("div",{style:{display:"flex",gap:"8px",flexWrap:"wrap"},children:[e.jsx("button",{onClick:()=>r("chassis"),style:Ue,children:"📦 AMR Chassis (8kg Box)"}),e.jsx("button",{onClick:()=>r("wheel"),style:Ue,children:"⚙️ Drive Wheel (0.8kg Cyl)"}),e.jsx("button",{onClick:()=>r("lidar"),style:Ue,children:"📡 2D LiDAR Puck (0.15kg)"}),e.jsx("button",{onClick:()=>r("camera"),style:Ue,children:"📷 RGB Camera (0.08kg)"}),e.jsx("button",{onClick:()=>r("caster"),style:Ue,children:"⚪ Caster Ball (0.3kg)"})]})]}),e.jsx("div",{style:{display:"flex",gap:"8px",marginBottom:"22px",borderBottom:"1px solid #1e293b",paddingBottom:"12px"},children:[{id:"box",label:"Solid Box (Cuboid)",icon:"📦"},{id:"cylinder",label:"Solid Cylinder",icon:"🥫"},{id:"sphere",label:"Solid Sphere",icon:"⚽"},{id:"hollow_cylinder",label:"Hollow Cylinder",icon:"⭕"}].map(d=>e.jsxs("button",{onClick:()=>s(d.id),style:{padding:"8px 16px",borderRadius:"8px",border:"none",cursor:"pointer",fontWeight:"600",fontSize:"13px",background:a===d.id?"#0284c7":"#1e293b",color:a===d.id?"#ffffff":"#94a3b8",transition:"all 0.2s ease",display:"flex",alignItems:"center",gap:"6px"},children:[e.jsx("span",{children:d.icon}),e.jsx("span",{children:d.label})]},d.id))}),e.jsxs("div",{style:{display:"grid",gridTemplateColumns:"repeat(auto-fit, minmax(200px, 1fr))",gap:"16px",marginBottom:"24px"},children:[e.jsxs("div",{style:me,children:[e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",marginBottom:"6px"},children:[e.jsx("span",{style:ge,children:"Mass (m)"}),e.jsxs("span",{style:ue,children:[i," kg"]})]}),e.jsx("input",{type:"range",min:"0.01",max:"25",step:"0.01",value:i,onChange:d=>u(parseFloat(d.target.value)),style:{width:"100%",accentColor:"#00e5ff"}})]}),a==="box"&&e.jsxs(e.Fragment,{children:[e.jsxs("div",{style:me,children:[e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",marginBottom:"6px"},children:[e.jsx("span",{style:ge,children:"Length / X Depth (d)"}),e.jsxs("span",{style:ue,children:[N," m"]})]}),e.jsx("input",{type:"range",min:"0.01",max:"1.5",step:"0.005",value:N,onChange:d=>j(parseFloat(d.target.value)),style:{width:"100%",accentColor:"#ef4444"}})]}),e.jsxs("div",{style:me,children:[e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",marginBottom:"6px"},children:[e.jsx("span",{style:ge,children:"Width / Y Lateral (w)"}),e.jsxs("span",{style:ue,children:[g," m"]})]}),e.jsx("input",{type:"range",min:"0.01",max:"1.5",step:"0.005",value:g,onChange:d=>T(parseFloat(d.target.value)),style:{width:"100%",accentColor:"#10b981"}})]}),e.jsxs("div",{style:me,children:[e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",marginBottom:"6px"},children:[e.jsx("span",{style:ge,children:"Height / Z Vertical (h)"}),e.jsxs("span",{style:ue,children:[w," m"]})]}),e.jsx("input",{type:"range",min:"0.01",max:"1.0",step:"0.005",value:w,onChange:d=>I(parseFloat(d.target.value)),style:{width:"100%",accentColor:"#3b82f6"}})]})]}),(a==="cylinder"||a==="hollow_cylinder")&&e.jsxs(e.Fragment,{children:[a==="cylinder"?e.jsxs("div",{style:me,children:[e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",marginBottom:"6px"},children:[e.jsx("span",{style:ge,children:"Radius (r)"}),e.jsxs("span",{style:ue,children:[l," m"]})]}),e.jsx("input",{type:"range",min:"0.005",max:"0.5",step:"0.005",value:l,onChange:d=>p(parseFloat(d.target.value)),style:{width:"100%",accentColor:"#00e5ff"}})]}):e.jsxs(e.Fragment,{children:[e.jsxs("div",{style:me,children:[e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",marginBottom:"6px"},children:[e.jsx("span",{style:ge,children:"Inner Radius (r1)"}),e.jsxs("span",{style:ue,children:[S," m"]})]}),e.jsx("input",{type:"range",min:"0.005",max:"0.3",step:"0.005",value:S,onChange:d=>z(parseFloat(d.target.value)),style:{width:"100%",accentColor:"#00e5ff"}})]}),e.jsxs("div",{style:me,children:[e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",marginBottom:"6px"},children:[e.jsx("span",{style:ge,children:"Outer Radius (r2)"}),e.jsxs("span",{style:ue,children:[R," m"]})]}),e.jsx("input",{type:"range",min:"0.01",max:"0.5",step:"0.005",value:R,onChange:d=>h(parseFloat(d.target.value)),style:{width:"100%",accentColor:"#00e5ff"}})]})]}),e.jsxs("div",{style:me,children:[e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",marginBottom:"6px"},children:[e.jsx("span",{style:ge,children:"Length / Height (l)"}),e.jsxs("span",{style:ue,children:[n," m"]})]}),e.jsx("input",{type:"range",min:"0.005",max:"0.5",step:"0.005",value:n,onChange:d=>o(parseFloat(d.target.value)),style:{width:"100%",accentColor:"#3b82f6"}})]})]}),a==="sphere"&&e.jsxs("div",{style:me,children:[e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",marginBottom:"6px"},children:[e.jsx("span",{style:ge,children:"Radius (r)"}),e.jsxs("span",{style:ue,children:[m," m"]})]}),e.jsx("input",{type:"range",min:"0.005",max:"0.5",step:"0.005",value:m,onChange:d=>x(parseFloat(d.target.value)),style:{width:"100%",accentColor:"#00e5ff"}})]})]}),e.jsxs("div",{style:{display:"grid",gridTemplateColumns:"repeat(auto-fit, minmax(300px, 1fr))",gap:"20px"},children:[e.jsxs("div",{style:{background:"#090d16",padding:"16px",borderRadius:"12px",border:"1px solid #1e293b"},children:[e.jsx("div",{style:{fontSize:"11px",fontWeight:"700",color:"#94a3b8",textTransform:"uppercase",marginBottom:"10px"},children:"Computed Inertia Tensor Elements (kg·m²):"}),e.jsxs("div",{style:{display:"grid",gridTemplateColumns:"repeat(3, 1fr)",gap:"8px",textAlign:"center"},children:[e.jsxs("div",{style:he,children:[e.jsx("div",{style:{fontSize:"11px",color:"#ef4444"},children:"Ixx (Roll)"}),e.jsx("div",{style:{fontSize:"14px",fontWeight:"bold",color:"#f8fafc"},children:y.ixx.toFixed(5)})]}),e.jsxs("div",{style:he,children:[e.jsx("div",{style:{fontSize:"11px",color:"#94a3b8"},children:"Ixy"}),e.jsx("div",{style:{fontSize:"14px",fontWeight:"bold",color:"#64748b"},children:"0.00000"})]}),e.jsxs("div",{style:he,children:[e.jsx("div",{style:{fontSize:"11px",color:"#94a3b8"},children:"Ixz"}),e.jsx("div",{style:{fontSize:"14px",fontWeight:"bold",color:"#64748b"},children:"0.00000"})]}),e.jsxs("div",{style:he,children:[e.jsx("div",{style:{fontSize:"11px",color:"#94a3b8"},children:"Iyx"}),e.jsx("div",{style:{fontSize:"14px",fontWeight:"bold",color:"#64748b"},children:"0.00000"})]}),e.jsxs("div",{style:he,children:[e.jsx("div",{style:{fontSize:"11px",color:"#10b981"},children:"Iyy (Pitch)"}),e.jsx("div",{style:{fontSize:"14px",fontWeight:"bold",color:"#f8fafc"},children:y.iyy.toFixed(5)})]}),e.jsxs("div",{style:he,children:[e.jsx("div",{style:{fontSize:"11px",color:"#94a3b8"},children:"Iyz"}),e.jsx("div",{style:{fontSize:"14px",fontWeight:"bold",color:"#64748b"},children:"0.00000"})]}),e.jsxs("div",{style:he,children:[e.jsx("div",{style:{fontSize:"11px",color:"#94a3b8"},children:"Izx"}),e.jsx("div",{style:{fontSize:"14px",fontWeight:"bold",color:"#64748b"},children:"0.00000"})]}),e.jsxs("div",{style:he,children:[e.jsx("div",{style:{fontSize:"11px",color:"#94a3b8"},children:"Izy"}),e.jsx("div",{style:{fontSize:"14px",fontWeight:"bold",color:"#64748b"},children:"0.00000"})]}),e.jsxs("div",{style:he,children:[e.jsx("div",{style:{fontSize:"11px",color:"#3b82f6"},children:"Izz (Yaw)"}),e.jsx("div",{style:{fontSize:"14px",fontWeight:"bold",color:"#f8fafc"},children:y.izz.toFixed(5)})]})]})]}),e.jsxs("div",{style:{background:"#090d16",padding:"16px",borderRadius:"12px",border:"1px solid #1e293b",position:"relative"},children:[e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"8px"},children:[e.jsx("span",{style:{fontSize:"11px",fontWeight:"700",color:"#00e5ff",textTransform:"uppercase"},children:"Generated URDF <inertial> Snippet"}),e.jsx("button",{onClick:b,style:{background:f?"#10b981":"#1e293b",color:f?"#ffffff":"#38bdf8",border:"1px solid "+(f?"#10b981":"#38bdf8"),borderRadius:"6px",padding:"4px 10px",fontSize:"11px",fontWeight:"600",cursor:"pointer",transition:"all 0.2s ease"},children:f?"✓ Copied to Clipboard!":"📋 Copy XML"})]}),e.jsx("pre",{style:{margin:0,padding:"12px",background:"#040711",borderRadius:"8px",color:"#a5f3fc",fontFamily:"monospace",fontSize:"12px",lineHeight:"1.5",overflowX:"auto",border:"1px solid #162032"},children:v})]})]})]})}const me={background:"#131c31",padding:"12px 14px",borderRadius:"8px",border:"1px solid #1e293b"},ge={fontSize:"12px",fontWeight:"600",color:"#94a3b8"},ue={fontSize:"12px",fontWeight:"700",color:"#f8fafc"},Ue={background:"#1e293b",color:"#cbd5e1",border:"1px solid #334155",borderRadius:"6px",padding:"5px 10px",fontSize:"11px",fontWeight:"600",cursor:"pointer",transition:"background 0.2s"},he={background:"#131b2e",padding:"8px 4px",borderRadius:"6px",border:"1px solid #1e293b"},He={base_footprint:{name:"base_footprint",parentJoint:"None (Root Datum)",jointType:"root",rosPos:[0,0,0],rosRpy:[0,0,0],mass:"0.0 kg (Virtual)",inertia:"Ixx=0, Iyy=0, Izz=0",description:"Ground contact reference projection on floor (Z=0.0m). Used by Nav2 costmaps and footprint inflation.",color:"#06b6d4",category:"Kinematic Datum"},base_link:{name:"base_link",parentJoint:"base_footprint_joint (fixed)",jointType:"fixed",rosPos:[0,0,.06],rosRpy:[0,0,0],dimensions:"0.40m (L) x 0.30m (W) x 0.14m (H)",mass:"8.0 kg",inertia:"Ixx=0.073, Iyy=0.120, Izz=0.167",description:"Main structural chassis body. Origin is at the drive axle center line, elevated 0.06m above ground.",color:"#00c0e6",category:"Chassis"},left_wheel_link:{name:"left_wheel_link",parentJoint:"left_wheel_joint (continuous)",jointType:"continuous",axis:"Y-Axis [0 1 0]",rosPos:[0,.16,.06],rosRpy:[0,0,0],dimensions:"Radius=0.06m, Width=0.035m",mass:"0.8 kg",inertia:"Ixx=0.0008, Iyy=0.0008, Izz=0.0014",description:"Port-side actuated differential drive wheel. Continuous 360° rotation driven by motor velocity commands.",color:"#10b981",category:"Actuation"},right_wheel_link:{name:"right_wheel_link",parentJoint:"right_wheel_joint (continuous)",jointType:"continuous",axis:"Y-Axis [0 1 0]",rosPos:[0,-.16,.06],rosRpy:[0,0,0],dimensions:"Radius=0.06m, Width=0.035m",mass:"0.8 kg",inertia:"Ixx=0.0008, Iyy=0.0008, Izz=0.0014",description:"Starboard-side actuated differential drive wheel. Powered independently to provide differential steering.",color:"#10b981",category:"Actuation"},front_caster_link:{name:"front_caster_link",parentJoint:"front_caster_joint (fixed)",jointType:"fixed",rosPos:[.14,0,.03],rosRpy:[0,0,0],dimensions:"Sphere Radius=0.03m",mass:"0.3 kg",inertia:"Ixx=Iyy=Izz=0.0001",description:"Passive low-friction front support caster ball (mu1=0.001) preventing pitching while allowing multi-axis slip.",color:"#94a3b8",category:"Support"},rear_caster_link:{name:"rear_caster_link",parentJoint:"rear_caster_joint (fixed)",jointType:"fixed",rosPos:[-.14,0,.03],rosRpy:[0,0,0],dimensions:"Sphere Radius=0.03m",mass:"0.3 kg",inertia:"Ixx=Iyy=Izz=0.0001",description:"Passive low-friction rear support caster ball maintaining 3-point static equilibrium on flat facility floors.",color:"#94a3b8",category:"Support"},laser_frame:{name:"laser_frame",parentJoint:"laser_joint (fixed)",jointType:"fixed",rosPos:[.08,0,.22],rosRpy:[0,0,0],dimensions:"Cylinder Radius=0.04m, Height=0.04m",mass:"0.15 kg",inertia:"Ixx=Iyy=0.00008, Izz=0.00012",description:"2D Planar LiDAR sensor scanning 360° at 10Hz. Publishes sensor_msgs/LaserScan on topic /scan for SLAM & Nav2.",color:"#f59e0b",category:"Perception"},camera_link:{name:"camera_link",parentJoint:"camera_joint (fixed)",jointType:"fixed",rosPos:[.2,0,.08],rosRpy:[0,0,0],dimensions:"Box 0.025m x 0.09m x 0.025m",mass:"0.08 kg",inertia:"Ixx=0.00005, Iyy=0.00001, Izz=0.00005",description:"Student Challenge Asset: Modular RGB camera sensor macro (camera.xacro). Mounted on front chassis bumper to stream image frames and depth perception.",color:"#8b5cf6",category:"Student Challenge Asset"}};function Hs(){const a=c.useRef(null),[s,i]=c.useState("base_link"),[u,g]=c.useState(()=>{if(typeof window<"u"){const h=window.location.search||"",f=window.location.hash||"";if(h.includes("solids=false")||f.includes("solids=false"))return!1}return!0}),[T,w]=c.useState(!0),[I,N]=c.useState(!0),[j,l]=c.useState(!0),[p,n]=c.useState(0),[o,m]=c.useState({}),x=c.useRef({scene:null,camera:null,renderer:null,controls:null,animFrameId:null,tfGroups:{},visualMeshes:[],leftWheelGroup:null,rightWheelGroup:null,lidarPuckGroup:null,treeLineMesh:null,raycaster:new us,mouse:new Na}),S=(h,f,_)=>new Le(-f,_,-h);c.useEffect(()=>{const h=a.current;if(!h)return;const f=h.clientWidth||800,_=520,y=new Ra;y.background=new za(659229);const v=new Ta(40,f/_,.05,50);v.position.set(1.1,.9,1.2);const b=new Aa({antialias:!0,alpha:!0,powerPreference:"high-performance"});b.setSize(f,_),b.setPixelRatio(Math.min(window.devicePixelRatio,2)),b.shadowMap.enabled=!0,b.shadowMap.type=Pa,b.toneMapping=Da,b.toneMappingExposure=1.15,h.appendChild(b.domElement);const r=new Ia(v,b.domElement);r.enableDamping=!0,r.dampingFactor=.08,r.target.set(0,.12,0),r.minDistance=.4,r.maxDistance=4,r.maxPolarAngle=Math.PI/2+.05;const d=new Ea(16777215,.85);y.add(d);const C=new Nt(16777215,1.6);C.position.set(2,4,2),C.castShadow=!0,C.shadow.mapSize.width=1024,C.shadow.mapSize.height=1024,y.add(C);const P=new Nt(440020,.6);P.position.set(-3,2,-3),y.add(P);const A=new Nt(1976635,.4);A.position.set(0,-2,0),y.add(A);const E=new La(4,16,440020,1976635);E.position.y=0,y.add(E);const L=new Ma(.55,.45),F=new Ee({color:0,transparent:!0,opacity:.45,depthWrite:!1}),$=new q(L,F);$.rotation.x=-Math.PI/2,$.position.set(0,.001,0),y.add($);const M=new Z;y.add(M);const k=[],D={},W=(U=.1)=>{const Y=new Z,Ie=U,de=U*.28,ie=Ie-de,ke=U*.035,X=U*.08,Ct=(ca,da)=>{const mt=new Z,pa=new Ce(ke,ke,ie,12),ls=new Ee({color:da}),cs=new q(pa,ls);cs.position.y=ie/2,mt.add(cs);const ma=new Wa(X,de,16),ds=new q(ma,ls);ds.position.y=ie+de/2,mt.add(ds);const ga=new Le(0,1,0),ua=new Ba().setFromUnitVectors(ga,ca.clone().normalize());return mt.quaternion.copy(ua),mt},ia=Ct(new Le(0,0,-1),15680580),na=Ct(new Le(-1,0,0),1096065),oa=Ct(new Le(0,1,0),3900150);Y.add(ia),Y.add(na),Y.add(oa);const ra=new hs(U*.07,12,12),la=new Ee({color:16777215});return Y.add(new q(ra,la)),Y},G=new Z;G.position.set(0,0,0),M.add(G);const O=W(.12);G.add(O),D.base_footprint=O;const V=new Z;V.position.copy(S(0,0,.06)),M.add(V);const se=W(.14);V.add(se),D.base_link=se;const B=new ht(.3,.14,.4),J=new xe({color:49382,metalness:.65,roughness:.25,envMapIntensity:1}),Q=new q(B,J);Q.position.set(0,.07,0),Q.castShadow=!0,Q.receiveShadow=!0,Q.userData={linkName:"base_link"},V.add(Q),k.push(Q);const Ge=new ht(.28,.005,.38),yt=new xe({color:1120295,roughness:.8}),We=new q(Ge,yt);We.position.set(0,.141,0),V.add(We),k.push(We);const tt=new ht(.22,.015,.005),st=new Ee({color:58879}),Be=new q(tt,st);Be.position.set(0,.04,-.201),V.add(Be),k.push(Be);const ae=new Z;ae.position.copy(S(0,.16,.06)),M.add(ae);const Ht=W(.09);ae.add(Ht),D.left_wheel_link=Ht;const bt=new Ce(.06,.06,.035,32);bt.rotateZ(Math.PI/2);const Vt=new xe({color:1579035,roughness:.9,metalness:.1}),at=new q(bt,Vt);at.castShadow=!0,at.userData={linkName:"left_wheel_link"},ae.add(at),k.push(at);const xt=new Ce(.038,.038,.036,16);xt.rotateZ(Math.PI/2);const Kt=new xe({color:3718648,metalness:.8,roughness:.3}),Qt=new q(xt,Kt);ae.add(Qt),k.push(Qt);const Ae=new Z;Ae.position.copy(S(0,-.16,.06)),M.add(Ae);const Yt=W(.09);Ae.add(Yt),D.right_wheel_link=Yt;const it=new q(bt,Vt);it.castShadow=!0,it.userData={linkName:"right_wheel_link"},Ae.add(it),k.push(it);const Xt=new q(xt,Kt);Ae.add(Xt),k.push(Xt);const nt=new Z;nt.position.copy(S(.14,0,.03)),M.add(nt);const Jt=W(.08);nt.add(Jt),D.front_caster_link=Jt;const Zt=new hs(.03,24,24),es=new xe({color:14870768,metalness:.95,roughness:.15}),ot=new q(Zt,es);ot.castShadow=!0,ot.userData={linkName:"front_caster_link"},nt.add(ot),k.push(ot);const rt=new Z;rt.position.copy(S(-.14,0,.03)),M.add(rt);const ts=W(.08);rt.add(ts),D.rear_caster_link=ts;const lt=new q(Zt,es);lt.castShadow=!0,lt.userData={linkName:"rear_caster_link"},rt.add(lt),k.push(lt);const $e=new Z;$e.position.copy(S(.08,0,.22)),M.add($e);const ss=W(.11);$e.add(ss),D.laser_frame=ss;const Vs=new Ce(.045,.045,.02,28),Ks=new xe({color:16347926,roughness:.4}),ct=new q(Vs,Ks);ct.position.y=-.01,ct.userData={linkName:"laser_frame"},$e.add(ct),k.push(ct);const Pe=new Z;$e.add(Pe);const Qs=new Ce(.04,.04,.025,28),Ys=new xe({color:1120295,roughness:.3,metalness:.5}),dt=new q(Qs,Ys);dt.position.y=.0125,dt.userData={linkName:"laser_frame"},Pe.add(dt),k.push(dt);const Xs=new Ce(.041,.041,.008,28),Js=new Ee({color:15680580}),_t=new q(Xs,Js);_t.position.y=.0125,Pe.add(_t),k.push(_t);const De=new Z;De.position.copy(S(.2,0,.08)),M.add(De);const as=W(.09);De.add(as),D.camera_link=as;const Zs=new ht(.09,.025,.025),ea=new xe({color:3223169,roughness:.4,metalness:.7}),pt=new q(Zs,ea);pt.castShadow=!0,pt.userData={linkName:"camera_link"},De.add(pt),k.push(pt);const jt=new Ce(.007,.007,.005,16);jt.rotateX(Math.PI/2);const is=new Ee({color:3718648}),St=new q(jt,is);St.position.set(-.025,0,-.013),De.add(St);const wt=new q(jt,is);wt.position.set(.025,0,-.013),De.add(wt),k.push(St,wt);const ta=[S(0,0,0),S(0,0,.06),S(0,0,.06),S(0,.16,.06),S(0,0,.06),S(0,-.16,.06),S(0,0,.06),S(.14,0,.03),S(0,0,.06),S(-.14,0,.03),S(0,0,.06),S(.08,0,.22),S(0,0,.06),S(.2,0,.08)],sa=new Fa().setFromPoints(ta),aa=new Oa({color:440020,dashSize:.025,gapSize:.015,linewidth:1.5,transparent:!0,opacity:.75}),kt=new Ga(sa,aa);kt.computeLineDistances(),y.add(kt),x.current={scene:y,camera:v,renderer:b,controls:r,animFrameId:null,tfGroups:D,visualMeshes:k,leftWheelGroup:ae,rightWheelGroup:Ae,lidarPuckGroup:Pe,treeLineMesh:kt,raycaster:new us},k.forEach(U=>{U.visible=u});const ns=()=>{x.current.animFrameId=requestAnimationFrame(ns),r.update(),Pe&&(Pe.rotation.y+=.04);const U={};Object.keys(He).forEach(Y=>{const Ie=D[Y];if(Ie){const de=new Le;Ie.getWorldPosition(de),de.y+=.025;const ie=de.project(v);if(ie.z<1){const ke=(ie.x*.5+.5)*f,X=(-(ie.y*.5)+.5)*_;U[Y]={x:ke,y:X,visible:!0}}else U[Y]={visible:!1}}}),m(U),b.render(y,v)};ns();const os=U=>{const Y=b.domElement.getBoundingClientRect(),Ie=(U.clientX-Y.left)/Y.width*2-1,de=-((U.clientY-Y.top)/Y.height)*2+1,ie=x.current.raycaster;ie.setFromCamera({x:Ie,y:de},v);const ke=ie.intersectObjects(k.filter(X=>X.visible),!0);if(ke.length>0){let X=ke[0].object;for(;X&&!X.userData.linkName&&X.parent;)X=X.parent;X&&X.userData.linkName&&i(X.userData.linkName)}};b.domElement.addEventListener("click",os);const rs=()=>{if(!h)return;const U=h.clientWidth;v.aspect=U/_,v.updateProjectionMatrix(),b.setSize(U,_)};return window.addEventListener("resize",rs),()=>{window.removeEventListener("resize",rs),x.current.animFrameId&&cancelAnimationFrame(x.current.animFrameId),b.domElement&&(b.domElement.removeEventListener("click",os),h.removeChild(b.domElement)),b.dispose()}},[]),c.useEffect(()=>{const{visualMeshes:h}=x.current;h&&h.forEach(f=>{f.visible=u})},[u]),c.useEffect(()=>{const{tfGroups:h}=x.current;h&&Object.values(h).forEach(f=>{f.visible=T})},[T]),c.useEffect(()=>{const{treeLineMesh:h}=x.current;h&&(h.visible=j)},[j]),c.useEffect(()=>{const{leftWheelGroup:h,rightWheelGroup:f}=x.current;!h||!f||(h.rotation.x=p,f.rotation.x=p)},[p]);const z=h=>{const{camera:f,controls:_}=x.current;!f||!_||(h==="iso"?(f.position.set(1.1,.9,1.2),_.target.set(0,.12,0)):h==="top"?(f.position.set(0,2,.001),_.target.set(0,0,0)):h==="front"?(f.position.set(0,.25,-1.5),_.target.set(0,.12,0)):h==="side"&&(f.position.set(-1.6,.25,0),_.target.set(0,.12,0)),_.update())},R=He[s]||He.base_link;return e.jsxs("div",{className:"interactive-urdf-viewer-container",style:{margin:"2rem 0",borderRadius:"14px",border:"1px solid var(--border-color)",overflow:"hidden",background:"#0a0f1d",boxShadow:"0 20px 40px rgba(0, 0, 0, 0.45)",fontFamily:"var(--font-sans, system-ui, sans-serif)"},children:[e.jsxs("div",{style:{background:"linear-gradient(135deg, rgba(6, 182, 212, 0.15) 0%, rgba(14, 165, 233, 0.08) 100%)",padding:"0.9rem 1.4rem",borderBottom:"1px solid rgba(255, 255, 255, 0.08)",display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:"0.75rem"},children:[e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"0.65rem"},children:[e.jsx("div",{style:{width:"32px",height:"32px",borderRadius:"8px",background:"rgba(6, 182, 212, 0.2)",border:"1px solid rgba(6, 182, 212, 0.4)",display:"flex",alignItems:"center",justifyContent:"center",color:"#06b6d4"},children:e.jsx(Oe,{size:18})}),e.jsxs("div",{children:[e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"0.5rem"},children:[e.jsx("span",{style:{fontSize:"0.72rem",fontWeight:700,textTransform:"uppercase",letterSpacing:"0.05em",color:"#06b6d4"},children:"Interactive 3D WebGL Digital Twin"}),e.jsx("span",{style:{fontSize:"0.68rem",padding:"1px 6px",borderRadius:"4px",background:"rgba(16, 185, 129, 0.15)",color:"#10b981",border:"1px solid rgba(16, 185, 129, 0.3)",fontWeight:600},children:"REP 103 TF ACTIVE"})]}),e.jsx("h3",{style:{margin:0,fontSize:"1.15rem",fontWeight:700,color:"#f8fafc"},children:"Nexus AMR — Live URDF & TF Kinematics Visualizer"})]})]}),e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"0.4rem"},children:[e.jsx("span",{style:{fontSize:"0.75rem",color:"#94a3b8",marginRight:"0.2rem"},children:"Views:"}),["iso","front","side","top"].map(h=>e.jsx("button",{onClick:()=>z(h),style:{background:"rgba(255, 255, 255, 0.05)",border:"1px solid rgba(255, 255, 255, 0.12)",color:"#cbd5e1",padding:"0.3rem 0.65rem",borderRadius:"6px",fontSize:"0.75rem",cursor:"pointer",fontWeight:600,textTransform:"capitalize",transition:"all 0.15s ease"},onMouseEnter:f=>f.currentTarget.style.background="rgba(6, 182, 212, 0.25)",onMouseLeave:f=>f.currentTarget.style.background="rgba(255, 255, 255, 0.05)",children:h==="iso"?"Isometric":h},h)),e.jsx("button",{onClick:()=>z("iso"),title:"Reset Camera View",style:{background:"rgba(255, 255, 255, 0.05)",border:"1px solid rgba(255, 255, 255, 0.12)",color:"#94a3b8",padding:"0.3rem 0.5rem",borderRadius:"6px",cursor:"pointer"},children:e.jsx(K,{size:14})})]})]}),e.jsxs("div",{style:{background:"rgba(15, 23, 42, 0.85)",padding:"0.6rem 1.2rem",borderBottom:"1px solid rgba(255, 255, 255, 0.06)",display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:"0.75rem",fontSize:"0.8rem"},children:[e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"0.85rem",flexWrap:"wrap"},children:[e.jsx("span",{style:{color:"#06b6d4",fontWeight:700,fontSize:"0.76rem",textTransform:"uppercase",letterSpacing:"0.04em"},children:"Display Toggles:"}),e.jsxs("label",{style:{display:"flex",alignItems:"center",gap:"0.35rem",color:"#cbd5e1",cursor:"pointer"},children:[e.jsx("input",{type:"checkbox",checked:u,onChange:h=>g(h.target.checked),style:{accentColor:"#06b6d4"}}),e.jsx("span",{style:{fontWeight:600},children:"Solid Bodies"})]}),e.jsxs("label",{style:{display:"flex",alignItems:"center",gap:"0.35rem",color:"#cbd5e1",cursor:"pointer"},children:[e.jsx("input",{type:"checkbox",checked:T,onChange:h=>w(h.target.checked),style:{accentColor:"#06b6d4"}}),e.jsx("span",{style:{fontWeight:600},children:"TF Trihedrons (REP 103)"})]}),e.jsxs("label",{style:{display:"flex",alignItems:"center",gap:"0.35rem",color:"#cbd5e1",cursor:"pointer"},children:[e.jsx("input",{type:"checkbox",checked:I,onChange:h=>N(h.target.checked),style:{accentColor:"#06b6d4"}}),e.jsx("span",{children:"Frame Badges"})]}),e.jsxs("label",{style:{display:"flex",alignItems:"center",gap:"0.35rem",color:"#cbd5e1",cursor:"pointer"},children:[e.jsx("input",{type:"checkbox",checked:j,onChange:h=>l(h.target.checked),style:{accentColor:"#06b6d4"}}),e.jsx("span",{children:"Kinematic Parent Lines"})]})]}),e.jsxs("div",{style:{fontSize:"0.74rem",color:"#94a3b8"},children:[e.jsx("span",{children:"Active Model: "}),e.jsx("span",{style:{color:"#38bdf8",fontFamily:"var(--font-mono)"},children:"nexus_amr.urdf.xacro"})]})]}),e.jsxs("div",{style:{position:"relative",width:"100%",height:"520px",overflow:"hidden"},children:[e.jsx("div",{ref:a,style:{width:"100%",height:"100%",cursor:"grab"}}),I&&T&&Object.keys(o).map(h=>{const f=o[h];if(!f||!f.visible)return null;const _=s===h;return e.jsx("div",{onClick:()=>i(h),style:{position:"absolute",left:`${f.x}px`,top:`${f.y}px`,transform:"translate(-50%, -100%)",background:_?"#06b6d4":"rgba(15, 23, 42, 0.85)",color:_?"#0a0f1d":"#f1f5f9",border:`1px solid ${_?"#22d3ee":"rgba(255, 255, 255, 0.2)"}`,backdropFilter:"blur(4px)",padding:"2px 7px",borderRadius:"4px",fontSize:"0.72rem",fontFamily:"var(--font-mono, monospace)",fontWeight:700,pointerEvents:"auto",cursor:"pointer",zIndex:_?20:10,boxShadow:_?"0 0 12px rgba(6, 182, 212, 0.6)":"0 2px 4px rgba(0,0,0,0.5)",transition:"background 0.15s ease, transform 0.15s ease",userSelect:"none"},children:h},h)}),e.jsxs("div",{style:{position:"absolute",top:"12px",left:"14px",width:"320px",background:"rgba(10, 15, 29, 0.88)",backdropFilter:"blur(10px)",border:"1px solid rgba(255, 255, 255, 0.12)",borderRadius:"10px",padding:"0.9rem 1.1rem",color:"#e2e8f0",fontSize:"0.8rem",pointerEvents:"auto",boxShadow:"0 8px 24px rgba(0, 0, 0, 0.6)",zIndex:15},children:[e.jsxs("div",{style:{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:"0.4rem"},children:[e.jsxs("span",{style:{fontSize:"0.7rem",textTransform:"uppercase",letterSpacing:"0.04em",fontWeight:700,color:R.color},children:["Link Inspector: ",R.category]}),e.jsx("span",{style:{fontFamily:"var(--font-mono, monospace)",fontSize:"0.72rem",color:"#94a3b8",background:"rgba(255,255,255,0.06)",padding:"1px 6px",borderRadius:"4px"},children:R.jointType})]}),e.jsxs("h4",{style:{margin:"0 0 0.5rem 0",fontSize:"1.05rem",fontWeight:700,color:"#38bdf8",fontFamily:"var(--font-mono, monospace)",display:"flex",alignItems:"center",gap:"0.4rem"},children:[e.jsx("span",{children:"🔗"})," ",R.name]}),e.jsxs("div",{style:{display:"grid",gridTemplateColumns:"85px 1fr",gap:"0.3rem",fontSize:"0.76rem",marginBottom:"0.55rem"},children:[e.jsx("span",{style:{color:"#94a3b8"},children:"Parent Joint:"}),e.jsx("span",{style:{fontFamily:"var(--font-mono)",color:"#cbd5e1"},children:R.parentJoint}),e.jsx("span",{style:{color:"#94a3b8"},children:"ROS Position:"}),e.jsxs("span",{style:{fontFamily:"var(--font-mono)",color:"#f59e0b"},children:["[",R.rosPos.map(h=>h.toFixed(2)).join(", "),"] m"]}),R.axis&&e.jsxs(e.Fragment,{children:[e.jsx("span",{style:{color:"#94a3b8"},children:"Revolute Axis:"}),e.jsx("span",{style:{fontFamily:"var(--font-mono)",color:"#10b981"},children:R.axis})]}),e.jsx("span",{style:{color:"#94a3b8"},children:"Mass (kg):"}),e.jsx("span",{style:{fontFamily:"var(--font-mono)",color:"#cbd5e1"},children:R.mass}),e.jsx("span",{style:{color:"#94a3b8"},children:"Inertia Tensor:"}),e.jsx("span",{style:{fontFamily:"var(--font-mono)",color:"#94a3b8"},children:R.inertia})]}),e.jsx("p",{style:{margin:0,fontSize:"0.74rem",color:"#94a3b8",lineHeight:1.45,borderTop:"1px solid rgba(255,255,255,0.08)",paddingTop:"0.45rem"},children:R.description})]}),e.jsxs("div",{style:{position:"absolute",bottom:"12px",left:"14px",background:"rgba(10, 15, 29, 0.85)",backdropFilter:"blur(8px)",border:"1px solid rgba(255, 255, 255, 0.12)",borderRadius:"8px",padding:"0.55rem 0.9rem",display:"flex",alignItems:"center",gap:"0.85rem",fontSize:"0.75rem",fontFamily:"var(--font-mono, monospace)",zIndex:15},children:[e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"0.35rem"},children:[e.jsx("span",{style:{width:"9px",height:"9px",borderRadius:"50%",background:"#ef4444"}}),e.jsx("strong",{style:{color:"#ef4444"},children:"+X: Forward"})]}),e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"0.35rem"},children:[e.jsx("span",{style:{width:"9px",height:"9px",borderRadius:"50%",background:"#10b981"}}),e.jsx("strong",{style:{color:"#10b981"},children:"+Y: Port Left"})]}),e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"0.35rem"},children:[e.jsx("span",{style:{width:"9px",height:"9px",borderRadius:"50%",background:"#3b82f6"}}),e.jsx("strong",{style:{color:"#3b82f6"},children:"+Z: Upward"})]})]}),e.jsxs("div",{style:{position:"absolute",bottom:"12px",right:"14px",background:"rgba(10, 15, 29, 0.88)",backdropFilter:"blur(8px)",border:"1px solid rgba(255, 255, 255, 0.12)",borderRadius:"8px",padding:"0.65rem 1rem",display:"flex",alignItems:"center",gap:"0.8rem",zIndex:15},children:[e.jsx(Ze,{size:16,color:"#06b6d4"}),e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"0.2rem"},children:[e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",fontSize:"0.72rem",color:"#cbd5e1"},children:[e.jsx("span",{children:"Drive Joint Angle:"}),e.jsxs("span",{style:{fontFamily:"var(--font-mono)",color:"#06b6d4",fontWeight:700},children:[(p*180/Math.PI).toFixed(0),"°"]})]}),e.jsx("input",{type:"range",min:-Math.PI*2,max:Math.PI*2,step:.05,value:p,onChange:h=>n(parseFloat(h.target.value)),style:{width:"130px",accentColor:"#06b6d4"}})]}),e.jsx("button",{onClick:()=>n(0),title:"Reset Wheel Angle",style:{background:"rgba(255, 255, 255, 0.08)",border:"1px solid rgba(255,255,255,0.15)",color:"#94a3b8",padding:"0.25rem 0.5rem",borderRadius:"4px",cursor:"pointer",fontSize:"0.7rem"},children:"Reset"})]}),e.jsx("div",{style:{position:"absolute",top:"12px",right:"14px",background:"rgba(10, 15, 29, 0.7)",border:"1px solid rgba(255, 255, 255, 0.08)",borderRadius:"6px",padding:"3px 8px",fontSize:"0.7rem",color:"#64748b",pointerEvents:"none",zIndex:10},children:"🖱️ Left Click: Rotate • Right Click: Pan • Scroll: Zoom"})]}),e.jsxs("div",{style:{background:"rgba(15, 23, 42, 0.95)",padding:"0.65rem 1.2rem",borderTop:"1px solid rgba(255, 255, 255, 0.08)",display:"flex",alignItems:"center",gap:"0.45rem",overflowX:"auto",scrollbarWidth:"thin"},children:[e.jsx("span",{style:{fontSize:"0.74rem",color:"#94a3b8",flexShrink:0,marginRight:"0.3rem"},children:"Kinematic Links:"}),Object.keys(He).map(h=>{const f=s===h,_=He[h];return e.jsxs("button",{onClick:()=>i(h),style:{background:f?"rgba(6, 182, 212, 0.2)":"rgba(255, 255, 255, 0.04)",border:`1px solid ${f?"#06b6d4":"rgba(255, 255, 255, 0.1)"}`,color:f?"#38bdf8":"#94a3b8",borderRadius:"6px",padding:"0.25rem 0.6rem",fontSize:"0.74rem",fontFamily:"var(--font-mono, monospace)",fontWeight:f?700:500,cursor:"pointer",flexShrink:0,display:"flex",alignItems:"center",gap:"0.35rem",transition:"all 0.15s ease"},children:[e.jsx("span",{style:{width:"6px",height:"6px",borderRadius:"50%",background:_.color}}),h]},h)})]})]})}function ri({lesson:a,onSelectLesson:s,onNavigateHub:i,isCompleted:u,onToggleComplete:g,savedScore:T,onRecordScore:w}){const I=c.useRef(null),[N,j]=c.useState(null),[l,p]=c.useState(null),[n,o]=c.useState(null),[m,x]=c.useState(null),[S,z]=c.useState(null),[R,h]=c.useState(null),[f,_]=c.useState(null),[y,v]=c.useState(null),[b,r]=c.useState(null),[d,C]=c.useState(null);return c.useEffect(()=>{const P=E=>{const L=E.target.closest("img");if(L){if(L.closest(".image-lightbox-overlay")||L.closest(".nav-logo")||L.closest(".status-icon")||L.closest(".user-avatar"))return;E.preventDefault(),E.stopPropagation(),C({src:L.currentSrc||L.src,alt:L.alt||"High-Resolution Diagram View",caption:L.getAttribute("title")||L.alt||""})}},A=E=>{E.key==="Escape"&&C(null)};return document.addEventListener("click",P),window.addEventListener("keydown",A),()=>{document.removeEventListener("click",P),window.removeEventListener("keydown",A)}},[]),c.useEffect(()=>(d?document.body.style.overflow="hidden":document.body.style.overflow="",()=>{document.body.style.overflow=""}),[d]),c.useEffect(()=>{j(null),p(null),o(null),x(null),z(null),h(null),_(null),v(null),r(null),j(document.getElementById("interactive-permission-calculator-root")),p(document.getElementById("turtlesim-teleop-flow-root")),o(document.getElementById("package-structure-flow-root")),x(document.getElementById("pubsub-flow-root")),z(document.getElementById("service-flow-root")),h(document.getElementById("action-flow-root")),_(document.getElementById("log-levels-circle-root")),v(document.getElementById("interactive-inertia-calculator-root")),r(document.getElementById("interactive-urdf-viewer-root"))},[a.id,a.html_content]),c.useEffect(()=>{window.scrollTo({top:0,behavior:"smooth"})},[a.id]),c.useEffect(()=>{if(!I.current)return;I.current.querySelectorAll("img").forEach(E=>{E.classList.add("lesson-image");const L=E.parentElement;L&&L.tagName.toLowerCase()==="p"&&L.classList.add("lesson-image-wrapper")}),I.current.querySelectorAll("pre").forEach(E=>{let L=E.querySelector("code");if(!L){const G=document.createElement("code");G.innerHTML=E.innerHTML,E.innerHTML="",E.appendChild(G),L=G}let F=E.closest(".ide-code-window");const $=E.closest(".code-container");let M="code";if(L.classList.forEach(G=>{G.startsWith("language-")&&(M=G.replace("language-","").toLowerCase())}),M==="code"&&$&&$.getAttribute("data-language")&&(M=$.getAttribute("data-language").toLowerCase()),!L.classList.contains("hljs")&&M!=="filepath"&&M!=="text"){const G=L.textContent||"";if(M&&Ne.getLanguage(M))try{const O=Ne.highlight(G,{language:M,ignoreIllegals:!0});L.innerHTML=O.value,L.classList.add("hljs")}catch{Ne.highlightElement(L)}else Ne.highlightElement(L)}if(!F)if($)$.classList.add("ide-code-window"),F=$;else{const G=document.createElement("div");G.className="ide-code-window",E.parentNode.insertBefore(G,E),G.appendChild(E),F=G}let k=F.querySelector(".ide-header, .code-header");k?k.className="ide-header":(k=document.createElement("div"),k.className="ide-header",F.insertBefore(k,E));const D=M==="bash"?"bash — terminal":M==="filepath"?"filepath — workspace":M==="python"?"python — script":M==="json"?"json — config":M==="xml"?"xml / urdf":M==="yaml"?"yaml — config":M==="text"?"output / log":M,W=M==="bash"?"❯_":M==="filepath"?"📁":M==="python"?"🐍":M==="json"?"{ }":M==="xml"?"</>":M==="yaml"?"⚙️":M==="text"?"📋":"📄";k.innerHTML=`
        <div class="ide-controls">
          <span class="ide-dot ide-dot-red"></span>
          <span class="ide-dot ide-dot-yellow"></span>
          <span class="ide-dot ide-dot-green"></span>
        </div>
        <div class="ide-tab">
          <span class="ide-tab-icon">${W}</span>
          <span class="ide-tab-name">${D}</span>
        </div>
        <button class="copy-code-btn" title="Copy code snippet">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
          </svg>
          <span>Copy</span>
        </button>
      `})},[a.id,a.html_content]),c.useEffect(()=>{if(!I.current)return;const P=L=>{const F=L.target.closest(".copy-code-btn, .copy-btn");if(!F)return;const $=F.closest(".ide-code-window")||F.closest(".code-container")||F.closest("pre"),M=$?$.querySelector("code"):null;if(!M)return;const k=M.textContent||M.innerText;navigator.clipboard.writeText(k).catch(()=>{}),fetch("/api/clipboard",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({text:k})}).catch(()=>{});const D=F.innerHTML;F.innerHTML="✅ Copied!",F.classList.add("copied"),setTimeout(()=>{F.innerHTML=D,F.classList.remove("copied")},2e3)},A=L=>{const F=L.target.closest(".internal-lesson-link");if(!F)return;L.preventDefault();const $=F.getAttribute("data-lesson");$&&s(`lesson_${$}`)},E=I.current;return E.addEventListener("click",P),E.addEventListener("click",A),()=>{E.removeEventListener("click",P),E.removeEventListener("click",A)}},[a.id,s]),e.jsxs("div",{className:"lesson-view-container fade-in",children:[e.jsxs("nav",{className:"lesson-breadcrumbs",children:[e.jsx("button",{onClick:i,className:"breadcrumb-btn",children:"Curriculum Hub"}),e.jsx("span",{className:"breadcrumb-sep",children:"/"}),e.jsx("span",{className:"breadcrumb-module",children:a.module}),e.jsx("span",{className:"breadcrumb-sep",children:"/"}),e.jsxs("span",{className:"breadcrumb-active",children:["Lesson ",a.num_str]})]}),e.jsxs("header",{className:"lesson-main-header",children:[e.jsxs("div",{className:"lesson-header-meta",children:[e.jsx("span",{className:"module-badge",children:a.module}),e.jsxs("span",{className:"duration-badge",children:[e.jsx(Ls,{size:13}),e.jsx("span",{children:a.duration})]}),e.jsx("span",{className:"level-badge",children:"ROS 2 Jazzy"})]}),e.jsxs("div",{className:"lesson-title-action-row",children:[e.jsxs("h1",{className:"lesson-main-title",children:[e.jsxs("span",{className:"title-num",children:["Lesson ",a.num_str,":"]})," ",a.title]}),e.jsxs("button",{onClick:()=>g(a.id),className:`lesson-complete-toggle-btn ${u?"completed":""}`,title:u?"Lesson marked complete. Click to uncheck.":"Click to mark lesson complete",children:[u?e.jsx(Ve,{size:18}):e.jsx(Rs,{size:18}),e.jsx("span",{children:u?"Completed":"Mark as Complete"})]})]}),a.focus&&e.jsxs("div",{className:"lesson-focus-card",children:[e.jsx("strong",{children:"Focus:"})," ",a.focus]})]}),a.snapshot&&a.snapshot.length>0&&e.jsxs("div",{className:"concept-snapshot-card",children:[e.jsxs("div",{className:"snapshot-header",children:[e.jsx(et,{size:18,className:"zap-icon"}),e.jsx("h3",{children:"Quick Concept Snapshot"})]}),e.jsx("ul",{className:"snapshot-list",children:a.snapshot.map((P,A)=>Array.isArray(P)?e.jsxs("li",{children:[e.jsxs("strong",{children:[P[0],":"]})," ",P[1]]},A):e.jsx("li",{children:P},A))})]}),(()=>{const P=It[a.id];return P?e.jsx(Je.Suspense,{fallback:e.jsx("div",{className:"lesson-loading-spinner",style:{padding:"3rem",textAlign:"center",color:"var(--text-muted)"},children:e.jsx("p",{children:"Loading interactive lesson..."})}),children:e.jsx(P,{})}):e.jsx("article",{ref:I,className:"markdown-body lesson-body-content",dangerouslySetInnerHTML:{__html:a.html_content}})})(),N&&!It[a.id]&&ne.createPortal(e.jsx(Fs,{}),N),l&&!It[a.id]&&ne.createPortal(e.jsx(Os,{}),l),n&&ne.createPortal(e.jsx(Gs,{}),n),m&&ne.createPortal(e.jsx(Ws,{}),m),S&&ne.createPortal(e.jsx(Bs,{}),S),R&&ne.createPortal(e.jsx($s,{}),R),b&&ne.createPortal(e.jsx(Hs,{}),b),y&&ne.createPortal(e.jsx(Us,{}),y),f&&ne.createPortal(e.jsx(qs,{}),f),a.has_quiz&&e.jsx("section",{className:"lesson-quiz-section",children:e.jsx(ii,{lessonId:a.id,quizzes:a.quizzes,savedScore:T,onRecordScore:w})}),e.jsxs("section",{className:"lesson-bottom-completion-card",style:{margin:"2.5rem 0 1rem",padding:"1.5rem 1.75rem",borderRadius:"14px",background:u?"rgba(16, 185, 129, 0.08)":"var(--bg-surface)",border:u?"1px solid rgba(16, 185, 129, 0.3)":"1px solid var(--border-color)",display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:"1.25rem",boxShadow:"var(--shadow-sm)"},children:[e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"1rem"},children:[e.jsx("div",{style:{width:44,height:44,borderRadius:"10px",background:u?"var(--success)":"var(--bg-sidebar)",color:u?"#fff":"var(--accent-primary)",display:"flex",alignItems:"center",justifyContent:"center"},children:u?e.jsx(Ve,{size:22}):e.jsx($t,{size:22})}),e.jsxs("div",{children:[e.jsx("h4",{style:{margin:"0 0 3px",fontSize:"1.05rem",fontWeight:800,color:"var(--text-primary)"},children:u?"✓ Lesson Completed":"Completed this Lesson?"}),e.jsx("p",{style:{margin:0,fontSize:"0.86rem",color:"var(--text-secondary)"},children:u?"Your completion is marked and saved in your local progress tracker.":"Click below to mark complete and automatically advance to the next module."})]})]}),e.jsx("div",{style:{display:"flex",alignItems:"center",gap:"0.75rem"},children:u?e.jsxs(e.Fragment,{children:[e.jsxs("button",{onClick:()=>g(a.id),className:"lesson-complete-toggle-btn completed",title:"Click to unmark as complete",style:{padding:"0.65rem 1.1rem",borderRadius:"8px"},children:[e.jsx(Ve,{size:17}),e.jsx("span",{children:"Marked Complete (Click to Undo)"})]}),a.next_id&&e.jsxs("button",{onClick:()=>s(a.next_id),className:"lesson-nav-btn next",style:{padding:"0.65rem 1.25rem"},children:[e.jsx("span",{children:a.next_id==="feedback"?"Course Feedback & Survey":"Next Lesson"}),e.jsx(_e,{size:16})]})]}):e.jsxs("button",{onClick:()=>{g(a.id),a.next_id?s(a.next_id):i()},style:{display:"inline-flex",alignItems:"center",gap:"8px",background:"var(--success)",color:"#ffffff",border:"none",padding:"0.75rem 1.5rem",borderRadius:"8px",fontWeight:800,fontSize:"0.92rem",cursor:"pointer",boxShadow:"0 2px 8px rgba(16, 185, 129, 0.35)",transition:"all 0.15s ease"},className:"btn-complete-and-advance",children:[e.jsx(Ve,{size:18}),e.jsx("span",{children:a.next_id==="feedback"?"Mark Complete & Course Feedback":a.next_id?"Mark as Complete & Next Module":"Mark as Complete & Finish"}),e.jsx(_e,{size:18})]})})]}),e.jsxs("footer",{className:"lesson-navigation-footer",children:[a.prev_id?e.jsxs("button",{onClick:()=>s(a.prev_id),className:"lesson-nav-btn prev",children:[e.jsx(Fe,{size:16}),e.jsx("span",{children:"Previous Lesson"})]}):e.jsx("div",{style:{width:"130px"}}),e.jsxs("button",{onClick:i,className:"lesson-nav-btn hub",children:[e.jsx(Oe,{size:16}),e.jsx("span",{children:"Course Hub"})]}),a.next_id?e.jsxs("button",{onClick:()=>s(a.next_id),className:"lesson-nav-btn next",children:[e.jsx("span",{children:a.next_id==="feedback"?"Course Feedback":"Next Lesson"}),e.jsx(_e,{size:16})]}):e.jsx("div",{style:{width:"130px"}})]}),d&&typeof document<"u"&&ne.createPortal(e.jsxs("div",{className:"image-lightbox-overlay",onClick:()=>C(null),role:"dialog","aria-modal":"true",children:[e.jsx("div",{className:"image-lightbox-backdrop"}),e.jsxs("div",{className:"image-lightbox-container",onClick:P=>P.stopPropagation(),children:[e.jsxs("div",{className:"image-lightbox-header",children:[e.jsx("span",{className:"image-lightbox-title",children:d.alt||"High-Resolution Diagram Preview"}),e.jsx("button",{type:"button",className:"image-lightbox-close-btn",onClick:()=>C(null),title:"Close full-screen image preview (ESC)",children:e.jsx(Ye,{size:20})})]}),e.jsx("div",{className:"image-lightbox-body",children:e.jsx("img",{src:d.src,alt:d.alt,className:"image-lightbox-img"})}),d.caption&&e.jsx("div",{className:"image-lightbox-caption",children:d.caption})]})]}),document.body)]})}const js="nexus_amr_l1_submitted_feedback",li="navpro_l1_submitted_feedback";function ci({studentInfo:a,onSubmitFeedback:s}){const[i,u]=c.useState(5),[g,T]=c.useState(0),[w,I]=c.useState("Module 4: Autonomous Navigation with Nav2"),[N,j]=c.useState(""),[l,p]=c.useState(!1),[n,o]=c.useState(!1),[m,x]=c.useState(null);c.useEffect(()=>{try{const f=localStorage.getItem(js)||localStorage.getItem(li);if(f){const _=JSON.parse(f);x(_),o(!0),_.rating&&u(_.rating),_.favorite_module&&I(_.favorite_module),_.feedback_text&&j(_.feedback_text)}}catch{}},[]);const S={1:"Needs Improvement",2:"Fair",3:"Good",4:"Very Good",5:"Outstanding / Excellent! 🚀"},z=["Module 1: Foundations & Core Middleware (Linux, ROS 2, Workspace & Packages)","Module 2: Core ROS 2 Mechanics & Communication (Pub/Sub, Services, Params, Actions, Bags, CLI)","Module 3: 3D Robot Modeling & Physics Simulation (URDF, Xacro, RViz2, Gazebo, Worlds)","Module 4: Autonomous Navigation with Nav2 (SLAM Toolbox, Costmaps, Planners, Behavior Trees, Nav2 Simple Commander, Physical Deployment)"],R=async f=>{if(f.preventDefault(),!N.trim())return;if(p(!0),s)try{await s(i,w,N)}catch(y){console.warn("Feedback sync error:",y)}p(!1);const _={student_id:(a==null?void 0:a.student_id)||(a==null?void 0:a.email_roll)||"student_guest",student_name:(a==null?void 0:a.name)||"Student",rating:i,favorite_module:w,feedback_text:N,timestamp:Date.now()};localStorage.setItem(js,JSON.stringify(_)),x(_),o(!0)},h=()=>{o(!1)};return e.jsxs("div",{className:"feedback-form-card",children:[e.jsxs("div",{className:"feedback-form-header",children:[e.jsx("div",{className:"header-icon-wrap",children:e.jsx(qt,{size:26,className:"award-icon"})}),e.jsxs("div",{className:"header-text-wrap",children:[e.jsxs("div",{className:"header-badge-row",children:[e.jsx("span",{className:"badge-capstone",children:"Capstone Survey"}),e.jsx("span",{className:"badge-live",children:"Synced to Instructor"})]}),e.jsx("h3",{className:"feedback-main-title",children:"Workshop Experience & Student Feedback"}),e.jsx("p",{className:"feedback-main-subtitle",children:"Congratulations on reaching the final stage of Level 1! Your feedback helps us fine-tune hands-on robotics exercises and improve future workshop tracks."})]})]}),n?e.jsx("div",{className:"feedback-success-banner fade-in",children:e.jsxs("div",{className:"success-banner-content",children:[e.jsx("div",{className:"success-icon-badge",children:e.jsx(H,{size:36,color:"#10b981"})}),e.jsxs("div",{className:"success-copy",children:[e.jsxs("h4",{children:["Thank you, ",(m==null?void 0:m.student_name)||"Robotics Engineer","!"]}),e.jsx("p",{children:"Your feedback and ratings have been saved and transmitted to the instructor central server."}),e.jsxs("div",{className:"submitted-summary-box",children:[e.jsxs("div",{className:"summary-rating",children:[e.jsx("span",{className:"summary-label",children:"Your Rating:"}),e.jsxs("div",{className:"star-row",children:[[1,2,3,4,5].map(f=>e.jsx(Rt,{size:18,fill:f<=((m==null?void 0:m.rating)||i)?"#f59e0b":"none",color:"#f59e0b"},f)),e.jsxs("span",{className:"rating-tag",children:["(",(m==null?void 0:m.rating)||i," / 5)"]})]})]}),e.jsxs("div",{className:"summary-module",children:[e.jsx("span",{className:"summary-label",children:"Favorite Module:"}),e.jsx("span",{className:"summary-val",children:(m==null?void 0:m.favorite_module)||w})]}),(m==null?void 0:m.feedback_text)&&e.jsxs("div",{className:"summary-quote",children:['"',m.feedback_text,'"']})]}),e.jsxs("button",{type:"button",onClick:h,className:"btn-edit-feedback",children:[e.jsx(Ms,{size:14}),e.jsx("span",{children:"Update or Edit Response"})]})]})]})}):e.jsxs("form",{onSubmit:R,className:"feedback-form-body",children:[e.jsxs("div",{className:"feedback-section-row",children:[e.jsxs("label",{className:"section-label",children:[e.jsx(Rt,{size:16,className:"label-icon"}),e.jsx("span",{children:"Overall Workshop Rating"})]}),e.jsxs("div",{className:"star-picker-container",children:[e.jsx("div",{className:"star-picker-row",children:[1,2,3,4,5].map(f=>e.jsx("button",{type:"button",className:`star-choice-btn ${f<=(g||i)?"active":""}`,onMouseEnter:()=>T(f),onMouseLeave:()=>T(0),onClick:()=>u(f),"aria-label":`Rate ${f} stars`,children:e.jsx(Rt,{size:32,fill:f<=(g||i)?"#f59e0b":"none",color:"#f59e0b",className:"star-svg"})},f))}),e.jsx("span",{className:"star-score-indicator",children:S[g||i]})]})]}),e.jsxs("div",{className:"feedback-section-row",children:[e.jsxs("label",{className:"section-label",children:[e.jsx(te,{size:16,className:"label-icon"}),e.jsx("span",{children:"Which module was your favorite or most valuable?"})]}),e.jsx("select",{value:w,onChange:f=>I(f.target.value),className:"feedback-select-input",children:z.map((f,_)=>e.jsx("option",{value:f,children:f},_))})]}),e.jsxs("div",{className:"feedback-section-row",children:[e.jsxs("label",{className:"section-label",children:[e.jsx(zs,{size:16,className:"label-icon"}),e.jsx("span",{children:"What did you enjoy most? Any suggestions for the instructor?"})]}),e.jsx("textarea",{required:!0,rows:4,value:N,onChange:f=>j(f.target.value),placeholder:"e.g., The hands-on autonomous navigation patrol with Nav2 Simple Commander was awesome! The line-by-line code breakdowns really helped me understand how ROS 2 lifecycle states work under the hood...",className:"feedback-textarea-input"})]}),e.jsxs("div",{className:"feedback-submit-row",children:[e.jsx("div",{className:"feedback-privacy-note",children:e.jsx("span",{children:"🔒 Submissions are delivered to the instructor dashboard with your student ID."})}),e.jsxs("button",{type:"submit",disabled:l||!N.trim(),className:"btn-submit-feedback",children:[e.jsx(ve,{size:16}),e.jsx("span",{children:l?"Submitting Feedback...":"Submit Feedback to Instructor"})]})]})]})]})}function di({onNavigateHub:a,onSelectLesson:s,studentInfo:i,onSubmitFeedback:u,completedCount:g=23,totalLessons:T=23}){return c.useEffect(()=>{window.scrollTo({top:0,behavior:"smooth"})},[]),e.jsxs("div",{className:"lesson-view-container feedback-view-container fade-in",children:[e.jsxs("nav",{className:"lesson-breadcrumbs",children:[e.jsx("button",{onClick:a,className:"breadcrumb-btn",children:"Curriculum Hub"}),e.jsx("span",{className:"breadcrumb-sep",children:"/"}),e.jsx("span",{className:"breadcrumb-module",children:"Capstone Milestones"}),e.jsx("span",{className:"breadcrumb-sep",children:"/"}),e.jsx("span",{className:"breadcrumb-active",children:"Course Feedback & Survey"})]}),e.jsxs("section",{className:"feedback-milestone-hero",style:{margin:"1.5rem 0 2rem",padding:"2rem 2.25rem",borderRadius:"18px",background:"linear-gradient(135deg, rgba(37, 99, 235, 0.08) 0%, rgba(16, 185, 129, 0.08) 100%)",border:"1px solid var(--border-color)",boxShadow:"var(--shadow-sm)"},children:[e.jsxs("div",{style:{display:"flex",alignItems:"flex-start",gap:"1.25rem",flexWrap:"wrap"},children:[e.jsx("div",{style:{width:56,height:56,borderRadius:"16px",background:"linear-gradient(135deg, #2563eb 0%, #10b981 100%)",color:"#ffffff",display:"flex",alignItems:"center",justifyContent:"center",boxShadow:"0 4px 16px rgba(37, 99, 235, 0.35)",flexShrink:0},children:e.jsx(qt,{size:32})}),e.jsxs("div",{style:{flex:1,minWidth:"260px"},children:[e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"8px",marginBottom:"6px"},children:[e.jsx("span",{style:{background:"#dbeafe",color:"#1d4ed8",fontSize:"0.75rem",fontWeight:800,padding:"3px 10px",borderRadius:"6px",textTransform:"uppercase",letterSpacing:"0.05em"},children:"Curriculum Capstone"}),e.jsxs("span",{style:{background:"#dcfce7",color:"#15803d",fontSize:"0.75rem",fontWeight:700,padding:"3px 10px",borderRadius:"6px"},children:[g," / ",T," Lessons Completed"]})]}),e.jsx("h1",{style:{margin:"0 0 8px",fontSize:"1.65rem",fontWeight:850,color:"var(--text-primary)",letterSpacing:"-0.02em"},children:"Level 1: Zero-to-Autonomous AMR Engineer"}),e.jsx("p",{style:{margin:0,fontSize:"0.94rem",color:"var(--text-secondary)",lineHeight:1.6},children:"Congratulations on completing the curriculum! You have developed real engineering competency across Linux systems, ROS 2 Jazzy DDS communication, custom interfaces, URDF 3D simulation, SLAM Toolbox, Nav2 autonomous navigation, and physical AMR deployment. Your feedback helps shape upcoming robotics courses."})]})]}),e.jsxs("div",{style:{display:"grid",gridTemplateColumns:"repeat(auto-fit, minmax(200px, 1fr))",gap:"1rem",marginTop:"1.75rem",paddingTop:"1.5rem",borderTop:"1px solid var(--border-color)"},children:[e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"10px"},children:[e.jsx(je,{size:18,style:{color:"#2563eb"}}),e.jsxs("div",{children:[e.jsx("div",{style:{fontWeight:700,fontSize:"0.86rem",color:"var(--text-primary)"},children:"Module 1"}),e.jsx("div",{style:{fontSize:"0.76rem",color:"var(--text-muted)"},children:"Linux & ROS 2 Middleware"})]})]}),e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"10px"},children:[e.jsx(Te,{size:18,style:{color:"#0ea5e9"}}),e.jsxs("div",{children:[e.jsx("div",{style:{fontWeight:700,fontSize:"0.86rem",color:"var(--text-primary)"},children:"Module 2"}),e.jsx("div",{style:{fontSize:"0.76rem",color:"var(--text-muted)"},children:"Actions, Services & Bags"})]})]}),e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"10px"},children:[e.jsx(Ts,{size:18,style:{color:"#8b5cf6"}}),e.jsxs("div",{children:[e.jsx("div",{style:{fontWeight:700,fontSize:"0.86rem",color:"var(--text-primary)"},children:"Module 3"}),e.jsx("div",{style:{fontSize:"0.76rem",color:"var(--text-muted)"},children:"URDF & Gazebo Simulation"})]})]}),e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"10px"},children:[e.jsx(Gt,{size:18,style:{color:"#10b981"}}),e.jsxs("div",{children:[e.jsx("div",{style:{fontWeight:700,fontSize:"0.86rem",color:"var(--text-primary)"},children:"Module 4"}),e.jsx("div",{style:{fontSize:"0.76rem",color:"var(--text-muted)"},children:"Nav2 & Physical Deployment"})]})]})]})]}),e.jsx("section",{className:"feedback-form-section",children:e.jsx(ci,{studentInfo:i||{},onSubmitFeedback:u})}),e.jsxs("footer",{className:"lesson-navigation-footer",style:{marginTop:"3rem"},children:[e.jsxs("button",{onClick:()=>s("lesson_23"),className:"lesson-nav-btn prev",children:[e.jsx(Fe,{size:16}),e.jsx("span",{children:"← Lesson 23: Physical Robot Hardware Deployment"})]}),e.jsxs("button",{onClick:a,className:"lesson-nav-btn hub",children:[e.jsx(Oe,{size:16}),e.jsx("span",{children:"Curriculum Hub Overview"})]})]})]})}function pi({isOpen:a,onClose:s}){const[i,u]=c.useState(()=>{try{return localStorage.getItem("navpro_show_ppt")!=="false"}catch{return!0}}),g=()=>{const T=!i;u(T);try{localStorage.setItem("navpro_show_ppt",T?"true":"false"),window.dispatchEvent(new StorageEvent("storage",{key:"navpro_show_ppt",newValue:T?"true":"false"}))}catch{}};return a?e.jsx("div",{className:"modal-overlay fade-in",onClick:s,children:e.jsxs("div",{className:"modal-card help-modal-card",onClick:T=>T.stopPropagation(),children:[e.jsxs("div",{className:"modal-header",children:[e.jsxs("div",{className:"modal-title-wrap",children:[e.jsx(ft,{size:22,className:"modal-title-icon"}),e.jsxs("div",{children:[e.jsx("h3",{children:"Help • Persistence, Resets & Troubleshooting"}),e.jsx("span",{className:"modal-subtitle",children:"Guide to local workspace storage, progress resets, and Docker lifecycle"})]})]}),e.jsx("button",{className:"modal-close-btn",onClick:s,"aria-label":"Close help",children:e.jsx(Ye,{size:18})})]}),e.jsxs("div",{className:"modal-body help-modal-body",children:[e.jsxs("div",{className:"help-section",children:[e.jsxs("div",{className:"help-section-title",children:[e.jsx($a,{size:18,className:"help-section-icon"}),e.jsx("h4",{children:"1. How Data & Workspace Storage Persist"})]}),e.jsxs("p",{children:["Your progress and code are engineered to ",e.jsx("strong",{children:"survive PC reboots, browser restarts, and container restarts"})," without cloud reliance:"]}),e.jsxs("ul",{className:"help-bullets",children:[e.jsxs("li",{children:[e.jsx("strong",{children:"Student Attendance & Profile:"})," Stored permanently in your browser's ",e.jsx("code",{children:"localStorage"}),". Opening the LMS tomorrow will remember your name and organization."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Curriculum Checklist & Quizzes:"})," Every lesson checkbox and quiz score is saved in ",e.jsx("code",{children:"localStorage"}),"."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Robotics Code in VS Code:"})," The ",e.jsx("code",{children:"ros2_ws/"})," folder is mounted directly from your host filesystem. Your custom Python nodes and launch files persist on your physical hard drive."]})]})]}),e.jsxs("div",{className:"help-section",children:[e.jsxs("div",{className:"help-section-title",children:[e.jsx(K,{size:18,className:"help-section-icon"}),e.jsx("h4",{children:"2. How to Reset Curriculum Progress"})]}),e.jsx("p",{children:"If you want to practice again from a fresh slate:"}),e.jsxs("div",{className:"help-step-box",children:[e.jsx("strong",{children:"Option A: One-Click UI Reset"}),e.jsxs("p",{children:["Click the ",e.jsx("code",{children:"↺ Reset Checklist"})," button at the top of the left sidebar. It will clear all completed lesson marks and quiz scores after confirmation."]})]}),e.jsxs("div",{className:"help-step-box",children:[e.jsx("strong",{children:"Option B: Hard Browser Reset"}),e.jsxs("p",{children:["Open Browser DevTools (",e.jsx("code",{children:"F12"}),") → Console → run ",e.jsx("code",{children:"localStorage.clear()"})," → refresh the page."]})]})]}),e.jsxs("div",{className:"help-section",children:[e.jsxs("div",{className:"help-section-title",children:[e.jsx(qa,{size:18,className:"help-section-icon"}),e.jsx("h4",{children:"3. How to Restart & Reset Docker"})]}),e.jsx("p",{children:"If a simulation crashes, a port locks, or you need a clean container environment:"}),e.jsxs("div",{className:"help-code-group",children:[e.jsx("span",{className:"help-code-label",children:"Quick Restart (Fast):"}),e.jsx("pre",{className:"help-pre",children:e.jsx("code",{children:"cd level1/docker && docker compose restart"})})]}),e.jsxs("div",{className:"help-code-group",children:[e.jsx("span",{className:"help-code-label",children:"Full Container Recreate (Clean Runtime State):"}),e.jsx("pre",{className:"help-pre",children:e.jsx("code",{children:"cd level1/docker && docker compose down && docker compose up -d"})}),e.jsxs("span",{className:"help-note",children:["(Note: Your code files in ",e.jsx("code",{children:"ros2_ws/"})," will NOT be deleted; they remain safe on your host disk)."]})]}),e.jsxs("div",{className:"help-code-group",children:[e.jsx("span",{className:"help-code-label",children:"Clean Build Artifacts in ROS 2:"}),e.jsx("pre",{className:"help-pre",children:e.jsx("code",{children:"rm -rf level1/ros2_ws/build level1/ros2_ws/install level1/ros2_ws/log"})})]})]}),e.jsxs("div",{className:"help-section",children:[e.jsxs("div",{className:"help-section-title",children:[e.jsx(Ps,{size:18,className:"help-section-icon"}),e.jsx("h4",{children:"4. Environment Access & Port Directory"})]}),e.jsxs("div",{className:"help-ports-grid",children:[e.jsxs("div",{className:"help-port-card",children:[e.jsx("span",{className:"port-badge",children:"Port 8000"}),e.jsx("strong",{children:"LMS Learning Web Platform"}),e.jsx("a",{href:"http://localhost:8000",target:"_blank",rel:"noopener noreferrer",children:"http://localhost:8000"})]}),e.jsxs("div",{className:"help-port-card",children:[e.jsx("span",{className:"port-badge",children:"Port 6080"}),e.jsx("strong",{children:"Desktop GUI (noVNC)"}),e.jsx("a",{href:"http://localhost:6080/vnc.html?autoconnect=true&resize=remote",target:"_blank",rel:"noopener noreferrer",children:"http://localhost:6080/vnc.html"}),e.jsxs("span",{className:"port-pass",children:["Password: ",e.jsx("strong",{children:"None (Passwordless Instant Connect)"})]})]}),e.jsxs("div",{className:"help-port-card",children:[e.jsx("span",{className:"port-badge",children:"Port 8443"}),e.jsx("strong",{children:"In-Browser VS Code"}),e.jsx("a",{href:"http://localhost:8443/?folder=/home/student",target:"_blank",rel:"noopener noreferrer",children:"http://localhost:8443"})]})]})]}),e.jsxs("div",{className:"help-section",children:[e.jsxs("div",{className:"help-section-title",children:[e.jsx(Cs,{size:18,className:"help-section-icon"}),e.jsx("h4",{children:"5. Instructor Fullscreen Presentation Mode (PPT)"})]}),e.jsxs("p",{children:["The LMS includes an instructor presentation slide deck mode with step-by-step concept cards (e.g. ",e.jsx("code",{children:"mkdir"}),", ",e.jsx("code",{children:"cd"}),", code walkthroughs, live architecture flows, and assessments)."]}),e.jsxs("div",{style:{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"0.85rem 1.15rem",background:"var(--bg-sidebar)",borderRadius:"10px",border:"1px solid var(--border-color)",margin:"0.75rem 0"},children:[e.jsxs("div",{children:[e.jsx("strong",{children:"Navbar PPT Launch Button"}),e.jsxs("div",{style:{fontSize:"0.82rem",color:"var(--text-muted)"},children:["Controlled by cache variable ",e.jsx("code",{children:"navpro_show_ppt"})," in localStorage"]})]}),e.jsx("button",{type:"button",onClick:g,className:`btn-toggle-ppt ${i?"active":""}`,style:{padding:"0.45rem 0.95rem",borderRadius:"8px",fontWeight:700,fontSize:"0.86rem",cursor:"pointer",border:i?"1px solid rgba(16, 185, 129, 0.4)":"1px solid var(--border-color)",background:i?"rgba(16, 185, 129, 0.15)":"var(--bg-surface)",color:i?"var(--success)":"var(--text-secondary)"},children:i?"✓ Button Visible":"Hidden (Click to Enable)"})]}),e.jsxs("span",{className:"help-note",children:["Shortcut: Open URL with ",e.jsx("code",{children:"?ppt=true"})," to enable or ",e.jsx("code",{children:"?ppt=false"})," to disable."]})]})]}),e.jsx("div",{className:"modal-footer",style:{padding:"1rem 1.5rem",borderTop:"1px solid var(--border-color)"},children:e.jsx("button",{type:"button",className:"btn-submit",onClick:s,style:{marginLeft:"auto"},children:e.jsx("span",{children:"Got It"})})})]})}):null}function mi(){const[a,s]=c.useState({isTop:!0,isBottom:!1,percent:0,hasScrolled:!1});c.useEffect(()=>{const g=()=>{const T=window.scrollY||document.documentElement.scrollTop,w=(document.documentElement.scrollHeight||document.body.scrollHeight)-window.innerHeight,I=T<80,N=w<=0||T>=w-80,j=w>0?Math.min(100,Math.max(0,Math.round(T/w*100))):0;s({isTop:I,isBottom:N,percent:j,hasScrolled:T>100})};return window.addEventListener("scroll",g,{passive:!0}),g(),()=>window.removeEventListener("scroll",g)},[]);const i=()=>{window.scrollTo({top:0,behavior:"smooth"})},u=()=>{window.scrollTo({top:document.documentElement.scrollHeight||document.body.scrollHeight,behavior:"smooth"})};return e.jsxs("div",{className:"page-scroll-nav-cluster",style:{position:"fixed",bottom:"2rem",right:"2rem",zIndex:980,display:"flex",flexDirection:"column",alignItems:"center",background:"var(--bg-surface)",border:"1px solid var(--border-color)",borderRadius:"24px",padding:"3px",boxShadow:"0 4px 16px rgba(0, 0, 0, 0.14)",backdropFilter:"blur(10px)",transition:"bottom 0.25s cubic-bezier(0.16, 1, 0.3, 1), transform 0.2s ease, opacity 0.2s ease"},"aria-label":"Page scroll shortcuts",children:[e.jsx("button",{type:"button",onClick:i,className:"page-scroll-btn scroll-to-top-btn",title:"Scroll directly to top (Page Top)","aria-label":"Scroll to top",style:{width:"38px",height:"38px",borderRadius:"50%",border:"none",background:"transparent",color:a.isTop?"var(--text-muted)":"var(--text-primary)",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",transition:"all 0.15s ease",opacity:a.isTop?.6:1},children:e.jsx(Ds,{size:18,strokeWidth:2.4})}),e.jsx("div",{style:{width:"20px",height:"1px",background:"var(--border-color)",margin:"2px 0"}}),e.jsx("button",{type:"button",onClick:u,className:"page-scroll-btn scroll-to-end-btn",title:"Scroll directly to end (Page End)","aria-label":"Scroll to end",style:{width:"38px",height:"38px",borderRadius:"50%",border:"none",background:"transparent",color:a.isBottom?"var(--text-muted)":"var(--text-primary)",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",transition:"all 0.15s ease",opacity:a.isBottom?.6:1},children:e.jsx(Is,{size:18,strokeWidth:2.4})})]})}function Ss(a){if(!a)return[];const s=[];if(typeof window>"u")return s;const u=new DOMParser().parseFromString(a.html_content||"","text/html"),T=Array.from(u.querySelectorAll(".learning-objective-item")).map(o=>{var S,z,R,h,f;const m=((z=(S=o.querySelector(".objective-num-badge"))==null?void 0:S.textContent)==null?void 0:z.trim())||"•",x=((h=(R=o.querySelector(".objective-text"))==null?void 0:R.innerHTML)==null?void 0:h.trim())||((f=o.textContent)==null?void 0:f.trim());return{num:m,text:x}});s.push({id:`${a.id}_launchpad`,type:"title",lessonNum:a.num_str,lessonId:a.id,title:a.title,module:a.module,duration:a.duration,focus:a.focus,outcomes:T.length>0?T:null,snapshot:a.snapshot||[]});const w=[{id:"interactive-permission-calculator-root",key:"permission",title:"Interactive Permission Calculator"},{id:"turtlesim-teleop-flow-root",key:"turtlesim",title:"Turtlesim Teleop & Graph Flow"},{id:"package-structure-flow-root",key:"package",title:"ROS 2 Package Structure & Filesystem"},{id:"pubsub-flow-root",key:"pubsub",title:"Publisher / Subscriber Message Flow"},{id:"service-flow-root",key:"service",title:"Service Server & Client Synchronous RPC"},{id:"action-flow-root",key:"action",title:"Action 3-Tier Execution Flow"},{id:"interactive-urdf-viewer-root",key:"urdf",title:"3D URDF & Kinematics Visualizer"},{id:"interactive-inertia-calculator-root",key:"inertia",title:"URDF Inertia Tensor Calculator"},{id:"log-levels-circle-root",key:"loglevels",title:"ROS 2 Logging Severity Hierarchy"},{id:"interactive-astar-search-root",key:"astar",title:"A* Graph Search Algorithm"},{id:"interactive-amcl-particle-filter-root",key:"amcl",title:"Adaptive Monte Carlo Localization (AMCL) Particle Filter"},{id:"interactive-occupancy-grid-mapping-root",key:"occupancy",title:"Occupancy Grid Mapping & Discretization"},{id:"interactive-continuous-to-cspace-root",key:"cspace",title:"Continuous Workspace to Configuration Space (C-Space)"},{id:"interactive-roadmap-methods-root",key:"roadmap",title:"Continuous to Discrete Roadmap Decomposition"},{id:"interactive-dwa-local-planner-root",key:"dwa",title:"Dynamic Window Approach (DWA) Trajectory Rollout"}],I=o=>{if(!o)return"";const m=o.trim().split(`
`);if(m.length<=14)return o.trim();const x=[];let S=!1,z=!1;for(let h=0;h<m.length;h++){const f=m[h],_=f.trim();if(_.includes("cat <<")&&_.includes("EOF")){z=!0,x.push("# [Populate script with diagnostic logic]"),x.push("cat << 'EOF' > sensor_diagnostics.sh ... EOF");continue}if(z){_==="EOF"&&(z=!1);continue}if(/^#\s*(?:Expected\s+)?Output/i.test(_)||/^#\s*Notice/i.test(_)||/^#\s*Displays complete/i.test(_)){S=!0;continue}if(S){if(_.startsWith("#")&&!/^#\s*(?:\d+\.|\bStep|\bPhase)/i.test(_))continue;if(_.startsWith("#"))S=!1;else if(_)S=!1;else{S=!1;continue}}_.startsWith("# (Notice:")||_.startsWith("# Without -p")||_.startsWith("# With -p")||_.startsWith("# Notice your prompt")||_.startsWith("# Clean up temporary practice folders:")||_.startsWith("rm -rf")&&_.includes("practice")||_.startsWith("# Verify it was created:")||_.startsWith("# Verify all directories now exist:")||_.startsWith("# Verify the structured")||(_==="ls"||_.startsWith("ls ~/robotics_lab")||_.startsWith("rm -rf my_robot_test"))&&m.length>15||x.push(f)}let R=x.join(`
`).trim();return R=R.replace(/\n{3,}/g,`

`),R},N=o=>{if(!o)return"";const m=o.split(`
`);if(m.length<=16)return o;const x=m.slice(0,14);return x.push("# ... [Full complete implementation available in Web LMS] ..."),x.join(`
`)},j=o=>{if(!o)return!1;const m=!!o.querySelector("pre, code, .code-container"),x=!!o.querySelector("img, .lesson-image, svg"),S=!!o.querySelector("table"),z=!!o.querySelector(".alert-callout, .callout-card"),R=!!o.querySelector("ul, ol"),h=o.textContent.trim().length;return m||x||S||z||R||h>=160},l=(o,m,x,S)=>{o.forEach((z,R)=>{if(z.textContent.trim().length>30){const h=Array.from(z.querySelectorAll(".code-breakdown-item"));if(h.length>3){const f=Math.ceil(h.length/2);[h.slice(0,f),h.slice(f)].forEach((y,v)=>{const b=z.cloneNode(!0),r=b.querySelector(".code-breakdown-list");r&&(r.innerHTML="",y.forEach(d=>r.appendChild(d.cloneNode(!0)))),s.push({id:`${m}_breakdown_${R}_p${v+1}`,type:"step_breakdown",lessonNum:a.num_str,lessonId:a.id,module:a.module,sectionTitle:S,badge:"Architecture Breakdown",title:`${x} — Mechanics (Part ${v+1})`,htmlContent:b.outerHTML})});return}s.push({id:`${m}_breakdown_${R}`,type:"step_breakdown",lessonNum:a.num_str,lessonId:a.id,module:a.module,sectionTitle:S,badge:"Architecture Breakdown",title:`${x} — Core Mechanics Breakdown`,htmlContent:z.outerHTML})}})},p=(o,m,x,S,z=0)=>{if(!o||!j(o))return;o.querySelectorAll("hr, .divider").forEach(v=>v.remove()),o.querySelectorAll(".alert-callout, .alert").forEach(v=>{if(v.querySelectorAll(".code-container, pre").length>1||v.textContent.trim().length>600){const r=v.querySelector(".alert-body")||v,d=u.createDocumentFragment();for(;r.firstChild;)d.appendChild(r.firstChild);v.replaceWith(d)}}),o.querySelectorAll('div[style*="grid"]').forEach(v=>{const b=Array.from(v.children).filter(r=>r.nodeType===1);if(b.length>=5||b.length>=4&&v.querySelector("pre, code")){const r=Math.ceil(b.length/2),d=v.cloneNode(!1),C=v.cloneNode(!1);b.slice(0,r).forEach(P=>d.appendChild(P.cloneNode(!0))),b.slice(r).forEach(P=>C.appendChild(P.cloneNode(!0))),v.parentNode&&(v.parentNode.insertBefore(d,v),v.parentNode.insertBefore(C,v),v.remove())}}),o.querySelectorAll(".table-responsive, table").forEach(v=>{v.style.marginTop="0.2rem",v.style.marginBottom="0.2rem"});const R=Array.from(o.querySelectorAll(".code-breakdown-card"));if(R.forEach(v=>v.remove()),o.querySelectorAll("pre").forEach(v=>{const b=v.querySelector("code")||v,d=b.textContent.split(`
`);d.length>10&&(b.textContent=d.slice(0,9).join(`
`)+`

# ... [Full implementation available in Web LMS] ...`)}),z>=2){s.push({id:m,type:"subtopic",lessonNum:a.num_str,lessonId:a.id,module:a.module,sectionTitle:S,title:x,htmlContent:o.innerHTML}),l(R,m,x,S);return}if((a.id==="01"||a.id==="lesson_01"||a.num_str==="01")&&(o.querySelector('.terminator-image, img[src*="terminator"]')||x.toLowerCase().includes("terminator"))&&o.querySelector("table")){let v="",b="",r="";Array.from(o.children).forEach(d=>{d.querySelector("table")||d.tagName.toLowerCase()==="table"||d.classList.contains("table-responsive")?r+=d.outerHTML:d.querySelector("img, svg")||["img","svg"].includes(d.tagName.toLowerCase())||d.classList.contains("lesson-image-wrapper")?b+=d.outerHTML:v+=d.outerHTML}),s.push({id:m,type:"concept",lessonNum:a.num_str,lessonId:a.id,module:a.module,sectionTitle:S,badge:"📟 Multi-Terminal Grid",title:x,htmlContent:`
          <div class="terminator-slide-wrapper">
            ${v?`<div class="terminator-intro-briefing">${v}</div>`:""}
            <div class="terminator-cols-container">
              <div class="term-left-col">
                <div class="term-graphic-frame">
                  ${b}
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
                ${r}
              </div>
            </div>
          </div>
        `}),l(R,m,x,S);return}const h=Array.from(o.querySelectorAll("img, svg:not(.lucide)"));if(h.length>1){const v=Array.from(o.children),b=[];let r=[];if(v.forEach(d=>{(!!d.querySelector("img, svg:not(.lucide)")||["img","svg"].includes(d.tagName.toLowerCase())||d.classList.contains("lesson-image-wrapper"))&&r.some(P=>!!P.querySelector("img, svg:not(.lucide)")||["img","svg"].includes(P.tagName.toLowerCase())||P.classList.contains("lesson-image-wrapper"))?(b.push(r),r=[d]):r.push(d)}),r.length>0&&b.push(r),b.length>1){b.forEach((d,C)=>{const P=u.createElement("div");if(d.forEach(F=>P.appendChild(F.cloneNode(!0))),!j(P))return;const A=P.querySelector("strong, h4, h5"),E=A?A.textContent.trim():C===0?"Simulation View":"Architecture Diagram",L=`${x} (Part ${C+1}: ${E})`;p(P,`${m}_part${C+1}`,L,S,z+1)}),l(R,m,x,S);return}}if(h.length===1&&(o.textContent.trim().length>180||o.querySelector("table, pre, .code-container, .alert"))){const v=o.querySelector("table, .table-responsive"),b=v?v.querySelectorAll("tr").length:0,r=!!o.querySelector("pre, .code-container"),d=o.textContent.trim().length;if(v&&b>4||r&&d>550){const C=u.createElement("div"),P=u.createElement("div");if(Array.from(o.children).forEach(A=>{const E=!!A.querySelector("img, svg:not(.lucide)")||["img","svg"].includes(A.tagName.toLowerCase())||A.classList.contains("lesson-image-wrapper"),L=!!A.querySelector("pre, .code-container, table")||["pre","table"].includes(A.tagName.toLowerCase())||A.classList.contains("code-container")||A.classList.contains("table-responsive");E?C.appendChild(A.cloneNode(!0)):L?P.appendChild(A.cloneNode(!0)):C.children.length===0?C.appendChild(A.cloneNode(!0)):P.appendChild(A.cloneNode(!0))}),j(C)&&j(P)&&C.children.length<o.children.length&&P.children.length<o.children.length){p(C,`${m}_visual`,`${x}: Architectural Model`,S,z+1),p(P,`${m}_code`,`${x}: Implementation`,S,z+1),l(R,m,x,S);return}}else{const C=u.createElement("div");C.className="col-visual";const P=u.createElement("div");P.className="col-content",Array.from(o.children).forEach(A=>{!!A.querySelector("img, svg:not(.lucide)")||["img","svg"].includes(A.tagName.toLowerCase())||A.classList.contains("lesson-image-wrapper")?C.appendChild(A.cloneNode(!0)):P.appendChild(A.cloneNode(!0))}),s.push({id:m,type:"subtopic",lessonNum:a.num_str,lessonId:a.id,module:a.module,sectionTitle:S,title:x,htmlContent:`
            <div class="deck-two-col-layout">
              ${C.outerHTML}
              ${P.outerHTML}
            </div>
          `})}l(R,m,x,S);return}const f=Array.from(o.children),_=o.querySelectorAll("pre, .code-container");if(z<1&&h.length===0&&f.length>1&&(o.textContent.trim().length>680||_.length>1&&o.textContent.trim().length>350||o.querySelector("table")&&o.textContent.trim().length>380)){const v=[];let b=[],r=0;if(f.forEach(d=>{const C=d.textContent.trim().length,P=!!d.querySelector("pre, .code-container")||d.tagName.toLowerCase()==="pre",A=!!d.querySelector("table")||d.tagName.toLowerCase()==="table",E=C>400||P&&C>200||A,L=b.some(F=>F.querySelector("pre, .code-container")||F.tagName.toLowerCase()==="pre");b.length>0&&(E||r+C>650||P&&L)?(v.push(b),b=[d],r=C):(b.push(d),r+=C)}),b.length>0&&v.push(b),v.length>1){v.forEach((d,C)=>{const P=u.createElement("div");if(d.forEach(F=>P.appendChild(F.cloneNode(!0))),!j(P))return;const A=P.querySelector("strong, h3, h4, h5"),E=P.querySelector("pre, .code-container");let L=A?A.textContent.trim():E?"Implementation":`Part ${C+1}`;L.length>35&&(L=`Part ${C+1}`),p(P,`${m}_chk${C+1}`,`${x} (${L})`,S,z+1)}),l(R,m,x,S);return}}s.push({id:m,type:"subtopic",lessonNum:a.num_str,lessonId:a.id,module:a.module,sectionTitle:S,title:x,htmlContent:o.innerHTML}),l(R,m,x,S)};let n=Array.from(u.querySelectorAll("section"));return(n.length<2||n.length<u.querySelectorAll("h2").length)&&(n=Array.from(u.querySelectorAll("h2")).map(m=>{const x=u.createElement("section");x.id=m.id||"",x.appendChild(m.cloneNode(!0));let S=m.nextElementSibling;for(;S&&S.tagName.toLowerCase()!=="h2";){const z=S.nextElementSibling;x.appendChild(S.cloneNode(!0)),S=z}return x})),a.id==="02"||a.num_str==="02"||a.id==="lesson_02"?gi(u,a,s):a.id==="03"||a.num_str==="03"||a.id==="lesson_03"?ui(u,a,s):a.id==="04"||a.num_str==="04"||a.id==="lesson_04"?hi(u,a,s):a.id==="05"||a.num_str==="05"||a.id==="lesson_05"?vi(u,a,s):a.id==="06"||a.num_str==="06"||a.id==="lesson_06"?fi(u,a,s):a.id==="07"||a.num_str==="07"||a.id==="lesson_07"?yi(u,a,s):a.id==="08"||a.num_str==="08"||a.id==="lesson_08"?bi(u,a,s):a.id==="09"||a.num_str==="09"||a.id==="lesson_09"?xi(u,a,s):a.id==="10"||a.num_str==="10"||a.id==="lesson_10"?_i(u,a,s):a.id==="11"||a.num_str==="11"||a.id==="lesson_11"?ji(u,a,s):a.id==="12"||a.num_str==="12"||a.id==="lesson_12"?Si(u,a,s):a.id==="13"||a.num_str==="13"||a.id==="lesson_13"?wi(u,a,s):a.id==="14"||a.num_str==="14"||a.id==="lesson_14"?ki(u,a,s):a.id==="15"||a.num_str==="15"||a.id==="lesson_15"?Ci(u,a,s):a.id==="16"||a.num_str==="16"||a.id==="lesson_16"?Ni(u,a,s):a.id==="17"||a.num_str==="17"||a.id==="lesson_17"?Ri(u,a,s):a.id==="18"||a.num_str==="18"||a.id==="lesson_18"?zi(u,a,s):a.id==="19"||a.num_str==="19"||a.id==="lesson_19"?Ti(u,a,s):a.id==="20"||a.num_str==="20"||a.id==="lesson_20"?Ai(u,a,s):a.id==="21"||a.num_str==="21"||a.id==="lesson_21"?Pi(u,a,s):n.forEach((o,m)=>{const x=o.querySelector("h2"),S=x?x.textContent.trim():`Section ${m+1}`,z=S.toLowerCase();if(z.includes("learning objectives")||z.includes("road map")||z.includes("roadmap")||z.includes("overview")&&m<=1||z.includes("challenge")||z.includes("practical lab")||z.includes("student lab")||z.includes("mission")||z.includes("hands-on student")||z.includes("summary")||z.includes("next steps"))return;w.forEach(v=>{o.querySelector(`#${v.id}`)&&s.push({id:`${a.id}_interactive_${v.key}`,type:"interactive",interactiveKey:v.key,lessonNum:a.num_str,lessonId:a.id,module:a.module,sectionTitle:S,title:v.title})});const R=Array.from(o.querySelectorAll(".cmd-card"));if(R.length>0){R.forEach((v,b)=>{var F,$,M,k,D,W,G,O,V,se;const r=(($=(F=v.querySelector(".cmd-badge"))==null?void 0:F.textContent)==null?void 0:$.trim())||"",d=((k=(M=v.querySelector(".cmd-title"))==null?void 0:M.textContent)==null?void 0:k.trim())||`Command ${b+1}`,C=((W=(D=v.querySelector(".cmd-syntax"))==null?void 0:D.textContent)==null?void 0:W.replace(/^Syntax:\s*/i,"").trim())||"",P=((O=(G=v.querySelector(".cmd-desc"))==null?void 0:G.innerHTML)==null?void 0:O.trim())||"",A=v.querySelector("pre code"),E=A?A.textContent.trim():"",L=((se=(V=v.querySelector(".code-lang-tag"))==null?void 0:V.textContent)==null?void 0:se.trim())||"bash";s.push({id:`${a.id}_cmd_${b}_${r.replace(/[^a-zA-Z0-9]/g,"_")}`,type:"command",lessonNum:a.num_str,lessonId:a.id,module:a.module,sectionTitle:S,badge:r,baseBadge:r,title:d,baseTitle:d,syntax:C,desc:P,code:I(E),lang:L,htmlContent:v.outerHTML})});return}const h=Array.from(o.querySelectorAll(".file-edit-step"));if(h.length>0){const v=[];let b=null;h.forEach(r=>{var $,M,k,D,W;const d=((M=($=r.querySelector(".file-edit-step-title"))==null?void 0:$.textContent)==null?void 0:M.trim())||"",C=r.querySelector(".step-description"),P=r.querySelector("pre code"),A=P?P.textContent.trim():"",E=((D=(k=r.querySelector(".code-lang-tag"))==null?void 0:k.textContent)==null?void 0:D.trim())||"python",L=(W=C==null?void 0:C.textContent)==null?void 0:W.match(/([~./\w_-]+\.[a-zA-Z0-9]+)/),F=d.toLowerCase().includes("open")||A.length===0;if(F||!b){b&&b.codes.length>0&&v.push(b);const G=L?L[1]:"",O=G?G.split("/").pop():"Configuration File";b={targetPath:G,fileName:O,descriptions:[],codes:[],lang:E},C&&!F&&b.descriptions.push(C.textContent.trim())}else d.toLowerCase().includes("verify")||d.toLowerCase().includes("full file")?b.codes.length===0&&A.length>0&&b.codes.push(A):(C&&b.descriptions.push(C.textContent.trim()),A.length>0&&(b.codes.push(A),b.lang=E))}),b&&(b.codes.length>0||b.descriptions.length>0)&&v.push(b),v.forEach((r,d)=>{const C=r.codes.join(`

`),P=r.descriptions.slice(0,2).join(" ")||`Update ${r.fileName} configuration.`,A=r.targetPath?`<code>${r.targetPath}</code>`:`<code>${r.fileName}</code>`;s.push({id:`${a.id}_file_${m}_${d}_${r.fileName.replace(/[^a-zA-Z0-9]/g,"_")}`,type:"code_step",lessonNum:a.num_str,lessonId:a.id,module:a.module,sectionTitle:S,badge:r.fileName,title:`${S.replace(/^\d+\.\s*/,"")}: ${r.fileName}`,desc:`<div class="file-path-strip"><span class="file-path-label">📁 Target:</span> ${A}</div><p class="file-edit-summary">${P}</p>`,code:N(C),lang:r.lang,breakdown:null,htmlContent:""})});return}const f=Array.from(o.querySelectorAll("h3"));if(f.length>0){const v=u.createElement("div");let b=o.firstElementChild;for(;b&&b.tagName.toLowerCase()!=="h3"&&b.tagName.toLowerCase()!=="h2";)w.some(r=>b.id===r.id||b.querySelector(`#${r.id}`))||v.appendChild(b.cloneNode(!0)),b=b.nextElementSibling;j(v)&&p(v,`${a.id}_sec_${m}_intro`,`${S}: Overview`,S),f.forEach((r,d)=>{const C=r.textContent.trim(),P=C.toLowerCase();if(P.includes("challenge")||P.includes("starter template")||P.includes("student lab")||P.includes("solution breakdown")||P.includes("task_spawn"))return;const A=[];let E=r.nextElementSibling;for(;E&&E.tagName.toLowerCase()!=="h3"&&E.tagName.toLowerCase()!=="h2";)w.some(F=>E.id===F.id||E.querySelector(`#${F.id}`))||A.push(E.cloneNode(!0)),E=E.nextElementSibling;const L=u.createElement("div");A.forEach(F=>L.appendChild(F)),p(L,`${a.id}_sub_${m}_${d}`,C,S)});return}const _=o.cloneNode(!0),y=_.querySelector("h2");y&&y.remove(),w.forEach(v=>{const b=_.querySelector(`#${v.id}`);b&&b.remove()}),p(_,`${a.id}_sec_${m}`,S,S)}),a.id!=="03"&&a.num_str!=="03"&&a.id!=="lesson_03"&&Array.isArray(a.quizzes)&&a.quizzes.length>0&&a.quizzes.forEach((o,m)=>{const x=o.correct!==void 0?o.correct:o.answer!==void 0?o.answer:o.correct_index!==void 0?o.correct_index:0,S=o.prompt||o.question||`Assessment Question ${m+1}`;s.push({id:`${a.id}_quiz_${m}`,type:"quiz",lessonNum:a.num_str,lessonId:a.id,module:a.module,sectionTitle:"Knowledge Check & Interactive Assessment",title:`Question ${m+1} of ${a.quizzes.length}`,quizIndex:m+1,totalQuizzes:a.quizzes.length,question:S,options:o.options||[],answer:x,explanation:o.explanation||""})}),s.push({id:`${a.id}_summary`,type:"summary",lessonNum:a.num_str,lessonId:a.id,module:a.module,sectionTitle:"Summary & Next Steps",title:`Lesson ${a.num_str} Summary & Key Takeaways`,nextId:a.next_id,focus:a.focus}),s}function gi(a,s,i){i.push({id:`${s.id}_prerequisites`,type:"concept",lessonNum:s.num_str,lessonId:s.id,module:s.module,sectionTitle:"2. Hardware and Software Prerequisites",badge:"📋 Prerequisites",title:"2. Hardware & Software Prerequisites",htmlContent:`
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
    `}),i.push({id:`${s.id}_sec3_1_robot_ingredients`,type:"concept",lessonNum:s.num_str,lessonId:s.id,module:s.module,sectionTitle:"3. Robotics Fundamentals & ROS 2 Architecture",badge:"🤖 Core Concept",title:"3.1 What is a Robot? & The Three Core Ingredients",htmlContent:`
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
    `}),i.push({id:`${s.id}_sec3_2_step1`,type:"concept",lessonNum:s.num_str,lessonId:s.id,module:s.module,sectionTitle:"3. Robotics Fundamentals & ROS 2 Architecture",badge:"🎬 Story Step 1",title:"3.2 Story: Step 1 — The Dream: Autonomous Medicine Delivery Robot",htmlContent:`
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
    `}),i.push({id:`${s.id}_sec3_2_step2`,type:"concept",lessonNum:s.num_str,lessonId:s.id,module:s.module,sectionTitle:"3. Robotics Fundamentals & ROS 2 Architecture",badge:"🎬 Story Step 2",title:"3.2 Story: Step 2 — The Plumbing Trap: LiDAR, Cameras, Motors & Sockets",htmlContent:`
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
    `}),i.push({id:`${s.id}_sec3_2_step3`,type:"concept",lessonNum:s.num_str,lessonId:s.id,module:s.module,sectionTitle:"3. Robotics Fundamentals & ROS 2 Architecture",badge:"🎬 Story Step 3",title:"3.2 Story: Step 3 — Goal Abandoned: Just an RC Car",htmlContent:`
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
    `}),i.push({id:`${s.id}_sec3_2_step4`,type:"concept",lessonNum:s.num_str,lessonId:s.id,module:s.module,sectionTitle:"3. Robotics Fundamentals & ROS 2 Architecture",badge:"🎬 Story Step 4",title:"3.2 Story: Step 4 — The Vicious Cycle: Starting From Scratch Again",htmlContent:`
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
    `}),i.push({id:`${s.id}_sec3_3_why_ros`,type:"concept",lessonNum:s.num_str,lessonId:s.id,module:s.module,sectionTitle:"3. Robotics Fundamentals & ROS 2 Architecture",badge:"⚡ Core Solution: Why ROS",title:"3.3 Why We Need ROS: Stop Reinventing the Wheel & Standardize",htmlContent:`
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
    `}),i.push({id:`${s.id}_sec3_4_metaphor_and_stack`,type:"concept",lessonNum:s.num_str,lessonId:s.id,module:s.module,sectionTitle:"3. Robotics Fundamentals & ROS 2 Architecture",badge:"💻 Architectural Metaphor",title:"3.4 What is ROS? The PC OS Metaphor & The 4-Tier Software Stack",htmlContent:`
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
    `}),i.push({id:`${s.id}_sec3_5_pillars`,type:"concept",lessonNum:s.num_str,lessonId:s.id,module:s.module,sectionTitle:"3. Robotics Fundamentals & ROS 2 Architecture",badge:"🏛️ Architectural Pillars",title:"3.5 The 4 Foundational Pillars of ROS",htmlContent:`
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
    `}),i.push({id:`${s.id}_sec3_6_motion_flow`,type:"concept",lessonNum:s.num_str,lessonId:s.id,module:s.module,sectionTitle:"3. Robotics Fundamentals & ROS 2 Architecture",badge:"🧬 Full Motion Pipeline",title:"3.6 The Robot as a Living Organism: End-to-End Motion Flow",htmlContent:`
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
    `}),i.push({id:`${s.id}_sec3_7_ros1_vs_ros2`,type:"concept",lessonNum:s.num_str,lessonId:s.id,module:s.module,sectionTitle:"3. Robotics Fundamentals & ROS 2 Architecture",badge:"⚖️ Architecture Comparison",title:"3.7 ROS 1 vs. ROS 2: The Architectural Paradigm Shift",htmlContent:`
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
    `}),i.push({id:`${s.id}_sec4_timeline`,type:"concept",lessonNum:s.num_str,lessonId:s.id,module:s.module,sectionTitle:"4. ROS 2 Release Timeline",badge:"📅 Release Cadence",title:"4. ROS 2 Release Timeline: Jazzy Jalisco (LTS)",htmlContent:`
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
    `}),i.push({id:`${s.id}_sec5_install_pipeline`,type:"concept",lessonNum:s.num_str,lessonId:s.id,module:s.module,sectionTitle:"5. Step-by-Step Installation on Ubuntu 24.04 LTS",badge:"📦 Installation Pipeline",title:"5. Complete Installation Pipeline: APT Repositories to ROS 2 Desktop Suite",htmlContent:`
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
    `}),i.push({id:`${s.id}_sec6_desktop_gui`,type:"concept",lessonNum:s.num_str,lessonId:s.id,module:s.module,sectionTitle:"6. Developer Environment & Lab Access",badge:"🖥️ Lab Tooling Suite",title:"6. Developer Environment: Desktop GUI, In-Browser VS Code & Terminals",htmlContent:`
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
    `}),i.push({id:`${s.id}_sec8_9_sourcing_verification`,type:"concept",lessonNum:s.num_str,lessonId:s.id,module:s.module,sectionTitle:"8 & 9. Sourcing Environment & Multi-Terminal Verification",badge:"🧪 Activation & Smoke Test",title:"8 & 9. Environment Activation & Multi-Terminal Smoke Test Verification",htmlContent:`
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
    `})}function ui(a,s,i){i.push({id:`${s.id}_interactive_turtlesim`,type:"interactive",interactiveKey:"turtlesim",lessonNum:s.num_str,lessonId:s.id,module:s.module,sectionTitle:"Interactive Simulation & Computational Graph Flow",title:"Turtlesim Teleop & Computational Graph Architecture"}),i.push({id:`${s.id}_sec2_1_canvas`,type:"concept",lessonNum:s.num_str,lessonId:s.id,module:s.module,sectionTitle:"2. Launching Turtlesim: The Simulation Playground",badge:"🐢 Simulation Canvas",title:"2.1 Launching Turtlesim Simulation Canvas Node",htmlContent:`
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
    `}),i.push({id:`${s.id}_sec2_2_teleop`,type:"concept",lessonNum:s.num_str,lessonId:s.id,module:s.module,sectionTitle:"2. Launching Turtlesim: The Simulation Playground",badge:"⌨️ Teleoperation Control",title:"2.2 Keyboard Teleoperation Control (turtle_teleop_key)",htmlContent:`
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
    `}),i.push({id:`${s.id}_sec3_rqt_graph`,type:"concept",lessonNum:s.num_str,lessonId:s.id,module:s.module,sectionTitle:"3. Visualizing the Computational Graph (rqt_graph)",badge:"🌐 Computational Graph",title:"3. Visualizing the Computational Graph (rqt_graph)",htmlContent:`
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
    `}),i.push({id:`${s.id}_sec4_node_introspection`,type:"concept",lessonNum:s.num_str,lessonId:s.id,module:s.module,sectionTitle:"4. Core Concept 1: Node Introspection (ros2 node)",badge:"🔍 Node Introspection",title:"4. Node Introspection: Discovery (ros2 node list) & Deep Interface Audit (ros2 node info)",htmlContent:`
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
    `}),i.push({id:`${s.id}_sec5_topic_introspection`,type:"concept",lessonNum:s.num_str,lessonId:s.id,module:s.module,sectionTitle:"5. Core Concept 2: Topic Introspection (ros2 topic)",badge:"🚌 Topic Introspection",title:"5. Topic Introspection: Discovery (list -t), Telemetry (echo) & Frequency (hz)",htmlContent:`
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
    `}),i.push({id:`${s.id}_sec6_interface_twist`,type:"concept",lessonNum:s.num_str,lessonId:s.id,module:s.module,sectionTitle:"6. Core Concept 3: Topic Interface Types (ros2 interface)",badge:"📐 Message IDL",title:"6. Topic Interface Types & Ground Kinematics (ros2 interface)",htmlContent:`
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
    `}),i.push({id:`${s.id}_sec7_topic_pub`,type:"concept",lessonNum:s.num_str,lessonId:s.id,module:s.module,sectionTitle:"7. Moving the Robot Hands-On via CLI (ros2 topic pub)",badge:"⚡ Actuator Injection",title:"7. Moving the Robot via CLI: Single Step (--once) & Continuous Circle (-r 10)",htmlContent:`
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
    `}),i.push({id:`${s.id}_sec8_cli_table`,type:"concept",lessonNum:s.num_str,lessonId:s.id,module:s.module,sectionTitle:"8. Summary Comparison Table of Essential CLI Tools",badge:"📊 Master Reference",title:"8. Essential ROS 2 CLI Tools & Production Use Cases",htmlContent:`
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
    `})}function hi(a,s,i){i.push({id:`${s.id}_sec2_workspace_hierarchy`,type:"concept",lessonNum:s.num_str,lessonId:s.id,module:s.module,sectionTitle:"2. The ROS 2 Workspace Architecture",badge:"📁 Workspace Quartet",title:"2. The ROS 2 Workspace Architecture (~/ros2_ws)",htmlContent:`
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
    `}),i.push({id:`${s.id}_sec3_overlay_underlay`,type:"concept",lessonNum:s.num_str,lessonId:s.id,module:s.module,sectionTitle:"3. Underlays vs. Overlays: The Environment Chaining Model",badge:"⛓️ Environment Chaining",title:"3. Underlays vs. Overlays: Environment Chaining",htmlContent:`
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
    `}),i.push({id:`${s.id}_sec4_init_and_build`,type:"concept",lessonNum:s.num_str,lessonId:s.id,module:s.module,sectionTitle:"4. Initializing & Building a Workspace",badge:"⚙️ Workspace Setup",title:"4. Initializing, Building & Sourcing Workspace",htmlContent:`
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
    `}),i.push({id:`${s.id}_sec5_package_definition`,type:"concept",lessonNum:s.num_str,lessonId:s.id,module:s.module,sectionTitle:"5. What Makes a Folder a ROS 2 Package?",badge:"📦 Package Concepts",title:"5.1 Package Definition & Build Types",htmlContent:`
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
    `}),i.push({id:`${s.id}_sec5_package_anatomy`,type:"concept",lessonNum:s.num_str,lessonId:s.id,module:s.module,sectionTitle:"5. What Makes a Folder a ROS 2 Package?",badge:"🔍 Package Anatomy",title:"5.2 Python Package Anatomy & Essential Files",htmlContent:`
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
    `}),i.push({id:`${s.id}_sec6_7_introspection_rosdep`,type:"concept",lessonNum:s.num_str,lessonId:s.id,module:s.module,sectionTitle:"6 & 7. Package Introspection & rosdep",badge:"🛠️ CLI & Dependencies",title:"6 & 7. Package Introspection CLI & rosdep",htmlContent:`
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
    `}),i.push({id:`${s.id}_sec8_scaffold_package`,type:"concept",lessonNum:s.num_str,lessonId:s.id,module:s.module,sectionTitle:"8. Create ROS 2 Package (Python)",badge:"🔨 Package Creation",title:"8.1 Scaffolding the nexus_amr_basics Package",htmlContent:`
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
    `}),i.push({id:`${s.id}_sec8_colcon_build`,type:"concept",lessonNum:s.num_str,lessonId:s.id,module:s.module,sectionTitle:"8. Create ROS 2 Package (Python)",badge:"⚡ Meta-Build Execution",title:"8.2 Compiling with colcon & Build Telemetry",htmlContent:`
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
    `}),i.push({id:`${s.id}_sec8_9_sourcing_verification`,type:"concept",lessonNum:s.num_str,lessonId:s.id,module:s.module,sectionTitle:"8 & 9. Sourcing & Verification",badge:"🔍 Sourcing & Verification",title:"8.3 Sourcing Contrast Drill & Health Audit",htmlContent:`
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
    `}),i.push({id:`${s.id}_sec10_golden_rules`,type:"concept",lessonNum:s.num_str,lessonId:s.id,module:s.module,sectionTitle:"Production Best Practices",badge:"🛡️ Production Rules",title:"ROS 2 Workspace & Build Golden Rules",htmlContent:`
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
    `})}function vi(a,s,i){i.push({id:`${s.id}_interactive_pubsub`,type:"interactive",interactiveKey:"pubsub",lessonNum:s.num_str,lessonId:s.id,module:s.module,sectionTitle:"1. Topic Architecture & Pub/Sub Message Flow",badge:"🔄 Interactive Simulator",title:"Interactive Pub/Sub Architecture & DDS Message Flow Simulator"}),i.push({id:`${s.id}_sec3_interface_inspection`,type:"concept",lessonNum:s.num_str,lessonId:s.id,module:s.module,sectionTitle:"3. Message Interface Discovery",badge:"🔍 Interface Inspection",title:"3.1 Interface Discovery: sensor_msgs/msg/Range",htmlContent:`
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
    `}),i.push({id:`${s.id}_sec3_publisher_node`,type:"concept",lessonNum:s.num_str,lessonId:s.id,module:s.module,sectionTitle:"3. Writing the Publisher Node",badge:"📡 Publisher Node",title:"3.2 Authoring the Ultrasonic Sensor Publisher Node",htmlContent:`
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
    `}),i.push({id:`${s.id}_sec4_setup_build_test`,type:"concept",lessonNum:s.num_str,lessonId:s.id,module:s.module,sectionTitle:"4. Build & CLI Introspection",badge:"🛠️ Build & Test",title:"4. setup.py Entry Point, Build & Topic Introspection",htmlContent:`
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
    `}),i.push({id:`${s.id}_sec5_subscriber_node`,type:"concept",lessonNum:s.num_str,lessonId:s.id,module:s.module,sectionTitle:"5. Writing the Subscriber Node",badge:"🛡️ Subscriber Node",title:"5. Authoring the Collision Safety Monitor Subscriber",htmlContent:`
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
    `}),i.push({id:`${s.id}_sec6_dual_node_drill`,type:"concept",lessonNum:s.num_str,lessonId:s.id,module:s.module,sectionTitle:"6. Dual-Node Verification Drill",badge:"🚀 End-to-End Test",title:"6. Dual-Node Telemetry & Verification Drill",htmlContent:`
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
    `}),i.push({id:`${s.id}_sec7_qos_deep_dive`,type:"concept",lessonNum:s.num_str,lessonId:s.id,module:s.module,sectionTitle:"7. Quality of Service (QoS)",badge:"⚖️ QoS Policies",title:"7.1 Quality of Service (QoS): Policies & AMR Profiles",htmlContent:`
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
    `}),i.push({id:`${s.id}_sec7_qos_compatibility`,type:"concept",lessonNum:s.num_str,lessonId:s.id,module:s.module,sectionTitle:"7. QoS Compatibility & Python Setup",badge:"⚠️ Compatibility Rule",title:"7.2 The QoS Compatibility Rule (Rx <= Tx) & The Silence Trap",htmlContent:`
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
    `}),i.push({id:`${s.id}_sec7_multi_pubsub`,type:"concept",lessonNum:s.num_str,lessonId:s.id,module:s.module,sectionTitle:"7. Multi-Topic Architecture",badge:"🔀 Multi-Topic Hub",title:"7.3 Multi-Topic Architecture: Single Node Multi Pub/Sub",htmlContent:`
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
    `}),i.push({id:`${s.id}_sec9_golden_rules`,type:"concept",lessonNum:s.num_str,lessonId:s.id,module:s.module,sectionTitle:"Production Best Practices",badge:"🛡️ Production Rules",title:"Publishers, Subscribers & QoS Golden Rules",htmlContent:`
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
    `})}function fi(a,s,i){i.push({id:`${s.id}_interactive_service`,type:"interactive",interactiveKey:"service",lessonNum:s.num_str,lessonId:s.id,module:s.module,sectionTitle:"2. Service Architecture & Communication Flow",badge:"🔄 Interactive Simulator",title:"Interactive Service Architecture: 2-Way Request ➔ Response (RPC)"}),i.push({id:`${s.id}_sec2_decision_matrix`,type:"concept",lessonNum:s.num_str,lessonId:s.id,module:s.module,sectionTitle:"2. Communication Pattern Selection",badge:"🧭 Architecture Selection",title:"2. Decision Matrix: Topics vs Services vs Actions",htmlContent:`
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
    `}),i.push({id:`${s.id}_sec3_interface_contract`,type:"concept",lessonNum:s.num_str,lessonId:s.id,module:s.module,sectionTitle:"3. Interface Discovery & Contract",badge:"📋 Interface Contract",title:"3.1 Service Interface Discovery: TriggerEmergencyStop",htmlContent:`
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
    `}),i.push({id:`${s.id}_sec3_server_implementation`,type:"concept",lessonNum:s.num_str,lessonId:s.id,module:s.module,sectionTitle:"3. Service Server Implementation",badge:"🛡️ Safety Server Node",title:"3.2 Authoring the Emergency Stop Server (emergency_stop_server.py)",htmlContent:`
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
    `}),i.push({id:`${s.id}_sec4_server_build_cli`,type:"concept",lessonNum:s.num_str,lessonId:s.id,module:s.module,sectionTitle:"4. Build & CLI Introspection",badge:"🛠️ Build & CLI Testing",title:"4. setup.py Entry Point, colcon Build & Service CLI Testing",htmlContent:`
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
    `}),i.push({id:`${s.id}_sec5_client_implementation`,type:"concept",lessonNum:s.num_str,lessonId:s.id,module:s.module,sectionTitle:"5. Asynchronous Client Implementation",badge:"⚡ Non-Blocking Client",title:"5. Authoring the Asynchronous Emergency Stop Client (emergency_stop_client.py)",htmlContent:`
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
    `}),i.push({id:`${s.id}_sec6_dual_node_verification`,type:"concept",lessonNum:s.num_str,lessonId:s.id,module:s.module,sectionTitle:"6. End-to-End Verification",badge:"🚀 Dual-Node Drill",title:"6. setup.py Registration & Dual-Node Safety Verification Drill",htmlContent:`
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
    `}),i.push({id:`${s.id}_sec8_golden_rules`,type:"concept",lessonNum:s.num_str,lessonId:s.id,module:s.module,sectionTitle:"Production Best Practices",badge:"🏆 Production Rules",title:"Production Golden Rules for ROS 2 Services",htmlContent:`
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
    `})}function yi(a,s,i){i.push({id:`${s.id}_sec2_architecture`,type:"concept",lessonNum:s.num_str,lessonId:s.id,module:s.module,sectionTitle:"2. The Python Launch Architecture",badge:"🚀 Launch Architecture",title:"2. ROS 2 Python Launch System Architecture",htmlContent:`
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
    `}),i.push({id:`${s.id}_sec3_subsystem_launch`,type:"concept",lessonNum:s.num_str,lessonId:s.id,module:s.module,sectionTitle:"3. AMR Subsystem Launch File Implementation",badge:"📝 Subsystem Launch Script",title:"3. Writing an AMR Launch File: The 4 Core Architectural Phases",htmlContent:`
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
    `}),i.push({id:`${s.id}_sec4_actions_matrix`,type:"concept",lessonNum:s.num_str,lessonId:s.id,module:s.module,sectionTitle:"4. Key Launch Actions & Syntax Breakdown",badge:"⚙️ Action API Reference",title:"4. Essential ROS 2 Launch Actions & Syntax Reference Matrix",htmlContent:`
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
    `}),i.push({id:`${s.id}_sec5_setup_build`,type:"concept",lessonNum:s.num_str,lessonId:s.id,module:s.module,sectionTitle:"5. Package Integration: Directory Structure & setup.py",badge:"📦 Package Integration",title:"5. Registering Launch Files in setup.py & The Symlink Build Workflow",htmlContent:`
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
    `}),i.push({id:`${s.id}_sec6_cli_verification`,type:"concept",lessonNum:s.num_str,lessonId:s.id,module:s.module,sectionTitle:"6. CLI Execution & Multi-Robot Verification",badge:"⚡ Runtime Verification",title:"6. Executing Launch Files & Multi-Robot Namespace Verification",htmlContent:`
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
    `})}function bi(a,s,i){i.push({id:`${s.id}_sec2_architecture`,type:"concept",lessonNum:s.num_str,lessonId:s.id,module:s.module,sectionTitle:"2. Action Communication Architecture",badge:"⚡ Action Protocol",title:"2. The ROS 2 Action Protocol: Goal, Feedback & Result Lifecycle",htmlContent:`
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
    `}),i.push({id:`${s.id}_interactive_action`,type:"interactive",interactiveKey:"action",lessonNum:s.num_str,lessonId:s.id,module:s.module,sectionTitle:"Interactive Simulation & Execution Flow",title:"Interactive Action Flow: Goal Dispatch, Feedback & Cancellation"}),i.push({id:`${s.id}_sec3_action_idl`,type:"concept",lessonNum:s.num_str,lessonId:s.id,module:s.module,sectionTitle:"3. Action Interface Definition",badge:"📐 Action IDL",title:"3. Anatomy of an Action Definition (NavigateDistance.action)",htmlContent:`
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
    `}),i.push({id:`${s.id}_sec4_action_server`,type:"concept",lessonNum:s.num_str,lessonId:s.id,module:s.module,sectionTitle:"4. Action Server Implementation",badge:"🛠️ Server Node",title:"4. Authoring the Action Server: Callbacks & Preemption Handling",htmlContent:`
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
    `}),i.push({id:`${s.id}_sec5_cli_server_test`,type:"concept",lessonNum:s.num_str,lessonId:s.id,module:s.module,sectionTitle:"5. Testing Action Server via CLI",badge:"🔍 CLI Server Test",title:"5. Testing the Action Server via ROS 2 CLI & Streaming Feedback",htmlContent:`
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
    `}),i.push({id:`${s.id}_sec6_action_client`,type:"concept",lessonNum:s.num_str,lessonId:s.id,module:s.module,sectionTitle:"6. Action Client Implementation",badge:"💻 Client Node",title:"6. Authoring the Asynchronous Action Client in Python",htmlContent:`
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
    `}),i.push({id:`${s.id}_sec7_dual_node_nav2`,type:"concept",lessonNum:s.num_str,lessonId:s.id,module:s.module,sectionTitle:"7. Dual-Node Verification & Nav2 Integration",badge:"🚀 Dual-Node Drill & Nav2",title:"7. Dual-Node Verification & The Nav2 Navigation Stack Connection",htmlContent:`
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
    `})}function xi(a,s,i){i.push({id:`${s.id}_sec1_anatomy`,type:"concept",lessonNum:s.num_str,lessonId:s.id,module:s.module,sectionTitle:"2. URDF Anatomy: Links vs. Joints",badge:"🤖 Kinematic Foundations",title:"1. URDF Kinematic Hierarchy: Links, Joints & REP-103 Conventions",htmlContent:`
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
    `}),i.push({id:`${s.id}_sec2_link_anatomy`,type:"concept",lessonNum:s.num_str,lessonId:s.id,module:s.module,sectionTitle:"2. URDF Anatomy: Links vs. Joints",badge:"📦 Link Structure & Tripartite Tags",title:"2. URDF Link Anatomy: The Complete Link Excerpt (<visual>, <collision>, <inertial>)",htmlContent:`
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
    `}),i.push({id:`${s.id}_sec3_joint_anatomy`,type:"concept",lessonNum:s.num_str,lessonId:s.id,module:s.module,sectionTitle:"2. URDF Anatomy: Links vs. Joints",badge:"🔩 Kinematic Constraint Excerpt",title:"3. URDF Joint Anatomy: Parent-Child Binding, Relative Poses & Limits",htmlContent:`
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
    `}),i.push({id:`${s.id}_sec4_joint_animation`,type:"concept",lessonNum:s.num_str,lessonId:s.id,module:s.module,sectionTitle:"2. URDF Anatomy: Links vs. Joints",badge:"🔩 Joint Kinematics & DOF",title:"4. URDF Joint Mechanics: The 4 Primary Motion Types with Live Animation",htmlContent:`
      <div class="l09-joint-layout">
        <div class="l09-joint-anim-stage">
          <img src="assets/images/urdf_joint_types_animation.svg" alt="URDF Joint Types Animated Mechanical Motion" />
        </div>
        <div class="l05-banner-intro" style="margin-top: 0.1rem; font-size: 0.72rem; padding: 0.35rem 0.75rem; text-align: center;">
          <strong>💡 Kinematic Summary:</strong> Differential-drive AMRs combine <code>continuous</code> joints for active drive wheels and <code>fixed</code> joints for sensor mounts (LiDAR, camera). Multi-DOF joints include <code>planar</code> (3-DOF, omnidirectional bases) and <code>floating</code> (6-DOF, aerial drones).
        </div>
      </div>
    `}),i.push({id:`${s.id}_sec5_xacro_macros`,type:"concept",lessonNum:s.num_str,lessonId:s.id,module:s.module,sectionTitle:"3. Authoring nexus_amr.urdf.xacro",badge:"📦 Modular Xacro Engine",title:"5. Parameterizing Robot Models: Xacro Properties, Math & Reusable Macros",htmlContent:`
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
    `}),i.push({id:`${s.id}_sec6_cad_fusion360`,type:"concept",lessonNum:s.num_str,lessonId:s.id,module:s.module,sectionTitle:"5. Industrial CAD Workflow: From CAD to ROS 2 URDF",badge:"🏭 CAD to ROS 2 Pipeline",title:"6. Industrial CAD Pipeline: Designing in Autodesk Fusion 360 & Exporting to ROS 2 URDF",htmlContent:`
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
    `})}function _i(a,s,i){i.push({id:`${s.id}_sec1_rviz_workspace`,type:"concept",lessonNum:s.num_str,lessonId:s.id,module:s.module,sectionTitle:"1. RViz2 3D Sensor Perception Suite",badge:"👁️ 3D Perception Dashboard",title:"1. RViz2 Architecture: Visualizing Robot State & Active Sensor Streams",htmlContent:`
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
    `}),i.push({id:`${s.id}_sec2_sensor_displays`,type:"concept",lessonNum:s.num_str,lessonId:s.id,module:s.module,sectionTitle:"2. Multi-Sensor Displays in RViz2",badge:"📡 Multi-Sensor Telemetry",title:"2. RViz2 Sensor Displays: Decoding LaserScan, Depth Clouds, TF & Odometry",htmlContent:`
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
    `}),i.push({id:`${s.id}_sec3_diff_drive_kinematics`,type:"concept",lessonNum:s.num_str,lessonId:s.id,module:s.module,sectionTitle:"3. Differential Drive Kinematics & ICC",badge:"⚙️ AMR Kinematics & Motion Geometry",title:"3. Differential Drive Kinematics: Mathematical Modeling & ICC Motion Geometry",htmlContent:`
      <div class="l09-joint-layout">
        <div class="l09-joint-anim-stage">
          <img src="assets/images/diff_drive_kinematics_animation.svg" alt="Differential Drive AMR Kinematics and ICC Geometry Live Animation" />
        </div>
        <div class="l05-banner-intro" style="margin-top: 0.1rem; font-size: 0.72rem; padding: 0.35rem 0.75rem; text-align: center;">
          <strong>💡 Kinematic Principle:</strong> Two-wheel differential drive robots adhere to a <strong>non-holonomic constraint</strong> prohibiting lateral side-slip (<code>v_y = 0</code>). All curved motion traces instantaneous circular arcs around the <strong>ICC</strong> with turning radius <code>R = v / &omega;</code>.
        </div>
      </div>
    `}),i.push({id:`${s.id}_sec4_tf_tree_hierarchy`,type:"concept",lessonNum:s.num_str,lessonId:s.id,module:s.module,sectionTitle:"4. Coordinate Frames & TF2 DAG Hierarchy",badge:"📐 Kinematic TF2 Architecture",title:"4. Coordinate Frames & The Differential Drive TF2 DAG Hierarchy",htmlContent:`
      <div class="l09-joint-layout">
        <div class="l09-joint-anim-stage">
          <img src="assets/images/diff_drive_tf_tree_animation.svg" alt="Differential Drive Robot TF2 Kinematic Transform Tree Animation" />
        </div>
        <div class="l05-banner-intro" style="margin-top: 0.1rem; font-size: 0.72rem; padding: 0.35rem 0.75rem; text-align: center;">
          <strong>💡 Single-Parent Topology:</strong> TF2 strictly enforces a Directed Acyclic Graph (DAG) with zero kinematic loops. The authoritative path flows from <code>map</code> (global SLAM datum) &rarr; <code>odom</code> (continuous 50Hz odometry) &rarr; <code>base_footprint</code> &rarr; <code>base_link</code> &rarr; sensors and wheels.
        </div>
      </div>
    `}),i.push({id:`${s.id}_sec5_fixed_frame_rule`,type:"concept",lessonNum:s.num_str,lessonId:s.id,module:s.module,sectionTitle:"5. The Authoritative Fixed Frame Rule",badge:"🎯 Reference Datum Alignment",title:"5. The Authoritative Fixed Frame Rule & Spatial Sensor Alignment",htmlContent:`
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
    `}),i.push({id:`${s.id}_sec6_launch_pipeline`,type:"concept",lessonNum:s.num_str,lessonId:s.id,module:s.module,sectionTitle:"6. Building the Launch Pipeline: rsp & display",badge:"🚀 Launch Architecture",title:"6. The Robot State Publisher & RViz2 Launch Pipeline Architecture",htmlContent:`
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
    `}),i.push({id:`${s.id}_sec7_tf_cli`,type:"concept",lessonNum:s.num_str,lessonId:s.id,module:s.module,sectionTitle:"7. Kinematic TF Diagnostics & CLI Tools",badge:"🔍 TF2 CLI Diagnostics",title:"7. Kinematic TF Diagnostics: view_frames, tf2_echo & tf2_monitor",htmlContent:`
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
    `})}function ji(a,s,i){i.push({id:`${s.id}_sec1_gazebo_gui_arch`,type:"concept",lessonNum:s.num_str,lessonId:s.id,module:s.module,sectionTitle:"1. Gazebo 3D Simulation Architecture",badge:"🌍 Physics Simulator & GUI Cockpit",title:"1. Gazebo Architecture: 3D Physics Engine Mechanics & Workspace Anatomy",htmlContent:`
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
    `}),i.push({id:`${s.id}_sec2_diff_drive_plugin`,type:"concept",lessonNum:s.num_str,lessonId:s.id,module:s.module,sectionTitle:"2. The Differential Drive Controller Plugin",badge:"🚜 Motion Controller Plugin",title:"2. Closed-Loop Kinematics: libgazebo_ros_diff_drive.so",htmlContent:`
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
    `}),i.push({id:`${s.id}_sec3_lidar_plugin`,type:"concept",lessonNum:s.num_str,lessonId:s.id,module:s.module,sectionTitle:"3. The 2D LiDAR Ray Sensor Plugin",badge:"📡 LiDAR Ray Sensor",title:"3. Simulating Perception: 2D LiDAR Ray Sensor Plugin Configuration",htmlContent:`
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
    `}),i.push({id:`${s.id}_sec4_camera_plugin`,type:"concept",lessonNum:s.num_str,lessonId:s.id,module:s.module,sectionTitle:"4. The RGB Camera Sensor Plugin",badge:"📷 Optical Sensor Plugin",title:"4. Vision Pipeline: RGB Camera Sensor Plugin (libgazebo_ros_camera.so)",htmlContent:`
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
    `}),i.push({id:`${s.id}_sec5_sim_bringup`,type:"concept",lessonNum:s.num_str,lessonId:s.id,module:s.module,sectionTitle:"5. Simulation Bringup Launch Pipeline & Entity Spawner",badge:"🚀 Simulation Bringup",title:"5. Simulation Bringup Launch Pipeline & Entity Spawner Execution",htmlContent:`
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
    `})}function Si(a,s,i){i.push({id:`${s.id}_sec1_sourcing_worlds`,type:"concept",lessonNum:s.num_str,lessonId:s.id,module:s.module,sectionTitle:"1. Sourcing Simulation Worlds: Gazebo Fuel & Open Repositories",badge:"🌐 Simulation World Ecosystem",title:"1. Sourcing Simulation Worlds: Gazebo Fuel Cloud Hub & Open Repositories",htmlContent:`
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
    `}),i.push({id:`${s.id}_sec2_local_model_pkg`,type:"concept",lessonNum:s.num_str,lessonId:s.id,module:s.module,sectionTitle:"2. Local Model Package Setup & model.config",badge:"📦 Package Architecture",title:"2. Local Model Package Architecture: Directory Structure & model.config Manifest",htmlContent:`
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
    `}),i.push({id:`${s.id}_sec3_model_path_resolution`,type:"concept",lessonNum:s.num_str,lessonId:s.id,module:s.module,sectionTitle:"3. Gazebo Model Path Resolution & Launch Hooks",badge:"🔗 Path Resolution",title:"3. Gazebo Model Path Resolution: package.xml Exports & Launch Environment Hooks",htmlContent:`
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
    `}),i.push({id:`${s.id}_sec4_sdf_anatomy`,type:"concept",lessonNum:s.num_str,lessonId:s.id,module:s.module,sectionTitle:"4. Anatomy of an SDF World File",badge:"🌐 SDF World Architecture",title:"4. Anatomy of an SDF World: Environment Hierarchy & Static Elements",htmlContent:`
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
    `}),i.push({id:`${s.id}_sec5_solver_tuning`,type:"concept",lessonNum:s.num_str,lessonId:s.id,module:s.module,sectionTitle:"5. Physics Solver Tuning for Robotics",badge:"⚙️ Physics Engine Tuning",title:"5. Physics Solver Tuning: Balancing Simulation Fidelity & Real-Time Performance",htmlContent:`
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
    `}),i.push({id:`${s.id}_sec6_warehouse_elements`,type:"concept",lessonNum:s.num_str,lessonId:s.id,module:s.module,sectionTitle:"6. Constructing Warehouse Elements",badge:"🏭 Factory Assets",title:"6. Constructing Warehouse Geometry: Corridors, Shelving Racks & Collision Hulls",htmlContent:`
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
    `}),i.push({id:`${s.id}_sec7_viewport_camera`,type:"concept",lessonNum:s.num_str,lessonId:s.id,module:s.module,sectionTitle:"7. Viewport Camera Positioning & Spawning",badge:"🎥 Developer Viewport",title:"7. Developer Experience: Viewport Camera Presets & Dynamic Asset Spawning",htmlContent:`
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
    `})}function wi(a,s,i){i.push({id:`${s.id}_sec_title_localization`,type:"section_title",lessonNum:s.num_str,lessonId:s.id,module:s.module,sectionTitle:"Part I: Localization",badge:"📍 Part I",title:"Localization",titleClass:"text-localization",description:"Estimating the robot pose relative to a known environmental map using sensor observations and wheel odometry."}),i.push({id:`${s.id}_sec_localization_definition`,type:"concept",lessonNum:s.num_str,lessonId:s.id,module:s.module,sectionTitle:"Localization Definition",badge:"📍 Core Definition",title:"Mobile Robot Localization: Problem Statement",htmlContent:`
      <div class="nav-full-image-slide-layout">
        <div class="nav-full-image-container">
          <img src="assets/images/localization_concept_pose_estimation.png" alt="Robot Localization in Given Map" />
        </div>
        <div class="nav-points-banner" style="border-left: 4px solid #3b82f6;">
          <div class="nav-point-bullet">
            <span class="nav-point-icon">❓</span>
            <span><strong>The Fundamental Question:</strong> <em>"Where is the robot inside the warehouse right now?"</em> Using a saved floor map and live sensor readings, determine the robot's current position (X, Y) and heading direction.</span>
          </div>
          <div class="nav-point-bullet">
            <span class="nav-point-icon">🔄</span>
            <span><strong>Odometry vs. Perception:</strong> Wheel encoders drift rapidly from tire slip; 2D LiDAR scans continuously correct drift by matching against known warehouse walls.</span>
          </div>
          <div class="nav-point-bullet">
            <span class="nav-point-icon">🎯</span>
            <span><strong>Handling Uncertainty:</strong> Real-world wheel slip and sensor noise mean the robot can never be 100% certain of its exact spot. Instead, it tracks a "cloud of possible positions" (a probability spread) and picks the most likely match.</span>
          </div>
        </div>
      </div>
    `}),i.push({id:`${s.id}_sec_localization_algorithms`,type:"concept",lessonNum:s.num_str,lessonId:s.id,module:s.module,sectionTitle:"Localization Algorithms",badge:"🤖 Localization Paradigms",title:"Different Types of Localization Algorithms",htmlContent:`
      <div class="l13-clean-vertical-list">
        <div class="l13-clean-list-item">
          <span class="l13-clean-list-badge">1️⃣</span>
          <div class="l13-clean-list-content">
            <div class="l13-clean-list-title">Extended Kalman Filter (The Single-Guess Tracker)</div>
            <div class="l13-clean-list-desc">Keeps track of just <em>one</em> best guess. It is super fast and lightweight on CPU, but if two hallways look identical, it gets tricked and cannot recover.</div>
          </div>
        </div>

        <div class="l13-clean-list-item">
          <span class="l13-clean-list-badge">2️⃣</span>
          <div class="l13-clean-list-content">
            <div class="l13-clean-list-title">Grid Localization (The Giant Chessboard)</div>
            <div class="l13-clean-list-desc">Chops the warehouse floor into tiny square tiles like a giant chessboard and tests every tile. Super thorough, but eats huge computer memory and runs slower.</div>
          </div>
        </div>

        <div class="l13-clean-list-item">
          <span class="l13-clean-list-badge">3️⃣</span>
          <div class="l13-clean-list-content">
            <div class="l13-clean-list-title">Markov Localization (The Thorough Detective)</div>
            <div class="l13-clean-list-desc">Checks every possible position and facing angle across the building. It can find a lost robot from scratch, but it is too slow to drive with in real-time.</div>
          </div>
        </div>

        <div class="l13-clean-list-item">
          <span class="l13-clean-list-badge">4️⃣</span>
          <div class="l13-clean-list-content">
            <div class="l13-clean-list-title" style="color: #10b981;">Monte Carlo / AMCL (The Swarm of Smart Clones) — 🏆 Nav2 Standard</div>
            <div class="l13-clean-list-desc">Scatters hundreds of tiny virtual robot guesses ("particles") across the map. Good guesses that match real laser scans survive and cluster together; bad guesses vanish. Fast, smart, and the universal standard in ROS 2!</div>
          </div>
        </div>
      </div>
    `}),i.push({id:`${s.id}_sec_amcl_measurement_rep`,type:"concept",lessonNum:s.num_str,lessonId:s.id,module:s.module,sectionTitle:"AMCL Measurement Model",badge:"📡 Measurement Model",title:"Measurement Representation: LiDAR Beam Model & Raycasting",htmlContent:`
      <div class="nav-full-image-slide-layout">
        <div class="nav-full-image-container">
          <img src="assets/images/amcl_measurement_representation.png" alt="AMCL Measurement Representation" />
        </div>
        <div class="nav-points-list-clean">
          <div class="nav-point-bullet">
            <span class="nav-point-icon">🔦</span>
            <span><strong>Virtual Laser Flashlight (Raycasting):</strong> For every test guess on the map, the computer shines a fake laser beam until it hits a wall to see what the robot <em>should</em> see from there.</span>
          </div>
          <div class="nav-point-bullet">
            <span class="nav-point-icon">🎯</span>
            <span><strong>Real Scan vs. Map Guess (Matching):</strong> The robot compares its real LiDAR scan with the fake scan. If real walls line up with the guess, that guess gets high confidence points!</span>
          </div>
          <div class="nav-point-bullet">
            <span class="nav-point-icon">🛡️</span>
            <span><strong>Ignoring Everyday Chaos (Noise Protection):</strong> People walk by and dark boxes absorb laser beams. The robot stays calm and doesn't get tricked by a few weird beams.</span>
          </div>
        </div>
      </div>
    `}),i.push({id:`${s.id}_sec1_amcl_step1_uniform`,type:"concept",lessonNum:s.num_str,lessonId:s.id,module:s.module,sectionTitle:"AMCL Step 1",badge:"🎲 AMCL Step 1 / 4",title:"AMCL Step 1: Global Uniform Particle Distribution (Zero Prior Pose)",htmlContent:`
      <div class="nav-full-image-slide-layout">
        <div class="nav-full-image-container">
          <img src="assets/images/amcl_step1_uniform_particles.png" alt="AMCL Step 1: Uniform Particle Distribution" />
        </div>
        <div class="nav-points-banner" style="border-left: 4px solid #eab308;">
          <div class="nav-point-bullet">
            <span class="nav-point-icon">🌐</span>
            <span><strong>Zero Starting Knowledge:</strong> When starting without knowing where the robot is placed, AMCL scatters particles evenly across all open floor spaces in the map.</span>
          </div>
          <div class="nav-point-bullet">
            <span class="nav-point-icon">🧭</span>
            <span><strong>Random Facing Angles:</strong> Each particle gets a random position (X, Y) and a random facing angle (0° to 360°), representing total starting uncertainty.</span>
          </div>
          <div class="nav-point-bullet">
            <span class="nav-point-icon">🎲</span>
            <span><strong>Equal Initial Chances:</strong> Every particle starts with an identical starting weight before the robot begins driving or scanning.</span>
          </div>
        </div>
      </div>
    `}),i.push({id:`${s.id}_sec1_amcl_step2_state_vector`,type:"concept",lessonNum:s.num_str,lessonId:s.id,module:s.module,sectionTitle:"AMCL Step 2",badge:"📐 AMCL Step 2 / 4",title:"AMCL Step 2: Anatomy of the Particle State Vector",htmlContent:`
      <div class="nav-full-image-slide-layout">
        <div class="nav-full-image-container">
          <img src="assets/images/amcl_step2_particle_anatomy.png" alt="AMCL Step 2: Particle Anatomy" />
        </div>
        <div class="nav-points-banner" style="border-left: 4px solid #8b5cf6;">
          <div class="nav-point-bullet">
            <span class="nav-point-icon">📐</span>
            <span><strong>What a Particle Stores:</strong> Each particle is a 4-item guess containing (X position, Y position, Heading angle, and Confidence weight).</span>
          </div>
          <div class="nav-point-bullet">
            <span class="nav-point-icon">⚖️</span>
            <span><strong>Scoring Against Real Scans:</strong> The closer a particle's simulated view matches the robot's real LiDAR scan, the higher confidence score (weight) it gets.</span>
          </div>
          <div class="nav-point-bullet">
            <span class="nav-point-icon">⚡</span>
            <span><strong>Normalized Total Confidence:</strong> All particle confidence scores are scaled so the entire cloud sums to 100% total probability.</span>
          </div>
        </div>
      </div>
    `}),i.push({id:`${s.id}_sec1_amcl_step3_motion_sensor`,type:"concept",lessonNum:s.num_str,lessonId:s.id,module:s.module,sectionTitle:"AMCL Step 3",badge:"⚖️ AMCL Step 3 / 4",title:"AMCL Step 3: Motion Prediction & Measurement Weight Filtering",htmlContent:`
      <div class="nav-full-image-slide-layout">
        <div class="nav-full-image-container">
          <img src="assets/images/amcl_step3_motion_and_sensor_update.png" alt="AMCL Step 3: Motion and Sensor Update" />
        </div>
        <div class="nav-points-banner" style="border-left: 4px solid #06b6d4;">
          <div class="nav-point-bullet">
            <span class="nav-point-icon">🚀</span>
            <span><strong>Phase A (Motion Prediction):</strong> When the robot moves forward, all particles shift forward by the wheel odometer reading, with a tiny bit of random spread added to model tire slip.</span>
          </div>
          <div class="nav-point-bullet">
            <span class="nav-point-icon">🔍</span>
            <span><strong>Phase B (Sensor Correction):</strong> Simulated laser scans compare against real LiDAR returns; particles matching actual physical walls receive high weights (green highlight).</span>
          </div>
          <div class="nav-point-bullet">
            <span class="nav-point-icon">🗑️</span>
            <span><strong>Pruning Infeasible Poses:</strong> Particles predicting walls inside open corridors or free space receive near-zero weights and quickly fade out.</span>
          </div>
        </div>
      </div>
    `}),i.push({id:`${s.id}_sec1_amcl_step4_resampling`,type:"concept",lessonNum:s.num_str,lessonId:s.id,module:s.module,sectionTitle:"AMCL Step 4",badge:"🎯 AMCL Step 4 / 4",title:"AMCL Step 4: Resampling & Pose Convergence",htmlContent:`
      <div class="nav-full-image-slide-layout">
        <div class="nav-full-image-container">
          <img src="assets/images/amcl_step4_resampling_convergence.png" alt="AMCL Step 4: Resampling and Convergence" />
        </div>
        <div class="nav-points-banner" style="border-left: 4px solid #10b981;">
          <div class="nav-point-bullet">
            <span class="nav-point-icon">🎡</span>
            <span><strong>Roulette Wheel Resampling:</strong> Particles are redrawn with replacement proportional to weights; high-weight particles duplicate while low-weight particles vanish.</span>
          </div>
          <div class="nav-point-bullet">
            <span class="nav-point-icon">🎯</span>
            <span><strong>Tight Cloud Convergence:</strong> Within 2–3 motion cycles, the entire particle cloud collapses into a tight, dense cluster centered on the true AMR pose.</span>
          </div>
          <div class="nav-point-bullet">
            <span class="nav-point-icon">📉</span>
            <span><strong>KLD Adaptive Sampling:</strong> AMCL dynamically shrinks active particle count from 2,000 to ~200 once converged, reducing CPU load to &lt; 5%.</span>
          </div>
        </div>
      </div>
    `}),i.push({id:`${s.id}_sec2_challenge_tracking`,type:"concept",lessonNum:s.num_str,lessonId:s.id,module:s.module,sectionTitle:"Challenge: Position Tracking",badge:"⚠️ Localization Challenge 1",title:"Localization Challenges: Position Tracking in Cluttered Warehouses",htmlContent:`
      <div class="nav-full-image-slide-layout">
        <div class="nav-full-image-container">
          <img src="assets/images/localization_position_tracking.png" alt="Position Tracking Challenge" />
        </div>
        <div class="nav-points-banner" style="border-left: 4px solid #eab308;">
          <div class="nav-point-bullet">
            <span class="nav-point-icon">📍</span>
            <span><strong>Local Tracking Condition:</strong> Initial robot pose is known with high certainty; uncertainty remains bounded within a compact Gaussian ellipse along the trajectory.</span>
          </div>
          <div class="nav-point-bullet">
            <span class="nav-point-icon">🛞</span>
            <span><strong>Wheel Slip &amp; Inertial Drift:</strong> Acceleration or dusty warehouse floors induce wheel slippage; high-rate LiDAR range updates prevent runaway odometry drift.</span>
          </div>
          <div class="nav-point-bullet">
            <span class="nav-point-icon">🎯</span>
            <span><strong>High-Frequency Filter Execution:</strong> Maintaining a compact particle cloud around the local pose allows AMCL to execute smoothly at 20 Hz (set <code>update_min_d: 0.1</code>).</span>
          </div>
        </div>
      </div>
    `}),i.push({id:`${s.id}_sec2_challenge_kidnapped`,type:"concept",lessonNum:s.num_str,lessonId:s.id,module:s.module,sectionTitle:"Challenge: Kidnapped Robot",badge:"🚨 Localization Challenge 2",title:"Localization Challenges: The Kidnapped Robot Problem & Global Recovery",htmlContent:`
      <div class="nav-full-image-slide-layout">
        <div class="nav-full-image-container">
          <img src="assets/images/localization_kidnapped_robot.png" alt="Kidnapped Robot Problem" />
        </div>
        <div class="nav-points-banner" style="border-left: 4px solid #ef4444;">
          <div class="nav-point-bullet">
            <span class="nav-point-icon">🚨</span>
            <span><strong>Catastrophic Pose Divergence:</strong> The AMR is manually lifted or shoved to a new location without wheel encoders registering motion, invalidating current particles.</span>
          </div>
          <div class="nav-point-bullet">
            <span class="nav-point-icon">📉</span>
            <span><strong>Likelihood Collapse Detection:</strong> Real LiDAR returns severely conflict with map expectations; AMCL tracks the collapse via short-term vs long-term average weight ratio.</span>
          </div>
          <div class="nav-point-bullet">
            <span class="nav-point-icon">🔄</span>
            <span><strong>Augmented MCL Global Recovery:</strong> Governed by <code>recovery_alpha_fast / slow</code>, AMCL injects random particles across free space, rapidly reconverging to the new pose.</span>
          </div>
        </div>
      </div>
    `}),i.push({id:`${s.id}_sec_title_mapping`,type:"section_title",lessonNum:s.num_str,lessonId:s.id,module:s.module,sectionTitle:"Part II: Mapping",badge:"🗺️ Part II",title:"Mapping",titleClass:"text-mapping",description:"Constructing an accurate 2D metric occupancy grid map of an unknown environment from laser scan observations."}),i.push({id:`${s.id}_sec3_mapping_step1_lattice`,type:"concept",lessonNum:s.num_str,lessonId:s.id,module:s.module,sectionTitle:"Mapping Step 1",badge:"🗺️ Mapping Step 1 / 4",title:"Mapping Step 1: Discretizing Continuous Space into a 2D Grid Lattice",htmlContent:`
      <div class="nav-full-image-slide-layout">
        <div class="nav-full-image-container">
          <img src="assets/images/occupancy_grid_step1_discretization.png" alt="Mapping Step 1: Discretization" />
        </div>
        <div class="nav-points-banner" style="border-left: 4px solid #0284c7;">
          <div class="nav-point-bullet">
            <span class="nav-point-icon">🌐</span>
            <span><strong>Continuous Space to Grid Tiles:</strong> Divides the open warehouse floor into a uniform grid of tiny square tiles so the computer can store the map efficiently.</span>
          </div>
          <div class="nav-point-bullet">
            <span class="nav-point-icon">📐</span>
            <span><strong>Converting Meters to Grid Tiles:</strong> Real-world distances (in meters) are converted to row and column tile numbers by dividing distance from the map origin by the resolution (e.g. 5 cm per tile).</span>
          </div>
          <div class="nav-point-bullet">
            <span class="nav-point-icon">⚡</span>
            <span><strong>Warehouse AMR Standard:</strong> Production facilities standardize on <strong>0.05 m (5 cm)</strong> grid resolution to crisply resolve pallet rack legs and narrow aisles.</span>
          </div>
        </div>
      </div>
    `}),i.push({id:`${s.id}_sec3_mapping_step2_binary_states`,type:"concept",lessonNum:s.num_str,lessonId:s.id,module:s.module,sectionTitle:"Mapping Step 2",badge:"🗺️ Mapping Step 2 / 4",title:"Mapping Step 2: Binary States & Metric Quantization",htmlContent:`
      <div class="nav-full-image-slide-layout">
        <div class="nav-full-image-container">
          <img src="assets/images/occupancy_grid_step2_binary_cells.png" alt="Mapping Step 2: Binary Cells" />
        </div>
        <div class="nav-points-banner" style="border-left: 4px solid #0284c7;">
          <div class="nav-point-bullet">
            <span class="nav-point-icon">⬜</span>
            <span><strong>Free Space (Cell = 0):</strong> Traversable open floor confirmed empty by unobstructed LiDAR rays, allowing safe AMR global path planning.</span>
          </div>
          <div class="nav-point-bullet">
            <span class="nav-point-icon">⬛</span>
            <span><strong>Occupied Barrier (Cell = 100):</strong> Impassable structural obstacles (concrete walls, steel racking) where laser pulses reflect.</span>
          </div>
          <div class="nav-point-bullet">
            <span class="nav-point-icon">🔘</span>
            <span><strong>Unknown Region (Cell = -1):</strong> Unexplored or sensor-shadowed territory; ROS 2 Nav2 costmaps treat unknown space as hazardous/lethal.</span>
          </div>
        </div>
      </div>
    `}),i.push({id:`${s.id}_sec3_mapping_step3_full_matrix`,type:"concept",lessonNum:s.num_str,lessonId:s.id,module:s.module,sectionTitle:"Mapping Step 3",badge:"🗺️ Mapping Step 3 / 4",title:"Mapping Step 3: The Full Warehouse Discretized Binary Matrix",htmlContent:`
      <div class="nav-full-image-slide-layout">
        <div class="nav-full-image-container">
          <img src="assets/images/occupancy_grid_step3_full_matrix.png" alt="Mapping Step 3: Full Matrix" />
        </div>
        <div class="nav-points-banner" style="border-left: 4px solid #10b981;">
          <div class="nav-point-bullet">
            <span class="nav-point-icon">🏢</span>
            <span><strong>Facility-Wide Grid:</strong> The entire floor plan is stored as a large 2D table of cells starting from the bottom-left map origin.</span>
          </div>
          <div class="nav-point-bullet">
            <span class="nav-point-icon">💾</span>
            <span><strong>Lightweight RAM Footprint:</strong> Even a massive 100m by 100m warehouse with high-precision 5 cm tiles takes only ~4 MB of RAM, easily fitting in robot memory.</span>
          </div>
          <div class="nav-point-bullet">
            <span class="nav-point-icon">📦</span>
            <span><strong>ROS 2 Serialization:</strong> Streamed on <code>/map</code> via <code>nav_msgs/msg/OccupancyGrid</code> and exported by <code>nav2_map_server</code> as <code>.yaml</code> metadata plus <code>.pgm</code> image.</span>
          </div>
        </div>
      </div>
    `}),i.push({id:`${s.id}_sec3_mapping_step4_raycast_cone`,type:"concept",lessonNum:s.num_str,lessonId:s.id,module:s.module,sectionTitle:"Mapping Step 4",badge:"🗺️ Mapping Step 4 / 4",title:"Mapping Step 4: The LiDAR Laser Beam Sweep & Cell Confidence Updates",htmlContent:`
      <div class="nav-full-image-slide-layout">
        <div class="nav-full-image-container">
          <img src="assets/images/occupancy_grid_step4_raycast_cone.png" alt="Mapping Step 4: Raycast Cone" />
        </div>
        <div class="nav-points-banner" style="border-left: 4px solid #10b981;">
          <div class="nav-point-bullet">
            <span class="nav-point-icon">🔦</span>
            <span><strong>Tracing Laser Beams:</strong> LiDAR rays sweep straight lines from sensor origin to obstacle; all tiles along the beam path are confirmed clear, open floor.</span>
          </div>
          <div class="nav-point-bullet">
            <span class="nav-point-icon">💥</span>
            <span><strong>Obstacle Reflection Hit:</strong> The tile where the laser beam bounces back is reinforced as a solid obstacle wall.</span>
          </div>
          <div class="nav-point-bullet">
            <span class="nav-point-icon">➕</span>
            <span><strong>Accumulating Confidence:</strong> Instead of multiplying tiny decimals, the robot adds confidence points each time a beam clears or hits a tile, smoothly filtering out sensor noise.</span>
          </div>
        </div>
      </div>
    `}),i.push({id:`${s.id}_sec_title_slam`,type:"section_title",lessonNum:s.num_str,lessonId:s.id,module:s.module,sectionTitle:"Part III: SLAM",badge:"🔄 Part III",title:"SLAM Architecture",titleColor:"#8b5cf6",description:"Simultaneously estimating the robot pose and constructing the environmental map from sensor observations."}),i.push({id:`${s.id}_sec4_slam_dilemma`,type:"concept",lessonNum:s.num_str,lessonId:s.id,module:s.module,sectionTitle:"SLAM Dilemma",badge:"🔄 SLAM Dilemma",title:"The Fundamental SLAM Dilemma & Classical Processing Pipeline",htmlContent:`
      <div class="nav-full-image-slide-layout">
        <div class="nav-full-image-container">
          <img src="assets/images/slam_dilemma_classical_architecture.png" alt="SLAM Dilemma Architecture" />
        </div>
        <div class="nav-points-banner" style="border-left: 4px solid #8b5cf6;">
          <div class="nav-point-bullet">
            <span class="nav-point-icon">🗺️</span>
            <span><strong>The Fundamental Paradox:</strong> Constructing an accurate map requires exact robot poses; but accurately localizing the robot requires an existing map.</span>
          </div>
          <div class="nav-point-bullet">
            <span class="nav-point-icon">🧩</span>
            <span><strong>Scan-Matching Front-End:</strong> Modern SLAM (SLAM Toolbox) correlates incoming 2D scans against local submaps to track incremental displacement without odometry drift.</span>
          </div>
          <div class="nav-point-bullet">
            <span class="nav-point-icon">🔁</span>
            <span><strong>Pose Graph Back-End Optimization:</strong> When revisiting previously mapped areas, loop closure triggers non-linear Ceres optimization to correct accumulated trajectory error.</span>
          </div>
        </div>
      </div>
    `}),i.push({id:`${s.id}_sec_title_practical`,type:"section_title",lessonNum:s.num_str,lessonId:s.id,module:s.module,sectionTitle:"Part IV: Practical",badge:"🛠️ Part IV",title:"ROS 2 SLAM Mapping",titleColor:"#10b981",description:"Hands-on practical engineering: package architecture, launch files, parameter tuning, live teleoperation, and map serialization."}),i.push({id:`${s.id}_sec5_step1_install_packages`,type:"concept",lessonNum:s.num_str,lessonId:s.id,module:s.module,sectionTitle:"Step 1: Install Packages",badge:"📦 Practical Step 1 / 6",title:"Practical Step 1: Install Required ROS 2 Packages",htmlContent:`
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
    `}),i.push({id:`${s.id}_sec5_step2_create_package`,type:"concept",lessonNum:s.num_str,lessonId:s.id,module:s.module,sectionTitle:"Step 2: Create Package",badge:"📁 Practical Step 2 / 6",title:"Practical Step 2: Create Mapping Package in Workspace",htmlContent:`
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
    `}),i.push({id:`${s.id}_sec5_step3_config_launch`,type:"concept",lessonNum:s.num_str,lessonId:s.id,module:s.module,sectionTitle:"Step 3: Config & Launch",badge:"⚙️ Practical Step 3 / 6",title:"Practical Step 3: Add SLAM Configuration & Launch Files",htmlContent:`
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
    `}),i.push({id:`${s.id}_sec5_step4_tuning_config`,type:"concept",lessonNum:s.num_str,lessonId:s.id,module:s.module,sectionTitle:"Step 4: Parameter Tuning",badge:"🎛️ Practical Step 4 / 6",title:"Practical Step 4: SLAM Configuration Parameter Tuning Matrix",htmlContent:`
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
    `}),i.push({id:`${s.id}_sec5_step5_running_teleop`,type:"concept",lessonNum:s.num_str,lessonId:s.id,module:s.module,sectionTitle:"Step 5: Run Launch & Teleop",badge:"🎮 Practical Step 5 / 6",title:"Practical Step 5: Running Launch File & Teleop (Live Mapping in RViz2)",htmlContent:`
      <div class="nav-full-image-slide-layout">
        <div class="nav-full-image-container">
          <img src="assets/images/rviz2_live_slam_mapping.png" alt="RViz2 Live SLAM Mapping Interface" />
        </div>
        <div class="nav-points-banner" style="border-left: 4px solid #10b981;">
          <div class="nav-point-bullet">
            <span class="nav-point-icon">🚀</span>
            <span><strong>Dual Terminal Workflow:</strong> Run <code>ros2 launch nexus_amr_mapping online_async_slam.launch.py</code> and control motion in Terminal 2 via <code>teleop_twist_keyboard</code>.</span>
          </div>
          <div class="nav-point-bullet">
            <span class="nav-point-icon">🐢</span>
            <span><strong>Mapping Driving Discipline:</strong> Maintain low speed (&le; 0.3 m/s); trace the warehouse outer perimeter first to close major loops before filling interior aisles.</span>
          </div>
          <div class="nav-point-bullet">
            <span class="nav-point-icon">🖥️</span>
            <span><strong>Live RViz2 Quality Audit:</strong> Ensure wall contours remain crisp and sharp; double lines or smeared corners signal scan-matching slips caused by excessive wheel spin.</span>
          </div>
        </div>
      </div>
    `}),i.push({id:`${s.id}_sec5_step6_saving_maps`,type:"concept",lessonNum:s.num_str,lessonId:s.id,module:s.module,sectionTitle:"Step 6: Save Maps",badge:"💾 Practical Step 6 / 6",title:"Practical Step 6: Map Serialization & Saving Map Files (.yaml & .pgm)",htmlContent:`
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
    `}),i.push({id:`${s.id}_quiz_amcl_resampling`,type:"quiz",lessonNum:s.num_str,lessonId:s.id,module:s.module,sectionTitle:"Knowledge Check: AMCL & Mapping",badge:"🧠 Interactive Quiz",title:"Knowledge Check: AMCL Particle Filter Weighting",question:"In AMCL, when a simulated LiDAR raycast from a candidate particle pose perfectly matches the distance measured by the physical robot laser scanner, what happens to that particle during measurement correction?",options:["The particle importance weight w increases, making it much more likely to survive and duplicate during resampling","The particle is deleted immediately because deterministic certainty is not allowed in stochastic filters","The particle heading angle theta is forcefully inverted by 180 degrees to search for alternative solutions","The particle is frozen in memory and excluded from all future motion model prediction updates"],answer:0,explanation:"Correct! AMCL evaluates candidate poses by comparing actual laser measurements against expected raycasts through the map. Particles whose predictions closely match real-world observations receive high importance weights and multiply into clusters during the roulette wheel resampling phase."})}function ki(a,s,i){i.push({id:`${s.id}_sec_title_continuous`,type:"section_title",lessonNum:s.num_str,lessonId:s.id,module:s.module,sectionTitle:"Part I: Continuous Space & C-Space",badge:"📐 Part I",title:"Continuous Representation & C-Space",titleClass:"text-navigation",titleColor:"#0284c7",description:"Modeling real-world warehouse environments, robot geometry, clearance checks, and obstacle inflation into Configuration Space."}),i.push({id:`${s.id}_sec2_continuous_step1`,type:"concept",lessonNum:s.num_str,lessonId:s.id,module:s.module,sectionTitle:"2. Continuous Space: 2D Plane",badge:"📐 Step 1",title:"Continuous Space: 2D Plane & Target Waypoint",htmlContent:`
      <div class="nav-full-image-slide-layout">
        <div class="nav-full-image-container">
          <img src="assets/images/nav_continuous_rep_step1.png" alt="Continuous Space 2D Plane" />
        </div>
        <div class="l05-banner-intro nav-bottom-caption" style="border-left: 4px solid #3b82f6; background: rgba(59, 130, 246, 0.08);">
          <strong>💡 Real-World Continuous Floor:</strong> The warehouse is an open 2D floor where the robot can be at any exact position. The goal of path planning is to find a smooth driving path connecting the starting point to the destination.
        </div>
      </div>
    `}),i.push({id:`${s.id}_sec3_continuous_merged_obstacles_swept`,type:"concept",lessonNum:s.num_str,lessonId:s.id,module:s.module,sectionTitle:"3. Obstacles & Swept Trajectory",badge:"📦 Merged Step 2 & 3",title:"Continuous Space: Obstacle Boundaries & Swept Trajectory",htmlContent:`
      <div class="nav-full-image-slide-layout">
        <div class="nav-full-image-container">
          <img src="assets/images/nav_continuous_rep_step3.png" alt="Obstacle Boundaries and Swept Footprint Trajectory" />
        </div>
        <div class="l05-banner-intro nav-bottom-caption" style="border-left: 4px solid #f59e0b; background: rgba(245, 158, 11, 0.08);">
          <strong>💡 The Swept Footprint Area:</strong> As the robot drives along its path, its entire rectangular body sweeps across the floor like a moving shadow. To prevent crashes, this swept footprint must never touch or overlap any wall, box, or pillar.
        </div>
      </div>
    `}),i.push({id:`${s.id}_sec4_clearance_collision`,type:"concept",lessonNum:s.num_str,lessonId:s.id,module:s.module,sectionTitle:"4. Clearance Failure & Collision",badge:"💥 Step 4",title:"Continuous Space: Clearance Failure & Chassis Collision",htmlContent:`
      <div class="nav-full-image-slide-layout">
        <div class="nav-full-image-container">
          <img src="assets/images/nav_continuous_rep_collision.png" alt="Clearance Failure and Chassis Collision" />
        </div>
        <div class="l05-banner-intro nav-bottom-caption" style="border-left: 4px solid #ef4444; background: rgba(239, 68, 68, 0.08);">
          <strong>⚠️ Clearance Failure &amp; Corner Collision:</strong> Even when the centerline trajectory does not intersect obstacles, chassis outer corners clip boundaries in narrow aisles if clearance is under robot width, triggering emergency bumper stops.
        </div>
      </div>
    `}),i.push({id:`${s.id}_sec5_clearance_condition`,type:"concept",lessonNum:s.num_str,lessonId:s.id,module:s.module,sectionTitle:"5. Clearance Condition",badge:"📏 Step 5",title:"Continuous Space: Distance Clearance Condition (d > R)",htmlContent:`
      <div class="nav-full-image-slide-layout">
        <div class="nav-full-image-container">
          <img src="assets/images/nav_continuous_rep_allowable_path.png" alt="Distance Clearance Condition d > R" />
        </div>
        <div class="l05-banner-intro nav-bottom-caption" style="border-left: 4px solid #10b981; background: rgba(16, 185, 129, 0.08);">
          <strong>✅ Safe Distance Rule (Clearance > Robot Radius):</strong> If the robot's center point stays farther from obstacles than its outer corner radius, the robot can safely turn and drive at any angle without colliding.
        </div>
      </div>
    `}),i.push({id:`${s.id}_sec6_cspace_inflation`,type:"concept",lessonNum:s.num_str,lessonId:s.id,module:s.module,sectionTitle:"6. Obstacle Inflation",badge:"🎈 Step 6",title:"Configuration Space: Obstacle Inflation by Robot Radius",htmlContent:`
      <div class="nav-full-image-slide-layout">
        <div class="nav-full-image-container">
          <img src="assets/images/nav_cspace_obstacle_inflation.png" alt="Obstacle Inflation by Robot Radius" />
        </div>
        <div class="l05-banner-intro nav-bottom-caption" style="border-left: 4px solid #8b5cf6; background: rgba(139, 92, 246, 0.08);">
          <strong>🎈 Obstacle Inflation (Padding Obstacles):</strong> By expanding every obstacle outward by the robot's radius, we can treat the robot as a single point! Checking if a point touches an inflated wall is 100x faster than checking a complex turning rectangle.
        </div>
      </div>
    `}),i.push({id:`${s.id}_sec7_cspace_free_obs`,type:"concept",lessonNum:s.num_str,lessonId:s.id,module:s.module,sectionTitle:"7. C_free vs C_obs",badge:"✨ Step 7",title:"Configuration Space: Point AMR in C_free vs. C_obs",htmlContent:`
      <div class="nav-full-image-slide-layout">
        <div class="nav-full-image-container">
          <img src="assets/images/nav_cspace_cfree_cobs.png" alt="Point AMR in C_free vs C_obs" />
        </div>
        <div class="l05-banner-intro nav-bottom-caption" style="border-left: 4px solid #10b981; background: rgba(16, 185, 129, 0.08);">
          <strong>✨ Free Space vs. Obstacle Space:</strong> The warehouse is cleanly divided into two zones: safe driveable floor (Free Space) and forbidden zones (Obstacle Space). Path planning simply finds any line through the safe zone from start to goal.
        </div>
      </div>
    `}),i.push({id:`${s.id}_sec8_costmap_layers`,type:"concept",lessonNum:s.num_str,lessonId:s.id,module:s.module,sectionTitle:"8. Costmap 2D Layers",badge:"🗺️ Architecture",title:"Costmap 2D Architecture: The 3-Tier Layered Representation",htmlContent:`
      <div class="nav-full-image-slide-layout">
        <div class="nav-full-image-container">
          <img src="assets/images/costmap_3tier_layered_architecture.svg" alt="Costmap 2D 3-Tier Layered Architecture Diagram" />
        </div>
        <div class="nav-points-list-clean">
          <div class="nav-point-bullet">
            <span class="nav-point-icon">🥞</span>
            <span><strong>The Layered Sandwich Architecture:</strong> Nav2 stacks the permanent building walls (Static Layer), live sensor obstacles (Obstacle Layer), and safety padding (Inflation Layer) into one master grid.</span>
          </div>
          <div class="nav-point-bullet">
            <span class="nav-point-icon">⚡</span>
            <span><strong>Real-Time Collision Avoidance:</strong> Path planners read this single fused 2D costmap to steer smoothly around static walls and unexpected moving obstacles with guaranteed safety clearance.</span>
          </div>
        </div>
      </div>
    `}),i.push({id:`${s.id}_sec_title_discretization`,type:"section_title",lessonNum:s.num_str,lessonId:s.id,module:s.module,sectionTitle:"Part II: Discretization & Roadmaps",badge:"🗺️ Part II",title:"Discretization & Roadmaps",titleClass:"text-mapping",titleColor:"#d97706",description:"Transforming continuous Configuration Space into searchable topological graphs and discrete cell lattices."}),i.push({id:`${s.id}_sec10_roadmap_taxonomy`,type:"concept",lessonNum:s.num_str,lessonId:s.id,module:s.module,sectionTitle:"10. Path Planning Taxonomy",badge:"🗺️ Overview & Table of Contents",title:"Path Planning Taxonomy: 3 Foundational Roadmap Approaches",htmlContent:`
      <div class="nav-full-image-slide-layout">
        <div class="nav-full-image-container">
          <img src="assets/images/nav_roadmap_taxonomy_3approaches.svg" alt="Path Planning Roadmap 3 Foundational Approaches Taxonomy" />
        </div>
        <div class="nav-points-list-clean">
          <div class="nav-point-bullet">
            <span class="nav-point-icon">🗺️</span>
            <span><strong>3 Core Discretization Approaches:</strong> Continuous open floor space must be turned into a searchable graph. We explore <strong>(1) Visibility Graphs</strong>, <strong>(2) Voronoi Diagrams</strong>, and <strong>(3) Cell Decomposition</strong> in the next slides.</span>
          </div>
          <div class="nav-point-bullet">
            <span class="nav-point-icon">⚡</span>
            <span><strong>Tradeoff Summary:</strong> Visibility Graphs find the shortest path (0 mm clearance); Voronoi finds the safest path (longer detours); Cell Decomposition creates the structured grid used by modern ROS 2 costmaps.</span>
          </div>
        </div>
      </div>
    `}),i.push({id:`${s.id}_sec11_visibility_step1`,type:"concept",lessonNum:s.num_str,lessonId:s.id,module:s.module,sectionTitle:"11. Visibility Graph Step 1",badge:"🔵 Approach 1 of 3 • Visibility Graph (1/2)",title:"Visibility Graph: Interconnecting Visible Obstacle Vertices",htmlContent:`
      <div class="nav-full-image-slide-layout">
        <div class="nav-method-strip is-blue">
          <span>🔵 APPROACH 1 OF 3: VISIBILITY GRAPH &bull; STEP 1 OF 2</span>
        </div>
        <div class="nav-full-image-container">
          <img src="assets/images/nav_visibility_graph_step1.png" alt="Visibility Graph Interconnection" />
        </div>
        <div class="nav-points-list-clean">
          <div class="nav-point-bullet">
            <span class="nav-point-icon">👁️</span>
            <span><strong>Line-of-Sight Network:</strong> The robot draws straight imaginary sightlines between Start, Goal, and every obstacle corner that can "see" each other without walking through walls.</span>
          </div>
          <div class="nav-point-bullet">
            <span class="nav-point-icon">🕸️</span>
            <span><strong>Constructs the Graph:</strong> Solid obstacle interiors block sightlines, leaving a discrete web of walkable straight-line routes ready for graph search.</span>
          </div>
        </div>
      </div>
    `}),i.push({id:`${s.id}_sec12_visibility_step2`,type:"concept",lessonNum:s.num_str,lessonId:s.id,module:s.module,sectionTitle:"12. Visibility Graph Step 2",badge:"🔵 Approach 1 of 3 • Visibility Graph (2/2)",title:"Visibility Graph: Shortest Euclidean Path & Corner Grazing",htmlContent:`
      <div class="nav-full-image-slide-layout">
        <div class="nav-method-strip is-blue">
          <span>🔵 APPROACH 1 OF 3: VISIBILITY GRAPH &bull; STEP 2 OF 2</span>
        </div>
        <div class="nav-full-image-container">
          <img src="assets/images/nav_visibility_graph_step2.png" alt="Visibility Graph Shortest Path" />
        </div>
        <div class="nav-points-list-clean">
          <div class="nav-point-bullet">
            <span class="nav-point-icon">⚡</span>
            <span><strong>Shortest Possible Route:</strong> Moving straight from corner to corner guarantees the mathematically shortest distance between Start and Goal.</span>
          </div>
          <div class="nav-point-bullet">
            <span class="nav-point-icon">⚠️</span>
            <span><strong>The Dangerous Tradeoff (0 mm Clearance):</strong> The line cuts right through sharp obstacle corners with zero buffer! Robots must inflate obstacles first so wheels don't scrape walls.</span>
          </div>
        </div>
      </div>
    `}),i.push({id:`${s.id}_sec13_voronoi`,type:"concept",lessonNum:s.num_str,lessonId:s.id,module:s.module,sectionTitle:"13. Voronoi Diagram",badge:"🟢 Approach 2 of 3 • Voronoi Diagram (1/1)",title:"Voronoi Diagram: Free-Space Bisectors & Maximum Clearance",htmlContent:`
      <div class="nav-full-image-slide-layout">
        <div class="nav-method-strip is-emerald">
          <span>🟢 APPROACH 2 OF 3: VORONOI DIAGRAM &bull; MAXIMUM SAFETY HIGHWAY</span>
        </div>
        <div class="nav-full-image-container">
          <img src="assets/images/nav_voronoi_diagram.png" alt="Voronoi Diagram Bisectors" />
        </div>
        <div class="nav-points-list-clean">
          <div class="nav-point-bullet">
            <span class="nav-point-icon">🛡️</span>
            <span><strong>The Centerline Highway:</strong> Instead of cutting close to corners, Voronoi edges trace a path that stays <em>exactly</em> halfway between neighboring obstacles.</span>
          </div>
          <div class="nav-point-bullet">
            <span class="nav-point-icon">🏎️</span>
            <span><strong>Maximum Safety vs. Longer Paths:</strong> Gives the robot maximum breathing room for fast, safe warehouse driving, at the cost of slightly longer detour routes.</span>
          </div>
        </div>
      </div>
    `}),i.push({id:`${s.id}_sec14_exact_cell_decomp`,type:"concept",lessonNum:s.num_str,lessonId:s.id,module:s.module,sectionTitle:"14. Exact Cell Decomposition",badge:"🟣 Approach 3 of 3 • Cell Decomposition (1/2)",title:"Exact Cell Decomposition: Trapezoidal Geometric Slicing",htmlContent:`
      <div class="nav-full-image-slide-layout">
        <div class="nav-method-strip is-purple">
          <span>🟣 APPROACH 3 OF 3: CELL DECOMPOSITION &bull; PART A: EXACT SLICING</span>
        </div>
        <div class="nav-full-image-container">
          <img src="assets/images/nav_exact_cell_decomp_step1.png" alt="Exact Cell Decomposition" />
        </div>
        <div class="nav-points-list-clean">
          <div class="nav-point-bullet">
            <span class="nav-point-icon">✂️</span>
            <span><strong>Slicing Space into Clean Trapezoids:</strong> Drops imaginary vertical lines from every obstacle corner to partition open floor space into simple geometric shapes.</span>
          </div>
          <div class="nav-point-bullet">
            <span class="nav-point-icon">🎯</span>
            <span><strong>100% Collision-Free Movement:</strong> Driving in a straight line inside any convex trapezoid is guaranteed safe; connecting cell centers forms the roadmap graph.</span>
          </div>
        </div>
      </div>
    `}),i.push({id:`${s.id}_sec15_approx_cell_decomp`,type:"concept",lessonNum:s.num_str,lessonId:s.id,module:s.module,sectionTitle:"15. Approx Cell Decomposition",badge:"🟣 Approach 3 of 3 • Cell Decomposition (2/2)",title:"Approximate Cell Decomposition: Recursive Quadtree Grids",htmlContent:`
      <div class="nav-full-image-slide-layout">
        <div class="nav-method-strip is-purple">
          <span>🟣 APPROACH 3 OF 3: CELL DECOMPOSITION &bull; PART B: QUADTREE GRIDS</span>
        </div>
        <div class="nav-full-image-container">
          <img src="assets/images/nav_approx_cell_decomp_step2.png" alt="Approximate Cell Decomposition Quadtree" />
        </div>
        <div class="nav-points-list-clean">
          <div class="nav-point-bullet">
            <span class="nav-point-icon">🌳</span>
            <span><strong>Recursive Quadtree Slicing:</strong> Divides rooms into 4 squares. If a square touches a wall, it divides into 4 smaller squares until clear corridors emerge.</span>
          </div>
          <div class="nav-point-bullet">
            <span class="nav-point-icon">🗺️</span>
            <span><strong>Standard for 2D Costmaps:</strong> Saves computer memory by keeping large squares in empty rooms and high resolution only near walls—the foundation of ROS 2 Costmaps!</span>
          </div>
        </div>
      </div>
    `}),i.push({id:`${s.id}_sec_title_graph_search`,type:"section_title",lessonNum:s.num_str,lessonId:s.id,module:s.module,sectionTitle:"Part III: Graph Search & Planning",badge:"🔍 Part III",title:"Graph Search & A* Algorithm",titleClass:"text-slam",titleColor:"#7c3aed",description:"Combining distance already traveled with smart straight-line estimates to find the guaranteed shortest path."}),i.push({id:`${s.id}_sec16_astar_formulation`,type:"concept",lessonNum:s.num_str,lessonId:s.id,module:s.module,sectionTitle:"16. A* Search Formulation",badge:"⭐ Formulation",title:"Graph Search: The A* Search Engine & Heuristic Function",htmlContent:`
      <div class="l03-two-col-layout">
        <div class="l03-content-col" style="display: flex; flex-direction: column; justify-content: center; gap: 0.4rem;">
          <div class="l05-golden-card" style="padding: 0.45rem 0.65rem;">
            <div class="l05-golden-header" style="font-size: 0.78rem;"><span>⭐</span><strong>Total Estimated Trip = Traveled Distance + Estimated Distance Remaining</strong></div>
            <p style="font-size: 0.73rem; line-height: 1.32;">• <strong>Traveled Distance (g):</strong> Exact distance already driven from start to this spot.<br/>• <strong>Distance to Goal (h / Heuristic):</strong> Straight-line "as the crow flies" guess to the goal.<br/>• <strong>Total Estimated Trip (f = g + h):</strong> Summing both numbers tells the robot which route looks best.</p>
          </div>
          <div class="l05-golden-card" style="padding: 0.45rem 0.65rem;">
            <div class="l05-golden-header" style="font-size: 0.78rem;"><span>📋</span><strong>Pick the Smallest Estimate First</strong></div>
            <p style="font-size: 0.73rem; line-height: 1.32;">A* always explores the route with the lowest estimated total distance first. This keeps the search focused toward the goal without wandering.</p>
          </div>
        </div>
        <div class="l03-content-col" style="display: flex; flex-direction: column; justify-content: center; gap: 0.4rem;">
          <div style="background: var(--bg-surface); border: 1px solid var(--border-color); border-radius: 8px; padding: 0.5rem; box-shadow: 0 4px 14px rgba(0,0,0,0.12);">
            <div style="font-size: 0.76rem; font-weight: bold; color: #7c3aed; margin-bottom: 0.35rem;">
              Guaranteed Shortest Route Rules
            </div>
            <div style="display: flex; flex-direction: column; gap: 0.35rem; font-size: 0.71rem;">
              <div style="padding: 0.3rem 0.45rem; background: rgba(124, 58, 237, 0.1); border-left: 3px solid #7c3aed; border-radius: 4px;">
                <strong>Optimistic Guess (Never Overestimate):</strong> As long as the straight-line guess is optimistic (never guessing longer than real distance), A* is mathematically guaranteed to find the true shortest route!
              </div>
              <div style="padding: 0.3rem 0.45rem; background: rgba(59, 130, 246, 0.1); border-left: 3px solid #3b82f6; border-radius: 4px;">
                <strong>Without the Guess:</strong> If the robot doesn't guess distance to goal (h = 0), A* becomes Dijkstra search, exploring equally in all directions.
              </div>
            </div>
          </div>
          <div class="l05-banner-intro" style="margin: 0; font-size: 0.71rem; padding: 0.35rem 0.6rem; border-left: 3px solid #7c3aed;">
            <strong>👉 Interactive Engine:</strong> Click through the animated step-by-step node expansion on the next slide!
          </div>
        </div>
      </div>
    `}),i.push({id:`${s.id}_interactive_astar`,type:"interactive",interactiveKey:"astar",lessonNum:s.num_str,lessonId:s.id,module:s.module,sectionTitle:"17. A* Search Execution",badge:"⚡ Interactive On-Click Engine",title:"A* Graph Search: Step-by-Step On-Click Node Expansion"}),i.push({id:`${s.id}_sec_title_local_planning`,type:"section_title",lessonNum:s.num_str,lessonId:s.id,module:s.module,sectionTitle:"Part IV: Local Trajectory Planning",badge:"🏎️ Part IV",title:"Local Planning: Dynamic Window Approach",titleClass:"text-navigation",titleColor:"#e11d48",description:"Real-time velocity generation, acceleration feasibility windows, and forward trajectory rollout scoring."}),i.push({id:`${s.id}_sec17_dwa_rollout`,type:"concept",lessonNum:s.num_str,lessonId:s.id,module:s.module,sectionTitle:"18. DWA Velocity Sampling",badge:"🏎️ DWA Rollout",title:"Dynamic Window Approach (DWA): Velocity Sampling & Forward Rollout",htmlContent:`
      <div class="nav-full-image-slide-layout">
        <div class="nav-full-image-container">
          <img src="assets/images/nav_dwa_local_planner.png" alt="DWA Local Planner Rollout" />
        </div>
        <div class="l05-banner-intro nav-bottom-caption" style="border-left: 4px solid #e11d48; background: rgba(225, 29, 72, 0.08);">
          <strong>🏎️ DWA Reactive Velocity Sampling (20 Hz):</strong> Samples achievable <code>(v, &omega;)</code> pairs within the dynamic window, forward-simulates trajectory arcs, prunes lethal obstacles, and streams the highest-scoring <code>/cmd_vel</code>.
        </div>
      </div>
    `}),i.push({id:`${s.id}_sec_title_nav2_arch`,type:"section_title",lessonNum:s.num_str,lessonId:s.id,module:s.module,sectionTitle:"Part V: Nav2 Stack Architecture",badge:"🏗️ Part V",title:"Nav2 Stack & Path Planning Architecture",titleClass:"text-localization",titleColor:"#4f46e5",description:"Modular ROS 2 navigation framework integrating behavior trees, planners, controllers, costmaps, and recovery behaviors."}),i.push({id:`${s.id}_sec19_stack_block_diagram`,type:"concept",lessonNum:s.num_str,lessonId:s.id,module:s.module,sectionTitle:"20. Nav2 Stack Block Diagram",badge:"🏗️ Architecture Block Diagram",title:"Nav2 Architecture & Stack Subsystems: Complete Block Diagram",htmlContent:`
      <div class="nav-full-image-slide-layout">
        <div class="nav-full-image-container">
          <img src="assets/images/nav2_architecture.png" alt="Nav2 Architecture Diagram (Official docs.nav2.org)" />
        </div>
        <div class="l05-banner-intro nav-bottom-caption" style="border-left: 4px solid #6366f1; background: rgba(99, 102, 241, 0.08);">
          <strong>💡 Nav2 Modular Architecture:</strong> BT Navigator orchestrates ROS 2 action servers (Planner at 1 Hz, Controller at 20 Hz, Recoveries) synchronized across shared Global and Local Costmaps.
        </div>
      </div>
    `}),i.push({id:`${s.id}_sec_title_practical_nav`,type:"section_title",lessonNum:s.num_str,lessonId:s.id,module:s.module,sectionTitle:"Part VI: ROS 2 Navigation Practical",badge:"🛠️ Part VI",title:"ROS 2 Navigation Practical",titleClass:"text-slam",titleColor:"#059669",description:"Hands-on workflow: package installation, workspace creation, launch & config files setup, and AMCL/Nav2 parameter tuning."}),i.push({id:`${s.id}_sec20_step1_install_packages`,type:"concept",lessonNum:s.num_str,lessonId:s.id,module:s.module,sectionTitle:"21. Practical Step 1: Install Packages",badge:"📦 Practical Step 1",title:"Practical Step 1: Install Required Nav2 & Localization Packages",htmlContent:`
      <div style="display: flex; flex-direction: column; gap: 0.5rem; height: 100%; justify-content: center;">
        <div class="ppt-terminal-window" style="box-shadow: 0 4px 16px rgba(0,0,0,0.3);">
          <div class="ppt-term-header">
            <div class="term-dots"><span class="dot red"></span><span class="dot yellow"></span><span class="dot green"></span></div>
            <span class="term-title">student@amr-dev: ~ (bash)</span>
          </div>
          <pre class="ppt-term-body" style="font-size: 0.72rem; line-height: 1.4; padding: 0.55rem;"><code class="language-bash"># Update local package indexes
sudo apt update

# Install complete Nav2 stack, bringup scripts, and dual-EKF localization
sudo apt install -y   ros-humble-navigation2   ros-humble-nav2-bringup   ros-humble-robot-localization

# Verify registration of all core Nav2 executables
ros2 pkg list | grep -E "nav2_|navigation2"</code></pre>
        </div>

        <!-- 3-Column Package Capability Badges -->
        <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 0.55rem;">
          <div class="l05-golden-card" style="padding: 0.4rem 0.65rem; margin: 0;">
            <div class="l05-golden-header" style="font-size: 0.77rem; color: #38bdf8;"><span>📦</span><strong>navigation2</strong></div>
            <p style="font-size: 0.71rem; line-height: 1.32; margin: 0.2rem 0 0 0;">Planner Server, Controller Server, BT Navigator, Costmap 2D, and Map Server engines.</p>
          </div>
          <div class="l05-golden-card" style="padding: 0.4rem 0.65rem; margin: 0;">
            <div class="l05-golden-header" style="font-size: 0.77rem; color: #f59e0b;"><span>🚀</span><strong>nav2_bringup</strong></div>
            <p style="font-size: 0.71rem; line-height: 1.32; margin: 0.2rem 0 0 0;">Standard launch descriptions, lifecycle manager automations, and default RViz views.</p>
          </div>
          <div class="l05-golden-card" style="padding: 0.4rem 0.65rem; margin: 0;">
            <div class="l05-golden-header" style="font-size: 0.77rem; color: #10b981;"><span>📍</span><strong>robot_localization</strong></div>
            <p style="font-size: 0.71rem; line-height: 1.32; margin: 0.2rem 0 0 0;">Dual Extended Kalman Filter fusing wheel encoder odometry and IMU angular rate.</p>
          </div>
        </div>
      </div>
    `}),i.push({id:`${s.id}_sec21_step2_create_package`,type:"concept",lessonNum:s.num_str,lessonId:s.id,module:s.module,sectionTitle:"22. Practical Step 2: Create Package",badge:"📁 Practical Step 2",title:"Practical Step 2: Create Navigation Package in Workspace",htmlContent:`
      <div class="practical-step-layout">
        <!-- Left: Visual Package File Tree -->
        <div style="background: rgba(15, 23, 42, 0.7); border: 1px solid var(--border-color); border-radius: 8px; padding: 0.55rem; box-shadow: 0 4px 14px rgba(0,0,0,0.18);">
          <div style="font-size: 0.76rem; font-weight: bold; color: #38bdf8; margin-bottom: 0.35rem; display: flex; align-items: center; gap: 0.35rem;">
            <span>📁</span> Target Package Hierarchy
          </div>
          <div style="font-family: var(--font-mono); font-size: 0.71rem; line-height: 1.45; color: #cbd5e1;">
            <div style="color: #60a5fa; font-weight: 700;">nexus_amr_navigation/</div>
            <div style="padding-left: 0.8rem;">├── 📁 <strong>config/</strong> <span style="color: #94a3b8; font-size: 0.65rem;">(nav2_params.yaml)</span></div>
            <div style="padding-left: 0.8rem;">├── 📁 <strong>launch/</strong> <span style="color: #94a3b8; font-size: 0.65rem;">(navigation.launch.py)</span></div>
            <div style="padding-left: 0.8rem;">├── 📁 <strong>maps/</strong>   <span style="color: #94a3b8; font-size: 0.65rem;">(warehouse_map.yaml &amp; .pgm)</span></div>
            <div style="padding-left: 0.8rem;">├── 📁 <strong>rviz/</strong>   <span style="color: #94a3b8; font-size: 0.65rem;">(nav2_default_view.rviz)</span></div>
            <div style="padding-left: 0.8rem; color: #94a3b8;">├── 📄 package.xml</div>
            <div style="padding-left: 0.8rem; color: #94a3b8;">└── 📄 setup.py / setup.cfg</div>
          </div>
          <div class="l05-banner-intro" style="margin-top: 0.45rem; font-size: 0.68rem; padding: 0.3rem 0.5rem; border-left: 3px solid #10b981;">
            <strong>Standard Layout:</strong> Separates robot tuning configs from raw simulation assets.
          </div>
        </div>

        <!-- Right: Terminal Commands -->
        <div class="ppt-terminal-window">
          <div class="ppt-term-header">
            <div class="term-dots"><span class="dot red"></span><span class="dot yellow"></span><span class="dot green"></span></div>
            <span class="term-title">student@amr-dev: ~/ros2_ws/src (bash)</span>
          </div>
          <pre class="ppt-term-body" style="font-size: 0.70rem; line-height: 1.38; padding: 0.5rem;"><code class="language-bash">cd ~/ros2_ws/src

# Create Python navigation deployment package
ros2 pkg create --build-type ament_python nexus_amr_navigation   --dependencies rclpy nav2_bringup geometry_msgs sensor_msgs

# Create structured asset subdirectories
cd nexus_amr_navigation
mkdir -p config launch maps rviz

# Register data_files in setup.py and compile
cd ~/ros2_ws
colcon build --packages-select nexus_amr_navigation --symlink-install</code></pre>
        </div>
      </div>
    `}),i.push({id:`${s.id}_sec22_step3_setup_config`,type:"concept",lessonNum:s.num_str,lessonId:s.id,module:s.module,sectionTitle:"23. Practical Step 3: Setup Config",badge:"⚙️ Practical Step 3",title:"Practical Step 3: Setup Configuration Files (nav2_params.yaml)",htmlContent:`
      <div class="practical-step-layout">
        <!-- Left: IDE Code Preview -->
        <div class="ppt-ide-window">
          <div class="ppt-ide-header">
            <div class="ide-dots"><span class="dot red"></span><span class="dot yellow"></span><span class="dot green"></span></div>
            <span class="ide-file-tab">config/nav2_params.yaml</span>
          </div>
          <pre class="ppt-ide-body" style="font-size: 0.67rem; line-height: 1.34; padding: 0.5rem;"><code class="language-yaml">amcl:
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

        <!-- Right: 3 Parameter Callout Cards -->
        <div style="display: flex; flex-direction: column; gap: 0.4rem; justify-content: center;">
          <div class="l05-golden-card" style="padding: 0.4rem 0.65rem; margin: 0;">
            <div class="l05-golden-header" style="font-size: 0.77rem; color: #38bdf8;"><span>📍</span><strong>1. amcl Node</strong></div>
            <p style="font-size: 0.71rem; line-height: 1.32; margin: 0.2rem 0 0 0;">Controls Monte Carlo particle limits and scan likelihood field matching against static map.</p>
          </div>
          <div class="l05-golden-card" style="padding: 0.4rem 0.65rem; margin: 0;">
            <div class="l05-golden-header" style="font-size: 0.77rem; color: #a855f7;"><span>🗺️</span><strong>2. planner_server (A*)</strong></div>
            <p style="font-size: 0.71rem; line-height: 1.32; margin: 0.2rem 0 0 0;">Sets <code>use_astar: true</code> for optimal shortest global paths over Dijkstra search.</p>
          </div>
          <div class="l05-golden-card" style="padding: 0.4rem 0.65rem; margin: 0;">
            <div class="l05-golden-header" style="font-size: 0.77rem; color: #10b981;"><span>🏎️</span><strong>3. controller_server (DWB)</strong></div>
            <p style="font-size: 0.71rem; line-height: 1.32; margin: 0.2rem 0 0 0;">Sets 20 Hz control loop frequency with physical robot kinematic limits (v<sub>max</sub> = 0.6 m/s).</p>
          </div>
        </div>
      </div>
    `}),i.push({id:`${s.id}_sec23_step4_setup_launch`,type:"concept",lessonNum:s.num_str,lessonId:s.id,module:s.module,sectionTitle:"24. Practical Step 4: Setup Launch",badge:"🚀 Practical Step 4",title:"Practical Step 4: Setup Navigation Launch File (navigation.launch.py)",htmlContent:`
      <div class="practical-step-layout">
        <!-- Left: IDE Code Preview -->
        <div class="ppt-ide-window">
          <div class="ppt-ide-header">
            <div class="ide-dots"><span class="dot red"></span><span class="dot yellow"></span><span class="dot green"></span></div>
            <span class="ide-file-tab">launch/navigation.launch.py</span>
          </div>
          <pre class="ppt-ide-body" style="font-size: 0.66rem; line-height: 1.34; padding: 0.45rem;"><code class="language-python">from launch import LaunchDescription
from launch.actions import IncludeLaunchDescription
from launch.launch_description_sources import PythonLaunchDescriptionSource
from launch_ros.substitutions import FindPackageShare
from launch.substitutions import PathJoinSubstitution

def generate_launch_description():
    pkg_nav = FindPackageShare('nexus_amr_navigation')
    pkg_bringup = FindPackageShare('nav2_bringup')
    
    return LaunchDescription([
        IncludeLaunchDescription(
            PythonLaunchDescriptionSource(
                PathJoinSubstitution([pkg_bringup, 'launch', 'bringup_launch.py'])
            ),
            launch_arguments={
                'map': PathJoinSubstitution([pkg_nav, 'maps', 'warehouse_map.yaml']),
                'params_file': PathJoinSubstitution([pkg_nav, 'config', 'nav2_params.yaml']),
                'use_sim_time': 'True',
                'autostart': 'True'
            }.items()
        )
    ])</code></pre>
        </div>

        <!-- Right: Launch Architecture Pipeline -->
        <div style="display: flex; flex-direction: column; gap: 0.4rem; justify-content: center;">
          <div class="l05-golden-card" style="padding: 0.4rem 0.65rem; margin: 0;">
            <div class="l05-golden-header" style="font-size: 0.77rem; color: #38bdf8;"><span>1️⃣</span><strong>Package Share Resolution</strong></div>
            <p style="font-size: 0.71rem; line-height: 1.32; margin: 0.2rem 0 0 0;"><code>FindPackageShare</code> resolves installed paths dynamically, preventing fragile hardcoded local paths.</p>
          </div>
          <div class="l05-golden-card" style="padding: 0.4rem 0.65rem; margin: 0;">
            <div class="l05-golden-header" style="font-size: 0.77rem; color: #f59e0b;"><span>2️⃣</span><strong>nav2_bringup Composition</strong></div>
            <p style="font-size: 0.71rem; line-height: 1.32; margin: 0.2rem 0 0 0;">Includes upstream <code>bringup_launch.py</code>, launching 10+ Nav2 servers in a single coordinated action.</p>
          </div>
          <div class="l05-golden-card" style="padding: 0.4rem 0.65rem; margin: 0;">
            <div class="l05-golden-header" style="font-size: 0.77rem; color: #10b981;"><span>3️⃣</span><strong>Lifecycle Autostart: True</strong></div>
            <p style="font-size: 0.71rem; line-height: 1.32; margin: 0.2rem 0 0 0;">Automatically orchestrates all nodes from <em>Unconfigured</em> &rarr; <em>Inactive</em> &rarr; <em>Active</em> on launch.</p>
          </div>
        </div>
      </div>
    `}),i.push({id:`${s.id}_sec24_step5_launching_execution`,type:"concept",lessonNum:s.num_str,lessonId:s.id,module:s.module,sectionTitle:"25. Practical Step 5: Launch & RViz2",badge:"🎯 Practical Step 5",title:"Practical Step 5: Launching Navigation & Live RViz2 Mission Execution",htmlContent:`
      <div style="display: flex; flex-direction: column; gap: 0.5rem; height: 100%; justify-content: center;">
        <!-- Top Terminal Launch Bar -->
        <div class="ppt-terminal-window" style="box-shadow: 0 4px 16px rgba(0,0,0,0.3);">
          <div class="ppt-term-header">
            <div class="term-dots"><span class="dot red"></span><span class="dot yellow"></span><span class="dot green"></span></div>
            <span class="term-title">student@amr-dev: ~ (Dual Execution Terminals)</span>
          </div>
          <pre class="ppt-term-body" style="font-size: 0.70rem; line-height: 1.38; padding: 0.5rem;"><code class="language-bash"># Terminal 1: Launch Gazebo warehouse world & robot description
ros2 launch nexus_amr_description gazebo.launch.py

# Terminal 2: Launch complete Nav2 stack with pre-tuned parameters
ros2 launch nexus_amr_navigation navigation.launch.py</code></pre>
        </div>

        <!-- Bottom 2-Card Operational Verification -->
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.55rem;">
          <div class="l05-golden-card" style="padding: 0.45rem 0.65rem; margin: 0;">
            <div class="l05-golden-header" style="font-size: 0.77rem; color: #38bdf8;"><span>📍</span><strong>1. 2D Pose Estimate (AMCL Initializer)</strong></div>
            <p style="font-size: 0.71rem; line-height: 1.34; margin: 0.2rem 0 0 0;">In RViz2, click <strong>2D Pose Estimate</strong>, click &amp; drag green arrow matching AMR location. AMCL particle cloud collapses tightly around robot footprint.</p>
          </div>
          <div class="l05-golden-card" style="padding: 0.45rem 0.65rem; margin: 0;">
            <div class="l05-golden-header" style="font-size: 0.77rem; color: #10b981;"><span>🎯</span><strong>2. Nav2 Goal (Autonomous Mission)</strong></div>
            <p style="font-size: 0.71rem; line-height: 1.34; margin: 0.2rem 0 0 0;">Click <strong>Nav2 Goal</strong> on target warehouse pallet station. Global planner computes green line; local controller generates velocity rollouts on <code>/cmd_vel</code>.</p>
          </div>
        </div>
      </div>
    `}),i.push({id:`${s.id}_sec25_step6_amcl_costmap_tuning`,type:"concept",lessonNum:s.num_str,lessonId:s.id,module:s.module,sectionTitle:"26. Practical Step 6: Tuning Matrix",badge:"🎛️ Tuning Matrix I",title:"Practical Step 6: AMCL & Costmap 2D Parameter Tuning Guide",htmlContent:`
      <div class="diagnostic-matrix-layout">
        <!-- Structured 3-Row Diagnostic Troubleshooting Table -->
        <div style="background: var(--bg-surface); border: 1px solid var(--border-color); border-radius: 8px; padding: 0.5rem 0.65rem; box-shadow: 0 4px 14px rgba(0,0,0,0.12);">
          <div style="font-size: 0.77rem; font-weight: bold; color: #38bdf8; margin-bottom: 0.35rem; display: flex; align-items: center; gap: 0.35rem;">
            <span>🎛️</span> Field Diagnostics: AMCL &amp; Costmap 2D
          </div>
          <table style="width: 100%; border-collapse: collapse; font-size: 0.71rem; line-height: 1.35;">
            <thead>
              <tr style="border-bottom: 1px solid var(--border-color); color: var(--text-muted); text-align: left;">
                <th style="padding: 0.25rem 0.4rem; width: 28%;">⚠️ Observed Symptom</th>
                <th style="padding: 0.25rem 0.4rem; width: 34%;">🔍 Key Parameters to Adjust</th>
                <th style="padding: 0.25rem 0.4rem; width: 38%;">🛠️ Recommended Engineering Remedy</th>
              </tr>
            </thead>
            <tbody>
              <tr style="border-bottom: 1px solid rgba(255,255,255,0.06);">
                <td style="padding: 0.3rem 0.4rem; color: #f87171; font-weight: 600;">AMCL Particle Deprivation / CPU Spikes</td>
                <td style="padding: 0.3rem 0.4rem;"><code>min_particles: 500</code><br><code>max_particles: 2000</code></td>
                <td style="padding: 0.3rem 0.4rem; color: var(--text-secondary);">Clamp particle count to 2000; set <code>update_min_d: 0.20m</code> to prevent sensor updates when AMR is stationary.</td>
              </tr>
              <tr style="border-bottom: 1px solid rgba(255,255,255,0.06);">
                <td style="padding: 0.3rem 0.4rem; color: #facc15; font-weight: 600;">Phantom Obstacles Linger in Costmap</td>
                <td style="padding: 0.3rem 0.4rem;"><code>raytrace_max_range: 3.5m</code><br><code>obstacle_max_range: 3.0m</code></td>
                <td style="padding: 0.3rem 0.4rem; color: var(--text-secondary);">Ensure <code>raytrace_range &gt; obstacle_range</code> so subsequent laser sweeps actively clear transient obstacles.</td>
              </tr>
              <tr>
                <td style="padding: 0.3rem 0.4rem; color: #60a5fa; font-weight: 600;">AMR Refuses to Traverse Doorways</td>
                <td style="padding: 0.3rem 0.4rem;"><code>inflation_radius: 0.55m</code><br><code>cost_scaling_factor: 5.0</code></td>
                <td style="padding: 0.3rem 0.4rem; color: var(--text-secondary);">Increase &alpha; to 5.0 for steeper decay; reduce inflation radius to <code>chassis_radius + 0.15m</code>.</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="l05-banner-intro" style="margin: 0; font-size: 0.71rem; padding: 0.35rem 0.65rem; border-left: 3px solid #10b981;">
          🎯 <strong>Tuning Rule #1:</strong> Always tune AMCL localization covariance first! If particle spread is broad, costmaps will jitter and controllers will generate erratic oscillatory curves.
        </div>
      </div>
    `}),i.push({id:`${s.id}_sec26_step7_controller_tuning`,type:"concept",lessonNum:s.num_str,lessonId:s.id,module:s.module,sectionTitle:"27. Controller Tuning Matrix",badge:"⚖️ Tuning Matrix II",title:"Practical Step 7: Controller Server (DWB vs. RPP) Tuning Guide",htmlContent:`
      <div class="diagnostic-matrix-layout">
        <!-- Top Controller Comparison Bar -->
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.55rem;">
          <div style="background: rgba(59, 130, 246, 0.12); border: 1px solid rgba(59, 130, 246, 0.4); border-radius: 8px; padding: 0.4rem 0.65rem;">
            <div style="font-size: 0.77rem; font-weight: 700; color: #60a5fa; margin-bottom: 0.2rem;">🏎️ Regulated Pure Pursuit (RPP)</div>
            <p style="font-size: 0.71rem; line-height: 1.32; margin: 0; color: var(--text-secondary);">
              <strong>Best For:</strong> Fixed warehouse aisles &amp; predictable paths.<br>
              <strong>Key Tuning:</strong> <code>lookahead_dist: 0.6m</code>, <code>use_regulated_linear_velocity_scaling: true</code> (slows in corners).
            </p>
          </div>
          <div style="background: rgba(168, 85, 247, 0.12); border: 1px solid rgba(168, 85, 247, 0.4); border-radius: 8px; padding: 0.4rem 0.65rem;">
            <div style="font-size: 0.77rem; font-weight: 700; color: #c084fc; margin-bottom: 0.2rem;">🎯 DWB Local Controller (Dynamic Window)</div>
            <p style="font-size: 0.71rem; line-height: 1.32; margin: 0; color: var(--text-secondary);">
              <strong>Best For:</strong> Dynamic obstacle swerving &amp; tight open-floor navigation.<br>
              <strong>Key Tuning:</strong> <code>PathAlign (32.0)</code>, <code>PathDist (32.0)</code>, <code>BaseObstacle (0.02)</code>.
            </p>
          </div>
        </div>

        <!-- Bottom Controller Diagnostic Matrix -->
        <div style="background: var(--bg-surface); border: 1px solid var(--border-color); border-radius: 8px; padding: 0.45rem 0.65rem;">
          <table style="width: 100%; border-collapse: collapse; font-size: 0.70rem; line-height: 1.32;">
            <thead>
              <tr style="border-bottom: 1px solid var(--border-color); color: var(--text-muted); text-align: left;">
                <th style="padding: 0.2rem 0.35rem;">Controller Symptom</th>
                <th style="padding: 0.2rem 0.35rem;">Root Cause</th>
                <th style="padding: 0.2rem 0.35rem;">Tuning Adjustment</th>
              </tr>
            </thead>
            <tbody>
              <tr style="border-bottom: 1px solid rgba(255,255,255,0.06);">
                <td style="padding: 0.25rem 0.35rem; color: #f87171; font-weight: 600;">AMR Snake Oscillations</td>
                <td style="padding: 0.25rem 0.35rem;"><code>PathAlign</code> critic scale too high</td>
                <td style="padding: 0.25rem 0.35rem;">Reduce <code>PathAlign.scale</code> from 32.0 &rarr; 16.0; or increase RPP lookahead to 0.7m.</td>
              </tr>
              <tr style="border-bottom: 1px solid rgba(255,255,255,0.06);">
                <td style="padding: 0.25rem 0.35rem; color: #facc15; font-weight: 600;">Overshooting Corners</td>
                <td style="padding: 0.25rem 0.35rem;">Velocity too high entering turn</td>
                <td style="padding: 0.25rem 0.35rem;">Enable <code>regulated_linear_velocity_scaling</code> and increase <code>PathDist.scale</code>.</td>
              </tr>
              <tr>
                <td style="padding: 0.25rem 0.35rem; color: #10b981; font-weight: 600;">Station Docking Jitter</td>
                <td style="padding: 0.25rem 0.35rem;">Goal tolerance too strict</td>
                <td style="padding: 0.25rem 0.35rem;">Set <code>xy_goal_tolerance: 0.12m</code> and <code>yaw_goal_tolerance: 0.08rad</code>.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    `}),i.push({id:`${s.id}_sec27_step8_recovery_tuning`,type:"concept",lessonNum:s.num_str,lessonId:s.id,module:s.module,sectionTitle:"28. Recovery & Lifecycle Matrix",badge:"🛡️ Tuning Matrix III",title:"Practical Step 8: Recovery Behaviors & Progress Checker Matrix",htmlContent:`
      <div class="diagnostic-matrix-layout">
        <!-- 5-Tier Recovery Escalation Ladder -->
        <div style="background: rgba(15, 23, 42, 0.7); border: 1px solid var(--border-color); border-radius: 8px; padding: 0.5rem 0.7rem; box-shadow: 0 4px 14px rgba(0,0,0,0.18);">
          <div style="font-size: 0.77rem; font-weight: bold; color: #f87171; margin-bottom: 0.35rem; display: flex; align-items: center; gap: 0.35rem;">
            <span>🚨</span> Autonomous Recovery Escalation Ladder
          </div>
          <div style="display: grid; grid-template-columns: repeat(5, 1fr); gap: 0.4rem; text-align: center;">
            <div style="background: rgba(59, 130, 246, 0.15); border: 1px solid #3b82f6; border-radius: 6px; padding: 0.35rem 0.25rem;">
              <div style="font-size: 0.66rem; font-weight: bold; color: #93c5fd;">Level 1</div>
              <div style="font-size: 0.72rem; font-weight: bold; color: #fff; margin: 0.15rem 0;">⏱️ Progress Check</div>
              <div style="font-size: 0.64rem; color: #cbd5e1;">Timeout if &Delta;d &lt; 0.2m in 10s</div>
            </div>
            <div style="background: rgba(16, 185, 129, 0.15); border: 1px solid #10b981; border-radius: 6px; padding: 0.35rem 0.25rem;">
              <div style="font-size: 0.66rem; font-weight: bold; color: #a7f3d0;">Level 2</div>
              <div style="font-size: 0.72rem; font-weight: bold; color: #fff; margin: 0.15rem 0;">🧹 Clear Costmap</div>
              <div style="font-size: 0.64rem; color: #cbd5e1;">Erase dynamic obstacle layer</div>
            </div>
            <div style="background: rgba(245, 158, 11, 0.15); border: 1px solid #f59e0b; border-radius: 6px; padding: 0.35rem 0.25rem;">
              <div style="font-size: 0.66rem; font-weight: bold; color: #fde68a;">Level 3</div>
              <div style="font-size: 0.72rem; font-weight: bold; color: #fff; margin: 0.15rem 0;">⏪ Backup (15 cm)</div>
              <div style="font-size: 0.64rem; color: #cbd5e1;">Reverse 0.15m at 0.05 m/s</div>
            </div>
            <div style="background: rgba(168, 85, 247, 0.15); border: 1px solid #a855f7; border-radius: 6px; padding: 0.35rem 0.25rem;">
              <div style="font-size: 0.66rem; font-weight: bold; color: #e9d5ff;">Level 4</div>
              <div style="font-size: 0.72rem; font-weight: bold; color: #fff; margin: 0.15rem 0;">🔄 Spin (90&deg;)</div>
              <div style="font-size: 0.64rem; color: #cbd5e1;">Clear sensor blind spots</div>
            </div>
            <div style="background: rgba(239, 68, 68, 0.2); border: 1px solid #ef4444; border-radius: 6px; padding: 0.35rem 0.25rem;">
              <div style="font-size: 0.66rem; font-weight: bold; color: #fca5a5;">Level 5</div>
              <div style="font-size: 0.72rem; font-weight: bold; color: #fff; margin: 0.15rem 0;">🛑 Operator Alert</div>
              <div style="font-size: 0.64rem; color: #cbd5e1;">Sound beacon &amp; lock brakes</div>
            </div>
          </div>
        </div>

        <!-- Key Parameter Specifications -->
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.55rem;">
          <div class="l05-golden-card" style="padding: 0.4rem 0.65rem; margin: 0;">
            <div class="l05-golden-header" style="font-size: 0.77rem; color: #f59e0b;"><span>⏱️</span><strong>Progress Checker Parameters</strong></div>
            <p style="font-size: 0.71rem; line-height: 1.32; margin: 0.2rem 0 0 0;"><code>movement_time_allowance: 10.0s</code> paired with <code>required_movement_radius: 0.2m</code> allows gentle navigation through crowds before triggering fault recovery.</p>
          </div>
          <div class="l05-golden-card" style="padding: 0.4rem 0.65rem; margin: 0;">
            <div class="l05-golden-header" style="font-size: 0.77rem; color: #ef4444;"><span>🛡️</span><strong>Costmap Clearing Behavior</strong></div>
            <p style="font-size: 0.71rem; line-height: 1.32; margin: 0.2rem 0 0 0;"><code>clear_entirely_local_costmap</code> resets voxel layers, removing transient false obstacles caused by pedestrian legs or dust reflections.</p>
          </div>
        </div>
      </div>
    `}),i.push({id:`${s.id}_quiz_cspace_inflation`,type:"quiz",lessonNum:s.num_str,lessonId:s.id,module:s.module,sectionTitle:"Assessment: C-Space",title:"Configuration Space & Costmap Inflation",question:"Why do modern mobile robotics navigation algorithms inflate obstacle boundaries by the robot radius R to form Configuration Space (C-Space)?",options:["To increase 2D LiDAR detection range and improve laser scan reflectivity.","To allow the physical robot to be treated as an infinitesimal 0-radius point particle.","To speed up wheel encoder odometry integration rates from 50 Hz to 200 Hz.","To convert differential-drive kinematic models into omnidirectional holonomic models."],answer:1,explanation:"Inflating obstacles outward by the robot radius turns the robot into a simple point on the map, making collision checking 100x faster and simpler."}),i.push({id:`${s.id}_quiz_astar_heuristics`,type:"quiz",lessonNum:s.num_str,lessonId:s.id,module:s.module,sectionTitle:"Assessment: A* & DWA",title:"A* Heuristic Rules & Path Optimality",question:"In A* path planning (Total Estimate = Distance Traveled + Guess to Goal), how must the goal distance guess behave to guarantee finding the shortest path?",options:["The guess must always equal zero for all points on the map.","The guess must overestimate the distance to force the robot to hurry.","The guess must never overestimate the true remaining distance (stay optimistic or equal to straight-line distance).","The guess must use complex grid matrix algebra."],answer:2,explanation:"An optimistic guess (admissible heuristic) ensures the robot never ignores a potentially shorter route. This guarantees that the first path reaching the goal is the true shortest route."}),i.push({id:`${s.id}_quiz_param_tuning`,type:"quiz",lessonNum:s.num_str,lessonId:s.id,module:s.module,sectionTitle:"Assessment: Tuning & Recovery",title:"Nav2 Parameter Tuning & Recovery Escalation",question:"If the AMR gets wedged in an aisle and the Progress Checker times out after 10 seconds, what is the correct Nav2 recovery escalation sequence?",options:["Immediate emergency shutdown of the motor drivers and reset of all nodes.","Wipe local costmap obstacle layer &rarr; BackUp 0.15m &rarr; Spin 90&deg; &rarr; Replan global path.","Double the maximum velocity to 1.2 m/s to power through the obstruction.","Switch from DWB controller to manual teleoperation mode automatically."],answer:1,explanation:"Nav2 recovery escalation systematically clears transient sensor noise (phantom obstacles), reverses away from collision boundaries, rotates to acquire new laser clearance, and requests a fresh global plan."}),i.push({id:`${s.id}_sec28_summary`,type:"concept",lessonNum:s.num_str,lessonId:s.id,module:s.module,sectionTitle:"Summary & Key Takeaways",badge:"🎓 Lesson Summary",title:"Lesson 14 Summary & Key Takeaways",htmlContent:`
      <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 0.5rem; height: 100%; align-items: stretch;">
        <div style="background: var(--bg-surface); border: 1px solid var(--border-color); border-radius: 8px; padding: 0.5rem; display: flex; flex-direction: column; justify-content: space-between;">
          <div>
            <div style="font-size: 0.78rem; font-weight: bold; color: #0284c7; margin-bottom: 0.35rem; display: flex; align-items: center; gap: 0.3rem;">
              <span>📐</span> Continuous &amp; C-Space
            </div>
            <p style="font-size: 0.72rem; line-height: 1.35; color: var(--text-secondary);">Padding obstacles by the robot radius turns complex chassis collisions into simple point checks on a safe floor map.</p>
          </div>
          <div style="font-size: 0.68rem; color: #0284c7; font-weight: bold;">
            Key: Safe clearance buffer
          </div>
        </div>

        <div style="background: var(--bg-surface); border: 1px solid var(--border-color); border-radius: 8px; padding: 0.5rem; display: flex; flex-direction: column; justify-content: space-between;">
          <div>
            <div style="font-size: 0.78rem; font-weight: bold; color: #7c3aed; margin-bottom: 0.35rem; display: flex; align-items: center; gap: 0.3rem;">
              <span>⭐</span> Discretization &amp; A*
            </div>
            <p style="font-size: 0.72rem; line-height: 1.35; color: var(--text-secondary);">Roadmaps turn open warehouse floors into simple connected routes. A* adds distance traveled to estimated distance left to guarantee the shortest safe path.</p>
          </div>
          <div style="font-size: 0.68rem; color: #7c3aed; font-weight: bold;">
            Key: Optimistic distance guesses
          </div>
        </div>

        <div style="background: var(--bg-surface); border: 1px solid var(--border-color); border-radius: 8px; padding: 0.5rem; display: flex; flex-direction: column; justify-content: space-between;">
          <div>
            <div style="font-size: 0.78rem; font-weight: bold; color: #10b981; margin-bottom: 0.35rem; display: flex; align-items: center; gap: 0.3rem;">
              <span>🎛️</span> Nav2 Stack &amp; Tuning
            </div>
            <p style="font-size: 0.72rem; line-height: 1.35; color: var(--text-secondary);">BT Navigator orchestrates Planner and Controller servers. Parameter matrix balances AMCL covariance, costmap inflation buffers, and critic weights.</p>
          </div>
          <div style="font-size: 0.68rem; color: #10b981; font-weight: bold;">
            Key: Production tuning matrix
          </div>
        </div>
      </div>
    `})}function Ci(a,s,i){i.push({id:`${s.id}_sec2_simple_commander_arch`,type:"concept",lessonNum:s.num_str,lessonId:s.id,module:s.module,sectionTitle:"2. The Simple Commander Python API Architecture",badge:"🐍 Python Automation",title:"2. Nav2 Simple Commander: High-Level Python API for Autonomous Missions",htmlContent:`
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
    `}),i.push({id:`${s.id}_sec3_basic_navigator_methods`,type:"concept",lessonNum:s.num_str,lessonId:s.id,module:s.module,sectionTitle:"3. Core BasicNavigator Methods Reference",badge:"📚 API Reference",title:"3. Core BasicNavigator API Methods: Mission Control & Telemetry Matrix",htmlContent:`
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
    `}),i.push({id:`${s.id}_sec4_patrol_script`,type:"concept",lessonNum:s.num_str,lessonId:s.id,module:s.module,sectionTitle:"4. Complete Autonomous Patrol Script Walkthrough",badge:"💻 Production Script",title:"4. Autonomous Navigation Scripting: Goal Dispatch, Feedback & Watchdog Loop",htmlContent:`
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
    `}),i.push({id:`${s.id}_sec5_waypoints_patrol`,type:"concept",lessonNum:s.num_str,lessonId:s.id,module:s.module,sectionTitle:"5. Multi-Checkpoint Waypoint Queuing",badge:"🏭 Industrial Fleet Automation",title:"5. Multi-Checkpoint Waypoint Queuing & Mission Recovery Watchdogs",htmlContent:`
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
    `})}function Ni(a,s,i){i.push({id:`${s.id}_sec2_param_arch`,type:"concept",lessonNum:s.num_str,lessonId:s.id,module:s.module,sectionTitle:"2. ROS 1 vs. ROS 2 Parameter Architecture",badge:"⚙️ Parameter Architecture",title:"2. Parameter Architecture: Centralized ROS 1 vs. Distributed Typed ROS 2",htmlContent:`
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
    `}),i.push({id:`${s.id}_sec3_declaring_params`,type:"concept",lessonNum:s.num_str,lessonId:s.id,module:s.module,sectionTitle:"3. Building a Parameterized Node (Python)",badge:"🐍 Python Parameters",title:"3. Declaring & Reading Parameters in Python: The Mandatory Declaration Rule",htmlContent:`
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
    `}),i.push({id:`${s.id}_sec4_param_descriptors`,type:"concept",lessonNum:s.num_str,lessonId:s.id,module:s.module,sectionTitle:"4. Parameter Descriptors & Dynamic Validation",badge:"🛡️ Safety Validation",title:"4. Parameter Descriptors & Dynamic Validation Callbacks for Hardware Safety",htmlContent:`
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
    `}),i.push({id:`${s.id}_sec5_yaml_config`,type:"concept",lessonNum:s.num_str,lessonId:s.id,module:s.module,sectionTitle:"5. Organizing Configuration with YAML Files",badge:"📄 Production YAML",title:"5. Production YAML Configuration: The ros__parameters Nesting Rule",htmlContent:`
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
    `}),i.push({id:`${s.id}_sec6_cli_params`,type:"concept",lessonNum:s.num_str,lessonId:s.id,module:s.module,sectionTitle:"6. Parameter Inspection with CLI & rqt_reconfigure",badge:"🔍 Parameter Diagnostics",title:"6. Parameter CLI Commands & Real-Time Tuning with rqt_reconfigure",htmlContent:`
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
    `})}function Ri(a,s,i){i.push({id:`${s.id}_sec2_vscode_ide`,type:"concept",lessonNum:s.num_str,lessonId:s.id,module:s.module,sectionTitle:"2. VS Code IDE Configuration for ROS 2 Python",badge:"💻 IDE Configuration",title:"2. Professional VS Code IDE Tooling: Autocompletion & Path Resolution",htmlContent:`
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
    `}),i.push({id:`${s.id}_sec3_log_levels`,type:"concept",lessonNum:s.num_str,lessonId:s.id,module:s.module,sectionTitle:"3. The Five Logging Severity Levels",badge:"🚦 Severity Hierarchy",title:"3. The ROS 2 Logging Framework: The 5-Tier Severity Hierarchy",htmlContent:`
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
    `}),i.push({id:`${s.id}_sec4_throttled_logging`,type:"concept",lessonNum:s.num_str,lessonId:s.id,module:s.module,sectionTitle:"4. Throttled & One-Shot Logging",badge:"⏱️ Rate-Limited Logs",title:"4. Clean Production Logs: Throttled, One-Shot & Skip-First Patterns",htmlContent:`
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
    `}),i.push({id:`${s.id}_sec5_runtime_log_config`,type:"concept",lessonNum:s.num_str,lessonId:s.id,module:s.module,sectionTitle:"5. Runtime Log Level Configuration",badge:"🎛️ Dynamic Log Control",title:"5. Dynamic Log Level Configuration: CLI Overrides & Live Service Reconfiguration",htmlContent:`
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
    `})}function zi(a,s,i){i.push({id:`${s.id}_sec2_standard_vs_custom`,type:"concept",lessonNum:s.num_str,lessonId:s.id,module:s.module,sectionTitle:"2. Standard ROS 2 Interface Libraries",badge:"📦 Interface Ecosystem",title:"2. Standard ROS 2 Interfaces vs. Custom Definitions: The Ecosystem Rule",htmlContent:`
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
    `}),i.push({id:`${s.id}_sec3_standalone_pkg_rule`,type:"concept",lessonNum:s.num_str,lessonId:s.id,module:s.module,sectionTitle:"3. The Custom Interface Architecture Rule",badge:"🏛️ Architecture Rule",title:"3. The Golden Architectural Rule: Dedicated Standalone Interface Packages",htmlContent:`
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
    `}),i.push({id:`${s.id}_sec4_idl_anatomy`,type:"concept",lessonNum:s.num_str,lessonId:s.id,module:s.module,sectionTitle:"4. IDL Anatomy: .msg, .srv & .action Syntax",badge:"📐 IDL Grammar",title:"4. Interface Definition Language (IDL): Anatomy of .msg, .srv & .action Files",htmlContent:`
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
    `}),i.push({id:`${s.id}_sec5_build_wiring`,type:"concept",lessonNum:s.num_str,lessonId:s.id,module:s.module,sectionTitle:"5. Configuring package.xml & CMakeLists.txt",badge:"⚙️ Build Wiring",title:"5. Build Configuration: Generator Wiring in CMakeLists.txt & package.xml",htmlContent:`
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
    `}),i.push({id:`${s.id}_sec6_cli_python_usage`,type:"concept",lessonNum:s.num_str,lessonId:s.id,module:s.module,sectionTitle:"6. CLI Verification & Python Node Ingestion",badge:"💻 Python Ingestion",title:"6. CLI Verification & Ingesting Custom Interfaces in Python Nodes",htmlContent:`
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
    `})}function Ti(a,s,i){i.push({id:`${s.id}_sec2_sqlite_vs_mcap`,type:"concept",lessonNum:s.num_str,lessonId:s.id,module:s.module,sectionTitle:"2. Storage Plugins: SQLite3 vs. MCAP",badge:"💾 Storage Engine",title:"2. ROS 2 Bag Storage Formats: Legacy SQLite3 vs. Modern MCAP",htmlContent:`
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
    `}),i.push({id:`${s.id}_sec3_recording_cli`,type:"concept",lessonNum:s.num_str,lessonId:s.id,module:s.module,sectionTitle:"3. Step-by-Step: Recording Data via CLI",badge:"📹 CLI Recording",title:"3. Production CLI Recording Strategies: Selective Topics & Compression",htmlContent:`
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
    `}),i.push({id:`${s.id}_sec4_playback_simulation`,type:"concept",lessonNum:s.num_str,lessonId:s.id,module:s.module,sectionTitle:"4. Inspecting Bag Metadata & Offline Simulation Playback",badge:"▶️ Simulation Playback",title:"4. Offline Simulation Playback: The Authoritative --clock Time Rule",htmlContent:`
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
    `}),i.push({id:`${s.id}_sec5_rosbag2_py`,type:"concept",lessonNum:s.num_str,lessonId:s.id,module:s.module,sectionTitle:"5. Offline Python Analysis using rosbag2_py",badge:"🐍 Python Analytics",title:"5. Programmatic Bag Analysis: Automated CI/CD Regression & Telemetry Extraction",htmlContent:`
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
    `})}function Ai(a,s,i){i.push({id:`${s.id}_sec2_master_cli_matrix`,type:"concept",lessonNum:s.num_str,lessonId:s.id,module:s.module,sectionTitle:"2. Master CLI Reference Matrix",badge:"⌨️ Master CLI Matrix",title:"2. The ROS 2 CLI Architectural Framework: Unified Verb-Noun Grammar",htmlContent:`
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
    `}),i.push({id:`${s.id}_sec3_deep_introspection`,type:"concept",lessonNum:s.num_str,lessonId:s.id,module:s.module,sectionTitle:"3. Deep Graph Introspection: Nodes, Topics & QoS",badge:"🔍 Graph Introspection",title:"3. Deep Graph Introspection: Uncovering Hidden DDS Graph Topologies & QoS",htmlContent:`
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
    `}),i.push({id:`${s.id}_sec4_transactional_verbs`,type:"concept",lessonNum:s.num_str,lessonId:s.id,module:s.module,sectionTitle:"4. Transactional Verbs: Services, Actions & Parameters",badge:"⚡ Transactional CLI",title:"4. Transactional Verbs: Direct RPC Service Calls & Live Action Dispatch",htmlContent:`
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
    `}),i.push({id:`${s.id}_sec5_doctor_diagnostics`,type:"concept",lessonNum:s.num_str,lessonId:s.id,module:s.module,sectionTitle:"5. Advanced Network Diagnostics & ROS 2 Doctor",badge:"🩺 Network Diagnostics",title:"5. Fleet Diagnostics: ROS 2 Doctor & DDS Multicast Health Audits",htmlContent:`
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
    `})}function Pi(a,s,i){i.push({id:`${s.id}_sec2_why_behavior_trees`,type:"concept",lessonNum:s.num_str,lessonId:s.id,module:s.module,sectionTitle:"2. Why Behavior Trees Over State Machines?",badge:"🌳 Behavior Trees",title:"2. Why Behavior Trees? Overcoming Finite State Machine (FSM) Complexity",htmlContent:`
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
    `}),i.push({id:`${s.id}_sec3_recovery_pipeline`,type:"concept",lessonNum:s.num_str,lessonId:s.id,module:s.module,sectionTitle:"3. The Recovery Sub-Tree Pipeline & Behavior Tree Execution",badge:"🔄 Cascading Recoveries",title:"3. Nav2 Recovery Pipeline: The Cascading NavigateRecovery Sub-Tree",htmlContent:`
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
    `}),i.push({id:`${s.id}_sec4_lifecycle_state_machine`,type:"concept",lessonNum:s.num_str,lessonId:s.id,module:s.module,sectionTitle:"4. The ROS 2 Lifecycle State Machine",badge:"🚦 Lifecycle Nodes",title:"4. Managed Lifecycle State Machine (REP-2007): Deterministic Node States",htmlContent:`
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
    `}),i.push({id:`${s.id}_sec5_lifecycle_management_cli`,type:"concept",lessonNum:s.num_str,lessonId:s.id,module:s.module,sectionTitle:"5. Inspecting Lifecycle States with the CLI",badge:"🎛️ Lifecycle Orchestration",title:"5. Lifecycle Orchestration: CLI State Transitions & Nav2 Lifecycle Manager",htmlContent:`
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
    `})}const Lt={S:{x:65,y:145,h:11.5,label:"S",fullLabel:"Start (S)",badgePos:"top"},A:{x:185,y:85,h:10.1,label:"A",fullLabel:"Node A",badgePos:"top"},D:{x:185,y:205,h:9.2,label:"D",fullLabel:"Node D",badgePos:"bottom"},B:{x:330,y:85,h:5.8,label:"B",fullLabel:"Node B",badgePos:"top"},E:{x:330,y:205,h:7.1,label:"E",fullLabel:"Node E",badgePos:"bottom"},C:{x:470,y:85,h:3.4,label:"C",fullLabel:"Node C",badgePos:"top"},F:{x:470,y:205,h:3.5,label:"F",fullLabel:"Node F",badgePos:"bottom"},G:{x:555,y:145,h:0,label:"G",fullLabel:"Goal (G)",badgePos:"top"}},Di=[{from:"S",to:"A",cost:3,midX:125,midY:115},{from:"S",to:"D",cost:4,midX:125,midY:175},{from:"A",to:"B",cost:4,midX:257,midY:85},{from:"A",to:"D",cost:5,midX:185,midY:145},{from:"D",to:"E",cost:2,midX:257,midY:205},{from:"B",to:"C",cost:4,midX:400,midY:85},{from:"B",to:"E",cost:5,midX:330,midY:145},{from:"E",to:"F",cost:4,midX:400,midY:205},{from:"F",to:"G",cost:3.5,midX:512,midY:175}],ee=[{step:0,chipLabel:"0: Init S",title:"Start Search at Start Node S",current:"S",closed:[],frontier:[{path:"S",targetNode:"S",g:0,h:11.5,f:11.5,status:"Starting Point",isLowest:!0}],activeEdges:[],optimalPath:[],decisionFormula:"Start at S: Traveled 0.0 + Est. to Goal 11.5 = Total 11.5",decisionNote:"Add Start Node S to the open candidate list.",explanation:"Search begins at Start Node S. Traveled distance is 0. Estimated straight-line distance to goal is 11.5. Total estimated trip starts at 11.5."},{step:1,chipLabel:"1: Expand S",title:"Expand Node S: Test Paths to Neighbors A & D",current:"S",closed:["S"],frontier:[{path:"S → A",targetNode:"A",g:3,h:10.1,f:13.1,status:"★ Lowest Estimate • Pick Next",isLowest:!0},{path:"S → D",targetNode:"D",g:4,h:9.2,f:13.2,status:"Waiting in Queue",isLowest:!1}],activeEdges:["S-A","S-D"],optimalPath:[],decisionFormula:"Route via A (13.1 total) looks shorter than Route via D (13.2 total)",decisionNote:"Choose S → A next because 13.1 is smaller than 13.2.",explanation:"From Start S, we check neighbors A and D. Path to A has total estimate 13.1 (traveled 3 + remaining 10.1). Path to D has total estimate 13.2. A* picks the smaller estimate (A) to explore first."},{step:2,chipLabel:"2: Pop A",title:"Expand Node A: Test Paths to B & D",current:"A",closed:["S","A"],frontier:[{path:"S → A → B",targetNode:"B",g:7,h:5.8,f:12.8,status:"★ Lowest Estimate • Pick Next",isLowest:!0},{path:"S → D",targetNode:"D",g:4,h:9.2,f:13.2,status:"Waiting in Queue",isLowest:!1},{path:"S → A → D",targetNode:"D",g:8,h:9.2,f:17.2,status:"Too Long (cost 8 vs 4)",isLowest:!1}],activeEdges:["S-A","A-B","A-D","S-D"],optimalPath:[],decisionFormula:"Route S→A→B has lowest total estimate (12.8) in entire list!",decisionNote:"Branch B is promising because estimated distance left to goal is only 5.8.",explanation:"From A, we can reach B or D. Route S→A→B needs 7 traveled + 5.8 remaining = 12.8 total. This is currently the lowest estimate in the whole queue, so A* continues down this promising route!"},{step:3,chipLabel:"3: Backtrack ↩",title:"Expand B: Forward Paths Look Long → Smart Backtrack to D!",current:"B",closed:["S","A","B"],frontier:[{path:"S → D",targetNode:"D",g:4,h:9.2,f:13.2,status:"★ Lowest Estimate • BACKTRACK ↩",isLowest:!0},{path:"S → A → B → C",targetNode:"C",g:11,h:3.4,f:14.4,status:"Waiting in Queue",isLowest:!1},{path:"S → A → D",targetNode:"D",g:8,h:9.2,f:17.2,status:"Too Long",isLowest:!1},{path:"S → A → B → E",targetNode:"E",g:12,h:7.1,f:19.1,status:"Too Long",isLowest:!1}],activeEdges:["S-A","A-B","B-C","B-E","S-D"],optimalPath:[],decisionFormula:"Route via D (13.2) is shorter than continuing via C (14.4) or E (19.1)",decisionNote:"Smart Backtracking: Switches focus back to the waiting branch at D!",explanation:"From B, continuing forward to C estimates 14.4 total, and to E estimates 19.1. Both are worse than the earlier waiting route S→D (13.2)! A* automatically backtracks to branch D, preventing wasted detours."},{step:4,chipLabel:"4: Pop D (Prune ✂)",title:"Expand D to E: Cheaper Route Found → Cut Out Costly Path!",current:"D",closed:["S","A","B","D"],frontier:[{path:"S → D → E",targetNode:"E",g:6,h:7.1,f:13.1,status:"★ Lowest Estimate • Pick Next",isLowest:!0},{path:"S → A → B → C",targetNode:"C",g:11,h:3.4,f:14.4,status:"Waiting in Queue",isLowest:!1},{path:"S → D → A",targetNode:"A",g:9,h:10.1,f:19.1,status:"Too Long",isLowest:!1},{path:"S → A → B → E",targetNode:"E",g:12,h:7.1,f:19.1,status:"✂ PRUNED (cost 12 vs 6)",isLowest:!1}],activeEdges:["S-D","D-E","S-A","A-B","B-C"],optimalPath:[],decisionFormula:"Reaching E via D costs only 6.0 vs. 12.0 via B → Cut expensive route!",decisionNote:"Reaching E via D is half the distance of reaching E via B.",explanation:"From D, moving to E costs only 6.0 total distance traveled (estimate 13.1 total). This is much shorter than reaching E via B (cost 12.0). A* cuts the expensive detour and advances along S→D→E!"},{step:5,chipLabel:"5: Expand E",title:"Expand E: Advance Directly to Neighbor F",current:"E",closed:["S","A","B","D","E"],frontier:[{path:"S → D → E → F",targetNode:"F",g:10,h:3.5,f:13.5,status:"★ Lowest Estimate • Pick Next",isLowest:!0},{path:"S → A → B → C",targetNode:"C",g:11,h:3.4,f:14.4,status:"Waiting in Queue",isLowest:!1},{path:"S → D → E → B",targetNode:"B",g:11,h:5.8,f:16.8,status:"Closed (Already Visited)",isLowest:!1}],activeEdges:["S-D","D-E","E-F"],optimalPath:[],decisionFormula:"Route S→D→E→F (13.5 total) is closest to Goal (only 3.5 units away)",decisionNote:"Node F is right next to the Goal.",explanation:"Expanding E leads to F: traveled distance is 10.0, and remaining guess to Goal is only 3.5, giving total estimate 13.5. This is the top candidate in the queue, heading straight for the Goal."},{step:6,chipLabel:"6: Reach G",title:"From F: Reach Goal G! (Total Distance = 13.5)",current:"F",closed:["S","A","B","D","E","F"],frontier:[{path:"S → D → E → F → G",targetNode:"G",g:13.5,h:0,f:13.5,status:"★ GOAL REACHED • Ready to Complete",isLowest:!0},{path:"S → A → B → C",targetNode:"C",g:11,h:3.4,f:14.4,status:"Waiting in Queue",isLowest:!1}],activeEdges:["S-D","D-E","E-F","F-G"],optimalPath:["S-D","D-E","E-F","F-G"],decisionFormula:"Goal Reached: Traveled = 13.5, Remaining to Goal = 0.0 → Total = 13.5",decisionNote:"The Goal route sits at the head of the list with zero distance left.",explanation:"From F, edge to G (cost 3.5) arrives at the Goal! Distance traveled is 13.5 and remaining distance is 0.0. The complete route is placed at the top of the queue for final confirmation."},{step:7,chipLabel:"7: Goal Optimal ★",title:"Confirm Goal G: Guaranteed Shortest Route Found!",current:"G",closed:["S","A","B","D","E","F","G"],frontier:[{path:"S → D → E → F → G",targetNode:"G",g:13.5,h:0,f:13.5,status:"✓ GUARANTEED SHORTEST ROUTE",isLowest:!0}],activeEdges:["S-D","D-E","E-F","F-G"],optimalPath:["S-D","D-E","E-F","F-G"],decisionFormula:"Shortest Route: S → D → E → F → G (Total Distance = 13.5)",decisionNote:"Optimistic Guess Guarantee: No unexplored route can ever beat 13.5!",explanation:"Goal node G confirmed! Because straight-line distance guesses are optimistic (never guessing longer than real physical paths), this first route reaching the goal is mathematically guaranteed to be the shortest path!"}];function Ii(){const[a,s]=c.useState(0),[i,u]=c.useState(!1),g=ee[a];c.useEffect(()=>{let l=null;return i&&(l=setInterval(()=>{s(p=>p<ee.length-1?p+1:(u(!1),p))},2e3)),()=>clearInterval(l)},[i]);const T=l=>{l&&l.stopPropagation(),a<ee.length-1&&s(p=>p+1)},w=l=>{l&&l.stopPropagation(),a>0&&s(p=>p-1)},I=l=>{l&&l.stopPropagation(),u(!1),s(0)},N=l=>{l&&l.stopPropagation(),u(p=>!p)},j=(l,p)=>{p&&p.stopPropagation(),s(l)};return e.jsxs("div",{className:"astar-interactive-container",style:{display:"flex",flexDirection:"column",height:"100%",width:"100%",margin:"0 auto",padding:"0.55rem 0.85rem",boxSizing:"border-box",gap:"0.45rem",background:"#ffffff",borderRadius:"12px",border:"1px solid #e2e8f0",boxShadow:"0 4px 20px rgba(0, 0, 0, 0.05)",color:"#0f172a",fontFamily:"system-ui, -apple-system, sans-serif"},children:[e.jsx("style",{children:`
        @keyframes astarSolidHalo {
          0%, 100% {
            opacity: 0.95;
            stroke-width: 2;
          }
          50% {
            opacity: 0.4;
            stroke-width: 3.2;
          }
        }
        @keyframes astarEdgeGlow {
          0%, 100% {
            stroke-opacity: 1;
          }
          50% {
            stroke-opacity: 0.6;
          }
        }
        @keyframes astarGlowPulse {
          0%, 100% {
            filter: drop-shadow(0 0 4px rgba(5, 150, 105, 0.5));
          }
          50% {
            filter: drop-shadow(0 0 10px rgba(5, 150, 105, 0.8));
          }
        }
        .astar-edge-active {
          stroke: #d97706 !important;
          stroke-width: 3.5 !important;
          stroke-dasharray: none !important;
          animation: astarEdgeGlow 1.8s ease-in-out infinite !important;
        }
        .astar-edge-optimal {
          stroke: #059669 !important;
          stroke-width: 4.5 !important;
          stroke-dasharray: none !important;
          animation: astarGlowPulse 1.8s ease-in-out infinite !important;
        }
        .astar-step-chip {
          padding: 0.22rem 0.5rem;
          font-size: 0.67rem;
          font-weight: 600;
          border-radius: 6px;
          border: 1px solid #cbd5e1;
          background: #f8fafc;
          color: #475569;
          cursor: pointer;
          transition: all 0.2s ease;
          white-space: nowrap;
        }
        .astar-step-chip:hover {
          background: #f1f5f9;
          color: #0f172a;
          border-color: #94a3b8;
        }
        .astar-step-chip.active {
          background: #4f46e5;
          border-color: #4338ca;
          color: #ffffff;
          box-shadow: 0 2px 8px rgba(79, 70, 229, 0.35);
        }
        .astar-step-chip.completed {
          border-color: #a7f3d0;
          color: #059669;
          background: #ecfdf5;
        }
      `}),e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:"0.4rem",borderBottom:"1px solid #e2e8f0",paddingBottom:"0.4rem"},children:[e.jsx("div",{style:{display:"flex",alignItems:"center",gap:"0.3rem",overflowX:"auto",maxWidth:"68%"},children:ee.map((l,p)=>e.jsx("button",{onClick:n=>j(p,n),className:`astar-step-chip ${p===a?"active":p<a?"completed":""}`,title:`Jump to step ${p}: ${l.title}`,children:l.chipLabel},p))}),e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"0.35rem"},children:[e.jsxs("button",{onClick:w,disabled:a===0,style:{display:"flex",alignItems:"center",gap:"0.2rem",padding:"0.25rem 0.55rem",fontSize:"0.72rem",fontWeight:600,borderRadius:"6px",border:"1px solid #cbd5e1",background:a===0?"#f1f5f9":"#ffffff",color:a===0?"#94a3b8":"#334155",cursor:a===0?"not-allowed":"pointer"},children:[e.jsx(Re,{size:14})," Prev"]}),e.jsxs("button",{onClick:N,style:{display:"flex",alignItems:"center",gap:"0.25rem",padding:"0.25rem 0.65rem",fontSize:"0.72rem",fontWeight:600,borderRadius:"6px",border:i?"1px solid #4338ca":"1px solid #c7d2fe",background:i?"#4f46e5":"#eef2ff",color:i?"#ffffff":"#4338ca",cursor:"pointer"},children:[i?e.jsx(we,{size:13}):e.jsx(be,{size:13}),i?"Pause":"Auto Play"]}),e.jsxs("button",{onClick:T,disabled:a===ee.length-1,style:{display:"flex",alignItems:"center",gap:"0.25rem",padding:"0.25rem 0.75rem",fontSize:"0.72rem",fontWeight:700,borderRadius:"6px",border:"1px solid #047857",background:a===ee.length-1?"#f1f5f9":"#059669",color:a===ee.length-1?"#94a3b8":"#ffffff",cursor:a===ee.length-1?"not-allowed":"pointer",boxShadow:a<ee.length-1?"0 2px 8px rgba(5, 150, 105, 0.3)":"none"},children:[e.jsx(vs,{size:14}),"Next Step ",e.jsx(fe,{size:14})]}),e.jsx("button",{onClick:I,title:"Reset to Step 0",style:{display:"flex",alignItems:"center",padding:"0.25rem 0.45rem",fontSize:"0.72rem",borderRadius:"6px",border:"1px solid #cbd5e1",background:"#ffffff",color:"#64748b",cursor:"pointer"},children:e.jsx(K,{size:13})})]})]}),e.jsxs("div",{style:{display:"grid",gridTemplateColumns:"1.2fr 1fr",gap:"0.65rem",flex:1,minHeight:0},children:[e.jsxs("div",{onClick:T,title:"Click anywhere inside graph to advance to next step",style:{background:"#ffffff",border:"1px solid #e2e8f0",borderRadius:"10px",overflow:"hidden",display:"flex",flexDirection:"column",cursor:a<ee.length-1?"pointer":"default",boxShadow:"0 1px 3px rgba(0, 0, 0, 0.04)"},children:[e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"0.35rem 0.65rem",background:"#f1f5f9",borderBottom:"1px solid #e2e8f0",fontSize:"0.68rem",color:"#334155"},children:[e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"0.75rem",fontWeight:600},children:[e.jsxs("span",{style:{display:"inline-flex",alignItems:"center",gap:"0.25rem"},children:[e.jsx("span",{style:{width:9,height:9,borderRadius:"50%",background:"#f59e0b",border:"1.5px solid #d97706",display:"inline-block"}}),e.jsx("span",{children:"Active"})]}),e.jsxs("span",{style:{display:"inline-flex",alignItems:"center",gap:"0.25rem"},children:[e.jsx("span",{style:{width:9,height:9,borderRadius:"50%",background:"#38bdf8",border:"1.5px solid #0284c7",display:"inline-block"}}),e.jsx("span",{children:"Frontier"})]}),e.jsxs("span",{style:{display:"inline-flex",alignItems:"center",gap:"0.25rem"},children:[e.jsx("span",{style:{width:9,height:9,borderRadius:"50%",background:"#f1f5f9",border:"1.5px solid #94a3b8",display:"inline-block"}}),e.jsx("span",{children:"Closed"})]}),e.jsxs("span",{style:{display:"inline-flex",alignItems:"center",gap:"0.25rem"},children:[e.jsx("span",{style:{width:9,height:9,borderRadius:"50%",background:"#34d399",border:"1.5px solid #059669",display:"inline-block"}}),e.jsx("span",{children:"Optimal"})]})]}),a<ee.length-1?e.jsxs("span",{style:{color:"#4f46e5",fontWeight:700,display:"inline-flex",alignItems:"center",gap:"0.25rem",fontSize:"0.67rem"},children:[e.jsx(vs,{size:12})," Click to step"]}):e.jsxs("span",{style:{color:"#059669",fontWeight:700,display:"inline-flex",alignItems:"center",gap:"0.25rem",fontSize:"0.67rem"},children:[e.jsx(H,{size:12})," Optimal Solved"]})]}),e.jsx("div",{style:{flex:1,position:"relative",background:"#f8fafc",display:"flex",alignItems:"center",justifyContent:"center",minHeight:0},children:e.jsxs("svg",{viewBox:"0 0 620 290",style:{width:"100%",height:"100%",maxHeight:"330px"},children:[e.jsx("defs",{children:e.jsx("pattern",{id:"astarGrid",width:"20",height:"20",patternUnits:"userSpaceOnUse",children:e.jsx("path",{d:"M 20 0 L 0 0 0 20",fill:"none",stroke:"#e2e8f0",strokeWidth:"0.8"})})}),e.jsx("rect",{width:"620",height:"290",fill:"url(#astarGrid)"}),Di.map(l=>{const p=Lt[l.from],n=Lt[l.to],o=`${l.from}-${l.to}`,m=g.optimalPath.includes(o),x=g.activeEdges.includes(o);let S="",z="#cbd5e1",R=2;return m?(S="astar-edge-optimal",z="#059669",R=4.5):x&&(S="astar-edge-active",z="#d97706",R=3.5),e.jsxs("g",{children:[e.jsx("line",{x1:p.x,y1:p.y,x2:n.x,y2:n.y,stroke:z,strokeWidth:R,className:S,style:{transition:"all 0.3s ease"}}),e.jsx("rect",{x:l.midX-14,y:l.midY-9,width:28,height:18,rx:4,fill:"#ffffff",stroke:m?"#059669":x?"#d97706":"#cbd5e1",strokeWidth:x||m?1.8:1.2}),e.jsx("text",{x:l.midX,y:l.midY+4,fill:m?"#059669":x?"#b45309":"#475569",fontSize:"10",fontWeight:"bold",textAnchor:"middle",style:{fontFamily:"system-ui, -apple-system, sans-serif"},children:l.cost.toFixed(1)})]},o)}),Object.entries(Lt).map(([l,p])=>{const n=g.current===l,o=g.closed.includes(l),m=l==="G",x=l==="S",S=g.frontier.some(d=>d.targetNode===l),z=a>=6&&["S","D","E","F","G"].includes(l);let R="#ffffff",h="#94a3b8",f="#0f172a",_="#e2e8f0",y="#ffffff",v="#64748b";z&&a===7?(R="#d1fae5",h="#059669",f="#065f46",_="#059669",y="#ecfdf5",v="#047857"):n?(R="#fef3c7",h="#d97706",f="#92400e",_="#d97706",y="#fffbeb",v="#b45309"):S?(R="#e0f2fe",h="#0284c7",f="#0369a1",_="#0284c7",y="#f0f9ff",v="#0284c7"):o?(R="#f1f5f9",h="#94a3b8",f="#475569",_="#cbd5e1",y="#ffffff",v="#64748b"):x?(R="#eff6ff",h="#2563eb",f="#1d4ed8",_="#2563eb",y="#eff6ff",v="#1d4ed8"):m&&(R="#fef2f2",h="#dc2626",f="#b91c1c",_="#dc2626",y="#fef2f2",v="#b91c1c");const r=p.badgePos==="top"?p.y-32:p.y+32;return e.jsxs("g",{style:{transition:"all 0.3s ease"},children:[n&&e.jsx("circle",{cx:p.x,cy:p.y,r:25,fill:"rgba(245, 158, 11, 0.15)",stroke:"#f59e0b",strokeWidth:2,style:{animation:"astarSolidHalo 2s ease-in-out infinite"}}),z&&a===7&&e.jsx("circle",{cx:p.x,cy:p.y,r:24,fill:"rgba(5, 150, 105, 0.12)",stroke:"#059669",strokeWidth:2}),e.jsx("circle",{cx:p.x,cy:p.y,r:18,fill:R,stroke:h,strokeWidth:n||z?3:2}),e.jsx("text",{x:p.x,y:p.y+4.5,fill:f,fontSize:"13",fontWeight:"bold",textAnchor:"middle",style:{fontFamily:"system-ui, -apple-system, sans-serif"},children:l}),x&&e.jsx("text",{x:p.x,y:p.y+30,fill:"#2563eb",fontSize:"9.5",fontWeight:"bold",textAnchor:"middle",style:{fontFamily:"system-ui, -apple-system, sans-serif"},children:"START"}),m&&e.jsx("text",{x:p.x,y:p.y+30,fill:"#dc2626",fontSize:"9.5",fontWeight:"bold",textAnchor:"middle",style:{fontFamily:"system-ui, -apple-system, sans-serif"},children:"GOAL"}),e.jsx("rect",{x:p.x-21,y:r-9,width:42,height:18,rx:4,fill:y,stroke:_,strokeWidth:n||S||z&&a===7?1.5:1}),e.jsxs("text",{x:p.x,y:r+4,fill:v,fontSize:"9.5",fontWeight:"bold",textAnchor:"middle",style:{fontFamily:"system-ui, -apple-system, sans-serif"},children:["h=",p.h.toFixed(1)]})]},l)})]})}),e.jsxs("div",{style:{padding:"0.28rem 0.65rem",background:"#f8fafc",borderTop:"1px solid #e2e8f0",fontSize:"0.66rem",color:"#475569",display:"flex",justifyContent:"space-between",alignItems:"center"},children:[e.jsxs("span",{children:[e.jsx("strong",{children:"Graph Labels:"})," Edge numbers = Travel Distance • Badges = Est. Distance to Goal"]}),e.jsxs("span",{style:{color:"#1e293b"},children:["Rule: ",e.jsx("strong",{children:"Total Estimate = Distance Traveled + Distance to Goal"})]})]})]}),e.jsxs("div",{style:{background:"#ffffff",border:"1px solid #e2e8f0",borderRadius:"10px",padding:"0.55rem 0.7rem",display:"flex",flexDirection:"column",justifyContent:"space-between",overflow:"hidden"},children:[e.jsxs("div",{style:{display:"flex",flexDirection:"column",flex:1,minHeight:0},children:[e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"0.4rem",borderBottom:"1px solid #e2e8f0",paddingBottom:"0.3rem"},children:[e.jsx("div",{style:{display:"flex",alignItems:"center",gap:"0.35rem"},children:e.jsx("span",{style:{fontSize:"0.78rem",fontWeight:700,color:"#4338ca"},children:"Candidate Routes Queue (Open List)"})}),e.jsx("span",{style:{fontSize:"0.66rem",color:"#64748b"},children:"Sorted by Total Estimate (Lowest First)"})]}),e.jsx("div",{style:{flex:1,overflowY:"auto",minHeight:0},children:e.jsxs("table",{style:{width:"100%",borderCollapse:"collapse",fontSize:"0.72rem"},children:[e.jsx("thead",{children:e.jsxs("tr",{style:{background:"#f8fafc",color:"#475569",textAlign:"left",borderBottom:"2px solid #e2e8f0"},children:[e.jsx("th",{style:{padding:"0.28rem 0.4rem",fontWeight:700},children:"Candidate Path"}),e.jsx("th",{style:{padding:"0.28rem 0.4rem",fontWeight:700},children:"Traveled (g)"}),e.jsx("th",{style:{padding:"0.28rem 0.4rem",fontWeight:700},children:"To Goal (h)"}),e.jsx("th",{style:{padding:"0.28rem 0.4rem",fontWeight:700,color:"#b45309"},children:"Total Est. (f)"}),e.jsx("th",{style:{padding:"0.28rem 0.4rem",fontWeight:700},children:"Search Status"})]})}),e.jsx("tbody",{children:g.frontier.map((l,p)=>e.jsxs("tr",{style:{background:l.isLowest?"#fefce8":"transparent",borderBottom:"1px solid #f1f5f9",color:l.isLowest?"#854d0e":"#334155"},children:[e.jsx("td",{style:{padding:"0.3rem 0.4rem",fontFamily:"monospace",fontWeight:700},children:l.path}),e.jsx("td",{style:{padding:"0.3rem 0.4rem"},children:l.g.toFixed(1)}),e.jsx("td",{style:{padding:"0.3rem 0.4rem"},children:l.h.toFixed(1)}),e.jsx("td",{style:{padding:"0.3rem 0.4rem",fontWeight:800,color:l.isLowest?"#b45309":"#0f172a"},children:l.f.toFixed(1)}),e.jsx("td",{style:{padding:"0.3rem 0.4rem",fontSize:"0.65rem"},children:e.jsx("span",{style:{padding:"0.12rem 0.4rem",borderRadius:"4px",background:l.isLowest?"#fef08a":l.status.includes("PRUNED")?"#fee2e2":l.status.includes("OPTIMAL")||l.status.includes("SHORTEST")?"#d1fae5":"#f1f5f9",color:l.isLowest?"#854d0e":l.status.includes("PRUNED")?"#991b1b":l.status.includes("OPTIMAL")||l.status.includes("SHORTEST")?"#065f46":"#475569",border:l.isLowest?"1px solid #fde047":l.status.includes("PRUNED")?"1px solid #fca5a5":l.status.includes("OPTIMAL")||l.status.includes("SHORTEST")?"1px solid #6ee7b7":"1px solid #e2e8f0",fontWeight:600},children:l.status})})]},p))})]})})]}),e.jsxs("div",{style:{background:"#f8fafc",border:"1px solid #e2e8f0",borderLeft:"4px solid #0284c7",borderRadius:"6px",padding:"0.4rem 0.65rem",fontSize:"0.7rem",marginTop:"0.4rem",display:"flex",flexDirection:"column",gap:"0.15rem"},children:[e.jsxs("div",{style:{display:"flex",alignItems:"center",justifyContent:"space-between"},children:[e.jsx("span",{style:{color:"#0284c7",fontWeight:700},children:"💡 Decision Logic:"}),e.jsx("span",{style:{color:"#1d4ed8",fontWeight:700},children:g.decisionFormula})]}),e.jsx("div",{style:{color:"#475569",fontSize:"0.67rem"},children:g.decisionNote})]})]})]}),e.jsxs("div",{style:{background:"#faf5ff",border:"1px solid #e9d5ff",borderLeft:"4px solid #7c3aed",padding:"0.45rem 0.8rem",borderRadius:"8px",fontSize:"0.75rem",lineHeight:1.4,color:"#334155",display:"flex",alignItems:"center",gap:"0.6rem"},children:[e.jsxs("div",{style:{background:"#7c3aed",color:"#fff",padding:"0.18rem 0.5rem",borderRadius:"5px",fontSize:"0.67rem",fontWeight:800,whiteSpace:"nowrap"},children:["Step ",a," of ",ee.length-1]}),e.jsxs("div",{children:[e.jsxs("strong",{style:{color:"#6d28d9",marginRight:"0.35rem"},children:[g.title,":"]}),e.jsx("span",{children:g.explanation})]})]})]})}const oe=[{step:0,title:"AMCL Overview: Particle Cloud Pose Estimation",subtitle:"Monte Carlo Localization represents robot belief bel(x_t) as a probability distribution of particles.",points:["Each particle is a complete pose hypothesis: (x, y, θ).","The robot has an unknown initial location in the pre-mapped warehouse.","Fusion of wheel odometry (motion) and 2D LiDAR (perception)."],explanation:"AMCL uses a recursive Bayes filter on a sample set of particles to estimate pose relative to a known 2D occupancy grid map.",particlesState:"uniform"},{step:1,title:"Step 1: Global Uniform Particle Distribution",subtitle:"Zero prior knowledge: particles are scattered uniformly across all valid free space.",points:["Initial belief bel(x_0) has maximum entropy (infinite uncertainty).","Thousands of particles cover the entire warehouse map uniformly.","Every particle begins with equal normalized weight: w_i = 1 / N."],explanation:"When starting with no initial pose estimate, particles cover all reachable corridors with random heading angles θ ∈ [0, 2π).",particlesState:"uniform"},{step:2,title:"Step 2: Anatomy of the Particle State Vector",subtitle:"Each individual particle represents an exact coordinate and likelihood weight.",points:["State Vector: X_i = [x_i, y_i, θ_i]ᵀ in global map frame.","Weight w_i: Represents confidence that particle matches sensor observations.","Sum of all particle weights is strictly normalized: ∑ w_i = 1.0."],explanation:"A particle is not just a point; it carries orientation and a scalar weight representing how well its simulated LiDAR rays match the actual LiDAR scan.",particlesState:"anatomy"},{step:3,title:"Step 3: Motion Prediction & Sensor Measurement Update",subtitle:"Odometry propagates particles forward; LiDAR raycasts calculate observation likelihood.",points:["Prediction: Particles move by odometry Δx, Δy, Δθ plus Gaussian noise.","Perception: Simulated LiDAR rays raycast from each particle against map.","Weight Update: w_i ∝ p(z_t | x_i, m). Matching particles get high weight!"],explanation:"As the AMR drives, particles whose simulated wall distances match real LiDAR ranges receive high weights (glowing gold). Mismatched particles get near-zero weight.",particlesState:"update"},{step:4,title:"Step 4: Importance Resampling & Pose Convergence",subtitle:"Survival of the fittest: low-weight particles die; high-weight particles duplicate.",points:["Resampling: Low-weight particles are eliminated (culled).","High-weight particles are duplicated in proportion to their weight w_i.","Convergence: Cloud collapses into a tight cluster around true robot pose!"],explanation:"Through successive motion and observation cycles, particle variance shrinks. The weighted mean of the cluster yields the final localization pose (x, y, θ) for Nav2!",particlesState:"converged"}],ws=[{x:50,y:50,a:30,w:.2},{x:80,y:70,a:90,w:.2},{x:120,y:50,a:180,w:.2},{x:160,y:80,a:240,w:.2},{x:200,y:55,a:45,w:.2},{x:250,y:65,a:110,w:.2},{x:300,y:50,a:0,w:.2},{x:350,y:75,a:300,w:.2},{x:400,y:60,a:135,w:.2},{x:450,y:70,a:210,w:.2},{x:60,y:150,a:80,w:.2},{x:100,y:170,a:15,w:.2},{x:150,y:140,a:270,w:.2},{x:210,y:165,a:190,w:.2},{x:270,y:150,a:40,w:.2},{x:320,y:160,a:320,w:.2},{x:380,y:145,a:120,w:.2},{x:440,y:165,a:90,w:.2},{x:50,y:220,a:330,w:.2},{x:110,y:235,a:60,w:.2},{x:180,y:215,a:150,w:.2},{x:240,y:230,a:220,w:.2},{x:300,y:225,a:45,w:.2},{x:360,y:220,a:180,w:.2},{x:420,y:235,a:290,w:.2},{x:460,y:210,a:75,w:.2}];function Ei(){const[a,s]=c.useState(0),[i,u]=c.useState(!1),g=oe[a];c.useEffect(()=>{let n=null;return i&&(n=setInterval(()=>{s(o=>o<oe.length-1?o+1:(u(!1),o))},2500)),()=>clearInterval(n)},[i]);const T=n=>{n&&n.stopPropagation(),a<oe.length-1&&s(o=>o+1)},w=n=>{n&&n.stopPropagation(),a>0&&s(o=>o-1)},I=n=>{n&&n.stopPropagation(),u(!1),s(0)},N=n=>{n&&n.stopPropagation(),u(o=>!o)},j=320,l=160,p=35;return e.jsxs("div",{className:"amcl-interactive-deck",style:{display:"flex",flexDirection:"column",height:"100%",width:"100%",padding:"0.45rem 0.65rem",boxSizing:"border-box",gap:"0.4rem",background:"var(--bg-card, #0f172a)",borderRadius:"10px",border:"1px solid var(--border-color, #334155)",color:"var(--text-primary, #f8fafc)"},children:[e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:"0.4rem",borderBottom:"1px solid var(--border-color, #334155)",paddingBottom:"0.35rem"},children:[e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"0.5rem"},children:[e.jsxs("span",{style:{background:"#eab308",color:"#000",padding:"0.2rem 0.55rem",borderRadius:"999px",fontSize:"0.72rem",fontWeight:700,display:"flex",alignItems:"center",gap:"0.3rem"},children:[e.jsx(te,{size:13}),"Step ",a," of ",oe.length-1]}),e.jsx("strong",{style:{fontSize:"0.82rem",color:"#f8fafc"},children:g.title})]}),e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"0.35rem"},children:[e.jsxs("button",{onClick:w,disabled:a===0,style:{display:"flex",alignItems:"center",gap:"0.2rem",padding:"0.25rem 0.55rem",fontSize:"0.72rem",fontWeight:600,borderRadius:"6px",border:"1px solid #475569",background:a===0?"#1e293b":"#334155",color:a===0?"#64748b":"#f8fafc",cursor:a===0?"not-allowed":"pointer"},children:[e.jsx(Re,{size:14})," Prev"]}),e.jsxs("button",{onClick:N,style:{display:"flex",alignItems:"center",gap:"0.25rem",padding:"0.25rem 0.65rem",fontSize:"0.72rem",fontWeight:600,borderRadius:"6px",border:"1px solid #eab308",background:i?"#ca8a04":"rgba(234, 179, 8, 0.2)",color:"#f8fafc",cursor:"pointer"},children:[i?e.jsx(we,{size:13}):e.jsx(be,{size:13}),i?"Pause":"Auto Play"]}),e.jsxs("button",{onClick:T,disabled:a===oe.length-1,style:{display:"flex",alignItems:"center",gap:"0.2rem",padding:"0.25rem 0.65rem",fontSize:"0.72rem",fontWeight:600,borderRadius:"6px",border:"1px solid #10b981",background:a===oe.length-1?"#1e293b":"#059669",color:a===oe.length-1?"#64748b":"#f8fafc",cursor:a===oe.length-1?"not-allowed":"pointer"},children:["Next Step ",e.jsx(fe,{size:14})]}),e.jsx("button",{onClick:I,title:"Reset to Step 0",style:{display:"flex",alignItems:"center",padding:"0.25rem 0.4rem",fontSize:"0.72rem",borderRadius:"6px",border:"1px solid #475569",background:"#1e293b",color:"#94a3b8",cursor:"pointer"},children:e.jsx(K,{size:13})})]})]}),e.jsxs("div",{style:{display:"grid",gridTemplateColumns:"0.95fr 1.45fr",gap:"0.55rem",flex:1,minHeight:0},children:[e.jsxs("div",{style:{display:"flex",flexDirection:"column",justifyContent:"space-between",gap:"0.35rem"},children:[e.jsx("div",{style:{display:"flex",flexDirection:"column",gap:"0.25rem"},children:oe.map((n,o)=>{const m=a===o;return e.jsxs("div",{onClick:()=>s(o),style:{padding:"0.3rem 0.5rem",borderRadius:"6px",border:m?"1px solid #eab308":"1px solid #334155",background:m?"rgba(234, 179, 8, 0.15)":"rgba(15, 23, 42, 0.5)",cursor:"pointer",display:"flex",alignItems:"center",gap:"0.4rem"},children:[e.jsx("span",{style:{width:"18px",height:"18px",borderRadius:"50%",background:m?"#eab308":"#334155",color:m?"#000":"#94a3b8",fontSize:"0.66rem",fontWeight:700,display:"flex",alignItems:"center",justifyContent:"center"},children:o}),e.jsx("span",{style:{fontSize:"0.72rem",fontWeight:m?700:500,color:m?"#fef08a":"#cbd5e1"},children:n.title.replace(/^Step \d+: /,"")})]},o)})}),e.jsxs("div",{style:{background:"rgba(15, 23, 42, 0.8)",border:"1px solid rgba(234, 179, 8, 0.3)",borderRadius:"8px",padding:"0.45rem 0.6rem"},children:[e.jsx("div",{style:{fontSize:"0.74rem",fontWeight:700,color:"#facc15",marginBottom:"0.3rem"},children:"Mechanics & Math"}),e.jsx("ul",{style:{margin:0,paddingLeft:"1.1rem",fontSize:"0.71rem",lineHeight:1.4,color:"#e2e8f0"},children:g.points.map((n,o)=>e.jsx("li",{children:n},o))})]})]}),e.jsxs("div",{onClick:T,title:"Click canvas to advance step",style:{position:"relative",background:"rgba(2, 6, 23, 0.85)",border:"1px solid rgba(234, 179, 8, 0.35)",borderRadius:"10px",overflow:"hidden",display:"flex",flexDirection:"column",justifyContent:"center",cursor:a<oe.length-1?"pointer":"default"},children:[e.jsxs("div",{style:{position:"absolute",top:"8px",left:"10px",fontSize:"0.68rem",color:"#94a3b8",display:"flex",gap:"0.8rem",background:"rgba(15, 23, 42, 0.85)",padding:"0.2rem 0.5rem",borderRadius:"4px",border:"1px solid #334155"},children:[e.jsxs("span",{children:[e.jsx("strong",{style:{color:"#06b6d4"},children:"●"})," AMR Real Pose"]}),e.jsxs("span",{children:[e.jsx("strong",{style:{color:"#eab308"},children:"▲"})," Particles (x, y, θ)"]}),e.jsxs("span",{children:[e.jsx("strong",{style:{color:"#10b981"},children:"―"})," LiDAR Beams"]})]}),e.jsxs("svg",{viewBox:"0 0 520 280",style:{width:"100%",height:"100%",maxHeight:"260px"},children:[e.jsx("rect",{x:"20",y:"20",width:"480",height:"240",fill:"none",stroke:"#475569",strokeWidth:"4",rx:"6"}),e.jsx("rect",{x:"80",y:"90",width:"80",height:"40",fill:"#1e293b",stroke:"#64748b",strokeWidth:"2",rx:"4"}),e.jsx("text",{x:"120",y:"114",fill:"#94a3b8",fontSize:"10",fontWeight:"bold",textAnchor:"middle",children:"Rack A"}),e.jsx("rect",{x:"220",y:"80",width:"50",height:"60",fill:"#1e293b",stroke:"#64748b",strokeWidth:"2",rx:"4"}),e.jsx("text",{x:"245",y:"114",fill:"#94a3b8",fontSize:"10",fontWeight:"bold",textAnchor:"middle",children:"Rack B"}),e.jsx("rect",{x:"360",y:"90",width:"80",height:"40",fill:"#1e293b",stroke:"#64748b",strokeWidth:"2",rx:"4"}),e.jsx("text",{x:"400",y:"114",fill:"#94a3b8",fontSize:"10",fontWeight:"bold",textAnchor:"middle",children:"Rack C"}),g.particlesState==="anatomy"&&e.jsxs("g",{children:[e.jsx("rect",{x:"60",y:"145",width:"220",height:"100",fill:"rgba(15, 23, 42, 0.95)",stroke:"#eab308",strokeWidth:"2",rx:"8"}),e.jsx("text",{x:"75",y:"168",fill:"#facc15",fontSize:"11",fontWeight:"bold",children:"Particle State Vector: X_i"}),e.jsx("text",{x:"75",y:"190",fill:"#f8fafc",fontSize:"10",fontFamily:"monospace",children:"x_i : 318.4 mm"}),e.jsx("text",{x:"75",y:"206",fill:"#f8fafc",fontSize:"10",fontFamily:"monospace",children:"y_i : 158.2 mm"}),e.jsx("text",{x:"75",y:"222",fill:"#f8fafc",fontSize:"10",fontFamily:"monospace",children:"θ_i : 34.8°  (Heading)"}),e.jsx("text",{x:"75",y:"238",fill:"#34d399",fontSize:"10",fontWeight:"bold",fontFamily:"monospace",children:"w_i : 0.892 (Likelihood)"}),e.jsx("circle",{cx:"230",cy:"195",r:"14",fill:"#78350f",stroke:"#f59e0b",strokeWidth:"2"}),e.jsx("line",{x1:"230",y1:"195",x2:"242",y2:"185",stroke:"#fef08a",strokeWidth:"3",markerEnd:"url(#arrow)"})]}),(g.particlesState==="update"||g.particlesState==="converged")&&e.jsxs("g",{stroke:"#10b981",strokeWidth:"1.2",strokeDasharray:"3,3",opacity:"0.65",children:[e.jsx("line",{x1:j,y1:l,x2:j+160,y2:l-80}),e.jsx("line",{x1:j,y1:l,x2:j+160,y2:l}),e.jsx("line",{x1:j,y1:l,x2:j,y2:l+100}),e.jsx("line",{x1:j,y1:l,x2:j-100,y2:l}),e.jsx("line",{x1:j,y1:l,x2:j,y2:l-140})]}),g.particlesState==="uniform"&&ws.map((n,o)=>e.jsx("g",{transform:`translate(${n.x}, ${n.y}) rotate(${n.a})`,children:e.jsx("polygon",{points:"0,-7 5,7 -5,7",fill:"#eab308",opacity:"0.85"})},o)),g.particlesState==="update"&&ws.map((n,o)=>{const x=Math.hypot(n.x-j,n.y-l)<90;return e.jsxs("g",{transform:`translate(${n.x}, ${n.y}) rotate(${n.a})`,children:[e.jsx("polygon",{points:"0,-8 6,8 -6,8",fill:x?"#22c55e":"#eab308",opacity:x?1:.25}),x&&e.jsx("circle",{cx:"0",cy:"0",r:"10",fill:"none",stroke:"#22c55e",strokeWidth:"1",opacity:"0.6"})]},o)}),g.particlesState==="converged"&&e.jsxs("g",{children:[Array.from({length:28}).map((n,o)=>{const m=o*12.857142857142858,x=o%4*4+2,S=j+Math.cos(m*Math.PI/180)*x,z=l+Math.sin(m*Math.PI/180)*x;return e.jsx("g",{transform:`translate(${S}, ${z}) rotate(${p+(o%5-2)*2})`,children:e.jsx("polygon",{points:"0,-7 4,7 -4,7",fill:"#10b981",opacity:"0.9"})},o)}),e.jsx("ellipse",{cx:j,cy:l,rx:"22",ry:"16",fill:"rgba(16, 185, 129, 0.15)",stroke:"#10b981",strokeWidth:"1.5",strokeDasharray:"3,3"}),e.jsx("text",{x:j,y:l+36,fill:"#34d399",fontSize:"10",fontWeight:"bold",textAnchor:"middle",children:"Converged Cloud: σ < 0.02 m"})]}),e.jsxs("g",{transform:`translate(${j}, ${l}) rotate(${p})`,children:[e.jsx("circle",{cx:"0",cy:"0",r:"15",fill:"#0284c7",stroke:"#38bdf8",strokeWidth:"2.5"}),e.jsx("polygon",{points:"0,-12 6,6 -6,6",fill:"#f8fafc"}),e.jsx("circle",{cx:"0",cy:"0",r:"3",fill:"#ef4444"})]})]})]})]}),e.jsxs("div",{style:{background:"rgba(15, 23, 42, 0.85)",borderLeft:"3px solid #eab308",padding:"0.35rem 0.6rem",borderRadius:"4px",fontSize:"0.72rem",lineHeight:1.35,color:"#e2e8f0"},children:[e.jsx("span",{style:{color:"#facc15",fontWeight:700,marginRight:"0.35rem"},children:"💡 Step Mechanics:"}),g.explanation]})]})}const re=[{step:0,title:"Occupancy Grid Mapping: The Discrete Matrix Model",subtitle:"Transforming continuous physical warehouse terrain into a discrete probabilistic occupancy lattice.",points:["The real physical world is continuous with infinite resolution.","Robotics algorithms discretize space into a 2D grid matrix of cells.","Each cell represents a patch of physical area with an occupancy probability."],explanation:"Occupancy Grid Mapping (Elfes & Moravec) divides continuous 2D space into equal-sized spatial cells, where each cell stores the probability that an obstacle occupies it."},{step:1,title:"Step 1: Continuous Space to 2D Grid Lattice Discretization",subtitle:"Overlaying a uniform square grid mesh with resolution δ over the warehouse floor.",points:["Discretization: Continuous plane ℝ² is sliced into cells of resolution δ (e.g. 0.05 m / 5 cm).","Continuous metric pose (x, y) maps to integer cell index: i = ⌊x / δ⌋, j = ⌊y / δ⌋.","Cell size controls the tradeoff between spatial accuracy and RAM/CPU usage."],explanation:"A uniform Cartesian lattice is superimposed across the warehouse. Each cell covers a physical square of δ × δ meters (typically 5 cm per cell in standard Nav2 SLAM)."},{step:2,title:"Step 2: Binary States & Metric Quantization {0, 1}",subtitle:"Every spatial cell is quantized into a binary state: Free or Occupied.",points:["State 0 (Free Space): Traversable aisle space where AMR wheels and chassis can move.","State 1 (Occupied Space): Solid physical obstacle (walls, racking legs, pallets).","Unknown Space (-1 in ROS 2): Unexplored regions not yet penetrated by LiDAR rays."],explanation:"In the idealized binary formulation, a cell m_i ∈ {0, 1} is either empty or occupied. Quantization eliminates continuous geometric equations in favor of fast matrix indexing."},{step:3,title:"Step 3: The Full Warehouse Discretized Binary Matrix",subtitle:"The entire facility is encoded as a high-density 2D matrix M ∈ {0, 1}^(W × H).",points:["Matrix Dimensions: Width W = ⌊Warehouse_Length / δ⌋, Height H = ⌊Warehouse_Width / δ⌋.","Memory Layout: Flattened into 1D row-major array: index = x_cell + (y_cell × W).","OccupancyGrid ROS 2 message: nav_msgs/msg/OccupancyGrid published on topic /map."],explanation:"The entire industrial facility becomes a 2D array of integers. This discrete grid is directly used by global A* search planners to find collision-free topological routes."},{step:4,title:"Step 4: LiDAR Raycast Cone & Log-Odds Bayesian Updates",subtitle:"Inverse sensor model updates cell probabilities using Bresenham line tracing.",points:["Raycast Traversal: Cells traversed before reflection are updated as FREE (log-odds decrease).","Impact Endpoint: Cell where the beam hits is updated as OCCUPIED (log-odds increase).","Bayesian Log-Odds: l_t(m_i) = l_{t-1}(m_i) + inv_sensor(m_i, z_t) - l_0."],explanation:"As LiDAR beams sweep outward, every ray marks traversed cells as free and endpoint cells as occupied. The recursive log-odds update filters out dynamic noise and transient sensor glitches!"}];function Li(){const[a,s]=c.useState(0),[i,u]=c.useState(!1),g=re[a];c.useEffect(()=>{let p=null;return i&&(p=setInterval(()=>{s(n=>n<re.length-1?n+1:(u(!1),n))},2500)),()=>clearInterval(p)},[i]);const T=p=>{p&&p.stopPropagation(),a<re.length-1&&s(n=>n+1)},w=p=>{p&&p.stopPropagation(),a>0&&s(n=>n-1)},I=p=>{p&&p.stopPropagation(),u(!1),s(0)},N=p=>{p&&p.stopPropagation(),u(n=>!n)},j=160,l=180;return e.jsxs("div",{className:"occupancy-interactive-deck",style:{display:"flex",flexDirection:"column",height:"100%",width:"100%",padding:"0.45rem 0.65rem",boxSizing:"border-box",gap:"0.4rem",background:"var(--bg-card, #0f172a)",borderRadius:"10px",border:"1px solid var(--border-color, #334155)",color:"var(--text-primary, #f8fafc)"},children:[e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:"0.4rem",borderBottom:"1px solid var(--border-color, #334155)",paddingBottom:"0.35rem"},children:[e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"0.5rem"},children:[e.jsxs("span",{style:{background:"#38bdf8",color:"#0f172a",padding:"0.2rem 0.55rem",borderRadius:"999px",fontSize:"0.72rem",fontWeight:700,display:"flex",alignItems:"center",gap:"0.3rem"},children:[e.jsx(te,{size:13}),"Step ",a," of ",re.length-1]}),e.jsx("strong",{style:{fontSize:"0.82rem",color:"#f8fafc"},children:g.title})]}),e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"0.35rem"},children:[e.jsxs("button",{onClick:w,disabled:a===0,style:{display:"flex",alignItems:"center",gap:"0.2rem",padding:"0.25rem 0.55rem",fontSize:"0.72rem",fontWeight:600,borderRadius:"6px",border:"1px solid #475569",background:a===0?"#1e293b":"#334155",color:a===0?"#64748b":"#f8fafc",cursor:a===0?"not-allowed":"pointer"},children:[e.jsx(Re,{size:14})," Prev"]}),e.jsxs("button",{onClick:N,style:{display:"flex",alignItems:"center",gap:"0.25rem",padding:"0.25rem 0.65rem",fontSize:"0.72rem",fontWeight:600,borderRadius:"6px",border:"1px solid #38bdf8",background:i?"#0284c7":"rgba(56, 189, 248, 0.2)",color:"#f8fafc",cursor:"pointer"},children:[i?e.jsx(we,{size:13}):e.jsx(be,{size:13}),i?"Pause":"Auto Play"]}),e.jsxs("button",{onClick:T,disabled:a===re.length-1,style:{display:"flex",alignItems:"center",gap:"0.2rem",padding:"0.25rem 0.65rem",fontSize:"0.72rem",fontWeight:600,borderRadius:"6px",border:"1px solid #10b981",background:a===re.length-1?"#1e293b":"#059669",color:a===re.length-1?"#64748b":"#f8fafc",cursor:a===re.length-1?"not-allowed":"pointer"},children:["Next Step ",e.jsx(fe,{size:14})]}),e.jsx("button",{onClick:I,title:"Reset to Step 0",style:{display:"flex",alignItems:"center",padding:"0.25rem 0.4rem",fontSize:"0.72rem",borderRadius:"6px",border:"1px solid #475569",background:"#1e293b",color:"#94a3b8",cursor:"pointer"},children:e.jsx(K,{size:13})})]})]}),e.jsxs("div",{style:{display:"grid",gridTemplateColumns:"0.95fr 1.45fr",gap:"0.55rem",flex:1,minHeight:0},children:[e.jsxs("div",{style:{display:"flex",flexDirection:"column",justifyContent:"space-between",gap:"0.35rem"},children:[e.jsx("div",{style:{display:"flex",flexDirection:"column",gap:"0.25rem"},children:re.map((p,n)=>{const o=a===n;return e.jsxs("div",{onClick:()=>s(n),style:{padding:"0.3rem 0.5rem",borderRadius:"6px",border:o?"1px solid #38bdf8":"1px solid #334155",background:o?"rgba(56, 189, 248, 0.15)":"rgba(15, 23, 42, 0.5)",cursor:"pointer",display:"flex",alignItems:"center",gap:"0.4rem"},children:[e.jsx("span",{style:{width:"18px",height:"18px",borderRadius:"50%",background:o?"#38bdf8":"#334155",color:o?"#0f172a":"#94a3b8",fontSize:"0.66rem",fontWeight:700,display:"flex",alignItems:"center",justifyContent:"center"},children:n}),e.jsx("span",{style:{fontSize:"0.72rem",fontWeight:o?700:500,color:o?"#e0f2fe":"#cbd5e1"},children:p.title.replace(/^Step \d+: /,"")})]},n)})}),e.jsxs("div",{style:{background:"rgba(15, 23, 42, 0.8)",border:"1px solid rgba(56, 189, 248, 0.3)",borderRadius:"8px",padding:"0.45rem 0.6rem"},children:[e.jsx("div",{style:{fontSize:"0.74rem",fontWeight:700,color:"#38bdf8",marginBottom:"0.3rem"},children:"Mathematical Breakdown"}),e.jsx("ul",{style:{margin:0,paddingLeft:"1.1rem",fontSize:"0.71rem",lineHeight:1.4,color:"#e2e8f0"},children:g.points.map((p,n)=>e.jsx("li",{children:p},n))})]})]}),e.jsxs("div",{onClick:T,title:"Click canvas to advance step",style:{position:"relative",background:"rgba(2, 6, 23, 0.85)",border:"1px solid rgba(56, 189, 248, 0.35)",borderRadius:"10px",overflow:"hidden",display:"flex",flexDirection:"column",justifyContent:"center",cursor:a<re.length-1?"pointer":"default"},children:[e.jsxs("div",{style:{position:"absolute",top:"8px",left:"10px",fontSize:"0.68rem",color:"#94a3b8",display:"flex",gap:"0.8rem",background:"rgba(15, 23, 42, 0.85)",padding:"0.2rem 0.5rem",borderRadius:"4px",border:"1px solid #334155"},children:[e.jsxs("span",{children:[e.jsx("strong",{style:{color:"#0284c7"},children:"■"})," Free Cell (0)"]}),e.jsxs("span",{children:[e.jsx("strong",{style:{color:"#ef4444"},children:"■"})," Occupied (1)"]}),e.jsxs("span",{children:[e.jsx("strong",{style:{color:"#10b981"},children:"―"})," LiDAR Raycast"]})]}),e.jsxs("svg",{viewBox:"0 0 520 280",style:{width:"100%",height:"100%",maxHeight:"260px"},children:[e.jsx("defs",{children:e.jsx("pattern",{id:"gridPattern",width:"20",height:"20",patternUnits:"userSpaceOnUse",children:e.jsx("rect",{width:"20",height:"20",fill:"none",stroke:"rgba(71, 85, 105, 0.4)",strokeWidth:"0.8"})})}),e.jsx("rect",{x:"20",y:"20",width:"480",height:"240",fill:"none",stroke:"#475569",strokeWidth:"4",rx:"6"}),a>=1&&e.jsx("rect",{x:"20",y:"20",width:"480",height:"240",fill:"url(#gridPattern)"}),e.jsx("rect",{x:"80",y:"60",width:"80",height:"40",fill:"#334155",stroke:"#64748b",strokeWidth:"2",rx:"4"}),e.jsx("text",{x:"120",y:"84",fill:"#cbd5e1",fontSize:"10",fontWeight:"bold",textAnchor:"middle",children:"Obstacle A"}),e.jsx("rect",{x:"340",y:"70",width:"100",height:"50",fill:"#334155",stroke:"#64748b",strokeWidth:"2",rx:"4"}),e.jsx("text",{x:"390",y:"99",fill:"#cbd5e1",fontSize:"10",fontWeight:"bold",textAnchor:"middle",children:"Obstacle B"}),a===2&&e.jsxs("g",{children:[e.jsx("rect",{x:"280",y:"140",width:"200",height:"100",fill:"rgba(15, 23, 42, 0.95)",stroke:"#38bdf8",strokeWidth:"2",rx:"6"}),e.jsx("text",{x:"295",y:"165",fill:"#38bdf8",fontSize:"11",fontWeight:"bold",children:"Metric Quantization: m_i"}),e.jsx("rect",{x:"295",y:"178",width:"18",height:"18",fill:"#1e293b",stroke:"#38bdf8",strokeWidth:"1"}),e.jsx("text",{x:"320",y:"192",fill:"#e2e8f0",fontSize:"10",children:"Cell State 0: Free (p=0.0)"}),e.jsx("rect",{x:"295",y:"205",width:"18",height:"18",fill:"#ef4444",stroke:"#f87171",strokeWidth:"1"}),e.jsx("text",{x:"320",y:"219",fill:"#fca5a5",fontSize:"10",children:"Cell State 1: Occupied (p=1.0)"})]}),a===3&&e.jsxs("g",{children:[e.jsxs("g",{opacity:"0.85",children:[e.jsx("rect",{x:"80",y:"60",width:"80",height:"40",fill:"#ef4444",opacity:"0.75"}),e.jsx("rect",{x:"340",y:"70",width:"100",height:"50",fill:"#ef4444",opacity:"0.75"})]}),e.jsx("rect",{x:"60",y:"130",width:"240",height:"110",fill:"rgba(15, 23, 42, 0.95)",stroke:"#06b6d4",strokeWidth:"1.5",rx:"6"}),e.jsx("text",{x:"75",y:"152",fill:"#22d3ee",fontSize:"10.5",fontWeight:"bold",children:"Warehouse 2D Matrix M [W × H]"}),e.jsx("text",{x:"75",y:"172",fill:"#94a3b8",fontSize:"9.5",fontFamily:"monospace",children:"M[0..W] = [0, 0, 1, 1, 0, 0, 0, 1...]"}),e.jsx("text",{x:"75",y:"190",fill:"#94a3b8",fontSize:"9.5",fontFamily:"monospace",children:"Resolution δ = 0.05 m (5 cm / cell)"}),e.jsx("text",{x:"75",y:"208",fill:"#94a3b8",fontSize:"9.5",fontFamily:"monospace",children:"Map Size: 400 × 300 = 120,000 cells"}),e.jsx("text",{x:"75",y:"226",fill:"#34d399",fontSize:"9.5",fontWeight:"bold",fontFamily:"monospace",children:"Published: /map (nav_msgs/OccupancyGrid)"})]}),a===4&&e.jsxs("g",{children:[Array.from({length:11}).map((p,n)=>{const m=(-50+n*10)*Math.PI/180,x=n>=3&&n<=7?140:180,S=j+Math.cos(m)*x,z=l-Math.sin(m)*x;return e.jsxs("g",{children:[e.jsx("line",{x1:j,y1:l,x2:S,y2:z,stroke:"#38bdf8",strokeWidth:"1.5",opacity:"0.6"}),e.jsx("circle",{cx:S,cy:z,r:"4",fill:"#ef4444",stroke:"#fca5a5",strokeWidth:"1"})]},n)}),e.jsx("path",{d:`M ${j} ${l} L ${j+115} ${l-138} A 180 180 0 0 1 ${j+115} ${l-14} Z`,fill:"rgba(56, 189, 248, 0.12)"}),e.jsx("rect",{x:"290",y:"160",width:"200",height:"85",fill:"rgba(15, 23, 42, 0.95)",stroke:"#10b981",strokeWidth:"1.5",rx:"6"}),e.jsx("text",{x:"305",y:"182",fill:"#34d399",fontSize:"10.5",fontWeight:"bold",children:"Bayesian Log-Odds Update"}),e.jsxs("text",{x:"305",y:"202",fill:"#e2e8f0",fontSize:"9.5",fontFamily:"monospace",children:["l_t(m) = l_",t-1," + inv_sensor - l_0"]}),e.jsx("text",{x:"305",y:"220",fill:"#38bdf8",fontSize:"9",children:"Traversed Cells: l < 0 (Free evidence)"}),e.jsx("text",{x:"305",y:"234",fill:"#f87171",fontSize:"9",children:"Impact Cells: l > 0 (Occupied hit)"})]}),e.jsxs("g",{transform:`translate(${j}, ${l})`,children:[e.jsx("circle",{cx:"0",cy:"0",r:"14",fill:"#0284c7",stroke:"#38bdf8",strokeWidth:"2.5"}),e.jsx("polygon",{points:"0,-11 5,5 -5,5",fill:"#f8fafc"}),e.jsx("circle",{cx:"0",cy:"0",r:"3",fill:"#ef4444"})]})]})]})]}),e.jsxs("div",{style:{background:"rgba(15, 23, 42, 0.85)",borderLeft:"3px solid #38bdf8",padding:"0.35rem 0.6rem",borderRadius:"4px",fontSize:"0.72rem",lineHeight:1.35,color:"#e2e8f0"},children:[e.jsx("span",{style:{color:"#38bdf8",fontWeight:700,marginRight:"0.35rem"},children:"💡 Step Mechanics:"}),g.explanation]})]})}const le=[{step:0,title:"Continuous Space to Configuration Space (C-Space)",subtitle:"From complex polygon collision checking to simple point-mass navigation in C_free.",points:["Real-world workspace W is continuous with infinite resolution.","AMRs have physical geometry, length, width, and non-zero footprints.","C-Space transforms obstacles so the robot can be treated as a dimensionless point!"],explanation:"To avoid evaluating complex polygon-polygon intersection tests at every millisecond, path planning maps the robot footprint into Configuration Space."},{step:1,title:"Step 1: Continuous 2D Plane & Goal Waypoint",subtitle:"Defining the continuous Euclidean plane ℝ² and destination coordinates.",points:["Workspace W ⊂ ℝ² contains continuous Cartesian coordinates (x, y).","The robot must plan from Start pose q_s to Goal waypoint q_g.","In pure continuous space without obstacles, any straight line is valid."],explanation:"Before adding obstacles, the continuous plane has infinite potential paths between start and goal."},{step:2,title:"Step 2: Obstacle Boundaries & Swept AMR Footprint",subtitle:"The robot is not a point mass; it sweeps a continuous 2D area along its motion path.",points:["Obstacles W_obs partition the continuous workspace into free and blocked zones.","As the AMR translates, its rectangular chassis sweeps an area: Swept(τ) = ⋃_t A(q(t)).","A path is only valid if Swept(τ) ∩ W_obs = ∅ throughout the entire trajectory."],explanation:"A path whose centerline looks clear might still cause a collision if the AMR chassis perimeter intersects obstacles."},{step:3,title:"Step 3: Clearance Failure & Chassis Collision",subtitle:"Physical chassis corners collide when corridor width is narrower than AMR footprint.",points:["Centerline Clearance: Center point (x, y) stays clear of obstacle.","Chassis Collision: Outer edge touches obstacle boundary because lateral clearance < R.","Real-World Result: Bumper sensor trip, emergency e-stop, or racking damage."],explanation:"Collisions occur whenever the distance from path centerline to obstacle boundary is less than the robot chassis radius R."},{step:4,title:"Step 4: Distance Clearance Condition (dist > R_robot)",subtitle:"Enforcing safety clearance: every path point must maintain dist(p, ∂W_obs) > R.",points:["Safety Corridor: Candidate path must maintain lateral clearance > R_robot at all points.","Allowable Path: Paths passing through narrow gaps (< 2R) are strictly pruned.","Evaluation Complexity: Computing distance from arbitrary curves to polygons is slow."],explanation:"Checking distance to every obstacle polygon vertex along continuous curves is computationally expensive in real-time navigation."},{step:5,title:"Step 5: Obstacle Inflation by Robot Radius (Minkowski Sum)",subtitle:"Inflating all obstacle boundaries outward by robot circumscribed radius R.",points:["Minkowski Sum: W_obs ⊕ A grows obstacles outward uniformly by robot radius R.","AMR Point Transformation: The robot is shrunk to an infinitesimal 0-radius point!","Fast Search: Pathfinding simplifies to finding a 1D line that avoids inflated boundaries."],explanation:"By growing obstacles outward by R, the robot chassis collapses into a single 0-radius point particle! This is the mathematical breakthrough of Configuration Space."},{step:6,title:"Step 6: Dimensionless Point AMR Navigating C_free vs. C_obs",subtitle:"The complete C-Space manifold: C = C_free ∪ C_obs.",points:["C_free: Set of all collision-free configurations where the point AMR can safely exist.","C_obs: Forbidden inflated obstacle space where point AMR cannot enter.","Nav2 Costmap: The 2D Costmap directly implements this C-Space model with inflation layers!"],explanation:"The point AMR can now safely navigate along any curve in C_free. Because obstacles were pre-inflated, the real physical robot is guaranteed never to collide!"}];function Mi(){const[a,s]=c.useState(0),[i,u]=c.useState(!1),g=le[a];c.useEffect(()=>{let j=null;return i&&(j=setInterval(()=>{s(l=>l<le.length-1?l+1:(u(!1),l))},2500)),()=>clearInterval(j)},[i]);const T=j=>{j&&j.stopPropagation(),a<le.length-1&&s(l=>l+1)},w=j=>{j&&j.stopPropagation(),a>0&&s(l=>l-1)},I=j=>{j&&j.stopPropagation(),u(!1),s(0)},N=j=>{j&&j.stopPropagation(),u(l=>!l)};return e.jsxs("div",{className:"cspace-interactive-deck",style:{display:"flex",flexDirection:"column",height:"100%",width:"100%",padding:"0.45rem 0.65rem",boxSizing:"border-box",gap:"0.4rem",background:"var(--bg-card, #0f172a)",borderRadius:"10px",border:"1px solid var(--border-color, #334155)",color:"var(--text-primary, #f8fafc)"},children:[e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:"0.4rem",borderBottom:"1px solid var(--border-color, #334155)",paddingBottom:"0.35rem"},children:[e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"0.5rem"},children:[e.jsxs("span",{style:{background:"#0284c7",color:"#fff",padding:"0.2rem 0.55rem",borderRadius:"999px",fontSize:"0.72rem",fontWeight:700,display:"flex",alignItems:"center",gap:"0.3rem"},children:[e.jsx(te,{size:13}),"Step ",a," of ",le.length-1]}),e.jsx("strong",{style:{fontSize:"0.82rem",color:"#f8fafc"},children:g.title})]}),e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"0.35rem"},children:[e.jsxs("button",{onClick:w,disabled:a===0,style:{display:"flex",alignItems:"center",gap:"0.2rem",padding:"0.25rem 0.55rem",fontSize:"0.72rem",fontWeight:600,borderRadius:"6px",border:"1px solid #475569",background:a===0?"#1e293b":"#334155",color:a===0?"#64748b":"#f8fafc",cursor:a===0?"not-allowed":"pointer"},children:[e.jsx(Re,{size:14})," Prev"]}),e.jsxs("button",{onClick:N,style:{display:"flex",alignItems:"center",gap:"0.25rem",padding:"0.25rem 0.65rem",fontSize:"0.72rem",fontWeight:600,borderRadius:"6px",border:"1px solid #0284c7",background:i?"#0369a1":"rgba(2, 132, 199, 0.2)",color:"#f8fafc",cursor:"pointer"},children:[i?e.jsx(we,{size:13}):e.jsx(be,{size:13}),i?"Pause":"Auto Play"]}),e.jsxs("button",{onClick:T,disabled:a===le.length-1,style:{display:"flex",alignItems:"center",gap:"0.2rem",padding:"0.25rem 0.65rem",fontSize:"0.72rem",fontWeight:600,borderRadius:"6px",border:"1px solid #10b981",background:a===le.length-1?"#1e293b":"#059669",color:a===le.length-1?"#64748b":"#f8fafc",cursor:a===le.length-1?"not-allowed":"pointer"},children:["Next Step ",e.jsx(fe,{size:14})]}),e.jsx("button",{onClick:I,title:"Reset to Step 0",style:{display:"flex",alignItems:"center",padding:"0.25rem 0.4rem",fontSize:"0.72rem",borderRadius:"6px",border:"1px solid #475569",background:"#1e293b",color:"#94a3b8",cursor:"pointer"},children:e.jsx(K,{size:13})})]})]}),e.jsxs("div",{style:{display:"grid",gridTemplateColumns:"0.95fr 1.45fr",gap:"0.55rem",flex:1,minHeight:0},children:[e.jsxs("div",{style:{display:"flex",flexDirection:"column",justifyContent:"space-between",gap:"0.35rem"},children:[e.jsx("div",{style:{display:"flex",flexDirection:"column",gap:"0.25rem"},children:le.map((j,l)=>{const p=a===l;return e.jsxs("div",{onClick:()=>s(l),style:{padding:"0.25rem 0.5rem",borderRadius:"6px",border:p?"1px solid #0284c7":"1px solid #334155",background:p?"rgba(2, 132, 199, 0.18)":"rgba(15, 23, 42, 0.5)",cursor:"pointer",display:"flex",alignItems:"center",gap:"0.4rem"},children:[e.jsx("span",{style:{width:"18px",height:"18px",borderRadius:"50%",background:p?"#0284c7":"#334155",color:p?"#fff":"#94a3b8",fontSize:"0.66rem",fontWeight:700,display:"flex",alignItems:"center",justifyContent:"center"},children:l}),e.jsx("span",{style:{fontSize:"0.71rem",fontWeight:p?700:500,color:p?"#7dd3fc":"#cbd5e1"},children:j.title.replace(/^Step \d+: /,"")})]},l)})}),e.jsxs("div",{style:{background:"rgba(15, 23, 42, 0.8)",border:"1px solid rgba(2, 132, 199, 0.3)",borderRadius:"8px",padding:"0.45rem 0.6rem"},children:[e.jsx("div",{style:{fontSize:"0.74rem",fontWeight:700,color:"#38bdf8",marginBottom:"0.3rem"},children:"Mathematical Breakdown"}),e.jsx("ul",{style:{margin:0,paddingLeft:"1.1rem",fontSize:"0.71rem",lineHeight:1.4,color:"#e2e8f0"},children:g.points.map((j,l)=>e.jsx("li",{children:j},l))})]})]}),e.jsxs("div",{onClick:T,title:"Click canvas to advance step",style:{position:"relative",background:"rgba(2, 6, 23, 0.85)",border:"1px solid rgba(2, 132, 199, 0.35)",borderRadius:"10px",overflow:"hidden",display:"flex",flexDirection:"column",justifyContent:"center",cursor:a<le.length-1?"pointer":"default"},children:[e.jsxs("div",{style:{position:"absolute",top:"8px",left:"10px",fontSize:"0.68rem",color:"#94a3b8",display:"flex",gap:"0.8rem",background:"rgba(15, 23, 42, 0.85)",padding:"0.2rem 0.5rem",borderRadius:"4px",border:"1px solid #334155"},children:[e.jsxs("span",{children:[e.jsx("strong",{style:{color:"#0284c7"},children:"●"})," Start (q_s)"]}),e.jsxs("span",{children:[e.jsx("strong",{style:{color:"#10b981"},children:"★"})," Goal (q_g)"]}),a>=5&&e.jsxs("span",{children:[e.jsx("strong",{style:{color:"#f59e0b"},children:"◌"})," Inflated Boundary"]})]}),e.jsxs("svg",{viewBox:"0 0 520 280",style:{width:"100%",height:"100%",maxHeight:"260px"},children:[e.jsx("circle",{cx:"60",cy:"140",r:"12",fill:"#0284c7",stroke:"#38bdf8",strokeWidth:"2"}),e.jsx("text",{x:"60",y:"144",fill:"#fff",fontSize:"10",fontWeight:"bold",textAnchor:"middle",children:"S"}),e.jsx("circle",{cx:"460",cy:"140",r:"12",fill:"#059669",stroke:"#34d399",strokeWidth:"2"}),e.jsx("text",{x:"460",y:"144",fill:"#fff",fontSize:"10",fontWeight:"bold",textAnchor:"middle",children:"G"}),a>=2&&e.jsxs("g",{children:[e.jsx("rect",{x:"200",y:"40",width:"110",height:"70",fill:"#334155",stroke:"#64748b",strokeWidth:"2",rx:"4"}),e.jsx("text",{x:"255",y:"80",fill:"#cbd5e1",fontSize:"11",fontWeight:"bold",textAnchor:"middle",children:"W_obs 1"}),e.jsx("rect",{x:"200",y:"170",width:"110",height:"70",fill:"#334155",stroke:"#64748b",strokeWidth:"2",rx:"4"}),e.jsx("text",{x:"255",y:"210",fill:"#cbd5e1",fontSize:"11",fontWeight:"bold",textAnchor:"middle",children:"W_obs 2"}),a>=5&&e.jsxs("g",{stroke:"#f59e0b",strokeWidth:"2",strokeDasharray:"4,3",fill:"rgba(245, 158, 11, 0.12)",children:[e.jsx("rect",{x:"180",y:"20",width:"150",height:"110",rx:"18"}),e.jsx("rect",{x:"180",y:"150",width:"150",height:"110",rx:"18"})]})]}),a===1&&e.jsx("line",{x1:"72",y1:"140",x2:"448",y2:"140",stroke:"#38bdf8",strokeWidth:"2",strokeDasharray:"5,3"}),a===2&&e.jsxs("g",{children:[e.jsx("path",{d:"M 60 120 L 255 120 L 460 120 L 460 160 L 255 160 L 60 160 Z",fill:"rgba(56, 189, 248, 0.15)",stroke:"#38bdf8",strokeWidth:"1",strokeDasharray:"3,3"}),e.jsx("rect",{x:"230",y:"125",width:"50",height:"30",fill:"#0284c7",stroke:"#38bdf8",strokeWidth:"2",rx:"3"}),e.jsx("text",{x:"255",y:"144",fill:"#fff",fontSize:"9",fontWeight:"bold",textAnchor:"middle",children:"AMR"})]}),a===3&&e.jsxs("g",{children:[e.jsx("path",{d:"M 60 140 L 460 140",stroke:"#ef4444",strokeWidth:"2"}),e.jsx("rect",{x:"230",y:"120",width:"50",height:"40",fill:"#991b1b",stroke:"#ef4444",strokeWidth:"2",rx:"3"}),e.jsx("circle",{cx:"230",cy:"120",r:"8",fill:"#ef4444"}),e.jsx("circle",{cx:"280",cy:"120",r:"8",fill:"#ef4444"}),e.jsx("circle",{cx:"230",cy:"160",r:"8",fill:"#ef4444"}),e.jsx("circle",{cx:"280",cy:"160",r:"8",fill:"#ef4444"}),e.jsx("text",{x:"255",y:"144",fill:"#fee2e2",fontSize:"9",fontWeight:"bold",textAnchor:"middle",children:"COLLISION!"})]}),a===4&&e.jsxs("g",{children:[e.jsx("line",{x1:"255",y1:"110",x2:"255",y2:"140",stroke:"#38bdf8",strokeWidth:"1.5",markerEnd:"url(#arrow)"}),e.jsx("text",{x:"270",y:"128",fill:"#38bdf8",fontSize:"10",fontWeight:"bold",children:"d < R !"}),e.jsx("line",{x1:"255",y1:"140",x2:"255",y2:"170",stroke:"#38bdf8",strokeWidth:"1.5"}),e.jsx("text",{x:"255",y:"156",fill:"#f87171",fontSize:"9.5",fontWeight:"bold",textAnchor:"middle",children:"Clearance Insufficient"})]}),a>=5&&e.jsxs("g",{children:[e.jsx("path",{d:"M 72 140 L 160 140 Q 255 140 350 140 L 448 140",stroke:"#10b981",strokeWidth:"2.5",fill:"none"}),e.jsx("circle",{cx:"255",cy:"140",r:"6",fill:"#10b981",stroke:"#a7f3d0",strokeWidth:"2"}),e.jsx("circle",{cx:"255",cy:"140",r:"14",fill:"none",stroke:"#10b981",strokeWidth:"1",strokeDasharray:"2,2",opacity:"0.6"}),e.jsx("text",{x:"255",y:"130",fill:"#34d399",fontSize:"10",fontWeight:"bold",textAnchor:"middle",children:"Point AMR in C_free"})]})]})]})]}),e.jsxs("div",{style:{background:"rgba(15, 23, 42, 0.85)",borderLeft:"3px solid #0284c7",padding:"0.35rem 0.6rem",borderRadius:"4px",fontSize:"0.72rem",lineHeight:1.35,color:"#e2e8f0"},children:[e.jsx("span",{style:{color:"#38bdf8",fontWeight:700,marginRight:"0.35rem"},children:"💡 Step Mechanics:"}),g.explanation]})]})}const Mt=[{id:"visibility",name:"1. Visibility Graph",badge:"Shortest Distance",color:"#38bdf8",icon:As,title:"Visibility Graph: Interconnecting Visible Vertices",metricPath:"Shortest (Optimal)",metricClearance:"Minimal (Grazes Corners)",metricComplexity:"O(V²)",points:["Connects Start, Goal, and all obstacle polygon vertices with collision-free lines.","Guarantees globally shortest Euclidean path from Start to Goal.","Paths graze obstacle vertices closely; requires obstacle inflation in practice."],explanation:"The Visibility Graph produces the mathematically shortest path. However, because it hugs obstacle corners with zero clearance, robots must inflate obstacles first!"},{id:"voronoi",name:"2. Voronoi Diagram",badge:"Maximum Clearance",color:"#10b981",icon:Ua,title:"Voronoi Diagram: Free-Space Equidistant Bisectors",metricPath:"Sub-Optimal (Longer)",metricClearance:"Maximized (Equidistant)",metricComplexity:"O(V log V)",points:["Edges are lines and parabolas equidistant from the nearest two obstacle boundaries.","Maximizes lateral safety clearance from walls and racking columns.","Recommended for heavy warehouse AMRs carrying high-value fragile payloads."],explanation:"Voronoi graphs prioritize robot safety over distance. Paths run down the dead center of warehouse aisles with maximum distance from obstacles on all sides."},{id:"exact_cell",name:"3. Exact Cell Decomp",badge:"Convex Slices",color:"#f59e0b",icon:Ha,title:"Exact Cell Decomposition: Vertical Trapezoidal Slicing",metricPath:"Piecewise Linear",metricClearance:"Moderate",metricComplexity:"O(V log V)",points:["Extends vertical line segments from each vertex to partition space into convex trapezoids.","Convexity Guarantee: Any two points inside the same cell can connect via a straight line.","A dual adjacency graph is formed by connecting cell centroids through boundary portals."],explanation:"Exact cell decomposition splits free space into non-overlapping convex polygons. Graph search quickly routes the robot through an ordered channel of adjacent cells."},{id:"approx_cell",name:"4. Approx Quadtree",badge:"Hierarchical Mesh",color:"#a855f7",icon:Ke,title:"Approximate Cell Decomposition: Recursive Quadtrees",metricPath:"Grid Approximation",metricClearance:"Tunable by Resolution",metricComplexity:"Hierarchical O(log N)",points:["Recursively partitions the 2D bounding box into 4 equal quadrants.","Classifies cells into 3 states: Empty (Free), Full (Occupied), or Mixed (Boundary).","Mixed cells are recursively subdivided until a free traversable corridor is unlocked."],explanation:"Hierarchical quadtree decomposition adapts spatial resolution to obstacle density. It serves as the foundational model for multi-resolution 2D costmaps in Nav2!"}];function Fi(){const[a,s]=c.useState("visibility"),i=Mt.find(u=>u.id===a)||Mt[0];return e.jsxs("div",{className:"roadmap-interactive-deck",style:{display:"flex",flexDirection:"column",height:"100%",width:"100%",padding:"0.45rem 0.65rem",boxSizing:"border-box",gap:"0.4rem",background:"var(--bg-card, #0f172a)",borderRadius:"10px",border:"1px solid var(--border-color, #334155)",color:"var(--text-primary, #f8fafc)"},children:[e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:"0.4rem",borderBottom:"1px solid var(--border-color, #334155)",paddingBottom:"0.35rem"},children:[e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"0.5rem"},children:[e.jsxs("span",{style:{background:i.color,color:"#0f172a",padding:"0.2rem 0.55rem",borderRadius:"999px",fontSize:"0.72rem",fontWeight:700,display:"flex",alignItems:"center",gap:"0.3rem"},children:[e.jsx(te,{size:13}),i.badge]}),e.jsx("strong",{style:{fontSize:"0.82rem",color:"#f8fafc"},children:i.title})]}),e.jsx("div",{style:{display:"flex",gap:"0.3rem"},children:Mt.map(u=>{const g=u.id===a;return e.jsx("button",{onClick:()=>s(u.id),style:{padding:"0.25rem 0.55rem",borderRadius:"6px",border:g?`1.5px solid ${u.color}`:"1px solid #334155",background:g?"rgba(15, 23, 42, 0.9)":"#1e293b",color:g?u.color:"#94a3b8",fontSize:"0.7rem",fontWeight:g?700:500,cursor:"pointer"},children:u.name.split(".")[1].trim()},u.id)})})]}),e.jsxs("div",{style:{display:"grid",gridTemplateColumns:"0.95fr 1.45fr",gap:"0.55rem",flex:1,minHeight:0},children:[e.jsxs("div",{style:{display:"flex",flexDirection:"column",justifyContent:"space-between",gap:"0.35rem"},children:[e.jsxs("div",{style:{background:"rgba(15, 23, 42, 0.8)",border:`1px solid ${i.color}33`,borderRadius:"8px",padding:"0.45rem 0.6rem"},children:[e.jsx("div",{style:{fontSize:"0.74rem",fontWeight:700,color:i.color,marginBottom:"0.3rem"},children:"Algorithmic Mechanics"}),e.jsx("ul",{style:{margin:0,paddingLeft:"1.1rem",fontSize:"0.71rem",lineHeight:1.4,color:"#e2e8f0"},children:i.points.map((u,g)=>e.jsx("li",{children:u},g))})]}),e.jsxs("div",{style:{background:"rgba(15, 23, 42, 0.65)",border:"1px solid #334155",borderRadius:"8px",padding:"0.4rem 0.55rem",display:"grid",gridTemplateColumns:"repeat(3, 1fr)",gap:"0.3rem",textAlign:"center"},children:[e.jsxs("div",{style:{padding:"0.2rem",background:"#1e293b",borderRadius:"4px"},children:[e.jsx("div",{style:{fontSize:"0.62rem",color:"#94a3b8"},children:"Path Length"}),e.jsx("div",{style:{fontSize:"0.7rem",fontWeight:"bold",color:"#38bdf8"},children:i.metricPath})]}),e.jsxs("div",{style:{padding:"0.2rem",background:"#1e293b",borderRadius:"4px"},children:[e.jsx("div",{style:{fontSize:"0.62rem",color:"#94a3b8"},children:"Safety Clearance"}),e.jsx("div",{style:{fontSize:"0.7rem",fontWeight:"bold",color:"#10b981"},children:i.metricClearance})]}),e.jsxs("div",{style:{padding:"0.2rem",background:"#1e293b",borderRadius:"4px"},children:[e.jsx("div",{style:{fontSize:"0.62rem",color:"#94a3b8"},children:"Complexity"}),e.jsx("div",{style:{fontSize:"0.7rem",fontWeight:"bold",color:"#f59e0b"},children:i.metricComplexity})]})]})]}),e.jsx("div",{style:{position:"relative",background:"rgba(2, 6, 23, 0.85)",border:`1px solid ${i.color}44`,borderRadius:"10px",overflow:"hidden",display:"flex",flexDirection:"column",justifyContent:"center"},children:e.jsxs("svg",{viewBox:"0 0 520 280",style:{width:"100%",height:"100%",maxHeight:"260px"},children:[e.jsx("circle",{cx:"50",cy:"140",r:"10",fill:"#0284c7",stroke:"#38bdf8",strokeWidth:"2"}),e.jsx("text",{x:"50",y:"144",fill:"#fff",fontSize:"9",fontWeight:"bold",textAnchor:"middle",children:"S"}),e.jsx("circle",{cx:"470",cy:"140",r:"10",fill:"#059669",stroke:"#34d399",strokeWidth:"2"}),e.jsx("text",{x:"470",y:"144",fill:"#fff",fontSize:"9",fontWeight:"bold",textAnchor:"middle",children:"G"}),e.jsx("polygon",{points:"160,50 250,50 250,110 160,110",fill:"#334155",stroke:"#64748b",strokeWidth:"2"}),e.jsx("polygon",{points:"280,160 380,160 380,230 280,230",fill:"#334155",stroke:"#64748b",strokeWidth:"2"}),e.jsx("polygon",{points:"180,180 230,180 230,230 180,230",fill:"#334155",stroke:"#64748b",strokeWidth:"2"}),a==="visibility"&&e.jsxs("g",{children:[e.jsxs("g",{stroke:"#38bdf8",strokeWidth:"1",strokeDasharray:"2,2",opacity:"0.45",children:[e.jsx("line",{x1:"50",y1:"140",x2:"160",y2:"50"}),e.jsx("line",{x1:"50",y1:"140",x2:"160",y2:"110"}),e.jsx("line",{x1:"50",y1:"140",x2:"180",y2:"180"}),e.jsx("line",{x1:"160",y1:"50",x2:"250",y2:"50"}),e.jsx("line",{x1:"250",y1:"50",x2:"470",y2:"140"}),e.jsx("line",{x1:"160",y1:"110",x2:"250",y2:"110"}),e.jsx("line",{x1:"250",y1:"110",x2:"280",y2:"160"}),e.jsx("line",{x1:"250",y1:"110",x2:"470",y2:"140"}),e.jsx("line",{x1:"180",y1:"180",x2:"280",y2:"160"}),e.jsx("line",{x1:"280",y1:"160",x2:"380",y2:"160"}),e.jsx("line",{x1:"380",y1:"160",x2:"470",y2:"140"})]}),e.jsx("polyline",{points:"50,140 160,110 250,110 470,140",fill:"none",stroke:"#10b981",strokeWidth:"3"}),e.jsx("circle",{cx:"160",cy:"110",r:"4",fill:"#10b981"}),e.jsx("circle",{cx:"250",cy:"110",r:"4",fill:"#10b981"}),e.jsx("text",{x:"250",y:"130",fill:"#34d399",fontSize:"10",fontWeight:"bold",children:"Shortest Path (Grazes Vertices)"})]}),a==="voronoi"&&e.jsxs("g",{children:[e.jsx("path",{d:"M 50 140 Q 110 140 150 150 Q 210 140 265 135 Q 320 120 400 120 L 470 140",fill:"none",stroke:"#10b981",strokeWidth:"3"}),e.jsx("path",{d:"M 150 150 L 150 270 M 265 135 L 265 10 M 320 120 L 320 10 M 400 120 L 400 270",stroke:"#34d399",strokeWidth:"1.2",strokeDasharray:"3,3",opacity:"0.6"}),e.jsx("text",{x:"260",y:"155",fill:"#34d399",fontSize:"10",fontWeight:"bold",children:"Equidistant Central Bisector (Max Clearance)"})]}),a==="exact_cell"&&e.jsxs("g",{children:[e.jsxs("g",{stroke:"#f59e0b",strokeWidth:"1.2",strokeDasharray:"4,3",children:[e.jsx("line",{x1:"160",y1:"10",x2:"160",y2:"270"}),e.jsx("line",{x1:"250",y1:"10",x2:"250",y2:"270"}),e.jsx("line",{x1:"280",y1:"10",x2:"280",y2:"270"}),e.jsx("line",{x1:"380",y1:"10",x2:"380",y2:"270"}),e.jsx("line",{x1:"180",y1:"180",x2:"180",y2:"270"}),e.jsx("line",{x1:"230",y1:"180",x2:"230",y2:"270"})]}),e.jsx("polyline",{points:"50,140 105,140 160,145 205,145 250,135 265,135 280,135 330,135 380,135 425,135 470,140",fill:"none",stroke:"#f59e0b",strokeWidth:"2.5"}),e.jsx("text",{x:"260",y:"155",fill:"#fbbf24",fontSize:"10",fontWeight:"bold",children:"Trapezoidal Centroid Trajectory"})]}),a==="approx_cell"&&e.jsxs("g",{children:[e.jsxs("g",{stroke:"#a855f7",strokeWidth:"1",opacity:"0.65",children:[e.jsx("line",{x1:"260",y1:"10",x2:"260",y2:"270"}),e.jsx("line",{x1:"10",y1:"140",x2:"510",y2:"140"}),e.jsx("line",{x1:"135",y1:"10",x2:"135",y2:"140"}),e.jsx("line",{x1:"10",y1:"75",x2:"260",y2:"75"}),e.jsx("line",{x1:"385",y1:"140",x2:"385",y2:"270"}),e.jsx("line",{x1:"260",y1:"205",x2:"510",y2:"205"})]}),e.jsx("rect",{x:"160",y:"50",width:"90",height:"60",fill:"rgba(239, 68, 68, 0.4)",stroke:"#ef4444",strokeWidth:"1"}),e.jsx("rect",{x:"280",y:"160",width:"100",height:"70",fill:"rgba(239, 68, 68, 0.4)",stroke:"#ef4444",strokeWidth:"1"}),e.jsx("rect",{x:"135",y:"75",width:"25",height:"65",fill:"rgba(245, 158, 11, 0.3)",stroke:"#f59e0b",strokeWidth:"1"}),e.jsx("polyline",{points:"50,140 100,120 200,125 260,125 320,125 420,120 470,140",fill:"none",stroke:"#c084fc",strokeWidth:"2.5"}),e.jsx("text",{x:"260",y:"112",fill:"#d8b4fe",fontSize:"10",fontWeight:"bold",children:"Hierarchical Quadtree Free Path"})]})]})})]}),e.jsxs("div",{style:{background:"rgba(15, 23, 42, 0.85)",borderLeft:`3px solid ${i.color}`,padding:"0.35rem 0.6rem",borderRadius:"4px",fontSize:"0.72rem",lineHeight:1.35,color:"#e2e8f0"},children:[e.jsx("span",{style:{color:i.color,fontWeight:700,marginRight:"0.35rem"},children:"💡 Strategy Insight:"}),i.explanation]})]})}const ce=[{step:0,title:"Dynamic Window Approach (DWA): Overview",subtitle:"Real-time velocity generation and forward trajectory rollout within acceleration limits.",points:["AMRs cannot instantly change speeds due to motor inertia and wheel slip.","DWA samples achievable velocities within a dynamic acceleration window.","Simulates forward trajectories, rejects collisions, and scores the best candidate."],explanation:"DWA operates directly in the velocity space (v, ω). It guarantees kinematic feasibility by constraining search to velocities reachable within one timestep."},{step:1,title:"Step 1: Velocity Space Sampling & Dynamic Window",subtitle:"Sampling candidate pairs (v, ω) bounded by physical motor limits and acceleration.",points:["Physical Limits: v ∈ [0, v_max], ω ∈ [-ω_max, ω_max].","Dynamic Window: v ∈ [v_curr - a_max·dt, v_curr + a_max·dt].","Search Lattice: Discretizes window into N_v × N_ω velocity candidate pairs."],explanation:"The Dynamic Window restricts search to velocities the robot can physically achieve within the next control interval dt (e.g. 50 ms at 20 Hz)."},{step:2,title:"Step 2: Forward Numerical Trajectory Simulation",subtitle:"Predicting where the AMR will travel for sim_time (1.5 - 2.5s) for each candidate (v, ω).",points:["Numerical Integration: Trajectories form circular arcs in 2D space.","Temporal Horizon: Simulates robot footprint motion over sim_time = 2.0 s.","Footprint Collision Check: Swept footprint checked against Local Costmap 2D."],explanation:"For every candidate velocity pair, the controller rolls out an arc. Any candidate whose swept footprint intersects a lethal obstacle cell is instantly discarded!"},{step:3,title:"Step 3: Multi-Objective Critic Scoring & Execution",subtitle:"Objective Function: G(v, ω) = α·heading + β·dist + γ·velocity.",points:["Heading Critic (α): Rewards trajectories whose endpoint points toward global plan.","Clearance Critic (β): Rewards distance from obstacles on local costmap.","Velocity Critic (γ): Rewards forward speed to maintain warehouse throughput.","Execution: Highest scoring pair (v*, ω*) is published to /cmd_vel at 20 Hz!"],explanation:"The trajectory with the highest composite score is selected. Nav2 streams the winning velocity command to motor controllers, repeating the cycle every 50 milliseconds!"}];function Oi(){const[a,s]=c.useState(0),[i,u]=c.useState(!1),g=ce[a];c.useEffect(()=>{let p=null;return i&&(p=setInterval(()=>{s(n=>n<ce.length-1?n+1:(u(!1),n))},2500)),()=>clearInterval(p)},[i]);const T=p=>{p&&p.stopPropagation(),a<ce.length-1&&s(n=>n+1)},w=p=>{p&&p.stopPropagation(),a>0&&s(n=>n-1)},I=p=>{p&&p.stopPropagation(),u(!1),s(0)},N=p=>{p&&p.stopPropagation(),u(n=>!n)};return e.jsxs("div",{className:"dwa-interactive-deck",style:{display:"flex",flexDirection:"column",height:"100%",width:"100%",padding:"0.45rem 0.65rem",boxSizing:"border-box",gap:"0.4rem",background:"var(--bg-card, #0f172a)",borderRadius:"10px",border:"1px solid var(--border-color, #334155)",color:"var(--text-primary, #f8fafc)"},children:[e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:"0.4rem",borderBottom:"1px solid var(--border-color, #334155)",paddingBottom:"0.35rem"},children:[e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"0.5rem"},children:[e.jsxs("span",{style:{background:"#e11d48",color:"#fff",padding:"0.2rem 0.55rem",borderRadius:"999px",fontSize:"0.72rem",fontWeight:700,display:"flex",alignItems:"center",gap:"0.3rem"},children:[e.jsx(te,{size:13}),"Step ",a," of ",ce.length-1]}),e.jsx("strong",{style:{fontSize:"0.82rem",color:"#f8fafc"},children:g.title})]}),e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"0.35rem"},children:[e.jsxs("button",{onClick:w,disabled:a===0,style:{display:"flex",alignItems:"center",gap:"0.2rem",padding:"0.25rem 0.55rem",fontSize:"0.72rem",fontWeight:600,borderRadius:"6px",border:"1px solid #475569",background:a===0?"#1e293b":"#334155",color:a===0?"#64748b":"#f8fafc",cursor:a===0?"not-allowed":"pointer"},children:[e.jsx(Re,{size:14})," Prev"]}),e.jsxs("button",{onClick:N,style:{display:"flex",alignItems:"center",gap:"0.25rem",padding:"0.25rem 0.65rem",fontSize:"0.72rem",fontWeight:600,borderRadius:"6px",border:"1px solid #e11d48",background:i?"#be123c":"rgba(225, 29, 72, 0.2)",color:"#f8fafc",cursor:"pointer"},children:[i?e.jsx(we,{size:13}):e.jsx(be,{size:13}),i?"Pause":"Auto Play"]}),e.jsxs("button",{onClick:T,disabled:a===ce.length-1,style:{display:"flex",alignItems:"center",gap:"0.2rem",padding:"0.25rem 0.65rem",fontSize:"0.72rem",fontWeight:600,borderRadius:"6px",border:"1px solid #10b981",background:a===ce.length-1?"#1e293b":"#059669",color:a===ce.length-1?"#64748b":"#f8fafc",cursor:a===ce.length-1?"not-allowed":"pointer"},children:["Next Step ",e.jsx(fe,{size:14})]}),e.jsx("button",{onClick:I,title:"Reset to Step 0",style:{display:"flex",alignItems:"center",padding:"0.25rem 0.4rem",fontSize:"0.72rem",borderRadius:"6px",border:"1px solid #475569",background:"#1e293b",color:"#94a3b8",cursor:"pointer"},children:e.jsx(K,{size:13})})]})]}),e.jsxs("div",{style:{display:"grid",gridTemplateColumns:"0.95fr 1.45fr",gap:"0.55rem",flex:1,minHeight:0},children:[e.jsxs("div",{style:{display:"flex",flexDirection:"column",justifyContent:"space-between",gap:"0.35rem"},children:[e.jsx("div",{style:{display:"flex",flexDirection:"column",gap:"0.25rem"},children:ce.map((p,n)=>{const o=a===n;return e.jsxs("div",{onClick:()=>s(n),style:{padding:"0.28rem 0.5rem",borderRadius:"6px",border:o?"1px solid #e11d48":"1px solid #334155",background:o?"rgba(225, 29, 72, 0.18)":"rgba(15, 23, 42, 0.5)",cursor:"pointer",display:"flex",alignItems:"center",gap:"0.4rem"},children:[e.jsx("span",{style:{width:"18px",height:"18px",borderRadius:"50%",background:o?"#e11d48":"#334155",color:"#fff",fontSize:"0.66rem",fontWeight:700,display:"flex",alignItems:"center",justifyContent:"center"},children:n}),e.jsx("span",{style:{fontSize:"0.71rem",fontWeight:o?700:500,color:o?"#fda4af":"#cbd5e1"},children:p.title.replace(/^Step \d+: /,"")})]},n)})}),e.jsxs("div",{style:{background:"rgba(15, 23, 42, 0.8)",border:"1px solid rgba(225, 29, 72, 0.3)",borderRadius:"8px",padding:"0.45rem 0.6rem"},children:[e.jsx("div",{style:{fontSize:"0.74rem",fontWeight:700,color:"#fb7185",marginBottom:"0.3rem"},children:"Execution Pipeline"}),e.jsx("ul",{style:{margin:0,paddingLeft:"1.1rem",fontSize:"0.71rem",lineHeight:1.4,color:"#e2e8f0"},children:g.points.map((p,n)=>e.jsx("li",{children:p},n))})]})]}),e.jsxs("div",{onClick:T,title:"Click canvas to advance step",style:{position:"relative",background:"rgba(2, 6, 23, 0.85)",border:"1px solid rgba(225, 29, 72, 0.35)",borderRadius:"10px",overflow:"hidden",display:"flex",flexDirection:"column",justifyContent:"center",cursor:a<ce.length-1?"pointer":"default"},children:[e.jsxs("div",{style:{position:"absolute",top:"8px",left:"10px",fontSize:"0.68rem",color:"#94a3b8",display:"flex",gap:"0.8rem",background:"rgba(15, 23, 42, 0.85)",padding:"0.2rem 0.5rem",borderRadius:"4px",border:"1px solid #334155"},children:[e.jsxs("span",{children:[e.jsx("strong",{style:{color:"#10b981"},children:"―"})," Winning Rollout"]}),e.jsxs("span",{children:[e.jsx("strong",{style:{color:"#f59e0b"},children:"―"})," Evaluated Candidate"]}),e.jsxs("span",{children:[e.jsx("strong",{style:{color:"#ef4444"},children:"✕"})," Collision Pruned"]})]}),e.jsxs("svg",{viewBox:"0 0 520 280",style:{width:"100%",height:"100%",maxHeight:"260px"},children:[e.jsx("rect",{x:"270",y:"70",width:"70",height:"90",fill:"#334155",stroke:"#64748b",strokeWidth:"2",rx:"4"}),e.jsx("text",{x:"305",y:"119",fill:"#f87171",fontSize:"10",fontWeight:"bold",textAnchor:"middle",children:"Pallet"}),e.jsx("path",{d:"M 100 180 Q 220 180 340 190 Q 420 190 490 170",fill:"none",stroke:"#38bdf8",strokeWidth:"1.5",strokeDasharray:"4,4",opacity:"0.6"}),e.jsx("text",{x:"450",y:"160",fill:"#38bdf8",fontSize:"9",fontWeight:"bold",children:"Global Plan"}),a===1&&e.jsxs("g",{children:[e.jsx("rect",{x:"250",y:"160",width:"220",height:"95",fill:"rgba(15, 23, 42, 0.95)",stroke:"#e11d48",strokeWidth:"1.5",rx:"6"}),e.jsx("text",{x:"265",y:"182",fill:"#fb7185",fontSize:"10.5",fontWeight:"bold",children:"Dynamic Window V_d [v, ω]"}),e.jsx("text",{x:"265",y:"202",fill:"#e2e8f0",fontSize:"9.5",fontFamily:"monospace",children:"v ∈ [v_k - a·dt, v_k + a·dt]"}),e.jsx("text",{x:"265",y:"220",fill:"#e2e8f0",fontSize:"9.5",fontFamily:"monospace",children:"ω ∈ [ω_k - α·dt, ω_k + α·dt]"}),e.jsx("text",{x:"265",y:"238",fill:"#34d399",fontSize:"9.5",fontWeight:"bold",fontFamily:"monospace",children:"Sample Grid: 20 × 40 = 800 pairs"})]}),a>=2&&e.jsxs("g",{children:[e.jsx("path",{d:"M 100 180 Q 180 180 270 120",fill:"none",stroke:"#ef4444",strokeWidth:"1.5",strokeDasharray:"3,3"}),e.jsx("circle",{cx:"270",cy:"120",r:"5",fill:"#ef4444"}),e.jsx("path",{d:"M 100 180 Q 200 170 275 140",fill:"none",stroke:"#ef4444",strokeWidth:"1.5",strokeDasharray:"3,3"}),e.jsx("circle",{cx:"275",cy:"140",r:"5",fill:"#ef4444"}),e.jsx("path",{d:"M 100 180 Q 160 210 240 240 Q 320 260 400 250",fill:"none",stroke:"#f59e0b",strokeWidth:"1.2",opacity:"0.6"}),e.jsx("path",{d:"M 100 180 Q 180 200 270 210 Q 350 215 430 205",fill:"none",stroke:"#f59e0b",strokeWidth:"1.2",opacity:"0.6"}),e.jsx("path",{d:"M 100 180 Q 190 120 230 60 Q 280 30 350 40",fill:"none",stroke:"#f59e0b",strokeWidth:"1.2",opacity:"0.6"}),e.jsx("path",{d:"M 100 180 Q 190 185 280 195 Q 360 200 450 185",fill:"none",stroke:"#10b981",strokeWidth:"3.5"}),e.jsx("circle",{cx:"450",cy:"185",r:"5",fill:"#10b981",stroke:"#a7f3d0",strokeWidth:"1.5"}),a===3&&e.jsxs("g",{children:[e.jsx("rect",{x:"290",y:"10",width:"210",height:"80",fill:"rgba(15, 23, 42, 0.95)",stroke:"#10b981",strokeWidth:"1.5",rx:"6"}),e.jsx("text",{x:"305",y:"30",fill:"#34d399",fontSize:"10.5",fontWeight:"bold",children:"Best Candidate (v*, ω*)"}),e.jsx("text",{x:"305",y:"48",fill:"#e2e8f0",fontSize:"9",fontFamily:"monospace",children:"v* = 0.52 m/s, ω* = -0.14 rad/s"}),e.jsx("text",{x:"305",y:"64",fill:"#fbbf24",fontSize:"9",fontFamily:"monospace",children:"Score G(v, ω) = 94.6 (Max)"}),e.jsx("text",{x:"305",y:"78",fill:"#38bdf8",fontSize:"8.5",fontWeight:"bold",children:"Published: /cmd_vel @ 20 Hz"})]})]}),e.jsxs("g",{transform:"translate(100, 180)",children:[e.jsx("circle",{cx:"0",cy:"0",r:"14",fill:"#0284c7",stroke:"#38bdf8",strokeWidth:"2.5"}),e.jsx("polygon",{points:"0,-11 5,5 -5,5",fill:"#f8fafc"}),e.jsx("circle",{cx:"0",cy:"0",r:"3",fill:"#ef4444"})]})]})]})]}),e.jsxs("div",{style:{background:"rgba(15, 23, 42, 0.85)",borderLeft:"3px solid #e11d48",padding:"0.35rem 0.6rem",borderRadius:"4px",fontSize:"0.72rem",lineHeight:1.35,color:"#e2e8f0"},children:[e.jsx("span",{style:{color:"#fb7185",fontWeight:700,marginRight:"0.35rem"},children:"💡 Step Mechanics:"}),g.explanation]})]})}function ks(a,s="bash"){if(!a)return"";let i="";try{i=Ne.highlight(a,{language:s||"bash",ignoreIllegals:!0}).value}catch{try{i=Ne.highlightAuto(a).value}catch{i=a.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}}if(s==="bash"||s==="sh"||s==="shell"){const u=[];i=i.replace(/<span class="hljs-comment">[\s\S]*?<\/span>/g,g=>(u.push(g),`___COMMENT_${u.length-1}___`)),i=i.replace(new RegExp("(?<=\\s|^)(--?[a-zA-Z0-9_\\-]+|\\+[xrwst]+)(?=\\s|$)","g"),(g,T)=>`<span class="hljs-flag">${T}</span>`),i=i.replace(new RegExp("(?<=\\s|^)(~?\\/[a-zA-Z0-9_.\\-\\/]+|\\b[a-zA-Z0-9_\\-]+\\.(?:py|yaml|yml|sh|bash|xml|launch\\.py|txt|log|urdf|xacro|srv|msg|action)\\b)","g"),(g,T)=>`<span class="hljs-path">${T}</span>`),i=i.replace(new RegExp("(?<=\\s|^)(\\|{1,2}|&&|>>|>|;)(?=\\s|$)","g"),(g,T)=>`<span class="hljs-operator">${T}</span>`),i=i.replace(/___COMMENT_(\d+)___/g,(g,T)=>u[T])}return i}function Gi({lessons:a=[],modules:s=[],initialLessonId:i=null,theme:u="light",onToggleTheme:g,onExitPresentation:T}){const[w,I]=c.useState(()=>{var k;if(i&&a.some(D=>D.id===i))return i;if(typeof window<"u"){const D=window.location.hash.match(/#\/(?:presentation|slides)\/(\d+)/);if(D){const W=a.find(G=>G.num_str===D[1].padStart(2,"0"));if(W)return W.id}}return((k=a[0])==null?void 0:k.id)||"lesson_01"}),[N,j]=c.useState(()=>{if(typeof window<"u"){const k=new URLSearchParams(window.location.hash.split("?")[1]||""),D=parseInt(k.get("slide"),10);return!isNaN(D)&&D>=0?D:0}return 0}),[l,p]=c.useState(!1),[n,o]=c.useState(!1),[m,x]=c.useState(!0),S=c.useRef(null),[z,R]=c.useState(!1),[h,f]=c.useState(!1),[_,y]=c.useState(null),v=c.useRef(null),b=c.useMemo(()=>a.find(k=>k.id===w)||a[0],[a,w]),r=c.useMemo(()=>b?Ss(b):[],[b]),d=r[N]||r[0]||null;c.useEffect(()=>{R(!1),y(null),f(!1)},[N,w]),c.useEffect(()=>{if(b&&typeof window<"u"){const D=`#/presentation/${b.num_str}?slide=${N}`;window.location.hash!==D&&window.history.replaceState(null,"",D)}},[b,N]),c.useEffect(()=>{const k=()=>{const D=window.location.hash,W=D.match(/#\/(?:presentation|slides)\/(\d+)/);if(W){const V=a.find(se=>se.num_str===W[1].padStart(2,"0"));V&&V.id!==w&&I(V.id)}const G=new URLSearchParams(D.split("?")[1]||""),O=parseInt(G.get("slide"),10);!isNaN(O)&&O>=0&&j(O)};return window.addEventListener("hashchange",k),()=>window.removeEventListener("hashchange",k)},[a,w]);const C=c.useCallback(()=>{if(N<r.length-1)j(k=>k+1);else{const k=a.findIndex(D=>D.id===w);k!==-1&&k<a.length-1&&(I(a[k+1].id),j(0))}},[N,r.length,a,w]),P=c.useCallback(()=>{if(N>0)j(k=>k-1);else{const k=a.findIndex(D=>D.id===w);if(k>0){const D=a[k-1],W=Ss(D);I(D.id),j(Math.max(0,W.length-1))}}},[N,a,w]),A=c.useCallback(k=>{k>=0&&k<r.length&&(j(k),p(!1))},[r.length]),E=k=>{I(k.target.value),j(0),p(!1)},L=()=>{!document.fullscreenElement&&!n?document.documentElement.requestFullscreen?document.documentElement.requestFullscreen().then(()=>{o(!0)}).catch(()=>{o(!0)}):o(!0):document.fullscreenElement&&document.exitFullscreen?document.exitFullscreen().then(()=>{o(!1)}).catch(()=>{o(!1)}):o(!1)};c.useEffect(()=>{const k=()=>{o(!!document.fullscreenElement)};return document.addEventListener("fullscreenchange",k),()=>document.removeEventListener("fullscreenchange",k)},[]),c.useEffect(()=>{if(!n){x(!0);return}x(!0);const k=()=>{x(!0),S.current&&clearTimeout(S.current),S.current=setTimeout(()=>{x(!1)},2500)};return window.addEventListener("mousemove",k),()=>{window.removeEventListener("mousemove",k),S.current&&clearTimeout(S.current)}},[n]),c.useEffect(()=>{const k=D=>{var W;["INPUT","SELECT","TEXTAREA"].includes((W=document.activeElement)==null?void 0:W.tagName)||(D.key==="ArrowRight"||D.key===" "||D.key==="PageDown"?(D.preventDefault(),C()):D.key==="ArrowLeft"||D.key==="PageUp"?(D.preventDefault(),P()):D.key==="Home"?(D.preventDefault(),j(0)):D.key==="End"?(D.preventDefault(),j(r.length-1)):D.key==="f"||D.key==="F"?(D.preventDefault(),L()):D.key==="g"||D.key==="G"?(D.preventDefault(),p(G=>!G)):D.key==="t"||D.key==="T"?(D.preventDefault(),g&&g()):D.key==="Escape"&&(l?p(!1):n?L():T&&T()))};return window.addEventListener("keydown",k),()=>window.removeEventListener("keydown",k)},[C,P,l,T,g,r.length]),c.useEffect(()=>{if(!v.current)return;v.current.querySelectorAll(".concept-html-body pre code, .challenge-body pre code").forEach(D=>{Ne.highlightElement(D)})},[N,d==null?void 0:d.id]);const F=k=>{k&&navigator.clipboard.writeText(k).then(()=>{f(!0),setTimeout(()=>f(!1),2e3)}).catch(()=>{})},$=k=>{switch(k){case"permission":return e.jsx(Fs,{});case"turtlesim":return e.jsx(Os,{});case"package":return e.jsx(Gs,{});case"pubsub":return e.jsx(Ws,{});case"service":return e.jsx(Bs,{});case"action":return e.jsx($s,{});case"urdf":return e.jsx(Hs,{});case"inertia":return e.jsx(Us,{});case"loglevels":return e.jsx(qs,{});case"astar":return e.jsx(Ii,{});case"amcl":return e.jsx(Ei,{});case"occupancy":return e.jsx(Li,{});case"cspace":return e.jsx(Mi,{});case"roadmap":return e.jsx(Fi,{});case"dwa":return e.jsx(Oi,{});default:return null}};if(!b||!d)return e.jsx("div",{className:"presentation-loading",children:e.jsx("p",{children:"Loading workshop presentation..."})});const M=r.length>0?(N+1)/r.length*100:0;return e.jsxs("div",{className:`presentation-viewport ${u==="dark"?"dark-theme":"light-theme"} ${n?"is-fullscreen":""}`,children:[!n&&e.jsxs("header",{className:"ppt-header",children:[e.jsxs("div",{className:"ppt-header-left",children:[e.jsxs("button",{className:"ppt-brand-btn",onClick:T,title:"Exit Presentation & Return to Web LMS",children:[e.jsx("img",{src:"assets/images/ros2_logo.svg",alt:"ROS 2",className:"ppt-logo"}),e.jsx("span",{className:"ppt-brand-label",children:"Level 1 • AMR Instructor PPT"})]}),e.jsx("div",{className:"ppt-header-divider"}),e.jsx("div",{className:"ppt-lesson-selector-wrap",children:e.jsx("select",{value:w,onChange:E,className:"ppt-lesson-select",title:"Switch Lesson Deck",children:a.map(k=>e.jsxs("option",{value:k.id,children:["Lesson ",k.num_str,": ",k.title]},k.id))})})]}),e.jsx("div",{className:"ppt-header-center",children:e.jsxs("button",{className:"ppt-slide-counter-btn",onClick:()=>p(k=>!k),title:"Open Slide Grid (Press G)",children:[e.jsxs("span",{className:"slide-curr-num",children:["Slide ",N+1]}),e.jsx("span",{className:"slide-sep",children:"/"}),e.jsx("span",{className:"slide-total-num",children:r.length}),e.jsx(Ke,{size:14,className:"counter-icon"})]})}),e.jsxs("div",{className:"ppt-header-right",children:[e.jsxs("button",{onClick:()=>p(!0),className:"ppt-tool-btn",title:"Slide Grid Overview (Press G)",children:[e.jsx(Ke,{size:17}),e.jsx("span",{className:"btn-hotkey",children:"G"})]}),e.jsxs("button",{onClick:L,className:"ppt-tool-btn",title:n?"Exit Fullscreen (Press F)":"Fullscreen Mode (Press F)",children:[n?e.jsx(zt,{size:17}):e.jsx(Va,{size:17}),e.jsx("span",{className:"btn-hotkey",children:"F"})]}),e.jsxs("button",{onClick:g,className:"ppt-tool-btn",title:`Switch to ${u==="dark"?"Light":"Dark"} Mode (Press T)`,children:[u==="dark"?e.jsx(Ft,{size:17}):e.jsx(Ot,{size:17}),e.jsx("span",{className:"btn-hotkey",children:"T"})]}),e.jsxs("button",{onClick:T,className:"ppt-tool-btn ppt-exit-btn",title:"Exit Presentation Mode (Press Esc)",children:[e.jsx(Ye,{size:18}),e.jsx("span",{className:"exit-label",children:"Exit"})]})]})]}),!n&&e.jsx("div",{className:"ppt-progress-track",children:e.jsx("div",{className:"ppt-progress-bar",style:{width:`${M}%`}})}),e.jsx("main",{className:"ppt-main-stage",children:e.jsxs("div",{className:`ppt-card-container ppt-type-${d.type}`,ref:v,children:[!n&&e.jsxs("div",{className:"ppt-card-top-bar",children:[e.jsxs("div",{className:"ppt-card-meta",children:[e.jsx("span",{className:"ppt-module-tag",children:b.module}),e.jsxs("span",{className:"ppt-lesson-tag",children:["Lesson ",b.num_str]}),d.badge&&e.jsx("span",{className:"ppt-concept-badge",children:d.badge})]}),d.sectionTitle&&e.jsx("span",{className:"ppt-section-path",children:d.sectionTitle})]}),d.type==="title"&&e.jsxs("div",{className:"ppt-slide-content ppt-slide-title-view",children:[e.jsxs("div",{className:"title-view-hero",children:[e.jsx("span",{className:"hero-day-pill",children:b.module}),e.jsxs("h1",{className:"hero-lesson-title",children:[e.jsxs("span",{className:"title-accent",children:["Lesson ",b.num_str,":"]})," ",b.title]}),e.jsxs("div",{className:"hero-meta-row",children:[e.jsxs("span",{className:"hero-meta-badge",children:[e.jsx(Ls,{size:15}),e.jsx("span",{children:b.duration||"90 Mins"})]}),e.jsxs("span",{className:"hero-meta-badge",children:[e.jsx(te,{size:15}),e.jsx("span",{children:"ROS 2 Jazzy • Level 1"})]}),e.jsxs("span",{className:"hero-meta-badge",children:[e.jsx(Te,{size:15}),e.jsxs("span",{children:[r.length," Concept Slides"]})]})]}),b.focus&&e.jsxs("div",{className:"hero-focus-box",children:[e.jsx("strong",{children:"Core Focus:"})," ",b.focus]})]}),e.jsxs("div",{className:"launchpad-lower-deck",children:[d.outcomes&&d.outcomes.length>0&&e.jsxs("div",{className:"launchpad-panel outcomes-panel",children:[e.jsxs("div",{className:"panel-header",children:[e.jsx($t,{size:17,className:"panel-header-icon"}),e.jsx("h3",{children:"Core Learning Objectives"})]}),e.jsxs("div",{className:"launchpad-outcomes-list",children:[d.outcomes.slice(0,4).map((k,D)=>e.jsxs("div",{className:"launchpad-outcome-item",children:[e.jsx("span",{className:"outcome-check",children:"✓"}),e.jsx("span",{className:"outcome-item-text",dangerouslySetInnerHTML:{__html:k.text}})]},D)),d.outcomes.length>4&&e.jsx("div",{className:"launchpad-outcomes-more",children:e.jsxs("span",{children:["+",d.outcomes.length-4," additional objectives detailed in web LMS"]})})]})]}),b.snapshot&&b.snapshot.length>0&&e.jsxs("div",{className:"launchpad-panel snapshot-panel",children:[e.jsxs("div",{className:"panel-header",children:[e.jsx(et,{size:17,className:"panel-header-icon zap"}),e.jsx("h3",{children:"Key Technical Concepts"})]}),e.jsx("div",{className:"launchpad-snapshot-list",children:b.snapshot.map((k,D)=>e.jsxs("div",{className:"launchpad-snap-item",children:[e.jsx("span",{className:"snap-bullet",children:D+1}),e.jsx("div",{className:"snap-item-text",children:Array.isArray(k)?e.jsxs(e.Fragment,{children:[e.jsxs("strong",{children:[k[0],":"]})," ",k[1]]}):k})]},D))})]})]})]}),d.type==="command"&&e.jsxs("div",{className:"ppt-slide-content ppt-slide-command-view",children:[e.jsxs("div",{className:"cmd-slide-header",children:[e.jsx("div",{className:"cmd-badge-large",children:d.baseBadge||d.badge}),e.jsxs("div",{className:"cmd-title-group",children:[e.jsxs("div",{className:"cmd-title-row",children:[e.jsx("h2",{className:"cmd-slide-title",children:d.title}),d.totalUsageSteps>1&&e.jsxs("span",{className:"cmd-usage-pill",children:["Usage ",d.usageStep," of ",d.totalUsageSteps]})]}),d.syntax&&e.jsxs("div",{className:"cmd-syntax-strip",children:[e.jsx("span",{className:"syntax-label",children:"Syntax:"}),e.jsx("code",{className:"syntax-code",children:d.syntax})]})]})]}),d.desc&&e.jsx("div",{className:"cmd-slide-desc",dangerouslySetInnerHTML:{__html:d.desc}}),d.code&&e.jsxs("div",{className:"ppt-terminal-window",children:[e.jsxs("div",{className:"ppt-term-header",children:[e.jsxs("div",{className:"term-dots",children:[e.jsx("span",{className:"dot red"}),e.jsx("span",{className:"dot yellow"}),e.jsx("span",{className:"dot green"})]}),e.jsxs("div",{className:"term-title-wrapper",children:[e.jsx(ze,{size:14,className:"term-title-icon"}),e.jsx("span",{className:"term-title",children:"student@amr-dev-container:~ (bash)"})]}),e.jsxs("button",{onClick:()=>F(d.code),className:"term-copy-btn",title:"Copy Terminal Command",children:[h?e.jsx(Se,{size:14}):e.jsx(Xe,{size:14}),e.jsx("span",{children:h?"Copied!":"Copy"})]})]}),e.jsx("pre",{className:"ppt-term-body",children:e.jsx("code",{className:`hljs language-${d.lang||"bash"}`,dangerouslySetInnerHTML:{__html:ks(d.code,d.lang||"bash")}})})]},d.id)]}),d.type==="code_step"&&e.jsxs("div",{className:"ppt-slide-content ppt-slide-code-step-view",children:[e.jsxs("div",{className:"step-slide-header",children:[e.jsx("span",{className:"step-badge-pill",children:d.badge}),e.jsx("h2",{className:"step-slide-title",children:d.title})]}),d.desc&&e.jsx("div",{className:"step-slide-desc",dangerouslySetInnerHTML:{__html:d.desc}}),d.code&&e.jsxs("div",{className:"ppt-ide-window",children:[e.jsxs("div",{className:"ppt-ide-header",children:[e.jsxs("div",{className:"ide-dots",children:[e.jsx("span",{className:"dot red"}),e.jsx("span",{className:"dot yellow"}),e.jsx("span",{className:"dot green"})]}),e.jsxs("span",{className:"ide-file-tab",children:[e.jsx(Bt,{size:14}),e.jsx("span",{children:d.title})]}),e.jsxs("button",{onClick:()=>F(d.code),className:"ide-copy-btn",title:"Copy Source Code",children:[h?e.jsx(Se,{size:14}):e.jsx(Xe,{size:14}),e.jsx("span",{children:h?"Copied":"Copy"})]})]}),e.jsx("pre",{className:"ppt-ide-body",children:e.jsx("code",{className:`hljs language-${d.lang||"python"}`,dangerouslySetInnerHTML:{__html:ks(d.code,d.lang||"python")}})})]},d.id),d.breakdown&&e.jsx("div",{className:"step-breakdown-wrapper",dangerouslySetInnerHTML:{__html:d.breakdown}})]}),d.type==="step_breakdown"&&e.jsxs("div",{className:"ppt-slide-content ppt-slide-breakdown-view",children:[e.jsxs("div",{className:"step-slide-header",children:[e.jsx("span",{className:"step-badge-pill breakdown-pill",children:d.badge}),e.jsx("h2",{className:"step-slide-title",children:d.title})]}),e.jsx("div",{className:"step-breakdown-wrapper ppt-breakdown-deck",dangerouslySetInnerHTML:{__html:d.htmlContent}})]}),d.type==="interactive"&&e.jsx("div",{className:"ppt-slide-content ppt-slide-interactive-view",children:e.jsx("div",{className:"interactive-stage-container",children:$(d.interactiveKey)})}),d.type==="section_title"&&e.jsx("div",{className:"ppt-slide-content ppt-slide-section-title-view",children:e.jsxs("div",{className:"section-title-hero",children:[e.jsx("h1",{className:`section-title-text ${d.titleClass||""}`,style:d.titleColor?{color:d.titleColor}:{},children:d.title}),d.description&&e.jsx("p",{className:"section-title-desc",children:d.description}),d.htmlContent&&e.jsx("div",{dangerouslySetInnerHTML:{__html:d.htmlContent}})]})}),(d.type==="concept"||d.type==="subtopic")&&e.jsxs("div",{className:"ppt-slide-content ppt-slide-concept-view",children:[d.title&&e.jsxs("div",{className:"concept-slide-header",children:[e.jsxs("div",{className:"concept-title-row",children:[d.badge&&e.jsx("span",{className:"concept-badge-tag",children:d.badge}),e.jsx("h2",{className:"concept-main-title",children:d.title})]}),e.jsx("div",{className:"concept-header-divider"})]}),e.jsx("div",{className:"concept-html-body markdown-body",dangerouslySetInnerHTML:{__html:d.htmlContent}})]}),d.type==="challenge"&&e.jsxs("div",{className:"ppt-slide-content ppt-slide-challenge-view",children:[e.jsxs("div",{className:"challenge-banner",children:[e.jsx(te,{size:24,className:"banner-icon"}),e.jsxs("div",{children:[e.jsx("span",{className:"banner-sub",children:"Hands-On Practical Lab"}),e.jsx("h2",{className:"banner-title",children:d.title})]})]}),e.jsx("div",{className:"challenge-content-body ppt-challenge-briefing",dangerouslySetInnerHTML:{__html:d.htmlContent}})]}),d.type==="quiz"&&e.jsxs("div",{className:"ppt-slide-content ppt-slide-quiz-view",children:[e.jsxs("div",{className:"quiz-slide-header",children:[e.jsxs("span",{className:"quiz-badge-pill",children:[e.jsx(ft,{size:15}),e.jsxs("span",{children:["Concept Assessment • ",d.title]})]}),e.jsx("h2",{className:"quiz-question-text",children:d.question})]}),e.jsx("div",{className:"quiz-options-deck",children:d.options.map((k,D)=>{const W=D===d.answer,G=_===D;let O="quiz-option-card";return z?W?O+=" answer-correct":G&&(O+=" answer-wrong"):G&&(O+=" option-selected"),e.jsxs("button",{className:O,onClick:()=>y(D),children:[e.jsx("span",{className:"opt-letter",children:String.fromCharCode(65+D)}),e.jsx("span",{className:"opt-label",children:k}),z&&W&&e.jsx(H,{size:20,className:"status-mark correct"}),z&&G&&!W&&e.jsx(Ka,{size:20,className:"status-mark wrong"})]},D)})}),e.jsxs("div",{className:"quiz-instructor-bar",children:[e.jsxs("button",{className:`reveal-answer-btn ${z?"revealed":""}`,onClick:()=>R(k=>!k),children:[e.jsx(te,{size:16}),e.jsx("span",{children:z?"Hide Explanation":"Reveal Answer & Pedagogical Breakdown"})]}),z&&e.jsxs("div",{className:"quiz-explanation-box fade-in",children:[e.jsxs("div",{className:"exp-header",children:[e.jsx(H,{size:18,className:"exp-icon"}),e.jsxs("strong",{children:["Correct Answer: Option ",String.fromCharCode(65+d.answer)]})]}),e.jsx("p",{className:"exp-text",children:d.explanation})]})]})]}),d.type==="summary"&&e.jsxs("div",{className:"ppt-slide-content ppt-slide-summary-view",children:[e.jsxs("div",{className:"summary-hero",children:[e.jsx(H,{size:48,className:"summary-success-icon"}),e.jsx("h2",{className:"summary-title",children:d.title}),e.jsxs("p",{className:"summary-desc",children:["Congratulations! You have completed all lecture topics, code walkthroughs, and hands-on exercises for Lesson ",b.num_str,"."]})]}),e.jsxs("div",{className:"summary-action-card",children:[e.jsx("h3",{children:"What's Next in the 3-Day Autonomous AMR Workshop?"}),b.next_id?e.jsxs("button",{onClick:C,className:"summary-next-btn",children:[e.jsx("span",{children:"Advance to Next Lesson"}),e.jsx(_e,{size:18})]}):e.jsx("p",{className:"workshop-complete-note",children:"🎉 You have reached the end of the foundational robotics curriculum!"})]})]})]})}),!n&&e.jsxs("footer",{className:"ppt-footer",children:[e.jsx("div",{className:"ppt-footer-left",children:e.jsxs("button",{onClick:P,className:"ppt-nav-btn prev-btn",disabled:N===0&&a.findIndex(k=>k.id===w)===0,title:"Previous Slide (Press Left Arrow)",children:[e.jsx(Re,{size:20}),e.jsx("span",{children:"Previous"}),e.jsx("span",{className:"key-hint",children:"←"})]})}),e.jsx("div",{className:"ppt-footer-center",children:e.jsx("div",{className:"ppt-dots-container",children:r.map((k,D)=>e.jsx("button",{onClick:()=>A(D),className:`ppt-dot ${D===N?"active":""} type-${k.type}`,title:`Jump to Slide ${D+1}: ${k.title}`},k.id||D))})}),e.jsx("div",{className:"ppt-footer-right",children:e.jsxs("button",{onClick:C,className:"ppt-nav-btn next-btn",title:"Next Slide (Press Right Arrow or Space)",children:[e.jsx("span",{children:"Next"}),e.jsx("span",{className:"key-hint",children:"→"}),e.jsx(fe,{size:20})]})})]}),n&&e.jsxs(e.Fragment,{children:[e.jsx("div",{className:"ppt-fs-company-brand",title:"Botforge Robotics",children:e.jsx("img",{src:u==="dark"?"assets/images/botforge_white.png":"assets/images/botforge_black.png",alt:"Botforge Robotics",className:"ppt-fs-company-logo"})}),e.jsx("button",{className:`ppt-fs-top-exit-btn ${m?"visible":""}`,onClick:L,title:"Exit Fullscreen (Press Esc or F)",children:e.jsx(zt,{size:18})}),e.jsxs("div",{className:`ppt-fs-hud-dock ${m?"visible":""}`,children:[e.jsx("button",{onClick:P,className:"fs-hud-btn",disabled:N===0&&a.findIndex(k=>k.id===w)===0,title:"Previous Slide (←)",children:e.jsx(Re,{size:18})}),e.jsxs("button",{onClick:()=>p(!0),className:"fs-hud-counter-btn",title:"Slide Overview (Press G)",children:[e.jsx("span",{className:"fs-curr-num",children:N+1}),e.jsx("span",{className:"fs-sep",children:"/"}),e.jsx("span",{className:"fs-total-num",children:r.length}),e.jsx(Ke,{size:13,className:"fs-grid-icon"})]}),e.jsx("button",{onClick:C,className:"fs-hud-btn",title:"Next Slide (→ or Space)",children:e.jsx(fe,{size:18})}),e.jsx("div",{className:"fs-hud-divider"}),e.jsx("button",{onClick:g,className:"fs-hud-btn",title:"Switch Theme (T)",children:u==="dark"?e.jsx(Ft,{size:16}):e.jsx(Ot,{size:16})}),e.jsxs("button",{onClick:L,className:"fs-hud-btn fs-hud-exit-btn",title:"Exit Fullscreen (Esc or F)",children:[e.jsx(zt,{size:16}),e.jsx("span",{className:"fs-exit-text",children:"Exit"})]})]})]}),l&&e.jsx("div",{className:"ppt-grid-modal-overlay fade-in",onClick:()=>p(!1),children:e.jsxs("div",{className:"ppt-grid-modal-card",onClick:k=>k.stopPropagation(),children:[e.jsxs("div",{className:"grid-modal-header",children:[e.jsxs("div",{className:"grid-modal-title",children:[e.jsx(Ke,{size:20}),e.jsxs("h3",{children:["Slide Deck Overview • Lesson ",b.num_str," (",r.length," Slides)"]})]}),e.jsx("button",{className:"grid-modal-close-btn",onClick:()=>p(!1),title:"Close Overview (Press Esc)",children:e.jsx(Ye,{size:20})})]}),e.jsx("div",{className:"grid-cards-scroller",children:r.map((k,D)=>e.jsxs("div",{className:`grid-slide-thumb ${D===N?"current-active":""}`,onClick:()=>A(D),children:[e.jsxs("div",{className:"thumb-top",children:[e.jsxs("span",{className:"thumb-index",children:["#",D+1]}),e.jsx("span",{className:`thumb-type-tag type-${k.type}`,children:k.type})]}),e.jsx("h4",{className:"thumb-title",children:k.title}),k.badge&&e.jsx("span",{className:"thumb-badge",children:k.badge})]},k.id||D))})]})})]})}function Wi(){const{completedLessons:a,quizScores:s,currentLessonId:i,setCurrentLessonId:u,toggleLessonComplete:g,recordQuizScore:T,resetProgress:w,progressPercent:I,completedCount:N,totalLessons:j}=Ja(pe.total_lessons),l=c.useCallback(y=>{g(y)},[g]),p=c.useCallback((y,v,b)=>{T(y,v,b)},[T]),[n,o]=c.useState(!1),[m,x]=c.useState(()=>{try{return localStorage.getItem("navpro_l1_theme")||"light"}catch{return"light"}}),[S,z]=c.useState(!1),[R,h]=c.useState(()=>typeof window>"u"?!1:window.location.hash.startsWith("#/presentation")||window.location.hash.startsWith("#/slides"));c.useEffect(()=>{const y=()=>{h(window.location.hash.startsWith("#/presentation")||window.location.hash.startsWith("#/slides"))};return window.addEventListener("hashchange",y),()=>window.removeEventListener("hashchange",y)},[]),c.useEffect(()=>{document.documentElement.setAttribute("data-theme",m),localStorage.setItem("navpro_l1_theme",m)},[m]);const f=c.useCallback(()=>{x(y=>y==="light"?"dark":"light")},[]);c.useEffect(()=>{const y=()=>{setTimeout(async()=>{var v;try{const b=(v=window.getSelection())==null?void 0:v.toString();b&&b.trim()&&fetch("/api/clipboard",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({text:b.trim()})}).catch(()=>{})}catch{}},50)};return window.addEventListener("copy",y),()=>window.removeEventListener("copy",y)},[]);const _=pe.lessons.find(y=>y.id===i)||null;return c.useEffect(()=>{const y=v=>{var b;["INPUT","TEXTAREA"].includes((b=document.activeElement)==null?void 0:b.tagName)||(v.key==="["||v.key==="p"?i==="feedback"?u("lesson_22"):_&&_.prev_id&&u(_.prev_id):v.key==="]"||v.key==="n"?_&&_.next_id&&u(_.next_id):v.key==="h"?u(null):v.key==="m"&&z(r=>!r))};return window.addEventListener("keydown",y),()=>window.removeEventListener("keydown",y)},[_,i,u]),R?e.jsx(Gi,{lessons:pe.lessons,modules:pe.modules,initialLessonId:i,theme:m,onToggleTheme:f,onExitPresentation:()=>{h(!1),window.location.hash=i?`#/lesson/${i.replace("lesson_","")}`:"#/"}}):e.jsxs("div",{className:"app-root",children:[e.jsx(Za,{onNavigateHub:()=>u(null),onSelectLesson:y=>u(y),lessons:pe.lessons,currentLessonId:i,onOpenHelpModal:()=>o(!0),theme:m,onToggleTheme:f,onToggleSidebarMobile:()=>z(y=>!y)}),e.jsxs("div",{className:"app-main-layout",children:[e.jsx(ei,{modules:pe.modules,lessons:pe.lessons,currentLessonId:i,onSelectLesson:y=>u(y),onNavigateHub:()=>u(null),completedLessons:a,onToggleComplete:l,quizScores:s,progressPercent:I,completedCount:N,totalLessons:j,onResetProgress:w,isOpenMobile:S,onCloseMobile:()=>z(!1)}),e.jsx("main",{className:"app-content-container",children:_?e.jsx(ri,{lesson:_,onSelectLesson:y=>u(y),onNavigateHub:()=>u(null),isCompleted:a.includes(_.id),onToggleComplete:l,savedScore:s[_.id],onRecordScore:p}):i==="feedback"?e.jsx(di,{onNavigateHub:()=>u(null),onSelectLesson:y=>u(y),completedCount:N,totalLessons:j}):e.jsx(si,{modules:pe.modules,lessons:pe.lessons,onSelectLesson:y=>u(y),completedLessons:a,progressPercent:I,completedCount:N,totalLessons:j})})]}),e.jsx(mi,{}),e.jsx(pi,{isOpen:n,onClose:()=>o(!1)})]})}class Bi extends Je.Component{constructor(i){super(i);gt(this,"handleResetCache",()=>{try{localStorage.removeItem("nexus_amr_l1_current_lesson"),localStorage.removeItem("nexus_amr_l1_completed_lessons"),localStorage.removeItem("nexus_amr_l1_quiz_scores"),localStorage.removeItem("navpro_l1_current_lesson"),localStorage.removeItem("navpro_l1_completed_lessons"),localStorage.removeItem("navpro_l1_quiz_scores"),localStorage.removeItem("navpro_current_lesson"),localStorage.removeItem("navpro_completed_lessons"),localStorage.removeItem("navpro_quiz_scores")}catch(i){console.warn("Could not clear localStorage:",i)}window.location.reload()});gt(this,"handleReload",()=>{window.location.reload()});gt(this,"handleResetState",()=>{this.setState({hasError:!1,error:null,errorInfo:null}),this.props.onReset&&this.props.onReset()});this.state={hasError:!1,error:null,errorInfo:null}}static getDerivedStateFromError(i){return{hasError:!0,error:i}}componentDidCatch(i,u){console.error("[Nexus AMR Level 1 ErrorBoundary caught an exception]:",i,u),this.setState({errorInfo:u})}render(){var i;return this.state.hasError?e.jsx("div",{style:{minHeight:"100vh",display:"flex",alignItems:"center",justifyContent:"center",background:"var(--bg-main, #0b0f19)",color:"var(--text-main, #f8fafc)",padding:"2rem",boxSizing:"border-box"},children:e.jsxs("div",{style:{maxWidth:"600px",width:"100%",background:"var(--card-bg, #111827)",border:"1px solid var(--border-color, #1f2937)",borderRadius:"16px",padding:"2.5rem",boxShadow:"0 20px 40px rgba(0,0,0,0.5)",textAlign:"center"},children:[e.jsx("div",{style:{display:"inline-flex",padding:"1rem",borderRadius:"50%",background:"rgba(239, 68, 68, 0.15)",color:"#ef4444",marginBottom:"1.5rem"},children:e.jsx(Qa,{size:42})}),e.jsx("h2",{style:{fontSize:"1.6rem",fontWeight:700,margin:"0 0 0.5rem 0"},children:"Something went wrong"}),e.jsxs("p",{style:{color:"var(--text-muted, #94a3b8)",fontSize:"0.95rem",lineHeight:1.6,margin:"0 0 2rem 0"},children:["The Learning Hub encountered an unexpected runtime error. Your robotics code in ",e.jsx("code",{children:"ros2_ws/"})," is completely safe on your disk."]}),e.jsxs("div",{style:{display:"flex",gap:"0.75rem",justifyContent:"center",flexWrap:"wrap",marginBottom:"1.5rem"},children:[e.jsxs("button",{onClick:this.handleReload,style:{display:"inline-flex",alignItems:"center",gap:"0.5rem",padding:"0.75rem 1.25rem",background:"var(--primary, #0ea5e9)",color:"#fff",border:"none",borderRadius:"8px",fontWeight:600,cursor:"pointer"},children:[e.jsx(Ms,{size:16}),e.jsx("span",{children:"Reload Page"})]}),e.jsxs("button",{onClick:this.handleResetState,style:{display:"inline-flex",alignItems:"center",gap:"0.5rem",padding:"0.75rem 1.25rem",background:"var(--surface-color, #1e293b)",color:"var(--text-main, #f8fafc)",border:"1px solid var(--border-color, #334155)",borderRadius:"8px",fontWeight:600,cursor:"pointer"},children:[e.jsx(Ya,{size:16}),e.jsx("span",{children:"Return to Hub"})]}),e.jsxs("button",{onClick:this.handleResetCache,style:{display:"inline-flex",alignItems:"center",gap:"0.5rem",padding:"0.75rem 1.25rem",background:"rgba(239, 68, 68, 0.1)",color:"#ef4444",border:"1px solid rgba(239, 68, 68, 0.25)",borderRadius:"8px",fontWeight:600,cursor:"pointer"},children:[e.jsx(K,{size:16}),e.jsx("span",{children:"Clear Local Cache"})]})]}),this.state.error&&e.jsxs("details",{style:{textAlign:"left",marginTop:"1.5rem",background:"rgba(0,0,0,0.3)",padding:"1rem",borderRadius:"8px",fontSize:"0.85rem",color:"#ef4444",fontFamily:"monospace"},children:[e.jsx("summary",{style:{cursor:"pointer",fontWeight:600,color:"var(--text-muted, #94a3b8)"},children:"Technical Error Diagnostics"}),e.jsxs("pre",{style:{marginTop:"0.75rem",overflowX:"auto",whiteSpace:"pre-wrap"},children:[this.state.error.toString(),(i=this.state.errorInfo)==null?void 0:i.componentStack]})]})]})}):this.props.children}}Xa.createRoot(document.getElementById("root")).render(e.jsx(Je.StrictMode,{children:e.jsx(Bi,{children:e.jsx(Wi,{})})}));export{Os as T};
