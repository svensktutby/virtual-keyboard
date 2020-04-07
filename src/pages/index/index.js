import 'normalize.css';
import './index.scss';
import {
  setKeysName, setKeysSize, isCharKey, typeChar,
} from '../../components/utils';

const config = require('../../components/data');

const lang = window.localStorage.getItem('lang') || 'en';
const upperCase = window.localStorage.getItem('upperCase') || 'lower';

function renderKeyboard() {
  document.body.innerHTML = `<div class='container'>
                            <div class='keyboard-wrapper'>
                              <div class="screen">
                                <div class="message">
                                  <span class="message__text">
                                    ControlLeft (&#8963;) + AltLeft (&#8997;) toggle languages
                                  </span>
                                  </div>
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
    key.dataset.key = `${config[item][lang][upperCase]}`;
    key.innerHTML = `${setKeysName(config[item][lang][upperCase])}`;

    fragment.append(key);
  });

  document.querySelector('#keyboard').append(fragment);

  if (upperCase === 'upper') {
    document.querySelector('#CapsLock').classList.add('active');
  }
}

function initKeyboard() {
  renderKeyboard();
  renderKeys();
}
initKeyboard();

const keyboard = document.querySelector('#keyboard');
const textEdit = document.querySelector('#text-edit');
const keyList = keyboard.querySelectorAll('.key');
let isUpperCase = upperCase !== 'lower';
let isEnglish = lang === 'en';
const pressed = new Set();

function toggleKeysChar(currentLang = lang, caps = upperCase) {
  window.localStorage.setItem('lang', currentLang);
  window.localStorage.setItem('upperCase', caps);

  keyList.forEach((item) => {
    if (isCharKey(item)) {
      const code = item.id;
      // eslint-disable-next-line no-param-reassign
      item.textContent = setKeysName(config[code][currentLang][caps]);
    }
  });
}

const toggleLang = () => {
  if (isEnglish) {
    isEnglish = false;
    toggleKeysChar('ru', upperCase);
  } else {
    isEnglish = true;
    toggleKeysChar('en', upperCase);
  }
};

const toggleCaps = () => {
  const currentLang = window.localStorage.getItem('lang') || 'en';
  if (!isUpperCase) {
    isUpperCase = true;
    toggleKeysChar(currentLang, 'upper');
  } else {
    isUpperCase = false;
    toggleKeysChar(currentLang, 'lower');
  }
};

document.addEventListener('keydown', (evt) => {
  const {
    code,
    key,
  } = evt;

  const targetKey = keyboard.querySelector(`#${code}`);

  if (targetKey) {
    targetKey.classList.add('active');

    if (targetKey.id === 'ArrowUp'
      || targetKey.id === 'ArrowLeft'
      || targetKey.id === 'ArrowRight'
      || targetKey.id === 'ArrowDown') {
      textEdit.focus();
    } else {
      typeChar(textEdit, targetKey, evt);
    }
  }

  if (key === 'Shift' || key === 'CapsLock') {
    toggleCaps();
  }

  if (code === 'ControlLeft' || code === 'AltLeft') {
    pressed.add(code);

    if (pressed.has('ControlLeft') && pressed.has('AltLeft')) {
      pressed.clear();

      toggleLang();
    }
  }
});

document.addEventListener('keyup', (evt) => {
  const {
    code,
    key,
  } = evt;

  const targetKey = keyboard.querySelector(`#${code}`);

  if (targetKey) {
    targetKey.classList.remove('active');
  }

  if (key === 'Shift' || key === 'CapsLock') {
    toggleCaps();
  }
});

keyboard.addEventListener('mousedown', (evt) => {
  const {
    target,
  } = evt;

  if (target.classList.contains('key')) {
    typeChar(textEdit, target, evt);
  }

  if (target.dataset.key === 'Shift') {
    toggleCaps();
  }

  if (target.dataset.key === 'CapsLock') {
    toggleCaps();

    if (isUpperCase) {
      target.classList.add('active');
    } else {
      target.classList.remove('active');
    }
  }

  if (target.id === 'ControlLeft' || target.id === 'AltLeft') {
    pressed.add(target.id);

    if (pressed.has('ControlLeft') && pressed.has('AltLeft')) {
      pressed.clear();

      toggleLang();
    }
  }
});

keyboard.addEventListener('mouseup', (evt) => {
  const {
    target,
  } = evt;

  if (target.dataset.key === 'Shift') {
    toggleCaps();
  }
});
