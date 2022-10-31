/*Small hack to fix secondary nav. As of now, the class "selected" gets added not only to direct parent LI of the current page link, but
also to the parent of that UL if it is a second or third level link. This adds the class of lastSelected to the actual current page LI*/
$(document).ready( function() {
	$(".navSecondary ul li.selected:last").addClass("lastSelected");
});