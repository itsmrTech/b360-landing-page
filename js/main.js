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
        } , 950)
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


const header = document.querySelector('header')
const headerItems = header.querySelectorAll(".swiper-slide-beta");
const x = header.querySelector(".swiper-wrapper");

/*const whyUsSlider = document.querySelector('.panel-2')
const i = whyUsSlider.querySelector(".swiper-wrapper");*/

const u = headerItems[0]?.clientWidth;
if(u){
    const SLIDER_LIMIT_SCROLL = (u * 1.5) * headerItems.length;
    const SLIDE_COUNT_IN_EACH_SECTION = 4;
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
}

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

