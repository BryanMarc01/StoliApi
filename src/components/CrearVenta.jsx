import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Typography, TextField, Button, Box } from '@mui/material';

function CrearVenta() {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    axios.get('http://localhost:8080/bff/productos/1')
      .then(response => {
        const { name, price, description } = response.data;
        setName(name);
        setPrice(price);
        setDescription(description);
      })
      .catch(error => {
        console.error('Hubo un error al obtener el producto!', error);
      });
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    const venta = { name, price, description };

    axios.post('http://localhost:8080/bff/ventas', venta)
      .then(response => {
        alert('Venta creada!');
      })
      .catch(error => {
        console.error('Hubo un error al crear la venta!', error);
      });
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Crear Venta
      </Typography>
      <Box component="form" onSubmit={handleSubmit}>
        <TextField
          label="Nombre de Producto"
          value={name}
          onChange={(e) => setName(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Precio"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Descripción"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
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

export default CrearVenta;
