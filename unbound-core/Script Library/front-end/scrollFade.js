/*
INSTRUCTIONS

To use this plugin, call the .scrollFade() function on any jQuery element.
It should probably only be used on below the fold content that the user
will scroll to, but you can play around with it to see what you like.

If the element you use this function on has other css animations, they will
be disabled until after the .scrollFade() function has completed. 

You can pass parameters to change the functionality of the plugin, they 
are passed as an object with {key: value} pairs inside the plugin function.

ex $('.someObject').scrollFade({
   key: value,
   key2: value2
})

There are 4 optional parameters and one required parameter.

REQUIRED PARAMETERS:
------------------------------------------------------------------------------------
testParent: this is an HTML element, CSS class, or ID that is passed as a string.
It is required so that the function has some element that it can test against to
see if the objects that are animated are children of the same parent element. This
is important in calculation in the animation delay of elements as well as the 
calculation of the start time of the animation for all elements. If this parameter
is not provided - the plugin will fail and throw an error alert.
   EX:
   $('.spotlight-content > *').scrollFade({
      testParent: '.spotlight-content'
   });

OPTIONAL PARAMETERS
------------------------------------------------------------------------------------
duration: the duration of the fade in animation in seconds passed as a number.
Default is 0.5 seconds.
   EX:
   $('.spotlight-content > *').scrollFade({
      duration: 0.25
   });

useDelay: a boolean (true or false) that tells the plugin whether to stagger
the animation of children elements. If it's false, then the elements will load 
simultaneously, if it's true they will load one at a time. Default is true.
   EX:
   $('.spotlight-content > *').scrollFade({
      useDelay: false
   });

delayIncrement: the amount of time to delay the animation of children elements of 
the same parent. AKA: Staggering of animation from first to last item.
It should be passed as a number (only valid if useDelay is true).
Default is 0.5 seconds.
   EX:
   $('.spotlight-content > *').scrollFade({
      delayIncrement: 0.75
   });

visibleDistance: the distance from the bottom of the screen and element must be
to start the fade in animation passed as a number. This number is in VH units (percent
of the screen height), to accommodate smaller screens - pixels would cause a problem on
smaller screen. Passing 50 would start the animation at the middle of the screen.
Passing 0 would start at the very bottom of the screen. The default is 30.
   EX:
   $('.spotlight-content > *').scrollFade({
      visibleDistance: 20
   });

mediaQuery: the screen size above which this plugin will work. Passed as a number. The
default is 0; it will work on all screen sizes.
   EX:
   $('.spotlight-content > *').scrollFade({
      mediaQuery: 841
   });

*/

/*Put all of your scroll fade calls inside this $(window).load() function. Its important
that this plugin loads after everything else has loaded*/

$(window).load(function() {
   $('.featureBlock .featureBlock-figure').scrollFade({
      testParent: '.featureBlock',
      mediaQuery: 1024
   });

   $('.spotlight-content > *').scrollFade({
      testParent: '.spotlight-content'
   });
});


//Plugin Code - dont mess with this

(function($) {
   $.fn.scrollFade = function(opts) {
      var defaults = {
         duration: 0.5,
         useDelay: true,
         delayIncrement: 0.5,
         visibleDistance: 30,
         mediaQuery: 0
      };
      var options = $.extend({}, defaults, opts);

      var duration = options.duration;
      var useDelay = options.useDelay;
      var delayIncrement = options.delayIncrement;
      var visibleDistance = (options.visibleDistance / 100) * $(window).innerHeight();
      var mediaQuery = options.mediaQuery;

      if (window.matchMedia('(max-width:' + mediaQuery + 'px)').matches) {
         return;
      }

      var $items = $(this);
      var $previousParent;
      var delay = 0;

      if (!$items.length) {
         return;
      }

      if (typeof options.testParent === "undefined") {
         alert('The "testParent" parameter is required for the fadeScroll() plugin. ' +
            'It is missing from the plugin called on:\n\n' + $items.selector + '.');
         return;
      } else {
         var testParent = options.testParent;
      }

      var itemsOffsetTop = $items.closest(testParent).offset().top;

      if ($(window).scrollTop() + $(window).outerHeight() > itemsOffsetTop) {
         return;
      }

      $items.css('transition', 'none').css('opacity', 0.0);

      $items.css({
         transition: 'transform ' + duration + 's ease-out, opacity ' + duration + 's ease-out',
         transform: 'scale(1.07, 1.07) translate(0, 25px)'
      });

      $items.each(function() {
         var $item = $(this);
         var $itemParent = $item.closest(testParent);
         var itemParentOffsetTop = $itemParent.offset().top + visibleDistance;
         var animationPending = true;

         if (typeof $previousParent === "undefined") {
            $previousParent = $itemParent;
         }

         if ($previousParent.get(0) !== $itemParent.get(0)) {
            delay = 0;
         }

         $item.css({
            'transition-delay': delay + 's'
         });

         $(window).scroll(function() {
            if (animationPending) {
               if ($(window).scrollTop() + $(window).outerHeight() > itemParentOffsetTop) {
                  $item.css({
                     opacity: 1,
                     top: '0',
                     transform: 'scale(1, 1) translate(0, 0)'
                  });
                  setTimeout(function() {
                     $item.css('opacity', '')
                        .css('top', '')
                        .css('transform', '')
                        .css('transition', '');
                     animationPending = false;
                  }, (duration + delay) * 1000);
               }
            }
         });
         if (useDelay) {
            delay = delay + delayIncrement;
         }
         $previousParent = $itemParent;
      });
      return $items;
   };
}(jQuery));
