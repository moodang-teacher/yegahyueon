document.addEventListener('DOMContentLoaded', () => {
    gsap.registerPlugin(ScrollTrigger);

    // Lenis.js
    const lenis = new Lenis();

    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
        lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    // SCROLL DOWN
    gsap.fromTo('.scroll-down b', { y: -30 }, { y: 30, ease: 'power1.out', repeat: -1, yoyo: true });

    // GNB
    const $gnb = $('.gnb');
    gsap.set($gnb, { x: 100 });
    gsap.to($gnb, {
        x: 0,
        duration: 1,
        ease: 'power2.inOut',
        scrollTrigger: {
            trigger: '.visual',
            start: 'bottom+=300% 0%',
            // endTrigger: '',
            // markers: true,
            toggleActions: 'play none reverse none',
        },
    });

    const $gnbMenu = $('.gnb .menu');
    const $gnbList = $('.gnb-list');

    $gnbMenu.on('click', (e) => {
        e.preventDefault();
        $gnbList.toggleClass('active');
    });

    // 스크롤이 active 클래스가 부여됐을 때 스크롤 시 클래스 지움
    let isScrolling = false;
    ScrollTrigger.addEventListener('scrollStart', () => {
        isScrolling = true;
        if (isScrolling) $gnbList.removeClass('active');
    });

    ScrollTrigger.addEventListener('scrollEnd', () => {
        isScrolling = false;
    });

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

    introTL.from(
        '.marquee-tilted',
        {
            top: '10%',
            left: '-100%',
            duration: 0.5,
            ease: 'power2.inOut',
        },
        '<'
    );

    introTL.to({}, { delay: 1 });

    // CIRCLES
    const circles = gsap.utils.toArray('.circle-wrap .circle');
    circles.forEach((circle, index) => {
        gsap.to(circle, {
            x: Math.random() * 1000,
            y: Math.random() * 2000,
            delay: index * 0.2,
            // duration: 2.5,
            scrollTrigger: {
                trigger: '.circle-wrap',
                start: 'bottom 0%',
                end: 'bottom+=500% 0%',
                scrub: 1,
                // markers: true,
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
                start: 'top 80%',
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
                start: 'top 80%',
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

    // contact ScrollTrigger 생성 시 변수에 저장
    // const contactTrigger = ScrollTrigger.create({
    //     trigger: '.project',
    //     start: 'bottom 50%',
    //     toggleActions: 'play reset play reset',
    //     // markers: true,
    //     animation: gsap.from('.contact', {
    //         autoAlpha: 0,
    //         y: -100,
    //         duration: 1,
    //         ease: 'power2.inOut',
    //     }),
    // });

    const contactAnim = gsap.from('.contact', {
        autoAlpha: 0,
        duration: 0.1,
        // y: -100,
        // ease: 'power2.inOut',
        scrollTrigger: {
            trigger: '.project',
            start: 'bottom 90%',
            toggleActions: 'play reset play reset',
            // markers: true,

            onEnter: () => {
                const containerWidth = window.innerWidth * 0.5;
                addBalls(containerWidth, engine);
            },
        },
    });

    // 탭 클릭 이벤트에서 특정 ScrollTrigger만 갱신
    // $projectMenu.on('click', function () {
    //     const index = $(this).index();
    //     $projectMenu.removeClass('active');
    //     $(this).addClass('active');
    //     $projectconItem.hide();
    //     $projectconItem.eq(index).show();

    //     // contact ScrollTrigger 갱신
    //     setTimeout(() => {
    //         // contactTrigger.refresh();
    //         contactAnim.scrollTrigger.refresh();
    //     }, 100);
    // });

    $projectMenu.on('click', function () {
        const index = $(this).index();
        $projectMenu.removeClass('active');
        $(this).addClass('active');
        $projectconItem.hide();

        // promise() 사용
        $projectconItem
            .eq(index)
            .show()
            .promise()
            .done(() => {
                contactAnim.scrollTrigger.refresh();
            });
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

    // webdesign project-list
    const webProjects = gsap.utils.toArray('.webdesign .project-list li');

    webProjects.forEach((project, index) => {
        gsap.from(project, {
            opacity: 0,
            y: 300,
            duration: 0.7,
            ease: 'power2.inOut',
            scrollTrigger: {
                trigger: project,
                start: 'top 80%',
                // markers: true,
            },
        });

        gsap.from(project.querySelector('figure'), {
            clipPath: 'inset(0 0 0 100%)',
            duration: 0.7,
            ease: 'power2.inOut',
            scrollTrigger: {
                trigger: project,
                start: 'top 70%',
                // markers: true,
            },
        });
    });

    // graphicdesign project-list
    const $graphicdesignList = $('.graphicdesign .project-list li');
    const $graphicdesignContent = $('.graphicdesign-content');
    const graphicdesignImage = [
        { img: './img/graphicdesign1.jpg', width: 640, height: 489 },
        { img: './img/graphicdesign2.jpg', width: 540, height: 540 },
        { img: './img/graphicdesign3.jpg', width: 951, height: 1427 },
        { img: './img/graphicdesign4.jpg', width: 1600, height: 1280 },
        { img: './img/graphicdesign5.jpg', width: 831, height: 1142 },
        { img: './img/graphicdesign6.jpg', width: 1000, height: 1492 },
        { img: './img/graphicdesign7.jpg', width: 1080, height: 1350 },
    ];

    changeGraphicdesignImage(0);

    $graphicdesignList.on('click', function () {
        const index = $(this).index();

        $graphicdesignList.removeClass('active');
        $(this).addClass('active');

        changeGraphicdesignImage(index);
    });

    function changeGraphicdesignImage(index) {
        $graphicdesignContent.find('a').attr({
            href: graphicdesignImage[index].img,
            'data-pswp-width': graphicdesignImage[index].width,
            'data-pswp-height': graphicdesignImage[index].height,
        });

        $graphicdesignContent.find('figure img').attr('src', graphicdesignImage[index].img);
    }

    // CURSOR

    const cursor = document.querySelector('.cursor');

    document.addEventListener('mousemove', (e) => {
        gsap.to(cursor, {
            x: e.clientX,
            y: e.clientY,
            // duration: 1,
            ease: 'none',
        });
    });

    gsap.set(cursor, { autoAlpha: 0, scale: 0.3 });

    const targetItems = document.querySelectorAll('.target-item');
    targetItems.forEach((item) => {
        item.addEventListener('mouseenter', () => {
            gsap.to(cursor, { autoAlpha: 1, scale: 1 });
        });
        item.addEventListener('mouseleave', () => {
            gsap.to(cursor, { autoAlpha: 0, scale: 0.3 });
        });
    });
});
