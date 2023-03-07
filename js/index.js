let indexHome = "";
let tarjets = document.getElementById("container-cards");

for (let event of data.events) {
  indexHome += createCard(event);
}

console.log(indexHome);
tarjets.innerHTML += indexHome;

let categorias = [];
data.events.forEach(event => {  
  if(!categorias.includes(event.category)){
    categorias.push(event.category);
  }
}); 

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

