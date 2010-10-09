/********************************************************************/   
var PATH = 'http://www.souocara.com/';
function showFollowers(){
	resetFollowers(); 
    $('#title').show();
    var obj = social.identities[0].followers;            
    var ul = $('<ul class="profile-list"></ul>').appendTo('#posts');  
	var title = $('<div class="postsList"></div>').appendTo('#title');    
	// Specific API data values				 	
	switch(social.identities[0].apiName.toUpperCase()){
		case "TWITTER":
			showTwitterFollowers(ul, title, obj);
			break;					
		case "DELICIOUS":
			showDeliciousFollowers(ul, title, obj);			
			break;												
		case "GITHUB":
			showGithubFollowers(ul, title, obj);
			break;							
		default:
			showDefaultFollowers(ul, title, obj);
			break;																			  		
	}//end switch
}

function showTwitterFollowers(ul, title, obj){
	 if(obj.length > 0){ 
		 if(obj.length >1)      
			$("#buttons").show();		
		x = obj.length - 1;	
		$('<li><img src="' +  obj[x].profileImage +'"width=32 height=32>' + obj[x].name+ '<br>' + obj[x].description + '</li>').appendTo(ul); 
		//$('<li>' + obj[x].description + '</li>').appendTo(ul); 		
	 }//end if 
	if(obj.length >1)      
		$("#buttons").show();
}

function showDeliciousFollowers(ul, title, obj){
	if(obj.length > 0){ 
		 if(obj.length >1)      
			$("#buttons").show();
		
		$('<div id="apiname"><b>' + social.identities[0].apiName + ' - Network Fans of' + social.username +'(' + obj.length + ') </b></div>').appendTo(title); 
		 for (var x = 0; x < obj.length; x++) {
			 $('<li id="' + x + '"><img src="' +  obj[x].profileImage +'"width=32 height=32>' + obj[x].name+ '</li>').appendTo(ul); 	 	  		 	           			
		 }
	 } 
	if(obj.length >1)      
		$("#buttons").show();
}

function showGithubFollowers(ul, title, obj){
	if(obj.length > 0){ 
		 if(obj.length >1)      
			$("#buttons").show();	
		$('<div><b>' + social.identities[0].apiName + ' - Followers of  '+ social.username +'(' + obj.length + ') </b></div>').appendTo(title); 
		 for (var x = 0; x < obj.length; x++) {
			 $("<li>" + obj[x].name+ "</li>").appendTo(ul); 	 	  		 	           			
		 }
	 }
	if(obj.length >1)      
		$("#buttons").show(); 
}

function showDefaultFollowers(ul, title, obj){
	if(obj.length > 0){ 
		 if(obj.length >1)      
			$("#buttons").show();	
		$('<div id="apiname"><b>' + social.identities[0].apiName + ' - Followers of ' + social.username +'(' + obj.length + ') </b></div>').appendTo(title); 
		 for (var x = 0; x < obj.length; x++) {
			 $('<li id="' + x + '"><img src="' +  obj[x].profileImage +'"width=32 height=32>' + obj[x].name+ '</li>').appendTo(ul); 
			 $('<li>' + obj[x].description + '</li>').appendTo(ul); 	 	  		 	           			
		 }
	 }
	if(obj.length >1)      
		$("#buttons").show();	
}
            
