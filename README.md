# API de Escáner de QR

## Instalación

1. Clonar el repo o bajar el zip (no se cómo lo voy a mandar)
2. Instalar dependencias:

```bash
npm install
```

## Correrlo

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