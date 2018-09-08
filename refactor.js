




//constructor function for all cards
function CardObject(title, body) {
  this.title = title;
  this.body = body;
  this.quality = 'swill';
  this.id = Date.now();
};


//click event listener on save button
$('.save-btn').on('click', createNewCard);


//create instance of idea card to add to the page
function createNewCard(event) {
  event.preventDefault();
  var card = new CardObject($('#title-input').val(), $('#body-input').val())
  addNewCard(card);
}


// create card to prepend to the page and then store in local storage
function addNewCard(card) {
  var newCard = `
  <div id="${card.id}" class="card-container">
  <h2 class="title-of-card">${card.title}</h2>
  <button class="delete-button"></button>
  <p class="body-of-card">${card.body}</p>
  <button class="upvote"></button>
  <button class="downvote"></button>
  <p class="quality">quality: <span class="qualityVariable">${card.quality}</span></p>
  <hr> 
  </div>`;
  $(".bottom-box").prepend(newCard);
};

//event listener on bottom half of the page
$(".bottom-box").on('click', deleteIdea)  

//function to delete idea
function deleteIdea(event) {
  if (event.target.className === "delete-button") {
     $(event.target).closest('.card-container').remove();


}
}



    



