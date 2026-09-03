"use client";

import Header from "@/components/Header";
import Hero from "@/components/hooks/Hero";
import History from "@/components/hooks/History";
import Founder from "@/components/hooks/Founder";
import VisionMission from "@/components/hooks/VisionMission";
import School from "@/components/hooks/School";
import Contact from "@/components/hooks/Contact";
import Footer from "@/components/Footer";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import Splash from "@/components/SplashWelcome";
import ScrollProgress from "@/components/ScrollProgress";
import { useState } from "react";

export default function Home() {
  const [ready, setReady] = useState(false);

  return (
    <>
      {!ready && (
        <Splash onFinish={() => setReady(true)} />
      )}

      <main
        style={{
          opacity: ready ? 1 : 0,
          transition: "opacity 0.7s ease",
        }}
      >
        <Header />
        <Hero />
        <History />
        <Founder />
        <VisionMission />
        <School />
        <Contact />
        <Footer />
        <WhatsAppFloat />
      </main>
    </>
  );
}