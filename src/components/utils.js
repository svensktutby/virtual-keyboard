function setKeysName(item) {
  switch (item) {
    case 'Backspace':
      return '&#9003;';

    case 'Tab':
      return '&#8677;';

    case 'CapsLock':
      return '&#8682;';

    case 'Enter':
      return '&#8629;';

    case 'Shift':
      return '&#8679;';

    case 'Control':
      return '&#8963;';

    case 'Alt':
      return '&#8997;';

    case 'Meta':
      return '&#8984;';

    case 'Space':
      return '';

    case 'ArrowUp':
      return '&#8593;';

    case 'ArrowLeft':
      return '&#8592;';

    case 'ArrowRight':
      return '&#8594;';

    case 'ArrowDown':
      return '&#8595;';

    default:
      return item;
  }
}

function setKeysSize(item) {
  switch (item) {
    case 'Backspace':
    case 'Tab':
      return 'key--wide';

    case 'CapsLock':
      return 'key--wider key--caps-lock';

    case 'Enter':
      return 'key--wider';

    case 'ShiftLeft':
    case 'ShiftRight':
      return 'key--widest';

    case 'MetaLeft':
    case 'MetaRight':
      return 'key--wide';

    case 'Space':
      return 'key--ultra-wide';

    case 'ArrowUp':
      return 'key--short';

    case 'ArrowDown':
      return 'key--short key--down';

    default:
      return '';
  }
}

function isCharKey(key) {
  const text = key.textContent.trim();
  return text.length && text.charCodeAt(0) < 8500;
}

function typeChar(where, target) {
  const dataCode = target.id;
  const node = where;

  if (isCharKey(target)) {
    node.value += target.textContent.trim();
  } else {
    switch (dataCode) {
      case 'Backspace':
        node.value = node.value.slice(0, -1);
        break;

      case 'Space':
        node.value += ' ';
        break;

      case 'Tab':
        node.value += '\t';
        break;

      case 'Enter':
        node.value += '\n';
        break;

      default:
        break;
    }
  }
}

function runOnKeys(func, ...codes) {
  const pressed = new Set();
  document.addEventListener('keydown', (evt) => {
    pressed.add(evt.code);

    for (let i = 0; i < codes.length; i++) {
      if (!pressed.has(codes[i])) {
        return;
      }
    }

    pressed.clear();
    func();
  });
  document.addEventListener('keyup', (evt) => {
    pressed.delete(evt.code);
  });
}

export {
  setKeysName, setKeysSize, isCharKey, typeChar, runOnKeys,
};