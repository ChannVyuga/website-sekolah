"use client";

import type { MouseEvent } from "react";
import { useReveal } from "./useReveal";

const stats = [
  { value: "3", label: "Jenjang Pendidikan" },
  { value: "22", label: "Tahun Mengabdi" },
  { value: "A", label: "Akreditasi" },
];

const timeline = [
  { year: "2004", label: "Tata Niaga" },
  { year: "2007", label: "Teknik Komputer Jaringan" },
  { year: "2011", label: "Multimedia" },
  { year: "2015", label: "Administrasi Perkantoran & RPL" },
  { year: "2026", label: "Perhotelan" },
];

function handleTiltMove(e: MouseEvent<HTMLDivElement>) {
  const el = e.currentTarget;
  const rect = el.getBoundingClientRect();

  const x = (e.clientX - rect.left) / rect.width;
  const y = (e.clientY - rect.top) / rect.height;

  const rotateY = (x - 0.5) * 14;
  const rotateX = (0.5 - y) * 14;

  el.style.transform = `
    perspective(900px)
    rotateX(${rotateX}deg)
    rotateY(${rotateY}deg)
  `;

  el.style.setProperty("--glow-x", `${x * 100}%`);
  el.style.setProperty("--glow-y", `${y * 100}%`);
}

function handleTiltLeave(e: MouseEvent<HTMLDivElement>) {
  e.currentTarget.style.transform =
    "perspective(900px) rotateX(0deg) rotateY(0deg)";
}

