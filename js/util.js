
//Utilities
/**** Date Utilities ***/
var formatDate = function(api, dt){		
	switch(api.toUpperCase()){
		case "DEL.ICIO.US":			
			break;
		case "FRIENDFEED":					
			break;			
		case "GITHUB":
			return formatGithubDate(dt);
			break;			
		case "MEME":
			return formatMemeDate(dt);
			break;
		case "MYBLOGLOG":			
			break;
		case "TWITTER":
			return formatTwitterDate(dt);
			break;
		case "FLICKR":			
			break;	
		default:
			break;																		  		
	}					
}//end function
function formatGithubDate(dt){
	//input 20091229T12:08:5907:00
	//output 12-29-2009 
	var d=new Date(dt.substr(0,4), dt.substr(4,2), dt.substr(6,2));		
	return d.toDateString();	
}


function formatMemeDate(dt){
	//input 2009-10-22T07:05:05Z
	//output 22-10-2009 
	var d=new Date(dt.substr(0,4), dt.substr(5,2)-1, dt.substr(8,2));		
	return d.toDateString();	
}

function formatTwitterDate(dt){
	//input = Wed Oct 21 23:24:32 +0000 2009
	//output = Oct 21, 2009
	return dt.substr(0, 7) + ", " + dt.substr(dt.length-4);	
}

function formatFriendFeedDate(dt){
	//input 2009-10-23T19:04:36Z
	//output 23-10-2009 
	var d=new Date(dt.substr(0,4), dt.substr(5,2)-1, dt.substr(8,2));		
	return d.toDateString();	
}

function isMSIE(){
 if (navigator.appName=="Microsoft Internet Explorer")
	return true;
}

function isEmpty( inputStr ) { 
	//if ( null == inputStr || "" == inputStr || !inputStr || inputStr.match("undefined")=="undefined") { 
	if ( null == inputStr || "" == inputStr || !inputStr) { 
		return true; 
	} 
	return false; 
}
function isUrl(string) {
    var regexp = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/
    return regexp.test(string);
 }; 
 
// Returns true/false if obj is a object
function isObject(obj) {
    return (typeof obj == "object");
};

function isArray(obj) {
   if (obj.constructor.toString().indexOf("Array") == -1)
      return false;
   else
      return true;
}

function toProperCase(str)
{
    return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
}

function SerializeObject(obj, indentValue) {
    var hexDigits = "0123456789ABCDEF";



    function ToHex(d) {
        return hexDigits[d >> 8] + hexDigits[d & 0x0F];
    }



    function Escape(string) {
        return string.replace(/[\x00-\x1F'\\]/g, function (x) {
            if (x == "'" || x == "\\") return "\\" + x;
            return "\\x" + ToHex(String.charCodeAt(x, 0));
        })
    }
    var indent;
    if (indentValue == null) {
        indentValue = "";
        indent = "";
    } else {
        indent = "\n";
    }
    return GetObject(obj, indent).replace(/,$/, "");

    function GetObject(obj, indent) {
        if (typeof obj == 'string') {
            return "'" + Escape(obj) + "',";
        }
        if (obj instanceof Array) {
            result = indent + "[";
            for (var i = 0; i < obj.length; i++) {
                result += indent + indentValue + GetObject(obj[i], indent + indentValue);
            }
            result += indent + "],";
            return result;
        }
        var result = "";
        if (typeof obj == 'object') {
            result += indent + "{";
            for (var property in obj) {
                result += indent + indentValue + "'" + Escape(property) + "' : " + GetObject(obj[property], indent + indentValue);
            }
            result += indent + "},";
        } else {
            result += obj + ",";
        }
        return result.replace(/,(\n?\s*)([\]}])/g, "$1$2");
    }
}

