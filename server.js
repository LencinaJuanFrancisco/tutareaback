import * as dotenv from 'dotenv' 
import express from 'express';
import allRouter from './src/routers/index.js'

dotenv.config();

const app = express()
const PORT =  process.env.PORT || 3000

//Routers
allRouter(app)

/*Middlewares*/

app.listen(PORT, (err) => {
    err ?
        console.log("🔥 Error en el inicio del servidor 🔥") :
        console.log(`🏁 El servidor esta corriendo exitosamente en -->  http://localhost:${PORT}/api/v1 🏁`);

});
