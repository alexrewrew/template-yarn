(function ($) {
    $.fn.rewAccordion = function () {


        var accordionLinks = $(this).find('.accordion--heading');
        var accordionContent = $(this).find('.accordion--panel');

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
(function () {
    "use strict";

    var DOMs = {

        documentBodyHtml : $('html, body'),
        documentBody : $('body'),

        menuTrigger : $('#menu-trigger'),

        selectChosen : $(".chosen-select"),
        selectSelect2 : $('.select2-select'),

        sliderFull : $('.slider-full'),
        sliderTwo : $(".slider-two"),
        sliderThree : $(".slider-three"),

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
        DOMs.selectChosen.chosen({
            disable_search_threshold: 4,
            no_results_text: "Нічого не знайдено"
        });

        // ----- SELECT2 -----
        DOMs.selectSelect2.select2({
            placeholder: "Choose...",
            allowClear: true
            // dropdownParent: $('.select-select2-container'),
            // minimumResultsForSearch: Infinity
        });

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

        DOMs.sliderTwo.slick({
            dots: true,
            slidesToShow: 2,
            slidesToScroll: 1,
            prevArrow: "<div class='arrow left'><i class='fa fa-angle-left'></i></div>",
            nextArrow: "<div class='arrow right'><i class='fa fa-angle-right'></i></div>",
            responsive: [
                {
                    breakpoint: 991,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1
                    }
                }
            ]
        });

        DOMs.sliderThree.slick({
            dots: true,
            slidesToShow: 3,
            slidesToScroll: 2,
            prevArrow: "<div class='arrow left'><i class='fa fa-angle-left'></i></div>",
            nextArrow: "<div class='arrow right'><i class='fa fa-angle-right'></i></div>",
            responsive: [
                {
                    breakpoint: 991,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 2
                    }
                },
                {
                    breakpoint: 767,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1
                    }
                }
            ],
        });

        // ========== ACCORDION ==========
        $('#accordion').rewAccordion();

        // ========== TABS ==========
        $('#tabs').rewTabs();

        // ========== DATEPICKER ==========
        $(".datepicker").flatpickr();

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



(function () {
    'use strict';
})();