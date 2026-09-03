import React, { useState, useEffect } from 'react';
import { HomeView } from './views/HomeView';
import { FrameworksView } from './views/FrameworksView';
import { PricingView } from './views/PricingView';
import { ResourcesView } from './views/ResourcesView';
import { DashboardView } from './views/DashboardView';
import { SiteHeader } from './components/SiteHeader';

export const App: React.FC = () => {
  const getInitialRoute = (): string => {
    const path = window.location.pathname;
    const hash = window.location.hash;
    if (hash === '#/frameworks' || path === '/frameworks') return '/frameworks';
    if (hash === '#/pricing' || path === '/pricing') return '/pricing';
    if (hash === '#/resources' || path === '/resources') return '/resources';
    if (hash === '#/dashboard' || path === '/dashboard') return '/dashboard';
    return '/';
  };

  const [currentRoute, setCurrentRoute] = useState<string>(getInitialRoute);

  const navigate = (route: string) => {
    setCurrentRoute(route);
    window.history.pushState({}, '', route === '/' ? '/' : `#${route}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    const handlePopState = () => {
      setCurrentRoute(getInitialRoute());
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  return (
    <div className="min-h-screen bg-[#F6F7F4] text-[#192837] flex flex-col font-sans antialiased">
      {/* Standalone Route Header for /frameworks, /pricing, /resources */}
      {['/frameworks', '/pricing', '/resources'].includes(currentRoute) && (
        <SiteHeader currentRoute={currentRoute} onNavigate={navigate} />
      )}

      {/* Main View Router */}
      <div className="flex-1">
        {currentRoute === '/' && <HomeView onNavigate={navigate} />}
        {currentRoute === '/frameworks' && <FrameworksView />}
        {currentRoute === '/pricing' && <PricingView onNavigate={navigate} />}
        {currentRoute === '/resources' && <ResourcesView onNavigate={navigate} />}
        {currentRoute === '/dashboard' && (
          <DashboardView onReturnToHome={() => navigate('/')} />
        )}
      </div>
    </div>
  );
};

export default App;
