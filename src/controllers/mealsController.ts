import { checkDateTimeWithRegex } from '@/middlewares/check-date-time-with-regex'
import { checkSessionIdExist } from '@/middlewares/check-session-id-exist'
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
  totalRegister: z.boolean(),
  totalWithinDiet: z.boolean(),
  betterSequenceWithinDiet: z.boolean(),
})

type ParamsSchemaType = z.infer<typeof paramsSchema>
type MealsSchemaType = z.infer<typeof mealsSchema>

export async function mealsController(app: FastifyInstance) {
  app.get('/', { preHandler: checkSessionIdExist }, async (req, res) => {
    if (!req.headers.authorization) throw new Error('Authorization is empty!')
    if (!req.params) throw new Error('Params is empty!')

    try {
      const { betterSequenceWithinDiet, totalRegister, totalWithinDiet } =
        req.params as ParamsSchemaType
      console.log(req.params)

      const token = req.headers.authorization as string
      const tokenSubstring = token.substring('Basic'.length)
      const tokenDecode = Buffer.from(tokenSubstring, 'base64')
        .toString()
        .trim()
      const [username] = tokenDecode.split(':')
      const { session_id } = req.cookies

      const user = await knexDb('users').where({ username }).select('*').first()

      if (!user) throw new Error('User not found!')

      if (!req.params === undefined) {
        if (totalRegister === true) {
          const totalMeals = await knexDb('meals')
            .where({
              user_id: user.id,
              session_id,
            })
            .select('*')

          return res.send({
            id: user.id,
            username: user.username,
            total: totalMeals.length,
            total_register: totalMeals,
          })
        } else if (totalWithinDiet === true) {
          const totalMeals = await knexDb('meals')
            .where({
              user_id: user.id,
              session_id,
              withinTheDiet: true,
            })
            .select('*')

          return res.send({
            id: user.id,
            username: user.username,
            total: totalMeals.length,
            total_within_diet: totalMeals,
          })
        } else if (totalWithinDiet === false) {
          const totalMeals = await knexDb('meals')
            .where({
              user_id: user.id,
              session_id,
              withinTheDiet: false,
            })
            .select('*')

          return res.send({
            id: user.id,
            username: user.username,
            total: totalMeals.length,
            total_within_diet: totalMeals,
          })
        } else if (betterSequenceWithinDiet === true) {
          const totalMeals = await knexDb('meals')
            .where({
              user_id: user.id,
              session_id,
              withinTheDiet: true,
            })
            .select('*')

          return res.send({
            id: user.id,
            username: user.username,
            total: totalMeals.length,
            better_sequence_within_diet: totalMeals,
          })
        }
      }

      const meals = await knexDb('meals')
        .where({
          user_id: user.id,
          session_id,
        })
        .select('*')

      return res.send({
        id: user.id,
        username: user.username,
        meals,
      })
    } catch (err) {
      res.status(400).send({
        message: "Couldn't get meals!",
      })
    }
  })
  app.post('/', { preHandler: checkDateTimeWithRegex }, async (req, res) => {
    if (!req.body) throw new Error('Body is empty!')
    if (!req.headers.authorization) throw new Error('Authorization is empty!')

    try {
      const token = req.headers.authorization as string
      const tokenSubstring = token.substring('Basic'.length)
      const tokenDecode = Buffer.from(tokenSubstring, 'base64')
        .toString()
        .trim()
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

      if (!user) throw new Error('User not found!')

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
    } catch (err) {
      res.status(400).send({
        message: "Couldn't create meal!",
      })
    }
  })
  app.put('/:id', { preHandler: checkDateTimeWithRegex }, async (req, res) => {
    if (!req.params) throw new Error('Params is empty!')
    if (!req.body) throw new Error('Body is empty!')
    if (!req.headers.authorization) throw new Error('Authorization is empty!')

    try {
      const token = req.headers.authorization as string
      const tokenSubstring = token.substring('Basic'.length)
      const tokenDecode = Buffer.from(tokenSubstring, 'base64')
        .toString()
        .trim()
      const [username] = tokenDecode.split(':')

      const user = await knexDb('users').where({ username }).select().first()

      if (!user) throw new Error('User not found!')

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

      if (!mealUpdated) throw new Error('Meal not found!')

      res.send({
        message: 'Meal updated successfully!',
      })
    } catch (err) {
      res.status(400).send({
        message: "Couldn't update meal!",
      })
    }
  })
  app.delete('/:id', async (req, res) => {
    if (!req.params) throw new Error('Params is empty!')

    try {
      const { id } = req.params as ParamsSchemaType

      const mealDeleted = await knexDb('meals').where({ id }).delete()

      if (!mealDeleted) throw new Error('Meal not found!')

      res.send({
        message: 'Meal removed successfully!',
      })
    } catch (err) {
      res.status(400).send({
        message: "Couldn't delete meal!",
      })
    }
  })
}
