FROM node:22-alpine

RUN corepack enable && corepack prepare pnpm@latest --activate

WORKDIR /app

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
RUN pnpm install --frozen-lockfile --ignore-scripts && \
    pnpm rebuild @parcel/watcher esbuild vue-demi && \
    pnpm exec nuxt prepare

COPY . .

EXPOSE 3000

CMD ["./node_modules/.bin/nuxt", "dev", "--host", "0.0.0.0"]
