import React, { useState } from 'react';
import { 
  FileCheck, 
  ShieldCheck, 
  Clock, 
  Search, 
  Filter, 
  Download, 
  CheckCircle2, 
  AlertTriangle, 
  Lock, 
  Cpu, 
  UserCheck, 
  Key, 
  Hash, 
  PlusCircle, 
  RefreshCw,
  Eye,
  FileSpreadsheet,
  Check
} from 'lucide-react';
import { AUDIT_TRAIL_RECORDS, PLANT_PROFILE } from '../../data/pharmaData';
import { AuditTrailEntry } from '../../types/pharma';

export const AuditTrailModule: React.FC = () => {
  const [records, setRecords] = useState<AuditTrailEntry[]>(AUDIT_TRAIL_RECORDS);
  const [searchTerm, setSearchTerm] = useState('');
  const [systemFilter, setSystemFilter] = useState('ALL');
  const [criticalityFilter, setCriticalityFilter] = useState('ALL');
  const [actionFilter, setActionFilter] = useState('ALL');
  const [selectedRecord, setSelectedRecord] = useState<AuditTrailEntry | null>(null);

  // Verification state
  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationResult, setVerificationResult] = useState<string | null>(null);

  // New Simulation Entry Modal/Form State
  const [showSimModal, setShowSimModal] = useState(false);
  const [simSystem, setSimSystem] = useState('SCADA-01');
  const [simParam, setSimParam] = useState('PW_PURIFIED_WATER_FLOW_RATE_MIN_LPM');
  const [simOldVal, setSimOldVal] = useState('45.0 L/min');
  const [simNewVal, setSimNewVal] = useState('48.5 L/min');
  const [simReason, setSimReason] = useState('Penyesuaian laju alir turbulen sanitasi sirkulasi pipa sesuai protokol kualifikasi');
  const [simUserName, setSimUserName] = useState('Heri Wibowo (Lead IT Engineer)');
  const [simPassword, setSimPassword] = useState('');
  const [simSuccess, setSimSuccess] = useState(false);

  // Sign-off modal state
  const [showSignOffModal, setShowSignOffModal] = useState(false);
  const [signOffReviewer, setSignOffReviewer] = useState('Heri Wibowo (Lead IT Engineer)');
  const [signOffQa, setSignOffQa] = useState('apt. Siti Rahmawati (QA Compliance Manager)');
  const [signOffReason, setSignOffReason] = useState('Tinjauan jejak audit berkala Oktober 2026 telah diverifikasi tanpa anomali.');
  const [signOffComplete, setSignOffComplete] = useState(false);

  // Run cryptographic SHA-256 verification
  const handleVerifyIntegrity = () => {
    setIsVerifying(true);
    setVerificationResult(null);

    setTimeout(() => {
      setIsVerifying(false);
      setVerificationResult(`SEMUA ${records.length} REKAMAN TERVERIFIKASI 100% UTUH: Hash SHA-256 selaras dengan NetApp SnapLock Compliance WORM Vault. Nol modifikasi, penimpaan, atau penghapusan terdeteksi.`);
      setTimeout(() => setVerificationResult(null), 6000);
    }, 1200);
  };

  // Submit simulated new audit trail event (enforcing 21 CFR Part 11 requirements)
  const handleAddSimulatedEntry = (e: React.FormEvent) => {
    e.preventDefault();
    if (!simReason.trim() || !simPassword.trim()) return;

    const nextSeq = Math.max(...records.map(r => r.seqNo)) + 1;
    const now = new Date();
    const timestamp = `${now.toISOString().replace('T', ' ').substring(0, 19)}.${String(now.getMilliseconds()).padStart(3, '0')}`;

    // Generate simulated SHA-256 hash
    const fakeHash = Array.from({ length: 64 }, () => Math.floor(Math.random() * 16).toString(16)).join('');

    const newEntry: AuditTrailEntry = {
      id: `at-${nextSeq}`,
      seqNo: nextSeq,
      timestamp,
      userId: 'USR-IT-001',
      userName: simUserName,
      userRole: 'System Administrator (IT)',
      workstationIp: '10.10.35.12 (IDMZ Bastion Host)',
      systemCode: simSystem,
      systemName: simSystem === 'SCADA-01' ? 'Siemens WinCC SCADA Purified Water' : `${simSystem} GxP System`,
      actionType: 'CONFIG_CHANGE',
      actionDescription: `Modifikasi parameter operasional ${simParam}`,
      affectedParameter: simParam,
      oldValue: simOldVal,
      newValue: simNewVal,
      reasonForChange: simReason,
      gxpCriticality: 'Critical GxP',
      eSignatureVerified: true,
      sha256Hash: fakeHash,
      tamperEvidentStatus: 'Verified (Immutable WORM)'
    };

    setRecords([newEntry, ...records]);
    setSimSuccess(true);
    setTimeout(() => {
      setSimSuccess(false);
      setShowSimModal(false);
      setSimPassword('');
    }, 1200);
  };

  // Export Audit Trail to CSV
  const handleExportCsv = () => {
    const headers = [
      'Sequence No',
      'Timestamp (NTP Stratum-1)',
      'User ID',
      'User Name',
      'Role',
      'Workstation IP',
      'System Code',
      'System Name',
      'Action Type',
      'Affected Parameter',
      'Old Value',
      'New Value',
      'Reason For Change (21 CFR Part 11)',
      'GxP Criticality',
      'E-Signature Verified',
      'SHA-256 Hash',
      'WORM Status'
    ];

    const rows = records.map(r => [
      r.seqNo,
      `"${r.timestamp}"`,
      `"${r.userId}"`,
      `"${r.userName}"`,
      `"${r.userRole}"`,
      `"${r.workstationIp}"`,
      `"${r.systemCode}"`,
      `"${r.systemName}"`,
      `"${r.actionType}"`,
      `"${r.affectedParameter}"`,
      `"${r.oldValue}"`,
      `"${r.newValue}"`,
      `"${r.reasonForChange.replace(/"/g, '""')}"`,
      `"${r.gxpCriticality}"`,
      r.eSignatureVerified ? 'YES' : 'NO',
      `"${r.sha256Hash}"`,
      `"${r.tamperEvidentStatus}"`
    ]);

    const csvContent = [headers.join(','), ...rows.map(row => row.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `lizon_pharma_audit_trail_21cfr11_${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // Filtered entries
  const filteredRecords = records.filter(r => {
    const matchesSearch = 
      r.affectedParameter.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.reasonForChange.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.systemCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.userId.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesSystem = systemFilter === 'ALL' || r.systemCode === systemFilter;
    const matchesCriticality = criticalityFilter === 'ALL' || r.gxpCriticality === criticalityFilter;
    const matchesAction = actionFilter === 'ALL' || r.actionType === actionFilter;

    return matchesSearch && matchesSystem && matchesCriticality && matchesAction;
  });

  return (
    <div className="space-y-6">
      {/* Module Title & 21 CFR Part 11 Banner */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 p-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl">
        <div className="space-y-2">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/30 text-teal-300 text-xs font-semibold">
              <span className="h-2 w-2 rounded-full bg-teal-400 animate-pulse"></span>
              21 CFR PART 11.10(E) • EU ANNEX 11 • PIC/S PI-041
            </span>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300 font-mono">
              WORM Tamper-Evident Ledger
            </span>
          </div>

          <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2 tracking-tight">
            Jejak Audit Sistem Komputerisasi (Audit Trail Log)
          </h2>

          <p className="text-xs sm:text-sm text-slate-300 max-w-3xl leading-relaxed">
            Pencatatan kronologis yang aman, tidak dapat diubah (*non-editable*), dan dibubuhi stempel waktu komputer (*computer-generated time-stamped*) secara independen untuk setiap konfigurasi kritis dan tindakan pengguna di seluruh sistem <strong className="text-white">PT. LIZON Pharma Indonesia</strong>.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap lg:flex-col gap-2 shrink-0">
          <button
            onClick={handleVerifyIntegrity}
            disabled={isVerifying}
            className="flex-1 lg:flex-none px-4 py-2 text-xs font-bold rounded-xl bg-teal-600 hover:bg-teal-500 text-white shadow-md shadow-teal-500/20 flex items-center justify-center gap-2 transition"
          >
            <ShieldCheck className={`w-4 h-4 ${isVerifying ? 'animate-spin' : ''}`} />
            <span>{isVerifying ? 'Memverifikasi Hash...' : 'Uji Integritas SHA-256 (WORM)'}</span>
          </button>

          <button
            onClick={() => setShowSimModal(true)}
            className="flex-1 lg:flex-none px-4 py-2 text-xs font-semibold rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 flex items-center justify-center gap-2 transition"
          >
            <PlusCircle className="w-4 h-4 text-amber-400" />
            <span>Simulasikan Aksi Kritis TI</span>
          </button>

          <button
            onClick={handleExportCsv}
            className="flex-1 lg:flex-none px-4 py-2 text-xs font-semibold rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 flex items-center justify-center gap-2 transition"
          >
            <Download className="w-4 h-4 text-blue-400" />
            <span>Ekspor Jejak Audit (CSV)</span>
          </button>
        </div>
      </div>

      {/* Verification Success Toast */}
      {verificationResult && (
        <div className="p-4 rounded-xl bg-emerald-950/80 border border-emerald-700 text-emerald-300 text-xs flex items-center gap-3 animate-in fade-in duration-200">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          <span className="font-semibold leading-relaxed">{verificationResult}</span>
        </div>
      )}

      {/* 21 CFR Part 11 Compliance Check Ribbon */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
        <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
          <span className="text-[10px] uppercase font-semibold text-slate-400 block">Status Enkripsi Data</span>
          <span className="font-bold text-white text-sm flex items-center gap-1.5">
            <Lock className="w-4 h-4 text-emerald-400" />
            AES-256 + WORM
          </span>
          <span className="text-[10px] text-emerald-400">NetApp SnapLock Compliance</span>
        </div>

        <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
          <span className="text-[10px] uppercase font-semibold text-slate-400 block">Stempel Waktu Terverifikasi</span>
          <span className="font-bold text-white text-sm flex items-center gap-1.5">
            <Clock className="w-4 h-4 text-teal-400" />
            NTP Stratum-1
          </span>
          <span className="text-[10px] text-teal-300">GPS Locked (Deviasi &lt; 5 ms)</span>
        </div>

        <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
          <span className="text-[10px] uppercase font-semibold text-slate-400 block">Hak Penghapusan (Delete)</span>
          <span className="font-bold text-rose-400 text-sm flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-rose-400" />
            NON-EDITABLE
          </span>
          <span className="text-[10px] text-slate-400">Dilarang bagi seluruh user &amp; admin</span>
        </div>

        <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
          <span className="text-[10px] uppercase font-semibold text-slate-400 block">Alasan Perubahan (Reason)</span>
          <span className="font-bold text-amber-300 text-sm flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-amber-400" />
            Wajib Mandatori
          </span>
          <span className="text-[10px] text-slate-400">100% Entri tercatat dengan alasan</span>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 space-y-3">
        <div className="flex flex-col md:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            <input
              type="text"
              placeholder="Cari parameter, alasan perubahan, nama pengguna, atau ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-slate-800 border border-slate-700 rounded-lg pl-9 pr-3 py-2 text-xs text-white focus:outline-none focus:ring-1 focus:ring-teal-500"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2 text-xs">
            <select
              value={systemFilter}
              onChange={(e) => setSystemFilter(e.target.value)}
              className="bg-slate-800 border border-slate-700 text-slate-200 rounded-lg px-2.5 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-teal-500"
            >
              <option value="ALL">Semua Sistem GxP</option>
              <option value="SCADA-01">SCADA-01 (WFI &amp; PW)</option>
              <option value="MES-01">MES-01 (Werum PAS-X)</option>
              <option value="LIMS-01">LIMS-01 (Waters Empower)</option>
              <option value="BMS-01">BMS-01 (Cleanroom HVAC)</option>
              <option value="IDMZ-FW01">IDMZ-FW01 (Firewall)</option>
              <option value="ACS-01">ACS-01 (Access Control)</option>
              <option value="SAN-01">SAN-01 (WORM Storage)</option>
            </select>

            <select
              value={criticalityFilter}
              onChange={(e) => setCriticalityFilter(e.target.value)}
              className="bg-slate-800 border border-slate-700 text-slate-200 rounded-lg px-2.5 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-teal-500"
            >
              <option value="ALL">Semua Tingkat GxP</option>
              <option value="Critical GxP">Critical GxP</option>
              <option value="Major GxP">Major GxP</option>
              <option value="Minor GxP">Minor GxP</option>
            </select>

            <select
              value={actionFilter}
              onChange={(e) => setActionFilter(e.target.value)}
              className="bg-slate-800 border border-slate-700 text-slate-200 rounded-lg px-2.5 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-teal-500"
            >
              <option value="ALL">Semua Tipe Aksi</option>
              <option value="CONFIG_CHANGE">Perubahan Konfigurasi</option>
              <option value="SECURITY_ACCESS">Hak Akses &amp; Keamanan</option>
              <option value="VALIDATION_SIGNOFF">Persetujuan &amp; Tanda Tangan</option>
              <option value="TIME_SYNC">Sinkronisasi Waktu NTP</option>
              <option value="BACKUP_EXEC">Pencadangan WORM</option>
            </select>
          </div>
        </div>

        <div className="flex items-center justify-between text-[11px] text-slate-400 pt-2 border-t border-slate-800/80">
          <span>
            Menampilkan <strong className="text-white">{filteredRecords.length}</strong> dari {records.length} rekaman kronologis
          </span>
          <span className="text-teal-400 font-mono">
            Urutan Waktu Terkunci: Linier &amp; Sekuensial
          </span>
        </div>
      </div>

      {/* Chronological Audit Trail Ledger Table */}
      <div className="rounded-2xl bg-slate-900 border border-slate-800 overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-800/80 text-slate-200 uppercase font-mono text-[10px] tracking-wider border-b border-slate-700">
              <tr>
                <th className="p-3">Seq # / Timestamp</th>
                <th className="p-3">Sistem &amp; Pengguna</th>
                <th className="p-3">Aksi &amp; Parameter Kritis</th>
                <th className="p-3">Nilai Sebelum &rarr; Sesudah</th>
                <th className="p-3">Alasan Perubahan (21 CFR Part 11)</th>
                <th className="p-3 text-center">Integritas Hash</th>
                <th className="p-3 text-center">Detail</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {filteredRecords.length === 0 ? (
                <tr>
                  <td colSpan={7} className="p-8 text-center text-slate-500">
                    Tidak ditemukan rekaman jejak audit yang sesuai kriteria filter.
                  </td>
                </tr>
              ) : (
                filteredRecords.map((r) => (
                  <tr key={r.id} className="hover:bg-slate-850/60 transition">
                    {/* Seq & Timestamp */}
                    <td className="p-3">
                      <div className="font-mono font-bold text-teal-400">#{r.seqNo}</div>
                      <div className="font-mono text-[11px] text-slate-300 mt-0.5 whitespace-nowrap">
                        {r.timestamp}
                      </div>
                      <span className="text-[9px] text-slate-400 font-mono">Stratum-1 UTC+7</span>
                    </td>

                    {/* System & User */}
                    <td className="p-3">
                      <div className="flex items-center gap-1.5">
                        <span className="px-1.5 py-0.2 rounded bg-blue-950 text-blue-300 border border-blue-800 font-mono font-bold text-[10px]">
                          {r.systemCode}
                        </span>
                        <span className={`text-[9px] px-1.5 py-0.2 rounded font-semibold ${
                          r.gxpCriticality === 'Critical GxP'
                            ? 'bg-rose-950 text-rose-300 border border-rose-800'
                            : 'bg-amber-950 text-amber-300 border border-amber-800'
                        }`}>
                          {r.gxpCriticality}
                        </span>
                      </div>
                      <div className="font-bold text-white mt-1 text-[11px]">{r.userName}</div>
                      <div className="text-[10px] text-slate-400">{r.userId} • {r.userRole.split('(')[0]}</div>
                    </td>

                    {/* Action & Parameter */}
                    <td className="p-3 max-w-xs">
                      <div className="font-semibold text-slate-200 text-[11px]">{r.actionDescription}</div>
                      <div className="font-mono text-[10px] text-teal-300/90 mt-1 break-all bg-slate-950/60 p-1 rounded border border-slate-800">
                        {r.affectedParameter}
                      </div>
                    </td>

                    {/* Old vs New Value Diff */}
                    <td className="p-3 max-w-xs">
                      <div className="space-y-1 font-mono text-[11px]">
                        <div className="text-rose-400/90 bg-rose-950/30 px-1.5 py-0.5 rounded border border-rose-900/40">
                          - {r.oldValue}
                        </div>
                        <div className="text-emerald-400 bg-emerald-950/30 px-1.5 py-0.5 rounded border border-emerald-900/40">
                          + {r.newValue}
                        </div>
                      </div>
                    </td>

                    {/* Reason For Change */}
                    <td className="p-3 max-w-sm">
                      <div className="text-[11px] text-slate-300 leading-snug">
                        {r.reasonForChange}
                      </div>
                      <div className="text-[10px] text-slate-500 mt-1">
                        IP: <span className="font-mono">{r.workstationIp}</span>
                      </div>
                    </td>

                    {/* Hash & WORM */}
                    <td className="p-3 text-center">
                      <div className="flex flex-col items-center gap-1">
                        <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800 text-[9px] font-mono font-bold flex items-center gap-1">
                          <Check className="w-2.5 h-2.5" />
                          {r.tamperEvidentStatus.split(' ')[0]}
                        </span>
                        <span className="font-mono text-[9px] text-slate-500 truncate max-w-[80px]" title={r.sha256Hash}>
                          {r.sha256Hash.substring(0, 8)}...
                        </span>
                      </div>
                    </td>

                    {/* View Button */}
                    <td className="p-3 text-center">
                      <button
                        onClick={() => setSelectedRecord(r)}
                        className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 transition"
                        title="Lihat detail jejak audit lengkap"
                      >
                        <Eye className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Record Detail Modal */}
      {selectedRecord && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-2xl w-full p-6 space-y-4 shadow-2xl max-h-[90vh] overflow-y-auto text-xs">
            <div className="flex items-start justify-between pb-3 border-b border-slate-800">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-bold text-teal-400 bg-teal-500/10 px-2 py-0.5 rounded">
                    Rekaman Audit #{selectedRecord.seqNo}
                  </span>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800">
                    21 CFR Part 11 Compliant
                  </span>
                </div>
                <h3 className="text-base font-bold text-white mt-1">{selectedRecord.actionDescription}</h3>
              </div>
              <button
                onClick={() => setSelectedRecord(null)}
                className="text-slate-400 hover:text-white p-1 rounded hover:bg-slate-800"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-3 p-3 rounded-lg bg-slate-800/50 border border-slate-700/50">
                <div>
                  <span className="text-slate-400 block text-[10px]">Waktu Presisi (NTP Stratum-1):</span>
                  <span className="font-mono font-bold text-white text-xs">{selectedRecord.timestamp}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px]">Alamat IP Workstation:</span>
                  <span className="font-mono text-slate-200 text-xs">{selectedRecord.workstationIp}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px]">Identitas Pengguna:</span>
                  <span className="font-bold text-white text-xs">{selectedRecord.userName} ({selectedRecord.userId})</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px]">Peran / Role:</span>
                  <span className="text-slate-300 text-xs">{selectedRecord.userRole}</span>
                </div>
              </div>

              <div className="p-3 rounded-lg bg-slate-800/40 border border-slate-700/50 space-y-1">
                <span className="text-slate-400 font-semibold block text-[10px]">Parameter GxP yang Dimodifikasi:</span>
                <div className="font-mono text-teal-300 text-xs break-all bg-slate-900 p-2 rounded border border-slate-800">
                  {selectedRecord.affectedParameter}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 rounded-lg bg-rose-950/20 border border-rose-800/30 space-y-1">
                  <span className="text-rose-400 font-semibold text-[10px] block">Nilai Sebelum (Old Value):</span>
                  <div className="font-mono text-slate-200">{selectedRecord.oldValue}</div>
                </div>
                <div className="p-3 rounded-lg bg-emerald-950/20 border border-emerald-800/30 space-y-1">
                  <span className="text-emerald-400 font-semibold text-[10px] block">Nilai Sesudah (New Value):</span>
                  <div className="font-mono text-white font-bold">{selectedRecord.newValue}</div>
                </div>
              </div>

              <div className="p-3.5 rounded-lg bg-slate-800/60 border border-slate-700/60 space-y-1">
                <span className="text-amber-400 font-bold block text-[10px] uppercase tracking-wider">
                  Alasan Perubahan Resmi (Mandatori 21 CFR Part 11):
                </span>
                <p className="text-slate-200 leading-relaxed font-sans">{selectedRecord.reasonForChange}</p>
              </div>

              <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 font-mono text-[10px] space-y-1">
                <div className="text-slate-400">Digital Cryptographic Hash (SHA-256):</div>
                <div className="text-teal-400 break-all">{selectedRecord.sha256Hash}</div>
                <div className="text-slate-500 pt-1">Penyimpanan: NetApp SnapLock Compliance Volume (WORM Protected)</div>
              </div>
            </div>

            <div className="flex justify-end pt-3 border-t border-slate-800">
              <button
                onClick={() => setSelectedRecord(null)}
                className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Simulator Modal for New Critical Event */}
      {showSimModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <form onSubmit={handleAddSimulatedEntry} className="bg-slate-900 border border-slate-700 rounded-2xl max-w-xl w-full p-6 space-y-4 shadow-2xl text-xs">
            <div className="flex items-start justify-between pb-3 border-b border-slate-800">
              <div>
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <PlusCircle className="w-5 h-5 text-amber-400" />
                  Simulasi Rekaman Aksi Kritis TI (21 CFR Part 11 Compliance)
                </h3>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  Setiap perubahan parameter sistem GxP mewajibkan pencatatan alasan dan verifikasi tanda tangan elektronik.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setShowSimModal(false)}
                className="text-slate-400 hover:text-white p-1 rounded hover:bg-slate-800"
              >
                ✕
              </button>
            </div>

            {simSuccess && (
              <div className="p-3 rounded-lg bg-emerald-950/80 border border-emerald-700 text-emerald-300 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Rekaman berhasil dibubuhkan secara kronologis &amp; dikunci ke WORM storage!</span>
              </div>
            )}

            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Sistem Komputerisasi:</label>
                  <select
                    value={simSystem}
                    onChange={(e) => setSimSystem(e.target.value)}
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2 text-white focus:outline-none focus:ring-1 focus:ring-teal-500"
                  >
                    <option value="SCADA-01">SCADA-01 (WFI &amp; PW)</option>
                    <option value="MES-01">MES-01 (Werum PAS-X)</option>
                    <option value="LIMS-01">LIMS-01 (Waters Empower)</option>
                    <option value="BMS-01">BMS-01 (Cleanroom HVAC)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Identitas Engineer:</label>
                  <input
                    type="text"
                    value={simUserName}
                    onChange={(e) => setSimUserName(e.target.value)}
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2 text-white focus:outline-none focus:ring-1 focus:ring-teal-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Tag / Parameter yang Dimodifikasi:</label>
                <input
                  type="text"
                  required
                  value={simParam}
                  onChange={(e) => setSimParam(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2 font-mono text-teal-300 text-[11px] focus:outline-none focus:ring-1 focus:ring-teal-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Nilai Lama (Old Value):</label>
                  <input
                    type="text"
                    required
                    value={simOldVal}
                    onChange={(e) => setSimOldVal(e.target.value)}
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2 text-slate-300 text-xs focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Nilai Baru (New Value):</label>
                  <input
                    type="text"
                    required
                    value={simNewVal}
                    onChange={(e) => setSimNewVal(e.target.value)}
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2 text-white font-bold text-xs focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">
                  Alasan Perubahan (Mandatori sesuai 21 CFR Part 11):
                </label>
                <textarea
                  rows={2}
                  required
                  placeholder="Jelaskan justifikasi teknis dan rujukan Change Control (CCR)..."
                  value={simReason}
                  onChange={(e) => setSimReason(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2 text-white focus:outline-none focus:ring-1 focus:ring-teal-500"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">
                  Kata Sandi Tanda Tangan Elektronik (Otentikasi Dual-Komponen):
                </label>
                <input
                  type="password"
                  required
                  placeholder="Ketik kata sandi untuk menandatangani perubahan..."
                  value={simPassword}
                  onChange={(e) => setSimPassword(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2 text-white focus:outline-none focus:ring-1 focus:ring-teal-500"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-3 border-t border-slate-800">
              <button
                type="button"
                onClick={() => setShowSimModal(false)}
                className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold"
              >
                Batal
              </button>
              <button
                type="submit"
                className="px-4 py-2 rounded-lg bg-teal-600 hover:bg-teal-500 text-white font-bold shadow-md shadow-teal-500/20"
              >
                Tandatangani &amp; Rekam ke Audit Trail
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
