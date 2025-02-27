# Use official Node.js image as the base for building the React app
FROM node:18 AS build

# Set working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json for dependency installation
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy all source files into the container
COPY . .

# Build the React app
RUN npm run build

# Use Nginx for serving the built React app
FROM nginx:alpine

# Copy build output from the previous stage to Nginx's serving directory
COPY --from=build /app/dist /usr/share/nginx/html

# Expose port 80 to allow traffic

COPY nginx.conf /etc/nginx/nginx.conf

# Start Nginx when the container starts
CMD ["nginx", "-g", "daemon off;"]
