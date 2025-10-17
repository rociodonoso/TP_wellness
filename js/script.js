// --- GESTIÓN DE TURNOS ---

let turnos = [];
let idTurno = 0;

// --- PROFESIONALES POR SERVICIO ---
const profesionales = {
  Yoga: [
    { nombre: "Sofía", descripcion: "Profesora certificada en Hatha Yoga con 8 años de experiencia." },
    { nombre: "Micaela", descripcion: "Especialista en Vinyasa y técnicas de respiración consciente." },
    { nombre: "Agustina", descripcion: "Formada en Yoga Terapéutico y relajación guiada." }
  ],
  Pilates: [
    { nombre: "Lucía", descripcion: "Entrenadora física enfocada en Pilates Reformer y Postural." },
    { nombre: "Mariana", descripcion: "Kinesióloga y docente de Pilates con enfoque en rehabilitación." }
  ],
  Spa: [
    { nombre: "Camila", descripcion: "Masoterapeuta con técnicas de relajación y reflexología." },
    { nombre: "Antonella", descripcion: "Especialista en aromaterapia y masajes con piedras calientes." }
  ],
  Nutrición: [
    { nombre: "Julieta", descripcion: "Licenciada en nutrición con orientación deportiva." },
    { nombre: "Valentina", descripcion: "Especialista en alimentación consciente y bienestar integral." }
  ]
};

// --- CARGAR TURNOS GUARDADOS EN LOCALSTORAGE ---
document.addEventListener("DOMContentLoaded", () => {
  const guardados = localStorage.getItem("turnos");
  if (guardados) {
    turnos = JSON.parse(guardados);
    idTurno = turnos.length;
  }
  obtenerTurnos();
});

// --- BOTONES ---
const botonAgregar = document.getElementById("botonAgregar");
if (botonAgregar) botonAgregar.addEventListener("click", agregarTurno);

const botonBorrar = document.getElementById("borrarTurno");
if (botonBorrar) botonBorrar.addEventListener("click", eliminarTurno);

const botonFiltrar = document.getElementById("botonFiltrar");
if (botonFiltrar) botonFiltrar.addEventListener("click", filtrarPorServicio);

// --- SELECTS ---
const selectServicio = document.getElementById("servicio");
const selectProfesional = document.getElementById("profesional");
const descripcionDiv = document.getElementById("descripcionProfesional");

// --- CAMBIAR PROFESIONALES SEGÚN SERVICIO ---
if (selectServicio) {
  selectServicio.addEventListener("change", function() {
    const servicioElegido = selectServicio.value;
    selectProfesional.innerHTML = '<option value="">Seleccioná un profesional</option>';
    descripcionDiv.innerHTML = "";

    if (profesionales[servicioElegido]) {
      for (let persona of profesionales[servicioElegido]) {
        let option = document.createElement("option");
        option.value = persona.nombre;
        option.textContent = persona.nombre;
        selectProfesional.appendChild(option);
      }
    }
  });
}

// --- MOSTRAR DESCRIPCIÓN DEL PROFESIONAL ---
if (selectProfesional) {
  selectProfesional.addEventListener("change", function() {
    const servicioElegido = selectServicio.value;
    const profesionalElegido = selectProfesional.value;

    if (profesionales[servicioElegido]) {
      const persona = profesionales[servicioElegido].find(p => p.nombre === profesionalElegido);
      if (persona) {
        descripcionDiv.innerHTML = `<strong>${persona.nombre}</strong> — ${persona.descripcion}`;
      } else {
        descripcionDiv.innerHTML = "";
      }
    }
  });
}

// --- AGREGAR TURNO ---
function agregarTurno() {
  let nombre = document.getElementById("nombre").value;
  let servicio = selectServicio.value;
  let profesional = selectProfesional.value;
  let dia = document.getElementById("dia").value;
  let hora = document.getElementById("hora").value;

  if (nombre === "" || servicio === "" || profesional === "" || dia === "" || hora === "") {
    alert("Por favor completá todos los campos.");
    return;
  }

  let turno = { id: idTurno + 1, nombre, servicio, profesional, dia, hora };
  turnos.push(turno);
  idTurno++;

  localStorage.setItem("turnos", JSON.stringify(turnos));
  obtenerTurnos();

  document.getElementById("nombre").value = "";
  selectServicio.value = "";
  selectProfesional.innerHTML = '<option value="">Seleccioná un profesional</option>';
  descripcionDiv.innerHTML = "";
  document.getElementById("dia").value = "";
  document.getElementById("hora").value = "";
}

// --- MOSTRAR TURNOS ---
function obtenerTurnos() {
  const divTurnos = document.getElementById("turnosContainer");
  divTurnos.innerHTML = "";

  if (turnos.length === 0) {
    divTurnos.innerHTML = "<p class='text-muted text-center'>Aún no hay turnos cargados.</p>";
    return;
  }

  const listaHTML = document.createElement("ul");
  listaHTML.classList.add("list-group");

  for (let turno of turnos) {
    const item = document.createElement("li");
    item.classList.add("list-group-item");
    item.textContent = `ID: ${turno.id} | ${turno.nombre} - ${turno.servicio} con ${turno.profesional} | 🗓️ ${turno.dia} ⏰ ${turno.hora}`;
    listaHTML.appendChild(item);
  }

  divTurnos.appendChild(listaHTML);
}

// --- ELIMINAR TURNO ---
function eliminarTurno() {
  let idABorrar = document.getElementById("idBorrar").value;
  let index = turnos.findIndex(t => t.id == idABorrar);

  if (index === -1) {
    alert("No se encontró ningún turno con ese ID.");
    return;
  }

  turnos.splice(index, 1);
  localStorage.setItem("turnos", JSON.stringify(turnos));
  obtenerTurnos();
  console.log("Turno eliminado. Lista actualizada:", turnos);
}

// --- FILTRAR POR SERVICIO ---
function filtrarPorServicio() {
  let servicioBuscado = document.getElementById("servicioFiltrar").value.toLowerCase();
  let turnosFiltrados = turnos.filter(t => t.servicio.toLowerCase().includes(servicioBuscado));

  let divTurnos = document.getElementById("turnosContainer");
  divTurnos.innerHTML = "";

  if (turnosFiltrados.length === 0) {
    divTurnos.innerHTML = "<p class='text-muted text-center'>No se encontraron turnos para ese servicio.</p>";
    return;
  }

  let listaHTML = document.createElement("ul");
  listaHTML.classList.add("list-group");

  for (let turno of turnosFiltrados) {
    let item = document.createElement("li");
    item.classList.add("list-group-item");
    item.textContent = `ID: ${turno.id} | ${turno.nombre} - ${turno.servicio} con ${turno.profesional} | 🗓️ ${turno.dia} ⏰ ${turno.hora}`;
    listaHTML.appendChild(item);
  }

  divTurnos.appendChild(listaHTML);
}
