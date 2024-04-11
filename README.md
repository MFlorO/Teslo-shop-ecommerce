# Descripción

## Correr en dev

1. Clonar el repositorio 
2. Crear una copia del archivo ``` .env.template ``` y copiarlo creando el ```.env``` y cambiar las variables de entorno
3. Instalar las dependencias con ``` npm install ```
4. Levantar la base de datos ``` docker compose up -d ``` Este comando permite levantar docker de manera detach. Osea pueda cerrar la terminal y mi contenedor siga corriendo. 
5. Correr las migraciones de Prisma ``` npx prisma migrate dev ```
6. Ejecutar seed ``` npm run seed ``` (cargar el seed a la base de datos)
7. Correr el proyecto con ``` npm run dev ```

