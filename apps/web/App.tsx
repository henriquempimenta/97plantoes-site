import { useEffect, useState, lazy, Suspense } from 'react';

// Lazy loading das páginas para dividir o bundle (Code Splitting)
const LandingPage = lazy(() => import('./components/LandingPage'));
const TermsAndPrivacyPage = lazy(() => import('./components/TermsAndPrivacyPage'));
const SupportPage = lazy(() => import('./components/SupportPage'));
const AboutPage = lazy(() => import('./components/AboutPage'));
const EmailVerificationPage = lazy(() => import('./components/EmailVerificationPage'));
const ResetPasswordPage = lazy(() => import('./components/ResetPasswordPage'));
const DownloadRedirectPage = lazy(() => import('./components/DownloadRedirectPage'));

const DelayedFallback = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    // Só mostra o loader se a página demorar mais de 500ms para carregar
    const timer = setTimeout(() => setShow(true), 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className={`min-h-screen flex items-center justify-center transition-opacity duration-500 ${
        show ? 'opacity-100' : 'opacity-0'
      }`}
    >
      <div className="w-10 h-10 border-4 border-green-500 border-t-transparent rounded-full animate-spin"></div>
    </div>
  );
};

export default function App() {
  const [page, setPage] = useState(() => new URLSearchParams(window.location.search).get('page'));
  const [pathname, setPathname] = useState(() => window.location.pathname);

  useEffect(() => {
    const onLocationChange = () => {
      setPage(new URLSearchParams(window.location.search).get('page'));
      setPathname(window.location.pathname);
    };
    window.addEventListener('popstate', onLocationChange);
    return () => window.removeEventListener('popstate', onLocationChange);
  }, []);

  const renderPage = () => {
    const actionMode = new URLSearchParams(window.location.search).get('mode');
    // Firebase can use the same configured action URL for initial confirmation
    // and verify-before-update-email. Both must reach the action-code handler.
    if (actionMode === 'verifyEmail' || actionMode === 'verifyAndChangeEmail') {
      return <EmailVerificationPage />;
    }

    if (pathname === '/baixar' || page === 'baixar') {
      return <DownloadRedirectPage />;
    }

    if (page === 'verificar-email') {
      return <EmailVerificationPage />;
    }

    if (page === 'redefinir-senha') {
      return <ResetPasswordPage />;
    }

    if (page === 'suporte') {
      return <SupportPage />;
    }

    if (page === 'sobre-nos') {
      return <AboutPage />;
    }

    if (page === 'termos-de-uso' || page === 'termos') {
      return <TermsAndPrivacyPage />;
    }

    return <LandingPage onGoToApp={() => { }} />;
  };

  // Suspense mostra o nosso loader com fade-in customizado
  return (
    <Suspense fallback={<DelayedFallback />}>
      {renderPage()}
    </Suspense>
  );
}
