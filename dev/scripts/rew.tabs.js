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