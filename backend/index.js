const cors = require("cors");
const express = require("express");
const app = express()
const ruta = require("./ruta")
const conexion = require("./conexionDB")
app.use (cors());
app.use(express.json());
//const login = require("./login")
app.use(ruta)
app.listen(8000,()=>{console.log("aplicacion funcional")});


async function conDB (){try {
    await conexion.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }}
  conDB()
