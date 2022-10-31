$(document).ready(function() {
  $('.fakeSelect').change(function() {
    var theText = $(this).find(':selected').text();
    var $theSizer = $(this).parent().find('.fakeSelectMask');
    $theSizer.html(theText);
  });
  //initialize default selected value if one
  $('.fakeSelect').each(function() {
    var theText = $(this).find(':selected').text();
    var $theSizer = $(this).parent().find('.fakeSelectMask');
    $theSizer.html(theText);
  });
});
