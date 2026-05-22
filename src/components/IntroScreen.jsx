import React, { useState, useEffect } from "react";
import "../styles/IntroScreen.css";

const GREETINGS = [
  { text: "Welcome",    lang: "en" },
  { text: "Bienvenue",  lang: "fr" },
  { text: "مرحباً",     lang: "ar" },
  { text: "Bienvenido", lang: "es" },
  { text: "Willkommen", lang: "de" },
  { text: "ようこそ",   lang: "ja" },
  { text: "欢迎",       lang: "zh" },
];

// Timing constants (ms)
const WORD_MS    = 680;  // total time for one word: enter + hold + exit
const STAGGER_MS = 540;  // delay increment between word starts
const PAUSE_MS   = 260;  // rest after the last word exits before the curtain lifts
const OUTRO_MS   = 720;  // curtain slide-up duration

export default function IntroScreen() {
  const [leaving, setLeaving] = useState(false);
  const [gone,    setGone]    = useState(false);

  useEffect(() => {
    // When does the last word's animation finish?
    const lastWordEnd  = (GREETINGS.length - 1) * STAGGER_MS + WORD_MS;
    const outroStart   = lastWordEnd + PAUSE_MS;

    const t1 = setTimeout(() => setLeaving(true), outroStart);
    const t2 = setTimeout(() => setGone(true),    outroStart + OUTRO_MS + 60);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  if (gone) return null;

  // Progress bar fills exactly until the outro begins
  const progressMs = (GREETINGS.length - 1) * STAGGER_MS + WORD_MS + PAUSE_MS;

  return (
    <div
      className={`intro-screen${leaving ? " is-leaving" : ""}`}
      aria-hidden="true"
      role="presentation"
    >
      {/* Clipping stage — one word visible at a time */}
      <div className="intro-stage">
        {GREETINGS.map(({ text, lang }, i) => (
          <span
            key={lang}
            className="intro-word"
            lang={lang}
            style={{
              "--i":          i,
              "--word-ms":    `${WORD_MS}ms`,
              "--stagger-ms": `${STAGGER_MS}ms`,
            }}
          >
            {text}
          </span>
        ))}
      </div>

      {/* Thin progress line at the bottom */}
      <div className="intro-progress" aria-hidden="true">
        <div
          className="intro-progress-fill"
          style={{ "--prog-ms": `${progressMs}ms` }}
        />
      </div>
    </div>
  );
}
