import './scrollspy.css';

const ScrollSpy = (function () {
    function parseOptions(optionString = '') {
        const defaultOptions = {
            'hidden': true,
            'delay': 300,
            'target': false,
            'cls': 'animate-fade',
            'stagger': true,
            'repeat': false,
        };

        const providedOptions = optionString ? optionString.split(';').reduce((options, currentOption) => {
            const [key, value] = currentOption.split(':').map(part => part.trim());
            options[key] = value === 'true' ? true : (value === 'false' ? false : (isNaN(Number(value)) ? value : Number(value)));
            return options;
        }, {}) : {};

        // Merge defaultOptions with providedOptions
        return { ...defaultOptions, ...providedOptions };
    }

    function intersectObserve() {
        const intersectionObserver = new IntersectionObserver((entries) => {
            let staggerDelay = 0; // Initial delay for staggering effect

            entries.forEach(entry => {
                const { target, isIntersecting } = entry;
                const directOptions = target.getAttribute('sz-scrollspy');
                const parentOptions = target.closest('[sz-scrollspy]').getAttribute('sz-scrollspy');
                const overrideClass = target.getAttribute('sz-scrollspy-class');
                const options = parseOptions(directOptions || parentOptions);
                const cls = overrideClass || options.cls;
                const repeat = options.repeat !== undefined ? options.repeat : false;

                if (isIntersecting) {
                    staggerDelay = options.stagger ? staggerDelay : options.delay
                    setTimeout(() => {
                        window.requestAnimationFrame(() => {
                            target.classList.add(cls);
                            target.style.visibility = 'visible';
                            if (!repeat) {
                                intersectionObserver.unobserve(target);
                            }
                        });
                    }, staggerDelay); // Apply staggered delay
                    // Increment the staggerDelay for the next element
                    if (options.stagger) {
                        staggerDelay += options.delay; // Increment by the delay time
                    }
                } else if (repeat && target.classList.contains(cls)) {
                    target.classList.remove(cls);
                    if (options.hidden) {
                        target.style.visibility = 'hidden';
                    }
                }
            });
        }, {
            root: null,
            threshold: 0.5,
        });

        return intersectionObserver;
    }

    function mutateObserve(intersectionObserver) {
        return new MutationObserver((list) => {
            for (const mutation of list) {
                mutation.addedNodes.forEach((addedNode) => {
                    if (addedNode.nodeType === Node.ELEMENT_NODE) {
                        addedNode.style.visibility = 'hidden';
                        intersectionObserver.observe(addedNode)
                    }
                });
            }
        })
    }

    function init() {
        document.addEventListener('DOMContentLoaded', () => {
            document.querySelectorAll('[sz-scrollspy]').forEach(container => {
                const intersectionObserver = intersectObserve()
                const mutationObserver = mutateObserve(intersectionObserver)

                mutationObserver.observe(container, { childList: true, subtree: true })
                const options = parseOptions(container.getAttribute('sz-scrollspy'));
                let targets = [];

                if (options.target) {
                    if (options.target.startsWith('> ')) {
                        // Handling direct children selector
                        const selector = options.target.slice(2).trim();
                        targets = Array.from(container.children).filter(child => child.matches(selector));
                    } else {
                        // General selector
                        targets = Array.from(container.querySelectorAll(options.target));
                    }
                } else {
                    targets = [container]; // Apply to the container itself if no target is specified
                }

                targets.forEach((target) => {
                    if (options.hidden) target.style.visibility = 'hidden'; // Apply initial hidden state if specified

                    intersectionObserver.observe(target)
                });
            });
        });
    }

    return {
        init: init
    };
})();

export default ScrollSpy;
