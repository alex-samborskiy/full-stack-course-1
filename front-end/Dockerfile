FROM node:14 as builder

WORKDIR /usr/src/app

COPY . .

RUN npm install

RUN npm run build

FROM nginx:1.23-alpine

COPY --from=builder /usr/src/app/build /usr/share/nginx/html

COPY ./nginx/default.conf /etc/nginx/templates/default.conf.template

CMD ["nginx", "-g", "daemon off;"]