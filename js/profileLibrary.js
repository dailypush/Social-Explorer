/********************************************************************/    
var PATH ='http://www.souocara.com/';
function showProfile(){
	resetProfile();
     var obj = social.identities;                
     var ul = $('<div class="profileList"></div>').appendTo('#profile');
	var divStats = $('<ul class="stats" id="thumbs"></ul>').appendTo('#profile');  			   
	 
     if(obj.length > 0){ 	
		 for (var x = 0; x < obj.length; x++) { 	
			var apiName = social.identities[0].apiName;  	
			//Common Header
			var profileName = obj[x].profile.name;
			var profileImageUrl = obj[x].profile.profileImage;
			var profileImgDiv = "#"+obj[x].apiName.toLowerCase();
			var apiImgClass = apiName.toLowerCase()+"_icon";				
			$('#api').attr("class",apiImgClass);
			$(profileImgDiv).attr("alt", profileName);				
			$(profileImgDiv).attr("src", profileImageUrl);
			$('#profileName').html('<div id="head-image"><img src="' +  profileImageUrl +'"width=64 height=64></div>' +apiName + ' - ' +obj[x].profile.name);
				
			if(!isEmpty(obj[x].profile.createdat))
				$('Member since: '+ formatDate(obj[x].apiName, obj[x].profile.createdat)).appendTo(ul);			
		
			if(!isEmpty(obj[x].profile.title))
				$('Title: '+ obj[x].profile.title).appendTo(ul);
			if(!isEmpty(obj[x].profile.description))
				$('<span class="labelData">' + obj[x].profile.description + '</span>').appendTo(ul);
				
			//Common data fields
			if(!isEmpty(obj[x].profile.homepage))
				$('<span class="label">homepage:</span><span class="labelData"><a href="' + obj[x].profile.homepage  + '" target="_blank">' + obj[x].profile.homepage + '</a></span>').appendTo(ul);
			if(!isEmpty(obj[x].profile.url))
				$('<span class="label">url:</span><span class="labelData"><a href="' + obj[x].profile.url + '" target="_blank">' + obj[x].profile.url + '</a></span>').appendTo(ul);
			if(!isEmpty(obj[x].profile.location))
				$('<span class="label">location:</span><span class="labelData">' + obj[x].profile.location + '</span>').appendTo(ul);
			if(!isEmpty(obj[x].profile.language))
				$('<span class="label">language:</span><span class="labelData">' + obj[x].profile.language + '</span>').appendTo(ul);			
			if(!isEmpty(obj[x].profile.timezone))
				$('<span class="label">timezone:</span><span class="labelData">' + obj[x].profile.timezone + '</span>').appendTo(ul);
			if(!isEmpty(obj[x].profile.age))
				$('<span class="label">age:</span><span class="labelData">' + obj[x].profile.age + '</span>').appendTo(ul);			
			if(!isEmpty(obj[x].profile.gender))
				$('<span class="label">gender:</span><span class="labelData">' + obj[x].profile.gender + '</span>').appendTo(ul);
			if(!isEmpty(obj[x].profile.birthday))
				$('<span class="label">birthday:</span><span class="labelData">' + obj[x].profile.birthday + '</span>').appendTo(ul);			     
			
			$('</div><div class="clearfix"><br><br><br></div>').appendTo(ul);
			// Specific API data values				 	
			switch(apiName.toUpperCase()){
				case "TWITTER":
					showTwitterProfile(ul, divStats, obj, x);
					break;
				case "FACEBOOK":
					showFacebookProfile(ul, divStats, obj, x);
					break;	
				case "DELICIOUS":
					showDeliciousProfile(ul, divStats, obj, x);			
					break;
				case "FRIENDFEED":
					showFriendFeedProfile(ul, divStats, obj, x);				
					break;			
				case "MEME":
					showMemeYQLProfile(ul, divStats, obj, x);
					break;
				case "FLICKR":
					showFlickrYQLProfile(ul, divStats, obj, x);
					break;			
				case "MYBLOGLOG":
					showMyBloglogYQLProfile(ul, divStats, obj, x);
					break;
				case "LASTFM":
					showLastFMProfile(ul, divStats, obj, x);
					break;
				case "GITHUB":
					showGitHubProfile(ul, divStats, obj, x);
					break;
				case "YOUTUBE":
					showYoutubeProfile(ul, divStats, obj, x);
					break;
				case "HI5":
					showHi5Profile(ul, divStats, obj, x);
					break;
				case "BLOGGER":
					showBloggerProfile(ul, divStats, obj, x);
					break;
				case "TUMBLR":
					showTumblrProfile(ul, divStats, obj, x);
					break;	
				default:
					showDefaultProfile(ul, divStats, obj, x);
					break;																			  		
			}//end switch
						
		 animate();
		}//end for loop
   }//end if					
}//end showProfileNew

animate = function(){
	var image_holder = $("#screenshots");
	var thumbnail_holder = $("#thumbs");			
	var closer = image_holder.next();
	var images = image_holder.children('li');
	
	 // Close button click action
	  closer.click(function(e){
		// Hide images and fade out the image holder, and the close button.
		images.hide()
		image_holder.fadeOut()
		closer.fadeOut()
		thumbnail_holder.find('li.current').removeClass('current');
		setTimeout(function(){
		  //default_holder.animate({height: '401px'}); // Back to small
		}, 0)
		image_holder.find('.shown-screenshot').removeClass('shown-screenshot').fadeOut() // Remove the class
	  });

	thumbnail_holder.find('li a').click(function(e){ 
	// Stop doing what you're doing!
	e.preventDefault() 
	
	// Show the holder and the close button
	image_holder.show()
	closer.show()
	
	// We need this to find out what we're showing
	var id = $(this).attr('rel'); 

	// Find the full screenshot for this thumbnail.
	var full = $('#'+id+'_full');

	thumbnail_holder.find('li.current').removeClass('current');
	$(this).parent().addClass("current");
	
	time = 500;
	
	// Fade and show at the same time! setTimeout makes for synchronicity.
	setTimeout(function(){
	  full.addClass('shown-screenshot').show().fadeTo(0, 0).fadeTo(time, 1).addClass('shown-screenshot');
	}, 0)

 });
}

