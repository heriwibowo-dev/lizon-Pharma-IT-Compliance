import React, { useState } from 'react';
import { 
  RefreshCcw, 
  HardDrive, 
  ShieldCheck, 
  CheckCircle2, 
  AlertTriangle, 
  Clock, 
  Database, 
  Server, 
  Play, 
  RotateCcw,
  Layers
} from 'lucide-react';
import { BACKUP_RECORDS, GXP_SYSTEMS } from '../../data/pharmaData';

export const DisasterRecoveryModule: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'backup_status' | 'rto_rpo_matrix' | 'drp_simulator'>('backup_status');

  // DRP Simulation State
  const [drillStep, setDrillStep] = useState(0);
  const [drillRunning, setDrillRunning] = useState(false);
  const [drillCompleted, setDrillCompleted] = useState(false);

  const drillSteps = [
    { title: '1. Deklarasi Bencana & Isolasi Jaringan', desc: 'Pemutusan uplink switch IDMZ untuk melindungi VLAN OT dari potensi perambatan ancaman.' },
    { title: '2. Verifikasi Integritas Snapshot WORM', desc: 'Pemeriksaan status hash SHA-256 pada NetApp SnapLock Compliance repository.' },
    { title: '3. Provisioning Server Virtual Sandbox', desc: 'Spin-up clone VM Werum MES dan database SQL di VMware Host ESXi-03 yang terisolasi.' },
    { title: '4. Uji Verifikasi Konsistensi Data & NTP', desc: 'Pengecekan record count batch terakhir dan verifikasi jam terhadap NTP Stratum-1.' },
    { title: '5. Tinjauan Bersama QA & Berita Acara Rilis', desc: 'Persetujuan Head of QA dan penerbitan sertifikat pemulihan sistem (Recovery Sign-Off).' }
  ];

  const handleStartDrill = () => {
    setDrillRunning(true);
    setDrillCompleted(false);
    setDrillStep(0);

    let current = 0;
    const interval = setInterval(() => {
      current += 1;
      if (current >= drillSteps.length) {
        clearInterval(interval);
        setDrillRunning(false);
        setDrillCompleted(true);
        setDrillStep(drillSteps.length - 1);
      } else {
        setDrillStep(current);
      }
    }, 1200);
  };

  return (
    <div className="space-y-6">
      {/* Module Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-2xl bg-slate-900 border border-slate-800">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-semibold mb-2">
            TANGGUNG JAWAB 7 • DISASTER RECOVERY &amp; BACKUP
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
            Rencana Pemulihan Bencana (DRP) &amp; Strategi Cadangan 3-2-1-1
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-3xl">
            Mengembangkan, menguji, dan memelihara Disaster Recovery Plan (DRP) serta memastikan seluruh data GxP dicadangkan secara otomatis dan teruji dapat dipulihkan kapan saja.
          </p>
        </div>

        {/* Sub Navigation */}
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setActiveTab('backup_status')}
            className={`px-3 py-2 text-xs font-semibold rounded-lg transition ${
              activeTab === 'backup_status' 
                ? 'bg-cyan-600 text-white shadow-md shadow-cyan-500/20' 
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            Log &amp; Status Backup
          </button>
          <button
            onClick={() => setActiveTab('rto_rpo_matrix')}
            className={`px-3 py-2 text-xs font-semibold rounded-lg transition ${
              activeTab === 'rto_rpo_matrix' 
                ? 'bg-cyan-600 text-white shadow-md shadow-cyan-500/20' 
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            Matriks SLA RTO / RPO
          </button>
          <button
            onClick={() => setActiveTab('drp_simulator')}
            className={`px-3 py-2 text-xs font-semibold rounded-lg transition flex items-center gap-1.5 ${
              activeTab === 'drp_simulator' 
                ? 'bg-cyan-600 text-white shadow-md shadow-cyan-500/20' 
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            <Play className="w-3.5 h-3.5" />
            Simulator Latihan DRP
          </button>
        </div>
      </div>

      {/* 3-2-1-1 Rule Architecture Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-850 to-cyan-950/60 border border-cyan-500/30">
        <h3 className="text-xs uppercase font-bold tracking-wider text-cyan-400 mb-3">
          Implementasi Standar Industri Farmasi: Strategi Cadangan 3-2-1-1
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
          <div className="p-3.5 rounded-xl bg-slate-800/80 border border-slate-700/80 space-y-1">
            <span className="text-xl font-extrabold text-white">3 Salinan Data</span>
            <p className="text-slate-300 text-[11px]">
              1 data produksi aktif, 1 snapshot lokal pada SAN, dan 1 salinan terarsip.
            </p>
          </div>
          <div className="p-3.5 rounded-xl bg-slate-800/80 border border-slate-700/80 space-y-1">
            <span className="text-xl font-extrabold text-teal-300">2 Media Berbeda</span>
            <p className="text-slate-300 text-[11px]">
              Kombinasi All-Flash NVMe SSD Storage dan LTO-9 Magnetic Tape Cartridge.
            </p>
          </div>
          <div className="p-3.5 rounded-xl bg-slate-800/80 border border-slate-700/80 space-y-1">
            <span className="text-xl font-extrabold text-blue-300">1 Lokasi Offsite</span>
            <p className="text-slate-300 text-[11px]">
              Tersimpan di Disaster Recovery Center (DRC) bersertifikasi ISO 27001.
            </p>
          </div>
          <div className="p-3.5 rounded-xl bg-slate-800/80 border border-slate-700/80 space-y-1">
            <span className="text-xl font-extrabold text-purple-300">1 Immutable WORM</span>
            <p className="text-slate-300 text-[11px]">
              NetApp SnapLock Compliance: Data kebal ransomware &amp; tak dapat dihapus.
            </p>
          </div>
        </div>
      </div>

      {/* Tab 1: Backup Records Table */}
      {activeTab === 'backup_status' && (
        <div className="space-y-4">
          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Database className="w-5 h-5 text-cyan-400" />
                Catatan Eksekusi Cadangan &amp; Verifikasi Hash Digital (SOP-IT-001)
              </h3>
              <span className="text-xs text-emerald-400 font-mono">6/6 Job Berhasil</span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-300">
                <thead className="bg-slate-800/80 text-slate-200 uppercase font-mono text-[10px]">
                  <tr>
                    <th className="p-3">Sistem GxP</th>
                    <th className="p-3">Tipe Backup</th>
                    <th className="p-3">Media &amp; Lokasi</th>
                    <th className="p-3">Ukuran (GB)</th>
                    <th className="p-3">Waktu Eksekusi</th>
                    <th className="p-3 text-center">Checksum SHA-256</th>
                    <th className="p-3 text-center">Uji Restore Terakhir</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                  {BACKUP_RECORDS.map((b) => (
                    <tr key={b.id} className="hover:bg-slate-800/40">
                      <td className="p-3 font-semibold text-white">{b.systemName}</td>
                      <td className="p-3">
                        <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700 text-[10px]">
                          {b.backupType}
                        </span>
                      </td>
                      <td className="p-3 text-teal-300">{b.destination} ({b.mediaType.split(' ')[0]})</td>
                      <td className="p-3 font-mono text-slate-200">{b.sizeGb} GB</td>
                      <td className="p-3 font-mono text-[11px] text-slate-400">{b.startTime}</td>
                      <td className="p-3 text-center">
                        <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800 text-[10px] font-bold">
                          Verified Match
                        </span>
                      </td>
                      <td className="p-3 text-center">
                        <span className="px-2 py-0.5 rounded bg-teal-950 text-teal-300 border border-teal-800 text-[10px]">
                          {b.lastRestoreTest} ({b.restoreTestStatus})
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: RTO & RPO Matrix */}
      {activeTab === 'rto_rpo_matrix' && (
        <div className="space-y-4">
          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Clock className="w-5 h-5 text-cyan-400" />
              Target SLA Pemulihan (RTO &amp; RPO Target Matrix)
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed max-w-4xl">
              <strong>RTO (Recovery Time Objective):</strong> Waktu maksimal yang diizinkan untuk memulihkan sistem hingga dapat beroperasi kembali. <br />
              <strong>RPO (Recovery Point Objective):</strong> Batas maksimal kehilangan data historis akibat insiden bencana (ditentukan oleh frekuensi backup &amp; snapshot).
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              {GXP_SYSTEMS.map((sys) => (
                <div key={sys.id} className="p-4 rounded-xl bg-slate-800/60 border border-slate-700/60 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-white">{sys.name}</span>
                    <span className="font-mono text-teal-400 font-bold">{sys.code}</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 p-2.5 rounded bg-slate-900/60 border border-slate-800">
                    <div>
                      <span className="text-slate-400 text-[10px] block">RTO Maksimal:</span>
                      <span className="font-bold text-amber-300 text-sm">{sys.rtoHours} Jam</span>
                    </div>
                    <div>
                      <span className="text-slate-400 text-[10px] block">RPO Maksimal:</span>
                      <span className="font-bold text-cyan-300 text-sm">{sys.rpoHours} Jam ({sys.rpoHours * 60} Menit)</span>
                    </div>
                  </div>
                  <div className="text-[11px] text-slate-400">
                    Strategi: {sys.backupFrequency}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: DRP Simulation Runbook */}
      {activeTab === 'drp_simulator' && (
        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Play className="w-5 h-5 text-cyan-400" />
                Simulasi Latihan Darurat Pemulihan Bencana (DRP Simulation Runbook)
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Skenario Uji: Kegagalan Total Disk Array SAN Primer pada Database Werum MES.
              </p>
            </div>

            <button
              onClick={handleStartDrill}
              disabled={drillRunning}
              className={`px-4 py-2 text-xs font-bold rounded-lg transition flex items-center gap-2 ${
                drillRunning
                  ? 'bg-slate-700 text-slate-400 cursor-not-allowed'
                  : 'bg-cyan-600 hover:bg-cyan-500 text-white shadow-md shadow-cyan-500/20'
              }`}
            >
              <RotateCcw className={`w-4 h-4 ${drillRunning ? 'animate-spin' : ''}`} />
              {drillRunning ? 'Simulasi Berjalan...' : 'Mulai Latihan Simulasi DRP'}
            </button>
          </div>

          {drillCompleted && (
            <div className="p-4 rounded-xl bg-emerald-950/60 border border-emerald-800 text-emerald-300 text-xs flex items-center gap-3">
              <CheckCircle2 className="w-6 h-6 text-emerald-400 shrink-0" />
              <div>
                <strong className="block text-sm font-bold">Simulasi Pemulihan Berhasil Lolos 100%!</strong>
                RTO Aktual Tercapai: <strong>1 Jam 12 Menit</strong> (Di bawah target batas 2 jam). Integritas catatan batch 100% konsisten.
              </div>
            </div>
          )}

          {/* Drill Steps Progress */}
          <div className="space-y-3">
            {drillSteps.map((step, idx) => {
              const isCurrent = drillRunning && drillStep === idx;
              const isPast = drillStep > idx || drillCompleted;

              return (
                <div
                  key={idx}
                  className={`p-4 rounded-xl border transition ${
                    isCurrent
                      ? 'bg-cyan-950/40 border-cyan-500 shadow-md shadow-cyan-500/10'
                      : isPast
                        ? 'bg-slate-800/40 border-emerald-800/60'
                        : 'bg-slate-800/20 border-slate-800 opacity-60'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5 ${
                      isPast
                        ? 'bg-emerald-500 text-slate-950'
                        : isCurrent
                          ? 'bg-cyan-500 text-slate-950 animate-pulse'
                          : 'bg-slate-800 text-slate-400'
                    }`}>
                      {isPast ? '✓' : idx + 1}
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white">{step.title}</h4>
                      <p className="text-xs text-slate-300 mt-1">{step.desc}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
