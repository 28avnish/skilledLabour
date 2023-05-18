FROM node:18
WORKDIR /app
COPY . /app
RUN npm install -g npm@9.6.6
EXPOSE 3333
CMD ["npm", "start"]
