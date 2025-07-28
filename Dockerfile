FROM node:22-alpine

WORKDIR /app

COPY package.json ./
COPY pnpm-lock.yaml ./

RUN npm i pnpm@10.11.0
RUN pnpm i

COPY . .

EXPOSE 5173

CMD ["pnpm", "dev"]