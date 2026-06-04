import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "./assets/vite.svg";
import heroImg from "./assets/hero.png";
import "./App.css";
import confetti from "canvas-confetti"; // BU SATIR ŞART
function App() {
  const patlat = () => {
    // Klasik konfeti patlaması
    confetti({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.6 },
      colors: ["#ff0000", "#ffd700", "#228b22", "#ffffff"],
    });

    // Yanlardan sürekli yağmur efekti (Ekstra şıklık için)
    const duration = 3 * 1000;
    const end = Date.now() + duration;

    (function frame() {
      confetti({
        particleCount: 2,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ["#ff0000", "#ffd700"],
      });
      confetti({
        particleCount: 2,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ["#228b22", "#ffffff"],
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    })();
  };

  return (
    <div className="container">
      <h1 className="title">Groot Doğum Günün Kutlu Olsun! 🎂</h1>
      <p className="subtitle">Yeni yaşın sağlık ve huzur getirsin.</p>

      <button className="magic-button" onClick={patlat}>
        Sürprizi Gör ✨
      </button>
    </div>
  );
}

export default App;
