import { describe, expect, it } from '@jest/globals'
import supertest from 'supertest'

import app from '../src/app.js'

const post = theApp => supertest(theApp).post('/message/new').type('json')

const goodMessage = {
	message: 'Hello there!',
	added: Date.now(),
}

describe('post /message/new', () => {
	describe('when sent a form encoded message in the correct format', () => {
		let res
		beforeEach(async () => {
			res = await post(app).send(goodMessage)
		})

		it('should return a 201 code', () => {
			expect(res.status).toBe(201)
		})

		it('should return an ok message', () => {
			expect(res.body).toEqual({ ok: true })
		})
	})
})
