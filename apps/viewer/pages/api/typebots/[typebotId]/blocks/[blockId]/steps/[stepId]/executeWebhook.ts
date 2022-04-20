import prisma from 'libs/prisma'
import {
  defaultWebhookAttributes,
  ResultValues,
  Typebot,
  Variable,
  Webhook,
  WebhookOptions,
  WebhookStep,
} from 'models'
import { NextApiRequest, NextApiResponse } from 'next'
import { byId, initMiddleware, methodNotAllowed, notFound } from 'utils'
import { withSentry } from '@sentry/nextjs'
import Cors from 'cors'
import { executeWebhook } from '../../executeWebhook'

const cors = initMiddleware(Cors())
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  await cors(req, res)
  if (req.method === 'POST') {
    const typebotId = req.query.typebotId.toString()
    const blockId = req.query.blockId.toString()
    const stepId = req.query.stepId.toString()
    const resultId = req.query.resultId as string | undefined
    const { resultValues, variables } = (
      typeof req.body === 'string' ? JSON.parse(req.body) : req.body
    ) as {
      resultValues: ResultValues | undefined
      variables: Variable[]
    }
    const typebot = (await prisma.typebot.findUnique({
      where: { id: typebotId },
      include: { webhooks: true },
    })) as unknown as (Typebot & { webhooks: Webhook[] }) | null
    if (!typebot) return notFound(res)
    const step = typebot.blocks
      .find(byId(blockId))
      ?.steps.find(byId(stepId)) as WebhookStep
    const webhook = typebot.webhooks.find(byId(step.webhookId))
    if (!webhook)
      return res
        .status(404)
        .send({ statusCode: 404, data: { message: `Couldn't find webhook` } })
    const preparedWebhook = prepareWebhookAttributes(webhook, step.options)
    const result = await executeWebhook(typebot)(
      preparedWebhook,
      variables,
      blockId,
      resultValues,
      resultId
    )
    return res.status(200).send(result)
  }
  return methodNotAllowed(res)
}

const prepareWebhookAttributes = (
  webhook: Webhook,
  options: WebhookOptions
): Webhook => {
  if (options.isAdvancedConfig === false) {
    return { ...webhook, body: '{{state}}', ...defaultWebhookAttributes }
  } else if (options.isCustomBody === false) {
    return { ...webhook, body: '{{state}}' }
  }
  return webhook
}

export default withSentry(handler)
