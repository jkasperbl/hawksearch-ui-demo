//make nav stick to top
$(document).ready(function() {
    if (!$('.headerMain--stripped').length) {
        var topDistance = $(window).scrollTop();
        var navbarHeight = $('.headerMain-main').outerHeight();
        var utilbarHeight = $('.headerMain-util').outerHeight();
        var headerHeight = navbarHeight + utilbarHeight;

        var utilFirst = false;

        if ($('.headerMain-util').index() < $('.headerMain-main').index()) {
            utilFirst = true;
        }

        $(window).scroll(function() {
            var lastPosition = $(this).scrollTop();
            if (lastPosition > topDistance) {
                // I have scrolled down
                if ($(window).scrollTop() > headerHeight) {
                    // I have scrolled past the header
                    $('body').removeClass('js-headerFixed--down').addClass('js-headerFixed--up');
                    $('.pageWrap').css('padding-top', navbarHeight);
                    $('a.backToTop').addClass('backToTop--scrolled');
                } else {
                    $('body').removeClass('js-headerFixed--down').removeClass('js-headerFixed--up');
                    $('.pageWrap').css('padding-top', '');
                    $('a.backToTop').removeClass('backToTop--scrolled');                    
                }
            } else if (lastPosition + 2 < topDistance) {
                // I have scrolled up
                if (utilFirst) {
                    //The utility header is before the main header in the DOM
                    if ($(window).scrollTop() >= utilbarHeight) {
                        $('body').addClass('js-headerFixed--down').removeClass('js-headerFixed--up');
                    } else {
                        $('body').removeClass('js-headerFixed--down').removeClass('js-headerFixed--up');
                        $('.pageWrap').css('padding-top', '');
                        $('a.backToTop').removeClass('backToTop--scrolled');                    
                    }
                } else {
                    //The utility header is after the main header in the DOM
                    if ($(window).scrollTop() >= 1) {
                        $('body').addClass('js-headerFixed--down').removeClass('js-headerFixed--up');
                    } else {
                        $('body').removeClass('js-headerFixed--down').removeClass('js-headerFixed--up');
                        $('.pageWrap').css('padding-top', '');
                    }
                }
            }
            topDistance = lastPosition;
        });
    }
});

