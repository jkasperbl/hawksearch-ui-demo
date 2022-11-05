$(document).ready(function() {
   $('.navCallout li.hasChildren').click(function(event) {
      if (window.matchMedia("(max-width: 1024px)").matches) {
         event.preventDefault();
         $(this).toggleClass('is-open');
      }
   });
});
