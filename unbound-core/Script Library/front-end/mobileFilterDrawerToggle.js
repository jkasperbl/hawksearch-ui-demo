//mobile filter drawer
(function($) {
    $.fn.filterToggle = function() {
        waitForFinalEvent(
            function() {
                function closeFilters() {
                    $('body').removeClass('mobileFilterDrawer-open');
                    $('.mobileFilterDrawerMask').remove();
                }

                function openFilters() {
                    $('body').addClass('mobileFilterDrawer-open');
                    if (!$('.mobileFilterDrawerMask').length) {
                        $('body').append($("<div></div>").addClass('mobileFilterDrawerMask'));
                    }
                }
                if (window.matchMedia("(max-width: 641px)").matches) {

                    $('.js-mobileFilterDrawerToggle').click(function() {
                        openFilters();
                    });

                    $('.mobileFilterDrawer-close').click(function() {
                        closeFilters();
                    });

                    $(document).delegate('.mobileFilterDrawerMask','click',function() {
                        closeFilters();
                    });

                } else {
                    closeFilters();
                }
            }, 200, "filterToggleResize");
    };
})(jQuery);
$(window).bind('load resize orientationchange', $.fn.filterToggle);
