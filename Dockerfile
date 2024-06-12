FROM node:18-alpine

# Instala las dependencias necesarias para Puppeteer en Alpine
RUN apk add --no-cache \
    chromium \
    nss \
    freetype \
    harfbuzz \
    ca-certificates \
    ttf-freefont

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

ENV PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium-browser

COPY . .

EXPOSE 3000

CMD ["node", "index.js"]
