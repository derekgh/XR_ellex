import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '', // Use relative paths
  server: {
    host: true, // This will make the server accessible externally
    port: 8080, // You can change this to any port you prefer
  },
})


