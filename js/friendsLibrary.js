/********************************************************************/      
var PATH ='http://www.souocara.com/';
function showFriends(){
	resetFriends();
   $('#title').show();
     var obj = social.identities[0].friends; 
     var ul = $('<ul class="profile-list"></ul>').appendTo('#posts'); 
	 var title = $('<div class="postsList"></div>').appendTo('#title'); 
	
	// Specific API data values				 	
	switch(social.identities[0].apiName.toUpperCase()){
		case "TWITTER":
			showTwitterFriends(ul, title, obj);
			break;					
		case "DELICIOUS":
			showDeliciousFriends(ul, title, obj);			
			break;				
		case "FLICKR":
			showFlickrYQLFriends(ul, title, obj);
			break;						
		case "GITHUB":
			showGitHubFriends(ul, title, obj);
			break;
		case "HI5":
			showHi5Friends(ul, title, obj);
			break;					
		default:
			showDefaultFriends(ul, title, obj);
			break;																			  		
	}//end switch
}          

function showTwitterFriends(ul, title, obj){
	//Following
	if(obj.length > 0){
		if(obj.length >1)      
		$("#buttons").show(); 
		x = obj.length - 1;	
		$('<li id="' + x + '"><img src="' +  obj[x].profileImage +'"width=32 height=32>' + obj[x].name+ '</li>').appendTo(ul); 
		$('<li>' + obj[x].description + '</li>').appendTo(ul); 
	 }//end if 
}

function showDeliciousFriends(ul, title, obj){
//Network Members
	if(obj.length > 0){ 	
		if(obj.length >1)      
		$("#buttons").show(); 
		$('<div id="apiname"><b>' + social.identities[0].apiName + ' - Network Memmbers of' + social.username +'(' + obj.length + ') </b></div>').appendTo(title); 
		 for (var x = 0; x < obj.length; x++) {
			 $('<li id="' + x + '"><img src="' +  obj[x].profileImage +'"width=32 height=32>' + obj[x].name+ '</li>').appendTo(ul); 	 	  		 	           			
		 }
	 }
}

function showGithubFriends(ul, title, obj){
//Following
	if(obj.length > 0){ 	
		if(obj.length >1)      
			$("#buttons").show(); 
		
		$('<div><b>' + social.identities[0].apiName + ' - Following of  '+ social.username +'(' + obj.length + ') </b></div>').appendTo(title); 
		 for (var x = 0; x < obj.length; x++) {
			 $("<li>" + obj[x].name+ "</li>").appendTo(ul); 	 	  		 	           			
		 }
	 }
}

function showFlickrFriends(ul, title, obj){
//Friends
	if(obj.length > 0){ 
		if(obj.length >1)      
			$("#buttons").show(); 
		
		$('<div id="apiname"><b>Friends Photostream' + social.username+ ' (' + obj.length +') </b></div>').appendTo(title); 
		 for (var x = 0; x < obj.length; x++) {
			$(ul).append("<li><b><a href='" + obj[x].url  +"' target='_blank'>" + obj[x].name + "</a></b><br><a href='" +  obj[x].posted +"' target='_blank'>" + obj[x].description + "</a></li>");	 	  		 	           			
		 }
	}
}

function showHi5Friends(ul, title, obj){
//Knows
	if(obj.length > 0){ 
		if(obj.length >1)      
			$("#buttons").show(); 		
		$('<div id="apiname"><b>' + social.username+ ' \'s Knows (' + obj.length +') </b></div>').appendTo(title); 
		 for (var x = 0; x < obj.length; x++) {
			$(ul).append("<li><b>" + obj[x].name + "</b></li>");	 	  		 	           			
		 }
	}
}

function showDefaultFriends(ul, title, obj){
	 if(obj.length > 0){ 	
		if(obj.length >1)      
			$("#buttons").show(); 
		
		$('<div id="apiname"><b>' + social.identities[0].apiName + ' - Friends of ' + social.username +'(' + obj.length + ') </b></div>').appendTo(title); 
		 for (var x = 0; x < obj.length; x++) {
			 $('<li id="' + x + '"><img src="' +  obj[x].profileImage +'"width=32 height=32>' + obj[x].name+ '</li>').appendTo(ul); 
			 $('<li>' + obj[x].description + '</li>').appendTo(ul); 	 	  		 	           			
		 }
	 }
}

