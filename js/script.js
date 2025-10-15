let turnos = []
let idTurno = 0

// BOTONES
let botonAgregar = document.getElementById("botonAgregar")
botonAgregar.addEventListener("click", agregarTurno)
botonAgregar.addEventListener("click", obtenerTurnos)

let botonBorrar = document.getElementById("borrarTurno")
botonBorrar.addEventListener("click", eliminarTurno)

let botonFiltrar = document.getElementById("botonFiltrar")
botonFiltrar.addEventListener("click", filtrarPorServicio)


// AGREGAR TURNO
function agregarTurno() {
  let nombre = document.getElementById("nombre").value
  let servicio = document.getElementById("servicio").value
  let fecha = document.getElementById("fecha").value
  let hora = document.getElementById("hora").value

  if (nombre === "" || servicio === "" || fecha === "" || hora === "") {
    alert("Por favor completá todos los campos.")
    return
  }

  let turno = {id: idTurno, nombre: nombre, servicio: servicio, fecha: fecha, hora: hora}
  turnos.push(turno)
  idTurno++
  console.log("Turno agregado:", turno)
  obtenerTurnos()
}


// MOSTRAR TURNOS
function obtenerTurnos() {
  let divTurnos = document.getElementById("turnosContainer")
  divTurnos.innerHTML = ""
  let listaHTML = document.createElement("ul")
  listaHTML.classList.add("list-group")

  for (let i = 0; i < turnos.length; i++) {
    let item = document.createElement("li")
    item.classList.add("list-group-item")
    item.textContent =
      "ID: " + turnos[i].id + " | " +
      turnos[i].nombre + " - " +
      turnos[i].servicio + " | " +
      "📅 " + turnos[i].fecha + " ⏰ " + turnos[i].hora
    listaHTML.appendChild(item)
  }

  if (turnos.length === 0) {
    divTurnos.innerHTML = "<p class='text-muted text-center'>Aún no hay turnos cargados.</p>"
  } else {
    divTurnos.appendChild(listaHTML)
  }
}


// ELIMINAR TURNO 
function eliminarTurno() {
  let idABorrar = document.getElementById("idBorrar").value

  for (let i = 0; i < turnos.length; i++) {
    if (turnos[i].id == idABorrar) {
      turnos.splice(i, 1)
      console.log("Turno eliminado. Lista actualizada:", turnos)
    }
  }

  obtenerTurnos()
}


// FILTRAR POR SERVICIO 
function filtrarPorServicio() {
  let servicioBuscado = document.getElementById("servicioFiltrar").value
  let turnosFiltrados = []

  for (let i = 0; i < turnos.length; i++) {
    if (turnos[i].servicio.toLowerCase() == servicioBuscado.toLowerCase()) {
      turnosFiltrados.push(turnos[i])
    }
  }

  console.log("Turnos filtrados:", turnosFiltrados)

  let divTurnos = document.getElementById("turnosContainer")
  divTurnos.innerHTML = ""
  let listaHTML = document.createElement("ul")
  listaHTML.classList.add("list-group")

  for (let i = 0; i < turnosFiltrados.length; i++) {
    let item = document.createElement("li")
    item.classList.add("list-group-item")
    item.textContent =
      "ID: " + turnosFiltrados[i].id + " | " +
      turnosFiltrados[i].nombre + " - " +
      turnosFiltrados[i].servicio + " | " +
      "📅 " + turnosFiltrados[i].fecha + " ⏰ " + turnosFiltrados[i].hora
    listaHTML.appendChild(item)
  }

  if (turnosFiltrados.length === 0) {
    divTurnos.innerHTML = "<p class='text-muted text-center'>No se encontraron turnos para ese servicio.</p>"
  } else {
    divTurnos.appendChild(listaHTML)
  }
}

