$(document).ready(function() {
    delegateLabelEvents();
    placeHolders();
});

//Wireup placeholders/initial text for inputs, textareas & selects with inline labels
function placeHolders() {
    var $inputs = $('.inlineLabel');
    $inputs.each(function() {
        var $this = $(this);
        var $label = $this.children('label');
        var $labelVal = $label.text();
        var $input = $this.children('input, textarea');
        var $select = $this.children('select');
        var $options = $select.children();
        var $defaultSelect = $('<option disabled="disabled" class="watermark">' + $labelVal + '</option>');

        if (!$options.is(":selected")) {
            $defaultSelect.attr('selected', 'selected');
        }

        //Add placeholder select option
        if ($select.children('option').first().val() != $defaultSelect.val() && $select.children('option').first().val() != '') {
            $select.prepend($defaultSelect);
            $select.addClass('watermark');
        }
        //Add input placeholders or rig up text if placeholders are not supported
        if (Modernizr.input.placeholder) {
            $input.attr('placeholder', $labelVal);
        } else {
            //Set initial value to label value - psuedo placeholder
            $input.val($labelVal);
            $input.addClass('watermark');
            //Rigup focus/blur events on psuedo placeholders
            $input.on('mouseup', function() {
                if ($input.val() == $labelVal) {
                    $input.setCursorPosition(0);
                }
            }).on('keydown', function() {
                if ($input.val() == $labelVal) {
                    $input.val("");
                    $input.removeClass('watermark');
                }
            }).on('keyup', function() {
                if ($input.val().length === 0) {
                    $input.val($labelVal);
                    $input.addClass('watermark');
                    $input.setCursorPosition(0);
                }
            }).blur(function() {
                if ($input.val().length === 0) {
                    $input.val($labelVal);
                    $input.addClass('watermark');
                }
            });
        }
        //Add required class if input required is not supported 
        if (!Modernizr.input.required) {
            $input.addClass('required');
            $select.addClass('required');
        }
    });
    $inputs.children().blur();
}

//Delegate events for inline label inputs/textareas
function delegateLabelEvents() {
    $(document).on('focus blur keyup', '.inlineLabel input, .inlineLabel textarea', function() {
        var $this = $(this);
        var $label = $this.siblings('label');
        var $labelVal = $label.text();

        if ($this.val() != $labelVal && $this.val() !== "") {
            $label.addClass('show');
            if ($this.is(':focus')) {
                $label.addClass('on');
            } else {
                $label.removeClass('on');
            }
        } else {
            $label.removeClass('show');
            $label.removeClass('on');
        }
    });
    //Delegate events for inline label selects
    $(document).on('click focus blur', '.inlineLabel select', function() {
        var $this = $(this);
        var $placeHolder = $(this).children('option').first();
        var $label = $this.siblings('label');

        if (!$placeHolder.is(':selected')) {
            $this.removeClass('watermark');
            $label.addClass('show');
            if ($this.is(':focus')) {
                $label.addClass('on');
            } else {
                $label.removeClass('on');
            }
        } else {
            $this.addClass('watermark');
            $label.removeClass('show');
            $label.removeClass('on');
        }
    });
}


//SET CURSOR POSITION
$.fn.setCursorPosition = function(pos) {
    this.each(function(index, elem) {
        if (elem.setSelectionRange) {
            elem.setSelectionRange(pos, pos);
        } else if (elem.createTextRange) {
            var range = elem.createTextRange();
            range.collapse(true);
            range.moveEnd('character', pos);
            range.moveStart('character', pos);
            range.select();
        }
    });
    return this;
};