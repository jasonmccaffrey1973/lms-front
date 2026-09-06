export type AuditLogEntry = {
  action: string;
  entityType: string;
  entityId?: string;
  before?: Record<string, unknown>;
  after?: Record<string, unknown>;
  diff?: Record<string, { before?: unknown; after?: unknown }>;
  timestamp: string;
  userId?: string;
};

export function createAuditLogger() {
  return {
    log(entry: AuditLogEntry) {
      console.info('[AUDIT]', JSON.stringify(entry));
      return entry;
    },
    compare(before: Record<string, unknown> = {}, after: Record<string, unknown> = {}) {
      const keys = new Set([...Object.keys(before), ...Object.keys(after)]);
      const diff: Record<string, { before?: unknown; after?: unknown }> = {};

      keys.forEach((key) => {
        const beforeValue = before[key];
        const afterValue = after[key];

        if (JSON.stringify(beforeValue) !== JSON.stringify(afterValue)) {
          diff[key] = { before: beforeValue, after: afterValue };
        }
      });

      return diff;
    },
  };
}
