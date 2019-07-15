const express = require('express')
const app = express()
const port = 3000

app.get('/', (request, response) => {
  console.log("hello")
  response.send([1,2,3,4])
})

app.listen(port, (err) => {
  if (err) {
    return console.log('something bad happened', err)
  }

  console.log(`server is listening on ${port}`)
})