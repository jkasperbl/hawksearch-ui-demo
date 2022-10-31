//mobile drawer
$(document).ready(function() {
   drawer({
      mediaQuery: 1024
   });
});

function drawer(options) {
   var opts = options;
   var defaults = {
      mediaQuery: 1024
   };
   var options = $.extend({}, defaults, opts);
   var mediaQuery = options.mediaQuery;

   function mobileHide() {
      if (window.matchMedia('(min-width: ' + mediaQuery + 'px)').matches) {
         $('body').removeClass('is-toggled--drawer');
         $(window).off('resize orientationchange', mobileHide);
         setTimeout(function() {
            $('.drawer').removeClass(contentClass);
         }, 350);
      }
   }

   var $contentItems = $(".drawerItem");
   var contentClass;

    $('.drawer-content').append($contentItems);

   $(document).on('click', '.drawerToggle', function() {
      var $contentItem = $("*[data-id='" + $(this).attr('data-for') + "']");
      var mobileOnly = false;

      contentClass = "drawer--" + $(this).attr('data-for');

      if ($(this).data('mobile') == true) {
         mobileOnly = true;
      }

      $contentItems.removeClass('is-visible');
      $contentItem.addClass('is-visible');

      if ($('body').hasClass('is-toggled--drawer')) {
         $('body').removeClass('is-toggled--drawer');
         $('html').css('overflow', '');
         setTimeout(function() {
            $('.drawer').removeClass(contentClass);
         }, 350);
      } else {
         $('body').addClass('is-toggled--drawer');
         $('.drawer').addClass(contentClass);
         $('html').css('overflow', 'hidden');
      }

      if (mobileOnly) {
         $(window).on('resize orientationchange', mobileHide);
      }
   });

   $(document).on('click', '.drawer-close', function() {
      $('body').removeClass('is-toggled--drawer');
      $('html').css('overflow', '');
      setTimeout(function() {
         $('.drawer').removeClass(contentClass);
      }, 350);
   });

   $(document).click(function(event) {
      var $target = $(event.target);
      if ($('body').hasClass('is-toggled--drawer') && !$target.closest('.drawer').length && !$target.is('.drawerToggle')) {
         event.preventDefault();
         $('body').removeClass('is-toggled--drawer');
         $('html').css('overflow', '');
         setTimeout(function() {
            $('.drawer').removeClass(contentClass);
         }, 350);
      }
   });
}
