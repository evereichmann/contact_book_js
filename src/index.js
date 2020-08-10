function main(){
    getAllContacts()
    createContact()
}
//delete button to work
//search bar to search by name

function getAllContacts(){
    fetch("http://localhost:3000/contacts")
        .then(resp=> resp.json())
        .then(contactData=> {
            contactData.forEach(contact=> {
                renderContact(contact)
                console.log(contact)
            })    
        })
}

function renderContact(contact){
    const main = document.getElementById("contact-container")
    main.innerHTML += renderCard(contact)
}

function renderCard(contact){
    return (`
    <div class="contact-card">
        <div class="contact-frame">
          <h1 class="center-text">${contact.name}</h1>
          <div class="contact-image">
            <img width="80" height="100" data-id="${contact.id}" src="${contact.image}">
          </div>
          <h6 class="center-text">${contact.email}</h1>
          <button data-id=${contact.id} data-action="delete" class="deletecontactbutton">Delete</button>
        </div>
      </div>
  </div> 
    `)
 
}

function createContact(){
    const form = document.getElementById("post-form")
    form.addEventListener('submit', function(event){
        event.preventDefault()
        const contactData = {
            "name": event.target[0].value,
            "email": event.target[1].value,
            "image": event.target[2].value,
        }
        const reqObj = {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(contactData)
          }

        fetch("http://localhost:3000/contacts", reqObj)
            .then(resp=> resp.json())
            .then(contact=> {
                renderContact(contact)
                form.reset()  
            })    
    })
}



main()