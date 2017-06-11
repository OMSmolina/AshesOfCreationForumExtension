// Saves options to chrome.storage.sync.
function save_options() {

	// get the answers
	var theme = document.getElementById('theme').value;
	var showSignatures = document.getElementById('showSignatures').checked;
	var TheNewlyArrived = document.getElementById('TheNewlyArrived').checked;
	var Kickstarter = document.getElementById('Kickstarter').checked;
	var Recruitment = document.getElementById('Recruitment').checked;	
	
  chrome.storage.sync.set({
    Theme: theme,
    ShowSignatures: showSignatures,
	TheNewlyArrived: TheNewlyArrived,
	Kickstarter: Kickstarter,
	Recruitment: Recruitment
  }, function() {
    // Update status to let user know options were saved.
    var status = document.getElementById('status');
    status.textContent = 'Options saved.';
    setTimeout(function() {
      status.textContent = '';
    }, 750);
  });
}

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function restore_options() {
  // Use default value color = 'red' and likesColor = true.
  chrome.storage.sync.get({
    theme: 'wider',
    showSignatures: true,
    TheNewlyArrived: true,
    Kickstarter: true,
    Recruitment: true
  }, function(items) {
    document.getElementById('theme').value = items.theme;
    document.getElementById('showSignatures').checked = items.showSignatures;
    document.getElementById('TheNewlyArrived').checked = items.TheNewlyArrived;
    document.getElementById('Kickstarter').checked = items.Kickstarter;
    document.getElementById('Recruitment').checked = items.Recruitment;
  });
}

document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click',
    save_options);