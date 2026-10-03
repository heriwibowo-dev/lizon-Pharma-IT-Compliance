import {
  GxpSystem,
  AlcoaPrinciple,
  AlcoaAuditQuestion,
  AuditTrailReviewRecord,
  InfrastructureNode,
  ChangeControlItem,
  InspectionQuestion,
  BackupRecord,
  DailyRoundItem,
  GxpIncident,
  SopDocument,
  AuditTrailEntry
} from '../types/pharma';

export const PLANT_PROFILE = {
  companyName: 'PT. LIZON PHARMA INDONESIA',
  facilityName: 'Pabrik Farmasi Baru Cikarang (Plant 1)',
  address: 'Kawasan Industri GIIC Cikarang Pusat, Bekasi, Jawa Barat 17530',
  gmpLicense: 'CPOB/BPOM-JBR/2026/0488',
  fdaEstablishmentId: 'FEI-3028491029',
  certification: ['BPOM CPOB 2024 (Steril & Non-Steril)', 'ISO 27001:2022', 'ISO 9001:2015', 'PIC/S GMP'],
  productionLines: [
    'Lini 1: Solid Oral Dosage (Tablet & Kapsul Kering)',
    'Lini 2: Sterile Injectable / Small Volume Parenteral (SVP - Ampul & Vial)',
    'Lini 3: Water For Injection (WFI) & Pure Steam Generation',
    'Lini 4: High-Bay Automated Storage & Retrieval System (ASRS Warehouse)'
  ]
};

export const GXP_SYSTEMS: GxpSystem[] = [
  {
    id: 'sys-bms',
    code: 'BMS-01',
    name: 'Building Management System (BMS)',
    description: 'Sistem otomasi kontrol tata udara cleanroom (HVAC), tekanan diferensial cascade (Grade A, B, C, D), chiller, dan airlock interlock.',
    area: 'Fasilitas Produksi Steril & HVAC Plant Room',
    gampCategory: 'Category 4',
    gxpImpact: 'Direct GxP',
    part11Applicable: true,
    phase: 'Operation & Maintenance',
    validationStatus: 'Fully Validated',
    owner: 'Engineering & Facility Dept',
    itLead: 'IT Engineer (Plant GxP)',
    lastValidated: '2026-03-15',
    nextPeriodicReview: '2027-03-15',
    rtoHours: 1,
    rpoHours: 0.5,
    backupFrequency: 'Daily Automated Incremental + Weekly Full',
    auditTrailReviewFreq: 'Monthly',
    version: 'Honeywell EBI R510 GxP Edition',
    vendor: 'Honeywell Process Solutions'
  },
  {
    id: 'sys-ems',
    code: 'EMS-01',
    name: 'Environmental Monitoring System (EMS)',
    description: 'Perekaman berkelanjutan 24/7 suhu, kelembaban relatif (RH), dan partikel non-viabel di Ruang Bersih Kelas A/B/C/D.',
    area: 'Cleanroom Filling & QC Micro Lab',
    gampCategory: 'Category 4',
    gxpImpact: 'Direct GxP',
    part11Applicable: true,
    phase: 'Operation & Maintenance',
    validationStatus: 'Fully Validated',
    owner: 'Quality Assurance & Microbiology',
    itLead: 'IT Engineer (Data Integrity)',
    lastValidated: '2026-04-10',
    nextPeriodicReview: '2027-04-10',
    rtoHours: 2,
    rpoHours: 0.25,
    backupFrequency: 'Continuous Mirroring + Daily Snapshot',
    auditTrailReviewFreq: 'Monthly',
    version: 'Rotronic RMS Enterprise v2.4 (21 CFR Part 11 Compliant)',
    vendor: 'Rotronic AG'
  },
  {
    id: 'sys-acs',
    code: 'ACS-01',
    name: 'Access Control System (ACS)',
    description: 'Sistem pembatasan akses fisik berbasis RFID & Biometrik untuk pintu cleanroom steril, ruang server IT, dan ruang arsip dokumen batch.',
    area: 'Seluruh Gedung Pabrik & Cleanroom Airlocks',
    gampCategory: 'Category 4',
    gxpImpact: 'Indirect GxP',
    part11Applicable: true,
    phase: 'Operation & Maintenance',
    validationStatus: 'Fully Validated',
    owner: 'Security & IT Department',
    itLead: 'IT Engineer (Infrastructure)',
    lastValidated: '2026-02-20',
    nextPeriodicReview: '2027-02-20',
    rtoHours: 4,
    rpoHours: 1,
    backupFrequency: 'Daily Automated Snapshot',
    auditTrailReviewFreq: 'Quarterly',
    version: 'LenelS2 OnGuard 8.2 Enterprise',
    vendor: 'Carrier / LenelS2'
  },
  {
    id: 'sys-cctv',
    code: 'CCTV-01',
    name: 'IP CCTV Cleanroom & Facility Surveillance',
    description: 'Kamera IP resolusi 4K untuk monitoring proses aseptis ruang steril, area penimbangan bahan aktif, dan koridor cleanroom dengan watermarking anti-tamper.',
    area: 'Cleanroom Grade A/B/C/D & Gudang Prekursor',
    gampCategory: 'Category 3',
    gxpImpact: 'Indirect GxP',
    part11Applicable: false,
    phase: 'Operation & Maintenance',
    validationStatus: 'Fully Validated',
    owner: 'QA & Security',
    itLead: 'IT Engineer (Infrastructure)',
    lastValidated: '2026-01-18',
    nextPeriodicReview: '2027-01-18',
    rtoHours: 6,
    rpoHours: 2,
    backupFrequency: 'NVR RAID 6 + SAN Offsite Archiving (Retensi 3 Tahun)',
    auditTrailReviewFreq: 'Quarterly',
    version: 'Milestone XProtect Corporate 2025 R2',
    vendor: 'Milestone Systems'
  },
  {
    id: 'sys-erp',
    code: 'ERP-01',
    name: 'SAP S/4HANA Enterprise Resource Planning',
    description: 'Modul PP-PI (Production Planning for Process Industries), QM (Quality Management), MM (Materials Management), dan Batch Release GxP.',
    area: 'Corporate & Supply Chain Operations',
    gampCategory: 'Category 4',
    gxpImpact: 'Direct GxP',
    part11Applicable: true,
    phase: 'Operation & Maintenance',
    validationStatus: 'Fully Validated',
    owner: 'Supply Chain & Finance',
    itLead: 'IT Lead (Business Applications)',
    lastValidated: '2026-05-01',
    nextPeriodicReview: '2027-05-01',
    rtoHours: 4,
    rpoHours: 1,
    backupFrequency: 'HANA Live Replication + Hourly Logs + Daily Full',
    auditTrailReviewFreq: 'Monthly',
    version: 'SAP S/4HANA 2023 FPS02 Cloud Private',
    vendor: 'SAP SE'
  },
  {
    id: 'sys-mes',
    code: 'MES-01',
    name: 'Manufacturing Execution System (Werum PAS-X)',
    description: 'Electronic Batch Record (EBR), Electronic Weighing & Dispensing, manajemen material barcode, dan integrasi penimbangan raw material kritis.',
    area: 'Lantai Produksi Solid & Sterile Dispensing',
    gampCategory: 'Category 4',
    gxpImpact: 'Direct GxP',
    part11Applicable: true,
    phase: 'Operation & Maintenance',
    validationStatus: 'Fully Validated',
    owner: 'Manufacturing Dept',
    itLead: 'IT Engineer (Plant GxP Systems)',
    lastValidated: '2026-04-28',
    nextPeriodicReview: '2027-04-28',
    rtoHours: 1,
    rpoHours: 0.1,
    backupFrequency: 'Real-time High Availability Cluster + Daily WORM SAN',
    auditTrailReviewFreq: 'Per Batch',
    version: 'Werum PAS-X v3.2.1 Core EBR',
    vendor: 'Körber Pharma Software'
  },
  {
    id: 'sys-lims',
    code: 'LIMS-01',
    name: 'LabVantage LIMS & Waters Empower CDS',
    description: 'Laboratory Information Management System untuk pengujian bahan baku, produk jadi, stabilitas, dan kromatografi HPLC/GC Waters Empower 3.',
    area: 'Laboratorium QC Kimia & Mikrobiologi',
    gampCategory: 'Category 4',
    gxpImpact: 'Direct GxP',
    part11Applicable: true,
    phase: 'Operation & Maintenance',
    validationStatus: 'Fully Validated',
    owner: 'Quality Control (QC)',
    itLead: 'IT Engineer (Data Integrity)',
    lastValidated: '2026-03-30',
    nextPeriodicReview: '2027-03-30',
    rtoHours: 2,
    rpoHours: 0.5,
    backupFrequency: 'Daily Raw Data Archive + Immutable Cloud WORM',
    auditTrailReviewFreq: 'Per Batch',
    version: 'LabVantage 8.8 Pharma + Empower 3 FR5',
    vendor: 'LabVantage Solutions / Waters'
  },
  {
    id: 'sys-scada',
    code: 'SCADA-01',
    name: 'SCADA WFI, Purified Water, & Clean Steam',
    description: 'Sistem pengawasan dan kendali terpusat untuk pembangkitan air murni (PW), Air Untuk Injeksi (WFI), Pure Steam, dan Clean In Place (CIP/SIP).',
    area: 'Water Treatment Plant & Utility Room',
    gampCategory: 'Category 4',
    gxpImpact: 'Direct GxP',
    part11Applicable: true,
    phase: 'Operation & Maintenance',
    validationStatus: 'Fully Validated',
    owner: 'Utility & Engineering Dept',
    itLead: 'IT Engineer (OT Systems)',
    lastValidated: '2026-05-12',
    nextPeriodicReview: '2027-05-12',
    rtoHours: 1,
    rpoHours: 0.25,
    backupFrequency: 'Daily Automated PLC & Historian Backup',
    auditTrailReviewFreq: 'Monthly',
    version: 'Siemens WinCC Unified V19 & S7-1500 Redundant PLC',
    vendor: 'Siemens Industrial Automation'
  }
];

