let indexHome = "";
let tarjets = document.getElementById("container-cards")
    for (let event of data.events){
        indexHome += createCard (event)
       
        
    }
console.log (indexHome)
tarjets.innerHTML += indexHome;    

 
//genere un let de las tarjetas para que tome los elementos del id del index.html        
