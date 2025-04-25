# Use lightweight Nginx image
FROM nginx:alpine

# Remove default static site
RUN rm -rf /usr/share/nginx/html/*

# Copy your HTML/CSS/JS into the web root
COPY . /usr/share/nginx/html

EXPOSE 80
