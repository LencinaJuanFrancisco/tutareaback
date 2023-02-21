import * as dotenv from 'dotenv' 
import express from 'express';
import allRouter from './src/routers/index.js'
import { dbConect } from './src/database/config.js';

dotenv.config();

const app = express()
const PORT =  process.env.PORT || 3000
//Seter
app.use(express.json());

//Routers
allRouter(app)


/*Middlewares*/
app.listen(PORT, (err) => {
   if(err){
       console.log("🔥 Error en el inicio del servidor 🔥")
       
}else{
    dbConect().then(
        (data) => {
          console.log("😎😎😎 CONECTADOS A MONGO DB ATLAS 😎😎😎");
        },
        (err) => {
          console.log(`🔥🔥🔥 Error en la conexion con MONGODB ${err}🔥🔥🔥`);
        }
      );
    console.log(`🏁 El servidor esta corriendo exitosamente en -->  http://localhost:${PORT}/api/v1 🏁`);
}
        
        
        

});
