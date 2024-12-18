const express = require('express')
const bodyParser = require('body-parser')
const Joi = require('joi')
const app = express()
const port = 8080
const cors = require ("cors");
require('dotenv').config()


const userRouter = require('./routers/users.routers');

app.use(cors())
app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

app.use(userRouter)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})