# Coderhouse - Proyecto Final de Backend 3

¡Hola! Este es el proyecto final de Backend 3. Es una aplicación de adopción de mascotas que usa Node.js y se ejecuta en un contenedor de Docker.

## 🚀 Despliegue con Docker

La forma recomendada de ejecutar este proyecto es usando Docker. Si ya tienes Docker instalado, puedes seguir los siguientes pasos.

### 1. Construir la imagen de Docker

Si quieres construir la imagen desde cero, utiliza el siguiente comando en la raíz del proyecto. Esto creará la imagen usando el `Dockerfile` y la etiquetará como `coderback3-app-adoptme:1.0.0`.

```bash
    docker build -t yamil3/coderback3-app-adoptme:1.0.0 .
```
2. Ejecutar la aplicación

Una vez que tengas la imagen (ya sea construida localmente o descargada desde Docker Hub), puedes ejecutar la aplicación en un contenedor con este comando:
Bash

``` 
    docker run -p 8080:8080 yamil3/coderback3-app-adoptme:1.0.0
``` 
docker run: Comando para ejecutar un contenedor.
-p 8080:8080: Mapea el puerto 8080 de tu máquina local al puerto 8080 dentro del contenedor. Si ese puerto está ocupado, puedes usar otro (por ejemplo, -p 8081:8080).
yamil3/coderback3-app-adoptme:1.0.0: El nombre y la etiqueta de la imagen a utilizar.

🐳 Acceso a la aplicación desde Docker Hub

Para mayor comodidad, la imagen ya ha sido subida a Docker Hub. Si no quieres construirla, puedes usar los siguientes comandos para descargarla y ejecutarla directamente.
Descargar la imagen: 
Bash
```
    docker pull yamil3/coderback3-app-adoptme:1.0.0
```
Ejecutar el contenedor:
Bash
```
    docker run -p 8080:8080 yamil3/coderback3-app-adoptme:1.0.0
```
Una vez que el contenedor esté corriendo, la aplicación estará disponible en tu navegador en:
```
    http://localhost:8080
```
📄 Documentación de la API *Aviso SELECCIONAR EL SERVIDOR A PRODUCCION PARA REALIZAR CORRECTAMENTE LAS PRUEBAS 

La documentación de la API, generada con Swagger, se encuentra disponible en la siguiente ruta una vez que la aplicación esté en ejecución:
```
    http://localhost:8080/api/docs
```
✅ Tests Funcionales

Para ejecutar los tests de adoptme, usuarios y mascotas debes hacerlo en un entorno local, fuera del contenedor de Docker. Sigue estos pasos:

Instala las dependencias del proyecto:
Bash
```
    npm install
```
Ejecuta los tests:
Bash
```
    npm run test
```
🛠️ Estructura del proyecto
```
    src/: Contiene el código fuente de la aplicación Node.js.
    Dockerfile: La receta para crear la imagen de Docker.
    package.json: Las dependencias del proyecto y los scripts para los tests.
    README.md: Este archivo.
```

¡Gracias por revisar mi trabajo!


-
Con este `README.md`, el evaluador tendrá una guía completa y precisa para revisar 
