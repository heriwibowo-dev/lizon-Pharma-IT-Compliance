import React from 'react';
import { 
  ShieldCheck, 
  CheckCircle2, 
  Server, 
  FileEdit, 
  Database, 
  HardDrive, 
  AlertCircle, 
  ArrowRight, 
  Layers, 
  Lock, 
  RefreshCw, 
  Sparkles,
  Building,
  Cpu,
  Clock,
  ExternalLink,
  ChevronRight,
  FileSpreadsheet,
  FileCheck,
  ShieldAlert
} from 'lucide-react';
import { PLANT_PROFILE, GXP_SYSTEMS, CHANGE_CONTROLS, DAILY_ROUNDS } from '../data/pharmaData';
import { ComplianceVisualizer } from './dashboard/ComplianceVisualizer';

interface DashboardProps {
  setActiveTab: (tab: string) => void;
  openAiAssistant: () => void;
  openDossierModal: () => void;
  openExportModal: () => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ 
  setActiveTab, 
  openAiAssistant,
  openDossierModal,
  openExportModal
}) => {
  return (
    <div className="space-y-6">
      {/* Hero Welcome Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900 via-slate-800 to-teal-950/70 border border-slate-700/80 p-6 sm:p-8 shadow-xl">
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-72 h-72 bg-teal-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-1/3 -mb-10 w-60 h-60 bg-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/30 text-teal-300 text-xs font-semibold">
              <span className="h-2 w-2 rounded-full bg-teal-400 animate-ping"></span>
              PABRIK FARMASI BARU • VALIDASI &amp; INTEGRITAS DATA GXP
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
              Pusat Kendali Rekayasa TI &amp; Kepatuhan GxP
            </h2>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              Memastikan keandalan 24/7, keamanan siber ketat, dan kepatuhan penuh seluruh sistem komputerisasi pabrik baru <strong className="text-white">PT. LIZON Pharma Indonesia</strong> sesuai prinsip <span className="text-teal-300 font-semibold">ALCOA+</span>, standar <span className="text-blue-300 font-semibold">ISPE GAMP 5</span>, regulasi <span className="text-emerald-300 font-semibold">BPOM CPOB 2024</span>, dan <span className="text-purple-300 font-semibold">21 CFR Part 11</span>.
            </p>
          </div>

          <div className="flex flex-wrap lg:flex-col gap-2.5 sm:min-w-[220px]">
            <button
              onClick={() => setActiveTab('audit-support')}
              className="flex-1 lg:flex-none flex items-center justify-between px-4 py-2.5 rounded-xl bg-slate-800/90 hover:bg-slate-700 border border-slate-600 text-slate-100 text-xs font-semibold shadow-md transition group"
            >
              <div className="flex items-center gap-2.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400 group-hover:scale-110 transition" />
                <span>Kesiapan Audit BPOM/FDA</span>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-0.5 transition" />
            </button>

            <button
              onClick={() => setActiveTab('data-integrity')}
              className="flex-1 lg:flex-none flex items-center justify-between px-4 py-2.5 rounded-xl bg-teal-900/40 hover:bg-teal-900/60 border border-teal-700/60 text-teal-200 text-xs font-semibold shadow-md transition group"
            >
              <div className="flex items-center gap-2.5">
                <Database className="w-4 h-4 text-teal-400 group-hover:scale-110 transition" />
                <span>Audit Celah ALCOA+</span>
              </div>
              <ChevronRight className="w-4 h-4 text-teal-300 group-hover:translate-x-0.5 transition" />
            </button>

            <button
              onClick={() => setActiveTab('gxp-risk-assessment')}
              className="flex-1 lg:flex-none flex items-center justify-between px-4 py-2.5 rounded-xl bg-rose-950/40 hover:bg-rose-900/60 border border-rose-500/40 text-rose-300 text-xs font-semibold shadow-md transition group"
            >
              <div className="flex items-center gap-2.5">
                <ShieldAlert className="w-4 h-4 text-rose-400 group-hover:scale-110 transition" />
                <span>Risiko GAMP 5 (FMEA S&times;P&times;D)</span>
              </div>
              <ChevronRight className="w-4 h-4 text-rose-300 group-hover:translate-x-0.5 transition" />
            </button>

            <button
              onClick={() => setActiveTab('audit-trail')}
              className="flex-1 lg:flex-none flex items-center justify-between px-4 py-2.5 rounded-xl bg-teal-950/40 hover:bg-teal-900/60 border border-teal-500/40 text-teal-300 text-xs font-semibold shadow-md transition group"
            >
              <div className="flex items-center gap-2.5">
                <FileCheck className="w-4 h-4 text-teal-400 group-hover:scale-110 transition" />
                <span>Jejak Audit (21 CFR Part 11)</span>
              </div>
              <ChevronRight className="w-4 h-4 text-teal-300 group-hover:translate-x-0.5 transition" />
            </button>

            <button
              onClick={openExportModal}
              className="flex-1 lg:flex-none flex items-center justify-between px-4 py-2.5 rounded-xl bg-slate-800/90 hover:bg-slate-700 border border-slate-600 text-slate-100 text-xs font-semibold shadow-md transition group"
            >
              <div className="flex items-center gap-2.5">
                <FileSpreadsheet className="w-4 h-4 text-teal-400 group-hover:scale-110 transition" />
                <span>Ekspor Laporan PDF/CSV</span>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-0.5 transition" />
            </button>

            <button
              onClick={openAiAssistant}
              className="flex-1 lg:flex-none flex items-center justify-between px-4 py-2.5 rounded-xl bg-gradient-to-r from-teal-600 to-blue-600 hover:from-teal-500 hover:to-blue-500 text-white text-xs font-semibold shadow-md shadow-teal-500/20 transition group"
            >
              <div className="flex items-center gap-2.5">
                <Sparkles className="w-4 h-4 text-yellow-300 animate-spin-slow" />
                <span>Konsultasi Regulasi AI</span>
              </div>
              <ChevronRight className="w-4 h-4 text-white/80 group-hover:translate-x-0.5 transition" />
            </button>
          </div>
        </div>
      </div>

      {/* Critical GxP Alert Banner */}
      <div className="p-4 rounded-xl bg-slate-800/70 border-l-4 border-l-teal-500 border-slate-700 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-md">
        <div className="flex items-start sm:items-center gap-3">
          <div className="p-2 rounded-lg bg-teal-500/10 text-teal-400 mt-0.5 sm:mt-0">
            <Clock className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-teal-400">
              Pengingat Operasional IT Engineer Hari Ini
            </h4>
            <p className="text-xs text-slate-300">
              Jadwal verifikasi backup triwulanan (Cold Restore Drill) jatuh tempo dalam <strong>3 hari</strong>. Seluruh 6 sistem Tier-1 siap disimulasikan di sandbox.
            </p>
          </div>
        </div>
        <button
          onClick={() => setActiveTab('disaster-recovery')}
          className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-teal-500/10 hover:bg-teal-500/20 text-teal-300 border border-teal-500/30 whitespace-nowrap transition"
        >
          Buka Jadwal DRP &rarr;
        </button>
      </div>

      {/* Key Responsibilities Scorecards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Metric 1 */}
        <div 
          onClick={() => setActiveTab('data-integrity')}
          className="p-5 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-teal-500/50 cursor-pointer transition shadow-lg group"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Skor Integritas Data
            </span>
            <div className="p-2 rounded-lg bg-teal-500/10 text-teal-400 group-hover:scale-110 transition">
              <ShieldCheck className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-white">98.4%</span>
            <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded">
              ALCOA+ Prima
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-2">
            9 pilar terkontrol teknis. 0 akun bersama, NTP tersinkronisasi.
          </p>
        </div>

        {/* Metric 2 */}
        <div 
          onClick={() => setActiveTab('validation-csv')}
          className="p-5 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-blue-500/50 cursor-pointer transition shadow-lg group"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Kualifikasi CSV (GAMP 5)
            </span>
            <div className="p-2 rounded-lg bg-blue-500/10 text-blue-400 group-hover:scale-110 transition">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-white">8 / 8</span>
            <span className="text-xs font-bold text-blue-400 bg-blue-500/10 px-1.5 py-0.5 rounded">
              100% Tervalidasi
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-2">
            BMS, EMS, ACS, CCTV, ERP, MES, LIMS, &amp; SCADA lengkap URS s/d VSR.
          </p>
        </div>

        {/* Metric 3 */}
        <div 
          onClick={() => setActiveTab('infrastructure')}
          className="p-5 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-indigo-500/50 cursor-pointer transition shadow-lg group"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Keandalan Infra 24/7
            </span>
            <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-400 group-hover:scale-110 transition">
              <Server className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-white">99.98%</span>
            <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded">
              SLA Terpenuhi
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-2">
            VMware vSphere HA N+1, Dual UPS 40kVA, SAN WORM SnapLock.
          </p>
        </div>

        {/* Metric 4 */}
        <div 
          onClick={() => setActiveTab('change-control')}
          className="p-5 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-amber-500/50 cursor-pointer transition shadow-lg group"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Kontrol Perubahan (CCR)
            </span>
            <div className="p-2 rounded-lg bg-amber-500/10 text-amber-400 group-hover:scale-110 transition">
              <FileEdit className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-white">{CHANGE_CONTROLS.length}</span>
            <span className="text-xs font-bold text-amber-400 bg-amber-500/10 px-1.5 py-0.5 rounded">
              1 In-Implementation
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-2">
            Semua perubahan software/hardware dinilai risiko GxP &amp; pra-persetujuan QA.
          </p>
        </div>
      </div>

      {/* Real-time Recharts KPI & Compliance Visualization Dashboard */}
      <ComplianceVisualizer onOpenExportModal={openExportModal} onNavigateTab={setActiveTab} />

      {/* Main Content 2-Column Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: 8 Key Responsibilities Matrix */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Layers className="w-5 h-5 text-teal-400" />
              8 Tanggung Jawab Utama IT Engineer Farmasi
            </h3>
            <span className="text-xs text-slate-400">Pabrik PT. LIZON Pharma</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
            {/* Box 1 */}
            <div 
              onClick={() => setActiveTab('validation-csv')}
              className="p-4 rounded-xl bg-slate-900/70 border border-slate-800 hover:border-teal-500/40 cursor-pointer transition group"
            >
              <div className="flex items-start gap-3">
                <div className="p-2.5 rounded-lg bg-blue-500/10 text-blue-400 group-hover:bg-blue-500/20 transition">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <h4 className="text-sm font-semibold text-slate-200 group-hover:text-teal-300 transition flex items-center justify-between">
                    <span>1. Validasi &amp; Kepatuhan CSV</span>
                    <ArrowRight className="w-4 h-4 text-slate-500 group-hover:translate-x-1 group-hover:text-teal-400 transition" />
                  </h4>
                  <p className="text-xs text-slate-400 mt-1">
                    Kualifikasi URS, DQ, RA FMEA, IQ, OQ, PQ sesuai ISPE GAMP 5 untuk BMS, EMS, ACS, CCTV, ERP, MES, LIMS, SCADA.
                  </p>
                </div>
              </div>
            </div>

            {/* Box 2 */}
            <div 
              onClick={() => setActiveTab('data-integrity')}
              className="p-4 rounded-xl bg-slate-900/70 border border-slate-800 hover:border-teal-500/40 cursor-pointer transition group"
            >
              <div className="flex items-start gap-3">
                <div className="p-2.5 rounded-lg bg-teal-500/10 text-teal-400 group-hover:bg-teal-500/20 transition">
                  <Database className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <h4 className="text-sm font-semibold text-slate-200 group-hover:text-teal-300 transition flex items-center justify-between">
                    <span>2. Integritas Data (ALCOA+)</span>
                    <ArrowRight className="w-4 h-4 text-slate-500 group-hover:translate-x-1 group-hover:text-teal-400 transition" />
                  </h4>
                  <p className="text-xs text-slate-400 mt-1">
                    Kontrol kepatuhan 21 CFR Part 11, EU Annex 11, PIC/S PI-041, tinjauan audit trail per batch, &amp; proteksi jam NTP.
                  </p>
                </div>
              </div>
            </div>

            {/* Box 3 */}
            <div 
              onClick={() => setActiveTab('infrastructure')}
              className="p-4 rounded-xl bg-slate-900/70 border border-slate-800 hover:border-teal-500/40 cursor-pointer transition group"
            >
              <div className="flex items-start gap-3">
                <div className="p-2.5 rounded-lg bg-indigo-500/10 text-indigo-400 group-hover:bg-indigo-500/20 transition">
                  <Server className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <h4 className="text-sm font-semibold text-slate-200 group-hover:text-teal-300 transition flex items-center justify-between">
                    <span>3. Manajemen Infrastruktur 24/7</span>
                    <ArrowRight className="w-4 h-4 text-slate-500 group-hover:translate-x-1 group-hover:text-teal-400 transition" />
                  </h4>
                  <p className="text-xs text-slate-400 mt-1">
                    Arsitektur Purdue ISA-95 L0-L4, Industrial DMZ, VMware cluster, SAN WORM, dan jaringan cleanroom Wi-Fi terisolasi.
                  </p>
                </div>
              </div>
            </div>

            {/* Box 4 */}
            <div 
              onClick={() => setActiveTab('security-access')}
              className="p-4 rounded-xl bg-slate-900/70 border border-slate-800 hover:border-teal-500/40 cursor-pointer transition group"
            >
              <div className="flex items-start gap-3">
                <div className="p-2.5 rounded-lg bg-purple-500/10 text-purple-400 group-hover:bg-purple-500/20 transition">
                  <Lock className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <h4 className="text-sm font-semibold text-slate-200 group-hover:text-teal-300 transition flex items-center justify-between">
                    <span>4. Keamanan &amp; Kontrol Akses</span>
                    <ArrowRight className="w-4 h-4 text-slate-500 group-hover:translate-x-1 group-hover:text-teal-400 transition" />
                  </h4>
                  <p className="text-xs text-slate-400 mt-1">
                    Prinsip hak akses minimum (Least Privilege), pemisahan tugas (SoD), review akun berkala (QUAR), &amp; USB lockdown.
                  </p>
                </div>
              </div>
            </div>

            {/* Box 5 */}
            <div 
              onClick={() => setActiveTab('change-control')}
              className="p-4 rounded-xl bg-slate-900/70 border border-slate-800 hover:border-teal-500/40 cursor-pointer transition group"
            >
              <div className="flex items-start gap-3">
                <div className="p-2.5 rounded-lg bg-amber-500/10 text-amber-400 group-hover:bg-amber-500/20 transition">
                  <FileEdit className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <h4 className="text-sm font-semibold text-slate-200 group-hover:text-teal-300 transition flex items-center justify-between">
                    <span>5. Kontrol Perubahan &amp; SOP</span>
                    <ArrowRight className="w-4 h-4 text-slate-500 group-hover:translate-x-1 group-hover:text-teal-400 transition" />
                  </h4>
                  <p className="text-xs text-slate-400 mt-1">
                    Alur formal Change Control (CCR), penilaian risiko GxP, repositori 6 SOP IT farmasi siap audit.
                  </p>
                </div>
              </div>
            </div>

            {/* Box 6 */}
            <div 
              onClick={() => setActiveTab('audit-support')}
              className="p-4 rounded-xl bg-slate-900/70 border border-slate-800 hover:border-teal-500/40 cursor-pointer transition group"
            >
              <div className="flex items-start gap-3">
                <div className="p-2.5 rounded-lg bg-emerald-500/10 text-emerald-400 group-hover:bg-emerald-500/20 transition">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <h4 className="text-sm font-semibold text-slate-200 group-hover:text-teal-300 transition flex items-center justify-between">
                    <span>6. Dukungan Audit &amp; Kesiapan</span>
                    <ArrowRight className="w-4 h-4 text-slate-500 group-hover:translate-x-1 group-hover:text-teal-400 transition" />
                  </h4>
                  <p className="text-xs text-slate-400 mt-1">
                    Titik kontak TI inspeksi BPOM, FDA, &amp; PIC/S. Panduan jawaban pertanyaan teknis &amp; penarikan bukti cepat.
                  </p>
                </div>
              </div>
            </div>

            {/* Box 7 */}
            <div 
              onClick={() => setActiveTab('disaster-recovery')}
              className="p-4 rounded-xl bg-slate-900/70 border border-slate-800 hover:border-teal-500/40 cursor-pointer transition group"
            >
              <div className="flex items-start gap-3">
                <div className="p-2.5 rounded-lg bg-cyan-500/10 text-cyan-400 group-hover:bg-cyan-500/20 transition">
                  <RefreshCw className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <h4 className="text-sm font-semibold text-slate-200 group-hover:text-teal-300 transition flex items-center justify-between">
                    <span>7. Pemulihan Bencana &amp; Backup</span>
                    <ArrowRight className="w-4 h-4 text-slate-500 group-hover:translate-x-1 group-hover:text-teal-400 transition" />
                  </h4>
                  <p className="text-xs text-slate-400 mt-1">
                    Arsitektur backup 3-2-1-1, pencapaian RTO &lt; 2 jam, RPO &lt; 15 menit, dan jadwal simulasi restore cold-drill.
                  </p>
                </div>
              </div>
            </div>

            {/* Box 8 */}
            <div 
              onClick={() => setActiveTab('daily-ops')}
              className="p-4 rounded-xl bg-slate-900/70 border border-slate-800 hover:border-teal-500/40 cursor-pointer transition group"
            >
              <div className="flex items-start gap-3">
                <div className="p-2.5 rounded-lg bg-rose-500/10 text-rose-400 group-hover:bg-rose-500/20 transition">
                  <Cpu className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <h4 className="text-sm font-semibold text-slate-200 group-hover:text-teal-300 transition flex items-center justify-between">
                    <span>8. Operasional Harian &amp; Tugas Lain</span>
                    <ArrowRight className="w-4 h-4 text-slate-500 group-hover:translate-x-1 group-hover:text-teal-400 transition" />
                  </h4>
                  <p className="text-xs text-slate-400 mt-1">
                    Ronde harian ruang server &amp; cleanroom, penanganan insiden/deviasi GxP, dan catatan serah terima shift.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Plant System Overview & Realtime Rounds */}
        <div className="space-y-4">
          <div className="p-5 rounded-xl bg-slate-900/80 border border-slate-800 shadow-md">
            <h3 className="text-sm font-bold text-white mb-3 flex items-center justify-between">
              <span>Status Sistem Terkomputerisasi</span>
              <span className="text-xs font-mono text-emerald-400">8 Online</span>
            </h3>

            <div className="space-y-2.5">
              {GXP_SYSTEMS.slice(0, 5).map((sys) => (
                <div 
                  key={sys.id} 
                  className="flex items-center justify-between p-2.5 rounded-lg bg-slate-800/60 border border-slate-700/60 text-xs"
                >
                  <div className="flex items-center gap-2.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                    <div>
                      <div className="font-semibold text-slate-200">{sys.name}</div>
                      <div className="text-[10px] text-slate-400">{sys.code} • {sys.gampCategory}</div>
                    </div>
                  </div>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800">
                    Validated
                  </span>
                </div>
              ))}
            </div>

            <button
              onClick={() => setActiveTab('validation-csv')}
              className="w-full mt-3 py-2 text-xs font-semibold text-teal-400 hover:text-teal-300 text-center transition"
            >
              Lihat Seluruh 8 Sistem &amp; Matriks RTM &rarr;
            </button>
          </div>

          {/* Plant Line Summary */}
          <div className="p-5 rounded-xl bg-slate-900/80 border border-slate-800 shadow-md space-y-3">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Building className="w-4 h-4 text-blue-400" />
              Lini Manufaktur PT. LIZON Pharma
            </h3>
            <div className="space-y-2 text-xs text-slate-300">
              {PLANT_PROFILE.productionLines.map((line, idx) => (
                <div key={idx} className="flex items-start gap-2 p-2 rounded bg-slate-800/40 border border-slate-700/40">
                  <span className="w-1.5 h-1.5 rounded-full bg-teal-400 mt-1.5"></span>
                  <span>{line}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
