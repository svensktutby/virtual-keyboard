import 'normalize.css';
import './index.scss';

document.body.innerHTML = `<div class="container">
                            <div class="keyboard-wrapper">
                              <textarea class="screen" name="screen" id="screen"></textarea>
                              <div class="keyboard" id="keyboard">
                              </div>
                            </div>
                          </div>`;
const keyboard = [96, 49, 50, 51, 52, 53, 54, 55, 56, 57,
  48, 45, 61, 113, 119, 101, 114, 116, 121, 117,
  105, 111, 112, 91, 93, 92, 97, 115, 100, 102,
  103, 104, 106, 107, 108, 59, 39, 122, 120, 99,
  118, 98, 110, 109, 44, 46, 47, 32];
// document.onkeypress = function (evt) {
//   keyboard.push(evt.charCode);
//   console.log(keyboard);
// };

const keyboardNode = document.querySelector('#keyboard');

function init(arr) {
  keyboardNode.innerHTML = arr.reduce((str, item) => `${str}<button class="key" type="button" data-code="${item}">
                            ${String.fromCharCode(item)}</button>`, '');
}

init(keyboard);
const keyNodeList = keyboardNode.querySelectorAll('.key');

document.onkeypress = function (evt) {
  keyNodeList.forEach((key) => key.classList.remove('active'));
  keyboardNode.querySelector(`.key[data-code="${evt.keyCode}"]`).classList.add('active');
};

keyboardNode.addEventListener('click', (evt) => {
  const { target } = evt;

  if (target.classList.contains('key')) {
    keyNodeList.forEach((key) => key.classList.remove('active'));
    target.classList.add('active');
  }
});