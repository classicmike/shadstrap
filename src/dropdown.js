import {isDisabled, SelectorEngine} from "./utils";

const SELECTOR_DROPDOWN_WRAPPER = ':has(.dropdown-menu)';
const SELECTOR_MENU = '.dropdown-menu';

const DROPDOWN_CLASS_NAME_SHOW = 'show';
const DROPDOWN_CLASSNAME_HIDE = 'hide';

const EVENT_SHOW = `show${EVENT_KEY}`;

class Dropdown {
    constructor(element, config) {
        this._element = element;
        this._config = config;

        this._floatingUI = null;
        this._parent = SelectorEngine.closest(SELECTOR_DROPDOWN_WRAPPER);
        this._menu = SelectorEngine.next(this._element, SELECTOR_MENU)[0] || SelectorEngine.prev(this._element, SELECTOR_MENU)[0] || SelectorEngine.findOne(SELECTOR_MENU, this._parent);

        // navbar...... Let's see
    }

    show() {
        if (isDisabled(this._element)) {
            return;
        }

        const relatedTarget = {
            relatedTarget: this._element
        }

        const showEvent = EventHandler.trigger(this._element, EVENT_SHOW);

        if (showEvent.defaultPrevented) {
            return;
        }

        // create create floating UI
        this._createFloatingUI();

        this._element.focus();
        this._element.setAttribute('aria-expanded', true);

        this._menu.classList.add(DROPDOWN_CLASS_NAME_SHOW);
        this._menu.classList.add(DROPDOWN_CLASS_NAME_SHOW);

    }

    _createFloatingUI() {

    }
}