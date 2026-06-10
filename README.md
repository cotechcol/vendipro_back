# POS System - Backend

API REST para sistema de punto de venta con NestJS, TypeORM y MySQL.

## Requisitos

- Node.js 18+
- MySQL 8+ instalado localmente

## Configuración de MySQL

1. Instala MySQL en tu sistema si aún no lo tienes.
2. Crea la base de datos:

```sql
CREATE DATABASE pos_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

3. Copia el archivo de entorno:

```bash
cp .env.example .env
```

4. Edita `.env` con tus credenciales de MySQL:

```
DB_HOST=localhost
DB_PORT=3306
DB_USERNAME=root
DB_PASSWORD=tu_password
DB_DATABASE=pos_db
```

## Instalación

```bash
npm install
npm run start:dev
```

El servidor inicia en `http://localhost:3000`.

## Usuario por defecto

- **Email:** admin@pos.local
- **Contraseña:** admin123

## Endpoints principales

| Módulo | Endpoints |
|--------|-----------|
| Auth | `POST /auth/login`, `GET /auth/me` |
| Usuarios | `GET/POST/PATCH/DELETE /users` |
| Categorías | CRUD `/categories` |
| Productos | CRUD `/products`, `GET /products/pos`, `GET /products/low-stock` |
| Clientes | CRUD `/customers` |
| Proveedores | CRUD `/suppliers` |
| Inventario | `POST /inventory/adjust`, `GET /inventory/movements` |
| Compras | `POST/GET /purchases` |
| Ventas | `POST/GET /sales`, `GET /sales/:id/ticket` |
| Caja | `POST /cash-sessions/open`, `POST /cash-sessions/:id/close`, `GET /cash-sessions/current` |
| Reportes | `GET /reports/dashboard`, `/sales`, `/inventory`, `/profitability` |
| Config | `GET/PATCH /settings` |
# vendipro_back
# vendipro_back
