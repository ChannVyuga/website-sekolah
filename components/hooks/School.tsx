"use client";

import type { MouseEvent } from "react";
import { useReveal } from "./useReveal";

const units = [
  {
    level: "SMP",
    name: "SMP Citra Negara",
    desc:
      "Membangun fondasi karakter dan kebiasaan belajar yang kuat sejak jenjang menengah pertama.",
    href: "https://smp.citranegara.sch.id",
  },
  {
    level: "SMA",
    name: "SMA Citra Negara",
    desc:
      "Dua peminatan — IPA dan IPS — untuk mempersiapkan siswa menuju perguruan tinggi.",
    href: "https://sma.citranegara.sch.id",
  },
  {
    level: "SMK",
    name: "SMK Citra Negara",
    desc:
      "Program keahlian terpadu di bidang IT, kreatif, bisnis, dan perhotelan—berbasis praktik industri dan siap kerja sejak lulus.",
    href: "https://smk.citranegara.sch.id",
  },
];

function handleTiltMove(e: MouseEvent<HTMLAnchorElement>) {
  const el = e.currentTarget;
  const rect = el.getBoundingClientRect();
  const x = (e.clientX - rect.left) / rect.width - 0.5;
  const y = (e.clientY - rect.top) / rect.height - 0.5;
  el.style.setProperty("--tiltX", `${(-y * 10).toFixed(2)}deg`);
  el.style.setProperty("--tiltY", `${(x * 10).toFixed(2)}deg`);
}

function handleTiltLeave(e: MouseEvent<HTMLAnchorElement>) {
  const el = e.currentTarget;
  el.style.setProperty("--tiltX", "0deg");
  el.style.setProperty("--tiltY", "0deg");
}

function SchoolCard({
  unit,
  index,
}: {
  unit: (typeof units)[number];
  index: number;
}) {
  const { ref, visible } = useReveal<HTMLAnchorElement>(0.2);
  return (
    <a
      ref={ref}
      href={unit.href}
      target="_blank"
      rel="noopener noreferrer"
      className={`school-card reveal reveal-delay-${index + 1} ${
        visible ? "reveal-in" : ""
      }`}
      onMouseMove={handleTiltMove}
      onMouseLeave={handleTiltLeave}
    >
      <span className="level">{unit.level}</span>
      <h3>{unit.name}</h3>
      <p>{unit.desc}</p>
      <span className="school-link">Kunjungi Website →</span>
    </a>
  );
}

export default function School() {
  const { ref: headRef, visible: headVisible } = useReveal<HTMLDivElement>(
    0.3
  );

  return (
    <section className="section" id="school">
      <div className="container">
        <div
          ref={headRef}
          className={`reveal ${headVisible ? "reveal-in" : ""}`}
        >
          <div className="eyebrow">Unit Sekolah</div>
          <h2 className="section-title">Tiga jenjang, satu naungan</h2>
        </div>

        <div className="school-grid">
          {units.map((u, i) => (
            <SchoolCard unit={u} index={i} key={u.level} />
          ))}
        </div>
      </div>
    </section>
  );
}