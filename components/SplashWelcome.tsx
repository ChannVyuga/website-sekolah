"use client";

import { useEffect, useMemo, useState } from "react";
import styles from "./SplashWelcome.module.css";

interface SplashWelcomeProps {
  /**
   * Durasi splash tampil penuh, dalam milidetik.
   * Default 4500ms — mengikuti choreography animasi di SplashWelcome.module.css:
   *   - huruf terakhir selesai reveal di ~2.7s (delay 1.65s + durasi 1.05s)
   *   - underline selesai grow di ~3.35s (delay 2.25s + durasi 1.1s)
   *   - dots selesai muncul di ~3.9s (delay 3.2s + durasi 0.7s)
   * + jeda ~600ms biar sempat "dilihat" sebelum fade out.
   * Kalau delay/durasi animasi di CSS diubah, sesuaikan juga angka ini.
   */
  duration?: number;
  /** Durasi animasi fade-out, dalam ms. HARUS sama dengan transition di .splash (CSS: 0.7s). */
  fadeOutDuration?: number;
  onFinish?: () => void;
}

const BRAND = "CITRA NEGARA";
const SPLASH_KEY = "citra-negara-splash-shown";
const DEFAULT_DURATION = 4500;
const DEFAULT_FADE_OUT = 700; // harus match transition di .splash (CSS)


export default function SplashWelcome({
  duration = DEFAULT_DURATION,
  fadeOutDuration = DEFAULT_FADE_OUT,
  onFinish,
}: SplashWelcomeProps) {
  // Selalu mulai dari "tampil penuh" (true = default render, bukan null).
  // Ini mencegah halaman di belakangnya sempat mengintip sebelum JS jalan.
  const [hiding, setHiding] = useState(false);
  const [instant, setInstant] = useState(false);
  const [done, setDone] = useState(false);

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

  const effectiveDuration = duration;

  const timer = setTimeout(() => {
    setHiding(true);

    const finishTimer = setTimeout(() => {
      setDone(true);
      onFinish?.();
    }, fadeOutDuration);

    return () => clearTimeout(finishTimer);
  }, effectiveDuration);

  return () => clearTimeout(timer);
}, [duration, fadeOutDuration, onFinish]);

  const letters = useMemo(() => BRAND.split(""), []);

  // Baru unmount total setelah benar-benar selesai (termasuk fade-out).
  if (done) return null;

  return (
    <div
      className={`${styles.splash} ${hiding ? styles.hide : ""} ${
        instant ? styles.instant : ""
      }`}
      aria-hidden={hiding}
      role="status"
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

        <div className={styles.dots}>
          <span />
          <span />
          <span />
        </div>
      </div>
    </div>
  );
}