/********************************************************************/                
var PATH ='http://www.souocara.com/';
function showPosts(){
	resetPosts(); 
    var obj = social.identities[0].posts;  
    var ul = $('<ul class="profile-list"></ul>').appendTo('#posts');  
	var title = $('<h1 id="postTitle"></h1>').appendTo('#posts');  
			
	var x=0;
    if(obj.length > 0){ 
				
		// Specific API data values				 	
		switch(social.identities[0].apiName.toUpperCase()){
			case "TWITTER":
				showTwitterPosts(ul, title, obj, x);
				break;
			case "FACEBOOK":
				showFacebookPosts(ul, title, obj, x);
				break;	
			case "DELICIOUS":
				showDeliciousPosts(ul, title, obj, x);			
				break;
			case "FRIENDFEED":
				showFriendFeedPosts(ul, title, obj, x);				
				break;			
			case "MEME":
				showMemeYQLPosts(ul, title, obj, x);
				break;
			case "FLICKR":
				showFlickrYQLPosts(ul, title, obj, x);
				break;			
			case "MYBLOGLOG":
				showMyBloglogYQLPosts(ul, title, obj, x);
				break;
			case "LASTFM":
				showLastFMPosts(ul, title, obj, x);
				break;
			case "GITHUB":
				showGitHubPosts(ul, title, obj, x);
				break;
			case "YOUTUBE":
				showYoutubePosts(ul, title, obj, x);
				break;
			case "TUMBLR":
				showTumblrPosts(ul, title, obj, x);
				break;				
			default:
				showDefaultPosts(ul, title, obj, x);
				break;																			  		
		}//end switch
   }//end if					
}//end showPosts

function showTumblrPosts(ul, title, obj, x){
	//$('<div id="apiname"><b>Posted by ' + social.username+ ' (#' + obj.length +') </b></div>').appendTo(title);
		 
	 for (var x = 0; x < obj.length; x++) {
	 	var strTitle = '';	
		var strDate ='';
		var strUrl ='';
		if(!isEmpty(obj[x].description))
			strTitle = obj[x].description;		
		if(!isEmpty(obj[x].createdat))
			strDate="<br><span class='created_at'>Posted: " + obj[x].createdat  + "</span>";
		if(!isEmpty(obj[x].url) && obj[x].url == obj[x].name)
			strUrl="<br><a href='" + obj[x].url + "'>" + obj[x].url + "</a>";					
		if(!isEmpty(obj[x].url) && obj[x].url != obj[x].name)
			strUrl=obj[x].name + "<br><a href='" + obj[x].url + "'>" + obj[x].url + "</a>";					
			
		$(ul).append("<li>" + strTitle+ strUrl + strDate +"</li>");	 	  		 	           			
	 }
	if(obj.length >1)      
		$("#buttons").show();
}

function showTwitterPosts(ul, title, obj, x){
	var profileImageUrl = obj[x].profileImage;	
	$('<div id="head-image"><img src="' +  profileImageUrl +'"width=64 height=64></div><b>Tweets by ' + social.username+ ' (#' + obj.length +') </b>').appendTo(title); 

	 for (var x = 0; x < obj.length; x++) {
		$(ul).append("<li>" + (obj[x].description) + "<br><span class='created_at'>Posted: " + formatDate('twitter', obj[x].createdat)  + "</span></li>");	 	  		 	           			
	 }
	if(obj.length >1)      
		$("#buttons").show();	 
}

function showFacebookPosts(ul, title, obj, x){
	//$('<div id="apiname"><b>Posted by ' + social.username+ ' (#' + obj.length +') </b></div>').appendTo(title); 
	 for (var x = 0; x < obj.length; x++) {
		$(ul).append("<li>" + obj[x].description + "<br><span class='created_at'>Posted: " + formatTwitterDate(obj[x].createdat)  + "</span></li>");	 	  		 	           			
	 }
	if(obj.length >1)      
		$("#buttons").show();
}

function showFriendFeedPosts(ul, title, obj, x){
	//$('<div id="apiname"><b>Posted by ' + social.username+ ' (#' + obj.length +') </b></div>').appendTo(title); 
	 for (var x = 0; x < obj.length; x++) {
		$(ul).append("<li>" + obj[x].description + "<br><span class='created_at'>Posted: " + formatTwitterDate(obj[x].createdat)  + "</span></li>");	 	  		 	           			
	 }
	if(obj.length >1)      
		$("#buttons").show();
}

