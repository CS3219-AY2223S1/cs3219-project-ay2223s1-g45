FROM node:16
ARG ENV_ARG
ARG DB_CLOUD_URI_ARG
ARG FRONTEND_URL_ARG
ARG JWT_SECRET_ARG
ARG COOKIE_SECRET_ARG
WORKDIR /usr/app
ENV ENV=$ENV_ARG
ENV DB_CLOUD_URI=$DB_CLOUD_URI_ARG
ENV FRONTEND_URL=$FRONTEND_URL_ARG
ENV JWT_SECRET=$JWT_SECRET_ARG
ENV COOKIE_SECRET=$COOKIE_SECRET_ARG
COPY package.json ./
COPY tsconfig.json ./
RUN ls -a
RUN npm install
COPY . .
EXPOSE 8000
CMD ["npm", "run", "start"]