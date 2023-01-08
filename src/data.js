const messages = []

const data = {
	save(req, _res, next) {
		const { body: message } = req
		messages.push(message)
		next()
	},
}

export default data
