import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { CinematicLoader } from './components/loading/CinematicLoader';
import { LandingPage } from './pages/LandingPage';
import { AppLayout } from './components/layout/AppLayout';
import { OverviewPage } from './pages/OverviewPage';
import { BusinessesPage } from './pages/BusinessesPage';
import { WorkflowsPage } from './pages/WorkflowsPage';
import { WorkflowDetailPage } from './pages/WorkflowDetailPage';
import { ExecutionsPage } from './pages/ExecutionsPage';
import { BacklogPage } from './pages/BacklogPage';
import { FunnelsPage } from './pages/FunnelsPage';
import { CartsPage } from './pages/CartsPage';
import { PaymentsPage } from './pages/PaymentsPage';
import { UpsellDownsellPage } from './pages/UpsellDownsellPage';
import { AppointmentsPage } from './pages/AppointmentsPage';
import { OnboardingPage } from './pages/OnboardingPage';
import { SupportPage } from './pages/SupportPage';
import { IntegrationsPage } from './pages/IntegrationsPage';
import { ApiInspectorPage } from './pages/ApiInspectorPage';
import { WebhooksPage } from './pages/WebhooksPage';
import { CommunicationsPage } from './pages/CommunicationsPage';
import { AnalyticsPage } from './pages/AnalyticsPage';
import { HealthIncidentsPage } from './pages/HealthIncidentsPage';
import { SettingsPage } from './pages/SettingsPage';
import { NotFoundPage } from './pages/NotFoundPage';

export function App() {
  const [hasLoaded, setHasLoaded] = useState(false);

  // Check if session already completed initial cinematic loading once to keep navigation smooth
  useEffect(() => {
    const loadedBefore = sessionStorage.getItem('ghl_cmd_loaded');
    if (loadedBefore) {
      setHasLoaded(true);
    }
  }, []);

  const handleLoaderComplete = () => {
    setHasLoaded(true);
    sessionStorage.setItem('ghl_cmd_loaded', 'true');
  };

  return (
    <>
      {!hasLoaded && <CinematicLoader onComplete={handleLoaderComplete} />}

      <BrowserRouter>
        <Routes>
          {/* Public Landing Page */}
          <Route path="/" element={<LandingPage />} />

          {/* Command Center Application Shell */}
          <Route path="/app" element={<AppLayout />}>
            <Route index element={<OverviewPage />} />
            <Route path="businesses" element={<BusinessesPage />} />
            <Route path="workflows" element={<WorkflowsPage />} />
            <Route path="workflows/:id" element={<WorkflowDetailPage />} />
            <Route path="executions" element={<ExecutionsPage />} />
            <Route path="backlog" element={<BacklogPage />} />
            <Route path="funnels" element={<FunnelsPage />} />
            <Route path="carts" element={<CartsPage />} />
            <Route path="payments" element={<PaymentsPage />} />
            <Route path="upsell-downsell" element={<UpsellDownsellPage />} />
            <Route path="appointments" element={<AppointmentsPage />} />
            <Route path="onboarding" element={<OnboardingPage />} />
            <Route path="support" element={<SupportPage />} />
            <Route path="integrations" element={<IntegrationsPage />} />
            <Route path="api-inspector" element={<ApiInspectorPage />} />
            <Route path="webhooks" element={<WebhooksPage />} />
            <Route path="communications" element={<CommunicationsPage />} />
            <Route path="analytics" element={<AnalyticsPage />} />
            <Route path="health" element={<HealthIncidentsPage />} />
            <Route path="settings" element={<SettingsPage />} />
          </Route>

          {/* 404 Catch-All */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

