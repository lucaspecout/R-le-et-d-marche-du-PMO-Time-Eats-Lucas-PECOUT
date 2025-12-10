FROM nginx:1.25-alpine
WORKDIR /usr/share/nginx/html
COPY index.html .
COPY styles.css .
COPY script.js .
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
