// change the phoenix to take you back to the mains ite
var navbar = document.getElementsByClassName('navbar-nav');

var li = document.createElement('LI');
li.innerHTML = '<a href="https://accounts.ashesofcreation.com/users/profile">AOC Profile</a>';
navbar[2].appendChild(li);

var optionsUrl = chrome.extension.getURL("options.html"); 

// Container div
var obj = document.createElement('div');
obj.className = 'container CG-Mod';
obj.innerHTML = '<a class="CG-Mod pull-right" href="http://cohortgaming.com/aoc-forums">Modded by tugowar</a>';
obj.innerHTML += '<span class="pull-right">&nbsp;|&nbsp;</span>';
obj.innerHTML += '<a class="CG-Mod pull-right" href="' + optionsUrl + '" target="_blank">Edit the Extension Options!</a>';
document.getElementsByTagName("footer")[0].appendChild(obj);

var anchors = document.getElementsByTagName('a');
var intrepid = ['GM%20Sam', 'GMSteven', 'MargaretKrohn', 'Steven%20Sharif', 'LieutenantToast', 'Trystan', 'dirkdiggler', 'Yaviey', 'numinae', 'ElectricSheep', 'Rykus', 'Anxious9', 'bogitwob', 'LordSnod', 'SpiritedWarrior', 'Optimistic'];
for( var i = 0; i < anchors.length; i++ )
{
	intrepid.forEach(function(name, k, array) {
		if( anchors[i].getAttribute('href') == '/profile/'+name && ! anchors[i].classList.contains("IndexPhoto") )
		{
			anchors[i].setAttribute("style", "color: #9549da !important");
			return;			
		}
	});
}
