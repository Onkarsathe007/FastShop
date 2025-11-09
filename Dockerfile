FROM node:20

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 8080

# Step 7: Command to run your app
CMD ["node", "server.js"]
