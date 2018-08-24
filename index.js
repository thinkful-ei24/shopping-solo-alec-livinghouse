'use strict';

const STORE = {
  items: [
  {name: "apples", checked: false},
  {name: "oranges", checked: false},
  {name: "milk", checked: true},
  {name: "bread", checked: false}
],
 boxChecked: false,
 searchTerm: ''
};


function generateItemElement(item, itemIndex, template) {
  return `
    <li class="js-item-index-element" data-item-index="${itemIndex}">
      <span class="shopping-item js-shopping-item ${item.checked ? "shopping-item__checked" : ''}">${item.name}</span>
      <div class="shopping-item-controls">
        <button class="shopping-item-toggle js-item-toggle">
            <span class="button-label">check</span>
        </button>
        <button class="shopping-item-delete js-item-delete">
            <span class="button-label">delete</span>
        </button>
      </div>
    </li>`;
}


function generateShoppingItemsString(shoppingList) {
  console.log("Generating shopping list element");

  const items = shoppingList.map((item, index) => generateItemElement(item, index));

  return items.join("");
}


function renderShoppingList() {
  // render the shopping list in the DOM
  console.log('`renderShoppingList` ran');
  if(STORE.boxChecked ===false && STORE.searchTerm.length === 0){
  const shoppingListItemsString = generateShoppingItemsString(STORE.items);
  $('.js-shopping-list').html(shoppingListItemsString);

} else if(STORE.boxChecked ===true && STORE.searchTerm.length === 0){
  const filtered = STORE.items.filter(item=>item.checked === false);
  console.log('this is filtered ' + filtered);
  const shoppingListItemsString = generateShoppingItemsString(filtered);
  $('.js-shopping-list').html(shoppingListItemsString);

} else if(STORE.boxChecked ===false && STORE.searchTerm.length > 0){
  console.log('the box is not checked and there is a seachTerm');
  const filtered = STORE.items.filter(item=>item.name.includes(STORE.searchTerm) === true);
  const shoppingListItemsString = generateShoppingItemsString(filtered);
  $('.js-shopping-list').html(shoppingListItemsString);

} else if(STORE.boxChecked ===true && STORE.searchTerm.length > 0){
  let filtered = STORE.items.filter(item=>item.name.includes(STORE.searchTerm) === true);
  const filteredTwo = filtered.filter(item=>item.checked === false);
  const shoppingListItemsString = generateShoppingItemsString(filteredTwo);
  $('.js-shopping-list').html(shoppingListItemsString);
  }
  // insert that HTML into the DOM
}


function addItemToShoppingList(itemName) {
  console.log(`Adding "${itemName}" to shopping list`);
  STORE.items.push({name: itemName, checked: false});
}

function handleNewItemSubmit() {
  $('#js-shopping-list-form').submit(function(event) {
    event.preventDefault();
    console.log('`handleNewItemSubmit` ran');
    const newItemName = $('.js-shopping-list-entry').val();
    $('.js-shopping-list-entry').val('');
    addItemToShoppingList(newItemName);
    renderShoppingList();
  });
}

function handleSearchTermSubmit(){
  $('#searchTerm').submit(function(event){
    STORE.searchTerm = '';
    event.preventDefault();
    const term = $(".js-search-entry").val();
    console.log('this is the term: ' + term);
    STORE.searchTerm += term;
    console.log('this is the term added to the STORE: ' + STORE.searchTerm);
    renderShoppingList();
  });
}


function toggleCheckedForListItem(itemIndex) {
  console.log("Toggling checked property for item at index " + itemIndex);
  STORE.items[itemIndex].checked = !STORE.items[itemIndex].checked;
}


function getItemIndexFromElement(item) {
  const itemIndexString = $(item)
    .closest('.js-item-index-element')
    .attr('data-item-index');
  return parseInt(itemIndexString, 10);
}

function handleItemCheckClicked() {
  $('.js-shopping-list').on('click', `.js-item-toggle`, event => {
    console.log('`handleItemCheckClicked` ran');
    const itemIndex = getItemIndexFromElement(event.currentTarget);
    toggleCheckedForListItem(itemIndex);
    renderShoppingList();
  });
}

function checkBoxSubmit(){
  $('.show-only-unchecked').change(function(){
    STORE.boxChecked = !STORE.boxChecked;
    renderShoppingList();
  });
}

function deleteListItem(itemIndex){
    STORE.items.splice(itemIndex, 1);
}

function getItemFromIndexFromElement(itemIndex){
    return STORE.items[itemIndex];
}
function handleDeleteItemClicked() {
  // this function will be responsible for when users want to delete a shopping list
  // item
  $('.js-shopping-list').on('click', '.js-item-delete', function(){
      console.log('deleteItemClick is working');
    const anIndex = $(this).closest('[data-index]').data('index');
    const itemIndex = getItemIndexFromElement(event.currentTarget);
    console.log(itemIndex);
    deleteListItem(itemIndex);
    renderShoppingList();
  });
}

// this function will be our callback when the page loads. it's responsible for
// initially rendering the shopping list, and activating our individual functions
// that handle new item submission and user clicks on the "check" and "delete" buttons
// for individual shopping list items.
function handleShoppingList() {
  renderShoppingList();
  handleNewItemSubmit();
  handleItemCheckClicked();
  handleDeleteItemClicked();
  checkBoxSubmit();
  handleSearchTermSubmit();
}

// when the page loads, call `handleShoppingList`
$(handleShoppingList);
