import React, { useState } from 'react';
import { 
  CheckCircle2, 
  HelpCircle, 
  Calculator, 
  FileText, 
  Layers, 
  Search, 
  Filter, 
  Download, 
  Eye, 
  AlertTriangle,
  ChevronDown,
  ChevronUp,
  Cpu,
  BookOpen
} from 'lucide-react';
import { GXP_SYSTEMS, CSV_VMODEL_STEPS } from '../../data/pharmaData';
import { GxpSystem, GampCategory, GxpImpact } from '../../types/pharma';

export const ValidationCSVModule: React.FC = () => {
  const [selectedSystem, setSelectedSystem] = useState<GxpSystem | null>(null);
  const [categoryFilter, setCategoryFilter] = useState<string>('ALL');
  const [activeTab, setActiveTab] = useState<'inventory' | 'calculator' | 'vmodel' | 'templates'>('inventory');

  // GAMP 5 Calculator State
  const [calcName, setCalcName] = useState('Sistem Mesin Pengemas Blister Baru');
  const [calcSoftwareType, setCalcSoftwareType] = useState<'infra' | 'cots_standard' | 'cots_configured' | 'custom'>('cots_configured');
  const [calcPatientImpact, setCalcPatientImpact] = useState<'direct' | 'indirect' | 'none'>('direct');
  const [calcElectronicRecords, setCalcElectronicRecords] = useState(true);
  const [calcComplexity, setCalcComplexity] = useState<'low' | 'medium' | 'high'>('medium');

  // Calculate GAMP classification
  const getGampResult = () => {
    let category: GampCategory = 'Category 4';
    let gxpImpact: GxpImpact = 'Direct GxP';
    let riskLevel = 'Tinggi (High GxP Risk)';

    if (calcSoftwareType === 'infra') {
      category = 'Category 1';
      gxpImpact = 'Indirect GxP';
      riskLevel = 'Rendah (Infrastruktur Bersama)';
    } else if (calcSoftwareType === 'cots_standard') {
      category = 'Category 3';
      gxpImpact = calcPatientImpact === 'direct' ? 'Direct GxP' : 'Indirect GxP';
      riskLevel = 'Sedang (Standard COTS)';
    } else if (calcSoftwareType === 'cots_configured') {
      category = 'Category 4';
      gxpImpact = calcPatientImpact === 'direct' ? 'Direct GxP' : 'Indirect GxP';
      riskLevel = calcPatientImpact === 'direct' ? 'Tinggi (Configured GxP)' : 'Sedang';
    } else {
      category = 'Category 5';
      gxpImpact = 'Direct GxP';
      riskLevel = 'Kritis (Kustom/Tinggi)';
    }

    const docs = [
      'User Requirements Specification (URS) terstandarisasi',
      'Penilaian Risiko Kualitatif & Kuantitatif (GxP & FMEA Risk Assessment)',
      category !== 'Category 3' ? 'Functional & Design Specification (FS/DS)' : null,
      'Protokol & Laporan Kualifikasi Instalasi (IQ)',
      'Protokol & Laporan Kualifikasi Operasional (OQ) berbasis skrip pengujian',
      (category === 'Category 4' || category === 'Category 5' || calcPatientImpact === 'direct') ? 'Protokol & Laporan Kualifikasi Kinerja (PQ)' : null,
      'Requirements Traceability Matrix (RTM)',
      'Validation Summary Report (VSR) & Prosedur Tetap (SOP Operasional)'
    ].filter(Boolean) as string[];

    return { category, gxpImpact, riskLevel, docs };
  };

  const calcResult = getGampResult();

  const filteredSystems = GXP_SYSTEMS.filter((sys) => {
    if (categoryFilter === 'ALL') return true;
    return sys.gampCategory === categoryFilter;
  });

  return (
    <div className="space-y-6">
      {/* Module Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-2xl bg-slate-900 border border-slate-800">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-semibold mb-2">
            TANGGUNG JAWAB 1 • COMPUTERIZED SYSTEM VALIDATION
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
            Validasi &amp; Kepatuhan Sistem (ISPE GAMP 5 &amp; V-Model)
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-3xl">
            Memimpin dan melaksanakan proses kualifikasi sistem komputerisasi farmasi (URS, DQ, RA, IQ, OQ, PQ, VSR) untuk memastikan seluruh perangkat lunak dan otomatisasi siap audit (audit-ready).
          </p>
        </div>

        {/* Sub Navigation */}
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setActiveTab('inventory')}
            className={`px-3 py-2 text-xs font-semibold rounded-lg transition ${
              activeTab === 'inventory' 
                ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20' 
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            Inventaris 8 Sistem GxP
          </button>
          <button
            onClick={() => setActiveTab('calculator')}
            className={`px-3 py-2 text-xs font-semibold rounded-lg transition flex items-center gap-1.5 ${
              activeTab === 'calculator' 
                ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20' 
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            <Calculator className="w-3.5 h-3.5 text-blue-300" />
            Kalkulator Risiko GAMP 5
          </button>
          <button
            onClick={() => setActiveTab('vmodel')}
            className={`px-3 py-2 text-xs font-semibold rounded-lg transition ${
              activeTab === 'vmodel' 
                ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20' 
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            Alur Siklus Hidup V-Model
          </button>
        </div>
      </div>

      {/* Tab Content 1: Systems Inventory */}
      {activeTab === 'inventory' && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-xl bg-slate-900/80 border border-slate-800">
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-slate-400" />
              <span className="text-xs font-semibold text-slate-300">Filter Kategori GAMP 5:</span>
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="bg-slate-800 border border-slate-700 text-slate-200 text-xs rounded-lg px-2.5 py-1.5 focus:outline-none focus:ring-1 focus:ring-teal-500"
              >
                <option value="ALL">Semua Kategori (8 Sistem)</option>
                <option value="Category 3">GAMP Category 3 (Non-configured)</option>
                <option value="Category 4">GAMP Category 4 (Configured Products)</option>
                <option value="Category 5">GAMP Category 5 (Custom Scripts)</option>
              </select>
            </div>

            <div className="text-xs text-slate-400">
              Menampilkan <span className="text-white font-bold">{filteredSystems.length}</span> sistem terdaftar
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredSystems.map((sys) => (
              <div
                key={sys.id}
                className="p-5 rounded-xl bg-slate-900/90 border border-slate-800 hover:border-blue-500/50 transition shadow-md flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono font-bold text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded border border-blue-500/20">
                          {sys.code}
                        </span>
                        <h3 className="text-sm font-bold text-white">{sys.name}</h3>
                      </div>
                      <p className="text-xs text-slate-400 mt-1">{sys.area}</p>
                    </div>

                    <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800/60 whitespace-nowrap">
                      {sys.validationStatus}
                    </span>
                  </div>

                  <p className="text-xs text-slate-300 my-3 leading-relaxed">
                    {sys.description}
                  </p>

                  <div className="grid grid-cols-2 gap-2 text-[11px] bg-slate-800/50 p-2.5 rounded-lg border border-slate-700/50 mb-3">
                    <div>
                      <span className="text-slate-400 block">Kategori GAMP:</span>
                      <span className="font-semibold text-teal-300">{sys.gampCategory}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block">Dampak GxP:</span>
                      <span className="font-semibold text-emerald-300">{sys.gxpImpact}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block">21 CFR Part 11:</span>
                      <span className="font-semibold text-purple-300">
                        {sys.part11Applicable ? 'Wajib (Electronic Records)' : 'Tidak Wajib'}
                      </span>
                    </div>
                    <div>
                      <span className="text-slate-400 block">Jejak Audit (ATR):</span>
                      <span className="font-semibold text-amber-300">{sys.auditTrailReviewFreq}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs">
                  <div className="text-[11px] text-slate-400">
                    Vendor: <span className="text-slate-200">{sys.vendor}</span>
                  </div>
                  <button
                    onClick={() => setSelectedSystem(sys)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-600/20 hover:bg-blue-600/30 text-blue-300 border border-blue-500/30 transition text-xs font-semibold"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    Detail Validasi
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab Content 2: GAMP 5 Risk Calculator */}
      {activeTab === 'calculator' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-5">
            <div className="flex items-center gap-2 pb-3 border-b border-slate-800">
              <Calculator className="w-5 h-5 text-teal-400" />
              <h3 className="text-base font-bold text-white">
                Kalkulator Kategorisasi ISPE GAMP 5 &amp; Penentuan Jalur Validasi
              </h3>
            </div>

            <div className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">
                  Nama Sistem / Perangkat Komputerisasi:
                </label>
                <input
                  type="text"
                  value={calcName}
                  onChange={(e) => setCalcName(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-1 focus:ring-teal-500"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">
                  Tipe &amp; Arsitektur Perangkat Lunak (Software Nature):
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-1">
                  {[
                    { id: 'infra', label: 'Kategori 1: Layer Infrastruktur (OS, DBMS, Hypervisor)' },
                    { id: 'cots_standard', label: 'Kategori 3: COTS Standar Tanpa Konfigurasi (Firmware timbangan, standalone logger)' },
                    { id: 'cots_configured', label: 'Kategori 4: COTS Terkonfigurasi (SCADA, BMS, EMS, LIMS, MES, ERP)' },
                    { id: 'custom', label: 'Kategori 5: Aplikasi Kustom / Skrip Khusus (Custom PLC code, peracikan unik)' }
                  ].map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setCalcSoftwareType(item.id as any)}
                      className={`p-3 rounded-lg text-left border transition ${
                        calcSoftwareType === item.id
                          ? 'bg-blue-600/20 border-blue-500 text-blue-200'
                          : 'bg-slate-800/60 border-slate-700/60 text-slate-400 hover:bg-slate-800'
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">
                    Dampak Terhadap Kualitas Produk / Keselamatan Pasien:
                  </label>
                  <select
                    value={calcPatientImpact}
                    onChange={(e) => setCalcPatientImpact(e.target.value as any)}
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-1 focus:ring-teal-500"
                  >
                    <option value="direct">Langsung (Direct Impact - Misal: Sterilisasi, Penimbangan, Uji Lab)</option>
                    <option value="indirect">Tidak Langsung (Indirect Impact - Misal: Logistik, Pemantauan Area Umum)</option>
                    <option value="none">Tidak Berdampak (No Impact - Misal: Portal Kantin, Presensi Kantor)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">
                    Pencatatan Catatan Elektronik &amp; Tanda Tangan:
                  </label>
                  <select
                    value={calcElectronicRecords ? 'yes' : 'no'}
                    onChange={(e) => setCalcElectronicRecords(e.target.value === 'yes')}
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-1 focus:ring-teal-500"
                  >
                    <option value="yes">Ya (Membuat data GxP atau E-Signature - 21 CFR Part 11 Aktif)</option>
                    <option value="no">Tidak (Hanya pembacaan display tanpa penyimpanan catatan)</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Calculator Output */}
          <div className="p-6 rounded-2xl bg-gradient-to-br from-slate-900 via-slate-850 to-blue-950/60 border border-blue-500/40 shadow-xl space-y-4">
            <h4 className="text-xs uppercase font-bold tracking-wider text-blue-400">
              Hasil Rekomendasi Validasi &amp; Kualifikasi
            </h4>

            <div className="p-4 rounded-xl bg-slate-800/80 border border-slate-700/80 space-y-2">
              <div className="text-xs text-slate-400">Kategori GAMP 5:</div>
              <div className="text-xl font-extrabold text-teal-300">{calcResult.category}</div>
              <div className="text-xs text-slate-300">Tingkat Risiko: <span className="font-semibold text-amber-300">{calcResult.riskLevel}</span></div>
              <div className="text-xs text-slate-300">Status 21 CFR Part 11: <span className="font-semibold text-purple-300">{calcElectronicRecords ? 'Mandatory' : 'Exempt'}</span></div>
            </div>

            <div>
              <div className="text-xs font-semibold text-slate-200 mb-2">
                Daftar Dokumen Wajib Siap Audit (Audit-Ready Deliverables):
              </div>
              <div className="space-y-1.5 text-xs">
                {calcResult.docs.map((doc, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-slate-300">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 mt-0.5 shrink-0" />
                    <span>{doc}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-3 border-t border-slate-800 text-[11px] text-slate-400 leading-relaxed">
              Catatan Rekayasa: Sistem kategori ini wajib disetujui bersama oleh System Owner, IT Lead, dan QA Validation Manager sebelum rilis ke tahap commissioning.
            </div>
          </div>
        </div>
      )}

      {/* Tab Content 3: V-Model Lifecycle */}
      {activeTab === 'vmodel' && (
        <div className="space-y-4">
          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800">
            <h3 className="text-base font-bold text-white mb-2 flex items-center gap-2">
              <Layers className="w-5 h-5 text-blue-400" />
              Siklus Hidup Validasi GxP (V-Model GAMP 5 Approach)
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed max-w-4xl mb-6">
              V-Model menghubungkan setiap tahapan spesifikasi kebutuhan di sisi kiri dengan tahapan pengujian dan verifikasi kualifikasi di sisi kanan, memastikan seluruh kriteria mutu farmasi terpenuhi tanpa celah.
            </p>

            <div className="space-y-3">
              {CSV_VMODEL_STEPS.map((step, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-xl bg-slate-800/60 border border-slate-700/60 hover:border-slate-600 transition flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
                  <div className="space-y-1 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded border border-blue-500/20">
                        {step.phase}
                      </span>
                      <h4 className="text-sm font-bold text-white">{step.step}</h4>
                    </div>
                    <p className="text-xs text-slate-300 mt-1">{step.focus}</p>
                    <div className="text-[11px] text-teal-300/90 font-medium">
                      Deliverable: {step.deliverables}
                    </div>
                  </div>

                  <div className="sm:text-right shrink-0">
                    <span className="text-[10px] text-slate-400 block">Penanggung Jawab:</span>
                    <span className="text-xs font-semibold text-slate-200">{step.responsible}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Detail Modal for Selected System */}
      {selectedSystem && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-2xl w-full p-6 space-y-4 shadow-2xl overflow-y-auto max-h-[90vh]">
            <div className="flex items-start justify-between gap-4 pb-3 border-b border-slate-800">
              <div>
                <span className="text-xs font-mono font-bold text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded border border-blue-500/20">
                  {selectedSystem.code}
                </span>
                <h3 className="text-lg font-bold text-white mt-1">{selectedSystem.name}</h3>
                <p className="text-xs text-slate-400">{selectedSystem.area}</p>
              </div>
              <button
                onClick={() => setSelectedSystem(null)}
                className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-3 rounded-lg bg-slate-800/70 border border-slate-700/70 space-y-1">
                <span className="text-slate-400 font-semibold block">Deskripsi Sistem &amp; Fungsi GxP:</span>
                <p className="text-slate-200">{selectedSystem.description}</p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 rounded-lg bg-slate-800/50 border border-slate-700/50">
                  <span className="text-slate-400 block">Versi &amp; Vendor:</span>
                  <span className="text-white font-medium">{selectedSystem.version} ({selectedSystem.vendor})</span>
                </div>
                <div className="p-3 rounded-lg bg-slate-800/50 border border-slate-700/50">
                  <span className="text-slate-400 block">Status Validasi Terkini:</span>
                  <span className="text-emerald-300 font-semibold">{selectedSystem.validationStatus} ({selectedSystem.lastValidated})</span>
                </div>
                <div className="p-3 rounded-lg bg-slate-800/50 border border-slate-700/50">
                  <span className="text-slate-400 block">Target SLA RTO / RPO:</span>
                  <span className="text-teal-300 font-semibold">RTO: {selectedSystem.rtoHours} Jam • RPO: {selectedSystem.rpoHours} Jam</span>
                </div>
                <div className="p-3 rounded-lg bg-slate-800/50 border border-slate-700/50">
                  <span className="text-slate-400 block">Review Ulang Berkala:</span>
                  <span className="text-purple-300 font-semibold">{selectedSystem.nextPeriodicReview}</span>
                </div>
              </div>

              <div className="p-3 rounded-lg bg-slate-800/50 border border-slate-700/50">
                <span className="text-slate-400 block mb-1">Strategi Pencadangan &amp; Frekuensi Jejak Audit:</span>
                <div className="text-slate-200">
                  <strong>Backup:</strong> {selectedSystem.backupFrequency} <br />
                  <strong>Audit Trail Review:</strong> {selectedSystem.auditTrailReviewFreq} (Wajib tanda tangan QA)
                </div>
              </div>
            </div>

            <div className="flex justify-end pt-3 border-t border-slate-800">
              <button
                onClick={() => setSelectedSystem(null)}
                className="px-4 py-2 text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg transition"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
