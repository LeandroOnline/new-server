require('./database.js');

const app = require ('./app.js');

app.listen(process.env.PORT,()=>console.log('app listening'))