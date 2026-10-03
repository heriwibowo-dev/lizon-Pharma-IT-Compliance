import express from 'express';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = parseInt(process.env.PORT || '3000', 10);

app.use(express.json({ limit: '10mb' }));

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    facility: 'PT. LIZON Pharma Indonesia',
    app: 'IT Engineer GxP Compliance Portal',
    timestamp: new Date().toISOString()
  });
});

// Gemini GxP Assistant API endpoint
app.post('/api/gemini/assist', async (req, res) => {
  const { prompt, topic, systemInfo } = req.body;

  if (!prompt || typeof prompt !== 'string') {
    return res.status(400).json({ error: 'Prompt is required' });
  }

  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey || apiKey === 'MY_GEMINI_API_KEY') {
    // Provide intelligent fallback response tailored for PT. LIZON Pharma Indonesia
    return res.json({
      text: generatePharmaFallback(prompt, topic),
      source: 'offline-knowledge-base'
    });
  }

  try {
    const ai = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });

    const systemInstruction = `Anda adalah Ahli Validasi Sistem Komputerisasi (CSV), Spesialis Integritas Data (ALCOA+), dan Konsultan Regulasi Farmasi GxP untuk PT. LIZON Pharma Indonesia (fasilitas manufaktur farmasi baru yang memproduksi sediaan steril & non-steril).
Anda membantu IT Engineer dalam tugas harian dan kepatuhan regulasi terhadap BPOM RI (CPOB 2024 Aneks 11), US FDA 21 CFR Part 11, EU Annex 11, PIC/S PI-041, dan ISPE GAMP 5 2nd Edition.

Topik utama yang Anda kuasai:
1. Validasi Sistem Komputerisasi (CSV / ISPE GAMP 5: URS, DQ, Risk Assessment FMEA, IQ, OQ, PQ, VSR, RTM).
2. Integritas Data ALCOA+ (Attributable, Legible, Contemporaneous, Original, Accurate, Complete, Consistent, Enduring, Available).
3. 21 CFR Part 11 & EU Annex 11 (Electronic Records, Electronic Signatures, Audit Trail Review, System Time Synchronization via NTP).
4. Arsitektur Infrastruktur Pabrik Farmasi (Purdue Model ISA-95 L0-L4, OT/IT Industrial DMZ, SCADA, BMS, EMS, MES, LIMS, CCTV, ACS, WORM Storage, ESXi High Availability).
5. Keamanan & Kontrol Akses (Least Privilege, Segregation of Duties - SoD, Cleanroom USB lockdown, QUAR).
6. Kontrol Perubahan Formal (Change Control GxP impact assessment, re-validation triggers).
7. Dukungan Audit & Inspeksi (BPOM, FDA, PIC/S defense strategy, model responses, evidence documents).
8. Rencana Pemulihan Bencana & Backup 3-2-1-1 (RTO/RPO, restore drill verification).

Format jawaban: Gunakan bahasa Indonesia yang sangat profesional, terstruktur dengan bullet points, presisi teknis farmasi, dan sebutkan rujukan klausul/standar yang relevan. Berikan rekomendasi tindakan konkrit bagi IT Engineer.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        systemInstruction,
        temperature: 0.3,
      }
    });

    const reply = response.text || 'Tidak ada tanggapan yang dihasilkan.';
    return res.json({ text: reply, source: 'gemini-3.8-flash' });
  } catch (error: any) {
    console.error('Error in Gemini API call:', error);
    // Graceful fallback to built-in regulatory knowledge
    return res.json({
      text: generatePharmaFallback(prompt, topic),
      source: 'offline-knowledge-base',
      note: 'Mode panduan regulasi offline diaktifkan (koneksi API tidak tersedia).'
    });
  }
});

// Built-in intelligent fallback generator for pharma compliance
function generatePharmaFallback(prompt: string, topic?: string): string {
  const p = prompt.toLowerCase();

  if (p.includes('gamp') || p.includes('kategori') || p.includes('csv') || p.includes('validasi')) {
    return `### Panduan Validasi Sistem Komputerisasi (ISPE GAMP 5 & CPOB Aneks 11) - PT. LIZON Pharma

Berdasarkan pedoman **ISPE GAMP 5 2nd Edition** dan **CPOB 2024 Aneks 11**, berikut adalah langkah evaluasi validasi sistem:

1. **Kategorisasi Sistem Komputerisasi:**
   - **Kategori 1 (Infrastructure Software):** Sistem operasi (Windows Server, Linux), hypervisor (VMware ESXi), DBMS (Oracle, MS SQL). *Aktivitas: Verifikasi instalasi, pencatatan versi, dan kualifikasi infrastruktur.*
   - **Kategori 3 (Non-Configured COTS):** Firmware alat laboratorium standar, timbangan analitik, logger suhu mandiri. *Aktivitas: URS, IQ/OQ standar vendor.*
   - **Kategori 4 (Configured Products):** SCADA (Siemens WinCC), BMS (Honeywell), EMS (Rotronic), LIMS (LabVantage), ERP (SAP). *Aktivitas: URS, DQ, FMEA Risk Assessment, IQ, OQ (skrip pengujian konfigurasi), PQ, dan Traceability Matrix (RTM).*
   - **Kategori 5 (Custom Applications):** Modul skrip khusus PLC, algoritma peracikan formula kustom. *Aktivitas: Siklus hidup penuh (URS, FS, DS, Code Review, Module Testing, IQ, OQ, PQ).*

