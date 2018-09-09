getAllCardsFromStorage();


//keyup event listener on input fields
$('#title-input').on('keyup', enableSubmitButton);
$('#body-input').on('keyup', enableSubmitButton);
//click event listener on save button
$('.save-btn').on('click', createNewCard);
//event listener on bottom half of the page
$('.bottom-box').on('click', deleteCard); 
$('.bottom-box').on('click', storeUpvoteQuality);
$('.bottom-box').on('click', storeDownvoteQuality);
$('#search-input').on('keyup', searchCards);

//constructor function for all cards
function CardObject(title, body) {
  this.title = title;
  this.body = body;
  this.qualityArray = ['swill', 'plausible', 'genius'];
  this.qualityIndex = 0;
  this.id = Date.now();
};

//create instance of idea card to add to the page
function createNewCard(event) {
  event.preventDefault();
  var card = new CardObject($('#title-input').val(), $('#body-input').val())
  addNewCard(card);
};

//enable submit button if both input fields are filled out
function enableSubmitButton(event) {
  if ($('#title-input').val() === "" || $('#body-input').val() === "") {
       $('.save-btn').prop('disabled', true);
  } else {
    $('.save-btn').prop('disabled', false);
  } 
};

// create card to prepend to the page
function addNewCard(card) {
  var newCard = `
  <div id="${card.id}" class="card-container">
  <h2 class="title-of-card" contenteditable="true" onfocusout="updateCardTitle(event)">${card.title}</h2>
  <button class="delete-button"></button>
  <p class="body-of-card" contenteditable="true" onfocusout="updateCardBody(event)">${card.body}</p>
  <button class="button upvote-button"></button>
  <button class="button downvote-button"></button>
  <p class="quality">quality: <span class="qualityVariable">${card.qualityArray[card.qualityIndex]}</span></p>
  <hr> 
  </div>`;
  $(".bottom-box").prepend(newCard);
  localStoreCard(card);
  $('form')[0].reset();
};

//function to store newly added card to local storage
function localStoreCard(card) {
  var cardString = JSON.stringify(card);
  localStorage.setItem(card.id, cardString)
};

// function to get all cards back from local storage
function getAllCardsFromStorage(event) {
 for (var i=0; i < localStorage.length; i++) {
    var cardId = localStorage.key(i);
    var retrievedCardFromJson = localStorage.getItem(cardId);
    var parsedCardObject= JSON.parse(retrievedCardFromJson);
    addNewCard(parsedCardObject);
  }
};

//function to delete card
function deleteCard(event) {
  if ($(event.target).hasClass("delete-button")) {
    var cardContainer = $(event.target).closest('.card-container').remove();
    var cardId = cardContainer[0].id
    localStorage.removeItem(cardId);
  }
};

// function to update quality on upvote
function storeUpvoteQuality(event) {
  if ($(event.target).hasClass("upvote-button")) {
  var cardId = $(event.target).closest('.card-container')[0].id;
  var card= JSON.parse(localStorage.getItem(cardId));
  card.qualityIndex++;
  if (card.qualityIndex > 2 ) card.qualityIndex = 2;
  $(event.target).siblings('.quality').children().text(card.qualityArray[card.qualityIndex]);
  localStoreCard(card)
  }
};

// function to update quality on downvote
function storeDownvoteQuality(event) {
  if ($(event.target).hasClass("downvote-button")){
  var cardId = $(event.target).closest('.card-container')[0].id;
  var card= JSON.parse(localStorage.getItem(cardId));
  card.qualityIndex--;
  if (card.qualityIndex < 0 ) card.qualityIndex = 0;
  $(event.target).siblings('.quality').children().text(card.qualityArray[card.qualityIndex]);
  localStoreCard(card)
  }
};

function updateCardTitle(event) {
  var card = JSON.parse(localStorage.getItem($(event.target).closest('.card-container')[0].id));
  var updatedTitle = $(event.target).text();
  card.title = updatedTitle;
  localStoreCard(card);

};

function updateCardBody(event) {
  var card = JSON.parse(localStorage.getItem($(event.target).closest('.card-container')[0].id));
  var updatedBody = $(event.target).text();
  card.body = updatedBody;
  localStoreCard(card);

};

function searchCards() {
  var searchValue = $('#search-input').val().toLowerCase();
  var allCards = $('.card-container');
  for (var i=0; i < allCards.length; i++) {
    var cardTitle = $(allCards[i]).children('.title-of-card').text().toLowerCase();
    var cardBody = $(allCards[i]).children('.body-of-card').text().toLowerCase();
    console.log(cardTitle);
    if (cardTitle.includes(searchValue) || cardBody.includes(searchValue)){
      $(allCards[i]).removeClass('hidden');
    }
    else {
      $(allCards[i]).addClass('hidden')
    }
  }
};

