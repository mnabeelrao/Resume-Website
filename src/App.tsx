import { useEffect, useMemo, useRef, useState } from "react";
import {
  profile,
  skills,
  education,
  projects,
  experience,
  certifications,
  achievements,
} from "./data";

const sections = [
  { id: "about", label: "About" },
  { id: "education", label: "Education" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "experience", label: "Experience" },
  { id: "certifications", label: "Certifications" },
  { id: "achievements", label: "Achievements" },
  { id: "contact", label: "Contact" },
];

function useTyping(words: string[]) {
  const [text, setText] = useState("");
  const [i, setI] = useState(0);
  const [deleting, setDeleting] = useState(false);
  useEffect(() => {
    const word = words[i % words.length];
    const t = setTimeout(
      () => {
        if (!deleting) {
          const next = word.slice(0, text.length + 1);
          setText(next);
          if (next === word) setTimeout(() => setDeleting(true), 1200);
        } else {
          const next = word.slice(0, text.length - 1);
          setText(next);
          if (next === "") {
            setDeleting(false);
            setI(i + 1);
          }
        }
      },
      deleting ? 35 : 80
    );
    return () => clearTimeout(t);
  }, [text, deleting, i, words]);
  return text;
}

function useReveal<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setSeen(true);
          io.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return [ref, seen] as const;
}

function Section({
  id,
  title,
  kicker,
  children,
}: {
  id: string;
  title: string;
  kicker: string;
  children: React.ReactNode;
}) {
  const [ref, seen] = useReveal<HTMLElement>();
  return (
    <section
      id={id}
      ref={ref}
      className={`mx-auto max-w-5xl px-5 py-16 transition-all duration-700 ${
        seen ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
      }`}
    >
      <p className="text-sm font-semibold uppercase tracking-widest text-sky-600 dark:text-sky-400">
        {kicker}
      </p>
      <h2 className="mb-8 mt-1 text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
        {title}
      </h2>
      {children}
    </section>
  );
}

const card =
  "rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900";

