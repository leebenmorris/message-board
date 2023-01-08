import { describe, expect, it } from '@jest/globals'
import supertest from 'supertest'

const { default: app } = await import('../src/app.js')

const post = theApp => supertest(theApp).post('/message/new').type('json')
const getAll = theApp => supertest(theApp).get('/message/all')

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
		beforeEach(async () => {
			for (const message of messages) {
				await post(app).send(message)
			}

			res = await getAll(app)
		})

		it('should return a 200 code', () => {
			expect(res.status).toBe(200)
		})

		it('should return the saved messages', () => {
			expect(res.body).toEqual(messages)
		})
	})
})
