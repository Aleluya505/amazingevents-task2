let data = localStorage.getItem("data");
data = JSON.parse(data) // extrae del local storage los arrays a strings-
console.log(data); 


//Creacion de tarjetas rel con el data.js
let containerCard = document.getElementById("card-container");

function crearTarjetas(){
  let homeIndex = "";
  for (let event of data.events){
    homeIndex += createCard(event)
  };
    containerCard.innerHTML += homeIndex;
}
crearTarjetas();

//Generar checkboxes
categorias();

//combinación de ambos filtros

function ambosFiltros (checking, palabra, homeIndex){
  for(elemento of checking){
      data.events.filter(evento => evento == evento.category) && ((evento.name.toLoweCase().includes(palabra) || evento.description.toLoweCase().includes(palabra)) ).forEach(evento => {homeIndex += createCard(evento)});
       };
       homeIndex.lenght == 0 ? nothingFound(palabra) : containerCard.innerHTML = homeIndex;
  }

// filtro checks

let checkeados = document.querySelectorAll(".form-check-input");
for (let check of checkeados){
  check.addEventListener("change",() => {
    let checkeados = [];
    for (let clic of checkeados){
      if (clic.checked) {
        checkeados.push(clic.value);
      }
    }
    let palabra = inputBusqueda.value.toLowerCase().trim();
        let homeIndex = "";
        if ( (checkeados.length > 0) && (palabra == "") ) {
            for(let elemento of checkeados) {
                data.events.filter(evento => elemento == evento.category).forEach(evento => { homeIndex += createCard(evento) });
                cardContainer.innerHTML = homeIndex;
            };
        } else if ( (checkeados.length > 0) && (palabra != "") ) {
           ambosFiltros(checkeados, palabra, homeIndex);            
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
    let palabra = inputBusqueda.value.toLoweCase().trim();

    let catSelect = [];
    for (let clic of checkeados) { 
        if (clic.checked) {
          catSelect.push(clic.value);
        };
    
};
    if((palabra != "") && (catSelect.length == 0)) {
      data.events.forEach(event => {
        if( (event.name.toLocaleLowerCase().includes(palabra))|| (event.description.toLowerCase().includes(palabra)) ) {
          homeIndex += createCard(event);
          resultados = true;
      }
  });
        if(resultados) {
          containerCard.innerHTML = homeIndex;
        }else {
          nothingFound(palabra);
        };
      }else if((resultados != "") && (catSelect.length > 0)) {
              ambosFiltros(catSelect, palabra, homeIndex);
    } else {
      crearTarjetas();
    };
      
});      