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
        $(".chosen-select").chosen({
            disable_search_threshold: 4,
            no_results_text: "Нічого не знайдено"
        });

        // ----- SELECT2 -----
        $('.select2-select').select2({
            placeholder: "Choose...",
            allowClear: true
            //     // dropdownParent: $('.select-select2-container'),
            //     // minimumResultsForSearch: Infinity
        });

        // ========== SLIDER ==========

        // ----- SLICK SLIDER COUNTER -----
        // $('#link3 .slider').on('init reInit afterChange', function (event, slick, currentSlide) {
        //     var i = (currentSlide ? currentSlide : 0) + 1;
        //     $('.slider-counter').text(i + '/' + slick.slideCount);
        // });

        // ----- SLICK SLIDER -----
        $(".slider-full").slick({
            prevArrow: "<div class='arrow left'><i class='fa fa-angle-left'></i></div>",
            nextArrow: "<div class='arrow right'><i class='fa fa-angle-right'></i></div>",
            dots: true
        });

        $(".slider-two").slick({
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

        $(".slider-three").slick({
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

        // ========== ANIMATION ==========

        // new WOW().init();


        // ========== ACCORDION ==========

        (function () {
            var acc = document.getElementsByClassName("accordion--heading");
            var i;

            for (i = 0; i < acc.length; i++) {

                acc[i].addEventListener("click", function () {
                    this.classList.toggle("active");
                    var panel = this.nextElementSibling;
                    if (panel.style.maxHeight) {
                        panel.style.maxHeight = null;
                    } else {
                        panel.style.maxHeight = panel.scrollHeight + "px";
                    }
                });
            }


        })();

        // ========== TABS ==========

        (function () {
            $('.tabs li a').click(function (e) {
                e.preventDefault();

                $('.tabs li a, .tabs-content').removeClass('active');

                var tab = $(this).attr('data-tab');

                $(this).addClass('active');

                tabs(tab);
            })

            function tabs(tab) {
                var tabcontent = $('.tabs-content');

                for (var i = 0; i < tabcontent.length; i++) {
                    if ($(tabcontent[i]).attr('id') == tab) {
                        $(tabcontent[i]).addClass('active');
                    }
                }
            }
        })();


        // ========== DATEPICKER ==========
        $(".datepicker").datepicker({
        });

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


