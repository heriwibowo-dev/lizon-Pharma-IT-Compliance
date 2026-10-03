import React, { useState } from 'react';
import { 
  FileText, 
  Download, 
  Printer, 
  X, 
  CheckCircle2, 
  ShieldCheck, 
  FileSpreadsheet, 
  Layers, 
  Calendar,
  Building2,
  Clock
} from 'lucide-react';
import { 
  generateAuditCompliancePdf, 
  exportSystemComplianceCsv, 
  exportAlcoaAuditCsv, 
  exportChangeControlsCsv, 
  exportBackupRecordsCsv,
  exportGampRiskAssessmentCsv
} from '../../utils/auditExportUtils';
import { PLANT_PROFILE, GXP_SYSTEMS, ALCOA_PRINCIPLES, CHANGE_CONTROLS } from '../../data/pharmaData';

interface ExportReportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ExportReportModal: React.FC<ExportReportModalProps> = ({ isOpen, onClose }) => {
  const [selectedFormat, setSelectedFormat] = useState<'pdf' | 'csv'>('pdf');
  const [selectedReportType, setSelectedReportType] = useState<'full' | 'systems' | 'risk' | 'alcoa' | 'ccr' | 'backup'>('full');
  const [isExporting, setIsExporting] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleExport = () => {
    setIsExporting(true);
    setTimeout(() => {
      if (selectedFormat === 'pdf') {
        generateAuditCompliancePdf();
        setSuccessMessage('Dokumen Laporan PDF resmi berhasil diunduh!');
      } else {
        if (selectedReportType === 'systems' || selectedReportType === 'full') {
          exportSystemComplianceCsv();
        } else if (selectedReportType === 'risk') {
          exportGampRiskAssessmentCsv();
        } else if (selectedReportType === 'alcoa') {
          exportAlcoaAuditCsv();
        } else if (selectedReportType === 'ccr') {
          exportChangeControlsCsv();
        } else if (selectedReportType === 'backup') {
          exportBackupRecordsCsv();
        }
        setSuccessMessage('File data CSV audit berhasil diunduh!');
      }
      setIsExporting(false);
      setTimeout(() => setSuccessMessage(null), 3000);
    }, 400);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-4">
      <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-4xl w-full p-5 sm:p-6 space-y-5 shadow-2xl overflow-y-auto max-h-[92vh]">
        {/* Header */}
        <div className="flex items-start justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-teal-500/10 text-teal-400 border border-teal-500/20">
              <FileSpreadsheet className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">
                Ekspor Laporan Kepatuhan Sistem &amp; Kesehatan Infrastruktur TI
              </h3>
              <p className="text-xs text-slate-400">
                Dokumentasi resmi siap audit (Audit-Ready) berstandar BPOM CPOB 2024, FDA 21 CFR Part 11, dan ISPE GAMP 5
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Success Alert */}
        {successMessage && (
          <div className="p-3.5 rounded-xl bg-emerald-950/80 border border-emerald-700 text-emerald-300 text-xs flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{successMessage}</span>
          </div>
        )}

        {/* Selection Options */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          {/* Format Selector */}
          <div className="space-y-2 p-4 rounded-xl bg-slate-800/50 border border-slate-700/60">
            <label className="font-semibold text-slate-200 block">Pilih Format Berkas Ekspor:</label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setSelectedFormat('pdf')}
                className={`p-3 rounded-lg border text-left transition flex items-center gap-2.5 ${
                  selectedFormat === 'pdf'
                    ? 'bg-rose-500/15 border-rose-500 text-white font-bold'
                    : 'bg-slate-800 border-slate-700 text-slate-400 hover:bg-slate-750'
                }`}
              >
                <FileText className={`w-5 h-5 ${selectedFormat === 'pdf' ? 'text-rose-400' : 'text-slate-500'}`} />
                <div>
                  <div className="text-xs">Dokumen PDF</div>
                  <div className="text-[10px] text-slate-400 font-normal">Format Resmi &amp; Pengesahan</div>
                </div>
              </button>

              <button
                type="button"
                onClick={() => setSelectedFormat('csv')}
                className={`p-3 rounded-lg border text-left transition flex items-center gap-2.5 ${
                  selectedFormat === 'csv'
                    ? 'bg-teal-500/15 border-teal-500 text-white font-bold'
                    : 'bg-slate-800 border-slate-700 text-slate-400 hover:bg-slate-750'
                }`}
              >
                <FileSpreadsheet className={`w-5 h-5 ${selectedFormat === 'csv' ? 'text-teal-400' : 'text-slate-500'}`} />
                <div>
                  <div className="text-xs">File Data CSV</div>
                  <div className="text-[10px] text-slate-400 font-normal">Tabel Komprehensif</div>
                </div>
              </button>
            </div>
          </div>

