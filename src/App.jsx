import { useState } from "react";
import "./App.css";
import confetti from "canvas-confetti";
import foto from "./image/huzurum.jpeg"; // Kendi resim dosyanızın adı ve uzantısı
function App() {
  const [kacmaSayisi, setKacmaSayisi] = useState(0);
  const [pos, setPos] = useState({ top: null, left: null });
  const [asama, setAsama] = useState(1); // 1: Sinir Testi, 2: Başarısız Ekranı, 3: Sevgi Testi Ekranı

  // Sevgi Testi Durumları
  const [sevgiKacmaSayisi, setSevgiKacmaSayisi] = useState(0);
  const [sevgiPos, setSevgiPos] = useState({ top: null, left: null });
  const [sevgiTamamlandi, setSevgiTamamlandi] = useState(false);

  // --- 1. AŞAMA (SİNİR TESTİ) MANTIKLARI ---
  const hareketEt = () => {
    if (kacmaSayisi < 3) {
      const yeniKacma = kacmaSayisi + 1;
      setKacmaSayisi(yeniKacma);

      if (yeniKacma < 3) {
        const randomX = Math.floor(Math.random() * (window.innerWidth - 180));
        const randomY = Math.floor(
          Math.round(Math.random() * (window.innerHeight - 80)),
        );
        setPos({ top: `${randomY}px`, left: `${randomX}px` });
      }
    }
  };

  const sinirliTiklandi = () => {
    setAsama(2);
  };

  const sevgiTestineGec = () => {
    setAsama(3);
  };

  const kilitlendi = kacmaSayisi >= 3;

  // --- 3. AŞAMA (SEVGİ TESTİ) MANTIKLARI ---
  const sevmiyorHareketEt = () => {
    if (sevgiKacmaSayisi < 3) {
      const yeniKacma = sevgiKacmaSayisi + 1;
      setSevgiKacmaSayisi(yeniKacma);

      if (yeniKacma < 3) {
        const randomX = Math.floor(Math.random() * (window.innerWidth - 220));
        const randomY = Math.floor(
          Math.round(Math.random() * (window.innerHeight - 80)),
        );
        setSevgiPos({ top: `${randomY}px`, left: `${randomX}px` });
      }
    }
  };

  // Kalpli konfeti patlatma fonksiyonu
  const kalpliKonfeti = () => {
    setSevgiTamamlandi(true);

    const scalar = 2;
    const heart = confetti.shapeFromText({ text: "❤️", scalar });

    confetti({
      shapes: [heart],
      particleCount: 80,
      spread: 100,
      origin: { y: 0.6 },
      scalar,
    });

    // Sürekli kalp yağmuru
    const duration = 3 * 1000;
    const end = Date.now() + duration;

    (function frame() {
      confetti({
        shapes: [heart],
        particleCount: 2,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        scalar,
      });
      confetti({
        shapes: [heart],
        particleCount: 2,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        scalar,
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    })();
  };

  // Sevmiyor butonu yazısını dinamik getirir
  const getSevmiyorText = () => {
    switch (sevgiKacmaSayisi) {
      case 0:
        return "Eren'i sevmiyor";
      case 1:
        return "Ne demek Eren'i sevmiyorsun";
      case 2:
        return "Ama kırılıyorum bak hala deniyorsun";
      default:
        return "Peki sevmiyorsun ödülü kaçırdın 💔";
    }
  };

  const sevgiKilitlendi = sevgiKacmaSayisi >= 3;

  return (
    <div className="container">
      {/* 1. AŞAMA: SİNİR TESTİ */}
      {asama === 1 && (
        <>
          <h1 className="title">SİNİR VE SEVGİ TESTİ🧪</h1>
          <p className="subtitle">Başlıyoruz...</p>

          <div className="button-container">
            <button
              className={`angry-button ${kilitlendi ? "active-green" : ""}`}
              onClick={sinirliTiklandi}
            >
              {kilitlendi
                ? "İkimizde biliyoruz sinirlisin TIKLA BANA"
                : "ÇOOOOK SİNİRLİYİM"}
            </button>

            <button
              className={`relax-button ${kilitlendi ? "disabled-btn" : ""}`}
              onMouseEnter={hareketEt}
              onClick={hareketEt}
              disabled={kilitlendi}
              style={
                pos.top !== null && !kilitlendi
                  ? {
                      position: "fixed",
                      top: pos.top,
                      left: pos.left,
                      zIndex: 999,
                    }
                  : {}
              }
            >
              SAKİN BİR KİŞİYİM
            </button>
          </div>
        </>
      )}

      {/* 2. AŞAMA: BAŞARISIZ EKRANI */}
      {asama === 2 && (
        <>
          <h1 className="title error-title">TESTİ GEÇEMEDİN ❌</h1>
          <p className="subtitle">AHH SİNİRLERİNE HAKİM OLMALISIN</p>
          <button className="final-button" onClick={sevgiTestineGec}>
            Sevgi Testine Devam Et ❤️
          </button>
        </>
      )}

      {/* 3. AŞAMA: SEVGİ TESTİ EKRANI */}
      {asama === 3 && (
        <>
          <h1 className="title love-title">SEVGİ TESTİ 💕</h1>

          {!sevgiTamamlandi ? (
            <>
              <p className="subtitle">Lütfen seçimini yap:</p>
              <div className="button-container">
                {/* Seviyor Butonu */}
                <button
                  className={`love-button ${sevgiKilitlendi ? "disabled-btn" : ""}`}
                  onClick={kalpliKonfeti}
                  disabled={sevgiKilitlendi}
                >
                  Güzide Eren'i Çok seviyor ❤️
                </button>

                {/* Sevmiyor / Kaçan Buton */}
                <button
                  className={`not-love-button ${sevgiKilitlendi ? "disabled-btn" : ""}`}
                  onMouseEnter={sevmiyorHareketEt}
                  onClick={sevmiyorHareketEt}
                  disabled={sevgiKilitlendi}
                  style={
                    sevgiPos.top !== null && !sevgiKilitlendi
                      ? {
                          position: "fixed",
                          top: sevgiPos.top,
                          left: sevgiPos.left,
                          zIndex: 999,
                        }
                      : {}
                  }
                >
                  {getSevmiyorText()}
                </button>
              </div>
            </>
          ) : (
            /* Kalp Patladıktan Sonraki Kutlama Ekranı */
            <div className="celebration-box">
              <h2 className="celebration-text">Sonsuza Kadar Birlikte! 🎉</h2>
              <img src={foto} alt="Biz" className="celebration-photo" />
              <p className="message-box">Bende Seni çok seviyorum! ❤️</p>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default App;
