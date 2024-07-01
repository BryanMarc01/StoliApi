import React from 'react';
import { Container, Typography, Button, Grid, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import Slideshow from './Slideshow';

function Home() {
  return (
    <Container>
      <Typography variant="h3" gutterBottom>
        Bienvenido a Ammu-Nation
      </Typography>
      <Slideshow />
      <Box mt={4}>
        <Grid container spacing={2}>
          <Grid item>
            <Button variant="contained" color="primary" component={Link} to="/ventas">
              Listar Ventas
            </Button>
          </Grid>
          <Grid item>
            <Button variant="contained" color="secondary" component={Link} to="/crear-venta">
              Crear Venta
            </Button>
          </Grid>
          <Grid item>
            <Button variant="contained" color="primary" component={Link} to="/usuarios">
              Listar Usuarios
            </Button>
          </Grid>
          <Grid item>
            <Button variant="contained" color="secondary" component={Link} to="/crear-usuario">
              Crear Usuario
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}

export default Home;
