
var ForumWriter = Object.create( AOC );
Object.assign(ForumWriter, {
	
	author : null,
	d : null,
	messages : null,
	
	siteContent : null,
	slimMessages : null,
	writeAMessage : null,
	writeClass : 'CG-Slim',
		
	LoadContext: function()
	{
		this.siteContent = document.getElementsByClassName('site-content');
		this.writeAMessage = document.getElementsByClassName('CommentForm');
		this.slimMessages = document.createElement('div');
		this.slimMessages.className = this.writeClass;
	},
	
	LoadMessages: function()
	{
		/*
		I'm going to get the author's name, date the post was written, and the message.
		I'll write a new set of divs to output this.
		I'll put my divs under site-content.
		This means I have to hide message list and comments wrap.
		*/
		this.author = document.getElementsByClassName('Author');
		this.messages = document.getElementsByClassName('Message');
		this.d = document.getElementsByClassName('DateCreated');
		
		// If you're not signed in, then you can't quote...
		// However, the length of quote isn't lining up 1:1 with the topics
		// because the OT is a different class methinks
	//	var quote = document.getElementsByClassName('Quote');		
	},
	
	LoadPager: function()
	{
		// This is the page number links on the thread.
		var pager = document.getElementsByClassName('Pager');
		if( pager.length > 0 )
		{
			var paging = document.createElement('span');
			paging.className = pager[0].className;
			paging.innerHTML = pager[0].innerHTML;
			this.slimMessages.appendChild( paging );	
		}

		// The sidebarVisible flag is set if we are inside of read mode
		// When we're in read mode, that's when we print our messages.
		// if( ! sidebarVisible )	
		// We moved that check to the top for efficiency			
	},
	
	RemoveWrittenObjects: function ()
	{
		// If we have been spamming ctrl+r or ctrl+b, then get rid of the old write classes.
		var elements = document.getElementsByClassName( this.writeClass );
		while (elements.length > 0) elements[0].remove();
	},
	
	RewriteMessage: function()
	{
		// When we enter OR exit read mode, we're going to remove the previously written messages.
		this.RemoveWrittenObjects();
		// This will toggle the original vanilla forum content display none or block.
		this.ToggleMessages();	
		
		// If we've just exited read mode, then the side bar will be visible.  We're done.
		if( sidebarVisible )
			return;
		
		this.LoadContext();
		this.LoadMessages();
			
		for( var i = 0; i < this.messages.length; i++ )
		{
			if( this.author[i] != 'undefined' )
			{
				// Container div
				var obj = document.createElement('div');
				obj.className = 'CG-Messages';
				
				// Create a span object for the author.
				var s = document.createElement('span');
				s.innerHTML = "<em>" + this.author[i].innerHTML + "</em>";
				obj.appendChild( s );
				
				// Create a span object for the date.
				var s = document.createElement('span');
				s.innerHTML = "<em> - wrote on " + this.d[i].innerHTML +"</em>";
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
				s.innerHTML = "<br />" + this.messages[i].innerHTML + "<br />";
				obj.appendChild( s );			
				
				this.slimMessages.appendChild(obj);
			}
		}
		
		this.LoadPager();
		
		this.siteContent[0].appendChild( this.slimMessages );
		
		return;
	},
	
	WriteBlob: function()
	{
		// When we enter OR exit read mode, we're going to remove the previously written messages.
		this.RemoveWrittenObjects();
		// This will toggle the original vanilla forum content display none or block.
		this.ToggleMessages();	
		
		// If we've just exited read mode, then the side bar will be visible.  We're done.
		if( sidebarVisible )
			return;
		
		this.LoadContext();
		this.LoadMessages();
			
		for( var i = 0; i < this.messages.length; i++ )
		{
			if( this.messages[i] != 'undefined' )
			{	
				var s = document.createElement('span');
				s.innerHTML = this.messages[i].innerHTML + "&nbsp;";
				obj.appendChild( s );
				this.slimMessages.appendChild(obj);
			}
		}
		
		this.LoadPager();
		
		this.siteContent[0].appendChild( this.slimMessages );
		
		return;
	}
});