# Imagen base de Node.js
FROM node:18
# Crear directorio de trabajo dentro del contenedor
WORKDIR /app

# Copiar package.json y package-lock.json
COPY package*.json ./

# Instalar dependencias
RUN npm install

# Copiar el resto del código
COPY ./src ./src

# Exponer el puerto (ajústalo al que uses en Express)
EXPOSE 3000

# Comando por defecto al iniciar el contenedor
CMD ["npm", "start"]