export const ALCOA_PRINCIPLES: AlcoaPrinciple[] = [
  {
    id: 'alc-a',
    letter: 'A',
    name: 'Attributable',
    fullName: 'Dapat Diatribusikan (Attributable)',
    description: 'Setiap data atau entri harus dapat ditelusuri dengan pasti ke orang yang melakukan tindakan, termasuk waktu, tanggal, dan perangkat yang digunakan.',
    pharmaApplication: 'Semua analis QC dan operator produksi memiliki User ID unik. Tidak diperbolehkan akun bersama (no shared/generic accounts seperti "operator1" atau "qc_lab").',
    itTechnicalControl: 'Integrasi SSO Active Directory / LDAP dengan enforce password complexity, kartu smartcard RFID di cleanroom terminal, serta penonaktifan akun otomatis setelah 30 hari tidak aktif.',
    regulatoryReference: '21 CFR 11.10(d), EU Annex 11 Clause 12, PIC/S PI-041 Bagian 8.1',
    status: 'Compliant',
    criticalCheckpoints: [
      'Zero shared generic accounts pada LIMS, MES, SCADA, dan BMS',
      'Setiap tanda tangan elektronik memiliki 2 komponen unik (Password + OTP/PIN/Smartcard)',
      'Log audit mencatat User ID, timestamp, dan reason code untuk setiap perubahan data'
    ]
  },
  {
    id: 'alc-l',
    letter: 'L',
    name: 'Legible',
    fullName: 'Dapat Dibaca & Dipahami (Legible & Traceable)',
    description: 'Data dan catatan elektronik harus dapat dibaca, dipahami, dan dipelihara dalam format yang terbaca oleh manusia selama masa retensi resmi.',
    pharmaApplication: 'Laporan kromatografi, batch record elektronik (EBR), dan log alarm disimpan dalam format standar terbuka (PDF/A, XML, SQL) yang tidak bergantung pada hardware usang.',
    itTechnicalControl: 'Validasi skema database, konversi arsip batch ke format PDF/A terindeks dengan metadata pencarian, serta penyediaan penampil data (viewers) terverifikasi untuk inspektur BPOM.',
    regulatoryReference: '21 CFR 11.10(b), EU Annex 11 Clause 9, BPOM CPOB Aneks 11 Butir 9',
    status: 'Compliant',
    criticalCheckpoints: [
      'Format data mentah (raw data) dan metadata dapat diekstrak tanpa kehilangan konteks',
      'Audit trail menyajikan nilai sebelum (old value), nilai sesudah (new value), dan alasan perubahan',
      'Font dan resolusi tampilan terstandarisasi untuk presentasi audit'
    ]
  },
  {
    id: 'alc-c',
    letter: 'C',
    name: 'Contemporaneous',
    fullName: 'Seketika / Bersamaan Waktu (Contemporaneous)',
    description: 'Perekaman data harus dilakukan pada saat tindakan atau pengujian tersebut sedang berlangsung, bukan ditunda atau di-backdate.',
    pharmaApplication: 'Data timbangan MES dicatat otomatis saat penimbangan serbuk aktif. Hasil pembacaan suhu sterilisasi autoclave dicatat per detik secara real-time.',
    itTechnicalControl: 'Sinkronisasi waktu terpusat melalui Dual NTP Server (Stratum-1 bersumber GPS) di IDMZ. Operator dan pengguna lokal diblokir dari hak mengubah tanggal/jam Windows/Linux.',
    regulatoryReference: '21 CFR 11.10(e), PIC/S PI-041 Bagian 8.4, WHO TRS 996 Aneks 5',
    status: 'Compliant',
    criticalCheckpoints: [
      'Deviasi drift jam seluruh server dan PLC < 50 milidetik',
      'Blokade hak "Change System Time" pada Group Policy Object (GPO) untuk semua user non-domain admin',
      'Peringatan otomatis jika workstation gagal sinkronisasi NTP lebih dari 3 jam berturut-turut'
    ]
  },
  {
    id: 'alc-o',
    letter: 'O',
    name: 'Original',
    fullName: 'Asli / Salinan Sah (Original or True Copy)',
    description: 'Catatan pertama yang dibuat dari data primer (raw data elektronik) harus disimpan dalam format aslinya atau sebagai salinan sah (true copy) yang terverifikasi.',
    pharmaApplication: 'File data spektra HPLC (.raw Waters Empower) adalah data asli. Cetakan kertas PDF hanyalah salinan turunan. Data mentah asli wajib disimpan utuh.',
    itTechnicalControl: 'Penyimpanan langsung file instrumen ke network share terisolasi (DFS) dengan izin read-only bagi analis QC, dan replikasi immutable ke SAN WORM storage.',
    regulatoryReference: '21 CFR 11.10(c), EU Annex 11 Clause 17, FDA Data Integrity Guidance Q&A #1',
    status: 'Compliant',
    criticalCheckpoints: [
      'Prosedur "True Copy Certification" terdokumentasi dalam SOP-IT-001',
      'Penyimpanan data mentah elektronik mencakup semua parameter instrumen dan metode integrasi',
      'Pemeriksaan integritas hash digital (SHA-256) saat migrasi atau backup'
    ]
  },
  {
    id: 'alc-a2',
    letter: 'A',
    name: 'Accurate',
    fullName: 'Akurat & Bebas Kesalahan (Accurate)',
    description: 'Data harus akurat, bebas dari kesalahan hitung, telah diverifikasi, dan dihasilkan dari sistem komputerisasi yang terkualifikasi dan instrumen yang terkalibrasi.',
    pharmaApplication: 'Perhitungan kadar zat aktif pada LIMS menggunakan rumus terenkripsi yang telah divalidasi dengan batas toleransi pembulatan yang telah ditetapkan QA.',
    itTechnicalControl: 'Input validation (range checking, format mask, checksum), pembatasan desimal terkonfigurasi pada software, dan pemeliharaan skrip validasi kalkulasi.',
    regulatoryReference: '21 CFR 11.10(a), ISO 17025, ISPE GAMP 5 Bagian Data Integrity',
    status: 'Compliant',
    criticalCheckpoints: [
      'Pemeriksaan validasi input pada form formulasi batch MES',
      'Verifikasi akurasi matematis saat proses instalasi dan kualifikasi operasional (IQ/OQ)',
      'Mekanisme second-person verification (dual sign-off) untuk parameter pelepasan produk kritis'
    ]
  },
  {
    id: 'alc-c2',
    letter: '+C',
    name: 'Complete',
    fullName: 'Lengkap (Complete)',
    description: 'Semua data yang dihasilkan (termasuk pengujian awal, pengujian gagal, uji coba, dan data pengujian ulang) wajib tersimpan tanpa penghapusan atau filter selektif.',
    pharmaApplication: 'Larangan keras melakukan pengujian "trial injection" pada HPLC tanpa nomor urut pengujian. Semua data injection uji stabilitas harus tersimpan utuh di LIMS.',
    itTechnicalControl: 'Audit trail yang di-enable secara permanen di tingkat sistem operasi dan database; penghapusan data (DELETE command) di-revoke dari semua akun aplikasi.',
    regulatoryReference: '21 CFR 211.68(b), PIC/S PI-041 Bagian 8.6, WHO TRS 996',
    status: 'Compliant',
    criticalCheckpoints: [
      'Audit trail tidak dapat dimatikan oleh administrator lokal instrumen',
      'Database tidak memiliki opsi "Hard Delete" pada interface pengguna',
      'Penomoran sekuensial yang tidak dapat diinterupsi pada setiap pengujian instrumen'
    ]
  },
  {
    id: 'alc-co',
    letter: '+C',
    name: 'Consistent',
    fullName: 'Konsisten (Consistent)',
    description: 'Semua elemen data tidak boleh bertentangan; urutan kronologis kejadian harus selaras dan konsisten di seluruh sistem pabrik (BMS, MES, LIMS, CCTV).',
    pharmaApplication: 'Waktu awal penimbangan bahan baku di MES harus konsisten dengan waktu pembukaan pintu airlock pada Access Control System (ACS) dan log CCTV.',
    itTechnicalControl: 'Sentralisasi log ke SIEM/Syslog server terpusat dengan korelasi timestamp terpadu di Industrial DMZ.',
    regulatoryReference: 'FDA Data Integrity Guidance 2018, EMA Reflection Paper Data Integrity',
    status: 'Compliant',
    criticalCheckpoints: [
      'Korelasi log kejadian lintas sistem (Cross-system event correlation)',
      'Urutan alur kerja status batch (Draft -> In-Process -> QC Testing -> QA Released) terkunci sekuensial',
      'Audit trail menolak input waktu mundur (backdated entries)'
    ]
  },
  {
    id: 'alc-e',
    letter: '+E',
    name: 'Enduring',
    fullName: 'Tahan Lama (Enduring)',
    description: 'Data harus tersimpan secara aman pada media penyimpanan yang terbukti tahan lama dan terlindungi dari kerusakan fisik maupun kerusakan logika software.',
    pharmaApplication: 'Catatan batch produk steril harus tersimpan minimal 5 tahun setelah tanggal kedaluwarsa produk atau minimal 10 tahun untuk arsip registrasi obat.',
    itTechnicalControl: 'Arsitektur penyimpanan enterprise: SAN NetApp Fabric-Attached Storage dengan disk Enterprise SAS, replikasi offsite, dan enkripsi at-rest AES-256.',
    regulatoryReference: '21 CFR 211.180, EU GMP Chapter 4, BPOM CPOB Bab 10 Dokumentasi',
    status: 'Compliant',
    criticalCheckpoints: [
      'Media penyimpanan memiliki sertifikasi daya tahan minimal 15 tahun',
      'Uji pembacaan ulang media arsip tahunan (Media longevity test)',
      'Suhu & kelembaban ruang server IT termonitor 24/7 di bawah 20°C / 50% RH'
    ]
  },
  {
    id: 'alc-av',
    letter: '+A',
    name: 'Available',
    fullName: 'Tersedia Segera (Available)',
    description: 'Data dan jejak audit harus dapat diakses, dicari, dan disajikan kembali untuk ditinjau oleh personel berwenang atau auditor/inspektur BPOM kapan saja.',
    pharmaApplication: 'Saat inspektur BPOM meminta riwayat audit trail batch injeksi steril 6 bulan lalu, IT dan QA harus mampu menampilkan data dalam waktu maksimal 15 menit.',
    itTechnicalControl: 'Indeks pencarian terpusat, prosedur pemulihan data siap audit (Audit-Ready Restore), dan ketersediaan workstation inspektur (Inspector Terminal) siap pakai.',
    regulatoryReference: '21 CFR 11.10(b), PIC/S PI-041 Bagian 8.8, CPOB 2024 Butir 15.2',
    status: 'Compliant',
    criticalCheckpoints: [
      'SLA penyajian data historis < 15 menit selama audit berlangsung',
      'Terminal audit independen dengan hak read-only siap digunakan auditor luar',
      'Prosedur penarikan arsip (retrieval runbook) terdokumentasi dalam SOP-IT-002'
    ]
  }
];

