import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";

const Register = () => {

    const {register, handleSubmit, setValue, reset} = useForm();
    const [valores, setValores] = useState([]);
    const [editaColaborador, seteditaColaborador ] = useState(null);
    const [estado, setEstado] = useState('');


     useEffect(() => {
        getColaborador();
    }, [estado]);

    // Mostrar colaboradores
    const getColaborador = async ()=>{
         try {
            const response = await axios.get('http://localhost:3000/onboarding',{
                params: { estado}, 
            
            });
            //Ajuste de fecha
            const datos = response.data.map( colaborador =>{
                const fecha = new Date(colaborador.date);
                const fechat = new Date(colaborador.date_tec);

            fecha.setHours(fecha.getHours() +2);
            fechat.setHours(fechat.getHours() + 2);

            const fechaFormateada = fecha.toLocaleDateString('es-CO', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit'
            });

            const fechaTecFormateada = fechat.toLocaleDateString('es-CO', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit'
            });
            return {
                ...colaborador,
                date: fechaFormateada,
                date_tec: fechaTecFormateada
               
            };
            })
            //Envio de datos
            console.log("data", response.data);
            setValores(datos);

             } catch (error) {
            console.error('Error fetching valores:', error);
            setValores([]); 
        }
    }
    //Eliminar colaborador
    const deleteColaborador = async (id) => {
    console.log("ID a eliminar:", id);  
    //Verificar el id
    if (id === undefined) {
        console.error("El ID no está definido.");
        return;
    }

    try {
        const response = await axios.delete(`http://localhost:3000/onboarding/${id}`);
        console.log('Colaborador eliminado:', response.data);
        // Actualiza la lista de colaboradores después de eliminar
        getColaborador(); 
    } catch (error) {
        console.error('Error al eliminar el colaborador:', error.response ? error.response.data : error.message);
    }
};

    //Datos para editar el colaborador
    const editarColaborador = (colaborador) =>{
        setValue('name', colaborador.name);
        setValue('email', colaborador.email);
        setValue('date', colaborador.date);
        setValue('state_welcome', colaborador.state_welcome);
        setValue('state_technical', colaborador.state_technical);
        setValue('date_tec', colaborador.date_tec);
        seteditaColaborador(colaborador)
    }

    
    //Acción para registrar o actualizar los datos
    const onSubmit = async (data) => {
    const datos = {
        name: data.name,
        email: data.email,
        date: data.date,
        state_welcome: data.state_welcome,
        state_technical: data.state_technical,
        date_tec: data.date_tec,
    };

    console.log('Datos enviados:', datos); // Verifica los datos que se están enviando
    // Se verifica si es registrar o editar
    try {
        if (editaColaborador) {
            // Si estamos editando, hacemos una PUT
            const response = await axios.put(`http://localhost:3000/onboarding/${editaColaborador.idonboarding}`, datos, {
                headers: {
                    'Content-Type': 'application/json', // Usar JSON como tipo de contenido
                },
            });
            console.log('Editado:', response.data);
        } else {
            const response = await axios.post('http://localhost:3000/onboarding/', datos, {
                // Usar JSON como tipo de contenido
                headers: {
                    'Content-Type': 'application/json', 
                },
            });
            console.log('Colaborador creado:', response.data);
        }
         // Actualiza la lista después de registrar
        getColaborador();
        seteditaColaborador(null);
        reset();
    } catch (error) {
        console.error('Error al enviar datos:', error);
    }
};

    //Filtro de busqueda
    const consultarfiltro =() =>{
       
        getColaborador();
    }

