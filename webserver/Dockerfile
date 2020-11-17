FROM nginx:1.19-alpine

# Remove any existing config files
RUN rm /etc/nginx/conf.d/*

COPY default.conf /etc/nginx/conf.d/

EXPOSE 8042

CMD ["nginx", "-g", "daemon off;" ]
