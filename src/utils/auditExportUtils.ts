import { jsPDF } from 'jspdf';
import { PLANT_PROFILE, GXP_SYSTEMS, ALCOA_PRINCIPLES, CHANGE_CONTROLS, DAILY_ROUNDS, BACKUP_RECORDS } from '../data/pharmaData';
import { INITIAL_GAMP_RISK_ASSESSMENTS } from '../data/gampRiskData';

// Generate formatted PDF using jsPDF
export function generateAuditCompliancePdf() {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  });

  const now = new Date();
  const dateStr = now.toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' });
  const timeStr = now.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit', second: '2-digit' }) + ' WIB';

  // Header Banner
  doc.setFillColor(15, 23, 42); // slate-900
  doc.rect(0, 0, 210, 28, 'F');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(14);
  doc.setTextColor(255, 255, 255);
  doc.text(PLANT_PROFILE.companyName, 14, 11);

  doc.setFontSize(8);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(148, 163, 184); // slate-400
  doc.text(`${PLANT_PROFILE.facilityName} | Lisensi BPOM: ${PLANT_PROFILE.gmpLicense} | FDA FEI: ${PLANT_PROFILE.fdaEstablishmentId}`, 14, 18);
  doc.text(`Standar Kepatuhan: BPOM CPOB 2024 Aneks 11, FDA 21 CFR Part 11, EU Annex 11, ISPE GAMP 5`, 14, 23);

  // Document Title & Metadata
  let y = 36;
  doc.setTextColor(15, 23, 42);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  doc.text('LAPORAN STATUS KEPATUHAN SISTEM GXP & KESEHATAN INFRASTRUKTUR TI', 14, y);

  y += 5;
  doc.setFontSize(8);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(71, 85, 105);
  doc.text(`Nomor Dokumen: REP-GXP-IT-2026-088 | Tanggal Cetak: ${dateStr}, ${timeStr} | Versi: 1.0 (Audit-Ready)`, 14, y);

  y += 6;
  doc.setDrawColor(203, 213, 225);
  doc.setLineWidth(0.3);
  doc.line(14, y, 196, y);

  // Executive KPI Summary Box
  y += 4;
  doc.setFillColor(241, 245, 249); // slate-100
  doc.roundedRect(14, y, 182, 18, 2, 2, 'F');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(15, 23, 42);
  doc.text('RINGKASAN EKSEKUTIF KEPATUHAN AUDIT:', 18, y + 5);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(51, 65, 85);
  doc.text(`- Skor ALCOA+: 98.4% (Tingkat Kepatuhan Prima)`, 18, y + 10);
  doc.text(`- Cakupan Validasi CSV: 100% (8/8 Sistem Terkualifikasi)`, 80, y + 10);
  doc.text(`- Uptime 24/7: 99.98% (SLA Tercapai)`, 142, y + 10);

  doc.text(`- Sinkronisasi Jam: NTP Stratum-1 (+4.2 ms)`, 18, y + 15);
  doc.text(`- Kontrol Perubahan: 4 CCR Aktif (1 Implemented)`, 80, y + 15);
  doc.text(`- Backup WORM: 6/6 Job Berhasil (SnapLock)`, 142, y + 15);

  // Section 1: GxP Systems Validation Matrix
  y += 24;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(15, 23, 42);
  doc.text('1. MATRIKS VALIDASI SISTEM KOMPUTERISASI (ISPE GAMP 5 & CPOB ANEKS 11)', 14, y);

  y += 4;
  // Table Header
  doc.setFillColor(30, 41, 59); // slate-800
  doc.rect(14, y, 182, 6, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(7);
  doc.setFont('helvetica', 'bold');
  doc.text('KODE', 16, y + 4);
  doc.text('NAMA SISTEM', 36, y + 4);
  doc.text('GAMP 5', 86, y + 4);
  doc.text('DAMPAK GXP', 108, y + 4);
  doc.text('21 CFR 11', 134, y + 4);
  doc.text('STATUS VALIDASI', 160, y + 4);

  y += 6;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7);
  doc.setTextColor(51, 65, 85);

  GXP_SYSTEMS.forEach((sys, idx) => {
    if (idx % 2 === 1) {
      doc.setFillColor(248, 250, 252);
      doc.rect(14, y, 182, 5, 'F');
    }
    doc.text(sys.code, 16, y + 3.5);
    doc.text(sys.name.length > 28 ? sys.name.substring(0, 26) + '...' : sys.name, 36, y + 3.5);
    doc.text(sys.gampCategory, 86, y + 3.5);
    doc.text(sys.gxpImpact, 108, y + 3.5);
    doc.text(sys.part11Applicable ? 'Wajib' : 'Exempt', 134, y + 3.5);
    doc.text(sys.validationStatus, 160, y + 3.5);
    y += 5;
  });

  // Section 2: ALCOA+ Principles
  y += 5;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(15, 23, 42);
  doc.text('2. STATUS INTEGRITAS DATA ALCOA+ & KONTROL TEKNIS TI', 14, y);

  y += 4;
  doc.setFillColor(30, 41, 59);
  doc.rect(14, y, 182, 6, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(7);
  doc.setFont('helvetica', 'bold');
  doc.text('PILAR ALCOA+', 16, y + 4);
  doc.text('KONTROL TEKNIS TI TERAPLIKASI', 56, y + 4);
  doc.text('STATUS', 170, y + 4);

  y += 6;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7);
  doc.setTextColor(51, 65, 85);

  ALCOA_PRINCIPLES.slice(0, 6).forEach((p, idx) => {
    if (idx % 2 === 1) {
      doc.setFillColor(248, 250, 252);
      doc.rect(14, y, 182, 5, 'F');
    }
    doc.text(`${p.letter} - ${p.name}`, 16, y + 3.5);
    doc.text(p.itTechnicalControl.substring(0, 68) + '...', 56, y + 3.5);
    doc.text(p.status, 170, y + 3.5);
    y += 5;
  });

  // Section 3: Open Change Controls & DRP
  y += 5;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(15, 23, 42);
  doc.text('3. KONTROL PERUBAHAN AKTIF (CHANGE CONTROL) & PEMULIHAN BENCANA', 14, y);

  y += 4;
  doc.setFillColor(30, 41, 59);
  doc.rect(14, y, 182, 6, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(7);
  doc.setFont('helvetica', 'bold');
  doc.text('NOMOR CCR', 16, y + 4);
  doc.text('JUDUL USULAN PERUBAHAN', 52, y + 4);
  doc.text('KATEGORI', 114, y + 4);
  doc.text('DAMPAK GXP', 142, y + 4);
  doc.text('STATUS', 168, y + 4);

  y += 6;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7);
  doc.setTextColor(51, 65, 85);

  CHANGE_CONTROLS.forEach((ccr, idx) => {
    if (idx % 2 === 1) {
      doc.setFillColor(248, 250, 252);
      doc.rect(14, y, 182, 5, 'F');
    }
    doc.text(ccr.ccrNumber, 16, y + 3.5);
    doc.text(ccr.title.substring(0, 36) + '...', 52, y + 3.5);
    doc.text(ccr.category, 114, y + 3.5);
    doc.text(ccr.gxpImpact ? 'Direct GxP' : 'Non-GxP', 142, y + 3.5);
    doc.text(ccr.status.substring(0, 18), 168, y + 3.5);
    y += 5;
  });

  // Official Regulatory Sign-Off Block
  y += 7;
  doc.setDrawColor(203, 213, 225);
  doc.line(14, y, 196, y);

  y += 4;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(15, 23, 42);
  doc.text('LEMBAR PENGESAHAN DOKUMEN REGULASI GXP:', 14, y);

  y += 4;
  // 3 Signature Columns
  const colWidth = 58;
  const sigBoxY = y;
  
  // Col 1: IT Engineer
  doc.setDrawColor(226, 232, 240);
  doc.rect(14, sigBoxY, colWidth, 24);
  doc.setFontSize(7);
  doc.setTextColor(71, 85, 105);
  doc.text('Disusun oleh (IT Lead Engineer):', 16, sigBoxY + 4);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(15, 23, 42);
  doc.text('Heri Wibowo, S.T.', 16, sigBoxY + 16);
  doc.setFont('helvetica', 'normal');
  doc.text(`Tgl: ${dateStr}`, 16, sigBoxY + 20);

  // Col 2: QA Compliance
  doc.rect(76, sigBoxY, colWidth, 24);
  doc.setFontSize(7);
  doc.setTextColor(71, 85, 105);
  doc.text('Ditinjau oleh (QA Compliance Manager):', 78, sigBoxY + 4);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(15, 23, 42);
  doc.text('apt. Siti Rahmawati, M.Farm.', 78, sigBoxY + 16);
  doc.setFont('helvetica', 'normal');
  doc.text(`Tgl: ${dateStr}`, 78, sigBoxY + 20);

  // Col 3: Plant Director
  doc.rect(138, sigBoxY, colWidth, 24);
  doc.setFontSize(7);
  doc.setTextColor(71, 85, 105);
  doc.text('Disetujui oleh (Plant Director):', 140, sigBoxY + 4);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(15, 23, 42);
  doc.text('Ir. Budi Hartono, M.M.', 140, sigBoxY + 16);
  doc.setFont('helvetica', 'normal');
  doc.text(`Tgl: ${dateStr}`, 140, sigBoxY + 20);

  // Save PDF
  doc.save(`Laporan_Audit_GxP_PT_LIZON_Pharma_${now.toISOString().split('T')[0]}.pdf`);
}

