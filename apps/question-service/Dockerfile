FROM node:16
ARG ENV_ARG
ARG DB_CLOUD_URI_ARG
WORKDIR /usr/app
ENV ENV=$ENV_ARG
ENV DB_CLOUD_URI=$DB_CLOUD_URI_ARG
COPY package.json ./
COPY tsconfig.json ./
RUN ls -a
RUN npm install
COPY . .
EXPOSE 8004
CMD ["npm", "run", "start"]