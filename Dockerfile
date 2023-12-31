FROM node:lts-alpine

WORKDIR /app

COPY package.json* ./

COPY BackEnd-Server-MVC/package*.json BackEnd-Server-MVC/
RUN npm install --prefix BackEnd-Server-MVC --omit=dev

COPY FrontEnd-Client/package*.json FrontEnd-Client/
RUN npm install --prefix FrontEnd-Client --omit=dev

COPY FrontEnd-Client/ FrontEnd-Client/
RUN npm run build --prefix FrontEnd-Client

COPY BackEnd-Server-MVC/ BackEnd-Server-MVC/

USER node

CMD ["npm", "start", "--prefix", "BackEnd-Server-MVC"]

EXPOSE 8000