function showTumblrProfile(ul, divStats, obj, x){
	var label='';
	//Posts
	if(!isEmpty(obj[x].profile.posted)){
		label ='<span>Posts</span>';
		if(!obj[x].disableStats){
			$('<li class="stat"><a rel="screenshot_1_1" href="#" onblur="restore(this);" onclick="getPosts(this,\'' + obj[x].apiName + '\');">' + obj[x].profile.posted + label+'</a></li>').appendTo(divStats); 
		}else{
			$('<li class="statDisable">'+ obj[x].profile.posted + label +'</li>').appendTo(divStats); 	
		}
	}	
	//Feeds
	if(!isEmpty(obj[x].profile.favourites)){			
		if(obj[x].profile.favourites > 0){
			label ='<span>Feeds</span>';
			if(!obj[x].disableStats){	
				$('<li class="stat"><a rel="screenshot_1_2" href="#"  onblur="restore(this);" onclick="getFavourites(this,\'' + obj[x].apiName + '\');">' +  obj[x].profile.favourites + label+'</a></li>').appendTo(divStats);
			}else{
				$('<li class="statDisable">'+ obj[x].profile.favourites + label +'</li>').appendTo(divStats); 	
			}			
		}
	}
}// end showTumblrProfile

function showBloggerProfile(ul, divStats, obj, x){
	var label='';	
	//Posts
	if(obj[x].profile.posted > 0){
		label ='<span>Blogs</span>';
		if(!obj[x].disableStats){	
			$('<li class="stat"><a rel="screenshot_1_1" href="#" onblur="restore(this);" onclick="getPosts(this,\'' + obj[x].apiName + '\');">' + obj[x].profile.posted + label +'</a></li>').appendTo(divStats);
		}else{
			$('<li class="statDisable">'+ obj[x].profile.posted + label +'</li>').appendTo(divStats); 	
		}
	}
}// end showBloggerProfile
	
function showHi5Profile(ul, divStats, obj, x){
	var label='';	
	//Friends
	if(obj[x].profile.friends > 0){	
		label ='<span>Knows</span>';
		if(!obj[x].disableStats){
			$('<li class="stat"><a rel="screenshot_1_1" href="#" onblur="restore(this);" onclick="getFriends(this,\'' + obj[x].apiName + '\');">' + obj[x].profile.friends + label +'</a></li>').appendTo(divStats);
		}else{
			$('<li class="statDisable">'+ obj[x].profile.friends + label +'</li>').appendTo(divStats); 	
		}
	}
}// end showHi5Profile


function showTwitterProfile(ul, divStats, obj, x){
	var label='';
	//Posts
	if(!isEmpty(obj[x].profile.posted)){
		label = '<span>Tweets</span>';
		if(!obj[x].disableStats){
			$('<li class="stat"><a rel="screenshot_1_1" href="#"  onblur="restore(this);" onblur="restore(this);" onclick="getPosts(this,\'' + obj[x].apiName + '\');">' + obj[x].profile.posted + label +'</a></li>').appendTo(divStats); 	
		}else{
			$('<li class="statDisable">'+ obj[x].profile.posted + label +'</li>').appendTo(divStats); 	
		}
	}
	//Followers
	if(!isEmpty(obj[x].profile.followers) && obj[x].profile.followers!="0"){
		label = '<span>Followers</span>';		
		if(!obj[x].disableStats){
			$('<li class="stat"><a rel="screenshot_1_2" href="#" onblur="restore(this);" onclick="getFollowers(this,\'' + obj[x].apiName + '\');">' + obj[x].profile.followers +  label +'</a></li>').appendTo(divStats);	
		}else{
			$('<li class="statDisable">'+ obj[x].profile.followers + label +'</li>').appendTo(divStats); 	
		}
	}
	//Friends
	if(obj[x].profile.friends > 0){	
		label = '<span>Following</span>';
		if(!obj[x].disableStats){
			$('<li class="stat"><a rel="screenshot_1_3" href="#" onblur="restore(this);" onclick="getFriends(this,\'' + obj[x].apiName + '\');">' + obj[x].profile.friends + label +'</a></li>').appendTo(divStats);
		}else{
			$('<li class="statDisable">'+ obj[x].profile.friends + label +'</li>').appendTo(divStats); 	
		}
	}
	//Favorites
	if(!isEmpty(obj[x].profile.favourites)){			
		if(obj[x].profile.favourites > 0){
			label = '<span>Favorites</span>';
			if(!obj[x].disableStats){
				$('<li class="stat"><a rel="screenshot_1_4" href="#"  onblur="restore(this);" onclick="getFavourites(this,\'' + obj[x].apiName + '\');">' +  obj[x].profile.favourites + label +'</a></li>').appendTo(divStats);
			}else{
				$('<li class="statDisable">'+ obj[x].profile.favourites + label +'</li>').appendTo(divStats); 	
			}	
		}
	}
}// end showTwitterProfile

function showFacebookProfile(ul, divStats, obj, x){
	var label='';
	//Posts
	if(!isEmpty(obj[x].profile.posted)){
		label = '<span>Posts</span>';
		if(!obj[x].disableStats){
			$('<li class="stat"><a rel="screenshot_1_1" href="#"  onblur="restore(this);" onclick="getPosts(this,\'' + obj[x].apiName + '\');">' + obj[x].profile.posted + label+'</a></li>').appendTo(divStats); 
		}else{
			$('<li class="statDisable">'+ obj[x].profile.posted + label +'</li>').appendTo(divStats); 	
		}			
	}
	//Followers
	if(!isEmpty(obj[x].profile.followers) && obj[x].profile.followers!="0"){
		label = '<span>Followers</span>';
		if(!obj[x].disableStats){		
			$('<li class="stat"><a rel="screenshot_1_2" href="#" onblur="restore(this);" onclick="getFollowers(this,\'' + obj[x].apiName + '\');">' + obj[x].profile.followers + label+'</a></li>').appendTo(divStats);	
		}else{
			$('<li class="statDisable">'+ obj[x].profile.followers + label +'</li>').appendTo(divStats); 	
		}
	}
	//Friends		
	//$('#buttons').show();
	 var ulSide = $('<ul class="profile-list"></ul>').appendTo('#profile');
	 var title = $('<h1></h1>').appendTo('#profile');  
	var f = 3;// obj[x].profile.friends;
	for (var j = 0; j < f.length; j++) {
		$(ulSide).append('<li><img src="' +  f[j].profileImage +'"width=32 height=32>' + f[j].name+ '<br><a href="'+ f[j].url+'" target="_blank">' + f[j].url + '</a></li>');	 	  		 	           			 
	}	
	//Favorites
	if(!isEmpty(obj[x].profile.favourites)){			
		if(obj[x].profile.favourites > 0){
			label = '<span>Favorites</span>';
			if(!obj[x].disableStats){	
				$('<li><a rel="screenshot_1_3" href="#" class="stat" onblur="restore(this);" onclick="getFavourites(this,\'' + obj[x].apiName + '\');">' +  obj[x].profile.favourites + label+'</a></li>').appendTo(divStats);
			}else{
				$('<li class="statDisable">'+ obj[x].profile.favourites + label +'</li>').appendTo(divStats); 	
			}
		}
	}
}//end showFacebookProfile

