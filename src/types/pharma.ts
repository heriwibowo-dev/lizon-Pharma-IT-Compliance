export type GampCategory = 'Category 1' | 'Category 3' | 'Category 4' | 'Category 5';

export type GxpImpact = 'Direct GxP' | 'Indirect GxP' | 'Non-GxP';

export type SystemPhase = 'URS / Planning' | 'DQ / Design' | 'Risk Assessment' | 'IQ' | 'OQ' | 'PQ' | 'VSR / Released' | 'Operation & Maintenance' | 'Decommissioned';

export interface GxpSystem {
  id: string;
  code: string;
  name: string;
  description: string;
  area: string;
  gampCategory: GampCategory;
  gxpImpact: GxpImpact;
  part11Applicable: boolean;
  phase: SystemPhase;
  validationStatus: 'Fully Validated' | 'In Qualification' | 'Re-validation Required';
  owner: string;
  itLead: string;
  lastValidated: string;
  nextPeriodicReview: string;
  rtoHours: number;
  rpoHours: number;
  backupFrequency: string;
  auditTrailReviewFreq: 'Weekly' | 'Monthly' | 'Quarterly' | 'Per Batch';
  version: string;
  vendor: string;
}

export interface AlcoaPrinciple {
  id: string;
  letter: string;
  name: string;
  fullName: string;
  description: string;
  pharmaApplication: string;
  itTechnicalControl: string;
  regulatoryReference: string;
  status: 'Compliant' | 'Requires Attention';
  criticalCheckpoints: string[];
}

export interface AlcoaAuditQuestion {
  id: string;
  category: string;
  question: string;
  regulatoryClause: string;
  systemScope: string;
  weight: number;
  options: {
    label: string;
    score: number; // 0 (Non-compliant), 5 (Partial), 10 (Full)
    findingType?: 'None' | 'Minor' | 'Major' | 'Critical';
    remediation?: string;
  }[];
}

export interface AuditTrailReviewRecord {
  id: string;
  systemName: string;
  period: string;
  reviewDate: string;
  reviewedBy: string;
  qaReviewedBy: string;
  anomaliesDetected: number;
  criticalEventsChecked: string[];
  status: 'Approved' | 'Flagged with Deviation' | 'Pending QA Review';
  notes: string;
}

export interface InfrastructureNode {
  id: string;
  name: string;
  level: 'Level 0' | 'Level 1' | 'Level 2' | 'Level 3' | 'Level 3.5' | 'Level 4';
  levelName: string;
  ipAddress: string;
  vlan: string;
  status: 'Online' | 'Warning' | 'Standby' | 'Maintenance';
  redundancy: string;
  securityZone: string;
  description: string;
}

export interface ChangeControlItem {
  id: string;
  ccrNumber: string;
  title: string;
  systemId: string;
  systemName: string;
  category: 'Hardware' | 'Software' | 'Network' | 'Configuration' | 'Emergency Patch';
  priority: 'Low' | 'Medium' | 'High' | 'Emergency';
  gxpImpact: boolean;
  revalidationRequired: boolean;
  qualificationSteps: ('IQ' | 'OQ' | 'PQ' | 'Delta OQ' | 'Regression Testing')[];
  status: 'Draft' | 'Under Risk Assessment' | 'Pre-Approved by QA' | 'In Implementation' | 'Testing & Verification' | 'Closed & Released';
  requestedBy: string;
  qaApprover: string;
  targetDate: string;
  rollbackPlan: string;
}

export interface InspectionQuestion {
  id: string;
  agency: 'BPOM' | 'US FDA' | 'PIC/S' | 'WHO GMP';
  topic: string;
  inspectorQuestion: string;
  backgroundIntent: string;
  recommendedAnswer: string;
  evidenceDocuments: string[];
  defensiveTips: string[];
}

export interface BackupRecord {
  id: string;
  systemName: string;
  backupType: 'Daily Incremental' | 'Weekly Full' | 'Monthly Archive' | 'Disaster Snapshot';
  destination: 'SAN Local' | 'Tape Vault' | 'Cloud Immutable (WORM)';
  mediaType: string;
  sizeGb: number;
  startTime: string;
  endTime: string;
  status: 'Success' | 'Warning' | 'Failed';
  checksumVerified: boolean;
  retentionYears: number;
  lastRestoreTest: string;
  restoreTestStatus: 'Passed' | 'Pending';
}

