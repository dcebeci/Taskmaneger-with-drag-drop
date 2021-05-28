// UI vars
let form = document.getElementById("addTaskForm");
let input = document.getElementById('txtTaskName');
let textArea = document.getElementById('textAreaDetails');
let dateTime = document.getElementById('dateAndTime');
let btnDeleteAll = document.getElementById('btnDeleteAll');
let addDiv = document.getElementById('add');
let deleteItems= document.getElementById('delete-item');
let items;

loadItems();
function loadItems() {
    items = getItemsFromLS();
    items.forEach(function (item) {
        createItem(item);
    });
}

eventListeners();

function eventListeners() {
    // submit event
    form.addEventListener('submit', addNewItem);
    // delete all items
    btnDeleteAll.addEventListener('click', deleteAllItems);
}


// add new item
function addNewItem(e) {
    if (input.value === '') {
        alert('add new item');
    }
    else{
        // create item
        createItem();
    }
    // clear input
    input.value = '';
    textArea.value ='';
    dateTime.value='';
    e.preventDefault();

}
// creat item
function createItem() {
    // create partition
    const part = document.createElement('div');
    addDiv.appendChild(part);
    part.setAttribute('id','addDiv')
    part.setAttribute('draggable','true');
    part.setAttribute('ondragstart','drag(event)' );
    part.innerHTML = input.value+'<br>'+textArea.value+'<br>'+dateTime.value+'</div>';
    setItemToLS(part);
}

function allowDrop(event) {
    event.preventDefault();

}
function drag(event) {
    event.dataTransfer.setData("text", event.target.id);
    deleteItems.style.display = "block";
}
function drop(event) {
    event.preventDefault();
    var data = event.dataTransfer.getData("text");
    event.target.appendChild(document.getElementById(data));
    deleteItems.lastChild.remove();
    deleteItems.style.display = "none";
}


// set LS
function setItemToLS(text){
    items = getItemsFromLS();
    items.push(text);
    localStorage.setItem('items',JSON.stringify(items));
}

// get LS
function getItemsFromLS(){
    if(localStorage.getItem('items')===null){
        items = [];
    }else{
        items = JSON.parse(localStorage.getItem('items'));
    }
    return items;
}
// delete all items
function deleteAllItems(e) {

    if (confirm('Onaylıyor musunuz?')) {
        while(addDiv.firstChild){
            addDiv.removeChild(addDiv.firstChild);
        }
        localStorage.clear();
        location.reload();
    }
    e.preventDefault();
}