export const ALCOA_AUDIT_QUESTIONS: AlcoaAuditQuestion[] = [
  {
    id: 'q-1',
    category: 'Kontrol Pengguna & Atribusi (Attributable)',
    question: 'Apakah seluruh pengguna sistem GxP (LIMS, MES, SCADA, BMS) memiliki User ID individu yang unik tanpa adanya akun bersama (shared account)?',
    regulatoryClause: '21 CFR 11.10(d), CPOB Aneks 11 Butir 12',
    systemScope: 'LIMS, MES, SCADA, BMS, ACS',
    weight: 10,
    options: [
      { label: 'Ya, 100% akun individual dengan enforce SSO/MFA unik', score: 10, findingType: 'None' },
      { label: 'Sebagian besar unik, namun ada 1-2 PC utilitas memakai akun operator bersama', score: 5, findingType: 'Major', remediation: 'Segera hapus akun bersama, terapkan login kartu RFID per operator.' },
      { label: 'Masih ditemukan akun bersama tanpa login individual', score: 0, findingType: 'Critical', remediation: 'Pelanggaran Kritis Data Integrity. Wajib terbitkan CAPA segera dan ganti akun.' }
    ]
  },
  {
    id: 'q-2',
    category: 'Sinkronisasi Waktu Server (Contemporaneous)',
    question: 'Apakah seluruh server, workstation laboratorium, dan PLC terhubung ke sumber waktu NTP terpusat dan pengguna lokal dilarang mengubah jam sistem?',
    regulatoryClause: '21 CFR 11.10(e), PIC/S PI-041 Butir 8.4',
    systemScope: 'Seluruh Domain & Workstation Terkoneksi GxP',
    weight: 10,
    options: [
      { label: 'Tersinkronisasi ke Dual NTP Master Clock, GPO memblokir perubahan jam lokal', score: 10, findingType: 'None' },
      { label: 'Tersinkronisasi ke server DC, namun beberapa instrumen standalone belum terkunci', score: 5, findingType: 'Major', remediation: 'Konfigurasi NTP client pada instrumen HPLC standalone dan kunci BIOS password.' },
      { label: 'Pengguna lokal memiliki akses mengubah waktu dan tanggal Windows', score: 0, findingType: 'Critical', remediation: 'Risiko manipulasi backdating. Cabut hak user via GPO segera.' }
    ]
  },
  {
    id: 'q-3',
    category: 'Jejak Audit / Audit Trail (Complete & Traceable)',
    question: 'Apakah fungsi Audit Trail pada sistem GxP diaktifkan secara permanen, mencatat aksi create, modify, delete, dan tidak dapat dinonaktifkan oleh administrator?',
    regulatoryClause: '21 CFR 11.10(e), EU Annex 11 Clause 9',
    systemScope: 'Waters Empower, Werum MES, Siemens WinCC',
    weight: 10,
    options: [
      { label: 'Aktif permanen, tamper-evident, dan tersimpan di database aman', score: 10, findingType: 'None' },
      { label: 'Aktif, namun administrator memiliki akses konfigurasi untuk mematikan log', score: 5, findingType: 'Major', remediation: 'Kunci hak administrator aplikasi; buat dual approval untuk perubahan config audit trail.' },
      { label: 'Audit trail belum diaktifkan atau dapat dihapus dengan mudah', score: 0, findingType: 'Critical', remediation: 'Temuan Kritis Inspeksi BPOM/FDA. Aktifkan audit trail dan jalankan verifikasi IQ/OQ.' }
    ]
  },
  {
    id: 'q-4',
    category: 'Tinjauan Jejak Audit (Audit Trail Review)',
    question: 'Apakah telah ditetapkan prosedur operasional standar (SOP) dan jadwal rutin untuk melakukan Audit Trail Review sebelum rilis batch produk?',
    regulatoryClause: 'CPOB Aneks 11 Butir 9.1, PIC/S PI-041 Bagian 9',
    systemScope: 'MES EBR, LIMS QC, SCADA Produksi',
    weight: 10,
    options: [
      { label: 'SOP berlaku, review per-batch dilakukan oleh QA dan terekam di sistem', score: 10, findingType: 'None' },
      { label: 'SOP ada, namun tinjauan dilakukan berkala bulanan bukan per-batch release', score: 5, findingType: 'Minor', remediation: 'Perbarui SOP agar review parameter kritis batch dilakukan sebelum pelulusan obat.' },
      { label: 'Belum ada bukti pelaksanaan Audit Trail Review yang terdokumentasi', score: 0, findingType: 'Critical', remediation: 'Audit trail tidak ditinjau dianggap sama dengan tidak ada audit trail. Susun SOP-IT-002.' }
    ]
  },
  {
    id: 'q-5',
    category: 'Keamanan Data Mentah Elektronik (Original / True Copy)',
    question: 'Apakah data mentah kromatografi/spektrometri disimpan dalam format file asli yang tidak dapat dimodifikasi di lokasi penyimpanan terproteksi?',
    regulatoryClause: 'FDA 21 CFR 211.68(b), WHO TRS 996 Aneks 5',
    systemScope: 'QC Analytical Instruments (HPLC, GC, FTIR, UV-Vis)',
    weight: 10,
    options: [
      { label: 'Data mentah disimpan otomatis ke network folder WORM dengan izin read-only', score: 10, findingType: 'None' },
      { label: 'Data disimpan di hard disk lokal PC instrumen sebelum di-backup manual', score: 5, findingType: 'Major', remediation: 'Konfigurasi auto-archive ke SAN server agar analis tidak bisa menghapus file lokal.' },
      { label: 'Hanya hasil cetakan PDF yang disimpan, data mentah elektronik dihapus', score: 0, findingType: 'Critical', remediation: 'Pelanggaran langsung FDA Warning Letter. Data mentah elektronik wajib dipertahankan.' }
    ]
  },
  {
    id: 'q-6',
    category: 'Kontrol Perubahan Sistem (Change Control)',
    question: 'Apakah seluruh pembaruan sistem operasi, patch software, konfigurasi, dan firmware melalui prosedur Kontrol Perubahan formal yang disetujui QA?',
    regulatoryClause: 'ISPE GAMP 5 Bagian 7, CPOB 2024 Bab Manajemen Mutu',
    systemScope: 'Seluruh Infrastruktur & Aplikasi GxP',
    weight: 10,
    options: [
      { label: '100% perubahan melalui Change Control Request (CCR) dengan pre/post approval QA', score: 10, findingType: 'None' },
      { label: 'Patch IT rutin dilakukan tanpa CCR, hanya sistem aplikasi utama yang ber-CCR', score: 5, findingType: 'Major', remediation: 'Semua patch OS pada server GxP wajib dinilai dampaknya melalui CCR minor.' },
      { label: 'Perubahan dilakukan langsung di production tanpa dokumentasi formal', score: 0, findingType: 'Critical', remediation: 'Risiko kegagalan validasi. Terapkan Change Freeze dan buat SOP-IT-004.' }
    ]
  },
  {
    id: 'q-7',
    category: 'Pencadangan & Uji Pemulihan (Backup & Disaster Recovery)',
    question: 'Apakah prosedur backup berjalan otomatis harian dan telah dilakukan uji pemulihan data (test restore) yang berhasil dalam 3 bulan terakhir?',
    regulatoryClause: '21 CFR 11.10(c), EU Annex 11 Clause 7, SOP-IT-001',
    systemScope: 'Server VM, Database GxP, SAN Storage',
    weight: 10,
    options: [
      { label: 'Backup otomatis 3-2-1 berjalan sukses dan laporan uji pemulihan triwulanan tersedia', score: 10, findingType: 'None' },
      { label: 'Backup berjalan lancar, namun uji pemulihan data belum pernah disimulasikan', score: 5, findingType: 'Major', remediation: 'Jadwalkan drill simulasi pemulihan cold restore pada server sandbox pekan ini.' },
      { label: 'Backup masih mengandalkan copy manual dan tidak ada log verifikasi integritas', score: 0, findingType: 'Critical', remediation: 'Risiko fatal kehilangan data. Otomasikan backup Veeam/Commvault ke WORM repository.' }
    ]
  },
  {
    id: 'q-8',
    category: 'Pemisahan Tugas & Hak Akses (Segregation of Duties)',
    question: 'Apakah administrator sistem IT terpisah secara independen dari pengguna bisnis (operator produksi dan analis lab) sehingga tidak ada benturan kepentingan?',
    regulatoryClause: 'PIC/S PI-041 Butir 9.3, ISO 27001 Access Control',
    systemScope: 'Active Directory, LIMS, MES, SCADA',
    weight: 10,
    options: [
      { label: 'Pemisahan tugas ketat: Analis/Operator tidak punya hak Admin; IT tidak punya hak rilis batch', score: 10, findingType: 'None' },
      { label: 'Supervisor lab memiliki hak Administrator lokal pada workstation instrumen', score: 5, findingType: 'Major', remediation: 'Tarik hak admin dari Supervisor lab; delegasikan ke tim IT Engineer yang independen.' },
      { label: 'Operator merangkap sebagai admin sistem atau vendor memiliki akses bypass terbuka', score: 0, findingType: 'Critical', remediation: 'Benturan kepentingan fatal. Reset semua privilege dan terapkan prinsip Least Privilege.' }
    ]
  }
];

