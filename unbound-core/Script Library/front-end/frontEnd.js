// basic accordion
$(document).ready(function() {
    //loop through all instances of tabs on the page and add ".is-active" to the first one
    initAccordion();
    //toggle the "is-active" class on the links with click
    $(document).on('click', '.accordion > li > span', function() {
        if (!$(this).parent().hasClass('is-active')) {
            $(this).closest('.accordion').find('.is-active').removeClass('is-active');
            $(this).parent().addClass('is-active');
            $('html, body').animate({
                scrollTop: $(this).offset().top - 120
            }, 500);
        } else {
            $(this).parent().removeClass('is-active');
        }
    });
});

function initAccordion() {
   if ($('.accordion').length > 0) {
      $('.accordion li').removeClass('is-active');
      var anchor = $('a[id=' + window.location.hash.substring(1) + ']');
      if (window.location.hash.substring(1).length && anchor.length) {
         anchor.closest('li').addClass('is-active');
      } else {
         $('.accordion li:first-child').addClass('is-active');
      }
   }
}
$(document).ready(function() {
    var backgroundImageUrlElements = $('[data-background-image-url]')
    $(backgroundImageUrlElements).each(function(){
        $(this).css("background-image","url('" + $(this).data('background-image-url') + "')")
    })
})
//Initiate the custom date picker;
$(document).ready(function () {
    CustomDatepickerInit();
});

function CustomDatepickerInit() {
    //Display date pickers on input focus
    $(document).on('focus', '.datepicker input', function () {
        var date = new Date();
        var $el = $(this);

        if ($(this).val()) {
            var dateValue = Date.parse($(this).val());

            if (!isNaN(dateValue))
                date = new Date(dateValue);
        }
        
        createCalendar($el, date, false);
    });

    //Navigate to a different month on the calendar
    $(document).on('click', '.datepicker-nav', function (event) {
        var date = new Date($(this).attr('data-date'));
        var $el = $(this).closest('.datepicker').children('input');
        event.stopPropagation();
        if ($el.size())
            createCalendar($el, date, true);
    });

    //Add date value to input on calendar selection
    $(document).on('click', '.datepicker .date', function () {
        var $calendar = $(this).parents('.datepicker').children('.datepicker-calendar');
        var $input = $(this).parents('.datepicker').children('input');
        var date = new Date($(this).attr('data-date'));

        var month = date.getMonth() + 1;
        var day = date.getDate();
        var year = date.getFullYear();

        var value = month + '/' + day + '/' + year;

        $input.val(value);
        $input.trigger('change');
        $calendar.remove();
    });

    //Hide datepicker calendar if click away on document
    $(document).on('click', function (event) {
        var $target = $(event.target);
        if (!$target.parents('.datepicker-calendar').length && !$target.is('.datepicker-calendar') && !$target.is('.datepicker input')) {
            $('.datepicker-calendar').remove();
        }
    });
}

function createCalendar(e, d, n) {
    var $input = $(e);
    var $datepicker = $input.closest('.datepicker');
    var date = new Date(d);
    var navClick = n;

    var $calendar = $('<div class="datepicker-calendar" />');
    var $headRow = $('<div class="datepicker-calendar-headRow" />');
    var $dayRow = $('<div class="datepicker-calendar-dayRow" />');
    var $bodyRow = $('<div class="datepicker-calendar-bodyRow" />');

    var locale = window['uiCulture'] || 'en-US';
    var baseDate = new Date(2019, 8, 1); // Random Sunday
    var days = [];

    for (i = 0; i < 7; i++) {
        days.push(baseDate.toLocaleDateString(locale, { weekday: 'narrow' }));

        baseDate.setDate(baseDate.getDate() + 1);
    }

    baseDate - new Date(2019, 0, 1);
    var months = [];

    for (i = 0; i < 12; i++) {
        var monthDate = new Date();
        
        monthDate.setMonth(i);
        months.push(monthDate.toLocaleDateString(locale, { month: 'long' }));
    }

    var currentYear = date.getFullYear();
    var currentMonth = date.getMonth();
    var currentDay = date.getDate();

    var todayDay = new Date().getDate();
    var todayMonth = new Date().getMonth();
    var todayYear = new Date().getFullYear();

    var currentMonthValue = currentMonth + 1;
    var currentMonthName = months[currentMonth];

    var startDay = new Date(currentYear, currentMonth, 1).getDay();
    var daysInMonth = new Date(currentYear, currentMonthValue, 0).getDate();

    var previousDate = new Date(currentYear, currentMonth - 1, 1);
    var nextDate = new Date(currentYear, currentMonth + 1, 1);

    var gridLocationIndex = 0;
    var dayCounter = 1;

    var dateTitle = currentMonthName + " " + currentYear;
    var thisDate;

    $('.datepicker-calendar').remove();

    // Set input as readonly and disable autocomplete
    $input.prop({
        autocomplete: false,
        readonly: true
    });

    //Create Head Row (Month)
    for (var i = 0; i < 3; i++) {
        if (i == 1) {
            $headRow.append($('<div>' + dateTitle + '</div>'));
        } else if (i === 0) {
            $headRow.append($('<div class="datepicker-nav" data-date="' + previousDate + '" />'));
        } else if (i == 2) {
            $headRow.append($('<div class="datepicker-nav" data-date="' + nextDate + '" />'));
        }
    }

    //Create Day Row (Days of Week)
    for (var i = 0; i < 7; i++) {
        $dayRow.append($('<div>' + days[i] + '</div>'));
    }

    //Create Body Rows (Days of Month)
    while (dayCounter <= daysInMonth) {
        //create blank squares for offset for previous month
        if (gridLocationIndex < startDay) {
            if (gridLocationIndex == startDay - 1) {
                $bodyRow.append($('<div class="empty last" />'));
            } else {
                $bodyRow.append($('<div class="empty" />'));
            }
        }
        //create calendar days
        else {
            //check for a matching date that is already selected
            if (dayCounter == currentDay && !navClick && !$input.val() == "") {
                thisDate = new Date(currentYear, currentMonth, dayCounter);
                //create highlighted square for the current day on the calendar 
                if (currentYear == todayYear && currentMonth == todayMonth && dayCounter == todayDay) {
                    $bodyRow.append($('<div class="today selected date" data-date="' + thisDate + '">' + dayCounter + '</div>'));
                    dayCounter++;
                }
                //create normal nonselected/current squares for the remaining days
                else {
                    $bodyRow.append($('<div class="date selected" data-date="' + thisDate + '">' + dayCounter + '</div>'));
                    dayCounter++;
                }
            }
            //if not matching selected date create days without selected class
            else {
                thisDate = new Date(currentYear, currentMonth, dayCounter);
                //create highlighted square for the current day on the calendar 
                if (currentYear == todayYear && currentMonth == todayMonth && dayCounter == todayDay) {
                    $bodyRow.append($('<div class="today date" data-date="' + thisDate + '">' + dayCounter + '</div>'));
                    dayCounter++;
                }
                //create normal nonselected/current squares for the remaining days
                else {
                    $bodyRow.append($('<div class="date" data-date="' + thisDate + '">' + dayCounter + '</div>'));
                    dayCounter++;
                }
            }
        }

        //increase grid location index number for each loop of days in the calendar
        gridLocationIndex++;
    }

    //Build calendar 
    $calendar.append($headRow).append($dayRow).append($bodyRow);

    // Position calendar
    $calendar.css({
        top: $input.position().top + $input.outerHeight(),
        left: $input.position().left
    });

    //Add calendar to the DOM
    $datepicker.append($calendar);
}

/* 
* iAPPS formbuilder utilizes the jqueryui datepicker script but calls it with 
* options that are unnecessary and not mobile friendly.
* We are basically letting their script run, destroying it and just doing
* a basic call to the script
*/
$(document).ready(function () {
    setTimeout(function () {
        $('.formDate').each(function () {
            $(this).children('input').datepicker("destroy");
            $(this).removeClass("formDate hasDatepicker").addClass("datepicker");
        });
    }, 100);
});

$(document).ready(function() {
   $('nav.navMain > ul > li:has(ul)').doubleTapToGo();
});


/*
   By Osvaldas Valutis, www.osvaldas.info
   Available for use under the MIT License
*/

;
(function($, window, document, undefined) {
   $.fn.doubleTapToGo = function(params) {
      if (!('ontouchstart' in window) &&
         !navigator.msMaxTouchPoints &&
         !navigator.userAgent.toLowerCase().match(/windows phone os 7/i)) return false;

      this.each(function() {
         var curItem = false;

         $(this).on('click', function(e) {
            var item = $(this);
            if (item[0] != curItem[0]) {
               e.preventDefault();
               curItem = item;
            }
         });

         $(document).on('click touchstart MSPointerDown', function(e) {
            var resetItem = true,
               parents = $(e.target).parents();

            for (var i = 0; i < parents.length; i++)
               if (parents[i] == curItem[0])
                  resetItem = false;

            if (resetItem)
               curItem = false;
         });
      });
      return this;
   };
})(jQuery, window, document);

//mobile drawer
$(document).ready(function() {
   drawer({
      mediaQuery: 1024
   });
});

function drawer(options) {
   var opts = options;
   var defaults = {
      mediaQuery: 1024
   };
   var options = $.extend({}, defaults, opts);
   var mediaQuery = options.mediaQuery;

   function mobileHide() {
      if (window.matchMedia('(min-width: ' + mediaQuery + 'px)').matches) {
         $('body').removeClass('is-toggled--drawer');
         $(window).off('resize orientationchange', mobileHide);
         setTimeout(function() {
            $('.drawer').removeClass(contentClass);
         }, 350);
      }
   }

   var $contentItems = $(".drawerItem");
   var contentClass;

    $('.drawer-content').append($contentItems);

   $(document).on('click', '.drawerToggle', function() {
      var $contentItem = $("*[data-id='" + $(this).attr('data-for') + "']");
      var mobileOnly = false;

      contentClass = "drawer--" + $(this).attr('data-for');

      if ($(this).data('mobile') == true) {
         mobileOnly = true;
      }

      $contentItems.removeClass('is-visible');
      $contentItem.addClass('is-visible');

      if ($('body').hasClass('is-toggled--drawer')) {
         $('body').removeClass('is-toggled--drawer');
         $('html').css('overflow', '');
         setTimeout(function() {
            $('.drawer').removeClass(contentClass);
         }, 350);
      } else {
         $('body').addClass('is-toggled--drawer');
         $('.drawer').addClass(contentClass);
         $('html').css('overflow', 'hidden');
      }

      if (mobileOnly) {
         $(window).on('resize orientationchange', mobileHide);
      }
   });

   $(document).on('click', '.drawer-close', function() {
      $('body').removeClass('is-toggled--drawer');
      $('html').css('overflow', '');
      setTimeout(function() {
         $('.drawer').removeClass(contentClass);
      }, 350);
   });

   $(document).click(function(event) {
      var $target = $(event.target);
      if ($('body').hasClass('is-toggled--drawer') && !$target.closest('.drawer').length && !$target.is('.drawerToggle')) {
         event.preventDefault();
         $('body').removeClass('is-toggled--drawer');
         $('html').css('overflow', '');
         setTimeout(function() {
            $('.drawer').removeClass(contentClass);
         }, 350);
      }
   });
}

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

//FastClick: polyfill to remove click delays on browsers with touch UIs.
// https://github.com/ftlabs/fastclick
function FastClick(t, e) {
    "use strict";

    function i(t, e) {
        return function() {
            return t.apply(e, arguments)
        }
    }
    var n;
    if (e = e || {}, this.trackingClick = !1, this.trackingClickStart = 0, this.targetElement = null, this.touchStartX = 0, this.touchStartY = 0, this.lastTouchIdentifier = 0, this.touchBoundary = e.touchBoundary || 10, this.layer = t, this.tapDelay = e.tapDelay || 200, !FastClick.notNeeded(t)) {
        for (var o = ["onMouse", "onClick", "onTouchStart", "onTouchMove", "onTouchEnd", "onTouchCancel"], r = this, s = 0, c = o.length; c > s; s++) r[o[s]] = i(r[o[s]], r);
        deviceIsAndroid && (t.addEventListener("mouseover", this.onMouse, !0), t.addEventListener("mousedown", this.onMouse, !0), t.addEventListener("mouseup", this.onMouse, !0)), t.addEventListener("click", this.onClick, !0), t.addEventListener("touchstart", this.onTouchStart, !1), t.addEventListener("touchmove", this.onTouchMove, !1), t.addEventListener("touchend", this.onTouchEnd, !1), t.addEventListener("touchcancel", this.onTouchCancel, !1), Event.prototype.stopImmediatePropagation || (t.removeEventListener = function(e, i, n) {
            var o = Node.prototype.removeEventListener;
            "click" === e ? o.call(t, e, i.hijacked || i, n) : o.call(t, e, i, n)
        }, t.addEventListener = function(e, i, n) {
            var o = Node.prototype.addEventListener;
            "click" === e ? o.call(t, e, i.hijacked || (i.hijacked = function(t) {
                t.propagationStopped || i(t)
            }), n) : o.call(t, e, i, n)
        }), "function" == typeof t.onclick && (n = t.onclick, t.addEventListener("click", function(t) {
            n(t)
        }, !1), t.onclick = null)
    }
}
var deviceIsAndroid = navigator.userAgent.indexOf("Android") > 0,
    deviceIsIOS = /iP(ad|hone|od)/.test(navigator.userAgent),
    deviceIsIOS4 = deviceIsIOS && /OS 4_\d(_\d)?/.test(navigator.userAgent),
    deviceIsIOSWithBadTarget = deviceIsIOS && /OS ([6-9]|\d{2})_\d/.test(navigator.userAgent),
    deviceIsBlackBerry10 = navigator.userAgent.indexOf("BB10") > 0;
FastClick.prototype.needsClick = function(t) {
    "use strict";
    switch (t.nodeName.toLowerCase()) {
        case "button":
        case "select":
        case "textarea":
            if (t.disabled) return !0;
            break;
        case "input":
            if (deviceIsIOS && "file" === t.type || t.disabled) return !0;
            break;
        case "label":
        case "video":
            return !0
    }
    return /\bneedsclick\b/.test(t.className)
}, FastClick.prototype.needsFocus = function(t) {
    "use strict";
    switch (t.nodeName.toLowerCase()) {
        case "textarea":
            return !0;
        case "select":
            return !deviceIsAndroid;
        case "input":
            switch (t.type) {
                case "button":
                case "checkbox":
                case "file":
                case "image":
                case "radio":
                case "submit":
                    return !1
            }
            return !t.disabled && !t.readOnly;
        default:
            return /\bneedsfocus\b/.test(t.className)
    }
}, FastClick.prototype.sendClick = function(t, e) {
    "use strict";
    var i, n;
    document.activeElement && document.activeElement !== t && document.activeElement.blur(), n = e.changedTouches[0], i = document.createEvent("MouseEvents"), i.initMouseEvent(this.determineEventType(t), !0, !0, window, 1, n.screenX, n.screenY, n.clientX, n.clientY, !1, !1, !1, !1, 0, null), i.forwardedTouchEvent = !0, t.dispatchEvent(i)
}, FastClick.prototype.determineEventType = function(t) {
    "use strict";
    return deviceIsAndroid && "select" === t.tagName.toLowerCase() ? "mousedown" : "click"
}, FastClick.prototype.focus = function(t) {
    "use strict";
    var e;
    deviceIsIOS && t.setSelectionRange && 0 !== t.type.indexOf("date") && "time" !== t.type ? (e = t.value.length, t.setSelectionRange(e, e)) : t.focus()
}, FastClick.prototype.updateScrollParent = function(t) {
    "use strict";
    var e, i;
    if (e = t.fastClickScrollParent, !e || !e.contains(t)) {
        i = t;
        do {
            if (i.scrollHeight > i.offsetHeight) {
                e = i, t.fastClickScrollParent = i;
                break
            }
            i = i.parentElement
        } while (i)
    }
    e && (e.fastClickLastScrollTop = e.scrollTop)
}, FastClick.prototype.getTargetElementFromEventTarget = function(t) {
    "use strict";
    return t.nodeType === Node.TEXT_NODE ? t.parentNode : t
}, FastClick.prototype.onTouchStart = function(t) {
    "use strict";
    var e, i, n;
    if (t.targetTouches.length > 1) return !0;
    if (e = this.getTargetElementFromEventTarget(t.target), i = t.targetTouches[0], deviceIsIOS) {
        if (n = window.getSelection(), n.rangeCount && !n.isCollapsed) return !0;
        if (!deviceIsIOS4) {
            if (i.identifier && i.identifier === this.lastTouchIdentifier) return t.preventDefault(), !1;
            this.lastTouchIdentifier = i.identifier, this.updateScrollParent(e)
        }
    }
    return this.trackingClick = !0, this.trackingClickStart = t.timeStamp, this.targetElement = e, this.touchStartX = i.pageX, this.touchStartY = i.pageY, t.timeStamp - this.lastClickTime < this.tapDelay && t.preventDefault(), !0
}, FastClick.prototype.touchHasMoved = function(t) {
    "use strict";
    var e = t.changedTouches[0],
        i = this.touchBoundary;
    return Math.abs(e.pageX - this.touchStartX) > i || Math.abs(e.pageY - this.touchStartY) > i ? !0 : !1
}, FastClick.prototype.onTouchMove = function(t) {
    "use strict";
    return this.trackingClick ? ((this.targetElement !== this.getTargetElementFromEventTarget(t.target) || this.touchHasMoved(t)) && (this.trackingClick = !1, this.targetElement = null), !0) : !0
}, FastClick.prototype.findControl = function(t) {
    "use strict";
    return void 0 !== t.control ? t.control : t.htmlFor ? document.getElementById(t.htmlFor) : t.querySelector("button, input:not([type=hidden]), keygen, meter, output, progress, select, textarea")
}, FastClick.prototype.onTouchEnd = function(t) {
    "use strict";
    var e, i, n, o, r, s = this.targetElement;
    if (!this.trackingClick) return !0;
    if (t.timeStamp - this.lastClickTime < this.tapDelay) return this.cancelNextClick = !0, !0;
    if (this.cancelNextClick = !1, this.lastClickTime = t.timeStamp, i = this.trackingClickStart, this.trackingClick = !1, this.trackingClickStart = 0, deviceIsIOSWithBadTarget && (r = t.changedTouches[0], s = document.elementFromPoint(r.pageX - window.pageXOffset, r.pageY - window.pageYOffset) || s, s.fastClickScrollParent = this.targetElement.fastClickScrollParent), n = s.tagName.toLowerCase(), "label" === n) {
        if (e = this.findControl(s)) {
            if (this.focus(s), deviceIsAndroid) return !1;
            s = e
        }
    } else if (this.needsFocus(s)) return t.timeStamp - i > 100 || deviceIsIOS && window.top !== window && "input" === n ? (this.targetElement = null, !1) : (this.focus(s), this.sendClick(s, t), deviceIsIOS && "select" === n || (this.targetElement = null, t.preventDefault()), !1);
    return deviceIsIOS && !deviceIsIOS4 && (o = s.fastClickScrollParent, o && o.fastClickLastScrollTop !== o.scrollTop) ? !0 : (this.needsClick(s) || (t.preventDefault(), this.sendClick(s, t)), !1)
}, FastClick.prototype.onTouchCancel = function() {
    "use strict";
    this.trackingClick = !1, this.targetElement = null
}, FastClick.prototype.onMouse = function(t) {
    "use strict";
    return this.targetElement ? t.forwardedTouchEvent ? !0 : t.cancelable && (!this.needsClick(this.targetElement) || this.cancelNextClick) ? (t.stopImmediatePropagation ? t.stopImmediatePropagation() : t.propagationStopped = !0, t.stopPropagation(), t.preventDefault(), !1) : !0 : !0
}, FastClick.prototype.onClick = function(t) {
    "use strict";
    var e;
    return this.trackingClick ? (this.targetElement = null, this.trackingClick = !1, !0) : "submit" === t.target.type && 0 === t.detail ? !0 : (e = this.onMouse(t), e || (this.targetElement = null), e)
}, FastClick.prototype.destroy = function() {
    "use strict";
    var t = this.layer;
    deviceIsAndroid && (t.removeEventListener("mouseover", this.onMouse, !0), t.removeEventListener("mousedown", this.onMouse, !0), t.removeEventListener("mouseup", this.onMouse, !0)), t.removeEventListener("click", this.onClick, !0), t.removeEventListener("touchstart", this.onTouchStart, !1), t.removeEventListener("touchmove", this.onTouchMove, !1), t.removeEventListener("touchend", this.onTouchEnd, !1), t.removeEventListener("touchcancel", this.onTouchCancel, !1)
}, FastClick.notNeeded = function(t) {
    "use strict";
    var e, i, n;
    if ("undefined" == typeof window.ontouchstart) return !0;
    if (i = +(/Chrome\/([0-9]+)/.exec(navigator.userAgent) || [, 0])[1]) {
        if (!deviceIsAndroid) return !0;
        if (e = document.querySelector("meta[name=viewport]")) {
            if (-1 !== e.content.indexOf("user-scalable=no")) return !0;
            if (i > 31 && document.documentElement.scrollWidth <= window.outerWidth) return !0
        }
    }
    if (deviceIsBlackBerry10 && (n = navigator.userAgent.match(/Version\/([0-9]*)\.([0-9]*)/), n[1] >= 10 && n[2] >= 3 && (e = document.querySelector("meta[name=viewport]")))) {
        if (-1 !== e.content.indexOf("user-scalable=no")) return !0;
        if (document.documentElement.scrollWidth <= window.outerWidth) return !0
    }
    return "none" === t.style.msTouchAction ? !0 : !1
}, FastClick.attach = function(t, e) {
    "use strict";
    return new FastClick(t, e)
}, "function" == typeof define && "object" == typeof define.amd && define.amd ? define(function() {
    "use strict";
    return FastClick
}) : "undefined" != typeof module && module.exports ? (module.exports = FastClick.attach, module.exports.FastClick = FastClick) : window.FastClick = FastClick;
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
// GTM Helper functions
function checkString(string1) {
    return function (string2) {
        return string1 == string2;
    }
};

