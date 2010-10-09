var PATH ='http://www.souocara.com/';
function doSearch(){
		resetContent();
		resetImages(); 		  
		$("#contentLoading").show(); 				      
		$("#buttons").hide(); //navigation button
		var username = $("#txtUsername").attr("value");
		if(!isEmpty(username)){					
			social.search(username, "search");
		}else{
			alert('Please enter a username');
		}
}

var foundList = new Array();    
/********************************************************************/  
/* DISPLAY SEARCH RESULTS */ 
function showData(){
	resetContent(); 	
    var obj = social.identities;   
	          
    if(obj.length > 0){ 			
	  for (var x = 0; x < obj.length; x++) {          	   	
			if(obj[x].apiName != null){				               				
				$("#txtApi").val(obj[x].apiName);				
				var apiName = obj[x].apiName.toLowerCase();
				if(apiName === "del.icio.us"){
					apiName = "delicious";									
				}
				var apiNameDiv = "#" + apiName;				
				var apiBoxDiv = "#b_"+ apiName;
				var apiTitleDiv = "#s_"+ apiName;				
				$(apiTitleDiv).css({'color': '#FB850D'});			
				$(apiNameDiv).attr("alt", obj[x].profile.name);
				$(apiNameDiv).attr("src",PATH +"images/icon_color_" + toProperCase(apiName) +".png");
				if(obj[x].profile.profileImage !=null){				
					$(apiNameDiv).attr("src", obj[x].profile.profileImage);
				}
				foundList[foundList.length] = apiName;											
		   }  
	   }//end for  
	   
     }  
	 $("#contentLoading").hide(); 	 
}
 
/* GET PROFILE DATA */  
function getProfile(obj, apiName){	
	if($.inArray(apiName, foundList) != -1){
		$("#contentLoading").show();
		$("#buttons").hide(); //navigation button		   	
		var username = $("#txtUsername").attr("value");	
		social.search(username, "profile", apiName);
		
	}else
	{
		alert("username not found in " + apiName);
	}			
}			

/* CLEAR SEARCH RESULTS */        
function resetContent(){
	$('#profile').html('');    
	$('#posts').html(''); 		
} 

function resetImages(){
	for(var x = 0; x <= apiLinks.sites.length-1; x++){
		var apiName = apiLinks.sites[x].name;																											
		var apiNameDiv = "#"+apiName.toLowerCase();
		var image = "images/icon_bw_" + apiName + ".png";				
		$(apiNameDiv).attr("src", image);
		$(apiNameDiv).attr("alt", apiName);
		$("#s_"+ apiName.toLowerCase()).css({'color': '#0000ff'});
	}
}

/********************************************************************/   
var parseSearchData = function(data, socialItem){	
	var success = false;
	if(!isObject(data)){					    				
		data = eval("(" + data + ")");
	}
	socialItem.profile = {};	
	switch(socialItem.apiName.toUpperCase()){
		case "TWITTER":		
			success = parseTwitterSearchResponse(data, socialItem);
			break;
		case "FACEBOOK":
			success = parseFacebookSearchResponse(data, socialItem);			
			break;
		case "FACEBOOKNOUSERNAME":
			success = parseFacebookNoUsernameSearchResponse(data, socialItem);			
			break;
		case "DELICIOUS":
			success = parseDeliciousSearchResponse(data, socialItem);			
			break;
		case "FRIENDFEED":
			success = parseFriendFeedSearchResponse(data, socialItem);				
			break;			
		case "MEME":
			success = parseMemeYQLSearchResponse(data, socialItem);
			break;
		case "FLICKR":
			success = parseFlickrYQLSearchResponse(data, socialItem);
			break;
		case "MYBLOGLOG":
			success = parseMyBloglogYQLSearchResponse(data, socialItem);
			break;
		case "LASTFM":
			success = parseLastFMSearchResponse(data, socialItem);
			break;
		case "GITHUB":
			success = parseGitHubSearchResponse(data, socialItem);
			break;
		case "YOUTUBE":
			success = parseYoutubeSearchResponse(data, socialItem);
			break;
		case "HI5":
			success = parseHi5SearchResponse(data, socialItem);
			break;
		case "DIGG":
			success = parseDiggSearchResponse(data, socialItem);
			break;
		case "BLOGGER":
			success = parseBloggerSearchResponse(data, socialItem);
			break;
		case "TUMBLR":
			success = parseTumblrSearchResponse(data, socialItem);
			break;																						  		
	}					
		
	if(success){			
            social.identities[social.identities.length] = socialItem;						
            showData();
     }
	 $("#contentLoading").hide(); 
}//end function

