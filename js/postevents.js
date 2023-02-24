let postEvent = "";
    for (let event of data.event){
        postEvent  += createCard (event)
        
    }
    console.log (postEvent)