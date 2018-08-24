
const STORE = [
  {name: 'apples', checked: false},
  {name: 'milk', checked: false},
  {name: 'bread', checked: false},
  {name: 'oranges', checked: false},
];

function generateItemHtml(item, itemIndex) {
    return `<li data-index="${itemIndex}">
        <span class="shopping-item">${item.name}</span>
        <div class="shopping-item-controls">
            <button class="shopping-item-toggle">
                <span class="button-label">check</span>
            </button>
            <button class="shopping-item-delete">
                <span class="button-label">delete</span>
            </button>
        </div>
    </li>`;
}

function renderShoppingList(){
  console.log('this is firing');
  //this function will be resonsible for rendering
  //the shopping list in the dom
  const elements = STORE.map((item, index) => {

    return generateItemHtml(item, index);
  });
  const shoppingListItemsString = elements.join();
   $('.js-shopping-list').html(shoppingListItemsString);
}

function handleNewItemSubmit() {
  //this function will be responsible for when users add a new shopping
  //list item
  $('#js-shopping-list-form').submit(function(event) {
        event.preventDefault();
        let itemName = $('.js-shopping-list-entry').val();
        STORE.push({name: itemName, checked: false});
        console.log(STORE);
    });
    renderShoppingList();

}

function handleItemCheckClicked(){
  //listen for when a user clicks the check button
  $(".shopping-item-toggle").on("click", function(){
    //retrieve the items index in the STORE attribute
    const anIndex = $(this).closest('[data-index]').data('index');
    console.log(anIndex);
    let item = getItemIndexFromElement(anIndex);
    console.log(item);
    //Toggle the ckecked property for the item in STORE
     item.checked === true ? item.checked = false: item.checked = true;
    //Re-render the shopping list
    renderShoppingList();
  });
}

function getItemIndexFromElement(index){
  return STORE[index];
}


function handleDeleteItemClicked(){
  //delete items from the list
}

function handleShoppingList(){
  renderShoppingList();
  handleNewItemSubmit();
  handleItemCheckClicked();
  handleDeleteItemClicked();
}

$(handleShoppingList);
