import express from 'express';

const app = express();

app.get('/users', () => {

})

const port = process.env.PORT || 5000
app.listen(port, () => {
  console.log(`Servidor on-line em http://localhost/${port}`)
})