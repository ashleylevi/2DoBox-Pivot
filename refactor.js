getAllCardsFromStorage();

$('#title-input').on('keyup', enableSubmitButton);
$('#body-input').on('keyup', enableSubmitButton);
$('.save-btn').on('click', createNewCard);
$('#search-input').on('keyup', searchCards);
$('.completed-tasks-button').on('click', showCompletedTasks);
$('.none').on('click', filterByNone);
$('.low').on('click', filterByLow);
$('.normal').on('click', filterByNormal);
$('.high').on('click', filterByHigh);
$('.critical').on('click', filterByCritical);
$('.bottom-box').on('click', deleteCard); 
$('.bottom-box').on('click', storeUpvoteQuality);
$('.bottom-box').on('click', storeDownvoteQuality);
$('.bottom-box').on('click', completeTheTask);

//constructor function for all cards
function CardObject(title, body) {
  this.title = title;
  this.body = body;
  this.qualityArray = ['None', 'Low', 'Normal', 'High', 'Critical'];
  this.qualityIndex = 0;
  this.id = Date.now();
  this.completedTask = false;
  this.opacity = '';
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
       $('.alert-user').text('Requried Field')
  } else {
    $('.save-btn').prop('disabled', false);
    $('.alert-user').text('')
  } 
};

// create card to prepend to the page
function addNewCard(card) {
  var newCard = `
  <div id="${card.id}" class="card-container ${card.opacity}">
  <h2 class="title-of-card" contenteditable="true" onfocusout="updateCardTitle(event)">${card.title}</h2>
  <button class="delete-button"></button>
  <p class="body-of-card" contenteditable="true" onfocusout="updateCardBody(event)">${card.body}</p>
  <button class="button upvote-button" aria-label="click to upvote a to-do"></button>
  <button class="button downvote-button" aria-label="click to downvote a to-do"></button>
  <p class="quality">Quality: <span class="qualityVariable">${card.qualityArray[card.qualityIndex]}</span></p><button class="complete-task" aria-label="click to complete task">Complete ToDo</button>
  <hr> 
  </div>`;
  $('.bottom-box').prepend(newCard);
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
    var parsedCardObject = JSON.parse(retrievedCardFromJson);
    if (parsedCardObject.completedTask === false) {
    addNewCard(parsedCardObject);
    }
  }
};

//function to delete card
function deleteCard(event) {
  if ($(event.target).hasClass('delete-button')) {
    var cardContainer = $(event.target).closest('.card-container').remove();
    var cardId = cardContainer[0].id
    localStorage.removeItem(cardId);
  }
};

// function to update quality on upvote
function storeUpvoteQuality(event) {
  if ($(event.target).hasClass('upvote-button')) {
  var cardId = $(event.target).closest('.card-container')[0].id;
  var card = JSON.parse(localStorage.getItem(cardId));
  card.qualityIndex++;
  if (card.qualityIndex > 4 ) card.qualityIndex = 4;
  $(event.target).siblings('.quality').children().text(card.qualityArray[card.qualityIndex]);
  localStoreCard(card)
  }
};

// function to update quality on downvote
function storeDownvoteQuality(event) {
  if ($(event.target).hasClass('downvote-button')){
  var cardId = $(event.target).closest('.card-container')[0].id;
  var card = JSON.parse(localStorage.getItem(cardId));
  card.qualityIndex--;
  if (card.qualityIndex < 0 ) card.qualityIndex = 0;
  $(event.target).siblings('.quality').children().text(card.qualityArray[card.qualityIndex]);
  localStoreCard(card)
  }
};

// targets the event of the updateCardTitle input in the newCard function according to its specific card ID and changes the text to its new value. Then puts it back in local storage
function updateCardTitle(event) {
  var card = JSON.parse(localStorage.getItem($(event.target).closest('.card-container')[0].id));
  var updatedTitle = $(event.target).text();
  card.title = updatedTitle;
  localStoreCard(card);

};

// targets the event of the updateCardBody input in the newCard function according to its specific card ID and changes the text to its new value. Then puts it back in local storage
function updateCardBody(event) {
  var card = JSON.parse(localStorage.getItem($(event.target).closest('.card-container')[0].id));
  var updatedBody = $(event.target).text();
  card.body = updatedBody;
  localStoreCard(card);

};

