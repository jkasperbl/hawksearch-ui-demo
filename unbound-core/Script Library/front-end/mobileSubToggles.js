/*******************************************************************
This is the function to add toggles for nav items that have children.
If this is going in a mobile Drawer the mediaQuery needs to match the 
 mediaQuery used in the drawer function.
*******************************************************************/

$(document).ready(function() {
  $('.navMain li.hasChildren, .navUtil li.hasChildren').subToggle({
    mediaQuery: 1024
  });
});

//jQuery function for adding sub toggles
(function($) {
  $.fn.subToggle = function(options) {
    var opts = options;
    return this.each(function() {
      var defaults = {
        mediaQuery: 1024
      };
      var options = $.extend({}, defaults, opts);

      var $this = $(this);
      var mediaQuery = options.mediaQuery;

      addRemoveToggle($this, mediaQuery);

      $(window).on('resize orientationchange', function() {
        addRemoveToggle($this, mediaQuery);
      });
    });
  }
}(jQuery));

//Function to add/remove toggles
//This is called by the plugin above this.
function addRemoveToggle(element, mediaQuery) {
  if (!window.matchMedia('(min-width: ' + mediaQuery + 'px)').matches) {
    if (element.find('.navMain-mobile-subToggle').length <= 0) {
      element.prepend('<span class="navMain-mobile-subToggle" />');
    }
  } else {
    element.find('.navMain-mobile-subToggle').remove();
  }
}

//Document delegation for mobils sub toggles.
//Delegating this event prevents us from having to wire this up each time the toggle is added. 
$(document).on('click', '.navMain-mobile-subToggle', function(event) {
  event.stopPropagation();
  if (!$(this).closest('li').hasClass('is-active')) {
    $('.navMain-mobile li.is-active').removeClass('is-active');
    $(this).closest('li').addClass('is-active');
  } else {
    $('.navMain-mobile li.is-active').removeClass('is-active');
  }
});

//Document delegation for links with no destination (act as a sub toggle).
$(document).on('click', '.navMain-mobile li.hasChildren', function(event) {
  if ($(this).find('a').attr('href') === "javascript:void(0)") {
    event.preventDefault();
    $('.navMain-mobile li.hasChildren').not($(this)).removeClass('is-active');
    $(this).toggleClass('is-active');
  }
});
