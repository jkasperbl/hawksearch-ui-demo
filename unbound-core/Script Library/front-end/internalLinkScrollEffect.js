//scroll effect to any internal anchor links to give visual feedback of where users are in the document and that they have not been taken to another page
$(document).ready(function() {
    //Adding .not('.reTool').not('.reDropdown') so that this doesnt mess with the Rad Editor
   $('a[href*=#]').not('.reTool').not('.reDropdown').click(function(e) {
      if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
         e.preventDefault();
         var $target = $(this.hash);
         $target = $target.length && $target || $('[name=' + this.hash.slice(1) + ']');
         if ($target.length) {
            var targetOffset = $target.offset().top;
            if ($(".style-nav").length) {
               targetOffset = targetOffset - $(".style-nav").outerHeight(true);
            }
            $('html,body').animate({
               scrollTop: targetOffset
            }, 500);
            /* add the ios fix. The duration of the fix needs to match the duration of your animation. If you leave the duration blank it will occur immediately*/
            iosScrollTopBugFix(500);
            return false;
         }
      }
   });
});
