import { GampRiskAssessment, GampSeverity, GampProbability, GampDetectability, GampRiskClass, ResidualRiskLevel } from '../types/pharma';

// Helper to compute GAMP 5 Initial Risk Class
export function calculateGampInitialRiskClass(severity: GampSeverity, probability: GampProbability): GampRiskClass {
  if (severity === 3) {
    if (probability === 3 || probability === 2) return 'Class 1 (High)';
    return 'Class 2 (Medium)';
  }
  if (severity === 2) {
    if (probability === 3) return 'Class 1 (High)';
    if (probability === 2) return 'Class 2 (Medium)';
    return 'Class 3 (Low)';
  }
  // severity === 1
  if (probability === 3) return 'Class 2 (Medium)';
  return 'Class 3 (Low)';
}

// Helper to calculate RPN (1 to 27)
export function calculateRpn(s: GampSeverity, p: GampProbability, d: GampDetectability): number {
  return s * p * d;
}

// Helper to classify Residual Risk Level
export function getResidualRiskLevel(rpn: number, severity: GampSeverity): ResidualRiskLevel {
  if (rpn >= 18 || (severity === 3 && rpn >= 12)) return 'High Risk';
  if (rpn >= 8) return 'Medium Risk';
  return 'Low Risk';
}

export const GAMP_SEVERITY_DEFINITIONS = [
  {
    level: 3 as GampSeverity,
    name: 'High (Kritis)',
    description: 'Dampak langsung pada keselamatan pasien (Patient Safety), parameter kritis mutu produk (CQA), pelepasan batch cacat, atau kehilangan integritas data GxP permanen.',
    examples: 'Kegagalan sterilisasi WFI, kesalahan takaran bahan aktif API di MES, manipulasi hasil uji kromatografi di LIMS.'
  },
  {
    level: 2 as GampSeverity,
    name: 'Medium (Sedang)',
    description: 'Dampak tidak langsung pada mutu produk atau parameter proses antara; deviasi data terdeteksi dan dapat dipulihkan melalui tinjauan audit trail.',
    examples: 'Penyimpangan tekanan diferensial cleanroom Grade C/D sementara, keterlambatan sinkronisasi data batch ke ERP, sensor cadangan offline.'
  },
  {
    level: 1 as GampSeverity,
    name: 'Low (Rendah)',
    description: 'Dampak minor operasional atau dokumentasi tanpa pengaruh terhadap mutu produk, keamanan pasien, atau integritas data rilis batch.',
    examples: 'Kesalahan format laporan pencetakan non-GxP, peringatan ruang disk arsip tahap awal, jeda pemantauan CCTV koridor non-produksi.'
  }
];

export const GAMP_PROBABILITY_DEFINITIONS = [
  {
    level: 3 as GampProbability,
    name: 'High (Sering / > 1x/bulan)',
    description: 'Probabilitas kegagalan tinggi; kode perangkat lunak custom kompleks tanpa riwayat lapangan matang, antarmuka rentan, atau lingkungan rentan gangguan.',
    criteria: 'Sistem sering mengalami glitch atau sangat sensitif terhadap fluktuasi input.'
  },
  {
    level: 2 as GampProbability,
    name: 'Medium (Sedang / 1-2x/tahun)',
    description: 'Probabilitas moderat; perangkat lunak terkonfigurasi (GAMP Cat 4) dengan konfigurasi standar, lingkungan industri terkontrol, dan pemeliharaan berkala.',
    criteria: 'Pernah teramati saat fase commissioning atau kualifikasi OQ awal.'
  },
  {
    level: 1 as GampProbability,
    name: 'Low (Jarang / < 1x dalam 3 tahun)',
    description: 'Probabilitas sangat rendah; arsitektur redundan otomatis (N+1), perangkat lunak mature (GAMP Cat 3 COTS), pengujian regression ketat.',
    criteria: 'Sistem memiliki track record industri teruji dengan zero unhandled exception.'
  }
];

