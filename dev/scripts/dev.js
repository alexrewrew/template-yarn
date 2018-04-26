(function () {
    "use strict";

    var DOMs = {

        documentBodyHtml : $('html, body'),
        documentBody : $('body'),

        menuTrigger : $('#menu-trigger'),

        selectChosen : $(".chosen-select"),
        selectSelect2 : $('.select2-select'),

        sliderFull : $('.slider-full'),

        linkSmooth : $(".smooth")
    };

    $(document).ready(function () {

        // ========== MENU ==========

        DOMs.menuTrigger.click(function (e) {
            e.preventDefault();
            DOMs.documentBodyHtml.toggleClass('open');
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
        //     allowClear: true
            // dropdownParent: $('.select-select2-container'),
            // minimumResultsForSearch: Infinity
        // });

        // ========== SLIDER ==========

        // ----- SLICK SLIDER COUNTER -----
        DOMs.sliderFull.on('init reInit afterChange', function (event, slick, currentSlide) {
            var i = (currentSlide ? currentSlide : 0) + 1;
            $('.slider-counter').text(i + '/' + slick.slideCount);
        });

        // ----- SLICK SLIDER -----
        DOMs.sliderFull.slick({
            prevArrow: "<div class='arrow left'><i class='fa fa-angle-left'></i></div>",
            nextArrow: "<div class='arrow right'><i class='fa fa-angle-right'></i></div>",
            dots: true
        });

        // ========== ACCORDION ==========
        // $('#accordion').rewAccordion();

        // ========== TABS ==========
        // $('#tabs').rewTabs();

        // ========== DATEPICKER ==========
        // $(".datepicker").flatpickr();

        // ========== SCROLLSPY ==========

        // ----- SCROLLING CLASS CHANGE -----
        // $(window).scroll(function () {
        //     if ($(this).scrollTop() > 200) {
        //         $(".link-up").addClass("visible");
        //     }
        //     else {
        //         $(".link-up").removeClass("visible");
        //     }
        // });

        // ----- ANCHOR LINKS SCROLLING -----
        DOMs.linkSmooth.click(function (e) {
            e.preventDefault();
            var id = $(this).attr("href"),
                top = $(id).offset().top - 70;
            DOMs.documentBodyHtml.animate({
                scrollTop: top
            }, 1500);
        });
    });

// ========== !!! RESPONSIVE SCRIPTS !!! ===========

    // $(window).on('load resize', function () {
    //     if (window.matchMedia("(max-width: 767px)").matches) {
    //
    //     } else if (window.matchMedia("(min-width: 768px)").matches) {
    //
    //     }
    // });

})();


