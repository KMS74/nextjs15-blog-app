"use client";

import * as React from "react";

const languageMeta = {
  typescript: { label: "TypeScript", color: "#3178c6" },
  ts: { label: "TypeScript", color: "#3178c6" },
  tsx: { label: "React / TSX", color: "#61dafb" },
  javascript: { label: "JavaScript", color: "#f7df1e" },
  js: { label: "JavaScript", color: "#f7df1e" },
  jsx: { label: "React / JSX", color: "#61dafb" },
  html: { label: "HTML5", color: "#e34f26" },
  css: { label: "CSS3", color: "#38bdf8" },
  json: { label: "JSON", color: "#10b981" },
  bash: { label: "Terminal / Bash", color: "#a855f7" },
  sh: { label: "Shell", color: "#a855f7" },
  shell: { label: "Shell", color: "#a855f7" },
  sql: { label: "SQL", color: "#f97316" },
};

export function CodeBlockEnhancer() {
  React.useEffect(() => {
    const preBlocks = document.querySelectorAll(".prose pre");

    preBlocks.forEach((pre) => {
      // Guard against double enhancement
      if (pre.querySelector(".code-window-header")) return;

      const codeElement = pre.querySelector("code");
      let rawLang = codeElement?.getAttribute("data-lang") || "";

      if (!rawLang && codeElement) {
        const match = (codeElement.className || "").match(/language-([a-zA-Z0-9_-]+)/);
        if (match) rawLang = match[1];
      }
      rawLang = rawLang.toLowerCase();

      const langInfo = languageMeta[rawLang] || {
        label: rawLang ? rawLang.toUpperCase() : "CODE",
        color: "#94a3b8",
      };

      // Create window header container
      const header = document.createElement("div");
      header.className =
        "code-window-header flex items-center justify-between px-4 py-2.5 bg-slate-900/95 border-b border-slate-800 text-xs text-slate-400 select-none rounded-t-xl";

      // Left: macOS traffic light window buttons
      const windowControls = document.createElement("div");
      windowControls.className = "flex items-center gap-1.5";
      windowControls.innerHTML = `
        <span class="w-3 h-3 rounded-full bg-[#ff5f56] inline-block shadow-sm transition-opacity hover:opacity-80"></span>
        <span class="w-3 h-3 rounded-full bg-[#ffbd2e] inline-block shadow-sm transition-opacity hover:opacity-80"></span>
        <span class="w-3 h-3 rounded-full bg-[#27c93f] inline-block shadow-sm transition-opacity hover:opacity-80"></span>
      `;

      // Center: Language badge with indicator dot
      const langBadge = document.createElement("div");
      langBadge.className =
        "flex items-center gap-1.5 text-[11px] font-mono font-medium text-slate-300 bg-slate-800/80 px-2.5 py-0.5 rounded-md border border-slate-700/60";
      langBadge.innerHTML = `
        <span class="w-2 h-2 rounded-full inline-block" style="background-color: ${langInfo.color}"></span>
        <span>${langInfo.label}</span>
      `;

      // Right: Copy code button
      const copyBtn = document.createElement("button");
      copyBtn.className =
        "code-copy-btn flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-medium text-slate-400 hover:text-slate-100 hover:bg-slate-800/80 border border-transparent hover:border-slate-700 transition-all duration-200 active:scale-95";
      copyBtn.innerHTML = `
        <svg class="copy-icon w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <rect width="14" height="14" x="8" y="8" rx="2" ry="2"/>
          <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/>
        </svg>
        <span class="copy-text">Copy</span>
      `;
      copyBtn.setAttribute("aria-label", "Copy code to clipboard");

      copyBtn.addEventListener("click", async (e) => {
        e.preventDefault();
        e.stopPropagation();

        const textToCopy = codeElement ? codeElement.innerText : pre.innerText;

        try {
          await navigator.clipboard.writeText(textToCopy);
          copyBtn.innerHTML = `
            <svg class="w-3.5 h-3.5 text-emerald-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="20 6 9 17 4 12"/>
            </svg>
            <span class="copy-text text-emerald-400 font-semibold">Copied!</span>
          `;
          copyBtn.classList.add("border-emerald-500/40", "bg-emerald-500/10");

          setTimeout(() => {
            copyBtn.innerHTML = `
              <svg class="copy-icon w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <rect width="14" height="14" x="8" y="8" rx="2" ry="2"/>
                <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/>
              </svg>
              <span class="copy-text">Copy</span>
            `;
            copyBtn.classList.remove("border-emerald-500/40", "bg-emerald-500/10");
          }, 2000);
        } catch (err) {
          console.error("Failed to copy code snippet:", err);
        }
      });

      header.appendChild(windowControls);
      header.appendChild(langBadge);
      header.appendChild(copyBtn);

      // Pre style adjustments
      pre.classList.add("modern-code-block");
      pre.insertBefore(header, pre.firstChild);
    });
  }, []);

  return null;
}