function showDeliciousProfile(ul, divStats, obj, x){
	var label='';
	//Posts
	if(!isEmpty(obj[x].profile.posted)){
		label = '<span>Posts</span>';
		if(!obj[x].disableStats){
			$('<li class="stat"><a rel="screenshot_1_1"  href="#"  onblur="restore(this);" onclick="getPosts(this,\'' + obj[x].apiName + '\');">' + obj[x].profile.posted + label+'</a></li>').appendTo(divStats); 
		}else{
			$('<li class="statDisable">'+ obj[x].profile.posted + label +'</li>').appendTo(divStats); 	
		}
	}
	//Network Fans
	if(!isEmpty(obj[x].profile.followers) && obj[x].profile.followers!="0"){
		label = '<span>Network Fans</span>';
		if(!obj[x].disableStats){		
			$('<li class="stat"><a rel="screenshot_1_2"  href="#" onblur="restore(this);" onclick="getFollowers(this,\'' + obj[x].apiName + '\');">' + obj[x].profile.followers + label+'</a></li>').appendTo(divStats);
		}else{
			$('<li class="statDisable">'+ obj[x].profile.followers + label +'</li>').appendTo(divStats); 	
		}
	}
	//Network Members
	if(obj[x].profile.friends > 0){
		label = '<span>Network Members</span>';
		if(!obj[x].disableStats){
			$('<li class="stat"><a href="#" onblur="restore(this);" onclick="getFriends(this,\'' + obj[x].apiName + '\');">' + obj[x].profile.friends + label+'</a></li>').appendTo(divStats);
		}else{
			$('<li class="statDisable">'+ obj[x].profile.friends + label +'</li>').appendTo(divStats); 	
		}
	}
	//Favorites
	if(!isEmpty(obj[x].profile.favourites)){			
		if(obj[x].profile.favourites > 0){
			label = '<span>Favorites</span>';
			if(!obj[x].disableStats){	
				$('<li class="stat"><a rel="screenshot_1_3"  href="#" onblur="restore(this);" onclick="getFavourites(this,\'' + obj[x].apiName + '\');">' +  obj[x].profile.favourites + label+'</a></li>').appendTo(divStats);
			}else{
				$('<li class="statDisable">'+ obj[x].profile.favourites + label +'</li>').appendTo(divStats); 	
			}
		}
	}
}// end showDeliciousProfile

function showFriendFeedProfile(ul, divStats, obj, x){
	//Posts
	if(!isEmpty(obj[x].profile.posted)){
		label = '<span>Posts</span>';
		if(!obj[x].disableStats){
			$('<li class="stat"><a rel="screenshot_1_1"  href="#"  onblur="restore(this);" onclick="getPosts(this,\'' + obj[x].apiName + '\');">' + obj[x].profile.posted + label+'</a></li>').appendTo(divStats); 
		}else{
			$('<li class="statDisable">'+ obj[x].profile.posted + label +'</li>').appendTo(divStats); 	
		}
	}
	//Followers
	if(!isEmpty(obj[x].profile.followers) && obj[x].profile.followers!="0"){
		label = '<span>Followers</span>';
		if(!obj[x].disableStats){
			$('<li class="stat"><a rel="screenshot_1_2" href="#" onblur="restore(this);" onclick="getFollowers(this,\'' + obj[x].apiName + '\');">' + obj[x].profile.followers + label+'</a></li>').appendTo(divStats);	
		}else{
			$('<li class="statDisable">'+ obj[x].profile.followers + label +'</li>').appendTo(divStats); 	
		}				
	}
	//Friends
	if(obj[x].profile.friends > 0){	
		label = '<span>Following</span>';
		if(!obj[x].disableStats){
			$('<li class="stat"><a rel="screenshot_1_3" href="#" onblur="restore(this);" onclick="getFriends(this,\'' + obj[x].apiName + '\');">' + obj[x].profile.friends + label+'</a></li>').appendTo(divStats);
		}else{
			$('<li class="statDisable">'+ obj[x].profile.friends + label +'</li>').appendTo(divStats); 	
		}			
	}
	//Favorites
	if(!isEmpty(obj[x].profile.favourites)){			
		if(obj[x].profile.favourites > 0){	
			label = '<span>Favorites</span>';
			if(!obj[x].disableStats){
				$('<li class="stat"><a rel="screenshot_1_4" href="#" onblur="restore(this);" onclick="getFavourites(this,\'' + obj[x].apiName + '\');">' +  obj[x].profile.favourites + label+'</a></li>').appendTo(divStats);
			}else{
				$('<li class="statDisable">'+ obj[x].profile.favourites + label +'</li>').appendTo(divStats); 	
			}		
		}
	}
}// end showFriendFeedProfile

function showMemeProfile(ul, divStats, obj, x){
	//Posts
	if(!isEmpty(obj[x].profile.posted)){
		label = '<span>Posts</span>';
		if(!obj[x].disableStats){
			$('<li class="stat"><a rel="screenshot_1_1" href="#" onblur="restore(this);" onclick="getPosts(this,\'' + obj[x].apiName + '\');">' + obj[x].profile.posted + label+'</a></li>').appendTo(divStats); 
		}else{
			$('<li class="statDisable">'+ obj[x].profile.posted + label +'</li>').appendTo(divStats); 	
		}
	}
	//Followers
	if(!isEmpty(obj[x].profile.followers) && obj[x].profile.followers!="0"){		
		label = '<span>Followers</span>';
		if(!obj[x].disableStats){
		$('<li class="stat"><a rel="screenshot_1_2"  href="#" onblur="restore(this);" onclick="getFollowers(this,\'' + obj[x].apiName + '\');">' + obj[x].profile.followers + label+'</a></li>').appendTo(divStats);	
		}else{
			$('<li class="statDisable">'+ obj[x].profile.followers + label +'</li>').appendTo(divStats); 	
		}		
	}
	//Friends
	if(obj[x].profile.friends > 0){	
		label = '<span>Following</span>';
		if(!obj[x].disableStats){
		$('<li class="stat"><a href="#"  onblur="restore(this);" onclick="getFriends(this,\'' + obj[x].apiName + '\');">' + obj[x].profile.friends + label+'</a></li>').appendTo(divStats);
		}else{
			$('<li class="statDisable">'+ obj[x].profile.friends + label +'</li>').appendTo(divStats); 	
		}
	}
	//Favorites
	if(!isEmpty(obj[x].profile.favourites)){			
		if(obj[x].profile.favourites > 0){	
			label = '<span>Favorites</span>';
			if(!obj[x].disableStats){
				$('<li class="stat"><a rel="screenshot_1_3" href="#"  onblur="restore(this);" onclick="getFavourites(this,\'' + obj[x].apiName + '\');">' +  obj[x].profile.favourites + label+'</a></li>').appendTo(divStats);
			}else{
				$('<li class="statDisable">'+ obj[x].profile.favourites + label +'</li>').appendTo(divStats); 	
			}			
		}
	}
}// end showMemeProfile

