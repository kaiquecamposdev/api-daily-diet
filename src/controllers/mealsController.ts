import { checkDateTimeWithRegex } from '@/middlewares/check-date-time-with-regex'
import { checkSessionIdExist } from '@/middlewares/check-session-id-exist'
import { AppError } from '@/utils/appError'
import { knexDb } from '@/utils/database'
import { randomUUID } from 'crypto'
import { FastifyInstance } from 'fastify'
import { z } from 'zod'

export const mealsSchema = z.object({
  name: z.string().min(1),
  description: z.string().min(1),
  date: z.string(),
  time: z.string(),
  withinTheDiet: z.boolean(),
})
const paramsSchema = z.object({
  id: z.string().uuid(),
})
const querySchema = z.object({
  totalRegister: z.boolean(),
  totalWithinDiet: z.boolean(),
  totalWithoutDiet: z.boolean(),
  totalSequenceTheWithinDiet: z.boolean(),
})

type ParamsSchemaType = z.infer<typeof paramsSchema>
type MealsSchemaType = z.infer<typeof mealsSchema>
type QuerySchemaType = z.infer<typeof querySchema>

export async function mealsController(app: FastifyInstance) {
  app.get('/', { preHandler: checkSessionIdExist }, async (req, res) => {
    if (!req.headers.authorization) throw new AppError('Unathorized!', 401)
    if (!req.query) throw new AppError('Query is empty!', 400)

    const token = req.headers.authorization as string
    const tokenSubstring = token.substring('Basic'.length)
    const tokenDecode = Buffer.from(tokenSubstring, 'base64').toString().trim()
    const [username] = tokenDecode.split(':')
    const { session_id } = req.cookies
    const query = req.query as QuerySchemaType

    const user = await knexDb('users').where({ username }).select('*').first()

    if (!user) throw new AppError('User not found!', 404)

    const meals = await knexDb('meals')
      .where({
        user_id: user.id,
        session_id,
      })
      .select('*')

    if (query.totalRegister) {
      return res.send({
        id: user.id,
        username: user.username,
        total_register_filtered: meals.length,
      })
    }

    if (query.totalWithinDiet) {
      return res.send({
        id: user.id,
        username: user.username,
        total_within_diet: meals.filter((meal) => meal.withinTheDiet === true)
          .length,
      })
    }

    if (!query.totalWithinDiet) {
      return res.send({
        id: user.id,
        username: user.username,
        total_without_diet: meals.filter((meal) => meal.withinTheDiet === false)
          .length,
      })
    }

    if (query.totalSequenceTheWithinDiet) {
      return res.send({
        id: user.id,
        username: user.username,
        total_sequence_the_within_diet: meals.filter(
          (meal) => meal.withinTheDiet === true,
        ).length,
      })
    }

    return res.send({
      id: user.id,
      username: user.username,
      meals,
    })
  })
  app.post('/', { preHandler: checkDateTimeWithRegex }, async (req, res) => {
    if (!req.headers.authorization) throw new AppError('Unathorized!', 401)
    if (!req.body) throw new AppError('Body is empty!', 400)

    const token = req.headers.authorization as string
    const tokenSubstring = token.substring('Basic'.length)
    const tokenDecode = Buffer.from(tokenSubstring, 'base64').toString().trim()
    const [username] = tokenDecode.split(':')

    const { name, description, date, time, withinTheDiet } =
      req.body as MealsSchemaType

    let session_id = req.cookies.session_id

    if (!session_id) {
      session_id = randomUUID()
      res.cookie('session_id', session_id, {
        path: '/',
        maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
      })
    }

    const user = await knexDb('users').where({ username }).select().first()

    if (!user) throw new AppError('User not found!', 404)

    await knexDb('meals').insert({
      id: randomUUID(),
      user_id: user.id,
      name,
      description,
      date,
      time,
      withinTheDiet,
      created_at: new Date().toISOString(),
      session_id,
    })

    res.status(201).send({
      message: 'Meal created successfully!',
    })
  })
  app.put('/:id', { preHandler: checkDateTimeWithRegex }, async (req, res) => {
    if (!req.headers.authorization) throw new AppError('Unathorized!', 401)
    if (!req.params) throw new AppError('Params is empty!', 404)
    if (!req.body) throw new AppError('Body is empty!', 404)

    const token = req.headers.authorization as string
    const tokenSubstring = token.substring('Basic'.length)
    const tokenDecode = Buffer.from(tokenSubstring, 'base64').toString().trim()
    const [username] = tokenDecode.split(':')

    const user = await knexDb('users').where({ username }).select().first()

    if (!user) throw new AppError('User not found!', 404)

    const { id } = req.params as ParamsSchemaType
    const { name, description, date, time, withinTheDiet } =
      req.body as MealsSchemaType

    const mealUpdated = await knexDb('meals')
      .where({ id, user_id: user.id })
      .update({
        name,
        description,
        withinTheDiet,
        date,
        time,
        updated_at: new Date().toISOString(),
      })

    if (!mealUpdated) throw new AppError('Meal not found!', 404)

    res.send({
      message: 'Meal updated successfully!',
    })
  })
  app.delete('/:id', async (req, res) => {
    if (!req.params) throw new AppError('Params is empty!', 400)

    const { id } = req.params as ParamsSchemaType

    const mealDeleted = await knexDb('meals').where({ id }).delete()

    if (!mealDeleted) throw new AppError('Meal not found!', 404)

    res.send({
      message: 'Meal removed successfully!',
    })
  })
}
