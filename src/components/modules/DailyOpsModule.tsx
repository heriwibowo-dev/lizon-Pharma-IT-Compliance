import React, { useState } from 'react';
import { 
  ClipboardList, 
  AlertCircle, 
  CheckCircle2, 
  Clock, 
  Copy, 
  Check, 
  PlusCircle, 
  AlertTriangle,
  RotateCcw,
  Sparkles,
  User
} from 'lucide-react';
import { DAILY_ROUNDS, GXP_INCIDENTS } from '../../data/pharmaData';
import { DailyRoundItem, GxpIncident } from '../../types/pharma';

export const DailyOpsModule: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'rounds' | 'incidents' | 'shift_handover'>('rounds');
  const [rounds, setRounds] = useState<DailyRoundItem[]>(DAILY_ROUNDS);
  const [incidents, setIncidents] = useState<GxpIncident[]>(GXP_INCIDENTS);
  
  // Handover note state
  const [shiftName, setShiftName] = useState<'Pagi (07:00 - 15:00)' | 'Siang (15:00 - 23:00)' | 'Malam (23:00 - 07:00)'>('Pagi (07:00 - 15:00)');
  const [engineerName, setEngineerName] = useState('Heri Wibowo (Lead IT Engineer)');
  const [nextEngineer, setNextEngineer] = useState('Budi Santoso (Shift IT Specialist)');
  const [handoverNotes, setHandoverNotes] = useState('Seluruh backup semalam berhasil 100%. Suhu server room stabil 19.4°C. Tidak ada alarm kritis GxP.');
  const [copiedHandover, setCopiedHandover] = useState(false);

  // New incident form
  const [newSystem, setNewSystem] = useState('Werum PAS-X MES');
  const [newDesc, setNewDesc] = useState('');
  const [newSeverity, setNewSeverity] = useState<'Minor' | 'Major' | 'Critical'>('Minor');

  const toggleRoundStatus = (id: string) => {
    setRounds(prev => prev.map(item => {
      if (item.id === id) {
        const nextStatus = item.status === 'Pass' ? 'Attention' : item.status === 'Attention' ? 'Fail' : 'Pass';
        return { ...item, status: nextStatus };
      }
      return item;
    }));
  };

  const handleAddIncident = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDesc) return;

    const newInc: GxpIncident = {
      id: `inc-${Date.now()}`,
      incidentNo: `INC-2026-IT-02${incidents.length + 1}`,
      systemName: newSystem,
      dateTime: new Date().toISOString().replace('T', ' ').substring(0, 19),
      severity: newSeverity,
      gxpDataImpact: newSeverity === 'Critical' ? 'Batch Impact' : 'No Impact',
      rootCauseCategory: 'Hardware',
      description: newDesc,
      immediateAction: 'Investigasi awal dilakukan oleh tim shift IT; status sistem telah distabilkan.',
      capaRequired: newSeverity !== 'Minor',
      capaNumber: newSeverity !== 'Minor' ? `CAPA-2026-04${incidents.length + 2}` : undefined,
      status: 'Under Investigation'
    };

    setIncidents([newInc, ...incidents]);
    setNewDesc('');
  };

  const handleCopyHandover = () => {
    const text = `=== CATATAN SERAH TERIMA SHIFT IT - PT. LIZON PHARMA INDONESIA ===\nTanggal: ${new Date().toLocaleDateString('id-ID')}\nShift: ${shiftName}\nEngineer Shift Selesai: ${engineerName}\nEngineer Shift Penerima: ${nextEngineer}\n\nStatus Fasilitas:\n- Server Room Temp: 19.4°C (Normal)\n- Dual UPS 40kVA: 44% Load, Baterai 100%\n- NTP Stratum-1 Drift: +4.2ms (Terkunci GPS)\n- Status Backup 3-2-1-1: 6/6 Job Berhasil\n\nCatatan Khusus Operasional:\n${handoverNotes}\n==================================================================`;
    navigator.clipboard.writeText(text);
    setCopiedHandover(true);
    setTimeout(() => setCopiedHandover(false), 2000);
  };

  const passCount = rounds.filter(r => r.status === 'Pass').length;
  const roundScore = Math.round((passCount / rounds.length) * 100);

  return (
    <div className="space-y-6">
      {/* Module Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-2xl bg-slate-900 border border-slate-800">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs font-semibold mb-2">
            TANGGUNG JAWAB 8 • OPERASIONAL HARIAN &amp; TUGAS MANAJEMEN
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
            Ronde Harian, Penanganan Insiden GxP, &amp; Serah Terima Shift
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-3xl">
            Melaksanakan tugas harian pemeliharaan fasilitas IT pabrik baru: inspeksi ruang server fisik, pemantauan anomali sistem GxP, dan koordinasi shift 24/7.
          </p>
        </div>

        {/* Sub Navigation */}
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setActiveTab('rounds')}
            className={`px-3 py-2 text-xs font-semibold rounded-lg transition ${
              activeTab === 'rounds' 
                ? 'bg-rose-600 text-white shadow-md shadow-rose-500/20' 
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            Checklist Ronde Server ({roundScore}%)
          </button>
          <button
            onClick={() => setActiveTab('incidents')}
            className={`px-3 py-2 text-xs font-semibold rounded-lg transition ${
              activeTab === 'incidents' 
                ? 'bg-rose-600 text-white shadow-md shadow-rose-500/20' 
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            Log Insiden / Deviasi ({incidents.length})
          </button>
          <button
            onClick={() => setActiveTab('shift_handover')}
            className={`px-3 py-2 text-xs font-semibold rounded-lg transition ${
              activeTab === 'shift_handover' 
                ? 'bg-rose-600 text-white shadow-md shadow-rose-500/20' 
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            Serah Terima Shift IT
          </button>
        </div>
      </div>

      {/* Tab 1: Daily Rounds Checklist */}
      {activeTab === 'rounds' && (
        <div className="space-y-4">
          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
              <div>
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <ClipboardList className="w-5 h-5 text-rose-400" />
                  Checklist Ronde Fisik &amp; Logis Ruang Server (Ronde Pukul 08:00 WIB)
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Klik tombol status untuk mengubah verifikasi (Pass / Perhatian / Gagal).
                </p>
              </div>

              <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded border border-emerald-500/30">
                {passCount} dari {rounds.length} Normal ({roundScore}%)
              </span>
            </div>

            <div className="space-y-3">
              {rounds.map((item) => (
                <div
                  key={item.id}
                  className="p-4 rounded-xl bg-slate-800/60 border border-slate-700/60 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-900 text-slate-400 border border-slate-700">
                        {item.category}
                      </span>
                      <h4 className="text-sm font-bold text-white">{item.item}</h4>
                    </div>
                    <div className="text-slate-300">
                      Kriteria Target: <span className="text-teal-300">{item.targetCriteria}</span>
                    </div>
                    <div className="text-slate-400 text-[11px]">
                      Nilai Aktual: <strong className="text-slate-200">{item.currentValue}</strong> (Diperiksa pukul {item.checkedTime})
                    </div>
                  </div>

                  <button
                    onClick={() => toggleRoundStatus(item.id)}
                    className={`px-4 py-2 rounded-lg font-bold text-xs transition border shrink-0 ${
                      item.status === 'Pass'
                        ? 'bg-emerald-950/80 text-emerald-300 border-emerald-700 hover:bg-emerald-900'
                        : item.status === 'Attention'
                          ? 'bg-amber-950/80 text-amber-300 border-amber-700 hover:bg-amber-900'
                          : 'bg-rose-950/80 text-rose-300 border-rose-700 hover:bg-rose-900'
                    }`}
                  >
                    {item.status === 'Pass' ? '✓ NORMAL (PASS)' : item.status === 'Attention' ? '⚠️ PERHATIAN' : '✕ GAGAL (FAIL)'}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Incidents / Deviations Log */}
      {activeTab === 'incidents' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Incident Log List */}
          <div className="lg:col-span-2 space-y-4">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-amber-400" />
              Catatan Insiden TI &amp; Deviasi Terkait GxP
            </h3>

            <div className="space-y-3">
              {incidents.map((inc) => (
                <div key={inc.id} className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2 text-xs">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <span className="font-mono text-xs font-bold text-rose-400 bg-rose-500/10 px-2 py-0.5 rounded border border-rose-500/20">
                        {inc.incidentNo}
                      </span>
                      <h4 className="text-sm font-bold text-white mt-1">{inc.systemName}</h4>
                      <p className="text-[10px] text-slate-400">{inc.dateTime}</p>
                    </div>

                    <span className={`text-[10px] px-2 py-0.5 rounded font-bold ${
                      inc.status === 'Closed by QA'
                        ? 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                        : 'bg-amber-950 text-amber-300 border border-amber-800'
                    }`}>
                      {inc.status}
                    </span>
                  </div>

                  <p className="text-slate-200 leading-relaxed bg-slate-800/50 p-2.5 rounded border border-slate-700/50">
                    <strong>Kronologi:</strong> {inc.description}
                  </p>

                  <div className="text-slate-300">
                    <strong>Tindakan Segera:</strong> {inc.immediateAction}
                  </div>

                  {inc.capaRequired && (
                    <div className="text-[11px] text-teal-300 font-semibold">
                      Tindakan Korektif: {inc.capaNumber} (Dalam pemantauan QA)
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Form Log New Incident */}
          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
            <h4 className="text-xs uppercase font-bold tracking-wider text-rose-400 flex items-center gap-1.5">
              <PlusCircle className="w-4 h-4" />
              Catat Insiden / Anomali Baru
            </h4>

            <form onSubmit={handleAddIncident} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Sistem Terkait:</label>
                <select
                  value={newSystem}
                  onChange={(e) => setNewSystem(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-1 focus:ring-rose-500"
                >
                  <option value="Werum PAS-X MES">Werum PAS-X MES</option>
                  <option value="Waters Empower HPLC CDS">Waters Empower HPLC CDS</option>
                  <option value="Siemens SCADA WFI/PW">Siemens SCADA WFI/PW</option>
                  <option value="Honeywell EBI BMS">Honeywell EBI BMS</option>
                  <option value="Rotronic RMS EMS">Rotronic RMS EMS</option>
                  <option value="VMware Cluster ESXi">VMware Cluster ESXi</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Tingkat Keparahan:</label>
                <select
                  value={newSeverity}
                  onChange={(e) => setNewSeverity(e.target.value as any)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-1 focus:ring-rose-500"
                >
                  <option value="Minor">Minor (Tidak ada kehilangan data GxP)</option>
                  <option value="Major">Major (Gangguan intermiten pada lini produksi)</option>
                  <option value="Critical">Critical (Potensi dampak batch produk)</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Kronologi Kejadian:</label>
                <textarea
                  rows={3}
                  required
                  placeholder="Jelaskan anomali, kode error, dan dampaknya..."
                  value={newDesc}
                  onChange={(e) => setNewDesc(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-1 focus:ring-rose-500"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded-lg bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs transition shadow-md shadow-rose-500/20"
              >
                Simpan Laporan Insiden TI
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Tab 3: Shift Handover Notes */}
      {activeTab === 'shift_handover' && (
        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Clock className="w-5 h-5 text-rose-400" />
                Formulir Berita Acara Serah Terima Shift IT Engineer (24/7 Support)
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Memastikan kesinambungan monitoring sistem GxP antar tim rekayasa TI pabrik.
              </p>
            </div>

            <button
              onClick={handleCopyHandover}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition"
            >
              {copiedHandover ? (
                <>
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span>Catatan Tersalin!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 text-slate-400" />
                  <span>Salin Catatan Shift</span>
                </>
              )}
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div>
              <label className="block text-slate-300 font-semibold mb-1">Pilihan Shift:</label>
              <select
                value={shiftName}
                onChange={(e) => setShiftName(e.target.value as any)}
                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-1 focus:ring-rose-500"
              >
                <option value="Pagi (07:00 - 15:00)">Pagi (07:00 - 15:00)</option>
                <option value="Siang (15:00 - 23:00)">Siang (15:00 - 23:00)</option>
                <option value="Malam (23:00 - 07:00)">Malam (23:00 - 07:00)</option>
              </select>
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1">Engineer Shift Selesai:</label>
              <input
                type="text"
                value={engineerName}
                onChange={(e) => setEngineerName(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-1 focus:ring-rose-500"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1">Engineer Shift Penerima:</label>
              <input
                type="text"
                value={nextEngineer}
                onChange={(e) => setNextEngineer(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-1 focus:ring-rose-500"
              />
            </div>
          </div>

          <div className="text-xs">
            <label className="block text-slate-300 font-semibold mb-1">
              Catatan Khusus Operasional / Pekerjaan dalam Proses:
            </label>
            <textarea
              rows={3}
              value={handoverNotes}
              onChange={(e) => setHandoverNotes(e.target.value)}
              className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-1 focus:ring-rose-500"
            />
          </div>

          <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 text-xs font-mono text-slate-300 space-y-1">
            <div className="text-teal-400 font-bold">=== PREVIEW CATATAN SERAH TERIMA SHIFT ===</div>
            <div>Shift: {shiftName}</div>
            <div>Dari: {engineerName} &rarr; Kepada: {nextEngineer}</div>
            <div>Pabrik: PT. LIZON Pharma Indonesia (Cikarang Plant 1)</div>
            <div className="mt-2 text-slate-200">{handoverNotes}</div>
          </div>
        </div>
      )}
    </div>
  );
};
