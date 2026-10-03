import React, { useState } from 'react';
import { 
  FileEdit, 
  FileText, 
  CheckCircle2, 
  AlertTriangle, 
  PlusCircle, 
  Copy, 
  Check, 
  Download, 
  BookOpen, 
  Search,
  ChevronRight,
  Filter
} from 'lucide-react';
import { CHANGE_CONTROLS, SOP_DOCUMENTS } from '../../data/pharmaData';
import { ChangeControlItem, SopDocument } from '../../types/pharma';

export const ChangeControlModule: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'ccr_list' | 'new_ccr_wizard' | 'sop_library'>('ccr_list');
  const [ccrList, setCcrList] = useState<ChangeControlItem[]>(CHANGE_CONTROLS);
  const [selectedSop, setSelectedSop] = useState<SopDocument>(SOP_DOCUMENTS[0]);
  const [copiedSopId, setCopiedSopId] = useState<string | null>(null);

  // New CCR Wizard State
  const [wizTitle, setWizTitle] = useState('');
  const [wizSystem, setWizSystem] = useState('MES Werum PAS-X');
  const [wizCategory, setWizCategory] = useState<'Hardware' | 'Software' | 'Network' | 'Configuration' | 'Emergency Patch'>('Configuration');
  const [wizProductImpact, setWizProductImpact] = useState<'yes' | 'no'>('yes');
  const [wizRollback, setWizRollback] = useState('');
  const [createdSuccess, setCreatedSuccess] = useState(false);

  // Evaluate wizard impact
  const isMajorChange = wizProductImpact === 'yes' || wizCategory === 'Emergency Patch' || wizCategory === 'Software';
  const calculatedSteps = isMajorChange ? ['IQ', 'Delta OQ', 'Regression Testing'] : ['IQ'];

  const handleCreateCcr = (e: React.FormEvent) => {
    e.preventDefault();
    if (!wizTitle) return;

    const newCcr: ChangeControlItem = {
      id: `ccr-00${ccrList.length + 1}`,
      ccrNumber: `CCR-2026-IT-004${ccrList.length + 2}`,
      title: wizTitle,
      systemId: 'custom-sys',
      systemName: wizSystem,
      category: wizCategory,
      priority: wizCategory === 'Emergency Patch' ? 'Emergency' : isMajorChange ? 'High' : 'Medium',
      gxpImpact: wizProductImpact === 'yes',
      revalidationRequired: isMajorChange,
      qualificationSteps: calculatedSteps as any,
      status: 'Under Risk Assessment',
      requestedBy: 'IT Engineer (Plant Systems)',
      qaApprover: 'QA Compliance Manager',
      targetDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      rollbackPlan: wizRollback || 'Kembalikan konfigurasi cadangan sebelumnya dan jalankan verifikasi rollback.'
    };

    setCcrList([newCcr, ...ccrList]);
    setCreatedSuccess(true);
    setTimeout(() => {
      setCreatedSuccess(false);
      setActiveTab('ccr_list');
      setWizTitle('');
      setWizRollback('');
    }, 1500);
  };

  const handleCopySop = (sop: SopDocument) => {
    const text = `${sop.sopNumber} - ${sop.title}\nVersi: ${sop.version} | Efektif: ${sop.effectiveDate}\n\nRingkasan:\n${sop.summary}\n\nIsi Prosedur:\n${sop.content.join('\n\n')}`;
    navigator.clipboard.writeText(text);
    setCopiedSopId(sop.id);
    setTimeout(() => setCopiedSopId(null), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Module Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-2xl bg-slate-900 border border-slate-800">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold mb-2">
            TANGGUNG JAWAB 5 • CHANGE CONTROL &amp; REPOSITORI SOP
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
            Kontrol Perubahan Formal &amp; Dokumentasi Siap Audit
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-3xl">
            Mengelola proses Change Control Request (CCR) untuk seluruh perangkat TI dan memelihara dokumentasi sistem (SOP, protokol validasi, penilaian risiko) hingga standar siap inspeksi BPOM &amp; FDA.
          </p>
        </div>

        {/* Sub Navigation */}
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setActiveTab('ccr_list')}
            className={`px-3 py-2 text-xs font-semibold rounded-lg transition ${
              activeTab === 'ccr_list' 
                ? 'bg-amber-600 text-white shadow-md shadow-amber-500/20' 
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            Daftar CCR ({ccrList.length})
          </button>
          <button
            onClick={() => setActiveTab('new_ccr_wizard')}
            className={`px-3 py-2 text-xs font-semibold rounded-lg transition flex items-center gap-1.5 ${
              activeTab === 'new_ccr_wizard' 
                ? 'bg-amber-600 text-white shadow-md shadow-amber-500/20' 
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            <PlusCircle className="w-3.5 h-3.5" />
            Buat Usulan CCR Baru
          </button>
          <button
            onClick={() => setActiveTab('sop_library')}
            className={`px-3 py-2 text-xs font-semibold rounded-lg transition flex items-center gap-1.5 ${
              activeTab === 'sop_library' 
                ? 'bg-amber-600 text-white shadow-md shadow-amber-500/20' 
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            Repositori 6 SOP Farmasi
          </button>
        </div>
      </div>

      {/* Tab 1: CCR List */}
      {activeTab === 'ccr_list' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {ccrList.map((ccr) => (
              <div
                key={ccr.id}
                className="p-5 rounded-xl bg-slate-900/90 border border-slate-800 hover:border-amber-500/50 transition shadow-md space-y-3"
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono font-bold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                        {ccr.ccrNumber}
                      </span>
                      <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                        {ccr.category}
                      </span>
                    </div>
                    <h3 className="text-sm font-bold text-white mt-1.5 leading-snug">{ccr.title}</h3>
                    <p className="text-xs text-slate-400 mt-0.5">Sistem: <span className="text-teal-300">{ccr.systemName}</span></p>
                  </div>

                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded shrink-0 ${
                    ccr.status === 'Closed & Released'
                      ? 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                      : ccr.status === 'In Implementation'
                        ? 'bg-amber-950 text-amber-300 border border-amber-800'
                        : 'bg-blue-950 text-blue-300 border border-blue-800'
                  }`}>
                    {ccr.status}
                  </span>
                </div>

                <div className="p-3 rounded-lg bg-slate-800/50 border border-slate-700/50 text-xs space-y-1.5">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Dampak GxP:</span>
                    <span className={`font-semibold ${ccr.gxpImpact ? 'text-amber-300' : 'text-slate-400'}`}>
                      {ccr.gxpImpact ? 'Ya (Direct GxP Impact)' : 'Tidak (Non-GxP)'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Kualifikasi Ulang:</span>
                    <span className="font-semibold text-purple-300">
                      {ccr.revalidationRequired ? ccr.qualificationSteps.join(', ') : 'Tidak Diperlukan'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Rencana Rollback:</span>
                    <span className="text-slate-300 text-right truncate max-w-[220px]" title={ccr.rollbackPlan}>
                      {ccr.rollbackPlan}
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between text-[11px] text-slate-400 pt-2 border-t border-slate-800">
                  <span>Pemohon: {ccr.requestedBy}</span>
                  <span>Target: <strong className="text-slate-200">{ccr.targetDate}</strong></span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 2: New CCR Wizard */}
      {activeTab === 'new_ccr_wizard' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <form onSubmit={handleCreateCcr} className="lg:col-span-2 p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
            <h3 className="text-base font-bold text-white pb-3 border-b border-slate-800 flex items-center gap-2">
              <FileEdit className="w-5 h-5 text-amber-400" />
              Formulir Permohonan Kontrol Perubahan (Change Control Request)
            </h3>

            {createdSuccess && (
              <div className="p-3 rounded-lg bg-emerald-950/80 border border-emerald-800 text-emerald-300 text-xs flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                Permohonan CCR berhasil dibuat dan diajukan ke Tim Penilaian Risiko QA!
              </div>
            )}

            <div className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">
                  Judul Usulan Perubahan:
                </label>
                <input
                  type="text"
                  required
                  placeholder="Misal: Upgrade Kernel Security Patch pada Server Database MES"
                  value={wizTitle}
                  onChange={(e) => setWizTitle(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-1 focus:ring-amber-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">
                    Sistem yang Terkena Dampak:
                  </label>
                  <select
                    value={wizSystem}
                    onChange={(e) => setWizSystem(e.target.value)}
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-1 focus:ring-amber-500"
                  >
                    <option value="MES Werum PAS-X">MES Werum PAS-X (Lantai Produksi)</option>
                    <option value="LabVantage LIMS & Waters Empower">LabVantage LIMS &amp; Waters Empower</option>
                    <option value="Siemens SCADA WFI/PW">Siemens SCADA WFI/PW</option>
                    <option value="Honeywell EBI BMS">Honeywell EBI BMS (Cleanroom HVAC)</option>
                    <option value="Infrastruktur IDMZ / Firewall">Infrastruktur IDMZ / Firewall</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">
                    Kategori Perubahan:
                  </label>
                  <select
                    value={wizCategory}
                    onChange={(e) => setWizCategory(e.target.value as any)}
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-1 focus:ring-amber-500"
                  >
                    <option value="Configuration">Configuration (Parameter/Alur Kerja)</option>
                    <option value="Software">Software (Patch/Upgrade Versi)</option>
                    <option value="Hardware">Hardware (Komponen Server/Switch)</option>
                    <option value="Network">Network (VLAN/Routing/Firewall Rule)</option>
                    <option value="Emergency Patch">Emergency Patch (Perbaikan Mendesak)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">
                  Apakah perubahan berdampak pada Catatan Batch, Mutu Obat, atau Integritas Data?
                </label>
                <div className="flex gap-4 mt-1">
                  <label className="flex items-center gap-2 text-slate-200 cursor-pointer">
                    <input
                      type="radio"
                      name="productImpact"
                      checked={wizProductImpact === 'yes'}
                      onChange={() => setWizProductImpact('yes')}
                    />
                    <span>Ya (Direct GxP Impact)</span>
                  </label>
                  <label className="flex items-center gap-2 text-slate-200 cursor-pointer">
                    <input
                      type="radio"
                      name="productImpact"
                      checked={wizProductImpact === 'no'}
                      onChange={() => setWizProductImpact('no')}
                    />
                    <span>Tidak (Indirect / Fasilitas Non-Kritis)</span>
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">
                  Rencana Pemulihan ke Kondisi Semula (Rollback Plan):
                </label>
                <textarea
                  rows={2}
                  placeholder="Langkah spesifik mengembalikan sistem jika terjadi kegagalan saat implementasi..."
                  value={wizRollback}
                  onChange={(e) => setWizRollback(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-1 focus:ring-amber-500"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded-lg bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs transition shadow-md shadow-amber-500/20"
              >
                Ajukan Formulir Kontrol Perubahan &rarr;
              </button>
            </div>
          </form>

          {/* Assessment Summary Output */}
          <div className="p-6 rounded-2xl bg-gradient-to-br from-slate-900 to-amber-950/40 border border-amber-500/40 space-y-4">
            <h4 className="text-xs uppercase font-bold tracking-wider text-amber-400">
              Hasil Evaluasi Dampak Regulasi Otomatis
            </h4>

            <div className="p-4 rounded-xl bg-slate-800/80 border border-slate-700/80 space-y-2 text-xs">
              <div className="text-slate-400">Klasifikasi Perubahan:</div>
              <div className="text-lg font-bold text-amber-300">
                {isMajorChange ? 'Perubahan MAYOR (GxP Critical)' : 'Perubahan MINOR'}
              </div>
              <div className="text-slate-300">
                Kualifikasi Ulang Diperlukan: <br />
                <span className="font-semibold text-purple-300">{calculatedSteps.join(', ')}</span>
              </div>
            </div>

            <div className="text-xs space-y-2 text-slate-300">
              <span className="font-semibold text-slate-200 block">Alur Persetujuan Wajib:</span>
              <div className="space-y-1 text-[11px]">
                <div className="flex items-center gap-1.5 text-slate-300">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  1. IT Engineer (Technical Evaluation)
                </div>
                <div className="flex items-center gap-1.5 text-slate-300">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  2. System Owner (User Dept Head)
                </div>
                <div className="flex items-center gap-1.5 text-slate-300">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  3. QA Validation Manager (Final Pre-Approval)
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: SOP Library */}
      {activeTab === 'sop_library' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* SOP Sidebar */}
          <div className="lg:col-span-4 space-y-2">
            <h3 className="text-xs uppercase font-bold tracking-wider text-slate-400 mb-2">
              Daftar Prosedur Tetap (SOP IT GxP)
            </h3>
            <div className="space-y-1.5">
              {SOP_DOCUMENTS.map((sop) => (
                <button
                  key={sop.id}
                  onClick={() => setSelectedSop(sop)}
                  className={`w-full p-3 rounded-xl text-left border transition ${
                    selectedSop.id === sop.id
                      ? 'bg-amber-500/15 border-amber-500 text-amber-200 shadow-md'
                      : 'bg-slate-900/80 border-slate-800 text-slate-400 hover:bg-slate-800'
                  }`}
                >
                  <div className="font-mono text-xs font-bold text-amber-400">{sop.sopNumber}</div>
                  <div className="text-xs font-semibold text-slate-200 mt-0.5 line-clamp-1">{sop.title}</div>
                  <div className="text-[10px] text-slate-400 mt-1">Versi {sop.version} • {sop.effectiveDate}</div>
                </button>
              ))}
            </div>
          </div>

          {/* SOP Viewer */}
          <div className="lg:col-span-8 p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
              <div>
                <span className="text-xs font-mono font-bold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                  {selectedSop.sopNumber} (Versi {selectedSop.version})
                </span>
                <h3 className="text-lg font-bold text-white mt-1.5">{selectedSop.title}</h3>
                <p className="text-xs text-slate-400">
                  Penyusun: {selectedSop.author} • Disetujui: {selectedSop.approver}
                </p>
              </div>

              <button
                onClick={() => handleCopySop(selectedSop)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition"
              >
                {copiedSopId === selectedSop.id ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Tersalin!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-slate-400" />
                    <span>Salin SOP</span>
                  </>
                )}
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div className="p-3.5 rounded-xl bg-slate-800/60 border border-slate-700/60">
                <span className="text-slate-400 font-semibold block mb-1">Ringkasan Eksekutif:</span>
                <p className="text-slate-200 leading-relaxed">{selectedSop.summary}</p>
              </div>

              <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-700/50 space-y-2">
                <span className="text-slate-200 font-bold block">Butir Prosedur Utama:</span>
                <div className="space-y-2">
                  {selectedSop.content.map((clause, cIdx) => (
                    <p key={cIdx} className="text-slate-300 leading-relaxed font-mono text-[11px] bg-slate-900/40 p-2 rounded">
                      {clause}
                    </p>
                  ))}
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-800/70 border border-slate-700/70 space-y-2">
                <span className="text-amber-400 font-semibold block">
                  Checklist Kesiapan Audit (Inspection Checklist):
                </span>
                <div className="space-y-1">
                  {selectedSop.keyAuditChecklist.map((item, kIdx) => (
                    <div key={kIdx} className="flex items-center gap-2 text-slate-300">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
