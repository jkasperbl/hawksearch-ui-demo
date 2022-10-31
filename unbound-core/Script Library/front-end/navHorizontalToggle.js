//toggle mobile horizontal nav
$(document).ready(function() {
    $('.navHorizontal .selected a').on('click', function(e) {
        e.preventDefault();
        $(this).closest('ul').toggleClass("is-open");
     });
});
