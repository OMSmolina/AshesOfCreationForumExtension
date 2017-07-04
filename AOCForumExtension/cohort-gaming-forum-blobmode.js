
function WriteBlob( forum )
{
	// When we enter OR exit read mode, we're going to remove the previously written messages.
	forum.RemoveWrittenObjects();
	// This will toggle the original vanilla forum content display none or block.
	forum.ToggleMessages();	
	
	// If we've just exited read mode, then the side bar will be visible.  We're done.
	if( sidebarVisible )
		return;
	
	var siteContent = document.getElementsByClassName('site-content');
	var slimMessages = document.createElement('div');
	slimMessages.className = forum.writeClass;

	var messages = document.getElementsByClassName('Message');

	for( var i = 0; i < messages.length; i++ )
	{
		if( messages[i] != 'undefined' )
		{	
			var s = document.createElement('span');
			s.innerHTML = messages[i].innerHTML + "&nbsp;";
			obj.appendChild( s );
			slimMessages.appendChild(obj);
		}
	}
	
	// This is the page number links on the thread.
	var pager = document.getElementsByClassName('Pager');
	if( pager.length > 0 )
	{
		var paging = document.createElement('span');
		paging.className = pager[0].className;
		paging.innerHTML = pager[0].innerHTML;
		slimMessages.appendChild( paging );	
	}

	// The sidebarVisible flag is set if we are inside of read mode
	// When we're in read mode, that's when we print our messages.
	// if( ! sidebarVisible )	
	// We moved that check to the top for efficiency	
	
	siteContent[0].appendChild( slimMessages );
	
	return;
}