export const PURDUE_NODES: InfrastructureNode[] = [
  {
    id: 'p-01',
    name: 'Cleanroom Sensor & Actuator Cluster',
    level: 'Level 0',
    levelName: 'Process Physical Devices',
    ipAddress: 'Hardwired 4-20mA / IO-Link',
    vlan: 'N/A (Fieldbus)',
    status: 'Online',
    redundancy: 'Dual Transmitters',
    securityZone: 'Zone 0 (Physical Cleanroom Grade A/B)',
    description: 'Sensor suhu RTD Pt100, transmitter tekanan diferensial Vaisala, dan flow meter WFI.'
  },
  {
    id: 'p-02',
    name: 'Siemens S7-1500 Redundant PLC Racks',
    level: 'Level 1',
    levelName: 'Basic Industrial Control',
    ipAddress: '192.168.10.11 / 192.168.10.12',
    vlan: 'VLAN 10 - OT Control Ring',
    status: 'Online',
    redundancy: 'Dual CPU Hot Standby',
    securityZone: 'Zone 1 (Industrial Control Cabinet)',
    description: 'Kontroler otomasi untuk sistem HVAC BMS, Purified Water generation, dan sterilisasi autoclave.'
  },
  {
    id: 'p-03',
    name: 'Industrial Touchscreen HMI Terminals',
    level: 'Level 2',
    levelName: 'Area Supervisory Control',
    ipAddress: '192.168.20.51 - 192.168.20.75',
    vlan: 'VLAN 20 - HMI Supervisory',
    status: 'Online',
    redundancy: 'Dual Ethernet Hirschmann Rings',
    securityZone: 'Zone 2 (Cleanroom Stainless Steel Panels IP65)',
    description: 'Panel operasi operator Siemens Comfort Panel & Advantech Cleanroom Touchscreen.'
  },
  {
    id: 'p-04',
    name: 'MES & BMS Site Operations Cluster',
    level: 'Level 3',
    levelName: 'Manufacturing Operations Management (MOM)',
    ipAddress: '10.10.30.15 - 10.10.30.22',
    vlan: 'VLAN 30 - Plant Operations',
    status: 'Online',
    redundancy: 'VMware vSphere HA Cluster (N+1)',
    securityZone: 'Zone 3 (Plant Data Center Server Racks)',
    description: 'Server aplikasi Werum PAS-X EBR, Honeywell EBI BMS, Rotronic RMS EMS, dan Industrial Historian.'
  },
  {
    id: 'p-05',
    name: 'Industrial DMZ (IDMZ) Bastion & NTP Gateways',
    level: 'Level 3.5',
    levelName: 'Industrial Demilitarized Zone (IDMZ)',
    ipAddress: '10.10.35.1 - 10.10.35.10',
    vlan: 'VLAN 35 - Secure IDMZ Gateway',
    status: 'Online',
    redundancy: 'Dual FortiGate Industrial Firewalls Active-Passive',
    securityZone: 'Zone 3.5 (Perimeter Gateway)',
    description: 'Jump Host dengan MFA, NTP Stratum-1 Server lokal, WSUS Patch Server OT, dan Syslog SIEM Collector.'
  },
  {
    id: 'p-06',
    name: 'Enterprise SAP ERP & LabVantage LIMS Core',
    level: 'Level 4',
    levelName: 'Enterprise Business Logistics',
    ipAddress: '10.10.40.10 - 10.10.40.50',
    vlan: 'VLAN 40 - Enterprise GxP Core',
    status: 'Online',
    redundancy: 'High Availability Multi-AZ SAN Mirror',
    securityZone: 'Zone 4 (Enterprise Datacenter)',
    description: 'SAP S/4HANA Private Cloud, LabVantage LIMS, Active Directory Corporate, dan Documentum DMS.'
  }
];

export const CHANGE_CONTROLS: ChangeControlItem[] = [
  {
    id: 'ccr-001',
    ccrNumber: 'CCR-2026-IT-0042',
    title: 'Pembaruan Firmware Hirschmann Industrial Switches pada OT Ring VLAN 10',
    systemId: 'sys-scada',
    systemName: 'SCADA WFI & Purified Water Network',
    category: 'Hardware',
    priority: 'Medium',
    gxpImpact: true,
    revalidationRequired: true,
    qualificationSteps: ['IQ', 'Delta OQ', 'Regression Testing'],
    status: 'In Implementation',
    requestedBy: 'Senior IT Engineer',
    qaApprover: 'QA Validation Manager',
    targetDate: '2026-10-15',
    rollbackPlan: 'Flash kembali image firmware v09.1.02 dari repositori TFTP backup dalam 15 menit.'
  },
  {
    id: 'ccr-002',
    ccrNumber: 'CCR-2026-IT-0043',
    title: 'Penambahan Skrip Integrasi Barcode Scanner Datalogic 2D pada Werum PAS-X MES Dispensing',
    systemId: 'sys-mes',
    systemName: 'Manufacturing Execution System (Werum PAS-X)',
    category: 'Configuration',
    priority: 'High',
    gxpImpact: true,
    revalidationRequired: true,
    qualificationSteps: ['IQ', 'OQ', 'PQ'],
    status: 'Under Risk Assessment',
    requestedBy: 'Production IT Specialist',
    qaApprover: 'QA Compliance Head',
    targetDate: '2026-10-22',
    rollbackPlan: 'Kembalikan file konfigurasi pasx_device_mapping.xml ke versi r3.2.14 dan restart service.'
  },
  {
    id: 'ccr-003',
    ccrNumber: 'CCR-2026-IT-0044',
    title: 'Migrasi Volume Repositori Audit Trail LIMS ke NetApp SnapLock Compliance WORM',
    systemId: 'sys-lims',
    systemName: 'LabVantage LIMS & Waters Empower',
    category: 'Software',
    priority: 'High',
    gxpImpact: true,
    revalidationRequired: true,
    qualificationSteps: ['IQ', 'Delta OQ'],
    status: 'Pre-Approved by QA',
    requestedBy: 'Data Integrity Lead IT',
    qaApprover: 'Head of Quality Assurance',
    targetDate: '2026-10-18',
    rollbackPlan: 'Alihkan pointer LIMS archive path kembali ke LUN primer yang ter-mirror.'
  },
  {
    id: 'ccr-004',
    ccrNumber: 'CCR-2026-IT-0045',
    title: 'Pemasangan Sensor Suhu Rack Tambahan pada Server Room B Clean Agent Zone',
    systemId: 'sys-bms',
    systemName: 'Building Management System (BMS)',
    category: 'Hardware',
    priority: 'Low',
    gxpImpact: false,
    revalidationRequired: false,
    qualificationSteps: ['IQ'],
    status: 'Draft',
    requestedBy: 'Facility Maintenance Engineer',
    qaApprover: 'Pending Submission',
    targetDate: '2026-11-01',
    rollbackPlan: 'Lepas kabel Modbus sensor dan hapus tag address dari template monitoring.'
  }
];

