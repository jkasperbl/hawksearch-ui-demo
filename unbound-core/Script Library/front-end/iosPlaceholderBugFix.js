/* Fix for ios not rendering the placeholder element on orientation change */
$(document).ready(function() {
    function fm_optimizeInput() {
        $("input[placeholder],textarea[placeholder]").each(function() {
            var tmpText = $(this).attr("placeholder");
            if (tmpText != "") {
                $(this).attr("placeholder", "").attr("placeholder", tmpText);
            }
        })
    }
    $(window).bind("orientationchange.fm_optimizeInput", fm_optimizeInput);
});