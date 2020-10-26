#!/bin/sh

# Define as variáveis de ambiente
export DB_HOST='192.168.99.100'
# export DB_HOST='localhost'
export DB_PORT=54323
export DB_USER='biotech'
export DB_PASSWORD='biotech'
export DB_DATABASE='biotech'
export DB_SCHEMA='biotech_schema'
export DB_SSL='false'

export PORT=3000


lb4 discover --schema=biotech_schema