function showFlickrYQLProfile(ul, divStats, obj, x){
	//Photostream
	if(!isEmpty(obj[x].profile.posted)){
		label = 'My <span>Photos</span>';
		if(!obj[x].disableStats){
			$('<li class="stat" ><a rel="screenshot_1_1" href="#" onblur="restore(this);" onclick="getPosts(this,\'' + obj[x].apiName + '\');">' + label +'</a></li>').appendTo(divStats); 
		}else{
			$('<li class="statDisable">'+ label +'</li>').appendTo(divStats); 	
		}		
	}
	//Testimonials
	if(!isEmpty(obj[x].profile.followers) && obj[x].profile.followers!="0"){		
		//$('<a href="#" class="stat" onclick="getFollowers(this,\'' + obj[x].apiName + '\');">' + obj[x].profile.followers + '<span>Testimonials</span></a></li>').appendTo(divStats);
	}
	//Friends
	if(obj[x].profile.friends > 0){
		label = '<span>Friends</span>';
		if(!obj[x].disableStats){
			$('<li class="stat" ><a rel="screenshot_1_2" href="#" onblur="restore(this);" onclick="getFriends(this,\'' + obj[x].apiName + '\');">' + obj[x].profile.friends + label +'</a></li>').appendTo(divStats);
		}else{
			$('<li class="statDisable">'+ obj[x].profile.friends + label +'</li>').appendTo(divStats); 	
		}
	}
	//Favorites
	if(!isEmpty(obj[x].profile.favourites)){			
		if(obj[x].profile.favourites > 0){	
			label = '<span>Favorites</span>';
			if(!obj[x].disableStats){
				$('<li class="stat"><a rel="screenshot_1_3" href="#" onblur="restore(this);" onclick="getFavourites(this,\'' + obj[x].apiName + '\');">' +  obj[x].profile.favourites + label+'</a></li>').appendTo(divStats);
			}else{
				$('<li class="statDisable">'+ obj[x].profile.favourites + label +'</li>').appendTo(divStats); 	
			}						
		}
	}	
}//end showFlickrYQLProfile

function showMyBloglogYQLProfile(ul, divStats, obj, x){
	//Posts
	if(!isEmpty(obj[x].profile.posted)){
		label = '<span>Posts</span>';
		if(!obj[x].disableStats){
			$('<li class="stat"><a rel="screenshot_1_1"  href="#"  onblur="restore(this);" onclick="getPosts(this,\'' + obj[x].apiName + '\');">' + obj[x].profile.posted + label+'</a></li>').appendTo(divStats); 
		}else{
			$('<li class="statDisable">'+ obj[x].profile.posted + label +'</li>').appendTo(divStats); 	
		}
	}
	//Followers
	if(!isEmpty(obj[x].profile.followers) && obj[x].profile.followers!="0"){		
		label = '<span>Followers</span>';
		if(!obj[x].disableStats){
			$('<li class="stat" ><a rel="screenshot_1_2" href="#" onblur="restore(this);" onclick="getFollowers(this,\'' + obj[x].apiName + '\');">' + obj[x].profile.followers + label+'</a></li>').appendTo(divStats);	
		}else{
			$('<li class="statDisable">'+ obj[x].profile.followers + label +'</li>').appendTo(divStats); 	
		}
	}
	//Friends
	if(obj[x].profile.friends > 0){	
		label = '<span>Following</span>';
		if(!obj[x].disableStats){
			$('<li class="stat"><a rel="screenshot_1_3"  href="#"  onblur="restore(this);" onclick="getFriends(this,\'' + obj[x].apiName + '\');">' + obj[x].profile.friends + label+'</a></li>').appendTo(divStats);
		}else{
			$('<li class="statDisable">'+ obj[x].profile.friends + label +'</li>').appendTo(divStats); 	
		}		
	}
	//Favorites
	if(!isEmpty(obj[x].profile.favourites)){			
		if(obj[x].profile.favourites > 0){	
			label = '<span>Favorites</span>';
			if(!obj[x].disableStats){
				$('<li class="stat"><a rel="screenshot_1_4" href="#" onblur="restore(this);" onclick="getFavourites(this,\'' + obj[x].apiName + '\');">' +  obj[x].profile.favourites + label+'</a></li>').appendTo(divStats);
			}else{
				$('<li class="statDisable">'+ obj[x].profile.favourites + label +'</li>').appendTo(divStats); 	
			}	
		}
	}
}//end showMyBloglogYQLProfile

function showLastFMProfile(ul, divStats, obj, x){
	//PlayList
	if(!isEmpty(obj[x].profile.posted)){
		label = 'My <span>Playlist</span>';
		if(!obj[x].disableStats){
			$('<li class="stat"><a rel="screenshot_1_1" href="#"  onblur="restore(this);" onclick="getPosts(this,\'' + obj[x].apiName + '\');">' + label +'</a></li>').appendTo(divStats); 		
		}else{
			$('<li class="statDisable">' + label +'</li>').appendTo(divStats); 	
		}
	}
	//Subscribers
	if(!isEmpty(obj[x].profile.followers) && obj[x].profile.followers!="0"){				
		label = '<span>Subscribers</span>';
		if(!obj[x].disableStats){
			$('<li class="stat"><a rel="screenshot_1_2"  href="#" >' + obj[x].profile.followers + label+'</a></li>').appendTo(divStats);					
		}else{
			$('<li class="statDisable">'+ obj[x].profile.followers + label +'</li>').appendTo(divStats); 	
		}
	}
	//Playcount
	if(obj[x].profile.friends > 0){		
		label = '<span>Playcount</span>';
		if(!obj[x].disableStats){
			$('<li class="stat"><a rel="screenshot_1_3"  href="#" >' + obj[x].profile.friends + label+'</a></li>').appendTo(divStats);
		}else{
			$('<li class="statDisable">'+ obj[x].profile.friends + label +'</li>').appendTo(divStats); 	
		}
		
	}
	//Favorites
	if(!isEmpty(obj[x].profile.favourites)){			
		if(obj[x].profile.favourites > 0){	
			label = '<span>Favorites</span>';
			if(!obj[x].disableStats){
				$('<li class="stat"><a rel="screenshot_1_4" href="#" onblur="restore(this);" onclick="getFavourites(this,\'' + obj[x].apiName + '\');">' +  obj[x].profile.favourites + '</a></li>').appendTo(divStats);
			}else{
				$('<li class="statDisable">'+ obj[x].profile.favourites + label +'</li>').appendTo(divStats); 	
			}
		}
	}					
}//end showLastFMProfile

