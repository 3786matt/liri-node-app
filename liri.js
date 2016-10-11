var fs=require('fs');
var request=require('request');
var key=require('./keys.js');
var twitter=require('twitter');
var spotify=require('spotify');
var userInput = process.argv[2];
// var argument2 = process.argv[3];

var argument1="";
for(i=3; i<process.argv.length; i++){
  argument1+=process.argv[i]+ " ";
}

argument1=argument1.trim();

var key1 = new twitter({
    consumer_key: key.twitterKeys.consumer_key,
    consumer_secret: key.twitterKeys.consumer_secret,
    access_token_key: key.twitterKeys.access_token_key,
    access_token_secret: key.twitterKeys.access_token_secret
  });


userFunction(userInput, argument1);

function userFunction(userInput, argument){
    switch (userInput){
      case "my-tweets":
              twitter1();
              break;
      case "spotify-this-song":
              spotify1(argument1);
              break;
      case "movie-this":
              movie(argument1);
              break;
      case "do-what-it-says":
              doWhat();
              break;
      default :
              console.log("\nInvalid choice! Please choose from the following:\nmy-tweets\nspotify-this-song\nmovie-this\ndo-what-it-says\n");
    }
}



function twitter1(){
      console.log("\nMost recent tweets:\n");
      var params = {screen_name: '@madmatt722'};
      key1.get('statuses/user_timeline', params, function(error, tweets, response){
          if(!error) {
            for(i=0; i<20; i++){
              if(tweets[i]==undefined){
                break;
              }
              console.log(tweets[i].created_at+':'+tweets[i].text);
            }
          }
          else{
            console.log(err);
          }
      });
}

// https://developer.spotify.com/web-api/get-track/

//how do i pass in a multi-word song title without using quotation marks?

//within spotify1 function below: used "" instead of undefined because argument1 is concatenated using i +" " at top.

function spotify1(argument1){
  var spotify=require('spotify');

   if(argument1===""){
      argument1="The Sign Ace of Base";
    }

    //try spotify lookup using the sign's specific id. This worked by putting in Ace of Base in for argument1;

    //above if statement doesnt work with "The Sign" works with "Thriller" though?

    spotify.search({ type: 'track', query: argument1 }, function(err, data) {
   

    if(err) {
        console.log('Error occurred: ' + err);
        return;
    }
    else if(!err){
      console.log("\nArtist Name: " + data.tracks.items[0].artists[0].name);
      console.log("  Song Name: " + data.tracks.items[0].name);
      console.log("    Preview URL: " + data.tracks.items[0].preview_url);
      console.log("      Album Name: " + data.tracks.items[0].album.name + "\n"+"\n");
    } 
  });
};

// http://www.omdbapi.com/
function movie(argument1){

if(argument1===""){
      argument1="Mr.Nobody";
    }
    url='http://www.omdbapi.com/?t='+argument1+'&y=&plot=short&r=json&tomatoes=true';

request(url, function(error, response, body){
  if(!error && response.statusCode == 200) {
    var json = JSON.parse(body);
    // console.log("\n"+url);
    console.log("\nTitle:"+json.Title);
    console.log("Year:"+json.Year);
    console.log("IMDB Rating: "+json.imdbRating);
    console.log("Country:"+json.Country);
    console.log("Language:"+json.Language);
    console.log("Plot:"+json.Plot);
    console.log("Actors:"+json.Actors);
    console.log("Rotten Tomatoes Rating:"+json.tomatoRating);
    console.log("Rotten Tomatoes URL:"+json.tomatoURL);
  }

});


// https://github.com/misterhat/omdb/blob/master/index.js#L237
  // http://www.omdbapi.com/?i=tt0944947&Season=1

  function doWhat(){
    fs.readFile("random.txt", "utf-8", function read(err, data){
      if(!err){
      // console.log(json.data);
      console.log("do what test");
      // spotify1("I Want it That Way");
    }

    })
  }





// });
  









}