var parseTumblrSearchResponse = function(data, socialItem){
	var retVal = false;
	socialItem.profile.profileImage = null;
	if( data != null){
		if( data.posts.length >0){
			if(data.tumblelog !=null){																						
				 socialItem.profile.name = data.tumblelog.name;
				 socialItem.profile.profileImage = PATH +'images/icon_color_Tumblr.png';		
				 retVal = true;
			}			
		}
	}//end data												
	return retVal;				
}

var parseDiggSearchResponse = function(data, socialItem){
	var retVal = false;
	socialItem.profile.profileImage = null;
	if( data != null){																						
		 socialItem.profile.name = data.fullName;
		 socialItem.profile.profileImage = PATH +'images/icon_color_Digg.png';
		 if(data.icon != null){
		 	socialItem.profile.profileImage = 'http://blogger.com/'+ data.icon;
		 }
		 retVal = true;			
	}//end data												
	return retVal;				
}

var parseBloggerSearchResponse = function(data, socialItem){
	var retVal = false;
	socialItem.profile.profileImage = null;
	if( data != null){
		if( data.feed != null){																						
			if( data.feed.author != null){
				 socialItem.profile.name = data.feed.author[0].name["$t"];
				 socialItem.profile.profileImage = PATH +'images/icon_color_Blogger.png';				
				 retVal = true;			
			}
		}
	}//end data												
	return retVal;				
}

var parseHi5SearchResponse = function(data, socialItem){
	var retVal = false;
	socialItem.profile.profileImage = null;
	if( data != null){																						
		 socialItem.profile.name = "hi5 user";
 	     social.userid = data["hi5.userId"];
		 socialItem.profile.profileImage = PATH +'images/icon_color_hi5.png';
		 retVal = true;			
	}//end data												
	return retVal;				
}

var parseYoutubeSearchResponse = function(data, socialItem){
	var retVal = false;
	socialItem.profile.profileImage = null;
	if( data != null){				
		if( data.feed != null){				
			if( data.feed.entry != null){																
			 socialItem.profile.name = data.feed.author[0].name.$t;
			 socialItem.profile.profileImage = PATH +'images/icon_color_Youtube.png';
			 retVal = true;			
			}//end data.feed.entry 
		}//end data.feed
	}//end data												
	return retVal;				
}

var parseFlickrYQLSearchResponse = function(data, socialItem){
	var retVal = false;
	socialItem.profile.profileImage = null;
	if( data != null){				
		if( data.query != null){				
			if( data.query.results != null){							
				if( data.query.results.img != null){
					var pos = data.query.results.img.alt.indexOf("'s buddy icon");
					var name = data.query.results.img.alt.substr(0,pos);
					socialItem.profile.name = name;
					if(name == ""){
						socialItem.profile.name = social.username;
					}
					if( data.query.results.img.src != null){						
						socialItem.profile.profileImage = data.query.results.img.src;						
					}else{
				    	socialItem.profile.profileImage = PATH +'images/icon_color_Flickr.png';
					}
					retVal = true;
				}
			}//end yql results
		}//end yql query
	}//end yql												
	return retVal;				
}
var parseGitHubSearchResponse = function(data, socialItem){
	var retVal = false;
	socialItem.profile.profileImage = null;
	if( data != null){				
		if( data.query != null){				
			if( data.query.results != null){
				if( data.query.results.user != null){
					if( data.query.results.user.name!= null){	
						socialItem.profile.name = data.query.results.user.name;
						retVal = true;
					}
					if( data.query.results.user.login!= null){	
						socialItem.profile.name = data.query.results.user.login;
						socialItem.profile.profileImage = PATH +'images/icon_color_Github.png';
						retVal = true;
					}
				}
			}
		}
	}
	return retVal;
}

var parseLastFMSearchResponse = function(data, socialItem){
	var retVal = false;
	socialItem.profile.profileImage = null;
	if( data != null){				
		if( data.user != null){				
			socialItem.profile.name = data.user.realname;
			if(data.user.image[1]['#text'] !=""){
				socialItem.profile.profileImage = data.user.image[1]['#text'];
			}else{
				socialItem.profile.profileImage = PATH +'images/icon_color_Lastfm.png';
			}
			retVal = true;
		}
	}
	return retVal;
}

var parseFacebookNoUsernameSearchResponse = function(data, socialItem){
      var retVal = false;
	  socialItem.profile.profileImage = null;
      if( data != null){
            if( data.query != null){
                  if( data.query.results != null){
                        if( data.query.results.h1 != null){
                              socialItem.profile.name = data.query.results.h1.content;
                              retVal = true;
                        }
                  }
            }
      }
      return retVal;
}

