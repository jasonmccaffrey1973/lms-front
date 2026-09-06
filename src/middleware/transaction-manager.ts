export type TransactionContext<T = unknown> = {
  id: string;
  startedAt: string;
  state: 'active' | 'committed' | 'rolled-back';
  data: T;
};

export type TransactionHandler<T = unknown, TResult = unknown> = (
  context: TransactionContext<T>,
) => Promise<TResult>;

export async function withTransaction<T = unknown, TResult = unknown>(
  operation: TransactionHandler<T, TResult>,
  data: T,
): Promise<TResult> {
  const context: TransactionContext<T> = {
    id: `tx-${Date.now()}-${Math.random().toString(16).slice(2)}`,
    startedAt: new Date().toISOString(),
    state: 'active',
    data,
  };

  try {
    const result = await operation(context);
    context.state = 'committed';
    return result;
  } catch (error) {
    context.state = 'rolled-back';
    throw error;
  }
}
