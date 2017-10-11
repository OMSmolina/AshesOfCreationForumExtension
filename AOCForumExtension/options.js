// document.getElementById('progress').innerHTML = "Loading values";

// Saves options to chrome.storage.sync.
function save_options() {
	
//	document.getElementById('progress').innerHTML = "Saving...";
	
	// get the answers
	var Theme = document.getElementById('Theme').value;
	var ShowSignatures = document.getElementById('ShowSignatures').checked;
	var TheNewlyArrived = document.getElementById('TheNewlyArrived').checked;
	var Kickstarter = document.getElementById('Kickstarter').checked;
	var Recruitment = document.getElementById('Recruitment').checked;	
	var Off = document.getElementById('Off').checked;	
	
	var setOptions = {
		Theme: Theme,
		ShowSignatures: ShowSignatures,
		TheNewlyArrived: TheNewlyArrived,
		Kickstarter: Kickstarter,
		Recruitment: Recruitment,
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
		Theme: 'wider',
		ShowSignatures: true,
		TheNewlyArrived: false,
		Kickstarter: false,
		Recruitment: false,
		Off: false
	  }, function(items) {
		document.getElementById('Theme').value = items.Theme;
		document.getElementById('ShowSignatures').checked = items.ShowSignatures;
		document.getElementById('TheNewlyArrived').checked = items.TheNewlyArrived;
		document.getElementById('Kickstarter').checked = items.Kickstarter;
		document.getElementById('Recruitment').checked = items.Recruitment; 
		document.getElementById('Off').checked = items.Off; 
  });
  
//  document.getElementById('progress').innerHTML = "Values loaded.";
}

document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click',
    save_options);