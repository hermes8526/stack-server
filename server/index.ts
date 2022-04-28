import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
Promise = require('bluebird')

const routes = require('./index.route');

dotenv.config()

const app = express()

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use('/api', routes)

mongoose.Promise = Promise
const mongoUri = process.env.MONGO_HOST || 'mongodb://localhost/stack'
mongoose?.connect(mongoUri)
mongoose?.connection.on('error', () => {
  console.log(`unable to connect to database: ${mongoUri}`)
})

const port = Number(process.env.PORT || 2567)

app.listen(port)
console.log(`Listening on http://localhost:${port}`)
