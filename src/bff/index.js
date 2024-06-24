const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();
const port = 8080;

// Middleware
app.use(bodyParser.json());

// MongoDB connection
mongoose.connect('mongodb://1190040:1190040@mongodb:27017/', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Definir los esquemas y modelos de MongoDB
const productoSchema = new mongoose.Schema({
  name: String,
  price: Number,
  description: String,
});

const ventaSchema = new mongoose.Schema({
  name: String,
  price: Number,
  description: String,
});

const Producto = mongoose.model('Producto', productoSchema);
const Venta = mongoose.model('Venta', ventaSchema);

// Rutas para productos
app.get('/bff/productos/:id', async (req, res) => {
  try {
    const producto = await Producto.findById(req.params.id);
    if (producto) {
      res.json(producto);
    } else {
      res.status(404).send('Producto no encontrado');
    }
  } catch (error) {
    res.status(500).send('Hubo un error al obtener el producto');
  }
});

// Rutas para ventas
app.post('/bff/ventas', async (req, res) => {
  const { name, price, description } = req.body;
  try {
    const newVenta = new Venta({ name, price, description });
    await newVenta.save();
    res.status(201).send('Venta creada');
  } catch (error) {
    res.status(500).send('Hubo un error al crear la venta');
  }
});

app.listen(port, () => {
  console.log(`BFF service listening at http://localhost:${port}`);
});

//  