// Looks through all the cards on the DOM and changes their input values to lower case. Then takes all the cards that correspont to the value of the search input and removes a class of hidden so it appears on the DOM, and adds a class of hidden to cards that do not have the search values, hiding them from the DOM, thus only showing us cards with the correct search values.
function searchCards() {
  var searchValue = $('#search-input').val().toLowerCase();
  var allCards = $('.card-container');
  for (var i=0; i < allCards.length; i++) {
    var cardTitle = $(allCards[i]).children('.title-of-card').text().toLowerCase();
    var cardBody = $(allCards[i]).children('.body-of-card').text().toLowerCase();
    if (cardTitle.includes(searchValue) || cardBody.includes(searchValue)) {
      $(allCards[i]).removeClass('hidden');
    } else {
      $(allCards[i]).addClass('hidden')
    }
  }
};

// Targets the event of the card that has the complete-task class and contains the ID of the parent container, gets the item from local storage and parses it, then canges the opacity using the changeOpacityProperty function, toggles completed task to be either true or false in local storage, then stores card with new properties in local storage.
function completeTheTask(event) {
  if ($(event.target).hasClass('complete-task')) {
  var cardId = $(event.target).closest('.card-container')[0].id;
  var card = JSON.parse(localStorage.getItem(cardId));
  changeOpacityProperty(card);
  $(event.target).closest('.card-container').toggleClass('change-opacity');
  card.completedTask = !card.completedTask;
  localStoreCard(card);
  }
};

// Loops through local storage looking at all card IDs, gets the cards from local storage and parses them, and if the card object has a property of completedTask true, it adds only those cards to the DOM
function showCompletedTasks() {
  for (var i=0; i < localStorage.length; i++) {
  var cardId = localStorage.key(i);
  var retrievedCardFromJson = localStorage.getItem(cardId);
  var parsedCardObject = JSON.parse(retrievedCardFromJson);
  if (parsedCardObject.completedTask === true) {
  addNewCard(parsedCardObject);
    }
  }
};

// if the card object has a value of change-opacity, change the value to an empty string. If the object has a value of an empty string, change its value to change-opacity.
function changeOpacityProperty(card) {
  if (card.opacity === 'change-opacity') {
    card.opacity = '';
   } else {
    card.opacity = 'change-opacity';
  }
};

// remove all cards from the DOM. Loop through local storage. If the card's object's qualityIndex has a value of 0, add the cards onto the DOM
function filterByNone() {
  $('.card-container').remove();
  for (var i = 0; i < localStorage.length; i++) {
  var filterCard = JSON.parse(localStorage.getItem(localStorage.key(i)))
  if (filterCard.qualityIndex === 0) {
  addNewCard(filterCard);
  }
}
};

// remove all cards from the DOM. Loop through local storage. If the card's object's qualityIndex has a value of 1, add the cards onto the DOM
function filterByLow() {
  $('.card-container').remove();
  for (var i = 0; i < localStorage.length; i++) {
  var filterCard = JSON.parse(localStorage.getItem(localStorage.key(i)))
  if (filterCard.qualityIndex === 1) {
  addNewCard(filterCard);
  }
}
};

// remove all cards from the DOM. Loop through local storage. If the card's object's qualityIndex has a value of 1, add the cards onto the DOM
function filterByNormal() {
  $('.card-container').remove();
  for (var i = 0; i < localStorage.length; i++) {
  var filterCard = JSON.parse(localStorage.getItem(localStorage.key(i)))
  if (filterCard.qualityIndex === 2) {
  addNewCard(filterCard);
  }
}
};

// remove all cards from the DOM. Loop through local storage. If the card's object's qualityIndex has a value of 3, add the cards onto the DOM
function filterByHigh() {
  $('.card-container').remove();
  for (var i = 0; i < localStorage.length; i++) {
  var filterCard = JSON.parse(localStorage.getItem(localStorage.key(i)))
  if (filterCard.qualityIndex === 3) {
  addNewCard(filterCard);
  }
}
};

// remove all cards from the DOM. Loop through local storage. If the card's object's qualityIndex has a value of 4, add the cards onto the DOM
function filterByCritical() {
  $('.card-container').remove();
  for (var i = 0; i < localStorage.length; i++) {
  var filterCard = JSON.parse(localStorage.getItem(localStorage.key(i)))
  if (filterCard.qualityIndex === 4) {
  addNewCard(filterCard);
  }
}
};


