#!/bin/sh

# Define as variáveis de ambiente
# export DB_HOST='192.168.99.100'
export DB_HOST='localhost'
export DB_PORT=54323
export DB_USER='biotech'
export DB_PASSWORD='biotech'
export DB_DATABASE='biotech'
export DB_SCHEMA='biotech_schema'

export PORT=3000
# export DEBUG='loopback:connector:postgresql'
# export DEBUG='loopback:authorization:*'
export DEBUG='loopback:authentication:*'
npm run db:migrate
npm run start:watch
