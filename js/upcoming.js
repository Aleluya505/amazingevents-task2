let data = localStorage.getItem("data");
data = JSON.parse(data) // extrae del local storage los arrays a strings-
console.log(data); 



//Creacion de tarjetas rel con el data.js
let containerCard = document.getElementById("card-container");

function crearTarjetas(){
  let upComing = "";
  for (let event of data.events){
    upComing += createCard(event)
  };
    containerCard.innerHTML += upComing;
}
crearTarjetas();

//Generar checkboxes
categorias();

//combinación de ambos filtros

function ambosFiltros (checking, palabra, upComing){
  for(elemento of checking){
      data.events.filter(evento => evento == evento.category) && ((evento.name.toLoweCase().includes(palabra) || evento.description.toLoweCase().includes(palabra)) ).forEach(evento => {upComing += createCard(evento)});
       };
       upComing.lenght == 0 ? nothingFound(palabra) : containerCard.innerHTML = upComing;
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
        let upComing = "";
        if ( (checkeados.length > 0) && (palabra == "") ) {
            for(let elemento of checkeados) {
                data.events.filter(evento => elemento == evento.category).forEach(evento => { upComing += createCard(evento) });
                cardContainer.innerHTML = upComing;
            };
        } else if ( (checkeados.length > 0) && (palabra != "") ) {
           ambosFiltros(checkeados, palabra, upComing);            
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
    let upComing = "";
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
          upComing += createCard(event);
          resultados = true;
      }
  });
        if(resultados) {
          containerCard.innerHTML = upComing;
        }else {
          nothingFound(palabra);
        };
      }else if((resultados != "") && (catSelect.length > 0)) {
              ambosFiltros(catSelect, palabra, upComing);
    } else {
      crearTarjetas();
    };
      
});      