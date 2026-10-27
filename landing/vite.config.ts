import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { existsSync } from 'node:fs'
import { fileURLToPath } from 'node:url'

export default defineConfig(({ command, isPreview }) => {
  const downloadAvailable = existsSync(fileURLToPath(
    new URL('./public/downloads/kevin-cli-windows.exe', import.meta.url),
  ))
  if (command === 'build' && !downloadAvailable) {
    throw new Error('Build the Windows CLI first: python scripts\\build_windows.py (from the repository root).')
  }
  return {
  plugins: [react()],
  worker: { format: 'es' },
  define: { __CLI_DOWNLOAD_AVAILABLE__: JSON.stringify(downloadAvailable) },
  base: command === 'serve' && !isPreview ? '/' : '/Py_Terminal/',
  }
})
