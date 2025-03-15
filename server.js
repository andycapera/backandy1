require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(express.json());

app.use(cors()); // Habilita CORS para todos los orígenes

// Conexión a MongoDB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 30000, // Espera hasta 30s antes de fallar
})
.then(() => console.log('✅ Conectado a MongoDB Atlas'))
.catch(err => console.error('❌ Error de conexión a MongoDB:', err));

const Item = mongoose.model('Item', ItemSchema);

// Ruta de prueba
app.get('/', (req, res) => {
    res.send('Servidor funcionando');
});

// // Ruta para obtener datos desde MongoDB
// app.get('/items', async (req, res) => {
//     const items = await Item.find();
//     res.json(items);
// });

// // Ruta para agregar un nuevo item
// app.post('/items', async (req, res) => {
//     const newItem = new Item({ name: req.body.name });
//     await newItem.save();
//     res.json({ message: 'Item agregado' });
// });

app.get('/items', async (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    
    const items = await Item.find();
    res.json(items);
});

app.post('/items', async (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");

    const newItem = new Item({ name: req.body.name });
    await newItem.save();
    res.json({ message: 'Item agregado' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor corriendo en el puerto ${PORT}`));