function onProductClick(id, url) {
    var ecomm = window.dataLayer.filter(checkString("ecommerce"))[0];
    if (ecomm !== undefined) {
        var productObj = ecomm.ecommerce.impressions.filter(checkString(id))[0];
        if (productObj !== undefined) {
            dataLayer.push({
                'event': 'productClick',
                'ecommerce': {
                    'click': {
                        'actionField': {
                            'list': productObj.list
                        },
                        'products': [{
                            'name': productObj.name,
                            'id': productObj.id,
                            'price': productObj.price,
                            'category': productObj.category,
                            'variant': productObj.variant,
                            'position': productObj.position,
                            'dimension1': productObj.dimension1
                        }]
                    }
                },
                'eventCallback': function () {
                    document.location = url;
                },
                'eventTimeout': 2000
            });
        } else document.location = url;
    } else document.location = url;
}
/* 
* iAPPS formbuilder utilizes the jqueryui datepicker script but calls it with 
* options that are unnecessary and not mobile friendly.
* We are basically letting their script run, destroying it and just doing
* a basic call to the script
*/
$(document).ready(function(){
  $('.formDate').each(function(){
    $(this).children('input').datepicker("destroy");
    $(this).children('input').datepicker();
  });
});

/**************************

    micro function to add ability to ignore children of an element.

    example useage: $('element').ignore('*'); this would ignore all children

    example useage: $('element').ignore('span'); this would ignore children that are spans

**************************/

(function($) {
  $.fn.ignore = function(sel) {
    return this.clone().find(sel || ">*").remove().end();
  };
}(jQuery));


// Check if icon has text, ignoring children and their text.

$(document).ready(function() {
  $("[class*='icon-']").each(function() {
    var test = $(this).ignore("*:not('a')").text().trim().length
    if (test <= 0) {
      $(this).addClass("icon--empty");
    }
  });
});

$(document).ready(function() {
   if (navigator.userAgent.match(/Trident\/7\./)) { // if IE
      $('body').on("mousewheel", function() {
         // remove default behavior
         event.preventDefault();

         //scroll without smoothing
         var wheelDelta = event.wheelDelta;
         var currentScrollPosition = window.pageYOffset;
         window.scrollTo(0, currentScrollPosition - wheelDelta);
      });
   }
});

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
//scroll effect to any internal anchor links to give visual feedback of where users are in the document and that they have not been taken to another page
$(document).ready(function() {
    //Adding .not('.reTool').not('.reDropdown') so that this doesnt mess with the Rad Editor
   $('a[href*=#]').not('.reTool').not('.reDropdown').click(function(e) {
      if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
         e.preventDefault();
         var $target = $(this.hash);
         $target = $target.length && $target || $('[name=' + this.hash.slice(1) + ']');
         if ($target.length) {
            var targetOffset = $target.offset().top;
            if ($(".style-nav").length) {
               targetOffset = targetOffset - $(".style-nav").outerHeight(true);
            }
            $('html,body').animate({
               scrollTop: targetOffset
            }, 500);
            /* add the ios fix. The duration of the fix needs to match the duration of your animation. If you leave the duration blank it will occur immediately*/
            iosScrollTopBugFix(500);
            return false;
         }
      }
   });
});

// fix for ios bug. If you remove, ios will not activate radios and checkboxes when you click the label.
$('label').click(function() {});
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
/*hack for iphone/ipad bug where programmatic scroll screws up fixed elements*/

function iosScrollTopBugFix(wait) {
    if (wait == null)
        wait = 0;
    var hack = document.createElement("div");
    hack.style.height = "101%";
    document.body.appendChild(hack);
    setTimeout(function() {
        document.body.removeChild(hack);
        hack = null;
        /*the time below needs to be at least as long as the programmatic scroll time. If the div is added/removed before the scroll completes, this won't work*/
    }, wait);
}

//self-closing objects
$(document).ready(function() {
	$(".is-closeable").click(function() {
	    $(this).remove();
	});
});

