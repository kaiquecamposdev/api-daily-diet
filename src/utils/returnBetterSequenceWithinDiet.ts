import { mealsSchema } from '@/controllers/mealsController'
import * as z from 'zod'

type MealsSchemaType = z.infer<typeof mealsSchema>

export function returnBetterSequenceWithinDiet(meals: MealsSchemaType[]) {
  const sequence: MealsSchemaType[] = []

  for (const meal of meals) {
    if (Boolean(meal.withinDiet) === true) {
      sequence.push(meal)
    } else {
      break
    }
  }

  return [sequence, sequence.length]
}
