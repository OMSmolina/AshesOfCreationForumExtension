console.log("Tugowar says hello!");

/*
Write in your theme.  Valid options are (it is case-sensitive):
light
wider
*/
var Theme = 'wider';  

// If ShowSignatures = false, then signatures will be invisible by default.
// You can press Ctrl + S to toggle showing signatures at any time.
var ShowSignatures = false;


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
	// If we have been spamming ctrl+z, then get rid of the old cg-slims.
	var elements = document.getElementsByClassName('CG-Slim');
	while (elements.length > 0) elements[0].remove();

	// Hide the original post.
	ToggleVisibility('MessageList');
	ToggleVisibility('CommentsWrap');
	ToggleVisibility('CommentForm');

	// Remove the Avatar image
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
	var quote = document.getElementsByClassName('Quote');

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
			
			// Create a object for the quote.
			var a = document.createElement('a');
			a.href = quote[i].href;
			a.className = quote[i].className;
			a.innerHTML = "<em> - " + quote[i].innerHTML + "</em>";
			obj.appendChild( a );
			
			// Create a span object for the date.
			var s = document.createElement('span');
			s.innerHTML = "<br />" + messages[i].innerHTML + "<br />";
			obj.appendChild( s );			
			
			slimMessages.appendChild(obj);
		}
	}
	
	var pager = document.getElementsByClassName('Pager');
	if( pager.length > 0 )
	{
		var paging = document.createElement('span');
		paging.innerHTML = pager[0].innerHTML;
		slimMessages.appendChild( paging );	
	}
	
	var replyBox = document.getElementsByClassName( 'MessageForm' );

	if( ! sidebarVisible )	
		siteContent[0].appendChild( slimMessages );
	
	return;
}

/*
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

function upTo(el, tagName) {
  tagName = tagName.toLowerCase();

  while (el && el.parentNode) {
    el = el.parentNode;
    if (el.tagName && el.tagName.toLowerCase() == tagName) {
      return el;
    }
  }

  // Many DOM methods return null if they don't 
  // find the element they are searching for
  // It would be OK to omit the following and just
  // return undefined
  return null;
}

/*
/// We're going to build a few short cut keys: 
/// CTRL+S - Toggle Signatures
/// CTRL+D - This will toggle the right page.
///				If you are on the home page, it will hide the  Kickstarter, Lore, and Guild Recruitment forums.  
///				If you are viewing a thread, it will collapse all of the text into a shorter format.
*/
window.addEventListener("keydown", function (e) {
		
	// CTRL+S - Toggle the visibility of signatures
    if ((e.key == 's' || e.key == 'S' ) && (e.ctrlKey || e.metaKey))
    {
		e.preventDefault();
		
		console.log("in ctrl s");
		ToggleVisibility( 'Signature' );

        return false;
    } 
	// CTRL+D - Toggle the slim features
	else if ((e.key == 'd' || e.key == 'D' ) && (e.ctrlKey || e.metaKey))
    {
		e.preventDefault();
		
		console.log("in Ctrl D");
		ToggleVisibility( 'Category-the-newly-arrived' );
		ToggleVisibility( 'Category-ashes-creation-kickstarter' );
		ToggleVisibility( 'Category-guild-recruitment' );
		ToggleVisibility( 'Reactions' );
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
