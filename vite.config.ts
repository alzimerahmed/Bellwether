import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = dirname(fileURLToPath(import.meta.url))

// Structure B: five pages. The former page set (ice-cream, scoop-shops,
// local-delivery, merch, our-story, faqs, jobs, say-hello, events, party-packs)
// is intentionally excluded — those files are superseded and no longer built.
const pages = [
  'index',
  'flavors',
  'locations',
  'story',
  'cart',
]

export default defineConfig({
  plugins: [tailwindcss()],
  publicDir: 'public',
  build: {
    rollupOptions: {
      input: Object.fromEntries(
        pages.map((name) => [name, resolve(root, `${name}.html`)])
      ),
    },
  },
})
