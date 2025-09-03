
// Loading start

const loadingItems = document.querySelectorAll('.loading-text-box');
const loadingWrapper = document.querySelector('.loading-wrapper');

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

const loadingItemsArray = Array.from(loadingItems);
const randomOrder = shuffleArray(loadingItemsArray);

function endLoadingAnimationHandler(){
    const mainContent = document.querySelector('.main-content');
    if(mainContent){
        setTimeout(() => {
            mainContent.classList.remove('d-none');
        } , 500)
        setTimeout(() => {
            loadingWrapper.classList.add('fade-out');
        } , 750)
    }
}
// اینجا دیگه انیشمیشن لودینگ تموم میشه و باقی صفحه رو باز میزاریم

function showMainTextLoading(){
    const mainTextLoading = document.querySelector('#main-text-loading');
    if(mainTextLoading){
        setTimeout(() => {
            mainTextLoading.classList.add('active');
            endLoadingAnimationHandler()
        } , 450)
    }
}
// اون متن "WE BUILD TRUST" بیاد توی صفحه

if(randomOrder.length){
    randomOrder.forEach((item, index) => {
        setTimeout(() => {
            item.classList.add('active')
            if(index == randomOrder.length - 1)
                showMainTextLoading()
        } , 40 * index)
    })
}


// Loading end

// Menu Handler
const menuWrapper = document.querySelector('#menu-wrapper');
const menuButton = document.querySelector('#menu-button');
const closeMenuButton = document.querySelector('#close-menu-button');


menuButton.addEventListener('click' , () => {
    menuWrapper.classList.add('active')
})

closeMenuButton.addEventListener('click' , () => {
    menuWrapper.classList.remove('active')
})


const viewportHeight = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
const viewportWidth = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);

