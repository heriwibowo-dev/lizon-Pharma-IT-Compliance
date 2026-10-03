import React, { createContext, useContext, useState, useEffect } from 'react';
import { GxpNotification } from '../types/pharma';

interface NotificationContextType {
  notifications: GxpNotification[];
  activeToast: GxpNotification | null;
  unreadCount: number;
  criticalCount: number;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  acknowledgeNotification: (id: string) => void;
  clearNotification: (id: string) => void;
  dismissToast: () => void;
  simulateUptimeDrop: (systemCode?: string, uptime?: number) => void;
  simulateValidationDeadline: (systemCode?: string, days?: number) => void;
  triggerCustomAlert: (notification: Omit<GxpNotification, 'id' | 'timestamp' | 'read' | 'acknowledged'>) => void;
}

const INITIAL_NOTIFICATIONS: GxpNotification[] = [
  {
    id: 'notif-uptime-01',
    type: 'uptime_drop',
    severity: 'critical',
    systemCode: 'SCADA-01',
    systemName: 'SCADA WFI & Purified Water Generation',
    title: 'KRITIS: Uptime SCADA WFI Turun ke 99.82% (< 99.9% SLA)',
    message: 'Node SCADA-01 di Level 2 mengalami intermiten komunikasi I/O switch ET200SP. Uptime turun di bawah ambang batas kritis GxP 99.9%. Segera periksa link OT Ring VLAN 10!',
    timestamp: '2 menit yang lalu',
    metricValue: '99.82%',
    threshold: '< 99.90% SLA',
    targetTab: 'infrastructure',
    read: false,
    acknowledged: false
  },
  {
    id: 'notif-val-01',
    type: 'validation_deadline',
    severity: 'warning',
    systemCode: 'BMS-01',
    systemName: 'Building Management System (Cleanroom HVAC)',
    title: 'PERINGATAN CSV: Tinjauan Validasi BMS-01 Jatuh Tempo dalam 4 Hari',
    message: 'Siklus re-kualifikasi periodik URS/OQ kestabilan tekanan diferensial Cleanroom Grade B jatuh tempo pada 10 Oktober 2026 (< 7 hari). Laporan verifikasi VSR wajib diserahkan ke QA.',
    timestamp: '15 menit yang lalu',
    metricValue: '4 Hari Tersisa',
    threshold: '< 7 Hari Batas Regulasi',
    targetTab: 'validation-csv',
    read: false,
    acknowledged: false
  },
  {
    id: 'notif-val-02',
    type: 'validation_deadline',
    severity: 'warning',
    systemCode: 'MES-01',
    systemName: 'Werum PAS-X Manufacturing Execution System',
    title: 'TENGGAT KUALIFIKASI: Delta OQ Barcode Scanner MES Jatuh Tempo dalam 6 Hari',
    message: 'Protokol Delta OQ untuk CCR-2026-IT-0043 (integrasi scanner 2D dispensing) wajib diselesaikan dan ditandatangani QA sebelum rilis produksi komersial.',
    timestamp: '1 jam yang lalu',
    metricValue: '6 Hari Tersisa',
    threshold: '< 7 Hari',
    targetTab: 'change-control',
    read: false,
    acknowledged: false
  }
];

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [notifications, setNotifications] = useState<GxpNotification[]>(() => {
    const saved = localStorage.getItem('lizon_pharma_notifications');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return INITIAL_NOTIFICATIONS;
      }
    }
    return INITIAL_NOTIFICATIONS;
  });

  const [activeToast, setActiveToast] = useState<GxpNotification | null>(INITIAL_NOTIFICATIONS[0]);

  // Persist notifications
  useEffect(() => {
    localStorage.setItem('lizon_pharma_notifications', JSON.stringify(notifications));
  }, [notifications]);

  // Auto-dismiss toast after 8 seconds
  useEffect(() => {
    if (activeToast) {
      const timer = setTimeout(() => {
        setActiveToast(null);
      }, 9000);
      return () => clearTimeout(timer);
    }
  }, [activeToast]);

  const unreadCount = notifications.filter(n => !n.read).length;
  const criticalCount = notifications.filter(n => n.severity === 'critical' && !n.acknowledged).length;

  const markAsRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const acknowledgeNotification = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, acknowledged: true, read: true } : n));
    if (activeToast?.id === id) {
      setActiveToast(null);
    }
  };

  const clearNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
    if (activeToast?.id === id) {
      setActiveToast(null);
    }
  };

  const dismissToast = () => {
    setActiveToast(null);
  };

  const triggerCustomAlert = (notif: Omit<GxpNotification, 'id' | 'timestamp' | 'read' | 'acknowledged'>) => {
    const newNotif: GxpNotification = {
      ...notif,
      id: `notif-${Date.now()}`,
      timestamp: 'Baru saja',
      read: false,
      acknowledged: false
    };

    setNotifications(prev => [newNotif, ...prev]);
    setActiveToast(newNotif);
  };

  const simulateUptimeDrop = (systemCode = 'MES-01', uptime = 99.78) => {
    triggerCustomAlert({
      type: 'uptime_drop',
      severity: 'critical',
      systemCode,
      systemName: systemCode === 'MES-01' ? 'Werum PAS-X MES EBR' : `${systemCode} Cluster`,
      title: `KRITIS: Uptime ${systemCode} Turun ke ${uptime}% (< 99.9% Ambang Batas)`,
      message: `Terdeteksi penurunan ketersediaan 24/7 di bawah toleransi GxP SLA (99.90%). Latensi komunikasi database meningkat > 250ms. Segera investigasi failover node!`,
      metricValue: `${uptime}%`,
      threshold: '< 99.90% SLA',
      targetTab: 'infrastructure'
    });
  };

  const simulateValidationDeadline = (systemCode = 'LIMS-01', days = 3) => {
    triggerCustomAlert({
      type: 'validation_deadline',
      severity: 'warning',
      systemCode,
      systemName: systemCode === 'LIMS-01' ? 'LabVantage LIMS & Waters Empower' : `${systemCode} System`,
      title: `PERINGATAN CSV: Kualifikasi Ulang ${systemCode} Jatuh Tempo dalam ${days} Hari`,
      message: `Batas akhir peninjauan periodik kualifikasi instrumen kromatografi jatuh tempo dalam ${days} hari (< 7 hari). Harap selesaikan audit trail sign-off dan berita acara kualifikasi.`,
      metricValue: `${days} Hari Tersisa`,
      threshold: '< 7 Hari Regulasi BPOM/FDA',
      targetTab: 'validation-csv'
    });
  };

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        activeToast,
        unreadCount,
        criticalCount,
        markAsRead,
        markAllAsRead,
        acknowledgeNotification,
        clearNotification,
        dismissToast,
        simulateUptimeDrop,
        simulateValidationDeadline,
        triggerCustomAlert
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  return context;
};
