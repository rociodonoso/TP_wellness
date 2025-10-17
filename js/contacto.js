// --- GESTIÓN DE MENSAJES DE CONTACTO ---

let mensajes = [];
let idMensaje = 0;

// CARGAR MENSAJES GUARDADOS EN LOCALSTORAGE
document.addEventListener("DOMContentLoaded", () => {
  const guardados = localStorage.getItem("mensajes");
  if (guardados) {
    mensajes = JSON.parse(guardados);
    idMensaje = mensajes.length;
    obtenerMensajes();
    console.log("Mensajes cargados desde LocalStorage:", mensajes);
  } else {
    obtenerMensajes();
  }

  // --- BOTONES --- //
  let botonAgregar = document.getElementById("botonAgregar");
  botonAgregar.addEventListener("click", agregarMensaje);

  let botonBorrar = document.getElementById("borrarMensaje");
  botonBorrar.addEventListener("click", eliminarMensaje);

  let botonFiltrar = document.getElementById("botonFiltrar");
  botonFiltrar.addEventListener("click", filtrarPorMotivo);
});

// --- AGREGAR MENSAJE --- //
function agregarMensaje() {
  let nombre = document.getElementById("nombreHTML").value;
  let email = document.getElementById("emailHTML").value;
  let motivo = document.getElementById("motivoHTML").value;
  let mensaje = document.getElementById("mensajeHTML").value;

  if (nombre === "" || email === "" || motivo === "" || mensaje === "") {
    alert("Por favor completá todos los campos.");
    return;
  }

  let nuevoMensaje = { id: idMensaje + 1, nombre, email, motivo, mensaje };
  mensajes.push(nuevoMensaje);
  idMensaje++;
  console.log("Mensaje agregado:", nuevoMensaje);

  // Guardar en LocalStorage
  localStorage.setItem("mensajes", JSON.stringify(mensajes));

  obtenerMensajes();

  // Limpiar campos
  document.getElementById("nombreHTML").value = "";
  document.getElementById("emailHTML").value = "";
  document.getElementById("motivoHTML").value = "";
  document.getElementById("mensajeHTML").value = "";
}

// --- MOSTRAR MENSAJES --- //
function obtenerMensajes() {
  let divMensajes = document.getElementById("listaMensajes");
  divMensajes.innerHTML = "";
  let listaHTML = document.createElement("ul");
  listaHTML.classList.add("list-group");

  for (let mensaje of mensajes) {
    let item = document.createElement("li");
    item.classList.add("list-group-item");
    item.textContent = `ID: ${mensaje.id} | ${mensaje.nombre} (${mensaje.email}) | Motivo: ${mensaje.motivo} | Mensaje: ${mensaje.mensaje}`;
    listaHTML.appendChild(item);
  }

  if (mensajes.length === 0) {
    divMensajes.innerHTML = "<p class='text-muted text-center'>Aún no hay mensajes enviados.</p>";
  } else {
    divMensajes.appendChild(listaHTML);
  }
}

// --- ELIMINAR MENSAJE --- //
function eliminarMensaje() {
  let idABorrar = document.getElementById("idBorrar").value;
  let index = mensajes.findIndex(m => m.id == idABorrar);

  if (index === -1) {
    alert("No se encontró ningún mensaje con ese ID.");
    return;
  }

  mensajes.splice(index, 1);
  localStorage.setItem("mensajes", JSON.stringify(mensajes));
  obtenerMensajes();
  console.log("Mensaje eliminado. Lista actualizada:", mensajes);
}

// --- FILTRAR POR MOTIVO --- //
function filtrarPorMotivo() {
  let motivoBuscado = document.getElementById("motivoFiltrar").value.toLowerCase();
  let mensajesFiltrados = mensajes.filter(m => m.motivo.toLowerCase().includes(motivoBuscado));

  let divMensajes = document.getElementById("listaMensajes");
  divMensajes.innerHTML = "";

  if (mensajesFiltrados.length === 0) {
    divMensajes.innerHTML = "<p class='text-muted text-center'>No se encontraron mensajes con ese motivo.</p>";
    return;
  }

  let listaHTML = document.createElement("ul");
  listaHTML.classList.add("list-group");

  for (let mensaje of mensajesFiltrados) {
    let item = document.createElement("li");
    item.classList.add("list-group-item");
    item.textContent = `ID: ${mensaje.id} | ${mensaje.nombre} (${mensaje.email}) | Motivo: ${mensaje.motivo} | Mensaje: ${mensaje.mensaje}`;
    listaHTML.appendChild(item);
  }

  divMensajes.appendChild(listaHTML);
}
