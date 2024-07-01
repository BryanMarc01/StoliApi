import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Typography, List, ListItem, ListItemText } from '@mui/material';

function Usuarios() {
  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8080/bff/users')
      .then(response => {
        setUsuarios(response.data);
      })
      .catch(error => {
        console.error('Hubo un error al obtener los usuarios!', error);
      });
  }, []);

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Usuarios
      </Typography>
      <List>
        {usuarios.map((user, index) => (
          <ListItem key={index}>
            <ListItemText primary={user.username} />
          </ListItem>
        ))}
      </List>
    </Container>
  );
}

export default Usuarios;
