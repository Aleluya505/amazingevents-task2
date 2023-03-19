let data=localStorage.getItem("data");
  data = JSON.parse(data)
console.log(data); 

//Cuando el usuario quiere tener acceso a más informacion/ detalles.

let clickDetail = location.search;
let siguiente = new URLSearchParams(clickDetail);
let eventGuia = siguiente.get("id");
let evento = data.events.find(event => event._id == eventGuia);

let tarjet = document.getElementById("cardNueva");
let detailHome = 
`<img class="img-detail p-2 border border-warning rounded-start" src="${evento.image}" alt="Detail image">
<div class="card text-center px-3 border border-warning" style="width: 28rem; height:28rem">
    <div class="card-body">
        <h2 class="card-title">${evento.name}</h2>
        <p class="card-text fs-5">${evento.description}</p>
        <div class="card-footer mt-4 text-start">
            <p><span>Category: </span>${evento.category}</p>
            <p><span>Date: </span>${evento.date}</p>
            <p><span>Place: </span>${evento.place}</p>
            <p><span>Capacity: </span>${evento.capacity}</p>
            <p id="assistEstimate"></p>
            <p><span>Price: </span>$ ${evento.price}</p>
            <div class="col-12"><a href="./index.html" class="btn px-3 border btn-warning float-end">Back to home</a></div>
        </div>
    </div>
</div>`;  

tarjet.innerHTML = detailHome;

