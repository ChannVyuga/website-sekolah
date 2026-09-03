"use client";

export default function Hero() {
  return (
    <section className="hero" id="hero">
      <div className="hero-content">

        <p className="kicker">
          Yayasan Pendidikan Citra Negara
        </p>

        {/* ANIMATED HERO TITLE — cycling ID / JP / DE / brand */}
        <div className="hero-title-wrap">
          <h1 className="hero-title hero-title-cycle">
            SELAMAT DATANG!
          </h1>

          <h1 className="hero-title hero-title-cycle" lang="en">
            WELCOME!
          </h1>

          <h1 className="hero-title hero-title-cycle" lang="ja">
            ようこそ！
          </h1>

          <h1 className="hero-title hero-title-cycle" lang="de">
            WILLKOMMEN!
          </h1>

          <h1 className="hero-title hero-title-cycle">
            CITRA NEGARA
          </h1>
        </div>

        <p className="sub">
          SMP &middot; SMA &middot; SMK DALAM SATU NAUNGAN
        </p>

        <p className="desc">
          Tiga jenjang, satu tujuan: membentuk siswa yang berkarakter,
          berprestasi, dan siap membawa nama baik keluarga serta bangsa.
        </p>

        <div className="hero-buttons">
          <a href="#school" className="btn-primary">
            Lihat Unit Sekolah
          </a>

          <a href="#contact" className="btn-ghost">
            Hubungi Kami
          </a>
        </div>

      </div>
    </section>
  );
}