/* CLEAR SEARCH RESULTS */        
function resetFriends(){   
	$('#posts').html('');   
	$('#title').html('');   
} 
/********************************************************************/   
var parseFriendsData = function(data, socialItem){	
	var success = false;
	if(!isObject(data)){					    				
		data = eval("(" + data + ")");
	}	
	switch(socialItem.apiName.toUpperCase()){
		case "DELICIOUS":			
			success = parseDeliciousFriendsResponse(data, socialItem);			
			break;
		case "FRIENDFEED":
			success = parseFriendFeedFriendsResponse(data, socialItem);				
			break;			
		case "MEME":			
			success = parseMemeFriendsResponse(data, socialItem);
			break;
		case "MYBLOGLOG":
			alert("Friends Functionality not available for My Blog Log");
			break;
		case "MEME":
			success = parseMemeFriendsResponse(data, socialItem);
			break;
		case "TWITTER":
			success = parseTwitterFriendsResponse(data, socialItem);
			break;
		case "GITHUB":
			success = parseGitHubFriendsResponse(data, socialItem);
			break;
		case "FLICKR":
			success = parseFlickrFriendsResponse(data, socialItem);
			break;
		case "HI5":
			success = parseHi5FriendsResponse(data, socialItem);
			break;																						  		
	}					
	if(success && socialItem.apiName.toUpperCase()!="TWITTER"){		
            social.identities[social.identities.length] = socialItem;						
            showFriends();
     }
}//end function

var parseHi5FriendsResponse = function (data,socialItem){
	var retVal = false;
	if( data != null){																					
		socialItem.friends = new Array();
		var friendList = data["rdf.RDF"]["foaf.Person"]["foaf.knows"];
		if(isObject(friendList)){
			if(friendList.length > 1){
			    for( i=0; i < friendList.length; i++){				
				//$.each(friendList, function(i, item) {  For some reason .each is not working!
					var item = friendList[i]["foaf.Person"];
					socialItem.friend = {};
					socialItem.friend.name = item["foaf.nick"];
					socialItem.friend.username = '';
					socialItem.friend.description = '';
					socialItem.friend.posted = '';
					socialItem.friend.createdat = '';								
					socialItem.friend.url ='';
					socialItem.friend.tags = '';									
					socialItem.friends[i] = socialItem.friend;																			
					retVal = true;
				//});//end each				
				}
			}
		}
	}
	return retVal;				
}

var parseFlickrFriendsResponse = function (data,socialItem){
	var retVal = false;
	if( data != null){				
		if( data.query != null){				
			if( data.query.results != null){
				if( data.query.results.entry != null){															
					socialItem.friends = new Array();
					$.each(data.query.results.entry, function(i, item) {
						socialItem.friend = {};
						socialItem.friend.name = item.title;
						socialItem.friend.username = item.author.name;
						socialItem.friend.description = item.content.content;
						socialItem.friend.posted = item.link[1].href
						socialItem.friend.createdat = item.published;								
						socialItem.friend.url = item.link[0].href;
						socialItem.friend.tags = item.tags;
						
						socialItem.userid = item.author.name;		
						socialItem.friends[i] = socialItem.friend;														
						
						retVal = true;
					});//end each
			}	}
		}				
	}
	return retVal;				
}

var parseGitHubFriendsResponse = function (data,socialItem){
	var retVal = false;
	if(data){
		socialItem.friends = new Array();
		$.each(data.users, function(i, item) {
			socialItem.friend = {};										
			socialItem.friend.name = item;
			socialItem.friend.username = item;
			social.userid = item;
			socialItem.friends[i] = socialItem.friend;						
			retVal = true;
		});//end each					
	}
	return retVal;				
}

var parseMemeFriendsResponse = function(data, socialItem){
	var retVal = false;		
	if( data != null){				
		if( data.query != null){				
			if( data.query.results != null){							
				if( data.query.results.meme != null){
					socialItem.friends = new Array();
					$.each(data.query.results.meme, function(i, item) {
						socialItem.friend = {};										
						socialItem.friend.name = item.title;
						socialItem.friend.username = item.name;
						socialItem.friend.description = item.title;
						socialItem.friend.profileImage = item.avatar_url;
						socialItem.friend.friends = item.friends;
						socialItem.friend.followers = '';
						socialItem.friend.posted ='';					
						socialItem.friend.favourites = '';					
						socialItem.friend.createdat = data.query.created;
						socialItem.friend.timezone ='';
						socialItem.friend.userid = item.guid;
						socialItem.friend.location = '';
						socialItem.friend.url = item.url;
						socialItem.friend.homepage = item.url;
						socialItem.friend.language = item.language;
						
						social.userid = item.guid;
						socialItem.friends[i] = socialItem.friend;						
						retVal = true;
					});//end each					
				}
			}//end yql results
		}//end yql query
	}//end yql												
	return retVal;				
}