2. **Dokumentasi Wajib Siap Audit:**
   - Validation Master Plan (VMP) Pabrik PT. LIZON Pharma.
   - User Requirements Specification (URS) yang disetujui User, IT, dan QA.
   - Penilaian Risiko Kualitatif (GxP Impact) & Kuantitatif (FMEA).
   - RTM (Requirements Traceability Matrix) yang memetakan setiap poin URS ke nomor langkah uji OQ/PQ.
   - Validation Summary Report (VSR) dengan tanda tangan QA Head.`;
  }

  if (p.includes('alcoa') || p.includes('integritas data') || p.includes('audit trail') || p.includes('part 11')) {
    return `### Checklist Integritas Data ALCOA+ & 21 CFR Part 11 - PT. LIZON Pharma

Untuk menjamin kepatuhan terhadap **FDA 21 CFR Part 11**, **EU Annex 11**, dan **PIC/S PI-041**:

1. **Prinsip ALCOA+:**
   - **Attributable (Dapat diatribusikan):** Wajib menggunakan User ID unik, tanpa akun bersama (*shared accounts*). Semua aksi di LIMS/MES/SCADA tercatat dengan identitas operator.
   - **Legible (Dapat dibaca):** Format data tersimpan secara baku, tidak menggunakan enkripsi proprietary yang tidak dapat dibuka kembali saat audit.
   - **Contemporaneous (Seketika/Bersamaan):** Jam server disinkronkan ke NTP Server Stratum-1. Operator dilarang keras mengubah waktu lokal workstation.
   - **Original (Asli):** Data mentah elektronik (misal: sinyal kromatografi HPLC, log SCADA) wajib disimpan utuh, bukan hanya PDF hasil print.
   - **Accurate (Akurat):** Input validation, double-check sign-off untuk parameter kritis (CPP).
   - **Complete (Lengkap):** Data lengkap beserta metadata, jejak audit (audit trail), riwayat edit, dan data pengujian ulang (re-injection).
   - **Consistent (Konsisten):** Urutan waktu linier tanpa celah (*no chronological gaps*).
   - **Enduring (Tahan lama):** Penyimpanan pada media SAN dengan proteksi WORM (Write Once Read Many).
   - **Available (Tersedia):** Data dapat dimunculkan dalam waktu < 15 menit saat diminta oleh auditor BPOM atau FDA.

2. **Audit Trail Review (ATR):**
   - Lakukan tinjauan jejak audit berkala sebelum rilis batch (untuk data produksi MES/SCADA) dan minimal bulanan untuk log sistem TI (login failures, privilage escalation, time change attempts).`;
  }

  if (p.includes('purdue') || p.includes('jaringan') || p.includes('infrastruktur') || p.includes('firewall') || p.includes('ot')) {
    return `### Panduan Arsitektur Jaringan OT/IT (ISA-95 Purdue Model) - PT. LIZON Pharma

Sesuai standar **ISA/IEC 62443** dan arsitektur pabrik farmasi baru PT. LIZON Pharma:

- **Level 0 (Process):** Sensor suhu PT100, transmitter tekanan udara diferensial cleanroom, motor WFI.
- **Level 1 (Basic Control):** PLC Siemens S7-1500, Remote I/O ET200SP di dalam panel cleanroom.
- **Level 2 (Area Supervisory Control):** HMI Touchscreen IP65, Workstation SCADA lokal per lini produksi.
- **Level 3 (Manufacturing Operations):** Server MES (Electronic Batch Records), Server BMS (HVAC Cleanroom), Server EMS, Industrial Historian.
- **Level 3.5 (Industrial DMZ - IDMZ):** *Sangat Kritis!* Pemisah fisik/logis antara OT dan IT.
  - Jump Host (Bastion Host) dengan MFA untuk teknisi/vendor.
  - Server NTP Master Clock lokal.
  - Antivirus Patch Management Server (WSUS OT).
  - *Aturan Emas:* Tidak boleh ada komunikasi langsung antara Level 4 (Office/Internet) ke Level 2/1/0!
- **Level 4 (Enterprise Network):** Server ERP (SAP), LIMS LabVantage, Corporate Active Directory, Office Wi-Fi.`;
  }

  return `### Panduan Rekomendasi IT Engineer - PT. LIZON Pharma Indonesia

Menanggapi pertanyaan Anda:
1. **Analisis Kepatuhan GxP:**
   Pastikan setiap sistem komputerisasi yang mempengaruhi kualitas produk, integritas data, atau keputusan pelepasan batch dievaluasi dampaknya melalui *GxP Assessment Matrix*.
2. **Kontrol Akses Minimum (Least Privilege):**
   - Pisahkan akun administratif dari operasional harian.
   - Terapkan rotasi kata sandi minimal 90 hari dengan kompleksitas tinggi.
   - Auto-lockout layar cleanroom maksimal 5-10 menit.
3. **Pencadangan & Pemulihan (3-2-1 Strategy):**
   - 3 salinan data penting, 2 jenis media berbeda, 1 salinan tersimpan secara offsite/cloud immutable.
   - Uji pemulihan (test restore) wajib dilakukan dan didokumentasikan minimal setiap kuartal (quarterly drill).
4. **Kesiapan Audit:**
   Pastikan folder dokumentasi siap audit (*audit dossier*) mencakup: URS, RTM, Laporan IQ/OQ/PQ, Prosedur Tetap (SOP), dan Log Kontrol Perubahan.`;
}

// Dev server or Production static serving
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(port, '0.0.0.0', () => {
    console.log(`[PT. LIZON Pharma] IT Engineer Portal running at http://0.0.0.0:${port}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