function allGsapAnimationHandlerDesktop(){



// انتخاب عناصر
    const header = document.querySelector('header');
    const headerSlides = header.querySelectorAll(".swiper-slide-beta");
    const headerWrapper = header.querySelector(".swiper-wrapper");

    const whyUsSection = document.querySelector('.panel-2');
    const whyUsSlides = whyUsSection.querySelectorAll(".why-us-slide");

    const portfolioSection = document.querySelector('.panel-3');
    const portfolioSlides = portfolioSection.querySelectorAll(".swiper-slide-beta");
    const portfolioWrapper = portfolioSection.querySelector(".swiper-wrapper");

    const panel4 = document.querySelector('.panel-4');
    const panel4Slides = panel4.querySelectorAll(".swiper-slide-beta");
    const panel4Wrapper = panel4.querySelector(".swiper-wrapper");

    const contactWrapper = document.querySelector('.panel-5');

// Timeline اصلی
    const mainTimeline = gsap.timeline({
        scrollTrigger: {
            trigger: "main",
            start: "top top",
            end: () => {
                // مجموع طول همه بخش‌ها
                const totalSlides = headerSlides.length + whyUsSlides.length + portfolioSlides.length + panel4Slides.length + 2; // +1 برای contact
                return "+=" + 15000;
            },
            scrub: 1,
            pin: true,
            markers: true,
        },
        defaults: { ease: "none" }
    });

// --- Header افقی ---
    const headerSlideWidth = headerSlides[0]?.clientWidth || 0;
    const headerSliderTotal = headerSlideWidth * headerSlides.length;
    const headerSlidesPerSection = 4; // ثابت

    mainTimeline.fromTo(
        headerWrapper,
        { xPercent: 0, x: headerSlideWidth * 2 },
        { xPercent: 0, x: -((headerSliderTotal / headerSlidesPerSection) + (headerSlideWidth * 2)), duration: 3 },
        0
    );

    headerSlides.forEach(slide => {
        mainTimeline.fromTo(slide, { opacity: 0.1, y: 70 }, { opacity: 1, y: 0, duration: 2 }, 0);
    });

// --- همه بخش‌ها در ابتدا یک viewport پایین ---
    [whyUsSection, portfolioSection, panel4, contactWrapper].forEach(sec => {
        gsap.set(sec, { y: viewportHeight });
    });

    mainTimeline.fromTo(
        header,
        { y: 0, scale: 1, opacity: 1, filter: "blur(0px)" },
        { y: 0, scale: 0.5, duration: 0.5, filter: "blur(3px)", opacity: 0.4 },
        3
    );

// --- Why Us Section ---
    mainTimeline.fromTo(
        whyUsSection,
        { y: viewportHeight, scale: 0.7, filter: "blur(3px)" },
        { y: 0, scale: 1, duration: 1, ease: "power1.inOut", filter: "blur(0px)" },
        3
    );

    whyUsSlides.forEach((slide, i) => {
        if (i === 0) {
            mainTimeline.fromTo(slide, { opacity: 1 }, { opacity: 0, duration: 0.5 });
        } else if (i !== whyUsSlides.length - 1) {
            mainTimeline.fromTo(slide, { opacity: 0 }, { opacity: 1, duration: 0.5 })
                .to(slide, { opacity: 0, duration: 1 });
        } else {
            mainTimeline.fromTo(slide, { opacity: 0 }, { opacity: 1, duration: 0.5 });
        }
    });

    mainTimeline.fromTo(
        whyUsSection,
        { y: 0, scale: 1, filter: "blur(0px)"},
        { y: 0, scale: 0.5, duration: 0.5, filter: "blur(3px)" },
        6.7
    );

// --- Portfolio Section ---
    mainTimeline.fromTo(
        portfolioSection,
        { y: viewportHeight, scale: 0.7, filter: "blur(3px)" },
        { y: 0, duration: 0.75, scale: 1, filter: "blur(0px)" },
        6.7
    );

    const portfolioSlideWidth = portfolioSlides[0]?.clientWidth || 0;
    const portfolioSliderTotal = portfolioSlideWidth * portfolioSlides.length;

    mainTimeline.fromTo(
        portfolioWrapper,
        { x: 0 },
        { x: -(portfolioSliderTotal - portfolioSlideWidth), duration: 3 }
    );

    mainTimeline.fromTo(
        portfolioSection,
        { y: 0, filter: "blur(0px)", scale: 1, rotationX: 0 },
        { y: 0, duration: 0.75, filter: "blur(3px)", scale: 0.8, rotationX: -15 },
        10.5
    );

// --- Panel 4 Section ---
    mainTimeline.fromTo(
        panel4,
        { y: viewportHeight, rotationX: 15, scale:0.8, translateY: 20, filter: "blur(3px)" },
        { y: 0, duration: 1, rotationX: 0, scale:1, translateY: 0, filter: "blur(0px)" },
        10.5
    );

    const panel4SlideWidth = panel4Slides[0]?.clientWidth || 0;
    const panel4SliderTotal = panel4SlideWidth * panel4Slides.length;

    mainTimeline.fromTo(
        panel4Wrapper,
        { x: 0 },
        { x: -(panel4SliderTotal - panel4SlideWidth), duration: 2 }
    );

// --- Contact Section ---
    mainTimeline.fromTo(
        contactWrapper,
        { y: viewportHeight },
        { y: 0, duration: 1 }
    );
    mainTimeline.fromTo(
        contactWrapper,
        { y: 0 },
        { y: 0, duration: 1 }
    );
}

