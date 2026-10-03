import React, { useState } from 'react';
import { 
  Sparkles, 
  Send, 
  Bot, 
  User, 
  Copy, 
  Check, 
  HelpCircle, 
  BookOpen, 
  ShieldCheck,
  AlertCircle
} from 'lucide-react';

export const AiRegulatoryAssistant: React.FC = () => {
  const [messages, setMessages] = useState<Array<{ role: 'user' | 'assistant'; text: string; source?: string }>>([
    {
      role: 'assistant',
      text: `Halo, saya Asisten AI Regulasi GxP & Validasi Sistem Komputerisasi untuk **PT. LIZON Pharma Indonesia**.

Saya siap membantu Anda dalam:
- Klasifikasi sistem menurut **ISPE GAMP 5 2nd Edition** dan penentuan strategi kualifikasi (URS, DQ, IQ, OQ, PQ).
- Pemenuhan integritas data **ALCOA+**, **FDA 21 CFR Part 11**, **EU Annex 11**, dan **PIC/S PI-041**.
- Penilaian dampak perubahan (**Change Control GxP Risk Assessment**).
- Persiapan menghadapi pertanyaan teknis auditor **BPOM**, **US FDA**, atau **PIC/S**.
- Penyusunan skrip pengujian (test scripts) dan arsitektur infrastruktur OT/IT (Purdue Model).

Silakan pilih contoh pertanyaan di bawah atau ketikkan pertanyaan spesifik Anda.`
    }
  ]);

  const [inputPrompt, setInputPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null);

  const samplePrompts = [
    'Bagaimana menyusun kualifikasi IQ/OQ untuk upgrade SCADA Purified Water sesuai ISPE GAMP 5?',
    'Apa saja titik kritis Audit Trail Review untuk sistem kromatografi HPLC menurut 21 CFR Part 11?',
    'Apakah patch keamanan OS pada server database MES mewajibkan kualifikasi ulang (Delta OQ)?',
    'Bagaimana arsitektur Industrial DMZ (IDMZ L3.5) memisahkan jaringan OT dan IT di pabrik farmasi?',
    'Bagaimana menjawab auditor BPOM terkait proteksi jam sistem dan sinkronisasi NTP?'
  ];

  const handleSend = async (textToSend?: string) => {
    const query = textToSend || inputPrompt;
    if (!query.trim() || loading) return;

    const userMessage = { role: 'user' as const, text: query };
    setMessages(prev => [...prev, userMessage]);
    setInputPrompt('');
    setLoading(true);

    try {
      const response = await fetch('/api/gemini/assist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: query,
          topic: 'GxP CSV Data Integrity'
        })
      });

      if (!response.ok) {
        throw new Error('Gagal menghubungi server.');
      }

      const data = await response.json();
      setMessages(prev => [
        ...prev,
        {
          role: 'assistant',
          text: data.text || 'Tidak ada balasan dari sistem.',
          source: data.source
        }
      ]);
    } catch (err: any) {
      setMessages(prev => [
        ...prev,
        {
          role: 'assistant',
          text: `Terjadi kendala teknis saat memproses tanggapan. Silakan coba kembali atau gunakan panduan SOP di Repositori Dokumen.`
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = (text: string, idx: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIdx(idx);
    setTimeout(() => setCopiedIdx(null), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Module Title */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-850 to-rose-950/40 border border-rose-500/30">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs font-semibold mb-2">
          KONSULTAN REGULASI PHARMA AI • GEMINI 3.8 FLASH
        </div>
        <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
          <Sparkles className="w-6 h-6 text-yellow-300" />
          Asisten AI Regulasi GxP &amp; Kepatuhan Integritas Data
        </h2>
        <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-3xl">
          Konsultasi kepatuhan regulasi farmasi real-time untuk IT Engineer PT. LIZON Pharma Indonesia. Diselaraskan dengan pedoman ISPE GAMP 5, CPOB Aneks 11, 21 CFR Part 11, dan PIC/S PI-041.
        </p>
      </div>

      {/* Suggested Prompt Chips */}
      <div className="space-y-2">
        <span className="text-xs font-semibold text-slate-400">Contoh Pertanyaan Cepat:</span>
        <div className="flex flex-wrap gap-2">
          {samplePrompts.map((p, idx) => (
            <button
              key={idx}
              onClick={() => handleSend(p)}
              disabled={loading}
              className="text-xs px-3 py-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-200 border border-slate-700 hover:border-rose-500/40 transition text-left"
            >
              &ldquo;{p}&rdquo;
            </button>
          ))}
        </div>
      </div>

      {/* Chat Thread */}
      <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 min-h-[420px] max-h-[600px] overflow-y-auto space-y-4">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`flex items-start gap-3 ${
              msg.role === 'user' ? 'justify-end' : 'justify-start'
            }`}
          >
            {msg.role === 'assistant' && (
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-teal-500 to-blue-600 flex items-center justify-center text-white shrink-0 mt-1 shadow">
                <Bot className="w-4 h-4" />
              </div>
            )}

            <div
              className={`max-w-3xl p-4 rounded-xl text-xs leading-relaxed ${
                msg.role === 'user'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'bg-slate-800/80 border border-slate-700 text-slate-200 shadow-md'
              }`}
            >
              <div className="whitespace-pre-line font-sans">{msg.text}</div>

              {msg.role === 'assistant' && (
                <div className="mt-3 pt-2 border-t border-slate-700/60 flex items-center justify-between text-[10px] text-slate-400">
                  <span className="italic">
                    Sumber: {msg.source === 'gemini-3.8-flash' ? 'Gemini 3.8 Flash (Live Model)' : 'Basis Regulasi GxP PT. LIZON Pharma'}
                  </span>
                  <button
                    onClick={() => handleCopy(msg.text, idx)}
                    className="flex items-center gap-1 hover:text-white transition"
                  >
                    {copiedIdx === idx ? (
                      <>
                        <Check className="w-3 h-3 text-emerald-400" />
                        <span>Tersalin</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3" />
                        <span>Salin Jawaban</span>
                      </>
                    )}
                  </button>
                </div>
              )}
            </div>

            {msg.role === 'user' && (
              <div className="w-8 h-8 rounded-lg bg-slate-700 flex items-center justify-center text-slate-300 shrink-0 mt-1">
                <User className="w-4 h-4" />
              </div>
            )}
          </div>
        ))}

        {loading && (
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-teal-500/20 flex items-center justify-center text-teal-400">
              <Bot className="w-4 h-4 animate-spin" />
            </div>
            <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700 text-xs text-slate-400 flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-teal-400 animate-ping"></span>
              Menelaah regulasi GxP &amp; pedoman GAMP 5...
            </div>
          </div>
        )}
      </div>

      {/* Input Box */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSend();
        }}
        className="flex gap-2"
      >
        <input
          type="text"
          placeholder="Ajukan pertanyaan validasi CSV, integritas data ALCOA+, atau kualifikasi sistem..."
          value={inputPrompt}
          onChange={(e) => setInputPrompt(e.target.value)}
          disabled={loading}
          className="flex-1 bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:ring-1 focus:ring-rose-500 shadow-inner"
        />
        <button
          type="submit"
          disabled={loading || !inputPrompt.trim()}
          className="px-5 py-3 rounded-xl bg-gradient-to-r from-teal-500 to-blue-600 hover:from-teal-400 hover:to-blue-500 disabled:opacity-50 text-white font-bold text-xs flex items-center gap-2 transition shadow-md shadow-teal-500/20"
        >
          <Send className="w-4 h-4" />
          <span>Kirim</span>
        </button>
      </form>
    </div>
  );
};