return (
    <>  
    <form onSubmit={handleSubmit(onSubmit)} className="container mt-5 p-4 shadow-sm bg-light rounded">
    <h2 className="mb-4 text-center">{editaColaborador ? 'Actualizar Colaborador' : 'Registrar Colaborador'}</h2>

    <div className="mb-3">
    <label htmlFor="name" className="form-label">Nombre completo</label>
    <input 
      type="text" 
      className="form-control" 
      id="name" 
      placeholder="Nombre completo"
      {...register('name', { required: true })}
    />
    </div>

    <div className="mb-3">
    <label htmlFor="email" className="form-label">Correo electrónico</label>
    <input 
      type="email" 
      className="form-control" 
      id="email" 
      placeholder="Correo electrónico"
      {...register('email', { required: true })}
    />
    </div>

    <div className="mb-3">
    <label htmlFor="date" className="form-label">Fecha de ingreso</label>
    <input 
      type="date" 
      className="form-control" 
      id="date" 
      {...register('date', { required: true })}
    />
    </div>

    <div className="mb-3">
    <label htmlFor="state_welcome" className="form-label">Estado de bienvenida</label>
    <select 
      className="form-select" 
      id="state_welcome" 
      {...register('state_welcome', { required: true })}
        >
      <option value="Completo">Completo</option>
      <option value="Incompleto">Incompleto</option>
    </select>
    </div>

    <div className="mb-3">
    <label htmlFor="state_technical" className="form-label">Estado técnico</label>
    <select 
      className="form-select" 
      id="state_technical" 
      {...register('state_technical', { required: true })}
    >
      <option value="Completo">Completo</option>
      <option value="Incompleto">Incompleto</option>
    </select>
    </div>

    <div className="mb-3">
    <label htmlFor="date_tec" className="form-label">Fecha de onboarding</label>
    <input 
      type="date" 
      className="form-control" 
      id="date_tec" 
      {...register('date_tec', { required: true })}
    />
    </div>

    <div className="d-flex justify-content-center">
    <button 
      className="btn btn-success w-50" 
      type="submit"
    >
      {editaColaborador ? 'Actualizar' : 'Registrar'}
    </button>
  </div>
</form>


    <div className="container mt-5">
            <div className="card">
            <div className="card-header ">
                <h5>¿Deseas filtrar los colaboradores por el estado técnico?</h5>
                <select className="form-control" aria-label="Username" aria-describedby="basic-addon1" type="text"  placeholder="Estado"  onChange={(e) => setEstado(e.target.value)}>
                  <option value="">Todos</option>
                  <option value="Completo">Completo</option>
                  <option value="Incompleto">Incompleto</option>
                </select>
                <button className="btn btn-dark"  onClick={consultarfiltro}> Consultar</button>
                </div> 
            </div>
            </div>
    
   <div className="container mt-5">
  <h2 className="mb-4">Lista de Colaboradores</h2>
  <table className="table table-striped table-bordered">
    <thead>
      <tr>
        <th scope="col">#</th>
        <th scope="col">Nombre</th>
        <th scope="col">Email</th>
        <th scope="col">Fecha de Ingreso</th>
        <th scope="col">Estado de Bienvenida</th>
        <th scope="col">Estado Técnico</th>
        <th scope="col">Fecha de Onboarding</th>
        <th scope="col">Acciones</th>
      </tr>
    </thead>
    <tbody>
      {Array.isArray(valores) && valores.map((val, key) => (
        <tr key={val.idonboarding}>
          <td>{key + 1}</td>
          <td>{val.name}</td>
          <td>{val.email}</td>
          <td>{val.date}</td>
          <td>{val.state_welcome}</td>
          <td>{val.state_technical}</td>
          <td>{val.date_tec}</td>
          <td>
            <button 
              className="btn btn-warning btn-sm" 
              onClick={() => editarColaborador(val)}>
              Editar
            </button>
            <button 
              className="btn btn-danger btn-sm ml-2" 
              onClick={() => {
                if (val.idonboarding) {
                  console.log("ID a eliminar:", val.idonboarding);
                  deleteColaborador(val.idonboarding);
                } else {
                  console.error("ID no válido:", val.idonboarding); 
                }
              }}>
              Eliminar
            </button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
</div>

     
    </>  
  )
}

export default Register