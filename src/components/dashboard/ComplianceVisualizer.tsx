import React, { useState } from 'react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
  ReferenceLine
} from 'recharts';
import { 
  Activity, 
  TrendingUp, 
  ShieldCheck, 
  FileEdit, 
  CheckCircle2, 
  Clock, 
  Server, 
  RefreshCw, 
  Filter,
  BarChart3,
  SlidersHorizontal,
  AlertCircle,
  Download,
  FileSpreadsheet,
  BellRing,
  FileCheck
} from 'lucide-react';
import { GXP_SYSTEMS, CHANGE_CONTROLS } from '../../data/pharmaData';
import { useNotifications } from '../../context/NotificationContext';

// 24-hour real-time telemetry mock data
const HOURLY_UPTIME_DATA = [
  { time: '00:00', uptime: 100.0, ntpDrift: 4.1, serverTemp: 19.1, upsLoad: 42, activeAlerts: 0 },
  { time: '02:00', uptime: 100.0, ntpDrift: 4.3, serverTemp: 19.2, upsLoad: 41, activeAlerts: 0 },
  { time: '04:00', uptime: 99.98, ntpDrift: 5.2, serverTemp: 19.4, upsLoad: 45, activeAlerts: 0 }, // Backup job running
  { time: '06:00', uptime: 100.0, ntpDrift: 4.0, serverTemp: 19.3, upsLoad: 43, activeAlerts: 0 },
  { time: '08:00', uptime: 100.0, ntpDrift: 4.2, serverTemp: 19.5, upsLoad: 46, activeAlerts: 0 }, // Shift pagi start
  { time: '10:00', uptime: 99.97, ntpDrift: 4.5, serverTemp: 19.6, upsLoad: 48, activeAlerts: 0 }, // High batch production
  { time: '12:00', uptime: 100.0, ntpDrift: 4.1, serverTemp: 19.4, upsLoad: 44, activeAlerts: 0 },
  { time: '14:00', uptime: 100.0, ntpDrift: 4.4, serverTemp: 19.5, upsLoad: 47, activeAlerts: 0 },
  { time: '16:00', uptime: 99.99, ntpDrift: 4.6, serverTemp: 19.3, upsLoad: 45, activeAlerts: 0 },
  { time: '18:00', uptime: 100.0, ntpDrift: 4.2, serverTemp: 19.2, upsLoad: 43, activeAlerts: 0 },
  { time: '20:00', uptime: 100.0, ntpDrift: 4.1, serverTemp: 19.2, upsLoad: 42, activeAlerts: 0 },
  { time: '22:00', uptime: 100.0, ntpDrift: 4.3, serverTemp: 19.1, upsLoad: 43, activeAlerts: 0 }
];

// System validation tasks & compliance breakdown
const SYSTEM_VALIDATION_KPIS = [
  { name: 'Werum MES', code: 'MES-01', compliance: 99.2, completedTasks: 48, pendingReview: 2, totalDocs: 50, category: 'Cat 4' },
  { name: 'Waters LIMS', code: 'LIMS-01', compliance: 98.8, completedTasks: 42, pendingReview: 1, totalDocs: 43, category: 'Cat 4' },
  { name: 'Honeywell BMS', code: 'BMS-01', compliance: 99.5, completedTasks: 38, pendingReview: 0, totalDocs: 38, category: 'Cat 4' },
  { name: 'Siemens SCADA', code: 'SCADA-01', compliance: 97.9, completedTasks: 35, pendingReview: 3, totalDocs: 38, category: 'Cat 4' },
  { name: 'SAP S/4HANA', code: 'ERP-01', compliance: 99.0, completedTasks: 54, pendingReview: 1, totalDocs: 55, category: 'Cat 4' },
  { name: 'Rotronic EMS', code: 'EMS-01', compliance: 99.4, completedTasks: 30, pendingReview: 0, totalDocs: 30, category: 'Cat 4' },
  { name: 'LenelS2 ACS', code: 'ACS-01', compliance: 98.5, completedTasks: 26, pendingReview: 1, totalDocs: 27, category: 'Cat 4' },
  { name: 'Milestone CCTV', code: 'CCTV-01', compliance: 97.5, completedTasks: 22, pendingReview: 1, totalDocs: 23, category: 'Cat 3' },
];