export const INSPECTION_DEFENSE_QUESTIONS: InspectionQuestion[] = [
  {
    id: 'insp-01',
    agency: 'BPOM',
    topic: 'Integritas Data & Proteksi Waktu (CPOB 2024 Aneks 11 Butir 9)',
    inspectorQuestion: 'Bagaimana Anda membuktikan bahwa operator atau analis lab tidak dapat mengubah tanggal dan jam pada komputer untuk memanipulasi waktu pengujian (backdating)?',
    backgroundIntent: 'Inspektur mencari celah apakah workstation instrumen berada dalam kontrol domain atau beroperasi standalone dengan hak admin lokal yang memungkinkan pemalsuan data.',
    recommendedAnswer: 'Seluruh workstation pengujian terhubung ke Active Directory domain pabrik kami. Melalui Group Policy Object (GPO: GPO-GXP-WORKSTATION-HARDENING), hak istimewa "Change the system time" telah dicabut secara mutlak dari akun operator dan local users. Waktu sistem secara otomatis disinkronkan setiap 15 menit ke Dual NTP Master Clock Stratum-1 di Industrial DMZ yang mengacu pada referensi GPS. Setiap upaya pengubahan waktu yang gagal akan memicu event audit log ID 4616 di SIEM server kami.',
    evidenceDocuments: [
      'SOP-IT-006: Prosedur Sinkronisasi Waktu dan Proteksi Jam Sistem GxP',
      'Laporan Kualifikasi GPO Audit: GPO-GXP-TIME-PROTECTION-REPORT.pdf',
      'Log Audit Trail NTP Drift mingguan (menunjukkan drift < 15 milidetik)',
      'Video demonstrasi uji OQ: Uji penolakan pengubahan jam oleh operator'
    ],
    defensiveTips: [
      'Jangan menjawab: "Kami percaya analis kami jujur". Selalu tunjukkan kontrol teknis sistem yang memblokir opsi tersebut.',
      'Buka langsung menu Date & Time pada salah satu PC uji lab untuk memperlihatkan pesan "Some settings are managed by your organization" yang terkunci abu-abu.'
    ]
  },
  {
    id: 'insp-02',
    agency: 'US FDA',
    topic: 'Audit Trail Review (21 CFR Part 11.10(e) & FDA Guidance 2018)',
    inspectorQuestion: 'Tunjukkan bukti pelaksanaan Audit Trail Review terkini untuk sistem kromatografi HPLC di lab QC sebelum rilis batch komersial terakhir Anda.',
    backgroundIntent: 'FDA ingin memastikan bahwa tinjauan audit trail bukan sekadar checklist formalitas administratif, melainkan benar-benar ditinjau untuk parameter kritis (seperti re-integrasi, injeksi yang dibatalkan, atau sequence interrupt).',
    recommendedAnswer: 'Sesuai dengan SOP-IT-002 (Tinjauan Jejak Audit Sistem Komputerisasi), tinjauan audit trail HPLC Waters Empower dilakukan dalam dua tingkat: Tingkat 1 adalah review per-batch oleh Analis & Supervisor QC sebelum pelulusan Certificate of Analysis (CoA), dan Tingkat 2 adalah review independen bulanan oleh QA & IT untuk mendeteksi anomali sistem (seperti login failure berulang atau modifikasi metode). Berikut adalah Laporan Audit Trail Review Batch #LZN-2026-INJ-0082 yang ditandatangani secara elektronik dengan rincian pengecekan 14 titik kritis.',
    evidenceDocuments: [
      'Formulir ATR-LZN-2026-09-082 (Tinjauan Jejak Audit Batch Injeksi Terakhir)',
      'SOP-IT-002: Prosedur Tinjauan Jejak Audit Sistem Komputerisasi',
      'Matriks Titik Kritis Jejak Audit (Audit Trail Review Risk Matrix)',
      'Laporan Exception Log bulanan yang ditinjau oleh QA Head'
    ],
    defensiveTips: [
      'Tunjukkan rincian filter audit trail yang digunakan: filter event "Manual Integration", "Method Modified", "Sample Deleted", dan "Acquisition Aborted".',
      'Perlihatkan tanda tangan elektronik ganda (Reviewer dan Approver) dengan timestamp yang sesuai.'
    ]
  },
  {
    id: 'insp-03',
    agency: 'PIC/S',
    topic: 'Pemisahan Tugas & Hak Akses Administrator (PIC/S PI-041 Butir 9.3)',
    inspectorQuestion: 'Siapa saja yang memegang hak "Administrator" pada database LIMS dan MES? Apakah personel laboratorium atau tim produksi memiliki kata sandi admin tersebut?',
    backgroundIntent: 'PIC/S sangat ketat terhadap Segregation of Duties. Jika personel yang menghasilkan data memiliki hak admin atas database tempat data tersebut disimpan, terdapat temuan mayor/kritis atas risiko konflik kepentingan.',
    recommendedAnswer: 'Di PT. LIZON Pharma Indonesia, hak Administrator aplikasi dan database dikelola secara eksklusif oleh personel Departemen IT yang independen dari fungsi laboratorium dan produksi. Kepala Laboratorium QC dan Manajer Produksi memiliki hak tertinggi sebagai "Business Approver", namun mereka tidak memiliki kredensial administratif sistem, tidak memiliki akses ke database SQL, dan tidak dapat memodifikasi konfigurasi jejak audit. Kredensial akun service/admin disimpan dalam CyberArk PAM vault dengan rotasi otomatis dan dual-authorization.',
    evidenceDocuments: [
      'Matriks Kontrol Akses Pengguna (User Access Matrix UAM-2026-v2)',
      'Laporan Quarterly User Access Review (QUAR Q3-2026)',
      'SOP-IT-003: Manajemen Akun Pengguna dan Pemisahan Tugas (SoD)',
      'Formulir Perjanjian Kerahasiaan & Non-Disclosure Administrator IT'
    ],
    defensiveTips: [
      'Tunjukkan file User Access Matrix yang ditandatangani oleh QA, IT, dan User Department Head.',
      'Perlihatkan hasil ekspor daftar akun pengguna aktif di SQL Server untuk membuktikan bahwa tidak ada akun QC bertindak sebagai sysadmin.'
    ]
  },
  {
    id: 'insp-04',
    agency: 'BPOM',
    topic: 'Pencadangan, Pemulihan, & Ketahanan Bencana (CPOB Aneks 11 Butir 7)',
    inspectorQuestion: 'Tunjukkan protokol dan laporan uji pemulihan data (restore verification drill) terakhir Anda untuk membuktikan bahwa backup Anda benar-benar dapat direstorasi saat bencana.',
    backgroundIntent: 'Banyak pabrik memiliki backup otomatis namun gagal ketika diminta merestorasi karena data korup atau media tidak terbaca. Inspektur ingin bukti pengujian restorasi aktual.',
    recommendedAnswer: 'Kami menerapkan strategi backup 3-2-1-1 (3 salinan data, 2 media berbeda, 1 salinan offsite, dan 1 salinan immutable WORM). Uji pemulihan data dilakukan secara berkala: pengujian verifikasi checksum harian secara otomatis, dan simulasi pemulihan penuh (Full Bare-Metal & Database Restore Drill) setiap kuartal ke server sandbox terisolasi. Laporan uji pemulihan terakhir kami dilaksanakan pada 18 Agustus 2026 untuk database Werum MES dan Waters LIMS dengan hasil 100% data integrity match dan RTO tercapai dalam 1 jam 12 menit (target SLA: < 2 jam).',
    evidenceDocuments: [
      'Laporan Uji Pemulihan Data: BKP-TEST-REPORT-2026-Q3.pdf',
      'SOP-IT-001: Pengelolaan Backup, Pengarsipan, dan Pemulihan Data GxP',
      'Log Otomatis Verifikasi Hash SHA-256 Backup Mingguan',
      'Sertifikat Penyimpanan Data Immutability NetApp SnapLock'
    ],
    defensiveTips: [
      'Sajikan tabel perbandingan data sebelum dan sesudah restore (record count check dan checksum hash verification).',
      'Jelaskan bahwa uji restorasi dilakukan di environment terpisah (isolated VLAN sandbox) agar tidak mengganggu operasional pabrik yang berjalan.'
    ]
  },
  {
    id: 'insp-05',
    agency: 'US FDA',
    topic: 'Validasi Sistem Komputerisasi (CSV / ISPE GAMP 5 & 21 CFR 211.68)',
    inspectorQuestion: 'Sistem Building Management System (BMS) Anda mengontrol tekanan udara cleanroom steril. Tunjukkan URS, Traceability Matrix (RTM), dan laporan kualifikasi OQ/PQ-nya.',
    backgroundIntent: 'Membuktikan kepatuhan siklus hidup validasi (V-Model) bahwa setiap kebutuhan kritis pengguna (seperti alarm selisih tekanan ruang aseptis) telah diuji dan memiliki bukti kelulusan yang dapat ditelusuri.',
    recommendedAnswer: 'Sistem BMS kami (Honeywell EBI R510) diklasifikasikan sebagai ISPE GAMP 5 Kategori 4 (Configured Product) dengan status Direct GxP Impact. Kami memiliki paket validasi lengkap yang terdiri dari URS-BMS-01, Functional Spec, Hardware/Software Design Spec, serta Traceability Matrix (RTM-BMS-01) yang menghubungkan 48 kebutuhan pengguna ke skrip uji IQ/OQ/PQ. Berikut adalah dokumen Traceability Matrix beserta laporan kualifikasi kinerja (PQ-BMS-01) yang membuktikan stabilitas tekanan diferensial cascade cleanroom selama 7 hari operasi kontinu.',
    evidenceDocuments: [
      'Requirements Traceability Matrix: RTM-BMS-01 Rev 2',
      'User Requirements Specification: URS-BMS-01',
      'Laporan Kualifikasi Operasional: OQ-BMS-01 (Uji Skenario Alarm & Power Loss Failover)',
      'Laporan Kualifikasi Kinerja: PQ-BMS-01 (Stabilitas Tekanan Cascade 7 Hari)',
      'Validation Summary Report: VSR-BMS-01 Disetujui QA Head'
    ],
    defensiveTips: [
      'Tunjukkan pada RTM bagaimana klausul kebutuhan alarm tekanan ruang Grade A dapat dilacak langsung ke nomor protokol pengujian OQ bab 4.3.',
      'Sajikan form deviasi selama kualifikasi (jika ada) dan perlihatkan bahwa seluruh deviasi telah ditutup dengan CAPA sebelum persetujuan VSR.'
    ]
  }
];

export const BACKUP_RECORDS: BackupRecord[] = [
  {
    id: 'bkp-01',
    systemName: 'Werum PAS-X MES EBR Database',
    backupType: 'Daily Incremental',
    destination: 'SAN Local',
    mediaType: 'NetApp All-Flash SAN (SnapMirror)',
    sizeGb: 148.5,
    startTime: '2026-10-02 01:00:00',
    endTime: '2026-10-02 01:18:22',
    status: 'Success',
    checksumVerified: true,
    retentionYears: 10,
    lastRestoreTest: '2026-08-18',
    restoreTestStatus: 'Passed'
  },
  {
    id: 'bkp-02',
    systemName: 'LabVantage LIMS & Waters Empower CDS',
    backupType: 'Daily Incremental',
    destination: 'Cloud Immutable (WORM)',
    mediaType: 'AWS S3 Glacier Object Lock Compliance Mode',
    sizeGb: 312.0,
    startTime: '2026-10-02 02:00:00',
    endTime: '2026-10-02 02:44:10',
    status: 'Success',
    checksumVerified: true,
    retentionYears: 15,
    lastRestoreTest: '2026-08-18',
    restoreTestStatus: 'Passed'
  },
  {
    id: 'bkp-03',
    systemName: 'Honeywell EBI BMS & Rotronic EMS Historian',
    backupType: 'Daily Incremental',
    destination: 'SAN Local',
    mediaType: 'NetApp FAS Hybrid Array',
    sizeGb: 86.4,
    startTime: '2026-10-02 03:00:00',
    endTime: '2026-10-02 03:12:45',
    status: 'Success',
    checksumVerified: true,
    retentionYears: 10,
    lastRestoreTest: '2026-08-19',
    restoreTestStatus: 'Passed'
  },
  {
    id: 'bkp-04',
    systemName: 'Siemens WinCC SCADA WFI/PW Archive',
    backupType: 'Daily Incremental',
    destination: 'SAN Local',
    mediaType: 'NetApp FAS Hybrid Array',
    sizeGb: 64.2,
    startTime: '2026-10-02 03:30:00',
    endTime: '2026-10-02 03:41:10',
    status: 'Success',
    checksumVerified: true,
    retentionYears: 10,
    lastRestoreTest: '2026-08-19',
    restoreTestStatus: 'Passed'
  },
  {
    id: 'bkp-05',
    systemName: 'SAP S/4HANA Database & Application Core',
    backupType: 'Weekly Full',
    destination: 'Tape Vault',
    mediaType: 'LTO-9 Tape Cartridge in Fireproof Safe',
    sizeGb: 840.0,
    startTime: '2026-09-27 22:00:00',
    endTime: '2026-09-28 01:25:00',
    status: 'Success',
    checksumVerified: true,
    retentionYears: 15,
    lastRestoreTest: '2026-06-25',
    restoreTestStatus: 'Passed'
  },
  {
    id: 'bkp-06',
    systemName: 'LenelS2 ACS & Milestone CCTV Surveillance Vault',
    backupType: 'Weekly Full',
    destination: 'SAN Local',
    mediaType: 'NetApp E-Series High Density Array',
    sizeGb: 1420.0,
    startTime: '2026-09-28 02:00:00',
    endTime: '2026-09-28 06:15:30',
    status: 'Success',
    checksumVerified: true,
    retentionYears: 3,
    lastRestoreTest: '2026-07-10',
    restoreTestStatus: 'Passed'
  }
];

