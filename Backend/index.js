import express from "express";
import connection from "./db.js";
import morgan from "morgan";
import cors from 'cors'
import router from "./routes/routes.js";


const app = express();
const port = 3000;

app.use(express.json());
app.use(cors({ origin: 'http://localhost:5173',   credentials: true}));
app.use(morgan('dev'));

//connectDB();

app.use('/onboarding', router )

connection.connect((err) => {
    if (err) {
        console.error("Error de conexión: " + err);
        return;
    }
    console.log("Conectado a la BD: " + connection.threadId);
});

app.listen(port,()=>{
    console.log(`Servidor escuchado en http://localhost:${port} `)
})

