(function ($) {
    $.fn.rewAccordion = function() {

        const accordionLinks = $(this).find('.accordion--heading');
        const accordionContent = $(this).find('.accordion--panel');

        for (let i = 0; i < accordionLinks.length; i++) {
            $(accordionLinks[i]).click(function(e) {
                e.preventDefault();

                const j = $(accordionLinks).index(this);

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