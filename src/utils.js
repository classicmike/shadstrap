const isDisabled = element => {
    if (!element || element.nodeType !== Node.ELEMENT_NODE) {
        return true
    }

    if (element.classList.contains('disabled')) {
        return true
    }

    if (typeof element.disabled !== 'undefined') {
        return element.disabled
    }

    return element.hasAttribute('disabled') && element.getAttribute('disabled') !== 'false'
}

const SelectorEngine = {
    find(selector, element = document.documentElement) {
        return [].concat(...Element.prototype.querySelectorAll.call(element, selector))
    },

    findOne(selector, element = document.documentElement) {
        return Element.prototype.querySelector.call(element, selector)
    },

    children(element, selector) {
        return [].concat(...element.children).filter(child => child.matches(selector))
    },

    parents(element, selector) {
        const parents = []
        let ancestor = element.parentNode.closest(selector)

        while (ancestor) {
            parents.push(ancestor)
            ancestor = ancestor.parentNode.closest(selector)
        }

        return parents
    },

    prev(element, selector) {
        let previous = element.previousElementSibling

        while (previous) {
            if (previous.matches(selector)) {
                return [previous]
            }

            previous = previous.previousElementSibling
        }

        return []
    },
    // TODO: this is now unused; remove later along with prev()
    next(element, selector) {
        let next = element.nextElementSibling

        while (next) {
            if (next.matches(selector)) {
                return [next]
            }

            next = next.nextElementSibling
        }

        return []
    },
    closest(element, selector) {
        return Element.prototype.closest.call(element, selector)
    },
    getSelectorFromElement(element) {
        const selector = getSelector(element)

        if (selector) {
            return SelectorEngine.findOne(selector) ? selector : null
        }

        return null
    },

    getElementFromSelector(element) {
        const selector = getSelector(element)

        return selector ? SelectorEngine.findOne(selector) : null
    },

    getMultipleElementsFromSelector(element) {
        const selector = getSelector(element)

        return selector ? SelectorEngine.find(selector) : []
    }
}

export { isDisabled, SelectorEngine };