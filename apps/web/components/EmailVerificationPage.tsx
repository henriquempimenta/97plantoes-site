import { useEffect, useState } from 'react';
import Footer from './Footer';

type VerificationState = 'loading' | 'success' | 'error';

const DEFAULT_CONTINUE_URL = 'https://97plantoes.com/';

function getSafeContinueUrl(urlFromQuery: string | null): string {
  if (!urlFromQuery) return DEFAULT_CONTINUE_URL;
  try {
    const parsed = new URL(urlFromQuery);
    const allowedHosts = [
      '97plantoes.com',
      'www.97plantoes.com',
      'plantao-medico-wu1ab6.flutterflow.app',
    ];
    if (!allowedHosts.includes(parsed.hostname)) return DEFAULT_CONTINUE_URL;
    return parsed.toString();
  } catch {
    return DEFAULT_CONTINUE_URL;
  }
}

export default function EmailVerificationPage() {
  const [state, setState] = useState<VerificationState>('loading');
  const [errorMessage, setErrorMessage] = useState('');
  const [continueUrl, setContinueUrl] = useState(DEFAULT_CONTINUE_URL);
  const [isEmailChange, setIsEmailChange] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);

    async function run() {
      const params = new URLSearchParams(window.location.search);
      const mode = params.get('mode');
      const oobCode = params.get('oobCode');
      const apiKey = params.get('apiKey');
      const lang = params.get('lang');
      const safeUrl = getSafeContinueUrl(params.get('continueUrl'));
      setContinueUrl(safeUrl);

      if (lang) {
        document.documentElement.lang = lang.toLowerCase().startsWith('pt') ? 'pt-BR' : lang;
      }

      if (mode !== 'verifyEmail' && mode !== 'verifyAndChangeEmail') {
        setErrorMessage('Modo de ação inválido para esta página.');
        setState('error');
        return;
      }
      setIsEmailChange(mode === 'verifyAndChangeEmail');

      if (!oobCode) {
        setErrorMessage('Código de verificação ausente.');
        setState('error');
        return;
      }

      if (!apiKey) {
        setErrorMessage('Chave do projeto ausente na URL de verificação.');
        setState('error');
        return;
      }

      try {
        // @ts-ignore — CDN dynamic import works at runtime in Vite
        const { initializeApp } = await import('https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js');
        // @ts-ignore — CDN dynamic import works at runtime in Vite
        const { getAuth, applyActionCode } = await import('https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js');

        const firebaseConfig = {
          apiKey: 'AIzaSyAqTfaevBavC-Xk-4kzs4rnGkAAidX26AA',
          authDomain: 'plantao-medico-wu1ab6.firebaseapp.com',
          projectId: 'plantao-medico-wu1ab6',
          appId: '1:294897962271:web:7f95743805d5e8ac5f342a',
        };

        const app = initializeApp(firebaseConfig);
        const auth = getAuth(app);
        await applyActionCode(auth, oobCode);

        setState('success');
      } catch (err: any) {
        const code = String(err?.code || '');

        if (code.includes('expired-action-code')) {
          setErrorMessage('Este link de verificação expirou. Solicite um novo e-mail no aplicativo.');
        } else if (code.includes('invalid-action-code')) {
          setErrorMessage('Este link de verificação é inválido ou já foi utilizado.');
        } else if (code.includes('user-disabled')) {
          setErrorMessage('Esta conta está desativada.');
        } else {
          setErrorMessage('Não foi possível concluir a verificação do e-mail. Tente novamente mais tarde.');
        }
        setState('error');
      }
    }

    run();
  }, []);

  return (
    <div
      className="min-h-screen w-full bg-white text-gray-800 font-sans selection:bg-cyan-100 selection:text-cyan-900 flex flex-col"
      style={{ fontFamily: 'Inter, system-ui, sans-serif' }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');

        .btn-primary {
          background: linear-gradient(135deg, #32B3C5 0%, #0D8F9A 100%);
          color: white;
          font-weight: 600;
          padding: 8px 22px;
          border-radius: 9999px;
          border: none;
          cursor: pointer;
          font-size: 0.875rem;
          transition: all 0.2s ease;
          box-shadow: 0 4px 14px rgba(50, 179, 197, 0.3);
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          text-decoration: none;
        }
        .btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(50, 179, 197, 0.4);
        }
        .nav-link {
          color: #4b5563;
          font-weight: 500;
          font-size: 0.9rem;
          text-decoration: none;
          transition: color 0.2s;
        }
        .nav-link:hover { color: #0A2540; }
      `}</style>

      {/* ── Navbar ── */}
      <nav
        className="fixed top-0 left-0 right-0 z-50 border-b"
        style={{ background: 'rgba(255,255,255,0.92)', backdropFilter: 'blur(12px)', borderColor: '#e5e7eb' }}
      >
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <a href="?" className="flex items-center gap-2.5" style={{ textDecoration: 'none' }}>
            <img src="./logo.svg" alt="97plantões logo" className="h-9 w-auto rounded-lg" />
            <span className="font-extrabold text-xl tracking-tight" style={{ color: '#1C5A90' }}>
              97<span style={{ color: '#55BCCD' }}>plantões</span>
            </span>
          </a>

          <div className="hidden md:flex gap-8 items-center">
            <a href="?" className="nav-link">Voltar para a Home</a>
          </div>

          <a href="?#download" className="btn-primary">
            Baixar o App
          </a>
        </div>
      </nav>

      {/* ── Main Content ── */}
      <main className="flex-1 flex items-center justify-center pt-24 pb-16 px-4 bg-[#f8fcfd]">
        <div className="w-full max-w-xl">
          {/* Gradient shell */}
          <div
            className="rounded-3xl overflow-hidden shadow-2xl"
            style={{ background: 'linear-gradient(135deg, #55BCCD 0%, #1C5A90 100%)' }}
          >
            <div className="p-6 md:p-8">
              {/* Header */}
              <div className="flex items-center gap-4 mb-6">
                <div className="bg-white rounded-2xl p-3 shadow-sm">
                  <img
                    src="./logo.svg"
                    alt="97plantões"
                    className="w-14 h-auto block rounded-lg"
                  />
                </div>
                <div className="text-white">
                  <h1 className="text-2xl md:text-3xl font-extrabold leading-tight">
                    97plantões
                  </h1>
                  <p className="text-sm font-semibold text-white/80">
                    Conectando médicos a plantões por todo o Brasil
                  </p>
                </div>
              </div>

              {/* Card */}
              <div className="bg-white rounded-2xl overflow-hidden shadow-sm">
                <div className="p-8 md:p-10">

                  {/* Loading State */}
                  {state === 'loading' && (
                    <div>
                      <div
                        className="w-10 h-10 rounded-full border-4 border-gray-200 animate-spin mb-5"
                        style={{ borderTopColor: '#32B3C5' }}
                      />
                      <h2 className="text-2xl font-bold text-gray-900 mb-3">
                        Verificando seu e-mail
                      </h2>
                      <p className="text-gray-600 leading-relaxed">
                        Aguarde enquanto confirmamos seu endereço de e-mail.
                      </p>
                    </div>
                  )}

                  {/* Success State */}
                  {state === 'success' && (
                    <div>
                      {/* Success icon */}
                      <div
                        className="w-14 h-14 rounded-full flex items-center justify-center mb-5"
                        style={{ background: '#EAF8FA' }}
                      >
                        <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="#0D8F9A" strokeWidth={2.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <h2 className="text-2xl font-bold text-gray-900 mb-3">
                        {isEmailChange ? 'Seu e-mail foi corrigido.' : 'Seu e-mail foi verificado.'}
                      </h2>
                      <p className="text-gray-600 leading-relaxed mb-2">
                        {isEmailChange
                          ? 'O novo endereço foi confirmado. Sua conta e seu cadastro foram preservados.'
                          : 'Seu endereço de e-mail foi confirmado com sucesso.'}
                      </p>
                      <p className="text-gray-600 leading-relaxed mb-6">
                        {isEmailChange
                          ? 'Volte ao aplicativo para continuar o cadastro. Se precisar entrar novamente, use o novo e-mail e a mesma senha.'
                          : 'Volte ao aplicativo para concluir seu cadastro ou continuar o acesso.'}
                      </p>
                      <a
                        href="https://plantao-medico-wu1ab6.web.app/login"
                        className="inline-flex items-center justify-center font-bold text-white text-sm px-8 py-3.5 rounded-2xl transition-all duration-200 hover:-translate-y-0.5"
                        style={{
                          background: 'linear-gradient(135deg, #32B3C5 0%, #0D8F9A 100%)',
                          boxShadow: '0 4px 14px rgba(50, 179, 197, 0.35)',
                        }}
                      >
                        Continuar
                      </a>
                    </div>
                  )}

                  {/* Error State */}
                  {state === 'error' && (
                    <div>
                      {/* Error icon */}
                      <div className="w-14 h-14 rounded-full flex items-center justify-center mb-5 bg-red-50">
                        <svg className="w-7 h-7 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </div>
                      <h2 className="text-2xl font-bold text-gray-900 mb-4">
                        Não foi possível verificar seu e-mail
                      </h2>
                      <div className="bg-gray-50 border border-gray-200 rounded-2xl p-5 mb-5">
                        <p className="text-gray-700 text-sm leading-relaxed">
                          {errorMessage || 'O link de verificação é inválido, expirou ou já foi utilizado.'}
                        </p>
                      </div>
                      <p className="text-gray-400 text-sm leading-relaxed">
                        Solicite um novo e-mail de verificação no aplicativo e tente novamente.
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Footer inside shell */}
              <div className="text-center mt-5 text-white/50 text-xs font-medium">
                © 97plantões. Todos os direitos reservados.
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