function dumpObj (obj, maxLevels, level){
	var str = '', type, msg;

    // Start Input Validations
    // Don't touch, we start iterating at level zero
    if(level == null)  level = 0;

    // At least you want to show the first level
    if(maxLevels == null) maxLevels = 1;
    if(maxLevels < 1)
        return '<font color="red">Error: Levels number must be > 0</font>';

    // We start with a non null object
    if(obj == null)
    return '<font color="red">Error: Object <b>NULL</b></font>';
    // End Input Validations

    // Each Iteration must be indented
    str += '<ul>';

    // Start iterations for all objects in obj
    for(property in obj)
    {
      try
      {
          // Show "property" and "type property"
          type =  typeof(obj[property]);
          str += '<li>(' + type + ') ' + property +
                 ( (obj[property]==null)?(': <b>null</b>'):('')) + '</li>';

          // We keep iterating if this property is an Object, non null
          // and we are inside the required number of levels
          if((type == 'object') && (obj[property] != null) && (level+1 <maxLevels))
          str += inspect(obj[property], maxLevels, level+1);
      }
      catch(err)
      {
        // Is there some properties in obj we can't access? Print it red.
        if(typeof(err) == 'string') msg = err;
        else if(err.message)        msg = err.message;
        else if(err.description)    msg = err.description;
        else                        msg = 'Unknown';

        str += '<li><font color="red">(Error) ' + property + ': ' + msg +'</font></li>';
      }
    }

      // Close indent
      str += '</ul>';

    return str;
}

//SUPPORTING FUNCTIONS - UTIL
   function relativetime(time_value) {
	  var values = time_value.split(" ");
	  time_value = values[1] + " " + values[2] + ", " + values[5] + " " + values[3];
	  var parsed_date = Date.parse(time_value);
	  var relative_to = (arguments.length > 1) ? arguments[1] : new Date();
	  var delta = parseInt((relative_to.getTime() - parsed_date) / 1000);
	  delta = delta + (relative_to.getTimezoneOffset() * 60);
	  
	  var r = '';
	  if (delta < 60) {
	    r = 'a minute ago';
	  } else if(delta < 120) {
	    r = 'couple of minutes ago';
	  } else if(delta < (45*60)) {
	    r = (parseInt(delta / 60)).toString() + ' minutes ago';
	  } else if(delta < (90*60)) {
	    r = 'an hour ago';
	  } else if(delta < (24*60*60)) {
	    r = '' + (parseInt(delta / 3600)).toString() + ' hours ago';
	  } else if(delta < (48*60*60)) {
	    r = '1 day ago';
	  } else {
	    r = (parseInt(delta / 86400)).toString() + ' days ago';
	  }
	  
	  return r;
}

    var makeLinks = function(str) {
        return this.replace(/[A-Za-z]+:\/\/[A-Za-z0-9-_]+\.[A-Za-z0-9-_:%&\?\/.=]+/, function(str) {
        return str.link(str);
        });
    };
	
	

function addTagCloud()
{
	var lyr ='tagcloud';
	getPage('tagcloud','',lyr,true);
}


function getPage(phpfile,val,tag,setinnerHTML){
var xmlhttp=false; //Clear our fetching variable
        try {
                xmlhttp = new ActiveXObject('Msxml2.XMLHTTP'); //Try the first kind of active x object…
        } catch (e) {
                try {
                        xmlhttp = new
                        ActiveXObject('Microsoft.XMLHTTP'); //Try the second kind of active x object
            } catch (E) {
                xmlhttp = false;
                        }
        }
        if (!xmlhttp && typeof XMLHttpRequest!='undefined') {
                xmlhttp = new XMLHttpRequest(); //If we were able to get a working active x object, start an XMLHttpRequest
        }
  
	var file = PATH + "/php/" + phpfile+'.php?id='; //This is the path to the file we just finished making *
    xmlhttp.open('GET', file + val, true); //Open the file through GET, and add the page we want to retrieve as a GET variable **
	xmlhttp.onreadystatechange=function() {
		if (xmlhttp.readyState==4) { //Check if it is ready to recieve data              
			    var content = xmlhttp.responseText; //The content data which has been retrieved ***
				//alert(content);
                if( content ){ //Make sure there is something in the content variable
                      if(setinnerHTML)
					   {
						   document.getElementById(tag).innerHTML = content; //Change the inner content of your div to the newly retrieved content ****					
						   return "";
					   }else{
						   ajaxcontent = content;
						   return ajaxcontent;
					   }
                }
        }
        }
        xmlhttp.send(null) //Nullify the XMLHttpRequest
return;
}	
