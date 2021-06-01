const dragStart = (e)=> {
  // console.log('drag start');
  dragItem = e.currentTarget;
  const id = e.currentTarget.dataset.id
  const item = e.currentTarget.outerHTML;
  e.dataTransfer.setData('item', item);
  e.dataTransfer.setData('id', id);
}

const dragEnter = (e) => {
  e.preventDefault();
  // console.log("drag enter");
}

const dragEnd = () => {
  // console.log('drag end');
}

const dragOver = (e) => {
  e.preventDefault();
  // console.log('drag over');
}

const dragLeave = () => {
  // console.log('drag leave');
}

// Drop in Cart
const drop = (e) => {
  console.log('drop cart');
  if (dragItem.parentElement != dropZone) {
    const data = e.dataTransfer.getData('item');

    if (!e.currentTarget.querySelector('hide')) {
      e.currentTarget.querySelector('span').className += ' hide';
    }
    // Se bloquea y se difumina el elemento
    dragItem.setAttribute('draggable', false);
    dragItem.className += ' hide';

    // Se add el elemento del carrito
    e.currentTarget.innerHTML += data;

    // Se add a los elementos carrito su los eventos correspondientes
    const itemsCart = dropZone.querySelectorAll('.item');
    itemsCart.forEach(item => {
      item.addEventListener("dragstart", dragStart);
      item.addEventListener("dragend", dragEnd);
    });
  }
};


// Drop in Store
const dropStore = (e) => {
  // console.log('drop store');
  if (dragItem.parentElement != storeZone) {
    const id = e.dataTransfer.getData('id');
    const item = storeZone.querySelector(`[data-id="${id}"]`);
    item.classList.remove("hide");
    item.setAttribute('draggable', true);
    dropZone.removeChild(dragItem);

    if (dropZone.querySelectorAll('.item').length == 0) {
      dropZone.querySelector('span').classList.remove('hide');
    }
  }
}


// Reset todos los valores.
const reset = () => {
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


const init = ()=> {
  const dropZone = document.querySelector('#dropZone');
  const storeZone = document.querySelector('#storeZone');
  const items = storeZone.querySelectorAll('.item');
  const btnReset = document.querySelector('#btnReset');
  let dragItem;

  btnReset.addEventListener('click', reset);

  // items Listener
  items.forEach((item, i) => {
    item.addEventListener("dragstart", dragStart);
    item.addEventListener("dragend", dragEnd);
    item.dataset.id = i;
  });

  // Cart listener
  dropZone.addEventListener("dragover", dragOver);
  dropZone.addEventListener("dragenter", dragEnter);
  dropZone.addEventListener("dragleave", dragLeave);
  dropZone.addEventListener("drop", drop);


  // Store listener
  storeZone.addEventListener("dragover", dragOver);
  storeZone.addEventListener("dragenter", dragEnter);
  storeZone.addEventListener("dragleave", dragLeave);
  storeZone.addEventListener("drop", dropStore);
}


window.onload = init();