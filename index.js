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
      <form id="update-form">
          <label for="update-entry">Update</label>
          <input type="text" name="update-entry" class="js-update-entry" placeholder="e.g., broccoli">
          <button type="submit" class="update-button">Update</button>
      </form>
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

const filterByKeyword = function(items){
  console.log('this is what comes in to filtered by keyword ' + items);
  if(STORE.boxChecked === true){
     items = items.filter(item=>item.checked === false);
  }
  return items;
}
const filterByChecked = function(items){
  console.log('this is what comes into filter by checked ' + items);
  if(STORE.searchTerm.length > 0){
    items = items.filter(item=>item.name.includes(STORE.searchTerm) === true);
  }
  return items;
}

function renderShoppingList() {
  // render the shopping list in the DOM
  const keyWordFiltered = filterByKeyword(STORE.items);
  const checkFiltered = filterByChecked(keyWordFiltered);
  const shoppingListItemsString = generateShoppingItemsString(checkFiltered);
  $('.js-shopping-list').html(shoppingListItemsString);
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
    addItemToShoppingList(newItemName);
    renderShoppingList();
  });
}

function handleSearchTermSubmit(){
  $('#searchTerm').submit(function(event){
    STORE.searchTerm = '';
    event.preventDefault();
    const term = $(".js-search-entry").val();
    STORE.searchTerm += term;
    console.log('this is the term added to the STORE: ' + STORE.searchTerm);
    renderShoppingList();
  });
}


function toggleCheckedForListItem(itemIndex) {
  console.log("Toggling checked property for item at index " + itemIndex);
  STORE.items[itemIndex].checked = !STORE.items[itemIndex].checked;
}

function updateForListItem(itemIndex, newName){
  STORE.items[itemIndex].name = newName;
}


function getItemIndexFromElement(item) {
  const itemIndexString = $(item)
    .closest('.js-item-index-element')
    .attr('data-item-index');
  return parseInt(itemIndexString, 10);
}

function handleItemCheckClicked() {
  $('.js-shopping-list').on('click', '.js-item-toggle', event => {
    console.log('`handleItemCheckClicked` ran');
    const itemIndex = getItemIndexFromElement(event.currentTarget);
    toggleCheckedForListItem(itemIndex);
    renderShoppingList();
  });
}


function handleUpdateSubmit(){
  $('#update-form').submit(function(event){
      console.log('handle update fired');
      event.preventDefault();
      const newName = $('.js-update-entry').val();
      const itemIndex = getItemIndexFromElement(event.currentTarget);
      updateForListItem(itemIndex, newName);
      renderShoppingList();
  });
}

// function updateChange(itemIndex){
//   STORE.items[itemIndex].name
// }
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
  handleUpdateSubmit();
}

// when the page loads, call `handleShoppingList`
$(handleShoppingList);
