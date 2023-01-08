import express from 'express'

const app = express()

app.post('/message/new', (req, res) => {
	res.status(201).json({ ok: true })
})

export default app
