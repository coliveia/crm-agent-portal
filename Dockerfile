# Multi-stage build for CRM Agent Portal (React + Vite)
# Stage 1: Build
FROM node:22-alpine AS builder

WORKDIR /app

# Install pnpm
RUN npm install -g pnpm@latest

# Copy package files
COPY package.json pnpm-lock.yaml ./

# Install dependencies
RUN pnpm install --frozen-lockfile

# Copy source code
COPY src ./src
COPY vite.config.js ./
COPY tailwind.config.js ./
COPY postcss.config.js ./
COPY eslint.config.js ./

# Build the application
RUN pnpm run build

# Stage 2: Serve with nginx
FROM nginx:alpine

LABEL maintainer="CRM Team"
LABEL description="CRM Agent Portal"
LABEL version="1.0.0"

# Create non-root user with different GID
RUN addgroup -g 1001 crm && \
    adduser -D -u 1001 -G crm crm

# Copy nginx config
RUN echo 'server { listen 3000; server_name _; root /app/dist; index index.html; location / { try_files $uri $uri/ /index.html; } location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ { expires 1y; add_header Cache-Control "public, immutable"; } }' > /etc/nginx/conf.d/default.conf

# Copy built application from builder
COPY --from=builder --chown=crm:crm /app/dist /app/dist

# Change ownership of nginx directories
RUN chown -R crm:crm /var/cache/nginx /var/log/nginx /var/run /etc/nginx/conf.d

# Switch to non-root user
USER crm

# Expose port
EXPOSE 3000

# Health check
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
    CMD wget --no-verbose --tries=1 --spider http://localhost:3000/ || exit 1

# Run nginx
CMD ["nginx", "-g", "daemon off;"]
