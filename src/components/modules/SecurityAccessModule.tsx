import React, { useState } from 'react';
import { 
  Lock, 
  ShieldCheck, 
  UserCheck, 
  AlertTriangle, 
  Key, 
  FileCheck2, 
  CheckCircle2, 
  XCircle, 
  Usb, 
  Clock,
  Search
} from 'lucide-react';
import { ACCESS_CONTROL_MATRIX } from '../../data/pharmaData';

export const SecurityAccessModule: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'matrix' | 'sod_rules' | 'cleanroom_lock' | 'quar'>('matrix');

  return (
    <div className="space-y-6">
      {/* Module Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-2xl bg-slate-900 border border-slate-800">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-400 text-xs font-semibold mb-2">
            TANGGUNG JAWAB 4 • KEAMANAN SIBER &amp; KONTROL AKSES
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
            Keamanan Siber &amp; Hak Akses Minimum (Least Privilege &amp; SoD)
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-3xl">
            Menerapkan langkah keamanan siber tangguh, firewall IDMZ, serta kebijakan kontrol akses berbasis peran (RBAC) dan pemisahan tugas ketat (Segregation of Duties) pada seluruh sistem GxP.
          </p>
        </div>

        {/* Sub Navigation */}
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setActiveTab('matrix')}
            className={`px-3 py-2 text-xs font-semibold rounded-lg transition ${
              activeTab === 'matrix' 
                ? 'bg-purple-600 text-white shadow-md shadow-purple-500/20' 
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            Matriks RBAC &amp; Peran
          </button>
          <button
            onClick={() => setActiveTab('sod_rules')}
            className={`px-3 py-2 text-xs font-semibold rounded-lg transition flex items-center gap-1.5 ${
              activeTab === 'sod_rules' 
                ? 'bg-purple-600 text-white shadow-md shadow-purple-500/20' 
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            Aturan Pemisahan Tugas (SoD)
          </button>
          <button
            onClick={() => setActiveTab('cleanroom_lock')}
            className={`px-3 py-2 text-xs font-semibold rounded-lg transition flex items-center gap-1.5 ${
              activeTab === 'cleanroom_lock' 
                ? 'bg-purple-600 text-white shadow-md shadow-purple-500/20' 
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            <Usb className="w-3.5 h-3.5" />
            Pengamanan Kios Cleanroom
          </button>
          <button
            onClick={() => setActiveTab('quar')}
            className={`px-3 py-2 text-xs font-semibold rounded-lg transition ${
              activeTab === 'quar' 
                ? 'bg-purple-600 text-white shadow-md shadow-purple-500/20' 
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            Evaluasi Akun Triwulanan (QUAR)
          </button>
        </div>
      </div>

      {/* Subtab 1: Role Based Access Control Matrix */}
      {activeTab === 'matrix' && (
        <div className="space-y-4">
          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
              <div>
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <Lock className="w-5 h-5 text-purple-400" />
                  Matriks Kontrol Akses Berbasis Peran (User Access Matrix - UAM-2026-v2)
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Diverifikasi dan disetujui bersama oleh IT Director, Head of QA, dan Plant Director.
                </p>
              </div>
              <span className="text-[11px] font-mono px-2.5 py-1 rounded bg-purple-500/10 text-purple-300 border border-purple-500/30">
                Prinsip Hak Akses Minimum
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-300">
                <thead className="bg-slate-800/80 text-slate-200 uppercase font-mono text-[10px]">
                  <tr>
                    <th className="p-3">Peran / Jabatan</th>
                    <th className="p-3 text-center">Buat User Baru</th>
                    <th className="p-3 text-center">Ubah Konfigurasi</th>
                    <th className="p-3 text-center">Hapus Record Data</th>
                    <th className="p-3 text-center">Tanda Tangan Batch</th>
                    <th className="p-3 text-center">Review Audit Trail</th>
                    <th className="p-3 text-center">Akses Direct DB</th>
                    <th className="p-3">Akses Fisik Cleanroom</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                  {ACCESS_CONTROL_MATRIX.map((row, idx) => (
                    <tr key={idx} className="hover:bg-slate-800/40">
                      <td className="p-3">
                        <div className="font-bold text-white">{row.role}</div>
                        <div className="text-[10px] text-slate-400">{row.description}</div>
                      </td>
                      <td className="p-3 text-center">
                        {row.canCreateUser ? (
                          <CheckCircle2 className="w-4 h-4 text-emerald-400 mx-auto" />
                        ) : (
                          <XCircle className="w-4 h-4 text-slate-600 mx-auto" />
                        )}
                      </td>
                      <td className="p-3 text-center">
                        {row.canEditConfig ? (
                          <CheckCircle2 className="w-4 h-4 text-emerald-400 mx-auto" />
                        ) : (
                          <XCircle className="w-4 h-4 text-slate-600 mx-auto" />
                        )}
                      </td>
                      <td className="p-3 text-center">
                        <span className="px-1.5 py-0.5 rounded bg-rose-950 text-rose-300 border border-rose-800 text-[10px] font-bold">
                          DILARANG
                        </span>
                      </td>
                      <td className="p-3 text-center">
                        {row.canSignBatch ? (
                          <CheckCircle2 className="w-4 h-4 text-purple-400 mx-auto" />
                        ) : (
                          <XCircle className="w-4 h-4 text-slate-600 mx-auto" />
                        )}
                      </td>
                      <td className="p-3 text-center">
                        {row.canReviewAuditTrail ? (
                          <CheckCircle2 className="w-4 h-4 text-teal-400 mx-auto" />
                        ) : (
                          <XCircle className="w-4 h-4 text-slate-600 mx-auto" />
                        )}
                      </td>
                      <td className="p-3 text-center">
                        {row.canAccessDatabaseDirect ? (
                          <span className="text-[10px] font-mono text-amber-300">IT Only (PAM)</span>
                        ) : (
                          <XCircle className="w-4 h-4 text-slate-600 mx-auto" />
                        )}
                      </td>
                      <td className="p-3 font-semibold text-slate-200">
                        {row.cleanroomAccess}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Subtab 2: Segregation of Duties Rules */}
      {activeTab === 'sod_rules' && (
        <div className="space-y-4">
          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-400" />
              Tiga Aturan Emas Pemisahan Tugas (Segregation of Duties - SoD)
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed max-w-4xl">
              Pemisahan tugas dirancang untuk mencegah potensi konflik kepentingan, kolusi, dan manipulasi data catatan elektronik obat sesuai pedoman PIC/S PI-041 Bagian 9.3.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
              <div className="p-4 rounded-xl bg-slate-800/70 border border-slate-700/70 space-y-2">
                <div className="flex items-center gap-2 text-rose-400 font-bold">
                  <AlertTriangle className="w-4 h-4" />
                  Aturan SoD #1: Isolasi Admin
                </div>
                <h4 className="text-sm font-semibold text-white">
                  Personel Bisnis (QC &amp; Produksi) Dilarang Memegang Hak Admin
                </h4>
                <p className="text-slate-300 leading-relaxed">
                  Analis QC yang menguji sampel atau operator yang menimbang bahan tidak boleh memiliki hak administrator lokal pada workstation, hak database, maupun hak mengubah setelan jejak audit.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-800/70 border border-slate-700/70 space-y-2">
                <div className="flex items-center gap-2 text-rose-400 font-bold">
                  <AlertTriangle className="w-4 h-4" />
                  Aturan SoD #2: Independensi TI
                </div>
                <h4 className="text-sm font-semibold text-white">
                  Personel IT Dilarang Menandatangani Pelulusan Batch Produk
                </h4>
                <p className="text-slate-300 leading-relaxed">
                  Meskipun tim IT mengelola server dan database, personel IT dilarang keras diberikan hak tanda tangan elektronik untuk pelepasan batch produk obat atau sertifikat analisis (CoA).
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-800/70 border border-slate-700/70 space-y-2">
                <div className="flex items-center gap-2 text-rose-400 font-bold">
                  <AlertTriangle className="w-4 h-4" />
                  Aturan SoD #3: Hak Hapus Nihil
                </div>
                <h4 className="text-sm font-semibold text-white">
                  Perintah Delete Ditiadakan dari Semua Akun Pengguna
                </h4>
                <p className="text-slate-300 leading-relaxed">
                  Database dan aplikasi dikonfigurasi tanpa opsi "Hard Delete". Setiap koreksi data wajib melalui mekanisme catatan revisi resmi dengan mempertahankan nilai lama (old value) pada audit trail.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Subtab 3: Cleanroom Device Hardening */}
      {activeTab === 'cleanroom_lock' && (
        <div className="space-y-4">
          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Usb className="w-5 h-5 text-teal-400" />
              Protokol Pengamanan Fisik &amp; Logis Kios Cleanroom
            </h3>
            <p className="text-xs text-slate-300 max-w-4xl leading-relaxed">
              Terminal HMI dan workstation di dalam ruang bersih steril (Grade A, B, C, D) menerapkan penguncian ketat untuk mencegah kebocoran data, infeksi malware, dan akses tanpa izin.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="p-4 rounded-xl bg-slate-800/60 border border-slate-700/60 space-y-2">
                <span className="text-teal-400 font-bold block flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4" />
                  Penguncian Port USB (Physical &amp; BIOS Lock)
                </span>
                <p className="text-slate-300 leading-relaxed">
                  Semua port USB fisik pada PC cleanroom disegel dengan penutup kunci fisik dan dinonaktifkan permanen pada tingkat BIOS serta GPO Windows Defender Device Guard. Penggunaan flashdisk eksternal dilarang mutlak.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-800/60 border border-slate-700/60 space-y-2">
                <span className="text-teal-400 font-bold block flex items-center gap-1.5">
                  <Clock className="w-4 h-4" />
                  Auto-Lockout Inaktivitas Maksimal 5 Menit
                </span>
                <p className="text-slate-300 leading-relaxed">
                  Jika operator meninggalkan terminal cleanroom tanpa melakukan aksi selama 5 menit, sistem secara otomatis mengunci layar. Untuk login kembali diperlukan pemindaian kartu smartcard RFID personal dan PIN.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Subtab 4: Quarterly User Access Review */}
      {activeTab === 'quar' && (
        <div className="space-y-4">
          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div>
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <UserCheck className="w-5 h-5 text-purple-400" />
                  Laporan Evaluasi Akun Triwulanan (QUAR Q3-2026 Selesai)
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Dilaksanakan pada 25 September 2026 oleh IT Engineer bersama QA Compliance.
                </p>
              </div>
              <span className="px-2.5 py-1 rounded bg-emerald-950 text-emerald-300 border border-emerald-800 text-xs font-bold">
                100% Selesai &amp; Bersih
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
              <div className="p-4 rounded-xl bg-slate-800/60 border border-slate-700/60">
                <span className="text-slate-400 block">Total Akun GxP Diaudit:</span>
                <span className="text-2xl font-bold text-white mt-1 block">142 Akun</span>
                <span className="text-[11px] text-teal-300">LIMS, MES, SCADA, BMS</span>
              </div>
              <div className="p-4 rounded-xl bg-slate-800/60 border border-slate-700/60">
                <span className="text-slate-400 block">Akun Dicabut (Karyawan Resign):</span>
                <span className="text-2xl font-bold text-amber-400 mt-1 block">3 Akun</span>
                <span className="text-[11px] text-slate-400">Dinonaktifkan &lt; 2 jam dari notifikasi HR</span>
              </div>
              <div className="p-4 rounded-xl bg-slate-800/60 border border-slate-700/60">
                <span className="text-slate-400 block">Akun Tanpa Pemilik (Orphan Accounts):</span>
                <span className="text-2xl font-bold text-emerald-400 mt-1 block">0 (Nol)</span>
                <span className="text-[11px] text-emerald-400">Kepatuhan Sempurna</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
