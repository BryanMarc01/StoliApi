#!/bin/bash

# Asegúrate de que el script se detenga si ocurre algún error
set -e

# Variables de configuración
APP_NAME="backend"
SERVER_USER="$SERVER_USER"
SERVER_IP="$SERVER_IP"
DOCKER_IMAGE="$DOCKER_USERNAME/backend:latest"

echo "$SSH_KEY" | base64 --decode > /tmp/deploy_key
chmod 600 /tmp/deploy_key
eval "$(ssh-agent -s)"
ssh-add /tmp/deploy_key

echo "Iniciando despliegue de $APP_NAME a $SERVER_IP"

# Conéctate al servidor y ejecuta los comandos de despliegue
ssh -o StrictHostKeyChecking=no $SERVER_USER@$SERVER_IP << EOF
  sudo docker pull $DOCKER_IMAGE
  sudo docker stop $APP_NAME || true
  sudo docker rm $APP_NAME || true
  sudo docker run -d --name $APP_NAME -p 3000:3000 $DOCKER_IMAGE
EOF

echo "Despliegue completado exitosamente."
#