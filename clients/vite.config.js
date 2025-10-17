import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react-swc'
import path, { dirname } from 'path'
import { fileURLToPath } from 'url'
import { defineConfig, loadEnv } from 'vite'

const __dirname = dirname(fileURLToPath(import.meta.url))
export default defineConfig(({ mode }) => {
  // eslint-disable-next-line no-undef
  const env = loadEnv(mode, process?.cwd(), '')
  // console.log(env)
  return {
    plugins: [react(), tailwindcss()],
    server: {
      port: Number(env.VITE_PORT)
    },
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "src"),
        "_s": path.resolve(__dirname, "src", "features", "seller"),
        "_c": path.resolve(__dirname, "src", "features", "customer"),
        "_a": path.resolve(__dirname, "src", "features", "administrator"),
      }
    }
  }
})
