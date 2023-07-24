#!/bin/sh

# Update packages and install certbot and cron
apk update && apk add certbot dcron

# Obtain a certificate for <your_domain>
certbot certonly --standalone -d <your_domain> --non-interactive --agree-tos --email <your_email>


# Set up the cron job to automatically renew the certificates
(crontab -l 2>/dev/null; echo "0 12 * * * /usr/bin/certbot renew --quiet") | crontab -

# Start the Nginx service
nginx -g "daemon off;"