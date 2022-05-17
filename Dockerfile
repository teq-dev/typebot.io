# https://github.com/vercel/turborepo/issues/215#issuecomment-1027058056
FROM node:16-slim AS base
WORKDIR /app
ARG SCOPE
ENV SCOPE=${SCOPE}

FROM base AS pruner
RUN yarn global add turbo@1.2.9
COPY . .
RUN turbo prune --scope=${SCOPE} --docker

FROM base AS installer
COPY --from=pruner /app/out/json/ .
COPY --from=pruner /app/out/yarn.lock ./yarn.lock
RUN yarn install --frozen-lockfile

FROM base AS builder
COPY --from=installer /app/ .
COPY --from=pruner /app/out/full/ .
RUN apt-get -qy update && apt-get -qy install openssl
RUN yarn turbo run build --scope=${SCOPE} --include-dependencies --no-deps
RUN find . -name node_modules | xargs rm -rf

FROM base AS runner
WORKDIR /app
ENV NODE_ENV production
COPY ./packages/db/prisma ./prisma
COPY --from=installer /app/node_modules ./node_modules
COPY --from=builder /app/apps/${SCOPE}/next.config.js ./
COPY --from=builder /app/apps/${SCOPE}/public ./public
COPY --from=builder /app/apps/${SCOPE}/package.json ./package.json
COPY --from=builder /app/apps/${SCOPE}/.next/standalone ./
COPY --from=builder /app/apps/${SCOPE}/.next/static ./.next/static
RUN apt-get -qy update && apt-get -qy install openssl
EXPOSE 3000
ENV PORT 3000
CMD ["node", "server.js"]