FROM node:20 as ts-compiler
WORKDIR /backend
COPY package*.json ./
COPY tsconfig*.json ./
RUN npm install
COPY . ./
RUN npm run build

FROM node:20 as ts-remover
WORKDIR /backend
COPY --from=ts-compiler /backend/package*.json ./
COPY --from=ts-compiler /backend/build ./
RUN npm install --only=production

FROM gcr.io/distroless/nodejs
WORKDIR /backend
COPY --from=ts-remover /backend ./
USER 1000
EXPOSE 3000/tcp
CMD ["index.js"]