import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Typography, List, ListItem, ListItemText } from '@mui/material';

function Ventas() {
  const [ventas, setVentas] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8080/bff/ventas?1')
      .then(response => {
        setVentas(response.data);
      })
      .catch(error => {
        console.error('Hubo un error al obtener las ventas!', error);
      });
  }, []);

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Ventas
      </Typography>
      <List>
        {ventas.map((venta, index) => (
          <ListItem key={index}>
            <ListItemText
              primary={`Nombre: ${venta.name}`}
              secondary={`Precio: ${venta.price}, Descripción: ${venta.description}`}
            />
          </ListItem>
        ))}
      </List>
    </Container>
  );
}

export default Ventas;
