let data = localStorage.getItem("data");
data = JSON.parse(data) // extrae del local storage los arrays a strings-
console.log(data); 



//Creacion de tarjetas rel con el data.js
let containerCard = document.getElementById("card-container");

function crearTarjetas(){
  let postEvents = "";
  for (let event of data.events){
    postEvents += createCard(event)
  };
    containerCard.innerHTML += postEvents;
}
crearTarjetas();

//Generar checkboxes
categorias();

//combinación de ambos filtros

function ambosFiltros (checking, palabra, postEvents){
  for(elemento of checking){
      data.events.filter(evento => evento == evento.category) && ((evento.name.toLoweCase().includes(palabra) || evento.description.toLoweCase().includes(palabra)) ).forEach(evento => {postEvents += createCard(evento)});
       };
       postEvents.lenght == 0 ? nothingFound(palabra) : containerCard.innerHTML = postEvents;
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
        let postEvents = "";
        if ( (checkeados.length > 0) && (palabra == "") ) {
            for(let elemento of checkeados) {
                data.events.filter(evento => elemento == evento.category).forEach(evento => { postEvents += createCard(evento) });
                cardContainer.innerHTML = postEvents;
            };
        } else if ( (checkeados.length > 0) && (palabra != "") ) {
           ambosFiltros(checkeados, palabra, postEvents);            
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
    let postEvents = "";
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
          postEvents += createCard(event);
          resultados = true;
      }
  });
        if(resultados) {
          containerCard.innerHTML = postEvents;
        }else {
          nothingFound(palabra);
        };
      }else if((resultados != "") && (catSelect.length > 0)) {
              ambosFiltros(catSelect, palabra, postEvents);
    } else {
      crearTarjetas();
    };
      
});      