// ALCOA+ Radar compliance scores
const ALCOA_RADAR_DATA = [
  { subject: 'Attributable', score: 100, fullMark: 100 },
  { subject: 'Legible', score: 98, fullMark: 100 },
  { subject: 'Contemporaneous', score: 100, fullMark: 100 },
  { subject: 'Original', score: 97, fullMark: 100 },
  { subject: 'Accurate', score: 99, fullMark: 100 },
  { subject: 'Complete', score: 98, fullMark: 100 },
  { subject: 'Consistent', score: 98, fullMark: 100 },
  { subject: 'Enduring', score: 97, fullMark: 100 },
  { subject: 'Available', score: 99, fullMark: 100 },
];

// Open Change Controls breakdown
const CCR_STATUS_BREAKDOWN = [
  { name: 'Testing & Verification', value: 1, color: '#3b82f6' },
  { name: 'Under Risk Assessment', value: 1, color: '#f59e0b' },
  { name: 'Pre-Approved QA', value: 1, color: '#10b981' },
  { name: 'Draft / In Review', value: 1, color: '#8b5cf6' },
];

const CCR_GXP_IMPACT_BREAKDOWN = [
  { name: 'Direct GxP Impact', value: 3, color: '#ef4444' },
  { name: 'Non-GxP / Facility', value: 1, color: '#06b6d4' },
];

interface ComplianceVisualizerProps {
  onOpenExportModal?: () => void;
  onNavigateTab?: (tab: string) => void;
}

