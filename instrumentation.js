export async function register() {
  console.log('A')
  if (process.env.NEXT_RUNTIME === 'nodejs') {
    console.log('B')
    await import('./instrumentation.node.ts')
    console.log('C')
  }
  console.log('D')
}