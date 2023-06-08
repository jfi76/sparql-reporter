#docker build -t eugenephilipov/mig:latest .
#docker run -d -p 8081:80 eugenephilipov/mig:latest
# Stage 1: Compile and Build angular codebase

# Use official node image as the base image
FROM node:18 as build

# Set the working directory
WORKDIR /usr/local/app

# Add the source code to app
COPY ./ /usr/local/app/

# Install all the dependencies
RUN npm install

# Generate the build of the application
#RUN npm run build
RUN npx nx build fe-reporter 

# Stage 2: Serve app with nginx server

# Use official nginx image as the base image
FROM nginx:latest
COPY ./docker/nginx.conf /etc/nginx/nginx.conf
# Copy the build output to replace the default nginx contents.
COPY --from=build /usr/local/app/dist/apps/fe-reporter /usr/share/nginx/html

# Expose port 80
EXPOSE 80