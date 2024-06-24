#!/bin/bash

# Asegúrate de que el script se detenga si ocurre algún error
set -e

# Variables de configuración
APP_NAME="backend"
SERVER_USER="ubuntu"
SERVER_IP="3.141.189.187"
DOCKER_IMAGE="bryanmarc01/backend:latest"

echo "Iniciando despliegue de $APP_NAME a $SERVER_IP"

# Conéctate al servidor y ejecuta los comandos de despliegue
ssh -o StrictHostKeyChecking=no $SERVER_USER@$SERVER_IP << EOF
  sudo docker pull $DOCKER_IMAGE
  sudo docker stop $APP_NAME || true
  sudo docker rm $APP_NAME || true
  sudo docker run -d --name $APP_NAME -p 3000:3000 $DOCKER_IMAGE
EOF

echo "Despliegue completado exitosamente."
