async function getData(){
  await fetch("https://mindhub-xj03.onrender.com/api/amazing")
  .then(respuesta => respuesta.json())
  .then(json => data=json)
  localStorage.setItem("data",JSON.stringify(data))
} 
getData();

function createCard(event){
  let card = `<div class="col col-md-3 col-sm-6">
    <div class="card h-100 border-warning ">
      <img src="${event.image}" class="card-img-top" alt="cinema">
      <div class="card-body">
        <h5 class="card-title">${event.name}</h5>
        <p class="card-text">${event.description}</p>
        <span class="card-text">$${event.price}</span>
        <a href="./details.html?id=${event._id}" class="btn float-end btn-warning lg w-50">+ info</a>
      </div>
    </div>
  </div>`  
  return card;
}
//categorias- checkboxes
function categorias(){
  let listaCategorias = "";
  let check = document.querySelector(".contCheck")
  let categories =[];

    data.events.forEach(evento => {
    if(!categories.includes(evento.category)) {
      categories.push(evento.category);
      listaCategorias += `<div class="form-check form-check-inline">
      <input class="form-check-input checkbox-info shadow-none border border-dark-subtle" type="checkbox" name="Category" value="${evento.category}" id="${evento.category}">
      <label class="form-check-label" for="${evento.category}">${evento.category}</label>
      </div>`;
    }
    check.innerHTML = listaCategorias;
});
};
 
//error en la busqueda
function nothingFound(word) {
  document.getElementById('container-card').innerHTML = `
  <div class="text-center">
  <p class="pb-3"><i class="bi bi-search fs-1"></i></p>
  <h3>We couldn't find anything for '${word}'</h3>
  <p>You may want to try using different keywords, deselecting filters, or checking for spelling mistakes.</p>
  </div>
  `
};