function showFollowersNotInUse(){
	resetFollowers(); 
    $('#title').show();
     var obj = social.identities[0].followers;            
      var ul = $('<ul class="profile-list"></ul>').appendTo('#posts');  
	  var title = $('<div class="postsList"></div>').appendTo('#title');    
	 if(social.identities[0].apiName.toUpperCase()==="TWITTER"){
		 if(obj.length > 0){ 
			 if(obj.length >1)      
	  			$("#buttons").show();		
			x = obj.length - 1;	
			$('<li><img src="' +  obj[x].profileImage +'"width=32 height=32>' + obj[x].name+ '<br>' + obj[x].description + '</li>').appendTo(ul); 
			//$('<li>' + obj[x].description + '</li>').appendTo(ul); 
			
		 }//end if 
     }else if(social.identities[0].apiName.toUpperCase()=="DELICIOUS"){
	  	if(obj.length > 0){ 
			 if(obj.length >1)      
	  			$("#buttons").show();
			
			$('<div id="apiname"><b>' + social.identities[0].apiName + ' - Network Fans of' + social.username +'(' + obj.length + ') </b></div>').appendTo(title); 
			 for (var x = 0; x < obj.length; x++) {
				 $('<li id="' + x + '"><img src="' +  obj[x].profileImage +'"width=32 height=32>' + obj[x].name+ '</li>').appendTo(ul); 	 	  		 	           			
			 }
		 }
	 }else if(social.identities[0].apiName.toUpperCase()=="GITHUB"){
		if(obj.length > 0){ 
			 if(obj.length >1)      
	  			$("#buttons").show();	
			$('<div><b>' + social.identities[0].apiName + ' - Followers of  '+ social.username +'(' + obj.length + ') </b></div>').appendTo(title); 
			 for (var x = 0; x < obj.length; x++) {
				 $("<li>" + obj[x].name+ "</li>").appendTo(ul); 	 	  		 	           			
			 }
		 }
	 }else{
	 
		 if(obj.length > 0){ 
		 	 if(obj.length >1)      
	  			$("#buttons").show();	
			$('<div id="apiname"><b>' + social.identities[0].apiName + ' - Followers of ' + social.username +'(' + obj.length + ') </b></div>').appendTo(title); 
			 for (var x = 0; x < obj.length; x++) {
				 $('<li id="' + x + '"><img src="' +  obj[x].profileImage +'"width=32 height=32>' + obj[x].name+ '</li>').appendTo(ul); 
				 $('<li>' + obj[x].description + '</li>').appendTo(ul); 	 	  		 	           			
			 }
		 }
     }
	// $("#contentLoading").fadeOut("fast");            
} 

/* CLEAR SEARCH RESULTS */        
function resetFollowers(){   
   $('#posts').html('');      
   $('#title').html('');   
} 
/********************************************************************/   
var parseFollowersData = function(data, socialItem){	
	var success = false;
	if(!isObject(data)){					    				
		data = eval("(" + data + ")");
	}	
	switch(socialItem.apiName.toUpperCase()){
		case "DELICIOUS":
			success = parseDeliciousFollowersResponse(data, socialItem);			
			break;
		case "FRIENDFEED":
			alert("Followers Functionality not available for Friend Feed");				
			break;			
		case "MEME":
			success = parseMemeFollowersResponse(data, socialItem);
			break;
		case "MYBLOGLOG":
			alert("Followers Functionality not available for My Blog Log");
			break;
		case "TWITTER":
			//alert("parseTwitterFollowersResponse");
			success = parseTwitterFollowersResponse(data, socialItem);
			break;
		case "GITHUB":
			success = parseGitHubFollowersResponse(data, socialItem);
			break;																						  		
	}					
	if(success && socialItem.apiName.toUpperCase()!="TWITTER"){		
            social.identities[social.identities.length] = socialItem;
            showFollowers();
     }
}//end function

var parseGitHubFollowersResponse = function (data,socialItem){
	var retVal = false;
	if(data){
		socialItem.followers = new Array();
		$.each(data.users, function(i, item) {
			socialItem.follow = {};										
			socialItem.follow.name = item;
			socialItem.follow.username = item;
			social.userid = item;
			socialItem.followers[i] = socialItem.follow;						
			retVal = true;
		});//end each					
	}
	return retVal;				
}