export const DAILY_ROUNDS: DailyRoundItem[] = [
  {
    id: 'dr-01',
    category: 'Server Room Environmental',
    item: 'Suhu Udara Ruang Server Utama (In-Row Precision AC)',
    targetCriteria: '18°C - 21°C (Kritis > 24°C)',
    currentValue: '19.4°C',
    status: 'Pass',
    checkedTime: '08:00'
  },
  {
    id: 'dr-02',
    category: 'Server Room Environmental',
    item: 'Kelembaban Relatif (RH) Ruang Server',
    targetCriteria: '45% - 55% RH (Non-kondensasi)',
    currentValue: '48.2% RH',
    status: 'Pass',
    checkedTime: '08:00'
  },
  {
    id: 'dr-03',
    category: 'Power & UPS',
    item: 'Status UPS A & B (APC Symmetra PX 40kVA N+1)',
    targetCriteria: 'Bypass Normal, Beban < 65%, Baterai 100%',
    currentValue: 'Beban 44%, Baterai 100%, Runtime 48 Min',
    status: 'Pass',
    checkedTime: '08:05'
  },
  {
    id: 'dr-04',
    category: 'NTP & Time Sync',
    item: 'Stratum-1 NTP Drift terhadap Master Clock GPS',
    targetCriteria: 'Drift < 50 milidetik di seluruh node',
    currentValue: '+6.4 ms (Stabil)',
    status: 'Pass',
    checkedTime: '08:10'
  },
  {
    id: 'dr-05',
    category: 'Backup & Storage',
    item: 'Verifikasi Hasil Backup Semalam (Veeam / SnapLock)',
    targetCriteria: 'Semua job 100% Success tanpa error',
    currentValue: '6 Job Sukses, 0 Gagal (Total 2.86 TB)',
    status: 'Pass',
    checkedTime: '08:15'
  },
  {
    id: 'dr-06',
    category: 'Cleanroom Terminals',
    item: 'Integritas Terminal HMI Touchscreen Cleanroom Grade A/B',
    targetCriteria: 'Kios terkunci, port USB tersegel utuh, auto-lockout 5 min aktif',
    currentValue: '14 Kios Terverifikasi Normal & Tersegel',
    status: 'Pass',
    checkedTime: '08:30'
  },
  {
    id: 'dr-07',
    category: 'Network & Perimeter',
    item: 'IDMZ FortiGate Firewall Alert & IPS Inspection Log',
    targetCriteria: 'Nol intrusi berbahaya, zero drop pada link OT ring',
    currentValue: 'Normal, Tidak ada anomali terdeteksi',
    status: 'Pass',
    checkedTime: '08:45'
  }
];

export const GXP_INCIDENTS: GxpIncident[] = [
  {
    id: 'inc-01',
    incidentNo: 'INC-2026-IT-019',
    systemName: 'Rotronic EMS Sensor Hub Cleanroom B',
    dateTime: '2026-09-24 14:15:00',
    severity: 'Minor',
    gxpDataImpact: 'No Impact',
    rootCauseCategory: 'Hardware',
    description: 'Kabel patch RJ45 pada switch terminal room B mengalami intermiten akibat getaran pintu airlock mekanik.',
    immediateAction: 'Penggantian kabel patch dengan jenis industrial shielded cat6A berpelindung baja dan pengujian link status 1 Gbps stabil.',
    capaRequired: true,
    capaNumber: 'CAPA-2026-041',
    status: 'Resolved'
  },
  {
    id: 'inc-02',
    incidentNo: 'INC-2026-IT-020',
    systemName: 'Waters Empower 3 Client Workstation QC-04',
    dateTime: '2026-09-28 09:30:00',
    severity: 'Minor',
    gxpDataImpact: 'No Impact',
    rootCauseCategory: 'Software Glitch',
    description: 'Aplikasi Empower mengalami memory crash saat me-render batch report kromatografi 40 vial berturut-turut.',
    immediateAction: 'Service Empower di-restart, cache lokal dibersihkan, dan workstation di-reboot. Data kromatografi di raw storage server terbukti utuh.',
    capaRequired: false,
    status: 'Closed by QA'
  }
];

export const SOP_DOCUMENTS: SopDocument[] = [
  {
    id: 'sop-01',
    sopNumber: 'SOP-IT-001',
    title: 'Pengelolaan Pencadangan, Pengarsipan, dan Pemulihan Data GxP (Backup & Disaster Recovery)',
    effectiveDate: '2026-01-01',
    reviewDate: '2028-01-01',
    version: '3.0',
    author: 'Senior IT Engineer',
    approver: 'Head of Quality Assurance & IT Director',
    summary: 'Menetapkan prosedur standar untuk eksekusi pencadangan otomatis 3-2-1-1, verifikasi integritas hash digital, pengarsipan jangka panjang pada media WORM, dan simulasi pemulihan triwulanan.',
    content: [
      '1. TUJUAN: Menjamin seluruh catatan elektronik dan data mentah GxP terlindungi dari kehilangan data, kerusakan sistem, atau ancaman siber ransomware.',
      '2. RUANG LINGKUP: Seluruh sistem komputerisasi GAMP Kategori 3, 4, dan 5 di PT. LIZON Pharma Indonesia.',
      '3. STRATEGI 3-2-1-1: Menyimpan minimal 3 salinan data, pada 2 media berbeda (SAN SSD dan LTO Tape), 1 salinan di lokasi terpisah (offsite vault), dan 1 salinan dengan enkripsi immutable WORM.',
      '4. FREKUENSI: Backup incremental harian pada pukul 01:00-04:00, Full backup mingguan setiap hari Minggu pukul 22:00.',
      '5. UJI PEMULIHAN (RESTORE DRILL): Tim IT wajib melakukan uji restorasi data secara berkala setiap 3 bulan (triwulanan) ke lingkungan terisolasi (sandbox) dan mendokumentasikan hasilnya pada Formulir BKP-F-02.'
    ],
    keyAuditChecklist: [
      'Jadwal backup otomatis aktif dan tidak pernah dimatikan',
      'Log verifikasi hash checksum SHA-256 tersimpan',
      'Bukti laporan uji pemulihan kuartal terakhir ditandatangani QA'
    ]
  },
  {
    id: 'sop-02',
    sopNumber: 'SOP-IT-002',
    title: 'Prosedur Tinjauan Jejak Audit (Audit Trail Review) Sistem Komputerisasi',
    effectiveDate: '2026-01-15',
    reviewDate: '2028-01-15',
    version: '2.0',
    author: 'IT Engineer (Data Integrity)',
    approver: 'Head of QA Compliance',
    summary: 'Mengatur metodologi peninjauan jejak audit (audit trail) berbasis risiko untuk mendeteksi anomali, modifikasi data, pembatalan pengujian, atau upaya manipulasi catatan elektronik.',
    content: [
      '1. TUJUAN: Memastikan kepatuhan terhadap 21 CFR 11.10(e) dan CPOB Aneks 11 Butir 9 mengenai pengawasan integritas data.',
      '2. TINGKAT PENINJAUAN: Tingkat 1 (Operasional Per-Batch oleh Analis/Supervisor sebelum rilis produk); Tingkat 2 (Tinjauan Sistemik Berkala Bulanan oleh QA & IT).',
      '3. FILTER PERISTIWA KRITIS: Perubahan parameter uji kritis (CPP), modifikasi metode kromatografi, penghapusan data (bila ada), kegagalan login > 3 kali, dan perubahan waktu sistem.',
      '4. TINDAK LANJUT ANOMALI: Jika ditemukan anomali tak terjelaskan, reviewer wajib membekukan status batch dan menerbitkan formulir Laporan Deviasi dalam waktu maksimal 4 jam.'
    ],
    keyAuditChecklist: [
      'Formulir review audit trail per-batch lengkap dengan tanda tangan ganda',
      'Matriks parameter kritis audit trail telah divalidasi oleh QA',
      'Tidak ada celah waktu antara tanggal pengujian dan tanggal review'
    ]
  },
  {
    id: 'sop-03',
    sopNumber: 'SOP-IT-003',
    title: 'Manajemen Akun Pengguna, Kontrol Akses, dan Pemisahan Tugas (RBAC & Least Privilege)',
    effectiveDate: '2026-02-01',
    reviewDate: '2028-02-01',
    version: '2.1',
    author: 'Senior IT Engineer',
    approver: 'Head of HR, QA, and IT Director',
    summary: 'Menetapkan aturan pemberian hak akses sistem GxP berdasarkan peran kerja (Role-Based Access Control), larangan akun bersama, dan prosedur evaluasi akun triwulanan (QUAR).',
    content: [
      '1. PRINSIP LEAST PRIVILEGE: Pengguna hanya diberikan hak akses minimum yang mutlak diperlukan untuk menyelesaikan tugas kedinasannya.',
      '2. PEMISAHAN TUGAS (SoD): Personel yang menghasilkan data (operator, analis) tidak boleh memiliki hak administratif. Personel IT tidak boleh memiliki hak tanda tangan pelulusan batch.',
      '3. KETENTUAN KATA SANDI: Panjang minimal 12 karakter alfanumerik, kedaluwarsa 90 hari, larangan pengulangan 5 kata sandi terakhir, dan lockout otomatis setelah 3 kali gagal login.',
      '4. EVALUASI AKUN (QUAR): Setiap 3 bulan, IT bersama QA meninjau seluruh daftar akun aktif untuk mencabut akun karyawan mutasi atau non-aktif.'
    ],
    keyAuditChecklist: [
      'Nol akun generik atau bersama pada seluruh sistem GxP',
      'Laporan evaluasi akun triwulanan (QUAR) terkini tersedia',
      'Formulir permohonan hak akses baru (UAF) disetujui atasan dan QA'
    ]
  },
  {
    id: 'sop-04',
    sopNumber: 'SOP-IT-004',
    title: 'Manajemen Kontrol Perubahan TI dan Validasi Ulang (Change Control & Re-qualification)',
    effectiveDate: '2026-02-15',
    reviewDate: '2028-02-15',
    version: '3.0',
    author: 'Senior IT Engineer',
    approver: 'QA Validation Manager',
    summary: 'Prosedur formal untuk mengajukan, menilai risiko GxP, menguji, dan menyetujui setiap perubahan hardware, software, jaringan, dan konfigurasi sistem komputerisasi.',
    content: [
      '1. KLASIFIKASI PERUBAHAN: Mayor (berdampak langsung pada mutu obat/integritas data, wajib kualifikasi ulang IQ/OQ/PQ); Minor (berdampak tidak langsung, membutuhkan verifikasi teknis); Emergency (penanganan insiden kritis dengan approval lisan QA & CCR retrospektif < 24 jam).',
      '2. ALUR PERSETUJUAN: Permohonan CCR -> Penilaian Risiko FMEA -> Pra-Persetujuan QA -> Eksekusi di Lingkungan Sandbox -> Pengujian Kualifikasi -> Pasca-Review QA -> Rilis ke Produksi.',
      '3. RENCANA ROLLBACK: Setiap usulan perubahan wajib menyertakan rencana pengembalian ke kondisi semula (rollback runbook) yang telah teruji.'
    ],
    keyAuditChecklist: [
      'Log registrasi nomor CCR lengkap dan berurutan',
      'Dokumen penilaian risiko GxP disertakan dalam setiap usulan',
      'Laporan kualifikasi ulang (Delta OQ) ditandatangani sebelum rilis ke production'
    ]
  },
  {
    id: 'sop-05',
    sopNumber: 'SOP-IT-005',
    title: 'Rencana Pemulihan Bencana TI dan Kelangsungan Bisnis (Disaster Recovery Plan - DRP)',
    effectiveDate: '2026-03-01',
    reviewDate: '2028-03-01',
    version: '2.0',
    author: 'Senior IT Engineer',
    approver: 'Plant Director & QA Head',
    summary: 'Pedoman mitigasi bencana alam, kebakaran ruang server, kegagalan listrik total, dan insiden serangan ransomware pada infrastruktur pabrik farmasi PT. LIZON Pharma.',
    content: [
      '1. PENETAPAN TARGET: RTO (Recovery Time Objective) maksimal 2 jam untuk sistem Tier-1 (MES & BMS); RPO (Recovery Point Objective) maksimal 15 menit.',
      '2. KOMANDO DARURAT: IT Engineer bertindak sebagai Koordinator Teknis DRP yang melapor langsung ke Plant Emergency Committee.',
      '3. ISOLASI SIBER: Jika terdeteksi ransomware, tim IT berhak memutus uplink switch IDMZ secara fisik dalam waktu < 60 detik tanpa menunggu approval tertulis.',
      '4. SIMULASI TAHUNAN: Latihan simulasi bencana total (tabletop exercise & technical failover) wajib diadakan minimal 1 tahun sekali.'
    ],
    keyAuditChecklist: [
      'Kontak darurat vendor hardware dan tim DRP terkini',
      'Runbook pemulihan sistem tercetak dalam bentuk hardcopy di lemari tahan api',
      'Laporan evaluasi simulasi DRP tahunan'
    ]
  },
  {
    id: 'sop-06',
    sopNumber: 'SOP-IT-006',
    title: 'Sinkronisasi Waktu Server dan Proteksi Jam Sistem (NTP Time Synchronization)',
    effectiveDate: '2026-03-15',
    reviewDate: '2028-03-15',
    version: '1.0',
    author: 'Senior IT Engineer',
    approver: 'Head of Quality Assurance',
    summary: 'Tata cara pengelolaan sumber waktu terpusat (NTP Stratum-1), proteksi terhadap manipulasi jam workstation, dan pemantauan drift jam seluruh perangkat GxP.',
    content: [
      '1. SUMBER WAKTU: Menggunakan Dual NTP Server bersumber sinyal GPS satelit yang ditempatkan di Industrial DMZ.',
      '2. TOLERANSI DRIFT: Selisih waktu maksimum yang diizinkan antar server GxP adalah 50 milidetik (ms).',
      '3. PENGUNCIAN WORKSTATION: Hak pengubahan waktu lokal dinonaktifkan permanen pada tingkat OS (Windows/Linux) via Group Policy Object.',
      '4. LOGGING: Peringatan otomatis dikirimkan ke email IT jika terdapat node yang tidak bersinkronisasi lebih dari 180 menit.'
    ],
    keyAuditChecklist: [
      'Konfigurasi IP NTP terstandarisasi di seluruh VLAN pabrik',
      'Bukti pengujian kualifikasi GPO penguncian waktu',
      'Grafik rekaman drift waktu bulanan'
    ]
  }
];

