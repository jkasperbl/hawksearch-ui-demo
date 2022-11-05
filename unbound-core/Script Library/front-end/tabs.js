// Responsive tabs/accordion. Basically just adds class .is-active to first tab on load and then any tab clicked on. you show and hide the proceeding content through the css
// Responsive behavior is in the CSS
$(document).ready(function() {
    //loop through all instances of tabs on the page and add ".is-active" to the first one
    initTabs();
    //toggle the "is-active" class on the links with click
    $(document).on("click", '.tabs > li > a', function () {
        if (!$(this).hasClass('is-active')) {
            $(this).closest('.tabs').find('a.is-active').removeClass('is-active');
            $(this).addClass('is-active');
            /*In the css, the li's have display:block set on them for mobile view, which is changed to display:inline on larger screens. So we check if the li has display:block, and if so, scroll the page so the open item is at the top of the viewscreen so it is easier to read and the accordion doesnt jump around like a weirdo.*/
            if ($(this).parent('li').css('display') == 'block') {
                $('html, body').animate({
                   scrollTop: $(this).offset().top - 50
                }, 500);
                return false;
            }
        } else {
            if ($('.tabs > li').css('display') == 'block') {
                $(this).closest('.tabs').find('a.is-active').removeClass('is-active');
            }
        }
    });
});
function initTabs() {
    if ($('.tabs').length > 0) {
        $('.tabs li a').removeClass('is-active');
        $('.tabs li:first-child a').addClass('is-active');
    }
}
