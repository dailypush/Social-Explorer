social = new function(){};
social.options ={};
social.search = function(username, type, apiName){        
      if(username != ''){       
			var url = '';
			social.identities = new Array();   
			social.username = username;						
			var getProfile = false;
			
			if(apiName != '' && apiName != null)
				var apiSpecific = true;			

			//loop thr all social links.
			for(var x = 0; x <= apiLinks.sites.length-1; x++){		
			  if(!apiSpecific || (apiSpecific && (apiName.toUpperCase() ==  apiLinks.sites[x].name.toUpperCase()))){			 
				var socialItem = {};					
				var name = apiLinks.sites[x].name;																									
				var urlmappings = apiLinks.sites[x].urlmappings;
				url = social.getAPIUrl(type, urlmappings, socialItem);				
				if(isUrl(url)){		
					//alert ("is url = " + url);		
					socialItem.apiName = name;
					socialItem.dataType = type;								
					socialItem.apiUrl = url;														
					socialItem.disableStats = false;
					if(arguments[3] != null){
						socialItem.disableStats = arguments[3].disableStats;
					}
					social.getLinkAPIData(socialItem);
					setTimeout("social.setAjaxTimeout('" + name + "')" , 5000); 
				}//end is url
			  }// end if
			}// end for											       	       
         } //end username check
}
       
social.getAPIUrl = function(type, urlmappings, socialItem){   	
     var url = '';
     var found = false;     
     if(urlmappings != undefined){
         if(urlmappings.length){
		 
             for(var y = 0; y <= urlmappings.length-1; y++){
                var urlmapping = urlmappings[y];				
                if( urlmapping.type.toUpperCase() == type.toUpperCase()){
                    found = true;
                    url = urlmapping.urltemplate;					
                    socialItem.apiFeed = urlmapping.feed;
					
                    if(social.username!= '' && url.indexOf('{username}') > -1){
                        url = url.replace('{username}',social.username);                         
                    }                        
                    if(social.username!= '' && url.indexOf('{count}') > -1){
						if(urlmapping.count== null)
						{
							urlmapping.count = 5;
						}
                        url = url.replace('{count}',urlmapping.count);                        
                    }
					if(social.userid!= '' && url.indexOf('{userid}') > -1){
                        url = url.replace('{userid}',social.userid);                         
                    }  										
                    
                }//end find correct urltemplate based on content type and schema.
               
                if(url != '')
                    break;
            }//end looping thr all the url mappings
        }//end check urlmapping length
    }//end check url mappings object	
    return url;
}
   
social.getLinkAPIData = function(socialItem){
		//alert(socialItem.apiUrl);
			var isTaskCompleted = false;
			var apiName = socialItem.apiName.toLowerCase();				
			var apiImageId = "#"+apiName;
			
			if(socialItem.dataType =="search"){				
				$(apiImageId).attr("src", "images/loader.gif"); 
			}
			/*if(apiName === "digg1"){				
				jQuery.getJSON(socialItem.apiUrl, function(data) {
					 social.parseData( data, socialItem );					
				});
			}else{*/
				jQuery.ajax({ 
				type: "GET",
				 dataType: "jsonp",
				 url: socialItem.apiUrl,
				 success: function(data){			
					 social.parseData( data, socialItem );
				 },
				 complete: function(){
					/*if(socialItem.dataType =="search"){				
						if(apiName != "flickr"){ //flickr has an extra delay
							//$(apiImageId).attr("src", "images/icon_bw_"+ apiName.toLowerCase() +".png"); 
						}
					}*/
				 },
				 error: function(xhr){
					$(apiImageId).attr("src", "images/icon_bw_"+ apiName.toLowerCase() +".png"); 
				 }		 
				});						
			//}
}  

social.setAjaxTimeout = function(apiName){
		//Since the ajax time doesnt work, I created this function.
		var apiImageId = "#" + apiName.toLowerCase();
		if($(apiImageId).attr("src") == "images/loader.gif"){
			$(apiImageId).attr("src", "images/icon_bw_"+ apiName.toLowerCase() +".png"); 
		}				
}

social.scanData = function (socialItem){
	var color = "#ff0000";
	var div = $('<div></div>').appendTo('#scan');
	$('<span id="apiname" style="color: ' + color + '"><b>' + socialItem.apiName + '</b></span>').appendTo(div); 
}
social.parseData = function (data, socialItem){

	switch(socialItem.dataType.toUpperCase()){
			case "SEARCH":			
				parseSearchData(data, socialItem);
				break;
			case "PROFILE":			
				parseProfileData(data, socialItem);
				break;			
			case "POSTED":
				parsePostsData(data, socialItem);
				break;  		
			case "FRIENDS":
				parseFriendsData(data, socialItem);
				break;  	
			case "FOLLOWERS":				
				parseFollowersData(data, socialItem);
				break; 				
			case "FAVOURITES":
				parseFavoritesData(data, socialItem);
				break;				
		}					
}
/********************************************************************/






    


   