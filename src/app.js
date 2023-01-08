import express from 'express'

import data from './data.js'

const app = express()

app.use(express.json())

app.post('/message/new', data.save, (req, res) => {
	res.status(201).json({ ok: true })
})

export default app
