import 'normalize.css';
import './index.scss';
import {
  setKeysName, setKeysSize, isCharKey, typeChar, runOnKeys,
} from '../../components/utils';

const config = require('../../components/data');

const lang = window.localStorage.getItem('lang') || 'en';

function renderKeyboard() {
  document.body.innerHTML = `<div class='container'>
                            <div class='keyboard-wrapper'>
                              <div class="screen">
                                <div class="window">
                                  <span></span>
                                  <textarea class='text-edit' name='text-edit' id='text-edit'></textarea>
                                </div>
                              </div>
                              <div class='keyboard' id='keyboard'>
                              </div>
                            </div>
                          </div>`;
}

function renderKeys() {
  const fragment = document.createDocumentFragment();

  Object.keys(config).forEach((item) => {
    const key = document.createElement('button');
    key.className = (`key ${setKeysSize(item)}`);
    key.type = 'button';
    key.id = `${item}`;
    key.dataset.key = `${config[item][lang].lower}`;
    key.innerHTML = `${setKeysName(config[item][lang].lower)}`;

    fragment.append(key);
  });

  document.querySelector('#keyboard').append(fragment);
}

function initKeyboard() {
  renderKeyboard();
  renderKeys();
}

initKeyboard();
const keyboard = document.querySelector('#keyboard');
const textEdit = document.querySelector('#text-edit');
const keyList = keyboard.querySelectorAll('.key');
let isUpperCase = false;
const pressed = new Set();

function toggleKeysChar(thisLang = lang, caps = 'lower') {
  window.localStorage.setItem('lang', thisLang);
  keyList.forEach((item) => {
    if (isCharKey(item)) {
      const code = item.id;
      // eslint-disable-next-line no-param-reassign
      item.textContent = setKeysName(config[code][lang][caps]);
    }
  });
}

const toggleLang = () => {
  if (lang === 'en') {
    toggleKeysChar('ru', 'lower');
  } else {
    toggleKeysChar('en', 'lower');
  }
};

const shiftHandler = () => {
  if (!isUpperCase) {
    isUpperCase = true;
    toggleKeysChar(lang, 'upper');
  } else {
    isUpperCase = false;
    toggleKeysChar(lang, 'lower');
  }
};

document.addEventListener('keydown', (evt) => {
  const {
    code,
    key,
  } = evt;

  pressed.add(code);

  keyboard.querySelector(`#${code}`).classList.add('active');
  textEdit.focus();

  if (key === 'Shift' || key === 'CapsLock') {
    shiftHandler();
  }

  if (pressed.has('MetaLeft') && pressed.has('Space')) {
    pressed.clear();
    toggleLang();
  }
});

document.addEventListener('keyup', (evt) => {
  const {
    code,
    key,
  } = evt;

  keyboard.querySelector(`#${code}`).classList.remove('active');

  if (key === 'Shift' || key === 'CapsLock') {
    shiftHandler();
  }
});

keyboard.addEventListener('mousedown', (evt) => {
  const {
    target,
  } = evt;

  if (target.classList.contains('key')) {
    typeChar(textEdit, target);
  }

  if (target.dataset.key === 'Shift' || target.dataset.key === 'CapsLock') {
    shiftHandler();
  }
});

keyboard.addEventListener('mouseup', (evt) => {
  const {
    target,
  } = evt;

  if (target.dataset.key === 'Shift') {
    shiftHandler();
  }
});