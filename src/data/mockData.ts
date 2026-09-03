import type { 
  OrgRiskSummary, 
  BusinessUnitRisk, 
  ModelExplainabilityFactor, 
  AssetRiskScore, 
  VulnerabilityRiskScore, 
  OptimizerActionItem, 
  ComplianceControlItem 
} from '../types/riskforge';

export const ORG_RISK_SUMMARY: OrgRiskSummary = {
  total_expected_annual_loss_crore: 4264.95,
  value_at_risk_95pct_crore: 6100.16,
  num_critical_high_open_vulns: 510,
  model_confidence_roc_auc: 0.763,
  top_risk_asset: 'Treasury-DomainController-102',
  top_risk_asset_ale_crore: 1096.44,
  top_risk_asset_pct_share: 25.7
};

export const TOP_RISK_ASSETS = [
  { asset: 'Treasury-DomainController-102', ale: 1096.44 },
  { asset: 'Payments-AppServer-044', ale: 582.10 },
  { asset: 'DigitalBanking-Database-015', ale: 440.50 },
  { asset: 'Treasury-StorageBucket-078', ale: 396.59 },
  { asset: 'Payments-Database-065', ale: 389.24 },
  { asset: 'CardsLoans-CloudBucket-072', ale: 355.70 },
  { asset: 'DigitalBanking-Database-061', ale: 350.10 },
  { asset: 'RetailBanking-AppServer-022', ale: 245.80 },
  { asset: 'CardsLoans-AppServer-004', ale: 225.40 },
  { asset: 'WealthMgmt-StorageBucket-019', ale: 183.08 }
];

export const BUSINESS_UNITS: BusinessUnitRisk[] = [
  { id: 'bu-1', name: 'Treasury', expectedAnnualLossCrore: 1692.50, assetsCount: 22, findingsCount: 142, severity: 'CRITICAL' },
  { id: 'bu-2', name: 'Payments', expectedAnnualLossCrore: 1180.20, assetsCount: 28, findingsCount: 128, severity: 'CRITICAL' },
  { id: 'bu-3', name: 'Digital Banking', expectedAnnualLossCrore: 790.60, assetsCount: 35, findingsCount: 95, severity: 'HIGH' },
  { id: 'bu-4', name: 'Cards & Loans', expectedAnnualLossCrore: 380.40, assetsCount: 24, findingsCount: 68, severity: 'HIGH' },
  { id: 'bu-5', name: 'Retail Banking', expectedAnnualLossCrore: 145.25, assetsCount: 18, findingsCount: 42, severity: 'MODERATE' },
  { id: 'bu-6', name: 'IT Operations', expectedAnnualLossCrore: 76.00, assetsCount: 23, findingsCount: 35, severity: 'LOW' }
];

export const RISK_TREND_DATA = [
  { date: 'Day -90', score: 5800 },
  { date: 'Day -75', score: 5520 },
  { date: 'Day -60', score: 5200 },
  { date: 'Day -45', score: 4980 },
  { date: 'Day -30', score: 4750 },
  { date: 'Day -15', score: 4480 },
  { date: 'Today', score: 4264.95 }
];

export const MODEL_EXPLAINABILITY_FACTORS: ModelExplainabilityFactor[] = [
  { factor: 'Patch Status', importancePct: 88 },
  { factor: 'Days Open', importancePct: 76 },
  { factor: 'CVSS Score', importancePct: 71 },
  { factor: 'Internet-Facing', importancePct: 65 },
  { factor: 'Asset Criticality', importancePct: 58 },
  { factor: 'Exploit Available', importancePct: 52 },
  { factor: 'Attack Vector', importancePct: 44 },
  { factor: 'Patch Availability', importancePct: 38 }
];

export const ASSET_RISK_REGISTER: AssetRiskScore[] = [
  {
    assetName: 'Treasury-DomainController-102',
    businessUnit: 'Treasury',
    assetType: 'Domain Controller',
    criticality: 5,
    likelihoodPct: 82.5,
    financialImpactCrore: 1329.00,
    expectedAnnualLossCrore: 1096.44
  },
  {
    assetName: 'Payments-AppServer-044',
    businessUnit: 'Payments',
    assetType: 'Application Server',
    criticality: 4,
    likelihoodPct: 74.0,
    financialImpactCrore: 786.62,
    expectedAnnualLossCrore: 582.10
  },
  {
    assetName: 'DigitalBanking-Database-015',
    businessUnit: 'Digital Banking',
    assetType: 'Database',
    criticality: 5,
    likelihoodPct: 68.2,
    financialImpactCrore: 645.89,
    expectedAnnualLossCrore: 440.50
  },
  {
    assetName: 'Treasury-StorageBucket-078',
    businessUnit: 'Treasury',
    assetType: 'Cloud Storage Bucket',
    criticality: 4,
    likelihoodPct: 65.0,
    financialImpactCrore: 610.14,
    expectedAnnualLossCrore: 396.59
  },
  {
    assetName: 'Payments-Database-065',
    businessUnit: 'Payments',
    assetType: 'Database',
    criticality: 4,
    likelihoodPct: 62.4,
    financialImpactCrore: 623.78,
    expectedAnnualLossCrore: 389.24
  },
  {
    assetName: 'CardsLoans-CloudBucket-072',
    businessUnit: 'Cards & Loans',
    assetType: 'Cloud Storage Bucket',
    criticality: 3,
    likelihoodPct: 59.8,
    financialImpactCrore: 594.82,
    expectedAnnualLossCrore: 355.70
  }
];

