const mongoose = require('mongoose');
require('dotenv/config');

const database = process.env.DATABASE;

async function connect(){
 try{
  await mongoose.connect(database, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
  console.log('database conected')
}
catch(error) {
    console.error('Error al conectar a la base de datos:', error);
  };
}
connect();