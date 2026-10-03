import React, { useState } from 'react';
import { 
  ShieldAlert, 
  AlertTriangle, 
  CheckCircle2, 
  HelpCircle, 
  Filter, 
  Search, 
  PlusCircle, 
  Download, 
  Printer, 
  FileText, 
  Eye, 
  Layers, 
  Cpu, 
  Check, 
  X, 
  Activity, 
  Sliders, 
  BookOpen, 
  ShieldCheck, 
  ChevronRight,
  TrendingDown,
  RotateCcw,
  Sparkles,
  Info
} from 'lucide-react';
import { 
  INITIAL_GAMP_RISK_ASSESSMENTS, 
  GAMP_SEVERITY_DEFINITIONS, 
  GAMP_PROBABILITY_DEFINITIONS, 
  GAMP_DETECTABILITY_DEFINITIONS,
  calculateGampInitialRiskClass,
  calculateRpn,
  getResidualRiskLevel
} from '../../data/gampRiskData';
import { GampRiskAssessment, GampSeverity, GampProbability, GampDetectability, GampCategory } from '../../types/pharma';
import { PLANT_PROFILE } from '../../data/pharmaData';

export const GxpRiskAssessmentModule: React.FC = () => {
  const [assessments, setAssessments] = useState<GampRiskAssessment[]>(() => {
    const saved = localStorage.getItem('lizon_gamp_risk_assessments');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return INITIAL_GAMP_RISK_ASSESSMENTS;
      }
    }
    return INITIAL_GAMP_RISK_ASSESSMENTS;
  });

  const [searchTerm, setSearchTerm] = useState('');
  const [systemFilter, setSystemFilter] = useState('ALL');
  const [riskClassFilter, setRiskClassFilter] = useState('ALL');
  const [gxpAspectFilter, setGxpAspectFilter] = useState('ALL');
  const [selectedAssessment, setSelectedAssessment] = useState<GampRiskAssessment | null>(null);

  // Modals
  const [showWizard, setShowWizard] = useState(false);
  const [showGuide, setShowGuide] = useState(false);

  // Wizard Form State
  const [wizSystem, setWizSystem] = useState('SCADA-01');
  const [wizProcessFunction, setWizProcessFunction] = useState('');
  const [wizGampCategory, setWizGampCategory] = useState<GampCategory>('Category 4');
  const [wizGxpAspect, setWizGxpAspect] = useState<'Patient Safety' | 'Product Quality' | 'Data Integrity' | 'Combination (Safety & Quality)'>('Product Quality');
  const [wizFailureMode, setWizFailureMode] = useState('');
  const [wizEffect, setWizEffect] = useState('');
  const [wizCause, setWizCause] = useState('');

  // Initial Scoring
  const [wizSeverity, setWizSeverity] = useState<GampSeverity>(3);
  const [wizSeverityReason, setWizSeverityReason] = useState('');
  const [wizProbability, setWizProbability] = useState<GampProbability>(2);
  const [wizProbabilityReason, setWizProbabilityReason] = useState('');
  const [wizDetectability, setWizDetectability] = useState<GampDetectability>(2);
  const [wizDetectabilityReason, setWizDetectabilityReason] = useState('');

  // Mitigations
  const [wizMitigations, setWizMitigations] = useState<string>('');
  const [wizTestingDeliverables, setWizTestingDeliverables] = useState<string>('');

  // Residual Scoring
  const [wizResSeverity, setWizResSeverity] = useState<GampSeverity>(3);
  const [wizResProbability, setWizResProbability] = useState<GampProbability>(1);
  const [wizResDetectability, setWizResDetectability] = useState<GampDetectability>(1);
  const [wizAssessor, setWizAssessor] = useState('Heri Wibowo (Lead IT Engineer)');
  const [wizQaReviewer, setWizQaReviewer] = useState('apt. Siti Rahmawati (QA Compliance Manager)');

  // Persistence
  const saveAssessments = (updated: GampRiskAssessment[]) => {
    setAssessments(updated);
    localStorage.setItem('lizon_gamp_risk_assessments', JSON.stringify(updated));
  };

  // Calculations for current wizard input
  const currentInitialClass = calculateGampInitialRiskClass(wizSeverity, wizProbability);
  const currentInitialRpn = calculateRpn(wizSeverity, wizProbability, wizDetectability);
  const currentResidualRpn = calculateRpn(wizResSeverity, wizResProbability, wizResDetectability);
  const currentResidualLevel = getResidualRiskLevel(currentResidualRpn, wizResSeverity);

  // Submit new assessment
  const handleSaveNewAssessment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!wizFailureMode.trim() || !wizEffect.trim()) return;

    const nextIdNum = assessments.length + 1;
    const newRecord: GampRiskAssessment = {
      id: `ra-custom-${Date.now()}`,
      riskId: `RA-2026-${wizSystem.split('-')[0]}-${String(nextIdNum).padStart(3, '0')}`,
      systemCode: wizSystem,
      systemName: wizSystem === 'SCADA-01' ? 'Siemens WinCC SCADA WFI' :
                  wizSystem === 'MES-01' ? 'Werum PAS-X MES EBR' :
                  wizSystem === 'LIMS-01' ? 'LabVantage LIMS & Waters Empower' :
                  wizSystem === 'BMS-01' ? 'Honeywell Experion Cleanroom BMS' :
                  wizSystem === 'ERP-01' ? 'SAP S/4HANA Pharmaceutical ERP' :
                  wizSystem === 'ACS-01' ? 'LenelS2 OnGuard Access Control' :
                  wizSystem === 'SAN-01' ? 'NetApp SAN & SnapLock WORM' : 'Milestone CCTV Surveillance',
      processFunction: wizProcessFunction || 'Fungsi Proses Kritis IT/OT',
      gampCategory: wizGampCategory,
      gxpAspect: wizGxpAspect,
      potentialFailureMode: wizFailureMode,
      potentialEffect: wizEffect,
      potentialCause: wizCause || 'Penyebab teknikal atau konfigurasi perangkat lunak.',
      severity: wizSeverity,
      severityReason: wizSeverityReason || 'Tingkat keparahan dinilai berdasarkan dampak terhadap atribut mutu kritis (CQA).',
      probability: wizProbability,
      probabilityReason: wizProbabilityReason || 'Probabilitas kejadian dinilai berdasarkan riwayat operasi.',
      initialRiskClass: currentInitialClass,
      detectability: wizDetectability,
      detectabilityReason: wizDetectabilityReason || 'Kemampuan deteksi sistem sebelum terjadi pelepasan batch.',
      initialRpn: currentInitialRpn,
      mitigationControls: wizMitigations.split('\n').filter(s => s.trim().length > 0),
      controlTypes: ['Technical / Automated', 'Procedural / SOP', 'Qualification Testing'],
      testingDeliverables: wizTestingDeliverables.split('\n').filter(s => s.trim().length > 0),
      residualSeverity: wizResSeverity,
      residualProbability: wizResProbability,
      residualDetectability: wizResDetectability,
      residualRpn: currentResidualRpn,
      residualRiskLevel: currentResidualLevel,
      status: 'Approved by QA',
      assessedBy: wizAssessor,
      qaApprovedBy: wizQaReviewer,
      lastAssessmentDate: new Date().toISOString().split('T')[0]
    };

    saveAssessments([newRecord, ...assessments]);
    setShowWizard(false);

    // Reset wizard
    setWizFailureMode('');
    setWizEffect('');
    setWizCause('');
    setWizMitigations('');
    setWizTestingDeliverables('');
  };

  // Export to CSV
  const handleExportCsv = () => {
    const headers = [
      'Risk ID',
      'System Code',
      'System Name',
      'Process Function',
      'GAMP Category',
      'GxP Aspect',
      'Potential Failure Mode',
      'Potential Effect',
      'Potential Cause',
      'Severity (S)',
      'Probability (P)',
      'Initial Risk Class',
      'Detectability (D)',
      'Initial RPN (S*P*D)',
      'Mitigation Controls',
      'Qualification Testing Deliverables',
      'Residual Severity (S)',
      'Residual Probability (P)',
      'Residual Detectability (D)',
      'Residual RPN',
      'Residual Risk Level',
      'Status',
      'Assessed By',
      'QA Approved By',
      'Assessment Date'
    ];

    const rows = assessments.map(a => [
      `"${a.riskId}"`,
      `"${a.systemCode}"`,
      `"${a.systemName}"`,
      `"${a.processFunction.replace(/"/g, '""')}"`,
      `"${a.gampCategory}"`,
      `"${a.gxpAspect}"`,
      `"${a.potentialFailureMode.replace(/"/g, '""')}"`,
      `"${a.potentialEffect.replace(/"/g, '""')}"`,
      `"${a.potentialCause.replace(/"/g, '""')}"`,
      a.severity,
      a.probability,
      `"${a.initialRiskClass}"`,
      a.detectability,
      a.initialRpn,
      `"${a.mitigationControls.join(' | ').replace(/"/g, '""')}"`,
      `"${a.testingDeliverables.join(' | ').replace(/"/g, '""')}"`,
      a.residualSeverity,
      a.residualProbability,
      a.residualDetectability,
      a.residualRpn,
      `"${a.residualRiskLevel}"`,
      `"${a.status}"`,
      `"${a.assessedBy}"`,
      `"${a.qaApprovedBy}"`,
      `"${a.lastAssessmentDate}"`
    ]);

    const csvContent = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `lizon_pharma_gamp5_risk_assessment_${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // Filtered List
  const filteredAssessments = assessments.filter(a => {
    const matchesSearch = 
      a.riskId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      a.potentialFailureMode.toLowerCase().includes(searchTerm.toLowerCase()) ||
      a.potentialEffect.toLowerCase().includes(searchTerm.toLowerCase()) ||
      a.processFunction.toLowerCase().includes(searchTerm.toLowerCase()) ||
      a.systemName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      a.systemCode.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesSystem = systemFilter === 'ALL' || a.systemCode === systemFilter;
    const matchesRiskClass = riskClassFilter === 'ALL' || a.initialRiskClass === riskClassFilter;
    const matchesAspect = gxpAspectFilter === 'ALL' || a.gxpAspect.includes(gxpAspectFilter);

    return matchesSearch && matchesSystem && matchesRiskClass && matchesAspect;
  });

  // Calculate stats
  const totalAssessments = assessments.length;
  const initialClass1Count = assessments.filter(a => a.initialRiskClass === 'Class 1 (High)').length;
  const initialClass2Count = assessments.filter(a => a.initialRiskClass === 'Class 2 (Medium)').length;
  const initialClass3Count = assessments.filter(a => a.initialRiskClass === 'Class 3 (Low)').length;
  const residualLowRiskCount = assessments.filter(a => a.residualRiskLevel === 'Low Risk').length;
  const mitigationSuccessRate = totalAssessments > 0 ? ((residualLowRiskCount / totalAssessments) * 100).toFixed(1) : '100';

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 p-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl">
        <div className="space-y-2">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs font-semibold">
              <span className="h-2 w-2 rounded-full bg-rose-400 animate-pulse"></span>
              ISPE GAMP 5 SECOND EDITION • ICH Q9 QUALITY RISK MANAGEMENT
            </span>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-300 font-mono">
              FMEA S &times; P &times; D Matrix
            </span>
          </div>

          <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2 tracking-tight">
            Penilaian Risiko Kepatuhan GxP (ISPE GAMP 5 Risk Assessment)
          </h2>

          <p className="text-xs sm:text-sm text-slate-300 max-w-3xl leading-relaxed">
            Metodologi evaluasi risiko formal terstruktur berbasis kegagalan fungsi (*Failure Mode and Effects Analysis - FMEA*) untuk menentukan ruang lingkup kualifikasi, kontrol mitigasi teknis, dan verifikasi integritas data sistem IT/OT di <strong className="text-white">PT. LIZON Pharma Indonesia</strong>.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap lg:flex-col gap-2 shrink-0">
          <button
            onClick={() => setShowWizard(true)}
            className="flex-1 lg:flex-none px-4 py-2 text-xs font-bold rounded-xl bg-gradient-to-r from-teal-500 to-blue-600 hover:from-teal-400 hover:to-blue-500 text-white shadow-md shadow-teal-500/20 flex items-center justify-center gap-2 transition"
          >
            <PlusCircle className="w-4 h-4" />
            <span>+ Penilaian Risiko Baru</span>
          </button>

          <button
            onClick={() => setShowGuide(true)}
            className="flex-1 lg:flex-none px-4 py-2 text-xs font-semibold rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 flex items-center justify-center gap-2 transition"
          >
            <BookOpen className="w-4 h-4 text-teal-400" />
            <span>Panduan Skor (S &times; P &times; D)</span>
          </button>

          <button
            onClick={handleExportCsv}
            className="flex-1 lg:flex-none px-4 py-2 text-xs font-semibold rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 flex items-center justify-center gap-2 transition"
          >
            <Download className="w-4 h-4 text-blue-400" />
            <span>Ekspor Matriks FMEA (CSV)</span>
          </button>
        </div>
      </div>

      {/* KPI Summary Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
          <span className="text-[10px] uppercase font-semibold text-slate-400 block">Total Modus Kegagalan</span>
          <div className="text-2xl font-extrabold text-white">{totalAssessments} Item</div>
          <span className="text-[10px] text-teal-400">8 Sistem Kritis GxP Terkualifikasi</span>
        </div>

        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
          <span className="text-[10px] uppercase font-semibold text-slate-400 block">Risiko Awal Kelas 1 (Tinggi)</span>
          <div className="text-2xl font-extrabold text-rose-400 flex items-center gap-2">
            <span>{initialClass1Count}</span>
            <span className="text-xs px-2 py-0.5 rounded bg-rose-950 text-rose-300 font-mono">Prioritas 1</span>
          </div>
          <span className="text-[10px] text-slate-400">Wajib Uji Challenge OQ &amp; Interlock</span>
        </div>

        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
          <span className="text-[10px] uppercase font-semibold text-slate-400 block">Tingkat Mitigasi Sukses</span>
          <div className="text-2xl font-extrabold text-emerald-400 flex items-center gap-2">
            <span>{mitigationSuccessRate}%</span>
            <TrendingDown className="w-4 h-4 text-emerald-400" />
          </div>
          <span className="text-[10px] text-emerald-400">{residualLowRiskCount} dari {totalAssessments} Risiko Residual Rendah</span>
        </div>

        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
          <span className="text-[10px] uppercase font-semibold text-slate-400 block">Persetujuan QA Compliance</span>
          <div className="text-2xl font-extrabold text-teal-300 flex items-center gap-2">
            <span>100%</span>
            <ShieldCheck className="w-4 h-4 text-teal-400" />
          </div>
          <span className="text-[10px] text-slate-400">Ditandatangani apt. Siti Rahmawati</span>
        </div>
      </div>

      {/* ISPE GAMP 5 Initial Risk Matrix Grid (Severity vs Probability Heatmap) */}
      <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-800">
          <div>
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Layers className="w-4 h-4 text-teal-400" />
              Matriks Penentuan Kelas Risiko Awal GAMP 5 (Keparahan vs Probabilitas)
            </h3>
            <p className="text-[11px] text-slate-400 mt-0.5">
              Klik pada kotak matriks untuk memfilter daftar penilaian risiko sesuai klasifikasi GAMP 5.
            </p>
          </div>

          <div className="flex items-center gap-3 text-[10px]">
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded bg-rose-600/40 border border-rose-500"></span>
              <strong className="text-rose-300">Kelas 1 (High)</strong>
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded bg-amber-600/40 border border-amber-500"></span>
              <strong className="text-amber-300">Kelas 2 (Medium)</strong>
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded bg-emerald-600/40 border border-emerald-500"></span>
              <strong className="text-emerald-300">Kelas 3 (Low)</strong>
            </span>
          </div>
        </div>

        {/* 3x3 Heatmap Grid Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-center text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-800 text-[11px] text-slate-400 font-mono">
                <th className="p-2 text-left w-36">Keparahan Dampak (Severity)</th>
                <th className="p-2 w-1/3">Probabilitas Rendah (P = 1)<br/><span className="text-[10px] text-slate-500">&lt; 1x dalam 3 thn</span></th>
                <th className="p-2 w-1/3">Probabilitas Sedang (P = 2)<br/><span className="text-[10px] text-slate-500">1 - 2x per tahun</span></th>
                <th className="p-2 w-1/3">Probabilitas Tinggi (P = 3)<br/><span className="text-[10px] text-slate-500">&gt; 1x per bulan</span></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80">
              {/* Row S = 3 (High) */}
              <tr>
                <td className="p-3 text-left font-bold text-rose-400 bg-slate-950/50">
                  <div className="text-xs">S = 3 (Tinggi / Kritis)</div>
                  <div className="text-[10px] text-slate-400 font-normal">Dampak Pasien &amp; Mutu CQA</div>
                </td>
                
                {/* S3, P1 -> Class 2 */}
                <td 
                  onClick={() => setRiskClassFilter(riskClassFilter === 'Class 2 (Medium)' ? 'ALL' : 'Class 2 (Medium)')}
                  className="p-3 bg-amber-950/20 hover:bg-amber-950/40 border border-amber-800/40 cursor-pointer transition rounded-lg"
                >
                  <div className="font-bold text-amber-300 text-xs">KELAS 2 (Sedang)</div>
                  <div className="text-[11px] text-slate-300 mt-1">
                    {assessments.filter(a => a.severity === 3 && a.probability === 1).length} Sistem (ERP, SAN)
                  </div>
                </td>

                {/* S3, P2 -> Class 1 */}
                <td 
                  onClick={() => setRiskClassFilter(riskClassFilter === 'Class 1 (High)' ? 'ALL' : 'Class 1 (High)')}
                  className="p-3 bg-rose-950/40 hover:bg-rose-950/60 border border-rose-800/60 cursor-pointer transition rounded-lg"
                >
                  <div className="font-bold text-rose-300 text-xs">KELAS 1 (Tinggi)</div>
                  <div className="text-[11px] text-slate-200 mt-1">
                    {assessments.filter(a => a.severity === 3 && a.probability === 2).length} Sistem (SCADA, MES, LIMS, BMS, ACS)
                  </div>
                </td>

                {/* S3, P3 -> Class 1 */}
                <td 
                  onClick={() => setRiskClassFilter(riskClassFilter === 'Class 1 (High)' ? 'ALL' : 'Class 1 (High)')}
                  className="p-3 bg-rose-950/40 hover:bg-rose-950/60 border border-rose-800/60 cursor-pointer transition rounded-lg"
                >
                  <div className="font-bold text-rose-300 text-xs">KELAS 1 (Tinggi)</div>
                  <div className="text-[11px] text-slate-400 mt-1">
                    {assessments.filter(a => a.severity === 3 && a.probability === 3).length} Sistem
                  </div>
                </td>
              </tr>

              {/* Row S = 2 (Medium) */}
              <tr>
                <td className="p-3 text-left font-bold text-amber-400 bg-slate-950/50">
                  <div className="text-xs">S = 2 (Sedang)</div>
                  <div className="text-[10px] text-slate-400 font-normal">Dampak Tidak Langsung</div>
                </td>

                {/* S2, P1 -> Class 3 */}
                <td 
                  onClick={() => setRiskClassFilter(riskClassFilter === 'Class 3 (Low)' ? 'ALL' : 'Class 3 (Low)')}
                  className="p-3 bg-emerald-950/20 hover:bg-emerald-950/40 border border-emerald-800/40 cursor-pointer transition rounded-lg"
                >
                  <div className="font-bold text-emerald-300 text-xs">KELAS 3 (Rendah)</div>
                  <div className="text-[11px] text-slate-400 mt-1">0 Sistem</div>
                </td>

                {/* S2, P2 -> Class 2 */}
                <td 
                  onClick={() => setRiskClassFilter(riskClassFilter === 'Class 2 (Medium)' ? 'ALL' : 'Class 2 (Medium)')}
                  className="p-3 bg-amber-950/20 hover:bg-amber-950/40 border border-amber-800/40 cursor-pointer transition rounded-lg"
                >
                  <div className="font-bold text-amber-300 text-xs">KELAS 2 (Sedang)</div>
                  <div className="text-[11px] text-slate-200 mt-1">
                    {assessments.filter(a => a.severity === 2 && a.probability === 2).length} Sistem (CCTV NTP)
                  </div>
                </td>

                {/* S2, P3 -> Class 1 */}
                <td 
                  onClick={() => setRiskClassFilter(riskClassFilter === 'Class 1 (High)' ? 'ALL' : 'Class 1 (High)')}
                  className="p-3 bg-rose-950/40 hover:bg-rose-950/60 border border-rose-800/60 cursor-pointer transition rounded-lg"
                >
                  <div className="font-bold text-rose-300 text-xs">KELAS 1 (Tinggi)</div>
                  <div className="text-[11px] text-slate-400 mt-1">0 Sistem</div>
                </td>
              </tr>

              {/* Row S = 1 (Low) */}
              <tr>
                <td className="p-3 text-left font-bold text-emerald-400 bg-slate-950/50">
                  <div className="text-xs">S = 1 (Rendah)</div>
                  <div className="text-[10px] text-slate-400 font-normal">Operasional Minor</div>
                </td>

                {/* S1, P1 -> Class 3 */}
                <td 
                  onClick={() => setRiskClassFilter(riskClassFilter === 'Class 3 (Low)' ? 'ALL' : 'Class 3 (Low)')}
                  className="p-3 bg-emerald-950/20 hover:bg-emerald-950/40 border border-emerald-800/40 cursor-pointer transition rounded-lg"
                >
                  <div className="font-bold text-emerald-300 text-xs">KELAS 3 (Rendah)</div>
                  <div className="text-[11px] text-slate-400 mt-1">0 Sistem</div>
                </td>

                {/* S1, P2 -> Class 3 */}
                <td 
                  onClick={() => setRiskClassFilter(riskClassFilter === 'Class 3 (Low)' ? 'ALL' : 'Class 3 (Low)')}
                  className="p-3 bg-emerald-950/20 hover:bg-emerald-950/40 border border-emerald-800/40 cursor-pointer transition rounded-lg"
                >
                  <div className="font-bold text-emerald-300 text-xs">KELAS 3 (Rendah)</div>
                  <div className="text-[11px] text-slate-400 mt-1">0 Sistem</div>
                </td>

                {/* S1, P3 -> Class 2 */}
                <td 
                  onClick={() => setRiskClassFilter(riskClassFilter === 'Class 2 (Medium)' ? 'ALL' : 'Class 2 (Medium)')}
                  className="p-3 bg-amber-950/20 hover:bg-amber-950/40 border border-amber-800/40 cursor-pointer transition rounded-lg"
                >
                  <div className="font-bold text-amber-300 text-xs">KELAS 2 (Sedang)</div>
                  <div className="text-[11px] text-slate-400 mt-1">0 Sistem</div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 space-y-3">
        <div className="flex flex-col md:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            <input
              type="text"
              placeholder="Cari modus kegagalan, sistem, efek mutu, atau ID risiko..."
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
              <option value="ERP-01">ERP-01 (SAP S/4HANA)</option>
              <option value="SAN-01">SAN-01 (Storage WORM)</option>
              <option value="ACS-01">ACS-01 (Access Control)</option>
              <option value="CCTV-01">CCTV-01 (Surveillance)</option>
            </select>

            <select
              value={riskClassFilter}
              onChange={(e) => setRiskClassFilter(e.target.value)}
              className="bg-slate-800 border border-slate-700 text-slate-200 rounded-lg px-2.5 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-teal-500"
            >
              <option value="ALL">Semua Kelas Risiko Awal</option>
              <option value="Class 1 (High)">Kelas 1 (High Risk)</option>
              <option value="Class 2 (Medium)">Kelas 2 (Medium Risk)</option>
              <option value="Class 3 (Low)">Kelas 3 (Low Risk)</option>
            </select>

            <select
              value={gxpAspectFilter}
              onChange={(e) => setGxpAspectFilter(e.target.value)}
              className="bg-slate-800 border border-slate-700 text-slate-200 rounded-lg px-2.5 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-teal-500"
            >
              <option value="ALL">Semua Aspek GxP</option>
              <option value="Safety">Patient Safety</option>
              <option value="Quality">Product Quality</option>
              <option value="Data Integrity">Data Integrity</option>
            </select>
          </div>
        </div>

        <div className="flex items-center justify-between text-[11px] text-slate-400 pt-2 border-t border-slate-800/80">
          <span>
            Menampilkan <strong className="text-white">{filteredAssessments.length}</strong> dari {assessments.length} asesmen risiko formal
          </span>
          <span className="text-teal-400 font-mono">
            Standar Verifikasi: URS &rarr; FS &rarr; FMEA &rarr; OQ Challenge Testing
          </span>
        </div>
      </div>

      {/* Risk Assessments Table */}
      <div className="rounded-2xl bg-slate-900 border border-slate-800 overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-800/80 text-slate-200 uppercase font-mono text-[10px] tracking-wider border-b border-slate-700">
              <tr>
                <th className="p-3">ID Risiko &amp; Sistem</th>
                <th className="p-3">Fungsi &amp; Modus Kegagalan</th>
                <th className="p-3 text-center">Skor Awal (S &times; P &times; D)</th>
                <th className="p-3 text-center">Kelas Risiko Awal</th>
                <th className="p-3">Strategi Kontrol Mitigasi TI</th>
                <th className="p-3 text-center">Risiko Residual</th>
                <th className="p-3 text-center">Detail</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {filteredAssessments.length === 0 ? (
                <tr>
                  <td colSpan={7} className="p-8 text-center text-slate-500">
                    Tidak ditemukan data penilaian risiko yang cocok dengan kriteria filter.
                  </td>
                </tr>
              ) : (
                filteredAssessments.map((ra) => {
                  const isClass1 = ra.initialRiskClass === 'Class 1 (High)';
                  const isClass2 = ra.initialRiskClass === 'Class 2 (Medium)';

                  return (
                    <tr key={ra.id} className="hover:bg-slate-850/60 transition">
                      {/* Risk ID & System */}
                      <td className="p-3">
                        <div className="font-mono font-bold text-teal-400">{ra.riskId}</div>
                        <div className="flex items-center gap-1.5 mt-1">
                          <span className="px-1.5 py-0.2 rounded bg-blue-950 text-blue-300 border border-blue-800 font-mono text-[10px] font-bold">
                            {ra.systemCode}
                          </span>
                          <span className="text-[10px] text-slate-400 font-mono">{ra.gampCategory}</span>
                        </div>
                        <div className="text-[10px] text-slate-400 mt-1 font-semibold">{ra.gxpAspect}</div>
                      </td>

                      {/* Process & Failure Mode */}
                      <td className="p-3 max-w-xs">
                        <div className="font-bold text-white text-[11px] leading-snug">
                          {ra.processFunction}
                        </div>
                        <div className="text-[11px] text-slate-300 mt-1 bg-slate-950/60 p-2 rounded border border-slate-800/80 leading-snug">
                          <span className="text-amber-400 font-semibold block text-[10px]">Potensi Kegagalan:</span>
                          {ra.potentialFailureMode}
                        </div>
                      </td>

                      {/* Initial Scoring breakdown S x P x D = RPN */}
                      <td className="p-3 text-center">
                        <div className="inline-flex items-center gap-1 font-mono text-xs font-bold bg-slate-800 px-2 py-1 rounded border border-slate-700">
                          <span className="text-rose-400" title="Severity (1-3)">S:{ra.severity}</span>
                          <span className="text-slate-500">&times;</span>
                          <span className="text-amber-400" title="Probability (1-3)">P:{ra.probability}</span>
                          <span className="text-slate-500">&times;</span>
                          <span className="text-blue-400" title="Detectability (1-3)">D:{ra.detectability}</span>
                        </div>
                        <div className="font-mono text-[10px] text-slate-400 mt-1">
                          RPN Awal: <strong className="text-white">{ra.initialRpn}</strong> / 27
                        </div>
                      </td>

                      {/* Initial Risk Class */}
                      <td className="p-3 text-center">
                        <span className={`inline-block px-2.5 py-1 rounded-full text-[10px] font-bold ${
                          isClass1 
                            ? 'bg-rose-950 text-rose-300 border border-rose-800 animate-pulse'
                            : isClass2
                            ? 'bg-amber-950 text-amber-300 border border-amber-800'
                            : 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                        }`}>
                          {ra.initialRiskClass}
                        </span>
                        <div className="text-[9px] text-slate-500 mt-1">
                          {isClass1 ? 'Challenge OQ Wajib' : 'Standard OQ'}
                        </div>
                      </td>

                      {/* Mitigations */}
                      <td className="p-3 max-w-sm">
                        <div className="space-y-1 text-[11px]">
                          {ra.mitigationControls.slice(0, 2).map((m, idx) => (
                            <div key={idx} className="flex items-start gap-1.5 text-slate-300">
                              <span className="w-1.5 h-1.5 rounded-full bg-teal-400 mt-1.5 shrink-0"></span>
                              <span className="line-clamp-2">{m}</span>
                            </div>
                          ))}
                          {ra.mitigationControls.length > 2 && (
                            <span className="text-[10px] text-teal-400 font-semibold cursor-pointer" onClick={() => setSelectedAssessment(ra)}>
                              +{ra.mitigationControls.length - 2} kontrol lainnya...
                            </span>
                          )}
                        </div>
                      </td>

                      {/* Residual Risk */}
                      <td className="p-3 text-center">
                        <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800 font-bold text-[10px]">
                          {ra.residualRiskLevel}
                        </span>
                        <div className="font-mono text-[10px] text-slate-400 mt-1">
                          RPN Akhir: <strong className="text-emerald-400">{ra.residualRpn}</strong>
                        </div>
                      </td>

                      {/* View Action */}
                      <td className="p-3 text-center">
                        <button
                          onClick={() => setSelectedAssessment(ra)}
                          className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 transition"
                          title="Lihat rincian kualifikasi & berkas FMEA lengkap"
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Assessment Detail Modal */}
      {selectedAssessment && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-3xl w-full p-6 space-y-4 shadow-2xl max-h-[92vh] overflow-y-auto text-xs">
            <div className="flex items-start justify-between pb-3 border-b border-slate-800">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-bold text-teal-400 bg-teal-500/10 px-2 py-0.5 rounded">
                    {selectedAssessment.riskId}
                  </span>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-blue-950 text-blue-300 border border-blue-800 font-mono">
                    {selectedAssessment.systemCode} • {selectedAssessment.gampCategory}
                  </span>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800 font-bold">
                    {selectedAssessment.status}
                  </span>
                </div>
                <h3 className="text-base font-bold text-white mt-1.5">{selectedAssessment.processFunction}</h3>
                <div className="text-[11px] text-slate-400">{selectedAssessment.systemName}</div>
              </div>

              <button
                onClick={() => setSelectedAssessment(null)}
                className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content Breakdown */}
            <div className="space-y-4 text-xs">
              {/* Failure Mode & Effect Box */}
              <div className="p-3.5 rounded-xl bg-slate-800/60 border border-slate-700/60 space-y-2">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-rose-400 block">
                    Potensi Modus Kegagalan (Potential Failure Mode):
                  </span>
                  <p className="text-slate-200 mt-0.5 leading-relaxed">{selectedAssessment.potentialFailureMode}</p>
                </div>

                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400 block">
                    Potensi Efek Mutu &amp; Pasien (Potential Effect on CQA):
                  </span>
                  <p className="text-slate-300 mt-0.5 leading-relaxed">{selectedAssessment.potentialEffect}</p>
                </div>

                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                    Penyebab Potensial (Root Cause Hypothesis):
                  </span>
                  <p className="text-slate-300 mt-0.5 leading-relaxed">{selectedAssessment.potentialCause}</p>
                </div>
              </div>

              {/* Pre vs Post Mitigation Comparison Matrix */}
              <div className="grid grid-cols-2 gap-3">
                {/* Pre-Mitigation */}
                <div className="p-3.5 rounded-xl bg-rose-950/20 border border-rose-800/40 space-y-2">
                  <div className="font-bold text-rose-300 text-xs flex items-center justify-between">
                    <span>1. Penilaian Awal (Pre-Mitigation)</span>
                    <span className="px-2 py-0.2 rounded bg-rose-950 text-rose-300 text-[10px] border border-rose-800">
                      {selectedAssessment.initialRiskClass}
                    </span>
                  </div>

                  <div className="space-y-1 font-mono text-[11px]">
                    <div className="flex justify-between text-slate-300">
                      <span>Keparahan (Severity):</span>
                      <strong className="text-rose-400">{selectedAssessment.severity} / 3</strong>
                    </div>
                    <div className="flex justify-between text-slate-300">
                      <span>Probabilitas (Probability):</span>
                      <strong className="text-amber-400">{selectedAssessment.probability} / 3</strong>
                    </div>
                    <div className="flex justify-between text-slate-300">
                      <span>Deteksi (Detectability):</span>
                      <strong className="text-blue-400">{selectedAssessment.detectability} / 3</strong>
                    </div>
                    <div className="flex justify-between text-white font-bold pt-1 border-t border-rose-900/60">
                      <span>RPN Awal:</span>
                      <span className="text-rose-300">{selectedAssessment.initialRpn}</span>
                    </div>
                  </div>

                  <div className="text-[10px] text-slate-400 pt-1">
                    {selectedAssessment.severityReason}
                  </div>
                </div>

                {/* Post-Mitigation */}
                <div className="p-3.5 rounded-xl bg-emerald-950/20 border border-emerald-800/40 space-y-2">
                  <div className="font-bold text-emerald-300 text-xs flex items-center justify-between">
                    <span>2. Risiko Residual (Post-Mitigation)</span>
                    <span className="px-2 py-0.2 rounded bg-emerald-950 text-emerald-300 text-[10px] border border-emerald-800">
                      {selectedAssessment.residualRiskLevel}
                    </span>
                  </div>

                  <div className="space-y-1 font-mono text-[11px]">
                    <div className="flex justify-between text-slate-300">
                      <span>Keparahan Residual:</span>
                      <strong className="text-emerald-400">{selectedAssessment.residualSeverity} / 3</strong>
                    </div>
                    <div className="flex justify-between text-slate-300">
                      <span>Probabilitas Residual:</span>
                      <strong className="text-emerald-400">{selectedAssessment.residualProbability} / 3</strong>
                    </div>
                    <div className="flex justify-between text-slate-300">
                      <span>Deteksi Residual:</span>
                      <strong className="text-emerald-400">{selectedAssessment.residualDetectability} / 3</strong>
                    </div>
                    <div className="flex justify-between text-white font-bold pt-1 border-t border-emerald-900/60">
                      <span>RPN Residual:</span>
                      <span className="text-emerald-300">{selectedAssessment.residualRpn}</span>
                    </div>
                  </div>

                  <div className="text-[10px] text-emerald-400 pt-1 font-semibold">
                    Tereduksi ke tingkat risiko yang dapat diterima secara regulasi (ALARP).
                  </div>
                </div>
              </div>

              {/* Mitigation Controls */}
              <div className="p-3.5 rounded-xl bg-slate-800/60 border border-slate-700/60 space-y-2">
                <span className="text-teal-400 font-bold block text-[10px] uppercase tracking-wider flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4" />
                  Strategi Pengendalian Risiko yang Diterapkan (GAMP 5 Controls):
                </span>
                <ul className="space-y-1.5 text-slate-200">
                  {selectedAssessment.mitigationControls.map((m, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-teal-400 shrink-0 mt-0.5" />
                      <span>{m}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Testing Deliverables */}
              <div className="p-3.5 rounded-xl bg-slate-800/60 border border-slate-700/60 space-y-2">
                <span className="text-blue-400 font-bold block text-[10px] uppercase tracking-wider flex items-center gap-1.5">
                  <Cpu className="w-4 h-4" />
                  Rekomendasi Dokumen Pengujian &amp; Kualifikasi (OQ / PQ Deliverables):
                </span>
                <ul className="space-y-1.5 text-slate-300 font-mono text-[11px]">
                  {selectedAssessment.testingDeliverables.map((t, idx) => (
                    <li key={idx} className="flex items-start gap-2 bg-slate-900/70 p-2 rounded border border-slate-800">
                      <span className="text-teal-400 font-bold">&bull;</span>
                      <span>{t}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Regulatory Sign-Off Block */}
              <div className="grid grid-cols-2 gap-3 p-3 rounded-lg bg-slate-950 border border-slate-800 text-[10px]">
                <div>
                  <span className="text-slate-400 block">Lead IT Engineer Penilai:</span>
                  <span className="font-bold text-white text-xs">{selectedAssessment.assessedBy}</span>
                  <div className="text-slate-500 font-mono mt-0.5">Tanggal Asesmen: {selectedAssessment.lastAssessmentDate}</div>
                </div>
                <div>
                  <span className="text-slate-400 block">Persetujuan QA Compliance Manager:</span>
                  <span className="font-bold text-teal-300 text-xs">{selectedAssessment.qaApprovedBy}</span>
                  <div className="text-emerald-400 font-mono mt-0.5">Status: Approved (Form Validated)</div>
                </div>
              </div>
            </div>

            <div className="flex justify-end pt-3 border-t border-slate-800">
              <button
                onClick={() => setSelectedAssessment(null)}
                className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Interactive GAMP 5 Assessment Wizard Modal */}
      {showWizard && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-4">
          <form 
            onSubmit={handleSaveNewAssessment}
            className="bg-slate-900 border border-slate-700 rounded-2xl max-w-2xl w-full p-6 space-y-4 shadow-2xl max-h-[92vh] overflow-y-auto text-xs"
          >
            <div className="flex items-start justify-between pb-3 border-b border-slate-800">
              <div>
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <PlusCircle className="w-5 h-5 text-teal-400" />
                  Wizard Penilaian Risiko GxP Baru (ISPE GAMP 5)
                </h3>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  Lakukan penilaian kuantitatif tingkat keparahan, probabilitas, dan kemampuan deteksi.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setShowWizard(false)}
                className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              {/* Step 1: System info */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Sistem Komputerisasi:</label>
                  <select
                    value={wizSystem}
                    onChange={(e) => setWizSystem(e.target.value)}
                    className="w-full bg-slate-800 border border-slate-700 text-white rounded-lg p-2 text-xs focus:outline-none focus:ring-1 focus:ring-teal-500"
                  >
                    <option value="SCADA-01">SCADA-01 (Siemens WFI &amp; PW)</option>
                    <option value="MES-01">MES-01 (Werum PAS-X EBR)</option>
                    <option value="LIMS-01">LIMS-01 (Waters Empower 3)</option>
                    <option value="BMS-01">BMS-01 (Honeywell HVAC)</option>
                    <option value="ERP-01">ERP-01 (SAP S/4HANA)</option>
                    <option value="SAN-01">SAN-01 (NetApp SnapLock WORM)</option>
                    <option value="ACS-01">ACS-01 (LenelS2 OnGuard)</option>
                    <option value="CCTV-01">CCTV-01 (Milestone Surveillance)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Kategori GAMP 5:</label>
                  <select
                    value={wizGampCategory}
                    onChange={(e) => setWizGampCategory(e.target.value as any)}
                    className="w-full bg-slate-800 border border-slate-700 text-white rounded-lg p-2 text-xs focus:outline-none focus:ring-1 focus:ring-teal-500"
                  >
                    <option value="Category 1">Category 1 - Infrastructure Software</option>
                    <option value="Category 3">Category 3 - Non-Configured Software (COTS)</option>
                    <option value="Category 4">Category 4 - Configured Software</option>
                    <option value="Category 5">Category 5 - Custom / Bespoke Software</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Fungsi / Proses Operasional yang Dinilai:</label>
                <input
                  type="text"
                  required
                  placeholder="Misal: Otomasi Penimbangan Bahan Aktif di Cleanroom Dispensing..."
                  value={wizProcessFunction}
                  onChange={(e) => setWizProcessFunction(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 text-white rounded-lg p-2 text-xs focus:outline-none focus:ring-1 focus:ring-teal-500"
                />
              </div>

              {/* Step 2: Failure Mode & Effect */}
              <div>
                <label className="block text-slate-300 font-semibold mb-1">
                  Potensi Modus Kegagalan (Failure Mode):
                </label>
                <textarea
                  rows={2}
                  required
                  placeholder="Jelaskan apa yang mungkin gagal pada software, hardware, atau jaringan..."
                  value={wizFailureMode}
                  onChange={(e) => setWizFailureMode(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 text-white rounded-lg p-2 text-xs focus:outline-none focus:ring-1 focus:ring-teal-500"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">
                  Dampak terhadap Keselamatan Pasien / Mutu Produk (Effect on CQA):
                </label>
                <textarea
                  rows={2}
                  required
                  placeholder="Jelaskan konsekuensi terhadap sterilitas, potensi kontaminasi, atau kepatuhan 21 CFR Part 11..."
                  value={wizEffect}
                  onChange={(e) => setWizEffect(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 text-white rounded-lg p-2 text-xs focus:outline-none focus:ring-1 focus:ring-teal-500"
                />
              </div>

              {/* Step 3: S, P, D Interactive Scoring */}
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
                <span className="text-teal-400 font-bold block text-xs uppercase tracking-wider">
                  Skoring Risiko Awal (Pre-Mitigation Scoring):
                </span>

                <div className="grid grid-cols-3 gap-3">
                  {/* Severity */}
                  <div>
                    <label className="block text-slate-300 font-semibold mb-1">Keparahan (Severity):</label>
                    <select
                      value={wizSeverity}
                      onChange={(e) => setWizSeverity(Number(e.target.value) as GampSeverity)}
                      className="w-full bg-slate-800 border border-slate-700 text-rose-300 font-bold rounded-lg p-2 text-xs focus:outline-none focus:ring-1 focus:ring-teal-500"
                    >
                      <option value={3}>3 - Tinggi / Kritis (Pasien/CQA)</option>
                      <option value={2}>2 - Sedang (Mutu Tidak Langsung)</option>
                      <option value={1}>1 - Rendah (Operasional Minor)</option>
                    </select>
                  </div>

                  {/* Probability */}
                  <div>
                    <label className="block text-slate-300 font-semibold mb-1">Probabilitas Kejadian:</label>
                    <select
                      value={wizProbability}
                      onChange={(e) => setWizProbability(Number(e.target.value) as GampProbability)}
                      className="w-full bg-slate-800 border border-slate-700 text-amber-300 font-bold rounded-lg p-2 text-xs focus:outline-none focus:ring-1 focus:ring-teal-500"
                    >
                      <option value={3}>3 - Sering (&gt; 1x/bulan)</option>
                      <option value={2}>2 - Sedang (1-2x/tahun)</option>
                      <option value={1}>1 - Jarang (&lt; 1x dlm 3 thn)</option>
                    </select>
                  </div>

                  {/* Detectability */}
                  <div>
                    <label className="block text-slate-300 font-semibold mb-1">Kemampuan Deteksi:</label>
                    <select
                      value={wizDetectability}
                      onChange={(e) => setWizDetectability(Number(e.target.value) as GampDetectability)}
                      className="w-full bg-slate-800 border border-slate-700 text-blue-300 font-bold rounded-lg p-2 text-xs focus:outline-none focus:ring-1 focus:ring-teal-500"
                    >
                      <option value={3}>3 - Sulit Terdeteksi / Laten</option>
                      <option value={2}>2 - Sedang (Sebelum Rilis Batch)</option>
                      <option value={1}>1 - Mudah (Alarm Otomatis)</option>
                    </select>
                  </div>
                </div>

                {/* Real-time Initial Class Calculation Banner */}
                <div className="flex items-center justify-between p-3 rounded-lg bg-slate-900 border border-slate-700/80 font-mono text-xs">
                  <div className="flex items-center gap-2">
                    <span className="text-slate-400">Kelas Risiko GAMP 5:</span>
                    <span className={`px-2 py-0.5 rounded font-bold ${
                      currentInitialClass === 'Class 1 (High)'
                        ? 'bg-rose-950 text-rose-300 border border-rose-800'
                        : currentInitialClass === 'Class 2 (Medium)'
                        ? 'bg-amber-950 text-amber-300 border border-amber-800'
                        : 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                    }`}>
                      {currentInitialClass}
                    </span>
                  </div>

                  <div>
                    <span className="text-slate-400">RPN Awal:</span> <strong className="text-teal-400">{currentInitialRpn}</strong> / 27
                  </div>
                </div>
              </div>

              {/* Step 4: Mitigations */}
              <div>
                <label className="block text-slate-300 font-semibold mb-1">
                  Kontrol Mitigasi Risiko yang Diterapkan (1 per baris):
                </label>
                <textarea
                  rows={3}
                  required
                  placeholder="Contoh:&#10;Interlock otomatis katup supply WFI jika suhu < 80°C&#10;Audit Trail review berkala per batch&#10;Dual sensor redundant PT100"
                  value={wizMitigations}
                  onChange={(e) => setWizMitigations(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 text-white rounded-lg p-2 text-xs focus:outline-none focus:ring-1 focus:ring-teal-500"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">
                  Protokol Pengujian &amp; Kualifikasi yang Diwajibkan:
                </label>
                <textarea
                  rows={2}
                  required
                  placeholder="Contoh:&#10;Protokol OQ TC-OQ-SCADA-014: Uji simulasi penurunan temperatur&#10;Protokol OQ Fault-Injection: Simulasi sensor diskoneksi"
                  value={wizTestingDeliverables}
                  onChange={(e) => setWizTestingDeliverables(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 text-white rounded-lg p-2 text-xs focus:outline-none focus:ring-1 focus:ring-teal-500"
                />
              </div>

              {/* Step 5: Post-mitigation scoring */}
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
                <span className="text-emerald-400 font-bold block text-xs uppercase tracking-wider">
                  Skor Risiko Residual (Pasca Mitigasi Kontrol):
                </span>

                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="block text-slate-300 text-[11px] mb-1">Severity Pasca-Kontrol:</label>
                    <select
                      value={wizResSeverity}
                      onChange={(e) => setWizResSeverity(Number(e.target.value) as GampSeverity)}
                      className="w-full bg-slate-800 border border-slate-700 text-white rounded-lg p-2 text-xs"
                    >
                      <option value={3}>3 (Tetap Kritis)</option>
                      <option value={2}>2 (Tereduksi Moderat)</option>
                      <option value={1}>1 (Tereduksi Total)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-slate-300 text-[11px] mb-1">Probabilitas Pasca-Kontrol:</label>
                    <select
                      value={wizResProbability}
                      onChange={(e) => setWizResProbability(Number(e.target.value) as GampProbability)}
                      className="w-full bg-slate-800 border border-slate-700 text-white rounded-lg p-2 text-xs"
                    >
                      <option value={1}>1 - Rendah (Sangat Jarang)</option>
                      <option value={2}>2 - Sedang</option>
                      <option value={3}>3 - Sering</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-slate-300 text-[11px] mb-1">Deteksi Pasca-Kontrol:</label>
                    <select
                      value={wizResDetectability}
                      onChange={(e) => setWizResDetectability(Number(e.target.value) as GampDetectability)}
                      className="w-full bg-slate-800 border border-slate-700 text-white rounded-lg p-2 text-xs"
                    >
                      <option value={1}>1 - Sangat Mudah (Interlock/Alarm)</option>
                      <option value={2}>2 - Sedang</option>
                      <option value={3}>3 - Sulit</option>
                    </select>
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs font-mono pt-2 border-t border-slate-800">
                  <span className="text-slate-400">Tingkat Risiko Residual:</span>
                  <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800 font-bold">
                    {currentResidualLevel} (RPN: {currentResidualRpn})
                  </span>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-3 border-t border-slate-800">
              <button
                type="button"
                onClick={() => setShowWizard(false)}
                className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold"
              >
                Batal
              </button>

              <button
                type="submit"
                className="px-4 py-2 rounded-lg bg-gradient-to-r from-teal-500 to-blue-600 hover:from-teal-400 hover:to-blue-500 text-white font-bold shadow-md shadow-teal-500/20"
              >
                Simpan &amp; Sahkan Penilaian Risiko
              </button>
            </div>
          </form>
        </div>
      )}

      {/* GAMP 5 Scoring Guide Modal */}
      {showGuide && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-3xl w-full p-6 space-y-4 shadow-2xl max-h-[92vh] overflow-y-auto text-xs">
            <div className="flex items-start justify-between pb-3 border-b border-slate-800">
              <div>
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-teal-400" />
                  Panduan Skoring Risiko ISPE GAMP 5 &amp; ICH Q9
                </h3>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  Standar penilaian keparahan (Severity), probabilitas (Probability), dan deteksi (Detectability) untuk sistem farmasi.
                </p>
              </div>

              <button
                onClick={() => setShowGuide(false)}
                className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              {/* Severity Definitions */}
              <div className="space-y-2">
                <h4 className="font-bold text-rose-400 text-xs uppercase tracking-wider flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-rose-500"></span>
                  1. Keparahan Dampak (Severity - S)
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {GAMP_SEVERITY_DEFINITIONS.map(s => (
                    <div key={s.level} className="p-3 rounded-lg bg-slate-800/60 border border-slate-700/60 space-y-1">
                      <div className="font-bold text-white text-xs">Level {s.level}: {s.name}</div>
                      <p className="text-slate-300 text-[11px] leading-snug">{s.description}</p>
                      <div className="text-[10px] text-slate-400 pt-1 italic">Contoh: {s.examples}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Probability Definitions */}
              <div className="space-y-2">
                <h4 className="font-bold text-amber-400 text-xs uppercase tracking-wider flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                  2. Probabilitas Kejadian (Probability - P)
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {GAMP_PROBABILITY_DEFINITIONS.map(p => (
                    <div key={p.level} className="p-3 rounded-lg bg-slate-800/60 border border-slate-700/60 space-y-1">
                      <div className="font-bold text-white text-xs">Level {p.level}: {p.name}</div>
                      <p className="text-slate-300 text-[11px] leading-snug">{p.description}</p>
                      <div className="text-[10px] text-slate-400 pt-1">Kriteria: {p.criteria}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Detectability Definitions */}
              <div className="space-y-2">
                <h4 className="font-bold text-blue-400 text-xs uppercase tracking-wider flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                  3. Kemampuan Deteksi (Detectability - D)
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {GAMP_DETECTABILITY_DEFINITIONS.map(d => (
                    <div key={d.level} className="p-3 rounded-lg bg-slate-800/60 border border-slate-700/60 space-y-1">
                      <div className="font-bold text-white text-xs">Level {d.level}: {d.name}</div>
                      <p className="text-slate-300 text-[11px] leading-snug">{d.description}</p>
                      <div className="text-[10px] text-teal-300 pt-1">{d.impact}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Testing Rigor Guide */}
              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                <h4 className="font-bold text-teal-400 text-xs uppercase tracking-wider">
                  Rekomendasi Tingkat Ketelitian Pengujian (Qualification Rigor):
                </h4>
                <div className="space-y-1.5 text-slate-300 text-[11px]">
                  <div className="p-2 rounded bg-slate-900 border border-slate-800 flex items-start gap-2">
                    <span className="px-2 py-0.5 rounded bg-rose-950 text-rose-300 font-bold shrink-0">Kelas 1</span>
                    <span><strong>High Risk:</strong> Wajib pengujian fungsional penuh, pengujian skenario kegagalan (*fault injection testing*), uji batas toleransi (*boundary challenge*), verifikasi interlock hardware/software otomatis, dan eksekusi dual witness.</span>
                  </div>
                  <div className="p-2 rounded bg-slate-900 border border-slate-800 flex items-start gap-2">
                    <span className="px-2 py-0.5 rounded bg-amber-950 text-amber-300 font-bold shrink-0">Kelas 2</span>
                    <span><strong>Medium Risk:</strong> Verifikasi fungsional OQ standar, uji penanganan kesalahan dasar (*error message*), dan verifikasi konfigurasi parameter.</span>
                  </div>
                  <div className="p-2 rounded bg-slate-900 border border-slate-800 flex items-start gap-2">
                    <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 font-bold shrink-0">Kelas 3</span>
                    <span><strong>Low Risk:</strong> Memanfaatkan dokumentasi bawaan vendor (*Supplier Leveraging*), verifikasi instalasi baseline (IQ), dan pengoperasian berbasis SOP reguler.</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-end pt-3 border-t border-slate-800">
              <button
                onClick={() => setShowGuide(false)}
                className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs"
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
