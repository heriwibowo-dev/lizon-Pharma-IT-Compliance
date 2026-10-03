import React from 'react';
import { 
  LayoutDashboard, 
  CheckCircle2, 
  Database, 
  Server, 
  Lock, 
  FileEdit, 
  Award, 
  RefreshCcw, 
  ClipboardList,
  Sparkles,
  FileCheck,
  ShieldAlert
} from 'lucide-react';

interface NavigationProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const NAV_ITEMS = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    shortLabel: 'Overview',
    icon: LayoutDashboard,
    badge: 'Live',
    badgeColor: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
  },
  {
    id: 'validation-csv',
    label: '1. Validasi & CSV (GAMP 5)',
    shortLabel: 'Validasi CSV',
    icon: CheckCircle2,
    badge: '8 Sistem',
    badgeColor: 'bg-blue-500/20 text-blue-400 border-blue-500/30'
  },
  {
    id: 'gxp-risk-assessment',
    label: 'Manajemen Risiko GAMP 5',
    shortLabel: 'Risiko GAMP 5',
    icon: ShieldAlert,
    badge: 'FMEA S×P×D',
    badgeColor: 'bg-rose-500/20 text-rose-300 border-rose-500/40'
  },
  {
    id: 'data-integrity',
    label: '2. Integritas Data (ALCOA+)',
    shortLabel: 'ALCOA+',
    icon: Database,
    badge: '21 CFR 11',
    badgeColor: 'bg-teal-500/20 text-teal-400 border-teal-500/30'
  },
  {
    id: 'audit-trail',
    label: 'Jejak Audit (21 CFR Part 11)',
    shortLabel: 'Audit Trail',
    icon: FileCheck,
    badge: 'WORM Log',
    badgeColor: 'bg-teal-500/20 text-teal-300 border-teal-500/40'
  },
  {
    id: 'infrastructure',
    label: '3. Infrastruktur & OT/IT',
    shortLabel: 'Infrastruktur',
    icon: Server,
    badge: 'Purdue L0-L4',
    badgeColor: 'bg-indigo-500/20 text-indigo-400 border-indigo-500/30'
  },
  {
    id: 'security-access',
    label: '4. Keamanan & Kontrol Akses',
    shortLabel: 'Keamanan Akses',
    icon: Lock,
    badge: 'SoD / RBAC',
    badgeColor: 'bg-purple-500/20 text-purple-400 border-purple-500/30'
  },
  {
    id: 'change-control',
    label: '5. Kontrol Perubahan & SOP',
    shortLabel: 'Change Control',
    icon: FileEdit,
    badge: '4 CCR Aktif',
    badgeColor: 'bg-amber-500/20 text-amber-400 border-amber-500/30'
  },
  {
    id: 'audit-support',
    label: '6. Dukungan Audit & Inspeksi',
    shortLabel: 'Dukungan Audit',
    icon: Award,
    badge: 'BPOM / FDA',
    badgeColor: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
  },
  {
    id: 'disaster-recovery',
    label: '7. Pemulihan Bencana & Backup',
    shortLabel: 'DRP & Backup',
    icon: RefreshCcw,
    badge: '3-2-1-1 SLA',
    badgeColor: 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30'
  },
  {
    id: 'daily-ops',
    label: '8. Operasional Harian & Tugas',
    shortLabel: 'Rounds & Ops',
    icon: ClipboardList,
    badge: 'Shift Siap',
    badgeColor: 'bg-slate-500/20 text-slate-300 border-slate-500/30'
  },
  {
    id: 'ai-assistant',
    label: 'Asisten AI Regulasi GxP',
    shortLabel: 'AI GxP',
    icon: Sparkles,
    badge: 'Gemini 3.8',
    badgeColor: 'bg-rose-500/20 text-rose-300 border-rose-500/30'
  }
];

export const Navigation: React.FC<NavigationProps> = ({ activeTab, setActiveTab }) => {
  return (
    <nav className="bg-slate-900/90 border-b border-slate-800 px-4 sm:px-6 lg:px-8 py-2 sticky top-[89px] z-30 backdrop-blur-md">
      <div className="max-w-7xl mx-auto flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium whitespace-nowrap transition-all duration-150 ${
                isActive
                  ? 'bg-teal-500/15 text-teal-300 border border-teal-500/40 shadow-sm shadow-teal-500/10'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60 border border-transparent'
              }`}
            >
              <Icon className={`w-4 h-4 ${isActive ? 'text-teal-400' : 'text-slate-400'}`} />
              <span className="hidden md:inline">{item.label}</span>
              <span className="md:hidden">{item.shortLabel}</span>
              {item.badge && (
                <span className={`text-[10px] px-1.5 py-0.2 rounded border font-mono ${item.badgeColor}`}>
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};
