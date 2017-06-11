console.log("Tugowar says hello!");
/*
///////////////////////////////////////////////////
///		You can find the latest version at:		///
///		http://cohortgaming.com/aoc-forums		///
///////////////////////////////////////////////////


///////////////////////////////////////////////////
///		Configuration Options					///
///////////////////////////////////////////////////

Write in your theme.  Valid options are (it is case-sensitive):
light
wider
*/
var Theme = 'wider';

// If ShowSignatures = false, then signatures will be invisible by default.
// You can press Ctrl + S to toggle showing signatures at any time.
var ShowSignatures = true;

// Set a forum to true if you want to hide the forum in read mode
var TheNewlyArrived = false;
var Kickstarter = false;
var Recruitment = false;

/*  
///////////////////////////////////////////////////
///		Start the uneditable part 				///
///////////////////////////////////////////////////
*/

var sidebarVisible = true;

function ToggleSidebar()
{
	var sidebar = document.getElementsByClassName('site-sidebar');	
	var main = document.getElementsByClassName('column-content');
	
	if( sidebarVisible )
	{
		ToggleVisibility( 'column-sidebar' );
		sidebar[0].classList.remove( 'column-sidebar' );
		sidebarVisible = false;
		main[0].style.width = '100%';
	} else {
		sidebar[0].className += sidebar[0].className ? ' column-sidebar' : 'column-sidebar';
		sidebarVisible = true;
		main[0].style.width = '67.3913%';
		ToggleVisibility( 'column-sidebar' );
	}
}

function RewriteMessage()
{
	// If we have been spamming ctrl+r, then get rid of the old cg-slims.
	var elements = document.getElementsByClassName('CG-Slim');
	while (elements.length > 0) elements[0].remove();

	// Hide the original post.
	ToggleVisibility('MessageList');
	ToggleVisibility('CommentsWrap');
	ToggleVisibility('CommentForm');

	// Remove the Avatar image
	// This is going to remove it from the top right too.  May deal with in a future release.
	ToggleVisibility( 'ProfilePhoto' );
	
	var siteContent = document.getElementsByClassName('site-content');
	var writeAMessage = document.getElementsByClassName('CommentForm');
	var slimMessages = document.createElement('div');
	slimMessages.className = 'CG-Slim';

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
		paging.innerHTML = pager[0].innerHTML;
		slimMessages.appendChild( paging );	
	}

	// The sidebarVisible flag is set if we are inside of read mode
	// When we're in read mode, that's when we print our messages.
	if( ! sidebarVisible )	
		siteContent[0].appendChild( slimMessages );
	
	return;
}

/*
/// Summary:  The toggle visibility fx is going to add or remove a custom CG-Hide 
/// class to the element.
/// The Class argument is referring to the parent class on the forum container 
/// that we're applying our custom styling to.
*/
function ToggleVisibility( cls )
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

/*
/// We're going to build a few short cut keys: 
/// CTRL+S - Toggle Signatures
/// CTRL+R - This will toggle the right page.
///				If you are on the home page, you can select to hide specific categories with the flags.
///				If you are viewing a thread, it will collapse all of the text into a shorter format.
*/
window.addEventListener("keydown", function (e) {
		
	// CTRL+S - Toggle the visibility of signatures
    if ((e.key == 's' || e.key == 'S' ) && (e.ctrlKey || e.metaKey))
    {
		e.preventDefault();
		
		console.log("in ctrl+s");
		ToggleVisibility( 'Signature' );

        return false;
    } 
	// CTRL+R - Toggle the slim features
	else if ((e.key == 'r' || e.key == 'R' ) && (e.ctrlKey || e.metaKey))
    {
		e.preventDefault();
		
		console.log("in Ctrl+R");
		
		// hide the forums we don't want to see.
		if( ! TheNewlyArrived )
			ToggleVisibility( 'Category-the-newly-arrived' );
		if( ! Kickstarter )
			ToggleVisibility( 'Category-ashes-creation-kickstarter' );
		if( ! Recruitment )
			ToggleVisibility( 'Category-guild-recruitment' );
		
		// when we're viewing topics, hide the reactions
		ToggleVisibility( 'Reactions' );
		
		// hide the search bar
		ToggleVisibility( 'masthead' );
		ToggleSidebar(); // Keep sidebar visible before rewrite message; it's setting global var;
		RewriteMessage();
        return false;
	}
    return true;
});

/*
Run these commands on startup.
*/

// link the custom CSS as a stylesheet to give it higher priority
var cssPath = chrome.extension.getURL( Theme +'-theme.css');
var link = document.createElement('link');
link.href = cssPath;
link.type = 'text/css';
link.rel = 'stylesheet';
document.getElementsByTagName("head")[0].appendChild(link);

// change the phoenix to take you back to the mains ite
var navbrand = document.getElementsByClassName('navbar-brand');
navbrand.href = 'https://www.ashesofcreation.com';

// turn off the signatures forum wide
if( ! ShowSignatures )
	ToggleVisibility( 'Signature' );
