import React, { useEffect } from 'react';
import SiteHeader from './site/SiteHeader';
import Footer from './Footer';

export default function SupportPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen w-full bg-white text-gray-800 font-sans selection:bg-cyan-100 selection:text-cyan-900" >
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
        
        .content-section h1 {
          font-size: 2.5rem;
          font-weight: 900;
          color: #0B2E4F;
          margin-bottom: 2rem;
        }
        .content-section h2 {
          font-size: 1.5rem;
          font-weight: 800;
          color: #1761A6;
          margin-top: 2.5rem;
          margin-bottom: 1rem;
        }
        .content-section p {
          font-size: 1.1rem;
          line-height: 1.7;
          color: #4b5563;
          margin-bottom: 1rem;
        }
        .info-card {
          background-color: #f0fdfa;
          border-left: 4px solid #3AAADF;
          padding: 1.5rem;
          border-radius: 0.5rem;
          margin-top: 2rem;
        }
        .contact-link {
          color: #1761A6;
          font-weight: 600;
          text-decoration: none;
          transition: color 0.2s;
        }
        .contact-link:hover {
          color: #1761A6;
          text-decoration: underline;
        }
        .whatsapp-btn {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          background-color: #25D366;
          color: white;
          font-weight: 600;
          padding: 12px 24px;
          border-radius: 9999px;
          text-decoration: none;
          transition: all 0.2s ease;
          box-shadow: 0 4px 14px rgba(37, 211, 102, 0.3);
          margin-top: 4px;
          font-size: 1rem;
        }
        .whatsapp-btn:hover {
          background-color: #20BA56;
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(37, 211, 102, 0.4);
          color: white;
        }
      `}</style>

      <SiteHeader variant="page" />

      <main className="pt-32 pb-24 px-4 bg-[#F3F6F9] min-h-screen">
        <div className="max-w-3xl mx-auto bg-white p-8 md:p-12 rounded-3xl shadow-sm border border-gray-100 content-section">
          <h1>Suporte 97plantões</h1>

          <p>
            Estamos aqui para ajudar você.
          </p>
          <p>
            Se tiver qualquer dúvida sobre candidatura a plantões, passagem de plantões, pagamentos, funcionamento da plataforma ou sua conta, nossa equipe de suporte está pronta para atender.
          </p>
          <p>
            Nosso objetivo é garantir que sua experiência no 97plantões seja simples, segura e eficiente.
          </p>

          <div className="info-card">
            <h2>Canais de Atendimento</h2>

            <p>
              <span className="text-gray-700 font-bold"> E-mail: </span>
              <a href="mailto:suporte@97plantoes.com" className="contact-link">suporte@97plantoes.com</a>
            </p>

            <div className="mt-6 flex flex-col items-start gap-3">
              <span className="text-gray-700 font-bold">Atendimento pelo WhatsApp:</span>
              <a href="https://wa.me/5521960191943" target="_blank" rel="noopener noreferrer" className="whatsapp-btn" style={{ marginTop: 0 }}>
                <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
                </svg>
                Falar no WhatsApp
              </a>
            </div>
          </div>

          <p className="mt-8 text-sm text-gray-500">
            Nosso suporte funciona 24 horas por dia, todos os dias, para garantir que você tenha assistência sempre que precisar.
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
}
