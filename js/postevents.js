let data = localStorage.getItem("data");
data = JSON.parse(data) // extrae del local storage los arrays a strings-
console.log(data); 

let eventsPast = "";
let tarjets = document.getElementById("container-cards");

for (let event of data.events) {
  eventsPast += createCard(event);
}

console.log(eventsPast);
tarjets.innerHTML += eventsPast;

let categorias = [];
data.events.forEach(event => {  
  if(!categorias.includes(event.category)){
    categorias.push(event.category);
  }
}); 
//Categorias que se establecen en los inputs.
let listaCategorias = "";
let containerChecks = document.querySelector("#container-inputs");

for (category of categorias) {
  listaCategorias += checkBoxes(category);
}

containerChecks.innerHTML = listaCategorias;

let catCheck = document.querySelectorAll(".form-check-input");
for (check of catCheck) {
  check.addEventListener("change", () => {
    let chequeado = [];

    for (let tic of catCheck) {
      if (tic.checked) { 
        chequeado.push(tic.value)
      }
    }

    console.log(chequeado);

    if (chequeado.length > 0) {
      let tarjets = "";
      let containerCard = document.getElementById("container-cards");

      data.events.filter(evento => chequeado.includes(evento.category)).forEach(evento => {
        tarjets += createCard(evento)
      });

      containerCard.innerHTML = tarjets;  
    }
  });
}
//Resultados de las busquedas del usuario.
let resultados = []; // array vacío para introducir las búsquedas.
let inputBusqueda = document.getElementById("search");
let categoriasSeleccionadas = [];

function filtrarEventos(categoriasSeleccionadas, palabraClave) {
  let eventosFiltrados = [];

  if (categoriasSeleccionadas.length > 0 && palabraClave.length > 0) {
    eventosFiltrados = data.events.filter(
      (evento) =>
        categoriasSeleccionadas.includes(evento.category) &&
        (evento.title.toLowerCase().includes(palabraClave) ||
          evento.description.toLowerCase().includes(palabraClave))
    );
  } else if (categoriasSeleccionadas.length > 0) {
    eventosFiltrados = data.events.filter((evento) =>
      categoriasSeleccionadas.includes(evento.category)
    );
  } else if (palabraClave.length > 0) {
    eventosFiltrados = data.events.filter(
      (evento) =>
        evento.title.toLowerCase().includes(palabraClave) ||
        evento.description.toLowerCase().includes(palabraClave)
    );
  } else {
    eventosFiltrados = data.events;
  }

  return eventosFiltrados;
}

document.querySelector("#form-busqueda").addEventListener("submit", (evento) => {
  evento.preventDefault(); // no se actualiza la página con cada envío de formulario.

  let search = inputBusqueda.value.toLowerCase().trim();
  let result = filtrarEventos(categoriasSeleccionadas, search);

  mostrarResultados(result);

  mostrarSeleccion(categoriasSeleccionadas, search);

  console.log(categoriasSeleccionadas);
  console.log(result);
  console.log(search);
});

// código para seleccionar categorías
let checkboxCategorias = document.querySelectorAll(".categoria");

checkboxCategorias.forEach((checkbox) => {
  checkbox.addEventListener("change", (evento) => {
    if (evento.target.checked) {
      categoriasSeleccionadas.push(evento.target.value);
    } else {
      categoriasSeleccionadas = categoriasSeleccionadas.filter(
        (categoria) => categoria !== evento.target.value
      );
    }

    let search = inputBusqueda.value.toLowerCase().trim();
    let result = filtrarEventos(categoriasSeleccionadas, search);

    mostrarResultados(result);

    mostrarSeleccion(categoriasSeleccionadas, search);

    console.log(categoriasSeleccionadas);
    console.log(result);
    console.log(search);
  });
});
