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

gsap.registerPlugin(ScrollToPlugin, Observer, ScrollTrigger);

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

// setTimeout(() => {
//     Observer.create({
//         target: window,
//         type: "wheel,touch,pointer",
//         wheelSpeed: 1,
//         tolerance: 8,
//         preventDefault: true,
//         onDown: () => {
//             if(current === HEADER_SLIDER_SECTION_INDEX)
//                 sliderScrollHandler(headerSlider, 'next')
//             else if(current === WHY_US_SLIDER_SECTION_INDEX)
//                 sliderScrollHandler(whyUsSlider, 'next')
//             else if(current === FOOTER_PORTFOLIO_SLIDER_SECTION_INDEX)
//                 sliderScrollHandler(footerPortfolioSlider, 'next')
//             else if(current === FOOTER_SERVICES_SLIDER_SECTION_INDEX)
//                 sliderScrollHandler(footerServicesSlider, 'next')
//             else
//                 goToSection(current + 1);
//         },
//         onUp: () => {
//             if(current === HEADER_SLIDER_SECTION_INDEX)
//                 sliderScrollHandler(headerSlider, 'prev')
//             else if(current === WHY_US_SLIDER_SECTION_INDEX)
//                 sliderScrollHandler(whyUsSlider, 'prev')
//             else if(current === FOOTER_PORTFOLIO_SLIDER_SECTION_INDEX)
//                 sliderScrollHandler(footerPortfolioSlider, 'prev')
//             else if(current === FOOTER_SERVICES_SLIDER_SECTION_INDEX)
//                 sliderScrollHandler(footerServicesSlider, 'prev')
//             else
//                 goToSection(current - 1);
//         }
//     });
// } , LOADING_TIME)

document.addEventListener('DOMContentLoaded', () => {
    // Check if GSAP and ScrollTrigger are available
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
        console.error('GSAP or ScrollTrigger not loaded. Animations will not work.');
        return;
    }
    
    // Wait for loading animation to complete
    setTimeout(() => {
        initializeScrollAnimations();
    }, LOADING_TIME);
});

function initializeScrollAnimations() {
    console.log('Initializing GSAP scroll animations...');
    
    try {
        // Create main timeline for smooth section transitions
        const mainTimeline = gsap.timeline({
            scrollTrigger: {
                trigger: "body",
                start: "top top",
                end: "bottom bottom",
                scrub: 1,
                pin: false,
                markers: false,
                onUpdate: self => {
                    const progress = self.progress;
                    const sectionIndex = Math.floor(progress * sections.length);
                    current = Math.min(sectionIndex, sections.length - 1);
                }
            }
        });

        console.log(`Found ${sections.length} sections for animation`);

        // Initialize each section with parallax and book-like effects
        sections.forEach((section, index) => {
            if (index > 0) {
                // Book-like overlay effect - each section starts above the previous one
                gsap.set(section, {
                    yPercent: 100,
                    zIndex: index + 1
                });
                console.log(`Set section ${index} with book-like effect`);
            }

            // Create parallax effects for elements within each section
            createParallaxEffects(section, index);
        });

        // Animate sections to create book-like overlay effect
        sections.forEach((section, index) => {
            if (index > 0) {
                ScrollTrigger.create({
                    trigger: section,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: 1,
                    animation: gsap.to(section, {
                        yPercent: 0,
                        duration: 1,
                        ease: "power2.inOut"
                    })
                });
                console.log(`Created ScrollTrigger for section ${index}`);
            }
        });

        // Smooth scroll behavior
        ScrollTrigger.create({
            trigger: "body",
            start: "top top",
            end: "bottom bottom",
            scrub: 1,
            onUpdate: self => {
                const progress = self.progress;
                const sectionIndex = Math.floor(progress * sections.length);
                current = Math.min(sectionIndex, sections.length - 1);
            }
        });

        console.log('GSAP scroll animations initialized successfully!');
        
    } catch (error) {
        console.error('Error initializing GSAP animations:', error);
    }
}

