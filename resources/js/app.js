import './bootstrap';

import Alpine from 'alpinejs';

window.Alpine = Alpine;


// 1) register a new directive called "navigate"
Alpine.directive("navigate", (el, { expression }, { cleanup }) => {
    // figure out which URL to prefetch: either the directive's value, or the href
    const url = expression ? Alpine.evaluate(el, expression) : el.href;

    let prefetched = false;

    // on hover, inject <link rel="prefetch" href="…">
    const onHover = () => {
        if (prefetched || !url) return;

        const tag = document.createElement("link");
        tag.rel = "prefetch";
        tag.href = url;
        document.head.appendChild(tag);

        prefetched = true;
    };

    el.addEventListener("mouseover", onHover);
    cleanup(() => el.removeEventListener("mouseover", onHover));
});

Alpine.start();


