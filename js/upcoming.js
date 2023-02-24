let upComing = "";
let tarjets = document.getElementById("container-cards");
for (let event of data.events){
     let eventDate = new Date(event.date);
    if (eventDate < currentDate){
        upComing += createCard (event)
    }
}
console.log (upComing)
tarjets.innerHTML += upComing;