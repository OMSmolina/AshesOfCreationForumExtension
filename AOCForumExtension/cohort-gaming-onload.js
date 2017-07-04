/*
/// We're going to build a few short cut keys: 
/// CTRL+S - Toggle Signatures
/// CTRL+R - This will toggle the right page.
///				If you are on the home page, you can select to hide specific categories with the flags.
///				If you are viewing a thread, it will collapse all of the text into a shorter format.
/// CTRL+B - If you are viewing a forum post, this will convert all of the posts into 1 paragraph.
*/

var forum = Object.create( AOC );

window.addEventListener("keydown", function (e) {
		
	// CTRL+S - Toggle the visibility of signatures
    if ((e.key == 's' || e.key == 'S' ) && (e.ctrlKey || e.metaKey))
    {
		e.preventDefault();
		
		console.log("in ctrl+s");
		forum.ToggleVisibility( 'Signature' );

        return false;
    } 
	// CTRL+B - Toggle the blob feature
	else if ((e.key == 'b' || e.key == 'B' ) && (e.ctrlKey || e.metaKey))
    {
		e.preventDefault();	
		console.log("in Ctrl+B");
		
		// hide everything
		forum.ToggleExtras();
		
		WriteBlob( forum );
        return false;
	}
	// CTRL+R - Toggle the slim features
	else if ((e.key == 'r' || e.key == 'R' ) && (e.ctrlKey || e.metaKey))
    {
		e.preventDefault();
		
		console.log("in Ctrl+R");
		
		// hide the forums we don't want to see.
		GetGoogleStorage( forum.ToggleForums );
		
		// hide everything
		forum.ToggleExtras();
		
		RewriteMessage( forum );
        return false;
	}
    return true;
});

/* chrome.runtime.onMessageExternal.addListener(
    function(request, sender, sendResponse) {
        if (request) {
            if (request.message) {
                if (request.message == "version") {
                    sendResponse({version: 1.0});
                }
            }
        }
        return true;
 });
*/
	/*
Run these commands on startup.
*/

// link the custom CSS as a stylesheet to give it higher priority
function Onload( googleStorage )
{
	var link = document.createElement('link');
	link.href = chrome.extension.getURL( 'cohort-gaming-theme.css' );
	link.type = 'text/css';
	link.rel = 'stylesheet';
	document.getElementsByTagName("head")[0].appendChild(link);

	var link = document.createElement('link');
	link.href = chrome.extension.getURL( googleStorage.Theme +'-theme.css');
	link.type = 'text/css';
	link.rel = 'stylesheet';
	document.getElementsByTagName("head")[0].appendChild(link);

	if( ! googleStorage.ShowSignatures )
		forum.ToggleVisibility( 'Signature' );
}
// Call the Google values through a callback
GetGoogleStorage( Onload );

// change the phoenix to take you back to the mains ite
var navbrand = document.getElementsByClassName('navbar-brand');
navbrand.href = 'https://www.ashesofcreation.com';

// Container div
var obj = document.createElement('div');
obj.className = 'container CG-Mod';
obj.innerHTML = '<a class="CG-Mod pull-right" href="http://cohortgaming.com/aoc-forums">Modded by Cohort Gaming</a>';
document.getElementsByTagName("footer")[0].appendChild(obj);