export default function App() {
  const [dark, setDark] = useState(() => {
    const saved = localStorage.getItem("theme");
    if (saved) return saved === "dark";
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  });
  const [menu, setMenu] = useState(false);
  const [active, setActive] = useState("about");
  const [filter, setFilter] = useState("All");
  const [skillTab, setSkillTab] = useState(0);
  const [copied, setCopied] = useState(false);
  const [progress, setProgress] = useState(0);
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const role = useTyping(profile.roles);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
    localStorage.setItem("theme", dark ? "dark" : "light");
  }, [dark]);

  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      setProgress((h.scrollTop / (h.scrollHeight - h.clientHeight)) * 100);
      let current = "about";
      for (const s of sections) {
        const el = document.getElementById(s.id);
        if (el && el.getBoundingClientRect().top < 140) current = s.id;
      }
      setActive(current);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const categories = useMemo(
    () => ["All", ...Array.from(new Set(projects.map((p) => p.category)))],
    []
  );
  const shown = projects.filter((p) => filter === "All" || p.category === filter);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
    } catch {
      /* ignore */
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Portfolio message from ${form.name}`);
    const body = encodeURIComponent(`${form.message}\n\nFrom: ${form.name} (${form.email})`);
    window.open(`${profile.gmailLink}&su=${subject}&body=${body}`, "_blank");
  };

  const initials = "MN";

  return (
    <div className="min-h-screen bg-slate-50 text-slate-700 transition-colors dark:bg-slate-950 dark:text-slate-300">
      {/* Navbar */}
      <nav className="fixed inset-x-0 top-0 z-50 border-b border-slate-200 bg-white/80 backdrop-blur dark:border-slate-800 dark:bg-slate-950/80">
        <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-5">
          <a href="#top" className="flex items-center gap-2 font-bold text-slate-900 dark:text-white">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-600 text-sm text-white">
              {initials}
            </span>
            <span className="hidden sm:inline">Nabeel Rao</span>
          </a>
          <ul className="hidden items-center gap-1 lg:flex">
            {sections.map((s) => (
              <li key={s.id}>
                <a
                  href={`#${s.id}`}
                  className={`rounded-md px-3 py-2 text-sm font-medium transition ${
                    active === s.id
                      ? "bg-sky-100 text-sky-700 dark:bg-sky-950 dark:text-sky-300"
                      : "hover:text-sky-600 dark:hover:text-sky-300"
                  }`}
                >
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setDark(!dark)}
              aria-label="Toggle dark mode"
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-lg transition hover:bg-slate-100 dark:border-slate-700 dark:hover:bg-slate-800"
            >
              {dark ? "☀️" : "🌙"}
            </button>
            <button
              onClick={() => setMenu(!menu)}
              aria-label="Toggle menu"
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 lg:hidden dark:border-slate-700"
            >
              {menu ? "✕" : "☰"}
            </button>
          </div>
        </div>
        {menu && (
          <ul className="border-t border-slate-200 bg-white px-5 py-3 lg:hidden dark:border-slate-800 dark:bg-slate-950">
            {sections.map((s) => (
              <li key={s.id}>
                <a
                  href={`#${s.id}`}
                  onClick={() => setMenu(false)}
                  className="block rounded-md px-3 py-2 text-sm font-medium hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        )}
        <div className="h-0.5 bg-sky-600 transition-[width]" style={{ width: `${progress}%` }} />
      </nav>

      {/* Hero */}
      <header id="top" className="relative overflow-hidden pt-16">
        <div className="absolute inset-0 -z-0 bg-gradient-to-br from-sky-50 via-white to-indigo-50 dark:from-slate-900 dark:via-slate-950 dark:to-sky-950" />
        <div className="relative mx-auto flex max-w-5xl flex-col items-center gap-10 px-5 py-20 md:flex-row md:py-28">
          <div className="fade-up flex-1 text-center md:text-left">
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-sky-600 dark:text-sky-400">
              Hello, I'm
            </p>
            <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl dark:text-white">
              {profile.name}
            </h1>
            <p className="mt-4 h-8 text-xl font-medium text-sky-700 dark:text-sky-300">
              {role}
              <span className="caret">|</span>
            </p>
            <p className="mt-4 max-w-xl text-slate-600 md:max-w-lg dark:text-slate-400">
              Building practical software, AI/NLP solutions and web-based projects — and
              researching true random number generation.
            </p>
            <div className="no-print mt-8 flex flex-wrap justify-center gap-3 md:justify-start">
              <a
                href="#projects"
                className="rounded-lg bg-sky-600 px-5 py-3 text-sm font-semibold text-white shadow transition hover:bg-sky-700"
              >
                View Projects
              </a>
              <a
                href="#contact"
                className="rounded-lg border border-slate-300 px-5 py-3 text-sm font-semibold transition hover:bg-white dark:border-slate-700 dark:hover:bg-slate-800"
              >
                Contact Me
              </a>
              <button
                onClick={() => window.print()}
                className="rounded-lg border border-slate-300 px-5 py-3 text-sm font-semibold transition hover:bg-white dark:border-slate-700 dark:hover:bg-slate-800"
              >
                ⬇ Save as PDF
              </button>
            </div>
          </div>
          <div className="fade-up relative">
            <div className="absolute -inset-3 rounded-full bg-gradient-to-tr from-sky-500 to-indigo-500 opacity-30 blur-2xl" />
            <div className="relative flex h-48 w-48 items-center justify-center rounded-full border-4 border-white bg-gradient-to-br from-sky-600 to-indigo-600 text-6xl font-extrabold text-white shadow-xl sm:h-60 sm:w-60 sm:text-7xl dark:border-slate-800">
              {initials}
            </div>
          </div>
        </div>
      </header>

      {/* About */}
      <Section id="about" kicker="Introduction" title="Professional Summary">
        <div className="grid gap-6 md:grid-cols-3">
          <p className={`${card} leading-relaxed md:col-span-2`}>{profile.summary}</p>
          <div className={`${card} space-y-3 text-sm`}>
            <p>
              <span className="mr-2">💬</span>
              <a
                className="font-medium text-sky-600 hover:underline dark:text-sky-400"
                href={profile.whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                title="Chat on WhatsApp"
              >
                {profile.phone} (WhatsApp)
              </a>{" "}
              <a
                className="ml-1 text-xs text-slate-500 hover:text-sky-600 hover:underline"
                href={`tel:+${profile.whatsappNumber}`}
                title="Call this number"
              >
                · Call
              </a>
            </p>
            <p className="break-all">
              <span className="mr-2">✉️</span>
              <a className="text-sky-600 hover:underline dark:text-sky-400" href={profile.gmailLink} target="_blank" rel="noopener noreferrer" title="Compose in Gmail">
                {profile.email}
              </a>
            </p>
            <p className="break-all">
              <span className="mr-2">🔗</span>
              <a className="text-sky-600 hover:underline dark:text-sky-400" href={profile.linkedin} target="_blank" rel="noreferrer">
                {profile.linkedinLabel}
              </a>
            </p>
          </div>
        </div>
      </Section>

      {/* Education */}
      <Section id="education" kicker="Background" title="Education">
        {education.map((e) => (
          <div key={e.degree} className={`${card} flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between`}>
            <div>
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white">{e.degree}</h3>
              <p className="text-sky-700 dark:text-sky-300">{e.school}</p>
              <p className="mt-2 text-sm">{e.details}</p>
            </div>
            <span className="shrink-0 rounded-full bg-sky-100 px-3 py-1 text-xs font-semibold text-sky-700 dark:bg-sky-950 dark:text-sky-300">
              {e.period}
            </span>
          </div>
        ))}
      </Section>

      {/* Skills (interactive tabs + animated bars) */}
      <Section id="skills" kicker="Technical Skills" title="What I Work With">
        <div className="mb-6 flex flex-wrap gap-2">
          {skills.map((g, i) => (
            <button
              key={g.group}
              onClick={() => setSkillTab(i)}
              className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                skillTab === i
                  ? "bg-sky-600 text-white shadow"
                  : "border border-slate-300 hover:bg-white dark:border-slate-700 dark:hover:bg-slate-800"
              }`}
            >
              {g.icon} {g.group}
            </button>
          ))}
        </div>
        <div key={skillTab} className={`${card} fade-up grid gap-5 sm:grid-cols-2`}>
          {skills[skillTab].items.map((s) => (
            <div key={s.name}>
              <div className="mb-1 flex justify-between text-sm font-medium">
                <span className="text-slate-900 dark:text-white">{s.name}</span>
                <span>{s.level}%</span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-sky-500 to-indigo-500"
                  style={{ width: `${s.level}%`, transition: "width 1s ease" }}
                />
              </div>
            </div>
          ))}
        </div>
        <p className="mt-3 text-xs text-slate-500">
          Currently learning: SAP ABAP and AWS (in progress). Bars show self-assessed proficiency.
        </p>
      </Section>

      {/* Projects (filter) */}
      <Section id="projects" kicker="Portfolio" title="Projects">
        <div className="no-print mb-6 flex flex-wrap gap-2">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setFilter(c)}
              className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                filter === c
                  ? "bg-sky-600 text-white shadow"
                  : "border border-slate-300 hover:bg-white dark:border-slate-700 dark:hover:bg-slate-800"
              }`}
            >
              {c}
              <span className="ml-1 opacity-70">
                ({c === "All" ? projects.length : projects.filter((p) => p.category === c).length})
              </span>
            </button>
          ))}
        </div>
        <div className="grid gap-5 md:grid-cols-2">
          {shown.map((p) => (
            <article
              key={p.title}
              className={`${card} fade-up transition hover:-translate-y-1 hover:shadow-lg`}
            >
              <div className="mb-3 flex items-center justify-between gap-2">
                <span className="rounded-full bg-indigo-100 px-3 py-1 text-xs font-semibold text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300">
                  {p.category}
                </span>
                {p.status && (
                  <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">
                    {p.status}
                  </span>
                )}
              </div>
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white">{p.title}</h3>
              <ul className="mt-3 list-disc space-y-1 pl-5 text-sm">
                {p.points.map((pt) => (
                  <li key={pt}>{pt}</li>
                ))}
              </ul>
              <div className="mt-4 flex flex-wrap gap-2">
                {p.tech.map((t) => (
                  <span
                    key={t}
                    className="rounded-md bg-slate-100 px-2 py-1 text-xs font-medium dark:bg-slate-800"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </Section>

      {/* Experience */}
      <Section id="experience" kicker="Career" title="Experience">
        <ol className="relative space-y-6 border-l-2 border-sky-200 pl-6 dark:border-sky-900">
          {experience.map((x) => (
            <li key={x.role + x.org} className="relative">
              <span className="absolute -left-[33px] top-6 h-4 w-4 rounded-full border-4 border-slate-50 bg-sky-600 dark:border-slate-950" />
              <div className={card}>
                <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-white">{x.role}</h3>
                  <span className="text-sm font-semibold text-sky-700 dark:text-sky-300">{x.period}</span>
                </div>
                <p className="text-sm font-medium text-slate-500">{x.org}</p>
                <ul className="mt-3 list-disc space-y-1 pl-5 text-sm">
                  {x.points.map((pt) => (
                    <li key={pt}>{pt}</li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ol>
      </Section>

      {/* Certifications */}
      <Section id="certifications" kicker="Learning" title="Certifications & Training">
        <div className="grid gap-5 sm:grid-cols-3">
          {certifications.map((c) => (
            <div key={c.name} className={card}>
              <div className="mb-3 text-3xl">🎓</div>
              <h3 className="font-semibold text-slate-900 dark:text-white">{c.name}</h3>
              <p className="text-sm">{c.issuer}</p>
              <span className="mt-3 inline-block rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-700 dark:bg-amber-950 dark:text-amber-300">
                {c.status}
              </span>
            </div>
          ))}
        </div>
      </Section>

      {/* Achievements */}
      <Section id="achievements" kicker="Highlights" title="Achievements">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {achievements.map((a) => (
            <div key={a.stat} className={`${card} text-center`}>
              <div className="bg-gradient-to-r from-sky-600 to-indigo-600 bg-clip-text text-4xl font-extrabold text-transparent">
                {a.stat}
              </div>
              <p className="mt-2 text-sm">{a.text}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Contact */}
      <Section id="contact" kicker="Get in touch" title="Contact">
        <div className="grid gap-6 md:grid-cols-2">
          <div className={`${card} space-y-4`}>
            <div>
              <p className="text-xs font-semibold uppercase text-slate-500">Email</p>
              <div className="flex flex-wrap items-center gap-3">
                <a className="break-all font-medium text-sky-600 hover:underline dark:text-sky-400" href={profile.gmailLink} target="_blank" rel="noreferrer">
                  {profile.email}
                </a>
                <button
                  onClick={copyEmail}
                  className="rounded-md border border-slate-300 px-2 py-1 text-xs font-medium hover:bg-slate-100 dark:border-slate-700 dark:hover:bg-slate-800"
                >
                  {copied ? "✓ Copied" : "Copy"}
                </button>
              </div>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase text-slate-500">Phone / WhatsApp</p>
              <div className="flex flex-wrap items-center gap-3">
                <a
                  className="font-medium text-sky-600 hover:underline dark:text-sky-400"
                  href={profile.whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  title="Chat on WhatsApp"
                >
                  {profile.phone}
                </a>
                <button
                  type="button"
                  onClick={() => window.open(profile.whatsappLink, "_blank", "noopener,noreferrer")}
                  className="inline-flex items-center gap-1.5 rounded-md bg-[#25D366] px-3 py-1.5 text-xs font-semibold text-white shadow transition hover:bg-[#1DA851]"
                  title="Open WhatsApp chat"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" className="h-3.5 w-3.5" aria-hidden="true">
                    <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5.1-1.3A10 10 0 1 0 12 2Zm0 2a8 8 0 1 1-4.1 14.9l-.3-.2-3 .8.8-2.9-.2-.3A8 8 0 0 1 12 4Zm-3.2 4.1c-.2 0-.5 0-.7.3-.2.3-.9.9-.9 2.2s.9 2.5 1.1 2.7c.1.2 1.9 3.1 4.8 4.1 2.4.9 2.9.7 3.4.7.5-.1 1.7-.7 1.9-1.4.2-.6.2-1.2.2-1.3-.1-.1-.3-.2-.6-.3l-2-1c-.3-.1-.5-.2-.7.1l-.9 1.1c-.2.2-.3.2-.6.1a7.6 7.6 0 0 1-2.2-1.4 8.2 8.2 0 0 1-1.5-1.9c-.2-.3 0-.4.1-.6l.5-.6c.1-.2.2-.3.3-.5.1-.2 0-.4 0-.5L9.6 6.5c-.2-.4-.4-.4-.8-.4Z" />
                  </svg>
                  Chat on WhatsApp
                </button>
                <a
                  className="rounded-md border border-slate-300 px-3 py-1 text-xs font-medium hover:bg-slate-100 dark:border-slate-700 dark:hover:bg-slate-800"
                  href={`tel:+${profile.whatsappNumber}`}
                  title="Call this number"
                >
                  Call
                </a>
              </div>
              <p className="mt-1 text-xs text-slate-500">
                Opens WhatsApp chat with +{profile.whatsappNumber}. If it says the number is
                invalid, that number is not registered on WhatsApp.
              </p>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase text-slate-500">LinkedIn</p>
              <a className="break-all font-medium text-sky-600 hover:underline dark:text-sky-400" href={profile.linkedin} target="_blank" rel="noreferrer">
                {profile.linkedinLabel}
              </a>
            </div>
          </div>
          <form onSubmit={submit} className={`${card} no-print space-y-3`}>
            {(["name", "email"] as const).map((f) => (
              <input
                key={f}
                required
                type={f === "email" ? "email" : "text"}
                placeholder={f === "name" ? "Your name" : "Your email"}
                value={form[f]}
                onChange={(e) => setForm({ ...form, [f]: e.target.value })}
                className="w-full rounded-lg border border-slate-300 bg-transparent px-3 py-2 text-sm outline-none focus:border-sky-500 dark:border-slate-700"
              />
            ))}
            <textarea
              required
              rows={4}
              placeholder="Your message"
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              className="w-full rounded-lg border border-slate-300 bg-transparent px-3 py-2 text-sm outline-none focus:border-sky-500 dark:border-slate-700"
            />
            <button className="w-full rounded-lg bg-sky-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-sky-700">
              Send Message
            </button>
          </form>
        </div>
      </Section>

      <footer className="border-t border-slate-200 py-8 text-center text-sm text-slate-500 dark:border-slate-800">
        © {new Date().getFullYear()} {profile.name} Portfolio.
      </footer>
    </div>
  );
}