function showMemeYQLPosts(ul, title, obj, x){
	//$('<div id="apiname"><b>Posted by ' + social.username+ ' (#' + obj.length +') </b></div>').appendTo(title); 
	 for (var x = 0; x < obj.length; x++) {
		$(ul).append("<li>" + obj[x].description + "<br><span class='created_at'>Posted: " + formatTwitterDate(obj[x].createdat)  + "</span></li>");	 	  		 	           			
	 }
	if(obj.length >1)      
		$("#buttons").show();
}

function showDeliciousPosts(ul, title, obj, x){
	//$('<div id="apiname"><b>Bookmarks: ' + social.username+ ' (#' + obj.length +') Delicious Links</b></div>').appendTo(title); 
	for (var x = 0; x < obj.length; x++) {
		var desc = obj[x].description; 
		if(isEmpty(desc)) {
			var desc = "link";
		}
		$(ul).append("<li><b>" +obj[x].name + "</b><br><a href='" + obj[x].url +"' target='_blank'>"+ desc + "</a><br><span class='created_at'>Posted: " + formatDate('meme', obj[x].createdat)  + "</span></li>");
	}
	if(obj.length >1)      
		$("#buttons").show();	
}

function showFlickrYQLPosts(ul, title, obj, x){
	//$('<div id="apiname"><b>Photostream' + social.username+ ' (#' + obj.length +') </b></div>').appendTo(title); 
	 for (var x = 0; x < obj.length; x++) {
		$(ul).append("<li><b><a href='" + obj[x].url  +"' target='_blank'>" + obj[x].name + "</a></b><br><a href='" +  obj[x].posted +"' target='_blank'>" + obj[x].description + "</a></li>");	 	  		 	           			
	 }
	if(obj.length >1)      
		$("#buttons").show();	 
}

function showMyBloglogYQLPosts(ul, title, obj, x){
	//$('<div id="apiname"><b>Posted by ' + social.username+ ' (#' + obj.length +') </b></div>').appendTo(title); 
	 for (var x = 0; x < obj.length; x++) {
		$(ul).append("<li>" + obj[x].description + "<br><span class='created_at'>Posted: " + formatTwitterDate(obj[x].createdat)  + "</span></li>");	 	  		 	           			
	 }
	if(obj.length >1)      
		$("#buttons").show();
}

function showLastFMPosts(ul, title, obj, x){
	//$('<div id="apiname"><b>Playlist for ' + social.username+ ' (#' + obj.length +') </b></div>').appendTo(title); 
	var strImage="";
	var strDescription="";
	var strStreamable="";
	for (var x = 0; x < obj.length; x++) {
		if(!isEmpty(obj[x].profileImage))
			strImage="<div id='titleWrap'><div id='head-image'><img src='" +  obj[x].profileImage +"'></div>";
		if(!isEmpty(obj[x].description))
			strDescription="<span class='label'>description:</span><span class='labelData'>"+ obj[x].description + "</span><br>";
		if(!isEmpty(obj[x].streamable))
			strStreamable="<span class='label'>streamable:</span><span class='labelData'>"+obj[x].streamable + "</span><br>";
				
		$(ul).append("<li>"+strImage+"<b><span class='label'>title:</span><span class='labelData'>" + obj[x].name + "</span></b><br>" + strDescription + "<span class='label'>size:</span><span class='labelData'>"+obj[x].size + "</span><br><span class='label'>duration:</span><span class='labelData'>"+obj[x].duration + "</span><br>" + strStreamable + "<span class='created_at'>Created on: " + obj[x].createdat  + "by " + obj[x].userid +"</span></li>");			
	 }
	if(obj.length >1)      
		$("#buttons").show();
}

