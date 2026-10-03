import React, { useState } from 'react';
import { 
  Database, 
  ShieldCheck, 
  Clock, 
  FileCheck, 
  AlertTriangle, 
  CheckCircle2, 
  HelpCircle, 
  Layers, 
  Printer, 
  RefreshCw,
  Lock,
  Search
} from 'lucide-react';
import { ALCOA_PRINCIPLES, ALCOA_AUDIT_QUESTIONS } from '../../data/pharmaData';

export const DataIntegrityAlcoaModule: React.FC = () => {
  const [activeSubTab, setActiveSubTab] = useState<'pillars' | 'audit_tool' | 'atr_matrix' | 'ntp_sync'>('pillars');
  const [selectedPillar, setSelectedPillar] = useState<string>(ALCOA_PRINCIPLES[0].id);

  // Audit Tool state
  const [auditAnswers, setAuditAnswers] = useState<Record<string, number>>({
    'q-1': 10,
    'q-2': 10,
    'q-3': 10,
    'q-4': 10,
    'q-5': 10,
    'q-6': 10,
    'q-7': 10,
    'q-8': 10
  });

  const handleSelectOption = (questionId: string, score: number) => {
    setAuditAnswers(prev => ({
      ...prev,
      [questionId]: score
    }));
  };

  // Calculate audit score
  const totalQuestions = ALCOA_AUDIT_QUESTIONS.length;
  const maxPossibleScore = totalQuestions * 10;
  const currentTotalScore = Object.values(auditAnswers).reduce((a, b) => a + b, 0);
  const compliancePercentage = Math.round((currentTotalScore / maxPossibleScore) * 100);

  // Find findings/gaps
  const identifiedGaps = ALCOA_AUDIT_QUESTIONS.map(q => {
    const selectedScore = auditAnswers[q.id] ?? 10;
    const option = q.options.find(o => o.score === selectedScore);
    if (selectedScore < 10 && option) {
      return {
        questionId: q.id,
        category: q.category,
        clause: q.regulatoryClause,
        findingType: option.findingType || 'Major',
        remediation: option.remediation || 'Terapkan kontrol mitigasi teknis dan perbarui SOP.'
      };
    }
    return null;
  }).filter(Boolean);

  const activePillarData = ALCOA_PRINCIPLES.find(p => p.id === selectedPillar) || ALCOA_PRINCIPLES[0];

  return (
    <div className="space-y-6">
      {/* Module Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-2xl bg-slate-900 border border-slate-800">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/30 text-teal-400 text-xs font-semibold mb-2">
            TANGGUNG JAWAB 2 • DATA INTEGRITY &amp; 21 CFR PART 11
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
            Manajemen Integritas Data (ALCOA+ &amp; Regulasi Catatan Elektronik)
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-3xl">
            Menerapkan dan memelihara kontrol integritas data GxP sesuai prinsip ALCOA+, regulasi FDA 21 CFR Part 11, EU Annex 11, dan pedoman PIC/S PI-041.
          </p>
        </div>

        {/* Sub Navigation */}
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setActiveSubTab('pillars')}
            className={`px-3 py-2 text-xs font-semibold rounded-lg transition ${
              activeSubTab === 'pillars' 
                ? 'bg-teal-600 text-white shadow-md shadow-teal-500/20' 
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            9 Pilar ALCOA+
          </button>
          <button
            onClick={() => setActiveSubTab('audit_tool')}
            className={`px-3 py-2 text-xs font-semibold rounded-lg transition flex items-center gap-1.5 ${
              activeSubTab === 'audit_tool' 
                ? 'bg-teal-600 text-white shadow-md shadow-teal-500/20' 
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            Evaluator Audit Mandiri ({compliancePercentage}%)
          </button>
          <button
            onClick={() => setActiveSubTab('atr_matrix')}
            className={`px-3 py-2 text-xs font-semibold rounded-lg transition ${
              activeSubTab === 'atr_matrix' 
                ? 'bg-teal-600 text-white shadow-md shadow-teal-500/20' 
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            Tinjauan Jejak Audit (ATR)
          </button>
          <button
            onClick={() => setActiveSubTab('ntp_sync')}
            className={`px-3 py-2 text-xs font-semibold rounded-lg transition ${
              activeSubTab === 'ntp_sync' 
                ? 'bg-teal-600 text-white shadow-md shadow-teal-500/20' 
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            Sinkronisasi Jam NTP
          </button>
        </div>
      </div>

      {/* Subtab 1: 9 Pillars of ALCOA+ */}
      {activeSubTab === 'pillars' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Pillar Selector Buttons */}
          <div className="lg:col-span-4 space-y-2">
            <h3 className="text-xs uppercase font-bold tracking-wider text-slate-400 mb-2">
              Pilih Prinsip ALCOA+
            </h3>
            <div className="space-y-1.5">
              {ALCOA_PRINCIPLES.map((pillar) => (
                <button
                  key={pillar.id}
                  onClick={() => setSelectedPillar(pillar.id)}
                  className={`w-full p-3 rounded-xl text-left border transition flex items-center justify-between ${
                    selectedPillar === pillar.id
                      ? 'bg-teal-500/15 border-teal-500 text-teal-200 shadow-md'
                      : 'bg-slate-900/80 border-slate-800 text-slate-400 hover:bg-slate-800'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className={`w-7 h-7 rounded-lg flex items-center justify-center font-bold text-xs ${
                      selectedPillar === pillar.id
                        ? 'bg-teal-500 text-slate-950 font-extrabold'
                        : 'bg-slate-800 text-teal-400'
                    }`}>
                      {pillar.letter}
                    </span>
                    <div>
                      <div className="font-bold text-sm text-slate-200">{pillar.name}</div>
                      <div className="text-[10px] text-slate-400">{pillar.regulatoryReference.split(',')[0]}</div>
                    </div>
                  </div>
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800">
                    Compliant
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Pillar Detailed View */}
          <div className="lg:col-span-8 p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-5">
            <div className="flex items-start justify-between gap-4 pb-4 border-b border-slate-800">
              <div>
                <span className="text-xs font-mono font-bold text-teal-400 bg-teal-500/10 px-2 py-0.5 rounded border border-teal-500/20">
                  Prinsip ALCOA+: {activePillarData.letter}
                </span>
                <h3 className="text-xl font-bold text-white mt-1">{activePillarData.fullName}</h3>
                <p className="text-xs text-slate-400 mt-1">{activePillarData.regulatoryReference}</p>
              </div>
              <div className="p-2 rounded-xl bg-teal-500/10 text-teal-400">
                <ShieldCheck className="w-6 h-6" />
              </div>
            </div>

            <div className="space-y-4 text-xs">
              <div className="p-4 rounded-xl bg-slate-800/60 border border-slate-700/60">
                <span className="text-slate-400 font-semibold uppercase tracking-wider block mb-1">
                  Definisi Regulasi:
                </span>
                <p className="text-slate-200 text-sm leading-relaxed">
                  {activePillarData.description}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-700/50 space-y-1.5">
                  <span className="text-teal-400 font-bold block flex items-center gap-1.5">
                    <Database className="w-4 h-4" />
                    Penerapan di Pabrik Farmasi:
                  </span>
                  <p className="text-slate-300 leading-relaxed">
                    {activePillarData.pharmaApplication}
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-700/50 space-y-1.5">
                  <span className="text-blue-400 font-bold block flex items-center gap-1.5">
                    <Lock className="w-4 h-4" />
                    Kontrol Teknis IT Engineer:
                  </span>
                  <p className="text-slate-300 leading-relaxed">
                    {activePillarData.itTechnicalControl}
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-800/70 border border-slate-700/70 space-y-2">
                <span className="text-slate-200 font-semibold block">
                  Titik Pemeriksaan Kritis (Critical Checkpoints Audit):
                </span>
                <div className="space-y-1.5">
                  {activePillarData.criticalCheckpoints.map((pt, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-slate-300">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                      <span>{pt}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Subtab 2: Interactive Audit Evaluator */}
      {activeSubTab === 'audit_tool' && (
        <div className="space-y-6">
          {/* Score Header */}
          <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-850 to-teal-950/70 border border-teal-500/30 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-xl">
            <div className="space-y-1">
              <span className="text-xs uppercase font-bold tracking-wider text-teal-400">
                Hasil Asesmen Kepatuhan ALCOA+ &amp; 21 CFR Part 11
              </span>
              <h3 className="text-xl font-bold text-white">
                Indeks Kesiapan Integritas Data Pabrik Cikarang
              </h3>
              <p className="text-xs text-slate-300">
                Berdasarkan 8 pertanyaan pengujian mandiri kepatuhan teknis infrastruktur dan aplikasi GxP.
              </p>
            </div>

            <div className="flex items-center gap-5">
              <div className="text-right">
                <div className="text-3xl font-extrabold text-teal-300">{compliancePercentage}%</div>
                <div className="text-[11px] font-semibold text-emerald-400">
                  {compliancePercentage >= 90 ? 'Status: Prima (Audit-Ready)' : compliancePercentage >= 70 ? 'Status: Perlu Tindakan Segera' : 'Status: Kritis (Risiko Temuan BPOM)'}
                </div>
              </div>
              <div className="w-16 h-16 rounded-full border-4 border-teal-500/20 border-t-teal-400 flex items-center justify-center font-extrabold text-white text-sm bg-slate-900">
                {currentTotalScore}/{maxPossibleScore}
              </div>
            </div>
          </div>

          {/* Gaps Banner if any */}
          {identifiedGaps.length > 0 && (
            <div className="p-4 rounded-xl bg-amber-950/40 border border-amber-600/50 space-y-2">
              <div className="flex items-center gap-2 text-amber-300 font-bold text-xs uppercase tracking-wider">
                <AlertTriangle className="w-4 h-4 text-amber-400" />
                Ditemukan {identifiedGaps.length} Celah Kepatuhan yang Memerlukan Tindakan Korektif (CAPA):
              </div>
              <div className="space-y-2 text-xs">
                {identifiedGaps.map((gap, idx) => (
                  <div key={idx} className="p-2.5 rounded bg-slate-900/60 border border-slate-800 text-slate-300 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <strong className="text-white">{gap?.category}:</strong> {gap?.remediation}
                    </div>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-rose-950 text-rose-300 border border-rose-800 shrink-0">
                      Temuan {gap?.findingType}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Questions List */}
          <div className="space-y-4">
            {ALCOA_AUDIT_QUESTIONS.map((q, idx) => (
              <div key={q.id} className="p-5 rounded-xl bg-slate-900 border border-slate-800 space-y-3">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono font-bold text-teal-400 bg-teal-500/10 px-2 py-0.5 rounded">
                        Pertanyaan {idx + 1}
                      </span>
                      <span className="text-xs font-semibold text-slate-400">{q.category}</span>
                    </div>
                    <h4 className="text-sm font-bold text-white mt-1.5">{q.question}</h4>
                    <p className="text-[11px] text-slate-400 mt-0.5">
                      Rujukan Klausul: <span className="text-teal-300">{q.regulatoryClause}</span> • Cakupan: <span className="text-slate-300">{q.systemScope}</span>
                    </p>
                  </div>
                </div>

                <div className="space-y-2 pt-2 border-t border-slate-800">
                  {q.options.map((opt, oIdx) => {
                    const isSelected = auditAnswers[q.id] === opt.score;
                    return (
                      <button
                        key={oIdx}
                        onClick={() => handleSelectOption(q.id, opt.score)}
                        className={`w-full p-3 rounded-lg text-left text-xs border transition flex items-center justify-between ${
                          isSelected
                            ? 'bg-teal-500/15 border-teal-500 text-teal-200 font-semibold'
                            : 'bg-slate-800/50 border-slate-700/50 text-slate-300 hover:bg-slate-800'
                        }`}
                      >
                        <span>{opt.label}</span>
                        <span className={`text-[10px] font-mono px-2 py-0.5 rounded ${
                          opt.score === 10 
                            ? 'bg-emerald-950 text-emerald-300 border border-emerald-800' 
                            : opt.score === 5 
                              ? 'bg-amber-950 text-amber-300 border border-amber-800' 
                              : 'bg-rose-950 text-rose-300 border border-rose-800'
                        }`}>
                          {opt.score} Pts
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Subtab 3: Audit Trail Review Matrix */}
      {activeSubTab === 'atr_matrix' && (
        <div className="space-y-4">
          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800">
            <h3 className="text-base font-bold text-white mb-2 flex items-center gap-2">
              <FileCheck className="w-5 h-5 text-teal-400" />
              Matriks Tinjauan Jejak Audit (Audit Trail Review - SOP-IT-002)
            </h3>
            <p className="text-xs text-slate-300 max-w-3xl mb-4 leading-relaxed">
              Tinjauan jejak audit dilakukan berlapis: Level 1 (Tinjauan per batch produk oleh Analis/Supervisor sebelum pelulusan) dan Level 2 (Tinjauan periodik sistemik oleh QA &amp; IT).
            </p>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-300">
                <thead className="bg-slate-800/80 text-slate-200 uppercase font-mono text-[10px]">
                  <tr>
                    <th className="p-3">Sistem GxP</th>
                    <th className="p-3">Frekuensi Review</th>
                    <th className="p-3">Parameter &amp; Event Kritis yang Ditinjau</th>
                    <th className="p-3">Tanggung Jawab</th>
                    <th className="p-3">Status Terkini</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                  <tr className="hover:bg-slate-800/40">
                    <td className="p-3 font-semibold text-white">Werum PAS-X MES</td>
                    <td className="p-3 text-amber-300 font-mono">Setiap Batch</td>
                    <td className="p-3">Koreksi penimbangan manual, pembatalan langkah formulasi, override alarm suhu</td>
                    <td className="p-3">Supervisor Produksi &amp; QA Lead</td>
                    <td className="p-3">
                      <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800 text-[10px]">
                        Up-to-Date (Batch #082)
                      </span>
                    </td>
                  </tr>
                  <tr className="hover:bg-slate-800/40">
                    <td className="p-3 font-semibold text-white">Waters Empower HPLC CDS</td>
                    <td className="p-3 text-amber-300 font-mono">Setiap Batch Test</td>
                    <td className="p-3">Re-integrasi kromatogram manual, injeksi dibatalkan, modifikasi parameter kalibrasi</td>
                    <td className="p-3">QC Supervisor &amp; QA Reviewer</td>
                    <td className="p-3">
                      <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800 text-[10px]">
                        Up-to-Date
                      </span>
                    </td>
                  </tr>
                  <tr className="hover:bg-slate-800/40">
                    <td className="p-3 font-semibold text-white">Siemens SCADA WFI/PW</td>
                    <td className="p-3 text-blue-300 font-mono">Bulanan</td>
                    <td className="p-3">Pengubahan setpoint konduktivitas/suhu loop, bypass pompa, alarm deviasi</td>
                    <td className="p-3">IT Engineer &amp; Engineering QA</td>
                    <td className="p-3">
                      <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800 text-[10px]">
                        Tinjauan September Selesai
                      </span>
                    </td>
                  </tr>
                  <tr className="hover:bg-slate-800/40">
                    <td className="p-3 font-semibold text-white">Honeywell EBI BMS Cleanroom</td>
                    <td className="p-3 text-blue-300 font-mono">Bulanan</td>
                    <td className="p-3">Deviasi tekanan diferensial Grade B, pergantian mode HVAC, kegagalan sensor</td>
                    <td className="p-3">Facility Engineer &amp; IT Lead</td>
                    <td className="p-3">
                      <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800 text-[10px]">
                        Tinjauan September Selesai
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Subtab 4: NTP Time Sync */}
      {activeSubTab === 'ntp_sync' && (
        <div className="space-y-4">
          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Clock className="w-5 h-5 text-teal-400" />
              Arsitektur Sinkronisasi Waktu Server &amp; Proteksi Jam (SOP-IT-006)
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed max-w-4xl">
              Memastikan kepatuhan klausul <strong>Contemporaneous</strong>: jam seluruh node sistem farmasi disinkronkan secara kontinu ke Dual NTP Master Clock Stratum-1 berbasis satelit GPS di Industrial DMZ.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
              <div className="p-4 rounded-xl bg-slate-800/70 border border-slate-700/70 space-y-2">
                <span className="text-teal-400 font-bold block">NTP Master 01 (Primer)</span>
                <div className="font-mono text-sm text-white">10.10.35.5 (Meinberg GPS)</div>
                <div className="text-slate-300">Status: <span className="text-emerald-400 font-bold">Lock GPS Satelit (12 Sat)</span></div>
                <div className="text-slate-400">Drift Saat Ini: <span className="text-teal-300 font-mono">+4.2 ms</span></div>
              </div>

              <div className="p-4 rounded-xl bg-slate-800/70 border border-slate-700/70 space-y-2">
                <span className="text-teal-400 font-bold block">NTP Master 02 (Sekunder)</span>
                <div className="font-mono text-sm text-white">10.10.35.6 (Hot Standby)</div>
                <div className="text-slate-300">Status: <span className="text-emerald-400 font-bold">Sinkron &amp; Siap Failover</span></div>
                <div className="text-slate-400">Drift Saat Ini: <span className="text-teal-300 font-mono">+5.1 ms</span></div>
              </div>

              <div className="p-4 rounded-xl bg-slate-800/70 border border-slate-700/70 space-y-2">
                <span className="text-purple-400 font-bold block">Proteksi GPO Domain</span>
                <div className="font-semibold text-white">GPO-GXP-TIME-LOCK-ENFORCED</div>
                <div className="text-slate-300">Hak Akses: <span className="text-emerald-400 font-bold">Operator Terkunci 100%</span></div>
                <div className="text-slate-400">Peringatan Drift: <span className="text-teal-300">&gt; 50 ms Memicu Alarm</span></div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