// Magnific Popup v1.0.0 by Dmitry Semenov
// http://bit.ly/magnific-popup#build=inline+image+ajax+iframe+gallery+retina+imagezoom+fastclick
(function(a){typeof define=="function"&&define.amd?define(["jquery"],a):typeof exports=="object"?a(require("jquery")):a(window.jQuery||window.Zepto)})(function(a){var b="Close",c="BeforeClose",d="AfterClose",e="BeforeAppend",f="MarkupParse",g="Open",h="Change",i="mfp",j="."+i,k="mfp-ready",l="mfp-removing",m="mfp-prevent-close",n,o=function(){},p=!!window.jQuery,q,r=a(window),s,t,u,v,w=function(a,b){n.ev.on(i+a+j,b)},x=function(b,c,d,e){var f=document.createElement("div");return f.className="mfp-"+b,d&&(f.innerHTML=d),e?c&&c.appendChild(f):(f=a(f),c&&f.appendTo(c)),f},y=function(b,c){n.ev.triggerHandler(i+b,c),n.st.callbacks&&(b=b.charAt(0).toLowerCase()+b.slice(1),n.st.callbacks[b]&&n.st.callbacks[b].apply(n,a.isArray(c)?c:[c]))},z=function(b){if(b!==v||!n.currTemplate.closeBtn)n.currTemplate.closeBtn=a(n.st.closeMarkup.replace("%title%",n.st.tClose)),v=b;return n.currTemplate.closeBtn},A=function(){a.magnificPopup.instance||(n=new o,n.init(),a.magnificPopup.instance=n)},B=function(){var a=document.createElement("p").style,b=["ms","O","Moz","Webkit"];if(a.transition!==undefined)return!0;while(b.length)if(b.pop()+"Transition"in a)return!0;return!1};o.prototype={constructor:o,init:function(){var b=navigator.appVersion;n.isIE7=b.indexOf("MSIE 7.")!==-1,n.isIE8=b.indexOf("MSIE 8.")!==-1,n.isLowIE=n.isIE7||n.isIE8,n.isAndroid=/android/gi.test(b),n.isIOS=/iphone|ipad|ipod/gi.test(b),n.supportsTransition=B(),n.probablyMobile=n.isAndroid||n.isIOS||/(Opera Mini)|Kindle|webOS|BlackBerry|(Opera Mobi)|(Windows Phone)|IEMobile/i.test(navigator.userAgent),s=a(document),n.popupsCache={}},open:function(b){var c;if(b.isObj===!1){n.items=b.items.toArray(),n.index=0;var d=b.items,e;for(c=0;c<d.length;c++){e=d[c],e.parsed&&(e=e.el[0]);if(e===b.el[0]){n.index=c;break}}}else n.items=a.isArray(b.items)?b.items:[b.items],n.index=b.index||0;if(n.isOpen){n.updateItemHTML();return}n.types=[],u="",b.mainEl&&b.mainEl.length?n.ev=b.mainEl.eq(0):n.ev=s,b.key?(n.popupsCache[b.key]||(n.popupsCache[b.key]={}),n.currTemplate=n.popupsCache[b.key]):n.currTemplate={},n.st=a.extend(!0,{},a.magnificPopup.defaults,b),n.fixedContentPos=n.st.fixedContentPos==="auto"?!n.probablyMobile:n.st.fixedContentPos,n.st.modal&&(n.st.closeOnContentClick=!1,n.st.closeOnBgClick=!1,n.st.showCloseBtn=!1,n.st.enableEscapeKey=!1),n.bgOverlay||(n.bgOverlay=x("bg").on("click"+j,function(){n.close()}),n.wrap=x("wrap").attr("tabindex",-1).on("click"+j,function(a){n._checkIfClose(a.target)&&n.close()}),n.container=x("container",n.wrap)),n.contentContainer=x("content"),n.st.preloader&&(n.preloader=x("preloader",n.container,n.st.tLoading));var h=a.magnificPopup.modules;for(c=0;c<h.length;c++){var i=h[c];i=i.charAt(0).toUpperCase()+i.slice(1),n["init"+i].call(n)}y("BeforeOpen"),n.st.showCloseBtn&&(n.st.closeBtnInside?(w(f,function(a,b,c,d){c.close_replaceWith=z(d.type)}),u+=" mfp-close-btn-in"):n.wrap.append(z())),n.st.alignTop&&(u+=" mfp-align-top"),n.fixedContentPos?n.wrap.css({overflow:n.st.overflowY,overflowX:"hidden",overflowY:n.st.overflowY}):n.wrap.css({top:r.scrollTop(),position:"absolute"}),(n.st.fixedBgPos===!1||n.st.fixedBgPos==="auto"&&!n.fixedContentPos)&&n.bgOverlay.css({height:s.height(),position:"absolute"}),n.st.enableEscapeKey&&s.on("keyup"+j,function(a){a.keyCode===27&&n.close()}),r.on("resize"+j,function(){n.updateSize()}),n.st.closeOnContentClick||(u+=" mfp-auto-cursor"),u&&n.wrap.addClass(u);var l=n.wH=r.height(),m={};if(n.fixedContentPos&&n._hasScrollBar(l)){var o=n._getScrollbarSize();o&&(m.marginRight=o)}n.fixedContentPos&&(n.isIE7?a("body, html").css("overflow","hidden"):m.overflow="hidden");var p=n.st.mainClass;return n.isIE7&&(p+=" mfp-ie7"),p&&n._addClassToMFP(p),n.updateItemHTML(),y("BuildControls"),a("html").css(m),n.bgOverlay.add(n.wrap).prependTo(n.st.prependTo||a(document.body)),n._lastFocusedEl=document.activeElement,setTimeout(function(){n.content?(n._addClassToMFP(k),n._setFocus()):n.bgOverlay.addClass(k),s.on("focusin"+j,n._onFocusIn)},16),n.isOpen=!0,n.updateSize(l),y(g),b},close:function(){if(!n.isOpen)return;y(c),n.isOpen=!1,n.st.removalDelay&&!n.isLowIE&&n.supportsTransition?(n._addClassToMFP(l),setTimeout(function(){n._close()},n.st.removalDelay)):n._close()},_close:function(){y(b);var c=l+" "+k+" ";n.bgOverlay.detach(),n.wrap.detach(),n.container.empty(),n.st.mainClass&&(c+=n.st.mainClass+" "),n._removeClassFromMFP(c);if(n.fixedContentPos){var e={marginRight:""};n.isIE7?a("body, html").css("overflow",""):e.overflow="",a("html").css(e)}s.off("keyup"+j+" focusin"+j),n.ev.off(j),n.wrap.attr("class","mfp-wrap").removeAttr("style"),n.bgOverlay.attr("class","mfp-bg"),n.container.attr("class","mfp-container"),n.st.showCloseBtn&&(!n.st.closeBtnInside||n.currTemplate[n.currItem.type]===!0)&&n.currTemplate.closeBtn&&n.currTemplate.closeBtn.detach(),n._lastFocusedEl&&a(n._lastFocusedEl).focus(),n.currItem=null,n.content=null,n.currTemplate=null,n.prevHeight=0,y(d)},updateSize:function(a){if(n.isIOS){var b=document.documentElement.clientWidth/window.innerWidth,c=window.innerHeight*b;n.wrap.css("height",c),n.wH=c}else n.wH=a||r.height();n.fixedContentPos||n.wrap.css("height",n.wH),y("Resize")},updateItemHTML:function(){var b=n.items[n.index];n.contentContainer.detach(),n.content&&n.content.detach(),b.parsed||(b=n.parseEl(n.index));var c=b.type;y("BeforeChange",[n.currItem?n.currItem.type:"",c]),n.currItem=b;if(!n.currTemplate[c]){var d=n.st[c]?n.st[c].markup:!1;y("FirstMarkupParse",d),d?n.currTemplate[c]=a(d):n.currTemplate[c]=!0}t&&t!==b.type&&n.container.removeClass("mfp-"+t+"-holder");var e=n["get"+c.charAt(0).toUpperCase()+c.slice(1)](b,n.currTemplate[c]);n.appendContent(e,c),b.preloaded=!0,y(h,b),t=b.type,n.container.prepend(n.contentContainer),y("AfterChange")},appendContent:function(a,b){n.content=a,a?n.st.showCloseBtn&&n.st.closeBtnInside&&n.currTemplate[b]===!0?n.content.find(".mfp-close").length||n.content.append(z()):n.content=a:n.content="",y(e),n.container.addClass("mfp-"+b+"-holder"),n.contentContainer.append(n.content)},parseEl:function(b){var c=n.items[b],d;c.tagName?c={el:a(c)}:(d=c.type,c={data:c,src:c.src});if(c.el){var e=n.types;for(var f=0;f<e.length;f++)if(c.el.hasClass("mfp-"+e[f])){d=e[f];break}c.src=c.el.attr("data-mfp-src"),c.src||(c.src=c.el.attr("href"))}return c.type=d||n.st.type||"inline",c.index=b,c.parsed=!0,n.items[b]=c,y("ElementParse",c),n.items[b]},addGroup:function(a,b){var c=function(c){c.mfpEl=this,n._openClick(c,a,b)};b||(b={});var d="click.magnificPopup";b.mainEl=a,b.items?(b.isObj=!0,a.off(d).on(d,c)):(b.isObj=!1,b.delegate?a.off(d).on(d,b.delegate,c):(b.items=a,a.off(d).on(d,c)))},_openClick:function(b,c,d){var e=d.midClick!==undefined?d.midClick:a.magnificPopup.defaults.midClick;if(!e&&(b.which===2||b.ctrlKey||b.metaKey||b.altKey||b.shiftKey))return;var f=d.disableOn!==undefined?d.disableOn:a.magnificPopup.defaults.disableOn;if(f)if(a.isFunction(f)){if(!f.call(n))return!0}else if(r.width()<f)return!0;b.type&&(b.preventDefault(),n.isOpen&&b.stopPropagation()),d.el=a(b.mfpEl),d.delegate&&(d.items=c.find(d.delegate)),n.open(d)},updateStatus:function(a,b){if(n.preloader){q!==a&&n.container.removeClass("mfp-s-"+q),!b&&a==="loading"&&(b=n.st.tLoading);var c={status:a,text:b};y("UpdateStatus",c),a=c.status,b=c.text,n.preloader.html(b),n.preloader.find("a").on("click",function(a){a.stopImmediatePropagation()}),n.container.addClass("mfp-s-"+a),q=a}},_checkIfClose:function(b){if(a(b).hasClass(m))return;var c=n.st.closeOnContentClick,d=n.st.closeOnBgClick;if(c&&d)return!0;if(!n.content||a(b).hasClass("mfp-close")||n.preloader&&b===n.preloader[0])return!0;if(b!==n.content[0]&&!a.contains(n.content[0],b)){if(d&&a.contains(document,b))return!0}else if(c)return!0;return!1},_addClassToMFP:function(a){n.bgOverlay.addClass(a),n.wrap.addClass(a)},_removeClassFromMFP:function(a){this.bgOverlay.removeClass(a),n.wrap.removeClass(a)},_hasScrollBar:function(a){return(n.isIE7?s.height():document.body.scrollHeight)>(a||r.height())},_setFocus:function(){(n.st.focus?n.content.find(n.st.focus).eq(0):n.wrap).focus()},_onFocusIn:function(b){if(b.target!==n.wrap[0]&&!a.contains(n.wrap[0],b.target))return n._setFocus(),!1},_parseMarkup:function(b,c,d){var e;d.data&&(c=a.extend(d.data,c)),y(f,[b,c,d]),a.each(c,function(a,c){if(c===undefined||c===!1)return!0;e=a.split("_");if(e.length>1){var d=b.find(j+"-"+e[0]);if(d.length>0){var f=e[1];f==="replaceWith"?d[0]!==c[0]&&d.replaceWith(c):f==="img"?d.is("img")?d.attr("src",c):d.replaceWith('<img src="'+c+'" class="'+d.attr("class")+'" />'):d.attr(e[1],c)}}else b.find(j+"-"+a).html(c)})},_getScrollbarSize:function(){if(n.scrollbarSize===undefined){var a=document.createElement("div");a.style.cssText="width: 99px; height: 99px; overflow: scroll; position: absolute; top: -9999px;",document.body.appendChild(a),n.scrollbarSize=a.offsetWidth-a.clientWidth,document.body.removeChild(a)}return n.scrollbarSize}},a.magnificPopup={instance:null,proto:o.prototype,modules:[],open:function(b,c){return A(),b?b=a.extend(!0,{},b):b={},b.isObj=!0,b.index=c||0,this.instance.open(b)},close:function(){return a.magnificPopup.instance&&a.magnificPopup.instance.close()},registerModule:function(b,c){c.options&&(a.magnificPopup.defaults[b]=c.options),a.extend(this.proto,c.proto),this.modules.push(b)},defaults:{disableOn:0,key:null,midClick:!1,mainClass:"",preloader:!0,focus:"",closeOnContentClick:!1,closeOnBgClick:!0,closeBtnInside:!0,showCloseBtn:!0,enableEscapeKey:!0,modal:!1,alignTop:!1,removalDelay:0,prependTo:null,fixedContentPos:"auto",fixedBgPos:"auto",overflowY:"auto",closeMarkup:'<button title="%title%" type="button" class="mfp-close">&#215;</button>',tClose:"Close (Esc)",tLoading:"Loading..."}},a.fn.magnificPopup=function(b){A();var c=a(this);if(typeof b=="string")if(b==="open"){var d,e=p?c.data("magnificPopup"):c[0].magnificPopup,f=parseInt(arguments[1],10)||0;e.items?d=e.items[f]:(d=c,e.delegate&&(d=d.find(e.delegate)),d=d.eq(f)),n._openClick({mfpEl:d},c,e)}else n.isOpen&&n[b].apply(n,Array.prototype.slice.call(arguments,1));else b=a.extend(!0,{},b),p?c.data("magnificPopup",b):c[0].magnificPopup=b,n.addGroup(c,b);return c};var C="inline",D,E,F,G=function(){F&&(E.after(F.addClass(D)).detach(),F=null)};a.magnificPopup.registerModule(C,{options:{hiddenClass:"hide",markup:"",tNotFound:"Content not found"},proto:{initInline:function(){n.types.push(C),w(b+"."+C,function(){G()})},getInline:function(b,c){G();if(b.src){var d=n.st.inline,e=a(b.src);if(e.length){var f=e[0].parentNode;f&&f.tagName&&(E||(D=d.hiddenClass,E=x(D),D="mfp-"+D),F=e.after(E).detach().removeClass(D)),n.updateStatus("ready")}else n.updateStatus("error",d.tNotFound),e=a("<div>");return b.inlineElement=e,e}return n.updateStatus("ready"),n._parseMarkup(c,{},b),c}}});var H="ajax",I,J=function(){I&&a(document.body).removeClass(I)},K=function(){J(),n.req&&n.req.abort()};a.magnificPopup.registerModule(H,{options:{settings:null,cursor:"mfp-ajax-cur",tError:'<a href="%url%">The content</a> could not be loaded.'},proto:{initAjax:function(){n.types.push(H),I=n.st.ajax.cursor,w(b+"."+H,K),w("BeforeChange."+H,K)},getAjax:function(b){I&&a(document.body).addClass(I),n.updateStatus("loading");var c=a.extend({url:b.src,success:function(c,d,e){var f={data:c,xhr:e};y("ParseAjax",f),n.appendContent(a(f.data),H),b.finished=!0,J(),n._setFocus(),setTimeout(function(){n.wrap.addClass(k)},16),n.updateStatus("ready"),y("AjaxContentAdded")},error:function(){J(),b.finished=b.loadError=!0,n.updateStatus("error",n.st.ajax.tError.replace("%url%",b.src))}},n.st.ajax.settings);return n.req=a.ajax(c),""}}});var L,M=function(b){if(b.data&&b.data.title!==undefined)return b.data.title;var c=n.st.image.titleSrc;if(c){if(a.isFunction(c))return c.call(n,b);if(b.el)return b.el.attr(c)||""}return""};a.magnificPopup.registerModule("image",{options:{markup:'<div class="mfp-figure"><div class="mfp-close"></div><figure><div class="mfp-img"></div><figcaption><div class="mfp-bottom-bar"><div class="mfp-title"></div><div class="mfp-counter"></div></div></figcaption></figure></div>',cursor:"mfp-zoom-out-cur",titleSrc:"title",verticalFit:!0,tError:'<a href="%url%">The image</a> could not be loaded.'},proto:{initImage:function(){var c=n.st.image,d=".image";n.types.push("image"),w(g+d,function(){n.currItem.type==="image"&&c.cursor&&a(document.body).addClass(c.cursor)}),w(b+d,function(){c.cursor&&a(document.body).removeClass(c.cursor),r.off("resize"+j)}),w("Resize"+d,n.resizeImage),n.isLowIE&&w("AfterChange",n.resizeImage)},resizeImage:function(){var a=n.currItem;if(!a||!a.img)return;if(n.st.image.verticalFit){var b=0;n.isLowIE&&(b=parseInt(a.img.css("padding-top"),10)+parseInt(a.img.css("padding-bottom"),10)),a.img.css("max-height",n.wH-b)}},_onImageHasSize:function(a){a.img&&(a.hasSize=!0,L&&clearInterval(L),a.isCheckingImgSize=!1,y("ImageHasSize",a),a.imgHidden&&(n.content&&n.content.removeClass("mfp-loading"),a.imgHidden=!1))},findImageSize:function(a){var b=0,c=a.img[0],d=function(e){L&&clearInterval(L),L=setInterval(function(){if(c.naturalWidth>0){n._onImageHasSize(a);return}b>200&&clearInterval(L),b++,b===3?d(10):b===40?d(50):b===100&&d(500)},e)};d(1)},getImage:function(b,c){var d=0,e=function(){b&&(b.img[0].complete?(b.img.off(".mfploader"),b===n.currItem&&(n._onImageHasSize(b),n.updateStatus("ready")),b.hasSize=!0,b.loaded=!0,y("ImageLoadComplete")):(d++,d<200?setTimeout(e,100):f()))},f=function(){b&&(b.img.off(".mfploader"),b===n.currItem&&(n._onImageHasSize(b),n.updateStatus("error",g.tError.replace("%url%",b.src))),b.hasSize=!0,b.loaded=!0,b.loadError=!0)},g=n.st.image,h=c.find(".mfp-img");if(h.length){var i=document.createElement("img");i.className="mfp-img",b.el&&b.el.find("img").length&&(i.alt=b.el.find("img").attr("alt")),b.img=a(i).on("load.mfploader",e).on("error.mfploader",f),i.src=b.src,h.is("img")&&(b.img=b.img.clone()),i=b.img[0],i.naturalWidth>0?b.hasSize=!0:i.width||(b.hasSize=!1)}return n._parseMarkup(c,{title:M(b),img_replaceWith:b.img},b),n.resizeImage(),b.hasSize?(L&&clearInterval(L),b.loadError?(c.addClass("mfp-loading"),n.updateStatus("error",g.tError.replace("%url%",b.src))):(c.removeClass("mfp-loading"),n.updateStatus("ready")),c):(n.updateStatus("loading"),b.loading=!0,b.hasSize||(b.imgHidden=!0,c.addClass("mfp-loading"),n.findImageSize(b)),c)}}});var N,O=function(){return N===undefined&&(N=document.createElement("p").style.MozTransform!==undefined),N};a.magnificPopup.registerModule("zoom",{options:{enabled:!1,easing:"ease-in-out",duration:300,opener:function(a){return a.is("img")?a:a.find("img")}},proto:{initZoom:function(){var a=n.st.zoom,d=".zoom",e;if(!a.enabled||!n.supportsTransition)return;var f=a.duration,g=function(b){var c=b.clone().removeAttr("style").removeAttr("class").addClass("mfp-animated-image"),d="all "+a.duration/1e3+"s "+a.easing,e={position:"fixed",zIndex:9999,left:0,top:0,"-webkit-backface-visibility":"hidden"},f="transition";return e["-webkit-"+f]=e["-moz-"+f]=e["-o-"+f]=e[f]=d,c.css(e),c},h=function(){n.content.css("visibility","visible")},i,j;w("BuildControls"+d,function(){if(n._allowZoom()){clearTimeout(i),n.content.css("visibility","hidden"),e=n._getItemToZoom();if(!e){h();return}j=g(e),j.css(n._getOffset()),n.wrap.append(j),i=setTimeout(function(){j.css(n._getOffset(!0)),i=setTimeout(function(){h(),setTimeout(function(){j.remove(),e=j=null,y("ZoomAnimationEnded")},16)},f)},16)}}),w(c+d,function(){if(n._allowZoom()){clearTimeout(i),n.st.removalDelay=f;if(!e){e=n._getItemToZoom();if(!e)return;j=g(e)}j.css(n._getOffset(!0)),n.wrap.append(j),n.content.css("visibility","hidden"),setTimeout(function(){j.css(n._getOffset())},16)}}),w(b+d,function(){n._allowZoom()&&(h(),j&&j.remove(),e=null)})},_allowZoom:function(){return n.currItem.type==="image"},_getItemToZoom:function(){return n.currItem.hasSize?n.currItem.img:!1},_getOffset:function(b){var c;b?c=n.currItem.img:c=n.st.zoom.opener(n.currItem.el||n.currItem);var d=c.offset(),e=parseInt(c.css("padding-top"),10),f=parseInt(c.css("padding-bottom"),10);d.top-=a(window).scrollTop()-e;var g={width:c.width(),height:(p?c.innerHeight():c[0].offsetHeight)-f-e};return O()?g["-moz-transform"]=g.transform="translate("+d.left+"px,"+d.top+"px)":(g.left=d.left,g.top=d.top),g}}});var P="iframe",Q="//about:blank",R=function(a){if(n.currTemplate[P]){var b=n.currTemplate[P].find("iframe");b.length&&(a||(b[0].src=Q),n.isIE8&&b.css("display",a?"block":"none"))}};a.magnificPopup.registerModule(P,{options:{markup:'<div class="mfp-iframe-scaler"><div class="mfp-close"></div><iframe class="mfp-iframe" src="//about:blank" frameborder="0" allowfullscreen></iframe></div>',srcAction:"iframe_src",patterns:{youtube:{index:"youtube.com",id:"v=",src:"//www.youtube.com/embed/%id%?autoplay=1"},vimeo:{index:"vimeo.com/",id:"/",src:"//player.vimeo.com/video/%id%?autoplay=1"},gmaps:{index:"//maps.google.",src:"%id%&output=embed"}}},proto:{initIframe:function(){n.types.push(P),w("BeforeChange",function(a,b,c){b!==c&&(b===P?R():c===P&&R(!0))}),w(b+"."+P,function(){R()})},getIframe:function(b,c){var d=b.src,e=n.st.iframe;a.each(e.patterns,function(){if(d.indexOf(this.index)>-1)return this.id&&(typeof this.id=="string"?d=d.substr(d.lastIndexOf(this.id)+this.id.length,d.length):d=this.id.call(this,d)),d=this.src.replace("%id%",d),!1});var f={};return e.srcAction&&(f[e.srcAction]=d),n._parseMarkup(c,f,b),n.updateStatus("ready"),c}}});var S=function(a){var b=n.items.length;return a>b-1?a-b:a<0?b+a:a},T=function(a,b,c){return a.replace(/%curr%/gi,b+1).replace(/%total%/gi,c)};a.magnificPopup.registerModule("gallery",{options:{enabled:!1,arrowMarkup:'<button title="%title%" type="button" class="mfp-arrow mfp-arrow-%dir%"></button>',preload:[0,2],navigateByImgClick:!0,arrows:!0,tPrev:"Previous (Left arrow key)",tNext:"Next (Right arrow key)",tCounter:"%curr% of %total%"},proto:{initGallery:function(){var c=n.st.gallery,d=".mfp-gallery",e=Boolean(a.fn.mfpFastClick);n.direction=!0;if(!c||!c.enabled)return!1;u+=" mfp-gallery",w(g+d,function(){c.navigateByImgClick&&n.wrap.on("click"+d,".mfp-img",function(){if(n.items.length>1)return n.next(),!1}),s.on("keydown"+d,function(a){a.keyCode===37?n.prev():a.keyCode===39&&n.next()})}),w("UpdateStatus"+d,function(a,b){b.text&&(b.text=T(b.text,n.currItem.index,n.items.length))}),w(f+d,function(a,b,d,e){var f=n.items.length;d.counter=f>1?T(c.tCounter,e.index,f):""}),w("BuildControls"+d,function(){if(n.items.length>1&&c.arrows&&!n.arrowLeft){var b=c.arrowMarkup,d=n.arrowLeft=a(b.replace(/%title%/gi,c.tPrev).replace(/%dir%/gi,"left")).addClass(m),f=n.arrowRight=a(b.replace(/%title%/gi,c.tNext).replace(/%dir%/gi,"right")).addClass(m),g=e?"mfpFastClick":"click";d[g](function(){n.prev()}),f[g](function(){n.next()}),n.isIE7&&(x("b",d[0],!1,!0),x("a",d[0],!1,!0),x("b",f[0],!1,!0),x("a",f[0],!1,!0)),n.container.append(d.add(f))}}),w(h+d,function(){n._preloadTimeout&&clearTimeout(n._preloadTimeout),n._preloadTimeout=setTimeout(function(){n.preloadNearbyImages(),n._preloadTimeout=null},16)}),w(b+d,function(){s.off(d),n.wrap.off("click"+d),n.arrowLeft&&e&&n.arrowLeft.add(n.arrowRight).destroyMfpFastClick(),n.arrowRight=n.arrowLeft=null})},next:function(){n.direction=!0,n.index=S(n.index+1),n.updateItemHTML()},prev:function(){n.direction=!1,n.index=S(n.index-1),n.updateItemHTML()},goTo:function(a){n.direction=a>=n.index,n.index=a,n.updateItemHTML()},preloadNearbyImages:function(){var a=n.st.gallery.preload,b=Math.min(a[0],n.items.length),c=Math.min(a[1],n.items.length),d;for(d=1;d<=(n.direction?c:b);d++)n._preloadItem(n.index+d);for(d=1;d<=(n.direction?b:c);d++)n._preloadItem(n.index-d)},_preloadItem:function(b){b=S(b);if(n.items[b].preloaded)return;var c=n.items[b];c.parsed||(c=n.parseEl(b)),y("LazyLoad",c),c.type==="image"&&(c.img=a('<img class="mfp-img" />').on("load.mfploader",function(){c.hasSize=!0}).on("error.mfploader",function(){c.hasSize=!0,c.loadError=!0,y("LazyLoadError",c)}).attr("src",c.src)),c.preloaded=!0}}});var U="retina";a.magnificPopup.registerModule(U,{options:{replaceSrc:function(a){return a.src.replace(/\.\w+$/,function(a){return"@2x"+a})},ratio:1},proto:{initRetina:function(){if(window.devicePixelRatio>1){var a=n.st.retina,b=a.ratio;b=isNaN(b)?b():b,b>1&&(w("ImageHasSize."+U,function(a,c){c.img.css({"max-width":c.img[0].naturalWidth/b,width:"100%"})}),w("ElementParse."+U,function(c,d){d.src=a.replaceSrc(d,b)}))}}}}),function(){var b=1e3,c="ontouchstart"in window,d=function(){r.off("touchmove"+f+" touchend"+f)},e="mfpFastClick",f="."+e;a.fn.mfpFastClick=function(e){return a(this).each(function(){var g=a(this),h;if(c){var i,j,k,l,m,n;g.on("touchstart"+f,function(a){l=!1,n=1,m=a.originalEvent?a.originalEvent.touches[0]:a.touches[0],j=m.clientX,k=m.clientY,r.on("touchmove"+f,function(a){m=a.originalEvent?a.originalEvent.touches:a.touches,n=m.length,m=m[0];if(Math.abs(m.clientX-j)>10||Math.abs(m.clientY-k)>10)l=!0,d()}).on("touchend"+f,function(a){d();if(l||n>1)return;h=!0,a.preventDefault(),clearTimeout(i),i=setTimeout(function(){h=!1},b),e()})})}g.on("click"+f,function(){h||e()})})},a.fn.destroyMfpFastClick=function(){a(this).off("touchstart"+f+" click"+f),c&&r.off("touchmove"+f+" touchend"+f)}}(),A()})
//Hook up generic modals
$(document).ready(function() {
	$('.openPopup[modalType!="iframe"]').each(function(){
		var popupType = $(this).attr('popupType');
		var prependId = '#form1';
		if ($('#form1').length == 0)
			prependId = 'body';
		if (!popupType || popupType == "")
			popupType = 'inline';
		$(this).magnificPopup({
			type: popupType,
			midClick: true,
			prependTo: prependId,
			focus: $(this).attr('data-mfp-focus')
		}); 
	});
});
/*

	Example of how to use matchMedia.
	The matchMedia legacy code has been removed, because this 
	funcitonality is now included in vanilla JavaScript.


	The below statement checks to see if 
	the screen is currently 500px or smaller.

	if ( window.matchMedia("(max-width: 500px)").matches ) {
		do something
	}

*/
//mobile filter drawer
(function($) {
    $.fn.filterToggle = function() {
        waitForFinalEvent(
            function() {
                function closeFilters() {
                    $('body').removeClass('mobileFilterDrawer-open');
                    $('.mobileFilterDrawerMask').remove();
                }

                function openFilters() {
                    $('body').addClass('mobileFilterDrawer-open');
                    if (!$('.mobileFilterDrawerMask').length) {
                        $('body').append($("<div></div>").addClass('mobileFilterDrawerMask'));
                    }
                }
                if (window.matchMedia("(max-width: 641px)").matches) {

                    $('.js-mobileFilterDrawerToggle').click(function() {
                        openFilters();
                    });

                    $('.mobileFilterDrawer-close').click(function() {
                        closeFilters();
                    });

                    $(document).delegate('.mobileFilterDrawerMask','click',function() {
                        closeFilters();
                    });

                } else {
                    closeFilters();
                }
            }, 200, "filterToggleResize");
    };
})(jQuery);
$(window).bind('load resize orientationchange', $.fn.filterToggle);

/*******************************************************************
This is the function to add toggles for nav items that have children.
If this is going in a mobile Drawer the mediaQuery needs to match the 
 mediaQuery used in the drawer function.
*******************************************************************/

$(document).ready(function() {
  $('.navMain li.hasChildren, .navUtil li.hasChildren').subToggle({
    mediaQuery: 1024
  });
});

//jQuery function for adding sub toggles
(function($) {
  $.fn.subToggle = function(options) {
    var opts = options;
    return this.each(function() {
      var defaults = {
        mediaQuery: 1024
      };
      var options = $.extend({}, defaults, opts);

      var $this = $(this);
      var mediaQuery = options.mediaQuery;

      addRemoveToggle($this, mediaQuery);

      $(window).on('resize orientationchange', function() {
        addRemoveToggle($this, mediaQuery);
      });
    });
  }
}(jQuery));

//Function to add/remove toggles
//This is called by the plugin above this.
function addRemoveToggle(element, mediaQuery) {
  if (!window.matchMedia('(min-width: ' + mediaQuery + 'px)').matches) {
    if (element.find('.navMain-mobile-subToggle').length <= 0) {
      element.prepend('<span class="navMain-mobile-subToggle" />');
    }
  } else {
    element.find('.navMain-mobile-subToggle').remove();
  }
}

