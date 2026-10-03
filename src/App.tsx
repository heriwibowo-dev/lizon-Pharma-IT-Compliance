import React, { useState } from 'react';
import { Header } from './components/Header';
import { Navigation } from './components/Navigation';
import { Dashboard } from './components/Dashboard';
import { ValidationCSVModule } from './components/modules/ValidationCSVModule';
import { DataIntegrityAlcoaModule } from './components/modules/DataIntegrityAlcoaModule';
import { InfrastructureModule } from './components/modules/InfrastructureModule';
import { SecurityAccessModule } from './components/modules/SecurityAccessModule';
import { ChangeControlModule } from './components/modules/ChangeControlModule';
import { AuditSupportModule } from './components/modules/AuditSupportModule';
import { DisasterRecoveryModule } from './components/modules/DisasterRecoveryModule';
import { DailyOpsModule } from './components/modules/DailyOpsModule';
import { AiRegulatoryAssistant } from './components/modules/AiRegulatoryAssistant';
import { AuditTrailModule } from './components/modules/AuditTrailModule';
import { GxpRiskAssessmentModule } from './components/modules/GxpRiskAssessmentModule';
import { DossierModal } from './components/common/DossierModal';
import { ExportReportModal } from './components/common/ExportReportModal';
import { NotificationProvider } from './context/NotificationContext';
import { NotificationToast } from './components/notifications/NotificationToast';
import { PLANT_PROFILE } from './data/pharmaData';
import { ShieldCheck, HeartPulse, Building2, Sparkles, X } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('dashboard');
  const [isDossierOpen, setIsDossierOpen] = useState<boolean>(false);
  const [isExportOpen, setIsExportOpen] = useState<boolean>(false);
  const [isAiDrawerOpen, setIsAiDrawerOpen] = useState<boolean>(false);

  return (
    <NotificationProvider>
      <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-teal-500 selection:text-white">
      {/* Header Bar */}
      <Header 
        activeTab={activeTab} 
        setActiveTab={setActiveTab}
        openAiAssistant={() => setActiveTab('ai-assistant')}
        openDossierModal={() => setIsDossierOpen(true)}
        openExportModal={() => setIsExportOpen(true)}
      />

      {/* Navigation Sub-Bar */}
      <Navigation activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {activeTab === 'dashboard' && (
          <Dashboard 
            setActiveTab={setActiveTab} 
            openAiAssistant={() => setActiveTab('ai-assistant')}
            openDossierModal={() => setIsDossierOpen(true)}
            openExportModal={() => setIsExportOpen(true)}
          />
        )}

        {activeTab === 'validation-csv' && <ValidationCSVModule />}
        {activeTab === 'gxp-risk-assessment' && <GxpRiskAssessmentModule />}
        {activeTab === 'data-integrity' && <DataIntegrityAlcoaModule />}
        {activeTab === 'audit-trail' && <AuditTrailModule />}
        {activeTab === 'infrastructure' && <InfrastructureModule />}
        {activeTab === 'security-access' && <SecurityAccessModule />}
        {activeTab === 'change-control' && <ChangeControlModule />}
        {activeTab === 'audit-support' && <AuditSupportModule />}
        {activeTab === 'disaster-recovery' && <DisasterRecoveryModule />}
        {activeTab === 'daily-ops' && <DailyOpsModule />}
        {activeTab === 'ai-assistant' && <AiRegulatoryAssistant />}
      </main>

      {/* Footer */}
      <footer className="mt-auto border-t border-slate-900 bg-slate-950/80 px-4 py-6 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <div className="w-6 h-6 rounded-md bg-teal-600/30 border border-teal-500/40 flex items-center justify-center font-bold text-teal-400 text-xs">
              LZ
            </div>
            <div>
              <span className="font-semibold text-slate-300">{PLANT_PROFILE.companyName}</span>
              <span className="text-slate-500"> • {PLANT_PROFILE.facilityName}</span>
            </div>
          </div>

          <div className="text-center md:text-right text-[11px] space-y-0.5">
            <div>Standar Kepatuhan: BPOM CPOB 2024 | FDA 21 CFR Part 11 | EU Annex 11 | ISPE GAMP 5 | ISO 27001</div>
            <div>Prinsip Integritas Data ALCOA+ Diterapkan &amp; Dipelihara 24/7 oleh Departemen Rekayasa TI</div>
          </div>
        </div>
      </footer>

      {/* Rapid Dossier Modal */}
      <DossierModal 
        isOpen={isDossierOpen} 
        onClose={() => setIsDossierOpen(false)} 
      />

      {/* Export Compliance Report Modal */}
      <ExportReportModal
        isOpen={isExportOpen}
        onClose={() => setIsExportOpen(false)}
      />

      {/* Real-time Notification Toast Alert */}
      <NotificationToast onNavigateTab={setActiveTab} />
    </div>
  </NotificationProvider>
  );
}
