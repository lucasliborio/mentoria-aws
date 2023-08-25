import { developmentMiddleware } from 'development/development-middleware';
import express from 'express';

const DEFAULT_HTTP_PORT = 3000
const app = express()
app.use(express.json())
app.use(developmentMiddleware())

app.listen(DEFAULT_HTTP_PORT, () => {
    console.log('RODANDO TUDO')
})