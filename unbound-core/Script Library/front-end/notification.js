$(document).ready(function () {
    $(document).on('click', '.notification__close', function() {
        $(this).closest('.notification').slideUp();
    });
});