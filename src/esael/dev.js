const dev = require('dev-tool');

dev.build({
  source: 'src/examples/cube.ts',
  outfile: 'public/js/cube.js',
  platform: 'browser',
  watch: 'src'
})

dev.build({
  source: 'src/examples/gltf.ts',
  outfile: 'public/js/gltf.js',
  platform: 'browser',
  watch: 'src'
})

dev.build({
  source: 'src/examples/lightmap.ts',
  outfile: 'public/js/lightmap.js',
  platform: 'browser',
  watch: 'src'
})