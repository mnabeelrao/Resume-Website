import { useMemo, useState } from "react";
import htmlSrc from "../source-code/index.html?raw";
import cssSrc from "../source-code/styles.css?raw";
import jsSrc from "../source-code/script.js?raw";
import readmeSrc from "../source-code/README.md?raw";
import pkgRaw from "../package.json?raw";
import rootHtmlRaw from "../index.html?raw";
import mainRaw from "./main.tsx?raw";
import appRaw from "./App.tsx?raw";
import dataRaw from "./data.ts?raw";
import indexCssRaw from "./index.css?raw";
import viteCfgRaw from "../vite.config.ts?raw";

type F = { path: string; label: string; content: string };

const groups: { id: string; title: string; desc: string; files: F[] }[] = [
  {
    id: "static",
    title: "📁 source-code/ — plain HTML / CSS / JS",
    desc: "No build step. Upload these 4 files to GitHub root for GitHub Pages. Best for your assignment submission.",
    files: [
      { path: "source-code/index.html", label: "index.html", content: htmlSrc },
      { path: "source-code/styles.css", label: "styles.css", content: cssSrc },
      { path: "source-code/script.js", label: "script.js", content: jsSrc },
      { path: "source-code/README.md", label: "README.md", content: readmeSrc },
    ],
  },
  {
    id: "react",
    title: "📁 React + Vite project — open in VS Code",
    desc: "Full project source. Download, run npm install + npm run dev in VS Code.",
    files: [
      { path: "package.json", label: "package.json", content: pkgRaw },
      { path: "index.html", label: "index.html", content: rootHtmlRaw },
      { path: "vite.config.ts", label: "vite.config.ts", content: viteCfgRaw },
      { path: "src/main.tsx", label: "src/main.tsx", content: mainRaw },
      { path: "src/App.tsx", label: "src/App.tsx", content: appRaw },
      { path: "src/data.ts", label: "src/data.ts", content: dataRaw },
      { path: "src/index.css", label: "src/index.css", content: indexCssRaw },
    ],
  },
];

function download(path: string, text: string) {
  const name = path.split("/").pop() || path;
  const blob = new Blob([text], { type: "text/plain;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = name;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

export default function SourceSection() {
  const [group, setGroup] = useState(0);
  const [tab, setTab] = useState(0);
  const [copied, setCopied] = useState(false);
  const files = groups[group].files;
  const active = files[Math.min(tab, files.length - 1)];
  const content = active.content;
  const lines = useMemo(() => content.split("\n").length, [content]);
  const size = useMemo(() => (new Blob([content]).size / 1024).toFixed(1) + " KB", [content]);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(content);
    } catch {
      const ta = document.createElement("textarea");
      ta.value = content;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      ta.remove();
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 1600);
  };

  const downloadAll = () => {
    files.forEach((f, i) => setTimeout(() => download(f.path, f.content), i * 450));
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        {groups.map((g, i) => (
          <button
            key={g.id}
            onClick={() => {
              setGroup(i);
              setTab(0);
            }}
            className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
              group === i
                ? "bg-sky-600 text-white shadow"
                : "border border-slate-300 dark:border-slate-700"
            }`}
          >
            {g.title}
          </button>
        ))}
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="font-mono text-sm font-semibold text-slate-900 dark:text-white">
              {groups[group].title}
            </p>
            <p className="mt-1 text-sm text-slate-500">{groups[group].desc}</p>
          </div>
          <button
            onClick={downloadAll}
            className="shrink-0 rounded-lg bg-sky-600 px-4 py-2.5 text-sm font-semibold text-white shadow transition hover:bg-sky-700"
          >
            ⬇ Download ({files.length} files)
          </button>
        </div>
        <div className="mt-4 grid gap-2 font-mono text-xs sm:grid-cols-2">
          {files.map((f) => (
            <div
              key={f.path}
              className="flex items-center justify-between rounded-lg bg-slate-50 px-3 py-2 dark:bg-slate-800"
            >
              <span className="truncate">{f.path}</span>
              <span className="ml-2 shrink-0 text-slate-500">
                {(new Blob([f.content]).size / 1024).toFixed(1)} KB
              </span>
            </div>
          ))}
        </div>
        {groups[group].id === "react" && (
          <div className="mt-4 rounded-xl bg-slate-50 p-4 text-sm dark:bg-slate-800">
            <p className="font-semibold text-slate-900 dark:text-white">
              Open in VS Code — steps:
            </p>
            <ol className="mt-2 list-decimal space-y-1 pl-5 text-slate-600 dark:text-slate-300">
              <li>Create folder `nabeel-resume`, inside it recreate `src/` + `source-code/` subfolders.</li>
              <li>Download each file above and save it to the matching path.</li>
              <li>Open the folder in VS Code: File → Open Folder.</li>
              <li>Open Terminal in VS Code and run: `npm install` then `npm run dev`.</li>
              <li>Build anytime with `npm run build`.</li>
            </ol>
          </div>
        )}
      </div>

      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="flex flex-wrap items-center gap-2 border-b border-slate-200 p-3 dark:border-slate-800">
          {files.map((f, i) => (
            <button
              key={f.path}
              onClick={() => setTab(i)}
              className={`rounded-md px-3 py-1.5 font-mono text-xs font-semibold transition ${
                tab === i
                  ? "bg-sky-600 text-white"
                  : "bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700"
              }`}
            >
              {f.label}
            </button>
          ))}
          <div className="ml-auto flex items-center gap-2 text-xs text-slate-500">
            <span>
              {lines} lines · {size}
            </span>
            <button
              onClick={copy}
              className="rounded-md border border-slate-300 px-2.5 py-1 font-semibold hover:bg-slate-100 dark:border-slate-700 dark:hover:bg-slate-800"
            >
              {copied ? "✓ Copied" : "Copy"}
            </button>
            <button
              onClick={() => download(active.path, content)}
              className="rounded-md border border-slate-300 px-2.5 py-1 font-semibold hover:bg-slate-100 dark:border-slate-700 dark:hover:bg-slate-800"
            >
              ⬇ {active.label}
            </button>
          </div>
        </div>
        <pre className="max-h-[420px] overflow-auto bg-slate-950 p-4 font-mono text-xs leading-relaxed text-slate-200">
          <code>{content}</code>
        </pre>
      </div>
    </div>
  );
}