function allGsapAnimationHandlerMobile(){



// انتخاب عناصر
    const header = document.querySelector('header');
    const headerSlides = header.querySelectorAll(".swiper-slide-beta");
    const headerWrapper = header.querySelector(".swiper-wrapper");

    const whyUsSection = document.querySelector('.panel-2');
    const whyUsSlides = whyUsSection.querySelectorAll(".why-us-slide");

    const portfolioSection = document.querySelector('.panel-3');
    const portfolioSlides = portfolioSection.querySelectorAll(".swiper-slide-beta");
    const portfolioWrapper = portfolioSection.querySelector(".swiper-wrapper");

    const panel4 = document.querySelector('.panel-4');
    const panel4Slides = panel4.querySelectorAll(".swiper-slide-beta");
    const panel4Wrapper = panel4.querySelector(".swiper-wrapper");

    const contactWrapper = document.querySelector('.panel-5');

// Timeline اصلی
    const mainTimeline = gsap.timeline({
        scrollTrigger: {
            trigger: "main",
            start: "top top",
            end: () => {
                // مجموع طول همه بخش‌ها
                const totalSlides = headerSlides.length + whyUsSlides.length + portfolioSlides.length + panel4Slides.length + 2; // +1 برای contact
                return "+=" + 15000;
            },
            scrub: 1,
            pin: true,
            markers: true,
        },
        defaults: { ease: "none" }
    });

    // --- Header عمودی ---
    let headerSlidesHeight = 0;
    headerSlides.forEach((headerItem, i) => {
        if(i !== (headerSlides.length - 1))
            headerSlidesHeight += headerItem.clientHeight
    })

    mainTimeline.fromTo(
        headerWrapper,
        { y: 0 },
        { y: -headerSlidesHeight, duration: 3 },
        0
    );

    headerSlides.forEach(slide => {
        mainTimeline.fromTo(slide, { y: 70 }, { y: 0, duration: 2 }, 0);
    });

// --- همه بخش‌ها در ابتدا یک viewport پایین ---
    [whyUsSection, portfolioSection, panel4, contactWrapper].forEach(sec => {
        gsap.set(sec, { y: viewportHeight });
    });

    mainTimeline.fromTo(
        header,
        { y: 0, scale: 1, opacity: 1, filter: "blur(0px)" },
        { y: 0, scale: 0.5, duration: 0.5, filter: "blur(3px)", opacity: 0.4 },
        3
    );

// --- Why Us Section ---
    mainTimeline.fromTo(
        whyUsSection,
        { y: viewportHeight, scale: 0.7, filter: "blur(3px)" },
        { y: 0, scale: 1, duration: 1, ease: "power1.inOut", filter: "blur(0px)" },
        3
    );

    whyUsSlides.forEach((slide, i) => {
        if (i === 0) {
            mainTimeline.fromTo(slide, { opacity: 1 }, { opacity: 0, duration: 0.5 });
        } else if (i !== whyUsSlides.length - 1) {
            mainTimeline.fromTo(slide, { opacity: 0 }, { opacity: 1, duration: 0.5 })
                .to(slide, { opacity: 0, duration: 1 });
        } else {
            mainTimeline.fromTo(slide, { opacity: 0 }, { opacity: 1, duration: 0.5 });
        }
    });

    mainTimeline.fromTo(
        whyUsSection,
        { y: 0, scale: 1, filter: "blur(0px)"},
        { y: 0, scale: 0.5, duration: 0.5, filter: "blur(3px)" },
        6.7
    );

// --- Portfolio Section ---
    mainTimeline.fromTo(
        portfolioSection,
        { y: viewportHeight, scale: 0.7, filter: "blur(3px)" },
        { y: 0, duration: 0.75, scale: 1, filter: "blur(0px)" },
        6.7
    );

    const portfolioSlideWidth = portfolioSlides[0]?.clientWidth || 0;
    const portfolioSliderTotal = portfolioSlideWidth * portfolioSlides.length;

    mainTimeline.fromTo(
        portfolioWrapper,
        { x: 0 },
        { x: -(portfolioSliderTotal - portfolioSlideWidth), duration: 3 }
    );

    mainTimeline.fromTo(
        portfolioSection,
        { y: 0, filter: "blur(0px)", scale: 1, rotationX: 0 },
        { y: 0, duration: 0.75, filter: "blur(3px)", scale: 0.8, rotationX: -15 },
        10.5
    );

// --- Panel 4 Section ---
    mainTimeline.fromTo(
        panel4,
        { y: viewportHeight, rotationX: 15, scale:0.8, translateY: 20, filter: "blur(3px)" },
        { y: 0, duration: 1, rotationX: 0, scale:1, translateY: 0, filter: "blur(0px)" },
        10.5
    );

    const panel4SlideWidth = panel4Slides[0]?.clientWidth || 0;
    const panel4SliderTotal = panel4SlideWidth * panel4Slides.length;

    mainTimeline.fromTo(
        panel4Wrapper,
        { x: 0 },
        { x: -(panel4SliderTotal - panel4SlideWidth), duration: 2 }
    );

    let plusScroll = contactWrapper.clientHeight - viewportHeight

// --- Contact Section ---
    mainTimeline.fromTo(
        contactWrapper,
        { y: viewportHeight },
        { y: -plusScroll, duration: 1 }
    );
/*    mainTimeline.fromTo(
        contactWrapper,
        { y: -plusScroll },
        { y: 0, duration: 1 }
    );*/
}

