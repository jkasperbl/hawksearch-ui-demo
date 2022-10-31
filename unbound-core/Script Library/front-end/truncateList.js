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