export const GAMP_DETECTABILITY_DEFINITIONS = [
  {
    level: 1 as GampDetectability,
    name: 'High Detectability (Sangat Mudah Terdeteksi)',
    description: 'Kegagalan langsung memicu interlock otomatis, alarm visual-audio real-time di SCADA/BMS, penghentian proses seketika, dan notifikasi SMS/email ke engineer.',
    impact: 'Risiko kegagalan teredam secara efektif sebelum berdampak ke produk.'
  },
  {
    level: 2 as GampDetectability,
    name: 'Medium Detectability (Terdeteksi sebelum Rilis Batch)',
    description: 'Kegagalan tidak menghentikan mesin otomatis, namun pasti teridentifikasi saat verifikasi kedua (Second Person Review) atau analisis laboratorium QC rilis batch.',
    impact: 'Memerlukan pemeriksaan teliti pada lembar kerja dan audit trail sebelum pengesahan QA.'
  },
  {
    level: 3 as GampDetectability,
    name: 'Low Detectability (Sulit Terdeteksi / Tersembunyi)',
    description: 'Kegagalan bersifat laten (silent corruption), modifikasi data tanpa jejak kasat mata, atau deviasi mikroskopis yang lolos uji rutin QC tanpa audit forensik.',
    impact: 'Tingkat kekritisan bahaya tertinggi; wajib dimitigasi dengan kontrol teknis ganda.'
  }
];