function showGitHubProfile(ul, divStats, obj, x){
	//Repositories
	if(!isEmpty(obj[x].profile.posted)){
		label = '<span>Repos</span>';
		if(!obj[x].disableStats){
			$('<li class="stat"><a rel="screenshot_1_1" href="#"  onblur="restore(this);" onclick="getPosts(this,\'' + obj[x].apiName + '\');">' + obj[x].profile.posted + label+'</a></li>').appendTo(divStats); 
		}else{
			$('<li class="statDisable">'+ obj[x].profile.posted + label +'</li>').appendTo(divStats); 	
		}		
	}
	//Followers
	if(!isEmpty(obj[x].profile.followers) && obj[x].profile.followers!="0"){		
		label = '<span>Followers</span>';
		if(!obj[x].disableStats){
			$('<li class="stat"><a rel="screenshot_1_2"  href="#" onclick="getFollowers(this,\'' + obj[x].apiName + '\');">' + obj[x].profile.followers + label+'</a></li>').appendTo(divStats);	
		}else{
			$('<li class="statDisable">'+ obj[x].profile.followers + label +'</li>').appendTo(divStats); 	
		}
	}
	//Friends
	if(obj[x].profile.friends > 0){	
		label = '<span>Following</span>';
		if(!obj[x].disableStats){
			$('<li class="stat"><a rel="screenshot_1_3"  href="#" onblur="restore(this);" onclick="getFriends(this,\'' + obj[x].apiName + '\');">' + obj[x].profile.friends + label+'</a></li>').appendTo(divStats);
		}else{
			$('<li class="statDisable">'+ obj[x].profile.friends + label +'</li>').appendTo(divStats); 	
		}
	}
	//Gist
	if(!isEmpty(obj[x].profile.favourites)){
		if(obj[x].profile.favourites > 0){	
			label = '<span>Gist</span>';
			if(!obj[x].disableStats){
				$('<li class="stat"><a rel="screenshot_1_4" href="#"  onblur="restore(this);" onclick="getFavourites(this,\'' + obj[x].apiName + '\');">' +  obj[x].profile.favourites + label+'</a></li>').appendTo(divStats);				
			}else{
				$('<li class="statDisable">'+ obj[x].profile.favourites + label +'</li>').appendTo(divStats); 	
			}
		}
	}
}//end showGitHubProfile

function showYoutubeProfile(ul, divStats, obj, x){
	//Videos
	if(!isEmpty(obj[x].profile.posted)){
		label = 'My <span>Videos</span>';
		if(!obj[x].disableStats){
			$('<li class="stat" ><a rel="screenshot_1_1" href="#" onblur="restore(this);" onclick="getPosts(this,\'' + obj[x].apiName + '\');">' + label +'</a></li>').appendTo(divStats); 	
		}else{
			$('<li class="statDisable">'+ obj[x].profile.posted + label +'</li>').appendTo(divStats); 	
		}
	}
	//Favorites
	if(!isEmpty(obj[x].profile.favourites)){			
		if(obj[x].profile.favourites > 0){	
			label = 'My <span>Favs</span>';
			if(!obj[x].disableStats){
				$('<li class="stat"><a rel="screenshot_1_2" href="#"  onblur="restore(this);" onclick="getFavourites(this,\'' + obj[x].apiName + '\');">'+ label+'</a></li>').appendTo(divStats); 	
			}else{
				$('<li class="statDisable">'+ obj[x].profile.favourites + label +'</li>').appendTo(divStats); 	
			}			
		}
	}
}// end showYoutubeProfile

function showDefaultProfile(ul, divStats, obj, x){
	//Posts
	if(!isEmpty(obj[x].profile.posted)){
		$('<li><a rel="screenshot_1_1"  href="#" class="stat" onblur="restore(this);" onclick="getPosts(this,\'' + obj[x].apiName + '\');">' + obj[x].profile.posted + '<span>Posts</span></a></li>').appendTo(divStats); 
	}
	//Followers
	if(!isEmpty(obj[x].profile.followers) && obj[x].profile.followers!="0"){		
		$('<li><a rel="screenshot_1_2"  href="#" class="stat" onblur="restore(this);" onclick="getFollowers(this,\'' + obj[x].apiName + '\');">' + obj[x].profile.followers + '<span>Followers</span></a></li>').appendTo(divStats);	
	}
	//Friends
	if(obj[x].profile.friends > 0){	
		$('<li><a rel="screenshot_1_3"  href="#" class="stat" onblur="restore(this);" onclick="getFriends(this,\'' + obj[x].apiName + '\');">' + obj[x].profile.friends + '<span>Following</span></a></li>').appendTo(divStats);
	}
	//Favorites
	if(!isEmpty(obj[x].profile.favourites)){			
		if(obj[x].profile.favourites > 0){	
			$('<li><a rel="screenshot_1_4"  href="#" class="stat" onblur="restore(this);" onclick="getFavourites(this,\'' + obj[x].apiName + '\');">' +  obj[x].profile.favourites + '<span>Favorites</span></a></li>').appendTo(divStats);
		}
	}
}//end showGitHubProfile

function setIconImage(apiName, imageProfile){
	var imgDiv = "#"+apiName.toLowerCase();	
	 $(imgDiv).attr("alt", profileName);
	if(imgDiv === "#del.icio.us"){
		imgDiv = "#delicious";									
	}
	$("#"+apiName.toLowerCase()).attr("src", imageProfile); 
}

function restore(obj){
	obj.className='stat';
}

function getPosts(obj, apiName){
 
	$("#buttons").hide();
	var id = $(obj).attr('rel', 'screenshot_1_1'); 
	obj.className='current';
	var username = $("#txtUsername").attr("value");		
	social.search(username, "posted", apiName);	
}

function getFriends(obj, apiName){
	$("#buttons").hide();
	var id = $(obj).attr('rel', 'screenshot_1_1'); 
	obj.className='current';	
	var username = $("#txtUsername").attr("value");
	social.search(username, "friends", apiName);	
}

function getFollowers(obj, apiName){
	$("#buttons").hide();
	var id = $(obj).attr('rel', 'screenshot_1_1'); 
	obj.className='current';		
	var username = $("#txtUsername").attr("value");		
	social.search(username, "followers", apiName);	
}

function getFavourites(obj, apiName){
	$("#buttons").hide();
	obj.className='current';
	var id = $(obj).attr('rel', 'screenshot_1_1'); 
	var username = $("#txtUsername").attr("value");		
	social.search(username, "favourites", apiName);	
}

