/********************************************************************/                
function showOther(){
	resetFavorites(); 
     var obj = social.identities[0].others;  
     $("#contentLoading").fadeOut("fast");            
     if(obj.length > 0){ 
		 switch(social.identities[0].apiName.toUpperCase()+"_"+social.identities[0].dataType.toUpperCase()){
			case "GITHUB_FORKS":
				var div = '#forks'+social.project;
				var ul = $('<ul class="profile-list"></ul>').appendTo(div);
				
				$('<li id="apiname"><b>Networks ' + social.project + '</b></li>').appendTo(ul); 
				 for (var x = 0; x < obj.length; x++) {
					var watchers="<span>Watchers:" + obj[x].watchers + "</span>";
					var fork="<br><span>Fork:" + obj[x].fork + "</span>";
					var forks="<br><span>Forks:" + obj[x].forks + "</span>";					
					var issues="<br><span>Open Issues:" + obj[x].open_issues + "</span>";
					var homepage="";
					$(ul).append("<li>"+ watchers + forks + fork + issues + homepage +"</li>");	 	  		 	           			
				 }
				$("#contentLoading").fadeOut("fast");  
				break;

			case "GITHUB_ISSUES":
				var div = '#issues'+social.project;
				var ul = $('<ul class="profile-list"></ul>').appendTo(div);
				$('<li id="apiname"><b>Open Issues ' + social.project + '</b></li>').appendTo(ul); 
				 for (var x = 0; x < obj.length; x++) {
					var user="<br><span>User:" + obj[x].name + "</span>";
					var title="<br><span>Title:" + obj[x].title + "</span>";
					var votes="<br><span>Votes:" + obj[x].votes + "</span>";
					var number="<br><span>Number:" + obj[x].number + "</span>";
					var state="<br><span>Status:" + obj[x].state + "</span>";
					var closed="<br><span>Closed at:" + obj[x].closed + "</span>";
					$(ul).append("<li>"+ obj[x].description + user + title + votes + number + state + closed + "</li>");	 	  		 	           			
				 }
				$("#contentLoading").fadeOut("fast");  
				break;
			case "GITHUB_BRANCHES":
				var div = '#files'+social.project;
				var ul = $('<ul class="profile-list"></ul>').appendTo(div);
				$('<li id="apiname"><b>Files ' + social.project + '</b></li>').appendTo(ul); 
				 for (var x = 0; x < obj.length; x++) {
				 	if(obj[x].type == "tree"){
						//$(ul).append("<li>"+ obj[x].type + " - " + obj[x].name +"</li>");	
						$(ul).append("<li>"+ obj[x].type + " - " + obj[x].url +"</li>");	
					}else{
						$(ul).append("<li>"+ obj[x].type + " - <a href='"+ obj[x].url +"' target='_blank'>" + obj[x].name +"</a></li>");	 
					}	  		 	           			
				 }
				$("#contentLoading").fadeOut("fast");  
				break;																						  		
		}
     }   
	 socialItem.others = null; 
     $("#contentLoading").fadeOut("fast");        
} 

/* CLEAR SEARCH RESULTS */        
function resetFavorites(){   
	$('#favorites').html('');    
	$('#friends').html(''); 
	$('#followers').html('');	
} 
/********************************************************************/   
var parseOtherData = function(data, socialItem){	
	var success = false;
	if(!isObject(data)){					    				
		data = eval("(" + data + ")");
	}	
	switch(socialItem.apiName.toUpperCase()+"_"+socialItem.dataType.toUpperCase()){
		case "GITHUB_ISSUES":
			success = parseGithubIssuesResponse(data, socialItem);
			break;
		case "GITHUB_FORKS":
			success = parseGithubForksResponse(data, socialItem);
			break;
		case "GITHUB_BRANCHES":
			success = parseGithubFilesResponse(data, socialItem);
			break;																						  		
	}					
	if(success){			
            social.identities[social.identities.length] = socialItem;						
            showOther();
     }
}//end function

function getFilesGithubFileStructure(masterSha, socialItem){
	var showFilesUrl ="http://github.com/api/v2/json/tree/show/"+ social.username+"/"+ social.project +"/" + masterSha;          
	$.ajax({ 
		type: "GET",
		 dataType: "jsonp",
		 url: showFilesUrl,
		 timeout: 3000, 
		 success: function(data){
			parseGithubFileStructure(data, socialItem);
		 },
		 error: function(xhr){
			 alert("error");
		 }		 
	});//end ajax
}

function parseGithubFileStructure(data, socialItem){
	socialItem.others = new Array();
	$.each(data.tree, function(i, item1) {
		socialItem.other = {};
		socialItem.other.name = item1.name;
		socialItem.other.type = item1.type;
		//http://github.com/alex/django/raw/1cdf54bd053bd2a7dde7dff6c6a8ccd9acd2eafd/AUTHORS
		//http://github.com/alex/pyelection/raw/master/README
		if(item1.type=="blob"){
			socialItem.other.url = "http://github.com/"+ social.username+"/"+ social.project+"/raw/master/"+item1.name;									
		}else
		{
			socialItem.other.url = '<a href="#" onclick="getFilesGithubFileStructure(\'' + item1.sha  + '\');">' + item1.name + '</a><br><div id="tree'+item1.name+'"></div>';
		}
		socialItem.others[i] = socialItem.other;																	
	});//end each
	social.identities[social.identities.length] = socialItem;						
	showOther();
}

var parseGithubFilesResponse = function (data,socialItem){
	var retVal = false;
	if( data != null){
		if( data.branches != null){
			if( data.branches.master != null){
				var masterSha = data.branches.master;
				getFilesGithubFileStructure(masterSha, socialItem);			
			}
		}
	}
	return retVal;				
}
var parseGithubIssuesResponse = function (data,socialItem){
	var retVal = false;
	if( data != null){
		if( data.issues != null){															
			socialItem.others = new Array();
			$.each(data.issues, function(i, item) {
				socialItem.other = {};
				socialItem.other.name = item.user;
				socialItem.other.title = item.title;
				socialItem.other.number = item.number;
				socialItem.other.votes = item.votes;
				socialItem.other.created_at = item.created_at;
				socialItem.other.description = item.body;
				socialItem.other.updatedat = item.updated_at;
				socialItem.other.closed = item.closed_at;				
				socialItem.other.user = item.url;
				socialItem.other.state = item.state;
				socialItem.others[i] = socialItem.other;																	
				retVal = true;
			});//end each
		}				
	}
	return retVal;				
}

var parseGithubForksResponse = function (data,socialItem){
	var retVal = false;
	if( data != null){
		if( data.network != null){															
			socialItem.others = new Array();
			$.each(data.network, function(i, item) {
				socialItem.other = {};
				socialItem.other.name = item.name;
				socialItem.other.description = item.description;
				socialItem.other.open_issues = item.open_issues;
				socialItem.other.watchers = item.watchers;
				socialItem.other.forks = item.forks;
				socialItem.other.fork = item.fork;				
				socialItem.other.url = item.url;
				socialItem.other.homepage = item.homepage;
				socialItem.other.owner = item.owner;
				socialItem.others[i] = socialItem.other;																	
				retVal = true;
		});//end each
		}				
	}
	return retVal;				
}