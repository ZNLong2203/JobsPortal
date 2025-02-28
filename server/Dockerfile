# Stage 1: Build stage
FROM node:22 AS build

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build

# Stage 2: Production stage
FROM node:22-alpine

WORKDIR /usr/src/app

# Copy only necessary files
COPY --from=build /usr/src/app/dist ./dist
COPY package*.json ./
COPY .env ./

# Clean installation of production dependencies
RUN npm ci --only=production

EXPOSE 2222

CMD ["node", "dist/main"]