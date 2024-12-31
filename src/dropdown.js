import {autoUpdate, computePosition, flip, offset, shift} from '@floating-ui/dom';
import {isDisabled} from "./utils";

const DROPDOWN_BASE_KEY = 'sstr.dropdown';

const DefaultConfig = {
    autoClose: true,
    offset: [0, 2],
    focusMode: 'real',
    rootElement: document,
    classes: {
        dropdownWrapper: 'dropdown',
        dropdownMenu: 'dropdown-menu',
        dropdownItem: 'dropdown-item',
        dropdownText: 'dropdown-text',
        show: 'show',
        disabled: 'disabled',
    },
    events: {
        show: `show.${DROPDOWN_BASE_KEY}`,
        shown: `show.${DROPDOWN_BASE_KEY}`,
        hide: `hide.${DROPDOWN_BASE_KEY}`,
        hidden: `hidden.${DROPDOWN_BASE_KEY}`,
    }
};

class Dropdown {
    constructor(element, config) {
        this._element = element;
        this._config = this._mergeConfig(config);

        this._initialisedFloatingUICleanup = null;

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

    _isShown() {
        return this._menu.classList.contains(this._config.classes.show);
    }

    _isDisabled() {
        return isDisabled(this._element, this._config.classes.disabled);
    }

    _setEvents() {

    }

    _toggle() {
        return this._isShown() ? this._hide() : this._show();
    }

    _show() {
        if (this._isDisabled() || this._isShown()) {
            return;
        }

        const showEvent = new Event(this._config.events.show, {bubbles: true, cancelable: true});
        showEvent.relatedTarget = this._element;
        this._element.dispatchEvent(showEvent);

        this._createFloatingUI();

        // look at the touch start bit
        this._element.focus();
        this._element.setAttribute('aria-expanded', true);

        this._element.classList.add(this._config.classes.show);
        this._menu.classList.add(this._config.classes.show);
        this._updateFloatingUIPosition();

        const shownEvent = new Event(this._config.events.shown, {bubbles: true, cancelable: true});
        shownEvent.relatedTarget = this._element;
        this._element.dispatchEvent(shownEvent);
    }

    _hide() {
        if (this._isDisabled() || !this._isShown()) {
            return;
        }

        this._completeHide();
    }

    _completeHide() {
        const hideEvent = new Event(this._config.events.hide, {bubbles: true, cancelable: true});
        hideEvent.relatedTarget = this._element;
        this._element.dispatchEvent(hideEvent);

        if (this._hasFloatingUI()) {
            this._destroyFloatingUI();
        }

        this._menu.classList.remove(this._config.classes.show);
        this._element.classList.remove(this._config.classes.show);
        this._element.setAttribute('aria-expanded', 'false');

        const hiddenEvent = new Event(this._config.events.hidden, {bubbles: true, cancelable: true});
        hiddenEvent.relatedTarget = new Event(this._config.events.hidden, {bubbles: true, cancelable: true});
        this._element.dispatchEvent(hiddenEvent);
    }

    _createFloatingUI() {
        this._initialisedFloatingUICleanup = autoUpdate(this._element, this._menu, this._updateFloatingUIPosition);
    }

    _hasFloatingUI() {
        return !!this._initialisedFloatingUICleanup;
    }

    _destroyFloatingUI() {
        this._initialisedFloatingUICleanup();
        this._initialisedFloatingUICleanup = null;
    }

    _updateFloatingUIPosition() {
        computePosition(this._element, this._menu, {
            placement: 'bottom-start',
            middleware: [
                offset({
                    mainAxis: this._config.offset[1],
                    crossAxis: this._config.offset[0],
                }), flip(), shift({padding: 8})
            ]
        }).then(({x, y}) => {
            Object.assign(this._menu.style, {
                left: `${x}px`,
                top: `${y}px`,
            });
        });
    }
}

export default Dropdown;
