function reAddCards (event) {
  $('.card-container').remove();
  getAllCardsFromStorage();
  $(event).removeClass('hasBeenClicked');
}

function filterByNone(event) {
  if ($(event.target).hasClass('hasBeenClicked')) {
    reAddCards(event.target);
  } else {
    filterNone(event.target);
  }
}

function filterNone (event) {
  $(event).addClass('hasBeenClicked');
  $('.card-container').remove();
  for (var i = 0; i < localStorage.length; i++) {
    var filterCard = JSON.parse(localStorage.getItem(localStorage.key(i)))
    if (filterCard.qualityIndex === 0) {
      addNewCard(filterCard);
    }
  }
}

