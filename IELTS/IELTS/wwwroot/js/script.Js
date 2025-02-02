/* wwwroot/js/script.js */
let tl = gsap.timeline({
    onStart: () => document.body.style.overflow = 'hidden',
    onComplete: () => document.body.style.overflow = 'auto'
});

tl.from('.nav h3', {
    y: -500,
    duration: 1.5,
    opacity: 0,
    stagger: 0.4
});

tl.from('.main h1', {
    x: -500,
    duration: 1.2,
    opacity: 0,
    stagger: 0.3
});

tl.from('img', {
    x: 100,
    rotate: 45,
    duration: 0.5,
    opacity: 0,
    stagger: 0.5
});

tl.from('.main h2', {
    y: 100,
    duration: 1.2,
    opacity: 0,
});

tl.from('.main h4', {
    y: 50,
    duration: 1.2,
    opacity: 0,
    stagger: 0.3,
});
