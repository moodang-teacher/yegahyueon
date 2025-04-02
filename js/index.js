document.addEventListener('DOMContentLoaded', () => {
    gsap.registerPlugin(ScrollTrigger);

    // Lenis.js
    const lenis = new Lenis();

    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
        lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    // VISUAL
    const introTL = gsap.timeline({
        scrollTrigger: {
            trigger: '.visual',
            start: 'top 0%',
            end: '+=300%',
            scrub: 1,
            pin: true,
            // markers: true,
        },
    });

    introTL.to('.visual', {
        clipPath: 'circle(100% at 50% 50%)',
        ease: 'none',
    });

    introTL.from(
        '.visual-title h1',
        {
            opacity: 0,
            scale: 0.5,
        },
        '-=0.3'
    );

    introTL.from('.marquee-horizon', {
        clipPath: 'inset(0 0 0 100%)',
    });

    introTL.to({}, { delay: 1 });

    // CIRCLES
    const circles = gsap.utils.toArray('.circle-wrap .circle');
    circles.forEach((circle, index) => {
        gsap.to(circles, {
            x: (index) => (index % 2 === 0 ? Math.random() * 1000 : Math.random() * -1000),
            y: (index) => (index % 2 === 0 ? Math.random() * 2000 : Math.random() * 1000),
            // duration: 2.5,
            scrollTrigger: {
                trigger: '.circle-wrap',
                start: 'bottom 50%',
                end: 'bottom+=300% 0%',
                scrub: 0.5,
                markers: true,
            },
        });
    });

    // ABOUT
    const aboutLink = gsap.utils.toArray('.about-menu li');

    aboutLink.forEach((link, index) => {
        gsap.from(link, {
            opacity: 0,
            y: 50,
            duration: 1,
            delay: index * 0.1,
            ease: 'power2.inOut',

            scrollTrigger: {
                trigger: '.about',
                start: 'top 30%',
                // markers: true,
            },
        });
    });

    const aboutTitles = gsap.utils.toArray('.about-title h2 span');

    aboutTitles.forEach((title, index) => {
        gsap.from(title, {
            opacity: 0,
            x: 100,
            filter: 'blur(10px)',
            duration: 1.5,
            delay: index * 0.2,
            ease: 'power2.inOut',

            scrollTrigger: {
                trigger: title,
                start: 'top 40%',
                // markers: true,
                toggleActions: 'play none reverse none',
            },
        });
    });

    // PROJECT
    const $projectMenu = $('.project-menu li');
    const $projectconItem = $('.project-con-item');
    $projectMenu.eq(0).addClass('active');
    $projectconItem.eq(1).hide();

    $projectMenu.on('click', function () {
        const index = $(this).index();
        $projectMenu.removeClass('active');
        $(this).addClass('active');
        $projectconItem.hide();
        $projectconItem.eq(index).show();
    });

    const projectMenus = gsap.utils.toArray('.project-menu li');

    projectMenus.forEach((menu, index) => {
        gsap.from(menu, {
            opacity: 0,
            x: index % 2 === 0 ? 100 : -100,
            filter: 'blur(20px)',
            duration: 1.5,
            ease: 'power2.inOut',

            scrollTrigger: {
                trigger: '.project',
                start: 'top 40%',
                // markers: true,
            },
        });
    });

    // CONTACT
    gsap.from('.contact', {
        autoAlpha: 0,
        y: -100,
        duration: 1,
        ease: 'power2.inOut',
        scrollTrigger: {
            trigger: '.project',
            start: 'bottom 50%',
            toggleActions: 'play reset play reset',
            // markers: true,
        },
    });
});
