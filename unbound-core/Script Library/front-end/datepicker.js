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
