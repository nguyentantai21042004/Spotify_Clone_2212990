# Sử dụng image Node.js để build ứng dụng Angular
FROM node:16 as build-stage

# Đặt thư mục làm việc trong container
WORKDIR /app

# Copy file package.json và package-lock.json
COPY package*.json ./

# Cài đặt các dependencies
RUN npm install

# Copy toàn bộ mã nguồn vào container
COPY . .

# Build ứng dụng Angular
RUN npm run build --prod

# Sử dụng Nginx để serve ứng dụng Angular
FROM nginx:alpine as production-stage
COPY --from=build-stage /app/dist/desktop-angular /usr/share/nginx/html

COPY nginx.conf /etc/nginx/conf.d/default.conf

# Mở cổng 80 để truy cập ứng dụng qua HTTP
EXPOSE 80

# Khởi động Nginx
CMD ["nginx", "-g", "daemon off;"]
