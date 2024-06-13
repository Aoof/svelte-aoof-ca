# Dockerfile for Nginx
FROM nginx:latest

# Copy SSL certificate and key
COPY /root/.acme.sh/aoof.ca_ecc/aoof.ca.cer /etc/nginx/ssl/aoof.ca.cer
COPY /root/.acme.sh/aoof.ca_ecc/aoof.ca.key /etc/nginx/ssl/aoof.ca.key

# Set permissions
RUN chmod 644 /etc/nginx/ssl/aoof.ca.cer
RUN chmod 644 /etc/nginx/ssl/aoof.ca.key

# Copy Nginx configuration file
COPY nginx.conf /etc/nginx/nginx.conf

# Expose ports
EXPOSE 80
EXPOSE 443

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
