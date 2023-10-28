import { knexDb } from '@/utils/database'
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
  app.get('/', async (req, res) => {
    try {
      const users = await knexDb('users').select('*')

      res.send({
        users,
      })
    } catch (err) {
      res.status(400).send({
        message: "Couldn't get users!",
      })
    }
  })

  app.post('/', async (req, res) => {
    const { username, password } = req.body as BodySchemaType
    const encryptedPassword = await hash(password, 10)
    const user = await knexDb('users').where({ username }).first()

    if (!req.body) throw new Error('Body is empty!')
    if (user) throw new Error('User already exists')

    try {
      if (!username) throw new Error('Username is empty!')
      const userCreated = await knexDb('users')
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
    } catch (err) {
      res.status(400).send({
        message: "Couldn't create user!",
      })
    }
  })

  app.delete('/:id', async (req, res) => {
    if (!req.params) throw new Error('Params is empty!')

    try {
      const { id } = req.params as ParamsSchemaType
      const user = await knexDb('users').where({ id }).first()

      if (!user) throw new Error('User not found!')

      await knexDb('users').where({ id }).delete()

      res.status(200).send({
        message: 'User removed successfully!',
      })
    } catch (err) {
      res.status(400).send({
        message: "Couldn't remove user!",
      })
    }
  })
}
