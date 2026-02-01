// /lib/constants/permissions.ts

// Common actions for most database tables
export const TABLE_OPERATIONS = [
    "READ",
    "CREATE",
    "UPDATE",
    "DELETE",
] as const;



export type TableOperation = (typeof TABLE_OPERATIONS)[number];
