//swapbox
$(document).ready(function(){
    $('.swapBox input:checked').closest('.swapBox').children().find('.swap-input').focus();
    //If another radio button is clicked, add the select class, and remove it from the previously selected radio
    $('.swapBox input').click(function () {
        $('.swapBox input:checked').closest('.swapBox').children().find('.swap-input').focus();
        $('.swapBox input:checked').closest('.swapBox').children('.swap').addClass('flashInput');
    });
});