alert("this is here");

/*
var css = '.Item { background-color: #ff0000; }',
    head = document.head || document.getElementsByTagName('head')[0],
    style = document.createElement('style');

style.type = 'text/css';
if (style.styleSheet){
  style.styleSheet.cssText = css;
} else {
  style.appendChild(document.createTextNode(css));
}

head.appendChild(style);
*/

/*
// select the target node
var target = document.querySelector('#vanilla-comments');

// create an observer instance
var observer = new MutationObserver(function(mutations) {
  mutations.forEach(function(mutation) {
    console.log(mutation.type);
	var items = document.getElementsByClassName("Item");
	while (items.length) {
		items[0].className = "exampleClassComplete";
	}
  });    
});

// configuration of the observer:
var config = { attributes: true, childList: true, characterData: true };

// pass in the target node, as well as the observer options
observer.observe(target, config);

// later, you can stop observing
//observer.disconnect();
*/
/*
(function(window, document, undefined) {

  var addCSSFileToForum = function() {
	  
    var target = document.querySelector('#vanilla-comments');
	var items = document.getElementsByClassName("Item");
	if( frames[0] != "undefined" )
	{
		console.log( "in items len loop" );
      setTimeout(addCSSFileToForum, 100);
    } else {
		alert( frames[0] ); 
		var cssLink = document.createElement("link");
		cssLink.href = "friendly-background.css"; 
		cssLink.rel = "stylesheet"; 
		cssLink.type = "text/css"; 
		document.head.appendChild(cssLink);
/*		frames[0].document.body.appendChild(cssLink);
    }
  }
  addCSSFileToForum(); 
})(this, document);
*/