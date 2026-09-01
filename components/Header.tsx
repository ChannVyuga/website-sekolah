"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

const NAV_ITEMS = [
  { href: "#hero", label: "Home" },
  { href: "#history", label: "History" },
  { href: "#founder", label: "Founder" },
  { href: "#vision-mission", label: "Vision & Mission" },
  { href: "#school", label: "School" },
  { href: "#contact", label: "Contact Us" },
];

export default function Header() {
  const pathname = usePathname();

  const [open, setOpen] = useState(false);
  const [activeId, setActiveId] = useState<string>("");
  const navRef = useRef<HTMLElement | null>(null);

useEffect(() => {
  const sections = NAV_ITEMS.map((item) =>
    document.getElementById(item.href.slice(1))
  ).filter(Boolean) as HTMLElement[];

  if (!sections.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      const visibleSections = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

      if (visibleSections.length > 0) {
        setActiveId(visibleSections[0].target.id);
      }
    },
    {
      rootMargin: "-20% 0px -55% 0px",
      threshold: [0.1, 0.25, 0.5, 0.75],
    }
  );

  sections.forEach((section) => observer.observe(section));

  return () => observer.disconnect();
}, []);

  return (
    <header>
      <div className="nav-wrap">
        <div className="brand">
          <Link href="#hero" className="logo"> 
            <div className="logo">
              <Image
                src="/images/logoyayasan.png"
                alt="Logo Citra Negara"
                width={55}
                height={55}
                priority
                />
            </div>
          </Link>

          <div className="titles">
            <span className="name">CITRA NEGARA</span>
            <span className="tag">
              SMP SMK SMA Citra Negara — Yayasan AT-TAQWA Kemiri Jaya
            </span>
          </div>
        </div>

        <nav
          className={`main-nav${open ? " open" : ""}`}
          id="mainNav"
          ref={navRef}
        >
          {NAV_ITEMS.map((item) => (
            <a
              key={item.href}
              href={pathname === "/" ? item.href : `/${item.href}`}
              className={activeId === item.href.slice(1) ? "active" : ""}
              onClick={() => setOpen(false)}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="header-right">
          <Link className="cta-btn" href="/spmb/popup">
            DAFTAR SPMB
          </Link>

          <button
            className="burger"
            aria-label="Menu"
            onClick={() => {
              setOpen((v) => !v);
            }}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>
    </header>
  );
}
