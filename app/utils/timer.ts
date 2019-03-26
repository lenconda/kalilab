/**
 * delay a period of time
 * @param {number} ms
 */
export const delay = async (ms: number): Promise<boolean> => {
  return new Promise(resolve => {
    setTimeout(() => resolve(true), ms)
  })
}
