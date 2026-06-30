# Acortador de URLs
======================

## Descripción
----------------

Aplicación de acortador de URLs que permite a los usuarios ingresar URLs largas y obtener una versión acortada y más fácil de compartir.

## Stack Tecnológico
--------------------

*   **Backend:** Node.js con Express.js
*   **Base de datos:** MongoDB
*   **Dependencias:**
    *   `express`: ^4.17.1
    *   `mongodb`: ^3.6.4
    *   `shortid`: ^2.2.15
    *   `helmet`: ^4.6.0
    *   `cors`: ^2.8.5

## Instalación
--------------

1.  Clonar el repositorio: `git clone https://github.com/tu-usuario/acortador-de-urls.git`
2.  Instalar dependencias: `npm install`
3.  Configurar variables de entorno:
    *   `MONGO_URI`: cadena de conexión a la base de datos de MongoDB
    *   `PORT`: puerto en el que se ejecutará la aplicación (por defecto: 3000)
4.  Iniciar la aplicación: `npm start`

## Docker
---------

### Construir imagen

```bash
docker build -t acortador-de-urls .
```

### Ejecutar contenedor

```bash
docker run -p 3000:3000 acortador-de-urls
```

## Endpoints
------------

### 1. Acortar URL

*   **Método:** POST
*   **Ruta:** `/api/acortar`
*   **Cuerpo:** `{"url": "https://www.example.com"}`
*   **Respuesta:** `{"urlAcortada": "https://example.com/abc123"}`

### 2. Redirigir a URL original

*   **Método:** GET
*   **Ruta:** `/:codigo`
*   **Respuesta:** Redirección a la URL original

## Seguridad
------------

*   **Helmet:** se utiliza para proteger la aplicación contra ataques de seguridad comunes
*   **Cors:** se utiliza para permitir que la aplicación sea accesada desde diferentes orígenes
*   **Validación de entradas:** se valida la entrada de los usuarios para prevenir ataques de inyección de código
*   **Uso de HTTPS:** se recomienda utilizar HTTPS para cifrar la comunicación entre el cliente y el servidor

## Contribuir
------------

Para contribuir a este proyecto, por favor:

1.  Realiza un fork del repositorio
2.  Crea una rama para tu característica o corrección
3.  Realiza los cambios y commit
4.  Realiza un pull request para que tus cambios sean revisados y mergeados

## Licencia
------------

Este proyecto está licenciado bajo la licencia MIT.