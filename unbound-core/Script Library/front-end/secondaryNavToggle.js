//secondary nav toggle
jQuery(document).ready(function($) {
	$('.navSecondary-breadcrumb li').first().prepend('<span class="navSecondaryToggle"></span>');
	$('.navSecondaryToggle').click(function() {
		$(this).toggleClass('is-active');
		$('.navSecondary').toggleClass('is-active');
	});
});