var parseFacebookSearchResponse = function(data, socialItem){
    var retVal = false;
	socialItem.profile.profileImage = null;
    if( data != null){				
		if( data.query != null){				
			if( data.query.results != null){							
				if( data.query.results.img != null){
					var info = data.query.results.img;
					socialItem.profile.name = info.alt;
					socialItem.profile.profileImage = "http://facebook.com" + info.src;                         
                    retVal = true;
                 }
			}
		}
  	}
    return retVal;
}

var parseTwitterSearchResponse = function(data, socialItem){
	var retVal = false;
	socialItem.profile.profileImage = null;
	if(data !=null)
	{
		if(data.error){
			//alert("error occurred while parseTwitterSearchResponse " + data.error);
			socialItem.profile.profileImage = PATH +'images/icon_bw_twitter.png';
			retVal = false;
		}else if(data.protected === true) {
			//alert("user twitter account protected " + data.protected);
			socialItem.profile.profileImage = PATH +'images/icon_bw_twitter.png';
			retVal = false;		
		}else{
			socialItem.profile.name = data.name;
			if(data.profile_image_url !=null){
				socialItem.profile.profileImage = data.profile_image_url;																			
			}else{
	        	socialItem.profile.profileImage = PATH +'images/icon_color_Twitter.png';
			}
			retVal = true;
		}//end else
	}// end if 		
	return retVal;				
}//end parseTwitterSearchResponse

var parseMemeYQLSearchResponse = function(data, socialItem){
	var retVal = false;
	socialItem.profile.profileImage = null;
	if( data != null){				
		if( data.query != null){				
			if( data.query.results != null){							
				if( data.query.results.meme != null){
					//alert("Meme " + results.meme.name);	
					socialItem.profile.name = data.query.results.meme.name;
					if(data.query.results.meme.avatar_url != null){
						socialItem.profile.profileImage = data.query.results.meme.avatar_url;
					}else{
	        			socialItem.profile.profileImage = PATH +'images/icon_color_Meme.png';
					}
					retVal = true;
				}
			}//end yql results
		}//end yql query
	}//end yql												
	return retVal;				
}
var parseMyBloglogYQLSearchResponse = function(data, socialItem){
	var retVal = false;
	socialItem.profile.profileImage = null;
	if( data != null){				
		if( data.query != null){				
			if( data.query.results != null){							
				if( data.query.results.community != null){
					//alert("Meme " + results.community.name);	
					socialItem.profile.name = data.query.results.community.name;
					socialItem.profile.profileImage = PATH +'images/icon_color_Blogger.png';
					retVal = true;
				}// end yql community
			}//end yql results
		}//end yql query
	}//end yql data												
	return retVal;				
}			

var parseTwitterYQLSearchResponse = function(data, socialItem){
	//alert("inside parseTwitterYQLSearchResponse");
	var retVal = false;
	socialItem.profile.profileImage = null;
	if( data != null){
		if(data.error != null){		
			alert("error occurred while parsing TwitterProfileResponse error = " + dumpObj(data.error.description));
			alert("diagnostics = " + dumpObj(data.error.diagnostics.warning));
			retVal = false;
		}else{	
			alert("data.query = " + data.query);			
			if( data.query != null){
				alert("data.query.results = " + data.query.results);							
				if( data.query.results != null){								
					if( data.query.results.item != null){			
						if( data.query.results.item.meta != null){
							if( data.query.results.item.meta.length != null){							
								for(var j = 0; j <= data.query.results.item.meta.length-1; j++) {
									if(data.query.results.item.meta[j].property){																	                            
										if(data.query.results.item.meta[j].property === "foaf:name" ){												
											//alert("Twitter " + data.query.results.item.meta[j].content);
											socialItem.profile.name = data.query.results.item.meta[j].content;
											retVal = true;
										}
									}
								}//end for
							}
						} 				
					}
				}//end yql results
			}//end yql query
		}//end else 
	}//end yql data																
	return retVal;				
}

var parseDeliciousSearchResponse = function (data,socialItem){
	var retVal = false;
	socialItem.profile.profileImage = null;
	if(data != null){
		if(data[0] != null){
			if(data[0].a != null){				
				socialItem.profile.name = data[0].a;	
				socialItem.profile.profileImage = PATH +'images/icon_color_Delicious.png';	
				retVal = true;
			}
		}				
	}
	return retVal;				
}

var parseFriendFeedSearchResponse = function (data,socialItem){
	var retVal = false;
	socialItem.profile.profileImage = null;
	if(data != null){												
			socialItem.profile.name = data.name;	
			if(data.id != null){
				socialItem.profile.profileImage = 'http://friendfeed-api.com/v2/picture/'+data.id;
			}else{
	        	socialItem.profile.profileImage = PATH +'images/icon_color_Friendfeed.png';
			}
			retVal = true;
	}//end if data is null															
	return retVal;				
}


	

			

 
	