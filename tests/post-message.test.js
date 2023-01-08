import { describe, expect, it, jest } from '@jest/globals'
import supertest from 'supertest'

jest.unstable_mockModule('../src/data.js', () => ({
	default: {
		save: jest.fn((_req, _res, next) => {
			next()
		}),
		getAll: jest.fn((_req, _res, next) => {
			next()
		}),
	},
}))

const { default: data } = await import('../src/data.js')
const { default: app } = await import('../src/app.js')

const post = theApp => supertest(theApp).post('/message/new').type('json')

const goodMessage = {
	message: 'Hello there!',
	added: Date.now(),
}

describe('post /message/new', () => {
	describe('when sent a json encoded message in the correct format', () => {
		let res
		beforeEach(async () => {
			res = await post(app).send(goodMessage)
		})

		afterEach(jest.clearAllMocks)

		it('should return a 201 code', () => {
			expect(res.status).toBe(201)
		})

		it('should return an ok message', () => {
			expect(res.body).toEqual({ ok: true })
		})

		it('should call the save middleware once', () => {
			expect(data.save).toHaveBeenCalledTimes(1)

			const [req] = data.save.mock.calls[0]
			const { body: message } = req

			expect(message).toEqual(goodMessage)
		})
	})
})
