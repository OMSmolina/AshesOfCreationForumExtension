
var AOC = {
	
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

	ToggleSidebar: function ( cls )
	{
		var main = document.getElementsByClassName('page-content');
		var side = document.getElementsByClassName(cls);
		
		if( Sidebar )
		{
			this.ToggleVisibility( cls );
			side[0].style.width = "25%";
			main[0].style.width = '75%';
			Sidebar = false;
		} else {
			this.ToggleVisibility( cls );
			main[0].style.width = '100%';
			side[0].style.width = "0%";
			Sidebar = true;
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
