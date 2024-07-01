import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from './theme';
import Home from './components/Home';
import Ventas from './components/Ventas';
import CrearVenta from './components/CrearVenta';
import Usuarios from './components/Usuarios';
import CrearUsuario from './components/CrearUsuario';
import UsuarioDetalle from './components/UsuarioDetalle';
import './index.css';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/ventas" element={<Ventas />} />
            <Route path="/crear-venta" element={<CrearVenta />} />
            <Route path="/usuarios" element={<Usuarios />} />
            <Route path="/crear-usuario" element={<CrearUsuario />} />
            <Route path="/usuario/:username" element={<UsuarioDetalle />} />
          </Routes>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
