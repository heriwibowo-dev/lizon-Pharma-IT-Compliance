import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, 
  Clock, 
  Activity, 
  AlertTriangle, 
  FileCheck2, 
  Sparkles,
  Server,
  Building2,
  ChevronRight,
  FileSpreadsheet
} from 'lucide-react';
import { PLANT_PROFILE } from '../data/pharmaData';
import { NotificationBellDropdown } from './notifications/NotificationBellDropdown';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  openAiAssistant: () => void;
  openDossierModal: () => void;
  openExportModal: () => void;
}

export const Header: React.FC<HeaderProps> = ({ 
  activeTab, 
  setActiveTab, 
  openAiAssistant,
  openDossierModal,
  openExportModal
}) => {
  const [currentTime, setCurrentTime] = useState<string>('');
  const [ntpOffset, setNtpOffset] = useState<number>(4.2);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString('id-ID', { 
        hour: '2-digit', 
        minute: '2-digit', 
        second: '2-digit',
        hour12: false 
      }));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="bg-slate-900 border-b border-slate-800 sticky top-0 z-40 shadow-xl backdrop-blur-md bg-opacity-95">
      {/* Top Critical Status Bar */}
      <div className="bg-slate-950/80 px-4 py-1.5 border-b border-slate-800/80 text-xs flex flex-wrap items-center justify-between gap-3 text-slate-400">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1.5 font-semibold text-emerald-400">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
            FASILITAS OPERASIONAL (GMP LEVEL GRADE A-D)
          </span>
          <span className="text-slate-600">|</span>
          <span className="hidden sm:inline text-slate-400 font-mono">
            Lisensi: <span className="text-slate-200">{PLANT_PROFILE.gmpLicense}</span>
          </span>
          <span className="hidden md:inline text-slate-600">|</span>
          <span className="hidden md:inline text-slate-400">
            FDA FEI: <span className="text-slate-200">{PLANT_PROFILE.fdaEstablishmentId}</span>
          </span>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5 text-slate-300">
            <Clock className="w-3.5 h-3.5 text-teal-400" />
            <span className="font-mono text-xs">{currentTime || '08:00:00'} WIB</span>
            <span className="text-[10px] px-1.5 py-0.5 rounded bg-teal-950 text-teal-300 border border-teal-800/60 font-mono">
              NTP Stratum-1 (+{ntpOffset}ms)
            </span>
          </div>

          <div className="hidden lg:flex items-center gap-2">
            <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-emerald-950/80 text-emerald-300 border border-emerald-800/60 flex items-center gap-1">
              <ShieldCheck className="w-3 h-3 text-emerald-400" />
              ALCOA+ 98.4%
            </span>
          </div>
        </div>
      </div>

      {/* Main Brand & Action Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3.5 cursor-pointer" onClick={() => setActiveTab('dashboard')}>
          <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-teal-500 to-blue-700 flex items-center justify-center shadow-lg shadow-teal-500/20 text-white font-extrabold text-xl tracking-wider border border-teal-400/30">
            LZ
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg sm:text-xl font-bold tracking-tight text-white flex items-center gap-2">
                {PLANT_PROFILE.companyName}
              </h1>
              <span className="hidden sm:inline-block px-2 py-0.5 text-[10px] font-semibold tracking-wider uppercase rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/30">
                Pabrik Farmasi Baru
              </span>
            </div>
            <p className="text-xs text-slate-400 flex items-center gap-1.5">
              <span>Portal Rekayasa TI &amp; Kepatuhan Integritas Data (GxP / ISPE GAMP 5 / 21 CFR Part 11)</span>
            </p>
          </div>
        </div>

        {/* Header CTA Tools */}
        <div className="flex items-center gap-2 sm:gap-2.5">
          <NotificationBellDropdown onNavigateTab={setActiveTab} />

          <button
            onClick={openExportModal}
            className="flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-2 text-xs font-semibold rounded-lg bg-teal-950/60 hover:bg-teal-900/80 text-teal-300 border border-teal-700/60 hover:border-teal-500 transition shadow-sm"
            title="Ekspor Laporan Kepatuhan Resmi dalam Format PDF atau CSV"
          >
            <FileSpreadsheet className="w-4 h-4 text-teal-400" />
            <span className="hidden sm:inline">Ekspor PDF/CSV</span>
            <span className="sm:hidden">Ekspor</span>
          </button>

          <button
            onClick={openDossierModal}
            className="flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-2 text-xs font-medium rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 hover:border-slate-600 transition shadow-sm"
            title="Buka Berkas Cepat Siap Audit untuk Auditor BPOM / FDA"
          >
            <FileCheck2 className="w-4 h-4 text-emerald-400" />
            <span className="hidden sm:inline">Dossier Kesiapan Audit</span>
            <span className="sm:hidden">Dossier</span>
          </button>

          <button
            onClick={openAiAssistant}
            className="flex items-center gap-2 px-3.5 py-2 text-xs font-semibold rounded-lg bg-gradient-to-r from-teal-500 to-blue-600 hover:from-teal-400 hover:to-blue-500 text-white shadow-md shadow-teal-500/20 transition transform active:scale-95 border border-teal-400/40"
          >
            <Sparkles className="w-4 h-4 text-yellow-300 animate-spin-slow" />
            <span>Asisten AI GxP</span>
          </button>
        </div>
      </div>
    </header>
  );
};
