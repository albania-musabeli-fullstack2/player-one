# Etapa de compilacion
FROM node:22.13.1 AS dev-deps

WORKDIR /app

COPY package.json package.json

RUN npm install

# Etapa 2
FROM node:22.13.1 AS builder

WORKDIR /app
COPY --from=dev-deps /app/node_modules ./node_modules
COPY . .

RUN npm run build

# Etapa de produccion
FROM nginx:1.23.3 AS prod
EXPOSE 80

COPY --from=builder /app/dist/player-one/browser/ /usr/share/nginx/html

CMD [ "nginx", "-g", "daemon off;" ]