"use client";

import { useEffect, useMemo, useState } from "react";

import styles from "./SplashWelcome.module.css";

interface SplashWelcomeProps {
  /**
   * Durasi animasi fade-out, dalam milidetik.
   * Harus sama dengan transition di CSS.
   * Default: 700ms
   */
  fadeOutDuration?: number;

  onFinish?: () => void;
}

const BRAND = "CITRA NEGARA";
const SPLASH_KEY = "citra-negara-splash-shown";

const DEFAULT_FADE_OUT = 700;

const AUDIO_SRC = "/sounds/welc2cn.mp3";

export default function SplashWelcome({
  fadeOutDuration = DEFAULT_FADE_OUT,
  onFinish,
}: SplashWelcomeProps) {
  const [hiding, setHiding] = useState(false);
  const [instant, setInstant] = useState(false);
  const [done, setDone] = useState(false);
  const [ready, setReady] = useState(false); // splash siap di-tap (setelah entrance animasi teks selesai)

  useEffect(() => {
    const alreadyShown = sessionStorage.getItem(SPLASH_KEY);

    if (alreadyShown) {
      setInstant(true);
      setHiding(true);
      setDone(true);
      onFinish?.();
      return;
    }

    sessionStorage.setItem(SPLASH_KEY, "true");

    // ==========================================
    // CREATE AUDIO — disiapin dulu, baru diplay
    // pas user tap
    // ==========================================
    const audio = new Audio();
    audio.src = AUDIO_SRC;
    audio.preload = "auto";
    audio.volume = 0.5;
    audio.load();

    let destroyed = false;
    let finished = false;

    // Kasih jeda dikit biar animasi masuk teks kelar dulu
    // sebelum tap dianggap valid (opsional, biar nggak keburu ke-skip)
    const readyTimer = window.setTimeout(() => {
      if (!destroyed) setReady(true);
    }, 900);

    // ==========================================
    // HANDLE TAP / KLIK -> play audio + tutup splash
    // ==========================================
    const handleActivate = () => {
      if (destroyed || finished) return;
      finished = true;

      audio.play().catch(() => {
        /* kalau tetap gagal, splash tetap ditutup */
      });

      setHiding(true);

      window.setTimeout(() => {
        if (destroyed) return;
        setDone(true);
        onFinish?.();
      }, fadeOutDuration);

      window.removeEventListener("pointerdown", handleActivate);
      window.removeEventListener("keydown", handleActivate);
    };

    window.addEventListener("pointerdown", handleActivate, { passive: true });
    window.addEventListener("keydown", handleActivate, { passive: true });
  

    // ==========================================
    // CLEANUP
    // ==========================================
    return () => {
      destroyed = true;

      window.clearTimeout(readyTimer);

      window.removeEventListener("pointerdown", handleActivate);
      window.removeEventListener("keydown", handleActivate);
      window.removeEventListener("touchstart", handleActivate);
    };
  }, [fadeOutDuration, onFinish]);

  const letters = useMemo(() => BRAND.split(""), []);

  if (done) return null;

  return (
    <div
      className={`${styles.splash} ${
        hiding ? styles.hide : ""
      } ${instant ? styles.instant : ""} ${ready ? styles.ready : ""}`}
      aria-hidden={hiding}
      role="button"
      tabIndex={0}
      aria-label="Ketuk untuk masuk"
      aria-live="polite"
    >
      <div className={styles.auroraA} />
      <div className={styles.auroraB} />
      <div className={styles.auroraC} />
      <div className={styles.grain} />
      <div className={styles.centerGlow} />

      <div className={styles.textStage}>
        <div className={styles.brandWrapper}>
          <h1 className={styles.brandText} aria-label={BRAND}>
            {letters.map((char, i) => (
              <span
                key={i}
                className={styles.letter}
                style={{
                  animationDelay: `${0.45 + i * 0.1}s`,
                }}
              >
                {char === " " ? "\u00A0" : char}
              </span>
            ))}
          </h1>

          <div className={styles.underlineWrapper}>
            <span className={styles.underline} />
            <span className={styles.underlineGlow} />
          </div>
        </div>

        {/* Ganti dots loading -> tap hint, karena splash sekarang nunggu aksi user */}
        <div className={styles.tapHint}>
          <span className={styles.tapHintText}>Ketuk untuk masuk</span>
          <span className={styles.tapHintPulse} />
        </div>
      </div>
    </div>
  );
}