          {/* Scope Selector */}
          <div className="space-y-2 p-4 rounded-xl bg-slate-800/50 border border-slate-700/60">
            <label className="font-semibold text-slate-200 block">Cakupan Dokumen Audit:</label>
            <select
              value={selectedReportType}
              onChange={(e) => setSelectedReportType(e.target.value as any)}
              className="w-full bg-slate-800 border border-slate-700 text-slate-200 rounded-lg p-2.5 text-xs focus:outline-none focus:ring-1 focus:ring-teal-500"
            >
              <option value="full">Laporan Konsolidasi Lengkap (Full Dossier GxP)</option>
              <option value="systems">1. Matriks Validasi Sistem Komputerisasi (ISPE GAMP 5)</option>
              <option value="risk">2. Penilaian Risiko Kualitatif &amp; Kuantitatif FMEA (GAMP 5 S&times;P&times;D)</option>
              <option value="alcoa">3. Kepatuhan Integritas Data (ALCOA+ &amp; 21 CFR Part 11)</option>
              <option value="ccr">4. Log Kontrol Perubahan Aktif (Change Control Request)</option>
              <option value="backup">5. Catatan Pencadangan &amp; Pemulihan Bencana (DRP 3-2-1-1)</option>
            </select>
            <p className="text-[10px] text-slate-400 mt-1">
              Dokumen menyertakan nomor kontrol dokumen dan lembar pengesahan tanda tangan QA.
            </p>
          </div>
        </div>

        {/* Live Preview Box */}
        <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-3 text-xs">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <span className="text-[11px] font-bold text-teal-400 uppercase tracking-wider flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4" />
              Pratinjau Dokumen Cetak (Official Report Preview)
            </span>
            <span className="font-mono text-[10px] text-slate-400">
              No: REP-GXP-IT-2026-088 • Rev 1.0
            </span>
          </div>

          {/* Formatted Report Mock */}
          <div className="bg-slate-900 p-4 rounded-lg border border-slate-800/90 text-slate-300 space-y-3 font-sans">
            <div className="flex justify-between items-start border-b border-slate-800 pb-2">
              <div>
                <div className="font-bold text-white text-sm tracking-wide">{PLANT_PROFILE.companyName}</div>
                <div className="text-[11px] text-slate-400">{PLANT_PROFILE.facilityName}</div>
              </div>
              <div className="text-right text-[10px] text-slate-400 font-mono">
                <div>BPOM: {PLANT_PROFILE.gmpLicense}</div>
                <div>FDA FEI: {PLANT_PROFILE.fdaEstablishmentId}</div>
              </div>
            </div>

            <div className="text-center py-1">
              <h4 className="font-bold text-white text-xs uppercase tracking-wide">
                LAPORAN STATUS KEPATUHAN SISTEM GXP &amp; KESEHATAN INFRASTRUKTUR TI
              </h4>
              <p className="text-[10px] text-slate-400 mt-0.5">
                Audit Kepatuhan Siklus Hidup ISPE GAMP 5 &amp; Integritas Data ALCOA+
              </p>
            </div>

            {/* Quick Metrics */}
            <div className="grid grid-cols-4 gap-2 text-center text-[10px] bg-slate-800/60 p-2 rounded border border-slate-700/60">
              <div>
                <span className="text-slate-400 block">Skor ALCOA+:</span>
                <strong className="text-emerald-400 text-xs">98.4%</strong>
              </div>
              <div>
                <span className="text-slate-400 block">Sistem Validated:</span>
                <strong className="text-blue-400 text-xs">8 dari 8</strong>
              </div>
              <div>
                <span className="text-slate-400 block">Uptime 24/7:</span>
                <strong className="text-teal-400 text-xs">99.98%</strong>
              </div>
              <div>
                <span className="text-slate-400 block">NTP Stratum-1:</span>
                <strong className="text-purple-400 text-xs">+4.2 ms</strong>
              </div>
            </div>

            <div className="text-[10px] text-slate-400">
              Dokumen ini mencakup inventaris 8 sistem terkomputerisasi, 9 pilar integritas data, 4 usulan CCR aktif, serta verifikasi pemulihan data 3-2-1-1.
            </div>
          </div>
        </div>

        {/* Modal Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-3 border-t border-slate-800">
          <div className="text-[11px] text-slate-400">
            Format file: <strong>{selectedFormat.toUpperCase()}</strong> | Siap untuk penyerahan auditor BPOM / FDA
          </div>

          <div className="flex items-center gap-2.5 w-full sm:w-auto">
            <button
              type="button"
              onClick={handlePrint}
              className="flex-1 sm:flex-none px-3.5 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 flex items-center justify-center gap-1.5 transition"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Cetak Dokumen</span>
            </button>

            <button
              type="button"
              onClick={handleExport}
              disabled={isExporting}
              className="flex-1 sm:flex-none px-4 py-2 rounded-lg bg-gradient-to-r from-teal-500 to-blue-600 hover:from-teal-400 hover:to-blue-500 text-white text-xs font-bold shadow-md shadow-teal-500/20 flex items-center justify-center gap-2 transition"
            >
              <Download className={`w-3.5 h-3.5 ${isExporting ? 'animate-bounce' : ''}`} />
              <span>{isExporting ? 'Menyiapkan Berkas...' : `Unduh Berkas ${selectedFormat.toUpperCase()}`}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
