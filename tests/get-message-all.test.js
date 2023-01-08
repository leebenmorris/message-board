import { describe, expect, it } from '@jest/globals'
import supertest from 'supertest'

const { default: app } = await import('../src/app.js')

const messages = [
	{
		message: 'Hello there!',
		added: Date.now(),
	},
	{
		message: "What's up?",
		added: Date.now() + 100,
	},
	{
		message: 'Doing fine!',
		added: Date.now() + 200,
	},
]

describe('get /message/all', () => {
	describe('when getting all of the messages', () => {
		let res
		beforeAll(async () => {
			const server = supertest(app)

			for (const message of messages) {
				await server.post('/message/new').type('json').send(message)
			}

			res = await server.get('/message/all')
		})

		it('should return a 200 code', () => {
			expect(res.status).toBe(200)
		})

		it('should return the saved messages', () => {
			expect(res.body).toEqual(messages)
		})
	})
})
