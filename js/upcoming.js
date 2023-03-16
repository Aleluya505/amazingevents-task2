let data = localStorage.getItem("data");
data = JSON.parse(data) // extrae del local storage los arrays a strings-
console.log(data); 

let upComing = "";
let tarjets = document.getElementById("container-cards");

for (let event of data.events) {
  upComing += createCard(event);
}

console.log(upComing);
tarjets.innerHTML += upComing;

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

document.querySelector("#form-busqueda").onsubmit = (e) => {
  e.preventDefault(); // no se actualiza la página con cada envío de formulario.

  let formBusqueda = document.querySelector("#form-busqueda");
  let wordIngresada = document.getElementById("search");

  formBusqueda.addEventListener("submit", (evento) => {
    evento.preventDefault(); 

    let search = wordIngresada.value.toLowerCase().trim();
    let result = buscar(search, data.events);
    mostrarResultados(result);

    console.log(result);
    console.log(search);
  });
};
//combinacion de las funciones para que cuando se haga click en categorias y se busque, ambas sean visibles al usuario. YA FUNCIONA! 

function filtrarEventos(categoriasSeleccionadas, palabraClave) {
  let eventosFiltrados = [];

  if (categoriasSeleccionadas.length > 0 && palabraClave.length > 0) {
    eventosFiltrados = data.events.filter(evento =>
      categoriasSeleccionadas.includes(evento.category)
    ).filter(evento => evento.title.toLowerCase().includes(palabraClave)|| evento.description.toLowerCase().includes(palabraClave))


  } else if (categoriasSeleccionadas.length > 0) {
    eventosFiltrados = data.events.filter(evento =>
      categoriasSeleccionadas.includes(evento.category)
    );
  } else if (palabraClave.length > 0) {
    eventosFiltrados = data.events.filter(evento =>
      evento.title.toLowerCase().includes(palabraClave)|| evento.description.toLowerCase().includes(palabraClave));

  } else {
    eventosFiltrados = data.events;
  }

  return eventosFiltrados;
}