// Helper to trigger browser CSV download
function downloadCsvFile(content: string, filename: string) {
  const blob = new Blob([content], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

// 1. Export Systems Compliance CSV
export function exportSystemComplianceCsv() {
  const headers = [
    'System Code',
    'System Name',
    'Area / Department',
    'GAMP 5 Category',
    'GxP Impact',
    '21 CFR Part 11 Applicable',
    'Validation Status',
    'Last Validated Date',
    'Next Periodic Review',
    'RTO (Hours)',
    'RPO (Hours)',
    'Backup Frequency',
    'Audit Trail Review Frequency',
    'Version',
    'Vendor'
  ];

  const rows = GXP_SYSTEMS.map(s => [
    `"${s.code}"`,
    `"${s.name}"`,
    `"${s.area}"`,
    `"${s.gampCategory}"`,
    `"${s.gxpImpact}"`,
    s.part11Applicable ? 'Yes' : 'No',
    `"${s.validationStatus}"`,
    `"${s.lastValidated}"`,
    `"${s.nextPeriodicReview}"`,
    s.rtoHours,
    s.rpoHours,
    `"${s.backupFrequency}"`,
    `"${s.auditTrailReviewFreq}"`,
    `"${s.version}"`,
    `"${s.vendor}"`
  ]);

  const csvContent = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
  const filename = `lizon_pharma_system_compliance_${new Date().toISOString().split('T')[0]}.csv`;
  downloadCsvFile(csvContent, filename);
}

// 2. Export ALCOA+ Audit & Gaps CSV
export function exportAlcoaAuditCsv() {
  const headers = [
    'Pillar ID',
    'Letter',
    'Principle Name',
    'Full Name',
    'Pharma Application',
    'IT Technical Control',
    'Regulatory Reference',
    'Compliance Status'
  ];

  const rows = ALCOA_PRINCIPLES.map(p => [
    `"${p.id}"`,
    `"${p.letter}"`,
    `"${p.name}"`,
    `"${p.fullName}"`,
    `"${p.pharmaApplication.replace(/"/g, '""')}"`,
    `"${p.itTechnicalControl.replace(/"/g, '""')}"`,
    `"${p.regulatoryReference}"`,
    `"${p.status}"`
  ]);

  const csvContent = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
  const filename = `lizon_pharma_alcoa_principles_${new Date().toISOString().split('T')[0]}.csv`;
  downloadCsvFile(csvContent, filename);
}

// 3. Export Change Controls CSV
export function exportChangeControlsCsv() {
  const headers = [
    'CCR Number',
    'Title',
    'System Name',
    'Category',
    'Priority',
    'GxP Impact',
    'Revalidation Required',
    'Qualification Steps',
    'Status',
    'Requested By',
    'QA Approver',
    'Target Date',
    'Rollback Plan'
  ];

  const rows = CHANGE_CONTROLS.map(c => [
    `"${c.ccrNumber}"`,
    `"${c.title.replace(/"/g, '""')}"`,
    `"${c.systemName}"`,
    `"${c.category}"`,
    `"${c.priority}"`,
    c.gxpImpact ? 'Yes' : 'No',
    c.revalidationRequired ? 'Yes' : 'No',
    `"${c.qualificationSteps.join('; ')}"`,
    `"${c.status}"`,
    `"${c.requestedBy}"`,
    `"${c.qaApprover}"`,
    `"${c.targetDate}"`,
    `"${c.rollbackPlan.replace(/"/g, '""')}"`
  ]);

  const csvContent = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
  const filename = `lizon_pharma_change_controls_${new Date().toISOString().split('T')[0]}.csv`;
  downloadCsvFile(csvContent, filename);
}

// 4. Export Infrastructure & Backup Records CSV
export function exportBackupRecordsCsv() {
  const headers = [
    'System Name',
    'Backup Type',
    'Destination',
    'Media Type',
    'Size (GB)',
    'Start Time',
    'End Time',
    'Status',
    'Checksum SHA-256 Verified',
    'Retention (Years)',
    'Last Restore Test Date',
    'Restore Test Status'
  ];

  const rows = BACKUP_RECORDS.map(b => [
    `"${b.systemName}"`,
    `"${b.backupType}"`,
    `"${b.destination}"`,
    `"${b.mediaType}"`,
    b.sizeGb,
    `"${b.startTime}"`,
    `"${b.endTime}"`,
    `"${b.status}"`,
    b.checksumVerified ? 'VERIFIED' : 'FAILED',
    b.retentionYears,
    `"${b.lastRestoreTest}"`,
    `"${b.restoreTestStatus}"`
  ]);

  const csvContent = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
  const filename = `lizon_pharma_backup_drp_status_${new Date().toISOString().split('T')[0]}.csv`;
  downloadCsvFile(csvContent, filename);
}

// 5. Export GAMP 5 Risk Assessments (FMEA) CSV
export function exportGampRiskAssessmentCsv() {
  const saved = localStorage.getItem('lizon_gamp_risk_assessments');
  const records = saved ? JSON.parse(saved) : INITIAL_GAMP_RISK_ASSESSMENTS;

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

  const rows = records.map((a: any) => [
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

  const csvContent = [headers.join(','), ...rows.map((r: any) => r.join(','))].join('\n');
  const filename = `lizon_pharma_gamp5_fmea_risk_assessment_${new Date().toISOString().split('T')[0]}.csv`;
  downloadCsvFile(csvContent, filename);
}

