
export enum SystemRole {
    // ==================== TIER 1: END USERS ====================

    // ==================== TIER 2: OPERATIONS ====================
    CUSTOMER_SUPPORT_AGENT = "customer_support_agent",
    // Tier 1 support: basic account assistance, FAQ resolution

    CUSTOMER_SUPPORT_SUPERVISOR = "customer_support_supervisor",
    // Tier 2 support: dispute resolution, KYC verification, withdrawal approvals

    PAYMENT_PROCESSOR = "payment_processor",
    // Manual deposit/withdrawal processing, payment gateway management

    SETTLEMENT_AGENT = "settlement_agent",
    // Manual bet settlement, void/cancel operations, result corrections

    TRADING_OPERATOR = "trading_operator",
    // Odds adjustment, market management, exposure monitoring

    // ==================== TIER 3: RISK & COMPLIANCE ====================
    RISK_ANALYST = "risk_analyst",
    // Fraud monitoring, pattern detection, bet limit adjustments

    RISK_MANAGER = "risk_manager",
    // Exposure management, liability control, limit framework definition

    AML_ANALYST = "aml_analyst",
    // Transaction monitoring, suspicious activity detection

    COMPLIANCE_OFFICER = "compliance_officer",
    // Regulatory compliance, reporting, policy enforcement

    SECURITY_ANALYST = "security_analyst",
    // Account security, device fingerprinting, breach investigation

    // ==================== TIER 4: CONTENT & PRODUCT ====================
    CONTENT_EDITOR = "content_editor",
    // Marketing content, banners, promotions content

    CONTENT_MANAGER = "content_manager",
    // Content strategy, approval workflows, multilingual management

    PRODUCT_OPERATOR = "product_operator",
    // Game enablement/disablement, provider management, maintenance scheduling

    PRODUCT_MANAGER = "product_manager",
    // Product roadmap, feature enablement, A/B testing configuration

    PROMOTION_OPERATOR = "promotion_operator",
    // Campaign execution, bonus rule configuration

    PROMOTION_MANAGER = "promotion_manager",
    // Promotion strategy, budget allocation, VIP program management

    // ==================== TIER 5: SUPERVISION & AUDIT ====================
    AUDITOR = "auditor",
    // Read-only access to all operational data for compliance auditing

    FRAUD_INVESTIGATOR = "fraud_investigator",
    // Deep-dive investigation access with write privileges for case management

    SUPERVISOR = "supervisor",
    // Cross-departmental oversight, escalation handling

    // ==================== TIER 6: ADMINISTRATION ====================
    SYSTEM_ADMINISTRATOR = "system_administrator",
    // User management, role assignment (non-privileged roles only)

    SECURITY_ADMINISTRATOR = "security_administrator",
    // Security policy management, access control configuration

    FINANCE_ADMINISTRATOR = "finance_administrator",
    // Financial reporting, reconciliation, tax reporting

    // ==================== TIER 7: EXECUTIVE ====================
    OPERATIONS_MANAGER = "operations_manager",
    // Department head: full operational control within domain

    RISK_DIRECTOR = "risk_director",
    // Ultimate risk authority, limit overrides

    COMPLIANCE_DIRECTOR = "compliance_director",
    // Regulatory authority, compliance policy setting

    // ==================== TIER 8: SUPER ADMINISTRATORS ====================
    PLATFORM_ADMINISTRATOR = "platform_administrator",
    // Full system access (excluding financial/regulatory overrides)

    TECHNICAL_SUPER_ADMIN = "technical_super_admin",
    // Infrastructure, database, emergency system access

    // ==================== TIER 9: ULTIMATE AUTHORITY ====================
    CHIEF_RISK_OFFICER = "chief_risk_officer",
    // Final authority for all risk-related decisions

    MONEY_LAUNDERING_REPORTING_OFFICER = "mlro",
    // Statutory role for SARs filing (regulatory requirement)

    CHIEF_EXECUTIVE_OFFICER = "ceo",
    // Business leadership, ultimate decision authority

    ULTIMATE_BENEFICIAL_OWNER = "ubo",
    // Ownership verification, emergency override authority
}