//Document delegation for mobils sub toggles.
//Delegating this event prevents us from having to wire this up each time the toggle is added. 
$(document).on('click', '.navMain-mobile-subToggle', function(event) {
  event.stopPropagation();
  if (!$(this).closest('li').hasClass('is-active')) {
    $('.navMain-mobile li.is-active').removeClass('is-active');
    $(this).closest('li').addClass('is-active');
  } else {
    $('.navMain-mobile li.is-active').removeClass('is-active');
  }
});

//Document delegation for links with no destination (act as a sub toggle).
$(document).on('click', '.navMain-mobile li.hasChildren', function(event) {
  if ($(this).find('a').attr('href') === "javascript:void(0)") {
    event.preventDefault();
    $('.navMain-mobile li.hasChildren').not($(this)).removeClass('is-active');
    $(this).toggleClass('is-active');
  }
});

/* Modernizr 2.6.2 (Custom Build) | MIT & BSD
 * Build: http://modernizr.com/download/#-borderradius-opacity-rgba-cssanimations-generatedcontent-csstransitions-input-inputtypes-touch-shiv-mq-cssclasses-teststyles-testprop-testallprops-prefixes-domprefixes-load
 */
;
window.Modernizr = function(a, b, c) {
      function B(a) { j.cssText = a }

      function C(a, b) {
         return B(n.join(a + ";") + (b || "")) }

      function D(a, b) {
         return typeof a === b }

      function E(a, b) {
         return !!~("" + a).indexOf(b) }

      function F(a, b) {
         for (var d in a) {
            var e = a[d];
            if (!E(e, "-") && j[e] !== c) return b == "pfx" ? e : !0 }
         return !1 }

      function G(a, b, d) {
         for (var e in a) {
            var f = b[a[e]];
            if (f !== c) return d === !1 ? a[e] : D(f, "function") ? f.bind(d || b) : f }
         return !1 }

      function H(a, b, c) {
         var d = a.charAt(0).toUpperCase() + a.slice(1),
            e = (a + " " + p.join(d + " ") + d).split(" ");
         return D(b, "string") || D(b, "undefined") ? F(e, b) : (e = (a + " " + q.join(d + " ") + d).split(" "), G(e, b, c)) }

      function I() { e.input = function(c) {
            for (var d = 0, e = c.length; d < e; d++) t[c[d]] = c[d] in k;
            return t.list && (t.list = !!b.createElement("datalist") && !!a.HTMLDataListElement), t }("autocomplete autofocus list placeholder max min multiple pattern required step".split(" ")), e.inputtypes = function(a) {
            for (var d = 0, e, f, h, i = a.length; d < i; d++) k.setAttribute("type", f = a[d]), e = k.type !== "text", e && (k.value = l, k.style.cssText = "position:absolute;visibility:hidden;", /^range$/.test(f) && k.style.WebkitAppearance !== c ? (g.appendChild(k), h = b.defaultView, e = h.getComputedStyle && h.getComputedStyle(k, null).WebkitAppearance !== "textfield" && k.offsetHeight !== 0, g.removeChild(k)) : /^(search|tel)$/.test(f) || (/^(url|email)$/.test(f) ? e = k.checkValidity && k.checkValidity() === !1 : e = k.value != l)), s[a[d]] = !!e;
            return s }("search tel url email datetime date month week time datetime-local number range color".split(" ")) }
      var d = "2.6.2",
         e = {},
         f = !0,
         g = b.documentElement,
         h = "modernizr",
         i = b.createElement(h),
         j = i.style,
         k = b.createElement("input"),
         l = ":)",
         m = {}.toString,
         n = " -webkit- -moz- -o- -ms- ".split(" "),
         o = "Webkit Moz O ms",
         p = o.split(" "),
         q = o.toLowerCase().split(" "),
         r = {},
         s = {},
         t = {},
         u = [],
         v = u.slice,
         w, x = function(a, c, d, e) {
            var f, i, j, k, l = b.createElement("div"),
               m = b.body,
               n = m || b.createElement("body");
            if (parseInt(d, 10))
               while (d--) j = b.createElement("div"), j.id = e ? e[d] : h + (d + 1), l.appendChild(j);
            return f = ["&#173;", '<style id="s', h, '">', a, "</style>"].join(""), l.id = h, (m ? l : n).innerHTML += f, n.appendChild(l), m || (n.style.background = "", n.style.overflow = "hidden", k = g.style.overflow, g.style.overflow = "hidden", g.appendChild(n)), i = c(l, a), m ? l.parentNode.removeChild(l) : (n.parentNode.removeChild(n), g.style.overflow = k), !!i },
         y = function(b) {
            var c = a.matchMedia || a.msMatchMedia;
            if (c) return c(b).matches;
            var d;
            return x("@media " + b + " { #" + h + " { position: absolute; } }", function(b) { d = (a.getComputedStyle ? getComputedStyle(b, null) : b.currentStyle)["position"] == "absolute" }), d },
         z = {}.hasOwnProperty,
         A;!D(z, "undefined") && !D(z.call, "undefined") ? A = function(a, b) {
         return z.call(a, b) } : A = function(a, b) {
         return b in a && D(a.constructor.prototype[b], "undefined") }, Function.prototype.bind || (Function.prototype.bind = function(b) {
         var c = this;
         if (typeof c != "function") throw new TypeError;
         var d = v.call(arguments, 1),
            e = function() {
               if (this instanceof e) {
                  var a = function() {};
                  a.prototype = c.prototype;
                  var f = new a,
                     g = c.apply(f, d.concat(v.call(arguments)));
                  return Object(g) === g ? g : f }
               return c.apply(b, d.concat(v.call(arguments))) };
         return e }), r.touch = function() {
         var c;
         return "ontouchstart" in a || a.DocumentTouch && b instanceof DocumentTouch ? c = !0 : x(["@media (", n.join("touch-enabled),("), h, ")", "{#modernizr{top:9px;position:absolute}}"].join(""), function(a) { c = a.offsetTop === 9 }), c }, r.rgba = function() {
         return B("background-color:rgba(150,255,150,.5)"), E(j.backgroundColor, "rgba") }, r.borderradius = function() {
         return H("borderRadius") }, r.opacity = function() {
         return C("opacity:.55"), /^0.55$/.test(j.opacity) }, r.cssanimations = function() {
         return H("animationName") }, r.csstransitions = function() {
         return H("transition") }, r.generatedcontent = function() {
         var a;
         return x(["#", h, "{font:0/0 a}#", h, ':after{content:"', l, '";visibility:hidden;font:3px/1 a}'].join(""), function(b) { a = b.offsetHeight >= 3 }), a };
      for (var J in r) A(r, J) && (w = J.toLowerCase(), e[w] = r[J](), u.push((e[w] ? "" : "no-") + w));
      return e.input || I(), e.addTest = function(a, b) {
            if (typeof a == "object")
               for (var d in a) A(a, d) && e.addTest(d, a[d]);
            else { a = a.toLowerCase();
               if (e[a] !== c) return e;
               b = typeof b == "function" ? b() : b, typeof f != "undefined" && f && (g.className += " " + (b ? "" : "no-") + a), e[a] = b }
            return e }, B(""), i = k = null,
         function(a, b) {
            function k(a, b) {
               var c = a.createElement("p"),
                  d = a.getElementsByTagName("head")[0] || a.documentElement;
               return c.innerHTML = "x<style>" + b + "</style>", d.insertBefore(c.lastChild, d.firstChild) }

            function l() {
               var a = r.elements;
               return typeof a == "string" ? a.split(" ") : a }

            function m(a) {
               var b = i[a[g]];
               return b || (b = {}, h++, a[g] = h, i[h] = b), b }

            function n(a, c, f) { c || (c = b);
               if (j) return c.createElement(a);
               f || (f = m(c));
               var g;
               return f.cache[a] ? g = f.cache[a].cloneNode() : e.test(a) ? g = (f.cache[a] = f.createElem(a)).cloneNode() : g = f.createElem(a), g.canHaveChildren && !d.test(a) ? f.frag.appendChild(g) : g }

            function o(a, c) { a || (a = b);
               if (j) return a.createDocumentFragment();
               c = c || m(a);
               var d = c.frag.cloneNode(),
                  e = 0,
                  f = l(),
                  g = f.length;
               for (; e < g; e++) d.createElement(f[e]);
               return d }

            function p(a, b) { b.cache || (b.cache = {}, b.createElem = a.createElement, b.createFrag = a.createDocumentFragment, b.frag = b.createFrag()), a.createElement = function(c) {
                  return r.shivMethods ? n(c, a, b) : b.createElem(c) }, a.createDocumentFragment = Function("h,f", "return function(){var n=f.cloneNode(),c=n.createElement;h.shivMethods&&(" + l().join().replace(/\w+/g, function(a) {
                  return b.createElem(a), b.frag.createElement(a), 'c("' + a + '")' }) + ");return n}")(r, b.frag) }

            function q(a) { a || (a = b);
               var c = m(a);
               return r.shivCSS && !f && !c.hasCSS && (c.hasCSS = !!k(a, "article,aside,figcaption,figure,footer,header,hgroup,nav,section{display:block}mark{background:#FF0;color:#000}")), j || p(a, c), a }
            var c = a.html5 || {},
               d = /^<|^(?:button|map|select|textarea|object|iframe|option|optgroup)$/i,
               e = /^(?:a|b|code|div|fieldset|h1|h2|h3|h4|h5|h6|i|label|li|ol|p|q|span|strong|style|table|tbody|td|th|tr|ul)$/i,
               f, g = "_html5shiv",
               h = 0,
               i = {},
               j;
            (function() {
               try {
                  var a = b.createElement("a");
                  a.innerHTML = "<xyz></xyz>", f = "hidden" in a, j = a.childNodes.length == 1 || function() { b.createElement("a");
                     var a = b.createDocumentFragment();
                     return typeof a.cloneNode == "undefined" || typeof a.createDocumentFragment == "undefined" || typeof a.createElement == "undefined" }() } catch (c) { f = !0, j = !0 } })();
            var r = { elements: c.elements || "abbr article aside audio bdi canvas data datalist details figcaption figure footer header hgroup mark meter nav output progress section summary time video", shivCSS: c.shivCSS !== !1, supportsUnknownElements: j, shivMethods: c.shivMethods !== !1, type: "default", shivDocument: q, createElement: n, createDocumentFragment: o };
            a.html5 = r, q(b) }(this, b), e._version = d, e._prefixes = n, e._domPrefixes = q, e._cssomPrefixes = p, e.mq = y, e.testProp = function(a) {
            return F([a]) }, e.testAllProps = H, e.testStyles = x, g.className = g.className.replace(/(^|\s)no-js(\s|$)/, "$1$2") + (f ? " js " + u.join(" ") : ""), e }(this, this.document),
   function(a, b, c) {
      function d(a) {
         return "[object Function]" == o.call(a) }

      function e(a) {
         return "string" == typeof a }

      function f() {}

      function g(a) {
         return !a || "loaded" == a || "complete" == a || "uninitialized" == a }

      function h() {
         var a = p.shift();
         q = 1, a ? a.t ? m(function() {
            ("c" == a.t ? B.injectCss : B.injectJs)(a.s, 0, a.a, a.x, a.e, 1) }, 0) : (a(), h()) : q = 0 }

      function i(a, c, d, e, f, i, j) {
         function k(b) {
            if (!o && g(l.readyState) && (u.r = o = 1, !q && h(), l.onload = l.onreadystatechange = null, b)) { "img" != a && m(function() { t.removeChild(l) }, 50);
               for (var d in y[c]) y[c].hasOwnProperty(d) && y[c][d].onload() } }
         var j = j || B.errorTimeout,
            l = b.createElement(a),
            o = 0,
            r = 0,
            u = { t: d, s: c, e: f, a: i, x: j };
         1 === y[c] && (r = 1, y[c] = []), "object" == a ? l.data = c : (l.src = c, l.type = a), l.width = l.height = "0", l.onerror = l.onload = l.onreadystatechange = function() { k.call(this, r) }, p.splice(e, 0, u), "img" != a && (r || 2 === y[c] ? (t.insertBefore(l, s ? null : n), m(k, j)) : y[c].push(l)) }

      function j(a, b, c, d, f) {
         return q = 0, b = b || "j", e(a) ? i("c" == b ? v : u, a, b, this.i++, c, d, f) : (p.splice(this.i++, 0, a), 1 == p.length && h()), this }

      function k() {
         var a = B;
         return a.loader = { load: j, i: 0 }, a }
      var l = b.documentElement,
         m = a.setTimeout,
         n = b.getElementsByTagName("script")[0],
         o = {}.toString,
         p = [],
         q = 0,
         r = "MozAppearance" in l.style,
         s = r && !!b.createRange().compareNode,
         t = s ? l : n.parentNode,
         l = a.opera && "[object Opera]" == o.call(a.opera),
         l = !!b.attachEvent && !l,
         u = r ? "object" : l ? "script" : "img",
         v = l ? "script" : u,
         w = Array.isArray || function(a) {
            return "[object Array]" == o.call(a) },
         x = [],
         y = {},
         z = { timeout: function(a, b) {
               return b.length && (a.timeout = b[0]), a } },
         A, B;
      B = function(a) {
         function b(a) {
            var a = a.split("!"),
               b = x.length,
               c = a.pop(),
               d = a.length,
               c = { url: c, origUrl: c, prefixes: a },
               e, f, g;
            for (f = 0; f < d; f++) g = a[f].split("="), (e = z[g.shift()]) && (c = e(c, g));
            for (f = 0; f < b; f++) c = x[f](c);
            return c }

         function g(a, e, f, g, h) {
            var i = b(a),
               j = i.autoCallback;
            i.url.split(".").pop().split("?").shift(), i.bypass || (e && (e = d(e) ? e : e[a] || e[g] || e[a.split("/").pop().split("?")[0]]), i.instead ? i.instead(a, e, f, g, h) : (y[i.url] ? i.noexec = !0 : y[i.url] = 1, f.load(i.url, i.forceCSS || !i.forceJS && "css" == i.url.split(".").pop().split("?").shift() ? "c" : c, i.noexec, i.attrs, i.timeout), (d(e) || d(j)) && f.load(function() { k(), e && e(i.origUrl, h, g), j && j(i.origUrl, h, g), y[i.url] = 2 }))) }

         function h(a, b) {
            function c(a, c) {
               if (a) {
                  if (e(a)) c || (j = function() {
                     var a = [].slice.call(arguments);
                     k.apply(this, a), l() }), g(a, j, b, 0, h);
                  else if (Object(a) === a)
                     for (n in m = function() {
                           var b = 0,
                              c;
                           for (c in a) a.hasOwnProperty(c) && b++;
                           return b }(), a) a.hasOwnProperty(n) && (!c && !--m && (d(j) ? j = function() {
                        var a = [].slice.call(arguments);
                        k.apply(this, a), l() } : j[n] = function(a) {
                        return function() {
                           var b = [].slice.call(arguments);
                           a && a.apply(this, b), l() } }(k[n])), g(a[n], j, b, n, h)) } else !c && l() }
            var h = !!a.test,
               i = a.load || a.both,
               j = a.callback || f,
               k = j,
               l = a.complete || f,
               m, n;
            c(h ? a.yep : a.nope, !!i), i && c(i) }
         var i, j, l = this.yepnope.loader;
         if (e(a)) g(a, 0, l, 0);
         else if (w(a))
            for (i = 0; i < a.length; i++) j = a[i], e(j) ? g(j, 0, l, 0) : w(j) ? B(j) : Object(j) === j && h(j, l);
         else Object(a) === a && h(a, l) }, B.addPrefix = function(a, b) { z[a] = b }, B.addFilter = function(a) { x.push(a) }, B.errorTimeout = 1e4, null == b.readyState && b.addEventListener && (b.readyState = "loading", b.addEventListener("DOMContentLoaded", A = function() { b.removeEventListener("DOMContentLoaded", A, 0), b.readyState = "complete" }, 0)), a.yepnope = k(), a.yepnope.executeStack = h, a.yepnope.injectJs = function(a, c, d, e, i, j) {
         var k = b.createElement("script"),
            l, o, e = e || B.errorTimeout;
         k.src = a;
         for (o in d) k.setAttribute(o, d[o]);
         c = j ? h : c || f, k.onreadystatechange = k.onload = function() {!l && g(k.readyState) && (l = 1, c(), k.onload = k.onreadystatechange = null) }, m(function() { l || (l = 1, c(1)) }, e), i ? k.onload() : n.parentNode.insertBefore(k, n) }, a.yepnope.injectCss = function(a, c, d, e, g, i) {
         var e = b.createElement("link"),
            j, c = i ? h : c || f;
         e.href = a, e.rel = "stylesheet", e.type = "text/css";
         for (j in d) e.setAttribute(j, d[j]);
         g || (n.parentNode.insertBefore(e, n), m(c, 0)) } }(this, document), Modernizr.load = function() { yepnope.apply(window, [].slice.call(arguments, 0)) };

$(document).ready(function() {
   $('.navCallout li.hasChildren').click(function(event) {
      if (window.matchMedia("(max-width: 1024px)").matches) {
         event.preventDefault();
         $(this).toggleClass('is-open');
      }
   });
});

//toggle mobile horizontal nav
$(document).ready(function() {
    $('.navHorizontal .selected a').on('click', function(e) {
        e.preventDefault();
        $(this).closest('ul').toggleClass("is-open");
     });
});

//toggle user nav on mobile
function mobileUserToggle(el) {
   var $this = $(el);
   if (window.matchMedia("(max-width: 1023px)").matches) {
      $this.toggleClass('is-active');
   } else {
      $this.removeClass('is-active');
   }
}

$(document).ready(function() {
   $(document).on('click', '.navUser', function() {
      mobileUserToggle($(this));
   });

   $(window).on('resize orientationchange', function() {
      $('.navUser').removeClass('is-active');
   });
});

$(document).ready(function () {
    $(document).on('click', '.notification__close', function() {
        $(this).closest('.notification').slideUp();
    });
});
$(document).ready(function() {
   $(".banner--fixedBackground").parallax();
   $(".sliderMainImage").parallax();
});


(function($) {
   $.fn.parallax = function() {
      var $elements = this;
      parallaxMe($elements);
      
      $(window).on("scroll resize orientationchange", function() {
         parallaxMe($elements);
      });

      function parallaxMe(els) {
         var $els = $($elements);
         if (window.matchMedia("(min-device-width: 700px)").matches && window.matchMedia("(min-width: 841px)").matches) {
            $els.each(function() {
               var elementTop = $(this).offset().top;
               var elementHight = $(this).outerHeight();
               var scrollTop = $(window).scrollTop();
               var viewHeight = $(window).innerHeight();

               var inViewport = scrollTop - elementTop + viewHeight;
               var bgpos = -(((elementTop - scrollTop + elementHight) / (viewHeight + elementHight)) * 150);

               if (inViewport > 0 && !(scrollTop > (elementTop + elementHight))) {
                  $(this).css("background-position-y", bgpos + "px");
               }
            });
         } else {
            $els.css("background-position-y", "");
         }
         return $els;
      }
      return $elements;
   }
}(jQuery));

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