export const INITIAL_GAMP_RISK_ASSESSMENTS: GampRiskAssessment[] = [
  {
    id: 'ra-scada-001',
    riskId: 'RA-2026-SCADA-001',
    systemCode: 'SCADA-01',
    systemName: 'Siemens WinCC SCADA Purified Water & WFI Generation',
    processFunction: 'Pengendalian & Pemantauan Suhu Sanitasi Loop Sirkulasi WFI (≥ 80°C)',
    gampCategory: 'Category 4',
    gxpAspect: 'Combination (Safety & Quality)',
    potentialFailureMode: 'Sensor temperatur RTD loop sirkulasi mengalami drift negatif sehingga suhu air WFI aktual turun ke 72°C tanpa terdeteksi',
    potentialEffect: 'Pertumbuhan biofilm mikroba dan kontaminasi endotoksin pada air injeksi, menyebabkan pembatalan batch sediaan injeksi steril & risiko sepsis pada pasien.',
    potentialCause: 'Degradasi elemen RTD Pt100 akibat siklus termal tinggi atau modul input analog PLC Siemens S7-1500 mengalami penyimpangan kalibrasi.',
    severity: 3,
    severityReason: 'Kritis: Mempengaruhi atribut mutu kritis (CQA) sediaan steril dan keselamatan jiwa pasien (Patient Safety).',
    probability: 2,
    probabilityReason: 'Moderat: Lingkungan bersuhu tinggi 85°C secara terus-menerus mempercepat penuaan sensor termal.',
    initialRiskClass: 'Class 1 (High)',
    detectability: 3,
    detectabilityReason: 'Rendah (Pre-Mitigasi): Jika hanya mengandalkan sensor tunggal, pembacaan drift tidak akan memicu alarm bawaan.',
    initialRpn: 18, // 3 * 2 * 3
    mitigationControls: [
      'Penerapan dual-redundant PT100 temperature sensors (TE-101A dan TE-101B) dengan algoritma cross-differential check (deviasi > 1.5°C memicu Alarm Kritis Tingkat 1).',
      'Interlock otomatis katup supply WFI ke lini produksi; jika suhu sirkulasi < 80°C, katup pemakai terkunci tertutup dan air dialirkan balik ke tangki dump sanitasi.',
      'Pencatatan data kontinu interval 1 detik dengan enkripsi 21 CFR Part 11 pada WinCC Audit Historian.',
      'SOP Kalibrasi 6-bulanan (SOP-IT-008) dengan kalibrator standar tertelusur KAN/NIST.'
    ],
    controlTypes: ['Technical / Automated', 'Procedural / SOP', 'Qualification Testing'],
    testingDeliverables: [
      'Protokol OQ TC-OQ-SCADA-014: Uji simulasi penurunan temperatur di bawah 80.0°C memverifikasi aktuasi interlock katup dalam waktu < 2 detik.',
      'Protokol OQ Fault-Injection TC-OQ-SCADA-018: Uji simulasi pemutusan kabel sensor tunggal dan divergensi sensor (drift simulation > 1.5°C).',
      'Protokol PQ TC-PQ-WFI-003: Pemantauan termal 72 jam terus-menerus dengan thermal datalogger eksternal terkalibrasi.'
    ],
    residualSeverity: 3,
    residualProbability: 1,
    residualDetectability: 1,
    residualRpn: 3, // 3 * 1 * 1
    residualRiskLevel: 'Low Risk',
    status: 'Approved by QA',
    assessedBy: 'Heri Wibowo (Lead IT Engineer)',
    qaApprovedBy: 'apt. Siti Rahmawati (QA Compliance Manager)',
    lastAssessmentDate: '2026-09-18'
  },
  {
    id: 'ra-mes-001',
    riskId: 'RA-2026-MES-001',
    systemCode: 'MES-01',
    systemName: 'Werum PAS-X Manufacturing Execution System (MES)',
    processFunction: 'Penimbangan & Verifikasi Barcode Bahan Baku Aktif (API Dispensing)',
    gampCategory: 'Category 4',
    gxpAspect: 'Combination (Safety & Quality)',
    potentialFailureMode: 'Operator secara tidak sengaja menimbang eksipien alih-alih zat aktif (API) atau menimbang dosis melebihi batas toleransi batch record elektronik (EBR)',
    potentialEffect: 'Kandungan zat aktif sediaan obat sub-poten atau super-poten, berpotensi memicu kegagalan terapi atau keracunan obat fatal pada pasien.',
    potentialCause: 'Barcode salah cetak dari gudang atau operator melewati langkah verifikasi pemindaian secara manual.',
    severity: 3,
    severityReason: 'Kritis: Kesalahan takaran API berakibat fatal pada keamanan produk obat komersial.',
    probability: 2,
    probabilityReason: 'Moderat: Human error dalam aktivitas dispensing manual cleanroom dengan frekuensi tinggi.',
    initialRiskClass: 'Class 1 (High)',
    detectability: 2,
    detectabilityReason: 'Sedang: Dapat terdeteksi saat rekonsiliasi akhir batch, namun berisiko terlambat jika telah tercampur di mixer.',
    initialRpn: 12, // 3 * 2 * 2
    mitigationControls: [
      'Fitur Barcode Interlock 2D DataMatrix mandatori di Werum PAS-X; timbangan Mettler Toledo terkunci hingga pemindaian lot bahan aktif dan container ID sesuai spesifikasi resep.',
      'Pemberlakuan toleransi penimbangan ketat (± 0.5%) dengan penangkapan bobot otomatis langsung dari timbangan digital via RS-232/Ethernet (manual entry dinonaktifkan).',
      'Wajib Dual Electronic Signature (Otentikasi Engineer/Operator dan Supervisor QA) untuk setiap deviasi penimbangan.',
      'Audit Trail otomatis mencatat nomor lot, ID timbangan, timestamp NTP Stratum-1, dan User ID penimbang.'
    ],
    controlTypes: ['Technical / Automated', 'Procedural / SOP', 'Qualification Testing'],
    testingDeliverables: [
      'Protokol OQ TC-OQ-MES-032: Verifikasi penolakan pemindaian barcode container API yang salah (Negative Testing).',
      'Protokol OQ TC-OQ-MES-035: Uji penolakan input manual bobot dan penguncian tombol simpan saat bobot timbangan di luar toleransi ± 0.5%.',
      'Protokol PQ TC-PQ-MES-005: Uji penimbangan batch simulasi 5 siklus berturut-turut di Cleanroom Grade C.'
    ],
    residualSeverity: 3,
    residualProbability: 1,
    residualDetectability: 1,
    residualRpn: 3, // 3 * 1 * 1
    residualRiskLevel: 'Low Risk',
    status: 'Approved by QA',
    assessedBy: 'Heri Wibowo (Lead IT Engineer)',
    qaApprovedBy: 'apt. Siti Rahmawati (QA Compliance Manager)',
    lastAssessmentDate: '2026-09-22'
  },
  {
    id: 'ra-lims-001',
    riskId: 'RA-2026-LIMS-001',
    systemCode: 'LIMS-01',
    systemName: 'LabVantage LIMS & Waters Empower 3 CDS',
    processFunction: 'Kalkulasi Otomatis Kadar Kemurnian HPLC & Penyimpanan Raw Data Kromatografi',
    gampCategory: 'Category 4',
    gxpAspect: 'Data Integrity',
    potentialFailureMode: 'Analis laboratorium mengubah parameter integrasi puncak kromatografi (peak baseline smoothing) secara manual untuk meloloskan sampel OOS tanpa rekaman audit',
    potentialEffect: 'Pelepasan produk obat yang mengandung cemaran organik melebihi batas spesifikasi BPOM/FDA, berujung pada penarikan obat (Class I Drug Recall).',
    potentialCause: 'Hak akses akun analis memiliki izin manual integration tanpa penguncian audit trail atau pengawasan QA.',
    severity: 3,
    severityReason: 'Kritis: Pelanggaran integritas data langsung (ALCOA+ Accurate & Original) yang menjadi temuan warning letter FDA.',
    probability: 2,
    probabilityReason: 'Moderat: Tekanan target pengujian laboratorium QC jika hak akses tidak dibatasi sistem.',
    initialRiskClass: 'Class 1 (High)',
    detectability: 3,
    detectabilityReason: 'Rendah (Pre-Mitigasi): Perubahan parameter integrasi halus sulit dilihat kasat mata tanpa membedah metadata jejak audit.',
    initialRpn: 18, // 3 * 2 * 3
    mitigationControls: [
      'Konfigurasi Waters Empower System Policies: Manual integration dinonaktifkan secara permanen untuk metode pengujian rilis produk komersial.',
      'Audit Trail Project Level diaktifkan permanen; parameter integrasi tidak dapat disimpan tanpa alasan perubahan mandatori (Mandatory Reason for Change).',
      'Penyimpanan seluruh file raw data (.dat / .raw) langsung ke NetApp SnapLock Compliance WORM Volume tanpa akses edit bagi staf QC.',
      'SOP-IT-004 & SOP-QC-019: Verifikasi audit trail 100% per run kromatografi oleh QA Compliance sebelum persetujuan COA.'
    ],
    controlTypes: ['Technical / Automated', 'Procedural / SOP', 'Qualification Testing'],
    testingDeliverables: [
      'Protokol OQ TC-OQ-CDS-021: Uji penguncian hak akses edit parameter integrasi pada profil peran QC Analyst.',
      'Protokol OQ TC-OQ-CDS-026: Verifikasi keutuhan audit trail saat dilakukan simulasi percobaan re-integrasi.',
      'Protokol OQ Security TC-OQ-CDS-030: Verifikasi transmisi raw data ke direktori WORM share terisolasi.'
    ],
    residualSeverity: 3,
    residualProbability: 1,
    residualDetectability: 1,
    residualRpn: 3, // 3 * 1 * 1
    residualRiskLevel: 'Low Risk',
    status: 'Approved by QA',
    assessedBy: 'Heri Wibowo (Lead IT Engineer)',
    qaApprovedBy: 'apt. Siti Rahmawati (QA Compliance Manager)',
    lastAssessmentDate: '2026-09-25'
  },
  {
    id: 'ra-bms-001',
    riskId: 'RA-2026-BMS-001',
    systemCode: 'BMS-01',
    systemName: 'Honeywell Experion Building Management System (BMS)',
    processFunction: 'Kontrol Tekanan Diferensial Ruang Bersih (Cleanroom Cascade Pressure Grade A-D)',
    gampCategory: 'Category 4',
    gxpAspect: 'Product Quality',
    potentialFailureMode: 'Inverter blower VFD HVAC Cleanroom Grade A mengalami trip beban lebih, menyebabkan tekanan udara berbalik arah (reversal cascade) dari koridor kotor',
    potentialEffect: 'Masuknya kontaminan partikulat dan mikroba ke dalam zona pengisian aseptik (Grade A LAF), merusak sterilitas seluruh batch vial injeksi.',
    potentialCause: 'Fluktuasi tegangan daya atau kegagalan mekanikal motor fan tanpa respon otomatis fail-over.',
    severity: 3,
    severityReason: 'Kritis: Hilangnya kaskade tekanan cleanroom langsung merusak sterilitas sediaan parenteral.',
    probability: 2,
    probabilityReason: 'Moderat: Komponen mekanikal dan penggerak VFD beroperasi terus-menerus 24 jam sehari.',
    initialRiskClass: 'Class 1 (High)',
    detectability: 1,
    detectabilityReason: 'Tinggi: Sensor differential pressure Rotronic dan Honeywell memicu alarm visual strobo di dalam cleanroom dalam tempo < 10 detik.',
    initialRpn: 6, // 3 * 2 * 1
    mitigationControls: [
      'Arsitektur Dual Blower Fan N+1: Jika blower utama gagal, unit cadangan beroperasi otomatis dalam tempo 15 detik melalui interlock ATS.',
      'Sistem Alarm Audio-Visual di airlock dan ruang pengisian Grade A dengan ambang batas batas peringatan (12 Pa) dan aksi (10 Pa).',
      'Koneksi daya HVAC terhubung langsung ke Dual Trafo UPS 40kVA dan Generator Darurat dengan sinkronisasi transfer tanpa jeda (bumpless transfer).',
      'SOP-ENG-007: Ronde harian teknisi TI/ME pukul 08:00 WIB memeriksa status inverter dan data trending kaskade.'
    ],
    controlTypes: ['Technical / Automated', 'Procedural / SOP', 'Qualification Testing'],
    testingDeliverables: [
      'Protokol OQ TC-OQ-BMS-011: Uji simulasi pemadaman listrik blower utama dan verifikasi waktu aktif blower cadangan < 15 detik.',
      'Protokol OQ TC-OQ-BMS-016: Uji simulasi penurunan tekanan di bawah 10 Pa dan verifikasi aktivasi alarm strobo cleanroom.',
      'Protokol PQ TC-PQ-HVAC-002: Kualifikasi pemulihan udara (Recovery Test < 15 menit) pasca pembukaan pintu darurat.'
    ],
    residualSeverity: 3,
    residualProbability: 1,
    residualDetectability: 1,
    residualRpn: 3, // 3 * 1 * 1
    residualRiskLevel: 'Low Risk',
    status: 'Approved by QA',
    assessedBy: 'Heri Wibowo (Lead IT Engineer)',
    qaApprovedBy: 'apt. Siti Rahmawati (QA Compliance Manager)',
    lastAssessmentDate: '2026-09-20'
  },
  {
    id: 'ra-erp-001',
    riskId: 'RA-2026-ERP-001',
    systemCode: 'ERP-01',
    systemName: 'SAP S/4HANA Pharmaceutical Enterprise Resource Planning',
    processFunction: 'Kontrol Status Material Karantina (Quarantine) ke Siap Rilis (Released for Production)',
    gampCategory: 'Category 4',
    gxpAspect: 'Product Quality',
    potentialFailureMode: 'Bahan baku berstatus "Quarantine" belum lulus uji QC secara tidak sengaja ter-posting ke status "Unrestricted Use" oleh staf logistik gudang',
    potentialEffect: 'Bahan baku yang tercemar atau sub-spesifikasi diproses ke lini pencampuran produksi komersial.',
    potentialCause: 'Konfigurasi hak otorisasi SAP (Authorization Object) yang terlalu longgar pada modul QM/MM.',
    severity: 3,
    severityReason: 'Kritis: Penggunaan material obat sub-spesifikasi membahayakan kualitas produk jadi.',
    probability: 1,
    probabilityReason: 'Rendah: Arsitektur workflow rilis SAP S/4HANA memiliki validasi status berbasis inspeksi lot.',
    initialRiskClass: 'Class 2 (Medium)',
    detectability: 2,
    detectabilityReason: 'Sedang: Terdeteksi pada pemeriksaan lembar kerja dispensing, namun dapat terlewat bila barcode dicetak mendahului izin QA.',
    initialRpn: 6, // 3 * 1 * 2
    mitigationControls: [
      'Pemisahan Tugas (Segregation of Duties - SoD) mutlak: Hanya role QA Release Authorized User yang memiliki transaksi QA11/QA32 Usage Decision.',
      'Hard interlock antarmuka SAP MM ke Werum MES: Bahan berstatus "Quarantine (QI)" ditolak mentah-mentah oleh MES saat pemindaian dispensing.',
      'Pemberlakuan Digital Signature 21 CFR Part 11 pada setiap approval Usage Decision di SAP QM.',
      'SOP-LOG-003: Prosedur penerimaan dan isolasi fisik bahan baku di area karantina gudang tertutup berpagar.'
    ],
    controlTypes: ['Technical / Automated', 'Procedural / SOP', 'Qualification Testing'],
    testingDeliverables: [
      'Protokol OQ TC-OQ-ERP-041: Uji coba transaksi pengeluaran material karantina ke batch order memverifikasi pesan blokir sistem "Material locked by QA".',
      'Protokol OQ Security TC-OQ-ERP-045: Audit otorisasi pengguna untuk memastikan zero conflict hak akses SoD antara gudang dan QA.',
      'Protokol OQ Interface TC-OQ-INT-002: Verifikasi sinkronisasi status lot antara SAP S/4HANA dan Werum MES PAS-X.'
    ],
    residualSeverity: 3,
    residualProbability: 1,
    residualDetectability: 1,
    residualRpn: 3,
    residualRiskLevel: 'Low Risk',
    status: 'Approved by QA',
    assessedBy: 'Heri Wibowo (Lead IT Engineer)',
    qaApprovedBy: 'apt. Siti Rahmawati (QA Compliance Manager)',
    lastAssessmentDate: '2026-09-28'
  },
  {
    id: 'ra-san-001',
    riskId: 'RA-2026-SAN-001',
    systemCode: 'SAN-01',
    systemName: 'NetApp All-Flash SAN Storage & SnapLock WORM',
    processFunction: 'Penyimpanan Arsip Basis Data Batch & Audit Trail WORM (Non-Rewriteable)',
    gampCategory: 'Category 1',
    gxpAspect: 'Data Integrity',
    potentialFailureMode: 'Kerusakan storage controller atau kegagalan disk ganda yang menyebabkan hilangnya database batch record aktif yang belum sempat di-backup',
    potentialEffect: 'Kehilangan data batch produksi sediaan farmasi secara permanen, menyebabkan kegagalan kepatuhan 21 CFR Part 11 dan pembatalan batch.',
    potentialCause: 'Kerusakan perangkat keras fisik, lonjakan listrik parah, atau kegagalan komponen fiber channel SAN fabric.',
    severity: 3,
    severityReason: 'Kritis: Kehilangan data integritas batch sediaan steril berujung pada investigasi deviasi kritis BPOM.',
    probability: 1,
    probabilityReason: 'Rendah: Arsitektur NetApp All-Flash SAN dengan Dual Active-Active Controller dan RAID-DP (Dual Parity).',
    initialRiskClass: 'Class 2 (Medium)',
    detectability: 1,
    detectabilityReason: 'Tinggi: NetApp AutoSupport dan vCenter memicu alert SNMP trap seketika ke tim IT dalam tempo < 10 detik.',
    initialRpn: 3, // 3 * 1 * 1
    mitigationControls: [
      'Arsitektur Dual Storage Controller Active-Active dengan sinkronisasi cermin (NetApp SyncMirror) tanpa single-point-of-failure.',
      'RAID-DP (Dual Parity): Mampu menoleransi kerusakan simultan 2 unit SSD tanpa kehilangan satu bit data pun.',
      'Teknologi NetApp SnapLock Compliance WORM: Volume terkunci secara hardware sehingga tidak dapat diubah atau dihapus oleh siapapun (termasuk administrator root) selama periode retensi 10 tahun.',
      'Pencadangan harian otomatis 3-2-1-1 ke pita magnetik LTO-9 dan penyimpanan brankas tahan api off-site.'
    ],
    controlTypes: ['Technical / Automated', 'Procedural / SOP', 'Qualification Testing'],
    testingDeliverables: [
      'Protokol IQ/OQ TC-OQ-SAN-004: Uji simulasi pencabutan paksa salah satu controller aktif dan verifikasi zero downtime fail-over.',
      'Protokol OQ Security TC-OQ-SAN-008: Uji coba percobaan penghapusan file WORM menggunakan akun hak tertinggi (root) memverifikasi penolakan "Operation not permitted".',
      'Protokol DRP TC-DRP-001: Simulasi pemulihan data dari snapshot dalam tempo RTO < 1 jam.'
    ],
    residualSeverity: 3,
    residualProbability: 1,
    residualDetectability: 1,
    residualRpn: 3,
    residualRiskLevel: 'Low Risk',
    status: 'Approved by QA',
    assessedBy: 'Heri Wibowo (Lead IT Engineer)',
    qaApprovedBy: 'apt. Siti Rahmawati (QA Compliance Manager)',
    lastAssessmentDate: '2026-09-15'
  },
  {
    id: 'ra-acs-001',
    riskId: 'RA-2026-ACS-001',
    systemCode: 'ACS-01',
    systemName: 'LenelS2 OnGuard Physical Access Control System',
    processFunction: 'Otorisasi & Pembatasan Akses Fisik Pintu Masuk Ruang Bersih Aseptik (Grade A/B)',
    gampCategory: 'Category 4',
    gxpAspect: 'Product Quality',
    potentialFailureMode: 'Personel yang belum terkualifikasi gowning atau personil yang tidak berwenang masuk ke ruang bersih steril Grade B menggunakan badge pinjaman atau tailgating',
    potentialEffect: 'Beban mikroba luar terbawa masuk ke cleanroom steril, mengkontaminasi lingkungan sediaan injeksi.',
    potentialCause: 'Kegagalan sensor anti-passback pintu atau kelalaian disiplin personel di airlock.',
    severity: 3,
    severityReason: 'Kritis: Kontaminasi fisik pada area aseptik Grade B membatalkan sterilitas batch produk.',
    probability: 2,
    probabilityReason: 'Moderat: Ketergantungan pada kedisiplinan manusia saat pergantian shift padat.',
    initialRiskClass: 'Class 1 (High)',
    detectability: 2,
    detectabilityReason: 'Sedang: Terdeteksi melalui verifikasi log access dan audit rekaman CCTV, namun mungkin beberapa jam pasca insiden.',
    initialRpn: 12, // 3 * 2 * 2
    mitigationControls: [
      'Autentikasi Dua Faktor (2FA): Kartu RFID terenkripsi Mifare DESFire EV3 + Pemindai Biometrik Sidik Jari/Wajah pada seluruh airlock Grade B.',
      'Fitur Hard Anti-Passback: Mencegah penggunaan kartu berulang tanpa tercatat keluar terlebih dahulu.',
      'Integrasi Interlock Pintu Airlock: Pintu kedua tidak dapat terbuka sebelum pintu pertama tertutup rapat dan siklus pembilasan udara (air purge) 30 detik selesai.',
      'Integrasi Otomatis ke LIMS Training Records: Akses cleanroom otomatis terkunci jika kualifikasi gowning aseptik personel kedaluwarsa.'
    ],
    controlTypes: ['Technical / Automated', 'Procedural / SOP', 'Qualification Testing'],
    testingDeliverables: [
      'Protokol OQ TC-OQ-ACS-012: Uji coba pemindaian kartu pengguna yang belum lulus pelatihan gowning memverifikasi penolakan akses "Training Expired".',
      'Protokol OQ TC-OQ-ACS-015: Uji anti-passback dan interlock interlocking pintu airlock cleanroom Grade B.',
      'Protokol OQ TC-OQ-ACS-020: Uji coba pemutusan daya darurat memverifikasi fail-secure mode pada perimeter steril.'
    ],
    residualSeverity: 3,
    residualProbability: 1,
    residualDetectability: 1,
    residualRpn: 3,
    residualRiskLevel: 'Low Risk',
    status: 'Approved by QA',
    assessedBy: 'Heri Wibowo (Lead IT Engineer)',
    qaApprovedBy: 'apt. Siti Rahmawati (QA Compliance Manager)',
    lastAssessmentDate: '2026-09-19'
  },
  {
    id: 'ra-cctv-001',
    riskId: 'RA-2026-CCTV-001',
    systemCode: 'CCTV-01',
    systemName: 'Milestone XProtect IP Video Surveillance System',
    processFunction: 'Perekaman Video 24/7 Pengawasan Operasional Lini Pengisian Aseptik & Tangki WFI',
    gampCategory: 'Category 3',
    gxpAspect: 'Data Integrity',
    potentialFailureMode: 'Stempel waktu (timestamp video) CCTV meleset dari jam rujukan resmi sehingga rekaman tidak dapat digunakan sebagai bukti investigasi deviasi GxP',
    potentialEffect: 'Ketidakmampuan memberikan bukti investigasi root-cause pada auditor BPOM/FDA saat terjadi kontaminasi batch, berujung pada penolakan dossier investigasi.',
    potentialCause: 'Layanan NTP lokal kamera IP terputus dari Stratum-1 master clock atau konfigurasi zona waktu salah.',
    severity: 2,
    severityReason: 'Sedang: Bukti rekaman pendukung investigasi deviasi GxP tidak sinkron dengan data log SCADA/MES.',
    probability: 2,
    probabilityReason: 'Moderat: Kamera IP firmware generic sering mengalami drift waktu internal jika sinkronisasi NTP putus.',
    initialRiskClass: 'Class 2 (Medium)',
    detectability: 2,
    detectabilityReason: 'Sedang: Terdeteksi saat penarikan rekaman investigasi deviasi.',
    initialRpn: 8, // 2 * 2 * 2
    mitigationControls: [
      'Sinkronisasi periodik wajib ke Dual NTP Stratum-1 Master Clock GPS setiap 60 detik dengan alarm alert jika offset > 100 ms.',
      'Penyimpanan video kamera cleanroom pada storage berkapasitas retensi 90 hari dengan proteksi overwrite lock.',
      'Watermarking kriptografis pada setiap frame video untuk membuktikan rekaman tidak dimanipulasi.',
      'Ronde harian IT Engineer (SOP-IT-001) memverifikasi timestamp watermark pada live view monitor ruang kendali.'
    ],
    controlTypes: ['Technical / Automated', 'Procedural / SOP', 'Qualification Testing'],
    testingDeliverables: [
      'Protokol OQ TC-OQ-CCTV-008: Uji sinkronisasi jam kamera terhadap NTP Stratum-1 dan verifikasi deviasi < 50 ms.',
      'Protokol OQ Security TC-OQ-CCTV-011: Verifikasi integritas watermark digital rekaman saat diekspor.',
      'Protokol OQ TC-OQ-CCTV-014: Uji simulasi pemutusan jaringan kamera dan verifikasi penyimpanan edge storage internal.'
    ],
    residualSeverity: 2,
    residualProbability: 1,
    residualDetectability: 1,
    residualRpn: 2,
    residualRiskLevel: 'Low Risk',
    status: 'Approved by QA',
    assessedBy: 'Heri Wibowo (Lead IT Engineer)',
    qaApprovedBy: 'apt. Siti Rahmawati (QA Compliance Manager)',
    lastAssessmentDate: '2026-09-17'
  }
];
