export function getLocalItem(value: string) {
  const item = localStorage.getItem(value);
  try {
    if (item) {
      return JSON.parse(item);
    } else {
      return undefined;
    }
  } catch (error) {
    alert(`Parse error: ${(error as Error).message}`);
  }
}