/* Instructions:
1. Define the main element you want moved (theElement)
2. Define the container you want the element moved to (destination: '.destinationContainer')
3. Define the breakpoint at which you want the element moved in pixels (mediaQuery: 1000) 
    3a. This is optional - the default is 1023
4. Define the modifier class you want added to the element while it is moved (movedClass: 'someClassName')
    4a. This is optional - the default is 'is-moved'
    5. Define whether you would like the element to be prepended (added to beginning)
    or appended (added to end) of destination container

FULL EXAMPLE:
$('.navCallout').retach({
    destination:'.globals-mobile', 
    mediaQuery: 641,
    movedClass: 'navCallout-mobile',
    prependAppend: 'prepend'
});

Let's break this down:

//.navCallout is what we want to move around
$('.navCallout').retach({

    //We specify that the element should be moved to the div with the class of .globals-mobile
    destination: '.globals-mobile',

    //This element should be moved while screen width is LESS THAN 641px wide
    mediaQuery: 641,

    //We add the class of "navCallout-mobile" to the element while it is moved from it's original location
    movedClass: 'navCallout-mobile',

    //instead of appending the element to the container, we will prepend it
    prependAppend: 'prepend'
});

HEADER SPECIFIC EXAMPLE:
Let's say different headers have different elements and we want some to appear in the global-mobiles drawer

    //for the element we want to move, just add the classname of the appropriate header
    $('.headerMain--franchise .locSearch').retach({
        destination:'.globals-mobile', 
        mediaQuery: 641,
        movedClass: 'locSearch-mobile',
        prependAppend: 'prepend'
    });

*/


$(document).ready(function() {
  //attach main nav items to the main mobile nav in the drawer
  $('.navMain > ul > li').retach({
    destination: '.navMain-mobile > ul'
  });
  //attach util nav items to the main mobile nav in the drawer
  $('.navUtil > ul > li').retach({
    destination: '.navMain-mobile > ul'
  });
  //send the filters to the drawer on mobile
  $('.filters').retach({
    destination: '.filters-mobile',
    mediaQuery: 641
  });
});



(function($) {
  $.fn.retach = function(options) {
    var defaults = {
      destination: 'body',
      mediaQuery: 1023,
      movedClass: 'is-moved',
      prependAppend: 'append'
    };
    var options = $.extend({}, defaults, options);

    var $items = this;
    var $destination = $(options.destination);
    var mediaQuery = options.mediaQuery;
    var movedClass = options.movedClass;
    var $prependAppend = options.prependAppend;

    var placeholderID = Math.floor((Math.random() * 10000) + 1) + Math.floor((Math.random() * 10000) + 1);
    var $placeholder = $('<i class="placeholder" data-placeholderID="' + placeholderID + '" />');

    function moveItems() {
      if ($('i[data-placeholderID="' + placeholderID + '"]').length <= 0) {
        $items.first().before($placeholder);
      }
      if (window.matchMedia("(max-width: " + mediaQuery + "px)").matches) {
        if ($prependAppend == 'append') {
          $destination.append($items);
        } else {
          $destination.prepend($items);
        }

        $items.addClass(movedClass);
      } else {
        $placeholder.after($items);
        $items.removeClass(movedClass);
      }
    }

    moveItems();
    $(window).resize(function() {
      moveItems();
    });
    return $items;
  }
}(jQuery));

/*
INSTRUCTIONS

To use this plugin, call the .scrollFade() function on any jQuery element.
It should probably only be used on below the fold content that the user
will scroll to, but you can play around with it to see what you like.

If the element you use this function on has other css animations, they will
be disabled until after the .scrollFade() function has completed. 

You can pass parameters to change the functionality of the plugin, they 
are passed as an object with {key: value} pairs inside the plugin function.

ex $('.someObject').scrollFade({
   key: value,
   key2: value2
})

There are 4 optional parameters and one required parameter.

REQUIRED PARAMETERS:
------------------------------------------------------------------------------------
testParent: this is an HTML element, CSS class, or ID that is passed as a string.
It is required so that the function has some element that it can test against to
see if the objects that are animated are children of the same parent element. This
is important in calculation in the animation delay of elements as well as the 
calculation of the start time of the animation for all elements. If this parameter
is not provided - the plugin will fail and throw an error alert.
   EX:
   $('.spotlight-content > *').scrollFade({
      testParent: '.spotlight-content'
   });

OPTIONAL PARAMETERS
------------------------------------------------------------------------------------
duration: the duration of the fade in animation in seconds passed as a number.
Default is 0.5 seconds.
   EX:
   $('.spotlight-content > *').scrollFade({
      duration: 0.25
   });

useDelay: a boolean (true or false) that tells the plugin whether to stagger
the animation of children elements. If it's false, then the elements will load 
simultaneously, if it's true they will load one at a time. Default is true.
   EX:
   $('.spotlight-content > *').scrollFade({
      useDelay: false
   });

delayIncrement: the amount of time to delay the animation of children elements of 
the same parent. AKA: Staggering of animation from first to last item.
It should be passed as a number (only valid if useDelay is true).
Default is 0.5 seconds.
   EX:
   $('.spotlight-content > *').scrollFade({
      delayIncrement: 0.75
   });

visibleDistance: the distance from the bottom of the screen and element must be
to start the fade in animation passed as a number. This number is in VH units (percent
of the screen height), to accommodate smaller screens - pixels would cause a problem on
smaller screen. Passing 50 would start the animation at the middle of the screen.
Passing 0 would start at the very bottom of the screen. The default is 30.
   EX:
   $('.spotlight-content > *').scrollFade({
      visibleDistance: 20
   });

mediaQuery: the screen size above which this plugin will work. Passed as a number. The
default is 0; it will work on all screen sizes.
   EX:
   $('.spotlight-content > *').scrollFade({
      mediaQuery: 841
   });

*/

/*Put all of your scroll fade calls inside this $(window).load() function. Its important
that this plugin loads after everything else has loaded*/

$(window).load(function() {
   $('.featureBlock .featureBlock-figure').scrollFade({
      testParent: '.featureBlock',
      mediaQuery: 1024
   });

   $('.spotlight-content > *').scrollFade({
      testParent: '.spotlight-content'
   });
});


//Plugin Code - dont mess with this

(function($) {
   $.fn.scrollFade = function(opts) {
      var defaults = {
         duration: 0.5,
         useDelay: true,
         delayIncrement: 0.5,
         visibleDistance: 30,
         mediaQuery: 0
      };
      var options = $.extend({}, defaults, opts);

      var duration = options.duration;
      var useDelay = options.useDelay;
      var delayIncrement = options.delayIncrement;
      var visibleDistance = (options.visibleDistance / 100) * $(window).innerHeight();
      var mediaQuery = options.mediaQuery;

      if (window.matchMedia('(max-width:' + mediaQuery + 'px)').matches) {
         return;
      }

      var $items = $(this);
      var $previousParent;
      var delay = 0;

      if (!$items.length) {
         return;
      }

      if (typeof options.testParent === "undefined") {
         alert('The "testParent" parameter is required for the fadeScroll() plugin. ' +
            'It is missing from the plugin called on:\n\n' + $items.selector + '.');
         return;
      } else {
         var testParent = options.testParent;
      }

      var itemsOffsetTop = $items.closest(testParent).offset().top;

      if ($(window).scrollTop() + $(window).outerHeight() > itemsOffsetTop) {
         return;
      }

      $items.css('transition', 'none').css('opacity', 0.0);

      $items.css({
         transition: 'transform ' + duration + 's ease-out, opacity ' + duration + 's ease-out',
         transform: 'scale(1.07, 1.07) translate(0, 25px)'
      });

      $items.each(function() {
         var $item = $(this);
         var $itemParent = $item.closest(testParent);
         var itemParentOffsetTop = $itemParent.offset().top + visibleDistance;
         var animationPending = true;

         if (typeof $previousParent === "undefined") {
            $previousParent = $itemParent;
         }

         if ($previousParent.get(0) !== $itemParent.get(0)) {
            delay = 0;
         }

         $item.css({
            'transition-delay': delay + 's'
         });

         $(window).scroll(function() {
            if (animationPending) {
               if ($(window).scrollTop() + $(window).outerHeight() > itemParentOffsetTop) {
                  $item.css({
                     opacity: 1,
                     top: '0',
                     transform: 'scale(1, 1) translate(0, 0)'
                  });
                  setTimeout(function() {
                     $item.css('opacity', '')
                        .css('top', '')
                        .css('transform', '')
                        .css('transition', '');
                     animationPending = false;
                  }, (duration + delay) * 1000);
               }
            }
         });
         if (useDelay) {
            delay = delay + delayIncrement;
         }
         $previousParent = $itemParent;
      });
      return $items;
   };
}(jQuery));

/*****************************   NOTICE   *******************************
This is a function for developers. It has been added to frontEnd.js to
standardize the setup of search boxes, but it will never be used on a
 design site. You can ignore this file completely.
************************************************************************/

/*************************   Dev Example   ******************************
$(document).ready( function(){
    $('#searchMain').searchSetup({
     	url:"/searchPage?paramaterName="
    });
});
If no URL is passed to the function it will default to '/search?query='.
************************************************************************/

//Search Setup
(function($) {
  $.fn.searchSetup = function(options) {
    var opts = options;
    return this.each(function() {
      var defaults = {
        url: '/search?query='
      };
      var options = $.extend({}, defaults, opts);

      var $this = $(this);
      var url = options.url;
      var query;

      $this.on('keydown', function(event) {
        if (event.keyCode == 13) {
          event.preventDefault();
          query = $this.val();

          if (query != null && query != "") {
            document.location = url + escape(query);
          } else {
            alert('Please enter the search criteria.')
            return false;
          }
        }
      });
    });
  }
}(jQuery));

/*Small hack to fix secondary nav. As of now, the class "selected" gets added not only to direct parent LI of the current page link, but
also to the parent of that UL if it is a second or third level link. This adds the class of lastSelected to the actual current page LI*/
$(document).ready( function() {
	$(".navSecondary ul li.selected:last").addClass("lastSelected");
});
//secondary nav toggle
jQuery(document).ready(function($) {
	$('.navSecondary-breadcrumb li').first().prepend('<span class="navSecondaryToggle"></span>');
	$('.navSecondaryToggle').click(function() {
		$(this).toggleClass('is-active');
		$('.navSecondary').toggleClass('is-active');
	});
});

/*
     _ _      _       _
 ___| (_) ___| | __  (_)___
/ __| | |/ __| |/ /  | / __|
\__ \ | | (__|   < _ | \__ \
|___/_|_|\___|_|\_(_)/ |___/
                   |__/

 Version: 1.6.0
  Author: Ken Wheeler
 Website: http://kenwheeler.github.io
    Docs: http://kenwheeler.github.io/slick
    Repo: http://github.com/kenwheeler/slick
  Issues: http://github.com/kenwheeler/slick/issues

 */
