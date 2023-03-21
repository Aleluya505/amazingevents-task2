

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


function ambosFiltros(checkeados, wordIn, homeIndex) {
    for (let elemento of checkeados) {
      data.events.filter(evento => (evento.category == elemento) && ((evento.name.toLowerCase().includes(wordIn)) ||  (evento.description.toLowerCase().includes(wordIn))))
                .forEach(evento => {
                  homeIndex += createCard(evento);
                });
    }
    homeIndex.length == 0 ? nothingFound(wordIn) : cardContainer.innerHTML = homeIndex;
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
    let wordIn = inputBusqueda.value.toLowerCase().trim(); 
    let homeIndex = "";
        if ( (checkeado.length > 0) && (wordIn == "") ) {
        for(let elemento of checkeado) {
                data.events.filter(evento => elemento == evento.category).forEach(evento => { homeIndex += createCard(evento) });
    cardContainer.innerHTML = homeIndex;
            };
        } else if ( (checkeado.length > 0) && (wordIn != "") ) {
           ambosFiltros(checkeado, wordIn, homeIndex);            
        } else {
            crearTarjetas();
        };
    });
};

//Texto y categoria a buscar

let formBusqueda = document.querySelector(".searchForm")
let inputBusqueda = document.querySelector(".searchInput")
formBusqueda.addEventListener('submit', e => {
    e.preventDefault();
    let homeIndex = "";
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
          homeIndex += createCard(event);
          resultados = true;
      }
  });
        if(resultados) {
          cardContainer.innerHTML = homeIndex;
        }else {
          nothingFound(wordIn);

        };
      }else if((wordIn != "") && (catSelect.length > 0)) {
              ambosFiltros(catSelect, wordIn, homeIndex);
    } else {
      crearTarjetas();
    };
      
}); 
