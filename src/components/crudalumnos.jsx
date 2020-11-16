import React, {useState, useEffect, useContext} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Modal, ModalBody, ModalFooter, ModalHeader} from 'reactstrap';
import axios from 'axios';
import { toast } from "react-toastify";

import { UserContext } from "../providers/UserProvider";
import { auth } from "../firebase";
import { Router, Link } from "@reach/router";

const Crudalumnos = () => {

  const user = useContext(UserContext);

  const { photoURL, displayName, email } = user;
  console.log(" Usuario ProfilePage : " + displayName + " - " + email);

  const signOut = () => {
    auth.signOut();  
  };

  const baseUrl="https://citasmedicasonline.000webhostapp.com/desafio03dps104/desafiopractico3dps104php/";
  const [data, setData]=useState([]);
  const [modalInsertar, setModalInsertar]= useState(false);
  const [modalEditar, setModalEditar]= useState(false);
  const [modalEliminar, setModalEliminar]= useState(false);
  const [alumnoSeleccionado, setalumnoSeleccionado]=useState({
    id: '',
    nombre: '',
    nota1: '',
    nota2: '',
    nota3: '',
    nota4: '',
    nota5: '',
    promedio: '',
    promedio_final: '',
    estado: ''
  });

  const handleChange=e=>{
    const {name, value}=e.target;
    setalumnoSeleccionado((prevState)=>({
      ...prevState,
      [name]: value
    }))
    console.log(alumnoSeleccionado);
  }

  const abrirCerrarModalInsertar=()=>{
    setModalInsertar(!modalInsertar);
  }

  const abrirCerrarModalEditar=()=>{
    setModalEditar(!modalEditar);
  }

  const abrirCerrarModalEliminar=()=>{
    setModalEliminar(!modalEliminar);
  }

  const peticionGet=async()=>{
    await axios.get(baseUrl)
    .then(response=>{
      setData(response.data);
    }).catch(error=>{
      console.log(error);
    })
  }

  const peticionPost=async()=>{
    var f = new FormData();
    f.append("nombre", alumnoSeleccionado.nombre);
    f.append("nota1", alumnoSeleccionado.nota1);
    f.append("nota2", alumnoSeleccionado.nota2);
    f.append("nota3", alumnoSeleccionado.nota3);
    f.append("nota4", alumnoSeleccionado.nota4);
    f.append("nota5", alumnoSeleccionado.nota5);
    f.append("METHOD", "POST");
    await axios.post(baseUrl, f)
    .then(response=>{
      setData(response.data);
      abrirCerrarModalInsertar();
    }).catch(error=>{
      console.log(error);
    });
    toast("Se ingreso la información del Alumno", {
      type: "success",
      //autoClose: 2000
    });
  }

  const peticionPut=async()=>{
    var f = new FormData();
    f.append("nombre", alumnoSeleccionado.nombre);
    f.append("nota1", alumnoSeleccionado.nota1);
    f.append("nota2", alumnoSeleccionado.nota2);
    f.append("nota3", alumnoSeleccionado.nota3);
    f.append("nota4", alumnoSeleccionado.nota4);
    f.append("nota5", alumnoSeleccionado.nota5);
    f.append("METHOD", "PUT");
    await axios.post(baseUrl, f, {params: {id: alumnoSeleccionado.id}})
    .then(response=>{
      /*var dataNueva= data;
      dataNueva.map(alumno=>{
        if(alumno.id===alumnoSeleccionado.id){
          alumno.nombre=alumnoSeleccionado.nombre;
          alumno.nota1=alumnoSeleccionado.nota1;
          alumno.nota2=alumnoSeleccionado.nota2;
          alumno.nota3=alumnoSeleccionado.nota3;
          alumno.nota4=alumnoSeleccionado.nota4;
          alumno.nota5=alumnoSeleccionado.nota5;
        }
      });*/
      setData(response.data);
      abrirCerrarModalEditar();
    }).catch(error=>{
      console.log(error);
    });
    toast("Se actualizo la información del Alumno", {
      type: "success",
      //autoClose: 2000
    });
  }

  const peticionDelete=async()=>{
    var f = new FormData();
    f.append("METHOD", "DELETE");
    await axios.post(baseUrl, f, {params: {id: alumnoSeleccionado.id}})
    .then(response=>{
      //setData(data.filter(alumno=>alumno.id!==alumnoSeleccionado.id));
      setData(response.data);
      abrirCerrarModalEliminar();
      
    }).catch(error=>{
      console.log(error);
    });
    toast("Se elimino la información del Alumno", {
      type: "error",
      //autoClose: 2000
    });
  }

  const seleccionarAlumno=(alumno, caso)=>{
    setalumnoSeleccionado(alumno);

    (caso==="Editar")?
    abrirCerrarModalEditar():
    abrirCerrarModalEliminar()
  }

  useEffect(()=>{
    peticionGet();
  },[])

  return (
  
    <div style={{textAlign: 'center'}}>

<nav class="navbar navbar-dark bg-primary">
    <a class="navbar-brand" href="#">Sistema de notas</a>

    <div>
    <ul class="navbar-nav">
      <li class="nav-item active" style={{display: "inline"}}>
        <a class="nav-link" href="" onClick={() => { signOut() }}>Cerrar sesión <span class="sr-only">(current)</span></a>
      </li>
    </ul>
  </div>
</nav>

  

      <div className="container">
        <div className="row">
          <div className="col-lg-12 col-centered">
            <br/>
            <p className="h1">Usuario registrado</p>
            <br/>
            <img style={{background: `url(${photoURL || 'https://res.cloudinary.com/dqcsk8rsc/image/upload/v1577268053/avatar-1-bitmoji_upgwhc.png'})  `, backgroundSize: "cover", height: "100px", width: "100px", margin: "0 auto"}} className="border border-blue-300" />
            <br></br>
            Nombre : <h2 className="text-2xl font-semibold">{displayName}</h2>
            <br></br>
            Correo: <h3 className="italic">{email}</h3>
          </div>
        </div>
      </div>

<br/><br/>

<hr/>

<br />
      <p className="h2">Registro de notas de alumnos</p>
      <button className="btn btn-success" onClick={()=>abrirCerrarModalInsertar()}>Ingresar notas de un alumno</button>
      <br /><br />
    <table className="table table-striped">
      <thead>
        <tr>
          <th>ID</th>
          <th>Nombre</th>
          <th>Nota 1</th>
          <th>Nota 2</th>
          <th>Nota 3</th>
          <th>Nota 4</th>
          <th>Nota 5</th>
          <th>Promedio</th>
          <th>Promedio Final</th>
          <th>Estado</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {data.map(alumno=>(
          <tr key={alumno.id}>
            <td>{alumno.id}</td>
            <td>{alumno.nombre}</td>
            <td>{alumno.nota1}</td>
            <td>{alumno.nota2}</td>
            <td>{alumno.nota3}</td>
            <td>{alumno.nota4}</td>
            <td>{alumno.nota5}</td>
            <td>{alumno.promedio}</td>
            <td>{alumno.promedio_final}</td>
            <td>{alumno.estado}</td>
          <td>
          <button className="btn btn-primary" onClick={()=>seleccionarAlumno(alumno, "Editar")}>Editar</button> {"  "}
          <button className="btn btn-danger" onClick={()=>seleccionarAlumno(alumno, "Eliminar")}>Eliminar</button>
          </td>
          </tr>
        ))}


      </tbody> 

    </table>


    <Modal isOpen={modalInsertar}>
      <form>
      <ModalHeader>Insertar alumno</ModalHeader>
      <ModalBody>
        <div className="form-group">
          <label>Nombre: </label>
          <br />
          <input type="text" className="form-control" name="nombre" onChange={handleChange} required/>
          <br />
          <label>Nota 1: </label>
          <br />
          <input type="number" min="0" max="10" className="form-control" name="nota1" onChange={handleChange}/>
          <br />
          <label>Nota 2: </label>
          <br />
          <input type="number" min="0" max="10" className="form-control" name="nota2" onChange={handleChange}/>
          <br />
          <label>Nota 3: </label>
          <br />
          <input type="number" min="0" max="10" className="form-control" name="nota3" onChange={handleChange}/>
          <br />
          <label>Nota 4: </label>
          <br />
          <input type="number" min="0" max="10" className="form-control" name="nota4" onChange={handleChange}/>
          <br />
          <label>Nota 5: </label>
          <br />
          <input type="number" min="0" max="10" className="form-control" name="nota5" onChange={handleChange}/>
          <br />
        </div>
      </ModalBody>
      <ModalFooter>
        <button className="btn btn-primary" onClick={()=>peticionPost()}>Insertar</button>{"   "}
        <button className="btn btn-danger" onClick={()=>abrirCerrarModalInsertar()}>Cancelar</button>
      </ModalFooter>
      </form>
    </Modal>


    
    <Modal isOpen={modalEditar}>
      <ModalHeader>Editar alumno</ModalHeader>
      <ModalBody>
        <div className="form-group">
          <label>Nombre: </label>
          <br />
          <input type="text" className="form-control" name="nombre" onChange={handleChange} value={alumnoSeleccionado && alumnoSeleccionado.nombre} required/>
          <br />
          <label>Nota 1: </label>
          <br />
          <input type="number" min="0" max="10" className="form-control" name="nota1" onChange={handleChange} value={alumnoSeleccionado && alumnoSeleccionado.nota1}/>
          <br />
          <label>Nota 2: </label>
          <br />
          <input type="number" min="0" max="10" className="form-control" name="nota2" onChange={handleChange} value={alumnoSeleccionado && alumnoSeleccionado.nota2}/>
          <br />
          <label>Nota 3: </label>
          <br />
          <input type="number" min="0" max="10" className="form-control" name="nota3" onChange={handleChange} value={alumnoSeleccionado && alumnoSeleccionado.nota3}/>
          <br />
          <label>Nota 4: </label>
          <br />
          <input type="number" min="0" max="10" className="form-control" name="nota4" onChange={handleChange} value={alumnoSeleccionado && alumnoSeleccionado.nota4}/>
          <br />
          <label>Nota 5: </label>
          <br />
          <input type="number" min="0" max="10" className="form-control" name="nota5" onChange={handleChange} value={alumnoSeleccionado && alumnoSeleccionado.nota5}/>
          <br />
        </div>
      </ModalBody>
      <ModalFooter>
        <button className="btn btn-primary" onClick={()=>peticionPut()}>Editar</button>{"   "}
        <button className="btn btn-danger" onClick={()=>abrirCerrarModalEditar()}>Cancelar</button>
      </ModalFooter>
    </Modal>

    <Modal isOpen={modalEliminar}>
        <ModalBody>
        ¿Estás seguro que deseas eliminar el alumno {alumnoSeleccionado && alumnoSeleccionado.nombre}?
        </ModalBody>
        <ModalFooter>
          <button className="btn btn-danger" onClick={()=>peticionDelete()}>
            Sí
          </button>
          <button
            className="btn btn-secondary"
            onClick={()=>abrirCerrarModalEliminar()}
          >
            No
          </button>
        </ModalFooter>
      </Modal>

    </div>
  );
}

export default Crudalumnos;