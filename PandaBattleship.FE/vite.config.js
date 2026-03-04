import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

function resolveApiTarget() {
  const envEntries = Object.entries(process.env)

  const httpsEntry = envEntries.find(([key, value]) => {
    if (!value) return false
    const lowered = key.toLowerCase()
    return lowered.startsWith('services__') &&
      lowered.includes('pandabattleshipapi') &&
      lowered.includes('__https__')
  })

  if (httpsEntry?.[1]) {
    return httpsEntry[1]
  }

  const httpEntry = envEntries.find(([key, value]) => {
    if (!value) return false
    const lowered = key.toLowerCase()
    return lowered.startsWith('services__') &&
      lowered.includes('pandabattleshipapi') &&
      lowered.includes('__http__')
  })

  return httpEntry?.[1] ?? 'https://localhost:5001'
}

const apiTarget = resolveApiTarget()

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: process.env.PORT ? parseInt(process.env.PORT) : 5173,
    strictPort: true,
    proxy: {
      '/gamehub': {
        target: apiTarget,
        changeOrigin: true,
        secure: false,
        ws: true,
      },
    },
  }
})
