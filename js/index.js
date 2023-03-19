let data = localStorage.getItem("data");
data = JSON.parse(data) // extrae del local storage los arrays a strings-
console.log(data); 


//Creacion de tarjetas rel con el data.js
let cardContainer = document.getElementById("card-container");

function crearTarjetas(){
  let homeIndex = "";
  for (let event of data.events){
    homeIndex += createCard(event)
  };
    cardContainer.innerHTML += homeIndex;
}
crearTarjetas();

//Generar checkboxes
categorias();

//combinación de ambos filtros

function ambosFiltros(checking, palabra, homeIndex) {
  for (let elemento of checking) {
    data.events.filter(evento => (evento.category == elemento) && ((evento.name.toLowerCase().includes(palabra)) ||  (evento.description.toLowerCase().includes(palabra)))
              .forEach(evento => {
                homeIndex += createCard(evento);
              })
  )};
        homeIndex.length == 0 ? nothingFound(palabra) : cardContainer.innerHTML = homeIndex;
    };




// filtro checks

let checkeados = document.querySelectorAll(".form-check-input");
for (let check of checkeados){
  check.addEventListener("change",() => {
    let checkeado = [];
    for (let clic of checkeados){
      if (clic.checked) {
        checkeado.push(clic.value);
      }
    }
    let wordIn = searchForm.value.toLowerCase().trim();
        let homeIndex = "";
        if ( (checkeado.length > 0) && (wordIn == "") ) {
            for(let elemento of checkeado) {
                data.events.filter(evento => elemento == evento.category).forEach(evento => { homeIndex += createCard(evento) });
                cardContainer.innerHTML = homeIndex;
            };
        } else if ( (checkeado.length > 0) && (text != "") ) {
           ambosFiltros(checkeado, wordIn, homeIndex);            
        } else {
            crearTarjetas();
        };
    });
};

//Texto y categoria a buscar

let formBusqueda = document.querySelector(".searchForm")
let inputBusqueda = document.querySelector(".searchInput")
formBusqueda.addEventListener("submit", e => {
    e.preventDefault();
    let homeIndex = "";
    let resultados = false;
    let palabra = inputBusqueda.value.toLowerCase().trim();

    let catSelect = [];
    for (let clic of checkeados) { 
        if (clic.checked) {
          catSelect.push(clic.value);
        };
};
    if((palabra != "") && (catSelect.length == 0)) {
      data.events.forEach(event => {
        if( (event.name.toLowerCase().includes(palabra))|| (event.description.toLowerCase().includes(palabra)) ) {
          homeIndex += createCard(event);
          resultados = true;
      }
  });
        if(resultados) {
          cardContainer.innerHTML = homeIndex;
        }else {
          nothingFound(palabra);

        };
      }else if((resultados != "") && (catSelect.length > 0)) {
              ambosFiltros(catSelect, palabra, homeIndex);
    } else {
      crearTarjetas();
    };
      
});      
//verificar visisbilidad de las cards

function verificarCardsVisibles() {
  let visibleCards = [];
  let selectedCategories = [];
  let searchText = "";

  let cards = document.querySelectorAll(".card");
  for (let card of cards) {
    if (card.getBoundingClientRect().top >= 0 && card.getBoundingClientRect().bottom <= window.innerHeight) {
      visibleCards.push(card);
    }
  }

  let checkboxes = document.querySelectorAll(".form-check-input:checked");
  for (let checkbox of checkboxes) {
    selectedCategories.push(checkbox.value);
  }

  let searchInput = document.querySelector(".searchInput");
  searchText = searchInput.value;

  return {
    visibleCards: visibleCards,
    selectedCategories: selectedCategories,
    searchText: searchText
  };
}