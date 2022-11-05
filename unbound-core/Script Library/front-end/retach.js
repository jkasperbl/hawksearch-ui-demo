
/* Instructions:
1. Define the main element you want moved (theElement)
2. Define the container you want the element moved to (destination: '.destinationContainer')
3. Define the breakpoint at which you want the element moved in pixels (mediaQuery: 1000) 
    3a. This is optional - the default is 1023
4. Define the modifier class you want added to the element while it is moved (movedClass: 'someClassName')
    4a. This is optional - the default is 'is-moved'
    5. Define whether you would like the element to be prepended (added to beginning)
    or appended (added to end) of destination container

FULL EXAMPLE:
$('.navCallout').retach({
    destination:'.globals-mobile', 
    mediaQuery: 641,
    movedClass: 'navCallout-mobile',
    prependAppend: 'prepend'
});

Let's break this down:

//.navCallout is what we want to move around
$('.navCallout').retach({

    //We specify that the element should be moved to the div with the class of .globals-mobile
    destination: '.globals-mobile',

    //This element should be moved while screen width is LESS THAN 641px wide
    mediaQuery: 641,

    //We add the class of "navCallout-mobile" to the element while it is moved from it's original location
    movedClass: 'navCallout-mobile',

    //instead of appending the element to the container, we will prepend it
    prependAppend: 'prepend'
});

HEADER SPECIFIC EXAMPLE:
Let's say different headers have different elements and we want some to appear in the global-mobiles drawer

    //for the element we want to move, just add the classname of the appropriate header
    $('.headerMain--franchise .locSearch').retach({
        destination:'.globals-mobile', 
        mediaQuery: 641,
        movedClass: 'locSearch-mobile',
        prependAppend: 'prepend'
    });

*/


$(document).ready(function() {
  //attach main nav items to the main mobile nav in the drawer
  $('.navMain > ul > li').retach({
    destination: '.navMain-mobile > ul'
  });
  //attach util nav items to the main mobile nav in the drawer
  $('.navUtil > ul > li').retach({
    destination: '.navMain-mobile > ul'
  });
  //send the filters to the drawer on mobile
  $('.filters').retach({
    destination: '.filters-mobile',
    mediaQuery: 641
  });
});



(function($) {
  $.fn.retach = function(options) {
    var defaults = {
      destination: 'body',
      mediaQuery: 1023,
      movedClass: 'is-moved',
      prependAppend: 'append'
    };
    var options = $.extend({}, defaults, options);

    var $items = this;
    var $destination = $(options.destination);
    var mediaQuery = options.mediaQuery;
    var movedClass = options.movedClass;
    var $prependAppend = options.prependAppend;

    var placeholderID = Math.floor((Math.random() * 10000) + 1) + Math.floor((Math.random() * 10000) + 1);
    var $placeholder = $('<i class="placeholder" data-placeholderID="' + placeholderID + '" />');

    function moveItems() {
      if ($('i[data-placeholderID="' + placeholderID + '"]').length <= 0) {
        $items.first().before($placeholder);
      }
      if (window.matchMedia("(max-width: " + mediaQuery + "px)").matches) {
        if ($prependAppend == 'append') {
          $destination.append($items);
        } else {
          $destination.prepend($items);
        }

        $items.addClass(movedClass);
      } else {
        $placeholder.after($items);
        $items.removeClass(movedClass);
      }
    }

    moveItems();
    $(window).resize(function() {
      moveItems();
    });
    return $items;
  }
}(jQuery));
