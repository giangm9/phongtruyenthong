const express = require('express')
const compression = require('compression')

const app = express()

app.use(compression())

const examples = ['cube', 'gltf', 'lightmap']

app.get('/', (req, res) => {

  res.send(`
    <html>
      <title> Esael exampes </title>
      <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,300italic,700,700italic">
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.1/normalize.css">
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/milligram/1.4.1/milligram.css"
      <body>
        <div>
          ${examples.map(name => `<a href="/${name}"> ${name} </a><br>`)
          .join('\n')}
        </div>
      <body>
    </html>
  `)
});

app.get('/:example', (req, res) => {
  const name = req.params['example']
  res.send(`
    <html>
      <title>${name}</title>
      <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,300italic,700,700italic">
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.1/normalize.css">
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/milligram/1.4.1/milligram.css">
      <style>
        body,html, canvas {
          width: 100%;
          height: 100%;
          margin: 0;
        }
      </style>
      <body>
        <a style="
            position:fixed; 
            background-color: #ffffff;
            padding: 5px 
          "
          href="/"> 
          &lt; back
        </a>
        <canvas id="main"></canvas>
      </body>
      <script src='js/${name}.js'></script>
    </html>
  `)

})

app.use('/', express.static('public'));


require('./dev')
app.listen(8080, () => { console.log('localhost:8080'); });