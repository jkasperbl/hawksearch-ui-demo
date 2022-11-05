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