if(viewportWidth > 992)
    setTimeout(allGsapAnimationHandlerDesktop , 3700)
else
    setTimeout(allGsapAnimationHandlerMobile , 3700)


/*

if(u){

    console.log(SLIDER_LIMIT_SCROLL , -SLIDER_LIMIT_SCROLL)

    const headerTimeline = gsap.timeline({
        scrollTrigger: {
            trigger: ".panel-1",
            start: "top top",
            end: () => "+=" + SLIDER_LIMIT_SCROLL,
            scrub: 1,
            pin:true,
            anticipatePin: 1,
            markers: true,
            // بدون pin
        },
        defaults: {ease: "none"}
    });

    headerTimeline.fromTo(x, { xPercent: 70, x: 0}, {xPercent: 0, x: -(SLIDER_LIMIT_SCROLL / SLIDE_COUNT_IN_EACH_SECTION)});



    headerTimeline.from(headerItems, {
        opacity: 0,
        y: 50,
        duration: 0.3,
        stagger: 0.05 // هر آیتم 0.2 ثانیه بعد از قبلی شروع میشه
    }, 0);
}*/

/*
const whyUsSliderItems = gsap.utils.toArray(".why-us-slide"); // آیتم‌ها
const s = whyUsSliderItems[0]?.clientHeight || window.innerHeight; // ارتفاع هر اسلاید
const SLIDER_LIMIT_SCROLL = s * whyUsSliderItems.length; // طول کل اسکرول
*/

/*console.log(SLIDER_LIMIT_SCROLL)
// timeline اصلی با ScrollTrigger
const whyUsTimeline = gsap.timeline({
    scrollTrigger: {
        trigger: ".panel-2", // سکشن why us
        start: "top top",
        end: () => "+=" + SLIDER_LIMIT_SCROLL,
        scrub: 1,
        pin: true,
        markers: true,
        onUpdate: self => {
            const progress = self.progress; // 0 تا 1
            whyUsSliderItems.forEach((slide, i) => {
                const start = i / SLIDER_LIMIT_SCROLL;
                const end = (i + 1) / SLIDER_LIMIT_SCROLL;
                if (progress >= start && progress < end) {
                    gsap.to(slide, { opacity: 1, y: 0, duration: 0.2 });
                } else {
                    gsap.to(slide, { opacity: 0, y: 50, duration: 0.2 });
                }
            });
        }
    },
    defaults: {ease: "none"}
});

// اضافه کردن انیمیشن fade in و fade out هر آیتم

const totalItems = whyUsSliderItems.length;


whyUsSliderItems.forEach((item, i) => {
    const segment = 1 / totalItems; // سهم هر آیتم در progress کل timeline

    console.log(whyUsTimeline.scrollTrigger)

    whyUsTimeline.from(whyUsSliderItems, {
        opacity: 0,
        y: 50,
        duration: 0.3,
        stagger: 0.05 // هر آیتم 0.2 ثانیه بعد از قبلی شروع میشه
    }, 0);
});*/

