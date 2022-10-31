/*****************************   NOTICE   *******************************
This is a function for developers. It has been added to frontEnd.js to
standardize the setup of search boxes, but it will never be used on a
 design site. You can ignore this file completely.
************************************************************************/

/*************************   Dev Example   ******************************
$(document).ready( function(){
    $('#searchMain').searchSetup({
     	url:"/searchPage?paramaterName="
    });
});
If no URL is passed to the function it will default to '/search?query='.
************************************************************************/

//Search Setup
(function($) {
  $.fn.searchSetup = function(options) {
    var opts = options;
    return this.each(function() {
      var defaults = {
        url: '/search?query='
      };
      var options = $.extend({}, defaults, opts);

      var $this = $(this);
      var url = options.url;
      var query;

      $this.on('keydown', function(event) {
        if (event.keyCode == 13) {
          event.preventDefault();
          query = $this.val();

          if (query != null && query != "") {
            document.location = url + escape(query);
          } else {
            alert('Please enter the search criteria.')
            return false;
          }
        }
      });
    });
  }
}(jQuery));
