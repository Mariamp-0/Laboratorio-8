
// Seleccionar los elementos x id del DOM: ingresar-tarea, boton-agregar y lista-tareas
let ingresarTarea = document.getElementById("ingresar-tarea");
let botonAgregar = document.getElementById("boton-agregar");
let listaTareas = document.getElementById("lista-tareas");

let datosTareas = [
  {
    texto: "Sacar al perro",
    completado: false
  },
  {
    texto: "Hacer el mercado",
    completado: false
  },
  {
    texto: "Hacer trabajos",
    completado: false
  }
]; //Cargar valores predeterminados de la lista 

// Obtener tareas del localStorage
function obtenerTareasLocalStorage() {
  tareas = JSON.parse(localStorage.getItem("tareas"));
  return tareas
}

// Guardar tareas en localStorage
function guardarTareasLocalStorage(tareas) {
  localStorage.setItem("tareas", JSON.stringify(tareas));
}

// Renderizar la lista de tareas en el DOM
function mostrarTareas() {
  listaTareas.innerHTML = "";

  if (datosTareas.length === 0) {
    listaTareas.innerHTML = "<p>No hay tareas</p>"
  }

  datosTareas.forEach((tarea, index) => {
    listaTareas.innerHTML += 
    `      
      <div class="tarea">
        <p class="texto-tarea ${tarea.completado ? "completada" : ""}">${tarea.texto}</p>
        <div class="botones-tarea">
          <button class="btn_ok" data-index="${index}">✔️</button>
          <button class="btn_eliminar" data-index="${index}">❌</button>
        </div>
      </div>
    `;
  });

  let botonOk = document.querySelectorAll(".btn_ok"); //Llamar botones con DOM
  botonOk.forEach((boton) => {
    boton.addEventListener('click', function () {
      let AtributoIndice = this.getAttribute("data-index");
      completarTarea(AtributoIndice)
    });
  })

  let botonEliminar = document.querySelectorAll(".btn_eliminar"); //Llamar botones con DOM
  botonEliminar.forEach((boton) => {
    boton.addEventListener('click', function () {
      let AtributoIndice= this.getAttribute("data-index");
      eliminarTarea(AtributoIndice)
    });
  });
}

// Marcar la Tarea como completada
function completarTarea(index) {
  datosTareas[index].completado = !datosTareas[index].completado;
  guardarTareasLocalStorage(datosTareas);
  mostrarTareas();
}

// Eliminar la Tarea correspondiente
function eliminarTarea(index) {
  datosTareas.splice(index, 1);
  guardarTareasLocalStorage(datosTareas);
  mostrarTareas();
}

// Crear una nueva Tarea
function nuevaTarea() {
  let texto = ingresarTarea.value;

  if (texto !== "") {
    let nueva = {
      texto: texto,
      completado: false
    }

    datosTareas.push(nueva);
    guardarTareasLocalStorage(datosTareas) 
    mostrarTareas();
    ingresarTarea.value = "";
  }
}

// Escuchar el botón Agregar
botonAgregar.addEventListener("click", nuevaTarea);

// Escuchar Enter en el input
ingresarTarea.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    nuevaTarea()
  }
});

// Cargar tareas al iniciar
obtenerTareasLocalStorage();
mostrarTareas();

