import React, { useState } from 'react';
import { 
  Award, 
  ShieldCheck, 
  HelpCircle, 
  FileText, 
  Search, 
  Download, 
  FolderCheck, 
  CheckCircle2, 
  AlertCircle,
  Eye,
  ChevronDown,
  ChevronUp,
  CheckSquare
} from 'lucide-react';
import { INSPECTION_DEFENSE_QUESTIONS, PLANT_PROFILE } from '../../data/pharmaData';
import { InspectionQuestion } from '../../types/pharma';
import { AuditReadinessChecklist } from '../audit/AuditReadinessChecklist';

export const AuditSupportModule: React.FC = () => {
  const [selectedAgency, setSelectedAgency] = useState<string>('ALL');
  const [expandedId, setExpandedId] = useState<string>(INSPECTION_DEFENSE_QUESTIONS[0].id);
  const [activeTab, setActiveTab] = useState<'checklist' | 'playbook' | 'dossier'>('checklist');

  const filteredQuestions = INSPECTION_DEFENSE_QUESTIONS.filter(q => {
    if (selectedAgency === 'ALL') return true;
    return q.agency === selectedAgency;
  });

  const toggleExpand = (id: string) => {
    setExpandedId(prev => (prev === id ? '' : id));
  };

  return (
    <div className="space-y-6">
      {/* Module Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-2xl bg-slate-900 border border-slate-800">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold mb-2">
            TANGGUNG JAWAB 6 • AUDIT READINESS &amp; DEFENSE
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
            Dukungan Audit &amp; Kesiapan Inspeksi Regulasi (BPOM, FDA, PIC/S)
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-3xl">
            Bertindak sebagai titik kontak utama TI (Subject Matter Expert) selama audit CPOB BPOM internal &amp; eksternal, inspeksi US FDA, dan PIC/S dengan strategi pertahanan data yang kokoh.
          </p>
        </div>

        {/* Sub Navigation */}
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setActiveTab('checklist')}
            className={`px-3 py-2 text-xs font-semibold rounded-lg transition flex items-center gap-1.5 ${
              activeTab === 'checklist' 
                ? 'bg-emerald-600 text-white shadow-md shadow-emerald-500/20' 
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            <CheckSquare className="w-3.5 h-3.5" />
            <span>Checklist Kesiapan Audit</span>
          </button>
          <button
            onClick={() => setActiveTab('playbook')}
            className={`px-3 py-2 text-xs font-semibold rounded-lg transition ${
              activeTab === 'playbook' 
                ? 'bg-emerald-600 text-white shadow-md shadow-emerald-500/20' 
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            Playbook Pertahanan Inspeksi
          </button>
          <button
            onClick={() => setActiveTab('dossier')}
            className={`px-3 py-2 text-xs font-semibold rounded-lg transition flex items-center gap-1.5 ${
              activeTab === 'dossier' 
                ? 'bg-emerald-600 text-white shadow-md shadow-emerald-500/20' 
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            <FolderCheck className="w-3.5 h-3.5" />
            <span>Berkas Dossier Siap Audit</span>
          </button>
        </div>
      </div>

      {/* Tab 0: Audit Readiness Checklist */}
      {activeTab === 'checklist' && (
        <AuditReadinessChecklist onOpenDossier={() => setActiveTab('dossier')} />
      )}

      {/* Tab 1: Inspection Defense Playbook */}
      {activeTab === 'playbook' && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-xl bg-slate-900/80 border border-slate-800">
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-slate-300">Filter Badan Pengawas:</span>
              <select
                value={selectedAgency}
                onChange={(e) => setSelectedAgency(e.target.value)}
                className="bg-slate-800 border border-slate-700 text-slate-200 text-xs rounded-lg px-2.5 py-1.5 focus:outline-none focus:ring-1 focus:ring-emerald-500"
              >
                <option value="ALL">Semua Badan Regulasi (BPOM, FDA, PIC/S)</option>
                <option value="BPOM">Badan POM RI (CPOB 2024 Aneks 11)</option>
                <option value="US FDA">US FDA (21 CFR Part 11 / cGMP)</option>
                <option value="PIC/S">PIC/S (PI-041 Data Integrity)</option>
              </select>
            </div>

            <div className="text-xs text-slate-400">
              SOP Pertahanan Audit: <span className="text-white font-semibold">Tersedia 5 Skenario Utama</span>
            </div>
          </div>

          <div className="space-y-3">
            {filteredQuestions.map((q) => {
              const isExpanded = expandedId === q.id;
              return (
                <div
                  key={q.id}
                  className="rounded-xl bg-slate-900 border border-slate-800 overflow-hidden transition shadow-md"
                >
                  <button
                    onClick={() => toggleExpand(q.id)}
                    className="w-full p-4 text-left flex items-start justify-between gap-3 hover:bg-slate-850 transition"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${
                          q.agency === 'BPOM'
                            ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                            : q.agency === 'US FDA'
                              ? 'bg-blue-500/20 text-blue-300 border-blue-500/40'
                              : 'bg-purple-500/20 text-purple-300 border-purple-500/40'
                        }`}>
                          {q.agency}
                        </span>
                        <span className="text-xs text-slate-400 font-semibold">{q.topic}</span>
                      </div>
                      <h3 className="text-sm font-bold text-white mt-1">
                        &ldquo;{q.inspectorQuestion}&rdquo;
                      </h3>
                    </div>

                    <div className="p-1 rounded-lg bg-slate-800 text-slate-400 mt-1">
                      {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </div>
                  </button>

                  {isExpanded && (
                    <div className="p-5 bg-slate-950/60 border-t border-slate-800 space-y-4 text-xs">
                      {/* Background Intent */}
                      <div className="p-3.5 rounded-lg bg-blue-950/30 border border-blue-800/40 text-blue-200 space-y-1">
                        <strong className="block text-blue-300 text-[11px] uppercase tracking-wider">
                          Maksud &amp; Tujuan Tersembunyi Inspektur:
                        </strong>
                        <p className="leading-relaxed text-slate-300">{q.backgroundIntent}</p>
                      </div>

                      {/* Recommended Answer */}
                      <div className="p-4 rounded-xl bg-slate-900 border border-slate-700/80 space-y-1.5">
                        <strong className="block text-emerald-400 text-xs font-bold uppercase tracking-wider flex items-center gap-1.5">
                          <CheckCircle2 className="w-4 h-4" />
                          Rekomendasi Jawaban Lisan IT Engineer (Front Room):
                        </strong>
                        <p className="text-slate-200 text-sm leading-relaxed font-sans">
                          {q.recommendedAnswer}
                        </p>
                      </div>

                      {/* Evidence Documents to Pull */}
                      <div className="p-3.5 rounded-lg bg-slate-800/50 border border-slate-700/60 space-y-2">
                        <strong className="block text-slate-200 text-xs">
                          Dokumen Bukti Fisik/Digital yang Wajib Disajikan (&lt; 15 Menit):
                        </strong>
                        <div className="space-y-1 text-slate-300">
                          {q.evidenceDocuments.map((doc, dIdx) => (
                            <div key={dIdx} className="flex items-center gap-2">
                              <FileText className="w-3.5 h-3.5 text-teal-400" />
                              <span className="font-mono text-[11px]">{doc}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Defensive Tips */}
                      <div className="p-3.5 rounded-lg bg-amber-950/30 border border-amber-800/40 space-y-1.5 text-amber-200">
                        <strong className="block text-amber-300 text-[11px] uppercase tracking-wider flex items-center gap-1">
                          <AlertCircle className="w-3.5 h-3.5" />
                          Tips Taktis Menghadapi Auditor:
                        </strong>
                        <ul className="list-disc list-inside space-y-1 text-slate-300">
                          {q.defensiveTips.map((tip, tIdx) => (
                            <li key={tIdx}>{tip}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Tab 2: Rapid Dossier Binder */}
      {activeTab === 'dossier' && (
        <div className="space-y-4">
          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
              <div>
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <FolderCheck className="w-5 h-5 text-emerald-400" />
                  Berkas Dossier TI Siap Audit (Rapid Document Binder)
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Folder dokumen terindeks untuk presentasi cepat kepada inspektur BPOM &amp; FDA di Front Room.
                </p>
              </div>
              <span className="text-[11px] px-2.5 py-1 rounded bg-emerald-500/10 text-emerald-300 border border-emerald-500/30 font-semibold">
                SLA Penarikan: &lt; 15 Menit
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 text-xs">
              {[
                { title: 'Validation Master Plan (VMP-2026-LZN)', type: 'Master Plan', date: 'Maret 2026', status: 'Disetujui QA Head' },
                { title: 'User Access Matrix (UAM-2026-v2) & SoD Policy', type: 'Access Control', date: 'Februari 2026', status: 'Disetujui QA & IT' },
                { title: 'Laporan Kualifikasi BMS Cleanroom (VSR-BMS-01)', type: 'CSV Package', date: 'Maret 2026', status: 'Terkualifikasi' },
                { title: 'Laporan Uji Pemulihan Data Triwulanan (Q3-2026)', type: 'DRP Drill', date: 'Agustus 2026', status: 'Lolos 100%' },
                { title: 'Log Sinkronisasi & Drift Jam NTP Stratum-1', type: 'Time Sync', date: 'Oktober 2026', status: 'Drift < 15ms' },
                { title: 'Laporan Evaluasi Akun Triwulanan (QUAR Q3-2026)', type: 'Security Review', date: 'September 2026', status: 'Selesai' }
              ].map((item, idx) => (
                <div key={idx} className="p-3.5 rounded-xl bg-slate-800/60 border border-slate-700/60 flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="font-semibold text-white">{item.title}</div>
                    <div className="text-[10px] text-slate-400">{item.type} • {item.date}</div>
                  </div>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800 shrink-0 font-medium">
                    {item.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
