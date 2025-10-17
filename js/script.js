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
botonAgregar.addEventListener("click", agregarTurno);

// --- SELECTS ---
const selectServicio = document.getElementById("servicio");
const selectProfesional = document.getElementById("profesional");
const descripcionDiv = document.getElementById("descripcionProfesional");

// --- CAMBIAR PROFESIONALES SEGÚN SERVICIO ---
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

// --- MOSTRAR DESCRIPCIÓN DEL PROFESIONAL ---
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