export const CSV_VMODEL_STEPS = [
  {
    step: '1. User Requirements Specification (URS)',
    phase: 'Specification',
    responsible: 'User (Produksi/QC/Gudang) + IT + QA',
    deliverables: 'Dokumen URS resmi dengan penomoran kebutuhan unik (misal: URS-BMS-REQ-001)',
    focus: 'Kebutuhan fungsional operasional, kapasitas, kepatuhan 21 CFR Part 11, dan kriteria penerimaan.'
  },
  {
    step: '2. Functional & Design Specification (FS/DS)',
    phase: 'Design',
    responsible: 'Vendor Sistem + IT Engineer',
    deliverables: 'Functional Spec (FS), Hardware Design Spec (HDS), Software Design Spec (SDS)',
    focus: 'Arsitektur modul software, diagram jaringan, skema database, dan mekanisme integrasi perangkat.'
  },
  {
    step: '3. GxP & FMEA Risk Assessment (RA)',
    phase: 'Risk Management',
    responsible: 'IT Engineer + QA Validation + User',
    deliverables: 'Laporan Penilaian Risiko FMEA (Failure Mode and Effects Analysis)',
    focus: 'Menentukan kelas risiko fungsi (Tinggi/Sedang/Rendah) untuk memfokuskan kedalaman pengujian validasi.'
  },
  {
    step: '4. Installation Qualification (IQ)',
    phase: 'Testing & Verification',
    responsible: 'IT Engineer + Vendor + QA Witness',
    deliverables: 'Protokol & Laporan IQ (Kesesuaian instalasi hardware, versi OS, software patch, IP address)',
    focus: 'Memverifikasi bahwa sistem dipasang persis sesuai dengan spesifikasi desain dan bebas dari cacat fisik/lisensi.'
  },
  {
    step: '5. Operational Qualification (OQ)',
    phase: 'Testing & Verification',
    responsible: 'IT Engineer + QA Witness',
    deliverables: 'Protokol & Laporan OQ (Pengujian fungsi logika, alarm limit, kontrol akses, jejak audit, failover)',
    focus: 'Memverifikasi sistem beroperasi sesuai kriteria fungsional pada batas operasional minimum dan maksimum.'
  },
  {
    step: '6. Performance Qualification (PQ)',
    phase: 'Testing & Verification',
    responsible: 'User Department + IT Support + QA Lead',
    deliverables: 'Protokol & Laporan PQ (Pengujian proses aktual dengan beban kerja produksi selama beberapa siklus)',
    focus: 'Membuktikan sistem mampu menghasilkan kinerja yang konsisten dan andal dalam kondisi produksi nyata.'
  },
  {
    step: '7. Requirements Traceability Matrix (RTM)',
    phase: 'Traceability',
    responsible: 'IT Engineer + QA Validation',
    deliverables: 'Matriks Ketertelusuran Kebutuhan (RTM)',
    focus: 'Memetakan setiap butir URS ke klausul FS, modul DS, dan nomor langkah pengujian di IQ/OQ/PQ.'
  },
  {
    step: '8. Validation Summary Report (VSR) & Pelepasan',
    phase: 'Release',
    responsible: 'QA Head + IT Director + Plant Head',
    deliverables: 'Laporan Ringkasan Validasi (VSR) & Sertifikat Kualifikasi Sistem GxP',
    focus: 'Evaluasi penyelesaian seluruh deviasi validasi, penandatanganan SOP operasional, dan izin go-live.'
  }
];

export const ACCESS_CONTROL_MATRIX = [
  {
    role: 'System Administrator (IT)',
    description: 'Personel IT independen yang bertanggung jawab atas OS, backup, dan pemeliharaan teknis.',
    canCreateUser: true,
    canEditConfig: true,
    canDeleteRecords: false, // Strictly prohibited for all!
    canSignBatch: false,     // SoD compliance: IT cannot sign batch records!
    canReviewAuditTrail: true,
    canAccessDatabaseDirect: true,
    cleanroomAccess: 'Maintenance Only'
  },
  {
    role: 'QA Compliance Manager',
    description: 'Penjamin mutu yang berwenang meninjau audit trail dan menyetujui rilis batch.',
    canCreateUser: false,
    canEditConfig: false,
    canDeleteRecords: false,
    canSignBatch: true,      // QA final disposition
    canReviewAuditTrail: true,
    canAccessDatabaseDirect: false,
    cleanroomAccess: 'Audit & Inspection'
  },
  {
    role: 'Production Supervisor',
    description: 'Pengawas proses manufaktur di lantai produksi cleanroom.',
    canCreateUser: false,
    canEditConfig: false,
    canDeleteRecords: false,
    canSignBatch: true,      // Step completion sign-off
    canReviewAuditTrail: true,
    canAccessDatabaseDirect: false,
    cleanroomAccess: 'Full Operational'
  },
  {
    role: 'Cleanroom Production Operator',
    description: 'Pelaksana penimbangan, peracikan, dan pengemasan obat.',
    canCreateUser: false,
    canEditConfig: false,
    canDeleteRecords: false,
    canSignBatch: false,
    canReviewAuditTrail: false,
    canAccessDatabaseDirect: false,
    cleanroomAccess: 'Assigned Suite Only'
  },
  {
    role: 'QC Analytical Chemist / Analyst',
    description: 'Penguji sampel bahan baku, stabilitas, dan produk jadi pada instrumen lab.',
    canCreateUser: false,
    canEditConfig: false,
    canDeleteRecords: false,
    canSignBatch: false,
    canReviewAuditTrail: false,
    canAccessDatabaseDirect: false,
    cleanroomAccess: 'QC Lab Area Only'
  }
];

