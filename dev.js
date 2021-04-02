const dev = require('dev-tool')

dev.build({
  source : "src/index.jsx",
  outfile : 'public/index.js',
  watch : 'src',
  stage : 'dev'
})
