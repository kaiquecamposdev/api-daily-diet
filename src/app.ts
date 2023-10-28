import { userController } from '@/controllers/userController'
import cookie from '@fastify/cookie'
import fastify from 'fastify'
import { mealsController } from './controllers/mealsController'

export const app = fastify()

app.register(cookie)
app.register(userController, {
  prefix: '/api/users',
})
app.register(mealsController, {
  prefix: '/api/meals',
})
