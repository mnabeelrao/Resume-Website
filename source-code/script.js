// ============ DATA ============
const EMAIL = "nabeelrao2002@gmail.com";
const GMAIL_LINK = "https://mail.google.com/mail/?view=cm&fs=1&to=" + EMAIL;
const WA_NUMBER = "923162463192";
const WA_LINK = "https://api.whatsapp.com/send?phone=" + WA_NUMBER + "&text=" + encodeURIComponent("Hello Nabeel, I saw your online resume");

const ROLES = ["Computer Science Undergraduate","Java & Python Developer","AI / NLP Enthusiast","Co-founder & Researcher"];

const SKILLS = [
  { group:"Languages", icon:"{ }", items:[["Java",85],["Python",80],["HTML",85],["CSS",80]] },
  { group:"AI / Data", icon:"AI", items:[["AI / ML",75],["NLP",70],["Data Analytics",70]] },
  { group:"Framework / UI & Cloud", icon:"☁", items:[["JavaFX",80],["AWS (Academic / Project)",60]] },
  { group:"Core & Additional", icon:"★", items:[["Object-Oriented Programming",85],["Application Development",80],["Technical Research",75],["Content Strategy & Research",80],["Digital Marketing",75],["Client Relations",80]] }
];

const PROJECTS = [
  { title:"Vision-Based Entropy Source for True Random Number Generation", cat:"Research", status:"Ongoing",
    points:["Research project exploring a vision-based entropy source for true random number generation.","Focus: entropy quality, randomness evaluation, and experimental validation."],
    tech:["Research","Computer Vision","Randomness"] },
  { title:"Multi-Agent Debate", cat:"AI", points:["Built an AI-based multi-agent system where multiple agents participate in structured debate.","Explored agent roles, interaction, reasoning, and response evaluation."], tech:["Python","AI","NLP"] },
  { title:"Resume Analyzer", cat:"AI", points:["Developed an AI/NLP-oriented application for analyzing resumes and extracting useful information.","Designed around practical resume evaluation and career-oriented analysis."], tech:["Python","NLP"] },
  { title:"Skill Mapper", cat:"AI", points:["Created a career-oriented application for mapping skills and identifying relevant skill areas.","Used AI/data-driven approaches to support learning and career planning."], tech:["Python","Data Analytics"] },
  { title:"Study Planner AI", cat:"AI", points:["Developed an AI-assisted study planning application concept for organizing learning tasks.","Focused on personalized study guidance and planning."], tech:["Python","AI"] },
  { title:"Bank Management System — Java / JavaFX", cat:"Desktop", points:["Built a desktop banking application using Java and JavaFX.","Demonstrated object-oriented programming, GUI development, and core banking operations."], tech:["Java","JavaFX","OOP"] },
  { title:"Avoid Traffic", cat:"Desktop", points:["Developed an application focused on improving route or traffic-avoidance decisions.","Applied programming and problem-solving to a practical scenario."], tech:["Java","Problem Solving"] }
];

// ============ THEME ============
const themeBtn = document.getElementById("themeBtn");
function setTheme(dark){
  document.documentElement.classList.toggle("dark", dark);
  document.body.classList.toggle("dark", dark);
  localStorage.setItem("theme", dark ? "dark" : "light");
  themeBtn.textContent = dark ? "☀️" : "🌙";
}
let darkInit = localStorage.getItem("theme");
if(darkInit === null) darkInit = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
setTheme(darkInit === "dark");
themeBtn.onclick = () => setTheme(!document.body.classList.contains("dark"));

// ============ MOBILE MENU ============
const menuBtn = document.getElementById("menuBtn");
const mobileMenu = document.getElementById("mobileMenu");
menuBtn.onclick = () => {
  const open = mobileMenu.classList.toggle("open");
  menuBtn.textContent = open ? "✕" : "☰";
};
mobileMenu.querySelectorAll("a").forEach(a => a.onclick = () => { mobileMenu.classList.remove("open"); menuBtn.textContent = "☰"; });

// ============ TYPING ============
(function(){
  const el = document.getElementById("typing");
  let wi = 0, ci = 0, del = false;
  function tick(){
    const word = ROLES[wi % ROLES.length];
    el.textContent = del ? word.slice(0, ci--) : word.slice(0, ci++);
    let t = del ? 35 : 80;
    if(!del && ci > word.length){ del = true; ci = word.length; t = 1200; }
    if(del && ci < 0){ del = false; ci = 0; wi++; }
    setTimeout(tick, t);
  }
  tick();
})();

