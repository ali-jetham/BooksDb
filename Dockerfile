# Stage 1: Build
FROM node:22-alpine as builder
WORKDIR /app

COPY package.json ./
COPY pnpm-lock.yaml ./

RUN npm i -g pnpm@10.11.0
RUN pnpm i

COPY . .
RUN pnpm run build

# Stage 2: Serve the app
FROM node:22-alpine
WORKDIR /app

RUN pnpm i -g serve
COPY --from=builder /app/dist ./dist

EXPOSE 80
CMD ["serve", "-s", "dist"]
