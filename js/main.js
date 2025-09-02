
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

/*
/!*const whyUsSlider = new Swiper(".whyUsSlider", {
    loop: false,
    slidesPerView: 1,
    observer: true,
    observeParents: true,
    watchOverflow: true,
    effect: "fade",
    fadeEffect: { crossFade: true },
    pagination: {
        el: ".swiper-pagination",
        clickable: true
    }
});

const headerSlider = new Swiper(".header-slider", {
    loop: false,
    slidesPerView: 1, // حالت پیش‌فرض
    spaceBetween: 10,
    breakpoints: {
        640: { // وقتی عرض >= 640px باشه
            slidesPerView: 2,
            spaceBetween: 20,
        },
        1024: { // وقتی عرض >= 1024px باشه
            slidesPerView: 3,
            spaceBetween: 30,
        },
        1440: { // وقتی عرض >= 1440px باشه
            slidesPerView: 4,
            spaceBetween: 40,
        },
    },
    observer: true,
    observeParents: true,
    watchOverflow: true,
    pagination: {
        el: ".swiper-pagination",
        clickable: true
    }
});

const footerPortfolioSlider = new Swiper(".footer-portfolio-slider", {
    loop: false,
    slidesPerView: 1,
    observer: true,
    observeParents: true,
    watchOverflow: true,
    pagination: {
        el: ".swiper-pagination",
        clickable: true
    }
});
const footerServicesSlider = new Swiper(".footer-services-slider", {
    loop: false,
    slidesPerView: 1,
    observer: true,
    observeParents: true,
    watchOverflow: true,
    pagination: {
        el: ".swiper-pagination",
        clickable: true
    }
});*!/






// GSAP Start !!

/!*
gsap.registerPlugin(ScrollToPlugin, Observer);

const sections = gsap.utils.toArray('.fullscreen-section');
let current = 0;
let locked = false;

function goToSection(index) {
    index = gsap.utils.clamp(0, sections.length - 1, index);
    if (index === current || locked) return;

    locked = true;
    gsap.to(window, {
        duration: 0.8,
        ease: "power2.inOut",
        scrollTo: { y: sections[index], autoKill: false },
        onComplete: () => { current = index; locked = false; }
    });
}
// اگر کاربر ری‌سایز کرد یا ری‌لود وسط صفحه بود، نزدیک‌ترین سکشن ست شود
*!/

window.addEventListener('load', () => {
    const y = window.scrollY + innerHeight/2;
    current = sections.findIndex(s => s.offsetTop <= y && s.offsetTop + s.offsetHeight > y);
    if (current < 0) current = 0;
    goToSection(current);
});

// SLIDER SECTION

// Observer برای سکشن‌ها

const HEADER_SLIDER_SECTION_INDEX = 0;
const WHY_US_SLIDER_SECTION_INDEX = 1;
const FOOTER_PORTFOLIO_SLIDER_SECTION_INDEX = 2;
const FOOTER_SERVICES_SLIDER_SECTION_INDEX = 3
//  توی بخش دوم یک اسلایدر "why us" داریم که شماره ایندکسش 2 هست و سایر بخش ها هم نوشته شده

const LOADING_TIME = 3000;
// مثلا بعد 3 ثانیه لود تکمیل میشه

function sliderScrollHandler(SLIDER, DIR){
    if((DIR === 'next' && SLIDER.isEnd) || (DIR === 'prev' && SLIDER.isBeginning)){
        if(DIR === 'next')
            goToSection(current + 1); // آخرین اسلاید → سکشن بعدی
        else
            goToSection(current - 1);
    }
    else
    {
        locked = true;
        setTimeout(() => {
            if(DIR === 'next')
                SLIDER.slideNext();
            else
                SLIDER.slidePrev();
        }, 50);

        setTimeout(() => locked = false, 300);
    }
}

/!*setTimeout(() => {
    Observer.create({
        target: window,
        type: "wheel,touch,pointer",
        wheelSpeed: 1,
        tolerance: 8,
        preventDefault: true,
        onDown: () => {
            if(current === HEADER_SLIDER_SECTION_INDEX)
                sliderScrollHandler(headerSlider, 'next')
            else if(current === WHY_US_SLIDER_SECTION_INDEX)
                sliderScrollHandler(whyUsSlider, 'next')
            else if(current === FOOTER_PORTFOLIO_SLIDER_SECTION_INDEX)
                sliderScrollHandler(footerPortfolioSlider, 'next')
            else if(current === FOOTER_SERVICES_SLIDER_SECTION_INDEX)
                sliderScrollHandler(footerServicesSlider, 'next')
            else
                goToSection(current + 1);
        },
        onUp: () => {
            if(current === HEADER_SLIDER_SECTION_INDEX)
                sliderScrollHandler(headerSlider, 'prev')
            else if(current === WHY_US_SLIDER_SECTION_INDEX)
                sliderScrollHandler(whyUsSlider, 'prev')
            else if(current === FOOTER_PORTFOLIO_SLIDER_SECTION_INDEX)
                sliderScrollHandler(footerPortfolioSlider, 'prev')
            else if(current === FOOTER_SERVICES_SLIDER_SECTION_INDEX)
                sliderScrollHandler(footerServicesSlider, 'prev')
            else
                goToSection(current - 1);
        }
    });
} , LOADING_TIME)*!/

// GSAP End !!


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


gsap.registerPlugin(ScrollTrigger);

// همه آیتم‌ها داخل هدر
const headerItems = document.querySelectorAll(".swiper-slide-beta");
const sections = gsap.utils.toArray(".fullscreen-section");
let currentSection = 0;

// Timeline برای هدر
const headerTimeline = gsap.timeline({
    scrollTrigger: {
        trigger: "header", // سکشن هدر
        start: "center center",
        end: "bottom center",          // وقتی اسکرول به پایان رسید
        scrub: 1,
        pin: true,
        anticipatePin: 1,
        markers:true,// هدر ثابت میمونه تا همه آیتم‌ها نمایش داده بشن
        /!*onUpdate: self => {
            // وقتی timeline تموم شد → سکشن بعدی
            if (self.progress === 1) {
                goToSection(currentSection + 1);
            }
        }*!/
    }
});

// اضافه کردن انیمیشن هر آیتم به timeline
// headerItems.forEach((item, i) => {
//     headerTimeline.from(item, {
//         opacity: 0,
//         y: 50,
//         duration: 0.5
//     }, i * 0.2); // با تاخیر جزئی برای استگرا کردن
// });
//
// // تابع رفتن به سکشن بعدی
// function goToSection(index) {
//     index = gsap.utils.clamp(0, sections.length - 1, index);
//     gsap.to(window, {
//         duration: 0.8,
//         scrollTo: { y: sections[index], autoKill: false }
//     });
//     currentSection = index;
// }















*/