/* CLEAR SEARCH RESULTS */        
function resetProfile(){
    $('#profile').html(''); 
	$('#posts').html(''); 	  
	
} 
/********************************************************************/   
var parseProfileData = function(data, socialItem){	
	var success = false;
	if(!isObject(data)){					    				
		data = eval("(" + data + ")");
	}
	socialItem.profile = {};	
	switch(socialItem.apiName.toUpperCase()){
		case "TWITTER":
			success = parseTwitterProfileResponse(data, socialItem);
			break;
		case "FACEBOOK":
			success = parseFacebookProfileResponse(data, socialItem);
			break;	
		case "DELICIOUS":
			success = parseDeliciousProfileResponse(data, socialItem);			
			break;
		case "FRIENDFEED":
			success = parseFriendFeedProfileResponse(data, socialItem);				
			break;			
		case "MEME":
			success = parseMemeYQLProfileResponse(data, socialItem);
			break;
		case "FLICKR":
			success = parseFlickrYQLProfileResponse(data, socialItem);
			break;			
		case "MYBLOGLOG":
			success = parseMyBloglogYQLProfileResponse(data, socialItem);
			break;
		case "LASTFM":
			success = parseLastFMProfileResponse(data, socialItem);
			break;
		case "GITHUB":
			success = parseGitHubProfileResponse(data, socialItem);
			break;
		case "YOUTUBE":
			success = parseYoutubeProfileResponse(data, socialItem);
			break;
		case "HI5":
			success = parseHi5ProfileResponse(data, socialItem);
			break;
		case "BLOGGER":
			success = parseBloggerProfileResponse(data, socialItem);
			break;
		case "TUMBLR":
			success = parseTumblrProfileResponse(data, socialItem);
			break;																			  		
	}					
	if(success){			
            social.identities[social.identities.length] = socialItem;						
            showProfile();
     }
}//end function

var parseFlickrYQLProfileResponse = function(data, socialItem){
	var retVal = false;
	if( data != null){				
		if( data.query != null){				
			if( data.query.results != null){											
				if( data.query.results.img != null){
					var posName = data.query.results.img.alt.indexOf("'s photostream page");
					var name = data.query.results.img.alt.substr(2,posName);					
					socialItem.profile.name = name;
					if(name == ""){
						socialItem.profile.name = social.username;
					}
					if( data.query.results.img.src != null){
						var posId = data.query.results.img.src.indexOf("#");
						var userId = data.query.results.img.src.substr(posId+1);																	
						socialItem.profile.username = userId;
						socialItem.profile.profileImage = data.query.results.img.src;
						social.userid = userId;
					}
					retVal = true;											
				}//end if img not null
				if( data.query.results.div != null){
						
						for(var i=0; i< data.query.results.div.length; i++){
							if( data.query.results.div[i].dl != null){
								if( data.query.results.div[i].dl.length != null){
									for(var j=0; j< data.query.results.div[i].dl.length; j++){									
										var type = data.query.results.div[i].dl[j].dt.indexOf("Joined");										
										if(type != "-1"){
											socialItem.profile.createdat =data.query.results.div[i].dl[j].dd.p;
										}
										var type = data.query.results.div[i].dl[j].dt.indexOf("Hometown");										
										if(type != "-1"){
											socialItem.profile.location =data.query.results.div[i].dl[j].dd.p;
										}
										var type = data.query.results.div[i].dl[j].dt.indexOf("Occupation");										
										if(type != "-1"){
											socialItem.profile.language =data.query.results.div[i].dl[j].dd.p;
										}
										var type = data.query.results.div[i].dl[j].dt.indexOf("I am");										
										if(type != "-1"){
											socialItem.profile.description =data.query.results.div[i].dl[j].dd.p;
										}
									}//end for
								}else{
									var type = data.query.results.div[i].dl.dt.indexOf("Joined");										
									if(type != "-1"){										
										socialItem.profile.createdat =data.query.results.div[i].dl.dd.p;
									}
								}						
							}
							if( data.query.results.div[i].h3 != null){						
								if( data.query.results.div[i].h3.span != null){	
									//Testimonials
									var type = data.query.results.div[i].h3.content.indexOf("Testimonials");										
									if(type != "-1"){												
										socialItem.profile.followers = data.query.results.div[i].h3.span.content;
									}
														
									if( data.query.results.div[i].h3.span.a != null){	
										if( data.query.results.div[i].h3.span.a.href != null){	
											//fav								
											var type = data.query.results.div[i].h3.content.indexOf("favorite");										
											if(type != "-1"){
												socialItem.profile.favourites = data.query.results.div[i].h3.span.a.content;
											}
											//contacts
											var type = data.query.results.div[i].h3.content.indexOf("Contacts");										
											if(type != "-1"){												
												socialItem.profile.friends = data.query.results.div[i].h3.span.a.content;
											}											
										}																														
									}
								}	
							}				
						}//end for loop
						socialItem.profile.posted="Photostream";
						retVal = true;
					}//end if div not null
					
			}//end yql results
		}//end yql query
	}//end yql												
	return retVal;				
}								
var parseGitHubProfileResponse = function(data, socialItem){
	var retVal = false;
	if(!isObject(data)){					    				
		data = eval("(" + data + ")");
	}
	
	if( data != null){				
		if( data.query != null){				
			if( data.query.results != null){
				if( data.query.results.user != null){
					if( data.query.results.user.name){	
						socialItem.profile.name = data.query.results.user.name;						
					}
					if( data.query.results.user.login){	
						socialItem.profile.name = data.query.results.user.login;					
					}
					socialItem.profile.username = data.query.results.user.login;
					socialItem.profile.description = data.query.results.user.company + " " + data.query.results.user.email;					
					socialItem.profile.profileImage = PATH +'images/icon_color_Github.png';					
					socialItem.profile.timezone ='';
					if(data.query.results.user.id.content)
						socialItem.profile.userid = data.query.results.user.id.content;						
					if(data.query.results.user.location)
						socialItem.profile.location = data.query.results.user.location;
					socialItem.profile.url = '';
					if(data.query.results.user.blog)
						socialItem.profile.homepage = data.query.results.user.blog;
					socialItem.profile.language = '';
					if(data.query.results.user.id.content)
						social.userid = data.query.results.user.id.content;
											
					//issue reading data from object which contains a dash -
					// convert object into a string, replace dash, and convert back to object to access the content of the object.
					// This method does not work in Internet Explorer!
					if(!isMSIE()){	
						//Fix for non IE					
						var fixData = data.query.results.user.toSource().toString();													
					}else{
						//Fix for IE
						var fixData = SerializeObject(data.query.results.user);						
					}					
					var fixedData = fixData.replace(/[\(\)-]/g, "");
					if(!isObject(fixedData)){					    				
						fixedData = eval("(" + fixedData + ")");
					}
					if(fixedData.followingcount != null)
						socialItem.profile.friends = fixedData.followingcount.content;
					if(fixedData.followerscount)
						socialItem.profile.followers = fixedData.followerscount.content;				
					if(fixedData.publicrepocount)
						socialItem.profile.posted = fixedData.publicrepocount.content;					
					if(fixedData.createdat)
						socialItem.profile.createdat = fixedData.createdat.content;
					if(fixedData.publicgistcount)					
						socialItem.profile.favourites = '';//fixedData.publicgistcount.content;
						
					retVal = true;									
				}
			}
		}
	}
	return retVal;
}

