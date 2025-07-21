# Imagen base oficial de Playwright
FROM mcr.microsoft.com/playwright:v1.44.0-jammy

# Establece el directorio de trabajo
WORKDIR /app

# Copia archivos necesarios
COPY package.json package-lock.json ./

# Instala dependencias del proyecto
RUN npm ci

# Copia el resto del proyecto
COPY . .

# (Opcional) Asegúrate de que Playwright instale los navegadores
RUN npx playwright install --with-deps

# Comando por defecto al ejecutar el contenedor
CMD ["npx", "playwright", "test"]