function showGitHubPosts(ul, title, obj, x){
	//$('<div id="apiname"><b>Repositories' + social.username+ '(#' + obj.length +') </b></div>').appendTo(title); 
	 for (var x = 0; x < obj.length; x++) {
		var forks="<br><span>Forks:0</span>";
		var watchers="<br><span>Watchers:0</span>";
		var issues="<br><span>Open Issues:0</span>";
		var homepage="";
			
		var files ='<br><a href="#" onclick="getFiles(this,\'' + obj[x].name  + '\');">View Files</a><br><div id="files'+obj[x].name+'"></div>';
	
		if(obj[x].forks != null && obj[x].forks!=0){	
			forks ='<br><a href="#" onclick="getForks(this,\'' + obj[x].name  + '\');">Forks ' + obj[x].forks + '</a><br><div id="forks'+obj[x].name+'"></div>';
		}
		if(obj[x].openissues != null && obj[x].openissues!=0)	
			issues ='<br><a href="#" onclick="getIssues(this, \'' + obj[x].name + '\');">Open Issues: ' + obj[x].openissues + '</a><br><div id="issues'+ obj[x].name+'"></div>';
		if(obj[x].watchers != null && obj[x].watchers!=0)	
			watchers ='<br><span>Watchers:'+ obj[x].watchers +'</span>';
		if(obj[x].homepage != null && obj[x].homepage.length!=0)	
			homepage ='<br><span>HomePage:'+ obj[x].homepage +'</span>';
		$(ul).append('<li><b><a href="' + obj[x].url +'" target="_blank">' + obj[x].name + '</a></b><br>' + obj[x].description + files + watchers + forks + issues + homepage +'</li>');	 	  		 	           			
	 }
	 if(obj.length >1)      
  		$("#buttons").show();
}

function showYoutubePosts(ul, title, obj, x){	
	//$('<div id="apiname"><b>Uploads by ' + social.username+ '( #' + obj.length +') </b></div>').appendTo(title); 
	 for (var x = 0; x < obj.length; x++) {
		$(ul).append("<li>" + (obj[x].description) + "<br><span class='created_at'>Posted: " + formatDate('twitter', obj[x].createdat)  + "</span></li>");	 	  		 	           			
	 }
	if(obj.length >1)      
		$("#buttons").show();	 
}

function showDefaultPosts(ul, title, obj, x){
	//$('<div id="apiname"><b>Posted by ' + social.username+ '(#' + obj.length +') </b></div>').appendTo(title); 
	 for (var x = 0; x < obj.length; x++) {
		$(ul).append("<li>" + obj[x].description + "<br><span class='created_at'>Posted: " + formatDate(obj[x].createdat)  + "</span></li>");	 	  		 	           			
	 }
	if(obj.length >1)      
		$("#buttons").show();
}

function getForks(obj, project){
    social.project = project;
	$("#contentLoading").show();	
	var username = $("#txtUsername").attr("value");		
	social.search(username, "forks", "github");	
}
function getIssues(obj, project){
	social.project = project;
	$("#contentLoading").show();	
	var username = $("#txtUsername").attr("value");		
	social.search(username, "issues", "github");	
}

function getFiles(obj, project){
	social.project = project;
	$("#contentLoading").show();	
	var username = $("#txtUsername").attr("value");		
	social.search(username, "branches", "github");	
}


/* CLEAR SEARCH RESULTS */        
function resetPosts(){   
	$('#posts').html('');   
	$('#title').html('');   	
} 
/********************************************************************/   
var parsePostsData = function(data, socialItem){	
	var success = false;
	if(!isObject(data)){					    				
		data = eval("(" + data + ")");
	}	
	switch(socialItem.apiName.toUpperCase()){
		case "DELICIOUS":
			success = parseDeliciousPostsResponse(data, socialItem);			
			break;
		case "FRIENDFEED":
			alert("Posts Functionality not available for FriendFeed");				
			break;			
		case "MEME":
			alert("Posts Functionality not available for Meme");
			break;
		case "MYBLOGLOG":
			alert("Posts Functionality not available for MyBlogLog");
			break;
		case "TWITTER":
			success = parseTwitterPostsResponse(data, socialItem);
			break;
		case "GITHUB":
			success = parseGitHubPostsResponse(data, socialItem);
			break;
		case "FLICKR":
			success = parseFlickrPostsResponse(data, socialItem);
			break;
		case "LASTFM":
			success = parseLastFMPostsResponse(data, socialItem);
			break;
		case "YOUTUBE":
			success = parseYoutubePostsResponse(data, socialItem);
			break;
		case "BLOGGER":
			success = parseBloggerPostsResponse(data, socialItem);
			break;
		case "TUMBLR":
			success = parseTumblrPostsResponse(data, socialItem);
			break;																									  		
	}					
	if(success){			
            social.identities[social.identities.length] = socialItem;						
            showPosts();
     }
}//end function


