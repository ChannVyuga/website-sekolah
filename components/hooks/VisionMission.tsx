"use client";

import { useEffect, useState } from "react";
import { useReveal } from "./useReveal";

const missionItems = [
  "Menyelenggarakan pendidikan yang berpusat pada karakter dan akhlak.",
  "Mendorong prestasi akademik dan non-akademik secara seimbang.",
  "Membekali siswa dengan kecakapan hidup dan keterampilan abad ke-21.",
  "Membangun lingkungan belajar yang aman, inklusif, dan suportif.",
  "Menjalin kemitraan erat antara sekolah, keluarga, dan masyarakat.",
];

export default function VisionMission() {
  const { ref: headRef, visible: headVisible } = useReveal<HTMLDivElement>(
    0.3
  );
  const { ref: visionRef, visible: visionVisible } = useReveal<
    HTMLDivElement
  >(0.25);
  const { ref: missionRef, visible: missionVisible } = useReveal<
    HTMLDivElement
  >(0.25);
  const [shownItems, setShownItems] = useState(0);

  useEffect(() => {
    if (!missionVisible) return;
    const timers = missionItems.map((_, i) =>
      setTimeout(() => setShownItems((n) => Math.max(n, i + 1)), i * 110)
    );
    return () => timers.forEach(clearTimeout);
  }, [missionVisible]);

  return (
    <section className="section alt" id="vision-mission">
      <div className="container">
        <div
          ref={headRef}
          className={`reveal ${headVisible ? "reveal-in" : ""}`}
        >
          <div className="eyebrow">Visi &amp; Misi</div>
          <h2 className="section-title">Arah yang kami pegang teguh</h2>
        </div>

        <div className="vm-grid">
          <div
            ref={visionRef}
            className={`vm-card vision reveal reveal-left ${
              visionVisible ? "reveal-in" : ""
            }`}
          >
            <h3>Visi</h3>
            <p>
              Menjadi yayasan pendidikan yang melahirkan generasi berkarakter,
              berdaya saing, dan berjiwa kebangsaan.
            </p>
          </div>

          <div
            ref={missionRef}
            className={`vm-card reveal reveal-right ${
              missionVisible ? "reveal-in" : ""
            }`}
          >
            <h3>Misi</h3>
            <ul>
              {missionItems.map((text, i) => (
                <li
                  key={text}
                  className={`vm-mission-item ${
                    i < shownItems ? "vm-mission-item-in" : ""
                  }`}
                >
                  {text}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}