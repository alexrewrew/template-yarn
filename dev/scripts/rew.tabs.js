(function ($) {
    $.fn.rewTabs = function() {

        const tabLinks = $(this).find('.tabs li a');
        const tabContent = $(this).find('.tabs-content');


        for (let i = 0; i < tabLinks.length; i++) {
            $(tabLinks[i]).click(function(e) {
                e.preventDefault();

                $(tabLinks).removeClass('active');
                $(tabContent).removeClass('active');

                let j = $(tabLinks).index(this);

                $(this).addClass('active');
                $(tabContent[j]).addClass('active');
            });
        }
    };
})(jQuery);