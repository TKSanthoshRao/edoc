# Step 1: Use an official Nginx image as a base image
FROM nginx:alpine

# Step 2: Copy your app files into the container (assumes your files are in the current directory)
COPY . /usr/share/nginx/html

# Step 3: Expose the default port (80) to access the app
EXPOSE 80