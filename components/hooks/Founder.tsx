"use client";

import Image from "next/image";
import type { MouseEvent } from "react";

import { useReveal } from "./useReveal";

const founders = [
  {
    name: "Drs. H. Nasan - Mutia, M.Pd",
    role: "Pendiri Yayasan",
    photo: "/founders/hjnasan-mutia.png",
  },
  {
    name: "Dr. M. Rizki Darmaguna Hasan, S.Tr. M.Pd",
    role: "Ketua Yayasan Citra Negara",
    photo: "/founders/rizki.png",
  },
  {
    name: "Agustin Wijayanti, S.H. MM",
    role: "Wakil Ketua Yayasan",
    photo: "/founders/agustin.png",
  },
] as const;

/* =========================================================
   MOUSE TILT
   ========================================================= */

function handleMove(e: MouseEvent<HTMLDivElement>) {
  const element = e.currentTarget;
  const rect = element.getBoundingClientRect();

  const x = (e.clientX - rect.left) / rect.width;
  const y = (e.clientY - rect.top) / rect.height;

  /*
   * Maximum rotation.
   * 12deg cukup terasa 3D tapi masih elegan.
   */
  const rotateY = (x - 0.5) * 12;
  const rotateX = (0.5 - y) * 12;

  /*
   * Mouse position untuk spotlight.
   */
  element.style.setProperty("--glow-x", `${x * 100}%`);
  element.style.setProperty("--glow-y", `${y * 100}%`);

  /*
   * 3D tilt.
   */
  element.style.setProperty("--rotate-x", `${rotateX}deg`);
  element.style.setProperty("--rotate-y", `${rotateY}deg`);

  /*
   * Sedikit image parallax.
   * Jadi foto terasa punya depth ketika mouse bergerak.
   */
  const imageX = (x - 0.5) * 8;
  const imageY = (y - 0.5) * 8;

  element.style.setProperty("--image-x", `${imageX}px`);
  element.style.setProperty("--image-y", `${imageY}px`);
}

function handleLeave(e: MouseEvent<HTMLDivElement>) {
  const element = e.currentTarget;

  /*
   * Balikin semuanya ke posisi normal.
   */
  element.style.setProperty("--rotate-x", "0deg");
  element.style.setProperty("--rotate-y", "0deg");

  element.style.setProperty("--image-x", "0px");
  element.style.setProperty("--image-y", "0px");

  element.style.setProperty("--glow-x", "50%");
  element.style.setProperty("--glow-y", "50%");
}

/* =========================================================
   FOUNDER CARD
   ========================================================= */

function FounderCard({
  person,
  index,
}: {
  person: (typeof founders)[number];
  index: number;
}) {
  const { ref, visible } = useReveal<HTMLDivElement>(0.2);

  return (
    <article
      ref={ref}
      className={[
        "founder-card",
        "reveal",
        `reveal-delay-${index + 1}`,
        visible ? "reveal-in" : "",
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {/* 
        Wrapper ini khusus untuk floating animation.
        Jangan taruh tilt di sini.
      */}
      <div className="founder-photo-float">
        <div
          className="founder-photo"
          onMouseMove={handleMove}
          onMouseLeave={handleLeave}
        >
          <Image
            src={person.photo}
            alt={person.name}
            fill
            sizes="(max-width: 960px) 360px, 33vw"
            className="founder-photo-image"
            priority={index === 0}
          />

          {/* Dark cinematic overlay */}
          <div className="founder-photo-vignette" />

          {/* Mouse-following green light */}
          <div className="founder-photo-glow" />

          {/* Glass reflection */}
          <div className="founder-photo-shine" />

          {/* Premium border */}
          <div className="founder-photo-border" />
        </div>
      </div>

      {/* Founder information */}
      <div className="founder-info">
        <h3>{person.name}</h3>
        <p>{person.role}</p>
      </div>
    </article>
  );
}

/* =========================================================
   SECTION
   ========================================================= */

export default function Founder() {
  return (
    <section className="founder-section" id="founder">
      {/* =====================================================
          BACKGROUND DECORATION
          ===================================================== */}

      <div
        className="founder-grid-bg"
        aria-hidden="true"
      />

      <div
        className="founder-orb founder-orb-left"
        aria-hidden="true"
      />

      <div
        className="founder-orb founder-orb-right"
        aria-hidden="true"
      />

      <div
        className="founder-light-line"
        aria-hidden="true"
      />

      {/* =====================================================
          CONTENT
          ===================================================== */}

      <div className="container">
        <div className="eyebrow eyebrow-center">
          Pimpinan Yayasan
        </div>

        <h2 className="founder-heading">
          Ditopang Tangan-Tangan yang Berdedikasi
        </h2>

        <p className="founder-subtitle">
          Sosok-sosok yang menjadi fondasi dalam membangun
          dan mengembangkan Yayasan Citra Negara.
        </p>

        {/* ===================================================
            FOUNDERS
            =================================================== */}

        <div className="founder-grid">
          {founders.map((person, index) => (
            <FounderCard
              key={person.name}
              person={person}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}