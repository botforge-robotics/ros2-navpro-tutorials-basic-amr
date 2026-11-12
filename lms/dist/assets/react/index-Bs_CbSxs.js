const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./Ros2ArchitectureInteractive-DxjLEzP7.js","./vendor-DOyMmmUQ.js","./vendor-ZgkIHsf0.css","./Lesson03-D6KgRmxw.js","./curriculum-data-hCBBMX9K.js"])))=>i.map(i=>d[i]);
var na=Object.defineProperty;var ra=(t,s,a)=>s in t?na(t,s,{enumerable:!0,configurable:!0,writable:!0,value:a}):t[s]=a;var ts=(t,s,a)=>ra(t,typeof s!="symbol"?s+"":s,a);import{r as i,j as e,M as ia,S as la,X as Fe,P as vt,a as xt,T as ye,C as As,b as Te,c as os,d as Es,e as Ts,R as te,B as Ls,f as tt,g as is,h as Me,i as bt,k as yt,l as oa,A as me,m as ft,E as ca,N as jt,n as ue,L as fe,o as H,p as de,q as Ps,s as at,t as Oe,u as ce,v as be,w as he,x as $e,y as Be,z as zs,D as cs,F as da,G as Nt,H as Ee,I as _t,J as pa,K as ma,O as nt,Q as ls,U as Ge,Z as qe,V as St,W as ke,Y as Ds,_ as Rs,$ as ua,a0 as as,a1 as ha,a2 as ga,a3 as va,a4 as xa,a5 as rt,a6 as ba,a7 as ya,a8 as fa,a9 as ja,aa as Na,ab as _a,ac as Sa,ad as wa,ae as ys,af as Ca,ag as ka,ah as we,ai as q,aj as X,ak as ns,al as pe,am as ve,an as it,ao as Ea,ap as Ta,aq as Ra,ar as Ce,as as Ia,at as Aa,au as xe,av as wt,aw as se,ax as fs,ay as Ct,az as La,aA as Pa,aB as rs,aC as js,aD as za,aE as Da,aF as lt,aG as Ma,aH as Oa,aI as Fa}from"./vendor-DOyMmmUQ.js";import{l as ne}from"./curriculum-data-hCBBMX9K.js";(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const g of document.querySelectorAll('link[rel="modulepreload"]'))x(g);new MutationObserver(g=>{for(const T of g)if(T.type==="childList")for(const N of T.addedNodes)N.tagName==="LINK"&&N.rel==="modulepreload"&&x(N)}).observe(document,{childList:!0,subtree:!0});function a(g){const T={};return g.integrity&&(T.integrity=g.integrity),g.referrerPolicy&&(T.referrerPolicy=g.referrerPolicy),g.crossOrigin==="use-credentials"?T.credentials="include":g.crossOrigin==="anonymous"?T.credentials="omit":T.credentials="same-origin",T}function x(g){if(g.ep)return;g.ep=!0;const T=a(g);fetch(g.href,T)}})();const Ns="nexus_amr_l1_completed_lessons",_s="nexus_amr_l1_quiz_scores",Ss="nexus_amr_l1_current_lesson",ot="navpro_l1_completed_lessons",ct="navpro_l1_quiz_scores";function $a(t=26){const[s,a]=i.useState(()=>{try{const c=localStorage.getItem(Ns)||localStorage.getItem(ot);return c?JSON.parse(c):[]}catch{return[]}}),[x,g]=i.useState(()=>{try{const c=localStorage.getItem(_s)||localStorage.getItem(ct);return c?JSON.parse(c):{}}catch{return{}}}),[T,N]=i.useState(()=>{try{const r=window.location.hash.match(/#\/(?:lesson|presentation|slides)\/(\d+)/);return r?`lesson_${r[1].padStart(2,"0")}`:localStorage.getItem(Ss)||null}catch{return null}});i.useEffect(()=>{try{localStorage.setItem(Ns,JSON.stringify(s))}catch(c){console.error("Failed to save completed lessons",c)}},[s]),i.useEffect(()=>{try{localStorage.setItem(_s,JSON.stringify(x))}catch(c){console.error("Failed to save quiz scores",c)}},[x]),i.useEffect(()=>{try{const c=window.location.hash;if(c.startsWith("#/presentation")||c.startsWith("#/slides"))return;T?(localStorage.setItem(Ss,T),window.location.hash=`#/lesson/${T.replace("lesson_","")}`):(localStorage.removeItem(Ss),window.location.hash="#/")}catch(c){console.error("Failed to save current lesson",c)}},[T]),i.useEffect(()=>{const c=()=>{const r=window.location.hash;if(r.startsWith("#/presentation")||r.startsWith("#/slides")){const o=r.match(/#\/(?:presentation|slides)\/(\d+)/);o&&N(`lesson_${o[1].padStart(2,"0")}`);return}if(!r||r==="#/"||r==="#")N(null);else{const o=r.match(/#\/lesson\/(\d+)/);o&&N(`lesson_${o[1].padStart(2,"0")}`)}};return window.addEventListener("hashchange",c),()=>window.removeEventListener("hashchange",c)},[]);const P=i.useCallback(c=>{a(r=>r.includes(c)?r.filter(o=>o!==c):[...r,c])},[]),S=i.useCallback(c=>{a(r=>r.includes(c)?r:[...r,c])},[]),I=i.useCallback((c,r,o)=>{const b=r===o;g(y=>({...y,[c]:{score:r,total:o,passed:b,timestamp:Date.now()}})),b&&S(c)},[S]),k=i.useCallback(()=>{window.confirm("Are you sure you want to reset all curriculum progress and quiz scores?")&&(a([]),g({}),localStorage.removeItem(Ns),localStorage.removeItem(_s),localStorage.removeItem(ot),localStorage.removeItem(ct),localStorage.removeItem("nexus_amr_l1_quiz_answers"),localStorage.removeItem("navpro_l1_quiz_answers"))},[]),R=Math.round(s.length/t*100);return{completedLessons:s,quizScores:x,currentLessonId:T,setCurrentLessonId:N,toggleLessonComplete:P,markLessonComplete:S,recordQuizScore:I,resetProgress:k,progressPercent:R,completedCount:s.length,totalLessons:t}}function Ga({onNavigateHub:t,onSelectLesson:s,lessons:a,onOpenHelpModal:x,theme:g,onToggleTheme:T,onToggleSidebarMobile:N,currentLessonId:P}){const[S,I]=i.useState(""),[k,R]=i.useState(!1),c=i.useRef(null),r=i.useRef(null),[o,b]=i.useState(()=>{try{const E=new URLSearchParams(window.location.search);if(E.has("ppt")){const d=E.get("ppt")==="true"||E.get("ppt")==="1";return localStorage.setItem("navpro_show_ppt",d?"true":"false"),d}const C=localStorage.getItem("navpro_show_ppt");return C!==null?C==="true":(localStorage.setItem("navpro_show_ppt","true"),!0)}catch{return!0}});i.useEffect(()=>{const E=C=>{C.key==="navpro_show_ppt"&&b(C.newValue==="true")};return window.addEventListener("storage",E),()=>window.removeEventListener("storage",E)},[]),i.useEffect(()=>{const E=C=>{var d,u;C.key==="/"&&document.activeElement!==c.current?(C.preventDefault(),(d=c.current)==null||d.focus(),R(!0)):C.key==="Escape"&&(R(!1),(u=c.current)==null||u.blur())};return window.addEventListener("keydown",E),()=>window.removeEventListener("keydown",E)},[]),i.useEffect(()=>{const E=C=>{r.current&&!r.current.contains(C.target)&&R(!1)};return document.addEventListener("mousedown",E),()=>document.removeEventListener("mousedown",E)},[]);const y=S.trim()?a.filter(E=>E.title.toLowerCase().includes(S.toLowerCase())||E.num_str.includes(S)||E.focus&&E.focus.toLowerCase().includes(S.toLowerCase())).slice(0,8):[];return e.jsxs("header",{className:"app-navbar",children:[e.jsxs("div",{className:"navbar-left",children:[e.jsx("button",{className:"mobile-menu-btn",onClick:N,"aria-label":"Toggle Navigation Sidebar",children:e.jsx(ia,{size:20})}),e.jsx("a",{href:"https://botforge.in",target:"_blank",rel:"noopener noreferrer",className:"company-logo-link",title:"Botforge Robotics - botforge.in",children:e.jsx("img",{src:"assets/images/botforge_black.png",alt:"Botforge Robotics",className:"company-logo"})}),e.jsx("div",{className:"navbar-divider"}),e.jsxs("button",{onClick:t,className:"brand-link-btn",title:"Return to Level 1 Course Hub",children:[e.jsx("img",{src:"assets/images/ros2_logo.svg",alt:"ROS 2",className:"ros2-logo"}),e.jsx("div",{className:"brand-text",children:e.jsx("span",{className:"brand-badge",children:"Level 1 • ROS 2 Jazzy"})})]})]}),e.jsxs("div",{className:"navbar-center",ref:r,children:[e.jsxs("div",{className:"search-box",children:[e.jsx(la,{size:16,className:"search-icon"}),e.jsx("input",{ref:c,type:"text",placeholder:"Search lessons, nodes, topics... (Press /)",value:S,onChange:E=>{I(E.target.value),R(!0)},onFocus:()=>R(!0),className:"search-input-field"}),S&&e.jsx("button",{className:"search-clear-btn",onClick:()=>{I(""),R(!1)},children:e.jsx(Fe,{size:14})})]}),k&&S.trim()&&e.jsx("div",{className:"search-results-dropdown fade-in",children:y.length>0?y.map(E=>e.jsxs("button",{className:"search-result-item",onClick:()=>{s(E.id),R(!1),I("")},children:[e.jsx("span",{className:"search-res-num",children:E.num_str}),e.jsxs("div",{className:"search-res-info",children:[e.jsx("span",{className:"search-res-title",children:E.title}),e.jsx("span",{className:"search-res-module",children:E.module})]})]},E.id)):e.jsxs("div",{className:"search-no-results",children:['No lessons matched "',S,'"']})})]}),e.jsxs("div",{className:"navbar-right",children:[o&&e.jsxs("a",{href:`#/presentation${P?`/${P.replace("lesson_","")}`:""}`,target:"_blank",rel:"noopener noreferrer",className:"nav-action-btn ppt-btn",title:"Open Fullscreen Instructor Presentation Deck (PPT) in New Window",children:[e.jsx(vt,{size:16}),e.jsx("span",{children:"Instructor PPT"})]}),e.jsxs("a",{href:`http://${typeof window<"u"?window.location.hostname:"localhost"}:6080/vnc.html?autoconnect=true&resize=remote`,target:"_blank",rel:"noopener noreferrer",className:"nav-action-btn desktop-btn",title:"Open Ubuntu Desktop GUI via noVNC (Gazebo / RViz2 on port 6080)",children:[e.jsx(xt,{size:16}),e.jsx("span",{children:"Desktop GUI"})]}),e.jsxs("a",{href:`http://${typeof window<"u"?window.location.hostname:"localhost"}:7681`,target:"_blank",rel:"noopener noreferrer",className:"nav-action-btn terminal-btn",title:"Open Dedicated Web Terminal in New Window (Port 7681)",children:[e.jsx(ye,{size:16}),e.jsx("span",{children:"Terminal"})]}),e.jsxs("a",{href:`http://${typeof window<"u"?window.location.hostname:"localhost"}:8443/?folder=/home/student`,target:"_blank",rel:"noopener noreferrer",className:"nav-action-btn vscode-btn",title:"Open in-browser VS Code Editor on port 8443",children:[e.jsx(As,{size:16}),e.jsx("span",{children:"VS Code"})]}),e.jsxs("button",{onClick:t,className:"nav-action-btn hub-btn",title:"Course Hub Overview",children:[e.jsx(Te,{size:16}),e.jsx("span",{children:"Hub"})]}),e.jsxs("button",{onClick:x,className:"nav-action-btn help-btn",title:"Curriculum Help, Docker Reset & Storage FAQ",children:[e.jsx(os,{size:16}),e.jsx("span",{children:"Help"})]}),e.jsx("button",{onClick:T,className:"theme-toggle-btn",title:`Switch to ${g==="dark"?"Light":"Dark"} mode`,"aria-label":"Toggle Theme",children:g==="dark"?e.jsx(Es,{size:17}):e.jsx(Ts,{size:17})})]})]})}function Ba({modules:t,lessons:s,currentLessonId:a,onSelectLesson:x,onNavigateHub:g,completedLessons:T,onToggleComplete:N,quizScores:P,progressPercent:S,completedCount:I,totalLessons:k,onResetProgress:R,isOpenMobile:c,onCloseMobile:r}){const o=s.find(h=>h.id===a);o&&o.module_id;const[b,y]=i.useState({1:!0,2:!0,3:!0,4:!0,5:!0}),[E,C]=i.useState(a);i.useEffect(()=>{a&&C(a)},[a]);const d=h=>{y(p=>({...p,[h]:!p[h]}))},u=(h,p)=>{h.stopPropagation(),C(m=>m===p?null:p)},v=(h,p,m)=>{if(h.preventDefault(),h.stopPropagation(),p!==a)x(p),setTimeout(()=>{const n=document.getElementById(m);n&&n.scrollIntoView({behavior:"smooth",block:"start"})},250);else{const n=document.getElementById(m);n&&n.scrollIntoView({behavior:"smooth",block:"start"})}c&&r()};return e.jsxs(e.Fragment,{children:[c&&e.jsx("div",{className:"sidebar-backdrop",onClick:r,"aria-hidden":"true"}),e.jsxs("aside",{className:`app-sidebar ${c?"open-mobile":""}`,children:[e.jsxs("div",{className:"sidebar-progress-card",children:[e.jsxs("div",{className:"progress-card-top",children:[e.jsxs("div",{className:"progress-title-row",children:[e.jsx("span",{className:"progress-label",children:"Curriculum Progress"}),e.jsxs("span",{className:"progress-badge",children:[S,"%"]})]}),e.jsxs("span",{className:"progress-count",children:[I," of ",k," completed"]})]}),e.jsx("div",{className:"progress-bar-track",children:e.jsx("div",{className:"progress-bar-fill",style:{width:`${S}%`}})}),e.jsxs("button",{onClick:R,className:"reset-progress-btn",title:"Reset curriculum checklist",children:[e.jsx(te,{size:12}),e.jsx("span",{children:"Reset Checklist"})]})]}),e.jsxs("button",{onClick:()=>{g(),c&&r()},className:`sidebar-hub-nav-btn ${a?"":"active"}`,children:[e.jsx(Ls,{size:16}),e.jsx("span",{children:"Curriculum Hub Overview"})]}),e.jsx("div",{className:"sidebar-modules-list",children:t.map(h=>{const p=b[h.id],m=s.filter(j=>j.module_id===h.id||Number(String(j.module_id).replace(/\D/g,""))===h.id),n=m.filter(j=>T.includes(j.id)).length,l=n===m.length&&m.length>0;return e.jsxs("div",{className:"sidebar-module-section",children:[e.jsxs("button",{className:`module-header-btn ${l?"completed-module":""}`,onClick:()=>d(h.id),children:[e.jsxs("div",{className:"module-header-left",children:[p?e.jsx(tt,{size:14}):e.jsx(is,{size:14}),e.jsx("span",{className:"module-name",children:h.name})]}),e.jsxs("span",{className:"module-count-badge",children:[n,"/",m.length]})]}),p&&e.jsx("ul",{className:"sidebar-lesson-items",children:m.map(j=>{const w=j.id===a,_=T.includes(j.id),L=P[j.id];return e.jsxs("li",{children:[e.jsxs("div",{className:`sidebar-lesson-row ${w?"active":""} ${_?"completed":""}`,onClick:()=>{x(j.id),c&&r()},children:[e.jsx("button",{type:"button",className:"lesson-checkbox-btn",onClick:z=>{z.stopPropagation(),N(j.id)},title:_?"Mark incomplete":"Mark completed","aria-label":`Toggle completed for ${j.title}`,children:_?e.jsx(Me,{size:16,className:"checked-icon"}):e.jsx(bt,{size:16,className:"unchecked-icon"})}),e.jsx("span",{className:"lesson-row-num",children:j.num_str}),e.jsx("span",{className:"lesson-row-title",title:j.title,children:j.title}),L&&L.passed&&e.jsx("span",{className:"quiz-passed-star",title:`Quiz Passed: ${L.score}/${L.total}`,children:"⭐"}),j.subtopics&&j.subtopics.length>0&&e.jsx("button",{type:"button",className:"subtopic-toggle-btn",onClick:z=>u(z,j.id),title:E===j.id?"Collapse subtopics":"Expand subtopics","aria-label":"Toggle subtopics",children:E===j.id?e.jsx(tt,{size:13}):e.jsx(is,{size:13})})]}),E===j.id&&j.subtopics&&j.subtopics.length>0&&e.jsx("ul",{className:"sidebar-subtopics-list",children:j.subtopics.map(z=>e.jsx("li",{className:"sidebar-subtopic-item",children:e.jsxs("a",{href:`#${z.id}`,className:"sidebar-subtopic-link",onClick:M=>v(M,j.id,z.id),title:z.title,children:[e.jsx("span",{className:"subtopic-bullet"}),e.jsx("span",{className:"subtopic-text",children:z.title})]})},z.id))})]},j.id)})})]},h.id)})}),e.jsx("div",{className:"sidebar-feedback-nav-section",style:{marginTop:"1.25rem",paddingBottom:"1.5rem"},children:e.jsxs("button",{onClick:()=>{x("feedback"),c&&r()},className:`sidebar-feedback-nav-btn ${a==="feedback"?"active":""}`,title:"Course Feedback & Survey",children:[e.jsx(yt,{size:16,className:"feedback-nav-icon"}),e.jsxs("div",{style:{display:"flex",flexDirection:"column",overflow:"hidden"},children:[e.jsx("span",{className:"feedback-nav-title",children:"Course Feedback & Survey"}),e.jsx("span",{className:"feedback-nav-sub",style:{fontSize:"0.72rem",color:"var(--text-muted)"},children:"Share your learning experience"})]})]})})]})]})}const qa={1:ue,2:jt,3:ca,4:ft,5:Te};function Wa({modules:t,lessons:s,onSelectLesson:a,completedLessons:x,progressPercent:g,completedCount:T,totalLessons:N,studentInfo:P,onSubmitFeedback:S}){return e.jsxs("div",{className:"hub-overview-container fade-in",children:[e.jsxs("section",{className:"hub-hero-banner",children:[e.jsxs("div",{className:"hero-content",children:[e.jsxs("div",{className:"hero-badge-row",children:[e.jsx("span",{className:"badge-pill",children:"Industrial AMR Systems Engineering"}),e.jsx("span",{className:"badge-pill jazzy",children:"ROS 2 Jazzy LTS"}),e.jsx("span",{className:"badge-pill success",children:"Ubuntu 24.04"})]}),e.jsx("h1",{className:"hero-title",children:"Level 1: Zero-to-Autonomous AMR Engineer"}),e.jsx("p",{className:"hero-description",children:"Complete mastery over core ROS 2 Jazzy robotics mechanics. Learn Linux command-line engineering, peer-to-peer DDS bus architectures, differential drive kinematics, URDF digital twins, and autonomous 2D SLAM & Nav2 navigation in Gazebo Harmonic simulation."}),e.jsxs("div",{className:"hero-actions-row",children:[e.jsxs("button",{onClick:()=>a("lesson_01"),className:"hero-primary-btn",children:[e.jsx(oa,{size:17}),e.jsx("span",{children:"Start Lesson 01: Linux Basics"}),e.jsx(me,{size:16})]}),e.jsxs("a",{href:`http://${typeof window<"u"?window.location.hostname:"localhost"}:6080/vnc.html?autoconnect=true&resize=remote`,target:"_blank",rel:"noopener noreferrer",className:"hero-secondary-btn",children:[e.jsx(xt,{size:17}),e.jsx("span",{children:"Launch Desktop GUI (:6080)"})]}),e.jsxs("a",{href:`http://${typeof window<"u"?window.location.hostname:"localhost"}:7681`,target:"_blank",rel:"noopener noreferrer",className:"hero-secondary-btn",children:[e.jsx(ye,{size:17}),e.jsx("span",{children:"Web Terminal (:7681)"})]}),e.jsxs("a",{href:`http://${typeof window<"u"?window.location.hostname:"localhost"}:8443/?folder=/home/student`,target:"_blank",rel:"noopener noreferrer",className:"hero-secondary-btn",children:[e.jsx(As,{size:17}),e.jsx("span",{children:"Open VS Code (:8443)"})]})]})]}),e.jsx("div",{className:"hero-graphic",children:e.jsx("img",{src:"assets/images/ros2_logo.svg",alt:"ROS 2 Architecture",className:"hero-ros2-logo"})})]}),e.jsxs("section",{className:"hub-stats-ribbon",children:[e.jsxs("div",{className:"stat-card",children:[e.jsx("div",{className:"stat-number",children:"26"}),e.jsx("div",{className:"stat-label",children:"Hands-On Lessons"}),e.jsx("div",{className:"stat-sub",children:"Step-by-step guides"})]}),e.jsxs("div",{className:"stat-card",children:[e.jsx("div",{className:"stat-number",children:t.length}),e.jsx("div",{className:"stat-label",children:"Core Modules"}),e.jsx("div",{className:"stat-sub",children:"Middleware to Nav2"})]}),e.jsxs("div",{className:"stat-card",children:[e.jsx("div",{className:"stat-number",children:"2"}),e.jsx("div",{className:"stat-label",children:"Capstone Projects"}),e.jsx("div",{className:"stat-sub",children:"Physical & Sim AMRs"})]}),e.jsxs("div",{className:"stat-card highlight",children:[e.jsxs("div",{className:"stat-number",children:[g,"%"]}),e.jsx("div",{className:"stat-label",children:"Your Progress"}),e.jsxs("div",{className:"stat-sub",children:[T," of ",N," Completed"]})]})]}),e.jsxs("section",{className:"hub-modules-section",children:[e.jsx("div",{className:"section-header-row",children:e.jsxs("div",{children:[e.jsx("h2",{className:"section-title",children:"Curriculum Modules & Learning Track"}),e.jsx("p",{className:"section-subtitle",children:"Follow the pedagogical sequence or jump directly into specialized robotics domains:"})]})}),e.jsx("div",{className:"modules-grid",children:t.map(I=>{const k=s.filter(o=>o.module_id===I.id||Number(String(o.module_id).replace(/\D/g,""))===I.id),R=k.filter(o=>x.includes(o.id)).length,c=R===k.length&&k.length>0,r=qa[I.id]||fe;return e.jsxs("div",{className:`module-card ${c?"completed":""}`,children:[e.jsxs("div",{className:"module-card-header",children:[e.jsx("div",{className:"module-icon-wrap",children:e.jsx(r,{size:20})}),e.jsxs("div",{className:"module-title-wrap",children:[e.jsxs("span",{className:"module-meta",children:["Module ",I.id," • Lessons"," ",String(I.range[0]).padStart(2,"0"),"-",String(I.range[1]).padStart(2,"0")]}),e.jsx("h3",{className:"module-heading",children:I.name})]}),e.jsxs("span",{className:`module-status-tag ${c?"done":""}`,children:[R,"/",k.length]})]}),e.jsx("ul",{className:"module-lessons-list",children:k.map(o=>{const b=x.includes(o.id);return e.jsx("li",{children:e.jsxs("button",{className:`module-lesson-link ${b?"done":""}`,onClick:()=>a(o.id),children:[e.jsx("span",{className:"lesson-num-pill",children:o.num_str}),e.jsx("span",{className:"lesson-title-text",children:o.title}),b&&e.jsx(H,{size:14,className:"lesson-done-check"})]})},o.id)})})]},I.id)})})]}),e.jsxs("section",{className:"hub-assignments-section",children:[e.jsx("div",{className:"section-header-row",children:e.jsxs("div",{children:[e.jsx("h2",{className:"section-title",children:"💻 Hands-On Projects & Reference Solutions"}),e.jsxs("p",{className:"section-subtitle",children:["Starter templates with ",e.jsx("code",{children:"# TODO"})," exercises are mounted in your VS Code workspace (",e.jsx("code",{children:"~/ros2_ws/src/"}),"):"]})]})}),e.jsx("div",{className:"table-wrapper",children:e.jsxs("table",{className:"assignments-table",children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"Project / Milestone"}),e.jsx("th",{children:"Focus Domain"}),e.jsx("th",{children:"Student Task Template (To Fill In)"}),e.jsx("th",{children:"Reference Solution"})]})}),e.jsxs("tbody",{children:[e.jsxs("tr",{children:[e.jsxs("td",{children:[e.jsx("span",{className:"badge badge-success",style:{marginRight:"6px",fontSize:"0.7rem"},children:"Beginner"}),e.jsx("strong",{children:"Pub/Sub Chatter Task"})]}),e.jsx("td",{children:"Core String Pub/Sub (Lesson 05)"}),e.jsx("td",{children:e.jsx("code",{children:"nexus_amr_basics/m01_l05_task_custom_pubsub.py"})}),e.jsx("td",{children:e.jsx("code",{children:"nexus_amr_basics/m01_l05_solution_custom_pubsub.py"})})]}),e.jsxs("tr",{children:[e.jsxs("td",{children:[e.jsx("span",{className:"badge badge-success",style:{marginRight:"6px",fontSize:"0.7rem"},children:"Core Service"}),e.jsx("strong",{children:"AMR Speed Mode & Zone Governor"})]}),e.jsx("td",{children:"Services & RPC (Lesson 07)"}),e.jsx("td",{children:e.jsx("code",{children:"nexus_amr_basics/m02_l07_task_speed_mode_server.py"})}),e.jsx("td",{children:e.jsx("code",{children:"nexus_amr_basics/m02_l07_solution_speed_mode_server.py"})})]}),e.jsxs("tr",{children:[e.jsxs("td",{children:[e.jsx("span",{className:"badge badge-info",style:{marginRight:"6px",fontSize:"0.7rem"},children:"Capstone 1"}),e.jsx("strong",{children:"Teleop Velocity Scaler"})]}),e.jsx("td",{children:"Publishers, Subscribers & QoS"}),e.jsx("td",{children:e.jsx("code",{children:"nexus_amr_basics/m01_l05_task_teleop_speed_limiter.py"})}),e.jsx("td",{children:e.jsx("code",{children:"nexus_amr_basics/m01_l05_solution_teleop_speed_limiter.py"})})]}),e.jsxs("tr",{children:[e.jsxs("td",{children:[e.jsx("span",{className:"badge badge-info",style:{marginRight:"6px",fontSize:"0.7rem"},children:"Capstone 2"}),e.jsx("strong",{children:"Nav2 Autonomous Patrol Mission"})]}),e.jsx("td",{children:"Autonomous Navigation & Simple Commander"}),e.jsx("td",{children:e.jsx("code",{children:"nexus_amr_navigation/m04_l22_02_task_multi_waypoint_patrol.py"})}),e.jsx("td",{children:e.jsx("code",{children:"nexus_amr_navigation/m04_l22_03_solution_multi_waypoint_patrol.py"})})]})]})]})}),e.jsxs("div",{className:"mock-callout-card",children:[e.jsxs("div",{className:"mock-callout-header",children:[e.jsx(de,{size:20,className:"mock-icon"}),e.jsx("h4",{children:"Companion Mock Data Simulator Node"})]}),e.jsx("p",{children:"When completing assignments, test your node logic immediately without waiting for heavy Gazebo simulations. Run the companion mock telemetry publisher in any terminal:"}),e.jsxs("div",{className:"code-container",style:{margin:"0.75rem 0"},children:[e.jsx("div",{className:"code-header",children:e.jsx("span",{className:"code-lang-tag",children:"BASH"})}),e.jsx("pre",{children:e.jsx("code",{children:"ros2 run nexus_amr_basics mock_telemetry_provider"})})]}),e.jsxs("span",{className:"mock-detail",children:["Simulates ",e.jsx("code",{children:"/battery_voltage"}),","," ",e.jsx("code",{children:"/battery_status"}),", ",e.jsx("code",{children:"/obstacle_distance"}),", and"," ",e.jsx("code",{children:"/wheel_speeds"}),"."]})]})]})]})}const Is="nexus_amr_l1_quiz_answers",Ua="navpro_l1_quiz_answers",ws=t=>{try{const s=localStorage.getItem(Is)||localStorage.getItem(Ua);return(s?JSON.parse(s):{})[t]||{}}catch{return{}}},dt=(t,s)=>{try{const a=localStorage.getItem(Is),x=a?JSON.parse(a):{};s&&Object.keys(s).length>0?x[t]=s:delete x[t],localStorage.setItem(Is,JSON.stringify(x))}catch(a){console.error("Failed to save quiz answers",a)}};function Ha({lessonId:t,quizzes:s,savedScore:a,onRecordScore:x}){const[g,T]=i.useState(()=>ws(t)),[N,P]=i.useState(()=>{const r=ws(t);return!!(a&&Object.keys(r).length>0)}),[S,I]=i.useState(a||null);if(i.useEffect(()=>{const r=ws(t);T(r);const o=Object.keys(r).length>0;P(!!(a&&o)),I(a||null)},[t]),i.useEffect(()=>{a&&I(a)},[a]),!s||s.length===0)return null;const k=(r,o)=>{N||T(b=>{const y={...b,[r]:o};return dt(t,y),y})},R=r=>{if(r.preventDefault(),N)return;let o=0;s.forEach((y,E)=>{g[E]===y.correct&&(o+=1)});const b={score:o,total:s.length,passed:o===s.length,timestamp:Date.now()};P(!0),I(b),dt(t,g),x(t,o,s.length)},c=s.length>0&&Object.keys(g).length===s.length;return e.jsxs("div",{className:"quiz-container-card",children:[e.jsxs("div",{className:"quiz-header",children:[e.jsxs("div",{className:"quiz-header-title",children:[e.jsx(os,{size:22,className:"quiz-badge-icon"}),e.jsxs("div",{children:[e.jsx("h3",{children:"Knowledge Check • Quick Quiz"}),e.jsxs("span",{className:"quiz-subtitle",children:["Verify your understanding of this lesson's core concepts (",s.length," questions)"]})]})]}),S&&e.jsxs("div",{className:`quiz-score-badge ${S.passed?"passed":"review"}`,children:[e.jsx(Ps,{size:16}),e.jsxs("span",{children:[S.score," / ",S.total," (",Math.round(S.score/S.total*100),"%)"]})]})]}),e.jsxs("form",{onSubmit:R,className:"quiz-form",children:[s.map((r,o)=>{const b=g[o],y=N&&b===r.correct;return e.jsxs("div",{className:`quiz-question-block ${N?y?"correct-block":"incorrect-block":""}`,children:[e.jsxs("div",{className:"question-prompt",children:[e.jsxs("span",{className:"q-number",children:["Q",o+1,"."]}),e.jsx("span",{className:"q-text",children:r.prompt})]}),e.jsx("div",{className:"question-options",children:r.options.map((E,C)=>{const d=b===C,u=C===r.correct;let v="quiz-option-label";return N?(v+=" submitted",u?(v+=" correct-option",d&&(v+=" user-selected")):d?v+=" wrong-option user-selected":v+=" unselected-dimmed"):d&&(v+=" selected-option"),e.jsxs("label",{className:v,children:[e.jsx("input",{type:"radio",name:`question_${o}`,checked:d,onChange:()=>k(o,C),disabled:N}),e.jsx("span",{className:"option-text",children:E}),N&&e.jsxs(e.Fragment,{children:[u&&d&&e.jsxs("span",{className:"quiz-choice-badge correct",children:[e.jsx(at,{size:14})," Your Answer • Correct"]}),u&&!d&&e.jsxs("span",{className:"quiz-choice-badge correct-answer",children:[e.jsx(at,{size:14})," Correct Answer"]}),!u&&d&&e.jsxs("span",{className:"quiz-choice-badge wrong",children:[e.jsx(Oe,{size:14})," Your Answer • Incorrect"]})]})]},C)})}),N&&e.jsxs("div",{className:`quiz-explanation-box ${y?"exp-correct":"exp-wrong"}`,children:[e.jsx("strong",{children:y?"✅ Correct Explanation:":"💡 Key Concept:"}),e.jsx("p",{children:r.explanation})]})]},r.id||o)}),e.jsx("div",{className:"quiz-actions-footer",children:N?e.jsx("div",{className:"quiz-result-row",children:e.jsx("span",{className:"result-text",children:S!=null&&S.passed?"🎉 Outstanding! You passed this lesson check.":"Review the key concepts and explanations above."})}):e.jsxs("button",{type:"submit",disabled:!c,className:`quiz-submit-btn ${c?"":"disabled"}`,children:[e.jsx(ce,{size:15}),e.jsx("span",{children:c?"Submit Quiz Answers":`Answer All Questions (${Object.keys(g).length}/${s.length})`})]})})]})]})}function kt(){const[t,s]=i.useState("-"),[a,x]=i.useState({r:!0,w:!0,x:!0}),[g,T]=i.useState({r:!0,w:!1,x:!0}),[N,P]=i.useState({r:!0,w:!1,x:!0}),[S,I]=i.useState(!1),[k,R]=i.useState(null),c=(a.r?4:0)+(a.w?2:0)+(a.x?1:0),r=(g.r?4:0)+(g.w?2:0)+(g.x?1:0),o=(N.r?4:0)+(N.w?2:0)+(N.x?1:0),b=`${c}${r}${o}`,y=[{label:"Type",val:t,desc:t==="d"?"Directory":"Regular File",color:"#64748b"},{label:"u:r",val:a.r?"r":"-",desc:"User Read (4)",color:"#10b981",active:a.r},{label:"u:w",val:a.w?"w":"-",desc:"User Write (2)",color:"#10b981",active:a.w},{label:"u:x",val:a.x?"x":"-",desc:"User Execute (1)",color:"#10b981",active:a.x},{label:"g:r",val:g.r?"r":"-",desc:"Group Read (4)",color:"#0284c7",active:g.r},{label:"g:w",val:g.w?"w":"-",desc:"Group Write (2)",color:"#0284c7",active:g.w},{label:"g:x",val:g.x?"x":"-",desc:"Group Execute (1)",color:"#0284c7",active:g.x},{label:"o:r",val:N.r?"r":"-",desc:"Others Read (4)",color:"#8b5cf6",active:N.r},{label:"o:w",val:N.w?"w":"-",desc:"Others Write (2)",color:"#8b5cf6",active:N.w},{label:"o:x",val:N.x?"x":"-",desc:"Others Execute (1)",color:"#8b5cf6",active:N.x}],E=y.map(h=>h.val).join(""),C=`chmod ${b} sensor_diagnostics.sh`,d=(h,p,m)=>{R(m),setTimeout(()=>R(null),400),h==="user"?x(n=>({...n,[p]:!n[p]})):h==="group"?T(n=>({...n,[p]:!n[p]})):h==="others"&&P(n=>({...n,[p]:!n[p]}))},u=(h,p,m,n=!1)=>{x(h),T(p),P(m),s(n?"d":"-")},v=()=>{navigator.clipboard.writeText(C).then(()=>{I(!0),setTimeout(()=>I(!1),2e3)})};return e.jsxs("div",{className:"perm-calc-card",children:[e.jsxs("div",{className:"perm-calc-header",children:[e.jsxs("div",{className:"perm-calc-title-row",children:[e.jsxs("div",{className:"perm-calc-badge",children:[e.jsx(be,{size:16}),e.jsx("span",{children:"Interactive Simulator"})]}),e.jsx("h3",{className:"perm-calc-title",children:"Linux Permission String & Octal Visualizer"})]}),e.jsx("p",{className:"perm-calc-subtitle",children:"Toggle the checkboxes below to see in real time how Linux parses read, write, and execute bits into the 10-character permission string and octal numbers."})]}),e.jsxs("div",{className:"perm-display-container",children:[e.jsx("div",{className:"perm-display-label",children:"Active Linux Permission String:"}),e.jsx("div",{className:"perm-string-row",children:y.map((h,p)=>e.jsxs("div",{className:`perm-char-pill ${k===p?"pulse-anim":""} ${h.active!==!1?"active-bit":"inactive-bit"}`,style:{borderColor:h.active!==!1?h.color:"var(--border-color)",color:h.active!==!1?h.color:"var(--text-muted)"},title:h.desc,children:[e.jsx("span",{className:"char-val",children:h.val}),e.jsx("span",{className:"char-sub",children:h.label})]},p))}),e.jsxs("div",{className:"perm-legend-row",children:[e.jsxs("div",{className:"legend-chip file-chip",children:[e.jsx("span",{className:"dot",style:{background:"#64748b"}}),e.jsxs("span",{children:["Type: ",e.jsx("code",{children:t==="d"?"Directory (d)":"File (-)"})]})]}),e.jsxs("div",{className:"legend-chip user-chip",children:[e.jsx("span",{className:"dot",style:{background:"#10b981"}}),e.jsxs("span",{children:["User/Owner: ",e.jsxs("code",{children:[c," (",y.slice(1,4).map(h=>h.val).join(""),")"]})]})]}),e.jsxs("div",{className:"legend-chip group-chip",children:[e.jsx("span",{className:"dot",style:{background:"#0284c7"}}),e.jsxs("span",{children:["Group: ",e.jsxs("code",{children:[r," (",y.slice(4,7).map(h=>h.val).join(""),")"]})]})]}),e.jsxs("div",{className:"legend-chip others-chip",children:[e.jsx("span",{className:"dot",style:{background:"#8b5cf6"}}),e.jsxs("span",{children:["Others: ",e.jsxs("code",{children:[o," (",y.slice(7,10).map(h=>h.val).join(""),")"]})]})]})]})]}),e.jsxs("div",{className:"perm-command-bar",children:[e.jsxs("div",{className:"octal-score-box",children:[e.jsx("span",{className:"octal-score-label",children:"Octal Mode:"}),e.jsx("span",{className:"octal-score-number",children:b})]}),e.jsxs("div",{className:"command-display-box",children:[e.jsx("span",{className:"command-prompt",children:"$"}),e.jsx("code",{className:"command-text",children:C})]}),e.jsxs("button",{onClick:v,className:`copy-cmd-btn ${S?"copied":""}`,title:"Copy command to clipboard",children:[S?e.jsx(he,{size:16}):e.jsx($e,{size:16}),e.jsx("span",{children:S?"Copied!":"Copy"})]})]}),e.jsxs("div",{className:"perm-columns-grid",children:[e.jsxs("div",{className:"perm-col user-col",children:[e.jsxs("div",{className:"perm-col-header",style:{borderLeftColor:"#10b981"},children:[e.jsxs("div",{className:"col-header-top",children:[e.jsx("span",{className:"col-badge",style:{background:"#ecfdf5",color:"#059669"},children:"u (User / Owner)"}),e.jsxs("span",{className:"col-sum",style:{color:"#059669"},children:["= ",c]})]}),e.jsx("p",{className:"col-desc",children:"The student or process who created the file"})]}),e.jsxs("div",{className:"checkbox-list",children:[e.jsxs("label",{className:`perm-check-item ${a.r?"checked":""}`,children:[e.jsx("input",{type:"checkbox",checked:a.r,onChange:()=>d("user","r",1)}),e.jsxs("span",{className:"check-text",children:[e.jsx("strong",{children:"Read (r)"}),e.jsx("span",{className:"math-badge",children:"+4"})]}),e.jsx("span",{className:"hint-text",children:"View & cat file"})]}),e.jsxs("label",{className:`perm-check-item ${a.w?"checked":""}`,children:[e.jsx("input",{type:"checkbox",checked:a.w,onChange:()=>d("user","w",2)}),e.jsxs("span",{className:"check-text",children:[e.jsx("strong",{children:"Write (w)"}),e.jsx("span",{className:"math-badge",children:"+2"})]}),e.jsx("span",{className:"hint-text",children:"Edit, modify, delete"})]}),e.jsxs("label",{className:`perm-check-item ${a.x?"checked":""}`,children:[e.jsx("input",{type:"checkbox",checked:a.x,onChange:()=>d("user","x",3)}),e.jsxs("span",{className:"check-text",children:[e.jsx("strong",{children:"Execute (x)"}),e.jsx("span",{className:"math-badge",children:"+1"})]}),e.jsx("span",{className:"hint-text",children:"Run as executable"})]})]})]}),e.jsxs("div",{className:"perm-col group-col",children:[e.jsxs("div",{className:"perm-col-header",style:{borderLeftColor:"#0284c7"},children:[e.jsxs("div",{className:"col-header-top",children:[e.jsx("span",{className:"col-badge",style:{background:"#f0f9ff",color:"#0284c7"},children:"g (Group)"}),e.jsxs("span",{className:"col-sum",style:{color:"#0284c7"},children:["= ",r]})]}),e.jsx("p",{className:"col-desc",children:"Members of the student's assigned Linux usergroup"})]}),e.jsxs("div",{className:"checkbox-list",children:[e.jsxs("label",{className:`perm-check-item ${g.r?"checked":""}`,children:[e.jsx("input",{type:"checkbox",checked:g.r,onChange:()=>d("group","r",4)}),e.jsxs("span",{className:"check-text",children:[e.jsx("strong",{children:"Read (r)"}),e.jsx("span",{className:"math-badge",children:"+4"})]}),e.jsx("span",{className:"hint-text",children:"View contents"})]}),e.jsxs("label",{className:`perm-check-item ${g.w?"checked":""}`,children:[e.jsx("input",{type:"checkbox",checked:g.w,onChange:()=>d("group","w",5)}),e.jsxs("span",{className:"check-text",children:[e.jsx("strong",{children:"Write (w)"}),e.jsx("span",{className:"math-badge",children:"+2"})]}),e.jsx("span",{className:"hint-text",children:"Modify file"})]}),e.jsxs("label",{className:`perm-check-item ${g.x?"checked":""}`,children:[e.jsx("input",{type:"checkbox",checked:g.x,onChange:()=>d("group","x",6)}),e.jsxs("span",{className:"check-text",children:[e.jsx("strong",{children:"Execute (x)"}),e.jsx("span",{className:"math-badge",children:"+1"})]}),e.jsx("span",{className:"hint-text",children:"Run program"})]})]})]}),e.jsxs("div",{className:"perm-col others-col",children:[e.jsxs("div",{className:"perm-col-header",style:{borderLeftColor:"#8b5cf6"},children:[e.jsxs("div",{className:"col-header-top",children:[e.jsx("span",{className:"col-badge",style:{background:"#f5f3ff",color:"#7c3aed"},children:"o (Others / World)"}),e.jsxs("span",{className:"col-sum",style:{color:"#7c3aed"},children:["= ",o]})]}),e.jsx("p",{className:"col-desc",children:"Any other user account or service on the robot"})]}),e.jsxs("div",{className:"checkbox-list",children:[e.jsxs("label",{className:`perm-check-item ${N.r?"checked":""}`,children:[e.jsx("input",{type:"checkbox",checked:N.r,onChange:()=>d("others","r",7)}),e.jsxs("span",{className:"check-text",children:[e.jsx("strong",{children:"Read (r)"}),e.jsx("span",{className:"math-badge",children:"+4"})]}),e.jsx("span",{className:"hint-text",children:"View contents"})]}),e.jsxs("label",{className:`perm-check-item ${N.w?"checked":""}`,children:[e.jsx("input",{type:"checkbox",checked:N.w,onChange:()=>d("others","w",8)}),e.jsxs("span",{className:"check-text",children:[e.jsx("strong",{children:"Write (w)"}),e.jsx("span",{className:"math-badge",children:"+2"})]}),e.jsx("span",{className:"hint-text",children:"Modify file"})]}),e.jsxs("label",{className:`perm-check-item ${N.x?"checked":""}`,children:[e.jsx("input",{type:"checkbox",checked:N.x,onChange:()=>d("others","x",9)}),e.jsxs("span",{className:"check-text",children:[e.jsx("strong",{children:"Execute (x)"}),e.jsx("span",{className:"math-badge",children:"+1"})]}),e.jsx("span",{className:"hint-text",children:"Run program"})]})]})]})]}),e.jsxs("div",{className:"perm-presets-row",children:[e.jsx("span",{className:"presets-label",children:"⚡ Common Robotics Presets:"}),e.jsxs("div",{className:"preset-buttons",children:[e.jsxs("button",{type:"button",className:`preset-btn ${b==="755"?"active":""}`,onClick:()=>u({r:!0,w:!0,x:!0},{r:!0,w:!1,x:!0},{r:!0,w:!1,x:!0}),children:[e.jsx("strong",{children:"755"})," (ROS Node / Script)"]}),e.jsxs("button",{type:"button",className:`preset-btn ${b==="644"?"active":""}`,onClick:()=>u({r:!0,w:!0,x:!1},{r:!0,w:!1,x:!1},{r:!0,w:!1,x:!1}),children:[e.jsx("strong",{children:"644"})," (Config / YAML / Read)"]}),e.jsxs("button",{type:"button",className:`preset-btn ${b==="700"?"active":""}`,onClick:()=>u({r:!0,w:!0,x:!0},{r:!1,w:!1,x:!1},{r:!1,w:!1,x:!1}),children:[e.jsx("strong",{children:"700"})," (Private Script / SSH)"]}),e.jsxs("button",{type:"button",className:`preset-btn ${b==="600"?"active":""}`,onClick:()=>u({r:!0,w:!0,x:!1},{r:!1,w:!1,x:!1},{r:!1,w:!1,x:!1}),children:[e.jsx("strong",{children:"600"})," (Private Secret / Key)"]}),e.jsxs("button",{type:"button",className:`preset-btn danger ${b==="777"?"active":""}`,onClick:()=>u({r:!0,w:!0,x:!0},{r:!0,w:!0,x:!0},{r:!0,w:!0,x:!0}),children:[e.jsx("strong",{children:"777"})," (Full Access - Insecure!)"]})]})]}),e.jsxs("div",{className:"perm-terminal-simulator",children:[e.jsxs("div",{className:"terminal-header",children:[e.jsxs("div",{className:"terminal-dots",children:[e.jsx("span",{className:"dot red"}),e.jsx("span",{className:"dot yellow"}),e.jsx("span",{className:"dot green"})]}),e.jsx("span",{className:"terminal-title",children:"Terminal Execution Test: ~/robotics_lab/scripts/sensor_diagnostics.sh"})]}),e.jsxs("div",{className:"terminal-body",children:[e.jsxs("div",{className:"terminal-line",children:[e.jsx("span",{className:"term-prompt",children:"student@nexus-amr:~/robotics_lab/scripts$"}),e.jsx("span",{className:"term-cmd",children:"ls -l sensor_diagnostics.sh"})]}),e.jsxs("div",{className:"terminal-output ls-output",children:[e.jsx("span",{style:{color:"#38bdf8"},children:E})," 1 student student 1420 Oct 14 10:00 sensor_diagnostics.sh"]}),e.jsxs("div",{className:"terminal-line",style:{marginTop:"8px"},children:[e.jsx("span",{className:"term-prompt",children:"student@nexus-amr:~/robotics_lab/scripts$"}),e.jsx("span",{className:"term-cmd",children:"./sensor_diagnostics.sh"})]}),a.x?e.jsxs("div",{className:"terminal-output exec-success",children:[e.jsxs("div",{className:"status-badge-row",children:[e.jsx(H,{size:16,className:"text-success"}),e.jsx("strong",{className:"text-success",children:"[EXECUTION GRANTED - Exit Code 0]"})]}),e.jsxs("p",{className:"output-msg",children:["==========================================",e.jsx("br",{}),"      ROBOT SENSOR PRE-FLIGHT CHECK",e.jsx("br",{}),"==========================================",e.jsx("br",{}),"All host AMR motor controllers and LiDAR sensors operating normally!"]})]}):e.jsxs("div",{className:"terminal-output exec-denied",children:[e.jsxs("div",{className:"status-badge-row",children:[e.jsx(Oe,{size:16,className:"text-danger"}),e.jsx("strong",{className:"text-danger",children:"bash: ./sensor_diagnostics.sh: Permission denied (Exit Code 126)"})]}),e.jsxs("p",{className:"output-tip",children:["💡 ",e.jsx("strong",{children:"Why this happens:"})," The Owner Execute bit (",e.jsx("code",{children:"x"}),") is unchecked! Linux blocks script execution to protect the system. Run ",e.jsx("code",{children:"chmod +x sensor_diagnostics.sh"})," (or toggle Execute above) to fix this."]})]})]})]})]})}function Et(){const t=i.useRef(null),[s,a]=i.useState("auto"),[x,g]=i.useState(!0),[T,N]=i.useState(2),[P,S]=i.useState(1.8),[I,k]=i.useState(null),[R,c]=i.useState(42),[r,o]=i.useState("CIRCULAR_DRIVE"),b=i.useRef({x:180,y:120,theta:0,trail:[]}),y=()=>{b.current={x:180,y:120,theta:0,trail:[]},N(0),S(0),o("POSE_RESET")},E=()=>{b.current.trail=[],o("INK_CLEARED")};i.useEffect(()=>{const d=v=>{let h=null,p=0,m=0;if(v.key==="ArrowUp"?(h="UP",p=2,m=0):v.key==="ArrowDown"?(h="DOWN",p=-2,m=0):v.key==="ArrowLeft"?(h="LEFT",p=0,m=2.2):v.key==="ArrowRight"&&(h="RIGHT",p=0,m=-2.2),h){v.preventDefault(),a("manual"),k(h),N(p),S(m),c(j=>j+1),o(`KEY_${h}`);const n=b.current,l=.18;n.theta+=m*l,n.x+=p*Math.cos(n.theta)*12,n.y+=p*Math.sin(n.theta)*12,n.x=Math.max(20,Math.min(340,n.x)),n.y=Math.max(20,Math.min(220,n.y)),n.trail.push({x:n.x,y:n.y}),n.trail.length>300&&n.trail.shift()}},u=v=>{["ArrowUp","ArrowDown","ArrowLeft","ArrowRight"].includes(v.key)&&k(null)};return window.addEventListener("keydown",d),window.addEventListener("keyup",u),()=>{window.removeEventListener("keydown",d),window.removeEventListener("keyup",u)}},[]);const C=d=>{a("manual");let u=0,v=0;d==="UP"?(u=2,v=0):d==="DOWN"?(u=-2,v=0):d==="LEFT"?(u=0,v=2.2):d==="RIGHT"&&(u=0,v=-2.2),k(d),N(u),S(v),c(m=>m+1),o(`BUTTON_${d}`);const h=b.current,p=.22;h.theta+=v*p,h.x+=u*Math.cos(h.theta)*14,h.y+=u*Math.sin(h.theta)*14,h.x=Math.max(20,Math.min(340,h.x)),h.y=Math.max(20,Math.min(220,h.y)),h.trail.push({x:h.x,y:h.y}),h.trail.length>300&&h.trail.shift(),setTimeout(()=>k(null),250)};return i.useEffect(()=>{let d,u=performance.now();const v=h=>{const p=(h-u)/1e3;if(u=h,s==="auto"&&x){const n=b.current,l=1.6,j=Math.sin(h*.0018)*2.2;N(l),S(Number(j.toFixed(2))),o("AUTO_PATROL"),n.theta+=j*p,n.x+=l*Math.cos(n.theta)*35*p,n.y+=l*Math.sin(n.theta)*35*p,n.x<15&&(n.x=345),n.x>345&&(n.x=15),n.y<15&&(n.y=225),n.y>225&&(n.y=15),n.trail.push({x:n.x,y:n.y}),n.trail.length>250&&n.trail.shift(),Math.random()<.2&&c(w=>w+1)}const m=t.current;if(m){const n=m.getContext("2d"),l=m.width,j=m.height;n.fillStyle="#0f172a",n.fillRect(0,0,l,j),n.strokeStyle="rgba(255, 255, 255, 0.04)",n.lineWidth=1;for(let _=0;_<l;_+=30)n.beginPath(),n.moveTo(_,0),n.lineTo(_,j),n.stroke();for(let _=0;_<j;_+=30)n.beginPath(),n.moveTo(0,_),n.lineTo(l,_),n.stroke();const w=b.current;if(w.trail.length>1){n.beginPath(),n.moveTo(w.trail[0].x,w.trail[0].y);for(let _=1;_<w.trail.length;_++)n.lineTo(w.trail[_].x,w.trail[_].y);n.strokeStyle="#38bdf8",n.lineWidth=3.5,n.lineCap="round",n.lineJoin="round",n.shadowColor="rgba(56, 189, 248, 0.6)",n.shadowBlur=8,n.stroke(),n.shadowBlur=0}n.save(),n.translate(w.x,w.y),n.rotate(w.theta),n.beginPath(),n.arc(0,0,14,0,Math.PI*2),n.fillStyle="rgba(16, 185, 129, 0.2)",n.fill(),n.beginPath(),n.ellipse(0,0,12,10,0,0,Math.PI*2),n.fillStyle="#10b981",n.fill(),n.strokeStyle="#34d399",n.lineWidth=2,n.stroke(),n.beginPath(),n.arc(0,0,5,0,Math.PI*2),n.strokeStyle="rgba(255, 255, 255, 0.4)",n.stroke(),n.beginPath(),n.arc(12,0,5,0,Math.PI*2),n.fillStyle="#34d399",n.fill(),n.beginPath(),n.moveTo(14,0),n.lineTo(24,0),n.strokeStyle="#f59e0b",n.lineWidth=2,n.stroke(),n.fillStyle="#059669",n.fillRect(4,-13,6,4),n.fillRect(4,9,6,4),n.fillRect(-10,-12,5,3),n.fillRect(-10,9,5,3),n.restore()}d=requestAnimationFrame(v)};return d=requestAnimationFrame(v),()=>cancelAnimationFrame(d)},[s,x]),e.jsxs("div",{className:"turtlesim-flow-container",children:[e.jsxs("div",{className:"turtlesim-flow-header",children:[e.jsxs("div",{className:"flow-header-left",children:[e.jsxs("div",{className:"flow-status-pill",children:[e.jsx("span",{className:"flow-pulse-dot"}),e.jsx("strong",{children:"LIVE COMPUTATIONAL GRAPH"})]}),e.jsx("h3",{className:"flow-title",children:"ROS 2 Peer-to-Peer DDS Runtime Pipeline"}),e.jsxs("p",{className:"flow-subtitle",children:["Observe velocity packets emitted from ",e.jsx("code",{className:"inline-code",children:"turtle_teleop_key"})," to ",e.jsx("code",{className:"inline-code",children:"turtlesim_node"})," over ",e.jsx("code",{className:"inline-code",children:"/turtle1/cmd_vel"}),"."]})]}),e.jsxs("div",{className:"flow-header-controls",children:[e.jsxs("button",{onClick:()=>a(s==="auto"?"manual":"auto"),className:`flow-ctrl-btn ${s==="auto"?"active-auto":""}`,title:"Toggle between Auto-Pilot Demo and Interactive Keyboard Mode",children:[e.jsx(Be,{size:14}),e.jsx("span",{children:s==="auto"?"Auto Demo Active":"Manual Mode"})]}),s==="auto"&&e.jsx("button",{onClick:()=>g(!x),className:"flow-ctrl-btn",title:x?"Pause auto demo":"Resume auto demo",children:x?e.jsx(zs,{size:14}):e.jsx(cs,{size:14})}),e.jsxs("button",{onClick:E,className:"flow-ctrl-btn",title:"Clear canvas ink trail (ros2 service call /clear)",children:[e.jsx(da,{size:14}),e.jsx("span",{children:"Clear Ink"})]}),e.jsxs("button",{onClick:y,className:"flow-ctrl-btn",title:"Reset turtle pose (ros2 service call /reset)",children:[e.jsx(te,{size:14}),e.jsx("span",{children:"Reset"})]})]})]}),e.jsxs("div",{className:"turtlesim-diagram-grid",children:[e.jsxs("div",{className:"flow-node-card publisher-card",children:[e.jsxs("div",{className:"node-card-badge publisher-badge",children:[e.jsx(ye,{size:14}),e.jsx("span",{children:"PUBLISHER NODE"})]}),e.jsx("h4",{className:"node-name",children:"/teleop_turtle"}),e.jsx("span",{className:"node-exec-label",children:"ros2 run turtlesim turtle_teleop_key"}),e.jsxs("div",{className:"teleop-arrow-pad-container",children:[e.jsx("div",{className:"teleop-pad-label",children:"Arrow Keys Input Teleoperation:"}),e.jsxs("div",{className:"teleop-pad-grid",children:[e.jsx("div",{}),e.jsx("button",{className:`pad-btn ${I==="UP"?"active":""}`,onClick:()=>C("UP"),title:"Forward (+Linear X)",children:e.jsx(Nt,{size:16})}),e.jsx("div",{}),e.jsx("button",{className:`pad-btn ${I==="LEFT"?"active":""}`,onClick:()=>C("LEFT"),title:"Turn Left (+Angular Z)",children:e.jsx(Ee,{size:16})}),e.jsx("button",{className:`pad-btn ${I==="DOWN"?"active":""}`,onClick:()=>C("DOWN"),title:"Backward (-Linear X)",children:e.jsx(_t,{size:16})}),e.jsx("button",{className:`pad-btn ${I==="RIGHT"?"active":""}`,onClick:()=>C("RIGHT"),title:"Turn Right (-Angular Z)",children:e.jsx(me,{size:16})})]}),e.jsx("div",{className:"key-hint",children:"💡 Use onscreen buttons or your physical arrow keys"})]}),e.jsxs("div",{className:"node-status-row",children:[e.jsx("span",{className:"status-indicator publishing"}),e.jsxs("span",{children:["Publishing ",e.jsx("strong",{style:{color:"#c084fc"},children:"geometry_msgs/msg/Twist"})]})]})]}),e.jsxs("div",{className:"flow-topic-connector",children:[e.jsxs("div",{className:"topic-header-pill",children:[e.jsx(de,{size:13,className:"radio-pulse-icon"}),e.jsx("span",{children:"ROS 2 TOPIC"})]}),e.jsx("div",{className:"topic-pipe-container",children:e.jsxs("div",{className:"topic-pipe-track",children:[e.jsx("div",{className:"pipe-packet packet-1",children:e.jsx("span",{children:"Twist"})}),e.jsx("div",{className:"pipe-packet packet-2",children:e.jsx("span",{children:"Twist"})}),e.jsx("div",{className:"pipe-packet packet-3",children:e.jsx("span",{children:"Twist"})})]})}),e.jsxs("div",{className:"topic-metadata-card",children:[e.jsxs("div",{className:"topic-name-row",children:[e.jsx("strong",{className:"topic-name",children:"/turtle1/cmd_vel"}),e.jsx("span",{className:"topic-type-tag",children:"Twist"})]}),e.jsxs("div",{className:"topic-telemetry-box",children:[e.jsxs("div",{className:"telemetry-line",children:[e.jsx("span",{className:"telemetry-label",children:"linear.x:"}),e.jsxs("span",{className:"telemetry-val linear",children:[T>0?`+${T.toFixed(1)}`:T.toFixed(1)," m/s"]})]}),e.jsxs("div",{className:"telemetry-line",children:[e.jsx("span",{className:"telemetry-label",children:"angular.z:"}),e.jsxs("span",{className:"telemetry-val angular",children:[P>0?`+${P.toFixed(1)}`:P.toFixed(1)," rad/s"]})]}),e.jsxs("div",{className:"telemetry-line sub-line",children:[e.jsx("span",{className:"telemetry-label",children:"rate:"}),e.jsx("span",{className:"telemetry-rate",children:"~10.0 Hz"})]})]}),e.jsxs("div",{className:"topic-packet-counter",children:[e.jsxs("span",{children:["Transmitted: ",e.jsx("strong",{children:R})," msgs"]}),e.jsx("span",{className:"status-live",children:"DDS OK"})]})]})]}),e.jsxs("div",{className:"flow-node-card subscriber-card",children:[e.jsxs("div",{className:"node-card-badge subscriber-badge",children:[e.jsx(H,{size:14}),e.jsx("span",{children:"SUBSCRIBER & SIMULATOR"})]}),e.jsx("h4",{className:"node-name",children:"/turtlesim"}),e.jsx("span",{className:"node-exec-label",children:"ros2 run turtlesim turtlesim_node"}),e.jsxs("div",{className:"turtlesim-canvas-wrapper",children:[e.jsx("canvas",{ref:t,width:360,height:220,className:"turtlesim-canvas"}),e.jsx("div",{className:"canvas-watermark",children:"Qt5 Canvas • /turtle1/pose"})]}),e.jsxs("div",{className:"canvas-pose-telemetry",children:[e.jsxs("span",{children:["x: ",e.jsx("strong",{children:(b.current.x/32).toFixed(2)})]}),e.jsxs("span",{children:["y: ",e.jsx("strong",{children:(b.current.y/32).toFixed(2)})]}),e.jsxs("span",{children:["theta: ",e.jsxs("strong",{children:[b.current.theta.toFixed(2)," rad"]})]})]})]})]}),e.jsxs("div",{className:"flow-cli-introspection-bar",children:[e.jsx("span",{className:"cli-badge",children:"CLI VERIFICATION:"}),e.jsx("code",{className:"cli-command",children:"ros2 node info /turtlesim"}),e.jsx("span",{className:"cli-sep",children:"→"}),e.jsxs("span",{className:"cli-result",children:["Subscribers: ",e.jsx("strong",{style:{color:"#38bdf8"},children:"/turtle1/cmd_vel [geometry_msgs/msg/Twist]"})]})]})]})}function Tt(){const[t,s]=i.useState("setup_py"),[a,x]=i.useState(0),[g,T]=i.useState(null),N=(R,c)=>{navigator.clipboard.writeText(R),T(c),setTimeout(()=>T(null),2e3)},P=()=>{x(R=>R>=4?0:R+1)},S=[{id:"package_xml",name:"package.xml",path:"nexus_amr_controller/package.xml",title:"Package Manifest & Dependency Declarations",badge:"Format 3 XML",badgeColor:"#f59e0b",badgeBg:"rgba(245, 158, 11, 0.12)",borderAccent:"#f59e0b",icon:pa,summary:"Declares package name, version, licensing, and all runtime & build dependencies.",purpose:"Parsed by colcon, rosdep, and package indexing tools to resolve dependency graphs.",commonPitfall:'Forgetting to add an <exec_depend> (e.g. geometry_msgs) will cause your node to crash at runtime with "ModuleNotFoundError" on other machines.',code:`<?xml version="1.0"?>
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
)`,codeLang:"python"},{id:"setup_cfg",name:"setup.cfg",path:"nexus_amr_controller/setup.cfg",title:"Script Destination Configuration",badge:"Executable Routing",badgeColor:"#10b981",badgeBg:"rgba(16, 185, 129, 0.12)",borderAccent:"#10b981",icon:fe,summary:"Forces setuptools to install executables into lib/nexus_amr_controller/ rather than global bin/.",purpose:"Enforces ROS 2 package isolation, preventing script name collisions between different packages.",commonPitfall:"Removing or corrupting setup.cfg causes colcon to install binaries into standard bin/, which breaks ros2 run resolution.",code:`[develop]
script_dir=$base/lib/nexus_amr_controller
[install]
install_scripts=$base/lib/nexus_amr_controller`,codeLang:"ini"},{id:"resource",name:"resource/nexus_amr_controller",path:"nexus_amr_controller/resource/nexus_amr_controller",title:"Ament Index Discovery Marker",badge:"Discovery Marker",badgeColor:"#c084fc",badgeBg:"rgba(192, 132, 252, 0.12)",borderAccent:"#c084fc",icon:be,summary:"An empty marker file matching the exact package name.",purpose:"Provides the token required by the Ament Index. Without it, ros2 pkg list and ros2 run will fail to discover the package.",commonPitfall:"Deleting the resource/ folder makes the package invisible to the ROS 2 ecosystem even after a successful colcon build!",code:`# An empty marker file placed inside the resource/ directory.
# Filename MUST match the package name exactly:
# resource/nexus_amr_controller

# When built, colcon installs this file into:
# install/share/ament_index/resource_index/packages/nexus_amr_controller
# This allows ROS 2 CLI commands to discover the package instantly!`,codeLang:"bash"},{id:"module_dir",name:"nexus_amr_controller/",path:"nexus_amr_controller/nexus_amr_controller/",title:"Python Package Module & Node Scripts",badge:"Node Code",badgeColor:"#0ea5e9",badgeBg:"rgba(14, 165, 233, 0.12)",borderAccent:"#0ea5e9",icon:ma,summary:"The importable Python module containing __init__.py and your custom ROS 2 Node classes.",purpose:"Where the actual robotics behavior, publisher callbacks, and subscriber logic are implemented.",commonPitfall:"Forgetting __init__.py prevents Python from recognizing this folder as a module, breaking module imports.",code:`import rclpy
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
    main()`,codeLang:"python"}],I=S.find(R=>R.id===t)||S[0],k=[{num:1,targetFile:"resource",title:"1. Ament Index Query",desc:"ros2 run queries resource_index/packages to verify nexus_amr_controller is installed."},{num:2,targetFile:"setup_cfg",title:"2. Path Resolution via setup.cfg",desc:"Checks setup.cfg to locate the package executable prefix in install/lib/nexus_amr_controller/."},{num:3,targetFile:"setup_py",title:"3. Entry Point Mapping in setup.py",desc:'Matches "motor_driver" to nexus_amr_controller.motor_driver:main in console_scripts.'},{num:4,targetFile:"module_dir",title:"4. Module Execution in Python",desc:"Imports MotorDriverNode, initializes rclpy, spins the node, and connects to the ROS graph!"}];return e.jsxs("div",{className:"package-structure-infographic",style:{background:"var(--bg-surface)",border:"1px solid var(--border-color)",borderRadius:"16px",padding:"0.85rem 1.15rem",margin:"0",boxShadow:"0 8px 30px rgba(0, 0, 0, 0.15)",position:"relative",overflow:"hidden"},children:[e.jsxs("div",{style:{display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:"12px",marginBottom:"0.75rem",paddingBottom:"0.65rem",borderBottom:"1px solid var(--border-color)"},children:[e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"12px"},children:[e.jsx("div",{style:{width:36,height:36,borderRadius:"10px",background:"linear-gradient(135deg, rgba(245, 158, 11, 0.2) 0%, rgba(56, 189, 248, 0.15) 100%)",border:"1px solid rgba(245, 158, 11, 0.35)",display:"flex",alignItems:"center",justifyContent:"center",color:"#f59e0b"},children:e.jsx(nt,{size:18})}),e.jsxs("div",{children:[e.jsxs("h3",{style:{margin:0,fontSize:"1.1rem",fontWeight:800,color:"var(--text-primary)"},children:["Anatomy of an ",e.jsx("code",{style:{color:"#38bdf8"},children:"ament_python"})," Package"]}),e.jsx("span",{style:{fontSize:"0.8rem",color:"var(--text-secondary)"},children:"The 5 essential components that transform a directory into a functional ROS 2 package"})]})]}),e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"8px"},children:[e.jsxs("button",{onClick:P,style:{display:"flex",alignItems:"center",gap:"6px",background:a>0?"linear-gradient(135deg, #0284c7 0%, #0369a1 100%)":"var(--bg-card, #0f172a)",color:a>0?"#ffffff":"var(--text-primary)",border:a>0?"1px solid #38bdf8":"1px solid var(--border-color)",borderRadius:"8px",padding:"5px 11px",fontSize:"0.78rem",fontWeight:700,cursor:"pointer",boxShadow:a>0?"0 2px 8px rgba(2, 132, 199, 0.35)":"none",transition:"all 0.2s"},children:[e.jsx(cs,{size:12,fill:a>0?"currentColor":"none"}),e.jsx("span",{children:a===0?"Trace ros2 run Execution":`Execution Step ${a}/4 (Next &rarr;)`})]}),a>0&&e.jsx("button",{onClick:()=>x(0),title:"Reset Trace",style:{display:"flex",alignItems:"center",justifyContent:"center",width:30,height:30,background:"var(--bg-primary)",color:"var(--text-secondary)",border:"1px solid var(--border-color)",borderRadius:"8px",cursor:"pointer"},children:e.jsx(te,{size:12})})]})]}),a>0&&e.jsxs("div",{style:{background:"rgba(2, 132, 199, 0.1)",border:"1px solid rgba(56, 189, 248, 0.4)",borderRadius:"10px",padding:"0.85rem 1.25rem",marginBottom:"1.5rem",display:"flex",alignItems:"center",gap:"12px"},children:[e.jsx(be,{size:20,color:"#38bdf8",style:{flexShrink:0}}),e.jsxs("div",{children:[e.jsxs("div",{style:{fontSize:"0.85rem",fontWeight:800,color:"#38bdf8",marginBottom:"2px"},children:[k[a-1].title,": ",e.jsx("code",{style:{color:"#ffffff"},children:"ros2 run nexus_amr_controller motor_driver"})]}),e.jsx("div",{style:{fontSize:"0.8rem",color:"var(--text-secondary)"},children:k[a-1].desc})]})]}),e.jsxs("div",{style:{display:"grid",gridTemplateColumns:"minmax(280px, 1fr) minmax(360px, 1.4fr)",gap:"1.5rem",alignItems:"start"},children:[e.jsxs("div",{style:{background:"var(--bg-primary)",border:"1px solid var(--border-color)",borderRadius:"12px",padding:"1.25rem"},children:[e.jsxs("div",{style:{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:"1rem",paddingBottom:"0.5rem",borderBottom:"1px solid var(--border-color)"},children:[e.jsx("span",{style:{fontSize:"0.74rem",fontWeight:800,textTransform:"uppercase",letterSpacing:"0.05em",color:"#64748b"},children:"Package Hierarchy"}),e.jsx("span",{style:{fontSize:"0.72rem",color:"var(--text-muted)"},children:"Click to inspect"})]}),e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"8px",marginBottom:"0.75rem",paddingLeft:"4px"},children:[e.jsx(nt,{size:16,color:"#38bdf8"}),e.jsx("strong",{style:{fontSize:"0.95rem",color:"var(--text-primary)",fontFamily:"monospace"},children:"nexus_amr_controller/"})]}),e.jsx("div",{style:{display:"flex",flexDirection:"column",gap:"4px"},children:S.map(R=>{const c=t===R.id,r=a>0&&k[a-1].targetFile===R.id,o=R.icon;return e.jsxs("div",{onClick:()=>s(R.id),style:{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"6px 10px",borderRadius:"8px",background:c?"rgba(56, 189, 248, 0.1)":r?"rgba(245, 158, 11, 0.15)":"transparent",border:c?"1px solid #38bdf8":r?"1px solid #f59e0b":"1px solid transparent",cursor:"pointer",transition:"all 0.2s",position:"relative"},children:[e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"8px"},children:[e.jsx(o,{size:14,color:c?R.borderAccent:"var(--text-muted)"}),e.jsx("span",{style:{fontFamily:"monospace",fontSize:"0.82rem",fontWeight:c?700:500,color:c?R.borderAccent:"var(--text-primary)"},children:R.name})]}),e.jsx("span",{style:{fontSize:"0.64rem",fontWeight:700,padding:"2px 5px",borderRadius:"4px",background:R.badgeBg,color:R.badgeColor},children:R.badge})]},R.id)})}),e.jsxs("div",{style:{marginTop:"0.65rem",padding:"7px 10px",borderRadius:"8px",background:"var(--bg-canvas, rgba(16, 185, 129, 0.08))",border:"1px solid var(--border-color)",fontSize:"0.76rem",color:"var(--text-primary)",lineHeight:1.4},children:[e.jsx("strong",{style:{color:"#10b981"},children:"The Minimum Package Requirement:"}),e.jsx("br",{}),e.jsxs("span",{style:{color:"var(--text-secondary)"},children:["A ROS 2 Python package requires at least a ",e.jsx("code",{style:{color:"#f59e0b",fontWeight:600},children:"package.xml"})," and a ",e.jsx("code",{style:{color:"#38bdf8",fontWeight:600},children:"setup.py"})," file to be buildable by colcon."]})]})]}),e.jsxs("div",{style:{background:"#090d16",border:"1px solid var(--border-color)",borderRadius:"12px",overflow:"hidden"},children:[e.jsxs("div",{style:{padding:"0.65rem 1rem",background:"rgba(15, 23, 42, 0.8)",borderBottom:"1px solid var(--border-color)",display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:"8px"},children:[e.jsx("div",{style:{display:"flex",alignItems:"center",gap:"8px"},children:e.jsx("span",{style:{fontFamily:"monospace",fontSize:"0.84rem",fontWeight:800,color:I.borderAccent},children:I.path})}),e.jsxs("button",{onClick:()=>N(I.code,I.id),style:{display:"flex",alignItems:"center",gap:"4px",background:"rgba(255, 255, 255, 0.08)",border:"1px solid rgba(255, 255, 255, 0.15)",borderRadius:"6px",padding:"3px 7px",fontSize:"0.7rem",color:g===I.id?"#10b981":"#cbd5e1",cursor:"pointer"},children:[g===I.id?e.jsx(he,{size:12}):e.jsx($e,{size:12}),e.jsx("span",{children:g===I.id?"Copied":"Copy Code"})]})]}),e.jsxs("div",{style:{padding:"0.65rem 1rem",borderBottom:"1px solid rgba(255, 255, 255, 0.08)",background:"rgba(15, 23, 42, 0.6)"},children:[e.jsx("div",{style:{fontSize:"0.88rem",fontWeight:700,color:"#f8fafc",marginBottom:"3px"},children:I.title}),e.jsx("div",{style:{fontSize:"0.78rem",color:"#cbd5e1",marginBottom:"6px",lineHeight:1.45},children:I.purpose}),e.jsxs("div",{style:{display:"flex",alignItems:"start",gap:"6px",padding:"6px 8px",borderRadius:"6px",background:"rgba(239, 68, 68, 0.12)",border:"1px solid rgba(239, 68, 68, 0.35)",fontSize:"0.74rem",color:"#fecaca",lineHeight:1.4},children:[e.jsx(ls,{size:14,color:"#ef4444",style:{flexShrink:0,marginTop:"2px"}}),e.jsxs("div",{children:[e.jsx("strong",{style:{color:"#f87171"},children:"Common Pitfall:"})," ",I.commonPitfall]})]})]}),e.jsx("div",{style:{padding:"0.75rem 1rem",overflowX:"auto",maxHeight:"185px"},children:e.jsx("pre",{style:{margin:0,fontFamily:'"JetBrains Mono", "Fira Code", monospace',fontSize:"0.78rem",lineHeight:1.6,color:"#e2e8f0"},children:e.jsx("code",{children:I.code})})})]})]})]})}const Va="modulepreload",Ka=function(t,s){return new URL(t,s).href},pt={},mt=function(s,a,x){let g=Promise.resolve();if(a&&a.length>0){let N=function(k){return Promise.all(k.map(R=>Promise.resolve(R).then(c=>({status:"fulfilled",value:c}),c=>({status:"rejected",reason:c}))))};const P=document.getElementsByTagName("link"),S=document.querySelector("meta[property=csp-nonce]"),I=(S==null?void 0:S.nonce)||(S==null?void 0:S.getAttribute("nonce"));g=N(a.map(k=>{if(k=Ka(k,x),k in pt)return;pt[k]=!0;const R=k.endsWith(".css"),c=R?'[rel="stylesheet"]':"";if(!!x)for(let b=P.length-1;b>=0;b--){const y=P[b];if(y.href===k&&(!R||y.rel==="stylesheet"))return}else if(document.querySelector(`link[href="${k}"]${c}`))return;const o=document.createElement("link");if(o.rel=R?"stylesheet":Va,R||(o.as="script"),o.crossOrigin="",o.href=k,I&&o.setAttribute("nonce",I),document.head.appendChild(o),R)return new Promise((b,y)=>{o.addEventListener("load",b),o.addEventListener("error",()=>y(new Error(`Unable to preload CSS for ${k}`)))})}))}function T(N){const P=new Event("vite:preloadError",{cancelable:!0});if(P.payload=N,window.dispatchEvent(P),!P.defaultPrevented)throw N}return g.then(N=>{for(const P of N||[])P.status==="rejected"&&T(P.reason);return s().catch(T)})},Cs={lesson_02:Ge.lazy(()=>mt(()=>import("./Ros2ArchitectureInteractive-DxjLEzP7.js"),__vite__mapDeps([0,1,2]),import.meta.url).then(t=>({default:t.Ros2ArchitectureInteractive}))),lesson_03:Ge.lazy(()=>mt(()=>import("./Lesson03-D6KgRmxw.js"),__vite__mapDeps([3,1,2,4]),import.meta.url))};function Rt(){const[t,s]=i.useState(!0),[a,x]=i.useState(2),[g,T]=i.useState(1),[N,P]=i.useState(1),[S,I]=i.useState(1.82),[k,R]=i.useState(null),[c,r]=i.useState(!1),[o,b]=i.useState(!1),[y,E]=i.useState(!1),[C,d]=i.useState(null),[u,v]=i.useState(null),[h,p]=i.useState("default"),[m,n]=i.useState([{id:1,val:1.81,text:"1.81 m",isHazard:!1,speedSec:1.3}]),l=i.useRef(2),j=i.useRef(new Set([1])),w=i.useRef([]),_=i.useRef(.5),L=i.useRef(null),z=.5,M=i.useCallback(G=>{if(k!==null)return k;const Y=2*Math.PI/10,V=1.45+1.15*Math.sin(Y*G);return Math.max(.2,parseFloat(V.toFixed(2)))},[k]),B=i.useCallback(G=>{j.current.has(G.id)||(j.current.add(G.id),I(G.val),P(Y=>Y+1),b(!0),E(!0),setTimeout(()=>b(!1),280),setTimeout(()=>E(!1),380),n(Y=>Y.filter(V=>V.id!==G.id)))},[]),D=i.useCallback((G=null)=>{const Y=l.current++,V=performance.now();if(L.current!==null&&t){const Z=Math.max(0,Math.min((V-L.current)/1e3,3));_.current+=Z,L.current=V}else _.current+=1/a,t&&(L.current=V);const Re=G!==null?G:M(_.current),ds=Re<z,Ie=`${Re.toFixed(2)} m`,We=1.3;T(Y),r(!0),setTimeout(()=>r(!1),180);const Ue={id:Y,val:Re,text:Ie,isHazard:ds,speedSec:We};n(Z=>[...Z,Ue]);const Ae=setTimeout(()=>{B(Ue)},We*1e3);w.current.push(Ae)},[t,a,M,B]),f=()=>{D()},A=()=>{R(.35),D(.35)},$=()=>{R(2.1),D(2.1)},F=()=>{w.current.forEach(clearTimeout),w.current=[],j.current=new Set([1]),l.current=2,_.current=.5,L.current=null,T(1),P(1),I(1.81),R(null),n([{id:1,val:1.81,text:"1.81 m",isHazard:!1,speedSec:1.3}]),s(!1),d(null),v(null)};i.useEffect(()=>{t?L.current=performance.now():L.current=null},[t]),i.useEffect(()=>{if(!t||C!==null)return;L.current=performance.now();const G=Math.max(100,Math.round(1e3/a)),Y=setInterval(()=>{D()},G);return()=>clearInterval(Y)},[t,a,C,D]),i.useEffect(()=>()=>{w.current.forEach(clearTimeout)},[]);const O=S<z,U=Math.min(100,Math.max(5,S/3*100)),J=[{num:1,title:"1. Ultrasonic Sensor Publisher Node",desc:"Node inherits from rclpy.node.Node and calls self.create_publisher(Float32, '/sensor/ultrasonic_front', 10). A non-blocking wall timer periodically reads hardware and broadcasts distance telemetry.",target:"pub"},{num:2,title:"2. The Sensor Topic Bus & DDS Layer",desc:"Topic '/sensor/ultrasonic_front' acts as an anonymous, strongly-typed range bus. Underneath, DDS middleware handles peer discovery and transport contracts without hardcoding IP addresses.",target:"topic"},{num:3,title:"3. Collision Safety Supervisor & Callback",desc:"Node creates a subscription with self.create_subscription(Float32, '/sensor/ultrasonic_front', callback, 10). The executor immediately runs the callback to evaluate obstacle distance against the 0.50m threshold.",target:"sub"},{num:4,title:"4. Live Telemetry & Active Collision Avoidance",desc:"Distance telemetry streams continuously across nodes. If an obstacle breaches the 0.50m buffer, the safety monitor immediately detects the hazard and triggers simulated emergency braking.",target:"all"}];return e.jsxs("div",{className:"pubsub-flow-container",children:[e.jsxs("div",{className:"pubsub-flow-header",children:[e.jsxs("div",{className:"header-title-row",children:[e.jsxs("div",{className:"badge-pill",children:[e.jsx(de,{size:14,className:"text-cyan animate-pulse"}),e.jsx("span",{children:"Interactive Architecture & Data Flow"})]}),e.jsx("span",{className:"ros-version-tag",children:"ROS 2 Jazzy · DDS Architecture"})]}),e.jsxs("p",{className:"pubsub-flow-subtitle",children:["Observe how the Ultrasonic Rangefinder and Collision Safety Supervisor exchange real-time distance telemetry across the ",e.jsx("code",{className:"inline-code",children:"/sensor/ultrasonic_front"})," topic."]})]}),e.jsxs("div",{className:"walkthrough-bar",children:[e.jsxs("span",{className:"walkthrough-label",children:[e.jsx(fe,{size:14})," Guided Reveal:"]}),e.jsxs("div",{className:"walkthrough-buttons",children:[e.jsx("button",{className:`walkthrough-step-btn ${C===null?"active":""}`,onClick:()=>{d(null),v(null),s(!0)},children:"All Live"}),J.map(G=>e.jsxs("button",{className:`walkthrough-step-btn ${C===G.num?"active":""}`,onClick:()=>{d(G.num),v(G.target==="all"?null:G.target),s(G.num===4)},children:["Step ",G.num]},G.num))]})]}),C!==null&&e.jsxs("div",{className:"active-step-banner animate-fade-in",children:[e.jsxs("div",{className:"banner-badge",children:["Step ",C," of 4"]}),e.jsxs("div",{className:"banner-content",children:[e.jsx("h4",{children:J[C-1].title}),e.jsx("p",{children:J[C-1].desc})]})]}),e.jsxs("div",{className:"diagram-stage",children:[e.jsxs("div",{className:`diagram-card publisher-card ${c?"pulse-border":""} ${u==="pub"||C===1||C===4||C===null?"focused":"dimmed"}`,onClick:()=>v("pub"),children:[e.jsxs("div",{className:"card-top",children:[e.jsx("div",{className:"node-icon-wrapper pub-icon",children:e.jsx(ue,{size:18})}),e.jsxs("div",{className:"node-title-group",children:[e.jsx("div",{className:"node-role-tag",children:"PUBLISHER NODE"}),e.jsx("h3",{className:"node-name",title:"ultrasonic_sensor_node",children:"ultrasonic_sensor_node"}),e.jsx("div",{className:"node-class",children:"UltrasonicSensorPublisher"})]}),e.jsx("div",{className:`status-dot ${t?"online":"paused"}`,title:t?"Publishing Active":"Paused"})]}),e.jsxs("div",{className:"card-code-snip",children:[e.jsx("span",{className:"code-fn",children:"create_publisher"}),e.jsx("span",{className:"code-args",children:"(Float32, '/sensor/ultrasonic_front', 10)"})]}),e.jsxs("div",{className:"card-telemetry pub-telemetry",children:[e.jsxs("div",{className:"telemetry-item",children:[e.jsx("span",{className:"telemetry-label",children:"Rate"}),e.jsxs("span",{className:"telemetry-val text-cyan",children:[a," Hz"]})]}),e.jsxs("div",{className:"telemetry-item",children:[e.jsx("span",{className:"telemetry-label",children:"Sent"}),e.jsxs("span",{className:"telemetry-val text-amber",children:["#",g]})]}),e.jsxs("div",{className:"telemetry-item cb-telemetry-item",children:[e.jsx("span",{className:"telemetry-label",children:"Callback"}),e.jsx("span",{className:"telemetry-val text-green cb-name",title:"timer_callback",children:"timer_cb"})]})]}),e.jsxs("button",{className:"card-action-btn",onClick:G=>{G.stopPropagation(),f()},title:"Publish one distance measurement immediately",children:[e.jsx(ce,{size:13}),e.jsx("span",{children:"Publish 1 Measurement"})]})]}),e.jsxs("div",{className:`diagram-pipeline ${u==="topic"||u==="dds"||C===2||C===4||C===null?"focused":"dimmed"}`,onClick:()=>v("topic"),children:[e.jsxs("div",{className:"topic-badge",children:[e.jsx(de,{size:14,className:"text-cyan animate-pulse"}),e.jsxs("span",{className:"topic-name",children:["Topic: ",e.jsx("strong",{children:"/sensor/ultrasonic_front"})]}),e.jsx("span",{className:"topic-type",children:"Float32"})]}),e.jsxs("div",{className:"pipe-svg-wrapper",children:[e.jsxs("svg",{viewBox:"0 0 360 48",className:"pipe-svg",preserveAspectRatio:"none",children:[e.jsxs("defs",{children:[e.jsxs("linearGradient",{id:"pipeGrad",x1:"0%",y1:"0%",x2:"100%",y2:"0%",children:[e.jsx("stop",{offset:"0%",stopColor:"#38bdf8",stopOpacity:"0.8"}),e.jsx("stop",{offset:"50%",stopColor:"#a855f7",stopOpacity:"0.9"}),e.jsx("stop",{offset:"100%",stopColor:"#22c55e",stopOpacity:"0.8"})]}),e.jsxs("filter",{id:"glow",x:"-20%",y:"-20%",width:"140%",height:"140%",children:[e.jsx("feGaussianBlur",{stdDeviation:"3",result:"blur"}),e.jsx("feComposite",{in:"SourceGraphic",in2:"blur",operator:"over"})]})]}),e.jsx("line",{x1:"10",y1:"24",x2:"350",y2:"24",stroke:"#1e293b",strokeWidth:"6",strokeLinecap:"round"}),e.jsx("line",{x1:"10",y1:"24",x2:"350",y2:"24",stroke:"url(#pipeGrad)",strokeWidth:"3.5",strokeDasharray:"8 8",strokeLinecap:"round",className:`pipeline-dash ${t?"flowing":""}`}),e.jsx("polygon",{points:"346,18 358,24 346,30",fill:"#22c55e"})]}),e.jsx("div",{className:`packet-track ${t?"":"paused"}`,children:m.map(G=>e.jsx("div",{className:`sliding-packet ${t?"":"paused"}`,style:{animationDuration:`${G.speedSec||1.3}s`},onAnimationEnd:()=>B(G),children:e.jsxs("span",{className:`packet-pill ${G.isHazard?"hazard-packet":""}`,children:[e.jsx(qe,{size:11,className:"packet-spark"}),e.jsx("span",{children:G.text})]})},G.id))})]}),e.jsxs("div",{className:"dds-layer-box",onClick:G=>{G.stopPropagation(),v("dds")},children:[e.jsxs("div",{className:"dds-title-row",children:[e.jsx("span",{className:"dds-title",children:"DDS Layer"}),e.jsxs("span",{className:"qos-badge",children:[e.jsx(St,{size:12})," QoS: ",h==="default"?"RELIABLE":"BEST_EFFORT"]})]}),e.jsxs("div",{className:"dds-metrics",children:[e.jsx("span",{children:"Depth: 10"}),e.jsx("span",{children:"·"}),e.jsx("span",{children:"RTPS Multicast"}),e.jsx("span",{children:"·"}),e.jsx("span",{children:"CycloneDDS"})]})]})]}),e.jsxs("div",{className:`diagram-card subscriber-card ${O?"hazard-active-card":""} ${o?O?"pulse-border-hazard":"pulse-border-green":""} ${u==="sub"||C===3||C===4||C===null?"focused":"dimmed"}`,onClick:()=>v("sub"),children:[e.jsxs("div",{className:"card-top",children:[e.jsx("div",{className:`node-icon-wrapper ${O?"hazard-icon":"sub-icon"}`,children:O?e.jsx(ls,{size:18,className:"text-red animate-bounce"}):e.jsx(ye,{size:18})}),e.jsxs("div",{className:"node-title-group",children:[e.jsx("div",{className:"node-role-tag",children:"SUBSCRIBER NODE"}),e.jsx("h3",{className:"node-name",title:"collision_monitor_node",children:"collision_monitor_node"}),e.jsx("div",{className:"node-class",children:"CollisionSafetySubscriber"})]}),e.jsx("div",{className:`status-dot ${O?"alert":t?"online":"paused"}`,title:O?"EMERGENCY BRAKE ACTIVE":"Monitoring Active"})]}),e.jsxs("div",{className:"card-code-snip sub-snip",children:[e.jsx("span",{className:"code-fn",children:"create_subscription"}),e.jsx("span",{className:"code-args",children:"(Float32, '/sensor/ultrasonic_front', cb, 10)"})]}),e.jsxs("div",{className:"card-telemetry sub-telemetry",children:[e.jsxs("div",{className:"telemetry-item",children:[e.jsx("span",{className:"telemetry-label",children:"Recv"}),e.jsxs("span",{className:"telemetry-val text-amber",children:["#",N]})]}),e.jsxs("div",{className:"telemetry-item",children:[e.jsx("span",{className:"telemetry-label",children:"Range"}),e.jsxs("span",{className:`telemetry-val ${O?"text-red font-bold":"text-cyan"}`,children:[S.toFixed(2)," m"]})]}),e.jsxs("div",{className:"telemetry-item cb-telemetry-item",children:[e.jsx("span",{className:"telemetry-label",children:"Action"}),e.jsx("span",{className:`telemetry-val cb-name ${O?"text-red font-bold animate-pulse":"text-green"}`,children:O?"🛑 BRAKE":"🟢 CLEAR"})]})]}),e.jsxs("div",{className:"proximity-gauge-wrap",children:[e.jsxs("div",{className:"gauge-labels",children:[e.jsxs("span",{children:["Proximity: ",e.jsxs("strong",{children:[S.toFixed(2),"m"]})]}),e.jsxs("span",{className:"threshold-tag",children:["Threshold: ",z.toFixed(2),"m"]})]}),e.jsxs("div",{className:"gauge-track",children:[e.jsx("div",{className:"gauge-threshold-line",title:"0.50m Safety Threshold"}),e.jsx("div",{className:`gauge-fill ${O?"hazard":"safe"}`,style:{width:`${U}%`}})]})]}),e.jsxs("div",{className:"card-terminal-log",children:[e.jsxs("div",{className:"log-header",children:[e.jsx(ke,{size:12,className:O?"text-red animate-pulse":"text-green"}),e.jsx("span",{children:"Safety Supervisory Telemetry"})]}),e.jsxs("div",{className:`log-content-wrap ${O?"hazard-alert":""} ${y?"pulse-log":""}`,children:[e.jsx("span",{className:`log-level-pill ${O?"log-level-error":""}`,children:O?"[WARN]":"[INFO]"}),e.jsx("span",{className:`log-text ${O?"hazard-text":""}`,children:O?`[distance_callback] Obstacle at ${S.toFixed(2)}m < 0.50m! Commanded EMERGENCY STOP (/cmd_vel -> 0.0)`:`[distance_callback] Clearance: ${S.toFixed(2)}m (> 0.50m threshold). Path clear, cruising.`})]})]})]})]}),e.jsxs("div",{className:"pubsub-controls-bar",children:[e.jsxs("div",{className:"controls-left",children:[e.jsxs("button",{className:`control-btn play-btn ${t?"active-playing":""}`,onClick:()=>s(!t),title:t?"Pause stream":"Start stream",children:[t?e.jsx(zs,{size:15}):e.jsx(cs,{size:15}),e.jsx("span",{children:t?"Pause Stream":"Play Stream"})]}),e.jsxs("button",{className:"control-btn",onClick:f,title:"Step one message",children:[e.jsx(ce,{size:15}),e.jsx("span",{children:"Step (1 Msg)"})]}),e.jsxs("button",{className:"control-btn",onClick:F,title:"Reset simulation counter",children:[e.jsx(te,{size:15}),e.jsx("span",{children:"Reset"})]}),e.jsxs("button",{className:"sensor-quick-btn hazard",onClick:A,title:"Inject an obstacle below the 0.50m safety threshold to trigger emergency stop",children:[e.jsx(ls,{size:13}),e.jsx("span",{children:"Simulate Obstacle (0.35m)"})]}),e.jsxs("button",{className:"sensor-quick-btn safe",onClick:$,title:"Simulate a clear pathway at 2.10m",children:[e.jsx(he,{size:13}),e.jsx("span",{children:"Clear Path (2.10m)"})]}),k!==null&&e.jsxs("button",{className:"sensor-quick-btn auto",onClick:()=>{R(null),L.current=performance.now()},title:"Resume automatic sinusoidal obstacle oscillation at constant physical speed",children:[e.jsx(te,{size:13}),e.jsx("span",{children:"Resume Auto Wave"})]})]}),e.jsxs("div",{className:"controls-right",children:[e.jsxs("div",{className:"rate-slider-group",children:[e.jsx(Be,{size:14,className:"text-muted"}),e.jsxs("label",{className:"slider-label",title:"Publisher timer frequency: controls how many messages are published per second across DDS. The physical obstacle oscillates at a constant real-time speed.",children:["Timer Rate: ",e.jsxs("strong",{children:[a," Hz"]})," ",e.jsxs("span",{className:"rate-subtext",children:["(",a," msg/s)"]})]}),e.jsx("input",{type:"range",min:"0.5",max:"4",step:"0.5",value:a,onChange:G=>x(parseFloat(G.target.value)),className:"pubsub-slider"})]}),e.jsxs("div",{className:"qos-toggle-group",children:[e.jsx("span",{className:"qos-label",children:"QoS Policy:"}),e.jsx("button",{className:`qos-choice-btn ${h==="default"?"active":""}`,onClick:()=>p("default"),children:"Reliable"}),e.jsx("button",{className:`qos-choice-btn ${h==="sensor_data"?"active":""}`,onClick:()=>p("sensor_data"),children:"Best Effort"})]})]})]}),u&&e.jsxs("div",{className:"pubsub-inspector animate-fade-in",children:[e.jsxs("div",{className:"inspector-header",children:[e.jsxs("div",{className:"inspector-title",children:[e.jsx(Ds,{size:16,className:"text-cyan"}),e.jsxs("span",{children:[u==="pub"&&"Inspecting: Publisher Node (ultrasonic_sensor_node)",u==="topic"&&"Inspecting: Topic Bus (/sensor/ultrasonic_front)",u==="dds"&&"Inspecting: DDS Middleware & QoS Transport",u==="sub"&&"Inspecting: Subscriber Node (collision_monitor_node)"]})]}),e.jsx("button",{className:"inspector-close",onClick:()=>v(null),children:"✕"})]}),e.jsxs("div",{className:"inspector-body",children:[u==="pub"&&e.jsxs("div",{className:"inspector-grid",children:[e.jsxs("div",{children:[e.jsx("strong",{children:"Role:"})," Data Originator / Sensor Publisher.",e.jsxs("p",{children:["Calls ",e.jsx("code",{className:"inline-code",children:"self.create_publisher(Float32, '/sensor/ultrasonic_front', 10)"}),". The node publishes sensor telemetry anonymously without needing to know which subscriber nodes are listening."]})]}),e.jsxs("div",{className:"cli-hint",children:[e.jsx("strong",{children:"CLI Inspection Command:"}),e.jsx("code",{children:"ros2 node info /ultrasonic_sensor_node"})]})]}),u==="topic"&&e.jsxs("div",{className:"inspector-grid",children:[e.jsxs("div",{children:[e.jsx("strong",{children:"Role:"})," Decoupled Named Message Bus.",e.jsxs("p",{children:["In ROS 2, topics are strictly typed (",e.jsx("code",{className:"inline-code",children:"example_interfaces/msg/Float32"}),"). Any publisher sending mismatched types is rejected by DDS compile-time and runtime checks."]})]}),e.jsxs("div",{className:"cli-hint",children:[e.jsx("strong",{children:"CLI Inspection Commands:"}),e.jsx("code",{children:"ros2 topic list"}),e.jsx("code",{children:"ros2 topic info /sensor/ultrasonic_front"}),e.jsx("code",{children:"ros2 topic echo /sensor/ultrasonic_front"}),e.jsx("code",{children:"ros2 topic hz /sensor/ultrasonic_front"})]})]}),u==="dds"&&e.jsxs("div",{className:"inspector-grid",children:[e.jsxs("div",{children:[e.jsx("strong",{children:"Role:"})," Data Distribution Service (DDS / RTPS).",e.jsx("p",{children:"ROS 2 replaces ROS 1's custom master with industry-standard DDS (Object Management Group). Nodes automatically discover each other via multicast peer-to-peer handshakes without a central broker."})]}),e.jsxs("div",{className:"cli-hint",children:[e.jsx("strong",{children:"Active Profile:"}),e.jsx("code",{children:h==="default"?"Reliability: RELIABLE, Durability: VOLATILE, Depth: 10":"Reliability: BEST_EFFORT, Durability: VOLATILE, Depth: 5 (Sensor Data)"})]})]}),u==="sub"&&e.jsxs("div",{className:"inspector-grid",children:[e.jsxs("div",{children:[e.jsx("strong",{children:"Role:"})," Event-Driven Consumer & Safety Supervisor.",e.jsxs("p",{children:["Registers a callback method with ",e.jsx("code",{className:"inline-code",children:"self.create_subscription(Float32, '/sensor/ultrasonic_front', self.distance_callback, 10)"}),". The ROS 2 Executor sits in an event loop (",e.jsx("code",{className:"inline-code",children:"rclpy.spin()"}),") and calls the callback whenever new distance data lands in the queue."]}),e.jsxs("p",{style:{marginTop:"6px",color:"#94a3b8"},children:["Current Reaction: ",e.jsx("strong",{children:O?"🚨 COLLISION HAZARD (< 0.50m) -> EMERGENCY STOP ACTIVE":"✅ SAFE CLEARANCE (>= 0.50m) -> NORMAL MOTION"})]})]}),e.jsxs("div",{className:"cli-hint",children:[e.jsx("strong",{children:"CLI Verification:"}),e.jsx("code",{children:"ros2 node info /collision_monitor_node"}),e.jsx("code",{children:"ros2 topic echo /sensor/ultrasonic_front"})]})]})]})]})]})}function It(){const[t,s]=i.useState(!1),[a,x]=i.useState(1),[g,T]=i.useState("IDLE"),[N,P]=i.useState("LISTENING"),[S,I]=i.useState(!0),[k,R]=i.useState(null),[c,r]=i.useState("idle"),o=i.useRef(null),b=i.useRef([]),y=()=>{b.current.forEach(u=>clearTimeout(u)),b.current=[]},E=()=>{if(c!=="idle"&&c!=="completed")return;y(),x(v=>v+1),T("SENDING"),r("req_in_flight");const u=setTimeout(()=>{T("WAITING"),P("PROCESSING"),r("server_computing");const v=setTimeout(()=>{P("REPLYING"),I(p=>!p),r("res_in_flight");const h=setTimeout(()=>{T("RESOLVED"),P("LISTENING"),r("completed");const p=setTimeout(()=>{T("IDLE"),r("idle")},1500);b.current.push(p)},2400);b.current.push(h)},1600);b.current.push(v)},2400);b.current.push(u)},C=()=>{y(),o.current&&clearInterval(o.current),s(!1),R(null),x(1),T("IDLE"),P("LISTENING"),I(!0),r("idle")};i.useEffect(()=>(t&&k===null?o.current=setInterval(()=>{E()},8500):o.current&&clearInterval(o.current),()=>{o.current&&clearInterval(o.current)}),[t,k,c]),i.useEffect(()=>()=>y(),[]);const d=[{num:1,title:"1. Client Initiates Request (Client ➔ Server)",desc:"The Client node invokes client.call_async(SetBool.Request(data=True)). A blue request packet departs the Client and travels across the DDS bus. The Client creates a non-blocking Future object and waits.",target:"client"},{num:2,title:"2. DDS Direct 1-to-1 Point-to-Point Transport",desc:"Unlike Topics which broadcast anonymously to any number of subscribers, Services use point-to-point unicast addressing directly to the single server registered for '/amr/emergency_stop'.",target:"pipeline"},{num:3,title:"3. Server Executes Callback (cb_emergency_stop)",desc:"The Server receives (request, response). It executes hardware actuation (toggling physical motor brake relays) and assigns the response payload: response.success = True and response.message = 'Brakes Engaged'.",target:"server"},{num:4,title:"4. Response Returned & Future Resolved (Server ➔ Client)",desc:"The Server dispatches the green response packet back to the Client. When the Client receives the response, its Future is marked resolved and triggers the done_callback.",target:"all"}];return e.jsxs("div",{className:"pubsub-flow-container",children:[e.jsxs("div",{className:"pubsub-flow-header",children:[e.jsxs("div",{className:"header-title-row",children:[e.jsxs("div",{className:"badge-pill",children:[e.jsx(de,{size:14,className:"text-cyan animate-pulse"}),e.jsx("span",{children:"Interactive Service Architecture: 2-Way Request ➔ Response (RPC)"})]}),e.jsx("span",{className:"ros-version-tag",children:"std_srvs/srv/SetBool · 1-to-1 Unicast"})]}),e.jsxs("p",{className:"pubsub-flow-subtitle",children:["Watch the slow-motion bidirectional packet flight: ",e.jsx("strong",{children:"Request"})," glides from Client to Server, the Server processes the callback, and the ",e.jsx("strong",{children:"Response"})," glides from Server back to Client."]})]}),e.jsxs("div",{className:"walkthrough-bar",children:[e.jsxs("span",{className:"walkthrough-label",children:[e.jsx(fe,{size:14})," Guided Reveal:"]}),e.jsxs("div",{className:"walkthrough-buttons",children:[e.jsx("button",{className:`walkthrough-step-btn ${k===null?"active":""}`,onClick:()=>{R(null),s(!1),r("idle")},children:"All Live"}),d.map(u=>e.jsxs("button",{className:`walkthrough-step-btn ${k===u.num?"active":""}`,onClick:()=>{R(u.num),s(!1)},children:["Step ",u.num]},u.num))]})]}),k!==null&&e.jsxs("div",{className:"active-step-banner animate-fade-in",children:[e.jsxs("div",{className:"banner-badge",children:["Step ",k," of 4"]}),e.jsxs("div",{className:"banner-content",children:[e.jsx("h4",{children:d[k-1].title}),e.jsx("p",{children:d[k-1].desc})]})]}),e.jsxs("div",{className:"diagram-stage",children:[e.jsxs("div",{className:`diagram-card client-card ${g==="SENDING"||g==="WAITING"?"pulse-border":""} ${k===1||k===4||k===null?"focused":"dimmed"}`,children:[e.jsxs("div",{className:"card-top",children:[e.jsx("div",{className:"node-icon-wrapper pub-icon",children:e.jsx(ye,{size:18})}),e.jsxs("div",{className:"node-title-group",children:[e.jsx("div",{className:"node-role-tag",children:"SERVICE CLIENT (Caller)"}),e.jsx("h3",{className:"node-name",title:"/teleop_safety_client",children:"teleop_safety_client"}),e.jsx("div",{className:"node-class",children:"EmergencyStopClient"})]}),e.jsx("div",{className:`status-dot ${g!=="IDLE"?"online":"paused"}`,title:g})]}),e.jsxs("div",{className:"card-code-snip",children:[e.jsx("span",{className:"code-fn",children:"future = client.call_async"}),e.jsx("span",{className:"code-args",children:"(SetBool.Request(data=True))"})]}),e.jsxs("div",{className:"card-telemetry pub-telemetry",children:[e.jsxs("div",{className:"telemetry-item",children:[e.jsx("span",{className:"telemetry-label",children:"Calls"}),e.jsxs("span",{className:"telemetry-val text-cyan",children:["#",a]})]}),e.jsxs("div",{className:"telemetry-item",children:[e.jsx("span",{className:"telemetry-label",children:"Client Future"}),e.jsx("span",{className:`telemetry-val ${g==="WAITING"?"text-amber animate-pulse":g==="RESOLVED"?"text-green":"text-muted"}`,children:g==="WAITING"?"⏳ PENDING":g==="RESOLVED"?"✅ RESOLVED":"IDLE"})]}),e.jsxs("div",{className:"telemetry-item cb-telemetry-item",children:[e.jsx("span",{className:"telemetry-label",children:"Callback"}),e.jsx("span",{className:"telemetry-val text-purple cb-name",children:"done_cb"})]})]}),e.jsxs("button",{className:"card-action-btn",onClick:E,disabled:c!=="idle"&&c!=="completed",title:"Dispatch 1 Service Request to Server",children:[e.jsx(ce,{size:13}),e.jsxs("span",{children:["Send Request (data=",S?"False":"True",")"]})]})]}),e.jsxs("div",{className:`diagram-pipeline ${k===2||k===4||k===null?"focused":"dimmed"}`,children:[e.jsxs("div",{className:"topic-badge",children:[e.jsx(de,{size:14,className:"text-cyan animate-pulse"}),e.jsxs("span",{className:"topic-name",children:["Service Bus: ",e.jsx("strong",{children:"/amr/emergency_stop"})]}),e.jsx("span",{className:"topic-type",children:"SetBool.srv"})]}),e.jsxs("div",{className:"service-lane request-lane",children:[e.jsxs("div",{className:"lane-header-row",children:[e.jsxs("span",{className:"lane-dir-badge req-badge",children:[e.jsx(me,{size:12})," 1. REQUEST (Client ➔ Server)"]}),e.jsxs("span",{className:"lane-payload-preview",children:["data: ",S?"False":"True"]})]}),e.jsxs("div",{className:"service-flight-track",children:[e.jsx("div",{className:"track-rail",children:e.jsx("div",{className:"flow-chevrons flow-right",children:"› › › › › › › › › › › › › › › › › › › ›"})}),c==="req_in_flight"&&e.jsx("div",{className:"sliding-service-packet slide-c2s",children:e.jsxs("span",{className:"service-packet-pill req-pill",children:[e.jsx(qe,{size:11,className:"text-amber"}),e.jsxs("span",{children:["SetBool_Request(data=",S?"False":"True",")"]})]})})]})]}),e.jsx("div",{className:`service-execution-box ${c==="server_computing"?"active-processing":""}`,children:e.jsx("div",{className:"exec-box-content",children:c==="server_computing"?e.jsxs(e.Fragment,{children:[e.jsx(ue,{size:16,className:"text-cyan animate-spin"}),e.jsxs("span",{className:"exec-text text-cyan",children:["Server Executing: ",e.jsx("code",{children:"cb_emergency_stop()"})," ➔ Toggling Motor Relays & Populating Response..."]})]}):c==="completed"?e.jsxs(e.Fragment,{children:[e.jsx(H,{size:16,className:"text-green"}),e.jsx("span",{className:"exec-text text-green",children:"RPC Completed Successfully · Response Delivered & Future Resolved"})]}):e.jsxs(e.Fragment,{children:[e.jsx(St,{size:16,className:"text-muted"}),e.jsx("span",{className:"exec-text text-muted",children:"1-to-1 Bidirectional RPC Channel Ready · Awaiting Request"})]})})}),e.jsxs("div",{className:"service-lane response-lane",children:[e.jsxs("div",{className:"lane-header-row",children:[e.jsxs("span",{className:"lane-dir-badge res-badge",children:[e.jsx(Ee,{size:12})," 2. RESPONSE (Server ➔ Client)"]}),e.jsx("span",{className:"lane-payload-preview",children:"success: True"})]}),e.jsxs("div",{className:"service-flight-track",children:[e.jsx("div",{className:"track-rail",children:e.jsx("div",{className:"flow-chevrons flow-left",children:"‹ ‹ ‹ ‹ ‹ ‹ ‹ ‹ ‹ ‹ ‹ ‹ ‹ ‹ ‹ ‹ ‹ ‹ ‹ ‹"})}),c==="res_in_flight"&&e.jsx("div",{className:"sliding-service-packet slide-s2c",children:e.jsxs("span",{className:"service-packet-pill res-pill",children:[e.jsx(H,{size:11,className:"text-green"}),e.jsxs("span",{children:['SetBool_Response(success=True, msg="',S?"Brakes Engaged":"Motors Ready",'")']})]})})]})]}),e.jsxs("div",{className:"qos-badge-strip",children:[e.jsx("span",{className:"qos-chip",children:"Interface: std_srvs/srv/SetBool"}),e.jsx("span",{className:"qos-chip",children:"Type: 1-to-1 Unicast RPC"}),e.jsx("span",{className:"qos-chip",children:"Flight Speed: 2.4s (Readable Mode)"})]})]}),e.jsxs("div",{className:`diagram-card server-card ${N==="PROCESSING"?"pulse-border":""} ${k===3||k===4||k===null?"focused":"dimmed"}`,children:[e.jsxs("div",{className:"card-top",children:[e.jsx("div",{className:"node-icon-wrapper sub-icon",children:e.jsx(ue,{size:18})}),e.jsxs("div",{className:"node-title-group",children:[e.jsx("div",{className:"node-role-tag",children:"SERVICE SERVER (Provider)"}),e.jsx("h3",{className:"node-name",title:"/emergency_stop_server",children:"emergency_stop_server"}),e.jsx("div",{className:"node-class",children:"EmergencyStopServer"})]}),e.jsx("div",{className:`status-dot ${N!=="LISTENING"?"online":"active"}`,title:N})]}),e.jsxs("div",{className:"card-code-snip",children:[e.jsx("span",{className:"code-fn",children:"def cb_emergency_stop"}),e.jsx("span",{className:"code-args",children:"(self, request, response):"})]}),e.jsxs("div",{className:"card-telemetry sub-telemetry",children:[e.jsxs("div",{className:"telemetry-item",children:[e.jsx("span",{className:"telemetry-label",children:"Hardware State"}),e.jsx("span",{className:"telemetry-val",style:{color:S?"#ef4444":"#10b981"},children:S?"🛑 ENGAGED":"⚡ ARMED"})]}),e.jsxs("div",{className:"telemetry-item",children:[e.jsx("span",{className:"telemetry-label",children:"Server State"}),e.jsx("span",{className:`telemetry-val ${N==="PROCESSING"?"text-amber animate-pulse":"text-green"}`,children:N})]}),e.jsxs("div",{className:"telemetry-item cb-telemetry-item",children:[e.jsx("span",{className:"telemetry-label",children:"Handler"}),e.jsx("span",{className:"telemetry-val text-cyan cb-name",children:"cb_e_stop"})]})]}),e.jsxs("div",{className:"card-terminal-log",children:[e.jsxs("div",{className:"log-header",children:[e.jsx(ke,{size:12,className:"text-green"}),e.jsx("span",{children:"Actuator Hardware Relay Status"})]}),e.jsxs("div",{className:"log-content-wrap",children:[e.jsx("span",{className:`log-level-pill ${S?"log-level-error":""}`,children:S?"[LOCKED]":"[ARMED]"}),e.jsx("span",{className:"log-text",children:S?"Brakes Locked (PWM 0%). AMR Stopped.":"Differential Drive Motors Enabled (PWM Active)."})]})]})]})]}),e.jsx("div",{className:"pubsub-controls-bar",style:{marginTop:"1.25rem"},children:e.jsxs("div",{className:"controls-left",children:[e.jsxs("button",{className:`control-btn play-btn ${t?"active-playing":""}`,onClick:()=>s(!t),title:t?"Pause auto RPC demonstration":"Start auto RPC demonstration",children:[t?e.jsx(zs,{size:15}):e.jsx(cs,{size:15}),e.jsx("span",{children:t?"Pause Auto Demo":"Auto Demo (Every 8s)"})]}),e.jsxs("button",{className:"control-btn",onClick:E,disabled:c!=="idle"&&c!=="completed",title:"Execute one isolated Request-Response transaction",children:[e.jsx(ce,{size:15}),e.jsx("span",{children:"Call Service (1 RPC)"})]}),e.jsxs("button",{className:"control-btn",onClick:C,title:"Reset simulation state",children:[e.jsx(te,{size:15}),e.jsx("span",{children:"Reset"})]})]})}),e.jsxs("div",{className:"service-concept-summary",children:[e.jsxs("div",{className:"concept-card",children:[e.jsx("div",{className:"concept-icon req-icon",children:e.jsx(ce,{size:16})}),e.jsxs("div",{className:"concept-text",children:[e.jsx("strong",{children:"1. Request & Client Future (Client ➔ Server)"}),e.jsxs("p",{children:["The client creates a Request and calls ",e.jsx("code",{className:"inline-code",children:"call_async()"}),". The packet dispatches to the server. The client holds a Future object and never freezes its main event loop."]})]})]}),e.jsxs("div",{className:"concept-card",children:[e.jsx("div",{className:"concept-icon srv-icon",children:e.jsx(ue,{size:16})}),e.jsxs("div",{className:"concept-text",children:[e.jsx("strong",{children:"2. Server Callback Execution (Provider)"}),e.jsxs("p",{children:["The server receives ",e.jsx("code",{className:"inline-code",children:"(request, response)"}),", toggles hardware relays, and fills in ",e.jsx("code",{className:"inline-code",children:"response.success = True"})," before sending the response back."]})]})]}),e.jsxs("div",{className:"concept-card",children:[e.jsx("div",{className:"concept-icon res-icon",children:e.jsx(H,{size:16})}),e.jsxs("div",{className:"concept-text",children:[e.jsx("strong",{children:"3. Response Delivery (Server ➔ Client)"}),e.jsx("p",{children:"The response returns back to the calling client. The client's Future resolves, unlocking any dependent robot state machines or logging."})]})]})]})]})}function At(){const[t,s]=i.useState("IDLE"),[a,x]=i.useState(0),[g,T]=i.useState(10),[N,P]=i.useState(10),[S,I]=i.useState(0),[k,R]=i.useState(null),[c,r]=i.useState([]),[o,b]=i.useState({distance_remaining:10,current_velocity:0,count:0}),[y,E]=i.useState(!1),C=i.useRef(null),d=i.useRef(null),u=i.useRef([]),v=i.useRef(1),h=i.useRef(10),p=()=>{C.current&&clearInterval(C.current),d.current&&clearInterval(d.current),u.current.forEach(_=>clearTimeout(_)),u.current=[]},m=()=>{if(t==="EXECUTING"||t==="SENDING_GOAL"||t==="SENDING_RESULT")return;p(),x(0),P(g),h.current=g,I(0),r([]),b({distance_remaining:g,current_velocity:0,count:0}),s("SENDING_GOAL");const _=setTimeout(()=>{s("GOAL_ACCEPTED");const L=setTimeout(()=>{s("EXECUTING")},700);u.current.push(L)},2e3);u.current.push(_)},n=()=>{if(t!=="EXECUTING")return;p(),r([]),s("SENDING_CANCEL");const _=setTimeout(()=>{s("CANCELED"),b(L=>({...L,current_velocity:0}))},1500);u.current.push(_)},l=()=>{p(),s("IDLE"),x(0),P(g),h.current=g,I(0),r([]),b({distance_remaining:g,current_velocity:0,count:0}),R(null)};i.useEffect(()=>{if(t!=="EXECUTING"){C.current&&clearInterval(C.current),d.current&&clearInterval(d.current);return}const _=g/1.4,L=60,M=100/(_*1e3/L);return C.current=setInterval(()=>{x(B=>{const D=B+M;if(D>=100){clearInterval(C.current),clearInterval(d.current),P(0),h.current=0,r([]),s("SENDING_RESULT");const A=setTimeout(()=>{s("SUCCEEDED"),b($=>({distance_remaining:0,current_velocity:0,count:$.count}))},2200);return u.current.push(A),100}const f=parseFloat((g*(1-D/100)).toFixed(1));return P(f),h.current=f,D})},L),d.current=setInterval(()=>{I(f=>f+1);const B=v.current++,D=h.current;r(f=>[...f.slice(-2),{id:B,dist:D.toFixed(1)}])},900),()=>{C.current&&clearInterval(C.current),d.current&&clearInterval(d.current)}},[t,g]),i.useEffect(()=>()=>p(),[]);const j=_=>{b({distance_remaining:parseFloat(_.dist),current_velocity:1.4,count:_.id}),E(!0),setTimeout(()=>E(!1),220),r(L=>L.filter(z=>z.id!==_.id))},w=[{num:1,title:"1. Goal Dispatch (Client ➔ Server)",desc:"The Action Client calls send_goal_async(NavigateDistance.Goal(target=10.0m)). The Goal request dispatches across the DDS network. The Server accepts the goal handle and returns UUID #0x82f1.",target:"goal"},{num:2,title:"2. Periodic Feedback Stream (Server ➔ Client)",desc:"While the AMR drives along the corridor, the Action Server streams feedback packets at 4 Hz. The Client's feedback_callback receives distance remaining and velocity asynchronously without blocking.",target:"feedback"},{num:3,title:"3. Preemption & Cancellation Request (Client ➔ Server)",desc:"If an emergency obstacle appears, the Client calls cancel_goal_async(). The Server immediately halts motor PWM, updates the goal state machine to STATUS_CANCELED, and stops navigation.",target:"cancel"},{num:4,title:"4. Final Result Resolution (Server ➔ Client)",desc:"Upon reaching 0.0m or completing cancellation, the Server sends the Result packet back. The Client's get_result_async() resolves with the terminal status (STATUS_SUCCEEDED or STATUS_CANCELED).",target:"result"}];return e.jsxs("div",{className:"pubsub-flow-container action-flow-root-container",children:[e.jsxs("div",{className:"pubsub-flow-header",children:[e.jsxs("div",{className:"header-title-row",children:[e.jsxs("div",{className:"badge-pill",children:[e.jsx(de,{size:14,className:"text-cyan animate-pulse"}),e.jsx("span",{children:"Interactive 3-Tier Action Architecture: Goal ➔ Feedback ➔ Result"})]}),e.jsx("span",{className:"ros-version-tag",children:"nexus_amr_interfaces/action/NavigateDistance · Preemptible"})]}),e.jsx("p",{className:"pubsub-flow-subtitle",children:"ROS 2 Actions provide asynchronous, preemptible, long-running goal execution: The Action Client dispatches a Goal request, the Action Server publishes a continuous stream of real-time Feedback during execution, and returns the final Result when complete."})]}),e.jsxs("div",{className:"walkthrough-bar",children:[e.jsxs("span",{className:"walkthrough-label",children:[e.jsx(fe,{size:14})," Guided Reveal:"]}),e.jsxs("div",{className:"walkthrough-buttons",children:[e.jsx("button",{className:`walkthrough-step-btn ${k===null?"active":""}`,onClick:()=>{R(null)},children:"All Live"}),w.map(_=>e.jsxs("button",{className:`walkthrough-step-btn ${k===_.num?"active":""}`,onClick:()=>{R(_.num)},children:["Step ",_.num]},_.num))]})]}),k!==null&&e.jsxs("div",{className:"active-step-banner animate-fade-in",children:[e.jsxs("div",{className:"banner-badge",children:["Step ",k," of 4"]}),e.jsxs("div",{className:"banner-content",children:[e.jsx("h4",{children:w[k-1].title}),e.jsx("p",{children:w[k-1].desc})]})]}),e.jsxs("div",{className:"action-physical-runway-card",children:[e.jsxs("div",{className:"runway-header-row",children:[e.jsxs("div",{className:"runway-header-left",children:[e.jsxs("span",{className:"runway-badge",children:[e.jsx(Rs,{size:12}),e.jsx("span",{children:"Physical AMR Trajectory Corridor"})]}),e.jsx("span",{className:"runway-live-status font-mono",children:t==="EXECUTING"?`Driving at 1.40 m/s · ${(g*(a/100)).toFixed(1)}m of ${g}.0m traversed`:t==="GOAL_ACCEPTED"?"Goal Accepted · Initializing Motor Drive...":t==="SENDING_GOAL"?"Goal Dispatch In-Flight...":t==="SENDING_CANCEL"?"Preemption In-Flight · Decelerating Motors...":t==="SUCCEEDED"?`Goal Reached! Target Waypoint Reached: ${g}.0m`:t==="CANCELED"?"Preemption Accepted · Motors Safely Cut":`Standby at 0.0m · Awaiting Action Goal (${g}m)`})]}),e.jsx("div",{className:"runway-header-right font-mono",children:e.jsxs("span",{className:"runway-speed-tag",children:["Speed: ",e.jsx("strong",{children:t==="EXECUTING"?"1.40 m/s":"0.00 m/s"})]})})]}),e.jsxs("div",{className:"amr-full-runway-track",children:[e.jsx("div",{className:"runway-track-rail"}),e.jsx("div",{className:"runway-track-fill",style:{width:`${a}%`,background:t==="CANCELED"?"#ef4444":"linear-gradient(90deg, #0284c7, #10b981)"}}),e.jsxs("div",{className:"runway-destination-flag",title:`Target Waypoint: ${g}.0m`,children:[e.jsx(ua,{size:14,className:t==="SUCCEEDED"?"text-emerald":"text-cyan"}),e.jsxs("span",{className:"flag-label",children:[g,"m"]})]}),e.jsx("div",{className:`runway-amr-marker ${t==="EXECUTING"?"driving":""}`,style:{left:`calc(${a}% - 14px)`},title:`AMR Position: ${(g*(a/100)).toFixed(1)}m`,children:e.jsx("div",{className:"amr-icon-box",children:e.jsx(Rs,{size:13,className:"amr-compass-icon"})})}),e.jsxs("div",{className:"runway-distance-ticks",children:[e.jsx("span",{children:"0m (Origin)"}),e.jsxs("span",{children:[(g*.25).toFixed(1),"m"]}),e.jsxs("span",{children:[(g*.5).toFixed(1),"m"]}),e.jsxs("span",{children:[(g*.75).toFixed(1),"m"]}),e.jsxs("span",{children:[g,".0m (Waypoint)"]})]})]})]}),e.jsxs("div",{className:"diagram-stage action-balanced-stage",children:[e.jsxs("div",{className:`diagram-card client-card action-node-card ${t==="EXECUTING"||t==="SENDING_GOAL"?"pulse-border":""} ${k===1||k===3||k===null?"focused":"dimmed"}`,children:[e.jsxs("div",{className:"card-top",children:[e.jsx("div",{className:"node-icon-wrapper pub-icon",children:e.jsx(Te,{size:18})}),e.jsxs("div",{className:"node-title-group",children:[e.jsx("div",{className:"node-role-tag",children:"ACTION CLIENT (Caller)"}),e.jsx("h3",{className:"node-name action-node-title",title:"/patrol_action_client",children:"patrol_action_client"}),e.jsx("div",{className:"node-class",children:"NavigateDistanceClient"})]}),e.jsx("div",{className:`status-dot ${t==="EXECUTING"?"online":t==="CANCELED"?"error":"paused"}`,title:t})]}),e.jsxs("div",{className:"card-code-snip",children:[e.jsx("span",{className:"code-fn",children:"client.send_goal_async"}),e.jsxs("span",{className:"code-args",children:["(NavigateDistance.Goal(target=",g,"m))"]})]}),e.jsxs("div",{className:"card-telemetry pub-telemetry",children:[e.jsxs("div",{className:"telemetry-item",children:[e.jsx("span",{className:"telemetry-label",children:"Target"}),e.jsxs("span",{className:"telemetry-val text-cyan",children:[g,".0 m"]})]}),e.jsxs("div",{className:"telemetry-item",children:[e.jsx("span",{className:"telemetry-label",children:"Received"}),e.jsxs("span",{className:"telemetry-val text-amber",children:["#",o.count]})]}),e.jsxs("div",{className:"telemetry-item",children:[e.jsx("span",{className:"telemetry-label",children:"Goal Status"}),e.jsx("span",{className:"telemetry-val font-mono",style:{color:t==="SUCCEEDED"?"#10b981":t==="CANCELED"?"#ef4444":t==="EXECUTING"?"#38bdf8":t==="GOAL_ACCEPTED"?"#a855f7":t==="SENDING_GOAL"?"#38bdf8":t==="SENDING_CANCEL"?"#f59e0b":"var(--text-muted)",fontSize:"0.68rem"},children:t==="EXECUTING"?"STATUS_EXECUTING":t==="GOAL_ACCEPTED"||t==="SENDING_GOAL"?"STATUS_ACCEPTED":t==="SENDING_CANCEL"?"STATUS_CANCELING":t==="SUCCEEDED"?"STATUS_SUCCEEDED":t==="CANCELED"?"STATUS_CANCELED":"STATUS_UNKNOWN"})]})]}),e.jsxs("div",{className:`client-feedback-terminal ${y?"cb-flash":""}`,children:[e.jsxs("div",{className:"client-fb-header",children:[e.jsx(ke,{size:12,className:"text-emerald"}),e.jsx("span",{className:"font-mono",children:"def feedback_callback(self, msg):"}),y&&e.jsx("span",{className:"cb-live-tag",children:"LIVE MSG"})]}),e.jsxs("div",{className:"client-fb-grid",children:[e.jsxs("div",{className:"client-fb-stat",children:[e.jsx("span",{className:"fb-key",children:"dist_rem:"}),e.jsx("span",{className:"fb-val text-emerald font-mono",children:t==="EXECUTING"||t==="SUCCEEDED"||t==="CANCELED"?`${o.distance_remaining.toFixed(1)} m`:"--"})]}),e.jsxs("div",{className:"client-fb-stat",children:[e.jsx("span",{className:"fb-key",children:"velocity:"}),e.jsx("span",{className:"fb-val text-cyan font-mono",children:t==="EXECUTING"?"1.40 m/s":"0.00 m/s"})]}),e.jsxs("div",{className:"client-fb-stat",children:[e.jsx("span",{className:"fb-key",children:"traversed:"}),e.jsx("span",{className:"fb-val text-purple font-mono",children:t==="EXECUTING"||t==="SUCCEEDED"||t==="CANCELED"?`${Math.max(0,g-o.distance_remaining).toFixed(1)} m`:"0.0 m"})]})]})]}),e.jsx("div",{className:"client-card-action-wrap",children:t==="EXECUTING"?e.jsxs("button",{className:"card-action-btn cancel-action-btn",onClick:n,title:"Preempt and cancel ongoing goal immediately",children:[e.jsx(as,{size:14}),e.jsx("span",{children:"Preempt Goal (Emergency Cancel)"})]}):e.jsxs("button",{className:"card-action-btn",onClick:m,disabled:t==="SENDING_GOAL"||t==="SENDING_RESULT",title:"Dispatch Action Goal to drive target distance",children:[e.jsx(ce,{size:14}),e.jsxs("span",{children:["Send Goal (",g,"m)"]})]})})]}),e.jsxs("div",{className:`diagram-pipeline action-pipeline-card ${k===2||k===4||k===null?"focused":"dimmed"}`,children:[e.jsxs("div",{className:"topic-badge",children:[e.jsx(de,{size:14,className:"text-cyan animate-pulse"}),e.jsxs("span",{className:"topic-name",children:["Action Bus: ",e.jsx("strong",{children:"/navigate_distance"})]}),e.jsx("span",{className:"topic-type",children:"NavigateDistance.action"})]}),e.jsxs("div",{className:"action-channel-strip goal-channel",children:[e.jsxs("div",{className:"channel-header-row",children:[e.jsxs("span",{className:"channel-tag goal-tag",children:[e.jsx(me,{size:11})," 1. GOAL SERVICE (Client ➔ Server)"]}),e.jsxs("span",{className:"channel-desc font-mono",children:["target: ",g,".0m"]})]}),e.jsxs("div",{className:"channel-wire",children:[e.jsx("div",{className:"wire-track",children:e.jsx("div",{className:"flow-chevrons flow-right",children:"› › › › › › › › › › › › › › › › › › › ›"})}),t==="SENDING_GOAL"&&e.jsx("div",{className:"sliding-action-packet slide-c2s",children:e.jsxs("span",{className:"action-packet-pill goal-pill",children:[e.jsx(qe,{size:10}),e.jsxs("span",{children:["Goal: NavigateDistance(target=",g,"m)"]})]})}),t==="SENDING_CANCEL"&&e.jsx("div",{className:"sliding-action-packet slide-c2s",style:{animationDuration:"1.5s"},children:e.jsxs("span",{className:"action-packet-pill cancel-pill",children:[e.jsx(as,{size:10}),e.jsx("span",{children:"CancelRequest(goal_id=0x82f1)"})]})}),t==="GOAL_ACCEPTED"&&e.jsxs("div",{className:"channel-accepted-badge animate-fade-in",children:[e.jsx(he,{size:11})," Goal Accepted (UUID: #0x82f1)"]})]})]}),e.jsxs("div",{className:"action-channel-strip feedback-channel",children:[e.jsxs("div",{className:"channel-header-row",children:[e.jsxs("span",{className:"channel-tag feedback-tag",children:[e.jsx(Ee,{size:11})," 2. FEEDBACK STREAM (Server ➔ Client · 4 Hz)"]}),e.jsxs("span",{className:"channel-desc font-mono",children:["rem: ",N.toFixed(1),"m"]})]}),e.jsxs("div",{className:"channel-wire",children:[e.jsx("div",{className:"wire-track",children:e.jsx("div",{className:"flow-chevrons flow-left",children:"‹ ‹ ‹ ‹ ‹ ‹ ‹ ‹ ‹ ‹ ‹ ‹ ‹ ‹ ‹ ‹ ‹ ‹ ‹ ‹"})}),c.map(_=>e.jsx("div",{className:"sliding-action-packet slide-feedback-stream",onAnimationEnd:()=>j(_),children:e.jsxs("span",{className:"action-packet-pill feedback-pill",children:[e.jsx(ke,{size:10}),e.jsxs("span",{children:["rem: ",_.dist,"m | 1.4m/s"]})]})},_.id))]})]}),e.jsxs("div",{className:"action-channel-strip result-channel",children:[e.jsxs("div",{className:"channel-header-row",children:[e.jsxs("span",{className:"channel-tag result-tag",children:[e.jsx(Ee,{size:11})," 3. RESULT SERVICE (Server ➔ Client)"]}),e.jsx("span",{className:"channel-desc font-mono",children:t==="SUCCEEDED"?"STATUS_SUCCEEDED":t==="CANCELED"?"STATUS_CANCELED":"Awaiting Completion"})]}),e.jsxs("div",{className:"channel-wire",children:[e.jsx("div",{className:"wire-track",children:e.jsx("div",{className:"flow-chevrons flow-left",children:"‹ ‹ ‹ ‹ ‹ ‹ ‹ ‹ ‹ ‹ ‹ ‹ ‹ ‹ ‹ ‹ ‹ ‹ ‹ ‹"})}),t==="SENDING_RESULT"&&e.jsx("div",{className:"sliding-action-packet slide-s2c",children:e.jsxs("span",{className:"action-packet-pill result-pill",children:[e.jsx(H,{size:10}),e.jsxs("span",{children:["Result: STATUS_SUCCEEDED (dist=",g,"m)"]})]})}),t==="SUCCEEDED"&&e.jsxs("div",{className:"channel-result-pill result-success animate-fade-in",children:[e.jsx(H,{size:11,className:"text-emerald"})," Result Delivered: STATUS_SUCCEEDED"]}),t==="CANCELED"&&e.jsxs("div",{className:"channel-result-pill result-canceled animate-fade-in",children:[e.jsx(as,{size:11})," Goal Preempted: STATUS_CANCELED"]})]})]}),e.jsxs("div",{className:"qos-badge-strip",children:[e.jsx("span",{className:"qos-chip",children:"1. Goal (RPC)"}),e.jsx("span",{className:"qos-chip",children:"2. Feedback (Stream)"}),e.jsx("span",{className:"qos-chip",children:"3. Result (RPC)"})]})]}),e.jsxs("div",{className:`diagram-card server-card action-node-card ${t==="EXECUTING"||t==="GOAL_ACCEPTED"?"pulse-border-green":""} ${k===1||k===2||k===null?"focused":"dimmed"}`,children:[e.jsxs("div",{className:"card-top",children:[e.jsx("div",{className:"node-icon-wrapper sub-icon",children:e.jsx(ue,{size:18})}),e.jsxs("div",{className:"node-title-group",children:[e.jsx("div",{className:"node-role-tag",children:"ACTION SERVER (Executor)"}),e.jsx("h3",{className:"node-name action-node-title",title:"/nav_action_server",children:"nav_action_server"}),e.jsx("div",{className:"node-class",children:"NavigateDistanceServer"})]}),e.jsx("div",{className:`status-dot ${t==="EXECUTING"?"online":t==="CANCELED"?"error":"active"}`,title:t})]}),e.jsxs("div",{className:"card-code-snip",children:[e.jsx("span",{className:"code-fn",children:"execute_callback"}),e.jsx("span",{className:"code-args",children:"(goal_handle) ➔ publish_feedback()"})]}),e.jsxs("div",{className:"card-telemetry sub-telemetry",children:[e.jsxs("div",{className:"telemetry-item",children:[e.jsx("span",{className:"telemetry-label",children:"Motor Drive"}),e.jsx("span",{className:"telemetry-val font-mono",style:{color:t==="EXECUTING"?"#10b981":"var(--text-muted)"},children:t==="EXECUTING"?"1.40 m/s":"0.00 m/s"})]}),e.jsxs("div",{className:"telemetry-item",children:[e.jsx("span",{className:"telemetry-label",children:"Preemption"}),e.jsx("span",{className:"telemetry-val font-mono",style:{color:t==="CANCELED"?"#ef4444":"#10b981"},children:t==="CANCELED"?"PREEMPTED":"CLEAR"})]}),e.jsxs("div",{className:"telemetry-item cb-telemetry-item",children:[e.jsx("span",{className:"telemetry-label",children:"Goal Status"}),e.jsx("span",{className:"telemetry-val font-mono",style:{color:t==="EXECUTING"||t==="SUCCEEDED"?"#10b981":t==="CANCELED"?"#ef4444":"var(--text-muted)",fontSize:"0.68rem"},children:t==="EXECUTING"?"STATUS_EXECUTING":t==="SUCCEEDED"?"STATUS_SUCCEEDED":t==="CANCELED"?"STATUS_CANCELED":"STATUS_UNKNOWN"})]})]}),e.jsxs("div",{className:"card-terminal-log action-server-log",children:[e.jsxs("div",{className:"log-header",children:[e.jsx(ke,{size:12,className:"text-green"}),e.jsx("span",{children:"Execution Loop Telemetry (10 Hz)"})]}),e.jsxs("div",{className:"log-content-wrap",children:[e.jsx("span",{className:`log-level-pill ${t==="CANCELED"?"log-level-error":""}`,children:t==="EXECUTING"?"[EXECUTING]":t==="CANCELED"?"[CANCELED]":t==="SUCCEEDED"?"[SUCCEEDED]":"[STANDBY]"}),e.jsx("span",{className:"log-text",children:t==="EXECUTING"?`Corridor trajectory active... Dist remaining: ${N.toFixed(1)}m`:t==="CANCELED"?"Preempt request accepted. Velocity cut to 0.0 m/s.":t==="SUCCEEDED"?`Target reached! Dispatched ${S} feedbacks.`:"Server listening on /navigate_distance. Ready for goal."})]})]}),e.jsx("div",{className:"server-status-footer-pill",children:e.jsx("span",{className:"status-indicator-tag",children:t==="EXECUTING"?"🟢 Control Loop Active · Ticking at 10 Hz":t==="GOAL_ACCEPTED"?"🟣 Goal Validated · Accepting Handle":t==="CANCELED"?"🔴 Goal Aborted · Preempt Callback Resolved":t==="SUCCEEDED"?"🟢 Goal Finalized · Result Published":"⚪ Standby · Ready for Action Goal"})})]})]}),e.jsxs("div",{className:"pubsub-controls-bar action-controls-bar",children:[e.jsx("div",{className:"controls-left",children:e.jsxs("button",{className:"control-btn",onClick:l,title:"Reset action simulation",children:[e.jsx(te,{size:15}),e.jsx("span",{children:"Reset Simulation"})]})}),e.jsx("div",{className:"controls-right",children:e.jsxs("div",{className:"rate-slider-group",children:[e.jsx(Be,{size:14,className:"text-muted"}),e.jsxs("label",{className:"slider-label",children:["Target Distance: ",e.jsxs("strong",{children:[g," m"]})]}),e.jsx("input",{type:"range",min:"5",max:"20",step:"1",value:g,disabled:t==="EXECUTING"||t==="SENDING_GOAL",onChange:_=>{const L=parseInt(_.target.value);T(L),P(L),h.current=L,b(z=>({...z,distance_remaining:L}))},className:"pubsub-slider"})]})})]}),e.jsxs("div",{className:"service-concept-summary",children:[e.jsxs("div",{className:"concept-card",children:[e.jsx("div",{className:"concept-icon goal-concept-icon",children:e.jsx(ce,{size:16})}),e.jsxs("div",{className:"concept-text",children:[e.jsx("strong",{children:"1. Goal Service (Client ➔ Server)"}),e.jsxs("p",{children:["The client requests a long-running goal (drive ",g,"m). The server validates the goal parameters and returns an accepted handle."]})]})]}),e.jsxs("div",{className:"concept-card",children:[e.jsx("div",{className:"concept-icon feedback-concept-icon",children:e.jsx(ke,{size:16})}),e.jsxs("div",{className:"concept-text",children:[e.jsx("strong",{children:"2. Feedback Stream (Server ➔ Client)"}),e.jsx("p",{children:"While the robot drives, the server continuously publishes real-time telemetry (distance remaining, velocity) at 4 Hz."})]})]}),e.jsxs("div",{className:"concept-card",children:[e.jsx("div",{className:"concept-icon cancel-concept-icon",children:e.jsx(as,{size:16})}),e.jsxs("div",{className:"concept-text",children:[e.jsx("strong",{children:"3. Mid-Flight Preemption (Client ➔ Server)"}),e.jsx("p",{children:"Unlike standard Services, an Action allows the client to abort a goal mid-flight if an emergency stop or obstacle occurs."})]})]}),e.jsxs("div",{className:"concept-card",children:[e.jsx("div",{className:"concept-icon result-concept-icon",children:e.jsx(H,{size:16})}),e.jsxs("div",{className:"concept-text",children:[e.jsx("strong",{children:"4. Result Service (Server ➔ Client)"}),e.jsx("p",{children:"When the robot reaches the target waypoint or aborts, the server returns the final status code and outcome packet."})]})]})]})]})}const Pe=[{id:"debug",name:"DEBUG",num:10,color:"#06b6d4",bg:"rgba(6, 182, 212, 0.08)",border:"#22d3ee",radius:175,icon:ha,desc:"Fine-grained internal diagnostics (raw encoder counts, loop timings, math matrices).",purpose:"Development & Bench Testing only. Never enabled in production fleets due to network/CPU flood."},{id:"info",name:"INFO",num:20,color:"#3b82f6",bg:"rgba(59, 130, 246, 0.10)",border:"#60a5fa",radius:140,icon:Ds,desc:"Standard operational milestones (node initialized, goal reached, state transitions).",purpose:"ROS 2 Default Level. Recommended for day-to-day robot operations."},{id:"warn",name:"WARN",num:30,color:"#f59e0b",bg:"rgba(245, 158, 11, 0.12)",border:"#fbbf24",radius:105,icon:ls,desc:"Unexpected anomalies or degraded states that do not stop the robot from operating.",purpose:"Recoverable conditions: Low battery alert (<20%), transient LiDAR packet drop, high CPU load."},{id:"error",name:"ERROR",num:40,color:"#f97316",bg:"rgba(249, 115, 22, 0.15)",border:"#fb923c",radius:70,icon:ga,desc:"Component failure or abort. The affected subsystem cannot continue its function.",purpose:"Actionable failures: Sensor serial disconnected, path planner aborted, TF lookup failure."},{id:"fatal",name:"FATAL",num:50,color:"#ef4444",bg:"rgba(239, 68, 68, 0.22)",border:"#f87171",radius:35,icon:va,desc:"Critical catastrophic failure. The node or physical hardware must shut down immediately.",purpose:"Safety hazards: Hardware E-Stop depressed, motor driver overcurrent, watch-dog bite."}],ks=[{level:"debug",levelNum:10,badgeColor:"#06b6d4",tag:"[DEBUG]",source:"[nexus_amr_base]",msg:"Encoder ticks L: 14209, R: 14212 | loop_dt: 19.8ms | wheel_slip: 0.01"},{level:"info",levelNum:20,badgeColor:"#3b82f6",tag:"[INFO] ",source:"[nexus_amr_base]",msg:"State changed: IDLE -> NAVIGATING_TO_WAYPOINT (Goal: Waypoint_Station_2)"},{level:"warn",levelNum:30,badgeColor:"#f59e0b",tag:"[WARN] ",source:"[battery_monitor]",msg:"Battery voltage at 19.8V (<20.0V threshold). Return-to-base timer initiated."},{level:"error",levelNum:40,badgeColor:"#f97316",tag:"[ERROR]",source:"[lidar_driver]",msg:"Packet header checksum failed on /dev/ttyUSB0! Skipping 1 scan frame."},{level:"fatal",levelNum:50,badgeColor:"#ef4444",tag:"[FATAL]",source:"[safety_controller]",msg:"HARDWARE E-STOP BUMPER TRIGGERED: EMERGENCY BRAKES ENGAGED! Node halting."}];function Lt(){const[t,s]=i.useState("info"),[a,x]=i.useState(!1),[g,T]=i.useState(null),N=Pe.find(c=>c.id===t)||Pe[1],P=g?Pe.find(c=>c.id===g):N,S=ks.filter(c=>c.levelNum>=N.num).length,I=ks.length-S,k=`ros2 run nexus_amr_basics logger_levels --ros-args --log-level ${t}`,R=()=>{navigator.clipboard.writeText(k).catch(()=>{}),x(!0),setTimeout(()=>x(!1),2e3)};return e.jsxs("div",{className:"log-circle-widget",children:[e.jsxs("div",{className:"log-widget-header",children:[e.jsxs("div",{className:"header-badge-row",children:[e.jsxs("div",{className:"badge-pill-cyan",children:[e.jsx(de,{size:14,className:"animate-pulse"}),e.jsx("span",{children:"Interactive Severity Hierarchy & Filtering"})]}),e.jsx("span",{className:"ros-standard-badge",children:"ROS 2 Logging Standard (rclpy)"})]}),e.jsx("h3",{className:"log-widget-title",children:"The Nested Severity Hierarchy: What Level Logs What?"}),e.jsxs("p",{className:"log-widget-subtitle",children:["ROS 2 loggers use a ",e.jsx("strong",{children:"hierarchical threshold filter"}),": when you set the logger to level ",e.jsx("em",{children:"L"}),", all messages with severity ",e.jsx("strong",{children:"≥ L"})," are emitted, while all messages below ",e.jsx("em",{children:"L"})," are automatically suppressed without CPU overhead."]})]}),e.jsxs("div",{className:"level-selector-bar",children:[e.jsxs("span",{className:"selector-label",children:[e.jsx(Be,{size:14})," Active Logger Threshold:"]}),e.jsx("div",{className:"selector-buttons",children:Pe.map(c=>{const r=t===c.id;return e.jsxs("button",{className:`level-choice-btn ${r?"active":""}`,style:{"--btn-accent":c.color,borderColor:r?c.color:void 0,boxShadow:r?`0 0 12px ${c.color}40`:void 0},onClick:()=>s(c.id),children:[e.jsx("span",{className:"btn-dot",style:{background:c.color}}),e.jsx("span",{className:"btn-name",children:c.name}),c.id==="info"&&e.jsx("span",{className:"default-pill",children:"Default"})]},c.id)})})]}),e.jsxs("div",{className:"log-widget-body",children:[e.jsxs("div",{className:"nested-circle-stage",children:[e.jsxs("div",{className:"circle-stage-header",children:[e.jsx("span",{className:"stage-title",children:"Concentric Severity Inclusions"}),e.jsx("span",{className:"stage-hint",children:"Hover or click any ring"})]}),e.jsxs("div",{className:"concentric-container",children:[e.jsxs("svg",{viewBox:"-200 -200 400 400",className:"concentric-svg",children:[e.jsxs("defs",{children:[e.jsx("pattern",{id:"suppressedHatch",width:"8",height:"8",patternTransform:"rotate(45 0 0)",patternUnits:"userSpaceOnUse",children:e.jsx("line",{x1:"0",y1:"0",x2:"0",y2:"8",stroke:"rgba(255,255,255,0.06)",strokeWidth:"1.5"})}),e.jsxs("filter",{id:"activeGlow",x:"-20%",y:"-20%",width:"140%",height:"140%",children:[e.jsx("feGaussianBlur",{stdDeviation:"4",result:"blur"}),e.jsx("feComposite",{in:"SourceGraphic",in2:"blur",operator:"over"})]})]}),Pe.map(c=>{const r=c.num>=N.num,o=g===c.id,b=N.id===c.id;return e.jsxs("g",{className:`circle-layer ${r?"layer-active":"layer-dimmed"}`,onMouseEnter:()=>T(c.id),onMouseLeave:()=>T(null),onClick:()=>s(c.id),style:{cursor:"pointer"},children:[e.jsx("circle",{cx:"0",cy:"0",r:c.radius,fill:r?c.bg:"rgba(15, 23, 42, 0.4)",stroke:c.color,strokeWidth:b?3:o?2.5:1.5,strokeDasharray:r?"none":"4 4",opacity:r?1:.25,filter:b?"url(#activeGlow)":void 0,className:"transition-all duration-300"}),!r&&e.jsx("circle",{cx:"0",cy:"0",r:c.radius,fill:"url(#suppressedHatch)",opacity:"0.8"}),e.jsx("text",{x:"0",y:-c.radius+16,textAnchor:"middle",fill:r?c.color:"#64748b",fontSize:c.id==="fatal"?11:12,fontWeight:"700",fontFamily:"var(--font-mono, monospace)",letterSpacing:"0.5px",opacity:r?1:.4,children:c.name})]},c.id)}),e.jsx("circle",{cx:"0",cy:"0",r:"14",fill:"#ef4444",opacity:N.num<=50?.9:.3}),e.jsx("text",{x:"0",y:"4",textAnchor:"middle",fill:"#ffffff",fontSize:"10",fontWeight:"900",children:"⚡"})]}),e.jsxs("div",{className:"diagram-status-legend",children:[e.jsxs("div",{className:"legend-tag active-legend",children:[e.jsx(H,{size:12,className:"text-green"}),e.jsxs("span",{children:["Active: ",e.jsxs("strong",{children:[S," Levels"]})]})]}),I>0&&e.jsxs("div",{className:"legend-tag suppressed-legend",children:[e.jsx(Oe,{size:12,className:"text-red"}),e.jsxs("span",{children:["Suppressed: ",e.jsxs("strong",{children:[I," Levels"]})]})]})]})]}),e.jsxs("div",{className:"active-level-inspector",style:{borderColor:P.color},children:[e.jsxs("div",{className:"inspector-head",children:[e.jsxs("span",{className:"inspector-badge",style:{background:P.color},children:[P.name," (Severity ",P.num,")"]}),e.jsx("span",{className:"inspector-status",children:P.num>=N.num?e.jsxs("span",{className:"text-green flex items-center gap-1",children:[e.jsx(H,{size:12})," Logged & Visible"]}):e.jsxs("span",{className:"text-muted flex items-center gap-1",children:[e.jsx(Oe,{size:12})," Filtered Out (Silent)"]})})]}),e.jsx("p",{className:"inspector-desc",children:P.desc}),e.jsxs("div",{className:"inspector-meta",children:[e.jsx("span",{className:"meta-label",children:"Guideline:"})," ",P.purpose]})]})]}),e.jsxs("div",{className:"terminal-simulator-stage",children:[e.jsxs("div",{className:"simulator-header",children:[e.jsxs("div",{className:"simulator-title-group",children:[e.jsx(ye,{size:15,className:"text-cyan"}),e.jsx("span",{className:"simulator-title",children:"Live Terminal Output Stream"})]}),e.jsxs("span",{className:"filter-mode-tag",children:["Threshold: ",e.jsx("strong",{style:{color:N.color},children:N.name})]})]}),e.jsxs("div",{className:"terminal-log-window",children:[e.jsxs("div",{className:"terminal-titlebar",children:[e.jsxs("div",{className:"term-dots",children:[e.jsx("span",{className:"dot dot-r"}),e.jsx("span",{className:"dot dot-y"}),e.jsx("span",{className:"dot dot-g"})]}),e.jsx("span",{className:"term-filename",children:"student@amr-cart: ~/ros2_ws (stdout)"})]}),e.jsx("div",{className:"terminal-logs-list",children:ks.map(c=>{const r=c.levelNum>=N.num;return e.jsxs("div",{className:`terminal-log-line ${r?"log-visible":"log-filtered"}`,children:[e.jsxs("div",{className:"log-line-meta",children:[e.jsx("span",{className:"log-level-badge",style:{color:r?c.badgeColor:"#475569",borderColor:r?`${c.badgeColor}60`:"#334155"},children:c.tag}),e.jsx("span",{className:"log-source",children:c.source})]}),e.jsx("div",{className:"log-body",children:e.jsx("span",{className:"log-message",children:c.msg})}),e.jsx("div",{className:"log-filter-state",children:r?e.jsxs("span",{className:"state-badge-passed",title:"Emitted to console & /rosout",children:[e.jsx(he,{size:11})," Printed"]}):e.jsxs("span",{className:"state-badge-filtered",title:"Suppressed by logger severity threshold",children:[e.jsx(Oe,{size:11})," Filtered"]})})]},c.level)})})]}),e.jsxs("div",{className:"cli-run-card",children:[e.jsx("div",{className:"cli-card-label",children:"Run Node with this Log Level:"}),e.jsxs("div",{className:"cli-code-row",children:[e.jsx("code",{className:"cli-code-text",children:k}),e.jsxs("button",{className:"cli-copy-btn",onClick:R,title:"Copy launch command to clipboard",children:[a?e.jsx(he,{size:13,className:"text-green"}):e.jsx($e,{size:13}),e.jsx("span",{children:a?"Copied!":"Copy"})]})]})]}),e.jsxs("div",{className:"log-takeaway-box",children:[e.jsx("div",{className:"takeaway-icon",children:e.jsx(Ds,{size:16,className:"text-cyan"})}),e.jsxs("div",{className:"takeaway-text",children:[e.jsx("strong",{children:"Key Rule:"})," Setting ",e.jsxs("code",{className:"inline-code",children:["--log-level ",N.id]})," emits all messages with severity ",e.jsxs("strong",{children:["≥ ",N.num]}),". To silence spammy debug logs in production, keep the default at ",e.jsx("code",{className:"inline-code",children:"info"})," or raise it to ",e.jsx("code",{className:"inline-code",children:"warn"}),"."]})]})]})]})]})}function Pt(){const[t,s]=i.useState("box"),[a,x]=i.useState(8),[g,T]=i.useState(.3),[N,P]=i.useState(.14),[S,I]=i.useState(.4),[k,R]=i.useState(.06),[c,r]=i.useState(.035),[o,b]=i.useState(.03),[y,E]=i.useState(.04),[C,d]=i.useState(.06),[u,v]=i.useState(!1),h=i.useMemo(()=>{const l=Math.max(.001,parseFloat(a)||.1);if(t==="box"){const j=Math.max(.001,parseFloat(g)||.1),w=Math.max(.001,parseFloat(N)||.1),_=Math.max(.001,parseFloat(S)||.1),L=l/12*(w*w+_*_),z=l/12*(j*j+_*_),M=l/12*(j*j+w*w);return{ixx:L,iyy:z,izz:M,ixy:0,ixz:0,iyz:0}}else if(t==="cylinder"){const j=Math.max(.001,parseFloat(k)||.05),w=Math.max(.001,parseFloat(c)||.05),_=l/12*(3*j*j+w*w),L=_,z=l/2*(j*j);return{ixx:_,iyy:L,izz:z,ixy:0,ixz:0,iyz:0}}else if(t==="sphere"){const j=Math.max(.001,parseFloat(o)||.03),w=2/5*l*j*j;return{ixx:w,iyy:w,izz:w,ixy:0,ixz:0,iyz:0}}else{const j=Math.max(.001,parseFloat(y)||.02),w=Math.max(j+.001,parseFloat(C)||.05),_=Math.max(.001,parseFloat(c)||.05),L=l/12*(3*(j*j+w*w)+_*_),z=L,M=l/2*(j*j+w*w);return{ixx:L,iyy:z,izz:M,ixy:0,ixz:0,iyz:0}}},[t,a,g,N,S,k,c,o,y,C]),p=i.useMemo(()=>`<inertial>
  <origin xyz="0 0 0" rpy="0 0 0"/>
  <mass value="${parseFloat(a).toFixed(3)}"/>
  <inertia ixx="${h.ixx.toFixed(6)}" ixy="0.0" ixz="0.0"
           iyy="${h.iyy.toFixed(6)}" iyz="0.0"
           izz="${h.izz.toFixed(6)}"/>
</inertial>`,[a,h]),m=()=>{navigator.clipboard.writeText(p).then(()=>{v(!0),setTimeout(()=>v(!1),2200)})},n=l=>{l==="chassis"?(s("box"),x(8),I(.4),T(.3),P(.14)):l==="wheel"?(s("cylinder"),x(.8),R(.06),r(.035)):l==="lidar"?(s("cylinder"),x(.15),R(.04),r(.04)):l==="camera"?(s("box"),x(.08),I(.025),T(.09),P(.025)):l==="caster"&&(s("sphere"),x(.3),b(.03))};return e.jsxs("div",{className:"inertia-calculator-card",style:{background:"linear-gradient(145deg, #0d1527 0%, #080d1a 100%)",borderRadius:"16px",border:"1px solid #1e293b",boxShadow:"0 8px 32px rgba(0,0,0,0.4)",padding:"24px",margin:"28px 0",color:"#e2e8f0",fontFamily:"system-ui, -apple-system, sans-serif"},children:[e.jsxs("div",{style:{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:"20px",borderBottom:"1px solid #1e293b",paddingBottom:"14px"},children:[e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"12px"},children:[e.jsx("div",{style:{width:"36px",height:"36px",borderRadius:"10px",background:"linear-gradient(135deg, #00e5ff 0%, #0284c7 100%)",display:"flex",alignItems:"center",justifyContent:"center",boxShadow:"0 0 16px rgba(0, 229, 255, 0.4)"},children:e.jsx("span",{style:{fontSize:"18px",fontWeight:"bold",color:"#090d16"},children:"I"})}),e.jsxs("div",{children:[e.jsx("h3",{style:{margin:0,fontSize:"18px",fontWeight:"700",color:"#f8fafc"},children:"Interactive URDF Inertia Tensor Calculator"}),e.jsx("span",{style:{fontSize:"12px",color:"#94a3b8"},children:"Physics-accurate principal moments of inertia for primitive link geometries"})]})]}),e.jsx("span",{style:{fontSize:"11px",fontWeight:"700",textTransform:"uppercase",padding:"4px 10px",borderRadius:"20px",background:"rgba(0, 229, 255, 0.1)",color:"#00e5ff",border:"1px solid rgba(0, 229, 255, 0.3)"},children:"ROS 2 / Gazebo Ready"})]}),e.jsxs("div",{style:{marginBottom:"20px"},children:[e.jsx("label",{style:{fontSize:"11px",fontWeight:"700",color:"#94a3b8",textTransform:"uppercase",letterSpacing:"0.5px",display:"block",marginBottom:"8px"},children:"Quick Robot Presets:"}),e.jsxs("div",{style:{display:"flex",gap:"8px",flexWrap:"wrap"},children:[e.jsx("button",{onClick:()=>n("chassis"),style:ze,children:"📦 AMR Chassis (8kg Box)"}),e.jsx("button",{onClick:()=>n("wheel"),style:ze,children:"⚙️ Drive Wheel (0.8kg Cyl)"}),e.jsx("button",{onClick:()=>n("lidar"),style:ze,children:"📡 2D LiDAR Puck (0.15kg)"}),e.jsx("button",{onClick:()=>n("camera"),style:ze,children:"📷 RGB Camera (0.08kg)"}),e.jsx("button",{onClick:()=>n("caster"),style:ze,children:"⚪ Caster Ball (0.3kg)"})]})]}),e.jsx("div",{style:{display:"flex",gap:"8px",marginBottom:"22px",borderBottom:"1px solid #1e293b",paddingBottom:"12px"},children:[{id:"box",label:"Solid Box (Cuboid)",icon:"📦"},{id:"cylinder",label:"Solid Cylinder",icon:"🥫"},{id:"sphere",label:"Solid Sphere",icon:"⚽"},{id:"hollow_cylinder",label:"Hollow Cylinder",icon:"⭕"}].map(l=>e.jsxs("button",{onClick:()=>s(l.id),style:{padding:"8px 16px",borderRadius:"8px",border:"none",cursor:"pointer",fontWeight:"600",fontSize:"13px",background:t===l.id?"#0284c7":"#1e293b",color:t===l.id?"#ffffff":"#94a3b8",transition:"all 0.2s ease",display:"flex",alignItems:"center",gap:"6px"},children:[e.jsx("span",{children:l.icon}),e.jsx("span",{children:l.label})]},l.id))}),e.jsxs("div",{style:{display:"grid",gridTemplateColumns:"repeat(auto-fit, minmax(200px, 1fr))",gap:"16px",marginBottom:"24px"},children:[e.jsxs("div",{style:re,children:[e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",marginBottom:"6px"},children:[e.jsx("span",{style:ie,children:"Mass (m)"}),e.jsxs("span",{style:le,children:[a," kg"]})]}),e.jsx("input",{type:"range",min:"0.01",max:"25",step:"0.01",value:a,onChange:l=>x(parseFloat(l.target.value)),style:{width:"100%",accentColor:"#00e5ff"}})]}),t==="box"&&e.jsxs(e.Fragment,{children:[e.jsxs("div",{style:re,children:[e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",marginBottom:"6px"},children:[e.jsx("span",{style:ie,children:"Length / X Depth (d)"}),e.jsxs("span",{style:le,children:[S," m"]})]}),e.jsx("input",{type:"range",min:"0.01",max:"1.5",step:"0.005",value:S,onChange:l=>I(parseFloat(l.target.value)),style:{width:"100%",accentColor:"#ef4444"}})]}),e.jsxs("div",{style:re,children:[e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",marginBottom:"6px"},children:[e.jsx("span",{style:ie,children:"Width / Y Lateral (w)"}),e.jsxs("span",{style:le,children:[g," m"]})]}),e.jsx("input",{type:"range",min:"0.01",max:"1.5",step:"0.005",value:g,onChange:l=>T(parseFloat(l.target.value)),style:{width:"100%",accentColor:"#10b981"}})]}),e.jsxs("div",{style:re,children:[e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",marginBottom:"6px"},children:[e.jsx("span",{style:ie,children:"Height / Z Vertical (h)"}),e.jsxs("span",{style:le,children:[N," m"]})]}),e.jsx("input",{type:"range",min:"0.01",max:"1.0",step:"0.005",value:N,onChange:l=>P(parseFloat(l.target.value)),style:{width:"100%",accentColor:"#3b82f6"}})]})]}),(t==="cylinder"||t==="hollow_cylinder")&&e.jsxs(e.Fragment,{children:[t==="cylinder"?e.jsxs("div",{style:re,children:[e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",marginBottom:"6px"},children:[e.jsx("span",{style:ie,children:"Radius (r)"}),e.jsxs("span",{style:le,children:[k," m"]})]}),e.jsx("input",{type:"range",min:"0.005",max:"0.5",step:"0.005",value:k,onChange:l=>R(parseFloat(l.target.value)),style:{width:"100%",accentColor:"#00e5ff"}})]}):e.jsxs(e.Fragment,{children:[e.jsxs("div",{style:re,children:[e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",marginBottom:"6px"},children:[e.jsx("span",{style:ie,children:"Inner Radius (r1)"}),e.jsxs("span",{style:le,children:[y," m"]})]}),e.jsx("input",{type:"range",min:"0.005",max:"0.3",step:"0.005",value:y,onChange:l=>E(parseFloat(l.target.value)),style:{width:"100%",accentColor:"#00e5ff"}})]}),e.jsxs("div",{style:re,children:[e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",marginBottom:"6px"},children:[e.jsx("span",{style:ie,children:"Outer Radius (r2)"}),e.jsxs("span",{style:le,children:[C," m"]})]}),e.jsx("input",{type:"range",min:"0.01",max:"0.5",step:"0.005",value:C,onChange:l=>d(parseFloat(l.target.value)),style:{width:"100%",accentColor:"#00e5ff"}})]})]}),e.jsxs("div",{style:re,children:[e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",marginBottom:"6px"},children:[e.jsx("span",{style:ie,children:"Length / Height (l)"}),e.jsxs("span",{style:le,children:[c," m"]})]}),e.jsx("input",{type:"range",min:"0.005",max:"0.5",step:"0.005",value:c,onChange:l=>r(parseFloat(l.target.value)),style:{width:"100%",accentColor:"#3b82f6"}})]})]}),t==="sphere"&&e.jsxs("div",{style:re,children:[e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",marginBottom:"6px"},children:[e.jsx("span",{style:ie,children:"Radius (r)"}),e.jsxs("span",{style:le,children:[o," m"]})]}),e.jsx("input",{type:"range",min:"0.005",max:"0.5",step:"0.005",value:o,onChange:l=>b(parseFloat(l.target.value)),style:{width:"100%",accentColor:"#00e5ff"}})]})]}),e.jsxs("div",{style:{display:"grid",gridTemplateColumns:"repeat(auto-fit, minmax(300px, 1fr))",gap:"20px"},children:[e.jsxs("div",{style:{background:"#090d16",padding:"16px",borderRadius:"12px",border:"1px solid #1e293b"},children:[e.jsx("div",{style:{fontSize:"11px",fontWeight:"700",color:"#94a3b8",textTransform:"uppercase",marginBottom:"10px"},children:"Computed Inertia Tensor Elements (kg·m²):"}),e.jsxs("div",{style:{display:"grid",gridTemplateColumns:"repeat(3, 1fr)",gap:"8px",textAlign:"center"},children:[e.jsxs("div",{style:oe,children:[e.jsx("div",{style:{fontSize:"11px",color:"#ef4444"},children:"Ixx (Roll)"}),e.jsx("div",{style:{fontSize:"14px",fontWeight:"bold",color:"#f8fafc"},children:h.ixx.toFixed(5)})]}),e.jsxs("div",{style:oe,children:[e.jsx("div",{style:{fontSize:"11px",color:"#94a3b8"},children:"Ixy"}),e.jsx("div",{style:{fontSize:"14px",fontWeight:"bold",color:"#64748b"},children:"0.00000"})]}),e.jsxs("div",{style:oe,children:[e.jsx("div",{style:{fontSize:"11px",color:"#94a3b8"},children:"Ixz"}),e.jsx("div",{style:{fontSize:"14px",fontWeight:"bold",color:"#64748b"},children:"0.00000"})]}),e.jsxs("div",{style:oe,children:[e.jsx("div",{style:{fontSize:"11px",color:"#94a3b8"},children:"Iyx"}),e.jsx("div",{style:{fontSize:"14px",fontWeight:"bold",color:"#64748b"},children:"0.00000"})]}),e.jsxs("div",{style:oe,children:[e.jsx("div",{style:{fontSize:"11px",color:"#10b981"},children:"Iyy (Pitch)"}),e.jsx("div",{style:{fontSize:"14px",fontWeight:"bold",color:"#f8fafc"},children:h.iyy.toFixed(5)})]}),e.jsxs("div",{style:oe,children:[e.jsx("div",{style:{fontSize:"11px",color:"#94a3b8"},children:"Iyz"}),e.jsx("div",{style:{fontSize:"14px",fontWeight:"bold",color:"#64748b"},children:"0.00000"})]}),e.jsxs("div",{style:oe,children:[e.jsx("div",{style:{fontSize:"11px",color:"#94a3b8"},children:"Izx"}),e.jsx("div",{style:{fontSize:"14px",fontWeight:"bold",color:"#64748b"},children:"0.00000"})]}),e.jsxs("div",{style:oe,children:[e.jsx("div",{style:{fontSize:"11px",color:"#94a3b8"},children:"Izy"}),e.jsx("div",{style:{fontSize:"14px",fontWeight:"bold",color:"#64748b"},children:"0.00000"})]}),e.jsxs("div",{style:oe,children:[e.jsx("div",{style:{fontSize:"11px",color:"#3b82f6"},children:"Izz (Yaw)"}),e.jsx("div",{style:{fontSize:"14px",fontWeight:"bold",color:"#f8fafc"},children:h.izz.toFixed(5)})]})]})]}),e.jsxs("div",{style:{background:"#090d16",padding:"16px",borderRadius:"12px",border:"1px solid #1e293b",position:"relative"},children:[e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"8px"},children:[e.jsx("span",{style:{fontSize:"11px",fontWeight:"700",color:"#00e5ff",textTransform:"uppercase"},children:"Generated URDF <inertial> Snippet"}),e.jsx("button",{onClick:m,style:{background:u?"#10b981":"#1e293b",color:u?"#ffffff":"#38bdf8",border:"1px solid "+(u?"#10b981":"#38bdf8"),borderRadius:"6px",padding:"4px 10px",fontSize:"11px",fontWeight:"600",cursor:"pointer",transition:"all 0.2s ease"},children:u?"✓ Copied to Clipboard!":"📋 Copy XML"})]}),e.jsx("pre",{style:{margin:0,padding:"12px",background:"#040711",borderRadius:"8px",color:"#a5f3fc",fontFamily:"monospace",fontSize:"12px",lineHeight:"1.5",overflowX:"auto",border:"1px solid #162032"},children:p})]})]})]})}const re={background:"#131c31",padding:"12px 14px",borderRadius:"8px",border:"1px solid #1e293b"},ie={fontSize:"12px",fontWeight:"600",color:"#94a3b8"},le={fontSize:"12px",fontWeight:"700",color:"#f8fafc"},ze={background:"#1e293b",color:"#cbd5e1",border:"1px solid #334155",borderRadius:"6px",padding:"5px 10px",fontSize:"11px",fontWeight:"600",cursor:"pointer",transition:"background 0.2s"},oe={background:"#131b2e",padding:"8px 4px",borderRadius:"6px",border:"1px solid #1e293b"},De={base_footprint:{name:"base_footprint",parentJoint:"None (Root Datum)",jointType:"root",rosPos:[0,0,0],rosRpy:[0,0,0],mass:"0.0 kg (Virtual)",inertia:"Ixx=0, Iyy=0, Izz=0",description:"Ground contact reference projection on floor (Z=0.0m). Used by Nav2 costmaps and footprint inflation.",color:"#06b6d4",category:"Kinematic Datum"},base_link:{name:"base_link",parentJoint:"base_footprint_joint (fixed)",jointType:"fixed",rosPos:[0,0,.06],rosRpy:[0,0,0],dimensions:"0.40m (L) x 0.30m (W) x 0.14m (H)",mass:"8.0 kg",inertia:"Ixx=0.073, Iyy=0.120, Izz=0.167",description:"Main structural chassis body. Origin is at the drive axle center line, elevated 0.06m above ground.",color:"#00c0e6",category:"Chassis"},left_wheel_link:{name:"left_wheel_link",parentJoint:"left_wheel_joint (continuous)",jointType:"continuous",axis:"Y-Axis [0 1 0]",rosPos:[0,.16,.06],rosRpy:[0,0,0],dimensions:"Radius=0.06m, Width=0.035m",mass:"0.8 kg",inertia:"Ixx=0.0008, Iyy=0.0008, Izz=0.0014",description:"Port-side actuated differential drive wheel. Continuous 360° rotation driven by motor velocity commands.",color:"#10b981",category:"Actuation"},right_wheel_link:{name:"right_wheel_link",parentJoint:"right_wheel_joint (continuous)",jointType:"continuous",axis:"Y-Axis [0 1 0]",rosPos:[0,-.16,.06],rosRpy:[0,0,0],dimensions:"Radius=0.06m, Width=0.035m",mass:"0.8 kg",inertia:"Ixx=0.0008, Iyy=0.0008, Izz=0.0014",description:"Starboard-side actuated differential drive wheel. Powered independently to provide differential steering.",color:"#10b981",category:"Actuation"},front_caster_link:{name:"front_caster_link",parentJoint:"front_caster_joint (fixed)",jointType:"fixed",rosPos:[.14,0,.03],rosRpy:[0,0,0],dimensions:"Sphere Radius=0.03m",mass:"0.3 kg",inertia:"Ixx=Iyy=Izz=0.0001",description:"Passive low-friction front support caster ball (mu1=0.001) preventing pitching while allowing multi-axis slip.",color:"#94a3b8",category:"Support"},rear_caster_link:{name:"rear_caster_link",parentJoint:"rear_caster_joint (fixed)",jointType:"fixed",rosPos:[-.14,0,.03],rosRpy:[0,0,0],dimensions:"Sphere Radius=0.03m",mass:"0.3 kg",inertia:"Ixx=Iyy=Izz=0.0001",description:"Passive low-friction rear support caster ball maintaining 3-point static equilibrium on flat facility floors.",color:"#94a3b8",category:"Support"},laser_frame:{name:"laser_frame",parentJoint:"laser_joint (fixed)",jointType:"fixed",rosPos:[.08,0,.22],rosRpy:[0,0,0],dimensions:"Cylinder Radius=0.04m, Height=0.04m",mass:"0.15 kg",inertia:"Ixx=Iyy=0.00008, Izz=0.00012",description:"2D Planar LiDAR sensor scanning 360° at 10Hz. Publishes sensor_msgs/LaserScan on topic /scan for SLAM & Nav2.",color:"#f59e0b",category:"Perception"},camera_link:{name:"camera_link",parentJoint:"camera_joint (fixed)",jointType:"fixed",rosPos:[.2,0,.08],rosRpy:[0,0,0],dimensions:"Box 0.025m x 0.09m x 0.025m",mass:"0.08 kg",inertia:"Ixx=0.00005, Iyy=0.00001, Izz=0.00005",description:"Student Challenge Asset: Modular RGB camera sensor macro (camera.xacro). Mounted on front chassis bumper to stream image frames and depth perception.",color:"#8b5cf6",category:"Student Challenge Asset"}};function zt(){const t=i.useRef(null),[s,a]=i.useState("base_link"),[x,g]=i.useState(()=>{if(typeof window<"u"){const d=window.location.search||"",u=window.location.hash||"";if(d.includes("solids=false")||u.includes("solids=false"))return!1}return!0}),[T,N]=i.useState(!0),[P,S]=i.useState(!0),[I,k]=i.useState(!0),[R,c]=i.useState(0),[r,o]=i.useState({}),b=i.useRef({scene:null,camera:null,renderer:null,controls:null,animFrameId:null,tfGroups:{},visualMeshes:[],leftWheelGroup:null,rightWheelGroup:null,lidarPuckGroup:null,treeLineMesh:null,raycaster:new rt,mouse:new xa}),y=(d,u,v)=>new Ce(-u,v,-d);i.useEffect(()=>{const d=t.current;if(!d)return;const u=d.clientWidth||800,v=520,h=new ba;h.background=new ya(659229);const p=new fa(40,u/v,.05,50);p.position.set(1.1,.9,1.2);const m=new ja({antialias:!0,alpha:!0,powerPreference:"high-performance"});m.setSize(u,v),m.setPixelRatio(Math.min(window.devicePixelRatio,2)),m.shadowMap.enabled=!0,m.shadowMap.type=Na,m.toneMapping=_a,m.toneMappingExposure=1.15,d.appendChild(m.domElement);const n=new Sa(p,m.domElement);n.enableDamping=!0,n.dampingFactor=.08,n.target.set(0,.12,0),n.minDistance=.4,n.maxDistance=4,n.maxPolarAngle=Math.PI/2+.05;const l=new wa(16777215,.85);h.add(l);const j=new ys(16777215,1.6);j.position.set(2,4,2),j.castShadow=!0,j.shadow.mapSize.width=1024,j.shadow.mapSize.height=1024,h.add(j);const w=new ys(440020,.6);w.position.set(-3,2,-3),h.add(w);const _=new ys(1976635,.4);_.position.set(0,-2,0),h.add(_);const L=new Ca(4,16,440020,1976635);L.position.y=0,h.add(L);const z=new ka(.55,.45),M=new we({color:0,transparent:!0,opacity:.45,depthWrite:!1}),B=new q(z,M);B.rotation.x=-Math.PI/2,B.position.set(0,.001,0),h.add(B);const D=new X;h.add(D);const f=[],A={},$=(W=.1)=>{const K=new X,Se=W,ae=W*.28,ee=Se-ae,ge=W*.035,Q=W*.08,bs=(Jt,Zt)=>{const ss=new X,ea=new ve(ge,ge,ee,12),Zs=new we({color:Zt}),et=new q(ea,Zs);et.position.y=ee/2,ss.add(et);const sa=new Ia(Q,ae,16),st=new q(sa,Zs);st.position.y=ee+ae/2,ss.add(st);const ta=new Ce(0,1,0),aa=new Aa().setFromUnitVectors(ta,Jt.clone().normalize());return ss.quaternion.copy(aa),ss},Vt=bs(new Ce(0,0,-1),15680580),Kt=bs(new Ce(-1,0,0),1096065),Qt=bs(new Ce(0,1,0),3900150);K.add(Vt),K.add(Kt),K.add(Qt);const Yt=new it(W*.07,12,12),Xt=new we({color:16777215});return K.add(new q(Yt,Xt)),K},F=new X;F.position.set(0,0,0),D.add(F);const O=$(.12);F.add(O),A.base_footprint=O;const U=new X;U.position.copy(y(0,0,.06)),D.add(U);const J=$(.14);U.add(J),A.base_link=J;const G=new ns(.3,.14,.4),Y=new pe({color:49382,metalness:.65,roughness:.25,envMapIntensity:1}),V=new q(G,Y);V.position.set(0,.07,0),V.castShadow=!0,V.receiveShadow=!0,V.userData={linkName:"base_link"},U.add(V),f.push(V);const Re=new ns(.28,.005,.38),ds=new pe({color:1120295,roughness:.8}),Ie=new q(Re,ds);Ie.position.set(0,.141,0),U.add(Ie),f.push(Ie);const We=new ns(.22,.015,.005),Ue=new we({color:58879}),Ae=new q(We,Ue);Ae.position.set(0,.04,-.201),U.add(Ae),f.push(Ae);const Z=new X;Z.position.copy(y(0,.16,.06)),D.add(Z);const Ms=$(.09);Z.add(Ms),A.left_wheel_link=Ms;const ps=new ve(.06,.06,.035,32);ps.rotateZ(Math.PI/2);const Os=new pe({color:1579035,roughness:.9,metalness:.1}),He=new q(ps,Os);He.castShadow=!0,He.userData={linkName:"left_wheel_link"},Z.add(He),f.push(He);const ms=new ve(.038,.038,.036,16);ms.rotateZ(Math.PI/2);const Fs=new pe({color:3718648,metalness:.8,roughness:.3}),$s=new q(ms,Fs);Z.add($s),f.push($s);const je=new X;je.position.copy(y(0,-.16,.06)),D.add(je);const Gs=$(.09);je.add(Gs),A.right_wheel_link=Gs;const Ve=new q(ps,Os);Ve.castShadow=!0,Ve.userData={linkName:"right_wheel_link"},je.add(Ve),f.push(Ve);const Bs=new q(ms,Fs);je.add(Bs),f.push(Bs);const Ke=new X;Ke.position.copy(y(.14,0,.03)),D.add(Ke);const qs=$(.08);Ke.add(qs),A.front_caster_link=qs;const Ws=new it(.03,24,24),Us=new pe({color:14870768,metalness:.95,roughness:.15}),Qe=new q(Ws,Us);Qe.castShadow=!0,Qe.userData={linkName:"front_caster_link"},Ke.add(Qe),f.push(Qe);const Ye=new X;Ye.position.copy(y(-.14,0,.03)),D.add(Ye);const Hs=$(.08);Ye.add(Hs),A.rear_caster_link=Hs;const Xe=new q(Ws,Us);Xe.castShadow=!0,Xe.userData={linkName:"rear_caster_link"},Ye.add(Xe),f.push(Xe);const Le=new X;Le.position.copy(y(.08,0,.22)),D.add(Le);const Vs=$(.11);Le.add(Vs),A.laser_frame=Vs;const Dt=new ve(.045,.045,.02,28),Mt=new pe({color:16347926,roughness:.4}),Je=new q(Dt,Mt);Je.position.y=-.01,Je.userData={linkName:"laser_frame"},Le.add(Je),f.push(Je);const Ne=new X;Le.add(Ne);const Ot=new ve(.04,.04,.025,28),Ft=new pe({color:1120295,roughness:.3,metalness:.5}),Ze=new q(Ot,Ft);Ze.position.y=.0125,Ze.userData={linkName:"laser_frame"},Ne.add(Ze),f.push(Ze);const $t=new ve(.041,.041,.008,28),Gt=new we({color:15680580}),us=new q($t,Gt);us.position.y=.0125,Ne.add(us),f.push(us);const _e=new X;_e.position.copy(y(.2,0,.08)),D.add(_e);const Ks=$(.09);_e.add(Ks),A.camera_link=Ks;const Bt=new ns(.09,.025,.025),qt=new pe({color:3223169,roughness:.4,metalness:.7}),es=new q(Bt,qt);es.castShadow=!0,es.userData={linkName:"camera_link"},_e.add(es),f.push(es);const hs=new ve(.007,.007,.005,16);hs.rotateX(Math.PI/2);const Qs=new we({color:3718648}),gs=new q(hs,Qs);gs.position.set(-.025,0,-.013),_e.add(gs);const vs=new q(hs,Qs);vs.position.set(.025,0,-.013),_e.add(vs),f.push(gs,vs);const Wt=[y(0,0,0),y(0,0,.06),y(0,0,.06),y(0,.16,.06),y(0,0,.06),y(0,-.16,.06),y(0,0,.06),y(.14,0,.03),y(0,0,.06),y(-.14,0,.03),y(0,0,.06),y(.08,0,.22),y(0,0,.06),y(.2,0,.08)],Ut=new Ea().setFromPoints(Wt),Ht=new Ta({color:440020,dashSize:.025,gapSize:.015,linewidth:1.5,transparent:!0,opacity:.75}),xs=new Ra(Ut,Ht);xs.computeLineDistances(),h.add(xs),b.current={scene:h,camera:p,renderer:m,controls:n,animFrameId:null,tfGroups:A,visualMeshes:f,leftWheelGroup:Z,rightWheelGroup:je,lidarPuckGroup:Ne,treeLineMesh:xs,raycaster:new rt},f.forEach(W=>{W.visible=x});const Ys=()=>{b.current.animFrameId=requestAnimationFrame(Ys),n.update(),Ne&&(Ne.rotation.y+=.04);const W={};Object.keys(De).forEach(K=>{const Se=A[K];if(Se){const ae=new Ce;Se.getWorldPosition(ae),ae.y+=.025;const ee=ae.project(p);if(ee.z<1){const ge=(ee.x*.5+.5)*u,Q=(-(ee.y*.5)+.5)*v;W[K]={x:ge,y:Q,visible:!0}}else W[K]={visible:!1}}}),o(W),m.render(h,p)};Ys();const Xs=W=>{const K=m.domElement.getBoundingClientRect(),Se=(W.clientX-K.left)/K.width*2-1,ae=-((W.clientY-K.top)/K.height)*2+1,ee=b.current.raycaster;ee.setFromCamera({x:Se,y:ae},p);const ge=ee.intersectObjects(f.filter(Q=>Q.visible),!0);if(ge.length>0){let Q=ge[0].object;for(;Q&&!Q.userData.linkName&&Q.parent;)Q=Q.parent;Q&&Q.userData.linkName&&a(Q.userData.linkName)}};m.domElement.addEventListener("click",Xs);const Js=()=>{if(!d)return;const W=d.clientWidth;p.aspect=W/v,p.updateProjectionMatrix(),m.setSize(W,v)};return window.addEventListener("resize",Js),()=>{window.removeEventListener("resize",Js),b.current.animFrameId&&cancelAnimationFrame(b.current.animFrameId),m.domElement&&(m.domElement.removeEventListener("click",Xs),d.removeChild(m.domElement)),m.dispose()}},[]),i.useEffect(()=>{const{visualMeshes:d}=b.current;d&&d.forEach(u=>{u.visible=x})},[x]),i.useEffect(()=>{const{tfGroups:d}=b.current;d&&Object.values(d).forEach(u=>{u.visible=T})},[T]),i.useEffect(()=>{const{treeLineMesh:d}=b.current;d&&(d.visible=I)},[I]),i.useEffect(()=>{const{leftWheelGroup:d,rightWheelGroup:u}=b.current;!d||!u||(d.rotation.x=R,u.rotation.x=R)},[R]);const E=d=>{const{camera:u,controls:v}=b.current;!u||!v||(d==="iso"?(u.position.set(1.1,.9,1.2),v.target.set(0,.12,0)):d==="top"?(u.position.set(0,2,.001),v.target.set(0,0,0)):d==="front"?(u.position.set(0,.25,-1.5),v.target.set(0,.12,0)):d==="side"&&(u.position.set(-1.6,.25,0),v.target.set(0,.12,0)),v.update())},C=De[s]||De.base_link;return e.jsxs("div",{className:"interactive-urdf-viewer-container",style:{margin:"2rem 0",borderRadius:"14px",border:"1px solid var(--border-color)",overflow:"hidden",background:"#0a0f1d",boxShadow:"0 20px 40px rgba(0, 0, 0, 0.45)",fontFamily:"var(--font-sans, system-ui, sans-serif)"},children:[e.jsxs("div",{style:{background:"linear-gradient(135deg, rgba(6, 182, 212, 0.15) 0%, rgba(14, 165, 233, 0.08) 100%)",padding:"0.9rem 1.4rem",borderBottom:"1px solid rgba(255, 255, 255, 0.08)",display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:"0.75rem"},children:[e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"0.65rem"},children:[e.jsx("div",{style:{width:"32px",height:"32px",borderRadius:"8px",background:"rgba(6, 182, 212, 0.2)",border:"1px solid rgba(6, 182, 212, 0.4)",display:"flex",alignItems:"center",justifyContent:"center",color:"#06b6d4"},children:e.jsx(Te,{size:18})}),e.jsxs("div",{children:[e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"0.5rem"},children:[e.jsx("span",{style:{fontSize:"0.72rem",fontWeight:700,textTransform:"uppercase",letterSpacing:"0.05em",color:"#06b6d4"},children:"Interactive 3D WebGL Digital Twin"}),e.jsx("span",{style:{fontSize:"0.68rem",padding:"1px 6px",borderRadius:"4px",background:"rgba(16, 185, 129, 0.15)",color:"#10b981",border:"1px solid rgba(16, 185, 129, 0.3)",fontWeight:600},children:"REP 103 TF ACTIVE"})]}),e.jsx("h3",{style:{margin:0,fontSize:"1.15rem",fontWeight:700,color:"#f8fafc"},children:"Nexus AMR — Live URDF & TF Kinematics Visualizer"})]})]}),e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"0.4rem"},children:[e.jsx("span",{style:{fontSize:"0.75rem",color:"#94a3b8",marginRight:"0.2rem"},children:"Views:"}),["iso","front","side","top"].map(d=>e.jsx("button",{onClick:()=>E(d),style:{background:"rgba(255, 255, 255, 0.05)",border:"1px solid rgba(255, 255, 255, 0.12)",color:"#cbd5e1",padding:"0.3rem 0.65rem",borderRadius:"6px",fontSize:"0.75rem",cursor:"pointer",fontWeight:600,textTransform:"capitalize",transition:"all 0.15s ease"},onMouseEnter:u=>u.currentTarget.style.background="rgba(6, 182, 212, 0.25)",onMouseLeave:u=>u.currentTarget.style.background="rgba(255, 255, 255, 0.05)",children:d==="iso"?"Isometric":d},d)),e.jsx("button",{onClick:()=>E("iso"),title:"Reset Camera View",style:{background:"rgba(255, 255, 255, 0.05)",border:"1px solid rgba(255, 255, 255, 0.12)",color:"#94a3b8",padding:"0.3rem 0.5rem",borderRadius:"6px",cursor:"pointer"},children:e.jsx(te,{size:14})})]})]}),e.jsxs("div",{style:{background:"rgba(15, 23, 42, 0.85)",padding:"0.6rem 1.2rem",borderBottom:"1px solid rgba(255, 255, 255, 0.06)",display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:"0.75rem",fontSize:"0.8rem"},children:[e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"0.85rem",flexWrap:"wrap"},children:[e.jsx("span",{style:{color:"#06b6d4",fontWeight:700,fontSize:"0.76rem",textTransform:"uppercase",letterSpacing:"0.04em"},children:"Display Toggles:"}),e.jsxs("label",{style:{display:"flex",alignItems:"center",gap:"0.35rem",color:"#cbd5e1",cursor:"pointer"},children:[e.jsx("input",{type:"checkbox",checked:x,onChange:d=>g(d.target.checked),style:{accentColor:"#06b6d4"}}),e.jsx("span",{style:{fontWeight:600},children:"Solid Bodies"})]}),e.jsxs("label",{style:{display:"flex",alignItems:"center",gap:"0.35rem",color:"#cbd5e1",cursor:"pointer"},children:[e.jsx("input",{type:"checkbox",checked:T,onChange:d=>N(d.target.checked),style:{accentColor:"#06b6d4"}}),e.jsx("span",{style:{fontWeight:600},children:"TF Trihedrons (REP 103)"})]}),e.jsxs("label",{style:{display:"flex",alignItems:"center",gap:"0.35rem",color:"#cbd5e1",cursor:"pointer"},children:[e.jsx("input",{type:"checkbox",checked:P,onChange:d=>S(d.target.checked),style:{accentColor:"#06b6d4"}}),e.jsx("span",{children:"Frame Badges"})]}),e.jsxs("label",{style:{display:"flex",alignItems:"center",gap:"0.35rem",color:"#cbd5e1",cursor:"pointer"},children:[e.jsx("input",{type:"checkbox",checked:I,onChange:d=>k(d.target.checked),style:{accentColor:"#06b6d4"}}),e.jsx("span",{children:"Kinematic Parent Lines"})]})]}),e.jsxs("div",{style:{fontSize:"0.74rem",color:"#94a3b8"},children:[e.jsx("span",{children:"Active Model: "}),e.jsx("span",{style:{color:"#38bdf8",fontFamily:"var(--font-mono)"},children:"nexus_amr.urdf.xacro"})]})]}),e.jsxs("div",{style:{position:"relative",width:"100%",height:"520px",overflow:"hidden"},children:[e.jsx("div",{ref:t,style:{width:"100%",height:"100%",cursor:"grab"}}),P&&T&&Object.keys(r).map(d=>{const u=r[d];if(!u||!u.visible)return null;const v=s===d;return e.jsx("div",{onClick:()=>a(d),style:{position:"absolute",left:`${u.x}px`,top:`${u.y}px`,transform:"translate(-50%, -100%)",background:v?"#06b6d4":"rgba(15, 23, 42, 0.85)",color:v?"#0a0f1d":"#f1f5f9",border:`1px solid ${v?"#22d3ee":"rgba(255, 255, 255, 0.2)"}`,backdropFilter:"blur(4px)",padding:"2px 7px",borderRadius:"4px",fontSize:"0.72rem",fontFamily:"var(--font-mono, monospace)",fontWeight:700,pointerEvents:"auto",cursor:"pointer",zIndex:v?20:10,boxShadow:v?"0 0 12px rgba(6, 182, 212, 0.6)":"0 2px 4px rgba(0,0,0,0.5)",transition:"background 0.15s ease, transform 0.15s ease",userSelect:"none"},children:d},d)}),e.jsxs("div",{style:{position:"absolute",top:"12px",left:"14px",width:"320px",background:"rgba(10, 15, 29, 0.88)",backdropFilter:"blur(10px)",border:"1px solid rgba(255, 255, 255, 0.12)",borderRadius:"10px",padding:"0.9rem 1.1rem",color:"#e2e8f0",fontSize:"0.8rem",pointerEvents:"auto",boxShadow:"0 8px 24px rgba(0, 0, 0, 0.6)",zIndex:15},children:[e.jsxs("div",{style:{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:"0.4rem"},children:[e.jsxs("span",{style:{fontSize:"0.7rem",textTransform:"uppercase",letterSpacing:"0.04em",fontWeight:700,color:C.color},children:["Link Inspector: ",C.category]}),e.jsx("span",{style:{fontFamily:"var(--font-mono, monospace)",fontSize:"0.72rem",color:"#94a3b8",background:"rgba(255,255,255,0.06)",padding:"1px 6px",borderRadius:"4px"},children:C.jointType})]}),e.jsxs("h4",{style:{margin:"0 0 0.5rem 0",fontSize:"1.05rem",fontWeight:700,color:"#38bdf8",fontFamily:"var(--font-mono, monospace)",display:"flex",alignItems:"center",gap:"0.4rem"},children:[e.jsx("span",{children:"🔗"})," ",C.name]}),e.jsxs("div",{style:{display:"grid",gridTemplateColumns:"85px 1fr",gap:"0.3rem",fontSize:"0.76rem",marginBottom:"0.55rem"},children:[e.jsx("span",{style:{color:"#94a3b8"},children:"Parent Joint:"}),e.jsx("span",{style:{fontFamily:"var(--font-mono)",color:"#cbd5e1"},children:C.parentJoint}),e.jsx("span",{style:{color:"#94a3b8"},children:"ROS Position:"}),e.jsxs("span",{style:{fontFamily:"var(--font-mono)",color:"#f59e0b"},children:["[",C.rosPos.map(d=>d.toFixed(2)).join(", "),"] m"]}),C.axis&&e.jsxs(e.Fragment,{children:[e.jsx("span",{style:{color:"#94a3b8"},children:"Revolute Axis:"}),e.jsx("span",{style:{fontFamily:"var(--font-mono)",color:"#10b981"},children:C.axis})]}),e.jsx("span",{style:{color:"#94a3b8"},children:"Mass (kg):"}),e.jsx("span",{style:{fontFamily:"var(--font-mono)",color:"#cbd5e1"},children:C.mass}),e.jsx("span",{style:{color:"#94a3b8"},children:"Inertia Tensor:"}),e.jsx("span",{style:{fontFamily:"var(--font-mono)",color:"#94a3b8"},children:C.inertia})]}),e.jsx("p",{style:{margin:0,fontSize:"0.74rem",color:"#94a3b8",lineHeight:1.45,borderTop:"1px solid rgba(255,255,255,0.08)",paddingTop:"0.45rem"},children:C.description})]}),e.jsxs("div",{style:{position:"absolute",bottom:"12px",left:"14px",background:"rgba(10, 15, 29, 0.85)",backdropFilter:"blur(8px)",border:"1px solid rgba(255, 255, 255, 0.12)",borderRadius:"8px",padding:"0.55rem 0.9rem",display:"flex",alignItems:"center",gap:"0.85rem",fontSize:"0.75rem",fontFamily:"var(--font-mono, monospace)",zIndex:15},children:[e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"0.35rem"},children:[e.jsx("span",{style:{width:"9px",height:"9px",borderRadius:"50%",background:"#ef4444"}}),e.jsx("strong",{style:{color:"#ef4444"},children:"+X: Forward"})]}),e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"0.35rem"},children:[e.jsx("span",{style:{width:"9px",height:"9px",borderRadius:"50%",background:"#10b981"}}),e.jsx("strong",{style:{color:"#10b981"},children:"+Y: Port Left"})]}),e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"0.35rem"},children:[e.jsx("span",{style:{width:"9px",height:"9px",borderRadius:"50%",background:"#3b82f6"}}),e.jsx("strong",{style:{color:"#3b82f6"},children:"+Z: Upward"})]})]}),e.jsxs("div",{style:{position:"absolute",bottom:"12px",right:"14px",background:"rgba(10, 15, 29, 0.88)",backdropFilter:"blur(8px)",border:"1px solid rgba(255, 255, 255, 0.12)",borderRadius:"8px",padding:"0.65rem 1rem",display:"flex",alignItems:"center",gap:"0.8rem",zIndex:15},children:[e.jsx(Be,{size:16,color:"#06b6d4"}),e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"0.2rem"},children:[e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",fontSize:"0.72rem",color:"#cbd5e1"},children:[e.jsx("span",{children:"Drive Joint Angle:"}),e.jsxs("span",{style:{fontFamily:"var(--font-mono)",color:"#06b6d4",fontWeight:700},children:[(R*180/Math.PI).toFixed(0),"°"]})]}),e.jsx("input",{type:"range",min:-Math.PI*2,max:Math.PI*2,step:.05,value:R,onChange:d=>c(parseFloat(d.target.value)),style:{width:"130px",accentColor:"#06b6d4"}})]}),e.jsx("button",{onClick:()=>c(0),title:"Reset Wheel Angle",style:{background:"rgba(255, 255, 255, 0.08)",border:"1px solid rgba(255,255,255,0.15)",color:"#94a3b8",padding:"0.25rem 0.5rem",borderRadius:"4px",cursor:"pointer",fontSize:"0.7rem"},children:"Reset"})]}),e.jsx("div",{style:{position:"absolute",top:"12px",right:"14px",background:"rgba(10, 15, 29, 0.7)",border:"1px solid rgba(255, 255, 255, 0.08)",borderRadius:"6px",padding:"3px 8px",fontSize:"0.7rem",color:"#64748b",pointerEvents:"none",zIndex:10},children:"🖱️ Left Click: Rotate • Right Click: Pan • Scroll: Zoom"})]}),e.jsxs("div",{style:{background:"rgba(15, 23, 42, 0.95)",padding:"0.65rem 1.2rem",borderTop:"1px solid rgba(255, 255, 255, 0.08)",display:"flex",alignItems:"center",gap:"0.45rem",overflowX:"auto",scrollbarWidth:"thin"},children:[e.jsx("span",{style:{fontSize:"0.74rem",color:"#94a3b8",flexShrink:0,marginRight:"0.3rem"},children:"Kinematic Links:"}),Object.keys(De).map(d=>{const u=s===d,v=De[d];return e.jsxs("button",{onClick:()=>a(d),style:{background:u?"rgba(6, 182, 212, 0.2)":"rgba(255, 255, 255, 0.04)",border:`1px solid ${u?"#06b6d4":"rgba(255, 255, 255, 0.1)"}`,color:u?"#38bdf8":"#94a3b8",borderRadius:"6px",padding:"0.25rem 0.6rem",fontSize:"0.74rem",fontFamily:"var(--font-mono, monospace)",fontWeight:u?700:500,cursor:"pointer",flexShrink:0,display:"flex",alignItems:"center",gap:"0.35rem",transition:"all 0.15s ease"},children:[e.jsx("span",{style:{width:"6px",height:"6px",borderRadius:"50%",background:v.color}}),d]},d)})]})]})}function Qa({lesson:t,onSelectLesson:s,onNavigateHub:a,isCompleted:x,onToggleComplete:g,savedScore:T,onRecordScore:N}){const P=i.useRef(null),[S,I]=i.useState(null),[k,R]=i.useState(null),[c,r]=i.useState(null),[o,b]=i.useState(null),[y,E]=i.useState(null),[C,d]=i.useState(null),[u,v]=i.useState(null),[h,p]=i.useState(null),[m,n]=i.useState(null),[l,j]=i.useState(null);return i.useEffect(()=>{const w=L=>{const z=L.target.closest("img");if(z){if(z.closest(".image-lightbox-overlay")||z.closest(".nav-logo")||z.closest(".status-icon")||z.closest(".user-avatar"))return;L.preventDefault(),L.stopPropagation(),j({src:z.currentSrc||z.src,alt:z.alt||"High-Resolution Diagram View",caption:z.getAttribute("title")||z.alt||""})}},_=L=>{L.key==="Escape"&&j(null)};return document.addEventListener("click",w),window.addEventListener("keydown",_),()=>{document.removeEventListener("click",w),window.removeEventListener("keydown",_)}},[]),i.useEffect(()=>(l?document.body.style.overflow="hidden":document.body.style.overflow="",()=>{document.body.style.overflow=""}),[l]),i.useEffect(()=>{I(null),R(null),r(null),b(null),E(null),d(null),v(null),p(null),n(null),I(document.getElementById("interactive-permission-calculator-root")),R(document.getElementById("turtlesim-teleop-flow-root")),r(document.getElementById("package-structure-flow-root")),b(document.getElementById("pubsub-flow-root")),E(document.getElementById("service-flow-root")),d(document.getElementById("action-flow-root")),v(document.getElementById("log-levels-circle-root")),p(document.getElementById("interactive-inertia-calculator-root")),n(document.getElementById("interactive-urdf-viewer-root"))},[t.id,t.html_content]),i.useEffect(()=>{window.scrollTo({top:0,behavior:"smooth"})},[t.id]),i.useEffect(()=>{if(!P.current)return;P.current.querySelectorAll("img").forEach(L=>{L.classList.add("lesson-image");const z=L.parentElement;z&&z.tagName.toLowerCase()==="p"&&z.classList.add("lesson-image-wrapper")}),P.current.querySelectorAll("pre").forEach(L=>{let z=L.querySelector("code");if(!z){const F=document.createElement("code");F.innerHTML=L.innerHTML,L.innerHTML="",L.appendChild(F),z=F}let M=L.closest(".ide-code-window");const B=L.closest(".code-container");let D="code";if(z.classList.forEach(F=>{F.startsWith("language-")&&(D=F.replace("language-","").toLowerCase())}),D==="code"&&B&&B.getAttribute("data-language")&&(D=B.getAttribute("data-language").toLowerCase()),!z.classList.contains("hljs")&&D!=="filepath"&&D!=="text"){const F=z.textContent||"";if(D&&xe.getLanguage(D))try{const O=xe.highlight(F,{language:D,ignoreIllegals:!0});z.innerHTML=O.value,z.classList.add("hljs")}catch{xe.highlightElement(z)}else xe.highlightElement(z)}if(!M)if(B)B.classList.add("ide-code-window"),M=B;else{const F=document.createElement("div");F.className="ide-code-window",L.parentNode.insertBefore(F,L),F.appendChild(L),M=F}let f=M.querySelector(".ide-header, .code-header");f?f.className="ide-header":(f=document.createElement("div"),f.className="ide-header",M.insertBefore(f,L));const A=D==="bash"?"bash — terminal":D==="filepath"?"filepath — workspace":D==="python"?"python — script":D==="json"?"json — config":D==="xml"?"xml / urdf":D==="yaml"?"yaml — config":D==="text"?"output / log":D,$=D==="bash"?"❯_":D==="filepath"?"📁":D==="python"?"🐍":D==="json"?"{ }":D==="xml"?"</>":D==="yaml"?"⚙️":D==="text"?"📋":"📄";f.innerHTML=`
        <div class="ide-controls">
          <span class="ide-dot ide-dot-red"></span>
          <span class="ide-dot ide-dot-yellow"></span>
          <span class="ide-dot ide-dot-green"></span>
        </div>
        <div class="ide-tab">
          <span class="ide-tab-icon">${$}</span>
          <span class="ide-tab-name">${A}</span>
        </div>
        <button class="copy-code-btn" title="Copy code snippet">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
          </svg>
          <span>Copy</span>
        </button>
      `})},[t.id,t.html_content]),i.useEffect(()=>{if(!P.current)return;const w=z=>{const M=z.target.closest(".copy-code-btn, .copy-btn");if(!M)return;const B=M.closest(".ide-code-window")||M.closest(".code-container")||M.closest("pre"),D=B?B.querySelector("code"):null;if(!D)return;const f=D.textContent||D.innerText;navigator.clipboard.writeText(f).catch(()=>{}),fetch("/api/clipboard",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({text:f})}).catch(()=>{});const A=M.innerHTML;M.innerHTML="✅ Copied!",M.classList.add("copied"),setTimeout(()=>{M.innerHTML=A,M.classList.remove("copied")},2e3)},_=z=>{const M=z.target.closest(".internal-lesson-link");if(!M)return;z.preventDefault();const B=M.getAttribute("data-lesson");B&&s(`lesson_${B}`)},L=P.current;return L.addEventListener("click",w),L.addEventListener("click",_),()=>{L.removeEventListener("click",w),L.removeEventListener("click",_)}},[t.id,s]),e.jsxs("div",{className:"lesson-view-container fade-in",children:[e.jsxs("nav",{className:"lesson-breadcrumbs",children:[e.jsx("button",{onClick:a,className:"breadcrumb-btn",children:"Curriculum Hub"}),e.jsx("span",{className:"breadcrumb-sep",children:"/"}),e.jsx("span",{className:"breadcrumb-module",children:t.module}),e.jsx("span",{className:"breadcrumb-sep",children:"/"}),e.jsxs("span",{className:"breadcrumb-active",children:["Lesson ",t.num_str]})]}),e.jsxs("header",{className:"lesson-main-header",children:[e.jsxs("div",{className:"lesson-header-meta",children:[e.jsx("span",{className:"module-badge",children:t.module}),e.jsxs("span",{className:"duration-badge",children:[e.jsx(wt,{size:13}),e.jsx("span",{children:t.duration})]}),e.jsx("span",{className:"level-badge",children:"ROS 2 Jazzy"})]}),e.jsxs("div",{className:"lesson-title-action-row",children:[e.jsxs("h1",{className:"lesson-main-title",children:[e.jsxs("span",{className:"title-num",children:["Lesson ",t.num_str,":"]})," ",t.title]}),e.jsxs("button",{onClick:()=>g(t.id),className:`lesson-complete-toggle-btn ${x?"completed":""}`,title:x?"Lesson marked complete. Click to uncheck.":"Click to mark lesson complete",children:[x?e.jsx(Me,{size:18}):e.jsx(bt,{size:18}),e.jsx("span",{children:x?"Completed":"Mark as Complete"})]})]}),t.focus&&e.jsxs("div",{className:"lesson-focus-card",children:[e.jsx("strong",{children:"Focus:"})," ",t.focus]})]}),t.snapshot&&t.snapshot.length>0&&e.jsxs("div",{className:"concept-snapshot-card",children:[e.jsxs("div",{className:"snapshot-header",children:[e.jsx(qe,{size:18,className:"zap-icon"}),e.jsx("h3",{children:"Quick Concept Snapshot"})]}),e.jsx("ul",{className:"snapshot-list",children:t.snapshot.map((w,_)=>Array.isArray(w)?e.jsxs("li",{children:[e.jsxs("strong",{children:[w[0],":"]})," ",w[1]]},_):e.jsx("li",{children:w},_))})]}),(()=>{const w=Cs[t.id];return w?e.jsx(Ge.Suspense,{fallback:e.jsx("div",{className:"lesson-loading-spinner",style:{padding:"3rem",textAlign:"center",color:"var(--text-muted)"},children:e.jsx("p",{children:"Loading interactive lesson..."})}),children:e.jsx(w,{})}):e.jsx("article",{ref:P,className:"markdown-body lesson-body-content",dangerouslySetInnerHTML:{__html:t.html_content}})})(),S&&!Cs[t.id]&&se.createPortal(e.jsx(kt,{}),S),k&&!Cs[t.id]&&se.createPortal(e.jsx(Et,{}),k),c&&se.createPortal(e.jsx(Tt,{}),c),o&&se.createPortal(e.jsx(Rt,{}),o),y&&se.createPortal(e.jsx(It,{}),y),C&&se.createPortal(e.jsx(At,{}),C),m&&se.createPortal(e.jsx(zt,{}),m),h&&se.createPortal(e.jsx(Pt,{}),h),u&&se.createPortal(e.jsx(Lt,{}),u),t.has_quiz&&e.jsx("section",{className:"lesson-quiz-section",children:e.jsx(Ha,{lessonId:t.id,quizzes:t.quizzes,savedScore:T,onRecordScore:N})}),e.jsxs("section",{className:"lesson-bottom-completion-card",style:{margin:"2.5rem 0 1rem",padding:"1.5rem 1.75rem",borderRadius:"14px",background:x?"rgba(16, 185, 129, 0.08)":"var(--bg-surface)",border:x?"1px solid rgba(16, 185, 129, 0.3)":"1px solid var(--border-color)",display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:"1.25rem",boxShadow:"var(--shadow-sm)"},children:[e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"1rem"},children:[e.jsx("div",{style:{width:44,height:44,borderRadius:"10px",background:x?"var(--success)":"var(--bg-sidebar)",color:x?"#fff":"var(--accent-primary)",display:"flex",alignItems:"center",justifyContent:"center"},children:x?e.jsx(Me,{size:22}):e.jsx(Ls,{size:22})}),e.jsxs("div",{children:[e.jsx("h4",{style:{margin:"0 0 3px",fontSize:"1.05rem",fontWeight:800,color:"var(--text-primary)"},children:x?"✓ Lesson Completed":"Completed this Lesson?"}),e.jsx("p",{style:{margin:0,fontSize:"0.86rem",color:"var(--text-secondary)"},children:x?"Your completion is marked and saved in your local progress tracker.":"Click below to mark complete and automatically advance to the next module."})]})]}),e.jsx("div",{style:{display:"flex",alignItems:"center",gap:"0.75rem"},children:x?e.jsxs(e.Fragment,{children:[e.jsxs("button",{onClick:()=>g(t.id),className:"lesson-complete-toggle-btn completed",title:"Click to unmark as complete",style:{padding:"0.65rem 1.1rem",borderRadius:"8px"},children:[e.jsx(Me,{size:17}),e.jsx("span",{children:"Marked Complete (Click to Undo)"})]}),t.next_id&&e.jsxs("button",{onClick:()=>s(t.next_id),className:"lesson-nav-btn next",style:{padding:"0.65rem 1.25rem"},children:[e.jsx("span",{children:t.next_id==="feedback"?"Course Feedback & Survey":"Next Lesson"}),e.jsx(me,{size:16})]})]}):e.jsxs("button",{onClick:()=>{g(t.id),t.next_id?s(t.next_id):a()},style:{display:"inline-flex",alignItems:"center",gap:"8px",background:"var(--success)",color:"#ffffff",border:"none",padding:"0.75rem 1.5rem",borderRadius:"8px",fontWeight:800,fontSize:"0.92rem",cursor:"pointer",boxShadow:"0 2px 8px rgba(16, 185, 129, 0.35)",transition:"all 0.15s ease"},className:"btn-complete-and-advance",children:[e.jsx(Me,{size:18}),e.jsx("span",{children:t.next_id==="feedback"?"Mark Complete & Course Feedback":t.next_id?"Mark as Complete & Next Module":"Mark as Complete & Finish"}),e.jsx(me,{size:18})]})})]}),e.jsxs("footer",{className:"lesson-navigation-footer",children:[t.prev_id?e.jsxs("button",{onClick:()=>s(t.prev_id),className:"lesson-nav-btn prev",children:[e.jsx(Ee,{size:16}),e.jsx("span",{children:"Previous Lesson"})]}):e.jsx("div",{style:{width:"130px"}}),e.jsxs("button",{onClick:a,className:"lesson-nav-btn hub",children:[e.jsx(Te,{size:16}),e.jsx("span",{children:"Course Hub"})]}),t.next_id?e.jsxs("button",{onClick:()=>s(t.next_id),className:"lesson-nav-btn next",children:[e.jsx("span",{children:t.next_id==="feedback"?"Course Feedback":"Next Lesson"}),e.jsx(me,{size:16})]}):e.jsx("div",{style:{width:"130px"}})]}),l&&typeof document<"u"&&se.createPortal(e.jsxs("div",{className:"image-lightbox-overlay",onClick:()=>j(null),role:"dialog","aria-modal":"true",children:[e.jsx("div",{className:"image-lightbox-backdrop"}),e.jsxs("div",{className:"image-lightbox-container",onClick:w=>w.stopPropagation(),children:[e.jsxs("div",{className:"image-lightbox-header",children:[e.jsx("span",{className:"image-lightbox-title",children:l.alt||"High-Resolution Diagram Preview"}),e.jsx("button",{type:"button",className:"image-lightbox-close-btn",onClick:()=>j(null),title:"Close full-screen image preview (ESC)",children:e.jsx(Fe,{size:20})})]}),e.jsx("div",{className:"image-lightbox-body",children:e.jsx("img",{src:l.src,alt:l.alt,className:"image-lightbox-img"})}),l.caption&&e.jsx("div",{className:"image-lightbox-caption",children:l.caption})]})]}),document.body)]})}const ut="nexus_amr_l1_submitted_feedback",Ya="navpro_l1_submitted_feedback";function Xa({studentInfo:t,onSubmitFeedback:s}){const[a,x]=i.useState(5),[g,T]=i.useState(0),[N,P]=i.useState("Module 4: Autonomous Navigation with Nav2"),[S,I]=i.useState(""),[k,R]=i.useState(!1),[c,r]=i.useState(!1),[o,b]=i.useState(null);i.useEffect(()=>{try{const u=localStorage.getItem(ut)||localStorage.getItem(Ya);if(u){const v=JSON.parse(u);b(v),r(!0),v.rating&&x(v.rating),v.favorite_module&&P(v.favorite_module),v.feedback_text&&I(v.feedback_text)}}catch{}},[]);const y={1:"Needs Improvement",2:"Fair",3:"Good",4:"Very Good",5:"Outstanding / Excellent! 🚀"},E=["Module 1: Foundations & Core Middleware (Linux, ROS 2, Workspace & Packages)","Module 2: Core ROS 2 Mechanics & Communication (Pub/Sub, Services, Params, Actions, Bags, CLI)","Module 3: 3D Robot Modeling & Physics Simulation (URDF, Xacro, RViz2, Gazebo, Worlds)","Module 4: Autonomous Navigation with Nav2 (SLAM Toolbox, Costmaps, Planners, Behavior Trees, Nav2 Simple Commander, Physical Deployment)"],C=async u=>{if(u.preventDefault(),!S.trim())return;if(R(!0),s)try{await s(a,N,S)}catch(h){console.warn("Feedback sync error:",h)}R(!1);const v={student_id:(t==null?void 0:t.student_id)||(t==null?void 0:t.email_roll)||"student_guest",student_name:(t==null?void 0:t.name)||"Student",rating:a,favorite_module:N,feedback_text:S,timestamp:Date.now()};localStorage.setItem(ut,JSON.stringify(v)),b(v),r(!0)},d=()=>{r(!1)};return e.jsxs("div",{className:"feedback-form-card",children:[e.jsxs("div",{className:"feedback-form-header",children:[e.jsx("div",{className:"header-icon-wrap",children:e.jsx(Ps,{size:26,className:"award-icon"})}),e.jsxs("div",{className:"header-text-wrap",children:[e.jsxs("div",{className:"header-badge-row",children:[e.jsx("span",{className:"badge-capstone",children:"Capstone Survey"}),e.jsx("span",{className:"badge-live",children:"Synced to Instructor"})]}),e.jsx("h3",{className:"feedback-main-title",children:"Workshop Experience & Student Feedback"}),e.jsx("p",{className:"feedback-main-subtitle",children:"Congratulations on reaching the final stage of Level 1! Your feedback helps us fine-tune hands-on robotics exercises and improve future workshop tracks."})]})]}),c?e.jsx("div",{className:"feedback-success-banner fade-in",children:e.jsxs("div",{className:"success-banner-content",children:[e.jsx("div",{className:"success-icon-badge",children:e.jsx(H,{size:36,color:"#10b981"})}),e.jsxs("div",{className:"success-copy",children:[e.jsxs("h4",{children:["Thank you, ",(o==null?void 0:o.student_name)||"Robotics Engineer","!"]}),e.jsx("p",{children:"Your feedback and ratings have been saved and transmitted to the instructor central server."}),e.jsxs("div",{className:"submitted-summary-box",children:[e.jsxs("div",{className:"summary-rating",children:[e.jsx("span",{className:"summary-label",children:"Your Rating:"}),e.jsxs("div",{className:"star-row",children:[[1,2,3,4,5].map(u=>e.jsx(fs,{size:18,fill:u<=((o==null?void 0:o.rating)||a)?"#f59e0b":"none",color:"#f59e0b"},u)),e.jsxs("span",{className:"rating-tag",children:["(",(o==null?void 0:o.rating)||a," / 5)"]})]})]}),e.jsxs("div",{className:"summary-module",children:[e.jsx("span",{className:"summary-label",children:"Favorite Module:"}),e.jsx("span",{className:"summary-val",children:(o==null?void 0:o.favorite_module)||N})]}),(o==null?void 0:o.feedback_text)&&e.jsxs("div",{className:"summary-quote",children:['"',o.feedback_text,'"']})]}),e.jsxs("button",{type:"button",onClick:d,className:"btn-edit-feedback",children:[e.jsx(Ct,{size:14}),e.jsx("span",{children:"Update or Edit Response"})]})]})]})}):e.jsxs("form",{onSubmit:C,className:"feedback-form-body",children:[e.jsxs("div",{className:"feedback-section-row",children:[e.jsxs("label",{className:"section-label",children:[e.jsx(fs,{size:16,className:"label-icon"}),e.jsx("span",{children:"Overall Workshop Rating"})]}),e.jsxs("div",{className:"star-picker-container",children:[e.jsx("div",{className:"star-picker-row",children:[1,2,3,4,5].map(u=>e.jsx("button",{type:"button",className:`star-choice-btn ${u<=(g||a)?"active":""}`,onMouseEnter:()=>T(u),onMouseLeave:()=>T(0),onClick:()=>x(u),"aria-label":`Rate ${u} stars`,children:e.jsx(fs,{size:32,fill:u<=(g||a)?"#f59e0b":"none",color:"#f59e0b",className:"star-svg"})},u))}),e.jsx("span",{className:"star-score-indicator",children:y[g||a]})]})]}),e.jsxs("div",{className:"feedback-section-row",children:[e.jsxs("label",{className:"section-label",children:[e.jsx(be,{size:16,className:"label-icon"}),e.jsx("span",{children:"Which module was your favorite or most valuable?"})]}),e.jsx("select",{value:N,onChange:u=>P(u.target.value),className:"feedback-select-input",children:E.map((u,v)=>e.jsx("option",{value:u,children:u},v))})]}),e.jsxs("div",{className:"feedback-section-row",children:[e.jsxs("label",{className:"section-label",children:[e.jsx(yt,{size:16,className:"label-icon"}),e.jsx("span",{children:"What did you enjoy most? Any suggestions for the instructor?"})]}),e.jsx("textarea",{required:!0,rows:4,value:S,onChange:u=>I(u.target.value),placeholder:"e.g., The hands-on autonomous navigation patrol with Nav2 Simple Commander was awesome! The line-by-line code breakdowns really helped me understand how ROS 2 lifecycle states work under the hood...",className:"feedback-textarea-input"})]}),e.jsxs("div",{className:"feedback-submit-row",children:[e.jsx("div",{className:"feedback-privacy-note",children:e.jsx("span",{children:"🔒 Submissions are delivered to the instructor dashboard with your student ID."})}),e.jsxs("button",{type:"submit",disabled:k||!S.trim(),className:"btn-submit-feedback",children:[e.jsx(ce,{size:16}),e.jsx("span",{children:k?"Submitting Feedback...":"Submit Feedback to Instructor"})]})]})]})]})}function Ja({onNavigateHub:t,onSelectLesson:s,studentInfo:a,onSubmitFeedback:x,completedCount:g=23,totalLessons:T=23}){return i.useEffect(()=>{window.scrollTo({top:0,behavior:"smooth"})},[]),e.jsxs("div",{className:"lesson-view-container feedback-view-container fade-in",children:[e.jsxs("nav",{className:"lesson-breadcrumbs",children:[e.jsx("button",{onClick:t,className:"breadcrumb-btn",children:"Curriculum Hub"}),e.jsx("span",{className:"breadcrumb-sep",children:"/"}),e.jsx("span",{className:"breadcrumb-module",children:"Capstone Milestones"}),e.jsx("span",{className:"breadcrumb-sep",children:"/"}),e.jsx("span",{className:"breadcrumb-active",children:"Course Feedback & Survey"})]}),e.jsxs("section",{className:"feedback-milestone-hero",style:{margin:"1.5rem 0 2rem",padding:"2rem 2.25rem",borderRadius:"18px",background:"linear-gradient(135deg, rgba(37, 99, 235, 0.08) 0%, rgba(16, 185, 129, 0.08) 100%)",border:"1px solid var(--border-color)",boxShadow:"var(--shadow-sm)"},children:[e.jsxs("div",{style:{display:"flex",alignItems:"flex-start",gap:"1.25rem",flexWrap:"wrap"},children:[e.jsx("div",{style:{width:56,height:56,borderRadius:"16px",background:"linear-gradient(135deg, #2563eb 0%, #10b981 100%)",color:"#ffffff",display:"flex",alignItems:"center",justifyContent:"center",boxShadow:"0 4px 16px rgba(37, 99, 235, 0.35)",flexShrink:0},children:e.jsx(Ps,{size:32})}),e.jsxs("div",{style:{flex:1,minWidth:"260px"},children:[e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"8px",marginBottom:"6px"},children:[e.jsx("span",{style:{background:"#dbeafe",color:"#1d4ed8",fontSize:"0.75rem",fontWeight:800,padding:"3px 10px",borderRadius:"6px",textTransform:"uppercase",letterSpacing:"0.05em"},children:"Curriculum Capstone"}),e.jsxs("span",{style:{background:"#dcfce7",color:"#15803d",fontSize:"0.75rem",fontWeight:700,padding:"3px 10px",borderRadius:"6px"},children:[g," / ",T," Lessons Completed"]})]}),e.jsx("h1",{style:{margin:"0 0 8px",fontSize:"1.65rem",fontWeight:850,color:"var(--text-primary)",letterSpacing:"-0.02em"},children:"Level 1: Zero-to-Autonomous AMR Engineer"}),e.jsx("p",{style:{margin:0,fontSize:"0.94rem",color:"var(--text-secondary)",lineHeight:1.6},children:"Congratulations on completing the curriculum! You have developed real engineering competency across Linux systems, ROS 2 Jazzy DDS communication, custom interfaces, URDF 3D simulation, SLAM Toolbox, Nav2 autonomous navigation, and physical AMR deployment. Your feedback helps shape upcoming robotics courses."})]})]}),e.jsxs("div",{style:{display:"grid",gridTemplateColumns:"repeat(auto-fit, minmax(200px, 1fr))",gap:"1rem",marginTop:"1.75rem",paddingTop:"1.5rem",borderTop:"1px solid var(--border-color)"},children:[e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"10px"},children:[e.jsx(ue,{size:18,style:{color:"#2563eb"}}),e.jsxs("div",{children:[e.jsx("div",{style:{fontWeight:700,fontSize:"0.86rem",color:"var(--text-primary)"},children:"Module 1"}),e.jsx("div",{style:{fontSize:"0.76rem",color:"var(--text-muted)"},children:"Linux & ROS 2 Middleware"})]})]}),e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"10px"},children:[e.jsx(fe,{size:18,style:{color:"#0ea5e9"}}),e.jsxs("div",{children:[e.jsx("div",{style:{fontWeight:700,fontSize:"0.86rem",color:"var(--text-primary)"},children:"Module 2"}),e.jsx("div",{style:{fontSize:"0.76rem",color:"var(--text-muted)"},children:"Actions, Services & Bags"})]})]}),e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"10px"},children:[e.jsx(ft,{size:18,style:{color:"#8b5cf6"}}),e.jsxs("div",{children:[e.jsx("div",{style:{fontWeight:700,fontSize:"0.86rem",color:"var(--text-primary)"},children:"Module 3"}),e.jsx("div",{style:{fontSize:"0.76rem",color:"var(--text-muted)"},children:"URDF & Gazebo Simulation"})]})]}),e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"10px"},children:[e.jsx(Rs,{size:18,style:{color:"#10b981"}}),e.jsxs("div",{children:[e.jsx("div",{style:{fontWeight:700,fontSize:"0.86rem",color:"var(--text-primary)"},children:"Module 4"}),e.jsx("div",{style:{fontSize:"0.76rem",color:"var(--text-muted)"},children:"Nav2 & Physical Deployment"})]})]})]})]}),e.jsx("section",{className:"feedback-form-section",children:e.jsx(Xa,{studentInfo:a||{},onSubmitFeedback:x})}),e.jsxs("footer",{className:"lesson-navigation-footer",style:{marginTop:"3rem"},children:[e.jsxs("button",{onClick:()=>s("lesson_23"),className:"lesson-nav-btn prev",children:[e.jsx(Ee,{size:16}),e.jsx("span",{children:"← Lesson 23: Physical Robot Hardware Deployment"})]}),e.jsxs("button",{onClick:t,className:"lesson-nav-btn hub",children:[e.jsx(Te,{size:16}),e.jsx("span",{children:"Curriculum Hub Overview"})]})]})]})}function Za({isOpen:t,onClose:s}){const[a,x]=i.useState(()=>{try{return localStorage.getItem("navpro_show_ppt")!=="false"}catch{return!0}}),g=()=>{const T=!a;x(T);try{localStorage.setItem("navpro_show_ppt",T?"true":"false"),window.dispatchEvent(new StorageEvent("storage",{key:"navpro_show_ppt",newValue:T?"true":"false"}))}catch{}};return t?e.jsx("div",{className:"modal-overlay fade-in",onClick:s,children:e.jsxs("div",{className:"modal-card help-modal-card",onClick:T=>T.stopPropagation(),children:[e.jsxs("div",{className:"modal-header",children:[e.jsxs("div",{className:"modal-title-wrap",children:[e.jsx(os,{size:22,className:"modal-title-icon"}),e.jsxs("div",{children:[e.jsx("h3",{children:"Help • Persistence, Resets & Troubleshooting"}),e.jsx("span",{className:"modal-subtitle",children:"Guide to local workspace storage, progress resets, and Docker lifecycle"})]})]}),e.jsx("button",{className:"modal-close-btn",onClick:s,"aria-label":"Close help",children:e.jsx(Fe,{size:18})})]}),e.jsxs("div",{className:"modal-body help-modal-body",children:[e.jsxs("div",{className:"help-section",children:[e.jsxs("div",{className:"help-section-title",children:[e.jsx(La,{size:18,className:"help-section-icon"}),e.jsx("h4",{children:"1. How Data & Workspace Storage Persist"})]}),e.jsxs("p",{children:["Your progress and code are engineered to ",e.jsx("strong",{children:"survive PC reboots, browser restarts, and container restarts"})," without cloud reliance:"]}),e.jsxs("ul",{className:"help-bullets",children:[e.jsxs("li",{children:[e.jsx("strong",{children:"Student Attendance & Profile:"})," Stored permanently in your browser's ",e.jsx("code",{children:"localStorage"}),". Opening the LMS tomorrow will remember your name and organization."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Curriculum Checklist & Quizzes:"})," Every lesson checkbox and quiz score is saved in ",e.jsx("code",{children:"localStorage"}),"."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Robotics Code in VS Code:"})," The ",e.jsx("code",{children:"ros2_ws/"})," folder is mounted directly from your host filesystem. Your custom Python nodes and launch files persist on your physical hard drive."]})]})]}),e.jsxs("div",{className:"help-section",children:[e.jsxs("div",{className:"help-section-title",children:[e.jsx(te,{size:18,className:"help-section-icon"}),e.jsx("h4",{children:"2. How to Reset Curriculum Progress"})]}),e.jsx("p",{children:"If you want to practice again from a fresh slate:"}),e.jsxs("div",{className:"help-step-box",children:[e.jsx("strong",{children:"Option A: One-Click UI Reset"}),e.jsxs("p",{children:["Click the ",e.jsx("code",{children:"↺ Reset Checklist"})," button at the top of the left sidebar. It will clear all completed lesson marks and quiz scores after confirmation."]})]}),e.jsxs("div",{className:"help-step-box",children:[e.jsx("strong",{children:"Option B: Hard Browser Reset"}),e.jsxs("p",{children:["Open Browser DevTools (",e.jsx("code",{children:"F12"}),") → Console → run ",e.jsx("code",{children:"localStorage.clear()"})," → refresh the page."]})]})]}),e.jsxs("div",{className:"help-section",children:[e.jsxs("div",{className:"help-section-title",children:[e.jsx(Pa,{size:18,className:"help-section-icon"}),e.jsx("h4",{children:"3. How to Restart & Reset Docker"})]}),e.jsx("p",{children:"If a simulation crashes, a port locks, or you need a clean container environment:"}),e.jsxs("div",{className:"help-code-group",children:[e.jsx("span",{className:"help-code-label",children:"Quick Restart (Fast):"}),e.jsx("pre",{className:"help-pre",children:e.jsx("code",{children:"cd level1/docker && docker compose restart"})})]}),e.jsxs("div",{className:"help-code-group",children:[e.jsx("span",{className:"help-code-label",children:"Full Container Recreate (Clean Runtime State):"}),e.jsx("pre",{className:"help-pre",children:e.jsx("code",{children:"cd level1/docker && docker compose down && docker compose up -d"})}),e.jsxs("span",{className:"help-note",children:["(Note: Your code files in ",e.jsx("code",{children:"ros2_ws/"})," will NOT be deleted; they remain safe on your host disk)."]})]}),e.jsxs("div",{className:"help-code-group",children:[e.jsx("span",{className:"help-code-label",children:"Clean Build Artifacts in ROS 2:"}),e.jsx("pre",{className:"help-pre",children:e.jsx("code",{children:"rm -rf level1/ros2_ws/build level1/ros2_ws/install level1/ros2_ws/log"})})]})]}),e.jsxs("div",{className:"help-section",children:[e.jsxs("div",{className:"help-section-title",children:[e.jsx(jt,{size:18,className:"help-section-icon"}),e.jsx("h4",{children:"4. Environment Access & Port Directory"})]}),e.jsxs("div",{className:"help-ports-grid",children:[e.jsxs("div",{className:"help-port-card",children:[e.jsx("span",{className:"port-badge",children:"Port 8000"}),e.jsx("strong",{children:"LMS Learning Web Platform"}),e.jsx("a",{href:"http://localhost:8000",target:"_blank",rel:"noopener noreferrer",children:"http://localhost:8000"})]}),e.jsxs("div",{className:"help-port-card",children:[e.jsx("span",{className:"port-badge",children:"Port 6080"}),e.jsx("strong",{children:"Desktop GUI (noVNC)"}),e.jsx("a",{href:"http://localhost:6080/vnc.html?autoconnect=true&resize=remote",target:"_blank",rel:"noopener noreferrer",children:"http://localhost:6080/vnc.html"}),e.jsxs("span",{className:"port-pass",children:["Password: ",e.jsx("strong",{children:"None (Passwordless Instant Connect)"})]})]}),e.jsxs("div",{className:"help-port-card",children:[e.jsx("span",{className:"port-badge",children:"Port 8443"}),e.jsx("strong",{children:"In-Browser VS Code"}),e.jsx("a",{href:"http://localhost:8443/?folder=/home/student",target:"_blank",rel:"noopener noreferrer",children:"http://localhost:8443"})]})]})]}),e.jsxs("div",{className:"help-section",children:[e.jsxs("div",{className:"help-section-title",children:[e.jsx(vt,{size:18,className:"help-section-icon"}),e.jsx("h4",{children:"5. Instructor Fullscreen Presentation Mode (PPT)"})]}),e.jsxs("p",{children:["The LMS includes an instructor presentation slide deck mode with step-by-step concept cards (e.g. ",e.jsx("code",{children:"mkdir"}),", ",e.jsx("code",{children:"cd"}),", code walkthroughs, live architecture flows, and assessments)."]}),e.jsxs("div",{style:{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"0.85rem 1.15rem",background:"var(--bg-sidebar)",borderRadius:"10px",border:"1px solid var(--border-color)",margin:"0.75rem 0"},children:[e.jsxs("div",{children:[e.jsx("strong",{children:"Navbar PPT Launch Button"}),e.jsxs("div",{style:{fontSize:"0.82rem",color:"var(--text-muted)"},children:["Controlled by cache variable ",e.jsx("code",{children:"navpro_show_ppt"})," in localStorage"]})]}),e.jsx("button",{type:"button",onClick:g,className:`btn-toggle-ppt ${a?"active":""}`,style:{padding:"0.45rem 0.95rem",borderRadius:"8px",fontWeight:700,fontSize:"0.86rem",cursor:"pointer",border:a?"1px solid rgba(16, 185, 129, 0.4)":"1px solid var(--border-color)",background:a?"rgba(16, 185, 129, 0.15)":"var(--bg-surface)",color:a?"var(--success)":"var(--text-secondary)"},children:a?"✓ Button Visible":"Hidden (Click to Enable)"})]}),e.jsxs("span",{className:"help-note",children:["Shortcut: Open URL with ",e.jsx("code",{children:"?ppt=true"})," to enable or ",e.jsx("code",{children:"?ppt=false"})," to disable."]})]})]}),e.jsx("div",{className:"modal-footer",style:{padding:"1rem 1.5rem",borderTop:"1px solid var(--border-color)"},children:e.jsx("button",{type:"button",className:"btn-submit",onClick:s,style:{marginLeft:"auto"},children:e.jsx("span",{children:"Got It"})})})]})}):null}function en(){const[t,s]=i.useState({isTop:!0,isBottom:!1,percent:0,hasScrolled:!1});i.useEffect(()=>{const g=()=>{const T=window.scrollY||document.documentElement.scrollTop,N=(document.documentElement.scrollHeight||document.body.scrollHeight)-window.innerHeight,P=T<80,S=N<=0||T>=N-80,I=N>0?Math.min(100,Math.max(0,Math.round(T/N*100))):0;s({isTop:P,isBottom:S,percent:I,hasScrolled:T>100})};return window.addEventListener("scroll",g,{passive:!0}),g(),()=>window.removeEventListener("scroll",g)},[]);const a=()=>{window.scrollTo({top:0,behavior:"smooth"})},x=()=>{window.scrollTo({top:document.documentElement.scrollHeight||document.body.scrollHeight,behavior:"smooth"})};return e.jsxs("div",{className:"page-scroll-nav-cluster",style:{position:"fixed",bottom:"2rem",right:"2rem",zIndex:980,display:"flex",flexDirection:"column",alignItems:"center",background:"var(--bg-surface)",border:"1px solid var(--border-color)",borderRadius:"24px",padding:"3px",boxShadow:"0 4px 16px rgba(0, 0, 0, 0.14)",backdropFilter:"blur(10px)",transition:"bottom 0.25s cubic-bezier(0.16, 1, 0.3, 1), transform 0.2s ease, opacity 0.2s ease"},"aria-label":"Page scroll shortcuts",children:[e.jsx("button",{type:"button",onClick:a,className:"page-scroll-btn scroll-to-top-btn",title:"Scroll directly to top (Page Top)","aria-label":"Scroll to top",style:{width:"38px",height:"38px",borderRadius:"50%",border:"none",background:"transparent",color:t.isTop?"var(--text-muted)":"var(--text-primary)",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",transition:"all 0.15s ease",opacity:t.isTop?.6:1},children:e.jsx(Nt,{size:18,strokeWidth:2.4})}),e.jsx("div",{style:{width:"20px",height:"1px",background:"var(--border-color)",margin:"2px 0"}}),e.jsx("button",{type:"button",onClick:x,className:"page-scroll-btn scroll-to-end-btn",title:"Scroll directly to end (Page End)","aria-label":"Scroll to end",style:{width:"38px",height:"38px",borderRadius:"50%",border:"none",background:"transparent",color:t.isBottom?"var(--text-muted)":"var(--text-primary)",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",transition:"all 0.15s ease",opacity:t.isBottom?.6:1},children:e.jsx(_t,{size:18,strokeWidth:2.4})})]})}function ht(t){if(!t)return[];const s=[];if(typeof window>"u")return s;const x=new DOMParser().parseFromString(t.html_content||"","text/html"),T=Array.from(x.querySelectorAll(".learning-objective-item")).map(r=>{var y,E,C,d,u;const o=((E=(y=r.querySelector(".objective-num-badge"))==null?void 0:y.textContent)==null?void 0:E.trim())||"•",b=((d=(C=r.querySelector(".objective-text"))==null?void 0:C.innerHTML)==null?void 0:d.trim())||((u=r.textContent)==null?void 0:u.trim());return{num:o,text:b}});s.push({id:`${t.id}_launchpad`,type:"title",lessonNum:t.num_str,lessonId:t.id,title:t.title,module:t.module,duration:t.duration,focus:t.focus,outcomes:T.length>0?T:null,snapshot:t.snapshot||[]});const N=[{id:"interactive-permission-calculator-root",key:"permission",title:"Interactive Permission Calculator"},{id:"turtlesim-teleop-flow-root",key:"turtlesim",title:"Turtlesim Teleop & Graph Flow"},{id:"package-structure-flow-root",key:"package",title:"ROS 2 Package Structure & Filesystem"},{id:"pubsub-flow-root",key:"pubsub",title:"Publisher / Subscriber Message Flow"},{id:"service-flow-root",key:"service",title:"Service Server & Client Synchronous RPC"},{id:"action-flow-root",key:"action",title:"Action 3-Tier Execution Flow"},{id:"interactive-urdf-viewer-root",key:"urdf",title:"3D URDF & Kinematics Visualizer"},{id:"interactive-inertia-calculator-root",key:"inertia",title:"URDF Inertia Tensor Calculator"},{id:"log-levels-circle-root",key:"loglevels",title:"ROS 2 Logging Severity Hierarchy"}],P=r=>{if(!r)return"";const o=r.trim().split(`
`);if(o.length<=14)return r.trim();const b=[];let y=!1,E=!1;for(let d=0;d<o.length;d++){const u=o[d],v=u.trim();if(v.includes("cat <<")&&v.includes("EOF")){E=!0,b.push("# [Populate script with diagnostic logic]"),b.push("cat << 'EOF' > sensor_diagnostics.sh ... EOF");continue}if(E){v==="EOF"&&(E=!1);continue}if(/^#\s*(?:Expected\s+)?Output/i.test(v)||/^#\s*Notice/i.test(v)||/^#\s*Displays complete/i.test(v)){y=!0;continue}if(y){if(v.startsWith("#")&&!/^#\s*(?:\d+\.|\bStep|\bPhase)/i.test(v))continue;if(v.startsWith("#"))y=!1;else if(v)y=!1;else{y=!1;continue}}v.startsWith("# (Notice:")||v.startsWith("# Without -p")||v.startsWith("# With -p")||v.startsWith("# Notice your prompt")||v.startsWith("# Clean up temporary practice folders:")||v.startsWith("rm -rf")&&v.includes("practice")||v.startsWith("# Verify it was created:")||v.startsWith("# Verify all directories now exist:")||v.startsWith("# Verify the structured")||(v==="ls"||v.startsWith("ls ~/robotics_lab")||v.startsWith("rm -rf my_robot_test"))&&o.length>15||b.push(u)}let C=b.join(`
`).trim();return C=C.replace(/\n{3,}/g,`

`),C},S=r=>{if(!r)return"";const o=r.split(`
`);if(o.length<=16)return r;const b=o.slice(0,14);return b.push("# ... [Full complete implementation available in Web LMS] ..."),b.join(`
`)},I=r=>{if(!r)return!1;const o=!!r.querySelector("pre, code, .code-container"),b=!!r.querySelector("img, .lesson-image, svg"),y=!!r.querySelector("table"),E=!!r.querySelector(".alert-callout, .callout-card"),C=!!r.querySelector("ul, ol"),d=r.textContent.trim().length;return o||b||y||E||C||d>=160},k=(r,o,b,y)=>{r.forEach((E,C)=>{if(E.textContent.trim().length>30){const d=Array.from(E.querySelectorAll(".code-breakdown-item"));if(d.length>3){const u=Math.ceil(d.length/2);[d.slice(0,u),d.slice(u)].forEach((h,p)=>{const m=E.cloneNode(!0),n=m.querySelector(".code-breakdown-list");n&&(n.innerHTML="",h.forEach(l=>n.appendChild(l.cloneNode(!0)))),s.push({id:`${o}_breakdown_${C}_p${p+1}`,type:"step_breakdown",lessonNum:t.num_str,lessonId:t.id,module:t.module,sectionTitle:y,badge:"Architecture Breakdown",title:`${b} — Mechanics (Part ${p+1})`,htmlContent:m.outerHTML})});return}s.push({id:`${o}_breakdown_${C}`,type:"step_breakdown",lessonNum:t.num_str,lessonId:t.id,module:t.module,sectionTitle:y,badge:"Architecture Breakdown",title:`${b} — Core Mechanics Breakdown`,htmlContent:E.outerHTML})}})},R=(r,o,b,y,E=0)=>{if(!r||!I(r))return;r.querySelectorAll("hr, .divider").forEach(p=>p.remove()),r.querySelectorAll(".alert-callout, .alert").forEach(p=>{if(p.querySelectorAll(".code-container, pre").length>1||p.textContent.trim().length>600){const n=p.querySelector(".alert-body")||p,l=x.createDocumentFragment();for(;n.firstChild;)l.appendChild(n.firstChild);p.replaceWith(l)}}),r.querySelectorAll('div[style*="grid"]').forEach(p=>{const m=Array.from(p.children).filter(n=>n.nodeType===1);if(m.length>=5||m.length>=4&&p.querySelector("pre, code")){const n=Math.ceil(m.length/2),l=p.cloneNode(!1),j=p.cloneNode(!1);m.slice(0,n).forEach(w=>l.appendChild(w.cloneNode(!0))),m.slice(n).forEach(w=>j.appendChild(w.cloneNode(!0))),p.parentNode&&(p.parentNode.insertBefore(l,p),p.parentNode.insertBefore(j,p),p.remove())}}),r.querySelectorAll(".table-responsive, table").forEach(p=>{p.style.marginTop="0.2rem",p.style.marginBottom="0.2rem"});const C=Array.from(r.querySelectorAll(".code-breakdown-card"));if(C.forEach(p=>p.remove()),r.querySelectorAll("pre").forEach(p=>{const m=p.querySelector("code")||p,l=m.textContent.split(`
`);l.length>10&&(m.textContent=l.slice(0,9).join(`
`)+`

# ... [Full implementation available in Web LMS] ...`)}),E>=2){s.push({id:o,type:"subtopic",lessonNum:t.num_str,lessonId:t.id,module:t.module,sectionTitle:y,title:b,htmlContent:r.innerHTML}),k(C,o,b,y);return}if((t.id==="01"||t.id==="lesson_01"||t.num_str==="01")&&(r.querySelector('.terminator-image, img[src*="terminator"]')||b.toLowerCase().includes("terminator"))&&r.querySelector("table")){let p="",m="",n="";Array.from(r.children).forEach(l=>{l.querySelector("table")||l.tagName.toLowerCase()==="table"||l.classList.contains("table-responsive")?n+=l.outerHTML:l.querySelector("img, svg")||["img","svg"].includes(l.tagName.toLowerCase())||l.classList.contains("lesson-image-wrapper")?m+=l.outerHTML:p+=l.outerHTML}),s.push({id:o,type:"concept",lessonNum:t.num_str,lessonId:t.id,module:t.module,sectionTitle:y,badge:"📟 Multi-Terminal Grid",title:b,htmlContent:`
          <div class="terminator-slide-wrapper">
            ${p?`<div class="terminator-intro-briefing">${p}</div>`:""}
            <div class="terminator-cols-container">
              <div class="term-left-col">
                <div class="term-graphic-frame">
                  ${m}
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
                ${n}
              </div>
            </div>
          </div>
        `}),k(C,o,b,y);return}const d=Array.from(r.querySelectorAll("img, svg:not(.lucide)"));if(d.length>1){const p=Array.from(r.children),m=[];let n=[];if(p.forEach(l=>{(!!l.querySelector("img, svg:not(.lucide)")||["img","svg"].includes(l.tagName.toLowerCase())||l.classList.contains("lesson-image-wrapper"))&&n.some(w=>!!w.querySelector("img, svg:not(.lucide)")||["img","svg"].includes(w.tagName.toLowerCase())||w.classList.contains("lesson-image-wrapper"))?(m.push(n),n=[l]):n.push(l)}),n.length>0&&m.push(n),m.length>1){m.forEach((l,j)=>{const w=x.createElement("div");if(l.forEach(M=>w.appendChild(M.cloneNode(!0))),!I(w))return;const _=w.querySelector("strong, h4, h5"),L=_?_.textContent.trim():j===0?"Simulation View":"Architecture Diagram",z=`${b} (Part ${j+1}: ${L})`;R(w,`${o}_part${j+1}`,z,y,E+1)}),k(C,o,b,y);return}}if(d.length===1&&(r.textContent.trim().length>180||r.querySelector("table, pre, .code-container, .alert"))){const p=r.querySelector("table, .table-responsive"),m=p?p.querySelectorAll("tr").length:0,n=!!r.querySelector("pre, .code-container"),l=r.textContent.trim().length;if(p&&m>4||n&&l>550){const j=x.createElement("div"),w=x.createElement("div");if(Array.from(r.children).forEach(_=>{const L=!!_.querySelector("img, svg:not(.lucide)")||["img","svg"].includes(_.tagName.toLowerCase())||_.classList.contains("lesson-image-wrapper"),z=!!_.querySelector("pre, .code-container, table")||["pre","table"].includes(_.tagName.toLowerCase())||_.classList.contains("code-container")||_.classList.contains("table-responsive");L?j.appendChild(_.cloneNode(!0)):z?w.appendChild(_.cloneNode(!0)):j.children.length===0?j.appendChild(_.cloneNode(!0)):w.appendChild(_.cloneNode(!0))}),I(j)&&I(w)&&j.children.length<r.children.length&&w.children.length<r.children.length){R(j,`${o}_visual`,`${b}: Architectural Model`,y,E+1),R(w,`${o}_code`,`${b}: Implementation`,y,E+1),k(C,o,b,y);return}}else{const j=x.createElement("div");j.className="col-visual";const w=x.createElement("div");w.className="col-content",Array.from(r.children).forEach(_=>{!!_.querySelector("img, svg:not(.lucide)")||["img","svg"].includes(_.tagName.toLowerCase())||_.classList.contains("lesson-image-wrapper")?j.appendChild(_.cloneNode(!0)):w.appendChild(_.cloneNode(!0))}),s.push({id:o,type:"subtopic",lessonNum:t.num_str,lessonId:t.id,module:t.module,sectionTitle:y,title:b,htmlContent:`
            <div class="deck-two-col-layout">
              ${j.outerHTML}
              ${w.outerHTML}
            </div>
          `})}k(C,o,b,y);return}const u=Array.from(r.children),v=r.querySelectorAll("pre, .code-container");if(E<1&&d.length===0&&u.length>1&&(r.textContent.trim().length>680||v.length>1&&r.textContent.trim().length>350||r.querySelector("table")&&r.textContent.trim().length>380)){const p=[];let m=[],n=0;if(u.forEach(l=>{const j=l.textContent.trim().length,w=!!l.querySelector("pre, .code-container")||l.tagName.toLowerCase()==="pre",_=!!l.querySelector("table")||l.tagName.toLowerCase()==="table",L=j>400||w&&j>200||_,z=m.some(M=>M.querySelector("pre, .code-container")||M.tagName.toLowerCase()==="pre");m.length>0&&(L||n+j>650||w&&z)?(p.push(m),m=[l],n=j):(m.push(l),n+=j)}),m.length>0&&p.push(m),p.length>1){p.forEach((l,j)=>{const w=x.createElement("div");if(l.forEach(M=>w.appendChild(M.cloneNode(!0))),!I(w))return;const _=w.querySelector("strong, h3, h4, h5"),L=w.querySelector("pre, .code-container");let z=_?_.textContent.trim():L?"Implementation":`Part ${j+1}`;z.length>35&&(z=`Part ${j+1}`),R(w,`${o}_chk${j+1}`,`${b} (${z})`,y,E+1)}),k(C,o,b,y);return}}s.push({id:o,type:"subtopic",lessonNum:t.num_str,lessonId:t.id,module:t.module,sectionTitle:y,title:b,htmlContent:r.innerHTML}),k(C,o,b,y)};let c=Array.from(x.querySelectorAll("section"));return(c.length<2||c.length<x.querySelectorAll("h2").length)&&(c=Array.from(x.querySelectorAll("h2")).map(o=>{const b=x.createElement("section");b.id=o.id||"",b.appendChild(o.cloneNode(!0));let y=o.nextElementSibling;for(;y&&y.tagName.toLowerCase()!=="h2";){const E=y.nextElementSibling;b.appendChild(y.cloneNode(!0)),y=E}return b})),t.id==="02"||t.num_str==="02"||t.id==="lesson_02"?sn(x,t,s):t.id==="03"||t.num_str==="03"||t.id==="lesson_03"?tn(x,t,s):t.id==="04"||t.num_str==="04"||t.id==="lesson_04"?an(x,t,s):t.id==="05"||t.num_str==="05"||t.id==="lesson_05"?nn(x,t,s):t.id==="06"||t.num_str==="06"||t.id==="lesson_06"?rn(x,t,s):c.forEach((r,o)=>{const b=r.querySelector("h2"),y=b?b.textContent.trim():`Section ${o+1}`,E=y.toLowerCase();if(E.includes("learning objectives")||E.includes("road map")||E.includes("roadmap")||E.includes("overview")&&o<=1||E.includes("challenge")||E.includes("practical lab")||E.includes("student lab")||E.includes("mission")||E.includes("hands-on student")||E.includes("summary")||E.includes("next steps"))return;N.forEach(p=>{r.querySelector(`#${p.id}`)&&s.push({id:`${t.id}_interactive_${p.key}`,type:"interactive",interactiveKey:p.key,lessonNum:t.num_str,lessonId:t.id,module:t.module,sectionTitle:y,title:p.title})});const C=Array.from(r.querySelectorAll(".cmd-card"));if(C.length>0){C.forEach((p,m)=>{var M,B,D,f,A,$,F,O,U,J;const n=((B=(M=p.querySelector(".cmd-badge"))==null?void 0:M.textContent)==null?void 0:B.trim())||"",l=((f=(D=p.querySelector(".cmd-title"))==null?void 0:D.textContent)==null?void 0:f.trim())||`Command ${m+1}`,j=(($=(A=p.querySelector(".cmd-syntax"))==null?void 0:A.textContent)==null?void 0:$.replace(/^Syntax:\s*/i,"").trim())||"",w=((O=(F=p.querySelector(".cmd-desc"))==null?void 0:F.innerHTML)==null?void 0:O.trim())||"",_=p.querySelector("pre code"),L=_?_.textContent.trim():"",z=((J=(U=p.querySelector(".code-lang-tag"))==null?void 0:U.textContent)==null?void 0:J.trim())||"bash";s.push({id:`${t.id}_cmd_${m}_${n.replace(/[^a-zA-Z0-9]/g,"_")}`,type:"command",lessonNum:t.num_str,lessonId:t.id,module:t.module,sectionTitle:y,badge:n,baseBadge:n,title:l,baseTitle:l,syntax:j,desc:w,code:P(L),lang:z,htmlContent:p.outerHTML})});return}const d=Array.from(r.querySelectorAll(".file-edit-step"));if(d.length>0){const p=[];let m=null;d.forEach(n=>{var B,D,f,A,$;const l=((D=(B=n.querySelector(".file-edit-step-title"))==null?void 0:B.textContent)==null?void 0:D.trim())||"",j=n.querySelector(".step-description"),w=n.querySelector("pre code"),_=w?w.textContent.trim():"",L=((A=(f=n.querySelector(".code-lang-tag"))==null?void 0:f.textContent)==null?void 0:A.trim())||"python",z=($=j==null?void 0:j.textContent)==null?void 0:$.match(/([~./\w_-]+\.[a-zA-Z0-9]+)/),M=l.toLowerCase().includes("open")||_.length===0;if(M||!m){m&&m.codes.length>0&&p.push(m);const F=z?z[1]:"",O=F?F.split("/").pop():"Configuration File";m={targetPath:F,fileName:O,descriptions:[],codes:[],lang:L},j&&!M&&m.descriptions.push(j.textContent.trim())}else l.toLowerCase().includes("verify")||l.toLowerCase().includes("full file")?m.codes.length===0&&_.length>0&&m.codes.push(_):(j&&m.descriptions.push(j.textContent.trim()),_.length>0&&(m.codes.push(_),m.lang=L))}),m&&(m.codes.length>0||m.descriptions.length>0)&&p.push(m),p.forEach((n,l)=>{const j=n.codes.join(`

`),w=n.descriptions.slice(0,2).join(" ")||`Update ${n.fileName} configuration.`,_=n.targetPath?`<code>${n.targetPath}</code>`:`<code>${n.fileName}</code>`;s.push({id:`${t.id}_file_${o}_${l}_${n.fileName.replace(/[^a-zA-Z0-9]/g,"_")}`,type:"code_step",lessonNum:t.num_str,lessonId:t.id,module:t.module,sectionTitle:y,badge:n.fileName,title:`${y.replace(/^\d+\.\s*/,"")}: ${n.fileName}`,desc:`<div class="file-path-strip"><span class="file-path-label">📁 Target:</span> ${_}</div><p class="file-edit-summary">${w}</p>`,code:S(j),lang:n.lang,breakdown:null,htmlContent:""})});return}const u=Array.from(r.querySelectorAll("h3"));if(u.length>0){const p=x.createElement("div");let m=r.firstElementChild;for(;m&&m.tagName.toLowerCase()!=="h3"&&m.tagName.toLowerCase()!=="h2";)N.some(n=>m.id===n.id||m.querySelector(`#${n.id}`))||p.appendChild(m.cloneNode(!0)),m=m.nextElementSibling;I(p)&&R(p,`${t.id}_sec_${o}_intro`,`${y}: Overview`,y),u.forEach((n,l)=>{const j=n.textContent.trim(),w=j.toLowerCase();if(w.includes("challenge")||w.includes("starter template")||w.includes("student lab")||w.includes("solution breakdown")||w.includes("task_spawn"))return;const _=[];let L=n.nextElementSibling;for(;L&&L.tagName.toLowerCase()!=="h3"&&L.tagName.toLowerCase()!=="h2";)N.some(M=>L.id===M.id||L.querySelector(`#${M.id}`))||_.push(L.cloneNode(!0)),L=L.nextElementSibling;const z=x.createElement("div");_.forEach(M=>z.appendChild(M)),R(z,`${t.id}_sub_${o}_${l}`,j,y)});return}const v=r.cloneNode(!0),h=v.querySelector("h2");h&&h.remove(),N.forEach(p=>{const m=v.querySelector(`#${p.id}`);m&&m.remove()}),R(v,`${t.id}_sec_${o}`,y,y)}),Array.isArray(t.quizzes)&&t.quizzes.length>0&&t.quizzes.forEach((r,o)=>{const b=r.correct!==void 0?r.correct:r.answer!==void 0?r.answer:r.correct_index!==void 0?r.correct_index:0,y=r.prompt||r.question||`Assessment Question ${o+1}`;s.push({id:`${t.id}_quiz_${o}`,type:"quiz",lessonNum:t.num_str,lessonId:t.id,module:t.module,sectionTitle:"Knowledge Check & Interactive Assessment",title:`Question ${o+1} of ${t.quizzes.length}`,quizIndex:o+1,totalQuizzes:t.quizzes.length,question:y,options:r.options||[],answer:b,explanation:r.explanation||""})}),s.push({id:`${t.id}_summary`,type:"summary",lessonNum:t.num_str,lessonId:t.id,module:t.module,sectionTitle:"Summary & Next Steps",title:`Lesson ${t.num_str} Summary & Key Takeaways`,nextId:t.next_id,focus:t.focus}),s}function sn(t,s,a){a.push({id:`${s.id}_prerequisites`,type:"concept",lessonNum:s.num_str,lessonId:s.id,module:s.module,sectionTitle:"2. Hardware and Software Prerequisites",badge:"📋 Prerequisites",title:"2. Hardware & Software Prerequisites",htmlContent:`
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
    `}),a.push({id:`${s.id}_sec3_1_robot_ingredients`,type:"concept",lessonNum:s.num_str,lessonId:s.id,module:s.module,sectionTitle:"3. Robotics Fundamentals & ROS 2 Architecture",badge:"🤖 Core Concept",title:"3.1 What is a Robot? & The Three Core Ingredients",htmlContent:`
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
    `}),a.push({id:`${s.id}_sec3_2_step1`,type:"concept",lessonNum:s.num_str,lessonId:s.id,module:s.module,sectionTitle:"3. Robotics Fundamentals & ROS 2 Architecture",badge:"🎬 Story Step 1",title:"3.2 Story: Step 1 — The Dream: Autonomous Medicine Delivery Robot",htmlContent:`
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
    `}),a.push({id:`${s.id}_sec3_2_step2`,type:"concept",lessonNum:s.num_str,lessonId:s.id,module:s.module,sectionTitle:"3. Robotics Fundamentals & ROS 2 Architecture",badge:"🎬 Story Step 2",title:"3.2 Story: Step 2 — The Plumbing Trap: LiDAR, Cameras, Motors & Sockets",htmlContent:`
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
    `}),a.push({id:`${s.id}_sec3_2_step3`,type:"concept",lessonNum:s.num_str,lessonId:s.id,module:s.module,sectionTitle:"3. Robotics Fundamentals & ROS 2 Architecture",badge:"🎬 Story Step 3",title:"3.2 Story: Step 3 — Goal Abandoned: Just an RC Car",htmlContent:`
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
    `}),a.push({id:`${s.id}_sec3_2_step4`,type:"concept",lessonNum:s.num_str,lessonId:s.id,module:s.module,sectionTitle:"3. Robotics Fundamentals & ROS 2 Architecture",badge:"🎬 Story Step 4",title:"3.2 Story: Step 4 — The Vicious Cycle: Starting From Scratch Again",htmlContent:`
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
    `}),a.push({id:`${s.id}_sec3_3_why_ros`,type:"concept",lessonNum:s.num_str,lessonId:s.id,module:s.module,sectionTitle:"3. Robotics Fundamentals & ROS 2 Architecture",badge:"⚡ Core Solution: Why ROS",title:"3.3 Why We Need ROS: Stop Reinventing the Wheel & Standardize",htmlContent:`
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
    `}),a.push({id:`${s.id}_sec3_4_metaphor_and_stack`,type:"concept",lessonNum:s.num_str,lessonId:s.id,module:s.module,sectionTitle:"3. Robotics Fundamentals & ROS 2 Architecture",badge:"💻 Architectural Metaphor & Stack",title:"3.4 What is ROS? The PC OS Metaphor & The 4-Tier Software Stack",htmlContent:`
      <div class="l02-metaphor-stack-layout">
        <!-- Col 1: Metaphor -->
        <div class="metaphor-col">
          <div class="metaphor-visual-card">
            <img src="assets/images/ros_metaphor_pc_vs_robot.jpg" alt="PC OS vs Robot OS Metaphor" />
          </div>
          <div class="metaphor-comparisons">
            <div class="metaphor-compare-card">
              <div class="card-tag"><span>🖥️</span><strong>Personal Computers (Windows / macOS)</strong></div>
              <p>Standardizes hardware abstraction (GPUs, audio, USB, Wi-Fi) and graphics APIs (DirectX). Devs focus on gameplay, not writing graphics card microcode.</p>
            </div>
            <div class="metaphor-compare-card">
              <div class="card-tag"><span>🤖</span><strong>Autonomous Mobile Robots (ROS 2)</strong></div>
              <p>Standardizes hardware abstraction (LiDAR, cameras, IMUs, motor drives) and DDS IPC. Autonomy engineers focus on navigation, not low-level byte parsing.</p>
            </div>
          </div>
        </div>

        <!-- Col 2: Stack Reality -->
        <div class="stack-col">
          <div class="stack-alert-box">
            <strong>Core Reality: Middleware Framework, Not a Bare-Metal Kernel</strong><br/>
            ROS 2 does <em>not</em> manage CPU scheduling, interrupt vectors, or raw memory. It is a <strong>meta-operating system</strong> installing in user space on top of Ubuntu Linux.
          </div>
          <div class="stack-pills">
            <div class="stack-pill user"><span>1. User Applications</span><span>Nav2, SLAM Toolbox, Vision, AI Behaviors</span></div>
            <div class="stack-pill ros"><span>2. ROS 2 Middleware &amp; RCL</span><span>rclcpp, rclpy, FastDDS Inter-Process Bus</span></div>
            <div class="stack-pill os"><span>3. Host Operating System</span><span>Ubuntu 24.04 LTS Kernel &amp; POSIX APIs</span></div>
            <div class="stack-pill hw"><span>4. Physical Robot Hardware</span><span>Motors, LiDAR, IMU, Chassis &amp; Microcontrollers</span></div>
          </div>
          <div class="stack-takeaway">
            <strong>💡 Unified Engineering Takeaway:</strong> The PC OS metaphor explains <em>why</em> we standardize (hardware independence); the 4-tier stack explains <em>how</em> it runs (modular user-space processes over DDS).
          </div>
        </div>
      </div>
    `}),a.push({id:`${s.id}_sec3_5_pillars`,type:"concept",lessonNum:s.num_str,lessonId:s.id,module:s.module,sectionTitle:"3. Robotics Fundamentals & ROS 2 Architecture",badge:"🏛️ Architectural Pillars",title:"3.5 The 4 Foundational Pillars of ROS",htmlContent:`
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
    `}),a.push({id:`${s.id}_sec3_6_motion_flow`,type:"concept",lessonNum:s.num_str,lessonId:s.id,module:s.module,sectionTitle:"3. Robotics Fundamentals & ROS 2 Architecture",badge:"🧬 Full Motion Pipeline",title:"3.6 The Robot as a Living Organism: End-to-End Motion Flow",htmlContent:`
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
    `}),a.push({id:`${s.id}_sec3_7_ros1_vs_ros2`,type:"concept",lessonNum:s.num_str,lessonId:s.id,module:s.module,sectionTitle:"3. Robotics Fundamentals & ROS 2 Architecture",badge:"⚖️ Architecture Comparison",title:"3.7 ROS 1 vs. ROS 2: The Architectural Paradigm Shift",htmlContent:`
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
    `}),a.push({id:`${s.id}_sec4_timeline`,type:"concept",lessonNum:s.num_str,lessonId:s.id,module:s.module,sectionTitle:"4. ROS 2 Release Timeline",badge:"📅 Release Cadence",title:"4. ROS 2 Release Timeline: Jazzy Jalisco (LTS)",htmlContent:`
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
    `}),a.push({id:`${s.id}_sec5_install_pipeline`,type:"concept",lessonNum:s.num_str,lessonId:s.id,module:s.module,sectionTitle:"5. Step-by-Step Installation on Ubuntu 24.04 LTS",badge:"📦 Installation Pipeline",title:"5. Complete Installation Pipeline: APT Repositories to ROS 2 Desktop Suite",htmlContent:`
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
    `}),a.push({id:`${s.id}_sec6_desktop_gui`,type:"concept",lessonNum:s.num_str,lessonId:s.id,module:s.module,sectionTitle:"6. Developer Environment & Lab Access",badge:"🖥️ Lab Tooling Suite",title:"6. Developer Environment: Desktop GUI, In-Browser VS Code & Terminals",htmlContent:`
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
    `}),a.push({id:`${s.id}_sec8_9_sourcing_verification`,type:"concept",lessonNum:s.num_str,lessonId:s.id,module:s.module,sectionTitle:"8 & 9. Sourcing Environment & Multi-Terminal Verification",badge:"🧪 Activation & Smoke Test",title:"8 & 9. Environment Activation & Multi-Terminal Smoke Test Verification",htmlContent:`
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
    `})}function tn(t,s,a){a.push({id:`${s.id}_interactive_turtlesim`,type:"interactive",interactiveKey:"turtlesim",lessonNum:s.num_str,lessonId:s.id,module:s.module,sectionTitle:"Interactive Simulation & Computational Graph Flow",title:"Turtlesim Teleop & Computational Graph Architecture"}),a.push({id:`${s.id}_sec2_1_canvas`,type:"concept",lessonNum:s.num_str,lessonId:s.id,module:s.module,sectionTitle:"2. Launching Turtlesim: The Simulation Playground",badge:"🐢 Simulation Canvas",title:"2.1 Launching Turtlesim Simulation Canvas Node",htmlContent:`
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
    `}),a.push({id:`${s.id}_sec2_2_teleop`,type:"concept",lessonNum:s.num_str,lessonId:s.id,module:s.module,sectionTitle:"2. Launching Turtlesim: The Simulation Playground",badge:"⌨️ Teleoperation Control",title:"2.2 Keyboard Teleoperation Control (turtle_teleop_key)",htmlContent:`
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
        </div>
      </div>
    `}),a.push({id:`${s.id}_sec3_rqt_graph`,type:"concept",lessonNum:s.num_str,lessonId:s.id,module:s.module,sectionTitle:"3. Visualizing the Computational Graph (rqt_graph)",badge:"🌐 Computational Graph",title:"3. Visualizing the Computational Graph (rqt_graph)",htmlContent:`
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
    `}),a.push({id:`${s.id}_sec4_node_introspection`,type:"concept",lessonNum:s.num_str,lessonId:s.id,module:s.module,sectionTitle:"4. Core Concept 1: Node Introspection (ros2 node)",badge:"🔍 Node Introspection",title:"4. Node Introspection: Discovery (ros2 node list) & Deep Interface Audit (ros2 node info)",htmlContent:`
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
    `}),a.push({id:`${s.id}_sec5_topic_introspection`,type:"concept",lessonNum:s.num_str,lessonId:s.id,module:s.module,sectionTitle:"5. Core Concept 2: Topic Introspection (ros2 topic)",badge:"🚌 Topic Introspection",title:"5. Topic Introspection: Discovery (list -t), Telemetry (echo) & Frequency (hz)",htmlContent:`
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
    `}),a.push({id:`${s.id}_sec6_interface_twist`,type:"concept",lessonNum:s.num_str,lessonId:s.id,module:s.module,sectionTitle:"6. Core Concept 3: Topic Interface Types (ros2 interface)",badge:"📐 Message IDL",title:"6. Topic Interface Types & Ground Kinematics (ros2 interface)",htmlContent:`
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
    `}),a.push({id:`${s.id}_sec7_topic_pub`,type:"concept",lessonNum:s.num_str,lessonId:s.id,module:s.module,sectionTitle:"7. Moving the Robot Hands-On via CLI (ros2 topic pub)",badge:"⚡ Actuator Injection",title:"7. Moving the Robot via CLI: Single Step (--once) & Continuous Circle (-r 10)",htmlContent:`
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
    `}),a.push({id:`${s.id}_sec8_cli_table`,type:"concept",lessonNum:s.num_str,lessonId:s.id,module:s.module,sectionTitle:"8. Summary Comparison Table of Essential CLI Tools",badge:"📊 Master Reference",title:"8. Essential ROS 2 CLI Tools & Production Use Cases",htmlContent:`
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
    `})}function an(t,s,a){a.push({id:`${s.id}_sec2_workspace_hierarchy`,type:"concept",lessonNum:s.num_str,lessonId:s.id,module:s.module,sectionTitle:"2. The ROS 2 Workspace Architecture",badge:"📁 Workspace Quartet",title:"2. The ROS 2 Workspace Architecture (~/ros2_ws)",htmlContent:`
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
    `}),a.push({id:`${s.id}_sec3_overlay_underlay`,type:"concept",lessonNum:s.num_str,lessonId:s.id,module:s.module,sectionTitle:"3. Underlays vs. Overlays: The Environment Chaining Model",badge:"⛓️ Environment Chaining",title:"3. Underlays vs. Overlays: Environment Chaining",htmlContent:`
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
    `}),a.push({id:`${s.id}_sec4_init_and_build`,type:"concept",lessonNum:s.num_str,lessonId:s.id,module:s.module,sectionTitle:"4. Initializing & Building a Workspace",badge:"⚙️ Workspace Setup",title:"4. Initializing, Building & Sourcing Workspace",htmlContent:`
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
    `}),a.push({id:`${s.id}_sec5_package_definition`,type:"concept",lessonNum:s.num_str,lessonId:s.id,module:s.module,sectionTitle:"5. What Makes a Folder a ROS 2 Package?",badge:"📦 Package Concepts",title:"5.1 Package Definition & Build Types",htmlContent:`
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
    `}),a.push({id:`${s.id}_sec5_package_anatomy`,type:"concept",lessonNum:s.num_str,lessonId:s.id,module:s.module,sectionTitle:"5. What Makes a Folder a ROS 2 Package?",badge:"🔍 Package Anatomy",title:"5.2 Python Package Anatomy & Essential Files",htmlContent:`
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
    `}),a.push({id:`${s.id}_sec6_7_introspection_rosdep`,type:"concept",lessonNum:s.num_str,lessonId:s.id,module:s.module,sectionTitle:"6 & 7. Package Introspection & rosdep",badge:"🛠️ CLI & Dependencies",title:"6 & 7. Package Introspection CLI & rosdep",htmlContent:`
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
    `}),a.push({id:`${s.id}_sec8_scaffold_package`,type:"concept",lessonNum:s.num_str,lessonId:s.id,module:s.module,sectionTitle:"8. Create ROS 2 Package (Python)",badge:"🔨 Package Creation",title:"8.1 Scaffolding the nexus_amr_basics Package",htmlContent:`
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
    `}),a.push({id:`${s.id}_sec8_colcon_build`,type:"concept",lessonNum:s.num_str,lessonId:s.id,module:s.module,sectionTitle:"8. Create ROS 2 Package (Python)",badge:"⚡ Meta-Build Execution",title:"8.2 Compiling with colcon & Build Telemetry",htmlContent:`
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
    `}),a.push({id:`${s.id}_sec8_9_sourcing_verification`,type:"concept",lessonNum:s.num_str,lessonId:s.id,module:s.module,sectionTitle:"8 & 9. Sourcing & Verification",badge:"🔍 Sourcing & Verification",title:"8.3 Sourcing Contrast Drill & Health Audit",htmlContent:`
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
    `}),a.push({id:`${s.id}_interactive_package`,type:"interactive",interactiveKey:"package",lessonNum:s.num_str,lessonId:s.id,module:s.module,sectionTitle:"Interactive Architecture: ROS 2 Package Filesystem",title:"Interactive Package Structure & Execution Trace"}),a.push({id:`${s.id}_sec10_golden_rules`,type:"concept",lessonNum:s.num_str,lessonId:s.id,module:s.module,sectionTitle:"Production Best Practices",badge:"🛡️ Production Rules",title:"ROS 2 Workspace & Build Golden Rules",htmlContent:`
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
    `})}function nn(t,s,a){a.push({id:`${s.id}_interactive_pubsub`,type:"interactive",interactiveKey:"pubsub",lessonNum:s.num_str,lessonId:s.id,module:s.module,sectionTitle:"1. Topic Architecture & Pub/Sub Message Flow",badge:"🔄 Interactive Simulator",title:"Interactive Pub/Sub Architecture & DDS Message Flow Simulator"}),a.push({id:`${s.id}_sec3_interface_inspection`,type:"concept",lessonNum:s.num_str,lessonId:s.id,module:s.module,sectionTitle:"3. Message Interface Discovery",badge:"🔍 Interface Inspection",title:"3.1 Interface Discovery: sensor_msgs/msg/Range",htmlContent:`
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
    `}),a.push({id:`${s.id}_sec3_publisher_node`,type:"concept",lessonNum:s.num_str,lessonId:s.id,module:s.module,sectionTitle:"3. Writing the Publisher Node",badge:"📡 Publisher Node",title:"3.2 Authoring the Ultrasonic Sensor Publisher Node",htmlContent:`
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
    `}),a.push({id:`${s.id}_sec4_setup_build_test`,type:"concept",lessonNum:s.num_str,lessonId:s.id,module:s.module,sectionTitle:"4. Build & CLI Introspection",badge:"🛠️ Build & Test",title:"4. setup.py Entry Point, Build & Topic Introspection",htmlContent:`
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
    `}),a.push({id:`${s.id}_sec5_subscriber_node`,type:"concept",lessonNum:s.num_str,lessonId:s.id,module:s.module,sectionTitle:"5. Writing the Subscriber Node",badge:"🛡️ Subscriber Node",title:"5. Authoring the Collision Safety Monitor Subscriber",htmlContent:`
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
    `}),a.push({id:`${s.id}_sec6_dual_node_drill`,type:"concept",lessonNum:s.num_str,lessonId:s.id,module:s.module,sectionTitle:"6. Dual-Node Verification Drill",badge:"🚀 End-to-End Test",title:"6. Dual-Node Telemetry & Verification Drill",htmlContent:`
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
    `}),a.push({id:`${s.id}_sec7_qos_deep_dive`,type:"concept",lessonNum:s.num_str,lessonId:s.id,module:s.module,sectionTitle:"7. Quality of Service (QoS)",badge:"⚖️ QoS Policies",title:"7.1 Quality of Service (QoS): Policies & AMR Profiles",htmlContent:`
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
    `}),a.push({id:`${s.id}_sec7_qos_compatibility`,type:"concept",lessonNum:s.num_str,lessonId:s.id,module:s.module,sectionTitle:"7. QoS Compatibility & Python Setup",badge:"⚠️ Compatibility Rule",title:"7.2 The QoS Compatibility Rule (Rx <= Tx) & The Silence Trap",htmlContent:`
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
    `}),a.push({id:`${s.id}_sec7_multi_pubsub`,type:"concept",lessonNum:s.num_str,lessonId:s.id,module:s.module,sectionTitle:"7. Multi-Topic Architecture",badge:"🔀 Multi-Topic Hub",title:"7.3 Multi-Topic Architecture: Single Node Multi Pub/Sub",htmlContent:`
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
    `}),a.push({id:`${s.id}_sec9_golden_rules`,type:"concept",lessonNum:s.num_str,lessonId:s.id,module:s.module,sectionTitle:"Production Best Practices",badge:"🛡️ Production Rules",title:"Publishers, Subscribers & QoS Golden Rules",htmlContent:`
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
    `})}function rn(t,s,a){a.push({id:`${s.id}_interactive_service`,type:"interactive",interactiveKey:"service",lessonNum:s.num_str,lessonId:s.id,module:s.module,sectionTitle:"2. Service Architecture & Communication Flow",badge:"🔄 Interactive Simulator",title:"Interactive Service Architecture: 2-Way Request ➔ Response (RPC)"}),a.push({id:`${s.id}_sec2_decision_matrix`,type:"concept",lessonNum:s.num_str,lessonId:s.id,module:s.module,sectionTitle:"2. Communication Pattern Selection",badge:"🧭 Architecture Selection",title:"2. Decision Matrix: Topics vs Services vs Actions",htmlContent:`
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
    `}),a.push({id:`${s.id}_sec3_interface_contract`,type:"concept",lessonNum:s.num_str,lessonId:s.id,module:s.module,sectionTitle:"3. Interface Discovery & Contract",badge:"📋 Interface Contract",title:"3.1 Service Interface Discovery: TriggerEmergencyStop",htmlContent:`
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
    `}),a.push({id:`${s.id}_sec3_server_implementation`,type:"concept",lessonNum:s.num_str,lessonId:s.id,module:s.module,sectionTitle:"3. Service Server Implementation",badge:"🛡️ Safety Server Node",title:"3.2 Authoring the Emergency Stop Server (emergency_stop_server.py)",htmlContent:`
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
    `}),a.push({id:`${s.id}_sec4_server_build_cli`,type:"concept",lessonNum:s.num_str,lessonId:s.id,module:s.module,sectionTitle:"4. Build & CLI Introspection",badge:"🛠️ Build & CLI Testing",title:"4. setup.py Entry Point, colcon Build & Service CLI Testing",htmlContent:`
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
    `}),a.push({id:`${s.id}_sec5_client_implementation`,type:"concept",lessonNum:s.num_str,lessonId:s.id,module:s.module,sectionTitle:"5. Asynchronous Client Implementation",badge:"⚡ Non-Blocking Client",title:"5. Authoring the Asynchronous Emergency Stop Client (emergency_stop_client.py)",htmlContent:`
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
    `}),a.push({id:`${s.id}_sec6_dual_node_verification`,type:"concept",lessonNum:s.num_str,lessonId:s.id,module:s.module,sectionTitle:"6. End-to-End Verification",badge:"🚀 Dual-Node Drill",title:"6. setup.py Registration & Dual-Node Safety Verification Drill",htmlContent:`
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
    `}),a.push({id:`${s.id}_sec8_golden_rules`,type:"concept",lessonNum:s.num_str,lessonId:s.id,module:s.module,sectionTitle:"Production Best Practices",badge:"🏆 Production Rules",title:"Production Golden Rules for ROS 2 Services",htmlContent:`
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
    `})}function gt(t,s="bash"){if(!t)return"";let a="";try{a=xe.highlight(t,{language:s||"bash",ignoreIllegals:!0}).value}catch{try{a=xe.highlightAuto(t).value}catch{a=t.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}}if(s==="bash"||s==="sh"||s==="shell"){const x=[];a=a.replace(/<span class="hljs-comment">[\s\S]*?<\/span>/g,g=>(x.push(g),`___COMMENT_${x.length-1}___`)),a=a.replace(new RegExp("(?<=\\s|^)(--?[a-zA-Z0-9_\\-]+|\\+[xrwst]+)(?=\\s|$)","g"),(g,T)=>`<span class="hljs-flag">${T}</span>`),a=a.replace(new RegExp("(?<=\\s|^)(~?\\/[a-zA-Z0-9_.\\-\\/]+|\\b[a-zA-Z0-9_\\-]+\\.(?:py|yaml|yml|sh|bash|xml|launch\\.py|txt|log|urdf|xacro|srv|msg|action)\\b)","g"),(g,T)=>`<span class="hljs-path">${T}</span>`),a=a.replace(new RegExp("(?<=\\s|^)(\\|{1,2}|&&|>>|>|;)(?=\\s|$)","g"),(g,T)=>`<span class="hljs-operator">${T}</span>`),a=a.replace(/___COMMENT_(\d+)___/g,(g,T)=>x[T])}return a}function ln({lessons:t=[],modules:s=[],initialLessonId:a=null,theme:x="light",onToggleTheme:g,onExitPresentation:T}){const[N,P]=i.useState(()=>{var f;if(a&&t.some(A=>A.id===a))return a;if(typeof window<"u"){const A=window.location.hash.match(/#\/(?:presentation|slides)\/(\d+)/);if(A){const $=t.find(F=>F.num_str===A[1].padStart(2,"0"));if($)return $.id}}return((f=t[0])==null?void 0:f.id)||"lesson_01"}),[S,I]=i.useState(()=>{if(typeof window<"u"){const f=new URLSearchParams(window.location.hash.split("?")[1]||""),A=parseInt(f.get("slide"),10);return!isNaN(A)&&A>=0?A:0}return 0}),[k,R]=i.useState(!1),[c,r]=i.useState(!1),[o,b]=i.useState(!0),y=i.useRef(null),[E,C]=i.useState(!1),[d,u]=i.useState(!1),[v,h]=i.useState(null),p=i.useRef(null),m=i.useMemo(()=>t.find(f=>f.id===N)||t[0],[t,N]),n=i.useMemo(()=>m?ht(m):[],[m]),l=n[S]||n[0]||null;i.useEffect(()=>{C(!1),h(null),u(!1)},[S,N]),i.useEffect(()=>{if(m&&typeof window<"u"){const A=`#/presentation/${m.num_str}?slide=${S}`;window.location.hash!==A&&window.history.replaceState(null,"",A)}},[m,S]),i.useEffect(()=>{const f=()=>{const A=window.location.hash,$=A.match(/#\/(?:presentation|slides)\/(\d+)/);if($){const U=t.find(J=>J.num_str===$[1].padStart(2,"0"));U&&U.id!==N&&P(U.id)}const F=new URLSearchParams(A.split("?")[1]||""),O=parseInt(F.get("slide"),10);!isNaN(O)&&O>=0&&I(O)};return window.addEventListener("hashchange",f),()=>window.removeEventListener("hashchange",f)},[t,N]);const j=i.useCallback(()=>{if(S<n.length-1)I(f=>f+1);else{const f=t.findIndex(A=>A.id===N);f!==-1&&f<t.length-1&&(P(t[f+1].id),I(0))}},[S,n.length,t,N]),w=i.useCallback(()=>{if(S>0)I(f=>f-1);else{const f=t.findIndex(A=>A.id===N);if(f>0){const A=t[f-1],$=ht(A);P(A.id),I(Math.max(0,$.length-1))}}},[S,t,N]),_=i.useCallback(f=>{f>=0&&f<n.length&&(I(f),R(!1))},[n.length]),L=f=>{P(f.target.value),I(0),R(!1)},z=()=>{!document.fullscreenElement&&!c?document.documentElement.requestFullscreen?document.documentElement.requestFullscreen().then(()=>{r(!0)}).catch(()=>{r(!0)}):r(!0):document.fullscreenElement&&document.exitFullscreen?document.exitFullscreen().then(()=>{r(!1)}).catch(()=>{r(!1)}):r(!1)};i.useEffect(()=>{const f=()=>{r(!!document.fullscreenElement)};return document.addEventListener("fullscreenchange",f),()=>document.removeEventListener("fullscreenchange",f)},[]),i.useEffect(()=>{if(!c){b(!0);return}b(!0);const f=()=>{b(!0),y.current&&clearTimeout(y.current),y.current=setTimeout(()=>{b(!1)},2500)};return window.addEventListener("mousemove",f),()=>{window.removeEventListener("mousemove",f),y.current&&clearTimeout(y.current)}},[c]),i.useEffect(()=>{const f=A=>{var $;["INPUT","SELECT","TEXTAREA"].includes(($=document.activeElement)==null?void 0:$.tagName)||(A.key==="ArrowRight"||A.key===" "||A.key==="PageDown"?(A.preventDefault(),j()):A.key==="ArrowLeft"||A.key==="PageUp"?(A.preventDefault(),w()):A.key==="Home"?(A.preventDefault(),I(0)):A.key==="End"?(A.preventDefault(),I(n.length-1)):A.key==="f"||A.key==="F"?(A.preventDefault(),z()):A.key==="g"||A.key==="G"?(A.preventDefault(),R(F=>!F)):A.key==="t"||A.key==="T"?(A.preventDefault(),g&&g()):A.key==="Escape"&&(k?R(!1):c?z():T&&T()))};return window.addEventListener("keydown",f),()=>window.removeEventListener("keydown",f)},[j,w,k,T,g,n.length]),i.useEffect(()=>{if(!p.current)return;p.current.querySelectorAll(".concept-html-body pre code, .challenge-body pre code").forEach(A=>{xe.highlightElement(A)})},[S,l==null?void 0:l.id]);const M=f=>{f&&navigator.clipboard.writeText(f).then(()=>{u(!0),setTimeout(()=>u(!1),2e3)}).catch(()=>{})},B=f=>{switch(f){case"permission":return e.jsx(kt,{});case"turtlesim":return e.jsx(Et,{});case"package":return e.jsx(Tt,{});case"pubsub":return e.jsx(Rt,{});case"service":return e.jsx(It,{});case"action":return e.jsx(At,{});case"urdf":return e.jsx(zt,{});case"inertia":return e.jsx(Pt,{});case"loglevels":return e.jsx(Lt,{});default:return null}};if(!m||!l)return e.jsx("div",{className:"presentation-loading",children:e.jsx("p",{children:"Loading workshop presentation..."})});const D=n.length>0?(S+1)/n.length*100:0;return e.jsxs("div",{className:`presentation-viewport ${x==="dark"?"dark-theme":"light-theme"} ${c?"is-fullscreen":""}`,children:[!c&&e.jsxs("header",{className:"ppt-header",children:[e.jsxs("div",{className:"ppt-header-left",children:[e.jsxs("button",{className:"ppt-brand-btn",onClick:T,title:"Exit Presentation & Return to Web LMS",children:[e.jsx("img",{src:"assets/images/ros2_logo.svg",alt:"ROS 2",className:"ppt-logo"}),e.jsx("span",{className:"ppt-brand-label",children:"Level 1 • AMR Instructor PPT"})]}),e.jsx("div",{className:"ppt-header-divider"}),e.jsx("div",{className:"ppt-lesson-selector-wrap",children:e.jsx("select",{value:N,onChange:L,className:"ppt-lesson-select",title:"Switch Lesson Deck",children:t.map(f=>e.jsxs("option",{value:f.id,children:["Lesson ",f.num_str,": ",f.title]},f.id))})})]}),e.jsx("div",{className:"ppt-header-center",children:e.jsxs("button",{className:"ppt-slide-counter-btn",onClick:()=>R(f=>!f),title:"Open Slide Grid (Press G)",children:[e.jsxs("span",{className:"slide-curr-num",children:["Slide ",S+1]}),e.jsx("span",{className:"slide-sep",children:"/"}),e.jsx("span",{className:"slide-total-num",children:n.length}),e.jsx(rs,{size:14,className:"counter-icon"})]})}),e.jsxs("div",{className:"ppt-header-right",children:[e.jsxs("button",{onClick:()=>R(!0),className:"ppt-tool-btn",title:"Slide Grid Overview (Press G)",children:[e.jsx(rs,{size:17}),e.jsx("span",{className:"btn-hotkey",children:"G"})]}),e.jsxs("button",{onClick:z,className:"ppt-tool-btn",title:c?"Exit Fullscreen (Press F)":"Fullscreen Mode (Press F)",children:[c?e.jsx(js,{size:17}):e.jsx(za,{size:17}),e.jsx("span",{className:"btn-hotkey",children:"F"})]}),e.jsxs("button",{onClick:g,className:"ppt-tool-btn",title:`Switch to ${x==="dark"?"Light":"Dark"} Mode (Press T)`,children:[x==="dark"?e.jsx(Es,{size:17}):e.jsx(Ts,{size:17}),e.jsx("span",{className:"btn-hotkey",children:"T"})]}),e.jsxs("button",{onClick:T,className:"ppt-tool-btn ppt-exit-btn",title:"Exit Presentation Mode (Press Esc)",children:[e.jsx(Fe,{size:18}),e.jsx("span",{className:"exit-label",children:"Exit"})]})]})]}),!c&&e.jsx("div",{className:"ppt-progress-track",children:e.jsx("div",{className:"ppt-progress-bar",style:{width:`${D}%`}})}),e.jsx("main",{className:"ppt-main-stage",children:e.jsxs("div",{className:`ppt-card-container ppt-type-${l.type}`,ref:p,children:[!c&&e.jsxs("div",{className:"ppt-card-top-bar",children:[e.jsxs("div",{className:"ppt-card-meta",children:[e.jsx("span",{className:"ppt-module-tag",children:m.module}),e.jsxs("span",{className:"ppt-lesson-tag",children:["Lesson ",m.num_str]}),l.badge&&e.jsx("span",{className:"ppt-concept-badge",children:l.badge})]}),l.sectionTitle&&e.jsx("span",{className:"ppt-section-path",children:l.sectionTitle})]}),l.type==="title"&&e.jsxs("div",{className:"ppt-slide-content ppt-slide-title-view",children:[e.jsxs("div",{className:"title-view-hero",children:[e.jsx("span",{className:"hero-day-pill",children:m.module}),e.jsxs("h1",{className:"hero-lesson-title",children:[e.jsxs("span",{className:"title-accent",children:["Lesson ",m.num_str,":"]})," ",m.title]}),e.jsxs("div",{className:"hero-meta-row",children:[e.jsxs("span",{className:"hero-meta-badge",children:[e.jsx(wt,{size:15}),e.jsx("span",{children:m.duration||"90 Mins"})]}),e.jsxs("span",{className:"hero-meta-badge",children:[e.jsx(be,{size:15}),e.jsx("span",{children:"ROS 2 Jazzy • Level 1"})]}),e.jsxs("span",{className:"hero-meta-badge",children:[e.jsx(fe,{size:15}),e.jsxs("span",{children:[n.length," Concept Slides"]})]})]}),m.focus&&e.jsxs("div",{className:"hero-focus-box",children:[e.jsx("strong",{children:"Core Focus:"})," ",m.focus]})]}),e.jsxs("div",{className:"launchpad-lower-deck",children:[l.outcomes&&l.outcomes.length>0&&e.jsxs("div",{className:"launchpad-panel outcomes-panel",children:[e.jsxs("div",{className:"panel-header",children:[e.jsx(Ls,{size:17,className:"panel-header-icon"}),e.jsx("h3",{children:"Core Learning Objectives"})]}),e.jsxs("div",{className:"launchpad-outcomes-list",children:[l.outcomes.slice(0,4).map((f,A)=>e.jsxs("div",{className:"launchpad-outcome-item",children:[e.jsx("span",{className:"outcome-check",children:"✓"}),e.jsx("span",{className:"outcome-item-text",dangerouslySetInnerHTML:{__html:f.text}})]},A)),l.outcomes.length>4&&e.jsx("div",{className:"launchpad-outcomes-more",children:e.jsxs("span",{children:["+",l.outcomes.length-4," additional objectives detailed in web LMS"]})})]})]}),m.snapshot&&m.snapshot.length>0&&e.jsxs("div",{className:"launchpad-panel snapshot-panel",children:[e.jsxs("div",{className:"panel-header",children:[e.jsx(qe,{size:17,className:"panel-header-icon zap"}),e.jsx("h3",{children:"Key Technical Concepts"})]}),e.jsx("div",{className:"launchpad-snapshot-list",children:m.snapshot.map((f,A)=>e.jsxs("div",{className:"launchpad-snap-item",children:[e.jsx("span",{className:"snap-bullet",children:A+1}),e.jsx("div",{className:"snap-item-text",children:Array.isArray(f)?e.jsxs(e.Fragment,{children:[e.jsxs("strong",{children:[f[0],":"]})," ",f[1]]}):f})]},A))})]})]})]}),l.type==="command"&&e.jsxs("div",{className:"ppt-slide-content ppt-slide-command-view",children:[e.jsxs("div",{className:"cmd-slide-header",children:[e.jsx("div",{className:"cmd-badge-large",children:l.baseBadge||l.badge}),e.jsxs("div",{className:"cmd-title-group",children:[e.jsxs("div",{className:"cmd-title-row",children:[e.jsx("h2",{className:"cmd-slide-title",children:l.title}),l.totalUsageSteps>1&&e.jsxs("span",{className:"cmd-usage-pill",children:["Usage ",l.usageStep," of ",l.totalUsageSteps]})]}),l.syntax&&e.jsxs("div",{className:"cmd-syntax-strip",children:[e.jsx("span",{className:"syntax-label",children:"Syntax:"}),e.jsx("code",{className:"syntax-code",children:l.syntax})]})]})]}),l.desc&&e.jsx("div",{className:"cmd-slide-desc",dangerouslySetInnerHTML:{__html:l.desc}}),l.code&&e.jsxs("div",{className:"ppt-terminal-window",children:[e.jsxs("div",{className:"ppt-term-header",children:[e.jsxs("div",{className:"term-dots",children:[e.jsx("span",{className:"dot red"}),e.jsx("span",{className:"dot yellow"}),e.jsx("span",{className:"dot green"})]}),e.jsxs("div",{className:"term-title-wrapper",children:[e.jsx(ye,{size:14,className:"term-title-icon"}),e.jsx("span",{className:"term-title",children:"student@amr-dev-container:~ (bash)"})]}),e.jsxs("button",{onClick:()=>M(l.code),className:"term-copy-btn",title:"Copy Terminal Command",children:[d?e.jsx(he,{size:14}):e.jsx($e,{size:14}),e.jsx("span",{children:d?"Copied!":"Copy"})]})]}),e.jsx("pre",{className:"ppt-term-body",children:e.jsx("code",{className:`hljs language-${l.lang||"bash"}`,dangerouslySetInnerHTML:{__html:gt(l.code,l.lang||"bash")}})})]},l.id)]}),l.type==="code_step"&&e.jsxs("div",{className:"ppt-slide-content ppt-slide-code-step-view",children:[e.jsxs("div",{className:"step-slide-header",children:[e.jsx("span",{className:"step-badge-pill",children:l.badge}),e.jsx("h2",{className:"step-slide-title",children:l.title})]}),l.desc&&e.jsx("div",{className:"step-slide-desc",dangerouslySetInnerHTML:{__html:l.desc}}),l.code&&e.jsxs("div",{className:"ppt-ide-window",children:[e.jsxs("div",{className:"ppt-ide-header",children:[e.jsxs("div",{className:"ide-dots",children:[e.jsx("span",{className:"dot red"}),e.jsx("span",{className:"dot yellow"}),e.jsx("span",{className:"dot green"})]}),e.jsxs("span",{className:"ide-file-tab",children:[e.jsx(As,{size:14}),e.jsx("span",{children:l.title})]}),e.jsxs("button",{onClick:()=>M(l.code),className:"ide-copy-btn",title:"Copy Source Code",children:[d?e.jsx(he,{size:14}):e.jsx($e,{size:14}),e.jsx("span",{children:d?"Copied":"Copy"})]})]}),e.jsx("pre",{className:"ppt-ide-body",children:e.jsx("code",{className:`hljs language-${l.lang||"python"}`,dangerouslySetInnerHTML:{__html:gt(l.code,l.lang||"python")}})})]},l.id),l.breakdown&&e.jsx("div",{className:"step-breakdown-wrapper",dangerouslySetInnerHTML:{__html:l.breakdown}})]}),l.type==="step_breakdown"&&e.jsxs("div",{className:"ppt-slide-content ppt-slide-breakdown-view",children:[e.jsxs("div",{className:"step-slide-header",children:[e.jsx("span",{className:"step-badge-pill breakdown-pill",children:l.badge}),e.jsx("h2",{className:"step-slide-title",children:l.title})]}),e.jsx("div",{className:"step-breakdown-wrapper ppt-breakdown-deck",dangerouslySetInnerHTML:{__html:l.htmlContent}})]}),l.type==="interactive"&&e.jsx("div",{className:"ppt-slide-content ppt-slide-interactive-view",children:e.jsx("div",{className:"interactive-stage-container",children:B(l.interactiveKey)})}),(l.type==="concept"||l.type==="subtopic")&&e.jsxs("div",{className:"ppt-slide-content ppt-slide-concept-view",children:[e.jsx("div",{className:"concept-slide-header",children:e.jsx("h2",{className:"concept-main-title",children:l.title})}),e.jsx("div",{className:"concept-html-body markdown-body",dangerouslySetInnerHTML:{__html:l.htmlContent}})]}),l.type==="challenge"&&e.jsxs("div",{className:"ppt-slide-content ppt-slide-challenge-view",children:[e.jsxs("div",{className:"challenge-banner",children:[e.jsx(be,{size:24,className:"banner-icon"}),e.jsxs("div",{children:[e.jsx("span",{className:"banner-sub",children:"Hands-On Practical Lab"}),e.jsx("h2",{className:"banner-title",children:l.title})]})]}),e.jsx("div",{className:"challenge-content-body ppt-challenge-briefing",dangerouslySetInnerHTML:{__html:l.htmlContent}})]}),l.type==="quiz"&&e.jsxs("div",{className:"ppt-slide-content ppt-slide-quiz-view",children:[e.jsxs("div",{className:"quiz-slide-header",children:[e.jsxs("span",{className:"quiz-badge-pill",children:[e.jsx(os,{size:15}),e.jsxs("span",{children:["Concept Assessment • ",l.title]})]}),e.jsx("h2",{className:"quiz-question-text",children:l.question})]}),e.jsx("div",{className:"quiz-options-deck",children:l.options.map((f,A)=>{const $=A===l.answer,F=v===A;let O="quiz-option-card";return E?$?O+=" answer-correct":F&&(O+=" answer-wrong"):F&&(O+=" option-selected"),e.jsxs("button",{className:O,onClick:()=>h(A),children:[e.jsx("span",{className:"opt-letter",children:String.fromCharCode(65+A)}),e.jsx("span",{className:"opt-label",children:f}),E&&$&&e.jsx(H,{size:20,className:"status-mark correct"}),E&&F&&!$&&e.jsx(Da,{size:20,className:"status-mark wrong"})]},A)})}),e.jsxs("div",{className:"quiz-instructor-bar",children:[e.jsxs("button",{className:`reveal-answer-btn ${E?"revealed":""}`,onClick:()=>C(f=>!f),children:[e.jsx(be,{size:16}),e.jsx("span",{children:E?"Hide Explanation":"Reveal Answer & Pedagogical Breakdown"})]}),E&&e.jsxs("div",{className:"quiz-explanation-box fade-in",children:[e.jsxs("div",{className:"exp-header",children:[e.jsx(H,{size:18,className:"exp-icon"}),e.jsxs("strong",{children:["Correct Answer: Option ",String.fromCharCode(65+l.answer)]})]}),e.jsx("p",{className:"exp-text",children:l.explanation})]})]})]}),l.type==="summary"&&e.jsxs("div",{className:"ppt-slide-content ppt-slide-summary-view",children:[e.jsxs("div",{className:"summary-hero",children:[e.jsx(H,{size:48,className:"summary-success-icon"}),e.jsx("h2",{className:"summary-title",children:l.title}),e.jsxs("p",{className:"summary-desc",children:["Congratulations! You have completed all lecture topics, code walkthroughs, and hands-on exercises for Lesson ",m.num_str,"."]})]}),e.jsxs("div",{className:"summary-action-card",children:[e.jsx("h3",{children:"What's Next in the 3-Day Autonomous AMR Workshop?"}),m.next_id?e.jsxs("button",{onClick:j,className:"summary-next-btn",children:[e.jsx("span",{children:"Advance to Next Lesson"}),e.jsx(me,{size:18})]}):e.jsx("p",{className:"workshop-complete-note",children:"🎉 You have reached the end of the foundational robotics curriculum!"})]})]})]})}),!c&&e.jsxs("footer",{className:"ppt-footer",children:[e.jsx("div",{className:"ppt-footer-left",children:e.jsxs("button",{onClick:w,className:"ppt-nav-btn prev-btn",disabled:S===0&&t.findIndex(f=>f.id===N)===0,title:"Previous Slide (Press Left Arrow)",children:[e.jsx(lt,{size:20}),e.jsx("span",{children:"Previous"}),e.jsx("span",{className:"key-hint",children:"←"})]})}),e.jsx("div",{className:"ppt-footer-center",children:e.jsx("div",{className:"ppt-dots-container",children:n.map((f,A)=>e.jsx("button",{onClick:()=>_(A),className:`ppt-dot ${A===S?"active":""} type-${f.type}`,title:`Jump to Slide ${A+1}: ${f.title}`},f.id||A))})}),e.jsx("div",{className:"ppt-footer-right",children:e.jsxs("button",{onClick:j,className:"ppt-nav-btn next-btn",title:"Next Slide (Press Right Arrow or Space)",children:[e.jsx("span",{children:"Next"}),e.jsx("span",{className:"key-hint",children:"→"}),e.jsx(is,{size:20})]})})]}),c&&e.jsxs(e.Fragment,{children:[e.jsx("div",{className:"ppt-fs-company-brand",title:"Botforge Robotics",children:e.jsx("img",{src:x==="dark"?"assets/images/botforge_white.png":"assets/images/botforge_black.png",alt:"Botforge Robotics",className:"ppt-fs-company-logo"})}),e.jsx("button",{className:`ppt-fs-top-exit-btn ${o?"visible":""}`,onClick:z,title:"Exit Fullscreen (Press Esc or F)",children:e.jsx(js,{size:18})}),e.jsxs("div",{className:`ppt-fs-hud-dock ${o?"visible":""}`,children:[e.jsx("button",{onClick:w,className:"fs-hud-btn",disabled:S===0&&t.findIndex(f=>f.id===N)===0,title:"Previous Slide (←)",children:e.jsx(lt,{size:18})}),e.jsxs("button",{onClick:()=>R(!0),className:"fs-hud-counter-btn",title:"Slide Overview (Press G)",children:[e.jsx("span",{className:"fs-curr-num",children:S+1}),e.jsx("span",{className:"fs-sep",children:"/"}),e.jsx("span",{className:"fs-total-num",children:n.length}),e.jsx(rs,{size:13,className:"fs-grid-icon"})]}),e.jsx("button",{onClick:j,className:"fs-hud-btn",title:"Next Slide (→ or Space)",children:e.jsx(is,{size:18})}),e.jsx("div",{className:"fs-hud-divider"}),e.jsx("button",{onClick:g,className:"fs-hud-btn",title:"Switch Theme (T)",children:x==="dark"?e.jsx(Es,{size:16}):e.jsx(Ts,{size:16})}),e.jsxs("button",{onClick:z,className:"fs-hud-btn fs-hud-exit-btn",title:"Exit Fullscreen (Esc or F)",children:[e.jsx(js,{size:16}),e.jsx("span",{className:"fs-exit-text",children:"Exit"})]})]})]}),k&&e.jsx("div",{className:"ppt-grid-modal-overlay fade-in",onClick:()=>R(!1),children:e.jsxs("div",{className:"ppt-grid-modal-card",onClick:f=>f.stopPropagation(),children:[e.jsxs("div",{className:"grid-modal-header",children:[e.jsxs("div",{className:"grid-modal-title",children:[e.jsx(rs,{size:20}),e.jsxs("h3",{children:["Slide Deck Overview • Lesson ",m.num_str," (",n.length," Slides)"]})]}),e.jsx("button",{className:"grid-modal-close-btn",onClick:()=>R(!1),title:"Close Overview (Press Esc)",children:e.jsx(Fe,{size:20})})]}),e.jsx("div",{className:"grid-cards-scroller",children:n.map((f,A)=>e.jsxs("div",{className:`grid-slide-thumb ${A===S?"current-active":""}`,onClick:()=>_(A),children:[e.jsxs("div",{className:"thumb-top",children:[e.jsxs("span",{className:"thumb-index",children:["#",A+1]}),e.jsx("span",{className:`thumb-type-tag type-${f.type}`,children:f.type})]}),e.jsx("h4",{className:"thumb-title",children:f.title}),f.badge&&e.jsx("span",{className:"thumb-badge",children:f.badge})]},f.id||A))})]})})]})}function on(){const{completedLessons:t,quizScores:s,currentLessonId:a,setCurrentLessonId:x,toggleLessonComplete:g,recordQuizScore:T,resetProgress:N,progressPercent:P,completedCount:S,totalLessons:I}=$a(ne.total_lessons),k=i.useCallback(h=>{g(h)},[g]),R=i.useCallback((h,p,m)=>{T(h,p,m)},[T]),[c,r]=i.useState(!1),[o,b]=i.useState(()=>{try{return localStorage.getItem("navpro_l1_theme")||"light"}catch{return"light"}}),[y,E]=i.useState(!1),[C,d]=i.useState(()=>typeof window>"u"?!1:window.location.hash.startsWith("#/presentation")||window.location.hash.startsWith("#/slides"));i.useEffect(()=>{const h=()=>{d(window.location.hash.startsWith("#/presentation")||window.location.hash.startsWith("#/slides"))};return window.addEventListener("hashchange",h),()=>window.removeEventListener("hashchange",h)},[]),i.useEffect(()=>{document.documentElement.setAttribute("data-theme",o),localStorage.setItem("navpro_l1_theme",o)},[o]);const u=i.useCallback(()=>{b(h=>h==="light"?"dark":"light")},[]);i.useEffect(()=>{const h=()=>{setTimeout(async()=>{var p;try{const m=(p=window.getSelection())==null?void 0:p.toString();m&&m.trim()&&fetch("/api/clipboard",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({text:m.trim()})}).catch(()=>{})}catch{}},50)};return window.addEventListener("copy",h),()=>window.removeEventListener("copy",h)},[]);const v=ne.lessons.find(h=>h.id===a)||null;return i.useEffect(()=>{const h=p=>{var m;["INPUT","TEXTAREA"].includes((m=document.activeElement)==null?void 0:m.tagName)||(p.key==="["||p.key==="p"?a==="feedback"?x("lesson_22"):v&&v.prev_id&&x(v.prev_id):p.key==="]"||p.key==="n"?v&&v.next_id&&x(v.next_id):p.key==="h"?x(null):p.key==="m"&&E(n=>!n))};return window.addEventListener("keydown",h),()=>window.removeEventListener("keydown",h)},[v,a,x]),C?e.jsx(ln,{lessons:ne.lessons,modules:ne.modules,initialLessonId:a,theme:o,onToggleTheme:u,onExitPresentation:()=>{d(!1),window.location.hash=a?`#/lesson/${a.replace("lesson_","")}`:"#/"}}):e.jsxs("div",{className:"app-root",children:[e.jsx(Ga,{onNavigateHub:()=>x(null),onSelectLesson:h=>x(h),lessons:ne.lessons,currentLessonId:a,onOpenHelpModal:()=>r(!0),theme:o,onToggleTheme:u,onToggleSidebarMobile:()=>E(h=>!h)}),e.jsxs("div",{className:"app-main-layout",children:[e.jsx(Ba,{modules:ne.modules,lessons:ne.lessons,currentLessonId:a,onSelectLesson:h=>x(h),onNavigateHub:()=>x(null),completedLessons:t,onToggleComplete:k,quizScores:s,progressPercent:P,completedCount:S,totalLessons:I,onResetProgress:N,isOpenMobile:y,onCloseMobile:()=>E(!1)}),e.jsx("main",{className:"app-content-container",children:v?e.jsx(Qa,{lesson:v,onSelectLesson:h=>x(h),onNavigateHub:()=>x(null),isCompleted:t.includes(v.id),onToggleComplete:k,savedScore:s[v.id],onRecordScore:R}):a==="feedback"?e.jsx(Ja,{onNavigateHub:()=>x(null),onSelectLesson:h=>x(h),completedCount:S,totalLessons:I}):e.jsx(Wa,{modules:ne.modules,lessons:ne.lessons,onSelectLesson:h=>x(h),completedLessons:t,progressPercent:P,completedCount:S,totalLessons:I})})]}),e.jsx(en,{}),e.jsx(Za,{isOpen:c,onClose:()=>r(!1)})]})}class cn extends Ge.Component{constructor(a){super(a);ts(this,"handleResetCache",()=>{try{localStorage.removeItem("nexus_amr_l1_current_lesson"),localStorage.removeItem("nexus_amr_l1_completed_lessons"),localStorage.removeItem("nexus_amr_l1_quiz_scores"),localStorage.removeItem("navpro_l1_current_lesson"),localStorage.removeItem("navpro_l1_completed_lessons"),localStorage.removeItem("navpro_l1_quiz_scores"),localStorage.removeItem("navpro_current_lesson"),localStorage.removeItem("navpro_completed_lessons"),localStorage.removeItem("navpro_quiz_scores")}catch(a){console.warn("Could not clear localStorage:",a)}window.location.reload()});ts(this,"handleReload",()=>{window.location.reload()});ts(this,"handleResetState",()=>{this.setState({hasError:!1,error:null,errorInfo:null}),this.props.onReset&&this.props.onReset()});this.state={hasError:!1,error:null,errorInfo:null}}static getDerivedStateFromError(a){return{hasError:!0,error:a}}componentDidCatch(a,x){console.error("[Nexus AMR Level 1 ErrorBoundary caught an exception]:",a,x),this.setState({errorInfo:x})}render(){var a;return this.state.hasError?e.jsx("div",{style:{minHeight:"100vh",display:"flex",alignItems:"center",justifyContent:"center",background:"var(--bg-main, #0b0f19)",color:"var(--text-main, #f8fafc)",padding:"2rem",boxSizing:"border-box"},children:e.jsxs("div",{style:{maxWidth:"600px",width:"100%",background:"var(--card-bg, #111827)",border:"1px solid var(--border-color, #1f2937)",borderRadius:"16px",padding:"2.5rem",boxShadow:"0 20px 40px rgba(0,0,0,0.5)",textAlign:"center"},children:[e.jsx("div",{style:{display:"inline-flex",padding:"1rem",borderRadius:"50%",background:"rgba(239, 68, 68, 0.15)",color:"#ef4444",marginBottom:"1.5rem"},children:e.jsx(Ma,{size:42})}),e.jsx("h2",{style:{fontSize:"1.6rem",fontWeight:700,margin:"0 0 0.5rem 0"},children:"Something went wrong"}),e.jsxs("p",{style:{color:"var(--text-muted, #94a3b8)",fontSize:"0.95rem",lineHeight:1.6,margin:"0 0 2rem 0"},children:["The Learning Hub encountered an unexpected runtime error. Your robotics code in ",e.jsx("code",{children:"ros2_ws/"})," is completely safe on your disk."]}),e.jsxs("div",{style:{display:"flex",gap:"0.75rem",justifyContent:"center",flexWrap:"wrap",marginBottom:"1.5rem"},children:[e.jsxs("button",{onClick:this.handleReload,style:{display:"inline-flex",alignItems:"center",gap:"0.5rem",padding:"0.75rem 1.25rem",background:"var(--primary, #0ea5e9)",color:"#fff",border:"none",borderRadius:"8px",fontWeight:600,cursor:"pointer"},children:[e.jsx(Ct,{size:16}),e.jsx("span",{children:"Reload Page"})]}),e.jsxs("button",{onClick:this.handleResetState,style:{display:"inline-flex",alignItems:"center",gap:"0.5rem",padding:"0.75rem 1.25rem",background:"var(--surface-color, #1e293b)",color:"var(--text-main, #f8fafc)",border:"1px solid var(--border-color, #334155)",borderRadius:"8px",fontWeight:600,cursor:"pointer"},children:[e.jsx(Oa,{size:16}),e.jsx("span",{children:"Return to Hub"})]}),e.jsxs("button",{onClick:this.handleResetCache,style:{display:"inline-flex",alignItems:"center",gap:"0.5rem",padding:"0.75rem 1.25rem",background:"rgba(239, 68, 68, 0.1)",color:"#ef4444",border:"1px solid rgba(239, 68, 68, 0.25)",borderRadius:"8px",fontWeight:600,cursor:"pointer"},children:[e.jsx(te,{size:16}),e.jsx("span",{children:"Clear Local Cache"})]})]}),this.state.error&&e.jsxs("details",{style:{textAlign:"left",marginTop:"1.5rem",background:"rgba(0,0,0,0.3)",padding:"1rem",borderRadius:"8px",fontSize:"0.85rem",color:"#ef4444",fontFamily:"monospace"},children:[e.jsx("summary",{style:{cursor:"pointer",fontWeight:600,color:"var(--text-muted, #94a3b8)"},children:"Technical Error Diagnostics"}),e.jsxs("pre",{style:{marginTop:"0.75rem",overflowX:"auto",whiteSpace:"pre-wrap"},children:[this.state.error.toString(),(a=this.state.errorInfo)==null?void 0:a.componentStack]})]})]})}):this.props.children}}Fa.createRoot(document.getElementById("root")).render(e.jsx(Ge.StrictMode,{children:e.jsx(cn,{children:e.jsx(on,{})})}));export{Et as T};