var parseMemeFollowersResponse = function(data, socialItem){
	var retVal = false;
	
	if( data != null){				
		if( data.query != null){				
			if( data.query.results != null){							
				if( data.query.results.meme != null){
		 		  socialItem.followers = new Array();
		 		  $.each(data.query.results.meme, function(i, item) {
					socialItem.follow = {};				
					socialItem.follow.name = item.title;
					socialItem.follow.username = item.name;
					socialItem.follow.description = item.title;
					socialItem.follow.profileImage = item.avatar_url;
					socialItem.follow.friends ='';
					socialItem.follow.followers = item.followers;
					socialItem.follow.posted ='';					
					socialItem.follow.favourites = '';					
					socialItem.follow.createdat = '';
					socialItem.follow.timezone ='';
					socialItem.follow.userid = item.guid;
					socialItem.follow.location = '';
					socialItem.follow.url = item.url;
					socialItem.follow.homepage = item.url;
					socialItem.follow.language = item.language;
					social.userid = item.guid;
					socialItem.followers[i] = socialItem.follow;						
					retVal = true;									
				});//end each
			   }
			}//end yql results
		}//end yql query
	}//end yql											
	return retVal;				
}

var parseTwitterFollowersResponse = function (data,socialItem){
	var retVal = false;
	if(data != null){
		socialItem.followers = new Array();
		var index = 0;		
		if(data.error !=null){
			//if error 
			//{"request":"/friends/ids.json?screen_name={username}?count={count}&callback=?",
			//"error":"Rate limit exceeded. Clients may not make more than 150 requests per hour."}
			alert("error occurred while parseTwitterFriendsResponse " + data.error);
			retVal = false;
		}else{
		  $.each(data, function(i, id) {
			var show_users_url ="http://twitter.com/users/show.json?user_id=" + id + "&callback=?";          
				$.getJSON(show_users_url, function (item) {    						         
				socialItem.follow = {};
					
				if(item.protected === false){ 					
					socialItem.follow.name = item.name;
					socialItem.follow.username = item.screen_name;
					socialItem.follow.description = item.description;
					socialItem.follow.profileImage = item.profile_image_url;
					socialItem.follow.friends =item.friends_count;
					socialItem.follow.followers = item.followers_count;
					socialItem.follow.posted =item.statuses_count;
					socialItem.follow.favourites = item.favourites_count;				
					socialItem.follow.createdat = item.created_at;
					socialItem.follow.timezone = item.time_zone;								
					socialItem.follow.userid = item.id;
					socialItem.follow.location = item.location;
					socialItem.follow.url = item.url;
					socialItem.follow.homepage = "http://www.twitter.com/"+ item.screen_name; 
					socialItem.follow.language = '';
					socialItem.follow.profile_background_image_url = item.profile_background_image_url;
					social.userid = item.screen_name;										
					socialItem.followers[index] = socialItem.follow;		
					index++;
					$.fn.delegateTwitterFollowersResult(socialItem);
					
					retVal= false;
				}//end if
			});// end getjson																		
		});//end each				
	}//end else if 
   }//end if data
	return retVal;					
}
$.fn.delegateTwitterFollowersResult = function(socialItem){  
	social.identities[0] = socialItem;						
	showFollowers();
}
var parseDeliciousFollowersResponse = function (data,socialItem){
	var retVal = false;
	if(data != null){
	socialItem.followers = new Array();
		$.each(data, function(i, item) {
			socialItem.follow = {};				
			socialItem.follow.name = item.user;	
			socialItem.follow.username = item.user;		
			socialItem.follow.profileImage = PATH +'image/delicious_icon.png';				
			socialItem.follow.friends = data.length;
			socialItem.follow.followers = '';
			socialItem.follow.posted ='';
			socialItem.follow.favourites = '';
			socialItem.follow.createdat = item.dt;
			socialItem.follow.timezone ='';								
			socialItem.follow.userid = '';
			socialItem.follow.location = '';
			socialItem.follow.url ='';
			socialItem.follow.homepage = '';
			socialItem.follow.language = '';
			socialItem.follow.source = '';
			
			social.userid = item.user;
			socialItem.followers[i] = socialItem.follow;														
			retVal = true;
		});//end each				
	}
	return retVal;				
}

