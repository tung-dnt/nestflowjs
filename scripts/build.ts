import { $ } from 'bun';

console.log('🧹 Cleaning dist directory...');
await $`rm -rf dist`;

console.log('📦 Building library with TypeScript compiler...');

// Use TypeScript compiler for proper ESM output with declarations
const tscResult = await $`tsgo -p tsconfig.build.json`.nothrow();

if (tscResult.exitCode !== 0) {
  console.error('❌ TypeScript compilation failed:');
  console.error(tscResult.stderr.toString());
  process.exit(1);
}

console.log('🔄 Resolving path aliases...');

// Transform TypeScript path aliases to relative imports
// Use --resolve-full-paths to resolve to the most accurate relative paths
const aliasResult = await $`tsc-alias -p tsconfig.build.json --resolve-full-paths`.nothrow();

if (aliasResult.exitCode !== 0) {
  console.error('❌ Path alias resolution failed:');
  console.error(aliasResult.stderr.toString());
  process.exit(1);
}

console.log('✅ Built successfully!');
console.log('');
console.log('📦 Package exports:');
console.log('  - nestflow/core');
console.log('  - nestflow/event-bus');
console.log('  - nestflow/exception');
console.log('  - nestflow/adapter');
console.log('');
console.log('💡 The library is now ready for publishing!');
