require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

// Conexión a MongoDB
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('Conectado a MongoDB'))
    .catch(err => console.error(err));

// Definir esquema y modelo
const ItemSchema = new mongoose.Schema({
    name: String
});
const Item = mongoose.model('Item', ItemSchema);

// Ruta de prueba
app.get('/', (req, res) => {
    res.send('Servidor funcionando');
});

// Ruta para obtener datos desde MongoDB
app.get('/items', async (req, res) => {
    const items = await Item.find();
    res.json(items);
});

// Ruta para agregar un nuevo item
app.post('/items', async (req, res) => {
    const newItem = new Item({ name: req.body.name });
    await newItem.save();
    res.json({ message: 'Item agregado' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor corriendo en el puerto ${PORT}`));
