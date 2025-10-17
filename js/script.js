let turnos = JSON.parse(localStorage.getItem("turnos")) || [];
let idTurno = turnos.length ? turnos[turnos.length - 1].id + 1 : 0;

// BOTONES
document.getElementById("botonAgregar").addEventListener("click", agregarTurno);
document.getElementById("borrarTurno").addEventListener("click", eliminarTurno);
document.getElementById("botonFiltrar").addEventListener("click", filtrarPorServicio);

// AGREGAR TURNO
function agregarTurno() {
  let nombre = document.getElementById("nombre").value;
  let servicio = document.getElementById("servicio").value;
  let fecha = document.getElementById("fecha").value;
  let hora = document.getElementById("hora").value;

  if (nombre === "" || servicio === "" || fecha === "" || hora === "") {
    alert("Por favor completá todos los campos.");
    return;
  }

  let turno = { id: idTurno++, nombre, servicio, fecha, hora };
  turnos.push(turno);
  localStorage.setItem("turnos", JSON.stringify(turnos));
  obtenerTurnos();
}

// MOSTRAR TURNOS
function obtenerTurnos() {
  let divTurnos = document.getElementById("turnosContainer");
  divTurnos.innerHTML = "";

  if (turnos.length === 0) {
    divTurnos.innerHTML = "<p class='text-muted text-center'>Aún no hay turnos cargados.</p>";
    return;
  }

  let listaHTML = document.createElement("ul");
  listaHTML.classList.add("list-group");

  turnos.forEach(t => {
    let item = document.createElement("li");
    item.classList.add("list-group-item");
    item.textContent = `ID: ${t.id} | ${t.nombre} - ${t.servicio} | 📅 ${t.fecha} ⏰ ${t.hora}`;
    listaHTML.appendChild(item);
  });

  divTurnos.appendChild(listaHTML);
}

// ELIMINAR TURNO
function eliminarTurno() {
  let idABorrar = document.getElementById("idBorrar").value;
  turnos = turnos.filter(t => t.id != idABorrar);
  localStorage.setItem("turnos", JSON.stringify(turnos));
  obtenerTurnos();
}

// FILTRAR POR SERVICIO
function filtrarPorServicio() {
  let servicioBuscado = document.getElementById("servicioFiltrar").value.toLowerCase();
  let turnosFiltrados = turnos.filter(t => t.servicio.toLowerCase() === servicioBuscado);

  let divTurnos = document.getElementById("turnosContainer");
  divTurnos.innerHTML = "";

  if (turnosFiltrados.length === 0) {
    divTurnos.innerHTML = "<p class='text-muted text-center'>No se encontraron turnos para ese servicio.</p>";
    return;
  }

  let listaHTML = document.createElement("ul");
  listaHTML.classList.add("list-group");
  turnosFiltrados.forEach(t => {
    let item = document.createElement("li");
    item.classList.add("list-group-item");
    item.textContent = `ID: ${t.id} | ${t.nombre} - ${t.servicio} | 📅 ${t.fecha} ⏰ ${t.hora}`;
    listaHTML.appendChild(item);
  });

  divTurnos.appendChild(listaHTML);
}

obtenerTurnos();
