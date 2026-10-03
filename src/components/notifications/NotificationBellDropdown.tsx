import React, { useState, useRef, useEffect } from 'react';
import { 
  Bell, 
  Activity, 
  Clock, 
  CheckCircle2, 
  Trash2, 
  Check, 
  AlertTriangle, 
  ChevronRight, 
  Sparkles,
  Zap,
  Filter
} from 'lucide-react';
import { useNotifications } from '../../context/NotificationContext';
import { GxpNotification } from '../../types/pharma';

interface NotificationBellDropdownProps {
  onNavigateTab: (tab: string) => void;
}

export const NotificationBellDropdown: React.FC<NotificationBellDropdownProps> = ({ onNavigateTab }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [filterType, setFilterType] = useState<'all' | 'uptime_drop' | 'validation_deadline'>('all');
  const dropdownRef = useRef<HTMLDivElement>(null);

  const {
    notifications,
    unreadCount,
    criticalCount,
    markAsRead,
    markAllAsRead,
    acknowledgeNotification,
    clearNotification,
    simulateUptimeDrop,
    simulateValidationDeadline
  } = useNotifications();

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const filteredList = notifications.filter(n => {
    if (filterType === 'all') return true;
    return n.type === filterType;
  });

  const handleOpenAlert = (notif: GxpNotification) => {
    acknowledgeNotification(notif.id);
    if (notif.targetTab) {
      onNavigateTab(notif.targetTab);
    }
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Bell Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 transition"
        title="Pusat Peringatan & Notifikasi Real-Time TI"
      >
        <Bell className={`w-4 h-4 ${criticalCount > 0 ? 'text-rose-400' : 'text-slate-300'}`} />

        {/* Pulsing Badge */}
        {criticalCount > 0 ? (
          <span className="absolute -top-1 -right-1 flex h-4 w-4">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-4 w-4 bg-rose-600 text-[9px] font-bold text-white items-center justify-center">
              {criticalCount}
            </span>
          </span>
        ) : unreadCount > 0 ? (
          <span className="absolute -top-1 -right-1 flex h-4 w-4 bg-amber-500 rounded-full text-[9px] font-bold text-slate-950 items-center justify-center">
            {unreadCount}
          </span>
        ) : null}
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 sm:w-96 rounded-2xl bg-slate-900 border border-slate-700 shadow-2xl z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
          {/* Dropdown Header */}
          <div className="p-3.5 bg-slate-950/90 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="p-1 rounded-md bg-rose-500/10 text-rose-400">
                <Bell className="w-4 h-4" />
              </span>
              <div>
                <h4 className="text-xs font-bold text-white">Notifikasi Kepatuhan GxP</h4>
                <div className="text-[10px] text-slate-400">
                  {criticalCount > 0 ? (
                    <span className="text-rose-400 font-bold">{criticalCount} Uptime Kritis (&lt; 99.9%)</span>
                  ) : (
                    <span>Semua Sistem Normal</span>
                  )}
                </div>
              </div>
            </div>

            {unreadCount > 0 && (
              <button
                onClick={markAllAsRead}
                className="text-[10px] text-teal-400 hover:text-teal-300 transition"
              >
                Tandai semua dibaca
              </button>
            )}
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-1 p-2 bg-slate-900 border-b border-slate-800/80 text-[10px]">
            <button
              onClick={() => setFilterType('all')}
              className={`px-2 py-1 rounded-md font-semibold transition ${
                filterType === 'all'
                  ? 'bg-teal-500 text-slate-950 font-bold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Semua ({notifications.length})
            </button>
            <button
              onClick={() => setFilterType('uptime_drop')}
              className={`px-2 py-1 rounded-md font-semibold transition ${
                filterType === 'uptime_drop'
                  ? 'bg-rose-500 text-white font-bold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Uptime &lt; 99.9% ({notifications.filter(n => n.type === 'uptime_drop').length})
            </button>
            <button
              onClick={() => setFilterType('validation_deadline')}
              className={`px-2 py-1 rounded-md font-semibold transition ${
                filterType === 'validation_deadline'
                  ? 'bg-amber-500 text-slate-950 font-bold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Tenggat &lt; 7 Hari ({notifications.filter(n => n.type === 'validation_deadline').length})
            </button>
          </div>

          {/* Notification List */}
          <div className="max-h-72 overflow-y-auto divide-y divide-slate-800/60 text-xs">
            {filteredList.length === 0 ? (
              <div className="p-6 text-center text-slate-500 space-y-1">
                <CheckCircle2 className="w-6 h-6 text-slate-600 mx-auto" />
                <p>Tidak ada notifikasi aktif untuk filter ini.</p>
              </div>
            ) : (
              filteredList.map((notif) => {
                const isCritical = notif.severity === 'critical';
                const isUptime = notif.type === 'uptime_drop';

                return (
                  <div
                    key={notif.id}
                    className={`p-3 transition ${
                      notif.read ? 'bg-slate-900/60 opacity-80' : 'bg-slate-800/50'
                    } hover:bg-slate-800`}
                  >
                    <div className="flex items-start gap-2.5">
                      <div className={`p-1.5 rounded-lg shrink-0 mt-0.5 ${
                        isCritical
                          ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                          : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                      }`}>
                        {isUptime ? <Activity className="w-3.5 h-3.5" /> : <Clock className="w-3.5 h-3.5" />}
                      </div>

                      <div className="flex-1 space-y-1">
                        <div className="flex items-center justify-between gap-1">
                          <span className={`text-[9px] font-mono font-bold px-1.5 py-0.2 rounded ${
                            isCritical
                              ? 'bg-rose-950 text-rose-300 border border-rose-800'
                              : 'bg-amber-950 text-amber-300 border border-amber-800'
                          }`}>
                            {notif.systemCode}
                          </span>
                          <span className="text-[10px] text-slate-500">{notif.timestamp}</span>
                        </div>

                        <h5 className="font-bold text-white text-[11px] leading-tight">
                          {notif.title}
                        </h5>

                        <p className="text-[10px] text-slate-400 line-clamp-2">
                          {notif.message}
                        </p>

                        {notif.metricValue && (
                          <div className="flex items-center gap-1.5 text-[9px] pt-0.5">
                            <span className="px-1.5 py-0.2 rounded bg-slate-800 text-teal-300 font-mono">
                              {notif.metricValue}
                            </span>
                            <span className="text-slate-500 font-mono">
                              Limit: {notif.threshold}
                            </span>
                          </div>
                        )}

                        <div className="flex items-center justify-between pt-1.5">
                          <button
                            onClick={() => handleOpenAlert(notif)}
                            className="text-[10px] font-bold text-teal-400 hover:text-teal-300 flex items-center gap-1"
                          >
                            <span>Tindak Lanjuti</span>
                            <ChevronRight className="w-3 h-3" />
                          </button>

                          <div className="flex items-center gap-2 text-[10px]">
                            {!notif.acknowledged && (
                              <button
                                onClick={() => acknowledgeNotification(notif.id)}
                                className="text-slate-400 hover:text-emerald-400 transition"
                                title="Acknowledge alert"
                              >
                                Acknowledge
                              </button>
                            )}
                            <button
                              onClick={() => clearNotification(notif.id)}
                              className="text-slate-500 hover:text-rose-400 transition"
                              title="Hapus notifikasi"
                            >
                              <Trash2 className="w-3 h-3" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Real-time Simulator Triggers Bar */}
          <div className="p-3 bg-slate-950 border-t border-slate-800 space-y-2">
            <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block">
              Simulasi Pemicu Peringatan Real-Time:
            </span>
            <div className="grid grid-cols-2 gap-1.5">
              <button
                onClick={() => simulateUptimeDrop('MES-01', 99.76)}
                className="px-2 py-1.5 rounded-lg bg-rose-950/60 hover:bg-rose-900/80 text-rose-300 border border-rose-800/80 text-[10px] font-bold text-left transition flex items-center gap-1.5"
              >
                <Activity className="w-3 h-3 text-rose-400 shrink-0" />
                <span className="truncate">Uptime &lt; 99.9%</span>
              </button>

              <button
                onClick={() => simulateValidationDeadline('LIMS-01', 3)}
                className="px-2 py-1.5 rounded-lg bg-amber-950/60 hover:bg-amber-900/80 text-amber-300 border border-amber-800/80 text-[10px] font-bold text-left transition flex items-center gap-1.5"
              >
                <Clock className="w-3 h-3 text-amber-400 shrink-0" />
                <span className="truncate">Tenggat &lt; 7 Hari</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
