import React, { useEffect, useMemo } from 'react';
import SiteHeader from './site/SiteHeader';

const APP_STORE_URL = 'https://apps.apple.com/br/app/97plant%C3%B5es/id6760927669';
const GOOGLE_PLAY_URL = 'https://play.google.com/store/apps/details?id=com.sante.n97plantoes';

function getMobileStoreUrl() {
  const userAgent = navigator.userAgent || navigator.vendor || '';
  const isAndroid = /android/i.test(userAgent);
  const isIOS = /iPad|iPhone|iPod/.test(userAgent);
  const isIPadOS = navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1;

  if (isAndroid) {
    return GOOGLE_PLAY_URL;
  }

  if (isIOS || isIPadOS) {
    return APP_STORE_URL;
  }

  return null;
}

export default function DownloadRedirectPage() {
  const storeUrl = useMemo(() => getMobileStoreUrl(), []);

  useEffect(() => {
    if (storeUrl) {
      window.location.replace(storeUrl);
    }
  }, [storeUrl]);

  return (
    <div className="min-h-screen w-full bg-white text-gray-800 font-sans selection:bg-cyan-100 selection:text-cyan-900">
      <style>{`

        .btn-primary {
          background: linear-gradient(135deg, #3AAADF 0%, #1761A6 100%);
          color: white;
          font-weight: 600;
          padding: 8px 22px;
          border-radius: 9999px;
          border: none;
          cursor: pointer;
          font-size: 0.875rem;
          transition: all 0.2s ease;
          box-shadow: 0 4px 14px rgba(58, 170, 223, 0.3);
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          text-decoration: none;
        }
        .btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(58, 170, 223, 0.4);
        }
        .nav-link {
          color: #4b5563;
          font-weight: 500;
          font-size: 0.9rem;
          text-decoration: none;
          transition: color 0.2s;
        }
        .nav-link:hover { color: #0B2E4F; }
      `}</style>

      <SiteHeader variant="page" />

      <main
        className="min-h-screen pt-32 pb-16 px-4 flex flex-col justify-center items-center relative overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #0B2E4F 0%, #3AAADF 100%)' }}
      >
        <div className="absolute inset-0 pointer-events-none opacity-40">
          <div className="absolute right-[-120px] top-[-120px] w-[420px] h-[420px] rounded-full bg-[#EEF4F9] mix-blend-soft-light blur-3xl" />
          <div className="absolute left-[-140px] bottom-[-160px] w-[520px] h-[520px] rounded-full bg-[#0B2E4F] mix-blend-multiply blur-3xl" />
        </div>

        <section className="max-w-3xl w-full text-center mb-10 relative z-10">
          <div className="inline-block bg-white/20 text-white rounded-full px-5 py-2 text-sm font-semibold mb-6 shadow-sm backdrop-blur-sm border border-white/20">
            Disponível na App Store & Google Play
          </div>
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6 leading-tight drop-shadow-sm">
            Baixe o 97plantões
          </h1>
          <p className="text-white/90 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed font-medium">
            {storeUrl
              ? 'Redirecionando para a loja do seu dispositivo...'
              : 'Escolha a loja para baixar o aplicativo e conectar-se a plantões médicos com segurança e praticidade.'}
          </p>
        </section>

        <section
          className="max-w-4xl w-full flex flex-col md:flex-row items-center justify-between gap-12 p-8 sm:p-10 md:p-14 rounded-[2.5rem] relative z-10"
          style={{
            background: 'rgba(255, 255, 255, 0.12)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            border: '1.5px solid rgba(255, 255, 255, 0.25)',
            boxShadow: '0 25px 50px rgba(0,0,0,0.1)',
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent pointer-events-none rounded-[2.5rem]" />

          <div className="flex flex-col items-center md:items-start relative z-10 w-full md:w-auto">
            <div className="flex items-center gap-3 mb-6">
              <img src="/logo.svg" alt="" className="h-12 w-auto rounded-xl shadow-lg" />
              <div className="text-left">
                <div className="text-white text-2xl font-black tracking-tight">
                  97<span className="text-[#B9EEF5]">plantões</span>
                </div>
                <div className="text-white/75 text-sm font-medium">Conectando a Saúde do Brasil</div>
              </div>
            </div>

            <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-6 tracking-tight">
              Baixe o App Agora
            </h2>

            <div className="flex flex-col gap-4 w-full sm:w-auto">
              <a
                href={APP_STORE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 bg-black text-white px-5 py-2.5 rounded-xl transition-transform hover:scale-105 shadow-xl"
              >
                <svg viewBox="0 0 384 512" className="w-8 h-8 fill-current"><path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z" /></svg>
                <div className="flex flex-col items-start leading-none gap-0.5">
                  <span className="text-[10px] font-medium text-gray-200 uppercase tracking-widest">Download on the</span>
                  <span className="text-xl font-semibold -mt-0.5 tracking-tight">App Store</span>
                </div>
              </a>

              <a
                href={GOOGLE_PLAY_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 bg-black text-white px-5 py-2.5 rounded-xl transition-transform hover:scale-105 shadow-xl"
              >
                <svg viewBox="0 0 512 512" className="w-8 h-8">
                  <path fill="#4CAF50" d="M325.3 234.3L104.6 13l280.8 161.2-60.1 60.1z" />
                  <path fill="#2196F3" d="M47 0C34 6.8 25.3 19.2 25.3 35.3v441.3c0 16.1 8.7 28.5 21.7 35.3l256.6-256L47 0z" />
                  <path fill="#FFEB3B" d="M472.2 225.6l-58.9-34.1-65.7 64.5 65.7 64.5 60.1-34.1c18-14.3 18-46.5-1.2-60.8z" />
                  <path fill="#F44336" d="M104.6 499l280.8-161.2-60.1-60.1L104.6 499z" />
                </svg>
                <div className="flex flex-col items-start leading-none gap-0.5">
                  <span className="text-[10px] font-medium text-gray-200 uppercase tracking-widest">GET IT ON</span>
                  <span className="text-xl font-semibold -mt-0.5 tracking-tight">Google Play</span>
                </div>
              </a>
            </div>
          </div>

          <div className="flex flex-col items-center relative z-10 w-full md:w-auto">
            <div className="flex flex-col sm:flex-row gap-6">
              <div className="flex flex-col items-center">
                <div className="bg-white p-3 rounded-2xl shadow-xl mb-2">
                  <img
                    src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(APP_STORE_URL)}&color=0A2540&bgcolor=FFFFFF&margin=8`}
                    alt="QR Code para App Store"
                    className="w-36 h-36 md:w-44 md:h-44 rounded-lg"
                    loading="lazy"
                  />
                </div>
                <div className="flex items-center gap-1.5 text-white text-sm font-medium tracking-wide">
                  <svg viewBox="0 0 384 512" className="w-4 h-4 fill-current"><path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z" /></svg>
                  App Store
                </div>
              </div>

              <div className="flex flex-col items-center">
                <div className="bg-white p-3 rounded-2xl shadow-xl mb-2">
                  <img
                    src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(GOOGLE_PLAY_URL)}&color=0A2540&bgcolor=FFFFFF&margin=8`}
                    alt="QR Code para Google Play"
                    className="w-36 h-36 md:w-44 md:h-44 rounded-lg"
                    loading="lazy"
                  />
                </div>
                <div className="flex items-center gap-1.5 text-white text-sm font-medium tracking-wide">
                  <svg viewBox="0 0 512 512" className="w-4 h-4">
                    <path fill="#4CAF50" d="M325.3 234.3L104.6 13l280.8 161.2-60.1 60.1z" />
                    <path fill="#2196F3" d="M47 0C34 6.8 25.3 19.2 25.3 35.3v441.3c0 16.1 8.7 28.5 21.7 35.3l256.6-256L47 0z" />
                    <path fill="#FFEB3B" d="M472.2 225.6l-58.9-34.1-65.7 64.5 65.7 64.5 60.1-34.1c18-14.3 18-46.5-1.2-60.8z" />
                    <path fill="#F44336" d="M104.6 499l280.8-161.2-60.1-60.1L104.6 499z" />
                  </svg>
                  Google Play
                </div>
              </div>
            </div>
          </div>
        </section>

        <a
          href="/"
          className="relative z-10 mt-8 text-white/85 hover:text-white font-semibold transition-colors"
        >
          Voltar para o site
        </a>
      </main>
    </div>
  );
}
