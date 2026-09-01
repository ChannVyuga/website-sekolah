"use client";

import type { MouseEvent } from "react";
import { useReveal } from "./useReveal";

const stats = [
  { value: "3", label: "Jenjang Pendidikan" },
  { value: "22", label: "Tahun Mengabdi" },
  { value: "A", label: "Akreditasi" },
];

function handleTiltMove(e: MouseEvent<HTMLDivElement>) {
  const el = e.currentTarget;
  const rect = el.getBoundingClientRect();
  const x = (e.clientX - rect.left) / rect.width;
  const y = (e.clientY - rect.top) / rect.height;

  const rotateY = (x - 0.5) * 14;
  const rotateX = (0.5 - y) * 14;

  el.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  el.style.setProperty("--glow-x", `${x * 100}%`);
  el.style.setProperty("--glow-y", `${y * 100}%`);
}

function handleTiltLeave(e: MouseEvent<HTMLDivElement>) {
  e.currentTarget.style.transform =
    "perspective(900px) rotateX(0deg) rotateY(0deg)";
}

export default function History() {
  const { ref: mediaRef, visible: mediaVisible } = useReveal<HTMLDivElement>(
    0.25
  );
  const { ref: copyRef, visible: copyVisible } = useReveal<HTMLDivElement>(
    0.25
  );

  return (
    <section id="history" className="section">
      <div className="container">
        <div className="split reverse">
          {/* Media sits visually on the right (split.reverse), enters from the right */}
          <div
            ref={mediaRef}
            className={`media history reveal reveal-right ${
              mediaVisible ? "reveal-in" : ""
            }`}
            onMouseMove={handleTiltMove}
            onMouseLeave={handleTiltLeave}
          >
            {/* Ganti dengan <img className="media-img" src="..." alt="Sejarah Citra Negara" /> jika sudah ada foto */}
            <img className="media-img" src="images/plangcn.jpg" alt="" />
            <div className="media-hover-glow" />
            <span className="media-badge">Sejak 2004</span>
          </div>

          <div
            ref={copyRef}
            className={`copy reveal reveal-left ${
              copyVisible ? "reveal-in" : ""
            }`}
          >
            <div className="eyebrow">History</div>
            <h2>Sejarah Yayasan AT-TAQWA Kemiri Jaya</h2>
            <p>
            Yayasan AT-TAQWA Kemiri Jaya dibangun pada tahun 2004 di 
            Jl. Raya Tanah Baru No.99 Kemiri Jaya, Beji, Depok 16421, 
            Yayasan ini di perakarsai serta di miliki oleh 
            Bpk. H. Drs. Nasan, M.M, kemudian di tahun sama sekolah <strong>SMK Citra Negara</strong> dibuka.
            </p>
            <p>
            Sekolah <strong>SMK Citra Negara</strong> berdiri pada tahun 2004, pada awal berdirinya {" "}
            <strong>SMK Citra Negara</strong> yang berada di bawah yayasan AT-TAQWA hanya memiliki 1 program keahlian yaitu Tata Niaga (TN). 
            Kemudian pada tahun 2007 SMK Citra Negara kembali membuka program keahlian baru yaitu Teknik Komputer Jaringan (TKJ), 
            lalu jurusan Multimedia (MM) pada tahun 2011, jurusan Administrasi Perkantoran (AP) pada tahun 2015, dan yang terakhir 
            adalah jurusan Rekayasa Perangkat Lunak (RPL) yang didirikan pada tahun yang sama dengan jurusan AP yaitu pada tahun 2015. Tahun ajaran 2026, {" "}
            <strong>SMK Citra Negara</strong> membuka program keahlian baru. Yaitu jurusan Perhotelan (PH)
            Sehingga total Program keahlian yang dimiliki <strong>SMK Citra Negara</strong> pada saat ini berjumlah 6 jurusan.
            </p>
            <div className="stat-row">
              {stats.map((s) => (
                <div className="stat" key={s.label}>
                  <b>{s.value}</b>
                  <span>{s.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}