# Usa una imagen base oficial de Node.js
FROM node:16 as build

# Establece el directorio de trabajo
WORKDIR /usr/src/app

# Copia los archivos de configuración necesarios
COPY package*.json ./

# Instala las dependencias del proyecto
RUN npm install

# Copia el resto de los archivos del proyecto, incluyendo .env
COPY . .

# Construye la aplicación
RUN npm run build

# Usa una imagen base más ligera para el entorno de producción
FROM node:16-alpine

# Establece el directorio de trabajo
WORKDIR /usr/src/app

# Copia los archivos construidos desde la fase de construcción
COPY --from=build /usr/src/app/dist ./dist

# Copia el archivo .env al contenedor
COPY .env .env

# Instala solo las dependencias de producción
COPY package*.json ./
RUN npm install --only=production

# Exponer el puerto de la aplicación
EXPOSE 3000

# Comando para ejecutar la aplicación
CMD ["node", "dist/main"]
