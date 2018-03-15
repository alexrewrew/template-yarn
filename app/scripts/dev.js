(function () {
    "use strict";

    $(document).ready(function () {

        // ========== MENU ==========

        $('#menu-trigger').click(function (e) {
            e.preventDefault();
            $('html, body').toggleClass('open');
        });

        // ========== SELECT ==========

        // ----- CHOSEN -----
        // $(".chosen-select").chosen({
        //     disable_search_threshold: 4,
        //     no_results_text: "Нічого не знайдено"
        // });

        // ----- SELECT2 -----
        // $('.select2-select').select2({
        //     placeholder: "Choose...",
        //     allowClear: true
        //     // dropdownParent: $('.select-select2-container'),
        //     // minimumResultsForSearch: Infinity
        // });

        // ========== SLIDER ==========

        // ----- SLICK SLIDER COUNTER -----
        // $('#link3 .slider').on('init reInit afterChange', function (event, slick, currentSlide) {
        //     var i = (currentSlide ? currentSlide : 0) + 1;
        //     $('.slider-counter').text(i + '/' + slick.slideCount);
        // });

        // ----- SLICK SLIDER -----
        // $(".slider-full").slick({
        //     prevArrow: "<div class='arrow left'><i class='fa fa-angle-left'></i></div>",
        //     nextArrow: "<div class='arrow right'><i class='fa fa-angle-right'></i></div>",
        //     dots: true
        // });
        //
        // $(".slider-two").slick({
        //     dots: true,
        //     slidesToShow: 2,
        //     slidesToScroll: 1,
        //     prevArrow: "<div class='arrow left'><i class='fa fa-angle-left'></i></div>",
        //     nextArrow: "<div class='arrow right'><i class='fa fa-angle-right'></i></div>",
        //     responsive: [
        //         {
        //             breakpoint: 991,
        //             settings: {
        //                 slidesToShow: 1,
        //                 slidesToScroll: 1
        //             }
        //         }
        //     ]
        // });
        //
        // $(".slider-three").slick({
        //     dots: true,
        //     slidesToShow: 3,
        //     slidesToScroll: 2,
        //     prevArrow: "<div class='arrow left'><i class='fa fa-angle-left'></i></div>",
        //     nextArrow: "<div class='arrow right'><i class='fa fa-angle-right'></i></div>",
        //     responsive: [
        //         {
        //             breakpoint: 991,
        //             settings: {
        //                 slidesToShow: 2,
        //                 slidesToScroll: 2
        //             }
        //         },
        //         {
        //             breakpoint: 767,
        //             settings: {
        //                 slidesToShow: 1,
        //                 slidesToScroll: 1
        //             }
        //         }
        //     ],
        // });

        // ========== ACCORDION ==========
        $('#accordion').rewAccordion();

        // ========== TABS ==========
        $('#tabs').rewTabs();

        // ========== DATEPICKER ==========
        // $(".datepicker").datepicker({});

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

        // ANCHOR LINKS SCROLLING
        // $(".smooth").click(function (e) {
        //     e.preventDefault();
        //     var id = $(this).attr("href"),
        //         top = $(id).offset().top - 70;
        //     $("body,html").animate({
        //         scrollTop: top
        //     }, 1500);
        // });
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


