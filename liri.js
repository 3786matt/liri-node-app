var fs=require('fs');
var request=require('request');
var key=require('./keys.js');
var twitter=require('twitter');
var spotify=require('spotify');
var userInput = process.argv[2];
require('terminal-colors');

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
              spotify1(argument);
              break;
      case "movie-this":
              movie(argument);
              break;
      case "do-what-it-says":
              doWhatItSays();
              break;
      default :
              console.log("\nInvalid choice! Please choose from the following:\nmy-tweets\nspotify-this-song\nmovie-this\ndo-what-it-says\n");
    }
}

function twitter1(){
      console.log("\nMost recent tweets:\n".underline.bold.red);
       logFile("\nMost recent tweets:\n");

      var params = {screen_name: '@madmatt722'};
      key1.get('statuses/user_timeline', params, function(error, tweets, response){
          if(!error) {
            for(i=0; i<20; i++){
              if(tweets[i]==undefined){
                break;
              }
              console.log(tweets[i].created_at.magenta+': '+tweets[i].text.blue);
              logFile("\n"+tweets[i].created_at+': '+tweets[i].text)
            }
          }
          else{
            console.log(err);
          }
      });
}

function spotify1(argument1){

  var spotify=require('spotify');

   if(argument1===""){
      argument1="The Sign Ace of Base";
    }

  spotify.search({ type: 'track', query: argument1 }, function(err, data) {
    if(err) {
        console.log('Error occurred: ' + err);
        logFile('\nError occurred: ' + err+ "\n");
        return;
    }
    else if(!err){
      console.log("\nArtist Name: ".magenta + data.tracks.items[0].artists[0].name.blue);
      console.log("  Song Name: ".magenta + data.tracks.items[0].name.blue);
      console.log("    Preview URL: ".magenta + data.tracks.items[0].preview_url.blue);
      console.log("      Album Name: ".magenta + data.tracks.items[0].album.name.blue + "\n"+"\n");
      logFile("\n\nSpotify: ")
      logFile("\n\nArtist Name: " + data.tracks.items[0].artists[0].name);
      logFile("\nSong Name: " + data.tracks.items[0].name);
      logFile("\nPreview URL: " + data.tracks.items[0].preview_url);
      logFile("\nAlbum Name: " + data.tracks.items[0].album.name + "\n")
      } 
    });
  };

function movie(argument1){

if(argument1===""){
      argument1="Mr.Nobody";
    }
    url='http://www.omdbapi.com/?t='+argument1+'&y=&plot=short&r=json&tomatoes=true';

request(url, function(error, response, body){
  if(!error && response.statusCode == 200) {
    
    var json = JSON.parse(body);

    console.log("\nTitle:".magenta+json.Title.blue);
    console.log("Year:".magenta+json.Year.blue);
    console.log("IMDB Rating: ".magenta+json.imdbRating.blue);
    console.log("Country:".magenta+json.Country.blue);
    console.log("Language:".magenta+json.Language.blue);
    console.log("Plot:".magenta+json.Plot.blue);
    console.log("Actors:".magenta+json.Actors.blue);
    console.log("Rotten Tomatoes Rating:".magenta+json.tomatoRating.blue);
    console.log("Rotten Tomatoes URL:".magenta+json.tomatoURL.blue);
    
    logFile("\n\nOMDB:\n");
    logFile("\nTitle:"+json.Title);
    logFile("\nYear:"+json.Year);
    logFile("\nIMDB Rating: "+json.imdbRating);
    logFile("\nCountry:"+json.Country);
    logFile("\nLanguage:"+json.Language);
    logFile("\nPlot:"+json.Plot);
    logFile("\nActors:"+json.Actors);
    logFile("\nRotten Tomatoes Rating:"+json.tomatoRating);
    logFile("\nRotten Tomatoes URL:"+json.tomatoURL);
  }
});
}
  function doWhatItSays(){
    fs.readFile("random.txt", "utf-8", function read(err, data){
      if(!err){
        var myOwnProcess=data.split(',');
        userFunction(myOwnProcess[0].trim(), myOwnProcess[1].trim());
      }else{
        return console.log(err);
        }
      });
    }

  function logFile(data){
    fs.appendFile('log.txt', data, function(err){
      if(err){
        console.log('error');
      }
    })
  }

  




  













