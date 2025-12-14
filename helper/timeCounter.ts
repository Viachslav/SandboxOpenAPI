export function timeCounter(): number {
const start = performance.now();
  const duration = performance.now() - start;
  console.log(`Response time: ${duration.toFixed(2)} ms`);
  return duration;
}