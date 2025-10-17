let mensajes = JSON.parse(localStorage.getItem("mensajes")) || [];
let idMensaje = mensajes.length ? mensajes[mensajes.length - 1].id + 1 : 0;

// BOTONES
document.getElementById("botonAgregar").addEventListener("click", agregarMensaje);
document.getElementById("borrarMensaje").addEventListener("click", eliminarMensaje);
document.getElementById("botonFiltrar").addEventListener("click", filtrarPorMotivo);

// AGREGAR MENSAJE
function agregarMensaje() {
  let nombre = document.getElementById("nombreHTML").value;
  let email = document.getElementById("emailHTML").value;
  let motivo = document.getElementById("motivoHTML").value;
  let mensaje = document.getElementById("mensajeHTML").value;

  if (!nombre || !email || !motivo || !mensaje) {
    alert("Por favor completá todos los campos.");
    return;
  }

  let nuevoMensaje = { id: idMensaje++, nombre, email, motivo, mensaje };
  mensajes.push(nuevoMensaje);
  localStorage.setItem("mensajes", JSON.stringify(mensajes));
  obtenerMensajes();
}

// MOSTRAR MENSAJES
function obtenerMensajes() {
  let divMensajes = document.getElementById("listaMensajes");
  divMensajes.innerHTML = "";

  if (mensajes.length === 0) {
    divMensajes.innerHTML = "<p class='text-muted text-center'>Aún no hay mensajes enviados.</p>";
    return;
  }

  let listaHTML = document.createElement("ul");
  listaHTML.classList.add("list-group");

  mensajes.forEach(m => {
    let item = document.createElement("li");
    item.classList.add("list-group-item");
    item.textContent = `ID: ${m.id} | ${m.nombre} - ${m.email} | ${m.motivo} | ${m.mensaje}`;
    listaHTML.appendChild(item);
  });

  divMensajes.appendChild(listaHTML);
}

// ELIMINAR MENSAJE
function eliminarMensaje() {
  let idABorrar = document.getElementById("idBorrar").value;
  mensajes = mensajes.filter(m => m.id != idABorrar);
  localStorage.setItem("mensajes", JSON.stringify(mensajes));
  obtenerMensajes();
}

// FILTRAR POR MOTIVO
function filtrarPorMotivo() {
  let motivoBuscado = document.getElementById("motivoFiltrar").value.toLowerCase();
  let filtrados = mensajes.filter(m => m.motivo.toLowerCase().includes(motivoBuscado));

  let divMensajes = document.getElementById("listaMensajes");
  divMensajes.innerHTML = "";

  if (filtrados.length === 0) {
    divMensajes.innerHTML = "<p class='text-muted text-center'>No se encontraron mensajes con ese motivo.</p>";
    return;
  }

  let listaHTML = document.createElement("ul");
  listaHTML.classList.add("list-group");
  filtrados.forEach(m => {
    let item = document.createElement("li");
    item.classList.add("list-group-item");
    item.textContent = `ID: ${m.id} | ${m.nombre} - ${m.email} | ${m.motivo} | ${m.mensaje}`;
    listaHTML.appendChild(item);
  });

  divMensajes.appendChild(listaHTML);
}

obtenerMensajes();
