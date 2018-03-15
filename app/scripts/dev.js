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

        // ========== ANIMATION ==========

        // new WOW().init();


        // ========== ACCORDION ==========

        (function ($) {
            $.fn.rewAccordion = function () {
                var accordionLinks = $('.accordion--heading');
                var accordionContent = $('.accordion--panel');

                for (var i = 0; i < accordionLinks.length; i++) {
                    $(accordionLinks[i]).click(function (e) {
                        e.preventDefault();

                        var j = $(accordionLinks).index(this);

                        if ($(this).hasClass('active')) {

                            $(this).removeClass('active');
                            $(accordionContent[j]).slideUp();

                        } else {

                            $(accordionLinks).removeClass('active');
                            $(accordionContent).slideUp()

                            $(this).addClass('active');
                            $(accordionContent[j]).slideDown();
                        }
                    });
                }
            };
        })(jQuery);

        $('#accordion').rewAccordion();

        // ========== TABS ==========

        (function ($) {
            $.fn.rewTabs = function () {

                var tabLinks = $(this).find('.tabs li a');
                var tabContent = $(this).find('.tabs-content');

                for (var i = 0; i < tabLinks.length; i++) {
                    $(tabLinks[i]).click(function (e) {
                        e.preventDefault();

                        $(tabLinks).removeClass('active');
                        $(tabContent).removeClass('active');

                        var j = $(tabLinks).index(this);

                        $(this).addClass('active');
                        $(tabContent[j]).addClass('active');
                    });
                }
            };
        })(jQuery);

        $('#tabs').rewTabs();


        // ========== DATEPICKER ==========
        // $(".datepicker").datepicker({});

        // ========== FULL PAGE SCROLLING ==========

        // ----- FULL PAGE -----
        // $('#fullpage').fullpage();

        // ----- SLIM SCROLL -----
        // $('.slim').slimScroll({
        //     height: '200px'
        // });

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
        // $(".smooth").click(function (event) {
        //     event.preventDefault();
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


