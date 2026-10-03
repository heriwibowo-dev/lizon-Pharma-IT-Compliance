import React, { useState } from 'react';
import { 
  FolderCheck, 
  FileText, 
  Download, 
  CheckCircle2, 
  X, 
  ShieldCheck,
  Printer
} from 'lucide-react';
import { PLANT_PROFILE } from '../../data/pharmaData';

interface DossierModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DossierModal: React.FC<DossierModalProps> = ({ isOpen, onClose }) => {
  const [downloadingId, setDownloadingId] = useState<string | null>(null);

  if (!isOpen) return null;

  const dossierDocuments = [
    {
      id: 'doc-vmp',
      title: 'Validation Master Plan Pabrik Baru (VMP-LZN-2026-Rev2)',
      scope: 'Rencana Induk Validasi seluruh fasilitas, utilitas, dan sistem komputerisasi Cikarang.',
      signOffDate: '15 Maret 2026',
      approver: 'Head of QA & Plant Director',
      status: 'Efektif & Siap Disajikan'
    },
    {
      id: 'doc-uam',
      title: 'User Access Matrix & Pemisahan Tugas (UAM-2026-v2)',
      scope: 'Matriks kontrol hak akses sistem GxP, isolasi akun administrator, dan larangan delete record.',
      signOffDate: '20 Februari 2026',
      approver: 'IT Director & QA Compliance',
      status: 'Efektif & Siap Disajikan'
    },
    {
      id: 'doc-bms',
      title: 'Laporan Kualifikasi BMS Cleanroom Grade A-D (VSR-BMS-01)',
      scope: 'Paket kualifikasi URS, DQ, IQ, OQ, PQ kestabilan tekanan diferensial cascade 7 hari.',
      signOffDate: '28 Maret 2026',
      approver: 'QA Validation Manager',
      status: 'Efektif & Siap Disajikan'
    },
    {
      id: 'doc-bkp',
      title: 'Laporan Uji Pemulihan Cadangan Triwulanan (Q3-2026 Restore Drill)',
      scope: 'Bukti simulasi restorasi penuh database Werum MES & Waters LIMS ke sandbox dalam 1 jam 12 menit.',
      signOffDate: '18 Agustus 2026',
      approver: 'Lead IT Engineer & QA Head',
      status: 'Efektif & Siap Disajikan'
    },
    {
      id: 'doc-ntp',
      title: 'Log Kualifikasi Sinkronisasi Waktu NTP Stratum-1 (NTP-QUAL-2026)',
      scope: 'Bukti penguncian GPO jam workstation dan rekaman drift < 15ms selama 90 hari operasi.',
      signOffDate: '01 Oktober 2026',
      approver: 'Senior IT Engineer',
      status: 'Efektif & Siap Disajikan'
    },
    {
      id: 'doc-quar',
      title: 'Laporan Evaluasi Akun Triwulanan (QUAR Q3-2026 Report)',
      scope: 'Audit 142 akun GxP, pencabutan akun karyawan resign < 2 jam, 0 akun tanpa pemilik.',
      signOffDate: '25 September 2026',
      approver: 'QA Compliance & HR Head',
      status: 'Efektif & Siap Disajikan'
    }
  ];

  const handleSimulateDownload = (id: string, title: string) => {
    setDownloadingId(id);
    setTimeout(() => {
      setDownloadingId(null);
      const content = `PT. LIZON PHARMA INDONESIA\nBERKAS DOSSIER KESIAPAN AUDIT REGULASI\n=========================================\nDokumen: ${title}\nFasilitas: ${PLANT_PROFILE.facilityName}\nLisensi CPOB: ${PLANT_PROFILE.gmpLicense}\nFEI Number: ${PLANT_PROFILE.fdaEstablishmentId}\nStatus: Terverifikasi Siap Audit\nTanggal Unduh: ${new Date().toLocaleString('id-ID')}\n=========================================`;
      const blob = new Blob([content], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${title.replace(/[^a-zA-Z0-9]/g, '_')}.txt`;
      a.click();
      URL.revokeObjectURL(url);
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-3xl w-full p-6 space-y-5 shadow-2xl overflow-y-auto max-h-[92vh]">
        {/* Header */}
        <div className="flex items-start justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <FolderCheck className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">
                Dossier Kesiapan Audit &amp; Berkas Bukti Cepat (Front Room Binder)
              </h3>
              <p className="text-xs text-slate-400">
                {PLANT_PROFILE.companyName} • SLA Penarikan Bukti &lt; 15 Menit untuk Inspektur BPOM / FDA
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

        {/* Info Banner */}
        <div className="p-3.5 rounded-xl bg-slate-800/60 border border-slate-700/60 text-xs text-slate-300 leading-relaxed flex items-center gap-3">
          <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />
          <span>
            Seluruh dokumen di bawah telah diverifikasi keabsahan tanda tangan elektronik (21 CFR Part 11) dan disetujui resmi oleh Head of Quality Assurance.
          </span>
        </div>

        {/* Documents List */}
        <div className="space-y-3">
          {dossierDocuments.map((doc) => (
            <div
              key={doc.id}
              className="p-4 rounded-xl bg-slate-800/40 border border-slate-700/60 hover:border-slate-600 transition flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
            >
              <div className="space-y-1 flex-1">
                <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4 text-teal-400 shrink-0" />
                  <h4 className="text-sm font-bold text-white">{doc.title}</h4>
                </div>
                <p className="text-slate-300 text-[11px] leading-relaxed">{doc.scope}</p>
                <div className="text-slate-400 text-[10px]">
                  Disetujui: <span className="text-slate-200">{doc.approver}</span> • Tanggal: <span className="text-teal-300">{doc.signOffDate}</span>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800">
                  {doc.status}
                </span>

                <button
                  onClick={() => handleSimulateDownload(doc.id, doc.title)}
                  disabled={downloadingId === doc.id}
                  className="px-3 py-1.5 rounded-lg bg-teal-600 hover:bg-teal-500 text-white font-semibold text-xs flex items-center gap-1.5 transition shadow"
                >
                  <Download className={`w-3.5 h-3.5 ${downloadingId === doc.id ? 'animate-bounce' : ''}`} />
                  <span>{downloadingId === doc.id ? 'Mengunduh...' : 'Unduh'}</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="flex justify-between items-center pt-3 border-t border-slate-800 text-xs">
          <span className="text-slate-400 text-[11px]">
            PT. LIZON Pharma Indonesia • Dokumen Rahasia Perusahaan GxP
          </span>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold transition"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
};
