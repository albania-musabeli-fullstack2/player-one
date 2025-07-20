# PlayerOne

E-commerce desarrollado con Angular versión 20.0.1 el cual contiene las siguientes características:

* Página principal
* Página con categorías de productos
* Detalle de un producto
* Contacto
* Carrito de compras
* Inicio de sesión de usuario
* Página para crear una cuenta


## Dependencias

* Bootstrap 5
* Angular material
* Luxon
* Sweet Alert 2
* Animate css


## Dependencias de Desarrollo

* Compodoc
* karma-chrome-launcher karma-firefox-launcher


## Iniciar proyecto en modo desarrollo

1. Instalar dependencias
```bash
npm install
```

2. Iniciar servidor
```bash
npm run start
```


## Generar archivos para documentación con compodoc

1. Crear archivos de documentación
```bash
npm run compodoc
```

2. Iniciar servidor para ver la documentación
```bash
npm run compodoc:server
```

3. Ver documentación generada usando compodoc
```url
http://localhost:8080/
```

## Pruebas Unitarias

Se realizaron pruebas unitarias (7 en total) a los siguientes componentes:

* Contacto Component
* Producto Service
* Local Storage Service
* Separador Miles Pipe


1. Ejecutar las pruebas
```bash
npm run test
```

## Nuevos requerimientos

* Cargar los productos desde un JSON alojado en Github pages llamandolo desde una petición http GET
```
https://albania-musabeli-fullstack2.github.io/player-one-api/db.json
```
* Agregar módulo de panel administrativo para CRUD de usuarios
* Agregar archivo de configuración de Docker (dockerfile, dockerignore) para crear imagen de nginx para levantar servidor web con la aplicación de Angular

## Servidor con Docker

* Crear imagen de servidor nginx
```bash
docker build -t player-one .
```

* Crear contenedor
```bash
docker run -d -p 8081:80 --name angular-prod player-one
```

* Ver sitio web dockerizado de forma local
```url
http://localhost:8081/
```
