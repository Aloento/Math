import { math } from "@/global"

export function suppress(func: Function) {
  try { return func() } catch { }
}

export function fractionMatrix(num?: number[][]) {
  return num?.map(x => x.map(y => y % 1 === 0 ? y : suppress(() => math.format(math.fraction(y)))))
}
