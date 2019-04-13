var sPath = window.location.pathname;
var sPage = sPath.substring(sPath.lastIndexOf('/') + 1);
if(sPage == ""){
	var ashesOfCreation = document.getElementById("Category_20106");
	var firstLinks = 	'<a href="/categories/aoc-announcements">Announcements</a><br />';
	firstLinks += 		'<a href="/categories/aoc-general-discussion">General Discussion</a><br />';
	var secondLinks = 	'<a href="/categories/na-guilds">NA Guilds</a><br />';
	secondLinks += 		'<a href="/categories/eu-guilds">EU Guilds</a>&nbsp;/&nbsp;';
	secondLinks += 		'<a href="/categories/oce-guilds">OCE Guilds</a>';
	var thirdLinks = 	'<a href="/categories/aoc-community-creations">Community Creations</a><br />';
	thirdLinks += 		'<a href="/categories/aoc-role-playing-tavern">Role Playing Tavern</a><br />';
	ashesOfCreation.insertAdjacentHTML('beforeend', '<div class="CG-Subforum"><div class="CG-Subforum-list">'+firstLinks+'</div><div class="CG-Subforum-list">'+thirdLinks+'</div><div class="CG-Subforum-list">'+secondLinks+'</div></div>' );
	
	var apoc = document.getElementById("Category_20107");
	var firstLinks = 	'<a href="/categories/apoc-announcements">APOC Announcements</a><br />';
	firstLinks += 		'<a href="/categories/apoc-general-discussion">APOC General Discussion</a><br />';
	var thirdLinks = 	'<a href="/categories/apoc-community-creations">Community Creations</a><br />';
	apoc.insertAdjacentHTML('beforeend', '<div class="CG-Subforum"><div class="CG-Subforum-list">'+firstLinks+'</div><div class="CG-Subforum-list">'+thirdLinks+'</div></div>' );
}


