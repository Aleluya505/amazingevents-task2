let indexHome = "";
let tarjets = document.getElementById("container-cards")
    for (let event of data.events){
        indexHome += createCard (event)  
    }
console.log (indexHome)
tarjets.innerHTML += indexHome;    
//generé un let de las tarjetas para que tome los
// elementos del id del index.html   


//categorias
let categorias = [];
data.events.forEach (event => {  
  if(!categorias.includes(event.category)){
    categorias.push(event.category);
  }
}); 

let listaCategorias = "";
let containerChecks = document.querySelector("#container-inputs")
for ( category of categorias) {
  listaCategorias += checkBoxes(category)
}
containerChecks.innerHTML = listaCategorias;

// 


let catCheck = document.querySelectorAll(".form-check-input")
for (check of catCheck) {
  check.addEventListener("change", () => {
    let chequeado = []
    for (let tic of catCheck) {
      if (tic.checked) { 
        chequeado.push(tic.value)
    }
  }
  console.log(chequeado);
       if (chequeado.length > 0) {
          let tarjets = "";
          let containerCard = document.getElementById("container-cards")
     data.events.filter(evento => chequeado.includes(evento.category)).forEach(evento => {
    tarjets += createCard(evento)
    })
 containerCard.innerHTML = tarjets;       
  }
});
};

let resultados = []; //array vacio para introducir las busquedas.

let inputBusqueda = document.getElementById("search");

document.querySelector("#form-busqueda").onsubmit = (e) =>{
  e.preventDefault(); // no se actualiza la pagina con cada envio de form

let textIngresado = inputBusqueda.value.toLowerCase().trim(); 
  resultados = [];
    for (let event of data.events){
    if( event.name.toLowerCase().includes(textIngresado) ||                 
    event.description.toLowerCase().includes(textIngresado)
     ) {
      resultados.push(event);
      }
  }
    for (let resultado of resultados) {
    console.log(resultado);
  }
}

let formBusqueda = document.querySelector("#form-busqueda");
let wordIngresada = document.getElementById("search").value;

    formBusqueda.addEventListener("submit", (evento) => {
    evento.preventDefault(); //EVITA QUE SE ENVIE EL FORM AUTOMATICAMENTE.

let search = wordIngresada.trim();
let result = buscar(search);
mostrarResultados(result);
})
console.log(wordIngresada);

function buscar(){
  let result = [];
  return result;
}
function mostrarResultados(result){
  let verResultado = document.querySelector("#resultados-busqueda");
  if(result.length > 0){
  let htmlResultados = "<ul>" + result.map(r => "<li>" + r + "</li>").join("") + "</ul>";
  verResultado.innerHTML = htmlResultados;

  } else {
    verResultado.innerHTML = "<p> No results found for the search. Try again.</p>";
}
}


