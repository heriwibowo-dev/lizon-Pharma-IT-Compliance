import React, { useState } from 'react';
import { 
  Server, 
  Cpu, 
  HardDrive, 
  Zap, 
  ShieldAlert, 
  Thermometer, 
  Droplets, 
  Wifi, 
  Layers, 
  Activity, 
  Lock,
  CheckCircle2,
  AlertTriangle
} from 'lucide-react';
import { PURDUE_NODES } from '../../data/pharmaData';

export const InfrastructureModule: React.FC = () => {
  const [selectedLevel, setSelectedLevel] = useState<string>('ALL');

  const filteredNodes = PURDUE_NODES.filter(node => {
    if (selectedLevel === 'ALL') return true;
    return node.level === selectedLevel;
  });

  return (
    <div className="space-y-6">
      {/* Module Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-2xl bg-slate-900 border border-slate-800">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 text-xs font-semibold mb-2">
            TANGGUNG JAWAB 3 • INFRASTRUKTUR TI &amp; OT 24/7
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
            Manajemen Infrastruktur Pabrik Farmasi (Purdue ISA-95 Model)
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-3xl">
            Mengelola server fisik &amp; virtual (VMware HA), jaringan industri terisolasi, penyimpanan SAN WORM, dan sistem keamanan siber 24/7 untuk menjamin ketersediaan tinggi manufaktur.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs text-slate-300 bg-slate-800/80 px-3.5 py-2 rounded-xl border border-slate-700">
          <Activity className="w-4 h-4 text-emerald-400 animate-pulse" />
          <span>SLA Uptime: <strong className="text-white">99.98%</strong></span>
        </div>
      </div>

      {/* Environmental & Hardware Live Telemetry */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Telemetry 1: Server Room Temp */}
        <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400">Suhu Ruang Server Utama</span>
            <Thermometer className="w-4 h-4 text-teal-400" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-white">19.4°C</span>
            <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded">
              Ideal (18-21°C)
            </span>
          </div>
          <p className="text-[11px] text-slate-400">
            In-Row Precision AC Unit 1 &amp; Unit 2 beroperasi normal N+1.
          </p>
        </div>

        {/* Telemetry 2: Humidity */}
        <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400">Kelembaban Relatif (RH)</span>
            <Droplets className="w-4 h-4 text-blue-400" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-white">48.2%</span>
            <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded">
              Non-Kondensasi
            </span>
          </div>
          <p className="text-[11px] text-slate-400">
            Target parameter: 45% - 55% RH (sensor Vaisala terkalibrasi).
          </p>
        </div>

        {/* Telemetry 3: Power & Dual UPS */}
        <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400">Dual UPS Symmetra 40kVA</span>
            <Zap className="w-4 h-4 text-amber-400" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-white">44% Load</span>
            <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded">
              Runtime 48 Min
            </span>
          </div>
          <p className="text-[11px] text-slate-400">
            Dual feed A+B redundansi penuh dari trafo gardu PLN &amp; Genset.
          </p>
        </div>

        {/* Telemetry 4: Clean Agent Fire Suppression */}
        <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400">Proteksi Kebakaran Gas</span>
            <ShieldAlert className="w-4 h-4 text-purple-400" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-white">FM-200</span>
            <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded">
              Armed &amp; Ready
            </span>
          </div>
          <p className="text-[11px] text-slate-400">
            Sistem pemadam gas bersih tanpa residu cair untuk melindungi server.
          </p>
        </div>
      </div>

      {/* Purdue Model Visual Architecture */}
      <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Layers className="w-5 h-5 text-indigo-400" />
              Arsitektur Segmentasi Jaringan Industri (ISA-95 Purdue Model)
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Pemisahan tegas zona keamanan antara Lantai Produksi (OT) dan Jaringan Kantor (IT) melalui Industrial DMZ.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400 font-semibold">Tampilkan:</span>
            <select
              value={selectedLevel}
              onChange={(e) => setSelectedLevel(e.target.value)}
              className="bg-slate-800 border border-slate-700 text-slate-200 text-xs rounded-lg px-2.5 py-1.5 focus:outline-none focus:ring-1 focus:ring-teal-500"
            >
              <option value="ALL">Semua Level (L0 - L4)</option>
              <option value="Level 0">Level 0: Sensor &amp; Actuators</option>
              <option value="Level 1">Level 1: Industrial PLC Control</option>
              <option value="Level 2">Level 2: Supervisory HMI</option>
              <option value="Level 3">Level 3: Operations (MES/BMS)</option>
              <option value="Level 3.5">Level 3.5: Industrial DMZ (IDMZ)</option>
              <option value="Level 4">Level 4: Enterprise GxP Core</option>
            </select>
          </div>
        </div>

        {/* Purdue Nodes Grid */}
        <div className="space-y-3">
          {filteredNodes.map((node) => (
            <div
              key={node.id}
              className={`p-4 rounded-xl border transition ${
                node.level === 'Level 3.5'
                  ? 'bg-gradient-to-r from-slate-900 via-amber-950/20 to-slate-900 border-amber-500/40 shadow-md'
                  : 'bg-slate-800/50 border-slate-700/60 hover:border-slate-600'
              }`}
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded ${
                      node.level === 'Level 3.5'
                        ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                        : 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30'
                    }`}>
                      {node.level}: {node.levelName}
                    </span>
                    <h4 className="text-sm font-bold text-white">{node.name}</h4>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">{node.description}</p>
                </div>

                <div className="flex flex-wrap items-center gap-2 text-[11px] shrink-0">
                  <span className="px-2 py-1 rounded bg-slate-900 text-slate-300 border border-slate-700 font-mono">
                    {node.ipAddress}
                  </span>
                  <span className="px-2 py-1 rounded bg-slate-900 text-teal-300 border border-slate-700">
                    {node.redundancy}
                  </span>
                  <span className="px-2 py-1 rounded bg-emerald-950 text-emerald-300 border border-emerald-800">
                    {node.status}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Virtualization & Storage Infrastructure */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* VMware Cluster Status */}
        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Cpu className="w-4 h-4 text-teal-400" />
              Cluster Virtualisasi VMware vSphere 8 HA (N+1)
            </h3>
            <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800">
              High Availability Aktif
            </span>
          </div>

          <div className="space-y-3 text-xs">
            <div className="p-3 rounded-lg bg-slate-800/60 border border-slate-700/60 flex items-center justify-between">
              <div>
                <div className="font-semibold text-slate-200">Host ESXi-01 (Dell PowerEdge R760)</div>
                <div className="text-[10px] text-slate-400">VM: MES PAS-X, BMS Core, DB Primer</div>
              </div>
              <div className="text-right">
                <span className="text-teal-300 font-mono font-bold">CPU: 32% • RAM: 58%</span>
                <div className="text-[10px] text-emerald-400">Normal</div>
              </div>
            </div>

            <div className="p-3 rounded-lg bg-slate-800/60 border border-slate-700/60 flex items-center justify-between">
              <div>
                <div className="font-semibold text-slate-200">Host ESXi-02 (Dell PowerEdge R760)</div>
                <div className="text-[10px] text-slate-400">VM: LabVantage LIMS, EMS Historian, SCADA</div>
              </div>
              <div className="text-right">
                <span className="text-teal-300 font-mono font-bold">CPU: 28% • RAM: 52%</span>
                <div className="text-[10px] text-emerald-400">Normal</div>
              </div>
            </div>

            <div className="p-3 rounded-lg bg-slate-800/60 border border-slate-700/60 flex items-center justify-between">
              <div>
                <div className="font-semibold text-slate-200">Host ESXi-03 (Dell PowerEdge R760)</div>
                <div className="text-[10px] text-slate-400">VM: Domain Controller, Jump Host, Failover Node</div>
              </div>
              <div className="text-right">
                <span className="text-teal-300 font-mono font-bold">CPU: 18% • RAM: 34%</span>
                <div className="text-[10px] text-emerald-400">Siap Failover</div>
              </div>
            </div>
          </div>
        </div>

        {/* SAN Storage WORM SnapLock */}
        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <HardDrive className="w-4 h-4 text-purple-400" />
              Penyimpanan SAN NetApp dengan Proteksi WORM
            </h3>
            <span className="text-[10px] px-2 py-0.5 rounded bg-purple-950 text-purple-300 border border-purple-800">
              SnapLock Compliance
            </span>
          </div>

          <div className="space-y-3 text-xs">
            <div className="p-3 rounded-lg bg-slate-800/60 border border-slate-700/60 space-y-1">
              <div className="flex justify-between font-semibold">
                <span className="text-slate-200">Volume LUN GxP Audit Trails (WORM Immutable)</span>
                <span className="text-purple-300 font-mono">1.8 TB / 4.0 TB (45%)</span>
              </div>
              <p className="text-[11px] text-slate-400">
                Data jejak audit terkunci secara permanen (Write Once, Read Many). Tidak dapat dimodifikasi atau dihapus bahkan oleh akun admin root selama periode retensi 10 tahun.
              </p>
            </div>

            <div className="p-3 rounded-lg bg-slate-800/60 border border-slate-700/60 space-y-1">
              <div className="flex justify-between font-semibold">
                <span className="text-slate-200">Volume LUN MES EBR &amp; LIMS Production DB</span>
                <span className="text-teal-300 font-mono">3.4 TB / 8.0 TB (42%)</span>
              </div>
              <p className="text-[11px] text-slate-400">
                All-Flash NVMe SSD array dengan snapshot harian terenkripsi AES-256 dan replikasi cermin ke DR Center.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
