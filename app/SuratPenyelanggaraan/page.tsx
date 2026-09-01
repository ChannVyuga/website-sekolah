"use client";

import { useEffect, useRef } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";

export default function DokumenPage() {
  const heroRef = useRef<HTMLDivElement | null>(null);
  const titleRef = useRef<HTMLHeadingElement | null>(null);
  const sealRef = useRef<HTMLDivElement | null>(null);

  const targetTilt = useRef({ x: 0, y: 0 });
  const currentTilt = useRef({ x: 0, y: 0 });
  const animationFrame = useRef<number | null>(null);

  useEffect(() => {
    const hero = heroRef.current;
    const title = titleRef.current;
    const seal = sealRef.current;

    if (!hero || !title || !seal) return;

    const isTouchDevice =
      window.matchMedia("(hover: none), (pointer: coarse)").matches;

    if (isTouchDevice) return;

    const updateTilt = () => {
      const target = targetTilt.current;
      const current = currentTilt.current;

      current.x += (target.x - current.x) * 0.12;
      current.y += (target.y - current.y) * 0.12;

      title.style.transform = `
        perspective(900px)
        rotateX(${current.x}deg)
        rotateY(${current.y}deg)
      `;

      seal.style.transform = `
        rotate(-10deg)
        perspective(900px)
        rotateX(${current.x * -0.35}deg)
        rotateY(${current.y * -0.35}deg)
      `;

      const stillMoving =
        Math.abs(target.x - current.x) > 0.01 ||
        Math.abs(target.y - current.y) > 0.01;

      if (stillMoving) {
        animationFrame.current = requestAnimationFrame(updateTilt);
      } else {
        animationFrame.current = null;
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = hero.getBoundingClientRect();

      if (rect.width === 0 || rect.height === 0) return;

      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;

      const clampedX = Math.max(0, Math.min(1, x));
      const clampedY = Math.max(0, Math.min(1, y));

      targetTilt.current = {
        x: (0.5 - clampedY) * 8,
        y: (clampedX - 0.5) * 8,
      };

      if (animationFrame.current === null) {
        animationFrame.current = requestAnimationFrame(updateTilt);
      }
    };

    const handleMouseLeave = () => {
      targetTilt.current = {
        x: 0,
        y: 0,
      };

      if (animationFrame.current === null) {
        animationFrame.current = requestAnimationFrame(updateTilt);
      }
    };

    hero.addEventListener("mousemove", handleMouseMove);
    hero.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      hero.removeEventListener("mousemove", handleMouseMove);
      hero.removeEventListener("mouseleave", handleMouseLeave);

      if (animationFrame.current !== null) {
        cancelAnimationFrame(animationFrame.current);
      }
    };
  }, []);

  return (
    <>
      <Header />

      {/* =========================
          HERO
      ========================== */}

      <section className="document-hero" ref={heroRef}>
        {/* Background image sengaja menggunakan CSS background.
            Tidak memakai <img> / next/image supaya tidak
            terjadi layout shift saat initial render. */}

        <div className="document-hero-overlay" />
        <div className="document-hero-grain" />
        <div className="document-hero-glow" />
        <div className="document-hero-edge" />

        <div className="document-hero-content">
          <div className="document-letterhead">
            <span className="document-eyebrow">
              Dokumen Legalitas
            </span>

            <span className="document-code">
              No. 002 / 2020
            </span>
          </div>

          <h1 ref={titleRef}>
            SURAT IZIN PENDIRIAN DAN PENYELENGGARAAN
          </h1>

          <div className="document-meta-row">
            <span className="document-status-pill">
              <span className="document-status-dot" />
              Dokumen Resmi
            </span>

            <span className="document-meta-divider" />

            <span className="document-meta-text">
              Diterbitkan tahun 2020 · berlaku sesuai ketentuan yang berlaku
            </span>
          </div>
        </div>

        {/* =========================
            SEAL
        ========================== */}

        <div
          ref={sealRef}
          className="document-seal"
          aria-hidden="true"
        >
          <svg viewBox="0 0 160 160" width="118" height="118">
            <defs>
              <path
                id="sealCurve"
                d="M 80,80 m -58,0 a 58,58 0 1,1 116,0 a 58,58 0 1,1 -116,0"
              />
            </defs>

            <circle
              cx="80"
              cy="80"
              r="74"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.4"
              strokeDasharray="2 6"
            />

            <circle
              cx="80"
              cy="80"
              r="60"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
            />

            <text
              fontSize="9.5"
              letterSpacing="3.5"
              fill="currentColor"
            >
              <textPath
                href="#sealCurve"
                startOffset="2%"
              >
                DOKUMEN RESMI · ARSIP LEGALITAS ·
              </textPath>
            </text>

            <g transform="translate(80,80)">
              <path
                d="M -15,-1 L -5,10 L 17,-13"
                stroke="currentColor"
                strokeWidth="4.5"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </g>
          </svg>
        </div>
      </section>

      {/* =========================
          DOCUMENT
      ========================== */}

      <main className="document-page">
        <Link href="/" className="document-back">
          <span className="document-back-arrow">
            ←
          </span>

          Kembali
        </Link>

        <div className="document-sheet">
          <div className="document-sheet-header">
            <span className="document-sheet-dot" />
            Dokumen PDF · Tampilan Resmi
          </div>

          <div className="pdf-container">
            <iframe
              src="/documents/IZIN-OPRASIONAL-2020_002.pdf"
              className="pdf-viewer"
              title="Dokumen PDF"
            />
          </div>

          <div className="pdf-mobile-link">
            <span>
              PDF tidak tampil dengan baik?
            </span>

            <a
              href="/documents/IZIN-OPRASIONAL-2020_002.pdf"
              target="_blank"
              rel="noopener noreferrer"
            >
              Buka Dokumen PDF ↗
            </a>
          </div>
        </div>

        <div className="powered-by">
          Powered By <strong>EmbedPress</strong>
        </div>
      </main>

      <Footer />

      <style jsx>{`
        :global(*) {
          box-sizing: border-box;
        }

        :global(:root) {
          --doc-ink-950: #0a1912;
          --doc-ink-900: #12271a;
          --doc-paper: #f6f2e7;
          --doc-lime: #a3e635;
          --doc-mint: #4ade80;
          --doc-brass: #c9a24c;
          --doc-text-soft: #dfeee3;
        }

        /* =========================
           HERO
        ========================== */

        .document-hero {
          position: relative;
          width: 100%;
          height: 480px;
          min-height: 480px;

          display: flex;
          align-items: center;
          justify-content: center;

          overflow: hidden;
          isolation: isolate;

          background-color: var(--doc-ink-950);

          /*
            IMPORTANT:
            Background langsung berada di hero.
            Tidak ada <img>, jadi tidak ada layout
            shift / image stretching ketika halaman baru dibuka.
          */
          background-image: url("/images/cnwow.jpg");
          background-size: cover;
          background-position: center center;
          background-repeat: no-repeat;
        }

        /* =========================
           DARK OVERLAY
        ========================== */

        .document-hero-overlay {
          position: absolute;
          inset: 0;
          z-index: 1;

          pointer-events: none;

          background:
            linear-gradient(
              180deg,
              rgba(10, 25, 18, 0.78) 0%,
              rgba(10, 25, 18, 0.62) 45%,
              rgba(10, 25, 18, 0.88) 100%
            );
        }

        /* =========================
           GRAIN
        ========================== */

        .document-hero-grain {
          position: absolute;
          inset: 0;
          z-index: 2;

          pointer-events: none;

          opacity: 0.18;
          mix-blend-mode: overlay;

          background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='120' height='120'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%25' height='100%25' filter='url(%23n)' opacity='0.5'/></svg>");
        }

        /* =========================
           GLOW
        ========================== */

        .document-hero-glow {
          position: absolute;
          inset: -20%;
          z-index: 2;

          pointer-events: none;

          background:
            radial-gradient(
              circle at 15% 25%,
              rgba(163, 230, 53, 0.2),
              transparent 42%
            ),
            radial-gradient(
              circle at 85% 75%,
              rgba(74, 222, 128, 0.16),
              transparent 45%
            );

          filter: blur(50px);

          animation:
            heroGlowMove
            10s
            ease-in-out
            infinite
            alternate;
        }

        @keyframes heroGlowMove {
          0% {
            transform: translate3d(-5%, -5%, 0) scale(1);
            opacity: 0.7;
          }

          50% {
            transform: translate3d(5%, 5%, 0) scale(1.15);
            opacity: 1;
          }

          100% {
            transform: translate3d(-3%, 4%, 0) scale(1.05);
            opacity: 0.8;
          }
        }

        /* =========================
           HERO BORDER
        ========================== */

        .document-hero-edge {
          position: absolute;
          inset: 14px;

          z-index: 3;

          pointer-events: none;

          border: 1px solid rgba(223, 238, 227, 0.16);
        }

        /* =========================
           HERO CONTENT
        ========================== */

        .document-hero-content {
          position: relative;
          z-index: 4;

          width: 100%;
          max-width: 880px;

          padding: 0 28px;

          box-sizing: border-box;

          text-align: center;
        }

        .document-letterhead {
          display: flex;
          align-items: center;
          justify-content: center;

          gap: 14px;
          margin-bottom: 22px;

          font-family:
            var(--font-jetbrains-mono),
            ui-monospace,
            monospace;

          font-size: 11.5px;
          letter-spacing: 0.14em;
          text-transform: uppercase;
        }

        .document-eyebrow {
          color: var(--doc-lime);
        }

        .document-eyebrow::after {
          content: "";

          display: inline-block;

          width: 26px;
          height: 1px;

          margin-left: 14px;

          vertical-align: middle;

          background: rgba(223, 238, 227, 0.35);
        }

        .document-code {
          color: rgba(223, 238, 227, 0.6);
        }

        /* =========================
           TITLE
        ========================== */

        .document-hero-content h1 {
          position: relative;

          margin: 0 auto;

          max-width: 760px;

          color: #fbfaf6;

          font-family:
            var(--font-fraunces),
            Georgia,
            serif;

          font-weight: 600;

          font-size: clamp(30px, 4.4vw, 46px);

          line-height: 1.22;

          letter-spacing: -0.01em;

          text-shadow:
            0 2px 24px rgba(0, 0, 0, 0.45);

          /*
            Tidak ada animation.
            Hanya transition untuk tilt.
          */
          transition:
            transform 0.18s
            cubic-bezier(0.22, 1, 0.36, 1);

          will-change: transform;

          transform-style: preserve-3d;

          word-break: break-word;
          overflow-wrap: break-word;
        }

        /* =========================
           META
        ========================== */

        .document-meta-row {
          margin-top: 24px;

          display: flex;
          align-items: center;
          justify-content: center;

          gap: 14px;

          flex-wrap: wrap;

          font-family:
            var(--font-inter),
            sans-serif;
        }

        .document-status-pill {
          display: inline-flex;

          align-items: center;

          gap: 8px;

          padding: 7px 14px;

          border-radius: 999px;

          border: 1px solid rgba(163, 230, 53, 0.35);

          background: rgba(163, 230, 53, 0.08);

          color: var(--doc-lime);

          font-size: 12.5px;

          font-weight: 500;

          letter-spacing: 0.02em;
        }

        .document-status-dot {
          width: 6px;
          height: 6px;

          flex-shrink: 0;

          border-radius: 50%;

          background: var(--doc-lime);

          box-shadow:
            0 0 8px rgba(163, 230, 53, 0.9);
        }

        .document-meta-divider {
          width: 1px;
          height: 14px;

          background: rgba(223, 238, 227, 0.2);
        }

        .document-meta-text {
          color: rgba(223, 238, 227, 0.62);

          font-size: 13px;
        }

        /* =========================
           SEAL
        ========================== */

        .document-seal {
          position: absolute;

          right: 32px;
          bottom: 26px;

          z-index: 5;

          color: var(--doc-brass);

          opacity: 0.85;

          transition:
            transform 0.2s
            cubic-bezier(0.22, 1, 0.36, 1);

          will-change: transform;

          transform-style: preserve-3d;

          pointer-events: none;
        }

        /* =========================
           DOCUMENT PAGE
        ========================== */

        .document-page {
          position: relative;

          width: 100%;
          max-width: 1000px;

          margin: 0 auto;

          padding: 44px 24px 60px;

          font-family:
            var(--font-inter),
            sans-serif;
        }

        /* =========================
           BACK BUTTON
        ========================== */

        .document-back {
          display: inline-flex;

          align-items: center;

          gap: 8px;

          margin-bottom: 24px;

          padding: 8px 16px 8px 12px;

          border-radius: 999px;

          border: 1px solid rgba(10, 25, 18, 0.12);

          color: var(--doc-ink-900);

          font-size: 13.5px;

          font-weight: 500;

          text-decoration: none;

          transition:
            border-color 0.15s ease,
            transform 0.15s ease,
            background 0.15s ease;
        }

        .document-back:hover {
          border-color: rgba(163, 230, 53, 0.5);

          background: rgba(163, 230, 53, 0.05);

          transform: translateX(-2px);
        }

        .document-back:focus-visible {
          outline: 2px solid var(--doc-lime);

          outline-offset: 3px;
        }

        .document-back-arrow {
          font-size: 15px;
        }

        /* =========================
           DOCUMENT SHEET
        ========================== */

        .document-sheet {
          border-radius: 14px;

          background: var(--doc-paper);

          border: 1px solid rgba(10, 25, 18, 0.08);

          box-shadow:
            0 24px 60px -28px
            rgba(10, 25, 18, 0.35);

          overflow: hidden;
        }

        .document-sheet-header {
          display: flex;

          align-items: center;

          gap: 8px;

          padding: 14px 20px;

          border-bottom:
            1px solid
            rgba(10, 25, 18, 0.08);

          font-family:
            var(--font-jetbrains-mono),
            ui-monospace,
            monospace;

          font-size: 11.5px;

          letter-spacing: 0.08em;

          text-transform: uppercase;

          color: rgba(10, 25, 18, 0.55);
        }

        .document-sheet-dot {
          width: 7px;
          height: 7px;

          flex-shrink: 0;

          border-radius: 50%;

          background: var(--doc-mint);
        }

        /* =========================
           PDF
        ========================== */

        .pdf-container {
          width: 100%;

          height: 80vh;

          min-height: 520px;

          background: #e9e4d7;
        }

        .pdf-viewer {
          display: block;

          width: 100%;
          height: 100%;

          border: none;
        }

        .pdf-mobile-link {
          display: none;
        }

        .powered-by {
          margin-top: 16px;

          text-align: right;

          font-size: 12px;

          color: rgba(10, 25, 18, 0.4);
        }

        /* =========================
           REDUCED MOTION
        ========================== */

        @media (prefers-reduced-motion: reduce) {
          .document-hero-glow {
            animation: none;
          }

          .document-hero-content h1,
          .document-seal {
            transition: none;
          }
        }

        /* =========================
           TABLET
        ========================== */

        @media (max-width: 768px) {
          .document-hero {
            height: 400px;
            min-height: 400px;

            background-position: center center;
          }

          .document-letterhead {
            flex-direction: column;
            gap: 6px;
          }

          .document-eyebrow::after {
            display: none;
          }

          .document-hero-content h1 {
            transform: none !important;
            transition: none;
          }

          .document-seal {
            right: 18px;
            bottom: 18px;

            transform:
              rotate(-10deg)
              scale(0.72) !important;

            transform-origin: bottom right;
          }

          .document-page {
            padding: 32px 16px 48px;
          }

          .pdf-container {
            height: 70vh;
            min-height: 420px;
          }

          .document-sheet-header {
            padding: 13px 16px;

            font-size: 10.5px;
          }

          .pdf-mobile-link {
            display: flex;

            align-items: center;
            justify-content: space-between;

            gap: 14px;

            padding: 14px 16px;

            border-top:
              1px solid
              rgba(10, 25, 18, 0.08);

            font-size: 12px;

            color: rgba(10, 25, 18, 0.55);
          }

          .pdf-mobile-link a {
            flex-shrink: 0;

            color: var(--doc-ink-900);

            font-weight: 600;

            text-decoration: none;
          }

          .pdf-mobile-link a:hover {
            text-decoration: underline;
          }

          .powered-by {
            text-align: center;
          }
        }

        /* =========================
           PHONE
        ========================== */

        @media (max-width: 480px) {
          .document-hero {
            height: 380px;
            min-height: 380px;

            background-position: center center;
          }

          .document-hero-content {
            padding: 0 20px;
          }

          .document-hero-content h1 {
            font-size: 30px;
          }

          .document-meta-row {
            gap: 10px;
          }

          .document-meta-divider {
            display: none;
          }

          .document-meta-text {
            max-width: 300px;

            font-size: 12px;

            line-height: 1.5;
          }

          .document-seal {
            display: none;
          }

          .document-page {
            padding: 26px 12px 40px;
          }

          .document-back {
            margin-bottom: 18px;
          }

          .pdf-container {
            height: 65vh;
            min-height: 360px;
          }

          .pdf-mobile-link {
            flex-direction: column;

            align-items: flex-start;
          }
        }
      `}</style>
    </>
  );
}