getAllCardsFromStorage();

//constructor function for all cards
function CardObject(title, body) {
  this.title = title;
  this.body = body;
  this.qualityArray = ['swill', 'plausible', 'genius'];
  this.qualityIndex = 0;
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
 
}

// function to get all cards back from local storage
function getAllCardsFromStorage(event) {
 for (var i=0; i < localStorage.length; i++) {
    var cardId = localStorage.key(i);
    var retrievedCardFromJson = localStorage.getItem(cardId);
    var parsedCardObject= JSON.parse(retrievedCardFromJson);
    addNewCard(parsedCardObject);
}
}


 // var localArray = Object.keys(localStorage);
 //  for (i = 0; i < localArray.length; i++) {
 //    addNewCard(JSON.parse(localStorage.getItem(localArray[i])));
 //  }

//event listener on bottom half of the page
$(".bottom-box").on('click', deleteCard); 
$(".bottom-box").on('click', upvoteQuality);
// // $(".bottom-box").on('click', downvoteQuality);


//function to get card


//function to delete card
function deleteCard(event) {
  if (event.target.className === "delete-button") {
    var cardId = $(event.target).closest('.card-container')[0].id;
    localStorage.removeItem(cardHTMLId);
}
}

// function to update quality on upvote
function upvoteQuality(event) {
  var cardId = $(event.target).closest('.card-container')[0].id;
  var parsedCardObject = JSON.parse(localStorage.getItem(cardId));
  parsedCardObject.qualityIndex++;
  stringifyCard =  JSON.stringify(parsedCardObject);
  localStorage.setItem(cardId, stringifyCard);

  // console.log(parsedCardObject.qualityIndex)
  
  // var currentQuality = $($(event.target).siblings('p.quality').children()[0]).text().trim();
  // var qualityVariable;
}

//   var key= grab the id of the card, store it into 'key variable'
//   var card = get card from local storage (getItem(key)); and parse it
//   store the parsed card
//   card.qualityindex++

//   if card.index < 2 change text to plausible
//     else change to genuys

//       sotre card 

// }

//function to update quality on downvote

//function to loop through quality
// function changeQuality() {
//   var qualityArray = ['swill', 'plausible', 'genius'];
//   for (i=0; i < qualityArray.length; i++) {
//     return qualityArray[i];
//   }

// }





    