var parseTwitterFriendsResponse = function (data,socialItem){
	var retVal = false;
	if(data != null){
		socialItem.friends = new Array();
		var index = 0;		
		if(data.error !=null){
			//if error 
			//{"request":"/friends/ids.json?screen_name={username}?count={count}&callback=?",
			//"error":"Rate limit exceeded. Clients may not make more than 150 requests per hour."}
			alert("error occurred while parseTwitterFriendsResponse " + data.error);
			retVal = false;
		}else{
		  $.each(data, function(i, id) {
			//[37298074,75018133,70918181,68599308,64492194,27483895,3331681,19378072,46905949,45987514,17811921]			
			var show_users_url ="http://twitter.com/users/show.json?user_id=" + id + "&callback=?";          
			$.getJSON(show_users_url, function (item) {
				socialItem.friend = {};
				if(item.protected === false){ 					
					socialItem.friend.name = item.name;
					socialItem.friend.username = item.screen_name;
					socialItem.friend.description = item.description;
					socialItem.friend.profileImage = item.profile_image_url;
					socialItem.friend.friends =item.friends_count;
					socialItem.friend.followers = item.followers_count;
					socialItem.friend.posted =item.statuses_count;
					socialItem.friend.favourites = item.favourites_count;				
					socialItem.friend.createdat = item.created_at;
					socialItem.friend.timezone = item.time_zone;								
					socialItem.friend.userid = item.id;
					socialItem.friend.location = item.location;
					socialItem.friend.url = item.url;
					socialItem.friend.homepage = "http://www.twitter.com/"+ item.screen_name; 
					socialItem.friend.language = '';
					socialItem.friend.profile_background_image_url = item.profile_background_image_url;
					social.userid = item.screen_name;										
					socialItem.friends[index] = socialItem.friend;		
					index++;
					$.fn.delegateTwitterResult(socialItem);
					
					retVal= false;
				}//end if
				});// end getjson																		
		  });//end each		
		 }//end else		
	}//end data
	return retVal;				
}
$.fn.delegateTwitterResult = function(socialItem){  
	social.identities[0] = socialItem;						
	showFriends();
}
		
var parseDeliciousFriendsResponse = function (data,socialItem){
	var retVal = false;
	if(data != null){
	socialItem.friends = new Array();	
		$.each(data, function(i, item) {
			socialItem.friend = {};				
			socialItem.friend.name = item.user;			
			socialItem.friend.profileImage = PATH +'images/icon_color_delicious.png';				
			socialItem.friend.friends = '';
			socialItem.friend.followers = '';
			socialItem.friend.posted ='';
			socialItem.friend.favourites = '';
			socialItem.friend.createdat = item.dt;
			socialItem.friend.timezone ='';								
			socialItem.friend.userid = '';
			socialItem.friend.location = '';
			socialItem.friend.url ='';
			socialItem.friend.homepage = '';
			socialItem.friend.language = '';
			socialItem.friend.source = '';
			
			social.userid = item.user;
			socialItem.friends[i] = socialItem.friend;														
			retVal = true;
		});//end each				
	}
	return retVal;				
}

var parseFriendFeedFriendsResponse = function (data,socialItem){
	var retVal = false;
	if(data != null){	
	socialItem.friends = new Array();
		$.each(data.entries, function(i, item) {
			socialItem.friend = {};																			
			socialItem.friend.name = item.from.name;
			socialItem.friend.description = item.body;			
			socialItem.friend.profileImage = '';//'http://friendfeed-api.com/v2/picture/'+item.from.id;				
			socialItem.friend.friends = '';
			socialItem.friend.followers = '';
			socialItem.friend.posted ='';
			socialItem.friend.favourites = '';
			socialItem.friend.createdat = item.date;
			socialItem.friend.timezone ='';								
			socialItem.friend.userid = '';
			socialItem.friend.location = '';
			socialItem.friend.url =item.url;
			socialItem.friend.homepage = '';
			socialItem.friend.language = '';
			socialItem.friend.source = item.via.name;
			
			social.userid = item.from.id;
			socialItem.friends[i] = socialItem.friend;
			retVal = true;																	
		});//end each
	}//end if data is null															
	return retVal;				
}