const messages = []

const data = {
	save(req, _res, next) {
		const message = req.body
		messages.push(message)
		next()
	},
}

export default data
