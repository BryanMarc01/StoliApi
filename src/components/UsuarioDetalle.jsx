import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Container, Typography } from '@mui/material';

function UsuarioDetalle() {
  const { username } = useParams();
  const [user, setUser] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:8080/bff/users/${username}`)
      .then(response => {
        setUser(response.data);
      })
      .catch(error => {
        console.error('Hubo un error al obtener el usuario!', error);
      });
  }, [username]);

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Detalle del Usuario
      </Typography>
      {user ? (
        <div>
          <Typography variant="h6">Username: {user.username}</Typography>
          <Typography variant="h6">User ID: {user.userId}</Typography>
        </div>
      ) : (
        <Typography variant="h6">Cargando...</Typography>
      )}
    </Container>
  );
}

export default UsuarioDetalle;
