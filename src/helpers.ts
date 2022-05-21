export function suppress(func: Function) {
  try { return func() } catch { }
}
