//counters for cartitems
jQuery(document).ready(function() {
    $('.productTools-counter-control--add, .cartItem-actions-counter-control--add').click(function() {
        var $input = $(this).prev('.productTools-counter-display, .cartItem-actions-counter-display');

        var step = parseInt($input.data("step"));
        if (!step) {
            step = 1;
        }

        var max = parseInt($input.data("max"));
        if (!max) {
            max = 9999;
        }

        var currentValue = parseInt($input.val());
        if (parseFloat(currentValue) >= 0) {
            var newVal = currentValue + step;
            if (newVal > max)
                newVal = max;
            $input.val(newVal);
        }
    });

    $('.productTools-counter-control--subtract, .cartItem-actions-counter-control--subtract').click(function() {
        var $input = $(this).next('.productTools-counter-display, .cartItem-actions-counter-display');

        var step = parseInt($input.data("step"));
        if (!step) {
            step = 1;
        }

        var currentValue = parseInt($input.val());
        if (parseFloat(currentValue) > 1) {
            var newVal = currentValue - step;
            if (newVal <= 0)
                newVal = 1;
            $input.val(newVal);
        }
    });
});
