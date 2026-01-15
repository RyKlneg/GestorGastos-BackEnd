# Backend - Sistema de Gestión de Gastos

API REST desarrollada con NestJS para gestionar gastos.

## Instalación

```bash
npm install
```

## Configuración

Crear archivo `.env` basado en `.env.example`:

```env
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=123456
DB_DATABASE=expenses_db
PORT=3000
NODE_ENV=development
CORS_ORIGIN=http://localhost:3001
```

## Ejecución

```bash
# Desarrollo
npm run start:dev

# Producción
npm run build
npm run start:prod
```

## Seeds

Para ejecutar los seeds:

```bash
npm run seed:run
```

Esto creará 12 gastos de ejemplo en la base de datos.

## Endpoints

- `GET /api/expenses` - Listar gastos (con paginación y filtros)
- `GET /api/expenses/:id` - Obtener un gasto por ID
- `POST /api/expenses` - Crear un nuevo gasto
- `PATCH /api/expenses/:id` - Actualizar un gasto
- `DELETE /api/expenses/:id` - Eliminar un gasto
- `GET /api/expenses/search?query=` - Buscar gastos por descripción

