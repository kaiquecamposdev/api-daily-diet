// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Knex } from 'knex'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const knexDummyUse: Knex | undefined = undefined

declare module 'knex/types/tables' {
  export interface Tables {
    users: {
      id: string
      username: string
      password: string
      created_at: date
      updated_at: date
    }
    meals: {
      id: string
      user_id: string
      name: string
      description: string
      date: string
      time: string
      withinTheDiet: boolean
      created_at: date
      updated_at: date
      session_id: string
    }
  }
}