export default function History() {
  const {
    ref: mediaRef,
    visible: mediaVisible,
  } = useReveal<HTMLDivElement>(0.25);

  const {
    ref: copyRef,
    visible: copyVisible,
  } = useReveal<HTMLDivElement>(0.25);

  return (
    <section id="history" className="section history-fresh">
      <style jsx global>{`
        @import url("https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,600;9..144,700&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap");

        /* =========================================================
           HISTORY
           ========================================================= */

        .history-fresh {
          position: relative;
          overflow: hidden;

          background:
            radial-gradient(
              circle at 10% 5%,
              rgba(139, 215, 45, 0.1),
              transparent 30%
            ),
            radial-gradient(
              circle at 90% 70%,
              rgba(80, 200, 120, 0.055),
              transparent 30%
            ),
            linear-gradient(
              180deg,
              #ffffff 0%,
              #f8faf7 42%,
              #f1f5f1 100%
            );

          color: #172019;
        }

        /* =========================================================
           DECORATIVE GRID
           ========================================================= */

        .history-fresh::before {
          content: "";

          position: absolute;
          inset: 0;

          pointer-events: none;

          background-image:
            linear-gradient(
              rgba(32, 68, 43, 0.025) 1px,
              transparent 1px
            ),
            linear-gradient(
              90deg,
              rgba(32, 68, 43, 0.025) 1px,
              transparent 1px
            );

          background-size: 90px 90px;

          mask-image: linear-gradient(
            to bottom,
            rgba(0, 0, 0, 0.65),
            transparent 75%
          );

          opacity: 0.65;
        }

        .history-fresh::after {
          content: "";

          position: absolute;

          width: 420px;
          height: 420px;

          right: -180px;
          top: 35%;

          border-radius: 50%;

          background: rgba(139, 215, 45, 0.045);

          filter: blur(80px);

          pointer-events: none;
        }

        .history-fresh .container {
          position: relative;
          z-index: 2;
        }

        /* =========================================================
           EYEBROW
           ========================================================= */

        .history-fresh .eyebrow {
          font-family: "Plus Jakarta Sans", sans-serif;

          display: flex;
          align-items: center;

          gap: 10px;

          font-size: 0.88rem;
          font-weight: 700;

          color: #72b521;

          text-transform: uppercase;

          letter-spacing: 0.1em;

          margin-bottom: 14px;
        }

        .history-fresh .eyebrow::before {
          content: "";

          width: 28px;
          height: 2px;

          background: #a9b0aa;

          border-radius: 999px;

          display: inline-block;
        }

        /* =========================================================
           TITLE
           ========================================================= */

        .history-fresh h2 {
          font-family: "Fraunces", serif;

          font-optical-sizing: auto;

          font-weight: 600;

          font-size: clamp(
            2rem,
            3vw,
            2.8rem
          );

          line-height: 1.15;

          color: #172019;

          margin-bottom: 22px;

          letter-spacing: -0.025em;
        }

        /* =========================================================
           PARAGRAPH
           ========================================================= */

        .history-fresh p {
          font-family: "Plus Jakarta Sans", sans-serif;

          font-size: 1rem;

          line-height: 1.85;

          color: #526057;

          max-width: 62ch;
        }

        .history-fresh p + p {
          margin-top: 17px;
        }

        .history-fresh p strong {
          color: #69ad20;

          font-weight: 700;
        }

        /* =========================================================
           STATS
           ========================================================= */

        .history-fresh .stat-row {
          display: flex;

          gap: 34px;

          flex-wrap: wrap;

          margin-top: 36px;
        }

        .history-fresh .stat {
          position: relative;

          min-width: 105px;

          padding-left: 15px;

          border-left: 2px solid
            rgba(139, 215, 45, 0.65);

          transition:
            transform 0.3s ease,
            border-color 0.3s ease;
        }

        .history-fresh .stat:hover {
          transform: translateX(4px);

          border-color: #8bd72d;
        }

        .history-fresh .stat b {
          font-family: "Fraunces", serif;

          font-weight: 600;

          font-size: 2.15rem;

          color: #172019;

          display: block;

          line-height: 1;
        }

        .history-fresh .stat span {
          font-family: "Plus Jakarta Sans", sans-serif;

          font-size: 0.8rem;

          color: #7a857e;

          margin-top: 7px;

          display: block;
        }

        /* =========================================================
           TIMELINE
           ========================================================= */

        .history-fresh .timeline {
          margin-top: 38px;

          display: flex;

          flex-wrap: wrap;

          gap: 0;

          border-top: 1px solid
            rgba(30, 58, 38, 0.1);

          padding-top: 18px;
        }

        .history-fresh .timeline-item {
          position: relative;

          display: flex;

          align-items: baseline;

          gap: 9px;

          padding: 7px 20px 7px 0;

          margin-right: 14px;
        }

        .history-fresh .timeline-item .year {
          font-family: "Fraunces", serif;

          font-weight: 600;

          color: #69ad20;

          font-size: 1.05rem;
        }

        .history-fresh .timeline-item .label {
          font-family: "Plus Jakarta Sans", sans-serif;

          font-size: 0.8rem;

          color: #7a857e;
        }

        /* =========================================================
           IMAGE CARD
           ========================================================= */

        .history-fresh .media.history {
          position: relative;

          border-radius: 20px;

          overflow: hidden;

          background: #edf2ed;

          border: 1px solid
            rgba(45, 78, 54, 0.12);

          box-shadow:
            0 25px 55px -25px
              rgba(30, 50, 35, 0.28),
            0 8px 30px
              rgba(45, 100, 55, 0.06);

          transform-style: preserve-3d;

          transition:
            transform 0.15s ease-out,
            box-shadow 0.35s ease,
            border-color 0.35s ease;
        }

        .history-fresh .media.history:hover {
          border-color:
            rgba(139, 215, 45, 0.38);

          box-shadow:
            0 30px 65px -25px
              rgba(30, 50, 35, 0.32),
            0 0 45px
              rgba(139, 215, 45, 0.1);
        }

        .history-fresh .media-img {
          width: 100%;

          height: 100%;

          min-height: 460px;

          object-fit: cover;

          display: block;

          filter:
            saturate(0.82)
            contrast(1.03)
            brightness(0.94);

          transition:
            transform 0.7s ease,
            filter 0.5s ease;
        }

        .history-fresh .media.history:hover
          .media-img {
          transform: scale(1.035);

          filter:
            saturate(0.95)
            contrast(1.04)
            brightness(1);
        }

        /* =========================================================
           IMAGE OVERLAY
           ========================================================= */

        .history-fresh .media.history::after {
          content: "";

          position: absolute;

          inset: 0;

          pointer-events: none;

          background:
            linear-gradient(
              to top,
              rgba(9, 22, 13, 0.52),
              rgba(9, 22, 13, 0.06) 55%,
              transparent
            );
        }

        /* =========================================================
           MOUSE GLOW
           ========================================================= */

        .history-fresh .media-hover-glow {
          position: absolute;

          width: 220px;

          height: 220px;

          left: var(--glow-x, 50%);

          top: var(--glow-y, 50%);

          transform:
            translate(-50%, -50%);

          border-radius: 50%;

          background:
            radial-gradient(
              circle,
              rgba(139, 215, 45, 0.17),
              rgba(139, 215, 45, 0.055) 35%,
              transparent 70%
            );

          filter: blur(5px);

          pointer-events: none;

          opacity: 0;

          transition:
            opacity 0.25s ease;

          z-index: 3;
        }

        .history-fresh .media.history:hover
          .media-hover-glow {
          opacity: 1;
        }

        /* =========================================================
           BADGE
           ========================================================= */

        .history-fresh .media-badge {
          position: absolute;

          left: 20px;

          bottom: 20px;

          z-index: 5;

          font-family: "Plus Jakarta Sans", sans-serif;

          font-weight: 700;

          font-size: 0.78rem;

          letter-spacing: 0.04em;

          background:
            rgba(255, 255, 255, 0.82);

          color: #42631e;

          padding: 8px 15px;

          border-radius: 999px;

          border: 1px solid
            rgba(139, 215, 45, 0.38);

          backdrop-filter: blur(10px);

          box-shadow:
            0 8px 25px
              rgba(0, 0, 0, 0.12);
        }

        /* =========================================================
           RESPONSIVE
           ========================================================= */

        @media (max-width: 900px) {
          .history-fresh .media-img {
            min-height: 380px;
          }

          .history-fresh .stat-row {
            gap: 25px;
          }
        }

        @media (max-width: 720px) {
          .history-fresh .stat-row {
            gap: 20px;
          }

          .history-fresh .timeline {
            gap: 4px;
          }

          .history-fresh .timeline-item {
            width: 100%;

            margin-right: 0;

            padding: 7px 0;
          }

          .history-fresh .media-img {
            min-height: 300px;
          }

          .history-fresh h2 {
            font-size: 2rem;
          }

          .history-fresh p {
            font-size: 0.94rem;

            line-height: 1.8;
          }
        }

        @media (max-width: 480px) {
          .history-fresh .media.history {
            border-radius: 15px;
          }

          .history-fresh .media-img {
            min-height: 250px;
          }

          .history-fresh .media-badge {
            left: 14px;

            bottom: 14px;
          }

          .history-fresh .stat b {
            font-size: 1.9rem;
          }
        }
      `}</style>

      <div className="container">
        <div className="split reverse">

          {/* =====================================================
              MEDIA
              ===================================================== */}

          <div
            ref={mediaRef}
            className={`media history reveal reveal-right ${
              mediaVisible ? "reveal-in" : ""
            }`}
            onMouseMove={handleTiltMove}
            onMouseLeave={handleTiltLeave}
          >
            <img
              className="media-img"
              src="images/plangcn.jpg"
              alt="Sejarah Citra Negara"
            />

            <div className="media-hover-glow" />

            <span className="media-badge">
              Sejak 2004
            </span>
          </div>

          {/* =====================================================
              CONTENT
              ===================================================== */}

          <div
            ref={copyRef}
            className={`copy reveal reveal-left ${
              copyVisible ? "reveal-in" : ""
            }`}
          >
            <div className="eyebrow">
              Sejarah
            </div>

            <h2>
              Sejarah Yayasan AT-TAQWA Kemiri Jaya
            </h2>

            <p>
              Yayasan AT-TAQWA Kemiri Jaya dibangun pada
              tahun 2004 di Jl. Raya Tanah Baru No.99
              Kemiri Jaya, Beji, Depok 16421. Yayasan ini
              di perakarsai serta di miliki oleh Bpk. H.
              Drs. Nasan, M.M, kemudian di tahun sama
              sekolah <strong>SMK Citra Negara</strong>{" "}
              dibuka.
            </p>

            <p>
              Sekolah <strong>SMK Citra Negara</strong>{" "}
              berdiri pada tahun 2004, pada awal
              berdirinya <strong>SMK Citra Negara</strong>{" "}
              yang berada di bawah yayasan AT-TAQWA hanya
              memiliki 1 program keahlian yaitu Tata Niaga
              (TN). Kemudian pada tahun 2007 SMK Citra
              Negara kembali membuka program keahlian baru
              yaitu Teknik Komputer Jaringan (TKJ), lalu
              jurusan Multimedia (MM) pada tahun 2011,
              jurusan Administrasi Perkantoran (AP) pada
              tahun 2015, dan yang terakhir adalah jurusan
              Rekayasa Perangkat Lunak (RPL) yang didirikan
              pada tahun yang sama dengan jurusan AP yaitu
              pada tahun 2015. Tahun ajaran 2026,{" "}
              <strong>SMK Citra Negara</strong> membuka
              program keahlian baru yaitu jurusan Perhotelan
              (PH). Sehingga total program keahlian yang
              dimiliki <strong>SMK Citra Negara</strong>{" "}
              pada saat ini berjumlah 6 jurusan.
            </p>

            {/* =================================================
                STATS
                ================================================= */}

            <div className="stat-row">
              {stats.map((s) => (
                <div
                  className="stat"
                  key={s.label}
                >
                  <b>{s.value}</b>

                  <span>{s.label}</span>
                </div>
              ))}
            </div>

            {/* =================================================
                TIMELINE
                ================================================= */}

            <div className="timeline">
              {timeline.map((t) => (
                <div
                  className="timeline-item"
                  key={t.year}
                >
                  <span className="year">
                    {t.year}
                  </span>

                  <span className="label">
                    {t.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}