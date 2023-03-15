async function getData(){
  await fetch("https://mindhub-xj03.onrender.com/api/amazing")
  .then(respuesta => respuesta.json())
  .then(json => data=json)
  localStorage.setItem("data",JSON.stringify(data))
} 

getData();


  function createCard(event){
  let card =`<div class="col">
    <div class="card h-100 border-warning ">
      <img src="${event.image}" class="card-img-top" alt="cinema">
      <div class="card-body">
        <h5 class="card-title">${event.name}</h5>
        <p class="card-text">${event.description}</p>
        <span class="card-text">$${event.price}</span>
        <a href="./details.html?id=${event._id}" class="btn float-end btn-warning lg w-50">+ info</a>
      </div>
    </div>
  </div>`;  
return card;  
}

let currentDate = new Date(getData.currentDate);
  console.log(currentDate); 

function checkBoxes(category) {
let chequear = ` <div class="d-flex justify-content-center spacing-2px my-auto" id="container-inputs">
<div class="form-check form-check-inline">
  <input class="form-check-input border border-warning" type="checkbox" name="Category" value="${category}">
  <label class="form-check-label" for="${category}">${category}</label>
</div>`;
return chequear;
}

function buscar(textBuscar, arrayBusqueda) {
  let result = arrayBusqueda.filter(elementoB => elementoB.name.toLowerCase().includes(textBuscar) || elementoB.description.toLowerCase().includes(textBuscar));

  return result;
}

function mostrarResultados(result) {
  if (result.length > 0) {
    let htmlResultados = "";

    for (let r of result) {
      htmlResultados += createCard(r);
    }

    tarjets.innerHTML = htmlResultados;
  } else {
    tarjets.innerHTML = "<p>No results found for the search. Try again.</p>";
  }
}

