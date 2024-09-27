const express = require("express");
const app = express()
const sequelize = require("./conexionDB");
const Players = require("./modelo");
const XLSX = require("xlsx");
const stream = require("stream");
const login = require("./login");
const { log } = require("console");
const {Op} = require("sequelize");

app.get("/", async (req, res) => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
  const { QueryTypes } = require('sequelize');
  const players = await Players.findAll({ limit: 3, offset: 2 });

  let respuesta = players;

  res.send(respuesta);
})
//PAGINAR JUGADORES Y FILTRAR
app.get("/jugadores", async (req, res) => {
  let para = req.query
  const PAGE = req.query.page || 1;
  const PERPAGE = 10;
  console.log('pagina', PAGE);

  const OFFSET = (PAGE - 1) * PERPAGE;
  const LIMIT = PERPAGE;
  //FILTROS PARA AGREGAR EN EL BUSCADOR
  const FILTROS = ['long_name', 'nationality_name', 'fifa_version', 'club_name'];
  let filtrosPedidos = req.query.filtros || {};

  let filtrosAplicados = {};

  console.log(filtrosPedidos);

  FILTROS.forEach(filtro => {
    if (filtrosPedidos[filtro]) {
      filtrosAplicados[filtro] = {[Op.like]:'%'+filtrosPedidos[filtro]+'%'};
    }
  });
  //ATRIBUTOS QUE SE LE PONEN
  //console.log(filtrosAplicados);

  let players = await Players.findAll({
    offset: OFFSET,
    limit: LIMIT,
    attributes: ['id','fifa_version', 'long_name', 'player_face_url', 'age', 'player_positions', 'club_name', 'nationality_name', 'height_cm', 'weight_kg', 'body_type', 'preferred_foot', 'work_rate'],
    where: filtrosAplicados
  });
  res.send(players)
})

//EXPORTAR DATOS
app.get('/imprimir', async (req,res) =>{
  const PAGE = req.query.page || 1;
  const PERPAGE = 10;
  console.log('pagina', PAGE);
  const OFFSET = (PAGE - 1) * PERPAGE;
  const LIMIT = PERPAGE;

  const FILTROS = ['long_name', 'nationality_name', 'fifa_version', 'club_name'];
  let filtrosPedidos = req.query.filtros || {};

  let filtrosAplicados = {};

  console.log(filtrosPedidos);

  FILTROS.forEach(filtro => {
    if (filtrosPedidos[filtro]) {
      filtrosAplicados[filtro] = {[Op.like]:'%'+filtrosPedidos[filtro]+'%'};
    }
  });
  //ATRIBUTOS QUE SE LE PONEN
  //console.log(filtrosAplicados);

  let players = await Players.findAll({
    offset: OFFSET,
    limit: LIMIT,
    attributes: ['fifa_version', 'long_name', 'player_face_url', 'age', 'player_positions', 'club_name', 'nationality_name', 'height_cm', 'weight_kg', 'body_type', 'preferred_foot', 'work_rate'],
    where: filtrosAplicados,
    raw:true
  });



  const worksheet = XLSX.utils.json_to_sheet(players);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "fifa");



//SI SE EXPORTA COM XLSX O CSV
  let excel = XLSX.write(workbook, {bookType:"csv", type:"base64"});
  let readStream = new stream.PassThrough();
  let fileContents = Buffer.from(excel, "base64");
  readStream.end(fileContents);

  res.setHeader('Content-disposition', 'attachment; filename=players.csv');
  res.setHeader('Content-Type', 'application/vnd.ms-excel');

  readStream.pipe(res);
})


//ESTADISTICAS DE JUGADORES
app.get("/estadisticas/:id", async (req, res) => {
  const id = req.params.id;
  let players = await Players.findByPk(id)
  res.send(players)

})


//LOGIN
app.get("/login", async (req, res) => {

  const { username, password } = req.body;

  // Validar credenciales
  //const user = users.find(u => u.username === username && u.password === password);
  const user = login.find(u => u.username === username && u.password === password);

  if (user) {
    res.status(200).json({ message: 'Inicio de sesión exitoso!' });
  } else {
    res.status(401).json({ message: 'Nombre de usuario o contraseña incorrectos.' });
  }
});


//EDITAR DATOS
app.post("/estadisticas/:id?", async (req, res) => {

  if (!req.body) {
    res.status(400).send('body vacio');
    return;
  }

  const ATRIBUTOS = Object.keys(Players.getAttributes());
  let players = await Players.findByPk(req.params.id);

  const keysInvalidosBody = Object.keys(req.body).filter(key => !ATRIBUTOS.includes(key));
  if (keysInvalidosBody.length > 0) {
    res.status(400).send('invalid keys: ' + keysInvalidosBody.join(', '));
    return;
  }

  if (players) {
    //console.log(players);
    players.set(req.body);
  } else {
    players = await Players.create(req.body);


    players = Players.build();
    players.long_name = req.body.long_name;
    players.shooting = req.body.shooting;
    players.passing = req.body.passing;
    players.dribbling = req.body.dribbling;
    players.defending = req.body.defending;
    players.phsyc = req.body.phsyc;
    players.pace = req.body.pace;
  }
  //console.log(req.body);
  await players.save();
  res.json(req.body);

})

app.post("/newPlayer", async(req,res) => {
  if (!req.body) {
    res.status(400).send('body vacio');
    return;
  }
  const ATRIBUTOS = Object.keys(Players.getAttributes());
  let players = await Players.findByPk(req.params.id);

  const keysInvalidosBody = Object.keys(req.body).filter(key => !ATRIBUTOS.includes(key));
  if (keysInvalidosBody.length > 0) {
    res.status(400).send('invalid keys: ' + keysInvalidosBody.join(', '));
    return;
  }

  if (players) {
    //console.log(players);
    players.set(req.body);
  } else {
    players = await Players.create(req.body);
  }
  
  //console.log(req.body);
  await players.save();
  res.json(req.body);
  

})


module.exports = app
