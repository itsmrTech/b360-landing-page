const whyUsSlider = new Swiper(".whyUsSlider", {
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
});



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

setTimeout(() => {
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
} , LOADING_TIME)

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















