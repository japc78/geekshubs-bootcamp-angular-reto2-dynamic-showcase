const cartZone = document.querySelector('#cartZone');
const storeZone = document.querySelector('#storeZone');
const items = storeZone.querySelectorAll('.item');
const btnReset = document.querySelector('#btnReset');
const total = document.querySelector('#total');
let dragItem;

// items Listener
items.forEach((item, i) => {
  item.addEventListener("dragstart", dragStart);
  item.addEventListener("dragend", dragEnd);
  item.dataset.id = i;
});

btnReset.addEventListener('click', reset);

// Cart listener
cartZone.addEventListener("dragover", dragOver);
cartZone.addEventListener("dragenter", dragEnter);
cartZone.addEventListener("dragleave", dragLeave);
cartZone.addEventListener("drop", dropCart);

// Store listener
storeZone.addEventListener("dragover", dragOver);
storeZone.addEventListener("dragenter", dragEnter);
storeZone.addEventListener("dragleave", dragLeave);
storeZone.addEventListener("drop", dropStore);

function dragStart(e) {
  // console.log('drag start');
  dragItem = this;
  const parent = this.parentElement;

  if (parent == storeZone) {
    if (!cartZone.classList.contains('dragOver'))
      cartZone.className += ' dragOver';
  } else {
    if (!storeZone.classList.contains('dragOver'))
      storeZone.className += ' dragOver';
  }

  const item = dragItem.outerHTML;
  const id = dragItem.dataset.id;
  const price = dragItem.querySelector('.product').dataset.price;
  e.dataTransfer.setData('item', item);
  e.dataTransfer.setData('id', id);
  e.dataTransfer.setData('price',price);
}

function dragEnd() {
  // console.log('drag end');
  const parent = this.parentElement;
  if (parent == storeZone) {
    cartZone.classList.remove('dragOver');
  } else {
    storeZone.classList.remove('dragOver');
  }
}

function dragEnter(e) {
  e.preventDefault();
  // console.log("drag enter");
}

function dragOver(e) {
  e.preventDefault();
  if (this != dragItem.parentElement && !this.classList.contains('dragOver'))
    this.className += ' dragOver';
  // console.log('drag over');
}

function dragLeave() {
  // console.log('drag leave');
  this.classList.remove('dragOver');
}

// Drop in Cart
function dropCart(e) {
  // console.log('drop cart');
  if (dragItem.parentElement != cartZone) {
    this.classList.remove('dragOver');

    const data = e.dataTransfer.getData('item');

    if (!this.querySelector('hide')) {
      this.querySelector('span').className += ' hide';
    }
    // Se bloquea y se difumina el elemento
    dragItem.setAttribute('draggable', false);
    dragItem.className += ' hide';

    // Se add el elemento del carrito
    this.innerHTML += data;

    // Se add a los elementos carrito su los eventos correspondientes
    const itemsCart = cartZone.querySelectorAll('.item');
    itemsCart.forEach(item => {
      item.addEventListener("dragstart", dragStart);
      item.addEventListener("dragend", dragEnd);
    });

    // Se suma el producto
    const totalCart = parseFloat(total.innerHTML) + parseFloat(e.dataTransfer.getData('price'));
    resultTotal(totalCart);
  }
};

// Drop in Store
function dropStore(e) {
  // console.log('drop store');
  if (dragItem.parentElement != storeZone) {
    this.classList.remove('dragOver');

    const id = e.dataTransfer.getData('id');
    const item = storeZone.querySelector(`[data-id="${id}"]`);
    item.classList.remove("hide");
    item.setAttribute('draggable', true);
    cartZone.removeChild(dragItem);

    // Se resta el producto
    const totalCart = parseFloat(total.innerHTML) - parseFloat(e.dataTransfer.getData('price'));
    total.innerHTML = (totalCart.toFixed(2) > 0) ? totalCart.toFixed(2) + "€": "0 €";

    // Se muestra el mensaje
    if (cartZone.querySelectorAll('.item').length == 0) {
      cartZone.querySelector('span').classList.remove('hide');
    }
  }
}

// Reset todos los valores.
function reset() {
  let txt = cartZone.querySelector('span');
  while (cartZone.lastChild != txt) {
    cartZone.lastChild.remove();
  }

  txt.classList.remove('hide');

  items.forEach(item => {
    item.setAttribute('draggable', true);
    item.classList.remove('hide');
  });

  total.innerHTML = 0;
};

function resultTotal(totalCart) {
  total.innerHTML = (totalCart.toFixed(2) > 0) ? totalCart.toFixed(2) + "€" : "0 €";
}