var parseBloggerPostsResponse = function (data,socialItem){
	var retVal = false;
	if( data != null){
		if( data.feed != null){																						
			if( data.feed.entry != null){
			   socialItem.posts = new Array();
				$.each(data.feed.entry, function(i, item) {
					socialItem.post = {};
					socialItem.post.name = item.title["$t"];
					socialItem.post.username = '';
					socialItem.post.description = item.content["$t"];
					socialItem.post.profileImage = '';
					socialItem.post.friends ='';
					socialItem.post.followers = '';
					socialItem.post.posted = '';
					socialItem.post.favourites = '';				
					socialItem.post.createdat = item.updated["$t"];
					socialItem.post.timezone = '';								
					socialItem.post.userid = '';
					socialItem.post.location = '';
					socialItem.post.url = '';
					socialItem.post.homepage = '';
					socialItem.post.language = '';					
					socialItem.posts[i] = socialItem.post;														
					
					retVal = true;
				});//end each		
			}
		}
	}
	return retVal;				
}
var parseFlickrPostsResponse = function (data,socialItem){
	var retVal = false;
	if( data != null){				
		if( data.query != null){				
			if( data.query.results != null){
				if( data.query.results.entry != null){											
					socialItem.posts = new Array();
					$.each(data.query.results.entry, function(i, item) {
						socialItem.post = {};
						socialItem.post.name = item.title;
						socialItem.post.username = item.author;
						socialItem.post.description = item.content.content;
						socialItem.post.profileImage = '';
						socialItem.post.friends ='';
						socialItem.post.followers = '';
						socialItem.post.posted = item.link[1].href;
						socialItem.post.favourites = '';				
						socialItem.post.createdat = item.published;
						socialItem.post.timezone = '';								
						socialItem.post.userid = item.author;
						socialItem.post.location = '';
						socialItem.post.url = item.link[0].href;
						socialItem.post.homepage = '';
						socialItem.post.language = '';
						
						socialItem.userid = item.author;		
						socialItem.posts[i] = socialItem.post;														
						
						retVal = true;
					});//end each
				}
			}
		}				
	}
	return retVal;				
}

var parseGitHubPostsResponse = function (data,socialItem){
	var retVal = false;
	if(data){
		socialItem.posts = new Array();
		$.each(data.repositories, function(i, item) {
			socialItem.post = {};				
			socialItem.post.name = item.name;
			socialItem.post.username = item.owner;
			socialItem.post.description = item.description;
			socialItem.post.profileImage = '';
			socialItem.post.watchers =item.watchers;
			socialItem.post.forks = item.forks;								
			socialItem.post.userid = item.owner;
			socialItem.post.url = item.url;
			socialItem.post.homepage =item.homepage;
			//open-issues
			socialItem.post.openissues = item.open_issues;
			
			socialItem.userid = item.owner;		
			socialItem.posts[i] = socialItem.post;														
			retVal = true;
		});//end each
						
	}
	return retVal;				
}
		
var parseTwitterPostsResponse = function (data,socialItem){
	var retVal = false;
	if(data){
		socialItem.posts = new Array();
		$.each(data, function(i, item) {
			socialItem.post = {};				
			socialItem.post.name = item.user.name;
			socialItem.post.username = item.user.screen_name;
			socialItem.post.description = item.text;
			socialItem.post.profileImage = item.user.profile_image_url;
			socialItem.post.friends =item.user.friends_count;
			socialItem.post.followers = item.user.followers_count;
			socialItem.post.posted =item.user.statuses_count;
			socialItem.post.favourites = item.user.favourites_count;				
			socialItem.post.createdat = item.created_at;
			socialItem.post.timezone = item.user.time_zone;								
			socialItem.post.userid = item.user.id;
			socialItem.post.location = item.user.location;
			socialItem.post.url = item.user.url;
			socialItem.post.homepage = "http://www.twitter.com/"+ item.user.screen_name; 
			socialItem.post.language = '';
			
			socialItem.userid = '';		
			socialItem.posts[i] = socialItem.post;														
			retVal = true;
		});//end each				
	}
	return retVal;				
}

var parseDeliciousPostsResponse = function (data,socialItem){
	var retVal = false;
	if(data != null){
	socialItem.posts = new Array();
		$.each(data, function(i, item) {
			socialItem.post = {};				
			socialItem.post.name = item.d;
			socialItem.post.description =item.n;
			socialItem.post.profileImage =PATH +'image/icon_color_Delicious.png';				
			socialItem.post.friends ='';
			socialItem.post.followers = '';
			socialItem.post.posted =data.length;
			socialItem.post.favourites = '';
			socialItem.post.createdat = item.dt;
			socialItem.post.timezone ='';								
			socialItem.post.userid = '';
			socialItem.post.location = '';
			socialItem.post.url =item.u;
			socialItem.post.homepage = '';
			socialItem.post.language = '';
			socialItem.post.source = item.t;
			
			socialItem.userid = '';
			socialItem.posts[i] = socialItem.post;														
			retVal = true;
		});//end each				
	}
	return retVal;				
}

