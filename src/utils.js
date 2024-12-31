const isDisabled = (element, elementDisabledClass = null) => {
    if (!element || element.nodeType !== Node.ELEMENT_NODE) {
        return true
    }

    const containsPassedInDisabledClass = elementDisabledClass && this.element.classList.contains(elementDisabledClass);

    if (element.classList.contains('disabled') || containsPassedInDisabledClass) {
        return true
    }

    if (typeof element.disabled !== 'undefined') {
        return element.disabled
    }

    return element.hasAttribute('disabled') && element.getAttribute('disabled') !== 'false';
};

export {isDisabled};