"use client";

import type { FormEvent } from "react";
import { useState } from "react";
import { useReveal } from "./useReveal";

const infoItems = [
  {
    icon: "📍",
    title: "Alamat",
    text: "Jl. Raya Tanah Baru / Jl. Kemiri Jaya No. 99, Beji, Kecamatan Beji, Kota Depok, Jawa Barat 16421",
  },
  {
    icon: "📞",
    title: "Telepon",
    text: "(021) 77201052",
  },
  {
    icon: "✉️",
    title: "Email",
    text: "info@citranegara.sch.id",
  },
  {
    icon: "🕐",
    title: "Jam Layanan",
    text: "Senin – Jumat, 07.00 – 15.30 WIB | Sabtu, 07.00 – 13.00 WIB",
  },
];

export default function Contact() {
  const { ref: infoRef, visible: infoVisible } =
    useReveal<HTMLDivElement>(0.2);

  const { ref: formRef, visible: formVisible } =
    useReveal<HTMLFormElement>(0.2);

  const [sent, setSent] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const name = formData.get("name")?.toString() || "";
    const message = formData.get("message")?.toString() || "";

    // GANTI NOMOR INI DENGAN NOMOR WHATSAPP SEKOLAH
    // Format: 628xxxxxxxxxx
    const phoneNumber = "6281325269477";

    const whatsappMessage =
      `Halo, saya ingin menghubungi SMK Citra Negara.\n\n` +
      `Nama: ${name}\n` +
      `Pesan:\n${message}`;

    const whatsappUrl =
      `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
        whatsappMessage
      )}`;

    window.open(whatsappUrl, "_blank");

    setSent(true);
  }

  return (
    <section className="section alt" id="contact">
      <div className="container">
        <div className="eyebrow">Kontak</div>

        <h2 className="section-title">
          Kami senang mendengar dari Anda
        </h2>

        <div className="contact-grid">

          <div
            ref={infoRef}
            className={`reveal reveal-left ${
              infoVisible ? "reveal-in" : ""
            }`}
          >
            {infoItems.map((item) => (
              <div
                className="contact-info-item"
                key={item.title}
              >
                <div className="icon">
                  {item.icon}
                </div>

                <div>
                  <h4>{item.title}</h4>
                  <p>{item.text}</p>
                </div>
              </div>
            ))}
          </div>

          <form
            ref={formRef}
            className={`contact-form reveal reveal-right ${
              formVisible ? "reveal-in" : ""
            }`}
            onSubmit={handleSubmit}
          >

            <div>
              <label htmlFor="name">Nama</label>

              <input
                id="name"
                name="name"
                type="text"
                placeholder="Nama lengkap"
                required
              />
            </div>

            <div>
              <label htmlFor="message">Pesan</label>

              <textarea
                id="message"
                name="message"
                placeholder="Tulis pertanyaan Anda..."
                required
              />
            </div>

            <button type="submit" disabled={sent}>
              {sent ? "WhatsApp Terbuka" : "Kirim Pesan"}
            </button>

            <p className="form-note">
              {sent
                ? "WhatsApp telah dibuka. Silakan kirim pesan Anda."
                : "Pesan akan dikirim melalui WhatsApp."}
            </p>

          </form>
        </div>
      </div>
    </section>
  );
}