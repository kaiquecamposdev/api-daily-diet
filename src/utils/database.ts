import { env } from '@/env'
import knexConfig, { Knex } from 'knex'

export const config: Knex.Config = {
  client: 'sqlite',
  connection: env.DATABASE_PATH,
  useNullAsDefault: true,
  migrations: {
    extension: 'ts',
    directory: './db/migrations',
  },
}

export const knex = knexConfig(config)
