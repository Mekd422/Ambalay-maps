# Build stage
FROM node:20-alpine AS build
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm ci

# Copy source and build the app
COPY . .
ARG VITE_API_URL
ARG VITE_UMAMI_ENABLED
ARG VITE_UMAMI_SRC
ARG VITE_UMAMI_WEBSITE_ID
ENV VITE_API_URL=${VITE_API_URL}
ENV VITE_UMAMI_ENABLED=${VITE_UMAMI_ENABLED}
ENV VITE_UMAMI_SRC=${VITE_UMAMI_SRC}
ENV VITE_UMAMI_WEBSITE_ID=${VITE_UMAMI_WEBSITE_ID}
RUN npm run build

# Production stage
FROM nginx:stable-alpine

# Remove default nginx configuration and replace with SPA-friendly config
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy built static files
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
