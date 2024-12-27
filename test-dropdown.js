import { computePosition, offset, flip, shift, autoUpdate } from './node_modules/@floating-ui/dom/dist/floating-ui.dom.mjs';

const trigger = document.querySelector('.dropdown-trigger');
const menu = document.querySelector('.dropdown-menu');

const toggleDropdown = (event) => {
    event.preventDefault();

    const isVisible = menu.classList.contains('show');
    if(isVisible) {
        menu.classList.remove('show');
    } else {
        menu.classList.add('show');
        updatePosition();
    }
}

const updatePosition = () => {
    computePosition(trigger, menu, {
        placement: 'bottom-start',
        middleware: [offset(8), shift()],
    }).then(({ x, y}) => {
        Object.assign(menu.style, {
            left: `${x}px`,
            top: `${y}px`,
        });
    })
}

autoUpdate(trigger, menu, updatePosition);

trigger.addEventListener('click', toggleDropdown);

document.addEventListener('click', (event) => {
    if(!menu.contains(event.target) && !trigger.contains(event.target)) {
        menu.classList.remove('show');
    }
});
