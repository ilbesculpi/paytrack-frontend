FROM node:20-alpine

WORKDIR /app

COPY package.json ./
RUN npm install
RUN npm install -g @angular/cli@18

COPY . .
ARG NODE_ENV
RUN if [ "$NODE_ENV" = "production" ]; then \
      npm run build --prod; \
    else \
      npm run build; \
    fi

  CMD ["npm", "start"]

EXPOSE 3000
