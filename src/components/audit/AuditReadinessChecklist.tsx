import React, { useState, useEffect } from 'react';
import { 
  CheckCircle2, 
  AlertTriangle, 
  ShieldCheck, 
  Clock, 
  Calendar, 
  Search, 
  Filter, 
  Download, 
  RotateCcw, 
  PlusCircle, 
  CheckSquare, 
  Square, 
  FolderCheck, 
  FileText, 
  ExternalLink, 
  Check, 
  Award,
  ChevronRight,
  TrendingUp,
  Cpu,
  Building2,
  Info
} from 'lucide-react';
import { GXP_SYSTEMS, PLANT_PROFILE } from '../../data/pharmaData';

export interface AuditChecklistItem {
  id: string;
  systemCode: string;
  systemName: string;
  category: 'CSV & Validation' | '21 CFR Part 11 & ALCOA+' | 'Security & Access Control' | 'Change Control & SOP' | 'Backup & Disaster Recovery';
  title: string;
  description: string;
  regulatoryReference: string;
  evidenceArtifact: string;
  completed: boolean;
  criticality: 'Critical GxP' | 'Major GxP' | 'Standard';
  inspectionTarget: 'BPOM' | 'US FDA' | 'PIC/S' | 'All';
  verifiedBy?: string;
  verifiedDate?: string;
}

