import { userController } from '@/controllers/userController'
import cookie from '@fastify/cookie'
import fastify, { FastifyError, FastifyReply, FastifyRequest } from 'fastify'
import { mealsController } from './controllers/mealsController'
import { AppError } from './utils/appError'

export const app = fastify()

app.register(cookie)
app.register(userController, {
  prefix: '/api/users',
})
app.register(mealsController, {
  prefix: '/api/meals',
})

app.setErrorHandler(
  (error: FastifyError, req: FastifyRequest, res: FastifyReply) => {
    if (error instanceof AppError) {
      return res.status(error.statusCode).send({
        error: error.name,
        message: error.message,
      })
    }

    return res.status(500).send({
      error: 'Internal Server Error',
      message: 'Something went wrong',
    })
  },
)
