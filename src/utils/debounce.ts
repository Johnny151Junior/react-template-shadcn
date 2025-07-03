/**
 * Debounces a function to limit how often it can be called,
 * waiting for a pause in invocations before executing.
 * @param fn The function to debounce
 * @param delay The delay in milliseconds (defaults to 300ms)
 */
export function debounce<T extends (...args: any[]) => any>(
  fn: T,
  delay: number = 300
): (...args: Parameters<T>) => void {
  let timeoutId: ReturnType<typeof setTimeout>;

  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn(...args), delay);
  };
}
