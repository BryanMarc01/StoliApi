import React, { useState } from 'react';
import axios from 'axios';
import { Container, Typography, TextField, Button, Box } from '@mui/material';

function CrearUsuario() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    const user = { username, password };

    axios.post('http://localhost:8080/bff/users', user)
      .then(response => {
        alert('Usuario creado!');
      })
      .catch(error => {
        console.error('Hubo un error al crear el usuario!', error);
      });
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Crear Usuario
      </Typography>
      <Box component="form" onSubmit={handleSubmit}>
        <TextField
          label="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          fullWidth
          margin="normal"
        />
        <Button variant="contained" color="primary" type="submit">
          Crear
        </Button>
      </Box>
    </Container>
  );
}

export default CrearUsuario;
