/*
Swap Background is a jQuery plugin to automatically change the background image of an element based on screen size.*

Instructions for Use:
All parameters are optional 

There are two ways to define the background images:
1. With an object passed to the plugin:
     srcSm:
     srcLrg:
2. With inline data attributes on the element.
     data-sm=""
     data-lg=""
3. You can also pass a mediaQuery parameter that defines at which screen size to swap out the images. The default size is 1023 meaning that the large image will show at 1024 and above and the small image will show at 1023 and below.

Full Examples:

<div class="bannerMain"></div>

$('.bannerMain').swapBackground({
    srcSm: '//placehold.it/600x300',
    srcLg: '//placehold.it/1900x500',
    mediaQuery: 800
});

----  or  ----

<div class="bannerMain" data-lg="//placehold.it/1900x500" data-sm="//placehold.it/600x300"></div>

$('.bannerMain').swapBackground({
    mediaQuery: 800
});
*/

$(document).ready(function() {
    $('.sliderMainImage').swapBackground({
        mediaQuery: 800
    });
});


(function($) {
    $.fn.swapBackground = function(options) {
        var opts = options;
        return this.each(function() {
            var defaults = {
                srcSm: $(this).data("sm"),
                srcLg: $(this).data("lg"),
                mediaQuery: 1023
            };
            var options = $.extend({}, defaults, opts);

            var $this = $(this);
            var srcSm = options.srcSm;
            var srcLg = options.srcLg;
            var mediaQuery = options.mediaQuery;

            function swapImages() {
                if (window.matchMedia("(max-width: " + mediaQuery + "px)").matches) {
                    $this.css('background-image', 'url(' + srcSm + ')');
                } else {
                    $this.css('background-image', 'url(' + srcLg + ')');
                }
            }
            swapImages();
            $(window).resize(function() {
                swapImages();
            });
        });
    }
}(jQuery));