export const VULNERABILITY_FINDINGS: VulnerabilityRiskScore[] = [
  {
    cveId: 'CVE-2020-1472',
    affectedAsset: 'Treasury-DomainController-102',
    cvssScore: 10.0,
    severity: 'CRITICAL',
    patched: 'No',
    predictedLikelihoodPct: 82.5
  },
  {
    cveId: 'CVE-2021-44228',
    affectedAsset: 'Payments-AppServer-044',
    cvssScore: 10.0,
    severity: 'CRITICAL',
    patched: 'No',
    predictedLikelihoodPct: 74.0
  },
  {
    cveId: 'CVE-2023-3519',
    affectedAsset: 'DigitalBanking-Database-015',
    cvssScore: 9.8,
    severity: 'CRITICAL',
    patched: 'No',
    predictedLikelihoodPct: 68.2
  },
  {
    cveId: 'CVE-2022-26134',
    affectedAsset: 'Treasury-StorageBucket-078',
    cvssScore: 9.7,
    severity: 'CRITICAL',
    patched: 'Yes',
    predictedLikelihoodPct: 12.0
  },
  {
    cveId: 'CVE-2019-0708',
    affectedAsset: 'Payments-Database-065',
    cvssScore: 9.6,
    severity: 'HIGH',
    patched: 'No',
    predictedLikelihoodPct: 62.4
  },
  {
    cveId: 'CVE-2021-26855',
    affectedAsset: 'CardsLoans-CloudBucket-072',
    cvssScore: 8.8,
    severity: 'HIGH',
    patched: 'No',
    predictedLikelihoodPct: 59.8
  }
];

export const OPTIMIZER_ACTIONS: OptimizerActionItem[] = [
  {
    id: 'ACT-01',
    action: 'Patch Zerologon CVE-2020-1472 on Domain Controller',
    affectedAssets: 'Treasury-DomainController-102',
    costInr: 2200000,
    riskReductionCrore: 142.50,
    rosiPct: 6477
  },
  {
    id: 'ACT-02',
    action: 'Deploy WAF Rules & Patch Log4j CVE-2021-44228',
    affectedAssets: 'Payments-AppServer-044',
    costInr: 1850000,
    riskReductionCrore: 98.40,
    rosiPct: 5318
  },
  {
    id: 'ACT-03',
    action: 'Upgrade DB Privileged Access & Patch CVE-2023-3519',
    affectedAssets: 'DigitalBanking-Database-015',
    costInr: 1600000,
    riskReductionCrore: 72.10,
    rosiPct: 4506
  },
  {
    id: 'ACT-04',
    action: 'Remediate S3 Bucket Permissions & Patch CVE-2022-26134',
    affectedAssets: 'Treasury-StorageBucket-078',
    costInr: 1400000,
    riskReductionCrore: 48.60,
    rosiPct: 3471
  },
  {
    id: 'ACT-[#05]',
    action: 'Enforce EDR Endpoint Isolation Policy',
    affectedAssets: 'Payments-Database-065',
    costInr: 1500000,
    riskReductionCrore: 32.80,
    rosiPct: 2186
  },
  {
    id: 'ACT-[#06]',
    action: 'Rotate Service Principal Credentials & Tokens',
    affectedAssets: 'CardsLoans-CloudBucket-072',
    costInr: 1300000,
    riskReductionCrore: 18.20,
    rosiPct: 1400
  }
];

export const COMPLIANCE_MAPPINGS: ComplianceControlItem[] = [
  {
    controlName: 'Privileged Access Management (PAM)',
    framework: 'ISO/IEC 27001',
    clause: 'A.8.24',
    implementationStatus: 'Partially Implemented',
    effectivenessPct: 65.5,
    relatedBusinessUnit: 'Treasury'
  },
  {
    controlName: 'Endpoint Detection & Response (EDR)',
    framework: 'NIST CSF v2.0',
    clause: 'DE.CM-1',
    implementationStatus: 'Partially Implemented',
    effectivenessPct: 74.3,
    relatedBusinessUnit: 'Payments'
  },
  {
    controlName: 'Web Application Firewall (WAF)',
    framework: 'CIS Controls v8.1',
    clause: 'CIS-8',
    implementationStatus: 'Fully Implemented',
    effectivenessPct: 88.0,
    relatedBusinessUnit: 'Digital Banking'
  },
  {
    controlName: 'Real-Time Cyber SOC Incident Response',
    framework: 'RBI Cyber Security Framework',
    clause: 'RBI-CSF-Annexure-1',
    implementationStatus: 'Partially Implemented',
    effectivenessPct: 62.0,
    relatedBusinessUnit: 'Treasury'
  },
  {
    controlName: 'Cyber Resilience & Data Backup Architecture',
    framework: 'SEBI CSCRF',
    clause: 'SEBI-CSCRF-3.1',
    implementationStatus: 'Fully Implemented',
    effectivenessPct: 91.5,
    relatedBusinessUnit: 'Cards & Loans'
  }
];
