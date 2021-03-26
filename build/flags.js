export const VERBOSE = process.argv.includes('--verbose')
export const DEBUG = !process.argv.includes('--release')
export const WATCH = process.argv.includes('--watch')
