
function RewriteMessage( forum )
{
	// When we enter OR exit read mode, we're going to remove the previously written messages.
	forum.RemoveWrittenObjects();
	// This will toggle the original vanilla forum content display none or block.
	forum.ToggleMessages();	
	
	// If we've just exited read mode, then the side bar will be visible.  We're done.
	if( sidebarVisible )
		return;
	
	var siteContent = document.getElementsByClassName('site-content');
	var writeAMessage = document.getElementsByClassName('CommentForm');
	var slimMessages = document.createElement('div');
	slimMessages.className = forum.writeClass;

	/*
	I'm going to get the author's name, date the post was written, and the message.
	I'll write a new set of divs to output this.
	I'll put my divs under site-content.
	This means I have to hide message list and comments wrap.
	*/

	var author = document.getElementsByClassName('Author');
	var messages = document.getElementsByClassName('Message');
	var d = document.getElementsByClassName('DateCreated');
	
	// If you're not signed in, then you can't quote...
	// However, the length of quote isn't lining up 1:1 with the topics
	// because the OT is a different class methinks
//	var quote = document.getElementsByClassName('Quote');

	for( var i = 0; i < messages.length; i++ )
	{
		if( author[i] != 'undefined' )
		{
			// Container div
			var obj = document.createElement('div');
			obj.className = 'CG-Messages';
			
			// Create a span object for the author.
			var s = document.createElement('span');
			s.innerHTML = "<em>" + author[i].innerHTML + "</em>";
			obj.appendChild( s );
			
			// Create a span object for the date.
			var s = document.createElement('span');
			s.innerHTML = "<em> - wrote on " + d[i].innerHTML +"</em>";
			obj.appendChild( s );
			
/*			if( quote.length > 0 )
			{
				// Create a object for the quote.
				var a = document.createElement('a');
				a.href = quote[i].href;
				a.className = quote[i].className;
				a.innerHTML = "<em> - " + quote[i].innerHTML + "</em>";
				obj.appendChild( a );
			}
*/			
			// Create a span object for the date.
			var s = document.createElement('span');
			s.innerHTML = "<br />" + messages[i].innerHTML + "<br />";
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