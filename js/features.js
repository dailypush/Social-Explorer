var PATH = "http://www.souocara.com/";
var showtime;

$(document).ready(function () {
	$("#buttons").hide(); //navigation button  
	$(".close").hide();
	$('input[title!=""]').hint();		
	var image_holder = $("#screenshots");			
  	image_holder.hide();	
	var images = image_holder.children('li');	 	
	images.fadeTo(0, 0);
    
/* DISPLAY SEARCH BOX */    
	$(".button").click(function(e) { //Find Button
		clearInterval(showtime);
		doSearch();
	});//button
		
    $("#txtUsername").keyup(function(e) {
		if(e.keyCode == 13) {
			clearInterval(showtime);
			doSearch();				
		}
	}); //end keyup	
	
	preview();
}); //end doc ready  
function preview(){
	var famous = [
	{username:'shupp', apiName: 'twitter'},
	{username:'cnbc', apiName: 'flickr'},
	{username:'dailypush', apiName: 'facebook'},
	{username:'luciana123_2002', apiName: 'lastfm'},
	{username:'shupp', apiName: 'flickr'},
	{username:'alx3', apiName: 'blogger'},
	{username:'cvs', apiName: 'delicious'},
	{username:'goal', apiName: 'flickr'},
	{username:'Rutte', apiName: 'delicious'},
	{username:'goalUSA', apiName: 'twitter'} 
	];
	var i=0;
	var j=0;
	var count = famous.length - 1;
	social.search(famous[i].username, 'profile', famous[i].apiName, {disableStats: true});
	showtime = setInterval(function()
	{
		$('#api').fadeTo("slow",0);
		var apiName= famous[i].apiName;
var apiNameDiv = "#"+apiName.toLowerCase();
		var image = "images/icon_bw_" + apiName + ".png";				
		$(apiNameDiv).attr("src", image);
		$(apiNameDiv).attr("alt", apiName);
		
		i = Math.floor(Math.random()*count);
    	if(i != j){	
			//$('#api').fadeOut("slow").load( social.search(famous[i].username, 'profile', famous[i].apiName, {disableStats: true})).fadeIn("slow");
			social.search(famous[i].username, 'profile', famous[i].apiName, {disableStats: true});
			$('#api').fadeTo("slow",0.5)
			j = i;
		}else{
			i = Math.floor(Math.random()*count);
		}
	}, 10000);
	

}

jQuery.fn.hint = function (blurClass) {
  if (!blurClass) { 
    blurClass = 'blur';
  }

  return this.each(function () {
    // get jQuery version of 'this'
    var $input = jQuery(this),

    // capture the rest of the variable to allow for reuse
      title = $input.attr('title'),
      $form = jQuery(this.form),
      $win = jQuery(window);

    function remove() {
      if ($input.val() === title && $input.hasClass(blurClass)) {
        $input.val('').removeClass(blurClass);
      }
    }

    // only apply logic if the element has the attribute
    if (title) { 
      // on blur, set value to title attr if text is blank
      $input.blur(function () {
        if (this.value === '') {
          $input.val(title).addClass(blurClass);
        }
      }).focus(remove).blur(); // now change all inputs to title

      // clear the pre-defined text when form is submitted
      $form.submit(remove);
      $win.unload(remove); // handles Firefox's autocomplete
    }
  });
};
