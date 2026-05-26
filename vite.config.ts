import { defineConfig } from 'vite'
import logseqDevPlugin from 'vite-plugin-logseq'

export default defineConfig(({ mode }) => {
  const plugins = []
  if (mode === 'development') {
    plugins.push(logseqDevPlugin())
  }
  return {
    base: './',
    plugins,
    build: {
      target: 'esnext',
      minify: 'esbuild',
    },
  }
})