var parseLastFMPostsResponse = function (data,socialItem){
	var retVal = false;
	if(data != null){
		if(data.playlists != null){
			if(data.playlists.playlist != null){
				socialItem.posts = new Array();
				if(!isArray(data.playlists.playlist)){
					var item = data.playlists.playlist;
					socialItem.post = {};				
					socialItem.post.name = item.title;
					socialItem.post.description =item.description;
					socialItem.post.profileImage = '';
					if(item.image[0]['#text'] !=""){
						socialItem.post.profileImage = item.image[0]['#text'];
					}				
					socialItem.post.friends ='';
					socialItem.post.followers = '';
					socialItem.post.posted ='';
					socialItem.post.favourites = '';
					socialItem.post.createdat = item.date;
					socialItem.post.timezone ='';								
					socialItem.post.userid = item.creator;
					socialItem.post.location = '';
					socialItem.post.url =item.url;
					socialItem.post.homepage = '';
					socialItem.post.language = '';
					socialItem.post.size = item.size;
					socialItem.post.duration = item.duration;
					socialItem.post.streamable = item.streamable;
					
					socialItem.userid = '';
					socialItem.posts[0] = socialItem.post;														
					retVal = true;
				}else{
					$.each(data.playlists.playlist, function(i, item) {
						socialItem.post = {};				
						socialItem.post.name = item.title;
						socialItem.post.description =item.description;
						socialItem.post.profileImage = '';
						if(item.image[0]['#text'] !=""){
							socialItem.post.profileImage = item.image[0]['#text'];
						}				
						socialItem.post.friends ='';
						socialItem.post.followers = '';
						socialItem.post.posted ='';
						socialItem.post.favourites = '';
						socialItem.post.createdat = item.date;
						socialItem.post.timezone ='';								
						socialItem.post.userid = item.creator;
						socialItem.post.location = '';
						socialItem.post.url =item.url;
						socialItem.post.homepage = '';
						socialItem.post.language = '';
						socialItem.post.size = item.size;
						socialItem.post.duration = item.duration;
						socialItem.post.streamable = item.streamable;
						
						socialItem.userid = '';
						socialItem.posts[i] = socialItem.post;														
						retVal = true;
					});//end each
				}//end isarray
			}//end playlist
		}	//end playlists			
	}//end data
	return retVal;				
}

var parseYoutubePostsResponse = function (data,socialItem){
	var retVal = false;
	if(data.feed.entry != null){
		socialItem.posts = new Array();
		$.each(data.feed.entry, function(i, item) {
			socialItem.post = {};				
			socialItem.post.name = item.title.$t;
			socialItem.post.description =item.content.$t;
			socialItem.post.profileImage = PATH +'image/icon_color_Youtube.png';				
			socialItem.post.friends ='';
			socialItem.post.followers = '';
			socialItem.post.posted =item.length;
			socialItem.post.favourites = '';
			socialItem.post.createdat = item.published.$t;
			socialItem.post.timezone ='';								
			socialItem.post.userid = '';
			socialItem.post.location = '';
			socialItem.post.url =item.link[0].href;
			socialItem.post.homepage = '';
			socialItem.post.language = '';
			//socialItem.post.source = item.t;
			
			socialItem.userid = '';
			socialItem.posts[i] = socialItem.post;														
			retVal = true;
		});//end each				
	}
	return retVal;				
}

var parseTumblrPostsResponse = function (data,socialItem){
	var retVal = false;
	if( data.posts != null){
		socialItem.posts = new Array();
		for (var i = 0; i < data.posts.length; i++) {
			socialItem.post = {};
			var item = data.posts[i];				
			socialItem.post.name = item['feed-item'];
			socialItem.post.description =item['link-description'];
			socialItem.post.profileImage = PATH +'image/icon_color_Tumblr.png';				
			socialItem.post.friends ='';
			socialItem.post.followers = '';
			socialItem.post.posted =item.length;
			socialItem.post.favourites = '';
			socialItem.post.createdat = item['date-gmt'];
			socialItem.post.timezone ='';								
			socialItem.post.userid = '';
			socialItem.post.location = '';
			socialItem.post.url = item['link-url'];
			socialItem.post.homepage = item.url;
			socialItem.post.language = '';			
			socialItem.userid = '';
			socialItem.posts[i] = socialItem.post;													
			retVal = true;
		};//end for				
	}
	return retVal;				
}