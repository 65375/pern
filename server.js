const express = require('express');
const app = express();

const PORT = 3001;

app.get('/home', (req, res) => {
    res.status(403).send('Acesso proibido');
});

app.get('/usuariosjson', (req, res) => {
    res.status(200).json({message: 'Aqui vai listar todos os usuarios'});
});

app.listen(PORT, () => {
    console.log("Server UP");
});
