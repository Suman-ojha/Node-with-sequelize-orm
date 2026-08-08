# Use an official, lightweight Node.js LTS image
FROM node:22-alpine

# Set non-sensitive default environment variables
ENV NODE_ENV=production

ENV PORT=5000

# Set working directory inside the container
WORKDIR /usr/src/app

# Copy package files first to optimize Docker layer caching
COPY package*.json ./

# Install only production dependencies and clear npm cache
RUN npm ci --omit=dev && npm cache clean --force

# Copy source code and change ownership to built-in non-root 'node' user
COPY --chown=node:node . .


# Switch to unprivileged user for container security
USER node

# Document the exposed port
EXPOSE 5000

# Start app directly with node instead of npm start for proper OS signal handling
CMD ["node", "app.js"]
