
var AOC = {

	writeClass : 'CG-Slim',
		
	RemoveWrittenObjects: function ()
	{
		// If we have been spamming ctrl+r or ctrl+b, then get rid of the old write classes.
		var elements = document.getElementsByClassName( this.writeClass );
		while (elements.length > 0) elements[0].remove();
	},
	
	// Prepare the browser for readmode or blob mode
	ToggleExtras: function ()
	{
		// when we're viewing topics, hide the reactions
		this.ToggleVisibility( 'Reactions' );
		
		// hide the search bar
		this.ToggleVisibility( 'masthead' );
		this.ToggleSidebar(); // Keep sidebar visible before rewrite message; it's setting global var;		
	},

	ToggleForums: function ( googleStorage )
	{
		if( googleStorage.TheNewlyArrived )
			this.ToggleVisibility( 'Category-the-newly-arrived' );
		if( googleStorage.Kickstarter )
			this.ToggleVisibility( 'Category-ashes-creation-kickstarter' );
		if( googleStorage.Recruitment )
			this.ToggleVisibility( 'Category-guild-recruitment' );
	},
	
	ToggleMessages: function()
	{
		// Hide the original post.
		this.ToggleVisibility('MessageList');
		this.ToggleVisibility('CommentsWrap');
		this.ToggleVisibility('CommentForm');

		// Remove the Avatar image
		// This is going to remove it from the top right too.  May deal with in a future release.
		this.ToggleVisibility( 'ProfilePhoto' );
	},

	ToggleSidebar: function ()
	{
		var sidebar = document.getElementsByClassName('site-sidebar');	
		var main = document.getElementsByClassName('column-content');
		
		if( sidebarVisible )
		{
			this.ToggleVisibility( 'column-sidebar' );
			sidebar[0].classList.remove( 'column-sidebar' );
			sidebarVisible = false;
			main[0].style.width = '100%';
		} else {
			sidebar[0].className += sidebar[0].className ? ' column-sidebar' : 'column-sidebar';
			sidebarVisible = true;
			main[0].style.width = '67.3913%';
			this.ToggleVisibility( 'column-sidebar' );
		}
	},

	/*
	/// Summary:  The toggle visibility fx is going to add or remove a custom CG-Hide 
	/// class to the element.
	/// The Class argument is referring to the parent class on the forum container 
	/// that we're applying our custom styling to.
	*/
	ToggleVisibility: function ( cls )
	{
		// Get all the signature container divs
		var el = document.getElementsByClassName( cls );
		
		for( var i = 0; i < el.length; i++ )
		{
			if( el[i].classList.contains( 'CG-Hide' ) )
				el[i].classList.remove("CG-Hide");
			else
				el[i].className += el[i].className ? ' CG-Hide' : 'CG-Hide';
		}
	}	
}
