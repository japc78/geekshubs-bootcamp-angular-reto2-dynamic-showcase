const dropZone = document.querySelector('#dropZone');
const items = document.querySelectorAll('.item');
const btnReset = document.querySelector('#btnReset');

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
  // console.log(data);
};

const reset = () => {
  console.log("pass reset");
  let txt = dropZone.querySelector('span');
  while (dropZone.lastChild != txt) {
    dropZone.lastChild.remove();
  }

  txt.classList.remove('hide');

  items.forEach(item => {
    item.setAttribute('draggable', true);
    item.classList.remove('hide');
  });
};

btnReset.addEventListener('click', reset);

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


