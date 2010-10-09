var apiLinks = {
    "sites": [   
    {
        "name": "Tumblr",
        "domain": "tumblr.com",
		"icon": "image/icon_color_Tumblr.png",
        "urlmappings": [{
            "urltemplate": "http://{username}.tumblr.com/api/read/json",
            "type": "search",
            "feed": "site",
            "count": "5"
        },
		{
            "urltemplate": "http://{username}.tumblr.com/api/read/json",
            "type": "profile",
            "feed": "site",
            "count": "5"
        },
		{
            "urltemplate": "http://{username}.tumblr.com/api/read/json",
            "type": "posted",
            "feed": "site",
            "count": "5"
        },
		{
            "urltemplate": "http://{username}.tumblr.com/api/read/json",
            "type": "favourites",
            "feed": "site",
            "count": "5"
        }]
    },
	{
        "name": "Digg",
        "domain": "digg.com",
        "icon": "image/icon_color_Digg.png",
        "urlmappings": [{
            "urltemplate":"http://services.digg.com/1.0/endpoint?method=user.getInfo&username={username}&type=json&callback=?",
            "type": "search1",
            "feed": "site",
            "count": "1"
        },
		{
            "urltemplate":"http://services.digg.com/1.0/endpoint?method=user.getInfo&username={username}&type=json&callback=?",
            "type": "profile1",
            "feed": "site",
            "count": "1"
        },
		{
            "urltemplate":"http://services.digg.com/1.0/endpoint?method=user.getSubmissions&username={username}&count=&offset&size=s&type=json&callback=?",
            "type": "posted1",
            "feed": "site",
            "count": "1"
        },
		{
            "urltemplate":"http://services.digg.com/1.0/endpoint?method=user.getDugg&username={username}&count=&offset&size=s&type=json&callback=?",
            "type": "followers1",
            "feed": "site",
            "count": "1"
        },
		{
            "urltemplate":"http://services.digg.com/1.0/endpoint?method=user.getFavorites&username={username}&count=&offset&type=json&callback=?",
            "type": "favourites",
            "feed": "site",
            "count": "1"
        }]
    },
	 {
        "name": "Blogger",
        "domain": "blogger.com",
		"icon": "image/icon_color_blogger.png",
        "urlmappings": [{
            "urltemplate": "http://{username}.blogspot.com/feeds/posts/default?alt=json&callback=?",
            "type": "search",
            "feed": "site",
            "count": "5"
        },
		{
            "urltemplate": "http://{username}.blogspot.com/feeds/posts/default?alt=json&callback=?",
            "type": "profile",
            "feed": "site",
            "count": "5"
        },
		{
            "urltemplate": "http://{username}.blogspot.com/feeds/posts/default?alt=json&callback=?",
            "type": "posted",
            "feed": "site",
            "count": "5"
        }
		]
    },
	 {
        "name": "MyBlogLog",
        "domain": "mybloglog.com",
		"icon": "image/icon_color_Mybloglog.png",
        "urlmappings": [{
            "urltemplate": "http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20mybloglog.community.find%20where%20name%3D%27{username}%27&format=json",
            "type": "search",
            "feed": "yql",
            "count": "5"
        },
		{
            "urltemplate": "http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20mybloglog.community.find%20where%20name%3D%27{username}%27&format=json",
            "type": "profile",
            "feed": "yql",
            "count": "5"
        }
		]
    },
    {
        "name": "Hi5",
        "domain": "hi5.com",
        "icon": "image/icon_color_hi5.png",
        "urlmappings": [{
            "urltemplate":"http://api.hi5.com/json/profile/lookup?nickname={username}",
            "type": "search",
            "feed": "site",
            "count": "1"
        },
		{
            "urltemplate":"http://api.hi5.com/json/profile/foaf/{userid}",
            "type": "profile",
            "feed": "site",
            "count": "1"
        },
		{
            "urltemplate":"http://api.hi5.com/json/profile/foaf/{userid}",
            "type": "friends",
            "feed": "site",
            "count": "1"
        }]
    },
    {
        "name": "FacebookNoUsername",
        "domain": "facebook.com",
        "icon": "image/icon_color_Facebook.png",
        "urlmappings": [{
            "urltemplate":"http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20html%20where%20url%3D%22http%3A%2F%2Fwww.facebook.com%2F{username}%22%20and%20xpath%3D'%2F%2Fh1%5B%40id%3D%22profile_name%22%5D'&format=json&diagnostics=false&callback=?",//select * from html where url='http://www.facebook.com/dailypush' and  xpath='//h1[@id="profile_name"]' 
            "type": "search",
            "feed": "yql",
            "count": "1"
        }]
    },
     {
        "name": "Facebook",
        "domain": "facebook.com",
        "icon": "image/icon_color_facebook.png",
        "urlmappings": [{
            "urltemplate": "http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20html%20where%20url%3D%22http%3A%2F%2Fwww.facebook.com%2F{username}%22%20and%20xpath%3D'%2F%2Fdiv%5B%40class%3D%22picture_column%20vcard%22%5D%2Fdiv%2Fimg'&format=json&callback=?", //select * from html where url="http://www.facebook.com/{username}" and xpath='//div[@class="picture_column vcard"]/div/img'
            "type": "search",
            "feed": "yql",
            "count": "1"
        },
     	{
            "urltemplate": "http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20html%20where%20url%3D%22http%3A%2F%2Fwww.facebook.com%2F{username}%22%20and%20(xpath%3D'%2F%2Fdiv%5B%40class%3D%22picture_container%22%5D'%20or%20xpath%3D'%2F%2Fdiv%5B%40class%3D%22UIFullPage_Container%22%5D%2Fdiv%2Fdiv%2Fdiv%5B%40id%3D%22public_listing_friends%22%5D%2Fdiv%2Fdiv%2Fdiv')&format=json&diagnostics=false&callback=?",
            "type": "profile",
            "feed": "yql",
            "count": "1"
        }]
    },
     {
        "name": "Meme",
        "domain": "meme.yahoo.com",
		"icon": "image/meme_icon.png",		
        "urlmappings": [{
            "urltemplate": "http://query.yahooapis.com/v1/public/yql?q=SELECT%20*%20FROM%20meme.info%20WHERE%20name%3D%27{username}%27&format=json",
            "type": "search",
            "feed": "yql",
            "count": "5"
        },
        {
            "urltemplate": "http://query.yahooapis.com/v1/public/yql?q=SELECT%20*%20FROM%20meme.info%20WHERE%20name%3D%27{username}%27&format=json",
            "type": "profile",
            "feed": "yql",
            "count": "5"
        },
        {
		   "urltemplate": "http://query.yahooapis.com/v1/public/yql?q=SELECT%20*%20FROM%20social.presence%20WHERE%20guid%{userid}%27&format=json",
            "type": "posted",
            "feed": "yql",
            "count": "5"
        },
        {        
		   "urltemplate": "http://query.yahooapis.com/v1/public/yql?q=SELECT%20*%20FROM%20meme.followers%20WHERE%20owner_guid%3D%27{userid}%27&format=json&diagnostics=false",
            "type": "followers",
            "feed": "yql",
            "count": "5"
        },
		 {         
		   "urltemplate": "http://query.yahooapis.com/v1/public/yql?q=SELECT%20*%20FROM%20meme.following%20WHERE%20owner_guid%3D%27{userid}%27&format=json",
            "type": "friends",
            "feed": "yql",
            "count": "5"
        }
        ]
    },
    {
        "name": "Twitter",
        "domain": "twitter.com",
		"icon": "image/twitter_icon.png",
        "urlmappings": [{
            "urltemplate": "http://twitter.com/users/show/{username}.json?callback=?",
            "type": "profile",
            "feed": "site",           
             "count": "1"
        },
        {
            "urltemplate": "http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20twitter.user.profile%20where%20id%3D%27{username}%27&format=json&env=http%3A%2F%2Fdatatables.org%2Falltables.env",            
            "type": "search2",
            "feed": "yql",
            "count": "1"
        },
        {
            "urltemplate": "http://twitter.com/users/show/{username}.json?callback=?",            
            "type": "search",
            "feed": "site",
            "count": "1"
        },
     	{
            "urltemplate": "http://twitter.com/status/user_timeline/{username}.json?count={count}&callback=?",
            "type": "posted",
            "feed": "site",           
             "count": "5"
        },
		{
            "urltemplate": "http://twitter.com/friends/ids.json?screen_name={username}&count={count}&callback=?",
            "type": "friends",
            "feed": "site",           
             "count": "5"
        },
		{
            "urltemplate": "http://twitter.com/followers/ids.json?screen_name={username}&callback=?",
            "type": "followers",
            "feed": "site",           
             "count": "5"
        },
		{
            "urltemplate": "http://twitter.com/favorites/{username}.json?page={count}&callback=?",
            "type": "favourites",
            "feed": "site",           
             "count": "1"
        },
		{
            "urltemplate": "http://search.twitter.com/search.json?q=@{username}&rpp={count}&callback=?",
            "type": "mention",
            "feed": "site",           
             "count": "5"
        }]
    },
        {
        "name": "Delicious",
        "domain": "delicious.com",
		"icon": "image/delicious_icon.png",						
        "urlmappings": [{
            "urltemplate": "http://feeds.delicious.com/v2/json/{username}?plain",
            "type": "profile",
            "feed": "site",
            "count": "1"
        },
          {
            "urltemplate": "http://feeds.delicious.com/v2/json/{username}?count={count}&plain",
            "type": "search",
            "feed": "site",
            "count": "1"
        },
		{
            "urltemplate": "http://feeds.delicious.com/v2/json/{username}?count={count}&plain",
            "type": "posted",
            "feed": "site",
            "count": "5"
        },
		{
            "urltemplate": "http://feeds.delicious.com/v2/json/networkmembers/{username}?count={count}&plain",
            "type": "friends",
            "feed": "site",
            "count": "5"
        },
		{
            "urltemplate": "http://feeds.delicious.com/v2/json/networkfans/{username}?count={count}&plain",
            "type": "followers",
            "feed": "site",
            "count": "5"
        },
        {
            "urltemplate": "http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20html%20where%20url%3D%22http%3A%2F%2Fdelicious.com%2Fsearch%3Fp%3D%27{username}%27&format=json",
            "type": "search1",
            "feed": "yql",
            "count": "5"
        }]
    },
    {
        "name": "FriendFeed",
        "domain": "friendfeed.com",
		"icon": "image/friendfeed_icon.png",						
        "urlmappings": [{
            "urltemplate": "http://friendfeed-api.com/v2/feedinfo/{username}",
            "type": "search",
            "feed": "site",
            "count": "1"
        },       
		{
            "urltemplate": "http://friendfeed-api.com/v2/feedinfo/{username}",
            "type": "profile",
            "feed": "site",
            "count": "5"
        },
		{
            "urltemplate": "http://friendfeed-api.com/v2/feed/{username}/comments",
            "type": "posted",
            "feed": "site",
            "count": "5"
        },
		{
            "urltemplate": "http://friendfeed-api.com/v2/feed/{username}/friends",
            "type": "friends",
            "feed": "site",
            "count": "5"
        }
		]
    },
	{
        "name": "Lastfm",
        "domain": "last.fm",
		"icon": "image/lastfm_icon.png",						
        "urlmappings": [{
            "urltemplate": "http://lastfm-api-ext.appspot.com/2.0/?method=user.getLovedTracks&user={username}&api_key=aa7d7021c0dbd9939026f9e6c3b281bc",
            "type": "favorites",
            "feed": "site",
            "count": "5"
        },   
		{
            "urltemplate": "http://ws.audioscrobbler.com/2.0/?method=user.getinfo&user={username}&format=json&callback=&api_key=aa7d7021c0dbd9939026f9e6c3b281bc",
            "type": "search",
            "feed": "site",
            "count": "0"
        },  
		{
            "urltemplate": "http://ws.audioscrobbler.com/2.0/?method=user.getinfo&user={username}&format=json&callback=&api_key=aa7d7021c0dbd9939026f9e6c3b281bc",
            "type": "profile",
            "feed": "site",
            "count": "0"
        },  
		{
            "urltemplate": "http://ws.audioscrobbler.com/2.0/?method=user.getplaylists&user={username}&format=json&callback=&api_key=aa7d7021c0dbd9939026f9e6c3b281bc",
            "type": "posted",
            "feed": "site",
            "count": "0"
        }]
    },         
    {
        "name": "GitHub",
        "domain": "github",
		"icon": "image/github.png",						
        "urlmappings": [{
	        "urltemplate": "http://query.yahooapis.com/v1/public/yql?q=use%20%27http%3A%2F%2Fwww.datatables.org%2Fgithub%2Fgithub.user.info.xml%27%20as%20github.user.info%3Bselect%20*%20from%20github.user.info%20where%20id%3D%27{username}%27&format=json&diagnostics=false&callback=?",
            "type": "search",
            "feed": "yql",
            "count": "5"
        },        
        {
			"urltemplate": "http://query.yahooapis.com/v1/public/yql?q=use%20%27http%3A%2F%2Fwww.datatables.org%2Fgithub%2Fgithub.user.info.xml%27%20as%20github.user.info%3Bselect%20*%20from%20github.user.info%20where%20id%3D%27{username}%27&format=json&diagnostics=false&callback=?",
            "type": "profile",
            "feed": "yql",
            "count": "5"
        },        
        {
			"urltemplate": "http://github.com/api/v2/json/repos/show/{username}/",
            "type": "posted",
            "feed": "site",
            "count": "5"
        },        
        {
			"urltemplate": "http://github.com/api/v2/json/user/show/{username}/followers",
            "type": "followers",
            "feed": "site",
            "count": "0"
        },        
        {
			"urltemplate": "http://github.com/api/v2/json/user/show/{username}/following",
            "type": "friends",
            "feed": "site",
            "count": "0"
        },        
        {
			"urltemplate": "http://github.com/api/v2/json/repos/show/{username}/{project}/network",
            "type": "forks",
            "feed": "site",
            "count": "0"
        },        
        {
			"urltemplate": "http://github.com/api/v2/json/issues/list/{username}/{project}/open",
            "type": "issues",
            "feed": "site",
            "count": "5"
        },        
        {
		"urltemplate": "http://github.com/api/v2/json/repos/show/{username}/{project}/branches",
            "type": "branches",
            "feed": "site",
            "count": "5"
        }]
    },         
    {
        "name": "Flickr",
        "domain": "flickr",
		"icon": "image/flickr.png",						
        "urlmappings": [{
	        "urltemplate": "http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20html%20where%20url%3D%22http%3A%2F%2Fwww.flickr.com%2Fphotos%2F{username}%22%20and%20xpath%3D%22%2F%2Ftable%5B%40id%3D%27SubNav%27%5D%2Ftr%2Ftd%2Fa%2Fimg%22&format=json&diagnostics=false&callback=?",
            "type": "search",
            "feed": "yql",
            "count": "0"
        },
        {	        
	        "urltemplate": "http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20html%20where%20url%3D%22http%3A%2F%2Fwww.flickr.com%2Fpeople%2F{username}%2F%22%20and%20(xpath%3D%22%2F%2Ftable%5B%40id%3D%27SubNav%27%5D%2Ftr%2Ftd%2Fa%2Fimg%22%20or%20xpath%3D%22%2F%2Fdiv%5B%40class%3D%27profile-section%27%5D%22)&format=json&callback=?",
            "type": "profile",
            "feed": "yql",
            "count": "0"
        },
		{	        
	        "urltemplate": "http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20feed%20where%20url%3D%27http%3A%2F%2Fapi.flickr.com%2Fservices%2Ffeeds%2Fphotos_public.gne%3Fid%3D{userid}%27&format=json",			
            "type": "posted",
            "feed": "yql",
            "count": "0"
        },
		{
            "urltemplate": "http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20feed%20where%20url%3D%27http%3A%2F%2Fapi.flickr.com%2Fservices%2Ffeeds%2Fphotos_faves.gne%3Fnsid%3D{userid}%27&format=json&callback=?",
            "type": "favourites",
            "feed": "yql",           
             "count": "1"
        },
		{
       		"urltemplate": "http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20feed%20where%20url%3D%27http%3A%2F%2Fapi.flickr.com%2Fservices%2Ffeeds%2Fphotos_friends.gne%3Fuser_id%3D{userid}%27&format=json",
		    "type": "friends",
            "feed": "yql",           
             "count": "0"
        }]
    },                 
    {
        "name": "Youtube",
        "domain": "youtube.com",
		"icon": "image/youtube_icon.png",								
        "urlmappings": [{
            "urltemplate": "http://gdata.youtube.com/feeds/base/users/{username}/uploads?alt=json",
            "type": "search",
            "feed": "site",
            "count": "0"
        },
        {
            "urltemplate": "http://gdata.youtube.com/feeds/base/users/{username}?alt=json",
            "type": "profile",
            "feed": "site",
            "count": "0"
        },
        {
            "urltemplate": "http://gdata.youtube.com/feeds/base/users/{username}/favorites?alt=json",
            "type": "favourites",
            "feed": "site",
            "count": "0"
        },
        {
            "urltemplate": "http://gdata.youtube.com/feeds/base/users/{username}/uploads?alt=json",
             "type": "posted",
             "feed": "site",
            "count": "0"
        }]
    }]
}