var parseFacebookProfileResponse = function(data, socialItem){
	var retVal = false;
	if( data != null){				
		if( data.query != null){				
			if( data.query.results != null){							
				if( data.query.results.div != null){					
					var info = data.query.results.div[0].img;
					if(info != null){				
						socialItem.profile.name = info.alt;
						socialItem.profile.profileImage = "http://facebook.com" + info.src;
						social.userid = info.src.substr(21);
					}
					socialItem.profile.username = social.username;
					socialItem.profile.description = "";
					socialItem.profile.homepage = "http://facebook.com/" + socialItem.profile.username;
					socialItem.profile.friends = new Array();
					$.each(data.query.results.div, function(i, item) {
						if(i!=0){
							socialItem.friend = {};
							var friendInfo = data.query.results.div[i];
							socialItem.friend.name = friendInfo.a.title;
							socialItem.friend.url = friendInfo.a.href;
							socialItem.friend.profileImage = friendInfo.a.img.src;
							socialItem.profile.friends[i-1] = socialItem.friend;
						}						
					});//end each
					
					
					retVal = true;
				}
			}//end yql results
		}//end yql query
	}//end yql
												
	return retVal;				
}
var parseTwitterProfileResponse = function(data, socialItem){
	var retVal = false;
	//if error
	//{"request":"/status/user_timeline/luciana123_2002.json?count=5",
	//"error":"Rate limit exceeded. Clients may not make more than 150 requests per hour."}
	if(data)
	{
		if(data.error){
			alert("error occurred while parseTwitterProfileResponse " + data.error);
			retVal = false;
		}else if(data.protected === true) {
			retVal = false;		
		}else{
			socialItem.profile.name = data.name;
			socialItem.profile.username = data.screen_name;
			socialItem.profile.description = data.description;
			socialItem.profile.profileImage = data.profile_image_url;
			socialItem.profile.friends =data.friends_count;
			socialItem.profile.followers = data.followers_count;
			socialItem.profile.posted =data.statuses_count;
			socialItem.profile.favourites = data.favourites_count;				
			socialItem.profile.createdat = data.created_at;
			socialItem.profile.timezone = data.time_zone;								
			socialItem.profile.userid = data.id;
			socialItem.profile.location = data.location;
			socialItem.profile.url = data.url;
			socialItem.profile.homepage = "http://www.twitter.com/"+ data.screen_name; 
			socialItem.profile.language = '';
			
			social.userid = data.id;
			retVal = true;		
		}//end else
	}// end data if 		
	return retVal;				
}//end parseTwitterProfileReponse

var parseMemeYQLProfileResponse = function(data, socialItem){
	var retVal = false;
	if( data != null){				
		if( data.query != null){				
			if( data.query.results != null){							
				if( data.query.results.meme != null){
					//alert("Meme " + results.meme.name);	
					socialItem.profile.name = data.query.results.meme.title;
					socialItem.profile.username = data.query.results.meme.name;
					socialItem.profile.description = data.query.results.meme.title;
					socialItem.profile.profileImage = data.query.results.meme.avatar_url;
					socialItem.profile.friends ='';
					socialItem.profile.followers = data.query.results.meme.followers;
					socialItem.profile.posted ='';					
					socialItem.profile.favourites = '';					
					socialItem.profile.createdat = data.query.created;
					socialItem.profile.timezone ='';
					socialItem.profile.userid = data.query.results.meme.guid;
					socialItem.profile.location = '';
					socialItem.profile.url = data.query.results.meme.url;
					socialItem.profile.homepage = data.query.results.meme.url;
					socialItem.profile.language = data.query.results.meme.language;
					
					social.userid = data.query.results.meme.guid;						
					retVal = true;					
				}
			}//end yql results
		}//end yql query
	}//end yql												
	return retVal;				
}

var parseFriendFeedProfileResponse = function (data,socialItem){
	var retVal = false;
	if(data != null){															
			socialItem.profile.name = data.name;
			socialItem.profile.username = data.id;	
			socialItem.profile.description = '';			
			socialItem.profile.profileImage = 'http://friendfeed-api.com/v2/picture/'+data.id;
			if(data.subscriptions != null)
				socialItem.profile.friends = data.subscriptions.length;
			if(data.subsbribers != null)			
				socialItem.profile.followers =data.subsbribers.length;
			socialItem.profile.posted ='';
			if(data.feeds != null)				
				socialItem.profile.posted = data.feeds.length;
			if(data.services != null)	
				socialItem.profile.favourites = '';//data.services.length;			
			socialItem.profile.createdat = '';
			socialItem.profile.timezone ='';								
			socialItem.profile.userid = data.id;
			socialItem.profile.location = '';
			socialItem.profile.url = '';
			socialItem.profile.homepage = "http://www.friendfeed.com/"+ data.id; 
			socialItem.profile.language = '';			
			
			social.userid = data.id;
		
			
			retVal = true;																	

	}//end if data is null															
	return retVal;				
}

var parseMyBloglogYQLProfileResponse = function(data, socialItem){
	var retVal = false;
	if( data != null){				
		if( data.query != null){				
			if( data.query.results != null){							
				if( data.query.results.community != null){						
					socialItem.profile.name = data.query.results.community.name;					
					socialItem.profile.description = '';
					socialItem.profile.profileImage = PATH +'images/icon_color_Mybloglog.png';
					socialItem.profile.friends ='';
					socialItem.profile.followers = '';
					socialItem.profile.posted ='';
					socialItem.profile.favourites = '';				
					socialItem.profile.createdat = data.query.results.community.created;
					socialItem.profile.timezone ='';
					socialItem.profile.userid = data.query.results.community.id;
					socialItem.profile.location = '';
					socialItem.profile.url = data.query.results.community.site_url;
					socialItem.profile.homepage = data.query.results.community.uri;
					socialItem.profile.language = data.query.results.community.language;
					
					social.userid = data.query.results.community.id;											
					retVal = true;
				}
			}//end yql results
		}//end yql query
	}//end yql												
	return retVal;				
}

