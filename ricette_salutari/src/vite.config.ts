import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build:{
    lib:{
      entry: path.resolve(__dirname, 'index.tsx')
    },
    rollupOptions: {
      input: {
        'entry-point-a': path.resolve(__dirname, 'src/index.tsx')
      }
    }
  }


})
