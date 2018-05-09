const express = require('express')
const path = require('path')

const app = express()

app.use('/assets', express.static(path.resolve(__dirname, 'public')))

app.get('/', (req, res, next) => res.sendFile(path.resolve(__dirname, 'public/index.html')))

app.listen(8668, () => console.log('App listening on port 8668'))
