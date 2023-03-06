let indexHome = "";
let tarjets = document.getElementById("container-cards")
    for (let event of data.events){
        indexHome += createCard (event)  
    }
console.log (indexHome)
tarjets.innerHTML += indexHome;    
//generé un let de las tarjetas para que tome los
// elementos del id del index.html   




let resultados = []; //array vacio para introducir las busquedas.

let inputBusqueda = document.getElementById("search");

document.querySelector("#form-busqueda").onsubmit = (e) =>{
  e.preventDefault(); // no se actualiza la pagina con cada envio de form


  let textIngresado = inputBusqueda.value.toLowerCase(); 
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

/*let categorias = document.querySelectorAll("container-inputs"); 
let HTMLcategorias = "";
for (let category of categorias) {
  HTMLcategorias +=  `<div class="form-check form-check-inline">
  <input class="form-check-input border border-warning" type="checkbox" name="Category" value="Category "
    id="flexCheckChecked" checked>${data.category}
  <label class="form-check-label" for="flexCheckChecked">Category 1</label>
</div>`;

}
console.log(categorias)*/






 
  


