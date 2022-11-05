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
