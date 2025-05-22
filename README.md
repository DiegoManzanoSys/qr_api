# API de Escáner de QR

## Notas importantes

- La aplicación ahora usa SQLite como base de datos local, lo que permite que los datos persistan entre reinicios.
- La base de datos se guarda en el archivo `qr_scanner.db` en la raíz del proyecto.
- Siguiendo las instrucciones, toda petición debe tener al menos un header:
  - Accept: application/json
  - Content-type: application/json;encoding=utf-8

## Instalación

1. Clonar el repositorio o descargar el archivo ZIP
2. Instalar dependencias:

```bash
npm install
```

## Ejecución

```bash
npm start
```

El servidor corre en `http://localhost:3000`

## Endpoints

- `GET /codigos`: Obtener todos los códigos QR
- `GET /codigos/{id}`: Obtener un código QR específico
- `POST /codigos`: Crear un nuevo código QR
- `DELETE /codigos/{id}`: Eliminar un código QR

### Formato de los datos

```json
{
  "id": "a1b2c3d4e5f6",
  "data": "Datos del QR",
  "type": "qr"
}
```

