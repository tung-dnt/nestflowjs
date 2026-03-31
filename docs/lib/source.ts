import { docs } from '@/.source';
import { loader } from 'fumadocs-core/source';

const rawSource = docs.toFumadocsSource();

// fumadocs-mdx v11 returns files as a function; fumadocs-core v15 expects an array
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const files: any[] = typeof rawSource.files === 'function' ? (rawSource.files as () => any[])() : rawSource.files;

export const source = loader({
  baseUrl: '/docs',
  source: { files },
});
