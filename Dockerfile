FROM node:20-alpine

WORKDIR /app

COPY package.json ./
RUN npm install

COPY . .
ARG NODE_ENV
RUN if [ "$NODE_ENV" = "production" ]; then \
      npm run build --prod; \
    else \
      npm run build; \
    fi

  CMD ["npm", "start"]

EXPOSE 3000
