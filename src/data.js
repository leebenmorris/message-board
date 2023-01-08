const messages = []

const data = {
	save(req, _res, next) {
		const { body: message } = req
		messages.push(message)
		next()
	},
	getAll(_req, res, next) {
		res.locals.messages = messages
		next()
	},
}

export default data
