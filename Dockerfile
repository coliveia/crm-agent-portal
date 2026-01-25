# Multi-stage build for CRM Node.js Service
# Stage 1: Build
FROM node:22-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production

# Copy source code
COPY . .

# Build if needed
RUN npm run build 2>/dev/null || true

# Stage 2: Runtime
FROM node:22-alpine

LABEL maintainer="CRM Team"
LABEL description="CRM Node.js Service"
LABEL version="1.0.0"

# Create non-root user
RUN addgroup -g 1000 crm && \
    adduser -D -u 1000 -G crm crm

WORKDIR /app

# Copy from builder
COPY --from=builder --chown=crm:crm /app/node_modules ./node_modules
COPY --from=builder --chown=crm:crm /app/dist ./dist
COPY --from=builder --chown=crm:crm /app/package*.json ./

# Switch to non-root user
USER crm

# Expose port
EXPOSE 3000 9090

# Health check
HEALTHCHECK --interval=30s --timeout=5s --start-period=30s --retries=3 \
    CMD wget --no-verbose --tries=1 --spider http://localhost:3000/health || exit 1

# Environment
ENV NODE_ENV=production

# Run the application
CMD ["node", "dist/index.js"]