/*
const viewportHeight = Math.max(
    document.documentElement.clientHeight,
    window.innerHeight || 0
);

console.log("ارتفاع واقعی viewport:", viewportHeight);



const header = document.querySelector('header')
const headerItems = header.querySelectorAll(".swiper-slide-beta");
const x = header.querySelector(".swiper-wrapper");

const whyUsSlider = document.querySelector('.panel-2')
const whyUsItems = whyUsSlider.querySelectorAll(".why-us-slide");

const portfolioSlider = document.querySelector('.panel-3');
const portfolioItems = portfolioSlider.querySelectorAll(".swiper-slide-beta");
const i = portfolioSlider.querySelector(".swiper-wrapper");

const ee = document.querySelector('.panel-4');
const gg = ee.querySelectorAll(".swiper-slide-beta");
const yy = ee.querySelector(".swiper-wrapper");

const ll = gg[0]?.clientWidth;
const ef = (ll * 3  ) * gg.length;
const rt = 4;

const timeline = gsap.timeline({
    scrollTrigger: {
        trigger: ".main-content",
        start: "top top",
        end: () => "+=" + window.innerHeight * 20,
        scrub: 1,
        pin: true,
        anticipatePin: 1,
        markers: true,
        // بدون pin
    },
    defaults: {ease: "none"}
});

const r = portfolioItems[0]?.clientWidth;
const e = (r * 3  ) * portfolioItems.length;
const p = 4;

const u = headerItems[0]?.clientWidth;
const SLIDER_LIMIT_SCROLL = u * headerItems.length;
const SLIDE_COUNT_IN_EACH_SECTION = 4;

console.log((SLIDER_LIMIT_SCROLL + (u * 2)))

console.log((SLIDER_LIMIT_SCROLL + (u * 2)) / SLIDE_COUNT_IN_EACH_SECTION)
timeline
    .fromTo(x, { xPercent: 0, x: u * 2}, {xPercent: 0, x: -((SLIDER_LIMIT_SCROLL / SLIDE_COUNT_IN_EACH_SECTION) + (u * 2)), duration: 3}, 0)
    headerItems.forEach((item, i) => {
        timeline
            .fromTo(item, { opacity: 0.1, y: 70 }, { opacity: 1, y: 0, duration: 2 }, 0)
    });
    timeline
    .fromTo(whyUsSlider, {y: viewportHeight}, {y: 0, duration: 1})
    whyUsItems.forEach((item, i) => {
        if(i === 0)
            timeline
                .fromTo(item, { opacity: 1}, { opacity: 0, duration: 0.5 });
        else if(i !== (whyUsItems.length - 1))
            timeline
                .fromTo(item, { opacity: 0 }, { opacity: 1, duration: 0.5 })
                .to(item, { opacity: 0, duration: 1 });
        else
            timeline
                .fromTo(item, { opacity: 0 }, { opacity: 1, duration: 0.5 })
    });
    timeline
        .fromTo(portfolioSlider, { y: viewportHeight}, {y: 0, duration: 3})
        .fromTo(i, { x: 0}, {xPercent: 0, x: -(e / p), duration: 3})
        .fromTo(ee, { y: viewportHeight}, {y: 0, duration: 3})
        .fromTo(i, { x: 0}, {xPercent: 0, x: -(ef / rt), duration: 3})


*/