export interface DailyRoundItem {
  id: string;
  category: 'Server Room Environmental' | 'Power & UPS' | 'Network & Perimeter' | 'Backup & Storage' | 'Cleanroom Terminals' | 'NTP & Time Sync';
  item: string;
  targetCriteria: string;
  currentValue: string;
  status: 'Pass' | 'Attention' | 'Fail';
  checkedTime: string;
  notes?: string;
}

export interface GxpIncident {
  id: string;
  incidentNo: string;
  systemName: string;
  dateTime: string;
  severity: 'Minor' | 'Major' | 'Critical';
  gxpDataImpact: 'No Impact' | 'Potential Data Risk' | 'Batch Impact';
  rootCauseCategory: 'Hardware' | 'Network' | 'Human Error' | 'Software Glitch';
  description: string;
  immediateAction: string;
  capaRequired: boolean;
  capaNumber?: string;
  status: 'Open' | 'Under Investigation' | 'Resolved' | 'Closed by QA';
}

export interface SopDocument {
  id: string;
  sopNumber: string;
  title: string;
  effectiveDate: string;
  reviewDate: string;
  version: string;
  author: string;
  approver: string;
  summary: string;
  content: string[];
  keyAuditChecklist: string[];
}

export interface GxpNotification {
  id: string;
  type: 'uptime_drop' | 'validation_deadline' | 'ntp_drift' | 'backup_warning';
  severity: 'critical' | 'warning' | 'info';
  systemCode: string;
  systemName: string;
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  acknowledged: boolean;
  targetTab?: string;
  metricValue?: string;
  threshold?: string;
}

export interface AuditTrailEntry {
  id: string;
  seqNo: number;
  timestamp: string;
  userId: string;
  userName: string;
  userRole: string;
  workstationIp: string;
  systemCode: string;
  systemName: string;
  actionType: 'CONFIG_CHANGE' | 'SECURITY_ACCESS' | 'TIME_SYNC' | 'VALIDATION_SIGNOFF' | 'BACKUP_EXEC' | 'DATA_UPDATE';
  actionDescription: string;
  affectedParameter: string;
  oldValue: string;
  newValue: string;
  reasonForChange: string;
  gxpCriticality: 'Critical GxP' | 'Major GxP' | 'Minor GxP';
  eSignatureVerified: boolean;
  sha256Hash: string;
  tamperEvidentStatus: 'Verified (Immutable WORM)' | 'Pending Verification';
}

export type GampSeverity = 1 | 2 | 3;
export type GampProbability = 1 | 2 | 3;
export type GampDetectability = 1 | 2 | 3;
export type GampRiskClass = 'Class 1 (High)' | 'Class 2 (Medium)' | 'Class 3 (Low)';
export type ResidualRiskLevel = 'Low Risk' | 'Medium Risk' | 'High Risk';

export interface GampRiskAssessment {
  id: string;
  riskId: string;
  systemCode: string;
  systemName: string;
  processFunction: string;
  gampCategory: GampCategory;
  gxpAspect: 'Patient Safety' | 'Product Quality' | 'Data Integrity' | 'Combination (Safety & Quality)';
  potentialFailureMode: string;
  potentialEffect: string;
  potentialCause: string;
  severity: GampSeverity;
  severityReason: string;
  probability: GampProbability;
  probabilityReason: string;
  initialRiskClass: GampRiskClass;
  detectability: GampDetectability;
  detectabilityReason: string;
  initialRpn: number;
  mitigationControls: string[];
  controlTypes: ('Technical / Automated' | 'Procedural / SOP' | 'Qualification Testing' | 'Supplier Audit')[];
  testingDeliverables: string[];
  residualSeverity: GampSeverity;
  residualProbability: GampProbability;
  residualDetectability: GampDetectability;
  residualRpn: number;
  residualRiskLevel: ResidualRiskLevel;
  status: 'Approved by QA' | 'In Review' | 'Draft';
  assessedBy: string;
  qaApprovedBy: string;
  lastAssessmentDate: string;
}


