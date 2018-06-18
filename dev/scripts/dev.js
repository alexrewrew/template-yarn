(($) => {
    "use strict";

    const DOMs = {

        documentBodyHtml: $("html, body"),
        // documentBody: $("body"),

        menuTrigger: $("#menu-trigger"),

        // selectChosen: $(".chosen-select"),
        // selectSelect2: $(".select2-select"),
        // selectSelect2Container: $(".select-select2-container"),
        //
        // sliderFull: $(".slider-full"),
        // sliderArrowLeft : "",
        // sliderArrowRight : "",
        // sliderCounter : $(".slider-counter"),
        //
        // linkSmooth: $(".smooth"),
        // linkUp : $(".link-up"),
        //
        // accordion : $('#accordion'),
        // tabs : $('#tabs'),
        // datepicker : $(".datepicker"),

    };

    $(document).ready(() => {
        
        // ========== MENU ==========

        DOMs.menuTrigger.click((e) => {
            e.preventDefault();
            DOMs.documentBodyHtml.toggleClass("open");
        });

        // ========== SELECT ==========

        // ----- CHOSEN -----
        // DOMs.selectChosen.chosen({
        //     disable_search_threshold: 4,
        //     no_results_text: "Нічого не знайдено"
        // });

        // ----- SELECT2 -----
        // DOMs.selectSelect2.select2({
        //     placeholder: "Choose...",
        //     allowClear: true,
        //     dropdownParent: DOMs.selectSelect2Container,
        //     minimumResultsForSearch: Infinity
        // });

        // ========== SLIDER ==========

        // ----- SLICK SLIDER COUNTER -----
        // DOMs.sliderFull.on("nit reInit afterChange", (event, slick, currentSlide) => {
        //     let i = (currentSlide ? currentSlide : 0) + 1;
        //     DOMs.sliderCounter.text(i + '/' + slick.slideCount);
        // });

        // ----- SLICK SLIDER -----
        // DOMs.sliderFull.slick({
        //     prevArrow: DOMs.sliderArrowLeft,
        //     nextArrow: DOMs.sliderArrowRight,
        //     dots: true
        // });

        // ========== ACCORDION ==========
        // DOMs.accordion.rewAccordion();

        // ========== TABS ==========
        // DOMs.tabs.rewTabs();

        // ========== DATEPICKER ==========
        // DOMs.datepicker.flatpickr();

        // ========== SCROLLSPY ==========

        // ----- SCROLLING CLASS CHANGE -----
        // $(window).scroll(() => {
        //     if ($(this).scrollTop() > 200) {
        //         DOMs.linkUp.addClass("visible");
        //     }
        //     else {
        //         DOMs.linkUp.removeClass("visible");
        //     }
        // });

        // ----- ANCHOR LINKS SCROLLING -----
        // DOMs.linkSmooth.click((e) => {
        //     e.preventDefault();
        //     const id = $(this).attr("href");
        //     let top = $(id).offset().top - 70;
        //     DOMs.documentBodyHtml.animate({
        //         scrollTop: top
        //     }, 1500);
        // });

        // if (bowser.firefox) {
        //     DOMs.body.addClass('brow-firefox');
        // }
        // if (bowser.safari) {
        //     DOMs.body.addClass('brow-safari');
        // }
        // if (bowser.msie) {
        //     DOMs.body.addClass('brow-msie');
        // }
        // if (bowser.msedge) {
        //     DOMs.body.addClass('brow-msedge');
        // }


    });

// ========== !!! RESPONSIVE SCRIPTS !!! ===========

    // $(window).on('load resize', function () {
    //     if (window.matchMedia("(max-width: 767px)").matches) {
    //
    //     } else if (window.matchMedia("(min-width: 768px)").matches) {
    //
    //     }
    // });

})(jQuery);


