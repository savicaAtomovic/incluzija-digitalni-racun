# Use official node image as the base image
FROM node:14.17.0 as builder

# Set the working directory
RUN mkdir /ng-app
WORKDIR /ng-app

# Add the source code to app
RUN pwd
COPY . .

# Install all the dependencies
RUN npm install

# Generate the build of the application
RUN npm run build

RUN ls -la /ng-app/dist


# Stage 2: Serve app with nginx server

# Use official nginx image as the base image
FROM nginx:latest

RUN rm -rf /usr/share/nginx/html/*

# Copy the build output to replace the default nginx contents.
COPY --from=builder /ng-app/dist/aac-za-djecu-web /usr/share/nginx/html

# Expose port 80
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]

