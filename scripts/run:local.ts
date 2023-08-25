import express from 'express';
import { developmentMiddleware } from '../src/development-middleware';
import { developmentBodyParsermiddleware } from '../src/development-body-parser-middleware';


const DEFAULT_HTTP_PORT = 3000
const app = express()


app.use(developmentBodyParsermiddleware())
app.use(developmentMiddleware())

app.listen(DEFAULT_HTTP_PORT, () => {
    console.log('App listen on port ' + DEFAULT_HTTP_PORT)
})