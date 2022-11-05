//Flyouts and touch dropdowns
function DropDown(el) {
    this.dd = el;
    this.placeholder = this.dd.children('span');
    this.opts = this.dd.find('ul.flyout-content > li');
    this.val = '';
    this.index = -1;
    this.initEvents();
}
DropDown.prototype = {
    initEvents: function() {
        var obj = this;

        obj.dd.on('click', function(event) {
            var alreadyHas = $(this).hasClass('is-open');
            $('.flyout').removeClass('is-open');
            if (!alreadyHas) {
                $(this).toggleClass('is-open');
                return false;
            }
        });

        if (obj.dd.hasClass('flyout--select')) {
            obj.opts.on('click', function() {
                var opt = $(this);
                obj.val = opt.text();
                obj.index = opt.index();
                obj.placeholder.text(obj.val);
            });
        }
    },
    getValue: function() {
        return this.val;
    },
    getIndex: function() {
        return this.index;
    }
}

$(function() {
    $('.flyout').each(function() {
        var dd = new DropDown($(this));
    });
    $(document).click(function() {
        // all dropdowns
        $('.flyout').removeClass('is-open');
    });
});