export const INITIAL_AUDIT_CHECKLIST: AuditChecklistItem[] = [
  // SCADA-01
  {
    id: 'chk-scada-01',
    systemCode: 'SCADA-01',
    systemName: 'Siemens WinCC SCADA WFI & PW',
    category: 'CSV & Validation',
    title: 'Laporan Kualifikasi Operasional (OQ) & Kinerja (PQ) Lengkap',
    description: 'Protokol OQ/PQ telah ditandatangani QA dengan pengujian tantangan sensor suhu sanitasi loop WFI ≥ 80°C.',
    regulatoryReference: 'BPOM CPOB 2024 Aneks 11 Butir 4.1',
    evidenceArtifact: 'VSR-2026-SCADA-01.pdf',
    completed: true,
    criticality: 'Critical GxP',
    inspectionTarget: 'All',
    verifiedBy: 'Heri Wibowo (Lead IT Engineer)',
    verifiedDate: '2026-09-18'
  },
  {
    id: 'chk-scada-02',
    systemCode: 'SCADA-01',
    systemName: 'Siemens WinCC SCADA WFI & PW',
    category: '21 CFR Part 11 & ALCOA+',
    title: 'Verifikasi Audit Trail WinCC & Sinkronisasi Jam NTP Stratum-1',
    description: 'Log audit trail tidak dapat di-disable dan jam sistem terkunci ke GPS Stratum-1 dengan deviasi < 5 ms.',
    regulatoryReference: '21 CFR 11.10(e) & PIC/S PI-041 Butir 9.4',
    evidenceArtifact: 'NTP-SYNC-SCADA-Q3.log',
    completed: true,
    criticality: 'Critical GxP',
    inspectionTarget: 'All',
    verifiedBy: 'Heri Wibowo (Lead IT Engineer)',
    verifiedDate: '2026-09-20'
  },
  {
    id: 'chk-scada-03',
    systemCode: 'SCADA-01',
    systemName: 'Siemens WinCC SCADA WFI & PW',
    category: 'Security & Access Control',
    title: 'Eliminasi Akun Generik / Akun Bersama di HMI Cleanroom',
    description: 'Seluruh operator menggunakan kartu badge RFID unik dan PIN individual untuk login HMI WinCC.',
    regulatoryReference: '21 CFR 11.200 & BPOM Aneks 11 Butir 7',
    evidenceArtifact: 'RBAC-SCADA-MATRIX-2026.xlsx',
    completed: true,
    criticality: 'Major GxP',
    inspectionTarget: 'BPOM',
    verifiedBy: 'Heri Wibowo (Lead IT Engineer)',
    verifiedDate: '2026-09-22'
  },

  // MES-01
  {
    id: 'chk-mes-01',
    systemCode: 'MES-01',
    systemName: 'Werum PAS-X Manufacturing Execution System',
    category: 'CSV & Validation',
    title: 'Validasi Master Batch Record (MBR) Elektronik & Penimbangan API',
    description: 'Kualifikasi alur dispensing dengan barcode interlock 2D DataMatrix dan toleransi penimbangan ± 0.5%.',
    regulatoryReference: 'ISPE GAMP 5 Ch. 7 & BPOM Aneks 11 Butir 5',
    evidenceArtifact: 'VAL-MBR-PASX-2026-004.pdf',
    completed: true,
    criticality: 'Critical GxP',
    inspectionTarget: 'All',
    verifiedBy: 'Heri Wibowo (Lead IT Engineer)',
    verifiedDate: '2026-09-25'
  },
  {
    id: 'chk-mes-02',
    systemCode: 'MES-01',
    systemName: 'Werum PAS-X Manufacturing Execution System',
    category: '21 CFR Part 11 & ALCOA+',
    title: 'Tanda Tangan Elektronik Ganda (Dual E-Signature) untuk Deviasi Batch',
    description: 'Persetujuan supervisor dan QA Compliance mewajibkan password otentikasi independen sesuai Part 11.200.',
    regulatoryReference: '21 CFR 11.50 & 11.100',
    evidenceArtifact: 'ESIG-VERIF-PASX-2026.pdf',
    completed: true,
    criticality: 'Critical GxP',
    inspectionTarget: 'US FDA',
    verifiedBy: 'Heri Wibowo (Lead IT Engineer)',
    verifiedDate: '2026-09-26'
  },
  {
    id: 'chk-mes-03',
    systemCode: 'MES-01',
    systemName: 'Werum PAS-X Manufacturing Execution System',
    category: 'Change Control & SOP',
    title: 'Verifikasi Penutupan CCR Delta OQ Scanner Barcode (CCR-2026-0043)',
    description: 'Protokol kualifikasi delta OQ pemindai nirkabel cleanroom selesai sebelum audit BPOM/FDA.',
    regulatoryReference: 'ISPE GAMP 5 Appendix M10',
    evidenceArtifact: 'CCR-2026-IT-0043-CLOSEOUT.pdf',
    completed: false,
    criticality: 'Major GxP',
    inspectionTarget: 'BPOM'
  },

  // LIMS-01
  {
    id: 'chk-lims-01',
    systemCode: 'LIMS-01',
    systemName: 'LabVantage LIMS & Waters Empower 3 CDS',
    category: '21 CFR Part 11 & ALCOA+',
    title: 'Penguncian Manual Integration pada Metode Kromatografi Rilis',
    description: 'Hak akses edit baseline manual dinonaktifkan permanen; audit trail aktif mencatat setiap kalkulasi ulang.',
    regulatoryReference: 'FDA Data Integrity Guidance Q&A (2018) & PIC/S PI-041',
    evidenceArtifact: 'CDS-AUDIT-POLICY-2026.pdf',
    completed: true,
    criticality: 'Critical GxP',
    inspectionTarget: 'US FDA',
    verifiedBy: 'Heri Wibowo (Lead IT Engineer)',
    verifiedDate: '2026-09-21'
  },
  {
    id: 'chk-lims-02',
    systemCode: 'LIMS-01',
    systemName: 'LabVantage LIMS & Waters Empower 3 CDS',
    category: 'Backup & Disaster Recovery',
    title: 'Penyimpanan Raw Data HPLC Langsung ke WORM SnapLock Storage',
    description: 'File instrumen (.dat/.raw) tidak disimpan pada harddisk lokal PC instrumen laboratorium QC.',
    regulatoryReference: 'BPOM Aneks 11 Butir 9 & ALCOA+ Enduring',
    evidenceArtifact: 'LIMS-WORM-STORAGE-MAPPING.pdf',
    completed: true,
    criticality: 'Critical GxP',
    inspectionTarget: 'All',
    verifiedBy: 'Heri Wibowo (Lead IT Engineer)',
    verifiedDate: '2026-09-24'
  },
  {
    id: 'chk-lims-03',
    systemCode: 'LIMS-01',
    systemName: 'LabVantage LIMS & Waters Empower 3 CDS',
    category: 'Security & Access Control',
    title: 'Review Hak Akses Triwulanan Akun Analis QC (QUAR Q3 2026)',
    description: 'Pemeriksaan pemisahan tugas (SoD) dan penghapusan akun analis yang telah mutasi/resign.',
    regulatoryReference: 'FDA 21 CFR 11.10(d) & ISO 27001 A.9',
    evidenceArtifact: 'QUAR-LIMS-Q3-2026-SIGNED.xlsx',
    completed: true,
    criticality: 'Major GxP',
    inspectionTarget: 'All',
    verifiedBy: 'Heri Wibowo (Lead IT Engineer)',
    verifiedDate: '2026-09-28'
  },

  // BMS-01
  {
    id: 'chk-bms-01',
    systemCode: 'BMS-01',
    systemName: 'Honeywell Experion Cleanroom BMS',
    category: 'CSV & Validation',
    title: 'Validasi Sensor Kaskade Tekanan Diferensial Cleanroom (Grade A-D)',
    description: 'Sertifikat kalibrasi terkalibrasi tertelusur KAN dan alarm limit strobo teruji di lapangan.',
    regulatoryReference: 'CPOB 2024 Bab 3 & Aneks 1 (Pembuatan Produk Steril)',
    evidenceArtifact: 'CERT-CAL-DP-2026.pdf',
    completed: true,
    criticality: 'Critical GxP',
    inspectionTarget: 'All',
    verifiedBy: 'Heri Wibowo (Lead IT Engineer)',
    verifiedDate: '2026-09-15'
  },
  {
    id: 'chk-bms-02',
    systemCode: 'BMS-01',
    systemName: 'Honeywell Experion Cleanroom BMS',
    category: 'Change Control & SOP',
    title: 'Tinjauan Validasi Periodik 2-Tahunan URS/OQ Kestabilan Tekanan',
    description: 'Dokumentasi peninjauan siklus hidup validasi periodik yang jatuh tempo Oktober 2026.',
    regulatoryReference: 'ISPE GAMP 5 Periodic Review Guidelines',
    evidenceArtifact: 'PRR-2026-BMS-01-DRAFT.pdf',
    completed: false,
    criticality: 'Major GxP',
    inspectionTarget: 'BPOM'
  },

  // ERP-01
  {
    id: 'chk-erp-01',
    systemCode: 'ERP-01',
    systemName: 'SAP S/4HANA Pharmaceutical ERP',
    category: 'Security & Access Control',
    title: 'Pemisahan Tugas Mutlak (SoD) Gudang vs Pembebasan Batch QA',
    description: 'Staf logistik tidak memiliki otorisasi Usage Decision (QA11/QA32) untuk meloloskan material karantina.',
    regulatoryReference: 'BPOM Aneks 11 Butir 7 & FDA cGMP 21 CFR 211.84',
    evidenceArtifact: 'SAP-SOD-AUDIT-REPORT-Q3.pdf',
    completed: true,
    criticality: 'Critical GxP',
    inspectionTarget: 'All',
    verifiedBy: 'Heri Wibowo (Lead IT Engineer)',
    verifiedDate: '2026-09-20'
  },
  {
    id: 'chk-erp-02',
    systemCode: 'ERP-01',
    systemName: 'SAP S/4HANA Pharmaceutical ERP',
    category: 'CSV & Validation',
    title: 'Requirements Traceability Matrix (RTM) Modul MM, PP, QM',
    description: 'Matriks ketertelusuran lengkap dari URS ke Konfigurasi, Test Script OQ, dan Laporan Kualifikasi.',
    regulatoryReference: 'ISPE GAMP 5 Appendix M4 Traceability',
    evidenceArtifact: 'RTM-SAP-S4HANA-REV2.xlsx',
    completed: true,
    criticality: 'Major GxP',
    inspectionTarget: 'All',
    verifiedBy: 'Heri Wibowo (Lead IT Engineer)',
    verifiedDate: '2026-09-22'
  },

  // SAN-01
  {
    id: 'chk-san-01',
    systemCode: 'SAN-01',
    systemName: 'NetApp SAN & SnapLock WORM',
    category: 'Backup & Disaster Recovery',
    title: 'Uji Simulasi Pemulihan Data dari Snapshot (Cold Restore Drill)',
    description: 'Waktu pemulihan data (RTO) tercapai < 45 menit (target SLA < 2 jam) dengan verifikasi hash SHA-256 100%.',
    regulatoryReference: 'BPOM Aneks 11 Butir 9.2 & PIC/S PI-041 Sec. 11',
    evidenceArtifact: 'DRP-RESTORE-DRILL-Q3-2026.pdf',
    completed: true,
    criticality: 'Critical GxP',
    inspectionTarget: 'All',
    verifiedBy: 'Heri Wibowo (Lead IT Engineer)',
    verifiedDate: '2026-09-17'
  },
  {
    id: 'chk-san-02',
    systemCode: 'SAN-01',
    systemName: 'NetApp SAN & SnapLock WORM',
    category: 'Backup & Disaster Recovery',
    title: 'Penyimpanan Salinan Pita Magnetik LTO-9 di Brankas Off-Site Tahan Api',
    description: 'Salinan ke-4 dari arsitektur backup 3-2-1-1 tersimpan pada fasilitas brankas media off-site.',
    regulatoryReference: 'BPOM Aneks 11 Butir 9.1 & ISO 27001 A.12',
    evidenceArtifact: 'TAPE-OFFSITE-HANDOVER-LOG.pdf',
    completed: true,
    criticality: 'Major GxP',
    inspectionTarget: 'BPOM',
    verifiedBy: 'Heri Wibowo (Lead IT Engineer)',
    verifiedDate: '2026-09-19'
  },

  // ACS-01
  {
    id: 'chk-acs-01',
    systemCode: 'ACS-01',
    systemName: 'LenelS2 OnGuard Access Control',
    category: 'Security & Access Control',
    title: 'Interlock Pintu Airlock Cleanroom & Integrasi Pelatihan Personel',
    description: 'Pintu kedua tidak dapat dibuka sebelum pintu pertama terkunci rapat; personil kadaluwarsa pelatihan ditolak.',
    regulatoryReference: 'CPOB 2024 Aneks 1 Butir 4.12 & FDA cGMP',
    evidenceArtifact: 'ACS-INTERLOCK-OQ-REPORT.pdf',
    completed: true,
    criticality: 'Major GxP',
    inspectionTarget: 'All',
    verifiedBy: 'Heri Wibowo (Lead IT Engineer)',
    verifiedDate: '2026-09-25'
  },

  // CCTV-01
  {
    id: 'chk-cctv-01',
    systemCode: 'CCTV-01',
    systemName: 'Milestone XProtect CCTV Surveillance',
    category: '21 CFR Part 11 & ALCOA+',
    title: 'Watermarking Kriptografis Frame Video Lini Pengisian Aseptik',
    description: 'Stempel waktu video sinkron dengan Stratum-1 dan rekaman dilindungi hash anti-manipulasi.',
    regulatoryReference: 'PIC/S PI-041 Sec. 9 & FDA Guidance on Evidence',
    evidenceArtifact: 'CCTV-WATERMARK-INTEGRITY-CERT.pdf',
    completed: true,
    criticality: 'Major GxP',
    inspectionTarget: 'US FDA',
    verifiedBy: 'Heri Wibowo (Lead IT Engineer)',
    verifiedDate: '2026-09-27'
  },
  {
    id: 'chk-cctv-02',
    systemCode: 'CCTV-01',
    systemName: 'Milestone XProtect CCTV Surveillance',
    category: 'Change Control & SOP',
    title: 'Pembaruan Log Retensi Penyimpanan Video 90 Hari Bersertifikat',
    description: 'Dokumentasi kapasitas harddisk NVR mencukupi 90 hari perekaman tanpa penimpaan dini.',
    regulatoryReference: 'SOP-SEC-004 Video Retention Policy',
    evidenceArtifact: 'CCTV-RETENTION-AUDIT-2026.pdf',
    completed: false,
    criticality: 'Standard',
    inspectionTarget: 'BPOM'
  }
];

