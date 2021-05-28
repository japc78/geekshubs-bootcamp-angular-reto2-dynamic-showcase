const dropZone = document.querySelector('#dropZone');
const items = document.querySelectorAll('.item');
let dragItem;

function dragStart(e) {
  console.log('drag start');
  dragItem = this;
  e.dataTransfer.setData('item', this.cloneNode(true).innerHTML);
}

function dragEnd() {
  console.log('drag end');
  // this.setAttribute('draggable', false);
}


function dragEnter(e) {
  e.preventDefault();
  console.log("drag enter");
}

function dragOver(e) {
  e.preventDefault();
  console.log('drag over');
}

function dragLeave() {
  console.log('drag leave');
}

// function drop(e) {
//   console.log('drop');
//   data = e.dataTransfer.getData('item');
//   this.innerHTML += data;
//   console.log(data);
// }

const drop = (e) => {
  console.log(e);
  console.log('drop');
  data = e.dataTransfer.getData('item');
  e.currentTarget.querySelector('span').className += ' hide';
  dragItem.setAttribute('draggable', false);
  dragItem.className += ' hide';
  e.currentTarget.innerHTML += data;
  console.log(data);
}

// items Listener
items.forEach(item => {
  item.addEventListener("dragstart", dragStart);
  item.addEventListener("dragend", dragEnd)
});

// Cart listener
dropZone.addEventListener("dragover", dragOver);
dropZone.addEventListener("dragenter", dragEnter);
dropZone.addEventListener("dragleave", dragLeave);
dropZone.addEventListener("drop", drop);


