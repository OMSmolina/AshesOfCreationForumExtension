/*
/// We're going to build a few short cut keys: 
/// CTRL+S - Toggle Signatures
/// CTRL+R - This will toggle the right page.
///				If you are on the home page, you can select to hide specific categories with the flags.
///				If you are viewing a thread, it will collapse all of the text into a shorter format.
/// CTRL+B - If you are viewing a forum post, this will convert all of the posts into 1 paragraph.
*/
window.addEventListener("keydown", function (e) {
		
	// CTRL+S - Toggle the visibility of signatures
    if ((e.key == 's' || e.key == 'S' ) && (e.ctrlKey || e.metaKey))
    {
		e.preventDefault();
		
		console.log("in ctrl+s");
		ForumWriter.ToggleVisibility( 'Signature' );

        return false;
    } 
	// CTRL+B - Toggle the blob feature
	else if ((e.key == 'b' || e.key == 'B' ) && (e.ctrlKey || e.metaKey))
    {
		e.preventDefault();	
		console.log("in Ctrl+B");
		
		// hide everything
		ForumWriter.ToggleExtras();
		
		ForumWriter.WriteBlob();
        return false;
	}
	// CTRL+Q - Toggle the extension off
	else if ((e.key == 'q' || e.key == 'Q' ) && (e.ctrlKey || e.metaKey))
    {
		e.preventDefault();	
		console.log("You've turned the extension off.  You have to go into options to turn it back on.");
		
		// Set the extension to off
		  chrome.storage.sync.set({
			Off: true
		  }, function() {
		  });  
        return false;
	}
	// CTRL+R - Toggle the slim features
	else if ((e.key == 'r' || e.key == 'R' ) && (e.ctrlKey || e.metaKey))
    {
		e.preventDefault();
		
		console.log("in Ctrl+R");
	
		ForumWriter.ToggleVisibility( 'promoted-content' );
		ForumWriter.ToggleSidebar( 'page-sidebar' );
		
		// hide the forums we don't want to see.
//		GetGoogleStorage( ForumWriter.ToggleForums );
		
		// hide everything
//		ForumWriter.ToggleExtras();
		
//		ForumWriter.RewriteMessage();
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
	// If off is true, they don't want to load the extension...
	if( googleStorage.Off )
		return;

	var link = document.createElement('link');
	link.href = chrome.extension.getURL( 'base-theme.css' );
	link.type = 'text/css';
	link.rel = 'stylesheet';
	document.getElementsByTagName("head")[0].appendChild(link);

	var link = document.createElement('link');
	link.href = chrome.extension.getURL( googleStorage.Theme +'-theme.css');
	link.type = 'text/css';
	link.rel = 'stylesheet';
	document.getElementsByTagName("head")[0].appendChild(link);

	if( ! googleStorage.ShowSignatures )
		ForumWriter.ToggleVisibility( 'Signature' );
	
	if( ! googleStorage.PromotedContent )
		ForumWriter.ToggleVisibility( 'promoted-content' );
	
	var pos = (window.location.href).indexOf("profile");
	var mPos = (window.location.href).indexOf("messages");
	var bPos = (window.location.href).indexOf("badge");
	if( pos == -1 && mPos == -1 && bPos == -1 ){
		if( ! googleStorage.Sidebar ) {
			ForumWriter.ToggleSidebar( 'page-sidebar' );	
		}
	}
}

// Call the Google values through a callback
GetGoogleStorage( Onload );