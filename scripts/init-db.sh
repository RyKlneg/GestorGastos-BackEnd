#!/bin/bash

# Script para inicializar la base de datos
# Uso: ./scripts/init-db.sh

echo "🚀 Inicializando base de datos..."

# Crear base de datos si no existe
echo "📦 Creando base de datos si no existe..."
psql -U postgres -c "CREATE DATABASE expenses_db;" 2>/dev/null || echo "Base de datos ya existe o error al crearla"

# Ejecutar seeds
echo "🌱 Ejecutando seeds..."
npm run seed:run

echo "✅ Base de datos inicializada correctamente!"
