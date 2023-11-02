import { AppError } from '@/utils/appError'
import { knex } from '@/utils/database'
import { hash } from 'bcrypt'
import { randomUUID } from 'crypto'
import { FastifyInstance } from 'fastify'
import * as z from 'zod'

const bodySchema = z.object({
  username: z.string().min(1),
  password: z.string().min(8),
})
const paramsSchema = z.object({
  id: z.string().uuid(),
})

type BodySchemaType = z.infer<typeof bodySchema>
type ParamsSchemaType = z.infer<typeof paramsSchema>

export async function userController(app: FastifyInstance) {
  app.post('/', async (req, res) => {
    const { username, password } = req.body as BodySchemaType
    const encryptedPassword = await hash(password, 10)

    if (!req.body) throw new AppError('Body is empty!', 404)

    const user = await knex('users').where({ username }).first()

    if (!username) throw new AppError('Username is empty!', 400)
    if (user) throw new AppError('User already exists!', 409)

    const userCreated = await knex('users')
      .insert({
        id: randomUUID(),
        username,
        password: encryptedPassword,
        created_at: new Date().toISOString(),
      })
      .returning('*')

    res.status(201).send({
      userCreated,
    })
  })
}
