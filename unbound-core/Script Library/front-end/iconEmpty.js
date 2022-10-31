/**************************

    micro function to add ability to ignore children of an element.

    example useage: $('element').ignore('*'); this would ignore all children

    example useage: $('element').ignore('span'); this would ignore children that are spans

**************************/

(function($) {
  $.fn.ignore = function(sel) {
    return this.clone().find(sel || ">*").remove().end();
  };
}(jQuery));


// Check if icon has text, ignoring children and their text.

$(document).ready(function() {
  $("[class*='icon-']").each(function() {
    var test = $(this).ignore("*:not('a')").text().trim().length
    if (test <= 0) {
      $(this).addClass("icon--empty");
    }
  });
});
