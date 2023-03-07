//id= container-cards del details.html
  
  /*function createCard(event){
  let card =`<div class="col">
  <div class="card h-100 border-warning ">
    <img src="${event.image}" class="card-img-top" alt="cinema">
    <div class="card-body">
      <h5 class="card-title">${event.name}</h5>
      <p class="card-text">${event.description}</p>
      <span class="card-text">$${event.price}</span>
      <a href="./details.html" class="btn float-end btn-warning lg w-50">Details</a>
    </div>
  </div>
</div>`;  
return card;  
}*/
/*tener en cuenta todo el array:
 _id: 14,
        "image":"https://i.postimg.cc/T3C92KTN/scale.jpg",
        "name":"Avengers",
        "date":"2022-10-15",
        "description":"Marvel's Avengers Premier in 3d, the start of an epic saga with your favourite superheroes.",
        "category":"Cinema",
        "place":"Room D1",
        "capacity":9000,
        "estimate":9000,
        "price":250*/

let clickDetail = location.search;
let siguiente = new URLSearchParams(clickDetail);
let eventGuia = siguiente.get("id");
let obj = data.events.find(event => event.eventGuia_id === id);

let tarjet = document.getElementById("container-cards");
let detailHome = 
`<div class="col">
<div class="card h-100 border-warning ">
  <img src="${evento.image}" class="card-img-top" alt="cinema">
  <div class="card-body">
    <h5 class="card-title">${evento.name}</h5>
    <p class="card-text">${evento.description}</p>
    <p><span>Category: </span>${evento.category}</p>
    <p><span>Date: </span>${evento.date}</p>
    <p><span>Place: </span>${evento.place}</p>
    <p><span>Capacity: </span>${evento.capacity}</p>
    <p id="cantAsistents"></p>
    <span class="card-text">$${evento.price}</span>
  </div>
</div>
</div>`;  

tarjet.innerHTML = detailHome;
let insertarDate = new Date(data.currentDate);
let diaEvento = new Date(evento.date);
let asistenciaEstimada = document.getElementById('cantAsistents');{
    if (diaEvento < insertarDate) {
     asistenciaEstimada = innerHTML = `<span> Assistance: </span>${evento.assistance}`    
    } else {
        assisEstimate.innerHTML = `<span>Estimate: </span>${evento.estimate}`
    }
}
