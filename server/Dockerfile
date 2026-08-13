# ---- Stage 1: Build ----
FROM node:20-alpine AS build

WORKDIR /app

# Install dependencies first (better layer caching)
COPY package.json package-lock.json ./
RUN npm ci

# Copy source and compile TypeScript
COPY . .
RUN npm run build

# ---- Stage 2: Production ----
FROM node:20-alpine

WORKDIR /app

# Install only production dependencies
COPY package.json package-lock.json ./
RUN npm ci --omit=dev

# Copy compiled JS from build stage
COPY --from=build /app/dist ./dist

EXPOSE 5000

CMD ["node", "dist/server.js"]
