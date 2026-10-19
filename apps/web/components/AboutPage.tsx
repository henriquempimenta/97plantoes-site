import React, { useEffect } from 'react';
import SiteHeader from './site/SiteHeader';
import Footer from './Footer';

export default function AboutPage() {
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
      `}</style>

      <SiteHeader variant="page" />

      <main className="pt-32 pb-24 px-4 bg-[#F3F6F9] min-h-screen">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-sm font-bold uppercase tracking-widest mb-3" style={{ color: '#3AAADF' }}>
              QUEM SOMOS
            </p>
            <h1 className="font-display text-3xl md:text-5xl font-black" style={{ color: '#0B2E4F' }}>Sobre Nós</h1>
          </div>

          <div
            className="rounded-3xl p-8 md:p-12 bg-white shadow-sm border border-gray-100"
          >
            <p className="text-lg leading-relaxed mb-6" style={{ color: '#374151' }}>
              O <strong style={{ color: '#0B2E4F' }}>97plantões</strong> é um produto da{' '}
              <strong style={{ color: '#1761A6' }}>SANT-E TECNOLOGIA EM SAÚDE LTDA (CNPJ 63.478.081/0001-50)</strong>,{' '}
              empresa brasileira dedicada ao desenvolvimento de soluções tecnológicas inovadoras na área da saúde.
            </p>
            <p className="text-lg leading-relaxed mb-6" style={{ color: '#374151' }}>
              Nossa missão é conectar médicos a plantões em todo o Brasil de forma segura, eficiente e transparente. Acreditamos que a tecnologia pode transformar a dinâmica dos plantões médicos, garantindo mais qualidade de vida aos profissionais da saúde e maior segurança aos pacientes.
            </p>
            <p className="text-lg leading-relaxed" style={{ color: '#374151' }}>
              Por meio do <strong style={{ color: '#0B2E4F' }}>97plantões</strong>, oferecemos uma plataforma completa com verificação rigorosa de CRM, pagamento seguro, chat privado entre profissionais e um mapa interativo que facilita a busca por plantões próximos.
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