var parseDeliciousProfileResponse = function (data,socialItem){
	var retVal = false;
	if(data != null){
		//$.each(data, function(i, item) {				
			socialItem.profile.name = data[0].a;				
			socialItem.profile.description ='';
			socialItem.profile.profileImage = PATH +'images/icon_color_Delicious.png';				
			socialItem.profile.friends ='';
			socialItem.profile.followers = '';
			socialItem.profile.posted =data.length;
			socialItem.profile.favourites = '';
			socialItem.profile.createdat = '';
			socialItem.profile.timezone ='';								
			socialItem.profile.userid = '';
			socialItem.profile.location = '';
			socialItem.profile.url ='';
			socialItem.profile.homepage = '';
			socialItem.profile.language = '';
			
			social.userid = '';														
			retVal = true;
		//});//end each				
	}
	return retVal;				
}

var parseLastFMProfileResponse = function (data,socialItem){
	var retVal = false;
	if( data != null){				
		if( data.user != null){				
			socialItem.profile.name = data.user.realname;
			if(data.user.image[1]['#text'] !=""){
				socialItem.profile.profileImage = data.user.image[1]['#text'];
			}else{
				socialItem.profile.profileImage = PATH +'images/icon_color_Lastfm.png';
			}
			socialItem.profile.description = '';			
			socialItem.profile.friends = data.user.playcount;
			socialItem.profile.followers = data.user.subscriber;
			socialItem.profile.posted = data.user.playlists;
			socialItem.profile.favourites = '';
			socialItem.profile.createdat = data.user.registered['#text'];
			socialItem.profile.timezone ='';								
			socialItem.profile.userid = data.user.id;
			socialItem.profile.location = data.user.country;
			socialItem.profile.url = data.user.url;
			socialItem.profile.homepage = '';
			socialItem.profile.language = '';
			if(data.user.gender !="n"){
				socialItem.profile.gender = data.user.gender;
			}
			if(data.user.age != null){
				socialItem.profile.age = data.user.age;
			}							
			social.userid = data.user.id;
			retVal = true;
		}
	}
	return retVal;				
}


var parseYoutubeProfileResponse = function (data,socialItem){
	var retVal = false;
	if( data != null){				
		if( data.entry != null){				
			if( data.entry != null){																
				socialItem.profile.name = data.entry.author[0].name.$t;
				socialItem.profile.profileImage = PATH +'images/icon_color_Youtube.png';
				socialItem.profile.title = data.entry.content.$t;
				socialItem.profile.description = data.entry.title.$t;			
				socialItem.profile.friends = '';
				socialItem.profile.followers = '';
				socialItem.profile.posted = '';
				socialItem.profile.favourites = '';
				socialItem.profile.createdat = data.entry.updated.$t;
				socialItem.profile.timezone ='';								
				socialItem.profile.userid =data.entry.author[0].name.$t;
				socialItem.profile.location = '';
				socialItem.profile.url = data.entry.link[0].href;
				socialItem.profile.homepage = '';
				socialItem.profile.language = '';							
				social.userid = data.entry.author[0].name.$t;
				retVal = true;
			}
		}
	}
	return retVal;				
}

var parseHi5ProfileResponse = function (data,socialItem){
	var retVal = false;
	if( data != null){	   																				
		socialItem.profile.name = data["rdf.RDF"]["foaf.Person"]["foaf.givenName"] +'' + data["rdf.RDF"]["foaf.Person"]["foaf.surName"];
		socialItem.profile.profileImage = PATH +'images/icon_color_hi5.png';
  		if(data["rdf.RDF"]["foaf.Person"]["foaf.img"]["@rdf.resource"]){
			socialItem.profile.profileImage = data["rdf.RDF"]["foaf.Person"]["foaf.img"]["@rdf.resource"];
		}
		socialItem.profile.title = '';
		socialItem.profile.description = '';			
		socialItem.profile.friends = data["rdf.RDF"]["foaf.Person"]["foaf.knows"].length;
		socialItem.profile.followers = '';
		socialItem.profile.posted = '';
		socialItem.profile.favourites = '';
		socialItem.profile.gender = data["rdf.RDF"]["foaf.Person"]["foaf.gender"];
		socialItem.profile.birthday =data["rdf.RDF"]["foaf.Person"]["foaf.birthday"];								
		socialItem.profile.userid =data["rdf.RDF"]["foaf.Person"]["@rdf.nodeID"];
		socialItem.profile.location = '';
		socialItem.profile.url = data["rdf.RDF"]["foaf.Person"]["foaf.weblog"]["@rdf.resource"];
		socialItem.profile.homepage = data["rdf.RDF"]["foaf.Person"]["foaf.homePage"]["@rdf.resource"];
		socialItem.profile.language = data["rdf.RDF"]["foaf.Person"]["lang.masters "];									
		retVal = true;		
	}
	return retVal;				
}

var parseBloggerProfileResponse = function (data,socialItem){
	var retVal = false;
	if( data != null){
		if( data.feed != null){																						
			if( data.feed.author != null){
				socialItem.profile.name = data.feed.author[0].name["$t"];	   																				
				socialItem.profile.profileImage = PATH +'images/icon_color_Blogger.png';  
				socialItem.profile.url = data.feed.author[0].uri["$t"];
				socialItem.profile.homepage ='';
			}			
			socialItem.profile.title = data.feed.title["$t"];
			socialItem.profile.description = data.feed.subtitle["$t"];			
			socialItem.profile.friends = '';
			socialItem.profile.followers = '';
			if(data.feed.entry != null)
				socialItem.profile.posted = data.feed.entry.length;
			socialItem.profile.favourites = '';			
			socialItem.profile.createdat = data.feed.updated["$t"];												
			retVal = true;					
		}
	}
	return retVal;				
}

var parseTumblrProfileResponse = function (data,socialItem){
	var retVal = false;
	if( data != null){
		if( data.tumblelog != null){																								
			socialItem.profile.name = data.tumblelog.name	   																				
			socialItem.profile.profileImage = PATH +'images/icon_color_Tumblr.png';  
			socialItem.profile.url = '';
			socialItem.profile.homepage ='';
			socialItem.profile.createddat = data.tumblelog.timezone;
			socialItem.profile.title = data.tumblelog.title;
			socialItem.profile.description = data.tumblelog.description;
			socialItem.profile.friends = '';
			socialItem.profile.followers = '';
			socialItem.profile.favourites = data.tumblelog.feeds.length;		
			socialItem.profile.posted = data.posts.length;			
			retVal = true;
		}					
	}
	return retVal;				
}

