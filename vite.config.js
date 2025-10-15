import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    // The styled-jsx plugin goes INSIDE the react() plugin's options
    react({
      babel: {
        plugins: ['styled-jsx/babel'],
      },
    }),
    tailwindcss(),
  ],
})