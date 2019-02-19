(($) => {
    "use strict";

    // --- DOM elements ---
    const DOMs = {
        documentBody: $("body"),
        documentBodyHtml: $("html, body"),

        navTrigger: $("#nav-trigger"),

        selectChosen: $(".select-chosen"),
        selectSelect2: $(".select-select2"),
        selectSelect2Container: $(".select-select2-container"),

        sliderSlick: $(".slider-slick"),
        sliderSlickArrowLeft: "<div class='slider-slick__arrow left'></div>",
        sliderSlickArrowRight: "<div class='slider-slick__arrow right'></div>",
        sliderSlickCounter: $(".slider-slick-counter"),
        sliderOwl: $('.owl-carousel'),

        linkSmooth: $(".smooth"),
        linkUp: $(".link-up"),

        accordion: $('.accordion'),
        tabs: $('.tabs-wrapper'),
        datepicker: $(".datepicker"),

    };

    const STATEs = {
        hidden: 'hidden',
        visible: 'visible',
        scroll: 'scroll',
        active: 'active',
        open: 'open'
    };

    // --- Browser detection ---
    // const browser = bowser.getParser(window.navigator.userAgent);
    // const currentBrowser = browser.getBrowserName();
    //
    // if (currentBrowser === 'Firefox') {
    //     DOMs.documentBody.addClass('brow-firefox');
    // }
    // if (currentBrowser === 'Chrome') {
    //     DOMs.documentBody.addClass('brow-chrome');
    // }
    // if (currentBrowser === 'Safari') {
    //     DOMs.documentBody.addClass('brow-safari');
    // }
    // if (currentBrowser === 'Internet Explorer') {
    //     DOMs.documentBody.addClass('brow-msie');
    // }
    // if (currentBrowser === 'Microsoft Edge') {
    //     DOMs.documentBody.addClass('brow-msedge');
    // }

    // --- Size detection ---
    const NUMs = {
        windowHeight: 0,
        windowWidth: 0
    };

    // --- Init page ---
    const initPage = function () {
        // NUMs.windowHeight = $(window).height();
        // NUMs.windowWidth = $(window).width();
        NUMs.windowHeight = window.innerHeight;
        NUMs.windowWidth = window.innerWidth;
    };

    // --- Viewport element detection ---
    $.fn.isInViewport = function () {
        let elementTop = $(this).offset().top;
        let elementBottom = elementTop + $(this).outerHeight();
        let viewportTop = $(window).scrollTop();
        let viewportBottom = viewportTop + NUMs.windowHeight;
        return elementBottom > viewportTop && elementTop < viewportBottom;
    };

    // --- Responsive scripts ---

    $(window).on('load resize', function () {
        initPage();

        // if (NUMs.windowWidth < 768) {

        // } else if (NUMs.windowWidth > 767) {

        // }
    });

    // --- Document ready scripts ---
    $(document).ready(function () {

        // --- Nav trigger ---
        DOMs.navTrigger.on('click', function (e) {
            e.preventDefault();
            DOMs.documentBodyHtml.toggleClass(STATEs.open);
        });

        // --- Scroll speed ---
        // jQuery.scrollSpeed(100, 600);

        // --- Select Chosen ---
        // DOMs.selectChosen.chosen({
        //     disable_search_threshold: 4,
        //     no_results_text: "Нічого не знайдено"
        // });

        // --- Select Select2 ---
        // DOMs.selectSelect2.select2({
        //     placeholder: "Choose...",
        //     allowClear: true,
        //     dropdownParent: DOMs.selectSelect2Container,
        //     minimumResultsForSearch: Infinity
        // });

        // --- Slider Slick Counter ---
        // DOMs.sliderSlick.on("nit reInit afterChange", (event, slick, currentSlide) => {
        //     let i = (currentSlide ? currentSlide : 0) + 1;
        //     DOMs.sliderSlickCounter.text(i + '/' + slick.slideCount);
        // });

        // --- Slider Slick
        // DOMs.sliderSlick.slick({
        //     prevArrow: DOMs.sliderSlickArrowLeft,
        //     nextArrow: DOMs.sliderSlickArrowRight,
        //     dots: true,
        //     variableWidth: true,
        //     adaptiveHeight: true
        // });

        // --- Slider Owl ---
        // DOMs.sliderOwl.owlCarousel({
        //     center: true,
        //     items: 2,
        //     autoWidth: true,
        //     loop: true,
        // });

        // --- Slider Swiper ---
        // const swiper = new Swiper('.swiper-container', {
        //     slidesPerView: 'auto',
        //     centeredSlides: true,
        //     spaceBetween: 45,
        //     loop: true,
        //     preventClicks: false,
        //     preventClicksPropagation: false,
        //     slideToClickedSlide: true,
        //     autoplay: {
        //         delay: 2500,
        //         disableOnInteraction: false,
        //     },
        //     pagination: {
        //         el: '.swiper-pagination',
        //         type: 'fraction',
        //         clickable: true,
        //     },
        //     navigation: {
        //         prevEl: '.swiper-arrow.left',
        //         nextEl: '.swiper-arrow.right',
        //     },
        // });

        // --- Accordion ---
        // DOMs.accordion.rewAccordion();

        // --- Tabs ---
        // DOMs.tabs.rewTabs();

        // --- Datepicker ---
        // DOMs.datepicker.flatpickr();

        // --- Scroll class change ---
        // $(window).scroll(function () {
        //     if ($(this).scrollTop() > 200) {
        //         DOMs.linkUp.addClass(STATEs.visible);
        //     } else {
        //         DOMs.linkUp.removeClass(STATEs.visible);
        //     }
        // });

        // --- Anchor links smooth ---
        // DOMs.linkSmooth.on('click', function (e) {
        //     e.preventDefault();
        //
        //     const id = $(this).attr("href");
        //     const top = $(id).offset().top - 70;
        //
        //     DOMs.documentBodyHtml.animate({
        //         scrollTop: top
        //     }, 500);
        // });
    });



})(jQuery);




