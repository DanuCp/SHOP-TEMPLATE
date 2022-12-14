const cartCounterLabel = document.querySelector('#cart-counter-label');
const contentContainer = document.querySelector('#content-container');

let cartCounter = 0;
let cartPrice = 0;

const incrementCounter = (label, count) => {
  const counter = count + 1;
  label.innerHTML = `${counter}`;
  if (counter === 1) cartCounterLabel.style.display = 'block';
  return counter;
};

const getMockData = (t) => +t.parentElement
  .previousElementSibling
  .innerHTML
  .replace(/^\$(\d+)\s\D+(\d+).*$/, '$1.$2');

const getPrice = (t, c) => Math.round((c + getMockData(t)) * 100) / 100;

const disableControls = (t, fn) => {
  contentContainer.removeEventListener('click', fn);
  t.disabled = true;
};

const enableControls = (t, fn) => {
  contentContainer.addEventListener('click', fn);
  t.disabled = false;
};

const btnClickHandler = (e) => {
  const target = e.target;
  const interval = 1000;
  let restoreHTML = null;

  if (typeof target !== 'object') {
    console.error('target не является объектом.');
    return;
  }

  if (target && target.classList.contains('item-actions__cart')) {

    cartCounter = incrementCounter(cartCounterLabel, cartCounter);
    cartPrice = getPrice(target, cartPrice);
    restoreHTML = target.innerHTML;
    target.innerHTML = `Added ${cartPrice.toFixed(2)} $`;
    disableControls(target, btnClickHandler);

    setTimeout(() => {
      target.innerHTML = restoreHTML;
      enableControls(target, btnClickHandler);
    }, interval);
  }
};

contentContainer.addEventListener('click', btnClickHandler);
