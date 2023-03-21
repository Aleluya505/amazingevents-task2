//Creacion de tarjetas rel con el data.js
let cardContainer = document.getElementById("card-container");

function crearTarjetas(){
  let upComing = "";
  for (let event of data.events){
    upComing += createCard(event)
  };
  cardContainer.innerHTML += upComing;
}
crearTarjetas();
//Generar checkboxes
categorias();

//combinación de ambos filtros

function ambosFiltros(checkeados, wordIn, upComing) {
  for (let elemento of checkeados) {
    data.events.filter(evento => (evento.category == elemento) && ((evento.name.toLowerCase().includes(wordIn)) ||  (evento.description.toLowerCase().includes(wordIn))))
              .forEach(evento => {
                upComing += createCard(evento);
              });
  }
  upComing.length == 0 ? nothingFound(wordIn) : cardContainer.innerHTML = upComing;
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
  let wordIn = inputBusqueda.value.toLowerCase().trim(); //verificar esto
      let upComing = "";
      if ( (checkeado.length > 0) && (wordIn == "") ) {
          for(let elemento of checkeado) {
              data.events.filter(evento => elemento == evento.category).forEach(evento => { upComing += createCard(evento) });
              cardContainer.innerHTML = upComing;
          };
      } else if ( (checkeado.length > 0) && (wordIn != "") ) {
         ambosFiltros(checkeado, wordIn, upComing);            
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
  let wordIn = inputBusqueda.value.toLowerCase().trim();

  let catSelect = [];
  for (let clic of checkeados) { 
      if (clic.checked) {
        catSelect.push(clic.value);
      };
};
  if((wordIn != "") && (catSelect.length == 0)) {
    data.events.forEach(event => {
      if( (event.name.toLowerCase().includes(wordIn))|| (event.description.toLowerCase().includes(wordIn)) ) {
        upComing += createCard(event);
        resultados = true;
    }
});
      if(resultados) {
        cardContainer.innerHTML = upComing;
      }else {
        nothingFound(wordIn);

      };
    }else if((wordIn != "") && (catSelect.length > 0)) {
            ambosFiltros(catSelect, wordIn, upComing);
  } else {
    crearTarjetas();
  };
    
});      
