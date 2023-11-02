import { app } from '@/app'
import { mealsSchema } from '@/controllers/mealsController'
import { returnBetterSequenceWithinDiet } from '@/utils/returnBetterSequenceWithinDiet'
import { execSync } from 'node:child_process'
import request from 'supertest'
import { afterAll, beforeAll, beforeEach, describe, expect, it } from 'vitest'
import * as z from 'zod'

type MealsSchemaType = z.infer<typeof mealsSchema>

describe('Meals controller', async () => {
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

  it('should be able to create a new meal', async () => {
    await request(app.server)
      .post('/api/users')
      .send({
        username: 'User',
        password: 'User123',
      })
      .expect(201)

    const user = await request(app.server).get('/api/users').expect(200)

    const { id } = user.body.users[0]
    const { username, password } = user.body.users[0]

    await request(app.server)
      .post('/api/meals')
      .auth(username, password, { type: 'basic' })
      .send({
        user_id: id,
        name: 'Meal',
        description: 'Meal description',
        date: '10/10/2023',
        time: '12:00:00',
        withinDiet: true,
      })
      .expect(201)
  })

  it('should be able to list meals', async () => {
    await request(app.server)
      .post('/api/users')
      .send({
        username: 'User',
        password: 'User123',
      })
      .expect(201)

    const user = await request(app.server).get('/api/users').expect(200)

    const userId = user.body.users[0].id
    const { username, password } = user.body.users[0]

    const createNewMeal = await request(app.server)
      .post('/api/meals')
      .auth(username, password, { type: 'basic' })
      .send({
        user_id: userId,
        name: 'Meal',
        description: 'Meal description',
        date: '10/10/2023',
        time: '12:00:00',
        withinDiet: true,
      })
      .expect(201)

    const cookies = createNewMeal.get('Set-Cookie')

    const listMeals = await request(app.server)
      .get('/api/meals')
      .set('Cookie', cookies)
      .auth(username, password, { type: 'basic' })
      .expect(200)

    const { id, created_at, updated_at, session_id } = listMeals.body.meals[0]

    expect(listMeals.body.meals).toEqual([
      expect.objectContaining({
        id,
        user_id: userId,
        session_id,
        name: 'Meal',
        description: 'Meal description',
        date: '10/10/2023',
        time: '12:00:00',
        withinDiet: 1,
        created_at,
        updated_at,
      }),
    ])
  })

  it('should be able to list meals with query totalRegister', async () => {
    await request(app.server)
      .post('/api/users')
      .send({
        username: 'User',
        password: 'User123',
      })
      .expect(201)

    const user = await request(app.server).get('/api/users').expect(200)

    const userId = user.body.users[0].id
    const { username, password } = user.body.users[0]

    const createNewMeal = await request(app.server)
      .post('/api/meals')
      .auth(username, password, { type: 'basic' })
      .send({
        user_id: userId,
        name: 'Meal',
        description: 'Meal description',
        date: '10/10/2023',
        time: '12:00:00',
        withinDiet: true,
      })
      .expect(201)

    const cookies = createNewMeal.get('Set-Cookie')

    const listMeals = await request(app.server)
      .get('/api/meals?totalRegister=true')
      .set('Cookie', cookies)
      .auth(username, password, { type: 'basic' })
      .expect(200)

    expect(listMeals.body).toEqual({
      id: userId,
      username,
      total_register: listMeals.body.meals.length,
      meals: listMeals.body.meals,
    })
  })

  it('should be able to list meals with query totalWithinDiet', async () => {
    await request(app.server)
      .post('/api/users')
      .send({
        username: 'User',
        password: 'User123',
      })
      .expect(201)

    const user = await request(app.server).get('/api/users').expect(200)

    const userId = user.body.users[0].id
    const { username, password } = user.body.users[0]

    const createNewMeal = await request(app.server)
      .post('/api/meals')
      .auth(username, password, { type: 'basic' })
      .send({
        user_id: userId,
        name: 'Meal',
        description: 'Meal description',
        date: '10/10/2023',
        time: '12:00:00',
        withinDiet: true,
      })
      .expect(201)

    const cookies = createNewMeal.get('Set-Cookie')

    const listMeals = await request(app.server)
      .get('/api/meals?totalWithinDiet=true')
      .set('Cookie', cookies)
      .auth(username, password, { type: 'basic' })
      .expect(200)

    expect(listMeals.body).toEqual({
      id: userId,
      username,
      total_within_diet: listMeals.body.meals.filter(
        (meal: MealsSchemaType) => Boolean(meal.withinDiet) === true,
      ).length,
      meals: listMeals.body.meals.filter(
        (meal: MealsSchemaType) => Boolean(meal.withinDiet) === true,
      ),
    })
  })

  it('should be able to list meals with query totalWithoutDiet', async () => {
    await request(app.server)
      .post('/api/users')
      .send({
        username: 'User',
        password: 'User123',
      })
      .expect(201)

    const user = await request(app.server).get('/api/users').expect(200)

    const userId = user.body.users[0].id
    const { username, password } = user.body.users[0]

    const createNewMeal = await request(app.server)
      .post('/api/meals')
      .auth(username, password, { type: 'basic' })
      .send({
        user_id: userId,
        name: 'Meal',
        description: 'Meal description',
        date: '10/10/2023',
        time: '12:00:00',
        withinDiet: true,
      })
      .expect(201)

    const cookies = createNewMeal.get('Set-Cookie')

    const listMeals = await request(app.server)
      .get('/api/meals?totalWithoutDiet=true')
      .set('Cookie', cookies)
      .auth(username, password, { type: 'basic' })
      .expect(200)

    expect(listMeals.body).toEqual({
      id: userId,
      username,
      total_without_diet: listMeals.body.meals.filter(
        (meal: MealsSchemaType) => Boolean(meal.withinDiet) === false,
      ).length,
      meals: listMeals.body.meals.filter(
        (meal: MealsSchemaType) => Boolean(meal.withinDiet) === false,
      ),
    })
  })

  it('should be able to list meals with query betterSequenceWithinDiet', async () => {
    await request(app.server)
      .post('/api/users')
      .send({
        username: 'User',
        password: 'User123',
      })
      .expect(201)

    const user = await request(app.server).get('/api/users').expect(200)

    const userId = user.body.users[0].id
    const { username, password } = user.body.users[0]

    const createNewMeal = await request(app.server)
      .post('/api/meals')
      .auth(username, password, { type: 'basic' })
      .send({
        user_id: userId,
        name: 'Meal',
        description: 'Meal description',
        date: '10/10/2023',
        time: '12:00:00',
        withinDiet: true,
      })
      .expect(201)

    const cookies = createNewMeal.get('Set-Cookie')

    const listMeals = await request(app.server)
      .get('/api/meals?betterSequenceWithinDiet=true')
      .set('Cookie', cookies)
      .auth(username, password, { type: 'basic' })
      .expect(200)

    const [sequence, sequenceQuantity] = returnBetterSequenceWithinDiet(
      listMeals.body.meals,
    )

    expect(listMeals.body).toEqual({
      id: userId,
      username,
      better_sequence_within_diet: sequenceQuantity,
      meals: sequence,
    })
  })

  it('should be able to remove a meal', async () => {
    await request(app.server)
      .post('/api/users')
      .send({
        username: 'User',
        password: 'User123',
      })
      .expect(201)

    const user = await request(app.server).get('/api/users').expect(200)

    const userId = user.body.users[0].id
    const { username, password } = user.body.users[0]

    const createNewMeal = await request(app.server)
      .post('/api/meals')
      .auth(username, password, { type: 'basic' })
      .send({
        user_id: userId,
        name: 'Meal',
        description: 'Meal description',
        date: '10/10/2023',
        time: '12:00:00',
        withinDiet: true,
      })
      .expect(201)

    const cookies = createNewMeal.get('Set-Cookie')

    const listMeals = await request(app.server)
      .get('/api/meals')
      .set('Cookie', cookies)
      .auth(username, password, { type: 'basic' })
      .expect(200)

    const mealId = listMeals.body.meals[0].id

    await request(app.server)
      .delete(`/api/meals/${mealId}`)
      .set('Cookie', cookies)
      .auth(username, password, { type: 'basic' })
      .expect(200)
  })

  it('should be able to update a meal', async () => {
    await request(app.server)
      .post('/api/users')
      .send({
        username: 'User',
        password: 'User123',
      })
      .expect(201)

    const user = await request(app.server).get('/api/users').expect(200)

    const userId = user.body.users[0].id
    const { username, password } = user.body.users[0]

    const createNewMeal = await request(app.server)
      .post('/api/meals')
      .auth(username, password, { type: 'basic' })
      .send({
        user_id: userId,
        name: 'Meal',
        description: 'Meal description',
        date: '10/10/2023',
        time: '12:00:00',
        withinDiet: true,
      })
      .expect(201)

    const cookies = createNewMeal.get('Set-Cookie')

    const listMeals = await request(app.server)
      .get('/api/meals')
      .set('Cookie', cookies)
      .auth(username, password, { type: 'basic' })
      .expect(200)

    const mealId = listMeals.body.meals[0].id

    await request(app.server)
      .put(`/api/meals/${mealId}`)
      .set('Cookie', cookies)
      .auth(username, password, { type: 'basic' })
      .send({
        name: 'Meal updated',
        description: 'Meal description updated',
        date: '11/10/2023',
        time: '13:00:00',
        withinDiet: false,
        updated_at: new Date().toISOString(),
      })
      .expect(200)

    const listMealsUpdated = await request(app.server)
      .get('/api/meals')
      .set('Cookie', cookies)
      .auth(username, password, { type: 'basic' })
      .expect(200)

    const { id, created_at, updated_at, session_id } =
      listMealsUpdated.body.meals[0]

    expect(listMealsUpdated.body.meals).toEqual([
      expect.objectContaining({
        id,
        session_id,
        name: 'Meal updated',
        description: 'Meal description updated',
        date: '11/10/2023',
        time: '13:00:00',
        withinDiet: 0,
        created_at,
        updated_at,
      }),
    ])
  })
})
