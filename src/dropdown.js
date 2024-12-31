import {autoUpdate, computePosition, flip, limitShift, offset, shift} from '@floating-ui/dom';

console.info('Give me LIGHT')

const DefaultConfig = {
  autoClose: true,
  offset: [0, 2],
  focusMode: 'real',
  rootElement: document,
  classes: {
    dropdownWrapper: 'dropdown',
    dropdownMenu: 'dropdown-menu',
    dropdownItem: 'dropdown-item',
    dropdownText: 'dropdown-text'
  }
}

class Dropdown {
  constructor(element, config) {
    this._element = element;
    this._config = this._mergeConfig(config);

    this._floatingUI = null;

    this._parent = this._element.closest(`:has(${this._config.classes.dropdownMenu})`);
    this._menu = this._parent.querySelector(`${this._config.classes.dropdownMenu}`);

    this._setEvents();

  }

  _mergeConfig(config) {
    return {
      ...DefaultConfig,
      ...config,
    }
  }

  _setEvents() {

  }

  _createFloatingUI() {
    const updatePosition = () => {
      computePosition(this._element, this._menu, {
        placement: 'bottom-start',
        middleware: [
          offset({
            mainAxis: this._config.offset[1],
            crossAxis: this._config.offset[0],
          }), flip(), shift({ padding: 8 })
        ]
      }).then(({x, y}) => {
        Object.assign(this._menu.style, {
          left: `${x}px`,
          top: `${y}px`,
        });
      });
    };

    autoUpdate(this._element, this._menu, updatePosition);
  }
}