export const AuditReadinessChecklist: React.FC<{ onOpenDossier?: () => void }> = ({ onOpenDossier }) => {
  const [checklist, setChecklist] = useState<AuditChecklistItem[]>(() => {
    const saved = localStorage.getItem('lizon_audit_readiness_checklist');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return INITIAL_AUDIT_CHECKLIST;
      }
    }
    return INITIAL_AUDIT_CHECKLIST;
  });

  const [systemFilter, setSystemFilter] = useState<string>('ALL');
  const [categoryFilter, setCategoryFilter] = useState<string>('ALL');
  const [statusFilter, setStatusFilter] = useState<'ALL' | 'COMPLETED' | 'PENDING'>('ALL');
  const [agencyFilter, setAgencyFilter] = useState<'ALL' | 'BPOM' | 'US FDA' | 'PIC/S'>('ALL');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [showAddModal, setShowAddModal] = useState<boolean>(false);

  // New item form
  const [newItemSystem, setNewItemSystem] = useState<string>('SCADA-01');
  const [newItemCategory, setNewItemCategory] = useState<AuditChecklistItem['category']>('CSV & Validation');
  const [newItemTitle, setNewItemTitle] = useState<string>('');
  const [newItemDesc, setNewItemDesc] = useState<string>('');
  const [newItemRef, setNewItemRef] = useState<string>('BPOM CPOB 2024 Aneks 11');
  const [newItemArtifact, setNewItemArtifact] = useState<string>('DOC-2026-001.pdf');
  const [newItemCriticality, setNewItemCriticality] = useState<AuditChecklistItem['criticality']>('Critical GxP');

  // Persist
  useEffect(() => {
    localStorage.setItem('lizon_audit_readiness_checklist', JSON.stringify(checklist));
  }, [checklist]);

  // Toggle item
  const handleToggle = (id: string) => {
    setChecklist(prev => prev.map(item => {
      if (item.id === id) {
        const nextState = !item.completed;
        return {
          ...item,
          completed: nextState,
          verifiedBy: nextState ? 'Heri Wibowo (Lead IT Engineer)' : undefined,
          verifiedDate: nextState ? new Date().toISOString().split('T')[0] : undefined
        };
      }
      return item;
    }));
  };

  // Reset to initial baseline
  const handleResetBaseline = () => {
    if (window.confirm('Kembalikan seluruh checklist ke baseline awal kualifikasi?')) {
      setChecklist(INITIAL_AUDIT_CHECKLIST);
    }
  };

  // Add custom item
  const handleAddItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newItemTitle.trim()) return;

    const sysObj = GXP_SYSTEMS.find(s => s.code === newItemSystem);
    const newItem: AuditChecklistItem = {
      id: `chk-custom-${Date.now()}`,
      systemCode: newItemSystem,
      systemName: sysObj ? sysObj.name : `${newItemSystem} GxP System`,
      category: newItemCategory,
      title: newItemTitle,
      description: newItemDesc || 'Pemeriksaan kepatuhan kualifikasi sistem komputerisasi farmasi.',
      regulatoryReference: newItemRef,
      evidenceArtifact: newItemArtifact,
      completed: false,
      criticality: newItemCriticality,
      inspectionTarget: 'All'
    };

    setChecklist([newItem, ...checklist]);
    setShowAddModal(false);
    setNewItemTitle('');
    setNewItemDesc('');
  };

  // Filtered Items
  const filteredItems = checklist.filter(item => {
    const matchesSearch = 
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.systemName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.systemCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.regulatoryReference.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesSystem = systemFilter === 'ALL' || item.systemCode === systemFilter;
    const matchesCategory = categoryFilter === 'ALL' || item.category === categoryFilter;
    const matchesStatus = 
      statusFilter === 'ALL' || 
      (statusFilter === 'COMPLETED' && item.completed) || 
      (statusFilter === 'PENDING' && !item.completed);
    const matchesAgency = 
      agencyFilter === 'ALL' || 
      item.inspectionTarget === 'All' || 
      item.inspectionTarget === agencyFilter;

    return matchesSearch && matchesSystem && matchesCategory && matchesStatus && matchesAgency;
  });

  // Calculate stats
  const totalCount = checklist.length;
  const completedCount = checklist.filter(i => i.completed).length;
  const pendingCount = totalCount - completedCount;
  const readinessPercent = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 100;

  // Breakdown per system
  const systemReadiness = GXP_SYSTEMS.map(sys => {
    const sysItems = checklist.filter(i => i.systemCode === sys.code);
    const sysTotal = sysItems.length;
    const sysDone = sysItems.filter(i => i.completed).length;
    const pct = sysTotal > 0 ? Math.round((sysDone / sysTotal) * 100) : 100;
    return {
      code: sys.code,
      name: sys.name,
      total: sysTotal,
      done: sysDone,
      percent: pct
    };
  });

  // Export CSV
  const handleExportCsv = () => {
    const headers = [
      'Item ID',
      'System Code',
      'System Name',
      'Category',
      'Checklist Title',
      'Description',
      'Regulatory Reference',
      'Evidence Artifact',
      'Status',
      'Criticality',
      'Target Inspection',
      'Verified By',
      'Verified Date'
    ];

    const rows = checklist.map(i => [
      `"${i.id}"`,
      `"${i.systemCode}"`,
      `"${i.systemName}"`,
      `"${i.category}"`,
      `"${i.title.replace(/"/g, '""')}"`,
      `"${i.description.replace(/"/g, '""')}"`,
      `"${i.regulatoryReference}"`,
      `"${i.evidenceArtifact}"`,
      i.completed ? 'COMPLETED' : 'PENDING ACTION',
      `"${i.criticality}"`,
      `"${i.inspectionTarget}"`,
      `"${i.verifiedBy || '-'}"`,
      `"${i.verifiedDate || '-'}"`
    ]);

    const csvContent = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `lizon_pharma_audit_readiness_checklist_${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner: Upcoming Regulatory Inspections Countdown */}
      <div className="p-5 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-850 to-emerald-950/60 border border-slate-700/80 shadow-xl space-y-4">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
              JADWAL INSPEKSI REGULASI MENDATANG • 2026/2027
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight flex items-center gap-2">
              <Award className="w-5 h-5 text-emerald-400" />
              Indikator Kesiapan Audit &amp; Verifikasi Kepatuhan GxP
            </h3>
            <p className="text-xs sm:text-sm text-slate-300">
              Pelacakan interaktif seluruh dokumen bukti (*audit evidence*), kontrol teknis ALCOA+, dan kualifikasi 8 sistem komputerisasi <strong className="text-white">PT. LIZON Pharma Indonesia</strong>.
            </p>
          </div>

          {/* Overall Gauge / Score Box */}
          <div className="flex items-center gap-4 bg-slate-900/90 p-4 rounded-xl border border-slate-700/90 shrink-0">
            <div className="relative w-16 h-16 flex items-center justify-center">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                <path
                  className="text-slate-800"
                  strokeWidth="3.5"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <path
                  className="text-emerald-500 transition-all duration-500"
                  strokeDasharray={`${readinessPercent}, 100`}
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
              </svg>
              <span className="absolute font-extrabold text-white text-base font-mono">
                {readinessPercent}%
              </span>
            </div>

            <div className="space-y-0.5 text-xs">
              <div className="font-bold text-white uppercase tracking-wider text-[11px]">
                {readinessPercent >= 90 ? 'Status: Siap Inspeksi' : 'Status: Tindakan Diperlukan'}
              </div>
              <div className="text-emerald-400 font-bold">{completedCount} Terverifikasi</div>
              <div className="text-amber-400 text-[11px]">{pendingCount} Item Masih Tertunda</div>
            </div>
          </div>
        </div>

        {/* 3 Inspection Countdown Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 border-t border-slate-800">
          <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center justify-between text-xs">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400">
                <Building2 className="w-4 h-4" />
              </div>
              <div>
                <div className="font-bold text-white">BPOM CPOB 2024 Re-Audit</div>
                <div className="text-[10px] text-slate-400">Target: 15 November 2026</div>
              </div>
            </div>
            <div className="text-right">
              <span className="font-mono font-bold text-emerald-400 text-xs">43 Hari</span>
              <div className="text-[9px] text-slate-400">Tersisa</div>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center justify-between text-xs">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-lg bg-blue-500/10 text-blue-400">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <div>
                <div className="font-bold text-white">US FDA Pre-Approval (PAI)</div>
                <div className="text-[10px] text-slate-400">Target: 12 Januari 2027</div>
              </div>
            </div>
            <div className="text-right">
              <span className="font-mono font-bold text-blue-400 text-xs">101 Hari</span>
              <div className="text-[9px] text-slate-400">Tersisa</div>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center justify-between text-xs">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-lg bg-purple-500/10 text-purple-400">
                <Award className="w-4 h-4" />
              </div>
              <div>
                <div className="font-bold text-white">PIC/S Data Integrity Audit</div>
                <div className="text-[10px] text-slate-400">Target: 20 Februari 2027</div>
              </div>
            </div>
            <div className="text-right">
              <span className="font-mono font-bold text-purple-400 text-xs">140 Hari</span>
              <div className="text-[9px] text-slate-400">Tersisa</div>
            </div>
          </div>
        </div>
      </div>

      {/* Visual Progress Bar per GxP System */}
      <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4 shadow-xl">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <h4 className="text-sm font-bold text-white flex items-center gap-2">
            <Cpu className="w-4 h-4 text-teal-400" />
            Tingkat Kesiapan per Sistem Komputerisasi Farmasi (8 Sistem)
          </h4>
          <span className="text-[11px] text-slate-400 font-mono">
            Rata-rata: <strong className="text-emerald-400">{readinessPercent}% Siap</strong>
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
          {systemReadiness.map(sys => {
            const isFull = sys.percent === 100;
            return (
              <div 
                key={sys.code}
                onClick={() => setSystemFilter(systemFilter === sys.code ? 'ALL' : sys.code)}
                className={`p-3 rounded-xl border transition cursor-pointer ${
                  systemFilter === sys.code
                    ? 'bg-teal-500/15 border-teal-500 text-white'
                    : 'bg-slate-850/60 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-1.5 font-bold text-slate-200">
                    <span className="font-mono text-teal-400">{sys.code}</span>
                  </div>
                  <span className={`font-mono text-xs font-bold ${isFull ? 'text-emerald-400' : 'text-amber-400'}`}>
                    {sys.percent}%
                  </span>
                </div>

                <div className="text-[11px] text-slate-400 truncate mb-2" title={sys.name}>
                  {sys.name}
                </div>

                {/* Progress bar */}
                <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                  <div 
                    className={`h-full transition-all duration-300 ${
                      isFull ? 'bg-emerald-500' : 'bg-gradient-to-r from-amber-500 to-teal-500'
                    }`}
                    style={{ width: `${sys.percent}%` }}
                  />
                </div>

                <div className="flex justify-between items-center text-[10px] text-slate-500 mt-1.5">
                  <span>{sys.done} dari {sys.total} item diverifikasi</span>
                  {isFull ? (
                    <span className="text-emerald-400 flex items-center gap-0.5 font-semibold">
                      <Check className="w-3 h-3" /> Siap
                    </span>
                  ) : (
                    <span className="text-amber-400 font-semibold">Tinjau</span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Checklist Filter and Search Controls */}
      <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-3">
        <div className="flex flex-col md:flex-row gap-3 text-xs">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            <input
              type="text"
              placeholder="Cari item checklist, sistem, rujukan regulasi, atau artefak bukti..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-slate-800 border border-slate-700 rounded-lg pl-9 pr-3 py-2 text-xs text-white focus:outline-none focus:ring-1 focus:ring-teal-500"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <select
              value={systemFilter}
              onChange={(e) => setSystemFilter(e.target.value)}
              className="bg-slate-800 border border-slate-700 text-slate-200 rounded-lg px-2.5 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-teal-500"
            >
              <option value="ALL">Semua Sistem (8 Sistem)</option>
              {GXP_SYSTEMS.map(s => (
                <option key={s.code} value={s.code}>{s.code} - {s.name.substring(0, 24)}...</option>
              ))}
            </select>

            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="bg-slate-800 border border-slate-700 text-slate-200 rounded-lg px-2.5 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-teal-500"
            >
              <option value="ALL">Semua Kategori Kepatuhan</option>
              <option value="CSV & Validation">CSV &amp; Kualifikasi V-Model</option>
              <option value="21 CFR Part 11 & ALCOA+">21 CFR Part 11 &amp; ALCOA+</option>
              <option value="Security & Access Control">Keamanan &amp; Kontrol Akses</option>
              <option value="Change Control & SOP">Kontrol Perubahan &amp; SOP</option>
              <option value="Backup & Disaster Recovery">Pencadangan &amp; Pemulihan DRP</option>
            </select>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as any)}
              className="bg-slate-800 border border-slate-700 text-slate-200 rounded-lg px-2.5 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-teal-500"
            >
              <option value="ALL">Semua Status Item</option>
              <option value="COMPLETED">Hanya Terverifikasi ({completedCount})</option>
              <option value="PENDING">Masih Tertunda ({pendingCount})</option>
            </select>

            <select
              value={agencyFilter}
              onChange={(e) => setAgencyFilter(e.target.value as any)}
              className="bg-slate-800 border border-slate-700 text-slate-200 rounded-lg px-2.5 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-teal-500"
            >
              <option value="ALL">Semua Target Inspeksi</option>
              <option value="BPOM">Badan POM RI</option>
              <option value="US FDA">US FDA</option>
              <option value="PIC/S">PIC/S</option>
            </select>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between text-[11px] text-slate-400 pt-2 border-t border-slate-800/80 gap-2">
          <div className="flex items-center gap-3">
            <span>Menampilkan <strong className="text-white">{filteredItems.length}</strong> dari {checklist.length} item checklist</span>
            {pendingCount > 0 && (
              <span className="text-amber-400 font-semibold flex items-center gap-1">
                <AlertTriangle className="w-3.5 h-3.5" />
                {pendingCount} item membutuhkan tindakan segera
              </span>
            )}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowAddModal(true)}
              className="px-2.5 py-1 rounded bg-teal-600 hover:bg-teal-500 text-white font-semibold text-[11px] flex items-center gap-1 transition"
            >
              <PlusCircle className="w-3.5 h-3.5" />
              <span>Tambah Item</span>
            </button>

            <button
              onClick={handleExportCsv}
              className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-semibold text-[11px] flex items-center gap-1 transition"
            >
              <Download className="w-3.5 h-3.5 text-blue-400" />
              <span>Ekspor CSV</span>
            </button>

            <button
              onClick={handleResetBaseline}
              className="px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white border border-slate-700 text-[11px] transition"
              title="Reset checklist ke status awal"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Interactive Checklist Items List */}
      <div className="space-y-3">
        {filteredItems.length === 0 ? (
          <div className="p-8 text-center rounded-2xl bg-slate-900 border border-slate-800 text-slate-500 text-xs">
            Tidak ditemukan item checklist yang cocok dengan kriteria filter saat ini.
          </div>
        ) : (
          filteredItems.map(item => {
            const isCritical = item.criticality === 'Critical GxP';
            return (
              <div 
                key={item.id}
                className={`p-4 rounded-xl border transition ${
                  item.completed 
                    ? 'bg-slate-900/90 border-slate-800 hover:border-emerald-500/40' 
                    : 'bg-slate-900/90 border-amber-500/40 hover:border-amber-500/80 shadow-md shadow-amber-950/20'
                }`}
              >
                <div className="flex items-start gap-3.5">
                  {/* Interactive Checkbox Button */}
                  <button
                    onClick={() => handleToggle(item.id)}
                    className="mt-0.5 text-slate-400 hover:text-white transition focus:outline-none shrink-0"
                    title={item.completed ? 'Klik untuk membatalkan verifikasi' : 'Klik untuk memverifikasi item siap audit'}
                  >
                    {item.completed ? (
                      <div className="w-6 h-6 rounded-md bg-emerald-600 text-white flex items-center justify-center shadow-md shadow-emerald-500/20">
                        <Check className="w-4 h-4 stroke-[3]" />
                      </div>
                    ) : (
                      <div className="w-6 h-6 rounded-md border-2 border-amber-500/70 hover:border-amber-400 bg-slate-800 flex items-center justify-center">
                        <span className="w-2 h-2 rounded bg-amber-400/50"></span>
                      </div>
                    )}
                  </button>

                  {/* Item Content */}
                  <div className="flex-1 space-y-1.5 text-xs">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-[10px] font-bold px-2 py-0.5 rounded bg-blue-950 text-blue-300 border border-blue-800">
                          {item.systemCode}
                        </span>
                        <span className="text-[10px] font-semibold text-slate-400">
                          {item.category}
                        </span>
                        <span className={`text-[9px] font-bold px-2 py-0.2 rounded ${
                          isCritical
                            ? 'bg-rose-950 text-rose-300 border border-rose-800'
                            : 'bg-slate-800 text-slate-300'
                        }`}>
                          {item.criticality}
                        </span>
                      </div>

                      {/* Status indicator */}
                      <div>
                        {item.completed ? (
                          <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-800">
                            <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                            Terverifikasi Siap Audit
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 text-[10px] font-bold text-amber-300 bg-amber-950/80 px-2 py-0.5 rounded border border-amber-800 animate-pulse">
                            <AlertTriangle className="w-3 h-3 text-amber-400" />
                            Memerlukan Tindakan Segera
                          </span>
                        )}
                      </div>
                    </div>

                    <h5 className={`text-sm font-bold leading-snug ${item.completed ? 'text-white' : 'text-amber-200'}`}>
                      {item.title}
                    </h5>

                    <p className="text-slate-300 text-[11px] leading-relaxed">
                      {item.description}
                    </p>

                    {/* Metadata strip */}
                    <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-800/80 text-[10px]">
                      <div className="flex items-center gap-3 text-slate-400">
                        <span>Rujukan: <strong className="text-slate-200">{item.regulatoryReference}</strong></span>
                        <span className="text-slate-600">|</span>
                        <span className="font-mono text-teal-400 flex items-center gap-1">
                          <FileText className="w-3 h-3" />
                          {item.evidenceArtifact}
                        </span>
                      </div>

                      <div className="flex items-center gap-3">
                        {item.verifiedBy && (
                          <span className="text-slate-400">
                            Diverifikasi oleh: <strong className="text-white">{item.verifiedBy.split('(')[0]}</strong> ({item.verifiedDate})
                          </span>
                        )}

                        {onOpenDossier && (
                          <button
                            onClick={onOpenDossier}
                            className="text-teal-400 hover:text-teal-300 flex items-center gap-1 font-semibold"
                            title="Buka dokumen bukti di Dossier Cepat"
                          >
                            <span>Buka Dokumen</span>
                            <ChevronRight className="w-3 h-3" />
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Add Custom Item Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-4">
          <form 
            onSubmit={handleAddItem}
            className="bg-slate-900 border border-slate-700 rounded-2xl max-w-lg w-full p-6 space-y-4 shadow-2xl text-xs"
          >
            <div className="flex items-start justify-between pb-3 border-b border-slate-800">
              <div>
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <PlusCircle className="w-5 h-5 text-teal-400" />
                  Tambah Item Checklist Kesiapan Audit
                </h3>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  Tambahkan kriteria verifikasi baru untuk inspeksi BPOM CPOB 2024 atau US FDA.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setShowAddModal(false)}
                className="text-slate-400 hover:text-white p-1 rounded hover:bg-slate-800"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Sistem Komputerisasi:</label>
                  <select
                    value={newItemSystem}
                    onChange={(e) => setNewItemSystem(e.target.value)}
                    className="w-full bg-slate-800 border border-slate-700 text-white rounded-lg p-2 text-xs focus:outline-none focus:ring-1 focus:ring-teal-500"
                  >
                    {GXP_SYSTEMS.map(s => (
                      <option key={s.code} value={s.code}>{s.code} - {s.name.substring(0, 20)}...</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Kategori Kepatuhan:</label>
                  <select
                    value={newItemCategory}
                    onChange={(e) => setNewItemCategory(e.target.value as any)}
                    className="w-full bg-slate-800 border border-slate-700 text-white rounded-lg p-2 text-xs focus:outline-none focus:ring-1 focus:ring-teal-500"
                  >
                    <option value="CSV & Validation">CSV &amp; Kualifikasi V-Model</option>
                    <option value="21 CFR Part 11 & ALCOA+">21 CFR Part 11 &amp; ALCOA+</option>
                    <option value="Security & Access Control">Keamanan &amp; Kontrol Akses</option>
                    <option value="Change Control & SOP">Kontrol Perubahan &amp; SOP</option>
                    <option value="Backup & Disaster Recovery">Pencadangan &amp; Pemulihan DRP</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Judul Poin Pemeriksaan (Checklist Title):</label>
                <input
                  type="text"
                  required
                  placeholder="Misal: Verifikasi Kualifikasi Sensor Konduktivitas WFI..."
                  value={newItemTitle}
                  onChange={(e) => setNewItemTitle(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 text-white rounded-lg p-2 text-xs focus:outline-none focus:ring-1 focus:ring-teal-500"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Penjelasan Kriteria Kesiapan:</label>
                <textarea
                  rows={2}
                  placeholder="Jelaskan parameter yang harus terpenuhi dan kondisi saat inspektur memeriksa..."
                  value={newItemDesc}
                  onChange={(e) => setNewItemDesc(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 text-white rounded-lg p-2 text-xs focus:outline-none focus:ring-1 focus:ring-teal-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Rujukan Regulasi:</label>
                  <input
                    type="text"
                    value={newItemRef}
                    onChange={(e) => setNewItemRef(e.target.value)}
                    className="w-full bg-slate-800 border border-slate-700 text-white rounded-lg p-2 text-xs focus:outline-none focus:ring-1 focus:ring-teal-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Nama Dokumen Bukti (Artifact):</label>
                  <input
                    type="text"
                    value={newItemArtifact}
                    onChange={(e) => setNewItemArtifact(e.target.value)}
                    className="w-full bg-slate-800 border border-slate-700 font-mono text-teal-300 text-[11px] rounded-lg p-2 focus:outline-none focus:ring-1 focus:ring-teal-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Tingkat Kekritisan GxP:</label>
                <select
                  value={newItemCriticality}
                  onChange={(e) => setNewItemCriticality(e.target.value as any)}
                  className="w-full bg-slate-800 border border-slate-700 text-white rounded-lg p-2 text-xs"
                >
                  <option value="Critical GxP">Critical GxP (Wajib Siap 100%)</option>
                  <option value="Major GxP">Major GxP (Dampak Mutu)</option>
                  <option value="Standard">Standard (Operasional &amp; Arsip)</option>
                </select>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-3 border-t border-slate-800">
              <button
                type="button"
                onClick={() => setShowAddModal(false)}
                className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold"
              >
                Batal
              </button>

              <button
                type="submit"
                className="px-4 py-2 rounded-lg bg-teal-600 hover:bg-teal-500 text-white font-bold shadow-md shadow-teal-500/20"
              >
                Tambahkan ke Checklist
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
