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