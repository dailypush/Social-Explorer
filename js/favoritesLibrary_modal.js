/********************************************************************/                
function showFavorites(){
	resetFavorites(); 
	$("#title").show();
    var obj = social.identities[0].favorites;    
    var ul = $('<ul class="profile-list"></ul>').appendTo('#posts'); 
	var title = $('<div class="postsList"></div>').appendTo('#posts');
 	var x=0;
    if(obj.length > 0){ 			
		// Specific API data values				 	
		switch(social.identities[0].apiName.toUpperCase()){
			case "TWITTER":
				showTwitterFavorites(ul, title, obj, x);
				break;		
			case "TUMBLR":
				showTumblrFavorites(ul, title, obj, x);
				break;				
			default:
				showDefaultFavorites(ul, title, obj, x);
				break;																			  		
		}//end switch
	}//end if
}

function showTwitterFavorites(ul, title, obj, x){
	$('<div id="apiname"><b>Posted by ' + social.username+ ' (#' + obj.length +') </b></div>').appendTo(title); 
	//$('<li id="apiname"><img src="' +  obj[0].profileImage +'"><b>' + social.identities[0].apiName + ' Favorites by ' + social.username +' </b></li>').appendTo(title); 
	 for (var x = 0; x < obj.length; x++) {
		 $(ul).append("<li>" + obj[x].description + "<span class='created_at'>Posted: " + formatDate(obj[x].createdat)  + " via " + obj[x].source  + "</span></li>");	 	  		 	           			
	 }
	 if(obj.length >1)      
		$("#buttons").show();
}
function showTumblrFavorites(ul, title, obj, x){
	$('<div id="apiname"><b>Posted by ' + social.username+ ' (#' + obj.length +') </b></div>').appendTo(title); 
//	$('<li id="apiname"><img src="' +  obj[0].profileImage +'"><b>' + social.identities[0].apiName + ' Feeds by ' + social.username +' (#' + obj.length + ')</b></li>').appendTo(title); 
	 for (var x = 0; x < obj.length; x++) {
		 var strUrl ='';
		 if(!isEmpty(obj[x].url))
			strUrl="<br><a href='" + obj[x].url + "'>" + obj[x].url + "</a>";			

		 $(ul).append("<li>" + obj[x].name + strUrl + "</li>");	 	  		 	           					
	 }
	 if(obj.length >1)      
		$("#buttons").show();
}
function showDefaultFavorites(ul, title, obj, x){
	$('<div id="apiname"><b>Posted by ' + social.username+ ' (#' + obj.length +') </b></div>').appendTo(title); 
	//$('<li id="apiname"><img src="' +  obj[0].profileImage +'"><b>' + social.identities[0].apiName + ' Favorites by ' + social.username +' </b></li>').appendTo(title); 
	 for (var x = 0; x < obj.length; x++) {
		 $(ul).append("<li>" + obj[x].description + "<span class='created_at'>Posted: " + formatDate(obj[x].createdat)  + " via " + obj[x].source  + "</span></li>");	 	  		 	           			
	 }
	 if(obj.length >1)      
		$("#buttons").show();
}

function showFavoritesNotInUse(){
	resetFavorites(); 
     var obj = social.identities[0].favorites;  
     $("#contentLoading").fadeOut("fast");            
     var ul = $('<ul class="profile-list"></ul>').appendTo('#posts');   
     if(obj.length > 0){ 	
		$('<li id="apiname"><img src="' +  obj[0].profileImage +'"><b>' + social.identities[0].apiName + ' Favorites by ' + social.username +' </b></li>').appendTo(ul); 
		 for (var x = 0; x < obj.length; x++) {
			 $(ul).append("<li>" + obj[x].description + "<span class='created_at'>Posted: " + formatDate(obj[x].createdat)  + " via " + obj[x].source  + "</span></li>");	 	  		 	           			
         }
		 if(obj.length >1)      
	  		$("#buttons").show();
     }      	
} 

/* CLEAR SEARCH RESULTS */        
function resetFavorites(){   
	$('#posts').html(''); 
	$("#title").html('');
	$('#favorites').html('');    
	$('#friends').html(''); 
	$('#followers').html('');  	
} 
/********************************************************************/   
var parseFavoritesData = function(data, socialItem){	
	var success = false;
	if(!isObject(data)){					    				
		data = eval("(" + data + ")");
	}	
	switch(socialItem.apiName.toUpperCase()){
		case "DEL.ICIO.US":
			alert("Favorites Functionality not available for FriendFeed");			
			break;
		case "FRIENDFEED":
			alert("Favorites Functionality not available for FriendFeed");				
			break;			
		case "MEME":
			alert("Favorites Functionality not available for Meme");
			break;
		case "MYBLOGLOG":
			alert("Favorites Functionality not available for MyBlogLog");
			break;
		case "TWITTER":
			success = parseTwitterFavoritesResponse(data, socialItem);
			break;
		case "TUMBLR":
			success = parseTumblrFavoritesResponse(data, socialItem);
			break;																			  		
	}					
	if(success){			
            social.identities[social.identities.length] = socialItem;						
            showFavorites();
     }
}//end function

var parseTumblrFavoritesResponse = function (data,socialItem){
	var retVal = false;
	if(data != null){
		socialItem.favorites = new Array();
		if(data.tumblelog != null){
			if(data.tumblelog.feeds !=null){
			 	for (var i = 0; i < data.tumblelog.feeds.length; i++) {
					var item = data.tumblelog.feeds[i];
					socialItem.favorite = {};				
					socialItem.favorite.name = item.title;
					socialItem.favorite.username = '';
					socialItem.favorite.description = '';
					socialItem.favorite.profileImage ='';
					socialItem.favorite.friends ='';
					socialItem.favorite.followers = '';
					socialItem.favorite.posted ='';;
					socialItem.favorite.favourites = '';				
					socialItem.favorite.createdat = '';
					socialItem.favorite.timezone = '';								
					socialItem.favorite.userid = '';
					socialItem.favorite.location = '';
					socialItem.favorite.url = item.url;
					socialItem.favorite.homepage = ''; 
					socialItem.favorite.language = '';
					
					socialItem.userid = '';		
					socialItem.favorites[i] = socialItem.favorite;														
					retVal = true;
				};//end for
			}		
		}		
	}//end data
	return retVal;				
}

var parseTwitterFavoritesResponse = function (data,socialItem){
	var retVal = false;
	if(data != null){
		socialItem.favorites = new Array();
		$.each(data, function(i, item) {
			socialItem.favorite = {};				
			socialItem.favorite.name = item.user.name;
			socialItem.favorite.username = item.user.screen_name;
			socialItem.favorite.description = item.text;
			socialItem.favorite.profileImage = item.user.profile_image_url;
			socialItem.favorite.friends =item.user.friends_count;
			socialItem.favorite.followers = item.user.followers_count;
			socialItem.favorite.posted =item.user.statuses_count;
			socialItem.favorite.favourites = item.user.favourites_count;				
			socialItem.favorite.createdat = item.created_at;
			socialItem.favorite.timezone = item.user.time_zone;								
			socialItem.favorite.userid = item.user.id;
			socialItem.favorite.location = item.user.location;
			socialItem.favorite.url = item.user.url;
			socialItem.favorite.homepage = "http://www.twitter.com/"+ item.user.screen_name; 
			socialItem.favorite.language = '';
			
			socialItem.userid = '';		
			socialItem.favorites[i] = socialItem.favorite;														
			retVal = true;
		});//end each				
	}
	return retVal;				
}