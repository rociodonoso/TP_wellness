let mensajes = []
let idMensaje = 0

// BOTONES
let botonAgregar = document.getElementById("botonAgregar")
botonAgregar.addEventListener("click", agregarMensaje)
botonAgregar.addEventListener("click", obtenerMensajes)

let botonBorrar = document.getElementById("borrarMensaje")
botonBorrar.addEventListener("click", eliminarMensaje)

let botonFiltrar = document.getElementById("botonFiltrar")
botonFiltrar.addEventListener("click", filtrarPorMotivo)


// AGREGAR MENSAJE 
function agregarMensaje() {
  let nombre = document.getElementById("nombreHTML").value
  let email = document.getElementById("emailHTML").value
  let motivo = document.getElementById("motivoHTML").value
  let mensaje = document.getElementById("mensajeHTML").value

  // Validar campos
  if (nombre === "" || email === "" || motivo === "" || mensaje === "") {
    alert("Por favor completá todos los campos.")
    return
  }

  // Crear mensaje
  let nuevoMensaje = {
    id: idMensaje,
    nombre: nombre,
    email: email,
    motivo: motivo,
    mensaje: mensaje
  }

  mensajes.push(nuevoMensaje)
  idMensaje++
  console.log("Mensaje agregado:", nuevoMensaje)
  obtenerMensajes()
}


// ¡MOSTRAR MENSAJES
function obtenerMensajes() {
  let divMensajes = document.getElementById("listaMensajes")
  divMensajes.innerHTML = ""
  let listaHTML = document.createElement("ul")
  listaHTML.classList.add("list-group")

  for (let i = 0; i < mensajes.length; i++) {
    let item = document.createElement("li")
    item.classList.add("list-group-item")
    item.textContent =
      "ID: " + mensajes[i].id + " | " +
      "Nombre: " + mensajes[i].nombre + " | " +
      "Email: " + mensajes[i].email + " | " +
      "Motivo: " + mensajes[i].motivo + " | " +
      "Mensaje: " + mensajes[i].mensaje

    listaHTML.appendChild(item)
  }

  if (mensajes.length === 0) {
    divMensajes.innerHTML = "<p class='text-muted text-center'>Aún no hay mensajes enviados.</p>"
  } else {
    divMensajes.appendChild(listaHTML)
  }
}


// ELIMINAR MENSAJE
function eliminarMensaje() {
  let idABorrar = document.getElementById("idBorrar").value

  for (let i = 0; i < mensajes.length; i++) {
    if (mensajes[i].id == idABorrar) {
      mensajes.splice(i, 1)
      console.log("Mensaje eliminado. Lista actualizada:", mensajes)
    }
  }

  obtenerMensajes()
}


// FILTRAR POR MOTIVO
function filtrarPorMotivo() {
  let motivoBuscado = document.getElementById("motivoFiltrar").value
  let mensajesFiltrados = []

  for (let i = 0; i < mensajes.length; i++) {
    if (mensajes[i].motivo.toLowerCase().includes(motivoBuscado.toLowerCase())) {
      mensajesFiltrados.push(mensajes[i])
    }
  }

  console.log("Mensajes filtrados:", mensajesFiltrados)

  let divMensajes = document.getElementById("listaMensajes")
  divMensajes.innerHTML = ""
  let listaHTML = document.createElement("ul")
  listaHTML.classList.add("list-group")

  for (let i = 0; i < mensajesFiltrados.length; i++) {
    let item = document.createElement("li")
    item.classList.add("list-group-item")
    item.textContent =
      "ID: " + mensajesFiltrados[i].id + " | " +
      "Nombre: " + mensajesFiltrados[i].nombre + " | " +
      "Email: " + mensajesFiltrados[i].email + " | " +
      "Motivo: " + mensajesFiltrados[i].motivo + " | " +
      "Mensaje: " + mensajesFiltrados[i].mensaje
    listaHTML.appendChild(item)
  }

  if (mensajesFiltrados.length === 0) {
    divMensajes.innerHTML = "<p class='text-muted text-center'>No se encontraron mensajes con ese motivo.</p>"
  } else {
    divMensajes.appendChild(listaHTML)
  }
}
