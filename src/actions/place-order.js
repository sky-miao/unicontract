export const SUBMIT = 'SUBMIT'
export const RESET = 'RESET'
export const submit = (opts) => {
  return {
    ...opts,
    type: SUBMIT,
  }
}
export const reset = (opts) => {
  return {
    ...opts,
    type: RESET,
  }
}