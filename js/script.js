// --- GESTIÓN DE TURNOS ---

let turnos = [];
let idTurno = 0;

// CARGAR TURNOS GUARDADOS EN LOCALSTORAGE
document.addEventListener("DOMContentLoaded", () => {
  const guardados = localStorage.getItem("turnos");
  if (guardados) {
    turnos = JSON.parse(guardados);
    idTurno = turnos.length;
    obtenerTurnos();
    console.log("Turnos cargados desde LocalStorage:", turnos);
  } else {
    obtenerTurnos();
  }
});

// --- BOTONES --- //
let botonAgregar = document.getElementById("botonAgregar");
botonAgregar.addEventListener("click", agregarTurno);

let botonBorrar = document.getElementById("borrarTurno");
botonBorrar.addEventListener("click", eliminarTurno);

let botonFiltrar = document.getElementById("botonFiltrar");
botonFiltrar.addEventListener("click", filtrarPorServicio);

// --- AGREGAR TURNO --- //
function agregarTurno() {
  let nombre = document.getElementById("nombre").value;
  let servicio = document.getElementById("servicio").value;
  let fecha = document.getElementById("fecha").value;
  let hora = document.getElementById("hora").value;

  if (nombre === "" || servicio === "" || fecha === "" || hora === "") {
    alert("Por favor completá todos los campos.");
    return;
  }

  let turno = { id: idTurno + 1, nombre, servicio, fecha, hora };
  turnos.push(turno);
  idTurno++;
  console.log("Turno agregado:", turno);

  // Guardar en LocalStorage
  localStorage.setItem("turnos", JSON.stringify(turnos));

  obtenerTurnos();

  // Limpiar campos
  document.getElementById("nombre").value = "";
  document.getElementById("servicio").value = "";
  document.getElementById("fecha").value = "";
  document.getElementById("hora").value = "";
}

// --- MOSTRAR TURNOS --- //
function obtenerTurnos() {
  let divTurnos = document.getElementById("turnosContainer");
  divTurnos.innerHTML = "";
  let listaHTML = document.createElement("ul");
  listaHTML.classList.add("list-group");

  for (let turno of turnos) {
    let item = document.createElement("li");
    item.classList.add("list-group-item");
    item.textContent = `ID: ${turno.id} | ${turno.nombre} - ${turno.servicio} | 📅 ${turno.fecha} ⏰ ${turno.hora}`;
    listaHTML.appendChild(item);
  }

  if (turnos.length === 0) {
    divTurnos.innerHTML = "<p class='text-muted text-center'>Aún no hay turnos cargados.</p>";
  } else {
    divTurnos.appendChild(listaHTML);
  }
}

// --- ELIMINAR TURNO --- //
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

// --- FILTRAR POR SERVICIO --- //
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
    item.textContent = `ID: ${turno.id} | ${turno.nombre} - ${turno.servicio} | 📅 ${turno.fecha} ⏰ ${turno.hora}`;
    listaHTML.appendChild(item);
  }

  divTurnos.appendChild(listaHTML);
}
