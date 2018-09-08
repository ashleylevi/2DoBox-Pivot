
//constructor function for all cards
function CardObject(title, body) {
  this.title = title;
  this.body = body;
  this.qualityArray = ['swill', 'plausible', 'genius'];
  this.qualityIndex = 0
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

// create card to prepend to the page
function addNewCard(card) {
  var newCard = `
  <div id="${card.id}" class="card-container">
  <h2 class="title-of-card">${card.title}</h2>
  <button class="delete-button"></button>
  <p class="body-of-card">${card.body}</p>
  <button class="upvote"></button>
  <button class="downvote"></button>
  <p class="quality">quality: <span class="qualityVariable">${card.qualityArray[card.qualityIndex]}</span></p>
  <hr> 
  </div>`;
  $(".bottom-box").prepend(newCard);
  localStoreCard(card);
};

//function to store newly added card to local storage
function localStoreCard(card) {
  var cardString = JSON.stringify(card);
  localStorage.setItem(card.id, cardString)
  console.log('hi');
}

//event listener on bottom half of the page
$(".bottom-box").on('click', deleteIdea); 
$(".bottom-box").on('click', upvoteQuality);
// $(".bottom-box").on('click', downvoteQuality);

//function to delete idea
function deleteIdea(event) {
  if (event.target.className === "delete-button") {
     $(event.target).closest('.card-container').remove();
}
}

//function to update quality on upvote
function upvoteQuality(event) {
  var currentQuality = $($(event.target).siblings('p.quality').children()[0]).text().trim();
  var qualityVariable;

}

//function to update quality on downvote

//function to loop through quality
// function changeQuality() {
//   var qualityArray = ['swill', 'plausible', 'genius'];
//   for (i=0; i < qualityArray.length; i++) {
//     return qualityArray[i];
//   }

// }





    