// ============ SCROLL: progress + spy + reveal ============
const progress = document.getElementById("progress");
const secIds = ["about","education","skills","projects","experience","certifications","achievements","contact"];
window.addEventListener("scroll", () => {
  const h = document.documentElement;
  progress.style.width = (h.scrollTop / (h.scrollHeight - h.clientHeight) * 100) + "%";
  let cur = "about";
  secIds.forEach(id => {
    const s = document.getElementById(id);
    if(s && s.getBoundingClientRect().top < 140) cur = id;
  });
  document.querySelectorAll("[data-nav]").forEach(a => a.classList.toggle("active", a.dataset.nav === cur));
}, { passive:true });

const io = new IntersectionObserver(es => es.forEach(e => { if(e.isIntersecting){ e.target.classList.add("visible"); io.unobserve(e.target);} }), { threshold:.12 });
document.querySelectorAll(".reveal").forEach(el => io.observe(el));

// ============ SKILLS TABS ============
const skillTabs = document.getElementById("skillTabs");
const skillGrid = document.getElementById("skillGrid");
let skillActive = 0;
function renderSkills(){
  skillTabs.innerHTML = "";
  SKILLS.forEach((g,i) => {
    const b = document.createElement("button");
    b.className = "chip" + (i===skillActive ? " active" : "");
    b.textContent = g.icon + " " + g.group;
    b.onclick = () => { skillActive = i; renderSkills(); };
    skillTabs.appendChild(b);
  });
  skillGrid.innerHTML = "";
  SKILLS[skillActive].items.forEach(([name,lvl]) => {
    const d = document.createElement("div");
    d.innerHTML = `<div class="skill-top"><span>${name}</span><span>${lvl}%</span></div><div class="bar"><div class="bar-fill"></div></div>`;
    skillGrid.appendChild(d);
    requestAnimationFrame(() => requestAnimationFrame(() => d.querySelector(".bar-fill").style.width = lvl + "%"));
  });
}
renderSkills();

// ============ PROJECT FILTER ============
const cats = ["All", ...new Set(PROJECTS.map(p => p.cat))];
let activeCat = "All";
const pf = document.getElementById("projectFilters");
const pg = document.getElementById("projectGrid");
function renderProjects(){
  pf.innerHTML = "";
  cats.forEach(c => {
    const n = c==="All" ? PROJECTS.length : PROJECTS.filter(p=>p.cat===c).length;
    const b = document.createElement("button");
    b.className = "chip" + (c===activeCat ? " active" : "");
    b.textContent = `${c} (${n})`;
    b.onclick = () => { activeCat = c; renderProjects(); };
    pf.appendChild(b);
  });
  pg.innerHTML = "";
  PROJECTS.filter(p => activeCat==="All" || p.cat===activeCat).forEach(p => {
    const a = document.createElement("article");
    a.className = "card project";
    a.innerHTML = `<div class="tag-row"><span class="tag">${p.cat}</span>${p.status?`<span class="tag green">${p.status}</span>`:""}</div>
      <h3>${p.title}</h3><ul class="bullets">${p.points.map(x=>`<li>${x}</li>`).join("")}</ul>
      <div class="tech-row">${p.tech.map(t=>`<span class="tech">${t}</span>`).join("")}</div>`;
    pg.appendChild(a);
  });
}
renderProjects();

// ============ COPY EMAIL ============
document.getElementById("copyEmail").onclick = async function(){
  try{ await navigator.clipboard.writeText(EMAIL); }catch(e){}
  this.textContent = "✓ Copied";
  setTimeout(() => this.textContent = "Copy", 1800);
};

// ============ CONTACT FORM -> GMAIL ============
document.getElementById("contactForm").onsubmit = function(e){
  e.preventDefault();
  const n = document.getElementById("fName").value;
  const m = document.getElementById("fMsg").value;
  const em = document.getElementById("fEmail").value;
  const su = encodeURIComponent("Portfolio message from " + n);
  const body = encodeURIComponent(m + "\n\nFrom: " + n + " (" + em + ")");
  window.open(`${GMAIL_LINK}&su=${su}&body=${body}`, "_blank");
};

document.getElementById("year").textContent = new Date().getFullYear();
