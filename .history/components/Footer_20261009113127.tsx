import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer
      style={{
        background: "#0B3D2E",
        color: "white",
        borderTop: "2px solid #C8973A",
      }}
    >
      <div className="container footer-grid">
        {/* Identitas Sekolah */}
        <div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              marginBottom: "12px",
            }}
          >
            <Image
              src="/images/logoyayasan.png"
              alt="Logo Citra Negara"
              width={55}
              height={55}
              style={{ objectFit: "contain" }}
            />

            <h4 style={{ margin: 0 }}>Citra Negara</h4>
          </div>

          <p>
            SMP SMK SMA Citra Negara
            <br />
            Yayasan AT-TAQWA Kemiri Jaya, Depok
          </p>
        </div>

        {/* Navigasi */}
        <div>
          <h4>Navigasi</h4>

          <p>
            <a href="/#history">History</a> ·{" "}
            <a href="/#founder">Founder</a> ·{" "}
            <a href="/#vision-mission">Vision &amp; Mission</a> ·{" "}
            <a href="/#school">School</a> ·{" "}
            <a href="/#contact">Contact</a>
          </p>

          <p>
            <a
              href="/SuratPenyelanggaraan"
              target="_blank"
              rel="noopener noreferrer"
            >
              Surat Izin Pendirian &amp; Penyelenggaraan
            </a>
          </p>
        </div>
      </div>

      <div className="container footer-bottom">
        © 2026 Yayasan Pendidikan Citra Negara. Hak Cipta Dilindungi. |
      </div>
    </footer>
  );
}
