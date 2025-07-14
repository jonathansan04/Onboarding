import connection from "../db.js";


export const getOnboarding = (req, res) => {
    
    const {estado} = req.query;
    let query = 'SELECT * FROM onboarding';
    let queryParams = [];

     if (estado) {
            query += ' WHERE state_technical = ?';  // Filtrar por estado
            queryParams.push(estado);  // Añadir el valor del estado al array de parámetros
        }
    connection.query(query, queryParams, (err, results) => {
        if (err) {
            console.error('Error en la consulta: ' + err.stack);
            return res.status(500).send('Error en la consulta');
        }
        res.json(results);  // Devuelve los resultados al frontend
    });
    
};

export const createOnboarding =(req, res) => {
    const { name, email, date, state_welcome, state_technical, date_tec } = req.body;
    const query = 'INSERT INTO onboarding (name, email, date, state_welcome, state_technical, date_tec ) VALUES (?, ?, ?, ?, ?, ?)';
   
    connection.query(query, [name, email, date, state_welcome, state_technical, date_tec ], (err, results) => {
        if (err) {
            console.error('Error al insertar datos: ' + err.stack);
            return res.status(500).send('Error al insertar datos');
        }
        res.status(201).send({ message: 'Colaborador creado', id: results.insertId });
    });
};

export const updateOnboarding =  (req, res) => {
    const { id } = req.params; 
    const { name, email, date, state_welcome, state_technical, date_tec } = req.body; // Extrae los datos del cuerpo de la solicitud

    const query = `
        UPDATE onboarding
        SET name = ?, email = ?, date = ?, state_welcome = ?, state_technical = ?, date_tec = ?
        WHERE idonboarding = ?;
    `;

    connection.query(query, [name, email, date, state_welcome, state_technical, date_tec, id], (err, results) => {
        if (err) {
            console.error('Error al actualizar el colaborador: ' + err.stack);
            return res.status(500).send('Error al actualizar el colaborador');
        }

        if (results.affectedRows > 0) {
            res.status(200).send({ message: 'Colaborador actualizado correctamente' });
        } else {
            res.status(404).send({ message: 'Colaborador no encontrado' });
        }
    });
};


export const deleteOnboarding =  (req, res) => {
    const { id } = req.params;
console.log("ID recibido en el backend:", id)
    const query = 'DELETE FROM onboarding WHERE idonboarding = ?';
    connection.query(query, [id], (err, results) => {
        if (err) {
            console.error('Error al eliminar el colaborador:', err.stack);
            return res.status(500).json({ status: false, errors: [err.message] });
        }

        if (results.affectedRows > 0) {
            return res.status(200).json({ message: 'Colaborador eliminado correctamente' });
        } else {
            return res.status(404).json({ message: 'Colaborador no encontrado' });
        }
    });
};
