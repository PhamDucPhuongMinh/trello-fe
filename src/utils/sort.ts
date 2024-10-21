// Sort Columns/Cards
export const mapOrder = <T, K extends keyof T>(originalArray: T[], orderArray: T[K][], key: K): T[] => {
  if (!originalArray || !orderArray || !key) return []

  const clonedArray = [...originalArray]
  const orderedArray = clonedArray.sort((a, b) => {
    return orderArray.indexOf(a[key]) - orderArray.indexOf(b[key])
  })

  return orderedArray
}
