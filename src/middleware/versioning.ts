export type VersionedContent<T> = {
  version: number;
  contentHash: string;
  previousHash?: string;
  changed: boolean;
  data: T;
  createdAt: string;
  updatedAt: string;
};

export async function hashContent(value: string): Promise<string> {
  const bytes = new TextEncoder().encode(value);
  const digest = await crypto.subtle.digest('SHA-256', bytes);

  return Array.from(new Uint8Array(digest))
    .map((byte) => byte.toString(16).padStart(2, '0'))
    .join('');
}

export async function createVersionedContent<T>(data: T, previous?: VersionedContent<T>): Promise<VersionedContent<T>> {
  const serialized = JSON.stringify(data ?? {});
  const contentHash = await hashContent(serialized);
  const changed = !previous || previous.contentHash !== contentHash;

  const now = new Date().toISOString();

  return {
    version: previous ? previous.version + 1 : 1,
    contentHash,
    previousHash: previous?.contentHash,
    changed,
    data,
    createdAt: previous?.createdAt ?? now,
    updatedAt: now,
  };
}