! function(a) { "use strict"; "function" == typeof define && define.amd ? define(["jquery"], a) : "undefined" != typeof exports ? module.exports = a(require("jquery")) : a(jQuery) }(function(a) {
   "use strict";
   var b = window.Slick || {};
   b = function() {
      function c(c, d) {
         var f, e = this;
         e.defaults = { accessibility: !0, adaptiveHeight: !1, appendArrows: a(c), appendDots: a(c), arrows: !0, asNavFor: null, prevArrow: '<button type="button" data-role="none" class="slick-prev" aria-label="Previous" tabindex="0" role="button">Previous</button>', nextArrow: '<button type="button" data-role="none" class="slick-next" aria-label="Next" tabindex="0" role="button">Next</button>', autoplay: !1, autoplaySpeed: 3e3, centerMode: !1, centerPadding: "50px", cssEase: "ease", customPaging: function(b, c) {
               return a('<button type="button" data-role="none" role="button" tabindex="0" />').text(c + 1) }, dots: !1, dotsClass: "slick-dots", draggable: !0, easing: "linear", edgeFriction: .35, fade: !1, focusOnSelect: !1, infinite: !0, initialSlide: 0, lazyLoad: "ondemand", mobileFirst: !1, pauseOnHover: !0, pauseOnFocus: !0, pauseOnDotsHover: !1, respondTo: "window", responsive: null, rows: 1, rtl: !1, slide: "", slidesPerRow: 1, slidesToShow: 1, slidesToScroll: 1, speed: 500, swipe: !0, swipeToSlide: !1, touchMove: !0, touchThreshold: 5, useCSS: !0, useTransform: !0, variableWidth: !1, vertical: !1, verticalSwiping: !1, waitForAnimate: !0, zIndex: 1e3 }, e.initials = { animating: !1, dragging: !1, autoPlayTimer: null, currentDirection: 0, currentLeft: null, currentSlide: 0, direction: 1, $dots: null, listWidth: null, listHeight: null, loadIndex: 0, $nextArrow: null, $prevArrow: null, slideCount: null, slideWidth: null, $slideTrack: null, $slides: null, sliding: !1, slideOffset: 0, swipeLeft: null, $list: null, touchObject: {}, transformsEnabled: !1, unslicked: !1 }, a.extend(e, e.initials), e.activeBreakpoint = null, e.animType = null, e.animProp = null, e.breakpoints = [], e.breakpointSettings = [], e.cssTransitions = !1, e.focussed = !1, e.interrupted = !1, e.hidden = "hidden", e.paused = !0, e.positionProp = null, e.respondTo = null, e.rowCount = 1, e.shouldClick = !0, e.$slider = a(c), e.$slidesCache = null, e.transformType = null, e.transitionType = null, e.visibilityChange = "visibilitychange", e.windowWidth = 0, e.windowTimer = null, f = a(c).data("slick") || {}, e.options = a.extend({}, e.defaults, d, f), e.currentSlide = e.options.initialSlide, e.originalSettings = e.options, "undefined" != typeof document.mozHidden ? (e.hidden = "mozHidden", e.visibilityChange = "mozvisibilitychange") : "undefined" != typeof document.webkitHidden && (e.hidden = "webkitHidden", e.visibilityChange = "webkitvisibilitychange"), e.autoPlay = a.proxy(e.autoPlay, e), e.autoPlayClear = a.proxy(e.autoPlayClear, e), e.autoPlayIterator = a.proxy(e.autoPlayIterator, e), e.changeSlide = a.proxy(e.changeSlide, e), e.clickHandler = a.proxy(e.clickHandler, e), e.selectHandler = a.proxy(e.selectHandler, e), e.setPosition = a.proxy(e.setPosition, e), e.swipeHandler = a.proxy(e.swipeHandler, e), e.dragHandler = a.proxy(e.dragHandler, e), e.keyHandler = a.proxy(e.keyHandler, e), e.instanceUid = b++, e.htmlExpr = /^(?:\s*(<[\w\W]+>)[^>]*)$/, e.registerBreakpoints(), e.init(!0) }
      var b = 0;
      return c }(), b.prototype.activateADA = function() {
      var a = this;
      a.$slideTrack.find(".slick-active").attr({ "aria-hidden": "false" }).find("a, input, button, select").attr({ tabindex: "0" }) }, b.prototype.addSlide = b.prototype.slickAdd = function(b, c, d) {
      var e = this;
      if ("boolean" == typeof c) d = c, c = null;
      else if (0 > c || c >= e.slideCount) return !1;
      e.unload(), "number" == typeof c ? 0 === c && 0 === e.$slides.length ? a(b).appendTo(e.$slideTrack) : d ? a(b).insertBefore(e.$slides.eq(c)) : a(b).insertAfter(e.$slides.eq(c)) : d === !0 ? a(b).prependTo(e.$slideTrack) : a(b).appendTo(e.$slideTrack), e.$slides = e.$slideTrack.children(this.options.slide), e.$slideTrack.children(this.options.slide).detach(), e.$slideTrack.append(e.$slides), e.$slides.each(function(b, c) { a(c).attr("data-slick-index", b) }), e.$slidesCache = e.$slides, e.reinit() }, b.prototype.animateHeight = function() {
      var a = this;
      if (1 === a.options.slidesToShow && a.options.adaptiveHeight === !0 && a.options.vertical === !1) {
         var b = a.$slides.eq(a.currentSlide).outerHeight(!0);
         a.$list.animate({ height: b }, a.options.speed) } }, b.prototype.animateSlide = function(b, c) {
      var d = {},
         e = this;
      e.animateHeight(), e.options.rtl === !0 && e.options.vertical === !1 && (b = -b), e.transformsEnabled === !1 ? e.options.vertical === !1 ? e.$slideTrack.animate({ left: b }, e.options.speed, e.options.easing, c) : e.$slideTrack.animate({ top: b }, e.options.speed, e.options.easing, c) : e.cssTransitions === !1 ? (e.options.rtl === !0 && (e.currentLeft = -e.currentLeft), a({ animStart: e.currentLeft }).animate({ animStart: b }, { duration: e.options.speed, easing: e.options.easing, step: function(a) { a = Math.ceil(a), e.options.vertical === !1 ? (d[e.animType] = "translate(" + a + "px, 0px)", e.$slideTrack.css(d)) : (d[e.animType] = "translate(0px," + a + "px)", e.$slideTrack.css(d)) }, complete: function() { c && c.call() } })) : (e.applyTransition(), b = Math.ceil(b), e.options.vertical === !1 ? d[e.animType] = "translate3d(" + b + "px, 0px, 0px)" : d[e.animType] = "translate3d(0px," + b + "px, 0px)", e.$slideTrack.css(d), c && setTimeout(function() { e.disableTransition(), c.call() }, e.options.speed)) }, b.prototype.getNavTarget = function() {
      var b = this,
         c = b.options.asNavFor;
      return c && null !== c && (c = a(c).not(b.$slider)), c }, b.prototype.asNavFor = function(b) {
      var c = this,
         d = c.getNavTarget();
      null !== d && "object" == typeof d && d.each(function() {
         var c = a(this).slick("getSlick");
         c.unslicked || c.slideHandler(b, !0) }) }, b.prototype.applyTransition = function(a) {
      var b = this,
         c = {};
      b.options.fade === !1 ? c[b.transitionType] = b.transformType + " " + b.options.speed + "ms " + b.options.cssEase : c[b.transitionType] = "opacity " + b.options.speed + "ms " + b.options.cssEase, b.options.fade === !1 ? b.$slideTrack.css(c) : b.$slides.eq(a).css(c) }, b.prototype.autoPlay = function() {
      var a = this;
      a.autoPlayClear(), a.slideCount > a.options.slidesToShow && (a.autoPlayTimer = setInterval(a.autoPlayIterator, a.options.autoplaySpeed)) }, b.prototype.autoPlayClear = function() {
      var a = this;
      a.autoPlayTimer && clearInterval(a.autoPlayTimer) }, b.prototype.autoPlayIterator = function() {
      var a = this,
         b = a.currentSlide + a.options.slidesToScroll;
      a.paused || a.interrupted || a.focussed || (a.options.infinite === !1 && (1 === a.direction && a.currentSlide + 1 === a.slideCount - 1 ? a.direction = 0 : 0 === a.direction && (b = a.currentSlide - a.options.slidesToScroll, a.currentSlide - 1 === 0 && (a.direction = 1))), a.slideHandler(b)) }, b.prototype.buildArrows = function() {
      var b = this;
      b.options.arrows === !0 && (b.$prevArrow = a(b.options.prevArrow).addClass("slick-arrow"), b.$nextArrow = a(b.options.nextArrow).addClass("slick-arrow"), b.slideCount > b.options.slidesToShow ? (b.$prevArrow.removeClass("slick-hidden").removeAttr("aria-hidden tabindex"), b.$nextArrow.removeClass("slick-hidden").removeAttr("aria-hidden tabindex"), b.htmlExpr.test(b.options.prevArrow) && b.$prevArrow.prependTo(b.options.appendArrows), b.htmlExpr.test(b.options.nextArrow) && b.$nextArrow.appendTo(b.options.appendArrows), b.options.infinite !== !0 && b.$prevArrow.addClass("slick-disabled").attr("aria-disabled", "true")) : b.$prevArrow.add(b.$nextArrow).addClass("slick-hidden").attr({ "aria-disabled": "true", tabindex: "-1" })) }, b.prototype.buildDots = function() {
      var c, d, b = this;
      if (b.options.dots === !0 && b.slideCount > b.options.slidesToShow) {
         for (b.$slider.addClass("slick-dotted"), d = a("<ul />").addClass(b.options.dotsClass), c = 0; c <= b.getDotCount(); c += 1) d.append(a("<li />").append(b.options.customPaging.call(this, b, c)));
         b.$dots = d.appendTo(b.options.appendDots), b.$dots.find("li").first().addClass("slick-active").attr("aria-hidden", "false") } }, b.prototype.buildOut = function() {
      var b = this;
      b.$slides = b.$slider.children(b.options.slide + ":not(.slick-cloned)").addClass("slick-slide"), b.slideCount = b.$slides.length, b.$slides.each(function(b, c) { a(c).attr("data-slick-index", b).data("originalStyling", a(c).attr("style") || "") }), b.$slider.addClass("slick-slider"), b.$slideTrack = 0 === b.slideCount ? a('<div class="slick-track"/>').appendTo(b.$slider) : b.$slides.wrapAll('<div class="slick-track"/>').parent(), b.$list = b.$slideTrack.wrap('<div aria-live="polite" class="slick-list"/>').parent(), b.$slideTrack.css("opacity", 0), (b.options.centerMode === !0 || b.options.swipeToSlide === !0) && (b.options.slidesToScroll = 1), a("img[data-lazy]", b.$slider).not("[src]").addClass("slick-loading"), b.setupInfinite(), b.buildArrows(), b.buildDots(), b.updateDots(), b.setSlideClasses("number" == typeof b.currentSlide ? b.currentSlide : 0), b.options.draggable === !0 && b.$list.addClass("draggable") }, b.prototype.buildRows = function() {
      var b, c, d, e, f, g, h, a = this;
      if (e = document.createDocumentFragment(), g = a.$slider.children(), a.options.rows > 1) {
         for (h = a.options.slidesPerRow * a.options.rows, f = Math.ceil(g.length / h), b = 0; f > b; b++) {
            var i = document.createElement("div");
            for (c = 0; c < a.options.rows; c++) {
               var j = document.createElement("div");
               for (d = 0; d < a.options.slidesPerRow; d++) {
                  var k = b * h + (c * a.options.slidesPerRow + d);
                  g.get(k) && j.appendChild(g.get(k)) }
               i.appendChild(j) }
            e.appendChild(i) }
         a.$slider.empty().append(e), a.$slider.children().children().children().css({ width: 100 / a.options.slidesPerRow + "%", display: "inline-block" }) } }, b.prototype.checkResponsive = function(b, c) {
      var e, f, g, d = this,
         h = !1,
         i = d.$slider.width(),
         j = window.innerWidth || a(window).width();
      if ("window" === d.respondTo ? g = j : "slider" === d.respondTo ? g = i : "min" === d.respondTo && (g = Math.min(j, i)), d.options.responsive && d.options.responsive.length && null !== d.options.responsive) { f = null;
         for (e in d.breakpoints) d.breakpoints.hasOwnProperty(e) && (d.originalSettings.mobileFirst === !1 ? g < d.breakpoints[e] && (f = d.breakpoints[e]) : g > d.breakpoints[e] && (f = d.breakpoints[e]));
         null !== f ? null !== d.activeBreakpoint ? (f !== d.activeBreakpoint || c) && (d.activeBreakpoint = f, "unslick" === d.breakpointSettings[f] ? d.unslick(f) : (d.options = a.extend({}, d.originalSettings, d.breakpointSettings[f]), b === !0 && (d.currentSlide = d.options.initialSlide), d.refresh(b)), h = f) : (d.activeBreakpoint = f, "unslick" === d.breakpointSettings[f] ? d.unslick(f) : (d.options = a.extend({}, d.originalSettings, d.breakpointSettings[f]), b === !0 && (d.currentSlide = d.options.initialSlide), d.refresh(b)), h = f) : null !== d.activeBreakpoint && (d.activeBreakpoint = null, d.options = d.originalSettings, b === !0 && (d.currentSlide = d.options.initialSlide), d.refresh(b), h = f), b || h === !1 || d.$slider.trigger("breakpoint", [d, h]) } }, b.prototype.changeSlide = function(b, c) {
      var f, g, h, d = this,
         e = a(b.currentTarget);
      switch (e.is("a") && b.preventDefault(), e.is("li") || (e = e.closest("li")), h = d.slideCount % d.options.slidesToScroll !== 0, f = h ? 0 : (d.slideCount - d.currentSlide) % d.options.slidesToScroll, b.data.message) {
         case "previous":
            g = 0 === f ? d.options.slidesToScroll : d.options.slidesToShow - f, d.slideCount > d.options.slidesToShow && d.slideHandler(d.currentSlide - g, !1, c);
            break;
         case "next":
            g = 0 === f ? d.options.slidesToScroll : f, d.slideCount > d.options.slidesToShow && d.slideHandler(d.currentSlide + g, !1, c);
            break;
         case "index":
            var i = 0 === b.data.index ? 0 : b.data.index || e.index() * d.options.slidesToScroll;
            d.slideHandler(d.checkNavigable(i), !1, c), e.children().trigger("focus");
            break;
         default:
            return } }, b.prototype.checkNavigable = function(a) {
      var c, d, b = this;
      if (c = b.getNavigableIndexes(), d = 0, a > c[c.length - 1]) a = c[c.length - 1];
      else
         for (var e in c) {
            if (a < c[e]) { a = d;
               break }
            d = c[e] }
      return a }, b.prototype.cleanUpEvents = function() {
      var b = this;
      b.options.dots && null !== b.$dots && a("li", b.$dots).off("click.slick", b.changeSlide).off("mouseenter.slick", a.proxy(b.interrupt, b, !0)).off("mouseleave.slick", a.proxy(b.interrupt, b, !1)), b.$slider.off("focus.slick blur.slick"), b.options.arrows === !0 && b.slideCount > b.options.slidesToShow && (b.$prevArrow && b.$prevArrow.off("click.slick", b.changeSlide), b.$nextArrow && b.$nextArrow.off("click.slick", b.changeSlide)), b.$list.off("touchstart.slick mousedown.slick", b.swipeHandler), b.$list.off("touchmove.slick mousemove.slick", b.swipeHandler), b.$list.off("touchend.slick mouseup.slick", b.swipeHandler), b.$list.off("touchcancel.slick mouseleave.slick", b.swipeHandler), b.$list.off("click.slick", b.clickHandler), a(document).off(b.visibilityChange, b.visibility), b.cleanUpSlideEvents(), b.options.accessibility === !0 && b.$list.off("keydown.slick", b.keyHandler), b.options.focusOnSelect === !0 && a(b.$slideTrack).children().off("click.slick", b.selectHandler), a(window).off("orientationchange.slick.slick-" + b.instanceUid, b.orientationChange), a(window).off("resize.slick.slick-" + b.instanceUid, b.resize), a("[draggable!=true]", b.$slideTrack).off("dragstart", b.preventDefault), a(window).off("load.slick.slick-" + b.instanceUid, b.setPosition), a(document).off("ready.slick.slick-" + b.instanceUid, b.setPosition) }, b.prototype.cleanUpSlideEvents = function() {
      var b = this;
      b.$list.off("mouseenter.slick", a.proxy(b.interrupt, b, !0)), b.$list.off("mouseleave.slick", a.proxy(b.interrupt, b, !1)) }, b.prototype.cleanUpRows = function() {
      var b, a = this;
      a.options.rows > 1 && (b = a.$slides.children().children(), b.removeAttr("style"), a.$slider.empty().append(b)) }, b.prototype.clickHandler = function(a) {
      var b = this;
      b.shouldClick === !1 && (a.stopImmediatePropagation(), a.stopPropagation(), a.preventDefault()) }, b.prototype.destroy = function(b) {
      var c = this;
      c.autoPlayClear(), c.touchObject = {}, c.cleanUpEvents(), a(".slick-cloned", c.$slider).detach(), c.$dots && c.$dots.remove(), c.$prevArrow && c.$prevArrow.length && (c.$prevArrow.removeClass("slick-disabled slick-arrow slick-hidden").removeAttr("aria-hidden aria-disabled tabindex").css("display", ""), c.htmlExpr.test(c.options.prevArrow) && c.$prevArrow.remove()), c.$nextArrow && c.$nextArrow.length && (c.$nextArrow.removeClass("slick-disabled slick-arrow slick-hidden").removeAttr("aria-hidden aria-disabled tabindex").css("display", ""), c.htmlExpr.test(c.options.nextArrow) && c.$nextArrow.remove()), c.$slides && (c.$slides.removeClass("slick-slide slick-active slick-center slick-visible slick-current").removeAttr("aria-hidden").removeAttr("data-slick-index").each(function() { a(this).attr("style", a(this).data("originalStyling")) }), c.$slideTrack.children(this.options.slide).detach(), c.$slideTrack.detach(), c.$list.detach(), c.$slider.append(c.$slides)), c.cleanUpRows(), c.$slider.removeClass("slick-slider"), c.$slider.removeClass("slick-initialized"), c.$slider.removeClass("slick-dotted"), c.unslicked = !0, b || c.$slider.trigger("destroy", [c]) }, b.prototype.disableTransition = function(a) {
      var b = this,
         c = {};
      c[b.transitionType] = "", b.options.fade === !1 ? b.$slideTrack.css(c) : b.$slides.eq(a).css(c) }, b.prototype.fadeSlide = function(a, b) {
      var c = this;
      c.cssTransitions === !1 ? (c.$slides.eq(a).css({ zIndex: c.options.zIndex }), c.$slides.eq(a).animate({ opacity: 1 }, c.options.speed, c.options.easing, b)) : (c.applyTransition(a), c.$slides.eq(a).css({ opacity: 1, zIndex: c.options.zIndex }), b && setTimeout(function() { c.disableTransition(a), b.call() }, c.options.speed)) }, b.prototype.fadeSlideOut = function(a) {
      var b = this;
      b.cssTransitions === !1 ? b.$slides.eq(a).animate({ opacity: 0, zIndex: b.options.zIndex - 2 }, b.options.speed, b.options.easing) : (b.applyTransition(a), b.$slides.eq(a).css({ opacity: 0, zIndex: b.options.zIndex - 2 })) }, b.prototype.filterSlides = b.prototype.slickFilter = function(a) {
      var b = this;
      null !== a && (b.$slidesCache = b.$slides, b.unload(), b.$slideTrack.children(this.options.slide).detach(), b.$slidesCache.filter(a).appendTo(b.$slideTrack), b.reinit()) }, b.prototype.focusHandler = function() {
      var b = this;
      b.$slider.off("focus.slick blur.slick").on("focus.slick blur.slick", "*:not(.slick-arrow)", function(c) { c.stopImmediatePropagation();
         var d = a(this);
         setTimeout(function() { b.options.pauseOnFocus && (b.focussed = d.is(":focus"), b.autoPlay()) }, 0) }) }, b.prototype.getCurrent = b.prototype.slickCurrentSlide = function() {
      var a = this;
      return a.currentSlide }, b.prototype.getDotCount = function() {
      var a = this,
         b = 0,
         c = 0,
         d = 0;
      if (a.options.infinite === !0)
         for (; b < a.slideCount;) ++d, b = c + a.options.slidesToScroll, c += a.options.slidesToScroll <= a.options.slidesToShow ? a.options.slidesToScroll : a.options.slidesToShow;
      else if (a.options.centerMode === !0) d = a.slideCount;
      else if (a.options.asNavFor)
         for (; b < a.slideCount;) ++d, b = c + a.options.slidesToScroll, c += a.options.slidesToScroll <= a.options.slidesToShow ? a.options.slidesToScroll : a.options.slidesToShow;
      else d = 1 + Math.ceil((a.slideCount - a.options.slidesToShow) / a.options.slidesToScroll);
      return d - 1 }, b.prototype.getLeft = function(a) {
      var c, d, f, b = this,
         e = 0;
      return b.slideOffset = 0, d = b.$slides.first().outerHeight(!0), b.options.infinite === !0 ? (b.slideCount > b.options.slidesToShow && (b.slideOffset = b.slideWidth * b.options.slidesToShow * -1, e = d * b.options.slidesToShow * -1), b.slideCount % b.options.slidesToScroll !== 0 && a + b.options.slidesToScroll > b.slideCount && b.slideCount > b.options.slidesToShow && (a > b.slideCount ? (b.slideOffset = (b.options.slidesToShow - (a - b.slideCount)) * b.slideWidth * -1, e = (b.options.slidesToShow - (a - b.slideCount)) * d * -1) : (b.slideOffset = b.slideCount % b.options.slidesToScroll * b.slideWidth * -1, e = b.slideCount % b.options.slidesToScroll * d * -1))) : a + b.options.slidesToShow > b.slideCount && (b.slideOffset = (a + b.options.slidesToShow - b.slideCount) * b.slideWidth, e = (a + b.options.slidesToShow - b.slideCount) * d), b.slideCount <= b.options.slidesToShow && (b.slideOffset = 0, e = 0), b.options.centerMode === !0 && b.options.infinite === !0 ? b.slideOffset += b.slideWidth * Math.floor(b.options.slidesToShow / 2) - b.slideWidth : b.options.centerMode === !0 && (b.slideOffset = 0, b.slideOffset += b.slideWidth * Math.floor(b.options.slidesToShow / 2)), c = b.options.vertical === !1 ? a * b.slideWidth * -1 + b.slideOffset : a * d * -1 + e, b.options.variableWidth === !0 && (f = b.slideCount <= b.options.slidesToShow || b.options.infinite === !1 ? b.$slideTrack.children(".slick-slide").eq(a) : b.$slideTrack.children(".slick-slide").eq(a + b.options.slidesToShow), c = b.options.rtl === !0 ? f[0] ? -1 * (b.$slideTrack.width() - f[0].offsetLeft - f.width()) : 0 : f[0] ? -1 * f[0].offsetLeft : 0, b.options.centerMode === !0 && (f = b.slideCount <= b.options.slidesToShow || b.options.infinite === !1 ? b.$slideTrack.children(".slick-slide").eq(a) : b.$slideTrack.children(".slick-slide").eq(a + b.options.slidesToShow + 1), c = b.options.rtl === !0 ? f[0] ? -1 * (b.$slideTrack.width() - f[0].offsetLeft - f.width()) : 0 : f[0] ? -1 * f[0].offsetLeft : 0, c += (b.$list.width() - f.outerWidth()) / 2)), c }, b.prototype.getOption = b.prototype.slickGetOption = function(a) {
      var b = this;
      return b.options[a] }, b.prototype.getNavigableIndexes = function() {
      var e, a = this,
         b = 0,
         c = 0,
         d = [];
      for (a.options.infinite === !1 ? e = a.slideCount : (b = -1 * a.options.slidesToScroll, c = -1 * a.options.slidesToScroll, e = 2 * a.slideCount); e > b;) d.push(b), b = c + a.options.slidesToScroll, c += a.options.slidesToScroll <= a.options.slidesToShow ? a.options.slidesToScroll : a.options.slidesToShow;
      return d }, b.prototype.getSlick = function() {
      return this }, b.prototype.getSlideCount = function() {
      var c, d, e, b = this;
      return e = b.options.centerMode === !0 ? b.slideWidth * Math.floor(b.options.slidesToShow / 2) : 0, b.options.swipeToSlide === !0 ? (b.$slideTrack.find(".slick-slide").each(function(c, f) {
         return f.offsetLeft - e + a(f).outerWidth() / 2 > -1 * b.swipeLeft ? (d = f, !1) : void 0 }), c = Math.abs(a(d).attr("data-slick-index") - b.currentSlide) || 1) : b.options.slidesToScroll }, b.prototype.goTo = b.prototype.slickGoTo = function(a, b) {
      var c = this;
      c.changeSlide({ data: { message: "index", index: parseInt(a) } }, b) }, b.prototype.init = function(b) {
      var c = this;
      a(c.$slider).hasClass("slick-initialized") || (a(c.$slider).addClass("slick-initialized"), c.buildRows(), c.buildOut(), c.setProps(), c.startLoad(), c.loadSlider(), c.initializeEvents(), c.updateArrows(), c.updateDots(), c.checkResponsive(!0), c.focusHandler()), b && c.$slider.trigger("init", [c]), c.options.accessibility === !0 && c.initADA(), c.options.autoplay && (c.paused = !1, c.autoPlay()) }, b.prototype.initADA = function() {
      var b = this;
      b.$slides.add(b.$slideTrack.find(".slick-cloned")).attr({ "aria-hidden": "true", tabindex: "-1" }).find("a, input, button, select").attr({ tabindex: "-1" }), b.$slideTrack.attr("role", "listbox"), b.$slides.not(b.$slideTrack.find(".slick-cloned")).each(function(c) { a(this).attr({ role: "option", "aria-describedby": "slick-slide" + b.instanceUid + c }) }), null !== b.$dots && b.$dots.attr("role", "tablist").find("li").each(function(c) { a(this).attr({ role: "presentation", "aria-selected": "false", "aria-controls": "navigation" + b.instanceUid + c, id: "slick-slide" + b.instanceUid + c }) }).first().attr("aria-selected", "true").end().find("button").attr("role", "button").end().closest("div").attr("role", "toolbar"), b.activateADA() }, b.prototype.initArrowEvents = function() {
      var a = this;
      a.options.arrows === !0 && a.slideCount > a.options.slidesToShow && (a.$prevArrow.off("click.slick").on("click.slick", { message: "previous" }, a.changeSlide), a.$nextArrow.off("click.slick").on("click.slick", { message: "next" }, a.changeSlide)) }, b.prototype.initDotEvents = function() {
      var b = this;
      b.options.dots === !0 && b.slideCount > b.options.slidesToShow && a("li", b.$dots).on("click.slick", { message: "index" }, b.changeSlide), b.options.dots === !0 && b.options.pauseOnDotsHover === !0 && a("li", b.$dots).on("mouseenter.slick", a.proxy(b.interrupt, b, !0)).on("mouseleave.slick", a.proxy(b.interrupt, b, !1)) }, b.prototype.initSlideEvents = function() {
      var b = this;
      b.options.pauseOnHover && (b.$list.on("mouseenter.slick", a.proxy(b.interrupt, b, !0)), b.$list.on("mouseleave.slick", a.proxy(b.interrupt, b, !1))) }, b.prototype.initializeEvents = function() {
      var b = this;
      b.initArrowEvents(), b.initDotEvents(), b.initSlideEvents(), b.$list.on("touchstart.slick mousedown.slick", { action: "start" }, b.swipeHandler), b.$list.on("touchmove.slick mousemove.slick", { action: "move" }, b.swipeHandler), b.$list.on("touchend.slick mouseup.slick", { action: "end" }, b.swipeHandler), b.$list.on("touchcancel.slick mouseleave.slick", { action: "end" }, b.swipeHandler), b.$list.on("click.slick", b.clickHandler), a(document).on(b.visibilityChange, a.proxy(b.visibility, b)), b.options.accessibility === !0 && b.$list.on("keydown.slick", b.keyHandler), b.options.focusOnSelect === !0 && a(b.$slideTrack).children().on("click.slick", b.selectHandler), a(window).on("orientationchange.slick.slick-" + b.instanceUid, a.proxy(b.orientationChange, b)), a(window).on("resize.slick.slick-" + b.instanceUid, a.proxy(b.resize, b)), a("[draggable!=true]", b.$slideTrack).on("dragstart", b.preventDefault), a(window).on("load.slick.slick-" + b.instanceUid, b.setPosition), a(document).on("ready.slick.slick-" + b.instanceUid, b.setPosition) }, b.prototype.initUI = function() {
      var a = this;
      a.options.arrows === !0 && a.slideCount > a.options.slidesToShow && (a.$prevArrow.show(), a.$nextArrow.show()), a.options.dots === !0 && a.slideCount > a.options.slidesToShow && a.$dots.show() }, b.prototype.keyHandler = function(a) {
      var b = this;
      a.target.tagName.match("TEXTAREA|INPUT|SELECT") || (37 === a.keyCode && b.options.accessibility === !0 ? b.changeSlide({ data: { message: b.options.rtl === !0 ? "next" : "previous" } }) : 39 === a.keyCode && b.options.accessibility === !0 && b.changeSlide({ data: { message: b.options.rtl === !0 ? "previous" : "next" } })) }, b.prototype.lazyLoad = function() {
      function g(c) { a("img[data-lazy]", c).each(function() {
            var c = a(this),
               d = a(this).attr("data-lazy"),
               e = document.createElement("img");
            e.onload = function() { c.animate({ opacity: 0 }, 100, function() { c.attr("src", d).animate({ opacity: 1 }, 200, function() { c.removeAttr("data-lazy").removeClass("slick-loading") }), b.$slider.trigger("lazyLoaded", [b, c, d]) }) }, e.onerror = function() { c.removeAttr("data-lazy").removeClass("slick-loading").addClass("slick-lazyload-error"), b.$slider.trigger("lazyLoadError", [b, c, d]) }, e.src = d }) }
      var c, d, e, f, b = this;
      b.options.centerMode === !0 ? b.options.infinite === !0 ? (e = b.currentSlide + (b.options.slidesToShow / 2 + 1), f = e + b.options.slidesToShow + 2) : (e = Math.max(0, b.currentSlide - (b.options.slidesToShow / 2 + 1)), f = 2 + (b.options.slidesToShow / 2 + 1) + b.currentSlide) : (e = b.options.infinite ? b.options.slidesToShow + b.currentSlide : b.currentSlide, f = Math.ceil(e + b.options.slidesToShow), b.options.fade === !0 && (e > 0 && e--, f <= b.slideCount && f++)), c = b.$slider.find(".slick-slide").slice(e, f), g(c), b.slideCount <= b.options.slidesToShow ? (d = b.$slider.find(".slick-slide"), g(d)) : b.currentSlide >= b.slideCount - b.options.slidesToShow ? (d = b.$slider.find(".slick-cloned").slice(0, b.options.slidesToShow), g(d)) : 0 === b.currentSlide && (d = b.$slider.find(".slick-cloned").slice(-1 * b.options.slidesToShow), g(d)) }, b.prototype.loadSlider = function() {
      var a = this;
      a.setPosition(), a.$slideTrack.css({ opacity: 1 }), a.$slider.removeClass("slick-loading"), a.initUI(), "progressive" === a.options.lazyLoad && a.progressiveLazyLoad() }, b.prototype.next = b.prototype.slickNext = function() {
      var a = this;
      a.changeSlide({ data: { message: "next" } }) }, b.prototype.orientationChange = function() {
      var a = this;
      a.checkResponsive(), a.setPosition() }, b.prototype.pause = b.prototype.slickPause = function() {
      var a = this;
      a.autoPlayClear(), a.paused = !0 }, b.prototype.play = b.prototype.slickPlay = function() {
      var a = this;
      a.autoPlay(), a.options.autoplay = !0, a.paused = !1, a.focussed = !1, a.interrupted = !1 }, b.prototype.postSlide = function(a) {
      var b = this;
      b.unslicked || (b.$slider.trigger("afterChange", [b, a]), b.animating = !1, b.setPosition(), b.swipeLeft = null, b.options.autoplay && b.autoPlay(), b.options.accessibility === !0 && b.initADA()) }, b.prototype.prev = b.prototype.slickPrev = function() {
      var a = this;
      a.changeSlide({ data: { message: "previous" } }) }, b.prototype.preventDefault = function(a) { a.preventDefault() }, b.prototype.progressiveLazyLoad = function(b) { b = b || 1;
      var e, f, g, c = this,
         d = a("img[data-lazy]", c.$slider);
      d.length ? (e = d.first(), f = e.attr("data-lazy"), g = document.createElement("img"), g.onload = function() { e.attr("src", f).removeAttr("data-lazy").removeClass("slick-loading"), c.options.adaptiveHeight === !0 && c.setPosition(), c.$slider.trigger("lazyLoaded", [c, e, f]), c.progressiveLazyLoad() }, g.onerror = function() { 3 > b ? setTimeout(function() { c.progressiveLazyLoad(b + 1) }, 500) : (e.removeAttr("data-lazy").removeClass("slick-loading").addClass("slick-lazyload-error"), c.$slider.trigger("lazyLoadError", [c, e, f]), c.progressiveLazyLoad()) }, g.src = f) : c.$slider.trigger("allImagesLoaded", [c]) }, b.prototype.refresh = function(b) {
      var d, e, c = this;
      e = c.slideCount - c.options.slidesToShow, !c.options.infinite && c.currentSlide > e && (c.currentSlide = e), c.slideCount <= c.options.slidesToShow && (c.currentSlide = 0), d = c.currentSlide, c.destroy(!0), a.extend(c, c.initials, { currentSlide: d }), c.init(), b || c.changeSlide({ data: { message: "index", index: d } }, !1) }, b.prototype.registerBreakpoints = function() {
      var c, d, e, b = this,
         f = b.options.responsive || null;
      if ("array" === a.type(f) && f.length) { b.respondTo = b.options.respondTo || "window";
         for (c in f)
            if (e = b.breakpoints.length - 1, d = f[c].breakpoint, f.hasOwnProperty(c)) {
               for (; e >= 0;) b.breakpoints[e] && b.breakpoints[e] === d && b.breakpoints.splice(e, 1), e--;
               b.breakpoints.push(d), b.breakpointSettings[d] = f[c].settings }
         b.breakpoints.sort(function(a, c) {
            return b.options.mobileFirst ? a - c : c - a }) } }, b.prototype.reinit = function() {
      var b = this;
      b.$slides = b.$slideTrack.children(b.options.slide).addClass("slick-slide"), b.slideCount = b.$slides.length, b.currentSlide >= b.slideCount && 0 !== b.currentSlide && (b.currentSlide = b.currentSlide - b.options.slidesToScroll), b.slideCount <= b.options.slidesToShow && (b.currentSlide = 0), b.registerBreakpoints(), b.setProps(), b.setupInfinite(), b.buildArrows(), b.updateArrows(), b.initArrowEvents(), b.buildDots(), b.updateDots(), b.initDotEvents(), b.cleanUpSlideEvents(), b.initSlideEvents(), b.checkResponsive(!1, !0), b.options.focusOnSelect === !0 && a(b.$slideTrack).children().on("click.slick", b.selectHandler), b.setSlideClasses("number" == typeof b.currentSlide ? b.currentSlide : 0), b.setPosition(), b.focusHandler(), b.paused = !b.options.autoplay, b.autoPlay(), b.$slider.trigger("reInit", [b]) }, b.prototype.resize = function() {
      var b = this;
      a(window).width() !== b.windowWidth && (clearTimeout(b.windowDelay), b.windowDelay = window.setTimeout(function() { b.windowWidth = a(window).width(), b.checkResponsive(), b.unslicked || b.setPosition() }, 50)) }, b.prototype.removeSlide = b.prototype.slickRemove = function(a, b, c) {
      var d = this;
      return "boolean" == typeof a ? (b = a, a = b === !0 ? 0 : d.slideCount - 1) : a = b === !0 ? --a : a, d.slideCount < 1 || 0 > a || a > d.slideCount - 1 ? !1 : (d.unload(), c === !0 ? d.$slideTrack.children().remove() : d.$slideTrack.children(this.options.slide).eq(a).remove(), d.$slides = d.$slideTrack.children(this.options.slide), d.$slideTrack.children(this.options.slide).detach(), d.$slideTrack.append(d.$slides), d.$slidesCache = d.$slides, void d.reinit()) }, b.prototype.setCSS = function(a) {
      var d, e, b = this,
         c = {};
      b.options.rtl === !0 && (a = -a), d = "left" == b.positionProp ? Math.ceil(a) + "px" : "0px", e = "top" == b.positionProp ? Math.ceil(a) + "px" : "0px", c[b.positionProp] = a, b.transformsEnabled === !1 ? b.$slideTrack.css(c) : (c = {}, b.cssTransitions === !1 ? (c[b.animType] = "translate(" + d + ", " + e + ")", b.$slideTrack.css(c)) : (c[b.animType] = "translate3d(" + d + ", " + e + ", 0px)", b.$slideTrack.css(c))) }, b.prototype.setDimensions = function() {
      var a = this;
      a.options.vertical === !1 ? a.options.centerMode === !0 && a.$list.css({ padding: "0px " + a.options.centerPadding }) : (a.$list.height(a.$slides.first().outerHeight(!0) * a.options.slidesToShow), a.options.centerMode === !0 && a.$list.css({ padding: a.options.centerPadding + " 0px" })), a.listWidth = a.$list.width(), a.listHeight = a.$list.height(), a.options.vertical === !1 && a.options.variableWidth === !1 ? (a.slideWidth = Math.ceil(a.listWidth / a.options.slidesToShow), a.$slideTrack.width(Math.ceil(a.slideWidth * a.$slideTrack.children(".slick-slide").length))) : a.options.variableWidth === !0 ? a.$slideTrack.width(5e3 * a.slideCount) : (a.slideWidth = Math.ceil(a.listWidth), a.$slideTrack.height(Math.ceil(a.$slides.first().outerHeight(!0) * a.$slideTrack.children(".slick-slide").length)));
      var b = a.$slides.first().outerWidth(!0) - a.$slides.first().width();
      a.options.variableWidth === !1 && a.$slideTrack.children(".slick-slide").width(a.slideWidth - b) }, b.prototype.setFade = function() {
      var c, b = this;
      b.$slides.each(function(d, e) { c = b.slideWidth * d * -1, b.options.rtl === !0 ? a(e).css({ position: "relative", right: c, top: 0, zIndex: b.options.zIndex - 2, opacity: 0 }) : a(e).css({ position: "relative", left: c, top: 0, zIndex: b.options.zIndex - 2, opacity: 0 }) }), b.$slides.eq(b.currentSlide).css({ zIndex: b.options.zIndex - 1, opacity: 1 }) }, b.prototype.setHeight = function() {
      var a = this;
      if (1 === a.options.slidesToShow && a.options.adaptiveHeight === !0 && a.options.vertical === !1) {
         var b = a.$slides.eq(a.currentSlide).outerHeight(!0);
         a.$list.css("height", b) } }, b.prototype.setOption = b.prototype.slickSetOption = function() {
      var c, d, e, f, h, b = this,
         g = !1;
      if ("object" === a.type(arguments[0]) ? (e = arguments[0], g = arguments[1], h = "multiple") : "string" === a.type(arguments[0]) && (e = arguments[0], f = arguments[1], g = arguments[2], "responsive" === arguments[0] && "array" === a.type(arguments[1]) ? h = "responsive" : "undefined" != typeof arguments[1] && (h = "single")), "single" === h) b.options[e] = f;
      else if ("multiple" === h) a.each(e, function(a, c) { b.options[a] = c });
      else if ("responsive" === h)
         for (d in f)
            if ("array" !== a.type(b.options.responsive)) b.options.responsive = [f[d]];
            else {
               for (c = b.options.responsive.length - 1; c >= 0;) b.options.responsive[c].breakpoint === f[d].breakpoint && b.options.responsive.splice(c, 1), c--;
               b.options.responsive.push(f[d]) }
      g && (b.unload(), b.reinit()) }, b.prototype.setPosition = function() {
      var a = this;
      a.setDimensions(), a.setHeight(), a.options.fade === !1 ? a.setCSS(a.getLeft(a.currentSlide)) : a.setFade(), a.$slider.trigger("setPosition", [a]) }, b.prototype.setProps = function() {
      var a = this,
         b = document.body.style;
      a.positionProp = a.options.vertical === !0 ? "top" : "left", "top" === a.positionProp ? a.$slider.addClass("slick-vertical") : a.$slider.removeClass("slick-vertical"), (void 0 !== b.WebkitTransition || void 0 !== b.MozTransition || void 0 !== b.msTransition) && a.options.useCSS === !0 && (a.cssTransitions = !0), a.options.fade && ("number" == typeof a.options.zIndex ? a.options.zIndex < 3 && (a.options.zIndex = 3) : a.options.zIndex = a.defaults.zIndex), void 0 !== b.OTransform && (a.animType = "OTransform", a.transformType = "-o-transform", a.transitionType = "OTransition", void 0 === b.perspectiveProperty && void 0 === b.webkitPerspective && (a.animType = !1)), void 0 !== b.MozTransform && (a.animType = "MozTransform", a.transformType = "-moz-transform", a.transitionType = "MozTransition", void 0 === b.perspectiveProperty && void 0 === b.MozPerspective && (a.animType = !1)), void 0 !== b.webkitTransform && (a.animType = "webkitTransform", a.transformType = "-webkit-transform", a.transitionType = "webkitTransition", void 0 === b.perspectiveProperty && void 0 === b.webkitPerspective && (a.animType = !1)), void 0 !== b.msTransform && (a.animType = "msTransform", a.transformType = "-ms-transform", a.transitionType = "msTransition", void 0 === b.msTransform && (a.animType = !1)), void 0 !== b.transform && a.animType !== !1 && (a.animType = "transform", a.transformType = "transform", a.transitionType = "transition"), a.transformsEnabled = a.options.useTransform && null !== a.animType && a.animType !== !1 }, b.prototype.setSlideClasses = function(a) {
      var c, d, e, f, b = this;
      d = b.$slider.find(".slick-slide").removeClass("slick-active slick-center slick-current").attr("aria-hidden", "true"), b.$slides.eq(a).addClass("slick-current"), b.options.centerMode === !0 ? (c = Math.floor(b.options.slidesToShow / 2), b.options.infinite === !0 && (a >= c && a <= b.slideCount - 1 - c ? b.$slides.slice(a - c, a + c + 1).addClass("slick-active").attr("aria-hidden", "false") : (e = b.options.slidesToShow + a,
         d.slice(e - c + 1, e + c + 2).addClass("slick-active").attr("aria-hidden", "false")), 0 === a ? d.eq(d.length - 1 - b.options.slidesToShow).addClass("slick-center") : a === b.slideCount - 1 && d.eq(b.options.slidesToShow).addClass("slick-center")), b.$slides.eq(a).addClass("slick-center")) : a >= 0 && a <= b.slideCount - b.options.slidesToShow ? b.$slides.slice(a, a + b.options.slidesToShow).addClass("slick-active").attr("aria-hidden", "false") : d.length <= b.options.slidesToShow ? d.addClass("slick-active").attr("aria-hidden", "false") : (f = b.slideCount % b.options.slidesToShow, e = b.options.infinite === !0 ? b.options.slidesToShow + a : a, b.options.slidesToShow == b.options.slidesToScroll && b.slideCount - a < b.options.slidesToShow ? d.slice(e - (b.options.slidesToShow - f), e + f).addClass("slick-active").attr("aria-hidden", "false") : d.slice(e, e + b.options.slidesToShow).addClass("slick-active").attr("aria-hidden", "false")), "ondemand" === b.options.lazyLoad && b.lazyLoad()
   }, b.prototype.setupInfinite = function() {
      var c, d, e, b = this;
      if (b.options.fade === !0 && (b.options.centerMode = !1), b.options.infinite === !0 && b.options.fade === !1 && (d = null, b.slideCount > b.options.slidesToShow)) {
         for (e = b.options.centerMode === !0 ? b.options.slidesToShow + 1 : b.options.slidesToShow, c = b.slideCount; c > b.slideCount - e; c -= 1) d = c - 1, a(b.$slides[d]).clone(!0).attr("id", "").attr("data-slick-index", d - b.slideCount).prependTo(b.$slideTrack).addClass("slick-cloned");
         for (c = 0; e > c; c += 1) d = c, a(b.$slides[d]).clone(!0).attr("id", "").attr("data-slick-index", d + b.slideCount).appendTo(b.$slideTrack).addClass("slick-cloned");
         b.$slideTrack.find(".slick-cloned").find("[id]").each(function() { a(this).attr("id", "") }) } }, b.prototype.interrupt = function(a) {
      var b = this;
      a || b.autoPlay(), b.interrupted = a }, b.prototype.selectHandler = function(b) {
      var c = this,
         d = a(b.target).is(".slick-slide") ? a(b.target) : a(b.target).parents(".slick-slide"),
         e = parseInt(d.attr("data-slick-index"));
      return e || (e = 0), c.slideCount <= c.options.slidesToShow ? (c.setSlideClasses(e), void c.asNavFor(e)) : void c.slideHandler(e) }, b.prototype.slideHandler = function(a, b, c) {
      var d, e, f, g, j, h = null,
         i = this;
      return b = b || !1, i.animating === !0 && i.options.waitForAnimate === !0 || i.options.fade === !0 && i.currentSlide === a || i.slideCount <= i.options.slidesToShow ? void 0 : (b === !1 && i.asNavFor(a), d = a, h = i.getLeft(d), g = i.getLeft(i.currentSlide), i.currentLeft = null === i.swipeLeft ? g : i.swipeLeft, i.options.infinite === !1 && i.options.centerMode === !1 && (0 > a || a > i.getDotCount() * i.options.slidesToScroll) ? void(i.options.fade === !1 && (d = i.currentSlide, c !== !0 ? i.animateSlide(g, function() { i.postSlide(d) }) : i.postSlide(d))) : i.options.infinite === !1 && i.options.centerMode === !0 && (0 > a || a > i.slideCount - i.options.slidesToScroll) ? void(i.options.fade === !1 && (d = i.currentSlide, c !== !0 ? i.animateSlide(g, function() { i.postSlide(d) }) : i.postSlide(d))) : (i.options.autoplay && clearInterval(i.autoPlayTimer), e = 0 > d ? i.slideCount % i.options.slidesToScroll !== 0 ? i.slideCount - i.slideCount % i.options.slidesToScroll : i.slideCount + d : d >= i.slideCount ? i.slideCount % i.options.slidesToScroll !== 0 ? 0 : d - i.slideCount : d, i.animating = !0, i.$slider.trigger("beforeChange", [i, i.currentSlide, e]), f = i.currentSlide, i.currentSlide = e, i.setSlideClasses(i.currentSlide), i.options.asNavFor && (j = i.getNavTarget(), j = j.slick("getSlick"), j.slideCount <= j.options.slidesToShow && j.setSlideClasses(i.currentSlide)), i.updateDots(), i.updateArrows(), i.options.fade === !0 ? (c !== !0 ? (i.fadeSlideOut(f), i.fadeSlide(e, function() { i.postSlide(e) })) : i.postSlide(e), void i.animateHeight()) : void(c !== !0 ? i.animateSlide(h, function() { i.postSlide(e) }) : i.postSlide(e)))) }, b.prototype.startLoad = function() {
      var a = this;
      a.options.arrows === !0 && a.slideCount > a.options.slidesToShow && (a.$prevArrow.hide(), a.$nextArrow.hide()), a.options.dots === !0 && a.slideCount > a.options.slidesToShow && a.$dots.hide(), a.$slider.addClass("slick-loading") }, b.prototype.swipeDirection = function() {
      var a, b, c, d, e = this;
      return a = e.touchObject.startX - e.touchObject.curX, b = e.touchObject.startY - e.touchObject.curY, c = Math.atan2(b, a), d = Math.round(180 * c / Math.PI), 0 > d && (d = 360 - Math.abs(d)), 45 >= d && d >= 0 ? e.options.rtl === !1 ? "left" : "right" : 360 >= d && d >= 315 ? e.options.rtl === !1 ? "left" : "right" : d >= 135 && 225 >= d ? e.options.rtl === !1 ? "right" : "left" : e.options.verticalSwiping === !0 ? d >= 35 && 135 >= d ? "down" : "up" : "vertical" }, b.prototype.swipeEnd = function(a) {
      var c, d, b = this;
      if (b.dragging = !1, b.interrupted = !1, b.shouldClick = b.touchObject.swipeLength > 10 ? !1 : !0, void 0 === b.touchObject.curX) return !1;
      if (b.touchObject.edgeHit === !0 && b.$slider.trigger("edge", [b, b.swipeDirection()]), b.touchObject.swipeLength >= b.touchObject.minSwipe) {
         switch (d = b.swipeDirection()) {
            case "left":
            case "down":
               c = b.options.swipeToSlide ? b.checkNavigable(b.currentSlide + b.getSlideCount()) : b.currentSlide + b.getSlideCount(), b.currentDirection = 0;
               break;
            case "right":
            case "up":
               c = b.options.swipeToSlide ? b.checkNavigable(b.currentSlide - b.getSlideCount()) : b.currentSlide - b.getSlideCount(), b.currentDirection = 1 } "vertical" != d && (b.slideHandler(c), b.touchObject = {}, b.$slider.trigger("swipe", [b, d])) } else b.touchObject.startX !== b.touchObject.curX && (b.slideHandler(b.currentSlide), b.touchObject = {}) }, b.prototype.swipeHandler = function(a) {
      var b = this;
      if (!(b.options.swipe === !1 || "ontouchend" in document && b.options.swipe === !1 || b.options.draggable === !1 && -1 !== a.type.indexOf("mouse"))) switch (b.touchObject.fingerCount = a.originalEvent && void 0 !== a.originalEvent.touches ? a.originalEvent.touches.length : 1, b.touchObject.minSwipe = b.listWidth / b.options.touchThreshold, b.options.verticalSwiping === !0 && (b.touchObject.minSwipe = b.listHeight / b.options.touchThreshold), a.data.action) {
         case "start":
            b.swipeStart(a);
            break;
         case "move":
            b.swipeMove(a);
            break;
         case "end":
            b.swipeEnd(a) } }, b.prototype.swipeMove = function(a) {
      var d, e, f, g, h, b = this;
      return h = void 0 !== a.originalEvent ? a.originalEvent.touches : null, !b.dragging || h && 1 !== h.length ? !1 : (d = b.getLeft(b.currentSlide), b.touchObject.curX = void 0 !== h ? h[0].pageX : a.clientX, b.touchObject.curY = void 0 !== h ? h[0].pageY : a.clientY, b.touchObject.swipeLength = Math.round(Math.sqrt(Math.pow(b.touchObject.curX - b.touchObject.startX, 2))), b.options.verticalSwiping === !0 && (b.touchObject.swipeLength = Math.round(Math.sqrt(Math.pow(b.touchObject.curY - b.touchObject.startY, 2)))), e = b.swipeDirection(), "vertical" !== e ? (void 0 !== a.originalEvent && b.touchObject.swipeLength > 4 && a.preventDefault(), g = (b.options.rtl === !1 ? 1 : -1) * (b.touchObject.curX > b.touchObject.startX ? 1 : -1), b.options.verticalSwiping === !0 && (g = b.touchObject.curY > b.touchObject.startY ? 1 : -1), f = b.touchObject.swipeLength, b.touchObject.edgeHit = !1, b.options.infinite === !1 && (0 === b.currentSlide && "right" === e || b.currentSlide >= b.getDotCount() && "left" === e) && (f = b.touchObject.swipeLength * b.options.edgeFriction, b.touchObject.edgeHit = !0), b.options.vertical === !1 ? b.swipeLeft = d + f * g : b.swipeLeft = d + f * (b.$list.height() / b.listWidth) * g, b.options.verticalSwiping === !0 && (b.swipeLeft = d + f * g), b.options.fade === !0 || b.options.touchMove === !1 ? !1 : b.animating === !0 ? (b.swipeLeft = null, !1) : void b.setCSS(b.swipeLeft)) : void 0) }, b.prototype.swipeStart = function(a) {
      var c, b = this;
      return b.interrupted = !0, 1 !== b.touchObject.fingerCount || b.slideCount <= b.options.slidesToShow ? (b.touchObject = {}, !1) : (void 0 !== a.originalEvent && void 0 !== a.originalEvent.touches && (c = a.originalEvent.touches[0]), b.touchObject.startX = b.touchObject.curX = void 0 !== c ? c.pageX : a.clientX, b.touchObject.startY = b.touchObject.curY = void 0 !== c ? c.pageY : a.clientY, void(b.dragging = !0)) }, b.prototype.unfilterSlides = b.prototype.slickUnfilter = function() {
      var a = this;
      null !== a.$slidesCache && (a.unload(), a.$slideTrack.children(this.options.slide).detach(), a.$slidesCache.appendTo(a.$slideTrack), a.reinit()) }, b.prototype.unload = function() {
      var b = this;
      a(".slick-cloned", b.$slider).remove(), b.$dots && b.$dots.remove(), b.$prevArrow && b.htmlExpr.test(b.options.prevArrow) && b.$prevArrow.remove(), b.$nextArrow && b.htmlExpr.test(b.options.nextArrow) && b.$nextArrow.remove(), b.$slides.removeClass("slick-slide slick-active slick-visible slick-current").attr("aria-hidden", "true").css("width", "") }, b.prototype.unslick = function(a) {
      var b = this;
      b.$slider.trigger("unslick", [b, a]), b.destroy() }, b.prototype.updateArrows = function() {
      var b, a = this;
      b = Math.floor(a.options.slidesToShow / 2), a.options.arrows === !0 && a.slideCount > a.options.slidesToShow && !a.options.infinite && (a.$prevArrow.removeClass("slick-disabled").attr("aria-disabled", "false"), a.$nextArrow.removeClass("slick-disabled").attr("aria-disabled", "false"), 0 === a.currentSlide ? (a.$prevArrow.addClass("slick-disabled").attr("aria-disabled", "true"), a.$nextArrow.removeClass("slick-disabled").attr("aria-disabled", "false")) : a.currentSlide >= a.slideCount - a.options.slidesToShow && a.options.centerMode === !1 ? (a.$nextArrow.addClass("slick-disabled").attr("aria-disabled", "true"), a.$prevArrow.removeClass("slick-disabled").attr("aria-disabled", "false")) : a.currentSlide >= a.slideCount - 1 && a.options.centerMode === !0 && (a.$nextArrow.addClass("slick-disabled").attr("aria-disabled", "true"), a.$prevArrow.removeClass("slick-disabled").attr("aria-disabled", "false"))) }, b.prototype.updateDots = function() {
      var a = this;
      null !== a.$dots && (a.$dots.find("li").removeClass("slick-active").attr("aria-hidden", "true"), a.$dots.find("li").eq(Math.floor(a.currentSlide / a.options.slidesToScroll)).addClass("slick-active").attr("aria-hidden", "false")) }, b.prototype.visibility = function() {
      var a = this;
      a.options.autoplay && (document[a.hidden] ? a.interrupted = !0 : a.interrupted = !1) }, a.fn.slick = function() {
      var f, g, a = this,
         c = arguments[0],
         d = Array.prototype.slice.call(arguments, 1),
         e = a.length;
      for (f = 0; e > f; f++)
         if ("object" == typeof c || "undefined" == typeof c ? a[f].slick = new b(a[f], c) : g = a[f].slick[c].apply(a[f].slick, d), "undefined" != typeof g) return g;
      return a }
});

