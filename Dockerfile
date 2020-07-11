# pull official base image
FROM node:13.12.0-alpine

# set working directory
WORKDIR /

# install app dependencies
COPY ./api/package.json ./api/
COPY ./api/package-lock.json ./api/

WORKDIR /api/
RUN npm ci

# add api
COPY ./api/ .

# add app dependencies
WORKDIR /
COPY ./app/package.json ./app/
COPY ./app/package-lock.json ./app/

WORKDIR /app/
RUN npm ci

# add api
COPY ./app/ .
RUN npm run build

EXPOSE 3001

# start app
WORKDIR /api/
CMD ["npm", "start"]