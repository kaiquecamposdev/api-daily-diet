import { app } from '@/app'
import { execSync } from 'node:child_process'
import request from 'supertest'
import { afterAll, beforeAll, beforeEach, describe, expect, it } from 'vitest'

describe('User controller', async () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  beforeEach(() => {
    execSync('npm run knex migrate:rollback --all')
    execSync('npm run knex migrate:latest')
  })

  it('should be able to create a new user', async () => {
    await request(app.server)
      .post('/api/users')
      .send({
        username: 'User',
        password: 'User123',
      })
      .expect(201)
  })
  it('should be able to list users', async () => {
    await request(app.server)
      .post('/api/users')
      .send({
        username: 'User',
        password: 'User123',
      })
      .expect(201)

    const listUsers = await request(app.server).get('/api/users').expect(200)
    const passwordEncrypted = listUsers.body.users[0].password

    expect(listUsers.body.users).toEqual([
      expect.objectContaining({
        username: 'User',
        password: passwordEncrypted,
      }),
    ])
  })
  it('should be able to remove a user', async () => {
    await request(app.server)
      .post('/api/users')
      .send({
        username: 'User',
        password: 'User123',
      })
      .expect(201)

    const user = await request(app.server).get('/api/users')
    const userId = user.body.users[0].id

    await request(app.server).delete(`/api/users/${userId}`).expect(200)
  })
})
