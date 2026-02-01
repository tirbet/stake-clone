// /lib/permissions.ts
import { createAccessControl } from "better-auth/plugins/access";
import { defaultStatements, adminAc, userAc, defaultAc, defaultRoles } from "better-auth/plugins/admin/access";
import { TABLE_OPERATIONS } from "./constants/permissions";

// All resources + actions for your igamble admin panel
export const statement = {
  ...defaultStatements,
  dashboard: TABLE_OPERATIONS,
  configuration: TABLE_OPERATIONS,
  sportsbook: TABLE_OPERATIONS,
  sports: TABLE_OPERATIONS,
  markets: TABLE_OPERATIONS,
  bet_settlement: TABLE_OPERATIONS,
  smtp: TABLE_OPERATIONS,
  payment_provider: TABLE_OPERATIONS,
  kyc: TABLE_OPERATIONS,
  currency: TABLE_OPERATIONS,  
  wallet: [...TABLE_OPERATIONS],


} as const;

export const ac = createAccessControl(statement);


// ==================== USERS ====================


// ==================== OPERATIONS ====================
// basic account assistance, FAQ resolution
export const customerSupportAgentRole = ac.newRole({
  user: ['list'],
})

// dispute resolution, KYC verification, withdrawal approvals
export const customerSupportSupervisorRole = ac.newRole({
  user: ['list'],
})

// Manual deposit/withdrawal processing, payment gateway management
export const paymentProcessorRole = ac.newRole({
  user: ['list'],
})

// Manual bet settlement, void/cancel operations, result corrections
export const settlementAgentRole = ac.newRole({
  user: ['list'],
})

// Odds adjustment, market management, exposure monitoring
export const tradingOperatorRole = ac.newRole({
  user: ['list'],
})

// ==================== RISK & COMPLIANCE ====================
// Fraud monitoring, pattern detection, bet limit adjustments
export const riskAnalystRole = ac.newRole({
  user: ['list'],
})

// Exposure management, liability control, limit framework definition
export const riskManagerRole = ac.newRole({
  user: ['list'],
})

// Transaction monitoring, suspicious activity detection
export const amlAnalystRole = ac.newRole({
  user: ['list'],
})
// Regulatory compliance, reporting, policy enforcement
export const complianceOfficerRole = ac.newRole({
  user: ['list'],
})

// Account security, device fingerprinting, breach investigation
export const securityAnalystRole = ac.newRole({
  user: ['list'],
})

// ==================== CONTENT & PRODUCT ====================
// Marketing content, banners, promotions content
export const contentEditorRole = ac.newRole({
  user: ['list'],
})

// Content strategy, approval workflows, multilingual management
export const contentManagerRole = ac.newRole({
  user: ['list'],
})

// Game enablement/disablement, provider management, maintenance scheduling
export const productOperatorRole = ac.newRole({
  user: ['list'],
})

// Product roadmap, feature enablement, A/B testing configuration
export const productManagerRole = ac.newRole({
  user: ['list'],
})

// Campaign execution, bonus rule configuration
export const promotionOperatorRole = ac.newRole({
  user: ['list'],
})

// Promotion strategy, budget allocation, VIP program management
export const promotionManagerRole = ac.newRole({
  user: ['list'],
})

// ==================== SUPERVISION & AUDIT ====================
// Read-only access to all operational data for compliance auditing
export const auditorRole = ac.newRole({
  user: ['list'],
})

// Deep-dive investigation access with write privileges for case management
export const fraudInvestigatorRole = ac.newRole({
  user: ['list'],
})

// Cross-departmental oversight, escalation handling
export const supervisorRole = ac.newRole({
  user: ['list'],
})

// ==================== ADMINISTRATION ====================
// User management, role assignment (non-privileged roles only)
export const systemAdministratorRole = ac.newRole({
  user: ['list'],
})

// Security policy management, access control configuration
export const securityAdministratorRole = ac.newRole({
  user: ['list'],
})

// Financial reporting, reconciliation, tax reporting
export const financeAdministratorRole = ac.newRole({
  user: ['list'],
})


// ==================== EXECUTIVE ====================
// Department head: full operational control within domain
export const operationsManagerRole = ac.newRole({
  user: ['list'],
})

// Ultimate risk authority, limit overrides
export const riskDirectorRole = ac.newRole({
  user: ['list'],
})

// Regulatory authority, compliance policy setting
export const complianceDirectorRole = ac.newRole({
  user: ['list'],
})


// ==================== SUPER ADMINISTRATORS ====================
// Full system access (excluding financial/regulatory overrides)
export const platformAdministratorRole = ac.newRole({
  configuration: [...TABLE_OPERATIONS],
  user: ['list'],

})
// Infrastructure, database, emergency system access
export const technicalSuperAdminRole = ac.newRole({
  user: ['list'],
})

// ==================== ULTIMATE AUTHORITY ====================

// Final authority for all risk-related decisions
export const chiefRiskOfficerRole = ac.newRole({
  user: ['list'],
})

// Statutory role for SARs filing (regulatory requirement)
export const mlroRole = ac.newRole({
  user: ['list'],
})

// Business leadership, ultimate decision authority
export const ceoRole = ac.newRole({
  user: ['list'],
})
// Ownership verification, emergency override authority
export const uboRole = ac.newRole({
  user: ['list'],
  dashboard: ['READ', 'CREATE', 'UPDATE', 'DELETE'],
  configuration: ['READ', 'CREATE', 'UPDATE', 'DELETE'],
  sportsbook: ['READ', 'CREATE', 'UPDATE', 'DELETE'],
  sports: ['READ', 'CREATE', 'UPDATE', 'DELETE'],
  markets: ['READ', 'CREATE', 'UPDATE', 'DELETE'],
  bet_settlement: ['READ', 'CREATE', 'UPDATE', 'DELETE'],
  smtp: ['READ', 'CREATE', 'UPDATE', 'DELETE'],
  payment_provider: ['READ', 'CREATE', 'UPDATE', 'DELETE'],
  kyc: ['READ', 'CREATE', 'UPDATE', 'DELETE'],
  currency: ['READ', 'CREATE', 'UPDATE', 'DELETE'],
})