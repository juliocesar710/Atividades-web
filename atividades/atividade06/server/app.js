const express = require('express');
const cors = require('cors');

const app = express(); 


app.use(cors({
  origin: '*', 
  methods: 'GET,POST,PUT,DELETE',
  allowedHeaders: 'Content-Type,Authorization',
}));

const animeController = require('./controllers/animeController');

app.use(express.json()); 
app.use('/animes', animeController);  

module.exports = app; 
