export async function measureTime<T>(fn: () => Promise<T>) {
  const start = performance.now();
  const result = await fn();
  const duration = performance.now() - start;
  console.log(`Operation took ${duration} ms`);
  return { result, duration };
}