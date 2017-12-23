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
nobg
*/
var Theme = 'wider';

// If ShowSignatures = false, then signatures will be invisible by default.
// You can press Ctrl + S to toggle showing signatures at any time.
var ShowSignatures = true;

// Set a forum to true if you want to hide the forum in read mode
var TheNewlyArrived = false;
var Kickstarter = false;
var Recruitment = false;
var Off = false;

// The sidebar is referring to the "my discussion", "who's online", etc. bar.
// This var is being used as a global var across forum-class and readmode/blobmode
var sidebarVisible = true;

function GetGoogleStorage( callback ){	
	chrome.storage.sync.get( {
		Theme: 'wider',
		ShowSignatures: true,
		TheNewlyArrived: false,
		Kickstarter: false,
		Recruitment: false,
		Off: false
	},function(items) {
		callback( items );
	});
}