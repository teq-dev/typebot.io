import { withSentry } from '@sentry/nextjs'
import prisma from 'libs/prisma'
import { Typebot, WebhookStep } from 'models'
import { NextApiRequest, NextApiResponse } from 'next'
import { authenticateUser } from 'services/api/utils'
import { byId, methodNotAllowed } from 'utils'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const user = await authenticateUser(req)
    if (!user) return res.status(401).json({ message: 'Not authenticated' })
    const body = req.body as Record<string, string>
    if (!('url' in body))
      return res.status(403).send({ message: 'url is missing in body' })
    const { url } = body
    const typebotId = req.query.typebotId.toString()
    const stepId = req.query.blockId.toString()
    const typebot = (await prisma.typebot.findUnique({
      where: { id_ownerId: { id: typebotId, ownerId: user.id } },
    })) as unknown as Typebot | undefined
    if (!typebot) return res.status(400).send({ message: 'Typebot not found' })
    try {
      const { webhookId } = typebot.blocks
        .flatMap((b) => b.steps)
        .find(byId(stepId)) as WebhookStep
      await prisma.webhook.upsert({
        where: { id: webhookId },
        update: { url, body: '{{state}}', method: 'POST' },
        create: { url, body: '{{state}}', method: 'POST', typebotId },
      })

      return res.send({ message: 'success' })
    } catch (err) {
      return res
        .status(400)
        .send({ message: "blockId doesn't point to a Webhook step" })
    }
  }
  return methodNotAllowed(res)
}

export default withSentry(handler)
