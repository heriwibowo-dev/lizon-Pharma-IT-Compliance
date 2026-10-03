import React from 'react';
import { 
  AlertTriangle, 
  Clock, 
  X, 
  CheckCircle2, 
  ArrowRight, 
  Activity, 
  ShieldAlert,
  BellRing
} from 'lucide-react';
import { useNotifications } from '../../context/NotificationContext';

interface NotificationToastProps {
  onNavigateTab: (tab: string) => void;
}

export const NotificationToast: React.FC<NotificationToastProps> = ({ onNavigateTab }) => {
  const { activeToast, dismissToast, acknowledgeNotification } = useNotifications();

  if (!activeToast) return null;

  const isUptimeDrop = activeToast.type === 'uptime_drop';
  const isValidationDeadline = activeToast.type === 'validation_deadline';

  const handleAction = () => {
    acknowledgeNotification(activeToast.id);
    if (activeToast.targetTab) {
      onNavigateTab(activeToast.targetTab);
    }
    dismissToast();
  };

  return (
    <div className="fixed bottom-5 right-5 z-50 max-w-md w-full animate-in fade-in slide-in-from-bottom-5 duration-300">
      <div className={`p-4 rounded-2xl border shadow-2xl backdrop-blur-xl ${
        activeToast.severity === 'critical'
          ? 'bg-slate-900/95 border-rose-500/80 shadow-rose-950/50'
          : 'bg-slate-900/95 border-amber-500/80 shadow-amber-950/50'
      }`}>
        <div className="flex items-start gap-3">
          {/* Animated Icon */}
          <div className={`p-2.5 rounded-xl shrink-0 mt-0.5 ${
            activeToast.severity === 'critical'
              ? 'bg-rose-500/20 text-rose-400 border border-rose-500/40 animate-pulse'
              : 'bg-amber-500/20 text-amber-400 border border-amber-500/40'
          }`}>
            {isUptimeDrop ? (
              <Activity className="w-5 h-5 text-rose-400" />
            ) : isValidationDeadline ? (
              <Clock className="w-5 h-5 text-amber-400" />
            ) : (
              <BellRing className="w-5 h-5" />
            )}
          </div>

          {/* Content */}
          <div className="flex-1 space-y-1 text-xs">
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-1.5">
                <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded ${
                  activeToast.severity === 'critical'
                    ? 'bg-rose-950 text-rose-300 border border-rose-800'
                    : 'bg-amber-950 text-amber-300 border border-amber-800'
                }`}>
                  {activeToast.systemCode}
                </span>
                <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">
                  {activeToast.severity === 'critical' ? 'SLA Alert (< 99.9%)' : 'Regulasi (< 7 Hari)'}
                </span>
              </div>

              <button
                onClick={dismissToast}
                className="text-slate-400 hover:text-white p-1 rounded hover:bg-slate-800 transition"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>

            <h4 className="text-sm font-bold text-white leading-snug">
              {activeToast.title}
            </h4>

            <p className="text-slate-300 text-[11px] leading-relaxed">
              {activeToast.message}
            </p>

            {/* Metric pill */}
            {activeToast.metricValue && (
              <div className="inline-flex items-center gap-2 pt-1">
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-slate-800 text-teal-300 border border-slate-700">
                  Nilai: {activeToast.metricValue}
                </span>
                <span className="text-[10px] text-slate-400">
                  Ambang Batas: <strong className="text-slate-200">{activeToast.threshold}</strong>
                </span>
              </div>
            )}

            {/* Actions */}
            <div className="flex items-center gap-2 pt-2.5 mt-2 border-t border-slate-800/80">
              <button
                onClick={handleAction}
                className={`flex-1 py-1.5 px-3 rounded-lg font-bold text-xs flex items-center justify-center gap-1.5 transition shadow ${
                  activeToast.severity === 'critical'
                    ? 'bg-rose-600 hover:bg-rose-500 text-white shadow-rose-600/20'
                    : 'bg-amber-600 hover:bg-amber-500 text-white shadow-amber-600/20'
                }`}
              >
                <span>Acknowledge &amp; Buka Sistem</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={() => acknowledgeNotification(activeToast.id)}
                className="px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold border border-slate-700 transition"
              >
                Tandai Selesai
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
