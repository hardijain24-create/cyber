export type RiskSeverity = 'LOW' | 'MODERATE' | 'HIGH' | 'CRITICAL';
export type ComplianceStatus = 'COMPLIANT' | 'PARTIAL' | 'NON-COMPLIANT' | 'NOT ASSESSED';
export type NavigationTab = 
  | 'executive' 
  | 'technical' 
  | 'optimizer' 
  | 'compliance'
  | 'vault';

export interface OrgRiskSummary {
  total_expected_annual_loss_crore: number; // 4264.95
  value_at_risk_95pct_crore: number;        // 6100.16
  num_critical_high_open_vulns: number;     // 510
  model_confidence_roc_auc: number;         // 0.763
  top_risk_asset: string;                    // Treasury-DomainController-102
  top_risk_asset_ale_crore: number;          // 1096.44
  top_risk_asset_pct_share: number;          // 25.7%
}

export interface BusinessUnitRisk {
  id: string;
  name: string;
  expectedAnnualLossCrore: number;
  assetsCount: number;
  findingsCount: number;
  severity: RiskSeverity;
}

export interface ModelExplainabilityFactor {
  factor: string;
  importancePct: number;
}

export interface AssetRiskScore {
  assetName: string;
  businessUnit: string;
  assetType: string;
  criticality: number; // 1-5
  likelihoodPct: number;
  financialImpactCrore: number;
  expectedAnnualLossCrore: number;
}

export interface VulnerabilityRiskScore {
  cveId: string;
  affectedAsset: string;
  cvssScore: number;
  severity: RiskSeverity;
  patched: 'Yes' | 'No';
  predictedLikelihoodPct: number;
}

export interface OptimizerActionItem {
  id: string;
  action: string;
  affectedAssets: string;
  costInr: number; // in Rupees, e.g. 15,00,000
  riskReductionCrore: number; // ₹ ALE avoided in Crore
  rosiPct: number; // ROSI %
}

export interface ComplianceControlItem {
  controlName: string;
  framework: string;
  clause: string;
  implementationStatus: 'Fully Implemented' | 'Partially Implemented' | 'Non-Compliant';
  effectivenessPct: number;
  relatedBusinessUnit: string;
}
