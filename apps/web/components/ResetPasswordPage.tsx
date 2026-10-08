import { useEffect, useState, type FormEvent } from 'react';
import Footer from './Footer';

type ResetState = 'loading' | 'input' | 'submitting' | 'success' | 'error';

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

export default function ResetPasswordPage() {
  const [state, setState] = useState<ResetState>('loading');
  const [errorMessage, setErrorMessage] = useState('');
  const [continueUrl, setContinueUrl] = useState(DEFAULT_CONTINUE_URL);
  
  const [userEmail, setUserEmail] = useState('');
  const [oobCode, setOobCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);

    async function run() {
      const params = new URLSearchParams(window.location.search);
      const mode = params.get('mode');
      const oobCodeParam = params.get('oobCode');
      const apiKey = params.get('apiKey');
      const lang = params.get('lang');
      const safeUrl = getSafeContinueUrl(params.get('continueUrl'));
      setContinueUrl(safeUrl);

      if (lang) {
        document.documentElement.lang = lang.toLowerCase().startsWith('pt') ? 'pt-BR' : lang;
      }

      if (mode !== 'resetPassword') {
        setErrorMessage('Modo de ação inválido para esta página.');
        setState('error');
        return;
      }

      if (!oobCodeParam) {
        setErrorMessage('Código de redefinição ausente.');
        setState('error');
        return;
      }

      if (!apiKey) {
        setErrorMessage('Chave do projeto ausente na URL.');
        setState('error');
        return;
      }
      
      setOobCode(oobCodeParam);

      try {
        // @ts-ignore — CDN dynamic import works at runtime in Vite
        const { initializeApp } = await import('https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js');
        // @ts-ignore — CDN dynamic import works at runtime in Vite
        const { getAuth, verifyPasswordResetCode } = await import('https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js');

        const firebaseConfig = {
          apiKey: 'AIzaSyAqTfaevBavC-Xk-4kzs4rnGkAAidX26AA',
          authDomain: 'plantao-medico-wu1ab6.firebaseapp.com',
          projectId: 'plantao-medico-wu1ab6',
          appId: '1:294897962271:web:7f95743805d5e8ac5f342a',
        };

        const app = initializeApp(firebaseConfig);
        const auth = getAuth(app);
        
        // Verifica se o link é válido e pega o e-mail do usuário
        const email = await verifyPasswordResetCode(auth, oobCodeParam);
        setUserEmail(email);
        setState('input');
        
      } catch (err: any) {
        const code = String(err?.code || '');

        if (code.includes('expired-action-code')) {
          setErrorMessage('Este link de redefinição expirou. Solicite um novo no aplicativo.');
        } else if (code.includes('invalid-action-code')) {
          setErrorMessage('Este link de redefinição é inválido ou já foi utilizado.');
        } else if (code.includes('user-disabled')) {
          setErrorMessage('Esta conta está desativada.');
        } else {
          setErrorMessage('Não foi possível verificar a solicitação. Tente novamente mais tarde.');
        }
        setState('error');
      }
    }

    run();
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    
    if (newPassword !== confirmPassword) {
      setErrorMessage('As senhas não coincidem.');
      return;
    }
    
    if (newPassword.length < 6) {
      setErrorMessage('A senha deve ter pelo menos 6 caracteres.');
      return;
    }
    
    setState('submitting');
    
    try {
      // @ts-ignore
      const { getAuth, confirmPasswordReset } = await import('https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js');
      const auth = getAuth(); // Usa a instância já inicializada
      
      await confirmPasswordReset(auth, oobCode, newPassword);
      setState('success');
    } catch (err: any) {
      const code = String(err?.code || '');
      if (code.includes('weak-password')) {
        setErrorMessage('A senha fornecida é muito fraca. Use uma senha mais forte.');
      } else {
        setErrorMessage('Falha ao redefinir a senha. Tente novamente ou abra o aplicativo.');
      }
      setState('input');
    }
  };

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
        .btn-primary:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(50, 179, 197, 0.4);
        }
        .btn-primary:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }
        .nav-link {
          color: #4b5563;
          font-weight: 500;
          font-size: 0.9rem;
          text-decoration: none;
          transition: color 0.2s;
        }
        .nav-link:hover { color: #0A2540; }
        .input-field {
          width: 100%;
          padding: 12px 16px;
          border: 1px solid #e5e7eb;
          border-radius: 12px;
          font-size: 0.95rem;
          transition: all 0.2s ease;
          outline: none;
        }
        .input-field:focus {
          border-color: #32B3C5;
          box-shadow: 0 0 0 3px rgba(50, 179, 197, 0.15);
        }
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
                    Redefinir Senha
                  </h1>
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
                        Verificando link...
                      </h2>
                      <p className="text-gray-600 leading-relaxed">
                        Aguarde um instante.
                      </p>
                    </div>
                  )}

                  {/* Input form state */}
                  {(state === 'input' || state === 'submitting') && (
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900 mb-2">
                        Criar nova senha
                      </h2>
                      <p className="text-gray-600 mb-6 text-sm">
                        Defina uma nova senha para a conta: <span className="font-semibold">{userEmail}</span>
                      </p>

                      <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-1">
                            Nova Senha
                          </label>
                          <div className="relative">
                            <input
                              type={showPassword ? 'text' : 'password'}
                              value={newPassword}
                              onChange={(e) => setNewPassword(e.target.value)}
                              placeholder="Mínimo 6 caracteres"
                              className="input-field"
                              required
                              disabled={state === 'submitting'}
                            />
                            <button
                              type="button"
                              onClick={() => setShowPassword(!showPassword)}
                              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                              disabled={state === 'submitting'}
                            >
                              {showPassword ? (
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                                </svg>
                              ) : (
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                </svg>
                              )}
                            </button>
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-1">
                            Confirmar Senha
                          </label>
                          <input
                            type={showPassword ? 'text' : 'password'}
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            placeholder="Repita a nova senha"
                            className="input-field"
                            required
                            disabled={state === 'submitting'}
                          />
                        </div>

                        {errorMessage && (
                          <div className="bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-3 rounded-xl mt-2">
                            {errorMessage}
                          </div>
                        )}

                        <button
                          type="submit"
                          className="btn-primary w-full mt-4 py-3 text-base flex justify-center"
                          disabled={state === 'submitting'}
                        >
                          {state === 'submitting' ? (
                            <div className="w-5 h-5 rounded-full border-2 border-white/50 border-t-white animate-spin" />
                          ) : (
                            'Salvar Nova Senha'
                          )}
                        </button>
                      </form>
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
                        Senha alterada!
                      </h2>
                      <p className="text-gray-600 leading-relaxed mb-6">
                        Sua senha foi redefinida com sucesso. Você já pode voltar ao aplicativo e fazer o login com a sua nova senha.
                      </p>
                      <a
                        href="https://plantao-medico-wu1ab6.web.app/login"
                        className="btn-primary w-full py-3.5 text-base flex justify-center"
                      >
                        Ir para o Login
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
                        Link inválido
                      </h2>
                      <div className="bg-gray-50 border border-gray-200 rounded-2xl p-5 mb-5">
                        <p className="text-gray-700 text-sm leading-relaxed">
                          {errorMessage || 'O link de redefinição é inválido ou já expirou.'}
                        </p>
                      </div>
                      <p className="text-gray-500 text-sm leading-relaxed">
                        Volte ao aplicativo e solicite um novo e-mail de redefinição de senha.
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
