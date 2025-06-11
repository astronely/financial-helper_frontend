# Multi-stage Dockerfile for production optimization
FROM node:18-alpine AS builder

# Set working directory
WORKDIR /app

# Copy package files for better layer caching
COPY package*.json ./

# Install dependencies (including devDependencies for build)
RUN npm install --only=production=false

# Copy source code
COPY . .

# Build the application
RUN npm run build

# Production stage
FROM node:18-alpine AS production

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install only production dependencies
RUN npm install && npm cache clean --force

# Copy built application from builder stage
COPY --from=builder /app/dist ./dist

# Expose port
EXPOSE 5173