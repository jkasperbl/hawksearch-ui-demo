$(document).ready(function() {
   $(".banner--fixedBackground").parallax();
   $(".sliderMainImage").parallax();
});


(function($) {
   $.fn.parallax = function() {
      var $elements = this;
      parallaxMe($elements);
      
      $(window).on("scroll resize orientationchange", function() {
         parallaxMe($elements);
      });

      function parallaxMe(els) {
         var $els = $($elements);
         if (window.matchMedia("(min-device-width: 700px)").matches && window.matchMedia("(min-width: 841px)").matches) {
            $els.each(function() {
               var elementTop = $(this).offset().top;
               var elementHight = $(this).outerHeight();
               var scrollTop = $(window).scrollTop();
               var viewHeight = $(window).innerHeight();

               var inViewport = scrollTop - elementTop + viewHeight;
               var bgpos = -(((elementTop - scrollTop + elementHight) / (viewHeight + elementHight)) * 150);

               if (inViewport > 0 && !(scrollTop > (elementTop + elementHight))) {
                  $(this).css("background-position-y", bgpos + "px");
               }
            });
         } else {
            $els.css("background-position-y", "");
         }
         return $els;
      }
      return $elements;
   }
}(jQuery));
