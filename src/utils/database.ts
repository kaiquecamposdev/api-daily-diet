import knex, { Knex } from 'knex'
import { env } from '../env'

export const config: Knex.Config = {
  client: "sqlite",
  connection: env.DATABASE_PATH,
  useNullAsDefault: true,
  migrations: {
    extension: 'ts',
    directory: './db/migrations',
  },
}

export const knexDb = knex(config)
