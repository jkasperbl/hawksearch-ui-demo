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