//make nav stick to top
$(document).ready(function() {
    if (!$('.headerMain--stripped').length) {
        var topDistance = $(window).scrollTop();
        var navbarHeight = $('.headerMain-main').outerHeight();
        var utilbarHeight = $('.headerMain-util').outerHeight();
        var headerHeight = navbarHeight + utilbarHeight;

        var utilFirst = false;

        if ($('.headerMain-util').index() < $('.headerMain-main').index()) {
            utilFirst = true;
        }

        $(window).scroll(function() {
            var lastPosition = $(this).scrollTop();
            if (lastPosition > topDistance) {
                // I have scrolled down
                if ($(window).scrollTop() > headerHeight) {
                    // I have scrolled past the header
                    $('body').removeClass('js-headerFixed--down').addClass('js-headerFixed--up');
                    $('.pageWrap').css('padding-top', navbarHeight);
                    $('a.backToTop').addClass('backToTop--scrolled');
                } else {
                    $('body').removeClass('js-headerFixed--down').removeClass('js-headerFixed--up');
                    $('.pageWrap').css('padding-top', '');
                    $('a.backToTop').removeClass('backToTop--scrolled');                    
                }
            } else if (lastPosition + 2 < topDistance) {
                // I have scrolled up
                if (utilFirst) {
                    //The utility header is before the main header in the DOM
                    if ($(window).scrollTop() >= utilbarHeight) {
                        $('body').addClass('js-headerFixed--down').removeClass('js-headerFixed--up');
                    } else {
                        $('body').removeClass('js-headerFixed--down').removeClass('js-headerFixed--up');
                        $('.pageWrap').css('padding-top', '');
                        $('a.backToTop').removeClass('backToTop--scrolled');                    
                    }
                } else {
                    //The utility header is after the main header in the DOM
                    if ($(window).scrollTop() >= 1) {
                        $('body').addClass('js-headerFixed--down').removeClass('js-headerFixed--up');
                    } else {
                        $('body').removeClass('js-headerFixed--down').removeClass('js-headerFixed--up');
                        $('.pageWrap').css('padding-top', '');
                    }
                }
            }
            topDistance = lastPosition;
        });
    }
});


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

