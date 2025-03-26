import React, { useState, useEffect } from "react";
import { db } from "./firebase"; // Importamos la configuración de Firebase
import { collection, addDoc, getDocs, updateDoc, doc } from "firebase/firestore";
import "./App.css";

function App() {
  const [nombre, setNombre] = useState("");
  const [edad, setEdad] = useState("");
  const [receta, setReceta] = useState("");
  const [pacientes, setPacientes] = useState([]);

  // Obtener pacientes desde Firebase
  const obtenerPacientes = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "pacientes"));
      const listaPacientes = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setPacientes(listaPacientes);
    } catch (e) {
      console.error("Error al obtener pacientes: ", e);
    }
  };

  // Cargar pacientes cuando la página inicia
  useEffect(() => {
    obtenerPacientes();
  }, []);

  // Agregar un nuevo paciente
  const agregarPaciente = async () => {
    if (nombre.trim() !== "" && edad.trim() !== "") {
      try {
        await addDoc(collection(db, "pacientes"), {
          nombre: nombre,
          edad: edad,
          recetas: [] // Inicialmente sin recetas
        });
        setNombre("");
        setEdad("");
        obtenerPacientes(); // Recargar la lista de pacientes
      } catch (e) {
        console.error("Error al agregar paciente: ", e);
      }
    } else {
      console.log("Los campos no pueden estar vacíos");
    }
  };

  // Agregar receta a un paciente
  const agregarReceta = async (pacienteId) => {
    if (receta.trim() === "") return;

    try {
      const pacienteRef = doc(db, "pacientes", pacienteId);
      const pacienteSeleccionado = pacientes.find(p => p.id === pacienteId);
      
      // Agregamos la nueva receta a la lista existente
      const nuevasRecetas = [...(pacienteSeleccionado.recetas || []), receta];

      // Actualizar en Firestore
      await updateDoc(pacienteRef, { recetas: nuevasRecetas });

      setReceta(""); // Limpiar el input
      obtenerPacientes(); // Recargar la lista para ver el cambio
    } catch (e) {
      console.error("Error al agregar receta: ", e);
    }
  };

  return (
    <div className="App">
      <h1>Gestión de Pacientes</h1>

      {/* Formulario para agregar paciente */}
      <div>
        <input
          type="text"
          placeholder="Nombre del paciente"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />
        <input
          type="number"
          placeholder="Edad"
          value={edad}
          onChange={(e) => setEdad(e.target.value)}
        />
        <button onClick={agregarPaciente}>Agregar Paciente</button>
      </div>

      {/* Mostrar la lista de pacientes */}
      <div>
        <h2>Lista de Pacientes</h2>
        {pacientes.length > 0 ? (
          pacientes.map((paciente) => (
            <div key={paciente.id}>
              <h3>{paciente.nombre} - {paciente.edad} años</h3>
              
              {/* Formulario para agregar recetas */}
              <input
                type="text"
                placeholder="Nueva receta"
                value={receta}
                onChange={(e) => setReceta(e.target.value)}
              />
              <button onClick={() => agregarReceta(paciente.id)}>Agregar Receta</button>

              {/* Mostrar las recetas del paciente */}
              <ul>
                {paciente.recetas?.map((r, index) => (
                  <li key={index}>{r}</li>
                ))}
              </ul>
            </div>
          ))
        ) : (
          <p>No hay pacientes registrados.</p>
        )}
      </div>
    </div>
  );
}

export default App;
