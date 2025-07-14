
import mysql from 'mysql2';


const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '2008',
    database: 'onboarding',
});

connection.connect((err) => {
    if (err) {
        console.error("Error de conexión: " + err);
        return;
    }
    console.log("Conectado a la BD: " + connection.threadId);
});


export default connection;  
