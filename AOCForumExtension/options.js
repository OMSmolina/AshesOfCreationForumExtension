// document.getElementById('progress').innerHTML = "Loading values";

// Saves options to chrome.storage.sync.
function save_options() {
	
//	document.getElementById('progress').innerHTML = "Saving...";
	
	// get the answers
	var Theme = document.getElementById('Theme').value;
	var ShowSignatures = document.getElementById('ShowSignatures').checked;
	var PromotedContent = document.getElementById('PromotedContent').checked;
	var Sidebar = document.getElementById('Sidebar').checked;
	var Off = document.getElementById('Off').checked;	
	
	var setOptions = {
		Theme: Theme,
		ShowSignatures: ShowSignatures,
		PromotedContent: PromotedContent,
		Sidebar: Sidebar,
		Off: Off
	  };
	
  chrome.storage.sync.set( setOptions, function() {
	// Update status to let user know options were saved.
	var status = document.getElementById('status');
	status.textContent = 'Options saved.';
	setTimeout(function() {
	  status.textContent = '';
	}, 1500);
  });  		
  
//  document.getElementById('progress').innerHTML = "Saved.";
  
}

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function restore_options() {
	
//  document.getElementById('progress').innerHTML = "Loading...";

  // Use default value color = 'red' and likesColor = true.
  chrome.storage.sync.get({
		Theme: 'small-impact',
		ShowSignatures: true,
		PromotedContent: false,
		Sidebar: false,
		Off: false
	  }, function(items) {
		document.getElementById('Theme').value = items.Theme;
		document.getElementById('ShowSignatures').checked = items.ShowSignatures;
		document.getElementById('PromotedContent').checked = items.PromotedContent;
		document.getElementById('Sidebar').checked = items.Sidebar;
		document.getElementById('Off').checked = items.Off; 
  });
  
//  document.getElementById('progress').innerHTML = "Values loaded.";
}

document.addEventListener('DOMContentLoaded', restore_options);
var sPath = window.location.pathname;
var sPage = sPath.substring(sPath.lastIndexOf('/') + 1);
if(sPage == "options.html"){
	document.getElementById('save').addEventListener('click', save_options);
}

