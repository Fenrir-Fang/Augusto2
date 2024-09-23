const mysql = require('mysql2');

// Configuración de la conexión
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root', 
  password: '', 
  database: 'fifa' 
});


connection.connect((err) => {
  if (err) {
    return console.error('Error al conectar a la base de datos:', err.message);
  }
  console.log('Conectado a la base de datos.');
});


const query = 'SELECT * FROM players';

connection.query(query, (err, results) => {
  if (err) {
    return console.error('Error al ejecutar la consulta:', err.message);
  }

  console.log('Registros de la tabla "players":');
  console.log(results);
});


connection.end((err) => {
  if (err) {
    return console.error('Error al cerrar la conexión:', err.message);
  }
  console.log('Conexión cerrada.');
});