//swapbox
$(document).ready(function(){
    $('.swapBox input:checked').closest('.swapBox').children().find('.swap-input').focus();
    //If another radio button is clicked, add the select class, and remove it from the previously selected radio
    $('.swapBox input').click(function () {
        $('.swapBox input:checked').closest('.swapBox').children().find('.swap-input').focus();
        $('.swapBox input:checked').closest('.swapBox').children('.swap').addClass('flashInput');
    });
});
// Responsive tabs/accordion. Basically just adds class .is-active to first tab on load and then any tab clicked on. you show and hide the proceeding content through the css
// Responsive behavior is in the CSS
$(document).ready(function() {
    //loop through all instances of tabs on the page and add ".is-active" to the first one
    initTabs();
    //toggle the "is-active" class on the links with click
    $(document).on("click", '.tabs > li > a', function () {
        if (!$(this).hasClass('is-active')) {
            $(this).closest('.tabs').find('a.is-active').removeClass('is-active');
            $(this).addClass('is-active');
            /*In the css, the li's have display:block set on them for mobile view, which is changed to display:inline on larger screens. So we check if the li has display:block, and if so, scroll the page so the open item is at the top of the viewscreen so it is easier to read and the accordion doesnt jump around like a weirdo.*/
            if ($(this).parent('li').css('display') == 'block') {
                $('html, body').animate({
                   scrollTop: $(this).offset().top - 50
                }, 500);
                return false;
            }
        } else {
            if ($('.tabs > li').css('display') == 'block') {
                $(this).closest('.tabs').find('a.is-active').removeClass('is-active');
            }
        }
    });
});
function initTabs() {
    if ($('.tabs').length > 0) {
        $('.tabs li a').removeClass('is-active');
        $('.tabs li:first-child a').addClass('is-active');
    }
}

//script to show hidden elements based on radio/checkbox/select selection
var showHideToggle;
$(document).ready(function(){
	showHideToggle = document.querySelectorAll('[toggleCheckTarget]');
	$('input:checkbox, input:radio, select').change(function(){
		$(showHideToggle).each(function(){
			if ($(this).attr('toggleCheckTarget'))
			{
				//alert($(this).is(':selected'));
				$('#' + $(this).attr('toggleCheckTarget')).toggleClass('is-hidden', !$(this).is(':checked') && !$(this).is(':selected'));
				$('#' + $(this).attr('toggleCheckTarget'))[0].offsetWidth;
				$('#' + $(this).attr('toggleCheckTarget')).toggleClass('flashInput', $(this).is(':checked') || $(this).is(':selected'));
			}
		});
	})
	//.change();
});
//toggles target divs on load instead of change for default selected form elements
$(document).ready(function(){
	showHideToggle = document.querySelectorAll('[toggleCheckTarget]');
	$(showHideToggle).each(function(){
		if ($(this).attr('toggleCheckTarget'))
		{
			$('#' + $(this).attr('toggleCheckTarget')).toggleClass('is-hidden', !$(this).is(':checked') && !$(this).is(':selected'));
			$('#' + $(this).attr('toggleCheckTarget'))[0].offsetWidth;
		}
	});
});


//globally show and hide elements on click
//USAGE: <a href="" class="hiddenTriggerClick">show stuff when this is clicked</a><div class="hiddenContent>I will show when that link over there is clicked</div>
$(document).ready(function() {
    $(".toggleLink").click(function(event) {
		targetClickShowHide(this);
		event.preventDefault();
		if ($(this).text() == $(this).data("text-swap")) {
			$(this).text($(this).data("text-original"));
		  } else {
			$(this).data("text-original", $(this).text());
			$(this).text($(this).data("text-swap"));
		  }		
        });
    })
//globally show and hide elements on hover. We change the hover to click on touchscreen devices
//USAGE: <a href="" class="hiddenTriggerHover">show stuff when this is hovered over</a><div class="hiddenContent>I will show when that link over there is hovered over</div>
$(document).ready(function () {
    //see if we are dealing with a touchscreen device
    if ("ontouchstart" in document.documentElement) {
        //if so, show .hiddenContent on click
        $('.toggleLink--hover').click(function (event) {
			targetClickShowHide(this);
			event.preventDefault();
        });
    } else {
        //if not a touchscreen, show .hiddenContent on hover
        $('.toggleLink--hover').hover(function () {
			targetClickShowHide(this);
        });
    }
});
function targetClickShowHide(sender)
{
	
	function nextInDOM(_selector, _subject) {
		var next = getNext(_subject);
		while(next.length != 0) {
			var found = searchFor(_selector, next);
			if(found != null) return found;
			next = getNext(next);
		}
		return null;
	}
	function getNext(_subject) {
		if(_subject.next().length > 0) return _subject.next();
		return getNext(_subject.parent());
	}
	function searchFor(_selector, _subject) {
		if(_subject.is(_selector)) return _subject;
		else {
			var found = null;
			_subject.children().each(function() {
				found = searchFor(_selector, $(this));
				if(found != null) return false;
			});
			return found;
		}
		return null; 
	}	
	$(sender).toggleClass("is-active");
	var hiddenElement = nextInDOM('.toggleLinkTarget', $(sender));
	if (hiddenElement.length > 0)
		$(hiddenElement[0]).toggleClass('is-hidden');
}
//Truncate long lists and add toggle link to show hide the hidden ones
function truncateList(maxShown, linkTextShow, linkTextHide)
{
	// set default to show
	if (!maxShown)
		maxShown = 5;
	
	// set defaults for link texts
	if (!linkTextShow)
		linkTextShow = "View More";
	if (!linkTextHide)
		linkTextHide = "View Less";
	
	$('ul.truncateList').each(
		function() {
			if ($(this).children('li').length > maxShown)
			{
				// hide anything after the maxShown item
				$(this).find("li:gt(" + (maxShown-1) + ")").addClass("is-hidden");
				// add the View more link
				var numMore = $(this).find("li:gt(" + (maxShown-1) + ")").length;
				$(this).append("<li class='truncateList-toggle'><a href=\"javascript:void(0)\">" + linkTextShow + " (" + numMore + ")</a></li>");
				// wire up link click event
				$(this).find('.truncateList-toggle a').click(function(e){
					e.preventDefault();
					if ($(this).closest('ul').find('li.is-hidden').length > 0)
					{
						// show items
						$(this).closest('ul').find("li:gt(" + (maxShown-1) + ")").not('.truncateList-toggle').removeClass('is-hidden');
						$(this).html(linkTextHide);
						$(this).closest('li').addClass('is-active');
					}
					else
					{
						// hide items
						var numMore = $(this).closest('ul').find("li:gt(" + (maxShown-1) + ")").not('.truncateList-toggle').length;
						$(this).closest('ul').find("li:gt(" + (maxShown-1) + ")").not('.truncateList-toggle').addClass('is-hidden');
						$(this).html(linkTextShow + " (" + numMore + ")");
						$(this).closest('li').removeClass('is-active');
					}
				});
			}
		}
	);
}

// utility function to allow for the waiting of multi fired events to finish before executing
var waitForFinalEvent = (function () {
  var timers = {};
  return function (callback, ms, uniqueId) {
    if (!uniqueId) {
      uniqueId = "Don't call this twice without a uniqueId";
    }
    if (timers[uniqueId]) {
      clearTimeout (timers[uniqueId]);
    }
    timers[uniqueId] = setTimeout(callback, ms);
  };
})();