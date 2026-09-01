`use client`

import Image from "next/image";
import Link from "next/link";

const SCHOOLS = [
  {
    level: "SMP",
    name: "SMP Citra Negara",
    url: "https://smp-citranegara.sch.id", // ganti dengan link resmi SMP
    photo: "/images/smpcn.png", 
  },
  {
    level: "SMK",
    name: "SMK Citra Negara",
    url: "https://smk-citranegara.sch.id", // ganti dengan link resmi SMK
    photo: "/images/smkcn.png", // TODO: isi path foto
  },
  {
    level: "SMA",
    name: "SMA Citra Negara",
    url: "https://sma-citranegara.sch.id", // ganti dengan link resmi SMA
    photo: "/images/smacn.png", // TODO: isi path foto
  },
];

export default function PilihSekolahPage() {
  return (
    <div className="picker-page">
      <div className="picker-card">

        <Link href="/" className="picker-back">
          &larr; Kembali
        </Link>

        <p className="picker-eyebrow">Yayasan AT-TAQWA Kemiri Jaya</p>
        <h1 className="picker-title">Pilih Sekolah</h1>
        <p className="picker-subtitle">
          Silakan pilih jenjang sekolah untuk melihat informasi lebih lanjut
        </p>

        <div className="picker-grid">
          {SCHOOLS.map((s) => (
            <Link
              key={s.level}
              href={s.url}
              target="_blank"
              rel="noopener noreferrer"
              className="picker-item"
            >
              <div className="picker-photo">
                {s.photo ? (
                  <Image
                    src={s.photo}
                    alt={s.name}
                    fill
                    sizes="(max-width: 720px) 100vw, 33vw"
                    style={{ objectFit: "cover" }}
                  />
                ) : (
                  <span className="picker-photo-label">{s.level}</span>
                )}
              </div>
              <span className="picker-name">{s.name}</span>
              <span className="picker-link">Kunjungi website &rarr;</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}