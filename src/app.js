import express from 'express';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';

import {Command,Option} from 'commander'

import usersRouter from './routes/users.router.js';
import petsRouter from './routes/pets.router.js';
import adoptionsRouter from './routes/adoption.router.js';
//import sessionsRouter from './routes/sessions.router.js';
import mocksRouter from './routes/mocks.router.js'

import { config } from './configuracion/config.js';
import authRouter from './routes/auth.router.js';

import swaggerUri from "swagger-ui-express"
import swaggerJsDoc from "swagger-jsdoc"
import cors from 'cors'


const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API Adoptme",
      version: "1.0.0",
      description: "API-REST Adoptme",
    },
    servers: [
      {
        url: "http://localhost:3000",
        description: "Desarrollo",
      },
      {
        url: "http://localhost:8080",
        description: "Producción",
      },
    ],
  },
  apis: ["./src/docs/*.yaml"],

  //* Indicamos que vamos a implementar swagger en línea
  // apis: ["./src/**/*.js"], // o apis: ['./src/*.js'],  apis: ['./src/routes/**/*.js']
};



//implementacion swagger con el manifiesto .yaml
const swaggerDocs = swaggerJsDoc(swaggerOptions)

//definicion del modo
//const program = new Command()

// program.addOption(
//     new Option("-m, --mode <MODE>', 'Modo de ejecucion del server")
//     .choices(["prod", "dev"])
//     .default("dev")
// )

// program.allowUnknownOption()
// program.allowExcessArguments()

// program.parse()
// console.log(program.opts())

// const {mode} = program.opts()

// process.loadEnvFile(mode === "prod" ? "./.env.production" : "./.env.development")



//

const app = express();
const PORT = process.env.PORT||8080;
//const connection = mongoose.connect(`mongodb://localhost:27017/db_example?directConnection=true`)
const conectar=async()=>{
        try {
            await mongoose.connect(config.MONGO_URL, {dbName:config.DB_NAME})
            console.log(`Conexión a DB establecida`)
        } catch (err) {
            console.log(`Error al conectarse con el servidor de BD: ${err}`)
        }
    }
//app.use(cookieParser("mi_super_secreto")); 

app.use(cors());
app.use(express.json());
app.use(cookieParser("Coder2025JSIII"));

//swagger conection con interfaz de documentacion
app.use("/api/docs",swaggerUri.serve,swaggerUri.setup(swaggerDocs))

app.use('/api/mocks',mocksRouter)
app.use('/api/users',usersRouter);
app.use('/api/pets',petsRouter);
app.use('/api/adoptions',adoptionsRouter);
app.use('/api/session',authRouter)
//PRE ENTREGA
//app.use('/api/sessions',sessionsRouter);

app.get('/', (req, res) => {
    const style = `
        <style>
            body { font-family: Arial, sans-serif; }
            h1 { color: #333; }
            p { color: #555; }
        </style>
    `;
    const content = `
        <h1>Welcome to the AdoptMe API</h1>
        <p>Use the endpoints to manage users, pets, adoptions, and sessions.</p>
    `;
    res.send(`${style}${content}`);
});
conectar()
app.listen(PORT,()=>{
    console.log(`Server is running on port http://localhost:${PORT}`);
});


export default app;

