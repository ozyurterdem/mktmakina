FROM node:22-alpine AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
# İki sürüm tek imajda: endüstri kökte (varsayılan), savunma ayrı klasörde ve
# yalnız anahtarla açılan iç yolda (nginx.conf + docker/40-surum-anahtari.sh).
RUN npm run build && mv dist /out-endustri \
 && SITE_VARIANT=savunma npm run build && mv dist /out-savunma

FROM nginx:alpine
COPY --from=build /out-endustri /usr/share/nginx/html
COPY --from=build /out-savunma /usr/share/nginx/savunma
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY docker/40-surum-anahtari.sh /docker-entrypoint.d/40-surum-anahtari.sh
RUN chmod 755 /docker-entrypoint.d/40-surum-anahtari.sh
EXPOSE 80
