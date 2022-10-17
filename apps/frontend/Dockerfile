FROM node:16
WORKDIR /usr/app
COPY package.json ./
COPY tsconfig.json ./
RUN ls -a
RUN npm install
COPY . .
EXPOSE 3000
CMD ["npm", "run", "start"]