# Documentación de la API - Búsqueda de DNI

## Descripción

Esta API permite buscar la información de una persona a partir de su número de DNI (Documento Nacional de Identidad) en Perú. Utiliza Playwright para realizar un scraping de la web [eldni.com](https://eldni.com) y obtener los datos asociados al DNI ingresado.

## Endpoints

### 1. `GET /`
Este endpoint responde con un mensaje de saludo en formato JSON.

#### Respuesta

- **Código 200 (OK)**:
    ```json
    {
      "message": "Hola mundo"
    }
    ```

### 2. `GET /api/buscar-dni/:dni`

Este endpoint permite buscar los datos de una persona a partir de su número de DNI.

#### Parámetros

- **Path Parameter**:
    - `dni` (string): El número de DNI a buscar.

#### Respuestas

- **Código 200 (OK)**:
    - Si la búsqueda es exitosa, se devuelve un objeto con los datos de la persona:
    ```json
    {
      "success": true,
      "data": {
        "numero": "75245495",
        "nombre_completo": "DIEGO ALBERTO SALAZAR GARCIA",
        "nombres": "DIEGO ALBERTO",
        "apellido_paterno": "SALAZAR",
        "apellido_materno": "GARCIA"
      }
    }
    ```

- **Código 400 (Bad Request)**:
    - Si no se proporciona un DNI o si la búsqueda falla, se devuelve un mensaje de error:
    ```json
    {
      "success": false,
      "error": "DNI es requerido"
    }
    ```

    - Si ocurre un error durante la búsqueda en el servicio:
    ```json
    {
      "success": false,
      "error": "Error al obtener datos"
    }
    ```

## Ejemplos

### Ejemplo de Solicitud

```bash
GET /api/buscar-dni/75245495
```

### Ejemplo de Respuesta Exitosa

```json
{
  "success": true,
  "data": {
    "numero": "75245495",
    "nombre_completo": "DIEGO ALBERTO SALAZAR GARCIA",
    "nombres": "DIEGO ALBERTO",
    "apellido_paterno": "SALAZAR",
    "apellido_materno": "GARCIA"
  }
}
```

### Ejemplo de Respuesta con Error

```json
{
  "success": false,
  "error": "Error al obtener datos"
}
```

## Errores Comunes

- **400 - DNI es requerido**: Si no se incluye un DNI en la ruta del endpoint.
- **400 - Error al obtener datos**: Si ocurre un problema durante el scraping o si los datos no están disponibles en el sitio web.

## Tecnologías Utilizadas

- **Node.js** con **Express**: Framework para crear la API.
- **Playwright**: Herramienta para realizar el scraping y obtener datos desde la página web.
- **CORS**: Middleware para permitir peticiones de diferentes orígenes.
  
## Cómo ejecutar la API

1. Instalar dependencias:

   ```bash
   bun install
   ```

2. Ejecutar el servidor:

   ```bash
   bun run src/index.ts
   ```

   El servidor estará corriendo en `http://localhost:3000`.

## Notas adicionales

- El endpoint de búsqueda de DNI utiliza scraping, por lo que su tiempo de respuesta puede variar dependiendo del tiempo de carga del sitio web externo.
- Asegúrate de tener acceso a internet y permisos para realizar scraping en la página utilizada.