/*

const viewportHeight = Math.max(
    document.documentElement.clientHeight,
    window.innerHeight || 0
);

console.log("ارتفاع واقعی viewport:", viewportHeight);

// یک تابع کمکی برای محاسبه طول کل اسلایدر
const getSliderTotal = (slides, multiplier = 1) => (slides[0]?.clientWidth * multiplier) * slides.length;

// یک تابع برای ایجاد انیمیشن اسلایدر افقی
const createHorizontalSlider = (tl, wrapper, slides, slidesPerSection, offset = 0, duration = 3) => {
    const total = getSliderTotal(slides);
    tl.fromTo(
        wrapper,
        { xPercent: 0, x: offset },
        { xPercent: 0, x: -((total / slidesPerSection) + offset), duration }
    );
    slides.forEach(slide => {
        tl.fromTo(slide, { opacity: 0.1, y: 70 }, { opacity: 1, y: 0, duration: 2 }, 0);
    });
};

// یک تابع برای اسلایدر عمودی (هر اسلاید fade in/out)
const createVerticalSlider = (tl, section, slides) => {
    tl.fromTo(section, { y: viewportHeight }, { y: 0, duration: 1 });

    slides.forEach((slide, index) => {
        if (index === 0) {
            tl.fromTo(slide, { opacity: 1 }, { opacity: 0, duration: 0.5 });
        } else if (index !== slides.length - 1) {
            tl.fromTo(slide, { opacity: 0 }, { opacity: 1, duration: 0.5 })
                .to(slide, { opacity: 0, duration: 1 });
        } else {
            tl.fromTo(slide, { opacity: 0 }, { opacity: 1, duration: 0.5 });
        }
    });
};

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

// Timeline اصلی
const mainTimeline = gsap.timeline({
    scrollTrigger: {
        trigger: ".main-content",
        start: "top top",
        end: () => "+=" + viewportHeight * 20,
        scrub: 1,
        pin: true,
        anticipatePin: 1,
        markers: true,
    },
    defaults: { ease: "none" }
});

// Header افقی
createHorizontalSlider(mainTimeline, headerWrapper, headerSlides, 4, headerSlides[0]?.clientWidth * 2);

// Why Us عمودی
createVerticalSlider(mainTimeline, whyUsSection, whyUsSlides);

// Portfolio افقی
createHorizontalSlider(mainTimeline, portfolioWrapper, portfolioSlides, 4);

// Panel 4 افقی
createHorizontalSlider(mainTimeline, panel4Wrapper, panel4Slides, 4);

*/
/*
const viewportHeight = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);

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
        trigger: ".main-content",
        start: "top top",
        end: () => "+=" + viewportHeight * 20,
        scrub: 1,
        pin: true,
        markers: true,
    },
    defaults: { ease: "none" }
});

// --- Header افقی ---
const headerSlideWidth = headerSlides[0]?.clientWidth;
const headerSliderTotal = headerSlideWidth * headerSlides.length;
const headerSlidesPerSection = 4;

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
[whyUsSection, portfolioSection, panel4].forEach(sec => {
    gsap.set(sec, { y: viewportHeight });
});

// --- Why Us Section ---
mainTimeline.fromTo(
    whyUsSection,
    { y: viewportHeight },
    { y: 0, duration: 1 }
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

// --- Portfolio Section ---
mainTimeline.fromTo(
    portfolioSection,
    { y: viewportHeight },
    { y: 0, duration: 1 }
);

const portfolioSlideWidth = portfolioSlides[0]?.clientWidth;
const portfolioSliderTotal = portfolioSlideWidth * portfolioSlides.length;

mainTimeline.fromTo(
    portfolioWrapper,
    { x: 0 },
    { x: -(portfolioSliderTotal - portfolioSlideWidth), duration: 3 }
);

// --- Panel 4 Section ---
mainTimeline.fromTo(
    panel4,
    { y: viewportHeight },
    { y: 0, duration: 1 }
);

const panel4SlideWidth = panel4Slides[0]?.clientWidth;
const panel4SliderTotal = panel4SlideWidth * panel4Slides.length;

mainTimeline.fromTo(
    panel4Wrapper,
    { x: 0 },
    { x: -(panel4SliderTotal - panel4SlideWidth), duration: 3 }
);

mainTimeline.fromTo(
    contactWrapper,
    { y: viewportHeight },
    { y: 0, duration: 3 }
);*/

function allGsapAnimationHandler(){

    const viewportHeight = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);

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

setTimeout(allGsapAnimationHandler , 3700)


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

