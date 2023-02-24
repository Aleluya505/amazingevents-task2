
let postEvent = "";
let tarjets = document.getElementById("container-cards");
for (let event of data.events){
    let eventDate = new Date(event.date);
    if (eventDate < currentDate) {
        postEvent += createCard(event)
        }
}
console.log(postEvent);
tarjets.innerHTML = postEvent;
