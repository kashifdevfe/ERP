import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

// Ensure `globalThis.crypto.getRandomValues` is available in the Node environment
// Some libraries (nanoid, etc.) expect the Web Crypto API during build.
try {
  // `node:crypto` provides `webcrypto` with `getRandomValues` in Node 16.0+
  // Use a dynamic import so this file remains ESM-compatible.
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const nodeCrypto = await import('node:crypto');
  if (!globalThis.crypto && nodeCrypto && nodeCrypto.webcrypto) {
    // Assign the webcrypto implementation to globalThis.crypto
    (globalThis as any).crypto = nodeCrypto.webcrypto;
  }
} catch (e) {
  // If we cannot polyfill, continue — Vite will surface an error later.
}

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, '.', '');
    return {
      server: {
        port: 3000,
        host: '0.0.0.0',
      },
      plugins: [react()],
      define: {
        'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
        'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY)
      },
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '.'),
        }
      }
    };
});
