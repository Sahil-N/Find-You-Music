var ytapikey = "AIzaSyB0WhHsY5aNb5nP0FA-KmWW7baChjnkK_I";
var search = "kanye";
search = search + " music -channel";
var queryURL = "https://www.googleapis.com/youtube/v3/search?q=" + search + "&key=" + ytapikey + "&part=snippet"

$.ajax({
  url: queryURL,
  method: "GET"
}).done(function(response) {
  console.log(response.items)
  console.log(response.items[0].id.videoId);
})