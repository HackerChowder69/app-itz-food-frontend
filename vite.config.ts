import fs from "node:fs"
import path from "node:path"

import tailwindcss from "@tailwindcss/vite"
import react from "@vitejs/plugin-react"
import { defineConfig, loadEnv } from "vite"

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "")
  const pfxPath = path.resolve(__dirname, "./certs/localhost-dev.pfx")
  const passphrase = env.FRONTEND_SSL_PFX_PASSPHRASE

  const https =
    fs.existsSync(pfxPath) && passphrase
      ? {
          passphrase,
          pfx: fs.readFileSync(pfxPath),
        }
      : undefined

  return {
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
        react: path.resolve(__dirname, "./node_modules/react"),
        "react-dom": path.resolve(__dirname, "./node_modules/react-dom"),
      },
      dedupe: ["react", "react-dom"],
    },
    server: {
      host: "localhost",
      https,
      port: 5173,
      proxy: {
        "/api": "http://localhost:3000",
        "/health": "http://localhost:3000",
      },
    },
  }
})
