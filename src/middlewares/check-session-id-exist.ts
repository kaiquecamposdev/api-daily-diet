import { FastifyReply, FastifyRequest } from 'fastify'

export async function checkSessionIdExist(
  req: FastifyRequest,
  res: FastifyReply,
) {
  const { session_id } = req.cookies

  if (!session_id) return res.status(401).send({ error: 'Unauthorized' })
}
