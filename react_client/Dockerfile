# Stage 1: Build the React application
FROM node:17-alpine as build

# set working directory
WORKDIR /app

# copy package.json and package-lock.json
COPY package*.json ./

# install only production dependencies
RUN npm install --only=production

# copy the rest of the application code
COPY . .

# install bootstrap types
RUN npm install --save-dev @types/bootstrap

# build the production version of the React app
RUN npm run build

# Stage 2: Serve the React application from Nginx
FROM nginx:stable-alpine

# Install necessary packages for the script
RUN apk add --no-cache certbot python3 py3-pip
RUN apk add --no-cache certbot-nginx

# Copy the react build from Stage 1
COPY --from=build /app/build /usr/share/nginx/html

# Copy the nginx configuration file
# Note: You need to have this file available in your app root directory
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy and make the sslSetUp.sh script executable. UNCOMMENT FOR SSL
# COPY sslSetUp.sh /sslSetUp.sh
# RUN chmod +x /sslSetUp.sh

# Expose the ports on which the app will run
# EXPOSE 80
# EXPOSE 443

# Run the sslSetUp.sh script to handle certificates and start Nginx
# UNCOMMENT FOR SSL
# CMD ["/bin/sh", "/sslSetUp.sh"]

# COMMENT FOR SSL
CMD ["nginx", "-g", "daemon off;"] 