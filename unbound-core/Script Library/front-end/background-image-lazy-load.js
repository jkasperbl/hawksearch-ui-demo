$(document).ready(function() {
    var backgroundImageUrlElements = $('[data-background-image-url]')
    $(backgroundImageUrlElements).each(function(){
        $(this).css("background-image","url('" + $(this).data('background-image-url') + "')")
    })
})