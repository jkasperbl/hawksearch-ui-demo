//toggle user nav on mobile
function mobileUserToggle(el) {
   var $this = $(el);
   if (window.matchMedia("(max-width: 1023px)").matches) {
      $this.toggleClass('is-active');
   } else {
      $this.removeClass('is-active');
   }
}

$(document).ready(function() {
   $(document).on('click', '.navUser', function() {
      mobileUserToggle($(this));
   });

   $(window).on('resize orientationchange', function() {
      $('.navUser').removeClass('is-active');
   });
});
