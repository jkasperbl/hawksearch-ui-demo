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