export const ComplianceVisualizer: React.FC<ComplianceVisualizerProps> = ({ onOpenExportModal, onNavigateTab }) => {
  const { simulateUptimeDrop, simulateValidationDeadline, notifications } = useNotifications();
  const [timeRange, setTimeRange] = useState<'24h' | '7d' | '30d'>('24h');
  const [metricView, setMetricView] = useState<'all' | 'validation' | 'infrastructure' | 'ccr'>('all');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [liveUptimeData, setLiveUptimeData] = useState(HOURLY_UPTIME_DATA);

  const handleSimulateRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      // Add slight micro variations to reflect live telemetry jitter
      setLiveUptimeData(prev => prev.map(d => ({
        ...d,
        ntpDrift: Number((3.8 + Math.random() * 1.5).toFixed(1)),
        serverTemp: Number((19.2 + Math.random() * 0.4).toFixed(1)),
        upsLoad: Math.floor(43 + Math.random() * 4)
      })));
      setIsRefreshing(false);
    }, 600);
  };

  return (
    <div className="space-y-5 rounded-2xl bg-slate-900 border border-slate-800 p-5 sm:p-6 shadow-xl">
      {/* Visualizer Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-teal-500/10 text-teal-400 border border-teal-500/20">
              <BarChart3 className="w-5 h-5" />
            </span>
            <h3 className="text-base sm:text-lg font-bold text-white tracking-tight">
              Dashboard Visualisasi KPI Kepatuhan &amp; Kesehatan Infrastruktur
            </h3>
            <span className="hidden md:inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              Live Telemetry
            </span>
          </div>
          <p className="text-xs text-slate-400">
            Pelacakan real-time kepatuhan CSV, tugas kualifikasi tertunda, kontrol perubahan terbuka, dan uptime 24/7.
          </p>
        </div>

        {/* Action & Filter Controls */}
        <div className="flex flex-wrap items-center gap-2">
          {/* View Tab Buttons */}
          <div className="flex items-center bg-slate-800 p-1 rounded-lg border border-slate-700 text-xs">
            <button
              onClick={() => setMetricView('all')}
              className={`px-2.5 py-1 rounded-md font-medium transition ${
                metricView === 'all'
                  ? 'bg-teal-500 text-slate-950 font-bold shadow'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Semua KPI
            </button>
            <button
              onClick={() => setMetricView('validation')}
              className={`px-2.5 py-1 rounded-md font-medium transition ${
                metricView === 'validation'
                  ? 'bg-teal-500 text-slate-950 font-bold shadow'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Validasi CSV
            </button>
            <button
              onClick={() => setMetricView('infrastructure')}
              className={`px-2.5 py-1 rounded-md font-medium transition ${
                metricView === 'infrastructure'
                  ? 'bg-teal-500 text-slate-950 font-bold shadow'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Uptime &amp; NTP
            </button>
            <button
              onClick={() => setMetricView('ccr')}
              className={`px-2.5 py-1 rounded-md font-medium transition ${
                metricView === 'ccr'
                  ? 'bg-teal-500 text-slate-950 font-bold shadow'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Change Control
            </button>
          </div>

          {/* Refresh Simulation */}
          <button
            onClick={handleSimulateRefresh}
            disabled={isRefreshing}
            className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 transition"
            title="Perbarui data telemetri real-time"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin text-teal-400' : ''}`} />
          </button>

          {/* Export Report Trigger */}
          {onOpenExportModal && (
            <button
              onClick={onOpenExportModal}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gradient-to-r from-teal-500/20 to-blue-500/20 hover:from-teal-500/30 hover:to-blue-500/30 text-teal-300 border border-teal-500/40 text-xs font-semibold transition shadow-sm"
              title="Ekspor Laporan Audit dalam format PDF resmi atau file CSV"
            >
              <FileSpreadsheet className="w-3.5 h-3.5 text-teal-400" />
              <span>Ekspor PDF/CSV</span>
            </button>
          )}

          {/* Audit Trail Shortcut */}
          {onNavigateTab && (
            <button
              onClick={() => onNavigateTab('audit-trail')}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-teal-500/10 hover:bg-teal-500/20 text-teal-300 border border-teal-500/30 text-xs font-semibold transition shadow-sm"
              title="Buka Log Jejak Audit Kronologis WORM 21 CFR Part 11"
            >
              <FileCheck className="w-3.5 h-3.5 text-teal-400" />
              <span>Jejak Audit (Part 11)</span>
            </button>
          )}
        </div>
      </div>

      {/* KPI Top Ticker Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-3 rounded-xl bg-slate-800/50 border border-slate-700/60">
          <div className="text-[10px] uppercase font-semibold tracking-wider text-slate-400">
            Uptime 24 Jam
          </div>
          <div className="text-xl font-extrabold text-emerald-400 mt-1">99.98%</div>
          <div className="text-[10px] text-slate-400 mt-0.5">SLA Target &gt; 99.95%</div>
        </div>

        <div className="p-3 rounded-xl bg-slate-800/50 border border-slate-700/60">
          <div className="text-[10px] uppercase font-semibold tracking-wider text-slate-400">
            NTP Stratum-1 Drift
          </div>
          <div className="text-xl font-extrabold text-teal-300 mt-1">
            {liveUptimeData[liveUptimeData.length - 1].ntpDrift} ms
          </div>
          <div className="text-[10px] text-emerald-400 mt-0.5">GxP Limit &lt; 50 ms</div>
        </div>

        <div className="p-3 rounded-xl bg-slate-800/50 border border-slate-700/60">
          <div className="text-[10px] uppercase font-semibold tracking-wider text-slate-400">
            Tugas Kualifikasi Tertunda
          </div>
          <div className="text-xl font-extrabold text-amber-300 mt-1">9 Dokumen</div>
          <div className="text-[10px] text-slate-400 mt-0.5">295 dari 304 Selesai</div>
        </div>

        <div className="p-3 rounded-xl bg-slate-800/50 border border-slate-700/60">
          <div className="text-[10px] uppercase font-semibold tracking-wider text-slate-400">
            Kontrol Perubahan Aktif
          </div>
          <div className="text-xl font-extrabold text-blue-400 mt-1">{CHANGE_CONTROLS.length} CCR</div>
          <div className="text-[10px] text-slate-400 mt-0.5">3 Direct GxP Impact</div>
        </div>
      </div>

      {/* Real-Time Notification & SLA Alert Bar */}
      <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2.5">
          <div className="p-1.5 rounded-lg bg-rose-500/10 text-rose-400 border border-rose-500/20 shrink-0">
            <BellRing className="w-4 h-4 animate-bounce" />
          </div>
          <div>
            <div className="font-bold text-white flex items-center gap-2">
              <span>Sistem Peringatan Real-Time Aktif (GxP SLA &amp; Tenggat CSV)</span>
              <span className="text-[10px] font-mono px-2 py-0.2 rounded bg-rose-950 text-rose-300 border border-rose-800">
                Otomatisasi 24/7
              </span>
            </div>
            <p className="text-[11px] text-slate-400 mt-0.5">
              Notifikasi instan dikirimkan jika uptime sistem GxP turun di bawah 99.9% atau tenggat validasi mendekati &lt; 7 hari.
            </p>
          </div>
        </div>

        {/* Live Simulation Action Buttons */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => simulateUptimeDrop('SCADA-01', 99.82)}
            className="px-2.5 py-1.5 rounded-lg bg-rose-950/70 hover:bg-rose-900 text-rose-300 border border-rose-800 text-[11px] font-bold transition flex items-center gap-1.5 shadow-sm"
            title="Simulasikan penurunan uptime sistem SCADA di bawah batas 99.9%"
          >
            <Activity className="w-3.5 h-3.5 text-rose-400" />
            <span>Simulasi Uptime &lt; 99.9%</span>
          </button>

          <button
            onClick={() => simulateValidationDeadline('BMS-01', 4)}
            className="px-2.5 py-1.5 rounded-lg bg-amber-950/70 hover:bg-amber-900 text-amber-300 border border-amber-800 text-[11px] font-bold transition flex items-center gap-1.5 shadow-sm"
            title="Simulasikan peringatan tenggat waktu validasi CSV jatuh tempo dalam 4 hari"
          >
            <Clock className="w-3.5 h-3.5 text-amber-400" />
            <span>Simulasi Tenggat &lt; 7 Hari</span>
          </button>
        </div>
      </div>

      {/* Primary Visualizations Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Chart 1: Real-time Infrastructure Uptime & Stratum-1 NTP Drift (Area/Line) */}
        {(metricView === 'all' || metricView === 'infrastructure') && (
          <div className={`${metricView === 'all' ? 'lg:col-span-8' : 'lg:col-span-12'} p-5 rounded-xl bg-slate-950/60 border border-slate-800/80 space-y-3`}>
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-sm font-bold text-white flex items-center gap-2">
                  <Activity className="w-4 h-4 text-emerald-400" />
                  Tren Ketersediaan Infrastruktur (Uptime) &amp; Sinkronisasi Jam NTP (24 Jam)
                </h4>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  Memantau ketersediaan node virtualisasi VMware HA dan deviasi jam terhadap referensi GPS Stratum-1.
                </p>
              </div>
              <div className="flex items-center gap-3 text-[11px]">
                <span className="flex items-center gap-1.5 text-emerald-400 font-semibold">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span> Uptime (%)
                </span>
                <span className="flex items-center gap-1.5 text-teal-400 font-semibold">
                  <span className="w-2.5 h-2.5 rounded-full bg-teal-400"></span> Drift NTP (ms)
                </span>
              </div>
            </div>

            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height={256}>
                <AreaChart data={liveUptimeData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="uptimeGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.35}/>
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0.0}/>
                    </linearGradient>
                    <linearGradient id="driftGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#14b8a6" stopOpacity={0.4}/>
                      <stop offset="95%" stopColor="#14b8a6" stopOpacity={0.0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                  <XAxis dataKey="time" stroke="#64748b" tick={{ fontSize: 10 }} />
                  <YAxis yAxisId="left" domain={[99.8, 100.05]} stroke="#10b981" tick={{ fontSize: 10 }} />
                  <YAxis yAxisId="right" orientation="right" domain={[0, 10]} stroke="#14b8a6" tick={{ fontSize: 10 }} />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '0.75rem', fontSize: '11px', color: '#f8fafc' }}
                    formatter={(val: any, name: any) => [
                      name === 'uptime' ? `${val}%` : `${val} ms`,
                      name === 'uptime' ? 'Uptime Sistem' : 'Deviasi NTP GPS'
                    ]}
                  />
                  <ReferenceLine yAxisId="right" y={50} stroke="#ef4444" strokeDasharray="4 4" label={{ value: 'GxP Max Limit (50ms)', fill: '#ef4444', fontSize: 10 }} />
                  <Area yAxisId="left" type="monotone" dataKey="uptime" stroke="#10b981" strokeWidth={2} fillOpacity={1} fill="url(#uptimeGrad)" />
                  <Line yAxisId="right" type="monotone" dataKey="ntpDrift" stroke="#14b8a6" strokeWidth={2} dot={{ r: 2.5 }} />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1 border-t border-slate-800/60">
              <span>Batas Deviasi Maksimal: &plusmn;50 milidetik</span>
              <span className="text-emerald-400 font-semibold">Tercapai: Deviasi Maksimal Terdeteksi 5.2 ms (Aman)</span>
            </div>
          </div>
        )}

        {/* Chart 2: ALCOA+ 9-Pillars Compliance Radar (Spider Chart) */}
        {(metricView === 'all' || metricView === 'validation') && (
          <div className={`${metricView === 'all' ? 'lg:col-span-4' : 'lg:col-span-6'} p-5 rounded-xl bg-slate-950/60 border border-slate-800/80 space-y-3`}>
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-bold text-white flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-teal-400" />
                Profil Integritas Data ALCOA+
              </h4>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-teal-950 text-teal-300 border border-teal-800 font-mono">
                98.4% Avg
              </span>
            </div>

            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height={256}>
                <RadarChart outerRadius={80} data={ALCOA_RADAR_DATA}>
                  <PolarGrid stroke="#334155" />
                  <PolarAngleAxis dataKey="subject" tick={{ fill: '#94a3b8', fontSize: 9 }} />
                  <PolarRadiusAxis angle={30} domain={[80, 100]} stroke="#475569" tick={{ fontSize: 8 }} />
                  <Radar name="Skor Kepatuhan (%)" dataKey="score" stroke="#0d9488" fill="#14b8a6" fillOpacity={0.4} />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '0.75rem', fontSize: '11px', color: '#f8fafc' }}
                    formatter={(val: any) => [`${val}%`, 'Tingkat Kepatuhan']}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </div>

            <div className="text-[11px] text-slate-400 text-center">
              Seluruh 9 pilar ALCOA+ telah diaudit dan memenuhi syarat regulasi BPOM &amp; FDA 21 CFR Part 11.
            </div>
          </div>
        )}

        {/* Chart 3: System Validation Tasks & Pending Reviews (Bar Chart) */}
        {(metricView === 'all' || metricView === 'validation') && (
          <div className={`${metricView === 'all' ? 'lg:col-span-8' : 'lg:col-span-12'} p-5 rounded-xl bg-slate-950/60 border border-slate-800/80 space-y-3`}>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h4 className="text-sm font-bold text-white flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-blue-400" />
                  Status Kualifikasi &amp; Dokumen Validasi per Sistem GxP
                </h4>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  Rasio dokumen kualifikasi (URS, DQ, IQ, OQ, PQ, VSR) yang telah disetujui vs ulasan periodik tertunda.
                </p>
              </div>

              <div className="flex items-center gap-3 text-[11px]">
                <span className="flex items-center gap-1.5 text-blue-400 font-semibold">
                  <span className="w-2.5 h-2.5 rounded-full bg-blue-500"></span> Dokumen Selesai
                </span>
                <span className="flex items-center gap-1.5 text-amber-400 font-semibold">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span> Review Tertunda
                </span>
              </div>
            </div>

            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height={256}>
                <BarChart data={SYSTEM_VALIDATION_KPIS} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                  <XAxis dataKey="code" stroke="#64748b" tick={{ fontSize: 10 }} />
                  <YAxis stroke="#64748b" tick={{ fontSize: 10 }} />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '0.75rem', fontSize: '11px', color: '#f8fafc' }}
                    formatter={(val: any, name: any) => [
                      `${val} Dokumen`,
                      name === 'completedTasks' ? 'Selesai & Disetujui' : 'Tertunda Review'
                    ]}
                  />
                  <Bar dataKey="completedTasks" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="pendingReview" fill="#f59e0b" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="flex flex-wrap items-center justify-between text-[11px] text-slate-400 pt-1 border-t border-slate-800/60 gap-2">
              <span>Total Paket Validasi: 304 Dokumen (8 Sistem)</span>
              <span className="text-teal-300 font-semibold">Tingkat Penyelesaian Validasi: 97.04%</span>
            </div>
          </div>
        )}

        {/* Chart 4: Open Change Controls Breakdown (Donut/Pie Chart) */}
        {(metricView === 'all' || metricView === 'ccr') && (
          <div className={`${metricView === 'all' ? 'lg:col-span-4' : 'lg:col-span-6'} p-5 rounded-xl bg-slate-950/60 border border-slate-800/80 space-y-3`}>
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-bold text-white flex items-center gap-2">
                <FileEdit className="w-4 h-4 text-amber-400" />
                Distribusi Kontrol Perubahan (CCR)
              </h4>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-950 text-amber-300 border border-amber-800 font-mono">
                {CHANGE_CONTROLS.length} Aktif
              </span>
            </div>

            <div className="h-56 w-full">
              <ResponsiveContainer width="100%" height={224}>
                <PieChart>
                  <Pie
                    data={CCR_STATUS_BREAKDOWN}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={75}
                    paddingAngle={4}
                    dataKey="value"
                  >
                    {CCR_STATUS_BREAKDOWN.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '0.75rem', fontSize: '11px', color: '#f8fafc' }}
                    formatter={(val: any) => [`${val} CCR`, 'Jumlah']}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="grid grid-cols-2 gap-1.5 text-[10px]">
              {CCR_STATUS_BREAKDOWN.map((item, idx) => (
                <div key={idx} className="flex items-center gap-1.5 text-slate-300">
                  <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: item.color }}></span>
                  <span className="truncate" title={item.name}>{item.name}: <strong>{item.value}</strong></span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Chart 5: Server Room Environmental Telemetry (Line Chart for Temperature & Humidity) */}
        {(metricView === 'all' || metricView === 'infrastructure') && (
          <div className="lg:col-span-12 p-5 rounded-xl bg-slate-950/60 border border-slate-800/80 space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h4 className="text-sm font-bold text-white flex items-center gap-2">
                  <Server className="w-4 h-4 text-purple-400" />
                  Telemetri Lingkungan Ruang Server &amp; Beban Dual UPS (12 Jam Terakhir)
                </h4>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  Memantau kestabilan suhu udara In-Row precision cooling dan distribusi beban trafo UPS Symmetra 40kVA (N+1).
                </p>
              </div>

              <div className="flex items-center gap-3 text-[11px]">
                <span className="flex items-center gap-1.5 text-rose-400 font-semibold">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-500"></span> Suhu (°C)
                </span>
                <span className="flex items-center gap-1.5 text-cyan-400 font-semibold">
                  <span className="w-2.5 h-2.5 rounded-full bg-cyan-500"></span> Beban UPS (%)
                </span>
              </div>
            </div>

            <div className="h-56 w-full">
              <ResponsiveContainer width="100%" height={224}>
                <LineChart data={liveUptimeData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                  <XAxis dataKey="time" stroke="#64748b" tick={{ fontSize: 10 }} />
                  <YAxis yAxisId="temp" domain={[16, 25]} stroke="#f43f5e" tick={{ fontSize: 10 }} />
                  <YAxis yAxisId="ups" orientation="right" domain={[30, 70]} stroke="#06b6d4" tick={{ fontSize: 10 }} />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '0.75rem', fontSize: '11px', color: '#f8fafc' }}
                    formatter={(val: any, name: any) => [
                      name === 'serverTemp' ? `${val} °C` : `${val} %`,
                      name === 'serverTemp' ? 'Suhu Server' : 'Beban UPS'
                    ]}
                  />
                  <ReferenceLine yAxisId="temp" y={21} stroke="#f59e0b" strokeDasharray="3 3" label={{ value: 'Target Max (21°C)', fill: '#f59e0b', fontSize: 10 }} />
                  <ReferenceLine yAxisId="temp" y={24} stroke="#ef4444" strokeDasharray="3 3" label={{ value: 'Critical Limit (24°C)', fill: '#ef4444', fontSize: 10 }} />
                  <Line yAxisId="temp" type="monotone" dataKey="serverTemp" stroke="#f43f5e" strokeWidth={2} dot={{ r: 2 }} />
                  <Line yAxisId="ups" type="monotone" dataKey="upsLoad" stroke="#06b6d4" strokeWidth={2} dot={{ r: 2 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>

            <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1 border-t border-slate-800/60">
              <span>Suhu Rata-rata: 19.3°C • Beban Rata-rata UPS: 44.2%</span>
              <span className="text-emerald-400 font-semibold">Kondisi Lingkungan Prima &amp; Terkalibrasi</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