export const AUDIT_TRAIL_RECORDS: AuditTrailEntry[] = [
  {
    id: 'at-1008',
    seqNo: 1008,
    timestamp: '2026-10-02 21:40:12.842',
    userId: 'USR-IT-001',
    userName: 'Heri Wibowo',
    userRole: 'System Administrator (IT)',
    workstationIp: '10.10.35.12 (IDMZ Bastion Host)',
    systemCode: 'SCADA-01',
    systemName: 'Siemens WinCC SCADA Purified Water & WFI',
    actionType: 'CONFIG_CHANGE',
    actionDescription: 'Modifikasi ambang batas alarm peringatan konduktivitas loop WFI',
    affectedParameter: 'WFI_LOOP_COND_WARN_SP (Tag: DB102.DBD24)',
    oldValue: '1.10 uS/cm @ 25C',
    newValue: '1.05 uS/cm @ 25C',
    reasonForChange: 'Penyelarasan batas waspada proses sesuai protokol validasi PQ-WFI-02 dan CCR-2026-IT-0041',
    gxpCriticality: 'Critical GxP',
    eSignatureVerified: true,
    sha256Hash: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
    tamperEvidentStatus: 'Verified (Immutable WORM)'
  },
  {
    id: 'at-1007',
    seqNo: 1007,
    timestamp: '2026-10-02 20:15:44.118',
    userId: 'USR-QA-004',
    userName: 'apt. Siti Rahmawati',
    userRole: 'QA Compliance Manager',
    workstationIp: '10.10.40.88 (QA Office Workstation)',
    systemCode: 'MES-01',
    systemName: 'Werum PAS-X Manufacturing Execution System',
    actionType: 'VALIDATION_SIGNOFF',
    actionDescription: 'Tanda tangan elektronik persetujuan rilis penimbangan bahan aktif Paracetamol Batch #LZN-088',
    affectedParameter: 'EBR_BATCH_DISPOSITION_STATUS',
    oldValue: 'IN_QC_VERIFICATION',
    newValue: 'QA_RELEASED_FOR_GRANULATION',
    reasonForChange: 'Hasil uji kadar bahan baku LIMS dinyatakan Memenuhi Syarat (Pass) CoA #QC-2026-1402',
    gxpCriticality: 'Critical GxP',
    eSignatureVerified: true,
    sha256Hash: '8f434346648f6b96df89dda901c5176b10a6d83961dd3c1ac88b59b2dc327aa4',
    tamperEvidentStatus: 'Verified (Immutable WORM)'
  },
  {
    id: 'at-1006',
    seqNo: 1006,
    timestamp: '2026-10-02 18:32:05.650',
    userId: 'USR-QC-012',
    userName: 'Dewi Lestari, S.Si.',
    userRole: 'QC Analytical Chemist / Analyst',
    workstationIp: '10.10.40.104 (HPLC Lab Room 2)',
    systemCode: 'LIMS-01',
    systemName: 'Waters Empower 3 CDS / LabVantage LIMS',
    actionType: 'DATA_UPDATE',
    actionDescription: 'Pemutakhiran parameter integrasi baseline kromatografi uji disolusi tablet',
    affectedParameter: 'PROCESSING_METHOD_PEAK_WIDTH_SEC',
    oldValue: '12.0 detik',
    newValue: '14.5 detik',
    reasonForChange: 'Optimasi deteksi pemisahan puncak resolusi zat aktif sesuai monografi Farmakope Indonesia Edisi VI',
    gxpCriticality: 'Major GxP',
    eSignatureVerified: true,
    sha256Hash: 'a591a6d40bf420404a011733cfb7b190d62c65bf0bcda32b57b277d9ad9f146e',
    tamperEvidentStatus: 'Verified (Immutable WORM)'
  },
  {
    id: 'at-1005',
    seqNo: 1005,
    timestamp: '2026-10-02 16:10:33.204',
    userId: 'USR-IT-002',
    userName: 'Budi Santoso',
    userRole: 'Shift IT Specialist',
    workstationIp: '10.10.35.12 (IDMZ Bastion Host)',
    systemCode: 'BMS-01',
    systemName: 'Honeywell EBI R510 BMS Cleanroom HVAC',
    actionType: 'CONFIG_CHANGE',
    actionDescription: 'Penyesuaian batas alarm tekanan diferensial cascade Airlock Ruang Bersih Kelas B',
    affectedParameter: 'AL_DIFF_PRESS_SP_PA (Sensor: PT-DP-CRB-04)',
    oldValue: '15.0 Pa',
    newValue: '17.5 Pa',
    reasonForChange: 'Kompensasi hembusan udara HEPA filter baru setelah penggantian berkala pre-filter AHU-02',
    gxpCriticality: 'Critical GxP',
    eSignatureVerified: true,
    sha256Hash: '4355a46b19d348dc2f57c046f8ef63d4538ebb936000f3c9ee954a27460dd865',
    tamperEvidentStatus: 'Verified (Immutable WORM)'
  },
  {
    id: 'at-1004',
    seqNo: 1004,
    timestamp: '2026-10-02 14:05:19.912',
    userId: 'USR-IT-001',
    userName: 'Heri Wibowo',
    userRole: 'System Administrator (IT)',
    workstationIp: '10.10.35.10 (IDMZ Admin)',
    systemCode: 'IDMZ-FW01',
    systemName: 'FortiGate Industrial Firewall Perimeter',
    actionType: 'SECURITY_ACCESS',
    actionDescription: 'Penerapan aturan firewall baru untuk mengizinkan sinkronisasi NTP port 123 UDP ke HPLC Lab VLAN',
    affectedParameter: 'FIREWALL_POLICY_RULE_ID_884',
    oldValue: 'DENY_ALL (Default Drop)',
    newValue: 'PERMIT_UDP_123_FROM_IDMZ_NTP_TO_QC_VLAN',
    reasonForChange: 'Implementasi SOP-IT-006 proteksi integritas jam sistem terhadap instrumen laboratorium HPLC baru',
    gxpCriticality: 'Major GxP',
    eSignatureVerified: true,
    sha256Hash: '53c234e5e8472b6ac51c1ae1cab3fe06fad053beb8ebfd8977b010655bfdd3c3',
    tamperEvidentStatus: 'Verified (Immutable WORM)'
  },
  {
    id: 'at-1003',
    seqNo: 1003,
    timestamp: '2026-10-02 11:20:00.005',
    userId: 'SYSTEM_NTP_SYNC',
    userName: 'Meinberg GPS Stratum-1 Master Clock',
    userRole: 'Automated System Service',
    workstationIp: '10.10.35.5 (Hardware Master Clock)',
    systemCode: 'NTP-TIME',
    systemName: 'Dual NTP Stratum-1 Time Master Server',
    actionType: 'TIME_SYNC',
    actionDescription: 'Sinkronisasi jam terpusat seluruh 48 node server virtualisasi dan PLC industri',
    affectedParameter: 'GLOBAL_SYS_TIME_DRIFT_COMPENSATION',
    oldValue: '+4.8 ms',
    newValue: '+4.2 ms',
    reasonForChange: 'Siklus sinkronisasi berkala 60 menit referensi waktu GPS (ALCOA+ Contemporaneous Compliance)',
    gxpCriticality: 'Minor GxP',
    eSignatureVerified: true,
    sha256Hash: '2c5a76e1858c97ec3a1d9539d09c31405b637951e737198bb66cc84918e98687',
    tamperEvidentStatus: 'Verified (Immutable WORM)'
  },
  {
    id: 'at-1002',
    seqNo: 1002,
    timestamp: '2026-10-02 09:14:48.330',
    userId: 'USR-IT-001',
    userName: 'Heri Wibowo',
    userRole: 'System Administrator (IT)',
    workstationIp: '10.10.40.10 (Active Directory DC01)',
    systemCode: 'ACS-01',
    systemName: 'LenelS2 OnGuard Access Control & Active Directory',
    actionType: 'SECURITY_ACCESS',
    actionDescription: 'Penonaktifan akun karyawan mutasi dan pencabutan hak akses pintu ruang steril Grade A',
    affectedParameter: 'ACCOUNT_STATUS_USR_PROD_044',
    oldValue: 'ACTIVE (Airlock Grade A/B Authorized)',
    newValue: 'DISABLED_REVOKED',
    reasonForChange: 'Pelaksanaan evaluasi akun berkala (QUAR Q3-2026) dan memo HR No. HR-MUT-2026-081',
    gxpCriticality: 'Major GxP',
    eSignatureVerified: true,
    sha256Hash: '6b86b273ff34fce19d6b804eff5a3f5747ada4eaa22f1d49c01e52ddb7875b4b',
    tamperEvidentStatus: 'Verified (Immutable WORM)'
  },
  {
    id: 'at-1001',
    seqNo: 1001,
    timestamp: '2026-10-02 01:18:22.990',
    userId: 'SYSTEM_BACKUP_DAEMON',
    userName: 'NetApp SnapLock Compliance Engine',
    userRole: 'Automated System Service',
    workstationIp: '10.10.30.50 (SAN Primary Storage)',
    systemCode: 'SAN-01',
    systemName: 'NetApp All-Flash SAN Storage WORM Volume',
    actionType: 'BACKUP_EXEC',
    actionDescription: 'Penguncian retensi berkas snapshot basis data Werum MES secara permanen WORM',
    affectedParameter: 'SNAPLOCK_IMMUTABLE_RETENTION_EXPIRY',
    oldValue: 'UNLOCKED_TRANSIT',
    newValue: 'LOCKED_UNTIL_2036-10-02 (10 Tahun Retensi)',
    reasonForChange: 'SOP-IT-001 Kebijakan kepatuhan penyimpanan data mentah sediaan farmasi steril',
    gxpCriticality: 'Critical GxP',
    eSignatureVerified: true,
    sha256Hash: 'd4735e3a265e16eee03f59718b9b5d03019c07d8b6c51f90da3a666eec13ab35',
    tamperEvidentStatus: 'Verified (Immutable WORM)'
  }
];
