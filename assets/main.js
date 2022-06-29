const dragableLists = document.querySelector(".dragableLists");
const btnELe = document.querySelector(".check");


const richestPerson = [
    'Mark zukarburg',
    'Bill Gates',
    'Elon Musk',
    'Mukesh Ambani',
    'Larry Ellison',
    'Sergey Brin',
    'Jeff Bezos',
    'Gautam Adani',
    'Bernard Arnault',
    'Steve Ballmer',
];


const listItems = []; 
let dragStartIndex;

createList();

function checkOver(){
    listItems.forEach((listItem,index)=>{
        const personName = listItem.querySelector(".dragable").innerText.trim();
        console.log(personName);
        if(personName !== richestPerson[index]){
            listItem.classList.add("wrong");
        }else{
            listItem.classList.remove("wrong");
            listItem.classList.add("right");
        }
    })
}

function createList(){
    [...richestPerson]
    .map(a => ({ value:a, sort: Math.random()}))
    .sort((a,b) =>(a.sort - b.sort))
    .map (a => a.value)
    .forEach((person,index)=>{
        
        const listItem = document.createElement("li");
        listItem.setAttribute("date-index", index);
        listItem.innerHTML= `<span class="indexNumber">${index+1}</span> <div class="fullli dragable align-self-center" draggable=true><p class="person">${person}</p>  <i class="fa fa-bar">=</i></div>`
        listItems.push(listItem);
        dragableLists.appendChild(listItem);
    });
    addEventListeners();
}

function dragStart(){
    // console.log('Event ', 'dragstart');
    dragStartIndex = +this.closest('li').getAttribute('date-index');

}
function dragDrop(){
    // console.log('Event ', 'drop');
    const dragEndIndex = +this.getAttribute('date-index');
    swapItem(dragStartIndex,dragEndIndex);
}
function dragEnter(){
    // console.log('Event ', 'dragenter');
     this.classList.add('over');
}
function dragLeave(){
    // console.log('Event ', 'dragleave');
    this.classList.remove('over');
}
function dragOver(event){
    // console.log('Event ', 'dragover');
    event.preventDefault();
}

function swapItem(fromIndex,toIndex){
 const indexOne = listItems[fromIndex].querySelector(".dragable"); 
 const indexTwo = listItems[toIndex].querySelector(".dragable"); 
 listItems[fromIndex].appendChild(indexTwo);
 listItems[toIndex].appendChild(indexOne);

}
function addEventListeners(){
    const dragables = document.querySelectorAll(".dragable");
    const dragableListsItem = document.querySelectorAll(".dragableLists li");

    dragables.forEach(dragable=>{
        dragable.addEventListener("dragstart",dragStart);
        
    });
    
    dragableListsItem.forEach(item=>{
        item.addEventListener("dragover",dragOver);
        item.addEventListener("drop",dragDrop);
        item.addEventListener("dragenter",dragEnter);
        item.addEventListener("dragleave",dragLeave);
        
    });
}

btnELe.addEventListener("click",checkOver);