function createParallaxEffects(section, sectionIndex) {
    console.log(`Creating parallax effects for section ${sectionIndex}`);
    
    try {
        // Special handling for header section (panel-1) - create dramatic parallax for the 4 blocks
        if (section.classList.contains('panel-1')) {
            createHeaderBlockParallax(section);
            return; // Skip regular parallax for header section
        }
        
        // Get all elements that should have parallax effects
        const parallaxElements = section.querySelectorAll('.parallax, h1, h2, h3, p, img, .swiper-container');
        console.log(`Found ${parallaxElements.length} parallax elements in section ${sectionIndex}`);
        
        parallaxElements.forEach((element, elementIndex) => {
            const speed = 0.5 + (elementIndex * 0.1); // Different speeds for different elements
            
            ScrollTrigger.create({
                trigger: section,
                start: "top bottom",
                end: "bottom top",
                scrub: 1,
                animation: gsap.to(element, {
                    y: (i, target) => -ScrollTrigger.maxScroll(window) * speed * 0.1,
                    ease: "none"
                })
            });
        });

        // Special parallax for background images
        const backgroundImages = section.querySelectorAll('img[src*="slider"], img[src*="header"]');
        console.log(`Found ${backgroundImages.length} background images in section ${sectionIndex}`);
        
        backgroundImages.forEach(img => {
            ScrollTrigger.create({
                trigger: section,
                start: "top bottom",
                end: "bottom top",
                scrub: 1,
                animation: gsap.to(img, {
                    y: (i, target) => -ScrollTrigger.maxScroll(window) * 0.3,
                    scale: 1.1,
                    ease: "none"
                })
            });
        });

        // Text fade-in effects
        const textElements = section.querySelectorAll('h1, h2, h3, p, .bold-text, .light-text');
        console.log(`Found ${textElements.length} text elements in section ${sectionIndex}`);
        
        textElements.forEach((text, textIndex) => {
            gsap.set(text, { opacity: 0, y: 30 });
            
            ScrollTrigger.create({
                trigger: text,
                start: "top 80%",
                end: "bottom 20%",
                scrub: 1,
                animation: gsap.to(text, {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    ease: "power2.out"
                })
            });
        });
        
        console.log(`Parallax effects created successfully for section ${sectionIndex}`);
        
    } catch (error) {
        console.error(`Error creating parallax effects for section ${sectionIndex}:`, error);
    }
}

function createHeaderBlockParallax(headerSection) {
    console.log('Creating dramatic parallax effects for header blocks');
    
    try {
        // Get all the image-wrapper blocks in the header
        const headerBlocks = headerSection.querySelectorAll('.image-wrapper');
        console.log(`Found ${headerBlocks.length} header blocks for parallax`);
        
        // Create different parallax speeds for each block to create layered effect
        headerBlocks.forEach((block, index) => {
            // Each block gets a progressively stronger parallax effect
            // First block moves least, last block moves most - creating clear layering
            const parallaxSpeed = 1.0 + (index * 0.6); // 1.0, 1.6, 2.2, 2.8
            
            // Add a unique class for styling
            block.classList.add(`header-block-${index + 1}`);
            
            // Add data attribute for debugging
            block.setAttribute('data-parallax-speed', parallaxSpeed);
            block.setAttribute('data-block-index', index + 1);
            
            // Create the parallax animation with increased movement range
            ScrollTrigger.create({
                trigger: headerSection,
                start: "top bottom",
                end: "bottom top",
                scrub: 1,
                animation: gsap.to(block, {
                    y: (i, target) => -ScrollTrigger.maxScroll(window) * parallaxSpeed * 0.25, // Increased from 0.15
                    scale: 1 + (index * 0.08), // Increased scale effect for more depth
                    rotationY: index * 2, // Slight rotation for 3D effect
                    ease: "none"
                })
            });
            
            // Add hover effect for interactivity
            block.addEventListener('mouseenter', () => {
                gsap.to(block, {
                    scale: 1.08,
                    rotationY: index * 3,
                    duration: 0.4,
                    ease: "power2.out"
                });
            });
            
            block.addEventListener('mouseleave', () => {
                gsap.to(block, {
                    scale: 1 + (index * 0.08),
                    rotationY: index * 2,
                    duration: 0.4,
                    ease: "power2.out"
                });
            });
            
            console.log(`Created parallax for header block ${index + 1} with speed ${parallaxSpeed} (Block ${index + 1} will move ${parallaxSpeed}x faster than the base speed)`);
        });
        
        // Add parallax to the logo and tagline with different speed
        const logoWrapper = headerSection.querySelector('.logo-text-wrapper');
        if (logoWrapper) {
            ScrollTrigger.create({
                trigger: headerSection,
                start: "top bottom",
                end: "bottom top",
                scrub: 1,
                animation: gsap.to(logoWrapper, {
                    y: (i, target) => -ScrollTrigger.maxScroll(window) * 0.5,
                    scale: 1.05,
                    ease: "none"
                })
            });
        }
        
        // Add parallax to the menu button
        const menuButton = headerSection.querySelector('#menu-button');
        if (menuButton) {
            ScrollTrigger.create({
                trigger: headerSection,
                start: "top bottom",
                end: "bottom top",
                scrub: 1,
                animation: gsap.to(menuButton, {
                    y: (i, target) => -ScrollTrigger.maxScroll(window) * 0.3,
                    rotation: 5,
                    ease: "none"
                })
            });
        }
        
        // Add background parallax effect to the entire header for enhanced movement
        const headerBackground = headerSection.querySelector('.header-content');
        if (headerBackground) {
            ScrollTrigger.create({
                trigger: headerSection,
                start: "top bottom",
                end: "bottom top",
                scrub: 1,
                animation: gsap.to(headerBackground, {
                    y: (i, target) => -ScrollTrigger.maxScroll(window) * 0.1,
                    scale: 1.02,
                    ease: "none"
                })
            });
        }
        
        console.log('Header block parallax effects created successfully!');
        
    } catch (error) {
        console.error('Error creating header block parallax:', error);
    }
}

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















