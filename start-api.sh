#!/bin/sh

# Define as variáveis de ambiente
export DB_HOST='192.168.99.100'
export DB_PORT=54323
export DB_USER='biotech'
export DB_PASSWORD='biotech'
export DB_DATABASE='biotech'
export DB_SCHEMA='biotech_schema'

export PORT=3000

npm run db:migrate
npm run start:watch
