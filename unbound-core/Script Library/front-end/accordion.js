// basic accordion
$(document).ready(function() {
    //loop through all instances of tabs on the page and add ".is-active" to the first one
    initAccordion();
    //toggle the "is-active" class on the links with click
    $(document).on('click', '.accordion > li > span', function() {
        if (!$(this).parent().hasClass('is-active')) {
            $(this).closest('.accordion').find('.is-active').removeClass('is-active');
            $(this).parent().addClass('is-active');
            $('html, body').animate({
                scrollTop: $(this).offset().top - 120
            }, 500);
        } else {
            $(this).parent().removeClass('is-active');
        }
    });
});

function initAccordion() {
   if ($('.accordion').length > 0) {
      $('.accordion li').removeClass('is-active');
      var anchor = $('a[id=' + window.location.hash.substring(1) + ']');
      if (window.location.hash.substring(1).length && anchor.length) {
         anchor.closest('li').addClass('is-active');
      } else {
         $('.accordion li:first-child').addClass('is-active');
      }
   }
}