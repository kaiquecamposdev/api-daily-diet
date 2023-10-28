import { mealsSchema } from '@/controllers/mealsController'
import { FastifyRequest } from 'fastify'
import * as z from 'zod'

type MealsSchemaType = z.infer<typeof mealsSchema>

export async function checkDateTimeWithRegex(req: FastifyRequest) {
  const { date, time } = req.body as MealsSchemaType

  const dateRegex = /^\d{2}\/\d{2}\/\d{4}$/
  const timeRegex = /^\d{2}:\d{2}:\d{2}$/

  if (!dateRegex.test(date))
    throw new Error('Date must be in format dd/mm/yyyy')
  if (!timeRegex.test(time)) throw new Error('Time must be in format hh:mm:ss')
}
