'use strict';

(function ($) {
    $.fn.rewAccordion = function () {
        var make = function make() {
            var accordionLinks = $(this).find('.accordion_heading');
            var accordionContent = $(this).find('.accordion__panel');

            for (var i = 0; i < accordionLinks.length; i++) {
                $(accordionLinks[i]).click(function (e) {
                    e.preventDefault();

                    var j = $(accordionLinks).index(this);

                    if ($(this).hasClass('active')) {

                        $(this).removeClass('active');
                        $(accordionContent[j]).slideUp();
                    } else {

                        $(accordionLinks).removeClass('active');
                        $(accordionContent).slideUp();

                        $(this).addClass('active');
                        $(accordionContent[j]).slideDown();
                    }
                });
            }
        };
        return this.each(make);
    };
})(jQuery);
(function ($) {
    $.fn.rewTabs = function () {
        var make = function make() {
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
        return this.each(make);
    };
})(jQuery);
(function ($) {
    "use strict";

    var DOMs = {

        documentBodyHtml: $("html, body"),
        // documentBody: $("body"),

        menuTrigger: $("#menu-trigger")

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

    $(document).ready(function () {

        // ========== MENU ==========

        DOMs.menuTrigger.click(function (e) {
            e.preventDefault();
            DOMs.documentBodyHtml.toggleClass("open");

            if ($('body').hasClass('open')) {
                disableScroll();
            } else {
                enableScroll();
            }
        });

        var keys = { 37: 1, 38: 1, 39: 1, 40: 1 };

        function preventDefault(e) {
            e = e || window.event;
            if (e.preventDefault) {
                e.preventDefault();
            }
            e.returnValue = false;
        }

        function preventDefaultForScrollKeys(e) {
            if (keys[e.keyCode]) {
                preventDefault(e);
                return false;
            }
        }

        function disableScroll() {
            if (window.matchMedia("(max-width: 767px)").matches) {
                if (window.addEventListener) {
                    // older FF
                    window.addEventListener('DOMMouseScroll', preventDefault, false);
                }
                window.onwheel = preventDefault; // modern standard
                window.onmousewheel = document.onmousewheel = preventDefault; // older browsers, IE
                window.ontouchmove = preventDefault; // mobile
                document.onkeydown = preventDefaultForScrollKeys;
            }
        }

        function enableScroll() {
            if (window.matchMedia("(max-width: 767px)").matches) {
                if (window.removeEventListener) {
                    window.removeEventListener('DOMMouseScroll', preventDefault, false);
                }
                window.onmousewheel = document.onmousewheel = null;
                window.onwheel = null;
                window.ontouchmove = null;
                document.onkeydown = null;
            }
        }

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

(function () {
    'use strict';
})();